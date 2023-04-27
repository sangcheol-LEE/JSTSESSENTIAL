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
})({"re.js":[function(require,module,exports) {
var Root = document.getElementById("root");
var NEWSFEED_MAIN_URL = "https://api.hnpwa.com/v0/news/1.json";
var DETAIL_NEWS_URL = "https://api.hnpwa.com/v0/item/@id.json";
var getSendRequestAjaxData = function getSendRequestAjaxData(url) {
  var id = window.location.hash.slice(7);
  var getReplaceUrl = url.replace("@id", id);
  var ajax = new XMLHttpRequest();
  ajax.open("GET", getReplaceUrl, false);
  ajax.send();
  return JSON.parse(ajax.response);
};

// =====================================================================
// 전역상태

var store = {
  currentPage: 1,
  feed: []
};

// =====================================================================
// 메인 페이지

var getNewPropertyArray = function getNewPropertyArray(arr) {
  arr.forEach(function (item) {
    item.isRead = false;
  });
  return arr;
};
var getMainPage = function getMainPage() {
  var NEWS_FEED = store.feed;
  var NEWS_LIST = [];
  var PREV_MIN_PAGE = store.currentPage > 1 ? store.currentPage - 1 : 1;
  var NEXT_MAX_PAGE = Number(Array.from(String(NEWS_FEED.length))[0]) > store.currentPage ? store.currentPage + 1 : store.currentPage;
  var template = "\n        <div class=\"border border-black w-screen h-screen flex justify-center items-center bg-slate-500 h-auto\">\n          <div class=\"border w-auto m-auto bg-teal-400 rounded-3xl p-5 bg-white h-5/6 overflow-auto\">\n            <h1 class=\"text-5xl text-center mb-4 font-bold\">Daily News!</h1>\n              {{_main_section_}}\n            <div class=\"flex space-x-96 justify-center text-2xl text-slate-500\">\n              <a class=\"hover:text-3xl hover:text-slate-700 transition-all duration-200\" href=\"#/page/{{_prev_button_}}\">< Prev Page </a>\n              <a class=\"hover:text-3xl hover:text-slate-700 transition-all duration-200\" href=\"#/page/{{_next_button_}}\"> Next Page ></a>\n            </div>\n          </div>\n        </div>\n      ";
  if (NEWS_FEED.length === 0) {
    NEWS_FEED = store.feed = getSendRequestAjaxData(NEWSFEED_MAIN_URL);
  }
  for (var i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    NEWS_LIST.push("\n       <div class=\"text-2xl p-1 w-auto border p-3 ".concat(NEWS_FEED[i].isRead ? "bg-slate-500" : "bg-slate-300", " rounded-xl flex items-center flex-col my-5 hover:bg-slate-700 transition duration-500\">\n          <div class=\"flex justify-items-start\">\n              <a href=\"#/show/").concat(NEWS_FEED[i].id, "\" class=\"mr-3 text-3xl\">").concat(NEWS_FEED[i].title, "</a>\n              <div class=\"p-1 bg-yellow-300 rounded w-10 h-10 flex items-center justify-center\">").concat(NEWS_FEED[i].comments_count, "</div>\n          </div>\n          <div class=\"flex justify-items-between text-lg\">\n            <div><i class=\"fas fa-user \"></i> ").concat(NEWS_FEED[i].user, "</div>\n            <div class=\"mx-3\"><i class=\"fas fa-heart \"> ").concat(NEWS_FEED[i].points, "</i></div>\n            <div><i class=\"fas fa-clock \"> ").concat(NEWS_FEED[i].time_ago, "</i></div>\n          </div>\n      </div>\n    "));
  }
  template = template.replace("{{_main_section_}}", NEWS_LIST.join(""));
  template = template.replace("{{_prev_button_}}", PREV_MIN_PAGE);
  template = template.replace("{{_next_button_}}", NEXT_MAX_PAGE);
  Root.innerHTML = template;
};

// =====================================================================

// 디테일 페이지
var getDetailPage = function getDetailPage() {
  var DETAIL_NEWS = getSendRequestAjaxData(DETAIL_NEWS_URL);
  for (var i = 0; store.feed.length; i++) {
    if (store.feed[i].id === Number(DETAIL_NEWS.id)) {
      store.feed[i].isRead = true;
      break;
    }
  }
  var template = "\n    <div class=\"border border-black w-screen h-screen flex justify-center items-center bg-slate-500 h-auto\">\n      <div class=\"border w-auto m-auto bg-teal-400 rounded-3xl p-5 bg-white h-5/6 overflow-auto\">\n        <h1 class=\"text-5xl text-center mb-4 font-bold\">".concat(DETAIL_NEWS.title, "</h1>\n        <p>").concat(DETAIL_NEWS.content, "</p>\n\n        {{_comment_}}\n\n        <div class=\"flex space-x-96 justify-center text-2xl text-slate-500\">\n          <a href=\"#/page/{{_listPage_}}\">\uBAA9\uB85D\uC73C\uB85C</a>\n        </div>\n      </div/>\n    </div>\n  ");
  var makeComment = function makeComment(comments) {
    var called = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var ret = [];
    for (var _i = 0; _i < comments.length; _i++) {
      ret.push("\n        <div style=\"padding-left: ".concat(40 * called, "px\" class=\"mb-5\">\n          <div class=\"text-slate-300\">\n            <span>").concat(comments[_i].user, "<span> <span>").concat(comments[_i].time_ago, "<span>\n          </div>\n          <div class=\"pl-4\">\n            <div>").concat(comments[_i].content, "</div>\n          </div>\n        </div>\n      "));
      if (comments[_i].comments.length > 0) {
        ret.push(makeComment(comments[_i].comments, called + 1));
      }
    }
    return ret.join("");
  };
  template = template.replace("{{_comment_}}", makeComment(DETAIL_NEWS.comments));
  template = template.replace("{{_listPage_}}", store.currentPage);
  Root.innerHTML = template;
};

// =====================================================================
// 라우터 함수
var router = function router() {
  var HASH = window.location.hash;
  if (HASH === "") {
    getMainPage();
  } else if (HASH.indexOf("#/page/") >= 0) {
    store.currentPage = Number(HASH.slice(7));
    getMainPage();
  } else {
    getDetailPage();
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50983" + '/');
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
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","re.js"], null)
//# sourceMappingURL=/re.b0ab10e1.js.map