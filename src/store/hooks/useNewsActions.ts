import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import * as useActions from '../news/news.actions';
import type { AppDispatch } from '../store';
import type { INewsData } from '../news/news.interface';

export const useNewsActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMemo(
    () => ({
      fetchNews: (data: INewsData) =>
        dispatch(useActions.fetchNews(data)).unwrap(),
      refreshNews: () => dispatch(useActions.refreshNews()).unwrap,
      resetArticles: () => dispatch(useActions.resetArticles()),
      setFilter: (cat: string) => dispatch(useActions.setFilter(cat)),
      resetFilter: () => dispatch(useActions.resetFilter()),
    }),
    [dispatch]
  );
};
