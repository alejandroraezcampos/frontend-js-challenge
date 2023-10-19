import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectOpenedEditModal, selectSelectedTrend, selectTypeActionModal } from '../store/selectors';
import { openDeleteTrend, openEditTrend } from '../store/actions/trends-edit-page.actions';

@Component({
  selector: 'app-trend-detail',
  template: `
    <a class="link-to-home" routerLink="/trends">
      <img src="assets/Iconos/Actions/back.svg" alt="Flecha hacia atrás" />
      <span>TODOS LOS EVENTOS</span>
    </a>
    <article class="trend__detail" *ngIf="trend$ | async as trend">
      <header class="trend__header">
        <div class="trend__actions">
          <button type="button"
            class="trend__action" (click)="editTrend()">
            <img src="assets/Iconos/Actions/edit.svg"
            alt="Editar noticia" />
          </button>
          <button type="button" class="trend__action" (click)="deleteTrend()">
            <img src="assets/Iconos/Actions/delete.svg" alt="Borrar noticia" />
          </button>
        </div>
        <img class="trend__image" [src]="trend.image" alt="trend.title" />
      </header>
      <div class="trend__content">
        <h2 class="trend__title">
          <a class="trend__link" [href]="trend.url" target="_blank">
            {{ trend.title }}
          </a>
        </h2>
        <div class="trend_paragraph-container">
          <p class="trend__paragraph" *ngFor="let paragraph of trend.body">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </article>
    <!-- <ng-container *ngIf="(openedEditTrend$ | async)">
      <app-edit-trend-modal
        *ngIf="(typeAction$ | async) == 'edit'"></app-edit-trend-modal>
      <app-add-trend-modal
        *ngIf="(typeAction$ | async) == 'new'"></app-add-trend-modal>
      <app-delete-trend
        *ngIf="(typeAction$ | async) == 'delete'"></app-delete-trend>
    </ng-container> -->
    <app-add-trend-modal></app-add-trend-modal>
    <app-edit-trend-modal></app-edit-trend-modal>
    <app-delete-trend></app-delete-trend>
    <app-add-trend-btn></app-add-trend-btn>
    <app-trend-popup-alert></app-trend-popup-alert>
  `,
  styleUrls: ['./trend-detail.component.scss'],
})
export class TrendDetailComponent {
  protected trend$ = this.store.select(selectSelectedTrend);
  protected openedEditTrend$ = this.store.select(selectOpenedEditModal);
  protected typeAction$ = this.store.select(selectTypeActionModal);

  constructor(private store: Store) {}

  editTrend() {
    this.store.dispatch(openEditTrend({typeAction: 'edit'}));
  }

  deleteTrend() {
    this.store.dispatch(openDeleteTrend({typeAction: 'delete'}));
  }
}
