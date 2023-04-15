export type Store = {
  currentPage: number;
  feeds: NewsFeed[];
};

interface News {
  id: number;
  time_ago: string;
  title: string;
  url: string;
  user: string;
  content: string;
}

export interface NewsFeed extends News {
  comments_count: number;
  isRead?: boolean;
  points: number;
}

export interface NewsDetail extends News {
  comments: [];
}

export interface NewsComment extends News {
  comments: [];
  level: number;
}
