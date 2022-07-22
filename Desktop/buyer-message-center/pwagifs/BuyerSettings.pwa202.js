(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["BuyerSettings"],{

/***/ "../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!***************************************************************************!*\
  !*** ../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "../node_modules/axios/index.js":
/*!**************************************!*\
  !*** ../node_modules/axios/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "../node_modules/axios/lib/axios.js");

/***/ }),

/***/ "../node_modules/axios/lib/adapters/xhr.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/adapters/xhr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "../node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "../node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "../node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "../node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "../node_modules/axios/lib/core/createError.js");
var transitionalDefaults = __webpack_require__(/*! ../defaults/transitional */ "../node_modules/axios/lib/defaults/transitional.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
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
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

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
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
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
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/axios.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/axios.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "../node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "../node_modules/axios/lib/defaults/index.js");

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

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "../node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");
axios.VERSION = __webpack_require__(/*! ./env/data */ "../node_modules/axios/lib/env/data.js").version;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "../node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "../node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/Cancel.js":
/*!**************************************************!*\
  !*** ../node_modules/axios/lib/cancel/Cancel.js ***!
  \**************************************************/
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

/***/ "../node_modules/axios/lib/cancel/CancelToken.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/cancel/CancelToken.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");

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

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

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
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
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

/***/ "../node_modules/axios/lib/cancel/isCancel.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/cancel/isCancel.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/Axios.js":
/*!***********************************************!*\
  !*** ../node_modules/axios/lib/core/Axios.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "../node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "../node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "../node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "../node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
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
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
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

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
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
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "../node_modules/axios/lib/core/InterceptorManager.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/core/InterceptorManager.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

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
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
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

/***/ "../node_modules/axios/lib/core/buildFullPath.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/buildFullPath.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "../node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "../node_modules/axios/lib/helpers/combineURLs.js");

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

/***/ "../node_modules/axios/lib/core/createError.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/createError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "../node_modules/axios/lib/core/enhanceError.js");

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

/***/ "../node_modules/axios/lib/core/dispatchRequest.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/core/dispatchRequest.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "../node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "../node_modules/axios/lib/defaults/index.js");
var Cancel = __webpack_require__(/*! ../cancel/Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
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
  config.data = transformData.call(
    config,
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
    response.data = transformData.call(
      config,
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
        reason.response.data = transformData.call(
          config,
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

/***/ "../node_modules/axios/lib/core/enhanceError.js":
/*!******************************************************!*\
  !*** ../node_modules/axios/lib/core/enhanceError.js ***!
  \******************************************************/
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

  error.toJSON = function toJSON() {
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
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/mergeConfig.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/mergeConfig.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

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

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/settle.js":
/*!************************************************!*\
  !*** ../node_modules/axios/lib/core/settle.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "../node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
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

/***/ "../node_modules/axios/lib/core/transformData.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/transformData.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ../defaults */ "../node_modules/axios/lib/defaults/index.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "../node_modules/axios/lib/defaults/index.js":
/*!***************************************************!*\
  !*** ../node_modules/axios/lib/defaults/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ../helpers/normalizeHeaderName */ "../node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "../node_modules/axios/lib/core/enhanceError.js");
var transitionalDefaults = __webpack_require__(/*! ./transitional */ "../node_modules/axios/lib/defaults/transitional.js");

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
    adapter = __webpack_require__(/*! ../adapters/xhr */ "../node_modules/axios/lib/adapters/xhr.js");
  } else if ( true && Object.prototype.toString.call(Object({"NODE_ENV":undefined})) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ../adapters/http */ "../node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: transitionalDefaults,

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
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
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
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "../node_modules/axios/lib/defaults/transitional.js":
/*!**********************************************************!*\
  !*** ../node_modules/axios/lib/defaults/transitional.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};


/***/ }),

/***/ "../node_modules/axios/lib/env/data.js":
/*!*********************************************!*\
  !*** ../node_modules/axios/lib/env/data.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  "version": "0.26.1"
};

/***/ }),

/***/ "../node_modules/axios/lib/helpers/bind.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/helpers/bind.js ***!
  \*************************************************/
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

/***/ "../node_modules/axios/lib/helpers/buildURL.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/buildURL.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
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

/***/ "../node_modules/axios/lib/helpers/combineURLs.js":
/*!********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/combineURLs.js ***!
  \********************************************************/
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

/***/ "../node_modules/axios/lib/helpers/cookies.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/cookies.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

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

/***/ "../node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!**********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \**********************************************************/
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
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isAxiosError.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isAxiosError.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

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

/***/ "../node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!****************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/parseHeaders.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/parseHeaders.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

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

/***/ "../node_modules/axios/lib/helpers/spread.js":
/*!***************************************************!*\
  !*** ../node_modules/axios/lib/helpers/spread.js ***!
  \***************************************************/
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

