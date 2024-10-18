import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, share } from 'rxjs';
import { Character } from 'src/app/shared/models/character.model';
import { firstValueFrom } from 'rxjs';
import { CharactersQuery } from '../store/characters.store';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private http = inject(HttpClient);

  baseUrl = environment.BASE_URL;
  params = environment.PARAMS;



 loadByQuery(query: CharactersQuery): Observable<Character[]> {
    const queryParams = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
    return this.http.get<Character[]>(`${this.baseUrl}/characters${this.params}&orderBy=name&${queryParams}`)
      .pipe(
        map(response => response['data'].results)
      )
  }

}
