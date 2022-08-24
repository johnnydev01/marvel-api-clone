import { createAction, props } from "@ngrx/store";
import { Character } from "src/app/shared/models/character.model";



export const loadCharacter = createAction('[Characters] Load Characters');

export const loadCharactersSuccess = createAction(
  '[Characters] Load Characters Success',
  props<{entities: Character[]}>(),
);

export const loadCharacterByParams = createAction(
  '[Characters] Load Characters by params',
  props<{offset?: number, limit?: number, nameStartsWith?: string}>(),
);

export const loadCharactersFailed = createAction('[Characters] Load Characters Failed');
