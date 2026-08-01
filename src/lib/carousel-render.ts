import { createCarouselQueue } from "./carousel-navigation";

const cleanups = new WeakMap<Document, () => void>();

type HeroCapture = {
  src: Record<"dark" | "light", string>;
  srcset: Record<"dark" | "light", Record<"avif" | "webp", string>>;
  alt: string;
  dimensions: Record<"dark" | "light", { width: number; height: number }>;
};

export function initializeInkScrollerPage(doc: Document): void {
  cleanups.get(doc)?.();

  const view =
    doc.defaultView ??
    (typeof globalThis.window === "undefined" ? undefined : globalThis.window);
  if (!view) return;
  const window: Window = view;
  const reducedMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const controller = new AbortController();
  const timers: Array<ReturnType<typeof setTimeout>> = [];
  const addTimer = (timer: ReturnType<typeof setTimeout>) => timers.push(timer);
  const clearTimers = () => timers.splice(0).forEach(clearTimeout);
  const cleanup = () => {
    controller.abort();
    clearTimers();
    carouselInterval && clearInterval(carouselInterval);
    heroInterval && clearInterval(heroInterval);
    observer?.disconnect();
    doc
      .querySelectorAll("[data-carousel-clone]")
      .forEach((clone) => clone.remove());
  };
  cleanups.set(doc, cleanup);

  let userPaused = Boolean(reducedMotion);
  const hovered = new Set<Element>();
  const focused = new Set<Element>();
  let carouselInterval: ReturnType<typeof setInterval> | null = null;
  let heroInterval: ReturnType<typeof setInterval> | null = null;
  let observer: ResizeObserver | null = null;
  let advanceCarousel = () => {};

  const heroCurrent = doc.getElementById(
    "hero-img-current",
  ) as HTMLImageElement | null;
  const heroNext = doc.getElementById(
    "hero-img-next",
  ) as HTMLImageElement | null;
  const captures = (() => {
    try {
      return JSON.parse(heroCurrent?.dataset.captures ?? "[]") as HeroCapture[];
    } catch {
      return [] as HeroCapture[];
    }
  })();
  let heroIndex = Number(heroNext?.dataset.captureIndex ?? 0);
  let heroTransitioning = false;

  const updateHeroLayer = (image: HTMLImageElement, capture: HeroCapture) => {
    const theme = doc.documentElement.classList.contains("light")
      ? "light"
      : "dark";
    image.src = capture.src[theme];
    image.alt = capture.alt;
    image.width = capture.dimensions[theme].width;
    image.height = capture.dimensions[theme].height;
    image.dataset.darkSrc = capture.src.dark;
    image.dataset.lightSrc = capture.src.light;
    image.dataset.darkWidth = String(capture.dimensions.dark.width);
    image.dataset.darkHeight = String(capture.dimensions.dark.height);
    image.dataset.lightWidth = String(capture.dimensions.light.width);
    image.dataset.lightHeight = String(capture.dimensions.light.height);
    const sources = image.closest("picture")?.querySelectorAll("source") ?? [];
    sources.forEach((source) => {
      const format = source.type === "image/avif" ? "avif" : "webp";
      source.srcset = capture.srcset[theme][format];
      source.dataset.darkSrcset = capture.srcset.dark[format];
      source.dataset.lightSrcset = capture.srcset.light[format];
    });
  };

  const stageHero = () => {
    if (!heroCurrent || !heroNext || captures.length < 2 || heroTransitioning)
      return;
    heroTransitioning = true;
    const nextIndex = (heroIndex + 1) % captures.length;
    updateHeroLayer(heroNext, captures[nextIndex]);
    heroCurrent.classList.add("slide-out");
    heroNext.classList.remove("hero-img-next");
    heroNext.classList.add("slide-in");
    const commit = () => {
      heroCurrent.classList.remove("slide-out");
      heroNext.classList.remove("slide-in");
      updateHeroLayer(heroCurrent, captures[nextIndex]);
      updateHeroLayer(heroNext, captures[nextIndex]);
      heroNext.classList.add("hero-img-next");
      heroIndex = nextIndex;
      heroTransitioning = false;
    };
    if (reducedMotion) commit();
    else addTimer(setTimeout(commit, 450));
  };

  const carousel = doc.getElementById("inkscroller-carousel");
  if (carousel) {
    const track = carousel.querySelector(".inkscroller-carousel-track");
    const viewport = carousel.querySelector(".inkscroller-carousel-viewport");
    const prev = carousel.querySelector(".inkscroller-prev");
    const next = carousel.querySelector(".inkscroller-next");
    const dots = Array.from(carousel.querySelectorAll(".inkscroller-dot"));
    const origSlides = Array.from(
      track?.querySelectorAll(".inkscroller-slide") ?? [],
    );
    const cloneCount = 3;
    const cloneSlide = (slide: Element) => {
      const clone = slide.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      clone.dataset.carouselClone = "";
      return clone;
    };
    track?.prepend(...origSlides.slice(-cloneCount).map(cloneSlide));
    track?.append(...origSlides.slice(0, cloneCount).map(cloneSlide));
    const slides = Array.from(
      track?.querySelectorAll(".inkscroller-slide") ?? [],
    );
    const totalReal = origSlides.length;
    let isAnimating = false;
    const navigation = createCarouselQueue(totalReal);
    let physicalIndex = cloneCount;
    let activeAction: ReturnType<typeof navigation.take> = null;
    let settleTimer: ReturnType<typeof setTimeout> | null = null;

    const setPosition = (index: number, animate: boolean) => {
      const firstSlide = slides[0];
      if (!track || !viewport || !firstSlide) return;
      track.classList.toggle("is-resetting", !animate);
      const slideWidth =
        parseFloat(window.getComputedStyle(firstSlide).width) ||
        viewport.clientWidth;
      const preview = (viewport.clientWidth - slideWidth) / 2;
      (track as HTMLElement).style.transform =
        `translate3d(${preview - index * slideWidth}px, 0, 0)`;
      physicalIndex = index;
      if (!animate) void (track as HTMLElement).offsetWidth;
      track.classList.remove("is-resetting");
    };
    const updateActive = (index: number) => {
      origSlides.forEach((slide, slideIndex) =>
        slide.classList.toggle("active", slideIndex === index),
      );
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle("active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };
    const settleNavigation = () => {
      if (!activeAction) return;
      const completed = activeAction;
      activeAction = null;
      navigation.settle(completed.index);
      if (physicalIndex < cloneCount || physicalIndex >= totalReal + cloneCount)
        setPosition(cloneCount + completed.index, false);
      updateActive(completed.index);
      isAnimating = false;
      runNavigation();
    };
    const runNavigation = () => {
      if (isAnimating || !track) return;
      const action = navigation.take();
      if (!action) return;
      isAnimating = true;
      activeAction = action;
      const target =
        action.type === "index"
          ? cloneCount + action.index
          : physicalIndex + action.direction;
      setPosition(target, !reducedMotion);
      if (reducedMotion) settleNavigation();
      else {
        settleTimer = setTimeout(settleNavigation, 500);
        addTimer(settleTimer);
      }
    };
    const move = (direction: 1 | -1) => {
      navigation.enqueueStep(direction);
      runNavigation();
    };
    advanceCarousel = () => {
      if (!isAnimating) move(1);
    };
    track?.addEventListener(
      "transitionend",
      (event: Event) => {
        if (
          event.target === track &&
          (event as TransitionEvent).propertyName === "transform"
        ) {
          if (settleTimer) clearTimeout(settleTimer);
          settleNavigation();
        }
      },
      { signal: controller.signal },
    );
    const ResizeObserver = (window as Window & typeof globalThis)
      .ResizeObserver;
    if (ResizeObserver) {
      observer = new ResizeObserver(() => {
        if (activeAction) navigation.retry(activeAction);
        if (settleTimer) clearTimeout(settleTimer);
        activeAction = null;
        isAnimating = false;
        setPosition(cloneCount + navigation.current(), false);
        runNavigation();
      });
      observer.observe(carousel);
    }
    prev?.addEventListener("click", () => move(-1), {
      signal: controller.signal,
    });
    next?.addEventListener("click", () => move(1), {
      signal: controller.signal,
    });
    dots.forEach((dot) =>
      dot.addEventListener(
        "click",
        () => {
          navigation.enqueueIndex(Number((dot as HTMLElement).dataset.index));
          runNavigation();
        },
        { signal: controller.signal },
      ),
    );
    carousel.addEventListener(
      "keydown",
      (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        move(event.key === "ArrowLeft" ? -1 : 1);
      },
      { signal: controller.signal },
    );
    setPosition(physicalIndex, false);
    updateActive(0);
  }

  const toggle = doc.getElementById(
    "inkscroller-autoplay-toggle",
  ) as HTMLButtonElement | null;
  const setToggle = () => {
    if (!toggle) return;
    toggle.textContent =
      (userPaused ? toggle.dataset.playLabel : toggle.dataset.pauseLabel) ?? "";
    toggle.setAttribute("aria-pressed", String(userPaused));
  };
  const syncAutoplay = () => {
    if (carouselInterval) clearInterval(carouselInterval);
    if (heroInterval) clearInterval(heroInterval);
    carouselInterval = null;
    heroInterval = null;
    if (heroTransitioning) {
      clearTimers();
      heroCurrent?.classList.remove("slide-out");
      heroNext?.classList.remove("slide-in");
      heroNext?.classList.add("hero-img-next");
      heroTransitioning = false;
    }
    if (userPaused || hovered.size || focused.size) return;
    carouselInterval = setInterval(advanceCarousel, 5_000);
    heroInterval = setInterval(stageHero, 4_500);
  };
  const suspendOnInteraction = (region: Element) => {
    region.addEventListener(
      "mouseenter",
      () => {
        hovered.add(region);
        syncAutoplay();
      },
      { signal: controller.signal },
    );
    region.addEventListener(
      "mouseleave",
      () => {
        hovered.delete(region);
        syncAutoplay();
      },
      { signal: controller.signal },
    );
    region.addEventListener(
      "focusin",
      () => {
        focused.add(region);
        syncAutoplay();
      },
      { signal: controller.signal },
    );
    region.addEventListener(
      "focusout",
      (event) => {
        if (
          !region.contains((event as FocusEvent).relatedTarget as Node | null)
        )
          focused.delete(region);
        syncAutoplay();
      },
      { signal: controller.signal },
    );
  };
  [carousel, doc.querySelector(".inkscroller-hero-device")].forEach(
    (region) => {
      if (region) suspendOnInteraction(region);
    },
  );
  toggle?.addEventListener(
    "click",
    () => {
      userPaused = !userPaused;
      setToggle();
      syncAutoplay();
    },
    { signal: controller.signal },
  );
  setToggle();
  syncAutoplay();
}
