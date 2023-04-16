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
})({"RepeatType.ts":[function(require,module,exports) {
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
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeNewData = exports.newsDetail = exports.newsFeedApi = void 0;
var Api = /** @class */function () {
  function Api(url) {
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }
  Api.prototype.getRequestApi = function () {
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
    return this.getRequestApi();
  };
  return newsFeedApi;
}(Api);
exports.newsFeedApi = newsFeedApi;
var newsDetail = /** @class */function (_super) {
  __extends(newsDetail, _super);
  function newsDetail() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  newsDetail.prototype.getData = function () {
    return this.getRequestApi();
  };
  return newsDetail;
}(Api);
exports.newsDetail = newsDetail;
var makeNewData = function makeNewData(feeds) {
  var ret = feeds.map(function (item) {
    item.isRead = false;
    return item;
  });
  return ret;
};
exports.makeNewData = makeNewData;
var updateView = function updateView(html) {
  if (ROOT) {
    ROOT.innerHTML = html;
  } else {
    console.error("최상위 컨테이너가 진행하지 못합니다.");
  }
};
},{}],"repeat.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var RepeatType_1 = require("./RepeatType");
var NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
var CONTENT_URL = "https://api.hnpwa.com/v0/item/@hash.json";
var ROOT = document.getElementById("root");
var store = {
  currentPage: 1,
  feeds: []
};
var updateView = function updateView(html) {
  if (ROOT) {
    ROOT.innerHTML = html;
  } else {
    console.error("최상위 컨테이너가 진행하지 못합니다.");
  }
};
var totalFeed = function totalFeed() {
  var api = new RepeatType_1.newsFeedApi(NEWS_URL);
  var NEWS_FEED = store.feeds;
  var newsList = [];
  var template = "\n      <div>\n         <div class=\"flex items-center justify-between px-4 py-7 bg-white\">\n            <h1 class=\"text-3xl font-bold\">Ian's Post</h1>\n            <div class=\"text-2xl flex items-center\">\n               <a href=\"#/page/{{__prev__}}\" class=\"mr-5\">Prev Page</a>\n               <a href=\"#/page/{{__next__}}\">Next Page</a>\n            </div>\n         </div>\n         <div class=\"p-7 bg-gray-700\">\n            <ul>\n               {{__FEED__}}\n            </ul>\n         </div>\n\n      </div>\n   ";
  if (NEWS_FEED.length === 0) {
    NEWS_FEED = store.feeds = (0, RepeatType_1.makeNewData)(api.getData());
  }
  console.log(NEWS_FEED);
  for (var i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push("\n         <div  class=\"px-5 py-5 rounded-xl mb-7 ".concat(NEWS_FEED[i].isRead ? "bg-lime-300" : "bg-slate-200", " hover:bg-lime-700\">\n            <div class=\"flex items-center justify-between\">\n               <li>\n                  <a href=\"#/show/").concat(NEWS_FEED[i].id, "\" class=\"font-bold text-2xl\"> ").concat(NEWS_FEED[i].title, "</a>\n               </li>\n               <div class=\"flex items-center justify-center w-10 h-10 bg-lime-300 rounded-xl text-white \">").concat(NEWS_FEED[i].comments_count, "</div>\n            </div>\n\n            <div class=\"flex mt-3\">\n               <div><i class=\"fas fa-user mr-1\"></i>").concat(NEWS_FEED[i].user, "</div>\n               <div class=\"mx-3\"><i class=\"fas fa-heart mr-1\"></i>").concat(NEWS_FEED[i].points, "</div>\n               <div><i class=\"fas fa-clock mr-1\"></i>").concat(NEWS_FEED[i].time_ago, "</div>\n            </div>\n         </div>\n\n      "));
  }
  var minPage = store.currentPage > 1 ? store.currentPage - 1 : 1;
  var maxPage = store.currentPage * 10 === NEWS_FEED.length ? store.currentPage * 10 / 10 : store.currentPage + 1;
  template = template.replace("{{__FEED__}}", newsList.join(""));
  template = template.replace("{{__prev__}}", String(minPage));
  template = template.replace("{{__next__}}", String(maxPage));
  updateView(template);
};
var detailFeed = function detailFeed() {
  var _a;
  var locate = (_a = location === null || location === void 0 ? void 0 : location.hash) === null || _a === void 0 ? void 0 : _a.substring(7);
  var api = new RepeatType_1.newsDetail(CONTENT_URL.replace("@hash", locate));
  var ret = api.getData();
  for (var i = 0; i < store.feeds.length; i++) {
    if (store.feeds[i].id === Number(locate)) {
      store.feeds[i].isRead = true;
    }
  }
  var template = "\n      <div>\n         <div class=\"flex items-center justify-between px-4 py-7 bg-white\">\n            <h1 class=\"text-3xl font-bold\">Ian's Post</h1>\n            <div class=\"text-2xl flex items-center\">\n               <a href=\"#/page/".concat(store.currentPage, "\" class=\"mr-5\">X</a>\n            </div>\n         </div>\n         <div class=\"p-7 bg-gray-700 h-screen\" style=\"height:100%\">\n            <div class=\"px-5 py-5 rounded-xl mb-7 bg-slate-100\">\n               <h1 class=\"font-bold text-2xl mb-5\">").concat(ret.title, "</h1>\n               {{comments}}\n            </div>\n         </div>\n      </div>\n   ");
  var getComment = function getComment(comment) {
    var commentStr = [];
    for (var i = 0; i < comment.length; i++) {
      var comments = comment[i];
      commentStr.push("\n            <div class=\"mt-4\" style=\"padding-left: ".concat(comments.level * 40, "px;\">\n               <div class=\"text-gray-500\">\n                  <i class=\"fa fa-sort-up mr-2\"></i>\n                  <strong>").concat(comments.user, "</strong> ").concat(comments.time_ago, "\n               </div>\n               <p>").concat(comments.content, "</p>\n            </div>\n         "));
      if (comments.comments.length > 0) {
        commentStr.push(getComment(comments.comments));
      }
    }
    return commentStr.join("");
  };
  updateView(template);
};
var router = function router() {
  var routePath = location.hash;
  if (routePath === "") {
    totalFeed();
  } else if (routePath.indexOf("#/page/") >= 0) {
    store.currentPage = Number(routePath.substring(7));
    totalFeed();
  } else {
    detailFeed();
  }
};
window.addEventListener("hashchange", router);
router();
},{"./RepeatType":"RepeatType.ts"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","repeat.ts"], null)
//# sourceMappingURL=/repeat.8c60d7e4.js.map