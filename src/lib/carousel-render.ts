import { createCarouselQueue } from "./carousel-navigation";

export function initializeInkScrollerPage(doc: Document): void {
  const view =
    doc.defaultView ??
    (typeof globalThis.window === "undefined" ? undefined : globalThis.window);
  if (!view) return;
  const window: Window = view;
  const ResizeObserver = (window as Window & typeof globalThis).ResizeObserver;

  const carousel = doc.getElementById("inkscroller-carousel");
  if (carousel) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
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

    function setPosition(index: number, animate: boolean): void {
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
    }

    function updateActive(index: number): void {
      origSlides.forEach((slide, slideIndex) =>
        slide.classList.toggle("active", slideIndex === index),
      );
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle("active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function physicalTarget(
      action: NonNullable<ReturnType<typeof navigation.take>>,
    ): number {
      if (action.type === "index") return cloneCount + action.index;
      return physicalIndex + action.direction;
    }

    function settleNavigation(): void {
      if (!activeAction) return;
      clearTimeout(settleTimer!);
      const action = activeAction;
      activeAction = null;
      navigation.settle(action.index);
      if (
        physicalIndex < cloneCount ||
        physicalIndex >= totalReal + cloneCount
      ) {
        setPosition(cloneCount + action.index, false);
      }
      updateActive(action.index);
      isAnimating = false;
      runNavigation();
    }

    function runNavigation(): void {
      if (isAnimating || !track) return;
      const action = navigation.take();
      if (!action) return;

      isAnimating = true;
      activeAction = action;
      setPosition(physicalTarget(action), !prefersReducedMotion.matches);
      if (prefersReducedMotion.matches) {
        settleNavigation();
      } else {
        settleTimer = setTimeout(settleNavigation, 500);
      }
    }

    function nextSlide(): void {
      navigation.enqueueStep(1);
      runNavigation();
    }

    function prevSlide(): void {
      navigation.enqueueStep(-1);
      runNavigation();
    }

    function goToSlide(index: number): void {
      navigation.enqueueIndex(index);
      runNavigation();
    }

    track?.addEventListener("transitionend", (event: Event) => {
      if (
        event.target === track &&
        (event as TransitionEvent).propertyName === "transform"
      )
        settleNavigation();
    });

    if (ResizeObserver) {
      new ResizeObserver(() => {
        if (activeAction) navigation.retry(activeAction);
        clearTimeout(settleTimer!);
        activeAction = null;
        isAnimating = false;
        setPosition(cloneCount + navigation.current(), false);
        runNavigation();
      }).observe(carousel);
    }

    prev?.addEventListener("click", () => {
      prevSlide();
    });
    next?.addEventListener("click", () => {
      nextSlide();
    });
    dots.forEach((dot) =>
      dot.addEventListener("click", () => {
        goToSlide(Number((dot as HTMLElement).dataset.index));
      }),
    );

    carousel.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        if (e.key === "ArrowLeft") prevSlide();
        else nextSlide();
      }
    });

    setPosition(physicalIndex, false);
    updateActive(0);
  }
}
