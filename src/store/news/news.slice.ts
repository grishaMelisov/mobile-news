import { createSlice } from '@reduxjs/toolkit';
import { getNews, loadMoreNews, refreshNews } from './news.actions';
import type { Article, NewsCategory } from './news.interface';

// export interface Article {
//   abstract: string;
//   web_url: string;
//   pub_date: string;
//   source: string;
//   multimedia: { url: string }[];
// }

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
  },
  extraReducers: (builder) => {
    /*
     * первая загрузка
     */
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      /*
       * load more
       */
      .addCase(loadMoreNews.fulfilled, (state, action) => {
        state.articles.push(...action.payload);
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

export const { setFilter, resetFilter } = newsSlice.actions;
