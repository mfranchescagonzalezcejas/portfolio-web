import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { initializeInkScrollerPage } from "./carousel-render";

const carouselHtml = [
  '<div id="inkscroller-carousel" class="inkscroller-carousel" tabindex="0">',
  '  <div class="inkscroller-carousel-viewport">',
  '    <div class="inkscroller-carousel-track">',
  '      <article class="inkscroller-slide" aria-label="Slide 1: A"><h3>A</h3></article>',
  '      <article class="inkscroller-slide" aria-label="Slide 2: B"><h3>B</h3></article>',
  '      <article class="inkscroller-slide" aria-label="Slide 3: C"><h3>C</h3></article>',
  "    </div>",
  "  </div>",
  '  <button class="inkscroller-arrow inkscroller-prev" type="button">&larr;</button>',
  '  <button class="inkscroller-arrow inkscroller-next" type="button">&rarr;</button>',
  '  <nav class="inkscroller-dots">',
  '    <button class="inkscroller-dot active" data-index="0"></button>',
  '    <button class="inkscroller-dot" data-index="1"></button>',
  '    <button class="inkscroller-dot" data-index="2"></button>',
  "  </nav>",
  "</div>",
].join("\n");

const autoplayHtml = [
  '<div class="inkscroller-hero-device">',
  '  <div id="hero-screen">',
  '    <picture><source type="image/avif" /><source type="image/webp" /><img id="hero-img-current" class="hero-img-layer" data-captures=\'[{"src":{"dark":"/dark-1.png","light":"/light-1.png"},"srcset":{"dark":{"avif":"/dark-1.avif","webp":"/dark-1.webp"},"light":{"avif":"/light-1.avif","webp":"/light-1.webp"}},"alt":"One","dimensions":{"dark":{"width":100,"height":200},"light":{"width":101,"height":201}}},{"src":{"dark":"/dark-2.png","light":"/light-2.png"},"srcset":{"dark":{"avif":"/dark-2.avif","webp":"/dark-2.webp"},"light":{"avif":"/light-2.avif","webp":"/light-2.webp"}},"alt":"Two","dimensions":{"dark":{"width":110,"height":210},"light":{"width":111,"height":211}}}]\' /></picture>',
  '    <picture><source type="image/avif" /><source type="image/webp" /><img id="hero-img-next" class="hero-img-layer hero-img-next" /></picture>',
  "  </div>",
  "</div>",
  carouselHtml,
  '<button id="inkscroller-autoplay-toggle" type="button" aria-pressed="false" data-pause-label="Pause" data-play-label="Play">Pause</button>',
].join("\n");

const parseHtml = (body: string) => {
  const doc = new DOMParser().parseFromString(
    "<html><body>" + body + "</body></html>",
    "text/html",
  );
  const viewport = doc.querySelector(
    ".inkscroller-carousel-viewport",
  ) as HTMLElement | null;
  if (viewport) {
    Object.defineProperty(viewport, "clientWidth", {
      configurable: true,
      value: 320,
    });
    doc.querySelectorAll<HTMLElement>(".inkscroller-slide").forEach((slide) => {
      slide.style.width = "240px";
    });
  }
  return doc;
};

