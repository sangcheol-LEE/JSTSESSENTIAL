import Router from "./core/router";
import { Store } from "./types";
import { NewsDetailView, NewsFeedView } from "./page"; // 좋은듯

export const Root: HTMLElement | null = document.getElementById("root");

const store: Store = {
  currentPage: 1,
  feed: [],
};

declare global {
  interface Window {
    store: Store;
  }
}

window.store = store;

const router: Router = new Router();
const newsFeedView = new NewsFeedView("root");
const newsDetailView = new NewsDetailView("root");

router.setDefaultPage(newsFeedView);
router.addRouterPage("/page/", newsFeedView);
router.addRouterPage("/show/", newsDetailView);
router.route();
