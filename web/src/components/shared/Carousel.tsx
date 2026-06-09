"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Carousel({
  children,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const track = root.querySelector<HTMLElement>("[data-gc-track]");
    if (!track) return;
    const slideEls = Array.from(track.children) as HTMLElement[];
    if (!slideEls.length) return;

    const fadeLeft = root.querySelector<HTMLElement>("[data-gc-fade-left]");
    const fadeRight = root.querySelector<HTMLElement>("[data-gc-fade-right]");
    const btnPrev = root.querySelector<HTMLButtonElement>("[data-gc-prev]");
    const btnNext = root.querySelector<HTMLButtonElement>("[data-gc-next]");

    function getMaxScroll() {
      return Math.max(0, track!.scrollWidth - track!.clientWidth);
    }

    function scrollForCenter(i: number) {
      const slide = slideEls[i];
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const target = slideCenter - track!.clientWidth / 2;
      return Math.max(0, Math.min(getMaxScroll(), target));
    }

    let stops: { scrollPos: number; slideIdx: number }[] = [];

    function computeStops() {
      const max = getMaxScroll();
      if (max <= 1) { stops = []; return; }
      const out: typeof stops = [];
      for (let i = 0; i < slideEls.length; i++) {
        const target = scrollForCenter(i);
        if (out.some((s) => Math.abs(s.scrollPos - target) < 4)) continue;
        out.push({ scrollPos: target, slideIdx: i });
      }
      stops = out;
    }

    function nearestStopIndex() {
      if (!stops.length) return -1;
      const sl = track!.scrollLeft;
      let bestI = 0;
      let bestD = Infinity;
      for (let i = 0; i < stops.length; i++) {
        const d = Math.abs(stops[i].scrollPos - sl);
        if (d < bestD) { bestD = d; bestI = i; }
      }
      return bestI;
    }

    let animFrame: number | null = null;
    function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

    function smoothScrollTo(target: number) {
      if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
      const start = track!.scrollLeft;
      const distance = target - start;
      if (Math.abs(distance) < 0.5) return;

      const duration = Math.max(260, Math.min(520, 220 + Math.abs(distance) * 0.35));

      const wasSnap = track!.style.scrollSnapType;
      const wasBehavior = track!.style.scrollBehavior;
      track!.style.scrollSnapType = "none";
      track!.style.scrollBehavior = "auto";

      const startTime = performance.now();

      function step(now: number) {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(t);
        track!.scrollLeft = start + distance * eased;
        if (t < 1) {
          animFrame = requestAnimationFrame(step);
        } else {
          animFrame = null;
          track!.style.scrollSnapType = wasSnap || "";
          track!.style.scrollBehavior = wasBehavior || "";
        }
      }
      animFrame = requestAnimationFrame(step);
    }

    function update() {
      const sl = track!.scrollLeft;
      const max = getMaxScroll();
      const atIni = sl <= 1;
      const atFin = sl >= max - 1;

      if (fadeLeft) fadeLeft.classList.toggle("is-hidden", atIni);
      if (fadeRight) fadeRight.classList.toggle("is-hidden", atFin);
      if (btnPrev) btnPrev.disabled = atIni;
      if (btnNext) btnNext.disabled = atFin;
    }

    function gotoStop(dir: number) {
      if (!stops.length) return;
      const cur = nearestStopIndex();
      const ni = Math.max(0, Math.min(stops.length - 1, cur + dir));
      if (ni === cur) return;
      smoothScrollTo(stops[ni].scrollPos);
    }

    const onPrev = () => gotoStop(-1);
    const onNext = () => gotoStop(+1);
    btnPrev?.addEventListener("click", onPrev);
    btnNext?.addEventListener("click", onNext);

    let raf: number | null = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = null; update(); });
    };
    track.addEventListener("scroll", onScroll, { passive: true });

    function relayout() {
      computeStops();
      update();
    }

    window.addEventListener("resize", relayout);

    let ro: ResizeObserver | null = null;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(relayout);
      ro.observe(track);
    }

    requestAnimationFrame(relayout);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      btnPrev?.removeEventListener("click", onPrev);
      btnNext?.removeEventListener("click", onNext);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", relayout);
      ro?.disconnect();
    };
  }, []);

  return (
    <div className={`gc-carousel ${className}`.trim()} ref={rootRef} aria-label={ariaLabel}>
      <div className="gc-carousel__viewport">
        <div className="gc-carousel__track" data-gc-track>
          {children}
        </div>

        <div className="gc-carousel__fade gc-carousel__fade--left is-hidden" data-gc-fade-left />
        <div className="gc-carousel__fade gc-carousel__fade--right" data-gc-fade-right />

        <button className="gc-carousel__arrow gc-carousel__arrow--prev" data-gc-prev disabled aria-label="Anterior">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button className="gc-carousel__arrow gc-carousel__arrow--next" data-gc-next aria-label="Siguiente">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
