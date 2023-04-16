export interface Store {
  currentPage: number;
  feeds: NewsFeed[];
}

export type GetData = <AjaxResponse>(url: string) => AjaxResponse;

export interface Data {
  id: number;
  time_ago: string;
  title: string;
  url: string;
  user: string;
  content: string;
}

export interface NewsFeed extends Data {
  comments_count: string;
  isRead?: boolean;
  points: number;
}

export interface NewsDetail extends Data {
  comments: [];
}

export interface Comments extends Data {
  comments: [];
  level: number;
}
