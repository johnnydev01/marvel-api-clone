import { ComicsState } from './comics.reducer';
import { createFeatureSelector, createSelector } from "@ngrx/store";


export const selectComicsState = createFeatureSelector('comics');

export const selectComicsEntities = createSelector(
  selectComicsState,
  (state: ComicsState) => state.entities,
);

export const selectComicsLoading = createSelector(
  selectComicsState,
  (state: ComicsState) => state.loading,
);

export const selectLoadingMore = createSelector(
  selectComicsState,
  (state: ComicsState) => state.loadingMore,
);

export const selectComicsError = createSelector(
  selectComicsState,
  (state: ComicsState) => state.error,
);

export const selectComicsPage = createSelector(
  selectComicsState,
  (state: ComicsState) => state.page,
);
