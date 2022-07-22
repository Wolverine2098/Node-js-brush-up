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

/***/ "../node_modules/invariant/browser.js":
/*!********************************************!*\
  !*** ../node_modules/invariant/browser.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (true) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


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

/***/ "./src/Redux/UserDetails/ud_actions.js":
/*!*********************************************!*\
  !*** ./src/Redux/UserDetails/ud_actions.js ***!
  \*********************************************/
/*! exports provided: fetchUD_Data, fetchUDSuccess, fetchUDFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUD_Data", function() { return fetchUD_Data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUDSuccess", function() { return fetchUDSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchUDFailure", function() { return fetchUDFailure; });
/* harmony import */ var _api_imApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../api/imApi */ "./src/api/imApi.js");

var fetchUD_Data = function fetchUD_Data() {
  return function (dispatch) {
    return _api_imApi__WEBPACK_IMPORTED_MODULE_0__["default"].fetchSellerUserdetails().then(function (response) {
      //console.log(response);
      dispatch(fetchUDSuccess(response));
      return true;
    })["catch"](function (error) {
      dispatch(fetchUDFailure(error.message));
    });
  };
};
var fetchUDSuccess = function fetchUDSuccess(data) {
  return {
    type: "FETCH_UD_SUCCESS",
    payload: data
  };
};
var fetchUDFailure = function fetchUDFailure(error) {
  return {
    type: "FETCH_UD_FAILURE",
    payload: error
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//import gblFunc from '../Globals/GlobalFunctions';






var glid;
var imApi = {
  fetchSellerUserdetails: function fetchSellerUserdetails() {
    var data = {};
    return makeRequest2('GET', '/miscreact/ajaxrequest/seller/UserDetails/', data);
  },
  //Seller Mydrive
  fetchSellerMyDriveDetails: function fetchSellerMyDriveDetails(pnum, flag) {
    //console.log("in IM api MyDrive Post");
    var data = {
      "pnum": pnum,
      "flag": flag
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/MyDrive/', data);
  },
  fetchSellerImageDetails: function fetchSellerImageDetails(pnum, flag) {
    console.log("fetch image details");
    var data = {
      "pnum": pnum,
      "flag": flag
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/MyDrive/', data);
  },
  fetchSellerPdfDetails: function fetchSellerPdfDetails(pnum, flag) {
    console.log("fetch pdf details");
    var data = {
      "pnum": pnum,
      "flag": flag
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/MyDrive/', data);
  },
  fetchSellerDocDetails: function fetchSellerDocDetails(pnum, flag) {
    console.log("fetch doc");
    var data = {
      "pnum": pnum,
      "flag": flag
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/MyDrive/', data);
  },
  fetchSellerExcelDetails: function fetchSellerExcelDetails(pnum, flag) {
    console.log("fetch excel");
    var data = {
      "pnum": pnum,
      "flag": flag
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/MyDrive/', data);
  },
  fetchSellerZipDetails: function fetchSellerZipDetails(pnum, flag) {
    console.log("fetch zip");
    var data = {
      "pnum": pnum,
      "flag": flag
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/MyDrive/', data);
  },
  fetchSellerOtherDetails: function fetchSellerOtherDetails(pnum, flag) {
    console.log("fetch other");
    var data = {
      "pnum": pnum,
      "flag": flag
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/MyDrive/', data);
  },
  fetchSellerDescDetails: function fetchSellerDescDetails(pnum, flag) {
    console.log("fetch in desc");
    var data = {
      "pnum": pnum,
      "flag": flag
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/MyDrive/', data);
  },
  fetchSellerRenameImg: function fetchSellerRenameImg(id, name, path, ext) {
    console.log("in rename img ");
    var data = {
      "id": id,
      "name": name,
      "path": path,
      "ext": ext
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/RenameImg/', data);
  },
  fetchSellerDeleteImg: function fetchSellerDeleteImg(id, path, ext) {
    console.log("in delete img");
    var data = {
      "id": id,
      "path": path,
      "ext": ext
    }; //console.log(data);

    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/DeleteImg/', data);
  },
  fetchSellerUploadImg: function fetchSellerUploadImg(formdata) {
    console.log("in upload img");
    var data = {
      "formdata": formdata
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/UploadImg/', data);
  },
  downloadFile: function downloadFile(path) {
    console.log("Downloading");
    var data = {
      "p": path
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/DownloadImg/', data);
  },
  fetchSellerUnzip: function fetchSellerUnzip(d) {
    console.log("in upload img");
    var data = {
      "listing": d
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/Unzip/', data);
  },
  //Seller-BillsandInvoices
  fetchSellerInvoicesDetails: function fetchSellerInvoicesDetails() {
    // console.log("in IM api Invoices");
    var data = {};
    return makeRequest2('GET', '/miscreact/ajaxrequest/seller/billsinvoices/invoices/', data);
  },
  printInvoice: function printInvoice(id) {
    console.log("in api print invoice");
    var data = {
      'id': id
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/InvoicePrint/', data);
  },
  downloadInvoice: function downloadInvoice(id) {
    console.log("in api download invoice");
    var data = {
      'id': id
    };
    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/InvoiceDownload/', data);
  },
  sendInvoiceEmail: function sendInvoiceEmail(id, userdet, service, date) {
    console.log("in IM api Send Invoice Email Post"); //console.log(userdet);

    var data = {
      'id': id,
      'userdet': _objectSpread({}, userdet),
      'service': service,
      'date': date
    }; //console.log(data);

    return makeRequest2('POST', '/miscreact/ajaxrequest/seller/InvoiceEmail/', data);
  },
  fetchSellermypaymentsdetails: function fetchSellermypaymentsdetails() {
    //console.log("in IM api my payments");
    var data = {};
    return makeRequest2('GET', '/miscreact/ajaxrequest/seller/billsinvoices/mypayments/', data);
  },
  //Seller-CompanyProfile
  fetchSellerContactdetails: function fetchSellerContactdetails() {
    var data = {};
    return makeRequest2('GET', '/miscreact/ajaxrequest/seller/companyprofile/contactdetails/', data);
  },
  fetchSellerBusinessProfileData: function fetchSellerBusinessProfileData() {
    console.log("in business profile");
    var data = {};
    return makeRequest2('GET', '/miscreact/ajaxrequest/seller/companyprofile/businessprofile/', data);
  },
  //Seller End
  //MY ENQ MODULE
  fetchEnquiries: function fetchEnquiries(start, end, enqType, folderValue) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/enq/enqlist?start=' + start + '&end=' + end + '&ENQTYPE=' + enqType + '&folderValue=' + folderValue, data);
  },
  fetchEnquiryDetail: function fetchEnquiryDetail(enqId, enqType, folder) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/enq/enqdetail?Q_TYPE=' + enqType + '&QUERY_ID=' + enqId + '&Folder=' + folder + '&buyer_response=1', data);
  },
  sendReply: function sendReply(subject, queryId, queryType, msg, sGlid, rGlid, sEmail, sName, rEmail, rName, rSequence, filename, folderValue) {
    var data = {},
        url = '';
    if (filename) url = '/ajaxrequest/enq/sendreply?subject=' + subject + '&queryId=' + queryId + '&queryType=' + queryType + '&msg=' + encodeURIComponent(msg) + '&sGlid=' + sGlid + '&rGlid=' + rGlid + '&sEmail=' + sEmail + '&sName=' + sName + '&rEmail=' + rEmail + '&rName=' + rName + '&rSequence=' + rSequence + '&filename=' + filename + '&folderValue=' + folderValue;else url = '/ajaxrequest/enq/sendreply?subject=' + subject + '&queryId=' + queryId + '&queryType=' + queryType + '&msg=' + encodeURIComponent(msg) + '&sGlid=' + sGlid + '&rGlid=' + rGlid + '&sEmail=' + sEmail + '&sName=' + sName + '&rEmail=' + rEmail + '&rName=' + rName + '&rSequence=' + rSequence + '&folderValue=' + folderValue;
    return makeRequest('GET', url);
  },
  sendReplyy: function sendReplyy(subject, queryId, queryType, msg, sGlid, rGlid, chkuser) {
    var attach1 = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
    var rfqid = arguments.length > 8 ? arguments[8] : undefined;
    var contact_year = arguments.length > 9 ? arguments[9] : undefined;
    var url = '/ajaxrequest/identified/messagecenter/sendreply_' + chkuser + '/';
    var data = {
      'subject': subject,
      'queryId': queryId,
      'queryType': queryType,
      'msg': msg,
      'sGlid': sGlid,
      'rGlid': rGlid,
      'attach1': attach1,
      'rfqid': rfqid,
      'contact_year': contact_year
    };
    return makeRequest('POST', url, data);
  },
  chatUser: function chatUser(userid) {
    var data = {
      userid: userid
    };
    return makeRequest('POST', '/ajaxrequest/identified/messagecenter/chatUser/', data);
  },
  fetchUserFolder: function fetchUserFolder() {
    var data = {};
    var dd = makeRequest('GET', '/ajaxrequest/enq/enqfolder', data);
    return dd;
  },
  forgotPassword: function forgotPassword(username, ciso) {
    var data = {
      "username": username,
      "ciso": ciso
    };
    var dd = makeRequest('POST', '/ajaxrequest/identified/common/forgotPassword', data);
    return dd;
  },
  saveQrfFeedback: function saveQrfFeedback(qrfParams) {
    var data = {};
    var feedbackId = qrfParams.Feedback_Id || '';
    if (feedbackId == '') return makeRequest('GET', '/ajaxrequest/enq/qrffeedback?queryid=' + qrfParams.queryid + '&qtype=' + qrfParams.qtype + '&relevancyid=' + qrfParams.relevancyid + '&feedback_source=' + qrfParams.feedback_source, data);else return makeRequest('GET', '/ajaxrequest/enq/qrffeedback?queryid=' + qrfParams.queryid + '&qtype=' + qrfParams.qtype + '&relevancyid=' + qrfParams.relevancyid + '&feedback_source=' + qrfParams.feedback_source + '&Feedback_Id=' + qrfParams.Feedback_Id + '&reason_id=' + qrfParams.reason_id + '&other_text=' + qrfParams.other_text, data);
  },
  fileUpload: function fileUpload(file) {
    return makeRequestFile('POST', '/ajaxrequest/enq/fileUpload', file);
  },
  moveToFolder: function moveToFolder(chk, folderValue, moveTo) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/enq/moveToFolder?chk=' + chk + '&folderValue=' + folderValue + '&moveTo=' + moveTo, data);
  },
  //MY PRODUCTS MODULE
  fetchMyProducts: function fetchMyProducts(dataList) {
    var data = {};
    var fobFilter = dataList.product_filter || '';
    return makeRequest('GET', '/ajaxrequest/identified/products/myprdlist?start=' + dataList.start + '&end=' + (dataList.start + 19) + '&product_filter=' + fobFilter, data);
  },
  addPriceMyProducts: function addPriceMyProducts(item_name, item_id, display_id, price, unit, action, index, imageData) {
    var data = {
      item_name: item_name,
      item_id: item_id,
      display_id: display_id,
      price: price,
      unit: unit,
      action: action,
      imageData: imageData
    };
    return makeRequest('POST', '/ajaxrequest/identified/products/addEditProduct', data);
  },
  getProdDetail: function getProdDetail(display_id) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/identified/products/getdetail?display_id=' + display_id, data);
  },
  getcatData: function getcatData() {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/identified/products/getcatdata', data);
  },
  addEditDetail: function addEditDetail(action, price, unit, desc, moq, prodname, cat, item_id, display_id, imageData) {
    var data = {
      action: action,
      item_name: prodname,
      price: price,
      unit: unit,
      desc: desc,
      moq: moq,
      cat: cat,
      item_id: item_id ? item_id : '',
      display_id: display_id,
      imageData: imageData
    };
    return makeRequest('POST', '/ajaxrequest/identified/products/addEditProduct', data);
  },
  imageUpload: function imageUpload(file) {
    return makeRequestFile('POST', '/ajaxrequest/identified/products/imageUpload1', file);
  },
  fetchSubGroup: function fetchSubGroup(start, end, grpname) {
    var data = {};

    if (!isNaN(start) || !isNaN(end)) {
      return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/fetchGroups?start=' + start + '&end=' + end + '&GRP=' + grpname + '&modid=IMOB&token=imobile@15061981', data);
    }
  },
  //LATEST BUYLEADS
  fetchBuyleads: function fetchBuyleads(count, shortlist, inbox, offer_flag, iso, city, locpref, mcatid, pref_city_lead) {
    pref_city_lead == undefined || pref_city_lead == '' ? pref_city_lead = 0 : '';
    var token = 'imobile@15061981',
        url,
        data = {};
    var blend = count + 10;

    if (shortlist == "GET_SHORTLIST") {
      blend = count + 25;
    }

    locpref == '' || locpref == undefined ? locpref = 4 : '';
    pref_city_lead == '' || pref_city_lead == undefined ? pref_city_lead = '0' : '';
    glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
    url = '/ajaxrequest/identified/buyleads/bl/buyLeadlist?start=' + Number(count + 1) + '&end=' + Number(blend) + '&buyer_response=2&shortlist=' + shortlist + '&token=' + token + '&MOD_ID=IMOB&offer_type=' + offer_flag + '&attachment=1' + '&LocPref=' + locpref + '&inbox=' + (inbox || '') + '&city=' + (city || '') + '&iso=' + iso + '&mcatid=' + (mcatid || '') + '&pref_city_lead=' + pref_city_lead;

    if (!isNaN(count) && glid) {
      return makeRequest('GET', url, data);
    }
  },
  DefaultBuyleads: function DefaultBuyleads(offerType) {
    return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/defaultDisplay?offerType=' + offerType, {});
  },
  fetchBuyleadsForOffer: function fetchBuyleadsForOffer(offerid, shouldUpdate, blstart, blend) {
    var token,
        url,
        data = {};
    var glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
    var offer_type = 'B';
    var buyer_response = 1;
    var inbox = 'P';
    token = 'imobile@15061981';
    url = '/ajaxrequest/identified/buyleads/bl/buyLeadlist?start=' + blstart + '&end=' + blend + '&buyer_response=' + buyer_response + '&token=' + token + '&MOD_ID=IMOB&offer_type=' + offer_type + '&offer=' + offerid;

    if (!isNaN(blstart) || !isNaN(blend)) {
      return makeRequest('GET', url, data);
    }
  },
  standardProductDetail: function standardProductDetail(displayId) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/identified/standardProductDetails?displayId=' + displayId, data, '', false);
  },
  fetchIndustryTenders: function fetchIndustryTenders(lastBlCount, groupId) {
    var token = 'imobile@15061981';
    var start = lastBlCount;
    var end = lastBlCount + 10;
    var url = '/ajaxrequest/identified/buyleads/bl/industryTenders?start=' + start + '&end=' + end + '&groupId=' + groupId + '&token=' + token + '&MOD_ID=IMOB';
    return makeRequest('GET', url);
  },
  getCurrentEtoOffer: function getCurrentEtoOffer(offerId) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/offer?id=' + offerId, data);
  },
  getMsgCount: function getMsgCount() {
    var data = {};
    return makeRequest('POST', '/ajaxrequest/identified/messages/unreadMessage', data);
  },
  getUnreadList: function getUnreadList(params, start, end) {
    var data = {
      "glusrid": params,
      "start": start,
      "end": end,
      "modid": "IMOB"
    };
    return makeRequest('POST', '/ajaxrequest/identified/messages/unreadList', data);
  },
  updateRead: function updateRead(glid, contact_glid, modid) {
    var data = {
      "user_glid": glid,
      "contact_glid": contact_glid,
      "modid": modid
    };
    return makeRequest('POST', '/ajaxrequest/identified/messagecenter/readReceipt', data);
  },
  //LOGIN
  loggedinUser: function loggedinUser(logindata) {
    var data = {
      "use": logindata.use ? logindata.use : '',
      "pass": logindata.pass ? logindata.pass : '',
      "ciso": logindata.ciso ? logindata.ciso : '',
      'IP': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      'IP_COUNTRY': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm'),
      'IPADDRESS': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      'GEOIP_COUNTRY_ISO': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcniso'),
      'originalreferer': window.location.href,
      'ph_code': _constants_constants__WEBPACK_IMPORTED_MODULE_1__["CC_JSON"][0][logindata.ciso],
      'glid': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid') ? Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid') : '',
      'glusr_usr_ip': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip') ? Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip') : '',
      'duplicateEmailCheck': logindata.duplicateEmailCheck ? logindata.duplicateEmailCheck : ''
    };
    return makeRequest('POST', '/ajaxrequest/identified/common/login', data);
  },
  otpVerf: function otpVerf(otpdata) {
    var p = 1;
    var ciso = otpdata.ciso;

    if (ciso != "IN" && ciso != "US" && ciso != "AE" && ciso != "UK" && ciso != "AU") {
      p = 0;
    }

    var val = p == 0 ? _constants_constants__WEBPACK_IMPORTED_MODULE_1__["COUNTRY_DROPDOWN_JSON"].find(function (item) {
      return item.cniso == ciso;
    }) : _constants_constants__WEBPACK_IMPORTED_MODULE_1__["TOP5COUNTRIES"].find(function (item) {
      return item.cniso == ciso;
    });
    var country_name = "";

    if (p == 0) {
      country_name = val.cnname;
    } else {
      country_name = val.cname;
    }

    var glusrid = otpdata.glusr_id;
    var data = {
      "user": otpdata.user,
      "screenName": otpdata.screenName ? otpdata.screenName : '',
      "type": otpdata.type,
      "authCode": otpdata.authCode,
      "glusr_id": glusrid ? glusrid : Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      "ciso": ciso ? ciso : "IN",
      "email": otpdata.email,
      "user_mobile_country_code": otpdata.ph ? otpdata.ph : Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'phcc'),
      "user_country": country_name,
      "userIp": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      "OTPResend": otpdata.OTPResend,
      "emailVerify": otpdata.emailVerify ? otpdata.emailVerify : '',
      "source": otpdata.source ? otpdata.source : '',
      "msg_key": otpdata.msg_key ? otpdata.msg_key : 0
    };
    return makeRequest('POST', '/ajaxrequest/identified/common/otpVerification', data);
  },
  detectCountry: function detectCountry() {
    var data = {}; //2 to return parameter in required format

    return _locationApi__WEBPACK_IMPORTED_MODULE_0__["default"].geolocation_newservice(2);
  },
  packageData: function packageData(offer, tender, isForeignLead) {
    var data = {
      "GLUSERID": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      "MOBILE": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'mb1'),
      "SOURCE": "M-MY",
      "OFFER_ID": offer,
      "TENDER_ID": tender,
      "REF_URL": "package.html"
    };
    if (isForeignLead == '1') data['isForeign'] = 1;
    return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/package', data);
  },
  frmsubmit_package: function frmsubmit_package(pay_id, offerid, tenderid, prev_url, gst) {
    var data = {
      'MOBILE': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'mb1'),
      'GLUSERID': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      'FLOW_STATUS': 'GETORDERID',
      'SOURCE': 'M-MY',
      'MODID': 'IMOB',
      'REF_URL': 'https://m.indiamart.com/bl/blpurchaseresponse/',
      'PLAN': pay_id,
      'OFFER_ID': offerid,
      'TENDER_ID': tenderid,
      'TOKEN': "c44e794a7318ba715530cf81297e2071",
      'PREV_URL': prev_url,
      'fromsite': "M-MY"
    };

    if (gst) {
      data.gst = gst;
    }

    return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/package/buynow/', data, 5000);
  },
  makeShortUrl: function makeShortUrl(b) {
    data = {};
    return makeRequest('GET', '/shortUrl/?long_url=' + b, data);
  },
  getdata: function getdata(q) {
    var data = {
      q: q
    };
    return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/getdata', data);
  },
  getSearchData: function getSearchData(q) {
    var data = {};
    return $.ajax({
      url: 'https://suggest.imimg.com/suggest/suggest.php/?q=' + q + '&limit=8&type=product&fields=type_data%2Csort_order&match=fuzzy&showloc=0&p=36',
      cache: false,
      success: function success(response) {
        return JSON.parse(response);
      },
      timeout: 3000
    });
  },
  getSearchCity: function getSearchCity() {
    var city = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var limit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var data = {};
    return new Promise(function (resolve, reject) {
      var res = $.ajax({
        url: state ? 'https://suggest.imimg.com/suggest/suggest.php?q=' + city + '&limit=' + limit + '&type=city&method=exact&fields=id,state,stateid,flname,alias&filters=state%3A' + state : 'https://suggest.imimg.com/suggest/suggest.php?q=' + city + '&limit=' + limit + '&type=city&method=exact&fields=id,state,stateid,flname,alias',
        cache: false,
        success: function success(response) {
          return JSON.parse(response);
        },
        timeout: 3000
      });
      resolve(res);
    });
  },
  getMiniPdpData: function getMiniPdpData(displayId) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/miniproddetail.php?displayId=' + displayId, data, 8000, false);
  },
  getRecentSearchData: function getRecentSearchData(vid) {
    var data = {
      vid: vid
    };
    return $.ajax({
      url: 'https://suggest.imimg.com/suggest/suggest_pdm.php/?storage=ims' + '&vid=v' + vid + '&gid=g' + Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      cache: false,
      success: function success(response) {
        return JSON.parse(response);
      },
      timeout: 3000
    });
  },
  getcitySearchData: function getcitySearchData(q) {
    var data = {
      q: q
    };
    return makeRequest('POST', '/ajaxrequest/search/isearch.php/getcitydata/', data);
  },
  getTendersStateData: function getTendersStateData() {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/getTendersStateData', data);
  },
  getTendersStateAuthorityData: function getTendersStateAuthorityData(data) {
    return makeRequest('GET', '/ajaxrequest/getTendersStateAuthorityData', data);
  },
  getTendersStateIndustryData: function getTendersStateIndustryData(data) {
    return makeRequest('GET', '/ajaxrequest/getTendersStateIndustryData', data);
  },
  getTendersStateIndustryNoticeData: function getTendersStateIndustryNoticeData(grpid, stateid) {
    return makeRequest('GET', '/ajaxrequest/getTendersStateIndustryNoticeData?grpid=' + grpid + '&stateid=' + stateid, {});
  },
  saveSearchData: function saveSearchData(q, vid) {
    var data = {
      q: q,
      vid: vid
    };
    return $.ajax({
      url: 'https://suggest.imimg.com/suggest/suggest_pdm.php?searches=' + q + '&vid=v' + vid + '&gid=g' + Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid') + '&type=recent&dName=m.indiamart.com&_=1522756616337',
      cache: false,
      success: function success(response) {
        return JSON.parse(response);
      },
      timeout: 3000
    });
  },
  getUserDetVal: function getUserDetVal() {
    var locpref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    this.getDetailOfUser(Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid')).then(function (res) {
      locpref = locpref == "" ? res.glusr_usr_loc_pref : locpref;
      var str = "loc_pref=" + locpref + "|city=" + res.glusr_usr_city + "|state=" + res.glusr_usr_state;
      Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["setCookie"])('userDet', str, 0.08, 'm.indiamart.com');

      if (document.getElementById(locpref)) {
        document.getElementById(locpref).classList.remove("rectangleBorder");
        document.getElementById(locpref).classList.add("selected");
      }

      return locpref;
    });
  },
  setBlLocation: function setBlLocation(glid, prefType, ip, ipCountry) {
    var data = {
      "VALIDATION_KEY": '3245abd21ccaf37b137062f7ccc81269',
      "UPDATEDBY": 'User',
      "UPDATEDUSING": 'IMOB',
      "USR_ID": glid,
      "LOC_PREF": prefType,
      "LOC_PREF_SET_BY": -1,
      "IP": ip,
      "IP_COUNTRY": ipCountry
    };
    return makeRequest('POST', '/ajaxrequest/widgets/setLocation', data, '', false);
  },
  getShortUrl: function getShortUrl(q) {
    var data = {
      longDynamicLink: q
    };
    return makeRequest('POST', 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyDwH7xmkEqtPfWP_z5x056EG3GiPOOWg34', data, '', false);
  },
  getDecodedResponse: function getDecodedResponse(q) {
    var data = {};
    return makeRequest('GET', 'https://m.indiamart.com/decipher_pwa/?res=' + q, data);
  },
  buyLeadpurchase: function buyLeadpurchase(ofr_id, type, bl_pos, bl_pos_url, purMode, mapped_mcat_id, grid_val) {
    var data = {},
        lat = '',
        _long = '',
        acc = '';
    var strg = "offer_id=" + ofr_id + "&pur_mode=" + purMode;
    strg = strg + "&bl_pos=" + bl_pos + "&bl_pos_url=" + bl_pos_url + "&type=" + type;

    if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookie"])("GeoLoc")) {
      lat = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('GeoLoc', 'lt');
      _long = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('GeoLoc', 'lg');
      acc = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('GeoLoc', 'acc');
    }

    mapped_mcat_id && (null != mapped_mcat_id || mapped_mcat_id != "") && (strg = strg + "&mapped_mcat_id=" + mapped_mcat_id);
    grid_val && (null != grid_val || grid_val != "") && (strg = strg + "&grid_val=" + encodeURIComponent(grid_val));
    if (lat && _long && acc) strg = strg + "&lt=" + lat + "&lg=" + _long + "&acc=" + acc;
    return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/purchase?' + strg, data);
  },
  getcredits: function getcredits() {
    var glid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
    var data = {
      'glusrid': glid,
      'token': 'imobile@15061981',
      'modid': 'IMOB'
    };
    return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/getcredits/', data);
  },
  imsearch: function imsearch(qs, len, type, start, city, price, biz) {
    var src = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
    var auth = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : '';
    var catId = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : '';
    var mcatId = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : '';
    var skipContext = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;
    var useML = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : 1;
    var cqid = arguments.length > 13 ? arguments[13] : undefined;
    var countryiso = arguments.length > 14 ? arguments[14] : undefined;
    var prdsrc = arguments.length > 15 && arguments[15] !== undefined ? arguments[15] : false;
    var GeoLocCookie = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookie"])("GeoLoc");
    var latLong = GeoLocCookie ? Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('GeoLoc', 'lt') + "," + Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('GeoLoc', 'lg') : "";
    latLong = latLong == "," || !GeoLocCookie ? "" : '&latlong=' + latLong;
    var data = {};
    var authObject = {
      glusrid: '',
      ak: ''
    };
    var countrycode = countryiso ? "&countryiso=" + countryiso : '';
    var voiceLng = '';

    if (localStorage && localStorage.getItem('lang')) {
      voiceLng = JSON.parse(localStorage.getItem('lang'))[1].split('-')[0];
      voiceLng = '&voice=' + voiceLng;
    }

    var query;

    try {
      query = decodeURI(qs);
    } catch (error) {
      qs = encodeURI(unescape(unescape(qs)));
    }

    qs = qs.replace(/&/g, '%26');
    window.searchAPITime = Date.now(); //to be synced with cookie val change ======

    var lang = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookie"])("lang") == "1" ? "hi" : "en"; //=================

    var authUrl = '';

    if (auth == 1) {
      authObject.glusrid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
      authUrl = '&glusrid=' + authObject.glusrid;
    }

    var city_only = window.location.search.includes("city_only") ? '&city_only=true' : '';
    var city_source = window.location.search.includes("source") ? '&source=citysuggester' : '';
    var contextParams = (catId ? '&catid=' + catId : '') + (mcatId ? '&mcatid=' + mcatId : '') + (catId ? '&skip_context=' + skipContext : '');
    var country_values = '';

    if (window.location.search.includes("country_code")) {
      var countryValue = window.location.search.split('&');
      countryValue.forEach(function (element) {
        if (element.includes('country_name')) {
          country_values += '&country_name=' + element.split('=')[1];
        } else if (element.includes('country_code')) {
          country_values += '&country_code=' + element.split('=')[1];
        }
      });
    }

    var prdsrcArg = '';

    if (prdsrc) {
      prdsrcArg = '&prdsrc=1';
    }

    if (start <= 14 && !qs.match(/near\s+me\s*$|near\s+to\s+me\s*/)) {
      return makeRequest('GET', '/ajaxrequest/search/search?s=' + qs + '&start=' + start + '&citydata=' + city + '&cqid=' + cqid + '&only_price_products=' + price + '&useML=' + useML + '&biztype_data=' + biz + contextParams + '&src=' + src + '&preflang=' + lang + city_only + country_values + voiceLng + authUrl + countrycode + prdsrcArg + city_source, data, 8000, false);
    } else {
      return makeRequest('GET', '/ajaxrequest/identified/search?s=' + qs + '&start=' + start + '&citydata=' + city + '&cqid=' + cqid + '&only_price_products=' + price + '&useML=' + useML + '&biztype_data=' + biz + contextParams + '&src=' + src + '&preflang=' + lang + city_only + country_values + voiceLng + authUrl + countrycode + prdsrcArg + city_source, data, 8000, false);
    }
  },
  getEngagementData: function getEngagementData(displayIdArray) {
    displayIdArray = displayIdArray.join(",");
    return makeRequest('POST', '/ajaxrequest/identified/search/EngagementData', {
      data: displayIdArray
    });
  },
  findCityWithLatLong: function findCityWithLatLong(lat, _long2) {
    var data = {
      'token': 'imartenquiryprovider',
      'S_lat': lat,
      'S_long': _long2,
      'GET_CITY': 'Y',
      'modid': 'IMOB'
    };
    return makeRequest('POST', '/ajaxrequest/identified/search/CityFromLatLong/', data);
  },
  getNIQuestions: function getNIQuestions() {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/identified/niQuestions', data);
  },
  getNIUnits: function getNIUnits(mcatid) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/identified/niQuestionsUnit?mcatid=' + mcatid, data, 10000, false);
  },
  blMarkfav: function blMarkfav(flag, OFR_ID, MCAT_ID, source, expiredStatus) {
    var data = {
      'OP_FLAG': flag,
      'S_USR_ID': glid,
      'OFR_ID': OFR_ID,
      'MCAT_ID': MCAT_ID,
      'MOD_ID': 'IMOB',
      'UPDATEDBY': glid,
      'UPDATED_USING': glid,
      'VALIDATION_KEY': 'e27d039e38ae7b3d439e8d1fe870fc68',
      'token': 'imobile1@15061981',
      'IS_EXPIRE': 0,
      'SOURCE': source,
      'STATUS': 1
    };

    if (expiredStatus && expiredStatus == 'E') {
      data['IS_EXPIRE'] = 1;
    }

    return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/markfav', data);
  },
  getproducts: function getproducts(modid, mcats, count) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/widgets/products?modid=' + modid + '&mcats=' + mcats + '&count=' + count, data, 8000, false);
  },
  getrecentsearches: function getrecentsearches(glid, logdate) {
    var data = {
      "glid": glid,
      "logdate": logdate
    };
    return makeRequest('POST', '/ajaxrequest/identified/widgets/recentsearches/', data, 8000);
  },
  saveSearchFeedback: function saveSearchFeedback(searchParams) {
    var disp_Id = document.querySelectorAll('[id^="dispid"]');
    var did = "";
    var tot_dispId = disp_Id.length > 5 ? 5 : disp_Id.length;

    for (var i = 0; i < tot_dispId; i++) {
      did += disp_Id[i].id.replace("dispid", "") + ",";
    }

    did = did.slice(0, -1);
    var data = {
      "SEARCH_QUERY": searchParams.SEARCH_QUERY,
      "SEARCH_TOP_RESULTS": searchParams.SEARCH_TOP_RESULTS,
      "SEARCH_PAGE_NO": searchParams.SEARCH_PAGE_NO,
      "SEARCH_VAL": searchParams.SEARCH_VAL,
      "COOKIE": searchParams.COOKIE,
      "SEARCH_URL": searchParams.SEARCH_URL,
      "SEARCH_MOBILE": searchParams.SEARCH_MOBILE,
      "FEEDBACK_FLAG": 'IMSEARCH_FEEDBACK',
      "SEARCH_SOURCE": 'sm',
      "VALIDATION_KEY": '5cca91f15b8c8ddd91c0fc7abfebc0c7',
      "SEARCH_TOTAL_RESULTS": searchParams.SEARCH_TOTAL_RESULTS
    };
    var body = {};

    if (data.SEARCH_VAL !== null || data.SEARCH_VAL !== undefined) {
      return makeRequest('GET', 'https://m.indiamart.com/searchFeedback.php?ss=' + data.SEARCH_QUERY + '&val=' + data.SEARCH_VAL + '&mob=' + data.SEARCH_MOBILE + '&did=' + did + '&tot_res=' + data.SEARCH_TOTAL_RESULTS + '&pg=' + data.SEARCH_PAGE_NO + '&cookie=' + data.COOKIE, body);
    }
  },
  getDisplayInvoiceBanner: function getDisplayInvoiceBanner(glid) {
    var data = {
      "privacy_settings": new Array({
        'flag': '2'
      }),
      "mod_id": 'IMOB',
      "token": 'imobile@15061981',
      "glusrid": glid
    };
    return makeRequest('POST', '/ajaxrequest/bl/home/invoiceBanner/', data, 3000);
  },
  updateUserProfile: function updateUserProfile(info) {
    if (!Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip') || !Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm')) {
      _Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["gaTrack"].trackEvent(["Sell on Indiamart", "Iploc not created", "Iploc", 0, true]);
    }

    var data = {};
    data['USR_ID'] = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
    data['MOBILE_COUNTRY'] = '+91'; //  data['VALIDATION_KEY'] = 'e27d039e38ae7b3d439e8d1fe870fc68'; // mapi validation key

    data['VALIDATION_KEY'] = 'c44e794a7318ba715530cf81297e2071'; // intermesh validation key

    data['MODID'] = 'IMOB';
    data['UPDATEDBY'] = 'User';
    data['UPDATEDUSING'] = 'Sell on Indiamart at Mobile Site';
    data['IP'] = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip');
    data['IP_COUNTRY'] = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm');
    if (info.email) data['EMAIL'] = info.email;
    if (info.name) data['NAME'] = info.name;

    if (info.companyname) {
      var str = info.companyname;
      var res = str.replace(['"', ',', ';', '<', '>', '+'], " ");
      data['COMPANYNAME'] = res;
    }

    if (info.address) data['ADD1'] = info.address;

    if (info.type == "address") {
      data['TYPE'] = "address";
      data['ADD2'] = info.locality;
    }

    if (info.city) data['CITY'] = info.city;
    if (info.cityid) data['FK_GL_CITY_ID'] = info.cityid;

    if (info.state) {
      data['STATE'] = info.state;
      if (info.stateid) data['FK_GL_STATE_ID'] = info.stateid;
    }

    if (info.ZIP) data['zip'] = info.ZIP;

    if (info.doNotList) {
      data['ENABLE_MODIFY_STATUS'] = 1;
      data['MODIFYSTATUS'] = 'T';
      data['HIST_COMMENTS'] = 'The user had previously disabled his account with the reason: "user do not want to be listed". But the user logged into SellonIM recently, hence sending for gluser approval.';
    }

    return makeRequest('POST', "/ajaxrequest/identified/soi/seller/user/update".concat(info.curr_screen ? info.curr_screen : '', "/"), data);
  },
  AddProduct: function AddProduct(pname1, pname2, pname3) {
    var data = {};
    var ip = '';

    if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookie"])("iploc")) {
      var countryiso = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcniso'); //if (countryiso == 'IN') {

      ip = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcniso'); // }
      // else {
      //     ip = decodeURIComponent(gblFunc.getCookie("iploc")).split('|')[3].split("=")[1];
      // }
    }

    data['gluserid'] = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
    data['ip_country'] = '+91';
    data['ip'] = ip;
    data['token'] = 'addandroidproduct@02021980';
    data['updated_screen'] = 'IMOB';
    data['UPDATEDBY'] = 'User';
    data['action'] = 'add_product';
    data['product1'] = pname1;
    data['product2'] = pname2;
    data['product3'] = pname3;
    data['user_updatedusing'] = 'Sell on Indiamart at Mobile Site';
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/product/add/', data);
  },
  userReautheticate: function userReautheticate() {
    var iso = '';
    var user_name = '';
    var countryiso = '';
    var ip = '';

    if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookie"])("iploc")) {
      var _countryiso = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcniso'); //if (countryiso == 'IN') {


      var _ip = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'); // }
      // else {
      //     let ip = decodeURIComponent(gblFunc.getCookie("iploc")).split('|')[3].split("=")[1];
      // }

    }

    var cookiesImeshVisitor = Object(_Globals_MainFunctions__WEBPACK_IMPORTED_MODULE_2__["checkUserStatus"])();

    if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'iso') != '') {
      iso = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'iso');
    } else {
      iso = countryiso;
    }

    var cookie_ar = {};

    if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'em') && iso != 'IN' && profile == NULL) {
      user_name = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'em');
    }

    if (cookiesImeshVisitor > 0 && user_name == '') {
      if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'em') && iso != 'IN') {
        user_name = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'em');
      } else if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'mb1')) {
        user_name = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'mb1');
      }
    }

    var im_iss_obj = {};

    if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookie"])('im_iss')) {
      var arr = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookie"])('im_iss').split('=');
      im_iss_obj[arr[0]] = arr[1];
    }

    var datacookie = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookie"])("ImeshVisitor", 'object');
    var logincookie = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookie"])("v4iilex", 'object');
    var data = {
      "username": user_name,
      "modid": 'IMOB',
      "ip": ip,
      "format": 'JSON',
      "reauth": 0,
      "iso": iso,
      'glusr_usr_ip': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip') ? Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip') : '',
      "cookie": {
        'DataCookie': datacookie,
        'LoginCookie': logincookie,
        'im_iss': im_iss_obj
      }
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/user/reauthenticate', data);
  },
  getcitySellerData: function getcitySellerData(q) {
    var data = {
      "q": q,
      "minStringLengthToFetchSuggestion": 1,
      "type": "city",
      "fields": "state,id,stateid",
      "minStringLengthToDisplaySuggestion": 1,
      "displaySeparator": " >> ",
      "displayFields": "value,state",
      "filters": "iso:IN",
      "recentData": "false",
      "updateCache": "false"
    };
    var url = 'https://suggest.imimg.com/suggest/suggest.php/?q=' + data.q + '&limit=20&type=city&minStringLengthToFetchSuggestion=' + data.minStringLengthToFetchSuggestion + '&updateCache=' + data.updateCache + '&fields=' + data.fields + '&minStringLengthToDisplaySuggestion=' + data.minStringLengthToDisplaySuggestion + '&display_fields=' + data.displayFields + '&displaySeparator=' + data.displaySeparator + '&recentData=' + data.recentData + '&filters=' + data.filters;
    return new Promise(function (resolve, reject) {
      var a = fetch(url, {
        method: 'GET'
      }).then(function (response) {
        return response.json();
      } // if the response is a JSON object
      ).then(function (success) {
        return success;
      } // Handle the success response object
      )["catch"](function (error) {
        return error;
      } // Handle the error response object
      );
      resolve(a);
    }); // return makeRequest('POST', '/ajaxrequest/identified/soi/seller/getcitydata', data);
  },
  getDetailOfUser: function getDetailOfUser(glid) {
    var data = {
      glid: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid')
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/info/', data);
  },
  verificationBlocker: function verificationBlocker(glid) {
    var data = {
      glid: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid')
    };
    return makeRequest('POST', '/ajaxrequest/identified/verification/verificationBlocker', data);
  },
  hotLeads: function hotLeads(name, companyname, email, mobile) {
    var data = {
      "name": name,
      "mobile": mobile,
      "companyname": companyname,
      "email": email,
      "USR_ID": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      "MOBILE_COUNTRY": '+91',
      "validation_key": '3245abd21ccaf37b137062f7ccc81269',
      "MODID": 'IMOB',
      "UPDATEDBY": 'User',
      "UPDATEDUSING": 'Sell on Indiamart at Mobile Site',
      'IP_COUNTRY': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm'),
      'IP': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      'GEOIP_COUNTRY_ISO': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcniso')
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/hotleads/', data);
  },
  fetchProductsCount: function fetchProductsCount() {
    var data = {};
    var fobFilter = '';
    return makeRequest('GET', '/ajaxrequest/identified/products/myprdlist?start=0&end=3' + '&product_filter=' + fobFilter, data);
  },
  fetchMessages: function fetchMessages(glusrid, start, end, count, chkuser, lastContactDate) {
    var data = {
      "glusrid": glusrid,
      "start": start,
      "lastContactDate": lastContactDate,
      "end": end,
      "count": count,
      "modid": 'IMOB'
    };
    return makeRequest('POST', '/ajaxrequest/identified/messagecenter/fetchMessages_' + chkuser + '/', data);
  },
  fetchContactdetails: function fetchContactdetails(glusrid, contactglid, flag, chkuser, contact_year) {
    var data = {
      "glusrid": glusrid,
      "contactglid": contactglid,
      "flag": flag,
      "contact_year": contact_year
    };
    return makeRequest('POST', '/ajaxrequest/identified/messagecenter/fetchContDetails_' + chkuser + '/', data);
  },
  fetchMsgdetail: function fetchMsgdetail(user_glid, contact_glid, start, end, modid, morerows, chkuser) {
    var data = {
      "user_glid": user_glid,
      "contact_glid": contact_glid,
      "start": start,
      "end": end,
      "modid": modid,
      "morerows": morerows
    };
    return makeRequest('POST', '/ajaxrequest/identified/messagecenter/fetchMsgdetail_' + chkuser + '/', data);
  },
  fetchMBRlist: function fetchMBRlist(glusrId, glid) {
    var data = {
      "glusrId": glid
    };
    return makeRequest('POST', '/ajaxrequest/identified/mbr/fetchMBRlist/', data);
  },
  fetchDetailsMBR: function fetchDetailsMBR(inpdata) {
    var data = {
      "inpdata": inpdata
    };
    return makeRequest('POST', '/ajaxrequest/identified/mbr/fetchDetailsMBR/', data);
  },
  deleteMBR: function deleteMBR(inpdata) {
    var data = {
      "inpdata": inpdata,
      "fname": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'fn'),
      "glid": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      'IP': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      'IP_COUNTRYName': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm'),
      'type': inpdata.type
    };
    return makeRequest('POST', '/ajaxrequest/identified/mbr/delete_offer/', data);
  },
  getSoiDropOff: function getSoiDropOff(listingsource) {
    var data = {
      "glusrid": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      "mobile": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'mb1'),
      "modid": 'IMOB',
      "listing_source": listingsource,
      "validation_key": 'c44e794a7318ba715530cf81297e2071'
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/soidropoff/', data);
  },
  soiUserLogs: function soiUserLogs(pageevent, flag, usertype) {
    var data = {
      "gluserid": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      "usertype": usertype,
      "pageevent": pageevent,
      "flag": flag
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/soiuserlogs/', data);
  },
  getGSTIN: function getGSTIN() {
    var glid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (glid == '') {
      glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
    }

    var data = {
      glusrid: glid
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/getgst/', data);
  },
  addGST: function addGST(gst) {
    var data = {
      type: 'CompRgst',
      VALIDATION_KEY: '3245abd21ccaf37b137062f7ccc81269',
      glusridval: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      GST: gst,
      updatedbyId: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      updatedby: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'fn') ? Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'fn') : 'User',
      updatedbyScreen: "businessprofile-IMOB",
      userIp: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      userIpCoun: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm')
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/addGST/', data);
  },
  fetchBlsforMcat: function fetchBlsforMcat(end, mcatname) {
    var data = {
      'start': end + 1,
      'end': end + 20,
      'flname': mcatname
    };
    return makeRequest('POST', '/ajaxrequest/identified/buyleads/bl/fetchMcatBls', data);
  },
  fetchSubGroupBuyleads: function fetchSubGroupBuyleads(end, group_name, sub_group_name) {
    return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/fetchSubGroupBls?start=' + (end + 1) + '&end=' + (end + 10) + '&grpname=' + sub_group_name + '&parentgrpname=' + group_name);
  },
  fetchSubCategoryBuyleads: function fetchSubCategoryBuyleads(category_name) {
    return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/fetchchSubCatBls?category_name=' + category_name);
  },
  fetchBuyleadsforBlTender: function fetchBuyleadsforBlTender(searchKwd, start, end, blNearCity) {
    if (end) {
      return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/search?q=' + searchKwd + '&start=' + start + '&rows=' + (start + end) + '&src=tenderSearch&blNearCity=' + blNearCity);
    } else {
      return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/search?q=' + searchKwd + '&start=' + start + '&rows=' + (start + 10) + '&src=tenderSearch&blNearCity=' + blNearCity);
    }
  },
  fetchBuyleadsforBlTenderFilter: function fetchBuyleadsforBlTenderFilter(searchParam, end) {
    var blAuthority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var blState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var blCity = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    var blCategory = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
    var searchSrc = arguments.length > 6 ? arguments[6] : undefined;
    return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/tender?source=' + searchSrc + '&q=' + searchParam + '&start=' + end + '&rows=' + (end + 10) + '&blAuthority=' + blAuthority + '&blState=' + blState + '&blCity=' + blCity + '&blCategory=' + blCategory, '', 8000, true);
  },
  fetchBuyleadsforBlsearch: function fetchBuyleadsforBlsearch(searchKwd, end) {
    var blCountry = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var blState = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var blCity = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    var blNearCity = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';
    var blCategory = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : '';
    var LocPref = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : '';
    var src = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : '';
    src == '' ? src = 'BlSearch' : '';
    return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/search?q=' + searchKwd + '&start=' + end + '&rows=' + (end + 10) + '&blCountry=' + blCountry + '&blState=' + blState + '&blCity=' + blCity + '&blNearCity=' + blNearCity + '&blCategory=' + blCategory + '&LocPref=' + LocPref + '&src=' + src);
  },
  fetchRelatedBuyleads: function fetchRelatedBuyleads() {
    var offer_id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var mcat_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var bl_city_id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var bl_state_id = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    var bl_iso = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
    // let user_city_id = (getCookieValByKey('iploc', 'gctid')) ? getCookieValByKey('iploc', 'gctid') : '';
    // let user_iso = getCookieValByKey('iploc', 'gcniso');
    // return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/relatedbl?' + 'offer_id=' + offer_id + '&mcat_id=' + mcat_id + '&bl_city_id=' + bl_city_id + '&bl_state_id=' + bl_state_id + '&bl_iso=' + bl_iso + '&user_city_id=' + user_city_id + '&user_iso=' + user_iso);
    var isBot = /googlebot|mediapartners|bingbot|slurp|crawler|spider|BomboraBot|PiplBot|mappydata|Quantcastbot|Clickagy|LinkisBot/i.test(navigator.userAgent);

    if (isBot) {
      return makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/relatedbl?' + 'offer_id=' + offer_id + '&mcat_id=' + mcat_id + '&bl_city_id=' + bl_city_id + '&bl_state_id=' + bl_state_id + '&bl_iso=' + bl_iso);
    } else {
      var promise = new Promise(function (resolve, reject) {
        var i = 0;
        var interval = setInterval(function () {
          if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gctid') && i < 10) {
            var user_city_id = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gctid') ? Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gctid') : '';
            var user_iso = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcniso');
            clearInterval(interval);
            resolve(makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/relatedbl?' + 'offer_id=' + offer_id + '&mcat_id=' + mcat_id + '&bl_city_id=' + bl_city_id + '&bl_state_id=' + bl_state_id + '&bl_iso=' + bl_iso + '&user_city_id=' + user_city_id + '&user_iso=' + user_iso));
          } else if (i > 10) {
            clearInterval(interval);
            resolve(makeRequest('GET', '/ajaxrequest/identified/buyleads/bl/relatedbl?' + 'offer_id=' + offer_id + '&mcat_id=' + mcat_id + '&bl_city_id=' + bl_city_id + '&bl_state_id=' + bl_state_id + '&bl_iso=' + bl_iso));
          }

          i++;
        }, 250);
      });
      return promise;
    }
  },
  markNotInterested: function markNotInterested(offer, comment, reasonId, mcatid, srchTxt, offerType, blPageLoc, blpos, grid_val, bl_proforma_keyPresent) //to be handled..
  {
    var blposStr = blpos.toString();
    blposStr = Number(blposStr) + 1;
    blposStr = blposStr.toString();
    var str = "";
    var data = {};
    blPageLoc = blPageLoc.replace(/\=/g, '5');
    blPageLoc = blPageLoc.replace(/\#/g, '6');
    var status = bl_proforma_keyPresent && bl_proforma_keyPresent == 1 ? "&status=2" : ""; //if(unit || unit ==""){

    str = "/ajaxrequest/identified/buyleads/bl/notinterested?offer=" + offer + "&ni_type=" + offerType + "&ni_tender=" + "&reject_reason_offer=" + reasonId + "&reject_reason_tender=" + "&reject_comment=" + comment + '&mcatid=' + mcatid + '&searchTxt=' + srchTxt + '&blPageLoc=' + blPageLoc + status;
    blposStr && (null != blposStr || blposStr != "") && (str = str + "&serial=" + blposStr);
    grid_val && (null != grid_val || grid_val != "") && (str = str + "&grid_val=" + encodeURIComponent(grid_val)); //}else{
    //    str="/ajaxrequest/identified/buyleads/bl/notinterested?offer=" + offer + "&ni_type=" + offerType + "&ni_tender=" + "&reject_reason_offer=" + reasonId + "&QTY=" + comment +"&QTY_UNIT="+unit+'&mcatid='+mcatid + '&SRCH_TEXT='+srchTxt + '&blPageLoc='+blPageLoc
    // }

    return makeRequest('GET', str, data);
  },
  getpremium: function getpremium(glid, ga, mode) {
    var data = {
      "glusrid": glid,
      "ga": ga,
      "mode": mode
    };
    return makeRequest('POST', '/ajaxrequest/identified/widgets/premium/', data, 8000);
  },
  getrelatedmcat: function getrelatedmcat(MCAT_ID) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/widgets/relatedMcat?MCAT_ID=' + MCAT_ID, data, 8000, false);
  },
  addIec: function addIec(iec) {
    var data = {
      type: 'CompRgst',
      VALIDATION_KEY: '3245abd21ccaf37b137062f7ccc81269',
      glusridval: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      IEC: iec,
      updatedbyId: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      updatedby: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'fn') ? Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'fn') : 'User',
      updatedbyScreen: "Seller Foreign BuyLead Purchase",
      userIp: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      userIpCoun: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm')
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/seller/addIec/', data);
  },
  //hsingh
  getrelatedproducts: function getrelatedproducts(mcatid) {
    var CITY_ID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var prod = arguments.length > 2 ? arguments[2] : undefined;
    var data = {};
    return makeRequest('GET', '/ajaxrequest/widgets/relatedproducts?MCAT_ID=' + mcatid + '&city=' + CITY_ID + '&prod_count=' + prod, data, 8000, false);
  },
  getmorerelatedproducts: function getmorerelatedproducts(mcatid) {
    var CITY_ID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var prod = arguments.length > 2 ? arguments[2] : undefined;
    var edisplayID = arguments.length > 3 ? arguments[3] : undefined;
    var data = {};
    return makeRequest('GET', '/ajaxrequest/widgets/moreproductsrelated?MCAT_ID=' + mcatid + '&city=' + CITY_ID + '&prod_count=' + prod + '&edisplayID=' + edisplayID, data, 8000, false);
  },
  getsellernearme: function getsellernearme(mcatid) {
    var CITY_ID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var prod = arguments.length > 2 ? arguments[2] : undefined;
    var edisplayID = arguments.length > 3 ? arguments[3] : undefined;
    var data = {};
    return makeRequest('GET', '/ajaxrequest/widgets/sellernearme?MCAT_ID=' + mcatid + '&city=' + CITY_ID + '&prod_count=' + prod + '&edisplayID=' + edisplayID, data, 8000, false);
  },
  getrecentrelatedmcats: function getrecentrelatedmcats(mcats) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/widgets/recentrelatedmcat?mcats=' + mcats, data, 8000, false);
  },
  getrecentData: function getrecentData(glusrid, gid) {
    var userModeN = Object(_Globals_MainFunctions__WEBPACK_IMPORTED_MODULE_2__["checkUserStatus"])();

    if (userModeN == '0') {
      var data = {
        "gid": gid,
        "mode": '1'
      };
    } else if (userModeN == '1') {
      var data = {
        "gid": gid,
        "glid": glusrid,
        "mode": '2'
      };
    } else if (userModeN == '2') {
      var data = {
        "glid": glusrid,
        "mode": '3'
      };
    }

    return makeRequest('POST', '/ajaxrequest/identified/widgets/recentData/', data, 8000);
  },
  getcitymcats: function getcitymcats(glusrid, count) {
    var data = {
      "glusrid": glusrid,
      "count": count,
      "cid": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gctid') ? Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gctid') : ''
    };
    return makeRequest('POST', '/ajaxrequest/identified/widgets/cityMcats/', data, 8000, false);
  },
  getrecommendedidentified: function getrecommendedidentified(glid, logdate) {
    var data = {
      "glusrid": glid,
      "date": logdate
    };
    return makeRequest('POST', '/ajaxrequest/identified/widgets/recommendedmcatidentified/', data, 8000);
  },
  uploadImage: function uploadImage(formData, imgType) {
    var usr_name = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'fn');
    usr_name = usr_name ? usr_name : "IMUser";

    if (usr_name.length > 9) {
      usr_name = usr_name.substring(0, 8);
    }

    formData.append('MODID', 'IMOB');
    formData.append('IMAGE_TYPE', imgType);
    formData.append('USR_ID', Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'));
    formData.append('UPLOADED_BY', usr_name);
    formData.append('VALIDATION_KEY', Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('im_iss', 't'));
    var url;

    if (location.hostname == 'm.indiamart.com') {
      url = 'https://uploading.imimg.com/uploadimage';
    } else {
      url = 'https://stg-uploading.imimg.com/uploadimage';
    }

    return new Promise(function (resolve, reject) {
      var a = fetch(url, {
        method: 'POST',
        body: formData
      }).then(function (response) {
        return response.json();
      } // if the response is a JSON object
      ).then(function (success) {
        return success;
      } // Handle the success response object
      )["catch"](function (error) {
        return error;
      } // Handle the error response object
      );
      resolve(a);
    });
  },
  getAddressDetails: function getAddressDetails() {
    return makeRequest('GET', '/ajaxrequest/identified/soi/seller/user/address?lt=' + Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('GeoLoc', 'lt') + '&lg=' + Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('GeoLoc', 'lg'), 3000);
  },
  verifyDetail: function verifyDetail(id) {
    var data = {
      id: id
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/verifyDetail/', data);
  },
  verifyEmailWithoutOtp: function verifyEmailWithoutOtp(email) {
    var data = {
      "VALIDATION_KEY": "e02a3fab4c6c735015b9b4f4a1eb4e3c",
      "action_flag": "SP_VERIFY_ATTRIBUTE",
      "GLUSR_USR_ID": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      "ATTRIBUTE_ID": "109",
      "ATTRIBUTE_VALUE": email,
      "VERIFIED_BY_ID": "",
      "VERIFIED_BY_NAME": "",
      "VERIFIED_BY_AGENCY": "Mail_Google",
      "VERIFIED_BY_SCREEN": "IMOB_SOI_Personal_Details",
      "VERIFIED_URL": null,
      "VERIFIED_IP": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      "VERIFIED_IP_COUNTRY": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm'),
      "VERIFIED_COMMENTS": "Following Data Has Been Verified Through google gmail Process",
      "VERIFIED_AUTHCODE": null
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/verifyEmailWithoutOtp/', data);
  },
  tncacceptance: function tncacceptance() {
    var data = {
      "USER_AGENT": navigator.userAgent,
      "IP": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      "IP_COUNTRY": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm'),
      "IP_COUNTRY_ISO": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcniso'),
      "USR_ID": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid')
    };
    return makeRequest('POST', '/ajaxrequest/identified/tncacceptance/', data, '', false);
  },
  addGSTDispositions: function addGSTDispositions(gstdata) {
    var data = {
      "GLID": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      "ATTRIBUTE_NAME": gstdata.GL_ATTRIBUTE_NAME,
      "DISPOSITION": gstdata.GL_DISPOSITION,
      "MASTER_ID": gstdata.gl_master_id
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/addGstDisposition/', data, '', false);
  },
  getGSTDispositionsList: function getGSTDispositionsList() {
    var data = {};
    return makeRequest('POST', '/ajaxrequest/identified/soi/getGstDispositionList/', data, '', false);
  },
  getGSTDispositions: function getGSTDispositions() {
    var data = {
      "glid": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid')
    };
    return makeRequest('POST', '/ajaxrequest/identified/soi/getGstDisposition/', data, '', false);
  },
  getstdproducts: function getstdproducts(mcatid, counter) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/widgets/stdproducts?MCAT_ID=' + mcatid + '&Counter=' + counter, data, 8000, false);
  },
  addDBTrackingSOI: function addDBTrackingSOI(dbdata) {
    var data = {
      LOG_ID: dbdata.LOG_ID ? dbdata.LOG_ID : '',
      GLID: dbdata.GLID ? dbdata.GLID : '',
      MOBILE: dbdata.MOBILE ? dbdata.MOBILE : '',
      FCP_STATUS: dbdata.FCP_STATUS ? dbdata.FCP_STATUS + '' : '0',
      CUSTTYPE_ID: dbdata.CUSTTYPE_ID ? dbdata.CUSTTYPE_ID : Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'cmid') ? Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'cmid') : '',
      JOURNEY_COMPLETED: dbdata.JOURNEY_COMPLETED ? dbdata.JOURNEY_COMPLETED : '',
      BEST_TIME_TO_CALL: dbdata.BEST_TIME_TO_CALL ? dbdata.BEST_TIME_TO_CALL : '',
      MODID: dbdata.MODID ? dbdata.MODID : 'IMOB'
    };
    if (dbdata.IS_USR_NAME) data['IS_USR_NAME'] = dbdata.IS_USR_NAME;
    if (dbdata.IS_COMPANYNAME) data['IS_COMPANYNAME'] = dbdata.IS_COMPANYNAME;
    if (dbdata.IS_EMAIL) data['IS_EMAIL'] = dbdata.IS_EMAIL;
    if (dbdata.PROD_CNT) data['PROD_CNT'] = dbdata.PROD_CNT;
    if (dbdata.IS_ADDRESS) data['IS_ADDRESS'] = dbdata.IS_ADDRESS;
    if (dbdata.IS_GST) data['IS_GST'] = dbdata.IS_GST;
    return makeRequest('POST', '/ajaxrequest/identified/soi/soiDbTracking/', data, '', false);
  },
  addC2Ctrack: function addC2Ctrack(inpdata) {
    var email = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'em');
    var data = {
      C2C_MODID: "IMOB",
      C2C_CALLER_GLUSR_ID: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'),
      C2C_CALLER_EMAIL: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'em'),
      C2C_CALLER_NUMBER: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'mb1'),
      C2C_CALLER_IP: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      C2C_CALLER_COUNTRY_ISO: Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'iso'),
      C2C_RECEIVER_GLUSR_ID: inpdata.glusrid,
      C2C_RECEIVER_NUMBER: inpdata.CONTACT_NUMBER,
      C2C_NUMBER_TYPE: inpdata.CONTACT_TYPE == 'PNS' ? 'P' : 'M',
      C2C_REFERER_URL: window.location.href,
      C2C_CALLER_USERAGENT: navigator.userAgent,
      C2C_PAGE_TYPE: inpdata.PageName,
      C2C_SMARTPHONE: 1,
      MODREFID: inpdata.modrefid,
      MODREFNAME: inpdata.modrefname
    };
    return makeRequest('POST', '/ajaxrequest/identified/call/', data, '', false);
  },
  fetchSellerRating: function fetchSellerRating(seller_id, buyer_id) {
    if (buyer_id) {
      return makeRequest('GET', '/ajaxrequest/identified/messages/fetchRatings?input_supplier_id=' + seller_id + '&input_buyer_id=' + buyer_id);
    } else {
      return makeRequest('GET', '/ajaxrequest/identified/messages/fetchAvgRating?input_supplier_id=' + seller_id);
    }
  },
  getInfluParam: function getInfluParam() {
    return makeRequest('GET', '/ajaxrequest/identified/messages/influParam');
  },
  submitUserRating: function submitUserRating(buyer_id, seller_id, rating_val, rating_comments, influ_param, rating_type, ImgOption, bsType, modrefId) {
    var data = {
      'seller_id': seller_id,
      'buyer_id': buyer_id,
      'rating_val': rating_val,
      'IP': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      'IP_COUNTRY': Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm'),
      'rating_comments': rating_comments,
      'influ_param': influ_param,
      'rating_type': rating_type,
      'img_option': ImgOption,
      'BS_RATING_TYPE': bsType,
      'MODREF_ID': modrefId
    };
    return makeRequest('POST', '/ajaxrequest/identified/messages/submitRating/', data);
  },
  fetchAvgRating: function fetchAvgRating(seller_id) {
    return makeRequest('GET', '/ajaxrequest/identified/messages/fetchAvgRating?input_supplier_id=' + seller_id);
  },
  getLastSeen: function getLastSeen(glid) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/identified/messages/userlastseen?glid=' + glid, data, '', false);
  },
  addEditProduct: function addEditProduct(data) {
    var glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
    var proddata = {
      "item_id": data.item_id,
      "pcid": data.pcid,
      "HIST_COMMENTS": "",
      "GLUSR_USR_ID": glid,
      "approval_status": 0,
      "UPDATEDBY_ID": glid,
      "updated_by": glid,
      "remote_host": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      "country_name": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm'),
      "VALIDATION_KEY": "3245abd21ccaf37b137062f7ccc81269",
      "modules": "Mobile Add product screen",
      "referral_url": data.referral_url,
      "script_url": data.script_url
    };
    if (data.param_list) proddata["param_list"] = data.param_list;
    if (data.item_name) proddata["item_name"] = data.item_name;
    if (data.item_description) proddata["item_description"] = data.item_description;

    if (data.in_pc_item_fob_price) {
      proddata["in_pc_item_fob_price"] = data.in_pc_item_fob_price;
      proddata["in_pc_item_fob_price_currency"] = "INR";
    }

    if (data.in_pc_item_min_order_quantity) {
      proddata["in_pc_item_min_order_quantity"] = data.in_pc_item_min_order_quantity;
    }

    if (data.in_pc_item_moq_unit_type) {
      proddata["in_pc_item_moq_unit_type"] = data.in_pc_item_moq_unit_type;
    }

    if (data.cat_id) {
      proddata["cat_id"] = data.cat_id;
    }

    if (data.new_mcat_mapping) {
      proddata["old_mcat_mapping"] = data.old_mcat_mapping;
      proddata["new_mcat_mapping"] = data.new_mcat_mapping;
    }

    if (data.action_flag) {
      proddata["UPDATESCREEN"] = "Seller (Manage Product Screen)";
      proddata["IN_PC_ITEM_IMAGE_UPDATEDBY_ID"] = "";
      proddata["IP"] = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip');
      proddata["IP_COUNTRY"] = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm');
      proddata["ACTION"] = data.ACTION;
      proddata["action_flag"] = "image";
      proddata["IN_PC_ITEM_IMAGE_ID"] = data.IN_PC_ITEM_IMAGE_ID;
      proddata["IN_PC_ITEM_IMAGE_ORIG_WIDTH"] = data.IN_PC_ITEM_IMAGE_ORIG_WIDTH;
      proddata["IN_PC_ITEM_IMAGE_ORIG_HEIGHT"] = data.IN_PC_ITEM_IMAGE_ORIG_HEIGHT;
      proddata["IN_PC_ITEM_IMAGE_125X125_WD"] = data.IN_PC_ITEM_IMAGE_125X125_WD;
      proddata["IN_PC_ITEM_IMAGE_125X125_HT"] = data.IN_PC_ITEM_IMAGE_125X125_HT;
      proddata["IN_PC_ITEM_IMAGE_250X250_WD"] = data.IN_PC_ITEM_IMAGE_250X250_WD;
      proddata["IN_PC_ITEM_IMAGE_250X250_HT"] = data.IN_PC_ITEM_IMAGE_250X250_HT;
      proddata["IN_PC_ITEM_IMAGE_500X500_WD"] = data.IN_PC_ITEM_IMAGE_500X500_WD;
      proddata["IN_PC_ITEM_IMAGE_500X500_HT"] = data.IN_PC_ITEM_IMAGE_500X500_HT;
      proddata["IN_PC_ITEM_IMAGE_ORIGINAL"] = data.IN_PC_ITEM_IMAGE_ORIGINAL;
      proddata["IN_PC_ITEM_IMAGE_125X125"] = data.IN_PC_ITEM_IMAGE_125X125;
      proddata["IN_PC_ITEM_IMAGE_250X250"] = data.IN_PC_ITEM_IMAGE_250X250;
      proddata["IN_PC_ITEM_IMAGE_500X500"] = data.IN_PC_ITEM_IMAGE_500X500;
    }

    if (data.item_img_original) {
      proddata["item_img_original"] = data.item_img_original, proddata["in_pc_item_img_original_wh"] = data.in_pc_item_img_original_wh, proddata["item_img_small"] = data.item_img_small, proddata["in_pc_item_img_small_wh"] = data.in_pc_item_img_small_wh, proddata["item_img_small_125x125"] = data.item_img_small_125x125, proddata["in_pc_img_small_125x125_wh"] = data.in_pc_img_small_125x125_wh, proddata["item_img_small_500x500"] = data.item_img_small_500x500, proddata["in_pc_img_small_500x500_wh"] = data.in_pc_img_small_500x500_wh;
    } // let proddata  = data;


    return makeRequest('POST', '/ajaxrequest/identified/products/addEditProducts/', proddata, '', false);
  },
  deleteProduct: function deleteProduct(id) {
    var glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
    var proddata = {
      "GLUSR_USR_ID": glid,
      "item_id": id,
      "HISTORY": "",
      "debug_msg": "",
      "err_pos": "",
      "DELETED_BY_ID": "0",
      "DELETED_BY_NAME": "User",
      "UPDATESCREEN": "Mobile Add product screen",
      "IP": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      "IP_COUNTRY": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm'),
      "action_flag": "del",
      "VALIDATION_KEY": "3245abd21ccaf37b137062f7ccc81269"
    };
    return makeRequest('POST', '/ajaxrequest/identified/products/prddelete/', proddata, '', false);
  },
  unitSuggestor: function unitSuggestor(val) {
    return makeRequest('GET', '/ajaxrequest/identified/products/unitSugg?val=' + val, '', false);
  },
  getProductMcats: function getProductMcats(val) {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/identified/products/mcat?val=' + val, data, '', false);
  },
  getNegativeaMcat: function getNegativeaMcat() {
    var data = {};
    return makeRequest('GET', '/ajaxrequest/identified/products/negmcat?glid=' + Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid'), data, '', false);
  },
  suggestedReplies: function suggestedReplies(mlData) {
    var data = {
      'mlData': mlData
    };
    return makeRequest('POST', '/ajaxrequest/identified/messagecenter/suggestiveReply/', data);
  },
  AddProductGroup: function AddProductGroup(grpname) {
    var glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('ImeshVisitor', 'glid');
    var data = {
      "glusr_usr_id": glid,
      "grp_name": grpname,
      "in_last_modified_by": "M",
      "updatedby": "",
      "updatedby_id": "62836",
      "remote_host": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gip'),
      "country_name": Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])('iploc', 'gcnnm'),
      "module": "IMOB",
      "force_grp_name_no_repeate": 1,
      "status": 0,
      "modifystatus": "T",
      "VALIDATION_KEY": "3245abd21ccaf37b137062f7ccc81269",
      "update_col_list": ",glusr_usr_id,grp_name,in_last_modified_by,modifystatus"
    };
    return makeRequest('POST', '/ajaxrequest/identified/products/addGroup/', data, '', false);
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
    }

    console.log(url);
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

