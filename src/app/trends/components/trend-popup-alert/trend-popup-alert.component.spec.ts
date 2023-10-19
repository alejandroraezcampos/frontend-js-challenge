import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendPopupAlertComponent } from './trend-popup-alert.component';

describe('TrendPopupAlertComponent', () => {
  let component: TrendPopupAlertComponent;
  let fixture: ComponentFixture<TrendPopupAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendPopupAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendPopupAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
