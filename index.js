let ajax = new XMLHttpRequest();
const ROOT = document.querySelector("#root");
const content = document.createElement("div");

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@hash.json`

const getData = (URL) => {
   ajax.open("GET", URL, false);
   ajax.send();
   return JSON.parse(ajax.response)
};

const getNewsFeed = () => {
   const newsFeed = getData(NEWS_URL);
   const news_list = [];
   news_list.push("<ul>");
   for(let i = 0; i < newsFeed.length; i++) {
      news_list.push(`
         <li>
            <a href="#${newsFeed[i].id}">${newsFeed[i].title}</a>
         </li>
      `)
   }

   news_list.push("</ul>");
   const ret = news_list.join("") ;

   ROOT.innerHTML = ret;
}

const newsDetail = () => {
   const heading = document.createElement("h1");
   const hash = location.hash.substring(1);
   const getUrl = CONTENT_URL.replace("@hash", hash);
   const title = getData(getUrl).title;

   ROOT.innerHTML = `
         <h1>${title}</h1>
         <div>
            <a href="#">목록으로</a>
         </div>
   `;
}

const router = () => {
   const routePath = location.hash;

   if(routePath === "") {
      getNewsFeed();
   }else {
      newsDetail()
   }
}


window.addEventListener("hashchange",router );

router()