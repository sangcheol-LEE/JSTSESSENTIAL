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
})({"src/core/router.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Router = /*#__PURE__*/function () {
  function Router() {
    _classCallCheck(this, Router);
    window.addEventListener("hashchange", this.route.bind(this));
    this.routeTable = [];
    this.defaultRoute = null;
  }
  _createClass(Router, [{
    key: "setDefaultPage",
    value: function setDefaultPage(page) {
      this.defaultRoute = {
        path: "",
        page: page
      };
    }
  }, {
    key: "addRouterPage",
    value: function addRouterPage(path, page) {
      this.routeTable.push({
        path: path,
        page: page
      });
    }
  }, {
    key: "route",
    value: function route() {
      var routerPath = location.hash;
      console.log("routerPath", routerPath);
      if (routerPath === "" && this.defaultRoute) {
        this.defaultRoute.page.render();
      }
      var _iterator = _createForOfIteratorHelper(this.routeTable),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var routeInfo = _step.value;
          if (routerPath.indexOf(routeInfo.path) >= 0) {
            routeInfo.page.render();
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
  return Router;
}();
exports.default = Router;
},{}],"src/core/api.ts":[function(require,module,exports) {
"use strict";

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsDetailApi = exports.NewsFeedApi = exports.Api = void 0;
var Api = /*#__PURE__*/function () {
  function Api(url) {
    _classCallCheck(this, Api);
    this.url = url;
    this.ajax = new XMLHttpRequest();
  }
  _createClass(Api, [{
    key: "getId",
    value: function getId() {
      var id = window.location.hash.substring(7);
      var getReplaceUrl = this.url.replace("@id", id);
      return getReplaceUrl;
    }
  }, {
    key: "getRequest",
    value: function getRequest() {
      this.ajax.open("GET", this.getId(), false);
      this.ajax.send();
      return JSON.parse(this.ajax.response);
    }
  }]);
  return Api;
}();
exports.Api = Api;
var NewsFeedApi = /*#__PURE__*/function (_Api) {
  _inherits(NewsFeedApi, _Api);
  var _super = _createSuper(NewsFeedApi);
  function NewsFeedApi() {
    _classCallCheck(this, NewsFeedApi);
    return _super.apply(this, arguments);
  }
  _createClass(NewsFeedApi, [{
    key: "getSendRequestAjaxData",
    value: function getSendRequestAjaxData() {
      return this.getRequest();
    }
  }]);
  return NewsFeedApi;
}(Api);
exports.NewsFeedApi = NewsFeedApi;
var NewsDetailApi = /*#__PURE__*/function (_Api2) {
  _inherits(NewsDetailApi, _Api2);
  var _super2 = _createSuper(NewsDetailApi);
  function NewsDetailApi() {
    _classCallCheck(this, NewsDetailApi);
    return _super2.apply(this, arguments);
  }
  _createClass(NewsDetailApi, [{
    key: "getSendRequestAjaxData",
    value: function getSendRequestAjaxData() {
      return this.getRequest();
    }
  }]);
  return NewsDetailApi;
}(Api);
exports.NewsDetailApi = NewsDetailApi;
},{}],"src/config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DETAIL_NEWS_URL = exports.NEWSFEED_MAIN_URL = void 0;
exports.NEWSFEED_MAIN_URL = "https://api.hnpwa.com/v0/news/1.json";
exports.DETAIL_NEWS_URL = "https://api.hnpwa.com/v0/item/@id.json";
},{}],"src/core/view.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.View = void 0;
var View = /*#__PURE__*/function () {
  function View(rootId, template) {
    var _this = this;
    _classCallCheck(this, View);
    this.updateView = function () {
      _this.root.innerHTML = _this.renderTemplate;
      _this.renderTemplate = _this.template;
    };
    var root = document.getElementById(rootId);
    if (!root) {
      throw new Error("최상위 컨테이너가 null입니다. html 및 id를 확인해주세요");
    }
    this.root = root;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }
  _createClass(View, [{
    key: "addHtml",
    value: function addHtml(htmlString) {
      this.htmlList.push(htmlString);
    }
  }, {
    key: "getHtml",
    value: function getHtml() {
      var snapshot = this.htmlList.join("");
      this.clearHtml();
      return snapshot;
    }
  }, {
    key: "setTemplateData",
    value: function setTemplateData(key, value) {
      this.renderTemplate = this.renderTemplate.replace("{{_".concat(key, "_}}"), value);
    }
  }, {
    key: "clearHtml",
    value: function clearHtml() {
      this.htmlList = [];
    }
  }]);
  return View;
}();
exports.View = View;
},{}],"src/page/newsFeed.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var api_1 = require("../core/api");
var config_1 = require("../config");
var view_1 = require("../core/view");
var NewsfeedView = /*#__PURE__*/function (_view_1$View) {
  _inherits(NewsfeedView, _view_1$View);
  var _super = _createSuper(NewsfeedView);
  function NewsfeedView(rootId, store) {
    var _this;
    _classCallCheck(this, NewsfeedView);
    var template = "\n        <div class=\"border border-black w-screen h-screen flex justify-center items-center bg-slate-500 h-auto\">\n          <div class=\"border w-auto m-auto bg-teal-400 rounded-3xl p-5 bg-white h-5/6 overflow-auto\">\n            <h1 class=\"text-5xl text-center mb-4 font-bold\">Daily News!</h1>\n\n            {{_main_section_}}\n\n            <div class=\"flex space-x-96 justify-center text-2xl text-slate-500\">\n              <a class=\"hover:text-3xl hover:text-slate-700 transition-all duration-200\" href=\"#/page/{{_prev_button_}}\">< Prev Page </a>\n              <a class=\"hover:text-3xl hover:text-slate-700 transition-all duration-200\" href=\"#/page/{{_next_button_}}\"> Next Page ></a>\n            </div>\n          </div>\n        </div>\n      ";
    _this = _super.call(this, rootId, template);
    _this.store = store;
    _this.api = new api_1.NewsFeedApi(config_1.NEWSFEED_MAIN_URL);
    if (!_this.store.hasFeed) {
      _this.store.setFeed(_this.api.getSendRequestAjaxData());
    }
    return _this;
  }
  _createClass(NewsfeedView, [{
    key: "render",
    value: function render() {
      this.store.currentPage = Number(location.hash.substring(7) || 1);
      for (var i = (this.store.currentPage - 1) * 10; i < this.store.currentPage * 10; i++) {
        var _this$store$getFeed = this.store.getFeed(i),
          isRead = _this$store$getFeed.isRead,
          id = _this$store$getFeed.id,
          title = _this$store$getFeed.title,
          comments_count = _this$store$getFeed.comments_count,
          user = _this$store$getFeed.user,
          points = _this$store$getFeed.points,
          time_ago = _this$store$getFeed.time_ago;
        this.addHtml("\n           <div class=\"text-2xl p-1 w-auto border p-3 ".concat(isRead ? "bg-slate-500" : "bg-slate-300", " rounded-xl flex items-center flex-col my-5 hover:bg-slate-700 transition duration-500\">\n              <div class=\"flex justify-items-start\">\n                  <a href=\"#/show/").concat(id, "\" class=\"mr-3 text-3xl\">").concat(title, "</a>\n                  <div class=\"p-1 bg-yellow-300 rounded w-10 h-10 flex items-center justify-center\">").concat(comments_count, "</div>\n              </div>\n              <div class=\"flex justify-items-between text-lg\">\n                <div><i class=\"fas fa-user \"></i> ").concat(user, "</div>\n                <div class=\"mx-3\"><i class=\"fas fa-heart \"> ").concat(points, "</i></div>\n                <div><i class=\"fas fa-clock \"> ").concat(time_ago, "</i></div>\n              </div>\n          </div>\n        "));
      }
      this.setTemplateData("main_section", this.getHtml());
      this.setTemplateData("prev_button", String(this.store.prevPage));
      this.setTemplateData("next_button", String(this.store.nextPage));
      this.updateView();
    }
  }]);
  return NewsfeedView;
}(view_1.View);
exports.default = NewsfeedView;
},{"../core/api":"src/core/api.ts","../config":"src/config.ts","../core/view":"src/core/view.ts"}],"src/page/newDetail.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var api_1 = require("../core/api");
var config_1 = require("../config");
var view_1 = require("../core/view");
var NewsDetailView = /*#__PURE__*/function (_view_1$View) {
  _inherits(NewsDetailView, _view_1$View);
  var _super = _createSuper(NewsDetailView);
  function NewsDetailView(rootId, store) {
    var _this;
    _classCallCheck(this, NewsDetailView);
    var template = "\n        <div class=\"border border-black w-screen h-screen flex justify-center items-center bg-slate-500 h-auto\">\n          <div class=\"border w-auto m-auto bg-teal-400 rounded-3xl p-5 bg-white h-5/6 overflow-auto\">\n            <h1 class=\"text-5xl text-center mb-4 font-bold\">{{_title_}}</h1>\n            <p>{{_content_}}</p>\n\n            {{_comment_}}\n\n            <div class=\"flex space-x-96 justify-center text-2xl text-slate-500\">\n              <a href=\"#/page/{{_listPage_}}\">\uBAA9\uB85D\uC73C\uB85C</a>\n            </div>\n          </div/>\n        </div>\n      ";
    _this = _super.call(this, rootId, template);
    _this.store = store;
    return _this;
  }
  _createClass(NewsDetailView, [{
    key: "render",
    value: function render() {
      var api = new api_1.NewsDetailApi(config_1.DETAIL_NEWS_URL);
      var DETAIL_NEWS = api.getSendRequestAjaxData();
      this.store.makeRead(Number(DETAIL_NEWS.id));
      this.setTemplateData("comment", this.makeComment(DETAIL_NEWS.comments));
      this.setTemplateData("listPage", String(this.store.currentPage));
      this.setTemplateData("title", DETAIL_NEWS.title);
      // this.setTemplateData("_content_", DETAIL_NEWS.content);
      this.updateView();
    }
  }, {
    key: "makeComment",
    value: function makeComment(comments) {
      for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        this.addHtml("\n        <div style=\"padding-left: ".concat(40 * comment.level, "px\" class=\"mb-5\">\n          <div class=\"text-slate-300\">\n            <span>").concat(comment.user, "<span> <span>").concat(comment.time_ago, "<span>\n          </div>\n          <div class=\"pl-4\">\n            <div>").concat(comment.content, "</div>\n          </div>\n        </div>\n      "));
        if (comment.comments.length > 0) {
          this.addHtml(this.makeComment(comment.comments));
        }
      }
      return this.getHtml();
    }
  }]);
  return NewsDetailView;
}(view_1.View);
exports.default = NewsDetailView;
},{"../core/api":"src/core/api.ts","../config":"src/config.ts","../core/view":"src/core/view.ts"}],"src/page/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewsDetailView = exports.NewsFeedView = void 0;
var newsFeed_1 = require("./newsFeed");
Object.defineProperty(exports, "NewsFeedView", {
  enumerable: true,
  get: function get() {
    return __importDefault(newsFeed_1).default;
  }
});
var newDetail_1 = require("./newDetail");
Object.defineProperty(exports, "NewsDetailView", {
  enumerable: true,
  get: function get() {
    return __importDefault(newDetail_1).default;
  }
});
},{"./newsFeed":"src/page/newsFeed.ts","./newDetail":"src/page/newDetail.ts"}],"src/store.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Store = /*#__PURE__*/function () {
  function Store() {
    _classCallCheck(this, Store);
    this._currentPage = 1;
    this.feeds = [];
  }
  _createClass(Store, [{
    key: "currentPage",
    get: function get() {
      return this._currentPage;
    },
    set: function set(page) {
      this._currentPage = page;
    }
  }, {
    key: "nextPage",
    get: function get() {
      return this._currentPage + 1;
    }
  }, {
    key: "prevPage",
    get: function get() {
      return this._currentPage > 1 ? this._currentPage - 1 : 1;
    }
  }, {
    key: "numberOfFeed",
    get: function get() {
      return this.feeds.length;
    }
  }, {
    key: "hasFeed",
    get: function get() {
      return this.feeds.length > 0;
    }
  }, {
    key: "getAllFeed",
    value: function getAllFeed() {
      return this.feeds;
    }
  }, {
    key: "getFeed",
    value: function getFeed(position) {
      return this.feeds[position];
    }
  }, {
    key: "setFeed",
    value: function setFeed(feeds) {
      this.feeds = feeds.map(function (item) {
        return Object.assign(Object.assign({}, item), {
          isRead: false
        });
      });
    }
  }, {
    key: "makeRead",
    value: function makeRead(id) {
      var feed = this.feeds.find(function (feed) {
        return feed.id === id;
      });
      if (feed) {
        feed.isRead = true;
      }
    }
  }]);
  return Store;
}();
exports.default = Store;
},{}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Root = void 0;
var router_1 = __importDefault(require("./core/router"));
var page_1 = require("./page"); // 좋은듯
var store_1 = __importDefault(require("./store"));
exports.Root = document.getElementById("root");
var store = new store_1.default();
var router = new router_1.default();
var newsFeedView = new page_1.NewsFeedView("root", store);
var newsDetailView = new page_1.NewsDetailView("root", store);
router.setDefaultPage(newsFeedView);
router.addRouterPage("/page/", newsFeedView);
router.addRouterPage("/show/", newsDetailView);
router.route();
},{"./core/router":"src/core/router.ts","./page":"src/page/index.ts","./store":"src/store.ts"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49637" + '/');
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
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map