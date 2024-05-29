import { select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

import { combineLatest, map, Observable } from 'rxjs';

import { Comic } from 'src/app/shared/models/comics.model';
import { ComicsEntityService } from '../services/comics-entity.service';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss']
})
export class ComicsPage implements OnInit {

  comics$: Observable<Comic[]>;

  shouldShowLoadingIndicator$: Observable<boolean>;

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  page = 0;

  constructor(private comicsService: ComicsEntityService) { }

  ngOnInit(): void {
    this.comics$ = this.comicsService.entities$;

    this.shouldShowLoadingIndicator$ = this.comicsService.loading$;
  }

  loadMore(): void {
   this.comicsService.getWithQuery({'offset': (this.page+1).toString()})
  }
}
