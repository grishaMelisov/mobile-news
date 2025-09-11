export interface Multimedia {
  url: string;
  subtype?: string;
  type?: string;
  height?: number;
  width?: number;
}

export interface Article {
  abstract: string;
  web_url: string;
  pub_date: string;
  source: string;
  multimedia: Multimedia[];
  section_name: string;
  news_desk: string;
}

export interface INewsData {
  year: number;
  month: number;
  page?: number;
  fq?: string;
}

export interface NewsResponse {
  response: {
    docs: Article[];
  };
}

export const NEWS_CATEGORIES = {
  SCIENCE: 'Science',
  GENERAL: 'General',
  ENTERTAINMENT: 'Entertainment',
  TECHNOLOGY: 'Technology',
  BUSINESS: 'Business',
  HEALTH: 'Health',
  SPORTS: 'Sports',
} as const;

export type NewsCategory =
  (typeof NEWS_CATEGORIES)[keyof typeof NEWS_CATEGORIES];

/*
 * В официальное доке нет некоторые категорий как в фигме. Делаю костыль
 */
export const CATEGORY_TO_FQ: Record<NewsCategory, string | undefined> = {
  [NEWS_CATEGORIES.SCIENCE]: `desk:("Science")`,
  [NEWS_CATEGORIES.GENERAL]: undefined, // "General" = все статьи
  [NEWS_CATEGORIES.ENTERTAINMENT]: `desk:("Culture") OR section.name:("Arts" OR "Movies")`,
  [NEWS_CATEGORIES.TECHNOLOGY]: `section.name:("Technology")`,
  [NEWS_CATEGORIES.BUSINESS]: `desk:("Business")`,
  [NEWS_CATEGORIES.HEALTH]: `section.name:("Health" OR "Well")`,
  [NEWS_CATEGORIES.SPORTS]: `section.name:("Sports")`,
};
