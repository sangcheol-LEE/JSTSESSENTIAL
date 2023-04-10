const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@hash.json`;
const ROOT = document.getElementById("root");
const UL = document.createElement("ul");

const getData = (url) => {
   const ajax = new XMLHttpRequest();
   ajax.open("GET",url,false);
   ajax.send();

   return JSON.parse(ajax.response)
}

const NEWS_FEED = getData(NEWS_URL);
ROOT.appendChild(UL)

window.addEventListener("hashchange", () => {
   const locate = location?.hash?.substring(1);
   const ret = getData(CONTENT_URL.replace("@hash",locate));
   const title = document.createElement("h1");

   ROOT.innerHTML = `
      <h1>${ret.title}</h1>
      <div>
         <a href="#">목록으로</a>
      </div>
   `
})

const newsList = [];

newsList.push("<ul>");

for(let i = 0; i < NEWS_FEED.length; i++) {
   newsList.push(`
      <li>
         <a href="#${NEWS_FEED[i].id}">
            ${NEWS_FEED[i].title} (${NEWS_FEED[i].comments_count})
         </a>
      </li>
   `)
}

newsList.push("</ul>");

const ret = newsList.join();
console.log(ret)
ROOT.innerHTML = ret
