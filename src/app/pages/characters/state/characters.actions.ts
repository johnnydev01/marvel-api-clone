import { createAction, props } from "@ngrx/store";
import { Character } from "src/app/shared/models/character.model";



export const loadCharacter = createAction('[Characters] Load Characters');

export const loadCharactersSuccess = createAction(
  '[Characters] Load Characters Success',
  props<{list: Character[]}>(),
);

export const loadCharactersFailed = createAction('[Characters] Load Characters Failed');
