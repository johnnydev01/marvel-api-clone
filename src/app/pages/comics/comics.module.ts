import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'swiper/angular';
import { ComicsPage } from './containers/comics.page';
import { ComicsCarouselComponent } from './components/comics-carousel/comics-carousel.component';
import { comicsReducer } from './state/comics.reducer';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EffectsModule } from '@ngrx/effects';
import { ComicsEffects } from './state/comics.effects';


@NgModule({
  declarations: [
    ComicsPage,
    ComicsCarouselComponent,
  ],
  imports: [
    CommonModule,
    SwiperModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComicsPage
      }
    ]),
    StoreModule.forFeature('comics', comicsReducer),
    EffectsModule.forFeature([ComicsEffects]),
    MatProgressSpinnerModule
  ]
})
export class ComicsModule { }
