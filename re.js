const Root = document.getElementById("root");
const NEWSFEED_MAIN_URL = "https://api.hnpwa.com/v0/news/1.json";
const DETAIL_NEWS_URL = `https://api.hnpwa.com/v0/item/@id.json`;
const getSendRequestAjaxData = (url) => {
  const id = window.location.hash.slice(7);
  const getReplaceUrl = url.replace("@id", id);
  const ajax = new XMLHttpRequest();

  ajax.open("GET", getReplaceUrl, false);
  ajax.send();

  return JSON.parse(ajax.response);
};

// =====================================================================
// 전역상태

const store = {
  currentPage: 1,
  feed: [],
};

// =====================================================================
// 메인 페이지

const getNewPropertyArray = (arr) => {
  arr.forEach((item) => {
    item.isRead = false;
  });

  return arr;
};

const getMainPage = () => {
  let NEWS_FEED = store.feed;
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
    NEWS_FEED = store.feed = getSendRequestAjaxData(NEWSFEED_MAIN_URL);
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
  template = template.replace("{{_prev_button_}}", PREV_MIN_PAGE);
  template = template.replace("{{_next_button_}}", NEXT_MAX_PAGE);

  Root.innerHTML = template;
};

// =====================================================================

// 디테일 페이지
const getDetailPage = () => {
  const DETAIL_NEWS = getSendRequestAjaxData(DETAIL_NEWS_URL);

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

  const makeComment = (comments, called = 0) => {
    const ret = [];

    for (let i = 0; i < comments.length; i++) {
      ret.push(`
        <div style="padding-left: ${40 * called}px" class="mb-5">
          <div class="text-slate-300">
            <span>${comments[i].user}<span> <span>${comments[i].time_ago}<span>
          </div>
          <div class="pl-4">
            <div>${comments[i].content}</div>
          </div>
        </div>
      `);

      if (comments[i].comments.length > 0) {
        ret.push(makeComment(comments[i].comments, called + 1));
      }
    }
    return ret.join("");
  };

  template = template.replace(
    "{{_comment_}}",
    makeComment(DETAIL_NEWS.comments)
  );
  template = template.replace("{{_listPage_}}", store.currentPage);
  Root.innerHTML = template;
};

// =====================================================================
// 라우터 함수
const router = () => {
  const HASH = window.location.hash;
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
