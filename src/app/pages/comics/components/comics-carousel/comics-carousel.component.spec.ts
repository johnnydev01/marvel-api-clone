import { SwiperModule } from 'swiper/angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsCarouselComponent } from './comics-carousel.component';

describe(ComicsCarouselComponent.name, () => {
  let component: ComicsCarouselComponent;
  let fixture: ComponentFixture<ComicsCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicsCarouselComponent ],
      imports: [SwiperModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
