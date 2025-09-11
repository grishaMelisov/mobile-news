import { createAsyncThunk } from '@reduxjs/toolkit';
import { newsService } from '../../services/news/news.service';
import { type INewsData, type Article } from './news.interface';
import { getErrorMessage } from '../../utils/errorHandler';
import type { RootStateType } from '../store';
import { selectFq } from '../../utils/selectFq';

/*
 * Первый чанк новостей
 */
export const getNews = createAsyncThunk<Article[], INewsData>(
  'news/loadNews',
  async (data, thunkApi) => {
    try {
      const fq = selectFq(thunkApi.getState() as RootStateType);
      return await newsService.fetchNewsByMonth({ ...data, fq });
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
      const fq = selectFq(thunkApi.getState() as RootStateType);
      return await newsService.fetchNewsByMonth({ ...data, fq });
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);

/*
 * refresh (очень конечно сомнительное решение делать баунсинг в тз)
 */
export const refreshNews = createAsyncThunk<Article[], void>(
  'news/refresh',
  async (_, thunkApi) => {
    try {
      const fq = selectFq(thunkApi.getState() as RootStateType);
      return await newsService.fetchLatest(fq);
    } catch (error) {
      return thunkApi.rejectWithValue(getErrorMessage(error));
    }
  }
);
