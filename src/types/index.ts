import { View } from "../core/view";

export interface NewsStore {
  getAllFeed: () => NewsFeed[];
  getFeed: (position: number) => NewsFeed;
  setFeed: (feeds: NewsFeed[]) => void;
  makeRead: (id: number) => void;
  hasFeed: boolean;
  currentPage: number;
  numberOfFeed: number;
  nextPage: number;
  prevPage: number;
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
