// @vitest-environment node

import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn, type ChildProcess } from "node:child_process";
import { createServer } from "node:net";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

type CdpResponse<T = unknown> = {
  id: number;
  result?: T;
  error?: { message: string };
};

type FetchInit = Parameters<typeof fetch>[1];

type TargetDescriptor = {
  webSocketDebuggerUrl: string;
};

type RuntimeEvaluateResult<T> = {
  result: {
    value: T;
  };
};

type ResponsiveMetrics = {
  documentElement: {
    scrollWidth: number;
    clientWidth: number;
  };
  body: {
    scrollWidth: number;
    clientWidth: number;
  };
  primaryNav: {
    scrollWidth: number;
    clientWidth: number;
    overflowX: string;
  };
  contactCta: {
    display: string;
    rects: number;
  };
  experiencePeriodBadges: Array<{
    text: string;
    left: number;
    right: number;
    scrollWidth: number;
    clientWidth: number;
    whiteSpace: string;
  }>;
  educationTitles: Array<{
    text: string;
    whiteSpace: string;
    textOverflow: string;
  }>;
  featuredMockups: Array<{
    src: string;
    width: string | null;
    height: string | null;
    loading: string;
    decoding: string;
    objectFit: string;
    objectPosition: string;
    screenWidth: number;
    screenHeight: number;
    imageWidth: number;
    imageHeight: number;
  }>;
  learningProjects: {
    title: string;
    cardCount: number;
    columns: number;
  } | null;
  primaryNavHrefs: string[];
  headerControls: Array<{
    className: string;
    display: string;
    width: number;
    height: number;
    rects: number;
  }>;
  featuredInkScrollerLinkFocused: boolean;
};

