import { createAsyncThunk } from '@reduxjs/toolkit';
import { newsService } from '../../services/news/news.service';
import { type INewsData, type Article } from './news.interface';
import { getErrorMessage } from '../../utils/errorHandler';

/*
 * Первый чанк новостей
 */
export const getNews = createAsyncThunk<Article[], INewsData>(
  'news/loadNews',
  async (data, thunkApi) => {
    try {
      const response = await newsService.fetchNewsByMonth(data);

      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

/*
 * Догрузка для инфинити скролла
 */
export const loadMoreNews = createAsyncThunk<Article[], INewsData>(
  'news/loadMore',
  async (data, thunkApi) => {
    try {
      return await newsService.fetchNewsByMonth(data);
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

/*
 * сет таймаут (очень конечно сомнительное решение делать баунсинг в тз)
 */
export const refreshNews = createAsyncThunk<Article[], { fq?: string }>(
  'news/refresh',
  async ({ fq }, thunkApi) => {
    try {
      return await newsService.fetchLatest(fq);
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);
