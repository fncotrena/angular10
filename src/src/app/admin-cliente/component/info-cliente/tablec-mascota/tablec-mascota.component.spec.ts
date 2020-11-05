import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecMascotaComponent } from './tablec-mascota.component';

describe('TablecMascotaComponent', () => {
  let component: TablecMascotaComponent;
  let fixture: ComponentFixture<TablecMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablecMascotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablecMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