const chromeCandidates = [
  process.env.CHROME_BIN,
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter((candidate): candidate is string => Boolean(candidate));

const chromeExecutable = chromeCandidates.find((candidate) =>
  existsSync(candidate),
);
const previewHost = "127.0.0.1";
const testTimeoutMs = 60_000;

let previewPort = 0;
let chromePort = 0;
let previewProcess: ChildProcess | undefined;
let chromeProcess: ChildProcess | undefined;
let userDataDir = "";

async function getFreePort(): Promise<number> {
  return new Promise((resolvePort, reject) => {
    const server = createServer();

    server.once("error", reject);
    server.listen(0, previewHost, () => {
      const address = server.address();

      if (typeof address === "string" || address === null) {
        server.close(() => reject(new Error("Unable to allocate a TCP port")));
        return;
      }

      const port = address.port;
      server.close(() => resolvePort(port));
    });
  });
}

async function waitForHttpOk(url: string, label: string): Promise<void> {
  const deadline = Date.now() + 30_000;
  let lastError: unknown;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }

      lastError = new Error(`${label} returned HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  }

  throw new Error(`${label} did not become ready: ${String(lastError)}`);
}

async function readJson<T>(url: string, init?: FetchInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }

  return (await response.json()) as T;
}

async function createCdpClient(webSocketUrl: string) {
  const socket = new WebSocket(webSocketUrl);
  let nextId = 1;
  const pending = new Map<
    number,
    {
      resolve: Function;
      reject: Function;
    }
  >();

  await new Promise<void>((resolveOpen, rejectOpen) => {
    socket.addEventListener("open", () => resolveOpen(), { once: true });
    socket.addEventListener(
      "error",
      () => rejectOpen(new Error("Unable to connect to Chrome DevTools")),
      { once: true },
    );
  });

  socket.addEventListener("message", (event) => {
    const payload = JSON.parse(String(event.data)) as Partial<CdpResponse>;

    if (typeof payload.id !== "number") {
      return;
    }

    const request = pending.get(payload.id);
    if (!request) {
      return;
    }

    pending.delete(payload.id);

    if (payload.error) {
      request.reject(new Error(payload.error.message));
      return;
    }

    request.resolve(payload.result);
  });

  return {
    send<T>(method: string, params: Record<string, unknown> = {}) {
      if (socket.readyState !== WebSocket.OPEN) {
        return Promise.reject(new Error("Chrome DevTools socket is not open"));
      }

      const id = nextId;
      nextId += 1;

      const message = JSON.stringify({ id, method, params });

      return new Promise<T>((resolveSend, rejectSend) => {
        pending.set(id, {
          resolve: (value: unknown) => resolveSend(value as T),
          reject: rejectSend,
        });
        socket.send(message);
      });
    },
    close() {
      socket.close();
    },
  };
}

async function waitForExpression<T>(
  client: Awaited<ReturnType<typeof createCdpClient>>,
  expression: string,
): Promise<T> {
  const deadline = Date.now() + 15_000;
  let lastValue: T | undefined;

  while (Date.now() < deadline) {
    const evaluation = await client.send<RuntimeEvaluateResult<T>>(
      "Runtime.evaluate",
      {
        expression,
        returnByValue: true,
      },
    );

    lastValue = evaluation.result.value;

    if (lastValue) {
      return lastValue;
    }

    await new Promise((resolveDelay) => setTimeout(resolveDelay, 100));
  }

  throw new Error(`Timed out waiting for expression: ${expression}`);
}

async function collectMetrics(
  theme: "light" | "dark",
  path = "/es",
  width = 320,
): Promise<ResponsiveMetrics> {
  const target = await readJson<TargetDescriptor>(
    `http://${previewHost}:${chromePort}/json/new?about:blank`,
    { method: "PUT" },
  );
  const client = await createCdpClient(target.webSocketDebuggerUrl);

  try {
    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: true,
    });
    await client.send("Page.addScriptToEvaluateOnNewDocument", {
      source: `
        localStorage.setItem('devdigi-theme', '${theme}');
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add('${theme}');
      `,
    });
    await client.send("Page.navigate", {
      url: `http://${previewHost}:${previewPort}${path}`,
    });
    await waitForExpression<boolean>(
      client,
      "document.readyState === 'complete' && Boolean(document.querySelector('header nav[aria-label]'))",
    );
    const evaluation = await client.send<
      RuntimeEvaluateResult<ResponsiveMetrics>
    >("Runtime.evaluate", {
      expression: `(() => {
          const nav = document.querySelector('header nav[aria-label]');
           const cta = document.querySelector('.header-contact-cta');
            const featuredInkScrollerLink = document.querySelector('section#featured a[href*="inkscroller"]');
            const learningProjects = document.querySelector('.projects-learning-group');
            const projectsGrid = learningProjects?.querySelector('.projects-grid');
           const navStyle = window.getComputedStyle(nav);
           const ctaStyle = window.getComputedStyle(cta);
           featuredInkScrollerLink?.focus();

          return {
            documentElement: {
              scrollWidth: document.documentElement.scrollWidth,
              clientWidth: document.documentElement.clientWidth,
            },
            body: {
              scrollWidth: document.body.scrollWidth,
              clientWidth: document.body.clientWidth,
            },
            primaryNav: {
              scrollWidth: nav.scrollWidth,
              clientWidth: nav.clientWidth,
              overflowX: navStyle.overflowX,
            },
            contactCta: {
              display: ctaStyle.display,
              rects: cta.getClientRects().length,
            },
            experiencePeriodBadges: Array.from(document.querySelectorAll('.experience-period-badge')).map((badge) => {
              const rect = badge.getBoundingClientRect();
              const style = window.getComputedStyle(badge);

              return {
                text: badge.textContent.trim(),
                left: rect.left,
                right: rect.right,
                scrollWidth: badge.scrollWidth,
                clientWidth: badge.clientWidth,
                whiteSpace: style.whiteSpace,
              };
            }),
            educationTitles: Array.from(document.querySelectorAll('.education-entry h4')).map((title) => {
              const style = window.getComputedStyle(title);

              return {
                text: title.textContent.trim(),
                whiteSpace: style.whiteSpace,
                textOverflow: style.textOverflow,
              };
            }),
             featuredMockups: Array.from(document.querySelectorAll('.mockup-phone-screen img')).map((image) => {
               const screen = image.closest('.mockup-phone-screen');
              const screenRect = screen.getBoundingClientRect();
              const imageRect = image.getBoundingClientRect();
              const style = window.getComputedStyle(image);

              return {
                src: image.getAttribute('src'),
                width: image.getAttribute('width'),
                height: image.getAttribute('height'),
                loading: image.loading,
                decoding: image.decoding,
                objectFit: style.objectFit,
                objectPosition: style.objectPosition,
                screenWidth: screenRect.width,
                screenHeight: screenRect.height,
                imageWidth: imageRect.width,
                imageHeight: imageRect.height,
               };
             }),
              learningProjects: learningProjects && projectsGrid ? {
                title: learningProjects.querySelector('h3').textContent.trim(),
                cardCount: projectsGrid.querySelectorAll('.project-card').length,
                columns: window.getComputedStyle(projectsGrid).gridTemplateColumns.split(' ').length,
              } : null,
              primaryNavHrefs: Array.from(nav.querySelectorAll('a')).map((link) => link.getAttribute('href')),
              headerControls: Array.from(document.querySelectorAll('header a, header button')).map((control) => {
                const rect = control.getBoundingClientRect();
                const style = window.getComputedStyle(control);

                return {
                  className: control.className,
                  display: style.display,
                  width: rect.width,
                  height: rect.height,
                  rects: control.getClientRects().length,
                };
              }),
              featuredInkScrollerLinkFocused: document.activeElement === featuredInkScrollerLink,
            };
        })()`,
      returnByValue: true,
    });

    return evaluation.result.value;
  } finally {
    client.close();
  }
}

