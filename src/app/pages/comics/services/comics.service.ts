import { Comic } from './../../../shared/models/comics.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {

  baseUrl =  environment.BASE_URL;
  params = environment.PARAMS;

  constructor(private http: HttpClient) {}

  getComics(offset = 0): Observable<Comic[]> {
    const limit = 12;
    return this.http.get<Comic[]>(`${this.baseUrl}/comics${this.params}&offset=${offset*12}&limit=${limit}`)
      .pipe(
        map(response => response['data'].results)
      );
  }

}
