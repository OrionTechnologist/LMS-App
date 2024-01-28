export function generateShortName(
  firstName: string | null | undefined,
  lastName: string | null | undefined,
): string | null {
  if (!firstName || !lastName) {
    return null;
  }

  const firstInitial = firstName.charAt(0);
  const lastInitial = lastName.charAt(0);

  return `${firstInitial}${lastInitial}`.toUpperCase();
}
