import {
  isValidHex,
  normalizeHexInput,
  resolveHex,
} from '@/components/ui/colorPickerUtils';

describe('colorPickerUtils', () => {
  it('normalizes shorthand hex values', () => {
    expect(normalizeHexInput('f00')).toBe('#ff0000');
    expect(normalizeHexInput('#4f46e5')).toBe('#4f46e5');
  });

  it('validates hex strings', () => {
    expect(isValidHex('#4f46e5')).toBe(true);
    expect(isValidHex('4f46e5')).toBe(true);
    expect(isValidHex('not-a-color')).toBe(false);
  });

  it('falls back when hex is invalid', () => {
    expect(resolveHex('invalid', '#000000')).toBe('#000000');
    expect(resolveHex('#059669', '#000000')).toBe('#059669');
  });
});
