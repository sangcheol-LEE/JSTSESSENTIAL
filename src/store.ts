import { NewsFeed } from "./types/index";
import { NewsStore } from "./types/index";
export default class Store implements NewsStore {
  private _currentPage: number;
  private feeds: NewsFeed[];

  constructor() {
    this._currentPage = 1;
    this.feeds = [];
  }

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  get nextPage(): number {
    return this._currentPage + 1;
  }

  get prevPage(): number {
    return this._currentPage > 1 ? this._currentPage - 1 : 1;
  }

  get numberOfFeed(): number {
    return this.feeds.length;
  }

  get hasFeed(): boolean {
    return this.feeds.length > 0;
  }

  getAllFeed(): NewsFeed[] {
    return this.feeds;
  }

  getFeed(position: number): NewsFeed {
    return this.feeds[position];
  }

  setFeed(feeds: NewsFeed[]): void {
    this.feeds = feeds.map((item) => ({
      ...item,
      isRead: false,
    }));
  }

  makeRead(id: number): void {
    const feed = this.feeds.find((feed: NewsFeed) => feed.id === id);
    if (feed) {
      feed.isRead = true;
    }
  }
}