/***/ "./src/modules/Buyer/BuyerSettings/settings.js":
/*!*****************************************************!*\
  !*** ./src/modules/Buyer/BuyerSettings/settings.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _Header_components_Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Header/components/Header */ "./src/modules/Header/components/Header.js");



function Settings() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(react__WEBPACK_IMPORTED_MODULE_0__["default"].Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement(_Header_components_Header__WEBPACK_IMPORTED_MODULE_1__["Navbar"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
    style: "display:flex"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", {
    className: "home"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h1", null, "Buyer Settings test"))));
}

/* harmony default export */ __webpack_exports__["default"] = (Settings);

/***/ }),

/***/ "./src/modules/Header/components/Header.js":
/*!*************************************************!*\
  !*** ./src/modules/Header/components/Header.js ***!
  \*************************************************/
/*! exports provided: Navbar, leftnavigation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Navbar", function() { return Navbar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "leftnavigation", function() { return leftnavigation; });
/* harmony import */ var _css_Navbar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/Navbar.css */ "./src/modules/Header/css/Navbar.css");
/* harmony import */ var _css_Navbar_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_Navbar_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_leftnav_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/leftnav.css */ "./src/modules/Header/css/leftnav.css");
/* harmony import */ var _css_leftnav_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_leftnav_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Redux_UserDetails_ud_actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Redux/UserDetails/ud_actions */ "./src/Redux/UserDetails/ud_actions.js");
/* harmony import */ var _Redux_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Redux/store */ "./src/Redux/store.js");
/* harmony import */ var _Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../Globals/CookieManager */ "./src/Globals/CookieManager.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");
/* harmony import */ var _css_Imcropper_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../css/Imcropper.css */ "./src/modules/Header/css/Imcropper.css");
/* harmony import */ var _css_Imcropper_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_css_Imcropper_css__WEBPACK_IMPORTED_MODULE_8__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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










