import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanPersonalDataComponent } from './salesman-personal-data.component';

describe('SalesmanPersonalDataComponent', () => {
  let component: SalesmanPersonalDataComponent;
  let fixture: ComponentFixture<SalesmanPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesmanPersonalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesmanPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
