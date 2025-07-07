import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasNaoAlocadasComponent } from './visitas-nao-alocadas.component';

describe('VisitasNaoAlocadasComponent', () => {
  let component: VisitasNaoAlocadasComponent;
  let fixture: ComponentFixture<VisitasNaoAlocadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitasNaoAlocadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitasNaoAlocadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
