import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoPagamentoComponent } from './gestao-pagamento.component';

describe('GestaoPagamentoComponent', () => {
  let component: GestaoPagamentoComponent;
  let fixture: ComponentFixture<GestaoPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestaoPagamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
