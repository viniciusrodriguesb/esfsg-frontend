import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoNaoEncontradoComponent } from './resultado-nao-encontrado.component';

describe('ResultadoNaoEncontradoComponent', () => {
  let component: ResultadoNaoEncontradoComponent;
  let fixture: ComponentFixture<ResultadoNaoEncontradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultadoNaoEncontradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoNaoEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