var Navbar = /*#__PURE__*/function (_Component) {
  _inherits(Navbar, _Component);

  var _super = _createSuper(Navbar);

  function Navbar(props) {
    var _this;

    _classCallCheck(this, Navbar);

    _this = _super.call(this, props);
    _this.state = {
      'opt': 3,
      'drp': false
    };
    _this.selecttext = _this.selecttext.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Navbar, [{
    key: "selecttext",
    value: function selecttext(event, ui) {
      if (typeof ui.item.data != 'undefined' && typeof ui.item.data.catid != 'undefined' && ui.item.data.catid != '') {
        $('#hdr_frm').append("<input type='hidden' name='catid' id='catid' value='" + ui.item.data.catid + "' >");
      }

      this.value = ui.item.value;

      if (typeof ui.item.askwdSel != "undefined" && ui.item.askwdSel == 1) {
        if (typeof ui.item.trackid != "undefined") {
          var source_val = ui.item.trackid;
        } else {
          var source_val = "as";
        }

        $("#hdr_frm").append("<input type=\'hidden\' name=\'src\' id=\'src\' value=\'" + source_val + "\' >");
      }

      if (event.keyCode == 13) {
        document.getElementById("btnSearch").click();
      } else if (event.handleObj.origType == "click") {
        document.getElementById("btnSearch").click();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var sugg = new Suggester({
        "element": "search_string",
        "onSelect": this.selecttext,
        "placeholder": "Enter product / service to search",
        "classPlaceholder": "ui-placeholder-input",
        "autocompleteClass": "im-gl-header",
        "module": "IM-HEADER",
        "dispstyle": 2,
        "pagetyp": "bl"
      });
      $("#btnSearch").click(function () {
        sugg.onEnd();
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("header", {
        "class": "headercntrl Hd_pr"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "gl-wrapper h71",
        id: "header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "nwHdr"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "https://www.indiamart.com/",
        "class": "hd_logo Hd_db hdlft Hd_fl"
      }, "IndiaMART"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "hdw hdLk clFix Hd_pr Hd_fl"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "hd_srch Hd_fl",
        id: "hdSrh"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": this.state.drp ? "wrpd3 select-wrapper Hd_pr Hd_fl cpo active" : "wrpd3 select-wrapper Hd_pr Hd_fl cpo",
        onClick: function onClick() {
          _this2.setState({
            "drp": !_this2.state.drp
          }, function () {
            return console.log(_this2.state);
          });
        },
        id: "drpn",
        style: ""
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        id: "hold"
      }, this.state.opt == 1 ? "Products" : this.state.opt == 2 ? "Company" : this.state.opt == 3 ? "Buy Leads" : "Tenders"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "drp Hd_dbn Hd_pa"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "pr",
        "class": this.state.opt == 1 ? "active" : null,
        onClick: function onClick() {
          _this2.setState({
            "opt": 1
          }, function () {
            return console.log(_this2.state);
          });
        }
      }, "Products"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "cp",
        "class": this.state.opt == 2 ? "active" : null,
        onClick: function onClick() {
          _this2.setState({
            "opt": 2
          }, function () {
            return console.log(_this2.state);
          });
        }
      }, "Company"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "bl",
        "class": this.state.opt == 3 ? "active" : null,
        onClick: function onClick() {
          _this2.setState({
            "opt": 3
          }, function () {
            return console.log(_this2.state);
          });
        }
      }, "Buy Leads"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "te",
        "class": this.state.opt == 4 ? "active" : null,
        onClick: function onClick() {
          _this2.setState({
            "opt": 4
          }, function () {
            return console.log(_this2.state);
          });
        }
      }, "Tenders"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("form", {
        name: "searform",
        method: "get",
        onsubmit: "return validator(document.searform);",
        "class": "Hd_pr",
        id: "hdr_frm",
        action: this.state.opt == 1 || this.state.opt == 2 ? "https://dir.indiamart.com/search.mp?" : this.state.opt == 3 ? "https//seller.indiamart.com/bltxn/buyersearch/?" : "https//seller.indiamart.com/tenders/buyersearch/?",
        autocomplete: "off"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "submit",
        id: "btnSearch",
        "class": "hd_srBtn ch_fr Hd_pa cpo",
        value: "Search",
        "data-click": "^search_button|header"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        placeholder: "Enter product / service to search",
        id: "search_string",
        name: "ss",
        "class": "hd_txt ch_fr Hd_fl ui-autocomplete-input ui-autocomplete-loading",
        autocomplete: "off",
        role: "textbox",
        "aria-autocomplete": "list",
        "aria-haspopup": "true",
        style: "width: 356px;"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "Tip vSh1 Hd_pa",
        onclick: "_gaq.push([\"_trackEvent\", \"Voice-Search\" , \"Voice-icon-click\", 0]);langpopup();",
        id: "vSrIco",
        style: "display: none;"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "Tiptext Hd_pa"
      }, "Search by voice")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "https//seller.indiamart.com/blgen/postbl?modid=MY",
        id: "pstBuy",
        "class": "pstBuy Hd_dib ih-pbr ch_post_buy Hd_fl"
      }, "Get Best Price"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "cssmenu1",
        "class": "fr1 headermenu Hd_pr"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "cvdSp",
        style: "display:none"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "lead_manager",
        style: "",
        "class": "head_Icn hdLeadMn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        onclick: "msgwidget();",
        "class": "cpo lmIcn"
      }, "Lead Manager", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "cntmsg lft Hd_pa"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "lead_cen",
        style: "",
        "class": "head_Icn hdLeadMn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        onclick: "leadwidget();",
        "class": "cpo bDlIcn"
      }, "BuyLeads", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "hdNot lft Hd_pa"
      }, "99+"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "prod_cen",
        style: "",
        "class": "head_Icn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "https://seller.indiamart.com/product/manageproducts/",
        "class": "pdIcn"
      }, "Products")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "help-center",
        style: ""
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "https://help.indiamart.com/",
        "class": "h_ic13"
      }, "Help"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "heldrdwn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        "class": "cur_pt"
      }, "Find answers to your queries"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "https://help.indiamart.com/buyer-help/",
        "class": "help-desk hMb15 wli Hd_fl cpo h_ic28 Hd_pr Hd_db"
      }, "For ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("b", null, "Buying")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "https://help.indiamart.com/seller-help/",
        "class": "help-desk hMb15 wli Hd_fl cpo h_ic29 Hd_pr Hd_db"
      }, "For ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("b", null, "Selling")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "https://help.indiamart.com/user-feedback/",
        "class": "clear h_ic30 help-desk Hd_pr Hd_db"
      }, "Share your Feedback"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "https://help.indiamart.com/complaint-registration/",
        "class": "h_ic31 help-desk Hd_pr Hd_db"
      }, "Raise a Complaint"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "cur_pt wAnch h_ic32 Hd_pr Hd_db"
      }, "Email us on", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("b", {
        "class": "Dsp_b Hd_db"
      }, "customercare@indiamart.com")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        id: "cccare",
        "class": "cur_pt wAnch h_ic33 Hd_pr Hd_db"
      }, "Call us at ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("b", null, "096-9696-9696")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "wAnch h_ic35 help-desk cpo Hd_pr Hd_db Hd_db",
        id: "chatwithus",
        onclick: "hd_chtppup();"
      }, "Chat With us"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "https://seller.indiamart.com/academy/",
        "class": "h_ic41 help-desk Hd_pr Hd_db"
      }, "Seller Academy"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "message-center",
        style: "display:none"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "hgtb Hd_pr Hd_bxCt hov_eff last",
        id: "lshead"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        "class": "rmv cpo ico-usr Hd_dib"
      }, "Hi ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "Hd_dib Hd_pr"
      }, Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('ImeshVisitor', 'fn'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "sign-hover-dropdn Hd_dbn wfcp lgn hpre",
        id: "sntid"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "prf-dtl Hd_db prf-dt2 user cur_pt"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "usrnm Hd_db"
      }, Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('ImeshVisitor', 'fn'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        "class": "edtHo h_ic19",
        href: "//seller.indiamart.com/companyprofile/manageprofile/",
        rel: "nofollow"
      }, "View Profile")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "company_profile"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        id: "name_rating"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        id: "seller_comp_name_new"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        id: "seller_rating_new"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "nmbr"
      }, Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('ImeshVisitor', 'mb1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("span", {
        "class": "vrfn",
        id: "us_vrf"
      }, "Verified")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "clFix"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "butls2 Hd_fl slT Hd_pr"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        "class": "ttl cur_pt"
      }, "SELLER TOOLS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "//seller.indiamart.com/messagecentre?h1",
        "class": "ch_my_enq h_ic10",
        rel: "nofollow"
      }, "Lead Manager"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "//seller.indiamart.com/bltxn?pref=relevant",
        "class": "bl_log_link h_ic7",
        rel: "nofollow"
      }, "BuyLeads "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        "class": "h_ic8",
        href: "https://seller.indiamart.com/product/manageproducts/",
        rel: "nofollow"
      }, "Manage Products"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "//seller.indiamart.com/pwim/invoice/whatispwim/?bannerid=cntrlheader",
        "class": "h_ic5"
      }, "Collect Payments"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        "class": "h_ic40",
        href: "https://seller.indiamart.com/academy/",
        rel: "nofollow"
      }, "Seller Academy")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "butls2 Hd_fl blT Hd_pr"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("p", {
        "class": "ttl cur_pt"
      }, "BUYER TOOLS"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        "class": "post_buy_req h_ic2",
        href: "//seller.indiamart.com/blgen/postbl/",
        rel: "nofollow"
      }, "Post Your Requirement "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        "class": "h_ic34",
        href: "//dir.indiamart.com/",
        rel: "nofollow"
      }, "Products/Services Directory"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "//seller.indiamart.com/blgen/postbl/managebl/",
        "class": "h_ic21"
      }, "My Orders"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "hpay clFix"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        "class": "hd-dw-apps butls2 appshd cpo h_ic16 Hd_pr Hd_fl",
        id: "dwnappp"
      }, "Download App"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        href: "//seller.indiamart.com/misc/privacysettings/",
        rel: "nofollow",
        "class": "hdPdn butls2 Hd_fl appshd cpo h_ic11 Hd_pr"
      }, "Settings")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("a", {
        "class": "dfusr cpo",
        id: "selsout",
        onclick: "deleteCookie('v4iilex'); deleteCookie('im_iss');blocked_user();redirect_SB();",
        rel: "nofollow"
      }, "Sign Out"))))))));
    }
  }]);

  return Navbar;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);
var leftnavigation = /*#__PURE__*/function (_Component2) {
  _inherits(leftnavigation, _Component2);

  var _super2 = _createSuper(leftnavigation);

  function leftnavigation(props) {
    var _this3;

    _classCallCheck(this, leftnavigation);

    _this3 = _super2.call(this, props);
    _this3.isEnterPrise = _this3.isEnterPrise.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(leftnavigation, [{
    key: "isEnterPrise",
    value: function isEnterPrise(data) {
      var config1 = {
        method: 'post',
        url: 'https://merp.intermesh.net/index.php/seller/Listing/isEnterprise',
        data: data
      };
      axios(config1).then(function (response) {
        console.log(response);
        var res = {};

        if (response['status'] && response['status'] == 200) {
          res['content'] = response['data']['value'];
          res['error_msg'] = '';
          return res;
        } else {
          res['content'] = response;
          res['error_msg'] = 'Something went wrong. Please try again later.';
          return res;
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var glusr_id = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('ImeshVisitor', 'glid');
      var glusr_is_paid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('ImeshVisitor', 'utyp');
      var empid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('adminiil');
      var glusr_usr_approv = this.props['GLUSR_USR_APPROV'] ? this.props['GLUSR_USR_APPROV'] : '';
      var glusr_disable_reason = this.props['GLUSR_DISABLED_REASON'] && glusr_usr_approv == 'D' ? this.props['GLUSR_DISABLED_REASON'].replace(" ", "_") : '';
      var glusr_lst_Status = this.props['GLUSR_USR_LISTING_STATUS'] ? this.props['GLUSR_USR_LISTING_STATUS'] : '';
      var glusr_custyp_weight = this.props['GLUSR_USR_CUSTTYPE_WEIGHT'] ? this.props['GLUSR_USR_CUSTTYPE_WEIGHT'] : '';
      var glusr_custtype_id = this.props['GLUSR_USR_CUSTTYPE_ID'] ? this.props['GLUSR_USR_CUSTTYPE_ID'] : '';
      var glusr_pns_no = this.props['PNS_NO'] ? this.props['PNS_NO'] : '';
      var u_url = '';
      var fcp_array = [17, 28, 29, 6, 18, 11, 22, 33, 19, 36, 39, 40, 41, 44, 45];
      var vfcp_array = [32, 14, 34, 35, 38, 42, 43, 46, 47];
      var paid_array = [12, 10, 1, 2, 23, 16, 5, 24, 15, 13, 31, 8, 21, 7, 27, 26, 25, 4, 37, 48];
      var newseller_array = [30, 9, 20, ''];
      var is_newseller = 0;
      var is_fcp = 0;
      var is_Vfcp = 0;
      var is_paidSeller = 0;
      var glusr_isEnterprise = '';

      if (fcp_array.indexOf(glusr_custtype_id) != -1) {
        is_fcp = 1;
      } else if (vfcp_array.indexOf(glusr_custtype_id) != -1) {
        is_Vfcp = 1;
      } else if (paid_array.indexOf(glusr_custtype_id) != -1) {
        is_paidSeller = 1;
      } else if (newseller_array.indexOf(glusr_custtype_id) != -1) {
        is_newseller = 1;
        is_fcp = 1;
      } else {
        is_fcp = 1;
      }

      var custtype_array_bizfeed = [17, 22, 39, 40, 41, 44, 45, 32, 14, 34, 35, 38, 42, 43, 46, 47, 12, 10, 1, 2, 23, 16, 5, 24, 15, 13, 31, 8, 21, 7, 27, 26, 25, 4, 37, 48, 49, 33];
      var isbizfeedShow = custtype_array_bizfeed.indexOf(glusr_custtype_id) != -1 ? 1 : 0;

      if (glusr_disable_reason == '') {
        glusr_disable_reason = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('userDet', 'd_re');
      }

      glusr_disable_reason = glusr_disable_reason ? glusr_disable_reason.toLowerCase() : '';

      if (glusr_usr_approv == '') {
        glusr_usr_approv = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('userDet', 'ast');
      }

      if (glusr_lst_Status == '') {
        glusr_lst_Status = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('userDet', 'lst');
      }

      if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('userDet', 'enterprise')) {
        glusr_isEnterprise = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('userDet', 'enterprise');
      } else {
        if (glusr_is_paid != 'P' || [16, 24, 26, 8, 21].indexOf(glusr_custtype_id) || glusr_id == '37217193' || glusr_id == '1522196' || glusr_id == '12971151') {
          var data_renewal = new FormData();
          data_renewal.append('glid', glusr_id);

          if (Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('adminiil')) {
            data_renewal.append('empid', Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('adminiil'));
          } else {
            data_renewal.append('other', 'yes');
            data_renewal.append('MODID', "seller");
          }

          data_renewal.append('AK', Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('im_iss', 't'));
          var isEnterpriseData = this.isEnterprise(data_renewal);

          if (isEnterpriseData['error_msg'] && isEnterpriseData['error_msg'] == '') {
            glusr_isEnterprise = isEnterpriseData['content'];
          } else {
            glusr_isEnterprise = '0'; //Service fail case toh show
          }
        } else {
          glusr_isEnterprise = '1'; //is enterprise
        }
      }

      var utyp = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('ImeshVisitor', 'utyp');
      var userType = utyp ? utyp : '';
      var glusr_first_name = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('ImeshVisitor', 'fn');
      var glusr_last_name = this.props['GLUSR_USR_LASTNAME'] ? this.props['GLUSR_USR_LASTNAME'] : '';
      var glusr_name = glusr_first_name + " " + glusr_last_name;
      glusr_name = decodeURIComponent(glusr_name.replace('/[^a-zA-Z0-9\s]/', ''));
      var glusr_ph_mobile = this.props['GLUSR_USR_PH_MOBILE'] ? this.props['GLUSR_USR_PH_MOBILE'] : '';
      var glusr_mobile_alt = this.props['GLUSR_USR_PH_MOBILE_ALT'] ? this.props['GLUSR_USR_PH_MOBILE_ALT'] : '';
      var glusr_email = this.props['EMAIL1'] ? this.props['EMAIL1'] : '';
      var glusr_email_alt = this.props['EMAIL2'] ? this.props['EMAIL2'] : '';
      var glusr_comp_name = this.props['COMPANY_NAME'] ? this.props['COMPANY_NAME'] : '';
      var glusr_contact_add = this.props['CONTACT_ADDRESS'] ? this.props['CONTACT_ADDRESS'] : '';
      var glusr_fname = this.props['FIRST_NAME'] ? this.props['FIRST_NAME'] : '';
      var glusr_lname = this.props['LAST_NAME'] ? this.props['LAST_NAME'] : '';
      var glusr_city = this.props['GLUSR_USR_CITY'] ? this.props['GLUSR_USR_CITY'] : '';
      var glusr_custype_name = this.props['GLUSR_USR_CUSTTYPE_NAME'] ? this.props['GLUSR_USR_CUSTTYPE_NAME'] : '';
      var glusr_custCredit = this.props['GLUSR_ETO_CUST_CREDITS_AV'] ? this.props['GLUSR_ETO_CUST_CREDITS_AV'] : '';
      var glusr_locpref = this.props['LOCATION_PREFERENCE'] ? this.props['LOCATION_PREFERENCE'] : '';
      var pincode = this.props['ZIP'] ? this.props['ZIP'] : '';
      var glusr_ph_country = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('ImeshVisitor', 'phcc');
      var glusriso = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('ImeshVisitor', 'iso');
      var glusr_company_profile = '';
      var u_url = '';

      if (this.props['PAIDURL'] && this.props['PAIDURL'] != '' && this.props['PAIDURL'] != 'not activated') {
        glusr_company_profile = this.props['PAIDURL'];
      } else {
        glusr_company_profile = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('userDet', 'u_url');

        if (glusr_company_profile == "") {
          u_url = 'https://www.indiamart.com/company/' + glusr_id;
        }
      }

      glusr_company_profile = glusr_company_profile.replace('http://www.indiamart.com', 'https://www.indiamart.com');
      var glusr_usr_ph_mobile = '';

      if (glusr_ph_mobile != '') {
        glusr_usr_ph_mobile = "+" + glusr_ph_country + "-" + glusr_ph_mobile;
      }

      var ISO = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('ImeshVisitor', 'iso');
      var glusr_email = this.props['EMAIL1'] ? this.props['EMAIL1'] : '';
      var glusr_usr_image = '';
      var glusr_fcp_flag = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_6__["getCookieValByKey"])('userDet', 'fcp_flag');
      var new_profile = '';
      var new_profile1 = '';
      var Current_url = window.location.href;
      var user_cookie = [];
      user_cookie['GLUSR_USR_ID'] = glusr_id;
      var Catalog_user = this.props['IS_CATALOG'] ? this.props['IS_CATALOG'] : '';
      var award_name = 'Awards & Memberships';
      var custom_name = 'Custom Profile';
      var infra_name = 'Infrastructure & Facilities';
      var job_name = 'Jobs';
      var news_name = 'News';
      var quality_name = 'Quality & Compliance';
      var testi_name = 'Testimonials';
      var sidebar = '';
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        className: "side-menu"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_mobile_prim",
        value: glusr_ph_mobile
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_mobile_alt",
        value: glusr_mobile_alt
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_email_alt",
        value: glusr_email_alt
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_pri_email",
        value: glusr_email
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_comp_pro",
        value: glusr_comp_name
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_name",
        value: glusr_name
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_is_fcp",
        value: is_fcp
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_contact_add",
        value: glusr_contact_add
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_fname",
        value: glusr_fname
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_lname",
        value: glusr_lname
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_city",
        value: glusr_city
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_pin",
        value: pincode
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_custype_name",
        value: glusr_custype_name
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_custtype_id",
        value: glusr_custtype_id
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_ln_custCredit",
        value: glusr_custCredit
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        name: "",
        id: "glusr_locapref",
        value: glusr_locpref
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "AccntVerifyPopup"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("div", {
        id: "Glob_ima_popup"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        id: "hiddenuser",
        value: glusr_id
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        id: "hiddenImage",
        value: glusr_usr_image
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        id: "hiddenEmp",
        value: empid
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("input", {
        type: "hidden",
        id: "hiddenCatalog",
        value: Catalog_user
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var st = _Redux_store__WEBPACK_IMPORTED_MODULE_5__["store"].getState();
      console.log(st.UserDetails.userDetData);
      console.log(st);

      if (!st.UserDetails.userDetData) {
        //console.log(this.props);
        this.props.fetchUserData();
      }
    }
  }]);

  return leftnavigation;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  //console.log(state);
  return _objectSpread({}, state.UserDetails);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fetchUserData: function fetchUserData() {
      return dispatch(Object(_Redux_UserDetails_ud_actions__WEBPACK_IMPORTED_MODULE_4__["fetchUD_Data"])());
    }
  };
};

leftnavigation = Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, mapDispatchToProps)(leftnavigation);

/***/ }),

/***/ "./src/modules/Header/css/Imcropper.css":
/*!**********************************************!*\
  !*** ./src/modules/Header/css/Imcropper.css ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/modules/Header/css/Navbar.css":
/*!*******************************************!*\
  !*** ./src/modules/Header/css/Navbar.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/modules/Header/css/leftnav.css":
/*!********************************************!*\
  !*** ./src/modules/Header/css/leftnav.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=BuyerSettings.pwa201.js.map