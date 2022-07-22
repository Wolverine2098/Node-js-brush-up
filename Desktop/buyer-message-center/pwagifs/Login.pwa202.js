(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["Login"],{

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
  fetchContactDetail: function fetchContactDetail(params) {
    var data = params;
    return makeRequest2("POST", "/miscreact/ajaxrequest/messages/contactlist", data);
  },
  fetchOTPVer: function fetchOTPVer(params) {
    var data = params;
    return makeRequest2("POST", "/miscreact/ajaxrequest/buyer/otpver/", data, 20000);
  },
  fetchChangePassword: function fetchChangePassword(params) {
    var data = params;
    console.log(params);
    return makeRequest2("POST", "/miscreact/ajaxrequest/buyer/chgpassword/", data, 20000);
  },
  fetchBuyerUserdetails: function fetchBuyerUserdetails() {
    var data = {};
    return makeRequest2("GET", "/miscreact/ajaxrequest/buyer/UserDetails/", data, 20000);
  },
  fetchBuyerSettingsdetails: function fetchBuyerSettingsdetails() {
    var data1 = {
      privacy_settings: new Array({
        flag: "2"
      }),
      mod_id: "IMOB",
      token: "imobile@15061981",
      glusrid: "glid"
    };
    var data = {};
    return makeRequest2("GET", "/miscreact/ajaxrequest/settingsData/", data);
  }
};

function makeRequestFile(method, url, file) {
  if (typeof window === "undefined" ? "undefined" : _typeof(window)) {
    glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])("ImeshVisitor", "glid");
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
      _Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["gaTrack"].trackEvent("Image-Attachment-PWA", "Image-Upload", "ImageTimeOut", 0, true);
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
  Object(_Globals_MainFunctions__WEBPACK_IMPORTED_MODULE_2__["versionUp"])("XHR");

  if (typeof window === "undefined" ? "undefined" : _typeof(window)) {
    glid = Object(_Globals_CookieManager__WEBPACK_IMPORTED_MODULE_3__["getCookieValByKey"])("ImeshVisitor", "glid");
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
        body["glid"] = glid;
      }

      body = JSON.stringify(body);
    }

    var isMsgMod = false;

    if (url.indexOf("messagecenter") != -1) {
      isMsgMod = true;
    }

    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.timeout = timeout;

    xhr.ontimeout = function () {
      if (url !== "/ajaxrequest/identified/timeout/") {
        _Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["gaTrack"].trackEvent(["Timeout", "PWA", url, 0, true]);
        var datatimeout = {
          url: url,
          timeout: true
        };
        makeRequest("POST", "/ajaxrequest/identified/timeout/", datatimeout);
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
        if (url.indexOf("/ajaxrequest/search/search") != -1) {
          if (!document.getElementById("searchListing")) {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])("PWA", "First_load_search", "search_service", Date.now() - window.searchAPITime);
          } else if (url.indexOf("&start=0") != -1) {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])("PWA", "subsequent_load_search", "search_service", Date.now() - window.searchAPITime);
          } else {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])("PWA", "search_autofetch_search", "search_service", Date.now() - window.searchAPITime);
          }
        }

        var res = xhr.response ? JSON.parse(xhr.response) : "";

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

    if (url.indexOf("messagecenter") != -1) {
      isMsgMod = true;
    } // console.log(url);


    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.timeout = timeout;

    xhr.ontimeout = function () {
      if (url !== "/ajaxrequest/identified/timeout/") {
        _Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["gaTrack"].trackEvent(["Timeout", "PWA", url, 0, true]);
        var datatimeout = {
          url: url,
          timeout: true
        };
        makeRequest("POST", "/ajaxrequest/identified/timeout/", datatimeout);
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
        if (url.indexOf("/ajaxrequest/search/search") != -1) {
          if (!document.getElementById("searchListing")) {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])("PWA", "First_load_search", "search_service", Date.now() - window.searchAPITime);
          } else if (url.indexOf("&start=0") != -1) {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])("PWA", "subsequent_load_search", "search_service", Date.now() - window.searchAPITime);
          } else {
            Object(_Globals_GaTracking__WEBPACK_IMPORTED_MODULE_4__["generateGAforPLT"])("PWA", "search_autofetch_search", "search_service", Date.now() - window.searchAPITime);
          }
        }

        var res = xhr.response ? JSON.parse(xhr.response) : "";

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

/***/ "./src/modules/MyLogin/components/Login.js":
/*!*************************************************!*\
  !*** ./src/modules/MyLogin/components/Login.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Footer_components_Footer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Footer/components/Footer */ "./src/modules/Footer/components/Footer.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/preact/compat/dist/compat.module.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");
