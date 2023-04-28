import { NewsStore } from "./../types/index";
import { NewsDetailApi } from "../core/api";
import { Comments } from "../types";
import { DETAIL_NEWS_URL } from "../config";
import { View } from "../core/view";

export default class NewsDetailView extends View {
  private store: NewsStore;
  constructor(rootId: string, store: NewsStore) {
    const template = `
        <div class="border border-black w-screen h-screen flex justify-center items-center bg-slate-500 h-auto">
          <div class="border w-auto m-auto bg-teal-400 rounded-3xl p-5 bg-white h-5/6 overflow-auto">
            <h1 class="text-5xl text-center mb-4 font-bold">{{_title_}}</h1>
            <p>{{_content_}}</p>

            {{_comment_}}

            <div class="flex space-x-96 justify-center text-2xl text-slate-500">
              <a href="#/page/{{_listPage_}}">목록으로</a>
            </div>
          </div/>
        </div>
      `;
    super(rootId, template);
    this.store = store;
  }
  render() {
    const api = new NewsDetailApi(DETAIL_NEWS_URL);
    const DETAIL_NEWS = api.getSendRequestAjaxData();
    this.store.makeRead(Number(DETAIL_NEWS.id));
    this.setTemplateData("comment", this.makeComment(DETAIL_NEWS.comments));
    this.setTemplateData("listPage", String(this.store.currentPage));
    this.setTemplateData("title", DETAIL_NEWS.title);
    // this.setTemplateData("_content_", DETAIL_NEWS.content);
    this.updateView();
  }

  makeComment(comments: Comments[]): string {
    for (let i = 0; i < comments.length; i++) {
      const comment = comments[i];
      this.addHtml(`
        <div style="padding-left: ${40 * comment.level}px" class="mb-5">
          <div class="text-slate-300">
            <span>${comment.user}<span> <span>${comment.time_ago}<span>
          </div>
          <div class="pl-4">
            <div>${comment.content}</div>
          </div>
        </div>
      `);

      if (comment.comments.length > 0) {
        this.addHtml(this.makeComment(comment.comments));
      }
    }
    return this.getHtml();
  }
}
