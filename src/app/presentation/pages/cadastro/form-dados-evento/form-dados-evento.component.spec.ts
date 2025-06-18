import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDadosEventoComponent } from './form-dados-evento.component';

describe('FormDadosEventoComponent', () => {
  let component: FormDadosEventoComponent;
  let fixture: ComponentFixture<FormDadosEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDadosEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDadosEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
