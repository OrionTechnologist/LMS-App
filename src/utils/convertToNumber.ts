/**
 * Convert a number
 * @param number {number}
 * @param options
 */
export function convertToNumber(
  number?: any,
  options?: {
    escapeComma?: boolean;
  },
): number {
  let numberToConvert = number;

  if (typeof numberToConvert === 'undefined' || numberToConvert === null) {
    return 0;
  }

  if (typeof numberToConvert === 'string' && options?.escapeComma) {
    numberToConvert = numberToConvert.replace(/,/g, '');
  }

  if (isNaN(Number(numberToConvert)) || isNaN(numberToConvert)) {
    return 0;
  }

  return Number(numberToConvert);
}
