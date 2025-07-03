import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoInscricaoComponent } from './gestao-inscricao.component';

describe('GestaoInscricaoComponent', () => {
  let component: GestaoInscricaoComponent;
  let fixture: ComponentFixture<GestaoInscricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestaoInscricaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
