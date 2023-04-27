// types
interface Store {
  currentPage: number;
  feed: NewsFeed[];
}
interface News {
  readonly id: number;
  readonly user: string;
  readonly title: string;
  readonly time_ago: string;
  readonly content?: string;
  readonly comments_count: number;
}

interface NewsFeed extends News {
  isRead?: boolean;
  readonly points: number;
}

interface NewsDetail extends News {
  readonly comments: Comments[];
}

interface Comments extends News {
  readonly comments: Comments[];
  readonly level: number;
}

interface RouterInfo {
  path: string;
  page: View;
}
// =====================================================================
const Root: HTMLElement | null = document.getElementById("root");
const NEWSFEED_MAIN_URL: string = "https://api.hnpwa.com/v0/news/1.json";
const DETAIL_NEWS_URL: string = `https://api.hnpwa.com/v0/item/@id.json`;

const store: Store = {
  currentPage: 1,
  feed: [],
};
// =====================================================================

class Router {
  routeTable: RouterInfo[];
  defaultRoute: RouterInfo | null;

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));

    this.routeTable = [];
    this.defaultRoute = null;
  }

  setDefaultPage(page: View): void {
    this.defaultRoute = { path: "", page };
  }
  addRouterPage(path: string, page: View): void {
    this.routeTable.push({ path, page });
  }

  route() {
    const routerPath: string = location.hash;
    console.log("routerPath", routerPath);

    if (routerPath === "" && this.defaultRoute) {
      this.defaultRoute.page.render();
    }

    for (const routeInfo of this.routeTable) {
      if (routerPath.indexOf(routeInfo.path) >= 0) {
        routeInfo.page.render();
        break;
      }
    }
  }
}

// =====================================================================
//class
class Api {
  url: string;
  ajax: XMLHttpRequest;
  constructor(url: string) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }

  protected getId() {
    const id: string = window.location.hash.substring(7);
    const getReplaceUrl = this.url.replace("@id", id);
    return getReplaceUrl;
  }

  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open("GET", this.getId(), false);
    this.ajax.send();
    return JSON.parse(this.ajax.response);
  }
}

class NewsFeedApi extends Api {
  getSendRequestAjaxData() {
    return this.getRequest<NewsFeed[]>();
  }
}

class NewsDetailApi extends Api {
  getSendRequestAjaxData() {
    return this.getRequest<NewsDetail>();
  }
}

// ============================================================
abstract class View {
  private template: string;
  private renderTemplate: string;
  private root: HTMLElement;
  private htmlList: string[];

