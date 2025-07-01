import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalQrcodeCheckinComponent } from './modal-qrcode-checkin.component';

describe('ModalQrcodeCheckinComponent', () => {
  let component: ModalQrcodeCheckinComponent;
  let fixture: ComponentFixture<ModalQrcodeCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalQrcodeCheckinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalQrcodeCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
