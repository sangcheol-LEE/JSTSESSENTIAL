import {
  Store,
  NewsFeed,
  Comments,
  newsDetail,
  newsFeedApi,
  makeNewData,
} from "./RepeatType";

const NEWS_URL: string = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL: string = `https://api.hnpwa.com/v0/item/@hash.json`;
const ROOT: HTMLElement | null = document.getElementById("root");

const store: Store = {
  currentPage: 1,
  feeds: [],
};

const updateView = (html: string) => {
  if (ROOT) {
    ROOT.innerHTML = html;
  } else {
    console.error("최상위 컨테이너가 진행하지 못합니다.");
  }
};

const totalFeed = () => {
  const api = new newsFeedApi(NEWS_URL);
  let NEWS_FEED: NewsFeed[] = store.feeds;
  const newsList = [];

  let template = `
      <div>
         <div class="flex items-center justify-between px-4 py-7 bg-white">
            <h1 class="text-3xl font-bold">Ian's Post</h1>
            <div class="text-2xl flex items-center">
               <a href="#/page/{{__prev__}}" class="mr-5">Prev Page</a>
               <a href="#/page/{{__next__}}">Next Page</a>
            </div>
         </div>
         <div class="p-7 bg-gray-700">
            <ul>
               {{__FEED__}}
            </ul>
         </div>

      </div>
   `;

  if (NEWS_FEED.length === 0) {
    NEWS_FEED = store.feeds = makeNewData(api.getData());
  }

  console.log(NEWS_FEED);

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
         <div  class="px-5 py-5 rounded-xl mb-7 ${
           NEWS_FEED[i].isRead ? "bg-lime-300" : "bg-slate-200"
         } hover:bg-lime-700">
            <div class="flex items-center justify-between">
               <li>
                  <a href="#/show/${
                    NEWS_FEED[i].id
                  }" class="font-bold text-2xl"> ${NEWS_FEED[i].title}</a>
               </li>
               <div class="flex items-center justify-center w-10 h-10 bg-lime-300 rounded-xl text-white ">${
                 NEWS_FEED[i].comments_count
               }</div>
            </div>

            <div class="flex mt-3">
               <div><i class="fas fa-user mr-1"></i>${NEWS_FEED[i].user}</div>
               <div class="mx-3"><i class="fas fa-heart mr-1"></i>${
                 NEWS_FEED[i].points
               }</div>
               <div><i class="fas fa-clock mr-1"></i>${
                 NEWS_FEED[i].time_ago
               }</div>
            </div>
         </div>

      `);
  }
  const minPage = store.currentPage > 1 ? store.currentPage - 1 : 1;
  const maxPage =
    store.currentPage * 10 === NEWS_FEED.length
      ? (store.currentPage * 10) / 10
      : store.currentPage + 1;

  template = template.replace("{{__FEED__}}", newsList.join(""));
  template = template.replace("{{__prev__}}", String(minPage));
  template = template.replace("{{__next__}}", String(maxPage));

  updateView(template);
};

const detailFeed = () => {
  const locate = location?.hash?.substring(7);
  const api = new newsDetail(CONTENT_URL.replace("@hash", locate));
  const ret = api.getData();

  for (let i = 0; i < store.feeds.length; i++) {
    if (store.feeds[i].id === Number(locate)) {
      store.feeds[i].isRead = true;
    }
  }

  let template = `
      <div>
         <div class="flex items-center justify-between px-4 py-7 bg-white">
            <h1 class="text-3xl font-bold">Ian's Post</h1>
            <div class="text-2xl flex items-center">
               <a href="#/page/${store.currentPage}" class="mr-5">X</a>
            </div>
         </div>
         <div class="p-7 bg-gray-700 h-screen" style="height:100%">
            <div class="px-5 py-5 rounded-xl mb-7 bg-slate-100">
               <h1 class="font-bold text-2xl mb-5">${ret.title}</h1>
               {{comments}}
            </div>
         </div>
      </div>
   `;

  const getComment = (comment: Comments[]): string => {
    const commentStr = [];

    for (let i = 0; i < comment.length; i++) {
      const comments: Comments = comment[i];

      commentStr.push(`
            <div class="mt-4" style="padding-left: ${comments.level * 40}px;">
               <div class="text-gray-500">
                  <i class="fa fa-sort-up mr-2"></i>
                  <strong>${comments.user}</strong> ${comments.time_ago}
               </div>
               <p>${comments.content}</p>
            </div>
         `);

      if (comments.comments.length > 0) {
        commentStr.push(getComment(comments.comments));
      }
    }

    return commentStr.join("");
  };

  updateView(template);
};

const router = (): void => {
  const routePath = location.hash;
  if (routePath === "") {
    totalFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substring(7));
    totalFeed();
  } else {
    detailFeed();
  }
};
window.addEventListener("hashchange", router);
router();
