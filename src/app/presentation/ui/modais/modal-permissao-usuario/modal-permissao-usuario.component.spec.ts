import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPermissaoUsuarioComponent } from './modal-permissao-usuario.component';

describe('ModalPermissaoUsuarioComponent', () => {
  let component: ModalPermissaoUsuarioComponent;
  let fixture: ComponentFixture<ModalPermissaoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPermissaoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalPermissaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
