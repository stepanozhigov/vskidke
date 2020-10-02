/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/App.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/App.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Form */ "./resources/js/components/Form.vue");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: "App",
  data: function data() {
    return {};
  },
  components: {
    Form: _components_Form__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  mounted: function mounted() {
    var _this = this;

    this.setViewHeight();
    window.addEventListener("resize", function () {
      _this.setViewHeight();
    }); // this.setSuccess();
    // this.setModal();
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapGetters"])(["isModal", "isSuccess"])),
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_1__["mapActions"])(["setModal", "unsetModal", "setSuccess", "unsetSuccess"])), {}, {
    setViewHeight: function setViewHeight() {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", "".concat(vh, "px")); //console.log(vh);
    },
    toggleModal: function toggleModal() {
      if (this.isModal) {
        this.unsetModal();
      } else {
        this.setModal();
      }

      this.unsetSuccess();
    }
  })
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Form.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_masked_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-masked-input */ "./node_modules/vue-masked-input/dist/maskedInput.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuelidate/lib/validators */ "./node_modules/vuelidate/lib/validators/index.js");
/* harmony import */ var vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



 //валидация телефона по регулярному вырожению
///^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/

var phoneValidat = vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["helpers"].regex("phoneValidat", /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/);
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      phone: "",
      url: "lmr.vskidke.ru",
      dialCode: "",
      isValid: true,
      onFocus: false
    };
  },
  components: {
    MaskedInput: vue_masked_input__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  mounted: function mounted() {//console.log("Component mounted.");
  },
  computed: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_3__["mapGetters"])(["isModal", "isSuccess"])), {}, {
    phoneNumber: function phoneNumber() {
      return "+" + this.dialCode + " " + this.phone;
    }
  }),
  props: {
    type: {
      type: String,
      "default": "none"
    }
  },
  methods: _objectSpread(_objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_3__["mapActions"])(["setModal", "unsetModal", "setSuccess", "unsetSuccess"])), {}, {
    submitForm: function submitForm() {
      var _this = this;

      if (this.$v.phone.$invalid) {
        this.isValid = false;
      } else {
        this.isValid = true; //fbq("track", "Lead");

        axios__WEBPACK_IMPORTED_MODULE_2___default.a.post("api/lead", {
          phone: this.phoneNumber,
          url: this.url
        }).then(function (response) {
          console.log(response);

          if (type == "form") {
            ym(62231704, "reachGoal", "leadmagnit-form-open-account");
            ga("send", "event", "leadmagnit-forms-accoint-in-KZ", "send");
          } else if (type == "callback") {
            ym(62231704, "reachGoal", "leadmagnit-callback-open-account");
            ga("send", "event", "leadmagnit-callback-accoint-in-KZ", "send");
          }

          _this.phone = "";

          _this.setSuccess();

          _this.setModal();
        }); // this.phone = "";
        // this.setSuccess();
        // this.setModal();
      }
    },
    onCountrySelect: function onCountrySelect(_ref) {
      var name = _ref.name,
          iso2 = _ref.iso2,
          dialCode = _ref.dialCode;
      this.dialCode = dialCode;
    }
  }),
  validations: {
    phone: {
      required: vuelidate_lib_validators__WEBPACK_IMPORTED_MODULE_1__["required"],
      phoneValidat: phoneValidat
    }
  }
});

/***/ }),

/***/ "./node_modules/inputmask-core/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/inputmask-core/lib/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function extend(dest, src) {
  if (src) {
    var props = Object.keys(src)
    for (var i = 0, l = props.length; i < l ; i++) {
      dest[props[i]] = src[props[i]]
    }
  }
  return dest
}

function copy(obj) {
  return extend({}, obj)
}

/**
 * Merge an object defining format characters into the defaults.
 * Passing null/undefined for en existing format character removes it.
 * Passing a definition for an existing format character overrides it.
 * @param {?Object} formatCharacters.
 */
function mergeFormatCharacters(formatCharacters) {
  var merged = copy(DEFAULT_FORMAT_CHARACTERS)
  if (formatCharacters) {
    var chars = Object.keys(formatCharacters)
    for (var i = 0, l = chars.length; i < l ; i++) {
      var char = chars[i]
      if (formatCharacters[char] == null) {
        delete merged[char]
      }
      else {
        merged[char] = formatCharacters[char]
      }
    }
  }
  return merged
}

var ESCAPE_CHAR = '\\'

var DIGIT_RE = /^\d$/
var LETTER_RE = /^[A-Za-z]$/
var ALPHANNUMERIC_RE = /^[\dA-Za-z]$/

var DEFAULT_PLACEHOLDER_CHAR = '_'
var DEFAULT_FORMAT_CHARACTERS = {
  '*': {
    validate: function(char) { return ALPHANNUMERIC_RE.test(char) }
  },
  '1': {
    validate: function(char) { return DIGIT_RE.test(char) }
  },
  'a': {
    validate: function(char) { return LETTER_RE.test(char) }
  },
  'A': {
    validate: function(char) { return LETTER_RE.test(char) },
    transform: function(char) { return char.toUpperCase() }
  },
  '#': {
    validate: function(char) { return ALPHANNUMERIC_RE.test(char) },
    transform: function(char) { return char.toUpperCase() }
  }
}

/**
 * @param {string} source
 * @patam {?Object} formatCharacters
 */
function Pattern(source, formatCharacters, placeholderChar, isRevealingMask) {
  if (!(this instanceof Pattern)) {
    return new Pattern(source, formatCharacters, placeholderChar)
  }

  /** Placeholder character */
  this.placeholderChar = placeholderChar || DEFAULT_PLACEHOLDER_CHAR
  /** Format character definitions. */
  this.formatCharacters = formatCharacters || DEFAULT_FORMAT_CHARACTERS
  /** Pattern definition string with escape characters. */
  this.source = source
  /** Pattern characters after escape characters have been processed. */
  this.pattern = []
  /** Length of the pattern after escape characters have been processed. */
  this.length = 0
  /** Index of the first editable character. */
  this.firstEditableIndex = null
  /** Index of the last editable character. */
  this.lastEditableIndex = null
  /** Lookup for indices of editable characters in the pattern. */
  this._editableIndices = {}
  /** If true, only the pattern before the last valid value character shows. */
  this.isRevealingMask = isRevealingMask || false

  this._parse()
}

Pattern.prototype._parse = function parse() {
  var sourceChars = this.source.split('')
  var patternIndex = 0
  var pattern = []

  for (var i = 0, l = sourceChars.length; i < l; i++) {
    var char = sourceChars[i]
    if (char === ESCAPE_CHAR) {
      if (i === l - 1) {
        throw new Error('InputMask: pattern ends with a raw ' + ESCAPE_CHAR)
      }
      char = sourceChars[++i]
    }
    else if (char in this.formatCharacters) {
      if (this.firstEditableIndex === null) {
        this.firstEditableIndex = patternIndex
      }
      this.lastEditableIndex = patternIndex
      this._editableIndices[patternIndex] = true
    }

    pattern.push(char)
    patternIndex++
  }

  if (this.firstEditableIndex === null) {
    throw new Error(
      'InputMask: pattern "' + this.source + '" does not contain any editable characters.'
    )
  }

  this.pattern = pattern
  this.length = pattern.length
}

/**
 * @param {Array<string>} value
 * @return {Array<string>}
 */
Pattern.prototype.formatValue = function format(value) {
  var valueBuffer = new Array(this.length)
  var valueIndex = 0

  for (var i = 0, l = this.length; i < l ; i++) {
    if (this.isEditableIndex(i)) {
      if (this.isRevealingMask &&
          value.length <= valueIndex &&
          !this.isValidAtIndex(value[valueIndex], i)) {
        break
      }
      valueBuffer[i] = (value.length > valueIndex && this.isValidAtIndex(value[valueIndex], i)
                        ? this.transform(value[valueIndex], i)
                        : this.placeholderChar)
      valueIndex++
    }
    else {
      valueBuffer[i] = this.pattern[i]
      // Also allow the value to contain static values from the pattern by
      // advancing its index.
      if (value.length > valueIndex && value[valueIndex] === this.pattern[i]) {
        valueIndex++
      }
    }
  }

  return valueBuffer
}

/**
 * @param {number} index
 * @return {boolean}
 */
Pattern.prototype.isEditableIndex = function isEditableIndex(index) {
  return !!this._editableIndices[index]
}

/**
 * @param {string} char
 * @param {number} index
 * @return {boolean}
 */
Pattern.prototype.isValidAtIndex = function isValidAtIndex(char, index) {
  return this.formatCharacters[this.pattern[index]].validate(char)
}

Pattern.prototype.transform = function transform(char, index) {
  var format = this.formatCharacters[this.pattern[index]]
  return typeof format.transform == 'function' ? format.transform(char) : char
}

function InputMask(options) {
  if (!(this instanceof InputMask)) { return new InputMask(options) }
  options = extend({
    formatCharacters: null,
    pattern: null,
    isRevealingMask: false,
    placeholderChar: DEFAULT_PLACEHOLDER_CHAR,
    selection: {start: 0, end: 0},
    value: ''
  }, options)

  if (options.pattern == null) {
    throw new Error('InputMask: you must provide a pattern.')
  }

  if (typeof options.placeholderChar !== 'string' || options.placeholderChar.length > 1) {
    throw new Error('InputMask: placeholderChar should be a single character or an empty string.')
  }

  this.placeholderChar = options.placeholderChar
  this.formatCharacters = mergeFormatCharacters(options.formatCharacters)
  this.setPattern(options.pattern, {
    value: options.value,
    selection: options.selection,
    isRevealingMask: options.isRevealingMask
  })
}

// Editing

/**
 * Applies a single character of input based on the current selection.
 * @param {string} char
 * @return {boolean} true if a change has been made to value or selection as a
 *   result of the input, false otherwise.
 */
InputMask.prototype.input = function input(char) {
  // Ignore additional input if the cursor's at the end of the pattern
  if (this.selection.start === this.selection.end &&
      this.selection.start === this.pattern.length) {
    return false
  }

  var selectionBefore = copy(this.selection)
  var valueBefore = this.getValue()

  var inputIndex = this.selection.start

  // If the cursor or selection is prior to the first editable character, make
  // sure any input given is applied to it.
  if (inputIndex < this.pattern.firstEditableIndex) {
    inputIndex = this.pattern.firstEditableIndex
  }

  // Bail out or add the character to input
  if (this.pattern.isEditableIndex(inputIndex)) {
    if (!this.pattern.isValidAtIndex(char, inputIndex)) {
      return false
    }
    this.value[inputIndex] = this.pattern.transform(char, inputIndex)
  }

  // If multiple characters were selected, blank the remainder out based on the
  // pattern.
  var end = this.selection.end - 1
  while (end > inputIndex) {
    if (this.pattern.isEditableIndex(end)) {
      this.value[end] = this.placeholderChar
    }
    end--
  }

  // Advance the cursor to the next character
  this.selection.start = this.selection.end = inputIndex + 1

  // Skip over any subsequent static characters
  while (this.pattern.length > this.selection.start &&
         !this.pattern.isEditableIndex(this.selection.start)) {
    this.selection.start++
    this.selection.end++
  }

  // History
  if (this._historyIndex != null) {
    // Took more input after undoing, so blow any subsequent history away
    this._history.splice(this._historyIndex, this._history.length - this._historyIndex)
    this._historyIndex = null
  }
  if (this._lastOp !== 'input' ||
      selectionBefore.start !== selectionBefore.end ||
      this._lastSelection !== null && selectionBefore.start !== this._lastSelection.start) {
    this._history.push({value: valueBefore, selection: selectionBefore, lastOp: this._lastOp})
  }
  this._lastOp = 'input'
  this._lastSelection = copy(this.selection)

  return true
}

/**
 * Attempts to delete from the value based on the current cursor position or
 * selection.
 * @return {boolean} true if the value or selection changed as the result of
 *   backspacing, false otherwise.
 */
InputMask.prototype.backspace = function backspace() {
  // If the cursor is at the start there's nothing to do
  if (this.selection.start === 0 && this.selection.end === 0) {
    return false
  }

  var selectionBefore = copy(this.selection)
  var valueBefore = this.getValue()

  // No range selected - work on the character preceding the cursor
  if (this.selection.start === this.selection.end) {
    if (this.pattern.isEditableIndex(this.selection.start - 1)) {
      this.value[this.selection.start - 1] = this.placeholderChar
    }
    this.selection.start--
    this.selection.end--
  }
  // Range selected - delete characters and leave the cursor at the start of the selection
  else {
    var end = this.selection.end - 1
    while (end >= this.selection.start) {
      if (this.pattern.isEditableIndex(end)) {
        this.value[end] = this.placeholderChar
      }
      end--
    }
    this.selection.end = this.selection.start
  }

  // History
  if (this._historyIndex != null) {
    // Took more input after undoing, so blow any subsequent history away
    this._history.splice(this._historyIndex, this._history.length - this._historyIndex)
  }
  if (this._lastOp !== 'backspace' ||
      selectionBefore.start !== selectionBefore.end ||
      this._lastSelection !== null && selectionBefore.start !== this._lastSelection.start) {
    this._history.push({value: valueBefore, selection: selectionBefore, lastOp: this._lastOp})
  }
  this._lastOp = 'backspace'
  this._lastSelection = copy(this.selection)

  return true
}

/**
 * Attempts to paste a string of input at the current cursor position or over
 * the top of the current selection.
 * Invalid content at any position will cause the paste to be rejected, and it
 * may contain static parts of the mask's pattern.
 * @param {string} input
 * @return {boolean} true if the paste was successful, false otherwise.
 */
InputMask.prototype.paste = function paste(input) {
  // This is necessary because we're just calling input() with each character
  // and rolling back if any were invalid, rather than checking up-front.
  var initialState = {
    value: this.value.slice(),
    selection: copy(this.selection),
    _lastOp: this._lastOp,
    _history: this._history.slice(),
    _historyIndex: this._historyIndex,
    _lastSelection: copy(this._lastSelection)
  }

  // If there are static characters at the start of the pattern and the cursor
  // or selection is within them, the static characters must match for a valid
  // paste.
  if (this.selection.start < this.pattern.firstEditableIndex) {
    for (var i = 0, l = this.pattern.firstEditableIndex - this.selection.start; i < l; i++) {
      if (input.charAt(i) !== this.pattern.pattern[i]) {
        return false
      }
    }

    // Continue as if the selection and input started from the editable part of
    // the pattern.
    input = input.substring(this.pattern.firstEditableIndex - this.selection.start)
    this.selection.start = this.pattern.firstEditableIndex
  }

  for (i = 0, l = input.length;
       i < l && this.selection.start <= this.pattern.lastEditableIndex;
       i++) {
    var valid = this.input(input.charAt(i))
    // Allow static parts of the pattern to appear in pasted input - they will
    // already have been stepped over by input(), so verify that the value
    // deemed invalid by input() was the expected static character.
    if (!valid) {
      if (this.selection.start > 0) {
        // XXX This only allows for one static character to be skipped
        var patternIndex = this.selection.start - 1
        if (!this.pattern.isEditableIndex(patternIndex) &&
            input.charAt(i) === this.pattern.pattern[patternIndex]) {
          continue
        }
      }
      extend(this, initialState)
      return false
    }
  }

  return true
}

// History

InputMask.prototype.undo = function undo() {
  // If there is no history, or nothing more on the history stack, we can't undo
  if (this._history.length === 0 || this._historyIndex === 0) {
    return false
  }

  var historyItem
  if (this._historyIndex == null) {
    // Not currently undoing, set up the initial history index
    this._historyIndex = this._history.length - 1
    historyItem = this._history[this._historyIndex]
    // Add a new history entry if anything has changed since the last one, so we
    // can redo back to the initial state we started undoing from.
    var value = this.getValue()
    if (historyItem.value !== value ||
        historyItem.selection.start !== this.selection.start ||
        historyItem.selection.end !== this.selection.end) {
      this._history.push({value: value, selection: copy(this.selection), lastOp: this._lastOp, startUndo: true})
    }
  }
  else {
    historyItem = this._history[--this._historyIndex]
  }

  this.value = historyItem.value.split('')
  this.selection = historyItem.selection
  this._lastOp = historyItem.lastOp
  return true
}

InputMask.prototype.redo = function redo() {
  if (this._history.length === 0 || this._historyIndex == null) {
    return false
  }
  var historyItem = this._history[++this._historyIndex]
  // If this is the last history item, we're done redoing
  if (this._historyIndex === this._history.length - 1) {
    this._historyIndex = null
    // If the last history item was only added to start undoing, remove it
    if (historyItem.startUndo) {
      this._history.pop()
    }
  }
  this.value = historyItem.value.split('')
  this.selection = historyItem.selection
  this._lastOp = historyItem.lastOp
  return true
}

// Getters & setters

InputMask.prototype.setPattern = function setPattern(pattern, options) {
  options = extend({
    selection: {start: 0, end: 0},
    value: ''
  }, options)
  this.pattern = new Pattern(pattern, this.formatCharacters, this.placeholderChar, options.isRevealingMask)
  this.setValue(options.value)
  this.emptyValue = this.pattern.formatValue([]).join('')
  this.selection = options.selection
  this._resetHistory()
}

InputMask.prototype.setSelection = function setSelection(selection) {
  this.selection = copy(selection)
  if (this.selection.start === this.selection.end) {
    if (this.selection.start < this.pattern.firstEditableIndex) {
      this.selection.start = this.selection.end = this.pattern.firstEditableIndex
      return true
    }
    // Set selection to the first editable, non-placeholder character before the selection
    // OR to the beginning of the pattern
    var index = this.selection.start
    while (index >= this.pattern.firstEditableIndex) {
      if (this.pattern.isEditableIndex(index - 1) &&
          this.value[index - 1] !== this.placeholderChar ||
          index === this.pattern.firstEditableIndex) {
        this.selection.start = this.selection.end = index
        break
      }
      index--
    }
    return true
  }
  return false
}

InputMask.prototype.setValue = function setValue(value) {
  if (value == null) {
    value = ''
  }
  this.value = this.pattern.formatValue(value.split(''))
}

InputMask.prototype.getValue = function getValue() {
  return this.value.join('')
}

InputMask.prototype.getRawValue = function getRawValue() {
  var rawValue = []
  for (var i = 0; i < this.value.length; i++) {
    if (this.pattern._editableIndices[i] === true) {
      rawValue.push(this.value[i])
    }
  }
  return rawValue.join('')
}

InputMask.prototype._resetHistory = function _resetHistory() {
  this._history = []
  this._historyIndex = null
  this._lastOp = null
  this._lastSelection = copy(this.selection)
}

InputMask.Pattern = Pattern

module.exports = InputMask


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-country-code/dist/vue-country-code.js":
/*!****************************************************************!*\
  !*** ./node_modules/vue-country-code/dist/vue-country-code.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function (global, factory) {
   true ? factory(exports) :
  undefined;
}(this, (function (exports) { 'use strict';

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    Function('return this')();

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f
  };

  var defineProperty = objectDefineProperty.f;

  var FunctionPrototype = Function.prototype;
  var FunctionPrototypeToString = FunctionPrototype.toString;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = 'name';

  // Function instances `.name` property
  // https://tc39.github.io/ecma262/#sec-function-instances-name
  if (descriptors && !(NAME in FunctionPrototype)) {
    defineProperty(FunctionPrototype, NAME, {
      configurable: true,
      get: function () {
        try {
          return FunctionPrototypeToString.call(this).match(nameRE)[1];
        } catch (error) {
          return '';
        }
      }
    });
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$1
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
  };

  var createNonEnumerableProperty = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  var sharedStore = store;

  var functionToString = Function.toString;

  // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
  if (typeof sharedStore.inspectSource != 'function') {
    sharedStore.inspectSource = function (it) {
      return functionToString.call(it);
    };
  }

  var inspectSource = sharedStore.inspectSource;

  var WeakMap = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

  var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.6.5',
    mode:  'global',
    copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
  });
  });

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store$1 = new WeakMap$1();
    var wmget = store$1.get;
    var wmhas = store$1.has;
    var wmset = store$1.set;
    set = function (it, metadata) {
      wmset.call(store$1, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store$1, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store$1, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      createNonEnumerableProperty(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(String).split('String');

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else createNonEnumerableProperty(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
  });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys$1(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        createNonEnumerableProperty(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  var arrayMethodIsStrict = function (METHOD_NAME, argument) {
    var method = [][METHOD_NAME];
    return !!method && fails(function () {
      // eslint-disable-next-line no-useless-call,no-throw-literal
      method.call(null, argument || function () { throw 1; }, 1);
    });
  };

  var defineProperty$1 = Object.defineProperty;
  var cache = {};

  var thrower = function (it) { throw it; };

  var arrayMethodUsesToLength = function (METHOD_NAME, options) {
    if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
    if (!options) options = {};
    var method = [][METHOD_NAME];
    var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
    var argument0 = has(options, 0) ? options[0] : thrower;
    var argument1 = has(options, 1) ? options[1] : undefined;

    return cache[METHOD_NAME] = !!method && !fails(function () {
      if (ACCESSORS && !descriptors) return true;
      var O = { length: -1 };

      if (ACCESSORS) defineProperty$1(O, 1, { enumerable: true, get: thrower });
      else O[1] = 1;

      method.call(O, argument0, argument1);
    });
  };

  var $indexOf = arrayIncludes.indexOf;



  var nativeIndexOf = [].indexOf;

  var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
  var STRICT_METHOD = arrayMethodIsStrict('indexOf');
  var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  _export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
    indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
      return NEGATIVE_ZERO
        // convert -0 to +0
        ? nativeIndexOf.apply(this, arguments) || 0
        : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray
  var isArray = Array.isArray || function isArray(arg) {
    return classofRaw(arg) == 'Array';
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var useSymbolAsUid = nativeSymbol
    // eslint-disable-next-line no-undef
    && !Symbol.sham
    // eslint-disable-next-line no-undef
    && typeof Symbol.iterator == 'symbol';

  var WellKnownSymbolsStore = shared('wks');
  var Symbol$1 = global_1.Symbol;
  var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
      else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    } return WellKnownSymbolsStore[name];
  };

  var SPECIES = wellKnownSymbol('species');

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C;
    if (isArray(originalArray)) {
      C = originalArray.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
      else if (isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
  };

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

  var process = global_1.process;
  var versions = process && process.versions;
  var v8 = versions && versions.v8;
  var match, version;

  if (v8) {
    match = v8.split('.');
    version = match[0] + match[1];
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/);
      if (match) version = match[1];
    }
  }

  var engineV8Version = version && +version;

  var SPECIES$1 = wellKnownSymbol('species');

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return engineV8Version >= 51 || !fails(function () {
      var array = [];
      var constructor = array.constructor = {};
      constructor[SPECIES$1] = function () {
        return { foo: 1 };
      };
      return array[METHOD_NAME](Boolean).foo !== 1;
    });
  };

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
  var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
    var array = [];
    array[IS_CONCAT_SPREADABLE] = false;
    return array.concat()[0] !== array;
  });

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false;
    var spreadable = O[IS_CONCAT_SPREADABLE];
    return spreadable !== undefined ? !!spreadable : isArray(O);
  };

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

  // `Array.prototype.concat` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export({ target: 'Array', proto: true, forced: FORCED }, {
    concat: function concat(arg) { // eslint-disable-line no-unused-vars
      var O = toObject(this);
      var A = arraySpeciesCreate(O, 0);
      var n = 0;
      var i, k, length, len, E;
      for (i = -1, length = arguments.length; i < length; i++) {
        E = i === -1 ? O : arguments[i];
        if (isConcatSpreadable(E)) {
          len = toLength(E.length);
          if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
        } else {
          if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
          createProperty(A, n++, E);
        }
      }
      A.length = n;
      return A;
    }
  });

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var push = [].push;

  // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
  var createMethod$1 = function (TYPE) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    return function ($this, callbackfn, that, specificCreate) {
      var O = toObject($this);
      var self = indexedObject(O);
      var boundFunction = functionBindContext(callbackfn, that, 3);
      var length = toLength(self.length);
      var index = 0;
      var create = specificCreate || arraySpeciesCreate;
      var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var value, result;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);
        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
            case 3: return true;              // some
            case 5: return value;             // find
            case 6: return index;             // findIndex
            case 2: push.call(target, value); // filter
          } else if (IS_EVERY) return false;  // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
    };
  };

  var arrayIteration = {
    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    forEach: createMethod$1(0),
    // `Array.prototype.map` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.map
    map: createMethod$1(1),
    // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    filter: createMethod$1(2),
    // `Array.prototype.some` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.some
    some: createMethod$1(3),
    // `Array.prototype.every` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.every
    every: createMethod$1(4),
    // `Array.prototype.find` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    find: createMethod$1(5),
    // `Array.prototype.findIndex` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
    findIndex: createMethod$1(6)
  };

  var $filter = arrayIteration.filter;



  var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
  // Edge 14- issue
  var USES_TO_LENGTH$1 = arrayMethodUsesToLength('filter');

  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
    filter: function filter(callbackfn /* , thisArg */) {
      return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var GT = '>';
  var LT = '<';
  var PROTOTYPE = 'prototype';
  var SCRIPT = 'script';
  var IE_PROTO = sharedKey('IE_PROTO');

  var EmptyConstructor = function () { /* empty */ };

  var scriptTag = function (content) {
    return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  };

  // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  var NullProtoObjectViaActiveX = function (activeXDocument) {
    activeXDocument.write(scriptTag(''));
    activeXDocument.close();
    var temp = activeXDocument.parentWindow.Object;
    activeXDocument = null; // avoid memory leak
    return temp;
  };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var NullProtoObjectViaIFrame = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var JS = 'java' + SCRIPT + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    // https://github.com/zloirock/core-js/issues/475
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag('document.F=Object'));
    iframeDocument.close();
    return iframeDocument.F;
  };

  // Check for document.domain and active x support
  // No need to use active x approach when document.domain is not set
  // see https://github.com/es-shims/es5-shim/issues/150
  // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  // avoid IE GC bug
  var activeXDocument;
  var NullProtoObject = function () {
    try {
      /* global ActiveXObject */
      activeXDocument = document.domain && new ActiveXObject('htmlfile');
    } catch (error) { /* ignore */ }
    NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
    var length = enumBugKeys.length;
    while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
    return NullProtoObject();
  };

  hiddenKeys[IE_PROTO] = true;

  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      EmptyConstructor[PROTOTYPE] = anObject(O);
      result = new EmptyConstructor();
      EmptyConstructor[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO] = O;
    } else result = NullProtoObject();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  var UNSCOPABLES = wellKnownSymbol('unscopables');
  var ArrayPrototype = Array.prototype;

  // Array.prototype[@@unscopables]
  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  if (ArrayPrototype[UNSCOPABLES] == undefined) {
    objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
      configurable: true,
      value: objectCreate(null)
    });
  }

  // add a key to Array.prototype[@@unscopables]
  var addToUnscopables = function (key) {
    ArrayPrototype[UNSCOPABLES][key] = true;
  };

  var $find = arrayIteration.find;



  var FIND = 'find';
  var SKIPS_HOLES = true;

  var USES_TO_LENGTH$2 = arrayMethodUsesToLength(FIND);

  // Shouldn't skip holes
  if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH$2 }, {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND);

  var $findIndex = arrayIteration.findIndex;



  var FIND_INDEX = 'findIndex';
  var SKIPS_HOLES$1 = true;

  var USES_TO_LENGTH$3 = arrayMethodUsesToLength(FIND_INDEX);

  // Shouldn't skip holes
  if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES$1 = false; });

  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findindex
  _export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 || !USES_TO_LENGTH$3 }, {
    findIndex: function findIndex(callbackfn /* , that = undefined */) {
      return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables(FIND_INDEX);

  var $includes = arrayIncludes.includes;



  var USES_TO_LENGTH$4 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  _export({ target: 'Array', proto: true, forced: !USES_TO_LENGTH$4 }, {
    includes: function includes(el /* , fromIndex = 0 */) {
      return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
  addToUnscopables('includes');

  var $map = arrayIteration.map;



  var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('map');
  // FF49- issue
  var USES_TO_LENGTH$5 = arrayMethodUsesToLength('map');

  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  // with adding support of @@species
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$5 }, {
    map: function map(callbackfn /* , thisArg */) {
      return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var HAS_SPECIES_SUPPORT$2 = arrayMethodHasSpeciesSupport('slice');
  var USES_TO_LENGTH$6 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

  var SPECIES$2 = wellKnownSymbol('species');
  var nativeSlice = [].slice;
  var max$1 = Math.max;

  // `Array.prototype.slice` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.slice
  // fallback for not array-like ES3 strings and DOM objects
  _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$2 || !USES_TO_LENGTH$6 }, {
    slice: function slice(start, end) {
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var k = toAbsoluteIndex(start, length);
      var fin = toAbsoluteIndex(end === undefined ? length : end, length);
      // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
      var Constructor, result, n;
      if (isArray(O)) {
        Constructor = O.constructor;
        // cross-realm fallback
        if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
          Constructor = undefined;
        } else if (isObject(Constructor)) {
          Constructor = Constructor[SPECIES$2];
          if (Constructor === null) Constructor = undefined;
        }
        if (Constructor === Array || Constructor === undefined) {
          return nativeSlice.call(O, k, fin);
        }
      }
      result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
      for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
      result.length = n;
      return result;
    }
  });

  var MATCH = wellKnownSymbol('match');

  // `IsRegExp` abstract operation
  // https://tc39.github.io/ecma262/#sec-isregexp
  var isRegexp = function (it) {
    var isRegExp;
    return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
  };

  var notARegexp = function (it) {
    if (isRegexp(it)) {
      throw TypeError("The method doesn't accept regular expressions");
    } return it;
  };

  var MATCH$1 = wellKnownSymbol('match');

  var correctIsRegexpLogic = function (METHOD_NAME) {
    var regexp = /./;
    try {
      '/./'[METHOD_NAME](regexp);
    } catch (e) {
      try {
        regexp[MATCH$1] = false;
        return '/./'[METHOD_NAME](regexp);
      } catch (f) { /* empty */ }
    } return false;
  };

  // `String.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.includes
  _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
    includes: function includes(searchString /* , position = 0 */) {
      return !!~String(requireObjectCoercible(this))
        .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
    }
  });

  var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;






  var nativeStartsWith = ''.startsWith;
  var min$2 = Math.min;

  var CORRECT_IS_REGEXP_LOGIC = correctIsRegexpLogic('startsWith');
  // https://github.com/zloirock/core-js/pull/702
  var MDN_POLYFILL_BUG =  !CORRECT_IS_REGEXP_LOGIC && !!function () {
    var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'startsWith');
    return descriptor && !descriptor.writable;
  }();

  // `String.prototype.startsWith` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.startswith
  _export({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
    startsWith: function startsWith(searchString /* , position = 0 */) {
      var that = String(requireObjectCoercible(this));
      notARegexp(searchString);
      var index = toLength(min$2(arguments.length > 1 ? arguments[1] : undefined, that.length));
      var search = String(searchString);
      return nativeStartsWith
        ? nativeStartsWith.call(that, search, index)
        : that.slice(index, index + search.length) === search;
    }
  });

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  // Array of country objects for the flag dropdown.
  // Here is the criteria for the plugin to support a given country/territory
  // - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  // - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
  // - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
  // - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml
  // Each country array has the following information:
  // [
  //    Country name,
  //    iso2 code,
  //    International dial code,
  //    Order (if >1 country with same dial code),
  //    Area codes
  // ]
  var allCountries = [["Afghanistan (‫افغانستان‬‎)", "af", "93"], ["Albania (Shqipëri)", "al", "355"], ["Algeria (‫الجزائر‬‎)", "dz", "213"], ["American Samoa", "as", "1684"], ["Andorra", "ad", "376"], ["Angola", "ao", "244"], ["Anguilla", "ai", "1264"], ["Antigua and Barbuda", "ag", "1268"], ["Argentina", "ar", "54"], ["Armenia (Հայաստան)", "am", "374"], ["Aruba", "aw", "297"], ["Australia", "au", "61", 0], ["Austria (Österreich)", "at", "43"], ["Azerbaijan (Azərbaycan)", "az", "994"], ["Bahamas", "bs", "1242"], ["Bahrain (‫البحرين‬‎)", "bh", "973"], ["Bangladesh (বাংলাদেশ)", "bd", "880"], ["Barbados", "bb", "1246"], ["Belarus (Беларусь)", "by", "375"], ["Belgium (België)", "be", "32"], ["Belize", "bz", "501"], ["Benin (Bénin)", "bj", "229"], ["Bermuda", "bm", "1441"], ["Bhutan (འབྲུག)", "bt", "975"], ["Bolivia", "bo", "591"], ["Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387"], ["Botswana", "bw", "267"], ["Brazil (Brasil)", "br", "55"], ["British Indian Ocean Territory", "io", "246"], ["British Virgin Islands", "vg", "1284"], ["Brunei", "bn", "673"], ["Bulgaria (България)", "bg", "359"], ["Burkina Faso", "bf", "226"], ["Burundi (Uburundi)", "bi", "257"], ["Cambodia (កម្ពុជា)", "kh", "855"], ["Cameroon (Cameroun)", "cm", "237"], ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]], ["Cape Verde (Kabu Verdi)", "cv", "238"], ["Caribbean Netherlands", "bq", "599", 1], ["Cayman Islands", "ky", "1345"], ["Central African Republic (République centrafricaine)", "cf", "236"], ["Chad (Tchad)", "td", "235"], ["Chile", "cl", "56"], ["China (中国)", "cn", "86"], ["Christmas Island", "cx", "61", 2], ["Cocos (Keeling) Islands", "cc", "61", 1], ["Colombia", "co", "57"], ["Comoros (‫جزر القمر‬‎)", "km", "269"], ["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243"], ["Congo (Republic) (Congo-Brazzaville)", "cg", "242"], ["Cook Islands", "ck", "682"], ["Costa Rica", "cr", "506"], ["Côte d’Ivoire", "ci", "225"], ["Croatia (Hrvatska)", "hr", "385"], ["Cuba", "cu", "53"], ["Curaçao", "cw", "599", 0], ["Cyprus (Κύπρος)", "cy", "357"], ["Czech Republic (Česká republika)", "cz", "420"], ["Denmark (Danmark)", "dk", "45"], ["Djibouti", "dj", "253"], ["Dominica", "dm", "1767"], ["Dominican Republic (República Dominicana)", "do", "1", 2, ["809", "829", "849"]], ["Ecuador", "ec", "593"], ["Egypt (‫مصر‬‎)", "eg", "20"], ["El Salvador", "sv", "503"], ["Equatorial Guinea (Guinea Ecuatorial)", "gq", "240"], ["Eritrea", "er", "291"], ["Estonia (Eesti)", "ee", "372"], ["Ethiopia", "et", "251"], ["Falkland Islands (Islas Malvinas)", "fk", "500"], ["Faroe Islands (Føroyar)", "fo", "298"], ["Fiji", "fj", "679"], ["Finland (Suomi)", "fi", "358", 0], ["France", "fr", "33"], ["French Guiana (Guyane française)", "gf", "594"], ["French Polynesia (Polynésie française)", "pf", "689"], ["Gabon", "ga", "241"], ["Gambia", "gm", "220"], ["Georgia (საქართველო)", "ge", "995"], ["Germany (Deutschland)", "de", "49"], ["Ghana (Gaana)", "gh", "233"], ["Gibraltar", "gi", "350"], ["Greece (Ελλάδα)", "gr", "30"], ["Greenland (Kalaallit Nunaat)", "gl", "299"], ["Grenada", "gd", "1473"], ["Guadeloupe", "gp", "590", 0], ["Guam", "gu", "1671"], ["Guatemala", "gt", "502"], ["Guernsey", "gg", "44", 1], ["Guinea (Guinée)", "gn", "224"], ["Guinea-Bissau (Guiné Bissau)", "gw", "245"], ["Guyana", "gy", "592"], ["Haiti", "ht", "509"], ["Honduras", "hn", "504"], ["Hong Kong (香港)", "hk", "852"], ["Hungary (Magyarország)", "hu", "36"], ["Iceland (Ísland)", "is", "354"], ["India (भारत)", "in", "91"], ["Indonesia", "id", "62"], ["Iran (‫ایران‬‎)", "ir", "98"], ["Iraq (‫العراق‬‎)", "iq", "964"], ["Ireland", "ie", "353"], ["Isle of Man", "im", "44", 2], ["Israel (‫ישראל‬‎)", "il", "972"], ["Italy (Italia)", "it", "39", 0], ["Jamaica", "jm", "1876"], ["Japan (日本)", "jp", "81"], ["Jersey", "je", "44", 3], ["Jordan (‫الأردن‬‎)", "jo", "962"], ["Kazakhstan (Казахстан)", "kz", "7", 1], ["Kenya", "ke", "254"], ["Kiribati", "ki", "686"], ["Kosovo", "xk", "383"], ["Kuwait (‫الكويت‬‎)", "kw", "965"], ["Kyrgyzstan (Кыргызстан)", "kg", "996"], ["Laos (ລາວ)", "la", "856"], ["Latvia (Latvija)", "lv", "371"], ["Lebanon (‫لبنان‬‎)", "lb", "961"], ["Lesotho", "ls", "266"], ["Liberia", "lr", "231"], ["Libya (‫ليبيا‬‎)", "ly", "218"], ["Liechtenstein", "li", "423"], ["Lithuania (Lietuva)", "lt", "370"], ["Luxembourg", "lu", "352"], ["Macau (澳門)", "mo", "853"], ["Macedonia (FYROM) (Македонија)", "mk", "389"], ["Madagascar (Madagasikara)", "mg", "261"], ["Malawi", "mw", "265"], ["Malaysia", "my", "60"], ["Maldives", "mv", "960"], ["Mali", "ml", "223"], ["Malta", "mt", "356"], ["Marshall Islands", "mh", "692"], ["Martinique", "mq", "596"], ["Mauritania (‫موريتانيا‬‎)", "mr", "222"], ["Mauritius (Moris)", "mu", "230"], ["Mayotte", "yt", "262", 1], ["Mexico (México)", "mx", "52"], ["Micronesia", "fm", "691"], ["Moldova (Republica Moldova)", "md", "373"], ["Monaco", "mc", "377"], ["Mongolia (Монгол)", "mn", "976"], ["Montenegro (Crna Gora)", "me", "382"], ["Montserrat", "ms", "1664"], ["Morocco (‫المغرب‬‎)", "ma", "212", 0], ["Mozambique (Moçambique)", "mz", "258"], ["Myanmar (Burma) (မြန်မာ)", "mm", "95"], ["Namibia (Namibië)", "na", "264"], ["Nauru", "nr", "674"], ["Nepal (नेपाल)", "np", "977"], ["Netherlands (Nederland)", "nl", "31"], ["New Caledonia (Nouvelle-Calédonie)", "nc", "687"], ["New Zealand", "nz", "64"], ["Nicaragua", "ni", "505"], ["Niger (Nijar)", "ne", "227"], ["Nigeria", "ng", "234"], ["Niue", "nu", "683"], ["Norfolk Island", "nf", "672"], ["North Korea (조선 민주주의 인민 공화국)", "kp", "850"], ["Northern Mariana Islands", "mp", "1670"], ["Norway (Norge)", "no", "47", 0], ["Oman (‫عُمان‬‎)", "om", "968"], ["Pakistan (‫پاکستان‬‎)", "pk", "92"], ["Palau", "pw", "680"], ["Palestine (‫فلسطين‬‎)", "ps", "970"], ["Panama (Panamá)", "pa", "507"], ["Papua New Guinea", "pg", "675"], ["Paraguay", "py", "595"], ["Peru (Perú)", "pe", "51"], ["Philippines", "ph", "63"], ["Poland (Polska)", "pl", "48"], ["Portugal", "pt", "351"], ["Puerto Rico", "pr", "1", 3, ["787", "939"]], ["Qatar (‫قطر‬‎)", "qa", "974"], ["Réunion (La Réunion)", "re", "262", 0], ["Romania (România)", "ro", "40"], ["Russia (Россия)", "ru", "7", 0], ["Rwanda", "rw", "250"], ["Saint Barthélemy", "bl", "590", 1], ["Saint Helena", "sh", "290"], ["Saint Kitts and Nevis", "kn", "1869"], ["Saint Lucia", "lc", "1758"], ["Saint Martin (Saint-Martin (partie française))", "mf", "590", 2], ["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508"], ["Saint Vincent and the Grenadines", "vc", "1784"], ["Samoa", "ws", "685"], ["San Marino", "sm", "378"], ["São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239"], ["Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966"], ["Senegal (Sénégal)", "sn", "221"], ["Serbia (Србија)", "rs", "381"], ["Seychelles", "sc", "248"], ["Sierra Leone", "sl", "232"], ["Singapore", "sg", "65"], ["Sint Maarten", "sx", "1721"], ["Slovakia (Slovensko)", "sk", "421"], ["Slovenia (Slovenija)", "si", "386"], ["Solomon Islands", "sb", "677"], ["Somalia (Soomaaliya)", "so", "252"], ["South Africa", "za", "27"], ["South Korea (대한민국)", "kr", "82"], ["South Sudan (‫جنوب السودان‬‎)", "ss", "211"], ["Spain (España)", "es", "34"], ["Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94"], ["Sudan (‫السودان‬‎)", "sd", "249"], ["Suriname", "sr", "597"], ["Svalbard and Jan Mayen", "sj", "47", 1], ["Swaziland", "sz", "268"], ["Sweden (Sverige)", "se", "46"], ["Switzerland (Schweiz)", "ch", "41"], ["Syria (‫سوريا‬‎)", "sy", "963"], ["Taiwan (台灣)", "tw", "886"], ["Tajikistan", "tj", "992"], ["Tanzania", "tz", "255"], ["Thailand (ไทย)", "th", "66"], ["Timor-Leste", "tl", "670"], ["Togo", "tg", "228"], ["Tokelau", "tk", "690"], ["Tonga", "to", "676"], ["Trinidad and Tobago", "tt", "1868"], ["Tunisia (‫تونس‬‎)", "tn", "216"], ["Turkey (Türkiye)", "tr", "90"], ["Turkmenistan", "tm", "993"], ["Turks and Caicos Islands", "tc", "1649"], ["Tuvalu", "tv", "688"], ["U.S. Virgin Islands", "vi", "1340"], ["Uganda", "ug", "256"], ["Ukraine (Україна)", "ua", "380"], ["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971"], ["United Kingdom", "gb", "44", 0], ["United States", "us", "1", 0], ["Uruguay", "uy", "598"], ["Uzbekistan (Oʻzbekiston)", "uz", "998"], ["Vanuatu", "vu", "678"], ["Vatican City (Città del Vaticano)", "va", "39", 1], ["Venezuela", "ve", "58"], ["Vietnam (Việt Nam)", "vn", "84"], ["Wallis and Futuna (Wallis-et-Futuna)", "wf", "681"], ["Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1], ["Yemen (‫اليمن‬‎)", "ye", "967"], ["Zambia", "zm", "260"], ["Zimbabwe", "zw", "263"], ["Åland Islands", "ax", "358", 1]];
  var allCountries$1 = allCountries.map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        name = _ref2[0],
        iso2 = _ref2[1],
        dialCode = _ref2[2];

    return {
      name: name,
      iso2: iso2.toUpperCase(),
      dialCode: dialCode
    };
  });

  var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  var test = {};

  test[TO_STRING_TAG] = 'z';

  var toStringTagSupport = String(test) === '[object z]';

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = toStringTagSupport ? classofRaw : function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  // `Object.prototype.toString` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  var objectToString = toStringTagSupport ? {}.toString : function toString() {
    return '[object ' + classof(this) + ']';
  };

  // `Object.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
  if (!toStringTagSupport) {
    redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
  }

  // `RegExp.prototype.flags` getter implementation
  // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
  var regexpFlags = function () {
    var that = anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.dotAll) result += 's';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  var TO_STRING = 'toString';
  var RegExpPrototype = RegExp.prototype;
  var nativeToString = RegExpPrototype[TO_STRING];

  var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
  // FF44- RegExp#toString has a wrong name
  var INCORRECT_NAME = nativeToString.name != TO_STRING;

  // `RegExp.prototype.toString` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
  if (NOT_GENERIC || INCORRECT_NAME) {
    redefine(RegExp.prototype, TO_STRING, function toString() {
      var R = anObject(this);
      var p = String(R.source);
      var rf = R.flags;
      var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
      return '/' + p + '/' + f;
    }, { unsafe: true });
  }

  var getCountry = function getCountry() {
    return fetch("https://ip2c.org/s").then(function (response) {
      return response.text();
    }).then(function (response) {
      var result = (response || "").toString();

      if (!result || result[0] !== "1") {
        throw new Error("unable to fetch the country");
      }

      return result.substr(2, 2);
    });
  };

  var script = {
    name: "vue-country-code",
    props: {
      disabledFetchingCountry: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      disabledFormatting: {
        type: Boolean,
        default: false
      },
      defaultCountry: {
        // Default country code, ie: 'AU'
        // Will override the current country of user
        type: String,
        default: ""
      },
      enabledCountryCode: {
        type: Boolean,
        default: false
      },
      enabledFlags: {
        type: Boolean,
        default: true
      },
      preferredCountries: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      onlyCountries: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      ignoredCountries: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      dropdownOptions: {
        type: Object,
        default: function _default() {
          return {};
        }
      },
      selectedCountryCode: {
        type: Boolean,
        default: false
      }
    },
    mounted: function mounted() {
      this.initializeCountry();
      this.$emit("onSelect", this.activeCountry);
    },
    data: function data() {
      return {
        activeCountry: {
          iso2: ""
        },
        open: false,
        selectedIndex: null,
        typeToFindInput: "",
        typeToFindTimer: null
      };
    },
    computed: {
      filteredCountries: function filteredCountries() {
        var _this = this;

        // List countries after filtered
        if (this.onlyCountries.length) {
          return this.getCountries(this.onlyCountries);
        }

        if (this.ignoredCountries.length) {
          return allCountries$1.filter(function (_ref) {
            var iso2 = _ref.iso2;
            return !_this.ignoredCountries.includes(iso2.toUpperCase()) && !_this.ignoredCountries.includes(iso2.toLowerCase());
          });
        }

        return allCountries$1;
      },
      sortedCountries: function sortedCountries() {
        // Sort the list countries: from preferred countries to all countries
        var preferredCountries = this.getCountries(this.preferredCountries).map(function (country) {
          return _objectSpread2(_objectSpread2({}, country), {}, {
            preferred: true
          });
        });
        return [].concat(_toConsumableArray(preferredCountries), _toConsumableArray(this.filteredCountries));
      }
    },
    methods: {
      initializeCountry: function initializeCountry() {
        var _this2 = this;

        /**
         * 1. Use default country if passed from parent
         */
        if (this.defaultCountry) {
          var defaultCountry = this.findCountry(this.defaultCountry);

          if (defaultCountry) {
            this.activeCountry = defaultCountry;
            return;
          }
        }
        /**
         * 2. Use the first country from preferred list (if available) or all countries list
         */


        this.activeCountry = this.findCountry(this.preferredCountries[0]) || this.filteredCountries[0];
        /**
         * 3. Check if fetching country based on user's IP is allowed, set it as the default country
         */

        if (!this.disabledFetchingCountry) {
          getCountry().then(function (res) {
            _this2.choose(_this2.findCountry(res) || _this2.activeCountry);
          });
        }
      },

      /**
       * Get the list of countries from the list of iso2 code
       */
      getCountries: function getCountries() {
        var _this3 = this;

        var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        return list.map(function (countryCode) {
          return _this3.findCountry(countryCode);
        }).filter(Boolean);
      },
      findCountry: function findCountry() {
        var iso = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
        return allCountries$1.find(function (country) {
          return country.iso2 === iso.toUpperCase();
        });
      },
      getItemClass: function getItemClass(index, iso2) {
        var highlighted = this.selectedIndex === index;
        var lastPreferred = index === this.preferredCountries.length - 1;
        var preferred = !!~this.preferredCountries.map(function (c) {
          return c.toUpperCase();
        }).indexOf(iso2);
        return {
          highlighted: highlighted,
          "last-preferred": lastPreferred,
          preferred: preferred
        };
      },
      choose: function choose(country) {
        this.activeCountry = country;
        this.$emit("onSelect", this.activeCountry);
      },
      toggleDropdown: function toggleDropdown() {
        if (this.disabled) {
          return;
        }

        this.open = !this.open;
      },
      clickedOutside: function clickedOutside() {
        this.open = false;
      },
      keyboardNav: function keyboardNav(e) {
        var _this4 = this;

        if (e.keyCode === 40) {
          // down arrow
          this.open = true;

          if (this.selectedIndex === null) {
            this.selectedIndex = 0;
          } else {
            this.selectedIndex = Math.min(this.sortedCountries.length - 1, this.selectedIndex + 1);
          }

          var selEle = this.$refs.list.children[this.selectedIndex];
          if (selEle.offsetTop + selEle.clientHeight > this.$refs.list.scrollTop + this.$refs.list.clientHeight) this.$refs.list.scrollTop = selEle.offsetTop - this.$refs.list.clientHeight + selEle.clientHeight;
        } else if (e.keyCode === 38) {
          // up arrow
          this.open = true;

          if (this.selectedIndex === null) {
            this.selectedIndex = this.sortedCountries.length - 1;
          } else {
            this.selectedIndex = Math.max(0, this.selectedIndex - 1);
          }

          var _selEle = this.$refs.list.children[this.selectedIndex];
          if (_selEle.offsetTop < this.$refs.list.scrollTop) this.$refs.list.scrollTop = _selEle.offsetTop;
        } else if (e.keyCode === 13) {
          // enter key
          if (this.selectedIndex !== null) {
            this.choose(this.sortedCountries[this.selectedIndex]);
          }

          this.open = !this.open;
        } else {
          // typing a country's name
          this.typeToFindInput += e.key;
          clearTimeout(this.typeToFindTimer);
          this.typeToFindTimer = setTimeout(function () {
            _this4.typeToFindInput = "";
          }, 700); // don't include preferred countries so we jump to the right place in the alphabet

          var typedCountryI = this.sortedCountries.slice(this.preferredCountries.length).findIndex(function (c) {
            return c.name.toLowerCase().startsWith(_this4.typeToFindInput);
          });

          if (~typedCountryI) {
            this.selectedIndex = this.preferredCountries.length + typedCountryI;
            var _selEle2 = this.$refs.list.children[this.selectedIndex];

            if (_selEle2.offsetTop < this.$refs.list.scrollTop || _selEle2.offsetTop + _selEle2.clientHeight > this.$refs.list.scrollTop + this.$refs.list.clientHeight) {
              this.$refs.list.scrollTop = _selEle2.offsetTop - this.$refs.list.clientHeight / 2;
            }
          }
        }
      },
      reset: function reset() {
        this.selectedIndex = this.sortedCountries.map(function (c) {
          return c.iso2;
        }).indexOf(this.activeCountry.iso2);
        this.open = false;
      }
    },
    directives: {
      // Click-outside from BosNaufal: https://github.com/BosNaufal/vue-click-outside
      "click-outside": {
        bind: function bind(el, binding, vNode) {
          // Provided expression must evaluate to a function.
          if (typeof binding.value !== "function") {
            var compName = vNode.context.name;
            var warn = "[Vue-click-outside:] provided expression " + binding.expression + " is not a function, but has to be";

            if (compName) {
              warn += "Found in component " + compName;
            }

            console.warn(warn);
          } // Define Handler and cache it on the element


          var bubble = binding.modifiers.bubble;

          var handler = function handler(e) {
            if (bubble || !el.contains(e.target) && el !== e.target) {
              binding.value(e);
            }
          };

          el.__vueClickOutside__ = handler; // add Event Listeners

          document.addEventListener("click", handler);
        },
        unbind: function unbind(el) {
          // Remove Event Listeners
          document.removeEventListener("click", el.__vueClickOutside__);
          el.__vueClickOutside__ = null;
        }
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  var __vue_script__ = script;
  /* template */

  var __vue_render__ = function __vue_render__() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c("div", {
      staticClass: "vue-country-select",
      class: {
        disabled: _vm.disabled
      }
    }, [_c("div", {
      directives: [{
        name: "click-outside",
        rawName: "v-click-outside",
        value: _vm.clickedOutside,
        expression: "clickedOutside"
      }],
      staticClass: "dropdown",
      class: {
        open: _vm.open
      },
      attrs: {
        tabindex: "0"
      },
      on: {
        click: _vm.toggleDropdown,
        keydown: [_vm.keyboardNav, function ($event) {
          if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
            return null;
          }

          return _vm.reset($event);
        }]
      }
    }, [_c("span", {
      staticClass: "current"
    }, [_vm.enabledFlags ? _c("div", {
      staticClass: "iti-flag",
      class: _vm.activeCountry.iso2.toLowerCase()
    }) : _vm._e(), _vm._v(" "), _vm.enabledCountryCode ? _c("span", {
      staticClass: "country-code"
    }, [_vm._v("+" + _vm._s(_vm.activeCountry.dialCode))]) : _vm._e(), _vm._v(" "), _c("span", {
      staticClass: "dropdown-arrow"
    }, [_vm._v(_vm._s(_vm.open ? "▲" : "▼"))])]), _vm._v(" "), _c("ul", {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.open,
        expression: "open"
      }],
      ref: "list",
      staticClass: "dropdown-list"
    }, _vm._l(_vm.sortedCountries, function (pb, index) {
      return _c("li", {
        key: pb.iso2 + (pb.preferred ? "-preferred" : ""),
        staticClass: "dropdown-item",
        class: _vm.getItemClass(index, pb.iso2),
        on: {
          click: function click($event) {
            return _vm.choose(pb);
          },
          mousemove: function mousemove($event) {
            _vm.selectedIndex = index;
          }
        }
      }, [_vm.enabledFlags ? _c("div", {
        staticClass: "iti-flag",
        class: pb.iso2.toLowerCase()
      }) : _vm._e(), _vm._v(" "), _c("strong", [_vm._v(_vm._s(pb.name))]), _vm._v(" "), _vm.dropdownOptions && !_vm.dropdownOptions.disabledDialCode ? _c("span", [_vm._v("+" + _vm._s(pb.dialCode))]) : _vm._e()]);
    }), 0)])]);
  };

  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;
  /* style */

  var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
    if (!inject) return;
    inject("data-v-43c561fc_0", {
      source: ".iti-flag {\n  width: 20px;\n}\n.iti-flag.be {\n  width: 18px;\n}\n.iti-flag.ch {\n  width: 15px;\n}\n.iti-flag.mc {\n  width: 19px;\n}\n.iti-flag.ne {\n  width: 18px;\n}\n.iti-flag.np {\n  width: 13px;\n}\n.iti-flag.va {\n  width: 15px;\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {\n.iti-flag {\n    background-size: 5630px 15px;\n}\n}\n.iti-flag.ac {\n  height: 10px;\n  background-position: 0px 0px;\n}\n.iti-flag.ad {\n  height: 14px;\n  background-position: -22px 0px;\n}\n.iti-flag.ae {\n  height: 10px;\n  background-position: -44px 0px;\n}\n.iti-flag.af {\n  height: 14px;\n  background-position: -66px 0px;\n}\n.iti-flag.ag {\n  height: 14px;\n  background-position: -88px 0px;\n}\n.iti-flag.ai {\n  height: 10px;\n  background-position: -110px 0px;\n}\n.iti-flag.al {\n  height: 15px;\n  background-position: -132px 0px;\n}\n.iti-flag.am {\n  height: 10px;\n  background-position: -154px 0px;\n}\n.iti-flag.ao {\n  height: 14px;\n  background-position: -176px 0px;\n}\n.iti-flag.aq {\n  height: 14px;\n  background-position: -198px 0px;\n}\n.iti-flag.ar {\n  height: 13px;\n  background-position: -220px 0px;\n}\n.iti-flag.as {\n  height: 10px;\n  background-position: -242px 0px;\n}\n.iti-flag.at {\n  height: 14px;\n  background-position: -264px 0px;\n}\n.iti-flag.au {\n  height: 10px;\n  background-position: -286px 0px;\n}\n.iti-flag.aw {\n  height: 14px;\n  background-position: -308px 0px;\n}\n.iti-flag.ax {\n  height: 13px;\n  background-position: -330px 0px;\n}\n.iti-flag.az {\n  height: 10px;\n  background-position: -352px 0px;\n}\n.iti-flag.ba {\n  height: 10px;\n  background-position: -374px 0px;\n}\n.iti-flag.bb {\n  height: 14px;\n  background-position: -396px 0px;\n}\n.iti-flag.bd {\n  height: 12px;\n  background-position: -418px 0px;\n}\n.iti-flag.be {\n  height: 15px;\n  background-position: -440px 0px;\n}\n.iti-flag.bf {\n  height: 14px;\n  background-position: -460px 0px;\n}\n.iti-flag.bg {\n  height: 12px;\n  background-position: -482px 0px;\n}\n.iti-flag.bh {\n  height: 12px;\n  background-position: -504px 0px;\n}\n.iti-flag.bi {\n  height: 12px;\n  background-position: -526px 0px;\n}\n.iti-flag.bj {\n  height: 14px;\n  background-position: -548px 0px;\n}\n.iti-flag.bl {\n  height: 14px;\n  background-position: -570px 0px;\n}\n.iti-flag.bm {\n  height: 10px;\n  background-position: -592px 0px;\n}\n.iti-flag.bn {\n  height: 10px;\n  background-position: -614px 0px;\n}\n.iti-flag.bo {\n  height: 14px;\n  background-position: -636px 0px;\n}\n.iti-flag.bq {\n  height: 14px;\n  background-position: -658px 0px;\n}\n.iti-flag.br {\n  height: 14px;\n  background-position: -680px 0px;\n}\n.iti-flag.bs {\n  height: 10px;\n  background-position: -702px 0px;\n}\n.iti-flag.bt {\n  height: 14px;\n  background-position: -724px 0px;\n}\n.iti-flag.bv {\n  height: 15px;\n  background-position: -746px 0px;\n}\n.iti-flag.bw {\n  height: 14px;\n  background-position: -768px 0px;\n}\n.iti-flag.by {\n  height: 10px;\n  background-position: -790px 0px;\n}\n.iti-flag.bz {\n  height: 14px;\n  background-position: -812px 0px;\n}\n.iti-flag.ca {\n  height: 10px;\n  background-position: -834px 0px;\n}\n.iti-flag.cc {\n  height: 10px;\n  background-position: -856px 0px;\n}\n.iti-flag.cd {\n  height: 15px;\n  background-position: -878px 0px;\n}\n.iti-flag.cf {\n  height: 14px;\n  background-position: -900px 0px;\n}\n.iti-flag.cg {\n  height: 14px;\n  background-position: -922px 0px;\n}\n.iti-flag.ch {\n  height: 15px;\n  background-position: -944px 0px;\n}\n.iti-flag.ci {\n  height: 14px;\n  background-position: -961px 0px;\n}\n.iti-flag.ck {\n  height: 10px;\n  background-position: -983px 0px;\n}\n.iti-flag.cl {\n  height: 14px;\n  background-position: -1005px 0px;\n}\n.iti-flag.cm {\n  height: 14px;\n  background-position: -1027px 0px;\n}\n.iti-flag.cn {\n  height: 14px;\n  background-position: -1049px 0px;\n}\n.iti-flag.co {\n  height: 14px;\n  background-position: -1071px 0px;\n}\n.iti-flag.cp {\n  height: 14px;\n  background-position: -1093px 0px;\n}\n.iti-flag.cr {\n  height: 12px;\n  background-position: -1115px 0px;\n}\n.iti-flag.cu {\n  height: 10px;\n  background-position: -1137px 0px;\n}\n.iti-flag.cv {\n  height: 12px;\n  background-position: -1159px 0px;\n}\n.iti-flag.cw {\n  height: 14px;\n  background-position: -1181px 0px;\n}\n.iti-flag.cx {\n  height: 10px;\n  background-position: -1203px 0px;\n}\n.iti-flag.cy {\n  height: 14px;\n  background-position: -1225px 0px;\n}\n.iti-flag.cz {\n  height: 14px;\n  background-position: -1247px 0px;\n}\n.iti-flag.de {\n  height: 12px;\n  background-position: -1269px 0px;\n}\n.iti-flag.dg {\n  height: 10px;\n  background-position: -1291px 0px;\n}\n.iti-flag.dj {\n  height: 14px;\n  background-position: -1313px 0px;\n}\n.iti-flag.dk {\n  height: 15px;\n  background-position: -1335px 0px;\n}\n.iti-flag.dm {\n  height: 10px;\n  background-position: -1357px 0px;\n}\n.iti-flag.do {\n  height: 13px;\n  background-position: -1379px 0px;\n}\n.iti-flag.dz {\n  height: 14px;\n  background-position: -1401px 0px;\n}\n.iti-flag.ea {\n  height: 14px;\n  background-position: -1423px 0px;\n}\n.iti-flag.ec {\n  height: 14px;\n  background-position: -1445px 0px;\n}\n.iti-flag.ee {\n  height: 13px;\n  background-position: -1467px 0px;\n}\n.iti-flag.eg {\n  height: 14px;\n  background-position: -1489px 0px;\n}\n.iti-flag.eh {\n  height: 10px;\n  background-position: -1511px 0px;\n}\n.iti-flag.er {\n  height: 10px;\n  background-position: -1533px 0px;\n}\n.iti-flag.es {\n  height: 14px;\n  background-position: -1555px 0px;\n}\n.iti-flag.et {\n  height: 10px;\n  background-position: -1577px 0px;\n}\n.iti-flag.eu {\n  height: 14px;\n  background-position: -1599px 0px;\n}\n.iti-flag.fi {\n  height: 12px;\n  background-position: -1621px 0px;\n}\n.iti-flag.fj {\n  height: 10px;\n  background-position: -1643px 0px;\n}\n.iti-flag.fk {\n  height: 10px;\n  background-position: -1665px 0px;\n}\n.iti-flag.fm {\n  height: 11px;\n  background-position: -1687px 0px;\n}\n.iti-flag.fo {\n  height: 15px;\n  background-position: -1709px 0px;\n}\n.iti-flag.fr {\n  height: 14px;\n  background-position: -1731px 0px;\n}\n.iti-flag.ga {\n  height: 15px;\n  background-position: -1753px 0px;\n}\n.iti-flag.gb {\n  height: 10px;\n  background-position: -1775px 0px;\n}\n.iti-flag.gd {\n  height: 12px;\n  background-position: -1797px 0px;\n}\n.iti-flag.ge {\n  height: 14px;\n  background-position: -1819px 0px;\n}\n.iti-flag.gf {\n  height: 14px;\n  background-position: -1841px 0px;\n}\n.iti-flag.gg {\n  height: 14px;\n  background-position: -1863px 0px;\n}\n.iti-flag.gh {\n  height: 14px;\n  background-position: -1885px 0px;\n}\n.iti-flag.gi {\n  height: 10px;\n  background-position: -1907px 0px;\n}\n.iti-flag.gl {\n  height: 14px;\n  background-position: -1929px 0px;\n}\n.iti-flag.gm {\n  height: 14px;\n  background-position: -1951px 0px;\n}\n.iti-flag.gn {\n  height: 14px;\n  background-position: -1973px 0px;\n}\n.iti-flag.gp {\n  height: 14px;\n  background-position: -1995px 0px;\n}\n.iti-flag.gq {\n  height: 14px;\n  background-position: -2017px 0px;\n}\n.iti-flag.gr {\n  height: 14px;\n  background-position: -2039px 0px;\n}\n.iti-flag.gs {\n  height: 10px;\n  background-position: -2061px 0px;\n}\n.iti-flag.gt {\n  height: 13px;\n  background-position: -2083px 0px;\n}\n.iti-flag.gu {\n  height: 11px;\n  background-position: -2105px 0px;\n}\n.iti-flag.gw {\n  height: 10px;\n  background-position: -2127px 0px;\n}\n.iti-flag.gy {\n  height: 12px;\n  background-position: -2149px 0px;\n}\n.iti-flag.hk {\n  height: 14px;\n  background-position: -2171px 0px;\n}\n.iti-flag.hm {\n  height: 10px;\n  background-position: -2193px 0px;\n}\n.iti-flag.hn {\n  height: 10px;\n  background-position: -2215px 0px;\n}\n.iti-flag.hr {\n  height: 10px;\n  background-position: -2237px 0px;\n}\n.iti-flag.ht {\n  height: 12px;\n  background-position: -2259px 0px;\n}\n.iti-flag.hu {\n  height: 10px;\n  background-position: -2281px 0px;\n}\n.iti-flag.ic {\n  height: 14px;\n  background-position: -2303px 0px;\n}\n.iti-flag.id {\n  height: 14px;\n  background-position: -2325px 0px;\n}\n.iti-flag.ie {\n  height: 10px;\n  background-position: -2347px 0px;\n}\n.iti-flag.il {\n  height: 15px;\n  background-position: -2369px 0px;\n}\n.iti-flag.im {\n  height: 10px;\n  background-position: -2391px 0px;\n}\n.iti-flag.in {\n  height: 14px;\n  background-position: -2413px 0px;\n}\n.iti-flag.io {\n  height: 10px;\n  background-position: -2435px 0px;\n}\n.iti-flag.iq {\n  height: 14px;\n  background-position: -2457px 0px;\n}\n.iti-flag.ir {\n  height: 12px;\n  background-position: -2479px 0px;\n}\n.iti-flag.is {\n  height: 15px;\n  background-position: -2501px 0px;\n}\n.iti-flag.it {\n  height: 14px;\n  background-position: -2523px 0px;\n}\n.iti-flag.je {\n  height: 12px;\n  background-position: -2545px 0px;\n}\n.iti-flag.jm {\n  height: 10px;\n  background-position: -2567px 0px;\n}\n.iti-flag.jo {\n  height: 10px;\n  background-position: -2589px 0px;\n}\n.iti-flag.jp {\n  height: 14px;\n  background-position: -2611px 0px;\n}\n.iti-flag.ke {\n  height: 14px;\n  background-position: -2633px 0px;\n}\n.iti-flag.kg {\n  height: 12px;\n  background-position: -2655px 0px;\n}\n.iti-flag.kh {\n  height: 13px;\n  background-position: -2677px 0px;\n}\n.iti-flag.ki {\n  height: 10px;\n  background-position: -2699px 0px;\n}\n.iti-flag.km {\n  height: 12px;\n  background-position: -2721px 0px;\n}\n.iti-flag.kn {\n  height: 14px;\n  background-position: -2743px 0px;\n}\n.iti-flag.kp {\n  height: 10px;\n  background-position: -2765px 0px;\n}\n.iti-flag.kr {\n  height: 14px;\n  background-position: -2787px 0px;\n}\n.iti-flag.kw {\n  height: 10px;\n  background-position: -2809px 0px;\n}\n.iti-flag.ky {\n  height: 10px;\n  background-position: -2831px 0px;\n}\n.iti-flag.kz {\n  height: 10px;\n  background-position: -2853px 0px;\n}\n.iti-flag.la {\n  height: 14px;\n  background-position: -2875px 0px;\n}\n.iti-flag.lb {\n  height: 14px;\n  background-position: -2897px 0px;\n}\n.iti-flag.lc {\n  height: 10px;\n  background-position: -2919px 0px;\n}\n.iti-flag.li {\n  height: 12px;\n  background-position: -2941px 0px;\n}\n.iti-flag.lk {\n  height: 10px;\n  background-position: -2963px 0px;\n}\n.iti-flag.lr {\n  height: 11px;\n  background-position: -2985px 0px;\n}\n.iti-flag.ls {\n  height: 14px;\n  background-position: -3007px 0px;\n}\n.iti-flag.lt {\n  height: 12px;\n  background-position: -3029px 0px;\n}\n.iti-flag.lu {\n  height: 12px;\n  background-position: -3051px 0px;\n}\n.iti-flag.lv {\n  height: 10px;\n  background-position: -3073px 0px;\n}\n.iti-flag.ly {\n  height: 10px;\n  background-position: -3095px 0px;\n}\n.iti-flag.ma {\n  height: 14px;\n  background-position: -3117px 0px;\n}\n.iti-flag.mc {\n  height: 15px;\n  background-position: -3139px 0px;\n}\n.iti-flag.md {\n  height: 10px;\n  background-position: -3160px 0px;\n}\n.iti-flag.me {\n  height: 10px;\n  background-position: -3182px 0px;\n}\n.iti-flag.mf {\n  height: 14px;\n  background-position: -3204px 0px;\n}\n.iti-flag.mg {\n  height: 14px;\n  background-position: -3226px 0px;\n}\n.iti-flag.mh {\n  height: 11px;\n  background-position: -3248px 0px;\n}\n.iti-flag.mk {\n  height: 10px;\n  background-position: -3270px 0px;\n}\n.iti-flag.ml {\n  height: 14px;\n  background-position: -3292px 0px;\n}\n.iti-flag.mm {\n  height: 14px;\n  background-position: -3314px 0px;\n}\n.iti-flag.mn {\n  height: 10px;\n  background-position: -3336px 0px;\n}\n.iti-flag.mo {\n  height: 14px;\n  background-position: -3358px 0px;\n}\n.iti-flag.mp {\n  height: 10px;\n  background-position: -3380px 0px;\n}\n.iti-flag.mq {\n  height: 14px;\n  background-position: -3402px 0px;\n}\n.iti-flag.mr {\n  height: 14px;\n  background-position: -3424px 0px;\n}\n.iti-flag.ms {\n  height: 10px;\n  background-position: -3446px 0px;\n}\n.iti-flag.mt {\n  height: 14px;\n  background-position: -3468px 0px;\n}\n.iti-flag.mu {\n  height: 14px;\n  background-position: -3490px 0px;\n}\n.iti-flag.mv {\n  height: 14px;\n  background-position: -3512px 0px;\n}\n.iti-flag.mw {\n  height: 14px;\n  background-position: -3534px 0px;\n}\n.iti-flag.mx {\n  height: 12px;\n  background-position: -3556px 0px;\n}\n.iti-flag.my {\n  height: 10px;\n  background-position: -3578px 0px;\n}\n.iti-flag.mz {\n  height: 14px;\n  background-position: -3600px 0px;\n}\n.iti-flag.na {\n  height: 14px;\n  background-position: -3622px 0px;\n}\n.iti-flag.nc {\n  height: 10px;\n  background-position: -3644px 0px;\n}\n.iti-flag.ne {\n  height: 15px;\n  background-position: -3666px 0px;\n}\n.iti-flag.nf {\n  height: 10px;\n  background-position: -3686px 0px;\n}\n.iti-flag.ng {\n  height: 10px;\n  background-position: -3708px 0px;\n}\n.iti-flag.ni {\n  height: 12px;\n  background-position: -3730px 0px;\n}\n.iti-flag.nl {\n  height: 14px;\n  background-position: -3752px 0px;\n}\n.iti-flag.no {\n  height: 15px;\n  background-position: -3774px 0px;\n}\n.iti-flag.np {\n  height: 15px;\n  background-position: -3796px 0px;\n}\n.iti-flag.nr {\n  height: 10px;\n  background-position: -3811px 0px;\n}\n.iti-flag.nu {\n  height: 10px;\n  background-position: -3833px 0px;\n}\n.iti-flag.nz {\n  height: 10px;\n  background-position: -3855px 0px;\n}\n.iti-flag.om {\n  height: 10px;\n  background-position: -3877px 0px;\n}\n.iti-flag.pa {\n  height: 14px;\n  background-position: -3899px 0px;\n}\n.iti-flag.pe {\n  height: 14px;\n  background-position: -3921px 0px;\n}\n.iti-flag.pf {\n  height: 14px;\n  background-position: -3943px 0px;\n}\n.iti-flag.pg {\n  height: 15px;\n  background-position: -3965px 0px;\n}\n.iti-flag.ph {\n  height: 10px;\n  background-position: -3987px 0px;\n}\n.iti-flag.pk {\n  height: 14px;\n  background-position: -4009px 0px;\n}\n.iti-flag.pl {\n  height: 13px;\n  background-position: -4031px 0px;\n}\n.iti-flag.pm {\n  height: 14px;\n  background-position: -4053px 0px;\n}\n.iti-flag.pn {\n  height: 10px;\n  background-position: -4075px 0px;\n}\n.iti-flag.pr {\n  height: 14px;\n  background-position: -4097px 0px;\n}\n.iti-flag.ps {\n  height: 10px;\n  background-position: -4119px 0px;\n}\n.iti-flag.pt {\n  height: 14px;\n  background-position: -4141px 0px;\n}\n.iti-flag.pw {\n  height: 13px;\n  background-position: -4163px 0px;\n}\n.iti-flag.py {\n  height: 11px;\n  background-position: -4185px 0px;\n}\n.iti-flag.qa {\n  height: 8px;\n  background-position: -4207px 0px;\n}\n.iti-flag.re {\n  height: 14px;\n  background-position: -4229px 0px;\n}\n.iti-flag.ro {\n  height: 14px;\n  background-position: -4251px 0px;\n}\n.iti-flag.rs {\n  height: 14px;\n  background-position: -4273px 0px;\n}\n.iti-flag.ru {\n  height: 14px;\n  background-position: -4295px 0px;\n}\n.iti-flag.rw {\n  height: 14px;\n  background-position: -4317px 0px;\n}\n.iti-flag.sa {\n  height: 14px;\n  background-position: -4339px 0px;\n}\n.iti-flag.sb {\n  height: 10px;\n  background-position: -4361px 0px;\n}\n.iti-flag.sc {\n  height: 10px;\n  background-position: -4383px 0px;\n}\n.iti-flag.sd {\n  height: 10px;\n  background-position: -4405px 0px;\n}\n.iti-flag.se {\n  height: 13px;\n  background-position: -4427px 0px;\n}\n.iti-flag.sg {\n  height: 14px;\n  background-position: -4449px 0px;\n}\n.iti-flag.sh {\n  height: 10px;\n  background-position: -4471px 0px;\n}\n.iti-flag.si {\n  height: 10px;\n  background-position: -4493px 0px;\n}\n.iti-flag.sj {\n  height: 15px;\n  background-position: -4515px 0px;\n}\n.iti-flag.sk {\n  height: 14px;\n  background-position: -4537px 0px;\n}\n.iti-flag.sl {\n  height: 14px;\n  background-position: -4559px 0px;\n}\n.iti-flag.sm {\n  height: 15px;\n  background-position: -4581px 0px;\n}\n.iti-flag.sn {\n  height: 14px;\n  background-position: -4603px 0px;\n}\n.iti-flag.so {\n  height: 14px;\n  background-position: -4625px 0px;\n}\n.iti-flag.sr {\n  height: 14px;\n  background-position: -4647px 0px;\n}\n.iti-flag.ss {\n  height: 10px;\n  background-position: -4669px 0px;\n}\n.iti-flag.st {\n  height: 10px;\n  background-position: -4691px 0px;\n}\n.iti-flag.sv {\n  height: 12px;\n  background-position: -4713px 0px;\n}\n.iti-flag.sx {\n  height: 14px;\n  background-position: -4735px 0px;\n}\n.iti-flag.sy {\n  height: 14px;\n  background-position: -4757px 0px;\n}\n.iti-flag.sz {\n  height: 14px;\n  background-position: -4779px 0px;\n}\n.iti-flag.ta {\n  height: 10px;\n  background-position: -4801px 0px;\n}\n.iti-flag.tc {\n  height: 10px;\n  background-position: -4823px 0px;\n}\n.iti-flag.td {\n  height: 14px;\n  background-position: -4845px 0px;\n}\n.iti-flag.tf {\n  height: 14px;\n  background-position: -4867px 0px;\n}\n.iti-flag.tg {\n  height: 13px;\n  background-position: -4889px 0px;\n}\n.iti-flag.th {\n  height: 14px;\n  background-position: -4911px 0px;\n}\n.iti-flag.tj {\n  height: 10px;\n  background-position: -4933px 0px;\n}\n.iti-flag.tk {\n  height: 10px;\n  background-position: -4955px 0px;\n}\n.iti-flag.tl {\n  height: 10px;\n  background-position: -4977px 0px;\n}\n.iti-flag.tm {\n  height: 14px;\n  background-position: -4999px 0px;\n}\n.iti-flag.tn {\n  height: 14px;\n  background-position: -5021px 0px;\n}\n.iti-flag.to {\n  height: 10px;\n  background-position: -5043px 0px;\n}\n.iti-flag.tr {\n  height: 14px;\n  background-position: -5065px 0px;\n}\n.iti-flag.tt {\n  height: 12px;\n  background-position: -5087px 0px;\n}\n.iti-flag.tv {\n  height: 10px;\n  background-position: -5109px 0px;\n}\n.iti-flag.tw {\n  height: 14px;\n  background-position: -5131px 0px;\n}\n.iti-flag.tz {\n  height: 14px;\n  background-position: -5153px 0px;\n}\n.iti-flag.ua {\n  height: 14px;\n  background-position: -5175px 0px;\n}\n.iti-flag.ug {\n  height: 14px;\n  background-position: -5197px 0px;\n}\n.iti-flag.um {\n  height: 11px;\n  background-position: -5219px 0px;\n}\n.iti-flag.us {\n  height: 11px;\n  background-position: -5241px 0px;\n}\n.iti-flag.uy {\n  height: 14px;\n  background-position: -5263px 0px;\n}\n.iti-flag.uz {\n  height: 10px;\n  background-position: -5285px 0px;\n}\n.iti-flag.va {\n  height: 15px;\n  background-position: -5307px 0px;\n}\n.iti-flag.vc {\n  height: 14px;\n  background-position: -5324px 0px;\n}\n.iti-flag.ve {\n  height: 14px;\n  background-position: -5346px 0px;\n}\n.iti-flag.vg {\n  height: 10px;\n  background-position: -5368px 0px;\n}\n.iti-flag.vi {\n  height: 14px;\n  background-position: -5390px 0px;\n}\n.iti-flag.vn {\n  height: 14px;\n  background-position: -5412px 0px;\n}\n.iti-flag.vu {\n  height: 12px;\n  background-position: -5434px 0px;\n}\n.iti-flag.wf {\n  height: 14px;\n  background-position: -5456px 0px;\n}\n.iti-flag.ws {\n  height: 10px;\n  background-position: -5478px 0px;\n}\n.iti-flag.xk {\n  height: 15px;\n  background-position: -5500px 0px;\n}\n.iti-flag.ye {\n  height: 14px;\n  background-position: -5522px 0px;\n}\n.iti-flag.yt {\n  height: 14px;\n  background-position: -5544px 0px;\n}\n.iti-flag.za {\n  height: 14px;\n  background-position: -5566px 0px;\n}\n.iti-flag.zm {\n  height: 14px;\n  background-position: -5588px 0px;\n}\n.iti-flag.zw {\n  height: 10px;\n  background-position: -5610px 0px;\n}\n.iti-flag {\n  width: 20px;\n  height: 15px;\n  box-shadow: 0px 0px 1px 0px #888;\n  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAFf4AAAAPCAYAAAAb+RpkAACAAElEQVR4AezBB2BVhdmA4fc7565MMgh7hwRkgwNkSQQKdU8cbW21ilZaK86q4ALUVqzrR6tIrVoXiFJABRERUcEFAQwjJOwRRsged5zz/eeEYiFEhlwUW59H5o4cr2l9uzNqVgHTZ69iwSALV7/5AQY3VcZkpRBMzyBr3CJsy+KQ8sYIrkavKbVVBpg47kmuvmAuGmI/4oPCKQ3ZeFsmRqxFbd2KPxUcCso+SvwmLYefQInfBOXIPbJU2EOpw+nAWCDI/vzAqOvgg5MAiwNdi+A4y5eoM0OlRMNZvkRmhkoFx9yR4zWtb3dGzSpg+uxVLBhk4eo3P8DgpsqYrBSC6RlkjVuEbVkcUt4YwbG5RSslipptXC84VpOiRFE7dguOxcmZShT1KMoVHL1HL1YOwlbFskEA0xSEg/t0TA/Bccsb65QoGn9Ra6HGcOWICCDsESaNErpKGf3b+Mnq3Yp+Lz0hOApPOFWJotSVCwXH578dpTEDenHHW2Fmvr2OFWetxNXhnS6c1aSUh86xKM7sRv8b8rDDFv9hs4fB/m4VHFl/zlccYggoqCpHY97t6YLrwpeV2lTIueFWEh4KULUphkaT8mnxxJOUVMeCKAc19ReC628LlGi6rp/gSp+gOHxekzOzWqJq4q36iInX/IV6MSHUpk7ihbPG/o63v+gKHotv5I8QXJn3KLVFDC7puZHXbpkHIQ/78UW4dHwWr3/WAjw2B8i9T3Bdf44STU9NF/ZQamnS0M9nM0+mcUM/tq3UMEALlYoRQbRQwWA/qSsXCo6ijp2VKErOWS441EEUiQOHOqil6utV7Jr0CsXvvE9kxy4Q4XD1KMoVHLaqUh1k891/ZueE58E0EK8XVDkoETQcBssm7frf0HTMn5CAH0NEcD14vvIt6vsi5PT/ivq+CMrh8XTdIbjSJyi1hW2GnZvB608MoS4VN40mOGM2eD3UlrpyoeCYO3K8pvXtzqhZBUyfvYoFgyxc/eYHGNxUGZOVgrZJx3P7nXgiYQ6l+64cwVG9pb9qZC3YJaAK4gXxAAYggHIkYlptFxw5HVsoUdQxZ6PgeLNZeyWKLti8SnBN7K1E0zWfCq4upyhX3Qyt20E4BKoclYt7Cg7NaaUcLROoAt6oRMbtEBxFHTsr+wqHSRh9J1euNnnptfl8PvlWOo66kdC69WAYHEpyznLBcevkNUoUPTwsQ3BseOxpNWNi2PHmDIIF2xHD4Gj0WvKR4Pg4taNyEGHLJmLZKOA1DbymwcH0LcwRHArKvurVgw0boF49DqqkBFq2hJIS9iUguO5FsaFBAHqkwOc7YXcEEA7OZg+D/d2L4LpHle9KAYXTW33M+JTbSXx2I23f3Sy4ut2vOExRWqcVkbe9PohNDRHG7/iCM8s343o7vhm3NDgZVPlW2XcLrgkDlcNlQ79Ug2kneannAWUfplDy0k7qj/pccCgo35GA4Ki6B6U2C8yuw/Be9Dp1ueTDp5mc/ykYHg5w1T8Ex9yR4zWtb3dGzSpg+nurWDDQwtVvfoDBTZUxA1IIts0ga9wibMsCEQhGEFNwqaXg94AqNfLGCK5TX1Fqi9hcMrAFrz3YjyMlDlx3XqHUZgiD1+zikVm5RAxhXxqBlmMqSR4cQiMcwNN1h+BYe0KSspcCQg0jVrGrBWyOSJuVxYIjsrSBEkWerjsEV/oEpbawzbBzM3j9iSHUpeKm0QRnzAavh9pSVy4UXB3uVqJpxf2CY2KTQTom4TQ2epJBwxy1FSMFV68nlWha9AfB1fEeRRVsBdPgqOXcJzh8PZ/WpL4f4W+2GSwTtQ0Ol9eATnE2C0sMYgxQYPNtHwgOdRBF4sBx1djX9cHrz6BBcjzRIA72UKJLcMy75WFN6dWdu+ZuZ+bcXD7qU42r/xcJDGxgM7ZvPex27dndtBUJsT5GP/weTRomcPO1A9hZWM79j31Atw4N+O2lp7B1RxnnDTpBcHy9vVpfXVbK9vIIPlM4Wk+d01hwfBrfTanFrg7SctxImt12DbvemM3qy0ZiBPwcjt7l2YJrxGnKt1EY2qKagbu/QBo+xVzfat5d8QUYJt9qwnzB1fkq5duEwvz+iiE8eecvcG2+7X52THge8fv4Nj2KcgXXVScqB6UkBuLYNP4dEmPiORRx4Pg0roUSRb0rNgoOzUeJIklHcAx9fLUSRbP+2E5wLE7OVKKoR1Gu4BgVl6yPVBZTpUqUCI4V9U/RRR0tPu5msbidxaaGNtU+EAXTAtPmiOy+MEdwfBrXQomi3hUbBYf/z92UQxGbGmpwKMHbswXXic8o0fTVtYJDHdTy2KuLGPnQ2+A1adMsmTVv3YAhwuEQB473Rz6gDfqeyKg5+Uyfs5SP+ieCQv9FlQxu5GdM/+ZE2rfjxcZdMfg3BURBAcEh7PW3rKaCY+7I8ZrWtzujZhUwffYqFgyycPWbH2BwU2VMVgrB9Ayyxi3CtixqqLIfEb6RN0Zw3Do9XzkEW6lhCIf08DnpgkMd1HLj1HW0fvTPXLkrmyE9b+CFRy4gs36AwyEOXOkTlNrCNsPOzeD1J4ZQl4qbRhOcMRu8HmpLXblQcP39N0o0XfUPwbH513/Q1N9cwo72Xbj7iXm8OvUrQtVh8HkgZPH6I+fS9c4bcS194DEuuflf4DMhbOOvF8eFJ6ZxQ2ALTcp30WjkNfh6dBUci5MzVRRsixoaERJPDeMqXejFlXhqGFfpQi+uxFPDuEoXehGP4jJMUIEeRbmCQx0czOTJcMkl1Hj9dRg2jIMRB47X5zewb17SkC1VHvEZytEK3p4tONTBQZRceStVr72NK+bSM6n3/MMcjDhwLE7OVKKoR1Gu4FAHh1BdWoYrkJjAoYgDhzqIInHgWJycqURRj6JcwbE4OVOpRSOQPDhEyzGVaIT9mKIMW9GDKTubgtgc4Pf/EFxtH1JcIQ+/OuMrFixrxfptyWDa1Ah7GHLqKorLYvjs6xbgtahhC2n1Khl2+nImvHEqeC1q5P1JcJzwyFnaMHEmthIVHw1HcCRc8ZbaqjRJimHp+MGMnbqSR2bm4vMYRGzFsm1AOFyhVy4UHO+PfFgb9OnBXbMLmDF7FQsGWbj6zQ8wqKkydkAKwbYZZI1bhG1ZuLyGTb2YIEWVASwV9pM3RnD8/OlspZaIrfRLT2L0kFbUZczs9SzIL8ZjCLW9+7tuguPJ9DP0SyMFE+VoWAgn2bv5Q/47gmNxcqZSi4YhaVCY1g9WYIc4Ip6uOwTHqf1P1q63DGNDfCnzt6ymsroYxAYxQQyO2FXvCo61JyQpUdRmZbHg+Py3ozRmQC/ueCvMzLfXseKslbg6vNOFs5qU8tA5FsWZ3eh/Qx522OI/bPYw2N+tguvmJUo0PdJdcCgoUSQguFo9r0TT+isFx1cd+itRdOKKjwSHOqjD5C82ctnfPsHrM9lX2PLz6tCHGdb6E7A5gJyE4FicnKlEUY+iXME1cahSmx3hwvQBvDHwLur0ykWwdCqYHEAeRHCogygSB44l9TsqUdR9V47g0GdOVKJIrv1KcMy75WFN6dWdu+ZuZ+bcXD7qU42r/xcJDGxgM7ZvPex27dndtBUJsT5GP/weTRomcPO1A9hZWM79j31Atw4N+O2lp7B1RxnnDTpBcCxOzlSiqEdRruBIf36AEkX5V34ouHo9rewrbHHt5T14oGI2xTPfoeDRf9L31nmorRyWRb8TXE/8TKnNjjAs83Re//ld1GX9zXexe+YsxOulth45nwmOdSld1ExJov7EPxMzoBe12VYVlr0NFEyzMYYZQ21VHy5i1zW3Y+0upvXuZYIjvBT1eOHdXcnctakFS8oTQBREOSgVUKF7fBljm23kjLQiImHwdkVw/COhuf5fVSFfRiqJEsGhDqJIHOyhRJfgKEjurERRo6LlgsPs8oISRdayXwuOxcmZSl0UiLMx0yzsnR48jS2IswnleZAKA4Q69SjKFRy3/L2z3tiqnKaxEbCFoyW9Nwquv/9cORIqtAiE+L8WG9j2XgE3P1JOeaWyD8F11gtKNM38teBQB1EkDlzt6itntIUEP0RsjtoDCwTH3JHjNa1vd0bNKmD67FUsGGTh6jc/wOCmypisFILpGWSNW4RtWXxDAVUwhP3kjREcadPmajNzB0siGYDNUTv/FMGxODlTiaIeRbmCo7BZWyWKUjfnCY7hX6pyCMoewqE9e5IIro73KPtSAVG+s5z7BEf124bmlscioqQQoQlBasRCcYWHSNDEJYACAigg7KHsIYZNYj0L39m24Gp/naIKCojQRat4OrQJlO+kz4YPBFer55VoWn+l4LBmpypRZA4pFByFJ5yqRFHqyoWC4+/dTlWi6KrshYJjG6lKFDWmUHDMb9dZiaLTVi8XHIuTM5Uo6VGUK7h+9qZSm+Xh4i4LmXzdgxDkPxSIg/w/tKbo/XqIR6ntpKqlgmPJ2K4aWVYCpvBthD2Ug7AUT5d6dB+1VHClT1BqC9sMOzeD158YQl0qbhpNcMZs8HqoLXXlQsGhDuqg8+Zg33ULeDwcCc+CxYKr15PKvxki2KocGQHbQ1P/bq5tOYe7/zlPcOSdhDa6A+KyoHQGbP4jRIpB+DcD2i2ixupegE0NBTxJ0OxxSDwbKuZBwYPQ9ksER/23eyu1hFW4MLaMSanbsBD2JR7YMDqWojk+xMMBehTlCg77C5QoMk5GcHzcrqvyb2oLYihetZhTL4NRzX+OqMW+VEzGbnqXwSVrCItJbX1XLxVcf7pCiaaHXhRcI99X6qLgNYRusYV0kiChgEGB5WVecQNsOwJC3R4dJDhan/5X5d+aNEigc7uGrN1URO66XbgS4v188MKVuE7/9fOUlQcREZo1qkfHjDTyNhSSt2E3IoJr3Qc3Ca6rTlSi6e9fCY65I8drWt/ujJpVwPTZq1gwyMLVb36AwU2VMVkpBNMzyBq3CNuyOKS8MYJDHZHyCorWbySt0wnUxS4r5+vOp2OXV4AIB9N9V47g2NH+VCWKGqxaKDiWJZ2kRFGX4i+FPZSDaGR4aGn4cG2wQxTYEQ5BcF03RKnNinDJif157dq7qcu6X42gaNosxOuhth5FuYJDGK44FJPeXbYTDBssXpWKqiDYuPymsvj8UnyGcihtJ08WHPefMlTH9mlFSADl6D36N8F18r3KXirUEOVbCRCM0CCtHhNuyKLX1MnsfnMOYpq4uhR/KbhOnqocQEBNwAaxOSJfXCg41l/gU6Kg1ZshwXXHSUotHsMk/5ZptEhqxF6qiojg2lhcQPr484jYFgd48EvB9eD5Sm1WhAs79OON82+lLhe99TBTVywA08MB7nhLcF37qRJNz/QWHG82a69E0QWbVwmOoo6dlX2FwySMvpMrV5u89Np8Pp98Kx1H3Uho3XowDA4lOWe54Eg+ZfzbZZ742zRUnGN9+SeOSMd7lGjKuU9wzL3pIU3r04NRc/KYPjubz4cl4jrlrSoGNw0wpn8LaN+aLif8Dp+EORRP1x2CY87I8dqwb3dGzSpg+uxVzB9k4TptfoBBTZUxWSmE0jPIGrcI27L4hio1RNhP3hjBsSatiRrx8RgJ8dilZWg4TJu8lUggwHchDhzq4BDs0nJWdjgTu7wCRDiYLsVfCo7VSelKLRoOk3jxuTR+/gnqsu3KGyid8i/E66W2dsX5gmNxcqYSRT2KcgXH2b5EHRvXCJfFEVBAOECPolzBMefzTXr9uMWsWV8GMR6O2qJLBYc62EdpRRkthp1MSVU5gnCkdN5mwaEOokgcONrc19u+/tNdMuLWCax88Wn+kJrP6gaXsit+MGgEEMAAFARQEI2ghgfUBMLs54ZegmPuyPGa1rc7o2YVMH32KhYMsnD1mx9gcFNlTFYKwfQMssYtwrYsvqEGNcRmP3ljBMfg3m/q+GW3kVGeRxVHLxUEx/1xjfTByh1UqU2UCK7hKN8iMQyb/gmJYQ6bgOA4Y+oKJYreubCD4Mjp2EKJoo45GwWHOqjDijdmMe/uJ6guKUNEOFw3b1kguNInKLWFbYadm8HrTwyhLhU3jSY4YzZ4PdSWunKh4Op4j1JbxODivmuYPHIWlmWwL/HAhtGxFM3xIR4O0KMoV3B8ekpfpS6qCKAiHInen38sONRBFIkD1wtrlaMigPKNX7cRXL8/WYmm//tCcJgXvKenpCfy5doywrbiNYST2iTweX4plnIQCrYHIl4GtP2ah8/5B3Z4Cz2HbhFcpz2o1BYxmDwin4tPLsKyhBoC4hGK3y1kx9+2oGEF4QAdVq0SHOec01nv/sRPbBgiBketS/GXguv6V5XaVJjz87EMavE172/sxOB3R4Eoh+WpywRH4QmnKi7LQtJSMWJjsTZtoYYIRyp15ULB8cnND2vDASdz99ydvPav5SwYDKGwxaCPA5zfxuTePomUZban9z0LUMvmkPLGCA51EEXiwFHUsbOyr3CYhNF3cuVqk5dem8/nk2+l46gbCa1bD4bBoSTnLBcc6iCKxIGjxdu9lSjaeOangkMdRJE4cI07TanNhkvaCq+dZWBH2I8EhMJrd1A1uwLxCLU135IvOLL+nK9E0bzb0wVHz7tPU6Los/vnC464k8do1YqnsSu2EiWC46YruumES0LEVwkqHLXdF+YIjnpD3lKiqGT2+YKj9LUpuvOOUWhpKXg8HK222zcJjsXJmUoU9SjKFRz9r5itRNFHLw4RHHNHjte0Pt0ZNbuA6bNXsWCQhavf/ACDmypjBqQQbJtB1rhF2JbFXkYkgm2YYAj7yRsjOOaOHK9pfbszalYB02evYsEgC1e/+QEGN1XGZKUQTM8ga9wibMvikPLGCK7Mq5XaIgYX981j8o0foBb7EQ/kjm7FrveTEY9SW+/ybMGVPkGpLWwz7NwMXn9iCHWpuGk0wRmzweuhttSVCwXHsqSTlL1sBUNweW3lvlOSeK19PNjKYXtquuAobNZWiaLUzXmC40tQougkEFxtRysuhfhYL9XBCBFbOaRqL4n1KikNetlP3hjBMSwjQR9qk4qRr4QjIB6OStu8DYKj/ZvDNWQY/HbpFjKLqjH87fEb5YzuJlR5PdiqiAigCMKhrLrgWcGxjVQlihpTKDjUwb9V5uRQtXYtqWefzV4rLrqIHVOnYnB4TgPBsSm2oRJFzSu3C46tfxqr/2rXhN9deRV7XfarX/G3S64g/7JrwTRBhMPVoyhXcMwdOV7T+nZn1KwCps9exYJBFq5+8wMMbqqMyUohktmOp0qrEZRv4zNCBG0/r/zuHKHGBGUfIopLVdhDqE85K7iPNCpQDs4AwdHi7d7KEYggxIjNTSnFnLh+O8PvLmVZboR9CK5fzFGi6eXBwh5KdAmOCy+4R21bcXk8Bq5IxEaBOEP5ZWQj8YaiCIej/7QXBMeFF9yjtq24PB4DVyRio0CcofwyspF4Q1GEw9F/2guCQx38myo1RPjOxIHrmbe1ns9D28Q4vtpZAgIpfi/KHkXBMEfk2jMFh65HqYsNJN8LSffwbcSB66ZPlb1UqB8oJef860kLlGKrUBcD2Bnx0TGnP7siPvZz1T8Eh36JEkVyEoJj7sjxmta3O6NmFTB99ioWDLJw9ZsfYHBTZUxWCsH0DLLGLcK2LA4pb4zgUAdRJA4cuRnNlSjKXLNJcJwSG6+/t5rTJzaBalUiKMJ316X4S8GVPkEJ2ww7N4PXnxiCq+Km0VRPn4WZlorLLi4BEQ5H6sqFgqvjPcpeYYvuHZqAwJLlm8HvxeVXm48KpuBVm0PpUZQrONqe8bISRXnv/EJwLE7OVKKoR1Gu4FAHh0NtEAPUBjFAFUSoTRy47jxbUaVZUhrPXfBHsrYWs+OhMYR2bEe8Xo5Um0VLBEfjv6AcoYiABZgKChgCFmACO25FcLw87QUd8/m1eBrbhCMGIhwVz+NFaQzM3saUIfFkjxhOzHOTwDSYNyKDAX3SmbgOZsxYBrbFfmwBAUT5ybe7K7YhSyPVbLJD1KVtcxNlDwHyNlnUpbnh467YhswMleJ6vCiNgdnbmDIknuwRw4l5bhKYBvNGZDCgTzoT18GMGcvAtviGBahSQwBTOFIGYLOHAdj877FspWX9AF1axLGzLEz2+gqqQhaGAYYIxycBBBAgRANK6EIpfVp5GZjVkQ6nDyKuW3s2795ESnoneOkJjqUHCrpxxqLdzLgowme3X0LKU2MRw2TRHbH0HNiBiV+nMvNfK8Gy+A+LYcM64Jo8eQVgUpewCl1jglSpQW6FF68oP1oKCN9ZKGzx1sw13HtLL95f2Jsrnx7JP65/lMRACLU5/gkgEBOmRpUXUED5yXcU07EdqVdeQqRwN0XTZyMiHKlzPvktD3e5k/Z/uZu031zKhhvupOyjRZhxsWAYYNtoOIJLvB4wDLBtrPIKEvr1ouWTDxDokMmqsrXc9tUD/Fg9XpTGwOxtTBkST/aI4cQ8NwlMg3kjMhjQJ52J64TZ05dwh2XjElW0qhoxTcQwsMNhjIAf2zDYl7/JfNAq7NAKNLQMO/gZdnAJGtmI2uWICIgPxAQVQADlf45t0MAXxrUj5AXD5rAs+xxu+SUMvQguuhqSUiAc4vujgIUqiCjgQdUAr4GsDsLkatht82PlSYjHCPgR0yCahnS4hLrYlk2Mx8tpPZrTOSMV0/CwdPUOPly8kcpIGI9poNRhwd0ctjffpMYFF3DYFE5tAK/+DJYVwig//Hou5JcDQt0sGNaWGpPzAJNvZ8NlracyddPZhCwfCAdnQbPkbYzNHMPP5k+j8EUvJRVe9iUCwwd8ydWnfcV1L5zNF/nNwFC+FzacmCy82t1Lshcs5RviEUom76L4+e38GDxelMbA7G1MGRJP9u+HE/PcJDAM5o3IYECfdCauE2bMWAq2RY3yaob/pjeVoQiuWL+HZ5//FOL81EkVn2kQspTjnlLDrG8T2W4gJsT1DVPxqRe7VMDgv169hADRVMIepwa38E7oFV6K6cwzKb0JBWLQ6iA1hCNWxTGm0KJBIpktU5i3eCOWrURDqKARO16/DH+zzST2XkBM882oZaK2wV7CHsp/CFAQFO5tYxHvgXm7DTzC0VObsmVvEt/5PMTwUNvkucvIXrONh67/OYNPyeR491hpIwbmbGfq6TF8de1viZ34LGIafHBVa7J6t2XSZpN3ZufQtGEV1cEIf737TAqLq5gw82WCpV6uu74d9WjD088tICbWz14dG/gZNaA+7+WVMyevgrClmIbwoyVgmyA4hJ/85Ds5xxdHe9PL3RVFrLXCREuDIuH8+R4unO+hWmBTI5vFGTaLulgs7mCxqaFNtQ9EwbTAtDl+iQWWDylOx6XJ68EIgZocFcsEUZLjKnAVVcSBCpgWP5QnSuMZuHQjUwY2Jvt3Pyfw7HNgmnwwvBNZp57AxI3VvDNrMQ1/0QlME0SI+GNA2UPAE6oCVfb1eFEaA7O3MWVIPNkjhhPz3CQwDeaNyGBAn3QmroMZM5aBbeESID4xFkXwCJgChSWVHCkF0lMDuNburkb4yZG43ejC1a+8R0fPNCb98kLuGP5HHnj2Y16b+hWhUIQDhG38SfFc0CON4d5NdPTkkvKLC8hr1o7hzyxgL1EojTdp0D1ILDbVYQNvYxsUEnxhXN7GNigk+MK4vI1tUEjwhQl4baow2L7ET2K5RZ22b4d33oErr+SwPP88nHEGNGxIbcNalEqPpGq9KbuhztwaLx5RDOHY8yjek0PU8CjHs22fLGTDyy+za3E2rvo9utHyF7+gcZ9T+ckRUDi500aGnZZDUnw1U+Z3pGB3AiickF7Ahf1WUFgay67SWPK3pIBAcr0qzuu7ggv6rCRnfRrzl7VCVdhrTcFdJAaWEvBuQokeVVAFZQ8FVCFiK4M7N6BrqyQsWzlcD7xCjSeKGjBw6TbeGBJP9ojhxEyaBIbBByMyyOqTzsR1MGPGcrAtaiiEg3Baw4/5oKonRcF48Bl8Xz43UnjJkw7YfDthD+XbGdgRjrn7v9zBy1c8Sp9rT+LJ4f1YShpTNu3gw4KVFFQUgB0GwwAxOSZUQYTD9UBBN85YtJsZF0X47PZLSHlqLGKYLLojlp4DOzDx61Rm/mslWBb/YTFsWAdckyevAEyOByF/DJuTm7O1fhqFEker3dvosCsXbzDIT/47Xf9ADj8IEVDlePFYaSMG5mxn6ukxfHXtb4md+CxiGnxwVWuyerdl0maTd2bn0LRhFdXBCH+9+0wKi6uYMPNlgqVerru+HfVow9PPLSAm1s9Pvh/Nv57Drj/ey9asC4i/+DzqP3YPZpOG7BUJbaB48jWgkHzxRIy49uxlbd3Orhvvo3zKNOIvPo/6j98DTRrh6nUZ3HUNnDeoiKFpxUzbnszYLc1ZXJ4AoiDKflRAhe7xZYxuuonzGhZBRHlrNoybyDd6eGL5e0Isn0UqebaqkC8ilfxYiQiqyr5EBFUlKmz2MDh+CVBhoA0tGtxfSmirQfGkOKTCAOGQPi7ysbgkmV82reLyppX4DRuU75cKF6cV8UfPep4eV8grs0Iodbu4UzJ1sm0QATEA5XBNmUmdPv/8c2zbplevXhzMZ599hqrSq1cv6rR6F2wqgSFtoVMDsBVUOVqPF6UxMHsbU4bEkz1iODHPTQLTYN6IDAb0SWfiOpgxYxnYFt+wleZpsSTGmuRsLAfhAB08G7kw8AFLSm8BCVI3A9SghkT4QYlwcAoIoIAQLZZCh3rUWFECpnBkVDBtm/S09azZ0Qo1BUT5rvLKY+nycm/wKNcZm3jaswpCYA+FddsDfPpGQ8q3B8BnodUeLAsMA0yfjRUWTBMiEaHPLzaR2bkaCLJXw9RE+p+cydsfLiOuVRO6jLsL4TvqlMlPjr0Awk8OQUAFBIdy2CLLSqievBnBoDYFBFD2EEAB4UCKTYD/AraSlhpDSUWI6mAERDg4ActLo0ARVzf/gEsbfUQi1dzNHhVfQv6FEN8bGt0BmR/DlpuhZDYIYNtQvZwatg0GoEC9IdD0EQitg7VnQfmn/FcwfDb1upaz+7NEEH5cFDK9fu5OmMNpJ6wjJ3A67+du4i8tN7OiLJFr1w5lbRkgHJLXY+LzmnRo24DMlqmsyt+JYQi1KeD3mvi8Bp0zG9K6WTKr132GxxSOmLKHcNgeL0pjYPY2pgyJJ3vEcGKemwSmwbwRGQzok87EdTBjxjKwLWqoQthGRABFFfCaIOzHrqqmcMNG8jdvJC41hZi0VMTj4Sd7eBHO9ifSxvRRYEdw9TPiWGuFmBEsJYzyQ1E8jL1xERWlfp6afAIdWxfRsmk5879qTHmlCWLgb9sWn8lhu2TlDtKLqrl5YFsK4rxgK9FkAinxlbh2V8Rg8S2qwpwxpAsP90wlMPpeduduQvxeXBoMUidRCPlJ8BXQrvFadpSlsnFXJsREQJXjXf7uzZQHK+naOJOfHB9+XZx7RrNwZb/nk9o9nvOzGX+lbEMRC3/PD+nxkhgGZm9kSlYzll43lIJXX0ZMgw9/14XTep7AxI3VvPfeIl7KtMHDYXuyKI3Ts7cxeUg8S0cMx//cJDANPhiRQVafdCaugxkzloFt8Q1bOalJDK4vt1aBIRxAlcApJxH3s8FUzH6Pqo8/5ViIWIrLYwrHJRGOhRmhUpZb1fxffFPamD6qVBEOQsEIgHgVq1z4NoM6LGfF1H48OXkn9z69lNLyMARMUP6n/CM/jb9ckMngNvX558Unce5Cg/xdAZ5JUFDBHyyipbGBHdUJeKqL+Fnshyys6M5OTzNOj/2YnNLm5Dc8AzTMvh4vSmNg9jamDIkne8RwYp6bBKbBvBEZDOiTzsR1MGPGMrAtXBL2oB6b2NS1NKyOZ11FA4iY4A2zrzmNhtC3fm/+mPsYN6x5ghirkiAgHJ0LffXoYPq5vaKAfCvI90aIOktNbEwExZQIgnK8skJhUOV/mg2hlFiqAkrS9jBqR0CEHzfBg4VPIgTVi4XwfYj3mzx6TXvOG7OEgt1BUlL8PHp1e4be+xXFVRYIB7JNiHjJyljOuDNfImDm8dB7DZif3wTYQp3CBsN67ebiU4qwIoJLTMGutil4YjMlswoRj4BwUNPbRVhR3+bhD/x0KDQImhz/LAvfkNPxnTGYqiefxex4AvaafDQYBMPguxhf0pizlxfwQh8fd1w/AuOZ51CERX9sw0knt+GVHQFen/wVYtko+7AFFDCVQwmGIsxfvQ3Xae0a4/d5+MlPoiFiRzgWPKndSOj/DKH1/6J6zctopIpoGDHZi+upS0LEVAkqHNcSLrkIb5tW7LjhJkKrcxGfj+NZKOLj0JT/EA7H40VpDFy6jSlD4skeMZyYSZPAMJg3IoMBfdKZuA5mzFgOtkUNBWzl3jt789EnO3n/w3zwCIiwr8eL0hiYvY0pQ+LJHjGcmOcmgWkwb0QGA/qkM3EdzJixDGyLbygOBQVEQPjvYdt4GjfA2rkbtSxcETXAMsBWjlg4zI+OABGLEzu1YkXudnYWVYBhcAABgl7qxVVx//D3mP1ZBu8sTgfTprbJa8pYQZB/XNaI1is97P7KwiUmR02wCcY2IBBowKbyzTTyBLE1EQVaxjegMFiKiUFpuBIR4XgQ3rWLbRMnsmvWLOI6d8bfvDlimhxvtvz1ac6+7EJavvMOFw27mMryCl596SU2bd3KlLf/yc7Lf0e4pBzxmByJx4vSGJi9jSlD4skeMZyY5yaBaTBvRAYDeqczcT28/fbXxPdKAUOoLaIeEj2lXJP+BH9dfRd1SUuLoVu3VFzZ2bvYubOa70NIhc4xQUbF7yR7aiFDnqqgpFz5b2DbSlxcAFVlL5+PGoZt0+L8c0iM86OqHJZpL+CybSUuLoCqspfPRw3Dtmlx/jkkxvlRVQ7LtBfYKxKx2LYll6qK3RiGSbNWPQgEfMz5fDvZa4owDeGI2TaDmtYne1cJoKT4fbgEUH5yJB4vSmNg9jamDIkne8RwYp6bBKbBvBEZDOiTzsR1MGPGMrAtaihgGYDwDdMC4TuxFQzhB3f3IzDtw3yeeSvA743mnBITT5XaWCjC8UtUOblTU1ZvKATL5twhnZgxbxW2CNGkSg1VRQFhDxHBJcJxIbJrBxVfLMCsl4KGg4jHix0KgmWhoSAYJkTCqG1R74yLEI+XujTyhSmo9rO5eAfnvngfN552IXdM+BuRpyZQ8uFcxDRBhGPNEjhtF2TYsDoWYm3YasLJlfClD+ayx+XnXkHXjJ787e0L6dslB0M8KMp35Zm08kWqlkRY/QYkmRAqLsPVJCmB5RNhqA/O9PtI155UI6AgEYPYljtRy6JycyPw2CD8IBTFCofAMDgexYnBuLhGXFW2iQjKXoYBPTt7yWxj0rKxiWv9Vou0FIPPloexbb7hQRgX14g4Mdhr0soXqVoSYfUbkGRCqLgMV5OkBJZPhKE+ONPvI117Uo3gMZV+3f3EJ8Rj2R5CVWXMX1pJOCIcigIKGECBZVHfNHHtsCwamCY2IIDw7fxE+CFpBBAQD6AcEVvBEGrYqjRPDfDor9vSJNmHrcqqrVXMX1HM7KW72V4SxhCOAwIIIECIBpTQhVL6tPLSv086nQaeRv3eJ2G0O4EV777EtKnPs+GR+ZRVxjD2szyOtbfW/AFdbqFvGPQ074CiYlwNkpPQCcLVfpurAj4S9fdUYrKHyaxZa9lDAAsw2ZcYQltfiCGLplHljyXc9edsrvaAKselgJ+DsoFQCHxeMAxAOWI+k3sfWsiNI3oQCp/PuQ8FmXHH08T7g6jN8UugfYXN2Pwgp5RauD5PNBmV7mdVnAHKT76DnRP/ydb7xhMpLMKIjeG7WFycw4D5l3J160v5U7vf0e79N9j9+jQ23zaG0NYCfE0bU29gf1wlcz8itGUbviaNaPn0X0i59DwqIpWMznmE59a9hiEmP1aTVr5I1ZIIq9+AJBNCxWW4miQlsHwiDPXBeX4PW7FBlV2JsQRGjaBy7TpKN26i2aCBlPztRRoV7MYWYT8Sg+E/EfwnYiZciUvtYjS0HLVzCK79gMjOr/G3240Gy0EMEC9gAgIIoPzXskwubbKDv3XPw3VddjqvbWkIpsVhiYRh5quwYDZcei0MOg9MH4Rtji3FIo6iSG/sQFfqGQsxg9lYvtYY723EO2s3IODhRytYsAMzLha1LKKpwvCyP4GIRee2TbjtqtbUTyzDZ4aJ9/vp2SuRXw0byH3PrCA7bxt4TED5TqZMgWuvpYZlwcUXc1gicNdJ8M9V8MhSyGoKt3SF380HvIAFKQEImLC1mj1MmLWJPQzAAkz2IygpviIi6uH2Do+RX9aaNWVtqLBiCdk+DmCDzxtiRKe/c8POR4ncWca2vAB4wDCUb4QiqGWyYUcMK7fEs3F7LIQjIAoItq3sZdsKwQigRIUNnRKFKd29NA1ARPmGeIWyaYUUPVPAIYlAp07g90MwCF9/Dap83yatfJGqJRFWvwFJJoSKy3A1SUpg+UQY6oMz/V7S6UXQhrGjz2TOh7ksXrkNEHp0aMS40Wcyavwc1BD25TWF9o3iOff0Fvx9Wh5bi6o5bikYiYo/wyI+K0jJmwHCm0zK3vPhz7SgCQRXmWDwX23D3JuJpqT4O3GFxcD164psLpO1NLj3FpKvGEaNiMWRigncwDFl2ZzarRmXn9OV+V9uwLJsMA2OmmGDYRPc1hhjzq/ZHpdPvT6fEGi2CbVMLMug2sYhBAzFEFAg3oQ/Z4b4okQ4r1GEGTv9JHuUo1GeM52Sz18g+bSRiOGhLl6PSd6mXVx+z6tce14v/vSrAcTH+jleTfzqGSo/ibAqAikGhIrLcDVJSmDZMzDIA0P9Ph4540biEgPc9eD7pJ70NQ1bCV9vX8Kzs3OIL+zFyZ2aUVhYwb4CHuGc9gmc3DSGqTllLCuoxjQEQzj+KAchGOXQIT8Fdq7hw1algIByXLNNwDQ5Ena1wQ/CC1iAAAJE+K8UQmlrepmUkMb4ymLeDlUSDbaA7QEMCPQOc0KSTWcv/GKWh/Kn/GxqbLO4nc2izhEWt7PZ1NCm2geiYFpg2tTJrjY4FoIRgzqJRaCiBQnLLiegAQyxqSBMeedXqI7fBGryndgG5/ZYwqL8NvRotR4Bvlrfil7pa/nXkm5g2PwQnlv6FlWfhVn1uk09A0LFZbiaJCWy7BlliNfg7LgYxnI+lgh2VTXdX7wHTa7AixApMVl6wb0YsX5QvjFp5YtULYmw+g1IMiFUXIarSVICyyfCUB+c6feRrj2pRjBEuOb2M4kNGCwtCJK7I0zlK+9SFVGOhKrSpJ4PV35hFSLCTw7fy7Pyeb1eHOf0SOeaZ2fS0VPJxN8M446rfs89//chXq8HVcXl83m44LTm3JC4g3aymsTLzmdN4wz+8OzHvDF1JlZ1mL1MVRan1ePhwa158IQV/DJ9M4YNahlgsIfNHgZ72CCmjW3Ay2ub8acVHbh18zoGlhVygPJyuO02mD8fTBOuuIKDevFFuO8++PBDeOopiItjX5YttE0Iy5Q+W3gqL0nH5tSnOGSK11COqZDgv6ASl7VEOJ4FYmPZuHgJVsvmuCoXL6HdNdfwXYW3bKdo8iyqluViJsSS8LO+JA7ti3hM/rsJA3vkE44YnNxuK1+ubkrBrkRcvU7YRFJ8kLhAmG5tt5G/ORVQ6idU0qvDZoorAgw6cS0LlrfCUr4RseJYvW0cXVpcBUSIloDPwLbB7zVweU0h4DMQ4NyTm3JVVisitnK4HriMGpNWvkjVkgir34AkE0LFZbiaJiWwfCIM9cGZfh/p2pNqBK8pXH5hF5a+nUNm/GaaDDyXt2bngiF8H0wUsAGbOimkeyJ4gNURDwjfykSpiwHYREea388t+Pnkr59zy2vv8ptbE3n17BOpzuzFosp+zNxVxbvbVrOqeD12pBJEwDAB4WhpOIxZvwF2yW5AOBxvrfkDutxC3zDoad4BRcW4GiQnoROEq/02VwV8JOrvqcRkD5NZs9ayhwAWYLKfoM23EkDZnwDKUclr0oZLrnicgfPfILd1Gr7kNjw69UFab8jlh2IHQ/zk2Hl68ga+TyqCEQpjRyJE6sXjrQ6hXkEtEDEQVX4IE796hspPIqyKQIoBoeIyXE2SElj2DAzywFC/j0fOuJG4xAB3Pfg+qSd9TcNWwtfbl/Ds7BziC3txcqdmFBZWcKxFbAvFBgRQQKibAkLdFBB+zMzGDWg4+SkS513Bruv+xIb0PqSMuY16N16FeDxYm2PZ8fZ6zLBSr68f2oJGIpQ89nd2j34Yb4umNPlgKjFZp7Kvr1bABSOhe3sYfa1y3qDdnNewiGnbkxm7pTmLyxNAlBoqdI8vY3TTTZzXsAgiyrRZMPZZWLyS/URQXD09sfRMiOWzSCXPVhXyRaSSY8kqr6Jy1TpAiW3fBjM+hqM1dOhQPpg3j5hwGFeV18vpWVm8++67HBVbwGdjNgzjsrZ7ISRgcEiW4eN7JxBZ42Xn07GgYBcZiMFh8QoEbXhinZdZO5P4Q8sK+jaMoYZtcUypkOKNMK75Flqu2c3VDxaRv8VADAO1bfbqeoKHpSsjuP459U72Y9u4PJ06YG3ajBYWgs/P4ZrCgSoqKnjqqaeIRCKsXbuWyy+/nLq88sorzJgxgyZNmnDiiSfi9XqpU2UY3loJq3bCkLbgB1Q5GpNWvkjVkgir34AkE0LFZbiaJCWwfCIM9cGZfh/p2pNqBBRiE3zcdOU6Un3KdX9tTWV1NbWVaCzrrMaATd0Mmhk76e9dSqHWY36oG9WYHIoPm2+lgADKHgIoIBySVlZyKAaCAooSDQKoAfHrPsKl9fsjCsphsk1ObbmSX566mPyNFpk/W8Rjc/qxaldzEJvvRBS8FpiAoeABbDD88MW0RlQWeUhpXUlCk0q8CC06l7N1m0kkosTFKms+SSVSEmDBy81oc996IEgNy+bMAZ145PaLGXR1IeVfr2H1NXejHCXhoARQpYYIKIdHOEZUORZUlWNhHJUcioWFIBgY/M8xYOMOP9u2xtO4iQ3/zx58AFZV340f/nzPOXdlDwh7EzYIgoKKOBBBlgu31lqIq75KW3xbrbtaa7W2WgdKfWsddVtbcaCgiIKI7CEjBAghELLHzbj3nvP7/nvDHxyFkAi0tu/7PKaOzj0ioBycLQgW2BbfJAELoh5yahag8EEJ4rchYvgm8QBb+LemSq8u6Vx6Rm8KS2p5eW4uFdUNIMJ+eX6yAlVc3nU+l7T5gEyrAZPWhYQh58GDDxAn7BFeBJsnQfKJkDUDksfArrvAVEN4IftYKdDudgj0hIJroOZjGgnfIU5bGrlFtIgBX4pL6uAaKpak8k+hQqLjEVfr2iDKt5WVYDOr+2LKQwFOWDWVKc5yXE1mxMpLuLfPcn7faycXrOpI2DMcTDTmUbCriqSQj4Kqejq0SaGwuIZvEiAS9SjYVUVCyEdxWS3tWidTXBZGRGg2I2QFPOKKIzZYSnM8tf4Z6le4bHwV0myIVtYQ1z4tmTWzYJwfJgT89NDhNKiQnBwg5aTORKuqUNtHMDGB8g+2Udfg8lUluZvZuGM723fvICAWfQcNIqFdGw6VH8OR5hiwDCA0j4KxwLVotkmBVFLFYp0b4XhfAnGLYnW0sxwmBVJ4PVLFv0piKMK44QUMu+hCUhLC/OmeDzj6qFKu+OnJPP1mH8RSkoYNw++zaK6IbXH07hpefGMtN47uyeftU8A1IMIhU2FEjwKmDFtH3Kuf92dhXiewlEYCxDySEoP84vrTOH/jEiqm/ZqwKhL0o9EY/lCI5Duvgxu+TyP1s0/U4dKRz/Dkz1/gxdfggsnw4gd9mfa7u1B/CFT5Lnt2xdvUxyIc1a4X/+e7IcF4XFS1OfmYhpJbXqzbdf5Lqdm3l19U8CoV613ePZ1/hadWz8bdHmH7Wpf01X7enmgTd8nLHpsXxJgUtjk77MeHoSWeXP8M9Stc1r8KyTZEK2uIa5uWzMpZMMYP4wJ+3tfhNCCgSpzL/2f4OwVL+Cr1PJx27YhtLyBWUAgCWBaHU3VdlNnLtiHA+KFdSU3w811jaus4KBEEUFVaYpsX5ZzqbdyW0IbzAmnUqmF/1ICpFbKfqmbnYyFqPvVhBZT9SjwDB/jRRWl8b3xHbn50A7Ne3YDaFvgElCNGVXGMAZ8Pzxj+lU6YNkPuaBukdYfunJdyLoOyRnHbFoFiD7DoUrGQY8wCltQeRXGgG59uFmyzBLdTOmuq0siMrCNTMijLOhbUY6+n1j9D/QqXja9Cmg3Ryhri2qcls2YWjPPDhICfHjoczxJyLvmAx14ewcnd/VgaxGwOk9V/OZ8vHgHGYR8To8YKcXe/23m14xTuzruHCd1KcD3BGFru44+Ji6D0soM8n9yZX9bt5m/Rao409QDDYaMIqkKfxNV0D60n7KWwumY4FW4mjrg0h7oxDkrZQzhkYtkgwv9KCvgd3BHdoLKKQEiI9UnBXr0LKasBEf5dOcQYGljBIP86FkWG80W0D4rQJGNADYgFKI1UQQQQUAMiYNkcSE3E4/gZn5GW5PDL72XzwF+3cfyNn4EjIHydscH1cUr2Gu4Z/xxBO5dfvZ/FR3nd8DtKot+wXwpt06M8dHEB6glx4rdoyKuj6NfbacirQ/wW+6OeB67LPh5szjBcfGY9Ny0KcP4Gh6gbxajynaSKpKcR+vE11N58NyjguVjt2qCRCKaoGERoqVnrniG8NMYGT/DJ74lVVBOXnJ7C2ieEExzlpGCAd2UYURVQSApBn05hAj6PlXkp1DYAwgHlrtvGhDveJ27FHWMYMKQn/+fIKy3aRlyrtl35T3V018EcTstYSCN1QcHX9Vz8HUZTt+GPJFR9gvr8uGLRUnVl5cSFQ8q1L/uwRHnnklrsOgtE+SphD+VLwh7K11Wyh3LkBI8ZRvvXX6Zkxs+ofeddxOcDEb6Lzj5hNgcjgCogAihNWfxnGj21/hnqV7hsfBXSbIhW1hDXPi2ZNbNgnB8mBHz00BE0qJCekoAVEsrzF9DRX4WT1gksC7e6AYR9nlr/DPUrXDa+Cmk2RCtriGuflsyaWTDODxMCfnrocBoQUOjeNojfZ7DFpiGm5O1qAOHfnvgcQGh9w/co/59XiRYUYeqinNyuhPSBu7Fdmm0meyTOepTDavJE4vy9etE0C0RopAoYmrRpE/tEPfDbfPTpFhDo2iGdorIwDTGPfYwFrsU1E5dw7w/ep871c8OjZ4DP40DW5kY5+cEdPPyT1lx+Vgq7X3apXWOIE5tvzYhFeu0O0paW4JcooZRapF8yrYIpOGJhVDmxbT/m7lyBp4bDw0OJEif4AZuW2Hj55ZS9/TYCLO3fn+HbtuFr3ZrDyhg0EqGRz4c4Di1lJyVR9NIb9M7fwcK35zD+kgvZVbCDT+bN48Sdhbz156cIXH8b4U15SDAAqjTHU+ufoX6Fy8ZXIc2GaGUNce3TklkzC8b6YXJCgJ+OuBoXm70sDIowNP0zBHhw48+xxeObfD6LM87ozFVX9SfuiSfW8cILucRiypHiARaQk1HFpPJifnlXJW98FOWrbAuumOzwhzdcjqQXZ9ocThde7bGHoqqggLCHggoYz6Nux06cgA+lpRRVBQWEPRRUwHgedTt24gR8KC2jQFnpTgrWPk60Yg5OsAt14esYNHQir7yfz6yXNoHfosViHosLS2ibGCTREtyYSyMFFYVojP/TPE+tf4b6FS4bX4U0G6KVNcS1T0tmzSwY54cJAT89dDgNKgQDNr2PyqPK8whGIkhSgPxV2dTVGxC+RhXKN9+LzwnjpJ6OP+U4HMfPXkWb/4BV8wLp/V/H508lTgHP84jVLCFW+T6xqJCRfQstIuyhNNvka8NcPjnAz3+v/PndXB6fncANTkcGBxOpVw8PEL6LhJTkIFU1DXRol8rytYUYhMPFqGKMkpESxLaFzm2TsB0LYxRVJX9nGKNKeVUDliVYIvwraSxC7ZJP8LVtj7ou/m69QBVTF8ZJScPfpQfR/DwiWzaCUQ5kTu9V3Lm7B6/vziDiutz3/vMs6L6Gh//ragYcM4LdM3+PV1OFOD6OJEthaRpkVsDkMjhKYFMNLG0D2xL4mv79OnF37GUWr7+fY5OeJj3JAuVbcXKyL2b8xEHkdFPmL8wjMz8XPEPFtKkM2bycmavDzM2PEV20BYzSpq1wzPGp7K4spoem8Fnf7ZStbU91sQUWzSMgNtTWpqGqJCVVgfCtJPpCPPe9+4klJSKqtNSUh8bQHCoWTkY62hDB1NeD8WgOF2WoL8SVoUweqy9lr24dbLp3drj6/BADeznErd7k8ujz9RSXG/IKPPa6MpTJUF+IiCp75WRfzPiJg8jppsxfmEdmfi54hoppUxmyeTkzV4eZmx8jumgLqKIa442nriNl0wPQ5TRqQkeTMfQ3QABQmqLAa7VhEsTizbpajg0EiVsSaWBSQiJ1ajg3MQnhwK7qPpXDastvaTYPkoa7aATCy3xYQQWlWSyBTplBthbXY1uC6ykje6fQPt1PnCVCvw4J9G2fwCUjs3h0zk7e+LwUxxb2J+YZDs5iD0PzCSDsESWLagZRzQldfYw6oQcDRp9Eq+OHYfXqDWKx164vlvLWLddg3FrqY3Deb57B+ELsE41xJJzd60HOmNSXKweU8dncbXTNXwGex9Zrb2FE3hxmLXKYvSVEQ14+eEpGRoDy8gjV1TFA6dcvk7PP7s0993wCOOwlIrRzoqSX7iIxGKKNE6NQHFQ5NJ6Pf6CCKvso4HkOeA4IzTLr949xIKKKtEoldPqJROYuJrajEAkEaUoOB5Dg8NDTqxk1rD3nX/hDxt1leOfWmSQHo6jhkAl/5whEoc5V4hIcAUcQvgWBPrWG+cvqyIwpMYtGZ5a4jKz0OHloAhsSLVD+I1RFG/hnaX3lZWRccBaFt9xL6TMvI7ZNSzli4xOHWVte4C+F73JX/x9z7gVnkTpuNKV/epGsqZdSVlNCXOeH76H4qedodfmF2KnJvF74Lreue5DSSBkhO4Si/Lualn0xEyYOIqebMn9hHpn5uWAMFVOnMmTzcmauDrNgW5Sbtv4WnxpMShInTL+WZT/9KaahnOHX5fD+G+/AzjKwhb369evHsGHDGD58OEOHDmXQoEEkJCQgVhoSPJFobneK7tmIxtJpf8cPCPauxatbhmlYjEbXoV4xaAzEBnzspa5wJJholH8az6J9MMrTI9bRo97myReHEXf3qFx+0LWIK5b1obDBD7ahWarK4Yl7sd9/jWkzjuOMk9JxXcUzSnNdQPMZtalxJqIZU3EC7QjLFbhV6wkVbcW/5iEcSxD+zakSKy4FBOEIUkPXtincN70b9dGdbKsvoagsj+qqIob0HUuqU8dvftyXnF80sKW4EkRoNsuCxYth3Trw+6GigkYNDfCHP8CAAdC/PwcTjsLPj4HedTCsP7yQDwjgwQ8HwLld4VfLoTwKCQ6UR6HaBRT6pcJZPeGXSwCHfVSFszvN5q5B95IZKOf90WfzUv7Z3LDsXr5GAYVTunzCL9Nvo+Of1lEyLwG1gsSldGvAvioZfkijO68fTVzAN5KtnsUNVygxzyZObYuBz+7AW7GDuIHZWdxx2WmIZziQ26++i2YxkJ0kvDrUR7cEwVX2EZ8QfruCskeKwABC0ywLZs+Gzp1h+3bo3h08j3+2nOyLGT9xEDndlPkL88jMzwXPUDFtKkM2L+eJ1WHez3dpWLCJc8f1569zvmDJygLw2cTNX7yVugaXc8b247V31vFVMVe58pxsrruoD8s2lLPzk0K+0zxImRgh4aQYkU0O0a02KLi7LJS/E/7jJZsoR4p6HtGEREy4ll3X/JSqWc/R6Td3EBs+FH/Mw0I5LFRAFNsInqWgAqK0iGPx1oLNzFu0BZ8lnDK8B/MXbyUqHDoBUY9rpnbmzgfrKH7+Avxdd5BywkK6d9nJw31iRAzcsMFPcUSwBKo9+Hmuj9/0jjIizXBmK48PKiyaq/hvP8NJzsCf1Ydo8UYqFs3Cl96dTjl/QXwhmmLbFq5reOilj/l0zTbu++EEhvXtyKFI5vCqYY+cQVOZNGEgUzt4zFuYS6v8TWAMFTlXcXTu5zz5RT0f7RYuPbkPMdfQrUcqiwo2s7jwHTJDrRkz5Ez6ts8mXB/BEuGJe/kH7ZIdrh2ezoqdDfxlfQ27wy5+W/guGde5gf0SIAyXvRDFsnvhi3zMpb4GzIUhSAKU/XqX5lG+pMrhYUHPamF8bpSaB5/BN2YkoaH9aY7OV1byjxQRQEERWuRxDqq2wWb+vA706R2ksjpGRUUdJxxTSsjvcTCW7eNIMJEoByMiqCot5QJ+EW4NpTKpRy/Sb56Bk5yExmJgWTRs2UqwW1eaY8qUKezjQuiCCFovmAQlUmFhT4gS+NRH1yUOPQstLvjAIeLA9jaG5b0Niwe6LO9tKGhjaPCDKDge+3S+spJ/pIgACorQIo/T6JVRBexPnesw/f6bSQpGObbHCixRFuf2xV35PZ648QYSHJf9OY8DExUwFtX1IUSFOWsGEpeVFKa6PoQYC0RRUVrCsS32skSwRGipnH6TmDBhGDmdg8z/dD2ZW/NQ41F55VQGb1zFE2tL+XBXhDZYCH/neQzNriOtYTNeIEppfRqrjQsE+Kqc7IsZP3EQOd2U+QvzyMzPBc9QMW0qQzYvZ+bqMHPzY0QXbQFV/Lbw9rpK/vq9jlw8IInvvbwT5e8UEA5KFRCwRFi8rYY4SwTl7xRE+D/N8NLDZ4NCxDXUp51AYqcg4ZWr6dG+HS/dN5mGkgpyYx5x44a0Y1zSQNyYS8LI4dRGPPI+2siEo9tyzojJxF1w3q/ZyzaGnaVBLn9vKPek9eLuwRs4r8tO1AjGWIhDI3XBsgxiKa9sbs+tK/uwsTIZQoptDPsVCsFZZ0FVFYwaxUGNGgWDB8PZZ0MwyP54Cj5RftS7XE5sVa8/WtFGPykNid9ShCPEgKmxaGRoNo1xUCI0UuWQKbDuscfZsHkr2TuLidtQV0v7xx7nhFkzEVqmduEKtk+7lciWAvYqfep1Mi4aT8ff/xwrFKQ5NBrl34rYIMKvXjiV6VMW8eGK7qzKawuOIe6P7wynLpJAdZ2fdxb3AkcBJbewDbc/M4Yrxq7g7udOQvk7UfYRl8raoRSUXUXHzEdxXUA4ZJ/fO5o4xxKCPpvp47O54uSuOI7Fw2/n0mf6HHy2RUvlZF/MGRMGcWU3Zf6iPDLzc8EzVEybypDNy5m5qoa5212ii7aAKjHjsmBuA/27nEBNbRJL5m4lFPSojzp8F3SyYhx/6bGourjPLiNP/bSEDWw3MbpafqIoAgiKIHwbBogCxyWlMrQihZd/VMnLr8zn5hkLObl3IidndOa+9sexUcfzboWPN3dtZUnpJuoilYABsUEsWkQEPJfWv3wUE41QdtsNSCBIc5zd60HOmNSXKweU8dncbXTNXwGex9Zrb2FE3hxmLXKYvSVEQ14+eEpGRoDy8gjV1TFA6dcvk7PP7s0993wCOOz18rTu7E/MUyrqPdokOwh7KLC7xiU9ZOOzhf05/xH2ePllDqQvMPtPT9CxZwaWt5sdG9bT8de/ABEO6PzzaZYGF8SmkXoQdGiOno//isPq9JNpLleFOEeU/1RjT2jNwTi2EOd6ysHMWcWBKUQTfITHDSdj2HBkQCqS83sa2riEjzmWtJc+xPGUJnlRmqSAsIcCQrPkDJrKpAkDmdrBY97CXFrlbwJjqMi5iqNzP+fJL+r5aLdw6cl9iLmGbj1SWVSwmcWF75AZas2YIWfSt3024foIlghP3EsjjUY5EsZ3PZnUQBKqigIiglHFFsFTgyUWKgIIGAMoIhZGPSyxMKpYIsSFo3U8yic0h/DdFDplBB3XzaXqd/9D+a33UzPrz7R64l78w47GCoSwjeJr2476+YspvepnxLbvIOMX/03q9B8gjsOBrNgA5/wIhvSBW69SzhpTzlltKnhjdzp3FXYm7rYO2zkrqwKM8sa7cPeTsHw9TYp5Lqgy3JfAcCfECsvFu/QcUk8ZSZy6Ls0xZcoUDqbkzfnk3fQQdXnbiUvo0Zke995A60knc1Ai7JcqdZEIUyZPZvS2bcTN69qVHaWlNBJhv1RpkgG7XYzgJWXYnWKIKN52P/XPZ+Lt8oGlNOWNzU9wQAoIKHsIf6eAcEBn8RUiNFKlkQgoqCqtbqsmfXSMuIp5PsruSUEsoZEqjURopMpeRg2pwVSuGnYZXxSt546tnzG0oRfXnzyDDpndwIsBSvOl0CwqnJoR5tbkbfztyd38ckEGd//yD2zZksudd95JnN8nXHtpkBtPTaHDZbuJq6mPsY8qkphI6vt/I7rgEwJTzqJm6g+JzZ0Pfh/f1qOPPko0GsV1XVq1akVc3RebqZjzCaCkjz2RhH49adW6NVlZWdTW1vLwww/zk5/8hCatLyWh1GXm2y+QGAqhSotN+fXJxOVkX8z4iYPI6abMX5hHZn4ueIaKaVMZsnk5M1eHmZsfI7poC6gCSpYPPvgiSqTBpZU/wvZ6QPiaoDSQLLXsn+DD49qE1/hZwvMUmCxyqn/Ke5HjQaI05fdJPdgvFRAlGvOwLCHOGMXvs0EFRNmvis3EJdx0IwekiiU2+Q2lpDgJZPhCeMaACAc0YzoHYxTapsKC3z5JXJfbR1FSCSI0j0LbDI8RAy36dHNITXLJ/NSDEkD49pQvKXsoOI6CsUjOiBKLCn3HFtO+jaEmGqJwXTKFxX7SutdQ8nkInwOIso8qHy7ZxCU3PsWmvF307d6RXnedz7c29EUaRQ1NUcD2+1DARGM0V5VrcyRIchJHgj8piSPhAeo4mA7du1FVWUW4vJz/jX7zUFdOz6ylRJUPalrx4G9zOSSewTeuDabSxZdlI0B0VGusNJvY67vAtvhPIgKtU4JMm9yPGy89mvLqCBWV9by1MJ/aqMuXBDwfmYFqLun0Hpe1mUe7UASr8/EkHTuVpIGTkFAG8ABxEgCN0EiB6o+h+mNIHgntboayZ8GrpFFCf8i8FKr+AtWfsI+whwSACEeUCE1TIO1MGpU+AUKzGdci1DlCct9a7JCH1gpHUrLjkRGI0iu5mrhNNamUR3zUuDYt5sE5HRvYVrycq0qvoiFcy1Gn92ZHVZSCz+u5euVg7mv9NpPaZ/NCfhgsoSnGGHp2b42IxcnDu7FhSwkFRdXsjzFKdtdMRIRTj+vO2txiikpqsG2hSQoIoNAlOcLdQ3cSd8uy9uSH/SCAAsIB5WRfzPiJg8jppsxfmEdmfi54hoppUxmyeTkzV4eZmx8jumgLqMGf4FAysitdF71LemQ3a078AYFPtlNXDwj7ZPXrg5OQQMCyGTD8WPzJyRwOD7kdObw+46sshbd7W2xqJdjK1xhVPDU4lo3wJU+gV6kybpPBCAfV1nLoZPnI9SLcmpBFstjEjfYlcXddMdl2gLaWQ5FxORTVJQXsyttIz2EnYzsOzRVzbWxbsS2PSMwmd1sqbVvVsaskAVDUQHjpUvw2LRKzhFZ1LrPe2sD9x3fh+X5ZSNRFaDnDlxzLMKJHAZePWkFcYUUKn23rgKtCo/oow4f34ncTetD+4ccp/XQ1EgwgIpi6OjKOO4bC2y/g8qq32Ov50AvEWSqUdCznqrvewfFg8VI4/WT4wZT1JBbfRuz1YVgBD5QmXcL/p8o/0xfFW1hSsI6g4ye3bDvZmZ35Vwo5FgemgLCHAAooIBxIPXuYaJR/JwrExKJTQzUz6pf3Oql255+fq9t5+ezUXrekHn3PsqrlP+eAXJsjYVq/M5hwxjByuoRY8Ol6hhbtQI2h4tWLGbRpLU+sLeHjomqelXX48Giuq7IvZsLEQUzrpsxfmEdmfi7qGaqnTWXw5uU8sTrM3PwY0UVbQJV2aUGKa6Ks3FkPHozuk0zMUxZsCYMl7CU+H3UfzCe6dSv+XtmoZyj6wZVgCYdLOBLj7hcWE3fSgA6kJvj5rml/+wz2TwFBLAcvWo9RxRdIQI0LKCDs18038FVRVW6pLeLzWB13JLbFAjy+pDEIdDGEenv4Wisd/que3QlK5Qc+xM/+RbeisWIyrBqe+FkHfnj+JP7rvs9ZsGQ3BAUs4XBTVVqHEjn71Mn88d2XibNEIBbF2DaIxT/TnQ//UN/KDsmL59zHmx8/x21bPyfRnA19J4IBJzGRwZqHXyN8WlPPsakraZUQYavUcXzmOnaa9qzwT0NiUbAUZY+c7IsZP3EQOd2U+QvzyMzPBc9QMW0qQzYvZ+bqMHPzXaKL8rCdeuZtb6B1j3V0TvVT7lvBlYMzCQVcli8WPL5JwUTYkNybC49+jnNHeNx9vkPPjja4CkrzBYPs5aIERLg71IazevQh8ebrcZITUdejpaZMmcIBedA5AwZlC+HxEFijBLZySBTBkRhXdvwVp7d6Db8VIa6woSu/234Pa2qOwRaXg0kZM56DsSyLOGMMKCAc2ManaIoI/6v4MOwjoK5HVfVWfK3rEZRwzE9qnYMPBZR/T0JIGhgXeo/vJf2Z+6p+Qm6sB1EN0JRjuvane6sOrC/aSloohYzEFNqntmLD7nyq62vp27YrBZXFLNi8HKPK/hhPCdhCQ8xgLKEhZvDZQsRTsIRGxgbXxynZa7hn/HME7Vx+9X4WH+V1w+8oiX6DAsoBeBa/u7iAtulRPNdCfELVO6XsnlmIaTCI3+Kr1PPAdRG/n2DfviSPGQP/9V/sY6DegdtG1bPmmM78/pTpJAcTiRkXEFrkzNEcmPB1AigtYhSrTRbiOHhbt2N3aIe7ci1Wl47g2KAKIrTUlb0v5vzzh3FBZh1LPssjuWArnmfwrsmh94qFPLMpwt+2uLgfbwIB6nz84aF3OGnQWuobXD7bMJCLrp4EiVFQ9jn/tx8RJ5ZgysqZffsEBLjzL8uxFuxEjfJd5n74EbFFi7GyssC2Mbt24Rw9BN8Zp9MSURPjX6Egbzm5axcSlz3geDr1GMp3nc8W4mKe0lyPXv5bDkrZQzioWdMeZS/P2LRLKWJHaRsSBl5Pt3YzuG9QJSMq1lJnBVARmqv9bTcTJwp1IWXqi35+ll5C5jU7oY4vCUQMjQIWoIBAxNAoYAHKPsIe6Ul+mqJ8STi4ar7OadeWtn98kooHfkvFw4+CMWBZfFsajXIknLftQfZHARuwjFJtCcFgMqamGtsCsYUvCaDs9VP2yMm+mPETB5HTTZm/MI/M/FzwDBXTpjJk83Jmrg4zNz9GdNEWcD1a9+iI2z8Df/lfKMrqyFlXjOOTj9dStCwPHGGvnOyLGT9xEDndlPkL88jMzwXPUDFtKkM2L2fm6jBz82NEF20BDMSCvPajTxicHGbH7tUUmMEcf8cYcCL8WzOKnZFKu7unkzp5NEknD2f3Lx6l8o0FXNKzkB+eVAIxmm0mewQmTeBIGLhxI01yS8BU08hKAac1TRIhTlzDZVOO5tnXVqA+CzzF9TyUr2jwc1SPXTw14y8M7b0LIpBfkgZGQABlv7KysohGo1x7fx0fn17P73/ahlZ5UPyKS/1aQ5zYtJiFUlKXwLauYfxq2NGQirgQ8WLUi01JQxW9Uzoyb9dKUA6ZEsE3eADB8RNQzyMy511iK9ciBGiu3s88w/Z77qHs7bcZNGcOTmYmjUQ4HDQaxenZjYSzJyPBIA3z5xNdvAzEokVUsUJBKj9fQSjnv1n4/EtMnn4da5evYPP6DRw/5Sxmv/wq7R+YRcn7H2ElJoAqBzOt5yVMmDSAnK4wf1Eemfm5YAwVU6cyZPMyZq4K80GhRxIWexm16Jy4jVPbvMubO8/FL1GE/VGSknz06pXG8ce3Je7DDwtJSvJRURHhSIiq0NUf45a0Mqo+KOHcB8MUFBu+qlMbeOAnSchxE/nDGy9yJF1wptAkATwFFGwLlCZdeDWNVNlDQJVGIuyhhlhlNVG/jSotosoeAqo0EmEPNcQqq4n6bVRpsd07VhIp+xtJgUrqagppqBhKXf3p3Hf9EG7NGQAIzdW5DY0W9MvCqGKJQIafQzWK5lD2qqkqobx4K12yj6WlBFD2EEBpJh9HRE72xYyfOIicbsr8hXlk5ueCZ6iYNpUhm5czc3WYufkxoou2gBosx6JN6/kkJvVgbOs+vL/9dbY7vQHDN4mAFehI7dbLUe7HDnQlIeM4NHQCKZ2uxDLFZDgfUFe5DF/WqVQXPgt1H1FfuRivLhdLo/i7PIKI0GyeEBzaQFzDsiDYSnMYhT/+NcJzb0f4/qQAP33E5em/buLxOUlMD3SgbyCBOvU44oyC59LIdsASmqICcz/No01WMolBH7kFFSAcFqpKxzZJdGqbRFLIITMtyMZtlYCFbSnGGE4b0YGqcJSqmiiFxbXs2B1GRPgmjUb5Z/C17Ujmj+/EcRzEtrF8AmJBfRiCSahR/N17Exg+CvH5OJBr7yrm11fWMaZPJ27K60xl1MenW9Zw2p9u5/bTL+OqRx4n/LsHCS/7nEbCESFAgw2vZsGbLowthvnZUOUHn/IlhYZdL1D32A8ZddmnzN9wCs5N1zHQEcRxAKUlnOljOmJ/sZixj5XzXiHMGxkhbvTkJ5k8rg+3ndqabpWrmW0MIMTKDE5dLce2OYr5u9/khNAZvFmxCyyaRcSjqrQrebmDqKrOxPJBUmIpHbutwS+1tJTPdjhzwCmQnMwR43NI6NkDX2oGqEFFiS5dAcRojogqOcFMlsbqWOLWEWepYcopyrGDXSx1iRs+GHbvUpasNOx1rJNATjCTiCpfNX1MR+wvFjP2sXLeK4R5IyPEjZ78JJPH9eG2U1vTrXI1s40BsfBiNjVF60hJ7g87VlFpinBjDlgclAWEjeG52hraOw5/qwsT1852eLK6irMSE7Fo2pyMozmsttB8frASlYxLogS6GcpfDSABpTlcA6f2T8MamM7LnxYjYjOyTyrfJAIpIYeRvVP469JSDuT7x7ehKSKC1xAmzg4moao05SH26GTVMdQu5ZguNieOGUjfkWPJPHYw0qMniMWBuEmtGf3Qm8ydPp6O0kB5STllpaXs5T/zDA6rB5cSd9OEJJz1bzL51xZv7kxh1dgYcceNepFJE3twxwShf/UyZntJWJbFQw+N5vLL38YYEBG2bq3i6adXAzZfZTzD/JoUzLjvU4uPZdUJBMVwqK457h2+SRUyk8NECREXCLhceexc6mI+RGjS42/QaPyyVeyfYKin9R/upnzGr7GCySRNO5uqu58ELL4NNcqKL0oI161g0sQcLnrIz/PXP0xqKIoaDoltwZJldQzoncz/vF1N3A8mprJ2WR22RcsJ3J0XITOmRCz2iViQGVPuzosw5agQKN89FnsYmq3Ls7fzz1L+ypvsfvBxGjZsRmybb0tRgnaAGreWq5bdzNPbXuP+QTfR5/oc4grfmENcq0tyaHN9Dhtq8vjvhT9iUdkyEpwQQTuIovw7u3FMe/zrPmXcY2W8XwgfjYwQd9LkmUwa14dfnNKa/hUrMMYQ57Md5n8yn3lSSNGpE6j8YAHtfT6+af369axfv55nn32WuGAwSP+BA5nUsw+njDqJjC6daX3qUHyqWJpK/eokRCYQOvpGQFE3HxNdhUaW4zV8BswhLnl0LYfVRhp1nnIWh9VjD/IPVMAI13XZyQMDt/DEi4M5/YFxIIBj89+PnMbjM94l79wlzFjVnUfy24OlIEpzeFs28YcfbqJ0TDoP3JZN164h8GiWC2guRYgg/vao045o+VJCRVXESsvwCjdj1xQhqiDC10SifJXGouB5gE0jVTQaRSMRxLJpLttxOBJ8GelY7dpQs2IVCghHSEy58XsDMWY3gySLOWs+Iuo1UF+xjcVz7+Wqa58lt34TN31/CDn3zAO/TbP5fPDaa/DAA5CVBZZFoxkzoLgYZsyAwYNpkgM3L4ZhbeCEBNjpwQMrAAeSbLj3GOj6HJS7YFkw6zi4/CMwgAhsDcOf1gM2Xyfwh43fIzt5C/898D7WV2dz5We/A+FLHnRM38XdvX7B2I/eoPQZh+LaROL8IZdWl7vMGXUWt+TeAnQg7rarRtGUHZ++TfkyQ9yAnlmMmzaSptx+NQdnoGuC8OpQH70TBVfZR3xC7bwqyh7aBa6C0DyqNFLlX2X6mI7YXyxm7GPlvFcI80ZGiBs9+Ukmj+vDbae2pmvVat70DKqwtaACHIt9HIutBRV0bJcCqnyNZ3h78S7Wbati47ZqEOGfQtlDaD4BUyM0rHSI7bKIbLFRj0Z2hiEuWmWD8B9t7YCTOCKMwdc2i46/voXI5m0UPfA49Rs2s3nshSzN7MUvkkeyy0rGQjkkRujbrpSC0nR+cNoS/ufDY+nUqoL1u1qBpbREuCFK2FOuOHsID982gQumv8zbCzaBbfGtqUJE0aDFHfetBUeYNC6LeZ9C6bOX8ug9T7G+toj3Snxc3dHl55v9+FEM0KCwNmxR7QmlMZqmCiJUL30eL1pJzaqXiZZuZS87IY1uM5YhvhDNIQI+x2bJFzs452d/YsYlJ3HVWSMI+B2+jU84vI5ij7vO6YFv4wrOfLqMt3bCZycIWDanXPEs40/J5oHTOnL00nVc98iH2CKcd8ZgenXowo6540jsXYZ22cLc+S4frNyBg3AglsDQDkH6ZPmZk1vLB1tqiXmKYwmHg3BoRpd/zv54ttJnSytSGtqxq2s2Wwgzattmrt60hQ3dS7E9YX/eZY8E2+ZAIrbBbwlxCohtgWMjjgMo34oF4wvgl58J7/W08R3dF7e8kkjedgI9OnMwna6o5GsEYp5NWY2f1IQYIZ9LizxO0wQ845CaXMmfn+uMSowTT4wQcx1CAQ+UJq146jqOhMzzJ3MgCojYeLEaxPJh2QFUDUITnn6Yr1LAtSyOKtxN0syn6fX0E/h7dqdu2Qpqd5Xit/2knjWJFrHA7uJR+3gCSTfWEp1vE53vw39CjMgSB+OwT7ddFj0LLS74wCHiQGGWy8rsGIv7u3w2wGYle3S6opKvEYh5NmU1flITYoR8Li3yOI2mdKzhH9gec9YeTciCKccuJNwQJG7KsR/zwqJTaFPfmbEDloNn02zGYmiXfI7uto0n544GXwxEiSsKJ1G0tj9XnTaPZVu7sjS/C1iG/bn0ttf5KssSvthSAo4FIhSV13LJra8jQov8ZGwfnA0rGTurgPeKonw4PEjcKeffz+TTB3PnqC70ql/D68ZgY+EEHJaNOIc+G6uoj0XZdFEWvkgAV/ma6WM6Yn+xmLGPlfNeIcwbGSFu9OQnmTyuD7ed2ppulauZbQyI4BplbL9U7n3ud0S8Bk7sezmrjIAoB6NARqJDJGaoixk8VfZK9FkEfBbldS5Cy9iWsI+AY1l8V6TYLodTNXscdfN09lJVdhoF20FdF4whzqurJy73xDMRn0OcxjwQ6OdYiAj7JYAAlmFTbQLnf3QMR2VUcs+QDUzoXEz5BwHiMk6N8Nb21vx8RV9WlaeB44HPBbFB2D/bhsmTYdQoyMxkH8dhH8dhn65d4amnIC0NbJsDUcAzwrDMepk9qoBfrc/UhzelS4OxCKkSF7NAODxUBGEPFaG50sdGaZIIsZgS5/MJqNKk12iSAJ18AS4oK6a4zE/c0UQJ+gIILeOWlLP9qtuJbN2B+H3so0r5M3/F36U9bW+9huZod/l5HFaP3c8RVb2MRir87Z0wuyu3QEMBCHt4woJPqol5NlRXg63stbvB8MJfI2j1MhDlH1gRtpb8gKGdajmqfS0xDxAaqSrq1oOA2CFEhKZ8yivErdxWiSoEfTbt0kMUltezcVcNjmUR8jsM65GOZQnNtZY9po/piL1+MWMfL+e9Qph3YgQQRk9+gsnj+nLbqVl0q1rNbGNABJ9lM7DPctTaTmZ7P23bpfDKx/WQ0APU0FxlVcVYlk0k1kDIn0BqUjqHSlyP0af2Y3vHRBA4ddRAts5bh3EcDkaAKMozDZW8Ha3mRwmtGSGJRFWo9GzUEw6Fi2LZcHlyOjs+T+aei8rocWktN07dQkpsM/1coZ+/NT/uO5QiezjzazP5a1Ex84vWUxQuAo2C5XBQYmGqqwgddwqh408h+sUqJCEF8VmY6mrE76cpN01Iwln/JpN/bfHmzhRWjY0Rd9yoF5k0sQd3TBD6Vy9jtpeEZVk89NBoLr/8bYwBEWHr1iqefno1YPNV5x2Vxv6Eo4bckghDOoQorIoR1yHVx4rCerJbB0jyWzTpvPM4EAG6+P3w6acg0OnM8XDmmRwyo9z046FsKd4ICt3b9ObeR1aCJRxM2piT+FfwW3BsWgRVZVVVgJir/Cd665FjOBBLQIBVm2uIO6pnMgoY5YCcxzgwgWBVA97O9bg/m4///uvR749GdjfQalUuEo2htk2TssdzYAqWTX3UJS7kd8B4gHBga4i765we+Dau4Myny3hrJ3x2goBlc8oVzzL+lGweOK0jRy9dx3WPfIgtwnlnDKZXhy7smDuOxN5laJctzJ3v8sHKHTgIe2VceBYHYomFUUUARUHBsizijBr266nfEffAqJtwLAdVRRAURdhDAVFwdxchCFabNogIihInCIoiCIpiVHmUO2nkGr7GVYxR9jKqqGvAKN814jikzbiS5IvPpHT6new85VySL7mANsddBwqlV99EzfMvkXTeWbT/8CXs9m1orhUb4JwfwcBsuOVK5fxx5UxKryDOsZSX34K7n4Q1uRyUeobQwL74Wreiet7HiGMzxDjIs7NJ3lpM259dT+C4oRwOFQuWsfbiG/HCtQg2ceF1G1l78Y0Mfmsm6aOG0pRPXnmFAxGfD2/OHNKNIa5nq1bYl1yCXnstBzJyyhSa5FdCl5SBgJcbIE5ChtAlZYQfzgJXaMrQcAH7IyhuyI+/voGtJw9GjNJlwSpioSBOfRRFaIolEKsJE+dLTiQuVhMGIwSH+cg8LUpII8RZY5Tw6zHqP4uBrfiSE4mL1YSJ8yUnspdjOfxuykzeWvdX1u1aSVowiflblrC0cCqXHvt9Lhp2GUEnyGGjQqJt+FmnXRyzvYCf/ryKJV+4nHPOcZx99mSWLl1KekYW6UklPPiTVEZWJbPrliCwmzjhSxqJELzyCiLP/JnIn54n9u5cguefQ2zefEQEVGkpYwytWrUirlevXpx++umUvvI2m6++Ha8qDAgFdz9Gz5l3cvp541m9ahWff/456enpGGOwLIum+KPK2b1OICklmUMxfUxH7C8WM/axct4rhHkjI8SNnvwkk8f14bZTW9OtcjWzjQERUJuLEvIZ3bCRpIjhzaQA91R2AjF8lVEfIIDwdUK61JJtF9LBKkUkQgdrNxlWmGN8X/C52wswHMgTiT04IGOYeNbRXHXhicQ98eLHzJ6zHCyLgwn95AaaUo/HDxf8gtJYGY8Pu4YRqd1o0ozpHIwLZHvVPP7GG8Q9eEs1u0jBRzPZhnlfZFP6UAk1NbUkp6SxtKwzWIYjRgVfgkt4V5Ad65JIS60mq7VHQnaMhGMaKCuzKPpU+KbOHTKJRTxWrt1OcnICaeEacqf/EkQ4FEvemkxTxBIWLVqIIBx3/PGoUZpy7GAadZ3Tn8OrmLi0D/7CYZWcTNwFc97gcLosKYnm6N+/P/369eOtt97ihhtu4I9//CPV1dUcDq7QyFG+k0SguBJaJ2dRUVmE6zlkd0qjoS6XQ9YuSMLxQZblZVLr+jlpwk7q8yL8p1LAEiHOsQVLBIQvGT/pvjAXtJvH5W3n0jXLj9P3AlKOy8HfaRiIj627avj0o43s1WcZeFXglYFbArHd4O6GaAFUzobE4dD+fhrtvBEq3wJfFrS9AZw24GsDdmtwMsFOBQZwRM2tS+drBFQVRQHBM1GO6zaB/8cefABWWd4N///+rvs+K4skEEbC3qLIFhXRKoiCFlf1dVTrY+tTba310daqbanV1qp1V62j2uXGCS4UUHAAIrKRvRIgZI+TnHGf+/r9e+IjZYQQhrZ9/+/nkzZn099xTBBQBEFEQNlNNWnqC7lD6jAhS9XcNuSOqCO2JAI+X4mgKFmOJSBQ7g8hLSDryHIsCd+QVGG/GMjbDoluJ5NRkeS1HwxgdN+OeFY5/MitXPz0BlKZ+QzLLOPZDZlgaJa1ilWlsCCbq749ksL2OawvrmbY4YXMnr8JaxVQ0qxVUr7SpWMOP/r20bTNi7B5ay3Djyhk7qJiRJS9UuiUkaIi4eBZoTwapCArRVp5NAgCAaO0C/lsa3RBaNY1J3fGWTGXUx6u4p0tMOO4BGljJj7GxFP7M+mkAnrULOF1a/mSWkO0++F0pAFNCcqexHVp06kjfXxLKLcNh8qDqSK+Skbhrb6GGYcZ8PknteRm5NItrzNLSlej1mcHB8Z8bpmwymKFXZwSzGZnCrQVl0b16euE+MhrxKKkGYS+TogG9TkxkE2lphB2NS1ZT2s0NpTy6ct38urTrzD2wquYeMUNtIZiSHqGmx46mvtvmM3DLxzB5b89kaxMj9LyCGmq4G3ahDhKE6VVAio4bVO4ceHns9dzkg2x+lsn4Pk+hv1zF/9kraEhHmRjRS5p0XgQaw1Yn6DjcO0VY/hBfDMNV15PTX0MiYTRVApHDAXXf5+nT8vn5mV/IBpr4EvfdFcBikk6lBy/HhewChs2QWUNdIrB6DGrcF+NkOEKqrSKyWnH3ogxYFya2BRqLXu3jdZ4e/UcfLXMK17G/R89x4MTr+dfqfLeEeydgI0RTzWCWsKBLDARQNmbjIdo0vVbZ3JIPXwPTRJJdqZeEnwfcGiiiiaTaCKBGIfWEiOIVZz+PXA7tOPojxfKwPKaU09s2Dr677l9H1k09qU7iZaUMffH7O7a8YvZmbVKmjHCgbhnFU2uP6U3wTULGP/EJt7ZkuCTb4VJO+rc25h46mB+c0J3jkxsxVoLDq12zcmdcVbM5dSHq3hnC7x7XIK0kyc+xsRT+zPppAK61yzhdWsBw1X9HR5ZFaK4OgausGBrHFVAhN2ltm7FZGSQ2rQZjCH65lscSgU5Ea47axgIFORE+HfU6caraVHJX1lz76e0P6UPbXoq9L6aFt30Y5rzmjbyeWwL94Ta09MJElMFHzIHp+hyYyNOtuLmKYF20P2OBlZMzMGrMCDsQVPV2C0/BW8rpssfOLJXH2Y9OohXP1rHdfdUUrylEmOE1kjQOmJ9Hv7pXfzhhUfxPA+MoXu7jlz/7au574VH+bxkA2IMX5dVZ4zl9jnl2tnJkUsq2mr+wLHc2VggWAXf55bDnmFU2zLOe/9spp7wKEVtEvx09kncMXQO+cEop3xyBX/sOom5mzvwpLmaL11zcmecFXM55eEq3tkCM45LkDZm4mNMPLU/k04qoEfNEl63Fi8ewanuzi/OKmF7SRHtIoN4Ym4Jg3KK8L0AOJbmZDg+Cd/n+feV6QuUn51r+MFpITJDHDAFUkYYtqWKzEeep+tfHiDQuzuHjIWx3RwmBPKpWN2AqYDV4zPouLaGgndSHChfHc5u/2dOb/8MKKA0KQpv5NpuN3DtquepTeUhKC3p8oc/0ZKUb1mw6nOCgQCH9+hJ0HVp0YNP8P/80wyngC8p0FF8ekWTOIeHsQnFLVOqfIelbi4OitI6z03fxL+TJAGWJQ/nzcZTWeP1wlcHUJqnhJwg5w4dS7/23Xhp0Uy65Xci5AbJCkUobFNAaV0Vgzr3YV15CR9vWEIy5dGc3KwAU34+hHPvWMQvnlxFh/ZhJl8/mIm3fUZNFEgFOLHPUn474SnCzhpuf7c9s9b1IOgqmUGLAkoLPMN5R1fxf0ZWYa2DJi2lD5RQ+3Yl4griCGnq+5BKIcEg4f79yRk3juxx4wj16QMi8KMfsQvlHwyTw5tYtvlRXrjkPo5o14MD5YiyO0URoYkIGFFElNbw+V9GsKXbUd/HdCgA18F064LTrxferI/BGA7Ez8Z3wcydydkf1/LaZph5fJKkZzn15If49rcGc9Ox7elc9hlTrYIIOCmWLjkJyfkB4jgsrTAgSwCHnU2ev5kmAqR8DvtoOSC8uKoG3HpQDkwiyc7US4LvAw5NVNFkEk0kEOPQWi9/tIkdQkFGPf8qoXemEfzOBRAKkfzL00Q/X8uHBQPReBKEVjmnaDyH0kPMpzVqK9ZRvfox0uo6dYRewzhUkkqToHBIWIWUr4zokUHaR2sacB3BCPs0/+TLaJGCk6mk+Q0CQquoCm0zojx62UOsLe/AT576HmuLk5y+3nBStXLTxicpTFZiMew3BS9DKXm4M8mkQ6cri8EDBBpicMMDNLn9asgMQ0MMbniAJrdfDZlhQNnF3EdPYu8EkSSetx2RIK6bj6pLSzq9xD8lPRpWv07t5o9pe/EFBHr3puKXN+NXVCIBlwORf/6Z7E4Q0hSlOYKQpih7eOI+0hbdl8UufEAh6MAqtUzN7U3nYwfw6EP3U754EavvvJO6D2ZjTAhB8a2HCQQA4Qv1pF1zcmecFXM55eEq3tkKM0YlSBsz8TEmntqfSScV0KNmCVN9S+e8JIWp5UQ3DCQ+9EwaF2xi3mdzOYIS3DxLSV2EL11zcmecFXM55eEq3tkCM45LkDZm4mNMPLU/k04qoEfNEl63FkRAwUoddesaaaiO4XRNgAoIoPznMoJXXErdG++TM+EEvK3bqXvjfcQ4pFSwPqgvtJ6S9saUD/jaqYcmK8HJpEmyEnFyQQLsi7qGp19djLoGFDBCSVk9iIAVjO/wq0un84sLZ2OsojGadGtbQzDskVRhb0aMGMEjjzzC9ddfz5+ffZY5i+K8cEcnBt4cJr7Mp+pln9gyC8J+USDipMiptYhRAjYJRqj1Gog4Qf6776ksr9lEPJXENQ4HJ0nkwnPJvOZqYpNfwi3qQu5TfyH6m9uIP/cKEKQlfm0taU4kQsG555I9bBjBdu2w9fVIKIR6HsLBUc8jPO5E2j37V+LTpxN94ilMVhZu3z6kVq4GY0CE/SHBALFtZXjfupz3n3uUix+4i7defY3KsnKOH3cyTz/3LMd168yWx/+Ok5UFqrTkuvGdcVfN55RHK3lni/D+6CRp3zjrcc449TBuPrEDfWNL+ZvNwRghTcSyqbEHf934fXzrIKLkBSup8fLYlRCNeqxZU8ucOaWkrV5dQzTqAcKhZAELnN0myn8lynj8d9U8OSVOymcX3zrJcN013flb+Gr+tOmbwHN8lepetDRPAEU9JdCjK+oESK1ZiwQNIIDSEmstqooqqCppIvyDgHHIHTKQ3KwQquwXay2qiiqoKmki/IOAccgdMpDcrBCq7BcBMrLyqDIhPM/HdR2sGqxNsWFrnHVb6jFG2F+jxxzD104EBdRa1nz2LNs3zKZ90ROEIzmICK0hQLUfINfxSKv2A+Q5Hq0x+YMB7I2qooC1SpoxggAiwt6tIO2akzvjrJjLKQ9X8c4WmHFcgrQxEx9j4qn9mXRSAT1qlvC6tYAgQI3nclLhQPIy2pH0XVClWarkdr2YemNIbLqCROMaItlriNa9yazNg8lPfcCirfkU1EymclU+QyPX0yZSSm09hIMh3C6PkNft+7SGpgQsaELIOiVGWuMHESQEGBBX2ZdLzwhx/BCXzzdZJv4gytUXhrn4oSSPT15F6v1svh8sJNs4KPvBGrBKShx2EMBaFBB2Yi2mY3ucvr1J81evxZaWgTHsLqSWL3lYhvQpQFHWbign6BrSgvgcDFXIjLh0apfB1Pc34jiGWMKna24tNbEw1bEwy9dV4/uW00/oRm00iSqIsIf888/kkHriPnanqixctIhkIkHfvn3YvLmK555bSTDkkJZM+Jx//mF07ZrH6tVrCAaDDBkyBBFhdx997nPaz+u4+cJ1vD22lp9t7sWsqjbUNjZw7asP897AUdz1y5/TdeYHJDesA2No0YLlHAijkJk0IBC1lqltIAwUWJps5wvxBZ9QfusddPxVLjUvncio3P+hcsEybjrrDFYuW4zjOOwPd/ykGcTdCKo+GGHCHIcmIZgybRlTp7tkZodAAN9w+9B3qWh7Ju7AflzlHEF8xTyO7juTq5adAo7PvgllVYWE5wqd+mxFt35GQ2ZHynO7UqQr2W8iIMJXKfukIcRiPuHevUCVhnUryB49GFLzQWgVQbk5qxMX9D+BunAmblfDK3HDp58Y1NJEDBTHlcBJPmazJTvewM0rZyEoyq7GT5pB3I2g6oMRJsxxaBKCKdOWMXW6S2Z2CAQQhYRlyVaXoraV0HE4i5cD8c8h04CyT2ExiMCbsUYMX1hIkiHBIGEx7FNK+CoILVMfCq+LoRaKr8+k271RovNcvO0GEVrljYWVPHp5X8YckUswIBTmhdibvKwAIOzN4M6ZtCRetZktn9xNWtEJ1xHO78pXpWbbAhJbPmTocT8m9bN7mPXALYy54DtEwhG+lHX3LRxS99xK2pirPqNBs1HrA3GGvdaDJmqZ+tJKXp/ikpHZDiWOWuXii6cCDqD065dL2sqV1YBhd2F8Ftk8VCEslkPh/o7P0RxvhcPW2gA27uAvDPO7di8h7Nsf+ZKheQIYUAMYwAAOYADDARGhLppk2apK+vfahrQ5lSueDPLIZXfRJpJELQfMODB/Q5JPP68lGrek/eXVWjScwjjst4gHR9X5eIY9eAaOqvOJeBBz+FoJLVDQlOAOTpCWWhRCAkpr1CZifF2yR4/ExmJU/vUFGhcsASMcDEHIcjOYV7WQ369+jCeG3UHakRddzs5+v/ox5lYtJMvNQDlABsQoivDvIPvHP6bOjTDJ+txqhMBbNJmrQvL5V6h90aFjdghPLKoKoRDxKS/i+puRpQ0EFnyIl+IflJ29NyWf+fM9Plno8dkyjw2b4iyYP59F8+eTfHYKs4NJGkIRBg0ezDGfvk/f9VUU/vFO+liLGIO43XHc7pBxBi5pQlrHn1dwSD1MkxEP3c0h9fA97MJ3GJDVwJNHrmZkXpSqWA/eq7qO//P9BEQdFizdwqb1tVx5xziOH76JPwxcz7eLyrhsSV9WRDPB8fmX0wQ+uaAJ3OQneFyEko/M/DPOwOOR07+HLngL6isBYWfZl1zELvwUzpEDMWtXAkogFCTznDMJl5WDGPZp0iTSBoWK+SoZC66voMohp0pR+zb07pYguyZIbN5vOaFfZ95v7E5OtiH1yUre/MUNHHvrdWQX1VPUvg1bqutBhFaxFoqKaFJWxg5lZTQpKgJraZHA+gbo/zR0zIEt80EdmmWBi2cCDqDQL4cmK+sAYU8uFEa2cdZ7L3Jh9xfpnrWZjdGuoBAMJPnhEU9ydfm9pG6qZ+vaMLggKAVjGym55HCurr6F9z45DoRWU8sOajl4CoUReH5ogCNzhJRlBwkIjR/WUXHXFjRuwbB3ImAMTVwXRGgiAq7LDtaCKl+H8ZNmEHcjqPpghAlzHJqEYMq0ZUyd7pKZHQYRjhrSmbdmrwYRdhAhGk8yckhXXn57BbtwDW9/UoqmLBJwwAiK8FVSH4KdLGnJbYb94kL9tCC2UZBMRRxw8i2aBE0JCPvNGOU/iV9Xz1fCGLytpWAVVPFr6pBQkIMVCTrszPdDtM9LUtWoPD5zNDmZcdrnJVlXEcFxEuxLjJ2IgCiLVmzl9kdms3JtGYhwMNrnhTjntM788cm1EHFwUkrSsyAWnBSOOhRlpWhTJ/TJMmQHPQZmgKjBCEwudShJGMJGcYS9E2HbM9+jduHfUM/DBAwm7IL1cTI64ub1oG7RC+SO/C77I+Aa6hoS/OLRaXywaCO3XXkqfbq0Y39l89W47+0NzNmY4PLzTmDSsK7c+dB7lJbV8djNx9KlQzYX3vce7bOz+eUPh5IRDnL3o7Po0akd9/+wH41Jj5sfKmFAL+HBX5xGWWUD501hT6rElywlPOhIMgOGswdkM7wwzMsr6llRlsA1ghFB2TcbT7A7m0pgUz5NfB+bSkCc/SIdHmYPAmIcKF+J5U061Vfy1241nLTeQ7MvQTr0R6wPSjOuIG3By7ewd0pOdoSX332PdiQYee33KfjuhSDCXvXpSUvyEnDLfOGVHsqdxxj++5hBhMrrCBR1oFWS7CKeghXzwyz9NEC7tsLos3yyw4oIh4ZAfbQTG11IDh5G5w5xttoP6N+YS07WRlBatG3hm3wVuv/5flqSStXhp+oRMRgnA9dtQ4v+8gDNshZ8C76liYKNJ7DRRvabA6bAYgp8BNAUSESRDEXYlWJRfECBIMFkEW1r+9Gt9HBqs/uyiGNpkmQX8RSsmB9m6acB2rUVRp/lkx1WRNgv1rAHYwTrQDQZYvHm7vTruBVQlpT0oC4RxjqAEazSesayYksRJTW5EPBAlB1EIeDx2sLB1DVkgrHszdNTF7EHI+AY0qKNSZ55fRH7a3JeX+qOHUjR0ZbLjTDZ0OTyC8BLprjXccg/ayhOPAkIfspj3IsLMdsqCQeEAQtdbj93IMYNgCpfGj9pBnE3gqoPRpgwx6FJCKZMW8bU6S6Z2SEQmqRSFtMY4+w+BSR8y+xYED+VAmPYFyNwUu881lfG+LSkHkeENF+Vfu0z6NU2wstLy7HKXv1xTjk7cwx8siVOV2MAJa6GvyyopCjbxSr/chsHzuRQyqd5ahV8Dwk44BjUS7Ez9VJgDBIMgJ9ibwSIplxuG7acRNTh14v7gZticW02p793DN+r2cjtZhVply8dxJ9yu4OkwE3RokceYQcREAFraeK68Mkn7PD221BVBakUTYwBVVBlX3wr5AQsvxtULicUNOo1izvQYYmKAT7qGcQoKPtWc9bl7KCAA2oVEgZE8BavIdzPJS0581OqT/s+qELIIkbAB4Q9dL25kb0RAROB6bOSpI09IYiNgSp79xL7VCGW6/HpaDzStlufO8TSjf1T/dK7xFeux4SCYC27MIbKJ1+i4KqLcPJy2JcHCr/JofV7vlLbn6OJgfVJQIFamrgO9OkO/bsJqRSsU2XNRvBSNPGAtVvYB2Fl8S94/Oye5EaELyUbStlStZG479GrXW+CWZ1oyS0IaRc+MA9roTAvwrJ7xvH0h5v5/dTVCPDI5UP59XkD2B9/v4omE341k5gTRtUHI0z42AUUQjBl2jJen+6SkRMGASx07wREN9J9VBvEDfDBC5WQ8gGhNQTwvBiLVs/jqO4RSiprKKsPMurIMQgHJ6gpcrt0oUs8QrSukkCeEsCSYN8UyMAQEcFDKZIAQZS3a9tw4+I+BFOKsj+20ZyEKh1CDj+nA/P+HOOiNyq55FqXc8cG8b1qqHmbDrzF+W4m5xf1I9bzKD5LHc9bVfDq5rksZ+80mSD3v68l0LUnXvFGQEhVltP5tQ/QRJyaR+4m+tbLiOuyN2Ou+owGzUatD8QZ9loPmqhl6ksreX2KS0ZmO5Q4apWLL54KOIDSr18uaStXVgOG1rBWaUhadteQtFirHLQXJ8PwETR5cTKccQatEVJLswSstXz/nM58uHAOYBg9pDN3PbAAYwwozUrwr6NA25DPhOzPAaUkfgTRZJBWsZb/JI6wV+u3NFJVn+J3f1lP2o2X9iQ/26VnUQYHSgOGzPlV6NGDaXPc0aRWr8UOVbyp7xIwhn0aezstWbUuyrJlFYBwRJ+29OuVRcvuIO2+tzcwZ2OCy887gUnDunLnQ+9RWlbHYzcfS5cO2Vx433u0z87mlz8cSkY4yN2PzqJHp3bc/8N+NCY9bn6ohAG9hAd/cRpllQ2cN4Um3f90L3uzoXY7YTdI+8w8HCCFsrxsI/mRHLpnt6VZT9xHWoYboSXxefPwV69GgWDfvoRGjqQ1Rg7tws68lKVnt7boKgMo2TkZjBzaBazSGvM+5WvnFHagwwsP0+bjy6j4/k34731MmpPfhqIPpxAeNZx/NSFNQfiCryAWfAu+5VDZdMcTpKJRDAG+JLikolE23fEEeccPoyX+lVfSHAVEhDcrK7lwzBjS3njlFSa8+CKqinAALDgdPEx7Dxwh8U42aaFx9eArTgcPvzgIhr3yMTRHSbHohu8w8NZHaBx9FPiW2MeLWHrDdxj8q8cQHFpS9dorHL5lDWnLivqQdsSWNaQt69yb7aqM7rISBOZt6g+/FwaWrAOUZUV9SDtiyxrSlhf1gdGHkzawcBAdczrx2pKXaJ/dAUEIOC5JP84jHzzAWyvf4EcnXMtx7YZj1eegqDAkO8ZvCjaz7JVSzvtTI3WNStr06dO54Yaf89HHH3HOKR4/G9+O8KvZbJ7hslcKkpWFO3I4sXsfxBS0wxnQH3zLgTLGcNlll9G/f3969uxJQ3U9q//ndxBPYiJhQmqxsTjF1/yGvDGjuOiiizh21CiOOfpoRIR9sYBvOGjjJ80g7kZQ9cEIE+Y4NAnBlGnLmDrdJTM7BMIXEh6bRp7IuiOPQxXWLwnAuhUQcWitXGlgQugjnoqfggE2+R0o8dtyaeQN5tcNAEmyd5ZmpXxOGnUYk39/KeFQgLSxw3pxWl2UmR99Dq7DgUpYj3s+f43i2nI89Zm9ZRFHt+nBwYqEYe2Up7jgtDhpa6c8RWT8D0gl2KeQWtLiScNH5SciArpdcSVFiP2XoHVElPIqQ9djyhh7UpyAAEVJ5MgkGFixMBO1wu7eu+dSdhZQS5tUEoQDM/Ip0kYMakdLVC2z3lkFqgw74nREhNaoTTl8FSQri/9n3wywpI0hbXiNxfLvRxXaZ8EKr5bK3t3YXt+RUeGlhEMcNLumATsoi+LCtrQJxvGzg/jvlQDCvxsBDP+gHBBVKK+J88TrK0hZS0lZA+9+WkxD3AOC5DiNnN3+fb7b+QP69WpPxvBJZAw+Dz+7K+tK6nn/5VW8Nmsdny3fzvbqGP+prq3uza6UvFAeuYE2JK1H0AkyMvt40h6xp5H0kgRNgBqvlupENSDsaj5p6kPOkVHcLJ9kZYCCMVVsK+6AlnPoqdAunKAgGKXM68nrF1+NAif98Xe0D61HJIutsTCI0noOK+1qjiwaStWndVz5/FrW/bYbAevz3WfXUe85OB0H8v77tRDIBizNKWyfjQJGhIefmc+g/h0JBR1Wrq+gqEMO2VkhjBjSOhZkk5URRET4w1NzGdSvI8GAw4p1ZXTumIMRYRN7ocKg3Bgb6kOsqg+RNJYfze5KWtIoWEPPjCQ9shNsa8gBUZozftIM4m4EVR+MMGGOQ5MQTJm2jKnTXTKzQ6gACo4qvWs20LdkGu/JYroHjqFUlea4mRnk9+vNoeRYvnKuBVKA5Quq5IZzuHfs1dzz0TOolwKEHRRcS7PuzOzE7hRQQAHLrgwggADCnqYl62mJiJBMNFBTUULK98gt7ENVdRWxZAOIAZSWHMNK0ipmObzwYVvaO8XkJINoFLqjpAXVoc3JlxAMOuzT00+T5qows76OgrO3kV2SReWMfEZ/tJrMeUv4lb+VLTaJi3AgrChvL+6P5zugMGN5H2zCo2//Qu47fxCDnnuWitdnIcEgEgxgY3Ha9OtDw62X8t3QPN78ZDKYABiXHawBFKwBK6Q5DoSCkBEBVUAFrAEroLRK0R+W0Cxx8LatITrtcdKyTrmcQKc+oD7N+msBrWHVUtlYQ7vMPMoaqkn6HiLCv0okYNg7xSYb+bS0AlCO6+oigQhg2JcRD93NIfXwPaRlX3IRu/BTOEcOxKxdCSiBUJDMc84kXFYOYtinSZNo4rpknT2W7J//N4Hunam++8/Is29xzoZ1mUfHyq6b3LD1nGdy+9xSdtaSp4hu8nj3mzTHKnRolwUK26saMMIBO7rnpdT0DfHcKZaAIwQQUKg/E5KJV7GOw+FHRPDjFhBaa/ykGSTcCKo+GOH0OQ5NQjBl2jKmTnfJzA6B8A/Kz+fGQBRESKtpTIEAwp6MAW6sXEEAAHWCSURBVFUwhrSACSIcOgHH8N2TD2cPIoCCKv/OdN1zlL77InaDR9XkUmKD4nQYn4/0uoD9ddNPr8e4Lt+85RZuzezIuaFcotaScZhP9FOXnFEpTNASW+tgG4TIAJ/kTIMEaB0xjKtbwevr/0rd5lLEGFpjJPum1uf4I0YwvP8g5qxajDgOai0d2nZg5IChZGXmgCpfp3u+ca3ISYYqgeyrfiyXOy7L527hzxs9nGgp24vruWv1CMa1X0TvLgmisSCBrEz6FNYzY01XVkS78fH2nmykE4Sy+dL4STOIuxFUfTDChDkOTUIwZdoypk53ycwOgQAK40d+zp0Lv8epg2tYVHYkvXq8QUCWEwr2IuEbdiYCGlfO/0aIT1amWLbVUhlTrn8izvMf+vxm5FpOqZ5NSgJYEQ6IVfAVfMuhlB2A35/p0u6GMDL0EpKdlKx5L1ExuoE2n6QI1nAAhLCJc3LbV9iDQqdQMcNzZvNO5Tm44nEwyrdtZ+W2T8hp04YOpVkUdi7kYKjy/yuTQofxpZTCNwtD/GF0PvUaJavXYURrprN83EBuencDIdeg7MtrpF1w00d8NYQDkdAwb8fG8XFiFNU2Bx+XvRMSfpJFJavpkN2W3gVdqI830jW/IynfpyHRSMpPUV5fQ24km4BxSJIEhN1FYz43PLmKmoYUhB1qG1Jc98RaamqDnNhrCb897SnCzhpuf7c9s9b1IOgqmUGLAso+KHTMS3L/hcXgOMTXxii9czPxdY1I0KC+D6kUEgwS7t+fnHHjyB43jlCfPiBC6wgBMQREOBizT/8Vu1MVDs8tAR+GtV3P7NMnIaK0xqiH+IIqWllN450PEvnut4k//wpaUUkqFgPfAsqBOOGnb5MMZWBTPjjCKbP5B4N14W/Pz+fpVwJEskKoCE0CLqvfmU7K34aGRrFyWQO4AsquAgF2CAS4dW4lTSJhUA5Y9iUXsQs/hXPkQMzalYASCAXJPOdMwmXlIIZ9mjSJtP/z2/dQQBQ0HGah00CP7t1wunSDgIvbuycVtTEuuP0DUg2NICDs24NDfs2h9BC30JJUymPRyqX4VcUUb7WoCp0ri5k+dzonDDueQCDIwTAOTN+kpJ3eTbAcHAE6tXHxFcYMyCJtQ0USR6CsLoXSssqPF7BXCtYTCk5OklY+K4gJKAj7TwRUAQGUJgqIcshYyMwBIzTJzAHikJkDRmiSmQPEAWEXHduGacnGLavZvGItKYL0PbyQzoVDaK3NH8zm1VmvkxEvIHfBDE6/9CIKX3iGsh9fq8klS8UEA+yv7n+6l901eHHSMgNhmtPgxUnLDITZwxP3keaElCYWcEA7W0Ih5b1S5eVwDwYMvpTNtXNZU7OVolHDGfD3J9h47y2UvfUkNqeItkecTM1LL2HU0sSjyfhJM4i7EVR9MMKEOQ5NQjBl2jKmTnfJzA4hCFluIzefUMGfijNY0f4qGD+ab867l8t6bOSKZ9ohRFC+MH7SDOJuBFUfjDBhjkOTEEyZtoyp010ys0MgfMGmWFZSxLQub5HomEHP4q7ge6D853McbH0j68ZdRrhfT0xWJqa+kXuW9GKG2w/HZz98QNpVV9zJ1029CjABNL6eNAl1Rr0KJNiJ1vCFLygggBFIunRtV8vLNz/LsL7b0Dgo/0uhTZsE4wZu4vXPeoHrszvHccjPz8fzPHJz8zi0hHAghZZBZShIl6wGMOBgqErU88rmOdR7MQLG4eAo0r6AzJ9cQ/W3zifrxusJjhiBad+OnPvvIjHjA7S8FhD2Zm63bnxJHAdxHNb88IekCeA3NiIcHJOZQd4jDxCf9QEVF1wK6gCKBIKY/FwIBbC1UUgk2R/iGHwvxabTv81zT97Pjd178PB99+F5Sc47+xzuuO9evnfLDWz45e2Y7CxQZW+eLK+mLr8zOWcVcoERnjQ0uWAoJJMpbi1tIO/wwzCxBGkB4+GKR6OfiargmhQZTgMXdXuSB9f8lH8ygOJ5yutvbmZzSQNpS5ZU4nkKCBYBhIPlqdDO9bk+v4r8z8q57Pd1LF3ns7P8HLj1B2F6TBjDFRXXsri0D0iKHdTwVdj2I0tLCn7yc97P6MSQYcOJzHyVqvtupzW69SzEWiXNcQxpvm9RIMMo5e9/SINRQNgf3XoWYq2S5jiGNN+3KJBhlPL3P6TBKCDsrzZte1HT5QqipVNxw11p3+McsrKyePD5efz52VUQMPzbE/5BqK+pZOXCKagNEsntw/IFb5DfrpCeh32D1vBU+MGmI7ir8wrSrisZwN97LCIoln057/fn0SxfycvNIJwZpH/fDgjw+ertxBuSVNc0giM072bSxk+aQdyNoOqDESbMcWgSginTljF1uktmdgiEJtZCzPPJynFxIvmo7+Fb9qDW8tPl67i8qIA/143mvzs+g19yO5VVH+Pm9OFb3/sLyUQH6uLnkhOOI84jrPp7X6prSrGB4dQV3kpV1iiWbijhsh6daZGF0IAkwZ4etsGQeWKctKwJjZhMS3J9gOTKABj2KhyCAb0dnn07yfjRAQb2cbn373EeeUG4/NwQx98X57X3V+MlAWHfptDkuh6V+FYZ7K0lNU2wCJpI4vboBpkR7LYymqhi2rXF6dGNyA/+i7TY/Y9BysdWVoEIO5tdOpmdeS9Z0m5xDTsLqOVAGSOs3ljLqg01GCOkfB8QLhm6FMdYnlk0kNUV+bhGeWXGRkTAGKE53f90L4fUE/exu1WrVlFTXU0wGKSiooLy8jgPPbSOokKDqrJ1m3LiiV3IyPBJpVI0NjayatUq+vfvT3NqGpVr/hTjjCXbuOe7DUzN68YdG4uIWZepSz5kUclarjruDHIHdkFVadGv2G8q0KnO4ckXsggYuLSygXmNKc4/Eu6dAMkkdOML4eFHkX/H5ZQuuxH3GEPuN85At6c4UG4sEAYsiJCWsPxTwEWBaDQOYugcrqNduyB3LymlR7+XIOVSvMBwR0dou6KOSrLYFwXKynrSths0NuQhbfLQcITyij50YiX7y0smefOVV/AyMxFVDjUJOuQceyzx9+cR6JiLJj3MxhA5x45Eaj8D9WkNC3RVuJEANxxzOZ+nPD4vB0oB4QsKOEAHoCjAje89RFeFpLCHWCAMWBAhLWH5p4CLAtFoHERAgVCA626bTfV9P4JKn9/c8SCEgqC0iiMQEsFXxeefQiI4wj6dMWAuh9Jri2hSqz57owqRNlA8V8AT6mosGZ84OH1TVGxxEJd9MgLba5M89M5Wbj2vO/vSs32YM0a05bX5FThG2F+1W1eR2voMabVbTyec35XWKLYZFNtuvLoWWLud9n+czJE8wajuAY4f1Ysjxgyn3bHDMX37gRjSstr2pGzF31n1/q9JNnzAGXf9FvHrgQhftaifCfikua4wcWIf0qZM2UAq5aCe0lATB4QvOHxBWLmyhi8YmiWQSFrSRDgkll9+JM1ScMIWjLLmigG03jzS3hyVy96IzUGm/o3ILd8iMX0e3tt/Q0bl06KPaJkIiZTl6ckrufmnRzN9znH81x99/vKDe8kJJzlQnqdcfGoON95Xw9ChEdI++yzG767J5cMHlf9bVIUNe6VgTm2k00lR0ipnZmHfzgBh34zwf4tkKsHcX/yUkbfdRdq8m37C0bf+HpSDohZspcEPOCjCvwPrBsgmhRr+QcHSJAAEAoKIxYs2gggiQmV5MXP7daVP6YkM6J7DG8kPGfv3LRSIw85GDQnyjaOC4EDKg+1lPos/TzFvvkfmogBnbw+jtYK/ZhlbNnzG89s83u/bl4IOHRg6dCjDhw9nxFFHMWzoUAoLC9nB8h8nKMpt/dfz4x5bcVXBwAvvdGbmO8W4JkZR2yyGDO3Imef15fVXtjJlZncG/FcFI3OiLB69kPs3FHLT2q4kVWiJ07Mv3/vJMYw/IY8FKeWTcqX1ZtEi9WkMjCWacz3iOgS3vgDV2whkF5AY822CKz4kOHsybjwKCLv7Q68T2J35PMrylcVghL9Nnc/sbgOxOcr++N65p/BV8KqqsQ0x1nUNUJObgYhwUJawJ6v06piD70fpOeQYpOPvqSxZz7i8HCLmPTZdMoj2PUaT1auQxevn0rtTLlsq68ARWsXz4JproH17uOgidvH003DhhVBbyz4JpARK6gGHHaJJuHE+vHgK3P4ZzKqABP9LYGUdXxCaFTQeP15wO1WxPKZtHUPISYDCid0+5La8SXT+63LKZ2SgJkxaTvc47pXZ3F3wMx5efhlJLwiGXZRGS2mWAMYQ92MIQlrcj1EaKwNrQdl/CgVBeG5IgKPyhJRlBwkIsU+iVNy+BW20YGjZ4YfDW2+B74MIFBbSpLAQVq8GVXAcGD8eli3j6xALhAELIqQlLP8UcFEgGo2BCG+/t5oJ3+jHS68ugowgTWJJxo8bzFszVwLKlzpqjB1cQMFTJSdeiy0vxfeVQ85CuLdP4ZVx0rb+MUx8jUOrKdi4gAMaE9Iig1I0fhLA1gsY9ltJdTaHVjn/qUwoxMbL/gdcF3xLpF8vutx9M91GDuMCz8egtFYkfDVpVW9eyg4Swq98Apv9Exw3ghHFquCnYpj6F3Hafh80QUsiWT9gF45h8bpyFn6+DRNywQgHo7re47W3t0BQcBTGnNCBae9ug4gDQeVnj07g8R+9wTcSwhU/P40St5GG4z4g1LmYlOfgIGQ6Smtk9juB6o+ewIRArUWTFhPOoP2Z95Az5HwOlDGCQXhrzkoWry/l15eN5byBHbBWaS3lqzHxrKO4ulMb3py1iocenc2l5x9Fu7wMXpu2nA9mrebO68YiAq+8tYxk3OPWn56KF6ul7JaxWONwx6+mU1KlPPvCp4QzguzONjRQ+9xkap56hrZXXUn2mRMRx6FrboAfHZPPZ1s8Xlixnep4DBH2qdeDk9idpnyyjxlMWtaww+n94C2I69AqV1xA2ozgKpol8F7PKN8Jh8iNrePCTSmKI2H+0rMOcVeA0qL+PTrSkopYNZsWzmShV8cRo0aQ374nB0xgcDXkJ+ClnuBIgMoHnyY1+V26PHkbkcGHsV8ENlR0pK64Fi/ehzYjTmR9xYsMLNqII5b9URzLpzkCJIiyaMUYBhx9EcUJS+nCFMd2mUVJQz7K3lTxr1Sx5hUaq5aj6pPZ9kg6HvYd9ocoOL7PotH9ybvlelazHV1WAhmGWN9sIj07wrJZ7BcPkrOCRM5JkFzs4nT1CR6VouEPEQwWJ+UjKEk3yLZ2nVjVrS9Lex3Bqm592Z7fgWQgiKji+D7NEthQ0ZG64lq8eB/ajDiR9RUvMrBoI45Y9kd0RpA9CAxPriGiSUSE8rocjLFYNUQ0yfCNa6jbGgalGXGaY4AJgxfz6qJBIMoeRKloyOTMwYt5+bMhWL5eXkaEiPIPhjTLFxzAiTiIQDzugQio4gczWPM/l3HU0lXMKp1HyYje0JgN6rOzWCAMWBAhLWH5p4CLAtFoHERIc0Xo1FhCaX0W2SToxedgFQz7ZBVmrq0m4VkcEb7kiLCqrJGN1XF8BWHvFvz6EXamQH/HMDBRjhrDt7YuYP09a9mqyr+DNk6Kr8Li2+4jLZH0yYwEOPmEfmSGHBo/nIcbcKFPb9aMPoO0Ph9OIVyQh7ellPqPP4XBRzKrOE60poGQa0CAc0eSpoCDUhoNM2BlFIIKPl8QsDGBCE1sTCCP1rnySlrt8cfh8cc5UFYBhVM7ReWVmVDybgQQ/joig5cGh0HYp8T0D9lBQfKUjJ/VoY1CmvsNB3eoT5oE14KuIk0ylMY7ctBqAWFPlmaJQH1UefwvcV6cFidt0YoU3zsnQk6moEqLGqa+SbNEMKUV/PKIEZT6pfiidDadMKUVNLz+FqjSkmTJdhAQxyG+fC3Bzh2RgMseFBBoXPg54cN6or6lJXc/MIf/SAFgMBACNkAgBeN7OVz7XZcjDzOoKivWKHc+mmLaLJ+kR+sILCut4UcvbuTvF/fgS8FIR6Zum0llvI5JXUbRWqqgqqgqaapgrRJwDfe+sYbnPi5Glf3W6IYACyKkJayyQ8DFAtH6GIiAGDRRTMTbztZVORSNGMvZE6pZ98xi6nyltRriUQJuCEcyyNBiGr0MEskYB8szAVYsXUy7Dt2ppJjCLetJkkVrpVBOCWZzVqgNSVXUKkkVYr5LzLf8+xNsfS0Z4ybibVhD9QO/RcJhAl17YPLaYvLbIa5LS6J+JuCT5rrCxIl9SJsyZQOplIN6SkNNHBC+4PAFYeXKGr5g2N3kxTU0J2WVuKdsq/MwQhOrEE1YimuSuEZoyZQp69gbX4UjzvgufZa/S9qaM77LstfW44iyLx/XPUrzBGNh1dIcNr76KK7vsyrQlk/q/4Q1/IPSnGF84YPFH/N1EgHFYVR4ORtq25A2KrySjfVHISj7EujUgUOqdi3/Ku8vqOIPL27m1GPakXb5bcv40be60rMog4OjNPbPJ/bWe4RufACysgiEXBDhYKRSlhVLtrJpQw0gGJugV7feuK5hXyaedRRXd2rDm7NW8dCjs7n0/KNol5fBa9OW88Gs1dx53VhE4JW3lpGMe9z601PxYrWU3TIWaxzu+NV0SqqUZ1/4lHBGkH1p9BIs3boWEbCqnHHYcZTXV/Ha8ln8f+zBB4Addbn478/7nZnTtpfsbjaN9JBGElroUqRKEUSKKIqCIIhEmjSRZkHupQkIYi4C0kE60oK0QGhJSO9lS7bXs3vazLx/z+YmpOxmSxLA+/s/T24oiwv3OYntYbKySFVUkBaaMoWeeukYYVOKheWspnXFSlKJFIMWf8hLR0dA6ZHC+/hqiaDJBNtr8hi45qdwwjcBS/hHdR7XVwwm7dcD1nLyMY2cfJTy7Otw433w2SK6JJahfd4iUMUxNnjK7F0y8M47lZyD9wOS6Py32V5uc5TW2YsxWGzJYNE6ezFucxQ7J5OuJGtr6UoceBU4ubWVtFc9j/1ragixfcSB2JO5ZPy8hrS2O4sIn9xIXwlKy+BiIoftz5JhQ7CLClBg6a7DiAwbROtfnyNnbR2K0JV/La7jtjI6TGqtI+2OMlBgUms9abc/6YDA5KENpN1ZpigwqbWOtDvKQBUmtdbSPcGEQyRWrGbl3eeQWxVBRegTFRxRzhlQy8mta7j5qkZenpliUy0tLbz4/F+5+mzDt7Oyqf1dhJYygzhsRtlEKEjsrw8SKSkib/nnpD6YRdtvfgvGoKpsj3333Ze019/6nHhdK6UOiHpMLxzJu1nFfK9yIcNnfkr/bx1C//796akcT2l/6U2IRFBV+irmhAAfREhL+HzBsVEgGo2DCPgwcUSQg80cFraPIO1QawHzh2cxr9wFw0ZGUoACyuaUVX4JTyUOJqEW98WOpVkjRCTBddGzQFL0iSqnfWsvQkGHDUJBh9O+tRcz3lvI9qiKNfJ2zQKqE02ErQD3LnuZ/YvGsm/haPrKUxgZgqWz7+eua/JIO//G+xn17Z+xOA6WsE3vVD3JjrQ3veAZ3NYAs9+3GbprjBfuK6VocJx9jqtl3dIgYkB9NtNy0Q1sSoFaEXY2EcPq1WtxXRcR4f+qx484ga/CggULaG9tI2gHuP3229kRFHih2DAnxyDAuiAcXe0jdE/jCb5UBo7bdQVt0QR75S2nsF81KNtHBG9xK/EnlQMOdcGDphlxYjk55BBFEb5O2g3UBQSxhT4zwqJVDdz22Bya21LE2oUMy+W4/Hc5d9RsJk8eQ2TqX0mUHsTKOuXV51fy8rsf89miGppaE2AJ2BYELTZYvDtoAhRQvpC1P+R+C+ofgrKz6RBfAgVnQPNL0PAMGwkggATZ6YLisylVnwxjcdn4X7BHwZ746hG2I6Q9dsADGLH4pP5jbpp7E214iBg6JeC7hmBJO4F+SaygDz47hygNiTC7DdyDQUbICUdI233QEDx/MEtWLADx6RXxmRfP5lKzhkmlpQzK8nj68UexHYfxRf1oU4c981t5cmAprPPA0Knn7jmdDVTB9XxQsCzBGEFEyM0OkfbYf5+MqpLmK3ieT5plBGMMoBQ9cQ6dEqUq5nDuuBqmvTcE11GWtQbpIAqu4dxxNfxtSSGI0pWYEwJ8ECEt4fMFx0aBaDQOIiDQ2uJxxz9+Q1NsJSsmFfOr527izNgpIHwpSgqi7EhVa+me73HUqKnUtjcyb91isIP0lMe2GbamgNI3ghBrr2P2uhYqSg9ARyu77LU/0dZqQABhW16/81g2EEAVEDan0FpZTgKlp7xhURYNqqbSKSBnchE/PKKM+vsL2W1dhHsZzCXxFXzittJXq5sz+dv7k1Hfx1flR6fsydUlSfzLf01tZS0mFEI9D0kkKT7zO7x+1kQuW/IgVY3VYAfY0gsDbdKMCrUrixnq1WEppDyIx8AKwbufFpIaEsI4Hj1lsgrpjB9tpOGe80ks+4S05Ko5FF/3GiarkL4QEaLJGCsayqlra8axLBram1lRX052KJOvJ6EtCfV1T5D0gkSLf0KWI3yV7hx+EFsyi6IsWFwGRnjwhY95Z8gE/GylNzSewC1bh1tRi59I4TdFSZZXo5ZNsRvjgoYFuxzQtm76I9HKH7+YPeSqxKHPvcObxyv/9t+v7EYHXykqzubZu04n7YQLHqGmqgWM0DtPk6YRmxz1WE/ZIAgEIwYRxYu3gQi9EXdCgA8ipCV8vuDYKBCNxkGEDqJ08FnP0CO+wOvDY/hC39TToawuyjaJQLQNk5eNBGxA2KZmvhrqI5Wv07ouH/uY3Uk21+PVLaNk3Wsw7FQQoTeef/55LNtGgavbqvg41c51mSXUPxLCTUHGBJf+58UQB9ZclUFknEtXxM7DDPgj+FEkcwixhasp++XVtL41E4kECRgD6rPDuC77TJyKZSwUBQQxhlmLZnP4xadS39qEWBadabx5OjtDLBEnMzOTqqoqRo4cycqlS8jLL4AFi/GSyuMLx5CvNZz1zRYQaItBsZYTbYCPy/pxSPwpAlWVfJB/OojHBjEnBPggQlrC5wuOjQLRaBxEwLNYuraYQTkNjMj6gLCZxz8XDiSSlUMi4YDtsamAgWvPCvPDQx1qmgL84ZkEj76dggB8ujzFcYtK+HalxfWLrqIoVY/Sc6JgeT6fHDCcjBsuYC7r0PlrAWG7+TC+BBau9RlflE3FURej6jNk6atk1FTTOg4K3qfXFAiZNvLsOlA6VRyoQBG2V7/iQo6IHI6KUpTVj+2lvgeq/L8igM8G4vsECkrIOPo4qp9+Dr81Qc7h38Uqi2L7ywhgo2xbkv9lCzvDQKuJvlIECFJo4kCctHI6o4TsINmhDBraW6iJNpIVjFDRVMPi6jXYxpAXyWZVfQUBy8HzfUDojKvKzGXNYADfJp50CKVmMfMXfydklvH714t4e8VQAraSEfBRQOkhz3Db98opKXJpfKGR6j+X40dTgAcaIDRmDFmHH0724YcTHDkSRNhUynepam1gRX0FWxH+TRnSkselJd9h8TtzmO9/Sl/t238ZnfJAFXKD7exXupTeMkX9SPPmzCNeVQ3BAJKbDb6PFBXSa0voEA+EQX2whLSEz/9SCNp4KNFoDEToYFxm1OxNRWOY8lAlNZ/EwLbY0gm1C9mRnmW9O4cfxJbMoigLFpeBER584WPeGTIBP1vpjWDAooMCAQuTSGHGjMKEg4ht4Y0ZhVmylnDQIpUyIMK2uHw1/vn288z97G0GRmLE9r0dAeYsfow1rfNx21o48tAT2R63zlb+9LlP2rIJwrS9LbaHrzCqJMhPDsynNNcmbdf+Qe5/p4GqZhcRtsnYNp1SCBQrJSckyJ3qkpY1Tqh6NkiyWkDoXJIOIkp9eyY/nX4+5XXFOMZlxLAM/rBbE1MbLWLmx/giiNIzV13BRgJOu9DvZ+UUnFcJ7YAAAiThlstYLwkYIAm3XMZ6ScDQa7UNtby19C1iXpiCQccysJQeSpG0HarHHMv4vGxWVSRRr5nQbhMY+NQjUnnpVVr28luIZbE9ookYv37zftKuP/QnZAbDbCqaiPHrN+8n7fpDf0JmMEyXRPFLBLefTXZxjBlrfe5udzj6oIm0Rz+kuWEFV/7qSs4++2ziiQRHXH8zqUgL6ntE58zBLxZMnYIrbBBzQoAPIqQlfL7g2CgQjcYRY6hrD7K00kX8XI4e4QDCR+9ksqzSpa4tCKJsEHNCgA8ipCV8vuDYKBCNxkGEDkGPK6dP4BdX1wDCldMnQDDJfzr1BLBoefUD8Hxiny1FbBvLE5Y0ZfJRRRb4Sm/ZtsWXTQL9oeUtaP+INJG9IPtgekWV/Oww0ViSZIvDMfsu4uErnyI3kEDjbE6AJFx95lu8+NFIcFxQYVOe5/HII4/wySefsmjRQs46Poc7LisisAIqfpMkNt8nTSx6TVCq2sPYgy3C4RCfNwniATZ46uN5SRxjsb0Uj+CBe5N8932swQMIHnE4Taf/kMhZPyD8ozMITJ1M/IU3EWy64jU3s1N5Hvb48diDBtB00SWgFuI4dBAhdOxRZF/6C5p+eQXxV2eAbdNbEgqx7Pvnc8MNv2LIbbdx+UUXkXb5RdNYc9FF/O6hu1h+1i+QYJCupMJhIqoohjSP9YxAKOQgAvFYAkTw1GJs5jxGZy/g8bVnogiXj7mW+1f+nDuWXYYtLhsMookNtLaJZTPWkRZWGITgA/m0Y6H0lQKuCgdmxviFVcM//9LALQ/FaI8rmzp4inDtJSX8q//ZXFZ2Om1eCCTFpgZl1bEjlbFeC12z8/LJufpSPr71v5iUmUvB1ZdQ/uB9uA0NdGfaEbuirCespwigCBDwRiH0wt03kzbtiF1R1hPWUwRQBAh4oxB64e6b2aBfvxLCk8+kqfEoMjIzyc3rT9q150zgnJNGYEToqb3H0WHWu8/w5VPUZNPQnk1paQH9igdStux9IlQA36A7IsqM1kKeqB/AlEgzaU/WD+CHheUcnVNNtwIuW/GVkpIsRg7MpaElxuzZy0gb0D+H/AE5LK1QqutawQhdiTkhwAcR0hI+X3BsFIhG4yACPowqbmPf0mLeWlvDYcNKGVc0DGtQOx8uDoEoG4gxFGVEuK+ilkGZEe5+71XE352fjxtLqul+7jj8INzoEFAPxMLObMKPvsMK7wTuNFdwenA4WXis8pRuCXj1huxp7WQcGmODAX+tpe3NMNVX54GwTfEE1NT65GYJU8bZ3P1Ygk0FXLB8xVWhN66reYk0/22l5U2fDraNGIOqgu+DCHg+UpBP5IqLaLv+j6Rl/PpSopf+BmrrwRI25ajPphyL9dRnRxIBEcFTwfcNk0qrGNOvjrxIjNxQnBvfOpD6tgiW8fmqJRIJ8vLyUFXcVApfhZQE2H2fAgIhw6OP1OCr4LoukUiEjIwMEokE3XnuI5ePljXyXz+J8/LuTZy9dATL42HKmmq4/Pl72VkUMArZCcExYLUACXBikK/QzuZMagKFk67HTwR4/eFPcK75Jb+1BSnKA5TesEHplghptdh8nPNtxpTOo+Gf++ErHDO1gWeW7EubI+DSLRGlsHAlwfJqwql6Uv2COBYU5i7GVPn0Vlt7O2f84AdE2UmMwSkuANfF5EdoX7ocVcUpLoRWA3j0VNJYfGvha3xQPJLnhh0AqRQIoHwhxb85HL/0Lb618DWSlkPnlG6JsJEFi5Yk+M3Pb0NEWLosBY7QG+OdAGExvB2LkXZQOMxw26YnnjzxT+xIgUfocErLGrri+nDM1AAHTglwxfVtJPG5OBVhScrln9EUtqFHfIVBBUF6IhK02HdkNs99XEdf5JSOJlp6Omk5paPpOQWU9WxqKOANCnljtcDqNor+/jwTeZj9dnE4cL/hjD9kD/odMJVB48+kquwVJBTGBEL4nsuXQ9kgM9Pmj388lLQZMx6gqSnFesKWsrMd0lpaUnRGUNJE2KHG/eVzOpMSi8p7BuHWBBh21RIcy0XogTPpcPbVI9gmH0jOh5/mgskHlG066k16JGjxm99/wEXnTyGZ+jbH/z7B81fcQ1Zmgr5QhOxsC9sRlqxNkWY7Qna2hSL0VsyBj7Itjq91SRg24/jwUbZFzAF8vlQH/LiErigQcXzeKFhA2mFDd6H9xwYRuvbpXNIyEyl2pChda313FrX3PEB88XIwwvZSlDY3xj4Fu3PpqHMwtkP+1H2wxJCWP3UfjONw6ehzqE3UM7P+UyJ2GEHoMQGNCi3T8nHiLj5Cz6xjZ1O6pgqIkOYLjGhwmXvj89z3XRtt8Dj8eWVMQzaeMWzK8xTPAxQQKMwzHH5AkKMPDeI2Qdk1YRwRWqOKk5HBgspqsj8XqqureeWVV3jllVdYTxg6dBf+r2ltS9DSnMB2krRGG1m0sgE/5XHUtyew3wFDIPUJPZaTD6f+FO+wE7jXCnDvfJ/eu4Nt8QnSljkNU1eGs3od7qhT8XPykAXvk3frj7FSCQQFJwhi2NK0y6ezFQVCAXAsbr3nZfB8EL4ejBAqLOC18dksczwsDNvlMTplxCBiUBFyh05BcoZR0RQj2TSTMVMmkzNwD2pjVQStIEKcPjnpJIjHwXFAFVwXTjqJXhM2Z8Fd8+HR5RCyIOGxUbZNhxaXLiV9h4ZkHlgQS4XIy2zitt1+xRFvP0fdgzY1bRmkBcIuhWe6vHrgCVy99BrK5/YHCzBs5eR/nExXfCOcU55kT2OTNrP8A+575jsYX+k1hTwHHp7scECBwfXZSGwhPqeNupvK8FtcsIRuBYMwcCBbsW0YPJiNgkG+PEq3RMCCWXPL+fYRYzn2mAm8+9EqUDjg4NGEAhazPq8Ay7DBM9Gb6UzgX4blHzuosuMJJCsNYitpyUoDQu8I6wkdom8F6GDok/1uOpsd6wp2Jis7ix2qiY183yekHslghP53/468H3yXNCvl0lfL9t6fzRgB/TMoXxBABPw/02OuYQMfAWPhp/g3ZXukPKWyLgEieAmP196qgrBFB6OsqMvmkCu+jwio4wLZ1D5+KsGBZeTs9z7OwDLwLNQ3dCc48VQGXlBIcsW/aC//hIJDriA0YBJWRiFpsXgbASeIZdn0hQQCpKqqqPr5Rax2mlCEnjKZ7FhROtw5/T0ijo0dsJgwpoTb73sHX6A4P5PS/jn89vY3iLs+o4cUEAg53PBfr9EcS3DE1HNRhM/v+oCK5gQH7j6EuvooWzIZGbi1NcQ++QT1PMSy2MDXFCv8F3k5dTd1bisGoTslPz2VbQmNGEL/EUPosXNPI+2VhR/TNcGcFuK8JRX0yzqTu4Y28s+1C0GE7iSWr6JLqmRlZnD0hD1ICsRbhcXV6wDh6yK+ZgTrVi1hufZjWPMgopWjSeSuJZLtg9Jj+91wE53x1HDA8KV8s30ezyz6F+FgE0fVtXHF82fy7opRWOLTufP4KnmpKFYgB1C8VJTesH0l5hhuOaSEl8YpPPUbUGUjy8B7Pr1mQ/ylAPYyi/ChcXQVJG6wSdXb1BQVsWTIKOYNH8+SIaOozi8m6QQQVSzfw/g+gVSS7sTXjGDdqiUs134Max5EtHI0idy1RLJ9UHps3c+y6IyjHvcU3caF5gKaAlmk5aZauWfxbbReGKBBwnSuhc4IIIDQNQEMyrZ879hJbMoYYeHKWj5dUAHGkBkJcNyBoxGhR/4+h/WUbVIFhI1sY3i6wmFei0BgT1a0T8GIx9aUbonQwVfGDMlkYng1iYwhJNpaKVzwMmMG7MrCdS4YYVsEaGhzQUAAS4Q0T5W2lE9b0keEbbpn1bNsSRRilk1KLC5Z+xYWitIzf2XnUnaOU37+NFbI4Tsn7c6vztkfa948ah79B0s0gztaivj+aRmMcSzSXvm0ksfeepfrLjiIYbsMoPq2ewinIjzsDuT5z+pwm9vYVNj2uHXxruD54Ct4NrvlN3HT5MUcM6SGhjeCoPDXb87hxDUVXDV7V+Y25ILtAcrXhSfCyCPbyXzEoi5uM3e8RRwhiPJ1owrZGcLuYy2uvt1Fgd9NyyAnQ/CVbpUfdxxdyTIOuVjYIxTjQ8nKRvyF8yh/5km6s/zgM0nTlEvJNedRcvW5aMplKwIolJ1zLfHFKxDLYpuU/0wpYDGwOzAVRmUbLj/OZt/RBvX4N2H/vQXbtlmxWlm43KfHFITNNbc2c1r/vbCNQzTaQk5OLj3xjbFF+KoUZAWwjDC8JJNDxhfhWAbPV3xV+kbplggdRFlbW8C3+zexqHYJ5bMrGBQOEfDHAj49oUBuVj/qVi9nhTOBdY0hYrU15OxbiBJle/iWxfKFq9h76nLOHvAh5z8wFbUFUHpCgRyxSHNEUBQhTdlRgiKUx10eMPUM/1GKv/84SHbEBzeF5fSDyO5UWXvwr7YCnquo4V9Vi6iKzgVNgrHZFgkEaH36YeyBQwnvtR+g4LmYUJjai35EYtkCTCjMtikbZGba/PGPh5I2Y8YDNDWlWE/YUna2Q1pLS4rOfPf+lewMp5/+Il1RhLwsi4u/MZC0//rzIhpb5yEo3XHUpysCfH73LURCeSjC7Lv+yNEoqnTrqvuu58ukKpSG4ozITjE3MRoFJgU/pLQlhqrQnVFvPMkONbCUr8pJhxTz5+fKue4nI0ib8UkDJx1SzPbSoE3kwbfwjzG0TDuC3P+ZCSLsGMp6Cig9def094g4NnbAYsKYEm6/7x18geL8TEr75/Db298g7vqMHlJAIORww3+9RnMswRFTz0URPr/rAyqaExy4+xDq6qNsy7zqlby85ENq2hqJp5IMyunHt8bsy18+foHVjZUMzi0h7iYJ2QG64re1IZZFB1UQAVUQIS0wYgQZRxxBWmDUKDQWAxE2owoiqOuyQd20C9mSqqK2g1gWVZdfjhG+1rzKauouuo7ok8+SefIJ9H/tYdLqLryWiv2PI/PkEyi87Vqs0mK6M3kMXPNTOOEwwBaerc7jxopBfBbNAlHSTlwylskVrVwzoIwTjmzkhMOUZ9+AG++DzxbRKUcsEJg1MMB9e2bw8cAglL8A0//B/7MMeNUO3jobe2yM1KcZKGDvGsNbZ+NVO2DoAx/JCpGMtpExoATLGNL8ASW0RduQrDDgAxZdWbi2nsmD80mbv7YeASYNLgCU+WvrEWDKsALS5q+tR4BJgwsAZf7aegSYNLiAtAVr69lgXuVcqlrWcfzEk5ix9HUCloNnQSSpHP12gm++nySYUFzTitAHvjA0kuSm0nJib1dw8n+3UtssbOmbBwT4w1lh+r+XRdkzAdQDcdhKVthhM4k2uOEmePxxrOpaQlXVhHIi7ChR43Bb/wmc0VbOzMwiHigcCQJriidyhmWTTc8dHsjicquQqrOm4auyfZRuidDBh0klSYoOyCZab2FEKDwgm8mrE8xba8CwUVxDtGoGnfOY7w7F4FNq6tnFqmZOaiQ1mgt4fN3MqJ7HuvY6BKEl1U5OpB+fN65m38LR9IUAnsCIppmcfPZSbM0k7apzljK7aSYLZF9sQOmaoz47jfAFYT0BzxWwfGLrIixZmc26AW3E41CzKBsxPnNmRfBEEVFSnoAKGwy/7Up2qN0fpieWLFnCo48+iu/7nH/++YwfP56eyPCUHamN9ZpTPjtDMhplZ8g/fjjdafB9RPLJlwK60/DcCrpjAVMblVl5dJjaqFiAT/dKr72YHeZXF9ITp57exsezKwgEfHYbGwMfEPrOCDS7eKtjZFbGwQjJF8oIeIpahq+bN/MN5+4dwBgboRfeZHMiVDWkCPntnNTvU34xZSX7HnQgbSN+xdLELrz4zipeffdlZi+rJR5zwTZgGwjZdEYTbCRA1gFQdAkklsG668FtgYy96dC+AJK/g/7XQtGlUHMLtL7LRppg51M2Y8RQ1V7FtFnTuHDshZw67DQ2cKwAj618lDsW3oHru9jGQpXOKRjbJ1EdxE8K1rAYGHYO9RlVVMpDp52LZSwcY0h76LSf4fkeh9x7E59Xl4MYek5ZnuzPa+uS/OUbMe6cFWPlytWkfMjPyOPeA5VnVuTzdkUSbKEnFCXNWIIxBlC6pqRZRjDGAMo2CcxpCHNdXoLL96jk9rnFxD0hLWQrv9ijkmF5CeY0hMEoXVO6JcIGsViSyxvP5MySDzm2OptL6sfhpZIgfCleuvMJdqQB+/N/iq8+2bkDGVlcRbTJJXuvqRQN6Ud+/mCi6tOdda+/Q08IvbQywtDsAZRPPJFdp4xn4fQ/UVDZjmMp4ivbTRQ36VLSP4+bz9ybb777OrW/exa1LEwwiJ9IkFFcjLnuJ1y5SxkPfHwbigE7QGe+d2AGG3mZfPZinB8XraB8LXw4C+a05/KD9nHoYQaU7v2dbUpVLSdZthBxHNKSZQtJVS0nOGJP+sIyFu+vmcunFYsJ2gGMwK5FQ1nXWkd2KJOvSizl0zXBssMcNuEiULBsm1hKAeWrMu3y6WxFgVAAHItb73kZPB+E3rEMsY/m03bCz2kMhLklc9dYe7+93wn5XkJB+LcAvnhi7KDvXZBoK8sBnifN9ujgK1mZwuCSMGnZGYYa2wMj9ImyTaqACL2ndEuEzfhw0KAgaW+XJcDQLdco5x/bQMoofTKLDvtd/CjbogpZQZv3n7uXzJANynrCesrmBpbwVVmpk6iuW0ZLpmC0gMz6Gmwdyy4oIPRETk4Ora2tzJ8/nzTbthk8eDDPrVzJ3OY4f8ocwLBggNgyi+U/yyJziotT7BMe49Ey06FTgaFIYChuQz2Vv7iduvsfBNvCZEVAlZ1BUQYVD2B06S4sKF+FGINvDDUtjYgIXam/8V52BmMMzc3NDBkyhKXLljFuzGiWP/YhWU2LKZAmho3M5qcD/sXLa8azfO1IQl4rLTjc+PpIXm0Yy3UjHuK56BEkAgWgyheUbonQwfJYvGgcI3edzeraT6lrDROMHsiLsyeA7bGlRAoen5HkwmMDrKtTnn03BRbbzfah3RF+e0guz4+LwZO/AVV2JEfg3bWw9+oknrioKnl1KdrGKyh9IkDcz6DRLSTbaQRlK9XJAQhKd7572Xt0SUGETaxGFRD6zAo4IML/M0TooIAIfioFGWEyBg8kFAphDSzFW/o5iIAIX7X3xx3NjjSEzghJL8Xjn7yKEUPKdxGE9mQcRMgIhHA9j6SXIiuUQdxNAELnFLAh6XDwyHncdPTDhKxl/P71It5eMZSArWQEfBRQeiFl+O7+jZwyuY6Km8pofKkaKxIiMnEceUccSfYRRyDDhpLmqk9ZSy0rGipYVLOGedUrWVSzmhX1FVRFG0il4mzGCKR8eKOKNQsW8/2/fMj2mrluJFtSFcbllpMbbKcpEWFB00BElJ5ZRlr2E39lI9+ngzH0Wf9i1lO6JcIXlPpEFp+86iD4JBIWCFt5fM7f2JGCrDft8ulsRYFQAByLW+95GTwfhN5RJU0AN+XRlF2A99jfWbWkHDcUYdjMN2g+8kSSSQ8DqCpfpX8sa2VzimU7fL62irLGJoYUj0JbWvGBnJJR1NfM5YW583GHH00qlQSEXhM4fVfhlo/pcPpYA8J2EYE3F0WJBAyXH92PtEc+bOLNRVECltBnAslqIbrIYsAZcdLK/ydEslpA6BHLeFQ1FBGItJIc8QplwxZyugRI5RuEvlGBjJjw51OTvHJ0BGvRKBCl75aRVlUfp0siDCgZx5iRUYwRigpGU9WQAFW6k2x9j5bKhQz2h1IYUGrdBHXLn2Xg4DyqTB4XZR4u7+QWqWUMPbLuBjoTCYTwfCUtEgixpUgghOcraZFAiG0x6vHKrqeQ0jCnLp6OVhtwQVXJyjZkZAQoKSnB930E0BTYFRatbz3J22NPZNXU4znjxT9i2JTSLREUpS4W5pn5xew9toapWVE8z6PGqePp+cXUxcJg2ITSLRE2EqhoTXDj1YeR1pKKgxH+02VMaOULAihptsL4YVBWGsf26bEP2LlGXzmabVIFE6SDPx2E3nF99ttzOEsWruLic57knGM/gzigIIatKey9azk3nvUmV9//TQgnQZRNeZ7H2rWL+J9rS/jByCyq/+DSNs8nTSz6TBFKIjGGz0tSH0gxIjPGwxag/P92BlVMViYrr/k93z/7+wx95hm+d+qppJJJ7r7tNlaesIqHX3yYilN/ihtPIpZhK6ooXVMFRPDUxuCxuHUcS1t3pTRcxqS8T7l16VUYPGxx2dT73MxmlK0YlBzaUXrPRcgwPj/La2T3VTVc+cdm/vWZy6YiIbjkDIdDz9iL61ouYUbZ7iAuiMeW3j/rAnakwffS4Ti6loXyqTGMHz+RB395ET+98EJOsSxa6V7bzFl0RUkT+qJt5iy6oqQJfTFzXh0giABSBK1AZROKYhnBiNAX3274LV8qBVTJyXE44piTmPvCzcz7aDnH3HAvNkJvtfo2vabClgzC0JJs1lQ2sXZdM9gWaU3LahhcksOwkmxq69rwlW1QuiVCB98wpLiJw0oMBdHltFXO5ZiCLGJFjXy4sBSMsqnjC3M4sLyGj4cPZnogk0fmTOekPZ9gwvAfMWnOk2S3F+D7SYwJ0hJaTfaur/Pc2n68X1bPhJYm9gkWIPSAgFdrUXFWP/r/qY6sY9tJa30hwroLChFHwdCtWx6Mc+WPwzz+zwSrKjymfT/EEXvb3Pd0kuOW5MFRwyBsgyrdeuEd0hIe/0vAsuiginoe/yl8Fcb0q+PAoWvZa2AFmcEkCddmeEEjP9p9Dg99NpH6WBhV4auiqiSTSdra2giFQvhAAQ38oeA+9F9C2uR8n/zUUGLxElLJJPF4nMzMTFQVEeHrTAEVNlK2Fp5wJC0th/LBq9PYZ9Bd5D1pQOkTmx5TEqkwv3uoBigFlgHCzHcFlQhYAqJ0R0VoahpB3NqFrFAzJuTS3JSPOAEGsJTeEsBi5/HjKVpmziJ7vz1JLa0jIDkEphbRMvND/MwUCL2Ssmwuee8Bxh21LzJoCPgemzEWWlbGUQ8+QMqy2aEcYdkqjw6O0Bs2wjfCEeKxNg4Lh0krsi2+EY5Q63l0J+6yU1T7Ltvy2AyX8VMMF/4yyJ0PtjNpD4sHXmqnHg98esQSWFMbJ5b0CAcsuhN0DJYROjOnvI1tESnEm3gVadFYJlreRt8ooKxnUUMBb1DIG6sFVrdR9PfnmcjDHDAsxEEHjmXXg06hIHMPrOxSvmxNTQkuvngGaU1NCcDQOY+jjhoNCI8/vgCw2FLSD7Iz/KLqVLakCtce9gyBnBR+i4U1Oc4VM06hPeUgQjf+hw7tPl0SQAGxIaGgHjtUxOb2Bz7nwD1K+e6p53PU9T5vXH8Xxih9osrEYQH+9koLApx5VDao0icKVw8Psn+TR0FKSRk6OD7UO8LVw4OgfOkqQoauCcMCLtNW7kKaH/aptBxA6c6M+59hR9qLruWffCw5h3+Diqt/R92DTyCWRV8IQsyLUxjM49bdruGkAUfhNbdSf8d0xv7kDIzYpI09/NvU3TGdkWeewvP73c8zFf/kmgX/TV2inrAVRlF6RAW/3uC1W6jwH0mNcFpLHgdNdxGg1LeJG6VLQgdVcF3FdYEglN7RhiaFIgEc5QnJJtmWxfIyj0/npvjwkxSffZ5i3iKXVatWsYFt+I+TVOGSxcOYXl7M9IlL2Ts/yrcOXMVl9ynhoEMy6SIBC8+GGa+WcctJ74AFsxoyOevzUSyMZoDlsRXbgSO/A9/5CeTmQyoJXhIMO5AP6pIyw0lZg8ic8wyhmW9g3385teffA5XL8Xf7BikM4dlvgBg6c+sfzmJLBuWhf3zAJ5+vYtp5R7PLkGJ8VXpi2vf+Rtr9T77KjnTaMQeSFiwuwnaC2GKwXcVC2eGMsLSykaBdSln9amplJcvql/LuXMFYYzjYrGF8aCnNbhs5wWKWVK4CI/RaMAhnnQXLloExMHw4O4wFDSkgxRc8OGooHR5fDlh0zYeAk+T88dO5sPZW3CtbqVweAhsEpd9h7ZT/YBwXNl7PWx/tDwJYdKkmWkNXPANxN4zgkBZ341RHG7F8ekchy4YHdnM4vJ/B9dlIbCGxuJ3aG8rwGl2whB5JJKC8HDwPRKC0FGwbXBcqK0EVLAsSCb52RIglXF57ZxmlRVn87AdTSXvx9UVUVrcSS7ogwga5GqMzmlLcRnYehfJbInRQvnJljVn8Jxk//212qOws0hz1QeBvGbtxb96+JO9tRm//Ex2EPhs56z02kiBew3T8rBOx7AhGFF8Fz23HtD6DlX8WaIJtyoyQdtCUMnakt5fwBQFSPr+9aiJX//dCfF/ZyCiEUyj/pvybgvFJrCul5vFTCQ4sI2e/9wgNLEc9i21pbqpl+utvc/YPLmVwbgEgbLBy9WIe/8dfuOzCm+ktH8EX4YDmNUwr/4BhsQZSCL0x+BV2rAPocM4ZU1lZ1sD+U4ZQXtPC8OH9qGtsZ4+x/altijF0aCEIjBiYR1s8xS5DCijql01+fA04QaQgxOnDC0hTVf56C1vJPOggMg89FAkF2WBO4wKunX8Lb1S9R8A4GBF6ourex9iSuh5Z+0wic8o44svX0Pjqe4ht0SvGoksKfqaycHg9UjgCDS6BCgFj0Z1F+x5D5wQ/kaDovB8y+vdXk/bL3z/CHQ+9TjDg0CcKc/KgIQgnrYSbS1MUXPA9wqccizOgmF5TsIpsiifGGDBnPu0z3yfrsD0Ry4DSKxWxTLai4KthTUsOeSOSTJhdhudBaLc21qzOpbI9EyM+CF065ZRT2JEef/xxeqLfkINob1iAiBDOG0dPBTxlaWGQXx9exMp+QfAULIet2PSKqGL5HkZ9EkuDlNcPY8ng0cw/eBxLho6iOr+YpBNAVLF8D+P7BFJJekXBKrIpnhhjwJz5tM98n6zD9kQsA0qvmAylMx6GSdEVvPbJ5XyWNZK0Ka3LCPlJ3EwLg9KpOJ3ygJdm70a/jHYqW7NAlM2o0C/SzotzJuHTtYevP5Et/emJj/h0bhk4Qkl+Bn+/4UR66u830EeKYwwrRk4mzXgu280I89e28d3bLIL2AnzPwzMTaG5LgBF6QoQOvir7Dc0m7d2VzRgRELp13tAT2JQCxjKcVjeH3VvLuWXwway0cxBVemTpZ+xMgrIz/PBH+3H5T/dnZPlSGm67mY9SEe5zR/HMZ3Ukass45aQ9EBHSUimXJx7/hGdfmc+pJ+3OlVdfzTcrl7H7Q0/x8/0j3O8N5+//wxeUf1NIGkbltnLjpMWcPKQS9QUvbsg9OEWaFzcc3b+WYwbU8OSaUq6ZM4YlTVlgKyibu+ceNhIBEfB9Otg2fPQR/OUvdDj7bNhrL3BdOhgDqqDKRuedR094CSH3VzHyBR4tatcrawt5uTxDjIARuhQ8bH82UsCC1JsKCQMipOYuI3TeStLi9wzD2W0kqELQJ7CXgAcIX3h2MWmWoWsG8rOFc74TQgTyswWxwPLpliFCV9QHFyXDE4It4Pn8m4PBoWutpKUqa0jzkyniC1dQ8OOT6IpbXU9s3hLcuibECNty2YVT2ZFuuoYvhw/UAp8BI2D3Q4Qpuxh8F5T1xIVJYw17TRYWLqdnFEYPzOG2k3dhUzHXo7E9BeKSF8oih5555cr92dTZhw7l7EOH0lfya/pASZJJXkCprJzI6lV5HDD+UeqZQm9946Bv0xxrYkhGhD3GHsyOoaxM5fLM3+p4xt+Hhcl8EJ/eUHYOGyHpKX+LNVK+bxNXXeIwbnQGMBgvtA9LdBz/bHR4Yc0qPqqbRXuiCfBBLDAGCNAjqjTd9QcCYx4k97xLScybjT1oKJFDjyK5YhG90dSU4OKLZ5DW1JQADJ3zOOqo0YDw+OMLAIutBA07Q1ZWgG1xFX7zGh3CDmRnOWxLWxvdUoFjZypolA4iJG16JOAE+HIpDUmbv9eMpT4ZJ21BYCwNKRuEbgUG9Of/iqdnVJNK+Vx7/3LSkimfp2dUc9ZxA9kuCoSDuDM/xM6OIMZC2X62bZg8cQABEyZt/Ph8bNvQE+ecMZWVZQ3sP2UI5TUtDB/ej7rGdvYY25/aphhDhxaCwIiBebTFU+wypICiftnkx9eAE0QKQpw+vIA0VeWvt9Cl8tZadhswkhH5pagqtmWT9v0pRxB3k4SdIMYYtqX6hz/E5OaC79NBBFRBBHwfLAtEEBHUdUEVjAHfB8sCzwNjQBW/rY0NCm+9g00pYDkOrU88Smz2HIqvvx4/FAFVeuT4Y/myqOvSfNt0Gq75I87gAZTOeJrwwfuwQfETd5P91vepO/cK1gzfj/wbLiPnorMQ22ZLu4+Fq86GEw4DbOHZ6jxurBjEZ9EsEAXjs5Eos9syOXHJWCZXtHLNgDJOOLKREw5Tnn0DbvoLfLqQDrZPh1kDA9y3ZwYfDwzQwVfAgB1gR7FzMsmaPIbadeswGDbl45E1eQx2TibbEijoR2cUCIhwZGMDTlYWaUdaNtl5+agqQhfqa9mmpCH2UCHh79dhCl1QwTc2sYcKISlg2CYLny15lpL/yJ+ISYrhw4ZRV1eHiJBfUMDKlSvJf+ROUlOOxfJ8unL8/iPJywojwPBBBaQV5IRBYfigAtIKcsKgMHxQPmkFOWFQGD6ogLSCnDCqMGJwPk+xnuu7XPTUuZy6x/eZUDqRT8s/YvTKAN95LUFJjSFlh0mF6RNB+E5xExeY1Uy/uY545okccqTw0UcfsmrVKtKyMoTLz4lwzq45NN0doXKhQRwQi06dcdJv6ZTvw64CYgClx35/HJ2ZOXMmw4YN44DdhnDukBGcEx0EloDvgadE+uWRPXUK69atY9WqVeyzzz6ICJ3JE4tfRYo4JpiNq4ofBEMfxeg9Gx6cZXjoA5eJo8oxIsxe4oMxYLOZHGlnqLUOMHTOxwfeSU1B1OCLB3j0mQiPvvgRZxy7F6GgQ1o8keLRFz8CEfqqJRVjWes6RmX1py7RSkEggzE5A6lNtNCSaifbidBbPlBoxzku4xJMUMCPkzakUBgUvoT322bQ7IYQvgIqkLJAFYzQwQU/AXucUMXMp4ppqwmRFq0J8+GjmVi20rA6g/rVGahrcBOG/b9Xhh102WDJBTfwZYvH4lx80S8JOUHSfnXp5Tzx1BNEMjLozlPv1rIjHcV6Q54qY2cQEXaG/O+MYkdqeG4F3VHAEzim2ifNE1B6puTyn7PD/OpCeiQOe06I0iEB2PSMpyg+4rEVbfahOUliZRug4IECwtYUHzzlq9JuhMqAgCX0mWcIEOfo0nlcclALE/Y5iHn2r7l8Vgtv3r+EeSvfw0v54FhgCYRtULZJWS9zXyj5/9iDD8Aoy/uB49/f8753l8uGhBH2VFFAHCCKExdOHHVbtVqL1q2tdS9UWnG2bq1irQriwImgoIAyBJmGMJIACWTv3CU33vd9/l4oyEhIArkA/vl87gZ3T9hwB1ROAWGj+GHUKX4DnCpYfwcknQpdX4LQGigYA77ZtIqQi3oY2DiMXfEMJ3c6mQ7ejkSUBkoYu+IZMAUwsGmYGFC1LB40aC34VscSLjcRIQqEtRVlTFz2I6fuN4CVxflE7N8ujSmrlrG2ogwQmk1pHlrgprLWx/kp2WQWmCixuabDSp5b0JOXlnvAFHZk5PXvogEFtE+Np1/vduTkVZCZU4YAcXEe3n/mQiIuvn0iPn8QJUJa+wT275HC2rwKsnPLUSI0SuCmGd2YfPZqLtuvlB/yEogY1qkaQ8Fpn/YFoWUpWFds8UjxkYAGCYEIraVTio9Wpwwmr5rLKb2HMCDtAJYVZwNCUyiHVidi0Kf7obRP6oZ2HJLbdkDEBDSNiRsymBb16SdEFIYsEjtXc3vPHxG+YX5ZMe3CKcwjwP1WPhtMgxizDZqmCQbK2UxrCNucfmJ/nhjchrgnn6QwPQvljUEcBx0IkjrieJbeeSq35n7AqkWrwfSwQ5bmVzbjansx7sc0GF7NtXkecCdBjANhTUtwd+yDp2s/gqt/IsLTYyDujn3YWbZjc3KfIRzZbQCL8lZQ6q/kvP7DicipKGB3SbltPg3TgLA1DQi7yzP/uJptKTRvfzyHBUvXcNv1p9OjewccrWmK2y57izoaUIJjKFLE4iL/Gu/DcYMzFw267Q4KFwSZPJzNhv4L0AbbUkJWThkj/vQ2aMjMKQUl/DZowpr/0YDQKA1GCMIGuyS3OsiOaRJsN0Zae1xeF5vZDnUMxR5BFPOcC1jhfELtGoVXh/HrwzlCzqSHKJpCKcWECRN47LHHmDVrFhHHHHMMY8eO5YgjjmCtHeK8qrU8ENuBCzzJ+OMcalcZxHS3CWQZIGyvZip4jqDo5Y/IG/0UdpUP5Y0BrUFrosI0mbNkLhGPXXcfF993NYFwCAwTbIsYTwyWCJZtsy3xuGlR1dRxeWLwxHgJhi3ate9ATSBAm7ZtqU4bzP6lEznGO5vBfWtZUZzDx/lDya5OpYcrlwO8Vbx48pcYqi0fZt4IhgJts1OUJjsviQ4pKSzxH0F5SVt6pWrSg3HgsqhPTKxw9oN+0lIVMXFQ6wfCcNj+Lh49Yh2nlttY8hiOCDs0ahQRHluTkerib6ckkdXOBbYGw0WLElhWAqccaDOvfymn/Xc0NUDJieW0OTpM/D/YSZqAE8PXpefyxy5PsBWB/GBXFlQdiyEWjZn4bS7RIL9gH4LBMJuENQTLK1DBMMHKKggEcQdC2OWVWCGLgNY0nSIaOhn5tAZHa8prfaA1aE0doU6FFQKtQSlK/ZUgQoNCXk7ou4zHzvgvXmM1Y6a2Z0ZWT9ymJs7toAFN86W1C/PM4Rnk374eMXrQ7d6rMU44jvK0FBZXF5GR/zNLf/6YjKK1ZJVuoMBXRjgcAO0AAqJAKRAFhovNTIHCAHyxAUqCtJRjP3+YbWmtmHrao5zY9Wd+Ku3FKZPvQ8ShaS4lQnVszx5DNKFgiDpCvaoNN9HwzD+uZlsKzdsfz2HB0jXcdv3p9OjeAUdrmuK2y94iIqhMNhIsS/NWxyPIH9qOdDsO21bsP6Q/B3TrQc0KG1O5AM3u9P7KSrZjuAhUx1FdFOCQ1HSqPV6U0vhrlrGurJbY7ofwzvIKcCx2VlVA86+TFAJUBTQdEoRdpYCOSSbfrfAR0THJRNE0jmXREG1BuMym5GshIlxmYwcFMWmcNkCD02MWob5fgxGkOmAihNgV8bXCCxeFefHCMN4qD1poEUNHTWdHNOAxvUQErfkIGhAaE6Y9SUlTGLw2RK0vmePsAlzJQeYuqWTUQ1+wLKMAXAnCLlIi/OO064lQImxLifCP064nQomwQ1rR4+efcQw3gTyDE0wDweG9mTPxa43SmocefpjDDj+c2qoqMv52J8XvfoDLFUe3ZSsxkgMYIY1Wwk5Riq9WpHL4wWksmj0Hh1/EdOOr5QVganaZEqrsAHWU8FvQ+18raMiDCA/QPOZD1LEsm2hYVbKKqDJcZCz9jn/f9hndUn2syExBiUaEX2hE2EhA+NWVJy8kZMHb3w1kTUEbttS/r5txF3ekZ7pJ9n9CRIhBC9AEbUVebze2UhSFXIgDGLQowSA0cx7x99yF/7l/EZwylaTnn0F16ohTVExo7iIEg93KMLB+XomVu564q66g9vPJ6DC/0IjLTeCzyQSmfoNT6QPTZKdpjZEQT96/32HIuvXMnPo1Z154AaVFRXw16ROOz8nh0w9eJ/Cnv1Cbm4+4XTSXrQ2Gpswko2oA3WLX0C8xnc/yzmNDTVe0Bi3CtrpSTlNomkcDYS0M9Ab5W2wxGZNKOedFP2VVmi0N7C2M+Wsbcg68lPPyrqU01AYkTEO6JhQTDQU0rKC8nHvve5TzzzuXrn+9l8cmTGR1cTFN4WrbhmhwtW1DNAy7/CvqaH4lbKTZaS6Xh1anTIo3pJO74hOoEbr0HMbCOdNJbpvGfvsfSGO0FoYnlHBZai5+2yDistRcTkwoQWuhcYptJbbx4k1JJGdRHnjcoDV1XAY5edX0ObAziW2qqKiopUWYDp/+0JEpC85kSM8CDHF4ck0agVob3A7b6hXr4bzkOLp5PYwYeBbjl73B67PH8eBxJxI7cAq+ef3w2AY1pibm4O+xao5hna89N/XqxHV9upNR5SNNNE2iAAGznU14g0GE2c4GARRN9o9xtfxhpIfJz8czblKQEa8nwciB0C0BghZRowRdWkbNmGeJ/csNgFAz5ll0aRkoYfcTRuyXiRKNo4UIy1Ec3SOH7m0quOerE/GHXQi7h4jQrVs3srOzCYVC1AaDxFWWMKRXFoE2HhCILQmgKwupSozHEPB4PHTt2hURYUdGDjF54JpEPlPduWZZZ2odBU6Y7m07cvPRZ5EcE49GsyN//MdkWoqmfunLV/DyZ+dx9KAMvhETHdLsLJNm0WAqQAMGEZpNNE1iwyEDPiavfS9WZw8Dn6ZP39mkdlxHeIObPY0AlV/MIfmmXsTu1x2npoaQrqBiyhzkQkDTLBohLlTDqM/+SbdP3gbDZCu2Rc7Iv1IaqkGbJi1O0WwaiFNCrXY41O3htWAVESNiY6nVDrFK0ICwZzEUPHFXArMXhhk80OS5+xKY/n2I7Byb5lBKmLq0nOEHJXPigDY0ZvKSMixbYxrCtsbNLqRxio18tBwNaDYyKCKFb0jlm2wgu4h24zIZKP/lmO4GJwzrySa+Ox4g+hSTJq1mI0XDDCZMyGAjg/rce9g9tKTT2OilOaexHS3ceMRUEtFEBIMmr/54Er5ALAiNeJM6wo4JvxJanHY0C9OLqQks4tQR13DNyyY1gTAIzRfWXPO7ZGy3EHH12UkQDrFTNKyIUxx/WCyPZgUZUmUT8WOiwX29PayIU6DZw2jWhNxkBz1EiGhA0xQJwTCtpfjVt8l7+Ems0nJUrJedYWkbW9tc2+sS7tr/euLNWMomTGL9naMJ5RVQ8PTLJA4/moiq6d8T2pBPwVMv0eUf93Pexedwaodj+fvKl3h9zXiUGDSZ0qAAYa8VVJpUDCICStNsGnSNgIDDL8JCCA0C+/UwOLCPyZUXeXE0+Ksclq+xGXpKKREXf9WLlpVNxM2Pf05UGTbLa7wMnT2IG7vn8eTAbF665Quuf2oEaAOUIi4+lrGjJtGzRzE3LenF8+s6gdJg2Gxn4BC4+g7ouT+EQxAO0fIcwnTAMdtQZv4JXVqI3f80wt0Oxf33K2n3ys3U9DyYwHVPoZSgb5mGUL+bsmawFdvCGHk2CzO6smBxNlecNZhBs77ALioGUTTmNjZaEuxKNFg+H8plQbwNphAVIuQVV7IuN5645GUkJnhZl7OeuJRFuFUSczISsR2Fx4hhXUFn8ourwG2w01JTQSmizoAJWWxkUD8NaDih+/c83uYBuryVTvG0WLSKISKxRwDz+gSeavc3Xky/mlDYDYpG2Rg0xAI0ik00CguDZtHgNeC1gS7O7qiwHDYTUwhlBSh+KBerOIwYQpOlp0OPHtQxTVi1Crp1g7w82G8/sCzqOA57JCWUVAYoqahlaUYBdQwFIiDCljQNERCiQ0CHhdAGoY5i9zMUe5Nq5SYa5ng6MzrhOHLMNhAOQ7iGltD29HH8SmPbMRy131NkrG9Htd9LQlwt/boUM3tVbwzjZUBoiu9em0BLkvfYmkvxxEsrcRzNdjTbUw4oh2B+J4omXIKny3qSjp7JjrRv14njjjyFl/79KP0POIyjjzyFal8ls2Z/RUHRBi48948YhkFzWKJItIP8oWARFxctw+3YhJVBc6l4omLGnCwOOiCNOx7/kpKqWs4ZfgCdOiZx0yOfEwhaXDpyEGjNM2/8gAlcc/FgFi7N5fvvF5AY4+H8i07iy+krmL5gLSZCfbxHHsEm5aEKnl75Gi9nvk3ADuI1YtBomirrxkfYlmMF6fHYX4k/9CB8P6WTeeMDKNNDi9KgbBB+oWkybdk0yLLRtsMmIUdj2zY1tmJnlXvggcGax+cJcYZDcM4SlBhorfH07kaj3PxKQXViAT0H2bi6ptLJqSYvZQMkACagaTJHmdRLaxYW9mJCmo/BHb8nLCafBI9gYUFPMARHTHZk/PjxtKQJEyYQceGFF9IwARzCgTIEjRmTAihA05hPD0zkqeNSqXUpsDUtpTyxDem9DmRx34NZ2X0/Ctt2IORyI1pjODbKcXCHQzSbm18pqE4soOcgG1fXVDo51eSlbIAEwAQ0TadpkCUGprY5qjKdCEsMLDFA03yO4qDuuRzScy2vfnMiuMIgmjpaIOTizEMXsWhND+av6w7Koaks22ETR2scrVEitAZlW7QkLVBVawMaECAAIjSXiJBXGSJCRGiqwx68ji0ZCt6eX8qy9zdweGUOH3Q6jLMuP47OCSaOplH/nvIA0eQPx9Gyiol49YKeFNz/IAviU/lnYH8+/KmYYOU6cClwKbbjNgk5mv+8M5fxH/7EJecfxiMPPsDQlcvo++Z43uFXtlJ0Sg0wpt9yLu+9HuWAthUoUGhwqCNufiFoR7hg/zzO75fHO9lduGv5gdhKsZXrrmMz24aKCkhJYbO2beG116gzYgScdx6blZZCcjIYBptdfz2NcsBMc3B1dYjob4dkYp8NPL+qjR6TkSLlIQOX0tQn+ePX2JGKK+4EZxUR7uGHk/yfJ9gheZ2Ii77uRENEhPJKh+TDFRF3/uzQJlehtaZhRWyk2REBirs7dF4kgACaJlGKCOV2U/HRVNrdeBnunp2pT+mbH2EVlyMuk8bEHfgFey0bKATxQ+KhgqlA8yutwWVCcrwggKZxLq15etlzmHcGKXVA2MgjQttQGI3G43ZTpjVNccUL89kjGBb3zL8YDIeI2+b+EUyb5mrbNo22pNFcNgIoGiSQHmwPaBANKOqnsBGiTQEm8IOvksmdSrnq8URGnnU8AddQvqvpwecltUzOX8mKii9xrBoQAWWAMgCDZnNsEn9/PZ6BhxNKX0z1B28TM3gYKEXzKSZNWs1GioYZTJiQwUYGrUlrGuV1sZnWtIiQyS+EvUHIEdbVeBDRRPhqPNiO4v+b4w9ry8D9EhkzLpuI1+7pT9sEk5birrXw1FaildBUV39yKQ3RGkxDEQzbRExabmAtcxChUTPmZHHQAWnc8fiXlFTVcs7wA+jUMYmbHvmcQNDi0pGDQGueeeMHTOCaiwezcGku33+/gMQYD+dfdBJfTl/B9AVrMRE2ueSSS9iWiCCAEkGzke04GEohCBqN4zhoGlb9wQdEwxlfaLYUthwuGNGXa3v3wlqeTu4BQ/nTi0vA0exJar+dS8l1dxHOWU/b0XeSdOvViGmyLe8JR9Il/Rsqn32DsvvHUv3au6S+PAbvCUeypbnvgemCySVtuDe3G4t8CSAalEO9RINoFvnjOW/lgRyyoZpHu+Rw7qnlnDUcXAdTZ2EnF88fEc+CLm7qOERV979dQ/nM+dg+P4JBhMbGjI+n+9+uoTHGhy/REHGZDB//KUZ+NRHD/3wF5sVno8MWDTr+d+yQ0tj5Jr5nO2B0CBNhF7ogpEBpGvNTfFe25XhcyM2vUOvzscHrJRwOgwimaRII1LIhLh6d3AcVDLMdXxYRv7//I9xxHiJC/iAR7jgPESF/kAh3nIeIkD9IhDvOQ0TIHyTCHechIuQPsokSRVWgkhdmjsXUXdFVl2Prvjx3ioOjaL5nTyYi1WXzYOc8uvy8nmvHVpJTEs/HH13FiScO56ijhrFmzRoO7W/y9E0JHJSZyIb7Pdg1IG52aOLP5UST4ziMGzeOqVOn0qdPHx599FGe+9vZ/OnhD6j2B4lIiPPw9F3nEN8mnpeffJkff/yRFStWcNVVV6GUYkvD3fHcF9uB9mIS0prdxgSNZkm2po6bei23ulFVezpImB3R2GixaTpFvUzF9DmruOCv4xh18TFEvDJ+FtPnrALTxc5KdHn5U78zCWBz9Q9Pk+yK4cOj76LcqsFi5wgQsGzuqRyHFjeg2UiQUIgANsLu0Se+hqWXzUZE0xaLTVQs9EwK0PWO9WxJAM2vBNCAKIfEJJtN+r32CC2q/3gi5hetpCGWFebYK86i45H7YyhF3759WVKxBtPvojFxtiYaKsMOexMdtmltGmgf1KQFNBG2gGYPJoBNs5kDk4jhF4bQMGEjTYNsjTkwCd5ntxD+R7NTvI7Fqb0K+ePRClfn4byXmcYfxuaxeu0UcGxwm2AoMBSbaRoVdzh0vBviToCqz2Dt78GqAGEjpSBmAHWUAhwQoHIK+OdBl+eg1+fg/xYKxgALiKoHx5nUy7aJ73cQHc7oSPinpUR0OGwgY+cOxJeRDoZBfc5nIzE0lUsS2EyDS9mQTMsTsLTDd9kryCjKI6usmIjebdtR6KvC0g4IO8fQPJMez1uqN8d61xNwDO75sTshbYJBo/KKqtGA2zTweEw6tU8gtU0s3/24FkMJCfEhHO0QUVBcTZUviMdtEut10yUtiaTEGGb+uA7TVDRKNDk1bo77cH/+PKCIE7tUE/FBZhteXNaekrAJomlxil+E2UhoVZqosxRgAjb/I1SEq7jtm3/RvU0XxGWiHZvNDLAU9Xr5ylha1D9pEqVcJLdNo7li+vYlGjq43PRZF0/F7YWIV9O/nQfv5TEcdNXxvO04mAjNMeyYJ6hj2cTHe3no+qO4LGcppdc/QZWtUd4YdCiMOy6W+If+zPNHap5e+DQh2wbTQ/M50DEGOsWABhwHNM1WGqygXh4DufUVrCmvERFz6rWUeQwIVrAztNYoUSR64hjQsS/VgRr2BLWWw45ptqdpzM2Pf0403JQ1g63YFsbIs1mY0ZUFi7O54qzBDJr1BXZRMYiiMbfxP1rj7tWFtndeg9mxHUf/+wPGTJt/w2ML/5E0q/MJ13Hc235m/J46c2/iFzb1EeHnVYXUUcJvhhJmrw9QRwlNpYVdJzRK+IXWbOLU1FL1xUwiEs84FhXrZU/wu2M78kZoBN8vKcC24YRDO3LusA40leM43HvvveTk5BAhIsydO5eTTz4Zx3GICGnNff4C5odreSiuA+IIoUJFcL2BGGyn+scYcm4eSWBlFiouFhXjAa2JJlEG36cv4MPvPuf848/k0yffY+y7L5BduIH9O/egV1o3Xvnsv7Sm0htHaXecSY2vhuT2iZTkluE6+Dyh4yEsaHcZTxSl0G7eaI5MK+S0vp+wcr3QMUVTG1CEKhxWV6XgtSupCcYTNt3sLNtw+H5ZV9DdQGlWrhZwW6DZnoJ5q23QGjTgQEqi4m9XePjzGR7iPAOBgbhoglGjiPjwQC9jjkuk1iVga6JCoDwI32c5hIb6WPv1O1y7UojtFMb7qIOnmp1miM2nxZfT0b2eU1I/xK2CRGwI9ODZnMcoD6diiEWjTMU+0TP+sSvZRIuQXF7E2o9fxLbbE47pSP6UNxnc5XA+ePJaxLFpzPknPE3Ek7Xv0JL+wkamSatql5RCamwStnbQWuNoDWgSYmIpqCqloKqUHZnx57tpG7uSR75qz8zsnrhNTZzbQQOanXfvgFwy0tNYfskxrGhjkFG+mszPplFQWUI4XAvaAQREgVIgCgwXjVpaAdMKIOzQkmwtbEcLWlNHa3C0AMJvmRAdN2XNYCu2hTHybBZmdGXB4myuOGswg2Z9gV1UDKJozG1s9Gbm+2yi0Xg3GGw46Wymr4tH25rr+ySw37SJDK4NIwiN+T0bXfL2aqLBbQjbszF7HEO4YBnf5xbSu+cc3IbJ18uDmG16kdDjMNA2GMJO0dArQeibRB3HAc2uc5nCsvUB3p5dDgKDunpxmYLWNCrlqMNoiNbg7WxTNl0REd/XwYg1EKFh32UQ4bTNItxvEk5cMWK7wTERdt0LF4V54cIQ8bWCFhBaRrkvRKN0kDoiNFVcwkF0OOpM0g7+kqC/FE9CPO/MGMRdz35FWbkfcRmApqk0G11yySVsS0SI0FpTHxEhQmtNQ+ygYGNwwIYMRGvCyiRswzFi0L6wind0kGyEaR99Tr+wkDFmDFWzZqHcXsIWdCtaQ/fCbCzDBM3OMzSPvrMeb1wBGgj4LfAoWo7wm2LQIIVmZz3/8p20pDNHfk4dIbpEI+Lm7tfPwNGgxEEpUKJRykEJKOWglEaURolGiYMoiPcGSYmvZY1uyyYX9k3g771SUO9pyiwbMWkxAtSKQVF7A8MWLJ8LcQABNC1I0EXF+J98ljbj36V24ofgD+E+6Th8jz6OLi4B3Oxujr+G8utuIfW9caS+Nw7fv/+LGIKVk4e1YhUoBSLsMq1RcbGUfvs9bTfkMfuDjzhj1B/JzFjBzwsXMezSC/ny3fEkP/g05XMWoGK9NIdGcKswLgnzc+Ug0qsOJuLnyoMxxKY+muhQAlcnV3JOeRFPPFbBB9NDbMk04JqRJldd149n7Nt5f+1wEAckzA5pomL8vxT1E0ATDj+Bq/JjlDI4fP+VjP+XAgTQ1OfimxwiYrt3Jhpiu3cmGj547nha0u9OYDfSuL1tcRtJJLTvR7jaT9BxERsbQ1O5xeHxLis5YeVQIr7bfy5ucQChMU/457Idn8bO0ZxmKHSYrQhgfT6PEUpAhG3dyU5yOQSdILNWp4AGjBC4hfq4TBcvDegLAoP3G8pJ3UdSVfkNReuW0bPPXygu/5Si5TGY3avZr/edZGW/wQhGcNWAvxAxJCWZISlJNIkDru4Wjl+Re25HIto/Xoaru4W1wQDFDimBK8/2cOmpLt6bHGLEi16cswdA70QI2hCwiCoRnJJSMA1qX3yTCHvNOpySUlCK3UmJZlVxCjPWdOfkvtmELIMIAQzlsDivI9VBD4ZyaMgll1xCtLVv356qqipSU1NZn5dHTUkhutqNyxI0gl3jQRkmqampdOmURklJCe3bt6chybHCQ5fGMPSkVG7P6c2MsiQQG7TFuQcP4/5hv+frz8uZkVmGUsLu9O4n/2H0j6Mw0xy+yYgBYZeYZI4WWpXCHVtNj25L6JC6ighvbC2YUKo70BgBoZVZpWXkP/EGnq6dQRkEc3Jx+X0g7BzTpHjabFx/f560e29lS/l/f57iabNR3hh2KHO00EoEOMUbixvItiy+rKkhYognhl6mSQgQdizxYoRWZjsw/vMAxx/ppqDU4ZV3ahl2uJtTj3EzZVaI5jAN4aVv8ijzW/Tu4MUXsOmW6iE1wUV8jMEmq/JrmbuqCkMJ9XEZiqZTNN2rwi4oBqZpmLYWHlrLZqFPJhMdfxWi4Pv8E2hZb1PHCLMdLYiwmQCGYYFhgWia5LzXhGjIukFoompg/jKYP4ldF9Ace4CHOgENLnaehhVxit8d7MUbpk6tC9CAZo+k+YVoIjRNp4VW0+7ay4kbeiiFT75E+adTEKVorkOTD2LswHs4IKE3geWrWHnzPVTPnIsRF4uRmIBdWUXZ+58SIS4TIzEBu6qa7CtupPi1/9L9X48z+qA7uKzbudy59HHymMfe6JCSdCEKvD0KhSiYuDKFlpVNxEfT0ok60WBonl/XiY8KUxl3/Eoyj3iRj2b0JeLcY1ezJtam99QhbAi4wXBo0NIfhVsvIno0thGPz30VNYHjSPzyLcL+ryA2Ee+sCWCaqHCQ+PSZhJ67DrodgCA0pPo/77AlHQ6R2LMnDm5ACAdD+D+cRCh7DaIMmsq2LKKh+y3XC63BpXjkjfm8M/ooyqqzOKTbCFyhc4iJ8VDZsRyfvYbY2F6M/c98MBUNERC2VFkJycnssocQoqBLch6P9n2UU2dMouQ/JkX+OCLcXovUKy2mHHsO9626n/VL0sAAFE1yS9diGqIN6Otth63jiejrDXB7t2LEpkE3szW3ghf6u7iok8Jy2EwMIbwuSNGDOYTzQogpNIvWYNtspjV1tAbLAtum1WWOFn5rFHuMUcVzaEmvEF3dT3yKaLg27xuBb2hptSGbrTi1FJa58dUorh3+Pa9/O5jCMjehcC3YmqZ68KWjaVmTqbPmfOF/Kth5wfVQNJdGHTl4OIcOPIol6fP4dtbneDxehhx2HH16HohpumgqDdiiGOAv5I7c2QzyFxAWA1sUO0UTFS+NPkfYwjPT2MrD37CVO6awlWkf301T2Nrmk/VTeejnp8isXovXjMGtXGg0zaFiPGwnAMo0qGMYKNODivHQJD42emGGsANfAV8RcR0tSYTNhBbgwJddYVWS5vR8m/DCDBJOORpP7240Re6byfxK003yEeWmp2QR0TM9jxInFvACQuMqiLhrwzTqI2wUXuMixumIIQbd8HOH8R0Rmvr9neiaOHEi0fDo3BXCXFrcfuVThJ+mwE+0qNw3k/mVppvkI8pNT8kiomd6HiVOLOAFhMZVELFfWZ7QGpTD/JxuzF/bgxP6p7M8L42i6gQi2idUc2CnfF799nhQDiiH1vbyCZ2FaMgcLewGAmSVBohQQpNdf2Q7trUyzw+OAwgx4nDVYSn0auumKf5MdJ330au0rFOIcB86UNiBiy54nM0uOIIthYC3xsBbY9iOLcKhxZVM+3oesV87ZIaTcKc5RITyFRHuNIeIUL4iwp3mEBHKVxznqmQ68ygs9mCLsB3bhk8/hbfegmefhR49qGNZbGZZbLZ2Ldx6K1x1FZx1FhgGzaUt6tgILtHc0a9UjmlXo29b3IG5JV4xlUZoHtGaTURrmur9VcnskACF/KqAJtkPn9CY6ew8JYTzS8gZ9SDdXh+Nu1sam2lN+YTJFD75JmIaNMVHsz9gr+aAroL1yzVVPmiTBI5DHSVQEYSsWI3uDlQDtUAt9TPc3JbxJkMWv0WluADN1oSIMJqmWpRdQVRkjhb2IkOcMpQFBppdYSMc7pTxNhsdWr5KqM8MYAY7rTgY5B13mD63D+HJPx3DEtpxyZoivivIoMA/H5wwKAVigOFilykD/zefEvx5AcEl83EqKyh56FZCK35GXC4a91chGp46RIiCwsI/C3uRac99JuwGSjSbiIAt7F7XfiXU40O+QbiPnWVrGtSzcyy9gAf+2JuIg/skoAFb06hDStKFKHg//T2i4aXR5whbeGYaW3n4G7ZyxxS2Mu3ju6nP+PHjiQYhOuYtzGUrYYfD+rVDtAMI1VU1zFuYC45mT2DnF1Fyy0P4Jk4i/oJz6PTtBIxOHdgRMU2S//InEi4dScmtD5M3/HziLziH1OceZBPXwQh1yoFymmsRcAbbuyojXcig1bQ59jD6vzuWrLufoyYrh4i43t3oPeYW2hx7GI05+r8XUD9NO28HUlQcdwc7EDFGFVI6/guKawsBYacpwBLsXDd1FKA0TXFOn1FsRwNlDggQYmsCBIEuR4GwvcXfUefHByXE1kJsLcTWQmwtRD3EQnQMrtozcHwngRODP8YGYZd8kJbBl28Wc8f4AKEwpKZ6+PTTT1i/Pg/D0Nx8hZe7Tkoi8FYcOfMMxAQxadznVwpRpJSiuLiYLl26UFhYyJQpU7j4tFPp3zeNyT+sJOK0YfvTv09Hpk6dSlVVFQcddBClpaUopdjW9JBPpod8tLjM0UIUFJ9zohTT8kb5s6iXFhBNaGImkz6cSEQ7RzPKZYAWEE19XmGj2qeeo36a9hqyakuYGtuOlf4CcmeNJs2dhIOmVmsQoSGvHi7CXiTmDEfAR/0swGJnLDnjOqJhyIRRNEhAudyYnQ0irIolOB+/B5pGafYuVy+eI0RB1tVThd3EFvYMU88T6jFxGsgzNGANdcI06JD7lggt5X32WjeepCkO7M+fpxjk5BeDLgBTgVsBip3VZwHC+TTMAYZQvwrgSlrV8EWK+uiARdyJJxL46AuqHxhDRMIjd3N8pxPxv/UzEqPYkaNXLhHqtQzmf4xme/cB97EzhJpQkC8zFnHWgYdyat/+RMzLyeTLjEXUhIIgwg49c5KwA2XAJJpPKSHCsh1y8qtokxRD5royOndIpLDEh1ICCBFKCYYSLMshN7+StkleCkp8pLVPoKTcj4jQKNGUWAaPzO/MI/P5lemAaBqVOVrYizyS34+WlcGWHIHTVjn0LtMYmq04uhxbl3KkMhB+ZQvsV6JxhO3MOdzF3qTtRRcJUaCVpnJpHCIaHYSkywtIuSqdzqGZgLCzhgzqwXNn9aXzi69ROGsRyhuDGKBrAyQPHkT+I5dxVfWXzJv7E7hiQBk0yQ3ThCg4bPqZNEgppIdJhM64DdIdGjVmgbANC+j+WBq75O6PhXp8yGcId7Kn+WhaOtFQ/Z932JIOh0js2RMHNyCEgyH8H04ilL0GUQbNkXj1ucRdcCoRRscUBiy8lYcK5l8+Rjtx36QN+wPHjKtk1lVsJ/1hIQrMg4uEaMgcLURB36INwrYeYbdwqmsoHPMSaIg/9nBUrJfWkj/mn9RPIwjnKmFwaQARTefFXop/0oAGhKb46aef2GTAgAF4vV7mzZvHtj4JVbLEruX5+M70qnVTi0bYXuIJxwmbhGg1WhlcM+YWqmp8XHTiSIY/eQwVvkq+mjed25+9l7DWiAitJfTDZyKXQWwi6GRQsyHGTqPf6d0J1QSwYw7i32W3009V0rE6jyo7gZrieGrsOCoCQqLXJK3aR4q7AivosJL/yRwtRJMCxMRUivOH2jx6oUmfLgJWEII02wNzlwpziT4FX2XBytIQBw0Ic2UFdHldE7OWXSJoLO3ihdwH+KbsXHp5M/DZiSytPoJyKwVTLPbZ/c47fiBb0sEwPz34HAmHnUXcQQPI+eeTDDxvFEf07EtzjAwvpCX9hY2entWdlrWOHTFF0TYuCUdrtNZorXFw6NehJ71S/Hy0eDqI0JDjzvhBqFNCS7rx0VeEaPgqT2g1mq1p9hiZo4UoSFmfKURB9X/eYUs6HCKxZ08c3IAQDobwfziJUPYaRBk01Xlly9iS1hr14QoGjriUkOni2I/+i13tQ4miKX7PRuMXFNN6NMoTR5dBl3Biqk3W4tkY2uTccwcxozoBnwiiNbtCAMehRWkN89fUohSIhvlrajEUTTL46zfYEe2ACHW0BlHsmOu/RFSPv02IgqffWiy8BUFaltAEIuyM+OSjIfloJFDLgy/M55k35mE5FmIqdtb48eOJhkG3+ojQbCRspIH+wIUiVDk2Afs5aqc+R+/BIEMFCLOJBoT/GctGmaOFnVBLIzJHC/tw/cyBtKylRJxx9jFExasI0ZA5Wvif1Vmwmpbx/upqeX91NdHgIKSYQQb/VEMwpTMxVjnjXIAmCtzUvjsRa3kGMaefgZ2fT8XlVxFe/DOCh8YcB0KUictFYOq3FBxxPLHnno3niMEEvv0Oa9VqMAxalNaIx40vax2uS29g1jtvcOHo+5n1zTTy169n2Gmn8sHEiQyc0IX89z5kk3euHyk0wQT2DC+kFOCbUcL5T/rILXLYUtcO8Pfb4nEdfRYX5d1CTqAzSIjd6aLfKRomIArsLCKGDjZA8z9CfS6+ySFi7dsfEA1r3/6AaBhyYArRkHPGbKG1OTZJbdNIOv4GfOuyKU9fRJ9hx9IcGqGdGSJe2USkmiE0gtC4M8I5NMihYQ71upP/yRwtRJMIEYZh8M8/vkqgai3vL56CN9CGWPMLko+yCFcLXxVcxSjfw3y0n8nWhCYRcGqE/BtT0WHqFNyUisQ7IDTqy+fj+Wx6iNOe92CdeRCckwQhBwIWrUYpnIJinA351DFMUIr6HFq+SmhFGnhn0QCUaI7vtRatBctRrChoz5RVfRDR7Mj48eOJNr/fj9aa+Ph4bMui02FD0C9NxrEdDCUYbjcktaGoopL4+HiKi4vx+/3Ex8ezrWH9DJ74UzxL23ZlxPJuVIRM0GHaxCbwyCmXMThmMDffMZfv5+aCsNtdds6VQgsy2U20DTGeWiK0DWKwxxJA1/gJrFzFJsKuUd4YCsa+QMLxRxE/bAgRvh9+pGDsCyhvDHsaAcJAL9PFWbFxRPQyXYTRCHuuuYvCzF0UZpPs3FqGHe7CMMC2aTIlsKEsyNjPcjEUOA7EuBV3j+zGiEFtibAdzWvT8qnwW5iG8JvgdrE3OaHLVFrSY+zTLFpzQHcPdRzNLtOAhlqDjRz22UW16SspfXMCvnkLERF2xqfD/g2BILl3PkLxC2+CoTAS4kFr0BpEELeLzbQGEYyEePzzF7F88Km0+/NV7Df6Lj4Z9jqKf7NPKzA00eA2DVqN4ZAXNjnlh4Fc3KmIly/+iYjrFvdm/IYOYNhgOOw2AlprAmuOJP6H70jIeAzTV0bwmPMJXPoY4SXT8BStAxFwxeBeswQyF4LLQ4M8brYkSsAw2EwEcbsRjweU4v8NUawpqOCPj//IkzcPJTahgjL/GiodTXxcIvHB/tzwj7lk5ZeDaQCa34KZnhOw76kmLzMGTBA07U6qYf0VB3Fz+SN8++PRIIBBs9zUtYQGGbA+LpEy4onYPy7IiV1LwKZBN/MrE3jmQJM/dFVYDr8yhHB+iKKHcgjnBBFT2GUi1BFhn9+mm0pm05JeIboqqwPs1ZQmIz8VlOZfU4fiKE1GfiooTXM88vIwWtZkdhePJ4Yhhx7H4EOORURoLlsEt+NwadES/pj/Ewl2iJAY/H+1oiqT+5eN5Yu8aXiUm1gzBk3L0uyzmQOZ8Zo3BrkZffsVeN1emirn1WRaVgURD2yYyo4I4GAAGoWDZsf+zj6tIefVZFpWBa1ONKBJjK1BASMGLAOBxWt6kBhbA2gQzT6NG3t2b6GV2I5mMw2W47Cn8Ifj2JtogUSfTc13JjWAtoTEI8NEVM9xEZF4ZJiI6jkuIhKPDBNRPceFz9REJBo2WthebS1MmgSLF8PMmdCjBzs0YwYsXgwffwwnnwxxcewKDdiOMCS1ViYfm6MfW95Ov7A6WYKOYAhNp0AlOETYiqYzNHsrcZn4Zi4g8+RraHPRaXj798X21VA99Qcqv5wJtgNKaAq36ea3YO5ih0++trniXAPDpI5lwadf2/y0xIFOQAxQDiwBNFtTBkcWL+GW5W8T8MQhtIxFY0+iJbmeZq90U9aXQgt5i+h74PD2HPyXC/khvorHZ8+nJlAB4oAYIAoMFy1KBGtdFuE1qxHTRLyx1Hz7FSICSrHPPr9lZ9w4n8aYhhBh2ZrdzWN4aEl+guyzBVOxFa1RSthEiSCmQjuaPUFu/5Mx2ibT6duP8B4/lOYwOnWgw/svkvjdFZRc+zdy+5/Cb1G7s46n7QlHULNiDRGxB/TEiPfSJErTkIBVwyqnhFvarSOiKgBxKhYUv9DsMkWzGU6IeommjrA9AbSAZjs20aUDA3AqLwCrI4gFYiH8QrNLbr8hj4UrbTYpKSnh9X+P49AfJ3HbRZWcEk5l/b0xhMsFcbFHufHGG7nhhhuwLIvS0lIi+vfpSP8+HdlSSUkJq1evplOnTtxzzz3s07CbfFk0SAMCaDYSIAAIDXqFjWrGjKUhAnRFEcShtyi01lSj2afphq2bLkSDYdIQARzbIWTZ1BFBlIlmn3322VOMffx2YR/CBvWLc+OfPYfw7PmI20VE1V8fwnXUYKw4N3scEarDId5d+D0f/TyfiEAoCIYBIuxuWmt6dkmmptbixCN7k7mujLyiaurjaE2vrm3w14Y5ZVhvVmaXUFjqwzSEJjMd/j94MO9AWlYGW3IETl/pcGYGIDTAZisaHAWWYjumxT6bOGB2CNPlmWzih1bjBMBGA5qd9dHBJtXX30m5L4CK9aJtGwOhze1X8/55nbh/0XP4amvAFcOeoDRUzj4tz20aRIXHzZZECRgGm4kgbjfi8YBSNJnWOFV+NtHVfkJhi97hah4sXnCuBzv2iw5DL+OYN0qZdTX77NmM1GTa33wlCBipybSmvIefpDFKhIhcrdlZ8fHxZGdn4/P5aMhaO8R5VWt5ILYDF3iS8WuHPYWIUBkKcvVjN/HIm2PpktKB9SWFrM3PAbcHEaE12X6FXqnxFSjc8Q7UairiUljp7cJBqUKiSzGzoic/iKKH14U3TpMXhE6xBgW1Nuurg3TsogjaDkU1IVqHgHJzQFU6j2Y9xhnlxVifC1UOewcD1lRDSZEm4QuIsWgRgkZEs8I/kOX+QxA0hliYYtFkcy8W9mk14nEx4PbXqVi1Cqn2M+CO94jv2ZfmCmEQDU/M7EHLWkeDRMivLCG/oohtzc9eCiKgDPbZZ7fzuNmSKAHDYDMRxO1GPB5QiqYKKoPtBCwO/+B1RCBguMBw0Wym0KocGyuhA1MDNr6eZ4KGVZYLHWsgjsOeylBsZiia7Ia3bmOf6MstqGLUg18xefpqcBmIEvZEE3vcTmOECEETodmxp9gn+l5O70XLWkpE8LMv2Se6BI0/GE/SmQcgro7kZ3vRQQe8imgQPFiLV1C9eCkRghvBw55E3G7stblU/f1p6rhciGkSLWIaWL4a8s+8nM/fe4XrO3Xi3f+8TY3fz+mnn85Lb7zByLQO8Pd72RtNejyPNz8LYP+UiKiFAAAKfklEQVRfe3ADHGV9J3D8+/s/z7O7yW5iAoUgIK+VqimWwyKUo1pnymCpvVPPOgfOyOGIBex5IPJSC4LaeqBQr94NVOs5w2FnkBEF2tKjXukpKsiLJeYQQzEJb5MQAkkIIdmX5/lfEkQBCdmE3WQ3/D8fj/PcdavF3Fn9WZXxY35VcieuFpAIne3kek3rhDM08bpl3UohCW5Zt1JIgn7j36TrEM4K5H6FvGGjaSsNZKgYM/JKaJKhYrhaIbQugiLdKREyrxrInd+8l6jrgbMCXfkE0m8+N1z1XfpW72Fgr3zaRcCrViCAopl2QVcrEFp11ws29d+/HsbnQsSDBpdOoQSUQ6pRojlWF2RNQT5De1Wwbs91VNZl8umJXCpOBVGi6WyhUAilFAUFBTiOQ9TzOGkHqI/VEwvHyPZlkBmNIUBBQQE5OTmEQiEuZvkTPXny6GDe+KQboEFH+dtBX2fZuCns/N8I437xW2qqw+C36IpsjM6j4cDUOVy3ZQNNDkydA5qUFkXz98EgTaJo0o2nYcuOKO2hRFAWzZQFWkM4pik+2kDFyQh/KqzivaIabEswOseCD35BYq3GaCNP02bLNwhXsBv2nRCSQBqRBEpEuFxLF8HSRRhGu1guq8t6sPl4Dk0qIg5YLp3KBk54sCZM5t7XEcsDywFfAPvAxwTWPIu/vBhsh88pG5SN0bqgF+VLFJQUl3HfrA18d8Rghl7bnZjnsq+4hv/evpOw6xGyBO25XKiO9FQzL4JHgCbZAxqwp2WxrMdclu95gEjUB4r28WiZAk/zOU8DGvBolQIWX28zfYBFzOMLCtzKKMcWHSTyaQNiC5fN8+COO8Dvh3AYPA+j64mIRVr5+CkhnWz7Z6EFHpchEKWrERHaKiaKAQ3VzDy8lW/XHMAVISaKyyXDEdJMbayOXxa9zAv7XqHebSDTCqABjdERlAu4Lm2hAh4JVUez08pHa4QzNEaqUAGPhKqjc1ge63feBJZL+NPBNDlxOpP1O28CO0ZrpBGXULwLLDUD48ogaNLJ8Kp9woU2c77NnG8z8QuF4NlnYeNGuP9+WjVpEngejB8PwSCJ4npCyNayZNhRbutZpx/dnUfRSZ8QL58m/EYmTeyvaa4U4thED5dzdPHLIIAGFIjjgBKuNOXHNEtWxKio1HxruMK24e0PPFa+7lJWrCELGAAcAjRfkhOt598+WEyiLVyzByP9bH1nh2x9ZwcdSilEKc4Sy8JomxurdwpG2tn03jGM9DMEhE6gSS0DT3wknABu+xZGy6xQBlnfvIFEqnVraVJtc4aGWreWePSqKhQ6lJCK3v3JqwKvkmgfFrmcSwTuHuvy8wlR/G/0ouQtG7FAHFJOMBhk+vTpeJ7HqFGjaMnEiRMZPHgwWmscx8FoWQRFi4QzhC8IcZHMTFqm8TSICB6NtEZEuKTjJNXwqn2CcUmaz4hwliY+txYVCskwaZBgGIbRBtFtuxCfw1nic4hu24XYFinLsmlwXZpZNqlAa03vvGzmPDiG7jmZ7Cut5BvX9eKdHaVcSGu4plc2cx8aQzDDR/GhKoZd34ttuw9hXITySLaYAhSp7VebhIt47dd/4rWpC0k1XlgRHFHLNb/8FCcvgtdAQhz/yTLE70McG90QJjRoAOElU3nIt5Xfv7cWbD9YNqlCEK5oL44WDFBCzctriXoaq1cPTq3+A+6xarAs+sZOs6Diw3E+z3vzzV4j7mX0i+W8/yOM1CWWRe6ku2gmdCgVzCReijiEuai5c+fiOA7z5s3jUiJaM7+unB3RehYF81CAS2oQEfAHKK08SumxMhCF+AN0Bjtbo4YKoSEe/lzN6XXgeRC0hJKTYYbkZNA/SxGyLepiMfZWR7i+e4CT4TBXZ9h08zlUN7gcqY8Q8zRJpxyyYrX8yyf/yiN/fYEM9zR1JSCkH7EBRcJZ4mLhYqQHf8+e5PXoAVqDUqSSTMejQ4mAWBiG8RmBmOMj3URRIApfwEeTCJqu6sPS3RhQs+kuIUm27DrEAz/9PfuLjyM+i1T25nt3EB/NGcKlLcPoAJZHMtRNmY6RZALBcIS6wggxtYNA2XHIH0RyWQgZpDSlkIwMLsfwqn1CW90xlgtNe+ABppG+Xl7fwLmuCglPPxzguh98hylHZ1NYfS1IBESTCsqmuhiwbNZNJNKsiaQEOzsbsrNpD1crJnQ7QhNXK65EOcFuNMt+kMg1E/D5gvQAdn9nBD6fj3YTvkyIS31RtVC0A6NllvKojfjZfqg3G/YOQWvBUh5KNKli8ODBaK0pKyvDsiwCgQCWZaG1RmtNk1AwSF5eHiJCS8YVfYPyBj9IDL/tY/atP+SH/cfxxM8+ZP0f94Mt4Ci6Khuj81iKcHEpRxYspkm4uBTx+0l1gtHE9TRL1h/EsYSIq/E8jW0Jl7L0noGCkTQZ1mmSYu19wkXkv8EXRtHoQQzDMIwOoDwqYhbNlEen+0sMXj+N1AM+C7BoJgqrrATr8Ivg+AGN0XabPn6NS4l+5BHzXEC4TQk/ti0uZQzpyfMEX9Cl+6Qof7zlTubvW8DhgqvBAhQp58khNrMGWsQ8viDgnXI59vQhwnvrEUdICK2hsBDDMIzLJY1IgttP7OfRw1vpEa0jKoor1VvlW3hs91P8tbaEDCuATzlorjzDq/YJl/LcQnhuIV2dED8hftIIw4iHHaPJifoMmokGO4ZhGAmQlweTJxO3yZNJBg24nnB771PyN7kNetbuPP0b4hQTojt8NLEHC1cUpRC/wjijqNjjZ//u0T1XsCw4dlxTW8cZtUAhLXpm1/MMPHWEsOUjkZb+dh/p5A/ThgkX8RbwBIZhGIk37d7+JNKKAgzDMDqF+9EkwThPKFN49rEQE/tkc+TpTGqOCOKQ0m6++WbiMXLkSIxOpDWt0prPaY1hGIZhJJvYFhcS28JoGxHhaGUtc5e+xcgb+5ARcCj4pBwR4UIiUHaslscWb2LEjX0J+C127y1HKcEwuopuEyrovfAgKA8dJWHE76OJdl263fM9tj16Gw8XvEjFyeNg+zGMVGQB1okqTj33CoiA1jhKgaZZ31gdT1bs/Ha2F9mwslv+PcGbnz9Yt30mRgoTOofWdISXXnoJy7KI1/pIDQVuPf8R6sMgy0cqEREQi3h8tfJdIQm8SnC3aBoqFA3KRZ0G+muyHIshuSEqTkcpPRkm5mkGZPvpl+0jHNNk2ApPa47VRympCaPpGGPLN7H0ozlce2o/9UAEENKYpl02/sMNgtF1iIAIqUZjpKXlE4SLGLuCz/wf8I8YRvJpujpb2RjJ859rC5j5zP9QWxdGHItU57MjGGlo+QYhGRwHI9kEHRa6Ff+FsOvQEFBoBMNIhhuHWLz0VC5/7jWFvyv9Jxo8P0iEVCIYTR6d8DUSadZEugSfaJpoDJ8vyFkBvx8jdQlwOmqzctcwLNEgmlQjIogIffr04XKURxwQl745PXnl7kdoKMnl9vs2UlZ+ChxFVycYxjkO9xugSaC+B0sFwzCMzqG5QO88Px/8bgRX5/nxPE0zBfq4pu7hMPq4BsV5uu/dKhiGYXSCqvyhmnNFo2QteJzJRRarVr/N9jWzXy67cgAAAYZJREFUyZ8/g0hJKShFa3L3FApG2tr/vb765EP9eOzEEjaXjgEBhPZ7UoQ0pEHTTgKCYRiG0eW8HxqmuYDXEKb/z2fSd84UKl/fRNGEmaiAn3iMPrVbMAzDMDqNbsQFZqwtYeDzS5hcuZtxIx9h5bK7GfKVAPGQRiTR6NnvahLo/efGCIZhGIZhGEa76UYkkDTCSF+jVmjOFXX50cThPFO3ierfbaT8+VcZM/vPaE8Tl23TBMMwDMMwDCPl6EYkiDTCMAzDMIwuLWtdviYBau/cIxhJV5U/VHOuaJSsBY8zuchi1eq32b5mNvnzZxApKQWlaE3unkKh0divz9Nj6stxEVqi0NQqh1VXXVtY4cv+Ae9PPYBhdBxNAvhEWJiZx0/rygXDMAzDMIx2qMofqjlXNErWgseZXGSxavXbbF8zm/z5M4iUlIJStCZ3T6GQhu7feFiTQP81vq9gGIZhGIZhGFcYXYrmYjwgdxHkLKQl0gjDSHNfHf8bTSs0IMRn/8b7BCPt/D/mPRtuNTjhOAAAAABJRU5ErkJggg==');\n  background-repeat: no-repeat;\n  background-color: #dbdbdb;\n  background-position: 20px 0;\n}\n@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx) {\n.iti-flag {\n    background-image: url('data:image/png;base64,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');\n}\n}\n.iti-flag.np {\n  background-color: transparent;\n}\n",
      map: undefined,
      media: undefined
    }), inject("data-v-43c561fc_1", {
      source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* TODO: Find the right way to resolve alias in style block */\n/* @import url(\"~@/assets/sprite.css\"); */\n.vue-country-select {\n  border-radius: 3px;\n  display: inline-block;\n  border: 1px solid #bbb;\n  text-align: left;\n}\n.vue-country-select:focus-within {\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),\n    0 0 8px rgba(102, 175, 233, 0.6);\n  border-color: #66afe9;\n}\n.vue-country-select .dropdown {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  padding: 0.5em;\n  position: relative;\n  cursor: pointer;\n}\n.vue-country-select .dropdown.open {\n  background-color: #f3f3f3;\n}\n.vue-country-select .dropdown:hover {\n  background-color: #f3f3f3;\n}\n.vue-country-select .dropdown-list {\n  z-index: 1;\n  padding: 0;\n  margin: 0;\n  text-align: left;\n  list-style: none;\n  max-height: 200px;\n  overflow-y: scroll;\n  position: absolute;\n  top: 100%;\n  left: -1px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  width: 390px;\n}\n.vue-country-select .dropdown-item {\n  cursor: pointer;\n  padding: 4px 15px;\n}\n.vue-country-select .dropdown-item .iti-flag {\n  display: inline-block;\n  margin-right: 5px;\n  margin-left: 5px;\n}\n.vue-country-select .dropdown-item.highlighted {\n  background-color: #f3f3f3;\n}\n.vue-country-select .dropdown-item.last-preferred {\n  border-bottom: 1px solid #cacaca;\n}\n.vue-country-select .dropdown-arrow {\n  transform: scaleY(0.5);\n  display: inline-block;\n  color: #666;\n}\n.vue-country-select .current {\n  font-size: 0.8em;\n  display: flex;\n  align-items: center;\n}\n.vue-country-select .country-code {\n  color: #666;\n}\n.vue-country-select.disabled .current,\n.vue-country-select.disabled .dropdown {\n  cursor: no-drop;\n}\n",
      map: {
        "version": 3,
        "sources": ["/Users/hantrongbinh/Working/Personal/vue-country-code/src/components/VueCountryCode.vue"],
        "names": [],
        "mappings": ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAyTA,6DAAA;AACA,yCAAA;AACA;EACA,kBAAA;EACA,qBAAA;EACA,sBAAA;EACA,gBAAA;AACA;AACA;EACA;oCACA;EACA,qBAAA;AACA;AACA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;EACA,cAAA;EACA,kBAAA;EACA,eAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,UAAA;EACA,UAAA;EACA,SAAA;EACA,gBAAA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,sBAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,eAAA;EACA,iBAAA;AACA;AACA;EACA,qBAAA;EACA,iBAAA;EACA,gBAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,gCAAA;AACA;AACA;EACA,sBAAA;EACA,qBAAA;EACA,WAAA;AACA;AACA;EACA,gBAAA;EACA,aAAA;EACA,mBAAA;AACA;AACA;EACA,WAAA;AACA;AACA;;EAEA,eAAA;AACA",
        "file": "VueCountryCode.vue",
        "sourcesContent": ["<template>\n  <div class=\"vue-country-select\" :class=\"{ disabled: disabled }\">\n    <div\n      class=\"dropdown\"\n      @click=\"toggleDropdown\"\n      v-click-outside=\"clickedOutside\"\n      :class=\"{ open: open }\"\n      @keydown=\"keyboardNav\"\n      tabindex=\"0\"\n      @keydown.esc=\"reset\"\n    >\n      <span class=\"current\">\n        <div\n          v-if=\"enabledFlags\"\n          class=\"iti-flag\"\n          :class=\"activeCountry.iso2.toLowerCase()\"\n        ></div>\n        <span v-if=\"enabledCountryCode\" class=\"country-code\"\n          >+{{ activeCountry.dialCode }}</span\n        >\n        <span class=\"dropdown-arrow\">{{ open ? \"▲\" : \"▼\" }}</span>\n      </span>\n      <ul v-show=\"open\" ref=\"list\" class=\"dropdown-list\">\n        <li\n          class=\"dropdown-item\"\n          v-for=\"(pb, index) in sortedCountries\"\n          :key=\"pb.iso2 + (pb.preferred ? '-preferred' : '')\"\n          @click=\"choose(pb)\"\n          :class=\"getItemClass(index, pb.iso2)\"\n          @mousemove=\"selectedIndex = index\"\n        >\n          <div\n            class=\"iti-flag\"\n            v-if=\"enabledFlags\"\n            :class=\"pb.iso2.toLowerCase()\"\n          ></div>\n          <strong>{{ pb.name }}</strong>\n          <span v-if=\"dropdownOptions && !dropdownOptions.disabledDialCode\"\n            >+{{ pb.dialCode }}</span\n          >\n        </li>\n      </ul>\n    </div>\n  </div>\n</template>\n\n<script>\nimport allCountries from \"../utils/allCountries\";\nimport getCountry from \"../utils/defaultCountry\";\n\nexport default {\n  name: \"vue-country-code\",\n  props: {\n    disabledFetchingCountry: {\n      type: Boolean,\n      default: false\n    },\n    disabled: {\n      type: Boolean,\n      default: false\n    },\n    disabledFormatting: {\n      type: Boolean,\n      default: false\n    },\n    defaultCountry: {\n      // Default country code, ie: 'AU'\n      // Will override the current country of user\n      type: String,\n      default: \"\"\n    },\n    enabledCountryCode: {\n      type: Boolean,\n      default: false\n    },\n    enabledFlags: {\n      type: Boolean,\n      default: true\n    },\n    preferredCountries: {\n      type: Array,\n      default: () => []\n    },\n    onlyCountries: {\n      type: Array,\n      default: () => []\n    },\n    ignoredCountries: {\n      type: Array,\n      default: () => []\n    },\n    dropdownOptions: {\n      type: Object,\n      default: () => ({})\n    },\n    selectedCountryCode: {\n      type: Boolean,\n      default: false\n    }\n  },\n  mounted() {\n    this.initializeCountry();\n    this.$emit(\"onSelect\", this.activeCountry);\n  },\n  data() {\n    return {\n      activeCountry: { iso2: \"\" },\n      open: false,\n      selectedIndex: null,\n      typeToFindInput: \"\",\n      typeToFindTimer: null\n    };\n  },\n  computed: {\n    filteredCountries() {\n      // List countries after filtered\n      if (this.onlyCountries.length) {\n        return this.getCountries(this.onlyCountries);\n      }\n\n      if (this.ignoredCountries.length) {\n        return allCountries.filter(\n          ({ iso2 }) =>\n            !this.ignoredCountries.includes(iso2.toUpperCase()) &&\n            !this.ignoredCountries.includes(iso2.toLowerCase())\n        );\n      }\n\n      return allCountries;\n    },\n    sortedCountries() {\n      // Sort the list countries: from preferred countries to all countries\n      const preferredCountries = this.getCountries(\n        this.preferredCountries\n      ).map(country => ({ ...country, preferred: true }));\n\n      return [...preferredCountries, ...this.filteredCountries];\n    }\n  },\n  methods: {\n    initializeCountry() {\n      /**\n       * 1. Use default country if passed from parent\n       */\n      if (this.defaultCountry) {\n        const defaultCountry = this.findCountry(this.defaultCountry);\n        if (defaultCountry) {\n          this.activeCountry = defaultCountry;\n          return;\n        }\n      }\n      /**\n       * 2. Use the first country from preferred list (if available) or all countries list\n       */\n      this.activeCountry =\n        this.findCountry(this.preferredCountries[0]) ||\n        this.filteredCountries[0];\n      /**\n       * 3. Check if fetching country based on user's IP is allowed, set it as the default country\n       */\n      if (!this.disabledFetchingCountry) {\n        getCountry().then(res => {\n          this.choose(this.findCountry(res) || this.activeCountry);\n        });\n      }\n    },\n    /**\n     * Get the list of countries from the list of iso2 code\n     */\n    getCountries(list = []) {\n      return list\n        .map(countryCode => this.findCountry(countryCode))\n        .filter(Boolean);\n    },\n    findCountry(iso = \"\") {\n      return allCountries.find(country => country.iso2 === iso.toUpperCase());\n    },\n    getItemClass(index, iso2) {\n      const highlighted = this.selectedIndex === index;\n      const lastPreferred = index === this.preferredCountries.length - 1;\n      const preferred = !!~this.preferredCountries\n        .map(c => c.toUpperCase())\n        .indexOf(iso2);\n      return {\n        highlighted,\n        \"last-preferred\": lastPreferred,\n        preferred\n      };\n    },\n    choose(country) {\n      this.activeCountry = country;\n      this.$emit(\"onSelect\", this.activeCountry);\n    },\n    toggleDropdown() {\n      if (this.disabled) {\n        return;\n      }\n      this.open = !this.open;\n    },\n    clickedOutside() {\n      this.open = false;\n    },\n    keyboardNav(e) {\n      if (e.keyCode === 40) {\n        // down arrow\n        this.open = true;\n        if (this.selectedIndex === null) {\n          this.selectedIndex = 0;\n        } else {\n          this.selectedIndex = Math.min(\n            this.sortedCountries.length - 1,\n            this.selectedIndex + 1\n          );\n        }\n        let selEle = this.$refs.list.children[this.selectedIndex];\n        if (\n          selEle.offsetTop + selEle.clientHeight >\n          this.$refs.list.scrollTop + this.$refs.list.clientHeight\n        )\n          this.$refs.list.scrollTop =\n            selEle.offsetTop -\n            this.$refs.list.clientHeight +\n            selEle.clientHeight;\n      } else if (e.keyCode === 38) {\n        // up arrow\n        this.open = true;\n        if (this.selectedIndex === null) {\n          this.selectedIndex = this.sortedCountries.length - 1;\n        } else {\n          this.selectedIndex = Math.max(0, this.selectedIndex - 1);\n        }\n        let selEle = this.$refs.list.children[this.selectedIndex];\n        if (selEle.offsetTop < this.$refs.list.scrollTop)\n          this.$refs.list.scrollTop = selEle.offsetTop;\n      } else if (e.keyCode === 13) {\n        // enter key\n        if (this.selectedIndex !== null) {\n          this.choose(this.sortedCountries[this.selectedIndex]);\n        }\n        this.open = !this.open;\n      } else {\n        // typing a country's name\n        this.typeToFindInput += e.key;\n        clearTimeout(this.typeToFindTimer);\n        this.typeToFindTimer = setTimeout(() => {\n          this.typeToFindInput = \"\";\n        }, 700);\n        // don't include preferred countries so we jump to the right place in the alphabet\n        let typedCountryI = this.sortedCountries\n          .slice(this.preferredCountries.length)\n          .findIndex(c =>\n            c.name.toLowerCase().startsWith(this.typeToFindInput)\n          );\n        if (~typedCountryI) {\n          this.selectedIndex = this.preferredCountries.length + typedCountryI;\n          let selEle = this.$refs.list.children[this.selectedIndex];\n          if (\n            selEle.offsetTop < this.$refs.list.scrollTop ||\n            selEle.offsetTop + selEle.clientHeight >\n              this.$refs.list.scrollTop + this.$refs.list.clientHeight\n          ) {\n            this.$refs.list.scrollTop =\n              selEle.offsetTop - this.$refs.list.clientHeight / 2;\n          }\n        }\n      }\n    },\n    reset() {\n      this.selectedIndex = this.sortedCountries\n        .map(c => c.iso2)\n        .indexOf(this.activeCountry.iso2);\n      this.open = false;\n    }\n  },\n  directives: {\n    // Click-outside from BosNaufal: https://github.com/BosNaufal/vue-click-outside\n    \"click-outside\": {\n      bind: function(el, binding, vNode) {\n        // Provided expression must evaluate to a function.\n        if (typeof binding.value !== \"function\") {\n          var compName = vNode.context.name;\n          var warn =\n            \"[Vue-click-outside:] provided expression \" +\n            binding.expression +\n            \" is not a function, but has to be\";\n          if (compName) {\n            warn += \"Found in component \" + compName;\n          }\n          console.warn(warn);\n        }\n        // Define Handler and cache it on the element\n        var bubble = binding.modifiers.bubble;\n        var handler = function(e) {\n          if (bubble || (!el.contains(e.target) && el !== e.target)) {\n            binding.value(e);\n          }\n        };\n        el.__vueClickOutside__ = handler;\n        // add Event Listeners\n        document.addEventListener(\"click\", handler);\n      },\n      unbind: function(el) {\n        // Remove Event Listeners\n        document.removeEventListener(\"click\", el.__vueClickOutside__);\n        el.__vueClickOutside__ = null;\n      }\n    }\n  }\n};\n</script>\n\n<style src=\"../assets/sprite.css\"></style>\n<style>\n/* TODO: Find the right way to resolve alias in style block */\n/* @import url(\"~@/assets/sprite.css\"); */\n.vue-country-select {\n  border-radius: 3px;\n  display: inline-block;\n  border: 1px solid #bbb;\n  text-align: left;\n}\n.vue-country-select:focus-within {\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),\n    0 0 8px rgba(102, 175, 233, 0.6);\n  border-color: #66afe9;\n}\n.vue-country-select .dropdown {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  padding: 0.5em;\n  position: relative;\n  cursor: pointer;\n}\n.vue-country-select .dropdown.open {\n  background-color: #f3f3f3;\n}\n.vue-country-select .dropdown:hover {\n  background-color: #f3f3f3;\n}\n.vue-country-select .dropdown-list {\n  z-index: 1;\n  padding: 0;\n  margin: 0;\n  text-align: left;\n  list-style: none;\n  max-height: 200px;\n  overflow-y: scroll;\n  position: absolute;\n  top: 100%;\n  left: -1px;\n  background-color: #fff;\n  border: 1px solid #ccc;\n  width: 390px;\n}\n.vue-country-select .dropdown-item {\n  cursor: pointer;\n  padding: 4px 15px;\n}\n.vue-country-select .dropdown-item .iti-flag {\n  display: inline-block;\n  margin-right: 5px;\n  margin-left: 5px;\n}\n.vue-country-select .dropdown-item.highlighted {\n  background-color: #f3f3f3;\n}\n.vue-country-select .dropdown-item.last-preferred {\n  border-bottom: 1px solid #cacaca;\n}\n.vue-country-select .dropdown-arrow {\n  transform: scaleY(0.5);\n  display: inline-block;\n  color: #666;\n}\n.vue-country-select .current {\n  font-size: 0.8em;\n  display: flex;\n  align-items: center;\n}\n.vue-country-select .country-code {\n  color: #666;\n}\n.vue-country-select.disabled .current,\n.vue-country-select.disabled .dropdown {\n  cursor: no-drop;\n}\n</style>\n"]
      },
      media: undefined
    });
  };
  /* scoped */


  var __vue_scope_id__ = undefined;
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = false;
  /* style inject SSR */

  /* style inject shadow dom */

  var __vue_component__ = /*#__PURE__*/normalizeComponent({
    render: __vue_render__,
    staticRenderFns: __vue_staticRenderFns__
  }, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

  var index = _objectSpread2(_objectSpread2({}, __vue_component__), {}, {
    install: function install(Vue) {
      Vue.component(__vue_component__.name, __vue_component__);
      return Vue;
    }
  });

  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/App.vue?vue&type=template&id=f348271a&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/App.vue?vue&type=template&id=f348271a& ***!
  \*******************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "app-template flex flex-col" }, [
    _c(
      "header",
      { staticClass: "app-header flex flex-row justify-between items-center" },
      [
        _c("div", { staticClass: "app-header-logo" }, [
          _c(
            "svg",
            {
              staticClass: "h-full",
              attrs: {
                xmlns: "http://www.w3.org/2000/svg",
                width: "208",
                viewBox: "0 0 208 48"
              }
            },
            [
              _c("g", [
                _c("g", [
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M50.19 31.032V9.07h4.526v22.717c0 1.802.98 2.939 2.723 2.939a2.586 2.586 0 0 0 2.723-2.94V9.07h4.575v21.962c0 5.29-2.772 7.837-7.298 7.837s-7.249-2.547-7.249-7.837z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M74.007 23.852v-10.57h2.297c1.721 0 2.6.97 2.6 2.86v4.899c0 1.831-.879 2.811-2.6 2.811zM69.55 38.458h4.496V28.152h2.175c4.526 0 7.249-2.635 7.249-7.836v-3.41c0-5.318-2.723-7.836-7.249-7.836H69.55z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M91.696 23.852v-10.57h2.336c1.721 0 2.6.97 2.6 2.86v4.899c0 1.831-.879 2.811-2.6 2.811zM87.18 38.458h4.555V28.152h2.106c4.536 0 7.259-2.635 7.259-7.836v-3.41c0-5.318-2.723-7.836-7.259-7.836H87.18z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M104.87 9.07h12.49v4.242h-7.964v8.238h6.798v4.202h-6.798v8.445h7.964v4.231h-12.49z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M126.524 23.303v-9.991h2.263c1.714 0 2.556.97 2.556 2.86v4.28c0 1.872-.842 2.851-2.556 2.851zm-4.614 15.155h4.526V27.143h1.47l3.27 11.334h4.576l-3.82-11.96c2.576-1.049 3.918-3.155 3.918-6.926v-2.684c0-5.32-2.596-7.837-7.132-7.837h-6.788z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M139.5 31.072V16.467c0-5.212 2.762-7.837 7.17-7.837 4.409 0 7.25 2.527 7.25 7.768v2.116h-4.575v-2.84c0-1.803-.794-2.851-2.635-2.851-1.842 0-2.714 1.077-2.714 2.85v16.154a2.576 2.576 0 0 0 2.812 2.86 2.488 2.488 0 0 0 2.762-2.811v-3.184h4.575v2.42c0 5.25-2.939 7.768-7.386 7.768-4.448 0-7.259-2.557-7.259-7.808z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M162.565 24.49v-8.62a2.715 2.715 0 0 1 1.279-2.541 2.704 2.704 0 0 1 2.84 0 2.715 2.715 0 0 1 1.279 2.54v8.621zm-4.486 13.969h4.535v-9.796h5.359v9.796h4.565V16.546c0-5.29-2.802-7.896-7.288-7.896-4.487 0-7.22 2.606-7.22 7.896z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M176.61 31.112v-2.429h4.526v3.194c0 1.802.803 2.85 2.645 2.85 2.096 0 2.684-1.43 2.684-3.526v-1.137c0-2.596-.98-3.487-2.94-4.32l-1.723-.715c-3.262-1.303-5.065-3.36-5.065-7.474v-1.048c0-5.33 2.596-7.837 7.122-7.837s7.043 2.44 7.043 7.768v2.106h-4.565v-2.87c0-1.802-.715-2.772-2.517-2.772-1.803 0-2.596 1.038-2.596 3.144v1.47c0 2.096.627 2.89 3.017 3.82l1.675.666c3.566 1.391 5.114 3.703 5.114 7.73v.92c0 5.8-2.724 8.229-7.25 8.229-4.525 0-7.17-2.557-7.17-7.769z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M195.23 9.07h12.5v4.242h-7.974v8.238h6.798v4.202h-6.798v8.445h7.974v4.231h-12.5z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M.06 29.64l20.327 11.755 15.252-8.816v5.877l-15.252 8.817L.06 35.518V29.64z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M10.22 29.638l10.168-5.878v5.878l-5.084 2.938-5.084-2.938z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M.06 6.13l20.327 11.755L35.639 9.07v5.877l-15.252 8.817L.06 12.008V6.13z"
                      }
                    })
                  ]),
                  _vm._v(" "),
                  _c("g", [
                    _c("path", {
                      attrs: {
                        fill: "#13100d",
                        d:
                          "M10.22.25l15.252 8.816-5.084 2.94L10.23 6.127 10.22.25z"
                      }
                    })
                  ])
                ])
              ])
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "app-call flex flex-col md:flex-row" }, [
          _c(
            "a",
            {
              staticClass: "app-call-number",
              attrs: { href: "tel:8 910 235-89-36" }
            },
            [_vm._v("\n        +7 967 069-04-29\n      ")]
          ),
          _vm._v(" "),
          _c(
            "span",
            {
              staticClass: "app-call-book",
              on: {
                click: function($event) {
                  return _vm.toggleModal()
                }
              }
            },
            [_vm._v("\n        Заказать звонок\n      ")]
          )
        ])
      ]
    ),
    _vm._v(" "),
    !_vm.isSuccess && !_vm.isModal
      ? _c("div", { staticClass: "home-view flex-grow flex flex-col" }, [
          _c(
            "section",
            { staticClass: "home-view-content flex flex-col flex-grow" },
            [
              _c(
                "div",
                {
                  staticClass: "flex-grow md:flex md:flex-col md:justify-center"
                },
                [
                  _c("h1", [_vm._v("Открытие банковских счетов")]),
                  _vm._v(" "),
                  _c("h3", [
                    _vm._v(
                      "\n          за 10 дней для офшорных компаний в Казахстане\n          и Кыргызстане\n        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("h5", [
                    _vm._v(
                      "\n          Оставьте номер телефона и получите подробную консультацию в\n          течение 5 минут по телефону или WhatsApp\n        "
                    )
                  ]),
                  _vm._v(" "),
                  _c("Form", { attrs: { type: "form" } }),
                  _vm._v(" "),
                  _c("a", { attrs: { href: "http://uppercase.group/" } }, [
                    _vm._v("Перейти на сайт")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _vm._m(0)
            ]
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.isSuccess && _vm.isModal
      ? _c(
          "div",
          {
            staticClass: "success-view flex-grow flex flex-col justify-center"
          },
          [
            _c("h2", [_vm._v("Спасибо!")]),
            _vm._v(" "),
            _c("h4", [_vm._v("Ваша заявка принята")]),
            _vm._v(" "),
            _c(
              "a",
              {
                staticClass: "flex justify-center items-center button-pulse",
                attrs: { href: "http://uppercase.group/" }
              },
              [_vm._v("Перейти на сайт")]
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.isSuccess && _vm.isModal
      ? _c(
          "div",
          {
            staticClass:
              "modal-view mx-auto relative flex-grow flex flex-col justify-center"
          },
          [
            _c(
              "div",
              {
                staticClass: "absolute top-1 right-1 cursor-pointer",
                on: { click: _vm.toggleModal }
              },
              [
                _c(
                  "svg",
                  {
                    attrs: {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 18 18"
                    }
                  },
                  [
                    _c("path", {
                      attrs: {
                        fill: "none",
                        stroke: "#d9d7d7",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-miterlimit": "20",
                        "stroke-width": "1.5",
                        d: "M1 1l16 16"
                      }
                    }),
                    _vm._v(" "),
                    _c("path", {
                      attrs: {
                        fill: "none",
                        stroke: "#d9d7d7",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-miterlimit": "20",
                        "stroke-width": "1.5",
                        d: "M17 1L1 17"
                      }
                    })
                  ]
                )
              ]
            ),
            _vm._v(" "),
            _c("Form", { attrs: { type: "callback" } })
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _vm._v("\n        Оставляя контактную информацию, вы\n        "),
      _c("span", [_vm._v("соглашаетесь")]),
      _vm._v(" на обработку персональных данных\n      ")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form.vue?vue&type=template&id=8048fca2&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Form.vue?vue&type=template&id=8048fca2& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "form",
    {
      staticClass: "form-template",
      class: {
        "type-form": _vm.type == "form",
        "type-callback": _vm.type == "callback"
      },
      on: {
        submit: function($event) {
          $event.preventDefault()
          return _vm.submitForm($event)
        }
      }
    },
    [
      _c(
        "div",
        { staticClass: "flex flex-row" },
        [
          _c("vue-country-code", { on: { onSelect: _vm.onCountrySelect } }),
          _vm._v(" "),
          _c("masked-input", {
            staticClass: "w-full ml-4 pl-4",
            attrs: {
              type: "tel",
              autocomplete: "off",
              placeholder: "Ваш телефон*",
              mask: {
                pattern: "(V11) 111-11-11",
                formatCharacters: {
                  V: {
                    validate: function(char) {
                      return /[0-9]/.test(char)
                    }
                  }
                }
              }
            },
            nativeOn: {
              focus: function($event) {
                ;(_vm.isValid = true), (_vm.onFocus = true)
              },
              blur: function($event) {
                _vm.onFocus = false
              }
            },
            model: {
              value: _vm.$v.phone.$model,
              callback: function($$v) {
                _vm.$set(_vm.$v.phone, "$model", $$v)
              },
              expression: "$v.phone.$model"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("button", { staticClass: "button-pulse" }, [
        _vm.type == "form"
          ? _c("span", [_vm._v("Получить консультацию и рассчёт")])
          : _vm._e(),
        _vm._v(" "),
        _vm.type == "callback"
          ? _c("span", [_vm._v("Заказать звонок")])
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-masked-input/dist/ff-polyfill.js":
/*!***********************************************************!*\
  !*** ./node_modules/vue-masked-input/dist/ff-polyfill.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Copy paste from https://gist.github.com/nuxodin/9250e56a3ce6c0446efa
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var w = window,
      d = w.document;

  if (w.onfocusin === undefined) {
    d.addEventListener('focus', addPolyfill, true);
    d.addEventListener('blur', addPolyfill, true);
    d.addEventListener('focusin', removePolyfill, true);
    d.addEventListener('focusout', removePolyfill, true);
  }

  function addPolyfill(e) {
    var type = e.type === 'focus' ? 'focusin' : 'focusout';
    var event = new CustomEvent(type, {
      bubbles: true,
      cancelable: false
    });
    event.c1Generated = true;
    e.target.dispatchEvent(event);
  }

  function removePolyfill(e) {
    if (!e.c1Generated) {
      // focus after focusin, so chrome will the first time trigger tow times focusin
      d.removeEventListener('focus', addPolyfill, true);
      d.removeEventListener('blur', addPolyfill, true);
      d.removeEventListener('focusin', removePolyfill, true);
      d.removeEventListener('focusout', removePolyfill, true);
    }
    setTimeout(function () {
      d.removeEventListener('focusin', removePolyfill, true);
      d.removeEventListener('focusout', removePolyfill, true);
    });
  }
});;


/***/ }),

/***/ "./node_modules/vue-masked-input/dist/maskedInput.js":
/*!***********************************************************!*\
  !*** ./node_modules/vue-masked-input/dist/maskedInput.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var inputmask_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! inputmask-core */ "./node_modules/inputmask-core/lib/index.js");
/* harmony import */ var inputmask_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(inputmask_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ff_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ff-polyfill */ "./node_modules/vue-masked-input/dist/ff-polyfill.js");
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }


 // Firefox Polyfill for focus events

Object(_ff_polyfill__WEBPACK_IMPORTED_MODULE_1__["default"])();

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'MaskedInput',
  render: function render(h) {
    return h('input', {
      ref: 'input',
      attrs: {
        disabled: this.maskCore === null || this.disabled
      },
      domProps: {
        value: this.value
      },
      on: {
        keydown: this.keyDown,
        keypress: this.keyPress,
        keyup: this.keyUp,
        textInput: this.textInput,
        mouseup: this.mouseUp,
        focusout: this.focusOut,
        cut: this.cut,
        copy: this.copy,
        paste: this.paste
      }
    });
  },


  data: function data() {
    return {
      marginLeft: 0,
      maskCore: null,
      updateAfterAll: false
    };
  },

  props: {
    value: {
      type: String
    },
    mask: {
      required: true,
      validator: function validator(value) {
        return !!(value && value.length >= 1 || value instanceof Object);
      }
    },
    placeholderChar: {
      type: String,
      default: '_',
      validator: function validator(value) {
        return !!(value && value.length === 1);
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    mask: function mask(newValue, oldValue) {
      if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        this.initMask();
      }
    },
    value: function value(newValue) {
      if (this.maskCore) this.maskCore.setValue(newValue); // For multiple inputs support
    }
  },

  mounted: function mounted() {
    this.initMask();
  },


  methods: {
    initMask: function initMask() {
      var _this = this;

      try {
        if (this.mask instanceof Object) {
          this.maskCore = new inputmask_core__WEBPACK_IMPORTED_MODULE_0___default.a(this.mask);
        } else {
          this.maskCore = new inputmask_core__WEBPACK_IMPORTED_MODULE_0___default.a({
            pattern: this.mask,
            value: '',
            placeholderChar: this.placeholderChar,
            /* eslint-disable quote-props */
            formatCharacters: {
              'a': {
                validate: function validate(char) {
                  return (/^[A-Za-zА-Яа-я]$/.test(char)
                  );
                }
              },
              'A': {
                validate: function validate(char) {
                  return (/^[A-Za-zА-Яа-я]$/.test(char)
                  );
                },
                transform: function transform(char) {
                  return char.toUpperCase();
                }
              },
              '*': {
                validate: function validate(char) {
                  return (/^[\dA-Za-zА-Яа-я]$/.test(char)
                  );
                }
              },
              '#': {
                validate: function validate(char) {
                  return (/^[\dA-Za-zА-Яа-я]$/.test(char)
                  );
                },
                transform: function transform(char) {
                  return char.toUpperCase();
                }
              },
              '+': {
                validate: function validate() {
                  return true;
                }
              }
            }
          });
        }
        [].concat(_toConsumableArray(this.$refs.input.value)).reduce(function (memo, item) {
          return _this.maskCore.input(item);
        }, null);
        this.maskCore.setSelection({
          start: 0,
          end: 0
        });
        if (this.$refs.input.value === '') {
          this.$emit('input', '', '');
        } else {
          this.updateToCoreState();
        }
      } catch (e) {
        this.maskCore = null;
        this.$refs.input.value = 'Error';
        this.$emit('input', this.$refs.input.value, '');
      }
    },
    getValue: function getValue() {
      return this.maskCore ? this.maskCore.getValue() : '';
    },
    keyDown: function keyDown(e) {
      // Always
      if (this.maskCore === null) {
        e.preventDefault();
        return;
      }
      this.setNativeSelection();
      switch (e.keyCode) {
        // backspace
        case 8:
          e.preventDefault();
          if (this.maskCore.selection.start > this.marginLeft || this.maskCore.selection.start !== this.maskCore.selection.end) {
            this.maskCore.backspace();
            this.updateToCoreState();
          }
          break;

        // left arrow
        case 37:
          e.preventDefault();
          if (this.$refs.input.selectionStart === this.$refs.input.selectionEnd) {
            // this.$refs.input.selectionEnd = this.$refs.input.selectionStart - 1; @TODO
            this.$refs.input.selectionStart -= 1;
          }
          this.maskCore.selection = {
            start: this.$refs.input.selectionStart,
            end: this.$refs.input.selectionStart
          };
          this.updateToCoreState();
          break;

        // right arrow
        case 39:
          e.preventDefault();
          if (this.$refs.input.selectionStart === this.$refs.input.selectionEnd) {
            this.$refs.input.selectionEnd += 1;
          }
          this.maskCore.selection = {
            start: this.$refs.input.selectionEnd,
            end: this.$refs.input.selectionEnd
          };
          this.updateToCoreState();
          break;

        // end
        case 35:
          e.preventDefault();
          this.$refs.input.selectionStart = this.$refs.input.value.length;
          this.$refs.input.selectionEnd = this.$refs.input.value.length;
          this.maskCore.selection = {
            start: this.$refs.input.selectionEnd,
            end: this.$refs.input.selectionEnd
          };
          this.updateToCoreState();
          break;

        // home
        case 36:
          e.preventDefault();
          this.$refs.input.selectionStart = 0;
          this.$refs.input.selectionEnd = 0;
          this.maskCore.selection = {
            start: this.$refs.input.selectionStart,
            end: this.$refs.input.selectionStart
          };
          this.updateToCoreState();
          break;

        // delete
        case 46:
          e.preventDefault();
          if (this.$refs.input.selectionStart === this.$refs.input.selectionEnd) {
            this.maskCore.setValue('');
            this.maskCore.setSelection({
              start: 0,
              end: 0
            });
            this.$refs.input.selectionStart = this.maskCore.selection.start;
            this.$refs.input.selectionEnd = this.maskCore.selection.start;
          } else {
            this.maskCore.backspace();
          }
          this.updateToCoreState();
          break;

        default:
          break;
      }
    },
    keyPress: function keyPress(e) {
      // works only on Desktop
      if (e.ctrlKey) return; // Fix FF copy/paste issue
      // IE & FF are not trigger textInput event, so we have to force it
      /* eslint-disable */
      var isIE = /*@cc_on!@*/ false || !!document.documentMode; //by http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
      /* eslint-enable */
      var isFirefox = typeof InstallTrigger !== 'undefined';
      if (isIE || isFirefox) {
        e.preventDefault();
        e.data = e.key;
        this.textInput(e);
      }
    },
    textInput: function textInput(e) {
      if (e.preventDefault) e.preventDefault();
      if (this.maskCore.input(e.data)) {
        this.updateAfterAll = true;
      }
      this.updateToCoreState();
    },
    keyUp: function keyUp(e) {
      if (e.keyCode === 9) {
        // Preven change selection for Tab in
        return;
      }
      this.updateToCoreState();
      this.updateAfterAll = false;
    },
    cut: function cut(e) {
      e.preventDefault();
      if (this.$refs.input.selectionStart !== this.$refs.input.selectionEnd) {
        try {
          document.execCommand('copy');
        } catch (err) {} // eslint-disable-line no-empty
        this.maskCore.backspace();
        this.updateToCoreState();
      }
    },
    copy: function copy() {},
    paste: function paste(e) {
      var _this2 = this;

      e.preventDefault();
      var text = e.clipboardData.getData('text');
      [].concat(_toConsumableArray(text)).reduce(function (memo, item) {
        return _this2.maskCore.input(item);
      }, null);
      this.updateToCoreState();
    },
    updateToCoreState: function updateToCoreState() {
      if (this.maskCore === null) {
        return;
      }
      if (this.$refs.input.value !== this.maskCore.getValue()) {
        this.$refs.input.value = this.maskCore.getValue();
        this.$emit('input', this.$refs.input.value, this.maskCore.getRawValue());
      }
      this.$refs.input.selectionStart = this.maskCore.selection.start;
      this.$refs.input.selectionEnd = this.maskCore.selection.end;
    },
    isEmpty: function isEmpty() {
      if (this.maskCore === null) return true;
      return this.maskCore.getValue() === this.maskCore.emptyValue;
    },
    focusOut: function focusOut() {
      if (this.isEmpty()) {
        this.$refs.input.value = '';
        this.maskCore.setSelection({
          start: 0,
          end: 0
        });
        this.$emit('input', '', '');
      }
    },
    setNativeSelection: function setNativeSelection() {
      this.maskCore.selection = {
        start: this.$refs.input.selectionStart,
        end: this.$refs.input.selectionEnd
      };
    },
    mouseUp: function mouseUp() {
      if (this.isEmpty() && this.$refs.input.selectionStart === this.$refs.input.selectionEnd) {
        this.maskCore.setSelection({
          start: 0,
          end: 0
        });
        this.$refs.input.selectionStart = this.maskCore.selection.start;
        this.$refs.input.selectionEnd = this.maskCore.selection.start;
        this.marginLeft = this.maskCore.selection.start;
        this.updateToCoreState();
      } else {
        this.setNativeSelection();
      }
    }
  }
});


/***/ }),

/***/ "./node_modules/vue/dist/vue.common.dev.js":
/*!*************************************************!*\
  !*** ./node_modules/vue/dist/vue.common.dev.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.6.12
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Generate a string containing static keys from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if (!config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (isUndef(target) || isPrimitive(target)
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var isUsingMicroTask = false;

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (!isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if (key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if (isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
      warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (!config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
      warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if (sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if (!(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.12';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false'
    ? 'false'
    // allow arbitrary string value for contenteditable
    : key === 'contenteditable' && isValidContentEditableValue(value)
      ? value
      : 'true'
};

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    if (oldVnode === vnode) {
      return
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        {
          checkDuplicateKeys(ch);
        }
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && value !== '' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */



/* eslint-disable no-unused-vars */
function baseWarn (msg, range) {
  console.error(("[Vue compiler]: " + msg));
}
/* eslint-enable no-unused-vars */

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

function addAttr (el, name, value, range, dynamic) {
  var attrs = dynamic
    ? (el.dynamicAttrs || (el.dynamicAttrs = []))
    : (el.attrs || (el.attrs = []));
  attrs.push(rangeSetItem({ name: name, value: value, dynamic: dynamic }, range));
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({ name: name, value: value }, range));
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  isDynamicArg,
  modifiers,
  range
) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker (symbol, name, dynamic) {
  return dynamic
    ? ("_p(" + name + ",\"" + symbol + "\")")
    : symbol + name // mark the event as captured
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn,
  range,
  dynamic
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.',
      range
    );
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({ value: value.trim(), dynamic: dynamic }, range);
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr (
  el,
  name
) {
  return el.rawAttrsMap[':' + name] ||
    el.rawAttrsMap['v-bind:' + name] ||
    el.rawAttrsMap[name]
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

function getAndRemoveAttrByRegex (
  el,
  name
) {
  var list = el.attrsList;
  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];
    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr
    }
  }
}

function rangeSetItem (
  item,
  range
) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }
    if (range.end != null) {
      item.end = range.end;
    }
  }
  return item
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: JSON.stringify(value),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len, str, chr, index$1, expressionPos, expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead.",
        el.rawAttrsMap['v-model']
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1 (event, handler, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

// #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1 (
  name,
  handler,
  capture,
  passive
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    };
  }
  target$1.addEventListener(
    name,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  name,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    name,
    handler._wrapper || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

var svgContainer;

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecessary `checked` update.
      cur !== oldProps[key]
    ) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

var whitespaceRE = /\s+/;

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  // JSDOM may return undefined for transition properties
  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

// Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors
function toMs (s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var isNotTextNode = function (c) { return c.tag || isAsyncPlaceholder(c); };

var isVShowDirective = function (d) { return d.name === 'show'; };

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode);
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  beforeMount: function beforeMount () {
    var this$1 = this;

    var update = this._update;
    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1);
      // force removing pass
      this$1.__patch__(
        this$1._vnode,
        this$1.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (e && e.target !== el) {
            return
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if (config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.',
        el.rawAttrsMap['class']
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.',
          el.rawAttrsMap['style']
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + (unicodeRegExp.source) + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being passed as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (!stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""), { start: index + html.length });
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
      if (options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    // Find the closest opened tag of the same type
    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (i > pos || !tagName &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag."),
            { start: stack[i].start, end: stack[i].end }
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:|^#/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;

var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;

var slotRE = /^v-slot(:|$)|^#/;

var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;

var invalidAttributeRE = /[\s"'<>\/=]/;

var decodeHTMLCached = cached(he.decode);

var emptySlotScopeToken = "_empty_";

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;
  maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement (element) {
    trimEndingWhitespace(element);
    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    }
    // tree management
    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        {
          checkRootConstraints(element);
        }
        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else {
        warnOnce(
          "Component template should contain exactly one root element. " +
          "If you are using v-if on multiple elements, " +
          "use v-else-if to chain them instead.",
          { start: element.start }
        );
      }
    }
    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"'
          ;(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }
        currentParent.children.push(element);
        element.parent = currentParent;
      }
    }

    // final children cleanup
    // filter out scoped slots
    element.children = element.children.filter(function (c) { return !(c).slotScope; });
    // remove trailing whitespace node again
    trimEndingWhitespace(element);

    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace (el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;
      while (
        (lastNode = el.children[el.children.length - 1]) &&
        lastNode.type === 3 &&
        lastNode.text === ' '
      ) {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints (el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce(
        "Cannot use <" + (el.tag) + "> as component root element because it may " +
        'contain multiple nodes.',
        { start: el.start }
      );
    }
    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce(
        'Cannot use v-for on stateful component root element because ' +
        'it renders multiple elements.',
        el.rawAttrsMap['v-for']
      );
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start (tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated
          }, {});
        }
        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2(
              "Invalid dynamic argument expression: attribute names cannot contain " +
              "spaces, quotes, <, >, / or =.",
              {
                start: attr.start + attr.name.indexOf("["),
                end: attr.start + attr.name.length
              }
            );
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.',
          { start: element.start }
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;
        {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end (tag, start, end$1) {
      var element = stack[stack.length - 1];
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      if (options.outputSourceRange) {
        element.end = end$1;
      }
      closeElement(element);
    },

    chars: function chars (text, start, end) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.',
              { start: start }
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored."),
              { start: start }
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }
      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }
        var res;
        var child;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }
        if (child) {
          if (options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }
          children.push(child);
        }
      }
    },
    comment: function comment (text, start, end) {
      // adding anything as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };
        if (options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }
        currentParent.children.push(child);
      }
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var list = el.attrsList;
  var len = list.length;
  if (len) {
    var attrs = el.attrs = new Array(len);
    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };
      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (
  element,
  options
) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = (
    !element.key &&
    !element.scopedSlots &&
    !element.attrsList.length
  );

  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
  return element
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    {
      if (el.tag === 'template') {
        warn$2(
          "<template> cannot be keyed. Place the key on real elements instead.",
          getRawBindingAttr(el, 'key')
        );
      }
      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;
        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2(
            "Do not use v-for index as key on <transition-group> children, " +
            "this is the same as not using keys.",
            getRawBindingAttr(el, 'key'),
            true /* tip */
          );
        }
      }
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$2(
        ("Invalid v-for expression: " + exp),
        el.rawAttrsMap['v-for']
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if.",
      el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored.",
          children[i]
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent (el) {
  var slotScope;
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */
    if (slotScope) {
      warn$2(
        "the \"scope\" attribute for scoped slots have been deprecated and " +
        "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
        "can also be used on plain elements in addition to <template> to " +
        "denote scoped slots.",
        el.rawAttrsMap['scope'],
        true
      );
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (el.attrsMap['v-for']) {
      warn$2(
        "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
        "(v-for takes higher priority). Use a wrapper <template> for the " +
        "scoped slot to make it clearer.",
        el.rawAttrsMap['slot-scope'],
        true
      );
    }
    el.slotScope = slotScope;
  }

  // slot="xxx"
  var slotTarget = getBindingAttr(el, 'slot');
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']);
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  }

  // 2.6 v-slot syntax
  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding) {
        {
          if (el.slotTarget || el.slotScope) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn$2(
              "<template v-slot> can only appear at the root level inside " +
              "the receiving component",
              el
            );
          }
        }
        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);
      if (slotBinding$1) {
        {
          if (!maybeComponent(el)) {
            warn$2(
              "v-slot can only be used on components or <template>.",
              slotBinding$1
            );
          }
          if (el.slotScope || el.slotTarget) {
            warn$2(
              "Unexpected mixed usage of different slot syntaxes.",
              el
            );
          }
          if (el.scopedSlots) {
            warn$2(
              "To avoid scope ambiguity, the default slot should also use " +
              "<template> syntax when there are other named slots.",
              slotBinding$1
            );
          }
        }
        // add the component's children to its default slot
        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken;
        // remove children as they are returned from scopedSlots now
        el.children = [];
        // mark el non-plain so data gets generated
        el.plain = false;
      }
    }
  }
}

function getSlotName (binding) {
  var name = binding.name.replace(slotRE, '');
  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else {
      warn$2(
        "v-slot shorthand syntax requires a slot name.",
        binding
      );
    }
  }
  return dynamicArgRE.test(name)
    // dynamic [name]
    ? { name: name.slice(1, -1), dynamic: true }
    // static name
    : { name: ("\"" + name + "\""), dynamic: false }
}

// handle <slot/> outlets
function processSlotOutlet (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead.",
        getRawBindingAttr(el, 'key')
      );
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''));
      // support .foo shorthand syntax for the .prop modifier
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        if (
          value.trim().length === 0
        ) {
          warn$2(
            ("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"")
          );
        }
        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");
            if (!isDynamic) {
              addHandler(
                el,
                ("update:" + (camelize(name))),
                syncGen,
                null,
                false,
                warn$2,
                list[i]
              );
              if (hyphenate(name) !== camelize(name)) {
                addHandler(
                  el,
                  ("update:" + (hyphenate(name))),
                  syncGen,
                  null,
                  false,
                  warn$2,
                  list[i]
                );
              }
            } else {
              // handler w/ dynamic event name
              addHandler(
                el,
                ("\"update:\"+(" + name + ")"),
                syncGen,
                null,
                false,
                warn$2,
                list[i],
                true // dynamic
              );
            }
          }
        }
        if ((modifiers && modifiers.prop) || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);
        if (isDynamic) {
          name = name.slice(1, -1);
        }
        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }
        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);
        if (name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.',
            list[i]
          );
        }
      }
      addAttr(el, name, JSON.stringify(value), list[i]);
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead.",
        el.rawAttrsMap['v-model']
      );
    }
    _el = _el.parent;
  }
}

/*  */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$1 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$1
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"), dir);
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"), dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative
) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";
  for (var name in events) {
    var handlerCode = genHandler(events[name]);
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }
  staticHandlers = "{" + (staticHandlers.slice(0, -1)) + "}";
  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + (dynamicHandlers.slice(0, -1)) + "])"
  } else {
    return prefix + staticHandlers
  }
}

function genHandler (handler) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return ("function($event){" + (isFunctionInvocation ? ("return " + (handler.value)) : handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : isFunctionInvocation
          ? ("return " + (handler.value))
          : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return (
    // make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" +
    (keys.map(genFilterCode).join('&&')) + ")return null;"
  )
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if (dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */





var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !!el.component || !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;
      if (!el.plain || (el.pre && state.maybeComponent(el))) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.
  var originalPreState = state.pre;
  if (el.pre) {
    state.pre = el.pre;
  }
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  state.pre = originalPreState;
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      state.warn(
        "v-once can only be used inside v-for that is keyed. ",
        el.rawAttrsMap['v-once']
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      el.rawAttrsMap['v-for'],
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:" + (genProps(el.attrs)) + ",";
  }
  // DOM props
  if (el.props) {
    data += "domProps:" + (genProps(el.props)) + ",";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el, el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.
  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + (el.tag) + "\"," + (genProps(el.dynamicAttrs)) + ")";
  }
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:" + (dir.isDynamicArg ? dir.arg : ("\"" + (dir.arg) + "\""))) : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (el.children.length !== 1 || ast.type !== 1) {
    state.warn(
      'Inline-template components must have exactly one child element.',
      { start: el.start }
    );
  }
  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  el,
  slots,
  state
) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return (
      slot.slotTargetDynamic ||
      slot.if ||
      slot.for ||
      containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    )
  });

  // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.
  var needsKey = !!el.if;

  // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.
  if (!needsForceUpdate) {
    var parent = el.parent;
    while (parent) {
      if (
        (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
        parent.for
      ) {
        needsForceUpdate = true;
        break
      }
      if (parent.if) {
        needsKey = true;
      }
      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots)
    .map(function (key) { return genScopedSlot(slots[key], state); })
    .join(',');

  return ("scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? (",null,false," + (hash(generatedSlots))) : "") + ")")
}

function hash(str) {
  var hash = 5381;
  var i = str.length;
  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0
}

function containsSlotChild (el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true
    }
    return el.children.some(containsSlotChild)
  }
  return false
}

function genScopedSlot (
  el,
  state
) {
  var isLegacySyntax = el.attrsMap['slot-scope'];
  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null")
  }
  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot)
  }
  var slotScope = el.slotScope === emptySlotScopeToken
    ? ""
    : String(el.slotScope);
  var fn = "function(" + slotScope + "){" +
    "return " + (el.tag === 'template'
      ? el.if && isLegacySyntax
        ? ("(" + (el.if) + ")?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  // reverse proxy v-slot without scope on this.$slots
  var reverseProxy = slotScope ? "" : ",proxy:true";
  return ("{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}")
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      var normalizationType = checkSkip
        ? state.maybeComponent(el$1) ? ",1" : ",0"
        : "";
      return ("" + ((altGenElement || genElement)(el$1, state)) + normalizationType)
    }
    var normalizationType$1 = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType$1 ? ("," + normalizationType$1) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } else if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs || el.dynamicAttrs
    ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) { return ({
        // slot props are camelized
        name: camelize(attr.name),
        value: attr.value,
        dynamic: attr.dynamic
      }); }))
    : null;
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var staticProps = "";
  var dynamicProps = "";
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);
    if (prop.dynamic) {
      dynamicProps += (prop.name) + "," + value + ",";
    } else {
      staticProps += "\"" + (prop.name) + "\":" + value + ",";
    }
  }
  staticProps = "{" + (staticProps.slice(0, -1)) + "}";
  if (dynamicProps) {
    return ("_d(" + staticProps + ",[" + (dynamicProps.slice(0, -1)) + "])")
  } else {
    return staticProps
  }
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */



// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode (node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          var range = node.rawAttrsMap[name];
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), warn, range);
          } else if (name === 'v-slot' || name[0] === '#') {
            checkFunctionParameterExpression(value, (name + "=\"" + value + "\""), warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), warn, range);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), warn, range);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent (exp, text, warn, range) {
  var stripped = exp.replace(stripStringRE, '');
  var keywordMatch = stripped.match(unaryOperatorsRE);
  if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
    warn(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim()),
      range
    );
  }
  checkExpression(exp, text, warn, range);
}

function checkFor (node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier (
  ident,
  type,
  text,
  warn,
  range
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      warn(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())), range);
    }
  }
}

function checkExpression (exp, text, warn, range) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      warn(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim()),
        range
      );
    } else {
      warn(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n",
        range
      );
    }
  }
}

function checkFunctionParameterExpression (exp, text, warn, range) {
  try {
    new Function(exp, '');
  } catch (e) {
    warn(
      "invalid function parameter expression: " + (e.message) + " in\n\n" +
      "    " + exp + "\n\n" +
      "  Raw expression: " + (text.trim()) + "\n",
      range
    );
  }
}

/*  */

var range = 2;

function generateCodeFrame (
  source,
  start,
  end
) {
  if ( start === void 0 ) start = 0;
  if ( end === void 0 ) end = source.length;

  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];
  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;
    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) { continue }
        res.push(("" + (j + 1) + (repeat$1(" ", 3 - String(j + 1).length)) + "|  " + (lines[j])));
        var lineLength = lines[j].length;
        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }
          count += lineLength + 1;
        }
      }
      break
    }
  }
  return res.join('\n')
}

function repeat$1 (str, n) {
  var result = '';
  if (n > 0) {
    while (true) { // eslint-disable-line
      if (n & 1) { result += str; }
      n >>>= 1;
      if (n <= 0) { break }
      str += str;
    }
  }
  return result
}

/*  */



function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1(
              "Error compiling template:\n\n" + (e.msg) + "\n\n" +
              generateCodeFrame(template, e.start, e.end),
              vm
            );
          });
        } else {
          warn$$1(
            "Error compiling template:\n\n" + template + "\n\n" +
            compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
            vm
          );
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) { return tip(e.msg, vm); });
        } else {
          compiled.tips.forEach(function (msg) { return tip(msg, vm); });
        }
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if (options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = { msg: msg };
            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }
              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }
            (tip ? tips : errors).push(data);
          };
        }
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;

      var compiled = baseCompile(template.trim(), finalOptions);
      {
        detectErrors(compiled.ast, warn);
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (!template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/vue/dist/vue.common.js":
/*!*********************************************!*\
  !*** ./node_modules/vue/dist/vue.common.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (false) {} else {
  module.exports = __webpack_require__(/*! ./vue.common.dev.js */ "./node_modules/vue/dist/vue.common.dev.js")
}


/***/ }),

/***/ "./node_modules/vuelidate/lib/index.js":
/*!*********************************************!*\
  !*** ./node_modules/vuelidate/lib/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vuelidate = Vuelidate;
Object.defineProperty(exports, "withParams", {
  enumerable: true,
  get: function get() {
    return _params.withParams;
  }
});
exports.default = exports.validationMixin = void 0;

var _vval = __webpack_require__(/*! ./vval */ "./node_modules/vuelidate/lib/vval.js");

var _params = __webpack_require__(/*! ./params */ "./node_modules/vuelidate/lib/params.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var NIL = function NIL() {
  return null;
};

var buildFromKeys = function buildFromKeys(keys, fn, keyFn) {
  return keys.reduce(function (build, key) {
    build[keyFn ? keyFn(key) : key] = fn(key);
    return build;
  }, {});
};

function isFunction(val) {
  return typeof val === 'function';
}

function isObject(val) {
  return val !== null && (_typeof(val) === 'object' || isFunction(val));
}

function isPromise(object) {
  return isObject(object) && isFunction(object.then);
}

var getPath = function getPath(ctx, obj, path, fallback) {
  if (typeof path === 'function') {
    return path.call(ctx, obj, fallback);
  }

  path = Array.isArray(path) ? path : path.split('.');

  for (var i = 0; i < path.length; i++) {
    if (obj && _typeof(obj) === 'object') {
      obj = obj[path[i]];
    } else {
      return fallback;
    }
  }

  return typeof obj === 'undefined' ? fallback : obj;
};

var __isVuelidateAsyncVm = '__isVuelidateAsyncVm';

function makePendingAsyncVm(Vue, promise) {
  var asyncVm = new Vue({
    data: {
      p: true,
      v: false
    }
  });
  promise.then(function (value) {
    asyncVm.p = false;
    asyncVm.v = value;
  }, function (error) {
    asyncVm.p = false;
    asyncVm.v = false;
    throw error;
  });
  asyncVm[__isVuelidateAsyncVm] = true;
  return asyncVm;
}

var validationGetters = {
  $invalid: function $invalid() {
    var _this = this;

    var proxy = this.proxy;
    return this.nestedKeys.some(function (nested) {
      return _this.refProxy(nested).$invalid;
    }) || this.ruleKeys.some(function (rule) {
      return !proxy[rule];
    });
  },
  $dirty: function $dirty() {
    var _this2 = this;

    if (this.dirty) {
      return true;
    }

    if (this.nestedKeys.length === 0) {
      return false;
    }

    return this.nestedKeys.every(function (key) {
      return _this2.refProxy(key).$dirty;
    });
  },
  $anyDirty: function $anyDirty() {
    var _this3 = this;

    if (this.dirty) {
      return true;
    }

    if (this.nestedKeys.length === 0) {
      return false;
    }

    return this.nestedKeys.some(function (key) {
      return _this3.refProxy(key).$anyDirty;
    });
  },
  $error: function $error() {
    return this.$dirty && !this.$pending && this.$invalid;
  },
  $anyError: function $anyError() {
    var _this4 = this;

    if (this.$error) return true;
    return this.nestedKeys.some(function (key) {
      return _this4.refProxy(key).$anyError;
    });
  },
  $pending: function $pending() {
    var _this5 = this;

    return this.ruleKeys.some(function (key) {
      return _this5.getRef(key).$pending;
    }) || this.nestedKeys.some(function (key) {
      return _this5.refProxy(key).$pending;
    });
  },
  $params: function $params() {
    var _this6 = this;

    var vals = this.validations;
    return _objectSpread({}, buildFromKeys(this.nestedKeys, function (key) {
      return vals[key] && vals[key].$params || null;
    }), {}, buildFromKeys(this.ruleKeys, function (key) {
      return _this6.getRef(key).$params;
    }));
  }
};

function setDirtyRecursive(newState) {
  this.dirty = newState;
  var proxy = this.proxy;
  var method = newState ? '$touch' : '$reset';
  this.nestedKeys.forEach(function (key) {
    proxy[key][method]();
  });
}

var validationMethods = {
  $touch: function $touch() {
    setDirtyRecursive.call(this, true);
  },
  $reset: function $reset() {
    setDirtyRecursive.call(this, false);
  },
  $flattenParams: function $flattenParams() {
    var proxy = this.proxy;
    var params = [];

    for (var key in this.$params) {
      if (this.isNested(key)) {
        var childParams = proxy[key].$flattenParams();

        for (var j = 0; j < childParams.length; j++) {
          childParams[j].path.unshift(key);
        }

        params = params.concat(childParams);
      } else {
        params.push({
          path: [],
          name: key,
          params: this.$params[key]
        });
      }
    }

    return params;
  }
};
var getterNames = Object.keys(validationGetters);
var methodNames = Object.keys(validationMethods);
var _cachedComponent = null;

var getComponent = function getComponent(Vue) {
  if (_cachedComponent) {
    return _cachedComponent;
  }

  var VBase = Vue.extend({
    computed: {
      refs: function refs() {
        var oldVval = this._vval;
        this._vval = this.children;
        (0, _vval.patchChildren)(oldVval, this._vval);
        var refs = {};

        this._vval.forEach(function (c) {
          refs[c.key] = c.vm;
        });

        return refs;
      }
    },
    beforeCreate: function beforeCreate() {
      this._vval = null;
    },
    beforeDestroy: function beforeDestroy() {
      if (this._vval) {
        (0, _vval.patchChildren)(this._vval);
        this._vval = null;
      }
    },
    methods: {
      getModel: function getModel() {
        return this.lazyModel ? this.lazyModel(this.prop) : this.model;
      },
      getModelKey: function getModelKey(key) {
        var model = this.getModel();

        if (model) {
          return model[key];
        }
      },
      hasIter: function hasIter() {
        return false;
      }
    }
  });
  var ValidationRule = VBase.extend({
    data: function data() {
      return {
        rule: null,
        lazyModel: null,
        model: null,
        lazyParentModel: null,
        rootModel: null
      };
    },
    methods: {
      runRule: function runRule(parent) {
        var model = this.getModel();
        (0, _params.pushParams)();
        var rawOutput = this.rule.call(this.rootModel, model, parent);
        var output = isPromise(rawOutput) ? makePendingAsyncVm(Vue, rawOutput) : rawOutput;
        var rawParams = (0, _params.popParams)();
        var params = rawParams && rawParams.$sub ? rawParams.$sub.length > 1 ? rawParams : rawParams.$sub[0] : null;
        return {
          output: output,
          params: params
        };
      }
    },
    computed: {
      run: function run() {
        var _this7 = this;

        var parent = this.lazyParentModel();

        var isArrayDependant = Array.isArray(parent) && parent.__ob__;

        if (isArrayDependant) {
          var arrayDep = parent.__ob__.dep;
          arrayDep.depend();
          var target = arrayDep.constructor.target;

          if (!this._indirectWatcher) {
            var Watcher = target.constructor;
            this._indirectWatcher = new Watcher(this, function () {
              return _this7.runRule(parent);
            }, null, {
              lazy: true
            });
          }

          var model = this.getModel();

          if (!this._indirectWatcher.dirty && this._lastModel === model) {
            this._indirectWatcher.depend();

            return target.value;
          }

          this._lastModel = model;

          this._indirectWatcher.evaluate();

          this._indirectWatcher.depend();
        } else if (this._indirectWatcher) {
          this._indirectWatcher.teardown();

          this._indirectWatcher = null;
        }

        return this._indirectWatcher ? this._indirectWatcher.value : this.runRule(parent);
      },
      $params: function $params() {
        return this.run.params;
      },
      proxy: function proxy() {
        var output = this.run.output;

        if (output[__isVuelidateAsyncVm]) {
          return !!output.v;
        }

        return !!output;
      },
      $pending: function $pending() {
        var output = this.run.output;

        if (output[__isVuelidateAsyncVm]) {
          return output.p;
        }

        return false;
      }
    },
    destroyed: function destroyed() {
      if (this._indirectWatcher) {
        this._indirectWatcher.teardown();

        this._indirectWatcher = null;
      }
    }
  });
  var Validation = VBase.extend({
    data: function data() {
      return {
        dirty: false,
        validations: null,
        lazyModel: null,
        model: null,
        prop: null,
        lazyParentModel: null,
        rootModel: null
      };
    },
    methods: _objectSpread({}, validationMethods, {
      refProxy: function refProxy(key) {
        return this.getRef(key).proxy;
      },
      getRef: function getRef(key) {
        return this.refs[key];
      },
      isNested: function isNested(key) {
        return typeof this.validations[key] !== 'function';
      }
    }),
    computed: _objectSpread({}, validationGetters, {
      nestedKeys: function nestedKeys() {
        return this.keys.filter(this.isNested);
      },
      ruleKeys: function ruleKeys() {
        var _this8 = this;

        return this.keys.filter(function (k) {
          return !_this8.isNested(k);
        });
      },
      keys: function keys() {
        return Object.keys(this.validations).filter(function (k) {
          return k !== '$params';
        });
      },
      proxy: function proxy() {
        var _this9 = this;

        var keyDefs = buildFromKeys(this.keys, function (key) {
          return {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _this9.refProxy(key);
            }
          };
        });
        var getterDefs = buildFromKeys(getterNames, function (key) {
          return {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _this9[key];
            }
          };
        });
        var methodDefs = buildFromKeys(methodNames, function (key) {
          return {
            enumerable: false,
            configurable: true,
            get: function get() {
              return _this9[key];
            }
          };
        });
        var iterDefs = this.hasIter() ? {
          $iter: {
            enumerable: true,
            value: Object.defineProperties({}, _objectSpread({}, keyDefs))
          }
        } : {};
        return Object.defineProperties({}, _objectSpread({}, keyDefs, {}, iterDefs, {
          $model: {
            enumerable: true,
            get: function get() {
              var parent = _this9.lazyParentModel();

              if (parent != null) {
                return parent[_this9.prop];
              } else {
                return null;
              }
            },
            set: function set(value) {
              var parent = _this9.lazyParentModel();

              if (parent != null) {
                parent[_this9.prop] = value;

                _this9.$touch();
              }
            }
          }
        }, getterDefs, {}, methodDefs));
      },
      children: function children() {
        var _this10 = this;

        return [].concat(_toConsumableArray(this.nestedKeys.map(function (key) {
          return renderNested(_this10, key);
        })), _toConsumableArray(this.ruleKeys.map(function (key) {
          return renderRule(_this10, key);
        }))).filter(Boolean);
      }
    })
  });
  var GroupValidation = Validation.extend({
    methods: {
      isNested: function isNested(key) {
        return typeof this.validations[key]() !== 'undefined';
      },
      getRef: function getRef(key) {
        var vm = this;
        return {
          get proxy() {
            return vm.validations[key]() || false;
          }

        };
      }
    }
  });
  var EachValidation = Validation.extend({
    computed: {
      keys: function keys() {
        var model = this.getModel();

        if (isObject(model)) {
          return Object.keys(model);
        } else {
          return [];
        }
      },
      tracker: function tracker() {
        var _this11 = this;

        var trackBy = this.validations.$trackBy;
        return trackBy ? function (key) {
          return "".concat(getPath(_this11.rootModel, _this11.getModelKey(key), trackBy));
        } : function (x) {
          return "".concat(x);
        };
      },
      getModelLazy: function getModelLazy() {
        var _this12 = this;

        return function () {
          return _this12.getModel();
        };
      },
      children: function children() {
        var _this13 = this;

        var def = this.validations;
        var model = this.getModel();

        var validations = _objectSpread({}, def);

        delete validations['$trackBy'];
        var usedTracks = {};
        return this.keys.map(function (key) {
          var track = _this13.tracker(key);

          if (usedTracks.hasOwnProperty(track)) {
            return null;
          }

          usedTracks[track] = true;
          return (0, _vval.h)(Validation, track, {
            validations: validations,
            prop: key,
            lazyParentModel: _this13.getModelLazy,
            model: model[key],
            rootModel: _this13.rootModel
          });
        }).filter(Boolean);
      }
    },
    methods: {
      isNested: function isNested() {
        return true;
      },
      getRef: function getRef(key) {
        return this.refs[this.tracker(key)];
      },
      hasIter: function hasIter() {
        return true;
      }
    }
  });

  var renderNested = function renderNested(vm, key) {
    if (key === '$each') {
      return (0, _vval.h)(EachValidation, key, {
        validations: vm.validations[key],
        lazyParentModel: vm.lazyParentModel,
        prop: key,
        lazyModel: vm.getModel,
        rootModel: vm.rootModel
      });
    }

    var validations = vm.validations[key];

    if (Array.isArray(validations)) {
      var root = vm.rootModel;
      var refVals = buildFromKeys(validations, function (path) {
        return function () {
          return getPath(root, root.$v, path);
        };
      }, function (v) {
        return Array.isArray(v) ? v.join('.') : v;
      });
      return (0, _vval.h)(GroupValidation, key, {
        validations: refVals,
        lazyParentModel: NIL,
        prop: key,
        lazyModel: NIL,
        rootModel: root
      });
    }

    return (0, _vval.h)(Validation, key, {
      validations: validations,
      lazyParentModel: vm.getModel,
      prop: key,
      lazyModel: vm.getModelKey,
      rootModel: vm.rootModel
    });
  };

  var renderRule = function renderRule(vm, key) {
    return (0, _vval.h)(ValidationRule, key, {
      rule: vm.validations[key],
      lazyParentModel: vm.lazyParentModel,
      lazyModel: vm.getModel,
      rootModel: vm.rootModel
    });
  };

  _cachedComponent = {
    VBase: VBase,
    Validation: Validation
  };
  return _cachedComponent;
};

var _cachedVue = null;

function getVue(rootVm) {
  if (_cachedVue) return _cachedVue;
  var Vue = rootVm.constructor;

  while (Vue.super) {
    Vue = Vue.super;
  }

  _cachedVue = Vue;
  return Vue;
}

var validateModel = function validateModel(model, validations) {
  var Vue = getVue(model);

  var _getComponent = getComponent(Vue),
      Validation = _getComponent.Validation,
      VBase = _getComponent.VBase;

  var root = new VBase({
    computed: {
      children: function children() {
        var vals = typeof validations === 'function' ? validations.call(model) : validations;
        return [(0, _vval.h)(Validation, '$v', {
          validations: vals,
          lazyParentModel: NIL,
          prop: '$v',
          model: model,
          rootModel: model
        })];
      }
    }
  });
  return root;
};

var validationMixin = {
  data: function data() {
    var vals = this.$options.validations;

    if (vals) {
      this._vuelidate = validateModel(this, vals);
    }

    return {};
  },
  beforeCreate: function beforeCreate() {
    var options = this.$options;
    var vals = options.validations;
    if (!vals) return;
    if (!options.computed) options.computed = {};
    if (options.computed.$v) return;

    options.computed.$v = function () {
      return this._vuelidate ? this._vuelidate.refs.$v.proxy : null;
    };
  },
  beforeDestroy: function beforeDestroy() {
    if (this._vuelidate) {
      this._vuelidate.$destroy();

      this._vuelidate = null;
    }
  }
};
exports.validationMixin = validationMixin;

function Vuelidate(Vue) {
  Vue.mixin(validationMixin);
}

var _default = Vuelidate;
exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/params.js":
/*!**********************************************!*\
  !*** ./node_modules/vuelidate/lib/params.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushParams = pushParams;
exports.popParams = popParams;
exports.withParams = withParams;
exports._setTarget = exports.target = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var stack = [];
var target = null;
exports.target = target;

var _setTarget = function _setTarget(x) {
  exports.target = target = x;
};

exports._setTarget = _setTarget;

function pushParams() {
  if (target !== null) {
    stack.push(target);
  }

  exports.target = target = {};
}

function popParams() {
  var lastTarget = target;
  var newTarget = exports.target = target = stack.pop() || null;

  if (newTarget) {
    if (!Array.isArray(newTarget.$sub)) {
      newTarget.$sub = [];
    }

    newTarget.$sub.push(lastTarget);
  }

  return lastTarget;
}

function addParams(params) {
  if (_typeof(params) === 'object' && !Array.isArray(params)) {
    exports.target = target = _objectSpread({}, target, {}, params);
  } else {
    throw new Error('params must be an object');
  }
}

function withParamsDirect(params, validator) {
  return withParamsClosure(function (add) {
    return function () {
      add(params);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return validator.apply(this, args);
    };
  });
}

function withParamsClosure(closure) {
  var validator = closure(addParams);
  return function () {
    pushParams();

    try {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return validator.apply(this, args);
    } finally {
      popParams();
    }
  };
}

function withParams(paramsOrClosure, maybeValidator) {
  if (_typeof(paramsOrClosure) === 'object' && maybeValidator !== undefined) {
    return withParamsDirect(paramsOrClosure, maybeValidator);
  }

  return withParamsClosure(paramsOrClosure);
}

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/alpha.js":
/*!********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/alpha.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = (0, _common.regex)('alpha', /^[a-zA-Z]*$/);

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/alphaNum.js":
/*!***********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/alphaNum.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = (0, _common.regex)('alphaNum', /^[a-zA-Z0-9]*$/);

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/and.js":
/*!******************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/and.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return (0, _common.withParams)({
    type: 'and'
  }, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return valid && fn.apply(_this, args);
    }, true);
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/between.js":
/*!**********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/between.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default(min, max) {
  return (0, _common.withParams)({
    type: 'between',
    min: min,
    max: max
  }, function (value) {
    return !(0, _common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +min <= +value && +max >= +value;
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/common.js":
/*!*********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/common.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withParams", {
  enumerable: true,
  get: function get() {
    return _withParams.default;
  }
});
exports.regex = exports.ref = exports.len = exports.req = void 0;

var _withParams = _interopRequireDefault(__webpack_require__(/*! ../withParams */ "./node_modules/vuelidate/lib/withParams.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var req = function req(value) {
  if (Array.isArray(value)) return !!value.length;

  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  if (_typeof(value) === 'object') {
    for (var _ in value) {
      return true;
    }

    return false;
  }

  return !!String(value).length;
};

exports.req = req;

var len = function len(value) {
  if (Array.isArray(value)) return value.length;

  if (_typeof(value) === 'object') {
    return Object.keys(value).length;
  }

  return String(value).length;
};

exports.len = len;

var ref = function ref(reference, vm, parentVm) {
  return typeof reference === 'function' ? reference.call(vm, parentVm) : parentVm[reference];
};

exports.ref = ref;

var regex = function regex(type, expr) {
  return (0, _withParams.default)({
    type: type
  }, function (value) {
    return !req(value) || expr.test(value);
  });
};

exports.regex = regex;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/decimal.js":
/*!**********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/decimal.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = (0, _common.regex)('decimal', /^[-]?\d*(\.\d+)?$/);

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/email.js":
/*!********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/email.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

var _default = (0, _common.regex)('email', emailRegex);

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/index.js":
/*!********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "alpha", {
  enumerable: true,
  get: function get() {
    return _alpha.default;
  }
});
Object.defineProperty(exports, "alphaNum", {
  enumerable: true,
  get: function get() {
    return _alphaNum.default;
  }
});
Object.defineProperty(exports, "numeric", {
  enumerable: true,
  get: function get() {
    return _numeric.default;
  }
});
Object.defineProperty(exports, "between", {
  enumerable: true,
  get: function get() {
    return _between.default;
  }
});
Object.defineProperty(exports, "email", {
  enumerable: true,
  get: function get() {
    return _email.default;
  }
});
Object.defineProperty(exports, "ipAddress", {
  enumerable: true,
  get: function get() {
    return _ipAddress.default;
  }
});
Object.defineProperty(exports, "macAddress", {
  enumerable: true,
  get: function get() {
    return _macAddress.default;
  }
});
Object.defineProperty(exports, "maxLength", {
  enumerable: true,
  get: function get() {
    return _maxLength.default;
  }
});
Object.defineProperty(exports, "minLength", {
  enumerable: true,
  get: function get() {
    return _minLength.default;
  }
});
Object.defineProperty(exports, "required", {
  enumerable: true,
  get: function get() {
    return _required.default;
  }
});
Object.defineProperty(exports, "requiredIf", {
  enumerable: true,
  get: function get() {
    return _requiredIf.default;
  }
});
Object.defineProperty(exports, "requiredUnless", {
  enumerable: true,
  get: function get() {
    return _requiredUnless.default;
  }
});
Object.defineProperty(exports, "sameAs", {
  enumerable: true,
  get: function get() {
    return _sameAs.default;
  }
});
Object.defineProperty(exports, "url", {
  enumerable: true,
  get: function get() {
    return _url.default;
  }
});
Object.defineProperty(exports, "or", {
  enumerable: true,
  get: function get() {
    return _or.default;
  }
});
Object.defineProperty(exports, "and", {
  enumerable: true,
  get: function get() {
    return _and.default;
  }
});
Object.defineProperty(exports, "not", {
  enumerable: true,
  get: function get() {
    return _not.default;
  }
});
Object.defineProperty(exports, "minValue", {
  enumerable: true,
  get: function get() {
    return _minValue.default;
  }
});
Object.defineProperty(exports, "maxValue", {
  enumerable: true,
  get: function get() {
    return _maxValue.default;
  }
});
Object.defineProperty(exports, "integer", {
  enumerable: true,
  get: function get() {
    return _integer.default;
  }
});
Object.defineProperty(exports, "decimal", {
  enumerable: true,
  get: function get() {
    return _decimal.default;
  }
});
exports.helpers = void 0;

var _alpha = _interopRequireDefault(__webpack_require__(/*! ./alpha */ "./node_modules/vuelidate/lib/validators/alpha.js"));

var _alphaNum = _interopRequireDefault(__webpack_require__(/*! ./alphaNum */ "./node_modules/vuelidate/lib/validators/alphaNum.js"));

var _numeric = _interopRequireDefault(__webpack_require__(/*! ./numeric */ "./node_modules/vuelidate/lib/validators/numeric.js"));

var _between = _interopRequireDefault(__webpack_require__(/*! ./between */ "./node_modules/vuelidate/lib/validators/between.js"));

var _email = _interopRequireDefault(__webpack_require__(/*! ./email */ "./node_modules/vuelidate/lib/validators/email.js"));

var _ipAddress = _interopRequireDefault(__webpack_require__(/*! ./ipAddress */ "./node_modules/vuelidate/lib/validators/ipAddress.js"));

var _macAddress = _interopRequireDefault(__webpack_require__(/*! ./macAddress */ "./node_modules/vuelidate/lib/validators/macAddress.js"));

var _maxLength = _interopRequireDefault(__webpack_require__(/*! ./maxLength */ "./node_modules/vuelidate/lib/validators/maxLength.js"));

var _minLength = _interopRequireDefault(__webpack_require__(/*! ./minLength */ "./node_modules/vuelidate/lib/validators/minLength.js"));

var _required = _interopRequireDefault(__webpack_require__(/*! ./required */ "./node_modules/vuelidate/lib/validators/required.js"));

var _requiredIf = _interopRequireDefault(__webpack_require__(/*! ./requiredIf */ "./node_modules/vuelidate/lib/validators/requiredIf.js"));

var _requiredUnless = _interopRequireDefault(__webpack_require__(/*! ./requiredUnless */ "./node_modules/vuelidate/lib/validators/requiredUnless.js"));

var _sameAs = _interopRequireDefault(__webpack_require__(/*! ./sameAs */ "./node_modules/vuelidate/lib/validators/sameAs.js"));

var _url = _interopRequireDefault(__webpack_require__(/*! ./url */ "./node_modules/vuelidate/lib/validators/url.js"));

var _or = _interopRequireDefault(__webpack_require__(/*! ./or */ "./node_modules/vuelidate/lib/validators/or.js"));

var _and = _interopRequireDefault(__webpack_require__(/*! ./and */ "./node_modules/vuelidate/lib/validators/and.js"));

var _not = _interopRequireDefault(__webpack_require__(/*! ./not */ "./node_modules/vuelidate/lib/validators/not.js"));

var _minValue = _interopRequireDefault(__webpack_require__(/*! ./minValue */ "./node_modules/vuelidate/lib/validators/minValue.js"));

var _maxValue = _interopRequireDefault(__webpack_require__(/*! ./maxValue */ "./node_modules/vuelidate/lib/validators/maxValue.js"));

var _integer = _interopRequireDefault(__webpack_require__(/*! ./integer */ "./node_modules/vuelidate/lib/validators/integer.js"));

var _decimal = _interopRequireDefault(__webpack_require__(/*! ./decimal */ "./node_modules/vuelidate/lib/validators/decimal.js"));

var helpers = _interopRequireWildcard(__webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js"));

exports.helpers = helpers;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/integer.js":
/*!**********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/integer.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = (0, _common.regex)('integer', /(^[0-9]*$)|(^-[0-9]+$)/);

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/ipAddress.js":
/*!************************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/ipAddress.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = (0, _common.withParams)({
  type: 'ipAddress'
}, function (value) {
  if (!(0, _common.req)(value)) {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  var nibbles = value.split('.');
  return nibbles.length === 4 && nibbles.every(nibbleValid);
});

exports.default = _default;

var nibbleValid = function nibbleValid(nibble) {
  if (nibble.length > 3 || nibble.length === 0) {
    return false;
  }

  if (nibble[0] === '0' && nibble !== '0') {
    return false;
  }

  if (!nibble.match(/^\d+$/)) {
    return false;
  }

  var numeric = +nibble | 0;
  return numeric >= 0 && numeric <= 255;
};

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/macAddress.js":
/*!*************************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/macAddress.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default() {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';
  return (0, _common.withParams)({
    type: 'macAddress'
  }, function (value) {
    if (!(0, _common.req)(value)) {
      return true;
    }

    if (typeof value !== 'string') {
      return false;
    }

    var parts = typeof separator === 'string' && separator !== '' ? value.split(separator) : value.length === 12 || value.length === 16 ? value.match(/.{2}/g) : null;
    return parts !== null && (parts.length === 6 || parts.length === 8) && parts.every(hexValid);
  });
};

exports.default = _default;

var hexValid = function hexValid(hex) {
  return hex.toLowerCase().match(/^[0-9a-f]{2}$/);
};

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/maxLength.js":
/*!************************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/maxLength.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default(length) {
  return (0, _common.withParams)({
    type: 'maxLength',
    max: length
  }, function (value) {
    return !(0, _common.req)(value) || (0, _common.len)(value) <= length;
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/maxValue.js":
/*!***********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/maxValue.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default(max) {
  return (0, _common.withParams)({
    type: 'maxValue',
    max: max
  }, function (value) {
    return !(0, _common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value <= +max;
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/minLength.js":
/*!************************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/minLength.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default(length) {
  return (0, _common.withParams)({
    type: 'minLength',
    min: length
  }, function (value) {
    return !(0, _common.req)(value) || (0, _common.len)(value) >= length;
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/minValue.js":
/*!***********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/minValue.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default(min) {
  return (0, _common.withParams)({
    type: 'minValue',
    min: min
  }, function (value) {
    return !(0, _common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value >= +min;
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/not.js":
/*!******************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/not.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default(validator) {
  return (0, _common.withParams)({
    type: 'not'
  }, function (value, vm) {
    return !(0, _common.req)(value) || !validator.call(this, value, vm);
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/numeric.js":
/*!**********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/numeric.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = (0, _common.regex)('numeric', /^[0-9]*$/);

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/or.js":
/*!*****************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/or.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return (0, _common.withParams)({
    type: 'or'
  }, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return valid || fn.apply(_this, args);
    }, false);
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/required.js":
/*!***********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/required.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = (0, _common.withParams)({
  type: 'required'
}, function (value) {
  if (typeof value === 'string') {
    return (0, _common.req)(value.trim());
  }

  return (0, _common.req)(value);
});

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/requiredIf.js":
/*!*************************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/requiredIf.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default(prop) {
  return (0, _common.withParams)({
    type: 'requiredIf',
    prop: prop
  }, function (value, parentVm) {
    return (0, _common.ref)(prop, this, parentVm) ? (0, _common.req)(value) : true;
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/requiredUnless.js":
/*!*****************************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/requiredUnless.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default(prop) {
  return (0, _common.withParams)({
    type: 'requiredUnless',
    prop: prop
  }, function (value, parentVm) {
    return !(0, _common.ref)(prop, this, parentVm) ? (0, _common.req)(value) : true;
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/sameAs.js":
/*!*********************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/sameAs.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var _default = function _default(equalTo) {
  return (0, _common.withParams)({
    type: 'sameAs',
    eq: equalTo
  }, function (value, parentVm) {
    return value === (0, _common.ref)(equalTo, this, parentVm);
  });
};

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/validators/url.js":
/*!******************************************************!*\
  !*** ./node_modules/vuelidate/lib/validators/url.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = __webpack_require__(/*! ./common */ "./node_modules/vuelidate/lib/validators/common.js");

var urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

var _default = (0, _common.regex)('url', urlRegex);

exports.default = _default;

/***/ }),

/***/ "./node_modules/vuelidate/lib/vval.js":
/*!********************************************!*\
  !*** ./node_modules/vuelidate/lib/vval.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patchChildren = patchChildren;
exports.h = h;

function isUndef(v) {
  return v === null || v === undefined;
}

function isDef(v) {
  return v !== null && v !== undefined;
}

function sameVval(oldVval, vval) {
  return vval.tag === oldVval.tag && vval.key === oldVval.key;
}

function createVm(vval) {
  var Vm = vval.tag;
  vval.vm = new Vm({
    data: vval.args
  });
}

function updateVval(vval) {
  var keys = Object.keys(vval.args);

  for (var i = 0; i < keys.length; i++) {
    keys.forEach(function (k) {
      vval.vm[k] = vval.args[k];
    });
  }
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) map[key] = i;
  }

  return map;
}

function updateChildren(oldCh, newCh) {
  var oldStartIdx = 0;
  var newStartIdx = 0;
  var oldEndIdx = oldCh.length - 1;
  var oldStartVval = oldCh[0];
  var oldEndVval = oldCh[oldEndIdx];
  var newEndIdx = newCh.length - 1;
  var newStartVval = newCh[0];
  var newEndVval = newCh[newEndIdx];
  var oldKeyToIdx, idxInOld, elmToMove;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVval)) {
      oldStartVval = oldCh[++oldStartIdx];
    } else if (isUndef(oldEndVval)) {
      oldEndVval = oldCh[--oldEndIdx];
    } else if (sameVval(oldStartVval, newStartVval)) {
      patchVval(oldStartVval, newStartVval);
      oldStartVval = oldCh[++oldStartIdx];
      newStartVval = newCh[++newStartIdx];
    } else if (sameVval(oldEndVval, newEndVval)) {
      patchVval(oldEndVval, newEndVval);
      oldEndVval = oldCh[--oldEndIdx];
      newEndVval = newCh[--newEndIdx];
    } else if (sameVval(oldStartVval, newEndVval)) {
      patchVval(oldStartVval, newEndVval);
      oldStartVval = oldCh[++oldStartIdx];
      newEndVval = newCh[--newEndIdx];
    } else if (sameVval(oldEndVval, newStartVval)) {
      patchVval(oldEndVval, newStartVval);
      oldEndVval = oldCh[--oldEndIdx];
      newStartVval = newCh[++newStartIdx];
    } else {
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      idxInOld = isDef(newStartVval.key) ? oldKeyToIdx[newStartVval.key] : null;

      if (isUndef(idxInOld)) {
        createVm(newStartVval);
        newStartVval = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];

        if (sameVval(elmToMove, newStartVval)) {
          patchVval(elmToMove, newStartVval);
          oldCh[idxInOld] = undefined;
          newStartVval = newCh[++newStartIdx];
        } else {
          createVm(newStartVval);
          newStartVval = newCh[++newStartIdx];
        }
      }
    }
  }

  if (oldStartIdx > oldEndIdx) {
    addVvals(newCh, newStartIdx, newEndIdx);
  } else if (newStartIdx > newEndIdx) {
    removeVvals(oldCh, oldStartIdx, oldEndIdx);
  }
}

function addVvals(vvals, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    createVm(vvals[startIdx]);
  }
}

function removeVvals(vvals, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    var ch = vvals[startIdx];

    if (isDef(ch)) {
      ch.vm.$destroy();
      ch.vm = null;
    }
  }
}

function patchVval(oldVval, vval) {
  if (oldVval === vval) {
    return;
  }

  vval.vm = oldVval.vm;
  updateVval(vval);
}

function patchChildren(oldCh, ch) {
  if (isDef(oldCh) && isDef(ch)) {
    if (oldCh !== ch) updateChildren(oldCh, ch);
  } else if (isDef(ch)) {
    addVvals(ch, 0, ch.length - 1);
  } else if (isDef(oldCh)) {
    removeVvals(oldCh, 0, oldCh.length - 1);
  }
}

function h(tag, key, args) {
  return {
    tag: tag,
    key: key,
    args: args
  };
}

/***/ }),

/***/ "./node_modules/vuelidate/lib/withParams.js":
/*!**************************************************!*\
  !*** ./node_modules/vuelidate/lib/withParams.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var withParams = process.env.BUILD === 'web' ? __webpack_require__(/*! ./withParamsBrowser */ "./node_modules/vuelidate/lib/withParamsBrowser.js").withParams : __webpack_require__(/*! ./params */ "./node_modules/vuelidate/lib/params.js").withParams;
var _default = withParams;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/vuelidate/lib/withParamsBrowser.js":
/*!*********************************************************!*\
  !*** ./node_modules/vuelidate/lib/withParamsBrowser.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withParams = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var root = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};

var fakeWithParams = function fakeWithParams(paramsOrClosure, maybeValidator) {
  if (_typeof(paramsOrClosure) === 'object' && maybeValidator !== undefined) {
    return maybeValidator;
  }

  return paramsOrClosure(function () {});
};

var withParams = root.vuelidate ? root.vuelidate.withParams : fakeWithParams;
exports.withParams = withParams;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/vuex/dist/vuex.esm.js":
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createLogger, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createLogger", function() { return createLogger; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.5.1
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index = {
  Store: Store,
  install: install,
  version: '3.5.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

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

/***/ "./resources/js/App.vue":
/*!******************************!*\
  !*** ./resources/js/App.vue ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App_vue_vue_type_template_id_f348271a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App.vue?vue&type=template&id=f348271a& */ "./resources/js/App.vue?vue&type=template&id=f348271a&");
/* harmony import */ var _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./App.vue?vue&type=script&lang=js& */ "./resources/js/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _App_vue_vue_type_template_id_f348271a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _App_vue_vue_type_template_id_f348271a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/App.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/App.vue?vue&type=script&lang=js&":
/*!*******************************************************!*\
  !*** ./resources/js/App.vue?vue&type=script&lang=js& ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--4-0!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/App.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/App.vue?vue&type=template&id=f348271a&":
/*!*************************************************************!*\
  !*** ./resources/js/App.vue?vue&type=template&id=f348271a& ***!
  \*************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_f348271a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vue-loader/lib??vue-loader-options!./App.vue?vue&type=template&id=f348271a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/App.vue?vue&type=template&id=f348271a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_f348271a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_App_vue_vue_type_template_id_f348271a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./resources/js/store/index.js");
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuelidate */ "./node_modules/vuelidate/lib/index.js");
/* harmony import */ var vuelidate__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuelidate__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_country_code__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-country-code */ "./node_modules/vue-country-code/dist/vue-country-code.js");
/* harmony import */ var vue_country_code__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_country_code__WEBPACK_IMPORTED_MODULE_2__);
window.Vue = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
Vue.component("App", __webpack_require__(/*! ./App.vue */ "./resources/js/App.vue")["default"]);


Vue.use(vuelidate__WEBPACK_IMPORTED_MODULE_1___default.a);

Vue.use(vue_country_code__WEBPACK_IMPORTED_MODULE_2___default.a);
var app = new Vue({
  el: "#app",
  store: _store__WEBPACK_IMPORTED_MODULE_0__["default"]
});

/***/ }),

/***/ "./resources/js/components/Form.vue":
/*!******************************************!*\
  !*** ./resources/js/components/Form.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Form_vue_vue_type_template_id_8048fca2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Form.vue?vue&type=template&id=8048fca2& */ "./resources/js/components/Form.vue?vue&type=template&id=8048fca2&");
/* harmony import */ var _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form.vue?vue&type=script&lang=js& */ "./resources/js/components/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Form_vue_vue_type_template_id_8048fca2___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Form_vue_vue_type_template_id_8048fca2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Form.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Form.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Form.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Form.vue?vue&type=template&id=8048fca2&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Form.vue?vue&type=template&id=8048fca2& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_8048fca2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Form.vue?vue&type=template&id=8048fca2& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Form.vue?vue&type=template&id=8048fca2&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_8048fca2___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Form_vue_vue_type_template_id_8048fca2___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/store/index.js":
/*!*************************************!*\
  !*** ./resources/js/store/index.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  state: {
    modal: false,
    success: false
  },
  getters: {
    isModal: function isModal(state) {
      return state.modal;
    },
    isSuccess: function isSuccess(state) {
      return state.success;
    }
  },
  mutations: {
    SET_MODAL: function SET_MODAL(state) {
      return state.modal = true;
    },
    UNSET_MODAL: function UNSET_MODAL(state) {
      return state.modal = false;
    },
    SET_SUCCESS: function SET_SUCCESS(state) {
      return state.success = true;
    },
    UNSET_SUCCESS: function UNSET_SUCCESS(state) {
      return state.success = false;
    }
  },
  actions: {
    setModal: function setModal(context) {
      return context.commit("SET_MODAL");
    },
    unsetModal: function unsetModal(context) {
      return context.commit("UNSET_MODAL");
    },
    setSuccess: function setSuccess(context) {
      return context.commit("SET_SUCCESS");
    },
    unsetSuccess: function unsetSuccess(context) {
      return context.commit("UNSET_SUCCESS");
    }
  }
}));

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\WebProjects\uppercase\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\WebProjects\uppercase\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });