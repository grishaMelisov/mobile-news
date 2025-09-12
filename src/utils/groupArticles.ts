import type { Article } from '../store/news/news.interface';

export function groupArticlesByDate(articles: Article[]) {
  const groups: Record<string, Article[]> = {};

  for (const article of articles) {
    const date = formatSectionDate(article.pub_date);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(article);
  }

  return groups;
}

export function formatSectionDate(pubDate: string): string {
  const date = new Date(pubDate);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}
