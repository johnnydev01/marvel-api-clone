import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from "@ngrx/data";
import { Character } from "src/app/shared/models/character.model";

@Injectable()
export class CharactersEntityService extends EntityCollectionServiceBase<Character> {
  constructor (serviceElementsFactory: EntityCollectionServiceElementsFactory ) {
    super('Character', serviceElementsFactory);
  }
}
