import {
  require_react_dom
} from "./chunk-DVUB3IGE.js";
import {
  require_react
} from "./chunk-MWPF4M5S.js";
import {
  __toESM
} from "./chunk-5WRI5ZAA.js";

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/DocSearch.js
var import_react29 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/DocSearchButton.js
var import_react3 = __toESM(require_react());

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/ControlKeyIcon.js
var import_react = __toESM(require_react());
function ControlKeyIcon() {
  return import_react.default.createElement("svg", {
    width: "15",
    height: "15",
    className: "DocSearch-Control-Key-Icon"
  }, import_react.default.createElement("path", {
    d: "M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953",
    strokeWidth: "1.2",
    stroke: "currentColor",
    fill: "none",
    strokeLinecap: "square"
  }));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/SearchIcon.js
var import_react2 = __toESM(require_react());
function SearchIcon() {
  return import_react2.default.createElement("svg", {
    width: "20",
    height: "20",
    className: "DocSearch-Search-Icon",
    viewBox: "0 0 20 20"
  }, import_react2.default.createElement("path", {
    d: "M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z",
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/DocSearchButton.js
var _excluded = ["translations"];
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var ACTION_KEY_DEFAULT = "Ctrl";
var ACTION_KEY_APPLE = "⌘";
function isAppleDevice() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
}
var DocSearchButton = import_react3.default.forwardRef(function(_ref, ref) {
  var _ref$translations = _ref.translations, translations = _ref$translations === void 0 ? {} : _ref$translations, props = _objectWithoutProperties(_ref, _excluded);
  var _translations$buttonT = translations.buttonText, buttonText = _translations$buttonT === void 0 ? "Search" : _translations$buttonT, _translations$buttonA = translations.buttonAriaLabel, buttonAriaLabel = _translations$buttonA === void 0 ? "Search" : _translations$buttonA;
  var _useState = (0, import_react3.useState)(null), _useState2 = _slicedToArray(_useState, 2), key = _useState2[0], setKey = _useState2[1];
  (0, import_react3.useEffect)(function() {
    if (typeof navigator !== "undefined") {
      isAppleDevice() ? setKey(ACTION_KEY_APPLE) : setKey(ACTION_KEY_DEFAULT);
    }
  }, []);
  return import_react3.default.createElement("button", _extends({
    type: "button",
    className: "DocSearch DocSearch-Button",
    "aria-label": buttonAriaLabel
  }, props, {
    ref
  }), import_react3.default.createElement("span", {
    className: "DocSearch-Button-Container"
  }, import_react3.default.createElement(SearchIcon, null), import_react3.default.createElement("span", {
    className: "DocSearch-Button-Placeholder"
  }, buttonText)), import_react3.default.createElement("span", {
    className: "DocSearch-Button-Keys"
  }, key !== null && import_react3.default.createElement(import_react3.default.Fragment, null, import_react3.default.createElement("kbd", {
    className: "DocSearch-Button-Key"
  }, key === ACTION_KEY_DEFAULT ? import_react3.default.createElement(ControlKeyIcon, null) : key), import_react3.default.createElement("kbd", {
    className: "DocSearch-Button-Key"
  }, "K"))));
});

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/createRef.js
function createRef(initialValue) {
  return {
    current: initialValue
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/debounce.js
function debounce(fn, time) {
  var timerId = void 0;
  return function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(function() {
      return fn.apply(void 0, args);
    }, time);
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/decycle.js
function _slicedToArray2(arr, i) {
  return _arrayWithHoles2(arr) || _iterableToArrayLimit2(arr, i) || _unsupportedIterableToArray2(arr, i) || _nonIterableRest2();
}
function _nonIterableRest2() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray2(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray2(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray2(o, minLen);
}
function _arrayLikeToArray2(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit2(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles2(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function decycle(obj) {
  var seen = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  if (!obj || _typeof(obj) !== "object") {
    return obj;
  }
  if (seen.has(obj)) {
    return "[Circular]";
  }
  var newSeen = seen.add(obj);
  if (Array.isArray(obj)) {
    return obj.map(function(x) {
      return decycle(x, newSeen);
    });
  }
  return Object.fromEntries(Object.entries(obj).map(function(_ref) {
    var _ref2 = _slicedToArray2(_ref, 2), key = _ref2[0], value = _ref2[1];
    return [key, decycle(value, newSeen)];
  }));
}

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/flatten.js
function flatten(values) {
  return values.reduce(function(a, b) {
    return a.concat(b);
  }, []);
}

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/generateAutocompleteId.js
var autocompleteId = 0;
function generateAutocompleteId() {
  return "autocomplete-".concat(autocompleteId++);
}

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/getItemsCount.js
function getItemsCount(state) {
  if (state.collections.length === 0) {
    return 0;
  }
  return state.collections.reduce(function(sum, collection) {
    return sum + collection.items.length;
  }, 0);
}

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/invariant.js
function invariant(condition, message) {
  if (false) {
    return;
  }
  if (!condition) {
    throw new Error("[Autocomplete] ".concat(typeof message === "function" ? message() : message));
  }
}

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/isEqual.js
function isPrimitive(obj) {
  return obj !== Object(obj);
}
function isEqual(first, second) {
  if (first === second) {
    return true;
  }
  if (isPrimitive(first) || isPrimitive(second) || typeof first === "function" || typeof second === "function") {
    return first === second;
  }
  if (Object.keys(first).length !== Object.keys(second).length) {
    return false;
  }
  for (var _i = 0, _Object$keys = Object.keys(first); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (!(key in second)) {
      return false;
    }
    if (!isEqual(first[key], second[key])) {
      return false;
    }
  }
  return true;
}

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/noop.js
var noop = function noop2() {
};

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/safelyRunOnBrowser.js
function safelyRunOnBrowser(callback) {
  if (typeof window !== "undefined") {
    return callback({
      window
    });
  }
  return void 0;
}

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/version.js
var version = "1.9.3";

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/userAgents.js
var userAgents = [{
  segment: "autocomplete-core",
  version
}];

// ../../node_modules/.pnpm/@algolia+autocomplete-shared@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0/node_modules/@algolia/autocomplete-shared/dist/esm/warn.js
var warnCache = {
  current: {}
};
function warn(condition, message) {
  if (false) {
    return;
  }
  if (condition) {
    return;
  }
  var sanitizedMessage = message.trim();
  var hasAlreadyPrinted = warnCache.current[sanitizedMessage];
  if (!hasAlreadyPrinted) {
    warnCache.current[sanitizedMessage] = true;
    console.warn("[Autocomplete] ".concat(sanitizedMessage));
  }
}

// ../../node_modules/.pnpm/@algolia+autocomplete-plugin-algolia-insights@1.9.3_@algolia+client-search@5.56.0_algol_cfe8c4c69ce7c8a6db1fc27900bc071c/node_modules/@algolia/autocomplete-plugin-algolia-insights/dist/esm/createClickedEvent.js
function createClickedEvent(_ref) {
  var item = _ref.item, items = _ref.items;
  return {
    index: item.__autocomplete_indexName,
    items: [item],
    positions: [1 + items.findIndex(function(x) {
      return x.objectID === item.objectID;
    })],
    queryID: item.__autocomplete_queryID,
    algoliaSource: ["autocomplete"]
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-plugin-algolia-insights@1.9.3_@algolia+client-search@5.56.0_algol_cfe8c4c69ce7c8a6db1fc27900bc071c/node_modules/@algolia/autocomplete-plugin-algolia-insights/dist/esm/isModernInsightsClient.js
function _slicedToArray3(arr, i) {
  return _arrayWithHoles3(arr) || _iterableToArrayLimit3(arr, i) || _unsupportedIterableToArray3(arr, i) || _nonIterableRest3();
}
function _nonIterableRest3() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray3(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray3(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray3(o, minLen);
}
function _arrayLikeToArray3(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit3(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = false;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = true) ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles3(arr) {
  if (Array.isArray(arr)) return arr;
}
function isModernInsightsClient(client) {
  var _split$map = (client.version || "").split(".").map(Number), _split$map2 = _slicedToArray3(_split$map, 2), major = _split$map2[0], minor = _split$map2[1];
  var v3 = major >= 3;
  var v2_4 = major === 2 && minor >= 4;
  var v1_10 = major === 1 && minor >= 10;
  return v3 || v2_4 || v1_10;
}

// ../../node_modules/.pnpm/@algolia+autocomplete-plugin-algolia-insights@1.9.3_@algolia+client-search@5.56.0_algol_cfe8c4c69ce7c8a6db1fc27900bc071c/node_modules/@algolia/autocomplete-plugin-algolia-insights/dist/esm/createSearchInsightsApi.js
var _excluded2 = ["items"];
var _excluded22 = ["items"];
function _typeof2(obj) {
  "@babel/helpers - typeof";
  return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof2(obj);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray4(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray4(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray4(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray4(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray4(arr);
}
function _arrayLikeToArray4(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _objectWithoutProperties2(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose2(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof2(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof2(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof2(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function chunk(item) {
  var chunkSize = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 20;
  var chunks = [];
  for (var i = 0; i < item.objectIDs.length; i += chunkSize) {
    chunks.push(_objectSpread(_objectSpread({}, item), {}, {
      objectIDs: item.objectIDs.slice(i, i + chunkSize)
    }));
  }
  return chunks;
}
function mapToInsightsParamsApi(params) {
  return params.map(function(_ref) {
    var items = _ref.items, param = _objectWithoutProperties2(_ref, _excluded2);
    return _objectSpread(_objectSpread({}, param), {}, {
      objectIDs: (items === null || items === void 0 ? void 0 : items.map(function(_ref2) {
        var objectID = _ref2.objectID;
        return objectID;
      })) || param.objectIDs
    });
  });
}
function createSearchInsightsApi(searchInsights) {
  var canSendHeaders = isModernInsightsClient(searchInsights);
  function sendToInsights(method, payloads, items) {
    if (canSendHeaders && typeof items !== "undefined") {
      var _items$0$__autocomple = items[0].__autocomplete_algoliaCredentials, appId = _items$0$__autocomple.appId, apiKey = _items$0$__autocomple.apiKey;
      var headers = {
        "X-Algolia-Application-Id": appId,
        "X-Algolia-API-Key": apiKey
      };
      searchInsights.apply(void 0, [method].concat(_toConsumableArray(payloads), [{
        headers
      }]));
    } else {
      searchInsights.apply(void 0, [method].concat(_toConsumableArray(payloads)));
    }
  }
  return {
    /**
     * Initializes Insights with Algolia credentials.
     */
    init: function init(appId, apiKey) {
      searchInsights("init", {
        appId,
        apiKey
      });
    },
    /**
     * Sets the user token to attach to events.
     */
    setUserToken: function setUserToken(userToken) {
      searchInsights("setUserToken", userToken);
    },
    /**
     * Sends click events to capture a query and its clicked items and positions.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/clicked-object-ids-after-search/
     */
    clickedObjectIDsAfterSearch: function clickedObjectIDsAfterSearch() {
      for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {
        params[_key] = arguments[_key];
      }
      if (params.length > 0) {
        sendToInsights("clickedObjectIDsAfterSearch", mapToInsightsParamsApi(params), params[0].items);
      }
    },
    /**
     * Sends click events to capture clicked items.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/clicked-object-ids/
     */
    clickedObjectIDs: function clickedObjectIDs() {
      for (var _len2 = arguments.length, params = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        params[_key2] = arguments[_key2];
      }
      if (params.length > 0) {
        sendToInsights("clickedObjectIDs", mapToInsightsParamsApi(params), params[0].items);
      }
    },
    /**
     * Sends click events to capture the filters a user clicks on.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/clicked-filters/
     */
    clickedFilters: function clickedFilters() {
      for (var _len3 = arguments.length, params = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        params[_key3] = arguments[_key3];
      }
      if (params.length > 0) {
        searchInsights.apply(void 0, ["clickedFilters"].concat(params));
      }
    },
    /**
     * Sends conversion events to capture a query and its clicked items.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/converted-object-ids-after-search/
     */
    convertedObjectIDsAfterSearch: function convertedObjectIDsAfterSearch() {
      for (var _len4 = arguments.length, params = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        params[_key4] = arguments[_key4];
      }
      if (params.length > 0) {
        sendToInsights("convertedObjectIDsAfterSearch", mapToInsightsParamsApi(params), params[0].items);
      }
    },
    /**
     * Sends conversion events to capture clicked items.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/converted-object-ids/
     */
    convertedObjectIDs: function convertedObjectIDs() {
      for (var _len5 = arguments.length, params = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        params[_key5] = arguments[_key5];
      }
      if (params.length > 0) {
        sendToInsights("convertedObjectIDs", mapToInsightsParamsApi(params), params[0].items);
      }
    },
    /**
     * Sends conversion events to capture the filters a user uses when converting.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/converted-filters/
     */
    convertedFilters: function convertedFilters() {
      for (var _len6 = arguments.length, params = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        params[_key6] = arguments[_key6];
      }
      if (params.length > 0) {
        searchInsights.apply(void 0, ["convertedFilters"].concat(params));
      }
    },
    /**
     * Sends view events to capture clicked items.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/viewed-object-ids/
     */
    viewedObjectIDs: function viewedObjectIDs() {
      for (var _len7 = arguments.length, params = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        params[_key7] = arguments[_key7];
      }
      if (params.length > 0) {
        params.reduce(function(acc, _ref3) {
          var items = _ref3.items, param = _objectWithoutProperties2(_ref3, _excluded22);
          return [].concat(_toConsumableArray(acc), _toConsumableArray(chunk(_objectSpread(_objectSpread({}, param), {}, {
            objectIDs: (items === null || items === void 0 ? void 0 : items.map(function(_ref4) {
              var objectID = _ref4.objectID;
              return objectID;
            })) || param.objectIDs
          })).map(function(payload) {
            return {
              items,
              payload
            };
          })));
        }, []).forEach(function(_ref5) {
          var items = _ref5.items, payload = _ref5.payload;
          return sendToInsights("viewedObjectIDs", [payload], items);
        });
      }
    },
    /**
     * Sends view events to capture the filters a user uses when viewing.
     *
     * @link https://www.algolia.com/doc/api-reference/api-methods/viewed-filters/
     */
    viewedFilters: function viewedFilters() {
      for (var _len8 = arguments.length, params = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        params[_key8] = arguments[_key8];
      }
      if (params.length > 0) {
        searchInsights.apply(void 0, ["viewedFilters"].concat(params));
      }
    }
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-plugin-algolia-insights@1.9.3_@algolia+client-search@5.56.0_algol_cfe8c4c69ce7c8a6db1fc27900bc071c/node_modules/@algolia/autocomplete-plugin-algolia-insights/dist/esm/createViewedEvents.js
function createViewedEvents(_ref) {
  var items = _ref.items;
  var itemsByIndexName = items.reduce(function(acc, current) {
    var _acc$current$__autoco;
    acc[current.__autocomplete_indexName] = ((_acc$current$__autoco = acc[current.__autocomplete_indexName]) !== null && _acc$current$__autoco !== void 0 ? _acc$current$__autoco : []).concat(current);
    return acc;
  }, {});
  return Object.keys(itemsByIndexName).map(function(indexName) {
    var items2 = itemsByIndexName[indexName];
    return {
      index: indexName,
      items: items2,
      algoliaSource: ["autocomplete"]
    };
  });
}

// ../../node_modules/.pnpm/@algolia+autocomplete-plugin-algolia-insights@1.9.3_@algolia+client-search@5.56.0_algol_cfe8c4c69ce7c8a6db1fc27900bc071c/node_modules/@algolia/autocomplete-plugin-algolia-insights/dist/esm/isAlgoliaInsightsHit.js
function isAlgoliaInsightsHit(hit) {
  return hit.objectID && hit.__autocomplete_indexName && hit.__autocomplete_queryID;
}

// ../../node_modules/.pnpm/@algolia+autocomplete-plugin-algolia-insights@1.9.3_@algolia+client-search@5.56.0_algol_cfe8c4c69ce7c8a6db1fc27900bc071c/node_modules/@algolia/autocomplete-plugin-algolia-insights/dist/esm/createAlgoliaInsightsPlugin.js
function _typeof3(obj) {
  "@babel/helpers - typeof";
  return _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof3(obj);
}
function _toConsumableArray2(arr) {
  return _arrayWithoutHoles2(arr) || _iterableToArray2(arr) || _unsupportedIterableToArray5(arr) || _nonIterableSpread2();
}
function _nonIterableSpread2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray5(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray5(o, minLen);
}
function _iterableToArray2(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles2(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray5(arr);
}
function _arrayLikeToArray5(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function ownKeys2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
      _defineProperty2(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty2(obj, key, value) {
  key = _toPropertyKey2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey2(arg) {
  var key = _toPrimitive2(arg, "string");
  return _typeof3(key) === "symbol" ? key : String(key);
}
function _toPrimitive2(input, hint) {
  if (_typeof3(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof3(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var VIEW_EVENT_DELAY = 400;
var ALGOLIA_INSIGHTS_VERSION = "2.6.0";
var ALGOLIA_INSIGHTS_SRC = "https://cdn.jsdelivr.net/npm/search-insights@".concat(ALGOLIA_INSIGHTS_VERSION, "/dist/search-insights.min.js");
var sendViewedObjectIDs = debounce(function(_ref) {
  var onItemsChange = _ref.onItemsChange, items = _ref.items, insights = _ref.insights, state = _ref.state;
  onItemsChange({
    insights,
    insightsEvents: createViewedEvents({
      items
    }).map(function(event) {
      return _objectSpread2({
        eventName: "Items Viewed"
      }, event);
    }),
    state
  });
}, VIEW_EVENT_DELAY);
function createAlgoliaInsightsPlugin(options) {
  var _getOptions = getOptions(options), providedInsightsClient = _getOptions.insightsClient, onItemsChange = _getOptions.onItemsChange, onSelectEvent = _getOptions.onSelect, onActiveEvent = _getOptions.onActive;
  var insightsClient = providedInsightsClient;
  if (!providedInsightsClient) {
    safelyRunOnBrowser(function(_ref2) {
      var window2 = _ref2.window;
      var pointer = window2.AlgoliaAnalyticsObject || "aa";
      if (typeof pointer === "string") {
        insightsClient = window2[pointer];
      }
      if (!insightsClient) {
        window2.AlgoliaAnalyticsObject = pointer;
        if (!window2[pointer]) {
          window2[pointer] = function() {
            if (!window2[pointer].queue) {
              window2[pointer].queue = [];
            }
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            window2[pointer].queue.push(args);
          };
        }
        window2[pointer].version = ALGOLIA_INSIGHTS_VERSION;
        insightsClient = window2[pointer];
        loadInsights(window2);
      }
    });
  }
  var insights = createSearchInsightsApi(insightsClient);
  var previousItems = createRef([]);
  var debouncedOnStateChange = debounce(function(_ref3) {
    var state = _ref3.state;
    if (!state.isOpen) {
      return;
    }
    var items = state.collections.reduce(function(acc, current) {
      return [].concat(_toConsumableArray2(acc), _toConsumableArray2(current.items));
    }, []).filter(isAlgoliaInsightsHit);
    if (!isEqual(previousItems.current.map(function(x) {
      return x.objectID;
    }), items.map(function(x) {
      return x.objectID;
    }))) {
      previousItems.current = items;
      if (items.length > 0) {
        sendViewedObjectIDs({
          onItemsChange,
          items,
          insights,
          state
        });
      }
    }
  }, 0);
  return {
    name: "aa.algoliaInsightsPlugin",
    subscribe: function subscribe(_ref4) {
      var setContext = _ref4.setContext, onSelect = _ref4.onSelect, onActive = _ref4.onActive;
      insightsClient("addAlgoliaAgent", "insights-plugin");
      setContext({
        algoliaInsightsPlugin: {
          __algoliaSearchParameters: {
            clickAnalytics: true
          },
          insights
        }
      });
      onSelect(function(_ref5) {
        var item = _ref5.item, state = _ref5.state, event = _ref5.event;
        if (!isAlgoliaInsightsHit(item)) {
          return;
        }
        onSelectEvent({
          state,
          event,
          insights,
          item,
          insightsEvents: [_objectSpread2({
            eventName: "Item Selected"
          }, createClickedEvent({
            item,
            items: previousItems.current
          }))]
        });
      });
      onActive(function(_ref6) {
        var item = _ref6.item, state = _ref6.state, event = _ref6.event;
        if (!isAlgoliaInsightsHit(item)) {
          return;
        }
        onActiveEvent({
          state,
          event,
          insights,
          item,
          insightsEvents: [_objectSpread2({
            eventName: "Item Active"
          }, createClickedEvent({
            item,
            items: previousItems.current
          }))]
        });
      });
    },
    onStateChange: function onStateChange(_ref7) {
      var state = _ref7.state;
      debouncedOnStateChange({
        state
      });
    },
    __autocomplete_pluginOptions: options
  };
}
function getOptions(options) {
  return _objectSpread2({
    onItemsChange: function onItemsChange(_ref8) {
      var insights = _ref8.insights, insightsEvents = _ref8.insightsEvents;
      insights.viewedObjectIDs.apply(insights, _toConsumableArray2(insightsEvents.map(function(event) {
        return _objectSpread2(_objectSpread2({}, event), {}, {
          algoliaSource: [].concat(_toConsumableArray2(event.algoliaSource || []), ["autocomplete-internal"])
        });
      })));
    },
    onSelect: function onSelect(_ref9) {
      var insights = _ref9.insights, insightsEvents = _ref9.insightsEvents;
      insights.clickedObjectIDsAfterSearch.apply(insights, _toConsumableArray2(insightsEvents.map(function(event) {
        return _objectSpread2(_objectSpread2({}, event), {}, {
          algoliaSource: [].concat(_toConsumableArray2(event.algoliaSource || []), ["autocomplete-internal"])
        });
      })));
    },
    onActive: noop
  }, options);
}
function loadInsights(environment) {
  var errorMessage = "[Autocomplete]: Could not load search-insights.js. Please load it manually following https://alg.li/insights-autocomplete";
  try {
    var script = environment.document.createElement("script");
    script.async = true;
    script.src = ALGOLIA_INSIGHTS_SRC;
    script.onerror = function() {
      console.error(errorMessage);
    };
    document.body.appendChild(script);
  } catch (cause) {
    console.error(errorMessage);
  }
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/checkOptions.js
function checkOptions(options) {
  true ? warn(!options.debug, "The `debug` option is meant for development debugging and should not be used in production.") : void 0;
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/utils/createCancelablePromise.js
function createInternalCancelablePromise(promise, initialState) {
  var state = initialState;
  return {
    then: function then(onfulfilled, onrejected) {
      return createInternalCancelablePromise(promise.then(createCallback(onfulfilled, state, promise), createCallback(onrejected, state, promise)), state);
    },
    catch: function _catch(onrejected) {
      return createInternalCancelablePromise(promise.catch(createCallback(onrejected, state, promise)), state);
    },
    finally: function _finally(onfinally) {
      if (onfinally) {
        state.onCancelList.push(onfinally);
      }
      return createInternalCancelablePromise(promise.finally(createCallback(onfinally && function() {
        state.onCancelList = [];
        return onfinally();
      }, state, promise)), state);
    },
    cancel: function cancel() {
      state.isCanceled = true;
      var callbacks = state.onCancelList;
      state.onCancelList = [];
      callbacks.forEach(function(callback) {
        callback();
      });
    },
    isCanceled: function isCanceled() {
      return state.isCanceled === true;
    }
  };
}
function createCancelablePromise(executor) {
  return createInternalCancelablePromise(new Promise(function(resolve2, reject) {
    return executor(resolve2, reject);
  }), {
    isCanceled: false,
    onCancelList: []
  });
}
createCancelablePromise.resolve = function(value) {
  return cancelable(Promise.resolve(value));
};
createCancelablePromise.reject = function(reason) {
  return cancelable(Promise.reject(reason));
};
function cancelable(promise) {
  return createInternalCancelablePromise(promise, {
    isCanceled: false,
    onCancelList: []
  });
}
function createCallback(onResult, state, fallback) {
  if (!onResult) {
    return fallback;
  }
  return function callback(arg) {
    if (state.isCanceled) {
      return arg;
    }
    return onResult(arg);
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/utils/createCancelablePromiseList.js
function createCancelablePromiseList() {
  var list = [];
  return {
    add: function add(cancelablePromise) {
      list.push(cancelablePromise);
      return cancelablePromise.finally(function() {
        list = list.filter(function(item) {
          return item !== cancelablePromise;
        });
      });
    },
    cancelAll: function cancelAll() {
      list.forEach(function(promise) {
        return promise.cancel();
      });
    },
    isEmpty: function isEmpty() {
      return list.length === 0;
    }
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/utils/createConcurrentSafePromise.js
function createConcurrentSafePromise() {
  var basePromiseId = -1;
  var latestResolvedId = -1;
  var latestResolvedValue = void 0;
  return function runConcurrentSafePromise2(promise) {
    basePromiseId++;
    var currentPromiseId = basePromiseId;
    return Promise.resolve(promise).then(function(x) {
      if (latestResolvedValue && currentPromiseId < latestResolvedId) {
        return latestResolvedValue;
      }
      latestResolvedId = currentPromiseId;
      latestResolvedValue = x;
      return x;
    });
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/utils/getNextActiveItemId.js
function getNextActiveItemId(moveAmount, baseIndex, itemCount, defaultActiveItemId) {
  if (!itemCount) {
    return null;
  }
  if (moveAmount < 0 && (baseIndex === null || defaultActiveItemId !== null && baseIndex === 0)) {
    return itemCount + moveAmount;
  }
  var numericIndex = (baseIndex === null ? -1 : baseIndex) + moveAmount;
  if (numericIndex <= -1 || numericIndex >= itemCount) {
    return defaultActiveItemId === null ? null : 0;
  }
  return numericIndex;
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/utils/getNormalizedSources.js
function ownKeys3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread3(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys3(Object(source), true).forEach(function(key) {
      _defineProperty3(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys3(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty3(obj, key, value) {
  key = _toPropertyKey3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey3(arg) {
  var key = _toPrimitive3(arg, "string");
  return _typeof4(key) === "symbol" ? key : String(key);
}
function _toPrimitive3(input, hint) {
  if (_typeof4(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof4(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _typeof4(obj) {
  "@babel/helpers - typeof";
  return _typeof4 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof4(obj);
}
function getNormalizedSources(getSources, params) {
  var seenSourceIds = [];
  return Promise.resolve(getSources(params)).then(function(sources) {
    invariant(Array.isArray(sources), function() {
      return "The `getSources` function must return an array of sources but returned type ".concat(JSON.stringify(_typeof4(sources)), ":\n\n").concat(JSON.stringify(decycle(sources), null, 2));
    });
    return Promise.all(sources.filter(function(maybeSource) {
      return Boolean(maybeSource);
    }).map(function(source) {
      invariant(typeof source.sourceId === "string", "A source must provide a `sourceId` string.");
      if (seenSourceIds.includes(source.sourceId)) {
        throw new Error("[Autocomplete] The `sourceId` ".concat(JSON.stringify(source.sourceId), " is not unique."));
      }
      seenSourceIds.push(source.sourceId);
      var defaultSource = {
        getItemInputValue: function getItemInputValue(_ref) {
          var state = _ref.state;
          return state.query;
        },
        getItemUrl: function getItemUrl() {
          return void 0;
        },
        onSelect: function onSelect(_ref2) {
          var setIsOpen = _ref2.setIsOpen;
          setIsOpen(false);
        },
        onActive: noop,
        onResolve: noop
      };
      Object.keys(defaultSource).forEach(function(key) {
        defaultSource[key].__default = true;
      });
      var normalizedSource = _objectSpread3(_objectSpread3({}, defaultSource), source);
      return Promise.resolve(normalizedSource);
    }));
  });
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/utils/getActiveItem.js
function getCollectionFromActiveItemId(state) {
  var accumulatedCollectionsCount = state.collections.map(function(collections) {
    return collections.items.length;
  }).reduce(function(acc, collectionsCount, index) {
    var previousValue = acc[index - 1] || 0;
    var nextValue = previousValue + collectionsCount;
    acc.push(nextValue);
    return acc;
  }, []);
  var collectionIndex = accumulatedCollectionsCount.reduce(function(acc, current) {
    if (current <= state.activeItemId) {
      return acc + 1;
    }
    return acc;
  }, 0);
  return state.collections[collectionIndex];
}
function getRelativeActiveItemId(_ref) {
  var state = _ref.state, collection = _ref.collection;
  var isOffsetFound = false;
  var counter = 0;
  var previousItemsOffset = 0;
  while (isOffsetFound === false) {
    var currentCollection = state.collections[counter];
    if (currentCollection === collection) {
      isOffsetFound = true;
      break;
    }
    previousItemsOffset += currentCollection.items.length;
    counter++;
  }
  return state.activeItemId - previousItemsOffset;
}
function getActiveItem(state) {
  var collection = getCollectionFromActiveItemId(state);
  if (!collection) {
    return null;
  }
  var item = collection.items[getRelativeActiveItemId({
    state,
    collection
  })];
  var source = collection.source;
  var itemInputValue = source.getItemInputValue({
    item,
    state
  });
  var itemUrl = source.getItemUrl({
    item,
    state
  });
  return {
    item,
    itemInputValue,
    itemUrl,
    source
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/utils/isOrContainsNode.js
function isOrContainsNode(parent, child) {
  return parent === child || parent.contains(child);
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/utils/isSamsung.js
var regex = /((gt|sm)-|galaxy nexus)|samsung[- ]|samsungbrowser/i;
function isSamsung(userAgent) {
  return Boolean(userAgent && userAgent.match(regex));
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/utils/mapToAlgoliaResponse.js
function mapToAlgoliaResponse(rawResults) {
  return {
    results: rawResults,
    hits: rawResults.map(function(result) {
      return result.hits;
    }).filter(Boolean),
    facetHits: rawResults.map(function(result) {
      var _facetHits;
      return (_facetHits = result.facetHits) === null || _facetHits === void 0 ? void 0 : _facetHits.map(function(facetHit) {
        return {
          label: facetHit.value,
          count: facetHit.count,
          _highlightResult: {
            label: {
              value: facetHit.highlighted
            }
          }
        };
      });
    }).filter(Boolean)
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/createStore.js
function _typeof5(obj) {
  "@babel/helpers - typeof";
  return _typeof5 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof5(obj);
}
function ownKeys4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread4(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys4(Object(source), true).forEach(function(key) {
      _defineProperty4(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys4(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty4(obj, key, value) {
  key = _toPropertyKey4(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey4(arg) {
  var key = _toPrimitive4(arg, "string");
  return _typeof5(key) === "symbol" ? key : String(key);
}
function _toPrimitive4(input, hint) {
  if (_typeof5(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof5(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function createStore(reducer, props, onStoreStateChange) {
  var state = props.initialState;
  return {
    getState: function getState() {
      return state;
    },
    dispatch: function dispatch(action, payload) {
      var prevState = _objectSpread4({}, state);
      state = reducer(state, {
        type: action,
        props,
        payload
      });
      onStoreStateChange({
        state,
        prevState
      });
    },
    pendingRequests: createCancelablePromiseList()
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/getAutocompleteSetters.js
function _typeof6(obj) {
  "@babel/helpers - typeof";
  return _typeof6 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof6(obj);
}
function ownKeys5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread5(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys5(Object(source), true).forEach(function(key) {
      _defineProperty5(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys5(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty5(obj, key, value) {
  key = _toPropertyKey5(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey5(arg) {
  var key = _toPrimitive5(arg, "string");
  return _typeof6(key) === "symbol" ? key : String(key);
}
function _toPrimitive5(input, hint) {
  if (_typeof6(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof6(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function getAutocompleteSetters(_ref) {
  var store = _ref.store;
  var setActiveItemId = function setActiveItemId2(value) {
    store.dispatch("setActiveItemId", value);
  };
  var setQuery = function setQuery2(value) {
    store.dispatch("setQuery", value);
  };
  var setCollections = function setCollections2(rawValue) {
    var baseItemId = 0;
    var value = rawValue.map(function(collection) {
      return _objectSpread5(_objectSpread5({}, collection), {}, {
        // We flatten the stored items to support calling `getAlgoliaResults`
        // from the source itself.
        items: flatten(collection.items).map(function(item) {
          return _objectSpread5(_objectSpread5({}, item), {}, {
            __autocomplete_id: baseItemId++
          });
        })
      });
    });
    store.dispatch("setCollections", value);
  };
  var setIsOpen = function setIsOpen2(value) {
    store.dispatch("setIsOpen", value);
  };
  var setStatus = function setStatus2(value) {
    store.dispatch("setStatus", value);
  };
  var setContext = function setContext2(value) {
    store.dispatch("setContext", value);
  };
  return {
    setActiveItemId,
    setQuery,
    setCollections,
    setIsOpen,
    setStatus,
    setContext
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/getDefaultProps.js
function _typeof7(obj) {
  "@babel/helpers - typeof";
  return _typeof7 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof7(obj);
}
function _toConsumableArray3(arr) {
  return _arrayWithoutHoles3(arr) || _iterableToArray3(arr) || _unsupportedIterableToArray6(arr) || _nonIterableSpread3();
}
function _nonIterableSpread3() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray6(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray6(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray6(o, minLen);
}
function _iterableToArray3(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles3(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray6(arr);
}
function _arrayLikeToArray6(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function ownKeys6(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread6(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys6(Object(source), true).forEach(function(key) {
      _defineProperty6(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys6(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty6(obj, key, value) {
  key = _toPropertyKey6(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey6(arg) {
  var key = _toPrimitive6(arg, "string");
  return _typeof7(key) === "symbol" ? key : String(key);
}
function _toPrimitive6(input, hint) {
  if (_typeof7(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof7(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function getDefaultProps(props, pluginSubscribers) {
  var _props$id;
  var environment = typeof window !== "undefined" ? window : {};
  var plugins = props.plugins || [];
  return _objectSpread6(_objectSpread6({
    debug: false,
    openOnFocus: false,
    placeholder: "",
    autoFocus: false,
    defaultActiveItemId: null,
    stallThreshold: 300,
    insights: false,
    environment,
    shouldPanelOpen: function shouldPanelOpen(_ref) {
      var state = _ref.state;
      return getItemsCount(state) > 0;
    },
    reshape: function reshape2(_ref2) {
      var sources = _ref2.sources;
      return sources;
    }
  }, props), {}, {
    // Since `generateAutocompleteId` triggers a side effect (it increments
    // an internal counter), we don't want to execute it if unnecessary.
    id: (_props$id = props.id) !== null && _props$id !== void 0 ? _props$id : generateAutocompleteId(),
    plugins,
    // The following props need to be deeply defaulted.
    initialState: _objectSpread6({
      activeItemId: null,
      query: "",
      completion: null,
      collections: [],
      isOpen: false,
      status: "idle",
      context: {}
    }, props.initialState),
    onStateChange: function onStateChange(params) {
      var _props$onStateChange;
      (_props$onStateChange = props.onStateChange) === null || _props$onStateChange === void 0 ? void 0 : _props$onStateChange.call(props, params);
      plugins.forEach(function(x) {
        var _x$onStateChange;
        return (_x$onStateChange = x.onStateChange) === null || _x$onStateChange === void 0 ? void 0 : _x$onStateChange.call(x, params);
      });
    },
    onSubmit: function onSubmit(params) {
      var _props$onSubmit;
      (_props$onSubmit = props.onSubmit) === null || _props$onSubmit === void 0 ? void 0 : _props$onSubmit.call(props, params);
      plugins.forEach(function(x) {
        var _x$onSubmit;
        return (_x$onSubmit = x.onSubmit) === null || _x$onSubmit === void 0 ? void 0 : _x$onSubmit.call(x, params);
      });
    },
    onReset: function onReset(params) {
      var _props$onReset;
      (_props$onReset = props.onReset) === null || _props$onReset === void 0 ? void 0 : _props$onReset.call(props, params);
      plugins.forEach(function(x) {
        var _x$onReset;
        return (_x$onReset = x.onReset) === null || _x$onReset === void 0 ? void 0 : _x$onReset.call(x, params);
      });
    },
    getSources: function getSources(params) {
      return Promise.all([].concat(_toConsumableArray3(plugins.map(function(plugin) {
        return plugin.getSources;
      })), [props.getSources]).filter(Boolean).map(function(getSources2) {
        return getNormalizedSources(getSources2, params);
      })).then(function(nested) {
        return flatten(nested);
      }).then(function(sources) {
        return sources.map(function(source) {
          return _objectSpread6(_objectSpread6({}, source), {}, {
            onSelect: function onSelect(params2) {
              source.onSelect(params2);
              pluginSubscribers.forEach(function(x) {
                var _x$onSelect;
                return (_x$onSelect = x.onSelect) === null || _x$onSelect === void 0 ? void 0 : _x$onSelect.call(x, params2);
              });
            },
            onActive: function onActive(params2) {
              source.onActive(params2);
              pluginSubscribers.forEach(function(x) {
                var _x$onActive;
                return (_x$onActive = x.onActive) === null || _x$onActive === void 0 ? void 0 : _x$onActive.call(x, params2);
              });
            },
            onResolve: function onResolve(params2) {
              source.onResolve(params2);
              pluginSubscribers.forEach(function(x) {
                var _x$onResolve;
                return (_x$onResolve = x.onResolve) === null || _x$onResolve === void 0 ? void 0 : _x$onResolve.call(x, params2);
              });
            }
          });
        });
      });
    },
    navigator: _objectSpread6({
      navigate: function navigate(_ref3) {
        var itemUrl = _ref3.itemUrl;
        environment.location.assign(itemUrl);
      },
      navigateNewTab: function navigateNewTab(_ref4) {
        var itemUrl = _ref4.itemUrl;
        var windowReference = environment.open(itemUrl, "_blank", "noopener");
        windowReference === null || windowReference === void 0 ? void 0 : windowReference.focus();
      },
      navigateNewWindow: function navigateNewWindow(_ref5) {
        var itemUrl = _ref5.itemUrl;
        environment.open(itemUrl, "_blank", "noopener");
      }
    }, props.navigator)
  });
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/reshape.js
function _typeof8(obj) {
  "@babel/helpers - typeof";
  return _typeof8 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof8(obj);
}
function ownKeys7(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread7(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys7(Object(source), true).forEach(function(key) {
      _defineProperty7(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys7(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty7(obj, key, value) {
  key = _toPropertyKey7(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey7(arg) {
  var key = _toPrimitive7(arg, "string");
  return _typeof8(key) === "symbol" ? key : String(key);
}
function _toPrimitive7(input, hint) {
  if (_typeof8(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof8(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function reshape(_ref) {
  var collections = _ref.collections, props = _ref.props, state = _ref.state;
  var originalSourcesBySourceId = collections.reduce(function(acc, collection) {
    return _objectSpread7(_objectSpread7({}, acc), {}, _defineProperty7({}, collection.source.sourceId, _objectSpread7(_objectSpread7({}, collection.source), {}, {
      getItems: function getItems() {
        return flatten(collection.items);
      }
    })));
  }, {});
  var _props$plugins$reduce = props.plugins.reduce(function(acc, plugin) {
    if (plugin.reshape) {
      return plugin.reshape(acc);
    }
    return acc;
  }, {
    sourcesBySourceId: originalSourcesBySourceId,
    state
  }), sourcesBySourceId = _props$plugins$reduce.sourcesBySourceId;
  var reshapeSources = props.reshape({
    sourcesBySourceId,
    sources: Object.values(sourcesBySourceId),
    state
  });
  return flatten(reshapeSources).filter(Boolean).map(function(source) {
    return {
      source,
      items: source.getItems()
    };
  });
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/resolve.js
function _typeof9(obj) {
  "@babel/helpers - typeof";
  return _typeof9 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof9(obj);
}
function ownKeys8(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread8(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys8(Object(source), true).forEach(function(key) {
      _defineProperty8(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys8(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty8(obj, key, value) {
  key = _toPropertyKey8(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey8(arg) {
  var key = _toPrimitive8(arg, "string");
  return _typeof9(key) === "symbol" ? key : String(key);
}
function _toPrimitive8(input, hint) {
  if (_typeof9(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof9(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toConsumableArray4(arr) {
  return _arrayWithoutHoles4(arr) || _iterableToArray4(arr) || _unsupportedIterableToArray7(arr) || _nonIterableSpread4();
}
function _nonIterableSpread4() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray7(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray7(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray7(o, minLen);
}
function _iterableToArray4(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles4(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray7(arr);
}
function _arrayLikeToArray7(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function isDescription(item) {
  return Boolean(item.execute);
}
function isRequesterDescription(description) {
  return Boolean(description === null || description === void 0 ? void 0 : description.execute);
}
function preResolve(itemsOrDescription, sourceId, state) {
  if (isRequesterDescription(itemsOrDescription)) {
    var contextParameters = itemsOrDescription.requesterId === "algolia" ? Object.assign.apply(Object, [{}].concat(_toConsumableArray4(Object.keys(state.context).map(function(key) {
      var _state$context$key;
      return (_state$context$key = state.context[key]) === null || _state$context$key === void 0 ? void 0 : _state$context$key.__algoliaSearchParameters;
    })))) : {};
    return _objectSpread8(_objectSpread8({}, itemsOrDescription), {}, {
      requests: itemsOrDescription.queries.map(function(query) {
        return {
          query: itemsOrDescription.requesterId === "algolia" ? _objectSpread8(_objectSpread8({}, query), {}, {
            params: _objectSpread8(_objectSpread8({}, contextParameters), query.params)
          }) : query,
          sourceId,
          transformResponse: itemsOrDescription.transformResponse
        };
      })
    });
  }
  return {
    items: itemsOrDescription,
    sourceId
  };
}
function resolve(items) {
  var packed = items.reduce(function(acc, current) {
    if (!isDescription(current)) {
      acc.push(current);
      return acc;
    }
    var searchClient = current.searchClient, execute = current.execute, requesterId = current.requesterId, requests = current.requests;
    var container = acc.find(function(item) {
      return isDescription(current) && isDescription(item) && item.searchClient === searchClient && Boolean(requesterId) && item.requesterId === requesterId;
    });
    if (container) {
      var _container$items;
      (_container$items = container.items).push.apply(_container$items, _toConsumableArray4(requests));
    } else {
      var request = {
        execute,
        requesterId,
        items: requests,
        searchClient
      };
      acc.push(request);
    }
    return acc;
  }, []);
  var values = packed.map(function(maybeDescription) {
    if (!isDescription(maybeDescription)) {
      return Promise.resolve(maybeDescription);
    }
    var _ref = maybeDescription, execute = _ref.execute, items2 = _ref.items, searchClient = _ref.searchClient;
    return execute({
      searchClient,
      requests: items2
    });
  });
  return Promise.all(values).then(function(responses) {
    return flatten(responses);
  });
}
function postResolve(responses, sources, store) {
  return sources.map(function(source) {
    var matches = responses.filter(function(response) {
      return response.sourceId === source.sourceId;
    });
    var results = matches.map(function(_ref2) {
      var items2 = _ref2.items;
      return items2;
    });
    var transform = matches[0].transformResponse;
    var items = transform ? transform(mapToAlgoliaResponse(results)) : results;
    source.onResolve({
      source,
      results,
      items,
      state: store.getState()
    });
    invariant(Array.isArray(items), function() {
      return 'The `getItems` function from source "'.concat(source.sourceId, '" must return an array of items but returned type ').concat(JSON.stringify(_typeof9(items)), ":\n\n").concat(JSON.stringify(decycle(items), null, 2), ".\n\nSee: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-getitems");
    });
    invariant(items.every(Boolean), 'The `getItems` function from source "'.concat(source.sourceId, '" must return an array of items but returned ').concat(JSON.stringify(void 0), ".\n\nDid you forget to return items?\n\nSee: https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/sources/#param-getitems"));
    return {
      source,
      items
    };
  });
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/onInput.js
function _typeof10(obj) {
  "@babel/helpers - typeof";
  return _typeof10 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof10(obj);
}
var _excluded3 = ["event", "nextState", "props", "query", "refresh", "store"];
function ownKeys9(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread9(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys9(Object(source), true).forEach(function(key) {
      _defineProperty9(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys9(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty9(obj, key, value) {
  key = _toPropertyKey9(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey9(arg) {
  var key = _toPrimitive9(arg, "string");
  return _typeof10(key) === "symbol" ? key : String(key);
}
function _toPrimitive9(input, hint) {
  if (_typeof10(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof10(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties3(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose3(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose3(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var lastStalledId = null;
var runConcurrentSafePromise = createConcurrentSafePromise();
function onInput(_ref) {
  var event = _ref.event, _ref$nextState = _ref.nextState, nextState = _ref$nextState === void 0 ? {} : _ref$nextState, props = _ref.props, query = _ref.query, refresh = _ref.refresh, store = _ref.store, setters = _objectWithoutProperties3(_ref, _excluded3);
  if (lastStalledId) {
    props.environment.clearTimeout(lastStalledId);
  }
  var setCollections = setters.setCollections, setIsOpen = setters.setIsOpen, setQuery = setters.setQuery, setActiveItemId = setters.setActiveItemId, setStatus = setters.setStatus;
  setQuery(query);
  setActiveItemId(props.defaultActiveItemId);
  if (!query && props.openOnFocus === false) {
    var _nextState$isOpen;
    var collections = store.getState().collections.map(function(collection) {
      return _objectSpread9(_objectSpread9({}, collection), {}, {
        items: []
      });
    });
    setStatus("idle");
    setCollections(collections);
    setIsOpen((_nextState$isOpen = nextState.isOpen) !== null && _nextState$isOpen !== void 0 ? _nextState$isOpen : props.shouldPanelOpen({
      state: store.getState()
    }));
    var _request = cancelable(runConcurrentSafePromise(collections).then(function() {
      return Promise.resolve();
    }));
    return store.pendingRequests.add(_request);
  }
  setStatus("loading");
  lastStalledId = props.environment.setTimeout(function() {
    setStatus("stalled");
  }, props.stallThreshold);
  var request = cancelable(runConcurrentSafePromise(props.getSources(_objectSpread9({
    query,
    refresh,
    state: store.getState()
  }, setters)).then(function(sources) {
    return Promise.all(sources.map(function(source) {
      return Promise.resolve(source.getItems(_objectSpread9({
        query,
        refresh,
        state: store.getState()
      }, setters))).then(function(itemsOrDescription) {
        return preResolve(itemsOrDescription, source.sourceId, store.getState());
      });
    })).then(resolve).then(function(responses) {
      return postResolve(responses, sources, store);
    }).then(function(collections2) {
      return reshape({
        collections: collections2,
        props,
        state: store.getState()
      });
    });
  }))).then(function(collections2) {
    var _nextState$isOpen2;
    setStatus("idle");
    setCollections(collections2);
    var isPanelOpen = props.shouldPanelOpen({
      state: store.getState()
    });
    setIsOpen((_nextState$isOpen2 = nextState.isOpen) !== null && _nextState$isOpen2 !== void 0 ? _nextState$isOpen2 : props.openOnFocus && !query && isPanelOpen || isPanelOpen);
    var highlightedItem = getActiveItem(store.getState());
    if (store.getState().activeItemId !== null && highlightedItem) {
      var item = highlightedItem.item, itemInputValue = highlightedItem.itemInputValue, itemUrl = highlightedItem.itemUrl, source = highlightedItem.source;
      source.onActive(_objectSpread9({
        event,
        item,
        itemInputValue,
        itemUrl,
        refresh,
        source,
        state: store.getState()
      }, setters));
    }
  }).finally(function() {
    setStatus("idle");
    if (lastStalledId) {
      props.environment.clearTimeout(lastStalledId);
    }
  });
  return store.pendingRequests.add(request);
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/onKeyDown.js
function _typeof11(obj) {
  "@babel/helpers - typeof";
  return _typeof11 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof11(obj);
}
var _excluded4 = ["event", "props", "refresh", "store"];
function ownKeys10(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread10(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys10(Object(source), true).forEach(function(key) {
      _defineProperty10(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys10(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty10(obj, key, value) {
  key = _toPropertyKey10(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey10(arg) {
  var key = _toPrimitive10(arg, "string");
  return _typeof11(key) === "symbol" ? key : String(key);
}
function _toPrimitive10(input, hint) {
  if (_typeof11(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof11(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties4(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose4(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose4(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function onKeyDown(_ref) {
  var event = _ref.event, props = _ref.props, refresh = _ref.refresh, store = _ref.store, setters = _objectWithoutProperties4(_ref, _excluded4);
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    var triggerScrollIntoView = function triggerScrollIntoView2() {
      var nodeItem = props.environment.document.getElementById("".concat(props.id, "-item-").concat(store.getState().activeItemId));
      if (nodeItem) {
        if (nodeItem.scrollIntoViewIfNeeded) {
          nodeItem.scrollIntoViewIfNeeded(false);
        } else {
          nodeItem.scrollIntoView(false);
        }
      }
    };
    var triggerOnActive = function triggerOnActive2() {
      var highlightedItem = getActiveItem(store.getState());
      if (store.getState().activeItemId !== null && highlightedItem) {
        var item2 = highlightedItem.item, itemInputValue2 = highlightedItem.itemInputValue, itemUrl2 = highlightedItem.itemUrl, source2 = highlightedItem.source;
        source2.onActive(_objectSpread10({
          event,
          item: item2,
          itemInputValue: itemInputValue2,
          itemUrl: itemUrl2,
          refresh,
          source: source2,
          state: store.getState()
        }, setters));
      }
    };
    event.preventDefault();
    if (store.getState().isOpen === false && (props.openOnFocus || Boolean(store.getState().query))) {
      onInput(_objectSpread10({
        event,
        props,
        query: store.getState().query,
        refresh,
        store
      }, setters)).then(function() {
        store.dispatch(event.key, {
          nextActiveItemId: props.defaultActiveItemId
        });
        triggerOnActive();
        setTimeout(triggerScrollIntoView, 0);
      });
    } else {
      store.dispatch(event.key, {});
      triggerOnActive();
      triggerScrollIntoView();
    }
  } else if (event.key === "Escape") {
    event.preventDefault();
    store.dispatch(event.key, null);
    store.pendingRequests.cancelAll();
  } else if (event.key === "Tab") {
    store.dispatch("blur", null);
    store.pendingRequests.cancelAll();
  } else if (event.key === "Enter") {
    if (store.getState().activeItemId === null || store.getState().collections.every(function(collection) {
      return collection.items.length === 0;
    })) {
      if (!props.debug) {
        store.pendingRequests.cancelAll();
      }
      return;
    }
    event.preventDefault();
    var _ref2 = getActiveItem(store.getState()), item = _ref2.item, itemInputValue = _ref2.itemInputValue, itemUrl = _ref2.itemUrl, source = _ref2.source;
    if (event.metaKey || event.ctrlKey) {
      if (itemUrl !== void 0) {
        source.onSelect(_objectSpread10({
          event,
          item,
          itemInputValue,
          itemUrl,
          refresh,
          source,
          state: store.getState()
        }, setters));
        props.navigator.navigateNewTab({
          itemUrl,
          item,
          state: store.getState()
        });
      }
    } else if (event.shiftKey) {
      if (itemUrl !== void 0) {
        source.onSelect(_objectSpread10({
          event,
          item,
          itemInputValue,
          itemUrl,
          refresh,
          source,
          state: store.getState()
        }, setters));
        props.navigator.navigateNewWindow({
          itemUrl,
          item,
          state: store.getState()
        });
      }
    } else if (event.altKey) {
    } else {
      if (itemUrl !== void 0) {
        source.onSelect(_objectSpread10({
          event,
          item,
          itemInputValue,
          itemUrl,
          refresh,
          source,
          state: store.getState()
        }, setters));
        props.navigator.navigate({
          itemUrl,
          item,
          state: store.getState()
        });
        return;
      }
      onInput(_objectSpread10({
        event,
        nextState: {
          isOpen: false
        },
        props,
        query: itemInputValue,
        refresh,
        store
      }, setters)).then(function() {
        source.onSelect(_objectSpread10({
          event,
          item,
          itemInputValue,
          itemUrl,
          refresh,
          source,
          state: store.getState()
        }, setters));
      });
    }
  }
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/getPropGetters.js
function _typeof12(obj) {
  "@babel/helpers - typeof";
  return _typeof12 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof12(obj);
}
var _excluded5 = ["props", "refresh", "store"];
var _excluded23 = ["inputElement", "formElement", "panelElement"];
var _excluded32 = ["inputElement"];
var _excluded42 = ["inputElement", "maxLength"];
var _excluded52 = ["sourceIndex"];
var _excluded6 = ["sourceIndex"];
var _excluded7 = ["item", "source", "sourceIndex"];
function ownKeys11(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread11(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys11(Object(source), true).forEach(function(key) {
      _defineProperty11(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys11(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty11(obj, key, value) {
  key = _toPropertyKey11(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey11(arg) {
  var key = _toPrimitive11(arg, "string");
  return _typeof12(key) === "symbol" ? key : String(key);
}
function _toPrimitive11(input, hint) {
  if (_typeof12(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof12(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _objectWithoutProperties5(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose5(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose5(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function getPropGetters(_ref) {
  var props = _ref.props, refresh = _ref.refresh, store = _ref.store, setters = _objectWithoutProperties5(_ref, _excluded5);
  var getEnvironmentProps = function getEnvironmentProps2(providedProps) {
    var inputElement = providedProps.inputElement, formElement = providedProps.formElement, panelElement = providedProps.panelElement, rest = _objectWithoutProperties5(providedProps, _excluded23);
    function onMouseDownOrTouchStart(event) {
      var isAutocompleteInteraction = store.getState().isOpen || !store.pendingRequests.isEmpty();
      if (!isAutocompleteInteraction || event.target === inputElement) {
        return;
      }
      var isTargetWithinAutocomplete = [formElement, panelElement].some(function(contextNode) {
        return isOrContainsNode(contextNode, event.target);
      });
      if (isTargetWithinAutocomplete === false) {
        store.dispatch("blur", null);
        if (!props.debug) {
          store.pendingRequests.cancelAll();
        }
      }
    }
    return _objectSpread11({
      // We do not rely on the native `blur` event of the input to close the
      // panel, but rather on a custom `touchstart`/`mousedown` event outside
      // of the autocomplete elements.
      // This ensures we don't mistakenly interpret interactions within the
      // autocomplete (but outside of the input) as a signal to close the panel.
      // For example, clicking reset button causes an input blur, but if
      // `openOnFocus=true`, it shouldn't close the panel.
      // On touch devices, scrolling results (`touchmove`) causes an input blur
      // but shouldn't close the panel.
      onTouchStart: onMouseDownOrTouchStart,
      onMouseDown: onMouseDownOrTouchStart,
      // When scrolling on touch devices (mobiles, tablets, etc.), we want to
      // mimic the native platform behavior where the input is blurred to
      // hide the virtual keyboard. This gives more vertical space to
      // discover all the suggestions showing up in the panel.
      onTouchMove: function onTouchMove(event) {
        if (store.getState().isOpen === false || inputElement !== props.environment.document.activeElement || event.target === inputElement) {
          return;
        }
        inputElement.blur();
      }
    }, rest);
  };
  var getRootProps = function getRootProps2(rest) {
    return _objectSpread11({
      role: "combobox",
      "aria-expanded": store.getState().isOpen,
      "aria-haspopup": "listbox",
      "aria-owns": store.getState().isOpen ? "".concat(props.id, "-list") : void 0,
      "aria-labelledby": "".concat(props.id, "-label")
    }, rest);
  };
  var getFormProps = function getFormProps2(providedProps) {
    var inputElement = providedProps.inputElement, rest = _objectWithoutProperties5(providedProps, _excluded32);
    return _objectSpread11({
      action: "",
      noValidate: true,
      role: "search",
      onSubmit: function onSubmit(event) {
        var _providedProps$inputE;
        event.preventDefault();
        props.onSubmit(_objectSpread11({
          event,
          refresh,
          state: store.getState()
        }, setters));
        store.dispatch("submit", null);
        (_providedProps$inputE = providedProps.inputElement) === null || _providedProps$inputE === void 0 ? void 0 : _providedProps$inputE.blur();
      },
      onReset: function onReset(event) {
        var _providedProps$inputE2;
        event.preventDefault();
        props.onReset(_objectSpread11({
          event,
          refresh,
          state: store.getState()
        }, setters));
        store.dispatch("reset", null);
        (_providedProps$inputE2 = providedProps.inputElement) === null || _providedProps$inputE2 === void 0 ? void 0 : _providedProps$inputE2.focus();
      }
    }, rest);
  };
  var getInputProps = function getInputProps2(providedProps) {
    var _props$environment$na;
    function onFocus(event) {
      if (props.openOnFocus || Boolean(store.getState().query)) {
        onInput(_objectSpread11({
          event,
          props,
          query: store.getState().completion || store.getState().query,
          refresh,
          store
        }, setters));
      }
      store.dispatch("focus", null);
    }
    var _ref2 = providedProps || {}, inputElement = _ref2.inputElement, _ref2$maxLength = _ref2.maxLength, maxLength = _ref2$maxLength === void 0 ? 512 : _ref2$maxLength, rest = _objectWithoutProperties5(_ref2, _excluded42);
    var activeItem = getActiveItem(store.getState());
    var userAgent = ((_props$environment$na = props.environment.navigator) === null || _props$environment$na === void 0 ? void 0 : _props$environment$na.userAgent) || "";
    var shouldFallbackKeyHint = isSamsung(userAgent);
    var enterKeyHint = activeItem !== null && activeItem !== void 0 && activeItem.itemUrl && !shouldFallbackKeyHint ? "go" : "search";
    return _objectSpread11({
      "aria-autocomplete": "both",
      "aria-activedescendant": store.getState().isOpen && store.getState().activeItemId !== null ? "".concat(props.id, "-item-").concat(store.getState().activeItemId) : void 0,
      "aria-controls": store.getState().isOpen ? "".concat(props.id, "-list") : void 0,
      "aria-labelledby": "".concat(props.id, "-label"),
      value: store.getState().completion || store.getState().query,
      id: "".concat(props.id, "-input"),
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      enterKeyHint,
      spellCheck: "false",
      autoFocus: props.autoFocus,
      placeholder: props.placeholder,
      maxLength,
      type: "search",
      onChange: function onChange(event) {
        onInput(_objectSpread11({
          event,
          props,
          query: event.currentTarget.value.slice(0, maxLength),
          refresh,
          store
        }, setters));
      },
      onKeyDown: function onKeyDown2(event) {
        onKeyDown(_objectSpread11({
          event,
          props,
          refresh,
          store
        }, setters));
      },
      onFocus,
      // We don't rely on the `blur` event.
      // See explanation in `onTouchStart`/`onMouseDown`.
      // @MAJOR See if we need to keep this handler.
      onBlur: noop,
      onClick: function onClick(event) {
        if (providedProps.inputElement === props.environment.document.activeElement && !store.getState().isOpen) {
          onFocus(event);
        }
      }
    }, rest);
  };
  var getAutocompleteId = function getAutocompleteId2(instanceId, sourceId) {
    return typeof sourceId !== "undefined" ? "".concat(instanceId, "-").concat(sourceId) : instanceId;
  };
  var getLabelProps = function getLabelProps2(providedProps) {
    var _ref3 = providedProps || {}, sourceIndex = _ref3.sourceIndex, rest = _objectWithoutProperties5(_ref3, _excluded52);
    return _objectSpread11({
      htmlFor: "".concat(getAutocompleteId(props.id, sourceIndex), "-input"),
      id: "".concat(getAutocompleteId(props.id, sourceIndex), "-label")
    }, rest);
  };
  var getListProps = function getListProps2(providedProps) {
    var _ref4 = providedProps || {}, sourceIndex = _ref4.sourceIndex, rest = _objectWithoutProperties5(_ref4, _excluded6);
    return _objectSpread11({
      role: "listbox",
      "aria-labelledby": "".concat(getAutocompleteId(props.id, sourceIndex), "-label"),
      id: "".concat(getAutocompleteId(props.id, sourceIndex), "-list")
    }, rest);
  };
  var getPanelProps = function getPanelProps2(rest) {
    return _objectSpread11({
      onMouseDown: function onMouseDown(event) {
        event.preventDefault();
      },
      onMouseLeave: function onMouseLeave() {
        store.dispatch("mouseleave", null);
      }
    }, rest);
  };
  var getItemProps = function getItemProps2(providedProps) {
    var item = providedProps.item, source = providedProps.source, sourceIndex = providedProps.sourceIndex, rest = _objectWithoutProperties5(providedProps, _excluded7);
    return _objectSpread11({
      id: "".concat(getAutocompleteId(props.id, sourceIndex), "-item-").concat(item.__autocomplete_id),
      role: "option",
      "aria-selected": store.getState().activeItemId === item.__autocomplete_id,
      onMouseMove: function onMouseMove(event) {
        if (item.__autocomplete_id === store.getState().activeItemId) {
          return;
        }
        store.dispatch("mousemove", item.__autocomplete_id);
        var activeItem = getActiveItem(store.getState());
        if (store.getState().activeItemId !== null && activeItem) {
          var _item = activeItem.item, itemInputValue = activeItem.itemInputValue, itemUrl = activeItem.itemUrl, _source = activeItem.source;
          _source.onActive(_objectSpread11({
            event,
            item: _item,
            itemInputValue,
            itemUrl,
            refresh,
            source: _source,
            state: store.getState()
          }, setters));
        }
      },
      onMouseDown: function onMouseDown(event) {
        event.preventDefault();
      },
      onClick: function onClick(event) {
        var itemInputValue = source.getItemInputValue({
          item,
          state: store.getState()
        });
        var itemUrl = source.getItemUrl({
          item,
          state: store.getState()
        });
        var runPreCommand = itemUrl ? Promise.resolve() : onInput(_objectSpread11({
          event,
          nextState: {
            isOpen: false
          },
          props,
          query: itemInputValue,
          refresh,
          store
        }, setters));
        runPreCommand.then(function() {
          source.onSelect(_objectSpread11({
            event,
            item,
            itemInputValue,
            itemUrl,
            refresh,
            source,
            state: store.getState()
          }, setters));
        });
      }
    }, rest);
  };
  return {
    getEnvironmentProps,
    getRootProps,
    getFormProps,
    getLabelProps,
    getInputProps,
    getPanelProps,
    getListProps,
    getItemProps
  };
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/metadata.js
function _typeof13(obj) {
  "@babel/helpers - typeof";
  return _typeof13 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof13(obj);
}
function ownKeys12(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread12(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys12(Object(source), true).forEach(function(key) {
      _defineProperty12(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys12(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty12(obj, key, value) {
  key = _toPropertyKey12(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey12(arg) {
  var key = _toPrimitive12(arg, "string");
  return _typeof13(key) === "symbol" ? key : String(key);
}
function _toPrimitive12(input, hint) {
  if (_typeof13(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof13(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function getMetadata(_ref) {
  var _, _options$__autocomple, _options$__autocomple2, _options$__autocomple3;
  var plugins = _ref.plugins, options = _ref.options;
  var optionsKey = (_ = (((_options$__autocomple = options.__autocomplete_metadata) === null || _options$__autocomple === void 0 ? void 0 : _options$__autocomple.userAgents) || [])[0]) === null || _ === void 0 ? void 0 : _.segment;
  var extraOptions = optionsKey ? _defineProperty12({}, optionsKey, Object.keys(((_options$__autocomple2 = options.__autocomplete_metadata) === null || _options$__autocomple2 === void 0 ? void 0 : _options$__autocomple2.options) || {})) : {};
  return {
    plugins: plugins.map(function(plugin) {
      return {
        name: plugin.name,
        options: Object.keys(plugin.__autocomplete_pluginOptions || [])
      };
    }),
    options: _objectSpread12({
      "autocomplete-core": Object.keys(options)
    }, extraOptions),
    ua: userAgents.concat(((_options$__autocomple3 = options.__autocomplete_metadata) === null || _options$__autocomple3 === void 0 ? void 0 : _options$__autocomple3.userAgents) || [])
  };
}
function injectMetadata(_ref3) {
  var _environment$navigato, _environment$navigato2;
  var metadata = _ref3.metadata, environment = _ref3.environment;
  var isMetadataEnabled = (_environment$navigato = environment.navigator) === null || _environment$navigato === void 0 ? void 0 : (_environment$navigato2 = _environment$navigato.userAgent) === null || _environment$navigato2 === void 0 ? void 0 : _environment$navigato2.includes("Algolia Crawler");
  if (isMetadataEnabled) {
    var metadataContainer = environment.document.createElement("meta");
    var headRef = environment.document.querySelector("head");
    metadataContainer.name = "algolia:metadata";
    setTimeout(function() {
      metadataContainer.content = JSON.stringify(metadata);
      headRef.appendChild(metadataContainer);
    }, 0);
  }
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/getCompletion.js
function getCompletion(_ref) {
  var _getActiveItem;
  var state = _ref.state;
  if (state.isOpen === false || state.activeItemId === null) {
    return null;
  }
  return ((_getActiveItem = getActiveItem(state)) === null || _getActiveItem === void 0 ? void 0 : _getActiveItem.itemInputValue) || null;
}

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/stateReducer.js
function _typeof14(obj) {
  "@babel/helpers - typeof";
  return _typeof14 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof14(obj);
}
function ownKeys13(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread13(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys13(Object(source), true).forEach(function(key) {
      _defineProperty13(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys13(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty13(obj, key, value) {
  key = _toPropertyKey13(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey13(arg) {
  var key = _toPrimitive13(arg, "string");
  return _typeof14(key) === "symbol" ? key : String(key);
}
function _toPrimitive13(input, hint) {
  if (_typeof14(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof14(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
var stateReducer = function stateReducer2(state, action) {
  switch (action.type) {
    case "setActiveItemId": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        activeItemId: action.payload
      });
    }
    case "setQuery": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        query: action.payload,
        completion: null
      });
    }
    case "setCollections": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        collections: action.payload
      });
    }
    case "setIsOpen": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        isOpen: action.payload
      });
    }
    case "setStatus": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        status: action.payload
      });
    }
    case "setContext": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        context: _objectSpread13(_objectSpread13({}, state.context), action.payload)
      });
    }
    case "ArrowDown": {
      var nextState = _objectSpread13(_objectSpread13({}, state), {}, {
        activeItemId: action.payload.hasOwnProperty("nextActiveItemId") ? action.payload.nextActiveItemId : getNextActiveItemId(1, state.activeItemId, getItemsCount(state), action.props.defaultActiveItemId)
      });
      return _objectSpread13(_objectSpread13({}, nextState), {}, {
        completion: getCompletion({
          state: nextState
        })
      });
    }
    case "ArrowUp": {
      var _nextState = _objectSpread13(_objectSpread13({}, state), {}, {
        activeItemId: getNextActiveItemId(-1, state.activeItemId, getItemsCount(state), action.props.defaultActiveItemId)
      });
      return _objectSpread13(_objectSpread13({}, _nextState), {}, {
        completion: getCompletion({
          state: _nextState
        })
      });
    }
    case "Escape": {
      if (state.isOpen) {
        return _objectSpread13(_objectSpread13({}, state), {}, {
          activeItemId: null,
          isOpen: false,
          completion: null
        });
      }
      return _objectSpread13(_objectSpread13({}, state), {}, {
        activeItemId: null,
        query: "",
        status: "idle",
        collections: []
      });
    }
    case "submit": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        activeItemId: null,
        isOpen: false,
        status: "idle"
      });
    }
    case "reset": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        activeItemId: (
          // Since we open the panel on reset when openOnFocus=true
          // we need to restore the highlighted index to the defaultActiveItemId. (DocSearch use-case)
          // Since we close the panel when openOnFocus=false
          // we lose track of the highlighted index. (Query-suggestions use-case)
          action.props.openOnFocus === true ? action.props.defaultActiveItemId : null
        ),
        status: "idle",
        query: ""
      });
    }
    case "focus": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        activeItemId: action.props.defaultActiveItemId,
        isOpen: (action.props.openOnFocus || Boolean(state.query)) && action.props.shouldPanelOpen({
          state
        })
      });
    }
    case "blur": {
      if (action.props.debug) {
        return state;
      }
      return _objectSpread13(_objectSpread13({}, state), {}, {
        isOpen: false,
        activeItemId: null
      });
    }
    case "mousemove": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        activeItemId: action.payload
      });
    }
    case "mouseleave": {
      return _objectSpread13(_objectSpread13({}, state), {}, {
        activeItemId: action.props.defaultActiveItemId
      });
    }
    default:
      invariant(false, "The reducer action ".concat(JSON.stringify(action.type), " is not supported."));
      return state;
  }
};

// ../../node_modules/.pnpm/@algolia+autocomplete-core@1.9.3_@algolia+client-search@5.56.0_algoliasearch@4.20.0_search-insights@2.13.0/node_modules/@algolia/autocomplete-core/dist/esm/createAutocomplete.js
function _typeof15(obj) {
  "@babel/helpers - typeof";
  return _typeof15 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof15(obj);
}
function ownKeys14(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread14(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys14(Object(source), true).forEach(function(key) {
      _defineProperty14(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys14(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty14(obj, key, value) {
  key = _toPropertyKey14(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey14(arg) {
  var key = _toPrimitive14(arg, "string");
  return _typeof15(key) === "symbol" ? key : String(key);
}
function _toPrimitive14(input, hint) {
  if (_typeof15(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof15(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function createAutocomplete(options) {
  checkOptions(options);
  var subscribers = [];
  var props = getDefaultProps(options, subscribers);
  var store = createStore(stateReducer, props, onStoreStateChange);
  var setters = getAutocompleteSetters({
    store
  });
  var propGetters = getPropGetters(_objectSpread14({
    props,
    refresh,
    store,
    navigator: props.navigator
  }, setters));
  function onStoreStateChange(_ref) {
    var prevState = _ref.prevState, state = _ref.state;
    props.onStateChange(_objectSpread14({
      prevState,
      state,
      refresh,
      navigator: props.navigator
    }, setters));
  }
  function refresh() {
    return onInput(_objectSpread14({
      event: new Event("input"),
      nextState: {
        isOpen: store.getState().isOpen
      },
      props,
      navigator: props.navigator,
      query: store.getState().query,
      refresh,
      store
    }, setters));
  }
  if (options.insights && !props.plugins.some(function(plugin) {
    return plugin.name === "aa.algoliaInsightsPlugin";
  })) {
    var insightsParams = typeof options.insights === "boolean" ? {} : options.insights;
    props.plugins.push(createAlgoliaInsightsPlugin(insightsParams));
  }
  props.plugins.forEach(function(plugin) {
    var _plugin$subscribe;
    return (_plugin$subscribe = plugin.subscribe) === null || _plugin$subscribe === void 0 ? void 0 : _plugin$subscribe.call(plugin, _objectSpread14(_objectSpread14({}, setters), {}, {
      navigator: props.navigator,
      refresh,
      onSelect: function onSelect(fn) {
        subscribers.push({
          onSelect: fn
        });
      },
      onActive: function onActive(fn) {
        subscribers.push({
          onActive: fn
        });
      },
      onResolve: function onResolve(fn) {
        subscribers.push({
          onResolve: fn
        });
      }
    }));
  });
  injectMetadata({
    metadata: getMetadata({
      plugins: props.plugins,
      options
    }),
    environment: props.environment
  });
  return _objectSpread14(_objectSpread14({
    refresh,
    navigator: props.navigator
  }, propGetters), setters);
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/DocSearchModal.js
var import_react27 = __toESM(require_react());

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/constants.js
var MAX_QUERY_SIZE = 64;

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/Footer.js
var import_react5 = __toESM(require_react());

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/AlgoliaLogo.js
var import_react4 = __toESM(require_react());
function AlgoliaLogo(_ref) {
  var _ref$translations = _ref.translations, translations = _ref$translations === void 0 ? {} : _ref$translations;
  var _translations$searchB = translations.searchByText, searchByText = _translations$searchB === void 0 ? "Search by" : _translations$searchB;
  return import_react4.default.createElement("a", {
    href: "https://www.algolia.com/ref/docsearch/?utm_source=".concat(window.location.hostname, "&utm_medium=referral&utm_content=powered_by&utm_campaign=docsearch"),
    target: "_blank",
    rel: "noopener noreferrer"
  }, import_react4.default.createElement("span", {
    className: "DocSearch-Label"
  }, searchByText), import_react4.default.createElement("svg", {
    width: "77",
    height: "19",
    "aria-label": "Algolia",
    role: "img",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 2196.2 500"
  }, import_react4.default.createElement("defs", null, import_react4.default.createElement("style", null, ".cls-1,.cls-2{fill:#003dff;}.cls-2{fill-rule:evenodd;}")), import_react4.default.createElement("path", {
    className: "cls-2",
    d: "M1070.38,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z"
  }), import_react4.default.createElement("rect", {
    className: "cls-1",
    x: "1845.88",
    y: "104.73",
    width: "62.58",
    height: "277.9",
    rx: "5.9",
    ry: "5.9"
  }), import_react4.default.createElement("path", {
    className: "cls-2",
    d: "M1851.78,71.38h50.77c3.26,0,5.9-2.64,5.9-5.9V5.9c0-3.62-3.24-6.39-6.82-5.83l-50.77,7.95c-2.87,.45-4.99,2.92-4.99,5.83v51.62c0,3.26,2.64,5.9,5.9,5.9Z"
  }), import_react4.default.createElement("path", {
    className: "cls-2",
    d: "M1764.03,275.3V5.91c0-3.63-3.24-6.39-6.82-5.83l-50.46,7.94c-2.87,.45-4.99,2.93-4.99,5.84l.17,273.22c0,12.92,0,92.7,95.97,95.49,3.33,.1,6.09-2.58,6.09-5.91v-40.78c0-2.96-2.19-5.51-5.12-5.84-34.85-4.01-34.85-47.57-34.85-54.72Z"
  }), import_react4.default.createElement("path", {
    className: "cls-2",
    d: "M1631.95,142.72c-11.14-12.25-24.83-21.65-40.78-28.31-15.92-6.53-33.26-9.85-52.07-9.85-18.78,0-36.15,3.17-51.92,9.85-15.59,6.66-29.29,16.05-40.76,28.31-11.47,12.23-20.38,26.87-26.76,44.03-6.38,17.17-9.24,37.37-9.24,58.36,0,20.99,3.19,36.87,9.55,54.21,6.38,17.32,15.14,32.11,26.45,44.36,11.29,12.23,24.83,21.62,40.6,28.46,15.77,6.83,40.12,10.33,52.4,10.48,12.25,0,36.78-3.82,52.7-10.48,15.92-6.68,29.46-16.23,40.78-28.46,11.29-12.25,20.05-27.04,26.25-44.36,6.22-17.34,9.24-33.22,9.24-54.21,0-20.99-3.34-41.19-10.03-58.36-6.38-17.17-15.14-31.8-26.43-44.03Zm-44.43,163.75c-11.47,15.75-27.56,23.7-48.09,23.7-20.55,0-36.63-7.8-48.1-23.7-11.47-15.75-17.21-34.01-17.21-61.2,0-26.89,5.59-49.14,17.06-64.87,11.45-15.75,27.54-23.52,48.07-23.52,20.55,0,36.63,7.78,48.09,23.52,11.47,15.57,17.36,37.98,17.36,64.87,0,27.19-5.72,45.3-17.19,61.2Z"
  }), import_react4.default.createElement("path", {
    className: "cls-2",
    d: "M894.42,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z"
  }), import_react4.default.createElement("path", {
    className: "cls-2",
    d: "M2133.97,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-14.52,22.58-22.99,49.63-22.99,78.73,0,44.89,20.13,84.92,51.59,111.1,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47,1.23,0,2.46-.03,3.68-.09,.36-.02,.71-.05,1.07-.07,.87-.05,1.75-.11,2.62-.2,.34-.03,.68-.08,1.02-.12,.91-.1,1.82-.21,2.73-.34,.21-.03,.42-.07,.63-.1,32.89-5.07,61.56-30.82,70.9-62.81v57.83c0,3.26,2.64,5.9,5.9,5.9h50.42c3.26,0,5.9-2.64,5.9-5.9V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,206.92c-12.2,10.16-27.97,13.98-44.84,15.12-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-42.24,0-77.12-35.89-77.12-79.37,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33v142.83Z"
  }), import_react4.default.createElement("path", {
    className: "cls-2",
    d: "M1314.05,104.73h-49.33c-48.36,0-90.91,25.48-115.75,64.1-11.79,18.34-19.6,39.64-22.11,62.59-.58,5.3-.88,10.68-.88,16.14s.31,11.15,.93,16.59c4.28,38.09,23.14,71.61,50.66,94.52,2.93,2.6,6.05,4.98,9.31,7.14,12.86,8.49,28.11,13.47,44.52,13.47h0c17.99,0,34.61-5.93,48.16-15.97,16.29-11.58,28.88-28.54,34.48-47.75v50.26h-.11v11.08c0,21.84-5.71,38.27-17.34,49.36-11.61,11.08-31.04,16.63-58.25,16.63-11.12,0-28.79-.59-46.6-2.41-2.83-.29-5.46,1.5-6.27,4.22l-12.78,43.11c-1.02,3.46,1.27,7.02,4.83,7.53,21.52,3.08,42.52,4.68,54.65,4.68,48.91,0,85.16-10.75,108.89-32.21,21.48-19.41,33.15-48.89,35.2-88.52V110.63c0-3.26-2.64-5.9-5.9-5.9h-56.32Zm0,64.1s.65,139.13,0,143.36c-12.08,9.77-27.11,13.59-43.49,14.7-.16,.01-.33,.03-.49,.04-1.12,.07-2.24,.1-3.36,.1-1.32,0-2.63-.03-3.94-.1-40.41-2.11-74.52-37.26-74.52-79.38,0-10.25,1.96-20.01,5.42-28.98,11.22-29.12,38.77-49.74,71.06-49.74h49.33Z"
  }), import_react4.default.createElement("path", {
    className: "cls-1",
    d: "M249.83,0C113.3,0,2,110.09,.03,246.16c-2,138.19,110.12,252.7,248.33,253.5,42.68,.25,83.79-10.19,120.3-30.03,3.56-1.93,4.11-6.83,1.08-9.51l-23.38-20.72c-4.75-4.21-11.51-5.4-17.36-2.92-25.48,10.84-53.17,16.38-81.71,16.03-111.68-1.37-201.91-94.29-200.13-205.96,1.76-110.26,92-199.41,202.67-199.41h202.69V407.41l-115-102.18c-3.72-3.31-9.42-2.66-12.42,1.31-18.46,24.44-48.53,39.64-81.93,37.34-46.33-3.2-83.87-40.5-87.34-86.81-4.15-55.24,39.63-101.52,94-101.52,49.18,0,89.68,37.85,93.91,85.95,.38,4.28,2.31,8.27,5.52,11.12l29.95,26.55c3.4,3.01,8.79,1.17,9.63-3.3,2.16-11.55,2.92-23.58,2.07-35.92-4.82-70.34-61.8-126.93-132.17-131.26-80.68-4.97-148.13,58.14-150.27,137.25-2.09,77.1,61.08,143.56,138.19,145.26,32.19,.71,62.03-9.41,86.14-26.95l150.26,133.2c6.44,5.71,16.61,1.14,16.61-7.47V9.48C499.66,4.25,495.42,0,490.18,0H249.83Z"
  })));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/Footer.js
function CommandIcon(props) {
  return import_react5.default.createElement("svg", {
    width: "15",
    height: "15",
    "aria-label": props.ariaLabel,
    role: "img"
  }, import_react5.default.createElement("g", {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.2"
  }, props.children));
}
function Footer(_ref) {
  var _ref$translations = _ref.translations, translations = _ref$translations === void 0 ? {} : _ref$translations;
  var _translations$selectT = translations.selectText, selectText = _translations$selectT === void 0 ? "to select" : _translations$selectT, _translations$selectK = translations.selectKeyAriaLabel, selectKeyAriaLabel = _translations$selectK === void 0 ? "Enter key" : _translations$selectK, _translations$navigat = translations.navigateText, navigateText = _translations$navigat === void 0 ? "to navigate" : _translations$navigat, _translations$navigat2 = translations.navigateUpKeyAriaLabel, navigateUpKeyAriaLabel = _translations$navigat2 === void 0 ? "Arrow up" : _translations$navigat2, _translations$navigat3 = translations.navigateDownKeyAriaLabel, navigateDownKeyAriaLabel = _translations$navigat3 === void 0 ? "Arrow down" : _translations$navigat3, _translations$closeTe = translations.closeText, closeText = _translations$closeTe === void 0 ? "to close" : _translations$closeTe, _translations$closeKe = translations.closeKeyAriaLabel, closeKeyAriaLabel = _translations$closeKe === void 0 ? "Escape key" : _translations$closeKe, _translations$searchB = translations.searchByText, searchByText = _translations$searchB === void 0 ? "Search by" : _translations$searchB;
  return import_react5.default.createElement(import_react5.default.Fragment, null, import_react5.default.createElement("div", {
    className: "DocSearch-Logo"
  }, import_react5.default.createElement(AlgoliaLogo, {
    translations: {
      searchByText
    }
  })), import_react5.default.createElement("ul", {
    className: "DocSearch-Commands"
  }, import_react5.default.createElement("li", null, import_react5.default.createElement("kbd", {
    className: "DocSearch-Commands-Key"
  }, import_react5.default.createElement(CommandIcon, {
    ariaLabel: selectKeyAriaLabel
  }, import_react5.default.createElement("path", {
    d: "M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"
  }))), import_react5.default.createElement("span", {
    className: "DocSearch-Label"
  }, selectText)), import_react5.default.createElement("li", null, import_react5.default.createElement("kbd", {
    className: "DocSearch-Commands-Key"
  }, import_react5.default.createElement(CommandIcon, {
    ariaLabel: navigateDownKeyAriaLabel
  }, import_react5.default.createElement("path", {
    d: "M7.5 3.5v8M10.5 8.5l-3 3-3-3"
  }))), import_react5.default.createElement("kbd", {
    className: "DocSearch-Commands-Key"
  }, import_react5.default.createElement(CommandIcon, {
    ariaLabel: navigateUpKeyAriaLabel
  }, import_react5.default.createElement("path", {
    d: "M7.5 11.5v-8M10.5 6.5l-3-3-3 3"
  }))), import_react5.default.createElement("span", {
    className: "DocSearch-Label"
  }, navigateText)), import_react5.default.createElement("li", null, import_react5.default.createElement("kbd", {
    className: "DocSearch-Commands-Key"
  }, import_react5.default.createElement(CommandIcon, {
    ariaLabel: closeKeyAriaLabel
  }, import_react5.default.createElement("path", {
    d: "M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"
  }))), import_react5.default.createElement("span", {
    className: "DocSearch-Label"
  }, closeText))));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/Hit.js
var import_react6 = __toESM(require_react());
function Hit(_ref) {
  var hit = _ref.hit, children = _ref.children;
  return import_react6.default.createElement("a", {
    href: hit.url
  }, children);
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/ScreenState.js
var import_react22 = __toESM(require_react());

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/ErrorScreen.js
var import_react16 = __toESM(require_react());

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/GoToExternalIcon.js
var import_react7 = __toESM(require_react());

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/LoadingIcon.js
var import_react8 = __toESM(require_react());
function LoadingIcon() {
  return import_react8.default.createElement("svg", {
    viewBox: "0 0 38 38",
    stroke: "currentColor",
    strokeOpacity: ".5"
  }, import_react8.default.createElement("g", {
    fill: "none",
    fillRule: "evenodd"
  }, import_react8.default.createElement("g", {
    transform: "translate(1 1)",
    strokeWidth: "2"
  }, import_react8.default.createElement("circle", {
    strokeOpacity: ".3",
    cx: "18",
    cy: "18",
    r: "18"
  }), import_react8.default.createElement("path", {
    d: "M36 18c0-9.94-8.06-18-18-18"
  }, import_react8.default.createElement("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    from: "0 18 18",
    to: "360 18 18",
    dur: "1s",
    repeatCount: "indefinite"
  })))));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/RecentIcon.js
var import_react9 = __toESM(require_react());
function RecentIcon() {
  return import_react9.default.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, import_react9.default.createElement("g", {
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, import_react9.default.createElement("path", {
    d: "M3.18 6.6a8.23 8.23 0 1112.93 9.94h0a8.23 8.23 0 01-11.63 0"
  }), import_react9.default.createElement("path", {
    d: "M6.44 7.25H2.55V3.36M10.45 6v5.6M10.45 11.6L13 13"
  })));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/ResetIcon.js
var import_react10 = __toESM(require_react());
function ResetIcon() {
  return import_react10.default.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, import_react10.default.createElement("path", {
    d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/SelectIcon.js
var import_react11 = __toESM(require_react());
function SelectIcon() {
  return import_react11.default.createElement("svg", {
    className: "DocSearch-Hit-Select-Icon",
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, import_react11.default.createElement("g", {
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, import_react11.default.createElement("path", {
    d: "M18 3v4c0 2-2 4-4 4H2"
  }), import_react11.default.createElement("path", {
    d: "M8 17l-6-6 6-6"
  })));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/SourceIcon.js
var import_react12 = __toESM(require_react());
var LvlIcon = function LvlIcon2() {
  return import_react12.default.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, import_react12.default.createElement("path", {
    d: "M17 6v12c0 .52-.2 1-1 1H4c-.7 0-1-.33-1-1V2c0-.55.42-1 1-1h8l5 5zM14 8h-3.13c-.51 0-.87-.34-.87-.87V4",
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinejoin: "round"
  }));
};
function SourceIcon(props) {
  switch (props.type) {
    case "lvl1":
      return import_react12.default.createElement(LvlIcon, null);
    case "content":
      return import_react12.default.createElement(ContentIcon, null);
    default:
      return import_react12.default.createElement(AnchorIcon, null);
  }
}
function AnchorIcon() {
  return import_react12.default.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, import_react12.default.createElement("path", {
    d: "M13 13h4-4V8H7v5h6v4-4H7V8H3h4V3v5h6V3v5h4-4v5zm-6 0v4-4H3h4z",
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
function ContentIcon() {
  return import_react12.default.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, import_react12.default.createElement("path", {
    d: "M17 5H3h14zm0 5H3h14zm0 5H3h14z",
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinejoin: "round"
  }));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/StarIcon.js
var import_react13 = __toESM(require_react());
function StarIcon() {
  return import_react13.default.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20"
  }, import_react13.default.createElement("path", {
    d: "M10 14.2L5 17l1-5.6-4-4 5.5-.7 2.5-5 2.5 5 5.6.8-4 4 .9 5.5z",
    stroke: "currentColor",
    fill: "none",
    fillRule: "evenodd",
    strokeLinejoin: "round"
  }));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/ErrorIcon.js
var import_react14 = __toESM(require_react());
function ErrorIcon() {
  return import_react14.default.createElement("svg", {
    width: "40",
    height: "40",
    viewBox: "0 0 20 20",
    fill: "none",
    fillRule: "evenodd",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, import_react14.default.createElement("path", {
    d: "M19 4.8a16 16 0 00-2-1.2m-3.3-1.2A16 16 0 001.1 4.7M16.7 8a12 12 0 00-2.8-1.4M10 6a12 12 0 00-6.7 2M12.3 14.7a4 4 0 00-4.5 0M14.5 11.4A8 8 0 0010 10M3 16L18 2M10 18h0"
  }));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/icons/NoResultsIcon.js
var import_react15 = __toESM(require_react());
function NoResultsIcon() {
  return import_react15.default.createElement("svg", {
    width: "40",
    height: "40",
    viewBox: "0 0 20 20",
    fill: "none",
    fillRule: "evenodd",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, import_react15.default.createElement("path", {
    d: "M15.5 4.8c2 3 1.7 7-1 9.7h0l4.3 4.3-4.3-4.3a7.8 7.8 0 01-9.8 1m-2.2-2.2A7.8 7.8 0 0113.2 2.4M2 18L18 2"
  }));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/ErrorScreen.js
function ErrorScreen(_ref) {
  var _ref$translations = _ref.translations, translations = _ref$translations === void 0 ? {} : _ref$translations;
  var _translations$titleTe = translations.titleText, titleText = _translations$titleTe === void 0 ? "Unable to fetch results" : _translations$titleTe, _translations$helpTex = translations.helpText, helpText = _translations$helpTex === void 0 ? "You might want to check your network connection." : _translations$helpTex;
  return import_react16.default.createElement("div", {
    className: "DocSearch-ErrorScreen"
  }, import_react16.default.createElement("div", {
    className: "DocSearch-Screen-Icon"
  }, import_react16.default.createElement(ErrorIcon, null)), import_react16.default.createElement("p", {
    className: "DocSearch-Title"
  }, titleText), import_react16.default.createElement("p", {
    className: "DocSearch-Help"
  }, helpText));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/NoResultsScreen.js
var import_react17 = __toESM(require_react());
var _excluded8 = ["translations"];
function _toConsumableArray5(arr) {
  return _arrayWithoutHoles5(arr) || _iterableToArray5(arr) || _unsupportedIterableToArray8(arr) || _nonIterableSpread5();
}
function _nonIterableSpread5() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray8(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray8(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray8(o, minLen);
}
function _iterableToArray5(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles5(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray8(arr);
}
function _arrayLikeToArray8(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _objectWithoutProperties6(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose6(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose6(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function NoResultsScreen(_ref) {
  var _ref$translations = _ref.translations, translations = _ref$translations === void 0 ? {} : _ref$translations, props = _objectWithoutProperties6(_ref, _excluded8);
  var _translations$noResul = translations.noResultsText, noResultsText = _translations$noResul === void 0 ? "No results for" : _translations$noResul, _translations$suggest = translations.suggestedQueryText, suggestedQueryText = _translations$suggest === void 0 ? "Try searching for" : _translations$suggest, _translations$reportM = translations.reportMissingResultsText, reportMissingResultsText = _translations$reportM === void 0 ? "Believe this query should return results?" : _translations$reportM, _translations$reportM2 = translations.reportMissingResultsLinkText, reportMissingResultsLinkText = _translations$reportM2 === void 0 ? "Let us know." : _translations$reportM2;
  var searchSuggestions = props.state.context.searchSuggestions;
  return import_react17.default.createElement("div", {
    className: "DocSearch-NoResults"
  }, import_react17.default.createElement("div", {
    className: "DocSearch-Screen-Icon"
  }, import_react17.default.createElement(NoResultsIcon, null)), import_react17.default.createElement("p", {
    className: "DocSearch-Title"
  }, noResultsText, ' "', import_react17.default.createElement("strong", null, props.state.query), '"'), searchSuggestions && searchSuggestions.length > 0 && import_react17.default.createElement("div", {
    className: "DocSearch-NoResults-Prefill-List"
  }, import_react17.default.createElement("p", {
    className: "DocSearch-Help"
  }, suggestedQueryText, ":"), import_react17.default.createElement("ul", null, searchSuggestions.slice(0, 3).reduce(function(acc, search2) {
    return [].concat(_toConsumableArray5(acc), [import_react17.default.createElement("li", {
      key: search2
    }, import_react17.default.createElement("button", {
      className: "DocSearch-Prefill",
      key: search2,
      type: "button",
      onClick: function onClick() {
        props.setQuery(search2.toLowerCase() + " ");
        props.refresh();
        props.inputRef.current.focus();
      }
    }, search2))]);
  }, []))), props.getMissingResultsUrl && import_react17.default.createElement("p", {
    className: "DocSearch-Help"
  }, "".concat(reportMissingResultsText, " "), import_react17.default.createElement("a", {
    href: props.getMissingResultsUrl({
      query: props.state.query
    }),
    target: "_blank",
    rel: "noopener noreferrer"
  }, reportMissingResultsLinkText)));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/ResultsScreen.js
var import_react20 = __toESM(require_react());

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/Results.js
var import_react19 = __toESM(require_react());

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/Snippet.js
var import_react18 = __toESM(require_react());
var _excluded9 = ["hit", "attribute", "tagName"];
function ownKeys15(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread15(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys15(Object(source), true).forEach(function(key) {
      _defineProperty15(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys15(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty15(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectWithoutProperties7(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose7(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose7(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function getPropertyByPath(object, path) {
  var parts = path.split(".");
  return parts.reduce(function(prev, current) {
    if (prev !== null && prev !== void 0 && prev[current]) return prev[current];
    return null;
  }, object);
}
function Snippet(_ref) {
  var hit = _ref.hit, attribute = _ref.attribute, _ref$tagName = _ref.tagName, tagName = _ref$tagName === void 0 ? "span" : _ref$tagName, rest = _objectWithoutProperties7(_ref, _excluded9);
  return (0, import_react18.createElement)(tagName, _objectSpread15(_objectSpread15({}, rest), {}, {
    dangerouslySetInnerHTML: {
      __html: getPropertyByPath(hit, "_snippetResult.".concat(attribute, ".value")) || getPropertyByPath(hit, attribute)
    }
  }));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/Results.js
function _slicedToArray4(arr, i) {
  return _arrayWithHoles4(arr) || _iterableToArrayLimit4(arr, i) || _unsupportedIterableToArray9(arr, i) || _nonIterableRest4();
}
function _nonIterableRest4() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray9(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray9(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray9(o, minLen);
}
function _arrayLikeToArray9(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit4(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles4(arr) {
  if (Array.isArray(arr)) return arr;
}
function _extends2() {
  _extends2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
function Results(props) {
  if (!props.collection || props.collection.items.length === 0) {
    return null;
  }
  return import_react19.default.createElement("section", {
    className: "DocSearch-Hits"
  }, import_react19.default.createElement("div", {
    className: "DocSearch-Hit-source"
  }, props.title), import_react19.default.createElement("ul", props.getListProps(), props.collection.items.map(function(item, index) {
    return import_react19.default.createElement(Result, _extends2({
      key: [props.title, item.objectID].join(":"),
      item,
      index
    }, props));
  })));
}
function Result(_ref) {
  var item = _ref.item, index = _ref.index, renderIcon = _ref.renderIcon, renderAction = _ref.renderAction, getItemProps = _ref.getItemProps, onItemClick = _ref.onItemClick, collection = _ref.collection, hitComponent = _ref.hitComponent;
  var _React$useState = import_react19.default.useState(false), _React$useState2 = _slicedToArray4(_React$useState, 2), isDeleting = _React$useState2[0], setIsDeleting = _React$useState2[1];
  var _React$useState3 = import_react19.default.useState(false), _React$useState4 = _slicedToArray4(_React$useState3, 2), isFavoriting = _React$useState4[0], setIsFavoriting = _React$useState4[1];
  var action = import_react19.default.useRef(null);
  var Hit2 = hitComponent;
  function runDeleteTransition(cb) {
    setIsDeleting(true);
    action.current = cb;
  }
  function runFavoriteTransition(cb) {
    setIsFavoriting(true);
    action.current = cb;
  }
  return import_react19.default.createElement("li", _extends2({
    className: ["DocSearch-Hit", item.__docsearch_parent && "DocSearch-Hit--Child", isDeleting && "DocSearch-Hit--deleting", isFavoriting && "DocSearch-Hit--favoriting"].filter(Boolean).join(" "),
    onTransitionEnd: function onTransitionEnd() {
      if (action.current) {
        action.current();
      }
    }
  }, getItemProps({
    item,
    source: collection.source,
    onClick: function onClick(event) {
      onItemClick(item, event);
    }
  })), import_react19.default.createElement(Hit2, {
    hit: item
  }, import_react19.default.createElement("div", {
    className: "DocSearch-Hit-Container"
  }, renderIcon({
    item,
    index
  }), item.hierarchy[item.type] && item.type === "lvl1" && import_react19.default.createElement("div", {
    className: "DocSearch-Hit-content-wrapper"
  }, import_react19.default.createElement(Snippet, {
    className: "DocSearch-Hit-title",
    hit: item,
    attribute: "hierarchy.lvl1"
  }), item.content && import_react19.default.createElement(Snippet, {
    className: "DocSearch-Hit-path",
    hit: item,
    attribute: "content"
  })), item.hierarchy[item.type] && (item.type === "lvl2" || item.type === "lvl3" || item.type === "lvl4" || item.type === "lvl5" || item.type === "lvl6") && import_react19.default.createElement("div", {
    className: "DocSearch-Hit-content-wrapper"
  }, import_react19.default.createElement(Snippet, {
    className: "DocSearch-Hit-title",
    hit: item,
    attribute: "hierarchy.".concat(item.type)
  }), import_react19.default.createElement(Snippet, {
    className: "DocSearch-Hit-path",
    hit: item,
    attribute: "hierarchy.lvl1"
  })), item.type === "content" && import_react19.default.createElement("div", {
    className: "DocSearch-Hit-content-wrapper"
  }, import_react19.default.createElement(Snippet, {
    className: "DocSearch-Hit-title",
    hit: item,
    attribute: "content"
  }), import_react19.default.createElement(Snippet, {
    className: "DocSearch-Hit-path",
    hit: item,
    attribute: "hierarchy.lvl1"
  })), renderAction({
    item,
    runDeleteTransition,
    runFavoriteTransition
  }))));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/utils/groupBy.js
function groupBy(values, predicate, maxResultsPerGroup) {
  return values.reduce(function(acc, item) {
    var key = predicate(item);
    if (!acc.hasOwnProperty(key)) {
      acc[key] = [];
    }
    if (acc[key].length < (maxResultsPerGroup || 5)) {
      acc[key].push(item);
    }
    return acc;
  }, {});
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/utils/identity.js
function identity(x) {
  return x;
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/utils/isModifierEvent.js
function isModifierEvent(event) {
  var isMiddleClick = event.button === 1;
  return isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/utils/noop.js
function noop3() {
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/utils/removeHighlightTags.js
var regexHighlightTags = /(<mark>|<\/mark>)/g;
var regexHasHighlightTags = RegExp(regexHighlightTags.source);
function removeHighlightTags(hit) {
  var _internalDocSearchHit, _hit$_highlightResult;
  var internalDocSearchHit = hit;
  if (!internalDocSearchHit.__docsearch_parent && !hit._highlightResult) {
    return hit.hierarchy.lvl0;
  }
  var _ref = (internalDocSearchHit.__docsearch_parent ? (_internalDocSearchHit = internalDocSearchHit.__docsearch_parent) === null || _internalDocSearchHit === void 0 || (_internalDocSearchHit = _internalDocSearchHit._highlightResult) === null || _internalDocSearchHit === void 0 || (_internalDocSearchHit = _internalDocSearchHit.hierarchy) === null || _internalDocSearchHit === void 0 ? void 0 : _internalDocSearchHit.lvl0 : (_hit$_highlightResult = hit._highlightResult) === null || _hit$_highlightResult === void 0 || (_hit$_highlightResult = _hit$_highlightResult.hierarchy) === null || _hit$_highlightResult === void 0 ? void 0 : _hit$_highlightResult.lvl0) || {}, value = _ref.value;
  return value && regexHasHighlightTags.test(value) ? value.replace(regexHighlightTags, "") : value;
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/ResultsScreen.js
function _extends3() {
  _extends3 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends3.apply(this, arguments);
}
function ResultsScreen(props) {
  return import_react20.default.createElement("div", {
    className: "DocSearch-Dropdown-Container"
  }, props.state.collections.map(function(collection) {
    if (collection.items.length === 0) {
      return null;
    }
    var title = removeHighlightTags(collection.items[0]);
    return import_react20.default.createElement(Results, _extends3({}, props, {
      key: collection.source.sourceId,
      title,
      collection,
      renderIcon: function renderIcon(_ref) {
        var _collection$items;
        var item = _ref.item, index = _ref.index;
        return import_react20.default.createElement(import_react20.default.Fragment, null, item.__docsearch_parent && import_react20.default.createElement("svg", {
          className: "DocSearch-Hit-Tree",
          viewBox: "0 0 24 54"
        }, import_react20.default.createElement("g", {
          stroke: "currentColor",
          fill: "none",
          fillRule: "evenodd",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }, item.__docsearch_parent !== ((_collection$items = collection.items[index + 1]) === null || _collection$items === void 0 ? void 0 : _collection$items.__docsearch_parent) ? import_react20.default.createElement("path", {
          d: "M8 6v21M20 27H8.3"
        }) : import_react20.default.createElement("path", {
          d: "M8 6v42M20 27H8.3"
        }))), import_react20.default.createElement("div", {
          className: "DocSearch-Hit-icon"
        }, import_react20.default.createElement(SourceIcon, {
          type: item.type
        })));
      },
      renderAction: function renderAction() {
        return import_react20.default.createElement("div", {
          className: "DocSearch-Hit-action"
        }, import_react20.default.createElement(SelectIcon, null));
      }
    }));
  }), props.resultsFooterComponent && import_react20.default.createElement("section", {
    className: "DocSearch-HitsFooter"
  }, import_react20.default.createElement(props.resultsFooterComponent, {
    state: props.state
  })));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/StartScreen.js
var import_react21 = __toESM(require_react());
var _excluded10 = ["translations"];
function _extends4() {
  _extends4 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends4.apply(this, arguments);
}
function _objectWithoutProperties8(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose8(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose8(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function StartScreen(_ref) {
  var _ref$translations = _ref.translations, translations = _ref$translations === void 0 ? {} : _ref$translations, props = _objectWithoutProperties8(_ref, _excluded10);
  var _translations$recentS = translations.recentSearchesTitle, recentSearchesTitle = _translations$recentS === void 0 ? "Recent" : _translations$recentS, _translations$noRecen = translations.noRecentSearchesText, noRecentSearchesText = _translations$noRecen === void 0 ? "No recent searches" : _translations$noRecen, _translations$saveRec = translations.saveRecentSearchButtonTitle, saveRecentSearchButtonTitle = _translations$saveRec === void 0 ? "Save this search" : _translations$saveRec, _translations$removeR = translations.removeRecentSearchButtonTitle, removeRecentSearchButtonTitle = _translations$removeR === void 0 ? "Remove this search from history" : _translations$removeR, _translations$favorit = translations.favoriteSearchesTitle, favoriteSearchesTitle = _translations$favorit === void 0 ? "Favorite" : _translations$favorit, _translations$removeF = translations.removeFavoriteSearchButtonTitle, removeFavoriteSearchButtonTitle = _translations$removeF === void 0 ? "Remove this search from favorites" : _translations$removeF;
  if (props.state.status === "idle" && props.hasCollections === false) {
    if (props.disableUserPersonalization) {
      return null;
    }
    return import_react21.default.createElement("div", {
      className: "DocSearch-StartScreen"
    }, import_react21.default.createElement("p", {
      className: "DocSearch-Help"
    }, noRecentSearchesText));
  }
  if (props.hasCollections === false) {
    return null;
  }
  return import_react21.default.createElement("div", {
    className: "DocSearch-Dropdown-Container"
  }, import_react21.default.createElement(Results, _extends4({}, props, {
    title: recentSearchesTitle,
    collection: props.state.collections[0],
    renderIcon: function renderIcon() {
      return import_react21.default.createElement("div", {
        className: "DocSearch-Hit-icon"
      }, import_react21.default.createElement(RecentIcon, null));
    },
    renderAction: function renderAction(_ref2) {
      var item = _ref2.item, runFavoriteTransition = _ref2.runFavoriteTransition, runDeleteTransition = _ref2.runDeleteTransition;
      return import_react21.default.createElement(import_react21.default.Fragment, null, import_react21.default.createElement("div", {
        className: "DocSearch-Hit-action"
      }, import_react21.default.createElement("button", {
        className: "DocSearch-Hit-action-button",
        title: saveRecentSearchButtonTitle,
        type: "submit",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();
          runFavoriteTransition(function() {
            props.favoriteSearches.add(item);
            props.recentSearches.remove(item);
            props.refresh();
          });
        }
      }, import_react21.default.createElement(StarIcon, null))), import_react21.default.createElement("div", {
        className: "DocSearch-Hit-action"
      }, import_react21.default.createElement("button", {
        className: "DocSearch-Hit-action-button",
        title: removeRecentSearchButtonTitle,
        type: "submit",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();
          runDeleteTransition(function() {
            props.recentSearches.remove(item);
            props.refresh();
          });
        }
      }, import_react21.default.createElement(ResetIcon, null))));
    }
  })), import_react21.default.createElement(Results, _extends4({}, props, {
    title: favoriteSearchesTitle,
    collection: props.state.collections[1],
    renderIcon: function renderIcon() {
      return import_react21.default.createElement("div", {
        className: "DocSearch-Hit-icon"
      }, import_react21.default.createElement(StarIcon, null));
    },
    renderAction: function renderAction(_ref3) {
      var item = _ref3.item, runDeleteTransition = _ref3.runDeleteTransition;
      return import_react21.default.createElement("div", {
        className: "DocSearch-Hit-action"
      }, import_react21.default.createElement("button", {
        className: "DocSearch-Hit-action-button",
        title: removeFavoriteSearchButtonTitle,
        type: "submit",
        onClick: function onClick(event) {
          event.preventDefault();
          event.stopPropagation();
          runDeleteTransition(function() {
            props.favoriteSearches.remove(item);
            props.refresh();
          });
        }
      }, import_react21.default.createElement(ResetIcon, null)));
    }
  })));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/ScreenState.js
var _excluded11 = ["translations"];
function _extends5() {
  _extends5 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends5.apply(this, arguments);
}
function _objectWithoutProperties9(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose9(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose9(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var ScreenState = import_react22.default.memo(function(_ref) {
  var _ref$translations = _ref.translations, translations = _ref$translations === void 0 ? {} : _ref$translations, props = _objectWithoutProperties9(_ref, _excluded11);
  if (props.state.status === "error") {
    return import_react22.default.createElement(ErrorScreen, {
      translations: translations === null || translations === void 0 ? void 0 : translations.errorScreen
    });
  }
  var hasCollections = props.state.collections.some(function(collection) {
    return collection.items.length > 0;
  });
  if (!props.state.query) {
    return import_react22.default.createElement(StartScreen, _extends5({}, props, {
      hasCollections,
      translations: translations === null || translations === void 0 ? void 0 : translations.startScreen
    }));
  }
  if (hasCollections === false) {
    return import_react22.default.createElement(NoResultsScreen, _extends5({}, props, {
      translations: translations === null || translations === void 0 ? void 0 : translations.noResultsScreen
    }));
  }
  return import_react22.default.createElement(ResultsScreen, props);
}, function areEqual(_prevProps, nextProps) {
  return nextProps.state.status === "loading" || nextProps.state.status === "stalled";
});

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/SearchBox.js
var import_react23 = __toESM(require_react());
var _excluded12 = ["translations"];
function _extends6() {
  _extends6 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends6.apply(this, arguments);
}
function _objectWithoutProperties10(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose10(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose10(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function SearchBox(_ref) {
  var _ref$translations = _ref.translations, translations = _ref$translations === void 0 ? {} : _ref$translations, props = _objectWithoutProperties10(_ref, _excluded12);
  var _translations$resetBu = translations.resetButtonTitle, resetButtonTitle = _translations$resetBu === void 0 ? "Clear the query" : _translations$resetBu, _translations$resetBu2 = translations.resetButtonAriaLabel, resetButtonAriaLabel = _translations$resetBu2 === void 0 ? "Clear the query" : _translations$resetBu2, _translations$cancelB = translations.cancelButtonText, cancelButtonText = _translations$cancelB === void 0 ? "Cancel" : _translations$cancelB, _translations$cancelB2 = translations.cancelButtonAriaLabel, cancelButtonAriaLabel = _translations$cancelB2 === void 0 ? "Cancel" : _translations$cancelB2;
  var _props$getFormProps = props.getFormProps({
    inputElement: props.inputRef.current
  }), onReset = _props$getFormProps.onReset;
  import_react23.default.useEffect(function() {
    if (props.autoFocus && props.inputRef.current) {
      props.inputRef.current.focus();
    }
  }, [props.autoFocus, props.inputRef]);
  import_react23.default.useEffect(function() {
    if (props.isFromSelection && props.inputRef.current) {
      props.inputRef.current.select();
    }
  }, [props.isFromSelection, props.inputRef]);
  return import_react23.default.createElement(import_react23.default.Fragment, null, import_react23.default.createElement("form", {
    className: "DocSearch-Form",
    onSubmit: function onSubmit(event) {
      event.preventDefault();
    },
    onReset
  }, import_react23.default.createElement("label", _extends6({
    className: "DocSearch-MagnifierLabel"
  }, props.getLabelProps()), import_react23.default.createElement(SearchIcon, null)), import_react23.default.createElement("div", {
    className: "DocSearch-LoadingIndicator"
  }, import_react23.default.createElement(LoadingIcon, null)), import_react23.default.createElement("input", _extends6({
    className: "DocSearch-Input",
    ref: props.inputRef
  }, props.getInputProps({
    inputElement: props.inputRef.current,
    autoFocus: props.autoFocus,
    maxLength: MAX_QUERY_SIZE
  }))), import_react23.default.createElement("button", {
    type: "reset",
    title: resetButtonTitle,
    className: "DocSearch-Reset",
    "aria-label": resetButtonAriaLabel,
    hidden: !props.state.query
  }, import_react23.default.createElement(ResetIcon, null))), import_react23.default.createElement("button", {
    className: "DocSearch-Cancel",
    type: "reset",
    "aria-label": cancelButtonAriaLabel,
    onClick: props.onClose
  }, cancelButtonText));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/stored-searches.js
var _excluded13 = ["_highlightResult", "_snippetResult"];
function _objectWithoutProperties11(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose11(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose11(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function isLocalStorageSupported() {
  var key = "__TEST_KEY__";
  try {
    localStorage.setItem(key, "");
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}
function createStorage(key) {
  if (isLocalStorageSupported() === false) {
    return {
      setItem: function setItem() {
      },
      getItem: function getItem() {
        return [];
      }
    };
  }
  return {
    setItem: function setItem(item) {
      return window.localStorage.setItem(key, JSON.stringify(item));
    },
    getItem: function getItem() {
      var item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    }
  };
}
function createStoredSearches(_ref) {
  var key = _ref.key, _ref$limit = _ref.limit, limit = _ref$limit === void 0 ? 5 : _ref$limit;
  var storage = createStorage(key);
  var items = storage.getItem().slice(0, limit);
  return {
    add: function add(item) {
      var _ref2 = item, _highlightResult = _ref2._highlightResult, _snippetResult = _ref2._snippetResult, hit = _objectWithoutProperties11(_ref2, _excluded13);
      var isQueryAlreadySaved = items.findIndex(function(x) {
        return x.objectID === hit.objectID;
      });
      if (isQueryAlreadySaved > -1) {
        items.splice(isQueryAlreadySaved, 1);
      }
      items.unshift(hit);
      items = items.slice(0, limit);
      storage.setItem(items);
    },
    remove: function remove(item) {
      items = items.filter(function(x) {
        return x.objectID !== item.objectID;
      });
      storage.setItem(items);
    },
    getAll: function getAll() {
      return items;
    }
  };
}

// ../../node_modules/.pnpm/algoliasearch@4.20.0/node_modules/algoliasearch/dist/algoliasearch-lite.esm.browser.js
function createBrowserLocalStorageCache(options) {
  const namespaceKey = `algoliasearch-client-js-${options.key}`;
  let storage;
  const getStorage = () => {
    if (storage === void 0) {
      storage = options.localStorage || window.localStorage;
    }
    return storage;
  };
  const getNamespace = () => {
    return JSON.parse(getStorage().getItem(namespaceKey) || "{}");
  };
  const setNamespace = (namespace) => {
    getStorage().setItem(namespaceKey, JSON.stringify(namespace));
  };
  const removeOutdatedCacheItems = () => {
    const timeToLive = options.timeToLive ? options.timeToLive * 1e3 : null;
    const namespace = getNamespace();
    const filteredNamespaceWithoutOldFormattedCacheItems = Object.fromEntries(Object.entries(namespace).filter(([, cacheItem]) => {
      return cacheItem.timestamp !== void 0;
    }));
    setNamespace(filteredNamespaceWithoutOldFormattedCacheItems);
    if (!timeToLive)
      return;
    const filteredNamespaceWithoutExpiredItems = Object.fromEntries(Object.entries(filteredNamespaceWithoutOldFormattedCacheItems).filter(([, cacheItem]) => {
      const currentTimestamp = (/* @__PURE__ */ new Date()).getTime();
      const isExpired = cacheItem.timestamp + timeToLive < currentTimestamp;
      return !isExpired;
    }));
    setNamespace(filteredNamespaceWithoutExpiredItems);
  };
  return {
    get(key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      return Promise.resolve().then(() => {
        removeOutdatedCacheItems();
        const keyAsString = JSON.stringify(key);
        return getNamespace()[keyAsString];
      }).then((value) => {
        return Promise.all([value ? value.value : defaultValue(), value !== void 0]);
      }).then(([value, exists]) => {
        return Promise.all([value, exists || events.miss(value)]);
      }).then(([value]) => value);
    },
    set(key, value) {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();
        namespace[JSON.stringify(key)] = {
          timestamp: (/* @__PURE__ */ new Date()).getTime(),
          value
        };
        getStorage().setItem(namespaceKey, JSON.stringify(namespace));
        return value;
      });
    },
    delete(key) {
      return Promise.resolve().then(() => {
        const namespace = getNamespace();
        delete namespace[JSON.stringify(key)];
        getStorage().setItem(namespaceKey, JSON.stringify(namespace));
      });
    },
    clear() {
      return Promise.resolve().then(() => {
        getStorage().removeItem(namespaceKey);
      });
    }
  };
}
function createFallbackableCache(options) {
  const caches = [...options.caches];
  const current = caches.shift();
  if (current === void 0) {
    return createNullCache();
  }
  return {
    get(key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      return current.get(key, defaultValue, events).catch(() => {
        return createFallbackableCache({ caches }).get(key, defaultValue, events);
      });
    },
    set(key, value) {
      return current.set(key, value).catch(() => {
        return createFallbackableCache({ caches }).set(key, value);
      });
    },
    delete(key) {
      return current.delete(key).catch(() => {
        return createFallbackableCache({ caches }).delete(key);
      });
    },
    clear() {
      return current.clear().catch(() => {
        return createFallbackableCache({ caches }).clear();
      });
    }
  };
}
function createNullCache() {
  return {
    get(_key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      const value = defaultValue();
      return value.then((result) => Promise.all([result, events.miss(result)])).then(([result]) => result);
    },
    set(_key, value) {
      return Promise.resolve(value);
    },
    delete(_key) {
      return Promise.resolve();
    },
    clear() {
      return Promise.resolve();
    }
  };
}
function createInMemoryCache(options = { serializable: true }) {
  let cache = {};
  return {
    get(key, defaultValue, events = {
      miss: () => Promise.resolve()
    }) {
      const keyAsString = JSON.stringify(key);
      if (keyAsString in cache) {
        return Promise.resolve(options.serializable ? JSON.parse(cache[keyAsString]) : cache[keyAsString]);
      }
      const promise = defaultValue();
      const miss = events && events.miss || (() => Promise.resolve());
      return promise.then((value) => miss(value)).then(() => promise);
    },
    set(key, value) {
      cache[JSON.stringify(key)] = options.serializable ? JSON.stringify(value) : value;
      return Promise.resolve(value);
    },
    delete(key) {
      delete cache[JSON.stringify(key)];
      return Promise.resolve();
    },
    clear() {
      cache = {};
      return Promise.resolve();
    }
  };
}
function createAuth(authMode, appId, apiKey) {
  const credentials = {
    "x-algolia-api-key": apiKey,
    "x-algolia-application-id": appId
  };
  return {
    headers() {
      return authMode === AuthMode.WithinHeaders ? credentials : {};
    },
    queryParameters() {
      return authMode === AuthMode.WithinQueryParameters ? credentials : {};
    }
  };
}
function shuffle(array) {
  let c = array.length - 1;
  for (c; c > 0; c--) {
    const b = Math.floor(Math.random() * (c + 1));
    const a = array[c];
    array[c] = array[b];
    array[b] = a;
  }
  return array;
}
function addMethods(base, methods) {
  if (!methods) {
    return base;
  }
  Object.keys(methods).forEach((key) => {
    base[key] = methods[key](base);
  });
  return base;
}
function encode(format, ...args) {
  let i = 0;
  return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
}
var version2 = "4.20.0";
var AuthMode = {
  /**
   * If auth credentials should be in query parameters.
   */
  WithinQueryParameters: 0,
  /**
   * If auth credentials should be in headers.
   */
  WithinHeaders: 1
};
function createMappedRequestOptions(requestOptions, timeout) {
  const options = requestOptions || {};
  const data = options.data || {};
  Object.keys(options).forEach((key) => {
    if (["timeout", "headers", "queryParameters", "data", "cacheable"].indexOf(key) === -1) {
      data[key] = options[key];
    }
  });
  return {
    data: Object.entries(data).length > 0 ? data : void 0,
    timeout: options.timeout || timeout,
    headers: options.headers || {},
    queryParameters: options.queryParameters || {},
    cacheable: options.cacheable
  };
}
var CallEnum = {
  /**
   * If the host is read only.
   */
  Read: 1,
  /**
   * If the host is write only.
   */
  Write: 2,
  /**
   * If the host is both read and write.
   */
  Any: 3
};
var HostStatusEnum = {
  Up: 1,
  Down: 2,
  Timeouted: 3
};
var EXPIRATION_DELAY = 2 * 60 * 1e3;
function createStatefulHost(host, status = HostStatusEnum.Up) {
  return {
    ...host,
    status,
    lastUpdate: Date.now()
  };
}
function isStatefulHostUp(host) {
  return host.status === HostStatusEnum.Up || Date.now() - host.lastUpdate > EXPIRATION_DELAY;
}
function isStatefulHostTimeouted(host) {
  return host.status === HostStatusEnum.Timeouted && Date.now() - host.lastUpdate <= EXPIRATION_DELAY;
}
function createStatelessHost(options) {
  if (typeof options === "string") {
    return {
      protocol: "https",
      url: options,
      accept: CallEnum.Any
    };
  }
  return {
    protocol: options.protocol || "https",
    url: options.url,
    accept: options.accept || CallEnum.Any
  };
}
var MethodEnum = {
  Delete: "DELETE",
  Get: "GET",
  Post: "POST",
  Put: "PUT"
};
function createRetryableOptions(hostsCache, statelessHosts) {
  return Promise.all(statelessHosts.map((statelessHost) => {
    return hostsCache.get(statelessHost, () => {
      return Promise.resolve(createStatefulHost(statelessHost));
    });
  })).then((statefulHosts) => {
    const hostsUp = statefulHosts.filter((host) => isStatefulHostUp(host));
    const hostsTimeouted = statefulHosts.filter((host) => isStatefulHostTimeouted(host));
    const hostsAvailable = [...hostsUp, ...hostsTimeouted];
    const statelessHostsAvailable = hostsAvailable.length > 0 ? hostsAvailable.map((host) => createStatelessHost(host)) : statelessHosts;
    return {
      getTimeout(timeoutsCount, baseTimeout) {
        const timeoutMultiplier = hostsTimeouted.length === 0 && timeoutsCount === 0 ? 1 : hostsTimeouted.length + 3 + timeoutsCount;
        return timeoutMultiplier * baseTimeout;
      },
      statelessHosts: statelessHostsAvailable
    };
  });
}
var isNetworkError = ({ isTimedOut, status }) => {
  return !isTimedOut && ~~status === 0;
};
var isRetryable = (response) => {
  const status = response.status;
  const isTimedOut = response.isTimedOut;
  return isTimedOut || isNetworkError(response) || ~~(status / 100) !== 2 && ~~(status / 100) !== 4;
};
var isSuccess = ({ status }) => {
  return ~~(status / 100) === 2;
};
var retryDecision = (response, outcomes) => {
  if (isRetryable(response)) {
    return outcomes.onRetry(response);
  }
  if (isSuccess(response)) {
    return outcomes.onSuccess(response);
  }
  return outcomes.onFail(response);
};
function retryableRequest(transporter, statelessHosts, request, requestOptions) {
  const stackTrace = [];
  const data = serializeData(request, requestOptions);
  const headers = serializeHeaders(transporter, requestOptions);
  const method = request.method;
  const dataQueryParameters = request.method !== MethodEnum.Get ? {} : {
    ...request.data,
    ...requestOptions.data
  };
  const queryParameters = {
    "x-algolia-agent": transporter.userAgent.value,
    ...transporter.queryParameters,
    ...dataQueryParameters,
    ...requestOptions.queryParameters
  };
  let timeoutsCount = 0;
  const retry = (hosts, getTimeout) => {
    const host = hosts.pop();
    if (host === void 0) {
      throw createRetryError(stackTraceWithoutCredentials(stackTrace));
    }
    const payload = {
      data,
      headers,
      method,
      url: serializeUrl(host, request.path, queryParameters),
      connectTimeout: getTimeout(timeoutsCount, transporter.timeouts.connect),
      responseTimeout: getTimeout(timeoutsCount, requestOptions.timeout)
    };
    const pushToStackTrace = (response) => {
      const stackFrame = {
        request: payload,
        response,
        host,
        triesLeft: hosts.length
      };
      stackTrace.push(stackFrame);
      return stackFrame;
    };
    const decisions = {
      onSuccess: (response) => deserializeSuccess(response),
      onRetry(response) {
        const stackFrame = pushToStackTrace(response);
        if (response.isTimedOut) {
          timeoutsCount++;
        }
        return Promise.all([
          /**
           * Failures are individually send the logger, allowing
           * the end user to debug / store stack frames even
           * when a retry error does not happen.
           */
          transporter.logger.info("Retryable failure", stackFrameWithoutCredentials(stackFrame)),
          /**
           * We also store the state of the host in failure cases. If the host, is
           * down it will remain down for the next 2 minutes. In a timeout situation,
           * this host will be added end of the list of hosts on the next request.
           */
          transporter.hostsCache.set(host, createStatefulHost(host, response.isTimedOut ? HostStatusEnum.Timeouted : HostStatusEnum.Down))
        ]).then(() => retry(hosts, getTimeout));
      },
      onFail(response) {
        pushToStackTrace(response);
        throw deserializeFailure(response, stackTraceWithoutCredentials(stackTrace));
      }
    };
    return transporter.requester.send(payload).then((response) => {
      return retryDecision(response, decisions);
    });
  };
  return createRetryableOptions(transporter.hostsCache, statelessHosts).then((options) => {
    return retry([...options.statelessHosts].reverse(), options.getTimeout);
  });
}
function createTransporter(options) {
  const { hostsCache, logger, requester, requestsCache, responsesCache, timeouts, userAgent, hosts, queryParameters, headers } = options;
  const transporter = {
    hostsCache,
    logger,
    requester,
    requestsCache,
    responsesCache,
    timeouts,
    userAgent,
    headers,
    queryParameters,
    hosts: hosts.map((host) => createStatelessHost(host)),
    read(request, requestOptions) {
      const mappedRequestOptions = createMappedRequestOptions(requestOptions, transporter.timeouts.read);
      const createRetryableRequest = () => {
        return retryableRequest(transporter, transporter.hosts.filter((host) => (host.accept & CallEnum.Read) !== 0), request, mappedRequestOptions);
      };
      const cacheable = mappedRequestOptions.cacheable !== void 0 ? mappedRequestOptions.cacheable : request.cacheable;
      if (cacheable !== true) {
        return createRetryableRequest();
      }
      const key = {
        request,
        mappedRequestOptions,
        transporter: {
          queryParameters: transporter.queryParameters,
          headers: transporter.headers
        }
      };
      return transporter.responsesCache.get(key, () => {
        return transporter.requestsCache.get(key, () => {
          return transporter.requestsCache.set(key, createRetryableRequest()).then((response) => Promise.all([transporter.requestsCache.delete(key), response]), (err) => Promise.all([transporter.requestsCache.delete(key), Promise.reject(err)])).then(([_, response]) => response);
        });
      }, {
        /**
         * Of course, once we get this response back from the server, we
         * tell response cache to actually store the received response
         * to be used later.
         */
        miss: (response) => transporter.responsesCache.set(key, response)
      });
    },
    write(request, requestOptions) {
      return retryableRequest(transporter, transporter.hosts.filter((host) => (host.accept & CallEnum.Write) !== 0), request, createMappedRequestOptions(requestOptions, transporter.timeouts.write));
    }
  };
  return transporter;
}
function createUserAgent(version4) {
  const userAgent = {
    value: `Algolia for JavaScript (${version4})`,
    add(options) {
      const addedUserAgent = `; ${options.segment}${options.version !== void 0 ? ` (${options.version})` : ""}`;
      if (userAgent.value.indexOf(addedUserAgent) === -1) {
        userAgent.value = `${userAgent.value}${addedUserAgent}`;
      }
      return userAgent;
    }
  };
  return userAgent;
}
function deserializeSuccess(response) {
  try {
    return JSON.parse(response.content);
  } catch (e) {
    throw createDeserializationError(e.message, response);
  }
}
function deserializeFailure({ content, status }, stackFrame) {
  let message = content;
  try {
    message = JSON.parse(content).message;
  } catch (e) {
  }
  return createApiError(message, status, stackFrame);
}
function serializeUrl(host, path, queryParameters) {
  const queryParametersAsString = serializeQueryParameters(queryParameters);
  let url = `${host.protocol}://${host.url}/${path.charAt(0) === "/" ? path.substr(1) : path}`;
  if (queryParametersAsString.length) {
    url += `?${queryParametersAsString}`;
  }
  return url;
}
function serializeQueryParameters(parameters) {
  const isObjectOrArray = (value) => Object.prototype.toString.call(value) === "[object Object]" || Object.prototype.toString.call(value) === "[object Array]";
  return Object.keys(parameters).map((key) => encode("%s=%s", key, isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key])).join("&");
}
function serializeData(request, requestOptions) {
  if (request.method === MethodEnum.Get || request.data === void 0 && requestOptions.data === void 0) {
    return void 0;
  }
  const data = Array.isArray(request.data) ? request.data : { ...request.data, ...requestOptions.data };
  return JSON.stringify(data);
}
function serializeHeaders(transporter, requestOptions) {
  const headers = {
    ...transporter.headers,
    ...requestOptions.headers
  };
  const serializedHeaders = {};
  Object.keys(headers).forEach((header) => {
    const value = headers[header];
    serializedHeaders[header.toLowerCase()] = value;
  });
  return serializedHeaders;
}
function stackTraceWithoutCredentials(stackTrace) {
  return stackTrace.map((stackFrame) => stackFrameWithoutCredentials(stackFrame));
}
function stackFrameWithoutCredentials(stackFrame) {
  const modifiedHeaders = stackFrame.request.headers["x-algolia-api-key"] ? { "x-algolia-api-key": "*****" } : {};
  return {
    ...stackFrame,
    request: {
      ...stackFrame.request,
      headers: {
        ...stackFrame.request.headers,
        ...modifiedHeaders
      }
    }
  };
}
function createApiError(message, status, transporterStackTrace) {
  return {
    name: "ApiError",
    message,
    status,
    transporterStackTrace
  };
}
function createDeserializationError(message, response) {
  return {
    name: "DeserializationError",
    message,
    response
  };
}
function createRetryError(transporterStackTrace) {
  return {
    name: "RetryError",
    message: "Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.",
    transporterStackTrace
  };
}
var createSearchClient = (options) => {
  const appId = options.appId;
  const auth = createAuth(options.authMode !== void 0 ? options.authMode : AuthMode.WithinHeaders, appId, options.apiKey);
  const transporter = createTransporter({
    hosts: [
      { url: `${appId}-dsn.algolia.net`, accept: CallEnum.Read },
      { url: `${appId}.algolia.net`, accept: CallEnum.Write }
    ].concat(shuffle([
      { url: `${appId}-1.algolianet.com` },
      { url: `${appId}-2.algolianet.com` },
      { url: `${appId}-3.algolianet.com` }
    ])),
    ...options,
    headers: {
      ...auth.headers(),
      ...{ "content-type": "application/x-www-form-urlencoded" },
      ...options.headers
    },
    queryParameters: {
      ...auth.queryParameters(),
      ...options.queryParameters
    }
  });
  const base = {
    transporter,
    appId,
    addAlgoliaAgent(segment, version4) {
      transporter.userAgent.add({ segment, version: version4 });
    },
    clearCache() {
      return Promise.all([
        transporter.requestsCache.clear(),
        transporter.responsesCache.clear()
      ]).then(() => void 0);
    }
  };
  return addMethods(base, options.methods);
};
var customRequest = (base) => {
  return (request, requestOptions) => {
    if (request.method === MethodEnum.Get) {
      return base.transporter.read(request, requestOptions);
    }
    return base.transporter.write(request, requestOptions);
  };
};
var initIndex = (base) => {
  return (indexName, options = {}) => {
    const searchIndex = {
      transporter: base.transporter,
      appId: base.appId,
      indexName
    };
    return addMethods(searchIndex, options.methods);
  };
};
var multipleQueries = (base) => {
  return (queries, requestOptions) => {
    const requests = queries.map((query) => {
      return {
        ...query,
        params: serializeQueryParameters(query.params || {})
      };
    });
    return base.transporter.read({
      method: MethodEnum.Post,
      path: "1/indexes/*/queries",
      data: {
        requests
      },
      cacheable: true
    }, requestOptions);
  };
};
var multipleSearchForFacetValues = (base) => {
  return (queries, requestOptions) => {
    return Promise.all(queries.map((query) => {
      const { facetName, facetQuery, ...params } = query.params;
      return initIndex(base)(query.indexName, {
        methods: { searchForFacetValues }
      }).searchForFacetValues(facetName, facetQuery, {
        ...requestOptions,
        ...params
      });
    }));
  };
};
var findAnswers = (base) => {
  return (query, queryLanguages, requestOptions) => {
    return base.transporter.read({
      method: MethodEnum.Post,
      path: encode("1/answers/%s/prediction", base.indexName),
      data: {
        query,
        queryLanguages
      },
      cacheable: true
    }, requestOptions);
  };
};
var search = (base) => {
  return (query, requestOptions) => {
    return base.transporter.read({
      method: MethodEnum.Post,
      path: encode("1/indexes/%s/query", base.indexName),
      data: {
        query
      },
      cacheable: true
    }, requestOptions);
  };
};
var searchForFacetValues = (base) => {
  return (facetName, facetQuery, requestOptions) => {
    return base.transporter.read({
      method: MethodEnum.Post,
      path: encode("1/indexes/%s/facets/%s/query", base.indexName, facetName),
      data: {
        facetQuery
      },
      cacheable: true
    }, requestOptions);
  };
};
var LogLevelEnum = {
  Debug: 1,
  Info: 2,
  Error: 3
};
function createConsoleLogger(logLevel) {
  return {
    debug(message, args) {
      if (LogLevelEnum.Debug >= logLevel) {
        console.debug(message, args);
      }
      return Promise.resolve();
    },
    info(message, args) {
      if (LogLevelEnum.Info >= logLevel) {
        console.info(message, args);
      }
      return Promise.resolve();
    },
    error(message, args) {
      console.error(message, args);
      return Promise.resolve();
    }
  };
}
function createBrowserXhrRequester() {
  return {
    send(request) {
      return new Promise((resolve2) => {
        const baseRequester = new XMLHttpRequest();
        baseRequester.open(request.method, request.url, true);
        Object.keys(request.headers).forEach((key) => baseRequester.setRequestHeader(key, request.headers[key]));
        const createTimeout = (timeout, content) => {
          return setTimeout(() => {
            baseRequester.abort();
            resolve2({
              status: 0,
              content,
              isTimedOut: true
            });
          }, timeout * 1e3);
        };
        const connectTimeout = createTimeout(request.connectTimeout, "Connection timeout");
        let responseTimeout;
        baseRequester.onreadystatechange = () => {
          if (baseRequester.readyState > baseRequester.OPENED && responseTimeout === void 0) {
            clearTimeout(connectTimeout);
            responseTimeout = createTimeout(request.responseTimeout, "Socket timeout");
          }
        };
        baseRequester.onerror = () => {
          if (baseRequester.status === 0) {
            clearTimeout(connectTimeout);
            clearTimeout(responseTimeout);
            resolve2({
              content: baseRequester.responseText || "Network request failed",
              status: baseRequester.status,
              isTimedOut: false
            });
          }
        };
        baseRequester.onload = () => {
          clearTimeout(connectTimeout);
          clearTimeout(responseTimeout);
          resolve2({
            content: baseRequester.responseText,
            status: baseRequester.status,
            isTimedOut: false
          });
        };
        baseRequester.send(request.data);
      });
    }
  };
}
function algoliasearch(appId, apiKey, options) {
  const commonOptions = {
    appId,
    apiKey,
    timeouts: {
      connect: 1,
      read: 2,
      write: 30
    },
    requester: createBrowserXhrRequester(),
    logger: createConsoleLogger(LogLevelEnum.Error),
    responsesCache: createInMemoryCache(),
    requestsCache: createInMemoryCache({ serializable: false }),
    hostsCache: createFallbackableCache({
      caches: [
        createBrowserLocalStorageCache({ key: `${version2}-${appId}` }),
        createInMemoryCache()
      ]
    }),
    userAgent: createUserAgent(version2).add({
      segment: "Browser",
      version: "lite"
    }),
    authMode: AuthMode.WithinQueryParameters
  };
  return createSearchClient({
    ...commonOptions,
    ...options,
    methods: {
      search: multipleQueries,
      searchForFacetValues: multipleSearchForFacetValues,
      multipleQueries,
      multipleSearchForFacetValues,
      customRequest,
      initIndex: (base) => (indexName) => {
        return initIndex(base)(indexName, {
          methods: { search, searchForFacetValues, findAnswers }
        });
      }
    }
  });
}
algoliasearch.version = version2;
var algoliasearch_lite_esm_browser_default = algoliasearch;

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/useSearchClient.js
var import_react24 = __toESM(require_react());

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/version.js
var version3 = "3.5.2";

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/useSearchClient.js
function useSearchClient(appId, apiKey, transformSearchClient) {
  var searchClient = import_react24.default.useMemo(function() {
    var client = algoliasearch_lite_esm_browser_default(appId, apiKey);
    client.addAlgoliaAgent("docsearch", version3);
    if (/docsearch.js \(.*\)/.test(client.transporter.userAgent.value) === false) {
      client.addAlgoliaAgent("docsearch-react", version3);
    }
    return transformSearchClient(client);
  }, [appId, apiKey, transformSearchClient]);
  return searchClient;
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/useTouchEvents.js
var import_react25 = __toESM(require_react());
function useTouchEvents(_ref) {
  var getEnvironmentProps = _ref.getEnvironmentProps, panelElement = _ref.panelElement, formElement = _ref.formElement, inputElement = _ref.inputElement;
  import_react25.default.useEffect(function() {
    if (!(panelElement && formElement && inputElement)) {
      return void 0;
    }
    var _getEnvironmentProps = getEnvironmentProps({
      panelElement,
      formElement,
      inputElement
    }), onTouchStart = _getEnvironmentProps.onTouchStart, onTouchMove = _getEnvironmentProps.onTouchMove;
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    return function() {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [getEnvironmentProps, panelElement, formElement, inputElement]);
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/useTrapFocus.js
var import_react26 = __toESM(require_react());
function useTrapFocus(_ref) {
  var container = _ref.container;
  import_react26.default.useEffect(function() {
    if (!container) {
      return void 0;
    }
    var focusableElements = container.querySelectorAll("a[href]:not([disabled]), button:not([disabled]), input:not([disabled])");
    var firstElement = focusableElements[0];
    var lastElement = focusableElements[focusableElements.length - 1];
    function trapFocus(event) {
      if (event.key !== "Tab") {
        return;
      }
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
    container.addEventListener("keydown", trapFocus);
    return function() {
      container.removeEventListener("keydown", trapFocus);
    };
  }, [container]);
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/DocSearchModal.js
var _excluded14 = ["footer", "searchBox"];
function _extends7() {
  _extends7 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends7.apply(this, arguments);
}
function ownKeys16(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread16(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys16(Object(source), true).forEach(function(key) {
      _defineProperty16(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys16(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _defineProperty16(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _slicedToArray5(arr, i) {
  return _arrayWithHoles5(arr) || _iterableToArrayLimit5(arr, i) || _unsupportedIterableToArray10(arr, i) || _nonIterableRest5();
}
function _nonIterableRest5() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray10(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray10(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray10(o, minLen);
}
function _arrayLikeToArray10(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit5(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles5(arr) {
  if (Array.isArray(arr)) return arr;
}
function _objectWithoutProperties12(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose12(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose12(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function DocSearchModal(_ref) {
  var appId = _ref.appId, apiKey = _ref.apiKey, indexName = _ref.indexName, _ref$placeholder = _ref.placeholder, placeholder = _ref$placeholder === void 0 ? "Search docs" : _ref$placeholder, searchParameters = _ref.searchParameters, maxResultsPerGroup = _ref.maxResultsPerGroup, _ref$onClose = _ref.onClose, onClose = _ref$onClose === void 0 ? noop3 : _ref$onClose, _ref$transformItems = _ref.transformItems, transformItems = _ref$transformItems === void 0 ? identity : _ref$transformItems, _ref$hitComponent = _ref.hitComponent, hitComponent = _ref$hitComponent === void 0 ? Hit : _ref$hitComponent, _ref$resultsFooterCom = _ref.resultsFooterComponent, resultsFooterComponent = _ref$resultsFooterCom === void 0 ? function() {
    return null;
  } : _ref$resultsFooterCom, navigator2 = _ref.navigator, _ref$initialScrollY = _ref.initialScrollY, initialScrollY = _ref$initialScrollY === void 0 ? 0 : _ref$initialScrollY, _ref$transformSearchC = _ref.transformSearchClient, transformSearchClient = _ref$transformSearchC === void 0 ? identity : _ref$transformSearchC, _ref$disableUserPerso = _ref.disableUserPersonalization, disableUserPersonalization = _ref$disableUserPerso === void 0 ? false : _ref$disableUserPerso, _ref$initialQuery = _ref.initialQuery, initialQueryFromProp = _ref$initialQuery === void 0 ? "" : _ref$initialQuery, _ref$translations = _ref.translations, translations = _ref$translations === void 0 ? {} : _ref$translations, getMissingResultsUrl = _ref.getMissingResultsUrl, _ref$insights = _ref.insights, insights = _ref$insights === void 0 ? false : _ref$insights;
  var footerTranslations = translations.footer, searchBoxTranslations = translations.searchBox, screenStateTranslations = _objectWithoutProperties12(translations, _excluded14);
  var _React$useState = import_react27.default.useState({
    query: "",
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    activeItemId: null,
    status: "idle"
  }), _React$useState2 = _slicedToArray5(_React$useState, 2), state = _React$useState2[0], setState = _React$useState2[1];
  var containerRef = import_react27.default.useRef(null);
  var modalRef = import_react27.default.useRef(null);
  var formElementRef = import_react27.default.useRef(null);
  var dropdownRef = import_react27.default.useRef(null);
  var inputRef = import_react27.default.useRef(null);
  var snippetLength = import_react27.default.useRef(10);
  var initialQueryFromSelection = import_react27.default.useRef(typeof window !== "undefined" ? window.getSelection().toString().slice(0, MAX_QUERY_SIZE) : "").current;
  var initialQuery = import_react27.default.useRef(initialQueryFromProp || initialQueryFromSelection).current;
  var searchClient = useSearchClient(appId, apiKey, transformSearchClient);
  var favoriteSearches = import_react27.default.useRef(createStoredSearches({
    key: "__DOCSEARCH_FAVORITE_SEARCHES__".concat(indexName),
    limit: 10
  })).current;
  var recentSearches = import_react27.default.useRef(createStoredSearches({
    key: "__DOCSEARCH_RECENT_SEARCHES__".concat(indexName),
    // We display 7 recent searches and there's no favorites, but only
    // 4 when there are favorites.
    limit: favoriteSearches.getAll().length === 0 ? 7 : 4
  })).current;
  var saveRecentSearch = import_react27.default.useCallback(function saveRecentSearch2(item) {
    if (disableUserPersonalization) {
      return;
    }
    var search2 = item.type === "content" ? item.__docsearch_parent : item;
    if (search2 && favoriteSearches.getAll().findIndex(function(x) {
      return x.objectID === search2.objectID;
    }) === -1) {
      recentSearches.add(search2);
    }
  }, [favoriteSearches, recentSearches, disableUserPersonalization]);
  var sendItemClickEvent = import_react27.default.useCallback(function(item) {
    if (!state.context.algoliaInsightsPlugin || !item.__autocomplete_id) return;
    var insightsItem = item;
    var insightsClickParams = {
      eventName: "Item Selected",
      index: insightsItem.__autocomplete_indexName,
      items: [insightsItem],
      positions: [item.__autocomplete_id],
      queryID: insightsItem.__autocomplete_queryID
    };
    state.context.algoliaInsightsPlugin.insights.clickedObjectIDsAfterSearch(insightsClickParams);
  }, [state.context.algoliaInsightsPlugin]);
  var autocomplete = import_react27.default.useMemo(function() {
    return createAutocomplete({
      id: "docsearch",
      defaultActiveItemId: 0,
      placeholder,
      openOnFocus: true,
      initialState: {
        query: initialQuery,
        context: {
          searchSuggestions: []
        }
      },
      insights,
      navigator: navigator2,
      onStateChange: function onStateChange(props) {
        setState(props.state);
      },
      getSources: function getSources(_ref2) {
        var query = _ref2.query, sourcesState = _ref2.state, setContext = _ref2.setContext, setStatus = _ref2.setStatus;
        if (!query) {
          if (disableUserPersonalization) {
            return [];
          }
          return [{
            sourceId: "recentSearches",
            onSelect: function onSelect(_ref3) {
              var item = _ref3.item, event = _ref3.event;
              saveRecentSearch(item);
              if (!isModifierEvent(event)) {
                onClose();
              }
            },
            getItemUrl: function getItemUrl(_ref4) {
              var item = _ref4.item;
              return item.url;
            },
            getItems: function getItems() {
              return recentSearches.getAll();
            }
          }, {
            sourceId: "favoriteSearches",
            onSelect: function onSelect(_ref5) {
              var item = _ref5.item, event = _ref5.event;
              saveRecentSearch(item);
              if (!isModifierEvent(event)) {
                onClose();
              }
            },
            getItemUrl: function getItemUrl(_ref6) {
              var item = _ref6.item;
              return item.url;
            },
            getItems: function getItems() {
              return favoriteSearches.getAll();
            }
          }];
        }
        var insightsActive = Boolean(insights);
        return searchClient.search([{
          query,
          indexName,
          params: _objectSpread16({
            attributesToRetrieve: ["hierarchy.lvl0", "hierarchy.lvl1", "hierarchy.lvl2", "hierarchy.lvl3", "hierarchy.lvl4", "hierarchy.lvl5", "hierarchy.lvl6", "content", "type", "url"],
            attributesToSnippet: ["hierarchy.lvl1:".concat(snippetLength.current), "hierarchy.lvl2:".concat(snippetLength.current), "hierarchy.lvl3:".concat(snippetLength.current), "hierarchy.lvl4:".concat(snippetLength.current), "hierarchy.lvl5:".concat(snippetLength.current), "hierarchy.lvl6:".concat(snippetLength.current), "content:".concat(snippetLength.current)],
            snippetEllipsisText: "…",
            highlightPreTag: "<mark>",
            highlightPostTag: "</mark>",
            hitsPerPage: 20,
            clickAnalytics: insightsActive
          }, searchParameters)
        }]).catch(function(error) {
          if (error.name === "RetryError") {
            setStatus("error");
          }
          throw error;
        }).then(function(_ref7) {
          var results = _ref7.results;
          var firstResult = results[0];
          var hits = firstResult.hits, nbHits = firstResult.nbHits;
          var sources = groupBy(hits, function(hit) {
            return removeHighlightTags(hit);
          }, maxResultsPerGroup);
          if (sourcesState.context.searchSuggestions.length < Object.keys(sources).length) {
            setContext({
              searchSuggestions: Object.keys(sources)
            });
          }
          setContext({
            nbHits
          });
          var insightsParams = {};
          if (insightsActive) {
            insightsParams = {
              __autocomplete_indexName: indexName,
              __autocomplete_queryID: firstResult.queryID,
              __autocomplete_algoliaCredentials: {
                appId,
                apiKey
              }
            };
          }
          return Object.values(sources).map(function(items, index) {
            return {
              sourceId: "hits".concat(index),
              onSelect: function onSelect(_ref8) {
                var item = _ref8.item, event = _ref8.event;
                saveRecentSearch(item);
                if (!isModifierEvent(event)) {
                  onClose();
                }
              },
              getItemUrl: function getItemUrl(_ref9) {
                var item = _ref9.item;
                return item.url;
              },
              getItems: function getItems() {
                return Object.values(groupBy(items, function(item) {
                  return item.hierarchy.lvl1;
                }, maxResultsPerGroup)).map(transformItems).map(function(groupedHits) {
                  return groupedHits.map(function(item) {
                    var parent = null;
                    var potentialParent = groupedHits.find(function(siblingItem) {
                      return siblingItem.type === "lvl1" && siblingItem.hierarchy.lvl1 === item.hierarchy.lvl1;
                    });
                    if (item.type !== "lvl1" && potentialParent) {
                      parent = potentialParent;
                    }
                    return _objectSpread16(_objectSpread16({}, item), {}, {
                      __docsearch_parent: parent
                    }, insightsParams);
                  });
                }).flat();
              }
            };
          });
        });
      }
    });
  }, [indexName, searchParameters, maxResultsPerGroup, searchClient, onClose, recentSearches, favoriteSearches, saveRecentSearch, initialQuery, placeholder, navigator2, transformItems, disableUserPersonalization, insights, appId, apiKey]);
  var getEnvironmentProps = autocomplete.getEnvironmentProps, getRootProps = autocomplete.getRootProps, refresh = autocomplete.refresh;
  useTouchEvents({
    getEnvironmentProps,
    panelElement: dropdownRef.current,
    formElement: formElementRef.current,
    inputElement: inputRef.current
  });
  useTrapFocus({
    container: containerRef.current
  });
  import_react27.default.useEffect(function() {
    document.body.classList.add("DocSearch--active");
    return function() {
      var _window$scrollTo, _window;
      document.body.classList.remove("DocSearch--active");
      (_window$scrollTo = (_window = window).scrollTo) === null || _window$scrollTo === void 0 ? void 0 : _window$scrollTo.call(_window, 0, initialScrollY);
    };
  }, []);
  import_react27.default.useEffect(function() {
    var isMobileMediaQuery = window.matchMedia("(max-width: 768px)");
    if (isMobileMediaQuery.matches) {
      snippetLength.current = 5;
    }
  }, []);
  import_react27.default.useEffect(function() {
    if (dropdownRef.current) {
      dropdownRef.current.scrollTop = 0;
    }
  }, [state.query]);
  import_react27.default.useEffect(function() {
    if (initialQuery.length > 0) {
      refresh();
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [initialQuery, refresh]);
  import_react27.default.useEffect(function() {
    function setFullViewportHeight() {
      if (modalRef.current) {
        var vh = window.innerHeight * 0.01;
        modalRef.current.style.setProperty("--docsearch-vh", "".concat(vh, "px"));
      }
    }
    setFullViewportHeight();
    window.addEventListener("resize", setFullViewportHeight);
    return function() {
      window.removeEventListener("resize", setFullViewportHeight);
    };
  }, []);
  return import_react27.default.createElement("div", _extends7({
    ref: containerRef
  }, getRootProps({
    "aria-expanded": true
  }), {
    className: ["DocSearch", "DocSearch-Container", state.status === "stalled" && "DocSearch-Container--Stalled", state.status === "error" && "DocSearch-Container--Errored"].filter(Boolean).join(" "),
    role: "button",
    tabIndex: 0,
    onMouseDown: function onMouseDown(event) {
      if (event.target === event.currentTarget) {
        onClose();
      }
    }
  }), import_react27.default.createElement("div", {
    className: "DocSearch-Modal",
    ref: modalRef
  }, import_react27.default.createElement("header", {
    className: "DocSearch-SearchBar",
    ref: formElementRef
  }, import_react27.default.createElement(SearchBox, _extends7({}, autocomplete, {
    state,
    autoFocus: initialQuery.length === 0,
    inputRef,
    isFromSelection: Boolean(initialQuery) && initialQuery === initialQueryFromSelection,
    translations: searchBoxTranslations,
    onClose
  }))), import_react27.default.createElement("div", {
    className: "DocSearch-Dropdown",
    ref: dropdownRef
  }, import_react27.default.createElement(ScreenState, _extends7({}, autocomplete, {
    indexName,
    state,
    hitComponent,
    resultsFooterComponent,
    disableUserPersonalization,
    recentSearches,
    favoriteSearches,
    inputRef,
    translations: screenStateTranslations,
    getMissingResultsUrl,
    onItemClick: function onItemClick(item, event) {
      sendItemClickEvent(item);
      saveRecentSearch(item);
      if (!isModifierEvent(event)) {
        onClose();
      }
    }
  }))), import_react27.default.createElement("footer", {
    className: "DocSearch-Footer"
  }, import_react27.default.createElement(Footer, {
    translations: footerTranslations
  }))));
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/useDocSearchKeyboardEvents.js
var import_react28 = __toESM(require_react());
function isEditingContent(event) {
  var element = event.target;
  var tagName = element.tagName;
  return element.isContentEditable || tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA";
}
function useDocSearchKeyboardEvents(_ref) {
  var isOpen = _ref.isOpen, onOpen = _ref.onOpen, onClose = _ref.onClose, onInput2 = _ref.onInput, searchButtonRef = _ref.searchButtonRef;
  import_react28.default.useEffect(function() {
    function onKeyDown2(event) {
      var _event$key;
      function open() {
        if (!document.body.classList.contains("DocSearch--active")) {
          onOpen();
        }
      }
      if (event.keyCode === 27 && isOpen || // The `Cmd+K` shortcut both opens and closes the modal.
      // We need to check for `event.key` because it can be `undefined` with
      // Chrome's autofill feature.
      // See https://github.com/paperjs/paper.js/issues/1398
      ((_event$key = event.key) === null || _event$key === void 0 ? void 0 : _event$key.toLowerCase()) === "k" && (event.metaKey || event.ctrlKey) || // The `/` shortcut opens but doesn't close the modal because it's
      // a character.
      !isEditingContent(event) && event.key === "/" && !isOpen) {
        event.preventDefault();
        if (isOpen) {
          onClose();
        } else if (!document.body.classList.contains("DocSearch--active")) {
          open();
        }
      }
      if (searchButtonRef && searchButtonRef.current === document.activeElement && onInput2) {
        if (/[a-zA-Z0-9]/.test(String.fromCharCode(event.keyCode))) {
          onInput2(event);
        }
      }
    }
    window.addEventListener("keydown", onKeyDown2);
    return function() {
      window.removeEventListener("keydown", onKeyDown2);
    };
  }, [isOpen, onOpen, onClose, onInput2, searchButtonRef]);
}

// ../../node_modules/.pnpm/@docsearch+react@3.5.2_@algolia+client-search@5.56.0_@types+react@18.2.22_react-dom@18._b0c4eb23d444dac8cfb49ec0ff0f5ef2/node_modules/@docsearch/react/dist/esm/DocSearch.js
function _extends8() {
  _extends8 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends8.apply(this, arguments);
}
function _slicedToArray6(arr, i) {
  return _arrayWithHoles6(arr) || _iterableToArrayLimit6(arr, i) || _unsupportedIterableToArray11(arr, i) || _nonIterableRest6();
}
function _nonIterableRest6() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray11(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray11(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray11(o, minLen);
}
function _arrayLikeToArray11(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _iterableToArrayLimit6(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles6(arr) {
  if (Array.isArray(arr)) return arr;
}
function DocSearch(props) {
  var _props$translations, _props$translations2;
  var searchButtonRef = import_react29.default.useRef(null);
  var _React$useState = import_react29.default.useState(false), _React$useState2 = _slicedToArray6(_React$useState, 2), isOpen = _React$useState2[0], setIsOpen = _React$useState2[1];
  var _React$useState3 = import_react29.default.useState((props === null || props === void 0 ? void 0 : props.initialQuery) || void 0), _React$useState4 = _slicedToArray6(_React$useState3, 2), initialQuery = _React$useState4[0], setInitialQuery = _React$useState4[1];
  var onOpen = import_react29.default.useCallback(function() {
    setIsOpen(true);
  }, [setIsOpen]);
  var onClose = import_react29.default.useCallback(function() {
    setIsOpen(false);
  }, [setIsOpen]);
  var onInput2 = import_react29.default.useCallback(function(event) {
    setIsOpen(true);
    setInitialQuery(event.key);
  }, [setIsOpen, setInitialQuery]);
  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput: onInput2,
    searchButtonRef
  });
  return import_react29.default.createElement(import_react29.default.Fragment, null, import_react29.default.createElement(DocSearchButton, {
    ref: searchButtonRef,
    translations: props === null || props === void 0 || (_props$translations = props.translations) === null || _props$translations === void 0 ? void 0 : _props$translations.button,
    onClick: onOpen
  }), isOpen && (0, import_react_dom.createPortal)(import_react29.default.createElement(DocSearchModal, _extends8({}, props, {
    initialScrollY: window.scrollY,
    initialQuery,
    translations: props === null || props === void 0 || (_props$translations2 = props.translations) === null || _props$translations2 === void 0 ? void 0 : _props$translations2.modal,
    onClose
  })), document.body));
}
export {
  DocSearch,
  DocSearchButton,
  DocSearchModal,
  useDocSearchKeyboardEvents,
  version3 as version
};
//# sourceMappingURL=@docsearch_react.js.map