/***/ "../node_modules/axios/lib/helpers/validator.js":
/*!******************************************************!*\
  !*** ../node_modules/axios/lib/helpers/validator.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VERSION = __webpack_require__(/*! ../env/data */ "../node_modules/axios/lib/env/data.js").version;

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "../node_modules/axios/lib/utils.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/utils.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
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
  return toString.call(val) === '[object FormData]';
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
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
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
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
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
  return toString.call(val) === '[object URLSearchParams]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
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
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
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

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
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
  isPlainObject: isPlainObject,
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
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "../node_modules/he/he.js":
/*!********************************!*\
  !*** ../node_modules/he/he.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	// All astral symbols.
	var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
	// All ASCII symbols (not just printable ASCII) except those listed in the
	// first column of the overrides table.
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides
	var regexAsciiWhitelist = /[\x01-\x7F]/g;
	// All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
	// code points listed in the first column of the overrides table on
	// https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.
	var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;

	var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
	var encodeMap = {'\xAD':'shy','\u200C':'zwnj','\u200D':'zwj','\u200E':'lrm','\u2063':'ic','\u2062':'it','\u2061':'af','\u200F':'rlm','\u200B':'ZeroWidthSpace','\u2060':'NoBreak','\u0311':'DownBreve','\u20DB':'tdot','\u20DC':'DotDot','\t':'Tab','\n':'NewLine','\u2008':'puncsp','\u205F':'MediumSpace','\u2009':'thinsp','\u200A':'hairsp','\u2004':'emsp13','\u2002':'ensp','\u2005':'emsp14','\u2003':'emsp','\u2007':'numsp','\xA0':'nbsp','\u205F\u200A':'ThickSpace','\u203E':'oline','_':'lowbar','\u2010':'dash','\u2013':'ndash','\u2014':'mdash','\u2015':'horbar',',':'comma',';':'semi','\u204F':'bsemi',':':'colon','\u2A74':'Colone','!':'excl','\xA1':'iexcl','?':'quest','\xBF':'iquest','.':'period','\u2025':'nldr','\u2026':'mldr','\xB7':'middot','\'':'apos','\u2018':'lsquo','\u2019':'rsquo','\u201A':'sbquo','\u2039':'lsaquo','\u203A':'rsaquo','"':'quot','\u201C':'ldquo','\u201D':'rdquo','\u201E':'bdquo','\xAB':'laquo','\xBB':'raquo','(':'lpar',')':'rpar','[':'lsqb',']':'rsqb','{':'lcub','}':'rcub','\u2308':'lceil','\u2309':'rceil','\u230A':'lfloor','\u230B':'rfloor','\u2985':'lopar','\u2986':'ropar','\u298B':'lbrke','\u298C':'rbrke','\u298D':'lbrkslu','\u298E':'rbrksld','\u298F':'lbrksld','\u2990':'rbrkslu','\u2991':'langd','\u2992':'rangd','\u2993':'lparlt','\u2994':'rpargt','\u2995':'gtlPar','\u2996':'ltrPar','\u27E6':'lobrk','\u27E7':'robrk','\u27E8':'lang','\u27E9':'rang','\u27EA':'Lang','\u27EB':'Rang','\u27EC':'loang','\u27ED':'roang','\u2772':'lbbrk','\u2773':'rbbrk','\u2016':'Vert','\xA7':'sect','\xB6':'para','@':'commat','*':'ast','/':'sol','undefined':null,'&':'amp','#':'num','%':'percnt','\u2030':'permil','\u2031':'pertenk','\u2020':'dagger','\u2021':'Dagger','\u2022':'bull','\u2043':'hybull','\u2032':'prime','\u2033':'Prime','\u2034':'tprime','\u2057':'qprime','\u2035':'bprime','\u2041':'caret','`':'grave','\xB4':'acute','\u02DC':'tilde','^':'Hat','\xAF':'macr','\u02D8':'breve','\u02D9':'dot','\xA8':'die','\u02DA':'ring','\u02DD':'dblac','\xB8':'cedil','\u02DB':'ogon','\u02C6':'circ','\u02C7':'caron','\xB0':'deg','\xA9':'copy','\xAE':'reg','\u2117':'copysr','\u2118':'wp','\u211E':'rx','\u2127':'mho','\u2129':'iiota','\u2190':'larr','\u219A':'nlarr','\u2192':'rarr','\u219B':'nrarr','\u2191':'uarr','\u2193':'darr','\u2194':'harr','\u21AE':'nharr','\u2195':'varr','\u2196':'nwarr','\u2197':'nearr','\u2198':'searr','\u2199':'swarr','\u219D':'rarrw','\u219D\u0338':'nrarrw','\u219E':'Larr','\u219F':'Uarr','\u21A0':'Rarr','\u21A1':'Darr','\u21A2':'larrtl','\u21A3':'rarrtl','\u21A4':'mapstoleft','\u21A5':'mapstoup','\u21A6':'map','\u21A7':'mapstodown','\u21A9':'larrhk','\u21AA':'rarrhk','\u21AB':'larrlp','\u21AC':'rarrlp','\u21AD':'harrw','\u21B0':'lsh','\u21B1':'rsh','\u21B2':'ldsh','\u21B3':'rdsh','\u21B5':'crarr','\u21B6':'cularr','\u21B7':'curarr','\u21BA':'olarr','\u21BB':'orarr','\u21BC':'lharu','\u21BD':'lhard','\u21BE':'uharr','\u21BF':'uharl','\u21C0':'rharu','\u21C1':'rhard','\u21C2':'dharr','\u21C3':'dharl','\u21C4':'rlarr','\u21C5':'udarr','\u21C6':'lrarr','\u21C7':'llarr','\u21C8':'uuarr','\u21C9':'rrarr','\u21CA':'ddarr','\u21CB':'lrhar','\u21CC':'rlhar','\u21D0':'lArr','\u21CD':'nlArr','\u21D1':'uArr','\u21D2':'rArr','\u21CF':'nrArr','\u21D3':'dArr','\u21D4':'iff','\u21CE':'nhArr','\u21D5':'vArr','\u21D6':'nwArr','\u21D7':'neArr','\u21D8':'seArr','\u21D9':'swArr','\u21DA':'lAarr','\u21DB':'rAarr','\u21DD':'zigrarr','\u21E4':'larrb','\u21E5':'rarrb','\u21F5':'duarr','\u21FD':'loarr','\u21FE':'roarr','\u21FF':'hoarr','\u2200':'forall','\u2201':'comp','\u2202':'part','\u2202\u0338':'npart','\u2203':'exist','\u2204':'nexist','\u2205':'empty','\u2207':'Del','\u2208':'in','\u2209':'notin','\u220B':'ni','\u220C':'notni','\u03F6':'bepsi','\u220F':'prod','\u2210':'coprod','\u2211':'sum','+':'plus','\xB1':'pm','\xF7':'div','\xD7':'times','<':'lt','\u226E':'nlt','<\u20D2':'nvlt','=':'equals','\u2260':'ne','=\u20E5':'bne','\u2A75':'Equal','>':'gt','\u226F':'ngt','>\u20D2':'nvgt','\xAC':'not','|':'vert','\xA6':'brvbar','\u2212':'minus','\u2213':'mp','\u2214':'plusdo','\u2044':'frasl','\u2216':'setmn','\u2217':'lowast','\u2218':'compfn','\u221A':'Sqrt','\u221D':'prop','\u221E':'infin','\u221F':'angrt','\u2220':'ang','\u2220\u20D2':'nang','\u2221':'angmsd','\u2222':'angsph','\u2223':'mid','\u2224':'nmid','\u2225':'par','\u2226':'npar','\u2227':'and','\u2228':'or','\u2229':'cap','\u2229\uFE00':'caps','\u222A':'cup','\u222A\uFE00':'cups','\u222B':'int','\u222C':'Int','\u222D':'tint','\u2A0C':'qint','\u222E':'oint','\u222F':'Conint','\u2230':'Cconint','\u2231':'cwint','\u2232':'cwconint','\u2233':'awconint','\u2234':'there4','\u2235':'becaus','\u2236':'ratio','\u2237':'Colon','\u2238':'minusd','\u223A':'mDDot','\u223B':'homtht','\u223C':'sim','\u2241':'nsim','\u223C\u20D2':'nvsim','\u223D':'bsim','\u223D\u0331':'race','\u223E':'ac','\u223E\u0333':'acE','\u223F':'acd','\u2240':'wr','\u2242':'esim','\u2242\u0338':'nesim','\u2243':'sime','\u2244':'nsime','\u2245':'cong','\u2247':'ncong','\u2246':'simne','\u2248':'ap','\u2249':'nap','\u224A':'ape','\u224B':'apid','\u224B\u0338':'napid','\u224C':'bcong','\u224D':'CupCap','\u226D':'NotCupCap','\u224D\u20D2':'nvap','\u224E':'bump','\u224E\u0338':'nbump','\u224F':'bumpe','\u224F\u0338':'nbumpe','\u2250':'doteq','\u2250\u0338':'nedot','\u2251':'eDot','\u2252':'efDot','\u2253':'erDot','\u2254':'colone','\u2255':'ecolon','\u2256':'ecir','\u2257':'cire','\u2259':'wedgeq','\u225A':'veeeq','\u225C':'trie','\u225F':'equest','\u2261':'equiv','\u2262':'nequiv','\u2261\u20E5':'bnequiv','\u2264':'le','\u2270':'nle','\u2264\u20D2':'nvle','\u2265':'ge','\u2271':'nge','\u2265\u20D2':'nvge','\u2266':'lE','\u2266\u0338':'nlE','\u2267':'gE','\u2267\u0338':'ngE','\u2268\uFE00':'lvnE','\u2268':'lnE','\u2269':'gnE','\u2269\uFE00':'gvnE','\u226A':'ll','\u226A\u0338':'nLtv','\u226A\u20D2':'nLt','\u226B':'gg','\u226B\u0338':'nGtv','\u226B\u20D2':'nGt','\u226C':'twixt','\u2272':'lsim','\u2274':'nlsim','\u2273':'gsim','\u2275':'ngsim','\u2276':'lg','\u2278':'ntlg','\u2277':'gl','\u2279':'ntgl','\u227A':'pr','\u2280':'npr','\u227B':'sc','\u2281':'nsc','\u227C':'prcue','\u22E0':'nprcue','\u227D':'sccue','\u22E1':'nsccue','\u227E':'prsim','\u227F':'scsim','\u227F\u0338':'NotSucceedsTilde','\u2282':'sub','\u2284':'nsub','\u2282\u20D2':'vnsub','\u2283':'sup','\u2285':'nsup','\u2283\u20D2':'vnsup','\u2286':'sube','\u2288':'nsube','\u2287':'supe','\u2289':'nsupe','\u228A\uFE00':'vsubne','\u228A':'subne','\u228B\uFE00':'vsupne','\u228B':'supne','\u228D':'cupdot','\u228E':'uplus','\u228F':'sqsub','\u228F\u0338':'NotSquareSubset','\u2290':'sqsup','\u2290\u0338':'NotSquareSuperset','\u2291':'sqsube','\u22E2':'nsqsube','\u2292':'sqsupe','\u22E3':'nsqsupe','\u2293':'sqcap','\u2293\uFE00':'sqcaps','\u2294':'sqcup','\u2294\uFE00':'sqcups','\u2295':'oplus','\u2296':'ominus','\u2297':'otimes','\u2298':'osol','\u2299':'odot','\u229A':'ocir','\u229B':'oast','\u229D':'odash','\u229E':'plusb','\u229F':'minusb','\u22A0':'timesb','\u22A1':'sdotb','\u22A2':'vdash','\u22AC':'nvdash','\u22A3':'dashv','\u22A4':'top','\u22A5':'bot','\u22A7':'models','\u22A8':'vDash','\u22AD':'nvDash','\u22A9':'Vdash','\u22AE':'nVdash','\u22AA':'Vvdash','\u22AB':'VDash','\u22AF':'nVDash','\u22B0':'prurel','\u22B2':'vltri','\u22EA':'nltri','\u22B3':'vrtri','\u22EB':'nrtri','\u22B4':'ltrie','\u22EC':'nltrie','\u22B4\u20D2':'nvltrie','\u22B5':'rtrie','\u22ED':'nrtrie','\u22B5\u20D2':'nvrtrie','\u22B6':'origof','\u22B7':'imof','\u22B8':'mumap','\u22B9':'hercon','\u22BA':'intcal','\u22BB':'veebar','\u22BD':'barvee','\u22BE':'angrtvb','\u22BF':'lrtri','\u22C0':'Wedge','\u22C1':'Vee','\u22C2':'xcap','\u22C3':'xcup','\u22C4':'diam','\u22C5':'sdot','\u22C6':'Star','\u22C7':'divonx','\u22C8':'bowtie','\u22C9':'ltimes','\u22CA':'rtimes','\u22CB':'lthree','\u22CC':'rthree','\u22CD':'bsime','\u22CE':'cuvee','\u22CF':'cuwed','\u22D0':'Sub','\u22D1':'Sup','\u22D2':'Cap','\u22D3':'Cup','\u22D4':'fork','\u22D5':'epar','\u22D6':'ltdot','\u22D7':'gtdot','\u22D8':'Ll','\u22D8\u0338':'nLl','\u22D9':'Gg','\u22D9\u0338':'nGg','\u22DA\uFE00':'lesg','\u22DA':'leg','\u22DB':'gel','\u22DB\uFE00':'gesl','\u22DE':'cuepr','\u22DF':'cuesc','\u22E6':'lnsim','\u22E7':'gnsim','\u22E8':'prnsim','\u22E9':'scnsim','\u22EE':'vellip','\u22EF':'ctdot','\u22F0':'utdot','\u22F1':'dtdot','\u22F2':'disin','\u22F3':'isinsv','\u22F4':'isins','\u22F5':'isindot','\u22F5\u0338':'notindot','\u22F6':'notinvc','\u22F7':'notinvb','\u22F9':'isinE','\u22F9\u0338':'notinE','\u22FA':'nisd','\u22FB':'xnis','\u22FC':'nis','\u22FD':'notnivc','\u22FE':'notnivb','\u2305':'barwed','\u2306':'Barwed','\u230C':'drcrop','\u230D':'dlcrop','\u230E':'urcrop','\u230F':'ulcrop','\u2310':'bnot','\u2312':'profline','\u2313':'profsurf','\u2315':'telrec','\u2316':'target','\u231C':'ulcorn','\u231D':'urcorn','\u231E':'dlcorn','\u231F':'drcorn','\u2322':'frown','\u2323':'smile','\u232D':'cylcty','\u232E':'profalar','\u2336':'topbot','\u233D':'ovbar','\u233F':'solbar','\u237C':'angzarr','\u23B0':'lmoust','\u23B1':'rmoust','\u23B4':'tbrk','\u23B5':'bbrk','\u23B6':'bbrktbrk','\u23DC':'OverParenthesis','\u23DD':'UnderParenthesis','\u23DE':'OverBrace','\u23DF':'UnderBrace','\u23E2':'trpezium','\u23E7':'elinters','\u2423':'blank','\u2500':'boxh','\u2502':'boxv','\u250C':'boxdr','\u2510':'boxdl','\u2514':'boxur','\u2518':'boxul','\u251C':'boxvr','\u2524':'boxvl','\u252C':'boxhd','\u2534':'boxhu','\u253C':'boxvh','\u2550':'boxH','\u2551':'boxV','\u2552':'boxdR','\u2553':'boxDr','\u2554':'boxDR','\u2555':'boxdL','\u2556':'boxDl','\u2557':'boxDL','\u2558':'boxuR','\u2559':'boxUr','\u255A':'boxUR','\u255B':'boxuL','\u255C':'boxUl','\u255D':'boxUL','\u255E':'boxvR','\u255F':'boxVr','\u2560':'boxVR','\u2561':'boxvL','\u2562':'boxVl','\u2563':'boxVL','\u2564':'boxHd','\u2565':'boxhD','\u2566':'boxHD','\u2567':'boxHu','\u2568':'boxhU','\u2569':'boxHU','\u256A':'boxvH','\u256B':'boxVh','\u256C':'boxVH','\u2580':'uhblk','\u2584':'lhblk','\u2588':'block','\u2591':'blk14','\u2592':'blk12','\u2593':'blk34','\u25A1':'squ','\u25AA':'squf','\u25AB':'EmptyVerySmallSquare','\u25AD':'rect','\u25AE':'marker','\u25B1':'fltns','\u25B3':'xutri','\u25B4':'utrif','\u25B5':'utri','\u25B8':'rtrif','\u25B9':'rtri','\u25BD':'xdtri','\u25BE':'dtrif','\u25BF':'dtri','\u25C2':'ltrif','\u25C3':'ltri','\u25CA':'loz','\u25CB':'cir','\u25EC':'tridot','\u25EF':'xcirc','\u25F8':'ultri','\u25F9':'urtri','\u25FA':'lltri','\u25FB':'EmptySmallSquare','\u25FC':'FilledSmallSquare','\u2605':'starf','\u2606':'star','\u260E':'phone','\u2640':'female','\u2642':'male','\u2660':'spades','\u2663':'clubs','\u2665':'hearts','\u2666':'diams','\u266A':'sung','\u2713':'check','\u2717':'cross','\u2720':'malt','\u2736':'sext','\u2758':'VerticalSeparator','\u27C8':'bsolhsub','\u27C9':'suphsol','\u27F5':'xlarr','\u27F6':'xrarr','\u27F7':'xharr','\u27F8':'xlArr','\u27F9':'xrArr','\u27FA':'xhArr','\u27FC':'xmap','\u27FF':'dzigrarr','\u2902':'nvlArr','\u2903':'nvrArr','\u2904':'nvHarr','\u2905':'Map','\u290C':'lbarr','\u290D':'rbarr','\u290E':'lBarr','\u290F':'rBarr','\u2910':'RBarr','\u2911':'DDotrahd','\u2912':'UpArrowBar','\u2913':'DownArrowBar','\u2916':'Rarrtl','\u2919':'latail','\u291A':'ratail','\u291B':'lAtail','\u291C':'rAtail','\u291D':'larrfs','\u291E':'rarrfs','\u291F':'larrbfs','\u2920':'rarrbfs','\u2923':'nwarhk','\u2924':'nearhk','\u2925':'searhk','\u2926':'swarhk','\u2927':'nwnear','\u2928':'toea','\u2929':'tosa','\u292A':'swnwar','\u2933':'rarrc','\u2933\u0338':'nrarrc','\u2935':'cudarrr','\u2936':'ldca','\u2937':'rdca','\u2938':'cudarrl','\u2939':'larrpl','\u293C':'curarrm','\u293D':'cularrp','\u2945':'rarrpl','\u2948':'harrcir','\u2949':'Uarrocir','\u294A':'lurdshar','\u294B':'ldrushar','\u294E':'LeftRightVector','\u294F':'RightUpDownVector','\u2950':'DownLeftRightVector','\u2951':'LeftUpDownVector','\u2952':'LeftVectorBar','\u2953':'RightVectorBar','\u2954':'RightUpVectorBar','\u2955':'RightDownVectorBar','\u2956':'DownLeftVectorBar','\u2957':'DownRightVectorBar','\u2958':'LeftUpVectorBar','\u2959':'LeftDownVectorBar','\u295A':'LeftTeeVector','\u295B':'RightTeeVector','\u295C':'RightUpTeeVector','\u295D':'RightDownTeeVector','\u295E':'DownLeftTeeVector','\u295F':'DownRightTeeVector','\u2960':'LeftUpTeeVector','\u2961':'LeftDownTeeVector','\u2962':'lHar','\u2963':'uHar','\u2964':'rHar','\u2965':'dHar','\u2966':'luruhar','\u2967':'ldrdhar','\u2968':'ruluhar','\u2969':'rdldhar','\u296A':'lharul','\u296B':'llhard','\u296C':'rharul','\u296D':'lrhard','\u296E':'udhar','\u296F':'duhar','\u2970':'RoundImplies','\u2971':'erarr','\u2972':'simrarr','\u2973':'larrsim','\u2974':'rarrsim','\u2975':'rarrap','\u2976':'ltlarr','\u2978':'gtrarr','\u2979':'subrarr','\u297B':'suplarr','\u297C':'lfisht','\u297D':'rfisht','\u297E':'ufisht','\u297F':'dfisht','\u299A':'vzigzag','\u299C':'vangrt','\u299D':'angrtvbd','\u29A4':'ange','\u29A5':'range','\u29A6':'dwangle','\u29A7':'uwangle','\u29A8':'angmsdaa','\u29A9':'angmsdab','\u29AA':'angmsdac','\u29AB':'angmsdad','\u29AC':'angmsdae','\u29AD':'angmsdaf','\u29AE':'angmsdag','\u29AF':'angmsdah','\u29B0':'bemptyv','\u29B1':'demptyv','\u29B2':'cemptyv','\u29B3':'raemptyv','\u29B4':'laemptyv','\u29B5':'ohbar','\u29B6':'omid','\u29B7':'opar','\u29B9':'operp','\u29BB':'olcross','\u29BC':'odsold','\u29BE':'olcir','\u29BF':'ofcir','\u29C0':'olt','\u29C1':'ogt','\u29C2':'cirscir','\u29C3':'cirE','\u29C4':'solb','\u29C5':'bsolb','\u29C9':'boxbox','\u29CD':'trisb','\u29CE':'rtriltri','\u29CF':'LeftTriangleBar','\u29CF\u0338':'NotLeftTriangleBar','\u29D0':'RightTriangleBar','\u29D0\u0338':'NotRightTriangleBar','\u29DC':'iinfin','\u29DD':'infintie','\u29DE':'nvinfin','\u29E3':'eparsl','\u29E4':'smeparsl','\u29E5':'eqvparsl','\u29EB':'lozf','\u29F4':'RuleDelayed','\u29F6':'dsol','\u2A00':'xodot','\u2A01':'xoplus','\u2A02':'xotime','\u2A04':'xuplus','\u2A06':'xsqcup','\u2A0D':'fpartint','\u2A10':'cirfnint','\u2A11':'awint','\u2A12':'rppolint','\u2A13':'scpolint','\u2A14':'npolint','\u2A15':'pointint','\u2A16':'quatint','\u2A17':'intlarhk','\u2A22':'pluscir','\u2A23':'plusacir','\u2A24':'simplus','\u2A25':'plusdu','\u2A26':'plussim','\u2A27':'plustwo','\u2A29':'mcomma','\u2A2A':'minusdu','\u2A2D':'loplus','\u2A2E':'roplus','\u2A2F':'Cross','\u2A30':'timesd','\u2A31':'timesbar','\u2A33':'smashp','\u2A34':'lotimes','\u2A35':'rotimes','\u2A36':'otimesas','\u2A37':'Otimes','\u2A38':'odiv','\u2A39':'triplus','\u2A3A':'triminus','\u2A3B':'tritime','\u2A3C':'iprod','\u2A3F':'amalg','\u2A40':'capdot','\u2A42':'ncup','\u2A43':'ncap','\u2A44':'capand','\u2A45':'cupor','\u2A46':'cupcap','\u2A47':'capcup','\u2A48':'cupbrcap','\u2A49':'capbrcup','\u2A4A':'cupcup','\u2A4B':'capcap','\u2A4C':'ccups','\u2A4D':'ccaps','\u2A50':'ccupssm','\u2A53':'And','\u2A54':'Or','\u2A55':'andand','\u2A56':'oror','\u2A57':'orslope','\u2A58':'andslope','\u2A5A':'andv','\u2A5B':'orv','\u2A5C':'andd','\u2A5D':'ord','\u2A5F':'wedbar','\u2A66':'sdote','\u2A6A':'simdot','\u2A6D':'congdot','\u2A6D\u0338':'ncongdot','\u2A6E':'easter','\u2A6F':'apacir','\u2A70':'apE','\u2A70\u0338':'napE','\u2A71':'eplus','\u2A72':'pluse','\u2A73':'Esim','\u2A77':'eDDot','\u2A78':'equivDD','\u2A79':'ltcir','\u2A7A':'gtcir','\u2A7B':'ltquest','\u2A7C':'gtquest','\u2A7D':'les','\u2A7D\u0338':'nles','\u2A7E':'ges','\u2A7E\u0338':'nges','\u2A7F':'lesdot','\u2A80':'gesdot','\u2A81':'lesdoto','\u2A82':'gesdoto','\u2A83':'lesdotor','\u2A84':'gesdotol','\u2A85':'lap','\u2A86':'gap','\u2A87':'lne','\u2A88':'gne','\u2A89':'lnap','\u2A8A':'gnap','\u2A8B':'lEg','\u2A8C':'gEl','\u2A8D':'lsime','\u2A8E':'gsime','\u2A8F':'lsimg','\u2A90':'gsiml','\u2A91':'lgE','\u2A92':'glE','\u2A93':'lesges','\u2A94':'gesles','\u2A95':'els','\u2A96':'egs','\u2A97':'elsdot','\u2A98':'egsdot','\u2A99':'el','\u2A9A':'eg','\u2A9D':'siml','\u2A9E':'simg','\u2A9F':'simlE','\u2AA0':'simgE','\u2AA1':'LessLess','\u2AA1\u0338':'NotNestedLessLess','\u2AA2':'GreaterGreater','\u2AA2\u0338':'NotNestedGreaterGreater','\u2AA4':'glj','\u2AA5':'gla','\u2AA6':'ltcc','\u2AA7':'gtcc','\u2AA8':'lescc','\u2AA9':'gescc','\u2AAA':'smt','\u2AAB':'lat','\u2AAC':'smte','\u2AAC\uFE00':'smtes','\u2AAD':'late','\u2AAD\uFE00':'lates','\u2AAE':'bumpE','\u2AAF':'pre','\u2AAF\u0338':'npre','\u2AB0':'sce','\u2AB0\u0338':'nsce','\u2AB3':'prE','\u2AB4':'scE','\u2AB5':'prnE','\u2AB6':'scnE','\u2AB7':'prap','\u2AB8':'scap','\u2AB9':'prnap','\u2ABA':'scnap','\u2ABB':'Pr','\u2ABC':'Sc','\u2ABD':'subdot','\u2ABE':'supdot','\u2ABF':'subplus','\u2AC0':'supplus','\u2AC1':'submult','\u2AC2':'supmult','\u2AC3':'subedot','\u2AC4':'supedot','\u2AC5':'subE','\u2AC5\u0338':'nsubE','\u2AC6':'supE','\u2AC6\u0338':'nsupE','\u2AC7':'subsim','\u2AC8':'supsim','\u2ACB\uFE00':'vsubnE','\u2ACB':'subnE','\u2ACC\uFE00':'vsupnE','\u2ACC':'supnE','\u2ACF':'csub','\u2AD0':'csup','\u2AD1':'csube','\u2AD2':'csupe','\u2AD3':'subsup','\u2AD4':'supsub','\u2AD5':'subsub','\u2AD6':'supsup','\u2AD7':'suphsub','\u2AD8':'supdsub','\u2AD9':'forkv','\u2ADA':'topfork','\u2ADB':'mlcp','\u2AE4':'Dashv','\u2AE6':'Vdashl','\u2AE7':'Barv','\u2AE8':'vBar','\u2AE9':'vBarv','\u2AEB':'Vbar','\u2AEC':'Not','\u2AED':'bNot','\u2AEE':'rnmid','\u2AEF':'cirmid','\u2AF0':'midcir','\u2AF1':'topcir','\u2AF2':'nhpar','\u2AF3':'parsim','\u2AFD':'parsl','\u2AFD\u20E5':'nparsl','\u266D':'flat','\u266E':'natur','\u266F':'sharp','\xA4':'curren','\xA2':'cent','$':'dollar','\xA3':'pound','\xA5':'yen','\u20AC':'euro','\xB9':'sup1','\xBD':'half','\u2153':'frac13','\xBC':'frac14','\u2155':'frac15','\u2159':'frac16','\u215B':'frac18','\xB2':'sup2','\u2154':'frac23','\u2156':'frac25','\xB3':'sup3','\xBE':'frac34','\u2157':'frac35','\u215C':'frac38','\u2158':'frac45','\u215A':'frac56','\u215D':'frac58','\u215E':'frac78','\uD835\uDCB6':'ascr','\uD835\uDD52':'aopf','\uD835\uDD1E':'afr','\uD835\uDD38':'Aopf','\uD835\uDD04':'Afr','\uD835\uDC9C':'Ascr','\xAA':'ordf','\xE1':'aacute','\xC1':'Aacute','\xE0':'agrave','\xC0':'Agrave','\u0103':'abreve','\u0102':'Abreve','\xE2':'acirc','\xC2':'Acirc','\xE5':'aring','\xC5':'angst','\xE4':'auml','\xC4':'Auml','\xE3':'atilde','\xC3':'Atilde','\u0105':'aogon','\u0104':'Aogon','\u0101':'amacr','\u0100':'Amacr','\xE6':'aelig','\xC6':'AElig','\uD835\uDCB7':'bscr','\uD835\uDD53':'bopf','\uD835\uDD1F':'bfr','\uD835\uDD39':'Bopf','\u212C':'Bscr','\uD835\uDD05':'Bfr','\uD835\uDD20':'cfr','\uD835\uDCB8':'cscr','\uD835\uDD54':'copf','\u212D':'Cfr','\uD835\uDC9E':'Cscr','\u2102':'Copf','\u0107':'cacute','\u0106':'Cacute','\u0109':'ccirc','\u0108':'Ccirc','\u010D':'ccaron','\u010C':'Ccaron','\u010B':'cdot','\u010A':'Cdot','\xE7':'ccedil','\xC7':'Ccedil','\u2105':'incare','\uD835\uDD21':'dfr','\u2146':'dd','\uD835\uDD55':'dopf','\uD835\uDCB9':'dscr','\uD835\uDC9F':'Dscr','\uD835\uDD07':'Dfr','\u2145':'DD','\uD835\uDD3B':'Dopf','\u010F':'dcaron','\u010E':'Dcaron','\u0111':'dstrok','\u0110':'Dstrok','\xF0':'eth','\xD0':'ETH','\u2147':'ee','\u212F':'escr','\uD835\uDD22':'efr','\uD835\uDD56':'eopf','\u2130':'Escr','\uD835\uDD08':'Efr','\uD835\uDD3C':'Eopf','\xE9':'eacute','\xC9':'Eacute','\xE8':'egrave','\xC8':'Egrave','\xEA':'ecirc','\xCA':'Ecirc','\u011B':'ecaron','\u011A':'Ecaron','\xEB':'euml','\xCB':'Euml','\u0117':'edot','\u0116':'Edot','\u0119':'eogon','\u0118':'Eogon','\u0113':'emacr','\u0112':'Emacr','\uD835\uDD23':'ffr','\uD835\uDD57':'fopf','\uD835\uDCBB':'fscr','\uD835\uDD09':'Ffr','\uD835\uDD3D':'Fopf','\u2131':'Fscr','\uFB00':'fflig','\uFB03':'ffilig','\uFB04':'ffllig','\uFB01':'filig','fj':'fjlig','\uFB02':'fllig','\u0192':'fnof','\u210A':'gscr','\uD835\uDD58':'gopf','\uD835\uDD24':'gfr','\uD835\uDCA2':'Gscr','\uD835\uDD3E':'Gopf','\uD835\uDD0A':'Gfr','\u01F5':'gacute','\u011F':'gbreve','\u011E':'Gbreve','\u011D':'gcirc','\u011C':'Gcirc','\u0121':'gdot','\u0120':'Gdot','\u0122':'Gcedil','\uD835\uDD25':'hfr','\u210E':'planckh','\uD835\uDCBD':'hscr','\uD835\uDD59':'hopf','\u210B':'Hscr','\u210C':'Hfr','\u210D':'Hopf','\u0125':'hcirc','\u0124':'Hcirc','\u210F':'hbar','\u0127':'hstrok','\u0126':'Hstrok','\uD835\uDD5A':'iopf','\uD835\uDD26':'ifr','\uD835\uDCBE':'iscr','\u2148':'ii','\uD835\uDD40':'Iopf','\u2110':'Iscr','\u2111':'Im','\xED':'iacute','\xCD':'Iacute','\xEC':'igrave','\xCC':'Igrave','\xEE':'icirc','\xCE':'Icirc','\xEF':'iuml','\xCF':'Iuml','\u0129':'itilde','\u0128':'Itilde','\u0130':'Idot','\u012F':'iogon','\u012E':'Iogon','\u012B':'imacr','\u012A':'Imacr','\u0133':'ijlig','\u0132':'IJlig','\u0131':'imath','\uD835\uDCBF':'jscr','\uD835\uDD5B':'jopf','\uD835\uDD27':'jfr','\uD835\uDCA5':'Jscr','\uD835\uDD0D':'Jfr','\uD835\uDD41':'Jopf','\u0135':'jcirc','\u0134':'Jcirc','\u0237':'jmath','\uD835\uDD5C':'kopf','\uD835\uDCC0':'kscr','\uD835\uDD28':'kfr','\uD835\uDCA6':'Kscr','\uD835\uDD42':'Kopf','\uD835\uDD0E':'Kfr','\u0137':'kcedil','\u0136':'Kcedil','\uD835\uDD29':'lfr','\uD835\uDCC1':'lscr','\u2113':'ell','\uD835\uDD5D':'lopf','\u2112':'Lscr','\uD835\uDD0F':'Lfr','\uD835\uDD43':'Lopf','\u013A':'lacute','\u0139':'Lacute','\u013E':'lcaron','\u013D':'Lcaron','\u013C':'lcedil','\u013B':'Lcedil','\u0142':'lstrok','\u0141':'Lstrok','\u0140':'lmidot','\u013F':'Lmidot','\uD835\uDD2A':'mfr','\uD835\uDD5E':'mopf','\uD835\uDCC2':'mscr','\uD835\uDD10':'Mfr','\uD835\uDD44':'Mopf','\u2133':'Mscr','\uD835\uDD2B':'nfr','\uD835\uDD5F':'nopf','\uD835\uDCC3':'nscr','\u2115':'Nopf','\uD835\uDCA9':'Nscr','\uD835\uDD11':'Nfr','\u0144':'nacute','\u0143':'Nacute','\u0148':'ncaron','\u0147':'Ncaron','\xF1':'ntilde','\xD1':'Ntilde','\u0146':'ncedil','\u0145':'Ncedil','\u2116':'numero','\u014B':'eng','\u014A':'ENG','\uD835\uDD60':'oopf','\uD835\uDD2C':'ofr','\u2134':'oscr','\uD835\uDCAA':'Oscr','\uD835\uDD12':'Ofr','\uD835\uDD46':'Oopf','\xBA':'ordm','\xF3':'oacute','\xD3':'Oacute','\xF2':'ograve','\xD2':'Ograve','\xF4':'ocirc','\xD4':'Ocirc','\xF6':'ouml','\xD6':'Ouml','\u0151':'odblac','\u0150':'Odblac','\xF5':'otilde','\xD5':'Otilde','\xF8':'oslash','\xD8':'Oslash','\u014D':'omacr','\u014C':'Omacr','\u0153':'oelig','\u0152':'OElig','\uD835\uDD2D':'pfr','\uD835\uDCC5':'pscr','\uD835\uDD61':'popf','\u2119':'Popf','\uD835\uDD13':'Pfr','\uD835\uDCAB':'Pscr','\uD835\uDD62':'qopf','\uD835\uDD2E':'qfr','\uD835\uDCC6':'qscr','\uD835\uDCAC':'Qscr','\uD835\uDD14':'Qfr','\u211A':'Qopf','\u0138':'kgreen','\uD835\uDD2F':'rfr','\uD835\uDD63':'ropf','\uD835\uDCC7':'rscr','\u211B':'Rscr','\u211C':'Re','\u211D':'Ropf','\u0155':'racute','\u0154':'Racute','\u0159':'rcaron','\u0158':'Rcaron','\u0157':'rcedil','\u0156':'Rcedil','\uD835\uDD64':'sopf','\uD835\uDCC8':'sscr','\uD835\uDD30':'sfr','\uD835\uDD4A':'Sopf','\uD835\uDD16':'Sfr','\uD835\uDCAE':'Sscr','\u24C8':'oS','\u015B':'sacute','\u015A':'Sacute','\u015D':'scirc','\u015C':'Scirc','\u0161':'scaron','\u0160':'Scaron','\u015F':'scedil','\u015E':'Scedil','\xDF':'szlig','\uD835\uDD31':'tfr','\uD835\uDCC9':'tscr','\uD835\uDD65':'topf','\uD835\uDCAF':'Tscr','\uD835\uDD17':'Tfr','\uD835\uDD4B':'Topf','\u0165':'tcaron','\u0164':'Tcaron','\u0163':'tcedil','\u0162':'Tcedil','\u2122':'trade','\u0167':'tstrok','\u0166':'Tstrok','\uD835\uDCCA':'uscr','\uD835\uDD66':'uopf','\uD835\uDD32':'ufr','\uD835\uDD4C':'Uopf','\uD835\uDD18':'Ufr','\uD835\uDCB0':'Uscr','\xFA':'uacute','\xDA':'Uacute','\xF9':'ugrave','\xD9':'Ugrave','\u016D':'ubreve','\u016C':'Ubreve','\xFB':'ucirc','\xDB':'Ucirc','\u016F':'uring','\u016E':'Uring','\xFC':'uuml','\xDC':'Uuml','\u0171':'udblac','\u0170':'Udblac','\u0169':'utilde','\u0168':'Utilde','\u0173':'uogon','\u0172':'Uogon','\u016B':'umacr','\u016A':'Umacr','\uD835\uDD33':'vfr','\uD835\uDD67':'vopf','\uD835\uDCCB':'vscr','\uD835\uDD19':'Vfr','\uD835\uDD4D':'Vopf','\uD835\uDCB1':'Vscr','\uD835\uDD68':'wopf','\uD835\uDCCC':'wscr','\uD835\uDD34':'wfr','\uD835\uDCB2':'Wscr','\uD835\uDD4E':'Wopf','\uD835\uDD1A':'Wfr','\u0175':'wcirc','\u0174':'Wcirc','\uD835\uDD35':'xfr','\uD835\uDCCD':'xscr','\uD835\uDD69':'xopf','\uD835\uDD4F':'Xopf','\uD835\uDD1B':'Xfr','\uD835\uDCB3':'Xscr','\uD835\uDD36':'yfr','\uD835\uDCCE':'yscr','\uD835\uDD6A':'yopf','\uD835\uDCB4':'Yscr','\uD835\uDD1C':'Yfr','\uD835\uDD50':'Yopf','\xFD':'yacute','\xDD':'Yacute','\u0177':'ycirc','\u0176':'Ycirc','\xFF':'yuml','\u0178':'Yuml','\uD835\uDCCF':'zscr','\uD835\uDD37':'zfr','\uD835\uDD6B':'zopf','\u2128':'Zfr','\u2124':'Zopf','\uD835\uDCB5':'Zscr','\u017A':'zacute','\u0179':'Zacute','\u017E':'zcaron','\u017D':'Zcaron','\u017C':'zdot','\u017B':'Zdot','\u01B5':'imped','\xFE':'thorn','\xDE':'THORN','\u0149':'napos','\u03B1':'alpha','\u0391':'Alpha','\u03B2':'beta','\u0392':'Beta','\u03B3':'gamma','\u0393':'Gamma','\u03B4':'delta','\u0394':'Delta','\u03B5':'epsi','\u03F5':'epsiv','\u0395':'Epsilon','\u03DD':'gammad','\u03DC':'Gammad','\u03B6':'zeta','\u0396':'Zeta','\u03B7':'eta','\u0397':'Eta','\u03B8':'theta','\u03D1':'thetav','\u0398':'Theta','\u03B9':'iota','\u0399':'Iota','\u03BA':'kappa','\u03F0':'kappav','\u039A':'Kappa','\u03BB':'lambda','\u039B':'Lambda','\u03BC':'mu','\xB5':'micro','\u039C':'Mu','\u03BD':'nu','\u039D':'Nu','\u03BE':'xi','\u039E':'Xi','\u03BF':'omicron','\u039F':'Omicron','\u03C0':'pi','\u03D6':'piv','\u03A0':'Pi','\u03C1':'rho','\u03F1':'rhov','\u03A1':'Rho','\u03C3':'sigma','\u03A3':'Sigma','\u03C2':'sigmaf','\u03C4':'tau','\u03A4':'Tau','\u03C5':'upsi','\u03A5':'Upsilon','\u03D2':'Upsi','\u03C6':'phi','\u03D5':'phiv','\u03A6':'Phi','\u03C7':'chi','\u03A7':'Chi','\u03C8':'psi','\u03A8':'Psi','\u03C9':'omega','\u03A9':'ohm','\u0430':'acy','\u0410':'Acy','\u0431':'bcy','\u0411':'Bcy','\u0432':'vcy','\u0412':'Vcy','\u0433':'gcy','\u0413':'Gcy','\u0453':'gjcy','\u0403':'GJcy','\u0434':'dcy','\u0414':'Dcy','\u0452':'djcy','\u0402':'DJcy','\u0435':'iecy','\u0415':'IEcy','\u0451':'iocy','\u0401':'IOcy','\u0454':'jukcy','\u0404':'Jukcy','\u0436':'zhcy','\u0416':'ZHcy','\u0437':'zcy','\u0417':'Zcy','\u0455':'dscy','\u0405':'DScy','\u0438':'icy','\u0418':'Icy','\u0456':'iukcy','\u0406':'Iukcy','\u0457':'yicy','\u0407':'YIcy','\u0439':'jcy','\u0419':'Jcy','\u0458':'jsercy','\u0408':'Jsercy','\u043A':'kcy','\u041A':'Kcy','\u045C':'kjcy','\u040C':'KJcy','\u043B':'lcy','\u041B':'Lcy','\u0459':'ljcy','\u0409':'LJcy','\u043C':'mcy','\u041C':'Mcy','\u043D':'ncy','\u041D':'Ncy','\u045A':'njcy','\u040A':'NJcy','\u043E':'ocy','\u041E':'Ocy','\u043F':'pcy','\u041F':'Pcy','\u0440':'rcy','\u0420':'Rcy','\u0441':'scy','\u0421':'Scy','\u0442':'tcy','\u0422':'Tcy','\u045B':'tshcy','\u040B':'TSHcy','\u0443':'ucy','\u0423':'Ucy','\u045E':'ubrcy','\u040E':'Ubrcy','\u0444':'fcy','\u0424':'Fcy','\u0445':'khcy','\u0425':'KHcy','\u0446':'tscy','\u0426':'TScy','\u0447':'chcy','\u0427':'CHcy','\u045F':'dzcy','\u040F':'DZcy','\u0448':'shcy','\u0428':'SHcy','\u0449':'shchcy','\u0429':'SHCHcy','\u044A':'hardcy','\u042A':'HARDcy','\u044B':'ycy','\u042B':'Ycy','\u044C':'softcy','\u042C':'SOFTcy','\u044D':'ecy','\u042D':'Ecy','\u044E':'yucy','\u042E':'YUcy','\u044F':'yacy','\u042F':'YAcy','\u2135':'aleph','\u2136':'beth','\u2137':'gimel','\u2138':'daleth'};

	var regexEscape = /["&'<>`]/g;
	var escapeMap = {
		'"': '&quot;',
		'&': '&amp;',
		'\'': '&#x27;',
		'<': '&lt;',
		// See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
		// following is not strictly necessary unless it’s part of a tag or an
		// unquoted attribute value. We’re only escaping it to support those
		// situations, and for XML support.
		'>': '&gt;',
		// In Internet Explorer ≤ 8, the backtick character can be used
		// to break out of (un)quoted attribute values or HTML comments.
		// See http://html5sec.org/#102, http://html5sec.org/#108, and
		// http://html5sec.org/#133.
		'`': '&#x60;'
	};

	var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
	var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
	var decodeMap = {'aacute':'\xE1','Aacute':'\xC1','abreve':'\u0103','Abreve':'\u0102','ac':'\u223E','acd':'\u223F','acE':'\u223E\u0333','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','acy':'\u0430','Acy':'\u0410','aelig':'\xE6','AElig':'\xC6','af':'\u2061','afr':'\uD835\uDD1E','Afr':'\uD835\uDD04','agrave':'\xE0','Agrave':'\xC0','alefsym':'\u2135','aleph':'\u2135','alpha':'\u03B1','Alpha':'\u0391','amacr':'\u0101','Amacr':'\u0100','amalg':'\u2A3F','amp':'&','AMP':'&','and':'\u2227','And':'\u2A53','andand':'\u2A55','andd':'\u2A5C','andslope':'\u2A58','andv':'\u2A5A','ang':'\u2220','ange':'\u29A4','angle':'\u2220','angmsd':'\u2221','angmsdaa':'\u29A8','angmsdab':'\u29A9','angmsdac':'\u29AA','angmsdad':'\u29AB','angmsdae':'\u29AC','angmsdaf':'\u29AD','angmsdag':'\u29AE','angmsdah':'\u29AF','angrt':'\u221F','angrtvb':'\u22BE','angrtvbd':'\u299D','angsph':'\u2222','angst':'\xC5','angzarr':'\u237C','aogon':'\u0105','Aogon':'\u0104','aopf':'\uD835\uDD52','Aopf':'\uD835\uDD38','ap':'\u2248','apacir':'\u2A6F','ape':'\u224A','apE':'\u2A70','apid':'\u224B','apos':'\'','ApplyFunction':'\u2061','approx':'\u2248','approxeq':'\u224A','aring':'\xE5','Aring':'\xC5','ascr':'\uD835\uDCB6','Ascr':'\uD835\uDC9C','Assign':'\u2254','ast':'*','asymp':'\u2248','asympeq':'\u224D','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','awconint':'\u2233','awint':'\u2A11','backcong':'\u224C','backepsilon':'\u03F6','backprime':'\u2035','backsim':'\u223D','backsimeq':'\u22CD','Backslash':'\u2216','Barv':'\u2AE7','barvee':'\u22BD','barwed':'\u2305','Barwed':'\u2306','barwedge':'\u2305','bbrk':'\u23B5','bbrktbrk':'\u23B6','bcong':'\u224C','bcy':'\u0431','Bcy':'\u0411','bdquo':'\u201E','becaus':'\u2235','because':'\u2235','Because':'\u2235','bemptyv':'\u29B0','bepsi':'\u03F6','bernou':'\u212C','Bernoullis':'\u212C','beta':'\u03B2','Beta':'\u0392','beth':'\u2136','between':'\u226C','bfr':'\uD835\uDD1F','Bfr':'\uD835\uDD05','bigcap':'\u22C2','bigcirc':'\u25EF','bigcup':'\u22C3','bigodot':'\u2A00','bigoplus':'\u2A01','bigotimes':'\u2A02','bigsqcup':'\u2A06','bigstar':'\u2605','bigtriangledown':'\u25BD','bigtriangleup':'\u25B3','biguplus':'\u2A04','bigvee':'\u22C1','bigwedge':'\u22C0','bkarow':'\u290D','blacklozenge':'\u29EB','blacksquare':'\u25AA','blacktriangle':'\u25B4','blacktriangledown':'\u25BE','blacktriangleleft':'\u25C2','blacktriangleright':'\u25B8','blank':'\u2423','blk12':'\u2592','blk14':'\u2591','blk34':'\u2593','block':'\u2588','bne':'=\u20E5','bnequiv':'\u2261\u20E5','bnot':'\u2310','bNot':'\u2AED','bopf':'\uD835\uDD53','Bopf':'\uD835\uDD39','bot':'\u22A5','bottom':'\u22A5','bowtie':'\u22C8','boxbox':'\u29C9','boxdl':'\u2510','boxdL':'\u2555','boxDl':'\u2556','boxDL':'\u2557','boxdr':'\u250C','boxdR':'\u2552','boxDr':'\u2553','boxDR':'\u2554','boxh':'\u2500','boxH':'\u2550','boxhd':'\u252C','boxhD':'\u2565','boxHd':'\u2564','boxHD':'\u2566','boxhu':'\u2534','boxhU':'\u2568','boxHu':'\u2567','boxHU':'\u2569','boxminus':'\u229F','boxplus':'\u229E','boxtimes':'\u22A0','boxul':'\u2518','boxuL':'\u255B','boxUl':'\u255C','boxUL':'\u255D','boxur':'\u2514','boxuR':'\u2558','boxUr':'\u2559','boxUR':'\u255A','boxv':'\u2502','boxV':'\u2551','boxvh':'\u253C','boxvH':'\u256A','boxVh':'\u256B','boxVH':'\u256C','boxvl':'\u2524','boxvL':'\u2561','boxVl':'\u2562','boxVL':'\u2563','boxvr':'\u251C','boxvR':'\u255E','boxVr':'\u255F','boxVR':'\u2560','bprime':'\u2035','breve':'\u02D8','Breve':'\u02D8','brvbar':'\xA6','bscr':'\uD835\uDCB7','Bscr':'\u212C','bsemi':'\u204F','bsim':'\u223D','bsime':'\u22CD','bsol':'\\','bsolb':'\u29C5','bsolhsub':'\u27C8','bull':'\u2022','bullet':'\u2022','bump':'\u224E','bumpe':'\u224F','bumpE':'\u2AAE','bumpeq':'\u224F','Bumpeq':'\u224E','cacute':'\u0107','Cacute':'\u0106','cap':'\u2229','Cap':'\u22D2','capand':'\u2A44','capbrcup':'\u2A49','capcap':'\u2A4B','capcup':'\u2A47','capdot':'\u2A40','CapitalDifferentialD':'\u2145','caps':'\u2229\uFE00','caret':'\u2041','caron':'\u02C7','Cayleys':'\u212D','ccaps':'\u2A4D','ccaron':'\u010D','Ccaron':'\u010C','ccedil':'\xE7','Ccedil':'\xC7','ccirc':'\u0109','Ccirc':'\u0108','Cconint':'\u2230','ccups':'\u2A4C','ccupssm':'\u2A50','cdot':'\u010B','Cdot':'\u010A','cedil':'\xB8','Cedilla':'\xB8','cemptyv':'\u29B2','cent':'\xA2','centerdot':'\xB7','CenterDot':'\xB7','cfr':'\uD835\uDD20','Cfr':'\u212D','chcy':'\u0447','CHcy':'\u0427','check':'\u2713','checkmark':'\u2713','chi':'\u03C7','Chi':'\u03A7','cir':'\u25CB','circ':'\u02C6','circeq':'\u2257','circlearrowleft':'\u21BA','circlearrowright':'\u21BB','circledast':'\u229B','circledcirc':'\u229A','circleddash':'\u229D','CircleDot':'\u2299','circledR':'\xAE','circledS':'\u24C8','CircleMinus':'\u2296','CirclePlus':'\u2295','CircleTimes':'\u2297','cire':'\u2257','cirE':'\u29C3','cirfnint':'\u2A10','cirmid':'\u2AEF','cirscir':'\u29C2','ClockwiseContourIntegral':'\u2232','CloseCurlyDoubleQuote':'\u201D','CloseCurlyQuote':'\u2019','clubs':'\u2663','clubsuit':'\u2663','colon':':','Colon':'\u2237','colone':'\u2254','Colone':'\u2A74','coloneq':'\u2254','comma':',','commat':'@','comp':'\u2201','compfn':'\u2218','complement':'\u2201','complexes':'\u2102','cong':'\u2245','congdot':'\u2A6D','Congruent':'\u2261','conint':'\u222E','Conint':'\u222F','ContourIntegral':'\u222E','copf':'\uD835\uDD54','Copf':'\u2102','coprod':'\u2210','Coproduct':'\u2210','copy':'\xA9','COPY':'\xA9','copysr':'\u2117','CounterClockwiseContourIntegral':'\u2233','crarr':'\u21B5','cross':'\u2717','Cross':'\u2A2F','cscr':'\uD835\uDCB8','Cscr':'\uD835\uDC9E','csub':'\u2ACF','csube':'\u2AD1','csup':'\u2AD0','csupe':'\u2AD2','ctdot':'\u22EF','cudarrl':'\u2938','cudarrr':'\u2935','cuepr':'\u22DE','cuesc':'\u22DF','cularr':'\u21B6','cularrp':'\u293D','cup':'\u222A','Cup':'\u22D3','cupbrcap':'\u2A48','cupcap':'\u2A46','CupCap':'\u224D','cupcup':'\u2A4A','cupdot':'\u228D','cupor':'\u2A45','cups':'\u222A\uFE00','curarr':'\u21B7','curarrm':'\u293C','curlyeqprec':'\u22DE','curlyeqsucc':'\u22DF','curlyvee':'\u22CE','curlywedge':'\u22CF','curren':'\xA4','curvearrowleft':'\u21B6','curvearrowright':'\u21B7','cuvee':'\u22CE','cuwed':'\u22CF','cwconint':'\u2232','cwint':'\u2231','cylcty':'\u232D','dagger':'\u2020','Dagger':'\u2021','daleth':'\u2138','darr':'\u2193','dArr':'\u21D3','Darr':'\u21A1','dash':'\u2010','dashv':'\u22A3','Dashv':'\u2AE4','dbkarow':'\u290F','dblac':'\u02DD','dcaron':'\u010F','Dcaron':'\u010E','dcy':'\u0434','Dcy':'\u0414','dd':'\u2146','DD':'\u2145','ddagger':'\u2021','ddarr':'\u21CA','DDotrahd':'\u2911','ddotseq':'\u2A77','deg':'\xB0','Del':'\u2207','delta':'\u03B4','Delta':'\u0394','demptyv':'\u29B1','dfisht':'\u297F','dfr':'\uD835\uDD21','Dfr':'\uD835\uDD07','dHar':'\u2965','dharl':'\u21C3','dharr':'\u21C2','DiacriticalAcute':'\xB4','DiacriticalDot':'\u02D9','DiacriticalDoubleAcute':'\u02DD','DiacriticalGrave':'`','DiacriticalTilde':'\u02DC','diam':'\u22C4','diamond':'\u22C4','Diamond':'\u22C4','diamondsuit':'\u2666','diams':'\u2666','die':'\xA8','DifferentialD':'\u2146','digamma':'\u03DD','disin':'\u22F2','div':'\xF7','divide':'\xF7','divideontimes':'\u22C7','divonx':'\u22C7','djcy':'\u0452','DJcy':'\u0402','dlcorn':'\u231E','dlcrop':'\u230D','dollar':'$','dopf':'\uD835\uDD55','Dopf':'\uD835\uDD3B','dot':'\u02D9','Dot':'\xA8','DotDot':'\u20DC','doteq':'\u2250','doteqdot':'\u2251','DotEqual':'\u2250','dotminus':'\u2238','dotplus':'\u2214','dotsquare':'\u22A1','doublebarwedge':'\u2306','DoubleContourIntegral':'\u222F','DoubleDot':'\xA8','DoubleDownArrow':'\u21D3','DoubleLeftArrow':'\u21D0','DoubleLeftRightArrow':'\u21D4','DoubleLeftTee':'\u2AE4','DoubleLongLeftArrow':'\u27F8','DoubleLongLeftRightArrow':'\u27FA','DoubleLongRightArrow':'\u27F9','DoubleRightArrow':'\u21D2','DoubleRightTee':'\u22A8','DoubleUpArrow':'\u21D1','DoubleUpDownArrow':'\u21D5','DoubleVerticalBar':'\u2225','downarrow':'\u2193','Downarrow':'\u21D3','DownArrow':'\u2193','DownArrowBar':'\u2913','DownArrowUpArrow':'\u21F5','DownBreve':'\u0311','downdownarrows':'\u21CA','downharpoonleft':'\u21C3','downharpoonright':'\u21C2','DownLeftRightVector':'\u2950','DownLeftTeeVector':'\u295E','DownLeftVector':'\u21BD','DownLeftVectorBar':'\u2956','DownRightTeeVector':'\u295F','DownRightVector':'\u21C1','DownRightVectorBar':'\u2957','DownTee':'\u22A4','DownTeeArrow':'\u21A7','drbkarow':'\u2910','drcorn':'\u231F','drcrop':'\u230C','dscr':'\uD835\uDCB9','Dscr':'\uD835\uDC9F','dscy':'\u0455','DScy':'\u0405','dsol':'\u29F6','dstrok':'\u0111','Dstrok':'\u0110','dtdot':'\u22F1','dtri':'\u25BF','dtrif':'\u25BE','duarr':'\u21F5','duhar':'\u296F','dwangle':'\u29A6','dzcy':'\u045F','DZcy':'\u040F','dzigrarr':'\u27FF','eacute':'\xE9','Eacute':'\xC9','easter':'\u2A6E','ecaron':'\u011B','Ecaron':'\u011A','ecir':'\u2256','ecirc':'\xEA','Ecirc':'\xCA','ecolon':'\u2255','ecy':'\u044D','Ecy':'\u042D','eDDot':'\u2A77','edot':'\u0117','eDot':'\u2251','Edot':'\u0116','ee':'\u2147','efDot':'\u2252','efr':'\uD835\uDD22','Efr':'\uD835\uDD08','eg':'\u2A9A','egrave':'\xE8','Egrave':'\xC8','egs':'\u2A96','egsdot':'\u2A98','el':'\u2A99','Element':'\u2208','elinters':'\u23E7','ell':'\u2113','els':'\u2A95','elsdot':'\u2A97','emacr':'\u0113','Emacr':'\u0112','empty':'\u2205','emptyset':'\u2205','EmptySmallSquare':'\u25FB','emptyv':'\u2205','EmptyVerySmallSquare':'\u25AB','emsp':'\u2003','emsp13':'\u2004','emsp14':'\u2005','eng':'\u014B','ENG':'\u014A','ensp':'\u2002','eogon':'\u0119','Eogon':'\u0118','eopf':'\uD835\uDD56','Eopf':'\uD835\uDD3C','epar':'\u22D5','eparsl':'\u29E3','eplus':'\u2A71','epsi':'\u03B5','epsilon':'\u03B5','Epsilon':'\u0395','epsiv':'\u03F5','eqcirc':'\u2256','eqcolon':'\u2255','eqsim':'\u2242','eqslantgtr':'\u2A96','eqslantless':'\u2A95','Equal':'\u2A75','equals':'=','EqualTilde':'\u2242','equest':'\u225F','Equilibrium':'\u21CC','equiv':'\u2261','equivDD':'\u2A78','eqvparsl':'\u29E5','erarr':'\u2971','erDot':'\u2253','escr':'\u212F','Escr':'\u2130','esdot':'\u2250','esim':'\u2242','Esim':'\u2A73','eta':'\u03B7','Eta':'\u0397','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','euro':'\u20AC','excl':'!','exist':'\u2203','Exists':'\u2203','expectation':'\u2130','exponentiale':'\u2147','ExponentialE':'\u2147','fallingdotseq':'\u2252','fcy':'\u0444','Fcy':'\u0424','female':'\u2640','ffilig':'\uFB03','fflig':'\uFB00','ffllig':'\uFB04','ffr':'\uD835\uDD23','Ffr':'\uD835\uDD09','filig':'\uFB01','FilledSmallSquare':'\u25FC','FilledVerySmallSquare':'\u25AA','fjlig':'fj','flat':'\u266D','fllig':'\uFB02','fltns':'\u25B1','fnof':'\u0192','fopf':'\uD835\uDD57','Fopf':'\uD835\uDD3D','forall':'\u2200','ForAll':'\u2200','fork':'\u22D4','forkv':'\u2AD9','Fouriertrf':'\u2131','fpartint':'\u2A0D','frac12':'\xBD','frac13':'\u2153','frac14':'\xBC','frac15':'\u2155','frac16':'\u2159','frac18':'\u215B','frac23':'\u2154','frac25':'\u2156','frac34':'\xBE','frac35':'\u2157','frac38':'\u215C','frac45':'\u2158','frac56':'\u215A','frac58':'\u215D','frac78':'\u215E','frasl':'\u2044','frown':'\u2322','fscr':'\uD835\uDCBB','Fscr':'\u2131','gacute':'\u01F5','gamma':'\u03B3','Gamma':'\u0393','gammad':'\u03DD','Gammad':'\u03DC','gap':'\u2A86','gbreve':'\u011F','Gbreve':'\u011E','Gcedil':'\u0122','gcirc':'\u011D','Gcirc':'\u011C','gcy':'\u0433','Gcy':'\u0413','gdot':'\u0121','Gdot':'\u0120','ge':'\u2265','gE':'\u2267','gel':'\u22DB','gEl':'\u2A8C','geq':'\u2265','geqq':'\u2267','geqslant':'\u2A7E','ges':'\u2A7E','gescc':'\u2AA9','gesdot':'\u2A80','gesdoto':'\u2A82','gesdotol':'\u2A84','gesl':'\u22DB\uFE00','gesles':'\u2A94','gfr':'\uD835\uDD24','Gfr':'\uD835\uDD0A','gg':'\u226B','Gg':'\u22D9','ggg':'\u22D9','gimel':'\u2137','gjcy':'\u0453','GJcy':'\u0403','gl':'\u2277','gla':'\u2AA5','glE':'\u2A92','glj':'\u2AA4','gnap':'\u2A8A','gnapprox':'\u2A8A','gne':'\u2A88','gnE':'\u2269','gneq':'\u2A88','gneqq':'\u2269','gnsim':'\u22E7','gopf':'\uD835\uDD58','Gopf':'\uD835\uDD3E','grave':'`','GreaterEqual':'\u2265','GreaterEqualLess':'\u22DB','GreaterFullEqual':'\u2267','GreaterGreater':'\u2AA2','GreaterLess':'\u2277','GreaterSlantEqual':'\u2A7E','GreaterTilde':'\u2273','gscr':'\u210A','Gscr':'\uD835\uDCA2','gsim':'\u2273','gsime':'\u2A8E','gsiml':'\u2A90','gt':'>','Gt':'\u226B','GT':'>','gtcc':'\u2AA7','gtcir':'\u2A7A','gtdot':'\u22D7','gtlPar':'\u2995','gtquest':'\u2A7C','gtrapprox':'\u2A86','gtrarr':'\u2978','gtrdot':'\u22D7','gtreqless':'\u22DB','gtreqqless':'\u2A8C','gtrless':'\u2277','gtrsim':'\u2273','gvertneqq':'\u2269\uFE00','gvnE':'\u2269\uFE00','Hacek':'\u02C7','hairsp':'\u200A','half':'\xBD','hamilt':'\u210B','hardcy':'\u044A','HARDcy':'\u042A','harr':'\u2194','hArr':'\u21D4','harrcir':'\u2948','harrw':'\u21AD','Hat':'^','hbar':'\u210F','hcirc':'\u0125','Hcirc':'\u0124','hearts':'\u2665','heartsuit':'\u2665','hellip':'\u2026','hercon':'\u22B9','hfr':'\uD835\uDD25','Hfr':'\u210C','HilbertSpace':'\u210B','hksearow':'\u2925','hkswarow':'\u2926','hoarr':'\u21FF','homtht':'\u223B','hookleftarrow':'\u21A9','hookrightarrow':'\u21AA','hopf':'\uD835\uDD59','Hopf':'\u210D','horbar':'\u2015','HorizontalLine':'\u2500','hscr':'\uD835\uDCBD','Hscr':'\u210B','hslash':'\u210F','hstrok':'\u0127','Hstrok':'\u0126','HumpDownHump':'\u224E','HumpEqual':'\u224F','hybull':'\u2043','hyphen':'\u2010','iacute':'\xED','Iacute':'\xCD','ic':'\u2063','icirc':'\xEE','Icirc':'\xCE','icy':'\u0438','Icy':'\u0418','Idot':'\u0130','iecy':'\u0435','IEcy':'\u0415','iexcl':'\xA1','iff':'\u21D4','ifr':'\uD835\uDD26','Ifr':'\u2111','igrave':'\xEC','Igrave':'\xCC','ii':'\u2148','iiiint':'\u2A0C','iiint':'\u222D','iinfin':'\u29DC','iiota':'\u2129','ijlig':'\u0133','IJlig':'\u0132','Im':'\u2111','imacr':'\u012B','Imacr':'\u012A','image':'\u2111','ImaginaryI':'\u2148','imagline':'\u2110','imagpart':'\u2111','imath':'\u0131','imof':'\u22B7','imped':'\u01B5','Implies':'\u21D2','in':'\u2208','incare':'\u2105','infin':'\u221E','infintie':'\u29DD','inodot':'\u0131','int':'\u222B','Int':'\u222C','intcal':'\u22BA','integers':'\u2124','Integral':'\u222B','intercal':'\u22BA','Intersection':'\u22C2','intlarhk':'\u2A17','intprod':'\u2A3C','InvisibleComma':'\u2063','InvisibleTimes':'\u2062','iocy':'\u0451','IOcy':'\u0401','iogon':'\u012F','Iogon':'\u012E','iopf':'\uD835\uDD5A','Iopf':'\uD835\uDD40','iota':'\u03B9','Iota':'\u0399','iprod':'\u2A3C','iquest':'\xBF','iscr':'\uD835\uDCBE','Iscr':'\u2110','isin':'\u2208','isindot':'\u22F5','isinE':'\u22F9','isins':'\u22F4','isinsv':'\u22F3','isinv':'\u2208','it':'\u2062','itilde':'\u0129','Itilde':'\u0128','iukcy':'\u0456','Iukcy':'\u0406','iuml':'\xEF','Iuml':'\xCF','jcirc':'\u0135','Jcirc':'\u0134','jcy':'\u0439','Jcy':'\u0419','jfr':'\uD835\uDD27','Jfr':'\uD835\uDD0D','jmath':'\u0237','jopf':'\uD835\uDD5B','Jopf':'\uD835\uDD41','jscr':'\uD835\uDCBF','Jscr':'\uD835\uDCA5','jsercy':'\u0458','Jsercy':'\u0408','jukcy':'\u0454','Jukcy':'\u0404','kappa':'\u03BA','Kappa':'\u039A','kappav':'\u03F0','kcedil':'\u0137','Kcedil':'\u0136','kcy':'\u043A','Kcy':'\u041A','kfr':'\uD835\uDD28','Kfr':'\uD835\uDD0E','kgreen':'\u0138','khcy':'\u0445','KHcy':'\u0425','kjcy':'\u045C','KJcy':'\u040C','kopf':'\uD835\uDD5C','Kopf':'\uD835\uDD42','kscr':'\uD835\uDCC0','Kscr':'\uD835\uDCA6','lAarr':'\u21DA','lacute':'\u013A','Lacute':'\u0139','laemptyv':'\u29B4','lagran':'\u2112','lambda':'\u03BB','Lambda':'\u039B','lang':'\u27E8','Lang':'\u27EA','langd':'\u2991','langle':'\u27E8','lap':'\u2A85','Laplacetrf':'\u2112','laquo':'\xAB','larr':'\u2190','lArr':'\u21D0','Larr':'\u219E','larrb':'\u21E4','larrbfs':'\u291F','larrfs':'\u291D','larrhk':'\u21A9','larrlp':'\u21AB','larrpl':'\u2939','larrsim':'\u2973','larrtl':'\u21A2','lat':'\u2AAB','latail':'\u2919','lAtail':'\u291B','late':'\u2AAD','lates':'\u2AAD\uFE00','lbarr':'\u290C','lBarr':'\u290E','lbbrk':'\u2772','lbrace':'{','lbrack':'[','lbrke':'\u298B','lbrksld':'\u298F','lbrkslu':'\u298D','lcaron':'\u013E','Lcaron':'\u013D','lcedil':'\u013C','Lcedil':'\u013B','lceil':'\u2308','lcub':'{','lcy':'\u043B','Lcy':'\u041B','ldca':'\u2936','ldquo':'\u201C','ldquor':'\u201E','ldrdhar':'\u2967','ldrushar':'\u294B','ldsh':'\u21B2','le':'\u2264','lE':'\u2266','LeftAngleBracket':'\u27E8','leftarrow':'\u2190','Leftarrow':'\u21D0','LeftArrow':'\u2190','LeftArrowBar':'\u21E4','LeftArrowRightArrow':'\u21C6','leftarrowtail':'\u21A2','LeftCeiling':'\u2308','LeftDoubleBracket':'\u27E6','LeftDownTeeVector':'\u2961','LeftDownVector':'\u21C3','LeftDownVectorBar':'\u2959','LeftFloor':'\u230A','leftharpoondown':'\u21BD','leftharpoonup':'\u21BC','leftleftarrows':'\u21C7','leftrightarrow':'\u2194','Leftrightarrow':'\u21D4','LeftRightArrow':'\u2194','leftrightarrows':'\u21C6','leftrightharpoons':'\u21CB','leftrightsquigarrow':'\u21AD','LeftRightVector':'\u294E','LeftTee':'\u22A3','LeftTeeArrow':'\u21A4','LeftTeeVector':'\u295A','leftthreetimes':'\u22CB','LeftTriangle':'\u22B2','LeftTriangleBar':'\u29CF','LeftTriangleEqual':'\u22B4','LeftUpDownVector':'\u2951','LeftUpTeeVector':'\u2960','LeftUpVector':'\u21BF','LeftUpVectorBar':'\u2958','LeftVector':'\u21BC','LeftVectorBar':'\u2952','leg':'\u22DA','lEg':'\u2A8B','leq':'\u2264','leqq':'\u2266','leqslant':'\u2A7D','les':'\u2A7D','lescc':'\u2AA8','lesdot':'\u2A7F','lesdoto':'\u2A81','lesdotor':'\u2A83','lesg':'\u22DA\uFE00','lesges':'\u2A93','lessapprox':'\u2A85','lessdot':'\u22D6','lesseqgtr':'\u22DA','lesseqqgtr':'\u2A8B','LessEqualGreater':'\u22DA','LessFullEqual':'\u2266','LessGreater':'\u2276','lessgtr':'\u2276','LessLess':'\u2AA1','lesssim':'\u2272','LessSlantEqual':'\u2A7D','LessTilde':'\u2272','lfisht':'\u297C','lfloor':'\u230A','lfr':'\uD835\uDD29','Lfr':'\uD835\uDD0F','lg':'\u2276','lgE':'\u2A91','lHar':'\u2962','lhard':'\u21BD','lharu':'\u21BC','lharul':'\u296A','lhblk':'\u2584','ljcy':'\u0459','LJcy':'\u0409','ll':'\u226A','Ll':'\u22D8','llarr':'\u21C7','llcorner':'\u231E','Lleftarrow':'\u21DA','llhard':'\u296B','lltri':'\u25FA','lmidot':'\u0140','Lmidot':'\u013F','lmoust':'\u23B0','lmoustache':'\u23B0','lnap':'\u2A89','lnapprox':'\u2A89','lne':'\u2A87','lnE':'\u2268','lneq':'\u2A87','lneqq':'\u2268','lnsim':'\u22E6','loang':'\u27EC','loarr':'\u21FD','lobrk':'\u27E6','longleftarrow':'\u27F5','Longleftarrow':'\u27F8','LongLeftArrow':'\u27F5','longleftrightarrow':'\u27F7','Longleftrightarrow':'\u27FA','LongLeftRightArrow':'\u27F7','longmapsto':'\u27FC','longrightarrow':'\u27F6','Longrightarrow':'\u27F9','LongRightArrow':'\u27F6','looparrowleft':'\u21AB','looparrowright':'\u21AC','lopar':'\u2985','lopf':'\uD835\uDD5D','Lopf':'\uD835\uDD43','loplus':'\u2A2D','lotimes':'\u2A34','lowast':'\u2217','lowbar':'_','LowerLeftArrow':'\u2199','LowerRightArrow':'\u2198','loz':'\u25CA','lozenge':'\u25CA','lozf':'\u29EB','lpar':'(','lparlt':'\u2993','lrarr':'\u21C6','lrcorner':'\u231F','lrhar':'\u21CB','lrhard':'\u296D','lrm':'\u200E','lrtri':'\u22BF','lsaquo':'\u2039','lscr':'\uD835\uDCC1','Lscr':'\u2112','lsh':'\u21B0','Lsh':'\u21B0','lsim':'\u2272','lsime':'\u2A8D','lsimg':'\u2A8F','lsqb':'[','lsquo':'\u2018','lsquor':'\u201A','lstrok':'\u0142','Lstrok':'\u0141','lt':'<','Lt':'\u226A','LT':'<','ltcc':'\u2AA6','ltcir':'\u2A79','ltdot':'\u22D6','lthree':'\u22CB','ltimes':'\u22C9','ltlarr':'\u2976','ltquest':'\u2A7B','ltri':'\u25C3','ltrie':'\u22B4','ltrif':'\u25C2','ltrPar':'\u2996','lurdshar':'\u294A','luruhar':'\u2966','lvertneqq':'\u2268\uFE00','lvnE':'\u2268\uFE00','macr':'\xAF','male':'\u2642','malt':'\u2720','maltese':'\u2720','map':'\u21A6','Map':'\u2905','mapsto':'\u21A6','mapstodown':'\u21A7','mapstoleft':'\u21A4','mapstoup':'\u21A5','marker':'\u25AE','mcomma':'\u2A29','mcy':'\u043C','Mcy':'\u041C','mdash':'\u2014','mDDot':'\u223A','measuredangle':'\u2221','MediumSpace':'\u205F','Mellintrf':'\u2133','mfr':'\uD835\uDD2A','Mfr':'\uD835\uDD10','mho':'\u2127','micro':'\xB5','mid':'\u2223','midast':'*','midcir':'\u2AF0','middot':'\xB7','minus':'\u2212','minusb':'\u229F','minusd':'\u2238','minusdu':'\u2A2A','MinusPlus':'\u2213','mlcp':'\u2ADB','mldr':'\u2026','mnplus':'\u2213','models':'\u22A7','mopf':'\uD835\uDD5E','Mopf':'\uD835\uDD44','mp':'\u2213','mscr':'\uD835\uDCC2','Mscr':'\u2133','mstpos':'\u223E','mu':'\u03BC','Mu':'\u039C','multimap':'\u22B8','mumap':'\u22B8','nabla':'\u2207','nacute':'\u0144','Nacute':'\u0143','nang':'\u2220\u20D2','nap':'\u2249','napE':'\u2A70\u0338','napid':'\u224B\u0338','napos':'\u0149','napprox':'\u2249','natur':'\u266E','natural':'\u266E','naturals':'\u2115','nbsp':'\xA0','nbump':'\u224E\u0338','nbumpe':'\u224F\u0338','ncap':'\u2A43','ncaron':'\u0148','Ncaron':'\u0147','ncedil':'\u0146','Ncedil':'\u0145','ncong':'\u2247','ncongdot':'\u2A6D\u0338','ncup':'\u2A42','ncy':'\u043D','Ncy':'\u041D','ndash':'\u2013','ne':'\u2260','nearhk':'\u2924','nearr':'\u2197','neArr':'\u21D7','nearrow':'\u2197','nedot':'\u2250\u0338','NegativeMediumSpace':'\u200B','NegativeThickSpace':'\u200B','NegativeThinSpace':'\u200B','NegativeVeryThinSpace':'\u200B','nequiv':'\u2262','nesear':'\u2928','nesim':'\u2242\u0338','NestedGreaterGreater':'\u226B','NestedLessLess':'\u226A','NewLine':'\n','nexist':'\u2204','nexists':'\u2204','nfr':'\uD835\uDD2B','Nfr':'\uD835\uDD11','nge':'\u2271','ngE':'\u2267\u0338','ngeq':'\u2271','ngeqq':'\u2267\u0338','ngeqslant':'\u2A7E\u0338','nges':'\u2A7E\u0338','nGg':'\u22D9\u0338','ngsim':'\u2275','ngt':'\u226F','nGt':'\u226B\u20D2','ngtr':'\u226F','nGtv':'\u226B\u0338','nharr':'\u21AE','nhArr':'\u21CE','nhpar':'\u2AF2','ni':'\u220B','nis':'\u22FC','nisd':'\u22FA','niv':'\u220B','njcy':'\u045A','NJcy':'\u040A','nlarr':'\u219A','nlArr':'\u21CD','nldr':'\u2025','nle':'\u2270','nlE':'\u2266\u0338','nleftarrow':'\u219A','nLeftarrow':'\u21CD','nleftrightarrow':'\u21AE','nLeftrightarrow':'\u21CE','nleq':'\u2270','nleqq':'\u2266\u0338','nleqslant':'\u2A7D\u0338','nles':'\u2A7D\u0338','nless':'\u226E','nLl':'\u22D8\u0338','nlsim':'\u2274','nlt':'\u226E','nLt':'\u226A\u20D2','nltri':'\u22EA','nltrie':'\u22EC','nLtv':'\u226A\u0338','nmid':'\u2224','NoBreak':'\u2060','NonBreakingSpace':'\xA0','nopf':'\uD835\uDD5F','Nopf':'\u2115','not':'\xAC','Not':'\u2AEC','NotCongruent':'\u2262','NotCupCap':'\u226D','NotDoubleVerticalBar':'\u2226','NotElement':'\u2209','NotEqual':'\u2260','NotEqualTilde':'\u2242\u0338','NotExists':'\u2204','NotGreater':'\u226F','NotGreaterEqual':'\u2271','NotGreaterFullEqual':'\u2267\u0338','NotGreaterGreater':'\u226B\u0338','NotGreaterLess':'\u2279','NotGreaterSlantEqual':'\u2A7E\u0338','NotGreaterTilde':'\u2275','NotHumpDownHump':'\u224E\u0338','NotHumpEqual':'\u224F\u0338','notin':'\u2209','notindot':'\u22F5\u0338','notinE':'\u22F9\u0338','notinva':'\u2209','notinvb':'\u22F7','notinvc':'\u22F6','NotLeftTriangle':'\u22EA','NotLeftTriangleBar':'\u29CF\u0338','NotLeftTriangleEqual':'\u22EC','NotLess':'\u226E','NotLessEqual':'\u2270','NotLessGreater':'\u2278','NotLessLess':'\u226A\u0338','NotLessSlantEqual':'\u2A7D\u0338','NotLessTilde':'\u2274','NotNestedGreaterGreater':'\u2AA2\u0338','NotNestedLessLess':'\u2AA1\u0338','notni':'\u220C','notniva':'\u220C','notnivb':'\u22FE','notnivc':'\u22FD','NotPrecedes':'\u2280','NotPrecedesEqual':'\u2AAF\u0338','NotPrecedesSlantEqual':'\u22E0','NotReverseElement':'\u220C','NotRightTriangle':'\u22EB','NotRightTriangleBar':'\u29D0\u0338','NotRightTriangleEqual':'\u22ED','NotSquareSubset':'\u228F\u0338','NotSquareSubsetEqual':'\u22E2','NotSquareSuperset':'\u2290\u0338','NotSquareSupersetEqual':'\u22E3','NotSubset':'\u2282\u20D2','NotSubsetEqual':'\u2288','NotSucceeds':'\u2281','NotSucceedsEqual':'\u2AB0\u0338','NotSucceedsSlantEqual':'\u22E1','NotSucceedsTilde':'\u227F\u0338','NotSuperset':'\u2283\u20D2','NotSupersetEqual':'\u2289','NotTilde':'\u2241','NotTildeEqual':'\u2244','NotTildeFullEqual':'\u2247','NotTildeTilde':'\u2249','NotVerticalBar':'\u2224','npar':'\u2226','nparallel':'\u2226','nparsl':'\u2AFD\u20E5','npart':'\u2202\u0338','npolint':'\u2A14','npr':'\u2280','nprcue':'\u22E0','npre':'\u2AAF\u0338','nprec':'\u2280','npreceq':'\u2AAF\u0338','nrarr':'\u219B','nrArr':'\u21CF','nrarrc':'\u2933\u0338','nrarrw':'\u219D\u0338','nrightarrow':'\u219B','nRightarrow':'\u21CF','nrtri':'\u22EB','nrtrie':'\u22ED','nsc':'\u2281','nsccue':'\u22E1','nsce':'\u2AB0\u0338','nscr':'\uD835\uDCC3','Nscr':'\uD835\uDCA9','nshortmid':'\u2224','nshortparallel':'\u2226','nsim':'\u2241','nsime':'\u2244','nsimeq':'\u2244','nsmid':'\u2224','nspar':'\u2226','nsqsube':'\u22E2','nsqsupe':'\u22E3','nsub':'\u2284','nsube':'\u2288','nsubE':'\u2AC5\u0338','nsubset':'\u2282\u20D2','nsubseteq':'\u2288','nsubseteqq':'\u2AC5\u0338','nsucc':'\u2281','nsucceq':'\u2AB0\u0338','nsup':'\u2285','nsupe':'\u2289','nsupE':'\u2AC6\u0338','nsupset':'\u2283\u20D2','nsupseteq':'\u2289','nsupseteqq':'\u2AC6\u0338','ntgl':'\u2279','ntilde':'\xF1','Ntilde':'\xD1','ntlg':'\u2278','ntriangleleft':'\u22EA','ntrianglelefteq':'\u22EC','ntriangleright':'\u22EB','ntrianglerighteq':'\u22ED','nu':'\u03BD','Nu':'\u039D','num':'#','numero':'\u2116','numsp':'\u2007','nvap':'\u224D\u20D2','nvdash':'\u22AC','nvDash':'\u22AD','nVdash':'\u22AE','nVDash':'\u22AF','nvge':'\u2265\u20D2','nvgt':'>\u20D2','nvHarr':'\u2904','nvinfin':'\u29DE','nvlArr':'\u2902','nvle':'\u2264\u20D2','nvlt':'<\u20D2','nvltrie':'\u22B4\u20D2','nvrArr':'\u2903','nvrtrie':'\u22B5\u20D2','nvsim':'\u223C\u20D2','nwarhk':'\u2923','nwarr':'\u2196','nwArr':'\u21D6','nwarrow':'\u2196','nwnear':'\u2927','oacute':'\xF3','Oacute':'\xD3','oast':'\u229B','ocir':'\u229A','ocirc':'\xF4','Ocirc':'\xD4','ocy':'\u043E','Ocy':'\u041E','odash':'\u229D','odblac':'\u0151','Odblac':'\u0150','odiv':'\u2A38','odot':'\u2299','odsold':'\u29BC','oelig':'\u0153','OElig':'\u0152','ofcir':'\u29BF','ofr':'\uD835\uDD2C','Ofr':'\uD835\uDD12','ogon':'\u02DB','ograve':'\xF2','Ograve':'\xD2','ogt':'\u29C1','ohbar':'\u29B5','ohm':'\u03A9','oint':'\u222E','olarr':'\u21BA','olcir':'\u29BE','olcross':'\u29BB','oline':'\u203E','olt':'\u29C0','omacr':'\u014D','Omacr':'\u014C','omega':'\u03C9','Omega':'\u03A9','omicron':'\u03BF','Omicron':'\u039F','omid':'\u29B6','ominus':'\u2296','oopf':'\uD835\uDD60','Oopf':'\uD835\uDD46','opar':'\u29B7','OpenCurlyDoubleQuote':'\u201C','OpenCurlyQuote':'\u2018','operp':'\u29B9','oplus':'\u2295','or':'\u2228','Or':'\u2A54','orarr':'\u21BB','ord':'\u2A5D','order':'\u2134','orderof':'\u2134','ordf':'\xAA','ordm':'\xBA','origof':'\u22B6','oror':'\u2A56','orslope':'\u2A57','orv':'\u2A5B','oS':'\u24C8','oscr':'\u2134','Oscr':'\uD835\uDCAA','oslash':'\xF8','Oslash':'\xD8','osol':'\u2298','otilde':'\xF5','Otilde':'\xD5','otimes':'\u2297','Otimes':'\u2A37','otimesas':'\u2A36','ouml':'\xF6','Ouml':'\xD6','ovbar':'\u233D','OverBar':'\u203E','OverBrace':'\u23DE','OverBracket':'\u23B4','OverParenthesis':'\u23DC','par':'\u2225','para':'\xB6','parallel':'\u2225','parsim':'\u2AF3','parsl':'\u2AFD','part':'\u2202','PartialD':'\u2202','pcy':'\u043F','Pcy':'\u041F','percnt':'%','period':'.','permil':'\u2030','perp':'\u22A5','pertenk':'\u2031','pfr':'\uD835\uDD2D','Pfr':'\uD835\uDD13','phi':'\u03C6','Phi':'\u03A6','phiv':'\u03D5','phmmat':'\u2133','phone':'\u260E','pi':'\u03C0','Pi':'\u03A0','pitchfork':'\u22D4','piv':'\u03D6','planck':'\u210F','planckh':'\u210E','plankv':'\u210F','plus':'+','plusacir':'\u2A23','plusb':'\u229E','pluscir':'\u2A22','plusdo':'\u2214','plusdu':'\u2A25','pluse':'\u2A72','PlusMinus':'\xB1','plusmn':'\xB1','plussim':'\u2A26','plustwo':'\u2A27','pm':'\xB1','Poincareplane':'\u210C','pointint':'\u2A15','popf':'\uD835\uDD61','Popf':'\u2119','pound':'\xA3','pr':'\u227A','Pr':'\u2ABB','prap':'\u2AB7','prcue':'\u227C','pre':'\u2AAF','prE':'\u2AB3','prec':'\u227A','precapprox':'\u2AB7','preccurlyeq':'\u227C','Precedes':'\u227A','PrecedesEqual':'\u2AAF','PrecedesSlantEqual':'\u227C','PrecedesTilde':'\u227E','preceq':'\u2AAF','precnapprox':'\u2AB9','precneqq':'\u2AB5','precnsim':'\u22E8','precsim':'\u227E','prime':'\u2032','Prime':'\u2033','primes':'\u2119','prnap':'\u2AB9','prnE':'\u2AB5','prnsim':'\u22E8','prod':'\u220F','Product':'\u220F','profalar':'\u232E','profline':'\u2312','profsurf':'\u2313','prop':'\u221D','Proportion':'\u2237','Proportional':'\u221D','propto':'\u221D','prsim':'\u227E','prurel':'\u22B0','pscr':'\uD835\uDCC5','Pscr':'\uD835\uDCAB','psi':'\u03C8','Psi':'\u03A8','puncsp':'\u2008','qfr':'\uD835\uDD2E','Qfr':'\uD835\uDD14','qint':'\u2A0C','qopf':'\uD835\uDD62','Qopf':'\u211A','qprime':'\u2057','qscr':'\uD835\uDCC6','Qscr':'\uD835\uDCAC','quaternions':'\u210D','quatint':'\u2A16','quest':'?','questeq':'\u225F','quot':'"','QUOT':'"','rAarr':'\u21DB','race':'\u223D\u0331','racute':'\u0155','Racute':'\u0154','radic':'\u221A','raemptyv':'\u29B3','rang':'\u27E9','Rang':'\u27EB','rangd':'\u2992','range':'\u29A5','rangle':'\u27E9','raquo':'\xBB','rarr':'\u2192','rArr':'\u21D2','Rarr':'\u21A0','rarrap':'\u2975','rarrb':'\u21E5','rarrbfs':'\u2920','rarrc':'\u2933','rarrfs':'\u291E','rarrhk':'\u21AA','rarrlp':'\u21AC','rarrpl':'\u2945','rarrsim':'\u2974','rarrtl':'\u21A3','Rarrtl':'\u2916','rarrw':'\u219D','ratail':'\u291A','rAtail':'\u291C','ratio':'\u2236','rationals':'\u211A','rbarr':'\u290D','rBarr':'\u290F','RBarr':'\u2910','rbbrk':'\u2773','rbrace':'}','rbrack':']','rbrke':'\u298C','rbrksld':'\u298E','rbrkslu':'\u2990','rcaron':'\u0159','Rcaron':'\u0158','rcedil':'\u0157','Rcedil':'\u0156','rceil':'\u2309','rcub':'}','rcy':'\u0440','Rcy':'\u0420','rdca':'\u2937','rdldhar':'\u2969','rdquo':'\u201D','rdquor':'\u201D','rdsh':'\u21B3','Re':'\u211C','real':'\u211C','realine':'\u211B','realpart':'\u211C','reals':'\u211D','rect':'\u25AD','reg':'\xAE','REG':'\xAE','ReverseElement':'\u220B','ReverseEquilibrium':'\u21CB','ReverseUpEquilibrium':'\u296F','rfisht':'\u297D','rfloor':'\u230B','rfr':'\uD835\uDD2F','Rfr':'\u211C','rHar':'\u2964','rhard':'\u21C1','rharu':'\u21C0','rharul':'\u296C','rho':'\u03C1','Rho':'\u03A1','rhov':'\u03F1','RightAngleBracket':'\u27E9','rightarrow':'\u2192','Rightarrow':'\u21D2','RightArrow':'\u2192','RightArrowBar':'\u21E5','RightArrowLeftArrow':'\u21C4','rightarrowtail':'\u21A3','RightCeiling':'\u2309','RightDoubleBracket':'\u27E7','RightDownTeeVector':'\u295D','RightDownVector':'\u21C2','RightDownVectorBar':'\u2955','RightFloor':'\u230B','rightharpoondown':'\u21C1','rightharpoonup':'\u21C0','rightleftarrows':'\u21C4','rightleftharpoons':'\u21CC','rightrightarrows':'\u21C9','rightsquigarrow':'\u219D','RightTee':'\u22A2','RightTeeArrow':'\u21A6','RightTeeVector':'\u295B','rightthreetimes':'\u22CC','RightTriangle':'\u22B3','RightTriangleBar':'\u29D0','RightTriangleEqual':'\u22B5','RightUpDownVector':'\u294F','RightUpTeeVector':'\u295C','RightUpVector':'\u21BE','RightUpVectorBar':'\u2954','RightVector':'\u21C0','RightVectorBar':'\u2953','ring':'\u02DA','risingdotseq':'\u2253','rlarr':'\u21C4','rlhar':'\u21CC','rlm':'\u200F','rmoust':'\u23B1','rmoustache':'\u23B1','rnmid':'\u2AEE','roang':'\u27ED','roarr':'\u21FE','robrk':'\u27E7','ropar':'\u2986','ropf':'\uD835\uDD63','Ropf':'\u211D','roplus':'\u2A2E','rotimes':'\u2A35','RoundImplies':'\u2970','rpar':')','rpargt':'\u2994','rppolint':'\u2A12','rrarr':'\u21C9','Rrightarrow':'\u21DB','rsaquo':'\u203A','rscr':'\uD835\uDCC7','Rscr':'\u211B','rsh':'\u21B1','Rsh':'\u21B1','rsqb':']','rsquo':'\u2019','rsquor':'\u2019','rthree':'\u22CC','rtimes':'\u22CA','rtri':'\u25B9','rtrie':'\u22B5','rtrif':'\u25B8','rtriltri':'\u29CE','RuleDelayed':'\u29F4','ruluhar':'\u2968','rx':'\u211E','sacute':'\u015B','Sacute':'\u015A','sbquo':'\u201A','sc':'\u227B','Sc':'\u2ABC','scap':'\u2AB8','scaron':'\u0161','Scaron':'\u0160','sccue':'\u227D','sce':'\u2AB0','scE':'\u2AB4','scedil':'\u015F','Scedil':'\u015E','scirc':'\u015D','Scirc':'\u015C','scnap':'\u2ABA','scnE':'\u2AB6','scnsim':'\u22E9','scpolint':'\u2A13','scsim':'\u227F','scy':'\u0441','Scy':'\u0421','sdot':'\u22C5','sdotb':'\u22A1','sdote':'\u2A66','searhk':'\u2925','searr':'\u2198','seArr':'\u21D8','searrow':'\u2198','sect':'\xA7','semi':';','seswar':'\u2929','setminus':'\u2216','setmn':'\u2216','sext':'\u2736','sfr':'\uD835\uDD30','Sfr':'\uD835\uDD16','sfrown':'\u2322','sharp':'\u266F','shchcy':'\u0449','SHCHcy':'\u0429','shcy':'\u0448','SHcy':'\u0428','ShortDownArrow':'\u2193','ShortLeftArrow':'\u2190','shortmid':'\u2223','shortparallel':'\u2225','ShortRightArrow':'\u2192','ShortUpArrow':'\u2191','shy':'\xAD','sigma':'\u03C3','Sigma':'\u03A3','sigmaf':'\u03C2','sigmav':'\u03C2','sim':'\u223C','simdot':'\u2A6A','sime':'\u2243','simeq':'\u2243','simg':'\u2A9E','simgE':'\u2AA0','siml':'\u2A9D','simlE':'\u2A9F','simne':'\u2246','simplus':'\u2A24','simrarr':'\u2972','slarr':'\u2190','SmallCircle':'\u2218','smallsetminus':'\u2216','smashp':'\u2A33','smeparsl':'\u29E4','smid':'\u2223','smile':'\u2323','smt':'\u2AAA','smte':'\u2AAC','smtes':'\u2AAC\uFE00','softcy':'\u044C','SOFTcy':'\u042C','sol':'/','solb':'\u29C4','solbar':'\u233F','sopf':'\uD835\uDD64','Sopf':'\uD835\uDD4A','spades':'\u2660','spadesuit':'\u2660','spar':'\u2225','sqcap':'\u2293','sqcaps':'\u2293\uFE00','sqcup':'\u2294','sqcups':'\u2294\uFE00','Sqrt':'\u221A','sqsub':'\u228F','sqsube':'\u2291','sqsubset':'\u228F','sqsubseteq':'\u2291','sqsup':'\u2290','sqsupe':'\u2292','sqsupset':'\u2290','sqsupseteq':'\u2292','squ':'\u25A1','square':'\u25A1','Square':'\u25A1','SquareIntersection':'\u2293','SquareSubset':'\u228F','SquareSubsetEqual':'\u2291','SquareSuperset':'\u2290','SquareSupersetEqual':'\u2292','SquareUnion':'\u2294','squarf':'\u25AA','squf':'\u25AA','srarr':'\u2192','sscr':'\uD835\uDCC8','Sscr':'\uD835\uDCAE','ssetmn':'\u2216','ssmile':'\u2323','sstarf':'\u22C6','star':'\u2606','Star':'\u22C6','starf':'\u2605','straightepsilon':'\u03F5','straightphi':'\u03D5','strns':'\xAF','sub':'\u2282','Sub':'\u22D0','subdot':'\u2ABD','sube':'\u2286','subE':'\u2AC5','subedot':'\u2AC3','submult':'\u2AC1','subne':'\u228A','subnE':'\u2ACB','subplus':'\u2ABF','subrarr':'\u2979','subset':'\u2282','Subset':'\u22D0','subseteq':'\u2286','subseteqq':'\u2AC5','SubsetEqual':'\u2286','subsetneq':'\u228A','subsetneqq':'\u2ACB','subsim':'\u2AC7','subsub':'\u2AD5','subsup':'\u2AD3','succ':'\u227B','succapprox':'\u2AB8','succcurlyeq':'\u227D','Succeeds':'\u227B','SucceedsEqual':'\u2AB0','SucceedsSlantEqual':'\u227D','SucceedsTilde':'\u227F','succeq':'\u2AB0','succnapprox':'\u2ABA','succneqq':'\u2AB6','succnsim':'\u22E9','succsim':'\u227F','SuchThat':'\u220B','sum':'\u2211','Sum':'\u2211','sung':'\u266A','sup':'\u2283','Sup':'\u22D1','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','supdot':'\u2ABE','supdsub':'\u2AD8','supe':'\u2287','supE':'\u2AC6','supedot':'\u2AC4','Superset':'\u2283','SupersetEqual':'\u2287','suphsol':'\u27C9','suphsub':'\u2AD7','suplarr':'\u297B','supmult':'\u2AC2','supne':'\u228B','supnE':'\u2ACC','supplus':'\u2AC0','supset':'\u2283','Supset':'\u22D1','supseteq':'\u2287','supseteqq':'\u2AC6','supsetneq':'\u228B','supsetneqq':'\u2ACC','supsim':'\u2AC8','supsub':'\u2AD4','supsup':'\u2AD6','swarhk':'\u2926','swarr':'\u2199','swArr':'\u21D9','swarrow':'\u2199','swnwar':'\u292A','szlig':'\xDF','Tab':'\t','target':'\u2316','tau':'\u03C4','Tau':'\u03A4','tbrk':'\u23B4','tcaron':'\u0165','Tcaron':'\u0164','tcedil':'\u0163','Tcedil':'\u0162','tcy':'\u0442','Tcy':'\u0422','tdot':'\u20DB','telrec':'\u2315','tfr':'\uD835\uDD31','Tfr':'\uD835\uDD17','there4':'\u2234','therefore':'\u2234','Therefore':'\u2234','theta':'\u03B8','Theta':'\u0398','thetasym':'\u03D1','thetav':'\u03D1','thickapprox':'\u2248','thicksim':'\u223C','ThickSpace':'\u205F\u200A','thinsp':'\u2009','ThinSpace':'\u2009','thkap':'\u2248','thksim':'\u223C','thorn':'\xFE','THORN':'\xDE','tilde':'\u02DC','Tilde':'\u223C','TildeEqual':'\u2243','TildeFullEqual':'\u2245','TildeTilde':'\u2248','times':'\xD7','timesb':'\u22A0','timesbar':'\u2A31','timesd':'\u2A30','tint':'\u222D','toea':'\u2928','top':'\u22A4','topbot':'\u2336','topcir':'\u2AF1','topf':'\uD835\uDD65','Topf':'\uD835\uDD4B','topfork':'\u2ADA','tosa':'\u2929','tprime':'\u2034','trade':'\u2122','TRADE':'\u2122','triangle':'\u25B5','triangledown':'\u25BF','triangleleft':'\u25C3','trianglelefteq':'\u22B4','triangleq':'\u225C','triangleright':'\u25B9','trianglerighteq':'\u22B5','tridot':'\u25EC','trie':'\u225C','triminus':'\u2A3A','TripleDot':'\u20DB','triplus':'\u2A39','trisb':'\u29CD','tritime':'\u2A3B','trpezium':'\u23E2','tscr':'\uD835\uDCC9','Tscr':'\uD835\uDCAF','tscy':'\u0446','TScy':'\u0426','tshcy':'\u045B','TSHcy':'\u040B','tstrok':'\u0167','Tstrok':'\u0166','twixt':'\u226C','twoheadleftarrow':'\u219E','twoheadrightarrow':'\u21A0','uacute':'\xFA','Uacute':'\xDA','uarr':'\u2191','uArr':'\u21D1','Uarr':'\u219F','Uarrocir':'\u2949','ubrcy':'\u045E','Ubrcy':'\u040E','ubreve':'\u016D','Ubreve':'\u016C','ucirc':'\xFB','Ucirc':'\xDB','ucy':'\u0443','Ucy':'\u0423','udarr':'\u21C5','udblac':'\u0171','Udblac':'\u0170','udhar':'\u296E','ufisht':'\u297E','ufr':'\uD835\uDD32','Ufr':'\uD835\uDD18','ugrave':'\xF9','Ugrave':'\xD9','uHar':'\u2963','uharl':'\u21BF','uharr':'\u21BE','uhblk':'\u2580','ulcorn':'\u231C','ulcorner':'\u231C','ulcrop':'\u230F','ultri':'\u25F8','umacr':'\u016B','Umacr':'\u016A','uml':'\xA8','UnderBar':'_','UnderBrace':'\u23DF','UnderBracket':'\u23B5','UnderParenthesis':'\u23DD','Union':'\u22C3','UnionPlus':'\u228E','uogon':'\u0173','Uogon':'\u0172','uopf':'\uD835\uDD66','Uopf':'\uD835\uDD4C','uparrow':'\u2191','Uparrow':'\u21D1','UpArrow':'\u2191','UpArrowBar':'\u2912','UpArrowDownArrow':'\u21C5','updownarrow':'\u2195','Updownarrow':'\u21D5','UpDownArrow':'\u2195','UpEquilibrium':'\u296E','upharpoonleft':'\u21BF','upharpoonright':'\u21BE','uplus':'\u228E','UpperLeftArrow':'\u2196','UpperRightArrow':'\u2197','upsi':'\u03C5','Upsi':'\u03D2','upsih':'\u03D2','upsilon':'\u03C5','Upsilon':'\u03A5','UpTee':'\u22A5','UpTeeArrow':'\u21A5','upuparrows':'\u21C8','urcorn':'\u231D','urcorner':'\u231D','urcrop':'\u230E','uring':'\u016F','Uring':'\u016E','urtri':'\u25F9','uscr':'\uD835\uDCCA','Uscr':'\uD835\uDCB0','utdot':'\u22F0','utilde':'\u0169','Utilde':'\u0168','utri':'\u25B5','utrif':'\u25B4','uuarr':'\u21C8','uuml':'\xFC','Uuml':'\xDC','uwangle':'\u29A7','vangrt':'\u299C','varepsilon':'\u03F5','varkappa':'\u03F0','varnothing':'\u2205','varphi':'\u03D5','varpi':'\u03D6','varpropto':'\u221D','varr':'\u2195','vArr':'\u21D5','varrho':'\u03F1','varsigma':'\u03C2','varsubsetneq':'\u228A\uFE00','varsubsetneqq':'\u2ACB\uFE00','varsupsetneq':'\u228B\uFE00','varsupsetneqq':'\u2ACC\uFE00','vartheta':'\u03D1','vartriangleleft':'\u22B2','vartriangleright':'\u22B3','vBar':'\u2AE8','Vbar':'\u2AEB','vBarv':'\u2AE9','vcy':'\u0432','Vcy':'\u0412','vdash':'\u22A2','vDash':'\u22A8','Vdash':'\u22A9','VDash':'\u22AB','Vdashl':'\u2AE6','vee':'\u2228','Vee':'\u22C1','veebar':'\u22BB','veeeq':'\u225A','vellip':'\u22EE','verbar':'|','Verbar':'\u2016','vert':'|','Vert':'\u2016','VerticalBar':'\u2223','VerticalLine':'|','VerticalSeparator':'\u2758','VerticalTilde':'\u2240','VeryThinSpace':'\u200A','vfr':'\uD835\uDD33','Vfr':'\uD835\uDD19','vltri':'\u22B2','vnsub':'\u2282\u20D2','vnsup':'\u2283\u20D2','vopf':'\uD835\uDD67','Vopf':'\uD835\uDD4D','vprop':'\u221D','vrtri':'\u22B3','vscr':'\uD835\uDCCB','Vscr':'\uD835\uDCB1','vsubne':'\u228A\uFE00','vsubnE':'\u2ACB\uFE00','vsupne':'\u228B\uFE00','vsupnE':'\u2ACC\uFE00','Vvdash':'\u22AA','vzigzag':'\u299A','wcirc':'\u0175','Wcirc':'\u0174','wedbar':'\u2A5F','wedge':'\u2227','Wedge':'\u22C0','wedgeq':'\u2259','weierp':'\u2118','wfr':'\uD835\uDD34','Wfr':'\uD835\uDD1A','wopf':'\uD835\uDD68','Wopf':'\uD835\uDD4E','wp':'\u2118','wr':'\u2240','wreath':'\u2240','wscr':'\uD835\uDCCC','Wscr':'\uD835\uDCB2','xcap':'\u22C2','xcirc':'\u25EF','xcup':'\u22C3','xdtri':'\u25BD','xfr':'\uD835\uDD35','Xfr':'\uD835\uDD1B','xharr':'\u27F7','xhArr':'\u27FA','xi':'\u03BE','Xi':'\u039E','xlarr':'\u27F5','xlArr':'\u27F8','xmap':'\u27FC','xnis':'\u22FB','xodot':'\u2A00','xopf':'\uD835\uDD69','Xopf':'\uD835\uDD4F','xoplus':'\u2A01','xotime':'\u2A02','xrarr':'\u27F6','xrArr':'\u27F9','xscr':'\uD835\uDCCD','Xscr':'\uD835\uDCB3','xsqcup':'\u2A06','xuplus':'\u2A04','xutri':'\u25B3','xvee':'\u22C1','xwedge':'\u22C0','yacute':'\xFD','Yacute':'\xDD','yacy':'\u044F','YAcy':'\u042F','ycirc':'\u0177','Ycirc':'\u0176','ycy':'\u044B','Ycy':'\u042B','yen':'\xA5','yfr':'\uD835\uDD36','Yfr':'\uD835\uDD1C','yicy':'\u0457','YIcy':'\u0407','yopf':'\uD835\uDD6A','Yopf':'\uD835\uDD50','yscr':'\uD835\uDCCE','Yscr':'\uD835\uDCB4','yucy':'\u044E','YUcy':'\u042E','yuml':'\xFF','Yuml':'\u0178','zacute':'\u017A','Zacute':'\u0179','zcaron':'\u017E','Zcaron':'\u017D','zcy':'\u0437','Zcy':'\u0417','zdot':'\u017C','Zdot':'\u017B','zeetrf':'\u2128','ZeroWidthSpace':'\u200B','zeta':'\u03B6','Zeta':'\u0396','zfr':'\uD835\uDD37','Zfr':'\u2128','zhcy':'\u0436','ZHcy':'\u0416','zigrarr':'\u21DD','zopf':'\uD835\uDD6B','Zopf':'\u2124','zscr':'\uD835\uDCCF','Zscr':'\uD835\uDCB5','zwj':'\u200D','zwnj':'\u200C'};
	var decodeMapLegacy = {'aacute':'\xE1','Aacute':'\xC1','acirc':'\xE2','Acirc':'\xC2','acute':'\xB4','aelig':'\xE6','AElig':'\xC6','agrave':'\xE0','Agrave':'\xC0','amp':'&','AMP':'&','aring':'\xE5','Aring':'\xC5','atilde':'\xE3','Atilde':'\xC3','auml':'\xE4','Auml':'\xC4','brvbar':'\xA6','ccedil':'\xE7','Ccedil':'\xC7','cedil':'\xB8','cent':'\xA2','copy':'\xA9','COPY':'\xA9','curren':'\xA4','deg':'\xB0','divide':'\xF7','eacute':'\xE9','Eacute':'\xC9','ecirc':'\xEA','Ecirc':'\xCA','egrave':'\xE8','Egrave':'\xC8','eth':'\xF0','ETH':'\xD0','euml':'\xEB','Euml':'\xCB','frac12':'\xBD','frac14':'\xBC','frac34':'\xBE','gt':'>','GT':'>','iacute':'\xED','Iacute':'\xCD','icirc':'\xEE','Icirc':'\xCE','iexcl':'\xA1','igrave':'\xEC','Igrave':'\xCC','iquest':'\xBF','iuml':'\xEF','Iuml':'\xCF','laquo':'\xAB','lt':'<','LT':'<','macr':'\xAF','micro':'\xB5','middot':'\xB7','nbsp':'\xA0','not':'\xAC','ntilde':'\xF1','Ntilde':'\xD1','oacute':'\xF3','Oacute':'\xD3','ocirc':'\xF4','Ocirc':'\xD4','ograve':'\xF2','Ograve':'\xD2','ordf':'\xAA','ordm':'\xBA','oslash':'\xF8','Oslash':'\xD8','otilde':'\xF5','Otilde':'\xD5','ouml':'\xF6','Ouml':'\xD6','para':'\xB6','plusmn':'\xB1','pound':'\xA3','quot':'"','QUOT':'"','raquo':'\xBB','reg':'\xAE','REG':'\xAE','sect':'\xA7','shy':'\xAD','sup1':'\xB9','sup2':'\xB2','sup3':'\xB3','szlig':'\xDF','thorn':'\xFE','THORN':'\xDE','times':'\xD7','uacute':'\xFA','Uacute':'\xDA','ucirc':'\xFB','Ucirc':'\xDB','ugrave':'\xF9','Ugrave':'\xD9','uml':'\xA8','uuml':'\xFC','Uuml':'\xDC','yacute':'\xFD','Yacute':'\xDD','yen':'\xA5','yuml':'\xFF'};
	var decodeMapNumeric = {'0':'\uFFFD','128':'\u20AC','130':'\u201A','131':'\u0192','132':'\u201E','133':'\u2026','134':'\u2020','135':'\u2021','136':'\u02C6','137':'\u2030','138':'\u0160','139':'\u2039','140':'\u0152','142':'\u017D','145':'\u2018','146':'\u2019','147':'\u201C','148':'\u201D','149':'\u2022','150':'\u2013','151':'\u2014','152':'\u02DC','153':'\u2122','154':'\u0161','155':'\u203A','156':'\u0153','158':'\u017E','159':'\u0178'};
	var invalidReferenceCodePoints = [1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65000,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111];

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var has = function(object, propertyName) {
		return hasOwnProperty.call(object, propertyName);
	};

	var contains = function(array, value) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			if (array[index] == value) {
				return true;
			}
		}
		return false;
	};

	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var result = {};
		var key;
		for (key in defaults) {
			// A `hasOwnProperty` check is not needed here, since only recognized
			// option names are used anyway. Any others are ignored.
			result[key] = has(options, key) ? options[key] : defaults[key];
		}
		return result;
	};

	// Modified version of `ucs2encode`; see https://mths.be/punycode.
	var codePointToSymbol = function(codePoint, strict) {
		var output = '';
		if ((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF) {
			// See issue #4:
			// “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
			// greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
			// REPLACEMENT CHARACTER.”
			if (strict) {
				parseError('character reference outside the permissible Unicode range');
			}
			return '\uFFFD';
		}
		if (has(decodeMapNumeric, codePoint)) {
			if (strict) {
				parseError('disallowed character reference');
			}
			return decodeMapNumeric[codePoint];
		}
		if (strict && contains(invalidReferenceCodePoints, codePoint)) {
			parseError('disallowed character reference');
		}
		if (codePoint > 0xFFFF) {
			codePoint -= 0x10000;
			output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
			codePoint = 0xDC00 | codePoint & 0x3FF;
		}
		output += stringFromCharCode(codePoint);
		return output;
	};

	var hexEscape = function(codePoint) {
		return '&#x' + codePoint.toString(16).toUpperCase() + ';';
	};

	var decEscape = function(codePoint) {
		return '&#' + codePoint + ';';
	};

	var parseError = function(message) {
		throw Error('Parse error: ' + message);
	};

	/*--------------------------------------------------------------------------*/

	var encode = function(string, options) {
		options = merge(options, encode.options);
		var strict = options.strict;
		if (strict && regexInvalidRawCodePoint.test(string)) {
			parseError('forbidden code point');
		}
		var encodeEverything = options.encodeEverything;
		var useNamedReferences = options.useNamedReferences;
		var allowUnsafeSymbols = options.allowUnsafeSymbols;
		var escapeCodePoint = options.decimal ? decEscape : hexEscape;

		var escapeBmpSymbol = function(symbol) {
			return escapeCodePoint(symbol.charCodeAt(0));
		};

		if (encodeEverything) {
			// Encode ASCII symbols.
			string = string.replace(regexAsciiWhitelist, function(symbol) {
				// Use named references if requested & possible.
				if (useNamedReferences && has(encodeMap, symbol)) {
					return '&' + encodeMap[symbol] + ';';
				}
				return escapeBmpSymbol(symbol);
			});
			// Shorten a few escapes that represent two symbols, of which at least one
			// is within the ASCII range.
			if (useNamedReferences) {
				string = string
					.replace(/&gt;\u20D2/g, '&nvgt;')
					.replace(/&lt;\u20D2/g, '&nvlt;')
					.replace(/&#x66;&#x6A;/g, '&fjlig;');
			}
			// Encode non-ASCII symbols.
			if (useNamedReferences) {
				// Encode non-ASCII symbols that can be replaced with a named reference.
				string = string.replace(regexEncodeNonAscii, function(string) {
					// Note: there is no need to check `has(encodeMap, string)` here.
					return '&' + encodeMap[string] + ';';
				});
			}
			// Note: any remaining non-ASCII symbols are handled outside of the `if`.
		} else if (useNamedReferences) {
			// Apply named character references.
			// Encode `<>"'&` using named character references.
			if (!allowUnsafeSymbols) {
				string = string.replace(regexEscape, function(string) {
					return '&' + encodeMap[string] + ';'; // no need to check `has()` here
				});
			}
			// Shorten escapes that represent two symbols, of which at least one is
			// `<>"'&`.
			string = string
				.replace(/&gt;\u20D2/g, '&nvgt;')
				.replace(/&lt;\u20D2/g, '&nvlt;');
			// Encode non-ASCII symbols that can be replaced with a named reference.
			string = string.replace(regexEncodeNonAscii, function(string) {
				// Note: there is no need to check `has(encodeMap, string)` here.
				return '&' + encodeMap[string] + ';';
			});
		} else if (!allowUnsafeSymbols) {
			// Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
			// using named character references.
			string = string.replace(regexEscape, escapeBmpSymbol);
		}
		return string
			// Encode astral symbols.
			.replace(regexAstralSymbols, function($0) {
				// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
				var high = $0.charCodeAt(0);
				var low = $0.charCodeAt(1);
				var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
				return escapeCodePoint(codePoint);
			})
			// Encode any remaining BMP symbols that are not printable ASCII symbols
			// using a hexadecimal escape.
			.replace(regexBmpWhitelist, escapeBmpSymbol);
	};
	// Expose default options (so they can be overridden globally).
	encode.options = {
		'allowUnsafeSymbols': false,
		'encodeEverything': false,
		'strict': false,
		'useNamedReferences': false,
		'decimal' : false
	};

	var decode = function(html, options) {
		options = merge(options, decode.options);
		var strict = options.strict;
		if (strict && regexInvalidEntity.test(html)) {
			parseError('malformed character reference');
		}
		return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7, $8) {
			var codePoint;
			var semicolon;
			var decDigits;
			var hexDigits;
			var reference;
			var next;

			if ($1) {
				reference = $1;
				// Note: there is no need to check `has(decodeMap, reference)`.
				return decodeMap[reference];
			}

			if ($2) {
				// Decode named character references without trailing `;`, e.g. `&amp`.
				// This is only a parse error if it gets converted to `&`, or if it is
				// followed by `=` in an attribute context.
				reference = $2;
				next = $3;
				if (next && options.isAttributeValue) {
					if (strict && next == '=') {
						parseError('`&` did not start a character reference');
					}
					return $0;
				} else {
					if (strict) {
						parseError(
							'named character reference was not terminated by a semicolon'
						);
					}
					// Note: there is no need to check `has(decodeMapLegacy, reference)`.
					return decodeMapLegacy[reference] + (next || '');
				}
			}

			if ($4) {
				// Decode decimal escapes, e.g. `&#119558;`.
				decDigits = $4;
				semicolon = $5;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(decDigits, 10);
				return codePointToSymbol(codePoint, strict);
			}

			if ($6) {
				// Decode hexadecimal escapes, e.g. `&#x1D306;`.
				hexDigits = $6;
				semicolon = $7;
				if (strict && !semicolon) {
					parseError('character reference was not terminated by a semicolon');
				}
				codePoint = parseInt(hexDigits, 16);
				return codePointToSymbol(codePoint, strict);
			}

			// If we’re still here, `if ($7)` is implied; it’s an ambiguous
			// ampersand for sure. https://mths.be/notes/ambiguous-ampersands
			if (strict) {
				parseError(
					'named character reference was not terminated by a semicolon'
				);
			}
			return $0;
		});
	};
	// Expose default options (so they can be overridden globally).
	decode.options = {
		'isAttributeValue': false,
		'strict': false
	};

	var escape = function(string) {
		return string.replace(regexEscape, function($0) {
			// Note: there is no need to check `has(escapeMap, $0)` here.
			return escapeMap[$0];
		});
	};

	/*--------------------------------------------------------------------------*/

	var he = {
		'version': '1.2.0',
		'encode': encode,
		'decode': decode,
		'escape': escape,
		'unescape': decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return he;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key; }

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "../node_modules/webpack/buildin/module.js")(module), __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/preact-render-to-string/dist/index.module.js":
/*!********************************************************************!*\
  !*** ../node_modules/preact-render-to-string/dist/index.module.js ***!
  \********************************************************************/
/*! exports provided: default, render, renderToStaticMarkup, renderToString, shallowRender */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderToStaticMarkup", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderToString", function() { return m; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallowRender", function() { return g; });
/* harmony import */ var preact__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! preact */ "../node_modules/preact/dist/preact.module.js");
var r=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i,n=/[&<>"]/;function o(e){var t=String(e);return n.test(t)?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):t}var a=function(e,t){return String(e).replace(/(\n+)/g,"$1"+(t||"\t"))},i=function(e,t,r){return String(e).length>(t||40)||!r&&-1!==String(e).indexOf("\n")||-1!==String(e).indexOf("<")},l={};function s(e){var t="";for(var n in e){var o=e[n];null!=o&&""!==o&&(t&&(t+=" "),t+="-"==n[0]?n:l[n]||(l[n]=n.replace(/([A-Z])/g,"-$1").toLowerCase()),t+=": ",t+=o,"number"==typeof o&&!1===r.test(n)&&(t+="px"),t+=";")}return t||void 0}function f(e,t){for(var r in t)e[r]=t[r];return e}function u(e,t){return Array.isArray(t)?t.reduce(u,e):null!=t&&!1!==t&&e.push(t),e}var c={shallow:!0},p=[],_=/^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/,d=/[\s\n\\/='"\0<>]/;function v(){this.__d=!0}m.render=m;var g=function(e,t){return m(e,t,c)},h=[];function m(t,r,n){r=r||{},n=n||{};var o=preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s;preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s=!0;var a=x(t,r,n);return preact__WEBPACK_IMPORTED_MODULE_0__["options"].__c&&preact__WEBPACK_IMPORTED_MODULE_0__["options"].__c(t,h),h.length=0,preact__WEBPACK_IMPORTED_MODULE_0__["options"].__s=o,a}function x(r,n,l,c,g,h){if(null==r||"boolean"==typeof r)return"";if("object"!=typeof r)return o(r);var m=l.pretty,y=m&&"string"==typeof m?m:"\t";if(Array.isArray(r)){for(var b="",S=0;S<r.length;S++)m&&S>0&&(b+="\n"),b+=x(r[S],n,l,c,g,h);return b}var w,k=r.type,O=r.props,C=!1;if("function"==typeof k){if(C=!0,!l.shallow||!c&&!1!==l.renderRootComponent){if(k===preact__WEBPACK_IMPORTED_MODULE_0__["Fragment"]){var A=[];return u(A,r.props.children),x(A,n,l,!1!==l.shallowHighOrder,g,h)}var H,j=r.__c={__v:r,context:n,props:r.props,setState:v,forceUpdate:v,__d:!0,__h:[]};preact__WEBPACK_IMPORTED_MODULE_0__["options"].__b&&preact__WEBPACK_IMPORTED_MODULE_0__["options"].__b(r);var F=preact__WEBPACK_IMPORTED_MODULE_0__["options"].__r;if(k.prototype&&"function"==typeof k.prototype.render){var M=k.contextType,T=M&&n[M.__c],$=null!=M?T?T.props.value:M.__:n;(j=r.__c=new k(O,$)).__v=r,j._dirty=j.__d=!0,j.props=O,null==j.state&&(j.state={}),null==j._nextState&&null==j.__s&&(j._nextState=j.__s=j.state),j.context=$,k.getDerivedStateFromProps?j.state=f(f({},j.state),k.getDerivedStateFromProps(j.props,j.state)):j.componentWillMount&&(j.componentWillMount(),j.state=j._nextState!==j.state?j._nextState:j.__s!==j.state?j.__s:j.state),F&&F(r),H=j.render(j.props,j.state,j.context)}else for(var L=k.contextType,E=L&&n[L.__c],D=null!=L?E?E.props.value:L.__:n,N=0;j.__d&&N++<25;)j.__d=!1,F&&F(r),H=k.call(r.__c,O,D);return j.getChildContext&&(n=f(f({},n),j.getChildContext())),preact__WEBPACK_IMPORTED_MODULE_0__["options"].diffed&&preact__WEBPACK_IMPORTED_MODULE_0__["options"].diffed(r),x(H,n,l,!1!==l.shallowHighOrder,g,h)}k=(w=k).displayName||w!==Function&&w.name||function(e){var t=(Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/)||"")[1];if(!t){for(var r=-1,n=p.length;n--;)if(p[n]===e){r=n;break}r<0&&(r=p.push(e)-1),t="UnnamedComponent"+r}return t}(w)}var P,R,U="<"+k;if(O){var W=Object.keys(O);l&&!0===l.sortAttributes&&W.sort();for(var q=0;q<W.length;q++){var z=W[q],I=O[z];if("children"!==z){if(!d.test(z)&&(l&&l.allAttributes||"key"!==z&&"ref"!==z&&"__self"!==z&&"__source"!==z)){if("defaultValue"===z)z="value";else if("className"===z){if(void 0!==O.class)continue;z="class"}else g&&z.match(/^xlink:?./)&&(z=z.toLowerCase().replace(/^xlink:?/,"xlink:"));if("htmlFor"===z){if(O.for)continue;z="for"}"style"===z&&I&&"object"==typeof I&&(I=s(I)),"a"===z[0]&&"r"===z[1]&&"boolean"==typeof I&&(I=String(I));var V=l.attributeHook&&l.attributeHook(z,I,n,l,C);if(V||""===V)U+=V;else if("dangerouslySetInnerHTML"===z)R=I&&I.__html;else if("textarea"===k&&"value"===z)P=I;else if((I||0===I||""===I)&&"function"!=typeof I){if(!(!0!==I&&""!==I||(I=z,l&&l.xml))){U+=" "+z;continue}if("value"===z){if("select"===k){h=I;continue}"option"===k&&h==I&&void 0===O.selected&&(U+=" selected")}U+=" "+z+'="'+o(I)+'"'}}}else P=I}}if(m){var Z=U.replace(/\n\s*/," ");Z===U||~Z.indexOf("\n")?m&&~U.indexOf("\n")&&(U+="\n"):U=Z}if(U+=">",d.test(k))throw new Error(k+" is not a valid HTML tag name in "+U);var B,G=_.test(k)||l.voidElements&&l.voidElements.test(k),J=[];if(R)m&&i(R)&&(R="\n"+y+a(R,y)),U+=R;else if(null!=P&&u(B=[],P).length){for(var K=m&&~U.indexOf("\n"),Q=!1,X=0;X<B.length;X++){var Y=B[X];if(null!=Y&&!1!==Y){var ee=x(Y,n,l,!0,"svg"===k||"foreignObject"!==k&&g,h);if(m&&!K&&i(ee)&&(K=!0),ee)if(m){var te=ee.length>0&&"<"!=ee[0];Q&&te?J[J.length-1]+=ee:J.push(ee),Q=te}else J.push(ee)}}if(m&&K)for(var re=J.length;re--;)J[re]="\n"+y+a(J[re],y)}if(J.length||R)U+=J.join("");else if(l&&l.xml)return U.substring(0,U.length-1)+" />";return!G||B||R?(m&&~U.indexOf("\n")&&(U+="\n"),U+="</"+k+">"):U=U.replace(/>$/," />"),U}m.shallowRender=g;/* harmony default export */ __webpack_exports__["default"] = (m);
//# sourceMappingURL=index.module.js.map


