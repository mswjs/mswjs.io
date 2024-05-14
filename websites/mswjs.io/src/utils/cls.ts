export function cls(
  ...classNames: Array<string | boolean | undefined | null>
): string {
  return classNames.filter(Boolean).join(' ')
}
