import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDadosIgrejaComponent } from './form-dados-igreja.component';

describe('FormDadosIgrejaComponent', () => {
  let component: FormDadosIgrejaComponent;
  let fixture: ComponentFixture<FormDadosIgrejaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDadosIgrejaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDadosIgrejaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
