import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdavacComponent } from './prodavac.component';

describe('ProdavacComponent', () => {
  let component: ProdavacComponent;
  let fixture: ComponentFixture<ProdavacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdavacComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdavacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
