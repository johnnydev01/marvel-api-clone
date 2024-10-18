import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, effect, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  private readonly breakpointObserever = inject(BreakpointObserver);

  private readonly layoutChanges = toSignal(
    this.breakpointObserever
      .observe(Object.values(Breakpoints))
      .pipe(
        map(({ breakpoints }) => breakpoints)
      )
  );

  constructor() {
  }
  public readonly isWeb = computed(() =>
    this.layoutChanges()?.[Breakpoints.Web] ?? false
  );

  public readonly isWebPortrait = computed(() =>
    this.layoutChanges()?.[Breakpoints.WebPortrait] ?? false
  );

  public readonly isHandset = computed(() =>
  this.layoutChanges()?.[Breakpoints.Handset] ?? false
  );

}
