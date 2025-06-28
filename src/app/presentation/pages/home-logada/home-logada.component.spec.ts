import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLogadaComponent } from './home-logada.component';

describe('HomeLogadaComponent', () => {
  let component: HomeLogadaComponent;
  let fixture: ComponentFixture<HomeLogadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLogadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeLogadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
