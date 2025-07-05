import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoInscricaoComponent } from './modal-info-inscricao.component';

describe('ModalInfoInscricaoComponent', () => {
  let component: ModalInfoInscricaoComponent;
  let fixture: ComponentFixture<ModalInfoInscricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInfoInscricaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfoInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