  constructor(rootId: string, template: string) {
    const root = document.getElementById(rootId);
    if (!root) {
      throw new Error(
        "최상위 컨테이너가 null입니다. html 및 id를 확인해주세요"
      );
    }
    this.root = root;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join("");
    this.clearHtml();
    return snapshot;
  }

  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{_${key}_}}`, value);
  }

  protected updateView = (): void => {
    this.root.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  };

  private clearHtml(): void {
    this.htmlList = [];
  }
  abstract render(): void; // 추상메소드
}

class NewsfeedView extends View {
  private api: NewsFeedApi;
  private feeds: NewsFeed[];

  constructor(rootId: string) {
    let template: string = `
      <div class="border border-black w-screen h-screen flex justify-center items-center bg-slate-500 h-auto">
        <div class="border w-auto m-auto bg-teal-400 rounded-3xl p-5 bg-white h-5/6 overflow-auto">
          <h1 class="text-5xl text-center mb-4 font-bold">Daily News!</h1>

          {{_main_section_}}

          <div class="flex space-x-96 justify-center text-2xl text-slate-500">
            <a class="hover:text-3xl hover:text-slate-700 transition-all duration-200" href="#/page/{{_prev_button_}}">< Prev Page </a>
            <a class="hover:text-3xl hover:text-slate-700 transition-all duration-200" href="#/page/{{_next_button_}}"> Next Page ></a>
          </div>
        </div>
      </div>
    `;
    super(rootId, template);
    this.feeds = store.feed;
    this.api = new NewsFeedApi(NEWSFEED_MAIN_URL);

    if (this.feeds.length === 0) {
      this.feeds = store.feed = this.api.getSendRequestAjaxData();
      this.getNewPropertyArray();
    }
  }

  private getNewPropertyArray(): void {
    for (let i = 0; i < this.feeds.length; i++) {
      this.feeds[i].isRead = false;
    }
  }

  render(): void {
    store.currentPage = Number(location.hash.substring(7) || 1);
    for (
      let i = (store.currentPage - 1) * 10;
      i < store.currentPage * 10;
      i++
    ) {
      const { isRead, id, title, comments_count, user, points, time_ago } =
        this.feeds[i];
      this.addHtml(`
         <div class="text-2xl p-1 w-auto border p-3 ${
           isRead ? "bg-slate-500" : "bg-slate-300"
         } rounded-xl flex items-center flex-col my-5 hover:bg-slate-700 transition duration-500">
            <div class="flex justify-items-start">
                <a href="#/show/${id}" class="mr-3 text-3xl">${title}</a>
                <div class="p-1 bg-yellow-300 rounded w-10 h-10 flex items-center justify-center">${comments_count}</div>
            </div>
            <div class="flex justify-items-between text-lg">
              <div><i class="fas fa-user "></i> ${user}</div>
              <div class="mx-3"><i class="fas fa-heart "> ${points}</i></div>
              <div><i class="fas fa-clock "> ${time_ago}</i></div>
            </div>
        </div>
      `);
    }
    this.setTemplateData("main_section", this.getHtml());
    this.setTemplateData(
      "prev_button",
      String(`${store.currentPage > 1 ? store.currentPage - 1 : 1}`)
    );
    this.setTemplateData(
      "next_button",
      String(
        `${
          Number(Array.from(String(this.feeds.length))[0]) > store.currentPage
            ? store.currentPage + 1
            : store.currentPage
        }`
      )
    );

    this.updateView();
  }
}

// 디테일 페이지
// =====================================================================
class NewsDetailView extends View {
  constructor(rootId: string) {
    let template = `
      <div class="border border-black w-screen h-screen flex justify-center items-center bg-slate-500 h-auto">
        <div class="border w-auto m-auto bg-teal-400 rounded-3xl p-5 bg-white h-5/6 overflow-auto">
          <h1 class="text-5xl text-center mb-4 font-bold">{{_title_}}</h1>
          <p>{{_content_}}</p>

          {{_comment_}}

          <div class="flex space-x-96 justify-center text-2xl text-slate-500">
            <a href="#/page/{{_listPage_}}">목록으로</a>
          </div>
        </div/>
      </div>
    `;
    super(rootId, template);
  }
  render() {
    const api = new NewsDetailApi(DETAIL_NEWS_URL);
    const DETAIL_NEWS = api.getSendRequestAjaxData();

    for (let i = 0; store.feed.length; i++) {
      if (store.feed[i].id === Number(DETAIL_NEWS.id)) {
        store.feed[i].isRead = true;
        break;
      }
    }
    this.setTemplateData("comment", this.makeComment(DETAIL_NEWS.comments));
    this.setTemplateData("listPage", String(store.currentPage));
    this.setTemplateData("title", DETAIL_NEWS.title);
    // this.setTemplateData("_content_", DETAIL_NEWS.content);
    this.updateView();
  }

  makeComment(comments: Comments[]): string {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      this.addHtml(`
      <div style="padding-left: ${40 * comment.level}px" class="mb-5">
        <div class="text-slate-300">
          <span>${comment.user}<span> <span>${comment.time_ago}<span>
        </div>
        <div class="pl-4">
          <div>${comment.content}</div>
        </div>
      </div>
    `);

      if (comment.comments.length > 0) {
        this.addHtml(this.makeComment(comment.comments));
      }
    }
    return this.getHtml();
  }
}
// ============================================================

// =====================================================================

const router: Router = new Router();
const newsFeedView = new NewsfeedView("root");
const newsDetailView = new NewsDetailView("root");

router.setDefaultPage(newsFeedView);
router.addRouterPage("/page/", newsFeedView);
router.addRouterPage("/show/", newsDetailView);
router.route();
