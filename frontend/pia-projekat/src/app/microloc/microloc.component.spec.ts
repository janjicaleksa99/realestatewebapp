import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrolocComponent } from './microloc.component';

describe('MicrolocComponent', () => {
  let component: MicrolocComponent;
  let fixture: ComponentFixture<MicrolocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrolocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrolocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
