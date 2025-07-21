import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ComicsQuery } from "../store/comics.store";
import { Comic } from "src/app/shared/models/comics.model";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComicsService {
  private http = inject(HttpClient);

  baseUrl = environment.BASE_URL;
  params = environment.PARAMS;

  getWithQuery(query: ComicsQuery) {
    const queryParams = Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
  return this.http.get<Comic[]>(`${this.baseUrl}/comics${this.params}&${queryParams}`)
        .pipe(
          map(response => response['data'].results)
        )
  }
}
