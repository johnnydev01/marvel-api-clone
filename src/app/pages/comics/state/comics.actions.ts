import { createAction, props } from "@ngrx/store";
import { Comic } from "src/app/shared/models/comics.model";


export const loadListFromLastComics = createAction(
  '[Las Comics] Load List',
);

export const loadListFromComics = createAction(
  '[Comics] Load List',
);

export const loadMore = createAction(
  '[Comics] Load More',
);

export const loadComicsSuccess = createAction(
  '[API] Load Comics Success',
  props<{entities: Comic[]}>(),
);

export const loadComicsFailure = createAction(
  '[API] Load Comics Failure',
);
