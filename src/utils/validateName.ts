export function validateName(name?: string | null): boolean {
  if (!name) {
    return false; // Return false if fullName is null, undefined, or an empty string
  }

  const regex: RegExp = /^[A-Za-z\s]+$/; // Regex pattern for alphabetic characters and spaces
  return regex.test(name);
}
