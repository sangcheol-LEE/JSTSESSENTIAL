const ROOT = document.querySelector("#root");
const ulTag = document.createElement("ul");
const content = document.createElement("div");

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@hash.json`

const getData = (URL) => {
   let ajax = new XMLHttpRequest();
   ajax.open("GET", URL, false);
   ajax.send();
   const ret = JSON.parse(ajax.response)
   return ret
};

const data = getData(NEWS_URL);


window.addEventListener("hashchange", () => {
   console.log("hash changed....");
   const heading = document.createElement("h1");
   const hash = location.hash.substring(1);
   const getUrl = CONTENT_URL.replace("@hash", hash);
   const title = getData(getUrl).title;

   heading.innerHTML = title;
   content.appendChild(heading)
});


for(let i = 0; i < data.length; i++) {
   const liTag = document.createElement("li");
   const aTag = document.createElement("a");
   liTag.appendChild(aTag);

   aTag.href = `#${data[i].id}`;
   aTag.innerHTML = `${data[i].title} (${data[i].comments_count})`

   ulTag.appendChild(liTag);
}

ROOT.appendChild(ulTag);
ROOT.appendChild(content);