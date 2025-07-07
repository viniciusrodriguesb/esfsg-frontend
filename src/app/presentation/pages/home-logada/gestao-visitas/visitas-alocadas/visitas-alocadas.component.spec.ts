import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasAlocadasComponent } from './visitas-alocadas.component';

describe('VisitasAlocadasComponent', () => {
  let component: VisitasAlocadasComponent;
  let fixture: ComponentFixture<VisitasAlocadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitasAlocadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitasAlocadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
