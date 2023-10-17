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

export interface TrendModified {
  id?: string,
  title?: string;
  body?: string[];
  provider?: TrendProvider;
  image?: string;
  url?: string;
}
