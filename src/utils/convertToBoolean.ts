export function convertToBoolean(value?: string | number | boolean | null) {
  if (typeof value === 'undefined' || value === null) {
    return false;
  }

  return Number(value) === 1 || value === true;
}
