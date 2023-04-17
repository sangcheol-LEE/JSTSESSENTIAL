// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return _extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __read = this && this.__read || function (o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
};
var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var ajax = new XMLHttpRequest();
var ROOT = document.getElementById("root");
var content = document.createElement("div");
var NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
var CONTENT_URL = "https://api.hnpwa.com/v0/item/@hash.json";
var store = {
  currentPage: 1,
  feeds: []
};
// class
var Api = /** @class */function () {
  function Api(url) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }
  Api.prototype.getRequest = function () {
    this.ajax.open("GET", this.url, false);
    this.ajax.send();
    return JSON.parse(this.ajax.response);
  };
  return Api;
}();
var newsFeedApi = /** @class */function (_super) {
  __extends(newsFeedApi, _super);
  function newsFeedApi() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  newsFeedApi.prototype.getData = function () {
    return this.getRequest();
  };
  return newsFeedApi;
}(Api);
var newsDetailApi = /** @class */function (_super) {
  __extends(newsDetailApi, _super);
  function newsDetailApi() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  newsDetailApi.prototype.getData = function () {
    return this.getRequest();
  };
  return newsDetailApi;
}(Api);
var View = /** @class */function () {
  function View() {}
  return View;
}();
var NewsFeedView = /** @class */function (_super) {
  __extends(NewsFeedView, _super);
  function NewsFeedView() {
    var _this = this;
    _this.makeFeed = function (feeds) {
      var newFeed = __spreadArray([], __read(feeds), false).map(function (item) {
        item.isRead = false;
        return item;
      });
      return newFeed;
    };
    var api = new newsFeedApi(NEWS_URL);
    var newsFeed = store.feeds;
    var template = "\n      <div class=\"bg-gray-600 min-h-screen\">\n         <div class=\"bg-white text-xl\">\n            <div class=\"mx-auto px-4\">\n               <div class=\"flex justify-between items-center py-6\">\n                  <div class=\"flex justify-start\">\n                     <h1 class=\"font-extrabold\">Ian's Post</h1>\n                  </div>\n                  <div class=\"items-center justify-end\">\n                     <a href=\"#/page/{{__prev_page__}}\" class=\"test-gray-500\">\n                        Previous\n                     </a>\n                     <a href=\"#/page/{{__next_page__}}\" class=\"test-gray-500 ml-4\">\n                        Next\n                     </a>\n                  </div>\n               </div>\n            </div>\n         </div>\n         <div class=\"p-4 text-2xl text-gray-700\">\n            {{__news_feed__}}\n         </div>\n      </div>\n   ";
    if (newsFeed.length === 0) {
      newsFeed = store.feeds = _this.makeFeed(api.getData());
    }
    return _this;
  }
  NewsFeedView.prototype.render = function () {
    var news_list = [];
    for (var i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
      news_list.push("\n         <div class=\"p-6 ".concat(newsFeed[i].isRead ? "bg-slate-400" : "bg-white", " mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100\">\n            <div class=\"flex\">\n               <div class=\"flex-auto\">\n                  <a href=\"#/show/").concat(newsFeed[i].id, "\">").concat(newsFeed[i].title, "</a>\n               </div>\n               <div class=\"text-center text-sm\">\n                  <div class=\"w-10 text-white bg-green-300 rounded-lg px-0 py-2\">").concat(newsFeed[i].comments_count, "</div>\n               </div>\n            </div>\n            <div class=\"flex mt-3\">\n               <div class=\"grid grid-cols-3 text-sm text-gray-500\">\n                  <div><i class=\"fas fa-user mr-1\"></i>").concat(newsFeed[i].user, "</div>\n                  <div><i class=\"fas fa-heart mr-1\"></i>").concat(newsFeed[i].points, "</div>\n                  <div><i class=\"fas fa-clock mr-1\"></i>").concat(newsFeed[i].time_ago, "</div>\n               </div>\n            </div>\n         </div>\n      "));
    }
    var minPage = store.currentPage > 1 ? store.currentPage - 1 : 1;
    var maxPage = store.currentPage * 10 === newsFeed.length ? store.currentPage * 10 / 10 : store.currentPage + 1;
    var ret = news_list.join("");
    template = template.replace("{{__news_feed__}}", ret);
    template = template.replace("{{__prev_page__}}", String(minPage));
    template = template.replace("{{__next_page__}}", String(maxPage));
    updateView(template);
  };
  return NewsFeedView;
}(View);
var NewsDetailView = /** @class */function (_super) {
  __extends(NewsDetailView, _super);
  function NewsDetailView() {
    var _this = this;
    _this.makeComment = function (comments) {
      var commentString = [];
      for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        commentString.push("\n              <div style=\"padding-left: ".concat(comment.level * 40, "px;\" class=\"mt-4\">\n                 <div class=\"text-gray-400\">\n                    <i class=\"\"fa fa-sort-up mr-2></i>\n                    <strong>").concat(comment.user, "</strong> ").concat(comment.time_ago, "\n                 </div>\n                 <p class=\"text-gray-700\">").concat(comment.content, "</p>\n              </div>\n           "));
        if (comment.comments.length > 0) {
          commentString.push(_this.makeComment(comment.comments));
        }
      }
      return commentString.join("");
    };
    var template = "\n            <div class=\"bg-gray-600 min-h-screen pb-8\">\n               <div class=\"bg-white text-xl\">\n                  <div class=\"mx-auto px-4\">\n                     <div class=\"flex justify-between items-center py-6\">\n                        <div class=\"flex justify-start\">\n                           <h1 class=\"font-extrabold\">Ians' Post</h1>\n                        </div>\n                        <div class=\"items-center justify-end\">\n                           <a href=\"#/page/".concat(store.currentPage, "\" class=\"text-gray-500\">\n                              <i class=\"fa fa-times\"></i>\n                           </a>\n                        </div>\n                     </div>\n                  </div>\n               </div>\n               <div class=\"h-full border rounded-xl bg-white m-6 p-4\">\n                  <h2 class=\"font-bold text-3xl\">").concat(newsContent.title, "</h2>\n                  <div class=\"text-gray-400 h-20\">\n                     ").concat(newsContent.content, "\n                  </div>\n                  {{__comments__}}\n               </div>\n            </div>\n         ");
    return _this;
  }
  NewsDetailView.prototype.render = function () {
    var hash = location.hash.substring(7); //id
    var api = new newsDetailApi(CONTENT_URL.replace("@hash", hash));
    var newsContent = api.getData();
    for (var i = 0; i < store.feeds.length; i++) {
      console.log(store.feeds[i].id);
      console.log("hash", hash);
      if (store.feeds[i].id === Number(hash)) {
        store.feeds[i].isRead = true;
        break;
      }
    }
    updateView(template.replace("{{__comments__}}", this.makeComment(newsContent.comments)));
  };
  return NewsDetailView;
}(View);
var updateView = function updateView(html) {
  if (ROOT) {
    ROOT.innerHTML = html;
  } else {
    console.error("최상위 컨테이너가 없어 UI작업을 진행하지 못합니다.");
  }
};
updateView(template);
;
var router = function router() {
  var routePath = location === null || location === void 0 ? void 0 : location.hash;
  console.log("good", routePath.substring(7));
  if (routePath === "") {
    getNewsFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = parseInt(routePath.substring(7));
    getNewsFeed();
  } else {
    newsDetail();
  }
};
window.addEventListener("hashchange", router);
router();
},{}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49391" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/hello-world.77de5100.js.map