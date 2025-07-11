import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInfoVisitaComponent } from './modal-info-visita.component';

describe('ModalInfoVisitaComponent', () => {
  let component: ModalInfoVisitaComponent;
  let fixture: ComponentFixture<ModalInfoVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalInfoVisitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInfoVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
