import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRealEstateJSONComponent } from './new-real-estate-json.component';

describe('NewRealEstateJSONComponent', () => {
  let component: NewRealEstateJSONComponent;
  let fixture: ComponentFixture<NewRealEstateJSONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRealEstateJSONComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRealEstateJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