const createMatchMediaMock = (reducedMotion = false) => {
  const mock = vi.fn().mockImplementation((query: string) => ({
    matches: query === "(prefers-reduced-motion: reduce)" && reducedMotion,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  return mock;
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", createMatchMediaMock());
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("initializeInkScrollerPage", () => {
  it("uses the document window when available", () => {
    const doc = parseHtml(carouselHtml);
    const matchMedia = createMatchMediaMock();
    const observe = vi.fn();
    Object.defineProperty(doc, "defaultView", {
      configurable: true,
      value: {
        matchMedia,
        getComputedStyle: () => ({ width: "240px" }),
        ResizeObserver: class {
          observe = observe;
        },
      },
    });

    initializeInkScrollerPage(doc);

    expect(matchMedia).toHaveBeenCalledWith("(prefers-reduced-motion: reduce)");
    expect(observe).toHaveBeenCalled();
  });

  it("continues initialization when ResizeObserver is unavailable", () => {
    const doc = parseHtml(carouselHtml);
    const matchMedia = createMatchMediaMock();
    Object.defineProperty(doc, "defaultView", {
      configurable: true,
      value: {
        matchMedia,
        getComputedStyle: () => ({ width: "240px" }),
      },
    });

    expect(() => initializeInkScrollerPage(doc)).not.toThrow();
    expect(
      doc.querySelectorAll(".inkscroller-carousel-track .inkscroller-slide"),
    ).toHaveLength(9);

    vi.advanceTimersByTime(10_000);
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="1"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");
  });

  it("uses the browser window when the document has none", () => {
    const doc = parseHtml(carouselHtml);

    initializeInkScrollerPage(doc);

    expect(
      doc.querySelectorAll(".inkscroller-carousel-track .inkscroller-slide"),
    ).toHaveLength(9);
  });

  it("exits safely without a document or browser window", () => {
    const doc = parseHtml(carouselHtml);
    vi.stubGlobal("window", undefined);

    expect(() => initializeInkScrollerPage(doc)).not.toThrow();
    expect(
      doc.querySelectorAll(".inkscroller-carousel-track .inkscroller-slide"),
    ).toHaveLength(3);
  });

  it("exits safely when carousel nodes are missing", () => {
    const doc = parseHtml("");

    expect(() => initializeInkScrollerPage(doc)).not.toThrow();
  });

  it("clones slides for infinite loop", () => {
    const doc = parseHtml(carouselHtml);

    initializeInkScrollerPage(doc);

    const track = doc.querySelector(".inkscroller-carousel-track");
    const slides = track?.querySelectorAll(".inkscroller-slide");
    expect(slides?.length).toBe(9);
  });

  it("sets aria-current on the first dot", () => {
    const doc = parseHtml(carouselHtml);

    initializeInkScrollerPage(doc);

    const firstDot = doc.querySelector('.inkscroller-dot[data-index="0"]');
    expect(firstDot?.getAttribute("aria-current")).toBe("true");
  });

  it("navigates on next button click", () => {
    const doc = parseHtml(carouselHtml);

    initializeInkScrollerPage(doc);

    const track = doc.querySelector(".inkscroller-carousel-track");
    const initialTransform = (track as HTMLElement).style.transform;
    const next = doc.querySelector(".inkscroller-next");
    next?.dispatchEvent(new Event("click"));
    vi.advanceTimersByTime(500);

    expect(track?.getAttribute("style")).toContain("translate3d");
    const activeDot = doc.querySelector('.inkscroller-dot[data-index="1"]');
    expect(activeDot?.classList.contains("active")).toBe(true);
    expect(activeDot?.getAttribute("aria-current")).toBe("true");
    expect((track as HTMLElement).style.transform).not.toBe(initialTransform);
  });

  it("does not retain completed carousel settle timers during cleanup", () => {
    const doc = parseHtml(carouselHtml);
    initializeInkScrollerPage(doc);
    doc.querySelector(".inkscroller-next")?.dispatchEvent(new Event("click"));
    vi.advanceTimersByTime(500);
    const clearTimeout = vi.spyOn(globalThis, "clearTimeout");

    initializeInkScrollerPage(doc);

    expect(clearTimeout).not.toHaveBeenCalled();
  });

  it("clears a pending carousel settle timer during cleanup", () => {
    const doc = parseHtml(carouselHtml);
    initializeInkScrollerPage(doc);
    doc.querySelector(".inkscroller-next")?.dispatchEvent(new Event("click"));
    const clearTimeout = vi.spyOn(globalThis, "clearTimeout");

    initializeInkScrollerPage(doc);

    expect(clearTimeout).toHaveBeenCalledTimes(1);
  });

  it("navigates on prev button click", () => {
    const doc = parseHtml(carouselHtml);

    initializeInkScrollerPage(doc);

    const track = doc.querySelector(".inkscroller-carousel-track");
    const initialTransform = (track as HTMLElement).style.transform;
    const prev = doc.querySelector(".inkscroller-prev");
    prev?.dispatchEvent(new Event("click"));
    vi.advanceTimersByTime(500);

    expect(track?.getAttribute("style")).toContain("translate3d");
    const activeDot = doc.querySelector('.inkscroller-dot[data-index="2"]');
    expect(activeDot?.classList.contains("active")).toBe(true);
    expect(activeDot?.getAttribute("aria-current")).toBe("true");
    expect((track as HTMLElement).style.transform).not.toBe(initialTransform);
  });

  it("handles dot click navigation", () => {
    const doc = parseHtml(carouselHtml);

    initializeInkScrollerPage(doc);

    const track = doc.querySelector(".inkscroller-carousel-track");
    const initialTransform = (track as HTMLElement).style.transform;
    const dot = doc.querySelector('.inkscroller-dot[data-index="2"]');
    dot?.dispatchEvent(new Event("click"));
    vi.advanceTimersByTime(500);

    expect(track?.getAttribute("style")).toContain("translate3d");
    expect(dot?.classList.contains("active")).toBe(true);
    expect(dot?.getAttribute("aria-current")).toBe("true");
    expect((track as HTMLElement).style.transform).not.toBe(initialTransform);
  });

  it("handles keyboard navigation in both directions", () => {
    const doc = parseHtml(carouselHtml);

    initializeInkScrollerPage(doc);

    const track = doc.querySelector(".inkscroller-carousel-track");
    const initialTransform = (track as HTMLElement).style.transform;
    const carousel = doc.getElementById("inkscroller-carousel");
    carousel?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight" }),
    );
    vi.advanceTimersByTime(500);

    expect(track?.getAttribute("style")).toContain("translate3d");
    const activeDot = doc.querySelector('.inkscroller-dot[data-index="1"]');
    expect(activeDot?.classList.contains("active")).toBe(true);
    expect(activeDot?.getAttribute("aria-current")).toBe("true");
    expect((track as HTMLElement).style.transform).not.toBe(initialTransform);
    carousel?.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    vi.advanceTimersByTime(500);
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="0"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");
  });

  it("advances the hero at 4.5 seconds and the carousel at 5 seconds", () => {
    const doc = parseHtml(autoplayHtml);
    initializeInkScrollerPage(doc);

    vi.advanceTimersByTime(4_500);
    expect(doc.getElementById("hero-img-current")?.getAttribute("alt")).toBe(
      null,
    );
    vi.advanceTimersByTime(450);
    expect(doc.getElementById("hero-img-current")?.getAttribute("alt")).toBe(
      "Two",
    );

    vi.advanceTimersByTime(50);
    vi.advanceTimersByTime(500);
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="1"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");
  });

  it("toggles both timers and exposes paused state", () => {
    const doc = parseHtml(autoplayHtml);
    initializeInkScrollerPage(doc);
    const toggle = doc.getElementById("inkscroller-autoplay-toggle")!;

    toggle.dispatchEvent(new Event("click"));
    expect(toggle.textContent).toBe("Play");
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    vi.advanceTimersByTime(10_000);
    expect(doc.getElementById("hero-img-current")?.getAttribute("alt")).toBe(
      null,
    );
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="0"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");

    toggle.dispatchEvent(new Event("click"));
    expect(toggle.textContent).toBe("Pause");
    expect(toggle.getAttribute("aria-pressed")).toBe("false");
  });

  it("starts reduced-motion users paused until they explicitly play", () => {
    vi.stubGlobal("matchMedia", createMatchMediaMock(true));
    const doc = parseHtml(autoplayHtml);
    initializeInkScrollerPage(doc);
    const toggle = doc.getElementById("inkscroller-autoplay-toggle")!;

    expect(toggle.textContent).toBe("Play");
    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    toggle.dispatchEvent(new Event("click"));
    vi.advanceTimersByTime(4_500);
    expect(doc.getElementById("hero-img-current")?.getAttribute("alt")).toBe(
      "Two",
    );
  });

  it("keeps an explicit reduced-motion Play choice through temporary interactions", () => {
    vi.stubGlobal("matchMedia", createMatchMediaMock(true));
    const doc = parseHtml(autoplayHtml);
    initializeInkScrollerPage(doc);
    const carousel = doc.getElementById("inkscroller-carousel")!;
    const toggle = doc.getElementById("inkscroller-autoplay-toggle")!;

    toggle.dispatchEvent(new Event("click"));
    carousel.dispatchEvent(new Event("mouseenter"));
    vi.advanceTimersByTime(10_000);
    carousel.dispatchEvent(new Event("mouseleave"));
    vi.advanceTimersByTime(4_500);

    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    expect(doc.getElementById("hero-img-current")?.getAttribute("alt")).toBe(
      "Two",
    );

    carousel.dispatchEvent(new FocusEvent("focusin"));
    vi.advanceTimersByTime(10_000);
    carousel.dispatchEvent(new FocusEvent("focusout"));
    vi.advanceTimersByTime(5_000);

    expect(toggle.getAttribute("aria-pressed")).toBe("false");
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="1"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");
  });

  it("keeps both hero layers responsive to a theme change during rotation", () => {
    const doc = parseHtml(autoplayHtml);
    initializeInkScrollerPage(doc);
    vi.advanceTimersByTime(4_500);

    const next = doc.getElementById("hero-img-next")!;
    expect(next.getAttribute("src")).toContain("/dark-2.png");
    doc.documentElement.classList.add("light");
    vi.advanceTimersByTime(450);

    ["hero-img-current", "hero-img-next"].forEach((id) => {
      const image = doc.getElementById(id) as HTMLImageElement;
      const sources = image.closest("picture")?.querySelectorAll("source")!;

      expect(image.getAttribute("src")).toContain("/light-2.png");
      expect(image.width).toBe(111);
      expect(image.height).toBe(211);
      expect(sources[0].getAttribute("srcset")).toBe("/light-2.avif");
      expect(sources[1].getAttribute("srcset")).toBe("/light-2.webp");
    });
  });

  it("keeps an explicit pause through hover and focus while manual navigation works", () => {
    const doc = parseHtml(autoplayHtml);
    initializeInkScrollerPage(doc);
    const carousel = doc.getElementById("inkscroller-carousel")!;
    const toggle = doc.getElementById("inkscroller-autoplay-toggle")!;
    toggle.dispatchEvent(new Event("click"));
    carousel.dispatchEvent(new Event("mouseenter"));
    carousel.dispatchEvent(new Event("mouseleave"));
    carousel.dispatchEvent(new FocusEvent("focusin"));
    carousel.dispatchEvent(new FocusEvent("focusout"));
    vi.advanceTimersByTime(10_000);

    expect(toggle.getAttribute("aria-pressed")).toBe("true");
    doc.querySelector(".inkscroller-next")?.dispatchEvent(new Event("click"));
    vi.advanceTimersByTime(500);
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="1"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");
    doc
      .querySelector('.inkscroller-dot[data-index="2"]')
      ?.dispatchEvent(new Event("click"));
    vi.advanceTimersByTime(500);
    carousel.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowLeft" }));
    vi.advanceTimersByTime(500);
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="1"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");
  });

  it("temporarily suspends autoplay for hover and resumes after it ends", () => {
    const doc = parseHtml(autoplayHtml);
    initializeInkScrollerPage(doc);
    const carousel = doc.getElementById("inkscroller-carousel")!;

    carousel.dispatchEvent(new Event("mouseenter"));
    vi.advanceTimersByTime(10_000);
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="0"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");
    carousel.dispatchEvent(new Event("mouseleave"));
    vi.advanceTimersByTime(5_500);
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="1"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");
  });

  it("settles carousel navigation when suspending an active hero transition", () => {
    const doc = parseHtml(autoplayHtml);
    initializeInkScrollerPage(doc);
    const hero = doc.querySelector(".inkscroller-hero-device")!;
    const next = doc.querySelector(".inkscroller-next")!;

    vi.advanceTimersByTime(4_500);
    next.dispatchEvent(new Event("click"));
    hero.dispatchEvent(new Event("mouseenter"));
    vi.advanceTimersByTime(500);

    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="1"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");

    next.dispatchEvent(new Event("click"));
    vi.advanceTimersByTime(500);
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="2"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");
  });

  it("cancels staged hero work and old listeners when reinitialized", () => {
    const doc = parseHtml(autoplayHtml);
    initializeInkScrollerPage(doc);
    vi.advanceTimersByTime(4_500);
    initializeInkScrollerPage(doc);
    vi.advanceTimersByTime(450);

    expect(doc.getElementById("hero-img-current")?.getAttribute("alt")).toBe(
      null,
    );
    expect(
      doc.querySelectorAll(".inkscroller-carousel-track .inkscroller-slide"),
    ).toHaveLength(9);
    doc.querySelector(".inkscroller-next")?.dispatchEvent(new Event("click"));
    vi.advanceTimersByTime(1_000);
    expect(
      doc
        .querySelector('.inkscroller-dot[data-index="1"]')
        ?.getAttribute("aria-current"),
    ).toBe("true");
  });
});
