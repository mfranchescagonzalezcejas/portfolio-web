import { createCarouselQueue } from "./carousel-navigation";

export function initializeInkScrollerPage(doc: Document): void {
  const carousel = doc.getElementById("inkscroller-carousel");
  if (carousel) {
    const prefersReducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const track = carousel.querySelector(".inkscroller-carousel-track");
    const viewport = carousel.querySelector(".inkscroller-carousel-viewport");
    const prev = carousel.querySelector(".inkscroller-prev");
    const next = carousel.querySelector(".inkscroller-next");
    const dots = Array.from(carousel.querySelectorAll(".inkscroller-dot"));
    let timer: ReturnType<typeof setInterval> | null = null;

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
      if (!track) return;
      track.classList.toggle("is-resetting", !animate);
      const slideWidth =
        parseFloat(getComputedStyle(slides[0]).width) || viewport!.clientWidth;
      const preview = (viewport!.clientWidth - slideWidth) / 2;
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

    function startAutoPlay(): void {
      if (prefersReducedMotion.matches || timer) return;
      timer = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay(): void {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    track?.addEventListener("transitionend", (event: Event) => {
      if (
        event.target === track &&
        (event as TransitionEvent).propertyName === "transform"
      )
        settleNavigation();
    });

    new ResizeObserver(() => {
      if (activeAction) navigation.retry(activeAction);
      clearTimeout(settleTimer!);
      activeAction = null;
      isAnimating = false;
      setPosition(cloneCount + navigation.current(), false);
      runNavigation();
    }).observe(carousel);

    carousel.addEventListener("mouseenter", stopAutoPlay);
    carousel.addEventListener("focusin", stopAutoPlay);
    carousel.addEventListener("mouseleave", startAutoPlay);
    carousel.addEventListener("focusout", (e: FocusEvent) => {
      if (!carousel.contains(e.relatedTarget as Node)) startAutoPlay();
    });

    prev?.addEventListener("click", () => {
      stopAutoPlay();
      prevSlide();
    });
    next?.addEventListener("click", () => {
      stopAutoPlay();
      nextSlide();
    });
    dots.forEach((dot) =>
      dot.addEventListener("click", () => {
        stopAutoPlay();
        goToSlide(Number((dot as HTMLElement).dataset.index));
      }),
    );

    carousel.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        stopAutoPlay();
        if (e.key === "ArrowLeft") prevSlide();
        else nextSlide();
      }
    });

    setPosition(physicalIndex, false);
    updateActive(0);
    if (!prefersReducedMotion.matches) startAutoPlay();
  }

  // Hero image auto-cycle
  {
    const currentImg = doc.getElementById(
      "hero-img-current",
    ) as HTMLImageElement | null;
    const nextImg = doc.getElementById(
      "hero-img-next",
    ) as HTMLImageElement | null;
    if (currentImg && nextImg && currentImg.dataset.captures) {
      const captures = JSON.parse(currentImg.dataset.captures);
      if (captures.length > 1) {
        let idx = 0;
        let heroTimer: ReturnType<typeof setInterval> | null = null;
        const prefersReducedMotion = matchMedia(
          "(prefers-reduced-motion: reduce)",
        );
        const setCurrentCapture = (capture: {
          src: { light: string; dark: string };
          alt: string;
        }) => {
          currentImg.src =
            capture.src[
              doc.documentElement.classList.contains("light") ? "light" : "dark"
            ];
          currentImg.dataset.darkSrc = capture.src.dark;
          currentImg.dataset.lightSrc = capture.src.light;
          currentImg.alt = capture.alt;
        };
        const startCycle = () => {
          if (prefersReducedMotion.matches || heroTimer) return;
          heroTimer = setInterval(() => {
            const nextIdx = (idx + 1) % captures.length;
            nextImg.src =
              captures[nextIdx].src[
                doc.documentElement.classList.contains("light")
                  ? "light"
                  : "dark"
              ];
            nextImg.alt = captures[nextIdx].alt;
            nextImg.style.display = "block";
            currentImg.classList.add("slide-out");
            nextImg.classList.add("slide-in");
            setTimeout(() => {
              setCurrentCapture(captures[nextIdx]);
              currentImg.classList.remove("slide-out");
              nextImg.classList.remove("slide-in");
              nextImg.style.display = "none";
              idx = nextIdx;
            }, 450);
          }, 4500);
        };
        const stopCycle = () => {
          if (!heroTimer) return;
          clearInterval(heroTimer);
          heroTimer = null;
        };
        const heroDevice = currentImg.closest(".inkscroller-hero-device");
        heroDevice?.addEventListener("mouseenter", stopCycle);
        heroDevice?.addEventListener("mouseleave", startCycle);
        startCycle();
      }
    }
  }
}
