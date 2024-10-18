import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Character } from "src/app/shared/models/character.model"
import { CharactersService } from "../services/characters.service";
import { computed, inject } from "@angular/core";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, lastValueFrom, pipe, switchMap, tap } from "rxjs";
import { tapResponse } from '@ngrx/operators';


type CharactersState = {
  characters: Character[];
  isLoading: boolean;
  query: CharactersQuery;
}

export type CharactersQuery = {
  nameStartsWith?: string;
  offset: string;
  limit: string;
  orderBy?: string;
}

const initialState: CharactersState = {
  characters: [],
  isLoading: false,
  query: {
    offset: '0',
    limit: '36',
    orderBy: 'name'
  }
}

export const CharactersStore = signalStore(
  withState(initialState),
  withMethods((store, charactersService = inject(CharactersService)) => ({
    setQuery(query: CharactersQuery): void {
      patchState(store, { query });
    },
    async loadByQuery(): Promise<void>  {
      patchState(store, { isLoading: true });
      const characters = await lastValueFrom(charactersService.loadByQuery(store.query()));
      patchState(store, { characters, isLoading: false })
    },

    loadCharactersByFilter: rxMethod<string> (
      pipe(
        debounceTime(500),
        filter((nameStartsWith) => nameStartsWith.length >=3 || !nameStartsWith.length),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((nameStartsWith) => {
          return charactersService.loadByQuery({nameStartsWith, offset: '0', limit: '36'})
            .pipe(
              tapResponse({
                next: (characters: Character[]) => {
                  patchState(store, { characters })
                },
                error: console.error,
                finalize: () => patchState(store, { isLoading: false }),
              })
            );
        })
      )
     ),
  })),
  withComputed((({ characters, query}) => ({
    charactersNames: computed(() =>  characters().length < 36 ? characters().map(character => character.name):
     query().nameStartsWith ?? []),
  }))),

)
