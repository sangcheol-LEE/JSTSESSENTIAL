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
};

// =====================================================================
// 메인 페이지

const getMainPage = () => {
  const NEWS_FEED = getSendRequestAjaxData(NEWSFEED_MAIN_URL);
  const NEWS_LIST = [];
  const PREV_MIN_PAGE = store.currentPage > 1 ? store.currentPage - 1 : 1;
  const NEXT_MAX_PAGE =
    Number(Array.from(String(NEWS_FEED.length))[0]) > store.currentPage
      ? store.currentPage + 1
      : store.currentPage;
  NEWS_LIST.push("<ul>");
  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    NEWS_LIST.push(`
       <li>
          <a href="#/show/${NEWS_FEED[i].id}">${NEWS_FEED[i].title}</a> (${NEWS_FEED[i].comments_count})
       </li>
      `);
  }
  NEWS_LIST.push("</ul>");
  NEWS_LIST.push(`
     <div>
        <a href="#/page/${PREV_MIN_PAGE}"> Prev Page </a>
        <a href="#/page/${NEXT_MAX_PAGE}"> Next Page </a>
     </div>
    `);
  Root.innerHTML = NEWS_LIST.join("");
};

// =====================================================================

// 디테일 페이지
const getDetailPage = () => {
  const DETAIL_NEWS = getSendRequestAjaxData(DETAIL_NEWS_URL);
  const DETAIL_LIST = [];
  Root.innerHTML = "";

  DETAIL_LIST.push(`
     <h1>${DETAIL_NEWS.title}</h1>
     <p>${DETAIL_NEWS.content}</p>

     <div>
       <a href="#/page/${store.currentPage}">목록으로</a>
     </div>
    `);
  Root.innerHTML = DETAIL_LIST.join(" ");
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