/***/ }),

/***/ "../node_modules/preact/compat/server.js":
/*!***********************************************!*\
  !*** ../node_modules/preact/compat/server.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable */
var renderToString;
try {
	const mod = __webpack_require__(/*! preact-render-to-string */ "../node_modules/preact-render-to-string/dist/index.module.js");
	renderToString = mod.default || mod.renderToString || mod;
} catch (e) {
	throw Error(
		'renderToString() error: missing "preact-render-to-string" dependency.'
	);
}

module.exports = {
	renderToString: renderToString,
	renderToStaticMarkup: renderToString
};


/***/ }),

/***/ "../node_modules/react-noscript/lib/ReactNoScript.js":
/*!***********************************************************!*\
  !*** ../node_modules/react-noscript/lib/ReactNoScript.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = NoScript;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");

var _react2 = _interopRequireDefault(_react);

var _reactDomServer = __webpack_require__(/*! react-dom/server */ "../node_modules/preact/compat/server.js");

var _reactDomServer2 = _interopRequireDefault(_reactDomServer);

function NoScript(props) {
    var staticMarkup = _reactDomServer2['default'].renderToStaticMarkup(props.children);
    return _react2['default'].createElement('noscript', { dangerouslySetInnerHTML: { __html: staticMarkup } });
}

module.exports = exports['default'];

/***/ }),

/***/ "../node_modules/react-redux/es/components/Provider.js":
/*!*************************************************************!*\
  !*** ../node_modules/react-redux/es/components/Provider.js ***!
  \*************************************************************/
/*! exports provided: createProvider, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createProvider", function() { return createProvider; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_PropTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/PropTypes */ "../node_modules/react-redux/es/utils/PropTypes.js");
/* harmony import */ var _utils_warning__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/warning */ "../node_modules/react-redux/es/utils/warning.js");





var prefixUnsafeLifecycleMethods = typeof react__WEBPACK_IMPORTED_MODULE_1__["default"].forwardRef !== "undefined";
var didWarnAboutReceivingStore = false;

function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }

  didWarnAboutReceivingStore = true;
  Object(_utils_warning__WEBPACK_IMPORTED_MODULE_4__["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reduxjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider(storeKey) {
  var _Provider$childContex;

  if (storeKey === void 0) {
    storeKey = 'store';
  }

  var subscriptionKey = storeKey + "Subscription";

  var Provider =
  /*#__PURE__*/
  function (_Component) {
    Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Provider, _Component);

    var _proto = Provider.prototype;

    _proto.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      var _this;

      _this = _Component.call(this, props, context) || this;
      _this[storeKey] = props.store;
      return _this;
    }

    _proto.render = function render() {
      return react__WEBPACK_IMPORTED_MODULE_1__["Children"].only(this.props.children);
    };

    return Provider;
  }(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

  if (true) {
    // Use UNSAFE_ event name where supported
    var eventName = prefixUnsafeLifecycleMethods ? 'UNSAFE_componentWillReceiveProps' : 'componentWillReceiveProps';

    Provider.prototype[eventName] = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.propTypes = {
    store: _utils_PropTypes__WEBPACK_IMPORTED_MODULE_3__["storeShape"].isRequired,
    children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.element.isRequired
  };
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = _utils_PropTypes__WEBPACK_IMPORTED_MODULE_3__["storeShape"].isRequired, _Provider$childContex[subscriptionKey] = _utils_PropTypes__WEBPACK_IMPORTED_MODULE_3__["subscriptionShape"], _Provider$childContex);
  return Provider;
}
/* harmony default export */ __webpack_exports__["default"] = (createProvider());

/***/ }),

/***/ "../node_modules/react-redux/es/components/connectAdvanced.js":
/*!********************************************************************!*\
  !*** ../node_modules/react-redux/es/components/connectAdvanced.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return connectAdvanced; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "../node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/assertThisInitialized */ "../node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hoist-non-react-statics */ "../node_modules/react-redux/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! invariant */ "../node_modules/invariant/browser.js");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-is */ "../node_modules/react-is/index.js");
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_is__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _utils_Subscription__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/Subscription */ "../node_modules/react-redux/es/utils/Subscription.js");
/* harmony import */ var _utils_PropTypes__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/PropTypes */ "../node_modules/react-redux/es/utils/PropTypes.js");










var prefixUnsafeLifecycleMethods = typeof react__WEBPACK_IMPORTED_MODULE_6__["default"].forwardRef !== "undefined";
var hotReloadingVersion = 0;
var dummyState = {};

function noop() {}

function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);

        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };
  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory, // options object:
_ref) {
  var _contextTypes, _childContextTypes;

  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$getDisplayName = _ref2.getDisplayName,
      getDisplayName = _ref2$getDisplayName === void 0 ? function (name) {
    return "ConnectAdvanced(" + name + ")";
  } : _ref2$getDisplayName,
      _ref2$methodName = _ref2.methodName,
      methodName = _ref2$methodName === void 0 ? 'connectAdvanced' : _ref2$methodName,
      _ref2$renderCountProp = _ref2.renderCountProp,
      renderCountProp = _ref2$renderCountProp === void 0 ? undefined : _ref2$renderCountProp,
      _ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
      _ref2$storeKey = _ref2.storeKey,
      storeKey = _ref2$storeKey === void 0 ? 'store' : _ref2$storeKey,
      _ref2$withRef = _ref2.withRef,
      withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
      connectOptions = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_3__["default"])(_ref2, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef"]);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;
  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = _utils_PropTypes__WEBPACK_IMPORTED_MODULE_9__["storeShape"], _contextTypes[subscriptionKey] = _utils_PropTypes__WEBPACK_IMPORTED_MODULE_9__["subscriptionShape"], _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = _utils_PropTypes__WEBPACK_IMPORTED_MODULE_9__["subscriptionShape"], _childContextTypes);
  return function wrapWithConnect(WrappedComponent) {
    invariant__WEBPACK_IMPORTED_MODULE_5___default()(Object(react_is__WEBPACK_IMPORTED_MODULE_7__["isValidElementType"])(WrappedComponent), "You must pass a component to the function returned by " + (methodName + ". Instead received " + JSON.stringify(WrappedComponent)));
    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent // TODO Actually fix our use of componentWillReceiveProps

      /* eslint-disable react/no-deprecated */

    });

    var Connect =
    /*#__PURE__*/
    function (_Component) {
      Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Connect, _Component);

      function Connect(props, context) {
        var _this;

        _this = _Component.call(this, props, context) || this;
        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(_this)));
        invariant__WEBPACK_IMPORTED_MODULE_5___default()(_this.store, "Could not find \"" + storeKey + "\" in either the context or props of " + ("\"" + displayName + "\". Either wrap the root component in a <Provider>, ") + ("or explicitly pass \"" + storeKey + "\" as a prop to \"" + displayName + "\"."));

        _this.initSelector();

        _this.initSubscription();

        return _this;
      }

      var _proto = Connect.prototype;

      _proto.getChildContext = function getChildContext() {
        var _ref3;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref3 = {}, _ref3[subscriptionKey] = subscription || this.context[subscriptionKey], _ref3;
      };

      _proto.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return; // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.

        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      }; // Note: this is renamed below to the UNSAFE_ version in React >=16.3.0


      _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      _proto.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      _proto.getWrappedInstance = function getWrappedInstance() {
        invariant__WEBPACK_IMPORTED_MODULE_5___default()(withRef, "To access the wrapped instance, you need to specify " + ("{ withRef: true } in the options argument of the " + methodName + "() call."));
        return this.wrappedInstance;
      };

      _proto.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      _proto.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      _proto.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return; // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.

        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new _utils_Subscription__WEBPACK_IMPORTED_MODULE_8__["default"](this.store, parentSub, this.onStateChange.bind(this)); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.

        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      _proto.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      _proto.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      _proto.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      _proto.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props; // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad

        var withExtras = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_2__["default"])({}, props);

        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      _proto.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return Object(react__WEBPACK_IMPORTED_MODULE_6__["createElement"])(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(react__WEBPACK_IMPORTED_MODULE_6__["Component"]);

    if (prefixUnsafeLifecycleMethods) {
      // Use UNSAFE_ event name where supported
      Connect.prototype.UNSAFE_componentWillReceiveProps = Connect.prototype.componentWillReceiveProps;
      delete Connect.prototype.componentWillReceiveProps;
    }
    /* eslint-enable react/no-deprecated */


    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (true) {
      // Use UNSAFE_ event name where supported
      var eventName = prefixUnsafeLifecycleMethods ? 'UNSAFE_componentWillUpdate' : 'componentWillUpdate';

      Connect.prototype[eventName] = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector(); // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.

          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }

          this.initSubscription();

          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4___default()(Connect, WrappedComponent);
  };
}

/***/ }),

/***/ "../node_modules/react-redux/es/connect/connect.js":
/*!*********************************************************!*\
  !*** ../node_modules/react-redux/es/connect/connect.js ***!
  \*********************************************************/
