import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEdicaoUsuarioComponent } from './modal-edicao-usuario.component';

describe('ModalEdicaoUsuarioComponent', () => {
  let component: ModalEdicaoUsuarioComponent;
  let fixture: ComponentFixture<ModalEdicaoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEdicaoUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEdicaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
