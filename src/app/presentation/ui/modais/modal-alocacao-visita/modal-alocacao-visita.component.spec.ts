import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAlocacaoVisitaComponent } from './modal-alocacao-visita.component';

describe('ModalAlocacaoVisitaComponent', () => {
  let component: ModalAlocacaoVisitaComponent;
  let fixture: ComponentFixture<ModalAlocacaoVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAlocacaoVisitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAlocacaoVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
