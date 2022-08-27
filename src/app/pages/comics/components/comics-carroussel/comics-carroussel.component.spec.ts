import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsCarrousselComponent } from './comics-carroussel.component';

describe('ComicsCarrousselComponent', () => {
  let component: ComicsCarrousselComponent;
  let fixture: ComponentFixture<ComicsCarrousselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicsCarrousselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsCarrousselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
