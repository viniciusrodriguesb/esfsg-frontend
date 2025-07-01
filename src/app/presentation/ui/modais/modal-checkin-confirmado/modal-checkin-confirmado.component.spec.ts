import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCheckinConfirmadoComponent } from './modal-checkin-confirmado.component';

describe('ModalCheckinConfirmadoComponent', () => {
  let component: ModalCheckinConfirmadoComponent;
  let fixture: ComponentFixture<ModalCheckinConfirmadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCheckinConfirmadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCheckinConfirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
