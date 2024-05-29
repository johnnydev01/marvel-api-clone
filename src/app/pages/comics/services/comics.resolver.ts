import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, filter, first, tap } from "rxjs";
import { QueryParams } from "@ngrx/data";
import { ComicsEntityService } from "./comics-entity.service";

@Injectable()
export class ComicsResolver implements Resolve<boolean> {

  constructor(private comicsService: ComicsEntityService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.comicsService.loaded$
        .pipe(
          tap(loaded => {
            if(!loaded) {
              this.comicsService.getWithQuery({'offset':  '0'});
            }
            return loaded
          }),
          filter(loaded => !!loaded),
          first()
        )

    }


}
