import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateViewComponent } from './real-estate-view.component';

describe('RealEstateViewComponent', () => {
  let component: RealEstateViewComponent;
  let fixture: ComponentFixture<RealEstateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
