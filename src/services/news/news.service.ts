import { axiosInstance } from '../../api/api.interceptor';
import { API_ROUTES } from '../../api/api.routes';
import type { INewsData, NewsResponse } from '../../store/news/news.interface';

export const newsService = {
  //TODO переделать что первая загрузка всегда самые новые.
  async fetchNewsByMonth({ year, month, page = 0, fq }: INewsData) {
    const begin_date = `${year}${String(month).padStart(2, '0')}01`;
    const end_date = `${year}${String(month).padStart(2, '0')}${new Date(
      year,
      month,
      0
    ).getDate()}`;

    const response = await axiosInstance.get<NewsResponse>(
      API_ROUTES.NEWS.GET,
      {
        params: {
          begin_date,
          end_date,
          page,
          sort: 'newest',
          fq,
        },
      }
    );

    return response.data.response.docs;
  },

  async fetchLatest(fq?: string) {
    const response = await axiosInstance.get<NewsResponse>(
      API_ROUTES.NEWS.GET,
      {
        params: {
          sort: 'newest',
          page: 0,
          fq,
        },
      }
    );

    return response.data.response.docs;
  },
};