function delay(ms: number): Promise<void> {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, ms));
}

function hasProcessExited(processToCheck: ChildProcess): boolean {
  return processToCheck.exitCode !== null || processToCheck.signalCode !== null;
}

async function waitForProcessExit(
  processToWaitFor: ChildProcess,
  timeoutMs: number,
): Promise<boolean> {
  if (hasProcessExited(processToWaitFor)) {
    return true;
  }

  return new Promise<boolean>((resolveExit) => {
    const timer = setTimeout(() => resolveExit(false), timeoutMs);

    processToWaitFor.once("exit", () => {
      clearTimeout(timer);
      resolveExit(true);
    });
  });
}

async function stopProcess(
  processToStop: ChildProcess | undefined,
): Promise<void> {
  if (!processToStop || hasProcessExited(processToStop)) {
    return;
  }

  processToStop.kill("SIGTERM");
  const exitedAfterSigterm = await waitForProcessExit(processToStop, 2_000);

  if (!exitedAfterSigterm && !hasProcessExited(processToStop)) {
    processToStop.kill("SIGKILL");
    const exitedAfterSigkill = await waitForProcessExit(processToStop, 2_000);

    if (!exitedAfterSigkill && !hasProcessExited(processToStop)) {
      throw new Error("Process did not exit after SIGKILL");
    }
  }
}

async function removeDirectoryWithRetry(path: string): Promise<void> {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      rmSync(path, { force: true, recursive: true });
      return;
    } catch (error) {
      if (attempt === 4) {
        throw error;
      }

      await delay(250 * (attempt + 1));
    }
  }
}

