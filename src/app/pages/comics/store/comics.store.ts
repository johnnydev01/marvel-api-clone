import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { Comic } from "src/app/shared/models/comics.model"
import { ComicsService } from "../services/Comics.service";
import { lastValueFrom } from "rxjs";



type ComicsState = {
  comics: Comic[],
  isLoading: boolean,
  query: ComicsQuery;
}

export type ComicsQuery = {
  offset: string;
  limit: string;
}

const initialState: ComicsState = {
  comics: [],
  isLoading: false,
  query: {
    offset: '0',
    limit: '12'
  }
}

export const ComicsStore = signalStore(
  withState(initialState),
  withMethods((store, comicsService = inject(ComicsService)) => ({
    setQuery(query: ComicsQuery): void {
      patchState(store, { query });
    },
    async getWithQuery(): Promise<void>  {
      patchState(store, { isLoading: true });
      const comics = await lastValueFrom(comicsService.getWithQuery(store.query()));
      patchState(store, { comics, isLoading: false })
    },

    async loadMore(): Promise<void>  {
      patchState(store, { isLoading: true });
      const newComics = await lastValueFrom(comicsService.getWithQuery(store.query()));
      patchState(store, ({ comics }) => ({ comics: [...comics, ...newComics] } ), {isLoading: false});
    },
  }))
)
