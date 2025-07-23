import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroGestaoUsuarioComponent } from './filtro-gestao-usuario.component';

describe('FiltroGestaoUsuarioComponent', () => {
  let component: FiltroGestaoUsuarioComponent;
  let fixture: ComponentFixture<FiltroGestaoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroGestaoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroGestaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
