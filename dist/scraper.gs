function testIsolateTagsFromTagString() {
}/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/endpoint.ts":
/*!*************************!*\
  !*** ./src/endpoint.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
var utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
var HEADINGS = [["ID", "Posting Date", "Deadline Date", "Title", "Company", "Company Location", "Compensation (USD/Year)", "Experience Level", "Key Qualifications", "Commitment", "Hours", "Applied Date"]];
var HEADINGS_TITLE_INDEX = HEADINGS[0].indexOf("Title");
var TAGS_PATTERN = /[^a-zA-Z]+(Unity|Dependency Injection|Inversion of Control|Full stack|Frontend|HTML|Jade|Pug|JavaScript|Websocket|TypeScript|JQuery|Knockout|Ember|Angular|Protractor|Vue|React|Hooks|Redux|Next|Thunk|Saga|Immutable|Backend|Node|Express|Webpack|npm|Yarn|GraphQL|Jasmine|Jest|Karma|Cypress|Puppeteer|CSS|SASS|LESS|PostCSS|REST|Python|Django|PyPI|Golang|PHP|Ruby|Java|Spring|Maven|C#|.NET|NuGet|Azure|Docker|Kubernetes|RDBMS|SQL|NoSQL|MySQL|Oracle|SaaS|PaaS|GoogleCloud|Google Compute Engine|GCE|GCP|TensorFlow|Linux|IoT|Auth0|Git|Electron|Cordova|Apache|Postgres|gRPC|Istio|Envoy|Canvas|Airtable|Salesforce|Pardot|AJAX|JSON|JSP|Struts|Gradle|Embedded|MQTT|SOA|Github|Trello|Slack|Chef|Ansible|Vagrant|OpenCV|Yocto|iOS|Vitual Reality|Augmented Reality|ARKit)/gi;
var CASE_SENSITIVE_TAGS_PATTERN = /[^a-zA-Z#]+(JS|TS|TDD|SOLID|DI|IoC|Go|C|C\+\+|CI|CD|SVN|PWA|VR|AR)[^a-zA-Z#]+/g;
var TAG_ALIASES = {
    "javascript": "JS",
    "typescript": "TS",
    "dependency injection": "DI",
    "inversion of control": "IoC",
    "golang": "Go",
    "virtual reality": "VR",
    "augmented reality": "AR",
};
function retrieveTagsFromStringWithPattern(tags, str, pattern) {
    var e_1, _a;
    var results = str.matchAll(pattern);
    try {
        for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
            var result = results_1_1.value;
            var val = result[1].toLowerCase();
            if (val in TAG_ALIASES) {
                tags.add(TAG_ALIASES[val].toLowerCase());
            }
            else {
                tags.add(val);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (results_1_1 && !results_1_1.done && (_a = results_1["return"])) _a.call(results_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function retrieveTagsFromString(str) {
    var tags = new utils_1.CustomSet();
    retrieveTagsFromStringWithPattern(tags, str, TAGS_PATTERN);
    retrieveTagsFromStringWithPattern(tags, str, CASE_SENSITIVE_TAGS_PATTERN);
    return tags;
}
exports.retrieveTagsFromString = retrieveTagsFromString;
/*
function isolateTagsFromArray(values: [string]): CustomSet<string> {
    const tags = values.reduce(function(tags, val, index) {
        val[0].split(",").forEach(function(newVal) {
            tags.add(newVal.trim());
        });
        return tags
    }, new CustomSet());

    return tags
}
*/
function isolateTagsFromTagString(str, delim) {
    var tags = new utils_1.CustomSet();
    str.split(delim).forEach(function (tag) {
        tags.add(tag.trim());
    });
    return tags;
}
exports.isolateTagsFromTagString = isolateTagsFromTagString;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {
/*
 *                   main
 *                    |
 *               +----+---
 */
exports.__esModule = true;
var endpoint_1 = __webpack_require__(/*! ./endpoint */ "./src/endpoint.ts");
function testIsolateTagsFromTagString() {
    var tags = endpoint_1.isolateTagsFromTagString("js, js , css, html", ",");
    tags.forEach(function (tag) {
        Logger.log(tag);
    });
}
global.testIsolateTagsFromTagString = testIsolateTagsFromTagString;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var CustomSet = /** @class */ (function () {
    function CustomSet() {
        this.data = new Array();
        this.pointer = 0;
    }
    CustomSet.prototype["delete"] = function (item) {
        var index = this.data.indexOf(item);
        if (index < 0)
            return false;
        this.data = this.data.slice(0, index).concat(this.data.slice(index + 1));
        return true;
    };
    CustomSet.prototype.has = function (item) {
        return this.data.some(function (val) { return val === item; });
    };
    CustomSet.prototype.size = function () {
        return this.data.length;
    };
    CustomSet.prototype.clear = function () {
        this.pointer = 0;
        this.data = new Array();
    };
    CustomSet.prototype.forEach = function (callback) {
        for (var i = 0; i < this.data.length; ++i) {
            callback(this.data[i], i, this);
        }
    };
    CustomSet.prototype.add = function (val) {
        if (this.data.indexOf(val) < 0)
            this.data.push(val);
        return this;
    };
    /* Received the following error from GoogleScript
       ReferenceError: "Symbol" is not defined.
    */
    /*
    public [Symbol.iterator]() {
        let step = -1
        const iterator = {
            next() {
                step++
                if (step === this.data.length) {
                    return {
                        done : true,
                        value : null
                    }
                }
                return {
                    done : false,
                    value : this.data[step]
                }
            }
        }
        
    }*/
    CustomSet.prototype.next = function () {
        if (this.pointer < this.data.length) {
            return {
                done: false,
                value: this.data[this.pointer++]
            };
        }
        else {
            return {
                done: true,
                value: null
            };
        }
    };
    return CustomSet;
}());
exports.CustomSet = CustomSet;


/***/ })

/******/ });