
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { closeEditTrend, newTrend } from "../../store/actions/trends-edit-page.actions";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-add-trend-modal',
  templateUrl: './trend-add-modal.component.html',
  styleUrls: ['./trend-add-modal.component.scss'],
})
export class TrendAddModalComponent implements OnInit{

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
