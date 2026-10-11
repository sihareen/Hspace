/** Join class names, skipping falsy values. (No tailwind-merge: pass non-conflicting classes.) */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
