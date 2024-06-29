import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
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


  // async loadByQuery(params: object): Promise<Character[]> {
  //     const queryParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

  //    return await firstValueFrom(
  //       this.http.get<Character[]>(`${this.baseUrl}/characters${this.params}&orderBy=name&${queryParams}`)
  //         .pipe(
  //           map(response => response['data'].results)
  //         )
  //     )
  // }

 loadByQuery(query: CharactersQuery): Observable<Character[]> {
    // if(query.nameStartsWith?.length === 0) {
    //   delete query.nameStartsWith;
    // }
    const queryParams = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
    return this.http.get<Character[]>(`${this.baseUrl}/characters${this.params}&orderBy=name&${queryParams}`)
      .pipe(
        map(response => response['data'].results)
      )
  }

}
