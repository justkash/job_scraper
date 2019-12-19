// Read data from all endpoints
// Update records in sheet
function updateRecords() {
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
var spreadsheet_utils_1 = __webpack_require__(/*! ./spreadsheet_utils */ "./src/spreadsheet_utils.ts");
var FOLDER_ID = "1YVIMzVwIo19nqsjKfUg8Y03Q2rWpX6lt";
var FILENAME = "Remote Job Listings";
var SHEET_NAME = "Raw Data";
var HEADINGS = [["ID", "Posting Date", "Deadline Date", "Title", "Company", "Company Location", "Compensation (USD/Year)", "Experience Level", "Key Qualifications", "Commitment", "Hours", "Applied Date"]];
function updateRecords() {
    var spreadsheet = spreadsheet_utils_1.findOrCreateFileInFolder(FOLDER_ID, FILENAME);
    if (spreadsheet === null)
        return;
    var sheet = spreadsheet_utils_1.findOrCreateSheetInSpreadsheet(spreadsheet, SHEET_NAME);
    spreadsheet_utils_1.updateSheetHeadings(sheet, HEADINGS);
    // Read data from all endpoints
    // Update records in sheet
}
global.updateRecords = updateRecords;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/spreadsheet_utils.ts":
/*!**********************************!*\
  !*** ./src/spreadsheet_utils.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
function findOrCreateFileInFolder(folderId, filename) {
    var folder = DriveApp.getFolderById(folderId);
    if (folder === null) {
        Logger.log("Error, folder with id: %s was not found.", folderId);
        return null;
    }
    var fileIter = folder.getFilesByName(filename);
    if (!fileIter.hasNext()) {
        var spreadsheet = SpreadsheetApp.create(filename);
        var file_1 = DriveApp.getFileById(spreadsheet.getId());
        folder.addFile(file_1);
        DriveApp.removeFile(file_1);
        return spreadsheet;
    }
    var file = fileIter.next();
    return SpreadsheetApp.open(file);
}
exports.findOrCreateFileInFolder = findOrCreateFileInFolder;
function findOrCreateSheetInSpreadsheet(spreadsheet, sheetName) {
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (sheet !== null) {
        return spreadsheet.getSheetByName(sheetName);
    }
    return spreadsheet.insertSheet(sheetName);
}
exports.findOrCreateSheetInSpreadsheet = findOrCreateSheetInSpreadsheet;
function updateSheetHeadings(sheet, headings) {
    var endColumn = String.fromCharCode('A'.charCodeAt(0) + headings[0].length - 1);
    var headingsRange = sheet.getRange("A1:" + endColumn + "1");
    headingsRange.setValues(headings);
    var headingsStyle = SpreadsheetApp.newTextStyle().setBold(true).build();
    headingsRange.setTextStyle(headingsStyle);
}
exports.updateSheetHeadings = updateSheetHeadings;


/***/ })

/******/ });