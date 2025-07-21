import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { register } from 'swiper/element/bundle';


register();

@Component({
    selector: 'app-comics-carousel',
    templateUrl: './comics-carousel.component.html',
    styleUrls: ['./comics-carousel.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ComicsCarouselComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }


}
