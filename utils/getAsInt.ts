export function getAsInt(value: string | string[]): number {
  if (Array.isArray(value)) {
    return parseInt(value[0]);
  }

  return parseInt(value);
}