/*! exports provided: createConnect, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createConnect", function() { return createConnect; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _components_connectAdvanced__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/connectAdvanced */ "../node_modules/react-redux/es/components/connectAdvanced.js");
/* harmony import */ var _utils_shallowEqual__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/shallowEqual */ "../node_modules/react-redux/es/utils/shallowEqual.js");
/* harmony import */ var _mapDispatchToProps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mapDispatchToProps */ "../node_modules/react-redux/es/connect/mapDispatchToProps.js");
/* harmony import */ var _mapStateToProps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mapStateToProps */ "../node_modules/react-redux/es/connect/mapStateToProps.js");
/* harmony import */ var _mergeProps__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mergeProps */ "../node_modules/react-redux/es/connect/mergeProps.js");
/* harmony import */ var _selectorFactory__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./selectorFactory */ "../node_modules/react-redux/es/connect/selectorFactory.js");








/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error("Invalid value of type " + typeof arg + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
  };
}

function strictEqual(a, b) {
  return a === b;
} // createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios


function createConnect(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === void 0 ? _components_connectAdvanced__WEBPACK_IMPORTED_MODULE_2__["default"] : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? _mapStateToProps__WEBPACK_IMPORTED_MODULE_5__["default"] : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? _mapDispatchToProps__WEBPACK_IMPORTED_MODULE_4__["default"] : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === void 0 ? _mergeProps__WEBPACK_IMPORTED_MODULE_6__["default"] : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === void 0 ? _selectorFactory__WEBPACK_IMPORTED_MODULE_7__["default"] : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {
    if (_ref2 === void 0) {
      _ref2 = {};
    }

    var _ref3 = _ref2,
        _ref3$pure = _ref3.pure,
        pure = _ref3$pure === void 0 ? true : _ref3$pure,
        _ref3$areStatesEqual = _ref3.areStatesEqual,
        areStatesEqual = _ref3$areStatesEqual === void 0 ? strictEqual : _ref3$areStatesEqual,
        _ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
        areOwnPropsEqual = _ref3$areOwnPropsEqua === void 0 ? _utils_shallowEqual__WEBPACK_IMPORTED_MODULE_3__["default"] : _ref3$areOwnPropsEqua,
        _ref3$areStatePropsEq = _ref3.areStatePropsEqual,
        areStatePropsEqual = _ref3$areStatePropsEq === void 0 ? _utils_shallowEqual__WEBPACK_IMPORTED_MODULE_3__["default"] : _ref3$areStatePropsEq,
        _ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
        areMergedPropsEqual = _ref3$areMergedPropsE === void 0 ? _utils_shallowEqual__WEBPACK_IMPORTED_MODULE_3__["default"] : _ref3$areMergedPropsE,
        extraOptions = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref3, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
      // used in error messages
      methodName: 'connect',
      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return "Connect(" + name + ")";
      },
      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),
      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    }, extraOptions));
  };
}
/* harmony default export */ __webpack_exports__["default"] = (createConnect());

/***/ }),

/***/ "../node_modules/react-redux/es/connect/mapDispatchToProps.js":
/*!********************************************************************!*\
  !*** ../node_modules/react-redux/es/connect/mapDispatchToProps.js ***!
  \********************************************************************/
/*! exports provided: whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whenMapDispatchToPropsIsFunction", function() { return whenMapDispatchToPropsIsFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whenMapDispatchToPropsIsMissing", function() { return whenMapDispatchToPropsIsMissing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whenMapDispatchToPropsIsObject", function() { return whenMapDispatchToPropsIsObject; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "../node_modules/redux/es/index.js");
/* harmony import */ var _wrapMapToProps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./wrapMapToProps */ "../node_modules/react-redux/es/connect/wrapMapToProps.js");


function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? Object(_wrapMapToProps__WEBPACK_IMPORTED_MODULE_1__["wrapMapToPropsFunc"])(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}
function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? Object(_wrapMapToProps__WEBPACK_IMPORTED_MODULE_1__["wrapMapToPropsConstant"])(function (dispatch) {
    return {
      dispatch: dispatch
    };
  }) : undefined;
}
function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? Object(_wrapMapToProps__WEBPACK_IMPORTED_MODULE_1__["wrapMapToPropsConstant"])(function (dispatch) {
    return Object(redux__WEBPACK_IMPORTED_MODULE_0__["bindActionCreators"])(mapDispatchToProps, dispatch);
  }) : undefined;
}
/* harmony default export */ __webpack_exports__["default"] = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);

/***/ }),

/***/ "../node_modules/react-redux/es/connect/mapStateToProps.js":
/*!*****************************************************************!*\
  !*** ../node_modules/react-redux/es/connect/mapStateToProps.js ***!
  \*****************************************************************/
/*! exports provided: whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whenMapStateToPropsIsFunction", function() { return whenMapStateToPropsIsFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whenMapStateToPropsIsMissing", function() { return whenMapStateToPropsIsMissing; });
/* harmony import */ var _wrapMapToProps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wrapMapToProps */ "../node_modules/react-redux/es/connect/wrapMapToProps.js");

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? Object(_wrapMapToProps__WEBPACK_IMPORTED_MODULE_0__["wrapMapToPropsFunc"])(mapStateToProps, 'mapStateToProps') : undefined;
}
function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? Object(_wrapMapToProps__WEBPACK_IMPORTED_MODULE_0__["wrapMapToPropsConstant"])(function () {
    return {};
  }) : undefined;
}
/* harmony default export */ __webpack_exports__["default"] = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);

/***/ }),

/***/ "../node_modules/react-redux/es/connect/mergeProps.js":
/*!************************************************************!*\
  !*** ../node_modules/react-redux/es/connect/mergeProps.js ***!
  \************************************************************/
/*! exports provided: defaultMergeProps, wrapMergePropsFunc, whenMergePropsIsFunction, whenMergePropsIsOmitted, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultMergeProps", function() { return defaultMergeProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapMergePropsFunc", function() { return wrapMergePropsFunc; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whenMergePropsIsFunction", function() { return whenMergePropsIsFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whenMergePropsIsOmitted", function() { return whenMergePropsIsOmitted; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/extends */ "../node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _utils_verifyPlainObject__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/verifyPlainObject */ "../node_modules/react-redux/es/utils/verifyPlainObject.js");


function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, ownProps, stateProps, dispatchProps);
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;
    var hasRunOnce = false;
    var mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (true) Object(_utils_verifyPlainObject__WEBPACK_IMPORTED_MODULE_1__["default"])(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}
function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}
function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}
/* harmony default export */ __webpack_exports__["default"] = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);

/***/ }),

/***/ "../node_modules/react-redux/es/connect/selectorFactory.js":
/*!*****************************************************************!*\
  !*** ../node_modules/react-redux/es/connect/selectorFactory.js ***!
  \*****************************************************************/
/*! exports provided: impureFinalPropsSelectorFactory, pureFinalPropsSelectorFactory, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "impureFinalPropsSelectorFactory", function() { return impureFinalPropsSelectorFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pureFinalPropsSelectorFactory", function() { return pureFinalPropsSelectorFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return finalPropsSelectorFactory; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectWithoutPropertiesLoose */ "../node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _verifySubselectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./verifySubselectors */ "../node_modules/react-redux/es/connect/verifySubselectors.js");


function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;
  var hasRunAtLeastOnce = false;
  var state;
  var ownProps;
  var stateProps;
  var dispatchProps;
  var mergedProps;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
} // TODO: Add more comments
// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (true) {
    Object(_verifySubselectors__WEBPACK_IMPORTED_MODULE_1__["default"])(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}

/***/ }),

/***/ "../node_modules/react-redux/es/connect/verifySubselectors.js":
/*!********************************************************************!*\
  !*** ../node_modules/react-redux/es/connect/verifySubselectors.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return verifySubselectors; });
/* harmony import */ var _utils_warning__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/warning */ "../node_modules/react-redux/es/utils/warning.js");


function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error("Unexpected value for " + methodName + " in " + displayName + ".");
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      Object(_utils_warning__WEBPACK_IMPORTED_MODULE_0__["default"])("The selector for " + methodName + " of " + displayName + " did not specify a value for dependsOnOwnProps.");
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

/***/ }),

/***/ "../node_modules/react-redux/es/connect/wrapMapToProps.js":
/*!****************************************************************!*\
  !*** ../node_modules/react-redux/es/connect/wrapMapToProps.js ***!
  \****************************************************************/
/*! exports provided: wrapMapToPropsConstant, getDependsOnOwnProps, wrapMapToPropsFunc */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapMapToPropsConstant", function() { return wrapMapToPropsConstant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDependsOnOwnProps", function() { return getDependsOnOwnProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapMapToPropsFunc", function() { return wrapMapToPropsFunc; });
/* harmony import */ var _utils_verifyPlainObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/verifyPlainObject */ "../node_modules/react-redux/es/utils/verifyPlainObject.js");

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }

    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..

function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    

function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    }; // allow detectFactoryAndVerify to get ownProps


    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (true) Object(_utils_verifyPlainObject__WEBPACK_IMPORTED_MODULE_0__["default"])(props, displayName, methodName);
      return props;
    };

    return proxy;
  };
}

/***/ }),

/***/ "../node_modules/react-redux/es/index.js":
/*!***********************************************!*\
  !*** ../node_modules/react-redux/es/index.js ***!
  \***********************************************/
/*! exports provided: Provider, createProvider, connectAdvanced, connect */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Provider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Provider */ "../node_modules/react-redux/es/components/Provider.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Provider", function() { return _components_Provider__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createProvider", function() { return _components_Provider__WEBPACK_IMPORTED_MODULE_0__["createProvider"]; });

/* harmony import */ var _components_connectAdvanced__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/connectAdvanced */ "../node_modules/react-redux/es/components/connectAdvanced.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "connectAdvanced", function() { return _components_connectAdvanced__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _connect_connect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./connect/connect */ "../node_modules/react-redux/es/connect/connect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "connect", function() { return _connect_connect__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "../node_modules/react-redux/es/utils/PropTypes.js":
/*!*********************************************************!*\
  !*** ../node_modules/react-redux/es/utils/PropTypes.js ***!
  \*********************************************************/
/*! exports provided: subscriptionShape, storeShape */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscriptionShape", function() { return subscriptionShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeShape", function() { return storeShape; });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! prop-types */ "../node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_0__);

var subscriptionShape = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  trySubscribe: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  tryUnsubscribe: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  notifyNestedSubs: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  isSubscribed: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});
var storeShape = prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.shape({
  subscribe: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  dispatch: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired,
  getState: prop_types__WEBPACK_IMPORTED_MODULE_0___default.a.func.isRequired
});

/***/ }),

/***/ "../node_modules/react-redux/es/utils/Subscription.js":
/*!************************************************************!*\
  !*** ../node_modules/react-redux/es/utils/Subscription.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Subscription; });
// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants
var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];
  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;

      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);
      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;
        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription =
/*#__PURE__*/
function () {
  function Subscription(store, parentSub, onStateChange) {
    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  var _proto = Subscription.prototype;

  _proto.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  _proto.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  _proto.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  _proto.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);
      this.listeners = createListenerCollection();
    }
  };

  _proto.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();



/***/ }),

/***/ "../node_modules/react-redux/es/utils/isPlainObject.js":
/*!*************************************************************!*\
  !*** ../node_modules/react-redux/es/utils/isPlainObject.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return isPlainObject; });
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;
  var baseProto = proto;

  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
}

/***/ }),

/***/ "../node_modules/react-redux/es/utils/shallowEqual.js":
/*!************************************************************!*\
  !*** ../node_modules/react-redux/es/utils/shallowEqual.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return shallowEqual; });
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/***/ }),

/***/ "../node_modules/react-redux/es/utils/verifyPlainObject.js":
/*!*****************************************************************!*\
  !*** ../node_modules/react-redux/es/utils/verifyPlainObject.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return verifyPlainObject; });
/* harmony import */ var _isPlainObject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isPlainObject */ "../node_modules/react-redux/es/utils/isPlainObject.js");
/* harmony import */ var _warning__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./warning */ "../node_modules/react-redux/es/utils/warning.js");


function verifyPlainObject(value, displayName, methodName) {
  if (!Object(_isPlainObject__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
    Object(_warning__WEBPACK_IMPORTED_MODULE_1__["default"])(methodName + "() in " + displayName + " must return a plain object. Instead received " + value + ".");
  }
}

/***/ }),

/***/ "../node_modules/react-redux/es/utils/warning.js":
/*!*******************************************************!*\
  !*** ../node_modules/react-redux/es/utils/warning.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return warning; });
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */

}

/***/ }),

/***/ "../node_modules/react-redux/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!************************************************************************************************************!*\
  !*** ../node_modules/react-redux/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "../node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "../node_modules/regenerator-runtime/runtime.js":
/*!******************************************************!*\
  !*** ../node_modules/regenerator-runtime/runtime.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "../node_modules/webpack/buildin/module.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/module.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/Globals/GaTracking.js":
/*!***********************************!*\
  !*** ./src/Globals/GaTracking.js ***!
  \***********************************/
/*! exports provided: A2HSApp, checkremktg, trackPageViewforHome, trackPVEnqBL, trackPV, gaTrack, eventTracking, generateGAforPLT, trackPVForMcat, trackPVForPDP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A2HSApp", function() { return A2HSApp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkremktg", function() { return checkremktg; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackPageViewforHome", function() { return trackPageViewforHome; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackPVEnqBL", function() { return trackPVEnqBL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackPV", function() { return trackPV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gaTrack", function() { return gaTrack; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eventTracking", function() { return eventTracking; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateGAforPLT", function() { return generateGAforPLT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackPVForMcat", function() { return trackPVForMcat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trackPVForPDP", function() { return trackPVForPDP; });
/* harmony import */ var _MainFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainFunctions */ "./src/Globals/MainFunctions.js");
/* harmony import */ var _CookieManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CookieManager */ "./src/Globals/CookieManager.js");
/* harmony import */ var _UserType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./UserType */ "./src/Globals/UserType.js");



var loginModes = {
  0: 'UnIdentified',
  1: 'Identified',
  2: 'LoggedIn',
  "null": 'UnIdentified'
};
var pageTitle = "IndiaMART - Indian Manufacturers Suppliers Exporters Directory - PWA";
var A2HSApp = function A2HSApp() {
  var pipe = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  var A2HSAppend = '';

  if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches || window.navigator && window.navigator.standalone === true) {
    if (pipe) A2HSAppend = '|' + 'A2HS';else A2HSAppend = 'A2HS';
  }

  return A2HSAppend;
};
var checkremktg = function checkremktg() {
  var remktgval = '';

  if (Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookie"])("remktg")) {
    remktgval = '|remktg';
  }

  return remktgval;
};
var trackPageViewforHome = function trackPageViewforHome() {
  var identified = Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookie"])('ImeshVisitor');
  var ls = localStorage;

  if (identified && (Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookieValByKey"])('ImeshVisitor', 'utyp') == 'P' || Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookieValByKey"])('ImeshVisitor', 'utyp') == 'F')) {
    gaTrack.trackPageView('/pwa/home/seller/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer', 'HomePage');
  } else if (identified) {
    gaTrack.trackPageView('/pwa/home/identified/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer', 'HomePage');
  } else if (!ls.recentMcats && !ls.relCats && !ls.relProds2 && !ls.prodsViewed) {
    gaTrack.trackPageView('/pwa/home/newuser/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer', 'HomePage');
  } else {
    gaTrack.trackPageView('/pwa/home/unidentified/', 'IndiaMART - Indian Manufacturers Suppliers Exporters Directory, India Exporter Manufacturer', 'HomePage');
  }
}; //PV Track for Enq/Bl and Error Pages

var trackPVEnqBL = function trackPVEnqBL(pageName) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var vpv = "/vpv/pwa/";

  if (pageName.indexOf('nf') > -1) {
    vpv = "/vpv/";
  }

  if (imgtm.length <= 1) {
    imgtm.push({
      "CD_User-Mode": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])() === 1 ? "identified" : "unidentified",
      "PV_Tracking": vpv + pageName,
      "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp()
    });

    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js"
      });
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "imgtm", "GTM-NR4G");
  } else {
    imgtm.push({
      "event": "VirtualPageview",
      "virtualPageURL": vpv + pageName,
      "virtualPageTitle": title,
      "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp()
    });
  }
}; //PV Track For BL

var trackPV = function trackPV(pageName) {
  var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Latest BL";

  if (pageName.indexOf("/bl/") <= -1 && (pageName == "/dir/" || pageName.indexOf("/dir/") > -1 || pageName.indexOf("/suppliers/") > -1 || pageName.indexOf("/proddetail/") > -1 || pageName.indexOf("/messages") > -1)) {
    if (imgtm.length <= 1) {
      imgtm.push({
        "CD_User-Mode": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])() === 1 ? "identified" : "unidentified",
        "PV_Tracking": "/vpv/pwa" + pageName,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp()
      });

      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js"
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "imgtm", "GTM-NR4G");
    } else {
      imgtm.push({
        "event": "VirtualPageview",
        "virtualPageURL": "/vpv/pwa" + pageName,
        "virtualPageTitle": title,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp()
      });
    }
  } else {
    var url = title.search('cityIndex') > -1 ? "/vpv" + pageName : "/vpv/pwa/bl/" + pageName;

    if (imgtm.length <= 1) {
      imgtm.push({
        "CD_User-Mode": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])() === 1 ? "identified" : "unidentified",
        "PV_Tracking": url,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp()
      });

      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js"
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "imgtm", "GTM-NR4G");
    } else {
      imgtm.push({
        "event": "VirtualPageview",
        "virtualPageURL": url,
        "virtualPageTitle": title,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp()
      });
    }

    imgtm.push({
      "CD_Cust-Type-Weight": Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookieValByKey"])("ImeshVisitor", "cmid") ? Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookieValByKey"])("ImeshVisitor", "cmid") : ''
    });
  }
}; //Track in General

var gaTrack = {
  trackPageView: function trackPageView(pageName, title, CD_Miscellaneous) {
    var brd_mcat_id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    // title = pageTitle;
    imgtm.push({
      "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])(CD_Miscellaneous) + A2HSApp()
    });

    if (window.location.pathname.indexOf("messages") > -1 && imgtm.length > 3 && window.location.pathname.indexOf("isearch") === -1 && window.location.pathname.indexOf("bl") === -1 && window.location.pathname != '/') {
      imgtm.push({
        "CD_User-Mode": loginModes[Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])()] === 1 ? "identified" : "unidentified",
        "PV_Tracking": "/vpv" + pageName,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp()
      });

      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js"
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "imgtm", "GTM-NR4G");
    } else if (window.location.pathname.indexOf("seller") > -1 && imgtm.length === 0 && window.location.pathname.indexOf("isearch") === -1 && window.location.pathname.indexOf("bl") === -1 && window.location.pathname != '/') {
      imgtm.push({
        "CD_User-Mode": loginModes[Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])()] === 1 ? "identified" : "unidentified",
        "PV_Tracking": "/vpv" + pageName,
        "CD_Miscellaneous": window.location.pathname.indexOf("seller") > -1 ? Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp() + checkremktg() : Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp()
      });

      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js"
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "imgtm", "GTM-NR4G");
    } else if (pageName.indexOf('/pwa/home/') > -1 || pageName.indexOf('city-hub') > -1 || pageName == "/impcat/") {
      if (imgtm.length <= 1) {
        imgtm.push({
          "CD_User-Mode": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])() === 1 ? "identified" : "unidentified",
          "PV_Tracking": "/vpv" + pageName,
          "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])(CD_Miscellaneous) + pageName.indexOf('city-hub') > -1 ? "|ImpcatPWA" : "" + A2HSApp()
        });

        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js"
          });
          var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "imgtm", "GTM-NR4G");
      } else {
        imgtm.push({
          "event": "VirtualPageview",
          "virtualPageURL": "/vpv" + pageName,
          "virtualPageTitle": title,
          "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])(CD_Miscellaneous) + pageName.indexOf('city-hub') > -1 ? "|ImpcatPWA" : "" + A2HSApp()
        });

        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js"
          });
          var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "imgtm", "GTM-NR4G");
      }
    } else if (pageName.indexOf('/company') > -1) {
      var langSelection = Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookie"])("lang") == "1" ? "LangHi" : "LangEn";

      if (imgtm.length <= 1) {
        imgtm.push({
          "CD_User-Mode": loginModes[Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])()] === 1 ? "identified" : "unidentified",
          "PV_Tracking": "/vpv" + pageName,
          "CD_Miscellaneous": langSelection + '|CompanyPWA' + A2HSApp(),
          "CD_MCAT": brd_mcat_id
        });

        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js"
          });
          var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "imgtm", "GTM-NR4G");
      } else {
        imgtm.push({
          "event": "VirtualPageview",
          "CD_User-Mode": loginModes[Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])()] === 1 ? "identified" : "unidentified",
          "virtualPageURL": "/vpv" + pageName,
          "CD_Miscellaneous": langSelection + '|CompanyPWA' + A2HSApp(),
          "CD_MCAT": brd_mcat_id
        });

        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js"
          });
          var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "imgtm", "GTM-NR4G");
      }
    } else if (pageName.indexOf('/pwa/dir/') > -1) {
      imgtm = [];
      imgtm.push({
        "event": "VirtualPageview",
        "virtualPageURL": "/vpv" + pageName,
        "virtualPageTitle": title,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp()
      });

      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js"
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "imgtm", "GTM-NR4G");
    } else {
      imgtm.push({
        'CD_User-Mode': loginModes[Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])()]
      });
      imgtm.push({
        "event": "VirtualPageview",
        "virtualPageURL": "/vpv" + pageName,
        "virtualPageTitle": title,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp()
      });

      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js"
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "imgtm", "GTM-NR4G");
    }

    imgtm.push({
      "CD_Cust-Type-Weight": Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookieValByKey"])("ImeshVisitor", "cmid") ? Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookieValByKey"])("ImeshVisitor", "cmid") : ''
    });
  },
  trackMessagesPageViewWithCustomDimension: function trackMessagesPageViewWithCustomDimension(pageName, title, CD_Source) {
    if (imgtm.length <= 1) {
      imgtm.push({
        "CD_User-Mode": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])() === 1 ? "identified" : "unidentified",
        "PV_Tracking": "/vpv/pwa" + pageName,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp(),
        "CD_Source": CD_Source
      });

      (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({
          "gtm.start": new Date().getTime(),
          event: "gtm.js"
        });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "imgtm", "GTM-NR4G");
    } else {
      imgtm.push({
        "event": "VirtualPageview",
        "virtualPageURL": "/vpv/pwa" + pageName,
        "virtualPageTitle": title,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])('') + A2HSApp(),
        "CD_Source": CD_Source
      });
    }
  },
  trackSearchPageViewWithCustomDimension: function trackSearchPageViewWithCustomDimension(pageNameInital, pagenameSuffix) {
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : pageTitle;
    var group_id = arguments.length > 3 ? arguments[3] : undefined;
    var cat_id = arguments.length > 4 ? arguments[4] : undefined;
    var top_mcat = arguments.length > 5 ? arguments[5] : undefined;
    var CD_Miscellaneous = arguments.length > 6 ? arguments[6] : undefined;
    var CD_List_Count = arguments.length > 7 ? arguments[7] : undefined;

    if (imgtm.length <= 1) {
      imgtm.push({
        "CD_User-Mode": loginModes[Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])()] === 1 ? "identified" : "unidentified",
        "PV_Tracking": pageNameInital + pagenameSuffix
      });
      imgtm.push({
        "CD_Group": group_id,
        "CD_Subcat": cat_id,
        "CD_MCAT": top_mcat,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])(CD_Miscellaneous) + A2HSApp(),
        "CD_List-Count": CD_List_Count,
        "CD_Source": "IMOB"
      });
    } else {
      imgtm.push({
        "event": "VirtualPageview",
        "virtualPageURL": pageNameInital + pagenameSuffix,
        "virtualPageTitle": title,
        "CD_Group": group_id,
        "CD_Subcat": cat_id,
        "CD_MCAT": top_mcat,
        "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])(CD_Miscellaneous) + A2HSApp(),
        "CD_List-Count": CD_List_Count,
        "CD_Source": "IMOB"
      });
    }

    imgtm.push({
      "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])(CD_Miscellaneous) + A2HSApp()
    });
    imgtm.push({
      "CD_Cust-Type-Weight": Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookieValByKey"])("ImeshVisitor", "cmid") ? Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookieValByKey"])("ImeshVisitor", "cmid") : ''
    });

    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js"
      });
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "imgtm", "GTM-NR4G");
  },
  trackEvent: function trackEvent(evArr) {
    window.location.pathname == "/" ? imgtm.push({
      "CD_Additional_Data": Object(_UserType__WEBPACK_IMPORTED_MODULE_2__["userType"])() + A2HSApp()
    }) : '';
    window.location.pathname.indexOf("/seller/") > -1 && checkremktg().length > 0 ? imgtm.push({
      "CD_Additional_Data": checkremktg() + A2HSApp()
    }) : '';
    window.location.pathname.indexOf("/messages/") > -1 && Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])() == 2 ? evArr[5] ? imgtm.push({
      "CD_Additional_Data": evArr[5]
    }) : imgtm.push({
      "CD_Additional_Data": ''
    }) : '';
    imgtm.push({
      'event': evArr[4] ? 'IMEvent' : 'IMEvent-NI',
      'eventCategory': evArr[0],
      'eventAction': evArr[1],
      'eventLabel': evArr[2],
      'eventValue': evArr[3]
    });
  },
  trackMiniPDP: function trackMiniPDP(displayData, langSelection) {
    imgtm.push({
      "event": "VirtualPageview",
      "virtualPageURL": "/vpv/pwa/" + Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["pdp_url"])(displayData.title, displayData.displayid),
      "CD_MCAT": displayData.mcatid[0],
      "CD_Subcat": displayData.catid[0],
      "CD_Miscellaneous": "single" + '|' + langSelection + A2HSApp()
    });
  }
};
var eventTracking = function eventTracking(a, b, c, d) {
  window.location.pathname == "/" ? imgtm.push({
    "CD_Additional_Data": Object(_UserType__WEBPACK_IMPORTED_MODULE_2__["userType"])() + A2HSApp(),
    "CD_Miscellaneous": Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["trackAppVer"])("Homepage") + A2HSApp()
  }) : '';
  imgtm.push({
    'event': d ? 'IMEvent' : 'IMEvent-NI',
    'eventCategory': a,
    'eventAction': b,
    'eventLabel': c,
    'eventValue': 0
  });
};
var generateGAforPLT = function generateGAforPLT(category, variable, label, value) {
  imgtm.push({
    'event': 'IMUserTiming',
    'timingCategory': category,
    'timingVar': variable,
    'timingLabel': label,
    'timingValue': value
  });
};
var trackPVForMcat = function trackPVForMcat(data) {
  var bizName = data.bizName ? "-".concat(data.bizName.toLowerCase()) : '';
  var cityName = data.cityName || data.rehitCityName || '';
  var url = cityName ? "/vpv/dir/".concat(data.groupFlName, "/").concat(data.subcatFlName, "/").concat(data.tracking.pageType).concat(bizName, "/").concat(cityName, "/").concat(data.flName, ".html") : "/vpv/dir/".concat(data.groupFlName, "/").concat(data.subcatFlName, "/").concat(data.tracking.pageType).concat(bizName, "/").concat(data.flName, ".html");
  var ImeshVisitor = Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookie"])('ImeshVisitor', 'object');
  var mcatLoginModes = {
    0: 'UnIdentified',
    1: 'Identified',
    2: 'Identified',
    "null": 'UnIdentified'
  };
  var userMode = mcatLoginModes[Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])()];
  var isHindi = data.cityName && data.vernacularCityName ? "|isHindi" : '';
  var isBrand = data.isBrand == '1' ? "|Brand" : '';
  var CDmiscellaneous = "MIM-Mcat|Typ-".concat(data.mcatProd).concat(isBrand).concat(isHindi, "|").concat(data.tracking.lang, "|ImpcatPWA").concat(A2HSApp());
  var tracking;

  if (imgtm.length <= 1) {
    tracking = {
      "CD_User-Mode": userMode,
      "PV_Tracking": url,
      "CD_Miscellaneous": CDmiscellaneous,
      "CD_MCAT": data.mcatId,
      "CD_Subcat": data.catId
    };
  } else {
    tracking = {
      "event": "VirtualPageview",
      "virtualPageURL": url,
      "CD_User-Mode": userMode,
      "CD_Miscellaneous": CDmiscellaneous,
      "CD_MCAT": data.mcatId,
      "CD_Subcat": data.catId
    };
  }

  if (ImeshVisitor) {
    if (ImeshVisitor.glid) tracking['CD_Gl-User-ID'] = ImeshVisitor.glid;
    if (ImeshVisitor.cmid) tracking['CD_Cust-Type-Weight'] = ImeshVisitor.cmid;
    if (ImeshVisitor.utyp) tracking['CD_User-Type'] = ImeshVisitor.utyp;
    var userDetails = '';
    var mverified = ImeshVisitor.uv ? 'Verified' : 'UnVerified';
    var name = ImeshVisitor.fn ? 'Name' : '_';
    var email = ImeshVisitor.em ? 'Email' : '_';
    var city = ImeshVisitor.ctid ? 'City' : '_';
    var eVerified = ImeshVisitor.ev ? 'EV' : '_';
    var GeoLoc = Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookie"])('GeoLoc') ? 'GeoLoc' : '_';
    userDetails = "".concat(mverified, "|").concat(name, "|").concat(email, "|").concat(city, "|").concat(eVerified, "|").concat(GeoLoc);
    if (userDetails) tracking['CD_User-Details'] = userDetails;
    tracking['CD_Verification-Status'] = mverified;
  } // if(data.groupId){
  //     tracking['CD_Group'] = data.groupId;
  // }


  imgtm.push(tracking);

  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js"
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "imgtm", "GTM-NR4G");
};
var trackPVForPDP = function trackPVForPDP(url, mcatId, data, langSelection) {
  var docTitle = data.ITEM_DOCS.pc_item_doc_title ? data.ITEM_DOCS.pc_item_doc_title : '';
  var itemImg = data.ITEM_IMG;
  var CDmiscellaneous = '';
  var hindiNameVal = '';

  if (data.PC_ITEM_HINDI_NAME != '') {
    hindiNameVal = '|hindi-name';
  }

  var CDsubcat = data.CAT_ID;
  var langSelected = '|' + langSelection;
  var selrCustWgt = data.GLUSR_USR_CUSTTYPE_WEIGHT ? selrCustWgt = 'SELLER:' + data.GLUSR_USR_CUSTTYPE_WEIGHT : selrCustWgt = '';
  var buyrCustWgt = Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookieValByKey"])("ImeshVisitor", "cmid");

  if (buyrCustWgt && buyrCustWgt != undefined) {
    buyrCustWgt = 'BUYER:' + buyrCustWgt + '|';
  } else {
    buyrCustWgt = 'BUYER:Null|';
  }

  var statusAprvl = data.PC_ITEM_STATUS_APPROVAL ? statusAprvl = '|STATUS:' + data.PC_ITEM_STATUS_APPROVAL : statusAprvl = '';

  if (docTitle != '' && docTitle == "VIDEO" && itemImg.length != 0) {
    CDmiscellaneous = 'video' + hindiNameVal + langSelected;
  } else if (itemImg.length != 0) {
    CDmiscellaneous = 'multiple-image' + hindiNameVal + langSelected;
  } else if (docTitle == 'VIDEO') {
    CDmiscellaneous = 'video' + hindiNameVal + langSelected;
  } else if (itemImg.length == 0) {
    CDmiscellaneous = 'single-image' + hindiNameVal + langSelected;
  }

  CDmiscellaneous += '|PDP' + statusAprvl;

  if (imgtm.length <= 1) {
    var userMode = loginModes[Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["checkUserStatus"])()];
    imgtm.push({
      "CD_User-Mode": userMode,
      "PV_Tracking": "/vpv/pwa" + url,
      "CD_Miscellaneous": CDmiscellaneous + A2HSApp()
    });
  } else {
    imgtm.push({
      "event": "VirtualPageview",
      "virtualPageURL": "/vpv/pwa" + url,
      "CD_Miscellaneous": CDmiscellaneous + A2HSApp()
    });
  }

  imgtm.push({
    "CD_MCAT": mcatId ? mcatId : '',
    "CD_Subcat": CDsubcat ? CDsubcat : '',
    "CD_Cust-Type-Weight": buyrCustWgt + selrCustWgt,
    "CD_Additional_Data": data.PC_ITEM_STATUS_APPROVAL ? data.PC_ITEM_STATUS_APPROVAL : ''
  });

  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js"
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "imgtm", "GTM-NR4G");
};

/***/ }),

/***/ "./src/Globals/GlobalFunc.js":
/*!***********************************!*\
  !*** ./src/Globals/GlobalFunc.js ***!
  \***********************************/
/*! exports provided: windowsKey, goToRoute, showToIndianUser, showSOI, detectLocation, validate_mobile, validate_email, resetCookies, timeSince, numTostring, doxssHandling, getXSSList, move_toNext1, chkInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "windowsKey", function() { return windowsKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "goToRoute", function() { return goToRoute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showToIndianUser", function() { return showToIndianUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSOI", function() { return showSOI; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detectLocation", function() { return detectLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_mobile", function() { return validate_mobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validate_email", function() { return validate_email; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetCookies", function() { return resetCookies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeSince", function() { return timeSince; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numTostring", function() { return numTostring; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doxssHandling", function() { return doxssHandling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getXSSList", function() { return getXSSList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "move_toNext1", function() { return move_toNext1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chkInput", function() { return chkInput; });
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router */ "../node_modules/react-router/es/index.js");
/* harmony import */ var _GaTracking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GaTracking */ "./src/Globals/GaTracking.js");
/* harmony import */ var _CookieManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CookieManager */ "./src/Globals/CookieManager.js");
/* harmony import */ var _MainFunctions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MainFunctions */ "./src/Globals/MainFunctions.js");




