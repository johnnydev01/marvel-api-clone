import { TestBed } from '@angular/core/testing';

import { Action } from "@ngrx/store";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot, cold } from 'jasmine-marbles';


import { Observable, of, throwError } from 'rxjs';
import { ComicsEffects } from "./comics.effects";
import { ComicsService } from '../services/comics.service';
import { comicsInitialState } from './comics.reducer';
import * as fromComicsActions from './comics.actions';

describe(ComicsEffects.name, () => {

  let actions$: Observable<Action>;
  let effects: ComicsEffects;
  let store: MockStore<any>;
  let service: ComicsService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ComicsEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState: {comics: comicsInitialState}}),
        {
          provide: ComicsService,
          useValue: {
            getComics: () => {},
          }
        }
      ],
    });

    effects = TestBed.inject(ComicsEffects);
    store = TestBed.inject(MockStore);
    service = TestBed.inject(ComicsService);
  });

  it('shoud return #loadCharactersSuccess', () => {
    spyOn(service, 'getComics').and.returnValue(of([]));

    actions$ = hot('a', {a: fromComicsActions.loadListFromComics()});
    const expected = cold('b', {b: fromComicsActions.loadComicsSuccess({entities: []})});

    expect(effects.loadComics$).toBeObservable(expected);
  });

  it('should return #loadCharactesFailed', () => {
    spyOn(service, 'getComics').and.returnValue(throwError(() => {}));

    actions$ = hot('a', { a: fromComicsActions.loadListFromComics()});
    const expected = cold('b', { b: fromComicsActions.loadComicsFailure() });

    expect(effects.loadComics$).toBeObservable(expected);
  });

});
