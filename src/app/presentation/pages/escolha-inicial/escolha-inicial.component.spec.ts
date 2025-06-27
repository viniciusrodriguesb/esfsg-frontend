import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolhaInicialComponent } from './escolha-inicial.component';

describe('EscolhaInicialComponent', () => {
  let component: EscolhaInicialComponent;
  let fixture: ComponentFixture<EscolhaInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscolhaInicialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscolhaInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
