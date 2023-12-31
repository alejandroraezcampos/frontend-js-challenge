import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { GetAllTrendsResponse } from './models/get-all-trends-response.model';
import { GetOneTrendResponse } from './models/get-one-trend-response.model';
import { CreatedTrend, Trend, TrendEdited, TrendRequestBody } from './models/trend.model';
import { TrendProvider } from './models/trend-provider.model';
import { TrendResponse } from './models/trend-response.model';
import { environment } from 'src/environments/environment';
import { EditTrendResponse } from './models/edit-trend-response.model';
import { AddTrendResponse } from './models/add-trend-response.model';
import { DeleteTrendResponse } from './models/delete-trend-response.model';

@Injectable()
export class TrendService {
  private readonly urlBase = environment.avantioAPIHost;

  public readonly getAllUrl = `${this.urlBase}/v1/trends`;

  constructor(private httpClient: HttpClient) {}

  public getAll(): Observable<Trend[]> {
    return this.httpClient
      .get<GetAllTrendsResponse>(this.getAllUrl)
      .pipe(map(({ trends }) => [...trends.map(this.mapToTrendModel)]));
  }

  public getOne(id: string): Observable<Trend> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient
      .get<GetOneTrendResponse>(url)
      .pipe(map(({ trend }) => this.mapToTrendModel(trend)));
  }

  public edit( id: string, editedTrend: TrendEdited): Observable<boolean> {
    const url = `${this.getAllUrl}/${id}`;
    return this.httpClient
      .put<EditTrendResponse>(url, editedTrend)
      .pipe(map(( modified ) => !!modified ))
  }

  public add( newTrend: CreatedTrend ): Observable<Trend> {
    const url = `${this.getAllUrl}`;
    return this.httpClient
      .post<AddTrendResponse>(url, newTrend)
      .pipe(map(( {trend} ) => this.mapToTrendModel(trend) ))
  }

  public delete( id: string, ): Observable<boolean> {
    const url = `${this.getAllUrl}/${id}`;
    console.log(url);
    return this.httpClient
      .delete<DeleteTrendResponse>(url)
      .pipe(map(( {success} ) => !!success ))
  }

  private mapToTrendModel(trendResponse: TrendResponse): Trend {
    return {
      id: trendResponse._id,
      body: trendResponse.body.split('\n\n'),
      createdAt: new Date(trendResponse.createdAt),
      image: trendResponse.image,
      provider: trendResponse.provider as TrendProvider,
      title: trendResponse.title,
      url: trendResponse.url,
    };
  }

}
