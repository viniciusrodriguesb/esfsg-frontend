import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoVisitasComponent } from './gestao-visitas.component';

describe('GestaoVisitasComponent', () => {
  let component: GestaoVisitasComponent;
  let fixture: ComponentFixture<GestaoVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestaoVisitasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
