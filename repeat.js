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



const detailFeed = () => {
   const locate = location?.hash?.substring(7);
   const ret = getData(CONTENT_URL.replace("@hash",locate));

   console.log("ret.....",ret)
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
   `
   const getComment = (comment,called = 0) => {
      const commentStr = [];

      for(let i = 0; i < comment.length; i++) {
         commentStr.push(`
            <div class="mt-4" style="padding-left: ${called * 40}px;">
               <div class="text-gray-500">
                  <i class="fa fa-sort-up mr-2"></i>
                  <strong>${comment[i].user}</strong> ${comment[i].time_ago}
               </div>
               <p>${comment[i].content}</p>
            </div>
         `);

         if(comment[i].comments.length > 0) {
            commentStr.push(getComment(comment[i].comments, called + 1));
         }
      }

      return commentStr.join("");
   };
   ROOT.innerHTML = template.replace("{{comments}}", getComment(ret.comments))
}

const totalFeed = () => {
   const NEWS_FEED = getData(NEWS_URL);
   const newsList = [];

   const minPage = store.currentPage > 1 ? store.currentPage - 1 : 1;
   const maxPage = store.currentPage * 10 === NEWS_FEED.length ? store.currentPage * 10 / 10 : store.currentPage + 1;

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

   for(let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
      newsList.push(`
         <div  class="px-5 py-5 rounded-xl mb-7 bg-slate-100">
            <div class="flex items-center justify-between">
               <li>
                  <a href="#/show/${NEWS_FEED[i].id}" class="font-bold text-2xl"> ${NEWS_FEED[i].title}</a>
               </li>
               <div class="flex items-center justify-center w-10 h-10 bg-lime-300 rounded-xl text-white ">${NEWS_FEED[i].comments_count}</div>
            </div>

            <div class="flex mt-3">
               <div><i class="fas fa-user mr-1"></i>${NEWS_FEED[i].user}</div>
               <div class="mx-3"><i class="fas fa-heart mr-1"></i>${NEWS_FEED[i].points}</div>
               <div><i class="fas fa-clock mr-1"></i>${NEWS_FEED[i].time_ago}</div>
            </div>
         </div>

      `)
   };

   template = template.replace("{{__FEED__}}", newsList.join(""));
   template = template.replace("{{__prev__}}", minPage);
   template = template.replace("{{__next__}}",maxPage);

   ROOT.innerHTML = template;
};

const router = () => {
   const routePath = location.hash;
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

