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
// =====================================================================

const Root: HTMLElement | null = document.getElementById("root");
const NEWSFEED_MAIN_URL: string = "https://api.hnpwa.com/v0/news/1.json";
const DETAIL_NEWS_URL: string = `https://api.hnpwa.com/v0/item/@id.json`;

const getSendRequestAjaxData = <AjaxResponse>(url: string): AjaxResponse => {
  const id: string = window.location.hash.slice(7);
  const getReplaceUrl = url.replace("@id", id);
  const ajax: XMLHttpRequest = new XMLHttpRequest();

  ajax.open("GET", getReplaceUrl, false);
  ajax.send();

  return JSON.parse(ajax.response);
};

const updateView = (html: string): void => {
  if (Root) {
    Root.innerHTML = html;
  } else {
    console.log("최상위 컨테이너가 없습니다 html 파일을 확인해주세요");
  }
};
// =====================================================================
// 전역상태

const store: Store = {
  currentPage: 1,
  feed: [],
};

// =====================================================================
// 메인 페이지

const getNewPropertyArray = (arr: NewsFeed[]) => {
  arr.forEach((item: NewsFeed) => {
    item.isRead = false;
  });

  return arr;
};

const getMainPage = () => {
  let NEWS_FEED: NewsFeed[] = store.feed;
  const NEWS_LIST = [];
  const PREV_MIN_PAGE = store.currentPage > 1 ? store.currentPage - 1 : 1;
  const NEXT_MAX_PAGE =
    Number(Array.from(String(NEWS_FEED.length))[0]) > store.currentPage
      ? store.currentPage + 1
      : store.currentPage;

  let template = `
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

  if (NEWS_FEED.length === 0) {
    NEWS_FEED = store.feed = getNewPropertyArray(
      getSendRequestAjaxData<NewsFeed[]>(NEWSFEED_MAIN_URL)
    );
  }

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    NEWS_LIST.push(`
       <div class="text-2xl p-1 w-auto border p-3 ${
         NEWS_FEED[i].isRead ? "bg-slate-500" : "bg-slate-300"
       } rounded-xl flex items-center flex-col my-5 hover:bg-slate-700 transition duration-500">
          <div class="flex justify-items-start">
              <a href="#/show/${NEWS_FEED[i].id}" class="mr-3 text-3xl">${
      NEWS_FEED[i].title
    }</a>
              <div class="p-1 bg-yellow-300 rounded w-10 h-10 flex items-center justify-center">${
                NEWS_FEED[i].comments_count
              }</div>
          </div>
          <div class="flex justify-items-between text-lg">
            <div><i class="fas fa-user "></i> ${NEWS_FEED[i].user}</div>
            <div class="mx-3"><i class="fas fa-heart "> ${
              NEWS_FEED[i].points
            }</i></div>
            <div><i class="fas fa-clock "> ${NEWS_FEED[i].time_ago}</i></div>
          </div>
      </div>
    `);
  }

  template = template.replace("{{_main_section_}}", NEWS_LIST.join(""));
  template = template.replace("{{_prev_button_}}", String(PREV_MIN_PAGE));
  template = template.replace("{{_next_button_}}", String(NEXT_MAX_PAGE));
  updateView(template);
};

// =====================================================================

// 디테일 페이지
const getDetailPage = () => {
  const DETAIL_NEWS = getSendRequestAjaxData<NewsDetail>(DETAIL_NEWS_URL);

  for (let i = 0; store.feed.length; i++) {
    if (store.feed[i].id === Number(DETAIL_NEWS.id)) {
      store.feed[i].isRead = true;
      break;
    }
  }

  let template = `
    <div class="border border-black w-screen h-screen flex justify-center items-center bg-slate-500 h-auto">
      <div class="border w-auto m-auto bg-teal-400 rounded-3xl p-5 bg-white h-5/6 overflow-auto">
        <h1 class="text-5xl text-center mb-4 font-bold">${DETAIL_NEWS.title}</h1>
        <p>${DETAIL_NEWS.content}</p>

        {{_comment_}}

        <div class="flex space-x-96 justify-center text-2xl text-slate-500">
          <a href="#/page/{{_listPage_}}">목록으로</a>
        </div>
      </div/>
    </div>
  `;

  const makeComment = (comments: Comments[]): string => {
    const ret = [];

    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      ret.push(`
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
        ret.push(makeComment(comment.comments));
      }
    }
    return ret.join("");
  };

  template = template.replace(
    "{{_comment_}}",
    makeComment(DETAIL_NEWS.comments)
  );
  template = template.replace("{{_listPage_}}", String(store.currentPage));
  updateView(template);
};

// =====================================================================
// 라우터 함수
const router = (): void => {
  const HASH: string = window.location.hash;
  if (HASH === "") {
    getMainPage();
  } else if (HASH.indexOf("#/page/") >= 0) {
    store.currentPage = Number(HASH.slice(7));
    getMainPage();
  } else {
    getDetailPage();
  }
};

window.addEventListener("hashchange", router);

router();
