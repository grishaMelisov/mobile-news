import { createAsyncThunk } from '@reduxjs/toolkit';
import { newsService } from '../../services/news/news.service';
import { type INewsData, type Article } from './news.interface';
import { getErrorMessage } from '../../utils/errorHandler';

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
