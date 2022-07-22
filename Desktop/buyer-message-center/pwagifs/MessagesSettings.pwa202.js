(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["MessagesSettings"],{

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

/***/ "./src/modules/BuyerMessages/actions/messageAction.js":
/*!************************************************************!*\
  !*** ./src/modules/BuyerMessages/actions/messageAction.js ***!
  \************************************************************/
/*! exports provided: messagesAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messagesAPI", function() { return messagesAPI; });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var messagesAPI = {
  messageContactListData: function messageContactListData(params) {
    return /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
        var res;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return getData("POST", "/miscreact/ajaxrequest/messages/contactlist", params);

              case 3:
                res = _context.sent;
                dispatch({
                  type: "contact_data_success",
                  success: true,
                  result: res
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                dispatch({
                  type: "contact_data_ERR",
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
  }
};

/***/ }),

/***/ "./src/modules/BuyerMessages/components/List/List.css":
/*!************************************************************!*\
  !*** ./src/modules/BuyerMessages/components/List/List.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/modules/BuyerMessages/components/List/List.js":
/*!***********************************************************!*\
  !*** ./src/modules/BuyerMessages/components/List/List.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListComponent; });
/* harmony import */ var _List_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./List.css */ "./src/modules/BuyerMessages/components/List/List.css");
/* harmony import */ var _List_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_List_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
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




