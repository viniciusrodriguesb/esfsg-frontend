import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudVisitaComponent } from './crud-visita.component';

describe('CrudVisitaComponent', () => {
  let component: CrudVisitaComponent;
  let fixture: ComponentFixture<CrudVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudVisitaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
