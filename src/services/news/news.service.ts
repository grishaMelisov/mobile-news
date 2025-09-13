import { axiosInstance } from '../../api/api.interceptor';
import { API_ROUTES } from '../../api/api.routes';
import type { INewsData, NewsResponse } from '../../store/news/news.interface';
import { getTodayAsEndDate } from '../../utils/date';

export const newsService = {
  async fetchNewsByMonth({
    end_date = getTodayAsEndDate(),
    page = 0,
    fq,
  }: INewsData) {
    const response = await axiosInstance.get<NewsResponse>(
      API_ROUTES.NEWS.GET,
      {
        params: {
          // begin_date,
          end_date,
          page,
          sort: 'newest',
          fq,
        },
      }
    );

    return response.data.response.docs;
  },

  async fetchLatest(fq?: string, page: number = 0) {
    const response = await axiosInstance.get<NewsResponse>(
      API_ROUTES.NEWS.GET,
      {
        params: {
          sort: 'newest',
          page,
          fq,
        },
      }
    );

    return response.data.response.docs;
  },
};
