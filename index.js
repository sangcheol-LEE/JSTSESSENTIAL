let ajax = new XMLHttpRequest();
const ROOT = document.querySelector("#root");
const content = document.createElement("div");

const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = `https://api.hnpwa.com/v0/item/@hash.json`;

const store = {
   currentPage : 1,
   feeds : [],
};

const getData = (URL) => {
   ajax.open("GET", URL, false);
   ajax.send();
   return JSON.parse(ajax.response)
};

const makeFeed = (feeds) => {
   const newFeed = [...feeds].map((item) => {
      item.isRead = false
      return item
   })
   return newFeed
}

const getNewsFeed = () => {
   let newsFeed = store.feeds;
   const news_list = [];

   let template = `
      <div class="bg-gray-600 min-h-screen">
         <div class="bg-white text-xl">
            <div class="mx-auto px-4">
               <div class="flex justify-between items-center py-6">
                  <div class="flex justify-start">
                     <h1 class="font-extrabold">Ian's Post</h1>
                  </div>
                  <div class="items-center justify-end">
                     <a href="#/page/{{__prev_page__}}" class="test-gray-500">
                        Previous
                     </a>
                     <a href="#/page/{{__next_page__}}" class="test-gray-500 ml-4">
                        Next
                     </a>
                  </div>
               </div>
            </div>
         </div>
         <div class="p-4 text-2xl text-gray-700">
            {{__news_feed__}}
         </div>
      </div>
   `;

   if(newsFeed.length === 0) {
      newsFeed = store.feeds = makeFeed(getData(NEWS_URL));
   }


   for(let i = (store.currentPage - 1 ) * 10; i < store.currentPage * 10; i++) {
      news_list.push(`
         <div class="p-6 ${newsFeed[i].isRead ? "bg-slate-400" : "bg-white"} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
            <div class="flex">
               <div class="flex-auto">
                  <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>
               </div>
               <div class="text-center text-sm">
                  <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeed[i].comments_count}</div>
               </div>
            </div>
            <div class="flex mt-3">
               <div class="grid grid-cols-3 text-sm text-gray-500">
                  <div><i class="fas fa-user mr-1"></i>${newsFeed[i].user}</div>
                  <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
                  <div><i class="fas fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
               </div>
            </div>
         </div>
      `)
   };



   const minPage = store.currentPage > 1 ? store.currentPage - 1 : 1;
   const maxPage = store.currentPage * 10 === newsFeed.length ? store.currentPage * 10 / 10 : store.currentPage + 1;
   const ret = news_list.join('');

   template = template.replace("{{__news_feed__}}",ret);
   template = template.replace("{{__prev_page__}}",minPage);
   template = template.replace("{{__next_page__}}",maxPage);

   ROOT.innerHTML = template;
}

const newsDetail = () => {
   const hash = location.hash.substring(7); //id
   const getUrl = CONTENT_URL.replace("@hash", hash);
   const newsContent= getData(getUrl);
   let template = `
      <div class="bg-gray-600 min-h-screen pb-8">
         <div class="bg-white text-xl">
            <div class="mx-auto px-4">
               <div class="flex justify-between items-center py-6">
                  <div class="flex justify-start">
                     <h1 class="font-extrabold">Ians' Post</h1>
                  </div>
                  <div class="items-center justify-end">
                     <a href="#/page/${store.currentPage}" class="text-gray-500">
                        <i class="fa fa-times"></i>
                     </a>
                  </div>
               </div>
            </div>
         </div>
         <div class="h-full border rounded-xl bg-white m-6 p-4">
            <h2 class="font-bold text-3xl">${newsContent.title}</h2>
            <div class="text-gray-400 h-20">
               ${newsContent.content}
            </div>
            {{__comments__}}
         </div>
      </div>
   `;

   for(let i = 0; i < store.feeds.length; i++) {
      console.log(store.feeds[i].id)
      console.log("hash",hash)
      if(store.feeds[i].id === Number(hash)) {
         store.feeds[i].isRead = true;
         break;
      }
   }

   const makeComment = (comments, called = 0) => {
      const commentString = [];


      for(let i = 0; i < comments.length; i++) {
         commentString.push(`
            <div style="padding-left: ${called * 40}px;" class="mt-4">
               <div class="text-gray-400">
                  <i class=""fa fa-sort-up mr-2></i>
                  <strong>${comments[i].user}</strong> ${comments[i].time_ago}
               </div>
               <p class="text-gray-700">${comments[i].content}</p>
            </div>
         `);

         if(comments[i].comments.length > 0) {
            commentString.push(makeComment(comments[i].comments, called + 1));
         }
      }

      return commentString.join("");
   }
   ROOT.innerHTML = template.replace("{{__comments__}}", makeComment(newsContent.comments))
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