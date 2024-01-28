export function formatNumberWithCommas(
  value: number | string | undefined | null,
): string {
  if (value === undefined || value === null) {
    value = 0;
  }

  let numericValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numericValue)) {
    numericValue = 0;
  }

  return numericValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
