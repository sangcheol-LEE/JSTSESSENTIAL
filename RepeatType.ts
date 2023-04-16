export interface Store {
  currentPage: number;
  feeds: NewsFeed[];
}

export type GetData = <AjaxResponse>(url: string) => AjaxResponse;

export interface Data {
  id: number;
  time_ago: string;
  title: string;
  url: string;
  user: string;
  content: string;
}

export interface NewsFeed extends Data {
  comments_count: string;
  isRead?: boolean;
  points: number;
}

export interface NewsDetail extends Data {
  comments: [];
}

export interface Comments extends Data {
  comments: [];
  level: number;
}

class Api {
  url: string;
  ajax: XMLHttpRequest;

  constructor(url: string) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }

  protected getRequestApi<AjaxResponse>(): AjaxResponse {
    this.ajax.open("GET", this.url, false);
    this.ajax.send();

    return JSON.parse(this.ajax.response);
  }
}

export class newsFeedApi extends Api {
  getData(): NewsFeed[] {
    return this.getRequestApi<NewsFeed[]>();
  }
}

export class newsDetail extends Api {
  getData(): NewsDetail {
    return this.getRequestApi<NewsDetail>();
  }
}

export const makeNewData = (feeds: NewsFeed[]) => {
  const ret = feeds.map((item) => {
    item.isRead = false;
    return item;
  });
  return ret;
};

const updateView = (html: string) => {
  if (ROOT) {
    ROOT.innerHTML = html;
  } else {
    console.error("최상위 컨테이너가 진행하지 못합니다.");
  }
};
