"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = Symbol.for("react.element");
      var n = Symbol.for("react.portal");
      var p = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r = Symbol.for("react.profiler");
      var t = Symbol.for("react.provider");
      var u = Symbol.for("react.context");
      var v = Symbol.for("react.forward_ref");
      var w = Symbol.for("react.suspense");
      var x = Symbol.for("react.memo");
      var y = Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a)
          return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a)
          throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b)
          for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)
            J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g)
          c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++)
            f[m] = arguments[m + 2];
          c.children = f;
        }
        if (a && a.defaultProps)
          for (d in g = a.defaultProps, g)
            void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k)
          a = null;
        var h = false;
        if (null === a)
          h = true;
        else
          switch (k) {
            case "string":
            case "number":
              h = true;
              break;
            case "object":
              switch (a.$$typeof) {
                case l:
                case n:
                  h = true;
              }
          }
        if (h)
          return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
            return a2;
          })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a))
          for (var g = 0; g < a.length; g++) {
            k = a[g];
            var f = d + Q(k, g);
            h += R(k, b, e, f, c);
          }
        else if (f = A(a), "function" === typeof f)
          for (a = f.call(a), g = 0; !(k = a.next()).done; )
            k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k)
          throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a)
          return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status)
              a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status)
              a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status)
          return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a))
          throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a)
          throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps)
            var g = a.type.defaultProps;
          for (f in b)
            J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f)
          d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++)
            g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = X;
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f(a, b) {
        var c = a.length;
        a.push(b);
        a:
          for (; 0 < c; ) {
            var d = c - 1 >>> 1, e = a[d];
            if (0 < g(e, b))
              a[d] = b, a[c] = e, c = d;
            else
              break a;
          }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k(a) {
        if (0 === a.length)
          return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a:
            for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
              var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
              if (0 > g(C, c))
                n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
              else if (n < e && 0 > g(x, c))
                a[d] = x, a[n] = c, d = n;
              else
                break a;
            }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      var r = [];
      var t = [];
      var u = 1;
      var v = null;
      var y = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a) {
        for (var b = h(t); null !== b; ) {
          if (null === b.callback)
            k(t);
          else if (b.startTime <= a)
            k(t), b.sortIndex = b.expirationTime, f(r, b);
          else
            break;
          b = h(t);
        }
      }
      function H(a) {
        B = false;
        G(a);
        if (!A)
          if (null !== h(r))
            A = true, I(J);
          else {
            var b = h(t);
            null !== b && K(H, b.startTime - a);
          }
      }
      function J(a, b) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c = y;
        try {
          G(b);
          for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r) && k(r);
              G(b);
            } else
              k(r);
            v = h(r);
          }
          if (null !== v)
            var w = true;
          else {
            var m = h(t);
            null !== m && K(H, m.startTime - b);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c, z = false;
        }
      }
      var N = false;
      var O = null;
      var L = -1;
      var P = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a = exports.unstable_now();
          Q = a;
          var b = true;
          try {
            b = O(true, a);
          } finally {
            b ? S() : (N = false, O = null);
          }
        } else
          N = false;
      }
      var S;
      if ("function" === typeof F)
        S = function() {
          F(R);
        };
      else if ("undefined" !== typeof MessageChannel) {
        T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else
        S = function() {
          D(R, 0);
        };
      var T;
      var U;
      function I(a) {
        O = a;
        N || (N = true, S());
      }
      function K(a, b) {
        L = D(function() {
          a(exports.unstable_now());
        }, b);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h(r);
      };
      exports.unstable_next = function(a) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y;
        }
        var c = y;
        y = b;
        try {
          return a();
        } finally {
          y = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y;
        y = a;
        try {
          return b();
        } finally {
          y = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
        return a;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a) {
        var b = y;
        return function() {
          var c = y;
          y = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y = c;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_scheduler_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ca = require_scheduler();
      function p(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
          b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a, b) {
        ha(a, b);
        ha(a + "Capture", b);
      }
      function ha(a, b) {
        ea[a] = b;
        for (a = 0; a < b.length; a++)
          da.add(b[a]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a) {
        if (ja.call(ma, a))
          return true;
        if (ja.call(la, a))
          return false;
        if (ka.test(a))
          return ma[a] = true;
        la[a] = true;
        return false;
      }
      function pa(a, b, c, d) {
        if (null !== c && 0 === c.type)
          return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d)
              return false;
            if (null !== c)
              return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function qa(a, b, c, d) {
        if (null === b || "undefined" === typeof b || pa(a, b, c, d))
          return true;
        if (d)
          return false;
        if (null !== c)
          switch (c.type) {
            case 3:
              return !b;
            case 4:
              return false === b;
            case 5:
              return isNaN(b);
            case 6:
              return isNaN(b) || 1 > b;
          }
        return false;
      }
      function v(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        z[a] = new v(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        z[b] = new v(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        z[a] = new v(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        z[a] = new v(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        z[a] = new v(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        z[a] = new v(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          ra,
          sa
        );
        z[b] = new v(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function ta(a, b, c, d) {
        var e = z.hasOwnProperty(b) ? z[b] : null;
        if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1])
          qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = Symbol.for("react.element");
      var wa = Symbol.for("react.portal");
      var ya = Symbol.for("react.fragment");
      var za = Symbol.for("react.strict_mode");
      var Aa = Symbol.for("react.profiler");
      var Ba = Symbol.for("react.provider");
      var Ca = Symbol.for("react.context");
      var Da = Symbol.for("react.forward_ref");
      var Ea = Symbol.for("react.suspense");
      var Fa = Symbol.for("react.suspense_list");
      var Ga = Symbol.for("react.memo");
      var Ha = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      Symbol.for("react.debug_trace_mode");
      var Ia = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.cache");
      Symbol.for("react.tracing_marker");
      var Ja = Symbol.iterator;
      function Ka(a) {
        if (null === a || "object" !== typeof a)
          return null;
        a = Ja && a[Ja] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var A = Object.assign;
      var La;
      function Ma(a) {
        if (void 0 === La)
          try {
            throw Error();
          } catch (c) {
            var b = c.stack.trim().match(/\n( *(at )?)/);
            La = b && b[1] || "";
          }
        return "\n" + La + a;
      }
      var Na = false;
      function Oa(a, b) {
        if (!a || Na)
          return "";
        Na = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b)
            if (b = function() {
              throw Error();
            }, Object.defineProperty(b.prototype, "props", { set: function() {
              throw Error();
            } }), "object" === typeof Reflect && Reflect.construct) {
              try {
                Reflect.construct(b, []);
              } catch (l) {
                var d = l;
              }
              Reflect.construct(a, [], b);
            } else {
              try {
                b.call();
              } catch (l) {
                d = l;
              }
              a.call(b.prototype);
            }
          else {
            try {
              throw Error();
            } catch (l) {
              d = l;
            }
            a();
          }
        } catch (l) {
          if (l && d && "string" === typeof l.stack) {
            for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; )
              h--;
            for (; 1 <= g && 0 <= h; g--, h--)
              if (e[g] !== f[h]) {
                if (1 !== g || 1 !== h) {
                  do
                    if (g--, h--, 0 > h || e[g] !== f[h]) {
                      var k = "\n" + e[g].replace(" at new ", " at ");
                      a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                      return k;
                    }
                  while (1 <= g && 0 <= h);
                }
                break;
              }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
      }
      function Pa(a) {
        switch (a.tag) {
          case 5:
            return Ma(a.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Oa(a.type, false), a;
          case 11:
            return a = Oa(a.type.render, false), a;
          case 1:
            return a = Oa(a.type, true), a;
          default:
            return "";
        }
      }
      function Qa(a) {
        if (null == a)
          return null;
        if ("function" === typeof a)
          return a.displayName || a.name || null;
        if ("string" === typeof a)
          return a;
        switch (a) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a)
          switch (a.$$typeof) {
            case Ca:
              return (a.displayName || "Context") + ".Consumer";
            case Ba:
              return (a._context.displayName || "Context") + ".Provider";
            case Da:
              var b = a.render;
              a = a.displayName;
              a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
              return a;
            case Ga:
              return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
            case Ha:
              b = a._payload;
              a = a._init;
              try {
                return Qa(a(b));
              } catch (c) {
              }
          }
        return null;
      }
      function Ra(a) {
        var b = a.type;
        switch (a.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b.displayName || "Context") + ".Consumer";
          case 10:
            return (b._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b);
          case 8:
            return b === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b)
              return b.displayName || b.name || null;
            if ("string" === typeof b)
              return b;
        }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a;
          case "object":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a)
          return false;
        var b = a._valueTracker;
        if (!b)
          return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a)
          return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function ab(a, b) {
        b = b.checked;
        null != b && ta(a, "checked", b, false);
      }
      function bb(a, b) {
        ab(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c)
          if ("number" === d) {
            if (0 === c && "" === a.value || a.value != c)
              a.value = "" + c;
          } else
            a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function db(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value))
            return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function cb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a)
          null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      var eb = Array.isArray;
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++)
            b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++)
            e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML)
          throw Error(p(91));
        return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b)
              throw Error(p(92));
            if (eb(c)) {
              if (1 < c.length)
                throw Error(p(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      function kb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var mb;
      var nb = function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      }(function(a, b) {
        if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a)
          a.innerHTML = b;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = mb.firstChild; a.firstChild; )
            a.removeChild(a.firstChild);
          for (; b.firstChild; )
            a.appendChild(b.firstChild);
        }
      });
      function ob(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a) {
        qb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          pb[b] = pb[a];
        });
      });
      function rb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
      }
      function sb(a, b) {
        a = a.style;
        for (var c in b)
          if (b.hasOwnProperty(c)) {
            var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
            "float" === c && (c = "cssFloat");
            d ? a.setProperty(c, e) : a[c] = e;
          }
      }
      var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a, b) {
        if (b) {
          if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML))
            throw Error(p(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children)
              throw Error(p(60));
            if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML))
              throw Error(p(61));
          }
          if (null != b.style && "object" !== typeof b.style)
            throw Error(p(62));
        }
      }
      function vb(a, b) {
        if (-1 === a.indexOf("-"))
          return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb)
            throw Error(p(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b)
            for (a = 0; a < b.length; a++)
              Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a, b, c) {
        if (Ib)
          return a(b, c);
        Ib = true;
        try {
          return Gb(a, b, c);
        } finally {
          if (Ib = false, null !== zb || null !== Ab)
            Hb(), Fb();
        }
      }
      function Kb(a, b) {
        var c = a.stateNode;
        if (null === c)
          return null;
        var d = Db(c);
        if (null === d)
          return null;
        c = d[b];
        a:
          switch (b) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
              a = !d;
              break a;
            default:
              a = false;
          }
        if (a)
          return null;
        if (c && "function" !== typeof c)
          throw Error(p(231, b, typeof c));
        return c;
      }
      var Lb = false;
      if (ia)
        try {
          Mb = {};
          Object.defineProperty(Mb, "passive", { get: function() {
            Lb = true;
          } });
          window.addEventListener("test", Mb, Mb);
          window.removeEventListener("test", Mb, Mb);
        } catch (a) {
          Lb = false;
        }
      var Mb;
      function Nb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (m) {
          this.onError(m);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a) {
        Ob = true;
        Pb = a;
      } };
      function Tb(a, b, c, d, e, f, g, h, k) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a, b, c, d, e, f, g, h, k) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l = Pb;
            Ob = false;
            Pb = null;
          } else
            throw Error(p(198));
          Qb || (Qb = true, Rb = l);
        }
      }
      function Vb(a) {
        var b = a, c = a;
        if (a.alternate)
          for (; b.return; )
            b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function Wb(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b)
            return b.dehydrated;
        }
        return null;
      }
      function Xb(a) {
        if (Vb(a) !== a)
          throw Error(p(188));
      }
      function Yb(a) {
        var b = a.alternate;
        if (!b) {
          b = Vb(a);
          if (null === b)
            throw Error(p(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e)
            break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c)
                return Xb(e), a;
              if (f === d)
                return Xb(e), b;
              f = f.sibling;
            }
            throw Error(p(188));
          }
          if (c.return !== d.return)
            c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g)
                throw Error(p(189));
            }
          }
          if (c.alternate !== d)
            throw Error(p(190));
        }
        if (3 !== c.tag)
          throw Error(p(188));
        return c.stateNode.current === c ? a : b;
      }
      function Zb(a) {
        a = Yb(a);
        return null !== a ? $b(a) : null;
      }
      function $b(a) {
        if (5 === a.tag || 6 === a.tag)
          return a;
        for (a = a.child; null !== a; ) {
          var b = $b(a);
          if (null !== b)
            return b;
          a = a.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a) {
        if (lc && "function" === typeof lc.onCommitFiberRoot)
          try {
            lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
          } catch (b) {
          }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a) {
        a >>>= 0;
        return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a) {
        switch (a & -a) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a;
        }
      }
      function uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c)
          return 0;
        var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
        if (0 !== g) {
          var h = g & ~e;
          0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
        } else
          g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
        if (0 === d)
          return 0;
        if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240)))
          return b;
        0 !== (d & 4) && (d |= c & 16);
        b = a.entangledLanes;
        if (0 !== b)
          for (a = a.entanglements, b &= d; 0 < b; )
            c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function vc(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 4:
            return b + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a, b) {
        for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
          var g = 31 - oc(f), h = 1 << g, k = e[g];
          if (-1 === k) {
            if (0 === (h & c) || 0 !== (h & d))
              e[g] = vc(h, b);
          } else
            k <= b && (a.expiredLanes |= h);
          f &= ~h;
        }
      }
      function xc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a;
      }
      function zc(a) {
        for (var b = [], c = 0; 31 > c; c++)
          b.push(a);
        return b;
      }
      function Ac(a, b, c) {
        a.pendingLanes |= b;
        536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
        a = a.eventTimes;
        b = 31 - oc(b);
        a[b] = c;
      }
      function Bc(a, b) {
        var c = a.pendingLanes & ~b;
        a.pendingLanes = b;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= b;
        a.mutableReadLanes &= b;
        a.entangledLanes &= b;
        b = a.entanglements;
        var d = a.eventTimes;
        for (a = a.expirationTimes; 0 < c; ) {
          var e = 31 - oc(c), f = 1 << e;
          b[e] = 0;
          d[e] = -1;
          a[e] = -1;
          c &= ~f;
        }
      }
      function Cc(a, b) {
        var c = a.entangledLanes |= b;
        for (a = a.entanglements; c; ) {
          var d = 31 - oc(c), e = 1 << d;
          e & b | a[d] & b && (a[d] |= b);
          c &= ~e;
        }
      }
      var C = 0;
      function Dc(a) {
        a &= -a;
        return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b.pointerId);
        }
      }
      function Tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f)
          return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function Uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return Lc = Tc(Lc, a, b, c, d, e), true;
          case "dragenter":
            return Mc = Tc(Mc, a, b, c, d, e), true;
          case "mouseover":
            return Nc = Tc(Nc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function Vc(a) {
        var b = Wc(a.target);
        if (null !== b) {
          var c = Vb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = Wb(c), null !== b) {
                a.blockedOn = b;
                Ic(a.priority, function() {
                  Gc(c);
                });
                return;
              }
            } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function Xc(a) {
        if (null !== a.blockedOn)
          return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null === c) {
            c = a.nativeEvent;
            var d = new c.constructor(c.type, c);
            wb = d;
            c.target.dispatchEvent(d);
            wb = null;
          } else
            return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function Zc(a, b, c) {
        Xc(a) && c.delete(b);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a, b) {
        a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a) {
        function b(b2) {
          return ad(b2, a);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a);
          for (var c = 1; c < Kc.length; c++) {
            var d = Kc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a);
        null !== Mc && ad(Mc, a);
        null !== Nc && ad(Nc, a);
        Oc.forEach(b);
        Pc.forEach(b);
        for (c = 0; c < Qc.length; c++)
          d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); )
          Vc(c), null === c.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 1, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function gd(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 4, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function fd(a, b, c, d) {
        if (dd) {
          var e = Yc(a, b, c, d);
          if (null === e)
            hd(a, b, d, id, c), Sc(a, d);
          else if (Uc(e, a, b, c, d))
            d.stopPropagation();
          else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
            for (; null !== e; ) {
              var f = Cb(e);
              null !== f && Ec(f);
              f = Yc(a, b, c, d);
              null === f && hd(a, b, d, id, c);
              if (f === e)
                break;
              e = f;
            }
            null !== e && d.stopPropagation();
          } else
            hd(a, b, d, null, c);
        }
      }
      var id = null;
      function Yc(a, b, c, d) {
        id = null;
        a = xb(d);
        a = Wc(a);
        if (null !== a)
          if (b = Vb(a), null === b)
            a = null;
          else if (c = b.tag, 13 === c) {
            a = Wb(b);
            if (null !== a)
              return a;
            a = null;
          } else if (3 === c) {
            if (b.stateNode.current.memoizedState.isDehydrated)
              return 3 === b.tag ? b.stateNode.containerInfo : null;
            a = null;
          } else
            b !== a && (a = null);
        id = a;
        return null;
      }
      function jd(a) {
        switch (a) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md)
          return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++)
          ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++)
          ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a)
            a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a)
          return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b)
            return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which)
              return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie)
          return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length)
                return b.char;
              if (b.which)
                return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b))
          return a;
      }
      function ve(a, b) {
        if ("change" === a)
          return b;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else
          xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          Jb(re, b);
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a)
          return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a)
          return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a)
          return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a, b) {
        if (He(a, b))
          return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b)
          return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length)
          return false;
        for (d = 0; d < c.length; d++) {
          var e = c[d];
          if (!ja.call(b, e) || !He(a[e], b[e]))
            return false;
        }
        return true;
      }
      function Je(a) {
        for (; a && a.firstChild; )
          a = a.firstChild;
        return a;
      }
      function Ke(a, b) {
        var c = Je(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b)
              return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Je(c);
        }
      }
      function Le(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Me() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c)
            a = b.contentWindow;
          else
            break;
          b = Xa(a.document);
        }
        return b;
      }
      function Ne(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      function Oe(a) {
        var b = Me(), c = a.focusedElem, d = a.selectionRange;
        if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
          if (null !== d && Ne(c)) {
            if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c)
              c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
            else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
              a = a.getSelection();
              var e = c.textContent.length, f = Math.min(d.start, e);
              d = void 0 === d.end ? f : Math.min(d.end, e);
              !a.extend && f > d && (e = d, d = f, f = e);
              e = Ke(c, f);
              var g = Ke(
                c,
                d
              );
              e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
            }
          }
          b = [];
          for (a = c; a = a.parentNode; )
            1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
          "function" === typeof c.focus && c.focus();
          for (c = 0; c < b.length; c++)
            a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      function Ve(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a) {
        if (Xe[a])
          return Xe[a];
        if (!We[a])
          return a;
        var b = We[a], c;
        for (c in b)
          if (b.hasOwnProperty(c) && c in Ye)
            return Xe[a] = b[c];
        return a;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a, b) {
        df.set(a, b);
        fa(b, [a]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Ub(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b)
              for (var g = d.length - 1; 0 <= g; g--) {
                var h = d[g], k = h.instance, l = h.currentTarget;
                h = h.listener;
                if (k !== f && e.isPropagationStopped())
                  break a;
                nf(e, h, l);
                f = k;
              }
            else
              for (g = 0; g < d.length; g++) {
                h = d[g];
                k = h.instance;
                l = h.currentTarget;
                h = h.listener;
                if (k !== f && e.isPropagationStopped())
                  break a;
                nf(e, h, l);
                f = k;
              }
          }
        }
        if (Qb)
          throw a = Rb, Qb = false, Rb = null, a;
      }
      function D(a, b) {
        var c = b[of];
        void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
        var d = a + "__bubble";
        c.has(d) || (pf(b, a, 2, false), c.add(d));
      }
      function qf(a, b, c) {
        var d = 0;
        b && (d |= 4);
        pf(c, a, d, b);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a) {
        if (!a[rf]) {
          a[rf] = true;
          da.forEach(function(b2) {
            "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
          });
          var b = 9 === a.nodeType ? a : a.ownerDocument;
          null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
        }
      }
      function pf(a, b, c, d) {
        switch (jd(b)) {
          case 1:
            var e = ed;
            break;
          case 4:
            e = gd;
            break;
          default:
            e = fd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function hd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d)
          a:
            for (; ; ) {
              if (null === d)
                return;
              var g = d.tag;
              if (3 === g || 4 === g) {
                var h = d.stateNode.containerInfo;
                if (h === e || 8 === h.nodeType && h.parentNode === e)
                  break;
                if (4 === g)
                  for (g = d.return; null !== g; ) {
                    var k = g.tag;
                    if (3 === k || 4 === k) {
                      if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e)
                        return;
                    }
                    g = g.return;
                  }
                for (; null !== h; ) {
                  g = Wc(h);
                  if (null === g)
                    return;
                  k = g.tag;
                  if (5 === k || 6 === k) {
                    d = f = g;
                    continue a;
                  }
                  h = h.parentNode;
                }
              }
              d = d.return;
            }
        Jb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = df.get(a);
            if (void 0 !== h2) {
              var k2 = td, n = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c))
                    break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  n = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  n = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button)
                    break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k2 = Hd;
                  break;
                case cf:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
              t = [];
              for (var w = d2, u; null !== w; ) {
                u = w;
                var F = u.stateNode;
                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                if (J)
                  break;
                w = w.return;
              }
              0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf]))
                break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag))
                    n = null;
                } else
                  k2 = null, n = d2;
                if (k2 !== n) {
                  t = Bd;
                  F = "onMouseLeave";
                  x = "onMouseEnter";
                  w = "mouse";
                  if ("pointerout" === a || "pointerover" === a)
                    t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                  J = null == k2 ? h2 : ue(k2);
                  u = null == n ? h2 : ue(n);
                  h2 = new t(F, w + "leave", k2, c, e2);
                  h2.target = J;
                  h2.relatedTarget = u;
                  F = null;
                  Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                  J = F;
                  if (k2 && n)
                    b: {
                      t = k2;
                      x = n;
                      w = 0;
                      for (u = t; u; u = vf(u))
                        w++;
                      u = 0;
                      for (F = x; F; F = vf(F))
                        u++;
                      for (; 0 < w - u; )
                        t = vf(t), w--;
                      for (; 0 < u - w; )
                        x = vf(x), u--;
                      for (; w--; ) {
                        if (t === x || null !== x && t === x.alternate)
                          break b;
                        t = vf(t);
                        x = vf(x);
                      }
                      t = null;
                    }
                  else
                    t = null;
                  null !== k2 && wf(g2, h2, k2, t, false);
                  null !== n && null !== J && wf(g2, J, n, t, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type)
                var na = ve;
              else if (me(h2))
                if (we)
                  na = Fe;
                else {
                  na = De;
                  var xa = Ce;
                }
              else
                (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
              if (na && (na = na(a, d2))) {
                ne(g2, na, c, e2);
                break a;
              }
              xa && xa(a, h2, d2);
              "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
            }
            xa = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable)
                  Qe = xa, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe)
                  break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var $a;
            if (ae)
              b: {
                switch (a) {
                  case "compositionstart":
                    var ba = "onCompositionStart";
                    break b;
                  case "compositionend":
                    ba = "onCompositionEnd";
                    break b;
                  case "compositionupdate":
                    ba = "onCompositionUpdate";
                    break b;
                }
                ba = void 0;
              }
            else
              ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a, c) : ke(a, c))
              d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
          }
          se(g2, b);
        });
      }
      function tf(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function vf(a) {
        if (null === a)
          return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function wf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d)
            break;
          5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a) {
        return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
      }
      function Af(a, b, c) {
        b = zf(b);
        if (zf(a) !== b && c)
          throw Error(p(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a, b) {
        return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
        return Hf.resolve(null).then(a).catch(If);
      } : Ff;
      function If(a) {
        setTimeout(function() {
          throw a;
        });
      }
      function Kf(a, b) {
        var c = b, d = 0;
        do {
          var e = c.nextSibling;
          a.removeChild(c);
          if (e && 8 === e.nodeType)
            if (c = e.data, "/$" === c) {
              if (0 === d) {
                a.removeChild(e);
                bd(b);
                return;
              }
              d--;
            } else
              "$" !== c && "$?" !== c && "$!" !== c || d++;
          c = e;
        } while (c);
        bd(b);
      }
      function Lf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b)
            break;
          if (8 === b) {
            b = a.data;
            if ("$" === b || "$!" === b || "$?" === b)
              break;
            if ("/$" === b)
              return null;
          }
        }
        return a;
      }
      function Mf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b)
                return a;
              b--;
            } else
              "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a) {
        var b = a[Of];
        if (b)
          return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[uf] || c[Of]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child)
              for (a = Mf(a); null !== a; ) {
                if (c = a[Of])
                  return c;
                a = Mf(a);
              }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[Of] || a[uf];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag)
          return a.stateNode;
        throw Error(p(33));
      }
      function Db(a) {
        return a[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a) {
        return { current: a };
      }
      function E(a) {
        0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a, b) {
        Tf++;
        Sf[Tf] = a.current;
        a.current = b;
      }
      var Vf = {};
      var H = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a, b) {
        var c = a.type.contextTypes;
        if (!c)
          return Vf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
          return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c)
          e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Zf(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function $f() {
        E(Wf);
        E(H);
      }
      function ag(a, b, c) {
        if (H.current !== Vf)
          throw Error(p(168));
        G(H, b);
        G(Wf, c);
      }
      function bg(a, b, c) {
        var d = a.stateNode;
        b = b.childContextTypes;
        if ("function" !== typeof d.getChildContext)
          return c;
        d = d.getChildContext();
        for (var e in d)
          if (!(e in b))
            throw Error(p(108, Ra(a) || "Unknown", e));
        return A({}, c, d);
      }
      function cg(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H.current;
        G(H, a);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a, b, c) {
        var d = a.stateNode;
        if (!d)
          throw Error(p(169));
        c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
        G(Wf, c);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a) {
        null === eg ? eg = [a] : eg.push(a);
      }
      function ig(a) {
        fg = true;
        hg(a);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a = 0, b = C;
          try {
            var c = eg;
            for (C = 1; a < c.length; a++) {
              var d = c[a];
              do
                d = d(true);
              while (null !== d);
            }
            eg = null;
            fg = false;
          } catch (e) {
            throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
          } finally {
            C = b, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a, b) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a;
        ng = b;
      }
      function ug(a, b, c) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a;
        var d = rg;
        a = sg;
        var e = 32 - oc(d) - 1;
        d &= ~(1 << e);
        c += 1;
        var f = 32 - oc(b) + e;
        if (30 < f) {
          var g = e - e % 5;
          f = (d & (1 << g) - 1).toString(32);
          d >>= g;
          e -= g;
          rg = 1 << 32 - oc(b) + e | c << e | d;
          sg = f + a;
        } else
          rg = 1 << f | c << e | d, sg = a;
      }
      function vg(a) {
        null !== a.return && (tg(a, 1), ug(a, 1, 0));
      }
      function wg(a) {
        for (; a === mg; )
          mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a === qg; )
          qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I = false;
      var zg = null;
      function Ag(a, b) {
        var c = Bg(5, null, null, 0);
        c.elementType = "DELETED";
        c.stateNode = b;
        c.return = a;
        b = a.deletions;
        null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
      }
      function Cg(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
          case 13:
            return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a) {
        return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
      }
      function Eg(a) {
        if (I) {
          var b = yg;
          if (b) {
            var c = b;
            if (!Cg(a, b)) {
              if (Dg(a))
                throw Error(p(418));
              b = Lf(c.nextSibling);
              var d = xg;
              b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
            }
          } else {
            if (Dg(a))
              throw Error(p(418));
            a.flags = a.flags & -4097 | 2;
            I = false;
            xg = a;
          }
        }
      }
      function Fg(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; )
          a = a.return;
        xg = a;
      }
      function Gg(a) {
        if (a !== xg)
          return false;
        if (!I)
          return Fg(a), I = true, false;
        var b;
        (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
        if (b && (b = yg)) {
          if (Dg(a))
            throw Hg(), Error(p(418));
          for (; b; )
            Ag(a, b), b = Lf(b.nextSibling);
        }
        Fg(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a)
            throw Error(p(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    yg = Lf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else
                  "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            yg = null;
          }
        } else
          yg = xg ? Lf(a.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a = yg; a; )
          a = Lf(a.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I = false;
      }
      function Jg(a) {
        null === zg ? zg = [a] : zg.push(a);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag)
                throw Error(p(309));
              var d = c.stateNode;
            }
            if (!d)
              throw Error(p(147, a));
            var e = d, f = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f)
              return b.ref;
            b = function(a2) {
              var b2 = e.refs;
              null === a2 ? delete b2[f] : b2[f] = a2;
            };
            b._stringRef = f;
            return b;
          }
          if ("string" !== typeof a)
            throw Error(p(284));
          if (!c._owner)
            throw Error(p(290, a));
        }
        return a;
      }
      function Mg(a, b) {
        a = Object.prototype.toString.call(b);
        throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
      }
      function Ng(a) {
        var b = a._init;
        return b(a._payload);
      }
      function Og(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.deletions;
            null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
          }
        }
        function c(c2, d2) {
          if (!a)
            return null;
          for (; null !== d2; )
            b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; )
            null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Pg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a)
            return b2.flags |= 1048576, c2;
          d2 = b2.alternate;
          if (null !== d2)
            return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
          b2.flags |= 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags |= 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag)
            return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          var f2 = c2.type;
          if (f2 === ya)
            return m(a2, b2, c2.props.children, d2, c2.key);
          if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type))
            return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
          d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Lg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
            return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function m(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag)
            return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function q(a2, b2, c2) {
          if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2)
            return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case va:
                return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
              case wa:
                return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
              case Ha:
                var d2 = b2._init;
                return q(a2, d2(b2._payload), c2);
            }
            if (eb(b2) || Ka(b2))
              return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
            Mg(a2, b2);
          }
          return null;
        }
        function r(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2)
            return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case va:
                return c2.key === e2 ? k(a2, b2, c2, d2) : null;
              case wa:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
              case Ha:
                return e2 = c2._init, r(
                  a2,
                  b2,
                  e2(c2._payload),
                  d2
                );
            }
            if (eb(c2) || Ka(c2))
              return null !== e2 ? null : m(a2, b2, c2, d2, null);
            Mg(a2, c2);
          }
          return null;
        }
        function y(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2)
            return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case va:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
              case wa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
              case Ha:
                var f2 = d2._init;
                return y(a2, b2, c2, f2(d2._payload), e2);
            }
            if (eb(d2) || Ka(d2))
              return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
            Mg(b2, d2);
          }
          return null;
        }
        function n(e2, g2, h2, k2) {
          for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
            u.index > w ? (x = u, u = null) : x = u.sibling;
            var n2 = r(e2, u, h2[w], k2);
            if (null === n2) {
              null === u && (u = x);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, w);
            null === m2 ? l2 = n2 : m2.sibling = n2;
            m2 = n2;
            u = x;
          }
          if (w === h2.length)
            return c(e2, u), I && tg(e2, w), l2;
          if (null === u) {
            for (; w < h2.length; w++)
              u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
            I && tg(e2, w);
            return l2;
          }
          for (u = d(e2, u); w < h2.length; w++)
            x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function t(e2, g2, h2, k2) {
          var l2 = Ka(h2);
          if ("function" !== typeof l2)
            throw Error(p(150));
          h2 = l2.call(h2);
          if (null == h2)
            throw Error(p(151));
          for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
            m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
            var t2 = r(e2, m2, n2.value, k2);
            if (null === t2) {
              null === m2 && (m2 = x);
              break;
            }
            a && m2 && null === t2.alternate && b(e2, m2);
            g2 = f(t2, g2, w);
            null === u ? l2 = t2 : u.sibling = t2;
            u = t2;
            m2 = x;
          }
          if (n2.done)
            return c(
              e2,
              m2
            ), I && tg(e2, w), l2;
          if (null === m2) {
            for (; !n2.done; w++, n2 = h2.next())
              n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
            I && tg(e2, w);
            return l2;
          }
          for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next())
            n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          a && m2.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function J(a2, d2, f2, h2) {
          "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
          if ("object" === typeof f2 && null !== f2) {
            switch (f2.$$typeof) {
              case va:
                a: {
                  for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                    if (l2.key === k2) {
                      k2 = f2.type;
                      if (k2 === ya) {
                        if (7 === l2.tag) {
                          c(a2, l2.sibling);
                          d2 = e(l2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                      } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props);
                        d2.ref = Lg(a2, l2, f2);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                      c(a2, l2);
                      break;
                    } else
                      b(a2, l2);
                    l2 = l2.sibling;
                  }
                  f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case wa:
                a: {
                  for (l2 = f2.key; null !== d2; ) {
                    if (d2.key === l2)
                      if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                        c(a2, d2.sibling);
                        d2 = e(d2, f2.children || []);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      } else {
                        c(a2, d2);
                        break;
                      }
                    else
                      b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Sg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
              case Ha:
                return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
            }
            if (eb(f2))
              return n(a2, d2, f2, h2);
            if (Ka(f2))
              return t(a2, d2, f2, h2);
            Mg(a2, f2);
          }
          return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a) {
        var b = Wg.current;
        E(Wg);
        a._currentValue = b;
      }
      function bh(a, b, c) {
        for (; null !== a; ) {
          var d = a.alternate;
          (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
          if (a === c)
            break;
          a = a.return;
        }
      }
      function ch(a, b) {
        Xg = a;
        Zg = Yg = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
      }
      function eh(a) {
        var b = a._currentValue;
        if (Zg !== a)
          if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
            if (null === Xg)
              throw Error(p(308));
            Yg = a;
            Xg.dependencies = { lanes: 0, firstContext: a };
          } else
            Yg = Yg.next = a;
        return b;
      }
      var fh = null;
      function gh(a) {
        null === fh ? fh = [a] : fh.push(a);
      }
      function hh(a, b, c, d) {
        var e = b.interleaved;
        null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
        b.interleaved = c;
        return ih(a, d);
      }
      function ih(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; )
          a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      var jh = false;
      function kh(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function mh(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a, b, c) {
        var d = a.updateQueue;
        if (null === d)
          return null;
        d = d.shared;
        if (0 !== (K & 2)) {
          var e = d.pending;
          null === e ? b.next = b : (b.next = e.next, e.next = b);
          d.pending = b;
          return ih(a, c);
        }
        e = d.interleaved;
        null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
        d.interleaved = b;
        return ih(a, c);
      }
      function oh(a, b, c) {
        b = b.updateQueue;
        if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      function ph(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else
            e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function qh(a, b, c, d) {
        var e = a.updateQueue;
        jh = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var m = a.alternate;
          null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
        }
        if (null !== f) {
          var q = e.baseState;
          g = 0;
          m = l = k = null;
          h = f;
          do {
            var r = h.lane, y = h.eventTime;
            if ((d & r) === r) {
              null !== m && (m = m.next = {
                eventTime: y,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null
              });
              a: {
                var n = a, t = h;
                r = b;
                y = c;
                switch (t.tag) {
                  case 1:
                    n = t.payload;
                    if ("function" === typeof n) {
                      q = n.call(y, q, r);
                      break a;
                    }
                    q = n;
                    break a;
                  case 3:
                    n.flags = n.flags & -65537 | 128;
                  case 0:
                    n = t.payload;
                    r = "function" === typeof n ? n.call(y, q, r) : n;
                    if (null === r || void 0 === r)
                      break a;
                    q = A({}, q, r);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
            } else
              y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
            h = h.next;
            if (null === h)
              if (h = e.shared.pending, null === h)
                break;
              else
                r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
          } while (1);
          null === m && (k = q);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = m;
          b = e.shared.interleaved;
          if (null !== b) {
            e = b;
            do
              g |= e.lane, e = e.next;
            while (e !== b);
          } else
            null === f && (e.shared.lanes = 0);
          rh |= g;
          a.lanes = g;
          a.memoizedState = q;
        }
      }
      function sh(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a)
          for (b = 0; b < a.length; b++) {
            var d = a[b], e = d.callback;
            if (null !== e) {
              d.callback = null;
              d = c;
              if ("function" !== typeof e)
                throw Error(p(191, e));
              e.call(d);
            }
          }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a) {
        if (a === th)
          throw Error(p(174));
        return a;
      }
      function yh(a, b) {
        G(wh, b);
        G(vh, a);
        G(uh, th);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
        }
        E(uh);
        G(uh, b);
      }
      function zh() {
        E(uh);
        E(vh);
        E(wh);
      }
      function Ah(a) {
        xh(wh.current);
        var b = xh(uh.current);
        var c = lb(b, a.type);
        b !== c && (G(vh, a), G(uh, c));
      }
      function Bh(a) {
        vh.current === a && (E(uh), E(vh));
      }
      var L = Uf(0);
      function Ch(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data))
              return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 128))
              return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a)
            break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a)
              return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a = 0; a < Dh.length; a++)
          Dh[a]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M = null;
      var N = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P() {
        throw Error(p(321));
      }
      function Mh(a, b) {
        if (null === b)
          return false;
        for (var c = 0; c < b.length && c < a.length; c++)
          if (!He(a[c], b[c]))
            return false;
        return true;
      }
      function Nh(a, b, c, d, e, f) {
        Hh = f;
        M = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
        a = c(d, e);
        if (Jh) {
          f = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f)
              throw Error(p(301));
            f += 1;
            O = N = null;
            b.updateQueue = null;
            Fh.current = Qh;
            a = c(d, e);
          } while (Jh);
        }
        Fh.current = Rh;
        b = null !== N && null !== N.next;
        Hh = 0;
        O = N = M = null;
        Ih = false;
        if (b)
          throw Error(p(300));
        return a;
      }
      function Sh() {
        var a = 0 !== Kh;
        Kh = 0;
        return a;
      }
      function Th() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
        return O;
      }
      function Uh() {
        if (null === N) {
          var a = M.alternate;
          a = null !== a ? a.memoizedState : null;
        } else
          a = N.next;
        var b = null === O ? M.memoizedState : O.next;
        if (null !== b)
          O = b, N = a;
        else {
          if (null === a)
            throw Error(p(310));
          N = a;
          a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          null === O ? M.memoizedState = O = a : O = O.next = a;
        }
        return O;
      }
      function Vh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Wh(a) {
        var b = Uh(), c = b.queue;
        if (null === c)
          throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = N, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          f = e.next;
          d = d.baseState;
          var h = g = null, k = null, l = f;
          do {
            var m = l.lane;
            if ((Hh & m) === m)
              null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
            else {
              var q = {
                lane: m,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
              };
              null === k ? (h = k = q, g = d) : k = k.next = q;
              M.lanes |= m;
              rh |= m;
            }
            l = l.next;
          } while (null !== l && l !== f);
          null === k ? g = d : k.next = h;
          He(d, b.memoizedState) || (dh = true);
          b.memoizedState = d;
          b.baseState = g;
          b.baseQueue = k;
          c.lastRenderedState = d;
        }
        a = c.interleaved;
        if (null !== a) {
          e = a;
          do
            f = e.lane, M.lanes |= f, rh |= f, e = e.next;
          while (e !== a);
        } else
          null === e && (c.lanes = 0);
        return [b.memoizedState, c.dispatch];
      }
      function Xh(a) {
        var b = Uh(), c = b.queue;
        if (null === c)
          throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (dh = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Yh() {
      }
      function Zh(a, b) {
        var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
        f && (d.memoizedState = e, dh = true);
        d = d.queue;
        $h(ai.bind(null, c, d, a), [a]);
        if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
          c.flags |= 2048;
          bi(9, ci.bind(null, c, d, e, b), void 0, null);
          if (null === Q)
            throw Error(p(349));
          0 !== (Hh & 30) || di(c, b, e);
        }
        return e;
      }
      function di(a, b, c) {
        a.flags |= 16384;
        a = { getSnapshot: b, value: c };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
      }
      function ci(a, b, c, d) {
        b.value = c;
        b.getSnapshot = d;
        ei(b) && fi(a);
      }
      function ai(a, b, c) {
        return c(function() {
          ei(b) && fi(a);
        });
      }
      function ei(a) {
        var b = a.getSnapshot;
        a = a.value;
        try {
          var c = b();
          return !He(a, c);
        } catch (d) {
          return true;
        }
      }
      function fi(a) {
        var b = ih(a, 1);
        null !== b && gi(b, a, 1, -1);
      }
      function hi(a) {
        var b = Th();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
        b.queue = a;
        a = a.dispatch = ii.bind(null, M, a);
        return [b.memoizedState, a];
      }
      function bi(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a, b, c, d) {
        var e = Th();
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function li(a, b, c, d) {
        var e = Uh();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== N) {
          var g = N.memoizedState;
          f = g.destroy;
          if (null !== d && Mh(d, g.deps)) {
            e.memoizedState = bi(b, c, f, d);
            return;
          }
        }
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, f, d);
      }
      function mi(a, b) {
        return ki(8390656, 8, a, b);
      }
      function $h(a, b) {
        return li(2048, 8, a, b);
      }
      function ni(a, b) {
        return li(4, 2, a, b);
      }
      function oi(a, b) {
        return li(4, 4, a, b);
      }
      function pi(a, b) {
        if ("function" === typeof b)
          return a = a(), b(a), function() {
            b(null);
          };
        if (null !== b && void 0 !== b)
          return a = a(), b.current = a, function() {
            b.current = null;
          };
      }
      function qi(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return li(4, 4, pi.bind(null, b, a), c);
      }
      function ri() {
      }
      function si(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1]))
          return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ti(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1]))
          return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function ui(a, b, c) {
        if (0 === (Hh & 21))
          return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
        He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
        return b;
      }
      function vi(a, b) {
        var c = C;
        C = 0 !== c && 4 > c ? c : 4;
        a(true);
        var d = Gh.transition;
        Gh.transition = {};
        try {
          a(false), b();
        } finally {
          C = c, Gh.transition = d;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a, b, c) {
        var d = yi(a);
        c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a))
          Ai(b, c);
        else if (c = hh(a, b, c, d), null !== c) {
          var e = R();
          gi(c, a, d, e);
          Bi(c, b, d);
        }
      }
      function ii(a, b, c) {
        var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a))
          Ai(b, e);
        else {
          var f = a.alternate;
          if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f))
            try {
              var g = b.lastRenderedState, h = f(g, c);
              e.hasEagerState = true;
              e.eagerState = h;
              if (He(h, g)) {
                var k = b.interleaved;
                null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
                b.interleaved = e;
                return;
              }
            } catch (l) {
            } finally {
            }
          c = hh(a, b, e, d);
          null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
        }
      }
      function zi(a) {
        var b = a.alternate;
        return a === M || null !== b && b === M;
      }
      function Ai(a, b) {
        Jh = Ih = true;
        var c = a.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
      function Bi(a, b, c) {
        if (0 !== (c & 4194240)) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a, b) {
        Th().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b, a),
          c
        );
      }, useLayoutEffect: function(a, b) {
        return ki(4194308, 4, a, b);
      }, useInsertionEffect: function(a, b) {
        return ki(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Th();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Th();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        d.queue = a;
        a = a.dispatch = xi.bind(null, M, a);
        return [d.memoizedState, a];
      }, useRef: function(a) {
        var b = Th();
        a = { current: a };
        return b.memoizedState = a;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
        return Th().memoizedState = a;
      }, useTransition: function() {
        var a = hi(false), b = a[0];
        a = vi.bind(null, a[1]);
        Th().memoizedState = a;
        return [b, a];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a, b, c) {
        var d = M, e = Th();
        if (I) {
          if (void 0 === c)
            throw Error(p(407));
          c = c();
        } else {
          c = b();
          if (null === Q)
            throw Error(p(349));
          0 !== (Hh & 30) || di(d, b, c);
        }
        e.memoizedState = c;
        var f = { value: c, getSnapshot: b };
        e.queue = f;
        mi(ai.bind(
          null,
          d,
          f,
          a
        ), [a]);
        d.flags |= 2048;
        bi(9, ci.bind(null, d, f, c, b), void 0, null);
        return c;
      }, useId: function() {
        var a = Th(), b = Q.identifierPrefix;
        if (I) {
          var c = sg;
          var d = rg;
          c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Kh++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else
          c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a) {
          var b = Uh();
          return ui(b, N.memoizedState, a);
        },
        useTransition: function() {
          var a = Wh(Vh)[0], b = Uh().memoizedState;
          return [a, b];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a) {
        var b = Uh();
        return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
      }, useTransition: function() {
        var a = Xh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a, b) {
        if (a && a.defaultProps) {
          b = A({}, b);
          a = a.defaultProps;
          for (var c in a)
            void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      function Di(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : A({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Ei = { isMounted: function(a) {
        return (a = a._reactInternals) ? Vb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = R(), d = yi(a), e = mh(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        b = nh(a, e, d);
        null !== b && (gi(b, a, d, c), oh(b, a, d));
      } };
      function Fi(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
      }
      function Gi(a, b, c) {
        var d = false, e = Vf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Ei;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Hi(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
      }
      function Ii(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = {};
        kh(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4194308);
      }
      function Ji(a, b) {
        try {
          var c = "", d = b;
          do
            c += Pa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e, digest: null };
      }
      function Ki(a, b, c) {
        return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
      }
      function Li(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Oi || (Oi = true, Pi = d);
          Li(a, b);
        };
        return c;
      }
      function Qi(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            return d(e);
          };
          c.callback = function() {
            Li(a, b);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          Li(a, b);
          "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      function Si(a, b, c) {
        var d = a.pingCache;
        if (null === d) {
          d = a.pingCache = new Mi();
          var e = /* @__PURE__ */ new Set();
          d.set(b, e);
        } else
          e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
        e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
      }
      function Ui(a) {
        do {
          var b;
          if (b = 13 === a.tag)
            b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
          if (b)
            return a;
          a = a.return;
        } while (null !== a);
        return null;
      }
      function Vi(a, b, c, d, e) {
        if (0 === (a.mode & 1))
          return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
        a.flags |= 65536;
        a.lanes = e;
        return a;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a, b, c, d) {
        b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
      }
      function Yi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        ch(b, e);
        d = Nh(a, b, c, d, f, e);
        c = Sh();
        if (null !== a && !dh)
          return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && c && vg(b);
        b.flags |= 1;
        Xi(a, b, d, e);
        return b.child;
      }
      function $i(a, b, c, d, e) {
        if (null === a) {
          var f = c.type;
          if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps)
            return b.tag = 15, b.type = f, bj(a, b, f, d, e);
          a = Rg(c.type, null, d, b, b.mode, e);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        f = a.child;
        if (0 === (a.lanes & e)) {
          var g = f.memoizedProps;
          c = c.compare;
          c = null !== c ? c : Ie;
          if (c(g, d) && a.ref === b.ref)
            return Zi(a, b, e);
        }
        b.flags |= 1;
        a = Pg(f, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function bj(a, b, c, d, e) {
        if (null !== a) {
          var f = a.memoizedProps;
          if (Ie(f, d) && a.ref === b.ref)
            if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e))
              0 !== (a.flags & 131072) && (dh = true);
            else
              return b.lanes = a.lanes, Zi(a, b, e);
        }
        return cj(a, b, c, d, e);
      }
      function dj(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode)
          if (0 === (b.mode & 1))
            b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
          else {
            if (0 === (c & 1073741824))
              return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
            b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
            d = null !== f ? f.baseLanes : c;
            G(ej, fj);
            fj |= d;
          }
        else
          null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
        Xi(a, b, e, c);
        return b.child;
      }
      function gj(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c)
          b.flags |= 512, b.flags |= 2097152;
      }
      function cj(a, b, c, d, e) {
        var f = Zf(c) ? Xf : H.current;
        f = Yf(b, f);
        ch(b, e);
        c = Nh(a, b, c, d, f, e);
        d = Sh();
        if (null !== a && !dh)
          return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && d && vg(b);
        b.flags |= 1;
        Xi(a, b, c, e);
        return b.child;
      }
      function hj(a, b, c, d, e) {
        if (Zf(c)) {
          var f = true;
          cg(b);
        } else
          f = false;
        ch(b, e);
        if (null === b.stateNode)
          ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
          var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
          q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
          jh = false;
          var r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          k = b.memoizedState;
          h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
        } else {
          g = b.stateNode;
          lh(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : Ci(b.type, h);
          g.props = l;
          q = b.pendingProps;
          r = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
          var y = c.getDerivedStateFromProps;
          (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
          jh = false;
          r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          var n = b.memoizedState;
          h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
        }
        return jj(a, b, c, d, f, e);
      }
      function jj(a, b, c, d, e, f) {
        gj(a, b);
        var g = 0 !== (b.flags & 128);
        if (!d && !g)
          return e && dg(b, c, false), Zi(a, b, f);
        d = b.stateNode;
        Wi.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
        b.memoizedState = d.state;
        e && dg(b, c, true);
        return b.child;
      }
      function kj(a) {
        var b = a.stateNode;
        b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
        yh(a, b.containerInfo);
      }
      function lj(a, b, c, d, e) {
        Ig();
        Jg(e);
        b.flags |= 256;
        Xi(a, b, c, d);
        return b.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a) {
        return { baseLanes: a, cachePool: null, transitions: null };
      }
      function oj(a, b, c) {
        var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
        (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        if (h)
          f = true, b.flags &= -129;
        else if (null === a || null !== a.memoizedState)
          e |= 1;
        G(L, e & 1);
        if (null === a) {
          Eg(b);
          a = b.memoizedState;
          if (null !== a && (a = a.dehydrated, null !== a))
            return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
          g = d.children;
          a = d.fallback;
          return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
        }
        e = a.memoizedState;
        if (null !== e && (h = e.dehydrated, null !== h))
          return rj(a, b, g, d, h, e, c);
        if (f) {
          f = d.fallback;
          g = b.mode;
          e = a.child;
          h = e.sibling;
          var k = { mode: "hidden", children: d.children };
          0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
          null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
          f.return = b;
          d.return = b;
          d.sibling = f;
          b.child = d;
          d = f;
          f = b.child;
          g = a.child.memoizedState;
          g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
          f.memoizedState = g;
          f.childLanes = a.childLanes & ~c;
          b.memoizedState = mj;
          return d;
        }
        f = a.child;
        a = f.sibling;
        d = Pg(f, { mode: "visible", children: d.children });
        0 === (b.mode & 1) && (d.lanes = c);
        d.return = b;
        d.sibling = null;
        null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
        b.child = d;
        b.memoizedState = null;
        return d;
      }
      function qj(a, b) {
        b = pj({ mode: "visible", children: b }, a.mode, 0, null);
        b.return = a;
        return a.child = b;
      }
      function sj(a, b, c, d) {
        null !== d && Jg(d);
        Ug(b, a.child, null, c);
        a = qj(b, b.pendingProps.children);
        a.flags |= 2;
        b.memoizedState = null;
        return a;
      }
      function rj(a, b, c, d, e, f, g) {
        if (c) {
          if (b.flags & 256)
            return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
          if (null !== b.memoizedState)
            return b.child = a.child, b.flags |= 128, null;
          f = d.fallback;
          e = b.mode;
          d = pj({ mode: "visible", children: d.children }, e, 0, null);
          f = Tg(f, e, g, null);
          f.flags |= 2;
          d.return = b;
          f.return = b;
          d.sibling = f;
          b.child = d;
          0 !== (b.mode & 1) && Ug(b, a.child, null, g);
          b.child.memoizedState = nj(g);
          b.memoizedState = mj;
          return f;
        }
        if (0 === (b.mode & 1))
          return sj(a, b, g, null);
        if ("$!" === e.data) {
          d = e.nextSibling && e.nextSibling.dataset;
          if (d)
            var h = d.dgst;
          d = h;
          f = Error(p(419));
          d = Ki(f, d, void 0);
          return sj(a, b, g, d);
        }
        h = 0 !== (g & a.childLanes);
        if (dh || h) {
          d = Q;
          if (null !== d) {
            switch (g & -g) {
              case 4:
                e = 2;
                break;
              case 16:
                e = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e = 32;
                break;
              case 536870912:
                e = 268435456;
                break;
              default:
                e = 0;
            }
            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
          }
          tj();
          d = Ki(Error(p(421)));
          return sj(a, b, g, d);
        }
        if ("$?" === e.data)
          return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
        a = f.treeContext;
        yg = Lf(e.nextSibling);
        xg = b;
        I = true;
        zg = null;
        null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
        b = qj(b, d.children);
        b.flags |= 4096;
        return b;
      }
      function vj(a, b, c) {
        a.lanes |= b;
        var d = a.alternate;
        null !== d && (d.lanes |= b);
        bh(a.return, b, c);
      }
      function wj(a, b, c, d, e) {
        var f = a.memoizedState;
        null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
      }
      function xj(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        Xi(a, b, d.children, c);
        d = L.current;
        if (0 !== (d & 2))
          d = d & 1 | 2, b.flags |= 128;
        else {
          if (null !== a && 0 !== (a.flags & 128))
            a:
              for (a = b.child; null !== a; ) {
                if (13 === a.tag)
                  null !== a.memoizedState && vj(a, c, b);
                else if (19 === a.tag)
                  vj(a, c, b);
                else if (null !== a.child) {
                  a.child.return = a;
                  a = a.child;
                  continue;
                }
                if (a === b)
                  break a;
                for (; null === a.sibling; ) {
                  if (null === a.return || a.return === b)
                    break a;
                  a = a.return;
                }
                a.sibling.return = a.return;
                a = a.sibling;
              }
          d &= 1;
        }
        G(L, d);
        if (0 === (b.mode & 1))
          b.memoizedState = null;
        else
          switch (e) {
            case "forwards":
              c = b.child;
              for (e = null; null !== c; )
                a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
              c = e;
              null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
              wj(b, false, e, c, f);
              break;
            case "backwards":
              c = null;
              e = b.child;
              for (b.child = null; null !== e; ) {
                a = e.alternate;
                if (null !== a && null === Ch(a)) {
                  b.child = e;
                  break;
                }
                a = e.sibling;
                e.sibling = c;
                c = e;
                e = a;
              }
              wj(b, true, c, null, f);
              break;
            case "together":
              wj(b, false, null, null, void 0);
              break;
            default:
              b.memoizedState = null;
          }
        return b.child;
      }
      function ij(a, b) {
        0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      }
      function Zi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        rh |= b.lanes;
        if (0 === (c & b.childLanes))
          return null;
        if (null !== a && b.child !== a.child)
          throw Error(p(153));
        if (null !== b.child) {
          a = b.child;
          c = Pg(a, a.pendingProps);
          b.child = c;
          for (c.return = b; null !== a.sibling; )
            a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      function yj(a, b, c) {
        switch (b.tag) {
          case 3:
            kj(b);
            Ig();
            break;
          case 5:
            Ah(b);
            break;
          case 1:
            Zf(b.type) && cg(b);
            break;
          case 4:
            yh(b, b.stateNode.containerInfo);
            break;
          case 10:
            var d = b.type._context, e = b.memoizedProps.value;
            G(Wg, d._currentValue);
            d._currentValue = e;
            break;
          case 13:
            d = b.memoizedState;
            if (null !== d) {
              if (null !== d.dehydrated)
                return G(L, L.current & 1), b.flags |= 128, null;
              if (0 !== (c & b.child.childLanes))
                return oj(a, b, c);
              G(L, L.current & 1);
              a = Zi(a, b, c);
              return null !== a ? a.sibling : null;
            }
            G(L, L.current & 1);
            break;
          case 19:
            d = 0 !== (c & b.childLanes);
            if (0 !== (a.flags & 128)) {
              if (d)
                return xj(a, b, c);
              b.flags |= 128;
            }
            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            G(L, L.current);
            if (d)
              break;
            else
              return null;
          case 22:
          case 23:
            return b.lanes = 0, dj(a, b, c);
        }
        return Zi(a, b, c);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag)
            a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b)
            break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b)
              return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          xh(uh.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "select":
              e = A({}, e, { value: void 0 });
              d = A({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
          }
          ub(c, d);
          var g;
          c = null;
          for (l in e)
            if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l])
              if ("style" === l) {
                var h = e[l];
                for (g in h)
                  h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
              } else
                "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h))
              if ("style" === l)
                if (h) {
                  for (g in h)
                    !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
                  for (g in k)
                    k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
                } else
                  c || (f || (f = []), f.push(
                    l,
                    c
                  )), c = k;
              else
                "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
          }
          c && (f = f || []).push("style", c);
          var l = f;
          if (b.updateQueue = l)
            b.flags |= 4;
        }
      };
      Cj = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Dj(a, b) {
        if (!I)
          switch (a.tailMode) {
            case "hidden":
              b = a.tail;
              for (var c = null; null !== b; )
                null !== b.alternate && (c = b), b = b.sibling;
              null === c ? a.tail = null : c.sibling = null;
              break;
            case "collapsed":
              c = a.tail;
              for (var d = null; null !== c; )
                null !== c.alternate && (d = c), c = c.sibling;
              null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
          }
      }
      function S(a) {
        var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
        if (b)
          for (var e = a.child; null !== e; )
            c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
        else
          for (e = a.child; null !== e; )
            c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
        a.subtreeFlags |= d;
        a.childLanes = c;
        return b;
      }
      function Ej(a, b, c) {
        var d = b.pendingProps;
        wg(b);
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S(b), null;
          case 1:
            return Zf(b.type) && $f(), S(b), null;
          case 3:
            d = b.stateNode;
            zh();
            E(Wf);
            E(H);
            Eh();
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child)
              Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a, b);
            S(b);
            return null;
          case 5:
            Bh(b);
            var e = xh(wh.current);
            c = b.type;
            if (null !== a && null != b.stateNode)
              Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            else {
              if (!d) {
                if (null === b.stateNode)
                  throw Error(p(166));
                S(b);
                return null;
              }
              a = xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[Of] = b;
                d[Pf] = f;
                a = 0 !== (b.mode & 1);
                switch (c) {
                  case "dialog":
                    D("cancel", d);
                    D("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++)
                      D(lf[e], d);
                    break;
                  case "source":
                    D("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d
                    );
                    D("load", d);
                    break;
                  case "details":
                    D("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    D("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    D("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), D("invalid", d);
                }
                ub(c, f);
                e = null;
                for (var g in f)
                  if (f.hasOwnProperty(g)) {
                    var h = f[g];
                    "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                      d.textContent,
                      h,
                      a
                    ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                  }
                switch (c) {
                  case "input":
                    Va(d);
                    db(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = Bf);
                }
                d = e;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[Of] = b;
                a[Pf] = d;
                zj(a, b, false, false);
                b.stateNode = a;
                a: {
                  g = vb(c, d);
                  switch (c) {
                    case "dialog":
                      D("cancel", a);
                      D("close", a);
                      e = d;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a);
                      e = d;
                      break;
                    case "video":
                    case "audio":
                      for (e = 0; e < lf.length; e++)
                        D(lf[e], a);
                      e = d;
                      break;
                    case "source":
                      D("error", a);
                      e = d;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a
                      );
                      D("load", a);
                      e = d;
                      break;
                    case "details":
                      D("toggle", a);
                      e = d;
                      break;
                    case "input":
                      Za(a, d);
                      e = Ya(a, d);
                      D("invalid", a);
                      break;
                    case "option":
                      e = d;
                      break;
                    case "select":
                      a._wrapperState = { wasMultiple: !!d.multiple };
                      e = A({}, d, { value: void 0 });
                      D("invalid", a);
                      break;
                    case "textarea":
                      hb(a, d);
                      e = gb(a, d);
                      D("invalid", a);
                      break;
                    default:
                      e = d;
                  }
                  ub(c, e);
                  h = e;
                  for (f in h)
                    if (h.hasOwnProperty(f)) {
                      var k = h[f];
                      "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                    }
                  switch (c) {
                    case "input":
                      Va(a);
                      db(a, d, false);
                      break;
                    case "textarea":
                      Va(a);
                      jb(a);
                      break;
                    case "option":
                      null != d.value && a.setAttribute("value", "" + Sa(d.value));
                      break;
                    case "select":
                      a.multiple = !!d.multiple;
                      f = d.value;
                      null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                        a,
                        !!d.multiple,
                        d.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e.onClick && (a.onclick = Bf);
                  }
                  switch (c) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d = !!d.autoFocus;
                      break a;
                    case "img":
                      d = true;
                      break a;
                    default:
                      d = false;
                  }
                }
                d && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            }
            S(b);
            return null;
          case 6:
            if (a && null != b.stateNode)
              Cj(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode)
                throw Error(p(166));
              c = xh(wh.current);
              xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.memoizedProps;
                d[Of] = b;
                if (f = d.nodeValue !== c) {
                  if (a = xg, null !== a)
                    switch (a.tag) {
                      case 3:
                        Af(d.nodeValue, c, 0 !== (a.mode & 1));
                        break;
                      case 5:
                        true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                    }
                }
                f && (b.flags |= 4);
              } else
                d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
            }
            S(b);
            return null;
          case 13:
            E(L);
            d = b.memoizedState;
            if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
              if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128))
                Hg(), Ig(), b.flags |= 98560, f = false;
              else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                if (null === a) {
                  if (!f)
                    throw Error(p(318));
                  f = b.memoizedState;
                  f = null !== f ? f.dehydrated : null;
                  if (!f)
                    throw Error(p(317));
                  f[Of] = b;
                } else
                  Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
                S(b);
                f = false;
              } else
                null !== zg && (Fj(zg), zg = null), f = true;
              if (!f)
                return b.flags & 65536 ? b : null;
            }
            if (0 !== (b.flags & 128))
              return b.lanes = c, b;
            d = null !== d;
            d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
            null !== b.updateQueue && (b.flags |= 4);
            S(b);
            return null;
          case 4:
            return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
          case 10:
            return ah(b.type._context), S(b), null;
          case 17:
            return Zf(b.type) && $f(), S(b), null;
          case 19:
            E(L);
            f = b.memoizedState;
            if (null === f)
              return S(b), null;
            d = 0 !== (b.flags & 128);
            g = f.rendering;
            if (null === g)
              if (d)
                Dj(f, false);
              else {
                if (0 !== T || null !== a && 0 !== (a.flags & 128))
                  for (a = b.child; null !== a; ) {
                    g = Ch(a);
                    if (null !== g) {
                      b.flags |= 128;
                      Dj(f, false);
                      d = g.updateQueue;
                      null !== d && (b.updateQueue = d, b.flags |= 4);
                      b.subtreeFlags = 0;
                      d = c;
                      for (c = b.child; null !== c; )
                        f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                      G(L, L.current & 1 | 2);
                      return b.child;
                    }
                    a = a.sibling;
                  }
                null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
              }
            else {
              if (!d)
                if (a = Ch(g), null !== a) {
                  if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I)
                    return S(b), null;
                } else
                  2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
              f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
            }
            if (null !== f.tail)
              return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
            S(b);
            return null;
          case 22:
          case 23:
            return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p(156, b.tag));
      }
      function Ij(a, b) {
        wg(b);
        switch (b.tag) {
          case 1:
            return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 3:
            return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
          case 5:
            return Bh(b), null;
          case 13:
            E(L);
            a = b.memoizedState;
            if (null !== a && null !== a.dehydrated) {
              if (null === b.alternate)
                throw Error(p(340));
              Ig();
            }
            a = b.flags;
            return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 19:
            return E(L), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V = null;
      function Lj(a, b) {
        var c = a.ref;
        if (null !== c)
          if ("function" === typeof c)
            try {
              c(null);
            } catch (d) {
              W(a, b, d);
            }
          else
            c.current = null;
      }
      function Mj(a, b, c) {
        try {
          c();
        } catch (d) {
          W(a, b, d);
        }
      }
      var Nj = false;
      function Oj(a, b) {
        Cf = dd;
        a = Me();
        if (Ne(a)) {
          if ("selectionStart" in a)
            var c = { start: a.selectionStart, end: a.selectionEnd };
          else
            a: {
              c = (c = a.ownerDocument) && c.defaultView || window;
              var d = c.getSelection && c.getSelection();
              if (d && 0 !== d.rangeCount) {
                c = d.anchorNode;
                var e = d.anchorOffset, f = d.focusNode;
                d = d.focusOffset;
                try {
                  c.nodeType, f.nodeType;
                } catch (F) {
                  c = null;
                  break a;
                }
                var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
                b:
                  for (; ; ) {
                    for (var y; ; ) {
                      q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                      q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                      3 === q.nodeType && (g += q.nodeValue.length);
                      if (null === (y = q.firstChild))
                        break;
                      r = q;
                      q = y;
                    }
                    for (; ; ) {
                      if (q === a)
                        break b;
                      r === c && ++l === e && (h = g);
                      r === f && ++m === d && (k = g);
                      if (null !== (y = q.nextSibling))
                        break;
                      q = r;
                      r = q.parentNode;
                    }
                    q = y;
                  }
                c = -1 === h || -1 === k ? null : { start: h, end: k };
              } else
                c = null;
            }
          c = c || { start: 0, end: 0 };
        } else
          c = null;
        Df = { focusedElem: a, selectionRange: c };
        dd = false;
        for (V = b; null !== V; )
          if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a)
            a.return = b, V = a;
          else
            for (; null !== V; ) {
              b = V;
              try {
                var n = b.alternate;
                if (0 !== (b.flags & 1024))
                  switch (b.tag) {
                    case 0:
                    case 11:
                    case 15:
                      break;
                    case 1:
                      if (null !== n) {
                        var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                        x.__reactInternalSnapshotBeforeUpdate = w;
                      }
                      break;
                    case 3:
                      var u = b.stateNode.containerInfo;
                      1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                      break;
                    case 5:
                    case 6:
                    case 4:
                    case 17:
                      break;
                    default:
                      throw Error(p(163));
                  }
              } catch (F) {
                W(b, b.return, F);
              }
              a = b.sibling;
              if (null !== a) {
                a.return = b.return;
                V = a;
                break;
              }
              V = b.return;
            }
        n = Nj;
        Nj = false;
        return n;
      }
      function Pj(a, b, c) {
        var d = b.updateQueue;
        d = null !== d ? d.lastEffect : null;
        if (null !== d) {
          var e = d = d.next;
          do {
            if ((e.tag & a) === a) {
              var f = e.destroy;
              e.destroy = void 0;
              void 0 !== f && Mj(b, c, f);
            }
            e = e.next;
          } while (e !== d);
        }
      }
      function Qj(a, b) {
        b = b.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.create;
              c.destroy = d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Rj(a) {
        var b = a.ref;
        if (null !== b) {
          var c = a.stateNode;
          switch (a.tag) {
            case 5:
              a = c;
              break;
            default:
              a = c;
          }
          "function" === typeof b ? b(a) : b.current = a;
        }
      }
      function Sj(a) {
        var b = a.alternate;
        null !== b && (a.alternate = null, Sj(b));
        a.child = null;
        a.deletions = null;
        a.sibling = null;
        5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
        a.stateNode = null;
        a.return = null;
        a.dependencies = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.stateNode = null;
        a.updateQueue = null;
      }
      function Tj(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function Uj(a) {
        a:
          for (; ; ) {
            for (; null === a.sibling; ) {
              if (null === a.return || Tj(a.return))
                return null;
              a = a.return;
            }
            a.sibling.return = a.return;
            for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
              if (a.flags & 2)
                continue a;
              if (null === a.child || 4 === a.tag)
                continue a;
              else
                a.child.return = a, a = a.child;
            }
            if (!(a.flags & 2))
              return a.stateNode;
          }
      }
      function Vj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d)
          a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
        else if (4 !== d && (a = a.child, null !== a))
          for (Vj(a, b, c), a = a.sibling; null !== a; )
            Vj(a, b, c), a = a.sibling;
      }
      function Wj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d)
          a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a))
          for (Wj(a, b, c), a = a.sibling; null !== a; )
            Wj(a, b, c), a = a.sibling;
      }
      var X = null;
      var Xj = false;
      function Yj(a, b, c) {
        for (c = c.child; null !== c; )
          Zj(a, b, c), c = c.sibling;
      }
      function Zj(a, b, c) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount)
          try {
            lc.onCommitFiberUnmount(kc, c);
          } catch (h) {
          }
        switch (c.tag) {
          case 5:
            U || Lj(c, b);
          case 6:
            var d = X, e = Xj;
            X = null;
            Yj(a, b, c);
            X = d;
            Xj = e;
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X.removeChild(c.stateNode));
            break;
          case 18:
            null !== X && (Xj ? (a = X, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X, c.stateNode));
            break;
          case 4:
            d = X;
            e = Xj;
            X = c.stateNode.containerInfo;
            Xj = true;
            Yj(a, b, c);
            X = d;
            Xj = e;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
              e = d = d.next;
              do {
                var f = e, g = f.destroy;
                f = f.tag;
                void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
                e = e.next;
              } while (e !== d);
            }
            Yj(a, b, c);
            break;
          case 1:
            if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount))
              try {
                d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
              } catch (h) {
                W(c, b, h);
              }
            Yj(a, b, c);
            break;
          case 21:
            Yj(a, b, c);
            break;
          case 22:
            c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
            break;
          default:
            Yj(a, b, c);
        }
      }
      function ak(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Kj());
          b.forEach(function(b2) {
            var d = bk.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function ck(a, b) {
        var c = b.deletions;
        if (null !== c)
          for (var d = 0; d < c.length; d++) {
            var e = c[d];
            try {
              var f = a, g = b, h = g;
              a:
                for (; null !== h; ) {
                  switch (h.tag) {
                    case 5:
                      X = h.stateNode;
                      Xj = false;
                      break a;
                    case 3:
                      X = h.stateNode.containerInfo;
                      Xj = true;
                      break a;
                    case 4:
                      X = h.stateNode.containerInfo;
                      Xj = true;
                      break a;
                  }
                  h = h.return;
                }
              if (null === X)
                throw Error(p(160));
              Zj(f, g, e);
              X = null;
              Xj = false;
              var k = e.alternate;
              null !== k && (k.return = null);
              e.return = null;
            } catch (l) {
              W(e, b, l);
            }
          }
        if (b.subtreeFlags & 12854)
          for (b = b.child; null !== b; )
            dk(b, a), b = b.sibling;
      }
      function dk(a, b) {
        var c = a.alternate, d = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b, a);
            ek(a);
            if (d & 4) {
              try {
                Pj(3, a, a.return), Qj(3, a);
              } catch (t) {
                W(a, a.return, t);
              }
              try {
                Pj(5, a, a.return);
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 1:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            break;
          case 5:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            if (a.flags & 32) {
              var e = a.stateNode;
              try {
                ob(e, "");
              } catch (t) {
                W(a, a.return, t);
              }
            }
            if (d & 4 && (e = a.stateNode, null != e)) {
              var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
              a.updateQueue = null;
              if (null !== k)
                try {
                  "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                  vb(h, g);
                  var l = vb(h, f);
                  for (g = 0; g < k.length; g += 2) {
                    var m = k[g], q = k[g + 1];
                    "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                  }
                  switch (h) {
                    case "input":
                      bb(e, f);
                      break;
                    case "textarea":
                      ib(e, f);
                      break;
                    case "select":
                      var r = e._wrapperState.wasMultiple;
                      e._wrapperState.wasMultiple = !!f.multiple;
                      var y = f.value;
                      null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                        e,
                        !!f.multiple,
                        f.defaultValue,
                        true
                      ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                  }
                  e[Pf] = f;
                } catch (t) {
                  W(a, a.return, t);
                }
            }
            break;
          case 6:
            ck(b, a);
            ek(a);
            if (d & 4) {
              if (null === a.stateNode)
                throw Error(p(162));
              e = a.stateNode;
              f = a.memoizedProps;
              try {
                e.nodeValue = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 3:
            ck(b, a);
            ek(a);
            if (d & 4 && null !== c && c.memoizedState.isDehydrated)
              try {
                bd(b.containerInfo);
              } catch (t) {
                W(a, a.return, t);
              }
            break;
          case 4:
            ck(b, a);
            ek(a);
            break;
          case 13:
            ck(b, a);
            ek(a);
            e = a.child;
            e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
            d & 4 && ak(a);
            break;
          case 22:
            m = null !== c && null !== c.memoizedState;
            a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
            ek(a);
            if (d & 8192) {
              l = null !== a.memoizedState;
              if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1))
                for (V = a, m = a.child; null !== m; ) {
                  for (q = V = m; null !== V; ) {
                    r = V;
                    y = r.child;
                    switch (r.tag) {
                      case 0:
                      case 11:
                      case 14:
                      case 15:
                        Pj(4, r, r.return);
                        break;
                      case 1:
                        Lj(r, r.return);
                        var n = r.stateNode;
                        if ("function" === typeof n.componentWillUnmount) {
                          d = r;
                          c = r.return;
                          try {
                            b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                          } catch (t) {
                            W(d, c, t);
                          }
                        }
                        break;
                      case 5:
                        Lj(r, r.return);
                        break;
                      case 22:
                        if (null !== r.memoizedState) {
                          gk(q);
                          continue;
                        }
                    }
                    null !== y ? (y.return = r, V = y) : gk(q);
                  }
                  m = m.sibling;
                }
              a:
                for (m = null, q = a; ; ) {
                  if (5 === q.tag) {
                    if (null === m) {
                      m = q;
                      try {
                        e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                      } catch (t) {
                        W(a, a.return, t);
                      }
                    }
                  } else if (6 === q.tag) {
                    if (null === m)
                      try {
                        q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                      } catch (t) {
                        W(a, a.return, t);
                      }
                  } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                    q.child.return = q;
                    q = q.child;
                    continue;
                  }
                  if (q === a)
                    break a;
                  for (; null === q.sibling; ) {
                    if (null === q.return || q.return === a)
                      break a;
                    m === q && (m = null);
                    q = q.return;
                  }
                  m === q && (m = null);
                  q.sibling.return = q.return;
                  q = q.sibling;
                }
            }
            break;
          case 19:
            ck(b, a);
            ek(a);
            d & 4 && ak(a);
            break;
          case 21:
            break;
          default:
            ck(
              b,
              a
            ), ek(a);
        }
      }
      function ek(a) {
        var b = a.flags;
        if (b & 2) {
          try {
            a: {
              for (var c = a.return; null !== c; ) {
                if (Tj(c)) {
                  var d = c;
                  break a;
                }
                c = c.return;
              }
              throw Error(p(160));
            }
            switch (d.tag) {
              case 5:
                var e = d.stateNode;
                d.flags & 32 && (ob(e, ""), d.flags &= -33);
                var f = Uj(a);
                Wj(a, f, e);
                break;
              case 3:
              case 4:
                var g = d.stateNode.containerInfo, h = Uj(a);
                Vj(a, h, g);
                break;
              default:
                throw Error(p(161));
            }
          } catch (k) {
            W(a, a.return, k);
          }
          a.flags &= -3;
        }
        b & 4096 && (a.flags &= -4097);
      }
      function hk(a, b, c) {
        V = a;
        ik(a, b, c);
      }
      function ik(a, b, c) {
        for (var d = 0 !== (a.mode & 1); null !== V; ) {
          var e = V, f = e.child;
          if (22 === e.tag && d) {
            var g = null !== e.memoizedState || Jj;
            if (!g) {
              var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
              h = Jj;
              var l = U;
              Jj = g;
              if ((U = k) && !l)
                for (V = e; null !== V; )
                  g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
              for (; null !== f; )
                V = f, ik(f, b, c), f = f.sibling;
              V = e;
              Jj = h;
              U = l;
            }
            kk(a, b, c);
          } else
            0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
        }
      }
      function kk(a) {
        for (; null !== V; ) {
          var b = V;
          if (0 !== (b.flags & 8772)) {
            var c = b.alternate;
            try {
              if (0 !== (b.flags & 8772))
                switch (b.tag) {
                  case 0:
                  case 11:
                  case 15:
                    U || Qj(5, b);
                    break;
                  case 1:
                    var d = b.stateNode;
                    if (b.flags & 4 && !U)
                      if (null === c)
                        d.componentDidMount();
                      else {
                        var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                        d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                      }
                    var f = b.updateQueue;
                    null !== f && sh(b, f, d);
                    break;
                  case 3:
                    var g = b.updateQueue;
                    if (null !== g) {
                      c = null;
                      if (null !== b.child)
                        switch (b.child.tag) {
                          case 5:
                            c = b.child.stateNode;
                            break;
                          case 1:
                            c = b.child.stateNode;
                        }
                      sh(b, g, c);
                    }
                    break;
                  case 5:
                    var h = b.stateNode;
                    if (null === c && b.flags & 4) {
                      c = h;
                      var k = b.memoizedProps;
                      switch (b.type) {
                        case "button":
                        case "input":
                        case "select":
                        case "textarea":
                          k.autoFocus && c.focus();
                          break;
                        case "img":
                          k.src && (c.src = k.src);
                      }
                    }
                    break;
                  case 6:
                    break;
                  case 4:
                    break;
                  case 12:
                    break;
                  case 13:
                    if (null === b.memoizedState) {
                      var l = b.alternate;
                      if (null !== l) {
                        var m = l.memoizedState;
                        if (null !== m) {
                          var q = m.dehydrated;
                          null !== q && bd(q);
                        }
                      }
                    }
                    break;
                  case 19:
                  case 17:
                  case 21:
                  case 22:
                  case 23:
                  case 25:
                    break;
                  default:
                    throw Error(p(163));
                }
              U || b.flags & 512 && Rj(b);
            } catch (r) {
              W(b, b.return, r);
            }
          }
          if (b === a) {
            V = null;
            break;
          }
          c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function gk(a) {
        for (; null !== V; ) {
          var b = V;
          if (b === a) {
            V = null;
            break;
          }
          var c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function jk(a) {
        for (; null !== V; ) {
          var b = V;
          try {
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                var c = b.return;
                try {
                  Qj(4, b);
                } catch (k) {
                  W(b, c, k);
                }
                break;
              case 1:
                var d = b.stateNode;
                if ("function" === typeof d.componentDidMount) {
                  var e = b.return;
                  try {
                    d.componentDidMount();
                  } catch (k) {
                    W(b, e, k);
                  }
                }
                var f = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, f, k);
                }
                break;
              case 5:
                var g = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, g, k);
                }
            }
          } catch (k) {
            W(b, b.return, k);
          }
          if (b === a) {
            V = null;
            break;
          }
          var h = b.sibling;
          if (null !== h) {
            h.return = b.return;
            V = h;
            break;
          }
          V = b.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z = 0;
      var fj = 0;
      var ej = Uf(0);
      var T = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R() {
        return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
      }
      function yi(a) {
        if (0 === (a.mode & 1))
          return 1;
        if (0 !== (K & 2) && 0 !== Z)
          return Z & -Z;
        if (null !== Kg.transition)
          return 0 === Bk && (Bk = yc()), Bk;
        a = C;
        if (0 !== a)
          return a;
        a = window.event;
        a = void 0 === a ? 16 : jd(a.type);
        return a;
      }
      function gi(a, b, c, d) {
        if (50 < yk)
          throw yk = 0, zk = null, Error(p(185));
        Ac(a, c, d);
        if (0 === (K & 2) || a !== Q)
          a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
      }
      function Dk(a, b) {
        var c = a.callbackNode;
        wc(a, b);
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d)
          null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
        else if (b = d & -d, a.callbackPriority !== b) {
          null != c && bc(c);
          if (1 === b)
            0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
              0 === (K & 6) && jg();
            }), c = null;
          else {
            switch (Dc(d)) {
              case 1:
                c = fc;
                break;
              case 4:
                c = gc;
                break;
              case 16:
                c = hc;
                break;
              case 536870912:
                c = jc;
                break;
              default:
                c = hc;
            }
            c = Fk(c, Gk.bind(null, a));
          }
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Gk(a, b) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6))
          throw Error(p(327));
        var c = a.callbackNode;
        if (Hk() && a.callbackNode !== c)
          return null;
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d)
          return null;
        if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b)
          b = Ik(a, d);
        else {
          b = d;
          var e = K;
          K |= 2;
          var f = Jk();
          if (Q !== a || Z !== b)
            uk = null, Gj = B() + 500, Kk(a, b);
          do
            try {
              Lk();
              break;
            } catch (h) {
              Mk(a, h);
            }
          while (1);
          $g();
          mk.current = f;
          K = e;
          null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
        }
        if (0 !== b) {
          2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
          if (1 === b)
            throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          if (6 === b)
            Ck(a, d);
          else {
            e = a.current.alternate;
            if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b))
              throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
            a.finishedWork = e;
            a.finishedLanes = d;
            switch (b) {
              case 0:
              case 1:
                throw Error(p(345));
              case 2:
                Pk(a, tk, uk);
                break;
              case 3:
                Ck(a, d);
                if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                  if (0 !== uc(a, 0))
                    break;
                  e = a.suspendedLanes;
                  if ((e & d) !== d) {
                    R();
                    a.pingedLanes |= a.suspendedLanes & e;
                    break;
                  }
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 4:
                Ck(a, d);
                if ((d & 4194240) === d)
                  break;
                b = a.eventTimes;
                for (e = -1; 0 < d; ) {
                  var g = 31 - oc(d);
                  f = 1 << g;
                  g = b[g];
                  g > e && (e = g);
                  d &= ~f;
                }
                d = e;
                d = B() - d;
                d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                if (10 < d) {
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 5:
                Pk(a, tk, uk);
                break;
              default:
                throw Error(p(329));
            }
          }
        }
        Dk(a, B());
        return a.callbackNode === c ? Gk.bind(null, a) : null;
      }
      function Nk(a, b) {
        var c = sk;
        a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
        a = Ik(a, b);
        2 !== a && (b = tk, tk = c, null !== b && Fj(b));
        return a;
      }
      function Fj(a) {
        null === tk ? tk = a : tk.push.apply(tk, a);
      }
      function Ok(a) {
        for (var b = a; ; ) {
          if (b.flags & 16384) {
            var c = b.updateQueue;
            if (null !== c && (c = c.stores, null !== c))
              for (var d = 0; d < c.length; d++) {
                var e = c[d], f = e.getSnapshot;
                e = e.value;
                try {
                  if (!He(f(), e))
                    return false;
                } catch (g) {
                  return false;
                }
              }
          }
          c = b.child;
          if (b.subtreeFlags & 16384 && null !== c)
            c.return = b, b = c;
          else {
            if (b === a)
              break;
            for (; null === b.sibling; ) {
              if (null === b.return || b.return === a)
                return true;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return true;
      }
      function Ck(a, b) {
        b &= ~rk;
        b &= ~qk;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - oc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Ek(a) {
        if (0 !== (K & 6))
          throw Error(p(327));
        Hk();
        var b = uc(a, 0);
        if (0 === (b & 1))
          return Dk(a, B()), null;
        var c = Ik(a, b);
        if (0 !== a.tag && 2 === c) {
          var d = xc(a);
          0 !== d && (b = d, c = Nk(a, d));
        }
        if (1 === c)
          throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
        if (6 === c)
          throw Error(p(345));
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Pk(a, tk, uk);
        Dk(a, B());
        return null;
      }
      function Qk(a, b) {
        var c = K;
        K |= 1;
        try {
          return a(b);
        } finally {
          K = c, 0 === K && (Gj = B() + 500, fg && jg());
        }
      }
      function Rk(a) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b = K;
        K |= 1;
        var c = ok.transition, d = C;
        try {
          if (ok.transition = null, C = 1, a)
            return a();
        } finally {
          C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E(ej);
      }
      function Kk(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, Gf(c));
        if (null !== Y)
          for (c = Y.return; null !== c; ) {
            var d = c;
            wg(d);
            switch (d.tag) {
              case 1:
                d = d.type.childContextTypes;
                null !== d && void 0 !== d && $f();
                break;
              case 3:
                zh();
                E(Wf);
                E(H);
                Eh();
                break;
              case 5:
                Bh(d);
                break;
              case 4:
                zh();
                break;
              case 13:
                E(L);
                break;
              case 19:
                E(L);
                break;
              case 10:
                ah(d.type._context);
                break;
              case 22:
              case 23:
                Hj();
            }
            c = c.return;
          }
        Q = a;
        Y = a = Pg(a.current, null);
        Z = fj = b;
        T = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b = 0; b < fh.length; b++)
            if (c = fh[b], d = c.interleaved, null !== d) {
              c.interleaved = null;
              var e = d.next, f = c.pending;
              if (null !== f) {
                var g = f.next;
                f.next = e;
                d.next = g;
              }
              c.pending = d;
            }
          fh = null;
        }
        return a;
      }
      function Mk(a, b) {
        do {
          var c = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d = M.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N = M = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c || null === c.return) {
              T = 1;
              pk = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = Z;
              h.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k, m = h, q = m.tag;
                if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r = m.alternate;
                  r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
                }
                var y = Ui(g);
                if (null !== y) {
                  y.flags &= -257;
                  Vi(y, g, h, f, b);
                  y.mode & 1 && Si(f, l, b);
                  b = y;
                  k = l;
                  var n = b.updateQueue;
                  if (null === n) {
                    var t = /* @__PURE__ */ new Set();
                    t.add(k);
                    b.updateQueue = t;
                  } else
                    n.add(k);
                  break a;
                } else {
                  if (0 === (b & 1)) {
                    Si(f, l, b);
                    tj();
                    break a;
                  }
                  k = Error(p(426));
                }
              } else if (I && h.mode & 1) {
                var J = Ui(g);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g, h, f, b);
                  Jg(Ji(k, h));
                  break a;
                }
              }
              f = k = Ji(k, h);
              4 !== T && (T = 2);
              null === sk ? sk = [f] : sk.push(f);
              f = g;
              do {
                switch (f.tag) {
                  case 3:
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var x = Ni(f, k, b);
                    ph(f, x);
                    break a;
                  case 1:
                    h = k;
                    var w = f.type, u = f.stateNode;
                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                      f.flags |= 65536;
                      b &= -b;
                      f.lanes |= b;
                      var F = Qi(f, h, b);
                      ph(f, F);
                      break a;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Sk(c);
          } catch (na) {
            b = na;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a = mk.current;
        mk.current = Rh;
        return null === a ? Rh : a;
      }
      function tj() {
        if (0 === T || 3 === T || 2 === T)
          T = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
      }
      function Ik(a, b) {
        var c = K;
        K |= 2;
        var d = Jk();
        if (Q !== a || Z !== b)
          uk = null, Kk(a, b);
        do
          try {
            Tk();
            break;
          } catch (e) {
            Mk(a, e);
          }
        while (1);
        $g();
        K = c;
        mk.current = d;
        if (null !== Y)
          throw Error(p(261));
        Q = null;
        Z = 0;
        return T;
      }
      function Tk() {
        for (; null !== Y; )
          Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); )
          Uk(Y);
      }
      function Uk(a) {
        var b = Vk(a.alternate, a, fj);
        a.memoizedProps = a.pendingProps;
        null === b ? Sk(a) : Y = b;
        nk.current = null;
      }
      function Sk(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 32768)) {
            if (c = Ej(c, b, fj), null !== c) {
              Y = c;
              return;
            }
          } else {
            c = Ij(c, b);
            if (null !== c) {
              c.flags &= 32767;
              Y = c;
              return;
            }
            if (null !== a)
              a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
            else {
              T = 6;
              Y = null;
              return;
            }
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === T && (T = 5);
      }
      function Pk(a, b, c) {
        var d = C, e = ok.transition;
        try {
          ok.transition = null, C = 1, Wk(a, b, c, d);
        } finally {
          ok.transition = e, C = d;
        }
        return null;
      }
      function Wk(a, b, c, d) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6))
          throw Error(p(327));
        c = a.finishedWork;
        var e = a.finishedLanes;
        if (null === c)
          return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current)
          throw Error(p(177));
        a.callbackNode = null;
        a.callbackPriority = 0;
        var f = c.lanes | c.childLanes;
        Bc(a, f);
        a === Q && (Y = Q = null, Z = 0);
        0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f = 0 !== (c.flags & 15990);
        if (0 !== (c.subtreeFlags & 15990) || f) {
          f = ok.transition;
          ok.transition = null;
          var g = C;
          C = 1;
          var h = K;
          K |= 4;
          nk.current = null;
          Oj(a, c);
          dk(c, a);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a.current = c;
          hk(c, a, e);
          dc();
          K = h;
          C = g;
          ok.transition = f;
        } else
          a.current = c;
        vk && (vk = false, wk = a, xk = e);
        f = a.pendingLanes;
        0 === f && (Ri = null);
        mc(c.stateNode, d);
        Dk(a, B());
        if (null !== b)
          for (d = a.onRecoverableError, c = 0; c < b.length; c++)
            e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
        if (Oi)
          throw Oi = false, a = Pi, Pi = null, a;
        0 !== (xk & 1) && 0 !== a.tag && Hk();
        f = a.pendingLanes;
        0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a = Dc(xk), b = ok.transition, c = C;
          try {
            ok.transition = null;
            C = 16 > a ? 16 : a;
            if (null === wk)
              var d = false;
            else {
              a = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6))
                throw Error(p(331));
              var e = K;
              K |= 4;
              for (V = a.current; null !== V; ) {
                var f = V, g = f.child;
                if (0 !== (V.flags & 16)) {
                  var h = f.deletions;
                  if (null !== h) {
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k];
                      for (V = l; null !== V; ) {
                        var m = V;
                        switch (m.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m, f);
                        }
                        var q = m.child;
                        if (null !== q)
                          q.return = m, V = q;
                        else
                          for (; null !== V; ) {
                            m = V;
                            var r = m.sibling, y = m.return;
                            Sj(m);
                            if (m === l) {
                              V = null;
                              break;
                            }
                            if (null !== r) {
                              r.return = y;
                              V = r;
                              break;
                            }
                            V = y;
                          }
                      }
                    }
                    var n = f.alternate;
                    if (null !== n) {
                      var t = n.child;
                      if (null !== t) {
                        n.child = null;
                        do {
                          var J = t.sibling;
                          t.sibling = null;
                          t = J;
                        } while (null !== t);
                      }
                    }
                    V = f;
                  }
                }
                if (0 !== (f.subtreeFlags & 2064) && null !== g)
                  g.return = f, V = g;
                else
                  b:
                    for (; null !== V; ) {
                      f = V;
                      if (0 !== (f.flags & 2048))
                        switch (f.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(9, f, f.return);
                        }
                      var x = f.sibling;
                      if (null !== x) {
                        x.return = f.return;
                        V = x;
                        break b;
                      }
                      V = f.return;
                    }
              }
              var w = a.current;
              for (V = w; null !== V; ) {
                g = V;
                var u = g.child;
                if (0 !== (g.subtreeFlags & 2064) && null !== u)
                  u.return = g, V = u;
                else
                  b:
                    for (g = w; null !== V; ) {
                      h = V;
                      if (0 !== (h.flags & 2048))
                        try {
                          switch (h.tag) {
                            case 0:
                            case 11:
                            case 15:
                              Qj(9, h);
                          }
                        } catch (na) {
                          W(h, h.return, na);
                        }
                      if (h === g) {
                        V = null;
                        break b;
                      }
                      var F = h.sibling;
                      if (null !== F) {
                        F.return = h.return;
                        V = F;
                        break b;
                      }
                      V = h.return;
                    }
              }
              K = e;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot)
                try {
                  lc.onPostCommitFiberRoot(kc, a);
                } catch (na) {
                }
              d = true;
            }
            return d;
          } finally {
            C = c, ok.transition = b;
          }
        }
        return false;
      }
      function Xk(a, b, c) {
        b = Ji(c, b);
        b = Ni(a, b, 1);
        a = nh(a, b, 1);
        b = R();
        null !== a && (Ac(a, 1, b), Dk(a, b));
      }
      function W(a, b, c) {
        if (3 === a.tag)
          Xk(a, a, c);
        else
          for (; null !== b; ) {
            if (3 === b.tag) {
              Xk(b, a, c);
              break;
            } else if (1 === b.tag) {
              var d = b.stateNode;
              if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
                a = Ji(c, a);
                a = Qi(b, a, 1);
                b = nh(b, a, 1);
                a = R();
                null !== b && (Ac(b, 1, a), Dk(b, a));
                break;
              }
            }
            b = b.return;
          }
      }
      function Ti(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = R();
        a.pingedLanes |= a.suspendedLanes & c;
        Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
        Dk(a, b);
      }
      function Yk(a, b) {
        0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c = R();
        a = ih(a, b);
        null !== a && (Ac(a, b, c), Dk(a, c));
      }
      function uj(a) {
        var b = a.memoizedState, c = 0;
        null !== b && (c = b.retryLane);
        Yk(a, c);
      }
      function bk(a, b) {
        var c = 0;
        switch (a.tag) {
          case 13:
            var d = a.stateNode;
            var e = a.memoizedState;
            null !== e && (c = e.retryLane);
            break;
          case 19:
            d = a.stateNode;
            break;
          default:
            throw Error(p(314));
        }
        null !== d && d.delete(b);
        Yk(a, c);
      }
      var Vk;
      Vk = function(a, b, c) {
        if (null !== a)
          if (a.memoizedProps !== b.pendingProps || Wf.current)
            dh = true;
          else {
            if (0 === (a.lanes & c) && 0 === (b.flags & 128))
              return dh = false, yj(a, b, c);
            dh = 0 !== (a.flags & 131072) ? true : false;
          }
        else
          dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            var d = b.type;
            ij(a, b);
            a = b.pendingProps;
            var e = Yf(b, H.current);
            ch(b, c);
            e = Nh(null, b, d, a, e, c);
            var f = Sh();
            b.flags |= 1;
            "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
            return b;
          case 16:
            d = b.elementType;
            a: {
              ij(a, b);
              a = b.pendingProps;
              e = d._init;
              d = e(d._payload);
              b.type = d;
              e = b.tag = Zk(d);
              a = Ci(d, a);
              switch (e) {
                case 0:
                  b = cj(null, b, d, a, c);
                  break a;
                case 1:
                  b = hj(null, b, d, a, c);
                  break a;
                case 11:
                  b = Yi(null, b, d, a, c);
                  break a;
                case 14:
                  b = $i(null, b, d, Ci(d.type, a), c);
                  break a;
              }
              throw Error(p(
                306,
                d,
                ""
              ));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
          case 3:
            a: {
              kj(b);
              if (null === a)
                throw Error(p(387));
              d = b.pendingProps;
              f = b.memoizedState;
              e = f.element;
              lh(a, b);
              qh(b, d, null, c);
              var g = b.memoizedState;
              d = g.element;
              if (f.isDehydrated)
                if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                  e = Ji(Error(p(423)), b);
                  b = lj(a, b, d, c, e);
                  break a;
                } else if (d !== e) {
                  e = Ji(Error(p(424)), b);
                  b = lj(a, b, d, c, e);
                  break a;
                } else
                  for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; )
                    c.flags = c.flags & -3 | 4096, c = c.sibling;
              else {
                Ig();
                if (d === e) {
                  b = Zi(a, b, c);
                  break a;
                }
                Xi(a, b, d, c);
              }
              b = b.child;
            }
            return b;
          case 5:
            return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
          case 6:
            return null === a && Eg(b), null;
          case 13:
            return oj(a, b, c);
          case 4:
            return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
          case 7:
            return Xi(a, b, b.pendingProps, c), b.child;
          case 8:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              f = b.memoizedProps;
              g = e.value;
              G(Wg, d._currentValue);
              d._currentValue = g;
              if (null !== f)
                if (He(f.value, g)) {
                  if (f.children === e.children && !Wf.current) {
                    b = Zi(a, b, c);
                    break a;
                  }
                } else
                  for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                    var h = f.dependencies;
                    if (null !== h) {
                      g = f.child;
                      for (var k = h.firstContext; null !== k; ) {
                        if (k.context === d) {
                          if (1 === f.tag) {
                            k = mh(-1, c & -c);
                            k.tag = 2;
                            var l = f.updateQueue;
                            if (null !== l) {
                              l = l.shared;
                              var m = l.pending;
                              null === m ? k.next = k : (k.next = m.next, m.next = k);
                              l.pending = k;
                            }
                          }
                          f.lanes |= c;
                          k = f.alternate;
                          null !== k && (k.lanes |= c);
                          bh(
                            f.return,
                            c,
                            b
                          );
                          h.lanes |= c;
                          break;
                        }
                        k = k.next;
                      }
                    } else if (10 === f.tag)
                      g = f.type === b.type ? null : f.child;
                    else if (18 === f.tag) {
                      g = f.return;
                      if (null === g)
                        throw Error(p(341));
                      g.lanes |= c;
                      h = g.alternate;
                      null !== h && (h.lanes |= c);
                      bh(g, c, b);
                      g = f.sibling;
                    } else
                      g = f.child;
                    if (null !== g)
                      g.return = f;
                    else
                      for (g = f; null !== g; ) {
                        if (g === b) {
                          g = null;
                          break;
                        }
                        f = g.sibling;
                        if (null !== f) {
                          f.return = g.return;
                          g = f;
                          break;
                        }
                        g = g.return;
                      }
                    f = g;
                  }
              Xi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
          case 14:
            return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
          case 15:
            return bj(a, b, b.type, b.pendingProps, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
          case 19:
            return xj(a, b, c);
          case 22:
            return dj(a, b, c);
        }
        throw Error(p(156, b.tag));
      };
      function Fk(a, b) {
        return ac(a, b);
      }
      function $k(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a, b, c, d) {
        return new $k(a, b, c, d);
      }
      function aj(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function Zk(a) {
        if ("function" === typeof a)
          return aj(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Da)
            return 11;
          if (a === Ga)
            return 14;
        }
        return 2;
      }
      function Pg(a, b) {
        var c = a.alternate;
        null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
        c.flags = a.flags & 14680064;
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Rg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a)
          aj(a) && (g = 1);
        else if ("string" === typeof a)
          g = 5;
        else
          a:
            switch (a) {
              case ya:
                return Tg(c.children, e, f, b);
              case za:
                g = 8;
                e |= 8;
                break;
              case Aa:
                return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
              case Ea:
                return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
              case Fa:
                return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
              case Ia:
                return pj(c, e, f, b);
              default:
                if ("object" === typeof a && null !== a)
                  switch (a.$$typeof) {
                    case Ba:
                      g = 10;
                      break a;
                    case Ca:
                      g = 9;
                      break a;
                    case Da:
                      g = 11;
                      break a;
                    case Ga:
                      g = 14;
                      break a;
                    case Ha:
                      g = 16;
                      d = null;
                      break a;
                  }
                throw Error(p(130, null == a ? a : typeof a, ""));
            }
        b = Bg(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Tg(a, b, c, d) {
        a = Bg(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function pj(a, b, c, d) {
        a = Bg(22, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        a.stateNode = { isHidden: false };
        return a;
      }
      function Qg(a, b, c) {
        a = Bg(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Sg(a, b, c) {
        b = Bg(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function al(a, b, c, d, e) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d;
        this.onRecoverableError = e;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a, b, c, d, e, f, g, h, k) {
        a = new al(a, b, c, h, k);
        1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
        f = Bg(3, null, null, b);
        a.current = f;
        f.stateNode = a;
        f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f);
        return a;
      }
      function cl(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function dl(a) {
        if (!a)
          return Vf;
        a = a._reactInternals;
        a: {
          if (Vb(a) !== a || 1 !== a.tag)
            throw Error(p(170));
          var b = a;
          do {
            switch (b.tag) {
              case 3:
                b = b.stateNode.context;
                break a;
              case 1:
                if (Zf(b.type)) {
                  b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b = b.return;
          } while (null !== b);
          throw Error(p(171));
        }
        if (1 === a.tag) {
          var c = a.type;
          if (Zf(c))
            return bg(a, c, b);
        }
        return b;
      }
      function el(a, b, c, d, e, f, g, h, k) {
        a = bl(c, d, true, a, e, f, g, h, k);
        a.context = dl(null);
        c = a.current;
        d = R();
        e = yi(c);
        f = mh(d, e);
        f.callback = void 0 !== b && null !== b ? b : null;
        nh(c, f, e);
        a.current.lanes = e;
        Ac(a, e, d);
        Dk(a, d);
        return a;
      }
      function fl(a, b, c, d) {
        var e = b.current, f = R(), g = yi(e);
        c = dl(c);
        null === b.context ? b.context = c : b.pendingContext = c;
        b = mh(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        a = nh(e, b, g);
        null !== a && (gi(a, e, g, f), oh(a, e, g));
        return g;
      }
      function gl(a) {
        a = a.current;
        if (!a.child)
          return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function hl(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function il(a, b) {
        hl(a, b);
        (a = a.alternate) && hl(a, b);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a) {
        console.error(a);
      };
      function ll(a) {
        this._internalRoot = a;
      }
      ml.prototype.render = ll.prototype.render = function(a) {
        var b = this._internalRoot;
        if (null === b)
          throw Error(p(409));
        fl(a, b, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a = this._internalRoot;
        if (null !== a) {
          this._internalRoot = null;
          var b = a.containerInfo;
          Rk(function() {
            fl(null, a, null, null);
          });
          b[uf] = null;
        }
      };
      function ml(a) {
        this._internalRoot = a;
      }
      ml.prototype.unstable_scheduleHydration = function(a) {
        if (a) {
          var b = Hc();
          a = { blockedOn: null, target: a, priority: b };
          for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++)
            ;
          Qc.splice(c, 0, a);
          0 === c && Vc(a);
        }
      };
      function nl(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
      }
      function ol(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function pl() {
      }
      function ql(a, b, c, d, e) {
        if (e) {
          if ("function" === typeof d) {
            var f = d;
            d = function() {
              var a2 = gl(g);
              f.call(a2);
            };
          }
          var g = el(b, d, a, 0, null, false, false, "", pl);
          a._reactRootContainer = g;
          a[uf] = g.current;
          sf(8 === a.nodeType ? a.parentNode : a);
          Rk();
          return g;
        }
        for (; e = a.lastChild; )
          a.removeChild(e);
        if ("function" === typeof d) {
          var h = d;
          d = function() {
            var a2 = gl(k);
            h.call(a2);
          };
        }
        var k = bl(a, 0, false, null, null, false, false, "", pl);
        a._reactRootContainer = k;
        a[uf] = k.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk(function() {
          fl(b, k, c, d);
        });
        return k;
      }
      function rl(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = gl(g);
              h.call(a2);
            };
          }
          fl(b, g, a, e);
        } else
          g = ql(c, b, a, e, d);
        return gl(g);
      }
      Ec = function(a) {
        switch (a.tag) {
          case 3:
            var b = a.stateNode;
            if (b.current.memoizedState.isDehydrated) {
              var c = tc(b.pendingLanes);
              0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b2 = ih(a, 1);
              if (null !== b2) {
                var c2 = R();
                gi(b2, a, 1, c2);
              }
            }), il(a, 1);
        }
      };
      Fc = function(a) {
        if (13 === a.tag) {
          var b = ih(a, 134217728);
          if (null !== b) {
            var c = R();
            gi(b, a, 134217728, c);
          }
          il(a, 134217728);
        }
      };
      Gc = function(a) {
        if (13 === a.tag) {
          var b = yi(a), c = ih(a, b);
          if (null !== c) {
            var d = R();
            gi(c, a, b, d);
          }
          il(a, b);
        }
      };
      Hc = function() {
        return C;
      };
      Ic = function(a, b) {
        var c = C;
        try {
          return C = a, b();
        } finally {
          C = c;
        }
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            bb(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; )
                c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e)
                    throw Error(p(90));
                  Wa(d);
                  bb(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = Zb(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber)
          try {
            kc = vl.inject(ul), lc = vl;
          } catch (a) {
          }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b))
          throw Error(p(200));
        return cl(a, b, null, c);
      };
      exports.createRoot = function(a, b) {
        if (!nl(a))
          throw Error(p(299));
        var c = false, d = "", e = kl;
        null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
        b = bl(a, 1, false, null, null, c, false, d, e);
        a[uf] = b.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        return new ll(b);
      };
      exports.findDOMNode = function(a) {
        if (null == a)
          return null;
        if (1 === a.nodeType)
          return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render)
            throw Error(p(188));
          a = Object.keys(a).join(",");
          throw Error(p(268, a));
        }
        a = Zb(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a) {
        return Rk(a);
      };
      exports.hydrate = function(a, b, c) {
        if (!ol(b))
          throw Error(p(200));
        return rl(null, a, b, true, c);
      };
      exports.hydrateRoot = function(a, b, c) {
        if (!nl(a))
          throw Error(p(405));
        var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
        null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
        b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
        a[uf] = b.current;
        sf(a);
        if (d)
          for (a = 0; a < d.length; a++)
            c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
              c,
              e
            );
        return new ml(b);
      };
      exports.render = function(a, b, c) {
        if (!ol(b))
          throw Error(p(200));
        return rl(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!ol(a))
          throw Error(p(40));
        return a._reactRootContainer ? (Rk(function() {
          rl(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!ol(c))
          throw Error(p(200));
        if (null == a || void 0 === a._reactInternals)
          throw Error(p(38));
        return rl(a, b, c, false, d);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module.exports = require_react_dom_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m = require_react_dom();
      if (true) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      var f = require_react();
      var k = Symbol.for("react.element");
      var l = Symbol.for("react.fragment");
      var m = Object.prototype.hasOwnProperty;
      var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p = { key: true, ref: true, __self: true, __source: true };
      function q(c, a, g) {
        var b, d = {}, e = null, h = null;
        void 0 !== g && (e = "" + g);
        void 0 !== a.key && (e = "" + a.key);
        void 0 !== a.ref && (h = a.ref);
        for (b in a)
          m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
        if (c && c.defaultProps)
          for (b in a = c.defaultProps, a)
            void 0 === d[b] && (d[b] = a[b]);
        return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
      }
      exports.Fragment = l;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (true) {
        module.exports = require_react_jsx_runtime_production_min();
      } else {
        module.exports = null;
      }
    }
  });

  // desktop-v2/motadawel/preview/player-entry.tsx
  var import_react5 = __toESM(require_react());
  var import_client = __toESM(require_client());

  // node_modules/@remotion/player/dist/esm/index.mjs
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);

  // node_modules/remotion/dist/esm/index.mjs
  var import_react = __toESM(require_react(), 1);
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var import_react_dom = __toESM(require_react_dom(), 1);
  var NativeLayersContext = (0, import_react.createContext)({
    setClipRegion: () => {
      throw new Error("NativeLayers not set");
    },
    clipRegion: null
  });
  var NativeLayersProvider = ({ children }) => {
    const [clipRegion, setClipRegion] = (0, import_react.useState)(null);
    const context = (0, import_react.useMemo)(() => {
      return {
        setClipRegion,
        clipRegion
      };
    }, [clipRegion, setClipRegion]);
    if (typeof window !== "undefined") {
      (0, import_react.useLayoutEffect)(() => {
        window.remotion_getClipRegion = () => {
          return clipRegion;
        };
      }, [clipRegion, setClipRegion]);
    }
    return (0, import_jsx_runtime.jsx)(NativeLayersContext.Provider, { value: context, children });
  };
  var getRemotionEnvironment = () => {
    const isPlayer = typeof window !== "undefined" && window.remotion_isPlayer;
    const isRendering = typeof window !== "undefined" && typeof window.remotion_puppeteerTimeout !== "undefined";
    const isStudio = typeof window !== "undefined" && window.remotion_isStudio;
    return {
      isStudio,
      isRendering,
      isPlayer
    };
  };
  var originalCreateElement = import_react.default.createElement;
  var componentsToAddStacksTo = [];
  var enableSequenceStackTraces = () => {
    if (!getRemotionEnvironment().isStudio) {
      return;
    }
    const proxy = new Proxy(originalCreateElement, {
      apply(target, thisArg, argArray) {
        if (componentsToAddStacksTo.includes(argArray[0])) {
          const [first, props, ...rest] = argArray;
          const newProps = {
            ...props !== null && props !== void 0 ? props : {},
            stack: new Error().stack
          };
          return Reflect.apply(target, thisArg, [first, newProps, ...rest]);
        }
        return Reflect.apply(target, thisArg, argArray);
      }
    });
    import_react.default.createElement = proxy;
  };
  var addSequenceStackTraces = (component) => {
    componentsToAddStacksTo.push(component);
    enableSequenceStackTraces();
  };
  var IsPlayerContext = (0, import_react.createContext)(false);
  var IsPlayerContextProvider = ({ children }) => {
    return (0, import_jsx_runtime.jsx)(IsPlayerContext.Provider, { value: true, children });
  };
  var useIsPlayer = () => {
    return (0, import_react.useContext)(IsPlayerContext);
  };
  function truthy(value) {
    return Boolean(value);
  }
  var VERSION = "4.0.140";
  var checkMultipleRemotionVersions = () => {
    if (typeof globalThis === "undefined") {
      return;
    }
    const alreadyImported = globalThis.remotion_imported || typeof window !== "undefined" && window.remotion_imported;
    if (alreadyImported) {
      if (alreadyImported === VERSION) {
        return;
      }
      throw new TypeError(`\u{1F6A8} Multiple versions of Remotion detected: ${[
        VERSION,
        typeof alreadyImported === "string" ? alreadyImported : "an older version"
      ].filter(truthy).join(" and ")}. This will cause things to break in an unexpected way.
Check that all your Remotion packages are on the same version. If your dependencies depend on Remotion, make them peer dependencies. You can also run \`npx remotion versions\` from your terminal to see which versions are mismatching.`);
    }
    globalThis.remotion_imported = VERSION;
    if (typeof window !== "undefined") {
      window.remotion_imported = VERSION;
    }
  };
  var AbsoluteFillRefForwarding = (props, ref) => {
    const { style, ...other } = props;
    const actualStyle = (0, import_react.useMemo)(() => {
      return {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ...style
      };
    }, [style]);
    return (0, import_jsx_runtime.jsx)("div", { ref, style: actualStyle, ...other });
  };
  var AbsoluteFill = (0, import_react.forwardRef)(AbsoluteFillRefForwarding);
  var SequenceContext = (0, import_react.createContext)(null);
  var SequenceManager = import_react.default.createContext({
    registerSequence: () => {
      throw new Error("SequenceManagerContext not initialized");
    },
    unregisterSequence: () => {
      throw new Error("SequenceManagerContext not initialized");
    },
    sequences: []
  });
  var SequenceVisibilityToggleContext = import_react.default.createContext({
    hidden: {},
    setHidden: () => {
      throw new Error("SequenceVisibilityToggle not initialized");
    }
  });
  var SequenceManagerProvider = ({ children }) => {
    const [sequences, setSequences] = (0, import_react.useState)([]);
    const [hidden, setHidden] = (0, import_react.useState)({});
    const registerSequence = (0, import_react.useCallback)((seq) => {
      setSequences((seqs) => {
        return [...seqs, seq];
      });
    }, []);
    const unregisterSequence = (0, import_react.useCallback)((seq) => {
      setSequences((seqs) => seqs.filter((s) => s.id !== seq));
    }, []);
    const sequenceContext = (0, import_react.useMemo)(() => {
      return {
        registerSequence,
        sequences,
        unregisterSequence
      };
    }, [registerSequence, sequences, unregisterSequence]);
    const hiddenContext = (0, import_react.useMemo)(() => {
      return {
        hidden,
        setHidden
      };
    }, [hidden]);
    return (0, import_jsx_runtime.jsx)(SequenceManager.Provider, { value: sequenceContext, children: (0, import_jsx_runtime.jsx)(SequenceVisibilityToggleContext.Provider, { value: hiddenContext, children }) });
  };
  var NonceContext = (0, import_react.createContext)({
    getNonce: () => 0,
    fastRefreshes: 0
  });
  var useNonce = () => {
    const context = (0, import_react.useContext)(NonceContext);
    const [nonce, setNonce] = (0, import_react.useState)(() => context.getNonce());
    const lastContext = (0, import_react.useRef)(context);
    (0, import_react.useEffect)(() => {
      if (lastContext.current === context) {
        return;
      }
      lastContext.current = context;
      setNonce(context.getNonce);
    }, [context]);
    return nonce;
  };
  var CompositionManager = (0, import_react.createContext)({
    compositions: [],
    registerComposition: () => void 0,
    unregisterComposition: () => void 0,
    registerFolder: () => void 0,
    unregisterFolder: () => void 0,
    setCurrentCompositionMetadata: () => void 0,
    folders: [],
    currentCompositionMetadata: null,
    canvasContent: null,
    setCanvasContent: () => void 0
  });
  var EditorPropsContext = (0, import_react.createContext)({
    props: {},
    updateProps: () => {
      throw new Error("Not implemented");
    }
  });
  var EditorPropsProvider = ({ children }) => {
    const [props, setProps] = import_react.default.useState({});
    const updateProps = (0, import_react.useCallback)(({ defaultProps, id, newProps }) => {
      setProps((prev) => {
        var _a;
        return {
          ...prev,
          [id]: typeof newProps === "function" ? newProps((_a = prev[id]) !== null && _a !== void 0 ? _a : defaultProps) : newProps
        };
      });
    }, []);
    const ctx = (0, import_react.useMemo)(() => {
      return { props, updateProps };
    }, [props, updateProps]);
    return (0, import_jsx_runtime.jsx)(EditorPropsContext.Provider, { value: ctx, children });
  };
  var problematicCharacters = {
    "%3A": ":",
    "%2F": "/",
    "%3F": "?",
    "%23": "#",
    "%5B": "[",
    "%5D": "]",
    "%40": "@",
    "%21": "!",
    "%24": "$",
    "%26": "&",
    "%27": "'",
    "%28": "(",
    "%29": ")",
    "%2A": "*",
    "%2B": "+",
    "%2C": ",",
    "%3B": ";"
  };
  var didWarn$1 = {};
  var warnOnce$1 = (message) => {
    if (didWarn$1[message]) {
      return;
    }
    console.warn(message);
    didWarn$1[message] = true;
  };
  var includesHexOfUnsafeChar = (path) => {
    for (const key of Object.keys(problematicCharacters)) {
      if (path.includes(key)) {
        return { containsHex: true, hexCode: key };
      }
    }
    return { containsHex: false };
  };
  var trimLeadingSlash = (path) => {
    if (path.startsWith("/")) {
      return trimLeadingSlash(path.substring(1));
    }
    return path;
  };
  var inner = (path) => {
    if (typeof window !== "undefined" && window.remotion_staticBase) {
      if (path.startsWith(window.remotion_staticBase)) {
        throw new Error(`The value "${path}" is already prefixed with the static base ${window.remotion_staticBase}. You don't need to call staticFile() on it.`);
      }
      return `${window.remotion_staticBase}/${trimLeadingSlash(path)}`;
    }
    return `/${trimLeadingSlash(path)}`;
  };
  var encodeBySplitting = (path) => {
    const splitBySlash = path.split("/");
    const encodedArray = splitBySlash.map((element) => {
      return encodeURIComponent(element);
    });
    const merged = encodedArray.join("/");
    return merged;
  };
  var staticFile = (path) => {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      throw new TypeError(`staticFile() does not support remote URLs - got "${path}". Instead, pass the URL without wrapping it in staticFile(). See: https://remotion.dev/docs/staticfile-remote-urls`);
    }
    if (path.startsWith("..") || path.startsWith("./")) {
      throw new TypeError(`staticFile() does not support relative paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    if (path.startsWith("/Users") || path.startsWith("/home") || path.startsWith("/tmp") || path.startsWith("/etc") || path.startsWith("/opt") || path.startsWith("/var") || path.startsWith("C:") || path.startsWith("D:") || path.startsWith("E:")) {
      throw new TypeError(`staticFile() does not support absolute paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    if (path.startsWith("public/")) {
      throw new TypeError(`Do not include the public/ prefix when using staticFile() - got "${path}". See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    const includesHex = includesHexOfUnsafeChar(path);
    if (includesHex.containsHex) {
      warnOnce$1(`WARNING: You seem to pass an already encoded path (path contains ${includesHex.hexCode}). Since Remotion 4.0, the encoding is done by staticFile() itself. You may want to remove a encodeURIComponent() wrapping.`);
    }
    const preprocessed = encodeBySplitting(path);
    const preparsed = inner(preprocessed);
    if (!preparsed.startsWith("/")) {
      return `/${preparsed}`;
    }
    return preparsed;
  };
  var DATE_TOKEN = "remotion-date:";
  var FILE_TOKEN = "remotion-file:";
  var deserializeJSONWithCustomFields = (data) => {
    return JSON.parse(data, (_, value) => {
      if (typeof value === "string" && value.startsWith(DATE_TOKEN)) {
        return new Date(value.replace(DATE_TOKEN, ""));
      }
      if (typeof value === "string" && value.startsWith(FILE_TOKEN)) {
        return staticFile(value.replace(FILE_TOKEN, ""));
      }
      return value;
    });
  };
  var didWarnSSRImport = false;
  var warnOnceSSRImport = () => {
    if (didWarnSSRImport) {
      return;
    }
    didWarnSSRImport = true;
    console.warn("Called `getInputProps()` on the server. This function is not available server-side and has returned an empty object.");
    console.warn("To hide this warning, don't call this function on the server:");
    console.warn("  typeof window === 'undefined' ? {} : getInputProps()");
  };
  var getInputProps = () => {
    if (typeof window === "undefined") {
      warnOnceSSRImport();
      return {};
    }
    if (getRemotionEnvironment().isPlayer) {
      throw new Error("You cannot call `getInputProps()` from a <Player>. Instead, the props are available as React props from component that you passed as `component` prop.");
    }
    const param = window.remotion_inputProps;
    if (!param) {
      return {};
    }
    const parsed = deserializeJSONWithCustomFields(param);
    return parsed;
  };
  var validCodecs = [
    "h264",
    "h265",
    "vp8",
    "vp9",
    "mp3",
    "aac",
    "wav",
    "prores",
    "h264-mkv",
    "h264-ts",
    "gif"
  ];
  function validateDefaultCodec(defaultCodec, location) {
    if (typeof defaultCodec === "undefined") {
      return;
    }
    if (typeof defaultCodec !== "string") {
      throw new TypeError(`The "defaultCodec" prop ${location} must be a string, but you passed a value of type ${typeof defaultCodec}.`);
    }
    if (!validCodecs.includes(defaultCodec)) {
      throw new Error(`The "defaultCodec" prop ${location} must be one of ${validCodecs.join(", ")}, but you passed ${defaultCodec}.`);
    }
  }
  function validateDimension(amount, nameOfProp, location) {
    if (typeof amount !== "number") {
      throw new Error(`The "${nameOfProp}" prop ${location} must be a number, but you passed a value of type ${typeof amount}`);
    }
    if (isNaN(amount)) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must not be NaN, but is NaN.`);
    }
    if (!Number.isFinite(amount)) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be finite, but is ${amount}.`);
    }
    if (amount % 1 !== 0) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be an integer, but is ${amount}.`);
    }
    if (amount <= 0) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be positive, but got ${amount}.`);
    }
  }
  function validateDurationInFrames(durationInFrames, options) {
    const { allowFloats, component } = options;
    if (typeof durationInFrames === "undefined") {
      throw new Error(`The "durationInFrames" prop ${component} is missing.`);
    }
    if (typeof durationInFrames !== "number") {
      throw new Error(`The "durationInFrames" prop ${component} must be a number, but you passed a value of type ${typeof durationInFrames}`);
    }
    if (durationInFrames <= 0) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be positive, but got ${durationInFrames}.`);
    }
    if (!allowFloats && durationInFrames % 1 !== 0) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be an integer, but got ${durationInFrames}.`);
    }
    if (!Number.isFinite(durationInFrames)) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be finite, but got ${durationInFrames}.`);
    }
  }
  function validateFps(fps, location, isGif) {
    if (typeof fps !== "number") {
      throw new Error(`"fps" must be a number, but you passed a value of type ${typeof fps} ${location}`);
    }
    if (!Number.isFinite(fps)) {
      throw new Error(`"fps" must be a finite, but you passed ${fps} ${location}`);
    }
    if (isNaN(fps)) {
      throw new Error(`"fps" must not be NaN, but got ${fps} ${location}`);
    }
    if (fps <= 0) {
      throw new TypeError(`"fps" must be positive, but got ${fps} ${location}`);
    }
    if (isGif && fps > 50) {
      throw new TypeError(`The FPS for a GIF cannot be higher than 50. Use the --every-nth-frame option to lower the FPS: https://remotion.dev/docs/render-as-gif`);
    }
  }
  var validateCalculated = ({ composition, calculated }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const calculateMetadataErrorLocation = `calculated by calculateMetadata() for the composition "${composition.id}"`;
    const defaultErrorLocation = `of the "<Composition />" component with the id "${composition.id}"`;
    const width = (_b = (_a = calculated === null || calculated === void 0 ? void 0 : calculated.width) !== null && _a !== void 0 ? _a : composition.width) !== null && _b !== void 0 ? _b : void 0;
    validateDimension(width, "width", (calculated === null || calculated === void 0 ? void 0 : calculated.width) ? calculateMetadataErrorLocation : defaultErrorLocation);
    const height = (_d = (_c = calculated === null || calculated === void 0 ? void 0 : calculated.height) !== null && _c !== void 0 ? _c : composition.height) !== null && _d !== void 0 ? _d : void 0;
    validateDimension(height, "height", (calculated === null || calculated === void 0 ? void 0 : calculated.height) ? calculateMetadataErrorLocation : defaultErrorLocation);
    const fps = (_f = (_e = calculated === null || calculated === void 0 ? void 0 : calculated.fps) !== null && _e !== void 0 ? _e : composition.fps) !== null && _f !== void 0 ? _f : null;
    validateFps(fps, (calculated === null || calculated === void 0 ? void 0 : calculated.fps) ? calculateMetadataErrorLocation : defaultErrorLocation, false);
    const durationInFrames = (_h = (_g = calculated === null || calculated === void 0 ? void 0 : calculated.durationInFrames) !== null && _g !== void 0 ? _g : composition.durationInFrames) !== null && _h !== void 0 ? _h : null;
    validateDurationInFrames(durationInFrames, {
      allowFloats: false,
      component: `of the "<Composition />" component with the id "${composition.id}"`
    });
    const defaultCodec = calculated === null || calculated === void 0 ? void 0 : calculated.defaultCodec;
    validateDefaultCodec(defaultCodec, calculateMetadataErrorLocation);
    return { width, height, fps, durationInFrames, defaultCodec };
  };
  var resolveVideoConfig = ({ composition, editorProps: editorPropsOrUndefined, signal, inputProps }) => {
    var _a, _b, _c, _d, _e, _f;
    const originalProps = {
      ...(_a = composition.defaultProps) !== null && _a !== void 0 ? _a : {},
      ...editorPropsOrUndefined !== null && editorPropsOrUndefined !== void 0 ? editorPropsOrUndefined : {},
      ...inputProps !== null && inputProps !== void 0 ? inputProps : {}
    };
    const calculatedProm = composition.calculateMetadata ? composition.calculateMetadata({
      defaultProps: (_b = composition.defaultProps) !== null && _b !== void 0 ? _b : {},
      props: originalProps,
      abortSignal: signal,
      compositionId: composition.id
    }) : null;
    if (calculatedProm !== null && typeof calculatedProm === "object" && "then" in calculatedProm) {
      return calculatedProm.then((c) => {
        var _a2, _b2;
        const { height, width, durationInFrames, fps, defaultCodec } = validateCalculated({
          calculated: c,
          composition
        });
        return {
          width,
          height,
          fps,
          durationInFrames,
          id: composition.id,
          defaultProps: (_a2 = composition.defaultProps) !== null && _a2 !== void 0 ? _a2 : {},
          props: (_b2 = c.props) !== null && _b2 !== void 0 ? _b2 : originalProps,
          defaultCodec: defaultCodec !== null && defaultCodec !== void 0 ? defaultCodec : null
        };
      });
    }
    const data = validateCalculated({
      calculated: calculatedProm,
      composition
    });
    if (calculatedProm === null) {
      return {
        ...data,
        id: composition.id,
        defaultProps: (_c = composition.defaultProps) !== null && _c !== void 0 ? _c : {},
        props: originalProps,
        defaultCodec: null
      };
    }
    return {
      ...data,
      id: composition.id,
      defaultProps: (_d = composition.defaultProps) !== null && _d !== void 0 ? _d : {},
      props: (_e = calculatedProm.props) !== null && _e !== void 0 ? _e : originalProps,
      defaultCodec: (_f = calculatedProm.defaultCodec) !== null && _f !== void 0 ? _f : null
    };
  };
  var ResolveCompositionContext = (0, import_react.createContext)(null);
  var resolveCompositionsRef = (0, import_react.createRef)();
  var needsResolution = (composition) => {
    return Boolean(composition.calculateMetadata);
  };
  var ResolveCompositionConfig = ({ children }) => {
    const [currentRenderModalComposition, setCurrentRenderModalComposition] = (0, import_react.useState)(null);
    const { compositions, canvasContent, currentCompositionMetadata } = (0, import_react.useContext)(CompositionManager);
    const selectedComposition = compositions.find((c) => canvasContent && canvasContent.type === "composition" && canvasContent.compositionId === c.id);
    const renderModalComposition = compositions.find((c) => c.id === currentRenderModalComposition);
    const { props: allEditorProps } = (0, import_react.useContext)(EditorPropsContext);
    const [resolvedConfigs, setResolvedConfigs] = (0, import_react.useState)({});
    const selectedEditorProps = (0, import_react.useMemo)(() => {
      var _a;
      return selectedComposition ? (_a = allEditorProps[selectedComposition.id]) !== null && _a !== void 0 ? _a : {} : {};
    }, [allEditorProps, selectedComposition]);
    const renderModalProps = (0, import_react.useMemo)(() => {
      var _a;
      return renderModalComposition ? (_a = allEditorProps[renderModalComposition.id]) !== null && _a !== void 0 ? _a : {} : {};
    }, [allEditorProps, renderModalComposition]);
    const doResolution = (0, import_react.useCallback)((composition, editorProps) => {
      var _a;
      const controller = new AbortController();
      if (currentCompositionMetadata) {
        return controller;
      }
      const inputProps = typeof window === "undefined" || getRemotionEnvironment().isPlayer ? {} : (_a = getInputProps()) !== null && _a !== void 0 ? _a : {};
      const { signal } = controller;
      const promOrNot = resolveVideoConfig({
        composition,
        editorProps,
        inputProps,
        signal
      });
      if (typeof promOrNot === "object" && "then" in promOrNot) {
        setResolvedConfigs((r) => ({
          ...r,
          [composition.id]: {
            type: "loading"
          }
        }));
        promOrNot.then((c) => {
          if (controller.signal.aborted) {
            return;
          }
          setResolvedConfigs((r) => ({
            ...r,
            [composition.id]: {
              type: "success",
              result: c
            }
          }));
        }).catch((err) => {
          if (controller.signal.aborted) {
            return;
          }
          setResolvedConfigs((r) => ({
            ...r,
            [composition.id]: {
              type: "error",
              error: err
            }
          }));
        });
      } else {
        setResolvedConfigs((r) => ({
          ...r,
          [composition.id]: {
            type: "success",
            result: promOrNot
          }
        }));
      }
      return controller;
    }, [currentCompositionMetadata]);
    const currentComposition = (canvasContent === null || canvasContent === void 0 ? void 0 : canvasContent.type) === "composition" ? canvasContent.compositionId : null;
    (0, import_react.useImperativeHandle)(resolveCompositionsRef, () => {
      return {
        setCurrentRenderModalComposition: (id) => {
          setCurrentRenderModalComposition(id);
        },
        reloadCurrentlySelectedComposition: () => {
          var _a;
          if (!currentComposition) {
            return;
          }
          const composition = compositions.find((c) => c.id === currentComposition);
          if (!composition) {
            throw new Error(`Could not find composition with id ${currentComposition}`);
          }
          const editorProps = (_a = allEditorProps[currentComposition]) !== null && _a !== void 0 ? _a : {};
          doResolution(composition, editorProps);
        }
      };
    }, [allEditorProps, compositions, currentComposition, doResolution]);
    const isTheSame = (selectedComposition === null || selectedComposition === void 0 ? void 0 : selectedComposition.id) === (renderModalComposition === null || renderModalComposition === void 0 ? void 0 : renderModalComposition.id);
    (0, import_react.useEffect)(() => {
      if (selectedComposition && needsResolution(selectedComposition)) {
        const controller = doResolution(selectedComposition, selectedEditorProps);
        return () => {
          controller.abort();
        };
      }
    }, [doResolution, selectedComposition, selectedEditorProps]);
    (0, import_react.useEffect)(() => {
      if (renderModalComposition && !isTheSame) {
        const controller = doResolution(renderModalComposition, renderModalProps);
        return () => {
          controller.abort();
        };
      }
    }, [doResolution, isTheSame, renderModalComposition, renderModalProps]);
    const resolvedConfigsIncludingStaticOnes = (0, import_react.useMemo)(() => {
      const staticComps = compositions.filter((c) => {
        return c.calculateMetadata === null;
      });
      return {
        ...resolvedConfigs,
        ...staticComps.reduce((acc, curr) => {
          var _a;
          return {
            ...acc,
            [curr.id]: {
              type: "success",
              result: { ...curr, defaultProps: (_a = curr.defaultProps) !== null && _a !== void 0 ? _a : {} }
            }
          };
        }, {})
      };
    }, [compositions, resolvedConfigs]);
    return (0, import_jsx_runtime.jsx)(ResolveCompositionContext.Provider, { value: resolvedConfigsIncludingStaticOnes, children });
  };
  var useResolvedVideoConfig = (preferredCompositionId) => {
    const context = (0, import_react.useContext)(ResolveCompositionContext);
    const { props: allEditorProps } = (0, import_react.useContext)(EditorPropsContext);
    const { compositions, canvasContent, currentCompositionMetadata } = (0, import_react.useContext)(CompositionManager);
    const currentComposition = (canvasContent === null || canvasContent === void 0 ? void 0 : canvasContent.type) === "composition" ? canvasContent.compositionId : null;
    const compositionId = preferredCompositionId !== null && preferredCompositionId !== void 0 ? preferredCompositionId : currentComposition;
    const composition = compositions.find((c) => c.id === compositionId);
    const selectedEditorProps = (0, import_react.useMemo)(() => {
      var _a;
      return composition ? (_a = allEditorProps[composition.id]) !== null && _a !== void 0 ? _a : {} : {};
    }, [allEditorProps, composition]);
    return (0, import_react.useMemo)(() => {
      var _a, _b, _c, _d;
      if (!composition) {
        return null;
      }
      if (currentCompositionMetadata) {
        return {
          type: "success",
          result: {
            ...currentCompositionMetadata,
            id: composition.id,
            props: currentCompositionMetadata.props,
            defaultProps: (_a = composition.defaultProps) !== null && _a !== void 0 ? _a : {},
            defaultCodec: currentCompositionMetadata.defaultCodec
          }
        };
      }
      if (!needsResolution(composition)) {
        validateDurationInFrames(composition.durationInFrames, {
          allowFloats: false,
          component: `in <Composition id="${composition.id}">`
        });
        validateFps(composition.fps, `in <Composition id="${composition.id}">`, false);
        validateDimension(composition.width, "width", `in <Composition id="${composition.id}">`);
        validateDimension(composition.height, "height", `in <Composition id="${composition.id}">`);
        return {
          type: "success",
          result: {
            width: composition.width,
            height: composition.height,
            fps: composition.fps,
            id: composition.id,
            durationInFrames: composition.durationInFrames,
            defaultProps: (_b = composition.defaultProps) !== null && _b !== void 0 ? _b : {},
            props: {
              ...(_c = composition.defaultProps) !== null && _c !== void 0 ? _c : {},
              ...selectedEditorProps !== null && selectedEditorProps !== void 0 ? selectedEditorProps : {},
              ...typeof window === "undefined" || getRemotionEnvironment().isPlayer ? {} : (_d = getInputProps()) !== null && _d !== void 0 ? _d : {}
            },
            defaultCodec: null
          }
        };
      }
      if (!context[composition.id]) {
        return null;
      }
      return context[composition.id];
    }, [composition, context, currentCompositionMetadata, selectedEditorProps]);
  };
  var useVideo = () => {
    var _a;
    const { canvasContent, compositions, currentCompositionMetadata } = (0, import_react.useContext)(CompositionManager);
    const selected = compositions.find((c) => {
      return (canvasContent === null || canvasContent === void 0 ? void 0 : canvasContent.type) === "composition" && c.id === canvasContent.compositionId;
    });
    const resolved = useResolvedVideoConfig((_a = selected === null || selected === void 0 ? void 0 : selected.id) !== null && _a !== void 0 ? _a : null);
    return (0, import_react.useMemo)(() => {
      var _a2;
      if (!resolved) {
        return null;
      }
      if (resolved.type === "error") {
        return null;
      }
      if (resolved.type === "loading") {
        return null;
      }
      if (!selected) {
        return null;
      }
      return {
        ...resolved.result,
        defaultProps: (_a2 = selected.defaultProps) !== null && _a2 !== void 0 ? _a2 : {},
        id: selected.id,
        // We override the selected metadata with the metadata that was passed to renderMedia(),
        // and don't allow it to be changed during render anymore
        ...currentCompositionMetadata !== null && currentCompositionMetadata !== void 0 ? currentCompositionMetadata : {},
        component: selected.component
      };
    }, [currentCompositionMetadata, resolved, selected]);
  };
  var TimelineContext = (0, import_react.createContext)({
    frame: {},
    playing: false,
    playbackRate: 1,
    rootId: "",
    imperativePlaying: {
      current: false
    },
    setPlaybackRate: () => {
      throw new Error("default");
    },
    audioAndVideoTags: { current: [] }
  });
  var SetTimelineContext = (0, import_react.createContext)({
    setFrame: () => {
      throw new Error("default");
    },
    setPlaying: () => {
      throw new Error("default");
    }
  });
  var makeKey = () => {
    return `remotion.time-all`;
  };
  var persistCurrentFrame = (time) => {
    localStorage.setItem(makeKey(), JSON.stringify(time));
  };
  var getInitialFrameState = () => {
    var _a;
    const item = (_a = localStorage.getItem(makeKey())) !== null && _a !== void 0 ? _a : "{}";
    const obj = JSON.parse(item);
    return obj;
  };
  var getFrameForComposition = (composition) => {
    var _a, _b, _c;
    const item = (_a = localStorage.getItem(makeKey())) !== null && _a !== void 0 ? _a : "{}";
    const obj = JSON.parse(item);
    return obj[composition] ? Number(obj[composition]) : (_c = typeof window === "undefined" ? 0 : (_b = window.remotion_initialFrame) !== null && _b !== void 0 ? _b : 0) !== null && _c !== void 0 ? _c : 0;
  };
  var useTimelinePosition = () => {
    var _a, _b;
    const videoConfig = useVideo();
    const state = (0, import_react.useContext)(TimelineContext);
    if (!videoConfig) {
      return typeof window === "undefined" ? 0 : (_a = window.remotion_initialFrame) !== null && _a !== void 0 ? _a : 0;
    }
    const unclamped = (_b = state.frame[videoConfig.id]) !== null && _b !== void 0 ? _b : typeof window !== "undefined" && window.remotion_isPlayer ? 0 : getFrameForComposition(videoConfig.id);
    return Math.min(videoConfig.durationInFrames - 1, unclamped);
  };
  var useTimelineSetFrame = () => {
    const { setFrame } = (0, import_react.useContext)(SetTimelineContext);
    return setFrame;
  };
  var usePlayingState = () => {
    const { playing, imperativePlaying } = (0, import_react.useContext)(TimelineContext);
    const { setPlaying } = (0, import_react.useContext)(SetTimelineContext);
    return (0, import_react.useMemo)(() => [playing, setPlaying, imperativePlaying], [imperativePlaying, playing, setPlaying]);
  };
  var TimelinePosition = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    TimelineContext,
    SetTimelineContext,
    persistCurrentFrame,
    getInitialFrameState,
    getFrameForComposition,
    useTimelinePosition,
    useTimelineSetFrame,
    usePlayingState
  });
  var CanUseRemotionHooks = (0, import_react.createContext)(false);
  var CanUseRemotionHooksProvider = ({ children }) => {
    return (0, import_jsx_runtime.jsx)(CanUseRemotionHooks.Provider, { value: true, children });
  };
  var useUnsafeVideoConfig = () => {
    var _a, _b, _c;
    const context = (0, import_react.useContext)(SequenceContext);
    const ctxWidth = (_a = context === null || context === void 0 ? void 0 : context.width) !== null && _a !== void 0 ? _a : null;
    const ctxHeight = (_b = context === null || context === void 0 ? void 0 : context.height) !== null && _b !== void 0 ? _b : null;
    const ctxDuration = (_c = context === null || context === void 0 ? void 0 : context.durationInFrames) !== null && _c !== void 0 ? _c : null;
    const video = useVideo();
    return (0, import_react.useMemo)(() => {
      if (!video) {
        return null;
      }
      const { id, durationInFrames, fps, height, width, defaultProps, props, defaultCodec } = video;
      return {
        id,
        width: ctxWidth !== null && ctxWidth !== void 0 ? ctxWidth : width,
        height: ctxHeight !== null && ctxHeight !== void 0 ? ctxHeight : height,
        fps,
        durationInFrames: ctxDuration !== null && ctxDuration !== void 0 ? ctxDuration : durationInFrames,
        defaultProps,
        props,
        defaultCodec
      };
    }, [ctxDuration, ctxHeight, ctxWidth, video]);
  };
  var useVideoConfig = () => {
    const videoConfig = useUnsafeVideoConfig();
    const context = (0, import_react.useContext)(CanUseRemotionHooks);
    const isPlayer = useIsPlayer();
    if (!videoConfig) {
      if (typeof window !== "undefined" && window.remotion_isPlayer || isPlayer) {
        throw new Error([
          "No video config found. Likely reasons:",
          "- You are probably calling useVideoConfig() from outside the component passed to <Player />. See https://www.remotion.dev/docs/player/examples for how to set up the Player correctly.",
          "- You have multiple versions of Remotion installed which causes the React context to get lost."
        ].join("-"));
      }
      throw new Error("No video config found. You are probably calling useVideoConfig() from a component which has not been registered as a <Composition />. See https://www.remotion.dev/docs/the-fundamentals#defining-compositions for more information.");
    }
    if (!context) {
      throw new Error("Called useVideoConfig() outside a Remotion composition.");
    }
    return videoConfig;
  };
  var useCurrentFrame = () => {
    const canUseRemotionHooks = (0, import_react.useContext)(CanUseRemotionHooks);
    if (!canUseRemotionHooks) {
      if (typeof window !== "undefined" && window.remotion_isPlayer) {
        throw new Error(`useCurrentFrame can only be called inside a component that was passed to <Player>. See: https://www.remotion.dev/docs/player/examples`);
      }
      throw new Error(`useCurrentFrame() can only be called inside a component that was registered as a composition. See https://www.remotion.dev/docs/the-fundamentals#defining-compositions`);
    }
    const frame = useTimelinePosition();
    const context = (0, import_react.useContext)(SequenceContext);
    const contextOffset = context ? context.cumulatedFrom + context.relativeFrom : 0;
    return frame - contextOffset;
  };
  var Freeze = ({ frame: frameToFreeze, children, active = true }) => {
    var _a;
    const frame = useCurrentFrame();
    const videoConfig = useVideoConfig();
    if (typeof frameToFreeze === "undefined") {
      throw new Error(`The <Freeze /> component requires a 'frame' prop, but none was passed.`);
    }
    if (typeof frameToFreeze !== "number") {
      throw new Error(`The 'frame' prop of <Freeze /> must be a number, but is of type ${typeof frameToFreeze}`);
    }
    if (Number.isNaN(frameToFreeze)) {
      throw new Error(`The 'frame' prop of <Freeze /> must be a real number, but it is NaN.`);
    }
    if (!Number.isFinite(frameToFreeze)) {
      throw new Error(`The 'frame' prop of <Freeze /> must be a finite number, but it is ${frameToFreeze}.`);
    }
    const isActive = (0, import_react.useMemo)(() => {
      if (typeof active === "boolean") {
        return active;
      }
      if (typeof active === "function") {
        return active(frame);
      }
    }, [active, frame]);
    const timelineContext = (0, import_react.useContext)(TimelineContext);
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    const relativeFrom = (_a = sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom) !== null && _a !== void 0 ? _a : 0;
    const timelineValue = (0, import_react.useMemo)(() => {
      if (!isActive) {
        return timelineContext;
      }
      return {
        ...timelineContext,
        playing: false,
        imperativePlaying: {
          current: false
        },
        frame: {
          [videoConfig.id]: frameToFreeze + relativeFrom
        }
      };
    }, [isActive, timelineContext, videoConfig.id, frameToFreeze, relativeFrom]);
    return (0, import_jsx_runtime.jsx)(TimelineContext.Provider, { value: timelineValue, children });
  };
  var RegularSequenceRefForwardingFunction = ({ from = 0, durationInFrames = Infinity, children, name, height, width, showInTimeline = true, _remotionInternalLoopDisplay: loopDisplay, _remotionInternalStack: stack, _remotionInternalPremountDisplay: premountDisplay, ...other }, ref) => {
    var _a;
    const { layout = "absolute-fill" } = other;
    const [id] = (0, import_react.useState)(() => String(Math.random()));
    const parentSequence = (0, import_react.useContext)(SequenceContext);
    const { rootId } = (0, import_react.useContext)(TimelineContext);
    const cumulatedFrom = parentSequence ? parentSequence.cumulatedFrom + parentSequence.relativeFrom : 0;
    const nonce = useNonce();
    if (layout !== "absolute-fill" && layout !== "none") {
      throw new TypeError(`The layout prop of <Sequence /> expects either "absolute-fill" or "none", but you passed: ${layout}`);
    }
    if (layout === "none" && typeof other.style !== "undefined") {
      throw new TypeError('If layout="none", you may not pass a style.');
    }
    if (typeof durationInFrames !== "number") {
      throw new TypeError(`You passed to durationInFrames an argument of type ${typeof durationInFrames}, but it must be a number.`);
    }
    if (durationInFrames <= 0) {
      throw new TypeError(`durationInFrames must be positive, but got ${durationInFrames}`);
    }
    if (typeof from !== "number") {
      throw new TypeError(`You passed to the "from" props of your <Sequence> an argument of type ${typeof from}, but it must be a number.`);
    }
    if (!Number.isFinite(from)) {
      throw new TypeError(`The "from" prop of a sequence must be finite, but got ${from}.`);
    }
    const absoluteFrame = useTimelinePosition();
    const videoConfig = useVideoConfig();
    const parentSequenceDuration = parentSequence ? Math.min(parentSequence.durationInFrames - from, durationInFrames) : durationInFrames;
    const actualDurationInFrames = Math.max(0, Math.min(videoConfig.durationInFrames - from, parentSequenceDuration));
    const { registerSequence, unregisterSequence } = (0, import_react.useContext)(SequenceManager);
    const { hidden } = (0, import_react.useContext)(SequenceVisibilityToggleContext);
    const premounting = (0, import_react.useMemo)(() => {
      var _a2;
      return (_a2 = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.premounting) !== null && _a2 !== void 0 ? _a2 : Boolean(other._remotionInternalIsPremounting);
    }, [other._remotionInternalIsPremounting, parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.premounting]);
    const contextValue = (0, import_react.useMemo)(() => {
      var _a2, _b, _c;
      return {
        cumulatedFrom,
        relativeFrom: from,
        durationInFrames: actualDurationInFrames,
        parentFrom: (_a2 = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.relativeFrom) !== null && _a2 !== void 0 ? _a2 : 0,
        id,
        height: (_b = height !== null && height !== void 0 ? height : parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.height) !== null && _b !== void 0 ? _b : null,
        width: (_c = width !== null && width !== void 0 ? width : parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.width) !== null && _c !== void 0 ? _c : null,
        premounting
      };
    }, [
      cumulatedFrom,
      from,
      actualDurationInFrames,
      parentSequence,
      id,
      height,
      width,
      premounting
    ]);
    const timelineClipName = (0, import_react.useMemo)(() => {
      return name !== null && name !== void 0 ? name : "";
    }, [name]);
    (0, import_react.useEffect)(() => {
      var _a2;
      if (!getRemotionEnvironment().isStudio) {
        return;
      }
      registerSequence({
        from,
        duration: actualDurationInFrames,
        id,
        displayName: timelineClipName,
        parent: (_a2 = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.id) !== null && _a2 !== void 0 ? _a2 : null,
        type: "sequence",
        rootId,
        showInTimeline,
        nonce,
        loopDisplay,
        stack: stack !== null && stack !== void 0 ? stack : null,
        premountDisplay: premountDisplay !== null && premountDisplay !== void 0 ? premountDisplay : null
      });
      return () => {
        unregisterSequence(id);
      };
    }, [
      durationInFrames,
      id,
      name,
      registerSequence,
      timelineClipName,
      unregisterSequence,
      parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.id,
      actualDurationInFrames,
      rootId,
      from,
      showInTimeline,
      nonce,
      loopDisplay,
      stack,
      premountDisplay
    ]);
    const endThreshold = Math.ceil(cumulatedFrom + from + durationInFrames - 1);
    const content = absoluteFrame < cumulatedFrom + from ? null : absoluteFrame > endThreshold ? null : children;
    const styleIfThere = other.layout === "none" ? void 0 : other.style;
    const defaultStyle = (0, import_react.useMemo)(() => {
      return {
        flexDirection: void 0,
        ...width ? { width } : {},
        ...height ? { height } : {},
        ...styleIfThere !== null && styleIfThere !== void 0 ? styleIfThere : {}
      };
    }, [height, styleIfThere, width]);
    if (ref !== null && layout === "none") {
      throw new TypeError('It is not supported to pass both a `ref` and `layout="none"` to <Sequence />.');
    }
    const isSequenceHidden = (_a = hidden[id]) !== null && _a !== void 0 ? _a : false;
    if (isSequenceHidden) {
      return null;
    }
    return (0, import_jsx_runtime.jsx)(SequenceContext.Provider, { value: contextValue, children: content === null ? null : other.layout === "none" ? content : (0, import_jsx_runtime.jsx)(AbsoluteFill, { ref, style: defaultStyle, className: other.className, children: content }) });
  };
  var RegularSequence = (0, import_react.forwardRef)(RegularSequenceRefForwardingFunction);
  var PremountedSequenceRefForwardingFunction = (props, ref) => {
    const frame = useCurrentFrame();
    if (props.layout === "none") {
      throw new Error('`<Sequence>` with `premountFor` prop does not support layout="none"');
    }
    const { style: passedStyle, from = 0, premountFor = 0, name, ...otherProps } = props;
    const premountingActive = frame < from && frame >= from - premountFor;
    const style = (0, import_react.useMemo)(() => {
      var _a;
      return {
        ...passedStyle,
        opacity: premountingActive ? 0 : 1,
        pointerEvents: premountingActive ? "none" : (_a = passedStyle === null || passedStyle === void 0 ? void 0 : passedStyle.pointerEvents) !== null && _a !== void 0 ? _a : void 0
      };
    }, [premountingActive, passedStyle]);
    return (0, import_jsx_runtime.jsx)(Freeze, { frame: from, active: premountingActive, children: (0, import_jsx_runtime.jsx)(Sequence, { ref, from, style, _remotionInternalPremountDisplay: premountFor, _remotionInternalIsPremounting: premountingActive, ...otherProps }) });
  };
  var PremountedSequence = (0, import_react.forwardRef)(PremountedSequenceRefForwardingFunction);
  var SequenceRefForwardingFunction = (props, ref) => {
    if (props.layout !== "none" && props.premountFor && !getRemotionEnvironment().isRendering) {
      return (0, import_jsx_runtime.jsx)(PremountedSequence, { ...props, ref });
    }
    return (0, import_jsx_runtime.jsx)(RegularSequence, { ...props, ref });
  };
  var Sequence = (0, import_react.forwardRef)(SequenceRefForwardingFunction);
  var getAbsoluteSrc = (relativeSrc) => {
    if (typeof window === "undefined") {
      return relativeSrc;
    }
    return new URL(relativeSrc, window.origin).href;
  };
  var calculateLoopDuration = ({ endAt, mediaDuration, playbackRate, startFrom }) => {
    let duration = mediaDuration;
    if (typeof endAt !== "undefined") {
      duration = endAt;
    }
    if (typeof startFrom !== "undefined") {
      duration -= startFrom;
    }
    const actualDuration = duration / playbackRate;
    return Math.floor(actualDuration);
  };
  var isErrorLike = (err) => {
    if (err === null) {
      return false;
    }
    if (typeof err !== "object") {
      return false;
    }
    if (!("stack" in err)) {
      return false;
    }
    if (typeof err.stack !== "string") {
      return false;
    }
    if (!("message" in err)) {
      return false;
    }
    if (typeof err.message !== "string") {
      return false;
    }
    return true;
  };
  function cancelRender(err) {
    let error;
    if (isErrorLike(err)) {
      error = err;
    } else if (typeof err === "string") {
      error = Error(err);
    } else {
      error = Error("Rendering was cancelled");
    }
    window.remotion_cancelledError = error.stack;
    throw error;
  }
  var Loop = ({ durationInFrames, times = Infinity, children, name, ...props }) => {
    const currentFrame = useCurrentFrame();
    const { durationInFrames: compDuration } = useVideoConfig();
    validateDurationInFrames(durationInFrames, {
      component: "of the <Loop /> component",
      allowFloats: true
    });
    if (typeof times !== "number") {
      throw new TypeError(`You passed to "times" an argument of type ${typeof times}, but it must be a number.`);
    }
    if (times !== Infinity && times % 1 !== 0) {
      throw new TypeError(`The "times" prop of a loop must be an integer, but got ${times}.`);
    }
    if (times < 0) {
      throw new TypeError(`The "times" prop of a loop must be at least 0, but got ${times}`);
    }
    const maxTimes = Math.ceil(compDuration / durationInFrames);
    const actualTimes = Math.min(maxTimes, times);
    const style = props.layout === "none" ? void 0 : props.style;
    const maxFrame = durationInFrames * (actualTimes - 1);
    const start = Math.floor(currentFrame / durationInFrames) * durationInFrames;
    const from = Math.min(start, maxFrame);
    const loopDisplay = (0, import_react.useMemo)(() => {
      return {
        numberOfTimes: actualTimes,
        startOffset: -from,
        durationInFrames
      };
    }, [actualTimes, durationInFrames, from]);
    return (0, import_jsx_runtime.jsx)(Sequence, { durationInFrames, from, name: name !== null && name !== void 0 ? name : "<Loop>", _remotionInternalLoopDisplay: loopDisplay, layout: props.layout, style, children });
  };
  var PreloadContext = (0, import_react.createContext)({});
  var preloads = {};
  var updaters = [];
  var PrefetchProvider = ({ children }) => {
    const [_preloads, _setPreloads] = (0, import_react.useState)(() => preloads);
    (0, import_react.useEffect)(() => {
      const updaterFunction = () => {
        _setPreloads(preloads);
      };
      updaters.push(updaterFunction);
      return () => {
        updaters = updaters.filter((u) => u !== updaterFunction);
      };
    }, []);
    return (0, import_jsx_runtime.jsx)(PreloadContext.Provider, { value: _preloads, children });
  };
  var usePreload = (src) => {
    var _a;
    const preloads2 = (0, import_react.useContext)(PreloadContext);
    return (_a = preloads2[src]) !== null && _a !== void 0 ? _a : src;
  };
  var validateMediaProps = (props, component) => {
    if (typeof props.volume !== "number" && typeof props.volume !== "function" && typeof props.volume !== "undefined") {
      throw new TypeError(`You have passed a volume of type ${typeof props.volume} to your <${component} /> component. Volume must be a number or a function with the signature '(frame: number) => number' undefined.`);
    }
    if (typeof props.volume === "number" && props.volume < 0) {
      throw new TypeError(`You have passed a volume below 0 to your <${component} /> component. Volume must be between 0 and 1`);
    }
    if (typeof props.playbackRate !== "number" && typeof props.playbackRate !== "undefined") {
      throw new TypeError(`You have passed a playbackRate of type ${typeof props.playbackRate} to your <${component} /> component. Playback rate must a real number or undefined.`);
    }
    if (typeof props.playbackRate === "number" && (isNaN(props.playbackRate) || !Number.isFinite(props.playbackRate) || props.playbackRate <= 0)) {
      throw new TypeError(`You have passed a playbackRate of ${props.playbackRate} to your <${component} /> component. Playback rate must be a real number above 0.`);
    }
  };
  var validateStartFromProps = (startFrom, endAt) => {
    if (typeof startFrom !== "undefined") {
      if (typeof startFrom !== "number") {
        throw new TypeError(`type of startFrom prop must be a number, instead got type ${typeof startFrom}.`);
      }
      if (isNaN(startFrom) || startFrom === Infinity) {
        throw new TypeError("startFrom prop can not be NaN or Infinity.");
      }
      if (startFrom < 0) {
        throw new TypeError(`startFrom must be greater than equal to 0 instead got ${startFrom}.`);
      }
    }
    if (typeof endAt !== "undefined") {
      if (typeof endAt !== "number") {
        throw new TypeError(`type of endAt prop must be a number, instead got type ${typeof endAt}.`);
      }
      if (isNaN(endAt)) {
        throw new TypeError("endAt prop can not be NaN.");
      }
      if (endAt <= 0) {
        throw new TypeError(`endAt must be a positive number, instead got ${endAt}.`);
      }
    }
    if (endAt < startFrom) {
      throw new TypeError("endAt prop must be greater than startFrom prop.");
    }
  };
  var durationReducer = (state, action) => {
    switch (action.type) {
      case "got-duration":
        return {
          ...state,
          [getAbsoluteSrc(action.src)]: action.durationInSeconds
        };
      default:
        return state;
    }
  };
  var DurationsContext = (0, import_react.createContext)({
    durations: {},
    setDurations: () => {
      throw new Error("context missing");
    }
  });
  var DurationsContextProvider = ({ children }) => {
    const [durations, setDurations] = (0, import_react.useReducer)(durationReducer, {});
    const value = (0, import_react.useMemo)(() => {
      return {
        durations,
        setDurations
      };
    }, [durations]);
    return (0, import_jsx_runtime.jsx)(DurationsContext.Provider, { value, children });
  };
  function mulberry32(a) {
    let t = a + 1831565813;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
  function hashCode(str) {
    let i = 0;
    let chr = 0;
    let hash = 0;
    for (i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0;
    }
    return hash;
  }
  var random = (seed, dummy) => {
    if (dummy !== void 0) {
      throw new TypeError("random() takes only one argument");
    }
    if (seed === null) {
      return Math.random();
    }
    if (typeof seed === "string") {
      return mulberry32(hashCode(seed));
    }
    if (typeof seed === "number") {
      return mulberry32(seed * 1e10);
    }
    throw new Error("random() argument must be a number or a string");
  };
  var useBufferManager = () => {
    const [blocks, setBlocks] = (0, import_react.useState)([]);
    const [onBufferingCallbacks, setOnBufferingCallbacks] = (0, import_react.useState)([]);
    const [onResumeCallbacks, setOnResumeCallbacks] = (0, import_react.useState)([]);
    const buffering = (0, import_react.useRef)(false);
    const addBlock = (0, import_react.useCallback)((block) => {
      setBlocks((b) => [...b, block]);
      return {
        unblock: () => {
          setBlocks((b) => b.filter((bx) => bx !== block));
        }
      };
    }, []);
    const listenForBuffering = (0, import_react.useCallback)((callback) => {
      setOnBufferingCallbacks((c) => [...c, callback]);
      return {
        remove: () => {
          setOnBufferingCallbacks((c) => c.filter((cb) => cb !== callback));
        }
      };
    }, []);
    const listenForResume = (0, import_react.useCallback)((callback) => {
      setOnResumeCallbacks((c) => [...c, callback]);
      return {
        remove: () => {
          setOnResumeCallbacks((c) => c.filter((cb) => cb !== callback));
        }
      };
    }, []);
    (0, import_react.useEffect)(() => {
      if (blocks.length > 0) {
        onBufferingCallbacks.forEach((c) => c());
      } else {
        onResumeCallbacks.forEach((c) => c());
      }
    }, [blocks, onBufferingCallbacks, onResumeCallbacks]);
    return (0, import_react.useMemo)(() => {
      return { addBlock, listenForBuffering, listenForResume, buffering };
    }, [addBlock, buffering, listenForBuffering, listenForResume]);
  };
  var BufferingContextReact = import_react.default.createContext(null);
  var BufferingProvider = ({ children }) => {
    const bufferManager = useBufferManager();
    return (0, import_jsx_runtime.jsx)(BufferingContextReact.Provider, { value: bufferManager, children });
  };
  var useBufferState = () => {
    const buffer = (0, import_react.useContext)(BufferingContextReact);
    return (0, import_react.useMemo)(() => ({
      delayPlayback: () => {
        if (!buffer) {
          throw new Error("Tried to enable the buffering state, but a Remotion context was not found. This API can only be called in a component that was passed to the Remotion Player or a <Composition>. Or you might have experienced a version mismatch - run `npx remotion versions` and ensure all packages have the same version. This error is thrown by the buffer state https://remotion.dev/docs/player/buffer-state");
        }
        const { unblock } = buffer.addBlock({
          id: String(Math.random())
        });
        return { unblock };
      }
    }), [buffer]);
  };
  var useMediaBuffering = ({ element, shouldBuffer, isPremounting }) => {
    const buffer = useBufferState();
    (0, import_react.useEffect)(() => {
      let cleanup = () => void 0;
      const { current } = element;
      if (!current) {
        return;
      }
      if (!shouldBuffer) {
        return;
      }
      if (isPremounting) {
        return;
      }
      const onWaiting = () => {
        const { unblock } = buffer.delayPlayback();
        const onCanPlay = () => {
          unblock();
        };
        current.addEventListener("canplay", onCanPlay, {
          once: true
        });
        cleanup = () => {
          current.removeEventListener("canplay", onCanPlay);
          unblock();
          return void 0;
        };
      };
      if (current.readyState < current.HAVE_FUTURE_DATA) {
        onWaiting();
      } else {
        current.addEventListener("waiting", onWaiting);
      }
      return () => {
        cleanup();
      };
    }, [buffer, element, isPremounting, shouldBuffer]);
  };
  var useMediaStartsAt = () => {
    var _a;
    const parentSequence = (0, import_react.useContext)(SequenceContext);
    const startsAt = Math.min(0, (_a = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.relativeFrom) !== null && _a !== void 0 ? _a : 0);
    return startsAt;
  };
  var useFrameForVolumeProp = () => {
    const frame = useCurrentFrame();
    const startsAt = useMediaStartsAt();
    return frame + startsAt;
  };
  var getAssetDisplayName = (filename) => {
    if (/data:|blob:/.test(filename.substring(0, 5))) {
      return "Data URL";
    }
    const splitted = filename.split("/").map((s) => s.split("\\")).flat(1);
    return splitted[splitted.length - 1];
  };
  var playAndHandleNotAllowedError = (mediaRef, mediaType) => {
    const { current } = mediaRef;
    if (!current) {
      return;
    }
    const prom = current.play();
    if (prom.catch) {
      prom.catch((err) => {
        if (!current) {
          return;
        }
        if (err.message.includes("request was interrupted by a call to pause")) {
          return;
        }
        if (err.message.includes("The operation was aborted.")) {
          return;
        }
        if (err.message.includes("The fetching process for the media resource was aborted by the user agent")) {
          return;
        }
        if (err.message.includes("request was interrupted by a new load request")) {
          return;
        }
        if (err.message.includes("because the media was removed from the document")) {
          return;
        }
        console.log(`Could not play ${mediaType} due to following error: `, err);
        if (!current.muted) {
          console.log(`The video will be muted and we'll retry playing it.`, err);
          current.muted = true;
          current.play();
        }
      });
    }
  };
  var evaluateVolume = ({ frame, volume, mediaVolume = 1, allowAmplificationDuringRender }) => {
    const maxVolume = allowAmplificationDuringRender ? Infinity : 1;
    if (typeof volume === "number") {
      return Math.min(maxVolume, volume * mediaVolume);
    }
    if (typeof volume === "undefined") {
      return Number(mediaVolume);
    }
    const evaluated = volume(frame) * mediaVolume;
    if (typeof evaluated !== "number") {
      throw new TypeError(`You passed in a a function to the volume prop but it did not return a number but a value of type ${typeof evaluated} for frame ${frame}`);
    }
    if (Number.isNaN(evaluated)) {
      throw new TypeError(`You passed in a function to the volume prop but it returned NaN for frame ${frame}.`);
    }
    if (!Number.isFinite(evaluated)) {
      throw new TypeError(`You passed in a function to the volume prop but it returned a non-finite number for frame ${frame}.`);
    }
    return Math.max(0, Math.min(maxVolume, evaluated));
  };
  var didWarn = {};
  var warnOnce = (message) => {
    if (didWarn[message]) {
      return;
    }
    console.warn(message);
    didWarn[message] = true;
  };
  var useMediaInTimeline = ({ volume, mediaVolume, mediaRef, src, mediaType, playbackRate, displayName, id, stack, showInTimeline, premountDisplay }) => {
    const videoConfig = useVideoConfig();
    const { rootId, audioAndVideoTags } = (0, import_react.useContext)(TimelineContext);
    const parentSequence = (0, import_react.useContext)(SequenceContext);
    const actualFrom = parentSequence ? parentSequence.relativeFrom + parentSequence.cumulatedFrom : 0;
    const [playing] = usePlayingState();
    const startsAt = useMediaStartsAt();
    const { registerSequence, unregisterSequence } = (0, import_react.useContext)(SequenceManager);
    const [initialVolume] = (0, import_react.useState)(() => volume);
    const nonce = useNonce();
    const duration = parentSequence ? Math.min(parentSequence.durationInFrames, videoConfig.durationInFrames) : videoConfig.durationInFrames;
    const doesVolumeChange = typeof volume === "function";
    const volumes = (0, import_react.useMemo)(() => {
      if (typeof volume === "number") {
        return volume;
      }
      return new Array(Math.floor(Math.max(0, duration + startsAt))).fill(true).map((_, i) => {
        return evaluateVolume({
          frame: i + startsAt,
          volume,
          mediaVolume,
          allowAmplificationDuringRender: false
        });
      }).join(",");
    }, [duration, startsAt, volume, mediaVolume]);
    (0, import_react.useEffect)(() => {
      if (typeof volume === "number" && volume !== initialVolume) {
        warnOnce(`Remotion: The ${mediaType} with src ${src} has changed it's volume. Prefer the callback syntax for setting volume to get better timeline display: https://www.remotion.dev/docs/using-audio/#controlling-volume`);
      }
    }, [initialVolume, mediaType, src, volume]);
    (0, import_react.useEffect)(() => {
      var _a;
      if (!mediaRef.current) {
        return;
      }
      if (!src) {
        throw new Error("No src passed");
      }
      if (!getRemotionEnvironment().isStudio && true) {
        return;
      }
      if (!showInTimeline) {
        return;
      }
      registerSequence({
        type: mediaType,
        src,
        id,
        duration,
        from: 0,
        parent: (_a = parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.id) !== null && _a !== void 0 ? _a : null,
        displayName: displayName !== null && displayName !== void 0 ? displayName : getAssetDisplayName(src),
        rootId,
        volume: volumes,
        showInTimeline: true,
        nonce,
        startMediaFrom: 0 - startsAt,
        doesVolumeChange,
        loopDisplay: void 0,
        playbackRate,
        stack,
        premountDisplay
      });
      return () => {
        unregisterSequence(id);
      };
    }, [
      actualFrom,
      duration,
      id,
      parentSequence,
      src,
      registerSequence,
      rootId,
      unregisterSequence,
      videoConfig,
      volumes,
      doesVolumeChange,
      nonce,
      mediaRef,
      mediaType,
      startsAt,
      playbackRate,
      displayName,
      stack,
      showInTimeline,
      premountDisplay
    ]);
    (0, import_react.useEffect)(() => {
      const tag = {
        id,
        play: () => {
          if (!playing) {
            return;
          }
          return playAndHandleNotAllowedError(mediaRef, mediaType);
        }
      };
      audioAndVideoTags.current.push(tag);
      return () => {
        audioAndVideoTags.current = audioAndVideoTags.current.filter((a) => a.id !== id);
      };
    }, [audioAndVideoTags, id, mediaRef, mediaType, playing]);
  };
  function interpolateFunction(input, inputRange, outputRange, options) {
    const { extrapolateLeft, extrapolateRight, easing } = options;
    let result = input;
    const [inputMin, inputMax] = inputRange;
    const [outputMin, outputMax] = outputRange;
    if (result < inputMin) {
      if (extrapolateLeft === "identity") {
        return result;
      }
      if (extrapolateLeft === "clamp") {
        result = inputMin;
      } else if (extrapolateLeft === "wrap") {
        const range = inputMax - inputMin;
        result = ((result - inputMin) % range + range) % range + inputMin;
      } else
        ;
    }
    if (result > inputMax) {
      if (extrapolateRight === "identity") {
        return result;
      }
      if (extrapolateRight === "clamp") {
        result = inputMax;
      } else if (extrapolateRight === "wrap") {
        const range = inputMax - inputMin;
        result = ((result - inputMin) % range + range) % range + inputMin;
      } else
        ;
    }
    if (outputMin === outputMax) {
      return outputMin;
    }
    result = (result - inputMin) / (inputMax - inputMin);
    result = easing(result);
    result = result * (outputMax - outputMin) + outputMin;
    return result;
  }
  function findRange(input, inputRange) {
    let i;
    for (i = 1; i < inputRange.length - 1; ++i) {
      if (inputRange[i] >= input) {
        break;
      }
    }
    return i - 1;
  }
  function checkValidInputRange(arr) {
    for (let i = 1; i < arr.length; ++i) {
      if (!(arr[i] > arr[i - 1])) {
        throw new Error(`inputRange must be strictly monotonically increasing but got [${arr.join(",")}]`);
      }
    }
  }
  function checkInfiniteRange(name, arr) {
    if (arr.length < 2) {
      throw new Error(name + " must have at least 2 elements");
    }
    for (const index in arr) {
      if (typeof arr[index] !== "number") {
        throw new Error(`${name} must contain only numbers`);
      }
      if (arr[index] === -Infinity || arr[index] === Infinity) {
        throw new Error(`${name} must contain only finite numbers, but got [${arr.join(",")}]`);
      }
    }
  }
  function interpolate(input, inputRange, outputRange, options) {
    var _a;
    if (typeof input === "undefined") {
      throw new Error("input can not be undefined");
    }
    if (typeof inputRange === "undefined") {
      throw new Error("inputRange can not be undefined");
    }
    if (typeof outputRange === "undefined") {
      throw new Error("outputRange can not be undefined");
    }
    if (inputRange.length !== outputRange.length) {
      throw new Error("inputRange (" + inputRange.length + ") and outputRange (" + outputRange.length + ") must have the same length");
    }
    checkInfiniteRange("inputRange", inputRange);
    checkInfiniteRange("outputRange", outputRange);
    checkValidInputRange(inputRange);
    const easing = (_a = options === null || options === void 0 ? void 0 : options.easing) !== null && _a !== void 0 ? _a : (num) => num;
    let extrapolateLeft = "extend";
    if ((options === null || options === void 0 ? void 0 : options.extrapolateLeft) !== void 0) {
      extrapolateLeft = options.extrapolateLeft;
    }
    let extrapolateRight = "extend";
    if ((options === null || options === void 0 ? void 0 : options.extrapolateRight) !== void 0) {
      extrapolateRight = options.extrapolateRight;
    }
    if (typeof input !== "number") {
      throw new TypeError("Cannot interpolate an input which is not a number");
    }
    const range = findRange(input, inputRange);
    return interpolateFunction(input, [inputRange[range], inputRange[range + 1]], [outputRange[range], outputRange[range + 1]], {
      easing,
      extrapolateLeft,
      extrapolateRight
    });
  }
  var getExpectedMediaFrameUncorrected = ({ frame, playbackRate, startFrom }) => {
    return interpolate(frame, [-1, startFrom, startFrom + 1], [-1, startFrom, startFrom + playbackRate]);
  };
  var getMediaTime = ({ fps, frame, playbackRate, startFrom }) => {
    const expectedFrame = getExpectedMediaFrameUncorrected({
      frame,
      playbackRate,
      startFrom
    });
    const msPerFrame = 1e3 / fps;
    return expectedFrame * msPerFrame / 1e3;
  };
  var toSeconds = (time, fps) => {
    return Math.round(time / fps * 100) / 100;
  };
  var isIosSafari = () => {
    if (typeof window === "undefined") {
      return false;
    }
    const isIpadIPodIPhone = /iP(ad|od|hone)/i.test(window.navigator.userAgent);
    const isAppleWebKit = /AppleWebKit/.test(window.navigator.userAgent);
    return isIpadIPodIPhone && isAppleWebKit;
  };
  var isIOSSafariAndBlob = (actualSrc) => {
    return isIosSafari() && actualSrc.startsWith("blob:");
  };
  var appendVideoFragment = ({ actualSrc, actualFrom, duration, fps }) => {
    var _a;
    if (isIOSSafariAndBlob(actualSrc)) {
      return actualSrc;
    }
    if (actualSrc.startsWith("data:")) {
      return actualSrc;
    }
    const existingHash = Boolean(new URL(actualSrc, (_a = typeof window === "undefined" ? null : window.location.href) !== null && _a !== void 0 ? _a : "http://localhost:3000").hash);
    if (existingHash) {
      return actualSrc;
    }
    if (!Number.isFinite(actualFrom)) {
      return actualSrc;
    }
    actualSrc += `#t=${toSeconds(-actualFrom, fps)}`;
    if (!Number.isFinite(duration)) {
      return actualSrc;
    }
    actualSrc += `,${toSeconds(duration, fps)}`;
    return actualSrc;
  };
  var isSubsetOfDuration = (prevStartFrom, newStartFrom, prevDuration, newDuration) => {
    return prevStartFrom <= newStartFrom && prevStartFrom + prevDuration >= newStartFrom + newDuration;
  };
  var useAppendVideoFragment = ({ actualSrc: initialActualSrc, actualFrom: initialActualFrom, duration: initialDuration, fps }) => {
    const actualFromRef = (0, import_react.useRef)(initialActualFrom);
    const actualDuration = (0, import_react.useRef)(initialDuration);
    const actualSrc = (0, import_react.useRef)(initialActualSrc);
    if (!isSubsetOfDuration || initialActualSrc !== actualSrc.current) {
      actualFromRef.current = initialActualFrom;
      actualDuration.current = initialDuration;
      actualSrc.current = initialActualSrc;
    }
    const appended = appendVideoFragment({
      actualSrc: actualSrc.current,
      actualFrom: actualFromRef.current,
      duration: actualDuration.current,
      fps
    });
    return appended;
  };
  var alreadyWarned = {};
  var warnAboutNonSeekableMedia = (ref, type) => {
    if (ref === null) {
      return;
    }
    if (ref.seekable.length === 0) {
      return;
    }
    if (ref.seekable.length > 1) {
      return;
    }
    if (alreadyWarned[ref.src]) {
      return;
    }
    const range = { start: ref.seekable.start(0), end: ref.seekable.end(0) };
    if (range.start === 0 && range.end === 0) {
      const msg = [
        `The media ${ref.src} cannot be seeked. This could be one of few reasons:`,
        "1) The media resource was replaced while the video is playing but it was not loaded yet.",
        "2) The media does not support seeking.",
        "3) The media was loaded with security headers prventing it from being included.",
        "Please see https://remotion.dev/docs/non-seekable-media for assistance."
      ].join("\n");
      if (type === "console-error") {
        console.error(msg);
      } else if (type === "console-warning") {
        console.warn(`The media ${ref.src} does not support seeking. The video will render fine, but may not play correctly in the Remotion Studio and in the <Player>. See https://remotion.dev/docs/non-seekable-media for an explanation.`);
      } else {
        throw new Error(msg);
      }
      alreadyWarned[ref.src] = true;
    }
  };
  var DEFAULT_ACCEPTABLE_TIMESHIFT = 0.45;
  var seek = (mediaRef, time) => {
    if (!mediaRef.current) {
      return;
    }
    if (isIosSafari()) {
      mediaRef.current.currentTime = Number(time.toFixed(1));
      return;
    }
    mediaRef.current.currentTime = time;
  };
  var useMediaPlayback = ({ mediaRef, src, mediaType, playbackRate: localPlaybackRate, onlyWarnForMediaSeekingError, acceptableTimeshift }) => {
    const { playbackRate: globalPlaybackRate } = (0, import_react.useContext)(TimelineContext);
    const frame = useCurrentFrame();
    const absoluteFrame = useTimelinePosition();
    const [playing] = usePlayingState();
    const buffering = (0, import_react.useContext)(BufferingContextReact);
    const { fps } = useVideoConfig();
    const mediaStartsAt = useMediaStartsAt();
    const playbackRate = localPlaybackRate * globalPlaybackRate;
    const acceptableTimeShiftButLessThanDuration = (() => {
      var _a;
      if ((_a = mediaRef.current) === null || _a === void 0 ? void 0 : _a.duration) {
        return Math.min(mediaRef.current.duration, acceptableTimeshift !== null && acceptableTimeshift !== void 0 ? acceptableTimeshift : DEFAULT_ACCEPTABLE_TIMESHIFT);
      }
      return acceptableTimeshift;
    })();
    const pausedOrBuffering = !playing || buffering && buffering.buffering.current;
    (0, import_react.useEffect)(() => {
      var _a;
      if (pausedOrBuffering) {
        (_a = mediaRef.current) === null || _a === void 0 ? void 0 : _a.pause();
      }
    }, [mediaRef, mediaType, pausedOrBuffering]);
    (0, import_react.useEffect)(() => {
      const tagName = mediaType === "audio" ? "<Audio>" : "<Video>";
      if (!mediaRef.current) {
        throw new Error(`No ${mediaType} ref found`);
      }
      if (!src) {
        throw new Error(`No 'src' attribute was passed to the ${tagName} element.`);
      }
      const playbackRateToSet = Math.max(0, playbackRate);
      if (mediaRef.current.playbackRate !== playbackRateToSet) {
        mediaRef.current.playbackRate = playbackRateToSet;
      }
      const desiredUnclampedTime = getMediaTime({
        frame,
        playbackRate: localPlaybackRate,
        startFrom: -mediaStartsAt,
        fps
      });
      const { duration } = mediaRef.current;
      const shouldBeTime = !Number.isNaN(duration) && Number.isFinite(duration) ? Math.min(duration, desiredUnclampedTime) : desiredUnclampedTime;
      const isTime = mediaRef.current.currentTime;
      const timeShift = Math.abs(shouldBeTime - isTime);
      if (timeShift > acceptableTimeShiftButLessThanDuration) {
        seek(mediaRef, shouldBeTime);
        if (!onlyWarnForMediaSeekingError) {
          warnAboutNonSeekableMedia(mediaRef.current, onlyWarnForMediaSeekingError ? "console-warning" : "console-error");
        }
        return;
      }
      const makesSenseToSeek = Math.abs(mediaRef.current.currentTime - shouldBeTime) > 1e-5;
      if (pausedOrBuffering || absoluteFrame === 0) {
        if (makesSenseToSeek) {
          seek(mediaRef, shouldBeTime);
        }
      }
      if (mediaRef.current.paused && !mediaRef.current.ended && !pausedOrBuffering) {
        if (makesSenseToSeek) {
          seek(mediaRef, shouldBeTime);
        }
        playAndHandleNotAllowedError(mediaRef, mediaType);
      }
    }, [
      absoluteFrame,
      fps,
      playbackRate,
      frame,
      mediaRef,
      mediaType,
      src,
      mediaStartsAt,
      localPlaybackRate,
      onlyWarnForMediaSeekingError,
      acceptableTimeshift,
      acceptableTimeShiftButLessThanDuration,
      pausedOrBuffering
    ]);
  };
  var useMediaTagVolume = (mediaRef) => {
    const [actualVolume, setActualVolume] = (0, import_react.useState)(1);
    (0, import_react.useEffect)(() => {
      const ref = mediaRef.current;
      if (!ref) {
        return;
      }
      const onChange = () => {
        setActualVolume(ref.volume);
      };
      ref.addEventListener("volumechange", onChange);
      return () => ref.removeEventListener("volumechange", onChange);
    }, [mediaRef]);
    (0, import_react.useEffect)(() => {
      const ref = mediaRef.current;
      if (!ref) {
        return;
      }
      if (ref.volume !== actualVolume) {
        setActualVolume(ref.volume);
      }
    }, [actualVolume, mediaRef]);
    return actualVolume;
  };
  var FLOATING_POINT_ERROR_THRESHOLD = 1e-5;
  var isApproximatelyTheSame = (num1, num2) => {
    return Math.abs(num1 - num2) < FLOATING_POINT_ERROR_THRESHOLD;
  };
  var useSyncVolumeWithMediaTag = ({ volumePropFrame, actualVolume, volume, mediaVolume, mediaRef }) => {
    (0, import_react.useEffect)(() => {
      const userPreferredVolume = evaluateVolume({
        frame: volumePropFrame,
        volume,
        mediaVolume,
        allowAmplificationDuringRender: false
      });
      if (!isApproximatelyTheSame(userPreferredVolume, actualVolume) && mediaRef.current) {
        mediaRef.current.volume = userPreferredVolume;
      }
    }, [actualVolume, volumePropFrame, mediaRef, volume, mediaVolume]);
  };
  var MediaVolumeContext = (0, import_react.createContext)({
    mediaMuted: false,
    mediaVolume: 1
  });
  var SetMediaVolumeContext = (0, import_react.createContext)({
    setMediaMuted: () => {
      throw new Error("default");
    },
    setMediaVolume: () => {
      throw new Error("default");
    }
  });
  var useMediaVolumeState = () => {
    const { mediaVolume } = (0, import_react.useContext)(MediaVolumeContext);
    const { setMediaVolume } = (0, import_react.useContext)(SetMediaVolumeContext);
    return (0, import_react.useMemo)(() => {
      return [mediaVolume, setMediaVolume];
    }, [mediaVolume, setMediaVolume]);
  };
  var useMediaMutedState = () => {
    const { mediaMuted } = (0, import_react.useContext)(MediaVolumeContext);
    const { setMediaMuted } = (0, import_react.useContext)(SetMediaVolumeContext);
    return (0, import_react.useMemo)(() => {
      return [mediaMuted, setMediaMuted];
    }, [mediaMuted, setMediaMuted]);
  };
  var EMPTY_AUDIO = "data:audio/mp3;base64,/+MYxAAJcAV8AAgAABn//////+/gQ5BAMA+D4Pg+BAQBAEAwD4Pg+D4EBAEAQDAPg++hYBH///hUFQVBUFREDQNHmf///////+MYxBUGkAGIMAAAAP/29Xt6lUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/+MYxDUAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
  var compareProps = (obj1, obj2) => {
    const keysA = Object.keys(obj1).sort();
    const keysB = Object.keys(obj2).sort();
    if (keysA.length !== keysB.length) {
      return false;
    }
    for (let i = 0; i < keysA.length; i++) {
      if (keysA[i] !== keysB[i]) {
        return false;
      }
      if (obj1[keysA[i]] !== obj2[keysB[i]]) {
        return false;
      }
    }
    return true;
  };
  var didPropChange = (key, newProp, prevProp) => {
    if (key === "src" && !prevProp.startsWith("data:") && !newProp.startsWith("data:")) {
      return new URL(prevProp, window.origin).toString() !== new URL(newProp, window.origin).toString();
    }
    if (prevProp === newProp) {
      return false;
    }
    return true;
  };
  var SharedAudioContext = (0, import_react.createContext)(null);
  var SharedAudioContextProvider = ({ children, numberOfAudioTags, component }) => {
    const audios = (0, import_react.useRef)([]);
    const [initialNumberOfAudioTags] = (0, import_react.useState)(numberOfAudioTags);
    if (numberOfAudioTags !== initialNumberOfAudioTags) {
      throw new Error("The number of shared audio tags has changed dynamically. Once you have set this property, you cannot change it afterwards.");
    }
    const refs = (0, import_react.useMemo)(() => {
      return new Array(numberOfAudioTags).fill(true).map(() => {
        return { id: Math.random(), ref: (0, import_react.createRef)() };
      });
    }, [numberOfAudioTags]);
    const takenAudios = (0, import_react.useRef)(new Array(numberOfAudioTags).fill(false));
    const rerenderAudios = (0, import_react.useCallback)(() => {
      refs.forEach(({ ref, id }) => {
        var _a;
        const data = (_a = audios.current) === null || _a === void 0 ? void 0 : _a.find((a) => a.id === id);
        const { current } = ref;
        if (!current) {
          return;
        }
        if (data === void 0) {
          current.src = EMPTY_AUDIO;
          return;
        }
        if (!data) {
          throw new TypeError("Expected audio data to be there");
        }
        Object.keys(data.props).forEach((key) => {
          if (didPropChange(key, data.props[key], current[key])) {
            current[key] = data.props[key];
          }
        });
      });
    }, [refs]);
    const registerAudio = (0, import_react.useCallback)((aud, audioId) => {
      var _a, _b;
      const found = (_a = audios.current) === null || _a === void 0 ? void 0 : _a.find((a) => a.audioId === audioId);
      if (found) {
        return found;
      }
      const firstFreeAudio = takenAudios.current.findIndex((a) => a === false);
      if (firstFreeAudio === -1) {
        throw new Error(`Tried to simultaneously mount ${numberOfAudioTags + 1} <Audio /> tags at the same time. With the current settings, the maximum amount of <Audio /> tags is limited to ${numberOfAudioTags} at the same time. Remotion pre-mounts silent audio tags to help avoid browser autoplay restrictions. See https://remotion.dev/docs/player/autoplay#use-the-numberofsharedaudiotags-property for more information on how to increase this limit.`);
      }
      const { id, ref } = refs[firstFreeAudio];
      const cloned = [...takenAudios.current];
      cloned[firstFreeAudio] = id;
      takenAudios.current = cloned;
      const newElem = {
        props: aud,
        id,
        el: ref,
        audioId
      };
      (_b = audios.current) === null || _b === void 0 ? void 0 : _b.push(newElem);
      rerenderAudios();
      return newElem;
    }, [numberOfAudioTags, refs, rerenderAudios]);
    const unregisterAudio = (0, import_react.useCallback)((id) => {
      var _a;
      const cloned = [...takenAudios.current];
      const index = refs.findIndex((r) => r.id === id);
      if (index === -1) {
        throw new TypeError("Error occured in ");
      }
      cloned[index] = false;
      takenAudios.current = cloned;
      audios.current = (_a = audios.current) === null || _a === void 0 ? void 0 : _a.filter((a) => a.id !== id);
      rerenderAudios();
    }, [refs, rerenderAudios]);
    const updateAudio = (0, import_react.useCallback)(({ aud, audioId, id }) => {
      var _a;
      let changed = false;
      audios.current = (_a = audios.current) === null || _a === void 0 ? void 0 : _a.map((prevA) => {
        if (prevA.id === id) {
          const isTheSame = compareProps(aud, prevA.props);
          if (isTheSame) {
            return prevA;
          }
          changed = true;
          return {
            ...prevA,
            props: aud,
            audioId
          };
        }
        return prevA;
      });
      if (changed) {
        rerenderAudios();
      }
    }, [rerenderAudios]);
    const playAllAudios = (0, import_react.useCallback)(() => {
      refs.forEach((ref) => {
        playAndHandleNotAllowedError(ref.ref, "audio");
      });
    }, [refs]);
    const value = (0, import_react.useMemo)(() => {
      return {
        registerAudio,
        unregisterAudio,
        updateAudio,
        playAllAudios,
        numberOfAudioTags
      };
    }, [
      numberOfAudioTags,
      playAllAudios,
      registerAudio,
      unregisterAudio,
      updateAudio
    ]);
    const resetAudio = (0, import_react.useCallback)(() => {
      takenAudios.current = new Array(numberOfAudioTags).fill(false);
      audios.current = [];
      rerenderAudios();
    }, [numberOfAudioTags, rerenderAudios]);
    (0, import_react.useEffect)(() => {
      return () => {
        resetAudio();
      };
    }, [component, resetAudio]);
    return (0, import_jsx_runtime.jsxs)(SharedAudioContext.Provider, { value, children: [refs.map(({ id, ref }) => {
      return (
        // Without preload="metadata", iOS will seek the time internally
        // but not actually with sound. Adding `preload="metadata"` helps here.
        // https://discord.com/channels/809501355504959528/817306414069710848/1130519583367888906
        (0, import_jsx_runtime.jsx)("audio", { ref, preload: "metadata", src: EMPTY_AUDIO }, id)
      );
    }), children] });
  };
  var useSharedAudio = (aud, audioId) => {
    var _a;
    const ctx = (0, import_react.useContext)(SharedAudioContext);
    const [elem] = (0, import_react.useState)(() => {
      if (ctx && ctx.numberOfAudioTags > 0) {
        return ctx.registerAudio(aud, audioId);
      }
      return {
        el: import_react.default.createRef(),
        id: Math.random(),
        props: aud,
        audioId
      };
    });
    const effectToUse = (_a = import_react.default.useInsertionEffect) !== null && _a !== void 0 ? _a : import_react.default.useLayoutEffect;
    if (typeof document !== "undefined") {
      effectToUse(() => {
        if (ctx && ctx.numberOfAudioTags > 0) {
          ctx.updateAudio({ id: elem.id, aud, audioId });
        }
      }, [aud, ctx, elem.id, audioId]);
      effectToUse(() => {
        return () => {
          if (ctx && ctx.numberOfAudioTags > 0) {
            ctx.unregisterAudio(elem.id);
          }
        };
      }, [ctx, elem.id]);
    }
    return elem;
  };
  var AudioForDevelopmentForwardRefFunction = (props, ref) => {
    var _a;
    const [initialShouldPreMountAudioElements] = (0, import_react.useState)(props.shouldPreMountAudioTags);
    if (props.shouldPreMountAudioTags !== initialShouldPreMountAudioElements) {
      throw new Error("Cannot change the behavior for pre-mounting audio tags dynamically.");
    }
    const [mediaVolume] = useMediaVolumeState();
    const [mediaMuted] = useMediaMutedState();
    const volumePropFrame = useFrameForVolumeProp();
    const { volume, muted, playbackRate, shouldPreMountAudioTags, src, onDuration, acceptableTimeShiftInSeconds, _remotionInternalNeedsDurationCalculation, _remotionInternalNativeLoopPassed, _remotionInternalStack, allowAmplificationDuringRender, name, pauseWhenBuffering, showInTimeline, ...nativeProps } = props;
    const { hidden } = (0, import_react.useContext)(SequenceVisibilityToggleContext);
    if (!src) {
      throw new TypeError("No 'src' was passed to <Audio>.");
    }
    const preloadedSrc = usePreload(src);
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    const [timelineId] = (0, import_react.useState)(() => String(Math.random()));
    const isSequenceHidden = (_a = hidden[timelineId]) !== null && _a !== void 0 ? _a : false;
    const propsToPass = (0, import_react.useMemo)(() => {
      return {
        muted: muted || mediaMuted || isSequenceHidden,
        src: preloadedSrc,
        loop: _remotionInternalNativeLoopPassed,
        ...nativeProps
      };
    }, [
      _remotionInternalNativeLoopPassed,
      isSequenceHidden,
      mediaMuted,
      muted,
      nativeProps,
      preloadedSrc
    ]);
    const id = (0, import_react.useMemo)(() => `audio-${random(src !== null && src !== void 0 ? src : "")}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}-muted:${props.muted}-loop:${props.loop}`, [
      src,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames,
      props.muted,
      props.loop
    ]);
    const audioRef = useSharedAudio(propsToPass, id).el;
    const actualVolume = useMediaTagVolume(audioRef);
    useSyncVolumeWithMediaTag({
      volumePropFrame,
      actualVolume,
      volume,
      mediaVolume,
      mediaRef: audioRef
    });
    useMediaInTimeline({
      volume,
      mediaVolume,
      mediaRef: audioRef,
      src,
      mediaType: "audio",
      playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
      displayName: name !== null && name !== void 0 ? name : null,
      id: timelineId,
      stack: _remotionInternalStack,
      showInTimeline,
      premountDisplay: null
    });
    useMediaPlayback({
      mediaRef: audioRef,
      src,
      mediaType: "audio",
      playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
      onlyWarnForMediaSeekingError: false,
      acceptableTimeshift: acceptableTimeShiftInSeconds !== null && acceptableTimeShiftInSeconds !== void 0 ? acceptableTimeShiftInSeconds : DEFAULT_ACCEPTABLE_TIMESHIFT
    });
    useMediaBuffering({
      element: audioRef,
      shouldBuffer: pauseWhenBuffering,
      isPremounting: Boolean(sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.premounting)
    });
    (0, import_react.useImperativeHandle)(ref, () => {
      return audioRef.current;
    }, [audioRef]);
    const currentOnDurationCallback = (0, import_react.useRef)();
    currentOnDurationCallback.current = onDuration;
    (0, import_react.useEffect)(() => {
      var _a2;
      const { current } = audioRef;
      if (!current) {
        return;
      }
      if (current.duration) {
        (_a2 = currentOnDurationCallback.current) === null || _a2 === void 0 ? void 0 : _a2.call(currentOnDurationCallback, current.src, current.duration);
        return;
      }
      const onLoadedMetadata = () => {
        var _a3;
        (_a3 = currentOnDurationCallback.current) === null || _a3 === void 0 ? void 0 : _a3.call(currentOnDurationCallback, current.src, current.duration);
      };
      current.addEventListener("loadedmetadata", onLoadedMetadata);
      return () => {
        current.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    }, [audioRef, src]);
    if (initialShouldPreMountAudioElements) {
      return null;
    }
    return (0, import_jsx_runtime.jsx)("audio", { ref: audioRef, preload: "metadata", ...propsToPass });
  };
  var AudioForPreview = (0, import_react.forwardRef)(AudioForDevelopmentForwardRefFunction);
  var RenderAssetManager = (0, import_react.createContext)({
    // Must be undefined, otherwise error in Player
    registerRenderAsset: () => void 0,
    unregisterRenderAsset: () => void 0,
    renderAssets: []
  });
  var RenderAssetManagerProvider = ({ children }) => {
    const [renderAssets, setRenderAssets] = (0, import_react.useState)([]);
    const registerRenderAsset = (0, import_react.useCallback)((renderAsset) => {
      setRenderAssets((assets) => {
        return [...assets, renderAsset];
      });
    }, []);
    const unregisterRenderAsset = (0, import_react.useCallback)((id) => {
      setRenderAssets((assts) => {
        return assts.filter((a) => a.id !== id);
      });
    }, []);
    (0, import_react.useLayoutEffect)(() => {
      if (typeof window !== "undefined") {
        window.remotion_collectAssets = () => {
          setRenderAssets([]);
          return renderAssets;
        };
      }
    }, [renderAssets]);
    const contextValue = (0, import_react.useMemo)(() => {
      return {
        registerRenderAsset,
        unregisterRenderAsset,
        renderAssets
      };
    }, [renderAssets, registerRenderAsset, unregisterRenderAsset]);
    return (0, import_jsx_runtime.jsx)(RenderAssetManager.Provider, { value: contextValue, children });
  };
  if (typeof window !== "undefined") {
    window.remotion_renderReady = false;
  }
  var handles = [];
  if (typeof window !== "undefined") {
    window.remotion_delayRenderTimeouts = {};
  }
  var DELAY_RENDER_CALLSTACK_TOKEN = "The delayRender was called:";
  var DELAY_RENDER_RETRIES_LEFT = "Retries left: ";
  var DELAY_RENDER_RETRY_TOKEN = "- Rendering the frame will be retried.";
  var defaultTimeout = 3e4;
  var delayRender = (label3, options) => {
    var _a, _b, _c, _d, _e;
    if (typeof label3 !== "string" && typeof label3 !== "undefined") {
      throw new Error("The label parameter of delayRender() must be a string or undefined, got: " + JSON.stringify(label3));
    }
    const handle = Math.random();
    handles.push(handle);
    const called = (_b = (_a = Error().stack) === null || _a === void 0 ? void 0 : _a.replace(/^Error/g, "")) !== null && _b !== void 0 ? _b : "";
    if (getRemotionEnvironment().isRendering) {
      const timeoutToUse = ((_c = options === null || options === void 0 ? void 0 : options.timeoutInMilliseconds) !== null && _c !== void 0 ? _c : typeof window === "undefined" ? defaultTimeout : (_d = window.remotion_puppeteerTimeout) !== null && _d !== void 0 ? _d : defaultTimeout) - 2e3;
      if (typeof window !== "undefined") {
        const retriesLeft = ((_e = options === null || options === void 0 ? void 0 : options.retries) !== null && _e !== void 0 ? _e : 0) - (window.remotion_attempt - 1);
        window.remotion_delayRenderTimeouts[handle] = {
          label: label3 !== null && label3 !== void 0 ? label3 : null,
          timeout: setTimeout(() => {
            const message = [
              `A delayRender()`,
              label3 ? `"${label3}"` : null,
              `was called but not cleared after ${timeoutToUse}ms. See https://remotion.dev/docs/timeout for help.`,
              retriesLeft > 0 ? DELAY_RENDER_RETRIES_LEFT + retriesLeft : null,
              retriesLeft > 0 ? DELAY_RENDER_RETRY_TOKEN : null,
              DELAY_RENDER_CALLSTACK_TOKEN,
              called
            ].filter(truthy).join(" ");
            cancelRender(Error(message));
          }, timeoutToUse)
        };
      }
    }
    if (typeof window !== "undefined") {
      window.remotion_renderReady = false;
    }
    return handle;
  };
  var continueRender = (handle) => {
    if (typeof handle === "undefined") {
      throw new TypeError("The continueRender() method must be called with a parameter that is the return value of delayRender(). No value was passed.");
    }
    if (typeof handle !== "number") {
      throw new TypeError("The parameter passed into continueRender() must be the return value of delayRender() which is a number. Got: " + JSON.stringify(handle));
    }
    handles = handles.filter((h) => {
      if (h === handle) {
        if (getRemotionEnvironment().isRendering) {
          clearTimeout(window.remotion_delayRenderTimeouts[handle].timeout);
          delete window.remotion_delayRenderTimeouts[handle];
        }
        return false;
      }
      return true;
    });
    if (handles.length === 0 && typeof window !== "undefined") {
      window.remotion_renderReady = true;
    }
  };
  var AudioForRenderingRefForwardingFunction = (props, ref) => {
    const audioRef = (0, import_react.useRef)(null);
    const absoluteFrame = useTimelinePosition();
    const volumePropFrame = useFrameForVolumeProp();
    const frame = useCurrentFrame();
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    const { registerRenderAsset, unregisterRenderAsset } = (0, import_react.useContext)(RenderAssetManager);
    const id = (0, import_react.useMemo)(() => {
      var _a;
      return `audio-${random((_a = props.src) !== null && _a !== void 0 ? _a : "")}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}`;
    }, [
      props.src,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames
    ]);
    const { volume: volumeProp, playbackRate, allowAmplificationDuringRender, onDuration, toneFrequency, _remotionInternalNeedsDurationCalculation, _remotionInternalNativeLoopPassed, acceptableTimeShiftInSeconds, name, onError, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...nativeProps } = props;
    const volume = evaluateVolume({
      volume: volumeProp,
      frame: volumePropFrame,
      mediaVolume: 1,
      allowAmplificationDuringRender: allowAmplificationDuringRender !== null && allowAmplificationDuringRender !== void 0 ? allowAmplificationDuringRender : false
    });
    (0, import_react.useImperativeHandle)(ref, () => {
      return audioRef.current;
    }, []);
    (0, import_react.useEffect)(() => {
      var _a;
      if (!props.src) {
        throw new Error("No src passed");
      }
      if (!window.remotion_audioEnabled) {
        return;
      }
      if (props.muted) {
        return;
      }
      if (volume <= 0) {
        return;
      }
      registerRenderAsset({
        type: "audio",
        src: getAbsoluteSrc(props.src),
        id,
        frame: absoluteFrame,
        volume,
        mediaFrame: frame,
        playbackRate: (_a = props.playbackRate) !== null && _a !== void 0 ? _a : 1,
        allowAmplificationDuringRender: allowAmplificationDuringRender !== null && allowAmplificationDuringRender !== void 0 ? allowAmplificationDuringRender : false,
        toneFrequency: toneFrequency !== null && toneFrequency !== void 0 ? toneFrequency : null
      });
      return () => unregisterRenderAsset(id);
    }, [
      props.muted,
      props.src,
      registerRenderAsset,
      absoluteFrame,
      id,
      unregisterRenderAsset,
      volume,
      volumePropFrame,
      frame,
      playbackRate,
      props.playbackRate,
      allowAmplificationDuringRender,
      toneFrequency
    ]);
    const { src } = props;
    const needsToRenderAudioTag = ref || _remotionInternalNeedsDurationCalculation;
    (0, import_react.useLayoutEffect)(() => {
      if (false) {
        return;
      }
      if (!needsToRenderAudioTag) {
        return;
      }
      const newHandle = delayRender("Loading <Audio> duration with src=" + src, {
        retries: delayRenderRetries !== null && delayRenderRetries !== void 0 ? delayRenderRetries : void 0,
        timeoutInMilliseconds: delayRenderTimeoutInMilliseconds !== null && delayRenderTimeoutInMilliseconds !== void 0 ? delayRenderTimeoutInMilliseconds : void 0
      });
      const { current } = audioRef;
      const didLoad = () => {
        if (current === null || current === void 0 ? void 0 : current.duration) {
          onDuration(current.src, current.duration);
        }
        continueRender(newHandle);
      };
      if (current === null || current === void 0 ? void 0 : current.duration) {
        onDuration(current.src, current.duration);
        continueRender(newHandle);
      } else {
        current === null || current === void 0 ? void 0 : current.addEventListener("loadedmetadata", didLoad, { once: true });
      }
      return () => {
        current === null || current === void 0 ? void 0 : current.removeEventListener("loadedmetadata", didLoad);
        continueRender(newHandle);
      };
    }, [
      src,
      onDuration,
      needsToRenderAudioTag,
      delayRenderRetries,
      delayRenderTimeoutInMilliseconds
    ]);
    if (!needsToRenderAudioTag) {
      return null;
    }
    return (0, import_jsx_runtime.jsx)("audio", { ref: audioRef, ...nativeProps });
  };
  var AudioForRendering = (0, import_react.forwardRef)(AudioForRenderingRefForwardingFunction);
  var AudioRefForwardingFunction = (props, ref) => {
    var _a, _b, _c;
    const audioContext = (0, import_react.useContext)(SharedAudioContext);
    const { startFrom, endAt, name, stack, pauseWhenBuffering, showInTimeline, ...otherProps } = props;
    const { loop, ...propsOtherThanLoop } = props;
    const { fps } = useVideoConfig();
    const environment = getRemotionEnvironment();
    const { durations, setDurations } = (0, import_react.useContext)(DurationsContext);
    if (typeof props.src !== "string") {
      throw new TypeError(`The \`<Audio>\` tag requires a string for \`src\`, but got ${JSON.stringify(props.src)} instead.`);
    }
    const preloadedSrc = usePreload(props.src);
    const onError = (0, import_react.useCallback)((e) => {
      console.log(e.currentTarget.error);
      const errMessage = `Could not play audio with src ${preloadedSrc}: ${e.currentTarget.error}. See https://remotion.dev/docs/media-playback-error for help.`;
      if (loop) {
        cancelRender(new Error(errMessage));
      } else {
        console.warn(errMessage);
      }
    }, [loop, preloadedSrc]);
    const onDuration = (0, import_react.useCallback)((src, durationInSeconds) => {
      setDurations({ type: "got-duration", durationInSeconds, src });
    }, [setDurations]);
    const durationFetched = (_a = durations[getAbsoluteSrc(preloadedSrc)]) !== null && _a !== void 0 ? _a : durations[getAbsoluteSrc(props.src)];
    if (loop && durationFetched !== void 0) {
      const duration = durationFetched * fps;
      return (0, import_jsx_runtime.jsx)(Loop, { layout: "none", durationInFrames: calculateLoopDuration({
        endAt,
        mediaDuration: duration,
        playbackRate: (_b = props.playbackRate) !== null && _b !== void 0 ? _b : 1,
        startFrom
      }), children: (0, import_jsx_runtime.jsx)(Audio, { ...propsOtherThanLoop, ref, _remotionInternalNativeLoopPassed: true }) });
    }
    if (typeof startFrom !== "undefined" || typeof endAt !== "undefined") {
      validateStartFromProps(startFrom, endAt);
      const startFromFrameNo = startFrom !== null && startFrom !== void 0 ? startFrom : 0;
      const endAtFrameNo = endAt !== null && endAt !== void 0 ? endAt : Infinity;
      return (0, import_jsx_runtime.jsx)(Sequence, { layout: "none", from: 0 - startFromFrameNo, showInTimeline: false, durationInFrames: endAtFrameNo, name, children: (0, import_jsx_runtime.jsx)(Audio, { _remotionInternalNeedsDurationCalculation: Boolean(loop), pauseWhenBuffering: pauseWhenBuffering !== null && pauseWhenBuffering !== void 0 ? pauseWhenBuffering : false, ...otherProps, ref }) });
    }
    validateMediaProps(props, "Audio");
    if (environment.isRendering) {
      return (0, import_jsx_runtime.jsx)(AudioForRendering, { onDuration, ...props, ref, onError, _remotionInternalNeedsDurationCalculation: Boolean(loop) });
    }
    return (0, import_jsx_runtime.jsx)(AudioForPreview, {
      _remotionInternalNativeLoopPassed: (_c = props._remotionInternalNativeLoopPassed) !== null && _c !== void 0 ? _c : false,
      _remotionInternalStack: stack !== null && stack !== void 0 ? stack : null,
      shouldPreMountAudioTags: audioContext !== null && audioContext.numberOfAudioTags > 0,
      ...props,
      ref,
      onError,
      onDuration,
      // Proposal: Make this default to true in v5
      pauseWhenBuffering: pauseWhenBuffering !== null && pauseWhenBuffering !== void 0 ? pauseWhenBuffering : false,
      _remotionInternalNeedsDurationCalculation: Boolean(loop),
      showInTimeline: showInTimeline !== null && showInTimeline !== void 0 ? showInTimeline : true
    });
  };
  var Audio = (0, import_react.forwardRef)(AudioRefForwardingFunction);
  addSequenceStackTraces(Audio);
  var FolderContext = (0, import_react.createContext)({
    folderName: null,
    parentName: null
  });
  var rotate = {
    transform: `rotate(90deg)`
  };
  var ICON_SIZE = 40;
  var label = {
    color: "white",
    fontSize: 14,
    fontFamily: "sans-serif"
  };
  var container = {
    justifyContent: "center",
    alignItems: "center"
  };
  var Loading = () => {
    return (0, import_jsx_runtime.jsxs)(AbsoluteFill, { style: container, id: "remotion-comp-loading", children: [(0, import_jsx_runtime.jsx)("style", { type: "text/css", children: `
				@keyframes anim {
					from {
						opacity: 0
					}
					to {
						opacity: 1
					}
				}
				#remotion-comp-loading {
					animation: anim 2s;
					animation-fill-mode: forwards;
				}
			` }), (0, import_jsx_runtime.jsx)("svg", { width: ICON_SIZE, height: ICON_SIZE, viewBox: "-100 -100 400 400", style: rotate, children: (0, import_jsx_runtime.jsx)("path", { fill: "#555", stroke: "#555", strokeWidth: "100", strokeLinejoin: "round", d: "M 2 172 a 196 100 0 0 0 195 5 A 196 240 0 0 0 100 2.259 A 196 240 0 0 0 2 172 z" }) }), (0, import_jsx_runtime.jsxs)("p", { style: label, children: ["Resolving ", "<Suspense>", "..."] })] });
  };
  var _portalNode = null;
  var portalNode = () => {
    if (!_portalNode) {
      if (typeof document === "undefined") {
        throw new Error("Tried to call an API that only works in the browser from outside the browser");
      }
      _portalNode = document.createElement("div");
      _portalNode.style.position = "absolute";
      _portalNode.style.top = "0px";
      _portalNode.style.left = "0px";
      _portalNode.style.right = "0px";
      _portalNode.style.bottom = "0px";
      _portalNode.style.width = "100%";
      _portalNode.style.height = "100%";
      _portalNode.style.display = "flex";
      _portalNode.style.flexDirection = "column";
      const containerNode = document.createElement("div");
      containerNode.style.position = "fixed";
      containerNode.style.top = "-999999px";
      containerNode.appendChild(_portalNode);
      document.body.appendChild(containerNode);
    }
    return _portalNode;
  };
  var useLazyComponent = (compProps) => {
    const lazy = (0, import_react.useMemo)(() => {
      if ("lazyComponent" in compProps) {
        return import_react.default.lazy(compProps.lazyComponent);
      }
      if ("component" in compProps) {
        if (typeof document === "undefined") {
          return compProps.component;
        }
        return import_react.default.lazy(() => Promise.resolve({ default: compProps.component }));
      }
      throw new Error("You must pass either 'component' or 'lazyComponent'");
    }, [compProps.component, compProps.lazyComponent]);
    return lazy;
  };
  var getRegex = () => /^([a-zA-Z0-9-\u4E00-\u9FFF])+$/g;
  var isCompositionIdValid = (id) => id.match(getRegex());
  var validateCompositionId = (id) => {
    if (!isCompositionIdValid(id)) {
      throw new Error(`Composition id can only contain a-z, A-Z, 0-9 and -. You passed ${id}`);
    }
  };
  var invalidCompositionErrorMessage = `Composition ID must match ${String(getRegex())}`;
  var validateDefaultAndInputProps = (defaultProps, name, compositionId) => {
    if (!defaultProps) {
      return;
    }
    if (typeof defaultProps !== "object") {
      throw new Error(`"${name}" must be an object, but you passed a value of type ${typeof defaultProps}`);
    }
    if (Array.isArray(defaultProps)) {
      throw new Error(`"${name}" must be an object, an array was passed ${compositionId ? `for composition "${compositionId}"` : ""}`);
    }
  };
  var ClipComposition = ({ children }) => {
    const { clipRegion } = (0, import_react.useContext)(NativeLayersContext);
    const style = (0, import_react.useMemo)(() => {
      return {
        display: "flex",
        flexDirection: "row",
        opacity: clipRegion === "hide" ? 0 : 1,
        clipPath: clipRegion && clipRegion !== "hide" ? `polygon(${clipRegion.x}px ${clipRegion.y}px, ${clipRegion.x}px ${clipRegion.height + clipRegion.y}px, ${clipRegion.width + clipRegion.x}px ${clipRegion.height + clipRegion.y}px, ${clipRegion.width + clipRegion.x}px ${clipRegion.y}px)` : void 0
      };
    }, [clipRegion]);
    return (0, import_jsx_runtime.jsx)(AbsoluteFill, { style, children });
  };
  var Fallback = () => {
    (0, import_react.useEffect)(() => {
      const fallback = delayRender("Waiting for Root component to unsuspend");
      return () => continueRender(fallback);
    }, []);
    return null;
  };
  var Composition = ({ width, height, fps, durationInFrames, id, defaultProps, schema, ...compProps }) => {
    var _a, _b;
    const { registerComposition, unregisterComposition } = (0, import_react.useContext)(CompositionManager);
    const video = useVideo();
    const lazy = useLazyComponent(compProps);
    const nonce = useNonce();
    const isPlayer = useIsPlayer();
    const environment = getRemotionEnvironment();
    const canUseComposition = (0, import_react.useContext)(CanUseRemotionHooks);
    if (canUseComposition) {
      if (isPlayer) {
        throw new Error("<Composition> was mounted inside the `component` that was passed to the <Player>. See https://remotion.dev/docs/wrong-composition-mount for help.");
      }
      throw new Error("<Composition> mounted inside another composition. See https://remotion.dev/docs/wrong-composition-mount for help.");
    }
    const { folderName, parentName } = (0, import_react.useContext)(FolderContext);
    (0, import_react.useEffect)(() => {
      var _a2;
      if (!id) {
        throw new Error("No id for composition passed.");
      }
      validateCompositionId(id);
      validateDefaultAndInputProps(defaultProps, "defaultProps", id);
      registerComposition({
        durationInFrames: durationInFrames !== null && durationInFrames !== void 0 ? durationInFrames : void 0,
        fps: fps !== null && fps !== void 0 ? fps : void 0,
        height: height !== null && height !== void 0 ? height : void 0,
        width: width !== null && width !== void 0 ? width : void 0,
        id,
        folderName,
        component: lazy,
        defaultProps,
        nonce,
        parentFolderName: parentName,
        schema: schema !== null && schema !== void 0 ? schema : null,
        calculateMetadata: (_a2 = compProps.calculateMetadata) !== null && _a2 !== void 0 ? _a2 : null
      });
      return () => {
        unregisterComposition(id);
      };
    }, [
      durationInFrames,
      fps,
      height,
      lazy,
      id,
      folderName,
      defaultProps,
      registerComposition,
      unregisterComposition,
      width,
      nonce,
      parentName,
      schema,
      compProps.calculateMetadata
    ]);
    const resolved = useResolvedVideoConfig(id);
    if (environment.isStudio && video && video.component === lazy) {
      const Comp = lazy;
      if (resolved === null || resolved.type !== "success") {
        return null;
      }
      return (0, import_react_dom.createPortal)((0, import_jsx_runtime.jsx)(ClipComposition, { children: (0, import_jsx_runtime.jsx)(CanUseRemotionHooksProvider, { children: (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: (0, import_jsx_runtime.jsx)(Loading, {}), children: (0, import_jsx_runtime.jsx)(Comp, { ...(_a = resolved.result.props) !== null && _a !== void 0 ? _a : {} }) }) }) }), portalNode());
    }
    if (environment.isRendering && video && video.component === lazy) {
      const Comp = lazy;
      if (resolved === null || resolved.type !== "success") {
        return null;
      }
      return (0, import_react_dom.createPortal)((0, import_jsx_runtime.jsx)(CanUseRemotionHooksProvider, { children: (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: (0, import_jsx_runtime.jsx)(Fallback, {}), children: (0, import_jsx_runtime.jsx)(Comp, { ...(_b = resolved.result.props) !== null && _b !== void 0 ? _b : {} }) }) }), portalNode());
    }
    return null;
  };
  var kSplineTableSize = 11;
  var kSampleStepSize = 1 / (kSplineTableSize - 1);
  var IFrameRefForwarding = ({ onLoad, onError, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...props }, ref) => {
    const [handle] = (0, import_react.useState)(() => delayRender(`Loading <IFrame> with source ${props.src}`, {
      retries: delayRenderRetries !== null && delayRenderRetries !== void 0 ? delayRenderRetries : void 0,
      timeoutInMilliseconds: delayRenderTimeoutInMilliseconds !== null && delayRenderTimeoutInMilliseconds !== void 0 ? delayRenderTimeoutInMilliseconds : void 0
    }));
    const didLoad = (0, import_react.useCallback)((e) => {
      continueRender(handle);
      onLoad === null || onLoad === void 0 ? void 0 : onLoad(e);
    }, [handle, onLoad]);
    const didGetError = (0, import_react.useCallback)((e) => {
      continueRender(handle);
      if (onError) {
        onError(e);
      } else {
        console.error("Error loading iframe:", e, "Handle the event using the onError() prop to make this message disappear.");
      }
    }, [handle, onError]);
    return (0, import_jsx_runtime.jsx)("iframe", { ...props, ref, onError: didGetError, onLoad: didLoad });
  };
  var IFrame = (0, import_react.forwardRef)(IFrameRefForwarding);
  function exponentialBackoff(errorCount) {
    return 1e3 * 2 ** (errorCount - 1);
  }
  var ImgRefForwarding = ({ onError, maxRetries = 2, src, pauseWhenLoading, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...props }, ref) => {
    const imageRef = (0, import_react.useRef)(null);
    const errors = (0, import_react.useRef)({});
    const { delayPlayback } = useBufferState();
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    if (!src) {
      throw new Error('No "src" prop was passed to <Img>.');
    }
    (0, import_react.useImperativeHandle)(ref, () => {
      return imageRef.current;
    }, []);
    const actualSrc = usePreload(src);
    const retryIn = (0, import_react.useCallback)((timeout) => {
      if (!imageRef.current) {
        return;
      }
      const currentSrc = imageRef.current.src;
      setTimeout(() => {
        var _a;
        if (!imageRef.current) {
          return;
        }
        const newSrc = (_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.src;
        if (newSrc !== currentSrc) {
          return;
        }
        imageRef.current.removeAttribute("src");
        imageRef.current.setAttribute("src", newSrc);
      }, timeout);
    }, []);
    const didGetError = (0, import_react.useCallback)((e) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
      if (!errors.current) {
        return;
      }
      errors.current[(_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.src] = ((_c = errors.current[(_b = imageRef.current) === null || _b === void 0 ? void 0 : _b.src]) !== null && _c !== void 0 ? _c : 0) + 1;
      if (onError && ((_e = errors.current[(_d = imageRef.current) === null || _d === void 0 ? void 0 : _d.src]) !== null && _e !== void 0 ? _e : 0) > maxRetries) {
        onError(e);
        return;
      }
      if (((_g = errors.current[(_f = imageRef.current) === null || _f === void 0 ? void 0 : _f.src]) !== null && _g !== void 0 ? _g : 0) <= maxRetries) {
        const backoff = exponentialBackoff((_j = errors.current[(_h = imageRef.current) === null || _h === void 0 ? void 0 : _h.src]) !== null && _j !== void 0 ? _j : 0);
        console.warn(`Could not load image with source ${(_k = imageRef.current) === null || _k === void 0 ? void 0 : _k.src}, retrying again in ${backoff}ms`);
        retryIn(backoff);
        return;
      }
      cancelRender("Error loading image with src: " + ((_l = imageRef.current) === null || _l === void 0 ? void 0 : _l.src));
    }, [maxRetries, onError, retryIn]);
    if (typeof window !== "undefined") {
      (0, import_react.useLayoutEffect)(() => {
        if (false) {
          return;
        }
        const newHandle = delayRender("Loading <Img> with src=" + actualSrc, {
          retries: delayRenderRetries !== null && delayRenderRetries !== void 0 ? delayRenderRetries : void 0,
          timeoutInMilliseconds: delayRenderTimeoutInMilliseconds !== null && delayRenderTimeoutInMilliseconds !== void 0 ? delayRenderTimeoutInMilliseconds : void 0
        });
        const unblock = pauseWhenLoading && !(sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.premounting) ? delayPlayback().unblock : () => void 0;
        const { current } = imageRef;
        const onComplete = () => {
          var _a, _b, _c, _d;
          if (((_b = errors.current[(_a = imageRef.current) === null || _a === void 0 ? void 0 : _a.src]) !== null && _b !== void 0 ? _b : 0) > 0) {
            delete errors.current[(_c = imageRef.current) === null || _c === void 0 ? void 0 : _c.src];
            console.info(`Retry successful - ${(_d = imageRef.current) === null || _d === void 0 ? void 0 : _d.src} is now loaded`);
          }
          unblock();
          continueRender(newHandle);
        };
        const didLoad = () => {
          onComplete();
        };
        if (current === null || current === void 0 ? void 0 : current.complete) {
          onComplete();
        } else {
          current === null || current === void 0 ? void 0 : current.addEventListener("load", didLoad, { once: true });
        }
        return () => {
          current === null || current === void 0 ? void 0 : current.removeEventListener("load", didLoad);
          unblock();
          continueRender(newHandle);
        };
      }, [
        actualSrc,
        delayPlayback,
        delayRenderRetries,
        delayRenderTimeoutInMilliseconds,
        pauseWhenLoading,
        sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.premounting
      ]);
    }
    return (0, import_jsx_runtime.jsx)("img", { ...props, ref: imageRef, src: actualSrc, onError: didGetError });
  };
  var Img = (0, import_react.forwardRef)(ImgRefForwarding);
  var compositionsRef = import_react.default.createRef();
  var CompositionManagerProvider = ({ children, numberOfAudioTags }) => {
    var _a;
    const [compositions, setCompositions] = (0, import_react.useState)([]);
    const currentcompositionsRef = (0, import_react.useRef)(compositions);
    const [folders, setFolders] = (0, import_react.useState)([]);
    const [canvasContent, setCanvasContent] = (0, import_react.useState)(null);
    const [currentCompositionMetadata, setCurrentCompositionMetadata] = (0, import_react.useState)(null);
    const updateCompositions = (0, import_react.useCallback)((updateComps) => {
      setCompositions((comps) => {
        const updated = updateComps(comps);
        currentcompositionsRef.current = updated;
        return updated;
      });
    }, []);
    const registerComposition = (0, import_react.useCallback)((comp) => {
      updateCompositions((comps) => {
        if (comps.find((c) => c.id === comp.id)) {
          throw new Error(`Multiple composition with id ${comp.id} are registered.`);
        }
        const value = [...comps, comp].slice().sort((a, b) => a.nonce - b.nonce);
        return value;
      });
    }, [updateCompositions]);
    const unregisterComposition = (0, import_react.useCallback)((id) => {
      setCompositions((comps) => {
        return comps.filter((c) => c.id !== id);
      });
    }, []);
    const registerFolder = (0, import_react.useCallback)((name, parent) => {
      setFolders((prevFolders) => {
        return [
          ...prevFolders,
          {
            name,
            parent
          }
        ];
      });
    }, []);
    const unregisterFolder = (0, import_react.useCallback)((name, parent) => {
      setFolders((prevFolders) => {
        return prevFolders.filter((p) => !(p.name === name && p.parent === parent));
      });
    }, []);
    (0, import_react.useImperativeHandle)(compositionsRef, () => {
      return {
        getCompositions: () => currentcompositionsRef.current
      };
    }, []);
    const composition = compositions.find((c) => (canvasContent === null || canvasContent === void 0 ? void 0 : canvasContent.type) === "composition" ? c.id === canvasContent.compositionId : null);
    const contextValue = (0, import_react.useMemo)(() => {
      return {
        compositions,
        registerComposition,
        unregisterComposition,
        folders,
        registerFolder,
        unregisterFolder,
        currentCompositionMetadata,
        setCurrentCompositionMetadata,
        canvasContent,
        setCanvasContent
      };
    }, [
      compositions,
      registerComposition,
      unregisterComposition,
      folders,
      registerFolder,
      unregisterFolder,
      currentCompositionMetadata,
      canvasContent,
      setCanvasContent
    ]);
    return (0, import_jsx_runtime.jsx)(CompositionManager.Provider, { value: contextValue, children: (0, import_jsx_runtime.jsx)(SequenceManagerProvider, { children: (0, import_jsx_runtime.jsx)(RenderAssetManagerProvider, { children: (0, import_jsx_runtime.jsx)(ResolveCompositionConfig, { children: (0, import_jsx_runtime.jsx)(SharedAudioContextProvider, { numberOfAudioTags, component: (_a = composition === null || composition === void 0 ? void 0 : composition.component) !== null && _a !== void 0 ? _a : null, children }) }) }) }) });
  };
  var injected = {};
  var injectCSS = (css) => {
    if (typeof document === "undefined") {
      return;
    }
    if (injected[css]) {
      return;
    }
    const head = document.head || document.getElementsByTagName("head")[0];
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(css));
    head.prepend(style);
    injected[css] = true;
  };
  var OFFTHREAD_VIDEO_CLASS_NAME = "__remotion_offthreadvideo";
  var makeDefaultCSS = (scope, backgroundColor) => {
    if (!scope) {
      return `
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
	    background-color: ${backgroundColor};
    }
    .${OFFTHREAD_VIDEO_CLASS_NAME} {
      object-fit: contain;
    }
    `;
    }
    return `
    ${scope} * {
      box-sizing: border-box;
    }
    ${scope} *:-webkit-full-screen {
      width: 100%;
      height: 100%;
    }
    ${scope} .${OFFTHREAD_VIDEO_CLASS_NAME} {
      object-fit: contain;
    }
  `;
  };
  var CSSUtils = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    injectCSS,
    OFFTHREAD_VIDEO_CLASS_NAME,
    makeDefaultCSS
  });
  var REMOTION_STUDIO_CONTAINER_ELEMENT = "__remotion-studio-container";
  var getPreviewDomElement = () => {
    return document.getElementById(REMOTION_STUDIO_CONTAINER_ELEMENT);
  };
  var NUMBER = "[-+]?\\d*\\.?\\d+";
  var PERCENTAGE = NUMBER + "%";
  var colorNames = {
    transparent: 0,
    // http://www.w3.org/TR/css3-color/#svg-color
    aliceblue: 4042850303,
    antiquewhite: 4209760255,
    aqua: 16777215,
    aquamarine: 2147472639,
    azure: 4043309055,
    beige: 4126530815,
    bisque: 4293182719,
    black: 255,
    blanchedalmond: 4293643775,
    blue: 65535,
    blueviolet: 2318131967,
    brown: 2771004159,
    burlywood: 3736635391,
    burntsienna: 3934150143,
    cadetblue: 1604231423,
    chartreuse: 2147418367,
    chocolate: 3530104575,
    coral: 4286533887,
    cornflowerblue: 1687547391,
    cornsilk: 4294499583,
    crimson: 3692313855,
    cyan: 16777215,
    darkblue: 35839,
    darkcyan: 9145343,
    darkgoldenrod: 3095792639,
    darkgray: 2846468607,
    darkgreen: 6553855,
    darkgrey: 2846468607,
    darkkhaki: 3182914559,
    darkmagenta: 2332068863,
    darkolivegreen: 1433087999,
    darkorange: 4287365375,
    darkorchid: 2570243327,
    darkred: 2332033279,
    darksalmon: 3918953215,
    darkseagreen: 2411499519,
    darkslateblue: 1211993087,
    darkslategray: 793726975,
    darkslategrey: 793726975,
    darkturquoise: 13554175,
    darkviolet: 2483082239,
    deeppink: 4279538687,
    deepskyblue: 12582911,
    dimgray: 1768516095,
    dimgrey: 1768516095,
    dodgerblue: 512819199,
    firebrick: 2988581631,
    floralwhite: 4294635775,
    forestgreen: 579543807,
    fuchsia: 4278255615,
    gainsboro: 3705462015,
    ghostwhite: 4177068031,
    gold: 4292280575,
    goldenrod: 3668254975,
    gray: 2155905279,
    green: 8388863,
    greenyellow: 2919182335,
    grey: 2155905279,
    honeydew: 4043305215,
    hotpink: 4285117695,
    indianred: 3445382399,
    indigo: 1258324735,
    ivory: 4294963455,
    khaki: 4041641215,
    lavender: 3873897215,
    lavenderblush: 4293981695,
    lawngreen: 2096890111,
    lemonchiffon: 4294626815,
    lightblue: 2916673279,
    lightcoral: 4034953471,
    lightcyan: 3774873599,
    lightgoldenrodyellow: 4210742015,
    lightgray: 3553874943,
    lightgreen: 2431553791,
    lightgrey: 3553874943,
    lightpink: 4290167295,
    lightsalmon: 4288707327,
    lightseagreen: 548580095,
    lightskyblue: 2278488831,
    lightslategray: 2005441023,
    lightslategrey: 2005441023,
    lightsteelblue: 2965692159,
    lightyellow: 4294959359,
    lime: 16711935,
    limegreen: 852308735,
    linen: 4210091775,
    magenta: 4278255615,
    maroon: 2147483903,
    mediumaquamarine: 1724754687,
    mediumblue: 52735,
    mediumorchid: 3126187007,
    mediumpurple: 2473647103,
    mediumseagreen: 1018393087,
    mediumslateblue: 2070474495,
    mediumspringgreen: 16423679,
    mediumturquoise: 1221709055,
    mediumvioletred: 3340076543,
    midnightblue: 421097727,
    mintcream: 4127193855,
    mistyrose: 4293190143,
    moccasin: 4293178879,
    navajowhite: 4292783615,
    navy: 33023,
    oldlace: 4260751103,
    olive: 2155872511,
    olivedrab: 1804477439,
    orange: 4289003775,
    orangered: 4282712319,
    orchid: 3664828159,
    palegoldenrod: 4008225535,
    palegreen: 2566625535,
    paleturquoise: 2951671551,
    palevioletred: 3681588223,
    papayawhip: 4293907967,
    peachpuff: 4292524543,
    peru: 3448061951,
    pink: 4290825215,
    plum: 3718307327,
    powderblue: 2967529215,
    purple: 2147516671,
    rebeccapurple: 1714657791,
    red: 4278190335,
    rosybrown: 3163525119,
    royalblue: 1097458175,
    saddlebrown: 2336560127,
    salmon: 4202722047,
    sandybrown: 4104413439,
    seagreen: 780883967,
    seashell: 4294307583,
    sienna: 2689740287,
    silver: 3233857791,
    skyblue: 2278484991,
    slateblue: 1784335871,
    slategray: 1887473919,
    slategrey: 1887473919,
    snow: 4294638335,
    springgreen: 16744447,
    steelblue: 1182971135,
    tan: 3535047935,
    teal: 8421631,
    thistle: 3636451583,
    tomato: 4284696575,
    turquoise: 1088475391,
    violet: 4001558271,
    wheat: 4125012991,
    white: 4294967295,
    whitesmoke: 4126537215,
    yellow: 4294902015,
    yellowgreen: 2597139199
  };
  var Root = null;
  var listeners = [];
  var getRoot = () => {
    return Root;
  };
  var waitForRoot = (fn) => {
    if (Root) {
      fn(Root);
      return () => void 0;
    }
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  };
  var RemotionRoot = ({ children, numberOfAudioTags }) => {
    const [remotionRootId] = (0, import_react.useState)(() => String(random(null)));
    const [frame, setFrame] = (0, import_react.useState)(() => getInitialFrameState());
    const [playing, setPlaying] = (0, import_react.useState)(false);
    const imperativePlaying = (0, import_react.useRef)(false);
    const [fastRefreshes, setFastRefreshes] = (0, import_react.useState)(0);
    const [playbackRate, setPlaybackRate] = (0, import_react.useState)(1);
    const audioAndVideoTags = (0, import_react.useRef)([]);
    if (typeof window !== "undefined") {
      (0, import_react.useLayoutEffect)(() => {
        window.remotion_setFrame = (f, composition, attempt) => {
          window.remotion_attempt = attempt;
          const id = delayRender(`Setting the current frame to ${f}`);
          setFrame((s) => ({
            ...s,
            [composition]: f
          }));
          requestAnimationFrame(() => continueRender(id));
        };
        window.remotion_isPlayer = false;
      }, []);
    }
    const timelineContextValue = (0, import_react.useMemo)(() => {
      return {
        frame,
        playing,
        imperativePlaying,
        rootId: remotionRootId,
        playbackRate,
        setPlaybackRate,
        audioAndVideoTags
      };
    }, [frame, playbackRate, playing, remotionRootId]);
    const setTimelineContextValue = (0, import_react.useMemo)(() => {
      return {
        setFrame,
        setPlaying
      };
    }, []);
    const nonceContext = (0, import_react.useMemo)(() => {
      let counter = 0;
      return {
        getNonce: () => counter++,
        fastRefreshes
      };
    }, [fastRefreshes]);
    (0, import_react.useEffect)(() => {
      if (typeof __webpack_module__ !== "undefined") {
        if (__webpack_module__.hot) {
          __webpack_module__.hot.addStatusHandler((status) => {
            if (status === "idle") {
              setFastRefreshes((i) => i + 1);
            }
          });
        }
      }
    }, []);
    return (0, import_jsx_runtime.jsx)(NonceContext.Provider, { value: nonceContext, children: (0, import_jsx_runtime.jsx)(TimelineContext.Provider, { value: timelineContextValue, children: (0, import_jsx_runtime.jsx)(SetTimelineContext.Provider, { value: setTimelineContextValue, children: (0, import_jsx_runtime.jsx)(EditorPropsProvider, { children: (0, import_jsx_runtime.jsx)(PrefetchProvider, { children: (0, import_jsx_runtime.jsx)(NativeLayersProvider, { children: (0, import_jsx_runtime.jsx)(CompositionManagerProvider, { numberOfAudioTags, children: (0, import_jsx_runtime.jsx)(DurationsContextProvider, { children: (0, import_jsx_runtime.jsx)(BufferingProvider, { children }) }) }) }) }) }) }) }) });
  };
  var getEnvVariables = () => {
    if (getRemotionEnvironment().isRendering) {
      const param = window.remotion_envVariables;
      if (!param) {
        return {};
      }
      return { ...JSON.parse(param), NODE_ENV: "production" };
    }
    if (false) {
      throw new Error(`${getEnvVar()} is not set`);
    }
    return {
      NODE_ENV: "production"
    };
  };
  var setupEnvVariables = () => {
    const env = getEnvVariables();
    if (!window.process) {
      window.process = {};
    }
    if (!window.process.env) {
      window.process.env = {};
    }
    Object.keys(env).forEach((key) => {
      window.process.env[key] = env[key];
    });
  };
  var CurrentScaleContext = import_react.default.createContext(null);
  var PreviewSizeContext = (0, import_react.createContext)({
    setSize: () => void 0,
    size: { size: "auto", translation: { x: 0, y: 0 } }
  });
  var calculateScale = ({ canvasSize, compositionHeight, compositionWidth, previewSize }) => {
    const heightRatio = canvasSize.height / compositionHeight;
    const widthRatio = canvasSize.width / compositionWidth;
    const ratio = Math.min(heightRatio, widthRatio);
    return previewSize === "auto" ? ratio : Number(previewSize);
  };
  var WATCH_REMOTION_STATIC_FILES = "remotion_staticFilesChanged";
  function useRemotionContexts() {
    const compositionManagerCtx = import_react.default.useContext(CompositionManager);
    const timelineContext = import_react.default.useContext(TimelineContext);
    const setTimelineContext = import_react.default.useContext(SetTimelineContext);
    const sequenceContext = import_react.default.useContext(SequenceContext);
    const nonceContext = import_react.default.useContext(NonceContext);
    const canUseRemotionHooksContext = import_react.default.useContext(CanUseRemotionHooks);
    const nativeLayersContext = import_react.default.useContext(NativeLayersContext);
    const preloadContext = import_react.default.useContext(PreloadContext);
    const resolveCompositionContext = import_react.default.useContext(ResolveCompositionContext);
    const renderAssetManagerContext = import_react.default.useContext(RenderAssetManager);
    const sequenceManagerContext = import_react.default.useContext(SequenceManager);
    const bufferManagerContext = import_react.default.useContext(BufferingContextReact);
    return (0, import_react.useMemo)(() => ({
      compositionManagerCtx,
      timelineContext,
      setTimelineContext,
      sequenceContext,
      nonceContext,
      canUseRemotionHooksContext,
      nativeLayersContext,
      preloadContext,
      resolveCompositionContext,
      renderAssetManagerContext,
      sequenceManagerContext,
      bufferManagerContext
    }), [
      compositionManagerCtx,
      nonceContext,
      sequenceContext,
      setTimelineContext,
      timelineContext,
      canUseRemotionHooksContext,
      nativeLayersContext,
      preloadContext,
      resolveCompositionContext,
      renderAssetManagerContext,
      sequenceManagerContext,
      bufferManagerContext
    ]);
  }
  var RemotionContextProvider = (props) => {
    const { children, contexts } = props;
    return (0, import_jsx_runtime.jsx)(CanUseRemotionHooks.Provider, { value: contexts.canUseRemotionHooksContext, children: (0, import_jsx_runtime.jsx)(NonceContext.Provider, { value: contexts.nonceContext, children: (0, import_jsx_runtime.jsx)(NativeLayersContext.Provider, { value: contexts.nativeLayersContext, children: (0, import_jsx_runtime.jsx)(PreloadContext.Provider, { value: contexts.preloadContext, children: (0, import_jsx_runtime.jsx)(CompositionManager.Provider, { value: contexts.compositionManagerCtx, children: (0, import_jsx_runtime.jsx)(SequenceManager.Provider, { value: contexts.sequenceManagerContext, children: (0, import_jsx_runtime.jsx)(RenderAssetManager.Provider, { value: contexts.renderAssetManagerContext, children: (0, import_jsx_runtime.jsx)(ResolveCompositionContext.Provider, { value: contexts.resolveCompositionContext, children: (0, import_jsx_runtime.jsx)(TimelineContext.Provider, { value: contexts.timelineContext, children: (0, import_jsx_runtime.jsx)(SetTimelineContext.Provider, { value: contexts.setTimelineContext, children: (0, import_jsx_runtime.jsx)(SequenceContext.Provider, { value: contexts.sequenceContext, children: (0, import_jsx_runtime.jsx)(BufferingContextReact.Provider, { value: contexts.bufferManagerContext, children }) }) }) }) }) }) }) }) }) }) }) });
  };
  var Internals = {
    useUnsafeVideoConfig,
    Timeline: TimelinePosition,
    CompositionManager,
    SequenceManager,
    SequenceVisibilityToggleContext,
    RemotionRoot,
    useVideo,
    getRoot,
    useMediaVolumeState,
    useMediaMutedState,
    useLazyComponent,
    truthy,
    SequenceContext,
    useRemotionContexts,
    RemotionContextProvider,
    CSSUtils,
    setupEnvVariables,
    MediaVolumeContext,
    SetMediaVolumeContext,
    getRemotionEnvironment,
    SharedAudioContext,
    SharedAudioContextProvider,
    invalidCompositionErrorMessage,
    isCompositionIdValid,
    getPreviewDomElement,
    compositionsRef,
    portalNode,
    waitForRoot,
    CanUseRemotionHooksProvider,
    CanUseRemotionHooks,
    PrefetchProvider,
    DurationsContextProvider,
    IsPlayerContextProvider,
    useIsPlayer,
    EditorPropsProvider,
    EditorPropsContext,
    usePreload,
    NonceContext,
    resolveVideoConfig,
    useResolvedVideoConfig,
    resolveCompositionsRef,
    ResolveCompositionConfig,
    REMOTION_STUDIO_CONTAINER_ELEMENT,
    RenderAssetManager,
    persistCurrentFrame,
    useTimelineSetFrame,
    FILE_TOKEN,
    DATE_TOKEN,
    NativeLayersProvider,
    ClipComposition,
    isIosSafari,
    WATCH_REMOTION_STATIC_FILES,
    addSequenceStackTraces,
    useMediaStartsAt,
    BufferingProvider,
    BufferingContextReact,
    enableSequenceStackTraces,
    colorNames,
    CurrentScaleContext,
    PreviewSizeContext,
    calculateScale
  };
  var flattenChildren = (children) => {
    const childrenArray = import_react.default.Children.toArray(children);
    return childrenArray.reduce((flatChildren, child) => {
      if (child.type === import_react.default.Fragment) {
        return flatChildren.concat(flattenChildren(child.props.children));
      }
      flatChildren.push(child);
      return flatChildren;
    }, []);
  };
  var SeriesSequenceRefForwardingFunction = ({ children }, _ref) => {
    return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
  };
  var SeriesSequence = (0, import_react.forwardRef)(SeriesSequenceRefForwardingFunction);
  var Series = ({ children }) => {
    const childrenValue = (0, import_react.useMemo)(() => {
      let startFrame = 0;
      const flattenedChildren = flattenChildren(children);
      return import_react.Children.map(flattenedChildren, (child, i) => {
        var _a;
        const castedChild = child;
        if (typeof castedChild === "string") {
          if (castedChild.trim() === "") {
            return null;
          }
          throw new TypeError(`The <Series /> component only accepts a list of <Series.Sequence /> components as its children, but you passed a string "${castedChild}"`);
        }
        if (castedChild.type !== SeriesSequence) {
          throw new TypeError(`The <Series /> component only accepts a list of <Series.Sequence /> components as its children, but got ${castedChild} instead`);
        }
        const debugInfo = `index = ${i}, duration = ${castedChild.props.durationInFrames}`;
        if (!(castedChild === null || castedChild === void 0 ? void 0 : castedChild.props.children)) {
          throw new TypeError(`A <Series.Sequence /> component (${debugInfo}) was detected to not have any children. Delete it to fix this error.`);
        }
        const durationInFramesProp = castedChild.props.durationInFrames;
        const { durationInFrames, children: _children, from, name, ...passedProps } = castedChild.props;
        if (i !== flattenedChildren.length - 1 || durationInFramesProp !== Infinity) {
          validateDurationInFrames(durationInFramesProp, {
            component: `of a <Series.Sequence /> component`,
            allowFloats: true
          });
        }
        const offset = (_a = castedChild.props.offset) !== null && _a !== void 0 ? _a : 0;
        if (Number.isNaN(offset)) {
          throw new TypeError(`The "offset" property of a <Series.Sequence /> must not be NaN, but got NaN (${debugInfo}).`);
        }
        if (!Number.isFinite(offset)) {
          throw new TypeError(`The "offset" property of a <Series.Sequence /> must be finite, but got ${offset} (${debugInfo}).`);
        }
        if (offset % 1 !== 0) {
          throw new TypeError(`The "offset" property of a <Series.Sequence /> must be finite, but got ${offset} (${debugInfo}).`);
        }
        const currentStartFrame = startFrame + offset;
        startFrame += durationInFramesProp + offset;
        return (0, import_jsx_runtime.jsx)(Sequence, { name: name || "<Series.Sequence>", from: currentStartFrame, durationInFrames: durationInFramesProp, ...passedProps, ref: castedChild.ref, children: child });
      });
    }, [children]);
    return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: childrenValue });
  };
  Series.Sequence = SeriesSequence;
  addSequenceStackTraces(SeriesSequence);
  var VideoForDevelopmentRefForwardingFunction = (props, ref) => {
    var _a, _b, _c;
    const videoRef = (0, import_react.useRef)(null);
    const volumePropFrame = useFrameForVolumeProp();
    const { fps, durationInFrames } = useVideoConfig();
    const parentSequence = (0, import_react.useContext)(SequenceContext);
    const { hidden } = (0, import_react.useContext)(SequenceVisibilityToggleContext);
    const [timelineId] = (0, import_react.useState)(() => String(Math.random()));
    const isSequenceHidden = (_a = hidden[timelineId]) !== null && _a !== void 0 ? _a : false;
    const {
      volume,
      muted,
      playbackRate,
      onlyWarnForMediaSeekingError,
      src,
      onDuration,
      // @ts-expect-error
      acceptableTimeShift,
      acceptableTimeShiftInSeconds,
      toneFrequency,
      name,
      _remotionInternalNativeLoopPassed,
      _remotionInternalStack,
      style,
      pauseWhenBuffering,
      showInTimeline,
      ...nativeProps
    } = props;
    if (typeof acceptableTimeShift !== "undefined") {
      throw new Error("acceptableTimeShift has been removed. Use acceptableTimeShiftInSeconds instead.");
    }
    const actualVolume = useMediaTagVolume(videoRef);
    const [mediaVolume] = useMediaVolumeState();
    const [mediaMuted] = useMediaMutedState();
    useMediaInTimeline({
      mediaRef: videoRef,
      volume,
      mediaVolume,
      mediaType: "video",
      src,
      playbackRate: (_b = props.playbackRate) !== null && _b !== void 0 ? _b : 1,
      displayName: name !== null && name !== void 0 ? name : null,
      id: timelineId,
      stack: _remotionInternalStack,
      showInTimeline,
      premountDisplay: null
    });
    useSyncVolumeWithMediaTag({
      volumePropFrame,
      actualVolume,
      volume,
      mediaVolume,
      mediaRef: videoRef
    });
    useMediaPlayback({
      mediaRef: videoRef,
      src,
      mediaType: "video",
      playbackRate: (_c = props.playbackRate) !== null && _c !== void 0 ? _c : 1,
      onlyWarnForMediaSeekingError,
      acceptableTimeshift: acceptableTimeShiftInSeconds !== null && acceptableTimeShiftInSeconds !== void 0 ? acceptableTimeShiftInSeconds : DEFAULT_ACCEPTABLE_TIMESHIFT
    });
    useMediaBuffering({
      element: videoRef,
      shouldBuffer: pauseWhenBuffering,
      isPremounting: Boolean(parentSequence === null || parentSequence === void 0 ? void 0 : parentSequence.premounting)
    });
    const actualFrom = parentSequence ? parentSequence.relativeFrom + parentSequence.cumulatedFrom : 0;
    const duration = parentSequence ? Math.min(parentSequence.durationInFrames, durationInFrames) : durationInFrames;
    const actualSrc = useAppendVideoFragment({
      actualSrc: usePreload(src),
      actualFrom,
      duration,
      fps
    });
    (0, import_react.useImperativeHandle)(ref, () => {
      return videoRef.current;
    }, []);
    (0, import_react.useEffect)(() => {
      const { current } = videoRef;
      if (!current) {
        return;
      }
      const errorHandler = () => {
        var _a2;
        if (current === null || current === void 0 ? void 0 : current.error) {
          console.error("Error occurred in video", current === null || current === void 0 ? void 0 : current.error);
          if (props.onError) {
            return;
          }
          throw new Error(`The browser threw an error while playing the video ${src}: Code ${current.error.code} - ${(_a2 = current === null || current === void 0 ? void 0 : current.error) === null || _a2 === void 0 ? void 0 : _a2.message}. See https://remotion.dev/docs/media-playback-error for help. Pass an onError() prop to handle the error.`);
        } else {
          throw new Error("The browser threw an error");
        }
      };
      current.addEventListener("error", errorHandler, { once: true });
      return () => {
        current.removeEventListener("error", errorHandler);
      };
    }, [props.onError, src]);
    const currentOnDurationCallback = (0, import_react.useRef)();
    currentOnDurationCallback.current = onDuration;
    (0, import_react.useEffect)(() => {
      var _a2;
      const { current } = videoRef;
      if (!current) {
        return;
      }
      if (current.duration) {
        (_a2 = currentOnDurationCallback.current) === null || _a2 === void 0 ? void 0 : _a2.call(currentOnDurationCallback, src, current.duration);
        return;
      }
      const onLoadedMetadata = () => {
        var _a3;
        (_a3 = currentOnDurationCallback.current) === null || _a3 === void 0 ? void 0 : _a3.call(currentOnDurationCallback, src, current.duration);
      };
      current.addEventListener("loadedmetadata", onLoadedMetadata);
      return () => {
        current.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    }, [src]);
    (0, import_react.useEffect)(() => {
      const { current } = videoRef;
      if (!current) {
        return;
      }
      if (isIosSafari()) {
        current.preload = "metadata";
      } else {
        current.preload = "auto";
      }
    }, []);
    const actualStyle = (0, import_react.useMemo)(() => {
      var _a2;
      return {
        ...style,
        opacity: isSequenceHidden ? 0 : (_a2 = style === null || style === void 0 ? void 0 : style.opacity) !== null && _a2 !== void 0 ? _a2 : 1
      };
    }, [isSequenceHidden, style]);
    return (0, import_jsx_runtime.jsx)("video", { ref: videoRef, muted: muted || mediaMuted, playsInline: true, src: actualSrc, loop: _remotionInternalNativeLoopPassed, style: actualStyle, ...nativeProps });
  };
  var VideoForPreview = (0, import_react.forwardRef)(VideoForDevelopmentRefForwardingFunction);
  var roundTo6Commas = (num) => {
    return Math.round(num * 1e5) / 1e5;
  };
  var seekToTime = (element, desiredTime) => {
    element.currentTime = desiredTime;
    let cancel;
    let cancelSeeked = null;
    const prom = new Promise((resolve) => {
      cancel = element.requestVideoFrameCallback((now, metadata) => {
        const displayIn = metadata.expectedDisplayTime - now;
        if (displayIn <= 0) {
          resolve(metadata.mediaTime);
          return;
        }
        setTimeout(() => {
          resolve(metadata.mediaTime);
        }, displayIn + 150);
      });
    });
    const waitForSeekedEvent = new Promise((resolve) => {
      const onDone = () => {
        resolve();
      };
      element.addEventListener("seeked", onDone, {
        once: true
      });
      cancelSeeked = () => {
        element.removeEventListener("seeked", onDone);
      };
    });
    return {
      wait: Promise.all([prom, waitForSeekedEvent]).then(([time]) => time),
      cancel: () => {
        cancelSeeked === null || cancelSeeked === void 0 ? void 0 : cancelSeeked();
        element.cancelVideoFrameCallback(cancel);
      }
    };
  };
  var seekToTimeMultipleUntilRight = (element, desiredTime, fps) => {
    const threshold = 1 / fps / 2;
    let currentCancel = () => void 0;
    if (Number.isFinite(element.duration) && element.currentTime >= element.duration && desiredTime >= element.duration) {
      return {
        prom: Promise.resolve(),
        cancel: () => {
        }
      };
    }
    const prom = new Promise((resolve, reject) => {
      const firstSeek = seekToTime(element, desiredTime + threshold);
      firstSeek.wait.then((seekedTo) => {
        const difference = Math.abs(desiredTime - seekedTo);
        if (difference <= threshold) {
          return resolve();
        }
        const sign = desiredTime > seekedTo ? 1 : -1;
        const newSeek = seekToTime(element, seekedTo + threshold * sign);
        currentCancel = newSeek.cancel;
        newSeek.wait.then((newTime) => {
          const newDifference = Math.abs(desiredTime - newTime);
          if (roundTo6Commas(newDifference) <= roundTo6Commas(threshold)) {
            return resolve();
          }
          const thirdSeek = seekToTime(element, desiredTime + threshold);
          currentCancel = thirdSeek.cancel;
          return thirdSeek.wait.then(() => {
            resolve();
          }).catch((err) => {
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      });
      currentCancel = firstSeek.cancel;
    });
    return {
      prom,
      cancel: () => {
        currentCancel();
      }
    };
  };
  var VideoForRenderingForwardFunction = ({ onError, volume: volumeProp, allowAmplificationDuringRender, playbackRate, onDuration, toneFrequency, name, acceptableTimeShiftInSeconds, delayRenderRetries, delayRenderTimeoutInMilliseconds, ...props }, ref) => {
    const absoluteFrame = useTimelinePosition();
    const frame = useCurrentFrame();
    const volumePropsFrame = useFrameForVolumeProp();
    const videoConfig = useUnsafeVideoConfig();
    const videoRef = (0, import_react.useRef)(null);
    const sequenceContext = (0, import_react.useContext)(SequenceContext);
    const mediaStartsAt = useMediaStartsAt();
    const environment = getRemotionEnvironment();
    const { registerRenderAsset, unregisterRenderAsset } = (0, import_react.useContext)(RenderAssetManager);
    const id = (0, import_react.useMemo)(() => {
      var _a;
      return `video-${random((_a = props.src) !== null && _a !== void 0 ? _a : "")}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom}-${sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames}`;
    }, [
      props.src,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.cumulatedFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.relativeFrom,
      sequenceContext === null || sequenceContext === void 0 ? void 0 : sequenceContext.durationInFrames
    ]);
    if (!videoConfig) {
      throw new Error("No video config found");
    }
    const volume = evaluateVolume({
      volume: volumeProp,
      frame: volumePropsFrame,
      mediaVolume: 1,
      allowAmplificationDuringRender: allowAmplificationDuringRender !== null && allowAmplificationDuringRender !== void 0 ? allowAmplificationDuringRender : false
    });
    (0, import_react.useEffect)(() => {
      if (!props.src) {
        throw new Error("No src passed");
      }
      if (props.muted) {
        return;
      }
      if (volume <= 0) {
        return;
      }
      if (!window.remotion_audioEnabled) {
        return;
      }
      registerRenderAsset({
        type: "video",
        src: getAbsoluteSrc(props.src),
        id,
        frame: absoluteFrame,
        volume,
        mediaFrame: frame,
        playbackRate: playbackRate !== null && playbackRate !== void 0 ? playbackRate : 1,
        allowAmplificationDuringRender: allowAmplificationDuringRender !== null && allowAmplificationDuringRender !== void 0 ? allowAmplificationDuringRender : false,
        toneFrequency: toneFrequency !== null && toneFrequency !== void 0 ? toneFrequency : null
      });
      return () => unregisterRenderAsset(id);
    }, [
      props.muted,
      props.src,
      registerRenderAsset,
      id,
      unregisterRenderAsset,
      volume,
      frame,
      absoluteFrame,
      playbackRate,
      allowAmplificationDuringRender,
      toneFrequency
    ]);
    (0, import_react.useImperativeHandle)(ref, () => {
      return videoRef.current;
    }, []);
    (0, import_react.useEffect)(() => {
      if (!window.remotion_videoEnabled) {
        return;
      }
      const { current } = videoRef;
      if (!current) {
        return;
      }
      const currentTime = getMediaTime({
        frame,
        playbackRate: playbackRate || 1,
        startFrom: -mediaStartsAt,
        fps: videoConfig.fps
      });
      const handle = delayRender(`Rendering <Video /> with src="${props.src}"`, {
        retries: delayRenderRetries !== null && delayRenderRetries !== void 0 ? delayRenderRetries : void 0,
        timeoutInMilliseconds: delayRenderTimeoutInMilliseconds !== null && delayRenderTimeoutInMilliseconds !== void 0 ? delayRenderTimeoutInMilliseconds : void 0
      });
      if (false) {
        continueRender(handle);
        return;
      }
      if (isApproximatelyTheSame(current.currentTime, currentTime)) {
        if (current.readyState >= 2) {
          continueRender(handle);
          return;
        }
        const loadedDataHandler = () => {
          continueRender(handle);
        };
        current.addEventListener("loadeddata", loadedDataHandler, { once: true });
        return () => {
          current.removeEventListener("loadeddata", loadedDataHandler);
        };
      }
      const endedHandler = () => {
        continueRender(handle);
      };
      const seek2 = seekToTimeMultipleUntilRight(current, currentTime, videoConfig.fps);
      seek2.prom.then(() => {
        continueRender(handle);
      });
      current.addEventListener("ended", endedHandler, { once: true });
      const errorHandler = () => {
        var _a;
        if (current === null || current === void 0 ? void 0 : current.error) {
          console.error("Error occurred in video", current === null || current === void 0 ? void 0 : current.error);
          if (onError) {
            return;
          }
          throw new Error(`The browser threw an error while playing the video ${props.src}: Code ${current.error.code} - ${(_a = current === null || current === void 0 ? void 0 : current.error) === null || _a === void 0 ? void 0 : _a.message}. See https://remotion.dev/docs/media-playback-error for help. Pass an onError() prop to handle the error.`);
        } else {
          throw new Error("The browser threw an error");
        }
      };
      current.addEventListener("error", errorHandler, { once: true });
      return () => {
        seek2.cancel();
        current.removeEventListener("ended", endedHandler);
        current.removeEventListener("error", errorHandler);
        continueRender(handle);
      };
    }, [
      volumePropsFrame,
      props.src,
      playbackRate,
      videoConfig.fps,
      frame,
      mediaStartsAt,
      onError,
      delayRenderRetries,
      delayRenderTimeoutInMilliseconds
    ]);
    const { src } = props;
    if (environment.isRendering) {
      (0, import_react.useLayoutEffect)(() => {
        if (false) {
          return;
        }
        const newHandle = delayRender("Loading <Video> duration with src=" + src, {
          retries: delayRenderRetries !== null && delayRenderRetries !== void 0 ? delayRenderRetries : void 0,
          timeoutInMilliseconds: delayRenderTimeoutInMilliseconds !== null && delayRenderTimeoutInMilliseconds !== void 0 ? delayRenderTimeoutInMilliseconds : void 0
        });
        const { current } = videoRef;
        const didLoad = () => {
          if (current === null || current === void 0 ? void 0 : current.duration) {
            onDuration(src, current.duration);
          }
          continueRender(newHandle);
        };
        if (current === null || current === void 0 ? void 0 : current.duration) {
          onDuration(src, current.duration);
          continueRender(newHandle);
        } else {
          current === null || current === void 0 ? void 0 : current.addEventListener("loadedmetadata", didLoad, { once: true });
        }
        return () => {
          current === null || current === void 0 ? void 0 : current.removeEventListener("loadedmetadata", didLoad);
          continueRender(newHandle);
        };
      }, [src, onDuration, delayRenderRetries, delayRenderTimeoutInMilliseconds]);
    }
    return (0, import_jsx_runtime.jsx)("video", { ref: videoRef, ...props, onError });
  };
  var VideoForRendering = (0, import_react.forwardRef)(VideoForRenderingForwardFunction);
  var VideoForwardingFunction = (props, ref) => {
    var _a, _b;
    const { startFrom, endAt, name, pauseWhenBuffering, stack, _remotionInternalNativeLoopPassed, showInTimeline, ...otherProps } = props;
    const { loop, ...propsOtherThanLoop } = props;
    const { fps } = useVideoConfig();
    const environment = getRemotionEnvironment();
    const { durations, setDurations } = (0, import_react.useContext)(DurationsContext);
    if (typeof ref === "string") {
      throw new Error("string refs are not supported");
    }
    if (typeof props.src !== "string") {
      throw new TypeError(`The \`<Video>\` tag requires a string for \`src\`, but got ${JSON.stringify(props.src)} instead.`);
    }
    const preloadedSrc = usePreload(props.src);
    const onDuration = (0, import_react.useCallback)((src, durationInSeconds) => {
      setDurations({ type: "got-duration", durationInSeconds, src });
    }, [setDurations]);
    const durationFetched = (_a = durations[getAbsoluteSrc(preloadedSrc)]) !== null && _a !== void 0 ? _a : durations[getAbsoluteSrc(props.src)];
    if (loop && durationFetched !== void 0) {
      const mediaDuration = durationFetched * fps;
      return (0, import_jsx_runtime.jsx)(Loop, { durationInFrames: calculateLoopDuration({
        endAt,
        mediaDuration,
        playbackRate: (_b = props.playbackRate) !== null && _b !== void 0 ? _b : 1,
        startFrom
      }), layout: "none", name, children: (0, import_jsx_runtime.jsx)(Video, { ...propsOtherThanLoop, ref, _remotionInternalNativeLoopPassed: true }) });
    }
    if (typeof startFrom !== "undefined" || typeof endAt !== "undefined") {
      validateStartFromProps(startFrom, endAt);
      const startFromFrameNo = startFrom !== null && startFrom !== void 0 ? startFrom : 0;
      const endAtFrameNo = endAt !== null && endAt !== void 0 ? endAt : Infinity;
      return (0, import_jsx_runtime.jsx)(Sequence, { layout: "none", from: 0 - startFromFrameNo, showInTimeline: false, durationInFrames: endAtFrameNo, name, children: (0, import_jsx_runtime.jsx)(Video, { pauseWhenBuffering: pauseWhenBuffering !== null && pauseWhenBuffering !== void 0 ? pauseWhenBuffering : false, ...otherProps, ref }) });
    }
    validateMediaProps(props, "Video");
    if (environment.isRendering) {
      return (0, import_jsx_runtime.jsx)(VideoForRendering, { onDuration, ...otherProps, ref });
    }
    return (0, import_jsx_runtime.jsx)(VideoForPreview, {
      onlyWarnForMediaSeekingError: false,
      ...otherProps,
      ref,
      // Proposal: Make this default to true in v5
      pauseWhenBuffering: pauseWhenBuffering !== null && pauseWhenBuffering !== void 0 ? pauseWhenBuffering : false,
      onDuration,
      _remotionInternalStack: stack !== null && stack !== void 0 ? stack : null,
      _remotionInternalNativeLoopPassed: _remotionInternalNativeLoopPassed !== null && _remotionInternalNativeLoopPassed !== void 0 ? _remotionInternalNativeLoopPassed : false,
      showInTimeline: showInTimeline !== null && showInTimeline !== void 0 ? showInTimeline : true
    });
  };
  var Video = (0, import_react.forwardRef)(VideoForwardingFunction);
  addSequenceStackTraces(Video);
  checkMultipleRemotionVersions();
  var proxyObj = {};
  var Config = new Proxy(proxyObj, {
    get(_, prop) {
      if (prop === "Bundling" || prop === "Rendering" || prop === "Log" || prop === "Puppeteer" || prop === "Output") {
        return Config;
      }
      return () => {
        console.warn("\u26A0\uFE0F  The CLI configuration has been extracted from Remotion Core.");
        console.warn("Update the import from the config file:");
        console.warn();
        console.warn("- Delete:");
        console.warn('import {Config} from "remotion";');
        console.warn("+ Replace:");
        console.warn('import {Config} from "@remotion/cli/config";');
        console.warn();
        console.warn("For more information, see https://www.remotion.dev/docs/4-0-migration.");
        process.exit(1);
      };
    }
  });
  addSequenceStackTraces(Sequence);

  // node_modules/@remotion/player/dist/esm/index.mjs
  var import_react2 = __toESM(require_react(), 1);

  // node_modules/remotion/dist/esm/no-react.mjs
  function interpolateFunction2(input, inputRange, outputRange, options) {
    const { extrapolateLeft, extrapolateRight, easing } = options;
    let result = input;
    const [inputMin, inputMax] = inputRange;
    const [outputMin, outputMax] = outputRange;
    if (result < inputMin) {
      if (extrapolateLeft === "identity") {
        return result;
      }
      if (extrapolateLeft === "clamp") {
        result = inputMin;
      } else if (extrapolateLeft === "wrap") {
        const range = inputMax - inputMin;
        result = ((result - inputMin) % range + range) % range + inputMin;
      } else
        ;
    }
    if (result > inputMax) {
      if (extrapolateRight === "identity") {
        return result;
      }
      if (extrapolateRight === "clamp") {
        result = inputMax;
      } else if (extrapolateRight === "wrap") {
        const range = inputMax - inputMin;
        result = ((result - inputMin) % range + range) % range + inputMin;
      } else
        ;
    }
    if (outputMin === outputMax) {
      return outputMin;
    }
    result = (result - inputMin) / (inputMax - inputMin);
    result = easing(result);
    result = result * (outputMax - outputMin) + outputMin;
    return result;
  }
  function findRange2(input, inputRange) {
    let i;
    for (i = 1; i < inputRange.length - 1; ++i) {
      if (inputRange[i] >= input) {
        break;
      }
    }
    return i - 1;
  }
  function checkValidInputRange2(arr) {
    for (let i = 1; i < arr.length; ++i) {
      if (!(arr[i] > arr[i - 1])) {
        throw new Error(`inputRange must be strictly monotonically increasing but got [${arr.join(",")}]`);
      }
    }
  }
  function checkInfiniteRange2(name, arr) {
    if (arr.length < 2) {
      throw new Error(name + " must have at least 2 elements");
    }
    for (const index in arr) {
      if (typeof arr[index] !== "number") {
        throw new Error(`${name} must contain only numbers`);
      }
      if (arr[index] === -Infinity || arr[index] === Infinity) {
        throw new Error(`${name} must contain only finite numbers, but got [${arr.join(",")}]`);
      }
    }
  }
  function interpolate2(input, inputRange, outputRange, options) {
    var _a;
    if (typeof input === "undefined") {
      throw new Error("input can not be undefined");
    }
    if (typeof inputRange === "undefined") {
      throw new Error("inputRange can not be undefined");
    }
    if (typeof outputRange === "undefined") {
      throw new Error("outputRange can not be undefined");
    }
    if (inputRange.length !== outputRange.length) {
      throw new Error("inputRange (" + inputRange.length + ") and outputRange (" + outputRange.length + ") must have the same length");
    }
    checkInfiniteRange2("inputRange", inputRange);
    checkInfiniteRange2("outputRange", outputRange);
    checkValidInputRange2(inputRange);
    const easing = (_a = options === null || options === void 0 ? void 0 : options.easing) !== null && _a !== void 0 ? _a : (num) => num;
    let extrapolateLeft = "extend";
    if ((options === null || options === void 0 ? void 0 : options.extrapolateLeft) !== void 0) {
      extrapolateLeft = options.extrapolateLeft;
    }
    let extrapolateRight = "extend";
    if ((options === null || options === void 0 ? void 0 : options.extrapolateRight) !== void 0) {
      extrapolateRight = options.extrapolateRight;
    }
    if (typeof input !== "number") {
      throw new TypeError("Cannot interpolate an input which is not a number");
    }
    const range = findRange2(input, inputRange);
    return interpolateFunction2(input, [inputRange[range], inputRange[range + 1]], [outputRange[range], outputRange[range + 1]], {
      easing,
      extrapolateLeft,
      extrapolateRight
    });
  }
  function truthy2(value) {
    return Boolean(value);
  }
  if (typeof window !== "undefined") {
    window.remotion_renderReady = false;
  }
  if (typeof window !== "undefined") {
    window.remotion_delayRenderTimeouts = {};
  }
  var DELAY_RENDER_CALLSTACK_TOKEN2 = "The delayRender was called:";
  var DELAY_RENDER_RETRIES_LEFT2 = "Retries left: ";
  var DELAY_RENDER_RETRY_TOKEN2 = "- Rendering the frame will be retried.";
  var problematicCharacters2 = {
    "%3A": ":",
    "%2F": "/",
    "%3F": "?",
    "%23": "#",
    "%5B": "[",
    "%5D": "]",
    "%40": "@",
    "%21": "!",
    "%24": "$",
    "%26": "&",
    "%27": "'",
    "%28": "(",
    "%29": ")",
    "%2A": "*",
    "%2B": "+",
    "%2C": ",",
    "%3B": ";"
  };
  var didWarn2 = {};
  var warnOnce2 = (message) => {
    if (didWarn2[message]) {
      return;
    }
    console.warn(message);
    didWarn2[message] = true;
  };
  var includesHexOfUnsafeChar2 = (path) => {
    for (const key of Object.keys(problematicCharacters2)) {
      if (path.includes(key)) {
        return { containsHex: true, hexCode: key };
      }
    }
    return { containsHex: false };
  };
  var trimLeadingSlash2 = (path) => {
    if (path.startsWith("/")) {
      return trimLeadingSlash2(path.substring(1));
    }
    return path;
  };
  var inner2 = (path) => {
    if (typeof window !== "undefined" && window.remotion_staticBase) {
      if (path.startsWith(window.remotion_staticBase)) {
        throw new Error(`The value "${path}" is already prefixed with the static base ${window.remotion_staticBase}. You don't need to call staticFile() on it.`);
      }
      return `${window.remotion_staticBase}/${trimLeadingSlash2(path)}`;
    }
    return `/${trimLeadingSlash2(path)}`;
  };
  var encodeBySplitting2 = (path) => {
    const splitBySlash = path.split("/");
    const encodedArray = splitBySlash.map((element) => {
      return encodeURIComponent(element);
    });
    const merged = encodedArray.join("/");
    return merged;
  };
  var staticFile2 = (path) => {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      throw new TypeError(`staticFile() does not support remote URLs - got "${path}". Instead, pass the URL without wrapping it in staticFile(). See: https://remotion.dev/docs/staticfile-remote-urls`);
    }
    if (path.startsWith("..") || path.startsWith("./")) {
      throw new TypeError(`staticFile() does not support relative paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    if (path.startsWith("/Users") || path.startsWith("/home") || path.startsWith("/tmp") || path.startsWith("/etc") || path.startsWith("/opt") || path.startsWith("/var") || path.startsWith("C:") || path.startsWith("D:") || path.startsWith("E:")) {
      throw new TypeError(`staticFile() does not support absolute paths - got "${path}". Instead, pass the name of a file that is inside the public/ folder. See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    if (path.startsWith("public/")) {
      throw new TypeError(`Do not include the public/ prefix when using staticFile() - got "${path}". See: https://remotion.dev/docs/staticfile-relative-paths`);
    }
    const includesHex = includesHexOfUnsafeChar2(path);
    if (includesHex.containsHex) {
      warnOnce2(`WARNING: You seem to pass an already encoded path (path contains ${includesHex.hexCode}). Since Remotion 4.0, the encoding is done by staticFile() itself. You may want to remove a encodeURIComponent() wrapping.`);
    }
    const preprocessed = encodeBySplitting2(path);
    const preparsed = inner2(preprocessed);
    if (!preparsed.startsWith("/")) {
      return `/${preparsed}`;
    }
    return preparsed;
  };
  var DATE_TOKEN2 = "remotion-date:";
  var FILE_TOKEN2 = "remotion-file:";
  var serializeJSONWithDate = ({ data, indent, staticBase }) => {
    let customDateUsed = false;
    let customFileUsed = false;
    let mapUsed = false;
    let setUsed = false;
    const serializedString = JSON.stringify(data, function(key, value) {
      const item = this[key];
      if (item instanceof Date) {
        customDateUsed = true;
        return `${DATE_TOKEN2}${item.toISOString()}`;
      }
      if (item instanceof Map) {
        mapUsed = true;
        return value;
      }
      if (item instanceof Set) {
        setUsed = true;
        return value;
      }
      if (typeof item === "string" && staticBase !== null && item.startsWith(staticBase)) {
        customFileUsed = true;
        return `${FILE_TOKEN2}${item.replace(staticBase + "/", "")}`;
      }
      return value;
    }, indent);
    return { serializedString, customDateUsed, customFileUsed, mapUsed, setUsed };
  };
  var deserializeJSONWithCustomFields2 = (data) => {
    return JSON.parse(data, (_, value) => {
      if (typeof value === "string" && value.startsWith(DATE_TOKEN2)) {
        return new Date(value.replace(DATE_TOKEN2, ""));
      }
      if (typeof value === "string" && value.startsWith(FILE_TOKEN2)) {
        return staticFile2(value.replace(FILE_TOKEN2, ""));
      }
      return value;
    });
  };
  var NUMBER2 = "[-+]?\\d*\\.?\\d+";
  var PERCENTAGE2 = NUMBER2 + "%";
  function call(...args) {
    return "\\(\\s*(" + args.join(")\\s*,\\s*(") + ")\\s*\\)";
  }
  function getMatchers() {
    const cachedMatchers = {
      rgb: void 0,
      rgba: void 0,
      hsl: void 0,
      hsla: void 0,
      hex3: void 0,
      hex4: void 0,
      hex5: void 0,
      hex6: void 0,
      hex8: void 0
    };
    if (cachedMatchers.rgb === void 0) {
      cachedMatchers.rgb = new RegExp("rgb" + call(NUMBER2, NUMBER2, NUMBER2));
      cachedMatchers.rgba = new RegExp("rgba" + call(NUMBER2, NUMBER2, NUMBER2, NUMBER2));
      cachedMatchers.hsl = new RegExp("hsl" + call(NUMBER2, PERCENTAGE2, PERCENTAGE2));
      cachedMatchers.hsla = new RegExp("hsla" + call(NUMBER2, PERCENTAGE2, PERCENTAGE2, NUMBER2));
      cachedMatchers.hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
      cachedMatchers.hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
      cachedMatchers.hex6 = /^#([0-9a-fA-F]{6})$/;
      cachedMatchers.hex8 = /^#([0-9a-fA-F]{8})$/;
    }
    return cachedMatchers;
  }
  function hue2rgb(p, q, t) {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }
  function hslToRgb(h, s, l) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1 / 3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1 / 3);
    return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
  }
  function parse255(str) {
    const int = Number.parseInt(str, 10);
    if (int < 0) {
      return 0;
    }
    if (int > 255) {
      return 255;
    }
    return int;
  }
  function parse360(str) {
    const int = Number.parseFloat(str);
    return (int % 360 + 360) % 360 / 360;
  }
  function parse1(str) {
    const num = Number.parseFloat(str);
    if (num < 0) {
      return 0;
    }
    if (num > 1) {
      return 255;
    }
    return Math.round(num * 255);
  }
  function parsePercentage(str) {
    const int = Number.parseFloat(str);
    if (int < 0) {
      return 0;
    }
    if (int > 100) {
      return 1;
    }
    return int / 100;
  }
  var colorNames2 = {
    transparent: 0,
    // http://www.w3.org/TR/css3-color/#svg-color
    aliceblue: 4042850303,
    antiquewhite: 4209760255,
    aqua: 16777215,
    aquamarine: 2147472639,
    azure: 4043309055,
    beige: 4126530815,
    bisque: 4293182719,
    black: 255,
    blanchedalmond: 4293643775,
    blue: 65535,
    blueviolet: 2318131967,
    brown: 2771004159,
    burlywood: 3736635391,
    burntsienna: 3934150143,
    cadetblue: 1604231423,
    chartreuse: 2147418367,
    chocolate: 3530104575,
    coral: 4286533887,
    cornflowerblue: 1687547391,
    cornsilk: 4294499583,
    crimson: 3692313855,
    cyan: 16777215,
    darkblue: 35839,
    darkcyan: 9145343,
    darkgoldenrod: 3095792639,
    darkgray: 2846468607,
    darkgreen: 6553855,
    darkgrey: 2846468607,
    darkkhaki: 3182914559,
    darkmagenta: 2332068863,
    darkolivegreen: 1433087999,
    darkorange: 4287365375,
    darkorchid: 2570243327,
    darkred: 2332033279,
    darksalmon: 3918953215,
    darkseagreen: 2411499519,
    darkslateblue: 1211993087,
    darkslategray: 793726975,
    darkslategrey: 793726975,
    darkturquoise: 13554175,
    darkviolet: 2483082239,
    deeppink: 4279538687,
    deepskyblue: 12582911,
    dimgray: 1768516095,
    dimgrey: 1768516095,
    dodgerblue: 512819199,
    firebrick: 2988581631,
    floralwhite: 4294635775,
    forestgreen: 579543807,
    fuchsia: 4278255615,
    gainsboro: 3705462015,
    ghostwhite: 4177068031,
    gold: 4292280575,
    goldenrod: 3668254975,
    gray: 2155905279,
    green: 8388863,
    greenyellow: 2919182335,
    grey: 2155905279,
    honeydew: 4043305215,
    hotpink: 4285117695,
    indianred: 3445382399,
    indigo: 1258324735,
    ivory: 4294963455,
    khaki: 4041641215,
    lavender: 3873897215,
    lavenderblush: 4293981695,
    lawngreen: 2096890111,
    lemonchiffon: 4294626815,
    lightblue: 2916673279,
    lightcoral: 4034953471,
    lightcyan: 3774873599,
    lightgoldenrodyellow: 4210742015,
    lightgray: 3553874943,
    lightgreen: 2431553791,
    lightgrey: 3553874943,
    lightpink: 4290167295,
    lightsalmon: 4288707327,
    lightseagreen: 548580095,
    lightskyblue: 2278488831,
    lightslategray: 2005441023,
    lightslategrey: 2005441023,
    lightsteelblue: 2965692159,
    lightyellow: 4294959359,
    lime: 16711935,
    limegreen: 852308735,
    linen: 4210091775,
    magenta: 4278255615,
    maroon: 2147483903,
    mediumaquamarine: 1724754687,
    mediumblue: 52735,
    mediumorchid: 3126187007,
    mediumpurple: 2473647103,
    mediumseagreen: 1018393087,
    mediumslateblue: 2070474495,
    mediumspringgreen: 16423679,
    mediumturquoise: 1221709055,
    mediumvioletred: 3340076543,
    midnightblue: 421097727,
    mintcream: 4127193855,
    mistyrose: 4293190143,
    moccasin: 4293178879,
    navajowhite: 4292783615,
    navy: 33023,
    oldlace: 4260751103,
    olive: 2155872511,
    olivedrab: 1804477439,
    orange: 4289003775,
    orangered: 4282712319,
    orchid: 3664828159,
    palegoldenrod: 4008225535,
    palegreen: 2566625535,
    paleturquoise: 2951671551,
    palevioletred: 3681588223,
    papayawhip: 4293907967,
    peachpuff: 4292524543,
    peru: 3448061951,
    pink: 4290825215,
    plum: 3718307327,
    powderblue: 2967529215,
    purple: 2147516671,
    rebeccapurple: 1714657791,
    red: 4278190335,
    rosybrown: 3163525119,
    royalblue: 1097458175,
    saddlebrown: 2336560127,
    salmon: 4202722047,
    sandybrown: 4104413439,
    seagreen: 780883967,
    seashell: 4294307583,
    sienna: 2689740287,
    silver: 3233857791,
    skyblue: 2278484991,
    slateblue: 1784335871,
    slategray: 1887473919,
    slategrey: 1887473919,
    snow: 4294638335,
    springgreen: 16744447,
    steelblue: 1182971135,
    tan: 3535047935,
    teal: 8421631,
    thistle: 3636451583,
    tomato: 4284696575,
    turquoise: 1088475391,
    violet: 4001558271,
    wheat: 4125012991,
    white: 4294967295,
    whitesmoke: 4126537215,
    yellow: 4294902015,
    yellowgreen: 2597139199
  };
  function normalizeColor(color) {
    const matchers = getMatchers();
    let match;
    if (matchers.hex6) {
      if (match = matchers.hex6.exec(color)) {
        return Number.parseInt(match[1] + "ff", 16) >>> 0;
      }
    }
    if (colorNames2[color] !== void 0) {
      return colorNames2[color];
    }
    if (matchers.rgb) {
      if (match = matchers.rgb.exec(color)) {
        return (
          // b
          (parse255(match[1]) << 24 | // r
          parse255(match[2]) << 16 | // g
          parse255(match[3]) << 8 | 255) >>> // a
          0
        );
      }
    }
    if (matchers.rgba) {
      if (match = matchers.rgba.exec(color)) {
        return (
          // b
          (parse255(match[1]) << 24 | // r
          parse255(match[2]) << 16 | // g
          parse255(match[3]) << 8 | parse1(match[4])) >>> // a
          0
        );
      }
    }
    if (matchers.hex3) {
      if (match = matchers.hex3.exec(color)) {
        return Number.parseInt(
          match[1] + match[1] + // r
          match[2] + match[2] + // g
          match[3] + match[3] + // b
          "ff",
          // a
          16
        ) >>> 0;
      }
    }
    if (matchers.hex8) {
      if (match = matchers.hex8.exec(color)) {
        return Number.parseInt(match[1], 16) >>> 0;
      }
    }
    if (matchers.hex4) {
      if (match = matchers.hex4.exec(color)) {
        return Number.parseInt(
          match[1] + match[1] + // r
          match[2] + match[2] + // g
          match[3] + match[3] + // b
          match[4] + match[4],
          // a
          16
        ) >>> 0;
      }
    }
    if (matchers.hsl) {
      if (match = matchers.hsl.exec(color)) {
        return (hslToRgb(
          parse360(match[1]),
          // h
          parsePercentage(match[2]),
          // s
          parsePercentage(match[3])
        ) | 255) >>> // a
        0;
      }
    }
    if (matchers.hsla) {
      if (match = matchers.hsla.exec(color)) {
        return (hslToRgb(
          parse360(match[1]),
          // h
          parsePercentage(match[2]),
          // s
          parsePercentage(match[3])
        ) | parse1(match[4])) >>> // a
        0;
      }
    }
    throw new Error(`invalid color string ${color} provided`);
  }
  function processColor(color) {
    const normalizedColor = normalizeColor(color);
    return (normalizedColor << 24 | normalizedColor >>> 8) >>> 0;
  }
  var validateFrame = ({ allowFloats, durationInFrames, frame }) => {
    if (typeof frame === "undefined") {
      throw new TypeError(`Argument missing for parameter "frame"`);
    }
    if (typeof frame !== "number") {
      throw new TypeError(`Argument passed for "frame" is not a number: ${frame}`);
    }
    if (!Number.isFinite(frame)) {
      throw new RangeError(`Frame ${frame} is not finite`);
    }
    if (frame % 1 !== 0 && !allowFloats) {
      throw new RangeError(`Argument for frame must be an integer, but got ${frame}`);
    }
    if (frame < 0 && frame < -durationInFrames) {
      throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the lowest frame that can be rendered is ${-durationInFrames}`);
    }
    if (frame > durationInFrames - 1) {
      throw new RangeError(`Cannot use frame ${frame}: Duration of composition is ${durationInFrames}, therefore the highest frame that can be rendered is ${durationInFrames - 1}`);
    }
  };
  var validateDefaultAndInputProps2 = (defaultProps, name, compositionId) => {
    if (!defaultProps) {
      return;
    }
    if (typeof defaultProps !== "object") {
      throw new Error(`"${name}" must be an object, but you passed a value of type ${typeof defaultProps}`);
    }
    if (Array.isArray(defaultProps)) {
      throw new Error(`"${name}" must be an object, an array was passed ${compositionId ? `for composition "${compositionId}"` : ""}`);
    }
  };
  function validateDimension2(amount, nameOfProp, location) {
    if (typeof amount !== "number") {
      throw new Error(`The "${nameOfProp}" prop ${location} must be a number, but you passed a value of type ${typeof amount}`);
    }
    if (isNaN(amount)) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must not be NaN, but is NaN.`);
    }
    if (!Number.isFinite(amount)) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be finite, but is ${amount}.`);
    }
    if (amount % 1 !== 0) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be an integer, but is ${amount}.`);
    }
    if (amount <= 0) {
      throw new TypeError(`The "${nameOfProp}" prop ${location} must be positive, but got ${amount}.`);
    }
  }
  function validateDurationInFrames2(durationInFrames, options) {
    const { allowFloats, component } = options;
    if (typeof durationInFrames === "undefined") {
      throw new Error(`The "durationInFrames" prop ${component} is missing.`);
    }
    if (typeof durationInFrames !== "number") {
      throw new Error(`The "durationInFrames" prop ${component} must be a number, but you passed a value of type ${typeof durationInFrames}`);
    }
    if (durationInFrames <= 0) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be positive, but got ${durationInFrames}.`);
    }
    if (!allowFloats && durationInFrames % 1 !== 0) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be an integer, but got ${durationInFrames}.`);
    }
    if (!Number.isFinite(durationInFrames)) {
      throw new TypeError(`The "durationInFrames" prop ${component} must be finite, but got ${durationInFrames}.`);
    }
  }
  function validateFps2(fps, location, isGif) {
    if (typeof fps !== "number") {
      throw new Error(`"fps" must be a number, but you passed a value of type ${typeof fps} ${location}`);
    }
    if (!Number.isFinite(fps)) {
      throw new Error(`"fps" must be a finite, but you passed ${fps} ${location}`);
    }
    if (isNaN(fps)) {
      throw new Error(`"fps" must not be NaN, but got ${fps} ${location}`);
    }
    if (fps <= 0) {
      throw new TypeError(`"fps" must be positive, but got ${fps} ${location}`);
    }
    if (isGif && fps > 50) {
      throw new TypeError(`The FPS for a GIF cannot be higher than 50. Use the --every-nth-frame option to lower the FPS: https://remotion.dev/docs/render-as-gif`);
    }
  }
  var getExpectedMediaFrameUncorrected2 = ({ frame, playbackRate, startFrom }) => {
    return interpolate2(frame, [-1, startFrom, startFrom + 1], [-1, startFrom, startFrom + playbackRate]);
  };
  var getAbsoluteSrc2 = (relativeSrc) => {
    if (typeof window === "undefined") {
      return relativeSrc;
    }
    return new URL(relativeSrc, window.origin).href;
  };
  var getOffthreadVideoSource = ({ src, transparent, currentTime, toneMapped }) => {
    return `http://localhost:${window.remotion_proxyPort}/proxy?src=${encodeURIComponent(getAbsoluteSrc2(src))}&time=${encodeURIComponent(currentTime)}&transparent=${String(transparent)}&toneMapped=${String(toneMapped)}`;
  };
  var NoReactInternals = {
    processColor,
    truthy: truthy2,
    validateFps: validateFps2,
    validateDimension: validateDimension2,
    validateDurationInFrames: validateDurationInFrames2,
    validateDefaultAndInputProps: validateDefaultAndInputProps2,
    validateFrame,
    serializeJSONWithDate,
    bundleName: "bundle.js",
    bundleMapName: "bundle.js.map",
    deserializeJSONWithCustomFields: deserializeJSONWithCustomFields2,
    DELAY_RENDER_CALLSTACK_TOKEN: DELAY_RENDER_CALLSTACK_TOKEN2,
    DELAY_RENDER_RETRY_TOKEN: DELAY_RENDER_RETRY_TOKEN2,
    DELAY_RENDER_ATTEMPT_TOKEN: DELAY_RENDER_RETRIES_LEFT2,
    getOffthreadVideoSource,
    getExpectedMediaFrameUncorrected: getExpectedMediaFrameUncorrected2
  };

  // node_modules/@remotion/player/dist/esm/index.mjs
  var ICON_SIZE2 = 25;
  var fullscreenIconSize = 16;
  var PlayIcon = () => {
    return (0, import_jsx_runtime2.jsx)("svg", { width: ICON_SIZE2, height: ICON_SIZE2, viewBox: "0 0 25 25", fill: "none", children: (0, import_jsx_runtime2.jsx)("path", { d: "M8 6.375C7.40904 8.17576 7.06921 10.2486 7.01438 12.3871C6.95955 14.5255 7.19163 16.6547 7.6875 18.5625C9.95364 18.2995 12.116 17.6164 14.009 16.5655C15.902 15.5147 17.4755 14.124 18.6088 12.5C17.5158 10.8949 15.9949 9.51103 14.1585 8.45082C12.3222 7.3906 10.2174 6.68116 8 6.375Z", fill: "white", stroke: "white", strokeWidth: "6.25", strokeLinejoin: "round" }) });
  };
  var PauseIcon = () => {
    return (0, import_jsx_runtime2.jsxs)("svg", { viewBox: "0 0 100 100", width: ICON_SIZE2, height: ICON_SIZE2, children: [(0, import_jsx_runtime2.jsx)("rect", { x: "25", y: "20", width: "20", height: "60", fill: "#fff", ry: "5", rx: "5" }), (0, import_jsx_runtime2.jsx)("rect", { x: "55", y: "20", width: "20", height: "60", fill: "#fff", ry: "5", rx: "5" })] });
  };
  var FullscreenIcon = ({ isFullscreen }) => {
    const strokeWidth = 6;
    const viewSize = 32;
    const out = isFullscreen ? 0 : strokeWidth / 2;
    const middleInset = isFullscreen ? strokeWidth * 1.6 : strokeWidth / 2;
    const inset = isFullscreen ? strokeWidth * 1.6 : strokeWidth * 2;
    return (0, import_jsx_runtime2.jsxs)("svg", { viewBox: `0 0 ${viewSize} ${viewSize}`, height: fullscreenIconSize, width: fullscreenIconSize, children: [(0, import_jsx_runtime2.jsx)("path", { d: `
				M ${out} ${inset}
				L ${middleInset} ${middleInset}
				L ${inset} ${out}
				`, stroke: "#fff", strokeWidth, fill: "none" }), (0, import_jsx_runtime2.jsx)("path", { d: `
				M ${viewSize - out} ${inset}
				L ${viewSize - middleInset} ${middleInset}
				L ${viewSize - inset} ${out}
				`, stroke: "#fff", strokeWidth, fill: "none" }), (0, import_jsx_runtime2.jsx)("path", { d: `
				M ${out} ${viewSize - inset}
				L ${middleInset} ${viewSize - middleInset}
				L ${inset} ${viewSize - out}
				`, stroke: "#fff", strokeWidth, fill: "none" }), (0, import_jsx_runtime2.jsx)("path", { d: `
				M ${viewSize - out} ${viewSize - inset}
				L ${viewSize - middleInset} ${viewSize - middleInset}
				L ${viewSize - inset} ${viewSize - out}
				`, stroke: "#fff", strokeWidth, fill: "none" })] });
  };
  var VolumeOffIcon = () => {
    return (0, import_jsx_runtime2.jsx)("svg", { width: ICON_SIZE2, height: ICON_SIZE2, viewBox: "0 0 24 24", children: (0, import_jsx_runtime2.jsx)("path", { d: "M3.63 3.63a.996.996 0 000 1.41L7.29 8.7 7 9H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71v-4.17l4.18 4.18c-.49.37-1.02.68-1.6.91-.36.15-.58.53-.58.92 0 .72.73 1.18 1.39.91.8-.33 1.55-.77 2.22-1.31l1.34 1.34a.996.996 0 101.41-1.41L5.05 3.63c-.39-.39-1.02-.39-1.42 0zM19 12c0 .82-.15 1.61-.41 2.34l1.53 1.53c.56-1.17.88-2.48.88-3.87 0-3.83-2.4-7.11-5.78-8.4-.59-.23-1.22.23-1.22.86v.19c0 .38.25.71.61.85C17.18 6.54 19 9.06 19 12zm-8.71-6.29l-.17.17L12 7.76V6.41c0-.89-1.08-1.33-1.71-.7zM16.5 12A4.5 4.5 0 0014 7.97v1.79l2.48 2.48c.01-.08.02-.16.02-.24z", fill: "#fff" }) });
  };
  var VolumeOnIcon = () => {
    return (0, import_jsx_runtime2.jsx)("svg", { width: ICON_SIZE2, height: ICON_SIZE2, viewBox: "0 0 24 24", children: (0, import_jsx_runtime2.jsx)("path", { d: "M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2A4.5 4.5 0 0014 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z", fill: "#fff" }) });
  };
  var className = "__remotion_buffering_indicator";
  var remotionBufferingAnimation = "__remotion_buffering_animation";
  var playerStyle = {
    width: ICON_SIZE2,
    height: ICON_SIZE2,
    overflow: "hidden",
    lineHeight: "normal",
    fontSize: "inherit"
  };
  var studioStyle = {
    width: 14,
    height: 14,
    overflow: "hidden",
    lineHeight: "normal",
    fontSize: "inherit"
  };
  var BufferingIndicator = ({ type }) => {
    const style = type === "player" ? playerStyle : studioStyle;
    return (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [(0, import_jsx_runtime2.jsx)("style", { type: "text/css", children: `
				@keyframes ${remotionBufferingAnimation} {
          0% {
            rotate: 0deg;
          }
          100% {
            rotate: 360deg;
          }
        }
        
        .${className} {
            animation: ${remotionBufferingAnimation} 1s linear infinite;
        }        
			` }), (0, import_jsx_runtime2.jsx)("div", { style, children: (0, import_jsx_runtime2.jsx)("svg", { viewBox: type === "player" ? "0 0 22 22" : "0 0 18 18", style, className, children: (0, import_jsx_runtime2.jsx)("path", { d: type === "player" ? "M 11 4 A 7 7 0 0 1 15.1145 16.66312" : "M 9 2 A 7 7 0 0 1 13.1145 14.66312", stroke: "white", strokeLinecap: "round", fill: "none", strokeWidth: 3 }) }) })] });
  };
  var calculatePlayerSize = ({ currentSize, width, height, compositionWidth, compositionHeight }) => {
    if (width !== void 0 && height === void 0) {
      return {
        aspectRatio: [compositionWidth, compositionHeight].join("/")
      };
    }
    if (height !== void 0 && width === void 0) {
      return {
        // Aspect ratio CSS prop will work
        aspectRatio: [compositionWidth, compositionHeight].join("/")
      };
    }
    if (!currentSize) {
      return {
        width: compositionWidth,
        height: compositionHeight
      };
    }
    return {
      width: compositionWidth,
      height: compositionHeight
    };
  };
  var calculateCanvasTransformation = ({ previewSize, compositionWidth, compositionHeight, canvasSize }) => {
    const scale = Internals.calculateScale({
      canvasSize,
      compositionHeight,
      compositionWidth,
      previewSize
    });
    const correction = 0 - (1 - scale) / 2;
    const xCorrection = correction * compositionWidth;
    const yCorrection = correction * compositionHeight;
    const width = compositionWidth * scale;
    const height = compositionHeight * scale;
    const centerX = canvasSize.width / 2 - width / 2;
    const centerY = canvasSize.height / 2 - height / 2;
    return {
      centerX,
      centerY,
      xCorrection,
      yCorrection,
      scale
    };
  };
  var calculateOuterStyle = ({ config, style, canvasSize }) => {
    if (!config) {
      return {};
    }
    return {
      position: "relative",
      overflow: "hidden",
      ...calculatePlayerSize({
        compositionHeight: config.height,
        compositionWidth: config.width,
        currentSize: canvasSize,
        height: style === null || style === void 0 ? void 0 : style.height,
        width: style === null || style === void 0 ? void 0 : style.width
      }),
      ...style
    };
  };
  var calculateContainerStyle = ({ config, canvasSize, layout, scale }) => {
    if (!config || !canvasSize || !layout) {
      return {};
    }
    return {
      position: "absolute",
      width: config.width,
      height: config.height,
      display: "flex",
      transform: `scale(${scale})`,
      marginLeft: layout.xCorrection,
      marginTop: layout.yCorrection,
      overflow: "hidden"
    };
  };
  var calculateOuter = ({ layout, scale, config }) => {
    if (!layout || !config) {
      return {};
    }
    const { centerX, centerY } = layout;
    return {
      width: config.width * scale,
      height: config.height * scale,
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      left: centerX,
      top: centerY,
      overflow: "hidden"
    };
  };
  var PlayerEventEmitterContext = import_react2.default.createContext(void 0);
  var ThumbnailEmitterContext = import_react2.default.createContext(void 0);
  var PlayerEmitter = class {
    constructor() {
      this.listeners = {
        ended: [],
        error: [],
        pause: [],
        play: [],
        ratechange: [],
        scalechange: [],
        seeked: [],
        timeupdate: [],
        frameupdate: [],
        fullscreenchange: [],
        volumechange: [],
        mutechange: [],
        waiting: [],
        resume: []
      };
    }
    addEventListener(name, callback) {
      this.listeners[name].push(callback);
    }
    removeEventListener(name, callback) {
      this.listeners[name] = this.listeners[name].filter((l) => l !== callback);
    }
    dispatchEvent(dispatchName, context) {
      this.listeners[dispatchName].forEach((callback) => {
        callback({ detail: context });
      });
    }
    dispatchSeek(frame) {
      this.dispatchEvent("seeked", {
        frame
      });
    }
    dispatchVolumeChange(volume) {
      this.dispatchEvent("volumechange", {
        volume
      });
    }
    dispatchPause() {
      this.dispatchEvent("pause", void 0);
    }
    dispatchPlay() {
      this.dispatchEvent("play", void 0);
    }
    dispatchEnded() {
      this.dispatchEvent("ended", void 0);
    }
    dispatchRateChange(playbackRate) {
      this.dispatchEvent("ratechange", {
        playbackRate
      });
    }
    dispatchScaleChange(scale) {
      this.dispatchEvent("scalechange", {
        scale
      });
    }
    dispatchError(error) {
      this.dispatchEvent("error", {
        error
      });
    }
    dispatchTimeUpdate(event) {
      this.dispatchEvent("timeupdate", event);
    }
    dispatchFrameUpdate(event) {
      this.dispatchEvent("frameupdate", event);
    }
    dispatchFullscreenChange(event) {
      this.dispatchEvent("fullscreenchange", event);
    }
    dispatchMuteChange(event) {
      this.dispatchEvent("mutechange", event);
    }
    dispatchWaiting(event) {
      this.dispatchEvent("waiting", event);
    }
    dispatchResume(event) {
      this.dispatchEvent("resume", event);
    }
  };
  var ThumbnailEmitter = class {
    constructor() {
      this.listeners = {
        error: [],
        waiting: [],
        resume: []
      };
    }
    addEventListener(name, callback) {
      this.listeners[name].push(callback);
    }
    removeEventListener(name, callback) {
      this.listeners[name] = this.listeners[name].filter((l) => l !== callback);
    }
    dispatchEvent(dispatchName, context) {
      this.listeners[dispatchName].forEach((callback) => {
        callback({ detail: context });
      });
    }
    dispatchError(error) {
      this.dispatchEvent("error", {
        error
      });
    }
    dispatchWaiting(event) {
      this.dispatchEvent("waiting", event);
    }
    dispatchResume(event) {
      this.dispatchEvent("resume", event);
    }
  };
  var useBufferStateEmitter = (emitter) => {
    const bufferManager = (0, import_react2.useContext)(Internals.BufferingContextReact);
    if (!bufferManager) {
      throw new Error("BufferingContextReact not found");
    }
    (0, import_react2.useEffect)(() => {
      const clear1 = bufferManager.listenForBuffering(() => {
        bufferManager.buffering.current = true;
        emitter.dispatchWaiting({});
      });
      const clear2 = bufferManager.listenForResume(() => {
        bufferManager.buffering.current = false;
        emitter.dispatchResume({});
      });
      return () => {
        clear1.remove();
        clear2.remove();
      };
    }, [bufferManager, emitter]);
  };
  var PlayerEmitterProvider = ({ children, currentPlaybackRate }) => {
    const [emitter] = (0, import_react2.useState)(() => new PlayerEmitter());
    const bufferManager = (0, import_react2.useContext)(Internals.BufferingContextReact);
    if (!bufferManager) {
      throw new Error("BufferingContextReact not found");
    }
    (0, import_react2.useEffect)(() => {
      if (currentPlaybackRate) {
        emitter.dispatchRateChange(currentPlaybackRate);
      }
    }, [emitter, currentPlaybackRate]);
    useBufferStateEmitter(emitter);
    return (0, import_jsx_runtime2.jsx)(PlayerEventEmitterContext.Provider, { value: emitter, children });
  };
  var useHoverState = (ref, hideControlsWhenPointerDoesntMove) => {
    const [hovered, setHovered] = (0, import_react2.useState)(false);
    (0, import_react2.useEffect)(() => {
      const { current } = ref;
      if (!current) {
        return;
      }
      let hoverTimeout;
      const addHoverTimeout = () => {
        if (hideControlsWhenPointerDoesntMove) {
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            setHovered(false);
          }, hideControlsWhenPointerDoesntMove === true ? 3e3 : hideControlsWhenPointerDoesntMove);
        }
      };
      const onHover = () => {
        setHovered(true);
        addHoverTimeout();
      };
      const onLeave = () => {
        setHovered(false);
        clearTimeout(hoverTimeout);
      };
      const onMove = () => {
        setHovered(true);
        addHoverTimeout();
      };
      current.addEventListener("mouseenter", onHover);
      current.addEventListener("mouseleave", onLeave);
      current.addEventListener("mousemove", onMove);
      return () => {
        current.removeEventListener("mouseenter", onHover);
        current.removeEventListener("mouseleave", onLeave);
        current.removeEventListener("mousemove", onMove);
        clearTimeout(hoverTimeout);
      };
    }, [hideControlsWhenPointerDoesntMove, ref]);
    return hovered;
  };
  var calculateNextFrame = ({ time, currentFrame: startFrame, playbackSpeed, fps, actualLastFrame, actualFirstFrame, framesAdvanced, shouldLoop }) => {
    const op = playbackSpeed < 0 ? Math.ceil : Math.floor;
    const framesToAdvance = op(time * playbackSpeed / (1e3 / fps)) - framesAdvanced;
    const nextFrame = framesToAdvance + startFrame;
    const isCurrentFrameOutside = startFrame > actualLastFrame || startFrame < actualFirstFrame;
    const isNextFrameOutside = nextFrame > actualLastFrame || nextFrame < actualFirstFrame;
    const hasEnded = !shouldLoop && isNextFrameOutside && !isCurrentFrameOutside;
    if (playbackSpeed > 0) {
      if (isNextFrameOutside) {
        return {
          nextFrame: actualFirstFrame,
          framesToAdvance,
          hasEnded
        };
      }
      return { nextFrame, framesToAdvance, hasEnded };
    }
    if (isNextFrameOutside) {
      return { nextFrame: actualLastFrame, framesToAdvance, hasEnded };
    }
    return { nextFrame, framesToAdvance, hasEnded };
  };
  var getIsBackgrounded = () => {
    if (typeof document === "undefined") {
      return false;
    }
    return document.visibilityState === "hidden";
  };
  var useIsBackgrounded = () => {
    const isBackgrounded = (0, import_react2.useRef)(getIsBackgrounded());
    (0, import_react2.useEffect)(() => {
      const onVisibilityChange = () => {
        isBackgrounded.current = getIsBackgrounded();
      };
      document.addEventListener("visibilitychange", onVisibilityChange);
      return () => {
        document.removeEventListener("visibilitychange", onVisibilityChange);
      };
    }, []);
    return isBackgrounded;
  };
  var usePlayer = () => {
    var _a;
    const [playing, setPlaying, imperativePlaying] = Internals.Timeline.usePlayingState();
    const [hasPlayed, setHasPlayed] = (0, import_react2.useState)(false);
    const frame = Internals.Timeline.useTimelinePosition();
    const playStart = (0, import_react2.useRef)(frame);
    const setFrame = Internals.Timeline.useTimelineSetFrame();
    const setTimelinePosition = Internals.Timeline.useTimelineSetFrame();
    const audioContext = (0, import_react2.useContext)(Internals.SharedAudioContext);
    const { audioAndVideoTags } = (0, import_react2.useContext)(Internals.Timeline.TimelineContext);
    const frameRef = (0, import_react2.useRef)(frame);
    frameRef.current = frame;
    const video = Internals.useVideo();
    const config = Internals.useUnsafeVideoConfig();
    const emitter = (0, import_react2.useContext)(PlayerEventEmitterContext);
    const lastFrame = ((_a = config === null || config === void 0 ? void 0 : config.durationInFrames) !== null && _a !== void 0 ? _a : 1) - 1;
    const isLastFrame = frame === lastFrame;
    const isFirstFrame = frame === 0;
    if (!emitter) {
      throw new TypeError("Expected Player event emitter context");
    }
    const bufferingContext = (0, import_react2.useContext)(Internals.BufferingContextReact);
    if (!bufferingContext) {
      throw new Error("Missing the buffering context. Most likely you have a Remotion version mismatch.");
    }
    const { buffering } = bufferingContext;
    const seek2 = (0, import_react2.useCallback)((newFrame) => {
      if (video === null || video === void 0 ? void 0 : video.id) {
        setTimelinePosition((c) => ({ ...c, [video.id]: newFrame }));
      }
      frameRef.current = newFrame;
      emitter.dispatchSeek(newFrame);
    }, [emitter, setTimelinePosition, video === null || video === void 0 ? void 0 : video.id]);
    const play = (0, import_react2.useCallback)((e) => {
      if (imperativePlaying.current) {
        return;
      }
      setHasPlayed(true);
      if (isLastFrame) {
        seek2(0);
      }
      if (audioContext && audioContext.numberOfAudioTags > 0 && e) {
        audioContext.playAllAudios();
      }
      audioAndVideoTags.current.forEach((a) => a.play());
      imperativePlaying.current = true;
      setPlaying(true);
      playStart.current = frameRef.current;
      emitter.dispatchPlay();
    }, [
      imperativePlaying,
      isLastFrame,
      audioContext,
      setPlaying,
      emitter,
      seek2,
      audioAndVideoTags
    ]);
    const pause = (0, import_react2.useCallback)(() => {
      if (imperativePlaying.current) {
        imperativePlaying.current = false;
        setPlaying(false);
        emitter.dispatchPause();
      }
    }, [emitter, imperativePlaying, setPlaying]);
    const pauseAndReturnToPlayStart = (0, import_react2.useCallback)(() => {
      if (imperativePlaying.current) {
        imperativePlaying.current = false;
        frameRef.current = playStart.current;
        if (config) {
          setTimelinePosition((c) => ({
            ...c,
            [config.id]: playStart.current
          }));
          setPlaying(false);
          emitter.dispatchPause();
        }
      }
    }, [config, emitter, imperativePlaying, setPlaying, setTimelinePosition]);
    const videoId = video === null || video === void 0 ? void 0 : video.id;
    const frameBack = (0, import_react2.useCallback)((frames) => {
      if (!videoId) {
        return null;
      }
      if (imperativePlaying.current) {
        return;
      }
      setFrame((c) => {
        var _a2, _b;
        const prev = (_b = (_a2 = c[videoId]) !== null && _a2 !== void 0 ? _a2 : window.remotion_initialFrame) !== null && _b !== void 0 ? _b : 0;
        return {
          ...c,
          [videoId]: Math.max(0, prev - frames)
        };
      });
    }, [imperativePlaying, setFrame, videoId]);
    const frameForward = (0, import_react2.useCallback)((frames) => {
      if (!videoId) {
        return null;
      }
      if (imperativePlaying.current) {
        return;
      }
      setFrame((c) => {
        var _a2, _b;
        const prev = (_b = (_a2 = c[videoId]) !== null && _a2 !== void 0 ? _a2 : window.remotion_initialFrame) !== null && _b !== void 0 ? _b : 0;
        return {
          ...c,
          [videoId]: Math.min(lastFrame, prev + frames)
        };
      });
    }, [videoId, imperativePlaying, lastFrame, setFrame]);
    const returnValue = (0, import_react2.useMemo)(() => {
      return {
        frameBack,
        frameForward,
        isLastFrame,
        emitter,
        playing,
        play,
        pause,
        seek: seek2,
        isFirstFrame,
        getCurrentFrame: () => frameRef.current,
        isPlaying: () => imperativePlaying.current,
        isBuffering: () => buffering.current,
        pauseAndReturnToPlayStart,
        hasPlayed,
        remotionInternal_currentFrameRef: frameRef
      };
    }, [
      frameBack,
      frameForward,
      isLastFrame,
      emitter,
      playing,
      play,
      pause,
      seek2,
      isFirstFrame,
      pauseAndReturnToPlayStart,
      hasPlayed,
      imperativePlaying,
      buffering
    ]);
    return returnValue;
  };
  var usePlayback = ({ loop, playbackRate, moveToBeginningWhenEnded, inFrame, outFrame, frameRef }) => {
    const config = Internals.useUnsafeVideoConfig();
    const frame = Internals.Timeline.useTimelinePosition();
    const { playing, pause, emitter } = usePlayer();
    const setFrame = Internals.Timeline.useTimelineSetFrame();
    const buffering = (0, import_react2.useRef)(null);
    const isBackgroundedRef = useIsBackgrounded();
    const lastTimeUpdateEvent = (0, import_react2.useRef)(null);
    const context = (0, import_react2.useContext)(Internals.BufferingContextReact);
    if (!context) {
      throw new Error("Missing the buffering context. Most likely you have a Remotion version mismatch.");
    }
    (0, import_react2.useEffect)(() => {
      const onBufferClear = context.listenForBuffering(() => {
        buffering.current = performance.now();
      });
      const onResumeClear = context.listenForResume(() => {
        buffering.current = null;
      });
      return () => {
        onBufferClear.remove();
        onResumeClear.remove();
      };
    }, [context]);
    (0, import_react2.useEffect)(() => {
      if (!config) {
        return;
      }
      if (!playing) {
        return;
      }
      let hasBeenStopped = false;
      let reqAnimFrameCall = null;
      let startedTime = performance.now();
      let framesAdvanced = 0;
      const cancelQueuedFrame = () => {
        if (reqAnimFrameCall !== null) {
          if (reqAnimFrameCall.type === "raf") {
            cancelAnimationFrame(reqAnimFrameCall.id);
          } else {
            clearTimeout(reqAnimFrameCall.id);
          }
        }
      };
      const stop = () => {
        hasBeenStopped = true;
        cancelQueuedFrame();
      };
      const callback = () => {
        const time = performance.now() - startedTime;
        const actualLastFrame = outFrame !== null && outFrame !== void 0 ? outFrame : config.durationInFrames - 1;
        const actualFirstFrame = inFrame !== null && inFrame !== void 0 ? inFrame : 0;
        const currentFrame = frameRef.current;
        const { nextFrame, framesToAdvance, hasEnded } = calculateNextFrame({
          time,
          currentFrame,
          playbackSpeed: playbackRate,
          fps: config.fps,
          actualFirstFrame,
          actualLastFrame,
          framesAdvanced,
          shouldLoop: loop
        });
        framesAdvanced += framesToAdvance;
        if (nextFrame !== frameRef.current && (!hasEnded || moveToBeginningWhenEnded)) {
          setFrame((c) => ({ ...c, [config.id]: nextFrame }));
        }
        if (hasEnded) {
          stop();
          pause();
          emitter.dispatchEnded();
          return;
        }
        if (!hasBeenStopped) {
          queueNextFrame();
        }
      };
      const queueNextFrame = () => {
        if (buffering.current) {
          const stopListening = context.listenForResume(() => {
            stopListening.remove();
            if (hasBeenStopped) {
              return;
            }
            startedTime = performance.now();
            framesAdvanced = 0;
            callback();
          });
          return;
        }
        if (isBackgroundedRef.current) {
          reqAnimFrameCall = {
            type: "timeout",
            // Note: Most likely, this will not be 1000 / fps, but the browser will throttle it to ~1/sec.
            id: setTimeout(callback, 1e3 / config.fps)
          };
        } else {
          reqAnimFrameCall = { type: "raf", id: requestAnimationFrame(callback) };
        }
      };
      queueNextFrame();
      const onVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          return;
        }
        cancelQueuedFrame();
        callback();
      };
      window.addEventListener("visibilitychange", onVisibilityChange);
      return () => {
        window.removeEventListener("visibilitychange", onVisibilityChange);
        stop();
      };
    }, [
      config,
      loop,
      pause,
      playing,
      setFrame,
      emitter,
      playbackRate,
      inFrame,
      outFrame,
      moveToBeginningWhenEnded,
      isBackgroundedRef,
      frameRef,
      buffering,
      context
    ]);
    (0, import_react2.useEffect)(() => {
      const interval = setInterval(() => {
        if (lastTimeUpdateEvent.current === frameRef.current) {
          return;
        }
        emitter.dispatchTimeUpdate({ frame: frameRef.current });
        lastTimeUpdateEvent.current = frameRef.current;
      }, 250);
      return () => clearInterval(interval);
    }, [emitter, frameRef]);
    (0, import_react2.useEffect)(() => {
      emitter.dispatchFrameUpdate({ frame });
    }, [emitter, frame]);
  };
  var elementSizeHooks = [];
  var useElementSize = (ref, options) => {
    const [size, setSize] = (0, import_react2.useState)(() => {
      if (!ref.current) {
        return null;
      }
      const rect = ref.current.getClientRects();
      if (!rect[0]) {
        return null;
      }
      return {
        width: rect[0].width,
        height: rect[0].height,
        left: rect[0].x,
        top: rect[0].y,
        windowSize: {
          height: window.innerHeight,
          width: window.innerWidth
        }
      };
    });
    const observer = (0, import_react2.useMemo)(() => {
      if (typeof ResizeObserver === "undefined") {
        return null;
      }
      return new ResizeObserver((entries) => {
        const { contentRect, target } = entries[0];
        const newSize = target.getClientRects();
        if (!(newSize === null || newSize === void 0 ? void 0 : newSize[0])) {
          setSize(null);
          return;
        }
        const probableCssParentScale = contentRect.width === 0 ? 1 : newSize[0].width / contentRect.width;
        const width = options.shouldApplyCssTransforms ? newSize[0].width : newSize[0].width * (1 / probableCssParentScale);
        const height = options.shouldApplyCssTransforms ? newSize[0].height : newSize[0].height * (1 / probableCssParentScale);
        setSize({
          width,
          height,
          left: newSize[0].x,
          top: newSize[0].y,
          windowSize: {
            height: window.innerHeight,
            width: window.innerWidth
          }
        });
      });
    }, [options.shouldApplyCssTransforms]);
    const updateSize = (0, import_react2.useCallback)(() => {
      if (!ref.current) {
        return;
      }
      const rect = ref.current.getClientRects();
      if (!rect[0]) {
        setSize(null);
        return;
      }
      setSize((prevState) => {
        const isSame = prevState && prevState.width === rect[0].width && prevState.height === rect[0].height && prevState.left === rect[0].x && prevState.top === rect[0].y && prevState.windowSize.height === window.innerHeight && prevState.windowSize.width === window.innerWidth;
        if (isSame) {
          return prevState;
        }
        return {
          width: rect[0].width,
          height: rect[0].height,
          left: rect[0].x,
          top: rect[0].y,
          windowSize: {
            height: window.innerHeight,
            width: window.innerWidth
          }
        };
      });
    }, [ref]);
    (0, import_react2.useEffect)(() => {
      if (!observer) {
        return;
      }
      const { current } = ref;
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (current) {
          observer.unobserve(current);
        }
      };
    }, [observer, ref, updateSize]);
    (0, import_react2.useEffect)(() => {
      if (!options.triggerOnWindowResize) {
        return;
      }
      window.addEventListener("resize", updateSize);
      return () => {
        window.removeEventListener("resize", updateSize);
      };
    }, [options.triggerOnWindowResize, updateSize]);
    (0, import_react2.useEffect)(() => {
      elementSizeHooks.push(updateSize);
      return () => {
        elementSizeHooks = elementSizeHooks.filter((e) => e !== updateSize);
      };
    }, [updateSize]);
    return (0, import_react2.useMemo)(() => {
      if (!size) {
        return null;
      }
      return { ...size, refresh: updateSize };
    }, [size, updateSize]);
  };
  var DefaultPlayPauseButton = ({ playing, buffering }) => {
    if (playing && buffering) {
      return (0, import_jsx_runtime2.jsx)(BufferingIndicator, { type: "player" });
    }
    if (playing) {
      return (0, import_jsx_runtime2.jsx)(PauseIcon, {});
    }
    return (0, import_jsx_runtime2.jsx)(PlayIcon, {});
  };
  var BAR_HEIGHT$1 = 5;
  var KNOB_SIZE$1 = 12;
  var VOLUME_SLIDER_WIDTH = 100;
  var MediaVolumeSlider = ({ displayVerticalVolumeSlider }) => {
    const [mediaMuted, setMediaMuted] = Internals.useMediaMutedState();
    const [mediaVolume, setMediaVolume] = Internals.useMediaVolumeState();
    const [focused, setFocused] = (0, import_react2.useState)(false);
    const parentDivRef = (0, import_react2.useRef)(null);
    const inputRef = (0, import_react2.useRef)(null);
    const hover = useHoverState(parentDivRef, false);
    const randomId = (
      // eslint-disable-next-line react-hooks/rules-of-hooks
      typeof import_react2.default.useId === "undefined" ? "volume-slider" : import_react2.default.useId()
    );
    const [randomClass] = (0, import_react2.useState)(() => `__remotion-volume-slider-${random(randomId)}`.replace(".", ""));
    const isMutedOrZero = mediaMuted || mediaVolume === 0;
    const onVolumeChange = (0, import_react2.useCallback)((e) => {
      setMediaVolume(parseFloat(e.target.value));
    }, [setMediaVolume]);
    const onBlur = () => {
      setTimeout(() => {
        if (document.activeElement !== inputRef.current) {
          setFocused(false);
        }
      }, 10);
    };
    const isVolume0 = mediaVolume === 0;
    const onClick = (0, import_react2.useCallback)(() => {
      if (isVolume0) {
        setMediaVolume(1);
        setMediaMuted(false);
        return;
      }
      setMediaMuted((mute) => !mute);
    }, [isVolume0, setMediaMuted, setMediaVolume]);
    const parentDivStyle = (0, import_react2.useMemo)(() => {
      return {
        display: "inline-flex",
        background: "none",
        border: "none",
        justifyContent: "center",
        alignItems: "center",
        touchAction: "none",
        ...displayVerticalVolumeSlider && { position: "relative" }
      };
    }, [displayVerticalVolumeSlider]);
    const volumeContainer = (0, import_react2.useMemo)(() => {
      return {
        display: "inline",
        width: ICON_SIZE2,
        height: ICON_SIZE2,
        cursor: "pointer",
        appearance: "none",
        background: "none",
        border: "none",
        padding: 0
      };
    }, []);
    const sliderContainer = (0, import_react2.useMemo)(() => {
      const paddingLeft = 5;
      const common = {
        paddingLeft,
        height: ICON_SIZE2,
        width: VOLUME_SLIDER_WIDTH
      };
      if (displayVerticalVolumeSlider) {
        return {
          ...common,
          position: "absolute",
          transform: `rotate(-90deg) translateX(${VOLUME_SLIDER_WIDTH / 2 + ICON_SIZE2 / 2}px)`
        };
      }
      return {
        ...common
      };
    }, [displayVerticalVolumeSlider]);
    const inputStyle = (0, import_react2.useMemo)(() => {
      const commonStyle = {
        WebkitAppearance: "none",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: BAR_HEIGHT$1 / 2,
        cursor: "pointer",
        height: BAR_HEIGHT$1,
        width: VOLUME_SLIDER_WIDTH,
        backgroundImage: `linear-gradient(
				to right,
				white ${mediaVolume * 100}%, rgba(255, 255, 255, 0) ${mediaVolume * 100}%
			)`
      };
      if (displayVerticalVolumeSlider) {
        return {
          ...commonStyle,
          bottom: ICON_SIZE2 + VOLUME_SLIDER_WIDTH / 2
        };
      }
      return commonStyle;
    }, [displayVerticalVolumeSlider, mediaVolume]);
    const sliderStyle = `
	.${randomClass}::-webkit-slider-thumb {
		-webkit-appearance: none;
		background-color: white;
		border-radius: ${KNOB_SIZE$1 / 2}px;
		box-shadow: 0 0 2px black;
		height: ${KNOB_SIZE$1}px;
		width: ${KNOB_SIZE$1}px;
	}

	.${randomClass}::-moz-range-thumb {
		-webkit-appearance: none;
		background-color: white;
		border-radius: ${KNOB_SIZE$1 / 2}px;
		box-shadow: 0 0 2px black;
		height: ${KNOB_SIZE$1}px;
		width: ${KNOB_SIZE$1}px;
	}
`;
    return (0, import_jsx_runtime2.jsxs)("div", { ref: parentDivRef, style: parentDivStyle, children: [(0, import_jsx_runtime2.jsx)("style", {
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML: {
        __html: sliderStyle
      }
    }), (0, import_jsx_runtime2.jsx)("button", { "aria-label": isMutedOrZero ? "Unmute sound" : "Mute sound", title: isMutedOrZero ? "Unmute sound" : "Mute sound", onClick, onBlur, onFocus: () => setFocused(true), style: volumeContainer, type: "button", children: isMutedOrZero ? (0, import_jsx_runtime2.jsx)(VolumeOffIcon, {}) : (0, import_jsx_runtime2.jsx)(VolumeOnIcon, {}) }), (focused || hover) && !mediaMuted && !Internals.isIosSafari() ? (0, import_jsx_runtime2.jsx)("div", { style: sliderContainer, children: (0, import_jsx_runtime2.jsx)("input", { ref: inputRef, "aria-label": "Change volume", className: randomClass, max: 1, min: 0, onBlur: () => setFocused(false), onChange: onVolumeChange, step: 0.01, type: "range", value: mediaVolume, style: inputStyle }) }) : null] });
  };
  function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = (0, import_react2.useState)(initialIsVisible);
    const ref = (0, import_react2.useRef)(null);
    (0, import_react2.useEffect)(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsComponentVisible(false);
        }
      };
      document.addEventListener("pointerup", handleClickOutside, true);
      return () => {
        document.removeEventListener("pointerup", handleClickOutside, true);
      };
    }, []);
    return { ref, isComponentVisible, setIsComponentVisible };
  }
  var BOTTOM = 35;
  var THRESHOLD = 70;
  var rateDiv = {
    height: 30,
    paddingRight: 15,
    paddingLeft: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  };
  var checkmarkContainer = {
    width: 22,
    display: "flex",
    alignItems: "center"
  };
  var checkmarkStyle = {
    width: 14,
    height: 14,
    color: "black"
  };
  var Checkmark = () => (0, import_jsx_runtime2.jsx)("svg", { viewBox: "0 0 512 512", style: checkmarkStyle, children: (0, import_jsx_runtime2.jsx)("path", { fill: "currentColor", d: "M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z" }) });
  var PlaybackrateOption = ({ rate, onSelect, selectedRate, keyboardSelectedRate }) => {
    const onClick = (0, import_react2.useCallback)((e) => {
      e.stopPropagation();
      e.preventDefault();
      onSelect(rate);
    }, [onSelect, rate]);
    const [hovered, setHovered] = (0, import_react2.useState)(false);
    const onMouseEnter = (0, import_react2.useCallback)(() => {
      setHovered(true);
    }, []);
    const onMouseLeave = (0, import_react2.useCallback)(() => {
      setHovered(false);
    }, []);
    const isFocused = keyboardSelectedRate === rate;
    const actualStyle = (0, import_react2.useMemo)(() => {
      return {
        ...rateDiv,
        backgroundColor: hovered || isFocused ? "#eee" : "transparent"
      };
    }, [hovered, isFocused]);
    return (0, import_jsx_runtime2.jsxs)("div", { onMouseEnter, onMouseLeave, tabIndex: 0, style: actualStyle, onClick, children: [(0, import_jsx_runtime2.jsx)("div", { style: checkmarkContainer, children: rate === selectedRate ? (0, import_jsx_runtime2.jsx)(Checkmark, {}) : null }), rate.toFixed(1), "x"] }, rate);
  };
  var PlaybackPopup = ({ setIsComponentVisible, playbackRates, canvasSize }) => {
    const { setPlaybackRate, playbackRate } = (0, import_react2.useContext)(Internals.Timeline.TimelineContext);
    const [keyboardSelectedRate, setKeyboardSelectedRate] = (0, import_react2.useState)(playbackRate);
    (0, import_react2.useEffect)(() => {
      const listener = (e) => {
        e.preventDefault();
        if (e.key === "ArrowUp") {
          const currentIndex = playbackRates.findIndex((rate) => rate === keyboardSelectedRate);
          if (currentIndex === 0) {
            return;
          }
          if (currentIndex === -1) {
            setKeyboardSelectedRate(playbackRates[0]);
          } else {
            setKeyboardSelectedRate(playbackRates[currentIndex - 1]);
          }
        } else if (e.key === "ArrowDown") {
          const currentIndex = playbackRates.findIndex((rate) => rate === keyboardSelectedRate);
          if (currentIndex === playbackRates.length - 1) {
            return;
          }
          if (currentIndex === -1) {
            setKeyboardSelectedRate(playbackRates[playbackRates.length - 1]);
          } else {
            setKeyboardSelectedRate(playbackRates[currentIndex + 1]);
          }
        } else if (e.key === "Enter") {
          setPlaybackRate(keyboardSelectedRate);
          setIsComponentVisible(false);
        }
      };
      window.addEventListener("keydown", listener);
      return () => {
        window.removeEventListener("keydown", listener);
      };
    }, [
      playbackRates,
      keyboardSelectedRate,
      setPlaybackRate,
      setIsComponentVisible
    ]);
    const onSelect = (0, import_react2.useCallback)((rate) => {
      setPlaybackRate(rate);
      setIsComponentVisible(false);
    }, [setIsComponentVisible, setPlaybackRate]);
    const playbackPopup = (0, import_react2.useMemo)(() => {
      return {
        position: "absolute",
        right: 0,
        width: 125,
        maxHeight: canvasSize.height - THRESHOLD - BOTTOM,
        bottom: 35,
        background: "#fff",
        borderRadius: 4,
        overflow: "auto",
        color: "black",
        textAlign: "left"
      };
    }, [canvasSize.height]);
    return (0, import_jsx_runtime2.jsx)("div", { style: playbackPopup, children: playbackRates.map((rate) => {
      return (0, import_jsx_runtime2.jsx)(PlaybackrateOption, { selectedRate: playbackRate, onSelect, rate, keyboardSelectedRate }, rate);
    }) });
  };
  var label2 = {
    fontSize: 13,
    fontWeight: "bold",
    color: "white",
    border: "2px solid white",
    borderRadius: 20,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2
  };
  var playerButtonStyle = {
    appearance: "none",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 6,
    paddingBottom: 6,
    height: 37,
    display: "inline-flex",
    marginBottom: 0,
    marginTop: 0,
    alignItems: "center"
  };
  var button = {
    ...playerButtonStyle,
    position: "relative"
  };
  var PlaybackrateControl = ({ playbackRates, canvasSize }) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const { playbackRate } = (0, import_react2.useContext)(Internals.Timeline.TimelineContext);
    const onClick = (0, import_react2.useCallback)((e) => {
      e.stopPropagation();
      e.preventDefault();
      setIsComponentVisible((prevIsComponentVisible) => !prevIsComponentVisible);
    }, [setIsComponentVisible]);
    return (0, import_jsx_runtime2.jsx)("div", { ref, children: (0, import_jsx_runtime2.jsxs)("button", { type: "button", "aria-label": "Change playback rate", style: button, onClick, children: [(0, import_jsx_runtime2.jsxs)("div", { style: label2, children: [playbackRate, "x"] }), isComponentVisible && (0, import_jsx_runtime2.jsx)(PlaybackPopup, { canvasSize, playbackRates, setIsComponentVisible })] }) });
  };
  var getFrameFromX = (clientX, durationInFrames, width) => {
    var _a;
    const pos = clientX;
    const frame = Math.round(interpolate(pos, [0, width], [0, (_a = durationInFrames - 1) !== null && _a !== void 0 ? _a : 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp"
    }));
    return frame;
  };
  var BAR_HEIGHT = 5;
  var KNOB_SIZE = 12;
  var VERTICAL_PADDING = 4;
  var containerStyle$1 = {
    userSelect: "none",
    paddingTop: VERTICAL_PADDING,
    paddingBottom: VERTICAL_PADDING,
    boxSizing: "border-box",
    cursor: "pointer",
    position: "relative",
    touchAction: "none"
  };
  var barBackground = {
    height: BAR_HEIGHT,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    width: "100%",
    borderRadius: BAR_HEIGHT / 2
  };
  var findBodyInWhichDivIsLocated = (div) => {
    let current = div;
    while (current.parentElement) {
      current = current.parentElement;
    }
    return current;
  };
  var PlayerSeekBar = ({ durationInFrames, onSeekEnd, onSeekStart, inFrame, outFrame }) => {
    var _a;
    const containerRef = (0, import_react2.useRef)(null);
    const barHovered = useHoverState(containerRef, false);
    const size = useElementSize(containerRef, {
      triggerOnWindowResize: true,
      shouldApplyCssTransforms: true
    });
    const { seek: seek2, play, pause, playing } = usePlayer();
    const frame = Internals.Timeline.useTimelinePosition();
    const [dragging, setDragging] = (0, import_react2.useState)({
      dragging: false
    });
    const width = (_a = size === null || size === void 0 ? void 0 : size.width) !== null && _a !== void 0 ? _a : 0;
    const onPointerDown = (0, import_react2.useCallback)((e) => {
      var _a2;
      if (e.button !== 0) {
        return;
      }
      const posLeft = (_a2 = containerRef.current) === null || _a2 === void 0 ? void 0 : _a2.getBoundingClientRect().left;
      const _frame = getFrameFromX(e.clientX - posLeft, durationInFrames, width);
      pause();
      seek2(_frame);
      setDragging({
        dragging: true,
        wasPlaying: playing
      });
      onSeekStart();
    }, [durationInFrames, width, pause, seek2, playing, onSeekStart]);
    const onPointerMove = (0, import_react2.useCallback)((e) => {
      var _a2;
      if (!size) {
        throw new Error("Player has no size");
      }
      if (!dragging.dragging) {
        return;
      }
      const posLeft = (_a2 = containerRef.current) === null || _a2 === void 0 ? void 0 : _a2.getBoundingClientRect().left;
      const _frame = getFrameFromX(e.clientX - posLeft, durationInFrames, size.width);
      seek2(_frame);
    }, [dragging.dragging, durationInFrames, seek2, size]);
    const onPointerUp = (0, import_react2.useCallback)(() => {
      setDragging({
        dragging: false
      });
      if (!dragging.dragging) {
        return;
      }
      if (dragging.wasPlaying) {
        play();
      } else {
        pause();
      }
      onSeekEnd();
    }, [dragging, onSeekEnd, pause, play]);
    (0, import_react2.useEffect)(() => {
      if (!dragging.dragging) {
        return;
      }
      const body = findBodyInWhichDivIsLocated(containerRef.current);
      body.addEventListener("pointermove", onPointerMove);
      body.addEventListener("pointerup", onPointerUp);
      return () => {
        body.removeEventListener("pointermove", onPointerMove);
        body.removeEventListener("pointerup", onPointerUp);
      };
    }, [dragging.dragging, onPointerMove, onPointerUp]);
    const knobStyle = (0, import_react2.useMemo)(() => {
      return {
        height: KNOB_SIZE,
        width: KNOB_SIZE,
        borderRadius: KNOB_SIZE / 2,
        position: "absolute",
        top: VERTICAL_PADDING - KNOB_SIZE / 2 + 5 / 2,
        backgroundColor: "white",
        left: Math.max(0, frame / Math.max(1, durationInFrames - 1) * width - KNOB_SIZE / 2),
        boxShadow: "0 0 2px black",
        opacity: Number(barHovered)
      };
    }, [barHovered, durationInFrames, frame, width]);
    const fillStyle = (0, import_react2.useMemo)(() => {
      return {
        height: BAR_HEIGHT,
        backgroundColor: "rgba(255, 255, 255, 1)",
        width: (frame - (inFrame !== null && inFrame !== void 0 ? inFrame : 0)) / (durationInFrames - 1) * 100 + "%",
        marginLeft: (inFrame !== null && inFrame !== void 0 ? inFrame : 0) / (durationInFrames - 1) * 100 + "%",
        borderRadius: BAR_HEIGHT / 2
      };
    }, [durationInFrames, frame, inFrame]);
    const active = (0, import_react2.useMemo)(() => {
      return {
        height: BAR_HEIGHT,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        width: ((outFrame !== null && outFrame !== void 0 ? outFrame : durationInFrames - 1) - (inFrame !== null && inFrame !== void 0 ? inFrame : 0)) / (durationInFrames - 1) * 100 + "%",
        marginLeft: (inFrame !== null && inFrame !== void 0 ? inFrame : 0) / (durationInFrames - 1) * 100 + "%",
        borderRadius: BAR_HEIGHT / 2,
        position: "absolute"
      };
    }, [durationInFrames, inFrame, outFrame]);
    return (0, import_jsx_runtime2.jsxs)("div", { ref: containerRef, onPointerDown, style: containerStyle$1, children: [(0, import_jsx_runtime2.jsxs)("div", { style: barBackground, children: [(0, import_jsx_runtime2.jsx)("div", { style: active }), (0, import_jsx_runtime2.jsx)("div", { style: fillStyle })] }), (0, import_jsx_runtime2.jsx)("div", { style: knobStyle })] });
  };
  var formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds - minutes * 60);
    return `${String(minutes)}:${String(seconds).padStart(2, "0")}`;
  };
  var X_SPACER = 10;
  var X_PADDING = 12;
  var useVideoControlsResize = ({ allowFullscreen: allowFullScreen, playerWidth }) => {
    const resizeInfo = (0, import_react2.useMemo)(() => {
      const playPauseIconSize = ICON_SIZE2;
      const volumeIconSize = ICON_SIZE2;
      const _fullscreenIconSize = allowFullScreen ? fullscreenIconSize : 0;
      const elementsSize = volumeIconSize + playPauseIconSize + _fullscreenIconSize + X_PADDING * 2 + X_SPACER * 2;
      const maxTimeLabelWidth = playerWidth - elementsSize;
      const maxTimeLabelWidthWithoutNegativeValue = Math.max(maxTimeLabelWidth, 0);
      const availableTimeLabelWidthIfVolumeOpen = maxTimeLabelWidthWithoutNegativeValue - VOLUME_SLIDER_WIDTH;
      const computedLabelWidth = availableTimeLabelWidthIfVolumeOpen < VOLUME_SLIDER_WIDTH ? maxTimeLabelWidthWithoutNegativeValue : availableTimeLabelWidthIfVolumeOpen;
      const minWidthForHorizontalDisplay = computedLabelWidth + elementsSize + VOLUME_SLIDER_WIDTH;
      const displayVerticalVolumeSlider = playerWidth < minWidthForHorizontalDisplay;
      return {
        maxTimeLabelWidth: maxTimeLabelWidthWithoutNegativeValue === 0 ? null : maxTimeLabelWidthWithoutNegativeValue,
        displayVerticalVolumeSlider
      };
    }, [allowFullScreen, playerWidth]);
    return resizeInfo;
  };
  var gradientSteps = [
    0,
    0.013,
    0.049,
    0.104,
    0.175,
    0.259,
    0.352,
    0.45,
    0.55,
    0.648,
    0.741,
    0.825,
    0.896,
    0.951,
    0.987
  ];
  var gradientOpacities = [
    0,
    8.1,
    15.5,
    22.5,
    29,
    35.3,
    41.2,
    47.1,
    52.9,
    58.8,
    64.7,
    71,
    77.5,
    84.5,
    91.9
  ];
  var globalGradientOpacity = 1 / 0.7;
  var containerStyle = {
    boxSizing: "border-box",
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingTop: 40,
    paddingBottom: 10,
    backgroundImage: `linear-gradient(to bottom,${gradientSteps.map((g, i) => {
      return `hsla(0, 0%, 0%, ${g}) ${gradientOpacities[i] * globalGradientOpacity}%`;
    }).join(", ")}, hsl(0, 0%, 0%) 100%)`,
    backgroundSize: "auto 145px",
    display: "flex",
    paddingRight: X_PADDING,
    paddingLeft: X_PADDING,
    flexDirection: "column",
    transition: "opacity 0.3s"
  };
  var controlsRow = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none"
  };
  var leftPartStyle = {
    display: "flex",
    flexDirection: "row",
    userSelect: "none",
    alignItems: "center"
  };
  var xSpacer = {
    width: 12
  };
  var ySpacer = {
    height: 8
  };
  var flex1 = {
    flex: 1
  };
  var fullscreen = {};
  var Controls = ({ durationInFrames, isFullscreen, fps, player, showVolumeControls, onFullscreenButtonClick, allowFullscreen, onExitFullscreenButtonClick, spaceKeyToPlayOrPause, onSeekEnd, onSeekStart, inFrame, outFrame, initiallyShowControls, canvasSize, renderPlayPauseButton, renderFullscreenButton, alwaysShowControls, showPlaybackRateControl, containerRef, buffering, hideControlsWhenPointerDoesntMove, onPointerUp, onDoubleClick }) => {
    var _a, _b;
    const playButtonRef = (0, import_react2.useRef)(null);
    const frame = Internals.Timeline.useTimelinePosition();
    const [supportsFullscreen, setSupportsFullscreen] = (0, import_react2.useState)(false);
    const hovered = useHoverState(containerRef, hideControlsWhenPointerDoesntMove);
    const { maxTimeLabelWidth, displayVerticalVolumeSlider } = useVideoControlsResize({
      allowFullscreen,
      playerWidth: (_a = canvasSize === null || canvasSize === void 0 ? void 0 : canvasSize.width) !== null && _a !== void 0 ? _a : 0
    });
    const [shouldShowInitially, setInitiallyShowControls] = (0, import_react2.useState)(() => {
      if (typeof initiallyShowControls === "boolean") {
        return initiallyShowControls;
      }
      if (typeof initiallyShowControls === "number") {
        if (initiallyShowControls % 1 !== 0) {
          throw new Error("initiallyShowControls must be an integer or a boolean");
        }
        if (Number.isNaN(initiallyShowControls)) {
          throw new Error("initiallyShowControls must not be NaN");
        }
        if (!Number.isFinite(initiallyShowControls)) {
          throw new Error("initiallyShowControls must be finite");
        }
        if (initiallyShowControls <= 0) {
          throw new Error("initiallyShowControls must be a positive integer");
        }
        return initiallyShowControls;
      }
      throw new TypeError("initiallyShowControls must be a number or a boolean");
    });
    const containerCss = (0, import_react2.useMemo)(() => {
      const shouldShow = hovered || !player.playing || shouldShowInitially || alwaysShowControls;
      return {
        ...containerStyle,
        opacity: Number(shouldShow)
      };
    }, [hovered, shouldShowInitially, player.playing, alwaysShowControls]);
    (0, import_react2.useEffect)(() => {
      if (playButtonRef.current && spaceKeyToPlayOrPause) {
        playButtonRef.current.focus({
          preventScroll: true
        });
      }
    }, [player.playing, spaceKeyToPlayOrPause]);
    (0, import_react2.useEffect)(() => {
      var _a2;
      setSupportsFullscreen((_a2 = typeof document !== "undefined" && (document.fullscreenEnabled || document.webkitFullscreenEnabled)) !== null && _a2 !== void 0 ? _a2 : false);
    }, []);
    (0, import_react2.useEffect)(() => {
      if (shouldShowInitially === false) {
        return;
      }
      const time = shouldShowInitially === true ? 2e3 : shouldShowInitially;
      const timeout = setTimeout(() => {
        setInitiallyShowControls(false);
      }, time);
      return () => {
        clearInterval(timeout);
      };
    }, [shouldShowInitially]);
    const timeLabel = (0, import_react2.useMemo)(() => {
      return {
        color: "white",
        fontFamily: "sans-serif",
        fontSize: 14,
        maxWidth: maxTimeLabelWidth === null ? void 0 : maxTimeLabelWidth,
        overflow: "hidden",
        textOverflow: "ellipsis"
      };
    }, [maxTimeLabelWidth]);
    const playbackRates = (0, import_react2.useMemo)(() => {
      if (showPlaybackRateControl === true) {
        return [0.5, 0.8, 1, 1.2, 1.5, 1.8, 2, 2.5, 3];
      }
      if (Array.isArray(showPlaybackRateControl)) {
        for (const rate of showPlaybackRateControl) {
          if (typeof rate !== "number") {
            throw new Error("Every item in showPlaybackRateControl must be a number");
          }
          if (rate <= 0) {
            throw new Error("Every item in showPlaybackRateControl must be positive");
          }
        }
        return showPlaybackRateControl;
      }
      return null;
    }, [showPlaybackRateControl]);
    const ref = (0, import_react2.useRef)(null);
    const flexRef = (0, import_react2.useRef)(null);
    const onPointerUpIfContainer = (0, import_react2.useCallback)((e) => {
      if (e.target === ref.current || e.target === flexRef.current) {
        onPointerUp === null || onPointerUp === void 0 ? void 0 : onPointerUp(e);
      }
    }, [onPointerUp]);
    const onDoubleClickIfContainer = (0, import_react2.useCallback)((e) => {
      if (e.target === ref.current || e.target === flexRef.current) {
        onDoubleClick === null || onDoubleClick === void 0 ? void 0 : onDoubleClick(e);
      }
    }, [onDoubleClick]);
    return (0, import_jsx_runtime2.jsxs)("div", { ref, style: containerCss, onPointerUp: onPointerUpIfContainer, onDoubleClick: onDoubleClickIfContainer, children: [(0, import_jsx_runtime2.jsxs)("div", { ref: flexRef, style: controlsRow, children: [(0, import_jsx_runtime2.jsxs)("div", { style: leftPartStyle, children: [(0, import_jsx_runtime2.jsx)("button", { ref: playButtonRef, type: "button", style: playerButtonStyle, onClick: player.playing ? player.pause : player.play, "aria-label": player.playing ? "Pause video" : "Play video", title: player.playing ? "Pause video" : "Play video", children: renderPlayPauseButton === null ? (0, import_jsx_runtime2.jsx)(DefaultPlayPauseButton, { buffering, playing: player.playing }) : (_b = renderPlayPauseButton({
      playing: player.playing,
      isBuffering: buffering
    })) !== null && _b !== void 0 ? _b : (0, import_jsx_runtime2.jsx)(DefaultPlayPauseButton, { buffering, playing: player.playing }) }), showVolumeControls ? (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [(0, import_jsx_runtime2.jsx)("div", { style: xSpacer }), (0, import_jsx_runtime2.jsx)(MediaVolumeSlider, { displayVerticalVolumeSlider })] }) : null, (0, import_jsx_runtime2.jsx)("div", { style: xSpacer }), (0, import_jsx_runtime2.jsxs)("div", { style: timeLabel, children: [formatTime(frame / fps), " / ", formatTime(durationInFrames / fps)] }), (0, import_jsx_runtime2.jsx)("div", { style: xSpacer })] }), (0, import_jsx_runtime2.jsx)("div", { style: flex1 }), playbackRates && canvasSize && (0, import_jsx_runtime2.jsx)(PlaybackrateControl, { canvasSize, playbackRates }), playbackRates && supportsFullscreen && allowFullscreen ? (0, import_jsx_runtime2.jsx)("div", { style: xSpacer }) : null, (0, import_jsx_runtime2.jsx)("div", { style: fullscreen, children: supportsFullscreen && allowFullscreen ? (0, import_jsx_runtime2.jsx)("button", { type: "button", "aria-label": isFullscreen ? "Exit fullscreen" : "Enter Fullscreen", title: isFullscreen ? "Exit fullscreen" : "Enter Fullscreen", style: playerButtonStyle, onClick: isFullscreen ? onExitFullscreenButtonClick : onFullscreenButtonClick, children: renderFullscreenButton === null ? (0, import_jsx_runtime2.jsx)(FullscreenIcon, { isFullscreen }) : renderFullscreenButton({ isFullscreen }) }) : null })] }), (0, import_jsx_runtime2.jsx)("div", { style: ySpacer }), (0, import_jsx_runtime2.jsx)(PlayerSeekBar, { onSeekEnd, onSeekStart, durationInFrames, inFrame, outFrame })] });
  };
  var errorStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
    width: "100%"
  };
  var ErrorBoundary = class extends import_react2.default.Component {
    constructor() {
      super(...arguments);
      this.state = { hasError: null };
    }
    static getDerivedStateFromError(error) {
      return { hasError: error };
    }
    componentDidCatch(error) {
      this.props.onError(error);
    }
    render() {
      if (this.state.hasError) {
        return (0, import_jsx_runtime2.jsx)("div", { style: errorStyle, children: this.props.errorFallback({
          error: this.state.hasError
        }) });
      }
      return this.props.children;
    }
  };
  var PLAYER_CSS_CLASSNAME = "__remotion-player";
  var IS_NODE = typeof document === "undefined";
  var cancellablePromise = (promise) => {
    let isCanceled = false;
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then((value) => {
        if (isCanceled) {
          reject({ isCanceled, value });
          return;
        }
        resolve(value);
      }).catch((error) => {
        reject({ isCanceled, error });
      });
    });
    return {
      promise: wrappedPromise,
      cancel: () => {
        isCanceled = true;
      }
    };
  };
  var delay = (n) => new Promise((resolve) => setTimeout(resolve, n));
  var useCancellablePromises = () => {
    const pendingPromises = (0, import_react2.useRef)([]);
    const appendPendingPromise = (0, import_react2.useCallback)((promise) => {
      pendingPromises.current = [...pendingPromises.current, promise];
    }, []);
    const removePendingPromise = (0, import_react2.useCallback)((promise) => {
      pendingPromises.current = pendingPromises.current.filter((p) => p !== promise);
    }, []);
    const clearPendingPromises = (0, import_react2.useCallback)(() => pendingPromises.current.map((p) => p.cancel()), []);
    const api = (0, import_react2.useMemo)(() => ({
      appendPendingPromise,
      removePendingPromise,
      clearPendingPromises
    }), [appendPendingPromise, clearPendingPromises, removePendingPromise]);
    return api;
  };
  var useClickPreventionOnDoubleClick = (onClick, onDoubleClick, doubleClickToFullscreen) => {
    const api = useCancellablePromises();
    const handleClick = (0, import_react2.useCallback)(async (e) => {
      if (e.nativeEvent.pointerType === "touch") {
        onClick(e);
        return;
      }
      api.clearPendingPromises();
      const waitForClick = cancellablePromise(delay(200));
      api.appendPendingPromise(waitForClick);
      try {
        await waitForClick.promise;
        api.removePendingPromise(waitForClick);
        onClick(e);
      } catch (errorInfo) {
        const info = errorInfo;
        api.removePendingPromise(waitForClick);
        if (!info.isCanceled) {
          throw info.error;
        }
      }
    }, [api, onClick]);
    const handleDoubleClick = (0, import_react2.useCallback)(() => {
      api.clearPendingPromises();
      onDoubleClick();
    }, [api, onDoubleClick]);
    const returnValue = (0, import_react2.useMemo)(() => {
      if (!doubleClickToFullscreen) {
        return [onClick, () => void 0];
      }
      return [handleClick, handleDoubleClick];
    }, [doubleClickToFullscreen, handleClick, handleDoubleClick, onClick]);
    return returnValue;
  };
  var reactVersion$1 = import_react2.default.version.split(".")[0];
  if (reactVersion$1 === "0") {
    throw new Error(`Version ${reactVersion$1} of "react" is not supported by Remotion`);
  }
  var doesReactVersionSupportSuspense$1 = parseInt(reactVersion$1, 10) >= 18;
  var PlayerUI = ({ controls, style, loop, autoPlay, allowFullscreen, inputProps, clickToPlay, showVolumeControls, doubleClickToFullscreen, spaceKeyToPlayOrPause, errorFallback, playbackRate, renderLoading, renderPoster, className: className2, moveToBeginningWhenEnded, showPosterWhenUnplayed, showPosterWhenEnded, showPosterWhenPaused, showPosterWhenBuffering, inFrame, outFrame, initiallyShowControls, renderFullscreen: renderFullscreenButton, renderPlayPauseButton, alwaysShowControls, showPlaybackRateControl, posterFillMode, bufferStateDelayInMilliseconds, hideControlsWhenPointerDoesntMove }, ref) => {
    var _a, _b, _c;
    const config = Internals.useUnsafeVideoConfig();
    const video = Internals.useVideo();
    const container2 = (0, import_react2.useRef)(null);
    const canvasSize = useElementSize(container2, {
      triggerOnWindowResize: false,
      shouldApplyCssTransforms: false
    });
    const [hasPausedToResume, setHasPausedToResume] = (0, import_react2.useState)(false);
    const [shouldAutoplay, setShouldAutoPlay] = (0, import_react2.useState)(autoPlay);
    const [isFullscreen, setIsFullscreen] = (0, import_react2.useState)(() => false);
    const [seeking, setSeeking] = (0, import_react2.useState)(false);
    const supportsFullScreen = (0, import_react2.useMemo)(() => {
      if (typeof document === "undefined") {
        return false;
      }
      return Boolean(document.fullscreenEnabled || document.webkitFullscreenEnabled);
    }, []);
    const player = usePlayer();
    usePlayback({
      loop,
      playbackRate,
      moveToBeginningWhenEnded,
      inFrame,
      outFrame,
      frameRef: player.remotionInternal_currentFrameRef
    });
    (0, import_react2.useEffect)(() => {
      if (hasPausedToResume && !player.playing) {
        setHasPausedToResume(false);
        player.play();
      }
    }, [hasPausedToResume, player]);
    (0, import_react2.useEffect)(() => {
      const { current } = container2;
      if (!current) {
        return;
      }
      const onFullscreenChange = () => {
        setIsFullscreen(document.fullscreenElement === current || document.webkitFullscreenElement === current);
      };
      document.addEventListener("fullscreenchange", onFullscreenChange);
      document.addEventListener("webkitfullscreenchange", onFullscreenChange);
      return () => {
        document.removeEventListener("fullscreenchange", onFullscreenChange);
        document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      };
    }, []);
    const toggle = (0, import_react2.useCallback)((e) => {
      if (player.isPlaying()) {
        player.pause();
      } else {
        player.play(e);
      }
    }, [player]);
    const requestFullscreen = (0, import_react2.useCallback)(() => {
      if (!allowFullscreen) {
        throw new Error("allowFullscreen is false");
      }
      if (!supportsFullScreen) {
        throw new Error("Browser doesnt support fullscreen");
      }
      if (!container2.current) {
        throw new Error("No player ref found");
      }
      if (container2.current.webkitRequestFullScreen) {
        container2.current.webkitRequestFullScreen();
      } else {
        container2.current.requestFullscreen();
      }
    }, [allowFullscreen, supportsFullScreen]);
    const exitFullscreen = (0, import_react2.useCallback)(() => {
      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else {
        document.exitFullscreen();
      }
    }, []);
    (0, import_react2.useEffect)(() => {
      const { current } = container2;
      if (!current) {
        return;
      }
      const fullscreenChange = () => {
        var _a2;
        const element = (_a2 = document.webkitFullscreenElement) !== null && _a2 !== void 0 ? _a2 : document.fullscreenElement;
        if (element && element === container2.current) {
          player.emitter.dispatchFullscreenChange({
            isFullscreen: true
          });
        } else {
          player.emitter.dispatchFullscreenChange({
            isFullscreen: false
          });
        }
      };
      current.addEventListener("webkitfullscreenchange", fullscreenChange);
      current.addEventListener("fullscreenchange", fullscreenChange);
      return () => {
        current.removeEventListener("webkitfullscreenchange", fullscreenChange);
        current.removeEventListener("fullscreenchange", fullscreenChange);
      };
    }, [player.emitter]);
    const durationInFrames = (_a = config === null || config === void 0 ? void 0 : config.durationInFrames) !== null && _a !== void 0 ? _a : 1;
    const layout = (0, import_react2.useMemo)(() => {
      if (!config || !canvasSize) {
        return null;
      }
      return calculateCanvasTransformation({
        canvasSize,
        compositionHeight: config.height,
        compositionWidth: config.width,
        previewSize: "auto"
      });
    }, [canvasSize, config]);
    const scale = (_b = layout === null || layout === void 0 ? void 0 : layout.scale) !== null && _b !== void 0 ? _b : 1;
    const initialScaleIgnored = (0, import_react2.useRef)(false);
    (0, import_react2.useEffect)(() => {
      if (!initialScaleIgnored.current) {
        initialScaleIgnored.current = true;
        return;
      }
      player.emitter.dispatchScaleChange(scale);
    }, [player.emitter, scale]);
    const { setMediaVolume, setMediaMuted } = (0, import_react2.useContext)(Internals.SetMediaVolumeContext);
    const { mediaMuted, mediaVolume } = (0, import_react2.useContext)(Internals.MediaVolumeContext);
    (0, import_react2.useEffect)(() => {
      player.emitter.dispatchVolumeChange(mediaVolume);
    }, [player.emitter, mediaVolume]);
    const isMuted = mediaMuted || mediaVolume === 0;
    (0, import_react2.useEffect)(() => {
      player.emitter.dispatchMuteChange({
        isMuted
      });
    }, [player.emitter, isMuted]);
    const [showBufferIndicator, setShowBufferState] = (0, import_react2.useState)(false);
    (0, import_react2.useEffect)(() => {
      let timeout = null;
      let stopped = false;
      const onBuffer = () => {
        requestAnimationFrame(() => {
          if (bufferStateDelayInMilliseconds === 0) {
            setShowBufferState(true);
          } else {
            timeout = setTimeout(() => {
              if (!stopped) {
                setShowBufferState(true);
              }
            }, bufferStateDelayInMilliseconds);
          }
        });
      };
      const onResume = () => {
        requestAnimationFrame(() => {
          setShowBufferState(false);
          if (timeout) {
            clearTimeout(timeout);
          }
        });
      };
      player.emitter.addEventListener("waiting", onBuffer);
      player.emitter.addEventListener("resume", onResume);
      return () => {
        player.emitter.removeEventListener("waiting", onBuffer);
        player.emitter.removeEventListener("resume", onResume);
        setShowBufferState(false);
        if (timeout) {
          clearTimeout(timeout);
        }
        stopped = true;
      };
    }, [bufferStateDelayInMilliseconds, player.emitter]);
    (0, import_react2.useImperativeHandle)(ref, () => {
      const methods = {
        play: player.play,
        pause: () => {
          setHasPausedToResume(false);
          player.pause();
        },
        toggle,
        getContainerNode: () => container2.current,
        getCurrentFrame: player.getCurrentFrame,
        isPlaying: () => player.playing,
        seekTo: (f) => {
          const lastFrame = durationInFrames - 1;
          const frameToSeekTo = Math.max(0, Math.min(lastFrame, f));
          if (player.isPlaying()) {
            const pauseToResume = frameToSeekTo !== lastFrame || loop;
            setHasPausedToResume(pauseToResume);
            player.pause();
          }
          if (frameToSeekTo === lastFrame && !loop) {
            player.emitter.dispatchEnded();
          }
          player.seek(frameToSeekTo);
        },
        isFullscreen: () => isFullscreen,
        requestFullscreen,
        exitFullscreen,
        getVolume: () => {
          if (mediaMuted) {
            return 0;
          }
          return mediaVolume;
        },
        setVolume: (vol) => {
          if (typeof vol !== "number") {
            throw new TypeError(`setVolume() takes a number, got value of type ${typeof vol}`);
          }
          if (isNaN(vol)) {
            throw new TypeError(`setVolume() got a number that is NaN. Volume must be between 0 and 1.`);
          }
          if (vol < 0 || vol > 1) {
            throw new TypeError(`setVolume() got a number that is out of range. Must be between 0 and 1, got ${typeof vol}`);
          }
          setMediaVolume(vol);
        },
        isMuted: () => isMuted,
        mute: () => {
          setMediaMuted(true);
        },
        unmute: () => {
          setMediaMuted(false);
        },
        getScale: () => scale,
        pauseAndReturnToPlayStart: () => {
          player.pauseAndReturnToPlayStart();
        }
      };
      return Object.assign(player.emitter, methods);
    }, [
      durationInFrames,
      exitFullscreen,
      isFullscreen,
      loop,
      mediaMuted,
      isMuted,
      mediaVolume,
      player,
      requestFullscreen,
      setMediaMuted,
      setMediaVolume,
      toggle,
      scale
    ]);
    const VideoComponent = video ? video.component : null;
    const outerStyle = (0, import_react2.useMemo)(() => {
      return calculateOuterStyle({ canvasSize, config, style });
    }, [canvasSize, config, style]);
    const outer = (0, import_react2.useMemo)(() => {
      return calculateOuter({ config, layout, scale });
    }, [config, layout, scale]);
    const containerStyle2 = (0, import_react2.useMemo)(() => {
      return calculateContainerStyle({ canvasSize, config, layout, scale });
    }, [canvasSize, config, layout, scale]);
    const onError = (0, import_react2.useCallback)((error) => {
      player.pause();
      player.emitter.dispatchError(error);
    }, [player]);
    const onFullscreenButtonClick = (0, import_react2.useCallback)((e) => {
      e.stopPropagation();
      requestFullscreen();
    }, [requestFullscreen]);
    const onExitFullscreenButtonClick = (0, import_react2.useCallback)((e) => {
      e.stopPropagation();
      exitFullscreen();
    }, [exitFullscreen]);
    const onSingleClick = (0, import_react2.useCallback)((e) => {
      toggle(e);
    }, [toggle]);
    const onSeekStart = (0, import_react2.useCallback)(() => {
      setSeeking(true);
    }, []);
    const onSeekEnd = (0, import_react2.useCallback)(() => {
      setSeeking(false);
    }, []);
    const onDoubleClick = (0, import_react2.useCallback)(() => {
      if (isFullscreen) {
        exitFullscreen();
      } else {
        requestFullscreen();
      }
    }, [exitFullscreen, isFullscreen, requestFullscreen]);
    const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(onSingleClick, onDoubleClick, doubleClickToFullscreen && allowFullscreen && supportsFullScreen);
    (0, import_react2.useEffect)(() => {
      if (shouldAutoplay) {
        player.play();
        setShouldAutoPlay(false);
      }
    }, [shouldAutoplay, player]);
    const loadingMarkup = (0, import_react2.useMemo)(() => {
      return renderLoading ? renderLoading({
        height: outerStyle.height,
        width: outerStyle.width,
        isBuffering: showBufferIndicator
      }) : null;
    }, [outerStyle.height, outerStyle.width, renderLoading, showBufferIndicator]);
    const currentScale = (0, import_react2.useMemo)(() => {
      return {
        type: "scale",
        scale
      };
    }, [scale]);
    if (!config) {
      return null;
    }
    const poster = renderPoster ? renderPoster({
      height: posterFillMode === "player-size" ? outerStyle.height : config.height,
      width: posterFillMode === "player-size" ? outerStyle.width : config.width,
      isBuffering: showBufferIndicator
    }) : null;
    if (poster === void 0) {
      throw new TypeError("renderPoster() must return a React element, but undefined was returned");
    }
    const shouldShowPoster = poster && [
      showPosterWhenPaused && !player.isPlaying() && !seeking,
      showPosterWhenEnded && player.isLastFrame && !player.isPlaying(),
      showPosterWhenUnplayed && !player.hasPlayed && !player.isPlaying(),
      showPosterWhenBuffering && showBufferIndicator && player.isPlaying()
    ].some(Boolean);
    const { left, top, width, height, ...outerWithoutScale } = outer;
    const content = (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [(0, import_jsx_runtime2.jsx)("div", { style: outer, onPointerUp: clickToPlay ? handleClick : void 0, onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0, children: (0, import_jsx_runtime2.jsxs)("div", { style: containerStyle2, className: PLAYER_CSS_CLASSNAME, children: [VideoComponent ? (0, import_jsx_runtime2.jsx)(ErrorBoundary, { onError, errorFallback, children: (0, import_jsx_runtime2.jsx)(Internals.ClipComposition, { children: (0, import_jsx_runtime2.jsx)(Internals.CurrentScaleContext.Provider, { value: currentScale, children: (0, import_jsx_runtime2.jsx)(VideoComponent, { ...(_c = video === null || video === void 0 ? void 0 : video.props) !== null && _c !== void 0 ? _c : {}, ...inputProps !== null && inputProps !== void 0 ? inputProps : {} }) }) }) }) : null, shouldShowPoster && posterFillMode === "composition-size" ? (0, import_jsx_runtime2.jsx)("div", { style: {
      ...outerWithoutScale,
      width: config.width,
      height: config.height
    }, onPointerUp: clickToPlay ? handleClick : void 0, onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0, children: poster }) : null] }) }), shouldShowPoster && posterFillMode === "player-size" ? (0, import_jsx_runtime2.jsx)("div", { style: outer, onPointerUp: clickToPlay ? handleClick : void 0, onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0, children: poster }) : null, controls ? (0, import_jsx_runtime2.jsx)(Controls, { fps: config.fps, durationInFrames: config.durationInFrames, player, containerRef: container2, onFullscreenButtonClick, isFullscreen, allowFullscreen, showVolumeControls, onExitFullscreenButtonClick, spaceKeyToPlayOrPause, onSeekEnd, onSeekStart, inFrame, outFrame, initiallyShowControls, canvasSize, renderFullscreenButton, renderPlayPauseButton, alwaysShowControls, showPlaybackRateControl, buffering: showBufferIndicator, hideControlsWhenPointerDoesntMove, onDoubleClick: doubleClickToFullscreen ? handleDoubleClick : void 0, onPointerUp: clickToPlay ? handleClick : void 0 }) : null] });
    if (IS_NODE && !doesReactVersionSupportSuspense$1) {
      return (0, import_jsx_runtime2.jsx)("div", { ref: container2, style: outerStyle, className: className2, children: content });
    }
    return (0, import_jsx_runtime2.jsx)("div", { ref: container2, style: outerStyle, className: className2, children: (0, import_jsx_runtime2.jsx)(import_react2.Suspense, { fallback: loadingMarkup, children: content }) });
  };
  var PlayerUI$1 = (0, import_react2.forwardRef)(PlayerUI);
  var VOLUME_PERSISTANCE_KEY = "remotion.volumePreference";
  var persistVolume = (volume) => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(VOLUME_PERSISTANCE_KEY, String(volume));
    } catch (e) {
      console.log("Could not persist volume", e);
    }
  };
  var getPreferredVolume = () => {
    if (typeof window === "undefined") {
      return 1;
    }
    try {
      const val = window.localStorage.getItem(VOLUME_PERSISTANCE_KEY);
      return val ? Number(val) : 1;
    } catch (e) {
      return 1;
    }
  };
  var PLAYER_COMP_ID = "player-comp";
  var SharedPlayerContexts = ({ children, timelineContext, fps, compositionHeight, compositionWidth, durationInFrames, component, numberOfSharedAudioTags, initiallyMuted }) => {
    const compositionManagerContext = (0, import_react2.useMemo)(() => {
      const context = {
        compositions: [
          {
            component,
            durationInFrames,
            height: compositionHeight,
            width: compositionWidth,
            fps,
            id: PLAYER_COMP_ID,
            nonce: 777,
            folderName: null,
            parentFolderName: null,
            schema: null,
            calculateMetadata: null
          }
        ],
        folders: [],
        registerFolder: () => void 0,
        unregisterFolder: () => void 0,
        registerComposition: () => void 0,
        unregisterComposition: () => void 0,
        currentCompositionMetadata: null,
        setCurrentCompositionMetadata: () => void 0,
        canvasContent: { type: "composition", compositionId: "player-comp" },
        setCanvasContent: () => void 0
      };
      return context;
    }, [component, durationInFrames, compositionHeight, compositionWidth, fps]);
    const [mediaMuted, setMediaMuted] = (0, import_react2.useState)(() => initiallyMuted);
    const [mediaVolume, setMediaVolume] = (0, import_react2.useState)(() => getPreferredVolume());
    const mediaVolumeContextValue = (0, import_react2.useMemo)(() => {
      return {
        mediaMuted,
        mediaVolume
      };
    }, [mediaMuted, mediaVolume]);
    const setMediaVolumeAndPersist = (0, import_react2.useCallback)((vol) => {
      setMediaVolume(vol);
      persistVolume(vol);
    }, []);
    const setMediaVolumeContextValue = (0, import_react2.useMemo)(() => {
      return {
        setMediaMuted,
        setMediaVolume: setMediaVolumeAndPersist
      };
    }, [setMediaVolumeAndPersist]);
    return (0, import_jsx_runtime2.jsx)(Internals.CanUseRemotionHooksProvider, { children: (0, import_jsx_runtime2.jsx)(Internals.Timeline.TimelineContext.Provider, { value: timelineContext, children: (0, import_jsx_runtime2.jsx)(Internals.CompositionManager.Provider, { value: compositionManagerContext, children: (0, import_jsx_runtime2.jsx)(Internals.ResolveCompositionConfig, { children: (0, import_jsx_runtime2.jsx)(Internals.PrefetchProvider, { children: (0, import_jsx_runtime2.jsx)(Internals.DurationsContextProvider, { children: (0, import_jsx_runtime2.jsx)(Internals.MediaVolumeContext.Provider, { value: mediaVolumeContextValue, children: (0, import_jsx_runtime2.jsx)(Internals.NativeLayersProvider, { children: (0, import_jsx_runtime2.jsx)(Internals.SetMediaVolumeContext.Provider, { value: setMediaVolumeContextValue, children: (0, import_jsx_runtime2.jsx)(Internals.SharedAudioContextProvider, { numberOfAudioTags: numberOfSharedAudioTags, component, children: (0, import_jsx_runtime2.jsx)(Internals.BufferingProvider, { children }) }) }) }) }) }) }) }) }) }) });
  };
  var validateSingleFrame = (frame, variableName) => {
    if (typeof frame === "undefined" || frame === null) {
      return frame !== null && frame !== void 0 ? frame : null;
    }
    if (typeof frame !== "number") {
      throw new TypeError(`"${variableName}" must be a number, but is ${JSON.stringify(frame)}`);
    }
    if (Number.isNaN(frame)) {
      throw new TypeError(`"${variableName}" must not be NaN, but is ${JSON.stringify(frame)}`);
    }
    if (!Number.isFinite(frame)) {
      throw new TypeError(`"${variableName}" must be finite, but is ${JSON.stringify(frame)}`);
    }
    if (frame % 1 !== 0) {
      throw new TypeError(`"${variableName}" must be an integer, but is ${JSON.stringify(frame)}`);
    }
    return frame;
  };
  var validateInOutFrames = ({ inFrame, durationInFrames, outFrame }) => {
    const validatedInFrame = validateSingleFrame(inFrame, "inFrame");
    const validatedOutFrame = validateSingleFrame(outFrame, "outFrame");
    if (validatedInFrame === null && validatedOutFrame === null) {
      return;
    }
    if (validatedInFrame !== null && validatedInFrame > durationInFrames - 1) {
      throw new Error("inFrame must be less than (durationInFrames - 1), but is " + validatedInFrame);
    }
    if (validatedOutFrame !== null && validatedOutFrame > durationInFrames - 1) {
      throw new Error("outFrame must be less than (durationInFrames - 1), but is " + validatedOutFrame);
    }
    if (validatedInFrame !== null && validatedInFrame < 0) {
      throw new Error("inFrame must be greater than 0, but is " + validatedInFrame);
    }
    if (validatedOutFrame !== null && validatedOutFrame <= 0) {
      throw new Error(`outFrame must be greater than 0, but is ${validatedOutFrame}. If you want to render a single frame, use <Thumbnail /> instead.`);
    }
    if (validatedOutFrame !== null && validatedInFrame !== null && validatedOutFrame <= validatedInFrame) {
      throw new Error("outFrame must be greater than inFrame, but is " + validatedOutFrame + " <= " + validatedInFrame);
    }
  };
  var validateInitialFrame = ({ initialFrame, durationInFrames }) => {
    if (typeof durationInFrames !== "number") {
      throw new Error(`\`durationInFrames\` must be a number, but is ${JSON.stringify(durationInFrames)}`);
    }
    if (typeof initialFrame === "undefined") {
      return;
    }
    if (typeof initialFrame !== "number") {
      throw new Error(`\`initialFrame\` must be a number, but is ${JSON.stringify(initialFrame)}`);
    }
    if (Number.isNaN(initialFrame)) {
      throw new Error(`\`initialFrame\` must be a number, but is NaN`);
    }
    if (!Number.isFinite(initialFrame)) {
      throw new Error(`\`initialFrame\` must be a number, but is Infinity`);
    }
    if (initialFrame % 1 !== 0) {
      throw new Error(`\`initialFrame\` must be an integer, but is ${JSON.stringify(initialFrame)}`);
    }
    if (initialFrame > durationInFrames - 1) {
      throw new Error(`\`initialFrame\` must be less or equal than \`durationInFrames - 1\`, but is ${JSON.stringify(initialFrame)}`);
    }
  };
  var validatePlaybackRate = (playbackRate) => {
    if (playbackRate === void 0) {
      return;
    }
    if (playbackRate > 4) {
      throw new Error(`The highest possible playback rate is 4. You passed: ${playbackRate}`);
    }
    if (playbackRate < -4) {
      throw new Error(`The lowest possible playback rate is -4. You passed: ${playbackRate}`);
    }
    if (playbackRate === 0) {
      throw new Error(`A playback rate of 0 is not supported.`);
    }
  };
  var validateFps3 = NoReactInternals.validateFps;
  var validateDimension3 = NoReactInternals.validateDimension;
  var validateDurationInFrames3 = NoReactInternals.validateDurationInFrames;
  var validateDefaultAndInputProps3 = NoReactInternals.validateDefaultAndInputProps;
  var componentOrNullIfLazy = (props) => {
    if ("component" in props) {
      return props.component;
    }
    return null;
  };
  var PlayerFn = ({ durationInFrames, compositionHeight, compositionWidth, fps, inputProps, style, controls = false, loop = false, autoPlay = false, showVolumeControls = true, allowFullscreen = true, clickToPlay, doubleClickToFullscreen = false, spaceKeyToPlayOrPause = true, moveToBeginningWhenEnded = true, numberOfSharedAudioTags = 5, errorFallback = () => "\u26A0\uFE0F", playbackRate = 1, renderLoading, className: className2, showPosterWhenUnplayed, showPosterWhenEnded, showPosterWhenPaused, showPosterWhenBuffering, initialFrame, renderPoster, inFrame, outFrame, initiallyShowControls, renderFullscreenButton, renderPlayPauseButton, alwaysShowControls = false, initiallyMuted = false, showPlaybackRateControl = false, posterFillMode = "player-size", bufferStateDelayInMilliseconds, hideControlsWhenPointerDoesntMove = true, ...componentProps }, ref) => {
    if (typeof window !== "undefined") {
      (0, import_react2.useLayoutEffect)(() => {
        window.remotion_isPlayer = true;
      }, []);
    }
    if (componentProps.defaultProps !== void 0) {
      throw new Error("The <Player /> component does not accept `defaultProps`, but some were passed. Use `inputProps` instead.");
    }
    const componentForValidation = componentOrNullIfLazy(componentProps);
    if ((componentForValidation === null || componentForValidation === void 0 ? void 0 : componentForValidation.type) === Composition) {
      throw new TypeError(`'component' should not be an instance of <Composition/>. Pass the React component directly, and set the duration, fps and dimensions as separate props. See https://www.remotion.dev/docs/player/examples for an example.`);
    }
    if (componentForValidation === Composition) {
      throw new TypeError(`'component' must not be the 'Composition' component. Pass your own React component directly, and set the duration, fps and dimensions as separate props. See https://www.remotion.dev/docs/player/examples for an example.`);
    }
    const component = Internals.useLazyComponent(componentProps);
    validateInitialFrame({ initialFrame, durationInFrames });
    const [frame, setFrame] = (0, import_react2.useState)(() => ({
      [PLAYER_COMP_ID]: initialFrame !== null && initialFrame !== void 0 ? initialFrame : 0
    }));
    const [playing, setPlaying] = (0, import_react2.useState)(false);
    const [rootId] = (0, import_react2.useState)("player-comp");
    const rootRef = (0, import_react2.useRef)(null);
    const audioAndVideoTags = (0, import_react2.useRef)([]);
    const imperativePlaying = (0, import_react2.useRef)(false);
    const [currentPlaybackRate, setCurrentPlaybackRate] = (0, import_react2.useState)(playbackRate);
    if (typeof compositionHeight !== "number") {
      throw new TypeError(`'compositionHeight' must be a number but got '${typeof compositionHeight}' instead`);
    }
    if (typeof compositionWidth !== "number") {
      throw new TypeError(`'compositionWidth' must be a number but got '${typeof compositionWidth}' instead`);
    }
    validateDimension3(compositionHeight, "compositionHeight", "of the <Player /> component");
    validateDimension3(compositionWidth, "compositionWidth", "of the <Player /> component");
    validateDurationInFrames3(durationInFrames, {
      component: "of the <Player/> component",
      allowFloats: false
    });
    validateFps3(fps, "as a prop of the <Player/> component", false);
    validateDefaultAndInputProps3(inputProps, "inputProps", null);
    validateInOutFrames({
      durationInFrames,
      inFrame,
      outFrame
    });
    if (typeof controls !== "boolean" && typeof controls !== "undefined") {
      throw new TypeError(`'controls' must be a boolean or undefined but got '${typeof controls}' instead`);
    }
    if (typeof autoPlay !== "boolean" && typeof autoPlay !== "undefined") {
      throw new TypeError(`'autoPlay' must be a boolean or undefined but got '${typeof autoPlay}' instead`);
    }
    if (typeof loop !== "boolean" && typeof loop !== "undefined") {
      throw new TypeError(`'loop' must be a boolean or undefined but got '${typeof loop}' instead`);
    }
    if (typeof doubleClickToFullscreen !== "boolean" && typeof doubleClickToFullscreen !== "undefined") {
      throw new TypeError(`'doubleClickToFullscreen' must be a boolean or undefined but got '${typeof doubleClickToFullscreen}' instead`);
    }
    if (typeof showVolumeControls !== "boolean" && typeof showVolumeControls !== "undefined") {
      throw new TypeError(`'showVolumeControls' must be a boolean or undefined but got '${typeof showVolumeControls}' instead`);
    }
    if (typeof allowFullscreen !== "boolean" && typeof allowFullscreen !== "undefined") {
      throw new TypeError(`'allowFullscreen' must be a boolean or undefined but got '${typeof allowFullscreen}' instead`);
    }
    if (typeof clickToPlay !== "boolean" && typeof clickToPlay !== "undefined") {
      throw new TypeError(`'clickToPlay' must be a boolean or undefined but got '${typeof clickToPlay}' instead`);
    }
    if (typeof spaceKeyToPlayOrPause !== "boolean" && typeof spaceKeyToPlayOrPause !== "undefined") {
      throw new TypeError(`'spaceKeyToPlayOrPause' must be a boolean or undefined but got '${typeof spaceKeyToPlayOrPause}' instead`);
    }
    if (typeof numberOfSharedAudioTags !== "number" || numberOfSharedAudioTags % 1 !== 0 || !Number.isFinite(numberOfSharedAudioTags) || Number.isNaN(numberOfSharedAudioTags) || numberOfSharedAudioTags < 0) {
      throw new TypeError(`'numberOfSharedAudioTags' must be an integer but got '${numberOfSharedAudioTags}' instead`);
    }
    validatePlaybackRate(currentPlaybackRate);
    (0, import_react2.useEffect)(() => {
      setCurrentPlaybackRate(playbackRate);
    }, [playbackRate]);
    (0, import_react2.useImperativeHandle)(ref, () => rootRef.current, []);
    const timelineContextValue = (0, import_react2.useMemo)(() => {
      return {
        frame,
        playing,
        rootId,
        playbackRate: currentPlaybackRate,
        imperativePlaying,
        setPlaybackRate: (rate) => {
          setCurrentPlaybackRate(rate);
        },
        audioAndVideoTags
      };
    }, [frame, currentPlaybackRate, playing, rootId]);
    const setTimelineContextValue = (0, import_react2.useMemo)(() => {
      return {
        setFrame,
        setPlaying
      };
    }, [setFrame]);
    if (typeof window !== "undefined") {
      (0, import_react2.useLayoutEffect)(() => {
        Internals.CSSUtils.injectCSS(Internals.CSSUtils.makeDefaultCSS(`.${PLAYER_CSS_CLASSNAME}`, "#fff"));
      }, []);
    }
    const actualInputProps = (0, import_react2.useMemo)(() => inputProps !== null && inputProps !== void 0 ? inputProps : {}, [inputProps]);
    return (0, import_jsx_runtime2.jsx)(Internals.IsPlayerContextProvider, { children: (0, import_jsx_runtime2.jsx)(SharedPlayerContexts, { timelineContext: timelineContextValue, component, compositionHeight, compositionWidth, durationInFrames, fps, numberOfSharedAudioTags, initiallyMuted, children: (0, import_jsx_runtime2.jsx)(Internals.Timeline.SetTimelineContext.Provider, { value: setTimelineContextValue, children: (0, import_jsx_runtime2.jsx)(PlayerEmitterProvider, { currentPlaybackRate, children: (0, import_jsx_runtime2.jsx)(PlayerUI$1, { ref: rootRef, posterFillMode, renderLoading, autoPlay: Boolean(autoPlay), loop: Boolean(loop), controls: Boolean(controls), errorFallback, style, inputProps: actualInputProps, allowFullscreen: Boolean(allowFullscreen), moveToBeginningWhenEnded: Boolean(moveToBeginningWhenEnded), clickToPlay: typeof clickToPlay === "boolean" ? clickToPlay : Boolean(controls), showVolumeControls: Boolean(showVolumeControls), doubleClickToFullscreen: Boolean(doubleClickToFullscreen), spaceKeyToPlayOrPause: Boolean(spaceKeyToPlayOrPause), playbackRate: currentPlaybackRate, className: className2 !== null && className2 !== void 0 ? className2 : void 0, showPosterWhenUnplayed: Boolean(showPosterWhenUnplayed), showPosterWhenEnded: Boolean(showPosterWhenEnded), showPosterWhenPaused: Boolean(showPosterWhenPaused), showPosterWhenBuffering: Boolean(showPosterWhenBuffering), renderPoster, inFrame: inFrame !== null && inFrame !== void 0 ? inFrame : null, outFrame: outFrame !== null && outFrame !== void 0 ? outFrame : null, initiallyShowControls: initiallyShowControls !== null && initiallyShowControls !== void 0 ? initiallyShowControls : true, renderFullscreen: renderFullscreenButton !== null && renderFullscreenButton !== void 0 ? renderFullscreenButton : null, renderPlayPauseButton: renderPlayPauseButton !== null && renderPlayPauseButton !== void 0 ? renderPlayPauseButton : null, alwaysShowControls, showPlaybackRateControl, bufferStateDelayInMilliseconds: bufferStateDelayInMilliseconds !== null && bufferStateDelayInMilliseconds !== void 0 ? bufferStateDelayInMilliseconds : 300, hideControlsWhenPointerDoesntMove }) }) }) }) });
  };
  var forward$1 = import_react2.forwardRef;
  var Player = forward$1(PlayerFn);
  var useThumbnail = () => {
    const emitter = (0, import_react2.useContext)(ThumbnailEmitterContext);
    if (!emitter) {
      throw new TypeError("Expected Player event emitter context");
    }
    const returnValue = (0, import_react2.useMemo)(() => {
      return {
        emitter
      };
    }, [emitter]);
    return returnValue;
  };
  var reactVersion = import_react2.default.version.split(".")[0];
  if (reactVersion === "0") {
    throw new Error(`Version ${reactVersion} of "react" is not supported by Remotion`);
  }
  var doesReactVersionSupportSuspense = parseInt(reactVersion, 10) >= 18;
  var ThumbnailUI = ({ style, inputProps, errorFallback, renderLoading, className: className2 }, ref) => {
    var _a, _b;
    const config = Internals.useUnsafeVideoConfig();
    const video = Internals.useVideo();
    const container2 = (0, import_react2.useRef)(null);
    const canvasSize = useElementSize(container2, {
      triggerOnWindowResize: false,
      shouldApplyCssTransforms: false
    });
    const layout = (0, import_react2.useMemo)(() => {
      if (!config || !canvasSize) {
        return null;
      }
      return calculateCanvasTransformation({
        canvasSize,
        compositionHeight: config.height,
        compositionWidth: config.width,
        previewSize: "auto"
      });
    }, [canvasSize, config]);
    const scale = (_a = layout === null || layout === void 0 ? void 0 : layout.scale) !== null && _a !== void 0 ? _a : 1;
    const thumbnail = useThumbnail();
    useBufferStateEmitter(thumbnail.emitter);
    (0, import_react2.useImperativeHandle)(ref, () => {
      const methods = {
        getContainerNode: () => container2.current,
        getScale: () => scale
      };
      return Object.assign(thumbnail.emitter, methods);
    }, [scale, thumbnail.emitter]);
    const VideoComponent = video ? video.component : null;
    const outerStyle = (0, import_react2.useMemo)(() => {
      return calculateOuterStyle({ config, style, canvasSize });
    }, [canvasSize, config, style]);
    const outer = (0, import_react2.useMemo)(() => {
      return calculateOuter({ config, layout, scale });
    }, [config, layout, scale]);
    const containerStyle2 = (0, import_react2.useMemo)(() => {
      return calculateContainerStyle({
        canvasSize,
        config,
        layout,
        scale
      });
    }, [canvasSize, config, layout, scale]);
    const onError = (0, import_react2.useCallback)((error) => {
      thumbnail.emitter.dispatchError(error);
    }, [thumbnail.emitter]);
    const loadingMarkup = (0, import_react2.useMemo)(() => {
      return renderLoading ? renderLoading({
        height: outerStyle.height,
        width: outerStyle.width,
        isBuffering: false
      }) : null;
    }, [outerStyle.height, outerStyle.width, renderLoading]);
    const currentScaleContext = (0, import_react2.useMemo)(() => {
      return {
        type: "scale",
        scale
      };
    }, [scale]);
    if (!config) {
      return null;
    }
    const content = (0, import_jsx_runtime2.jsx)("div", { style: outer, children: (0, import_jsx_runtime2.jsx)("div", { style: containerStyle2, className: PLAYER_CSS_CLASSNAME, children: VideoComponent ? (0, import_jsx_runtime2.jsx)(ErrorBoundary, { onError, errorFallback, children: (0, import_jsx_runtime2.jsx)(Internals.CurrentScaleContext.Provider, { value: currentScaleContext, children: (0, import_jsx_runtime2.jsx)(VideoComponent, { ...(_b = video === null || video === void 0 ? void 0 : video.props) !== null && _b !== void 0 ? _b : {}, ...inputProps !== null && inputProps !== void 0 ? inputProps : {} }) }) }) : null }) });
    if (IS_NODE && !doesReactVersionSupportSuspense) {
      return (0, import_jsx_runtime2.jsx)("div", { ref: container2, style: outerStyle, className: className2, children: content });
    }
    return (0, import_jsx_runtime2.jsx)("div", { ref: container2, style: outerStyle, className: className2, children: (0, import_jsx_runtime2.jsx)(import_react2.Suspense, { fallback: loadingMarkup, children: content }) });
  };
  var ThumbnailUI$1 = (0, import_react2.forwardRef)(ThumbnailUI);
  var ThumbnailFn = ({ frameToDisplay, style, inputProps, compositionHeight, compositionWidth, durationInFrames, fps, className: className2, errorFallback = () => "\u26A0\uFE0F", renderLoading, ...componentProps }, ref) => {
    if (typeof window !== "undefined") {
      (0, import_react2.useLayoutEffect)(() => {
        window.remotion_isPlayer = true;
      }, []);
    }
    const [thumbnailId] = (0, import_react2.useState)(() => String(random(null)));
    const rootRef = (0, import_react2.useRef)(null);
    const timelineState = (0, import_react2.useMemo)(() => {
      const value = {
        playing: false,
        frame: {
          [PLAYER_COMP_ID]: frameToDisplay
        },
        rootId: thumbnailId,
        imperativePlaying: {
          current: false
        },
        playbackRate: 1,
        setPlaybackRate: () => {
          throw new Error("thumbnail");
        },
        audioAndVideoTags: { current: [] }
      };
      return value;
    }, [frameToDisplay, thumbnailId]);
    (0, import_react2.useImperativeHandle)(ref, () => rootRef.current, []);
    const Component = Internals.useLazyComponent(componentProps);
    const [emitter] = (0, import_react2.useState)(() => new ThumbnailEmitter());
    const passedInputProps = (0, import_react2.useMemo)(() => {
      return inputProps !== null && inputProps !== void 0 ? inputProps : {};
    }, [inputProps]);
    return (0, import_jsx_runtime2.jsx)(Internals.IsPlayerContextProvider, { children: (0, import_jsx_runtime2.jsx)(SharedPlayerContexts, { timelineContext: timelineState, component: Component, compositionHeight, compositionWidth, durationInFrames, fps, numberOfSharedAudioTags: 0, initiallyMuted: true, children: (0, import_jsx_runtime2.jsx)(ThumbnailEmitterContext.Provider, { value: emitter, children: (0, import_jsx_runtime2.jsx)(ThumbnailUI$1, { ref: rootRef, className: className2, errorFallback, inputProps: passedInputProps, renderLoading, style }) }) }) });
  };
  var forward = import_react2.forwardRef;
  var Thumbnail = forward(ThumbnailFn);

  // src/remotion/motadawel/MotadawelComposition.tsx
  var import_react4 = __toESM(require_react());

  // src/remotion/motadawel/types.ts
  var MOTADAWEL_TEXT_PRESETS = {
    dark: { bg: "rgba(0,0,0,0.68)", color: "#ffffff", border: "rgba(255,255,255,0.14)" },
    gold: { bg: "rgba(160,90,0,0.88)", color: "#fff8e0", border: "rgba(255,220,80,0.35)" },
    blue: { bg: "rgba(0,45,130,0.90)", color: "#e8f0ff", border: "rgba(80,140,255,0.35)" },
    red: { bg: "rgba(160,10,10,0.88)", color: "#ffe8e8", border: "rgba(255,80,80,0.35)" },
    orange: { bg: "rgba(230,90,0,0.95)", color: "#ffffff", border: "rgba(255,180,60,0.55)" }
  };

  // src/remotion/VisualEffects.tsx
  var import_react3 = __toESM(require_react());
  var VisualEffects = ({ effects, cinematicBarSize = 6 }) => {
    if (!effects || effects.length === 0)
      return null;
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { pointerEvents: "none", zIndex: 10 } }, effects.includes("dust") && /* @__PURE__ */ import_react3.default.createElement(DustParticles, null), effects.includes("light-leak") && /* @__PURE__ */ import_react3.default.createElement(LightLeaks, null), effects.includes("bokeh") && /* @__PURE__ */ import_react3.default.createElement(BokehEffect, null), effects.includes("scanlines") && /* @__PURE__ */ import_react3.default.createElement(Scanlines, null), effects.includes("grain") && /* @__PURE__ */ import_react3.default.createElement(FilmGrain, null), effects.includes("vignette") && /* @__PURE__ */ import_react3.default.createElement(Vignette, null), effects.includes("cinematic-bars") && /* @__PURE__ */ import_react3.default.createElement(CinematicBars, { barSize: cinematicBarSize }));
  };
  var DustParticles = () => {
    const frame = useCurrentFrame();
    const COUNT = 50;
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const seedX = Math.sin(i * 127.1 + 311.7) * 0.5 + 0.5;
      const seedY = Math.sin(i * 43.3 + 17.9) * 0.5 + 0.5;
      const speed = 0.25 + (Math.sin(i * 7.3) * 0.5 + 0.5) * 0.35;
      const wobble = Math.sin(frame * 0.04 + i * 1.7) * 14;
      const x = (seedX * 1920 + wobble + frame * speed * 0.3) % 1920;
      const rawY = seedY * 1080 - frame * speed % 1080;
      const y = (rawY % 1080 + 1080) % 1080;
      const size = 1.5 + (Math.sin(i * 5.7) * 0.5 + 0.5) * 3;
      const opacity = 0.08 + (Math.sin(i * 2.3 + frame * 0.02) * 0.5 + 0.5) * 0.22;
      const isGolden = i % 4 === 0;
      return { x, y, size, opacity, isGolden };
    });
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, null, /* @__PURE__ */ import_react3.default.createElement("svg", { width: "1920", height: "1080", style: { position: "absolute" } }, particles.map((p, i) => /* @__PURE__ */ import_react3.default.createElement(
      "circle",
      {
        key: i,
        cx: p.x,
        cy: p.y,
        r: p.size,
        fill: p.isGolden ? "#ffd080" : "#ffffff",
        opacity: p.opacity
      }
    ))));
  };
  var LightLeaks = () => {
    const frame = useCurrentFrame();
    const x1 = interpolate(Math.sin(frame * 0.012), [-1, 1], [-200, 100]);
    const y1 = interpolate(Math.cos(frame * 9e-3), [-1, 1], [-150, 50]);
    const op1 = interpolate(Math.sin(frame * 0.018), [-1, 1], [0.08, 0.22]);
    const x2 = interpolate(Math.sin(frame * 0.014 + 2), [-1, 1], [1600, 2e3]);
    const y2 = interpolate(Math.cos(frame * 0.011 + 1), [-1, 1], [700, 1e3]);
    const op2 = interpolate(Math.sin(frame * 0.016 + 1), [-1, 1], [0.05, 0.18]);
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, null, /* @__PURE__ */ import_react3.default.createElement("svg", { width: "1920", height: "1080", style: { position: "absolute" } }, /* @__PURE__ */ import_react3.default.createElement("defs", null, /* @__PURE__ */ import_react3.default.createElement("radialGradient", { id: "lg1", cx: "50%", cy: "50%", r: "50%" }, /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "0%", stopColor: "#ff9900", stopOpacity: "1" }), /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "60%", stopColor: "#ff5500", stopOpacity: "0.4" }), /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "100%", stopColor: "#ff3300", stopOpacity: "0" })), /* @__PURE__ */ import_react3.default.createElement("radialGradient", { id: "lg2", cx: "50%", cy: "50%", r: "50%" }, /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "0%", stopColor: "#ffcc44", stopOpacity: "1" }), /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "70%", stopColor: "#ff8800", stopOpacity: "0.3" }), /* @__PURE__ */ import_react3.default.createElement("stop", { offset: "100%", stopColor: "#ff6600", stopOpacity: "0" }))), /* @__PURE__ */ import_react3.default.createElement(
      "ellipse",
      {
        cx: x1,
        cy: y1,
        rx: 500,
        ry: 380,
        fill: "url(#lg1)",
        opacity: op1,
        style: { mixBlendMode: "screen" }
      }
    ), /* @__PURE__ */ import_react3.default.createElement(
      "ellipse",
      {
        cx: x2,
        cy: y2,
        rx: 420,
        ry: 320,
        fill: "url(#lg2)",
        opacity: op2,
        style: { mixBlendMode: "screen" }
      }
    )));
  };
  var BokehEffect = () => {
    const frame = useCurrentFrame();
    const circles = [
      { baseX: 200, baseY: 200, r: 160, color: "rgba(255,200,80,0.18)", speed: 8e-3, phase: 0 },
      { baseX: 700, baseY: 800, r: 220, color: "rgba(200,150,255,0.12)", speed: 0.011, phase: 1.2 },
      { baseX: 1400, baseY: 150, r: 190, color: "rgba(100,200,255,0.10)", speed: 9e-3, phase: 2.1 },
      { baseX: 1700, baseY: 700, r: 250, color: "rgba(255,160,80,0.14)", speed: 7e-3, phase: 3 },
      { baseX: 960, baseY: 500, r: 130, color: "rgba(255,240,180,0.10)", speed: 0.013, phase: 0.7 },
      { baseX: 400, baseY: 600, r: 170, color: "rgba(180,220,255,0.10)", speed: 0.01, phase: 1.8 }
    ];
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, null, /* @__PURE__ */ import_react3.default.createElement("svg", { width: "1920", height: "1080", style: { position: "absolute" } }, /* @__PURE__ */ import_react3.default.createElement("defs", null, /* @__PURE__ */ import_react3.default.createElement("filter", { id: "bokeh-blur" }, /* @__PURE__ */ import_react3.default.createElement("feGaussianBlur", { stdDeviation: "28" }))), circles.map((c, i) => {
      const dx = Math.sin(frame * c.speed + c.phase) * 60;
      const dy = Math.cos(frame * c.speed + c.phase + 0.5) * 40;
      return /* @__PURE__ */ import_react3.default.createElement(
        "circle",
        {
          key: i,
          cx: c.baseX + dx,
          cy: c.baseY + dy,
          r: c.r,
          fill: c.color,
          filter: "url(#bokeh-blur)",
          style: { mixBlendMode: "screen" }
        }
      );
    })));
  };
  var Scanlines = () => {
    const frame = useCurrentFrame();
    const drift = frame * 0.5 % 10;
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: {
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.25) 50%)",
      backgroundSize: "100% 8px",
      backgroundPosition: `0px ${drift}px`,
      mixBlendMode: "overlay",
      opacity: 0.4
    } });
  };
  var FilmGrain = () => {
    const frame = useCurrentFrame();
    const offset = frame % 10 * 10;
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { overflow: "hidden", mixBlendMode: "overlay", opacity: 0.15 } }, /* @__PURE__ */ import_react3.default.createElement(
      "svg",
      {
        width: "200%",
        height: "200%",
        style: {
          position: "absolute",
          top: "-50%",
          left: "-50%",
          transform: `translate(${offset}px, ${offset}px)`
        }
      },
      /* @__PURE__ */ import_react3.default.createElement("filter", { id: "film-grain" }, /* @__PURE__ */ import_react3.default.createElement("feTurbulence", { type: "fractalNoise", baseFrequency: "0.65", numOctaves: "1", seed: "10" }), /* @__PURE__ */ import_react3.default.createElement("feColorMatrix", { type: "saturate", values: "0" })),
      /* @__PURE__ */ import_react3.default.createElement("rect", { width: "100%", height: "100%", filter: "url(#film-grain)" })
    ));
  };
  var Vignette = () => {
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: {
      background: "radial-gradient(circle, transparent 50%, rgba(0,0,0,0.85) 150%)",
      mixBlendMode: "multiply"
    } });
  };
  var CinematicBars = ({ barSize }) => {
    const heightStr = `${barSize}%`;
    return /* @__PURE__ */ import_react3.default.createElement(AbsoluteFill, { style: { display: "flex", flexDirection: "column", justifyContent: "space-between" } }, /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: "100%", height: heightStr, backgroundColor: "#000" } }), /* @__PURE__ */ import_react3.default.createElement("div", { style: { width: "100%", height: heightStr, backgroundColor: "#000" } }));
  };

  // src/remotion/motadawel/MotadawelComposition.tsx
  var FONT_FAMILY = "AvenirArabic";
  if (typeof document !== "undefined") {
    const fontUrl = staticFile("assets/fonts/alfont_com_AlFont_com_AvenirArabic-Heavy.otf");
    const style = document.createElement("style");
    style.textContent = `
    @font-face {
      font-family: '${FONT_FAMILY}';
      src: url('${fontUrl}') format('opentype');
      font-weight: bold;
      font-style: normal;
      font-display: block;
    }
  `;
    if (!document.head.querySelector('[data-font="AvenirArabic-Motadawel"]')) {
      style.setAttribute("data-font", "AvenirArabic-Motadawel");
      document.head.appendChild(style);
    }
  }
  var TransitionFadeIn = ({ overlap, children }) => {
    const frame = useCurrentFrame();
    const opacity = overlap > 0 ? interpolate(frame, [0, overlap], [0, 1], { extrapolateRight: "clamp" }) : 1;
    return /* @__PURE__ */ import_react4.default.createElement(AbsoluteFill, { style: { opacity } }, children);
  };
  var TYPEWRITER_START = 10;
  var FRAMES_PER_CHAR = 1;
  var CURSOR_BLINK_RATE = 8;
  var isRTL = (s) => /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(s);
  var MotadawelSubtitle = ({ text, bottomOffset, fontSize, preset, animationType = "motion-blur" }) => {
    const frame = useCurrentFrame();
    const { bg, color, border } = MOTADAWEL_TEXT_PRESETS[preset] ?? MOTADAWEL_TEXT_PRESETS.dark;
    const segmenter = import_react4.default.useMemo(() => new Intl.Segmenter("ar", { granularity: "grapheme" }), []);
    const segments = import_react4.default.useMemo(() => Array.from(segmenter.segment(text.normalize("NFC"))).map((s) => s.segment), [text, segmenter]);
    const ENTRY_DUR = 18;
    const isTypewriter = animationType === "typewriter";
    const xOffset = interpolate(frame, [0, 210], [0, 222], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const charsToShow = Math.min(segments.length, Math.max(0, Math.floor((frame - TYPEWRITER_START) / FRAMES_PER_CHAR)));
    const visibleText = isTypewriter ? segments.slice(0, charsToShow).join("") : text;
    const visibleLines = visibleText.split("++").map((l) => l.trim()).filter((l) => l.length > 0);
    const isTyping = isTypewriter && charsToShow < segments.length;
    const cursorOn = isTyping && Math.floor(frame / CURSOR_BLINK_RATE) % 2 === 0;
    const strokeProgress = interpolate(frame, [10, 180], [0, 100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    const strokeHeight = Math.max(3, Math.round(fontSize * 0.07));
    const glassProgress = interpolate(frame, [10, 85], [-120, 200], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    const isVisibleDelay = frame > 10;
    const entryOpacity = interpolate(frame, [10, 10 + ENTRY_DUR], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const vignetteOpacity = isVisibleDelay ? isTypewriter ? Math.min(1, (frame - 10) / 10) : entryOpacity : 0;
    const gradientHeight = Math.max(20, Math.round(bottomOffset / 1080 * 100) + 12);
    return /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, /* @__PURE__ */ import_react4.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: `${gradientHeight}%`,
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)",
          opacity: vignetteOpacity,
          pointerEvents: "none"
        }
      }
    ), /* @__PURE__ */ import_react4.default.createElement(
      "div",
      {
        style: {
          position: "absolute",
          bottom: `${bottomOffset}px`,
          left: "20%",
          width: "max-content",
          maxWidth: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "12px",
          transform: `translateX(${xOffset}px)`
        }
      },
      visibleLines.map((lineText, i) => {
        const lineDelay = isTypewriter ? 10 : 10 + i * 15;
        const lineRelativeFrame = Math.max(0, frame - lineDelay);
        const lineEntryOpacity = interpolate(lineRelativeFrame, [0, ENTRY_DUR], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const lineEntryYOffset = interpolate(lineRelativeFrame, [0, ENTRY_DUR], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const lineEntryBlur = interpolate(lineRelativeFrame, [0, ENTRY_DUR], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const isLineVisibleDelay = lineRelativeFrame > 0;
        const lineOpacity = isLineVisibleDelay ? isTypewriter ? Math.min(1, lineRelativeFrame / 10) : lineEntryOpacity : 0;
        const lineFilter = isTypewriter ? "none" : `blur(${lineEntryBlur}px)`;
        const lineYOffsetAnimated = isTypewriter ? 0 : lineEntryYOffset;
        const isCurrentTypingLine = isTyping && i === visibleLines.length - 1;
        const isRTL_line = isRTL(lineText);
        return /* @__PURE__ */ import_react4.default.createElement(
          "div",
          {
            key: i,
            style: {
              opacity: lineOpacity,
              filter: lineFilter,
              transform: `translateY(${lineYOffsetAnimated}px)`,
              position: "relative",
              overflow: "hidden",
              backgroundColor: bg,
              color,
              padding: `${Math.round(fontSize * 0.15)}px ${Math.round(fontSize * 0.45)}px`,
              borderRadius: "0px",
              fontSize: `${fontSize}px`,
              fontFamily: `'${FONT_FAMILY}', 'Segoe UI', Tahoma, Arial, sans-serif`,
              fontWeight: "bold",
              textAlign: isRTL_line ? "right" : "left",
              maxWidth: "100%",
              lineHeight: 1.4,
              boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
              border: `1px solid ${border}`,
              backdropFilter: "blur(8px)",
              direction: isRTL_line ? "rtl" : "ltr",
              letterSpacing: "0.5px"
            }
          },
          /* @__PURE__ */ import_react4.default.createElement(
            "div",
            {
              style: {
                position: "absolute",
                ...i % 2 === 0 ? { top: 0, right: isRTL_line ? 0 : "auto", left: isRTL_line ? "auto" : 0 } : { bottom: 0, left: isRTL_line ? 0 : "auto", right: isRTL_line ? "auto" : 0 },
                height: `${strokeHeight}px`,
                width: `${strokeProgress}%`,
                backgroundColor: color,
                opacity: 0.85
              }
            }
          ),
          /* @__PURE__ */ import_react4.default.createElement(
            "div",
            {
              style: {
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: "40%",
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                transform: `translateX(${glassProgress}%) skewX(-20deg)`,
                pointerEvents: "none",
                opacity: frame > 85 ? 0 : 1
              }
            }
          ),
          /* @__PURE__ */ import_react4.default.createElement("div", { style: isTypewriter ? { direction: isRTL_line ? "rtl" : "ltr" } : {} }, lineText.trim(), isCurrentTypingLine && cursorOn && /* @__PURE__ */ import_react4.default.createElement("span", { style: { display: "inline-block", width: "3px", height: "0.85em", backgroundColor: color, marginRight: "4px", verticalAlign: "middle", opacity: 0.8 } }))
        );
      })
    ));
  };
  var MotadawelComposition = ({
    introVideoUrl,
    mainVideoUrl,
    frameUrl,
    outroVideoUrl,
    mainText,
    videoScale,
    videoX,
    videoY,
    effects,
    introDurationFrames,
    mainVideoDurationFrames,
    outroDurationFrames,
    textBottomOffset,
    textFontSize,
    textPreset,
    textAnimationType = "motion-blur",
    cinematicBarSize = 6,
    bgMusicUrl,
    bgMusicVolume = 0.25
  }) => {
    const { durationInFrames } = useVideoConfig();
    const hasIntro = !!introVideoUrl && introDurationFrames > 0;
    const hasOutro = !!outroVideoUrl && outroDurationFrames > 0;
    const introFrames = hasIntro ? introDurationFrames : 0;
    const OVERLAP_FRAMES = 25;
    const OUTRO_OVERLAP = 25;
    const introOverlap = hasIntro ? Math.min(OVERLAP_FRAMES, introFrames) : 0;
    const outroOverlap = hasOutro ? Math.min(OUTRO_OVERLAP, outroDurationFrames) : 0;
    const mainStart = hasIntro ? introFrames - introOverlap : 0;
    const mainFrames = mainVideoDurationFrames;
    const outroStart = mainStart + Math.max(0, mainFrames - outroOverlap);
    const outroFrames = hasOutro ? outroDurationFrames : 0;
    const isImageFrame = frameUrl ? /\.(png|gif|jpg|jpeg|webp)$/i.test(frameUrl) : false;
    return /* @__PURE__ */ import_react4.default.createElement(AbsoluteFill, { style: { backgroundColor: "#000", direction: "ltr" } }, hasIntro && /* @__PURE__ */ import_react4.default.createElement(Sequence, { from: 0, durationInFrames: introFrames, layout: "none" }, /* @__PURE__ */ import_react4.default.createElement(AbsoluteFill, null, /* @__PURE__ */ import_react4.default.createElement(
      Video,
      {
        src: introVideoUrl,
        style: { width: "100%", height: "100%", objectFit: "cover" }
      }
    ))), mainFrames > 0 && /* @__PURE__ */ import_react4.default.createElement(Sequence, { from: mainStart, durationInFrames: mainFrames, layout: "none" }, /* @__PURE__ */ import_react4.default.createElement(TransitionFadeIn, { overlap: introOverlap }, bgMusicUrl && /* @__PURE__ */ import_react4.default.createElement(Audio, { src: bgMusicUrl, volume: bgMusicVolume ?? 0.25 }), /* @__PURE__ */ import_react4.default.createElement(AbsoluteFill, { style: { backgroundColor: "#000" } }), /* @__PURE__ */ import_react4.default.createElement(
      AbsoluteFill,
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }
      },
      mainVideoUrl ? /* @__PURE__ */ import_react4.default.createElement(
        Video,
        {
          src: mainVideoUrl,
          style: {
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${videoScale}) translateX(${videoX}px) translateY(${videoY}px)`,
            transformOrigin: "center center"
          }
        }
      ) : null
    ), frameUrl && /* @__PURE__ */ import_react4.default.createElement(AbsoluteFill, { style: { pointerEvents: "none" } }, isImageFrame ? /* @__PURE__ */ import_react4.default.createElement(
      Img,
      {
        src: frameUrl,
        style: { width: "100%", height: "100%", objectFit: "fill" }
      }
    ) : /* @__PURE__ */ import_react4.default.createElement(
      Video,
      {
        src: frameUrl,
        style: { width: "100%", height: "100%", objectFit: "fill" },
        muted: true,
        loop: true
      }
    )), /* @__PURE__ */ import_react4.default.createElement(
      MotadawelSubtitle,
      {
        text: mainText,
        bottomOffset: textBottomOffset,
        fontSize: textFontSize,
        preset: textPreset,
        animationType: textAnimationType
      }
    ))), hasOutro && outroFrames > 0 && /* @__PURE__ */ import_react4.default.createElement(Sequence, { from: outroStart, durationInFrames: outroFrames, layout: "none" }, /* @__PURE__ */ import_react4.default.createElement(TransitionFadeIn, { overlap: outroOverlap }, /* @__PURE__ */ import_react4.default.createElement(AbsoluteFill, null, /* @__PURE__ */ import_react4.default.createElement(
      Video,
      {
        src: outroVideoUrl,
        style: { width: "100%", height: "100%", objectFit: "cover" }
      }
    )))), /* @__PURE__ */ import_react4.default.createElement(VisualEffects, { effects, cinematicBarSize }));
  };

  // desktop-v2/motadawel/preview/player-entry.tsx
  var FPS = 25;
  var PLAYER_STYLE = {
    width: "100%"
  };
  var PLAYER_WRAP_STYLE = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#000"
  };
  var previewRoot = null;
  var previewContainer = null;
  var currentPlayer = null;
  function pushDebugLog(...args) {
    if (typeof window === "undefined")
      return;
    const fn = window.__motadawelDebugPush;
    if (typeof fn === "function")
      fn(...args);
    console.log("[MotadawelPreview]", ...args);
  }
  var PreviewErrorBoundary = class extends import_react5.default.Component {
    constructor() {
      super(...arguments);
      this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
      return { error };
    }
    componentDidCatch(error, info) {
      pushDebugLog("React preview crash", error?.message || String(error), info?.componentStack || "");
    }
    render() {
      if (this.state.error) {
        return /* @__PURE__ */ import_react5.default.createElement(
          "div",
          {
            style: {
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#120000",
              color: "#ffd7d7",
              fontFamily: "Segoe UI, Arial, sans-serif",
              padding: 24,
              textAlign: "left",
              whiteSpace: "pre-wrap",
              direction: "ltr"
            }
          },
          `Preview error:
${this.state.error.message}`
        );
      }
      return this.props.children;
    }
  };
  var currentPayload = {
    inputProps: {
      introVideoUrl: null,
      mainVideoUrl: null,
      frameUrl: null,
      outroVideoUrl: null,
      mainText: "",
      videoScale: 1,
      videoX: 0,
      videoY: 0,
      effects: [],
      introDurationFrames: 0,
      mainVideoDurationFrames: 300,
      outroDurationFrames: 0,
      textBottomOffset: 160,
      textFontSize: 46,
      textPreset: "dark",
      bgMusicUrl: null,
      bgMusicVolume: 0.25
    },
    durationInFrames: 25
  };
  var PreviewApp = ({ payload }) => {
    const playerRef = (0, import_react5.useRef)(null);
    (0, import_react5.useEffect)(() => {
      currentPlayer = playerRef.current;
      return () => {
        if (currentPlayer === playerRef.current) {
          currentPlayer = null;
        }
      };
    }, [payload]);
    (0, import_react5.useEffect)(() => {
      pushDebugLog("Player payload", {
        durationInFrames: payload.durationInFrames,
        inputProps: payload.inputProps
      });
    }, [payload]);
    return /* @__PURE__ */ import_react5.default.createElement(PreviewErrorBoundary, null, /* @__PURE__ */ import_react5.default.createElement("div", { style: PLAYER_WRAP_STYLE }, /* @__PURE__ */ import_react5.default.createElement(
      Player,
      {
        ref: playerRef,
        component: MotadawelComposition,
        inputProps: payload.inputProps,
        durationInFrames: Math.max(25, payload.durationInFrames),
        compositionWidth: 1920,
        compositionHeight: 1080,
        fps: FPS,
        style: PLAYER_STYLE,
        controls: true,
        autoPlay: false,
        loop: true,
        clickToPlay: true,
        doubleClickToFullscreen: true,
        allowFullscreen: true,
        showVolumeControls: true,
        moveToBeginningWhenEnded: true,
        initiallyShowControls: true
      }
    )));
  };
  function renderPreview() {
    if (!previewRoot || !previewContainer) {
      return;
    }
    previewRoot.render(/* @__PURE__ */ import_react5.default.createElement(PreviewApp, { payload: currentPayload }));
  }
  window.DesktopRemotionPreviewMotadawel = {
    mount(container2) {
      pushDebugLog("mount called", { width: container2?.clientWidth, height: container2?.clientHeight });
      if (previewRoot && previewContainer === container2) {
        renderPreview();
        return;
      }
      previewContainer = container2;
      previewRoot = (0, import_client.createRoot)(container2);
      renderPreview();
    },
    update(payload) {
      pushDebugLog("update called", { durationInFrames: payload.durationInFrames, hasMainVideo: !!payload.inputProps.mainVideoUrl, mainVideoUrl: payload.inputProps.mainVideoUrl });
      currentPayload = payload;
      renderPreview();
    },
    seekTo(frame) {
      currentPlayer?.seekTo(frame);
    },
    play() {
      currentPlayer?.play();
    },
    pause() {
      currentPlayer?.pause();
    },
    toggle() {
      currentPlayer?.toggle();
    },
    destroy() {
      currentPlayer = null;
      previewRoot?.unmount();
      previewRoot = null;
      previewContainer = null;
    }
  };
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
