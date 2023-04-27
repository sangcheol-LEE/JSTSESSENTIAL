import { View } from "../core/view";
export interface Store {
  currentPage: number;
  feed: NewsFeed[];
}
export interface News {
  readonly id: number;
  readonly user: string;
  readonly title: string;
  readonly time_ago: string;
  readonly content?: string;
  readonly comments_count: number;
}

export interface NewsFeed extends News {
  isRead?: boolean;
  readonly points: number;
}

export interface NewsDetail extends News {
  readonly comments: Comments[];
}

export interface Comments extends News {
  readonly comments: Comments[];
  readonly level: number;
}

export interface RouterInfo {
  path: string;
  page: View;
}
