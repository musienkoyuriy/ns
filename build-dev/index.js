#!/usr/bin/env node
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const renderApp_1 = __importDefault(__webpack_require__(/*! ./ui/renderApp */ "./src/ui/renderApp.tsx"));
(0, renderApp_1.default)();


/***/ }),

/***/ "./src/lib/services/execute.ts":
/*!*************************************!*\
  !*** ./src/lib/services/execute.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.execute = void 0;
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const execute = (script) => {
    (0, child_process_1.exec)(`npm run ${script}`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        console.log(stdout);
        process.exit(1);
    });
};
exports.execute = execute;


/***/ }),

/***/ "./src/lib/services/parse.ts":
/*!***********************************!*\
  !*** ./src/lib/services/parse.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseScripts = void 0;
const promises_1 = __importDefault(__webpack_require__(/*! fs/promises */ "fs/promises"));
const path_1 = __importDefault(__webpack_require__(/*! path */ "path"));
const packageJSONPath = path_1.default.resolve(__dirname, '..', 'package.json');
const getScriptsFromFile = (file) => Object.keys(file.scripts);
const mapScriptsToSelectList = (scripts) => {
    return scripts.map((script) => ({ label: script, value: script }));
};
const parseScripts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = yield promises_1.default.readFile(packageJSONPath, { encoding: 'utf-8' });
        return mapScriptsToSelectList(getScriptsFromFile(JSON.parse(file)));
    }
    catch (e) {
        console.error(e);
    }
});
exports.parseScripts = parseScripts;


/***/ }),

/***/ "./src/ui/App.tsx":
/*!************************!*\
  !*** ./src/ui/App.tsx ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
const ink_1 = __webpack_require__(/*! ink */ "ink");
const ScriptsList_1 = __importDefault(__webpack_require__(/*! ./components/ScriptsList */ "./src/ui/components/ScriptsList.tsx"));
const App = () => {
    return react_1.default.createElement(ink_1.Box, { flexDirection: 'column' },
        react_1.default.createElement(ScriptsList_1.default, null));
};
exports["default"] = App;


/***/ }),

/***/ "./src/ui/components/ScriptsList.tsx":
/*!*******************************************!*\
  !*** ./src/ui/components/ScriptsList.tsx ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
const ink_select_input_1 = __importDefault(__webpack_require__(/*! ink-select-input */ "ink-select-input"));
const ink_1 = __webpack_require__(/*! ink */ "ink");
const parse_1 = __webpack_require__(/*! @app/lib/services/parse */ "./src/lib/services/parse.ts");
const execute_1 = __webpack_require__(/*! @app/lib/services/execute */ "./src/lib/services/execute.ts");
const ScriptsList = (_) => {
    const [selectedScript, setSelectedScript] = react_1.default.useState('First');
    const [npmScripts, setNpmScripts] = react_1.default.useState([]);
    react_1.default.useEffect(() => {
        (0, parse_1.parseScripts)().then(scripts => setNpmScripts(scripts));
    }, []);
    const handleSelect = item => {
        // setSelectedScript(item.label)
        (0, execute_1.execute)(item.value);
    };
    return react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(ink_1.Text, null, selectedScript),
        react_1.default.createElement(ink_select_input_1.default, { items: npmScripts, onSelect: handleSelect }));
};
exports["default"] = ScriptsList;


/***/ }),

/***/ "./src/ui/renderApp.tsx":
/*!******************************!*\
  !*** ./src/ui/renderApp.tsx ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
const App_1 = __importDefault(__webpack_require__(/*! ./App */ "./src/ui/App.tsx"));
const ink_1 = __webpack_require__(/*! ink */ "ink");
const renderApp = () => {
    (0, ink_1.render)(react_1.default.createElement(App_1.default, null));
};
exports["default"] = renderApp;


/***/ }),

/***/ "ink":
/*!**********************!*\
  !*** external "ink" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("ink");

/***/ }),

/***/ "ink-select-input":
/*!***********************************!*\
  !*** external "ink-select-input" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("ink-select-input");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;