import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from 'src/app/shared/models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  baseUrl = environment.BASE_URL;
  params = environment.PARAMS;

  constructor(private http: HttpClient) { }


  getAllCharacters(offset = 0, limit = 36, nameStartsWith?: string): Observable<Character[]> {
    const params = nameStartsWith ? new HttpParams().append('nameStartsWith', nameStartsWith) : undefined;

    return this.http.get<Character[]>(`${this.baseUrl}/characters${this.params}&orderBy=name&offset=${offset}&limit=${limit}`, {params} )
      .pipe(
        map(response => response['data'].results)
      );
  }

  // getCharacterByName(nameStartsWith: string): Observable<Character[]> {
  //   return this.http.get<Character[]>(`${this.baseUrl}/characters${this.params}&nameStartsWith=${nameStartsWith}`)
  //   .pipe(
  //     map(response => response['data'].results)
  //   );
  // }
}
