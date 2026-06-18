// Minimal classnames joiner. We don't pull in clsx/tailwind-merge; our class
// strings don't conflict, so a filtered join is enough.
export function cn(...inputs: Array<string | number | false | null | undefined>): string {
  return inputs.filter(Boolean).join(' ')
}