var ListComponent = /*#__PURE__*/function (_Component) {
  _inherits(ListComponent, _Component);

  var _super = _createSuper(ListComponent);

  function ListComponent(props) {
    var _this;

    _classCallCheck(this, ListComponent);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "contact_list", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var params;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              params = {
                glusrid: "127253317",
                start: "1",
                end: "20",
                modid: "MY",
                AK: "eyJ0eXAiOiJKV1QiLCJhbGciOiJzaGEyNTYifQ.eyJpc3MiOiJVU0VSIiwiYXVkIjoiOCo5KjQqMCo3KiIsImV4cCI6MTY1NDc3MjkyOCwiaWF0IjoxNjU0Njg2NTI4LCJzdWIiOiIxMjcyNTMzMTciLCJjZHQiOiIwOC0wNi0yMDIyIn0.LOHvB0U8ZXUDXLrqb9g1k95SPjOUDnc7e-3fVKssK4U"
              };
              _context.next = 3;
              return _this.props.fetchContactListData(params);

            case 3:
              if (_this.props.MessagesReducer.Contactdata != undefined) {
                console.log(_this.props.MessagesReducer.Contactdata);
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    return _this;
  }

  _createClass(ListComponent, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("ul", {
        "class": "message-user-name-section",
        id: "fetch_list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("li", {
        "class": "user-name1",
        id: "0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "no_cmp_logo"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c1"
      }, "A")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "left_det_show"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "c-div"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "c_addr wrd_elip"
      }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_company", null, "AK Gaming"), ", ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_city", null, "Rupnagar"), ",", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_state", null, "Punjab"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_country", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "wrd_elip contname"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("svg", {
        "class": "mr5 ml5",
        width: "12px",
        height: "12px",
        version: "1.1",
        viewBox: "0 -1 13 15",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("title", null, "user (8)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("desc", null, "Created with Sketch."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        fill: "none",
        "fill-rule": "evenodd"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(-632 -218)",
        "fill-rule": "nonzero",
        stroke: "#666",
        "stroke-width": "1.3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(428 139)"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(205 80)"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("path", {
        id: "a",
        d: "m5.5 0c-1.8196 0-3.3 1.4804-3.3 3.3s1.4804 3.3 3.3 3.3 3.3-1.4804 3.3-3.3-1.4804-3.3-3.3-3.3z"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("path", {
        d: "m6.5226 7.3578h-2.0452c-1.6916 0-3.361 0.78102-4.4774 2.4556v2.7021h11v-2.7021c-1.1147-1.6722-2.7837-2.4556-4.4774-2.4556z"
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c_name"
      }, "Apurv"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c_number0",
        "class": "dib c_num"
      }, "(08048372352,964)"), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "abscc"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        "class": "prd_icn_green"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        "class": "prdct_dsply"
      }, "High End Gaming Laptops")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "last-msg-snippet wrd_elip "
      }, "I am interested in High End Gaming Laptops", " "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("li", {
        "class": "user-name1",
        id: "0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "no_cmp_logo"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c1"
      }, "M")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "left_det_show"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "c-div"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "c_addr wrd_elip"
      }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_company", null, "Megha International"), ",", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_city", null, "Mumbai"), ", ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_state", null, "Maharashtra"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_country", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "wrd_elip contname"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("svg", {
        "class": "mr5 ml5",
        width: "12px",
        height: "12px",
        version: "1.1",
        viewBox: "0 -1 13 15",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("title", null, "user (8)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("desc", null, "Created with Sketch."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        fill: "none",
        "fill-rule": "evenodd"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(-632 -218)",
        "fill-rule": "nonzero",
        stroke: "#666",
        "stroke-width": "1.3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(428 139)"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(205 80)"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("path", {
        id: "a",
        d: "m5.5 0c-1.8196 0-3.3 1.4804-3.3 3.3s1.4804 3.3 3.3 3.3 3.3-1.4804 3.3-3.3-1.4804-3.3-3.3-3.3z"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("path", {
        d: "m6.5226 7.3578h-2.0452c-1.6916 0-3.361 0.78102-4.4774 2.4556v2.7021h11v-2.7021c-1.1147-1.6722-2.7837-2.4556-4.4774-2.4556z"
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c_name"
      }, "Devang Mehta"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c_number0",
        "class": "dib c_num"
      }, "(08048950550)"), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "abscc"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        "class": "prd_icn_green"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        "class": "prdct_dsply"
      }, "Dyestuff")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "last-msg-snippet wrd_elip "
      }, "Quantity Required: 1 Kg "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("li", {
        "class": "user-name1",
        id: "0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "no_cmp_logo"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c1"
      }, "M")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "left_det_show"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "c-div"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "c_addr wrd_elip"
      }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_company", null, "Megha International"), ",", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_city", null, "Mumbai"), ", ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_state", null, "Maharashtra"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_country", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "wrd_elip contname"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("svg", {
        "class": "mr5 ml5",
        width: "12px",
        height: "12px",
        version: "1.1",
        viewBox: "0 -1 13 15",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("title", null, "user (8)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("desc", null, "Created with Sketch."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        fill: "none",
        "fill-rule": "evenodd"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(-632 -218)",
        "fill-rule": "nonzero",
        stroke: "#666",
        "stroke-width": "1.3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(428 139)"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(205 80)"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("path", {
        id: "a",
        d: "m5.5 0c-1.8196 0-3.3 1.4804-3.3 3.3s1.4804 3.3 3.3 3.3 3.3-1.4804 3.3-3.3-1.4804-3.3-3.3-3.3z"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("path", {
        d: "m6.5226 7.3578h-2.0452c-1.6916 0-3.361 0.78102-4.4774 2.4556v2.7021h11v-2.7021c-1.1147-1.6722-2.7837-2.4556-4.4774-2.4556z"
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c_name"
      }, "Devang Mehta"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c_number0",
        "class": "dib c_num"
      }, "(08048950550)"), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "abscc"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        "class": "prd_icn_green"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        "class": "prdct_dsply"
      }, "Dyestuff")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "last-msg-snippet wrd_elip "
      }, "Quantity Required: 1 Kg "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("li", {
        "class": "user-name1",
        id: "0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "no_cmp_logo"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c1"
      }, "M")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "left_det_show"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "c-div"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "c_addr wrd_elip"
      }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_company", null, "Megha International"), ",", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_city", null, "Mumbai"), ", ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_state", null, "Maharashtra"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_country", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "wrd_elip contname"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("svg", {
        "class": "mr5 ml5",
        width: "12px",
        height: "12px",
        version: "1.1",
        viewBox: "0 -1 13 15",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("title", null, "user (8)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("desc", null, "Created with Sketch."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        fill: "none",
        "fill-rule": "evenodd"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(-632 -218)",
        "fill-rule": "nonzero",
        stroke: "#666",
        "stroke-width": "1.3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(428 139)"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(205 80)"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("path", {
        id: "a",
        d: "m5.5 0c-1.8196 0-3.3 1.4804-3.3 3.3s1.4804 3.3 3.3 3.3 3.3-1.4804 3.3-3.3-1.4804-3.3-3.3-3.3z"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("path", {
        d: "m6.5226 7.3578h-2.0452c-1.6916 0-3.361 0.78102-4.4774 2.4556v2.7021h11v-2.7021c-1.1147-1.6722-2.7837-2.4556-4.4774-2.4556z"
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c_name"
      }, "Devang Mehta"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c_number0",
        "class": "dib c_num"
      }, "(08048950550)"), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "abscc"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        "class": "prd_icn_green"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        "class": "prdct_dsply"
      }, "Dyestuff")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "last-msg-snippet wrd_elip "
      }, "Quantity Required: 1 Kg "))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("li", {
        "class": "user-name1",
        id: "0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "no_cmp_logo"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c1"
      }, "M")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "left_det_show"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "c-div"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "c_addr wrd_elip"
      }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_company", null, "Megha International"), ",", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_city", null, "Mumbai"), ", ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_state", null, "Maharashtra"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("c_country", null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("div", {
        "class": "wrd_elip contname"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("svg", {
        "class": "mr5 ml5",
        width: "12px",
        height: "12px",
        version: "1.1",
        viewBox: "0 -1 13 15",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("title", null, "user (8)"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("desc", null, "Created with Sketch."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        fill: "none",
        "fill-rule": "evenodd"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(-632 -218)",
        "fill-rule": "nonzero",
        stroke: "#666",
        "stroke-width": "1.3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(428 139)"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("g", {
        transform: "translate(205 80)"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("path", {
        id: "a",
        d: "m5.5 0c-1.8196 0-3.3 1.4804-3.3 3.3s1.4804 3.3 3.3 3.3 3.3-1.4804 3.3-3.3-1.4804-3.3-3.3-3.3z"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("path", {
        d: "m6.5226 7.3578h-2.0452c-1.6916 0-3.361 0.78102-4.4774 2.4556v2.7021h11v-2.7021c-1.1147-1.6722-2.7837-2.4556-4.4774-2.4556z"
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c_name"
      }, "Devang Mehta"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        id: "c_number0",
        "class": "dib c_num"
      }, "(08048950550)"), " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "abscc"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        "class": "prd_icn_green"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("span", {
        "class": "prdct_dsply"
      }, "Dyestuff")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["React"].createElement("p", {
        "class": "last-msg-snippet wrd_elip "
      }, "Quantity Required: 1 Kg "))));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.contact_list();
    }
  }]);

  return ListComponent;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);