beforeAll(async () => {
  if (!chromeExecutable) {
    throw new Error(
      `Chrome executable not found. Set CHROME_BIN or install one of: ${chromeCandidates.join(
        ", ",
      )}`,
    );
  }

  [previewPort, chromePort] = await Promise.all([getFreePort(), getFreePort()]);
  userDataDir = mkdtempSync(join(tmpdir(), "portfolio-web-chrome-"));

  previewProcess = spawn(
    join(process.cwd(), "node_modules", ".bin", "astro"),
    ["preview", "--host", previewHost, "--port", String(previewPort)],
    {
      cwd: process.cwd(),
      stdio: "ignore",
    },
  );

  chromeProcess = spawn(
    chromeExecutable,
    [
      "--headless=new",
      `--remote-debugging-port=${chromePort}`,
      "--no-sandbox",
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    {
      cwd: process.cwd(),
      stdio: "ignore",
    },
  );

  await Promise.all([
    waitForHttpOk(`http://${previewHost}:${previewPort}/es`, "Astro preview"),
    waitForHttpOk(
      `http://${previewHost}:${chromePort}/json/version`,
      "Chrome CDP",
    ),
  ]);
}, testTimeoutMs);

afterAll(async () => {
  await stopProcess(previewProcess);
  await stopProcess(chromeProcess);

  if (userDataDir) {
    await removeDirectoryWithRetry(userDataDir);
  }
}, testTimeoutMs);

describe("rendered responsive overflow", () => {
  it(
    "keeps /es contained at 320px while preserving local nav scrolling",
    async () => {
      const themes = ["light", "dark"] as const;

      for (const theme of themes) {
        const metrics = await collectMetrics(theme);

        expect(metrics.documentElement, theme).toEqual({
          scrollWidth: 320,
          clientWidth: 320,
        });
        expect(metrics.body, theme).toEqual({
          scrollWidth: 320,
          clientWidth: 320,
        });
        expect(metrics.primaryNav.scrollWidth, theme).toBeGreaterThan(
          metrics.primaryNav.clientWidth,
        );
        expect(metrics.primaryNav.overflowX, theme).toBe("auto");
        expect(metrics.contactCta.display, theme).toBe("none");
        expect(metrics.contactCta.rects, theme).toBe(0);
        for (const control of metrics.headerControls) {
          if (control.display === "none") {
            continue;
          }

          expect(
            control.rects,
            `${theme}: ${control.className}`,
          ).toBeGreaterThan(0);
          expect(
            control.width,
            `${theme}: ${control.className}`,
          ).toBeGreaterThanOrEqual(
            control.className.includes("header-nav-link") ||
              control.className.includes("header-lang-toggle") ||
              control.className.includes("header-theme-toggle") ||
              control.className.includes("header-contact-cta")
              ? 36
              : 44,
          );
          expect(
            control.height,
            `${theme}: ${control.className}`,
          ).toBeGreaterThanOrEqual(
            control.className.includes("header-nav-link") ||
              control.className.includes("header-lang-toggle") ||
              control.className.includes("header-theme-toggle") ||
              control.className.includes("header-contact-cta")
              ? 36
              : 44,
          );
        }
        expect(metrics.experiencePeriodBadges.length, theme).toBeGreaterThan(0);

        for (const badge of metrics.experiencePeriodBadges) {
          expect(badge.left, `${theme}: ${badge.text}`).toBeGreaterThanOrEqual(
            -1,
          );
          expect(badge.right, `${theme}: ${badge.text}`).toBeLessThanOrEqual(
            metrics.documentElement.clientWidth + 1,
          );
          expect(badge.whiteSpace, `${theme}: ${badge.text}`).toBe("normal");
          expect(
            badge.scrollWidth,
            `${theme}: ${badge.text}`,
          ).toBeLessThanOrEqual(badge.clientWidth + 1);
        }

        expect(metrics.educationTitles.length, theme).toBeGreaterThan(0);

        for (const title of metrics.educationTitles) {
          expect(title.whiteSpace, `${theme}: ${title.text}`).toBe("normal");
          expect(title.textOverflow, `${theme}: ${title.text}`).toBe("clip");
        }
      }
    },
    testTimeoutMs,
  );

  it.each([
    {
      path: "/en",
      width: 320,
      primaryNavHrefs: [
        "#about",
        "#experience",
        "#projects",
        "#skills",
        "#education",
        "#contact",
      ],
      learningProjectsTitle: "Learning projects",
      learningProjectColumns: 1,
    },
    {
      path: "/en",
      width: 375,
      primaryNavHrefs: [
        "#about",
        "#experience",
        "#projects",
        "#skills",
        "#education",
        "#contact",
      ],
      learningProjectsTitle: "Learning projects",
      learningProjectColumns: 1,
    },
    {
      path: "/en",
      width: 768,
      primaryNavHrefs: [
        "#about",
        "#experience",
        "#projects",
        "#skills",
        "#education",
        "#contact",
      ],
      learningProjectsTitle: "Learning projects",
      learningProjectColumns: 2,
    },
    {
      path: "/en",
      width: 1440,
      primaryNavHrefs: [
        "#about",
        "#experience",
        "#projects",
        "#skills",
        "#education",
        "#contact",
      ],
      learningProjectsTitle: "Learning projects",
      learningProjectColumns: 3,
    },
    {
      path: "/es",
      width: 320,
      primaryNavHrefs: [
        "#about",
        "#experience",
        "#projects",
        "#skills",
        "#education",
        "#contact",
      ],
      learningProjectsTitle: "Proyectos de aprendizaje",
      learningProjectColumns: 1,
    },
    {
      path: "/es",
      width: 375,
      primaryNavHrefs: [
        "#about",
        "#experience",
        "#projects",
        "#skills",
        "#education",
        "#contact",
      ],
      learningProjectsTitle: "Proyectos de aprendizaje",
      learningProjectColumns: 1,
    },
    {
      path: "/es",
      width: 768,
      primaryNavHrefs: [
        "#about",
        "#experience",
        "#projects",
        "#skills",
        "#education",
        "#contact",
      ],
      learningProjectsTitle: "Proyectos de aprendizaje",
      learningProjectColumns: 2,
    },
    {
      path: "/es",
      width: 1440,
      primaryNavHrefs: [
        "#about",
        "#experience",
        "#projects",
        "#skills",
        "#education",
        "#contact",
      ],
      learningProjectsTitle: "Proyectos de aprendizaje",
      learningProjectColumns: 3,
    },
  ])(
    "keeps featured InkScroller captures contained at $path $widthpx",
    async ({
      path,
      width,
      primaryNavHrefs,
      learningProjectsTitle,
      learningProjectColumns,
    }) => {
      const metrics = await collectMetrics("dark", path, width);

      expect(metrics.documentElement.scrollWidth).toBe(width);
      expect(metrics.body.scrollWidth).toBe(width);
      expect(metrics.primaryNavHrefs).toEqual(primaryNavHrefs);
      expect(metrics.featuredInkScrollerLinkFocused).toBe(true);
      expect(metrics.featuredMockups).toHaveLength(3);
      const locale = path.startsWith("/es") ? "es" : "en";
      expect(metrics.featuredMockups.map((mockup) => mockup.src)).toEqual([
        `/inkscroller/screenshots/dark/${locale}/explore.jpg`,
        `/inkscroller/screenshots/dark/${locale}/home.jpg`,
        `/inkscroller/screenshots/dark/${locale}/library.jpg`,
      ]);
      expect(metrics.learningProjects).toEqual({
        title: learningProjectsTitle,
        cardCount: 3,
        columns: learningProjectColumns,
      });

      for (const mockup of metrics.featuredMockups) {
        expect(mockup.width).toBe("1080");
        expect(mockup.height).toBe("2340");
        expect(mockup.loading).toBe("lazy");
        expect(mockup.decoding).toBe("async");
        expect(mockup.objectFit).toBe("cover");
        expect(mockup.objectPosition).toBe("50% 0%");
        expect(mockup.screenWidth, JSON.stringify(mockup)).toBeGreaterThan(0);
        expect(mockup.screenHeight, JSON.stringify(mockup)).toBeGreaterThan(0);
        expect(mockup.imageWidth).toBeCloseTo(mockup.screenWidth, 1);
        expect(mockup.imageHeight).toBeCloseTo(mockup.screenHeight, 1);
        expect(mockup.screenWidth / mockup.screenHeight).toBeCloseTo(
          1080 / 2340,
          2,
        );
      }
    },
    testTimeoutMs,
  );

  it.each([
    { path: "/en/projects/inkscroller", width: 320, home: "/en" },
    { path: "/en/projects/inkscroller", width: 768, home: "/en" },
    { path: "/en/projects/inkscroller", width: 1440, home: "/en" },
    { path: "/es/proyectos/inkscroller", width: 320, home: "/es" },
    { path: "/es/proyectos/inkscroller", width: 768, home: "/es" },
    { path: "/es/proyectos/inkscroller", width: 1440, home: "/es" },
  ])(
    "keeps the $path shared header usable at $widthpx",
    async ({ path, width, home }) => {
      const metrics = await collectMetrics("dark", path, width);

      expect(metrics.documentElement.scrollWidth).toBe(width);
      expect(metrics.body.scrollWidth).toBe(width);
      expect(metrics.primaryNavHrefs).toEqual([
        `${home}#about`,
        `${home}#experience`,
        `${home}#projects`,
        `${home}#skills`,
        `${home}#education`,
        `${home}#contact`,
      ]);
      for (const control of metrics.headerControls) {
        if (control.display === "none") {
          continue;
        }

        const minDim =
          control.className.includes("header-nav-link") ||
          control.className.includes("header-lang-toggle") ||
          control.className.includes("header-theme-toggle") ||
          control.className.includes("header-contact-cta")
            ? 36
            : 44;
        expect(control.width, control.className).toBeGreaterThanOrEqual(minDim);
        expect(control.height, control.className).toBeGreaterThanOrEqual(
          minDim,
        );
      }
    },
    testTimeoutMs,
  );
});
