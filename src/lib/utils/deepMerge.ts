// Minimal deep merge helper to combine defaults and overrides safely.
// - Only merges plain objects and arrays.
// - Arrays: override wins when defined; otherwise base array is kept.

type PlainObject = Record<string, unknown>;

const isPlainObject = (value: unknown): value is PlainObject =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

export function deepMerge<T>(base: Partial<T>, override: Partial<T>): T {
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return (override ?? base) as T;
  }

  const result: PlainObject = { ...base };

  for (const [key, overrideValue] of Object.entries(override)) {
    const baseValue = (base as PlainObject)[key];

    if (Array.isArray(overrideValue)) {
      // Arrays: override wins when provided; fall back to base otherwise.
      result[key] = overrideValue.length > 0 ? overrideValue : baseValue;
      continue;
    }

    if (isPlainObject(overrideValue) && isPlainObject(baseValue)) {
      result[key] = deepMerge(baseValue as PlainObject, overrideValue as PlainObject);
      continue;
    }

    result[key] = overrideValue;
  }

  return result as T;
}

