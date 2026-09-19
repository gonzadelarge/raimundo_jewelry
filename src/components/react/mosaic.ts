// Packing for the media mosaic: the state the photo grid holds before it breaks
// apart into the column. Rows are justified, so every photo keeps its own ratio
// and the scroll animation can use a single uniform scale.

export type Rect = { top: number; left: number; width: number; height: number };

type Options = {
  /** Width the mosaic may use, in pixels. */
  width: number;
  /** Height the mosaic may use, in pixels. */
  height: number;
  gap: number;
};

function splitRows<T>(items: T[]): T[][] {
  const perRow = items.length >= 5 ? 3 : 2;
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow));
  return rows;
}

/**
 * Turns the natural rects of the column into mosaic rects that fit one screen.
 * Returns one rect per item, in the same order, relative to the mosaic box.
 */
export function packMosaic(natural: Rect[], { width, height, gap }: Options): Rect[] {
  if (natural.length === 0) return [];

  const ratios = natural.map((rect) => rect.width / rect.height);
  const rows = splitRows(natural.map((_, index) => index));

  // Justify each row: the row fills the width, so its height falls out of the ratios.
  const rowHeights = rows.map((row) => {
    const sum = row.reduce((total, index) => total + ratios[index], 0);
    return (width - gap * (row.length - 1)) / sum;
  });

  const total = rowHeights.reduce((sum, value) => sum + value, 0) + gap * (rows.length - 1);
  const fit = total > height ? height / total : 1;
  const offsetX = (width - width * fit) / 2;
  const offsetY = (height - total * fit) / 2;

  const rects: Rect[] = new Array(natural.length);
  let top = offsetY;

  rows.forEach((row, rowIndex) => {
    const rowHeight = rowHeights[rowIndex] * fit;
    let left = offsetX;
    for (const index of row) {
      const itemWidth = ratios[index] * rowHeight;
      rects[index] = { top, left, width: itemWidth, height: rowHeight };
      left += itemWidth + gap * fit;
    }
    top += rowHeight + gap * fit;
  });

  return rects;
}

/** Slow start, slow end, so the photos settle instead of snapping. */
export function easeInOut(progress: number): number {
  return progress < 0.5
    ? 4 * progress * progress * progress
    : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}
