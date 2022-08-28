import { catchError, map, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ComicsService } from './../services/comics.service';
import { Actions, createEffect } from '@ngrx/effects';


import { select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';

import { withLatestFrom, mergeMap } from 'rxjs';

import * as fromComicsSelectors from './comics.selectores';
import * as fromComicsActions from './comics.actions';

@Injectable()
export class ComicsEffects {

  loadComics$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        fromComicsActions.loadListFromLastComics,
        fromComicsActions.loadListFromComics,
        fromComicsActions.loadMore,
      ),
      withLatestFrom(
        this.store.pipe(select(fromComicsSelectors.selectComicsEntities)),
        this.store.pipe(select(fromComicsSelectors.selectComicsPage)),
      ),
      mergeMap(([, entities, page]) => {
        return this.comicsService.getComics(page)
        .pipe(
          map(entities => fromComicsActions.loadComicsSuccess({entities})),
          catchError(() => of(fromComicsActions.loadComicsFailure())),
        )
      })
    )
  );


  constructor(private actions$: Actions,
              private store: Store,
              private comicsService: ComicsService) {}
}
