var tf = { exports: {} }, pu = {};
var gv;
function Rb() {
  if (gv) return pu;
  gv = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.fragment");
  function s(c, f, h) {
    var m = null;
    if (h !== void 0 && (m = "" + h), f.key !== void 0 && (m = "" + f.key), "key" in f) {
      h = {};
      for (var p in f)
        p !== "key" && (h[p] = f[p]);
    } else h = f;
    return f = h.ref, {
      $$typeof: a,
      type: c,
      key: m,
      ref: f !== void 0 ? f : null,
      props: h
    };
  }
  return pu.Fragment = l, pu.jsx = s, pu.jsxs = s, pu;
}
var bv;
function Mb() {
  return bv || (bv = 1, tf.exports = Rb()), tf.exports;
}
var o = Mb(), nf = { exports: {} }, fe = {};
var _v;
function Db() {
  if (_v) return fe;
  _v = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), s = /* @__PURE__ */ Symbol.for("react.fragment"), c = /* @__PURE__ */ Symbol.for("react.strict_mode"), f = /* @__PURE__ */ Symbol.for("react.profiler"), h = /* @__PURE__ */ Symbol.for("react.consumer"), m = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), y = /* @__PURE__ */ Symbol.for("react.suspense"), b = /* @__PURE__ */ Symbol.for("react.memo"), S = /* @__PURE__ */ Symbol.for("react.lazy"), g = /* @__PURE__ */ Symbol.for("react.activity"), O = /* @__PURE__ */ Symbol.for("react.view_transition"), U = Symbol.iterator;
  function R(j) {
    return j === null || typeof j != "object" ? null : (j = U && j[U] || j["@@iterator"], typeof j == "function" ? j : null);
  }
  var N = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, A = Object.assign, M = {};
  function Y(j, Q, ne) {
    this.props = j, this.context = Q, this.refs = M, this.updater = ne || N;
  }
  Y.prototype.isReactComponent = {}, Y.prototype.setState = function(j, Q) {
    if (typeof j != "object" && typeof j != "function" && j != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, j, Q, "setState");
  }, Y.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function se() {
  }
  se.prototype = Y.prototype;
  function pe(j, Q, ne) {
    this.props = j, this.context = Q, this.refs = M, this.updater = ne || N;
  }
  var ee = pe.prototype = new se();
  ee.constructor = pe, A(ee, Y.prototype), ee.isPureReactComponent = !0;
  var I = Array.isArray;
  function F() {
  }
  var oe = { H: null, A: null, T: null, S: null }, J = Object.prototype.hasOwnProperty;
  function Ee(j, Q, ne) {
    var $ = ne.ref;
    return {
      $$typeof: a,
      type: j,
      key: Q,
      ref: $ !== void 0 ? $ : null,
      props: ne
    };
  }
  function Be(j, Q) {
    return Ee(j.type, Q, j.props);
  }
  function Ve(j) {
    return typeof j == "object" && j !== null && j.$$typeof === a;
  }
  function wt(j) {
    var Q = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(ne) {
      return Q[ne];
    });
  }
  var ln = /\/+/g;
  function Xe(j, Q) {
    return typeof j == "object" && j !== null && j.key != null ? wt("" + j.key) : Q.toString(36);
  }
  function G(j) {
    switch (j.status) {
      case "fulfilled":
        return j.value;
      case "rejected":
        throw j.reason;
      default:
        switch (typeof j.status == "string" ? j.then(F, F) : (j.status = "pending", j.then(
          function(Q) {
            j.status === "pending" && (j.status = "fulfilled", j.value = Q);
          },
          function(Q) {
            j.status === "pending" && (j.status = "rejected", j.reason = Q);
          }
        )), j.status) {
          case "fulfilled":
            return j.value;
          case "rejected":
            throw j.reason;
        }
    }
    throw j;
  }
  function le(j, Q, ne, $, L) {
    var ce = typeof j;
    (ce === "undefined" || ce === "boolean") && (j = null);
    var de = !1;
    if (j === null) de = !0;
    else
      switch (ce) {
        case "bigint":
        case "string":
        case "number":
          de = !0;
          break;
        case "object":
          switch (j.$$typeof) {
            case a:
            case l:
              de = !0;
              break;
            case S:
              return de = j._init, le(
                de(j._payload),
                Q,
                ne,
                $,
                L
              );
          }
      }
    if (de)
      return L = L(j), de = $ === "" ? "." + Xe(j, 0) : $, I(L) ? (ne = "", de != null && (ne = de.replace(ln, "$&/") + "/"), le(L, Q, ne, "", function(Rt) {
        return Rt;
      })) : L != null && (Ve(L) && (L = Be(
        L,
        ne + (L.key == null || j && j.key === L.key ? "" : ("" + L.key).replace(
          ln,
          "$&/"
        ) + "/") + de
      )), Q.push(L)), 1;
    de = 0;
    var X = $ === "" ? "." : $ + ":";
    if (I(j))
      for (var re = 0; re < j.length; re++)
        $ = j[re], ce = X + Xe($, re), de += le(
          $,
          Q,
          ne,
          ce,
          L
        );
    else if (re = R(j), typeof re == "function")
      for (j = re.call(j), re = 0; !($ = j.next()).done; )
        $ = $.value, ce = X + Xe($, re++), de += le(
          $,
          Q,
          ne,
          ce,
          L
        );
    else if (ce === "object") {
      if (typeof j.then == "function")
        return le(
          G(j),
          Q,
          ne,
          $,
          L
        );
      throw Q = String(j), Error(
        "Objects are not valid as a React child (found: " + (Q === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : Q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return de;
  }
  function te(j, Q, ne) {
    if (j == null) return j;
    var $ = [], L = 0;
    return le(j, $, "", "", function(ce) {
      return Q.call(ne, ce, L++);
    }), $;
  }
  function _e(j) {
    if (j._status === -1) {
      var Q = j._result, ne = Q();
      ne.then(
        function($) {
          (j._status === 0 || j._status === -1) && (j._status = 1, j._result = $, ne.status === void 0 && (ne.status = "fulfilled", ne.value = $));
        },
        function($) {
          (j._status === 0 || j._status === -1) && (j._status = 2, j._result = $, ne.status === void 0 && (ne.status = "rejected", ne.reason = $));
        }
      ), j._status === -1 && (j._status = 0, j._result = ne);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var ye = typeof reportError == "function" ? reportError : function(j) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
        error: j
      });
      if (!window.dispatchEvent(Q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", j);
      return;
    }
    console.error(j);
  };
  function Ae(j) {
    var Q = oe.T, ne = {};
    ne.types = Q !== null ? Q.types : null, oe.T = ne;
    try {
      var $ = j(), L = oe.S;
      L !== null && L(ne, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(F, ye);
    } catch (ce) {
      ye(ce);
    } finally {
      Q !== null && ne.types !== null && (Q.types = ne.types), oe.T = Q;
    }
  }
  function st(j) {
    var Q = oe.T;
    if (Q !== null) {
      var ne = Q.types;
      ne === null ? Q.types = [j] : ne.indexOf(j) === -1 && ne.push(j);
    } else Ae(st.bind(null, j));
  }
  var $t = {
    map: te,
    forEach: function(j, Q, ne) {
      te(
        j,
        function() {
          Q.apply(this, arguments);
        },
        ne
      );
    },
    count: function(j) {
      var Q = 0;
      return te(j, function() {
        Q++;
      }), Q;
    },
    toArray: function(j) {
      return te(j, function(Q) {
        return Q;
      }) || [];
    },
    only: function(j) {
      if (!Ve(j))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return j;
    }
  };
  return fe.Activity = g, fe.Children = $t, fe.Component = Y, fe.Fragment = s, fe.Profiler = f, fe.PureComponent = pe, fe.StrictMode = c, fe.Suspense = y, fe.ViewTransition = O, fe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = oe, fe.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(j) {
      return oe.H.useMemoCache(j);
    }
  }, fe.addTransitionType = st, fe.cache = function(j) {
    return function() {
      return j.apply(null, arguments);
    };
  }, fe.cacheSignal = function() {
    return null;
  }, fe.cloneElement = function(j, Q, ne) {
    if (j == null)
      throw Error(
        "The argument must be a React element, but you passed " + j + "."
      );
    var $ = A({}, j.props), L = j.key;
    if (Q != null)
      for (ce in Q.key !== void 0 && (L = "" + Q.key), Q)
        !J.call(Q, ce) || ce === "key" || ce === "__self" || ce === "__source" || ce === "ref" && Q.ref === void 0 || ($[ce] = Q[ce]);
    var ce = arguments.length - 2;
    if (ce === 1) $.children = ne;
    else if (1 < ce) {
      for (var de = Array(ce), X = 0; X < ce; X++)
        de[X] = arguments[X + 2];
      $.children = de;
    }
    return Ee(j.type, L, $);
  }, fe.createContext = function(j) {
    return j = {
      $$typeof: m,
      _currentValue: j,
      _currentValue2: j,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, j.Provider = j, j.Consumer = {
      $$typeof: h,
      _context: j
    }, j;
  }, fe.createElement = function(j, Q, ne) {
    var $, L = {}, ce = null;
    if (Q != null)
      for ($ in Q.key !== void 0 && (ce = "" + Q.key), Q)
        J.call(Q, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (L[$] = Q[$]);
    var de = arguments.length - 2;
    if (de === 1) L.children = ne;
    else if (1 < de) {
      for (var X = Array(de), re = 0; re < de; re++)
        X[re] = arguments[re + 2];
      L.children = X;
    }
    if (j && j.defaultProps)
      for ($ in de = j.defaultProps, de)
        L[$] === void 0 && (L[$] = de[$]);
    return Ee(j, ce, L);
  }, fe.createRef = function() {
    return { current: null };
  }, fe.forwardRef = function(j) {
    return { $$typeof: p, render: j };
  }, fe.isValidElement = Ve, fe.lazy = function(j) {
    return {
      $$typeof: S,
      _payload: { _status: -1, _result: j },
      _init: _e
    };
  }, fe.memo = function(j, Q) {
    return {
      $$typeof: b,
      type: j,
      compare: Q === void 0 ? null : Q
    };
  }, fe.startTransition = Ae, fe.unstable_useCacheRefresh = function() {
    return oe.H.useCacheRefresh();
  }, fe.use = function(j) {
    return oe.H.use(j);
  }, fe.useActionState = function(j, Q, ne) {
    return oe.H.useActionState(j, Q, ne);
  }, fe.useCallback = function(j, Q) {
    return oe.H.useCallback(j, Q);
  }, fe.useContext = function(j) {
    return oe.H.useContext(j);
  }, fe.useDebugValue = function() {
  }, fe.useDeferredValue = function(j, Q) {
    return oe.H.useDeferredValue(j, Q);
  }, fe.useEffect = function(j, Q) {
    return oe.H.useEffect(j, Q);
  }, fe.useEffectEvent = function(j) {
    return oe.H.useEffectEvent(j);
  }, fe.useId = function() {
    return oe.H.useId();
  }, fe.useImperativeHandle = function(j, Q, ne) {
    return oe.H.useImperativeHandle(j, Q, ne);
  }, fe.useInsertionEffect = function(j, Q) {
    return oe.H.useInsertionEffect(j, Q);
  }, fe.useLayoutEffect = function(j, Q) {
    return oe.H.useLayoutEffect(j, Q);
  }, fe.useMemo = function(j, Q) {
    return oe.H.useMemo(j, Q);
  }, fe.useOptimistic = function(j, Q) {
    return oe.H.useOptimistic(j, Q);
  }, fe.useReducer = function(j, Q, ne) {
    return oe.H.useReducer(j, Q, ne);
  }, fe.useRef = function(j) {
    return oe.H.useRef(j);
  }, fe.useState = function(j) {
    return oe.H.useState(j);
  }, fe.useSyncExternalStore = function(j, Q, ne) {
    return oe.H.useSyncExternalStore(
      j,
      Q,
      ne
    );
  }, fe.useTransition = function() {
    return oe.H.useTransition();
  }, fe.version = "19.3.0", fe;
}
var Sv;
function wf() {
  return Sv || (Sv = 1, nf.exports = Db()), nf.exports;
}
var H = wf(), af = { exports: {} }, vu = {}, lf = { exports: {} }, uf = {};
var xv;
function Ub() {
  return xv || (xv = 1, (function(a) {
    function l(G, le) {
      var te = G.length;
      G.push(le);
      e: for (; 0 < te; ) {
        var _e = te - 1 >>> 1, ye = G[_e];
        if (0 < f(ye, le))
          G[_e] = le, G[te] = ye, te = _e;
        else break e;
      }
    }
    function s(G) {
      return G.length === 0 ? null : G[0];
    }
    function c(G) {
      if (G.length === 0) return null;
      var le = G[0], te = G.pop();
      if (te !== le) {
        G[0] = te;
        e: for (var _e = 0, ye = G.length, Ae = ye >>> 1; _e < Ae; ) {
          var st = 2 * (_e + 1) - 1, $t = G[st], j = st + 1, Q = G[j];
          if (0 > f($t, te))
            j < ye && 0 > f(Q, $t) ? (G[_e] = Q, G[j] = te, _e = j) : (G[_e] = $t, G[st] = te, _e = st);
          else if (j < ye && 0 > f(Q, te))
            G[_e] = Q, G[j] = te, _e = j;
          else break e;
        }
      }
      return le;
    }
    function f(G, le) {
      var te = G.sortIndex - le.sortIndex;
      return te !== 0 ? te : G.id - le.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      a.unstable_now = function() {
        return h.now();
      };
    } else {
      var m = Date, p = m.now();
      a.unstable_now = function() {
        return m.now() - p;
      };
    }
    var y = [], b = [], S = 1, g = null, O = 3, U = !1, R = !1, N = !1, A = !1, M = typeof setTimeout == "function" ? setTimeout : null, Y = typeof clearTimeout == "function" ? clearTimeout : null, se = typeof setImmediate < "u" ? setImmediate : null;
    function pe(G) {
      for (var le = s(b); le !== null; ) {
        if (le.callback === null) c(b);
        else if (le.startTime <= G)
          c(b), le.sortIndex = le.expirationTime, l(y, le);
        else break;
        le = s(b);
      }
    }
    function ee(G) {
      if (N = !1, pe(G), !R)
        if (s(y) !== null)
          R = !0, I || (I = !0, Ve());
        else {
          var le = s(b);
          le !== null && Xe(ee, le.startTime - G);
        }
    }
    var I = !1, F = -1, oe = 5, J = -1;
    function Ee() {
      return A ? !0 : !(a.unstable_now() - J < oe);
    }
    function Be() {
      if (A = !1, I) {
        var G = a.unstable_now();
        J = G;
        var le = !0;
        try {
          e: {
            R = !1, N && (N = !1, Y(F), F = -1), U = !0;
            var te = O;
            try {
              t: {
                for (pe(G), g = s(y); g !== null && !(g.expirationTime > G && Ee()); ) {
                  var _e = g.callback;
                  if (typeof _e == "function") {
                    g.callback = null, O = g.priorityLevel;
                    var ye = _e(
                      g.expirationTime <= G
                    );
                    if (G = a.unstable_now(), typeof ye == "function") {
                      g.callback = ye, pe(G), le = !0;
                      break t;
                    }
                    g === s(y) && c(y), pe(G);
                  } else c(y);
                  g = s(y);
                }
                if (g !== null) le = !0;
                else {
                  var Ae = s(b);
                  Ae !== null && Xe(
                    ee,
                    Ae.startTime - G
                  ), le = !1;
                }
              }
              break e;
            } finally {
              g = null, O = te, U = !1;
            }
            le = void 0;
          }
        } finally {
          le ? Ve() : I = !1;
        }
      }
    }
    var Ve;
    if (typeof se == "function")
      Ve = function() {
        se(Be);
      };
    else if (typeof MessageChannel < "u") {
      var wt = new MessageChannel(), ln = wt.port2;
      wt.port1.onmessage = Be, Ve = function() {
        ln.postMessage(null);
      };
    } else
      Ve = function() {
        M(Be, 0);
      };
    function Xe(G, le) {
      F = M(function() {
        G(a.unstable_now());
      }, le);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(G) {
      G.callback = null;
    }, a.unstable_forceFrameRate = function(G) {
      0 > G || 125 < G ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : oe = 0 < G ? Math.floor(1e3 / G) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return O;
    }, a.unstable_next = function(G) {
      switch (O) {
        case 1:
        case 2:
        case 3:
          var le = 3;
          break;
        default:
          le = O;
      }
      var te = O;
      O = le;
      try {
        return G();
      } finally {
        O = te;
      }
    }, a.unstable_requestPaint = function() {
      A = !0;
    }, a.unstable_runWithPriority = function(G, le) {
      switch (G) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          G = 3;
      }
      var te = O;
      O = G;
      try {
        return le();
      } finally {
        O = te;
      }
    }, a.unstable_scheduleCallback = function(G, le, te) {
      var _e = a.unstable_now();
      switch (typeof te == "object" && te !== null ? (te = te.delay, te = typeof te == "number" && 0 < te ? _e + te : _e) : te = _e, G) {
        case 1:
          var ye = -1;
          break;
        case 2:
          ye = 250;
          break;
        case 5:
          ye = 1073741823;
          break;
        case 4:
          ye = 1e4;
          break;
        default:
          ye = 5e3;
      }
      return ye = te + ye, G = {
        id: S++,
        callback: le,
        priorityLevel: G,
        startTime: te,
        expirationTime: ye,
        sortIndex: -1
      }, te > _e ? (G.sortIndex = te, l(b, G), s(y) === null && G === s(b) && (N ? (Y(F), F = -1) : N = !0, Xe(ee, te - _e))) : (G.sortIndex = ye, l(y, G), R || U || (R = !0, I || (I = !0, Ve()))), G;
    }, a.unstable_shouldYield = Ee, a.unstable_wrapCallback = function(G) {
      var le = O;
      return function() {
        var te = O;
        O = le;
        try {
          return G.apply(this, arguments);
        } finally {
          O = te;
        }
      };
    };
  })(uf)), uf;
}
var jv;
function qb() {
  return jv || (jv = 1, lf.exports = Ub()), lf.exports;
}
var sf = { exports: {} }, St = {};
var Ov;
function Zb() {
  if (Ov) return St;
  Ov = 1;
  var a = wf();
  function l(S) {
    var g = "https://react.dev/errors/" + S;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var O = 2; O < arguments.length; O++)
        g += "&args[]=" + encodeURIComponent(arguments[O]);
    }
    return "Minified React error #" + S + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s() {
  }
  var c = {
    d: {
      f: s,
      r: function() {
        throw Error(l(522));
      },
      D: s,
      C: s,
      L: s,
      m: s,
      X: s,
      S: s,
      M: s
    },
    p: 0,
    findDOMNode: null
  }, f = /* @__PURE__ */ Symbol.for("react.portal"), h = /* @__PURE__ */ Symbol.for("react.recoverable"), m = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function p(S, g, O) {
    var U = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: U == null ? null : U === m ? m : "" + U,
      children: S,
      containerInfo: g,
      implementation: O
    };
  }
  var y = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function b(S, g) {
    if (S === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return St.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c, St.browser = function(S) {
    return { $$typeof: h, _reason: S };
  }, St.createPortal = function(S, g) {
    var O = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(l(299));
    return p(S, g, null, O);
  }, St.flushSync = function(S) {
    var g = y.T, O = c.p;
    try {
      if (y.T = null, c.p = 2, S) return S();
    } finally {
      y.T = g, c.p = O, c.d.f();
    }
  }, St.preconnect = function(S, g) {
    typeof S == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, c.d.C(S, g));
  }, St.prefetchDNS = function(S) {
    typeof S == "string" && c.d.D(S);
  }, St.preinit = function(S, g) {
    if (typeof S == "string" && g && typeof g.as == "string") {
      var O = g.as, U = b(O, g.crossOrigin), R = typeof g.integrity == "string" ? g.integrity : void 0, N = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      O === "style" ? c.d.S(
        S,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: U,
          integrity: R,
          fetchPriority: N
        }
      ) : O === "script" && c.d.X(S, {
        crossOrigin: U,
        integrity: R,
        fetchPriority: N,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, St.preinitModule = function(S, g) {
    if (typeof S == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var O = b(
            g.as,
            g.crossOrigin
          );
          c.d.M(S, {
            crossOrigin: O,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
          });
        }
      } else g == null && c.d.M(S);
  }, St.preload = function(S, g) {
    if (typeof S == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var O = g.as, U = b(O, g.crossOrigin);
      c.d.L(S, O, {
        crossOrigin: U,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, St.preloadModule = function(S, g) {
    if (typeof S == "string")
      if (g) {
        var O = b(g.as, g.crossOrigin);
        c.d.m(S, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: O,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
        });
      } else c.d.m(S);
  }, St.requestFormReset = function(S) {
    c.d.r(S);
  }, St.unstable_batchedUpdates = function(S, g) {
    return S(g);
  }, St.useFormState = function(S, g, O) {
    return y.H.useFormState(S, g, O);
  }, St.useFormStatus = function() {
    return y.H.useHostTransitionStatus();
  }, St.version = "19.3.0", St;
}
var zv;
function _y() {
  if (zv) return sf.exports;
  zv = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), sf.exports = Zb(), sf.exports;
}
var Ev;
function kb() {
  if (Ev) return vu;
  Ev = 1;
  var a = qb(), l = wf(), s = _y();
  function c(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function h(e) {
    for (var t = e, n = t; n && !n.alternate; )
      t = n, (t.flags & 4098) !== 0 && (e = t.return), n = t.return;
    for (; t.return; ) t = t.return;
    return t.tag === 3 ? e : null;
  }
  function m(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (h(e) !== e)
      throw Error(c(188));
  }
  function b(e) {
    var t = e.alternate;
    if (!t) {
      if (t = h(e), t === null) throw Error(c(188));
      return t !== e ? null : e;
    }
    for (var n = e, i = t; ; ) {
      var u = n.return;
      if (u === null) break;
      var r = u.alternate;
      if (r === null) {
        if (i = u.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (u.child === r.child) {
        for (r = u.child; r; ) {
          if (r === n) return y(u), e;
          if (r === i) return y(u), t;
          r = r.sibling;
        }
        throw Error(c(188));
      }
      if (n.return !== i.return) n = u, i = r;
      else {
        for (var d = !1, v = u.child; v; ) {
          if (v === n) {
            d = !0, n = u, i = r;
            break;
          }
          if (v === i) {
            d = !0, i = u, n = r;
            break;
          }
          v = v.sibling;
        }
        if (!d) {
          for (v = r.child; v; ) {
            if (v === n) {
              d = !0, n = r, i = u;
              break;
            }
            if (v === i) {
              d = !0, i = r, n = u;
              break;
            }
            v = v.sibling;
          }
          if (!d) throw Error(c(189));
        }
      }
      if (n.alternate !== i) throw Error(c(190));
    }
    if (n.tag !== 3) throw Error(c(188));
    return n.stateNode.current === n ? e : t;
  }
  function S(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = S(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  function g(e, t, n, i, u, r) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, i, u, r) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && g(
        e.child,
        t,
        n,
        i,
        u,
        r
      ))
        return !0;
      e = e.sibling;
    }
    return !1;
  }
  function O(e) {
    for (e = e.return; e !== null; ) {
      if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
      e = e.return;
    }
    return null;
  }
  function U(e) {
    var t = !1;
    for (e = e.return; e !== null && (e.tag === 4 && (t = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); )
      e = e.return;
    return t;
  }
  function R(e) {
    var t = [null, null], n = O(e);
    return n === null || N(
      t,
      e,
      n.child,
      { foundSelf: !1 }
    ), t;
  }
  function N(e, t, n, i) {
    for (; n !== null; ) {
      if (n === t) i.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (i.foundSelf) return e[1] = n, !0;
        e[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && N(
        e,
        t,
        n.child,
        i
      ))
        return !0;
      n = n.sibling;
    }
    return !1;
  }
  function A(e) {
    switch (e.tag) {
      case 5:
      case 27:
      case 6:
        return e.stateNode;
      case 3:
        return e.stateNode.containerInfo;
      default:
        throw Error(c(559));
    }
  }
  var M = null, Y = null;
  function se(e, t, n) {
    return e === n ? !0 : e === t ? (M = e, !0) : !1;
  }
  function pe(e, t, n) {
    return e === n ? (Y = e, !1) : e === t ? (Y !== null && (M = e), !0) : !1;
  }
  function ee(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function I(e, t, n) {
    for (var i = 0, u = e; u; u = n(u)) i++;
    u = 0;
    for (var r = t; r; r = n(r)) u++;
    for (; 0 < i - u; ) e = n(e), i--;
    for (; 0 < u - i; ) t = n(t), u--;
    for (; i--; ) {
      if (e === t || t !== null && e === t.alternate)
        return e;
      e = n(e), t = n(t);
    }
    return null;
  }
  var F = Object.assign, oe = /* @__PURE__ */ Symbol.for("react.element"), J = /* @__PURE__ */ Symbol.for("react.transitional.element"), Ee = /* @__PURE__ */ Symbol.for("react.portal"), Be = /* @__PURE__ */ Symbol.for("react.fragment"), Ve = /* @__PURE__ */ Symbol.for("react.strict_mode"), wt = /* @__PURE__ */ Symbol.for("react.profiler"), ln = /* @__PURE__ */ Symbol.for("react.consumer"), Xe = /* @__PURE__ */ Symbol.for("react.context"), G = /* @__PURE__ */ Symbol.for("react.forward_ref"), le = /* @__PURE__ */ Symbol.for("react.suspense"), te = /* @__PURE__ */ Symbol.for("react.suspense_list"), _e = /* @__PURE__ */ Symbol.for("react.memo"), ye = /* @__PURE__ */ Symbol.for("react.lazy"), Ae = /* @__PURE__ */ Symbol.for("react.activity"), st = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), $t = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), j = /* @__PURE__ */ Symbol.for("react.view_transition"), Q = /* @__PURE__ */ Symbol.for("react.recoverable"), ne = Symbol.iterator;
  function $(e) {
    return e === null || typeof e != "object" ? null : (e = ne && e[ne] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var L = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ce(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === L ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Be:
        return "Fragment";
      case wt:
        return "Profiler";
      case Ve:
        return "StrictMode";
      case le:
        return "Suspense";
      case te:
        return "SuspenseList";
      case Ae:
        return "Activity";
      case j:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ee:
          return "Portal";
        case Xe:
          return e.displayName || "Context";
        case ln:
          return (e._context.displayName || "Context") + ".Consumer";
        case G:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case _e:
          return t = e.displayName || null, t !== null ? t : ce(e.type) || "Memo";
        case ye:
          t = e._payload, e = e._init;
          try {
            return ce(e(t));
          } catch {
          }
      }
    return null;
  }
  var de = Array.isArray, X = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, re = s.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Rt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, gn = [], Ln = -1;
  function Mt(e) {
    return { current: e };
  }
  function Ke(e) {
    0 > Ln || (e.current = gn[Ln], gn[Ln] = null, Ln--);
  }
  function Ze(e, t) {
    Ln++, gn[Ln] = e.current, e.current = t;
  }
  var Ot = Mt(null), un = Mt(null), mt = Mt(null), Dt = Mt(null);
  function sa(e, t) {
    switch (Ze(mt, t), Ze(un, e), Ze(Ot, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Tp(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Tp(t), e = Np(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    Ke(Ot), Ze(Ot, e);
  }
  function zn() {
    Ke(Ot), Ke(un), Ke(mt);
  }
  function Ba(e) {
    var t = e.memoizedState;
    t !== null && (sl._currentValue = t.memoizedState, Ze(Dt, e)), t = Ot.current;
    var n = Np(t, e.type);
    t !== n && (Ze(un, e), Ze(Ot, n));
  }
  function bi(e) {
    un.current === e && (Ke(Ot), Ke(un)), Dt.current === e && (Ke(Dt), sl._currentValue = Rt);
  }
  var Sl, Cu;
  function En(e) {
    if (Sl === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        Sl = t && t[1] || "", Cu = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Sl + e + Cu;
  }
  var _i = !1;
  function La(e, t) {
    if (!e || _i) return "";
    _i = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var k = function() {
                throw Error();
              };
              if (Object.defineProperty(k.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(k, []);
                } catch (V) {
                  var z = V;
                }
                Reflect.construct(e, [], k);
              } else {
                try {
                  k.call();
                } catch (V) {
                  z = V;
                }
                k = !1;
                try {
                  var w = Object.getOwnPropertyDescriptor(
                    e.prototype,
                    "props"
                  );
                  Object.defineProperty(e.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), k = !0, new e();
                } finally {
                  k && (w !== void 0 ? Object.defineProperty(e.prototype, "props", w) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (V) {
                z = V;
              }
              (k = e()) && typeof k.catch == "function" && k.catch(function() {
              });
            }
          } catch (V) {
            if (V && z && typeof V.stack == "string")
              return [V.stack, z.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var u = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      u && u.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var r = i.DetermineComponentFrameRoot(), d = r[0], v = r[1];
      if (d && v) {
        var _ = d.split(`
`), T = v.split(`
`);
        for (u = i = 0; i < _.length && !_[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; u < T.length && !T[u].includes(
          "DetermineComponentFrameRoot"
        ); )
          u++;
        if (i === _.length || u === T.length)
          for (i = _.length - 1, u = T.length - 1; 1 <= i && 0 <= u && _[i] !== T[u]; )
            u--;
        for (; 1 <= i && 0 <= u; i--, u--)
          if (_[i] !== T[u]) {
            if (i !== 1 || u !== 1)
              do
                if (i--, u--, 0 > u || _[i] !== T[u]) {
                  var D = `
` + _[i].replace(" at new ", " at ");
                  return e.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", e.displayName)), D;
                }
              while (1 <= i && 0 <= u);
            break;
          }
      }
    } finally {
      _i = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? En(n) : "";
  }
  function q(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return En(e.type);
      case 16:
        return En("Lazy");
      case 13:
        return e.child !== t && t !== null ? En("Suspense Fallback") : En("Suspense");
      case 19:
        return En("SuspenseList");
      case 0:
      case 15:
        return La(e.type, !1);
      case 11:
        return La(e.type.render, !1);
      case 1:
        return La(e.type, !0);
      case 31:
        return En("Activity");
      case 30:
        return En("ViewTransition");
      default:
        return "";
    }
  }
  function P(e) {
    try {
      var t = "", n = null;
      do
        t += q(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var je = Object.prototype.hasOwnProperty, Te = a.unstable_scheduleCallback, Ut = a.unstable_cancelCallback, Er = a.unstable_shouldYield, kg = a.unstable_requestPaint, Gt = a.unstable_now, Hg = a.unstable_getCurrentPriorityLevel, If = a.unstable_ImmediatePriority, Ff = a.unstable_UserBlockingPriority, Au = a.unstable_NormalPriority, Bg = a.unstable_LowPriority, Pf = a.unstable_IdlePriority, Lg = a.log, Qg = a.unstable_setDisableYieldValue, xl = null, Vt = null;
  function ra(e) {
    if (typeof Lg == "function" && Qg(e), Vt && typeof Vt.setStrictMode == "function")
      try {
        Vt.setStrictMode(xl, e);
      } catch {
      }
  }
  var Xt = Math.clz32 ? Math.clz32 : Gg, Yg = Math.log, $g = Math.LN2;
  function Gg(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Yg(e) / $g | 0) | 0;
  }
  var wu = 256, Ru = 262144, Mu = 4194304;
  function Qa(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
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
        return 64;
      case 128:
        return 128;
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
        return e & -e;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Du(e, t, n) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var u = 0, r = e.suspendedLanes, d = e.pingedLanes;
    e = e.warmLanes;
    var v = i & 134217727;
    return v !== 0 ? (i = v & ~r, i !== 0 ? u = Qa(i) : (d &= v, d !== 0 ? u = Qa(d) : n || (n = v & ~e, n !== 0 && (u = Qa(n))))) : (v = i & ~r, v !== 0 ? u = Qa(v) : d !== 0 ? u = Qa(d) : n || (n = i & ~e, n !== 0 && (u = Qa(n)))), u === 0 ? 0 : t !== 0 && t !== u && (t & r) === 0 && (r = u & -u, n = t & -t, r >= n || r === 32 && (n & 4194048) !== 0) ? t : u;
  }
  function jl(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function Wf(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var i = 31 - Xt(n), u = 1 << i;
        t |= e[i], n &= ~u;
      }
    return t;
  }
  function Vg(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
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
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function ed() {
    var e = Mu;
    return Mu <<= 1, (Mu & 62914560) === 0 && (Mu = 4194304), e;
  }
  function Tr(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Ol(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function Xg(e, t, n, i, u, r) {
    var d = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var v = e.entanglements, _ = e.expirationTimes, T = e.hiddenUpdates;
    for (n = d & ~n; 0 < n; ) {
      var D = 31 - Xt(n), k = 1 << D;
      v[D] = 0, _[D] = -1;
      var z = T[D];
      if (z !== null)
        for (T[D] = null, D = 0; D < z.length; D++) {
          var w = z[D];
          w !== null && (w.lane &= -536870913);
        }
      n &= ~k;
    }
    i !== 0 && td(e, i, 0), r !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= r & ~(d & ~t));
  }
  function td(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - Xt(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | n & 261930;
  }
  function nd(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var i = 31 - Xt(n), u = 1 << i;
      u & t | e[i] & t && (e[i] |= t), n &= ~u;
    }
  }
  function ad(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : Nr(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function Nr(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
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
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Cr(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function id() {
    var e = re.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : fv(e.type));
  }
  function ld(e, t) {
    var n = re.p;
    try {
      return re.p = e, t();
    } finally {
      re.p = n;
    }
  }
  var Qn = Math.random().toString(36).slice(2), pt = "__reactFiber$" + Qn, qt = "__reactProps$" + Qn, Si = "__reactContainer$" + Qn, ud = "__reactEvents$" + Qn, Kg = "__reactListeners$" + Qn, Jg = "__reactHandles$" + Qn, sd = "__reactResources$" + Qn, zl = "__reactMarker$" + Qn, Uu = "__reactLoad$" + Qn;
  function qu(e) {
    delete e[pt], delete e[qt], delete e[Kg], delete e[Jg];
  }
  function Ya(e) {
    var t;
    if (t = e[pt]) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Si] || n[pt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = Gp(e); e !== null; ) {
            if (n = e[pt]) return n;
            e = Gp(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function xi(e) {
    if (e = e[pt] || e[Si]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function El(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(c(33));
  }
  function ji(e) {
    var t = e[sd];
    return t || (t = e[sd] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function ot(e) {
    e[zl] = !0;
  }
  function rd(e) {
    e[Uu] = void 0;
  }
  var cd = /* @__PURE__ */ new Set(), od = {};
  function $a(e, t) {
    Oi(e, t), Oi(e + "Capture", t);
  }
  function Oi(e, t) {
    for (od[e] = t, e = 0; e < t.length; e++)
      cd.add(t[e]);
  }
  var Ig = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), fd = {}, dd = {};
  function Fg(e) {
    return je.call(dd, e) ? !0 : je.call(fd, e) ? !1 : Ig.test(e) ? dd[e] = !0 : (fd[e] = !0, !1);
  }
  var Ne = !1;
  function hd() {
    var e = Ne;
    return Ne = !1, e;
  }
  function Zu(e, t, n) {
    if (Fg(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var i = t.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, n);
      }
  }
  function ku(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, n);
    }
  }
  function Yn(e, t, n, i) {
    if (i === null) e.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, i);
    }
  }
  function Kt(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function md(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Pg(e, t, n) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var u = i.get, r = i.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(d) {
          n = "" + d, r.call(this, d);
        }
      }), Object.defineProperty(e, t, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(d) {
          n = "" + d;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function Ar(e) {
    if (!e._valueTracker) {
      var t = md(e) ? "checked" : "value";
      e._valueTracker = Pg(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function pd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), i = "";
    return e && (i = md(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
  }
  var Wg = /[\n"\\]/g;
  function sn(e) {
    return e.replace(
      Wg,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function wr(e, t, n, i, u, r, d, v) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Kt(t)) : e.value !== "" + Kt(t) && (e.value = "" + Kt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? d === "number" && e.value == t ? Rr(e, Kt(e.value)) : Rr(e, Kt(t)) : n != null ? Rr(e, Kt(n)) : i != null && e.removeAttribute("value"), u == null && r != null && (e.defaultChecked = !!r), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), v != null && typeof v != "function" && typeof v != "symbol" && typeof v != "boolean" ? e.name = "" + Kt(v) : e.removeAttribute("name");
  }
  function vd(e, t, n, i, u, r, d, v) {
    if (r != null && typeof r != "function" && typeof r != "symbol" && typeof r != "boolean" && (e.type = r), t != null || n != null) {
      if (!(r !== "submit" && r !== "reset" || t != null)) {
        Ar(e);
        return;
      }
      n = n != null ? "" + Kt(n) : "", t = t != null ? "" + Kt(t) : n, v || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? u, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = v ? e.checked : !!i, e.defaultChecked = !!i, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d), Ar(e);
  }
  function Rr(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function zi(e, t, n, i) {
    if (e = e.options, t) {
      t = {};
      for (var u = 0; u < n.length; u++)
        t["$" + n[u]] = !0;
      for (n = 0; n < e.length; n++)
        u = t.hasOwnProperty("$" + e[n].value), e[n].selected !== u && (e[n].selected = u), u && i && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + Kt(n), t = null, u = 0; u < e.length; u++) {
        if (e[u].value === n) {
          e[u].selected = !0, i && (e[u].defaultSelected = !0);
          return;
        }
        t !== null || e[u].disabled || (t = e[u]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function yd(e, t, n) {
    if (t != null && (t = "" + Kt(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + Kt(n) : "";
  }
  function gd(e, t, n, i) {
    if (t == null) {
      if (i != null) {
        if (n != null) throw Error(c(92));
        if (de(i)) {
          if (1 < i.length) throw Error(c(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), t = n;
    }
    n = Kt(t), e.defaultValue = n, i = e.textContent, i === n && i !== "" && i !== null && (e.value = i), Ar(e);
  }
  function Ei(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var e0 = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function bd(e, t, n) {
    var i = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, n) : typeof n != "number" || n === 0 || e0.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function _d(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "", Ne = !0);
      for (var u in t)
        i = t[u], t.hasOwnProperty(u) && n[u] !== i && (bd(e, u, i), Ne = !0);
    } else
      for (var r in t)
        t.hasOwnProperty(r) && bd(e, r, t[r]);
  }
  function Mr(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var t0 = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), n0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Hu(e) {
    return n0.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Tn() {
  }
  var Dr = null;
  function Ur(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var Ti = null, Ni = null;
  function Sd(e) {
    var t = xi(e);
    if (t && (e = t.stateNode)) {
      var n = e[qt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (wr(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + sn(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var i = n[t];
              if (i !== e && i.form === e.form) {
                var u = i[qt] || null;
                if (!u) throw Error(c(90));
                wr(
                  i,
                  u.value,
                  u.defaultValue,
                  u.defaultValue,
                  u.checked,
                  u.defaultChecked,
                  u.type,
                  u.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              i = n[t], i.form === e.form && pd(i);
          }
          break e;
        case "textarea":
          yd(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && zi(e, !!n.multiple, t, !1);
      }
    }
  }
  var qr = !1;
  function xd(e, t, n) {
    if (qr) return e(t, n);
    qr = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (qr = !1, (Ti !== null || Ni !== null) && (Hs(), Ti && (t = Ti, e = Ni, Ni = Ti = null, Sd(t), e)))
        for (t = 0; t < e.length; t++) Sd(e[t]);
    }
  }
  function Tl(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var i = n[qt] || null;
    if (i === null) return null;
    n = i[t];
    e: switch (t) {
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
        (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function")
      throw Error(
        c(231, t, typeof n)
      );
    return n;
  }
  var $n = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Zr = !1;
  if ($n)
    try {
      var Nl = {};
      Object.defineProperty(Nl, "passive", {
        get: function() {
          Zr = !0;
        }
      }), window.addEventListener("test", Nl, Nl), window.removeEventListener("test", Nl, Nl);
    } catch {
      Zr = !1;
    }
  var ca = null, kr = null, Bu = null;
  function jd() {
    if (Bu) return Bu;
    var e, t = kr, n = t.length, i, u = "value" in ca ? ca.value : ca.textContent, r = u.length;
    for (e = 0; e < n && t[e] === u[e]; e++) ;
    var d = n - e;
    for (i = 1; i <= d && t[n - i] === u[r - i]; i++) ;
    return Bu = u.slice(e, 1 < i ? 1 - i : void 0);
  }
  function Lu(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Qu() {
    return !0;
  }
  function Od() {
    return !1;
  }
  function Et(e) {
    function t(n, i, u, r, d) {
      this._reactName = n, this._targetInst = u, this.type = i, this.nativeEvent = r, this.target = d, this.currentTarget = null;
      for (var v in e)
        e.hasOwnProperty(v) && (n = e[v], this[v] = n ? n(r) : r[v]);
      return this.isDefaultPrevented = (r.defaultPrevented != null ? r.defaultPrevented : r.returnValue === !1) ? Qu : Od, this.isPropagationStopped = Od, this;
    }
    return F(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Qu);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Qu);
      },
      persist: function() {
      },
      isPersistent: Qu
    }), t;
  }
  var oa = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Yu = Et(oa), Cl = F({}, oa, { view: 0, detail: 0 }), a0 = Et(Cl), Hr, Br, Al, $u = F({}, Cl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Qr,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== Al && (Al && e.type === "mousemove" ? (Hr = e.screenX - Al.screenX, Br = e.screenY - Al.screenY) : Br = Hr = 0, Al = e), Hr);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Br;
    }
  }), zd = Et($u), i0 = F({}, $u, { dataTransfer: 0 }), l0 = Et(i0), u0 = F({}, Cl, { relatedTarget: 0 }), Lr = Et(u0), s0 = F({}, oa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), r0 = Et(s0), c0 = F({}, oa, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), o0 = Et(c0), f0 = F({}, oa, { data: 0 }), Ed = Et(f0), d0 = {
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
  }, h0 = {
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
  }, m0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function p0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = m0[e]) ? !!t[e] : !1;
  }
  function Qr() {
    return p0;
  }
  var v0 = F({}, Cl, {
    key: function(e) {
      if (e.key) {
        var t = d0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Lu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? h0[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Qr,
    charCode: function(e) {
      return e.type === "keypress" ? Lu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Lu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), y0 = Et(v0), g0 = F({}, $u, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Td = Et(g0), b0 = F({}, oa, { submitter: 0 }), _0 = Et(b0), S0 = F({}, Cl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Qr
  }), x0 = Et(S0), j0 = F({}, oa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), O0 = Et(j0), z0 = F({}, $u, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), E0 = Et(z0), T0 = F({}, oa, {
    newState: 0,
    oldState: 0,
    source: 0
  }), N0 = Et(T0), C0 = [9, 13, 27, 32], Yr = $n && "CompositionEvent" in window, wl = null;
  $n && "documentMode" in document && (wl = document.documentMode);
  var A0 = $n && "TextEvent" in window && !wl, Nd = $n && (!Yr || wl && 8 < wl && 11 >= wl), Cd = " ", Ad = !1;
  function wd(e, t) {
    switch (e) {
      case "keyup":
        return C0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Rd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ci = !1;
  function w0(e, t) {
    switch (e) {
      case "compositionend":
        return Rd(t);
      case "keypress":
        return t.which !== 32 ? null : (Ad = !0, Cd);
      case "textInput":
        return e = t.data, e === Cd && Ad ? null : e;
      default:
        return null;
    }
  }
  function R0(e, t) {
    if (Ci)
      return e === "compositionend" || !Yr && wd(e, t) ? (e = jd(), Bu = kr = ca = null, Ci = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return Nd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var M0 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Md(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!M0[e.type] : t === "textarea";
  }
  function Dd(e, t, n, i) {
    Ti ? Ni ? Ni.push(i) : Ni = [i] : Ti = i, t = Gs(t, "onChange"), 0 < t.length && (n = new Yu(
      "onChange",
      "change",
      null,
      n,
      i
    ), e.push({ event: n, listeners: t }));
  }
  var Rl = null, Ml = null;
  function D0(e) {
    Sp(e, 0);
  }
  function Gu(e) {
    var t = El(e);
    if (pd(t)) return e;
  }
  function Ud(e, t) {
    if (e === "change") return t;
  }
  var qd = !1;
  if ($n) {
    var $r;
    if ($n) {
      var Gr = "oninput" in document;
      if (!Gr) {
        var Zd = document.createElement("div");
        Zd.setAttribute("oninput", "return;"), Gr = typeof Zd.oninput == "function";
      }
      $r = Gr;
    } else $r = !1;
    qd = $r && (!document.documentMode || 9 < document.documentMode);
  }
  function kd() {
    Rl && (Rl.detachEvent("onpropertychange", Hd), Ml = Rl = null);
  }
  function Hd(e) {
    if (e.propertyName === "value" && Gu(Ml)) {
      var t = [];
      Dd(
        t,
        Ml,
        e,
        Ur(e)
      ), xd(D0, t);
    }
  }
  function U0(e, t, n) {
    e === "focusin" ? (kd(), Rl = t, Ml = n, Rl.attachEvent("onpropertychange", Hd)) : e === "focusout" && kd();
  }
  function q0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Gu(Ml);
  }
  function Z0(e, t) {
    if (e === "click") return Gu(t);
  }
  function k0(e, t) {
    if (e === "input" || e === "change")
      return Gu(t);
  }
  function H0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Jt = typeof Object.is == "function" ? Object.is : H0;
  function Dl(e, t) {
    if (Jt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), i = Object.keys(t);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var u = n[i];
      if (!je.call(t, u) || !Jt(e[u], t[u]))
        return !1;
    }
    return !0;
  }
  function Vr(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Bd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Ld(e, t) {
    var n = Bd(e);
    e = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (i = e + n.textContent.length, e <= t && i >= t)
          return { node: n, offset: t - e };
        e = i;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Bd(n);
    }
  }
  function Qd(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Qd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Yd(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = Vr(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = Vr(e.document);
    }
    return t;
  }
  function Xr(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var B0 = $n && "documentMode" in document && 11 >= document.documentMode, Ai = null, Kr = null, Ul = null, Jr = !1;
  function $d(e, t, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Jr || Ai == null || Ai !== Vr(i) || (i = Ai, "selectionStart" in i && Xr(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Ul && Dl(Ul, i) || (Ul = i, i = Gs(Kr, "onSelect"), 0 < i.length && (t = new Yu(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: i }), t.target = Ai)));
  }
  function Ga(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var wi = {
    animationend: Ga("Animation", "AnimationEnd"),
    animationiteration: Ga("Animation", "AnimationIteration"),
    animationstart: Ga("Animation", "AnimationStart"),
    transitionrun: Ga("Transition", "TransitionRun"),
    transitionstart: Ga("Transition", "TransitionStart"),
    transitioncancel: Ga("Transition", "TransitionCancel"),
    transitionend: Ga("Transition", "TransitionEnd")
  }, Ir = {}, Gd = {};
  $n && (Gd = document.createElement("div").style, "AnimationEvent" in window || (delete wi.animationend.animation, delete wi.animationiteration.animation, delete wi.animationstart.animation), "TransitionEvent" in window || delete wi.transitionend.transition);
  function Va(e) {
    if (Ir[e]) return Ir[e];
    if (!wi[e]) return e;
    var t = wi[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Gd)
        return Ir[e] = t[n];
    return e;
  }
  var Vd = Va("animationend"), Xd = Va("animationiteration"), Kd = Va("animationstart"), L0 = Va("transitionrun"), Q0 = Va("transitionstart"), Y0 = Va("transitioncancel"), Jd = Va("transitionend"), Id = /* @__PURE__ */ new Map(), Fr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Fr.push("scrollEnd");
  function bn(e, t) {
    Id.set(e, t), $a(t, [e]);
  }
  var $0 = 0;
  function Gn(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = jn.identifierPrefix;
    var n = $0++;
    return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
  }
  function Fd(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, n = Fi;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = e[n[i]];
        if (u != null) {
          if (u === "none") return "none";
          t = t == null ? u : t + (" " + u);
        }
      }
    return t ?? e.default;
  }
  function Vn(e, t) {
    return e = Fd(e), t = Fd(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var Vu = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, rn = [], Ri = 0, Pr = 0;
  function Xu() {
    for (var e = Ri, t = Pr = Ri = 0; t < e; ) {
      var n = rn[t];
      rn[t++] = null;
      var i = rn[t];
      rn[t++] = null;
      var u = rn[t];
      rn[t++] = null;
      var r = rn[t];
      if (rn[t++] = null, i !== null && u !== null) {
        var d = i.pending;
        d === null ? u.next = u : (u.next = d.next, d.next = u), i.pending = u;
      }
      r !== 0 && Pd(n, u, r);
    }
  }
  function Ku(e, t, n, i) {
    rn[Ri++] = e, rn[Ri++] = t, rn[Ri++] = n, rn[Ri++] = i, Pr |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function Wr(e, t, n, i) {
    return Ku(e, t, n, i), Ju(e);
  }
  function Xa(e, t) {
    return Ku(e, null, null, t), Ju(e);
  }
  function Pd(e, t, n) {
    e.lanes |= n;
    var i = e.alternate;
    i !== null && (i.lanes |= n);
    for (var u = !1, r = e.return; r !== null; )
      r.childLanes |= n, i = r.alternate, i !== null && (i.childLanes |= n), r.tag === 22 && (e = r.stateNode, e === null || e._visibility & 1 || (u = !0)), e = r, r = r.return;
    return e.tag === 3 ? (r = e.stateNode, u && t !== null && (u = 31 - Xt(n), e = r.hiddenUpdates, i = e[u], i === null ? e[u] = [t] : i.push(t), t.lane = n | 536870912), r) : null;
  }
  function Ju(e) {
    if (50 < au)
      throw au = 0, ks = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Mi = {};
  function G0(e, t, n, i) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Zt(e, t, n, i) {
    return new G0(e, t, n, i);
  }
  function ec(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Xn(e, t) {
    var n = e.alternate;
    return n === null ? (n = Zt(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function Wd(e, t) {
    e.flags &= 1206910978;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function Iu(e, t, n, i, u, r) {
    var d = 0;
    if (i = e, typeof i == "function") ec(i) && (d = 1);
    else if (typeof i == "string")
      d = bb(
        e,
        n,
        Ot.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (i) {
        case Ae:
          return e = Zt(31, n, t, u), e.elementType = Ae, e.lanes = r, e;
        case Be:
          return Ka(n.children, u, r, t);
        case Ve:
          d = 8, u |= 24;
          break;
        case wt:
          return e = Zt(12, n, t, u | 2), e.elementType = wt, e.lanes = r, e;
        case le:
          return e = Zt(13, n, t, u), e.elementType = le, e.lanes = r, e;
        case te:
          return e = Zt(19, n, t, u), e.elementType = te, e.lanes = r, e;
        case st:
        case j:
          return e = u | 32, e = Zt(30, n, t, e), e.elementType = j, e.lanes = r, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof i == "object" && i !== null)
            switch (i.$$typeof) {
              case Xe:
                d = 10;
                break e;
              case ln:
                d = 9;
                break e;
              case G:
                d = 11;
                break e;
              case _e:
                d = 14;
                break e;
              case ye:
                d = 16, i = null;
                break e;
            }
          d = 29, n = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return t = Zt(d, n, t, u), t.elementType = e, t.type = i, t.lanes = r, t;
  }
  function Ka(e, t, n, i) {
    return e = Zt(7, e, i, t), e.lanes = n, e;
  }
  function tc(e, t, n) {
    return e = Zt(6, e, null, t), e.lanes = n, e;
  }
  function eh(e) {
    var t = Zt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function nc(e, t, n) {
    return t = Zt(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var th = /* @__PURE__ */ new WeakMap();
  function cn(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = th.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: P(t)
      }, th.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: P(t)
    };
  }
  var Di = [], Ui = 0, Fu = null, ql = 0, on = [], fn = 0, fa = null, Nn = 1, Cn = "";
  function Kn(e, t) {
    Di[Ui++] = ql, Di[Ui++] = Fu, Fu = e, ql = t;
  }
  function nh(e, t, n) {
    on[fn++] = Nn, on[fn++] = Cn, on[fn++] = fa, fa = e;
    var i = Nn;
    e = Cn;
    var u = 32 - Xt(i) - 1;
    i &= ~(1 << u), n += 1;
    var r = 32 - Xt(t) + u;
    if (30 < r) {
      var d = u - u % 5;
      r = (i & (1 << d) - 1).toString(32), i >>= d, u -= d, Nn = 1 << 32 - Xt(t) + u | n << u | i, Cn = r + e;
    } else
      Nn = 1 << r | n << u | i, Cn = e;
  }
  function Pu(e) {
    e.return !== null && (Kn(e, 1), nh(e, 1, 0));
  }
  function ac(e) {
    for (; e === Fu; )
      Fu = Di[--Ui], Di[Ui] = null, ql = Di[--Ui], Di[Ui] = null;
    for (; e === fa; )
      fa = on[--fn], on[fn] = null, Cn = on[--fn], on[fn] = null, Nn = on[--fn], on[fn] = null;
  }
  function ah(e, t) {
    on[fn++] = Nn, on[fn++] = Cn, on[fn++] = fa, Nn = t.id, Cn = t.overflow, fa = e;
  }
  var ft = null, Le = null, ve = !1, da = null, dn = !1, ic = Error(c(519));
  function ha(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Zl(cn(t, e)), ic;
  }
  function ih(e) {
    var t = e.stateNode, n = e.type, i = e.memoizedProps;
    switch (t[pt] = e, t[qt] = i, n) {
      case "dialog":
        be("cancel", t), be("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        be("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < lu.length; n++)
          be(lu[n], t);
        break;
      case "source":
        be("error", t);
        break;
      case "img":
      case "image":
      case "link":
        be("error", t), be("load", t);
        break;
      case "details":
        be("toggle", t);
        break;
      case "input":
        be("invalid", t), vd(
          t,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        be("invalid", t);
        break;
      case "textarea":
        be("invalid", t), gd(t, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || i.suppressHydrationWarning === !0 || zp(t.textContent, n) ? (i.popover != null && (be("beforetoggle", t), be("toggle", t)), i.onScroll != null && be("scroll", t), i.onScrollEnd != null && be("scrollend", t), i.onClick != null && (t.onclick = Tn), t = !0) : t = !1, t || ha(e, !0);
  }
  function Wu(e) {
    for (ft = e.return; ft; )
      switch (ft.tag) {
        case 5:
        case 31:
        case 13:
          dn = !1;
          return;
        case 27:
        case 3:
          dn = !0;
          return;
        default:
          ft = ft.return;
      }
  }
  function qi(e) {
    if (e !== ft) return !1;
    if (!ve) return Wu(e), ve = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Uo(e.type, e.memoizedProps)), n = !n), n && Le && ha(e), Wu(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Le = $p(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      Le = $p(e);
    } else
      t === 27 ? (t = Le, Ca(e.type) ? (e = $o, $o = null, Le = e) : Le = t) : Le = ft ? mn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ja() {
    Le = ft = null, ve = !1;
  }
  function lc() {
    var e = da;
    return e !== null && (Bt === null ? Bt = e : Bt.push.apply(
      Bt,
      e
    ), da = null), e;
  }
  function Zl(e) {
    da === null ? da = [e] : da.push(e);
  }
  var uc = Mt(null), Ia = null, Jn = null;
  function ma(e, t, n) {
    Ze(uc, t._currentValue), t._currentValue = n;
  }
  function In(e) {
    e._currentValue = uc.current, Ke(uc);
  }
  function es(e, t, n) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function sc(e, t, n, i) {
    var u = e.child;
    for (u !== null && (u.return = e); u !== null; ) {
      var r = u.dependencies;
      if (r !== null) {
        var d = u.child;
        r = r.firstContext;
        e: for (; r !== null; ) {
          var v = r;
          r = u;
          for (var _ = 0; _ < t.length; _++)
            if (v.context === t[_]) {
              r.lanes |= n, v = r.alternate, v !== null && (v.lanes |= n), es(
                r.return,
                n,
                e
              ), i || (d = null);
              break e;
            }
          r = v.next;
        }
      } else if (u.tag === 18) {
        if (d = u.return, d === null) throw Error(c(341));
        d.lanes |= n, r = d.alternate, r !== null && (r.lanes |= n), es(d, n, e), d = null;
      } else
        u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated === null ? (u.lanes |= n, d = u.alternate, d !== null && (d.lanes |= n), es(
          u.return,
          n,
          e
        ), d = u.child, d = d !== null ? d.sibling : null) : d = u.child;
      if (d !== null) d.return = u;
      else
        for (d = u; d !== null; ) {
          if (d === e) {
            d = null;
            break;
          }
          if (u = d.sibling, u !== null) {
            u.return = d.return, d = u;
            break;
          }
          d = d.return;
        }
      u = d;
    }
  }
  function Fa(e, t, n, i) {
    e = null;
    for (var u = t, r = !1; u !== null; ) {
      if (!r) {
        if ((u.flags & 524288) !== 0) r = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var d = u.alternate;
        if (d === null) throw Error(c(387));
        if (d = d.memoizedProps, d !== null) {
          var v = u.type;
          Jt(u.pendingProps.value, d.value) || (e !== null ? e.push(v) : e = [v]);
        }
      } else if (u === Dt.current) {
        if (d = u.alternate, d === null) throw Error(c(387));
        d.memoizedState.memoizedState !== u.memoizedState.memoizedState && (e !== null ? e.push(sl) : e = [sl]);
      }
      u = u.return;
    }
    return e !== null && sc(
      t,
      e,
      n,
      i
    ), t.flags |= 262144, e !== null;
  }
  function ts(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!Jt(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Pa(e) {
    Ia = e, Jn = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function vt(e) {
    return lh(Ia, e);
  }
  function ns(e, t) {
    return Ia === null && Pa(e), lh(e, t);
  }
  function lh(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Jn === null) {
      if (e === null) throw Error(c(308));
      Jn = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Jn = Jn.next = t;
    return n;
  }
  var V0 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, i) {
        e.push(i);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, X0 = a.unstable_scheduleCallback, K0 = a.unstable_NormalPriority, tt = {
    $$typeof: Xe,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function rc() {
    return {
      controller: new V0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function kl(e) {
    e.refCount--, e.refCount === 0 && X0(K0, function() {
      e.controller.abort();
    });
  }
  function uh(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var n = e.transitionTypes;
      for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var i = t[e];
        n.indexOf(i) === -1 && n.push(i);
      }
    }
  }
  var Hl = null;
  function J0(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var Bl = null, cc = 0, Wa = 0, Zi = null;
  function I0(e, t) {
    if (Bl === null) {
      var n = Bl = [];
      cc = 0, Wa = Eo(), Zi = {
        status: "pending",
        value: void 0,
        then: function(i) {
          n.push(i);
        }
      };
    }
    return cc++, t.then(sh, sh), t;
  }
  function sh() {
    if (--cc === 0 && (Hl = null, Bl !== null)) {
      Zi !== null && (Zi.status = "fulfilled");
      var e = Bl;
      Bl = null, Wa = 0, Zi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function F0(e, t) {
    var n = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(u) {
        n.push(u);
      }
    };
    return e.then(
      function() {
        i.status = "fulfilled", i.value = t;
        for (var u = 0; u < n.length; u++) (0, n[u])(t);
      },
      function(u) {
        for (i.status = "rejected", i.reason = u, u = 0; u < n.length; u++)
          (0, n[u])(void 0);
      }
    ), i;
  }
  var rh = X.S;
  X.S = function(e, t) {
    if (ep = Gt(), typeof t == "object" && t !== null && typeof t.then == "function" && I0(e, t), Hl !== null)
      for (var n = tl; n !== null; )
        uh(n, Hl), n = n.next;
    if (n = e.types, n !== null) {
      for (var i = tl; i !== null; )
        uh(i, n), i = i.next;
      if (Wa !== 0) {
        i = Hl, i === null && (i = Hl = []);
        for (var u = 0; u < n.length; u++) {
          var r = n[u];
          i.indexOf(r) === -1 && i.push(r);
        }
      }
    }
    rh !== null && rh(e, t);
  };
  var ei = Mt(null);
  function oc() {
    var e = ei.current;
    return e !== null ? e : ke.pooledCache;
  }
  function as(e, t) {
    t === null ? Ze(ei, ei.current) : Ze(ei, t.pool);
  }
  function ch() {
    var e = oc();
    return e === null ? null : { parent: tt._currentValue, pool: e };
  }
  var ki = Error(c(460)), fc = Error(c(474)), is = Error(c(542)), ls = { then: function() {
  } };
  function oh(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function fh(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Tn, Tn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, hh(e), e === void 0 && !("reason" in t) ? Error(c(600)) : e;
      default:
        if (typeof t.status == "string") t.then(Tn, Tn);
        else {
          if (e = ke, e !== null && 100 < e.shellSuspendCounter)
            throw Error(c(482));
          e = t, e.status = "pending", e.then(
            function(i) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = i;
              }
            },
            function(i) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = i;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, hh(e), e;
        }
        throw ni = t, ki;
    }
  }
  function ti(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (ni = n, ki) : n;
    }
  }
  var ni = null;
  function dh() {
    if (ni === null) throw Error(c(459));
    var e = ni;
    return ni = null, e;
  }
  function hh(e) {
    if (e === ki || e === is)
      throw Error(c(483));
  }
  var Hi = null, Ll = 0;
  function us(e) {
    var t = Ll;
    return Ll += 1, Hi === null && (Hi = []), fh(Hi, e, t);
  }
  function pa(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function ss(e, t) {
    throw t.$$typeof === oe ? Error(c(525)) : (e = Object.prototype.toString.call(t), Error(
      c(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function mh(e) {
    function t(E, x) {
      if (e) {
        var C = E.deletions;
        C === null ? (E.deletions = [x], E.flags |= 16) : C.push(x);
      }
    }
    function n(E, x) {
      if (!e) return null;
      for (; x !== null; )
        t(E, x), x = x.sibling;
      return null;
    }
    function i(E) {
      for (var x = /* @__PURE__ */ new Map(); E !== null; )
        E.key === null ? x.set(E.index, E) : x.set(E.key, E), E = E.sibling;
      return x;
    }
    function u(E, x) {
      return E = Xn(E, x), E.index = 0, E.sibling = null, E;
    }
    function r(E, x, C) {
      return E.index = C, e ? (C = E.alternate, C !== null ? (C = C.index, C < x ? (E.flags |= 2, x) : C) : (E.flags |= 134217730, x)) : (E.flags |= 1048576, x);
    }
    function d(E) {
      return e && E.alternate === null && (E.flags |= 134217730), E;
    }
    function v(E, x, C, Z) {
      return x === null || x.tag !== 6 ? (x = tc(C, E.mode, Z), x.return = E, x) : (x = u(x, C), x.return = E, x);
    }
    function _(E, x, C, Z) {
      var K = C.type;
      return K === Be ? (E = D(
        E,
        x,
        C.props.children,
        Z,
        C.key
      ), pa(E, C), E) : x !== null && (x.elementType === K || typeof K == "object" && K !== null && K.$$typeof === ye && ti(K) === x.type) ? (x = u(x, C.props), pa(x, C), x.return = E, x) : (x = Iu(
        C.type,
        C.key,
        C.props,
        null,
        E.mode,
        Z
      ), pa(x, C), x.return = E, x);
    }
    function T(E, x, C, Z) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== C.containerInfo || x.stateNode.implementation !== C.implementation ? (x = nc(C, E.mode, Z), x.return = E, x) : (x = u(x, C.children || []), x.return = E, x);
    }
    function D(E, x, C, Z, K) {
      return x === null || x.tag !== 7 ? (x = Ka(
        C,
        E.mode,
        Z,
        K
      ), x.return = E, x) : (x = u(x, C), x.return = E, x);
    }
    function k(E, x, C) {
      if (typeof x == "string" && x !== "" || typeof x == "number" || typeof x == "bigint")
        return x = tc(
          "" + x,
          E.mode,
          C
        ), x.return = E, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case J:
            return C = Iu(
              x.type,
              x.key,
              x.props,
              null,
              E.mode,
              C
            ), pa(C, x), C.return = E, C;
          case Ee:
            return x = nc(
              x,
              E.mode,
              C
            ), x.return = E, x;
          case ye:
            return x = ti(x), k(E, x, C);
        }
        if (de(x) || $(x))
          return x = Ka(
            x,
            E.mode,
            C,
            null
          ), x.return = E, x;
        if (typeof x.then == "function")
          return k(E, us(x), C);
        if (x.$$typeof === Xe)
          return k(
            E,
            ns(E, x),
            C
          );
        ss(E, x);
      }
      return null;
    }
    function z(E, x, C, Z) {
      var K = x !== null ? x.key : null;
      if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint")
        return K !== null ? null : v(E, x, "" + C, Z);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case J:
            return C.key === K ? _(E, x, C, Z) : null;
          case Ee:
            return C.key === K ? T(E, x, C, Z) : null;
          case ye:
            return C = ti(C), z(E, x, C, Z);
        }
        if (de(C) || $(C))
          return K !== null ? null : D(E, x, C, Z, null);
        if (typeof C.then == "function")
          return z(
            E,
            x,
            us(C),
            Z
          );
        if (C.$$typeof === Xe)
          return z(
            E,
            x,
            ns(E, C),
            Z
          );
        ss(E, C);
      }
      return null;
    }
    function w(E, x, C, Z, K) {
      if (typeof Z == "string" && Z !== "" || typeof Z == "number" || typeof Z == "bigint")
        return E = E.get(C) || null, v(x, E, "" + Z, K);
      if (typeof Z == "object" && Z !== null) {
        switch (Z.$$typeof) {
          case J:
            return E = E.get(
              Z.key === null ? C : Z.key
            ) || null, _(x, E, Z, K);
          case Ee:
            return E = E.get(
              Z.key === null ? C : Z.key
            ) || null, T(x, E, Z, K);
          case ye:
            return Z = ti(Z), w(
              E,
              x,
              C,
              Z,
              K
            );
        }
        if (de(Z) || $(Z))
          return E = E.get(C) || null, D(x, E, Z, K, null);
        if (typeof Z.then == "function")
          return w(
            E,
            x,
            C,
            us(Z),
            K
          );
        if (Z.$$typeof === Xe)
          return w(
            E,
            x,
            C,
            ns(x, Z),
            K
          );
        ss(x, Z);
      }
      return null;
    }
    function V(E, x, C, Z) {
      for (var K = null, xe = null, ae = x, ue = x = 0, it = null; ae !== null && ue < C.length; ue++) {
        ae.index > ue ? (it = ae, ae = null) : it = ae.sibling;
        var Oe = z(
          E,
          ae,
          C[ue],
          Z
        );
        if (Oe === null) {
          ae === null && (ae = it);
          break;
        }
        e && ae && Oe.alternate === null && t(E, ae), x = r(Oe, x, ue), xe === null ? K = Oe : xe.sibling = Oe, xe = Oe, ae = it;
      }
      if (ue === C.length)
        return n(E, ae), ve && Kn(E, ue), K;
      if (ae === null) {
        for (; ue < C.length; ue++)
          ae = k(E, C[ue], Z), ae !== null && (x = r(
            ae,
            x,
            ue
          ), xe === null ? K = ae : xe.sibling = ae, xe = ae);
        return ve && Kn(E, ue), K;
      }
      for (ae = i(ae); ue < C.length; ue++)
        it = w(
          ae,
          E,
          ue,
          C[ue],
          Z
        ), it !== null && (e && (Oe = it.alternate, Oe !== null && ae.delete(Oe.key === null ? ue : Oe.key)), x = r(
          it,
          x,
          ue
        ), xe === null ? K = it : xe.sibling = it, xe = it);
      return e && ae.forEach(function(Da) {
        return t(E, Da);
      }), ve && Kn(E, ue), K;
    }
    function W(E, x, C, Z) {
      if (C == null) throw Error(c(151));
      for (var K = null, xe = null, ae = x, ue = x = 0, it = null, Oe = C.next(); ae !== null && !Oe.done; ue++, Oe = C.next()) {
        ae.index > ue ? (it = ae, ae = null) : it = ae.sibling;
        var Da = z(E, ae, Oe.value, Z);
        if (Da === null) {
          ae === null && (ae = it);
          break;
        }
        e && ae && Da.alternate === null && t(E, ae), x = r(Da, x, ue), xe === null ? K = Da : xe.sibling = Da, xe = Da, ae = it;
      }
      if (Oe.done)
        return n(E, ae), ve && Kn(E, ue), K;
      if (ae === null) {
        for (; !Oe.done; ue++, Oe = C.next())
          Oe = k(E, Oe.value, Z), Oe !== null && (x = r(Oe, x, ue), xe === null ? K = Oe : xe.sibling = Oe, xe = Oe);
        return ve && Kn(E, ue), K;
      }
      for (ae = i(ae); !Oe.done; ue++, Oe = C.next())
        Oe = w(ae, E, ue, Oe.value, Z), Oe !== null && (e && (it = Oe.alternate, it !== null && ae.delete(
          it.key === null ? ue : it.key
        )), x = r(Oe, x, ue), xe === null ? K = Oe : xe.sibling = Oe, xe = Oe);
      return e && ae.forEach(function(wb) {
        return t(E, wb);
      }), ve && Kn(E, ue), K;
    }
    function me(E, x, C, Z) {
      if (typeof C == "object" && C !== null && C.type === Be && C.key === null && C.props.ref === void 0 && (C = C.props.children), typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case J:
            e: {
              for (var K = C.key; x !== null; ) {
                if (x.key === K) {
                  if (K = C.type, K === Be) {
                    if (x.tag === 7) {
                      n(
                        E,
                        x.sibling
                      ), Z = u(
                        x,
                        C.props.children
                      ), pa(Z, C), Z.return = E, E = Z;
                      break e;
                    }
                  } else if (x.elementType === K || typeof K == "object" && K !== null && K.$$typeof === ye && ti(K) === x.type) {
                    n(
                      E,
                      x.sibling
                    ), Z = u(x, C.props), pa(Z, C), Z.return = E, E = Z;
                    break e;
                  }
                  n(E, x);
                  break;
                } else t(E, x);
                x = x.sibling;
              }
              C.type === Be ? (Z = Ka(
                C.props.children,
                E.mode,
                Z,
                C.key
              ), pa(Z, C), Z.return = E, E = Z) : (Z = Iu(
                C.type,
                C.key,
                C.props,
                null,
                E.mode,
                Z
              ), pa(Z, C), Z.return = E, E = Z);
            }
            return d(E);
          case Ee:
            e: {
              for (K = C.key; x !== null; ) {
                if (x.key === K)
                  if (x.tag === 4 && x.stateNode.containerInfo === C.containerInfo && x.stateNode.implementation === C.implementation) {
                    n(
                      E,
                      x.sibling
                    ), Z = u(x, C.children || []), Z.return = E, E = Z;
                    break e;
                  } else {
                    n(E, x);
                    break;
                  }
                else t(E, x);
                x = x.sibling;
              }
              Z = nc(C, E.mode, Z), Z.return = E, E = Z;
            }
            return d(E);
          case ye:
            return C = ti(C), me(
              E,
              x,
              C,
              Z
            );
        }
        if (de(C))
          return V(
            E,
            x,
            C,
            Z
          );
        if ($(C)) {
          if (K = $(C), typeof K != "function") throw Error(c(150));
          return C = K.call(C), W(
            E,
            x,
            C,
            Z
          );
        }
        if (typeof C.then == "function")
          return me(
            E,
            x,
            us(C),
            Z
          );
        if (C.$$typeof === Xe)
          return me(
            E,
            x,
            ns(E, C),
            Z
          );
        ss(E, C);
      }
      return typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint" ? (C = "" + C, x !== null && x.tag === 6 ? (n(E, x.sibling), Z = u(x, C), Z.return = E, E = Z) : (n(E, x), Z = tc(C, E.mode, Z), Z.return = E, E = Z), d(E)) : n(E, x);
    }
    return function(E, x, C, Z) {
      try {
        Ll = 0;
        var K = me(
          E,
          x,
          C,
          Z
        );
        return Hi = null, K;
      } catch (ae) {
        if (ae === ki || ae === is) throw ae;
        var xe = Zt(29, ae, null, E.mode);
        return xe.lanes = Z, xe.return = E, xe;
      }
    };
  }
  var ai = mh(!0), ph = mh(!1), va = !1;
  function dc(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function hc(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function ya(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function ga(e, t, n) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Ce & 2) !== 0) {
      var u = i.pending;
      return u === null ? t.next = t : (t.next = u.next, u.next = t), i.pending = t, t = Ju(e), Pd(e, null, n), t;
    }
    return Ku(e, i, t, n), Ju(e);
  }
  function Ql(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, n |= i, t.lanes = n, nd(e, n);
    }
  }
  function mc(e, t) {
    var n = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var u = null, r = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          r === null ? u = r = d : r = r.next = d, n = n.next;
        } while (n !== null);
        r === null ? u = r = t : r = r.next = t;
      } else u = r = t;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: r,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var pc = !1;
  function Yl() {
    if (pc) {
      var e = Zi;
      if (e !== null) throw e;
    }
  }
  function $l(e, t, n, i) {
    pc = !1;
    var u = e.updateQueue;
    va = !1;
    var r = u.firstBaseUpdate, d = u.lastBaseUpdate, v = u.shared.pending;
    if (v !== null) {
      u.shared.pending = null;
      var _ = v, T = _.next;
      _.next = null, d === null ? r = T : d.next = T, d = _;
      var D = e.alternate;
      D !== null && (D = D.updateQueue, v = D.lastBaseUpdate, v !== d && (v === null ? D.firstBaseUpdate = T : v.next = T, D.lastBaseUpdate = _));
    }
    if (r !== null) {
      var k = u.baseState;
      d = 0, D = T = _ = null, v = r;
      do {
        var z = v.lane & -536870913, w = z !== v.lane;
        if (w ? (Se & z) === z : (i & z) === z) {
          z !== 0 && z === Wa && (pc = !0), D !== null && (D = D.next = {
            lane: 0,
            tag: v.tag,
            payload: v.payload,
            callback: null,
            next: null
          });
          e: {
            var V = e, W = v;
            z = t;
            var me = n;
            switch (W.tag) {
              case 1:
                if (V = W.payload, typeof V == "function") {
                  k = V.call(me, k, z);
                  break e;
                }
                k = V;
                break e;
              case 3:
                V.flags = V.flags & -65537 | 128;
              case 0:
                if (V = W.payload, z = typeof V == "function" ? V.call(me, k, z) : V, z == null) break e;
                k = F({}, k, z);
                break e;
              case 2:
                va = !0;
            }
          }
          z = v.callback, z !== null && (e.flags |= 64, w && (e.flags |= 8192), w = u.callbacks, w === null ? u.callbacks = [z] : w.push(z));
        } else
          w = {
            lane: z,
            tag: v.tag,
            payload: v.payload,
            callback: v.callback,
            next: null
          }, D === null ? (T = D = w, _ = k) : D = D.next = w, d |= z;
        if (v = v.next, v === null) {
          if (v = u.shared.pending, v === null)
            break;
          w = v, v = w.next, w.next = null, u.lastBaseUpdate = w, u.shared.pending = null;
        }
      } while (!0);
      D === null && (_ = k), u.baseState = _, u.firstBaseUpdate = T, u.lastBaseUpdate = D, r === null && (u.shared.lanes = 0), za |= d, e.lanes = d, e.memoizedState = k;
    }
  }
  function vh(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function yh(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        vh(n[e], t);
  }
  var ba = Mt(null), rs = Mt(0);
  function gh(e, t) {
    e = ta, Ze(rs, e), Ze(ba, t), ta = e | t.baseLanes;
  }
  function vc() {
    Ze(rs, ta), Ze(ba, ba.current);
  }
  function yc() {
    ta = rs.current, Ke(ba), Ke(rs);
  }
  var yt = Mt(null), zt = null;
  function _a(e) {
    var t = e.alternate;
    Ze(gt, gt.current & 1), Ze(yt, e), zt === null && (t === null || ba.current !== null || t.memoizedState !== null) && (zt = e);
  }
  function gc(e) {
    Ze(gt, gt.current), Ze(yt, e), zt === null && (zt = e);
  }
  function bh(e) {
    e.tag === 22 ? (Ze(gt, gt.current), Ze(yt, e), zt === null && (zt = e)) : Sa();
  }
  function Sa() {
    Ze(gt, gt.current), Ze(yt, yt.current);
  }
  function It(e) {
    Ke(yt), zt === e && (zt = null), Ke(gt);
  }
  var gt = Mt(0);
  function Gl(e, t) {
    Ze(yt, yt.current), Ze(gt, t);
  }
  function bc(e) {
    Ke(gt), Ke(yt), zt === e && (zt = null);
  }
  function cs(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Qo(n) || Yo(n)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Fn = 0, he = null, qe = null, nt = null, os = !1, Bi = !1, ii = !1, fs = 0, Vl = 0, Li = null, P0 = 0;
  function Pe() {
    throw Error(c(321));
  }
  function _c(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Jt(e[n], t[n])) return !1;
    return !0;
  }
  function Sc(e, t, n, i, u, r) {
    return Fn = r, he = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, X.H = e === null || e.memoizedState === null ? nm : am, ii = !1, r = n(i, u), ii = !1, Bi && (r = Sh(
      t,
      n,
      i,
      u
    )), _h(e), r;
  }
  function _h(e) {
    X.H = gs;
    var t = qe !== null && qe.next !== null;
    if (Fn = 0, nt = qe = he = null, os = !1, Vl = 0, Li = null, t) throw Error(c(300));
    e === null || at || (e = e.dependencies, e !== null && ts(e) && (at = !0));
  }
  function Sh(e, t, n, i) {
    he = e;
    var u = 0;
    do {
      if (Bi && (Li = null), Vl = 0, Bi = !1, 25 <= u) throw Error(c(301));
      if (u += 1, nt = qe = null, e.updateQueue != null) {
        var r = e.updateQueue;
        r.lastEffect = null, r.events = null, r.stores = null, r.memoCache != null && (r.memoCache.index = 0);
      }
      X.H = u1, r = t(n, i);
    } while (Bi);
    return r;
  }
  function W0() {
    var e = X.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Xl(t) : t, e = e.useState()[0], (qe !== null ? qe.memoizedState : null) !== e && (he.flags |= 1024), t;
  }
  function xc() {
    var e = fs !== 0;
    return fs = 0, e;
  }
  function jc(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function Oc(e) {
    if (os) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      os = !1;
    }
    Fn = 0, nt = qe = he = null, Bi = !1, Vl = fs = 0, Li = null;
  }
  function Tt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return nt === null ? he.memoizedState = nt = e : nt = nt.next = e, nt;
  }
  function et() {
    if (qe === null) {
      var e = he.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = qe.next;
    var t = nt === null ? he.memoizedState : nt.next;
    if (t !== null)
      nt = t, qe = e;
    else {
      if (e === null)
        throw he.alternate === null ? Error(c(467)) : Error(c(310));
      qe = e, e = {
        memoizedState: qe.memoizedState,
        baseState: qe.baseState,
        baseQueue: qe.baseQueue,
        queue: qe.queue,
        next: null
      }, nt === null ? he.memoizedState = nt = e : nt = nt.next = e;
    }
    return nt;
  }
  function ds() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Xl(e) {
    var t = Vl;
    return Vl += 1, Li === null && (Li = []), e = fh(Li, e, t), t = he, (nt === null ? t.memoizedState : nt.next) === null && (t = t.alternate, X.H = t === null || t.memoizedState === null ? nm : am), e;
  }
  function hs(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Xl(e);
      if (e.$$typeof === Q) return;
      if (e.$$typeof === Xe) return vt(e);
    }
    throw Error(c(438, String(e)));
  }
  function zc(e) {
    var t = null, n = he.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var i = he.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
        data: i.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = ds(), he.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), i = 0; i < e; i++)
        n[i] = $t;
    return t.index++, n;
  }
  function Pn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ms(e) {
    var t = et();
    return Ec(t, qe, e);
  }
  function Ec(e, t, n) {
    var i = e.queue;
    if (i === null) throw Error(c(311));
    i.lastRenderedReducer = n;
    var u = e.baseQueue, r = i.pending;
    if (r !== null) {
      if (u !== null) {
        var d = u.next;
        u.next = r.next, r.next = d;
      }
      t.baseQueue = u = r, i.pending = null;
    }
    if (r = e.baseState, u === null) e.memoizedState = r;
    else {
      t = u.next;
      var v = d = null, _ = null, T = t, D = !1;
      do {
        var k = T.lane & -536870913;
        if (k !== T.lane ? (Se & k) === k : (Fn & k) === k) {
          var z = T.revertLane;
          if (z === 0)
            _ !== null && (_ = _.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }), k === Wa && (D = !0);
          else if ((Fn & z) === z) {
            T = T.next, z === Wa && (D = !0);
            continue;
          } else
            k = {
              lane: 0,
              revertLane: T.revertLane,
              gesture: null,
              action: T.action,
              hasEagerState: T.hasEagerState,
              eagerState: T.eagerState,
              next: null
            }, _ === null ? (v = _ = k, d = r) : _ = _.next = k, he.lanes |= z, za |= z;
          k = T.action, ii && n(r, k), r = T.hasEagerState ? T.eagerState : n(r, k);
        } else
          z = {
            lane: k,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, _ === null ? (v = _ = z, d = r) : _ = _.next = z, he.lanes |= k, za |= k;
        T = T.next;
      } while (T !== null && T !== t);
      if (_ === null ? d = r : _.next = v, !Jt(r, e.memoizedState) && (at = !0, D && (n = Zi, n !== null)))
        throw n;
      e.memoizedState = r, e.baseState = d, e.baseQueue = _, i.lastRenderedState = r;
    }
    return u === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function Tc(e) {
    var t = et(), n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var i = n.dispatch, u = n.pending, r = t.memoizedState;
    if (u !== null) {
      n.pending = null;
      var d = u = u.next;
      do
        r = e(r, d.action), d = d.next;
      while (d !== u);
      Jt(r, t.memoizedState) || (at = !0), t.memoizedState = r, t.baseQueue === null && (t.baseState = r), n.lastRenderedState = r;
    }
    return [r, i];
  }
  function xh(e, t, n) {
    var i = he, u = et(), r = ve;
    if (r) {
      if (n === void 0) throw Error(c(407));
      n = n();
    } else n = t();
    var d = !Jt(
      (qe || u).memoizedState,
      n
    );
    if (d && (u.memoizedState = n, at = !0), u = u.queue, Ac(zh.bind(null, i, u, e), [
      e
    ]), e = u.getSnapshot !== t || d || nt !== null && (nt.memoizedState.tag & 1) !== 0, Qi(
      e ? 9 : 8,
      { destroy: void 0 },
      Oh.bind(null, i, u, n, t),
      null
    ), e) {
      if (i.flags |= 2048, ke === null) throw Error(c(349));
      r || (Fn & 127) !== 0 || jh(i, t, n);
    }
    return n;
  }
  function jh(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = he.updateQueue, t === null ? (t = ds(), he.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Oh(e, t, n, i) {
    t.value = n, t.getSnapshot = i, Eh(t) && Th(e);
  }
  function zh(e, t, n) {
    return n(function() {
      Eh(t) && Th(e);
    });
  }
  function Eh(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !Jt(e, n);
    } catch {
      return !0;
    }
  }
  function Th(e) {
    var t = Xa(e, 2);
    t !== null && Lt(t, e, 2);
  }
  function Nc(e) {
    var t = Tt();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), ii) {
        ra(!0);
        try {
          n();
        } finally {
          ra(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Pn,
      lastRenderedState: e
    }, t;
  }
  function Nh(e, t, n, i) {
    return e.baseState = n, Ec(
      e,
      qe,
      typeof i == "function" ? i : Pn
    );
  }
  function e1(e, t, n, i, u) {
    if (ys(e)) throw Error(c(485));
    if (e = t.action, e !== null) {
      var r = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(d) {
          r.listeners.push(d);
        }
      };
      X.T !== null ? n(!0) : r.isTransition = !1, i(r), n = t.pending, n === null ? (r.next = t.pending = r, Ch(t, r)) : (r.next = n.next, t.pending = n.next = r);
    }
  }
  function Ch(e, t) {
    var n = t.action, i = t.payload, u = e.state;
    if (t.isTransition) {
      var r = X.T, d = {};
      d.types = r !== null ? r.types : null, X.T = d;
      try {
        var v = n(u, i), _ = X.S;
        _ !== null && _(d, v), Ah(e, t, v);
      } catch (T) {
        Cc(e, t, T);
      } finally {
        r !== null && d.types !== null && (r.types = d.types), X.T = r;
      }
    } else
      try {
        r = n(u, i), Ah(e, t, r);
      } catch (T) {
        Cc(e, t, T);
      }
  }
  function Ah(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        wh(e, t, i);
      },
      function(i) {
        return Cc(e, t, i);
      }
    ) : wh(e, t, n);
  }
  function wh(e, t, n) {
    t.status = "fulfilled", t.value = n, Rh(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ch(e, n)));
  }
  function Cc(e, t, n) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = n, Rh(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function Rh(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Mh(e, t) {
    return t;
  }
  function Dh(e, t) {
    if (ve) {
      var n = ke.formState;
      if (n !== null) {
        e: {
          var i = he;
          if (ve) {
            if (Le) {
              t: {
                for (var u = Le, r = dn; u.nodeType !== 8; ) {
                  if (!r) {
                    u = null;
                    break t;
                  }
                  if (u = mn(
                    u.nextSibling
                  ), u === null) {
                    u = null;
                    break t;
                  }
                }
                r = u.data, u = r === "F!" || r === "F" ? u : null;
              }
              if (u) {
                Le = mn(
                  u.nextSibling
                ), i = u.data === "F!";
                break e;
              }
            }
            ha(i);
          }
          i = !1;
        }
        i && (t = n[0]);
      }
    }
    return n = Tt(), n.memoizedState = n.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Mh,
      lastRenderedState: t
    }, n.queue = i, n = Wh.bind(
      null,
      he,
      i
    ), i.dispatch = n, i = Nc(!1), r = Uc.bind(
      null,
      he,
      !1,
      i.queue
    ), i = Tt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = u, n = e1.bind(
      null,
      he,
      u,
      r,
      n
    ), u.dispatch = n, i.memoizedState = e, [t, n, !1];
  }
  function Uh(e) {
    var t = et();
    return qh(t, qe, e);
  }
  function qh(e, t, n) {
    if (t = Ec(
      e,
      t,
      Mh
    )[0], e = ms(Pn)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = Xl(t);
      } catch (d) {
        throw d === ki ? is : d;
      }
    else i = t;
    t = et();
    var u = t.queue, r = u.dispatch;
    return n !== t.memoizedState && (he.flags |= 2048, Qi(
      9,
      { destroy: void 0 },
      t1.bind(null, u, n),
      null
    )), [i, r, e];
  }
  function t1(e, t) {
    e.action = t;
  }
  function Zh(e) {
    var t = et(), n = qe;
    if (n !== null)
      return qh(t, n, e);
    et(), t = t.memoizedState, n = et();
    var i = n.queue.dispatch;
    return n.memoizedState = e, [t, i, !1];
  }
  function Qi(e, t, n, i) {
    return e = { tag: e, create: n, deps: i, inst: t, next: null }, t = he.updateQueue, t === null && (t = ds(), he.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e), e;
  }
  function kh() {
    return et().memoizedState;
  }
  function ps(e, t, n, i) {
    var u = Tt();
    he.flags |= e, u.memoizedState = Qi(
      1 | t,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function vs(e, t, n, i) {
    var u = et();
    i = i === void 0 ? null : i;
    var r = u.memoizedState.inst;
    qe !== null && i !== null && _c(i, qe.memoizedState.deps) ? u.memoizedState = Qi(t, r, n, i) : (he.flags |= e, u.memoizedState = Qi(
      1 | t,
      r,
      n,
      i
    ));
  }
  function Hh(e, t) {
    ps(8390656, 8, e, t);
  }
  function Ac(e, t) {
    vs(2048, 8, e, t);
  }
  function n1(e) {
    he.flags |= 4;
    var t = he.updateQueue;
    if (t === null)
      t = ds(), he.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Bh(e) {
    var t = et().memoizedState;
    return n1({ ref: t, nextImpl: e }), function() {
      if ((Ce & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Lh(e, t) {
    return vs(4, 2, e, t);
  }
  function Qh(e, t) {
    return vs(4, 4, e, t);
  }
  function Yh(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function $h(e, t, n) {
    n = n != null ? n.concat([e]) : null, vs(4, 4, Yh.bind(null, t, e), n);
  }
  function wc() {
  }
  function Gh(e, t) {
    var n = et();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    return t !== null && _c(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
  }
  function Vh(e, t) {
    var n = et();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    if (t !== null && _c(t, i[1]))
      return i[0];
    if (i = e(), ii) {
      ra(!0);
      try {
        e();
      } finally {
        ra(!1);
      }
    }
    return n.memoizedState = [i, t], i;
  }
  function Rc(e, t, n) {
    return n === void 0 || (Fn & 1073741824) !== 0 && (Se & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = np(), he.lanes |= e, za |= e, n);
  }
  function Xh(e, t, n, i) {
    return Jt(n, t) ? n : ba.current !== null ? (e = Rc(e, n, i), Jt(e, t) || (at = !0), e) : (Fn & 106) === 0 || (Fn & 1073741824) !== 0 && (Se & 261930) === 0 ? (at = !0, e.memoizedState = n) : (e = np(), he.lanes |= e, za |= e, t);
  }
  function Kh(e, t, n, i, u) {
    var r = re.p;
    re.p = r !== 0 && 8 > r ? r : 8;
    var d = X.T, v = {};
    v.types = d !== null ? d.types : null, X.T = v, Uc(e, !1, t, n);
    try {
      var _ = u(), T = X.S;
      if (T !== null && T(v, _), _ !== null && typeof _ == "object" && typeof _.then == "function") {
        var D = F0(
          _,
          i
        );
        Kl(
          e,
          t,
          D,
          en(e)
        );
      } else
        Kl(
          e,
          t,
          i,
          en(e)
        );
    } catch (k) {
      Kl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: k },
        en()
      );
    } finally {
      re.p = r, d !== null && v.types !== null && (d.types = v.types), X.T = d;
    }
  }
  function a1() {
  }
  function Mc(e, t, n, i) {
    if (e.tag !== 5) throw Error(c(476));
    var u = Jh(e).queue;
    Kh(
      e,
      u,
      t,
      Rt,
      n === null ? a1 : function() {
        return Ih(e), n(i);
      }
    );
  }
  function Jh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Rt,
      baseState: Rt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pn,
        lastRenderedState: Rt
      },
      next: null
    };
    var n = {};
    return t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pn,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function Ih(e) {
    var t = Jh(e);
    t.next === null && (t = e.alternate.memoizedState), Kl(
      e,
      t.next.queue,
      {},
      en()
    );
  }
  function Dc() {
    return vt(sl);
  }
  function Fh() {
    return et().memoizedState;
  }
  function Ph() {
    return et().memoizedState;
  }
  function i1(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = en();
          e = ya(n);
          var i = ga(t, e, n);
          i !== null && (Lt(i, t, n), Ql(i, t, n)), t = { cache: rc() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function l1(e, t, n) {
    var i = en();
    n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ys(e) ? em(t, n) : (n = Wr(e, t, n, i), n !== null && (Lt(n, e, i), tm(n, t, i)));
  }
  function Wh(e, t, n) {
    var i = en();
    Kl(e, t, n, i);
  }
  function Kl(e, t, n, i) {
    var u = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (ys(e)) em(t, u);
    else {
      var r = e.alternate;
      if (e.lanes === 0 && (r === null || r.lanes === 0) && (r = t.lastRenderedReducer, r !== null))
        try {
          var d = t.lastRenderedState, v = r(d, n);
          if (u.hasEagerState = !0, u.eagerState = v, Jt(v, d))
            return Ku(e, t, u, 0), ke === null && Xu(), !1;
        } catch {
        }
      if (n = Wr(e, t, u, i), n !== null)
        return Lt(n, e, i), tm(n, t, i), !0;
    }
    return !1;
  }
  function Uc(e, t, n, i) {
    if (i = {
      lane: 2,
      revertLane: Eo(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, ys(e)) {
      if (t) throw Error(c(479));
    } else
      t = Wr(
        e,
        n,
        i,
        2
      ), t !== null && Lt(t, e, 2);
  }
  function ys(e) {
    var t = e.alternate;
    return e === he || t !== null && t === he;
  }
  function em(e, t) {
    Bi = os = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function tm(e, t, n) {
    if ((n & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, n |= i, t.lanes = n, nd(e, n);
    }
  }
  var gs = {
    readContext: vt,
    use: hs,
    useCallback: Pe,
    useContext: Pe,
    useEffect: Pe,
    useImperativeHandle: Pe,
    useLayoutEffect: Pe,
    useInsertionEffect: Pe,
    useMemo: Pe,
    useReducer: Pe,
    useRef: Pe,
    useState: Pe,
    useDebugValue: Pe,
    useDeferredValue: Pe,
    useTransition: Pe,
    useSyncExternalStore: Pe,
    useId: Pe,
    useHostTransitionStatus: Pe,
    useFormState: Pe,
    useActionState: Pe,
    useOptimistic: Pe,
    useMemoCache: Pe,
    useCacheRefresh: Pe,
    useEffectEvent: Pe
  }, nm = {
    readContext: vt,
    use: hs,
    useCallback: function(e, t) {
      return Tt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: vt,
    useEffect: Hh,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, ps(
        4194308,
        4,
        Yh.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return ps(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      ps(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = Tt();
      t = t === void 0 ? null : t;
      var i = e();
      if (ii) {
        ra(!0);
        try {
          e();
        } finally {
          ra(!1);
        }
      }
      return n.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, n) {
      var i = Tt();
      if (n !== void 0) {
        var u = n(t);
        if (ii) {
          ra(!0);
          try {
            n(t);
          } finally {
            ra(!1);
          }
        }
      } else u = t;
      return i.memoizedState = i.baseState = u, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      }, i.queue = e, e = e.dispatch = l1.bind(
        null,
        he,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = Tt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Nc(e);
      var t = e.queue, n = Wh.bind(null, he, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: wc,
    useDeferredValue: function(e, t) {
      var n = Tt();
      return Rc(n, e, t);
    },
    useTransition: function() {
      var e = Nc(!1);
      return e = Kh.bind(
        null,
        he,
        e.queue,
        !0,
        !1
      ), Tt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var i = he, u = Tt();
      if (ve) {
        if (n === void 0)
          throw Error(c(407));
        n = n();
      } else {
        if (n = t(), ke === null)
          throw Error(c(349));
        (Se & 127) !== 0 || jh(i, t, n);
      }
      u.memoizedState = n;
      var r = { value: n, getSnapshot: t };
      return u.queue = r, Hh(zh.bind(null, i, r, e), [
        e
      ]), i.flags |= 2048, Qi(
        9,
        { destroy: void 0 },
        Oh.bind(
          null,
          i,
          r,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = Tt(), t = ke.identifierPrefix;
      if (ve) {
        var n = Cn, i = Nn;
        n = (i & ~(1 << 32 - Xt(i) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = fs++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = P0++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: Dc,
    useFormState: Dh,
    useActionState: Dh,
    useOptimistic: function(e) {
      var t = Tt();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = Uc.bind(
        null,
        he,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: zc,
    useCacheRefresh: function() {
      return Tt().memoizedState = i1.bind(
        null,
        he
      );
    },
    useEffectEvent: function(e) {
      var t = Tt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Ce & 2) !== 0)
          throw Error(c(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, am = {
    readContext: vt,
    use: hs,
    useCallback: Gh,
    useContext: vt,
    useEffect: Ac,
    useImperativeHandle: $h,
    useInsertionEffect: Lh,
    useLayoutEffect: Qh,
    useMemo: Vh,
    useReducer: ms,
    useRef: kh,
    useState: function() {
      return ms(Pn);
    },
    useDebugValue: wc,
    useDeferredValue: function(e, t) {
      var n = et();
      return Xh(
        n,
        qe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = ms(Pn)[0], t = et().memoizedState;
      return [
        typeof e == "boolean" ? e : Xl(e),
        t
      ];
    },
    useSyncExternalStore: xh,
    useId: Fh,
    useHostTransitionStatus: Dc,
    useFormState: Uh,
    useActionState: Uh,
    useOptimistic: function(e, t) {
      var n = et();
      return Nh(n, qe, e, t);
    },
    useMemoCache: zc,
    useCacheRefresh: Ph,
    useEffectEvent: Bh
  }, u1 = {
    readContext: vt,
    use: hs,
    useCallback: Gh,
    useContext: vt,
    useEffect: Ac,
    useImperativeHandle: $h,
    useInsertionEffect: Lh,
    useLayoutEffect: Qh,
    useMemo: Vh,
    useReducer: Tc,
    useRef: kh,
    useState: function() {
      return Tc(Pn);
    },
    useDebugValue: wc,
    useDeferredValue: function(e, t) {
      var n = et();
      return qe === null ? Rc(n, e, t) : Xh(
        n,
        qe.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Tc(Pn)[0], t = et().memoizedState;
      return [
        typeof e == "boolean" ? e : Xl(e),
        t
      ];
    },
    useSyncExternalStore: xh,
    useId: Fh,
    useHostTransitionStatus: Dc,
    useFormState: Zh,
    useActionState: Zh,
    useOptimistic: function(e, t) {
      var n = et();
      return qe !== null ? Nh(n, qe, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: zc,
    useCacheRefresh: Ph,
    useEffectEvent: Bh
  };
  function qc(e, t, n, i) {
    t = e.memoizedState, n = n(i, t), n = n == null ? t : F({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var Zc = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var i = en(), u = ya(i);
      u.payload = t, n != null && (u.callback = n), t = ga(e, u, i), t !== null && (Lt(t, e, i), Ql(t, e, i));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var i = en(), u = ya(i);
      u.tag = 1, u.payload = t, n != null && (u.callback = n), t = ga(e, u, i), t !== null && (Lt(t, e, i), Ql(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = en(), i = ya(n);
      i.tag = 2, t != null && (i.callback = t), t = ga(e, i, n), t !== null && (Lt(t, e, n), Ql(t, e, n));
    }
  };
  function im(e, t, n, i, u, r, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, r, d) : t.prototype && t.prototype.isPureReactComponent ? !Dl(n, i) || !Dl(u, r) : !0;
  }
  function lm(e, t, n, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && Zc.enqueueReplaceState(t, t.state, null);
  }
  function li(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var i in t)
        i !== "ref" && (n[i] = t[i]);
    }
    if (e = e.defaultProps) {
      n === t && (n = F({}, n));
      for (var u in e)
        n[u] === void 0 && (n[u] = e[u]);
    }
    return n;
  }
  function um(e) {
    Vu(e);
  }
  function sm(e) {
    console.error(e);
  }
  function rm(e) {
    Vu(e);
  }
  function bs(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function cm(e, t, n) {
    try {
      var i = e.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function kc(e, t, n) {
    return n = ya(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      bs(e, t);
    }, n;
  }
  function om(e) {
    return e = ya(e), e.tag = 3, e;
  }
  function fm(e, t, n, i) {
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var r = i.value;
      e.payload = function() {
        return u(r);
      }, e.callback = function() {
        cm(t, n, i);
      };
    }
    var d = n.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      cm(t, n, i), typeof u != "function" && (Ea === null ? Ea = /* @__PURE__ */ new Set([this]) : Ea.add(this));
      var v = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: v !== null ? v : ""
      });
    });
  }
  function s1(e, t, n, i, u) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = n.alternate, t !== null && Fa(
        t,
        n,
        u,
        !0
      ), n = yt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return zt === null ? Bs() : n.alternate === null && We === 0 && (We = 3), n.flags &= -257, n.flags |= 65536, n.lanes = u, i === ls ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), jo(e, i, u)), !1;
          case 22:
            return n.flags |= 65536, i === ls ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), jo(e, i, u)), !1;
        }
        throw Error(c(435, n.tag));
      }
      return jo(e, i, u), Bs(), !1;
    }
    if (ve)
      return t = yt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, i !== ic && (e = Error(c(422), { cause: i }), Zl(cn(e, n)))) : (i !== ic && (t = Error(c(423), {
        cause: i
      }), Zl(
        cn(t, n)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, i = cn(i, n), u = kc(
        e.stateNode,
        i,
        u
      ), mc(e, u), We !== 4 && (We = 2)), !1;
    var r = Error(c(520), { cause: i });
    if (r = cn(r, n), nu === null ? nu = [r] : nu.push(r), We !== 4 && (We = 2), t === null) return !0;
    i = cn(i, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = u & -u, n.lanes |= e, e = kc(n.stateNode, i, e), mc(n, e), !1;
        case 1:
          if (t = n.type, r = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || r !== null && typeof r.componentDidCatch == "function" && (Ea === null || !Ea.has(r))))
            return n.flags |= 65536, u &= -u, n.lanes |= u, u = om(u), fm(
              u,
              e,
              n,
              i
            ), mc(n, u), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Hc = Error(c(461)), at = !1;
  function rt(e, t, n, i) {
    t.child = e === null ? ph(t, null, n, i) : ai(
      t,
      e.child,
      n,
      i
    );
  }
  function dm(e, t, n, i, u) {
    n = n.render;
    var r = t.ref;
    if ("ref" in i) {
      var d = {};
      for (var v in i)
        v !== "ref" && (d[v] = i[v]);
    } else d = i;
    return Pa(t), i = Sc(
      e,
      t,
      n,
      d,
      r,
      u
    ), v = xc(), e !== null && !at ? (jc(e, t, u), Wn(e, t, u)) : (ve && v && Pu(t), t.flags |= 1, rt(e, t, i, u), t.child);
  }
  function hm(e, t, n, i, u) {
    if (e === null) {
      var r = n.type;
      return typeof r == "function" && !ec(r) && r.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = r, mm(
        e,
        t,
        r,
        i,
        u
      )) : (e = Iu(
        n.type,
        null,
        i,
        t,
        t.mode,
        u
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (r = e.child, !Xc(e, u)) {
      var d = r.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Dl, n(d, i) && e.ref === t.ref)
        return Wn(e, t, u);
    }
    return t.flags |= 1, e = Xn(r, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function mm(e, t, n, i, u) {
    if (e !== null) {
      var r = e.memoizedProps;
      if (Dl(r, i) && e.ref === t.ref)
        if (at = !1, t.pendingProps = i = r, Xc(e, u))
          (e.flags & 131072) !== 0 && (at = !0);
        else
          return t.lanes = e.lanes, Wn(e, t, u);
    }
    return Bc(
      e,
      t,
      n,
      i,
      u
    );
  }
  function pm(e, t, n, i) {
    var u = i.children, r = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (r = r !== null ? r.baseLanes | n : n, e !== null) {
          for (i = t.child = e.child, u = 0; i !== null; )
            u = u | i.lanes | i.childLanes, i = i.sibling;
          i = u & ~r;
        } else i = 0, t.child = null;
        return vm(
          e,
          t,
          r,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && as(
          t,
          r !== null ? r.cachePool : null
        ), r !== null ? gh(t, r) : vc(), bh(t);
      else
        return i = t.lanes = 536870912, vm(
          e,
          t,
          r !== null ? r.baseLanes | n : n,
          n,
          i
        );
    } else
      r !== null ? (as(t, r.cachePool), gh(t, r), Sa(), t.memoizedState = null) : (e !== null && as(t, null), vc(), Sa());
    return rt(e, t, u, n), t.child;
  }
  function Jl(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function vm(e, t, n, i, u) {
    var r = oc();
    return r = r === null ? null : { parent: tt._currentValue, pool: r }, t.memoizedState = {
      baseLanes: n,
      cachePool: r
    }, e !== null && as(t, null), vc(), bh(t), e !== null && Fa(e, t, i, !0), t.childLanes = u, null;
  }
  function _s(e, t) {
    return t = Ss(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function ym(e, t, n) {
    return ai(t, e.child, null, n), e = _s(t, t.pendingProps), e.flags |= 2, It(t), t.memoizedState = null, e;
  }
  function r1(e, t, n) {
    var i = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (ve) {
        if (i.mode === "hidden")
          return e = _s(t, i), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, Jl(null, e);
        if (gc(t), (e = Le) ? (e = Yp(
          e,
          dn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: fa !== null ? { id: Nn, overflow: Cn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = eh(e), n.return = t, t.child = n, ft = t, Le = null)) : e = null, e === null) throw ha(t);
        return t.lanes = 536870912, null;
      }
      return _s(t, i);
    }
    var r = e.memoizedState;
    if (r !== null) {
      var d = r.dehydrated;
      if (gc(t), u)
        if (t.flags & 256)
          t.flags &= -257, t = ym(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(c(558));
      else if (at || Fa(e, t, n, !1), u = (n & e.childLanes) !== 0, at || u) {
        if (ba.current === null) {
          if (i = ke, i !== null && (d = ad(i, n), d !== 0 && d !== r.retryLane))
            throw r.retryLane = d, Xa(e, d), Lt(i, e, d), Hc;
          Bs();
        }
        t = ym(
          e,
          t,
          n
        );
      } else
        e = r.treeContext, Le = mn(d.nextSibling), ft = t, ve = !0, da = null, dn = !1, e !== null && ah(t, e), t = _s(t, i), t.flags |= 134221824;
      return t;
    }
    return e = Xn(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Yi(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(c(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function Bc(e, t, n, i, u) {
    return Pa(t), n = Sc(
      e,
      t,
      n,
      i,
      void 0,
      u
    ), i = xc(), e !== null && !at ? (jc(e, t, u), Wn(e, t, u)) : (ve && i && Pu(t), t.flags |= 1, rt(e, t, n, u), t.child);
  }
  function gm(e, t, n, i, u, r) {
    return Pa(t), t.updateQueue = null, n = Sh(
      t,
      i,
      n,
      u
    ), _h(e), i = xc(), e !== null && !at ? (jc(e, t, r), Wn(e, t, r)) : (ve && i && Pu(t), t.flags |= 1, rt(e, t, n, r), t.child);
  }
  function bm(e, t, n, i, u) {
    if (Pa(t), t.stateNode === null) {
      var r = Mi, d = n.contextType;
      typeof d == "object" && d !== null && (r = vt(d)), r = new n(i, r), t.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Zc, t.stateNode = r, r._reactInternals = t, r = t.stateNode, r.props = i, r.state = t.memoizedState, r.refs = {}, dc(t), d = n.contextType, r.context = typeof d == "object" && d !== null ? vt(d) : Mi, r.state = t.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (qc(
        t,
        n,
        d,
        i
      ), r.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof r.getSnapshotBeforeUpdate == "function" || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (d = r.state, typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount(), d !== r.state && Zc.enqueueReplaceState(r, r.state, null), $l(t, i, r, u), Yl(), r.state = t.memoizedState), typeof r.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      r = t.stateNode;
      var v = t.memoizedProps, _ = li(n, v);
      r.props = _;
      var T = r.context, D = n.contextType;
      d = Mi, typeof D == "object" && D !== null && (d = vt(D));
      var k = n.getDerivedStateFromProps;
      D = typeof k == "function" || typeof r.getSnapshotBeforeUpdate == "function", v = t.pendingProps !== v, D || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (v || T !== d) && lm(
        t,
        r,
        i,
        d
      ), va = !1;
      var z = t.memoizedState;
      r.state = z, $l(t, i, r, u), Yl(), T = t.memoizedState, v || z !== T || va ? (typeof k == "function" && (qc(
        t,
        n,
        k,
        i
      ), T = t.memoizedState), (_ = va || im(
        t,
        n,
        _,
        i,
        z,
        T,
        d
      )) ? (D || typeof r.UNSAFE_componentWillMount != "function" && typeof r.componentWillMount != "function" || (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = T), r.props = i, r.state = T, r.context = d, i = _) : (typeof r.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      r = t.stateNode, hc(e, t), d = t.memoizedProps, D = li(n, d), r.props = D, k = t.pendingProps, z = r.context, T = n.contextType, _ = Mi, typeof T == "object" && T !== null && (_ = vt(T)), v = n.getDerivedStateFromProps, (T = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function") || typeof r.UNSAFE_componentWillReceiveProps != "function" && typeof r.componentWillReceiveProps != "function" || (d !== k || z !== _) && lm(
        t,
        r,
        i,
        _
      ), va = !1, z = t.memoizedState, r.state = z, $l(t, i, r, u), Yl();
      var w = t.memoizedState;
      d !== k || z !== w || va || e !== null && e.dependencies !== null && ts(e.dependencies) ? (typeof v == "function" && (qc(
        t,
        n,
        v,
        i
      ), w = t.memoizedState), (D = va || im(
        t,
        n,
        D,
        i,
        z,
        w,
        _
      ) || e !== null && e.dependencies !== null && ts(e.dependencies)) ? (T || typeof r.UNSAFE_componentWillUpdate != "function" && typeof r.componentWillUpdate != "function" || (typeof r.componentWillUpdate == "function" && r.componentWillUpdate(i, w, _), typeof r.UNSAFE_componentWillUpdate == "function" && r.UNSAFE_componentWillUpdate(
        i,
        w,
        _
      )), typeof r.componentDidUpdate == "function" && (t.flags |= 4), typeof r.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof r.componentDidUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = w), r.props = i, r.state = w, r.context = _, i = D) : (typeof r.componentDidUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof r.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return r = i, Yi(e, t), i = (t.flags & 128) !== 0, r || i ? (r = t.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : r.render(), t.flags |= 1, e !== null && i ? (t.child = ai(
      t,
      e.child,
      null,
      u
    ), t.child = ai(
      t,
      null,
      n,
      u
    )) : rt(e, t, n, u), t.memoizedState = r.state, e = t.child) : e = Wn(
      e,
      t,
      u
    ), e;
  }
  function _m(e, t, n, i) {
    return Ja(), t.flags |= 256, rt(e, t, n, i), t.child;
  }
  var Lc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Qc(e) {
    return { baseLanes: e, cachePool: ch() };
  }
  function Yc(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Wt), e;
  }
  function Sm(e, t, n) {
    var i = t.pendingProps, u = !1, r = (t.flags & 128) !== 0, d;
    if ((d = r) || (d = e !== null && e.memoizedState === null ? !1 : (gt.current & 2) !== 0), d && (u = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (ve) {
        if (u ? _a(t) : Sa(), (e = Le) ? (e = Yp(
          e,
          dn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: fa !== null ? { id: Nn, overflow: Cn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = eh(e), n.return = t, t.child = n, ft = t, Le = null)) : e = null, e === null) throw ha(t);
        return Yo(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return r = i.children, i = i.fallback, u ? (Sa(), u = t.mode, r = Ss(
        { mode: "hidden", children: r },
        u
      ), i = Ka(
        i,
        u,
        n,
        null
      ), r.return = t, i.return = t, r.sibling = i, t.child = r, i = t.child, i.memoizedState = Qc(n), i.childLanes = Yc(
        e,
        d,
        n
      ), t.memoizedState = Lc, Jl(null, i)) : (_a(t), $c(t, r));
    }
    var v = e.memoizedState;
    if (v !== null) {
      var _ = v.dehydrated;
      if (_ !== null)
        return c1(
          e,
          t,
          r,
          d,
          i,
          _,
          v,
          n
        );
    }
    return u ? (Sa(), u = i.fallback, r = t.mode, v = e.child, _ = v.sibling, i = Xn(v, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = v.subtreeFlags & 1206910976, _ !== null ? u = Xn(_, u) : (u = Ka(
      u,
      r,
      n,
      null
    ), u.flags |= 2), u.return = t, i.return = t, i.sibling = u, t.child = i, Jl(null, i), i = t.child, u = e.child.memoizedState, u === null ? u = Qc(n) : (r = u.cachePool, r !== null ? (v = tt._currentValue, r = r.parent !== v ? { parent: v, pool: v } : r) : r = ch(), u = {
      baseLanes: u.baseLanes | n,
      cachePool: r
    }), i.memoizedState = u, i.childLanes = Yc(
      e,
      d,
      n
    ), t.memoizedState = Lc, Jl(e.child, i)) : (_a(t), n = e.child, e = n.sibling, n = Xn(n, {
      mode: "visible",
      children: i.children
    }), n.return = t, n.sibling = null, e !== null && (d = t.deletions, d === null ? (t.deletions = [e], t.flags |= 16) : d.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function $c(e, t) {
    return t = Ss(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Ss(e, t) {
    return e = Zt(22, e, null, t), e.lanes = 0, e;
  }
  function xs(e, t, n) {
    return ai(t, e.child, null, n), e = $c(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function c1(e, t, n, i, u, r, d, v) {
    if (n)
      return t.flags & 256 ? (_a(t), t.flags &= -257, xs(
        e,
        t,
        v
      )) : t.memoizedState !== null ? (Sa(), t.child = e.child, t.flags |= 128, null) : (Sa(), r = u.fallback, d = t.mode, u = Ss(
        { mode: "visible", children: u.children },
        d
      ), r = Ka(
        r,
        d,
        v,
        null
      ), r.flags |= 2, u.return = t, r.return = t, u.sibling = r, t.child = u, ai(t, e.child, null, v), u = t.child, u.memoizedState = Qc(v), u.childLanes = Yc(
        e,
        i,
        v
      ), t.memoizedState = Lc, Jl(null, u));
    if (_a(t), Yo(r)) {
      if (i = r.nextSibling && r.nextSibling.dataset, i) var _ = i.dgst;
      return i = _, i !== "" && (u = Error(c(419)), u.stack = "", u.digest = i, Zl({ value: u, source: null, stack: null })), xs(
        e,
        t,
        v
      );
    }
    if (at || Fa(e, t, v, !1), i = (v & e.childLanes) !== 0, at || i) {
      if (ba.current !== null)
        return xs(
          e,
          t,
          v
        );
      if (i = ke, i !== null && (u = ad(
        i,
        v
      ), u !== 0 && u !== d.retryLane))
        throw d.retryLane = u, Xa(e, u), Lt(i, e, u), Hc;
      return Qo(r) || Bs(), xs(
        e,
        t,
        v
      );
    }
    return Qo(r) ? (t.flags |= 192, t.child = e.child, null) : (e = d.treeContext, Le = mn(r.nextSibling), ft = t, ve = !0, da = null, dn = !1, e !== null && ah(t, e), t = $c(
      t,
      u.children
    ), t.flags |= 134221824, t);
  }
  function xm(e, t, n) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), es(e.return, t, n);
  }
  function jm(e) {
    for (var t = null; e !== null; ) {
      var n = e.alternate;
      n !== null && cs(n) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function js(e, t, n, i, u, r) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: u,
      treeForkCount: r
    } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = i, d.tail = n, d.tailMode = u, d.treeForkCount = r);
  }
  function Gc(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var n = t.sibling;
      t.sibling = e.child, e.child = t, t = n;
    }
  }
  function Vc(e, t, n) {
    var i = t.pendingProps, u = i.revealOrder, r = i.tail;
    i = i.children;
    var d = gt.current;
    if (t.flags & 128)
      return Gl(t, d), null;
    var v = (d & 2) !== 0;
    if (v ? (d = d & 1 | 2, t.flags |= 128) : d &= 1, Gl(t, d), u === "backwards" && e !== null ? (Gc(e), rt(e, t, i, n), Gc(e)) : rt(e, t, i, n), i = ve ? ql : 0, !v && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && xm(e, n, t);
        else if (e.tag === 19)
          xm(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (u) {
      case "backwards":
        n = jm(t.child), n === null ? (u = t.child, t.child = null) : (u = n.sibling, n.sibling = null, Gc(t)), js(
          t,
          !0,
          u,
          null,
          r,
          i
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, u = t.child, t.child = null; u !== null; ) {
          if (e = u.alternate, e !== null && cs(e) === null) {
            t.child = u;
            break;
          }
          e = u.sibling, u.sibling = n, n = u, u = e;
        }
        js(
          t,
          !0,
          n,
          null,
          r,
          i
        );
        break;
      case "together":
        js(
          t,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      case "independent":
        t.memoizedState = null;
        break;
      default:
        n = jm(t.child), n === null ? (u = t.child, t.child = null) : (u = n.sibling, n.sibling = null), js(
          t,
          !1,
          u,
          n,
          r,
          i
        );
    }
    return t.child;
  }
  function Om(e, t, n) {
    var i = t.pendingProps;
    return ma(t, t.type, i.value), rt(e, t, i.children, n), t.child;
  }
  function Wn(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), za |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Fa(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(c(153));
    if (t.child !== null) {
      for (e = t.child, n = Xn(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = Xn(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function Xc(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && ts(e)));
  }
  function o1(e, t, n) {
    switch (t.tag) {
      case 3:
        sa(t, t.stateNode.containerInfo), ma(t, tt, e.memoizedState.cache), Ja();
        break;
      case 27:
      case 5:
        Ba(t);
        break;
      case 4:
        sa(t, t.stateNode.containerInfo);
        break;
      case 10:
        ma(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, gc(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null) {
          if (i.dehydrated !== null)
            return _a(t), t.flags |= 128, null;
          i = Fa(
            e,
            t,
            n,
            !1
          );
          var u = t.child.childLanes;
          return i || (n & u) !== 0 ? Sm(e, t, n) : (_a(t), e = Wn(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        }
        _a(t);
        break;
      case 19:
        if (t.flags & 128)
          return Vc(
            e,
            t,
            n
          );
        if (u = (e.flags & 128) !== 0, i = (n & t.childLanes) !== 0, i || (Fa(
          e,
          t,
          n,
          !1
        ), i = (n & t.childLanes) !== 0), u) {
          if (i)
            return Vc(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), Gl(t, gt.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, pm(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        ma(t, tt, e.memoizedState.cache);
    }
    return Wn(e, t, n);
  }
  function zm(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        at = !0;
      else {
        if (!Xc(e, n) && (t.flags & 128) === 0)
          return at = !1, o1(
            e,
            t,
            n
          );
        at = (e.flags & 131072) !== 0;
      }
    else
      at = !1, ve && (t.flags & 1048576) !== 0 && nh(t, ql, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = ti(t.elementType), t.type = e, typeof e == "function")
            ec(e) ? (i = li(e, i), t.tag = 1, t = bm(
              null,
              t,
              e,
              i,
              n
            )) : (t.tag = 0, t = Bc(
              null,
              t,
              e,
              i,
              n
            ));
          else {
            if (e != null) {
              var u = e.$$typeof;
              if (u === G) {
                t.tag = 11, t = dm(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              } else if (u === _e) {
                t.tag = 14, t = hm(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              } else if (u === Xe) {
                t.tag = 10, t.type = e, t = Om(
                  null,
                  t,
                  n
                );
                break e;
              }
            }
            throw t = ce(e) || e, Error(c(306, t, ""));
          }
        }
        return t;
      case 0:
        return Bc(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return i = t.type, u = li(
          i,
          t.pendingProps
        ), bm(
          e,
          t,
          i,
          u,
          n
        );
      case 3:
        e: {
          if (sa(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(c(387));
          i = t.pendingProps;
          var r = t.memoizedState;
          u = r.element, hc(e, t), $l(t, i, null, n);
          var d = t.memoizedState;
          if (i = d.cache, ma(t, tt, i), i !== r.cache && sc(
            t,
            [tt],
            n,
            !0
          ), Yl(), i = d.element, r.isDehydrated)
            if (r = {
              element: i,
              isDehydrated: !1,
              cache: d.cache
            }, t.updateQueue.baseState = r, t.memoizedState = r, t.flags & 256) {
              t = _m(
                e,
                t,
                i,
                n
              );
              break e;
            } else if (i !== u) {
              u = cn(
                Error(c(424)),
                t
              ), Zl(u), t = _m(
                e,
                t,
                i,
                n
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Le = mn(e.firstChild), ft = t, ve = !0, da = null, dn = !0, n = ph(
                t,
                null,
                i,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
          else {
            if (Ja(), i === u) {
              t = Wn(
                e,
                t,
                n
              );
              break e;
            }
            rt(e, t, i, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return Yi(e, t), e === null ? (n = Ip(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : ve || (t.stateNode = Cp(
          t.type,
          t.pendingProps,
          mt.current,
          t
        )) : t.memoizedState = Ip(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Ba(t), e === null && ve && (i = t.stateNode = Vp(
          t.type,
          t.pendingProps,
          mt.current
        ), ft = t, dn = !0, u = Le, Ca(t.type) ? ($o = u, Le = mn(i.firstChild)) : Le = u), rt(
          e,
          t,
          t.pendingProps.children,
          n
        ), Yi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && ve && ((u = i = Le) && (i = ib(
          i,
          t.type,
          t.pendingProps,
          dn
        ), i !== null ? (t.stateNode = i, ft = t, Le = mn(i.firstChild), dn = !1, u = !0) : u = !1), u || ha(t)), Ba(t), u = t.type, r = t.pendingProps, d = e !== null ? e.memoizedProps : null, i = r.children, Uo(u, r) ? i = null : d !== null && Uo(u, d) && (t.flags |= 32), t.memoizedState !== null && (u = Sc(
          e,
          t,
          W0,
          null,
          null,
          n
        ), sl._currentValue = u), Yi(e, t), rt(e, t, i, n), t.child;
      case 6:
        return e === null && ve && ((e = n = Le) && (n = lb(
          n,
          t.pendingProps,
          dn
        ), n !== null ? (t.stateNode = n, ft = t, Le = null, e = !0) : e = !1), e || ha(t)), null;
      case 13:
        return Sm(e, t, n);
      case 4:
        return sa(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = ai(
          t,
          null,
          i,
          n
        ) : rt(e, t, i, n), t.child;
      case 11:
        return dm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return i = t.pendingProps, Yi(e, t), rt(e, t, i, n), t.child;
      case 8:
        return rt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return rt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return Om(e, t, n);
      case 9:
        return u = t.type._context, i = t.pendingProps.children, Pa(t), u = vt(u), i = i(u), t.flags |= 1, rt(e, t, i, n), t.child;
      case 14:
        return hm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return mm(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Vc(e, t, n);
      case 31:
        return r1(e, t, n);
      case 22:
        return pm(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Pa(t), i = vt(tt), e === null ? (u = oc(), u === null && (u = ke, r = rc(), u.pooledCache = r, r.refCount++, r !== null && (u.pooledCacheLanes |= n), u = r), t.memoizedState = { parent: i, cache: u }, dc(t), ma(t, tt, u)) : ((e.lanes & n) !== 0 && (hc(e, t), $l(t, null, null, n), Yl()), u = e.memoizedState, r = t.memoizedState, u.parent !== i ? (u = { parent: i, cache: i }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ma(t, tt, i)) : (i = r.cache, ma(t, tt, i), i !== u.cache && sc(
          t,
          [tt],
          n,
          !0
        ))), rt(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 30:
        return t.stateNode === null && (t.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), i = t.pendingProps, i.name != null && i.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : ve && Pu(t), e !== null && e.memoizedProps.name !== i.name ? t.flags |= 4194816 : Yi(e, t), rt(e, t, i.children, n), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(c(156, t.tag));
  }
  function ea(e) {
    e.flags |= 4;
  }
  function Kc(e, t, n, i, u) {
    var r;
    if ((r = (e.mode & 32) !== 0) && (r = n === null ? ev(t, i) : ev(t, i) && (i.src !== n.src || i.srcSet !== n.srcSet)), r) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (up()) e.flags |= 8192;
        else
          throw ni = ls, fc;
    } else e.flags &= -16777217;
  }
  function Em(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !tv(t))
      if (up()) e.flags |= 8192;
      else
        throw ni = ls, fc;
  }
  function Os(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? ed() : 536870912, e.lanes |= t, Ki |= t);
  }
  function Il(e, t) {
    if (!ve)
      switch (e.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var n = e.tail, i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
          break;
        default:
          for (t = e.tail, n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
      }
  }
  function Qe(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
    if (t)
      for (var u = e.child; u !== null; )
        n |= u.lanes | u.childLanes, i |= u.subtreeFlags & 1206910976, i |= u.flags & 1206910976, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        n |= u.lanes | u.childLanes, i |= u.subtreeFlags, i |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= i, e.childLanes = n, t;
  }
  function f1(e, t, n) {
    var i = t.pendingProps;
    switch (ac(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Qe(t), null;
      case 1:
        return Qe(t), null;
      case 3:
        return n = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), In(tt), zn(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (qi(t) ? ea(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, lc())), Qe(t), null;
      case 26:
        var u = t.type, r = t.memoizedState;
        return e === null ? (ea(t), r !== null ? (Qe(t), Em(t, r)) : (Qe(t), Kc(
          t,
          u,
          null,
          i,
          n
        ))) : r ? r !== e.memoizedState ? (ea(t), Qe(t), Em(t, r)) : (Qe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && ea(t), Qe(t), Kc(
          t,
          u,
          e,
          i,
          n
        )), null;
      case 27:
        if (bi(t), n = mt.current, u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && ea(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(c(166));
            return Qe(t), t.subtreeFlags &= -33554433, null;
          }
          e = Ot.current, qi(t) ? ih(t) : (e = Vp(u, i, n), t.stateNode = e, ea(t));
        }
        return Qe(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (bi(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && ea(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(c(166));
            return Qe(t), t.subtreeFlags &= -33554433, null;
          }
          if (r = Ot.current, qi(t))
            ih(t);
          else {
            var d = su(
              mt.current
            );
            switch (r) {
              case 1:
                r = d.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                r = d.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    r = d.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    r = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    r = d.createElement("div"), r.innerHTML = "<script><\/script>", r = r.removeChild(
                      r.firstChild
                    );
                    break;
                  case "select":
                    r = typeof i.is == "string" ? d.createElement("select", {
                      is: i.is
                    }) : d.createElement("select"), i.multiple ? r.multiple = !0 : i.size && (r.size = i.size);
                    break;
                  default:
                    r = typeof i.is == "string" ? d.createElement(u, { is: i.is }) : d.createElement(u);
                }
            }
            r[pt] = t, r[qt] = i;
            e: for (d = t.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6)
                r.appendChild(d.stateNode);
              else if (d.tag !== 4 && d.tag !== 27 && d.child !== null) {
                d.child.return = d, d = d.child;
                continue;
              }
              if (d === t) break e;
              for (; d.sibling === null; ) {
                if (d.return === null || d.return === t)
                  break e;
                d = d.return;
              }
              d.sibling.return = d.return, d = d.sibling;
            }
            t.stateNode = r;
            e: switch (_t(r, u, i), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
            i && ea(t);
          }
        }
        return Qe(t), t.subtreeFlags &= -33554433, Kc(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && ea(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(c(166));
          if (e = mt.current, qi(t)) {
            if (e = t.stateNode, n = t.memoizedProps, i = null, u = ft, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  i = u.memoizedProps;
              }
            e[pt] = t, e = !!(e.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || zp(e.nodeValue, n)), e || ha(t, !0);
          } else
            e = su(e).createTextNode(
              i
            ), e[pt] = t, t.stateNode = e;
        }
        return Qe(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = qi(t), n !== null) {
            if (e === null) {
              if (!i) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[pt] = t;
            } else
              Ja(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Qe(t), e = !1;
          } else
            n = lc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (It(t), t) : (It(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return Qe(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = qi(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(c(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(c(317));
              u[pt] = t;
            } else
              Ja(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            Qe(t), u = !1;
          } else
            u = lc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (It(t), t) : (It(t), null);
        }
        return It(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = i !== null, e = e !== null && e.memoizedState !== null, n && (i = t.child, u = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (u = i.alternate.memoizedState.cachePool.pool), r = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (r = i.memoizedState.cachePool.pool), r !== u && (i.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Os(t, t.updateQueue), Qe(t), null);
      case 4:
        return zn(), e === null && Ao(t.stateNode.containerInfo), t.flags |= 67108864, Qe(t), null;
      case 10:
        return In(t.type), Qe(t), null;
      case 19:
        if (bc(t), i = t.memoizedState, i === null) return Qe(t), null;
        if (u = (t.flags & 128) !== 0, r = i.rendering, r === null)
          if (u) Il(i, !1);
          else {
            if (We !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (r = cs(e), r !== null) {
                  for (t.flags |= 128, Il(i, !1), e = r.updateQueue, t.updateQueue = e, Os(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    Wd(n, e), n = n.sibling;
                  return Gl(
                    t,
                    gt.current & 1 | 2
                  ), ve && Kn(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && Gt() > qs && (t.flags |= 128, u = !0, Il(i, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = cs(r), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, Os(t, e), Il(i, !0), i.tail === null && i.tailMode !== "collapsed" && i.tailMode !== "visible" && !r.alternate && !ve)
                return Qe(t), null;
            } else
              2 * Gt() - i.renderingStartTime > qs && n !== 536870912 && (t.flags |= 128, u = !0, Il(i, !1), t.lanes = 4194304);
          i.isBackwards ? (r.sibling = t.child, t.child = r) : (e = i.last, e !== null ? e.sibling = r : t.child = r, i.last = r);
        }
        if (i.tail !== null) {
          e = i.tail;
          e: {
            for (n = e; n !== null; ) {
              if (n.alternate !== null) {
                n = !1;
                break e;
              }
              n = n.sibling;
            }
            n = !0;
          }
          return i.rendering = e, i.tail = e.sibling, i.renderingStartTime = Gt(), e.sibling = null, r = gt.current, r = u ? r & 1 | 2 : r & 1, i.tailMode === "visible" || i.tailMode === "collapsed" || !n || ve ? Gl(t, r) : (n = r, Ze(yt, t), Ze(gt, n), zt === null && (zt = t)), ve && Kn(t, i.treeForkCount), e;
        }
        return Qe(t), null;
      case 22:
      case 23:
        return It(t), yc(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Qe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Qe(t), n = t.updateQueue, n !== null && Os(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== n && (t.flags |= 2048), e !== null && Ke(ei), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), In(tt), Qe(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, Qe(t), null;
    }
    throw Error(c(156, t.tag));
  }
  function d1(e, t) {
    switch (ac(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return In(tt), zn(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return bi(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (It(t), t.alternate === null)
            throw Error(c(340));
          Ja();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (It(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(c(340));
          Ja();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return bc(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return zn(), null;
      case 10:
        return In(t.type), null;
      case 22:
      case 23:
        return It(t), yc(), e !== null && Ke(ei), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return In(tt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Tm(e, t) {
    switch (ac(t), t.tag) {
      case 3:
        In(tt), zn();
        break;
      case 26:
      case 27:
      case 5:
        bi(t);
        break;
      case 4:
        zn();
        break;
      case 31:
        t.memoizedState !== null && It(t);
        break;
      case 13:
        It(t);
        break;
      case 19:
        bc(t);
        break;
      case 10:
        In(t.type);
        break;
      case 22:
      case 23:
        It(t), yc(), e !== null && Ke(ei);
        break;
      case 24:
        In(tt);
    }
  }
  function Fl(e, t) {
    try {
      var n = t.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var u = i.next;
        n = u;
        do {
          if ((n.tag & e) === e) {
            i = void 0;
            var r = n.create, d = n.inst;
            i = r(), d.destroy = i;
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (v) {
      Me(t, t.return, v);
    }
  }
  function xa(e, t, n) {
    try {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var r = u.next;
        i = r;
        do {
          if ((i.tag & e) === e) {
            var d = i.inst, v = d.destroy;
            if (v !== void 0) {
              d.destroy = void 0, u = t;
              var _ = n, T = v;
              try {
                T();
              } catch (D) {
                Me(
                  u,
                  _,
                  D
                );
              }
            }
          }
          i = i.next;
        } while (i !== r);
      }
    } catch (D) {
      Me(t, t.return, D);
    }
  }
  function Nm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        yh(t, n);
      } catch (i) {
        Me(e, e.return, i);
      }
    }
  }
  function Cm(e, t, n) {
    n.props = li(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      Me(e, t, i);
    }
  }
  function An(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            var u = e.stateNode, r = Gn(e.memoizedProps, u);
            (u.ref === null || u.ref.name !== r) && (u.ref = qp(r)), i = u.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var d = new tn(e);
              g(
                e.child,
                !1,
                nb,
                d,
                void 0,
                void 0
              ), e.stateNode = d;
            }
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(i) : n.current = i;
      }
    } catch (v) {
      Me(e, t, v);
    }
  }
  function bt(e, t) {
    var n = e.ref, i = e.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (u) {
          Me(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          Me(e, t, u);
        }
      else n.current = null;
  }
  function zs(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var n = 0; n < t.length; n++)
        Qp(
          e.stateNode,
          t[n]
        );
  }
  function Am(e) {
    for (var t = e.return; t !== null && (Ic(t) && Qp(e.stateNode, t.stateNode), !Jc(t)); )
      t = t.return;
  }
  function Pl(e) {
    for (var t = e.return; t !== null && (Ic(t) && ab(e.stateNode, t.stateNode), !Jc(t)); )
      t = t.return;
  }
  function Jc(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function Ic(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function Fc(e) {
    var t = e.type, n = e.memoizedProps, i = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break e;
        case "img":
          n.src ? i.src = n.src : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (u) {
      Me(e, e.return, u);
    }
  }
  function Pc(e, t, n) {
    try {
      var i = e.stateNode;
      k1(i, e.type, n, t), i[qt] = t;
    } catch (u) {
      Me(e, e.return, u);
    }
  }
  function wm(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ca(e.type) || e.tag === 4;
  }
  function Wc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || wm(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && Ca(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function eo(e, t, n, i) {
    var u = e.tag;
    if (u === 5 || u === 6)
      u = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(u, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(u), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Tn)), zs(e, i), Ne = !0;
    else if (u !== 4 && (u === 27 && (zs(e, i), i = null, Ca(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null))
      for (eo(
        e,
        t,
        n,
        i
      ), e = e.sibling; e !== null; )
        eo(
          e,
          t,
          n,
          i
        ), e = e.sibling;
  }
  function Es(e, t, n, i) {
    var u = e.tag;
    if (u === 5 || u === 6)
      u = e.stateNode, t ? n.insertBefore(u, t) : n.appendChild(u), zs(e, i), Ne = !0;
    else if (u !== 4 && (u === 27 && (zs(e, i), i = null, Ca(e.type) && (n = e.stateNode)), e = e.child, e !== null))
      for (Es(
        e,
        t,
        n,
        i
      ), e = e.sibling; e !== null; )
        Es(
          e,
          t,
          n,
          i
        ), e = e.sibling;
  }
  function Rm(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var i = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      _t(t, i, n), t[pt] = e, t[qt] = n;
    } catch (r) {
      Me(e, e.return, r);
    }
  }
  var Ts = !1, Ft = null;
  function Mm(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Ts = !0);
  }
  var wn = null;
  function Dm() {
    var e = wn;
    return wn = null, e;
  }
  var kt = 0;
  function $i(e, t, n, i, u) {
    return kt = 0, Um(
      e.child,
      t,
      n,
      i,
      u
    );
  }
  function Um(e, t, n, i, u) {
    for (var r = !1; e !== null; ) {
      if (e.tag === 5) {
        var d = e.stateNode;
        if (i !== null) {
          var v = ko(d);
          i.push(v), v.view && (r = !0);
        } else
          r || ko(d).view && (r = !0);
        Ts = !0, Dp(
          d,
          kt === 0 ? t : t + "_" + kt,
          n
        ), kt++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && u || Um(
        e.child,
        t,
        n,
        i,
        u
      ) && (r = !0));
      e = e.sibling;
    }
    return r;
  }
  function Rn(e, t) {
    for (; e !== null; )
      e.tag === 5 ? Up(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || Rn(
        e.child,
        t
      )), e = e.sibling;
  }
  function Ns(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (Ns(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(c(544));
          var n = t.name;
          t = Vn(t.default, t.share), t !== "none" && ($i(
            e,
            n,
            t,
            null,
            !1
          ) || Rn(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function to(e, t) {
    if (e.tag === 30) {
      var n = e.stateNode, i = e.memoizedProps, u = Gn(i, n), r = Vn(
        i.default,
        n.paired ? i.share : i.enter
      );
      r !== "none" ? $i(e, u, r, null, !1) ? (Ns(e), n.paired || t || Pi(e, i.onEnter)) : Rn(e.child, !1) : Ns(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        to(e, t), e = e.sibling;
    else Ns(e);
  }
  function no(e) {
    if (Ft !== null && Ft.size !== 0) {
      var t = Ft;
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var n = e.memoizedProps, i = n.name;
              if (i != null && i !== "auto") {
                var u = t.get(i);
                if (u !== void 0) {
                  var r = Vn(
                    n.default,
                    n.share
                  );
                  if (r !== "none" && ($i(
                    e,
                    i,
                    r,
                    null,
                    !1
                  ) ? (r = e.stateNode, u.paired = r, r.paired = u, Pi(e, n.onShare)) : Rn(e.child, !1)), t.delete(i), t.size === 0) break;
                }
              }
            }
            no(e);
          }
          e = e.sibling;
        }
    }
  }
  function ao(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, n = Gn(t, e.stateNode), i = Ft !== null ? Ft.get(n) : void 0, u = Vn(
        t.default,
        i !== void 0 ? t.share : t.exit
      );
      u !== "none" && ($i(e, n, u, null, !1) ? i !== void 0 ? (u = e.stateNode, i.paired = u, u.paired = i, Ft.delete(n), Pi(e, t.onShare)) : Pi(e, t.onExit) : Rn(e.child, !1)), Ft !== null && no(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        ao(e), e = e.sibling;
    else
      Ft !== null && no(e);
  }
  function qm(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, n = Gn(t, e.stateNode);
        t = Vn(t.default, t.update), e.flags &= -5, t !== "none" && $i(
          e,
          n,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && qm(e);
      e = e.sibling;
    }
  }
  function io(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, Rn(e.child, !1));
          }
          io(e);
        }
        e = e.sibling;
      }
  }
  function Cs(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, Rn(e.child, !1), io(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Cs(e), e = e.sibling;
    else io(e);
  }
  function Zm(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? Rn(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && Zm(e), e = e.sibling;
  }
  function lo(e, t, n, i, u, r, d) {
    for (var v = !1; t !== null; ) {
      if (t.tag === 5) {
        var _ = t.stateNode;
        if (r !== null && kt < r.length) {
          var T = r[kt], D = ko(_);
          (T.view || D.view) && (v = !0);
          var k;
          if (k = (e.flags & 4) === 0)
            if (D.clip) k = !0;
            else {
              k = T.rect;
              var z = D.rect;
              k = k.y !== z.y || k.x !== z.x || k.height !== z.height || k.width !== z.width;
            }
          k && (e.flags |= 4), D.abs ? D = !T.abs : (T = T.rect, D = D.rect, D = T.height !== D.height || T.width !== D.width), D && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && Dp(
          _,
          kt === 0 ? n : n + "_" + kt,
          u
        ), v && (e.flags & 4) !== 0 || (wn === null && (wn = []), wn.push(
          _,
          kt === 0 ? i : i + "_" + kt,
          t.memoizedProps
        )), kt++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && d ? e.flags |= t.flags & 32 : lo(
        e,
        t.child,
        n,
        i,
        u,
        r,
        d
      ) && (v = !0));
      t = t.sibling;
    }
    return v;
  }
  function km(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var n = e.memoizedProps, i = e.stateNode, u = Gn(n, i), r = Vn(n.default, n.update), d;
        d = e.memoizedState, e.memoizedState = null, i = e;
        var v = e.child;
        kt = 0, u = lo(
          i,
          v,
          u,
          u,
          r,
          d,
          !1
        ), (e.flags & 4) !== 0 && u && Pi(e, n.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && km(e);
      e = e.sibling;
    }
  }
  var dt = !1, we = !1, Mn = !1, uo = !1, Hm = typeof WeakSet == "function" ? WeakSet : Set, ht = null, Dn = !1, Wl = !1, As = !1, so = !1;
  function h1(e, t, n) {
    if (e = e.containerInfo, Mo = rl, e = Yd(e), Xr(e)) {
      if ("selectionStart" in e)
        var i = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          i = (i = e.ownerDocument) && i.defaultView || window;
          var u = i.getSelection && i.getSelection();
          if (u && u.rangeCount !== 0) {
            i = u.anchorNode;
            var r = u.anchorOffset, d = u.focusNode;
            u = u.focusOffset;
            try {
              i.nodeType, d.nodeType;
            } catch {
              i = null;
              break e;
            }
            var v = 0, _ = -1, T = -1, D = 0, k = 0, z = e, w = null;
            t: for (; ; ) {
              for (var V; z !== i || r !== 0 && z.nodeType !== 3 || (_ = v + r), z !== d || u !== 0 && z.nodeType !== 3 || (T = v + u), z.nodeType === 3 && (v += z.nodeValue.length), (V = z.firstChild) !== null; )
                w = z, z = V;
              for (; ; ) {
                if (z === e) break t;
                if (w === i && ++D === r && (_ = v), w === d && ++k === u && (T = v), (V = z.nextSibling) !== null) break;
                z = w, w = z.parentNode;
              }
              z = V;
            }
            i = _ === -1 || T === -1 ? null : { start: _, end: T };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Do = { focusedElem: e, selectionRange: i }, rl = !1, n = (n & 335544064) === n, ht = t, t = n ? 9270 : 1024; ht !== null; ) {
      if (e = ht, n && (i = e.deletions, i !== null))
        for (r = 0; r < i.length; r++)
          n && ao(i[r]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        n && Mm(e), ws(n);
      else {
        if (e.tag === 22) {
          if (i = e.alternate, e.memoizedState !== null) {
            i !== null && i.memoizedState === null && n && ao(i), ws(n);
            continue;
          } else if (i !== null && i.memoizedState !== null) {
            n && Mm(e), ws(n);
            continue;
          }
        }
        i = e.child, (e.subtreeFlags & t) !== 0 && i !== null ? (i.return = e, ht = i) : (n && qm(e), ws(n));
      }
    }
    Ft = null;
  }
  function ws(e) {
    for (; ht !== null; ) {
      var t = ht, n = e, i = t.alternate, u = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((u & 1024) !== 0 && i !== null) {
            n = void 0, u = i.memoizedProps, i = i.memoizedState;
            var r = t.stateNode;
            try {
              var d = li(
                t.type,
                u
              );
              n = r.getSnapshotBeforeUpdate(
                d,
                i
              ), r.__reactInternalSnapshotBeforeUpdate = n;
            } catch (v) {
              Me(t, t.return, v);
            }
          }
          break;
        case 3:
          if ((u & 1024) !== 0) {
            if (i = t.stateNode.containerInfo, n = i.nodeType, n === 9)
              Lo(i);
            else if (n === 1)
              switch (i.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Lo(i);
                  break;
                default:
                  i.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          n && i !== null && (n = Gn(
            i.memoizedProps,
            i.stateNode
          ), u = t.memoizedProps, u = Vn(u.default, u.update), u !== "none" && $i(
            i,
            n,
            u,
            i.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((u & 1024) !== 0) throw Error(c(163));
      }
      if (i = t.sibling, i !== null) {
        i.return = t.return, ht = i;
        break;
      }
      ht = t.return;
    }
  }
  function Bm(e, t, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Un(e, n), i & 4 && Fl(5, n);
        break;
      case 1:
        if (Un(e, n), i & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (d) {
              Me(n, n.return, d);
            }
          else {
            var u = li(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                u,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (d) {
              Me(
                n,
                n.return,
                d
              );
            }
          }
        i & 64 && Nm(n), i & 512 && An(n, n.return);
        break;
      case 3:
        if (Un(e, n), i & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            yh(e, t);
          } catch (d) {
            Me(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Rm(n);
      case 26:
      case 5:
        Un(e, n), t === null && i & 4 && Fc(n), i & 512 && An(n, n.return);
        break;
      case 12:
        Un(e, n);
        break;
      case 31:
        Un(e, n), i & 4 && $m(e, n);
        break;
      case 13:
        Un(e, n), i & 4 && Gm(e, n), i & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = z1.bind(
          null,
          n
        ), ub(e, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || dt, !i) {
          var r = t !== null && t.memoizedState !== null || we;
          t = dt, u = we, dt = i, (we = r) && !u ? (i = 2, (n.subtreeFlags & 8772) !== 0 && (i |= 1), xn(
            e,
            n,
            i
          )) : Un(e, n), dt = t, we = u;
        }
        break;
      case 30:
        Un(e, n), i & 512 && An(n, n.return);
        break;
      case 7:
        i & 512 && An(n, n.return);
      default:
        Un(e, n);
    }
  }
  function ro(e, t) {
    for (e = e.child; e !== null; )
      Lm(e, t), e = e.sibling;
  }
  function Lm(e, t) {
    switch (e.tag) {
      case 5:
      case 26:
        try {
          var n = e.stateNode;
          if (t) {
            var i = n.style;
            typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
          } else {
            var u = e.stateNode, r = e.memoizedProps.style, d = r != null && r.hasOwnProperty("display") ? r.display : null;
            u.style.display = d == null || typeof d == "boolean" ? "" : ("" + d).trim();
          }
        } catch (_) {
          Me(e, e.return, _);
        }
        co(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, Ne = !0;
        } catch (_) {
          Me(e, e.return, _);
        }
        break;
      case 18:
        try {
          var v = e.stateNode;
          t ? Mp(v, !0) : Mp(e.stateNode, !1);
        } catch (_) {
          Me(e, e.return, _);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && ro(e, t);
        break;
      default:
        ro(e, t);
    }
  }
  function co(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var n = e, i = t;
          switch (n.tag) {
            case 4:
              Lm(n, i);
              break e;
            case 22:
              n.memoizedState === null && co(n, i);
              break e;
            default:
              co(n, i);
          }
        }
        e = e.sibling;
      }
  }
  function Qm(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Qm(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && qu(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Ye = null, Ht = !1;
  function _n(e, t, n) {
    for (n = n.child; n !== null; )
      Ym(e, t, n), n = n.sibling;
  }
  function Ym(e, t, n) {
    if (Vt && typeof Vt.onCommitFiberUnmount == "function")
      try {
        Vt.onCommitFiberUnmount(xl, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        we || bt(n, t), _n(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !we && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        we || bt(n, t), Pl(n);
        var i = Ye, u = Ht;
        Ca(n.type) && (Ye = n.stateNode, Ht = !1), _n(
          e,
          t,
          n
        ), Xp(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), Ye = i, Ht = u;
        break;
      case 5:
        we || bt(n, t), Pl(n);
      case 6:
        if (n.tag === 6 && Pl(n), i = Ye, u = Ht, Ye = null, _n(
          e,
          t,
          n
        ), Ye = i, Ht = u, Ye !== null)
          if (Ht)
            try {
              (Ye.nodeType === 9 ? Ye.body : Ye.nodeName === "HTML" ? Ye.ownerDocument.body : Ye).removeChild(n.stateNode), Ne = !0;
            } catch (r) {
              Me(
                n,
                t,
                r
              );
            }
          else
            try {
              Ye.removeChild(n.stateNode), Ne = !0;
            } catch (r) {
              Me(
                n,
                t,
                r
              );
            }
        break;
      case 18:
        Ye !== null && (Ht ? (e = Ye, Rp(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), cl(e)) : Rp(Ye, n.stateNode));
        break;
      case 4:
        i = Ye, u = Ht, Ye = n.stateNode.containerInfo, Ht = !0, _n(
          e,
          t,
          n
        ), Ye = i, Ht = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        xa(2, n, t), we || xa(4, n, t), _n(
          e,
          t,
          n
        );
        break;
      case 1:
        we || (bt(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function" && Cm(
          n,
          t,
          i
        )), _n(
          e,
          t,
          n
        );
        break;
      case 21:
        _n(
          e,
          t,
          n
        );
        break;
      case 22:
        we = (i = we) || n.memoizedState !== null, _n(
          e,
          t,
          n
        ), we = i;
        break;
      case 30:
        bt(n, t), _n(
          e,
          t,
          n
        );
        break;
      case 7:
        we || bt(n, t), _n(
          e,
          t,
          n
        );
        break;
      default:
        _n(
          e,
          t,
          n
        );
    }
  }
  function $m(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        cl(e);
      } catch (n) {
        Me(t, t.return, n);
      }
    }
  }
  function Gm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        cl(e);
      } catch (n) {
        Me(t, t.return, n);
      }
  }
  function m1(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Hm()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Hm()), t;
      default:
        throw Error(c(435, e.tag));
    }
  }
  function Rs(e, t) {
    var n = m1(e);
    t.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var u = E1.bind(null, e, i);
        i.then(u, u);
      }
    });
  }
  function Nt(e, t, n) {
    var i = t.deletions;
    if (i !== null)
      for (var u = 0; u < i.length; u++) {
        var r = i[u], d = e, v = t, _ = v;
        e: for (; _ !== null; ) {
          switch (_.tag) {
            case 27:
              if (Ca(_.type)) {
                Ye = _.stateNode, Ht = !1;
                break e;
              }
              break;
            case 5:
              Ye = _.stateNode, Ht = !1;
              break e;
            case 3:
            case 4:
              Ye = _.stateNode.containerInfo, Ht = !0;
              break e;
          }
          _ = _.return;
        }
        if (Ye === null) throw Error(c(160));
        Ym(d, v, r), Ye = null, Ht = !1, d = r.alternate, d !== null && (d.return = null), r.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Vm(t, e, n), t = t.sibling;
  }
  var Sn = null;
  function Vm(e, t, n) {
    var i = e.alternate, u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (u & 4 && (i = e.updateQueue, i = i !== null ? i.events : null, i !== null))
          for (var r = 0; r < i.length; r++) {
            var d = i[r];
            d.ref.impl = d.nextImpl;
          }
        Nt(t, e, n), Ct(e), u & 4 && (xa(3, e, e.return), Fl(3, e), xa(5, e, e.return));
        break;
      case 1:
        Nt(t, e, n), Ct(e), u & 512 && (we || i === null || bt(i, i.return)), u & 64 && dt && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
        break;
      case 26:
        if (r = Sn, Nt(t, e, n), Ct(e), u & 512 && (we || i === null || bt(i, i.return)), u & 4)
          if (u = i !== null ? i.memoizedState : null, n = e.memoizedState, i === null)
            if (n === null)
              if (e.stateNode === null)
                if (dt)
                  e.stateNode = Cp(
                    e.type,
                    e.memoizedProps,
                    t.containerInfo,
                    e
                  );
                else {
                  e: {
                    t = e.type, n = e.memoizedProps, u = r.ownerDocument || r;
                    t: switch (t) {
                      case "title":
                        i = u.getElementsByTagName("title")[0], (!i || i[zl] || i[pt] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = u.createElement(t), u.head.insertBefore(
                          i,
                          u.querySelector("head > title")
                        )), _t(i, t, n), i[pt] = e, ot(i), t = i;
                        break e;
                      case "link":
                        if (r = Wp(
                          "link",
                          "href",
                          u
                        ).get(t + (n.href || ""))) {
                          for (d = 0; d < r.length; d++)
                            if (i = r[d], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              r.splice(d, 1);
                              break t;
                            }
                        }
                        i = u.createElement(t), _t(i, t, n), u.head.appendChild(i);
                        break;
                      case "meta":
                        if (r = Wp(
                          "meta",
                          "content",
                          u
                        ).get(t + (n.content || ""))) {
                          for (d = 0; d < r.length; d++)
                            if (i = r[d], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              r.splice(d, 1);
                              break t;
                            }
                        }
                        i = u.createElement(t), _t(i, t, n), u.head.appendChild(i);
                        break;
                      default:
                        throw Error(c(468, t));
                    }
                    i[pt] = e, ot(i), t = i;
                  }
                  e.stateNode = t;
                }
              else
                dt || Ko(r, e.type, e.stateNode);
            else
              e.stateNode = Pp(
                r,
                n,
                e.memoizedProps
              );
          else
            u !== n ? (u === null ? (t = i.stateNode, t === null || we || t.parentNode.removeChild(t)) : u.count--, n === null ? dt || Ko(r, e.type, e.stateNode) : Pp(r, n, e.memoizedProps)) : n === null && e.stateNode !== null && Pc(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        break;
      case 27:
        Nt(t, e, n), Ct(e), u & 512 && (we || i === null || bt(i, i.return)), i !== null && u & 4 && Pc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (r = Mn, Mn = !1, Nt(t, e, n), Mn = r, Ct(e), u & 512 && (we || i === null || bt(i, i.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            Ei(t, ""), Ne = !0;
          } catch (D) {
            Me(e, e.return, D);
          }
        }
        u & 4 && e.stateNode != null && (t = e.memoizedProps, Pc(
          e,
          t,
          i !== null ? i.memoizedProps : t
        )), u & 1024 && (uo = !0);
        break;
      case 6:
        if (Nt(t, e, n), Ct(e), u & 4) {
          if (e.stateNode === null)
            throw Error(c(162));
          t = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = t, Ne = !0;
          } catch (D) {
            Me(e, e.return, D);
          }
        }
        break;
      case 3:
        if (Ne = !1, Xs = null, r = Sn, Sn = ru(t.containerInfo), Nt(t, e, n), Sn = r, Ct(e), u & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            cl(t.containerInfo);
          } catch (D) {
            Me(e, e.return, D);
          }
        uo && (uo = !1, Xm(e)), Ne = !1;
        break;
      case 4:
        u = Mn, Mn = dt, i = hd(), r = Sn, Sn = ru(
          e.stateNode.containerInfo
        ), Nt(t, e, n), Ct(e), Sn = r, Ne && Wl && (As = !0), Ne = i, Mn = u;
        break;
      case 12:
        Nt(t, e, n), Ct(e);
        break;
      case 31:
        Nt(t, e, n), Ct(e), u & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Rs(e, t)));
        break;
      case 13:
        Nt(t, e, n), Ct(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Us = Gt()), u & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Rs(e, t)));
        break;
      case 22:
        r = e.memoizedState !== null, d = i !== null && i.memoizedState !== null;
        var v = dt, _ = we, T = Mn;
        dt = v || r, Mn = T || r, we = _ || d, Nt(t, e, n), we = _, Mn = T, dt = v, Ct(e), u & 8192 && (t = e.stateNode, t._visibility = r ? t._visibility & -2 : t._visibility | 1, !r || i === null || d || dt || we || (t = d || we, n = dt, i = we, dt = r || dt, we = t, ja(e, 2), dt = n, we = i), !r && Mn || ro(e, r)), u & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Rs(e, n))));
        break;
      case 19:
        Nt(t, e, n), Ct(e), u & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Rs(e, t)));
        break;
      case 30:
        u & 512 && (we || i === null || bt(i, i.return)), u = hd(), r = Wl, d = (n & 335544064) === n, v = e.memoizedProps, Wl = d && Vn(
          v.default,
          v.update
        ) !== "none", Nt(t, e, n), Ct(e), d && i !== null && Ne && (e.flags |= 4), Wl = r, Ne = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (we || i === null || bt(i, i.return)), i && i.stateNode !== null && (i.stateNode._fragmentFiber = e);
      default:
        Nt(t, e, n), Ct(e);
    }
  }
  function Ct(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, i = e.return; i !== null; ) {
          if (wm(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        i = null;
        for (var u = e.return; u !== null; ) {
          if (Ic(u)) {
            var r = u.stateNode;
            i === null ? i = [r] : i.push(r);
          }
          if (Jc(u)) break;
          u = u.return;
        }
        var d = i;
        if (n == null) throw Error(c(160));
        switch (n.tag) {
          case 27:
            var v = n.stateNode, _ = Wc(e);
            Es(
              e,
              _,
              v,
              d
            );
            break;
          case 5:
            var T = n.stateNode;
            n.flags & 32 && (Ei(T, ""), n.flags &= -33);
            var D = Wc(e);
            Es(
              e,
              D,
              T,
              d
            );
            break;
          case 3:
          case 4:
            var k = n.stateNode.containerInfo, z = Wc(e);
            eo(
              e,
              z,
              k,
              d
            );
            break;
          default:
            throw Error(c(161));
        }
      } catch (w) {
        Me(e, e.return, w);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Xm(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        Xm(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, rl = !0, t.reset(), rl = !1), e = e.sibling;
      }
  }
  function Gi(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Km(t, e), t = t.sibling;
    else km(t);
  }
  function Km(e, t) {
    var n = e.alternate;
    if (n === null) to(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (so = Dn = !1, Dm(), Gi(t, e), !Dn && !As) {
            if (e = wn, e !== null)
              for (var i = 0; i < e.length; i += 3) {
                n = e[i];
                var u = e[i + 1];
                Up(n, e[i + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + u + ")"
                  }
                );
              }
            e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), e.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), so = !0;
          }
          wn = null;
          break;
        case 5:
          Gi(t, e);
          break;
        case 4:
          i = Dn, Dn = !1, Gi(t, e), Dn && (As = !0), Dn = i;
          break;
        case 22:
          e.memoizedState === null && (n.memoizedState !== null ? to(e, !1) : Gi(t, e));
          break;
        case 30:
          i = Dn, u = Dm(), Dn = !1, Gi(t, e), Dn && (e.flags |= 4);
          var r = e.memoizedProps, d = e.stateNode;
          t = Gn(r, d), d = Gn(n.memoizedProps, d);
          var v = Vn(r.default, r.update);
          v === "none" ? t = !1 : (r = n.memoizedState, n.memoizedState = null, n = e.child, kt = 0, t = lo(
            e,
            n,
            t,
            d,
            v,
            r,
            !0
          ), kt !== (r === null ? 0 : r.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (Pi(
            e,
            e.memoizedProps.onUpdate
          ), wn = u) : u !== null && (u.push.apply(u, wn), wn = u), Dn = (e.flags & 32) !== 0 ? !0 : i;
          break;
        default:
          Gi(t, e);
      }
  }
  function Un(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Bm(e, t.alternate, t), t = t.sibling;
  }
  function ja(e, t) {
    for (e = e.child; e !== null; ) {
      var n = e, i = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          xa(4, n, n.return), ja(
            n,
            i
          );
          break;
        case 1:
          bt(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && Cm(
            n,
            n.return,
            u
          ), ja(
            n,
            i
          );
          break;
        case 27:
          (i & 2) !== 0 && Xp(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          bt(n, n.return), n.tag !== 5 && n.tag !== 27 || Pl(n), ja(
            n,
            i
          );
          break;
        case 6:
          Pl(n);
          break;
        case 26:
          bt(n, n.return), u = n.stateNode, n.memoizedState !== null || u === null || we || u.parentNode.removeChild(u), ja(
            n,
            i
          );
          break;
        case 22:
          n.memoizedState === null && ja(
            n,
            i
          );
          break;
        case 30:
          bt(n, n.return), ja(
            n,
            i
          );
          break;
        case 7:
          bt(n, n.return);
        default:
          ja(
            n,
            i
          );
      }
      e = e.sibling;
    }
  }
  function xn(e, t, n) {
    for (n = (t.subtreeFlags & 8772) !== 0 ? n : n & -2, t = t.child; t !== null; ) {
      var i = t.alternate, u = e, r = t, d = r.flags, v = (n & 1) !== 0;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          xn(
            u,
            r,
            n
          ), Fl(4, r);
          break;
        case 1:
          if (xn(
            u,
            r,
            n
          ), i = r, u = i.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (D) {
              Me(i, i.return, D);
            }
          if (i = r, u = i.updateQueue, u !== null) {
            var _ = i.stateNode;
            try {
              var T = u.shared.hiddenCallbacks;
              if (T !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < T.length; u++)
                  vh(T[u], _);
            } catch (D) {
              Me(i, i.return, D);
            }
          }
          v && d & 64 && Nm(r), An(r, r.return);
          break;
        case 27:
          (n & 2) !== 0 && Rm(r);
        case 5:
          r.tag !== 5 && r.tag !== 27 || Am(r), xn(
            u,
            r,
            n
          ), v && i === null && d & 4 && Fc(r), An(r, r.return);
          break;
        case 6:
          Am(r);
          break;
        case 26:
          _ = r.stateNode, r.memoizedState !== null || _ === null || dt || Ko(
            ru(_.ownerDocument),
            r.type,
            _
          ), xn(
            u,
            r,
            n
          ), v && i === null && d & 4 && Fc(r), An(r, r.return);
          break;
        case 12:
          xn(
            u,
            r,
            n
          );
          break;
        case 31:
          xn(
            u,
            r,
            n
          ), v && d & 4 && $m(u, r);
          break;
        case 13:
          xn(
            u,
            r,
            n
          ), v && d & 4 && Gm(u, r);
          break;
        case 22:
          r.memoizedState === null && xn(
            u,
            r,
            n
          ), An(r, r.return);
          break;
        case 30:
          xn(
            u,
            r,
            n
          ), An(r, r.return);
          break;
        case 7:
          An(r, r.return);
        default:
          xn(
            u,
            r,
            n
          );
      }
      t = t.sibling;
    }
  }
  function oo(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && kl(n));
  }
  function fo(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && kl(e));
  }
  function hn(e, t, n, i) {
    var u = (n & 335544064) === n;
    if (t.subtreeFlags & (u ? 10262 : 10256))
      for (t = t.child; t !== null; )
        Jm(
          e,
          t,
          n,
          i
        ), t = t.sibling;
    else u && Zm(t);
  }
  function Jm(e, t, n, i) {
    var u = (n & 335544064) === n;
    u && t.alternate === null && t.return !== null && t.return.alternate !== null && Cs(t);
    var r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        hn(
          e,
          t,
          n,
          i
        ), r & 2048 && Fl(9, t);
        break;
      case 1:
        hn(
          e,
          t,
          n,
          i
        );
        break;
      case 3:
        hn(
          e,
          t,
          n,
          i
        ), u && so && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), r & 2048 && (r = null, t.alternate !== null && (r = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== r && (t.refCount++, r != null && kl(r)));
        break;
      case 12:
        if (r & 2048) {
          hn(
            e,
            t,
            n,
            i
          ), r = t.stateNode;
          try {
            var d = t.memoizedProps, v = d.id, _ = d.onPostCommit;
            typeof _ == "function" && _(
              v,
              t.alternate === null ? "mount" : "update",
              r.passiveEffectDuration,
              -0
            );
          } catch (T) {
            Me(t, t.return, T);
          }
        } else
          hn(
            e,
            t,
            n,
            i
          );
        break;
      case 31:
        hn(
          e,
          t,
          n,
          i
        );
        break;
      case 13:
        hn(
          e,
          t,
          n,
          i
        );
        break;
      case 23:
        break;
      case 22:
        d = t.stateNode, v = t.alternate, t.memoizedState !== null ? (u && v !== null && v.memoizedState === null && Cs(v), d._visibility & 2 ? hn(
          e,
          t,
          n,
          i
        ) : eu(
          e,
          t
        )) : (u && v !== null && v.memoizedState !== null && Cs(t), d._visibility & 2 ? hn(
          e,
          t,
          n,
          i
        ) : (d._visibility |= 2, Vi(
          e,
          t,
          n,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), r & 2048 && oo(v, t);
        break;
      case 24:
        hn(
          e,
          t,
          n,
          i
        ), r & 2048 && fo(t.alternate, t);
        break;
      case 30:
        u && (r = t.alternate, r !== null && (Rn(r.child, !0), Rn(t.child, !0))), hn(
          e,
          t,
          n,
          i
        );
        break;
      default:
        hn(
          e,
          t,
          n,
          i
        );
    }
  }
  function Vi(e, t, n, i, u) {
    for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var r = e, d = t, v = n, _ = i, T = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Vi(
            r,
            d,
            v,
            _,
            u
          ), Fl(8, d);
          break;
        case 23:
          break;
        case 22:
          var D = d.stateNode;
          d.memoizedState !== null ? D._visibility & 2 ? Vi(
            r,
            d,
            v,
            _,
            u
          ) : eu(
            r,
            d
          ) : (D._visibility |= 2, Vi(
            r,
            d,
            v,
            _,
            u
          )), u && T & 2048 && oo(
            d.alternate,
            d
          );
          break;
        case 24:
          Vi(
            r,
            d,
            v,
            _,
            u
          ), u && T & 2048 && fo(d.alternate, d);
          break;
        default:
          Vi(
            r,
            d,
            v,
            _,
            u
          );
      }
      t = t.sibling;
    }
  }
  function eu(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, i = t, u = i.flags;
        switch (i.tag) {
          case 22:
            eu(n, i), u & 2048 && oo(
              i.alternate,
              i
            );
            break;
          case 24:
            eu(n, i), u & 2048 && fo(i.alternate, i);
            break;
          default:
            eu(n, i);
        }
        t = t.sibling;
      }
  }
  var ui = 8192;
  function si(e, t, n) {
    if (e.subtreeFlags & ui)
      for (e = e.child; e !== null; )
        Im(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function Im(e, t, n) {
    switch (e.tag) {
      case 26:
        si(
          e,
          t,
          n
        ), e.flags & ui && (e.memoizedState !== null ? _b(
          n,
          Sn,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && av(n, e)));
        break;
      case 5:
        si(
          e,
          t,
          n
        ), e.flags & ui && (e = e.stateNode, (t & 335544128) === t && av(n, e));
        break;
      case 3:
      case 4:
        var i = Sn;
        Sn = ru(e.stateNode.containerInfo), si(
          e,
          t,
          n
        ), Sn = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = ui, ui = 16777216, si(
          e,
          t,
          n
        ), ui = i) : si(
          e,
          t,
          n
        ));
        break;
      case 30:
        if ((e.flags & ui) !== 0 && (i = e.memoizedProps.name, i != null && i !== "auto")) {
          var u = e.stateNode;
          u.paired = null, Ft === null && (Ft = /* @__PURE__ */ new Map()), Ft.set(i, u);
        }
        si(
          e,
          t,
          n
        );
        break;
      default:
        si(
          e,
          t,
          n
        );
    }
  }
  function Fm(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function tu(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ht = i, Wm(
            i,
            e
          );
        }
      Fm(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Pm(e), e = e.sibling;
  }
  function Pm(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        tu(e), e.flags & 2048 && xa(9, e, e.return);
        break;
      case 3:
        tu(e);
        break;
      case 12:
        tu(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ms(e)) : tu(e);
        break;
      default:
        tu(e);
    }
  }
  function Ms(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          ht = i, Wm(
            i,
            e
          );
        }
      Fm(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          xa(8, t, t.return), Ms(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ms(t));
          break;
        default:
          Ms(t);
      }
      e = e.sibling;
    }
  }
  function Wm(e, t) {
    for (; ht !== null; ) {
      var n = ht;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          xa(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          kl(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, ht = i;
      else
        e: for (n = e; ht !== null; ) {
          i = ht;
          var u = i.sibling, r = i.return;
          if (Qm(i), i === n) {
            ht = null;
            break e;
          }
          if (u !== null) {
            u.return = r, ht = u;
            break e;
          }
          ht = r;
        }
    }
  }
  var p1 = {
    getCacheForType: function(e) {
      var t = vt(tt), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return vt(tt).controller.signal;
    }
  }, v1 = typeof WeakMap == "function" ? WeakMap : Map, Ce = 0, ke = null, ge = null, Se = 0, Re = 0, Pt = null, Oa = !1, Xi = !1, ho = !1, ta = 0, We = 0, za = 0, ri = 0, Ds = 0, Wt = 0, Ki = 0, nu = null, Bt = null, mo = !1, Us = 0, ep = 0, qs = 1 / 0, Zs = null, Ea = null, Je = 0, jn = null, ci = null, qn = 0, po = 0, vo = null, tp = null, Ji = null, Ii = null, Fi = null, au = 0, ks = null;
  function en() {
    return (Ce & 2) !== 0 && Se !== 0 ? Se & -Se : X.T !== null ? Eo() : id();
  }
  function np() {
    if (Wt === 0)
      if ((Se & 536870912) === 0 || ve) {
        var e = Ru;
        Ru <<= 1, (Ru & 3932160) === 0 && (Ru = 262144), Wt = e;
      } else Wt = 536870912;
    return e = yt.current, e !== null && (e.flags |= 32), Wt;
  }
  function Pi(e, t) {
    if (t != null) {
      var n = e.stateNode, i = n.ref;
      i === null && (i = n.ref = qp(
        Gn(e.memoizedProps, n)
      )), Ii === null && (Ii = []), Ii.push(t.bind(null, i));
    }
  }
  function Lt(e, t, n) {
    (e === ke && (Re === 2 || Re === 9) || e.cancelPendingCommit !== null) && (Wi(e, 0), Ta(
      e,
      Se,
      Wt,
      !1
    )), Ol(e, n), ((Ce & 2) === 0 || e !== ke) && (e === ke && ((Ce & 2) === 0 && (ri |= n), We === 4 && Ta(
      e,
      Se,
      Wt,
      !1
    )), Zn(e));
  }
  function ap(e, t, n) {
    if ((Ce & 6) !== 0) throw Error(c(327));
    var i = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || jl(e, t), u = i ? b1(e, t) : go(e, t, !0), r = i;
    do {
      if (u === 0) {
        Xi && !i && Ta(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, r && !y1(n)) {
          u = go(e, t, !1), r = !1;
          continue;
        }
        if (u === 2) {
          if (r = t, e.errorRecoveryDisabledLanes & r)
            var d = 0;
          else
            d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
          if (d !== 0) {
            t = d;
            e: {
              var v = e;
              u = nu;
              var _ = v.current.memoizedState.isDehydrated;
              if (_ && (Wi(v, d).flags |= 256), d = go(
                v,
                d,
                !1
              ), d !== 2 && d !== 6) {
                if (ho && !_) {
                  v.errorRecoveryDisabledLanes |= r, ri |= r, u = 4;
                  break e;
                }
                r = Bt, Bt = u, r !== null && (Bt === null ? Bt = r : Bt.push.apply(
                  Bt,
                  r
                ));
              }
              u = d;
            }
            if (r = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Wi(e, 0), Ta(e, t, 0, !0);
          break;
        }
        e: {
          switch (i = e, r = u, r) {
            case 0:
            case 1:
              throw Error(c(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              Ta(
                i,
                t,
                Wt,
                !Oa
              );
              break e;
            case 2:
              Bt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(c(329));
          }
          if ((t & 62914560) === t && (u = Us + 300 - Gt(), 10 < u)) {
            if (Ta(
              i,
              t,
              Wt,
              !Oa
            ), Du(i, 0, !0) !== 0) break e;
            qn = t, i.timeoutHandle = Zo(
              ip.bind(
                null,
                i,
                n,
                Bt,
                Zs,
                mo,
                t,
                Wt,
                ri,
                Ki,
                Oa,
                r,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          ip(
            i,
            n,
            Bt,
            Zs,
            mo,
            t,
            Wt,
            ri,
            Ki,
            Oa,
            r,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Zn(e);
  }
  function ip(e, t, n, i, u, r, d, v, _, T, D, k, z, w) {
    e.timeoutHandle = -1;
    var V = t.subtreeFlags, W = (r & 335544064) === r;
    if (k = null, (W || V & 8192 || (V & 16785408) === 16785408) && (k = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Tn
    }, Ft = null, Im(
      t,
      r,
      k
    ), W && (V = k, W = e.containerInfo, W = (W.nodeType === 9 ? W : W.ownerDocument).__reactViewTransition, W != null && (V.count++, V.waitingForViewTransition = !0, V = fu.bind(V), W.finished.then(V, V))), V = (r & 62914560) === r ? Us - Gt() : (r & 4194048) === r ? ep - Gt() : 0, V = Sb(
      k,
      V
    ), V !== null)) {
      qn = r, e.cancelPendingCommit = V(
        dp.bind(
          null,
          e,
          t,
          r,
          n,
          i,
          u,
          d,
          v,
          _,
          T,
          D,
          k,
          null,
          z,
          w
        )
      ), Ta(e, r, d, !T);
      return;
    }
    dp(
      e,
      t,
      r,
      n,
      i,
      u,
      d,
      v,
      _,
      T,
      D,
      k
    );
  }
  function y1(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var u = n[i], r = u.getSnapshot;
          u = u.value;
          try {
            if (!Jt(r(), u)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function Ta(e, t, n, i) {
    t = Wf(e, t), t &= ~Ds, t &= ~ri, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var u = t; 0 < u; ) {
      var r = 31 - Xt(u), d = 1 << r;
      i[r] = -1, u &= ~d;
    }
    n !== 0 && td(e, n, t);
  }
  function Hs() {
    return (Ce & 6) === 0 ? (iu(0), !1) : !0;
  }
  function yo() {
    if (ge !== null) {
      if (Re === 0)
        var e = ge.return;
      else
        e = ge, Jn = Ia = null, Oc(e), Hi = null, Ll = 0, e = ge;
      for (; e !== null; )
        Tm(e.alternate, e), e = e.return;
      ge = null;
    }
  }
  function Wi(e, t) {
    var n = e.timeoutHandle;
    return n !== -1 && (e.timeoutHandle = -1, L1(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), qn = 0, yo(), ke = e, ge = n = Xn(e.current, null), Se = t, Re = 0, Pt = null, Oa = !1, Xi = jl(e, t), ho = !1, Ki = Wt = Ds = ri = za = We = 0, Bt = nu = null, mo = !1, ta = Wf(e, t), Xu(), n;
  }
  function lp(e, t) {
    he = null, X.H = gs, t === ki || t === is ? (t = dh(), Re = 3) : t === fc ? (t = dh(), Re = 4) : Re = t === Hc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Pt = t, ge === null && (We = 1, bs(
      e,
      cn(t, e.current)
    ));
  }
  function up() {
    var e = yt.current;
    return e === null ? !0 : (Se & 4194048) === Se ? zt === null : (Se & 62914560) === Se || (Se & 536870912) !== 0 ? e === zt : !1;
  }
  function sp() {
    var e = X.H;
    return X.H = gs, e === null ? gs : e;
  }
  function rp() {
    var e = X.A;
    return X.A = p1, e;
  }
  function Bs() {
    We = 4, Oa || (Se & 4194048) !== Se && yt.current !== null || (Xi = !0), (za & 134217727) === 0 && (ri & 134217727) === 0 || ke === null || Ta(
      ke,
      Se,
      Wt,
      !1
    );
  }
  function go(e, t, n) {
    var i = Ce;
    Ce |= 2;
    var u = sp(), r = rp();
    (ke !== e || Se !== t) && (Zs = null, Wi(e, t)), t = !1;
    var d = We;
    e: do
      try {
        if (Re !== 0 && ge !== null) {
          var v = ge, _ = Pt;
          switch (Re) {
            case 8:
              yo(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              yt.current === null && (t = !0);
              var T = Re;
              if (Re = 0, Pt = null, el(e, v, _, T), n && Xi) {
                d = 0;
                break e;
              }
              break;
            default:
              T = Re, Re = 0, Pt = null, el(e, v, _, T);
          }
        }
        g1(), d = We;
        break;
      } catch (D) {
        lp(e, D);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Jn = Ia = null, Ce = i, X.H = u, X.A = r, ge === null && (ke = null, Se = 0, Xu()), d;
  }
  function g1() {
    for (; ge !== null; ) cp(ge);
  }
  function b1(e, t) {
    var n = Ce;
    Ce |= 2;
    var i = sp(), u = rp();
    ke !== e || Se !== t ? (Zs = null, qs = Gt() + 500, Wi(e, t)) : Xi = jl(
      e,
      t
    );
    e: do
      try {
        if (Re !== 0 && ge !== null) {
          t = ge;
          var r = Pt;
          t: switch (Re) {
            case 1:
              Re = 0, Pt = null, el(e, t, r, 1);
              break;
            case 2:
            case 9:
              if (oh(r)) {
                Re = 0, Pt = null, op(t);
                break;
              }
              t = function() {
                Re !== 2 && Re !== 9 || ke !== e || (Re = 7), Zn(e);
              }, r.then(t, t);
              break e;
            case 3:
              Re = 7;
              break e;
            case 4:
              Re = 5;
              break e;
            case 7:
              oh(r) ? (Re = 0, Pt = null, op(t)) : (Re = 0, Pt = null, el(e, t, r, 7));
              break;
            case 5:
              var d = null;
              switch (ge.tag) {
                case 26:
                  d = ge.memoizedState;
                case 5:
                case 27:
                  var v = ge;
                  if (d ? tv(d) : v.stateNode.complete) {
                    Re = 0, Pt = null;
                    var _ = v.sibling;
                    if (_ !== null) ge = _;
                    else {
                      var T = v.return;
                      T !== null ? (ge = T, Ls(T)) : ge = null;
                    }
                    break t;
                  }
              }
              Re = 0, Pt = null, el(e, t, r, 5);
              break;
            case 6:
              Re = 0, Pt = null, el(e, t, r, 6);
              break;
            case 8:
              yo(), We = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        _1();
        break;
      } catch (D) {
        lp(e, D);
      }
    while (!0);
    return Jn = Ia = null, X.H = i, X.A = u, Ce = n, ge !== null ? 0 : (ke = null, Se = 0, Xu(), We);
  }
  function _1() {
    for (; ge !== null && !Er(); )
      cp(ge);
  }
  function cp(e) {
    var t = zm(e.alternate, e, ta);
    e.memoizedProps = e.pendingProps, t === null ? Ls(e) : ge = t;
  }
  function op(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = gm(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          Se
        );
        break;
      case 11:
        t = gm(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          Se
        );
        break;
      case 5:
        Oc(t);
        var i = t;
        i === ft && (ve ? (Wu(i), i.tag === 5 && i.stateNode != null && (Le = i.stateNode)) : (Wu(i), ve = !0));
      default:
        Tm(n, t), t = ge = Wd(t, ta), t = zm(n, t, ta);
    }
    e.memoizedProps = e.pendingProps, t === null ? Ls(e) : ge = t;
  }
  function el(e, t, n, i) {
    Jn = Ia = null, Oc(t), Hi = null, Ll = 0;
    var u = t.return;
    try {
      if (s1(
        e,
        u,
        t,
        n,
        Se
      )) {
        We = 1, bs(
          e,
          cn(n, e.current)
        ), ge = null;
        return;
      }
    } catch (r) {
      if (u !== null) throw ge = u, r;
      We = 1, bs(
        e,
        cn(n, e.current)
      ), ge = null;
      return;
    }
    t.flags & 32768 ? (ve || i === 1 ? e = !0 : Xi || (Se & 536870912) !== 0 ? e = !1 : (Oa = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = yt.current, i !== null && i.tag === 13 && (i.flags |= 16384))), fp(t, e)) : Ls(t);
  }
  function Ls(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        fp(
          t,
          Oa
        );
        return;
      }
      e = t.return;
      var n = f1(
        t.alternate,
        t,
        ta
      );
      if (n !== null) {
        ge = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        ge = t;
        return;
      }
      ge = t = e;
    } while (t !== null);
    We === 0 && (We = 5);
  }
  function fp(e, t) {
    do {
      var n = d1(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, ge = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        ge = e;
        return;
      }
      ge = e = n;
    } while (e !== null);
    We = 6, ge = null;
  }
  function dp(e, t, n, i, u, r, d, v, _, T, D, k) {
    e.cancelPendingCommit = null;
    do
      Qs();
    while (Je !== 0);
    if ((Ce & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      e === ke && (ge = ke = null, Se = 0), ci = t, jn = e, qn = n, vo = u, tp = i, S1(
        e,
        t,
        n,
        d,
        v,
        _,
        k
      );
    }
  }
  function S1(e, t, n, i, u, r, d) {
    var v = t.lanes | t.childLanes;
    if (po = v, v |= Pr, Xg(
      e,
      n,
      v,
      i,
      u,
      r
    ), Ii = null, (n & 335544064) === n ? (Fi = J0(e), i = 10262) : (Fi = null, i = 10256), (t.subtreeFlags & i) !== 0 || (t.flags & i) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, T1(Au, function() {
      return xo(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Ts = !1, i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
      i = X.T, X.T = null, u = re.p, re.p = 2, r = Ce, Ce |= 4;
      try {
        h1(e, t, n);
      } finally {
        Ce = r, re.p = u, X.T = i;
      }
    }
    Je = 1, Ts ? Ji = X1(
      d,
      e.containerInfo,
      Fi,
      bo,
      _o,
      j1,
      So,
      xo,
      x1
    ) : (bo(), _o(), So());
  }
  function x1(e) {
    if (Je !== 0) {
      var t = jn.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function j1() {
    Je === 3 && (Je = 0, Km(ci, jn), Je = 4);
  }
  function bo() {
    if (Je === 1) {
      Je = 0;
      var e = jn, t = ci, n = qn, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = X.T, X.T = null;
        var u = re.p;
        re.p = 2;
        var r = Ce;
        Ce |= 4;
        try {
          Wl = As = !1, Vm(t, e, n), n = Do;
          var d = Yd(e.containerInfo), v = n.focusedElem, _ = n.selectionRange;
          if (d !== v && v && v.ownerDocument && Qd(
            v.ownerDocument.documentElement,
            v
          )) {
            if (_ !== null && Xr(v)) {
              var T = _.start, D = _.end;
              if (D === void 0 && (D = T), "selectionStart" in v)
                v.selectionStart = T, v.selectionEnd = Math.min(
                  D,
                  v.value.length
                );
              else {
                var k = v.ownerDocument || document, z = k && k.defaultView || window;
                if (z.getSelection) {
                  var w = z.getSelection(), V = v.textContent.length, W = Math.min(_.start, V), me = _.end === void 0 ? W : Math.min(_.end, V);
                  !w.extend && W > me && (d = me, me = W, W = d);
                  var E = Ld(
                    v,
                    W
                  ), x = Ld(
                    v,
                    me
                  );
                  if (E && x && (w.rangeCount !== 1 || w.anchorNode !== E.node || w.anchorOffset !== E.offset || w.focusNode !== x.node || w.focusOffset !== x.offset)) {
                    var C = k.createRange();
                    C.setStart(E.node, E.offset), w.removeAllRanges(), W > me ? (w.addRange(C), w.extend(x.node, x.offset)) : (C.setEnd(x.node, x.offset), w.addRange(C));
                  }
                }
              }
            }
            for (k = [], w = v; w = w.parentNode; )
              w.nodeType === 1 && k.push({
                element: w,
                left: w.scrollLeft,
                top: w.scrollTop
              });
            for (typeof v.focus == "function" && v.focus(), v = 0; v < k.length; v++) {
              var Z = k[v];
              Z.element.scrollLeft = Z.left, Z.element.scrollTop = Z.top;
            }
          }
          rl = !!Mo, Do = Mo = null;
        } finally {
          Ce = r, re.p = u, X.T = i;
        }
      }
      e.current = t, Je = 2;
    }
  }
  function _o() {
    if (Je === 2) {
      Je = 0;
      var e = jn, t = ci, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = X.T, X.T = null;
        var i = re.p;
        re.p = 2;
        var u = Ce;
        Ce |= 4;
        try {
          Bm(e, t.alternate, t);
        } finally {
          Ce = u, re.p = i, X.T = n;
        }
      }
      Je = 3;
    }
  }
  function So() {
    if (Je === 4 || Je === 3) {
      Je = 0;
      var e = Ji;
      Ji = null, kg();
      var t = jn, n = ci, i = qn, u = tp, r = (i & 335544064) === i ? 10262 : 10256;
      if ((n.subtreeFlags & r) !== 0 || (n.flags & r) !== 0 ? Je = 5 : (Je = 0, ci = jn = null, hp(t, t.pendingLanes)), r = t.pendingLanes, r === 0 && (Ea = null), Cr(i), n = n.stateNode, Vt && typeof Vt.onCommitFiberRoot == "function")
        try {
          Vt.onCommitFiberRoot(
            xl,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (u !== null) {
        n = X.T, r = re.p, re.p = 2, X.T = null;
        try {
          for (var d = t.onRecoverableError, v = 0; v < u.length; v++) {
            var _ = u[v];
            d(_.value, {
              componentStack: _.stack
            });
          }
        } finally {
          X.T = n, re.p = r;
        }
      }
      if (u = Ii, d = Fi, Fi = null, u !== null && (Ii = null, d === null && (d = []), e !== null))
        for (_ = 0; _ < u.length; _++)
          n = (0, u[_])(
            d
          ), n !== void 0 && e.finished.finally(n);
      (qn & 3) !== 0 && Qs(), Zn(t), r = t.pendingLanes, (i & 261930) !== 0 && (r & 42) !== 0 ? t === ks ? au++ : (au = 0, ks = t) : (au = 0, ks = null), iu(0);
    }
  }
  function hp(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, kl(t)));
  }
  function Qs() {
    return Ji !== null && (Ji.skipTransition(), Ji = null), bo(), _o(), So(), xo();
  }
  function xo() {
    if (Je !== 5) return !1;
    var e = jn, t = po;
    po = 0;
    var n = Cr(qn), i = X.T, u = re.p;
    try {
      re.p = 32 > n ? 32 : n, X.T = null, n = vo, vo = null;
      var r = jn, d = qn;
      if (Je = 0, ci = jn = null, qn = 0, (Ce & 6) !== 0) throw Error(c(331));
      var v = Ce;
      if (Ce |= 4, Pm(r.current), Jm(
        r,
        r.current,
        d,
        n
      ), Ce = v, iu(0, !1), Vt && typeof Vt.onPostCommitFiberRoot == "function")
        try {
          Vt.onPostCommitFiberRoot(xl, r);
        } catch {
        }
      return !0;
    } finally {
      re.p = u, X.T = i, hp(e, t);
    }
  }
  function mp(e, t, n) {
    t = cn(n, t), t = kc(e.stateNode, t, 2), e = ga(e, t, 2), e !== null && (Ol(e, 2), Zn(e));
  }
  function Me(e, t, n) {
    if (e.tag === 3)
      mp(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          mp(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (Ea === null || !Ea.has(i))) {
            e = cn(n, e), n = om(2), i = ga(t, n, 2), i !== null && (fm(
              n,
              i,
              t,
              e
            ), Ol(i, 2), Zn(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function jo(e, t, n) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new v1();
      var u = /* @__PURE__ */ new Set();
      i.set(t, u);
    } else
      u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u));
    u.has(n) || (ho = !0, u.add(n), e = O1.bind(null, e, t, n), t.then(e, e));
  }
  function O1(e, t, n) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, ke === e && (Se & n) === n && ((We === 4 || We === 3 && (Se & 62914560) === Se && 300 > Gt() - Us) && (Ce & 2) === 0 ? Wi(e, 0) : Ds |= n, Ki === Se && (Ki = 0)), Zn(e);
  }
  function pp(e, t) {
    t === 0 && (t = ed()), e = Xa(e, t), e !== null && (Ol(e, t), Zn(e));
  }
  function z1(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), pp(e, n);
  }
  function E1(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode, u = e.memoizedState;
        u !== null && (n = u.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(c(314));
    }
    i !== null && i.delete(t), pp(e, n);
  }
  function T1(e, t) {
    return Te(e, t);
  }
  var tl = null, nl = null, Oo = !1, Ys = !1, zo = !1, Na = 0;
  function Zn(e) {
    e !== nl && e.next === null && (nl === null ? tl = nl = e : nl = nl.next = e), Ys = !0, Oo || (Oo = !0, C1());
  }
  function iu(e, t) {
    if (!zo && Ys) {
      zo = !0;
      do
        for (var n = !1, i = tl; i !== null; ) {
          if (e !== 0) {
            var u = i.pendingLanes;
            if (u === 0) var r = 0;
            else {
              var d = i.suspendedLanes, v = i.pingedLanes;
              r = (1 << 31 - Xt(42 | e) + 1) - 1, r &= u & ~(d & ~v), r = r & 201326741 ? r & 201326741 | 1 : r ? r | 2 : 0;
            }
            r !== 0 && (n = !0, bp(i, r));
          } else
            r = Se, r = Du(
              i,
              i === ke ? r : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (r & 3) === 0 || jl(i, r) || (n = !0, bp(i, r));
          i = i.next;
        }
      while (n);
      zo = !1;
    }
  }
  function N1() {
    vp();
  }
  function vp() {
    Ys = Oo = !1;
    var e = 0;
    Na !== 0 && B1() && (e = Na);
    for (var t = Gt(), n = null, i = tl; i !== null; ) {
      var u = i.next, r = yp(i, t);
      r === 0 ? (i.next = null, n === null ? tl = u : n.next = u, u === null && (nl = n)) : (n = i, (e !== 0 || (r & 3) !== 0) && (Ys = !0)), i = u;
    }
    Je !== 0 && Je !== 5 || iu(e), Na !== 0 && (Na = 0);
  }
  function yp(e, t) {
    for (var n = e.suspendedLanes, i = e.pingedLanes, u = e.expirationTimes, r = e.pendingLanes & -62914561; 0 < r; ) {
      var d = 31 - Xt(r), v = 1 << d, _ = u[d];
      _ === -1 ? ((v & n) === 0 || (v & i) !== 0) && (u[d] = Vg(v, t)) : _ <= t && (e.expiredLanes |= v), r &= ~v;
    }
    if (t = ke, n = Se, n = Du(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, n === 0 || e === t && (Re === 2 || Re === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && Ut(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || jl(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (i !== null && Ut(i), Cr(n)) {
        case 2:
        case 8:
          n = Ff;
          break;
        case 32:
          n = Au;
          break;
        case 268435456:
          n = Pf;
          break;
        default:
          n = Au;
      }
      return i = gp.bind(null, e), n = Te(n, i), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return i !== null && i !== null && Ut(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function gp(e, t) {
    if (Je !== 0 && Je !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Qs() && e.callbackNode !== n)
      return null;
    var i = Se;
    return i = Du(
      e,
      e === ke ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (ap(e, i, t), yp(e, Gt()), e.callbackNode != null && e.callbackNode === n ? gp.bind(null, e) : null);
  }
  function bp(e, t) {
    if (Qs()) return null;
    ap(e, t, !0);
  }
  function C1() {
    Q1(function() {
      (Ce & 6) !== 0 ? Te(
        If,
        N1
      ) : vp();
    });
  }
  function Eo() {
    if (Na === 0) {
      var e = Wa;
      e === 0 && (e = wu, wu <<= 1, (wu & 261888) === 0 && (wu = 256)), Na = e;
    }
    return Na;
  }
  function _p(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Hu(e);
  }
  function A1(e, t, n, i, u) {
    if (t === "submit" && n && n.stateNode === u) {
      var r = _p(
        (u[qt] || null).action
      ), d = i.submitter;
      d && (t = (t = d[qt] || null) ? _p(t.formAction) : d.getAttribute("formAction"), t !== null && (r = t, d = null));
      var v = new Yu(
        "action",
        "action",
        null,
        i,
        u
      );
      e.push({
        event: v,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (Na !== 0) {
                  var _ = new FormData(u, d);
                  Mc(
                    n,
                    {
                      pending: !0,
                      data: _,
                      method: u.method,
                      action: r
                    },
                    null,
                    _
                  );
                }
              } else
                typeof r == "function" && (v.preventDefault(), _ = new FormData(u, d), Mc(
                  n,
                  {
                    pending: !0,
                    data: _,
                    method: u.method,
                    action: r
                  },
                  r,
                  _
                ));
            },
            currentTarget: u
          }
        ]
      });
    }
  }
  for (var To = 0; To < Fr.length; To++) {
    var No = Fr[To], w1 = No.toLowerCase(), R1 = No[0].toUpperCase() + No.slice(1);
    bn(
      w1,
      "on" + R1
    );
  }
  bn(Vd, "onAnimationEnd"), bn(Xd, "onAnimationIteration"), bn(Kd, "onAnimationStart"), bn("dblclick", "onDoubleClick"), bn("focusin", "onFocus"), bn("focusout", "onBlur"), bn(L0, "onTransitionRun"), bn(Q0, "onTransitionStart"), bn(Y0, "onTransitionCancel"), bn(Jd, "onTransitionEnd"), Oi("onMouseEnter", ["mouseout", "mouseover"]), Oi("onMouseLeave", ["mouseout", "mouseover"]), Oi("onPointerEnter", ["pointerout", "pointerover"]), Oi("onPointerLeave", ["pointerout", "pointerover"]), $a(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), $a(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), $a("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), $a(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), $a(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), $a(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var lu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), M1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(lu)
  );
  function Sp(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var i = e[n], u = i.event;
      i = i.listeners;
      e: {
        var r = void 0;
        if (t)
          for (var d = i.length - 1; 0 <= d; d--) {
            var v = i[d], _ = v.instance, T = v.currentTarget;
            if (v = v.listener, _ !== r && u.isPropagationStopped())
              break e;
            r = v, u.currentTarget = T;
            try {
              r(u);
            } catch (D) {
              Vu(D);
            }
            u.currentTarget = null, r = _;
          }
        else
          for (d = 0; d < i.length; d++) {
            if (v = i[d], _ = v.instance, T = v.currentTarget, v = v.listener, _ !== r && u.isPropagationStopped())
              break e;
            r = v, u.currentTarget = T;
            try {
              r(u);
            } catch (D) {
              Vu(D);
            }
            u.currentTarget = null, r = _;
          }
      }
    }
  }
  function be(e, t) {
    var n = t[ud];
    n === void 0 && (n = t[ud] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    n.has(i) || (xp(t, e, 2, !1), n.add(i));
  }
  function Co(e, t, n) {
    var i = 0;
    t && (i |= 4), xp(
      n,
      e,
      i,
      t
    );
  }
  var $s = "_reactListening" + Math.random().toString(36).slice(2);
  function Ao(e) {
    if (!e[$s]) {
      e[$s] = !0, cd.forEach(function(n) {
        n !== "selectionchange" && (M1.has(n) || Co(n, !1, e), Co(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[$s] || (t[$s] = !0, Co("selectionchange", !1, t));
    }
  }
  function xp(e, t, n, i) {
    switch (fv(t)) {
      case 2:
        var u = zb;
        break;
      case 8:
        u = Eb;
        break;
      default:
        u = Io;
    }
    n = u.bind(
      null,
      t,
      n,
      e
    ), u = void 0, !Zr || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), i ? u !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, n, !0) : u !== void 0 ? e.addEventListener(t, n, {
      passive: u
    }) : e.addEventListener(t, n, !1);
  }
  function wo(e, t, n, i, u) {
    var r = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var d = i.tag;
        if (d === 3 || d === 4) {
          var v = i.stateNode.containerInfo;
          if (v === u) break;
          if (d === 4)
            for (d = i.return; d !== null; ) {
              var _ = d.tag;
              if ((_ === 3 || _ === 4) && d.stateNode.containerInfo === u)
                return;
              d = d.return;
            }
          for (; v !== null; ) {
            if (d = Ya(v), d === null) return;
            if (_ = d.tag, _ === 5 || _ === 6 || _ === 26 || _ === 27) {
              i = r = d;
              continue e;
            }
            v = v.parentNode;
          }
        }
        i = i.return;
      }
    xd(function() {
      var T = r, D = Ur(n), k = [];
      e: {
        var z = Id.get(e);
        if (z !== void 0) {
          var w = Yu, V = e;
          switch (e) {
            case "keypress":
              if (Lu(n) === 0) break e;
            case "keydown":
            case "keyup":
              w = y0;
              break;
            case "focusin":
              V = "focus", w = Lr;
              break;
            case "focusout":
              V = "blur", w = Lr;
              break;
            case "beforeblur":
            case "afterblur":
              w = Lr;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              w = zd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              w = l0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              w = x0;
              break;
            case Vd:
            case Xd:
            case Kd:
              w = r0;
              break;
            case Jd:
              w = O0;
              break;
            case "scroll":
            case "scrollend":
              w = a0;
              break;
            case "wheel":
              w = E0;
              break;
            case "copy":
            case "cut":
            case "paste":
              w = o0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              w = Td;
              break;
            case "submit":
              w = _0;
              break;
            case "toggle":
            case "beforetoggle":
              w = N0;
          }
          var W = (t & 4) !== 0, me = !W && (e === "scroll" || e === "scrollend"), E = W ? z !== null ? z + "Capture" : null : z;
          W = [];
          for (var x = T, C; x !== null; ) {
            var Z = x;
            if (C = Z.stateNode, Z = Z.tag, Z !== 5 && Z !== 26 && Z !== 27 || C === null || E === null || (Z = Tl(x, E), Z != null && W.push(
              uu(x, Z, C)
            )), me) break;
            x = x.return;
          }
          0 < W.length && (z = new w(
            z,
            V,
            null,
            n,
            D
          ), k.push({ event: z, listeners: W }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (w = e === "mouseover" || e === "pointerover", z = e === "mouseout" || e === "pointerout", w && n !== Dr && (V = n.relatedTarget || n.fromElement) && (Ya(V) || V[Si]))
            break e;
          (z || w) && (V = D.window === D ? D : (w = D.ownerDocument) ? w.defaultView || w.parentWindow : window, z ? (w = n.relatedTarget || n.toElement, z = T, w = w ? Ya(w) : null, w !== null && (me = h(w), W = w.tag, w !== me || W !== 5 && W !== 27 && W !== 6) && (w = null)) : (z = null, w = T), z !== w && (W = zd, Z = "onMouseLeave", E = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (W = Td, Z = "onPointerLeave", E = "onPointerEnter", x = "pointer"), me = z == null ? V : El(z), C = w == null ? V : El(w), V = new W(
            Z,
            x + "leave",
            z,
            n,
            D
          ), V.target = me, V.relatedTarget = C, Z = null, Ya(D) === T && (W = new W(
            E,
            x + "enter",
            w,
            n,
            D
          ), W.target = C, W.relatedTarget = me, Z = W), me = Z, W = z && w ? I(
            z,
            w,
            D1
          ) : null, z !== null && jp(
            k,
            V,
            z,
            W,
            !1
          ), w !== null && me !== null && jp(
            k,
            me,
            w,
            W,
            !0
          )));
        }
        e: {
          if (z = T ? El(T) : window, w = z.nodeName && z.nodeName.toLowerCase(), w === "select" || w === "input" && z.type === "file")
            var K = Ud;
          else if (Md(z))
            if (qd)
              K = k0;
            else {
              K = q0;
              var xe = U0;
            }
          else
            w = z.nodeName, !w || w.toLowerCase() !== "input" || z.type !== "checkbox" && z.type !== "radio" ? T && Mr(T.elementType) && (K = Ud) : K = Z0;
          if (K && (K = K(e, T))) {
            Dd(
              k,
              K,
              n,
              D
            );
            break e;
          }
          xe && xe(e, z, T);
        }
        switch (xe = T ? El(T) : window, e) {
          case "focusin":
            (Md(xe) || xe.contentEditable === "true") && (Ai = xe, Kr = T, Ul = null);
            break;
          case "focusout":
            Ul = Kr = Ai = null;
            break;
          case "mousedown":
            Jr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Jr = !1, $d(k, n, D);
            break;
          case "selectionchange":
            if (B0) break;
          case "keydown":
          case "keyup":
            $d(k, n, D);
        }
        var ae;
        if (Yr)
          e: {
            switch (e) {
              case "compositionstart":
                var ue = "onCompositionStart";
                break e;
              case "compositionend":
                ue = "onCompositionEnd";
                break e;
              case "compositionupdate":
                ue = "onCompositionUpdate";
                break e;
            }
            ue = void 0;
          }
        else
          Ci ? wd(e, n) && (ue = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (ue = "onCompositionStart");
        ue && (Nd && n.locale !== "ko" && (Ci || ue !== "onCompositionStart" ? ue === "onCompositionEnd" && Ci && (ae = jd()) : (ca = D, kr = "value" in ca ? ca.value : ca.textContent, Ci = !0)), xe = Gs(T, ue), 0 < xe.length && (ue = new Ed(
          ue,
          e,
          null,
          n,
          D
        ), k.push({ event: ue, listeners: xe }), ae ? ue.data = ae : (ae = Rd(n), ae !== null && (ue.data = ae)))), (ae = A0 ? w0(e, n) : R0(e, n)) && (ue = Gs(T, "onBeforeInput"), 0 < ue.length && (xe = new Ed(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          D
        ), k.push({
          event: xe,
          listeners: ue
        }), xe.data = ae)), A1(
          k,
          e,
          T,
          n,
          D
        );
      }
      Sp(k, t);
    });
  }
  function uu(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function Gs(e, t) {
    for (var n = t + "Capture", i = []; e !== null; ) {
      var u = e, r = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || r === null || (u = Tl(e, n), u != null && i.unshift(
        uu(e, u, r)
      ), u = Tl(e, t), u != null && i.push(
        uu(e, u, r)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function D1(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function jp(e, t, n, i, u) {
    for (var r = t._reactName, d = []; n !== null && n !== i; ) {
      var v = n, _ = v.alternate, T = v.stateNode;
      if (v = v.tag, _ !== null && _ === i) break;
      v !== 5 && v !== 26 && v !== 27 || T === null || (_ = T, u ? (T = Tl(n, r), T != null && d.unshift(
        uu(n, T, _)
      )) : u || (T = Tl(n, r), T != null && d.push(
        uu(n, T, _)
      ))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var U1 = /\r\n?/g, q1 = /\u0000|\uFFFD/g;
  function Op(e) {
    return (typeof e == "string" ? e : "" + e).replace(U1, `
`).replace(q1, "");
  }
  function zp(e, t) {
    return t = Op(t), Op(e) === t;
  }
  function De(e, t, n, i, u, r) {
    switch (n) {
      case "children":
        if (typeof i == "string")
          t === "body" || t === "textarea" && i === "" || Ei(e, i);
        else if (typeof i == "number" || typeof i == "bigint")
          t !== "body" && Ei(e, "" + i);
        else return;
        break;
      case "className":
        ku(e, "class", i);
        break;
      case "tabIndex":
        ku(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ku(e, n, i);
        break;
      case "style":
        _d(e, i, r);
        return;
      case "data":
        if (t !== "object") {
          ku(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        i = Hu(i), e.setAttribute(n, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof r == "function" && (n === "formAction" ? (t !== "input" && De(e, t, "name", u.name, u, null), De(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), De(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), De(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (De(e, t, "encType", u.encType, u, null), De(e, t, "method", u.method, u, null), De(e, t, "target", u.target, u, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        i = Hu(i), e.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (e.onclick = Tn);
        return;
      case "onScroll":
        i != null && be("scroll", e);
        return;
      case "onScrollEnd":
        i != null && be("scrollend", e);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(c(61));
          if (n = i.__html, n != null) {
            if (u.children != null) throw Error(c(60));
            r?.__html !== n && (e.innerHTML = n);
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Hu(i), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, i) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0 ? e.setAttribute(n, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, i) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? e.setAttribute(n, i) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(n) : e.setAttribute(n, i);
        break;
      case "popover":
        be("beforetoggle", e), be("toggle", e), Zu(e, "popover", i);
        break;
      case "xlinkActuate":
        Yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        Yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        Yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        Yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        Yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        Yn(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        Yn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        Yn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        Yn(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        Zu(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = t0.get(n) || n, Zu(e, n, i);
        else return;
    }
    Ne = !0;
  }
  function Ro(e, t, n, i, u, r) {
    switch (n) {
      case "style":
        _d(e, i, r);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(c(61));
          if (n = i.__html, n != null) {
            if (u.children != null) throw Error(c(60));
            r?.__html !== n && (e.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof i == "string") Ei(e, i);
        else if (typeof i == "number" || typeof i == "bigint")
          Ei(e, "" + i);
        else return;
        break;
      case "onScroll":
        i != null && be("scroll", e);
        return;
      case "onScrollEnd":
        i != null && be("scrollend", e);
        return;
      case "onClick":
        i != null && (e.onclick = Tn);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!od.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (u = n.endsWith("Capture"), r = n.slice(2, u ? n.length - 7 : void 0), t = e[qt] || null, t = t != null ? t[n] : null, typeof t == "function" && e.removeEventListener(r, t, u), typeof i == "function")) {
              typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(r, i, u);
              break e;
            }
            Ne = !0, n in e ? e[n] = i : i === !0 ? e.setAttribute(n, "") : Zu(e, n, i);
          }
        return;
    }
    Ne = !0;
  }
  function _t(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        be("error", e), be("load", e);
        var i = !1, u = !1, r;
        for (r in n)
          if (n.hasOwnProperty(r)) {
            var d = n[r];
            if (d != null)
              switch (r) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(c(137, t));
                default:
                  De(e, t, r, d, n, null);
              }
          }
        u && De(e, t, "srcSet", n.srcSet, n, null), i && De(e, t, "src", n.src, n, null);
        return;
      case "input":
        be("invalid", e);
        var v = r = d = u = null, _ = null, T = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var D = n[i];
            if (D != null)
              switch (i) {
                case "name":
                  u = D;
                  break;
                case "type":
                  d = D;
                  break;
                case "checked":
                  _ = D;
                  break;
                case "defaultChecked":
                  T = D;
                  break;
                case "value":
                  r = D;
                  break;
                case "defaultValue":
                  v = D;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (D != null)
                    throw Error(c(137, t));
                  break;
                default:
                  De(e, t, i, D, n, null);
              }
          }
        vd(
          e,
          r,
          v,
          _,
          T,
          d,
          u,
          !1
        );
        return;
      case "select":
        be("invalid", e), i = d = r = null;
        for (u in n)
          if (n.hasOwnProperty(u) && (v = n[u], v != null))
            switch (u) {
              case "value":
                r = v;
                break;
              case "defaultValue":
                d = v;
                break;
              case "multiple":
                i = v;
              default:
                De(e, t, u, v, n, null);
            }
        t = r, n = d, e.multiple = !!i, t != null ? zi(e, !!i, t, !1) : n != null && zi(e, !!i, n, !0);
        return;
      case "textarea":
        be("invalid", e), r = u = i = null;
        for (d in n)
          if (n.hasOwnProperty(d) && (v = n[d], v != null))
            switch (d) {
              case "value":
                i = v;
                break;
              case "defaultValue":
                u = v;
                break;
              case "children":
                r = v;
                break;
              case "dangerouslySetInnerHTML":
                if (v != null) throw Error(c(91));
                break;
              default:
                De(e, t, d, v, n, null);
            }
        gd(e, i, u, r);
        return;
      case "option":
        for (_ in n)
          n.hasOwnProperty(_) && (i = n[_], i != null) && (_ === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : De(e, t, _, i, n, null));
        return;
      case "dialog":
        be("beforetoggle", e), be("toggle", e), be("cancel", e), be("close", e);
        break;
      case "iframe":
      case "object":
        be("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < lu.length; i++)
          be(lu[i], e);
        break;
      case "image":
        be("error", e), be("load", e);
        break;
      case "details":
        be("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        be("error", e), be("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (T in n)
          if (n.hasOwnProperty(T) && (i = n[T], i != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(c(137, t));
              default:
                De(e, t, T, i, n, null);
            }
        return;
      default:
        if (Mr(t)) {
          for (D in n)
            n.hasOwnProperty(D) && (i = n[D], i !== void 0 && Ro(
              e,
              t,
              D,
              i,
              n,
              void 0
            ));
          return;
        }
    }
    for (v in n)
      n.hasOwnProperty(v) && (i = n[v], i != null && De(e, t, v, i, n, null));
  }
  var Z1 = {};
  function k1(e, t, n, i) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var u = null, r = null, d = null, v = null, _ = null, T = null, D = null;
        for (w in n) {
          var k = n[w];
          if (n.hasOwnProperty(w) && k != null)
            switch (w) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                _ = k;
              default:
                i.hasOwnProperty(w) || De(e, t, w, null, i, k);
            }
        }
        for (var z in i) {
          var w = i[z];
          if (k = n[z], i.hasOwnProperty(z) && (w != null || k != null))
            switch (z) {
              case "type":
                w !== k && (Ne = !0), r = w;
                break;
              case "name":
                w !== k && (Ne = !0), u = w;
                break;
              case "checked":
                w !== k && (Ne = !0), T = w;
                break;
              case "defaultChecked":
                w !== k && (Ne = !0), D = w;
                break;
              case "value":
                w !== k && (Ne = !0), d = w;
                break;
              case "defaultValue":
                w !== k && (Ne = !0), v = w;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (w != null)
                  throw Error(c(137, t));
                break;
              default:
                w !== k && De(
                  e,
                  t,
                  z,
                  w,
                  i,
                  k
                );
            }
        }
        wr(
          e,
          d,
          v,
          _,
          T,
          D,
          r,
          u
        );
        return;
      case "select":
        w = d = v = z = null;
        for (r in n)
          if (_ = n[r], n.hasOwnProperty(r) && _ != null)
            switch (r) {
              case "value":
                break;
              case "multiple":
                w = _;
              default:
                i.hasOwnProperty(r) || De(
                  e,
                  t,
                  r,
                  null,
                  i,
                  _
                );
            }
        for (u in i)
          if (r = i[u], _ = n[u], i.hasOwnProperty(u) && (r != null || _ != null))
            switch (u) {
              case "value":
                r !== _ && (Ne = !0), z = r;
                break;
              case "defaultValue":
                r !== _ && (Ne = !0), v = r;
                break;
              case "multiple":
                r !== _ && (Ne = !0), d = r;
              default:
                r !== _ && De(
                  e,
                  t,
                  u,
                  r,
                  i,
                  _
                );
            }
        t = v, n = d, i = w, z != null ? zi(e, !!n, z, !1) : !!i != !!n && (t != null ? zi(e, !!n, t, !0) : zi(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        w = z = null;
        for (v in n)
          if (u = n[v], n.hasOwnProperty(v) && u != null && !i.hasOwnProperty(v))
            switch (v) {
              case "value":
                break;
              case "children":
                break;
              default:
                De(e, t, v, null, i, u);
            }
        for (d in i)
          if (u = i[d], r = n[d], i.hasOwnProperty(d) && (u != null || r != null))
            switch (d) {
              case "value":
                u !== r && (Ne = !0), z = u;
                break;
              case "defaultValue":
                u !== r && (Ne = !0), w = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(c(91));
                break;
              default:
                u !== r && De(e, t, d, u, i, r);
            }
        yd(e, z, w);
        return;
      case "option":
        for (var V in n)
          z = n[V], n.hasOwnProperty(V) && z != null && !i.hasOwnProperty(V) && (V === "selected" ? e.selected = !1 : De(
            e,
            t,
            V,
            null,
            i,
            z
          ));
        for (_ in i)
          z = i[_], w = n[_], i.hasOwnProperty(_) && z !== w && (z != null || w != null) && (_ === "selected" ? (z !== w && (Ne = !0), e.selected = z && typeof z != "function" && typeof z != "symbol") : De(
            e,
            t,
            _,
            z,
            i,
            w
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var W in n)
          z = n[W], n.hasOwnProperty(W) && z != null && !i.hasOwnProperty(W) && De(e, t, W, null, i, z);
        for (T in i)
          if (z = i[T], w = n[T], i.hasOwnProperty(T) && z !== w && (z != null || w != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(c(137, t));
                break;
              default:
                De(
                  e,
                  t,
                  T,
                  z,
                  i,
                  w
                );
            }
        return;
      default:
        if (Mr(t)) {
          for (var me in n)
            z = n[me], n.hasOwnProperty(me) && z !== void 0 && !i.hasOwnProperty(me) && Ro(
              e,
              t,
              me,
              void 0,
              i,
              z
            );
          for (D in i)
            z = i[D], w = n[D], !i.hasOwnProperty(D) || z === w || z === void 0 && w === void 0 || Ro(
              e,
              t,
              D,
              z,
              i,
              w
            );
          return;
        }
    }
    for (var E in n)
      z = n[E], n.hasOwnProperty(E) && z != null && !i.hasOwnProperty(E) && De(e, t, E, null, i, z);
    for (k in i)
      z = i[k], w = n[k], !i.hasOwnProperty(k) || z === w || z == null && w == null || De(e, t, k, z, i, w);
  }
  function Ep(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function H1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var u = n[i], r = u.transferSize, d = u.initiatorType, v = u.duration;
        if (r && v && Ep(d)) {
          for (d = 0, v = u.responseEnd, i += 1; i < n.length; i++) {
            var _ = n[i], T = _.startTime;
            if (T > v) break;
            var D = _.transferSize, k = _.initiatorType;
            D && Ep(k) && (_ = _.responseEnd, d += D * (_ < v ? 1 : (v - T) / (_ - T)));
          }
          if (--i, t += 8 * (r + d) / (u.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var Mo = null, Do = null;
  function su(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Tp(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Np(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Cp(e, t, n, i) {
    return n = su(
      n
    ).createElement(e), n[pt] = i, n[qt] = t, _t(n, e, t), ot(n), n;
  }
  function Uo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var qo = null;
  function B1() {
    var e = window.event;
    return e && e.type === "popstate" ? e === qo ? !1 : (qo = e, !0) : (qo = null, !1);
  }
  var Zo = typeof setTimeout == "function" ? setTimeout : void 0, L1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Ap = typeof Promise == "function" ? Promise : void 0, wp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Zo, Q1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ap < "u" ? function(e) {
    return Ap.resolve(null).then(e).catch(Y1);
  } : Zo;
  function Y1(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ca(e) {
    return e === "head";
  }
  function Rp(e, t) {
    var n = t, i = 0;
    do {
      var u = n.nextSibling;
      if (e.removeChild(n), u && u.nodeType === 8)
        if (n = u.data, n === "/$" || n === "/&") {
          if (i === 0) {
            e.removeChild(u), cl(t);
            return;
          }
          i--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          i++;
        else if (n === "html")
          Go(
            e.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = e.ownerDocument.head, Go(n);
          for (var r = n.firstChild; r; ) {
            var d = r.nextSibling, v = r.nodeName;
            r[zl] || v === "SCRIPT" || v === "STYLE" || v === "LINK" && r.rel.toLowerCase() === "stylesheet" || n.removeChild(r), r = d;
          }
        } else
          n === "body" && Go(e.ownerDocument.body);
      n = u;
    } while (n);
    cl(t);
  }
  function Mp(e, t) {
    var n = e;
    e = 0;
    do {
      var i = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), i && i.nodeType === 8)
        if (n = i.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = i;
    } while (n);
  }
  function Dp(e, t, n) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
      if (t = e.getClientRects(), t.length === 1) var i = 1;
      else
        for (var u = i = 0; u < t.length; u++) {
          var r = t[u];
          0 < r.width && 0 < r.height && i++;
        }
      i === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
    }
  }
  function Up(e, t) {
    e = e.style, t = t.style;
    var n = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n != null ? e.margin = n : (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function $1(e, t, n) {
    return n = n.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
    };
  }
  function ko(e) {
    var t = e.getBoundingClientRect(), n = getComputedStyle(e);
    return $1(t, n, e);
  }
  function G1(e) {
    return e.documentElement.clientHeight;
  }
  function V1(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function X1(e, t, n, i, u, r, d, v, _) {
    var T = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var D = T.startViewTransition({
        update: function() {
          var z = T.defaultView, w = z.navigation && z.navigation.transition, V = T.fonts.status;
          i();
          var W = [];
          if (V === "loaded" && (G1(T), T.fonts.status === "loading" && W.push(T.fonts.ready)), V = W.length, e !== null)
            for (var me = e.suspenseyImages, E = 0, x = 0; x < me.length; x++) {
              var C = me[x];
              if (!C.complete) {
                var Z = C.getBoundingClientRect();
                if (0 < Z.bottom && 0 < Z.right && Z.top < z.innerHeight && Z.left < z.innerWidth) {
                  if (E += nv(C), E > Ks) {
                    W.length = V;
                    break;
                  }
                  C = new Promise(
                    V1.bind(C)
                  ), W.push(C);
                }
              }
            }
          if (0 < W.length)
            return z = Promise.race([
              Promise.all(W),
              new Promise(function(K) {
                return setTimeout(K, 500);
              })
            ]).then(u, u), (w ? Promise.allSettled([w.finished, z]) : z).then(r, r);
          if (u(), w)
            return w.finished.then(
              r,
              r
            );
          r();
        },
        types: n
      });
      T.__reactViewTransition = D;
      var k = [];
      return D.ready.then(
        function() {
          for (var z = T.documentElement.getAnimations({
            subtree: !0
          }), w = 0; w < z.length; w++) {
            var V = z[w], W = V.effect, me = W.pseudoElement;
            if (me != null && me.startsWith("::view-transition")) {
              k.push(V), V = W.getKeyframes();
              for (var E = me = void 0, x = !0, C = 0; C < V.length; C++) {
                var Z = V[C], K = Z.width;
                if (me === void 0) me = K;
                else if (me !== K) {
                  x = !1;
                  break;
                }
                if (K = Z.height, E === void 0) E = K;
                else if (E !== K) {
                  x = !1;
                  break;
                }
                delete Z.width, delete Z.height, Z.transform === "none" && delete Z.transform;
              }
              x && me !== void 0 && E !== void 0 && (W.setKeyframes(V), x = getComputedStyle(
                W.target,
                W.pseudoElement
              ), x.width !== me || x.height !== E) && (x = V[0], x.width = me, x.height = E, x = V[V.length - 1], x.width = me, x.height = E, W.setKeyframes(V));
            }
          }
          d();
        },
        function(z) {
          T.__reactViewTransition === D && (T.__reactViewTransition = null);
          try {
            typeof z == "object" && z !== null && z.name === "InvalidStateError" && (z.message === "View transition was skipped because document visibility state is hidden." || z.message === "Skipping view transition because document visibility state has become hidden." || z.message === "Skipping view transition because viewport size changed." || z.message === "Transition was aborted because of invalid state") && (z = null), z !== null && _(z);
          } finally {
            i(), u(), d();
          }
        }
      ), D.finished.finally(function() {
        for (var z = 0; z < k.length; z++)
          k[z].cancel();
        T.__reactViewTransition === D && (T.__reactViewTransition = null), v();
      }), D;
    } catch {
      return i(), u(), d(), null;
    }
  }
  function oi(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  oi.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : F({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, oi.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), i = [], u = 0; u < n.length; u++) {
      var r = n[u].effect;
      r !== null && r.target === e && r.pseudoElement === t && i.push(n[u]);
    }
    return i;
  }, oi.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function qp(e) {
    return {
      name: e,
      group: new oi("group", e),
      imagePair: new oi("image-pair", e),
      old: new oi("old", e),
      new: new oi("new", e)
    };
  }
  function tn(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  tn.prototype.addEventListener = function(e, t, n) {
    var i = null, u = null;
    if (!(n != null && typeof n != "boolean" && (i = n.signal || null, i !== null && i.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var r = this._eventListeners;
      if (kp(r, e, t, n) === -1) {
        var d = this, v = t;
        n != null && typeof n != "boolean" && n.once === !0 && (v = function(_) {
          d.removeEventListener(
            e,
            t,
            n
          ), typeof t == "function" ? t.call(this, _) : t.handleEvent(_);
        }), i !== null && (u = d.removeEventListener.bind(
          d,
          e,
          t,
          n
        ), i.addEventListener("abort", u, { once: !0 }), u = i.removeEventListener.bind(i, "abort", u)), i = al(n), r.push({
          type: e,
          listener: t,
          optionsOrUseCapture: n,
          attachedListener: v,
          cleanup: u
        }), g(
          this._fragmentFiber.child,
          !1,
          K1,
          e,
          v,
          i
        );
      }
      this._eventListeners = r;
    }
  };
  function K1(e, t, n, i) {
    return A(e).addEventListener(
      t,
      n,
      i
    ), !1;
  }
  tn.prototype.removeEventListener = function(e, t, n) {
    var i = this._eventListeners;
    if (i !== null && (t = kp(
      i,
      e,
      t,
      n
    ), t !== -1)) {
      var u = i[t];
      n = u.attachedListener;
      var r = u.cleanup;
      u = al(u.optionsOrUseCapture), g(
        this._fragmentFiber.child,
        !1,
        J1,
        e,
        n,
        u
      ), i.splice(t, 1), r !== null && r();
    }
  };
  function J1(e, t, n, i) {
    return A(e).removeEventListener(
      t,
      n,
      i
    ), !1;
  }
  function al(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function Zp(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function kp(e, t, n, i) {
    if (e.length === 0) return -1;
    i = Zp(i);
    for (var u = 0; u < e.length; u++) {
      var r = e[u];
      if (r.type === t && r.listener === n && Zp(r.optionsOrUseCapture) === i)
        return u;
    }
    return -1;
  }
  tn.prototype.dispatchEvent = function(e) {
    var t = O(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = A(t);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !e.bubbles) {
      var i = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (n)
        for (var u = 0; u < n.length; u++) {
          var r = n[u];
          i.addEventListener(
            r.type,
            r.attachedListener,
            al(r.optionsOrUseCapture)
          );
        }
      if (t.appendChild(i), e = i.dispatchEvent(e), n)
        for (u = 0; u < n.length; u++)
          r = n[u], i.removeEventListener(
            r.type,
            r.attachedListener,
            al(r.optionsOrUseCapture)
          );
      return t.removeChild(i), e;
    }
    return t.dispatchEvent(e);
  }, tn.prototype.focus = function(e) {
    g(
      this._fragmentFiber.child,
      !0,
      Hp,
      e,
      void 0,
      void 0
    );
  };
  function Hp(e, t) {
    return e.tag === 6 ? !1 : (e = A(e), sb(e, t));
  }
  tn.prototype.focusLast = function(e) {
    var t = [];
    g(
      this._fragmentFiber.child,
      !0,
      Ho,
      t,
      void 0,
      void 0
    );
    for (var n = t.length - 1; 0 <= n && !Hp(t[n], e); n--) ;
  };
  function Ho(e, t) {
    return t.push(e), !1;
  }
  tn.prototype.blur = function() {
    var e = O(
      this._fragmentFiber
    );
    e !== null && (e = A(e), e = su(e).activeElement, e !== null && g(
      this._fragmentFiber.child,
      !1,
      I1,
      e,
      void 0,
      void 0
    ));
  };
  function I1(e, t) {
    return e.tag === 6 ? !1 : (e = A(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  tn.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), g(
      this._fragmentFiber.child,
      !1,
      F1,
      e,
      void 0,
      void 0
    );
  };
  function F1(e, t) {
    return e.tag === 6 || (e = A(e), t.observe(e)), !1;
  }
  tn.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), g(
        this._fragmentFiber.child,
        !1,
        P1,
        e,
        void 0,
        void 0
      );
      for (var n = t = 0; n < On.length; n++) {
        var i = On[n];
        i.fragmentInstance === this && i.observer === e ? e.unobserve(i.instance) : On[t++] = i;
      }
      On.length = t;
    }
  };
  function P1(e, t) {
    return e.tag === 6 || (e = A(e), t.unobserve(e)), !1;
  }
  var On = [], Bo = !1;
  function W1(e, t, n) {
    On.push({
      fragmentInstance: e,
      observer: t,
      instance: n
    }), Bo || (Bo = !0, rb(function() {
      Bo = !1;
      var i = On;
      On = [];
      for (var u = 0; u < i.length; u++) {
        var r = i[u];
        r.observer.unobserve(r.instance);
      }
    }));
  }
  tn.prototype.getClientRects = function() {
    var e = [];
    return g(
      this._fragmentFiber.child,
      !1,
      eb,
      e,
      void 0,
      void 0
    ), e;
  };
  function eb(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var n = e.ownerDocument.createRange();
      n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
    } else
      e = A(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  tn.prototype.getRootNode = function(e) {
    var t = O(
      this._fragmentFiber
    );
    return t === null ? this : A(t).getRootNode(e);
  }, tn.prototype.compareDocumentPosition = function(e) {
    var t = O(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    g(
      this._fragmentFiber.child,
      !1,
      Ho,
      n,
      void 0,
      void 0
    );
    var i = A(t);
    if (n.length === 0) {
      if (n = i, U(this._fragmentFiber)) {
        e: {
          for (t = this._fragmentFiber.return; t !== null; ) {
            if (t.tag === 4) {
              t = t.stateNode.containerInfo;
              break e;
            }
            if (t.tag === 3 || t.tag === 5 || t.tag === 27)
              break;
            t = t.return;
          }
          t = null;
        }
        t != null && (n = t);
      }
      t = this._fragmentFiber;
      var u = i = n.compareDocumentPosition(e);
      return n === e ? u = Node.DOCUMENT_POSITION_CONTAINS : i & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = R(t)[1], n === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (e = A(n).compareDocumentPosition(
        e
      ), u = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = A(n[0]), u = A(n[n.length - 1]);
    var r = U(this._fragmentFiber) ? t.parentElement : i;
    if (r == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    i = r.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, r = r.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var d = t.compareDocumentPosition(e), v = u.compareDocumentPosition(e), _ = d & Node.DOCUMENT_POSITION_CONTAINED_BY || v & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return v = i && r && d & Node.DOCUMENT_POSITION_FOLLOWING && v & Node.DOCUMENT_POSITION_PRECEDING, t = i && t === e || r && u === e || _ || v ? Node.DOCUMENT_POSITION_CONTAINED_BY : !i && t === e || !r && u === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : d, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || tb(
      t,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function tb(e, t, n, i, u) {
    var r = Ya(u);
    if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!r)
        e: {
          for (; r !== null; ) {
            if (r.tag === 7 && (r === t || r.alternate === t)) {
              n = !0;
              break e;
            }
            r = r.return;
          }
          n = !1;
        }
      return n;
    }
    if (e & Node.DOCUMENT_POSITION_CONTAINS) {
      if (r === null)
        return r = u.ownerDocument, u === r || u === r.documentElement || u === r.body;
      e: {
        for (r = t, t = O(t); r !== null; ) {
          if (!(r.tag !== 5 && r.tag !== 3 && r.tag !== 27 || r !== t && r.alternate !== t)) {
            r = !0;
            break e;
          }
          r = r.return;
        }
        r = !1;
      }
      return r;
    }
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!r) && !(t = r === n) && (t = I(
      n,
      r,
      ee
    ), t === null ? t = !1 : (g(
      t,
      !0,
      se,
      r,
      n
    ), r = M, M = null, t = r !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!r) && !(t = r === i) && (t = I(
      i,
      r,
      ee
    ), t === null ? t = !1 : (g(
      t,
      !0,
      pe,
      r,
      i
    ), r = M, Y = M = null, t = r !== null)), t) : !1;
  }
  function Bp(e, t) {
    var n = e.ownerDocument.createRange();
    n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  tn.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(c(566));
    var t = [];
    g(
      this._fragmentFiber.child,
      !1,
      Ho,
      t,
      void 0,
      void 0
    );
    var n = e !== !1;
    if (t.length === 0) {
      var i = R(
        this._fragmentFiber
      );
      if (i = n ? i[1] || i[0] || O(this._fragmentFiber) : i[0] || i[1], i === null) return;
      if (i.tag === 6) {
        e = A(i), Bp(e, n);
        return;
      }
      if (i = A(i), i.nodeType !== 9) {
        if (i.nodeType === 11) {
          n = "host" in i ? i.host : null, n !== null && n.scrollIntoView(e);
          return;
        }
        i.scrollIntoView(e);
      }
    }
    for (i = n ? t.length - 1 : 0; i !== (n ? -1 : t.length); ) {
      var u = t[i];
      u.tag === 6 ? (u = A(u), Bp(u, n)) : A(u).scrollIntoView(e), i += n ? -1 : 1;
    }
  };
  function nb(e, t) {
    return e = A(e), Lp(e, t), !1;
  }
  function Lp(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function Qp(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = n[i];
        e.addEventListener(
          u.type,
          u.attachedListener,
          al(u.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(r) {
      for (var d = 0, v = 0; v < On.length; v++) {
        var _ = On[v];
        (_.fragmentInstance !== t || _.observer !== r || _.instance !== e) && (On[d++] = _);
      }
      On.length = d, r.observe(e);
    }), Lp(e, t));
  }
  function ab(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var u = n[i];
        e.removeEventListener(
          u.type,
          u.attachedListener,
          al(u.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(r) {
      typeof r.rootMargin == "string" ? W1(
        t,
        r,
        e
      ) : r.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function Lo(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Lo(n), qu(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function ib(e, t, n, i) {
    for (; e.nodeType === 1; ) {
      var u = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[zl])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (r = e.getAttribute("rel"), r === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (r !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (r = e.getAttribute("src"), (r !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && r && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var r = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === r)
          return e;
      } else return e;
      if (e = mn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function lb(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = mn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Yp(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = mn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Qo(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function Yo(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function ub(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var i = function() {
        t(), n.removeEventListener("DOMContentLoaded", i);
      };
      n.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
    }
  }
  function mn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var $o = null;
  function $p(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return mn(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function Gp(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else n !== "/$" && n !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function sb(e, t) {
    function n() {
      i = !0;
    }
    if (e.ownerDocument.activeElement === e) return !0;
    var i = !1;
    try {
      e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
    } finally {
      e.ownerDocument.removeEventListener("focus", n, !0);
    }
    return i;
  }
  function rb(e) {
    wp(function() {
      wp(function(t) {
        return e(t);
      });
    });
  }
  function Vp(e, t, n) {
    switch (t = su(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(c(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(c(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(c(454));
        return e;
      default:
        throw Error(c(451));
    }
  }
  function Xp(e, t, n) {
    for (var i in n) {
      var u = n[i];
      n.hasOwnProperty(i) && u != null && De(e, t, i, null, Z1, u);
    }
    n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === Tn && (e.onclick = null), qu(e);
  }
  function Go(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    qu(e);
  }
  var pn = /* @__PURE__ */ new Map(), Kp = /* @__PURE__ */ new Set();
  function ru(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var na = re.d;
  re.d = {
    f: cb,
    r: ob,
    D: fb,
    C: db,
    L: hb,
    m: mb,
    X: vb,
    S: pb,
    M: yb
  };
  function cb() {
    var e = na.f(), t = Hs();
    return e || t;
  }
  function ob(e) {
    var t = xi(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ih(t) : na.r(e);
  }
  var il = typeof document > "u" ? null : document;
  function Jp(e, t, n) {
    var i = il;
    if (i && typeof t == "string" && t) {
      var u = sn(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof n == "string" && (u += '[crossorigin="' + n + '"]'), Kp.has(u) || (Kp.add(u), e = { rel: e, crossOrigin: n, href: t }, i.querySelector(u) === null && (t = i.createElement("link"), _t(t, "link", e), ot(t), i.head.appendChild(t)));
    }
  }
  function fb(e) {
    na.D(e), Jp("dns-prefetch", e, null);
  }
  function db(e, t) {
    na.C(e, t), Jp("preconnect", e, t);
  }
  function hb(e, t, n) {
    na.L(e, t, n);
    var i = il;
    if (i && e && t) {
      var u = 'link[rel="preload"][as="' + sn(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (u += '[imagesrcset="' + sn(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (u += '[imagesizes="' + sn(
        n.imageSizes
      ) + '"]')) : u += '[href="' + sn(e) + '"]';
      var r = u;
      switch (t) {
        case "style":
          r = ll(e);
          break;
        case "script":
          r = ul(e);
      }
      if (!(pn.has(r) || (e = F(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), pn.set(r, e), i.querySelector(u) !== null || t === "style" && i.querySelector(cu(r)) || t === "script" && i.querySelector(ou(r))))) {
        var d = i.createElement("link");
        _t(d, "link", e), t === "style" && (d[Uu] = !0, d.onload = d.onerror = function() {
          rd(d);
        }), ot(d), i.head.appendChild(d);
      }
    }
  }
  function mb(e, t) {
    na.m(e, t);
    var n = il;
    if (n && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + sn(i) + '"][href="' + sn(e) + '"]', r = u;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          r = ul(e);
      }
      if (!pn.has(r) && (e = F({ rel: "modulepreload", href: e }, t), pn.set(r, e), n.querySelector(u) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(ou(r)))
              return;
        }
        i = n.createElement("link"), _t(i, "link", e), ot(i), n.head.appendChild(i);
      }
    }
  }
  function pb(e, t, n) {
    na.S(e, t, n);
    var i = il;
    if (i && e) {
      var u = ji(i).hoistableStyles, r = ll(e);
      t = t || "default";
      var d = u.get(r);
      if (!d) {
        var v = { loading: 0, preload: null };
        if (d = i.querySelector(
          cu(r)
        ))
          v.loading = 5;
        else {
          e = F(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = pn.get(r)) && Vo(e, n);
          var _ = d = i.createElement("link");
          ot(_), _t(_, "link", e), _._p = new Promise(function(T, D) {
            _.onload = T, _.onerror = D;
          }), _.addEventListener("load", function() {
            v.loading |= 1;
          }), _.addEventListener("error", function() {
            v.loading |= 2;
          }), v.loading |= 4, Vs(d, t, i);
        }
        d = {
          type: "stylesheet",
          instance: d,
          count: 1,
          state: v
        }, u.set(r, d);
      }
    }
  }
  function vb(e, t) {
    na.X(e, t);
    var n = il;
    if (n && e) {
      var i = ji(n).hoistableScripts, u = ul(e), r = i.get(u);
      r || (r = n.querySelector(ou(u)), r || (e = F({ src: e, async: !0 }, t), (t = pn.get(u)) && Xo(e, t), r = n.createElement("script"), ot(r), _t(r, "link", e), n.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, i.set(u, r));
    }
  }
  function yb(e, t) {
    na.M(e, t);
    var n = il;
    if (n && e) {
      var i = ji(n).hoistableScripts, u = ul(e), r = i.get(u);
      r || (r = n.querySelector(ou(u)), r || (e = F({ src: e, async: !0, type: "module" }, t), (t = pn.get(u)) && Xo(e, t), r = n.createElement("script"), ot(r), _t(r, "link", e), n.head.appendChild(r)), r = {
        type: "script",
        instance: r,
        count: 1,
        state: null
      }, i.set(u, r));
    }
  }
  function Ip(e, t, n, i) {
    var u = (u = mt.current) ? ru(u) : null;
    if (!u) throw Error(c(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = ll(n.href), t = ji(
          u
        ).hoistableStyles, i = t.get(n), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = ll(n.href);
          var r = ji(
            u
          ).hoistableStyles, d = r.get(e);
          if (d || (u = u.ownerDocument || u, d = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, r.set(e, d), (r = u.querySelector(
            cu(e)
          )) ? r._p || (d.instance = r, d.state.loading = 5) : (r = pn.get(e), r || (r = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, pn.set(e, r)), gb(
            u,
            e,
            r,
            d.state
          ))), t && i === null)
            throw Error(c(528, ""));
          return d;
        }
        if (t && i !== null)
          throw Error(c(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = ul(n), t = ji(
          u
        ).hoistableScripts, i = t.get(n), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(c(444, e));
    }
  }
  function ll(e) {
    return 'href="' + sn(e) + '"';
  }
  function cu(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function Fp(e) {
    return F({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function gb(e, t, n, i) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[Uu] !== !0) {
        i.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[Uu] = !0, t.onload = t.onerror = rd.bind(null, t), _t(t, "link", n), ot(t), e.head.appendChild(t);
    i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    });
  }
  function ul(e) {
    return '[src="' + sn(e) + '"]';
  }
  function ou(e) {
    return "script[async]" + e;
  }
  function Pp(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + sn(n.href) + '"]'
          );
          if (i)
            return t.instance = i, ot(i), i;
          var u = F({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), ot(i), _t(i, "style", u), Vs(i, n.precedence, e), t.instance = i;
        case "stylesheet":
          u = ll(n.href);
          var r = e.querySelector(
            cu(u)
          );
          if (r)
            return t.state.loading |= 4, t.instance = r, ot(r), r;
          i = Fp(n), (u = pn.get(u)) && Vo(i, u), r = (e.ownerDocument || e).createElement("link"), ot(r);
          var d = r;
          return d._p = new Promise(function(v, _) {
            d.onload = v, d.onerror = _;
          }), _t(r, "link", i), t.state.loading |= 4, Vs(r, n.precedence, e), t.instance = r;
        case "script":
          return r = ul(n.src), (u = e.querySelector(
            ou(r)
          )) ? (t.instance = u, ot(u), u) : (i = n, (u = pn.get(r)) && (i = F({}, n), Xo(i, u)), e = e.ownerDocument || e, u = e.createElement("script"), ot(u), _t(u, "link", i), e.head.appendChild(u), t.instance = u);
        case "void":
          return null;
        default:
          throw Error(c(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, Vs(i, n.precedence, e));
    return t.instance;
  }
  function Vs(e, t, n) {
    for (var i = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), u = i.length ? i[i.length - 1] : null, r = u, d = 0; d < i.length; d++) {
      var v = i[d];
      if (v.dataset.precedence === t) r = v;
      else if (r !== u) break;
    }
    r ? r.parentNode.insertBefore(e, r.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function Vo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Xo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Xs = null;
  function Wp(e, t, n) {
    if (Xs === null) {
      var i = /* @__PURE__ */ new Map(), u = Xs = /* @__PURE__ */ new Map();
      u.set(n, i);
    } else
      u = Xs, i = u.get(n), i || (i = /* @__PURE__ */ new Map(), u.set(n, i));
    if (i.has(e)) return i;
    for (i.set(e, null), n = n.getElementsByTagName(e), u = 0; u < n.length; u++) {
      var r = n[u];
      if (!(r[zl] || r[pt] || e === "link" && r.getAttribute("rel") === "stylesheet") && r.namespaceURI !== "http://www.w3.org/2000/svg") {
        var d = r.getAttribute(t) || "";
        d = e + d;
        var v = i.get(d);
        v ? v.push(r) : i.set(d, [r]);
      }
    }
    return i;
  }
  function Ko(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function bb(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function ev(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function tv(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function nv(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function av(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += nv(t), e.suspenseyImages.push(t)), e = xb.bind(e), t.decode().then(e, e));
  }
  function _b(e, t, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var u = ll(i.href), r = t.querySelector(
          cu(u)
        );
        if (r) {
          t = r._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = fu.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = r, ot(r);
          return;
        }
        r = t.ownerDocument || t, i = Fp(i), (u = pn.get(u)) && Vo(i, u), r = r.createElement("link"), ot(r);
        var d = r;
        d._p = new Promise(function(v, _) {
          d.onload = v, d.onerror = _;
        }), _t(r, "link", i), n.instance = r;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = fu.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Ks = 0;
  function Sb(e, t) {
    return e.stylesheets && e.count === 0 && Is(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (e.stylesheets && Is(e, e.stylesheets), e.unsuspend) {
          var r = e.unsuspend;
          e.unsuspend = null, r();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ks === 0 && (Ks = 62500 * H1());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Is(e, e.stylesheets), e.unsuspend)) {
            var r = e.unsuspend;
            e.unsuspend = null, r();
          }
        },
        (e.imgBytes > Ks ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(u);
      };
    } : null;
  }
  function iv(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) Is(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function fu() {
    this.count--, iv(this);
  }
  function xb() {
    this.imgCount--, iv(this);
  }
  var Js = null;
  function Is(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Js = /* @__PURE__ */ new Map(), t.forEach(jb, e), Js = null, fu.call(e));
  }
  function jb(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Js.get(e);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Js.set(e, n);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), r = 0; r < u.length; r++) {
          var d = u[r];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (n.set(d.dataset.precedence, d), i = d);
        }
        i && n.set(null, i);
      }
      u = t.instance, d = u.getAttribute("data-precedence"), r = n.get(d) || i, r === i && n.set(null, u), n.set(d, u), this.count++, i = fu.bind(this), u.addEventListener("load", i), u.addEventListener("error", i), r ? r.parentNode.insertBefore(u, r.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var sl = {
    $$typeof: Xe,
    Provider: null,
    Consumer: null,
    _currentValue: Rt,
    _currentValue2: Rt,
    _threadCount: 0
  };
  function Ob(e, t, n, i, u, r, d, v, _) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Tr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Tr(0), this.hiddenUpdates = Tr(null), this.identifierPrefix = i, this.onUncaughtError = u, this.onCaughtError = r, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = _, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function lv(e, t, n, i, u, r, d, v, _, T, D, k) {
    return e = new Ob(
      e,
      t,
      n,
      d,
      _,
      T,
      D,
      k,
      v
    ), t = 1, r === !0 && (t |= 24), r = Zt(3, null, null, t), e.current = r, r.stateNode = e, t = rc(), t.refCount++, e.pooledCache = t, t.refCount++, r.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: t
    }, dc(r), e;
  }
  function uv(e) {
    return e ? (e = Mi, e) : Mi;
  }
  function sv(e, t, n, i, u, r) {
    u = uv(u), i.context === null ? i.context = u : i.pendingContext = u, i = ya(t), i.payload = { element: n }, r = r === void 0 ? null : r, r !== null && (i.callback = r), n = ga(e, i, t), n !== null && (Lt(n, e, t), Ql(n, e, t));
  }
  function rv(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Jo(e, t) {
    rv(e, t), (e = e.alternate) && rv(e, t);
  }
  function cv(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xa(e, 67108864);
      t !== null && Lt(t, e, 67108864), Jo(e, 67108864);
    }
  }
  function ov(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = en();
      t = Nr(t);
      var n = Xa(e, t);
      n !== null && Lt(n, e, t), Jo(e, t);
    }
  }
  var rl = !0;
  function zb(e, t, n, i) {
    var u = X.T;
    X.T = null;
    var r = re.p;
    try {
      re.p = 2, Io(e, t, n, i);
    } finally {
      re.p = r, X.T = u;
    }
  }
  function Eb(e, t, n, i) {
    var u = X.T;
    X.T = null;
    var r = re.p;
    try {
      re.p = 8, Io(e, t, n, i);
    } finally {
      re.p = r, X.T = u;
    }
  }
  function Io(e, t, n, i) {
    if (rl) {
      var u = Fo(i);
      if (u === null)
        wo(
          e,
          t,
          i,
          Fs,
          n
        ), dv(e, i);
      else if (Nb(
        u,
        e,
        t,
        n,
        i
      ))
        i.stopPropagation();
      else if (dv(e, i), t & 4 && -1 < Tb.indexOf(e)) {
        for (; u !== null; ) {
          var r = xi(u);
          if (r !== null)
            switch (r.tag) {
              case 3:
                if (r = r.stateNode, r.current.memoizedState.isDehydrated) {
                  var d = Qa(r.pendingLanes);
                  if (d !== 0) {
                    var v = r;
                    for (v.pendingLanes |= 2, v.entangledLanes |= 2; d; ) {
                      var _ = 1 << 31 - Xt(d);
                      v.entanglements[1] |= _, d &= ~_;
                    }
                    Zn(r), (Ce & 6) === 0 && (qs = Gt() + 500, iu(0));
                  }
                }
                break;
              case 31:
              case 13:
                v = Xa(r, 2), v !== null && Lt(v, r, 2), Hs(), Jo(r, 2);
            }
          if (r = Fo(i), r === null && wo(
            e,
            t,
            i,
            Fs,
            n
          ), r === u) break;
          u = r;
        }
        u !== null && i.stopPropagation();
      } else
        wo(
          e,
          t,
          i,
          null,
          n
        );
    }
  }
  function Fo(e) {
    return e = Ur(e), Po(e);
  }
  var Fs = null;
  function Po(e) {
    if (Fs = null, e = Ya(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = m(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return Fs = e, null;
  }
  function fv(e) {
    switch (e) {
      case "beforetoggle":
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
      case "seeked":
      case "submit":
      case "toggle":
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
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
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
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Hg()) {
          case If:
            return 2;
          case Ff:
            return 8;
          case Au:
          case Bg:
            return 32;
          case Pf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Wo = !1, Aa = null, wa = null, Ra = null, du = /* @__PURE__ */ new Map(), hu = /* @__PURE__ */ new Map(), Ma = [], Tb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function dv(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Aa = null;
        break;
      case "dragenter":
      case "dragleave":
        wa = null;
        break;
      case "mouseover":
      case "mouseout":
        Ra = null;
        break;
      case "pointerover":
      case "pointerout":
        du.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        hu.delete(t.pointerId);
    }
  }
  function mu(e, t, n, i, u, r) {
    return e === null || e.nativeEvent !== r ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: r,
      targetContainers: [u]
    }, t !== null && (t = xi(t), t !== null && cv(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function Nb(e, t, n, i, u) {
    switch (t) {
      case "focusin":
        return Aa = mu(
          Aa,
          e,
          t,
          n,
          i,
          u
        ), !0;
      case "dragenter":
        return wa = mu(
          wa,
          e,
          t,
          n,
          i,
          u
        ), !0;
      case "mouseover":
        return Ra = mu(
          Ra,
          e,
          t,
          n,
          i,
          u
        ), !0;
      case "pointerover":
        var r = u.pointerId;
        return du.set(
          r,
          mu(
            du.get(r) || null,
            e,
            t,
            n,
            i,
            u
          )
        ), !0;
      case "gotpointercapture":
        return r = u.pointerId, hu.set(
          r,
          mu(
            hu.get(r) || null,
            e,
            t,
            n,
            i,
            u
          )
        ), !0;
    }
    return !1;
  }
  function hv(e) {
    var t = Ya(e.target);
    if (t !== null) {
      var n = h(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, ld(e.priority, function() {
              ov(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(n), t !== null) {
            e.blockedOn = t, ld(e.priority, function() {
              ov(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Ps(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Fo(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var i = new n.constructor(
          n.type,
          n
        );
        Dr = i, n.target.dispatchEvent(i), Dr = null;
      } else
        return t = xi(n), t !== null && cv(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function mv(e, t, n) {
    Ps(e) && n.delete(t);
  }
  function Cb() {
    Wo = !1, Aa !== null && Ps(Aa) && (Aa = null), wa !== null && Ps(wa) && (wa = null), Ra !== null && Ps(Ra) && (Ra = null), du.forEach(mv), hu.forEach(mv);
  }
  function Ws(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Wo || (Wo = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      Cb
    )));
  }
  var er = null;
  function pv(e) {
    er !== e && (er = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        er === e && (er = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], i = e[t + 1], u = e[t + 2];
          if (typeof i != "function") {
            if (Po(i || n) === null)
              continue;
            break;
          }
          var r = xi(n);
          r !== null && (e.splice(t, 3), t -= 3, Mc(
            r,
            {
              pending: !0,
              data: u,
              method: n.method,
              action: i
            },
            i,
            u
          ));
        }
      }
    ));
  }
  function cl(e) {
    function t(_) {
      return Ws(_, e);
    }
    Aa !== null && Ws(Aa, e), wa !== null && Ws(wa, e), Ra !== null && Ws(Ra, e), du.forEach(t), hu.forEach(t);
    for (var n = 0; n < Ma.length; n++) {
      var i = Ma[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Ma.length && (n = Ma[0], n.blockedOn === null); )
      hv(n), n.blockedOn === null && Ma.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var u = n[i], r = n[i + 1], d = u[qt] || null;
        if (typeof r == "function")
          d || pv(n);
        else if (d) {
          var v = null;
          if (r && r.hasAttribute("formAction")) {
            if (u = r, d = r[qt] || null)
              v = d.formAction;
            else if (Po(u) !== null) continue;
          } else v = d.action;
          typeof v == "function" ? n[i + 1] = v : (n.splice(i, 3), i -= 3), pv(n);
        }
      }
  }
  function vv() {
    function e(r) {
      r.canIntercept && r.info === "react-transition" && r.intercept({
        handler: function() {
          return new Promise(function(d) {
            return u = d;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      u !== null && (u(), u = null), i || setTimeout(n, 20);
    }
    function n() {
      if (!i && !navigation.transition) {
        var r = navigation.currentEntry;
        r && r.url != null && navigation.navigate(r.url, {
          state: r.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, u = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        i = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), u !== null && (u(), u = null);
      };
    }
  }
  function ef(e) {
    this._internalRoot = e;
  }
  tr.prototype.render = ef.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(c(409));
    var n = t.current, i = en();
    sv(n, i, e, t, null, null);
  }, tr.prototype.unmount = ef.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      sv(e.current, 2, null, e, null, null), Hs(), t[Si] = null;
    }
  };
  function tr(e) {
    this._internalRoot = e;
  }
  tr.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = id();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < Ma.length && t !== 0 && t < Ma[n].priority; n++) ;
      Ma.splice(n, 0, e), n === 0 && hv(e);
    }
  };
  var yv = l.version;
  if (yv !== "19.3.0")
    throw Error(
      c(
        527,
        yv,
        "19.3.0"
      )
    );
  re.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = b(t), e = e !== null ? S(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Ab = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: X,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var nr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!nr.isDisabled && nr.supportsFiber)
      try {
        xl = nr.inject(
          Ab
        ), Vt = nr;
      } catch {
      }
  }
  return vu.createRoot = function(e, t) {
    if (!f(e)) throw Error(c(299));
    var n = !1, i = "", u = um, r = sm, d = rm;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (r = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = lv(
      e,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      u,
      r,
      d,
      vv
    ), e[Si] = t.current, Ao(e), new ef(t);
  }, vu.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(c(299));
    var i = !1, u = "", r = um, d = sm, v = rm, _ = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (r = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (v = n.onRecoverableError), n.formState !== void 0 && (_ = n.formState)), t = lv(
      e,
      1,
      !0,
      t,
      n ?? null,
      i,
      u,
      _,
      r,
      d,
      v,
      vv
    ), t.context = uv(null), n = t.current, i = en(), i = Nr(i), u = ya(i), u.callback = null, ga(n, u, i), n = i, t.current.lanes = n, Ol(t, n), Zn(t), e[Si] = t.current, Ao(e), new tr(t);
  }, vu.version = "19.3.0", vu;
}
var Tv;
function Hb() {
  if (Tv) return af.exports;
  Tv = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), af.exports = kb(), af.exports;
}
var Bb = Hb();
const Sy = H.createContext(void 0), _r = (a) => {
  const l = H.useContext(Sy);
  if (!l) throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return l;
}, Lb = ({ client: a, children: l }) => (H.useEffect(() => (a.mount(), () => {
  a.unmount();
}), [a]), /* @__PURE__ */ o.jsx(Sy.Provider, {
  value: a,
  children: l
})), Qb = {
  setTimeout: (a, l) => setTimeout(a, l),
  clearTimeout: (a) => clearTimeout(a),
  setInterval: (a, l) => setInterval(a, l),
  clearInterval: (a) => clearInterval(a)
};
var Yb = class {
  #e = Qb;
  #t = !1;
  /**
  * `setTimeoutProvider` can be used to set a custom implementation of the
  * `setTimeout`, `clearTimeout`, `setInterval`, `clearInterval` functions,
  * called a `TimeoutProvider`.
  *
  * This may be useful if you notice event loop performance issues with
  * thousands of queries. A custom TimeoutProvider could also support timer
  * delays longer than the global `setTimeout` maximum delay value of about
  * 24 days.
  *
  * It is important to call `setTimeoutProvider` before creating a
  * QueryClient or queries, so that the same provider is used consistently
  * for all timers in the application, since different TimeoutProviders
  * cannot cancel each others' timers.
  * @param provider - The `TimeoutProvider` to use for all timers from now on.
  * @example
  * ```ts
  * import { timeoutManager, QueryClient } from '@tanstack/query-core'
  * import { CustomTimeoutProvider } from './CustomTimeoutProvider'
  *
  * timeoutManager.setTimeoutProvider(new CustomTimeoutProvider())
  *
  * export const queryClient = new QueryClient()
  * ```
  */
  setTimeoutProvider(a) {
    this.#e = a;
  }
  /**
  * `setTimeout` schedules a callback to run after approximately `delay`
  * milliseconds, like the global `setTimeout` function. The callback can be
  * canceled with `clearTimeout`.
  *
  * It returns a timer ID, which may be a number or an object that can be
  * coerced to a number via `Symbol.toPrimitive`.
  * @param callback - The function to call when the timeout elapses.
  * @param delay - The time to wait before calling `callback`, in milliseconds.
  * @returns The timer ID, to pass to {@link TimeoutManager#clearTimeout}.
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const timeoutId = timeoutManager.setTimeout(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * const timeoutIdNumber: number = Number(timeoutId)
  * ```
  */
  setTimeout(a, l) {
    return this.#e.setTimeout(a, l);
  }
  /**
  * `clearTimeout` cancels a timeout callback scheduled with `setTimeout`,
  * like the global `clearTimeout` function. It should be called with a
  * timer ID returned by `setTimeout`.
  * @param timeoutId - The timer ID returned by `setTimeout`, or `undefined`.
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const timeoutId = timeoutManager.setTimeout(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * timeoutManager.clearTimeout(timeoutId)
  * ```
  */
  clearTimeout(a) {
    this.#e.clearTimeout(a);
  }
  /**
  * `setInterval` schedules a callback to be called approximately every
  * `delay` milliseconds, like the global `setInterval` function.
  *
  * Like `setTimeout`, it returns a timer ID, which may be a number or an
  * object that can be coerced to a number via `Symbol.toPrimitive`.
  * @param callback - The function to call on every interval.
  * @param delay - The time between calls, in milliseconds.
  * @returns The timer ID, to pass to {@link TimeoutManager#clearInterval}.
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const intervalId = timeoutManager.setInterval(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  * ```
  */
  setInterval(a, l) {
    return this.#e.setInterval(a, l);
  }
  /**
  * `clearInterval` can be used to cancel an interval, like the global
  * `clearInterval` function. It should be called with an interval ID
  * returned by `setInterval`.
  * @param intervalId - The timer ID returned by `setInterval`, or `undefined`.
  * @example
  * ```ts
  * import { timeoutManager } from '@tanstack/query-core'
  *
  * const intervalId = timeoutManager.setInterval(
  *   () => console.log('ran at:', new Date()),
  *   1000,
  * )
  *
  * timeoutManager.clearInterval(intervalId)
  * ```
  */
  clearInterval(a) {
    this.#e.clearInterval(a);
  }
};
const di = new Yb();
function $b(a) {
  setTimeout(a, 0);
}
const Gb = typeof window > "u" || "Deno" in globalThis;
function Qt() {
}
function Vb(a, l) {
  return typeof a == "function" ? a(l) : a;
}
function xy(a) {
  return typeof a == "number" && a >= 0 && a !== 1 / 0;
}
function jy(a, l) {
  return Math.max(a + (l || 0) - Date.now(), 0);
}
function $e(a, l) {
  return typeof a == "function" ? a(l) : a;
}
function Nv(a, l) {
  const { type: s = "all", exact: c, fetchStatus: f, predicate: h, queryKey: m, stale: p } = a;
  if (m) {
    if (c) {
      if (l.queryHash !== Rf(m, l.options)) return !1;
    } else if (!ml(l.queryKey, m)) return !1;
  }
  if (s !== "all") {
    const y = l.isActive();
    if (s === "active" && !y || s === "inactive" && y) return !1;
  }
  return !(typeof p == "boolean" && l.isStale() !== p || f && f !== l.state.fetchStatus || h && !h(l));
}
function Cv(a, l) {
  const { exact: s, status: c, predicate: f, mutationKey: h } = a;
  if (h) {
    if (!l.options.mutationKey) return !1;
    if (s) {
      if (Ou(l.options.mutationKey) !== Ou(h)) return !1;
    } else if (!ml(l.options.mutationKey, h)) return !1;
  }
  return !(c && l.state.status !== c || f && !f(l));
}
function Rf(a, l) {
  return (l?.queryKeyHashFn || Ou)(a);
}
function Ou(a) {
  return JSON.stringify(a, (l, s) => pf(s) ? Object.keys(s).sort().reduce((c, f) => (c[f] = s[f], c), {}) : s);
}
function ml(a, l) {
  if (a === l) return !0;
  if (typeof a != typeof l) return !1;
  if (a && l && typeof a == "object" && typeof l == "object") {
    if (Array.isArray(a) && Array.isArray(l)) {
      if (l.length > a.length) return !1;
      for (let c = 0; c < l.length; c++) if (!ml(a[c], l[c])) return !1;
      return !0;
    }
    const s = Object.keys(l);
    for (const c of s) if (!ml(a[c], l[c])) return !1;
    return !0;
  }
  return !1;
}
const Xb = Object.prototype.hasOwnProperty;
function Oy(a, l, s = 0) {
  if (a === l) return a;
  if (s > 500) return l;
  const c = Av(a) && Av(l);
  if (!c && !(pf(a) && pf(l))) return l;
  const f = (c ? a : Object.keys(a)).length, h = c ? l : Object.keys(l), m = h.length, p = c ? new Array(m) : {};
  let y = 0;
  for (let b = 0; b < m; b++) {
    const S = c ? b : h[b], g = a[S], O = l[S];
    if (g === O) {
      p[S] = g, (c ? b < f : Xb.call(a, S)) && y++;
      continue;
    }
    if (g === null || O === null || typeof g != "object" || typeof O != "object") {
      p[S] = O;
      continue;
    }
    const U = Oy(g, O, s + 1);
    p[S] = U, U === g && y++;
  }
  return f === m && y === f ? a : p;
}
function rf(a, l) {
  if (!l || Object.keys(a).length !== Object.keys(l).length) return !1;
  for (const s in a) if (a[s] !== l[s]) return !1;
  return !0;
}
function Av(a) {
  return Array.isArray(a) && a.length === Object.keys(a).length;
}
function pf(a) {
  if (!wv(a)) return !1;
  const l = Object.getPrototypeOf(a), s = l?.constructor;
  if (s === void 0) return !0;
  if (typeof s != "function") return !1;
  const c = s.prototype;
  return !(!wv(c) || !c.hasOwnProperty("isPrototypeOf") || l !== Object.prototype);
}
function wv(a) {
  return Object.prototype.toString.call(a) === "[object Object]";
}
function Kb(a) {
  return new Promise((l) => {
    di.setTimeout(l, a);
  });
}
function vf(a, l, s) {
  return typeof s.structuralSharing == "function" ? s.structuralSharing(a, l) : s.structuralSharing !== !1 ? Oy(a, l) : l;
}
function Jb(a, l, s = 0) {
  const c = [...a, l];
  return s && c.length > s ? c.slice(1) : c;
}
function Ib(a, l, s = 0) {
  const c = [l, ...a];
  return s && c.length > s ? c.slice(0, -1) : c;
}
const Mf = /* @__PURE__ */ Symbol();
function zy(a, l) {
  return !a.queryFn && l?.initialPromise ? () => l.initialPromise : !a.queryFn || a.queryFn === Mf ? () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${a.queryHash}'`)) : a.queryFn;
}
function Ey(a, l) {
  return typeof a == "function" ? a(...l) : !!a;
}
function Fb(a, l, s) {
  let c = !1, f;
  return Object.defineProperty(a, "signal", {
    enumerable: !0,
    get: () => (f ??= l(), c || (c = !0, f.aborted ? s() : f.addEventListener("abort", s, { once: !0 })), f)
  }), a;
}
let Pb = () => Gb;
const Df = () => Pb();
var Nu = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  /**
  * Registers a listener to be called on every update this object notifies about. Returns a function
  * that removes the listener again — call it to stop listening. The base class never drops a listener
  * on its own, though some subclasses clear all of theirs in `destroy()`.
  * @param listener - Called on each update, with whatever the subclass passes to its subscribers.
  * @returns A function that removes the listener.
  * @example
  * ```ts
  * const unsubscribe = subscribable.subscribe(() => {
  *   // react to the update
  * })
  *
  * unsubscribe()
  * ```
  */
  subscribe(a) {
    return this.listeners.add(a), this.onSubscribe(), () => {
      this.listeners.delete(a), this.onUnsubscribe();
    };
  }
  /**
  * Returns `true` while at least one listener is registered, `false` once they have all unsubscribed.
  * @returns `true` if at least one listener is registered.
  */
  hasListeners() {
    return this.listeners.size > 0;
  }
  /**
  * Called after a listener is added. Does nothing here; subclasses override it, e.g. to start
  * tracking what they observe once the first listener subscribes.
  */
  onSubscribe() {
  }
  /**
  * Called after a listener is removed. Does nothing here; subclasses override it, e.g. to clean up
  * once the last listener unsubscribes.
  */
  onUnsubscribe() {
  }
}, Wb = class extends Nu {
  #e;
  #t;
  #n;
  constructor() {
    super(), this.#n = (a) => {
      if (typeof window < "u" && window.addEventListener) {
        const l = () => a();
        return window.addEventListener("visibilitychange", l, !1), () => {
          window.removeEventListener("visibilitychange", l);
        };
      }
    };
  }
  onSubscribe() {
    this.#t || this.setEventListener(this.#n);
  }
  onUnsubscribe() {
    this.hasListeners() || (this.#t?.(), this.#t = void 0);
  }
  /**
  * `setEventListener` can be used to set a custom event listener that will
  * be used to determine the focus state. The provided `setup` function
  * receives a `setFocused` callback: call it with a `boolean` to manually
  * set the focus state, or with no arguments to re-evaluate the current
  * focus state and notify subscribers.
  * @param setup - Receives the `setFocused` callback, registers the event listener, and may return
  * a cleanup function that is called when the listener is replaced or no longer needed.
  * @example
  * ```ts
  * import { focusManager } from '@tanstack/query-core'
  *
  * focusManager.setEventListener((handleFocus) => {
  *   const listener = () => handleFocus()
  *   // Listen to visibilitychange
  *   if (typeof window !== 'undefined' && window.addEventListener) {
  *     window.addEventListener('visibilitychange', listener, false)
  *   }
  *
  *   return () => {
  *     // Be sure to unsubscribe if a new handler is set
  *     window.removeEventListener('visibilitychange', listener)
  *   }
  * })
  * ```
  */
  setEventListener(a) {
    this.#n = a, this.#t?.(), this.#t = a((l) => {
      typeof l == "boolean" ? this.setFocused(l) : this.onFocus();
    });
  }
  /**
  * `setFocused` can be used to manually set the focus state. Set `undefined`
  * to fall back to the default focus check.
  * @param focused - The focus state, or `undefined` to use the default focus check.
  * @example
  * ```ts
  * import { focusManager } from '@tanstack/query-core'
  *
  * // Set focused
  * focusManager.setFocused(true)
  *
  * // Set unfocused
  * focusManager.setFocused(false)
  *
  * // Fallback to the default focus check
  * focusManager.setFocused(undefined)
  * ```
  */
  setFocused(a) {
    this.#e !== a && (this.#e = a, this.onFocus());
  }
  /**
  * `onFocus` notifies all subscribed listeners with the current focus state.
  */
  onFocus() {
    const a = this.isFocused();
    this.listeners.forEach((l) => {
      l(a);
    });
  }
  /**
  * `isFocused` can be used to get the current focus state.
  * @returns The focus state set with `setFocused`, or otherwise whether the document is visible.
  */
  isFocused() {
    return typeof this.#e == "boolean" ? this.#e : globalThis.document?.visibilityState !== "hidden";
  }
};
const Uf = new Wb(), e_ = $b;
function t_() {
  let a = [], l = 0, s = (p) => {
    p();
  }, c = (p) => {
    p();
  }, f = e_;
  const h = (p) => {
    l ? a.push(p) : f(() => {
      s(p);
    });
  }, m = () => {
    const p = a;
    a = [], p.length && f(() => {
      c(() => {
        p.forEach((y) => {
          s(y);
        });
      });
    });
  };
  return {
    /**
    * Batches all updates scheduled inside the passed callback.
    * This is mainly used internally to optimize query client updating.
    * Batches can be nested; the queue is only flushed once the outermost `batch` call finishes.
    * The return value of `callback` is passed through.
    * @param callback - The function to run in the batch.
    * @returns The return value of `callback`.
    */
    batch: (p) => {
      let y;
      l++;
      try {
        y = p();
      } finally {
        l--, l || m();
      }
      return y;
    },
    /**
    * All calls to the wrapped function will be batched.
    * @param callback - The function to wrap.
    * @returns A function that schedules a call to `callback` with the given arguments.
    */
    batchCalls: (p) => (...y) => {
      h(() => {
        p(...y);
      });
    },
    /**
    * Schedules a function to be run on the next batch.
    * By default, the batch is run with a `setTimeout`, but this can be configured via `setScheduler`.
    */
    schedule: h,
    /**
    * Use this method to set a custom notify function.
    * This can be used to for example wrap notifications with `React.act` while running tests.
    * @param fn - Receives each notification callback and must call it.
    */
    setNotifyFunction: (p) => {
      s = p;
    },
    /**
    * Use this method to set a custom function to batch notifications together into a single tick.
    * Framework adapters use this to plug in their own batching primitive, so that a single query
    * update only triggers one re-render instead of one per subscriber.
    * @param fn - Receives a function that runs a batch of notifications and must call it.
    * @example
    * ```ts
    * import { notifyManager } from '@tanstack/query-core'
    * import { batch } from 'solid-js'
    *
    * notifyManager.setBatchNotifyFunction(batch)
    * ```
    */
    setBatchNotifyFunction: (p) => {
      c = p;
    },
    /**
    * Configures a custom callback that schedules when the next batch runs.
    * The default behavior is `setTimeout(callback, 0)`.
    * @param fn - Receives a callback that runs the next batch, and schedules it.
    * @example
    * ```ts
    * import { notifyManager } from '@tanstack/query-core'
    *
    * // Schedule batches in the next microtask
    * notifyManager.setScheduler(queueMicrotask)
    *
    * // Schedule batches before the next frame is rendered
    * notifyManager.setScheduler(requestAnimationFrame)
    *
    * // Schedule batches some time in the future
    * notifyManager.setScheduler((cb) => setTimeout(cb, 10))
    * ```
    */
    setScheduler: (p) => {
      f = p;
    }
  };
}
const xt = t_();
var n_ = class extends Nu {
  #e = !0;
  #t;
  #n;
  constructor() {
    super(), this.#n = (a) => {
      if (typeof window < "u" && window.addEventListener) {
        const l = () => a(!0), s = () => a(!1);
        return window.addEventListener("online", l, !1), window.addEventListener("offline", s, !1), () => {
          window.removeEventListener("online", l), window.removeEventListener("offline", s);
        };
      }
    };
  }
  onSubscribe() {
    this.#t || this.setEventListener(this.#n);
  }
  onUnsubscribe() {
    this.hasListeners() || (this.#t?.(), this.#t = void 0);
  }
  /**
  * `setEventListener` can be used to set a custom event listener that will
  * be used to determine the online state. The provided `setup` function
  * receives a `setOnline` callback that should be called with a `boolean`
  * whenever the online state changes.
  * @param setup - Receives the `setOnline` callback, registers the event listener, and may return
  * a cleanup function that is called when the listener is replaced or no longer needed.
  * @example
  * ```ts
  * import NetInfo from '@react-native-community/netinfo'
  * import { onlineManager } from '@tanstack/query-core'
  *
  * onlineManager.setEventListener((setOnline) => {
  *   return NetInfo.addEventListener((state) => {
  *     setOnline(!!state.isConnected)
  *   })
  * })
  * ```
  */
  setEventListener(a) {
    this.#n = a, this.#t?.(), this.#t = a(this.setOnline.bind(this));
  }
  /**
  * `setOnline` can be used to manually set the online state.
  * @param online - The online state.
  * @example
  * ```ts
  * import { onlineManager } from '@tanstack/query-core'
  *
  * // Set to online
  * onlineManager.setOnline(true)
  *
  * // Set to offline
  * onlineManager.setOnline(false)
  * ```
  */
  setOnline(a) {
    this.#e !== a && (this.#e = a, this.listeners.forEach((l) => {
      l(a);
    }));
  }
  /**
  * `isOnline` can be used to get the current online state.
  * @returns `true` if online.
  */
  isOnline() {
    return this.#e;
  }
};
const dr = new n_();
function a_(a) {
  return Math.min(1e3 * 2 ** a, 3e4);
}
function Ty(a) {
  return (a ?? "online") === "online" ? dr.isOnline() : !0;
}
var yf = class extends Error {
  constructor(a) {
    super("CancelledError"), this.revert = a?.revert, this.silent = a?.silent;
  }
};
function Ny(a) {
  let l = !1, s = 0, c, f = "pending", h, m;
  const p = new Promise((Y, se) => {
    h = Y, m = se;
  });
  p.catch(Qt);
  const y = () => f !== "pending", b = (Y) => {
    if (!y()) {
      const se = new yf(Y);
      N(se), a.onCancel?.(se);
    }
  }, S = () => {
    l = !0;
  }, g = () => {
    l = !1;
  }, O = () => Uf.isFocused() && (a.networkMode === "always" || dr.isOnline()) && a.canRun(), U = () => Ty(a.networkMode) && a.canRun(), R = (Y) => {
    y() || (c?.(), f = "resolved", h(Y));
  }, N = (Y) => {
    y() || (c?.(), f = "rejected", m(Y));
  }, A = (Y) => new Promise((se) => {
    c = (pe) => {
      (y() || Y()) && se(pe);
    }, a.onPause?.();
  }).then(() => {
    c = void 0, y() || a.onContinue?.();
  }), M = () => {
    if (y()) return;
    let Y;
    const se = s === 0 ? a.initialPromise : void 0;
    try {
      Y = se ?? a.fn();
    } catch (pe) {
      Y = Promise.reject(pe);
    }
    Promise.resolve(Y).then(R).catch((pe) => {
      if (y()) return;
      const ee = a.retry ?? (Df() ? 0 : 3), I = a.retryDelay ?? a_, F = typeof I == "function" ? I(s, pe) : I, oe = ee === !0 || typeof ee == "number" && s < ee || typeof ee == "function" && ee(s, pe);
      if (l || !oe) {
        N(pe);
        return;
      }
      s++, a.onFail?.(s, pe), Kb(F).then(() => O() ? void 0 : A(O)).then(() => {
        l ? N(pe) : M();
      });
    });
  };
  return {
    promise: p,
    status: () => f,
    cancel: b,
    continue: () => (c?.(), p),
    cancelRetry: S,
    continueRetry: g,
    canStart: U,
    start: () => (U() ? M() : A(U).then(M), p)
  };
}
var Cy = class {
  #e;
  /**
  * Clears the pending garbage collection timeout, so the entry is no longer scheduled for removal.
  * A subclass may override this to release what it holds on to as well — `Query` also cancels any
  * in-flight fetch.
  */
  destroy() {
    this.clearGcTimeout();
  }
  /**
  * Schedules the entry to be removed from its cache after `gcTime`, replacing any timeout scheduled
  * before. Nothing is scheduled if `gcTime` is `Infinity`.
  */
  scheduleGc() {
    this.clearGcTimeout(), xy(this.gcTime) && (this.#e = di.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  /**
  * Updates `gcTime`, keeping the longest one seen so far. Without a value, it defaults to 5 minutes
  * on the client and `Infinity` on the server.
  * @param newGcTime - The `gcTime` from the latest options, if any.
  */
  updateGcTime(a) {
    this.gcTime = Math.max(this.gcTime || 0, a ?? (Df() ? 1 / 0 : 3e5));
  }
  /**
  * Cancels the scheduled removal, if there is one.
  */
  clearGcTimeout() {
    this.#e !== void 0 && (di.clearTimeout(this.#e), this.#e = void 0);
  }
};
function i_(a) {
  return { onFetch: (l, s) => {
    const c = l.options, f = l.fetchOptions?.meta?.fetchMore?.direction, h = l.state.data?.pages || [], m = l.state.data?.pageParams || [];
    let p = {
      pages: [],
      pageParams: []
    }, y = 0;
    const b = async () => {
      let S = !1;
      const g = (R) => {
        Fb(R, () => l.signal, () => S = !0);
      }, O = zy(l.options, l.fetchOptions), U = async (R, N, A) => {
        if (S) return Promise.reject(l.signal.reason);
        if (N == null && R.pages.length) return Promise.resolve(R);
        const Y = (() => {
          const I = {
            client: l.client,
            queryKey: l.queryKey,
            pageParam: N,
            direction: A ? "backward" : "forward",
            meta: l.options.meta
          };
          return g(I), I;
        })(), se = await O(Y), { maxPages: pe } = l.options, ee = A ? Ib : Jb;
        return {
          pages: ee(R.pages, se, pe),
          pageParams: ee(R.pageParams, N, pe)
        };
      };
      if (f && h.length) {
        const R = f === "backward", N = R ? l_ : Rv, A = {
          pages: h,
          pageParams: m
        };
        p = await U(A, N(c, A), R);
      } else {
        const R = a ?? h.length;
        do {
          const N = y === 0 ? m[0] ?? c.initialPageParam : Rv(c, p);
          if (y > 0 && N == null) break;
          p = await U(p, N), y++;
        } while (y < R);
      }
      return p;
    };
    l.options.persister ? l.fetchFn = () => l.options.persister?.(b, {
      client: l.client,
      queryKey: l.queryKey,
      meta: l.options.meta,
      signal: l.signal
    }, s) : l.fetchFn = b;
  } };
}
function Rv(a, { pages: l, pageParams: s }) {
  const c = l.length - 1;
  return l.length > 0 ? a.getNextPageParam(l[c], l, s[c], s) : void 0;
}
function l_(a, { pages: l, pageParams: s }) {
  return l.length > 0 ? a.getPreviousPageParam?.(l[0], l, s[0], s) : void 0;
}
var u_ = class extends Cy {
  #e;
  #t;
  #n;
  #a;
  #l;
  #i;
  #u;
  #r;
  constructor(a) {
    super(), this.#r = !1, this.#u = a.defaultOptions, this.setOptions(a.options), this.observers = [], this.#l = a.client, this.#a = this.#l.getQueryCache(), this.queryKey = a.queryKey, this.queryHash = a.queryHash, this.#t = Dv(this.options), this.state = a.state ?? this.#t, this.scheduleGc();
  }
  /**
  * The `meta` object passed in the query's options, if any.
  * @returns The query's `meta`, or `undefined` if none was set.
  */
  get meta() {
    return this.options.meta;
  }
  /**
  * `'infinite'` for an infinite query, otherwise `undefined`.
  * @internal
  * @returns The type of the query, set from the `_type` option (e.g. `'infinite'`).
  */
  get queryType() {
    return this.#e;
  }
  /**
  * The promise for the currently in-flight fetch, if the query is fetching.
  * `undefined` when the query is not fetching.
  * @returns The promise of the in-flight fetch, or `undefined`.
  */
  get promise() {
    return this.#i?.promise;
  }
  /**
  * Replaces the query's options and applies their `gcTime`. If the query has no data yet, it gets
  * the `initialData` from the new options, if any.
  * @internal
  * @param options - The new query options, merged on top of the query's default options.
  */
  setOptions(a) {
    if (this.options = {
      ...this.#u,
      ...a
    }, a?._type && (this.#e = a._type), this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
      const l = Dv(this.options);
      l.data !== void 0 && (this.setState(Mv(l.data, l.dataUpdatedAt)), this.#t = l);
    }
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && this.#a.remove(this);
  }
  /**
  * Writes new data to the query and marks it as successfully fetched.
  * @internal
  * @param newData - The data to write. Structural sharing with the current data is applied.
  * @param options - Set `updatedAt` to override the timestamp, and `manual` to mark the write as
  * manual (e.g. from `queryClient.setQueryData`).
  * @returns The data that was written.
  */
  setData(a, l) {
    const s = vf(this.state.data, a, this.options);
    return this.#s({
      data: s,
      type: "success",
      dataUpdatedAt: l?.updatedAt,
      manual: l?.manual
    }), s;
  }
  /**
  * Merges the given partial state directly into this query's state, notifying observers. Used
  * by persistence and broadcast plugins to restore a state snapshot, and by devtools to let a
  * user manually trigger a loading/error state or edit the cached data.
  * @param state - The partial state to merge into the query's state.
  */
  setState(a) {
    this.#s({
      type: "setState",
      state: a
    });
  }
  /**
  * Cancels the query's currently in-flight fetch, if any.
  * - Returns a promise that resolves once the cancellation has settled.
  * - If no fetch is in progress, resolves immediately.
  * @param options - Set `revert` to restore the state from before the fetch started, and `silent`
  * to suppress the cancellation error when a new fetch replaces the cancelled one.
  * @returns A promise that resolves once the cancellation has settled.
  * @example
  * ```ts
  * await query.cancel()
  * ```
  */
  cancel(a) {
    const l = this.#i?.promise;
    return this.#i?.cancel(a), l ? l.then(Qt).catch(Qt) : Promise.resolve();
  }
  /**
  * Clears the query's garbage collection timeout and silently cancels any
  * in-flight fetch. Called by `QueryCache` when the query is removed from
  * the cache.
  * @see {@link Query#cancel}
  */
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  /**
  * The state the query was created with.
  * @internal
  * @returns The state the query had when it was first created, used by {@link Query#reset}.
  */
  get resetState() {
    return this.#t;
  }
  /**
  * Resets the query back to its initial state (the state it had when it was
  * first created, e.g. any `initialData`), destroying it first to cancel any
  * in-flight fetch.
  */
  reset() {
    this.destroy(), this.setState(this.resetState);
  }
  /**
  * Returns `true` if the query has at least one observer for which `enabled`
  * does not resolve to `false`.
  * @returns `true` if the query has an enabled observer.
  */
  isActive() {
    return this.observers.some((a) => $e(a.options.enabled, this) !== !1);
  }
  /**
  * Returns `true` if the query is disabled, meaning it will not fetch
  * automatically.
  * - If the query has observers, it is disabled when none of them are active
  *   (see `isActive`).
  * - If the query has no observers, it is disabled when its `queryFn` is
  *   `skipToken` or it has never been fetched.
  * @returns `true` if the query is disabled.
  */
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Mf || !this.isFetched();
  }
  /**
  * Returns `true` if the query has been fetched, i.e. it has resolved with
  * either data or an error at least once.
  * @returns `true` if the query has been fetched.
  */
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  /**
  * Returns `true` if the query has at least one observer configured with
  * `staleTime: 'static'`, meaning it is treated as never stale.
  * @returns `true` if the query is static.
  */
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some((a) => $e(a.options.staleTime, this) === "static") : !1;
  }
  /**
  * Returns `true` if the query is stale.
  * - If the query has observers, defers to whether any observer's current
  *   result reports `isStale` (which accounts for each observer's own
  *   `staleTime` and `enabled` state).
  * - If the query has no observers, it is considered stale when it has no
  *   data or has been invalidated.
  * @returns `true` if the query is stale.
  * @see {@link Query#isStaleByTime}
  * @example
  * ```ts
  * if (query.isStale()) {
  *   // refetch or otherwise treat the cached data as outdated
  * }
  * ```
  */
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some((a) => a.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated;
  }
  /**
  * Returns `true` if the query's data is stale relative to the given
  * `staleTime` (defaults to `0`).
  * - A query with no data is always stale.
  * - `staleTime: 'static'` is never stale.
  * - An invalidated query is always stale.
  * - Otherwise, staleness is based on elapsed time since `dataUpdatedAt`.
  * @param staleTime - The time, in milliseconds, after which data is considered stale, or
  * `'static'` to never treat existing data as stale. A query without data is stale either way.
  * @returns `true` if the query's data is stale.
  * @see {@link Query#isStale}
  * @example
  * ```ts
  * const isStale = query.isStaleByTime(1000 * 60)
  * ```
  */
  isStaleByTime(a = 0) {
    return this.state.data === void 0 ? !0 : a === "static" ? !1 : this.state.isInvalidated ? !0 : !jy(this.state.dataUpdatedAt, a);
  }
  /**
  * Refetches the query when the window regains focus, if an observer wants that, and continues a
  * paused fetch.
  * @internal
  */
  onFocus() {
    this.observers.find((a) => a.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }), this.#i?.continue();
  }
  /**
  * Refetches the query when the app reconnects, if an observer wants that, and continues a paused
  * fetch.
  * @internal
  */
  onOnline() {
    this.observers.find((a) => a.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }), this.#i?.continue();
  }
  /**
  * Subscribes an observer to the query and stops its garbage collection.
  * @internal
  * @param observer - The observer to add. Adding an observer that is already subscribed does
  * nothing.
  */
  addObserver(a) {
    this.observers.includes(a) || (this.observers.push(a), this.clearGcTimeout(), this.#a.notify({
      type: "observerAdded",
      query: this,
      observer: a
    }));
  }
  /**
  * Unsubscribes an observer from the query.
  * @internal
  * @param observer - The observer to remove. When the last observer is removed, the in-flight
  * fetch is cancelled if its abort signal was consumed (otherwise only its retries are stopped),
  * and garbage collection is scheduled.
  */
  removeObserver(a) {
    const l = this.observers.indexOf(a);
    l !== -1 && (this.observers.splice(l, 1), this.observers.length || (this.#i && (this.#r || this.state.fetchStatus === "paused" && this.state.status === "pending" ? this.#i.cancel({ revert: !0 }) : this.#i.cancelRetry()), this.scheduleGc()), this.#a.notify({
      type: "observerRemoved",
      query: this,
      observer: a
    }));
  }
  /**
  * Returns the number of observers currently subscribed to this query.
  * @returns The number of observers.
  * @example
  * ```ts
  * if (query.getObserversCount() === 0) {
  *   // no component is currently watching this query
  * }
  * ```
  */
  getObserversCount() {
    return this.observers.length;
  }
  /**
  * Marks the query as invalidated, unless it is already invalidated. This
  * updates `state.isInvalidated` and notifies observers, but does not by
  * itself trigger a refetch.
  * @example
  * ```ts
  * query.invalidate()
  * ```
  */
  invalidate() {
    this.state.isInvalidated || this.#s({ type: "invalidate" });
  }
  /**
  * Fetches the query, i.e. runs its `queryFn` (through any configured
  * retryer/behavior) and updates the query's state with the result.
  * - If a fetch is already in flight, returns its promise instead of
  *   starting a new one, unless `fetchOptions.cancelRefetch` is set and the
  *   query already has data, in which case the current fetch is silently
  *   cancelled first.
  * - If `options` is passed, it replaces the query's current options
  *   before fetching.
  * @param options - Query options that replace the query's current options before fetching. They
  * are not applied when an in-flight fetch is reused.
  * @param fetchOptions - Set `cancelRefetch` to cancel an in-flight fetch first (only if the query
  * already has data), and `meta` to pass extra information to the query's behavior.
  * @returns A promise that resolves with the fetched data, or rejects with the fetch error. If the
  * fetch is cancelled with `revert` while the query has data, it resolves with the restored data
  * instead.
  */
  async fetch(a, l) {
    if (this.state.fetchStatus !== "idle" && this.#i?.status() !== "rejected") {
      if (this.state.data !== void 0 && l?.cancelRefetch) this.cancel({ silent: !0 });
      else if (this.#i)
        return this.#i.continueRetry(), this.#i.promise;
    }
    if (a && this.setOptions(a), !this.options.queryFn) {
      const y = this.observers.find((b) => b.options.queryFn);
      y && this.setOptions(y.options);
    }
    const s = new AbortController(), c = (y) => {
      Object.defineProperty(y, "signal", {
        enumerable: !0,
        get: () => (this.#r = !0, s.signal)
      });
    }, f = () => {
      const y = zy(this.options, l), S = (() => {
        const g = {
          client: this.#l,
          queryKey: this.queryKey,
          meta: this.meta
        };
        return c(g), g;
      })();
      return this.#r = !1, this.options.persister ? this.options.persister(y, S, this) : y(S);
    }, m = (() => {
      const y = {
        fetchOptions: l,
        options: this.options,
        queryKey: this.queryKey,
        client: this.#l,
        state: this.state,
        fetchFn: f
      };
      return c(y), y;
    })();
    (this.#e === "infinite" ? i_(this.options.pages) : this.options.behavior)?.onFetch(m, this), this.#n = this.state, (this.state.fetchStatus === "idle" || this.state.fetchMeta !== m.fetchOptions?.meta) && this.#s({
      type: "fetch",
      meta: m.fetchOptions?.meta
    });
    const p = this.#i = Ny({
      initialPromise: l?.initialPromise,
      fn: m.fetchFn,
      onCancel: (y) => {
        y instanceof yf && y.revert && this.setState({
          ...this.#n,
          fetchStatus: "idle"
        }), s.abort();
      },
      onFail: (y, b) => {
        this.#s({
          type: "failed",
          failureCount: y,
          error: b
        });
      },
      onPause: () => {
        this.#s({ type: "pause" });
      },
      onContinue: () => {
        this.#s({ type: "continue" });
      },
      retry: m.options.retry,
      retryDelay: m.options.retryDelay,
      networkMode: m.options.networkMode,
      canRun: () => !0
    });
    try {
      const y = await p.start();
      if (y === void 0)
        throw new Error(`${this.queryHash} data is undefined`);
      return this.setData(y), this.#a.config.onSuccess?.(y, this), this.#a.config.onSettled?.(y, this.state.error, this), y;
    } catch (y) {
      if (y instanceof yf) {
        if (y.silent) return this.#i.promise;
        if (y.revert) {
          if (this.state.data === void 0) throw y;
          return this.state.data;
        }
      }
      throw this.#s({
        type: "error",
        error: y
      }), this.#a.config.onError?.(y, this), this.#a.config.onSettled?.(this.state.data, y, this), y;
    } finally {
      this.#i === p && (this.#i = void 0), this.scheduleGc();
    }
  }
  #s(a) {
    const l = (s) => {
      switch (a.type) {
        case "failed":
          return {
            ...s,
            fetchFailureCount: a.failureCount,
            fetchFailureReason: a.error
          };
        case "pause":
          return {
            ...s,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...s,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...s,
            ...Ay(s.data, this.options),
            fetchMeta: a.meta ?? null
          };
        case "success":
          const c = {
            ...s,
            ...Mv(a.data, a.dataUpdatedAt),
            dataUpdateCount: s.dataUpdateCount + 1,
            ...!a.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
          return this.#n = a.manual ? c : void 0, c;
        case "error":
          const f = a.error;
          return {
            ...s,
            error: f,
            errorUpdateCount: s.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: s.fetchFailureCount + 1,
            fetchFailureReason: f,
            fetchStatus: "idle",
            status: "error",
            isInvalidated: !0
          };
        case "invalidate":
          return {
            ...s,
            isInvalidated: !0
          };
        case "setState":
          return {
            ...s,
            ...a.state
          };
      }
    };
    this.state = l(this.state), xt.batch(() => {
      this.observers.slice().forEach((s) => {
        s.onQueryUpdate();
      }), this.#a.notify({
        query: this,
        type: "updated",
        action: a
      });
    });
  }
};
function Ay(a, l) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Ty(l.networkMode) ? "fetching" : "paused",
    ...a === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function Mv(a, l) {
  return {
    data: a,
    dataUpdatedAt: l ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success"
  };
}
function Dv(a) {
  const l = typeof a.initialData == "function" ? a.initialData() : a.initialData, s = l !== void 0, c = s ? typeof a.initialDataUpdatedAt == "function" ? a.initialDataUpdatedAt() : a.initialDataUpdatedAt : 0;
  return {
    data: l,
    dataUpdateCount: 0,
    dataUpdatedAt: s ? c ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: s ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var s_ = class extends Nu {
  #e;
  #t = void 0;
  #n = void 0;
  #a = void 0;
  #l;
  #i;
  #u;
  #r;
  #s;
  #h;
  #o;
  #f;
  #c;
  #m = /* @__PURE__ */ new Set();
  constructor(a, l) {
    super(), this.options = l, this.#e = a, this.#u = null, this.bindMethods(), this.setOptions(l);
  }
  /**
  * Binds the methods of the result (`refetch`) to the observer, so they keep working when destructured
  * from it. Subclasses override it to bind their own result methods as well.
  */
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 && (this.#t.addObserver(this), Uv(this.#t, this.options) ? this.#d() : this.updateResult(), this.#b());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  /**
  * Returns whether the observed query is currently stale and configured
  * (via the `refetchOnReconnect` option) to refetch when the network
  * reconnects.
  * @returns `true` if the observer should refetch the query on reconnect.
  */
  shouldFetchOnReconnect() {
    return gf(this.#t, this.options, this.options.refetchOnReconnect);
  }
  /**
  * Returns whether the observed query is currently stale and configured
  * (via the `refetchOnWindowFocus` option) to refetch when the window
  * regains focus.
  * @returns `true` if the observer should refetch the query on window focus.
  */
  shouldFetchOnWindowFocus() {
    return gf(this.#t, this.options, this.options.refetchOnWindowFocus);
  }
  /**
  * Stops observing the current query: clears all listeners, cancels the
  * stale and refetch-interval timers, and removes this observer from the
  * query it was observing.
  */
  destroy() {
    this.listeners = /* @__PURE__ */ new Set(), this.#_(), this.#S(), this.#t.removeObserver(this);
  }
  /**
  * Updates the observer's options. This will re-resolve the query being
  * observed (switching to a different query if the `queryKey` changed),
  * trigger a fetch if the new options require one and the observer has
  * subscribers, recompute the current result, and reschedule the stale and
  * refetch-interval timers as needed.
  * @param options - The new observer options. They are defaulted with {@link
  * QueryClient#defaultQueryOptions} before being applied.
  * @throws {Error} If `enabled` is neither a boolean nor a function.
  * @example
  * ```ts
  * observer.setOptions({ queryKey: ['posts', 1], queryFn: () => fetchPost(1) })
  * // later: switch to a different query, reusing the same observer
  * observer.setOptions({ queryKey: ['posts', 2], queryFn: () => fetchPost(2) })
  * ```
  */
  setOptions(a) {
    const l = this.options, s = this.#t;
    if (this.options = this.#e.defaultQueryOptions(a), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof $e(this.options.enabled, this.#t) != "boolean") throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
    this.#x(), this.#t.setOptions(this.options), l._defaulted && !rf(this.options, l) && this.#e.getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: this.#t,
      observer: this
    });
    const c = this.hasListeners();
    c && qv(this.#t, s, this.options, l) && this.#d(), this.updateResult(), c && (this.#t !== s || $e(this.options.enabled, this.#t) !== $e(l.enabled, this.#t) || $e(this.options.staleTime, this.#t) !== $e(l.staleTime, this.#t)) && this.#v();
    const f = this.#y();
    c && (this.#t !== s || $e(this.options.enabled, this.#t) !== $e(l.enabled, this.#t) || f !== this.#c) && this.#g(f);
  }
  /**
  * Computes the result the observer would produce for the given (already-defaulted) options
  * right now, building the underlying `Query` if it doesn't exist yet, without waiting for a
  * subscription callback. Called by framework adapters on every render (e.g. `useQuery`) so the
  * returned value is available synchronously, ahead of `setOptions` triggering an actual fetch.
  * @param options - The defaulted observer options to compute the result for.
  * @returns The result for the given options.
  */
  getOptimisticResult(a) {
    const l = this.#e.getQueryCache().build(this.#e, a), s = this.createResult(l, a);
    return rf(this.getCurrentResult(), s) || (this.#a = s, this.#i = this.options, this.#l = this.#t.state), s;
  }
  /**
  * Returns the most recently computed `QueryObserverResult` for the
  * observed query. This is a point-in-time read; to be notified of updates
  * as they happen, subscribe to the observer instead (its inherited
  * `subscribe` method).
  * @returns The observer's latest result.
  * @example
  * ```ts
  * const result = observer.getCurrentResult()
  * console.log(result.status, result.data)
  * ```
  */
  getCurrentResult() {
    return this.#a;
  }
  /**
  * Wraps a `QueryObserverResult` in a `Proxy` that records which properties are read, via
  * {@link QueryObserver#trackProp} (and an optional `onPropTracked` callback). Used by framework
  * adapters when `notifyOnChangeProps` is not set, to implement its default "only re-render on
  * properties you actually read" behavior.
  * @param result - The result to wrap.
  * @param onPropTracked - Called with the name of each property that is read.
  * @returns A proxy of `result` that tracks property reads.
  */
  trackResult(a, l) {
    return new Proxy(a, { get: (s, c) => (this.trackProp(c), l?.(c), Reflect.get(s, c)) });
  }
  /**
  * Records that the given `QueryObserverResult` property was read, so a subsequent update only
  * notifies this observer if a tracked property actually changed. Normally called indirectly via
  * {@link QueryObserver#trackResult}'s proxy; exposed directly for adapters that track property
  * access themselves (e.g. through their own reactivity system) instead of via the proxy.
  * @param key - The name of the property that was read.
  */
  trackProp(a) {
    this.#m.add(a);
  }
  /**
  * Returns the `Query` instance this observer is currently observing.
  * @returns The observed query.
  */
  getCurrentQuery() {
    return this.#t;
  }
  /**
  * Refetches the observed query and returns a promise that resolves with
  * the resulting `QueryObserverResult`.
  * @param options - Set `cancelRefetch` to `false` to keep a running fetch instead of cancelling
  * it, and `throwOnError` to `true` to reject when the refetch fails.
  * @returns A promise that resolves with the result after the refetch.
  * @example
  * ```ts
  * const result = await observer.refetch({ cancelRefetch: false })
  * console.log(result.data)
  * ```
  */
  refetch({ ...a } = {}) {
    return this.fetch({ ...a });
  }
  /**
  * Fetches a query defined by the given options without affecting this
  * observer's own tracked query or result, and returns a promise that
  * resolves with the `QueryObserverResult` for that fetch. This is useful
  * for prefetching data that another observer (e.g. a query about to be
  * navigated to) will need, ahead of time.
  * @param options - The observer options of the query to fetch.
  * @returns A promise that resolves with the result for the fetched query.
  * @example
  * ```ts
  * const result = await observer.fetchOptimistic({
  *   queryKey: ['posts', 2],
  *   queryFn: () => fetchPost(2),
  * })
  * console.log(result.data)
  * ```
  */
  fetchOptimistic(a) {
    const l = this.#e.defaultQueryOptions(a), s = this.#e.getQueryCache().build(this.#e, l);
    let c = () => {
    }, f;
    const h = new Promise((m) => {
      f = m, c = this.#e.getQueryCache().subscribe((p) => {
        p.type === "updated" && p.query.queryHash === s.queryHash && s.state.data !== void 0 && (c(), m(this.createResult(s, l)));
      });
    });
    return Promise.race([s.fetch().then(() => {
      const m = this.createResult(s, l);
      return f?.(m), m;
    }).finally(() => {
      c();
    }), h]);
  }
  /**
  * Fetches the observed query and updates the result once the fetch settles. Used by `refetch` and,
  * in `InfiniteQueryObserver`, to fetch more pages.
  * @param fetchOptions - Options for this fetch. `cancelRefetch` defaults to `true`.
  * @returns A promise that resolves with the updated result.
  */
  fetch(a) {
    return this.#d({
      ...a,
      cancelRefetch: a.cancelRefetch ?? !0
    }).then(() => (this.updateResult(), this.#a));
  }
  #d(a) {
    this.#x();
    let l = this.#t.fetch(this.options, a);
    return a?.throwOnError || (l = l.catch(Qt)), l;
  }
  #p(a) {
    return !Df() && $e(this.options.enabled, this.#t) !== !1 && xy(a);
  }
  #v() {
    this.#_();
    const a = $e(this.options.staleTime, this.#t);
    if (this.#a.isStale || !this.#p(a)) return;
    const l = jy(this.#a.dataUpdatedAt, a) + 1;
    this.#o = di.setTimeout(() => {
      this.#a.isStale || this.updateResult();
    }, l);
  }
  #y() {
    return $e(this.options.refetchInterval, this.#t) ?? !1;
  }
  #g(a) {
    this.#S(), this.#c = a, !(this.#c === 0 || !this.#p(this.#c)) && (this.#f = di.setInterval(() => {
      (this.options.refetchIntervalInBackground || Uf.isFocused()) && this.#d();
    }, this.#c));
  }
  #b() {
    this.#v(), this.#g(this.#y());
  }
  #_() {
    this.#o !== void 0 && (di.clearTimeout(this.#o), this.#o = void 0);
  }
  #S() {
    this.#f !== void 0 && (di.clearInterval(this.#f), this.#f = void 0);
  }
  /**
  * Computes the result for a query and options from the query's state, applying `select`,
  * `placeholderData`, and the derived flags. Subclasses override it to add their own fields.
  * @param query - The query to compute the result for.
  * @param options - The observer options to compute the result with.
  * @returns The computed result.
  */
  createResult(a, l) {
    const s = this.#t, c = this.options, f = this.#a, h = this.#l, m = this.#i, p = a !== s ? a.state : this.#n, { state: y } = a;
    let b = { ...y }, S = !1, g;
    if (l._optimisticResults) {
      const ee = this.hasListeners(), I = !ee && Uv(a, l), F = ee && qv(a, s, l, c);
      (I || F) && (b = {
        ...b,
        ...Ay(y.data, a.options)
      }), l._optimisticResults === "isRestoring" && (b.fetchStatus = "idle");
    }
    let { error: O, errorUpdatedAt: U, status: R } = b;
    g = b.data;
    let N = !1;
    if (l.placeholderData !== void 0 && g === void 0 && R === "pending") {
      let ee;
      f?.isPlaceholderData && l.placeholderData === m?.placeholderData ? (ee = f.data, N = !0) : ee = typeof l.placeholderData == "function" ? l.placeholderData(this.#h?.state.data, this.#h) : l.placeholderData, ee !== void 0 && (R = "success", g = vf(f?.data, ee, l), S = !0);
    }
    if (l.select && g !== void 0 && !N)
      if (f && g === h?.data && l.select === this.#r) g = this.#s;
      else try {
        this.#r = l.select, g = l.select(g), g = vf(f?.data, g, l), this.#s = g, this.#u = null;
      } catch (ee) {
        this.#u = ee;
      }
    else g === void 0 && (this.#u = null);
    this.#u && (O = this.#u, g = this.#s, U = Date.now(), R = "error", S = !1);
    const A = b.fetchStatus === "fetching", M = R === "pending", Y = R === "error", se = M && A, pe = g !== void 0;
    return {
      status: R,
      fetchStatus: b.fetchStatus,
      isPending: M,
      isSuccess: R === "success",
      isError: Y,
      isInitialLoading: se,
      isLoading: se,
      data: g,
      dataUpdatedAt: b.dataUpdatedAt,
      error: O,
      errorUpdatedAt: U,
      failureCount: b.fetchFailureCount,
      failureReason: b.fetchFailureReason,
      errorUpdateCount: b.errorUpdateCount,
      isFetched: a.isFetched(),
      isFetchedAfterMount: b.dataUpdateCount > p.dataUpdateCount || b.errorUpdateCount > p.errorUpdateCount,
      isFetching: A,
      isRefetching: A && !M,
      isLoadingError: Y && !pe,
      isPaused: b.fetchStatus === "paused",
      isPlaceholderData: S,
      isRefetchError: Y && pe,
      isStale: qf(a, l),
      refetch: this.refetch,
      isEnabled: $e(l.enabled, a) !== !1
    };
  }
  /**
  * Recomputes and stores the current result from the current query/options, notifying listeners
  * if it changed. Framework adapters call this right after subscribing to make sure no query
  * update was missed in the gap between creating the observer and subscribing to it.
  */
  updateResult() {
    const a = this.#a, l = this.createResult(this.#t, this.options);
    if (this.#l = this.#t.state, this.#i = this.options, this.#l.data !== void 0 && (this.#h = this.#t), rf(l, a)) return;
    this.#a = l;
    const c = (() => {
      if (!a) return !0;
      const { notifyOnChangeProps: f } = this.options, h = typeof f == "function" ? f() : f;
      if (h === "all" || !h && !this.#m.size) return !0;
      const m = new Set(h ?? this.#m);
      return this.options.throwOnError && m.add("error"), Object.keys(this.#a).some((p) => {
        const y = p;
        return this.#a[y] !== a[y] && m.has(y);
      });
    })();
    xt.batch(() => {
      c && this.listeners.forEach((f) => {
        f(this.#a);
      }), this.#e.getQueryCache().notify({
        query: this.#t,
        type: "observerResultsUpdated"
      });
    });
  }
  #x() {
    const a = this.#e.getQueryCache().build(this.#e, this.options);
    if (a === this.#t) return;
    const l = this.#t;
    this.#t = a, this.#n = a.state, this.hasListeners() && (l?.removeObserver(this), a.addObserver(this));
  }
  /**
  * Updates the observer's result when the observed query changes, and reschedules its timers if it
  * has listeners.
  * @internal
  */
  onQueryUpdate() {
    this.updateResult(), this.hasListeners() && this.#b();
  }
};
function r_(a, l) {
  return $e(l.enabled, a) !== !1 && a.state.data === void 0 && !(a.state.status === "error" && $e(l.retryOnMount, a) === !1);
}
function Uv(a, l) {
  return r_(a, l) || a.state.data !== void 0 && gf(a, l, l.refetchOnMount);
}
function gf(a, l, s) {
  if ($e(l.enabled, a) !== !1 && $e(l.staleTime, a) !== "static") {
    const c = $e(s, a);
    return c === "always" || c !== !1 && qf(a, l);
  }
  return !1;
}
function qv(a, l, s, c) {
  return (a !== l || $e(c.enabled, a) === !1) && (!s.suspense || a.state.status !== "error") && qf(a, s);
}
function qf(a, l) {
  return $e(l.enabled, a) !== !1 && a.isStaleByTime($e(l.staleTime, a));
}
var c_ = class extends Cy {
  #e;
  #t;
  #n;
  #a;
  constructor(a) {
    super(), this.#e = a.client, this.mutationId = a.mutationId, this.#n = a.mutationCache, this.#t = [], this.state = a.state || o_(), this.setOptions(a.options), this.scheduleGc();
  }
  /**
  * Replaces the mutation's options and applies their `gcTime`.
  * @internal
  * @param options - The new mutation options.
  */
  setOptions(a) {
    this.options = a, this.updateGcTime(this.options.gcTime);
  }
  /**
  * The `meta` object passed in the mutation's options, if any.
  * @returns The mutation's `meta`, or `undefined` if none was set.
  */
  get meta() {
    return this.options.meta;
  }
  /**
  * Subscribes an observer to the mutation and stops its garbage collection.
  * @internal
  * @param observer - The observer to add. Adding an observer that is already subscribed does
  * nothing.
  */
  addObserver(a) {
    this.#t.includes(a) || (this.#t.push(a), this.clearGcTimeout(), this.#n.notify({
      type: "observerAdded",
      mutation: this,
      observer: a
    }));
  }
  /**
  * Unsubscribes an observer from the mutation.
  * @internal
  * @param observer - The observer to remove. Garbage collection is scheduled afterwards.
  */
  removeObserver(a) {
    this.#t = this.#t.filter((l) => l !== a), this.scheduleGc(), this.#n.notify({
      type: "observerRemoved",
      mutation: this,
      observer: a
    });
  }
  optionalRemove() {
    this.#t.length || (this.state.status === "pending" ? this.scheduleGc() : this.#n.remove(this));
  }
  /**
  * Resumes a mutation that is currently paused or was restored from a
  * dehydrated, still-`pending` state.
  *
  * - If this mutation has an active retryer (it paused mid-attempt, e.g. due
  *   to the network mode or scope-based queuing), its retryer is resumed.
  * - Otherwise, if the mutation's status is still `pending` (e.g. it was
  *   dehydrated while an attempt was in flight and never got a retryer in
  *   this instance), `execute` is called again with the last known variables.
  * - Otherwise the mutation has already settled and this resolves immediately
  *   without running anything again.
  * @returns A promise that settles with the resumed mutation: it rejects if the mutation fails.
  * It resolves immediately if the mutation has already settled.
  * @see {@link Mutation#execute}
  * @example
  * ```ts
  * // typically driven by reconnect handling, e.g. queryClient.resumePausedMutations()
  * const mutation = mutationCache.find({ mutationKey: ['addPost'] })
  * await mutation?.continue()
  * ```
  */
  continue() {
    return this.#a?.continue() ?? (this.state.status === "pending" ? this.execute(this.state.variables) : Promise.resolve());
  }
  /**
  * Runs the mutation function for the given variables through a retryer, and
  * drives the mutation's state and lifecycle callbacks through to settlement.
  *
  * If this mutation's state is already `pending` when `execute` is called
  * (i.e. it was restored, still in-flight, from a dehydrated state), the
  * `onMutate` step is skipped and a `continue` action is dispatched to
  * unpause it; otherwise a `pending` action is dispatched first, then the
  * mutation cache's `onMutate` and the mutation's own `onMutate` option are
  * awaited in that order, and the resulting context is stored.
  *
  * The mutation function is then run (subject to `retry`/`retryDelay`/
  * `networkMode`, and to the mutation cache's scope-based serialization).
  * On success, the cache's `onSuccess`/`onSettled` callbacks run before the
  * mutation's own `onSuccess`/`onSettled` options, a `success` action is
  * dispatched, and the resolved data is returned. On failure, the same
  * cache-then-option ordering is used for `onError`/`onSettled`, but each of
  * those four callbacks is individually caught so that a throwing callback
  * cannot mask the original error; an `error` action is then dispatched and
  * the original error is re-thrown.
  * @param variables - The variables passed to the `mutationFn`.
  * @returns A promise that resolves with the mutation's data, or rejects with its error.
  * @see {@link Mutation#continue}
  * @example
  * ```ts
  * // Called internally by `MutationObserver.mutate` and `Mutation.continue` —
  * // applications normally trigger mutations through those, not this method.
  * const data = await mutation.execute(variables)
  * ```
  */
  async execute(a) {
    const l = () => {
      this.#l({ type: "continue" });
    }, s = {
      client: this.#e,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    }, c = this.#a = Ny({
      fn: () => this.options.mutationFn ? this.options.mutationFn(a, s) : Promise.reject(/* @__PURE__ */ new Error("No mutationFn found")),
      onFail: (m, p) => {
        this.#l({
          type: "failed",
          failureCount: m,
          error: p
        });
      },
      onPause: () => {
        this.#l({ type: "pause" });
      },
      onContinue: l,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#n.canRun(this)
    }), f = this.state.status === "pending", h = !c.canStart();
    try {
      if (f) l();
      else {
        this.#l({
          type: "pending",
          variables: a,
          isPaused: h
        }), this.#n.config.onMutate && await this.#n.config.onMutate(a, this, s);
        const p = await this.options.onMutate?.(a, s);
        p !== this.state.context && this.#l({
          type: "pending",
          context: p,
          variables: a,
          isPaused: h
        });
      }
      const m = await c.start();
      return await this.#n.config.onSuccess?.(m, a, this.state.context, this, s), await this.options.onSuccess?.(m, a, this.state.context, s), await this.#n.config.onSettled?.(m, null, this.state.variables, this.state.context, this, s), await this.options.onSettled?.(m, null, a, this.state.context, s), this.#l({
        type: "success",
        data: m
      }), m;
    } catch (m) {
      try {
        await this.#n.config.onError?.(m, a, this.state.context, this, s);
      } catch (p) {
        Promise.reject(p);
      }
      try {
        await this.options.onError?.(m, a, this.state.context, s);
      } catch (p) {
        Promise.reject(p);
      }
      try {
        await this.#n.config.onSettled?.(void 0, m, this.state.variables, this.state.context, this, s);
      } catch (p) {
        Promise.reject(p);
      }
      try {
        await this.options.onSettled?.(void 0, m, a, this.state.context, s);
      } catch (p) {
        Promise.reject(p);
      }
      throw this.#l({
        type: "error",
        error: m
      }), m;
    } finally {
      this.#a === c && (this.#a = void 0), this.#n.runNext(this);
    }
  }
  #l(a) {
    const l = (s) => {
      switch (a.type) {
        case "failed":
          return {
            ...s,
            failureCount: a.failureCount,
            failureReason: a.error
          };
        case "pause":
          return {
            ...s,
            isPaused: !0
          };
        case "continue":
          return {
            ...s,
            isPaused: !1
          };
        case "pending":
          return {
            ...s,
            context: a.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: a.isPaused,
            status: "pending",
            variables: a.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...s,
            data: a.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1
          };
        case "error":
          return {
            ...s,
            data: void 0,
            error: a.error,
            failureCount: s.failureCount + 1,
            failureReason: a.error,
            isPaused: !1,
            status: "error"
          };
      }
    };
    this.state = l(this.state), xt.batch(() => {
      this.#t.forEach((s) => {
        s.onMutationUpdate(a);
      }), this.#n.notify({
        mutation: this,
        type: "updated",
        action: a
      });
    });
  }
};
function o_() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var f_ = class extends Nu {
  #e;
  #t;
  #n;
  constructor(a = {}) {
    super(), this.config = a, this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#n = 0;
  }
  /**
  * Creates a mutation and adds it to the cache.
  * @internal
  * @param client - The client the mutation belongs to, used to default its options.
  * @param options - The mutation options. They are defaulted with {@link
  * QueryClient#defaultMutationOptions}.
  * @param state - The initial state of the mutation, e.g. when restoring a dehydrated mutation.
  * @returns The new mutation, already added to the cache.
  */
  build(a, l, s) {
    const c = new c_({
      client: a,
      mutationCache: this,
      mutationId: ++this.#n,
      options: a.defaultMutationOptions(l),
      state: s
    });
    return this.add(c), c;
  }
  /**
  * Adds a mutation to the cache.
  * @internal
  * @param mutation - The mutation to add. If it has a `scope`, it is queued in that scope.
  */
  add(a) {
    this.#e.add(a);
    const l = ar(a);
    if (typeof l == "string") {
      const s = this.#t.get(l);
      s ? s.push(a) : this.#t.set(l, [a]);
    }
    this.notify({
      type: "added",
      mutation: a
    });
  }
  /**
  * Removes a mutation from the cache.
  * @internal
  * @param mutation - The mutation to remove, also from its scope's queue.
  */
  remove(a) {
    if (this.#e.delete(a)) {
      const l = ar(a);
      if (typeof l == "string") {
        const s = this.#t.get(l);
        if (s)
          if (s.length > 1) {
            const c = s.indexOf(a);
            c !== -1 && s.splice(c, 1);
          } else s[0] === a && this.#t.delete(l);
      }
    }
    this.notify({
      type: "removed",
      mutation: a
    });
  }
  /**
  * Checks whether a mutation can run now, given the other mutations in its `scope`.
  * @internal
  * @param mutation - The mutation to check.
  * @returns `true` if the mutation has no `scope`, or no other mutation in its scope is pending
  * ahead of it.
  */
  canRun(a) {
    const l = ar(a);
    if (typeof l == "string") {
      const s = this.#t.get(l)?.find((c) => c.state.status === "pending");
      return !s || s === a;
    } else return !0;
  }
  /**
  * Continues the next paused mutation in the same `scope` after a mutation finishes.
  * @internal
  * @param mutation - The mutation that finished.
  * @returns A promise that resolves once the next paused mutation in the same scope has continued,
  * or immediately if there is none.
  */
  runNext(a) {
    const l = ar(a);
    return typeof l == "string" ? this.#t.get(l)?.find((s) => s !== a && s.state.isPaused)?.continue() ?? Promise.resolve() : Promise.resolve();
  }
  /**
  * Removes all mutations from the cache.
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * mutationCache.clear()
  * ```
  */
  clear() {
    xt.batch(() => {
      this.#e.forEach((a) => {
        this.notify({
          type: "removed",
          mutation: a
        });
      }), this.#e.clear(), this.#t.clear();
    });
  }
  /**
  * Returns all mutations within the cache.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a mutation in rare scenarios.
  * @returns Every mutation in the cache.
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutations = mutationCache.getAll()
  * ```
  */
  getAll() {
    return Array.from(this.#e);
  }
  /**
  * A slightly more advanced method that can be used to get an existing mutation instance from
  * the cache. If the mutation does not exist, `undefined` is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a mutation in rare scenarios.
  * @param filters - The filters to match. `exact` defaults to `true`.
  * @returns The first matching mutation, or `undefined`.
  * @see {@link MutationCache#findAll}
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutation = mutationCache.find({ mutationKey: ['addPost'] })
  * ```
  */
  find(a) {
    const l = {
      exact: !0,
      ...a
    };
    return this.getAll().find((s) => Cv(l, s));
  }
  /**
  * An even more advanced method that can be used to get existing mutation instances from the
  * cache that match the given filters. If no mutations match, an empty array is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about mutations in rare scenarios.
  * @param filters - The filters to match. Without filters, every mutation is returned.
  * @returns The matching mutations.
  * @see {@link MutationCache#find}
  * @example
  * ```ts
  * const mutationCache = queryClient.getMutationCache()
  *
  * const mutations = mutationCache.findAll({ mutationKey: ['addPost'] })
  * ```
  */
  findAll(a = {}) {
    return this.getAll().filter((l) => Cv(a, l));
  }
  /**
  * Notifies every cache listener of an event, in one batch.
  * @internal
  * @param event - The event passed to every listener.
  */
  notify(a) {
    xt.batch(() => {
      this.listeners.forEach((l) => {
        l(a);
      });
    });
  }
  /**
  * Continues every paused mutation, e.g. when the app comes back online.
  * @internal
  * @returns A promise that resolves once every paused mutation has continued and settled.
  */
  resumePausedMutations() {
    const a = this.getAll().filter((l) => l.state.isPaused);
    return xt.batch(() => Promise.all(a.map((l) => l.continue().catch(Qt))));
  }
};
function ar(a) {
  return a.options.scope?.id;
}
var d_ = class extends Nu {
  #e;
  constructor(a = {}) {
    super(), this.config = a, this.#e = /* @__PURE__ */ new Map();
  }
  /**
  * Returns the existing `Query` instance for the given options' `queryKey`/`queryHash`, or
  * builds and adds a new one to the cache if none exists yet. Used by framework adapters and
  * plugins (e.g. broadcast/persistence) that need to get-or-create a `Query` directly, bypassing
  * the reactive `QueryObserver` machinery.
  * @param client - The client the query belongs to, used to default its options.
  * @param options - The query options, including the `queryKey`. A new query is created with the
  * options defaulted by {@link QueryClient#defaultQueryOptions}.
  * @param state - The initial state of a newly created query, e.g. when hydrating. Ignored if the
  * query already exists.
  * @returns The existing or newly created query.
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const query = queryCache.build(queryClient, {
  *   queryKey: ['posts'],
  *   queryFn: fetchPosts,
  * })
  * ```
  */
  build(a, l, s) {
    const c = l.queryKey, f = l.queryHash ?? Rf(c, l);
    let h = this.get(f);
    return h || (h = new u_({
      client: a,
      queryKey: c,
      queryHash: f,
      options: a.defaultQueryOptions(l),
      state: s,
      defaultOptions: a.getQueryDefaults(c)
    }), this.add(h)), h;
  }
  /**
  * Adds a query to the cache.
  * @internal
  * @param query - The query to add. If a query with the same hash is already cached, nothing
  * happens.
  */
  add(a) {
    this.#e.has(a.queryHash) || (this.#e.set(a.queryHash, a), this.notify({
      type: "added",
      query: a
    }));
  }
  /**
  * Destroys the given `Query` and removes it from the cache, notifying subscribers with a
  * `'removed'` event. A no-op if the query is no longer the one currently stored under its hash
  * (e.g. it was already replaced). Used by plugins (e.g. the broadcast client) that mirror
  * removals across `QueryCache` instances.
  * @param query - The query to remove.
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  * const query = queryCache.find({ queryKey: ['posts'] })
  *
  * if (query) {
  *   queryCache.remove(query)
  * }
  * ```
  */
  remove(a) {
    this.#e.get(a.queryHash) === a && (a.destroy(), this.#e.delete(a.queryHash), this.notify({
      type: "removed",
      query: a
    }));
  }
  /**
  * Removes all queries from the cache.
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * queryCache.clear()
  * ```
  */
  clear() {
    xt.batch(() => {
      this.getAll().forEach((a) => {
        this.remove(a);
      });
    });
  }
  /**
  * Returns the `Query` instance stored under the given `queryHash`, or `undefined` if none
  * exists. Unlike {@link QueryCache#find}, this looks up by the already-computed hash rather
  * than by `QueryFilters`. Used by plugins (e.g. broadcast/hydration) that already have a hash
  * to look up directly.
  * @param queryHash - The hash of the query to look up.
  * @returns The query stored under the hash, or `undefined`.
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  * const queryHash = hashKey(['posts'])
  *
  * const query = queryCache.get(queryHash)
  * ```
  */
  get(a) {
    return this.#e.get(a);
  }
  /**
  * Returns all queries within the cache.
  * @returns Every query in the cache.
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const queries = queryCache.getAll()
  * ```
  */
  getAll() {
    return [...this.#e.values()];
  }
  /**
  * A slightly more advanced method that can be used to get an existing query instance from the
  * cache. This instance not only contains all the state for the query, but all of the instances,
  * and underlying guts of the query as well. If the query does not exist, `undefined` is
  * returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about a query in rare scenarios (e.g. looking at `query.state.dataUpdatedAt` to
  * decide whether a query is fresh enough to be used as an initial value).
  * @param filters - The filters to match, including the required `queryKey`. `exact` defaults to
  * `true`.
  * @returns The first matching query, or `undefined`.
  * @see {@link QueryCache#findAll}
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const query = queryCache.find({ queryKey: ['posts'] })
  * ```
  */
  find(a) {
    const l = {
      exact: !0,
      ...a
    };
    return this.getAll().find((s) => Nv(l, s));
  }
  /**
  * An even more advanced method that can be used to get existing query instances from the cache
  * that partially match a query key. If no queries match, an empty array is returned.
  *
  * This is not typically needed for most applications, but can come in handy when needing more
  * information about queries in rare scenarios.
  * @param filters - The filters to match. Without filters, every query is returned.
  * @returns The matching queries.
  * @see {@link QueryCache#find}
  * @example
  * ```ts
  * const queryCache = queryClient.getQueryCache()
  *
  * const queries = queryCache.findAll({ queryKey: ['posts'] })
  * ```
  */
  findAll(a = {}) {
    const l = this.getAll();
    return Object.keys(a).length > 0 ? l.filter((s) => Nv(a, s)) : l;
  }
  /**
  * Notifies every cache listener of an event, in one batch.
  * @internal
  * @param event - The event passed to every listener.
  */
  notify(a) {
    xt.batch(() => {
      this.listeners.forEach((l) => {
        l(a);
      });
    });
  }
  /**
  * Calls {@link Query#onFocus} on every cached query, in one batch.
  * @internal
  */
  onFocus() {
    xt.batch(() => {
      this.getAll().forEach((a) => {
        a.onFocus();
      });
    });
  }
  /**
  * Calls {@link Query#onOnline} on every cached query, in one batch.
  * @internal
  */
  onOnline() {
    xt.batch(() => {
      this.getAll().forEach((a) => {
        a.onOnline();
      });
    });
  }
}, h_ = class {
  #e;
  #t;
  #n;
  #a;
  #l;
  #i;
  #u;
  #r;
  constructor(a = {}) {
    this.#e = a.queryCache || new d_(), this.#t = a.mutationCache || new f_(), this.#n = a.defaultOptions || {}, this.#a = /* @__PURE__ */ new Map(), this.#l = /* @__PURE__ */ new Map(), this.#i = 0;
  }
  /**
  * Called by a framework adapter's `QueryClientProvider`-equivalent when it mounts, to start
  * listening for focus/online events and resume paused mutations. Ref-counted via an internal
  * mount count, so nested or multiple providers sharing the same `QueryClient` don't tear down
  * the shared listeners until the last one unmounts.
  */
  mount() {
    this.#i++, this.#i === 1 && (this.#u = Uf.subscribe(async (a) => {
      a && (await this.resumePausedMutations(), this.#e.onFocus());
    }), this.#r = dr.subscribe(async (a) => {
      a && (await this.resumePausedMutations(), this.#e.onOnline());
    }));
  }
  /**
  * The inverse of {@link QueryClient#mount} — called by a framework adapter's
  * `QueryClientProvider`-equivalent when it unmounts. Only tears down the focus/online
  * listeners once the mount count returns to `0`.
  */
  unmount() {
    this.#i--, this.#i === 0 && (this.#u?.(), this.#u = void 0, this.#r?.(), this.#r = void 0);
  }
  /**
  * Returns the number of queries in the cache that are currently fetching, optionally
  * matching a set of filters. This includes background-fetching, loading new pages, and
  * loading more infinite query results.
  * @param filters - Narrows down which fetching queries are counted. Without filters, every
  * fetching query is counted.
  * @returns The number of matching queries whose `fetchStatus` is `'fetching'`.
  * @example
  * ```ts
  * if (queryClient.isFetching()) {
  *   console.log('At least one query is fetching!')
  * }
  * ```
  */
  isFetching(a) {
    return this.#e.findAll({
      ...a,
      fetchStatus: "fetching"
    }).length;
  }
  /**
  * Returns the number of mutations in the cache that are currently pending, optionally
  * matching a set of filters.
  * @param filters - Narrows down which pending mutations are counted. Without filters, every
  * pending mutation is counted.
  * @returns The number of matching mutations whose `status` is `'pending'`.
  * @example
  * ```ts
  * if (queryClient.isMutating()) {
  *   console.log('At least one mutation is pending!')
  * }
  * ```
  */
  isMutating(a) {
    return this.#t.findAll({
      ...a,
      status: "pending"
    }).length;
  }
  /**
  * Imperative (non-reactive) way to retrieve data for a QueryKey.
  * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
  *
  * Hint: Do not use this function inside a component, because it won't receive updates.
  * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
  * @param queryKey - The query key of the query to read.
  * @returns The cached data for the query, or `undefined` if no query with this key has been observed yet.
  * @see {@link QueryClient#getQueriesData}
  */
  getQueryData(a) {
    const l = this.defaultQueryOptions({ queryKey: a });
    return this.#e.get(l.queryHash)?.state.data;
  }
  /**
  * Returns the cached data of a query, or fetches it if there is none. With `revalidateIfStale`,
  * stale cached data is also refetched in the background.
  * @param options - The query options. If the query has no cached data yet, it is fetched with
  * these options.
  * @returns A promise that resolves to the cached data, or to the fetched data if nothing was
  * cached yet.
  * @deprecated Use queryClient.query({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
  */
  ensureQueryData(a) {
    const l = this.defaultQueryOptions(a), s = this.#e.build(this, l), c = s.state.data;
    return c === void 0 ? this.fetchQuery(a) : (a.revalidateIfStale && s.isStaleByTime($e(l.staleTime, s)) && this.prefetchQuery(l), Promise.resolve(c));
  }
  /**
  * Imperative (non-reactive) way to retrieve the cached data of multiple queries at once.
  * Only queries matching the given filters are returned; if none match, an empty array is
  * returned.
  *
  * Because the matched queries can hold data of different shapes (e.g. a broad filter can match
  * queries with unrelated data types), the `TQueryFnData` generic defaults to `unknown` rather
  * than being inferred. Passing a more specific type is a convenience for call sites that know
  * every matched query holds the same shape — it is not checked against the actual cache
  * contents.
  * @param filters - The filters that select which queries to read.
  * @returns An array of query key and data pairs. The data is `undefined` for a query with no cached data.
  * @see {@link QueryClient#getQueryData}
  * @example
  * ```ts
  * const data = queryClient.getQueriesData({ queryKey: ['posts'] })
  * ```
  */
  getQueriesData(a) {
    return this.#e.findAll(a).map(({ queryKey: l, state: s }) => [l, s.data]);
  }
  /**
  * Synchronous way to immediately update a query's cached data. If the updater (or the value
  * passed) resolves to `undefined`, the cache is left untouched and no query is created;
  * otherwise, if the query does not exist yet, it will be created. To update multiple queries
  * at once by partially matching query keys, use {@link QueryClient#setQueriesData} instead.
  *
  * Updates must be performed immutably: do not mutate `oldData`, or data previously retrieved
  * via {@link QueryClient#getQueryData}, in place.
  * @param queryKey - The query key to set data for.
  * @param updater - Either the new data, or a function that receives the current data (which
  * may be `undefined`) and returns the new data.
  * @param options - Set `updatedAt` to override the timestamp the written data is recorded with.
  * @returns The data that was written, or `undefined` if the updater returned `undefined` — in that case
  * the write is skipped and the cache is left unchanged.
  * @example
  * ```ts
  * queryClient.setQueryData(['posts'], newPosts)
  *
  * // Or, using an updater function that receives the current data:
  * queryClient.setQueryData(['posts'], (oldPosts) => [...oldPosts, newPost])
  * ```
  */
  setQueryData(a, l, s) {
    const c = this.defaultQueryOptions({ queryKey: a }), f = this.#e.get(c.queryHash)?.state.data, h = Vb(l, f);
    if (h !== void 0)
      return this.#e.build(this, c).setData(h, {
        ...s,
        manual: !0
      });
  }
  /**
  * Synchronous way to immediately update the cached data of multiple queries at once, using
  * filters or partial query key matching. Only queries that already exist and match the given
  * filters are updated; no new cache entries are created. Internally this calls
  * {@link QueryClient#setQueryData} for each matching query.
  * @param filters - The filters that select which existing queries to update.
  * @param updater - Either the new data, or a function that receives each matched query's current
  * data (which may be `undefined`) and returns the new data.
  * @param options - Set `updatedAt` to override the timestamp the written data is recorded with.
  * @returns One `[queryKey, data]` tuple per matched query, in the same shape and with the same
  * `undefined` case as {@link QueryClient#setQueryData}.
  * @example
  * ```ts
  * queryClient.setQueriesData({ queryKey: ['posts'] }, (oldPosts) =>
  *   oldPosts ? oldPosts.filter((post) => post.id !== deletedId) : oldPosts,
  * )
  * ```
  */
  setQueriesData(a, l, s) {
    return xt.batch(() => this.#e.findAll(a).map(({ queryKey: c }) => [c, this.setQueryData(c, l, s)]));
  }
  /**
  * Imperative (non-reactive) way to retrieve an existing query's state. If the query does not
  * exist, `undefined` is returned.
  * @param queryKey - The query key of the query to read.
  * @returns The query's state, or `undefined` if no query with this key exists.
  * @example
  * ```ts
  * const state = queryClient.getQueryState(['posts'])
  * console.log(state?.dataUpdatedAt)
  * ```
  */
  getQueryState(a) {
    const l = this.defaultQueryOptions({ queryKey: a });
    return this.#e.get(l.queryHash)?.state;
  }
  /**
  * Removes queries from the cache that match the given filters. Unlike
  * {@link QueryClient#invalidateQueries} or {@link QueryClient#refetchQueries}, this removes
  * matching queries from the cache instead of refetching them. Without filters, every query in
  * the cache is removed.
  * @param filters - The filters that select which queries to remove. Without filters, every query
  * is removed.
  * @example
  * ```ts
  * queryClient.removeQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  removeQueries(a) {
    const l = this.#e;
    xt.batch(() => {
      l.findAll(a).forEach((s) => {
        l.remove(s);
      });
    });
  }
  /**
  * Resets queries matching the given filters back to their initial state (e.g. any
  * `initialData`), notifying subscribers rather than removing them. Active queries among the
  * matched set are then refetched, and the returned promise resolves once that refetch settles.
  * @param filters - The filters that select which queries to reset. Without filters, every query
  * is reset.
  * @param options - Passed to the refetch of the active matched queries, e.g. `cancelRefetch` and
  * `throwOnError`.
  * @returns A promise that resolves once the refetch of the active matched queries settles.
  * @example
  * ```ts
  * await queryClient.resetQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  resetQueries(a, l) {
    const s = this.#e;
    return xt.batch(() => {
      const c = s.findAll(a), f = new Set(c);
      return c.forEach((h) => {
        h.reset();
      }), this.refetchQueries({
        type: "active",
        predicate: (h) => f.has(h)
      }, l);
    });
  }
  /**
  * Cancels outgoing fetches for queries matching the given filters. Most useful when performing
  * optimistic updates, since any outgoing refetch that resolves afterwards would otherwise
  * overwrite the optimistic update. By default (`revert: true`), a cancelled query's data is
  * reverted to its state before the outgoing fetch started.
  *
  * The returned promise never rejects, even if individual cancellations fail.
  * @param filters - The filters that select which queries to cancel. Without filters, every query
  * is cancelled.
  * @param cancelOptions - Passed to each matched query's cancellation. `revert` defaults to
  * `true`.
  * @returns A promise that resolves once every cancellation has settled.
  * @example
  * ```ts
  * await queryClient.cancelQueries({ queryKey: ['posts'], exact: true })
  * ```
  */
  cancelQueries(a, l = {}) {
    const s = {
      revert: !0,
      ...l
    }, c = xt.batch(() => this.#e.findAll(a).map((f) => f.cancel(s)));
    return Promise.all(c).then(Qt).catch(Qt);
  }
  /**
  * Marks queries matching the given filters as invalidated. Unlike
  * {@link QueryClient#removeQueries}, invalidated queries stay in the cache.
  *
  * Unless `filters.refetchType` is `'none'`, matching queries are then refetched via
  * {@link QueryClient#refetchQueries}, using `filters.refetchType` if set, otherwise
  * `filters.type`, otherwise `'active'`.
  * @param filters - The filters that select which queries to invalidate, plus `refetchType` to
  * control which of them to refetch afterwards. Without filters, every query is invalidated.
  * @param options - Passed to {@link QueryClient#refetchQueries}, e.g. `cancelRefetch` and
  * `throwOnError`.
  * @returns A promise that resolves once the refetch settles, or immediately if `refetchType` is
  * `'none'`.
  * @example
  * ```ts
  * await queryClient.invalidateQueries({ queryKey: ['posts'], refetchType: 'active' })
  * ```
  */
  invalidateQueries(a, l = {}) {
    return xt.batch(() => (this.#e.findAll(a).forEach((s) => {
      s.invalidate();
    }), a?.refetchType === "none" ? Promise.resolve() : this.refetchQueries({
      ...a,
      type: a?.refetchType ?? a?.type ?? "active"
    }, l)));
  }
  /**
  * Refetches queries matching the given filters, regardless of whether they are stale. Without
  * filters, every query in the cache is refetched. Queries that are disabled, or static (only
  * have observers with a static `staleTime`), are never refetched.
  *
  * By default (`cancelRefetch: true`), a currently running fetch is cancelled before the new
  * one starts. The returned promise resolves once all matching queries have settled; it does
  * not reject on individual query failures unless `throwOnError` is set.
  * @param filters - The filters that select which queries to refetch. Without filters, every query
  * in the cache is included.
  * @param options - Set `cancelRefetch` to `false` to keep a running fetch instead of cancelling
  * it, and `throwOnError` to `true` to reject when a refetch fails.
  * @returns A promise that resolves once every matched query has settled.
  * @example
  * ```ts
  * // refetch all active queries partially matching a query key:
  * await queryClient.refetchQueries({ queryKey: ['posts'], type: 'active' })
  * ```
  */
  refetchQueries(a, l = {}) {
    const s = {
      ...l,
      cancelRefetch: l.cancelRefetch ?? !0
    }, c = xt.batch(() => this.#e.findAll(a).filter((f) => !f.isDisabled() && !f.isStatic()).map((f) => {
      let h = f.fetch(void 0, s);
      return s.throwOnError || (h = h.catch(Qt)), f.state.fetchStatus === "paused" ? Promise.resolve() : h;
    }));
    return Promise.all(c).then(Qt);
  }
  /**
  * Asynchronous method to fetch and cache a query, resolving with the data or throwing with
  * the error.
  *
  * If the query already exists in the cache and its data is not stale (per the given
  * `staleTime`), the cached data is returned without fetching. Otherwise, the query is fetched
  * and the promise resolves once the fetch settles. If a `select` function is provided, it is
  * applied to the data in both cases (cached or freshly fetched) before it is returned.
  *
  * Unlike a reactive observer, retries are disabled by default here (`retry: false`) unless
  * explicitly configured, since there is no component to catch a thrown error and retry through
  * re-render.
  *
  * The accepted options are `QueryObserverOptions` minus the fields that only make sense for a
  * reactive observer — `enabled`, `refetchInterval`, `refetchIntervalInBackground`,
  * `refetchOnWindowFocus`, `refetchOnReconnect`, `refetchOnMount`, `retryOnMount`,
  * `notifyOnChangeProps`, `throwOnError`, `suspense`, and `placeholderData` are not part of this
  * method's options.
  *
  * This method replaces the deprecated `fetchQuery`, and — combined with
  * `{ staleTime: 'static' }` — the deprecated `ensureQueryData`.
  * @param options - The query options, including the `queryKey` and the `queryFn` used if the
  * query needs to fetch.
  * @returns A promise that resolves to the data, or to the result of `select` if provided. It
  * rejects with the error from the fetch or from `select`.
  * @example
  * ```ts
  * try {
  *   const data = await queryClient.query({ queryKey, queryFn, staleTime: 10000 })
  * } catch (error) {
  *   console.log(error)
  * }
  * ```
  */
  async query(a) {
    const l = this.defaultQueryOptions(a);
    l.retry === void 0 && (l.retry = !1);
    const s = this.#e.build(this, l), c = s.isStaleByTime($e(l.staleTime, s)) ? await s.fetch(l) : s.state.data, f = l.select;
    return f ? f(c) : c;
  }
  /**
  * Fetches and caches a query, or returns its cached data if it isn't stale. Unlike in observers,
  * the fetch isn't retried unless `retry` is set.
  * @param options - The query options, including the `queryKey` and the `queryFn` used if the
  * query needs to fetch.
  * @returns A promise that resolves to the cached or fetched data, or rejects with the fetch
  * error.
  * @deprecated Use queryClient.query(options) instead. This method will be removed in the next major version.
  */
  fetchQuery(a) {
    const l = this.defaultQueryOptions(a);
    l.retry === void 0 && (l.retry = !1);
    const s = this.#e.build(this, l);
    return s.isStaleByTime($e(l.staleTime, s)) ? s.fetch(l) : Promise.resolve(s.state.data);
  }
  /**
  * Fetches and caches a query like {@link QueryClient#fetchQuery}, but ignores the result and any
  * error.
  * @param options - The query options, including the `queryKey` and the `queryFn` used if the
  * query needs to fetch.
  * @returns A promise that resolves once the fetch settles. It never rejects.
  * @deprecated Use queryClient.query(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
  */
  prefetchQuery(a) {
    return this.fetchQuery(a).then(Qt).catch(Qt);
  }
  /**
  * Asynchronous method to fetch and cache an infinite query, resolving with an
  * {@link InfiniteData} object or throwing with the error.
  *
  * Behaves like {@link QueryClient#query}, accepting the same options (minus
  * `initialPageParam`), plus the required `initialPageParam`, and an optional `pages` /
  * `getNextPageParam` pair used to refetch a fixed number of pages from the start.
  *
  * This method replaces the deprecated `fetchInfiniteQuery`, and — combined with
  * `{ staleTime: 'static' }` — the deprecated `ensureInfiniteQueryData`.
  * @param options - The infinite query options, including the `queryKey`, the `queryFn`, and the
  * `initialPageParam`.
  * @returns A promise that resolves to the {@link InfiniteData}, or to the result of `select` if
  * provided. It rejects with the error from the fetch or from `select`.
  * @example
  * ```ts
  * try {
  *   const data = await queryClient.infiniteQuery({ queryKey, queryFn, initialPageParam: 0 })
  *   console.log(data.pages)
  * } catch (error) {
  *   console.log(error)
  * }
  * ```
  */
  infiniteQuery(a) {
    return a._type = "infinite", this.query(a);
  }
  /**
  * Fetches and caches an infinite query, or returns its cached data if it isn't stale.
  * @param options - The infinite query options, including the `queryKey`, the `queryFn`, and the
  * `initialPageParam`.
  * @returns A promise that resolves to the cached or fetched {@link InfiniteData}, or rejects with
  * the fetch error.
  * @deprecated Use queryClient.infiniteQuery(options) instead. This method will be removed in the next major version.
  */
  fetchInfiniteQuery(a) {
    return a._type = "infinite", this.fetchQuery(a);
  }
  /**
  * Fetches and caches an infinite query like {@link QueryClient#fetchInfiniteQuery}, but ignores
  * the result and any error.
  * @param options - The infinite query options, including the `queryKey`, the `queryFn`, and the
  * `initialPageParam`.
  * @returns A promise that resolves once the fetch settles. It never rejects.
  * @deprecated Use queryClient.infiniteQuery(options) instead. You can swallow errors with `.catch(noop)`. This method will be removed in the next major version.
  */
  prefetchInfiniteQuery(a) {
    return this.fetchInfiniteQuery(a).then(Qt).catch(Qt);
  }
  /**
  * Returns the cached data of an infinite query, or fetches it if there is none. With
  * `revalidateIfStale`, stale cached data is also refetched in the background.
  * @param options - The infinite query options. If the query has no cached data yet, it is fetched
  * with these options.
  * @returns A promise that resolves to the cached {@link InfiniteData}, or to the fetched data if
  * nothing was cached yet.
  * @deprecated Use queryClient.infiniteQuery({ ...options, staleTime: 'static' }) instead. This method will be removed in the next major version.
  */
  ensureInfiniteQueryData(a) {
    return a._type = "infinite", this.ensureQueryData(a);
  }
  /**
  * Resumes mutations that were paused because there was no network connection. Does nothing
  * (resolving immediately) if the client is currently offline.
  * @returns A promise that resolves once the resumed mutations have settled.
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * await queryClient.resumePausedMutations()
  * ```
  */
  resumePausedMutations() {
    return dr.isOnline() ? this.#t.resumePausedMutations() : Promise.resolve();
  }
  /**
  * Returns the query cache this client is connected to.
  * @returns The {@link QueryCache} instance.
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const queryCache = queryClient.getQueryCache()
  * const queries = queryCache.findAll({ queryKey: ['posts'] })
  * ```
  */
  getQueryCache() {
    return this.#e;
  }
  /**
  * Returns the mutation cache this client is connected to.
  * @returns The {@link MutationCache} instance.
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const mutationCache = queryClient.getMutationCache()
  * const mutations = mutationCache.findAll({ status: 'pending' })
  * ```
  */
  getMutationCache() {
    return this.#t;
  }
  /**
  * Returns the default options that were set when creating the client, or via
  * {@link QueryClient#setDefaultOptions}.
  * @returns The client's current default options.
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * const defaultOptions = queryClient.getDefaultOptions()
  * ```
  */
  getDefaultOptions() {
    return this.#n;
  }
  /**
  * Dynamically sets the default options for this client, overwriting any previously defined
  * default options.
  * @param options - The new default options for queries and mutations.
  * @see {@link QueryClient#getDefaultOptions}
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * queryClient.setDefaultOptions({
  *   queries: {
  *     staleTime: Infinity,
  *   },
  * })
  * ```
  */
  setDefaultOptions(a) {
    this.#n = a;
  }
  /**
  * Sets default options for queries whose query key partially matches the given `queryKey`.
  *
  * If several registered query defaults match a given query key, they are merged together in
  * registration order by {@link QueryClient#getQueryDefaults}, so register defaults from the
  * most generic key to the least generic one — more specific defaults should be registered
  * after more generic ones so they take precedence.
  * @param queryKey - The query key that query keys are partially matched against.
  * @param options - The default options applied to matching queries.
  * @example
  * ```ts
  * queryClient.setQueryDefaults(['posts'], { queryFn: fetchPosts })
  *
  * await queryClient.query({ queryKey: ['posts'] })
  * ```
  */
  setQueryDefaults(a, l) {
    this.#a.set(Ou(a), {
      queryKey: a,
      defaultOptions: l
    });
  }
  /**
  * Returns the default options registered for queries whose query key partially matches the
  * given `queryKey`, via {@link QueryClient#setQueryDefaults}. If multiple registered defaults
  * match, they are merged together in registration order.
  * @param queryKey - The query key to look up registered defaults for.
  * @returns The merged default options of every registration that matches, or an empty object if
  * none match.
  * @example
  * ```ts
  * const defaultOptions = queryClient.getQueryDefaults(['posts'])
  * ```
  */
  getQueryDefaults(a) {
    const l = [...this.#a.values()], s = {};
    return l.forEach((c) => {
      ml(a, c.queryKey) && Object.assign(s, c.defaultOptions);
    }), s;
  }
  /**
  * Sets default options for mutations whose mutation key partially matches the given
  * `mutationKey`. As with {@link QueryClient#setQueryDefaults}, the order of registration
  * matters when several registered defaults match the same mutation key.
  * @param mutationKey - The mutation key that mutation keys are partially matched against.
  * @param options - The default options applied to matching mutations.
  * @see {@link QueryClient#getMutationDefaults}
  * @example
  * ```ts
  * queryClient.setMutationDefaults(['addPost'], { mutationFn: addPost })
  * ```
  */
  setMutationDefaults(a, l) {
    this.#l.set(Ou(a), {
      mutationKey: a,
      defaultOptions: l
    });
  }
  /**
  * Returns the default options registered for mutations whose mutation key partially matches
  * the given `mutationKey`, via {@link QueryClient#setMutationDefaults}. If multiple registered
  * defaults match, they are merged together in registration order.
  * @param mutationKey - The mutation key to look up registered defaults for.
  * @returns The merged default options of every registration that matches, or an empty object if
  * none match.
  * @example
  * ```ts
  * const defaultOptions = queryClient.getMutationDefaults(['addPost'])
  * ```
  */
  getMutationDefaults(a) {
    const l = [...this.#l.values()], s = {};
    return l.forEach((c) => {
      ml(a, c.mutationKey) && Object.assign(s, c.defaultOptions);
    }), s;
  }
  /**
  * Called by framework adapters (e.g. inside `useQuery`) to resolve the options passed by the
  * caller into their final, defaulted form: merging the client's own `defaultOptions.queries`,
  * then `queryClient.setQueryDefaults` for the given `queryKey`, then the caller's options on
  * top. A no-op if the options are already defaulted (`_defaulted: true`).
  * @param options - The query options passed by the caller.
  * @returns The defaulted options, with `queryHash` and dependent defaults (e.g.
  * `refetchOnReconnect`) filled in.
  */
  defaultQueryOptions(a) {
    if (a._defaulted) return a;
    const l = {
      ...this.#n.queries,
      ...this.getQueryDefaults(a.queryKey),
      ...a,
      _defaulted: !0
    };
    return l.queryHash || (l.queryHash = Rf(l.queryKey, l)), l.refetchOnReconnect === void 0 && (l.refetchOnReconnect = l.networkMode !== "always"), l.throwOnError === void 0 && (l.throwOnError = !!l.suspense), !l.networkMode && l.persister && (l.networkMode = "offlineFirst"), l.queryFn === Mf && (l.enabled = !1), l;
  }
  /**
  * The mutation counterpart of {@link QueryClient#defaultQueryOptions}. Called by framework
  * adapters (e.g. inside `useMutation`) to merge the client's `defaultOptions.mutations`, then
  * `queryClient.setMutationDefaults` for the given `mutationKey`, then the caller's options on
  * top. A no-op if the options are already defaulted (`_defaulted: true`).
  * @param options - The mutation options passed by the caller.
  * @returns The defaulted options.
  */
  defaultMutationOptions(a) {
    return a?._defaulted ? a : {
      ...this.#n.mutations,
      ...a?.mutationKey && this.getMutationDefaults(a.mutationKey),
      ...a,
      _defaulted: !0
    };
  }
  /**
  * Clears both the query cache and the mutation cache this client is connected to.
  * @example
  * ```ts
  * import { QueryClient } from '@tanstack/query-core'
  *
  * const queryClient = new QueryClient()
  * queryClient.clear()
  * ```
  */
  clear() {
    this.#e.clear(), this.#t.clear();
  }
};
const wy = H.createContext(!1), m_ = () => H.useContext(wy);
wy.Provider;
function p_() {
  let a = !1;
  return {
    /**
    * Clears the reset state, so queries know not to try again until the boundary is reset again.
    */
    clearReset: () => {
      a = !1;
    },
    /**
    * Resets any query errors within the boundary, so queries know they can try again.
    */
    reset: () => {
      a = !0;
    },
    /**
    * Returns whether the boundary has been reset and not yet cleared.
    * @returns `true` if the boundary has been reset and not yet cleared.
    */
    isReset: () => a
  };
}
const v_ = H.createContext(p_()), y_ = () => H.useContext(v_), g_ = (a, l, s) => {
  const c = s?.state.error && typeof a.throwOnError == "function" ? Ey(a.throwOnError, [s.state.error, s]) : a.throwOnError;
  (a.suspense || c) && (l.isReset() || (a.retryOnMount = !1));
}, b_ = (a) => {
  H.useEffect(() => {
    a.clearReset();
  }, [a]);
}, __ = ({ result: a, errorResetBoundary: l, throwOnError: s, query: c, suspense: f }) => a.isError && !l.isReset() && !a.isFetching && c && (f && a.data === void 0 || Ey(s, [a.error, c])), S_ = (a) => {
  if (a.suspense) {
    const s = (f) => f === "static" ? f : Math.max(f ?? 1e3, 1e3), c = a.staleTime;
    a.staleTime = typeof c == "function" ? (...f) => s(c(...f)) : s(c), typeof a.gcTime == "number" && (a.gcTime = Math.max(a.gcTime, 1e3));
  }
}, x_ = (a, l) => a?.suspense && l.isPending, j_ = (a, l, s) => l.fetchOptimistic(a).catch(() => {
  s.clearReset();
});
function O_(a, l, s) {
  const c = m_(), f = y_(), h = _r(), m = h.defaultQueryOptions(a), p = h.getQueryCache().get(m.queryHash), y = a.subscribed !== !1;
  m._optimisticResults = c ? "isRestoring" : y ? "optimistic" : void 0, S_(m), g_(m, f, p), b_(f);
  const [b] = H.useState(() => new l(h, m)), S = b.getOptimisticResult(m), g = !c && y;
  if (H.useSyncExternalStore(H.useCallback((O) => {
    const U = g ? b.subscribe(xt.batchCalls(O)) : Qt;
    return b.updateResult(), U;
  }, [b, g]), () => b.getCurrentResult(), () => b.getCurrentResult()), H.useEffect(() => {
    b.setOptions(m);
  }, [m, b]), x_(m, S)) throw j_(m, b, f);
  if (__({
    result: S,
    errorResetBoundary: f,
    throwOnError: m.throwOnError,
    query: p,
    suspense: m.suspense
  })) throw S.error;
  return m.notifyOnChangeProps ? S : b.trackResult(S);
}
function an(a, l) {
  return O_(a, s_);
}
const z_ = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), E_ = (a) => a.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (l, s, c) => c ? c.toUpperCase() : s.toLowerCase()
), Zv = (a) => {
  const l = E_(a);
  return l.charAt(0).toUpperCase() + l.slice(1);
}, Ry = (...a) => a.filter((l, s, c) => !!l && l.trim() !== "" && c.indexOf(l) === s).join(" ").trim(), T_ = (a) => {
  for (const l in a)
    if (l.startsWith("aria-") || l === "role" || l === "title")
      return !0;
};
var N_ = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const C_ = H.forwardRef(
  ({
    color: a = "currentColor",
    size: l = 24,
    strokeWidth: s = 2,
    absoluteStrokeWidth: c,
    className: f = "",
    children: h,
    iconNode: m,
    ...p
  }, y) => H.createElement(
    "svg",
    {
      ref: y,
      ...N_,
      width: l,
      height: l,
      stroke: a,
      strokeWidth: c ? Number(s) * 24 / Number(l) : s,
      className: Ry("lucide", f),
      ...!h && !T_(p) && { "aria-hidden": "true" },
      ...p
    },
    [
      ...m.map(([b, S]) => H.createElement(b, S)),
      ...Array.isArray(h) ? h : [h]
    ]
  )
);
const ze = (a, l) => {
  const s = H.forwardRef(
    ({ className: c, ...f }, h) => H.createElement(C_, {
      ref: h,
      iconNode: l,
      className: Ry(
        `lucide-${z_(Zv(a))}`,
        `lucide-${a}`,
        c
      ),
      ...f
    })
  );
  return s.displayName = Zv(a), s;
};
const A_ = [
  ["path", { d: "M17 7 7 17", key: "15tmo1" }],
  ["path", { d: "M17 17H7V7", key: "1org7z" }]
], w_ = ze("arrow-down-left", A_);
const R_ = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], M_ = ze("arrow-left", R_);
const D_ = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], U_ = ze("arrow-up-right", D_);
const q_ = [
  ["path", { d: "M4.929 4.929 19.07 19.071", key: "196cmz" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Z_ = ze("ban", q_);
const k_ = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
], H_ = ze("chart-column", k_);
const B_ = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], L_ = ze("check", B_);
const Q_ = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Y_ = ze("chevron-right", Q_);
const $_ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], G_ = ze("circle-check", $_);
const V_ = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
], X_ = ze("credit-card", V_);
const K_ = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], J_ = ze("download", K_);
const I_ = [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
], F_ = ze("keyboard", I_);
const P_ = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], W_ = ze("loader-circle", P_);
const eS = [["path", { d: "M5 12h14", key: "1ays0h" }]], tS = ze("minus", eS);
const nS = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
], aS = ze("monitor", nS);
const iS = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], lS = ze("moon", iS);
const uS = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
], bf = ze("package", uS);
const sS = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], rS = ze("pause", sS);
const cS = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], kv = ze("play", cS);
const oS = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], qa = ze("plus", oS);
const fS = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
], hr = ze("printer", fS);
const dS = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  ["path", { d: "M13 16H8", key: "wsln4y" }]
], hS = ze("receipt-text", dS);
const mS = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], pS = ze("refresh-cw", mS);
const vS = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], yS = ze("rotate-ccw", vS);
const gS = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
], bS = ze("scan-line", gS);
const _S = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], My = ze("search", _S);
const SS = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], xS = ze("settings", SS);
const jS = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], OS = ze("shield-check", jS);
const zS = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
], _f = ze("shopping-bag", zS);
const ES = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], TS = ze("sun", ES);
const NS = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], CS = ze("trash-2", NS);
const AS = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
], Dy = ze("wallet", AS);
const wS = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], RS = ze("wifi-off", wS);
const MS = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
], DS = ze("wifi", MS);
const US = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Sr = ze("x", US);
class fi extends Error {
  constructor(l, s, c, f = !1) {
    super(l), this.code = s, this.status = c, this.uncertain = f;
  }
  code;
  status;
  uncertain;
}
function Uy(a) {
  return a instanceof fi && !a.uncertain && [
    "STOCK_NOT_FOUND",
    "INSUFFICIENT_STOCK",
    "PRICE_MISMATCH",
    "DISCOUNT_LIMIT",
    "INVALID_DISCOUNT",
    "PRICE_OVERRIDE_DENIED",
    "CURRENCY_MISMATCH",
    "INVALID_EVENT_TIME",
    "SHIFT_UNAVAILABLE",
    "INVALID_CHANGE",
    "PAYMENT_REFERENCE_REQUIRED",
    "TENDER_TOTAL_MISMATCH",
    "INVALID_TENDER",
    "QUANTITY_LIMIT"
  ].includes(a.code);
}
const hi = () => crypto.randomUUID();
class qS {
  constructor(l, s = l.registerId) {
    this.config = l, this.registerId = s;
  }
  config;
  registerId;
  scope = "";
  async request(l, s = {}) {
    const c = new URL(
      (s.web ? this.config.webUrl : this.config.coreUrl) + "/" + l,
      location.origin
    );
    this.registerId && c.searchParams.set("register_id", String(this.registerId));
    let f;
    try {
      f = await fetch(c, {
        method: s.method || "GET",
        credentials: "same-origin",
        cache: "no-store",
        signal: s.signal || AbortSignal.timeout(2e4),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": this.config.csrf,
          ...s.key ? { "Idempotency-Key": s.key } : {}
        },
        body: s.body === void 0 ? void 0 : JSON.stringify(s.body)
      });
    } catch (m) {
      throw s.signal?.aborted ? m : new fi(
        "Connection interrupted. Your checkout identity is saved. Reconnect and retry.",
        "NETWORK",
        0,
        !0
      );
    }
    const h = await f.json().catch(() => null);
    if (!f.ok) {
      const m = h?.error?.fields || h?.errors, p = m ? Object.values(m).flat().join(" ") : "";
      throw new fi(
        p || h?.error?.message || h?.message || (f.status === 419 ? "Your session expired. Sign in again before retrying." : "The request could not be completed."),
        h?.error?.code || "HTTP_ERROR",
        f.status,
        f.status >= 500 || f.status === 408
      );
    }
    if (h === null)
      throw new fi(
        "The server response was interrupted. Retry with the saved checkout identity.",
        "BAD_RESPONSE",
        f.status,
        !0
      );
    return h;
  }
  async mutate(l, s, c = "POST", f = !1, h = hi()) {
    if (f && l.startsWith("drafts/"))
      return this.request(l, { body: s, method: c, web: f, key: h });
    const m = s && typeof s == "object" ? s : null, p = m ? { ...m } : s;
    if (p && typeof p == "object")
      for (const g of ["client_shift_id", "client_refund_id"])
        g in p && (p[g] = "operation-identity");
    const y = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(JSON.stringify(p))
        )
      )
    ).map((g) => g.toString(16).padStart(2, "0")).join(""), b = `rewa-pos:mutation:${this.scope}:${this.registerId}:${c}:${f ? "web" : "core"}:${l}`, S = sessionStorage.getItem(b);
    if (S) {
      const g = JSON.parse(S);
      if (g.digest !== y)
        throw new fi(
          "This action is awaiting acknowledgment. Retry its original values before submitting a different action.",
          "ACTION_UNRESOLVED",
          409,
          !0
        );
      if (h = g.key, m)
        for (const O of ["client_shift_id", "client_refund_id"])
          O in m && (m[O] = h);
    }
    sessionStorage.setItem(b, JSON.stringify({ key: h, digest: y }));
    try {
      const g = await this.request(l, {
        body: s,
        method: c,
        web: f,
        key: h
      });
      return sessionStorage.removeItem(b), g;
    } catch (g) {
      throw g instanceof fi && !g.uncertain && g.status !== 401 && g.status !== 419 && g.status !== 403 && g.status !== 404 && g.code !== "CURRENCY_CHANGED" && (l !== "sales" || Uy(g)) && sessionStorage.removeItem(b), g;
    }
  }
}
function zu(a) {
  return new URLSearchParams(
    Object.entries(a).filter(([, l]) => l !== "" && l != null).map(([l, s]) => [l, String(s)])
  ).toString();
}
const ZS = 1000000000000n;
function dl(a) {
  if (a < 0 || a > ZS)
    throw new Error("The amount is outside the supported range.");
  return Number(a);
}
const cr = (a, l) => (a * l + 5000n) / 10000n;
function kn(a) {
  if (!/^\d+(?:\.\d{0,2})?$/.test(a.trim()))
    throw new Error(
      "Enter a positive amount with up to two decimal places."
    );
  const [l, s = ""] = a.trim().split(".");
  return dl(BigInt(l) * 100n + BigInt(s.padEnd(2, "0")));
}
const hl = (a) => `${Math.trunc(a / 100)}.${String(Math.abs(a % 100)).padStart(2, "0")}`, ct = (a, l = "NGN") => new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: l,
  maximumFractionDigits: 2
}).format(a / 100);
function pl(a, l = 1e4) {
  const s = a.item, c = a.override_minor ?? s.unit_price_minor;
  if (!Number.isSafeInteger(a.quantity) || a.quantity < 1 || a.quantity > 1e4)
    throw new Error("Use a whole quantity between 1 and 10,000.");
  const f = BigInt(c) * BigInt(a.quantity), h = BigInt(a.discount_minor);
  if (h < 0n || h > cr(f, BigInt(l)))
    throw new Error("This discount exceeds your cashier limit.");
  const m = f - h, p = BigInt(
    s.tax_rules.filter((O) => O.type === "percent").reduce((O, U) => O + U.value, 0)
  ), y = BigInt(
    s.tax_rules.filter((O) => O.type === "amount").reduce((O, U) => O + U.value, 0)
  ) * BigInt(a.quantity);
  if (p > 10000n || y < 0n || s.tax_inclusive && y > m)
    throw new Error("The product tax policy is invalid.");
  const b = s.tax_inclusive ? m - ((m - y) * 10000n + (10000n + p) / 2n) / (10000n + p) : cr(m, p) + y, S = s.tax_inclusive ? m : m + b, g = cr(S, BigInt(s.gst_bps));
  return {
    subtotal_minor: dl(f),
    discount_minor: dl(h),
    tax_minor: dl(b + g),
    total_minor: dl(S + g),
    unit_price_minor: c
  };
}
function kS(a, l = 1e4) {
  const s = a.map((f) => pl(f, l)), c = (f) => dl(s.reduce((h, m) => h + BigInt(m[f]), 0n));
  return {
    subtotal_minor: c("subtotal_minor"),
    discount_minor: c("discount_minor"),
    tax_minor: c("tax_minor"),
    total_minor: c("total_minor")
  };
}
function HS(a, l) {
  return a.map((s) => {
    const c = pl(s, l);
    return {
      stock_id: s.item.stock_id,
      quantity: s.quantity,
      discount_minor: s.discount_minor,
      ...s.override_minor === void 0 ? {} : {
        override_minor: s.override_minor,
        override_reason: s.override_reason
      },
      unit_price_minor: c.unit_price_minor,
      tax_minor: c.tax_minor,
      total_minor: c.total_minor
    };
  });
}
function BS(a, l, s) {
  const c = a.map(
    (p) => BigInt(p.override_minor ?? p.item.unit_price_minor) * BigInt(p.quantity)
  ), f = c.reduce((p, y) => p + y, 0n);
  if (f === 0n || BigInt(l) > cr(f, BigInt(s)))
    throw new Error("This discount exceeds your cashier limit.");
  let h = BigInt(l);
  const m = a.map((p, y) => {
    const b = y === a.length - 1 ? h : BigInt(l) * c[y] / f;
    return h -= b, { ...p, discount_minor: Number(b) };
  });
  return m.forEach((p) => pl(p, s)), m;
}
async function LS(a, l, s, c) {
  return a.mutate(
    `drafts/${l.id}`,
    { label: s, revision: l.revision, payload: c },
    "PUT",
    !0
  );
}
async function QS(a, l) {
  return a.mutate(
    "sales",
    l.payload,
    "POST",
    !1,
    l.key
  );
}
function Sf(a) {
  const l = Object.values(a).filter((c) => typeof c == "number");
  return Object.entries(a).filter(([c, f]) => l.indexOf(+c) === -1).map(([c, f]) => f);
}
function Hv(a, l = "|") {
  return a.map((s) => Ly(s)).join(l);
}
function xf(a, l) {
  return typeof l == "bigint" ? l.toString() : l;
}
class YS {
  constructor(l) {
    this._getter = l, this._value = void 0;
  }
  get value() {
    const l = this._getter;
    return l !== void 0 && (this._value = l(), this._getter = void 0), this._value;
  }
}
function Zf(a) {
  return new YS(a);
}
function $S(a) {
  return a == null;
}
function kf(a) {
  const l = a.startsWith("^") ? 1 : 0, s = a.endsWith("$") ? a.length - 1 : a.length;
  return a.slice(l, s);
}
function GS(a, l) {
  const s = a / l, c = Math.round(s), f = 4 * Number.EPSILON * Math.max(Math.abs(s), 1);
  return Math.abs(s - c) < f ? 0 : s - c;
}
function vi(a, l, s) {
  Object.defineProperty(a, l, {
    value: s,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function qy(a) {
  const l = Object.getOwnPropertyDescriptor(a, "shape");
  return l?.get ? l.get.raw : l?.value;
}
function ua(a) {
  return qy(a._zod.def) ?? a._zod.def.shape;
}
function Zy(a, l, s) {
  Object.defineProperty(a, l, {
    get() {
      const c = s();
      return vi(this, l, c), c;
    },
    enumerable: !0,
    configurable: !0
  });
}
function ky(a, l, s) {
  l in a ? vi(a, l, s) : a[l] = s;
}
function pi(a, l, s, c) {
  const f = ua(l);
  for (const h of s) {
    const m = Object.getOwnPropertyDescriptor(f, h);
    m.enumerable && (m.get ? Zy(a, h, () => {
      const p = l._zod.def.shape[h];
      return c ? c(p, h) : p;
    }) : ky(a, h, c ? c(m.value, h) : m.value));
  }
}
function VS(a, l) {
  for (const s of Reflect.ownKeys(l)) {
    const c = Object.getOwnPropertyDescriptor(l, s);
    c.enumerable && (c.get ? Zy(a, s, () => l[s]) : ky(a, s, c.value));
  }
}
function nn(...a) {
  const l = {};
  for (const s of a) {
    const c = Object.getOwnPropertyDescriptors(s);
    Object.assign(l, c);
  }
  return Object.defineProperties({}, l);
}
function XS(a) {
  return JSON.stringify(a);
}
function KS(a) {
  return a.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Hy = "captureStackTrace" in Error ? Error.captureStackTrace : (...a) => {
};
function mr(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
const JS = /* @__PURE__ */ Zf(() => {
  if (Bn.jitless || typeof navigator < "u" && navigator?.userAgent?.includes("Cloudflare"))
    return !1;
  try {
    const a = Function;
    return new a(""), !0;
  } catch {
    return !1;
  }
});
function Eu(a) {
  if (mr(a) === !1)
    return !1;
  const l = a.constructor;
  if (l === void 0 || typeof l != "function")
    return !0;
  const s = l.prototype;
  return !(mr(s) === !1 || Object.prototype.hasOwnProperty.call(s, "isPrototypeOf") === !1);
}
function By(a) {
  return Eu(a) ? { ...a } : Array.isArray(a) ? [...a] : a instanceof Map ? new Map(a) : a instanceof Set ? new Set(a) : a;
}
const IS = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function xr(a) {
  return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ka(a, l, s) {
  const c = new a._zod.constr(l ?? a._zod.def);
  return (!l || s?.parent) && (c._zod.parent = a), c;
}
function ie(a) {
  const l = a;
  if (!l)
    return {};
  if (typeof l == "string")
    return { error: () => l };
  if (l?.message !== void 0) {
    if (l?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    l.error = l.message;
  }
  return delete l.message, typeof l.error == "string" ? { ...l, error: () => l.error } : l;
}
function Ly(a) {
  return typeof a == "bigint" ? a.toString() + "n" : typeof a == "string" ? `"${a}"` : `${a}`;
}
function FS(a) {
  return Object.keys(a).filter((l) => a[l]._zod.optin !== void 0 && a[l]._zod.optout === "optional");
}
const Qy = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}, PS = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function WS(a, l) {
  const s = a._zod.def, c = s.checks;
  if (c && c.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const h = {};
  return pi(h, a, jr(a, l)), ka(a, nn(s, { shape: h, checks: [] }));
}
function jr(a, l) {
  const s = ua(a), c = [];
  for (const f of Reflect.ownKeys(l)) {
    if (!Object.getOwnPropertyDescriptor(s, f)?.enumerable)
      throw new Error(`Unrecognized key: "${String(f)}"`);
    l[f] && c.push(f);
  }
  return c;
}
function ex(a, l) {
  const s = a._zod.def, c = s.checks;
  if (c && c.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const h = new Set(jr(a, l)), m = {};
  return pi(m, a, Reflect.ownKeys(ua(a)).filter((p) => !h.has(p))), ka(a, nn(s, { shape: m, checks: [] }));
}
function tx(a, l) {
  if (!Eu(l))
    throw new Error("Invalid input to extend: expected a plain object");
  const s = a._zod.def.checks;
  if (s && s.length > 0) {
    const f = ua(a);
    for (const h of Reflect.ownKeys(l))
      if (Object.getOwnPropertyDescriptor(f, h) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  return ka(a, nn(a._zod.def, { shape: Yy(a, l) }));
}
function Yy(a, l) {
  const s = {};
  return pi(s, a, Reflect.ownKeys(ua(a))), VS(s, l), s;
}
function nx(a, l) {
  if (!Eu(l))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  return ka(a, nn(a._zod.def, { shape: Yy(a, l) }));
}
function ax(a, l) {
  if (!l?._zod?.def)
    throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  if (a._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const s = {};
  pi(s, a, Reflect.ownKeys(ua(a))), pi(s, l, Reflect.ownKeys(ua(l)));
  const c = nn(a._zod.def, {
    shape: s,
    get catchall() {
      return l._zod.def.catchall;
    },
    checks: l._zod.def.checks ?? []
  });
  return ka(a, c);
}
function Bv(a, l, s, c = "partial") {
  const h = l._zod.def.checks;
  if (h && h.length > 0)
    throw new Error(`.${c}() cannot be used on object schemas containing refinements`);
  const p = s ? new Set(jr(l, s)) : void 0, y = {};
  return pi(y, l, Reflect.ownKeys(ua(l)), a && ((b, S) => p && !p.has(S) ? b : new a({ type: "optional", innerType: b }))), ka(l, nn(l._zod.def, { shape: y, checks: [] }));
}
function ix(a, l, s) {
  const c = s ? new Set(jr(l, s)) : void 0, f = {};
  return pi(f, l, Reflect.ownKeys(ua(l)), (h, m) => (
    // overwrite with non-optional
    c && !c.has(m) ? h : new a({ type: "nonoptional", innerType: h })
  )), ka(l, nn(l._zod.def, { shape: f }));
}
function ia(a, l = 0) {
  if (a.aborted === !0)
    return !0;
  for (let s = l; s < a.issues.length; s++)
    if (a.issues[s]?.continue !== !0)
      return !0;
  return !1;
}
function lx(a, l = 0) {
  if (a.aborted === !0)
    return !0;
  for (let s = l; s < a.issues.length; s++)
    if (a.issues[s]?.continue === !1)
      return !0;
  return !1;
}
function $y(a, l) {
  return l.map((s) => {
    var c;
    return (c = s).path ?? (c.path = []), s.path.unshift(a), s;
  });
}
function yu(a) {
  return typeof a == "string" ? a : a?.message;
}
function Lv(a) {
  const l = [];
  for (const s of a ?? []) {
    const c = s._zod.def;
    if (!/_(length|size)$|_equals$/.test(c.check))
      break;
    const f = c.maximum ?? c.length ?? c.size;
    f >= 0 && l.push([f, s]);
  }
  return l;
}
function jf(a, l, s) {
  var c;
  for (let f = l; f < a.length; f++)
    (c = a[f]).schema ?? (c.schema = s);
}
function gl(a, l, s) {
  var c;
  const f = a.inst?._zod?.traits;
  f?.has("$ZodType") && (f.has("$ZodCheck") ? (c = a).schema ?? (c.schema = a.inst) : a.schema = a.inst);
  const h = a.schema !== a.inst ? a.schema?._zod.def?.error : void 0, m = a.message ? a.message : yu(a.inst?._zod.def?.error?.(a)) ?? yu(h?.(a)) ?? yu(l?.error?.(a)) ?? yu(s.customError?.(a)) ?? yu(s.localeError?.(a)) ?? "Invalid input", p = {};
  for (const y of Object.keys(a))
    y === "inst" || y === "schema" || y === "continue" || y === "input" || y === "__proto__" || (p[y] = a[y]);
  return p.path ?? (p.path = []), p.message = m, l?.reportInput && (p.input = a.input), p;
}
const ux = /[\uD800-\uDBFF]/;
function Hf(a) {
  const l = a.length;
  if (!ux.test(a))
    return l;
  let s = l;
  for (let c = 0; c < l - 1; c++)
    (a.charCodeAt(c) & 64512) === 55296 && (a.charCodeAt(c + 1) & 64512) === 56320 && (s--, c++);
  return s;
}
function Bf(a) {
  return Array.isArray(a) ? "array" : typeof a == "string" ? "string" : "unknown";
}
function sx(a) {
  const l = typeof a;
  switch (l) {
    case "number":
      return Number.isNaN(a) ? "nan" : "number";
    case "object": {
      if (a === null)
        return "null";
      if (Array.isArray(a))
        return "array";
      const s = a;
      if (s && Object.getPrototypeOf(s) !== Object.prototype && "constructor" in s && s.constructor)
        return s.constructor.name;
    }
  }
  return l;
}
function Tu(...a) {
  const [l, s, c] = a;
  return typeof l == "string" ? {
    message: l,
    code: "custom",
    input: s,
    inst: c
  } : { ...l };
}
function rx(a, l) {
  for (const s in l) {
    const c = Object.getOwnPropertyDescriptor(l, s);
    c.get ? Object.defineProperty(a, s, { ...c, enumerable: !1 }) : cx(a, s, c.value);
  }
}
function Za(a, l, s, c = !0) {
  return Object.defineProperty(a, l, { configurable: !0, writable: !0, enumerable: c, value: s }), s;
}
function Gy(a, l, s) {
  return Za(a, l, s, !1);
}
function Vy(a, l) {
  for (const s in a) {
    const c = a[s];
    Object.defineProperty(l, s, {
      configurable: !0,
      enumerable: !0,
      get() {
        return Za(this, s, c(this));
      },
      set(f) {
        Za(this, s, f);
      }
    });
  }
  return l;
}
function cx(a, l, s) {
  Object.defineProperty(a, l, {
    configurable: !0,
    get() {
      return this == null ? s : Za(this, l, s.bind(this));
    },
    set(c) {
      Za(this, l, c);
    }
  });
}
function ox(a, l) {
  const s = Object.getPrototypeOf(a);
  return l in s ? void 0 : s;
}
let cf, Ua = !1;
const fx = {
  configurable: !0,
  get() {
    Ua = !0;
  }
};
function Ue(a, l, s) {
  const c = Object.getPrototypeOf(a._zod);
  if (l in c && cf !== a._zod) {
    cf = void 0;
    return;
  }
  cf = a._zod, Object.defineProperty(c, l, {
    configurable: !0,
    get() {
      Object.defineProperty(this, l, fx);
      const f = Ua;
      Ua = !1;
      try {
        const h = s(this);
        return Ua ? delete this[l] : Object.defineProperty(this, l, { configurable: !0, writable: !0, value: h }), Ua = Ua || f, h;
      } catch (h) {
        throw delete this[l], Ua = Ua || f, h;
      }
    },
    set(f) {
      Object.defineProperty(this, l, { configurable: !0, writable: !0, value: f });
    }
  });
}
function dx(a, l, s, c) {
  const f = ox(a, l);
  f && Object.defineProperty(f, l, {
    configurable: !0,
    get() {
      const h = { configurable: !0, writable: !0, enumerable: c, value: void 0 };
      return Object.defineProperty(this, l, h), h.value = s(this), Object.defineProperty(this, l, h), h.value;
    },
    set(h) {
      Object.defineProperty(this, l, { configurable: !0, writable: !0, enumerable: c, value: h });
    }
  });
}
const hx = "~constantCatch";
function mx(a) {
  const l = () => a;
  return l[hx] = !0, l;
}
var Qv;
const of = { value: void 0, enumerable: !1 };
let Yv = "captureStackTrace" in Error ? Error : null;
function px(a) {
  const l = Yv;
  if (l) {
    const s = l.stackTraceLimit;
    if (typeof s == "number") {
      try {
        l.stackTraceLimit = 0;
      } catch {
        return Yv = null, new a();
      }
      try {
        return new a();
      } finally {
        l.stackTraceLimit = s;
      }
    }
  }
  return new a();
}
function B(a, l, s, c) {
  const f = {};
  function h(O) {
    this.def = O, this.constr = g, this.traits = /* @__PURE__ */ new Set();
  }
  h.prototype = f;
  const m = s, p = m && /* @__PURE__ */ new WeakSet();
  function y(O, U) {
    if (O._zod) {
      if (O._zod.traits.has(a))
        return;
    } else {
      of.value = new h(U);
      try {
        Object.defineProperty(O, "_zod", of);
      } finally {
        of.value = void 0;
      }
    }
    if (O._zod.traits.add(a), l(O, U), p) {
      const N = Object.getPrototypeOf(O), A = O._zod.constr.prototype;
      let M = N;
      for (; M && M !== A; )
        M = Object.getPrototypeOf(M);
      const Y = M ?? N;
      p.has(Y) || (p.add(Y), rx(Y, m));
    }
    const R = g.prototype;
    for (const N in R)
      Object.prototype.hasOwnProperty.call(R, N) && (N in O || (O[N] = R[N].bind(O)));
  }
  const b = c?.Parent ?? Object;
  class S extends b {
  }
  Object.defineProperty(S, "name", { value: a });
  function g(O) {
    const U = c?.Parent ? px(S) : this;
    y(U, O);
    const R = U._zod.deferred;
    if (R) {
      for (const A of R)
        A();
      U._zod.deferred = void 0;
    }
    const N = globalThis.__zod_globalConfig?.postProcessor;
    return N && N(U), U;
  }
  return Object.defineProperty(g, "init", { value: y }), Object.defineProperty(g, Symbol.hasInstance, {
    value: (O) => c?.Parent && O instanceof c.Parent ? !0 : O?._zod?.traits?.has(a)
  }), Object.defineProperty(g, "name", { value: a }), g;
}
class mi extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Xy extends Error {
  constructor(l) {
    super(`Encountered unidirectional transform during encode: ${l}`), this.name = "ZodEncodeError";
  }
}
(Qv = globalThis).__zod_globalConfig ?? (Qv.__zod_globalConfig = {});
const Bn = globalThis.__zod_globalConfig;
function Ha(a) {
  return a && Object.assign(Bn, a), Bn;
}
function vx() {
  const a = this._zod;
  return a.message ?? (a.message = JSON.stringify(a.def, xf, 2)), a.message;
}
function yx(a) {
  this._zod.message = a;
}
const gx = {
  get: vx,
  set: yx,
  enumerable: !0,
  configurable: !0
}, ff = { value: void 0, enumerable: !1 }, $v = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), bx = (a, l) => {
  a.name = "$ZodError", ff.value = l, Object.defineProperty(a, "issues", ff), ff.value = void 0, Object.defineProperty(a, "message", gx);
  const s = Object.getPrototypeOf(a);
  $v.has(s) || ($v.add(s), Object.defineProperty(s, "toString", {
    configurable: !0,
    enumerable: !1,
    get() {
      const c = () => this.message;
      return Object.defineProperty(this, "toString", { value: c, configurable: !0, writable: !0 }), c;
    },
    set(c) {
      Object.defineProperty(this, "toString", { value: c, configurable: !0, writable: !0 });
    }
  }));
}, _x = B("$ZodError", bx);
function Sx(a, l, s) {
  return Object.prototype.hasOwnProperty.call(a, l) || (l === "__proto__" ? Object.defineProperty(a, l, { value: s(), writable: !0, enumerable: !0, configurable: !0 }) : a[l] = s()), a[l];
}
function xx(a, l = (s) => s.message) {
  const s = {}, c = [];
  for (const f of a.issues)
    f.path.length > 0 ? Sx(s, f.path[0], () => []).push(l(f)) : c.push(l(f));
  return { formErrors: c, fieldErrors: s };
}
function jx(a, l = (s) => s.message) {
  const s = { _errors: [] }, c = (f, h = []) => {
    for (const m of f.issues)
      if (m.code === "invalid_union" && m.errors.length)
        m.errors.map((p) => c({ issues: p }, [...h, ...m.path]));
      else if (m.code === "invalid_key")
        c({ issues: m.issues }, [...h, ...m.path]);
      else if (m.code === "invalid_element")
        c({ issues: m.issues }, [...h, ...m.path]);
      else {
        const p = [...h, ...m.path];
        if (p.length === 0)
          s._errors.push(l(m));
        else {
          let y = s, b = 0;
          for (; b < p.length; ) {
            const S = p[b], g = b === p.length - 1;
            if (S === "_errors") {
              g && y._errors.push(l(m)), b++;
              continue;
            }
            Object.prototype.hasOwnProperty.call(y, S) || Object.defineProperty(y, S, {
              value: { _errors: [] },
              enumerable: !0,
              writable: !0,
              configurable: !0
            });
            const O = y[S];
            g && O._errors.push(l(m)), y = O, b++;
          }
        }
      }
  };
  return c(a), s;
}
function Or(a, l) {
  return { callee: l?.callee ?? a, Err: l?.Err };
}
const Lf = (a) => {
  const l = (s, c, f, h) => {
    const m = f ? { ...f, async: !1 } : { async: !1 }, p = s._zod.run({ value: c, issues: [] }, m);
    if (p instanceof Promise)
      throw new mi();
    if (p.issues.length) {
      const y = new (h?.Err ?? a)(p.issues.map((b) => gl(b, m, Ha())));
      throw Hy(y, h?.callee ?? l), y;
    }
    return p.value;
  };
  return l;
}, Qf = (a) => {
  const l = async (s, c, f, h) => {
    const m = f ? { ...f, async: !0 } : { async: !0 };
    let p = s._zod.run({ value: c, issues: [] }, m);
    if (p instanceof Promise && (p = await p), p.issues.length) {
      const y = new (h?.Err ?? a)(p.issues.map((b) => gl(b, m, Ha())));
      throw Hy(y, h?.callee ?? l), y;
    }
    return p.value;
  };
  return l;
}, Yf = (a) => (l, s, c) => {
  const f = c ? { ...c, async: !1 } : { async: !1 }, h = l._zod.run({ value: s, issues: [] }, f);
  if (h instanceof Promise)
    throw new mi();
  return h.issues.length ? Ky(a, h.issues, f) : { success: !0, data: h.value };
};
function Ky(a, l, s) {
  let c;
  return {
    success: !1,
    get error() {
      return c || (c = new a(l.map((f) => gl(f, s, Ha()))), l = void 0, s = void 0), c;
    },
    set error(f) {
      c = f, l = void 0, s = void 0;
    }
  };
}
const $f = (a) => async (l, s, c) => {
  const f = c ? { ...c, async: !0 } : { async: !0 };
  let h = l._zod.run({ value: s, issues: [] }, f);
  return h instanceof Promise && (h = await h), h.issues.length ? Ky(a, h.issues, f) : { success: !0, data: h.value };
}, Ox = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), zx = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), Ex = ((a, l, s) => {
  const c = a._zod.bag.validator;
  if (c !== void 0) {
    if (c(l) !== Ox)
      return !0;
    if (c.definite === !0 && s === void 0)
      return !1;
  }
  return Tx(a, l, s);
});
function Tx(a, l, s) {
  const c = s ? { ...s, async: !1, abortEarly: !0 } : { async: !1, abortEarly: !0 }, f = a._zod.bag.fallbackRun;
  let h;
  if (f ? (c[zx] = !0, h = f({ value: l, issues: [] }, c)) : h = a._zod.run({ value: l, issues: [] }, c), h instanceof Promise)
    throw new mi();
  return h.issues.length === 0;
}
const Nx = async (a, l, s) => {
  const c = s ? { ...s, async: !0, abortEarly: !0 } : { async: !0, abortEarly: !0 };
  let f = a._zod.run({ value: l, issues: [] }, c);
  return f instanceof Promise && (f = await f), f.issues.length === 0;
}, Cx = (a) => {
  const l = Lf(a), s = (c, f, h, m) => {
    const p = h ? { ...h, direction: "backward" } : { direction: "backward" };
    return l(c, f, p, Or(s, m));
  };
  return s;
}, Ax = (a) => {
  const l = Lf(a), s = (c, f, h, m) => l(c, f, h, Or(s, m));
  return s;
}, wx = (a) => {
  const l = Qf(a), s = async (c, f, h, m) => {
    const p = h ? { ...h, direction: "backward" } : { direction: "backward" };
    return await l(c, f, p, Or(s, m));
  };
  return s;
}, Rx = (a) => {
  const l = Qf(a), s = async (c, f, h, m) => await l(c, f, h, Or(s, m));
  return s;
}, Mx = (a) => (l, s, c) => {
  const f = c ? { ...c, direction: "backward" } : { direction: "backward" };
  return Yf(a)(l, s, f);
}, Dx = (a) => (l, s, c) => Yf(a)(l, s, c), Ux = (a) => async (l, s, c) => {
  const f = c ? { ...c, direction: "backward" } : { direction: "backward" };
  return $f(a)(l, s, f);
}, qx = (a) => async (l, s, c) => $f(a)(l, s, c), Zx = /^[cC][0-9a-z]{6,}$/, kx = /^[0-9a-z]+$/, Hx = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, Bx = /^[0-9a-vA-V]{20}$/, Lx = /^[A-Za-z0-9]{27}$/, Qx = /^[a-zA-Z0-9_-]{21}$/;
function Yx(a) {
  return new RegExp(`^[a-zA-Z0-9_-]{${a}}$`);
}
const $x = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, Gx = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Gv = (a) => a ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${a}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, Vx = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, Xx = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function Kx() {
  return new RegExp(Xx, "u");
}
const Jx = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Ix = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, Fx = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, Px = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Wx = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, e2 = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, t2 = /^https?$/, n2 = /^\+[1-9]\d{6,14}$/, Jy = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function a2(a) {
  return new RegExp(`^${a}$`);
}
const i2 = /* @__PURE__ */ a2(Jy);
function Of(a) {
  const l = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof a.precision == "number" ? a.precision === -1 ? `${l}` : a.precision === 0 ? `${l}:[0-5]\\d` : `${l}:[0-5]\\d\\.\\d{${a.precision}}` : a.seconds ? `${l}:[0-5]\\d(?:\\.\\d+)?` : `${l}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function l2(a) {
  return new RegExp(`^${Of(a)}$`);
}
function u2(a) {
  const l = ["Z"];
  a.offset && l.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const s = `${Of({ precision: a.precision, seconds: !0 })}(?:${l.join("|")})`, c = a.local ? `${s}|${Of({ precision: a.precision })}` : s;
  return new RegExp(`^${Jy}T(?:${c})$`);
}
const s2 = /^[\s\S]{0,}$/, r2 = /^-?\d+(?:\.\d+)?$/, c2 = /^[^A-Z]*$/, o2 = /^[^a-z]*$/, Yt = /* @__PURE__ */ B("$ZodCheck", (a, l) => {
  var s;
  a._zod ?? (a._zod = {}), a._zod.def = l, (s = a._zod).onattach ?? (s.onattach = []);
}), Gf = (a) => {
  const l = a.value;
  return !$S(l) && l.length !== void 0;
}, pr = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, Iy = /* @__PURE__ */ B("$ZodCheckLessThan", (a, l) => {
  Yt.init(a, l);
  const s = pr[typeof l.value];
  a._zod.check = (c) => {
    (l.inclusive ? c.value <= l.value : c.value < l.value) || c.issues.push({
      origin: pr[typeof c.value] ?? s,
      code: "too_big",
      maximum: typeof l.value == "object" ? l.value.getTime() : l.value,
      input: c.value,
      inclusive: l.inclusive,
      inst: a,
      continue: !l.abort
    });
  };
}), Fy = /* @__PURE__ */ B("$ZodCheckGreaterThan", (a, l) => {
  Yt.init(a, l);
  const s = pr[typeof l.value];
  a._zod.check = (c) => {
    (l.inclusive ? c.value >= l.value : c.value > l.value) || c.issues.push({
      origin: pr[typeof c.value] ?? s,
      code: "too_small",
      minimum: typeof l.value == "object" ? l.value.getTime() : l.value,
      input: c.value,
      inclusive: l.inclusive,
      inst: a,
      continue: !l.abort
    });
  };
}), f2 = /* @__PURE__ */ B("$ZodCheckMultipleOf", (a, l) => {
  Yt.init(a, l), a._zod.check = (s) => {
    if (typeof s.value != typeof l.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof s.value == "bigint" ? (
      // `value % 0n` throws, and nothing is a multiple of zero — the number branch already fails this way via NaN
      l.value !== BigInt(0) && s.value % l.value === BigInt(0)
    ) : GS(s.value, l.value) === 0) || s.issues.push({
      origin: typeof s.value,
      code: "not_multiple_of",
      divisor: l.value,
      input: s.value,
      inst: a,
      continue: !l.abort
    });
  };
}), d2 = /* @__PURE__ */ B("$ZodCheckNumberFormat", (a, l) => {
  Yt.init(a, l), l.format = l.format || "float64";
  const s = l.format?.includes("int"), c = s ? "int" : "number", [f, h] = Qy[l.format];
  a._zod.check = (m) => {
    const p = m.value;
    if (s) {
      if (!Number.isInteger(p)) {
        m.issues.push({
          expected: c,
          format: l.format,
          code: "invalid_type",
          continue: !1,
          input: p,
          inst: a
        });
        return;
      }
      if (!Number.isSafeInteger(p)) {
        p > 0 ? m.issues.push({
          input: p,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: c,
          inclusive: !0,
          continue: !l.abort
        }) : m.issues.push({
          input: p,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: c,
          inclusive: !0,
          continue: !l.abort
        });
        return;
      }
    }
    p < f && m.issues.push({
      origin: "number",
      input: p,
      code: "too_small",
      minimum: f,
      inclusive: !0,
      inst: a,
      continue: !l.abort
    }), p > h && m.issues.push({
      origin: "number",
      input: p,
      code: "too_big",
      maximum: h,
      inclusive: !0,
      inst: a,
      continue: !l.abort
    });
  };
}), h2 = /* @__PURE__ */ B("$ZodCheckMaxLength", (a, l) => {
  var s;
  Yt.init(a, l), (s = a._zod.def).when ?? (s.when = Gf), a._zod.check = (c) => {
    const f = c.value, h = f.length;
    if ((typeof f == "string" && h > l.maximum ? Hf(f) : h) <= l.maximum)
      return;
    const p = Bf(f);
    c.issues.push({
      origin: p,
      code: "too_big",
      maximum: l.maximum,
      inclusive: !0,
      input: f,
      inst: a,
      continue: !l.abort
    });
  };
}), m2 = /* @__PURE__ */ B("$ZodCheckMinLength", (a, l) => {
  var s;
  Yt.init(a, l), (s = a._zod.def).when ?? (s.when = Gf), a._zod.check = (c) => {
    const f = c.value, h = f.length;
    if ((typeof f == "string" && h >= l.minimum && h < l.minimum * 2 ? Hf(f) : h) >= l.minimum)
      return;
    const p = Bf(f);
    c.issues.push({
      origin: p,
      code: "too_small",
      minimum: l.minimum,
      inclusive: !0,
      input: f,
      inst: a,
      continue: !l.abort
    });
  };
}), p2 = /* @__PURE__ */ B("$ZodCheckLengthEquals", (a, l) => {
  var s;
  Yt.init(a, l), (s = a._zod.def).when ?? (s.when = Gf), a._zod.check = (c) => {
    const f = c.value, h = f.length, m = typeof f == "string" && h >= l.length && h <= l.length * 2 ? Hf(f) : h;
    if (m === l.length)
      return;
    const p = Bf(f), y = m > l.length;
    c.issues.push({
      origin: p,
      ...y ? { code: "too_big", maximum: l.length } : { code: "too_small", minimum: l.length },
      inclusive: !0,
      exact: !0,
      input: c.value,
      inst: a,
      continue: !l.abort
    });
  };
}), zr = /* @__PURE__ */ B("$ZodCheckStringFormat", (a, l) => {
  var s, c;
  Yt.init(a, l), l.pattern ? (s = a._zod).check ?? (s.check = (f) => {
    l.pattern.lastIndex = 0, !l.pattern.test(f.value) && f.issues.push({
      origin: "string",
      code: "invalid_format",
      format: l.format,
      input: f.value,
      ...l.pattern ? { pattern: l.pattern.toString() } : {},
      inst: a,
      continue: !l.abort
    });
  }) : (c = a._zod).check ?? (c.check = () => {
  });
}), v2 = /* @__PURE__ */ B("$ZodCheckRegex", (a, l) => {
  zr.init(a, l), a._zod.check = (s) => {
    l.pattern.lastIndex = 0, !l.pattern.test(s.value) && s.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: s.value,
      pattern: l.pattern.toString(),
      inst: a,
      continue: !l.abort
    });
  };
}), y2 = /* @__PURE__ */ B("$ZodCheckLowerCase", (a, l) => {
  l.pattern ?? (l.pattern = c2), zr.init(a, l);
}), g2 = /* @__PURE__ */ B("$ZodCheckUpperCase", (a, l) => {
  l.pattern ?? (l.pattern = o2), zr.init(a, l);
}), b2 = /* @__PURE__ */ B("$ZodCheckIncludes", (a, l) => {
  Yt.init(a, l);
  const s = xr(l.includes), c = new RegExp(typeof l.position == "number" ? `^.{${l.position},}${s}` : s);
  l.pattern = c, a._zod.check = (f) => {
    f.value.includes(l.includes, l.position) || f.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: l.includes,
      input: f.value,
      inst: a,
      continue: !l.abort
    });
  };
}), _2 = /* @__PURE__ */ B("$ZodCheckStartsWith", (a, l) => {
  Yt.init(a, l);
  const s = new RegExp(`^${xr(l.prefix)}.*`);
  l.pattern ?? (l.pattern = s), a._zod.check = (c) => {
    c.value.startsWith(l.prefix) || c.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: l.prefix,
      input: c.value,
      inst: a,
      continue: !l.abort
    });
  };
}), S2 = /* @__PURE__ */ B("$ZodCheckEndsWith", (a, l) => {
  Yt.init(a, l);
  const s = new RegExp(`.*${xr(l.suffix)}$`);
  l.pattern ?? (l.pattern = s), a._zod.check = (c) => {
    c.value.endsWith(l.suffix) || c.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: l.suffix,
      input: c.value,
      inst: a,
      continue: !l.abort
    });
  };
}), x2 = /* @__PURE__ */ B("$ZodCheckOverwrite", (a, l) => {
  Yt.init(a, l), a._zod.check = (s) => {
    s.value = l.tx(s.value);
  };
});
class j2 {
  constructor(l = [], s = {}) {
    this.content = [], this.indent = 0, this.args = l, this.closed = s;
  }
  // the compiler catches a child's throw and keeps writing into this doc, so the indent has to unwind with it
  indented(l) {
    this.indent += 1;
    try {
      l(this);
    } finally {
      this.indent -= 1;
    }
  }
  write(l) {
    if (typeof l == "function") {
      l(this, { execution: "sync" }), l(this, { execution: "async" });
      return;
    }
    const c = l.split(`
`).filter((m) => m), f = Math.min(...c.map((m) => m.length - m.trimStart().length)), h = c.map((m) => m.slice(f)).map((m) => " ".repeat(this.indent * 2) + m);
    for (const m of h)
      this.content.push(m);
  }
  compile() {
    const l = Function, s = this?.content ?? [""];
    return new l(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {
${s.join(`
`)}
};`)(...Object.values(this.closed));
  }
}
const O2 = {
  major: 4,
  minor: 6,
  patch: 6
}, lt = /* @__PURE__ */ B("$ZodType", (a, l) => {
  var s;
  a ?? (a = {}), a._zod.def = l, a._zod.bag = a._zod.bag || {}, a._zod.version = O2;
  const c = a._zod.def.checks, f = a._zod.traits.has("$ZodCheck") ? [a, ...c ?? []] : c?.length ? [...c] : [];
  for (const h of f)
    for (const m of h._zod.onattach)
      m(a);
  if (f.length === 0)
    (s = a._zod).deferred ?? (s.deferred = []), a._zod.deferred?.push(() => {
      a._zod.run = a._zod.parse;
    });
  else {
    const h = (p, y, b) => {
      if (p.memo)
        return p;
      let S = ia(p), g;
      for (const O of y) {
        if (O._zod.def.when) {
          if (lx(p) || !O._zod.def.when(p))
            continue;
        } else if (S)
          continue;
        const U = p.issues.length, R = O._zod.check(p);
        if (R instanceof Promise && b?.async === !1)
          throw new mi();
        if (g || R instanceof Promise)
          g = (g ?? Promise.resolve()).then(async () => {
            await R, p.issues.length !== U && (jf(p.issues, U, a), S || (S = ia(p, U)));
          });
        else {
          if (p.issues.length === U)
            continue;
          jf(p.issues, U, a), S || (S = ia(p, U));
        }
      }
      return g ? g.then(() => p) : p;
    }, m = (p, y, b) => {
      if (ia(p))
        return p.aborted = !0, p;
      const S = h(y, f, b);
      if (S instanceof Promise) {
        if (b.async === !1)
          throw new mi();
        return S.then((g) => a._zod.parse(g, b));
      }
      return a._zod.parse(S, b);
    };
    a._zod.run = (p, y) => {
      if (y.skipChecks)
        return a._zod.parse(p, y);
      if (y.direction === "backward") {
        const S = a._zod.parse({ value: p.value, issues: [] }, { ...y, skipChecks: !0 });
        return S instanceof Promise ? S.then((g) => m(g, p, y)) : m(S, p, y);
      }
      const b = a._zod.parse(p, y);
      if (b instanceof Promise) {
        if (y.async === !1)
          throw new mi();
        return b.then((S) => h(S, f, y));
      }
      return h(b, f, y);
    };
  }
}, {
  // Wrappers extend this by installing a richer factory over it; reading it eagerly would defeat the laziness.
  get "~standard"() {
    return Gy(this, "~standard", Wy(this));
  },
  set "~standard"(a) {
    Za(this, "~standard", a);
  }
}), Py = (a, l) => a.issues.length ? { issues: a.issues.map((s) => gl(s, l, Ha())) } : { value: a.value };
async function z2(a, l) {
  const s = { async: !0 };
  return Py(await a._zod.run({ value: l, issues: [] }, s), s);
}
function Wy(a) {
  return {
    validate: (l) => {
      const s = { async: !1 };
      try {
        const c = a._zod.run({ value: l, issues: [] }, s);
        if (!(c instanceof Promise))
          return Py(c, s);
      } catch {
      }
      return z2(a, l);
    },
    vendor: "zod",
    version: 1
  };
}
const Vf = /* @__PURE__ */ B("$ZodString", (a, l) => {
  lt.init(a, l), a._zod.pattern = l.pattern ?? s2, a._zod.parse = (s, c) => {
    if (l.coerce)
      try {
        s.value = String(s.value);
      } catch {
      }
    return typeof s.value == "string" || s.issues.push({
      expected: "string",
      code: "invalid_type",
      input: s.value,
      inst: a
    }), s;
  };
}), Ge = /* @__PURE__ */ B("$ZodStringFormat", (a, l) => {
  zr.init(a, l), Vf.init(a, l);
}), E2 = /* @__PURE__ */ B("$ZodGUID", (a, l) => {
  l.pattern ?? (l.pattern = Gx), Ge.init(a, l);
}), T2 = /* @__PURE__ */ B("$ZodUUID", (a, l) => {
  if (l.version) {
    const c = {
      v1: 1,
      v2: 2,
      v3: 3,
      v4: 4,
      v5: 5,
      v6: 6,
      v7: 7,
      v8: 8
    }[l.version];
    if (c === void 0)
      throw new Error(`Invalid UUID version: "${l.version}"`);
    l.pattern ?? (l.pattern = Gv(c));
  } else
    l.pattern ?? (l.pattern = Gv());
  Ge.init(a, l);
}), N2 = /* @__PURE__ */ B("$ZodEmail", (a, l) => {
  l.pattern ?? (l.pattern = Vx), Ge.init(a, l);
}), eg = 1, vr = 2;
function tg(a) {
  try {
    return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(a) : (new URL(a), !0);
  } catch {
    return !1;
  }
}
function C2(a, l) {
  return !("normalize" in l) && !("hostname" in l) && !("protocol" in l) ? tg(a) || vr : A2(a, l);
}
function A2(a, l) {
  if (!l.normalize && l.protocol?.source === t2.source && !/^https?:\/\//i.test(a))
    return eg;
  try {
    if (typeof URL < "u") {
      const s = URL;
      if (typeof s.parse == "function")
        return s.parse(a) ?? vr;
    }
    return new URL(a);
  } catch {
    return vr;
  }
}
const w2 = /[\t\n\r]/g;
function Vv(a) {
  return a.replace(w2, "");
}
function R2(a, l) {
  return l.lastIndex = 0, l.test(a.hostname);
}
function M2(a, l) {
  return l.lastIndex = 0, l.test(a.protocol.endsWith(":") ? a.protocol.slice(0, -1) : a.protocol);
}
const D2 = /* @__PURE__ */ B("$ZodURL", (a, l) => {
  Ge.init(a, l), a._zod.check = (s) => {
    try {
      const c = s.value.trim(), f = C2(c, l);
      if (f === eg) {
        s.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid URL format",
          input: s.value,
          inst: a,
          continue: !l.abort
        });
        return;
      }
      if (f === vr) {
        s.issues.push({
          code: "invalid_format",
          format: "url",
          input: s.value,
          inst: a,
          continue: !l.abort
        });
        return;
      }
      if (f === !0) {
        s.value = Vv(c);
        return;
      }
      l.hostname && !R2(f, l.hostname) && s.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: l.hostname.source,
        input: s.value,
        inst: a,
        continue: !l.abort
      }), l.protocol && !M2(f, l.protocol) && s.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: l.protocol.source,
        input: s.value,
        inst: a,
        continue: !l.abort
      }), s.value = l.normalize ? f.href : Vv(c);
      return;
    } catch {
      s.issues.push({
        code: "invalid_format",
        format: "url",
        input: s.value,
        inst: a,
        continue: !l.abort
      });
    }
  };
}), U2 = /* @__PURE__ */ B("$ZodEmoji", (a, l) => {
  l.pattern ?? (l.pattern = Kx()), Ge.init(a, l);
}), q2 = /* @__PURE__ */ B("$ZodNanoID", (a, l) => {
  if (l.length !== void 0 && (!Number.isInteger(l.length) || l.length < 1))
    throw new Error(`Invalid nanoid length: ${l.length}`);
  l.pattern ?? (l.pattern = l.length === void 0 ? Qx : Yx(l.length)), Ge.init(a, l);
}), Z2 = /* @__PURE__ */ B("$ZodCUID", (a, l) => {
  l.pattern ?? (l.pattern = Zx), Ge.init(a, l);
}), k2 = /* @__PURE__ */ B("$ZodCUID2", (a, l) => {
  l.pattern ?? (l.pattern = kx), Ge.init(a, l);
}), H2 = /* @__PURE__ */ B("$ZodULID", (a, l) => {
  l.pattern ?? (l.pattern = Hx), Ge.init(a, l);
}), B2 = /* @__PURE__ */ B("$ZodXID", (a, l) => {
  l.pattern ?? (l.pattern = Bx), Ge.init(a, l);
}), L2 = /* @__PURE__ */ B("$ZodKSUID", (a, l) => {
  l.pattern ?? (l.pattern = Lx), Ge.init(a, l);
}), Q2 = /* @__PURE__ */ B("$ZodISODateTime", (a, l) => {
  l.pattern ?? (l.pattern = u2(l)), Ge.init(a, l);
}), Y2 = /* @__PURE__ */ B("$ZodISODate", (a, l) => {
  l.pattern ?? (l.pattern = i2), Ge.init(a, l);
}), $2 = /* @__PURE__ */ B("$ZodISOTime", (a, l) => {
  l.pattern ?? (l.pattern = l2(l)), Ge.init(a, l);
}), G2 = /* @__PURE__ */ B("$ZodISODuration", (a, l) => {
  l.pattern ?? (l.pattern = $x), Ge.init(a, l);
}), V2 = /* @__PURE__ */ B("$ZodIPv4", (a, l) => {
  l.pattern ?? (l.pattern = Jx), Ge.init(a, l);
}), X2 = /^[0-9a-fA-F:.]+$/;
function ng(a) {
  return X2.test(a) ? tg(`http://[${a}]`) : !1;
}
const K2 = /* @__PURE__ */ B("$ZodIPv6", (a, l) => {
  l.pattern ?? (l.pattern = Ix), Ge.init(a, l), a._zod.check = (s) => {
    ng(s.value) || s.issues.push({
      code: "invalid_format",
      format: "ipv6",
      input: s.value,
      inst: a,
      continue: !l.abort
    });
  };
}), J2 = /* @__PURE__ */ B("$ZodCIDRv4", (a, l) => {
  l.pattern ?? (l.pattern = Fx), Ge.init(a, l);
});
function I2(a) {
  const l = a.split("/");
  if (l.length !== 2)
    return !1;
  const [s, c] = l;
  if (!c)
    return !1;
  const f = Number(c);
  return `${f}` !== c || f < 0 || f > 128 ? !1 : ng(s);
}
const F2 = /* @__PURE__ */ B("$ZodCIDRv6", (a, l) => {
  l.pattern ?? (l.pattern = Px), Ge.init(a, l), a._zod.check = (s) => {
    I2(s.value) || s.issues.push({
      code: "invalid_format",
      format: "cidrv6",
      input: s.value,
      inst: a,
      continue: !l.abort
    });
  };
});
function ag(a) {
  if (a === "")
    return !0;
  if (/\s/.test(a) || a.length % 4 !== 0)
    return !1;
  try {
    return atob(a), !0;
  } catch {
    return !1;
  }
}
const ig = /^[0-9a-zA-Z+/]*={0,2}$/, P2 = /* @__PURE__ */ B("$ZodBase64", (a, l) => {
  l.pattern ?? (l.pattern = ig), Ge.init(a, l), a._zod.check = (s) => {
    ag(s.value) || s.issues.push({
      code: "invalid_format",
      format: "base64",
      input: s.value,
      inst: a,
      continue: !l.abort
    });
  };
}), Xf = /^[A-Za-z0-9_-]*$/;
function W2(a) {
  if (!Xf.test(a))
    return !1;
  const l = a.replace(/[-_]/g, (c) => c === "-" ? "+" : "/"), s = l.padEnd(Math.ceil(l.length / 4) * 4, "=");
  return ag(s);
}
const ej = /* @__PURE__ */ B("$ZodBase64URL", (a, l) => {
  l.pattern ?? (l.pattern = Xf), Ge.init(a, l), a._zod.check = (s) => {
    W2(s.value) || s.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: s.value,
      inst: a,
      continue: !l.abort
    });
  };
}), tj = /* @__PURE__ */ B("$ZodE164", (a, l) => {
  l.pattern ?? (l.pattern = n2), Ge.init(a, l);
});
function nj(a, l = null) {
  try {
    const s = a.split(".");
    if (s.length !== 3)
      return !1;
    const [c] = s;
    if (!c)
      return !1;
    const f = JSON.parse(atob(c));
    return !("typ" in f && f?.typ !== "JWT" || !f.alg || l && (!("alg" in f) || f.alg !== l));
  } catch {
    return !1;
  }
}
const aj = /* @__PURE__ */ B("$ZodJWT", (a, l) => {
  Ge.init(a, l), a._zod.check = (s) => {
    nj(s.value, l.alg) || s.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: s.value,
      inst: a,
      continue: !l.abort
    });
  };
}), lg = /* @__PURE__ */ B("$ZodNumber", (a, l) => {
  lt.init(a, l), a._zod.pattern = r2, a._zod.parse = (s, c) => {
    if (l.coerce)
      try {
        s.value = Number(s.value);
      } catch {
      }
    const f = s.value;
    if (typeof f == "number" && !Number.isNaN(f) && Number.isFinite(f))
      return s;
    const h = typeof f == "number" ? Number.isNaN(f) ? "NaN" : Number.isFinite(f) ? void 0 : String(f) : void 0;
    return s.issues.push({
      expected: "number",
      code: "invalid_type",
      input: f,
      inst: a,
      ...h ? { received: h } : {}
    }), s;
  };
}), ij = /* @__PURE__ */ B("$ZodNumberFormat", (a, l) => {
  d2.init(a, l), lg.init(a, l);
}), lj = /* @__PURE__ */ B("$ZodUnknown", (a, l) => {
  lt.init(a, l), a._zod.parse = (s) => s;
}), uj = /* @__PURE__ */ B("$ZodNever", (a, l) => {
  lt.init(a, l), a._zod.parse = (s, c) => (s.issues.push({
    expected: "never",
    code: "invalid_type",
    input: s.value,
    inst: a
  }), s);
});
function sj(a, l) {
  const s = Lv(a._zod.def.checks);
  if (!s.length)
    return;
  const c = Math.min(...s.map((h) => h[0])), f = a._zod.parse;
  a._zod.parse = (h, m) => {
    const p = l(h.value);
    if (p > c && !m?.skipChecks && m?.direction !== "backward") {
      for (const [y, b] of Lv(a._zod.def.checks))
        if (p > y && b._zod.def.when(h)) {
          const S = h.issues.length;
          return b._zod.check(h), h.issues[S].continue = !1, jf(h.issues, S, a), h;
        }
    }
    return f(h, m);
  };
}
const rj = (a) => Array.isArray(a) ? a.length : -1;
function Xv(a, l, s) {
  a.issues.length && l.issues.push(...$y(s, a.issues)), l.value[s] = a.value;
}
const cj = /* @__PURE__ */ B("$ZodArray", (a, l) => {
  lt.init(a, l);
  const s = Bn.memoizer;
  s?.attach(a), a._zod.parse = (c, f) => {
    const h = c.value;
    if (!Array.isArray(h))
      return c.issues.push({
        expected: "array",
        code: "invalid_type",
        input: h,
        inst: a
      }), c;
    c.value = s ? s.alloc(a, c, Array(h.length), f) : Array(h.length);
    const m = [], p = f?.abortEarly;
    for (let y = 0; y < h.length; y++) {
      const b = h[y], S = l.element._zod.run({
        value: b,
        issues: []
      }, f);
      if (S instanceof Promise)
        m.push(S.then((g) => Xv(g, c, y)));
      else if (Xv(S, c, y), p && S.issues.length !== 0 && ia(S))
        break;
    }
    return m.length ? Promise.all(m).then(() => c) : c;
  }, sj(a, rj);
});
function yr(a, l, s, c, f, h) {
  const m = s in c, p = h === "optional";
  if (!(!m && p && f === "optional")) {
    if (a.issues.length) {
      if (f !== void 0 && p && !m)
        return;
      l.issues.push(...$y(s, a.issues));
    }
    if (!m && f === void 0) {
      a.issues.length || l.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: void 0,
        path: [s]
      });
      return;
    }
    a.value === void 0 ? (m || f === "defaulted" && !p) && (l.value[s] = void 0) : l.value[s] = a.value;
  }
}
const oj = [];
function ug(a) {
  const l = Object.keys(a.shape), s = Object.getOwnPropertySymbols(a.shape), c = s.length ? s : oj, f = c.length ? [...l, ...c] : l;
  for (const m of f)
    if (!a.shape?.[m]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${String(m)}": expected a Zod schema`);
  const h = FS(a.shape);
  return {
    ...a,
    allKeys: f,
    symbolKeys: c,
    // string-only: handleCatchall matches it against `for...in`, which never yields a symbol
    keySet: new Set(l),
    numKeys: l.length,
    optionalKeys: new Set(h)
  };
}
function sg(a, l, s, c, f, h, m) {
  const p = [], y = f.keySet, b = f.catchall._zod, S = b.def.type, g = b.optin, O = b.optout;
  let U = 0;
  for (const R in l) {
    if (m && s.issues.length !== U) {
      if (ia(s, U))
        break;
      U = s.issues.length;
    }
    if (y.has(R))
      continue;
    if (R === "__proto__") {
      S === "never" && p.push(R);
      continue;
    }
    if (S === "never") {
      p.push(R);
      continue;
    }
    const N = b.run({ value: l[R], issues: [] }, c);
    N instanceof Promise ? a.push(N.then((A) => yr(A, s, R, l, g, O))) : yr(N, s, R, l, g, O);
  }
  return p.length && s.issues.push({
    code: "unrecognized_keys",
    keys: p,
    input: l,
    inst: h,
    // Describes the shape of the input, not the validity of the parsed value, so it never aborts. The parse still fails; the schema's own checks just get to run first, and an enclosing intersection can reconcile the key against a sibling operand.
    continue: !0
  }), a.length ? Promise.all(a).then(() => s) : s;
}
const fj = /* @__PURE__ */ B("$ZodObject", (a, l) => {
  lt.init(a, l);
  const s = Object.getOwnPropertyDescriptor(l, "shape"), c = s?.get ? s.get.raw : l.shape ?? {};
  if (c) {
    const b = () => {
      const S = { ...c };
      return Object.defineProperty(l, "shape", { value: S }), b.raw = S, S;
    };
    b.raw = c, Object.defineProperty(l, "shape", { get: b });
  }
  const f = Zf(() => ug(l));
  Ue(a, "propValues", (b) => {
    const S = b.def.shape, g = {};
    for (const O in S) {
      const U = S[O]._zod;
      if (U.values) {
        Object.prototype.hasOwnProperty.call(g, O) || vi(g, O, /* @__PURE__ */ new Set());
        for (const R of U.values)
          g[O].add(R);
        U.optin !== void 0 && g[O].add(void 0);
      }
    }
    return g;
  });
  const h = mr, m = l.catchall;
  let p;
  const y = Bn.memoizer;
  y?.attach(a), a._zod.parse = (b, S) => {
    p ?? (p = f.value);
    const g = b.value;
    if (!h(g))
      return b.issues.push({
        expected: "object",
        code: "invalid_type",
        input: g,
        inst: a
      }), b;
    b.value = y ? y.alloc(a, b, {}, S) : {};
    const O = [], U = p.shape, R = S?.abortEarly;
    let N = b.issues.length;
    for (const A of p.allKeys) {
      if (R && b.issues.length !== N) {
        if (ia(b, N))
          break;
        N = b.issues.length;
      }
      if (A === "__proto__")
        continue;
      const M = U[A], Y = M._zod.optin, se = M._zod.optout, pe = M._zod.run({ value: g[A], issues: [] }, S);
      pe instanceof Promise ? O.push(pe.then((ee) => yr(ee, b, A, g, Y, se))) : yr(pe, b, A, g, Y, se);
    }
    return m ? sg(O, g, b, S, f.value, a, R === !0) : O.length ? Promise.all(O).then(() => b) : b;
  };
}), dj = /* @__PURE__ */ B("$ZodObjectJIT", (a, l) => {
  fj.init(a, l);
  const s = a._zod.parse, c = Zf(() => ug(l)), f = Bn.memoizer, h = (U) => {
    const R = c.value, N = R.symbolKeys, A = new j2(["payload", "ctx"], { shape: U, inst: a, memo: f, syms: N }), M = (ee) => `shape[${ee}]._zod.run({ value: input[${ee}], issues: [] }, ctx)`, Y = (ee, I) => `
          let ${ee}_ab = false;
          for (let i = 0; i < ${ee}.issues.length; i++) {
            const iss = ${ee}.issues[i];
            iss.path = iss.path ? [${I}, ...iss.path] : [${I}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${ee}_ab = true;
          }
          if (${ee}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
    A.write("const input = payload.value;");
    const se = /* @__PURE__ */ Object.create(null);
    let pe = 0;
    for (const ee of R.allKeys)
      se[ee] = `key_${pe++}`;
    A.write(f ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
    for (const ee of R.allKeys) {
      if (ee === "__proto__")
        continue;
      const I = se[ee], F = typeof ee == "symbol" ? `syms[${N.indexOf(ee)}]` : XS(ee), oe = `${F} in input`, J = U[ee], Ee = J?._zod?.optin, Be = Ee !== void 0, Ve = J?._zod?.optout === "optional";
      if (A.write(`const ${I} = ${M(F)};`), Be && Ve) {
        const wt = Ee === "optional" ? `${I}_present` : `${I}.value !== undefined || ${I}_present`;
        A.write(`
        const ${I}_present = ${oe};
        if (!${I}.issues.length || ${I}_present) {
          if (${I}.issues.length) {${Y(I, F)}
          }

          if (${wt}) {
            newResult[${F}] = ${I}.value;
          }
        }

      `);
      } else Be ? (A.write(`
        if (${I}.issues.length) {${Y(I, F)}
        }
      `), Ee === "defaulted" ? A.write(`newResult[${F}] = ${I}.value;`) : A.write(`
        if (${I}.value !== undefined || ${oe}) {
          newResult[${F}] = ${I}.value;
        }
      `)) : A.write(`
        const ${I}_present = ${oe};
        if (${I}.issues.length) {${Y(I, F)}
        }
        if (!${I}_present && !${I}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${F}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${I}_present) {
          newResult[${F}] = ${I}.value;
        }

      `);
    }
    return A.write("payload.value = newResult;"), A.write("return payload;"), A.compile();
  };
  let m;
  const p = mr, y = !Bn.jitless, S = y && JS.value, g = l.catchall;
  let O;
  a._zod.parse = (U, R) => {
    O ?? (O = c.value);
    const N = U.value;
    return p(N) ? y && S && R?.async === !1 && R.jitless !== !0 ? (m || (m = h(l.shape)), U = m(U, R), g ? sg([], N, U, R, O, a, R?.abortEarly === !0) : U) : s(U, R) : (U.issues.push({
      expected: "object",
      code: "invalid_type",
      input: N,
      inst: a
    }), U);
  };
});
function Kv(a, l, s, c) {
  for (const h of a)
    if (h.issues.length === 0)
      return l.value = h.value, l;
  const f = a.filter((h) => !ia(h));
  return f.length === 1 ? (l.value = f[0].value, f[0]) : (l.issues.push({
    code: "invalid_union",
    input: l.value,
    inst: s,
    errors: a.map((h) => h.issues.map((m) => gl(m, c, Ha())))
  }), l);
}
const hj = /* @__PURE__ */ B("$ZodUnion", (a, l) => {
  lt.init(a, l), Ue(a, "optin", (c) => c.def.options.some((f) => f._zod.optin === "defaulted") ? "defaulted" : c.def.options.some((f) => f._zod.optin !== void 0) ? "optional" : void 0), Ue(a, "optout", (c) => c.def.options.some((f) => f._zod.optout === "optional") ? "optional" : void 0), Ue(a, "values", (c) => {
    if (c.def.options.every((f) => f._zod.values))
      return new Set(c.def.options.flatMap((f) => Array.from(f._zod.values)));
  }), Ue(a, "pattern", (c) => {
    if (c.def.options.every((f) => f._zod.pattern)) {
      const f = c.def.options.map((h) => h._zod.pattern);
      return new RegExp(`^(${f.map((h) => kf(h.source)).join("|")})$`);
    }
  });
  const s = l.options.length === 1 ? l.options[0]._zod.run : null;
  a._zod.parse = (c, f) => {
    if (s)
      return s(c, f);
    let h = !1;
    const m = [];
    for (const p of l.options) {
      const y = p._zod.run({
        value: c.value,
        issues: []
      }, f);
      if (y instanceof Promise)
        m.push(y), h = !0;
      else {
        if (y.issues.length === 0)
          return y;
        m.push(y);
      }
    }
    return h ? Promise.all(m).then((p) => Kv(p, c, a, f)) : Kv(m, c, a, f);
  };
}), mj = /* @__PURE__ */ B("$ZodIntersection", (a, l) => {
  lt.init(a, l), a._zod.parse = (s, c) => {
    const f = s.value, h = l.left._zod.run({ value: f, issues: [] }, c), m = l.right._zod.run({ value: f, issues: [] }, c);
    return h instanceof Promise || m instanceof Promise ? Promise.all([h, m]).then(([y, b]) => Jv(s, y, b)) : Jv(s, h, m);
  };
});
function zf(a, l) {
  if (a === l)
    return { valid: !0, data: a };
  if (a instanceof Date && l instanceof Date && +a == +l)
    return { valid: !0, data: a };
  if (Eu(a) && Eu(l)) {
    const s = Object.keys(l), c = Object.keys(a).filter((h) => s.indexOf(h) !== -1), f = { ...a, ...l };
    Object.prototype.hasOwnProperty.call(f, "__proto__") && delete f.__proto__;
    for (const h of c) {
      if (h === "__proto__")
        continue;
      const m = zf(a[h], l[h]);
      if (!m.valid)
        return {
          valid: !1,
          mergeErrorPath: [h, ...m.mergeErrorPath]
        };
      f[h] = m.data;
    }
    return { valid: !0, data: f };
  }
  if (Array.isArray(a) && Array.isArray(l)) {
    if (a.length !== l.length)
      return { valid: !1, mergeErrorPath: [] };
    const s = [];
    for (let c = 0; c < a.length; c++) {
      const f = a[c], h = l[c], m = zf(f, h);
      if (!m.valid)
        return {
          valid: !1,
          mergeErrorPath: [c, ...m.mergeErrorPath]
        };
      s.push(m.data);
    }
    return { valid: !0, data: s };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Jv(a, l, s) {
  const c = /* @__PURE__ */ new Map();
  let f;
  const h = /* @__PURE__ */ new Map(), m = (b, S) => {
    let g;
    if (b.code === "unrecognized_keys" && !b.path?.length)
      f ?? (f = b), g = b.keys;
    else if (b.code === "invalid_key" && b.origin === "record" && b.path?.length === 1) {
      const O = String(b.path[0]);
      h.has(O) || h.set(O, b), g = [O];
    } else
      return !1;
    for (const O of g)
      c.has(O) || c.set(O, {}), c.get(O)[S] = !0;
    return !0;
  };
  for (const b of l.issues)
    m(b, "l") || a.issues.push(b);
  for (const b of s.issues)
    m(b, "r") || a.issues.push(b);
  const p = [...c].filter(([, b]) => b.l && b.r).map(([b]) => b);
  if (p.length) {
    const b = f ? p.filter((S) => f.keys.includes(S)) : [];
    b.length && a.issues.push({ ...f, keys: b });
    for (const S of p)
      !b.includes(S) && h.has(S) && a.issues.push(h.get(S));
  }
  const y = zf(l.value, s.value);
  if (!y.valid) {
    if (ia(a))
      return a;
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(y.mergeErrorPath)}`);
  }
  return a.value = y.data, a;
}
const pj = /* @__PURE__ */ B("$ZodEnum", (a, l) => {
  lt.init(a, l);
  const s = Sf(l.entries), c = new Set(s);
  a._zod.values = c, Ue(a, "pattern", (f) => {
    const h = Sf(f.def.entries).filter((m) => IS.has(typeof m));
    return new RegExp(h.length ? `^(${h.map((m) => xr(m.toString())).join("|")})$` : "^[^\\s\\S]$");
  }), a._zod.parse = (f, h) => {
    const m = f.value;
    return c.has(m) || f.issues.push({
      code: "invalid_value",
      values: s,
      input: m,
      inst: a
    }), f;
  };
}), vj = /* @__PURE__ */ B("$ZodTransform", (a, l) => {
  lt.init(a, l), a._zod.optin = "optional", Bn.memoizer?.guard(a), a._zod.parse = (s, c) => {
    if (c.direction === "backward")
      throw new Xy(a.constructor.name);
    const f = l.transform(s.value, s);
    if (c.async)
      return (f instanceof Promise ? f : Promise.resolve(f)).then((m) => (s.value = m, s));
    if (f instanceof Promise)
      throw new mi();
    return s.value = f, s;
  };
});
function Iv(a, l) {
  return a.value = l.issues.length ? void 0 : l.value, a;
}
const rg = /* @__PURE__ */ B("$ZodOptional", (a, l) => {
  lt.init(a, l), Ue(a, "optin", (s) => s.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), a._zod.optout = "optional", Ue(a, "values", (s) => {
    const c = s.def.innerType._zod.values;
    return c ? /* @__PURE__ */ new Set([...c, void 0]) : void 0;
  }), Ue(a, "pattern", (s) => {
    const c = s.def.innerType._zod.pattern;
    return c ? new RegExp(`^(${kf(c.source)})?$`) : void 0;
  }), a._zod.parse = (s, c) => {
    if (s.value === void 0) {
      if (l.innerType._zod.optin !== "defaulted")
        return s;
      const f = l.innerType._zod.run({ value: s.value, issues: [] }, c);
      return f instanceof Promise ? f.then((h) => Iv(s, h)) : Iv(s, f);
    }
    return l.innerType._zod.run(s, c);
  };
}), yj = /* @__PURE__ */ B("$ZodExactOptional", (a, l) => {
  rg.init(a, l), Ue(a, "values", (s) => s.def.innerType._zod.values), Ue(a, "pattern", (s) => s.def.innerType._zod.pattern), a._zod.parse = (s, c) => l.innerType._zod.run(s, c);
}), gj = /* @__PURE__ */ B("$ZodNullable", (a, l) => {
  lt.init(a, l), Ue(a, "optin", (s) => s.def.innerType._zod.optin), Ue(a, "optout", (s) => s.def.innerType._zod.optout), Ue(a, "pattern", (s) => {
    const c = s.def.innerType._zod.pattern;
    return c ? new RegExp(`^(${kf(c.source)}|null)$`) : void 0;
  }), Ue(a, "values", (s) => s.def.innerType._zod.values ? /* @__PURE__ */ new Set([...s.def.innerType._zod.values, null]) : void 0), a._zod.parse = (s, c) => s.value === null ? s : l.innerType._zod.run(s, c);
}), bj = /* @__PURE__ */ B("$ZodDefault", (a, l) => {
  lt.init(a, l), a._zod.optin = "defaulted", Ue(a, "values", (s) => s.def.innerType._zod.values), a._zod.parse = (s, c) => {
    if (c.direction === "backward")
      return l.innerType._zod.run(s, c);
    if (s.value === void 0)
      return s.value = l.defaultValue, s;
    const f = l.innerType._zod.run(s, c);
    return f instanceof Promise ? f.then((h) => Fv(h, l)) : Fv(f, l);
  };
});
function Fv(a, l) {
  return a.value === void 0 && (a.value = l.defaultValue), a;
}
const _j = /* @__PURE__ */ B("$ZodPrefault", (a, l) => {
  lt.init(a, l), a._zod.optin = "defaulted", Ue(a, "values", (s) => s.def.innerType._zod.values), a._zod.parse = (s, c) => (c.direction === "backward" || s.value === void 0 && (s.value = l.defaultValue), l.innerType._zod.run(s, c));
}), Sj = /* @__PURE__ */ B("$ZodNonOptional", (a, l) => {
  lt.init(a, l), Ue(a, "values", (s) => {
    const c = s.def.innerType._zod.values;
    return c ? new Set([...c].filter((f) => f !== void 0)) : void 0;
  }), a._zod.parse = (s, c) => {
    const f = l.innerType._zod.run(s, c);
    return f instanceof Promise ? f.then((h) => Pv(h, a)) : Pv(f, a);
  };
});
function Pv(a, l) {
  return !a.issues.length && a.value === void 0 && a.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: a.value,
    inst: l
  }), a;
}
function Wv(a, l, s, c) {
  return l.issues.length ? (a.value = s.catchValue({
    ...l,
    value: a.value,
    error: {
      issues: l.issues.map((f) => gl(f, c, Ha()))
    },
    input: a.value
  }), a) : (a.value = l.value, l.memo && (a.memo = !0), a);
}
const xj = /* @__PURE__ */ B("$ZodCatch", (a, l) => {
  lt.init(a, l), Ue(a, "optin", (s) => s.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), Ue(a, "optout", (s) => s.def.innerType._zod.optout), Ue(a, "values", (s) => s.def.innerType._zod.values), a._zod.parse = (s, c) => {
    if (c.direction === "backward")
      return l.innerType._zod.run(s, c);
    const f = l.innerType._zod.run({ value: s.value, issues: [] }, c);
    return f instanceof Promise ? f.then((h) => Wv(s, h, l, c)) : Wv(s, f, l, c);
  };
}), jj = /* @__PURE__ */ B("$ZodPipe", (a, l) => {
  lt.init(a, l), Ue(a, "values", (s) => s.def.in._zod.values), Ue(a, "optin", (s) => s.def.in._zod.optin), Ue(a, "optout", (s) => s.def.out._zod.optout), Ue(a, "propValues", (s) => s.def.in._zod.propValues), a._zod.parse = (s, c) => {
    if (c.direction === "backward") {
      const h = l.out._zod.run(s, c);
      return h instanceof Promise ? h.then((m) => ir(m, l.in, c)) : ir(h, l.in, c);
    }
    const f = l.in._zod.run(s, c);
    return f instanceof Promise ? f.then((h) => ir(h, l.out, c)) : ir(f, l.out, c);
  };
});
function ir(a, l, s) {
  return a.issues.some((c) => c.code !== "unrecognized_keys") ? (a.aborted = !0, a) : l._zod.run({ value: a.value, issues: a.issues }, s);
}
const Oj = /* @__PURE__ */ B("$ZodReadonly", (a, l) => {
  lt.init(a, l), Ue(a, "propValues", (s) => s.def.innerType._zod.propValues), Ue(a, "values", (s) => s.def.innerType._zod.values), Ue(a, "optin", (s) => s.def.innerType?._zod?.optin), Ue(a, "optout", (s) => s.def.innerType?._zod?.optout), a._zod.parse = (s, c) => {
    if (c.direction === "backward")
      return l.innerType._zod.run(s, c);
    const f = l.innerType._zod.run(s, c);
    return f instanceof Promise ? f.then(ey) : ey(f);
  };
});
function ey(a) {
  return a.memo || (a.value = Object.freeze(a.value)), a;
}
const zj = /* @__PURE__ */ B("$ZodCustom", (a, l) => {
  Yt.init(a, l), lt.init(a, l), a._zod.parse = (s, c) => s, a._zod.check = (s) => {
    const c = s.value, f = l.fn(c);
    if (f instanceof Promise)
      return f.then((h) => ty(h, s, c, a));
    ty(f, s, c, a);
  };
});
function ty(a, l, s, c) {
  if (!a) {
    const f = {
      code: "custom",
      input: s,
      inst: c,
      // incorporates params.error into issue reporting
      path: [...c._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !c._zod.def.abort
      // params: inst._zod.def.params,
    };
    c._zod.def.params && (f.params = c._zod.def.params), l.issues.push(Tu(f));
  }
}
class Ej extends Error {
  constructor() {
    super("Cannot parse a reference cycle that closes through a transform"), this.name = "ZodCyclicError";
  }
}
const Ef = "~memo", ny = [];
function cg(a) {
  return a !== null && typeof a == "object";
}
function df(a) {
  return a.map((l) => l.path ? { ...l, path: l.path.slice() } : { ...l });
}
const og = /* @__PURE__ */ new WeakMap(), gu = 0, or = 1, xu = 2;
function fr(a, l, s) {
  const c = og.get(a);
  if (c !== void 0)
    return c ? xu : gu;
  if (l.has(a))
    return xu;
  l.add(a);
  let f = gu;
  const h = (S) => {
    if (f !== xu && S?._zod) {
      const g = fr(S, l);
      g > f && (f = g);
    }
  }, m = (S, g) => {
    let O = gu;
    for (const U of Reflect.ownKeys(S)) {
      const R = Object.getOwnPropertyDescriptor(S, U);
      if (!R.enumerable)
        continue;
      const N = R.get ? or : R.value?._zod ? fr(R.value, l) : gu;
      N > O && (O = N);
    }
    return O;
  }, p = (S) => {
    S > f && (f = S);
  }, y = a._zod.def;
  switch (y.type) {
    case "object": {
      const S = qy(y);
      p(S ? m(S) : or), h(y.catchall);
      break;
    }
    case "array":
      h(y.element);
      break;
    case "tuple":
      for (const S of y.items)
        h(S);
      h(y.rest);
      break;
    case "record":
    case "map":
      h(y.keyType), h(y.valueType);
      break;
    case "set":
      h(y.valueType);
      break;
    case "union":
      for (const S of y.options)
        h(S);
      break;
    case "intersection":
      h(y.left), h(y.right);
      break;
    case "optional":
    case "nullable":
    case "default":
    case "prefault":
    case "catch":
    case "readonly":
    case "nonoptional":
    case "promise":
    case "success":
      h(y.innerType);
      break;
    case "pipe":
      h(y.in), h(y.out);
      break;
    case "function":
      h(y.input), h(y.output);
      break;
    // `$ZodLazy` caches its inner on the def, so a resolved edge is followed exactly
    case "lazy": {
      const S = y._cachedInner ?? void 0;
      p(S ? fr(S, l) : or);
      break;
    }
    // a leaf by choice: `parts` are regex fragments, not data positions
    case "template_literal":
    // leaves
    case "string":
    case "number":
    case "int":
    case "boolean":
    case "bigint":
    case "symbol":
    case "undefined":
    case "null":
    case "void":
    case "never":
    case "any":
    case "unknown":
    case "date":
    case "nan":
    case "enum":
    case "literal":
    case "file":
    case "transform":
    case "custom":
      break;
    default:
      for (const S in y) {
        const g = Object.getOwnPropertyDescriptor(y, S);
        if (!g || g.get)
          continue;
        const O = g.value;
        if (!(!O || typeof O != "object")) {
          if (O._zod)
            h(O);
          else if (Array.isArray(O))
            for (const U of O)
              h(U);
        }
      }
  }
  return l.delete(a), Tj(a, f);
}
function Tj(a, l) {
  return l !== or && og.set(a, l === xu), l;
}
function Nj(a, l) {
  let s = a.buckets.get(l);
  return s || (s = /* @__PURE__ */ new WeakMap(), a.buckets.set(l, s)), s;
}
let lr;
const ur = [], Cj = {
  alloc(a, l, s) {
    const c = lr;
    if (!c)
      return s;
    lr = void 0;
    const f = { value: s, issues: null };
    return c.set(l.value, f), ur.push(f), s;
  },
  guard(a) {
    var l;
    (l = a._zod).deferred ?? (l.deferred = []), a._zod.deferred.push(() => {
      const s = a._zod.parse, c = (f, h) => {
        if (h.direction !== "backward" && wj(h, f.value))
          throw new Ej();
        return s(f, h);
      };
      a._zod.parse = c, a._zod.run === s && (a._zod.run = c);
    });
  },
  attach(a) {
    var l;
    let s, c = !1, f, h;
    (l = a._zod).deferred ?? (l.deferred = []), a._zod.deferred.push(() => {
      const m = a._zod.parse, p = (y, b) => {
        if (s === void 0) {
          const M = fr(a, /* @__PURE__ */ new Set());
          if (M === gu)
            return a._zod.parse = m, a._zod.run === p && (a._zod.run = m), m(y, b);
          M === xu || c ? s = !0 : c = !0;
        }
        const S = y.value;
        if (!cg(S))
          return m(y, b);
        let g = b[Ef];
        g || (g = { buckets: /* @__PURE__ */ new WeakMap(), backEdges: void 0 }, b[Ef] = g);
        let O;
        f === b ? O = h : (O = Nj(g, a), f = b, h = O);
        const U = O.get(S);
        if (U)
          return y.value = U.value, U.issues ? U.issues.length && y.issues.push(...df(U.issues)) : (y.memo = !0, g.backEdges ?? (g.backEdges = /* @__PURE__ */ new WeakSet()), g.backEdges.add(U.value)), y;
        lr = O;
        const R = ur.length, N = m(y, b);
        lr = void 0;
        const A = ur.length > R ? ur.pop() : void 0;
        return N instanceof Promise ? N.then((M) => (A && (A.issues = M.issues.length ? df(M.issues) : ny), M)) : (A && (A.issues = N.issues.length ? df(N.issues) : ny), N);
      };
      a._zod.parse = p, a._zod.run === m && (a._zod.run = p);
    });
  }
};
function Aj() {
  return Cj;
}
function wj(a, l) {
  const s = a[Ef]?.backEdges;
  return s !== void 0 && cg(l) && s.has(l);
}
const Rj = () => {
  const a = {
    string: { unit: "characters", verb: "to have" },
    file: { unit: "bytes", verb: "to have" },
    array: { unit: "items", verb: "to have" },
    set: { unit: "items", verb: "to have" },
    map: { unit: "entries", verb: "to have" }
  };
  function l(h) {
    return a[h] ?? null;
  }
  const s = {
    regex: "input",
    email: "email address",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datetime",
    date: "ISO date",
    time: "ISO time",
    duration: "ISO duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    mac: "MAC address",
    cidrv4: "IPv4 range",
    cidrv6: "IPv6 range",
    base64: "base64-encoded string",
    base64url: "base64url-encoded string",
    json_string: "JSON string",
    e164: "E.164 number",
    currency_code: "currency code",
    credit_card: "credit card number",
    iban: "IBAN",
    jwt: "JWT",
    template_literal: "input"
  }, c = {
    // Compatibility: "nan" -> "NaN" for display
    nan: "NaN"
    // All other type names omitted - they fall back to raw values via ?? operator
  };
  function f(h, m) {
    return h === "number" && typeof m == "number" && !Number.isFinite(m) ? String(m) : c[h] ?? h;
  }
  return (h) => {
    switch (h.code) {
      case "invalid_type": {
        const m = f(h.expected), p = sx(h.input), y = f(p, h.input);
        return `Invalid input: expected ${m}, received ${y}`;
      }
      case "invalid_value":
        return h.values.length === 1 ? `Invalid input: expected ${Ly(h.values[0])}` : `Invalid option: expected one of ${Hv(h.values, "|")}`;
      case "too_big": {
        const m = h.exact ? "exactly " : h.inclusive ? "<=" : "<", p = l(h.origin);
        return p ? `Too big: expected ${h.origin ?? "value"} to have ${m}${h.maximum.toString()} ${p.unit ?? "elements"}` : `Too big: expected ${h.origin ?? "value"} to be ${m}${h.maximum.toString()}`;
      }
      case "too_small": {
        const m = h.exact ? "exactly " : h.inclusive ? ">=" : ">", p = l(h.origin);
        return p ? `Too small: expected ${h.origin} to have ${m}${h.minimum.toString()} ${p.unit}` : `Too small: expected ${h.origin} to be ${m}${h.minimum.toString()}`;
      }
      case "invalid_format": {
        const m = h;
        return m.format === "starts_with" ? `Invalid string: must start with "${m.prefix}"` : m.format === "ends_with" ? `Invalid string: must end with "${m.suffix}"` : m.format === "includes" ? `Invalid string: must include "${m.includes}"` : m.format === "regex" ? `Invalid string: must match pattern ${m.pattern}` : `Invalid ${s[m.format] ?? h.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${h.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${h.keys.length > 1 ? "s" : ""}: ${Hv(h.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${h.origin}`;
      case "invalid_union":
        return h.options && Array.isArray(h.options) && h.options.length > 0 ? `Invalid discriminator value. Expected ${h.options.map((p) => `'${p}'`).join(" | ")}` : h.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
      case "invalid_element":
        return `Invalid value in ${h.origin}`;
      default:
        return "Invalid input";
    }
  };
};
function Mj() {
  return {
    localeError: Rj()
  };
}
var ay;
class Dj {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(l, ...s) {
    const c = s[0];
    return this._map.set(l, c), c && typeof c == "object" && "id" in c && this._idmap.set(c.id, l), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(l) {
    const s = this._map.get(l);
    return s && typeof s == "object" && "id" in s && this._idmap.delete(s.id), this._map.delete(l), this;
  }
  get(l) {
    const s = l._zod.parent;
    if (s) {
      const c = { ...this.get(s) ?? {} };
      delete c.id;
      const f = { ...c, ...this._map.get(l) };
      return Object.keys(f).length ? f : void 0;
    }
    return this._map.get(l);
  }
  has(l) {
    return this._map.has(l);
  }
}
function Uj() {
  return new Dj();
}
(ay = globalThis).__zod_globalRegistry ?? (ay.__zod_globalRegistry = Uj());
const bu = globalThis.__zod_globalRegistry;
function fg(a) {
  return a.checks && (a.checks = [...a.checks]), a;
}
// @__NO_SIDE_EFFECTS__
function qj(a, l) {
  return new a(fg({ type: "string", ...ie(l) }));
}
// @__NO_SIDE_EFFECTS__
function dg(a, l) {
  return new a({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Zj(a, l) {
  return new a({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function hg(a, l) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function kj(a, l) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Hj(a, l) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Bj(a, l) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Lj(a, l) {
  return new a({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Qj(a, l) {
  return new a({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Yj(a, l) {
  return new a({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function $j(a, l) {
  return new a({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Gj(a, l) {
  return new a({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Vj(a, l) {
  return new a({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Xj(a, l) {
  return new a({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Kj(a, l) {
  return new a({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Jj(a, l) {
  return new a({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Ij(a, l) {
  return new a({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Fj(a, l) {
  return new a({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Pj(a, l) {
  return new a({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Wj(a, l) {
  return new a({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function eO(a, l) {
  return new a({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function tO(a, l) {
  return new a({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function nO(a, l) {
  return new a({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function aO(a, l) {
  return new a({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function iO(a, l) {
  return new a({
    type: "string",
    format: "date",
    check: "string_format",
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function lO(a, l) {
  return new a({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function uO(a, l) {
  return new a({
    type: "string",
    format: "duration",
    check: "string_format",
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function sO(a, l) {
  return new a(fg({ type: "number", checks: [], ...ie(l) }));
}
// @__NO_SIDE_EFFECTS__
function rO(a, l) {
  return new a({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function cO(a) {
  return new a({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function oO(a, l) {
  return new a({
    type: "never",
    ...ie(l)
  });
}
// @__NO_SIDE_EFFECTS__
function iy(a, l) {
  return new Iy({
    check: "less_than",
    ...ie(l),
    value: a,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function hf(a, l) {
  return new Iy({
    check: "less_than",
    ...ie(l),
    value: a,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function ly(a, l) {
  return new Fy({
    check: "greater_than",
    ...ie(l),
    value: a,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function mf(a, l) {
  return new Fy({
    check: "greater_than",
    ...ie(l),
    value: a,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function uy(a, l) {
  return new f2({
    check: "multiple_of",
    ...ie(l),
    value: a
  });
}
// @__NO_SIDE_EFFECTS__
function mg(a, l) {
  return new h2({
    check: "max_length",
    ...ie(l),
    maximum: a
  });
}
// @__NO_SIDE_EFFECTS__
function gr(a, l) {
  return new m2({
    check: "min_length",
    ...ie(l),
    minimum: a
  });
}
// @__NO_SIDE_EFFECTS__
function pg(a, l) {
  return new p2({
    check: "length_equals",
    ...ie(l),
    length: a
  });
}
// @__NO_SIDE_EFFECTS__
function fO(a, l) {
  return new v2({
    check: "string_format",
    format: "regex",
    ...ie(l),
    pattern: a
  });
}
// @__NO_SIDE_EFFECTS__
function dO(a) {
  return new y2({
    check: "string_format",
    format: "lowercase",
    ...ie(a)
  });
}
// @__NO_SIDE_EFFECTS__
function hO(a) {
  return new g2({
    check: "string_format",
    format: "uppercase",
    ...ie(a)
  });
}
// @__NO_SIDE_EFFECTS__
function mO(a, l) {
  return new b2({
    check: "string_format",
    format: "includes",
    ...ie(l),
    includes: a
  });
}
// @__NO_SIDE_EFFECTS__
function pO(a, l) {
  return new _2({
    check: "string_format",
    format: "starts_with",
    ...ie(l),
    prefix: a
  });
}
// @__NO_SIDE_EFFECTS__
function vO(a, l) {
  return new S2({
    check: "string_format",
    format: "ends_with",
    ...ie(l),
    suffix: a
  });
}
// @__NO_SIDE_EFFECTS__
function bl(a) {
  return new x2({
    check: "overwrite",
    tx: a
  });
}
// @__NO_SIDE_EFFECTS__
function yO(a) {
  return /* @__PURE__ */ bl((l) => l.normalize(a));
}
// @__NO_SIDE_EFFECTS__
function gO() {
  return /* @__PURE__ */ bl((a) => a.trim());
}
// @__NO_SIDE_EFFECTS__
function bO() {
  return /* @__PURE__ */ bl((a) => a.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function _O() {
  return /* @__PURE__ */ bl((a) => a.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function SO() {
  return /* @__PURE__ */ bl((a) => KS(a));
}
// @__NO_SIDE_EFFECTS__
function xO(a, l, s) {
  return new a({
    type: "array",
    element: l,
    // get element() {
    //   return element;
    // },
    ...ie(s)
  });
}
// @__NO_SIDE_EFFECTS__
function jO(a, l, s) {
  return new a({
    type: "custom",
    check: "custom",
    fn: l,
    ...ie(s)
  });
}
// @__NO_SIDE_EFFECTS__
function OO(a, l) {
  const s = /* @__PURE__ */ zO((c) => (c.addIssue = (f) => {
    if (typeof f == "string")
      c.issues.push(Tu(f, c.value, s._zod.def));
    else {
      const h = f;
      h.fatal && (h.continue = !1), h.code ?? (h.code = "custom"), "input" in h || (h.input = c.value), h.inst ?? (h.inst = s), h.continue ?? (h.continue = !s._zod.def.abort), c.issues.push(Tu(h));
    }
  }, a(c.value, c)), l);
  return s;
}
// @__NO_SIDE_EFFECTS__
function zO(a, l) {
  const s = new Yt({
    check: "custom",
    ...ie(l)
  });
  return s._zod.check = a, s;
}
function ju(a, ...l) {
  for (const s of l)
    for (const c of Reflect.ownKeys(s))
      Object.prototype.propertyIsEnumerable.call(s, c) && vi(a, c, s[c]);
  return a;
}
function vg(a) {
  let l = a?.target ?? "draft-2020-12";
  return l === "draft-4" && (l = "draft-04"), l === "draft-7" && (l = "draft-07"), {
    processors: a.processors ?? {},
    metadataRegistry: a?.metadata ?? bu,
    target: l,
    unrepresentable: a?.unrepresentable ?? "throw",
    override: a?.override ?? (() => {
    }),
    io: a?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    sharedDefsExtractedFor: void 0,
    sharedEmitDoneFor: void 0,
    cycles: a?.cycles ?? "ref",
    reused: a?.reused ?? "inline",
    intersections: [],
    deferred: [],
    external: a?.external ?? void 0
  };
}
function _l(a, l, s, c, f) {
  const h = typeof l.unrepresentable == "function" ? l.unrepresentable({ zodSchema: a, path: c.path, message: f }) : l.unrepresentable;
  if (h === "any")
    return !1;
  if (h === void 0 || h === "throw")
    throw new Error(f);
  return Object.assign(s, h), !0;
}
function jt(a, l, s = { path: [], schemaPath: [] }) {
  var c;
  const f = a._zod.def, h = l.seen.get(a);
  if (h)
    return h.count++, s.schemaPath.includes(a) && (h.cycle = s.path), h.schema;
  const m = { schema: {}, count: 1, cycle: void 0, path: s.path };
  l.seen.set(a, m), l.sharedDefsExtractedFor = void 0, l.sharedEmitDoneFor = void 0;
  const p = a._zod.toJSONSchema?.();
  if (p)
    m.schema = p;
  else {
    const S = {
      ...s,
      schemaPath: [...s.schemaPath, a],
      path: s.path
    };
    if (a._zod.processJSONSchema)
      a._zod.processJSONSchema(l, m.schema, S);
    else {
      const O = m.schema, U = l.processors[f.type];
      if (!U)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${f.type}`);
      U(a, l, O, S);
    }
    const g = a._zod.parent;
    g && (m.ref || (m.ref = g), jt(g, l, S), l.seen.get(g).isParent = !0);
  }
  const y = l.metadataRegistry.get(a);
  return y && ju(m.schema, y), l.io === "input" && At(a) && (delete m.schema.examples, delete m.schema.default), l.io === "input" && "_prefault" in m.schema && ((c = m.schema).default ?? (c.default = m.schema._prefault)), delete m.schema._prefault, l.seen.get(a).schema;
}
function sy(a) {
  return a.replace(/~/g, "~0").replace(/\//g, "~1");
}
function yg(a, l) {
  const s = a.seen.get(l);
  if (!s)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  if (a.external && a.sharedDefsExtractedFor === a.external)
    return;
  const c = /* @__PURE__ */ new Map();
  for (const m of a.seen.entries()) {
    const p = a.metadataRegistry.get(m[0])?.id;
    if (p) {
      const y = c.get(p);
      if (y && y !== m[0])
        throw new Error(`Duplicate schema id "${p}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      c.set(p, m[0]);
    }
  }
  const f = (m) => {
    const p = a.target === "draft-2020-12" ? "$defs" : "definitions";
    if (a.external) {
      const g = a.external.registry.get(m[0])?.id, O = a.external.uri ?? ((R) => R);
      if (g)
        return { ref: O(g) };
      const U = m[1].defId ?? m[1].schema.id ?? `schema${a.counter++}`;
      return m[1].defId = U, { defId: U, ref: `${O("__shared")}#/${p}/${sy(U)}` };
    }
    const y = "#", b = `${y}/${p}/`;
    if (m[1] === s && !m[1].schema.id)
      return { ref: y };
    const S = m[1].schema.id ?? `__schema${a.counter++}`;
    return { defId: S, ref: b + sy(S) };
  }, h = (m) => {
    if (m[1].schema.$ref)
      return;
    const p = m[1], { ref: y, defId: b } = f(m);
    p.def = { ...p.schema }, b && (p.defId = b);
    const S = p.schema;
    for (const g in S)
      delete S[g];
    S.$ref = y;
  };
  if (a.cycles === "throw")
    for (const m of a.seen.entries()) {
      const p = m[1];
      if (p.cycle)
        throw new Error(`Cycle detected: #/${p.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const m of a.seen.entries()) {
    const p = m[1];
    if (l === m[0]) {
      h(m);
      continue;
    }
    if (a.external) {
      const b = a.external.registry.get(m[0])?.id;
      if (l !== m[0] && b) {
        h(m);
        continue;
      }
    }
    if (a.metadataRegistry.get(m[0])?.id) {
      h(m);
      continue;
    }
    if (p.cycle) {
      h(m);
      continue;
    }
    p.count > 1 && a.reused === "ref" && h(m);
  }
  a.external && (a.sharedDefsExtractedFor = a.external);
}
function gg(a) {
  const l = a.anyOf;
  if (!Array.isArray(l) || l.length === 0 || a.type !== void 0)
    return;
  const s = [];
  for (const c of l) {
    if (!c || typeof c != "object")
      return;
    gg(c);
    const f = Object.keys(c);
    if (f.length !== 1 || f[0] !== "type")
      return;
    const h = c.type;
    for (const m of Array.isArray(h) ? h : [h]) {
      if (typeof m != "string")
        return;
      s.includes(m) || s.push(m);
    }
  }
  delete a.anyOf, a.type = s.length === 1 ? s[0] : s;
}
const bg = /* @__PURE__ */ new Set(["type", "properties", "required", "additionalProperties"]), ry = ["oneOf", "anyOf"];
function cy(a) {
  const l = a.additionalProperties;
  return l === void 0 || l === !1 || typeof l != "object" || l === null ? null : Object.keys(l).length ? l : null;
}
function Tf(a) {
  const l = [];
  for (const h of a) {
    if (typeof h != "object" || h.type !== "object")
      return null;
    for (const m in h)
      if (!bg.has(m))
        return null;
    l.push(h);
  }
  const s = {}, c = /* @__PURE__ */ new Set();
  for (const h of l) {
    for (const m in h.properties) {
      if (Object.prototype.hasOwnProperty.call(s, m))
        continue;
      const p = [];
      for (const b of l) {
        const S = b.properties?.[m] ?? cy(b);
        S != null && (p.some((g) => JSON.stringify(g) === JSON.stringify(S)) || p.push(S));
      }
      const y = p.length === 1 ? p[0] : Tf(p) ?? { allOf: p };
      vi(s, m, y);
    }
    for (const m of h.required ?? [])
      c.add(m);
  }
  const f = { type: "object", properties: s };
  if (c.size && (f.required = [...c]), l.every((h) => h.additionalProperties === !1))
    f.additionalProperties = !1;
  else {
    const h = [];
    for (const m of l) {
      const p = cy(m);
      p && !h.some((y) => JSON.stringify(y) === JSON.stringify(p)) && h.push(p);
    }
    h.length === 1 ? f.additionalProperties = h[0] : h.length > 1 && (f.additionalProperties = { allOf: h });
  }
  return f;
}
function EO(a) {
  const l = a.allOf;
  if (!Array.isArray(l) || l.length < 2)
    return;
  for (const f of bg)
    if (f in a)
      return;
  const s = l.filter((f) => ry.some((h) => Array.isArray(f[h])));
  let c = null;
  if (!s.length)
    c = Tf(l);
  else {
    const f = s[0], h = ry.find((y) => Array.isArray(f[y]));
    if (Object.keys(f).length !== 1)
      return;
    const m = l.filter((y) => y !== f), p = f[h].map((y) => Tf([...m, y]));
    if (p.some((y) => !y))
      return;
    c = { [h]: p };
  }
  c && (delete a.allOf, ju(a, c));
}
function _g(a, l) {
  const s = a.seen.get(l);
  if (!s)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const c = (p) => {
    const y = a.seen.get(p);
    if (y.ref === null)
      return;
    const b = y.def ?? y.schema, S = { ...b }, g = y.ref;
    if (y.ref = null, g) {
      c(g);
      const U = a.seen.get(g), R = U.schema;
      if (R.$ref && (a.target === "draft-07" || a.target === "draft-04" || a.target === "openapi-3.0") ? (b.allOf = b.allOf ?? [], b.allOf.push(R)) : ju(b, R), ju(b, S), p._zod.parent === g)
        for (const A in b)
          A === "$ref" || A === "allOf" || A in S || delete b[A];
      if (R.$ref && U.def)
        for (const A in b)
          A === "$ref" || A === "allOf" || A in U.def && JSON.stringify(b[A]) === JSON.stringify(U.def[A]) && delete b[A];
    }
    const O = p._zod.parent;
    if (O && O !== g) {
      c(O);
      const U = a.seen.get(O);
      if (U?.schema.$ref && (b.$ref = U.schema.$ref, U.def))
        for (const R in b)
          R === "$ref" || R === "allOf" || R in U.def && JSON.stringify(b[R]) === JSON.stringify(U.def[R]) && delete b[R];
    }
    a.override({
      zodSchema: p,
      jsonSchema: b,
      path: y.path ?? []
    });
  };
  if (!a.external || a.sharedEmitDoneFor !== a.external) {
    for (const p of [...a.seen.entries()].reverse())
      c(p[0]);
    if (a.target !== "openapi-3.0")
      for (const p of a.seen.entries())
        gg(p[1].def ?? p[1].schema);
    for (const p of a.deferred)
      p();
    if (a.intersections.length) {
      const p = /* @__PURE__ */ new Map();
      for (const y of a.seen.values())
        for (const b of [y.schema, y.def]) {
          const S = b?.allOf;
          if (!Array.isArray(S))
            continue;
          const g = p.get(S);
          g ? g.push(b) : p.set(S, [b]);
        }
      for (const y of a.intersections)
        for (const b of p.get(y) ?? [])
          EO(b);
    }
  }
  const f = {};
  if (a.target === "draft-2020-12" ? f.$schema = "https://json-schema.org/draft/2020-12/schema" : a.target === "draft-07" ? f.$schema = "http://json-schema.org/draft-07/schema#" : a.target === "draft-04" ? f.$schema = "http://json-schema.org/draft-04/schema#" : a.target, a.external?.uri) {
    const p = a.external.registry.get(l)?.id;
    if (!p)
      throw new Error("Schema is missing an `id` property");
    f.$id = a.external.uri(p);
  }
  ju(f, s.defId ? s.schema : s.def ?? s.schema);
  const h = a.metadataRegistry.get(l)?.id;
  h !== void 0 && f.id === h && delete f.id;
  const m = a.external?.defs ?? {};
  if (!a.external || a.sharedEmitDoneFor !== a.external)
    for (const p of a.seen.entries()) {
      const y = p[1];
      y.def && y.defId && (y.def.id === y.defId && delete y.def.id, vi(m, y.defId, y.def));
    }
  a.external && (a.sharedEmitDoneFor = a.external), a.external || Object.keys(m).length > 0 && (a.target === "draft-2020-12" ? f.$defs = m : f.definitions = m);
  try {
    const p = JSON.parse(JSON.stringify(f));
    return Object.defineProperty(p, "~standard", {
      value: {
        ...l["~standard"],
        jsonSchema: {
          input: br(l, "input", a.processors),
          output: br(l, "output", a.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), p;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function At(a, l) {
  const s = l ?? { seen: /* @__PURE__ */ new Set() };
  if (s.seen.has(a))
    return !1;
  s.seen.add(a);
  const c = a._zod.def;
  if (c.type === "transform")
    return !0;
  if (c.type === "array")
    return At(c.element, s);
  if (c.type === "set")
    return At(c.valueType, s);
  if (c.type === "lazy")
    return At(c.getter(), s);
  if (c.type === "promise" || c.type === "optional" || c.type === "nonoptional" || c.type === "nullable" || c.type === "readonly" || c.type === "default" || c.type === "prefault" || c.type === "catch")
    return At(c.innerType, s);
  if (c.type === "intersection")
    return At(c.left, s) || At(c.right, s);
  if (c.type === "record" || c.type === "map")
    return At(c.keyType, s) || At(c.valueType, s);
  if (c.type === "pipe")
    return a._zod.traits.has("$ZodCodec") ? !0 : At(c.in, s) || At(c.out, s);
  if (c.type === "object") {
    for (const f in c.shape)
      if (At(c.shape[f], s))
        return !0;
    return !1;
  }
  if (c.type === "union") {
    for (const f of c.options)
      if (At(f, s))
        return !0;
    return !1;
  }
  if (c.type === "tuple") {
    for (const f of c.items)
      if (At(f, s))
        return !0;
    return !!(c.rest && At(c.rest, s));
  }
  return !1;
}
const TO = (a, l = {}) => (s) => {
  const c = vg({ ...s, processors: l });
  return jt(a, c), yg(c, a), _g(c, a);
}, br = (a, l, s = {}) => (c) => {
  const { libraryOptions: f, target: h } = c ?? {}, m = vg({ ...f ?? {}, target: h, io: l, processors: s });
  return jt(a, m), yg(m, a), _g(m, a);
}, vl = (a, l, s) => {
  (a[l] === void 0 || s > a[l]) && (a[l] = s);
}, yl = (a, l, s) => {
  (a[l] === void 0 || s < a[l]) && (a[l] = s);
}, oy = (a, l) => {
  vl(a, "minimum", l), yl(a, "maximum", l);
}, Sg = (a, l) => {
  a.multipleOf ?? (a.multipleOf = []), a.multipleOf.includes(l) || a.multipleOf.push(l);
}, xg = (a, l) => {
  a.patterns ?? (a.patterns = /* @__PURE__ */ new Set()), a.patterns.add(l);
}, jg = (a, l) => {
  a.mime = a.mime ? a.mime.filter((s) => l.includes(s)) : [...l];
}, Og = (a, l) => {
  a.format = l, l.includes("int") && (a.isInt = !0);
}, fy = (a, l) => vl(a, "minimum", l.minimum), dy = (a, l) => yl(a, "maximum", l.maximum), hy = (a) => (l, s) => {
  Og(l, s.format);
  const [c, f] = a[s.format];
  vl(l, "minimum", c), yl(l, "maximum", f);
}, NO = {
  greater_than: (a, l) => vl(a, l.inclusive ? "minimum" : "exclusiveMinimum", l.value),
  less_than: (a, l) => yl(a, l.inclusive ? "maximum" : "exclusiveMaximum", l.value),
  multiple_of: (a, l) => Sg(a, l.value),
  number_format: hy(Qy),
  bigint_format: hy(PS),
  min_length: fy,
  max_length: dy,
  length_equals: (a, l) => oy(a, l.length),
  min_size: fy,
  max_size: dy,
  size_equals: (a, l) => oy(a, l.size),
  string_format: (a, l) => {
    Og(a, l.format), l.pattern && xg(a, l.pattern), (l.format === "base64" || l.format === "base64url") && (a.contentEncoding = l.format), (l.local || l.precision === -1) && (a.laxFormat = !0);
  },
  mime_type: (a, l) => jg(a, l.mime)
};
function Hn(a) {
  const l = {}, s = a._zod.def, c = a._zod.traits.has("$ZodCheck") ? [a, ...s.checks ?? []] : s.checks ?? [];
  for (const h of c)
    NO[h._zod.def.check]?.(l, h._zod.def);
  const f = a._zod.bag;
  f.minimum !== void 0 && vl(l, "minimum", f.minimum), f.exclusiveMinimum !== void 0 && vl(l, "exclusiveMinimum", f.exclusiveMinimum), f.maximum !== void 0 && yl(l, "maximum", f.maximum), f.exclusiveMaximum !== void 0 && yl(l, "exclusiveMaximum", f.exclusiveMaximum), f.multipleOf !== void 0 && Sg(l, f.multipleOf), f.format !== void 0 && (l.format ?? (l.format = f.format), f.format.includes("int") && (l.isInt = !0)), f.mime && jg(l, f.mime);
  for (const h of f.patterns ?? [])
    xg(l, h);
  return l;
}
const CO = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, AO = /* @__PURE__ */ new Map([
  [ig, Wx],
  [Xf, e2]
]), wO = (a) => AO.get(a) ?? a, RO = (a, l, s, c) => {
  const f = s;
  f.type = "string";
  const { minimum: h, maximum: m, format: p, patterns: y, contentEncoding: b, laxFormat: S } = Hn(a);
  if (typeof h == "number" && (f.minLength = h), typeof m == "number" && (f.maxLength = m), p && (f.format = CO[p] ?? p, f.format === "" && delete f.format, (p === "time" || S) && delete f.format), b && (f.contentEncoding = b), y && y.size > 0) {
    const g = [...y].map(wO);
    g.length === 1 ? f.pattern = g[0].source : g.length > 1 && (f.allOf = [
      ...g.map((O) => ({
        ...l.target === "draft-07" || l.target === "draft-04" || l.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: O.source
      }))
    ]);
  }
}, MO = (a, l, s, c) => {
  const f = s, { minimum: h, maximum: m, multipleOf: p, exclusiveMaximum: y, exclusiveMinimum: b, isInt: S } = Hn(a);
  f.type = S ? "integer" : "number";
  const g = typeof b == "number" && b >= (h ?? Number.NEGATIVE_INFINITY), O = typeof y == "number" && y <= (m ?? Number.POSITIVE_INFINITY), U = l.target === "draft-04" || l.target === "openapi-3.0";
  if (g ? U ? (f.minimum = b, f.exclusiveMinimum = !0) : f.exclusiveMinimum = b : typeof h == "number" && (f.minimum = h), O ? U ? (f.maximum = y, f.exclusiveMaximum = !0) : f.exclusiveMaximum = y : typeof m == "number" && (f.maximum = m), p) {
    const R = /* @__PURE__ */ new Set();
    for (const M of p)
      Number.isFinite(M) && M !== 0 ? R.add(Math.abs(M)) : _l(a, l, f, c, `A multipleOf divisor of ${M} cannot be represented in JSON Schema`);
    const [N, ...A] = R;
    N !== void 0 && (f.multipleOf = N), A.length && (f.allOf = [...f.allOf ?? [], ...A.map((M) => ({ multipleOf: M }))]);
  }
}, DO = (a, l, s, c) => {
  s.not = {};
}, UO = (a, l, s, c) => {
}, qO = (a, l, s, c) => {
  const f = a._zod.def, h = Sf(f.entries);
  if (h.length === 0) {
    s.not = {};
    return;
  }
  h.every((m) => typeof m == "number") && (s.type = "number"), h.every((m) => typeof m == "string") && (s.type = "string"), s.enum = h;
}, ZO = (a, l, s, c) => {
  _l(a, l, s, c, "Custom types cannot be represented in JSON Schema");
}, kO = (a, l, s, c) => {
  _l(a, l, s, c, "Transforms cannot be represented in JSON Schema");
}, HO = (a, l, s, c) => {
  const f = s, h = a._zod.def, { minimum: m, maximum: p } = Hn(a);
  typeof m == "number" && (f.minItems = m), typeof p == "number" && (f.maxItems = p), f.type = "array", f.items = jt(h.element, l, {
    ...c,
    path: [...c.path, "items"]
  });
};
function Nf(a) {
  const l = a._zod.def;
  return l.type === "pipe" && l.in._zod.traits.has("$ZodTransform") ? Nf(l.out) : l.type === "catch" ? Nf(l.innerType) : a._zod.optin;
}
const BO = (a, l, s, c) => {
  const f = s, h = a._zod.def, m = h.shape;
  if (Object.getOwnPropertySymbols(m).length && _l(a, l, f, c, "Symbol keys cannot be represented in JSON Schema"))
    return;
  f.type = "object", f.properties = {};
  for (const b in m)
    vi(f.properties, b, jt(m[b], l, {
      ...c,
      path: [...c.path, "properties", b]
    }));
  const y = [];
  for (const b of Object.keys(m)) {
    const S = h.shape[b];
    (l.io === "input" ? Nf(S) === void 0 : S._zod.optout === void 0) && y.push(b);
  }
  y.length > 0 && (f.required = y), h.catchall?._zod.def.type === "never" ? f.additionalProperties = !1 : h.catchall ? h.catchall && (f.additionalProperties = jt(h.catchall, l, {
    ...c,
    path: [...c.path, "additionalProperties"]
  })) : l.io === "output" && (f.additionalProperties = !1);
}, LO = (a, l, s, c) => {
  const f = a._zod.def, h = f.inclusive === !1, m = f.options.map((p, y) => jt(p, l, {
    ...c,
    path: [...c.path, h ? "oneOf" : "anyOf", y]
  }));
  h ? s.oneOf = m : s.anyOf = m;
}, QO = (a, l, s, c) => {
  const f = a._zod.def, h = jt(f.left, l, {
    ...c,
    path: [...c.path, "allOf", 0]
  }), m = jt(f.right, l, {
    ...c,
    path: [...c.path, "allOf", 1]
  }), p = (b) => "allOf" in b && Object.keys(b).length === 1, y = [
    ...p(h) ? h.allOf : [h],
    ...p(m) ? m.allOf : [m]
  ];
  s.allOf = y, l.intersections.push(y);
}, YO = (a, l, s, c) => {
  const f = a._zod.def, h = jt(f.innerType, l, c), m = l.seen.get(a);
  l.target === "openapi-3.0" ? (m.ref = f.innerType, s.nullable = !0) : s.anyOf = [h, { type: "null" }];
}, $O = (a, l, s, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  h.ref = f.innerType;
}, Kf = /* @__PURE__ */ Symbol();
function zg(a, l, s, c, f) {
  let h = !1;
  const m = JSON.stringify(a, (p, y) => typeof y != "bigint" ? y : (h = !0, null));
  return h ? (_l(l, s, c, f, "BigInt defaults cannot be represented in JSON Schema"), Kf) : JSON.parse(m);
}
const GO = (a, l, s, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  h.ref = f.innerType;
  const m = zg(f.defaultValue, a, l, s, c);
  m !== Kf && (s.default = m);
}, VO = (a, l, s, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  if (h.ref = f.innerType, l.io !== "input")
    return;
  const m = zg(f.defaultValue, a, l, s, c);
  m !== Kf && (s._prefault = m);
}, XO = (a, l, s, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  h.ref = f.innerType;
  let m;
  try {
    m = f.catchValue(void 0);
  } catch {
    _l(a, l, s, c, "Dynamic catch values are not supported in JSON Schema");
    return;
  }
  s.default = m;
}, KO = (a, l, s, c) => {
  const f = a._zod.def, h = f.in._zod.traits.has("$ZodTransform"), m = l.io === "input" ? h ? f.out : f.in : f.out;
  jt(m, l, c);
  const p = l.seen.get(a);
  p.ref = m;
}, JO = (a, l, s, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  h.ref = f.innerType, s.readOnly = !0;
}, Eg = (a, l, s, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  h.ref = f.innerType;
}, my = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function sr(a, l, s) {
  Object.defineProperty(a, l, {
    configurable: !0,
    enumerable: !1,
    get() {
      const c = s(this);
      return Object.defineProperty(this, l, { value: c, configurable: !0, writable: !0 }), c;
    },
    set(c) {
      Object.defineProperty(this, l, { value: c, configurable: !0, writable: !0 });
    }
  });
}
const IO = (a, l) => {
  _x.init(a, l), a.name = "ZodError";
  const s = Object.getPrototypeOf(a);
  my.has(s) || (my.add(s), sr(s, "format", (c) => (f) => jx(c, f)), sr(s, "flatten", (c) => (f) => xx(c, f)), sr(s, "addIssue", (c) => (f) => {
    c.issues.push(f), c.message = JSON.stringify(c.issues, xf, 2);
  }), sr(s, "addIssues", (c) => (f) => {
    c.issues.push(...f), c.message = JSON.stringify(c.issues, xf, 2);
  }), Object.defineProperty(s, "isEmpty", {
    configurable: !0,
    enumerable: !1,
    get() {
      return this.issues.length === 0;
    }
  }));
}, yn = /* @__PURE__ */ B("ZodError", IO, void 0, {
  Parent: Error
}), FO = /* @__PURE__ */ Lf(yn), PO = /* @__PURE__ */ Qf(yn), WO = /* @__PURE__ */ Yf(yn), ez = /* @__PURE__ */ $f(yn), tz = /* @__PURE__ */ Cx(yn), nz = /* @__PURE__ */ Ax(yn), az = /* @__PURE__ */ wx(yn), iz = /* @__PURE__ */ Rx(yn), lz = /* @__PURE__ */ Mx(yn), uz = /* @__PURE__ */ Dx(yn), sz = /* @__PURE__ */ Ux(yn), rz = /* @__PURE__ */ qx(yn);
function cz() {
  Bn.localeError || Ha(Mj());
}
function Jf() {
  Bn.memoizer || Ha({ memoizer: Aj() });
}
const ut = /* @__PURE__ */ B("ZodType", (a, l) => (cz(), lt.init(a, l), a.def = l, a.type = l.type, a), {
  check(...a) {
    const l = this.def;
    return this.clone(nn(l, {
      checks: [
        ...l.checks ?? [],
        ...a.map((s) => typeof s == "function" ? { _zod: { check: s, def: { check: "custom" }, onattach: [] } } : s)
      ]
    }), { parent: !0 });
  },
  with(...a) {
    return this.check(...a);
  },
  clone(a, l) {
    return ka(this, a, l);
  },
  brand() {
    return this;
  },
  register(a, l) {
    return a.add(this, l), this;
  },
  refine(a, l) {
    return this.check(iE(a, l));
  },
  superRefine(a, l) {
    return this.check(lE(a, l));
  },
  overwrite(a) {
    return this.check(/* @__PURE__ */ bl(a));
  },
  optional() {
    return yy(this);
  },
  exactOptional() {
    return Gz(this);
  },
  nullable() {
    return gy(this);
  },
  nullish() {
    return yy(gy(this));
  },
  nonoptional(a) {
    return Fz(this, a);
  },
  array() {
    return Cf(this);
  },
  or(a) {
    return Bz([this, a]);
  },
  and(a) {
    return Qz(this, a);
  },
  transform(a) {
    return by(this, $z(a));
  },
  default(a) {
    return Kz(this, a);
  },
  prefault(a) {
    return Iz(this, a);
  },
  catch(a) {
    return Wz(this, a);
  },
  pipe(a) {
    return by(this, a);
  },
  readonly() {
    return nE(this);
  },
  describe(a) {
    const l = this.clone();
    return bu.add(l, { description: a }), l;
  },
  meta(...a) {
    if (a.length === 0)
      return bu.get(this);
    const l = this.clone();
    return bu.add(l, a[0]), l;
  },
  isOptional() {
    return this.safeParse(void 0).success;
  },
  isNullable() {
    return this.safeParse(null).success;
  },
  apply(a, ...l) {
    return l.length === 0 ? a(this) : a(this, ...l);
  },
  // Overrides core's `~standard` to add `jsonSchema`. Must stay a prototype entry: redefining it per instance demotes instances to dictionary mode.
  get "~standard"() {
    return Gy(this, "~standard", {
      ...Wy(this),
      jsonSchema: {
        input: br(this, "input"),
        output: br(this, "output")
      }
    });
  },
  set "~standard"(a) {
    Za(this, "~standard", a);
  },
  parse: function a(l, s) {
    return FO(this, l, s, { callee: a });
  },
  parseAsync: async function a(l, s) {
    return await PO(this, l, s, { callee: a });
  },
  safeParse(a, l) {
    return WO(this, a, l);
  },
  async safeParseAsync(a, l) {
    return ez(this, a, l);
  },
  // `spa` is an alias: same function object as `safeParseAsync`, as before.
  get spa() {
    return this?.safeParseAsync;
  },
  set spa(a) {
    Za(this, "spa", a);
  },
  validate(a, l) {
    return Ex(this, a, l);
  },
  validateAsync(a, l) {
    return Nx(this, a, l);
  },
  encode: function a(l, s) {
    return tz(this, l, s, { callee: a });
  },
  decode: function a(l, s) {
    return nz(this, l, s, { callee: a });
  },
  encodeAsync: async function a(l, s) {
    return await az(this, l, s, { callee: a });
  },
  decodeAsync: async function a(l, s) {
    return await iz(this, l, s, { callee: a });
  },
  safeEncode(a, l) {
    return lz(this, a, l);
  },
  safeDecode(a, l) {
    return uz(this, a, l);
  },
  async safeEncodeAsync(a, l) {
    return sz(this, a, l);
  },
  async safeDecodeAsync(a, l) {
    return rz(this, a, l);
  },
  toJSONSchema(a) {
    return TO(this, {})(a);
  },
  // Reads through to the registry on every access, so it must not cache.
  get description() {
    return bu.get(this)?.description;
  },
  // No setter: `schema._def = x` throws, as it did when `_def` was a non-writable own property.
  get _def() {
    return this._zod.def;
  }
}), Tg = /* @__PURE__ */ B(
  "_ZodString",
  (a, l) => {
    Vf.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => RO(a, s, c);
  },
  /* @__PURE__ */ Vy({
    format: (a) => Hn(a).format ?? null,
    minLength: (a) => Hn(a).minimum ?? null,
    maxLength: (a) => Hn(a).maximum ?? null
  }, {
    regex(...a) {
      return this.check(/* @__PURE__ */ fO(...a));
    },
    includes(...a) {
      return this.check(/* @__PURE__ */ mO(...a));
    },
    startsWith(...a) {
      return this.check(/* @__PURE__ */ pO(...a));
    },
    endsWith(...a) {
      return this.check(/* @__PURE__ */ vO(...a));
    },
    min(...a) {
      return this.check(/* @__PURE__ */ gr(...a));
    },
    max(...a) {
      return this.check(/* @__PURE__ */ mg(...a));
    },
    length(...a) {
      return this.check(/* @__PURE__ */ pg(...a));
    },
    nonempty(...a) {
      return this.check(/* @__PURE__ */ gr(1, ...a));
    },
    lowercase(a) {
      return this.check(/* @__PURE__ */ dO(a));
    },
    uppercase(a) {
      return this.check(/* @__PURE__ */ hO(a));
    },
    trim() {
      return this.check(/* @__PURE__ */ gO());
    },
    normalize(...a) {
      return this.check(/* @__PURE__ */ yO(...a));
    },
    toLowerCase() {
      return this.check(/* @__PURE__ */ bO());
    },
    toUpperCase() {
      return this.check(/* @__PURE__ */ _O());
    },
    slugify() {
      return this.check(/* @__PURE__ */ SO());
    }
  })
), oz = /* @__PURE__ */ B("ZodString", (a, l) => {
  Vf.init(a, l), Tg.init(a, l);
}, {
  email(a) {
    return this.check(/* @__PURE__ */ dg(Ng, a));
  },
  url(a) {
    return this.check(/* @__PURE__ */ Lj(gz, a));
  },
  jwt(a) {
    return this.check(/* @__PURE__ */ nO(Mz, a));
  },
  emoji(a) {
    return this.check(/* @__PURE__ */ Qj(bz, a));
  },
  guid(a) {
    return this.check(/* @__PURE__ */ Zj(vz, a));
  },
  uuid(a) {
    return this.check(/* @__PURE__ */ hg(_u, a));
  },
  uuidv4(a) {
    return this.check(/* @__PURE__ */ kj(_u, a));
  },
  uuidv6(a) {
    return this.check(/* @__PURE__ */ Hj(_u, a));
  },
  uuidv7(a) {
    return this.check(/* @__PURE__ */ Bj(_u, a));
  },
  nanoid(a) {
    return this.check(/* @__PURE__ */ Yj(_z, a));
  },
  cuid(a) {
    return this.check(/* @__PURE__ */ $j(Sz, a));
  },
  cuid2(a) {
    return this.check(/* @__PURE__ */ Gj(xz, a));
  },
  ulid(a) {
    return this.check(/* @__PURE__ */ Vj(jz, a));
  },
  base64(a) {
    return this.check(/* @__PURE__ */ Wj(Az, a));
  },
  base64url(a) {
    return this.check(/* @__PURE__ */ eO(wz, a));
  },
  xid(a) {
    return this.check(/* @__PURE__ */ Xj(Oz, a));
  },
  ksuid(a) {
    return this.check(/* @__PURE__ */ Kj(zz, a));
  },
  ipv4(a) {
    return this.check(/* @__PURE__ */ Jj(Ez, a));
  },
  ipv6(a) {
    return this.check(/* @__PURE__ */ Ij(Tz, a));
  },
  cidrv4(a) {
    return this.check(/* @__PURE__ */ Fj(Nz, a));
  },
  cidrv6(a) {
    return this.check(/* @__PURE__ */ Pj(Cz, a));
  },
  e164(a) {
    return this.check(/* @__PURE__ */ tO(Rz, a));
  },
  datetime(a) {
    return this.check(/* @__PURE__ */ aO(fz, a));
  },
  date(a) {
    return this.check(/* @__PURE__ */ iO(dz, a));
  },
  time(a) {
    return this.check(/* @__PURE__ */ lO(hz, a));
  },
  duration(a) {
    return this.check(/* @__PURE__ */ uO(mz, a));
  }
});
function ol(a) {
  return /* @__PURE__ */ qj(oz, a);
}
const Fe = /* @__PURE__ */ B("ZodStringFormat", (a, l) => {
  Ge.init(a, l), Tg.init(a, l);
}), fz = /* @__PURE__ */ B("ZodISODateTime", (a, l) => {
  Q2.init(a, l), Fe.init(a, l);
}), dz = /* @__PURE__ */ B("ZodISODate", (a, l) => {
  Y2.init(a, l), Fe.init(a, l);
}), hz = /* @__PURE__ */ B("ZodISOTime", (a, l) => {
  $2.init(a, l), Fe.init(a, l);
}), mz = /* @__PURE__ */ B("ZodISODuration", (a, l) => {
  G2.init(a, l), Fe.init(a, l);
}), Ng = /* @__PURE__ */ B("ZodEmail", (a, l) => {
  N2.init(a, l), Fe.init(a, l);
});
function pz(a) {
  return /* @__PURE__ */ dg(Ng, a);
}
const vz = /* @__PURE__ */ B("ZodGUID", (a, l) => {
  E2.init(a, l), Fe.init(a, l);
}), _u = /* @__PURE__ */ B("ZodUUID", (a, l) => {
  T2.init(a, l), Fe.init(a, l);
});
function yz(a) {
  return /* @__PURE__ */ hg(_u, a);
}
const gz = /* @__PURE__ */ B("ZodURL", (a, l) => {
  D2.init(a, l), Fe.init(a, l);
}), bz = /* @__PURE__ */ B("ZodEmoji", (a, l) => {
  U2.init(a, l), Fe.init(a, l);
}), _z = /* @__PURE__ */ B("ZodNanoID", (a, l) => {
  q2.init(a, l), Fe.init(a, l);
}), Sz = /* @__PURE__ */ B("ZodCUID", (a, l) => {
  Z2.init(a, l), Fe.init(a, l);
}), xz = /* @__PURE__ */ B("ZodCUID2", (a, l) => {
  k2.init(a, l), Fe.init(a, l);
}), jz = /* @__PURE__ */ B("ZodULID", (a, l) => {
  H2.init(a, l), Fe.init(a, l);
}), Oz = /* @__PURE__ */ B("ZodXID", (a, l) => {
  B2.init(a, l), Fe.init(a, l);
}), zz = /* @__PURE__ */ B("ZodKSUID", (a, l) => {
  L2.init(a, l), Fe.init(a, l);
}), Ez = /* @__PURE__ */ B("ZodIPv4", (a, l) => {
  V2.init(a, l), Fe.init(a, l);
}), Tz = /* @__PURE__ */ B("ZodIPv6", (a, l) => {
  K2.init(a, l), Fe.init(a, l);
}), Nz = /* @__PURE__ */ B("ZodCIDRv4", (a, l) => {
  J2.init(a, l), Fe.init(a, l);
}), Cz = /* @__PURE__ */ B("ZodCIDRv6", (a, l) => {
  F2.init(a, l), Fe.init(a, l);
}), Az = /* @__PURE__ */ B("ZodBase64", (a, l) => {
  P2.init(a, l), Fe.init(a, l);
}), wz = /* @__PURE__ */ B("ZodBase64URL", (a, l) => {
  ej.init(a, l), Fe.init(a, l);
}), Rz = /* @__PURE__ */ B("ZodE164", (a, l) => {
  tj.init(a, l), Fe.init(a, l);
}), Mz = /* @__PURE__ */ B("ZodJWT", (a, l) => {
  aj.init(a, l), Fe.init(a, l);
}), Cg = /* @__PURE__ */ B(
  "ZodNumber",
  (a, l) => {
    lg.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => MO(a, s, c, f), a.isFinite = !0;
  },
  /* @__PURE__ */ Vy({
    minValue: (a) => {
      const { minimum: l, exclusiveMinimum: s } = Hn(a);
      return Math.max(l ?? Number.NEGATIVE_INFINITY, s ?? Number.NEGATIVE_INFINITY);
    },
    maxValue: (a) => {
      const { maximum: l, exclusiveMaximum: s } = Hn(a);
      return Math.min(l ?? Number.POSITIVE_INFINITY, s ?? Number.POSITIVE_INFINITY);
    },
    isInt: (a) => {
      const { isInt: l, multipleOf: s } = Hn(a);
      return !!l || !!s?.some(Number.isSafeInteger);
    },
    format: (a) => Hn(a).format ?? null
  }, {
    gt(a, l) {
      return this.check(/* @__PURE__ */ ly(a, l));
    },
    gte(a, l) {
      return this.check(/* @__PURE__ */ mf(a, l));
    },
    min(a, l) {
      return this.check(/* @__PURE__ */ mf(a, l));
    },
    lt(a, l) {
      return this.check(/* @__PURE__ */ iy(a, l));
    },
    lte(a, l) {
      return this.check(/* @__PURE__ */ hf(a, l));
    },
    max(a, l) {
      return this.check(/* @__PURE__ */ hf(a, l));
    },
    int(a) {
      return this.check(py(a));
    },
    safe(a) {
      return this.check(py(a));
    },
    positive(a) {
      return this.check(/* @__PURE__ */ ly(0, a));
    },
    nonnegative(a) {
      return this.check(/* @__PURE__ */ mf(0, a));
    },
    negative(a) {
      return this.check(/* @__PURE__ */ iy(0, a));
    },
    nonpositive(a) {
      return this.check(/* @__PURE__ */ hf(0, a));
    },
    multipleOf(a, l) {
      return this.check(/* @__PURE__ */ uy(a, l));
    },
    step(a, l) {
      return this.check(/* @__PURE__ */ uy(a, l));
    },
    finite() {
      return this;
    }
  })
);
function Su(a) {
  return /* @__PURE__ */ sO(Cg, a);
}
const Dz = /* @__PURE__ */ B("ZodNumberFormat", (a, l) => {
  ij.init(a, l), Cg.init(a, l);
});
function py(a) {
  return /* @__PURE__ */ rO(Dz, a);
}
const Uz = /* @__PURE__ */ B("ZodUnknown", (a, l) => {
  lj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => UO();
});
function vy() {
  return /* @__PURE__ */ cO(Uz);
}
const qz = /* @__PURE__ */ B("ZodNever", (a, l) => {
  uj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => DO(a, s, c);
});
function Ag(a) {
  return /* @__PURE__ */ oO(qz, a);
}
const Zz = /* @__PURE__ */ B("ZodArray", (a, l) => {
  Jf(), cj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => HO(a, s, c, f), a.element = l.element;
}, {
  min(a, l) {
    return this.check(/* @__PURE__ */ gr(a, l));
  },
  nonempty(a) {
    return this.check(/* @__PURE__ */ gr(1, a));
  },
  max(a, l) {
    return this.check(/* @__PURE__ */ mg(a, l));
  },
  length(a, l) {
    return this.check(/* @__PURE__ */ pg(a, l));
  },
  unwrap() {
    return this.element;
  }
});
function Cf(a, l) {
  return /* @__PURE__ */ xO(Zz, a, l);
}
const kz = /* @__PURE__ */ B("ZodObject", (a, l) => {
  Jf(), dj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => BO(a, s, c, f), dx(a, "shape", (s) => s._zod.def.shape, !1);
}, {
  keyof() {
    return wg(Object.keys(this._zod.def.shape));
  },
  catchall(a) {
    return this.clone(nn(this._zod.def, { catchall: a }));
  },
  passthrough() {
    return this.clone(nn(this._zod.def, { catchall: vy() }));
  },
  loose() {
    return this.clone(nn(this._zod.def, { catchall: vy() }));
  },
  strict() {
    return this.clone(nn(this._zod.def, { catchall: Ag() }));
  },
  strip() {
    return this.clone(nn(this._zod.def, { catchall: void 0 }));
  },
  extend(a) {
    return tx(this, a);
  },
  safeExtend(a) {
    return nx(this, a);
  },
  merge(a) {
    return ax(this, a);
  },
  pick(a) {
    return WS(this, a);
  },
  omit(a) {
    return ex(this, a);
  },
  partial(...a) {
    return Bv(Rg, this, a[0]);
  },
  exactPartial(...a) {
    return Bv(Mg, this, a[0], "exactPartial");
  },
  required(...a) {
    return ix(Dg, this, a[0]);
  }
});
function rr(a, l) {
  return new kz({
    type: "object",
    shape: a,
    catchall: Ag(),
    ...ie(l)
  });
}
const Hz = /* @__PURE__ */ B("ZodUnion", (a, l) => {
  hj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => LO(a, s, c, f), a.options = l.options;
});
function Bz(a, l) {
  return new Hz({
    type: "union",
    options: a,
    ...ie(l)
  });
}
const Lz = /* @__PURE__ */ B("ZodIntersection", (a, l) => {
  mj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => QO(a, s, c, f);
});
function Qz(a, l) {
  return new Lz({
    type: "intersection",
    left: a,
    right: l
  });
}
const Af = /* @__PURE__ */ B("ZodEnum", (a, l) => {
  pj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (c, f, h) => qO(a, c, f), a.enum = l.entries, a.options = [...a._zod.values];
  const s = new Set(Object.keys(l.entries));
  a.extract = (c, f) => {
    const h = {};
    for (const m of c)
      if (s.has(m))
        h[m] = l.entries[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new Af({
      ...l,
      checks: [],
      ...ie(f),
      entries: h
    });
  }, a.exclude = (c, f) => {
    const h = { ...l.entries };
    for (const m of c)
      if (s.has(m))
        delete h[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new Af({
      ...l,
      checks: [],
      ...ie(f),
      entries: h
    });
  };
});
function wg(a, l) {
  const s = Array.isArray(a) ? Object.fromEntries(a.map((c) => [c, c])) : a;
  return new Af({
    type: "enum",
    entries: s,
    ...ie(l)
  });
}
const Yz = /* @__PURE__ */ B("ZodTransform", (a, l) => {
  Jf(), vj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => kO(a, s, c, f), a._zod.parse = (s, c) => {
    if (c.direction === "backward")
      throw new Xy(a.constructor.name);
    s.addIssue = (h) => {
      if (typeof h == "string")
        s.issues.push(Tu(h, s.value, l));
      else {
        const m = h;
        m.fatal && (m.continue = !1), m.code ?? (m.code = "custom"), "input" in m || (m.input = s.value), m.inst ?? (m.inst = a), s.issues.push(Tu(m));
      }
    };
    const f = l.transform(s.value, s);
    return f instanceof Promise ? f.then((h) => (s.value = h, s)) : (s.value = f, s);
  };
});
function $z(a) {
  return new Yz({
    type: "transform",
    transform: a
  });
}
const Rg = /* @__PURE__ */ B("ZodOptional", (a, l) => {
  rg.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => Eg(a, s, c, f), a.unwrap = () => a._zod.def.innerType;
});
function yy(a) {
  return new Rg({
    type: "optional",
    innerType: a
  });
}
const Mg = /* @__PURE__ */ B("ZodExactOptional", (a, l) => {
  yj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => Eg(a, s, c, f), a.unwrap = () => a._zod.def.innerType;
});
function Gz(a) {
  return new Mg({
    type: "optional",
    innerType: a
  });
}
const Vz = /* @__PURE__ */ B("ZodNullable", (a, l) => {
  gj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => YO(a, s, c, f), a.unwrap = () => a._zod.def.innerType;
});
function gy(a) {
  return new Vz({
    type: "nullable",
    innerType: a
  });
}
const Xz = /* @__PURE__ */ B("ZodDefault", (a, l) => {
  bj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => GO(a, s, c, f), a.unwrap = () => a._zod.def.innerType, a.removeDefault = a.unwrap;
});
function Kz(a, l) {
  return new Xz({
    type: "default",
    innerType: a,
    get defaultValue() {
      return typeof l == "function" ? l() : By(l);
    }
  });
}
const Jz = /* @__PURE__ */ B("ZodPrefault", (a, l) => {
  _j.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => VO(a, s, c, f), a.unwrap = () => a._zod.def.innerType;
});
function Iz(a, l) {
  return new Jz({
    type: "prefault",
    innerType: a,
    get defaultValue() {
      return typeof l == "function" ? l() : By(l);
    }
  });
}
const Dg = /* @__PURE__ */ B("ZodNonOptional", (a, l) => {
  Sj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => $O(a, s, c, f), a.unwrap = () => a._zod.def.innerType;
});
function Fz(a, l) {
  return new Dg({
    type: "nonoptional",
    innerType: a,
    ...ie(l)
  });
}
const Pz = /* @__PURE__ */ B("ZodCatch", (a, l) => {
  xj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => XO(a, s, c, f), a.unwrap = () => a._zod.def.innerType, a.removeCatch = a.unwrap;
});
function Wz(a, l) {
  return new Pz({
    type: "catch",
    innerType: a,
    catchValue: typeof l == "function" ? l : mx(l)
  });
}
const eE = /* @__PURE__ */ B("ZodPipe", (a, l) => {
  jj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => KO(a, s, c, f), a.in = l.in, a.out = l.out;
});
function by(a, l) {
  return new eE({
    type: "pipe",
    in: a,
    out: l
    // ...util.normalizeParams(params),
  });
}
const tE = /* @__PURE__ */ B("ZodReadonly", (a, l) => {
  Oj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => JO(a, s, c, f), a.unwrap = () => a._zod.def.innerType;
});
function nE(a) {
  return new tE({
    type: "readonly",
    innerType: a
  });
}
const aE = /* @__PURE__ */ B("ZodCustom", (a, l) => {
  zj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (s, c, f) => ZO(a, s, c, f);
});
function iE(a, l = {}) {
  return /* @__PURE__ */ jO(aE, a, l);
}
function lE(a, l) {
  return /* @__PURE__ */ OO(a, l);
}
const aa = Su().int().min(0).max(1e12), uE = rr({
  client_sale_id: yz(),
  register_id: Su().int().positive(),
  shift_id: Su().int().positive(),
  currency: ol().regex(/^[A-Z]{3}$/),
  grand_total_minor: aa.refine((a) => a > 0),
  customer: rr({
    name: ol().min(1).max(150),
    email: pz().max(200).optional(),
    phone: ol().max(30).optional()
  }).optional(),
  lines: Cf(
    rr({
      stock_id: Su().int().positive(),
      quantity: Su().int().min(1).max(1e4),
      discount_minor: aa,
      unit_price_minor: aa,
      tax_minor: aa,
      total_minor: aa,
      override_minor: aa.optional(),
      override_reason: ol().min(3).max(500).optional()
    })
  ).min(1).max(200),
  tenders: Cf(
    rr({
      method: wg(["cash", "external_terminal", "bank_transfer"]),
      currency: ol().length(3),
      amount_minor: aa.refine((a) => a > 0),
      received_minor: aa.optional(),
      change_minor: aa.optional(),
      reference: ol().max(100).optional()
    })
  ).min(1).max(10)
});
function vn({
  title: a,
  children: l,
  onClose: s,
  wide: c = !1
}) {
  const f = H.useRef(null);
  return H.useEffect(() => {
    f.current?.showModal();
    const h = f.current;
    return () => h?.close();
  }, []), /* @__PURE__ */ o.jsxs(
    "dialog",
    {
      className: `rp-modal ${c ? "rp-modal-wide" : ""}`,
      ref: f,
      onCancel: (h) => {
        h.preventDefault(), s();
      },
      children: [
        /* @__PURE__ */ o.jsxs("header", { children: [
          /* @__PURE__ */ o.jsx("h2", { children: a }),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              className: "icon-button",
              "aria-label": "Close dialog",
              onClick: s,
              children: /* @__PURE__ */ o.jsx(Sr, { size: 20 })
            }
          )
        ] }),
        l
      ]
    }
  );
}
function la({
  title: a,
  text: l,
  icon: s
}) {
  return /* @__PURE__ */ o.jsxs("div", { className: "empty-state", children: [
    s,
    /* @__PURE__ */ o.jsx("h3", { children: a }),
    /* @__PURE__ */ o.jsx("p", { children: l })
  ] });
}
function yi() {
  return /* @__PURE__ */ o.jsxs("div", { className: "loading-state", role: "status", children: [
    /* @__PURE__ */ o.jsx(W_, { className: "spin", size: 24 }),
    " Loading your workspace"
  ] });
}
function Ie({
  children: a,
  tone: l = ""
}) {
  return /* @__PURE__ */ o.jsx("span", { className: `badge ${l}`, children: a });
}
function He({
  label: a,
  children: l
}) {
  return /* @__PURE__ */ o.jsxs("label", { className: "field", children: [
    /* @__PURE__ */ o.jsx("span", { children: a }),
    l
  ] });
}
var sE = _y();
function rE({
  receipt: a,
  duplicate: l,
  width: s,
  footer: c
}) {
  const f = (h) => ct(h, a.currency);
  return sE.createPortal(
    /* @__PURE__ */ o.jsxs("article", { id: "rewa-pos-receipt", className: `receipt receipt-${s}`, children: [
      /* @__PURE__ */ o.jsx("style", { children: `@media print { @page { size: ${s === "a4" ? "A4" : "auto"}; margin: ${s === "a4" ? "12mm" : "2mm"}; } }` }),
      /* @__PURE__ */ o.jsxs("header", { children: [
        a.store.logo_url && /* @__PURE__ */ o.jsx("img", { className: "receipt-logo", src: a.store.logo_url, alt: "Store logo" }),
        /* @__PURE__ */ o.jsx("h2", { children: a.store.name }),
        a.store.address && /* @__PURE__ */ o.jsx("p", { children: a.store.address }),
        a.store.phone && /* @__PURE__ */ o.jsx("p", { children: a.store.phone }),
        a.store.email && /* @__PURE__ */ o.jsx("p", { children: a.store.email }),
        a.store.tax_details && /* @__PURE__ */ o.jsx("p", { children: a.store.tax_details }),
        /* @__PURE__ */ o.jsxs("p", { children: [
          "Retail receipt ",
          l && "• DUPLICATE"
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("p", { children: [
        a.number,
        /* @__PURE__ */ o.jsx("br", {}),
        new Date(a.occurred_at).toLocaleString(),
        /* @__PURE__ */ o.jsx("br", {}),
        "Register ",
        a.register,
        " · ",
        a.cashier,
        /* @__PURE__ */ o.jsx("br", {}),
        "Order ",
        a.order_code || a.order_id
      ] }),
      a.customer?.name && /* @__PURE__ */ o.jsxs("p", { children: [
        a.customer.name,
        a.customer.phone && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsx("br", {}),
          a.customer.phone
        ] })
      ] }),
      /* @__PURE__ */ o.jsx("div", { className: "receipt-rule" }),
      a.lines.map((h, m) => /* @__PURE__ */ o.jsxs("div", { className: "receipt-line", children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsx("strong", { children: h.name || h.snapshot?.name }),
          (h.variant || h.snapshot?.variant) && /* @__PURE__ */ o.jsx("small", { children: h.variant || h.snapshot?.variant }),
          /* @__PURE__ */ o.jsxs("small", { children: [
            h.quantity,
            " ×",
            " ",
            f(h.subtotal_minor / h.quantity)
          ] })
        ] }),
        /* @__PURE__ */ o.jsx("b", { children: f(h.total_minor) })
      ] }, m)),
      /* @__PURE__ */ o.jsx("div", { className: "receipt-rule" }),
      /* @__PURE__ */ o.jsxs("div", { className: "receipt-line", children: [
        /* @__PURE__ */ o.jsx("span", { children: "Subtotal" }),
        /* @__PURE__ */ o.jsx("span", { children: f(a.subtotal_minor) })
      ] }),
      a.discount_minor > 0 && /* @__PURE__ */ o.jsxs("div", { className: "receipt-line", children: [
        /* @__PURE__ */ o.jsx("span", { children: "Discount" }),
        /* @__PURE__ */ o.jsxs("span", { children: [
          "-",
          f(a.discount_minor)
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "receipt-line", children: [
        /* @__PURE__ */ o.jsx("span", { children: "Tax" }),
        /* @__PURE__ */ o.jsx("span", { children: f(a.tax_minor) })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "receipt-line receipt-total", children: [
        /* @__PURE__ */ o.jsx("strong", { children: "TOTAL" }),
        /* @__PURE__ */ o.jsx("strong", { children: f(a.total_minor) })
      ] }),
      a.tenders.map((h, m) => /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsxs("div", { className: "receipt-line", children: [
          /* @__PURE__ */ o.jsxs("span", { children: [
            h.method.replaceAll("_", " "),
            " (",
            h.status,
            ")"
          ] }),
          /* @__PURE__ */ o.jsx("span", { children: f(h.amount_minor) })
        ] }),
        h.method === "cash" && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsxs("div", { className: "receipt-line", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Cash received" }),
            /* @__PURE__ */ o.jsx("span", { children: f(h.received_minor) })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "receipt-line", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Change" }),
            /* @__PURE__ */ o.jsx("span", { children: f(h.change_minor) })
          ] })
        ] })
      ] }, m)),
      /* @__PURE__ */ o.jsxs("p", { className: "receipt-status", children: [
        "Payment ",
        a.payment_status
      ] }),
      /* @__PURE__ */ o.jsx("footer", { children: a.store.footer ?? (c || "Thank you for shopping with us.") })
    ] }),
    document.body
  );
}
function cE(a) {
  return a.tab === "sales" ? /* @__PURE__ */ o.jsx(oE, { ...a }) : a.tab === "register" ? /* @__PURE__ */ o.jsx(mE, { ...a }) : a.tab === "reports" ? /* @__PURE__ */ o.jsx(pE, { ...a }) : a.tab === "products" ? /* @__PURE__ */ o.jsx(vE, { ...a }) : /* @__PURE__ */ o.jsx(yE, { ...a });
}
function gi(a) {
  const [l, s] = H.useState(!1), c = _r(), f = H.useRef(!1), [h, m] = H.useState(hi());
  return { busy: l, run: async (y, b, S) => {
    if (!f.current) {
      f.current = !0, s(!0);
      try {
        const g = await y(h);
        m(hi()), a.onSuccess(b), c.invalidateQueries(), S?.(g);
      } catch (g) {
        a.onError(g);
      } finally {
        f.current = !1, s(!1);
      }
    }
  } };
}
function Ug({
  from: a,
  to: l,
  setFrom: s,
  setTo: c
}) {
  return /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsx(He, { label: "From", children: /* @__PURE__ */ o.jsx(
      "input",
      {
        type: "date",
        value: a,
        onChange: (f) => s(f.target.value)
      }
    ) }),
    /* @__PURE__ */ o.jsx(He, { label: "To", children: /* @__PURE__ */ o.jsx(
      "input",
      {
        type: "date",
        value: l,
        onChange: (f) => c(f.target.value)
      }
    ) })
  ] });
}
function qg(a, l) {
  return {
    from: a ? (/* @__PURE__ */ new Date(`${a}T00:00:00`)).toISOString() : null,
    to: l ? (/* @__PURE__ */ new Date(`${l}T23:59:59.999`)).toISOString() : null
  };
}
function Zg(a) {
  const l = /(?:Z|[+-]\d{2}:\d{2})$/i.test(a) ? a : a.replace(" ", "T") + "Z";
  return new Date(l).toLocaleString();
}
function oE(a) {
  const { api: l, boot: s, onError: c, onReceipt: f, can: h } = a, [m, p] = H.useState(1), [y, b] = H.useState(""), [S, g] = H.useState(""), [O, U] = H.useState(null), R = an({
    queryKey: ["sales", l.registerId, m, y, S],
    queryFn: ({ signal: N }) => l.request(
      `sales?${zu({ ...qg(y, S), page: m })}`,
      { signal: N }
    )
  });
  return /* @__PURE__ */ o.jsxs("section", { className: "operations", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("h2", { children: "Every sale, one record" }),
        /* @__PURE__ */ o.jsx("p", { children: "Review receipts, verify payments and handle returns." })
      ] }),
      /* @__PURE__ */ o.jsxs("button", { className: "secondary", onClick: () => R.refetch(), children: [
        /* @__PURE__ */ o.jsx(pS, { size: 16 }),
        " Refresh"
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "toolbar", children: [
      /* @__PURE__ */ o.jsx(
        Ug,
        {
          from: y,
          to: S,
          setFrom: (N) => {
            b(N), p(1);
          },
          setTo: (N) => {
            g(N), p(1);
          }
        }
      ),
      /* @__PURE__ */ o.jsxs("span", { className: "hint", children: [
        "Selected register · ",
        R.data?.total || 0,
        " sales"
      ] })
    ] }),
    R.isPending ? /* @__PURE__ */ o.jsx(yi, {}) : R.error ? /* @__PURE__ */ o.jsx(la, { title: "Sales unavailable", text: R.error.message }) : R.data?.data.length ? /* @__PURE__ */ o.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ o.jsxs("table", { children: [
      /* @__PURE__ */ o.jsx("thead", { children: /* @__PURE__ */ o.jsxs("tr", { children: [
        /* @__PURE__ */ o.jsx("th", { children: "Sale / order" }),
        /* @__PURE__ */ o.jsx("th", { children: "Date" }),
        /* @__PURE__ */ o.jsx("th", { children: "Source" }),
        /* @__PURE__ */ o.jsx("th", { children: "Status" }),
        /* @__PURE__ */ o.jsx("th", { children: "Payment" }),
        /* @__PURE__ */ o.jsx("th", { className: "numeric", children: "Total" }),
        /* @__PURE__ */ o.jsx("th", {})
      ] }) }),
      /* @__PURE__ */ o.jsx("tbody", { children: R.data.data.map((N) => /* @__PURE__ */ o.jsxs("tr", { children: [
        /* @__PURE__ */ o.jsxs("td", { children: [
          /* @__PURE__ */ o.jsxs("strong", { children: [
            "#",
            N.id
          ] }),
          /* @__PURE__ */ o.jsxs("small", { children: [
            "Order #",
            N.order_id
          ] })
        ] }),
        /* @__PURE__ */ o.jsx("td", { children: Zg(N.occurred_at) }),
        /* @__PURE__ */ o.jsx("td", { children: N.source }),
        /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx(Ie, { children: N.status.replaceAll("_", " ") }) }),
        /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx(
          Ie,
          {
            tone: N.payment_status === "settled" ? "green" : "amber",
            children: N.payment_status
          }
        ) }),
        /* @__PURE__ */ o.jsx("td", { className: "numeric", children: /* @__PURE__ */ o.jsx("b", { children: ct(
          N.total_minor,
          s.currency
        ) }) }),
        /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "text-button",
            onClick: () => U(N.id),
            children: "View sale"
          }
        ) })
      ] }, N.id)) })
    ] }) }) : /* @__PURE__ */ o.jsx(
      la,
      {
        title: "No sales yet",
        text: "Recorded sales for this register appear here."
      }
    ),
    R.data && R.data.last_page > 1 && /* @__PURE__ */ o.jsxs("div", { className: "pagination", children: [
      /* @__PURE__ */ o.jsx(
        "button",
        {
          disabled: m === 1,
          onClick: () => p(m - 1),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ o.jsxs("span", { children: [
        "Page ",
        m,
        " of ",
        R.data.last_page
      ] }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          disabled: m === R.data.last_page,
          onClick: () => p(m + 1),
          children: "Next"
        }
      )
    ] }),
    O && /* @__PURE__ */ o.jsx(
      fE,
      {
        ...a,
        id: O,
        onClose: () => U(null),
        onReceipt: f,
        onError: c,
        can: h
      }
    )
  ] });
}
function fE(a) {
  const { api: l, id: s, boot: c, can: f, onClose: h, onReceipt: m, onError: p } = a, y = an({
    queryKey: ["sale", l.registerId, s],
    queryFn: () => l.request(`sales/${s}`)
  }), b = gi(a), [S, g] = H.useState(!1), [O, U] = H.useState(null), R = (M) => ct(M, c.currency), N = () => {
    const M = prompt("Reason for duplicate receipt");
    M && b.run(
      (Y) => l.mutate(
        `receipts/${y.data.receipt_id}/reprint`,
        { reason: M },
        "POST",
        !1,
        Y
      ),
      "Duplicate receipt audited.",
      (Y) => m(y.data.receipt_id, !0, Y.receipt).catch(
        p
      )
    );
  }, A = () => {
    const M = prompt("Reason for voiding this unsettled sale");
    M && b.run(
      (Y) => l.mutate(
        `sales/${s}/void`,
        { reason: M },
        "POST",
        !1,
        Y
      ),
      "Sale voided with compensating stock movements."
    );
  };
  return /* @__PURE__ */ o.jsx(vn, { title: `Sale #${s}`, onClose: h, wide: !0, children: y.isPending ? /* @__PURE__ */ o.jsx(yi, {}) : y.error ? /* @__PURE__ */ o.jsx("p", { className: "error-text", children: y.error.message }) : y.data && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "sale-detail-heading", children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("strong", { children: R(y.data.sale.total_minor) }),
        /* @__PURE__ */ o.jsxs("p", { children: [
          "Order #",
          y.data.sale.order_id,
          " ·",
          " ",
          y.data.sale.source
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx(Ie, { children: y.data.sale.status }),
        " ",
        /* @__PURE__ */ o.jsx(
          Ie,
          {
            tone: y.data.sale.payment_status === "settled" ? "green" : "amber",
            children: y.data.sale.payment_status
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ o.jsxs("table", { children: [
      /* @__PURE__ */ o.jsx("thead", { children: /* @__PURE__ */ o.jsxs("tr", { children: [
        /* @__PURE__ */ o.jsx("th", { children: "Item" }),
        /* @__PURE__ */ o.jsx("th", { children: "Sold / returned" }),
        /* @__PURE__ */ o.jsx("th", { className: "numeric", children: "Total" })
      ] }) }),
      /* @__PURE__ */ o.jsx("tbody", { children: y.data.lines.map((M) => /* @__PURE__ */ o.jsxs("tr", { children: [
        /* @__PURE__ */ o.jsxs("td", { children: [
          /* @__PURE__ */ o.jsx("strong", { children: M.snapshot.name }),
          /* @__PURE__ */ o.jsx("small", { children: M.snapshot.variant || M.snapshot.sku })
        ] }),
        /* @__PURE__ */ o.jsxs("td", { children: [
          M.quantity,
          " /",
          " ",
          M.returned_quantity
        ] }),
        /* @__PURE__ */ o.jsx("td", { className: "numeric", children: R(M.total_minor) })
      ] }, M.id)) })
    ] }) }),
    /* @__PURE__ */ o.jsx("h3", { className: "subheading", children: "Tenders" }),
    /* @__PURE__ */ o.jsx("div", { className: "record-list", children: y.data.tenders.map((M) => /* @__PURE__ */ o.jsxs("div", { children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("strong", { children: M.method.replaceAll("_", " ") }),
        /* @__PURE__ */ o.jsx("small", { children: M.reference || "Cash in register" })
      ] }),
      /* @__PURE__ */ o.jsx("b", { children: R(M.amount_minor) }),
      /* @__PURE__ */ o.jsx(
        Ie,
        {
          tone: M.status === "pending" ? "amber" : "green",
          children: M.status
        }
      ),
      M.status === "pending" && f("payment:verify") && y.data.sale.status !== "voided" && /* @__PURE__ */ o.jsx(
        "button",
        {
          className: "text-button",
          onClick: () => U({
            kind: "tenders",
            id: M.id
          }),
          children: "Verify evidence"
        }
      )
    ] }, M.id)) }),
    !!y.data.refunds.length && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsx("h3", { className: "subheading", children: "Returns & payouts" }),
      /* @__PURE__ */ o.jsx("div", { className: "record-list", children: y.data.refunds.map((M) => /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsxs("strong", { children: [
            "Return #",
            M.id
          ] }),
          /* @__PURE__ */ o.jsx("small", { children: M.reason })
        ] }),
        /* @__PURE__ */ o.jsx("b", { children: R(M.amount_minor) }),
        /* @__PURE__ */ o.jsx(
          Ie,
          {
            tone: M.status === "pending" ? "amber" : "green",
            children: M.status
          }
        ),
        M.status === "pending" && f("payment:verify") && /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "text-button",
            onClick: () => U({
              kind: "refunds",
              id: M.id
            }),
            children: "Verify payout"
          }
        )
      ] }, M.id)) })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "modal-actions", children: [
      /* @__PURE__ */ o.jsxs(
        "button",
        {
          className: "secondary",
          onClick: N,
          disabled: !f("receipt:reprint") || b.busy || !y.data.receipt_id,
          children: [
            /* @__PURE__ */ o.jsx(hr, { size: 16 }),
            " Reprint"
          ]
        }
      ),
      f("void:write") && y.data.sale.payment_status === "pending" && y.data.sale.status === "completed" && /* @__PURE__ */ o.jsxs(
        "button",
        {
          className: "secondary danger-text",
          onClick: A,
          disabled: b.busy,
          children: [
            /* @__PURE__ */ o.jsx(Z_, { size: 16 }),
            " Void sale"
          ]
        }
      ),
      f("refund:write") && y.data.sale.payment_status === "settled" && y.data.lines.some(
        (M) => M.returned_quantity < M.quantity
      ) && /* @__PURE__ */ o.jsxs(
        "button",
        {
          className: "primary",
          onClick: () => g(!0),
          children: [
            /* @__PURE__ */ o.jsx(yS, { size: 16 }),
            " Return items"
          ]
        }
      )
    ] }),
    S && /* @__PURE__ */ o.jsx(
      hE,
      {
        ...a,
        detail: y.data,
        onClose: () => g(!1)
      }
    ),
    O && /* @__PURE__ */ o.jsx(
      dE,
      {
        ...a,
        record: O,
        onClose: () => U(null)
      }
    )
  ] }) });
}
function dE(a) {
  const [l, s] = H.useState(""), [c, f] = H.useState(""), h = gi(a);
  return /* @__PURE__ */ o.jsxs(
    vn,
    {
      title: a.record.kind === "tenders" ? "Verify payment settlement" : "Verify refund payout",
      onClose: a.onClose,
      children: [
        /* @__PURE__ */ o.jsx("p", { className: "hint", children: "Record evidence from your bank or terminal settlement records. A typed payment reference alone is insufficient." }),
        /* @__PURE__ */ o.jsxs(
          "form",
          {
            onSubmit: (m) => {
              m.preventDefault(), h.run(
                (p) => a.api.mutate(
                  `${a.record.kind}/${a.record.id}/verify`,
                  { reference: l, evidence: c },
                  "POST",
                  !1,
                  p
                ),
                "Settlement evidence recorded.",
                a.onClose
              );
            },
            children: [
              /* @__PURE__ */ o.jsx(He, { label: "Settlement reference", children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  value: l,
                  onChange: (m) => s(m.target.value),
                  minLength: 3,
                  maxLength: 100,
                  required: !0
                }
              ) }),
              /* @__PURE__ */ o.jsx(He, { label: "Evidence and reconciliation notes", children: /* @__PURE__ */ o.jsx(
                "textarea",
                {
                  value: c,
                  onChange: (m) => f(m.target.value),
                  minLength: 10,
                  maxLength: 2e3,
                  required: !0
                }
              ) }),
              /* @__PURE__ */ o.jsx("div", { className: "modal-actions", children: /* @__PURE__ */ o.jsxs("button", { className: "primary", disabled: h.busy, children: [
                /* @__PURE__ */ o.jsx(OS, { size: 16 }),
                " Confirm verified settlement"
              ] }) })
            ]
          }
        )
      ]
    }
  );
}
function hE(a) {
  const { api: l, boot: s, detail: c, onClose: f } = a, [h, m] = H.useState(""), [p, y] = H.useState(
    c.tenders[0]?.method || "cash"
  ), [b, S] = H.useState({}), [g, O] = H.useState(!0), U = gi(a), N = an({
    queryKey: [
      "shifts",
      `${s.seller_id}:${s.cashier_id}:${l.registerId}`
    ],
    queryFn: () => l.request("shifts", { web: !0 })
  }).data?.data.find(
    (A) => A.status === "open" && A.is_own
  );
  return /* @__PURE__ */ o.jsxs(vn, { title: "Return items", onClose: f, children: [
    /* @__PURE__ */ o.jsx("p", { className: "hint", children: "Refunds are separate records. Original receipts and order totals stay intact." }),
    /* @__PURE__ */ o.jsxs(
      "form",
      {
        onSubmit: (A) => {
          A.preventDefault();
          const M = Object.entries(b).filter(([, Y]) => Y > 0).map(([Y, se]) => ({
            sale_line_id: Number(Y),
            quantity: se,
            restock: g
          }));
          if (!M.length || !N) {
            a.onError(
              new Error(
                "Select return quantities and open your shift."
              )
            );
            return;
          }
          U.run(
            (Y) => l.mutate(
              `sales/${c.sale.id}/returns`,
              {
                client_refund_id: Y,
                shift_id: N.id,
                method: p,
                reason: h,
                lines: M
              },
              "POST",
              !1,
              Y
            ),
            "Return recorded. External payouts remain pending until verified.",
            f
          );
        },
        children: [
          /* @__PURE__ */ o.jsx("div", { className: "return-lines", children: c.lines.filter(
            (A) => A.quantity > A.returned_quantity
          ).map((A) => /* @__PURE__ */ o.jsx(
            He,
            {
              label: `${A.snapshot.name} · ${A.quantity - A.returned_quantity} returnable`,
              children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  type: "number",
                  min: "0",
                  max: A.quantity - A.returned_quantity,
                  value: b[A.id] || 0,
                  onChange: (M) => S({
                    ...b,
                    [A.id]: Number(M.target.value)
                  })
                }
              )
            },
            A.id
          )) }),
          /* @__PURE__ */ o.jsx(He, { label: "Refund tender", children: /* @__PURE__ */ o.jsx(
            "select",
            {
              value: p,
              onChange: (A) => y(A.target.value),
              children: Array.from(
                new Set(c.tenders.map((A) => A.method))
              ).map((A) => /* @__PURE__ */ o.jsx("option", { value: A, children: A.replaceAll("_", " ") }, A))
            }
          ) }),
          /* @__PURE__ */ o.jsxs("label", { className: "checkbox", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "checkbox",
                checked: g,
                onChange: (A) => O(A.target.checked)
              }
            ),
            " ",
            "Restock inspected items into saleable stock"
          ] }),
          /* @__PURE__ */ o.jsx(He, { label: "Return reason", children: /* @__PURE__ */ o.jsx(
            "textarea",
            {
              required: !0,
              minLength: 3,
              maxLength: 500,
              value: h,
              onChange: (A) => m(A.target.value)
            }
          ) }),
          !N && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: "Open your register shift to process a return." }),
          /* @__PURE__ */ o.jsx("div", { className: "modal-actions", children: /* @__PURE__ */ o.jsx(
            "button",
            {
              className: "primary",
              disabled: U.busy || !N,
              children: "Record return & refund"
            }
          ) })
        ]
      }
    )
  ] });
}
function mE(a) {
  const { api: l, boot: s, registerId: c, can: f } = a, h = `${s.seller_id}:${s.cashier_id}:${c}`, m = an({
    queryKey: ["shifts", h],
    queryFn: () => l.request("shifts", { web: !0 }),
    refetchInterval: 15e3
  }), [p, y] = H.useState(null), [b, S] = H.useState("0.00"), [g, O] = H.useState(""), U = gi(a), R = m.data?.data.find((M) => M.status === "open"), N = (M) => {
    S("0.00"), O(""), y(M);
  }, A = () => {
    try {
      const M = kn(b);
      U.run(
        (Y) => p === "open" ? l.mutate(
          "shifts/open",
          {
            client_shift_id: Y,
            register_id: c,
            opening_minor: M
          },
          "POST",
          !1,
          Y
        ) : p === "close" ? l.mutate(
          `shifts/${R.id}/close`,
          { counted_minor: M, reason: g },
          "POST",
          !1,
          Y
        ) : l.mutate(
          `shifts/${R.id}/cash`,
          {
            amount_minor: p === "cash-out" ? -M : M,
            reason: g
          },
          "POST",
          !1,
          Y
        ),
        "Register ledger updated.",
        () => y(null)
      );
    } catch (M) {
      a.onError(M);
    }
  };
  return /* @__PURE__ */ o.jsxs("section", { className: "operations", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("h2", { children: "Your till, reconciled" }),
        /* @__PURE__ */ o.jsx("p", { children: "Cash received less change, completed cash refunds and till movements." })
      ] }),
      !R && /* @__PURE__ */ o.jsxs("button", { className: "primary", onClick: () => N("open"), children: [
        /* @__PURE__ */ o.jsx(qa, { size: 16 }),
        " Open shift"
      ] })
    ] }),
    m.isPending ? /* @__PURE__ */ o.jsx(yi, {}) : m.error ? /* @__PURE__ */ o.jsx(
      la,
      {
        title: "Register unavailable",
        text: m.error.message
      }
    ) : /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsxs("div", { className: "metric-grid", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "metric-card", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Shift status" }),
          /* @__PURE__ */ o.jsx("strong", { children: R ? "Open" : "Closed" }),
          /* @__PURE__ */ o.jsx("small", { children: R ? `${R.cashier_name} · #${R.id}` : "Count the opening float before selling" })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "metric-card", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Opening float" }),
          /* @__PURE__ */ o.jsx("strong", { children: ct(
            R?.opening_minor || 0,
            s.currency
          ) })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "metric-card", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Expected cash" }),
          /* @__PURE__ */ o.jsx("strong", { children: ct(
            R?.expected_minor || 0,
            s.currency
          ) }),
          /* @__PURE__ */ o.jsx("small", { children: "From the committed till ledger" })
        ] })
      ] }),
      R && /* @__PURE__ */ o.jsx("div", { className: "register-actions", children: R.is_own ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "secondary",
            disabled: !f("cash:write"),
            onClick: () => N("cash-in"),
            children: [
              /* @__PURE__ */ o.jsx(w_, { size: 17 }),
              " Cash in"
            ]
          }
        ),
        /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "secondary",
            disabled: !f("cash:write"),
            onClick: () => N("cash-out"),
            children: [
              /* @__PURE__ */ o.jsx(U_, { size: 17 }),
              " Cash out"
            ]
          }
        ),
        /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "primary",
            onClick: () => N("close"),
            children: [
              /* @__PURE__ */ o.jsx(G_, { size: 17 }),
              " Count & close shift"
            ]
          }
        )
      ] }) : /* @__PURE__ */ o.jsxs("p", { className: "hint", children: [
        "This shift belongs to ",
        R.cashier_name,
        ". That cashier must close it before you open another."
      ] }) }),
      /* @__PURE__ */ o.jsx("h3", { className: "subheading", children: "Shift history" }),
      /* @__PURE__ */ o.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ o.jsxs("table", { children: [
        /* @__PURE__ */ o.jsx("thead", { children: /* @__PURE__ */ o.jsxs("tr", { children: [
          /* @__PURE__ */ o.jsx("th", { children: "Shift / cashier" }),
          /* @__PURE__ */ o.jsx("th", { children: "Opened" }),
          /* @__PURE__ */ o.jsx("th", { children: "Status" }),
          /* @__PURE__ */ o.jsx("th", { className: "numeric", children: "Expected" }),
          /* @__PURE__ */ o.jsx("th", { className: "numeric", children: "Counted" }),
          /* @__PURE__ */ o.jsx("th", { className: "numeric", children: "Variance" })
        ] }) }),
        /* @__PURE__ */ o.jsx("tbody", { children: m.data?.data.map((M) => /* @__PURE__ */ o.jsxs("tr", { children: [
          /* @__PURE__ */ o.jsxs("td", { children: [
            /* @__PURE__ */ o.jsxs("strong", { children: [
              "#",
              M.id
            ] }),
            /* @__PURE__ */ o.jsx("small", { children: M.cashier_name })
          ] }),
          /* @__PURE__ */ o.jsx("td", { children: Zg(M.opened_at) }),
          /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx(
            Ie,
            {
              tone: M.status === "open" ? "green" : "",
              children: M.status
            }
          ) }),
          /* @__PURE__ */ o.jsx("td", { className: "numeric", children: ct(
            M.expected_minor,
            s.currency
          ) }),
          /* @__PURE__ */ o.jsx("td", { className: "numeric", children: M.counted_minor === null ? "—" : ct(
            M.counted_minor,
            s.currency
          ) }),
          /* @__PURE__ */ o.jsx(
            "td",
            {
              className: `numeric ${M.variance_minor ? "danger-text" : ""}`,
              children: M.variance_minor === null ? "—" : ct(
                M.variance_minor,
                s.currency
              )
            }
          )
        ] }, M.id)) })
      ] }) })
    ] }),
    p && /* @__PURE__ */ o.jsxs(
      vn,
      {
        title: {
          open: "Open shift",
          close: "Count & close shift",
          "cash-in": "Cash in",
          "cash-out": "Cash out"
        }[p],
        onClose: () => y(null),
        children: [
          /* @__PURE__ */ o.jsx("p", { className: "hint", children: p === "close" ? "Count the physical cash. Explain any difference from the expected ledger balance." : p === "open" ? "Enter the physical cash float in this register." : "Every cash movement needs a reason and is recorded in the till ledger." }),
          /* @__PURE__ */ o.jsxs(
            "form",
            {
              onSubmit: (M) => {
                M.preventDefault(), A();
              },
              children: [
                /* @__PURE__ */ o.jsx(
                  He,
                  {
                    label: p === "close" ? "Counted cash" : "Cash amount",
                    children: /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        inputMode: "decimal",
                        value: b,
                        onChange: (M) => S(M.target.value),
                        required: !0
                      }
                    )
                  }
                ),
                p !== "open" && /* @__PURE__ */ o.jsx(He, { label: "Reason", children: /* @__PURE__ */ o.jsx(
                  "textarea",
                  {
                    value: g,
                    onChange: (M) => O(M.target.value),
                    required: p !== "close",
                    minLength: 3,
                    maxLength: 500
                  }
                ) }),
                /* @__PURE__ */ o.jsx("div", { className: "modal-actions", children: /* @__PURE__ */ o.jsxs("button", { className: "primary", disabled: U.busy, children: [
                  "Confirm ",
                  p.replace("-", " ")
                ] }) })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function pE(a) {
  const l = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"), [s, c] = H.useState(l), [f, h] = H.useState(l), { api: m, boot: p } = a, y = an({
    queryKey: ["reports", m.registerId, s, f],
    queryFn: () => m.request(
      `reports/summary?${zu(qg(s, f))}`
    )
  }), b = () => {
    if (!y.data) return;
    const S = y.data, g = [
      ["metric", "minor_units", "currency"],
      ...Object.entries(S.totals).filter(([N]) => N.endsWith("_minor")).map(([N, A]) => [N, String(A), S.currency]),
      [
        "unsettled_sales_minor",
        String(S.unsettled_sales_minor),
        S.currency
      ],
      [
        "pending_refund_payouts_minor",
        String(S.pending_refund_payouts_minor),
        S.currency
      ]
    ], O = new Blob([g.map((N) => N.join(",")).join(`\r
`)], {
      type: "text/csv;charset=utf-8"
    }), U = URL.createObjectURL(O), R = document.createElement("a");
    R.href = U, R.download = `pos-report-${s}-${f}.csv`, R.click(), URL.revokeObjectURL(U);
  };
  return /* @__PURE__ */ o.jsxs("section", { className: "operations", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("h2", { children: "Retail performance" }),
        /* @__PURE__ */ o.jsx("p", { children: "Sales and returns use their own event dates. Amounts include recorded tax." })
      ] }),
      /* @__PURE__ */ o.jsxs(
        "button",
        {
          className: "secondary",
          disabled: !y.data,
          onClick: b,
          children: [
            /* @__PURE__ */ o.jsx(J_, { size: 16 }),
            " Export CSV"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "toolbar", children: [
      /* @__PURE__ */ o.jsx(
        Ug,
        {
          from: s,
          to: f,
          setFrom: c,
          setTo: h
        }
      ),
      /* @__PURE__ */ o.jsx("span", { className: "hint", children: "Selected register · local date range" })
    ] }),
    y.isPending ? /* @__PURE__ */ o.jsx(yi, {}) : y.error ? /* @__PURE__ */ o.jsx(la, { title: "Report unavailable", text: y.error.message }) : y.data && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsx("div", { className: "metric-grid", children: [
        ["Net sales", y.data.totals.net_minor],
        ["Gross sales", y.data.totals.gross_minor],
        ["Returns", y.data.totals.returns_minor],
        ["Net tax", y.data.totals.net_tax_minor]
      ].map(([S, g]) => /* @__PURE__ */ o.jsxs("div", { className: "metric-card", children: [
        /* @__PURE__ */ o.jsx("span", { children: S }),
        /* @__PURE__ */ o.jsx("strong", { children: ct(
          Number(g),
          p.currency
        ) })
      ] }, S)) }),
      /* @__PURE__ */ o.jsxs("div", { className: "report-panels", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "panel", children: [
          /* @__PURE__ */ o.jsx("h3", { children: "Tender reconciliation" }),
          /* @__PURE__ */ o.jsx("div", { className: "record-list", children: y.data.tenders.map((S, g) => /* @__PURE__ */ o.jsxs("div", { children: [
            /* @__PURE__ */ o.jsx("strong", { children: S.method.replaceAll("_", " ") }),
            /* @__PURE__ */ o.jsx(
              Ie,
              {
                tone: S.status === "pending" ? "amber" : "green",
                children: S.status
              }
            ),
            /* @__PURE__ */ o.jsx("b", { children: ct(
              S.amount_minor,
              p.currency
            ) })
          ] }, g)) })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel", children: [
          /* @__PURE__ */ o.jsx("h3", { children: "Needs attention" }),
          /* @__PURE__ */ o.jsxs("div", { className: "attention-row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Pending sale payments" }),
            /* @__PURE__ */ o.jsx("strong", { children: ct(
              y.data.unsettled_sales_minor,
              p.currency
            ) })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "attention-row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Pending refund payouts" }),
            /* @__PURE__ */ o.jsx("strong", { children: ct(
              y.data.pending_refund_payouts_minor,
              p.currency
            ) })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "attention-row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Recorded sales" }),
            /* @__PURE__ */ o.jsx("strong", { children: y.data.totals.sales })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "attention-row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Discounts" }),
            /* @__PURE__ */ o.jsx("strong", { children: ct(
              y.data.totals.discount_minor,
              p.currency
            ) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function vE(a) {
  const { api: l } = a, [s, c] = H.useState(""), [f, h] = H.useState(1), m = gi(a), p = an({
    queryKey: ["products", l.registerId, s, f],
    queryFn: ({ signal: y }) => l.request(`products?${zu({ q: s, page: f })}`, {
      web: !0,
      signal: y
    })
  });
  return /* @__PURE__ */ o.jsxs("section", { className: "operations", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("h2", { children: "Your POS catalog" }),
        /* @__PURE__ */ o.jsx("p", { children: "Choose which of your products cashiers can sell. Publishing and approval rules still apply." })
      ] }),
      /* @__PURE__ */ o.jsx(Ie, { children: "Current store only" })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "toolbar", children: /* @__PURE__ */ o.jsxs("div", { className: "search-box", children: [
      /* @__PURE__ */ o.jsx(My, { size: 17 }),
      /* @__PURE__ */ o.jsx(
        "input",
        {
          value: s,
          onChange: (y) => {
            c(y.target.value), h(1);
          },
          placeholder: "Find a product",
          "aria-label": "Find a product"
        }
      )
    ] }) }),
    p.isPending ? /* @__PURE__ */ o.jsx(yi, {}) : p.error ? /* @__PURE__ */ o.jsx(
      la,
      {
        title: "Products unavailable",
        text: p.error.message
      }
    ) : /* @__PURE__ */ o.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ o.jsxs("table", { children: [
      /* @__PURE__ */ o.jsx("thead", { children: /* @__PURE__ */ o.jsxs("tr", { children: [
        /* @__PURE__ */ o.jsx("th", { children: "Product" }),
        /* @__PURE__ */ o.jsx("th", { children: "Barcode" }),
        /* @__PURE__ */ o.jsx("th", { children: "Retail eligibility" }),
        /* @__PURE__ */ o.jsx("th", { children: "POS enabled" })
      ] }) }),
      /* @__PURE__ */ o.jsx("tbody", { children: p.data?.data.map((y) => {
        const b = !!y.published && !!y.approved && !y.digital && !y.auction_product;
        return /* @__PURE__ */ o.jsxs("tr", { children: [
          /* @__PURE__ */ o.jsxs("td", { children: [
            /* @__PURE__ */ o.jsx("strong", { children: y.name }),
            /* @__PURE__ */ o.jsxs("small", { children: [
              "Product #",
              y.id
            ] })
          ] }),
          /* @__PURE__ */ o.jsx("td", { children: y.barcode || "No barcode" }),
          /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx(
            Ie,
            {
              tone: b ? "green" : "amber",
              children: b ? y.wholesale_product ? "Physical wholesale: normal stock price" : "Physical retail product" : "Not published, approved or retail"
            }
          ) }),
          /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsxs("label", { className: "switch", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "checkbox",
                "aria-label": `Enable ${y.name} for POS`,
                checked: !y.pos_excluded,
                disabled: m.busy,
                onChange: (S) => m.run(
                  (g) => l.mutate(
                    `products/${y.id}`,
                    {
                      pos: S.target.checked
                    },
                    "PUT",
                    !0,
                    g
                  ),
                  "POS product visibility updated."
                )
              }
            ),
            /* @__PURE__ */ o.jsx("span", {})
          ] }) })
        ] }, y.id);
      }) })
    ] }) }),
    p.data && p.data.last_page > 1 && /* @__PURE__ */ o.jsxs("div", { className: "pagination", children: [
      /* @__PURE__ */ o.jsx(
        "button",
        {
          disabled: f === 1,
          onClick: () => h(f - 1),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ o.jsxs("span", { children: [
        "Page ",
        f,
        " of ",
        p.data.last_page
      ] }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          disabled: f === p.data.last_page,
          onClick: () => h(f + 1),
          children: "Next"
        }
      )
    ] })
  ] });
}
function yE(a) {
  const { api: l, boot: s, can: c } = a, [f, h] = H.useState(s.settings.receipt_footer || ""), [m, p] = H.useState({
    receipt_name: s.branding?.name || "",
    receipt_logo_url: s.branding?.logo_url || "",
    receipt_address: s.branding?.address || "",
    receipt_phone: s.branding?.phone || "",
    receipt_email: s.branding?.email || "",
    receipt_tax_details: s.branding?.tax_details || ""
  }), [y, b] = H.useState(s.sellers_enabled !== !1), [S, g] = H.useState(!!s.settings.tax_inclusive), [O, U] = H.useState(!1), [R, N] = H.useState(""), [A, M] = H.useState(""), [Y, se] = H.useState(!1), [pe, ee] = H.useState(null), I = gi(a), F = an({
    queryKey: ["staff", l.registerId],
    queryFn: () => l.request("staff", { web: !0 }),
    enabled: c("staff:manage")
  }), oe = an({
    queryKey: ["devices", l.registerId],
    queryFn: () => l.request("devices"),
    enabled: c("device:manage")
  });
  return /* @__PURE__ */ o.jsxs("section", { className: "operations", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("h2", { children: "Store & register settings" }),
        /* @__PURE__ */ o.jsx("p", { children: "Merchant settings are shared. Printer preferences apply to this browser." })
      ] }),
      /* @__PURE__ */ o.jsxs(Ie, { children: [
        s.currency,
        " · integer minor units"
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "settings-grid", children: [
      /* @__PURE__ */ o.jsxs("section", { className: "panel", children: [
        /* @__PURE__ */ o.jsx("h3", { children: "Receipts & pricing" }),
        /* @__PURE__ */ o.jsxs(
          "form",
          {
            onSubmit: (J) => {
              J.preventDefault(), I.run(
                (Ee) => l.mutate(
                  "settings",
                  {
                    ...m,
                    receipt_logo_url: m.receipt_logo_url || null,
                    receipt_email: m.receipt_email || null,
                    ...s.can_manage_seller_pos ? { sellers_enabled: y } : {},
                    receipt_footer: f,
                    tax_inclusive: S
                  },
                  "PUT",
                  !1,
                  Ee
                ),
                "Settings saved. New sales use this tax policy."
              );
            },
            children: [
              [
                ["receipt_name", "Receipt store name", 150],
                ["receipt_logo_url", "POS logo URL (HTTPS)", 2048],
                ["receipt_address", "Store address", 500],
                ["receipt_phone", "Store phone", 50],
                ["receipt_email", "Store email", 200],
                ["receipt_tax_details", "Tax registration details", 250]
              ].map(([J, Ee, Be]) => /* @__PURE__ */ o.jsx(He, { label: Ee, children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  value: m[J],
                  maxLength: Be,
                  type: J === "receipt_email" ? "email" : J === "receipt_logo_url" ? "url" : "text",
                  required: J === "receipt_name",
                  disabled: !c("settings:manage"),
                  onChange: (Ve) => p({ ...m, [J]: Ve.target.value })
                }
              ) }, J)),
              /* @__PURE__ */ o.jsx("p", { className: "hint", children: "Upload your logo to the website media library and paste its HTTPS URL. New receipts preserve these details at the time of sale." }),
              s.can_manage_seller_pos && /* @__PURE__ */ o.jsxs("label", { className: "checkbox", children: [
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: y,
                    disabled: !c("settings:manage"),
                    onChange: (J) => b(J.target.checked)
                  }
                ),
                "Enable POS for all sellers"
              ] }),
              /* @__PURE__ */ o.jsx(He, { label: "Receipt footer", children: /* @__PURE__ */ o.jsx(
                "textarea",
                {
                  value: f,
                  onChange: (J) => h(J.target.value),
                  maxLength: 500,
                  disabled: !c("settings:manage")
                }
              ) }),
              /* @__PURE__ */ o.jsxs("label", { className: "checkbox", children: [
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: S,
                    onChange: (J) => g(J.target.checked),
                    disabled: !c("settings:manage")
                  }
                ),
                " ",
                "Product taxes are included in displayed prices"
              ] }),
              /* @__PURE__ */ o.jsx("p", { className: "hint", children: "Changing tax treatment changes new sale totals. Refresh open carts before payment." }),
              /* @__PURE__ */ o.jsx(
                "button",
                {
                  className: "primary",
                  disabled: !c("settings:manage") || I.busy,
                  children: "Save merchant settings"
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("section", { className: "panel", children: [
        /* @__PURE__ */ o.jsx("h3", { children: "Browser printing" }),
        /* @__PURE__ */ o.jsx(He, { label: "Receipt paper", children: /* @__PURE__ */ o.jsxs(
          "select",
          {
            value: a.width,
            onChange: (J) => a.setWidth(J.target.value),
            children: [
              /* @__PURE__ */ o.jsx("option", { value: "58", children: "58 mm thermal" }),
              /* @__PURE__ */ o.jsx("option", { value: "80", children: "80 mm thermal" }),
              /* @__PURE__ */ o.jsx("option", { value: "a4", children: "A4 / PDF" })
            ]
          }
        ) }),
        /* @__PURE__ */ o.jsx("p", { className: "hint", children: "Browser print dialog. Choose Save as PDF for a file. Native silent printing, cutter and cash drawer control require the future desktop hardware integration." }),
        /* @__PURE__ */ o.jsxs("div", { className: "capability", children: [
          /* @__PURE__ */ o.jsx(hr, { size: 18 }),
          /* @__PURE__ */ o.jsx("span", { children: "HTML receipts · Audited duplicate prints" })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "capability", children: [
          /* @__PURE__ */ o.jsx(aS, { size: 18 }),
          /* @__PURE__ */ o.jsx("span", { children: "HID scanner · Enter or Tab suffix" })
        ] })
      ] })
    ] }),
    c("settings:manage") && /* @__PURE__ */ o.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsx("h3", { children: "Registers" }),
          /* @__PURE__ */ o.jsx("p", { children: "Registers share this merchant's stock pool." })
        ] }),
        /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "secondary",
            onClick: () => U(!0),
            children: [
              /* @__PURE__ */ o.jsx(qa, { size: 16 }),
              " Add register"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o.jsx("div", { className: "record-list", children: s.registers.map((J) => /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx(Dy, { size: 18 }),
        /* @__PURE__ */ o.jsx("strong", { children: J.name }),
        /* @__PURE__ */ o.jsx("small", { children: J.code }),
        /* @__PURE__ */ o.jsx(
          Ie,
          {
            tone: J.active_shift_id ? "green" : "",
            children: J.active_shift_id ? "Shift open" : "Available"
          }
        )
      ] }, J.id)) })
    ] }),
    c("staff:manage") && /* @__PURE__ */ o.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsx("h3", { children: "Cashier permissions" }),
          /* @__PURE__ */ o.jsx("p", { children: "Assign an existing RewaShop account by its user ID." })
        ] }),
        /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "secondary",
            onClick: () => {
              ee(null), se(!0);
            },
            children: [
              /* @__PURE__ */ o.jsx(qa, { size: 16 }),
              " Assign cashier"
            ]
          }
        )
      ] }),
      F.error && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: F.error.message }),
      /* @__PURE__ */ o.jsx("div", { className: "record-list", children: F.data?.data.map((J) => /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsxs("strong", { children: [
            J.name,
            " · #",
            J.user_id
          ] }),
          /* @__PURE__ */ o.jsxs("small", { children: [
            J.abilities.length,
            " permissions ·",
            " ",
            J.max_discount_bps / 100,
            "% discount limit"
          ] })
        ] }),
        /* @__PURE__ */ o.jsx(Ie, { tone: J.active ? "green" : "amber", children: J.active ? "Active" : "Disabled" }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "text-button",
            onClick: () => {
              ee(J), se(!0);
            },
            children: "Edit assignment"
          }
        )
      ] }, J.user_id)) })
    ] }),
    c("device:manage") && /* @__PURE__ */ o.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsx("h3", { children: "Connected devices" }),
          /* @__PURE__ */ o.jsx("p", { children: "Revoking a device stops authentication and preserves its stock reservations." })
        ] }),
        /* @__PURE__ */ o.jsx(Ie, { children: "Desktop stage follows" })
      ] }),
      oe.error && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: oe.error.message }),
      /* @__PURE__ */ o.jsx("div", { className: "record-list", children: oe.data?.data.data.map((J) => /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsx("strong", { children: J.name }),
          /* @__PURE__ */ o.jsxs("small", { children: [
            "Last seen ",
            J.last_seen_at || "Never",
            " ",
            "· sequence ",
            J.last_sequence
          ] })
        ] }),
        /* @__PURE__ */ o.jsx(
          Ie,
          {
            tone: J.revoked_at ? "amber" : "green",
            children: J.revoked_at ? "Revoked" : "Active"
          }
        ),
        !J.revoked_at && /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "text-button danger-text",
            disabled: I.busy,
            onClick: () => {
              const Ee = prompt(
                "Reason for revoking this device"
              );
              Ee && I.run(
                (Be) => l.mutate(
                  `devices/${J.id}/revoke`,
                  { reason: Ee },
                  "POST",
                  !1,
                  Be
                ),
                "Device revoked. Reservations remain protected."
              );
            },
            children: "Revoke"
          }
        )
      ] }, J.id)) })
    ] }),
    O && /* @__PURE__ */ o.jsx(
      vn,
      {
        title: "Add register",
        onClose: () => U(!1),
        children: /* @__PURE__ */ o.jsxs(
          "form",
          {
            onSubmit: (J) => {
              J.preventDefault(), I.run(
                (Ee) => l.mutate(
                  "registers",
                  { code: R, name: A },
                  "POST",
                  !1,
                  Ee
                ),
                "Register created.",
                () => U(!1)
              );
            },
            children: [
              /* @__PURE__ */ o.jsx(He, { label: "Register code", children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  required: !0,
                  pattern: "[A-Za-z0-9_-]+",
                  value: R,
                  onChange: (J) => N(J.target.value),
                  maxLength: 40
                }
              ) }),
              /* @__PURE__ */ o.jsx(He, { label: "Display name", children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  required: !0,
                  value: A,
                  onChange: (J) => M(J.target.value),
                  maxLength: 150
                }
              ) }),
              /* @__PURE__ */ o.jsx("div", { className: "modal-actions", children: /* @__PURE__ */ o.jsx("button", { className: "primary", disabled: I.busy, children: "Create register" }) })
            ]
          }
        )
      }
    ),
    Y && /* @__PURE__ */ o.jsx(
      gE,
      {
        ...a,
        value: pe,
        onClose: () => se(!1)
      }
    )
  ] });
}
function gE(a) {
  const { value: l, boot: s, api: c } = a, [f, h] = H.useState(l?.user_id?.toString() || ""), [m, p] = H.useState(
    l?.abilities || [
      "pos:catalog:read",
      "pos:sale:write",
      "pos:sale:read",
      "pos:shift:write",
      "pos:receipt:read"
    ]
  ), [y, b] = H.useState(
    l?.register_ids || [a.registerId]
  ), [S, g] = H.useState(
    String((l?.max_discount_bps || 0) / 100)
  ), [O, U] = H.useState(l ? !!l.active : !0), R = gi(a);
  return /* @__PURE__ */ o.jsx(vn, { title: "Cashier assignment", onClose: a.onClose, wide: !0, children: /* @__PURE__ */ o.jsxs(
    "form",
    {
      onSubmit: (N) => {
        N.preventDefault();
        try {
          const A = kn(S);
          if (A > s.max_discount_bps)
            throw new Error(
              "The delegated discount limit exceeds your own."
            );
          R.run(
            (M) => c.mutate(
              "staff",
              {
                user_id: Number(f),
                abilities: m,
                register_ids: y,
                max_discount_bps: A,
                active: O
              },
              "PUT",
              !1,
              M
            ),
            "Cashier permissions updated.",
            a.onClose
          );
        } catch (A) {
          a.onError(A);
        }
      },
      children: [
        /* @__PURE__ */ o.jsxs("div", { className: "form-grid", children: [
          /* @__PURE__ */ o.jsx(He, { label: "Existing user ID", children: /* @__PURE__ */ o.jsx(
            "input",
            {
              required: !0,
              type: "number",
              min: "1",
              value: f,
              disabled: !!l,
              onChange: (N) => h(N.target.value)
            }
          ) }),
          /* @__PURE__ */ o.jsx(He, { label: "Maximum discount (%)", children: /* @__PURE__ */ o.jsx(
            "input",
            {
              required: !0,
              inputMode: "decimal",
              value: S,
              onChange: (N) => g(N.target.value)
            }
          ) })
        ] }),
        /* @__PURE__ */ o.jsxs("label", { className: "checkbox", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "checkbox",
              checked: O,
              onChange: (N) => U(N.target.checked)
            }
          ),
          " ",
          "Assignment active"
        ] }),
        /* @__PURE__ */ o.jsx("h3", { className: "subheading", children: "Permitted registers" }),
        /* @__PURE__ */ o.jsx("div", { className: "permission-grid", children: s.registers.map((N) => /* @__PURE__ */ o.jsxs("label", { className: "checkbox", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "checkbox",
              checked: y.includes(N.id),
              onChange: (A) => b(
                A.target.checked ? [...y, N.id] : y.filter(
                  (M) => M !== N.id
                )
              )
            }
          ),
          N.name
        ] }, N.id)) }),
        /* @__PURE__ */ o.jsx("h3", { className: "subheading", children: "Permissions" }),
        /* @__PURE__ */ o.jsx("div", { className: "permission-grid", children: s.abilities.filter((N) => N !== "pos:sync").map((N) => /* @__PURE__ */ o.jsxs("label", { className: "checkbox", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "checkbox",
              checked: m.includes(N),
              onChange: (A) => p(
                A.target.checked ? [...m, N] : m.filter(
                  (M) => M !== N
                )
              )
            }
          ),
          N.replace("pos:", "").replaceAll(":", " · ")
        ] }, N)) }),
        /* @__PURE__ */ o.jsx("div", { className: "modal-actions", children: /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "primary",
            disabled: R.busy || !y.length,
            children: "Save assignment"
          }
        ) })
      ]
    }
  ) });
}
const bE = new h_({
  defaultOptions: {
    queries: { retry: !1, staleTime: 1e4 },
    mutations: { retry: !1 }
  }
}), fl = JSON.parse(
  document.getElementById("rewa-pos-config").textContent
);
function _E() {
  const a = _r(), [l, s] = H.useState(
    fl.registerId
  ), c = H.useMemo(() => new qS(fl, l), [l]), f = an({
    queryKey: ["bootstrap", l],
    queryFn: ({ signal: L }) => c.request("bootstrap", { signal: L }),
    refetchInterval: 3e4
  }), h = an({
    queryKey: ["workspace", l],
    queryFn: ({ signal: L }) => c.request("workspace", { web: !0, signal: L })
  }), m = f.data, p = h.data;
  m && (c.scope = `${m.seller_id}:${m.cashier_id}`);
  const [y, b] = H.useState("checkout"), [S, g] = H.useState(
    localStorage.getItem("rewa-pos-theme") === "dark"
  ), [O, U] = H.useState(navigator.onLine), [R, N] = H.useState(""), [A, M] = H.useState(""), [Y, se] = H.useState(null), [pe, ee] = H.useState(!1), [I, F] = H.useState(null), [oe, J] = H.useState(
    localStorage.getItem("rewa-pos-print-width") || "80"
  ), [Ee, Be] = H.useState(!1), [Ve, wt] = H.useState(!1), [ln, Xe] = H.useState(!1), G = H.useRef(!1), le = H.useRef(null), te = m && l ? `${m.seller_id}:${m.cashier_id}:${l}` : "", _e = `rewa-pos:print:${te}`, ye = (L) => !!m?.abilities.includes(`pos:${L}`), Ae = (L) => M(
    L instanceof Error ? L.message : "The action could not be completed."
  ), st = (L) => {
    M(""), N(L);
  };
  H.useEffect(() => {
    m && !l && m.registers.length && s(m.registers[0].id);
  }, [m, l]), H.useEffect(() => {
    const L = () => U(navigator.onLine);
    return window.addEventListener("online", L), window.addEventListener("offline", L), () => {
      window.removeEventListener("online", L), window.removeEventListener("offline", L);
    };
  }, []), H.useEffect(() => {
    document.documentElement.dataset.posTheme = S ? "dark" : "light", localStorage.setItem("rewa-pos-theme", S ? "dark" : "light");
  }, [S]), H.useEffect(() => {
    if (R) {
      const L = setTimeout(() => N(""), 6e3);
      return () => clearTimeout(L);
    }
  }, [R]), H.useEffect(() => {
    const L = sessionStorage.getItem(_e);
    L && te && (F(Number(L)), Be(!0));
  }, [_e, te]);
  const $t = async (L, ce = !1, de) => {
    F(L), ee(ce);
    const X = de || (await c.request(`receipts/${L}`)).receipt;
    se(X);
  }, j = async (L) => {
    sessionStorage.setItem(_e, String(L.receipt_id)), Be(!0), F(L.receipt_id), st(
      `Sale #${L.sale_id} recorded. ${L.payment_status === "pending" ? "External payment awaits verification." : "Payment settled."}`
    ), a.invalidateQueries();
    try {
      await $t(L.receipt_id, !!L.duplicate);
    } catch (ce) {
      Ae(ce);
    }
  }, Q = async () => {
    if (!(G.current || !I)) {
      G.current = !0, Xe(!0);
      try {
        const L = `rewa-pos:print-attempts:${te}:${I}`, ce = Number(sessionStorage.getItem(L) || 0);
        if (ce > 0) {
          const de = await c.mutate(
            `receipts/${I}/reprint`,
            {
              reason: "Previous browser print dispatch was not confirmed"
            }
          );
          se(de.receipt), ee(!0), await new Promise(
            (X) => requestAnimationFrame(() => X())
          );
        }
        sessionStorage.setItem(L, String(ce + 1)), await Promise.all(Array.from(document.querySelectorAll("#rewa-pos-receipt img")).map((de) => Promise.race([de.decode().catch(() => {
        }), new Promise((X) => setTimeout(X, 5e3))]))), window.print();
      } catch (L) {
        Ae(
          new Error(
            L instanceof fi ? L.message : "Printing could not start. The sale is recorded. Reopen its receipt to print."
          )
        );
      } finally {
        G.current = !1, Xe(!1);
      }
    }
  }, ne = () => {
    sessionStorage.removeItem(_e), Be(!1), se(null), st("Receipt marked printed.");
  };
  if (f.isPending || h.isPending) return /* @__PURE__ */ o.jsx(yi, {});
  if (!m || !p || m.owner_type !== fl.area)
    return /* @__PURE__ */ o.jsxs("div", { className: "startup-error", children: [
      /* @__PURE__ */ o.jsx(_f, { size: 36 }),
      /* @__PURE__ */ o.jsx("h1", { children: "Your register could not open" }),
      /* @__PURE__ */ o.jsx("p", { children: f.error?.message || h.error?.message || "Open the correct store workspace." }),
      /* @__PURE__ */ o.jsx("button", { onClick: () => a.invalidateQueries(), children: "Retry" }),
      /* @__PURE__ */ o.jsx("a", { href: fl.backUrl, children: "Return to workspace" })
    ] });
  const $ = [
    ["checkout", "Checkout", _f, "sale:write"],
    ["sales", "Sales & returns", hS, "sale:read"],
    ["register", "Register", Dy, "shift:write"],
    ["reports", "Reports", H_, "report:read"],
    ["products", "Products", bf, "settings:manage"],
    ["settings", "Settings", xS, "catalog:read"]
  ];
  return /* @__PURE__ */ o.jsxs("div", { className: "rp-app", children: [
    /* @__PURE__ */ o.jsxs("aside", { className: "rail", children: [
      /* @__PURE__ */ o.jsxs(
        "a",
        {
          className: "brand",
          href: fl.backUrl,
          "aria-label": "Back to RewaShop",
          children: [
            m.branding?.logo_url ? /* @__PURE__ */ o.jsx("img", { className: "pos-store-logo", src: m.branding.logo_url, alt: "Store logo" }) : /* @__PURE__ */ o.jsx("span", { className: "brand-mark", children: "POS" }),
            /* @__PURE__ */ o.jsxs("div", { children: [
              /* @__PURE__ */ o.jsx("strong", { children: m.branding?.name || p.store_name }),
              /* @__PURE__ */ o.jsx("small", { children: "POINT OF SALE" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ o.jsxs("div", { className: "store-label", children: [
        /* @__PURE__ */ o.jsx("span", { className: "store-dot" }),
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsx("strong", { children: p.store_name }),
          /* @__PURE__ */ o.jsx("small", { children: m.owner_type === "admin" ? "Platform store" : "Seller store" })
        ] })
      ] }),
      /* @__PURE__ */ o.jsx("nav", { children: $.filter(([, , , L]) => ye(L)).map(([L, ce, de]) => /* @__PURE__ */ o.jsxs(
        "button",
        {
          "aria-label": ce,
          className: y === L ? "active" : "",
          onClick: () => b(L),
          children: [
            /* @__PURE__ */ o.jsx(de, { size: 19 }),
            /* @__PURE__ */ o.jsx("span", { children: ce }),
            L === "checkout" && /* @__PURE__ */ o.jsx("kbd", { children: "F2" })
          ]
        },
        L
      )) }),
      /* @__PURE__ */ o.jsxs("div", { className: "rail-bottom", children: [
        /* @__PURE__ */ o.jsxs("button", { onClick: () => g(!S), children: [
          S ? /* @__PURE__ */ o.jsx(TS, { size: 18 }) : /* @__PURE__ */ o.jsx(lS, { size: 18 }),
          /* @__PURE__ */ o.jsx("span", { children: S ? "Light mode" : "Dark mode" })
        ] }),
        /* @__PURE__ */ o.jsxs("a", { href: fl.backUrl, children: [
          /* @__PURE__ */ o.jsx(M_, { size: 18 }),
          " Back to workspace"
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "cashier", children: [
          /* @__PURE__ */ o.jsx("span", { children: p.cashier_name.charAt(0) }),
          /* @__PURE__ */ o.jsxs("div", { children: [
            /* @__PURE__ */ o.jsx("strong", { children: p.cashier_name }),
            /* @__PURE__ */ o.jsxs("small", { children: [
              "Cashier · #",
              m.cashier_id
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "main-shell", children: [
      /* @__PURE__ */ o.jsxs("header", { className: "topbar", children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsx("span", { className: "eyebrow", children: "REWASHOP POS PRO" }),
          /* @__PURE__ */ o.jsx("h1", { children: $.find(([L]) => L === y)?.[1] })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "topbar-right", children: [
          /* @__PURE__ */ o.jsxs(Ie, { tone: O ? "green" : "amber", children: [
            O ? /* @__PURE__ */ o.jsx(DS, { size: 13 }) : /* @__PURE__ */ o.jsx(RS, { size: 13 }),
            " ",
            O ? "Online" : "Offline"
          ] }),
          /* @__PURE__ */ o.jsx(
            "select",
            {
              "aria-label": "Register",
              value: l || "",
              disabled: Ve,
              onChange: (L) => s(Number(L.target.value)),
              children: m.registers.map((L) => /* @__PURE__ */ o.jsx("option", { value: L.id, children: L.name }, L.id))
            }
          )
        ] })
      ] }),
      !O && /* @__PURE__ */ o.jsx("div", { className: "banner amber", role: "status", children: "Checkout needs a connection. Your cart stays on this screen; saved held carts remain in your store." }),
      (A || R || f.error) && /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: `banner ${A || f.error ? "danger" : "green"}`,
          role: "status",
          children: [
            A || f.error?.message || R,
            /* @__PURE__ */ o.jsx(
              "button",
              {
                "aria-label": "Dismiss message",
                onClick: () => {
                  M(""), N("");
                },
                children: /* @__PURE__ */ o.jsx(Sr, { size: 16 })
              }
            )
          ]
        }
      ),
      Ee && !Y && /* @__PURE__ */ o.jsxs("div", { className: "print-reminder", children: [
        /* @__PURE__ */ o.jsx(hr, { size: 16 }),
        /* @__PURE__ */ o.jsxs("span", { children: [
          "Sale recorded. Receipt #",
          I,
          " is awaiting print confirmation."
        ] }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            onClick: () => I && $t(I).catch(Ae),
            children: "Open receipt"
          }
        )
      ] }),
      /* @__PURE__ */ o.jsx("div", { className: "checkout-container", hidden: y !== "checkout", children: /* @__PURE__ */ o.jsx(
        SE,
        {
          active: y === "checkout",
          onCartChange: wt,
          api: c,
          boot: m,
          workspace: p,
          registerId: l,
          online: O,
          scope: te,
          scanRef: le,
          onCommit: j,
          onError: Ae,
          onSuccess: st,
          can: ye
        },
        te
      ) }),
      y !== "checkout" && /* @__PURE__ */ o.jsx(
        cE,
        {
          tab: y,
          api: c,
          boot: m,
          workspace: p,
          registerId: l,
          can: ye,
          onError: Ae,
          onSuccess: st,
          onReceipt: $t,
          width: oe,
          setWidth: (L) => {
            J(L), localStorage.setItem("rewa-pos-print-width", L);
          }
        }
      )
    ] }),
    Y && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsx(
        rE,
        {
          receipt: Y,
          duplicate: pe,
          width: oe,
          footer: m.settings.receipt_footer || ""
        }
      ),
      /* @__PURE__ */ o.jsxs(
        vn,
        {
          title: pe ? "Duplicate receipt" : "Sale recorded",
          onClose: () => se(null),
          children: [
            /* @__PURE__ */ o.jsxs("div", { className: "sale-success", children: [
              /* @__PURE__ */ o.jsx("span", { className: "success-icon", children: /* @__PURE__ */ o.jsx(L_, { size: 28 }) }),
              /* @__PURE__ */ o.jsx("h3", { children: ct(
                Y.total_minor,
                m.currency
              ) }),
              /* @__PURE__ */ o.jsxs("p", { children: [
                Y.number,
                " · Order #",
                Y.order_id
              ] }),
              /* @__PURE__ */ o.jsx(
                Ie,
                {
                  tone: Y.payment_status === "settled" ? "green" : "amber",
                  children: Y.payment_status === "settled" ? "Payment settled" : "Payment awaiting verification"
                }
              )
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "receipt-preview", children: [
              /* @__PURE__ */ o.jsx("strong", { children: Y.store.name }),
              Y.lines.map((L, ce) => /* @__PURE__ */ o.jsxs("div", { children: [
                /* @__PURE__ */ o.jsxs("span", { children: [
                  L.quantity,
                  " ×",
                  " ",
                  L.name || L.snapshot?.name
                ] }),
                /* @__PURE__ */ o.jsx("b", { children: ct(
                  L.total_minor,
                  m.currency
                ) })
              ] }, ce))
            ] }),
            /* @__PURE__ */ o.jsx(He, { label: "Paper size", children: /* @__PURE__ */ o.jsxs(
              "select",
              {
                value: oe,
                onChange: (L) => {
                  J(L.target.value), localStorage.setItem(
                    "rewa-pos-print-width",
                    L.target.value
                  );
                },
                children: [
                  /* @__PURE__ */ o.jsx("option", { value: "58", children: "58 mm thermal" }),
                  /* @__PURE__ */ o.jsx("option", { value: "80", children: "80 mm thermal" }),
                  /* @__PURE__ */ o.jsx("option", { value: "a4", children: "A4 / Save as PDF" })
                ]
              }
            ) }),
            /* @__PURE__ */ o.jsx("p", { className: "hint", children: "Your browser opens its print dialog. Confirm the correct printer and paper size." }),
            /* @__PURE__ */ o.jsxs("div", { className: "modal-actions", children: [
              /* @__PURE__ */ o.jsx("button", { className: "secondary", onClick: ne, children: "Mark printed" }),
              /* @__PURE__ */ o.jsxs(
                "button",
                {
                  className: "primary",
                  onClick: Q,
                  disabled: ln,
                  children: [
                    /* @__PURE__ */ o.jsx(hr, { size: 17 }),
                    " Print receipt"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
function SE({
  active: a,
  onCartChange: l,
  api: s,
  boot: c,
  registerId: f,
  online: h,
  scope: m,
  scanRef: p,
  onCommit: y,
  onError: b,
  onSuccess: S,
  can: g,
  workspace: O
}) {
  const U = _r(), R = (q) => ct(q, c.currency), [N, A] = H.useState([]), [M, Y] = H.useState(""), [se, pe] = H.useState(""), [ee, I] = H.useState(""), [F, oe] = H.useState(""), [J, Ee] = H.useState(0), [Be, Ve] = H.useState(
    null
  ), [wt, ln] = H.useState(!1), [Xe, G] = H.useState(!1), [le, te] = H.useState(!1), [_e, ye] = H.useState(null), [Ae, st] = H.useState(null), [$t, j] = H.useState(!1), [Q, ne] = H.useState({ id: hi(), revision: 0 }), [$, L] = H.useState(null), [ce, de] = H.useState(!1), X = H.useRef(Q), re = H.useRef(Promise.resolve()), Rt = (q) => {
    X.current = q, ne(q);
  }, gn = H.useRef(!1), Ln = H.useRef(Promise.resolve()), Mt = H.useRef(!1), Ke = `rewa-pos:draft:${m}`, Ot = an({
    queryKey: ["shifts", m],
    queryFn: () => s.request("shifts", { web: !0 }),
    enabled: !!f && g("shift:write"),
    refetchInterval: 15e3
  }).data?.data.find(
    (q) => q.status === "open" && q.is_own
  ), un = an({
    queryKey: ["drafts", m],
    queryFn: () => s.request("drafts", { web: !0 }),
    enabled: !!f && g("sale:write")
  }), mt = an({
    queryKey: ["catalog", m, se, ee, F, J],
    queryFn: ({ signal: q }) => s.request(
      `catalog/search?${zu({ q: se, category_id: ee, brand_id: F, after: J, limit: 48 })}`,
      { signal: q }
    ),
    enabled: !!f
  }), Dt = H.useMemo(() => {
    try {
      return { ...kS(N, c.max_discount_bps), error: "" };
    } catch (q) {
      return {
        subtotal_minor: 0,
        tax_minor: 0,
        discount_minor: 0,
        total_minor: 0,
        error: q.message
      };
    }
  }, [N, c.max_discount_bps]), sa = () => {
    A([]), st(null), L(null), Rt({ id: hi(), revision: 0 }), sessionStorage.removeItem(Ke);
  }, zn = (q, P) => {
    const je = X.current.id, Te = re.current.catch(() => {
    }).then(async () => {
      if (je !== X.current.id)
        throw new Error("The active cart changed before saving.");
      const Ut = await LS(
        s,
        X.current,
        P,
        q
      );
      return je === X.current.id && (Rt(Ut), sessionStorage.setItem(Ke, Ut.id)), Ut;
    });
    return re.current = Te.then(() => {
    }), Te;
  };
  H.useEffect(() => {
    l(N.length > 0 || !!$);
  }, [N.length, $, l]), H.useEffect(() => {
    const q = setTimeout(() => {
      pe(M), Ee(0);
    }, 250);
    return () => clearTimeout(q);
  }, [M]), H.useEffect(() => {
    p.current?.focus();
  }, []), H.useEffect(() => {
    if (Mt.current || !un.data) return;
    Mt.current = !0;
    const q = sessionStorage.getItem(Ke), P = un.data.data.find((je) => je.id === q);
    P && (A(P.payload.lines), st(P.payload.customer || null), Rt({ id: P.id, revision: P.revision }), L(P.payload.intent || null), P.payload.intent && G(!0));
  }, [un.data, Ke]), H.useEffect(() => {
    if (!N.length || $ || !h || !Mt.current)
      return;
    const q = setTimeout(() => {
      gn.current || zn({ lines: N, customer: Ae }, Ae?.name || "Current cart").then(
        () => U.invalidateQueries({ queryKey: ["drafts", m] })
      ).catch(b);
    }, 800);
    return () => clearTimeout(q);
  }, [N, Ae, $, h]), H.useEffect(() => {
    const q = (P) => {
      a && (P.key === "F2" && (P.preventDefault(), p.current?.focus()), P.key === "F8" && N.length && !$ && (P.preventDefault(), G(!0)), P.key === "F4" && !$ && (P.preventDefault(), te(!0)));
    };
    return window.addEventListener("keydown", q), () => window.removeEventListener("keydown", q);
  }, [N.length, $, a]);
  const Ba = H.useCallback(
    (q) => {
      $ || (A((P) => {
        const je = P.findIndex(
          (Ut) => Ut.item.stock_id === q.stock_id
        ), Te = je < 0 ? 1 : P[je].quantity + 1;
        return Te > q.available_quantity || Te > 1e4 ? (b(
          new Error(
            "There is not enough available stock for this quantity."
          )
        ), P) : je < 0 ? [...P, { item: q, quantity: Te, discount_minor: 0 }] : P.map(
          (Ut, Er) => Er === je ? { ...Ut, item: q, quantity: Te } : Ut
        );
      }), Ve(null), p.current?.focus());
    },
    [$, b]
  ), bi = (q) => {
    !q.trim() || $ || (p.current.value = "", Ln.current = Ln.current.then(async () => {
      ln(!0);
      try {
        const P = await Promise.all(
          ["barcode", "sku"].map(
            (Te) => s.request(
              `catalog/search?${zu({ [Te]: q.trim(), limit: 200 })}`
            )
          )
        ), je = Array.from(
          new Map(
            P.flatMap((Te) => Te.data).map((Te) => [Te.stock_id, Te])
          ).values()
        );
        if (!je.length)
          throw new Error(
            `No eligible product matches “${q}”. Search by name or check Products.`
          );
        if (P.some((Te) => Te.has_more))
          throw new Error(
            "This code matches more than 200 variants. Search by product name and choose an exact variant."
          );
        je.length === 1 ? Ba(je[0]) : Ve(je);
      } catch (P) {
        b(P);
      } finally {
        ln(!1);
      }
    }));
  }, Sl = async () => {
    if (!(!N.length || $ || gn.current)) {
      gn.current = !0, de(!0);
      try {
        await zn(
          { lines: N, customer: Ae },
          Ae?.name || `Held cart · ${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
        ), sa(), U.invalidateQueries({ queryKey: ["drafts", m] }), S("Cart held for this cashier and register.");
      } catch (q) {
        b(q);
      } finally {
        gn.current = !1, de(!1);
      }
    }
  }, Cu = async (q) => {
    if (N.length || $) {
      b(
        new Error(
          "Hold or clear the current cart before resuming another."
        )
      );
      return;
    }
    try {
      let P = q.payload.lines;
      q.payload.intent || (P = await Promise.all(
        P.map(async (je) => {
          const Te = await s.request(
            `catalog/search?stock_id=${je.item.stock_id}`
          );
          if (!Te.data.length)
            throw new Error(
              `${je.item.name} is no longer available for POS.`
            );
          return { ...je, item: Te.data[0] };
        })
      )), A(P), st(q.payload.customer || null), Rt({ id: q.id, revision: q.revision }), L(q.payload.intent || null), sessionStorage.setItem(Ke, q.id), te(!1), q.payload.intent && G(!0);
    } catch (P) {
      b(P);
    }
  }, En = async () => {
    try {
      const q = await Promise.all(
        N.map(async (P) => {
          const je = await s.request(
            `catalog/search?stock_id=${P.item.stock_id}`
          );
          if (!je.data[0])
            throw new Error(`${P.item.name} is unavailable.`);
          return { ...P, item: je.data[0] };
        })
      );
      A(q), S("Cart prices refreshed from your store.");
    } catch (q) {
      b(q);
    }
  }, _i = async (q) => {
    if (!gn.current) {
      gn.current = !0, de(!0);
      try {
        uE.parse(q.payload);
        const P = await zn(
          { lines: N, customer: Ae, intent: q },
          "Checkout awaiting response"
        );
        L(q);
        const je = await QS(s, q), Te = P;
        sa(), G(!1), s.mutate(
          `drafts/${Te.id}`,
          { revision: Te.revision },
          "DELETE",
          !0
        ).catch(() => {
        }), await y(je);
      } catch (P) {
        b(P), Uy(P) && L(null);
      } finally {
        gn.current = !1, de(!1);
      }
    }
  }, La = (q, P) => {
    if ($) return;
    const je = N[q];
    if (!(P < 1 || P > je.item.available_quantity))
      try {
        pl({ ...je, quantity: P }, c.max_discount_bps), A(
          N.map(
            (Te, Ut) => Ut === q ? { ...Te, quantity: P } : Te
          )
        );
      } catch (Te) {
        b(Te);
      }
  };
  return /* @__PURE__ */ o.jsxs("div", { className: "checkout-layout", children: [
    /* @__PURE__ */ o.jsxs("section", { className: "catalog-panel", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "catalog-tools", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "scan-box", children: [
          /* @__PURE__ */ o.jsx(bS, { size: 22 }),
          /* @__PURE__ */ o.jsx(
            "input",
            {
              ref: p,
              "aria-label": "Scan barcode or SKU",
              placeholder: "Scan a barcode or SKU",
              autoComplete: "off",
              disabled: !!$ || !h,
              onKeyDown: (q) => {
                (q.key === "Enter" || q.key === "Tab") && q.currentTarget.value && (q.preventDefault(), bi(q.currentTarget.value));
              }
            }
          ),
          /* @__PURE__ */ o.jsx("kbd", { children: "F2" })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "search-box", children: [
          /* @__PURE__ */ o.jsx(My, { size: 18 }),
          /* @__PURE__ */ o.jsx(
            "input",
            {
              "aria-label": "Search products",
              placeholder: "Search products by name…",
              value: M,
              onChange: (q) => Y(q.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "filters", children: [
          /* @__PURE__ */ o.jsxs(
            "select",
            {
              "aria-label": "Category",
              value: ee,
              onChange: (q) => {
                I(q.target.value), Ee(0);
              },
              children: [
                /* @__PURE__ */ o.jsx("option", { value: "", children: "All categories" }),
                O.categories.map((q) => /* @__PURE__ */ o.jsx("option", { value: q.id, children: q.name }, q.id))
              ]
            }
          ),
          /* @__PURE__ */ o.jsxs(
            "select",
            {
              "aria-label": "Brand",
              value: F,
              onChange: (q) => {
                oe(q.target.value), Ee(0);
              },
              children: [
                /* @__PURE__ */ o.jsx("option", { value: "", children: "All brands" }),
                O.brands.map((q) => /* @__PURE__ */ o.jsx("option", { value: q.id, children: q.name }, q.id))
              ]
            }
          ),
          /* @__PURE__ */ o.jsx("span", { children: wt ? "Looking up scan…" : `${mt.data?.data.length || 0} variants` })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "catalog-grid-wrap", children: [
        mt.isPending ? /* @__PURE__ */ o.jsx(yi, {}) : mt.error ? /* @__PURE__ */ o.jsx(
          la,
          {
            title: "Catalog unavailable",
            text: mt.error.message
          }
        ) : mt.data?.data.length ? /* @__PURE__ */ o.jsx("div", { className: "product-grid", children: mt.data.data.map((q, P) => /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "product-card",
            onClick: () => Ba(q),
            disabled: q.available_quantity < 1 || !!$,
            children: [
              /* @__PURE__ */ o.jsxs(
                "div",
                {
                  className: `product-art art-${P % 5}`,
                  children: [
                    q.image_url ? /* @__PURE__ */ o.jsx(
                      "img",
                      {
                        src: q.image_url,
                        alt: "",
                        loading: "lazy"
                      }
                    ) : /* @__PURE__ */ o.jsx(
                      bf,
                      {
                        size: 35,
                        strokeWidth: 1.25
                      }
                    ),
                    /* @__PURE__ */ o.jsx("span", { children: q.unit || "piece" }),
                    q.promotion_minor > 0 && /* @__PURE__ */ o.jsx(Ie, { tone: "amber", children: "Offer" })
                  ]
                }
              ),
              /* @__PURE__ */ o.jsxs("div", { className: "product-copy", children: [
                /* @__PURE__ */ o.jsx("strong", { children: q.name }),
                /* @__PURE__ */ o.jsx("small", { children: q.variant || q.sku || `Variant #${q.stock_id}` }),
                /* @__PURE__ */ o.jsxs("div", { children: [
                  /* @__PURE__ */ o.jsx("b", { children: R(q.unit_price_minor) }),
                  /* @__PURE__ */ o.jsx(
                    "span",
                    {
                      className: q.available_quantity < 1 ? "stock-out" : "",
                      children: q.available_quantity > 0 ? `${q.available_quantity} left` : "Out of stock"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ o.jsx("span", { className: "product-add", children: /* @__PURE__ */ o.jsx(qa, { size: 14 }) })
            ]
          },
          q.stock_id
        )) }) : /* @__PURE__ */ o.jsx(
          la,
          {
            title: "No products found",
            text: "Try a different search, or enable your products for POS.",
            icon: /* @__PURE__ */ o.jsx(bf, { size: 35 })
          }
        ),
        mt.data?.has_more && /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "load-more",
            onClick: () => Ee(mt.data.next_after),
            children: [
              "Next products ",
              /* @__PURE__ */ o.jsx(Y_, { size: 16 })
            ]
          }
        ),
        J > 0 && /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "load-more",
            onClick: () => Ee(0),
            children: "Back to first page"
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("footer", { className: "catalog-footer", children: [
        /* @__PURE__ */ o.jsx(F_, { size: 15 }),
        /* @__PURE__ */ o.jsxs("span", { children: [
          /* @__PURE__ */ o.jsx("kbd", { children: "F2" }),
          " Scan"
        ] }),
        /* @__PURE__ */ o.jsxs("span", { children: [
          /* @__PURE__ */ o.jsx("kbd", { children: "F4" }),
          " Held carts"
        ] }),
        /* @__PURE__ */ o.jsxs("span", { children: [
          /* @__PURE__ */ o.jsx("kbd", { children: "F8" }),
          " Payment"
        ] }),
        /* @__PURE__ */ o.jsx("span", { className: "pool-note", children: "One shared stock pool" })
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("section", { className: "cart-panel", children: [
      /* @__PURE__ */ o.jsxs("header", { className: "cart-heading", children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsxs("h2", { children: [
            "Current sale",
            " ",
            /* @__PURE__ */ o.jsx(Ie, { children: N.reduce((q, P) => q + P.quantity, 0) })
          ] }),
          /* @__PURE__ */ o.jsx("span", { children: Ot ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
            /* @__PURE__ */ o.jsx("i", { className: "live-dot" }),
            " Shift #",
            Ot.id,
            " open"
          ] }) : "Open a shift in Register to sell" })
        ] }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "icon-button",
            title: "Clear cart",
            "aria-label": "Clear cart",
            disabled: !!$ || !N.length,
            onClick: () => {
              confirm("Clear this unsaved cart?") && sa();
            },
            children: /* @__PURE__ */ o.jsx(CS, { size: 18 })
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs(
        "button",
        {
          className: "customer-button",
          onClick: () => j(!0),
          disabled: !!$,
          children: [
            /* @__PURE__ */ o.jsx("span", { className: "avatar", children: Ae?.name.charAt(0) || "W" }),
            /* @__PURE__ */ o.jsxs("span", { children: [
              /* @__PURE__ */ o.jsx("strong", { children: Ae?.name || "Walk-in customer" }),
              /* @__PURE__ */ o.jsx("small", { children: Ae ? "Receipt contact saved" : "Add receipt contact · optional" })
            ] }),
            /* @__PURE__ */ o.jsx(qa, { size: 17 })
          ]
        }
      ),
      /* @__PURE__ */ o.jsx("div", { className: "cart-lines", children: N.length ? N.map((q, P) => /* @__PURE__ */ o.jsxs("div", { className: "cart-line", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "line-info", children: [
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              className: "line-name",
              onClick: () => ye(P),
              disabled: !!$,
              children: [
                /* @__PURE__ */ o.jsx("strong", { children: q.item.name }),
                /* @__PURE__ */ o.jsx("small", { children: q.item.variant || q.item.sku })
              ]
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              className: "icon-button",
              "aria-label": `Remove ${q.item.name}`,
              disabled: !!$,
              onClick: () => A(
                N.filter(
                  (je, Te) => Te !== P
                )
              ),
              children: /* @__PURE__ */ o.jsx(Sr, { size: 14 })
            }
          )
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "line-controls", children: [
          /* @__PURE__ */ o.jsxs("div", { className: "quantity-control", children: [
            /* @__PURE__ */ o.jsx(
              "button",
              {
                "aria-label": `Decrease ${q.item.name}`,
                disabled: !!$ || q.quantity === 1,
                onClick: () => La(
                  P,
                  q.quantity - 1
                ),
                children: /* @__PURE__ */ o.jsx(tS, { size: 13 })
              }
            ),
            /* @__PURE__ */ o.jsx(
              "input",
              {
                "aria-label": `Quantity ${q.item.name}`,
                inputMode: "numeric",
                value: q.quantity,
                disabled: !!$,
                onChange: (je) => La(
                  P,
                  Number(je.target.value)
                )
              }
            ),
            /* @__PURE__ */ o.jsx(
              "button",
              {
                "aria-label": `Increase ${q.item.name}`,
                disabled: !!$,
                onClick: () => La(
                  P,
                  q.quantity + 1
                ),
                children: /* @__PURE__ */ o.jsx(qa, { size: 13 })
              }
            )
          ] }),
          /* @__PURE__ */ o.jsxs("small", { children: [
            R(
              q.override_minor ?? q.item.unit_price_minor
            ),
            " ",
            "each"
          ] }),
          /* @__PURE__ */ o.jsx("b", { children: R(pl(q).total_minor) })
        ] }),
        q.discount_minor > 0 && /* @__PURE__ */ o.jsxs("small", { className: "line-discount", children: [
          "Discount -",
          R(q.discount_minor)
        ] })
      ] }, q.item.stock_id)) : /* @__PURE__ */ o.jsx(
        la,
        {
          title: "Ready for the first item",
          text: "Scan a barcode or tap a product to begin.",
          icon: /* @__PURE__ */ o.jsx(_f, { size: 36 })
        }
      ) }),
      /* @__PURE__ */ o.jsxs("div", { className: "cart-total", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "total-row", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Subtotal" }),
          /* @__PURE__ */ o.jsx("span", { children: R(Dt.subtotal_minor) })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "total-row", children: [
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              className: "text-button",
              disabled: !g("discount:write") || !!$ || !N.length,
              onClick: () => {
                const q = prompt(
                  "Cart discount amount (replaces line discounts)"
                );
                if (q != null)
                  try {
                    A(
                      BS(
                        N,
                        kn(q),
                        c.max_discount_bps
                      )
                    );
                  } catch (P) {
                    b(P);
                  }
              },
              children: [
                "Discount",
                " ",
                g("discount:write") && /* @__PURE__ */ o.jsx(qa, { size: 12 })
              ]
            }
          ),
          /* @__PURE__ */ o.jsxs("span", { children: [
            "-",
            R(Dt.discount_minor)
          ] })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "total-row", children: [
          /* @__PURE__ */ o.jsxs("span", { children: [
            "Tax",
            " ",
            c.settings.tax_inclusive ? "(included)" : ""
          ] }),
          /* @__PURE__ */ o.jsx("span", { children: R(Dt.tax_minor) })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "total-due", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Total due" }),
          /* @__PURE__ */ o.jsx("strong", { children: R(Dt.total_minor) })
        ] }),
        Dt.error && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: Dt.error }),
        $ && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: "Checkout awaiting acknowledgment. Retry its saved identity before starting another sale." }),
        /* @__PURE__ */ o.jsxs("div", { className: "cart-actions", children: [
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              className: "secondary",
              disabled: ce || !!$ || !N.length || !h,
              onClick: Sl,
              children: [
                /* @__PURE__ */ o.jsx(rS, { size: 15 }),
                " Hold"
              ]
            }
          ),
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              className: "secondary",
              onClick: () => te(!0),
              disabled: !!$,
              children: [
                /* @__PURE__ */ o.jsx(kv, { size: 15 }),
                " Held",
                " ",
                /* @__PURE__ */ o.jsx(Ie, { children: un.data?.data.length || 0 })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "pay-button",
            disabled: ce || !h || !$ && (!Ot || !N.length || !!Dt.error || !g("sale:write")),
            onClick: () => G(!0),
            children: [
              /* @__PURE__ */ o.jsx(X_, { size: 19 }),
              /* @__PURE__ */ o.jsx("span", { children: $ ? "Resolve checkout" : "Take payment" }),
              /* @__PURE__ */ o.jsx("kbd", { children: "F8" })
            ]
          }
        )
      ] })
    ] }),
    Be && /* @__PURE__ */ o.jsxs(
      vn,
      {
        title: "Choose the exact variant",
        onClose: () => Ve(null),
        children: [
          /* @__PURE__ */ o.jsx("p", { className: "hint", children: "This code matches more than one stock variant." }),
          /* @__PURE__ */ o.jsx("div", { className: "option-list", children: Be.map((q) => /* @__PURE__ */ o.jsxs(
            "button",
            {
              onClick: () => Ba(q),
              disabled: q.available_quantity < 1,
              children: [
                /* @__PURE__ */ o.jsxs("div", { children: [
                  /* @__PURE__ */ o.jsx("strong", { children: q.name }),
                  /* @__PURE__ */ o.jsxs("small", { children: [
                    q.variant || q.sku,
                    " · #",
                    q.stock_id
                  ] })
                ] }),
                /* @__PURE__ */ o.jsx("b", { children: R(q.unit_price_minor) }),
                /* @__PURE__ */ o.jsxs(Ie, { children: [
                  q.available_quantity,
                  " left"
                ] })
              ]
            },
            q.stock_id
          )) })
        ]
      }
    ),
    le && /* @__PURE__ */ o.jsx(vn, { title: "Held carts", onClose: () => te(!1), children: un.data?.data.length ? /* @__PURE__ */ o.jsx("div", { className: "option-list", children: un.data.data.map((q) => /* @__PURE__ */ o.jsxs(
      "button",
      {
        onClick: () => Cu(q),
        children: [
          /* @__PURE__ */ o.jsxs("div", { children: [
            /* @__PURE__ */ o.jsx("strong", { children: q.label }),
            /* @__PURE__ */ o.jsxs("small", { children: [
              q.payload.lines.length,
              " lines ·",
              " ",
              new Date(
                q.updated_at
              ).toLocaleString()
            ] })
          ] }),
          q.payload.intent && /* @__PURE__ */ o.jsx(Ie, { tone: "amber", children: "Awaiting response" }),
          /* @__PURE__ */ o.jsx(kv, { size: 16 })
        ]
      },
      q.id
    )) }) : /* @__PURE__ */ o.jsx(
      la,
      {
        title: "No held carts",
        text: "Hold a cart to come back to it later."
      }
    ) }),
    $t && /* @__PURE__ */ o.jsx(
      xE,
      {
        value: Ae,
        onClose: () => j(!1),
        onSave: (q) => {
          st(q), j(!1);
        }
      }
    ),
    _e !== null && /* @__PURE__ */ o.jsx(
      jE,
      {
        line: N[_e],
        can: g,
        limit: c.max_discount_bps,
        onClose: () => ye(null),
        onSave: (q) => {
          A(
            N.map(
              (P, je) => je === _e ? q : P
            )
          ), ye(null);
        }
      }
    ),
    Xe && /* @__PURE__ */ o.jsx(
      OE,
      {
        total: Dt.total_minor,
        currency: c.currency,
        intent: $,
        busy: ce,
        online: h,
        onClose: () => G(!1),
        onPay: (q) => {
          if ($) {
            _i($);
            return;
          }
          if (!Ot) {
            b(
              new Error(
                "Open your register shift before checkout."
              )
            );
            return;
          }
          _i({
            key: hi(),
            payload: {
              client_sale_id: hi(),
              register_id: f,
              shift_id: Ot.id,
              currency: c.currency,
              grand_total_minor: Dt.total_minor,
              lines: HS(N, c.max_discount_bps),
              tenders: q,
              ...Ae ? { customer: Ae } : {}
            }
          });
        },
        onRefresh: En
      }
    )
  ] });
}
function xE({
  value: a,
  onClose: l,
  onSave: s
}) {
  const [c, f] = H.useState(a?.name || ""), [h, m] = H.useState(a?.email || ""), [p, y] = H.useState(a?.phone || "");
  return /* @__PURE__ */ o.jsxs(vn, { title: "Receipt contact", onClose: l, children: [
    /* @__PURE__ */ o.jsx("p", { className: "hint", children: "Optional contact details. Walk-in sales need no address or customer account." }),
    /* @__PURE__ */ o.jsxs(
      "form",
      {
        onSubmit: (b) => {
          b.preventDefault(), s({
            name: c,
            ...h ? { email: h } : {},
            ...p ? { phone: p } : {}
          });
        },
        children: [
          /* @__PURE__ */ o.jsx(He, { label: "Name", children: /* @__PURE__ */ o.jsx(
            "input",
            {
              value: c,
              onChange: (b) => f(b.target.value),
              required: !0,
              maxLength: 150
            }
          ) }),
          /* @__PURE__ */ o.jsx(He, { label: "Email (optional)", children: /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "email",
              value: h,
              onChange: (b) => m(b.target.value),
              maxLength: 200
            }
          ) }),
          /* @__PURE__ */ o.jsx(He, { label: "Phone (optional)", children: /* @__PURE__ */ o.jsx(
            "input",
            {
              value: p,
              onChange: (b) => y(b.target.value),
              maxLength: 30
            }
          ) }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal-actions", children: [
            /* @__PURE__ */ o.jsx(
              "button",
              {
                type: "button",
                className: "secondary",
                onClick: () => s(null),
                children: "Use walk-in"
              }
            ),
            /* @__PURE__ */ o.jsx("button", { className: "primary", children: "Save contact" })
          ] })
        ]
      }
    )
  ] });
}
function jE({
  line: a,
  can: l,
  limit: s,
  onClose: c,
  onSave: f
}) {
  const [h, m] = H.useState(hl(a.discount_minor)), [p, y] = H.useState(
    hl(a.override_minor ?? a.item.unit_price_minor)
  ), [b, S] = H.useState(a.override_reason || ""), [g, O] = H.useState("");
  return /* @__PURE__ */ o.jsxs(vn, { title: a.item.name, onClose: c, children: [
    /* @__PURE__ */ o.jsxs("p", { className: "hint", children: [
      a.item.variant || a.item.sku,
      " · Quantity ",
      a.quantity,
      " ",
      "· Discount limit ",
      s / 100,
      "%"
    ] }),
    /* @__PURE__ */ o.jsxs(
      "form",
      {
        onSubmit: (U) => {
          U.preventDefault();
          try {
            const R = kn(p), N = {
              ...a,
              discount_minor: kn(h),
              ...R !== a.item.unit_price_minor ? {
                override_minor: R,
                override_reason: b
              } : {
                override_minor: void 0,
                override_reason: void 0
              }
            };
            if (N.override_minor !== void 0 && b.length < 3)
              throw new Error("Explain the price override.");
            pl(N, s), f(N);
          } catch (R) {
            O(R.message);
          }
        },
        children: [
          /* @__PURE__ */ o.jsx(He, { label: "Line discount amount", children: /* @__PURE__ */ o.jsx(
            "input",
            {
              inputMode: "decimal",
              disabled: !l("discount:write"),
              value: h,
              onChange: (U) => m(U.target.value)
            }
          ) }),
          /* @__PURE__ */ o.jsx(He, { label: "Unit price", children: /* @__PURE__ */ o.jsx(
            "input",
            {
              inputMode: "decimal",
              disabled: !l("price:override"),
              value: p,
              onChange: (U) => y(U.target.value)
            }
          ) }),
          l("price:override") && /* @__PURE__ */ o.jsx(He, { label: "Price override reason", children: /* @__PURE__ */ o.jsx(
            "input",
            {
              value: b,
              onChange: (U) => S(U.target.value),
              maxLength: 500
            }
          ) }),
          g && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: g }),
          /* @__PURE__ */ o.jsxs("div", { className: "modal-actions", children: [
            /* @__PURE__ */ o.jsx(
              "button",
              {
                type: "button",
                className: "secondary",
                onClick: c,
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ o.jsx("button", { className: "primary", children: "Update item" })
          ] })
        ]
      }
    )
  ] });
}
function OE({
  total: a,
  currency: l,
  intent: s,
  busy: c,
  online: f,
  onClose: h,
  onPay: m,
  onRefresh: p
}) {
  const [y, b] = H.useState([
    {
      method: "cash",
      amount: hl(a),
      received: hl(a),
      reference: ""
    }
  ]), [S, g] = H.useState(""), O = (A, M) => b(
    y.map((Y, se) => se === A ? { ...Y, ...M } : Y)
  );
  let U = 0, R = 0;
  try {
    for (const A of y)
      U += kn(A.amount), A.method === "cash" && (R += Math.max(
        0,
        kn(A.received) - kn(A.amount)
      ));
  } catch {
  }
  const N = () => {
    try {
      if (s) {
        m(s.payload.tenders);
        return;
      }
      const A = y.map((M) => {
        const Y = kn(M.amount);
        if (Y <= 0)
          throw new Error("Tender amounts must be positive.");
        if (M.method === "cash") {
          const se = kn(M.received);
          if (se < Y)
            throw new Error(
              "Cash received is below the cash tender."
            );
          return {
            method: M.method,
            currency: l,
            amount_minor: Y,
            received_minor: se,
            change_minor: se - Y
          };
        }
        if (M.reference.trim().length < 3)
          throw new Error(
            "Enter the external terminal or transfer reference."
          );
        return {
          method: M.method,
          currency: l,
          amount_minor: Y,
          reference: M.reference.trim()
        };
      });
      if (A.reduce((M, Y) => M + Y.amount_minor, 0) !== a)
        throw new Error(
          "Split tender amounts must equal the total due."
        );
      g(""), m(A);
    } catch (A) {
      g(A.message);
    }
  };
  return /* @__PURE__ */ o.jsxs(
    vn,
    {
      title: s ? "Resolve saved checkout" : "Take payment",
      onClose: h,
      children: [
        /* @__PURE__ */ o.jsxs("div", { className: "payment-total", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Total due" }),
          /* @__PURE__ */ o.jsx("strong", { children: ct(
            s?.payload.grand_total_minor ?? a,
            l
          ) })
        ] }),
        s ? /* @__PURE__ */ o.jsxs("div", { className: "pending-intent", children: [
          /* @__PURE__ */ o.jsx(Ie, { tone: "amber", children: "Identity saved" }),
          /* @__PURE__ */ o.jsx("p", { children: "The previous response may have been lost. Retry this exact sale to retrieve its recorded result or complete it once." }),
          /* @__PURE__ */ o.jsx("code", { children: s.payload.client_sale_id })
        ] }) : /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsx("div", { className: "tender-list", children: y.map((A, M) => /* @__PURE__ */ o.jsxs("div", { className: "tender-row", children: [
            /* @__PURE__ */ o.jsxs("div", { className: "tender-heading", children: [
              /* @__PURE__ */ o.jsxs("strong", { children: [
                "Tender ",
                M + 1
              ] }),
              y.length > 1 && /* @__PURE__ */ o.jsx(
                "button",
                {
                  className: "icon-button",
                  "aria-label": "Remove tender",
                  onClick: () => b(
                    y.filter(
                      (Y, se) => se !== M
                    )
                  ),
                  children: /* @__PURE__ */ o.jsx(Sr, { size: 16 })
                }
              )
            ] }),
            /* @__PURE__ */ o.jsx(He, { label: "Method", children: /* @__PURE__ */ o.jsxs(
              "select",
              {
                value: A.method,
                onChange: (Y) => O(M, {
                  method: Y.target.value
                }),
                children: [
                  /* @__PURE__ */ o.jsx("option", { value: "cash", children: "Cash" }),
                  /* @__PURE__ */ o.jsx("option", { value: "external_terminal", children: "External card terminal" }),
                  /* @__PURE__ */ o.jsx("option", { value: "bank_transfer", children: "Bank transfer" })
                ]
              }
            ) }),
            /* @__PURE__ */ o.jsxs("div", { className: "form-grid", children: [
              /* @__PURE__ */ o.jsx(He, { label: "Amount applied", children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  "aria-label": `Tender ${M + 1} amount`,
                  inputMode: "decimal",
                  value: A.amount,
                  onChange: (Y) => O(M, {
                    amount: Y.target.value
                  })
                }
              ) }),
              A.method === "cash" ? /* @__PURE__ */ o.jsx(He, { label: "Cash received", children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  "aria-label": `Tender ${M + 1} cash received`,
                  inputMode: "decimal",
                  value: A.received,
                  onChange: (Y) => O(M, {
                    received: Y.target.value
                  })
                }
              ) }) : /* @__PURE__ */ o.jsx(He, { label: "Payment reference", children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  value: A.reference,
                  onChange: (Y) => O(M, {
                    reference: Y.target.value
                  }),
                  maxLength: 100
                }
              ) })
            ] }),
            A.method !== "cash" && /* @__PURE__ */ o.jsx("p", { className: "hint amber-text", children: "Recorded as pending. A supervisor must verify settlement evidence in Sales." })
          ] }, M)) }),
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              className: "text-button",
              disabled: y.length >= 10,
              onClick: () => b([
                ...y,
                {
                  method: "cash",
                  amount: hl(
                    Math.max(0, a - U)
                  ),
                  received: hl(
                    Math.max(0, a - U)
                  ),
                  reference: ""
                }
              ]),
              children: [
                /* @__PURE__ */ o.jsx(qa, { size: 15 }),
                " Add split tender"
              ]
            }
          ),
          /* @__PURE__ */ o.jsxs("div", { className: "payment-reconcile", children: [
            /* @__PURE__ */ o.jsxs("span", { children: [
              "Remaining",
              " ",
              /* @__PURE__ */ o.jsx("b", { children: ct(a - U, l) })
            ] }),
            /* @__PURE__ */ o.jsxs("span", { children: [
              "Cash change ",
              /* @__PURE__ */ o.jsx("b", { children: ct(R, l) })
            ] })
          ] })
        ] }),
        S && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: S }),
        /* @__PURE__ */ o.jsxs("div", { className: "modal-actions", children: [
          !s && /* @__PURE__ */ o.jsx(
            "button",
            {
              className: "secondary",
              disabled: c,
              onClick: () => {
                p(), h();
              },
              children: "Refresh prices"
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              className: "primary",
              disabled: c || !f,
              onClick: N,
              children: c ? "Recording sale…" : s ? "Retry saved checkout" : "Record sale"
            }
          )
        ] })
      ]
    }
  );
}
Bb.createRoot(document.getElementById("rewa-pos-root")).render(
  /* @__PURE__ */ o.jsx(H.StrictMode, { children: /* @__PURE__ */ o.jsx(Lb, { client: bE, children: /* @__PURE__ */ o.jsx(_E, {}) }) })
);
