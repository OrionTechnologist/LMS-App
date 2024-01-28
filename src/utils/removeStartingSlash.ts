/**
 * Remove the starting slash character from a string
 */
export function removeStartingSlash(string?: string | null): string {
  const str = string ?? '';

  if (str.indexOf('/') === 0) {
    return str.replace('/', '');
  }

  return str;
}
