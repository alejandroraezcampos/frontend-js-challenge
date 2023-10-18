import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppTrendsRoutingModule } from './app-trends-routing.module';
import { AuthInterceptor } from './auth-interceptor';
import { TrendDetailComponent } from './trend-detail/trend-detail.component';
import { TrendService } from './trend.service';
import { TrendsListComponent } from './trends-list/trends-list.component';
import { trendsEffects } from './store/effects';
import { trendsFeatureKey, trendsReducer } from './store/reducers';
import { TrendEditModalComponent } from './components/trend-edit-modal-component/trend-edit-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddTrendButtonComponent } from './components/add-trend-button/add-trend-button.component';
import { TrendDeleteModalComponent } from './components/trend-delete-modal/trend-delete-modal.component';
import { TrendAddModalComponent } from './components/trend-add-modal-component/trend-add-modal.component';

@NgModule({
  declarations: [
    TrendsListComponent,
    TrendDetailComponent,
    TrendEditModalComponent,
    TrendDeleteModalComponent,
    TrendAddModalComponent,
    AddTrendButtonComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppTrendsRoutingModule,
    HttpClientModule,
    StoreModule.forFeature(trendsFeatureKey, trendsReducer),
    EffectsModule.forFeature(trendsEffects),
  ],
  exports: [TrendsListComponent],
  providers: [
    TrendService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppTrendsModule {}
