import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { selectSelectedTrend } from "../../store/selectors";
import { FormBuilder, FormGroup } from "@angular/forms";
import { closeEditTrend, editTrend } from "../../store/actions/trends-edit-page.actions";

@Component({
  selector: 'app-edit-trend-modal',
  templateUrl: './trend-edit-modal.component.html',
  styleUrls: ['./trend-edit-modal.component.scss'],
})
export class TrendEditModalComponent implements OnInit{

  selectedTrend$ = this.store.select(selectSelectedTrend);
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
  saveTrend() {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(editTrend({
      id, trend: this.trendForm.value,
    }));
  }

}
