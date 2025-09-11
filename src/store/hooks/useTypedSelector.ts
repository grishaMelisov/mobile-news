import { useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootStateType } from '../store';

export const useTypedSelector: TypedUseSelectorHook<RootStateType> =
  useSelector;
