export function urlJoin(...parts: string[]): string {
  return parts
    .map((part, index) => {
      if (index === 0) {
        // Keep the trailing slash of the first part if it's a protocol
        return part.replace(/\/+$/, part.includes('://') ? '/' : '');
      } else {
        return part.replace(/(^\/+|\/+$)/g, ''); // Remove leading and trailing slashes from the middle parts
      }
    })
    .filter((part) => part.length > 0)
    .join('/');
}
