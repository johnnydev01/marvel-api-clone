import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'swiper/angular';
import { ComicsPage } from './containers/comics.page';
import { ComicsCarouselComponent } from './components/comics-carousel/comics-carousel.component';



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
    ])
  ]
})
export class ComicsModule { }