var windowsKey = function windowsKey() {
  return window;
};
var goToRoute = function goToRoute(pathTo, gaArr) {
  react_router__WEBPACK_IMPORTED_MODULE_0__["browserHistory"].push(pathTo);
};
var showToIndianUser = function showToIndianUser() {
  if (!Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_3__["checkUserStatus"])() && Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookie"])("iploc") != '' && Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])('iploc', 'gcniso') == "IN" || Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])('ImeshVisitor', 'glid') != '' && Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])('ImeshVisitor', 'iso') == "IN") {
    return true;
  } else {
    return false;
  }
};
var showSOI = function showSOI() {
  if (!Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_3__["checkUserStatus"])() && Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookie"])("iploc") != '' && Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])('iploc', 'gcniso') == "IN" || Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])('ImeshVisitor', 'glid') != '' && Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])('ImeshVisitor', 'iso') == "IN") {
    return true;
  } else {
    return false;
  }
};
var detectLocation = function detectLocation(geoLocState) {
  if (navigator && navigator.geolocation) {
    if (navigator.permissions) {
      navigator.permissions.query({
        name: 'geolocation'
      }).then(function (result) {
        if (result.state == 'granted') {
          navigator.geolocation.getCurrentPosition(function (position) {
            console.log('Geolocation permissions granted');
            console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
            Object(_GaTracking__WEBPACK_IMPORTED_MODULE_1__["eventTracking"])('GEOLOCATION', 'Geolocation Allow', 'search', true);
            Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["setCookie"])('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 3);
            geoLocState(result.state, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
          }, function (error) {
            console.log('Geolocation Error-' + error.message);
            Object(_GaTracking__WEBPACK_IMPORTED_MODULE_1__["eventTracking"])('GEOLOCATION', 'Geolocation Block', 'search', true);
            Object(_GaTracking__WEBPACK_IMPORTED_MODULE_1__["eventTracking"])('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true);
            Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["setCookie"])('GeoLoc', "lt=|lg=|acc=|createdate=", 3);
            geoLocState("denied");
          });
        } else if (result.state == 'denied') {
          console.log("Unable to detect location");
          geoLocState(result.state);
        } else if (result.state == 'prompt') {
          console.log('Geolocation permissions asked again');
          navigator.geolocation.getCurrentPosition(function (position) {}, function (error) {
            console.log('Geolocation Error-' + error.message);
            console.log('Phone location settings disabled. Please allow.');
            geoLocState("denied-phone");
          });

          result.onchange = function () {
            if (this.state == 'granted') {
              navigator.geolocation.getCurrentPosition(function (position) {
                console.log('Geolocation permissions granted');
                console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
                Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["setCookie"])('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 3);
                geoLocState("prompt-" + result.state, position.coords.latitude, position.coords.longitude, position.coords.accuracy);
              }, function (error) {
                console.log('Geolocation Error-' + error.message);
                Object(_GaTracking__WEBPACK_IMPORTED_MODULE_1__["eventTracking"])('GEOLOCATION', 'Geolocation Block', 'search', true);
                Object(_GaTracking__WEBPACK_IMPORTED_MODULE_1__["eventTracking"])('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true);
                Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["setCookie"])('GeoLoc', "lt=|lg=|acc=|createdate=", 3);
                geoLocState("denied");
              });
            } else if (this.state == 'denied') {
              geoLocState("prompt-" + result.state);
            }
          };
        }
      });
    } else {
      navigator.geolocation.getCurrentPosition(function (position) {
        console.log('Geolocation permissions granted');
        console.log('Lat.:' + position.coords.latitude + ', Long.:' + position.coords.longitude + ', Acc.:' + position.coords.accuracy);
        Object(_GaTracking__WEBPACK_IMPORTED_MODULE_1__["eventTracking"])('GEOLOCATION', 'Geolocation Allow', 'search', true);
        Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["setCookie"])('GeoLoc', "lt=" + position.coords.latitude.toFixed(5) + "|lg=" + position.coords.longitude.toFixed(5) + "|acc=" + position.coords.accuracy.toFixed(5) + "|createdate=" + new Date().getTime(), 1);
        geoLocState("granted", position.coords.latitude, position.coords.longitude, position.coords.accuracy);
      }, function (error) {
        console.log('Geolocation Error-' + error.message);
        Object(_GaTracking__WEBPACK_IMPORTED_MODULE_1__["eventTracking"])('GEOLOCATION', 'Geolocation Block', 'search', true);
        Object(_GaTracking__WEBPACK_IMPORTED_MODULE_1__["eventTracking"])('Filter-Clicks-Search', 'Unable-To-Detect', error.code + '-' + error.message, true);
        Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["setCookie"])('GeoLoc', "lt=|lg=|acc=|createdate=", 3);
        geoLocState("denied");
      });
    }
  }
};
var validate_mobile = function validate_mobile(mobNo) {
  var error = '',
      mobrRegex = /^[0-9-+()./ ]*$/,
      filter = /^(?:(?:\+|0{0,2})(91|910)(\s*[\-]\s*)?|[0]?)?[16789]\d{9}$/;

  if (mobNo == '' || mobNo.length == 0) {
    error = "Please enter mobile number";
    return error;
  } else if (isNaN(mobNo)) {
    error = "Please enter correct mobile number";
    return error;
  } else if (mobrRegex.test(mobNo)) {
    if (mobNo.length > 10 || mobNo.length < 10) {
      mobNo = mobNo.replace(/^((91){0,1}0{0,})/g, '');

      if (mobNo.length != 10) {
        error = "Please enter 10 digit mobile number";
        return error;
      } else {
        return error;
      }
    }

    if (!filter.test(mobNo)) {
      error = "Please enter correct mobile number";
      return error;
    } else {
      return error;
    }
  } else {
    return error;
  }
};
var validate_email = function validate_email(email) {
  var error = '',
      emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

  if (email == '' || email.length == 0) {
    error = "Email cannot be blank";
    return error;
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email)) {
    error = "Please enter a valid email";
    return error;
  } else {
    return error;
  }
};
var resetCookies = function resetCookies(access) {
  if (access == 4) {
    Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["deleteCookie"])('v4iilex');
    Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["deleteCookie"])('im_iss');
    window.location.reload();
  } else {
    Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["deleteCookie"])('ImeshVisitor');
    Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["deleteCookie"])('v4iilex');
    Object(_CookieManager__WEBPACK_IMPORTED_MODULE_2__["deleteCookie"])('im_iss');
    window.location.reload();
  }
};
var timeSince = function timeSince(date) {
  var secs = Math.abs(Math.floor((new Date().getTime() - date) / 1000));
  var minutes = secs / 60;

  if (minutes < 1) {
    return secs + (secs > 1 ? ' secs ago' : ' sec ago');
  }

  var hours = minutes / 60;
  minutes = Math.floor(minutes % 60);

  if (hours < 1) {
    return minutes + (minutes > 1 ? ' mins ago' : ' min ago');
  }

  var days = hours / 24;
  hours = Math.floor(hours % 24);

  if (days < 1) {
    return hours + (hours > 1 ? ' hrs ago' : ' hr ago');
  }

  var weeks = days / 7;
  days = Math.floor(days % 7);

  if (weeks < 1) {
    return days + (days > 1 ? ' days ago' : ' day ago');
  }

  var months = weeks / 4.35;
  weeks = Math.floor(weeks % 4.35);

  if (months < 1) {
    return weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
  }

  var years = months / 12;
  months = Math.floor(months % 12);

  if (years < 1) {
    return months + (months > 1 ? ' months ago' : ' month ago');
  }

  years = Math.floor(years);
  return years + (years > 1 ? ' yrs ago' : ' yr ago');
};
var numTostring = function numTostring(data) {
  var new_data = [];
  data.map(function (val, key) {
    var Entities = __webpack_require__(/*! he */ "../node_modules/he/he.js");

    var decode = Entities.decode(val);
    new_data.push(decode);
  });
  return new_data;
};
var doxssHandling = function doxssHandling(PostData) {
  var post_data = numTostring(PostData);
  var xsslist = getXSSList();
  var datauriregex = /(data:)([a-z]+\/[a-z0-9\-\+\.]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%]*\s*/i;

  for (var i = 0; i < post_data.length; i++) {
    post_data[i] = post_data[i].replace(/\s/gi, "");

    if (xsslist.test(post_data[i]) || datauriregex.test(post_data[i])) {
      var _data = {
        'code': '206',
        'message': 'Invalid Input!'
      };
      return _data;
    }
  }

  var data = {
    'code': '200',
    'message': 'Success'
  };
  return data;
};
var getXSSList = function getXSSList() {
  var list = /(javascript:|&lt;script|<script|&lt;\/script|<\/script|script&gt;|script>|&lt;\/xml|<\/xml|xml&gt;|xml>|&lt;object|<object|&lt;\/object|<\/object|object&gt;|object>|vbscript:|livescript:|&lt;javascript|javascript:|alert\(|&lt;iframe|<iframe|@import|&lt;META|<META|FSCommand|onAbort|onActivate|onAfterPrint|onAfterUpdate|onBeforeActivate|onBeforeCopy|onBeforeCut|onBeforeDeactivate|onBeforeEditFocus|onBeforePaste|onBeforePrint|onBeforeUnload|onBeforeUpdate|onBegin|onBlur|onBounce|onCellChange|onChange|onClick|onContextMenu|onControlSelect|onCopy|onCut|onDataAvailable|onDataSetChanged|onDataSetComplete|onDblClick|onDeactivate|onDrag|onDragEnd|onDragLeave|onDragEnter|onDragOver|onDragDrop|onDragStart|onDrop|onEnd|onError|onErrorUpdate|onFilterChange|onFinish|onFocus|onFocusIn|onFocusOut|onHashChange|onHelp|onInput|onKeyDown|onKeyPress|onKeyUp|onLayoutComplete|onLoad|onLoseCapture|onMediaComplete|onMediaError|onMessage|onMouseDown|onMouseEnter|onMouseLeave|onMouseMove|onMouseOut|onMouseOver|onMouseUp|onMouseWheel|onMove|onMoveEnd|onMoveStart|onOffline|onOnline|onOutOfSync|onPaste|onPause|onPopState|onProgress|onPropertyChange|onReadyStateChange|onRedo|onRepeat|onReset|onResize|onResizeEnd|onResizeStart|onResume|onReverse|onRowsEnter|onRowExit|onRowDelete|onRowInserted|onScroll|onSeek|onSelect|onSelectionChange|onSelectStart|onStart|onStop|onStorage|onSyncRestored|onSubmit|onTimeError|onTrackChange|onUndo|onUnload|onURLFlip|seekSegmentTime)/i;
  return list;
};
function move_toNext1(event, e, i) {
  // fires on backspace key
  if (event.keyCode == '8') {
    $('#' + e).prev().focus();
  }

  $('#' + e).val().length >= $('#' + e).prop('maxLength') && $('#' + i).focus();
}
function chkInput(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
  return true;
}

/***/ }),

/***/ "./src/Globals/RequestsHandler/fetcher.js":
/*!************************************************!*\
  !*** ./src/Globals/RequestsHandler/fetcher.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return controller; });
/* harmony import */ var _MainFunctions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../MainFunctions */ "./src/Globals/MainFunctions.js");
/* harmony import */ var _GaTracking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../GaTracking */ "./src/Globals/GaTracking.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var reqObj = {
  method: 'GET',
  url: '',
  body: {},
  timeout: 8000,
  headers: {
    "Content-type": "application/json"
  }
}; // function ontimeout() {
//     trackTimeout(reqObj.url);
//     gaTrack.trackEvent(['Timeout', "PWA", reqObj.url, 0, true]);
//     return ({
//         statusText: "service-timeout"
//     });
// }

function onload(xhr) {
  var data = '';

  if (100 <= xhr.status && xhr.status <= 199) {
    data = {
      status: xhr.status,
      statusText: 'info'
    };
  } else if (xhr.status == 200) {
    var res = JSON.parse(xhr.response);

    if (res !== undefined && res.response_reauth !== undefined && (res.response_reauth == false || res.response_reauth == 4)) {
      Object(_MainFunctions__WEBPACK_IMPORTED_MODULE_0__["resetCookies"])(res.response_reauth);
      data = {
        status: xhr.status,
        statusText: 'Reauth',
        response: 'Cookies Removed'
      };
    } else {
      data = {
        status: xhr.status,
        statusText: 'ok',
        response: res
      };
    }
  } else if (201 <= xhr.status && xhr.status <= 299) {
    var _res = JSON.parse(xhr.response);

    data = {
      status: xhr.status,
      statusText: 'success',
      response: _res
    };
  } else if (400 <= xhr.status && xhr.status <= 499) {
    data = {
      status: xhr.status,
      statusText: 'client-error'
    };
  } else {
    data = {
      status: xhr.status,
      statusText: 'server-error'
    };
  }

  return data;
}

function onerror(xhr) {
  return {
    status: xhr.status,
    statusText: xhr.statusText
  };
}

function getXHRObj() {
  var xhr = '';

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  return xhr;
}

function fetchReq(resolve, reject) {
  var xhr = getXHRObj();

  if (xhr) {
    xhr.open(reqObj.method, reqObj.url);

    for (var key in reqObj.headers) {
      xhr.setRequestHeader(key, reqObj.headers[key]);
    }

    xhr.timeout = reqObj.timeout;

    xhr.ontimeout = function () {
      trackTimeout(reqObj.url);
      _GaTracking__WEBPACK_IMPORTED_MODULE_1__["gaTrack"].trackEvent(['Timeout', "PWA", reqObj.url, 0, true]);
      return {
        statusText: "service-timeout"
      };
    };

    xhr.onload = function () {
      resolve(onload(xhr));
    };

    xhr.onerror = function () {
      reject(onerror(xhr));
    };

    xhr.send(JSON.stringify(reqObj.body));
  } else {
    reject("XHR Failed");
  }
}

function trackTimeout(url) {
  var datatimeout = {
    "url": url,
    "timeout": true
  };

  if (url !== '/ajaxrequest/identified/timeout/') {
    var requestInfo = {
      method: 'POST',
      url: '/ajaxrequest/identified/timeout/',
      body: datatimeout
    };
    var data = controller(requestInfo);
    data.then(function (result) {}, function (error) {});
  }
}

function controller() {
  var reqInputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  reqObj = _objectSpread(_objectSpread({}, reqObj), reqInputs);
  var dataReq = new Promise(fetchReq);
  return dataReq;
}

/***/ }),

/***/ "./src/Globals/RequestsHandler/makeRequest.js":
/*!****************************************************!*\
  !*** ./src/Globals/RequestsHandler/makeRequest.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeRequest; });
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetcher */ "./src/Globals/RequestsHandler/fetcher.js");
/* harmony import */ var _CookieManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../CookieManager */ "./src/Globals/CookieManager.js");



function attachGlid(method, url, body, glidAppend) {
  var requestInfo = {
    method: method,
    url: url,
    body: body
  };

  if (glidAppend) {
    var glid = Object(_CookieManager__WEBPACK_IMPORTED_MODULE_1__["getCookieValByKey"])('ImeshVisitor', 'glid');

    if (glid) {
      if (method == 'GET') {
        if (requestInfo.url.indexOf("?") >= 0) {
          requestInfo.url += "&glid=" + glid;
        } else {
          requestInfo.url += "?glid=" + glid;
        }
      } else //method:POST
        {
          requestInfo['body']['glid'] = glid;
        }
    }
  }

  return requestInfo;
}
/*

method:GET/POST
headers:object eg.{  "Content-type" :  "application/json"  }
glidAppend:true/false ---default false
*/


function makeRequest(method, url) {
  var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var headers = arguments.length > 3 ? arguments[3] : undefined;
  var timeout = arguments.length > 4 ? arguments[4] : undefined;
  var glidAppend = arguments.length > 5 ? arguments[5] : undefined;
  var requestInfo = attachGlid(method, url, body, glidAppend);
  if (headers) requestInfo['headers'] = headers;
  if (timeout) requestInfo['timeout'] = timeout;
  return Object(_fetcher__WEBPACK_IMPORTED_MODULE_0__["default"])(requestInfo);
}

/***/ }),

/***/ "./src/Globals/UserType.js":
/*!*********************************!*\
  !*** ./src/Globals/UserType.js ***!
  \*********************************/
/*! exports provided: userType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userType", function() { return userType; });
/* harmony import */ var _CookieManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CookieManager */ "./src/Globals/CookieManager.js");

var userType = function userType() {
  var ls = localStorage,
      userType = '',
      imesh = Object(_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookie"])('ImeshVisitor'),
      im_iss = Object(_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookie"])('im_iss');

  if (!imesh) {
    userType = 'UN';
  } else {
    var imeshUtype = Object(_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('ImeshVisitor', 'utyp');

    if (!im_iss) {
      userType = 'I';
    } else {
      userType = 'FL';
    }

    if (imeshUtype == "P") {
      userType += '-S';
    } else {
      userType += '-B';
    }
  }

  if (ls && (ls.recentMcats || ls.relCats || ls.relProds2 || ls.prodsViewed)) {
    userType += '-WB';
  } else {
    userType += '-WTB';
  }

  return userType;
};
/*
Returns userType on the basis of users' identification status and local storage data

UN-WTB     ( Unidentified-WithoutBrowsingHistory )
UN-WB      ( Unidentified-WithBrowsingHistory )
I-B-WTB    ( Identified-Buyer-WithoutBrowsingHistory )
I-B-WB     ( Identified-Buyer-WithBrowsingHistory )
I-S-WTB    ( Identified-Seller-WithoutBrowsingHistory )
I-S-WB     ( Identified-Seller-WithBrowsingHistory )
FL-B-WTB   ( FullLogin-Buyer-WithoutBrowsingHistory )
FL-B-WB    ( FullLogin-Buyer-WithBrowsingHistory )
FL-S-WTB   ( FullLogin-Seller-WithoutBrowsingHistory )
FL-S-WB    ( FullLogin-Seller-WithBrowsingHistory )
*/

/***/ }),

/***/ "./src/Globals/css/disable.css":
/*!*************************************!*\
  !*** ./src/Globals/css/disable.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/Redux/UserDetails/UDActions.js":
/*!********************************************!*\
  !*** ./src/Redux/UserDetails/UDActions.js ***!
  \********************************************/
/*! exports provided: fetchUDData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUDData", function() { return fetchUDData; });
/* harmony import */ var _api_imApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/imApi */ "./src/api/imApi.js");

var fetchUDData = function fetchUDData() {
  return function (dispatch) {
    return _api_imApi__WEBPACK_IMPORTED_MODULE_0__["default"].fetchBuyerUserdetails().then(function (response) {
      //console.log(response);
      dispatch({
        type: "FETCH_UD_SUCCESS",
        payload: response
      });
      return true;
    })["catch"](function (error) {
      dispatch({
        type: "FETCH_UD_FAILURE",
        payload: error
      });
    });
  };
};

/***/ }),

/***/ "./src/api/imApi.js":
/*!**************************!*\
  !*** ./src/api/imApi.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _locationApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locationApi */ "./src/api/locationApi.js");
/* harmony import */ var _constants_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/constants */ "./src/constants/constants.js");
/* harmony import */ var _Globals_MainFunctions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Globals/MainFunctions */ "./src/Globals/MainFunctions.js");
/* harmony import */ var _Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Globals/CookieManager */ "./src/Globals/CookieManager.js");
/* harmony import */ var _Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Globals/GaTracking */ "./src/Globals/GaTracking.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

//import gblFunc from '../Globals/GlobalFunctions';






var glid;
var imApi = {
  fetchOTPVer: function fetchOTPVer(params) {
    var data = params;
    return makeRequest2('POST', '/miscreact/ajaxrequest/buyer/otpver/', data, 20000);
  },
  fetchChangePassword: function fetchChangePassword(params) {
    var data = params;
    console.log(params);
    return makeRequest2('POST', '/miscreact/ajaxrequest/buyer/chgpassword/', data, 20000);
  },
  fetchBuyerUserdetails: function fetchBuyerUserdetails() {
    var data = {};
    return makeRequest2('GET', '/miscreact/ajaxrequest/buyer/UserDetails/', data, 20000);
  },
  fetchBuyerSettingsdetails: function fetchBuyerSettingsdetails() {
    var data1 = {
      "privacy_settings": new Array({
        'flag': '2'
      }),
      "mod_id": 'IMOB',
      "token": 'imobile@15061981',
      "glusrid": "glid"
    };
    var data = {};
    return makeRequest2('GET', '/miscreact/ajaxrequest/settingsData/', data);
  }
};

function makeRequestFile(method, url, file) {
  if (typeof window === "undefined" ? "undefined" : _typeof(window)) {
    glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
  }

  return new Promise(function (resolve, reject) {
    var fl = file;
    var fd = new FormData();
    var xhr = new XMLHttpRequest();
    fd.append("uploads[]", fl, fl.name);
    fd.append("glid", glid);
    xhr.open(method, url);
    xhr.timeout = 100000; // time in milliseconds

    xhr.onload = function () {
      if (this.status == 200 && this.readyState == 4) {
        return resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.ontimeout = function (e) {
      _Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["gaTrack"].trackEvent('Image-Attachment-PWA', 'Image-Upload', 'ImageTimeOut', 0, true);
      reject();
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    xhr.send(fd);
  }); //}
}

function makeRequest(method, url, body) {
  var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 8000;
  var glidAppend = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  Object(_Globals_MainFunctions__WEBPACK_IMPORTED_MODULE_2__["versionUp"])('XHR');

  if (typeof window === "undefined" ? "undefined" : _typeof(window)) {
    glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
  }

  return new Promise(function (resolve, reject) {
    if (method === "GET") {
      if (glid) {
        if (url.indexOf("?") >= 0 && glidAppend) {
          url += "&glid=" + glid;
        } else {
          if (glid && glidAppend) {
            url += "?glid=" + glid;
          }
        }
      }
    } else {
      if (glidAppend) {
        body['glid'] = glid;
      }

      body = JSON.stringify(body);
    }

    var isMsgMod = false;

    if (url.indexOf('messagecenter') != -1) {
      isMsgMod = true;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.timeout = timeout;

    xhr.ontimeout = function () {
      if (url !== "/ajaxrequest/identified/timeout/") {
        _Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["gaTrack"].trackEvent(['Timeout', "PWA", url, 0, true]);
        var datatimeout = {
          "url": url,
          "timeout": true
        };
        makeRequest('POST', '/ajaxrequest/identified/timeout/', datatimeout);
        reject({
          status: this.status,
          statusText: xhr.statusText,
          isMsgMod: isMsgMod,
          requestStatus: "timeout"
        });
      }
    };

    xhr.onload = function () {
      if (this.status == 200 && this.readyState == 4) {
        if (url.indexOf('/ajaxrequest/search/search') != -1) {
          if (!document.getElementById('searchListing')) {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])('PWA', 'First_load_search', 'search_service', Date.now() - window.searchAPITime);
          } else if (url.indexOf('&start=0') != -1) {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])('PWA', 'subsequent_load_search', 'search_service', Date.now() - window.searchAPITime);
          } else {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])('PWA', 'search_autofetch_search', 'search_service', Date.now() - window.searchAPITime);
          }
        }

        var res = xhr.response ? JSON.parse(xhr.response) : '';

        if (res !== undefined && res.response_reauth !== undefined && (res.response_reauth == false || res.response_reauth == 4)) {
          Object(_Globals_MainFunctions__WEBPACK_IMPORTED_MODULE_2__["resetCookies"])(res.response_reauth);
        } else {
          return resolve(res);
        }
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
          isMsgMod: isMsgMod
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
        isMsgMod: isMsgMod
      });
    };

    xhr.send(body);
  });
}

function makeRequest2(method, url, body) {
  var timeout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 8000;
  var glidAppend = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  return new Promise(function (resolve, reject) {
    //console.log("in mk2");
    if (method === "POST") {
      body = JSON.stringify(body);
    }

    if (method === "GET") {
      body = JSON.stringify(body);
    } //console.log(body);


    var isMsgMod = false;

    if (url.indexOf('messagecenter') != -1) {
      isMsgMod = true;
    } // console.log(url);


    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.timeout = timeout;

    xhr.ontimeout = function () {
      if (url !== "/ajaxrequest/identified/timeout/") {
        _Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["gaTrack"].trackEvent(['Timeout', "PWA", url, 0, true]);
        var datatimeout = {
          "url": url,
          "timeout": true
        };
        makeRequest('POST', '/ajaxrequest/identified/timeout/', datatimeout);
        reject({
          status: this.status,
          statusText: xhr.statusText,
          isMsgMod: isMsgMod,
          requestStatus: "timeout"
        });
      }
    };

    xhr.onload = function () {
      // console.log("response recieved");
      // console.log("in xhr response"+xhr.response);
      if (this.status == 200 && this.readyState == 4) {
        if (url.indexOf('/ajaxrequest/search/search') != -1) {
          if (!document.getElementById('searchListing')) {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])('PWA', 'First_load_search', 'search_service', Date.now() - window.searchAPITime);
          } else if (url.indexOf('&start=0') != -1) {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])('PWA', 'subsequent_load_search', 'search_service', Date.now() - window.searchAPITime);
          } else {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])('PWA', 'search_autofetch_search', 'search_service', Date.now() - window.searchAPITime);
          }
        }

        var res = xhr.response ? JSON.parse(xhr.response) : '';

        if (res !== undefined && res.response_reauth !== undefined && (res.response_reauth == false || res.response_reauth == 4)) {
          Object(_Globals_MainFunctions__WEBPACK_IMPORTED_MODULE_2__["resetCookies"])(res.response_reauth);
        } else {
          return resolve(res);
        }
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
          isMsgMod: isMsgMod
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
        isMsgMod: isMsgMod
      });
    };

    xhr.send(body);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (imApi);

/***/ }),

/***/ "./src/api/locationApi.js":
/*!********************************!*\
  !*** ./src/api/locationApi.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Globals/CookieManager */ "./src/Globals/CookieManager.js");
/* harmony import */ var _Globals_GaTracking__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Globals/GaTracking */ "./src/Globals/GaTracking.js");
//import gblFunc from '../Globals/GlobalFunctions';


var glid;
var locationAPI = {
  geolocation_newservice: function geolocation_newservice() {
    var service = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    window.page = {};

    if (service) {
      var cookiedata = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookie"])("iploc");
      var bot_request = /googlebot|mediapartners|bingbot|slurp|crawler|spider|BomboraBot|PiplBot|mappydata|Quantcastbot|Clickagy|LinkisBot/i.test(navigator.userAgent);

      if (!cookiedata && !bot_request && service == 1) {
        var data = 'modid=IMOB&token=imobile@15061981';
        return makeRequestLocation('POST', 'https://geoip.imimg.com/api/location.php', data, service);
      } else {
        if (service == 2) {
          return new Promise(function (resolve, reject) {
            window.page.country = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('iploc', 'gcnnm');
            window.page.countryCode = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('iploc', 'gcniso');
            window.page.country_ip = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('iploc', 'gip');
            return resolve({
              'country': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('iploc', 'gcniso')
            });
          });
        } else if (bot_request) {
          return new Promise(function (resolve, reject) {
            window.page.country = 'United States Of America';
            window.page.countryCode = 'US';
            window.page.country_ip = '0.0.0.0';
            return resolve({
              'country': 'United States Of America',
              'country_iso': 'US',
              'country_ip': '0.0.0.0'
            });
          });
        } else {
          return new Promise(function (resolve, reject) {
            var c_iso = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('iploc', 'gcniso');

            if (c_iso == 'GB' || c_iso == 'EU') {
              c_iso = 'UK';
            } else if (c_iso == 'A1' || c_iso == 'A2' || c_iso == 'O1' || c_iso == 'AP') {
              c_iso = '';
            }

            window.page.country = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('iploc', 'gcnnm');
            window.page.countryCode = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('iploc', 'gcniso');
            window.page.country_ip = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('iploc', 'gip');
            return resolve({
              'country': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('iploc', 'gcnnm'),
              'country_iso': c_iso,
              'country_ip': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["getCookieValByKey"])('iploc', 'gip')
            });
          });
        }
      }
    }
  }
};

function makeRequestLocation(method, url, body, service) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.timeout = 8000;

    xhr.ontimeout = function () {
      _Globals_GaTracking__WEBPACK_IMPORTED_MODULE_1__["gaTrack"].trackEvent(['Timeout', "PWA", url, 0, true]);
    };

    xhr.onload = function () {
      if (this.status == 200 && this.readyState == 4) {
        var p = JSON.parse(xhr.response);
        var cookieString = '';

        if (p.Response.Code == 200) {
          if (p.Response.Data.geoip_countryiso == 'IN') {
            cookieString = "gcniso=" + p.Response.Data.geoip_countryiso + "|gcnnm=" + p.Response.Data.geoip_countryname + "|gctnm=" + p.Response.Data.geoip_cityname + "|gctid=" + p.Response.Data.geoip_cityid + "|gacrcy=" + p.Response.Data.geoip_accuracy + "|gip=" + p.Response.Data.geoip_ipaddress;
          } else {
            cookieString = "gcniso=" + p.Response.Data.geoip_countryiso + "|gcnnm=" + p.Response.Data.geoip_countryname + "|gacrcy=" + p.Response.Data.geoip_accuracy + "|gip=" + p.Response.Data.geoip_ipaddress;
          }

          Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_0__["setCookie"])('iploc', cookieString, 0.12);
          window.page.country = p.Response.Data.geoip_countryname;
          window.page.countryCode = p.Response.Data.geoip_countryiso;
          window.page.country_ip = p.Response.Data.geoip_ipaddress;

          if (service == 2) {
            return resolve({
              'country': p.Response.Data.geoip_countryiso
            });
          }

          return resolve({
            'country': p.Response.Data.geoip_countryname,
            'country_iso': p.Response.Data.geoip_countryiso,
            'country_ip': p.Response.Data.geoip_ipaddress
          });
        } else {
          return resolve({
            'country': 'IN'
          });
        }
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };

    xhr.send(body);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (locationAPI);

/***/ }),

/***/ "./src/constants/constants.js":
/*!************************************!*\
  !*** ./src/constants/constants.js ***!
  \************************************/
