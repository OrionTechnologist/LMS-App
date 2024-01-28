export function validatePhoneNumberField(phone?: string | null) {
  if (phone) {
    const regex = /^\+?\s*\d{0,3}\s*(?:\(\d{1,}\))?\s*\d{1,}[-\s\d]*$/;
    return regex.test(phone) || phone === '';
  }

  return true;
}
