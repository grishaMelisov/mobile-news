import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import * as useActions from '../news/news.actions';
import type { AppDispatch } from '../store';

export const useNewsActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  return useMemo(() => bindActionCreators(useActions, dispatch), [dispatch]);
};
