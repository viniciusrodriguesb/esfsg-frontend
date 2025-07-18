import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroCheckinComponent } from './filtro-checkin.component';

describe('FiltroCheckinComponent', () => {
  let component: FiltroCheckinComponent;
  let fixture: ComponentFixture<FiltroCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroCheckinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
