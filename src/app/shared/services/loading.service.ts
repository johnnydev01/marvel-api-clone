import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = signal<boolean>(false);

  readonly loading = this._loading.asReadonly();

  loadingOn() {
    this._loading.set(true);
  }

  loadingOff() {
    this._loading.set(false);
  }
}
