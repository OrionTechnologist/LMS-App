interface NumberCheckOptions {
  positiveOnly?: boolean;
  integerOnly?: boolean;
}

export function isNumber(value?: any, options?: NumberCheckOptions) {
  if (isNaN(Number(value))) {
    return false;
  }

  if (options?.positiveOnly && Number(value) < 0) {
    return false;
  }

  if (options?.integerOnly && Math.round(value) != value) {
    return false;
  }

  return true;
}
