import { CATEGORY_TO_FQ } from '../store/news/news.interface';
import type { RootStateType } from '../store/store';

export function selectFq(state: RootStateType): string {
  const current = state.news.currentFilter;
  const categoryFilter = current ? CATEGORY_TO_FQ[current] : undefined;

  // Всегда добавляем фильтр на статьи, а то заметил что всякий
  // мусор типа рецептов приходит. А в нем нет полей всех
  if (categoryFilter) {
    return `typeOfMaterials:News AND ${categoryFilter}`;
  }
  return 'typeOfMaterials:News';
}
