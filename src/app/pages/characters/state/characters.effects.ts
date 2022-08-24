import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { catchError, map, mergeMap, withLatestFrom } from "rxjs";
import { Character } from "src/app/shared/models/character.model";
import { CharactersService } from "../services/characters.service";

import * as fromCharactersActions from  './characters.actions';
import * as fromCharactersSelectors from './characters.selectors';

@Injectable()
export class CharactersEffects {

  loadCharacters$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        fromCharactersActions.loadCharacter,
        fromCharactersActions.loadCharacterByParams,
        ),
      withLatestFrom(
        this.store.pipe(select(fromCharactersSelectors.selectCharactersOffset)),
        this.store.pipe(select(fromCharactersSelectors.selectCharactersLimit)),
        this.store.pipe(select(fromCharactersSelectors.selectCharactersName)),
      ),
      mergeMap(([,offset, limit, nameStartsWith]) => this.charactersService.getAllCharacters(offset, limit, nameStartsWith)
        .pipe(
          map((entities: Character[]) => {
            return fromCharactersActions.loadCharactersSuccess({entities})
          })
        )),
      catchError((err, caugth$) => {
        this.store.dispatch(fromCharactersActions.loadCharactersFailed());
        return caugth$;
      }),

    )
  )


  constructor(private actions$: Actions,
              private store: Store,
              private charactersService: CharactersService){}
}
