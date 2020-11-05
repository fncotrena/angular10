import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFichaclinicaComponent } from './form-fichaclinica.component';

describe('FormFichaclinicaComponent', () => {
  let component: FormFichaclinicaComponent;
  let fixture: ComponentFixture<FormFichaclinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFichaclinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFichaclinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
