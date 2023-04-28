import { NewsFeed } from "../types";
import { NewsDetail } from "../types";

export class Api {
  url: string;
  ajax: XMLHttpRequest;
  constructor(url: string) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }

  protected getId() {
    const id: string = window.location.hash.substring(7);
    const getReplaceUrl = this.url.replace("@id", id);
    return getReplaceUrl;
  }

  protected getRequest<AjaxResponse>(): AjaxResponse {
    this.ajax.open("GET", this.getId(), false);
    this.ajax.send();
    return JSON.parse(this.ajax.response);
  }
}

export class NewsFeedApi extends Api {
  getSendRequestAjaxData() {
    return this.getRequest<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  getSendRequestAjaxData() {
    return this.getRequest<NewsDetail>();
  }
}
