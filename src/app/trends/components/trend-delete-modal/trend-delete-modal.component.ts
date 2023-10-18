import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectSelectedTrend } from "../../store/selectors";
import { DeleteTrend, closeEditTrend } from "../../store/actions/trends-edit-page.actions";
import { Trend } from "../../models/trend.model";
import { map } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-delete-trend',
  templateUrl: './trend-delete-modal.component.html',
  styleUrls: ['./trend-delete-modal.component.scss'],
})
export class TrendDeleteModalComponent implements OnInit{

  selectedTrend$ = this.store.select(selectSelectedTrend);

  constructor(
    private store: Store,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {

  }

  closeModal() {
    this.store.dispatch(closeEditTrend())
  }

  deleteTrend() {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(DeleteTrend({ trendId: id }));
  }
}
