import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsShowPopup, selectPopupAlert } from '../../store/selectors';
import { closePopupAlert } from '../../store/actions/trends-edit-page.actions';

@Component({
  selector: 'app-trend-popup-alert',
  templateUrl: './trend-popup-alert.component.html',
  styleUrls: ['./trend-popup-alert.component.scss'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, })), // Estado inicial (invisible)
      transition('void <=> *', animate('300ms')), // Animación de entrada y salida de 300 ms
    ]),
  ],
})
export class TrendPopupAlertComponent implements OnInit {

  protected isShowPopupAlert$ = this.store.select(selectIsShowPopup);
  protected PopupAlert$ = this.store.select(selectPopupAlert);

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.store.dispatch(closePopupAlert());
  }

}
