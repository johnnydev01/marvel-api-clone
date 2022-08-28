import { Action, createReducer, on } from "@ngrx/store";
import { Comic } from "src/app/shared/models/comics.model";

import * as fromComicsActions from './comics.actions';

export interface ComicsState {
  entities: Comic[];
  loading: boolean;
  loadingMore: boolean;
  error: boolean;
  page: number;
}

export const comicsInitialState: ComicsState = {
  entities: [],
  loading: false,
  loadingMore: false,
  error: false,
  page: 0,
}

export const reducer = createReducer(
  comicsInitialState,
  on(
    fromComicsActions.loadListFromLastComics,
    fromComicsActions.loadListFromComics,
    state => ({
      ...state,
      loading: true,
      error: false,
      page: 0,
    }),
  ),
  on(fromComicsActions.loadMore, state => ({
    ...state,
    loadingMore: true,
    page: state.page + 1,
  })),
  on(fromComicsActions.loadComicsSuccess, (state, {entities}) => ({
    ...state,
    entities: [...state.entities, ...entities],
    loading: false,
    loadingMore: false,
  })),
  on(fromComicsActions.loadComicsFailure, state => ({
    ...state,
    loading: false,
    error: true,
  })),
);

export function comicsReducer(state: ComicsState | undefined, action: Action): ComicsState {
  return reducer(state, action);
}
