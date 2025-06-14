import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDadosAdicionaisComponent } from './form-dados-adicionais.component';

describe('FormDadosAdicionaisComponent', () => {
  let component: FormDadosAdicionaisComponent;
  let fixture: ComponentFixture<FormDadosAdicionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDadosAdicionaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDadosAdicionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
