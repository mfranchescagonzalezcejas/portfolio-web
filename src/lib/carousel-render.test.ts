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
        .querySelector('.inkscroller-dot[data-index="0"]')
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
});
