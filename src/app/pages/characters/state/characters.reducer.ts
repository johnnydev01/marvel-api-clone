import { Action, createReducer, on } from '@ngrx/store';
import { Character } from './../../../shared/models/character.model';

import * as fromCharactersActions from './characters.actions';

export interface CharactersState {
  entities: Character[];
  offset: number;
  limit: number;
  nameStartsWith?: string;
  loading: boolean;
  error: boolean;
}


export const charactersInitialSate: CharactersState = {
  entities: [],
  loading: false,
  offset: 0,
  limit: 36,
  nameStartsWith: '',
  error: false
}

const reducer = createReducer(
  charactersInitialSate,
  on(fromCharactersActions.loadCharacter, (state) => ({
    ...state,
    entities: [],
    loading: true,
    error: false,
    offset: 0,
    limit: 36,
    nameStartsWith: '',
  })),
  on(fromCharactersActions.loadCharacterByParams, (state, {offset, limit, nameStartsWith}) => ({
    ...state,
    offset,
    limit,
    nameStartsWith,
    loading: false,
  })),
  on(fromCharactersActions.loadCharactersSuccess, (state, { entities }) => ({
    ...state,
    entities,
    loading: false,
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
