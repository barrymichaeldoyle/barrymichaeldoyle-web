export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Joins an array of titles with proper grammar, removing " Engineer" from each title
 * @param titles - Array of title strings
 * @returns Formatted string with titles joined by commas and "or" before the last item
 * @example
 * joinTitles(['Staff Engineer', 'Product Engineer', 'Design Engineer', 'Software Engineer'])
 * // Returns: "Staff, Product, Design, or Software"
 */
export function joinTitles(titles: string[]): string {
  if (titles.length === 0) return '';

  // Remove " Engineer" from each title
  const cleanTitles = titles.map((title) => title.replace(' Engineer', ''));

  if (cleanTitles.length === 1) return cleanTitles[0];
  if (cleanTitles.length === 2) return `${cleanTitles[0]} or ${cleanTitles[1]}`;

  const allButLast = cleanTitles.slice(0, -1);
  const last = cleanTitles[cleanTitles.length - 1];

  return `${allButLast.join(', ')}, or ${last}`;
}
