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
  '<div class="inkscroller-hero-device">',
  '  <img id="hero-img-current" src="/test.jpg" data-captures=\'[{"src":{"dark":"/d.jpg","light":"/l.jpg"},"alt":"alt1"},{"src":{"dark":"/d2.jpg","light":"/l2.jpg"},"alt":"alt2"}]\' />',
  '  <img id="hero-img-next" src="" style="display:none" />',
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

  it("handles keyboard navigation", () => {
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
  });

  it("skips autoplay when reduced motion is preferred", () => {
    vi.stubGlobal("matchMedia", createMatchMediaMock(true));

    const doc = parseHtml(carouselHtml);

    initializeInkScrollerPage(doc);

    vi.advanceTimersByTime(10_000);

    const firstDot = doc.querySelector('.inkscroller-dot[data-index="0"]');
    expect(firstDot?.getAttribute("aria-current")).toBe("true");
  });
});