/***/ }),

/***/ "./src/modules/BuyerMessages/components/MsgPage/MsgPage.js":
/*!*****************************************************************!*\
  !*** ./src/modules/BuyerMessages/components/MsgPage/MsgPage.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MsgPageComponent; });
/* harmony import */ var _css_MsgPage_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css/MsgPage.css */ "./src/modules/BuyerMessages/css/MsgPage.css");
/* harmony import */ var _css_MsgPage_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_MsgPage_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var _Navigation_Navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Navigation/Navigation */ "./src/modules/BuyerMessages/components/Navigation/Navigation.js");
/* harmony import */ var _List_List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../List/List */ "./src/modules/BuyerMessages/components/List/List.js");
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






var MsgPageComponent = /*#__PURE__*/function (_Component) {
  _inherits(MsgPageComponent, _Component);

  var _super = _createSuper(MsgPageComponent);

  function MsgPageComponent(props) {
    _classCallCheck(this, MsgPageComponent);

    return _super.call(this, props);
  }

  _createClass(MsgPageComponent, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        className: "messageCenterContainer"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        className: "msgpage"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        className: "navigation"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(_Navigation_Navigation__WEBPACK_IMPORTED_MODULE_2__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        className: "search"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        className: "list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(_List_List__WEBPACK_IMPORTED_MODULE_3__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        className: "details"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        className: "chat"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        className: "message"
      })));
    }
  }]);

  return MsgPageComponent;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);



/***/ }),

/***/ "./src/modules/BuyerMessages/components/Navigation/Navigation.css":
/*!************************************************************************!*\
  !*** ./src/modules/BuyerMessages/components/Navigation/Navigation.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/modules/BuyerMessages/components/Navigation/Navigation.js":
/*!***********************************************************************!*\
  !*** ./src/modules/BuyerMessages/components/Navigation/Navigation.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Navigation; });
/* harmony import */ var _Navigation_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navigation.css */ "./src/modules/BuyerMessages/components/Navigation/Navigation.css");
/* harmony import */ var _Navigation_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Navigation_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");


function Navigation() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
    "class": "heading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
    "class": "f1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
    "class": "s1",
    id: "s1"
  }, " ", "Messages \xA0", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("span", {
    id: "contact_count",
    "class": "contact-count"
  }, "(1062 contacts)"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
    "class": "f2",
    id: "cb-unrd-div"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("span", {
    "class": "lbl_checkbox cb-unrd"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("input", {
    type: "checkbox",
    id: "cb-unrd1"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("span", {
    id: "unread"
  }, "Unread")));
}

/***/ }),

/***/ "./src/modules/BuyerMessages/container/MessagesContainer.js":
/*!******************************************************************!*\
  !*** ./src/modules/BuyerMessages/container/MessagesContainer.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");
/* harmony import */ var _components_MsgPage_MsgPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/MsgPage/MsgPage */ "./src/modules/BuyerMessages/components/MsgPage/MsgPage.js");
/* harmony import */ var _actions_messageAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/messageAction */ "./src/modules/BuyerMessages/actions/messageAction.js");




var mapStateToProps = function mapStateToProps(state) {
  // console.log(state);
  return {
    UserDetails: state.UserDetails,
    BuyerReducer: state.BuyerReducer
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    // fetchUserData: () => dispatch(fetchUDData()),
    fetchContactListData: function fetchContactListData(params) {
      return dispatch(_actions_messageAction__WEBPACK_IMPORTED_MODULE_2__["messagesAPI"].messageContactListData(params));
    } // disOtp: (params) => dispatch(settingAPI.disOtp(params)),
    // disableUser: (params) => dispatch(settingAPI.disableUser(params)),

  };
}; // export default Settings;


/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_components_MsgPage_MsgPage__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ "./src/modules/BuyerMessages/css/MsgPage.css":
/*!***************************************************!*\
  !*** ./src/modules/BuyerMessages/css/MsgPage.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=MessagesSettings.pwa202.js.map