/*! exports provided: COUNTRY_DROPDOWN_JSON, TOP5COUNTRIES, CC_JSON, GET_EUROPEAN_COUNTRIES, SIGN_IN, VERIFY, VERNACULAR_ARR, LANG_COOKIE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COUNTRY_DROPDOWN_JSON", function() { return COUNTRY_DROPDOWN_JSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOP5COUNTRIES", function() { return TOP5COUNTRIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CC_JSON", function() { return CC_JSON; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_EUROPEAN_COUNTRIES", function() { return GET_EUROPEAN_COUNTRIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SIGN_IN", function() { return SIGN_IN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERIFY", function() { return VERIFY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERNACULAR_ARR", function() { return VERNACULAR_ARR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LANG_COOKIE", function() { return LANG_COOKIE; });
var COUNTRY_DROPDOWN_JSON = [{
  "cnname": "Afghanistan",
  "cncode": "93",
  "cniso": "AF"
}, {
  "cnname": "Albania",
  "cncode": "355",
  "cniso": "AL"
}, {
  "cnname": "Algeria",
  "cncode": "213",
  "cniso": "DZ"
}, {
  "cnname": "American Samoa",
  "cncode": "1-684",
  "cniso": "AS"
}, {
  "cnname": "Andorra",
  "cncode": "376",
  "cniso": "AD"
}, {
  "cnname": "Angola",
  "cncode": "244",
  "cniso": "AO"
}, {
  "cnname": "Anguilla",
  "cncode": "1-264",
  "cniso": "AI"
}, {
  "cnname": "Antarctica",
  "cncode": "672",
  "cniso": "AQ"
}, {
  "cnname": "Antigua And Barbuda",
  "cncode": "1-268",
  "cniso": "AG"
}, {
  "cnname": "Argentina",
  "cncode": "54",
  "cniso": "AR"
}, {
  "cnname": "Armenia",
  "cncode": "374",
  "cniso": "AM"
}, {
  "cnname": "Aruba",
  "cncode": "297",
  "cniso": "AW"
}, {
  "cnname": "Austria",
  "cncode": "43",
  "cniso": "AT"
}, {
  "cnname": "Azerbaijan",
  "cncode": "994",
  "cniso": "AZ"
}, {
  "cnname": "Bahamas",
  "cncode": "1-242",
  "cniso": "BS"
}, {
  "cnname": "Bahrain",
  "cncode": "973",
  "cniso": "BH"
}, {
  "cnname": "Bangladesh",
  "cncode": "880",
  "cniso": "BD"
}, {
  "cnname": "Barbados",
  "cncode": "1-246",
  "cniso": "BB"
}, {
  "cnname": "Belarus",
  "cncode": "375",
  "cniso": "BY"
}, {
  "cnname": "Belgium",
  "cncode": "32",
  "cniso": "BE"
}, {
  "cnname": "Belize",
  "cncode": "501",
  "cniso": "BZ"
}, {
  "cnname": "Benin",
  "cncode": "229",
  "cniso": "BJ"
}, {
  "cnname": "Bermuda",
  "cncode": "1-441",
  "cniso": "BM"
}, {
  "cnname": "Bhutan",
  "cncode": "975",
  "cniso": "BT"
}, {
  "cnname": "Bolivia",
  "cncode": "591",
  "cniso": "BO"
}, {
  "cnname": "Bosnia And Herzegovina",
  "cncode": "387",
  "cniso": "BA"
}, {
  "cnname": "Botswana",
  "cncode": "267",
  "cniso": "BW"
}, {
  "cnname": "Bouvet Island",
  "cncode": "47",
  "cniso": "BV"
}, {
  "cnname": "Brazil",
  "cncode": "55",
  "cniso": "BR"
}, {
  "cnname": "British Indian Ocean Territory",
  "cncode": "246",
  "cniso": "IO"
}, {
  "cnname": "Brunei",
  "cncode": "673",
  "cniso": "BN"
}, {
  "cnname": "Bulgaria",
  "cncode": "359",
  "cniso": "BG"
}, {
  "cnname": "Burkina Faso",
  "cncode": "226",
  "cniso": "BF"
}, {
  "cnname": "Burundi",
  "cncode": "257",
  "cniso": "BI"
}, {
  "cnname": "Cambodia",
  "cncode": "855",
  "cniso": "KH"
}, {
  "cnname": "Cameroon",
  "cncode": "237",
  "cniso": "CM"
}, {
  "cnname": "Canada",
  "cncode": "1",
  "cniso": "CA"
}, {
  "cnname": "Cape Verde",
  "cncode": "238",
  "cniso": "CV"
}, {
  "cnname": "Cayman Islands",
  "cncode": "1-345",
  "cniso": "KY"
}, {
  "cnname": "Central African Republic",
  "cncode": "236",
  "cniso": "CF"
}, {
  "cnname": "Chad",
  "cncode": "235",
  "cniso": "TD"
}, {
  "cnname": "Chile",
  "cncode": "56",
  "cniso": "CL"
}, {
  "cnname": "China",
  "cncode": "86",
  "cniso": "CN"
}, {
  "cnname": "China (Hong Kong S.A.R.)",
  "cncode": "852",
  "cniso": "HK"
}, {
  "cnname": "China (Macau S.A.R.)",
  "cncode": "853",
  "cniso": "MO"
}, {
  "cnname": "Christmas Islands",
  "cncode": "61",
  "cniso": "CX"
}, {
  "cnname": "Cocos Islands",
  "cncode": "891",
  "cniso": "CC"
}, {
  "cnname": "Colombia",
  "cncode": "57",
  "cniso": "CO"
}, {
  "cnname": "Comoros",
  "cncode": "269",
  "cniso": "KM"
}, {
  "cnname": "Congo",
  "cncode": "242",
  "cniso": "CG"
}, {
  "cnname": "Cook Islands",
  "cncode": "682",
  "cniso": "CK"
}, {
  "cnname": "Costa Rica",
  "cncode": "506",
  "cniso": "CR"
}, {
  "cnname": "Cote D Ivoire",
  "cncode": "225",
  "cniso": "CI"
}, {
  "cnname": "Croatia",
  "cncode": "385",
  "cniso": "HR"
}, {
  "cnname": "Cuba",
  "cncode": "53",
  "cniso": "CU"
}, {
  "cnname": "Cyprus",
  "cncode": "357",
  "cniso": "CY"
}, {
  "cnname": "Czech Republic",
  "cncode": "420",
  "cniso": "CZ"
}, {
  "cnname": "Democractic Republic Of Congo",
  "cncode": "243",
  "cniso": "CD"
}, {
  "cnname": "Denmark",
  "cncode": "45",
  "cniso": "DK"
}, {
  "cnname": "Djibouti",
  "cncode": "253",
  "cniso": "DJ"
}, {
  "cnname": "Dominica",
  "cncode": "1-767",
  "cniso": "DM"
}, {
  "cnname": "Dominican Republic",
  "cncode": "1-809",
  "cniso": "DO"
}, {
  "cnname": "East Timor",
  "cncode": "670",
  "cniso": "TL"
}, {
  "cnname": "Ecuador",
  "cncode": "593",
  "cniso": "EC"
}, {
  "cnname": "Egypt",
  "cncode": "20",
  "cniso": "EG"
}, {
  "cnname": "El Salvador",
  "cncode": "503",
  "cniso": "SV"
}, {
  "cnname": "Equatorial Guinea",
  "cncode": "240",
  "cniso": "GQ"
}, {
  "cnname": "Eritrea",
  "cncode": "291",
  "cniso": "ER"
}, {
  "cnname": "Estonia",
  "cncode": "372",
  "cniso": "EE"
}, {
  "cnname": "Ethiopia",
  "cncode": "251",
  "cniso": "ET"
}, {
  "cnname": "Falkland Islands",
  "cncode": "500",
  "cniso": "FK"
}, {
  "cnname": "Faroe Islands",
  "cncode": "298",
  "cniso": "FO"
}, {
  "cnname": "Fiji Islands",
  "cncode": "679",
  "cniso": "FJ"
}, {
  "cnname": "Finland",
  "cncode": "358",
  "cniso": "FI"
}, {
  "cnname": "France",
  "cncode": "33",
  "cniso": "FR"
}, {
  "cnname": "French Guiana",
  "cncode": "594",
  "cniso": "GF"
}, {
  "cnname": "French Polynesia",
  "cncode": "689",
  "cniso": "PF"
}, {
  "cnname": "French Southern Territories",
  "cncode": "262",
  "cniso": "TF"
}, {
  "cnname": "Gabon",
  "cncode": "241",
  "cniso": "GA"
}, {
  "cnname": "Georgia",
  "cncode": "995",
  "cniso": "GE"
}, {
  "cnname": "Germany",
  "cncode": "49",
  "cniso": "DE"
}, {
  "cnname": "Ghana",
  "cncode": "233",
  "cniso": "GH"
}, {
  "cnname": "Gibraltar",
  "cncode": "350",
  "cniso": "GI"
}, {
  "cnname": "Greece",
  "cncode": "30",
  "cniso": "GR"
}, {
  "cnname": "Greenland",
  "cncode": "299",
  "cniso": "GL"
}, {
  "cnname": "Grenada",
  "cncode": "1-473",
  "cniso": "GD"
}, {
  "cnname": "Guadeloupe",
  "cncode": "590",
  "cniso": "GP"
}, {
  "cnname": "Guam",
  "cncode": "1-671",
  "cniso": "GU"
}, {
  "cnname": "Guatemala",
  "cncode": "502",
  "cniso": "GT"
}, {
  "cnname": "Guinea",
  "cncode": "224",
  "cniso": "GN"
}, {
  "cnname": "Guinea-Bissau",
  "cncode": "245",
  "cniso": "GW"
}, {
  "cnname": "Guyana",
  "cncode": "592",
  "cniso": "GY"
}, {
  "cnname": "Haiti",
  "cncode": "509",
  "cniso": "HT"
}, {
  "cnname": "Heard And Mcdonald Islands",
  "cncode": "672",
  "cniso": "HM"
}, {
  "cnname": "Holy See",
  "cncode": "379",
  "cniso": "VA"
}, {
  "cnname": "Honduras",
  "cncode": "504",
  "cniso": "HN"
}, {
  "cnname": "Hungary",
  "cncode": "36",
  "cniso": "HU"
}, {
  "cnname": "Iceland",
  "cncode": "354",
  "cniso": "IS"
}, {
  "cnname": "Indonesia",
  "cncode": "62",
  "cniso": "ID"
}, {
  "cnname": "Iran",
  "cncode": "98",
  "cniso": "IR"
}, {
  "cnname": "Iraq",
  "cncode": "964",
  "cniso": "IQ"
}, {
  "cnname": "Ireland",
  "cncode": "353",
  "cniso": "IE"
}, {
  "cnname": "Israel",
  "cncode": "972",
  "cniso": "IL"
}, {
  "cnname": "Italy",
  "cncode": "39",
  "cniso": "IT"
}, {
  "cnname": "Jamaica",
  "cncode": "1-876",
  "cniso": "JM"
}, {
  "cnname": "Japan",
  "cncode": "81",
  "cniso": "JP"
}, {
  "cnname": "Jordan",
  "cncode": "962",
  "cniso": "JO"
}, {
  "cnname": "Kazakhstan",
  "cncode": "7",
  "cniso": "KZ"
}, {
  "cnname": "Kenya",
  "cncode": "254",
  "cniso": "KE"
}, {
  "cnname": "Kiribati",
  "cncode": "686",
  "cniso": "KI"
}, {
  "cnname": "Korea",
  "cncode": "82",
  "cniso": "KR"
}, {
  "cnname": "Korea, North",
  "cncode": "850",
  "cniso": "KP"
}, {
  "cnname": "Kuwait",
  "cncode": "965",
  "cniso": "KW"
}, {
  "cnname": "Kyrgyzstan",
  "cncode": "996",
  "cniso": "KG"
}, {
  "cnname": "Lao People's Democratic Republic",
  "cncode": "856",
  "cniso": "LA"
}, {
  "cnname": "Latvia",
  "cncode": "371",
  "cniso": "LV"
}, {
  "cnname": "Lebanon",
  "cncode": "961",
  "cniso": "LB"
}, {
  "cnname": "Lesotho",
  "cncode": "266",
  "cniso": "LS"
}, {
  "cnname": "Liberia",
  "cncode": "231",
  "cniso": "LR"
}, {
  "cnname": "Libya",
  "cncode": "218",
  "cniso": "LY"
}, {
  "cnname": "Liechtenstein",
  "cncode": "423",
  "cniso": "LI"
}, {
  "cnname": "Lithuania",
  "cncode": "370",
  "cniso": "LT"
}, {
  "cnname": "Luxembourg",
  "cncode": "352",
  "cniso": "LU"
}, {
  "cnname": "Macedonia",
  "cncode": "389",
  "cniso": "MK"
}, {
  "cnname": "Madagascar",
  "cncode": "261",
  "cniso": "MG"
}, {
  "cnname": "Malawi",
  "cncode": "265",
  "cniso": "MW"
}, {
  "cnname": "Malaysia",
  "cncode": "60",
  "cniso": "MY"
}, {
  "cnname": "Maldives",
  "cncode": "960",
  "cniso": "MV"
}, {
  "cnname": "Mali",
  "cncode": "223",
  "cniso": "ML"
}, {
  "cnname": "Malta",
  "cncode": "356",
  "cniso": "MT"
}, {
  "cnname": "Marshall Islands",
  "cncode": "692",
  "cniso": "MH"
}, {
  "cnname": "Martinique",
  "cncode": "596",
  "cniso": "MQ"
}, {
  "cnname": "Mauritania",
  "cncode": "222",
  "cniso": "MR"
}, {
  "cnname": "Mauritius",
  "cncode": "230",
  "cniso": "MU"
}, {
  "cnname": "Mayotte",
  "cncode": "269",
  "cniso": "YT"
}, {
  "cnname": "Mexico",
  "cncode": "52",
  "cniso": "MX"
}, {
  "cnname": "Micronesia",
  "cncode": "691",
  "cniso": "FM"
}, {
  "cnname": "Moldova",
  "cncode": "373",
  "cniso": "MD"
}, {
  "cnname": "Monaco",
  "cncode": "377",
  "cniso": "MC"
}, {
  "cnname": "Mongolia",
  "cncode": "976",
  "cniso": "MN"
}, {
  "cnname": "Montenegro",
  "cncode": "382",
  "cniso": "ME"
}, {
  "cnname": "Montserrat",
  "cncode": "1-664",
  "cniso": "MS"
}, {
  "cnname": "Morocco",
  "cncode": "212",
  "cniso": "MA"
}, {
  "cnname": "Mozambique",
  "cncode": "258",
  "cniso": "MZ"
}, {
  "cnname": "Myanmar",
  "cncode": "95",
  "cniso": "MM"
}, {
  "cnname": "Namibia",
  "cncode": "264",
  "cniso": "NA"
}, {
  "cnname": "Nauru",
  "cncode": "674",
  "cniso": "NR"
}, {
  "cnname": "Nepal",
  "cncode": "977",
  "cniso": "NP"
}, {
  "cnname": "Netherlands Antilles",
  "cncode": "599",
  "cniso": "AN"
}, {
  "cnname": "New Caledonia",
  "cncode": "687",
  "cniso": "NC"
}, {
  "cnname": "New Zealand",
  "cncode": "64",
  "cniso": "NZ"
}, {
  "cnname": "Nicaragua",
  "cncode": "505",
  "cniso": "NI"
}, {
  "cnname": "Niger",
  "cncode": "227",
  "cniso": "NE"
}, {
  "cnname": "Nigeria",
  "cncode": "234",
  "cniso": "NG"
}, {
  "cnname": "Niue",
  "cncode": "683",
  "cniso": "NU"
}, {
  "cnname": "Norfolk Island",
  "cncode": "672",
  "cniso": "NF"
}, {
  "cnname": "Northern Mariana Islands",
  "cncode": "1-670",
  "cniso": "MP"
}, {
  "cnname": "Norway",
  "cncode": "47",
  "cniso": "NO"
}, {
  "cnname": "Oman",
  "cncode": "968",
  "cniso": "OM"
}, {
  "cnname": "Pakistan",
  "cncode": "92",
  "cniso": "PK"
}, {
  "cnname": "Palau",
  "cncode": "680",
  "cniso": "PW"
}, {
  "cnname": "Palestinian National Authority",
  "cncode": "970",
  "cniso": "PS"
}, {
  "cnname": "Panama",
  "cncode": "507",
  "cniso": "PA"
}, {
  "cnname": "Papua New Guinea",
  "cncode": "675",
  "cniso": "PG"
}, {
  "cnname": "Paraguay",
  "cncode": "595",
  "cniso": "PY"
}, {
  "cnname": "Peru",
  "cncode": "51",
  "cniso": "PE"
}, {
  "cnname": "Philippines",
  "cncode": "63",
  "cniso": "PH"
}, {
  "cnname": "Pitcairn Island",
  "cncode": "872",
  "cniso": "PN"
}, {
  "cnname": "Poland",
  "cncode": "48",
  "cniso": "PL"
}, {
  "cnname": "Portugal",
  "cncode": "351",
  "cniso": "PT"
}, {
  "cnname": "Puerto Rico",
  "cncode": "1",
  "cniso": "PR"
}, {
  "cnname": "Qatar",
  "cncode": "974",
  "cniso": "QA"
}, {
  "cnname": "Reunion",
  "cncode": "262",
  "cniso": "RE"
}, {
  "cnname": "Romania",
  "cncode": "40",
  "cniso": "RO"
}, {
  "cnname": "Russia",
  "cncode": "7",
  "cniso": "RU"
}, {
  "cnname": "Rwanda",
  "cncode": "250",
  "cniso": "RW"
}, {
  "cnname": "Saint Helena",
  "cncode": "290",
  "cniso": "SH"
}, {
  "cnname": "Saint Kitts And Nevis",
  "cncode": "1-869",
  "cniso": "KN"
}, {
  "cnname": "Saint Lucia",
  "cncode": "1-758",
  "cniso": "LC"
}, {
  "cnname": "Saint Pierre And Miquelon",
  "cncode": "508",
  "cniso": "PM"
}, {
  "cnname": "Saint Vincent And The Grenadin",
  "cncode": "1-784",
  "cniso": "VC"
}, {
  "cnname": "Samoa",
  "cncode": "685",
  "cniso": "WS"
}, {
  "cnname": "San Marino",
  "cncode": "378",
  "cniso": "SM"
}, {
  "cnname": "Sao Tome And Principe",
  "cncode": "239",
  "cniso": "ST"
}, {
  "cnname": "Saudi Arabia",
  "cncode": "966",
  "cniso": "SA"
}, {
  "cnname": "Senegal",
  "cncode": "221",
  "cniso": "SN"
}, {
  "cnname": "Serbia",
  "cncode": "381",
  "cniso": "RS"
}, {
  "cnname": "Serbia And Montenegro",
  "cncode": "381",
  "cniso": "CS"
}, {
  "cnname": "Seychelles",
  "cncode": "248",
  "cniso": "SC"
}, {
  "cnname": "Sierra Leone",
  "cncode": "232",
  "cniso": "SL"
}, {
  "cnname": "Singapore",
  "cncode": "65",
  "cniso": "SG"
}, {
  "cnname": "Slovakia",
  "cncode": "421",
  "cniso": "SK"
}, {
  "cnname": "Slovenia",
  "cncode": "386",
  "cniso": "SI"
}, {
  "cnname": "Solomon Islands",
  "cncode": "677",
  "cniso": "SB"
}, {
  "cnname": "Somalia",
  "cncode": "252",
  "cniso": "SO"
}, {
  "cnname": "South Africa",
  "cncode": "27",
  "cniso": "ZA"
}, {
  "cnname": "South Georgia",
  "cncode": "995",
  "cniso": "GS"
}, {
  "cnname": "South Sudan",
  "cncode": "211",
  "cniso": "SS"
}, {
  "cnname": "Spain",
  "cncode": "34",
  "cniso": "ES"
}, {
  "cnname": "Sri Lanka",
  "cncode": "94",
  "cniso": "LK"
}, {
  "cnname": "Sudan",
  "cncode": "249",
  "cniso": "SD"
}, {
  "cnname": "Suriname",
  "cncode": "597",
  "cniso": "SR"
}, {
  "cnname": "Svalbard And Jan Mayen Islands",
  "cncode": "47",
  "cniso": "SJ"
}, {
  "cnname": "Swaziland",
  "cncode": "268",
  "cniso": "SZ"
}, {
  "cnname": "Sweden",
  "cncode": "46",
  "cniso": "SE"
}, {
  "cnname": "Switzerland",
  "cncode": "41",
  "cniso": "CH"
}, {
  "cnname": "Syria",
  "cncode": "963",
  "cniso": "SY"
}, {
  "cnname": "Taiwan",
  "cncode": "886",
  "cniso": "TW"
}, {
  "cnname": "Tajikistan",
  "cncode": "992",
  "cniso": "TJ"
}, {
  "cnname": "Tanzania",
  "cncode": "255",
  "cniso": "TZ"
}, {
  "cnname": "Thailand",
  "cncode": "66",
  "cniso": "TH"
}, {
  "cnname": "The Gambia",
  "cncode": "220",
  "cniso": "GM"
}, {
  "cnname": "The Netherlands",
  "cncode": "31",
  "cniso": "NL"
}, {
  "cnname": "Togo",
  "cncode": "228",
  "cniso": "TG"
}, {
  "cnname": "Tokelau",
  "cncode": "690",
  "cniso": "TK"
}, {
  "cnname": "Tonga",
  "cncode": "676",
  "cniso": "TO"
}, {
  "cnname": "Trinidad And Tobago",
  "cncode": "1-868",
  "cniso": "TT"
}, {
  "cnname": "Tunisia",
  "cncode": "216",
  "cniso": "TN"
}, {
  "cnname": "Turkey",
  "cncode": "90",
  "cniso": "TR"
}, {
  "cnname": "Turkmenistan",
  "cncode": "993",
  "cniso": "TM"
}, {
  "cnname": "Turks And Caicos Islands",
  "cncode": "1-649",
  "cniso": "TC"
}, {
  "cnname": "Tuvalu",
  "cncode": "688",
  "cniso": "TV"
}, {
  "cnname": "Uganda",
  "cncode": "256",
  "cniso": "UG"
}, {
  "cnname": "Ukraine",
  "cncode": "380",
  "cniso": "UA"
}, {
  "cnname": "United States Minor Outlying Islands",
  "cncode": "1",
  "cniso": "UM"
}, {
  "cnname": "Uruguay",
  "cncode": "598",
  "cniso": "UY"
}, {
  "cnname": "Uzbekistan",
  "cncode": "998",
  "cniso": "UZ"
}, {
  "cnname": "Vanuatu",
  "cncode": "678",
  "cniso": "VU"
}, {
  "cnname": "Venezuela",
  "cncode": "58",
  "cniso": "VE"
}, {
  "cnname": "Vietnam",
  "cncode": "84",
  "cniso": "VN"
}, {
  "cnname": "Virgin Islands (British)",
  "cncode": "1-284",
  "cniso": "VG"
}, {
  "cnname": "Virgin Islands (Us)",
  "cncode": "1-340",
  "cniso": "VI"
}, {
  "cnname": "Wallis And Futuna Islands",
  "cncode": "681",
  "cniso": "WF"
}, {
  "cnname": "Western Sahara",
  "cncode": "212",
  "cniso": "EH"
}, {
  "cnname": "Yemen",
  "cncode": "967",
  "cniso": "YE"
}, {
  "cnname": "Yugoslavia",
  "cncode": "38",
  "cniso": "YU"
}, {
  "cnname": "Zambia",
  "cncode": "260",
  "cniso": "ZM"
}, {
  "cnname": "Zimbabwe",
  "cncode": "263",
  "cniso": "ZW"
}];
var TOP5COUNTRIES = [{
  "cname": "India",
  "cncode": "91",
  "cniso": "IN"
}, {
  "cname": "United States Of America",
  "cncode": "1",
  "cniso": "US"
}, {
  "cname": "United Arab Emirates",
  "cncode": "971",
  "cniso": "AE"
}, {
  "cname": "United Kingdom",
  "cncode": "44",
  "cniso": "UK"
}, {
  "cname": "Australia",
  "cncode": "61",
  "cniso": "AU"
}];
var CC_JSON = [{
  "US": "1",
  "AE": "971",
  "UK": "44",
  "AU": "61",
  "BD": "880",
  "BE": "32",
  "BF": "226",
  "BG": "359",
  "BA": "387",
  "BB": "1-246",
  "WF": "681",
  "BL": "590",
  "BM": "1-441",
  "BN": "673",
  "BO": "591",
  "BH": "973",
  "BI": "257",
  "BJ": "229",
  "BT": "975",
  "JM": "1-876",
  "BV": "",
  "BW": "267",
  "WS": "685",
  "BQ": "599",
  "BR": "55",
  "BS": "1-242",
  "JE": "44-1534",
  "BY": "375",
  "BZ": "501",
  "RU": "7",
  "RW": "250",
  "RS": "381",
  "TL": "670",
  "RE": "262",
  "TM": "993",
  "TJ": "992",
  "RO": "40",
  "TK": "690",
  "GW": "245",
  "GU": "1-671",
  "GT": "502",
  "GS": "995",
  "GR": "30",
  "GQ": "240",
  "GP": "590",
  "JP": "81",
  "GY": "592",
  "GG": "44-1481",
  "GF": "594",
  "GE": "995",
  "GD": "1-473",
  "GB": "44",
  "GA": "241",
  "SV": "503",
  "GN": "224",
  "GM": "220",
  "GL": "299",
  "GI": "350",
  "GH": "233",
  "OM": "968",
  "TN": "216",
  "JO": "962",
  "HR": "385",
  "HT": "509",
  "HU": "36",
  "HK": "852",
  "HN": "504",
  "HM": " ",
  "VE": "58",
  "PR": "1-787 and 1-939",
  "PS": "970",
  "PW": "680",
  "PT": "351",
  "SJ": "47",
  "PY": "595",
  "IQ": "964",
  "PA": "507",
  "PF": "689",
  "PG": "675",
  "PE": "51",
  "PK": "92",
  "PH": "63",
  "PN": "870",
  "PL": "48",
  "PM": "508",
  "ZM": "260",
  "EH": "212",
  "EE": "372",
  "EG": "20",
  "ZA": "27",
  "EC": "593",
  "IT": "39",
  "VN": "84",
  "SB": "677",
  "ET": "251",
  "SO": "252",
  "ZW": "263",
  "SA": "966",
  "ES": "34",
  "ER": "291",
  "ME": "382",
  "MD": "373",
  "MG": "261",
  "MF": "590",
  "MA": "212",
  "MC": "377",
  "UZ": "998",
  "MM": "95",
  "ML": "223",
  "MO": "853",
  "MN": "976",
  "MH": "692",
  "MK": "389",
  "MU": "230",
  "MT": "356",
  "MW": "265",
  "MV": "960",
  "MQ": "596",
  "MP": "1-670",
  "MS": "1-664",
  "MR": "222",
  "IM": "44-1624",
  "UG": "256",
  "TZ": "255",
  "MY": "60",
  "MX": "52",
  "IL": "972",
  "FR": "33",
  "IO": "246",
  "SH": "290",
  "FI": "358",
  "FJ": "679",
  "FK": "500",
  "FM": "691",
  "FO": "298",
  "NI": "505",
  "NL": "31",
  "NO": "47",
  "NA": "264",
  "VU": "678",
  "NC": "687",
  "NE": "227",
  "NF": "672",
  "NG": "234",
  "NZ": "64",
  "NP": "977",
  "NR": "674",
  "NU": "683",
  "CK": "682",
  "CI": "225",
  "CH": "41",
  "CO": "57",
  "CN": "86",
  "CM": "237",
  "CL": "56",
  "CC": "61",
  "CA": "1",
  "CG": "242",
  "CF": "236",
  "CD": "243",
  "CZ": "420",
  "CY": "357",
  "CX": "61",
  "CR": "506",
  "CW": "599",
  "CV": "238",
  "CU": "53",
  "SZ": "268",
  "SY": "963",
  "SX": "599",
  "KG": "996",
  "KE": "254",
  "SS": "211",
  "SR": "597",
  "KI": "686",
  "KH": "855",
  "KN": "1-869",
  "KM": "269",
  "ST": "239",
  "SK": "421",
  "KR": "82",
  "SI": "386",
  "KP": "850",
  "KW": "965",
  "SN": "221",
  "SM": "378",
  "SL": "232",
  "SC": "248",
  "KZ": "7",
  "KY": "1-345",
  "SG": "65",
  "SE": "46",
  "SD": "249",
  "DO": "1-809 and 1-829",
  "DM": "1-767",
  "DJ": "253",
  "DK": "45",
  "VG": "1-284",
  "DE": "49",
  "YE": "967",
  "DZ": "213",
  "UY": "598",
  "YT": "262",
  "UM": "1",
  "LB": "961",
  "LC": "1-758",
  "LA": "856",
  "TV": "688",
  "TW": "886",
  "TT": "1-868",
  "TR": "90",
  "LK": "94",
  "LI": "423",
  "LV": "371",
  "TO": "676",
  "LT": "370",
  "LU": "352",
  "LR": "231",
  "LS": "266",
  "TH": "66",
  "TF": "262",
  "TG": "228",
  "TD": "235",
  "TC": "1-649",
  "LY": "218",
  "VA": "379",
  "VC": "1-784",
  "AD": "376",
  "AG": "1-268",
  "AF": "93",
  "AI": "1-264",
  "VI": "1-340",
  "IS": "354",
  "IR": "98",
  "AM": "374",
  "AL": "355",
  "AO": "244",
  "AQ": "672",
  "AS": "1-684",
  "AR": "54",
  "AT": "43",
  "AW": "297",
  "IN": "91",
  "AX": "358-18",
  "AZ": "994",
  "IE": "353",
  "ID": "62",
  "UA": "380",
  "QA": "974",
  "MZ": "258"
}];
var GET_EUROPEAN_COUNTRIES = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "GB", "NL", "UK"]; // export const VOICE_LANGUAGES = [
// ["Hindi", "hi-IN", "हिंदी", "हमें बताएं कि आपको क्या चाहिए", "पुन: प्रयास करें", "सुना जा रहा है..."],
// ["English", "en-IN", "English", "Tell us what you need!", "Retry", "Listening..."],
// ["Bangla", "bn-IN", "বাংলা", "আমাদের বলুন আপনি কি চান", "পুনরায় চেষ্টা করা", "শোনা হচ্ছে..."],
// ["tamil", "ta-IN", "தமிழ்", "உங்களுக்கு என்ன தேவை என்று சொல்லுங்கள்", "மீண்டும் முயற்சி செய்", "கேட்டது..."],
// ["Marathi", "mr-IN", "मराठी", "आपल्याला काय आवश्यक आहे ते आम्हाला सांगा", "पुन्हा प्रयत्न करा", "ऐकले जात आहे..."],
// ["Telugu", "te-IN", "తెలుగు", "మీకు కావాల్సినది చెప్పండి", "మళ్ళీ ప్రయత్నించు", "వినడం..."],
// ["Gujarati", "gu-IN", "ગુજરાતી", "તમને શું જોઈએ છે તે અમને કહો", "ફરી પ્રયાસ કરો", "સાંભળી શકાય છે..."],
// ["Kannada", "kn-IN", "ಕನ್ನಡ", "ನಿಮಗೆ ಬೇಕಾದುದನ್ನು ನಮಗೆ ತಿಳಿಸಿ", "ಮರುಪ್ರಯತ್ನಿಸಿ", "ಕೇಳುವ..."],
// ["Malayalam", "ml-IN", "മലയാളം", "നിങ്ങൾക്ക് എന്താണ് ആവശ്യമെന്ന് ഞങ്ങളോട് പറയൂ", "വീണ്ടും ശ്രമിക്കുക", "കേൾക്കുന്നത്..."]
// ];

var SIGN_IN = [["Sign in to view more results", "Sign in"], ["अधिक परिणाम देखने के लिए साइन इन करें", "साइन इन"]];
var VERIFY = [["Verify to view more results ", "Verify"], ["अधिक परिणाम देखने के लिए वेरिफाई करें", "वेरिफाई"]];
var VERNACULAR_ARR = {
  'hi': '1',
  'en': '0'
};
var LANG_COOKIE = 'lang';

/***/ }),

/***/ "./src/modules/Buyer/BuyerSettings/actions/settingAction.js":
/*!******************************************************************!*\
  !*** ./src/modules/Buyer/BuyerSettings/actions/settingAction.js ***!
  \******************************************************************/
/*! exports provided: settingAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settingAPI", function() { return settingAPI; });
/* harmony import */ var _Globals_RequestsHandler_makeRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Globals/RequestsHandler/makeRequest */ "./src/Globals/RequestsHandler/makeRequest.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }


var settingAPI = {
  settingPreferenceData: function settingPreferenceData(params) {
    return /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return Object(_Globals_RequestsHandler_makeRequest__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', '/miscreact/ajaxrequest/buyer/settingsPref', params);

              case 3:
                res = _context.sent;
                dispatch({
                  type: 'Setting_pref_success',
                  success: true,
                  result: res
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                dispatch({
                  type: 'Setting_pref_ERR',
                  success: false,
                  result: _context.t0
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  },
  disOtp: function disOtp(params) {
    return /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
        var res;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return Object(_Globals_RequestsHandler_makeRequest__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', '/miscreact/ajaxrequest/buyer/disotp/', params);

              case 3:
                res = _context2.sent;
                dispatch({
                  type: 'setting_OTP_Success',
                  success: true,
                  result: res
                });
                _context2.next = 10;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                dispatch({
                  type: 'Setting_OTP_ERR',
                  success: false,
                  result: _context2.t0
                });

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }();
  },
  disableUser: function disableUser(params) {
    return /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(dispatch) {
        var res;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return Object(_Globals_RequestsHandler_makeRequest__WEBPACK_IMPORTED_MODULE_0__["default"])('POST', '/miscreact/ajaxrequest/mysettings/deleteuser', params);

              case 3:
                res = _context3.sent;
                dispatch({
                  type: 'Disable_Success',
                  success: true,
                  result: res
                });
                _context3.next = 10;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                dispatch({
                  type: 'Disable_ERR',
                  success: false,
                  result: _context3.t0
                });

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
  }
};

/***/ }),

/***/ "./src/modules/Buyer/BuyerSettings/components/settings.js":
/*!****************************************************************!*\
  !*** ./src/modules/Buyer/BuyerSettings/components/settings.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Footer_components_Footer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Footer/components/Footer */ "./src/modules/Footer/components/Footer.js");
/* harmony import */ var _loader_components_LoaderAnimation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../loader/components/LoaderAnimation */ "./src/modules/loader/components/LoaderAnimation.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Redux_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../Redux/store */ "./src/Redux/store.js");
/* harmony import */ var _css_settings_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../css/settings.css */ "./src/modules/Buyer/BuyerSettings/css/settings.css");
/* harmony import */ var _css_settings_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_css_settings_css__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Globals_css_disable_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../Globals/css/disable.css */ "./src/Globals/css/disable.css");
/* harmony import */ var _Globals_css_disable_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_Globals_css_disable_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../Globals/CookieManager */ "./src/Globals/CookieManager.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! regenerator-runtime/runtime */ "../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ErrorPage_components_error__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../ErrorPage/components/error */ "./src/modules/ErrorPage/components/error.js");
/* harmony import */ var _Globals_GlobalFunc__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../Globals/GlobalFunc */ "./src/Globals/GlobalFunc.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














var axios = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");

var TabNav = function TabNav(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("nav", {
    className: "tabnew"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
    "class": "border"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("h1", null, "Settings"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/mysettingsreact",
    id: "settingsTab",
    className: "sltab",
    activeClassName: "active"
  }, "Privacy Settings")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["Link"], {
    to: "/mychangepasswordreact",
    id: "passwordTab",
    activeClassName: "active"
  }, "Change Password"))));
};

