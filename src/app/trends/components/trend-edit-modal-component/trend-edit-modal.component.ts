import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { selectOpenedEditModal, selectSelectedTrend, selectTypeActionModal } from "../../store/selectors";
import { FormBuilder, FormGroup } from "@angular/forms";
import { closeEditTrend, editTrend } from "../../store/actions/trends-edit-page.actions";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-edit-trend-modal',
  templateUrl: './trend-edit-modal.component.html',
  styleUrls: ['./trend-edit-modal.component.scss'],
  animations: [
    trigger('fadeInRight', [
      state('void', style({ opacity: 0, transform: 'translateX(100px)' })),
      transition(':enter, :leave', [
        animate('0.5s ease-in-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class TrendEditModalComponent implements OnInit{

  selectedTrend$ = this.store.select(selectSelectedTrend);
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
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) {}

  ngOnInit(): void {
    this.selectedTrend$.subscribe((selectedTrend) => {
      if (selectedTrend) {
        this.trendForm.patchValue({
          ...selectedTrend
        });
      }
    });
  }

  closeModal() {
    this.store.dispatch(closeEditTrend())
  }
  editTrend() {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(editTrend({
      id, trend: this.trendForm.value,
    }));
  }

}
