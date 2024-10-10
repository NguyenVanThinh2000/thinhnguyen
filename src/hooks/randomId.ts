// customRandomId.ts
let counter = 0

/**
 * Generates a unique random ID. You can pass a prefix if needed.
 * @param prefix A string to prepend to the generated ID (optional).
 * @returns A unique string ID.
 */
export function randomId(prefix: string = ''): string {
  counter += 1
  return `${prefix}${Math.random().toString(36).substr(2, 9)}-${counter}`
}
