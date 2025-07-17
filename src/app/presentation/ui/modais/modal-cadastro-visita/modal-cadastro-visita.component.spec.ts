import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadastroVisitaComponent } from './modal-cadastro-visita.component';

describe('ModalCadastroVisitaComponent', () => {
  let component: ModalCadastroVisitaComponent;
  let fixture: ComponentFixture<ModalCadastroVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCadastroVisitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCadastroVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
