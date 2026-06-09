"use client";

// =====================================================================
// COMPONENTE: HomeEffects (efectos de scroll de la home)
// ---------------------------------------------------------------------
// No pinta nada (devuelve null). Solo escucha el scroll para ir
// "encendiendo" las tarjetas del metodo (la serpiente) y las filas de la
// comparativa segun bajas por la pagina. Es decoracion/animacion.
// =====================================================================
import { useEffect } from "react";

export default function HomeEffects() {
  useEffect(() => {
    const compRows = Array.from(document.querySelectorAll<HTMLElement>(".comp-row"));
    const observed = Array.from(document.querySelectorAll<HTMLElement>(".porque-solo"));
    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("is-on", entry.isIntersecting);
          });
        }, { rootMargin: "-42% 0px -42% 0px", threshold: 0 })
      : null;

    observed.forEach((element) => observer?.observe(element));
    let activeCompIndex = -1;

    const items = Array.from(document.querySelectorAll<HTMLElement>(".snake-item"));
    if (!items.length) {
      return () => observer?.disconnect();
    }

    const container = document.querySelector<HTMLElement>(".snake-container") ?? items[0].parentElement;
    if (!container) {
      return () => observer?.disconnect();
    }

    let ticking = false;
    let activeIndex = -1;
    let sequenceTimer: number | null = null;
    let rows: Array<{ top: number; bottom: number; indexes: number[] }> = [];
    let hasHorizontalRows = false;
    const lingerMs = 260;
    const deactivateTimers = new Map<number, number>();
    const allIndexes = items.map((_, i) => i);

    const clearSequence = () => {
      if (sequenceTimer === null) return;
      window.clearTimeout(sequenceTimer);
      sequenceTimer = null;
    };

    const setActive = (activeIndexes: number | number[]) => {
      const firstActiveIndex = Array.isArray(activeIndexes) ? activeIndexes[0] ?? -1 : activeIndexes;
      const activeSet = new Set(Array.isArray(activeIndexes) ? activeIndexes : [activeIndexes]);

      items.forEach((item, i) => {
        const card = item.querySelector(".snake-card");
        const active = activeSet.has(i);

        if (active) {
          const timer = deactivateTimers.get(i);
          if (timer) window.clearTimeout(timer);
          deactivateTimers.delete(i);
          item.classList.add("is-active");
          card?.classList.add("is-active");
          return;
        }

        if (!item.classList.contains("is-active")) return;
        const existingTimer = deactivateTimers.get(i);
        if (existingTimer) return;

        deactivateTimers.set(i, window.setTimeout(() => {
          if (activeIndex !== i) {
            item.classList.remove("is-active");
            card?.classList.remove("is-active");
          }
          deactivateTimers.delete(i);
        }, lingerMs));
      });

      activeIndex = firstActiveIndex;
    };

    const setActiveWithCatchup = (targetIndex: number, allowedIndexes: number[]) => {
      if (targetIndex === activeIndex) return;

      clearSequence();
      if (activeIndex < 0 || !allowedIndexes.includes(activeIndex)) {
        setActive(targetIndex);
        return;
      }

      const fromPos = allowedIndexes.indexOf(activeIndex);
      const toPos = allowedIndexes.indexOf(targetIndex);
      if (fromPos < 0 || toPos < 0 || Math.abs(toPos - fromPos) <= 1) {
        setActive(targetIndex);
        return;
      }

      const step = toPos > fromPos ? 1 : -1;
      const queue: number[] = [];
      for (let pos = fromPos + step; pos !== toPos + step; pos += step) {
        queue.push(allowedIndexes[pos]);
      }

      const playNext = () => {
        const next = queue.shift();
        if (next === undefined) {
          sequenceTimer = null;
          return;
        }
        setActive(next);
        sequenceTimer = queue.length ? window.setTimeout(playNext, 150) : null;
      };

      playNext();
    };

    const indexForBandProgress = (progress: number, rowLength: number) => {
      return Math.min(rowLength - 1, Math.max(0, Math.floor(progress * rowLength)));
    };

    const measureRows = () => {
      const measuredRows: Array<{ top: number; bottom: number; indexes: number[] }> = [];
      const pageY = window.scrollY || window.pageYOffset || 0;

      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const top = rect.top + pageY;
        const bottom = rect.bottom + pageY;
        let row = measuredRows.find((candidate) => Math.abs(candidate.top - top) < 24);

        if (!row) {
          row = { top, bottom, indexes: [] };
          measuredRows.push(row);
        }

        row.top = Math.min(row.top, top);
        row.bottom = Math.max(row.bottom, bottom);
        row.indexes.push(index);
      });

      rows = measuredRows;
      hasHorizontalRows = rows.some((row) => row.indexes.length > 1);
    };

    const update = () => {
      ticking = false;
      const pageY = window.scrollY || window.pageYOffset || 0;
      const containerTop = container.offsetTop;
      const containerBottom = containerTop + container.offsetHeight;
      const viewportTop = pageY;

      if (compRows.length) {
        const activationLine = window.innerHeight * 0.52;
        let bestIndex = -1;
        let bestDistance = Infinity;

        compRows.forEach((row, index) => {
          const rect = row.getBoundingClientRect();
          const rowCenter = rect.top + rect.height / 2;
          const visible = rect.top <= activationLine && rect.bottom >= window.innerHeight * 0.18;
          if (!visible) return;

          const distance = Math.abs(rowCenter - activationLine);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestIndex = index;
          }
        });

        if (bestIndex !== activeCompIndex) {
          compRows.forEach((row, index) => row.classList.toggle("is-inview", index === bestIndex));
          activeCompIndex = bestIndex;
        }
      }

      if (containerBottom < viewportTop + window.innerHeight * 0.18 || containerTop > viewportTop + window.innerHeight * 0.82) {
        clearSequence();
        setActive(-1);
        return;
      }

      if (hasHorizontalRows) {
        const activationLine = pageY + window.innerHeight * 0.68;
        let bestRowIndex = -1;
        let bestDistance = Infinity;

        rows.forEach((row, index) => {
          const rowCenter = row.top + (row.bottom - row.top) / 2;
          const visible = row.top <= activationLine && row.bottom >= activationLine;
          if (!visible) return;

          const distance = Math.abs(rowCenter - activationLine);
          if (distance < bestDistance) {
            bestDistance = distance;
            bestRowIndex = index;
          }
        });

        if (bestRowIndex < 0) {
          clearSequence();
          setActive(-1);
          return;
        }

        const bestRow = rows[bestRowIndex];
        const rowHeight = Math.max(1, bestRow.bottom - bestRow.top);
        const rowProgress = Math.min(1, Math.max(0, (activationLine - bestRow.top) / rowHeight));
        const itemIndexInRow = indexForBandProgress(rowProgress, bestRow.indexes.length);
        setActiveWithCatchup(bestRow.indexes[itemIndexInRow], bestRow.indexes);
        return;
      }

      const viewportPoint = window.innerHeight * 0.62;
      const start = pageY + viewportPoint - containerTop;
      const travel = Math.max(1, container.offsetHeight + window.innerHeight * 0.12);
      const progress = Math.min(1, Math.max(0, start / travel));
      const index = Math.min(items.length - 1, Math.max(0, Math.floor(progress * items.length)));
      setActiveWithCatchup(index, allIndexes);
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measureRows();
      requestUpdate();
    };

    measureRows();
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      clearSequence();
      deactivateTimers.forEach((timer) => window.clearTimeout(timer));
      observer?.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
