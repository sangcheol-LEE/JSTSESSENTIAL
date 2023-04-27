import { NewsFeedApi } from "../core/api";
import { NewsFeed } from "../types";
import { NEWSFEED_MAIN_URL } from "../config";
import { View } from "../core/view";

export default class NewsfeedView extends View {
  private api: NewsFeedApi;
  private feeds: NewsFeed[];

  constructor(rootId: string) {
    const template: string = `
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
    super(rootId, template);
    this.feeds = window.store.feed;
    this.api = new NewsFeedApi(NEWSFEED_MAIN_URL);

    if (this.feeds.length === 0) {
      this.feeds = window.store.feed = this.api.getSendRequestAjaxData();
      this.getNewPropertyArray();
    }
  }

  private getNewPropertyArray(): void {
    for (let i = 0; i < this.feeds.length; i++) {
      this.feeds[i].isRead = false;
    }
  }

  render(): void {
    window.store.currentPage = Number(location.hash.substring(7) || 1);
    for (
      let i = (window.store.currentPage - 1) * 10;
      i < window.store.currentPage * 10;
      i++
    ) {
      const { isRead, id, title, comments_count, user, points, time_ago } =
        this.feeds[i];
      this.addHtml(`
           <div class="text-2xl p-1 w-auto border p-3 ${
             isRead ? "bg-slate-500" : "bg-slate-300"
           } rounded-xl flex items-center flex-col my-5 hover:bg-slate-700 transition duration-500">
              <div class="flex justify-items-start">
                  <a href="#/show/${id}" class="mr-3 text-3xl">${title}</a>
                  <div class="p-1 bg-yellow-300 rounded w-10 h-10 flex items-center justify-center">${comments_count}</div>
              </div>
              <div class="flex justify-items-between text-lg">
                <div><i class="fas fa-user "></i> ${user}</div>
                <div class="mx-3"><i class="fas fa-heart "> ${points}</i></div>
                <div><i class="fas fa-clock "> ${time_ago}</i></div>
              </div>
          </div>
        `);
    }
    this.setTemplateData("main_section", this.getHtml());
    this.setTemplateData(
      "prev_button",
      String(
        `${window.store.currentPage > 1 ? window.store.currentPage - 1 : 1}`
      )
    );
    this.setTemplateData(
      "next_button",
      String(
        `${
          Number(Array.from(String(this.feeds.length))[0]) >
          window.store.currentPage
            ? window.store.currentPage + 1
            : window.store.currentPage
        }`
      )
    );

    this.updateView();
  }
}
