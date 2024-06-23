import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicsItemComponent } from './comics-item.component';

describe('ComicsItemComponent', () => {
  let component: ComicsItemComponent;
  let fixture: ComponentFixture<ComicsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComicsItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComicsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
