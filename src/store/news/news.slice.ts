import { createSlice } from '@reduxjs/toolkit';
import { getNews } from './news.actions';

export interface Article {
  abstract: string;
  web_url: string;
  pub_date: string;
  source: string;
  multimedia: { url: string }[];
}

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  lastLoaded: { year: number; month: number } | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  lastLoaded: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles.push(...action.payload);
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
