import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CharactersState } from "./characters.reducer";


export const selectCharactersState = createFeatureSelector<CharactersState>('characters');

export const selectCharactersList = createSelector(
  selectCharactersState,
  (charactersState: CharactersState) => charactersState?.list,
)