/* harmony import */ var _Redux_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../Redux/store */ "./src/Redux/store.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "../node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _Redux_UserDetails_UDActions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../Redux/UserDetails/UDActions */ "./src/Redux/UserDetails/UDActions.js");
/* harmony import */ var _css_Login_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../css/Login.css */ "./src/modules/MyLogin/css/Login.css");
/* harmony import */ var _css_Login_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_css_Login_css__WEBPACK_IMPORTED_MODULE_6__);
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



 // import { fetchSetting_Data } from "../../../../Redux/Settings/settings";






var LoginComponent = /*#__PURE__*/function (_Component) {
  _inherits(LoginComponent, _Component);

  var _super = _createSuper(LoginComponent);

  function LoginComponent(props) {
    _classCallCheck(this, LoginComponent);

    return _super.call(this, props);
  }

  _createClass(LoginComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof signIn !== 'undefined') {
        signIn('', '', '', 'B');
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(react__WEBPACK_IMPORTED_MODULE_1__["default"].Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901_bewrapper",
        "class": "be-frmwrap bedsnone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901_blkwrap",
        "class": "be-blckbg"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        "class": "be-frmcont"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901_thankDiv",
        "class": "be-mcont bezid bedsnone"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901_mcont",
        "class": "be-mcont bezid"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901_leftS",
        "class": "be-Lsc"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        "class": "belodrbg bedsnone",
        id: "t0901_belodrYT"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        "class": "blloader"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901_leftsection"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901_leftR",
        "class": "be-Rsc  be-frmpop"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901_cls",
        "class": "be-cls"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901flagdiv",
        "class": "bedsnone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("dl", {
        id: "t0901flag",
        "class": "dropdown bebdr be-flg"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901_rightsection"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "t0901_byrinfo",
        "class": "befs14 beinfo eqBotm bedsnone"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("input", {
        type: "hidden",
        id: "t0901_tmpId"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        "class": "hm1 bbc fxmn",
        id: "res-mob1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("script", {
        type: "text/javascript"
      }, "function selecttext(event, ui){\n        if (typeof( ui.item.data) != 'undefined' && typeof( ui.item.data.catid) != 'undefined' && ui.item.data.catid != ''){\n$('#hdr_frm').append( \"<input type='hidden' name='catid' id='catid' value='\"+ui.item.data.catid+\"' >\" );\n}\n                let source_val = '';\n                if (typeof( ui.item.askwdSel) != 'undefined' && ui.item.askwdSel == 1){\n                if(typeof(ui.item.trackid) != 'undefined'){\n                    source_val = ui.item.trackid;\n                }\n                else{\n                    source_val =\"as\";\n                }\n                //let source_val = decodeURI(ui.item.trackid);\n                $('#hdr_frm').append( \"<input type='hidden' name='src' id='src' value='\"+source_val+\"' >\" );\n }\n            this.value = ui.item.value;\n            if(event.keyCode == 13){\n                document.getElementById(\"btnSearch\").click();\n            }\n            else if(event.handleObj.origType==\"click\"){\n                document.getElementById(\"btnSearch\").click();\n            }\n        }"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        "class": "content-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        "class": "f1 f2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        "class": "pbl-sr f1 f3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        "class": "security-msg"
      }, "For the security reasons, you are required to provide your IndiaMART password to update your critical information and gain full access of all the features available on MY IndiaMART. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("a", {
        href: "javascript:void(0)",
        onClick: function onClick() {
          return signIn('', '', '', 'B');
        }
      }, " Sign in to continue. ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("div", {
        id: "mobile dn"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(_Footer_components_Footer__WEBPACK_IMPORTED_MODULE_0__["footNav"], null));
    }
  }]);

  return LoginComponent;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  // console.log("printing from mydrive.js");
  // console.log(state.MyDrive);
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(LoginComponent));

/***/ }),

/***/ "./src/modules/MyLogin/container/LoginContainer.js":
/*!*********************************************************!*\
  !*** ./src/modules/MyLogin/container/LoginContainer.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-redux */ "../node_modules/react-redux/es/index.js");
/* harmony import */ var _components_Login__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Login */ "./src/modules/MyLogin/components/Login.js");



var mapStateToProps = function mapStateToProps(state) {
  // console.log("printing from mydrive.js");
  // console.log(state.MyDrive);
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_0__["connect"])(mapStateToProps, mapDispatchToProps)(_components_Login__WEBPACK_IMPORTED_MODULE_1__["default"]));

/***/ }),

/***/ "./src/modules/MyLogin/css/Login.css":
/*!*******************************************!*\
  !*** ./src/modules/MyLogin/css/Login.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=Login.pwa202.js.map