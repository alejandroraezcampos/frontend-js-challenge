import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectIsCollapsedState } from "src/app/store/selectors/sidebar.selectors";
import { Input } from "@angular/core";
import { combineLatest } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { selectSelectedTrend } from "../store/selectors";
import { Trend, TrendModified } from "../models/trend.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { closeEditTrend, editTrend } from "../store/actions/trends-edit-page.actions";

@Component({
  selector: 'app-trend-edit',
  templateUrl: './trend-edit.component.html',
  styleUrls: ['./trend-edit.component.scss'],
})
export class TrendEditComponent
  implements OnInit{

  @Input('type') type: string = 'create';
  trend: Trend | TrendModified | null = null;
  trendForm: FormGroup = this.fb.group({
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

    this.store.select(selectSelectedTrend)
    .subscribe( trend => {
      this.trend = trend;
      this.trendForm.patchValue({
        ...trend
      });
    });
  }

  closeModal() {
    this.store.dispatch(closeEditTrend())
  }

  saveTrend() {
    const editedTrend = this.getModifiedFields(this.trend, this.trendForm.value);
    this.store.dispatch(editTrend({
      id: this.trend?.id || '',
      trend: editedTrend,
    }));
  }

  private getModifiedFields(original: any, modified: any): any {
    const modifiedFields: any = {};

    for (const key in modified) {
      if (modified.hasOwnProperty(key)) {
        if (original[key] !== modified[key]) {
          modifiedFields[key] = modified[key];
        }
      }
    }

    return modifiedFields;
  }


}
