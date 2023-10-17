import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, combineLatest, forkJoin } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { selectSelectedTrend, selectTypeActionModal } from "../../store/selectors";
import { Trend, TrendModified } from "../../models/trend.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { closeEditTrend, editTrend, newTrend } from "../../store/actions/trends-edit-page.actions";

@Component({
  selector: 'app-trend-edit',
  templateUrl: './trend-edit.component.html',
  styleUrls: ['./trend-edit.component.scss'],
})
export class TrendEditComponent implements OnInit{

  selectTypeAction$: Observable<string | null> = this.store.select(selectTypeActionModal);
  selectedTrend$: Observable<Trend | TrendModified |  null> = this.store.select(selectSelectedTrend);

  protected action: string | null = null;
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
    combineLatest({
      selectedTrend: this.selectedTrend$,
      typeAction: this.selectTypeAction$
    }).subscribe(({ selectedTrend, typeAction }) => {
      this.action = typeAction
      if (typeAction === 'edit') {
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
    switch(this.action) {
      case 'edit':
        this.saveEditTrend();
        break;
      case 'new':
        this.saveNewTrend();
        break;
    }
  }

  private saveEditTrend() {
    const id = this.route.snapshot.params['id'];
    this.store.dispatch(editTrend({
      id, trend: this.trendForm.value,
    }));
  }
  private saveNewTrend() {
    this.store.dispatch(newTrend({
      trend: this.trendForm.value,
    }));
  }




}
