import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObterTodasComponent } from './obter-todas.component';

describe('ObterTodasComponent', () => {
  let component: ObterTodasComponent;
  let fixture: ComponentFixture<ObterTodasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObterTodasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObterTodasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
