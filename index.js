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

const newsFeed = getData(NEWS_URL);


window.addEventListener("hashchange", () => {
   console.log("hash changed....");
   const heading = document.createElement("h1");
   const hash = location.hash.substring(1);
   const getUrl = CONTENT_URL.replace("@hash", hash);
   const title = getData(getUrl).title;

   heading.innerHTML = title;
   content.appendChild(heading)
});

const ulTag = document.createElement("ul");
for(let i = 0; i < newsFeed.length; i++) {
   const div = document.createElement("div");

   div.innerHTML = `
   <li >
      <a href="#${newsFeed[i].id}">
         ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
   </li>`

   ulTag.appendChild(div.firstElementChild)
}

ROOT.appendChild(ulTag);
ROOT.appendChild(content);