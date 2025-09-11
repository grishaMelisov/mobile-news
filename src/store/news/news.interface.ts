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
