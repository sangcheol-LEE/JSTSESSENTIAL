let ajax = new XMLHttpRequest();
const ROOT = document.querySelector("#root");
const content = document.createElement("div");

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@hash.json`

const store = {
   currentPage : 1
};

const getData = (URL) => {
   ajax.open("GET", URL, false);
   ajax.send();
   return JSON.parse(ajax.response)
};

const getNewsFeed = () => {
   const newsFeed = getData(NEWS_URL);
   const news_list = [];
   news_list.push("<ul>");
   for(let i = (store.currentPage - 1 ) * 10; i < store.currentPage * 10; i++) {
      news_list.push(`
         <li>
            <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title} (${newsFeed[i].comments_count})</a>
         </li>
      `)
   }
   const lastIndex = newsFeed.length === store.currentPage * 10;
   console.log();
   news_list.push("</ul>");
   news_list.push(`
      <div>
         <a href="#/page/${store.currentPage > 1 ? store.currentPage - 1 : 1}">이전 페이지</a>
         <a href="#/page/${lastIndex ? store.currentPage * 10 / 10 : store.currentPage + 1}">다음 페이지</a>
      </div>
   `)


   const ret = news_list.join("");

   ROOT.innerHTML = ret;
}

const newsDetail = () => {
   const hash = location.hash.substring(7);
   const getUrl = CONTENT_URL.replace("@hash", hash);
   const title = getData(getUrl).title;

   ROOT.innerHTML = `
         <h1>${title}</h1>
         <div>
            <a href="#/page/${store.currentPage}">목록으로</a>
         </div>
   `;
}

const router = () => {
   const routePath = location?.hash;
   console.log("good",routePath.substring(7))
   if(routePath === "") {
      getNewsFeed();
   } else if (routePath.indexOf("#/page/") >= 0) {
      store.currentPage = parseInt(routePath.substring(7));
      getNewsFeed();
   } else {
      newsDetail()
   }
}


window.addEventListener("hashchange",router);

router();