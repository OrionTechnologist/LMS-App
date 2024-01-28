/**
 * Validate password
 */
export function validatePassword(password?: string | null) {
  const validatorResult = {
    passed: true,
    hasCharacter: true,
    hasCapital: true,
    hasDigit: true,
    hasMinimumLength: true,
  };

  if (!password) {
    validatorResult.passed = false;
    validatorResult.hasCharacter = false;
    validatorResult.hasCapital = false;
    validatorResult.hasDigit = false;
    validatorResult.hasMinimumLength = false;

    return validatorResult;
  }

  if (password.length < 8) {
    validatorResult.hasMinimumLength = false;
    validatorResult.passed = false;
  }

  if (password.search(/[a-z]/i) < 0) {
    validatorResult.hasCharacter = false;
    validatorResult.passed = false;
  }
  if (password.search(/[0-9]/) < 0) {
    validatorResult.hasDigit = false;
    validatorResult.passed = false;
  }

  const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  if (!isContainsUppercase.test(password)) {
    validatorResult.hasCapital = false;
    validatorResult.passed = false;
  }

  return validatorResult;
}
