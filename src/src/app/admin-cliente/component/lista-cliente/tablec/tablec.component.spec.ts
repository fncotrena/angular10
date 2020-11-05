import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecComponent } from './tablec.component';

describe('TablecComponent', () => {
  let component: TablecComponent;
  let fixture: ComponentFixture<TablecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
