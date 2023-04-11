const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@hash.json`;
const ROOT = document.getElementById("root");

const store = {
   currentPage : 1,
}


const getData = (url) => {
   const ajax = new XMLHttpRequest();
   ajax.open("GET",url,false);
   ajax.send();

   return JSON.parse(ajax.response)
}

const NEWS_FEED = getData(NEWS_URL);


const detailFeed = () => {
   const locate = location?.hash?.substring(7);
   console.log(locate,"asdasd")
   const ret = getData(CONTENT_URL.replace("@hash",locate));

   ROOT.innerHTML = `
      <h1>${ret.title}</h1>
      <div>
         <a href="#/page/${store.currentPage}">목록으로</a>
      </div>
   `
}

const totalFeed = () => {
   const newsList = [];
   const minPage = store.currentPage > 1 ? store.currentPage - 1 : 1;
   const maxPage = store.currentPage * 10 === NEWS_FEED.length ? store.currentPage * 10 / 10 : store.currentPage + 1;

   newsList.push(`</ul>`);
   newsList.push('<ul>');
   for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
      newsList.push(`
         <li>
            <a href="#/show/${NEWS_FEED[i].id}">
               ${NEWS_FEED[i].title} (${NEWS_FEED[i].comments_count})
            </a>
         </li>
      `)
   };

   newsList.push(`
      <div>
         <a href="#/page/${minPage}">이전 페이지</a>
         <a href="#/page/${maxPage}">다음 페이지</a>
      </div>
   `);
   const ret = newsList.join("");
   ROOT.innerHTML = ret;
};

const router = () => {
   const routePath = location.hash;
   console.log("goood....",routePath.indexOf("#/page/"))
   console.log("router",routePath)
   if(routePath === "") {
      totalFeed();
   }else if(routePath.indexOf("#/page/") >= 0){
      store.currentPage = Number(routePath.substring(7));
      totalFeed();
   }else {
      detailFeed();
   }
}
window.addEventListener("hashchange",router)
router();

