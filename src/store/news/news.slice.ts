import { createSlice } from '@reduxjs/toolkit';
import { fetchNews, refreshNews } from './news.actions';
import type { Article, NewsCategory } from './news.interface';

interface NewsState {
  articles: Article[];
  loading: boolean;
  error: string | null;
  lastLoaded: { year: number; month: number } | null;
  currentFilter: NewsCategory | null;
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
  lastLoaded: null,
  currentFilter: null,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.currentFilter = action.payload;
      state.articles = [];
    },
    resetFilter: (state) => {
      state.currentFilter = null;
      state.articles = [];
    },
    resetArticles: (state) => {
      state.articles = [];
    },
  },

  /*
   * fetch news
   */
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;

        state.articles.push(...action.payload);
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /*
       * refresh
       */
      .addCase(refreshNews.fulfilled, (state, action) => {
        const newArticles = action.payload.filter(
          (a) => !state.articles.find((old) => old.web_url === a.web_url)
        );
        state.articles.unshift(...newArticles);
      });
  },
});
