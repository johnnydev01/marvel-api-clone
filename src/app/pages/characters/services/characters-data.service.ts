import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';
import { map, Observable, tap } from 'rxjs';
import { Character } from 'src/app/shared/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersDataService extends DefaultDataService<Character> {

  baseUrl = environment.BASE_URL;
  params = environment.PARAMS;

  constructor(http: HttpClient,  httpUrlGenerator: HttpUrlGenerator) {
    super('Characters', http, httpUrlGenerator)
  }

   override getWithQuery(params: string | QueryParams ): Observable<Character[]> {
    const queryParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

    return this.http.get<Character[]>(`${this.baseUrl}/characters${this.params}&orderBy=name&${queryParams}`,)
      .pipe(
        map(response => response['data'].results)
      );

  }

}
