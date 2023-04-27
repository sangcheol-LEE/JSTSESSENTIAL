import { RouterInfo } from "../types";
import { View } from "./view";

export default class Router {
  routeTable: RouterInfo[];
  defaultRoute: RouterInfo | null;

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));

    this.routeTable = [];
    this.defaultRoute = null;
  }

  setDefaultPage(page: View): void {
    this.defaultRoute = { path: "", page };
  }
  addRouterPage(path: string, page: View): void {
    this.routeTable.push({ path, page });
  }

  route() {
    const routerPath: string = location.hash;
    console.log("routerPath", routerPath);

    if (routerPath === "" && this.defaultRoute) {
      this.defaultRoute.page.render();
    }

    for (const routeInfo of this.routeTable) {
      if (routerPath.indexOf(routeInfo.path) >= 0) {
        routeInfo.page.render();
        break;
      }
    }
  }
}
