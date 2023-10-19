import { TrendProvider } from './trend-provider.model';

export interface Trend {
  id: string;
  title: string;
  body: string[];
  provider: TrendProvider;
  image: string;
  url: string;
  createdAt: Date;
}

export interface TrendEdited {
  id: string,
  title?: string;
  body?: string[];
  provider?: TrendProvider;
  image?: string;
  url?: string;
}

export interface CreatedTrend {

  title: string;
  body: string[];
  provider: TrendProvider;
  image: string;
  url: string;
}

export interface TrendRequestBody {
  title: string;
  body: string[];
  provider: TrendProvider;
  image: string;
  url: string;
}
