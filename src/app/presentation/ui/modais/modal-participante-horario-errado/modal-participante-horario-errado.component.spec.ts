import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParticipanteHorarioErradoComponent } from './modal-participante-horario-errado.component';

describe('ModalParticipanteHorarioErradoComponent', () => {
  let component: ModalParticipanteHorarioErradoComponent;
  let fixture: ComponentFixture<ModalParticipanteHorarioErradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalParticipanteHorarioErradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalParticipanteHorarioErradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
