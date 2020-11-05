import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecBajaComponent } from './tablec-baja.component';

describe('TablecBajaComponent', () => {
  let component: TablecBajaComponent;
  let fixture: ComponentFixture<TablecBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablecBajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablecBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
