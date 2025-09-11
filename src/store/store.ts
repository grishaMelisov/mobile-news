import { configureStore } from '@reduxjs/toolkit';
import { newsSlice } from './news/news.slice';

export const store = configureStore({
  reducer: {
    news: newsSlice.reducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
