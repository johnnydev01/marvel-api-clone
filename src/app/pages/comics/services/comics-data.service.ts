import { Comic } from '../../../shared/models/comics.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { DefaultDataService, HttpUrlGenerator, QueryParams } from '@ngrx/data';

@Injectable({
  providedIn: 'root'
})
export class ComicsDataService extends DefaultDataService<Comic>{

  baseUrl =  environment.BASE_URL;
  params = environment.PARAMS;

  constructor(http: HttpClient,  httpUrlGenerator: HttpUrlGenerator) {
    super('Comic', http, httpUrlGenerator)
  }
  override getWithQuery(params: string | QueryParams ): Observable<Comic[]> {
    const limit = 12;
    return this.http.get<Comic[]>(`${this.baseUrl}/comics${this.params}&offset=${params['offset']*12}&limit=${limit}`)
      .pipe(
        map(response => response['data'].results)
      );
  }

}
