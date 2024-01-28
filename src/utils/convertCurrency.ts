import {convertToNumber} from '@/utils/convertToNumber';

export function convertCurrency(value?: number | string | null): string {
  if (value === undefined || value === null) {
    return '$0.00';
  }

  const num = Number(value);
  if (isNaN(num)) {
    return '$0.00';
  }
  const formattedValue = convertToNumber(num).toFixed(2);
  const parts = formattedValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `$${parts.join('.')}`;
}
