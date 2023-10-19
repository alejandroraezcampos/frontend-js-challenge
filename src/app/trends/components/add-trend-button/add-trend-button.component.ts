import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { openNewTrend } from "../../store/actions/trends-edit-page.actions";

@Component({
  selector: 'app-add-trend-btn',
  templateUrl: './add-trend-button.component.html',
  styleUrls: ['./add-trend-button.component.scss'],
})
export class AddTrendButtonComponent {
  constructor(
    private store: Store,
  ) {

  }

  createTrend() {
    this.store.dispatch(openNewTrend( {typeAction: 'new'}) )
  }
}
