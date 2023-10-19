
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { closeEditTrend, newTrend } from "../../store/actions/trends-edit-page.actions";
import { FormBuilder, FormGroup } from "@angular/forms";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { selectOpenedEditModal, selectTypeActionModal } from "../../store/selectors";

@Component({
  selector: 'app-add-trend-modal',
  templateUrl: './trend-add-modal.component.html',
  styleUrls: ['./trend-add-modal.component.scss'],
  animations: [
    trigger('fadeInRight', [
      state('void', style({ opacity: 0, transform: 'translateX(100px)' })),
      transition(':enter, :leave', [
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class TrendAddModalComponent implements OnInit{

  protected openedEditTrend$ = this.store.select(selectOpenedEditModal);
  protected typeAction$ = this.store.select(selectTypeActionModal);

  protected trendForm: FormGroup = this.fb.group({
    url: [''],
    image: [''],
    title: [''],
    provider: [''],
    body: [''],
  });
  constructor(
    private store: Store,
    private fb: FormBuilder
    ) {}

  ngOnInit(): void {

  }

  closeModal() {
    this.store.dispatch(closeEditTrend())
  }

  addTrend() {
    this.store.dispatch(newTrend({ trend: this.trendForm.value}))
  }
}
