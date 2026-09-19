import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./PieceMedia.module.css";
import { easeInOut, packMosaic, type Rect } from "./mosaic";

export type MediaImage = {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  full: string;
  alt: string;
};

type Props = {
  images: MediaImage[];
  labels: { open: string; close: string; prev: string; next: string };
};

type Shape = "band" | "wideLeft" | "wideRight" | "tallLeft" | "tallRight";

// Lays the media column out before it renders. Every third landscape photo runs
// full width; the rest alternate left and right, each one keeping its own shape.
function placeImages(images: MediaImage[]): { shape: Shape; sizes: string }[] {
  let side = 0;
  return images.map((image, i) => {
    const landscape = image.width >= image.height;
    if (landscape && i % 3 === 0) return { shape: "band" as Shape, sizes: "(max-width: 760px) 100vw, 92vw" };
    const right = side++ % 2 === 1;
    const shape: Shape = landscape
      ? right
        ? "wideRight"
        : "wideLeft"
      : right
        ? "tallRight"
        : "tallLeft";
    const sizes = landscape ? "(max-width: 760px) 100vw, 68vw" : "(max-width: 760px) 100vw, 40vw";
    return { shape, sizes };
  });
}

export default function PieceMedia({ images, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const open = (next: number) => {
    setIndex(next);
    // The page behind must not scroll: the zoom is a full modal, not a layer.
    // The padding takes the place of the scrollbar, so nothing jumps sideways.
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const step = useCallback(
    (delta: number) => setIndex((current) => (current + delta + images.length) % images.length),
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    // Esc closes the dialog on its own, so the page scroll is freed here.
    const unlock = () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
    dialog.addEventListener("close", unlock);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", unlock);
      unlock();
    };
  }, [step]);

  const onPointerDown = (event: React.PointerEvent) => {
    touchStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: React.PointerEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const stage = event.currentTarget as HTMLElement;
    // A photo taller than the screen scrolls, so a drag down must not close it.
    const scrolls = stage.scrollHeight > stage.clientHeight + 1;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    else if (dy > 90 && !scrolls) close();
  };

  const gridRef = useRef<HTMLDivElement>(null);

  // Desktop only: the photos start packed in one screen and break apart into the
  // column as the section scrolls. Everything is a transform, so the real layout
  // below never moves and the lightbox keeps working.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const wide = window.matchMedia("(min-width: 761px)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const items = Array.from(grid.querySelectorAll<HTMLElement>("[data-media-item]"));

    let plan: { natural: Rect; mosaic: Rect }[] = [];
    let distance = 0;
    let ticking = false;

    const reset = () => {
      grid.style.removeProperty("--break");
      for (const item of items) item.style.removeProperty("transform");
    };

    const measure = () => {
      if (!wide.matches || still.matches) {
        plan = [];
        reset();
        return;
      }

      // Every photo shows in the first screen, so none of them may wait for lazy loading.
      for (const image of grid.querySelectorAll("img")) image.loading = "eager";

      distance = Math.round(window.innerHeight * 0.9);
      grid.style.setProperty("--break", `${distance}px`);
      for (const item of items) item.style.removeProperty("transform");

      const base = grid.getBoundingClientRect();
      const natural = items.map((item) => {
        const rect = item.getBoundingClientRect();
        return { top: rect.top - base.top, left: rect.left - base.left, width: rect.width, height: rect.height };
      });

      const header = document.querySelector<HTMLElement>("[data-header]")?.offsetHeight ?? 72;
      const pad = 32;
      const box = {
        width: grid.clientWidth - 2 * pad,
        height: window.innerHeight - header - 2 * pad,
        gap: 24,
      };
      const mosaic = packMosaic(natural, box);
      plan = natural.map((rect, index) => ({
        natural: rect,
        // Mosaic rects are read in screen space, so the block holds still while it breaks apart.
        mosaic: { ...mosaic[index], top: mosaic[index].top + header + pad, left: mosaic[index].left + pad },
      }));
      draw();
    };

    const draw = () => {
      ticking = false;
      if (plan.length === 0) return;

      const top = grid.getBoundingClientRect().top;
      const progress = Math.min(Math.max(-top / distance, 0), 1);
      const held = 1 - easeInOut(progress);
      // The mosaic only sticks to the screen once the block reaches the top of it.
      // Before that it stays inside the block, so it never covers the piece cover.
      const stick = Math.min(top, 0);

      plan.forEach((entry, index) => {
        const item = items[index];
        if (held <= 0.001) {
          item.style.transform = "";
          return;
        }
        const dx = entry.mosaic.left - entry.natural.left;
        const dy = entry.mosaic.top - stick - entry.natural.top;
        const scale = entry.mosaic.width / entry.natural.width;
        item.style.transform = `translate(${(dx * held).toFixed(1)}px, ${(dy * held).toFixed(1)}px) scale(${(1 + (scale - 1) * held).toFixed(4)})`;
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(draw);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    wide.addEventListener("change", measure);
    still.addEventListener("change", measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      wide.removeEventListener("change", measure);
      still.removeEventListener("change", measure);
      reset();
    };
  }, [images]);

  const current = images[index];
  const layout = placeImages(images);

  return (
    <>
      <div className={styles.grid} ref={gridRef}>
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            className={`${styles.item} ${styles[layout[i].shape]}`}
            onClick={() => open(i)}
            aria-label={`${labels.open} ${i + 1}/${images.length}`}
            data-media-item
          >
            <span className={styles.frame} data-parallax>
              <img
                src={image.src}
                srcSet={image.srcSet}
                sizes={layout[i].sizes}
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className={styles.toolbar}>
          <span>
            {index + 1} / {images.length}
          </span>
          <button type="button" onClick={close}>
            {labels.close}
          </button>
        </div>

        <div
          className={styles.stage}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onClick={(event) => {
            // The stage covers the whole dialog, so a click beside the photo closes it.
            if (event.target === event.currentTarget) close();
          }}
        >
          {current && <img key={current.full} className={styles.full} src={current.full} alt={current.alt} />}
        </div>

        <div className={styles.controls}>
          <button type="button" onClick={() => step(-1)} aria-label={labels.prev}>
            ←
          </button>
          <button type="button" onClick={() => step(1)} aria-label={labels.next}>
            →
          </button>
        </div>
      </dialog>
    </>
  );
}
