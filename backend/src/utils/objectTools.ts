// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeUndefinedKeys = <T extends Record<string, any>>(object: T): Partial<T> => {
  const result: Partial<T> = {};
  for (const key in object) {
    if (object[key] !== undefined) {
      result[key] = object[key];
    }
  }
  return result;
};
