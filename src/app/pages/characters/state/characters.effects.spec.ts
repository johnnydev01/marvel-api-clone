import { TestBed } from '@angular/core/testing';

import { Action } from "@ngrx/store";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot, cold } from 'jasmine-marbles';


import { Observable, of, throwError } from 'rxjs';
import { CharactersEffects } from "./characters.effects";
import { CharactersService } from '../services/characters.service';
import { charactersInitialSate } from './characters.reducer';
import * as fromCharactersActions from './characters.actions';

fdescribe(CharactersEffects.name, () => {

  let actions$: Observable<Action>;
  let effects: CharactersEffects;
  let store: MockStore<any>;
  let service: CharactersService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharactersEffects,
        provideMockActions(() => actions$),
        provideMockStore({initialState: {characters: charactersInitialSate}}),
        {
          provide: CharactersService,
          useValue: {
            getAllCharacters: () => {},
          }
        }
      ],
    });

    effects = TestBed.inject(CharactersEffects);
    store = TestBed.inject(MockStore);
    service = TestBed.inject(CharactersService);
  });

  it('shoud return #loadCharactersSuccess', () => {
    spyOn(service, 'getAllCharacters').and.returnValue(of([]));

    actions$ = hot('a', {a: fromCharactersActions.loadCharacterByParams({})});
    const expected = cold('b', {b: fromCharactersActions.loadCharactersSuccess({entities: []})});

    expect(effects.loadCharacters$).toBeObservable(expected);
  });

  it('should return #loadCharactesFailed', () => {
    spyOn(service, 'getAllCharacters').and.returnValue(throwError(() => {}));

    actions$ = hot('a', { a: fromCharactersActions.loadCharacterByParams({})});
    const expected = cold('b', { b: fromCharactersActions.loadCharactersFailed() });

    expect(effects.loadCharacters$).toBeObservable(expected);
  });

});
