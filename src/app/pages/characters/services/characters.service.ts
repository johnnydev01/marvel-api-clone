import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
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


  getAllCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters${this.params}&limit=7` )
      .pipe(
        map(response => response['data'].results)
      );
  }
}
