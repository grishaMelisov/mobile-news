export function formatArticleDate(dateString: string): string {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short', // Feb
    day: '2-digit', // 26
    year: 'numeric', // 2023
    hour: '2-digit', // 16
    minute: '2-digit', // 32
    hour12: true, // PM/AM
  })
    .format(date)

    .replace(':', '.');
}
