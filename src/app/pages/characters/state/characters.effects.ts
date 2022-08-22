import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { catchError, map, mergeMap } from "rxjs";
import { Character } from "src/app/shared/models/character.model";
import { CharactersService } from "../services/characters.service";

import * as fromCharactersActions from  './characters.actions';


@Injectable()
export class CharactersEffects {

  loadCharacters$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromCharactersActions.loadCharacter),
      mergeMap(() => this.charactersService.getAllCharacters()
        .pipe(
          map((list: Character[]) => {
            return fromCharactersActions.loadCharactersSuccess({list})
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
