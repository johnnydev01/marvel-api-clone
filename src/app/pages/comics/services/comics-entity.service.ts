import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Comic } from "src/app/shared/models/comics.model";

@Injectable()
export class ComicsEntityService extends EntityCollectionServiceBase<Comic> {
  constructor (serviceElementsFactory: EntityCollectionServiceElementsFactory ) {
    super('Comic', serviceElementsFactory);
  }
}
