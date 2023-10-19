import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectOpenedEditModal, selectSelectedTrend, selectTypeActionModal } from "../../store/selectors";
import { DeleteTrend, closeEditTrend } from "../../store/actions/trends-edit-page.actions";
import { ActivatedRoute } from "@angular/router";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-delete-trend',
  templateUrl: './trend-delete-modal.component.html',
  styleUrls: ['./trend-delete-modal.component.scss'],
  animations: [
    trigger('fadeInRight', [
      state('void', style({ opacity: 0, transform: 'translateX(100px)' })),
      transition(':enter, :leave', [
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class TrendDeleteModalComponent implements OnInit{

  selectedTrend$ = this.store.select(selectSelectedTrend);

  protected openedEditTrend$ = this.store.select(selectOpenedEditModal);
  protected typeAction$ = this.store.select(selectTypeActionModal);

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
