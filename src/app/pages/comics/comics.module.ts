import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SwiperModule } from 'swiper/angular';
import { ComicsPage } from './containers/comics.page';
import { ComicsCarrousselComponent } from './components/comics-carroussel/comics-carroussel.component';



@NgModule({
  declarations: [
    ComicsPage,
    ComicsCarrousselComponent
  ],
  imports: [
    CommonModule,
    SwiperModule,
    RouterModule.forChild([
      {
        path: '',
        component: ComicsPage
      }
    ])
  ]
})
export class ComicsModule { }
