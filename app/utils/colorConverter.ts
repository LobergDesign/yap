/**
 * Converts a hexadecimal color code to an RGB object.
 * Supports shorthand (3-digit) and full (6-digit) hex codes.
 * Returns null if the hex code is invalid.
 *
 * @param {string} hex - The hexadecimal color code (e.g., "#RRGGBB" or "#RGB").
 * @returns {string | null} A string with r, g, and b values separated by commas (e.g., "22,225,22"), or null if invalid.
 */
export const hexToRgb = (hex: string): string | null => {
  if (!hex || typeof hex !== 'string') {
    return null;
  }

  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? `${parseInt(result[1]!, 16)},${parseInt(result[2]!, 16)},${parseInt(result[3]!, 16)}`
    : null;
};
