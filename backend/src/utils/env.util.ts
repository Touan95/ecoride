export const parseBoolean = (val: string): boolean | undefined => {
  const booleanStringMap: Record<string, boolean> = {
    true: true,
    false: false,
  };
  return booleanStringMap[val] ?? undefined;
};