var SettingsComponent = /*#__PURE__*/function (_Component) {
  _inherits(SettingsComponent, _Component);

  var _super = _createSuper(SettingsComponent);

  function SettingsComponent(props) {
    var _this;

    _classCallCheck(this, SettingsComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "email_pref", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var params;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = {
                glusrId: _this.glid,
                fn: _this.name,
                email: _this.props.UserDetails.data.email1,
                utyp: _this.utyp
              };
              _context.next = 3;
              return _this.props.fetchSettingPref(params);

            case 3:
              if (_this.props.BuyerReducer.Settingdata != undefined) {
                window.open(_this.props.BuyerReducer.Settingdata.response.url, '_blank');
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "signout", function () {
      Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["deleteCookie"])("ImeshVisitor");
      Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["deleteCookie"])("im_iss");
      Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["deleteCookie"])("xnHist");
      Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["deleteCookie"])("v4iilex");
      localStorage.clear(); //Sets the new (URL) after cookie deletion

      window.location.href = "https://www.indiamart.com";
    });

    _defineProperty(_assertThisInitialized(_this), "disfun", function () {
      var glid = _this.glid;
      var phcc = _this.phcc;
      var mobile_num = _this.mb1;
      var div_disp = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        "class": "otp-heading"
      }, "To Identify Yourself, Please Enter the 4 digit One Time Password (OTP) sent via SMS on your mobile"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "otp-span"
      }, "(", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        id: "otp_number"
      }, "+91-", mobile_num), ")"));

      if (phcc != '91') {
        var _mobile_num = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["getCookieValByKey"])('ImeshVisitor', 'em');

        div_disp = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
          "class": "otp-heading"
        }, "To Identify Yourself, Please Enter the 4 digit One Time Password (OTP) sent on your email "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
          "class": "otp-span"
        }, "(", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
          id: "otp_number"
        }, _mobile_num), ")"));
      }

      var disableForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "overlay_s disBlock"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "verificationForm",
        "class": "popup-wrapper popup-transition popup-sm"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "popup-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "popup-close popup-toggle-otp",
        onclick: function onclick() {
          _this.otpServiceCalled = false;

          _this.setState({
            'DisableValue': 3,
            'DisableReason': false,
            'OtpErrorReason': '',
            'verify_otp': true,
            'otp_loader': false,
            'otp_err_color': 'black',
            'otp_val': '',
            'disableUserDiv': true,
            'body_frm': '',
            'body_frm_class': '',
            'hedr_frm': 'For Security, Please Identify Yourself',
            'ShowOthers': false
          });
        }
      }, "\xD7"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("h2", {
        "class": "popup-heading",
        id: "hedr_frm"
      }, _this.state.hedr_frm)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        className: "popup-body ".concat(_this.state.body_frm_class),
        id: "body_frm"
      }, _this.state.body_frm == '' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "popup-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        id: "warningMessageMobile"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "col-md-12 form-group text-center"
      }, div_disp, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "otp_wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", null, "Enter OTP"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "auth_code1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "text",
        maxlength: "1",
        onkeyup: function onkeyup(event) {
          return Object(_Globals_GlobalFunc__WEBPACK_IMPORTED_MODULE_10__["move_toNext1"])(event, 'first', 'second');
        },
        onkeypress: function onkeypress(event) {
          return Object(_Globals_GlobalFunc__WEBPACK_IMPORTED_MODULE_10__["chkInput"])(event);
        },
        id: "first",
        value: _this.state.otp_val,
        "class": "input-otp"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "text",
        maxlength: "1",
        onkeyup: function onkeyup(event) {
          return Object(_Globals_GlobalFunc__WEBPACK_IMPORTED_MODULE_10__["move_toNext1"])(event, 'second', 'third');
        },
        onkeypress: function onkeypress(event) {
          return Object(_Globals_GlobalFunc__WEBPACK_IMPORTED_MODULE_10__["chkInput"])(event);
        },
        id: "second",
        value: _this.state.otp_val,
        "class": "input-otp"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "text",
        maxlength: "1",
        onkeyup: function onkeyup(event) {
          return Object(_Globals_GlobalFunc__WEBPACK_IMPORTED_MODULE_10__["move_toNext1"])(event, 'third', 'fourth');
        },
        onkeypress: function onkeypress(event) {
          return Object(_Globals_GlobalFunc__WEBPACK_IMPORTED_MODULE_10__["chkInput"])(event);
        },
        id: "third",
        value: _this.state.otp_val,
        "class": "input-otp"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "text",
        maxlength: "1",
        onKeyup: function onKeyup(event) {
          return Object(_Globals_GlobalFunc__WEBPACK_IMPORTED_MODULE_10__["move_toNext1"])(event, 'fourth', '');
        },
        onkeypress: function onkeypress(event) {
          return Object(_Globals_GlobalFunc__WEBPACK_IMPORTED_MODULE_10__["chkInput"])(event);
        },
        id: "fourth",
        value: _this.state.otp_val,
        "class": "input-otp"
      })), _this.state.OtpErrorReason ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        className: "feedback-msg mrgTP mrgBtm ".concat(_this.state.otp_err_color),
        id: "otp_err"
      }, _this.state.OtpErrorReason) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        id: "resend_otp_tag"
      }, "Didn't receive OTP? ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        id: "resend_otp",
        href: "javascript:void(0)",
        onclick: function onclick() {
          return _this.sendOTPToDisable(mobile_num, glid, true);
        }
      }, "Resend")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        id: "resend_otp_wait",
        "class": "disNone"
      }, "Please wait... ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "loader-sm"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        id: "otp_type",
        value: "mobile"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        id: "otp_mobile"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "col-md-12 text-center"
      }, _this.state.verify_otp ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "button",
        id: "verify_otp",
        "class": "btn btn-sm btn-primary",
        onclick: function onclick() {
          return _this.otpCheckToDisable(glid, mobile_num);
        },
        value: "Submit"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null), _this.state.otp_loader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("img", {
        id: "otp_loader",
        "class": "OTPLoader",
        src: "//utils.imimg.com/header/gifs/indicator.gif",
        width: "16",
        height: "16"
      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "Helpsec"
      }, "Need Help? Call us at 9696969696")) : _this.state.body_frm)));

      if (!_this.otpServiceCalled) {
        _this.sendOTPToDisable(mobile_num, glid);

        _this.otpServiceCalled = true;
      }

      return disableForm;
    });

    _defineProperty(_assertThisInitialized(_this), "sendOTPToDisable", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data, userGLID, resend) {
        var params, rsnd, response, message, stat, serviceCode, vendorErrorResponse;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                rsnd = '0';

                if (resend == true) {
                  rsnd = '1';
                }

                if (_this.phcc == '91') params = {
                  'OTPResend': rsnd,
                  'mobile_num': data,
                  'glusrid': userGLID,
                  'modid': 'MY',
                  'typ': '1',
                  'user_mobile_country_code': _this.phcc,
                  'user_ip': country_ip,
                  'iso': _this.iso
                };else params = {
                  'OTPResend': rsnd,
                  'email': data,
                  'glusrid': userGLID,
                  'modid': 'MY',
                  'typ': '1',
                  'user_mobile_country_code': _this.phcc,
                  'user_ip': country_ip,
                  'iso': _this.iso
                };
                _context2.next = 5;
                return _this.props.disOtp(params);

              case 5:
                response = _this.props.BuyerReducer.OTPData.response;

                if (!(response.failure == "Access Denied")) {
                  _context2.next = 10;
                  break;
                }

                _this.setState({
                  'OtpErrorReason': 'OTP can\'t be sent'
                });

                setTimeout(function () {
                  window.location.reload();
                }, 1500);
                return _context2.abrupt("return");

              case 10:
                message = response.Response.Message;

                if (!message.match('We have already sent an OTP on your mobile')) {
                  _context2.next = 14;
                  break;
                }

                _this.setState({
                  'OtpErrorReason': 'OTP has already been sent',
                  'otp_err_color': 'black'
                });

                return _context2.abrupt("return", false);

              case 14:
                stat = response.Response.Status;
                serviceCode = response.Response.Code;
                vendorErrorResponse = response.Response.VENDOR_ERROR_RESPONSE;

                if (!(serviceCode == '204' && stat == 'Failure' && vendorErrorResponse != '')) {
                  _context2.next = 20;
                  break;
                }

                _this.setState({
                  'OtpErrorReason': vendorErrorResponse,
                  'otp_err_color': 'red'
                });

                return _context2.abrupt("return", false);

              case 20:
                if (!(message.match('OTP Sent') && rsnd == 1)) {
                  _context2.next = 23;
                  break;
                }

                _this.setState({
                  'OtpErrorReason': 'OTP has been sent',
                  'otp_err_color': 'black'
                });

                return _context2.abrupt("return", false);

              case 23:
                _this.setState({
                  'OtpErrorReason': ''
                });

                return _context2.abrupt("return", true);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "otpCheckToDisable", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(userGLID, updatedData, div, enb) {
        var params, auth_key, response, stat, message, responseCode;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this.setState({
                  'otp_loader': true,
                  'verify_otp': false
                });

                auth_key = document.getElementById("first").value + document.getElementById("second").value + document.getElementById("third").value + document.getElementById("fourth").value;
                auth_key = auth_key.replace(/^\s+|\s+$/g, "");

                if (/\d{4}/.test(auth_key)) {
                  _context3.next = 7;
                  break;
                }

                _this.setState({
                  'otp_loader': false,
                  'verify_otp': true,
                  'OtpErrorReason': 'Please enter 4-digit OTP.',
                  'otp_err_color': 'red',
                  'otp_val': ''
                });

                $('#first').focus();
                return _context3.abrupt("return", false);

              case 7:
                if (_this.phcc == '91') params = {
                  'mobile_num': updatedData,
                  'glusrid': userGLID,
                  'auth_key': auth_key,
                  'typ': '2',
                  'modid': 'MY',
                  'user_mobile_country_code': _this.phcc,
                  'iso': _this.iso,
                  'user_ip': country_ip
                };else params = {
                  'email': updatedData,
                  'glusrid': userGLID,
                  'auth_key': auth_key,
                  'typ': '2',
                  'modid': 'MY',
                  'user_mobile_country_code': _this.phcc,
                  'iso': _this.iso,
                  'user_ip': country_ip
                };
                _context3.next = 10;
                return _this.props.disOtp(params);

              case 10:
                response = _this.props.BuyerReducer.OTPData.response;
                stat = response.Response.Status;
                message = response.Response.Message;
                responseCode = response.Response.Code;

                if (!(response.failure == "Access Denied")) {
                  _context3.next = 18;
                  break;
                }

                _this.setState({
                  'OtpErrorReason': 'OTP can\'t be sent'
                });

                setTimeout(function () {
                  window.location.reload();
                }, 1500);
                return _context3.abrupt("return", false);

              case 18:
                if (!(stat == 'FAILURE' || message.match('OTP not Verified') || message.match('Mobile Number not Verified'))) {
                  _context3.next = 21;
                  break;
                }

                _this.setState({
                  'otp_loader': false,
                  'verify_otp': true,
                  'OtpErrorReason': 'Please type the correct OTP',
                  'otp_err_color': 'red',
                  'otp_val': ''
                });

                return _context3.abrupt("return", false);

              case 21:
                if (!(responseCode == "200" && (message.match('Mobile Number Verified') || message.match('Email Verified')))) {
                  _context3.next = 25;
                  break;
                }

                _this.sendDisableRequest(); // getGAEventTrackingJS("Privacy_Settings","Disable_User","Indian_User");


                _this.setState({
                  'OtpErrorReason': ''
                });

                return _context3.abrupt("return", true);

              case 25:
                return _context3.abrupt("return", true);

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x4, _x5, _x6, _x7) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "sendDisableRequest", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
      var params, response;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _this.setState({
                'otp_loader': true
              });

              params = {
                'glusrId': _this.glid,
                'reason': $("input[name='reason']:checked").val(),
                'other_reason': $("#other_reason_text").val(),
                'ip': country_ip,
                'iso': _this.iso
              };
              _context4.next = 4;
              return _this.props.disableUser(params);

            case 4:
              _this.setState({
                'otp_loader': false
              });

              console.log(_this.props);
              response = _this.props.BuyerReducer.DisableData.response;
              console.log(response);

              if (!(response.failure == "Access Denied" || response.failure == 'ACCESS TOKEN TIMING ISSUE')) {
                _context4.next = 11;
                break;
              }

              window.location.reload();
              return _context4.abrupt("return");

            case 11:
              if (response.STATUS == 'SUCCESSFUL') {
                _this.setState({
                  'disableUserDiv': false,
                  'body_frm': 'Your account will be disabled within 24 hours. \nIn case of any concern please contact 9696969696.',
                  'body_frm_class': 'bdy_fm',
                  'hedr_frm': 'Disable My Account'
                });

                Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["deleteCookie"])("ImeshVisitor");
                Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["deleteCookie"])("im_iss");
                Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["deleteCookie"])("xnHist");
                Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["deleteCookie"])("v4iilex");
                localStorage.clear();
                setTimeout(function () {
                  window.location.href = "https://www.indiamart.com";
                }, 2000);
              } else {
                _this.setState({
                  'body_frm': 'Some Error Occured. Please try again later.',
                  'hedr_frm': 'Disable My Account'
                });
              }

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));

    _defineProperty(_assertThisInitialized(_this), "deactivateReasonSubmit", function () {
      if ($('input[name=reason]:checked').length == '0') {
        alert('Please select a reason');
        return false;
      } else if ($("input[name='reason']:checked") && $("input[name='reason']:checked").val() == 'Others' && $('#other_reason_text').val() == '') {
        alert('Please share details of any other reason');
        return false;
      } else {
        _this.setState({
          'DisableReason': false,
          'DisableValue': 2
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "cstmRadioInput", function () {
      if ($("input[name='reason']:checked").val() == 'Others') {
        _this.setState({
          'ShowOthers': true
        });
      } else {
        _this.setState({
          'ShowOthers': false
        });
      }
    });

    _this.state = {
      'DisableValue': 3,
      'DisableReason': false,
      'OtpErrorReason': '',
      'verify_otp': true,
      'otp_loader': false,
      'otp_err_color': 'black',
      'otp_val': '',
      'disableUserDiv': true,
      'body_frm': '',
      'body_frm_class': '',
      'hedr_frm': 'For Security, Please Identify Yourself',
      'ShowOthers': false
    };
    _this.otpServiceCalled = false;
    _this.glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["getCookieValByKey"])('ImeshVisitor', 'glid');
    _this.name = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["getCookieValByKey"])('ImeshVisitor', 'fn');
    _this.phcc = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["getCookieValByKey"])('ImeshVisitor', 'phcc');
    _this.mb1 = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["getCookieValByKey"])('ImeshVisitor', 'mb1');
    _this.utyp = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["getCookieValByKey"])('ImeshVisitor', 'utyp');
    _this.iso = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_7__["getCookieValByKey"])('ImeshVisitor', 'iso');
    return _this;
  }

  _createClass(SettingsComponent, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      //   console.log(this.props); 
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(react__WEBPACK_IMPORTED_MODULE_2__["default"].Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        className: "hm1 bbc fxmn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        className: "content-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "fixed_sec"
      }, this.props.UserDetails.data.glusr_disabled_reason == '1' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "disableUser"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "fnt24"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("img", {
        src: "https://my.imimg.com/gifs_new/tdr-alert.gif"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null), "Something is Wrong."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", null, "Sorry for the inconvenience. Please try again later."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "https://my.indiamart.com",
        "class": "btn-buyer mrgLft"
      }, "Go to Home Page"))) : [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null, this.props.UserDetails.loader === 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(_loader_components_LoaderAnimation__WEBPACK_IMPORTED_MODULE_1__["default"], {
        style: {
          margin: "auto",
          left: "0",
          right: "0",
          top: "0",
          bottom: "20%"
        }
      }) : [this.props.UserDetails.fail == 1 || this.props.UserDetails.data.CODE != undefined && this.props.UserDetails.data.CODE != '200' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(_ErrorPage_components_error__WEBPACK_IMPORTED_MODULE_9__["error"], null) : [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(TabNav, this.props), this.props.UserDetails.data.glusr_usr_approv === 'D' || this.props.UserDetails.data.is_paid === 'PAID' ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        "class": "f12 settingPage"
      }, "Customize your account settings for using IndiaMART.com"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "brm mrg20"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "mp1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "mp2"
      }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        "class": "signOut"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        onclick: function onclick() {
          return _this2.signout();
        }
      }, " Sign Out Completely")))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        "class": "f12 settingPage"
      }, "Customize your account settings for using IndiaMART.com"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "brm mrg20"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "brm mrg20"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "mp1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "mp2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        "class": "signOut"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        id: "email_pref",
        onclick: function onclick() {
          return _this2.email_pref();
        }
      }, " Email Preference Settings")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        id: "feedback",
        href: "",
        target: "_blank",
        rel: "noopener noreferrer"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "brm mrg20"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "mp1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "mp2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        "class": "signOut"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        onclick: function onclick() {
          return _this2.signout();
        }
      }, " Sign Out Completely"))))), this.state.disableUserDiv ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "mp10 ps1 warn f12",
        id: "disableUserDiv"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("strong", null, "Disable my Account"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null), "Disabling your account will deactivate your profile and remove your product listing and catalog information from IndiaMART", this.state.DisableValue == 3 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "ps2 clearfix"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("button", {
        type: "",
        "class": "btn btn-large btn-primary btn-warn1 flt-left",
        id: "disableAccount",
        ripple: "ripple",
        onclick: function onclick() {
          return _this2.setState({
            'DisableValue': 1
          });
        },
        "ripple-color": "#b52828"
      }, "Disable", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "loader-sm disNone",
        id: "disableLoader"
      }))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "ps2 clearfix"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "expand",
        id: "disableDiv"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", null, " Are you sure you want to remove your listing from IndiaMART?"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("button", {
        type: "",
        "class": "btn btn-primary no mrgTP",
        id: "disableYes",
        ripple: "ripple",
        onclick: function onclick() {
          return _this2.setState({
            'DisableReason': true
          });
        },
        "ripple-color": "#b52828"
      }, "Yes", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "loader-sm disNone",
        id: "disableLoader"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("button", {
        type: "",
        "class": "btn btn-large btn-primary btn-warn2 mrgTP",
        id: "disableNo",
        onclick: function onclick() {
          return _this2.setState({
            'DisableValue': 3
          });
        },
        ripple: "ripple",
        "ripple-color": "#b52828"
      }, "No", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "loader-sm disNone",
        id: "disableLoader"
      }))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        "class": "disNone",
        id: "1mob",
        value: this.state.glusr_usr_ph_mobile
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        "class": "disNone",
        id: "1email",
        value: this.state.email1
      }))))]])]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "disableForm1"
      }, this.state.DisableValue == 2 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(this.disfun, null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null)), this.state.DisableReason == true ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "popup is-visible",
        id: "disable_reason"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "popup-overlay popup-toggle popup-toggle-disable"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "ReasonPopup popup-transition"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "popup-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("button", {
        "class": "popup-close popup-toggle popup-toggle-disable-btn f30",
        onclick: function onclick() {
          return _this2.setState({
            'DisableReason': false,
            'ShowOthers': false
          });
        }
      }, "\xD7"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("h1", {
        "class": "popup-heading end_usr_msg_heading"
      }, "Why Do You Want to Remove your listing from IndiaMART ?")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "popup-body"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "popup-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        id: "warningMessageMobile"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "col-md-12 form-group text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "reason-content",
        "class": "txtAlign"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "radio"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        name: "reason",
        id: "business_closed",
        value: "My Business is Closed",
        type: "radio",
        "class": "cstm_radio_input",
        onClick: function onClick() {
          return _this2.cstmRadioInput();
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("label", {
        "for": "business_closed",
        "class": "colorBlack"
      }, "My Business is Closed."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "radio"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        name: "reason",
        id: "irrelevant_inquiries",
        value: "I am getting irrelevant Inquiries",
        type: "radio",
        "class": "cstm_radio_input",
        onClick: function onClick() {
          return _this2.cstmRadioInput();
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("label", {
        "for": "irrelevant_inquiries",
        "class": "colorBlack"
      }, "I am getting irrelevant Inquiries."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "radio"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        name: "reason",
        id: "many_calls",
        value: "I am getting too many calls from IndiaMART",
        type: "radio",
        "class": "cstm_radio_input",
        onClick: function onClick() {
          return _this2.cstmRadioInput();
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("label", {
        "for": "many_calls",
        "class": "colorBlack"
      }, "I am getting too many calls from IndiaMART."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "radio"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        name: "reason",
        id: "business_coming",
        value: "No Business is coming from IndiaMART",
        type: "radio",
        "class": "cstm_radio_input",
        onClick: function onClick() {
          return _this2.cstmRadioInput();
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("label", {
        "for": "business_coming",
        "class": "colorBlack"
      }, "No Business is coming from IndiaMART."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "radio"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        name: "reason",
        id: "duplicate_Account",
        value: "This is a Duplicate Account",
        type: "radio",
        "class": "cstm_radio_input",
        onClick: function onClick() {
          return _this2.cstmRadioInput();
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("label", {
        "for": "duplicate_Account",
        "class": "colorBlack"
      }, "This is a Duplicate Account."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "radio"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        name: "reason",
        id: "others",
        value: "Others",
        type: "radio",
        "class": "cstm_radio_input",
        onClick: function onClick() {
          return _this2.cstmRadioInput();
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("label", {
        "for": "others",
        "class": "colorBlack"
      }, "Others"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("br", null)), this.state.ShowOthers ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "other_reason"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("textarea", {
        rows: "",
        cols: "50",
        maxlength: "100",
        id: "other_reason_text",
        placeholder: "Please share details of any other reason",
        "class": "txtArea"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "spanTextArea"
      }, "Maximum 100 Characters")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "alingCenter"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("button", {
        "class": "btn btn-primary",
        id: "deactivate_reason_submit",
        onclick: function onclick() {
          return _this2.deactivateReasonSubmit();
        }
      }, "Submit and Deactivate")))))))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement(_Footer_components_Footer__WEBPACK_IMPORTED_MODULE_0__["footNav"], null));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var st = _Redux_store__WEBPACK_IMPORTED_MODULE_4__["store"].getState(); // console.log(st);

      if (!st.UserDetails.userDetData) {
        this.props.fetchUserData();
      }
    }
  }]);

  return SettingsComponent;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (SettingsComponent);

/***/ }),

/***/ "./src/modules/Buyer/BuyerSettings/container/SettingsContainer.js":
/*!************************************************************************!*\
  !*** ./src/modules/Buyer/BuyerSettings/container/SettingsContainer.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");
/* harmony import */ var _Redux_UserDetails_UDActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Redux/UserDetails/UDActions */ "./src/Redux/UserDetails/UDActions.js");
/* harmony import */ var _components_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/settings */ "./src/modules/Buyer/BuyerSettings/components/settings.js");
/* harmony import */ var _actions_settingAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/settingAction */ "./src/modules/Buyer/BuyerSettings/actions/settingAction.js");





var mapStateToProps = function mapStateToProps(state) {
  // console.log(state);
  return {
    UserDetails: state.UserDetails,
    BuyerReducer: state.BuyerReducer
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchUserData: function fetchUserData() {
      return dispatch(Object(_Redux_UserDetails_UDActions__WEBPACK_IMPORTED_MODULE_1__["fetchUDData"])());
    },
    fetchSettingPref: function fetchSettingPref(params) {
      return dispatch(_actions_settingAction__WEBPACK_IMPORTED_MODULE_3__["settingAPI"].settingPreferenceData(params));
    },
    disOtp: function disOtp(params) {
      return dispatch(_actions_settingAction__WEBPACK_IMPORTED_MODULE_3__["settingAPI"].disOtp(params));
    },
    disableUser: function disableUser(params) {
      return dispatch(_actions_settingAction__WEBPACK_IMPORTED_MODULE_3__["settingAPI"].disableUser(params));
    }
  };
}; // export default Settings;


/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_components_settings__WEBPACK_IMPORTED_MODULE_2__["default"]));

/***/ }),

/***/ "./src/modules/Buyer/BuyerSettings/css/settings.css":
/*!**********************************************************!*\
  !*** ./src/modules/Buyer/BuyerSettings/css/settings.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/modules/ErrorPage/components/error.js":
/*!***************************************************!*\
  !*** ./src/modules/ErrorPage/components/error.js ***!
  \***************************************************/
/*! exports provided: error */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "error", function() { return error; });
/* harmony import */ var _css_error_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/error.css */ "./src/modules/ErrorPage/css/error.css");
/* harmony import */ var _css_error_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_error_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var error = /*#__PURE__*/function (_Component) {
  _inherits(error, _Component);

  var _super = _createSuper(error);

  function error(props) {
    _classCallCheck(this, error);

    return _super.call(this, props);
  }

  _createClass(error, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        "class": "errorDiv"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        "class": "f24"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("img", {
        src: "https://my.imimg.com/gifs_new/tdr-alert.gif"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("br", null), "Something is Wrong."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("p", null, "Sorry for the inconvenience."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("a", {
        href: "javascript:void(0);",
        onclick: function onclick() {
          return window.location.reload(true);
        },
        "class": "btn-buyer"
      }, "Try Again"));
    }
  }]);

  return error;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/***/ }),

/***/ "./src/modules/ErrorPage/css/error.css":
/*!*********************************************!*\
  !*** ./src/modules/ErrorPage/css/error.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/modules/Footer/components/Footer.js":
/*!*************************************************!*\
  !*** ./src/modules/Footer/components/Footer.js ***!
  \*************************************************/
/*! exports provided: footNav */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "footNav", function() { return footNav; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Globals/CookieManager */ "./src/Globals/CookieManager.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");
/* harmony import */ var _css_FooterCss_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../css/FooterCss.css */ "./src/modules/Footer/css/FooterCss.css");
/* harmony import */ var _css_FooterCss_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_css_FooterCss_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_noscript__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-noscript */ "../node_modules/react-noscript/lib/ReactNoScript.js");
/* harmony import */ var react_noscript__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_noscript__WEBPACK_IMPORTED_MODULE_5__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }







var footNav = /*#__PURE__*/function (_Component) {
  _inherits(footNav, _Component);

  var _super = _createSuper(footNav);

  function footNav(props) {
    var _this;

    _classCallCheck(this, footNav);

    _this = _super.call(this, props);
    _this.newVal = '';
    _this.c_imesh = '';
    _this.rspv = 0;
    return _this;
  }

  _createClass(footNav, [{
    key: "startingcall",
    value: function startingcall() {
      var jobs_career = '<a href="https://corporate.indiamart.com/careers-at-im/">Jobs &amp; Careers</a>';
      var IMhome_invest = '';
      var IMhome_jobs = '';

      if (window.location.href.match(/my/i) == 'my' || glmodid == "IMHOME") {
        IMhome_invest = '<a href="https://investor.indiamart.com/index.htm">Investor Section</a>';
        IMhome_jobs = jobs_career;
      } else {
        IMhome_invest = jobs_career;
        IMhome_jobs = '';
      }

      document.getElementById('sag').innerHTML = '<ul><li><a href="https://corporate.indiamart.com/about-us/">About Us</a><a href="https://corporate.indiamart.com/partner-with-us/">Join Sales</a><a href="https://corporate.indiamart.com/category/everything-else/indiamart-achievers/">Success Stories</a> <a href="https://corporate.indiamart.com/category/everything-else/press-releases/">Press Section</a> <a href="https://corporate.indiamart.com/advertise-with-indiamart/">Advertise with Us</a>' + IMhome_invest + '</li><li><a href="https://help.indiamart.com/">Help</a> <a href="https://help.indiamart.com/user-feedback/">Feedback</a> <a href="https://help.indiamart.com/complaint-registration/">Complaints</a> <a href="https://corporate.indiamart.com/customer-care-services/">Customer Care</a>' + IMhome_jobs + '<a href="https://corporate.indiamart.com/branch-offices/">Contact Us</a></li><li class="cf_wdth"><div class="cf_lihd"><a href="https://seller.indiamart.com" class="ch_supplier_head">Suppliers Tool Kit</a></div><span id="ch_free_web"><a href="https://seller.indiamart.com/" class="ch_free_web">Sell on IndiaMART</a></span> <a href="https://seller.indiamart.com/bltxn/?pref=recent" class="bl_log_link">Latest BuyLead</a> <a href="https://corporate.indiamart.com/quick-learn/">Learning Centre</a> <a href="https://seller.indiamart.com/pwim/invoice/whatispwim/?bannerid=cntrlfooter" id="pypd_footer" class="disNone">Pay With IndiaMART</a></li><li class="cf_wdth"><div class="cf_lihd"><a href="https://my.indiamart.com" class="ch_buyers_head">Buyers Tool Kit</a></div><a href="https://my.indiamart.com/buyertools/postbl" class="ch_post_buy">Post Your Requirement</a> <a href="https://my.indiamart.com/buyertools/myproductbuy" class="mang_pro">Products You Buy</a> <a href="https://www.indiamart.com/search.html">Search Products &amp; Suppliers</a> <a href="https://paywith.indiamart.com?bannerid=cntrlfooter"  id="pay_footer">Pay With IndiaMART</a></li><li class="last"><div class="cf_lihd">Events</div><a href="https://10times.com/tradeshows" target="_blank">Trade Shows</a> <a href="https://10times.com/conferences" target="_blank">Conferences</a> <a href="https://10times.com/events/by-country" target="_blank">Events by Country</a></li></ul>';
      var webAddress = location.hostname;
      var UrlPri = webAddress.match(/^dev/) ? "dev-" : webAddress.match(/^stg/) ? "stg-" : "";
      this.c_imesh = typeof Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookie"])("ImeshVisitor") !== "undefined" ? Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookie"])("ImeshVisitor") : '';
      var pv_count = 0;

      if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookie"])("xnHist") > "") {
        if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])("xnHist", "pv") != "") {
          pv_count = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])("xnHist", "pv");
        }
      }

      var o = new Date();
      o.setTime(o.getTime() + 30 * 60 * 1000);

      if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookie"])("sessid") && Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookie"])("sessid").length > 0) {
        var spv1 = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookie"])("sessid").split('=');
        this.rspv = parseInt(spv1[1]);
        this.newVal = "spv=" + ++this.rspv;
      } else {
        this.newVal = "spv=1";
      }

      this.callConversionCode();
      this.activeFooterOnReady();
    }
  }, {
    key: "callIdentifyPopup",
    value: function callIdentifyPopup() {
      var match = window.location.href.match(/back=1/);

      if ((this.c_imesh == '' || this.c_imesh == null) && (this.rspv == 2 || this.rspv == 4 || this.rspv == 6) && match == null) {
        $.ajaxSetup({
          cache: true
        });
        $.getScript("https://" + UrlPri + "utils.imimg.com/globalhf/identified_popup.js", function () {
          getIdentifiedPopUpHTMLForm1();
          setTimeout(function () {
            identify_Banner();
          }, 3000);
        });
        $('#IdentifiedPopUpHTML').on("click", "#countrySuggesterIdenPop", function () {
          changePopUpInput(identifiedPopName, 1);
        });
        is_form_open = 0;
      }
    }
  }, {
    key: "activeFooterOnReady",
    value: function (_activeFooterOnReady) {
      function activeFooterOnReady() {
        return _activeFooterOnReady.apply(this, arguments);
      }

      activeFooterOnReady.toString = function () {
        return _activeFooterOnReady.toString();
      };

      return activeFooterOnReady;
    }(function () {
      var o = new Date();
      o.setTime(o.getTime() + 30 * 60 * 1000);

      if (typeof jQuery === 'function') {
        document.cookie = "sessid=" + this.newVal + ";expires=" + o.toGMTString() + ";domain=.indiamart.com;path=/;"; //callIdentifyPopup();

        var ipv = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])("xnHist", "ipv");
        var fpv = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])("xnHist", "fpv");
        var glUserId = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])("ImeshVisitor", "glid");
        var name = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])("ImeshVisitor", "mb1");
        var modid = glmodid;
        var email = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])("ImeshVisitor", "em");
        var city = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])("ImeshVisitor", "ct");
        var ph_country = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])("ImeshVisitor", "phcc");
        var cn_iso = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_2__["getCookieValByKey"])("ImeshVisitor", "iso"); //Mobile Verification Popup for 3rd and 5th Page view
        //  if(((ipv == 2)||(ipv==4))&& (!(window.location.href.indexOf("my") > -1))) {  
        //      let screen = 'VER';
        //      if (name!=''&& getparamVal(pop_imesh, "phcc") == '91' && getparamVal(pop_imesh, "uv") != 'V'){        
        //          $.getScript("https://"+UrlPri+"utils.imimg.com/header/js/imlogin.js", function(){ send_otp(glUserId,modid,name,ph_country,'121',cn_iso,'2','4',screen);
        //          });
        //      }
        // }   
      } else {
        setTimeout(function () {
          activeFooterOnReady();
        }, 50);
      }
    })
  }, {
    key: "recordInboundLinkS_bounce",
    value: function recordInboundLinkS_bounce(category, action, label, value, noninteraction) {
      _gaq.push(['_trackEvent', window.location.href, action, label, value, noninteraction]);
    }
  }, {
    key: "recordOutboundLink3",
    value: function recordOutboundLink3(category, action) {
      _gaq.push(['_trackEvent', category, action, 'trackPageviewParam']);
    }
  }, {
    key: "callConversionCode",
    value: function callConversionCode() {
      /* <![CDATA[ */
      var google_conversion_id = 1067418746;
      var google_custom_params = window.google_tag_params;
      var google_remarketing_only = true;
      /* ]]> */

      $.getScript("https://www.googleadservices.com/pagead/conversion.js");
      $('.cf_ftlk ul li a').on('click', function () {
        var value = $(this).text();

        _gaq.push(['_trackEvent', 'IM Global Footer ', window.location.host, value, 0]);
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        "class": "cf_clb cf_footer"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        "class": "cf_ftHd"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        "class": "cf_wd"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        "class": "cf_social"
      }, "Follow us on: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", {
        href: "https://www.facebook.com/IndiaMART",
        "class": "cf_fb",
        target: "_blank"
      }, "Facebook"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", {
        href: "https://twitter.com/IndiaMART",
        "class": "tw_ft",
        target: "_blank"
      }, "Twitter"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", {
        href: "https://www.linkedin.com/company/indiamart-intermesh-limited/",
        "class": "cf_lkd_in",
        target: "_blank"
      }, "linkedin"), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        "class": "cf_goMob cf_rht"
      }, "Go Mobile: ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", {
        href: "https://itunes.apple.com/us/app/indiamart-buy-sell-products/id668561641?mt=8",
        "class": "cf_iOS",
        target: "_blank"
      }, "iOS App"), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", {
        href: "https://play.google.com/store/apps/details?id=com.indiamart.m",
        "class": "cf_anrd",
        target: "_blank"
      }, "Android App"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", {
        href: "https://m.indiamart.com/",
        "class": "cf_mSit",
        target: "_blank"
      }, "https://m.indiamart.com")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        "class": "cf_fhd"
      }, "We are here to help you!"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        "class": "cf_wd cf_ftlk",
        id: "sag"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        "class": "cf_cryt"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        "class": "cf_wd"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", {
        "class": "cf_rht"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", {
        href: "https://www.indiamart.com/terms-of-use.html"
      }, "Terms of Use"), " - ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", {
        href: "https://www.indiamart.com/privacy-policy.html"
      }, "Privacy Policy"), " - ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("a", {
        href: "https://www.indiamart.com/link-to-us.html"
      }, "Link to Us")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("span", null, "Copyright \xA9 1996-2022 IndiaMART InterMESH Ltd. All rights reserved."))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        "class": "chat_window psRght"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        id: "IdentifiedPopUpHTML"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(react_noscript__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
        "class": "disInline"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("img", {
        height: "1",
        width: "1",
        "class": "brdNone",
        alt: "google",
        src: "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/1067418746/?value=0&guid=ON&script=0"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(react_noscript__WEBPACK_IMPORTED_MODULE_5___default.a, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("img", {
        height: "1",
        width: "1",
        alt: "facebook",
        "class": "disNone",
        src: "https://www.facebook.com/tr?id=1000024446685311&ev=PixelInitialized"
      })));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startingcall();
    }
  }]);

  return footNav;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/***/ }),

/***/ "./src/modules/Footer/css/FooterCss.css":
/*!**********************************************!*\
  !*** ./src/modules/Footer/css/FooterCss.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/modules/loader/components/LoaderAnimation.js":
/*!**********************************************************!*\
  !*** ./src/modules/loader/components/LoaderAnimation.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Spinner; });
/* harmony import */ var _css_orbitals_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/orbitals.css */ "./src/modules/loader/css/orbitals.css");
/* harmony import */ var _css_orbitals_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_orbitals_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



function Spinner(_ref) {
  var _ref$color = _ref.color,
      color = _ref$color === void 0 ? '#7f58af' : _ref$color,
      style = _ref.style;

  var circles = _toConsumableArray(Array(12)).map(function (_, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
      className: "div-after",
      style: {
        background: color
      }
    }));
  });

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
    className: "lds-spinner",
    style: _objectSpread({}, style)
  }, circles);
}

/***/ }),

/***/ "./src/modules/loader/css/orbitals.css":
/*!*********************************************!*\
  !*** ./src/modules/loader/css/orbitals.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=BuyerSettings.pwa202.js.map