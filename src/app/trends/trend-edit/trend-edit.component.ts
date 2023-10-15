import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectIsCollapsedState } from "src/app/store/selectors/sidebar.selectors";

@Component({
  selector: 'app-trend-edit',
  templateUrl: './trend-edit.component.html',
  styleUrls: ['./trend-edit.component.scss'],
})
export class TrendEditComponent {
  protected isCollapsed$ = this.store.select(selectIsCollapsedState);


  constructor(private store: Store) {}
}
