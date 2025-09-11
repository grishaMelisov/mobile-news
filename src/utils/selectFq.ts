import { CATEGORY_TO_FQ } from '../store/news/news.interface';
import type { RootStateType } from '../store/store';

export function selectFq(state: RootStateType): string | undefined {
  const current = state.news.currentFilter;
  return current ? CATEGORY_TO_FQ[current] : undefined;
}
