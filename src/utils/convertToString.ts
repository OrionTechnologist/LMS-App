/**
 * Convert to string
 * @param string {string}
 */
export function convertToString(string: any): string {
  if (
    typeof string === 'undefined' ||
    string === null ||
    typeof string === 'object'
  ) {
    return '';
  }

  return string.toString();
}
