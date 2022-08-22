import { Action, createReducer, on } from '@ngrx/store';
import { Character } from './../../../shared/models/character.model';

import * as fromCharactersActions from './characters.actions';

export interface CharactersState {
  list: Character[];
  loading: boolean;
  error: boolean;
}


export const charactersInitialSate: CharactersState = {
  list: [],
  loading: false,
  error: false
}

const reducer = createReducer(
  charactersInitialSate,
  on(fromCharactersActions.loadCharacter, (state) => ({
    ...state,
    list: [],
    loading: true,
    error: false,
  })),
  on(fromCharactersActions.loadCharactersSuccess, (state, { list }) => ({
    ...state,
    list,
    loading: false
  })),
  on(fromCharactersActions.loadCharactersFailed, state => ({
    ...state,
    loading: false,
    error: true,
  })),
);

export function charactersReducer(state: CharactersState | undefined, action: Action): CharactersState {
  return reducer(state, action);
}
