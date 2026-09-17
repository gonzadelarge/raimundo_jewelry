import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./PieceMedia.module.css";

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

export default function PieceMedia({ images, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const open = (next: number) => {
    setIndex(next);
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
    dialog.addEventListener("keydown", onKey);
    return () => dialog.removeEventListener("keydown", onKey);
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
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    else if (dy > 90) close();
  };

  const current = images[index];

  return (
    <>
      <div className={styles.grid}>
        {images.map((image, i) => {
          // Every third image is full width. A last image left alone in its row is full width too.
          const wide = i % 3 === 0 || (i === images.length - 1 && i % 3 === 1);
          return (
          <button
            key={image.src}
            type="button"
            className={wide ? `${styles.item} ${styles.wide}` : styles.item}
            onClick={() => open(i)}
            aria-label={`${labels.open} ${i + 1}/${images.length}`}
          >
            <img
              src={image.src}
              srcSet={image.srcSet}
              sizes={wide ? "100vw" : "(max-width: 760px) 100vw, 50vw"}
              width={image.width}
              height={image.height}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
          </button>
          );
        })}
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

        <div className={styles.stage} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
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
