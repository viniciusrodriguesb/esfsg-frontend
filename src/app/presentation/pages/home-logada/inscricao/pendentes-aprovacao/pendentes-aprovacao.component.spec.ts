import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendentesAprovacaoComponent } from './pendentes-aprovacao.component';

describe('PendentesAprovacaoComponent', () => {
  let component: PendentesAprovacaoComponent;
  let fixture: ComponentFixture<PendentesAprovacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendentesAprovacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendentesAprovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
