import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { CharactersEntityService } from "./characters-entity.service";
import { Observable, filter, first, tap } from "rxjs";
import { QueryParams } from "@ngrx/data";

@Injectable()
export class CharactersResolver implements Resolve<boolean> {

  constructor(private charactersService: CharactersEntityService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      const params: QueryParams = {orderBy: 'name', offset: '0', limit: '36'}
      return this.charactersService.loaded$
        .pipe(
          tap(loaded => {
            if(!loaded) {
              this.charactersService.getWithQuery(params);
            }
            return loaded
          }),
          filter(loaded => !!loaded),
          first()
        )

    }


}
