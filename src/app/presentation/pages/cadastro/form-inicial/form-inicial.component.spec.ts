import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInicialComponent } from './form-inicial.component';

describe('FormInicialComponent', () => {
  let component: FormInicialComponent;
  let fixture: ComponentFixture<FormInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInicialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
