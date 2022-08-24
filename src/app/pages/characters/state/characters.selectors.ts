import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CharactersState } from "./characters.reducer";


export const selectCharactersState = createFeatureSelector<CharactersState>('characters');

export const selectCharactersList = createSelector(
  selectCharactersState,
  (charactersState: CharactersState) => charactersState?.entities,
);

export const selectCharactersOffset = createSelector(
  selectCharactersState,
  (state: CharactersState) => state.offset,
);

export const selectCharactersLimit = createSelector(
  selectCharactersState,
  (state: CharactersState) => state.limit,
);

export const selectCharactersName = createSelector(
  selectCharactersState,
  (state: CharactersState) => state.nameStartsWith,
)

