import { hexToRgb, rgbToHex } from '@/features/design-system/utils/colorUtils';

const HEX_PATTERN = /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const COLOR_PICKER_PRESETS = [
  '#4f46e5',
  '#2563eb',
  '#0891b2',
  '#059669',
  '#d97706',
  '#dc2626',
  '#db2777',
  '#7c3aed',
  '#0f172a',
  '#64748b',
  '#f8fafc',
  '#ffffff',
] as const;

export function normalizeHexInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  const withHash = trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
  const body = withHash.slice(1);

  if (body.length === 3) {
    return `#${body
      .split('')
      .map(char => char + char)
      .join('')
      .toLowerCase()}`;
  }

  return `#${body.slice(0, 6).toLowerCase()}`;
}

export function isValidHex(value: string): boolean {
  return HEX_PATTERN.test(value.trim());
}

export function resolveHex(value: string, fallback: string): string {
  const normalized = normalizeHexInput(value);
  return isValidHex(normalized) ? normalized : fallback;
}

export function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const { r, g, b } = hexToRgb(hex);
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;

  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const delta = max - min;

  let hue = 0;
  if (delta !== 0) {
    if (max === red) {
      hue = ((green - blue) / delta) % 6;
    } else if (max === green) {
      hue = (blue - red) / delta + 2;
    } else {
      hue = (red - green) / delta + 4;
    }
  }

  hue = Math.round(hue * 60);
  if (hue < 0) {
    hue += 360;
  }

  const saturation = max === 0 ? 0 : delta / max;
  return { h: hue, s: saturation, v: max };
}

export function hsvToHex(h: number, s: number, v: number): string {
  const hue = ((h % 360) + 360) % 360;
  const chroma = v * s;
  const second = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const match = v - chroma;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (hue < 60) {
    red = chroma;
    green = second;
  } else if (hue < 120) {
    red = second;
    green = chroma;
  } else if (hue < 180) {
    green = chroma;
    blue = second;
  } else if (hue < 240) {
    green = second;
    blue = chroma;
  } else if (hue < 300) {
    red = second;
    blue = chroma;
  } else {
    red = chroma;
    blue = second;
  }

  return rgbToHex((red + match) * 255, (green + match) * 255, (blue + match) * 255);
}

export function buildSaturationValueGrid(
  hue: number,
  columns: number,
  rows: number,
): string[] {
  const colors: string[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const saturation = column / (columns - 1);
      const value = 1 - row / (rows - 1);
      colors.push(hsvToHex(hue, saturation, value));
    }
  }

  return colors;
}

export const HUE_STOPS = Array.from({ length: 24 }, (_, index) =>
  hsvToHex((index / 24) * 360, 1, 1),
);
