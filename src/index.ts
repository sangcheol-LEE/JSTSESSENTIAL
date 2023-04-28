import Router from "./core/router";
import { NewsDetailView, NewsFeedView } from "./page"; // 좋은듯
import Store from "./store";

export const Root: HTMLElement | null = document.getElementById("root");
const store = new Store();

const router: Router = new Router();
const newsFeedView = new NewsFeedView("root", store);
const newsDetailView = new NewsDetailView("root", store);

router.setDefaultPage(newsFeedView);
router.addRouterPage("/page/", newsFeedView);
router.addRouterPage("/show/", newsDetailView);
router.route();
