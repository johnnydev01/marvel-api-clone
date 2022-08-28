import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import { combineLatest, map, Observable } from 'rxjs';

import { Comic } from 'src/app/shared/models/comics.model';

import * as fromComicsActions from '../state/comics.actions';
import * as fromComicsSelectors from '../state/comics.selectores';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss']
})
export class ComicsPage implements OnInit {

  comics$: Observable<Comic[]>;
  loading$: Observable<boolean>;
  loadingMore$: Observable<boolean>;

  shouldShowLoadingIndicator$: Observable<boolean>;

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(fromComicsActions.loadListFromLastComics());

    this.comics$ = this.store.pipe(select(fromComicsSelectors.selectComicsEntities));
    this.loading$ = this.store.pipe(select(fromComicsSelectors.selectComicsLoading));
    this.loadingMore$ = this.store.pipe(select(fromComicsSelectors.selectLoadingMore));


    this.shouldShowLoadingIndicator$ = combineLatest([
      this.loading$,
      this.loadingMore$
    ])
    .pipe(
      map(([loading, loadingMore]) => loading || loadingMore),
    );
  }

  loadMore(): void {
    this.store.dispatch(fromComicsActions.loadMore());
  }

}
