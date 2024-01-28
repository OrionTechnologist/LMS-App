/**
 * Remove the ending slash character from a string
 */
export function removeEndingSlash(string?: string | null): string {
  return (string ?? '').replace(/\/$/, '');
}
