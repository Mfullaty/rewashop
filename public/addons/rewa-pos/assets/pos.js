var tf = { exports: {} }, vu = {};
var gp;
function Rb() {
  if (gp) return vu;
  gp = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.fragment");
  function r(c, f, h) {
    var m = null;
    if (h !== void 0 && (m = "" + h), f.key !== void 0 && (m = "" + f.key), "key" in f) {
      h = {};
      for (var v in f)
        v !== "key" && (h[v] = f[v]);
    } else h = f;
    return f = h.ref, {
      $$typeof: a,
      type: c,
      key: m,
      ref: f !== void 0 ? f : null,
      props: h
    };
  }
  return vu.Fragment = l, vu.jsx = r, vu.jsxs = r, vu;
}
var bp;
function wb() {
  return bp || (bp = 1, tf.exports = Rb()), tf.exports;
}
var o = wb(), nf = { exports: {} }, ce = {};
var _p;
function Mb() {
  if (_p) return ce;
  _p = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), r = /* @__PURE__ */ Symbol.for("react.fragment"), c = /* @__PURE__ */ Symbol.for("react.strict_mode"), f = /* @__PURE__ */ Symbol.for("react.profiler"), h = /* @__PURE__ */ Symbol.for("react.consumer"), m = /* @__PURE__ */ Symbol.for("react.context"), v = /* @__PURE__ */ Symbol.for("react.forward_ref"), y = /* @__PURE__ */ Symbol.for("react.suspense"), b = /* @__PURE__ */ Symbol.for("react.memo"), S = /* @__PURE__ */ Symbol.for("react.lazy"), g = /* @__PURE__ */ Symbol.for("react.activity"), O = /* @__PURE__ */ Symbol.for("react.view_transition"), U = Symbol.iterator;
  function M(j) {
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
  }, A = Object.assign, w = {};
  function L(j, Y, te) {
    this.props = j, this.context = Y, this.refs = w, this.updater = te || N;
  }
  L.prototype.isReactComponent = {}, L.prototype.setState = function(j, Y) {
    if (typeof j != "object" && typeof j != "function" && j != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, j, Y, "setState");
  }, L.prototype.forceUpdate = function(j) {
    this.updater.enqueueForceUpdate(this, j, "forceUpdate");
  };
  function ue() {
  }
  ue.prototype = L.prototype;
  function me(j, Y, te) {
    this.props = j, this.context = Y, this.refs = w, this.updater = te || N;
  }
  var $ = me.prototype = new ue();
  $.constructor = me, A($, L.prototype), $.isPureReactComponent = !0;
  var I = Array.isArray;
  function W() {
  }
  var oe = { H: null, A: null, T: null, S: null }, et = Object.prototype.hasOwnProperty;
  function Be(j, Y, te) {
    var G = te.ref;
    return {
      $$typeof: a,
      type: j,
      key: Y,
      ref: G !== void 0 ? G : null,
      props: te
    };
  }
  function Je(j, Y) {
    return Be(j.type, Y, j.props);
  }
  function Pe(j) {
    return typeof j == "object" && j !== null && j.$$typeof === a;
  }
  function Rt(j) {
    var Y = { "=": "=0", ":": "=2" };
    return "$" + j.replace(/[=:]/g, function(te) {
      return Y[te];
    });
  }
  var ln = /\/+/g;
  function $e(j, Y) {
    return typeof j == "object" && j !== null && j.key != null ? Rt("" + j.key) : Y.toString(36);
  }
  function V(j) {
    switch (j.status) {
      case "fulfilled":
        return j.value;
      case "rejected":
        throw j.reason;
      default:
        switch (typeof j.status == "string" ? j.then(W, W) : (j.status = "pending", j.then(
          function(Y) {
            j.status === "pending" && (j.status = "fulfilled", j.value = Y);
          },
          function(Y) {
            j.status === "pending" && (j.status = "rejected", j.reason = Y);
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
  function ie(j, Y, te, G, Q) {
    var re = typeof j;
    (re === "undefined" || re === "boolean") && (j = null);
    var fe = !1;
    if (j === null) fe = !0;
    else
      switch (re) {
        case "bigint":
        case "string":
        case "number":
          fe = !0;
          break;
        case "object":
          switch (j.$$typeof) {
            case a:
            case l:
              fe = !0;
              break;
            case S:
              return fe = j._init, ie(
                fe(j._payload),
                Y,
                te,
                G,
                Q
              );
          }
      }
    if (fe)
      return Q = Q(j), fe = G === "" ? "." + $e(j, 0) : G, I(Q) ? (te = "", fe != null && (te = fe.replace(ln, "$&/") + "/"), ie(Q, Y, te, "", function(wt) {
        return wt;
      })) : Q != null && (Pe(Q) && (Q = Je(
        Q,
        te + (Q.key == null || j && j.key === Q.key ? "" : ("" + Q.key).replace(
          ln,
          "$&/"
        ) + "/") + fe
      )), Y.push(Q)), 1;
    fe = 0;
    var K = G === "" ? "." : G + ":";
    if (I(j))
      for (var se = 0; se < j.length; se++)
        G = j[se], re = K + $e(G, se), fe += ie(
          G,
          Y,
          te,
          re,
          Q
        );
    else if (se = M(j), typeof se == "function")
      for (j = se.call(j), se = 0; !(G = j.next()).done; )
        G = G.value, re = K + $e(G, se++), fe += ie(
          G,
          Y,
          te,
          re,
          Q
        );
    else if (re === "object") {
      if (typeof j.then == "function")
        return ie(
          V(j),
          Y,
          te,
          G,
          Q
        );
      throw Y = String(j), Error(
        "Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return fe;
  }
  function ee(j, Y, te) {
    if (j == null) return j;
    var G = [], Q = 0;
    return ie(j, G, "", "", function(re) {
      return Y.call(te, re, Q++);
    }), G;
  }
  function be(j) {
    if (j._status === -1) {
      var Y = j._result, te = Y();
      te.then(
        function(G) {
          (j._status === 0 || j._status === -1) && (j._status = 1, j._result = G, te.status === void 0 && (te.status = "fulfilled", te.value = G));
        },
        function(G) {
          (j._status === 0 || j._status === -1) && (j._status = 2, j._result = G, te.status === void 0 && (te.status = "rejected", te.reason = G));
        }
      ), j._status === -1 && (j._status = 0, j._result = te);
    }
    if (j._status === 1) return j._result.default;
    throw j._result;
  }
  var pe = typeof reportError == "function" ? reportError : function(j) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Y = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
        error: j
      });
      if (!window.dispatchEvent(Y)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", j);
      return;
    }
    console.error(j);
  };
  function Ne(j) {
    var Y = oe.T, te = {};
    te.types = Y !== null ? Y.types : null, oe.T = te;
    try {
      var G = j(), Q = oe.S;
      Q !== null && Q(te, G), typeof G == "object" && G !== null && typeof G.then == "function" && G.then(W, pe);
    } catch (re) {
      pe(re);
    } finally {
      Y !== null && te.types !== null && (Y.types = te.types), oe.T = Y;
    }
  }
  function st(j) {
    var Y = oe.T;
    if (Y !== null) {
      var te = Y.types;
      te === null ? Y.types = [j] : te.indexOf(j) === -1 && te.push(j);
    } else Ne(st.bind(null, j));
  }
  var $t = {
    map: ee,
    forEach: function(j, Y, te) {
      ee(
        j,
        function() {
          Y.apply(this, arguments);
        },
        te
      );
    },
    count: function(j) {
      var Y = 0;
      return ee(j, function() {
        Y++;
      }), Y;
    },
    toArray: function(j) {
      return ee(j, function(Y) {
        return Y;
      }) || [];
    },
    only: function(j) {
      if (!Pe(j))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return j;
    }
  };
  return ce.Activity = g, ce.Children = $t, ce.Component = L, ce.Fragment = r, ce.Profiler = f, ce.PureComponent = me, ce.StrictMode = c, ce.Suspense = y, ce.ViewTransition = O, ce.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = oe, ce.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(j) {
      return oe.H.useMemoCache(j);
    }
  }, ce.addTransitionType = st, ce.cache = function(j) {
    return function() {
      return j.apply(null, arguments);
    };
  }, ce.cacheSignal = function() {
    return null;
  }, ce.cloneElement = function(j, Y, te) {
    if (j == null)
      throw Error(
        "The argument must be a React element, but you passed " + j + "."
      );
    var G = A({}, j.props), Q = j.key;
    if (Y != null)
      for (re in Y.key !== void 0 && (Q = "" + Y.key), Y)
        !et.call(Y, re) || re === "key" || re === "__self" || re === "__source" || re === "ref" && Y.ref === void 0 || (G[re] = Y[re]);
    var re = arguments.length - 2;
    if (re === 1) G.children = te;
    else if (1 < re) {
      for (var fe = Array(re), K = 0; K < re; K++)
        fe[K] = arguments[K + 2];
      G.children = fe;
    }
    return Be(j.type, Q, G);
  }, ce.createContext = function(j) {
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
  }, ce.createElement = function(j, Y, te) {
    var G, Q = {}, re = null;
    if (Y != null)
      for (G in Y.key !== void 0 && (re = "" + Y.key), Y)
        et.call(Y, G) && G !== "key" && G !== "__self" && G !== "__source" && (Q[G] = Y[G]);
    var fe = arguments.length - 2;
    if (fe === 1) Q.children = te;
    else if (1 < fe) {
      for (var K = Array(fe), se = 0; se < fe; se++)
        K[se] = arguments[se + 2];
      Q.children = K;
    }
    if (j && j.defaultProps)
      for (G in fe = j.defaultProps, fe)
        Q[G] === void 0 && (Q[G] = fe[G]);
    return Be(j, re, Q);
  }, ce.createRef = function() {
    return { current: null };
  }, ce.forwardRef = function(j) {
    return { $$typeof: v, render: j };
  }, ce.isValidElement = Pe, ce.lazy = function(j) {
    return {
      $$typeof: S,
      _payload: { _status: -1, _result: j },
      _init: be
    };
  }, ce.memo = function(j, Y) {
    return {
      $$typeof: b,
      type: j,
      compare: Y === void 0 ? null : Y
    };
  }, ce.startTransition = Ne, ce.unstable_useCacheRefresh = function() {
    return oe.H.useCacheRefresh();
  }, ce.use = function(j) {
    return oe.H.use(j);
  }, ce.useActionState = function(j, Y, te) {
    return oe.H.useActionState(j, Y, te);
  }, ce.useCallback = function(j, Y) {
    return oe.H.useCallback(j, Y);
  }, ce.useContext = function(j) {
    return oe.H.useContext(j);
  }, ce.useDebugValue = function() {
  }, ce.useDeferredValue = function(j, Y) {
    return oe.H.useDeferredValue(j, Y);
  }, ce.useEffect = function(j, Y) {
    return oe.H.useEffect(j, Y);
  }, ce.useEffectEvent = function(j) {
    return oe.H.useEffectEvent(j);
  }, ce.useId = function() {
    return oe.H.useId();
  }, ce.useImperativeHandle = function(j, Y, te) {
    return oe.H.useImperativeHandle(j, Y, te);
  }, ce.useInsertionEffect = function(j, Y) {
    return oe.H.useInsertionEffect(j, Y);
  }, ce.useLayoutEffect = function(j, Y) {
    return oe.H.useLayoutEffect(j, Y);
  }, ce.useMemo = function(j, Y) {
    return oe.H.useMemo(j, Y);
  }, ce.useOptimistic = function(j, Y) {
    return oe.H.useOptimistic(j, Y);
  }, ce.useReducer = function(j, Y, te) {
    return oe.H.useReducer(j, Y, te);
  }, ce.useRef = function(j) {
    return oe.H.useRef(j);
  }, ce.useState = function(j) {
    return oe.H.useState(j);
  }, ce.useSyncExternalStore = function(j, Y, te) {
    return oe.H.useSyncExternalStore(
      j,
      Y,
      te
    );
  }, ce.useTransition = function() {
    return oe.H.useTransition();
  }, ce.version = "19.3.0", ce;
}
var Sp;
function Rf() {
  return Sp || (Sp = 1, nf.exports = Mb()), nf.exports;
}
var H = Rf(), af = { exports: {} }, pu = {}, lf = { exports: {} }, uf = {};
var xp;
function Db() {
  return xp || (xp = 1, (function(a) {
    function l(V, ie) {
      var ee = V.length;
      V.push(ie);
      e: for (; 0 < ee; ) {
        var be = ee - 1 >>> 1, pe = V[be];
        if (0 < f(pe, ie))
          V[be] = ie, V[ee] = pe, ee = be;
        else break e;
      }
    }
    function r(V) {
      return V.length === 0 ? null : V[0];
    }
    function c(V) {
      if (V.length === 0) return null;
      var ie = V[0], ee = V.pop();
      if (ee !== ie) {
        V[0] = ee;
        e: for (var be = 0, pe = V.length, Ne = pe >>> 1; be < Ne; ) {
          var st = 2 * (be + 1) - 1, $t = V[st], j = st + 1, Y = V[j];
          if (0 > f($t, ee))
            j < pe && 0 > f(Y, $t) ? (V[be] = Y, V[j] = ee, be = j) : (V[be] = $t, V[st] = ee, be = st);
          else if (j < pe && 0 > f(Y, ee))
            V[be] = Y, V[j] = ee, be = j;
          else break e;
        }
      }
      return ie;
    }
    function f(V, ie) {
      var ee = V.sortIndex - ie.sortIndex;
      return ee !== 0 ? ee : V.id - ie.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      a.unstable_now = function() {
        return h.now();
      };
    } else {
      var m = Date, v = m.now();
      a.unstable_now = function() {
        return m.now() - v;
      };
    }
    var y = [], b = [], S = 1, g = null, O = 3, U = !1, M = !1, N = !1, A = !1, w = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, ue = typeof setImmediate < "u" ? setImmediate : null;
    function me(V) {
      for (var ie = r(b); ie !== null; ) {
        if (ie.callback === null) c(b);
        else if (ie.startTime <= V)
          c(b), ie.sortIndex = ie.expirationTime, l(y, ie);
        else break;
        ie = r(b);
      }
    }
    function $(V) {
      if (N = !1, me(V), !M)
        if (r(y) !== null)
          M = !0, I || (I = !0, Pe());
        else {
          var ie = r(b);
          ie !== null && $e($, ie.startTime - V);
        }
    }
    var I = !1, W = -1, oe = 5, et = -1;
    function Be() {
      return A ? !0 : !(a.unstable_now() - et < oe);
    }
    function Je() {
      if (A = !1, I) {
        var V = a.unstable_now();
        et = V;
        var ie = !0;
        try {
          e: {
            M = !1, N && (N = !1, L(W), W = -1), U = !0;
            var ee = O;
            try {
              t: {
                for (me(V), g = r(y); g !== null && !(g.expirationTime > V && Be()); ) {
                  var be = g.callback;
                  if (typeof be == "function") {
                    g.callback = null, O = g.priorityLevel;
                    var pe = be(
                      g.expirationTime <= V
                    );
                    if (V = a.unstable_now(), typeof pe == "function") {
                      g.callback = pe, me(V), ie = !0;
                      break t;
                    }
                    g === r(y) && c(y), me(V);
                  } else c(y);
                  g = r(y);
                }
                if (g !== null) ie = !0;
                else {
                  var Ne = r(b);
                  Ne !== null && $e(
                    $,
                    Ne.startTime - V
                  ), ie = !1;
                }
              }
              break e;
            } finally {
              g = null, O = ee, U = !1;
            }
            ie = void 0;
          }
        } finally {
          ie ? Pe() : I = !1;
        }
      }
    }
    var Pe;
    if (typeof ue == "function")
      Pe = function() {
        ue(Je);
      };
    else if (typeof MessageChannel < "u") {
      var Rt = new MessageChannel(), ln = Rt.port2;
      Rt.port1.onmessage = Je, Pe = function() {
        ln.postMessage(null);
      };
    } else
      Pe = function() {
        w(Je, 0);
      };
    function $e(V, ie) {
      W = w(function() {
        V(a.unstable_now());
      }, ie);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, a.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : oe = 0 < V ? Math.floor(1e3 / V) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return O;
    }, a.unstable_next = function(V) {
      switch (O) {
        case 1:
        case 2:
        case 3:
          var ie = 3;
          break;
        default:
          ie = O;
      }
      var ee = O;
      O = ie;
      try {
        return V();
      } finally {
        O = ee;
      }
    }, a.unstable_requestPaint = function() {
      A = !0;
    }, a.unstable_runWithPriority = function(V, ie) {
      switch (V) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          V = 3;
      }
      var ee = O;
      O = V;
      try {
        return ie();
      } finally {
        O = ee;
      }
    }, a.unstable_scheduleCallback = function(V, ie, ee) {
      var be = a.unstable_now();
      switch (typeof ee == "object" && ee !== null ? (ee = ee.delay, ee = typeof ee == "number" && 0 < ee ? be + ee : be) : ee = be, V) {
        case 1:
          var pe = -1;
          break;
        case 2:
          pe = 250;
          break;
        case 5:
          pe = 1073741823;
          break;
        case 4:
          pe = 1e4;
          break;
        default:
          pe = 5e3;
      }
      return pe = ee + pe, V = {
        id: S++,
        callback: ie,
        priorityLevel: V,
        startTime: ee,
        expirationTime: pe,
        sortIndex: -1
      }, ee > be ? (V.sortIndex = ee, l(b, V), r(y) === null && V === r(b) && (N ? (L(W), W = -1) : N = !0, $e($, ee - be))) : (V.sortIndex = pe, l(y, V), M || U || (M = !0, I || (I = !0, Pe()))), V;
    }, a.unstable_shouldYield = Be, a.unstable_wrapCallback = function(V) {
      var ie = O;
      return function() {
        var ee = O;
        O = ie;
        try {
          return V.apply(this, arguments);
        } finally {
          O = ee;
        }
      };
    };
  })(uf)), uf;
}
var jp;
function Ub() {
  return jp || (jp = 1, lf.exports = Db()), lf.exports;
}
var sf = { exports: {} }, St = {};
var Op;
function Zb() {
  if (Op) return St;
  Op = 1;
  var a = Rf();
  function l(S) {
    var g = "https://react.dev/errors/" + S;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var O = 2; O < arguments.length; O++)
        g += "&args[]=" + encodeURIComponent(arguments[O]);
    }
    return "Minified React error #" + S + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function r() {
  }
  var c = {
    d: {
      f: r,
      r: function() {
        throw Error(l(522));
      },
      D: r,
      C: r,
      L: r,
      m: r,
      X: r,
      S: r,
      M: r
    },
    p: 0,
    findDOMNode: null
  }, f = /* @__PURE__ */ Symbol.for("react.portal"), h = /* @__PURE__ */ Symbol.for("react.recoverable"), m = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function v(S, g, O) {
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
    return v(S, g, null, O);
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
      var O = g.as, U = b(O, g.crossOrigin), M = typeof g.integrity == "string" ? g.integrity : void 0, N = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      O === "style" ? c.d.S(
        S,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: U,
          integrity: M,
          fetchPriority: N
        }
      ) : O === "script" && c.d.X(S, {
        crossOrigin: U,
        integrity: M,
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
var zp;
function _y() {
  if (zp) return sf.exports;
  zp = 1;
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
var Ep;
function qb() {
  if (Ep) return pu;
  Ep = 1;
  var a = Ub(), l = Rf(), r = _y();
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
  function v(e) {
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
      var s = u.alternate;
      if (s === null) {
        if (i = u.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (u.child === s.child) {
        for (s = u.child; s; ) {
          if (s === n) return y(u), e;
          if (s === i) return y(u), t;
          s = s.sibling;
        }
        throw Error(c(188));
      }
      if (n.return !== i.return) n = u, i = s;
      else {
        for (var d = !1, p = u.child; p; ) {
          if (p === n) {
            d = !0, n = u, i = s;
            break;
          }
          if (p === i) {
            d = !0, i = u, n = s;
            break;
          }
          p = p.sibling;
        }
        if (!d) {
          for (p = s.child; p; ) {
            if (p === n) {
              d = !0, n = s, i = u;
              break;
            }
            if (p === i) {
              d = !0, i = s, n = u;
              break;
            }
            p = p.sibling;
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
  function g(e, t, n, i, u, s) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, i, u, s) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && g(
        e.child,
        t,
        n,
        i,
        u,
        s
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
  function M(e) {
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
  var w = null, L = null;
  function ue(e, t, n) {
    return e === n ? !0 : e === t ? (w = e, !0) : !1;
  }
  function me(e, t, n) {
    return e === n ? (L = e, !1) : e === t ? (L !== null && (w = e), !0) : !1;
  }
  function $(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function I(e, t, n) {
    for (var i = 0, u = e; u; u = n(u)) i++;
    u = 0;
    for (var s = t; s; s = n(s)) u++;
    for (; 0 < i - u; ) e = n(e), i--;
    for (; 0 < u - i; ) t = n(t), u--;
    for (; i--; ) {
      if (e === t || t !== null && e === t.alternate)
        return e;
      e = n(e), t = n(t);
    }
    return null;
  }
  var W = Object.assign, oe = /* @__PURE__ */ Symbol.for("react.element"), et = /* @__PURE__ */ Symbol.for("react.transitional.element"), Be = /* @__PURE__ */ Symbol.for("react.portal"), Je = /* @__PURE__ */ Symbol.for("react.fragment"), Pe = /* @__PURE__ */ Symbol.for("react.strict_mode"), Rt = /* @__PURE__ */ Symbol.for("react.profiler"), ln = /* @__PURE__ */ Symbol.for("react.consumer"), $e = /* @__PURE__ */ Symbol.for("react.context"), V = /* @__PURE__ */ Symbol.for("react.forward_ref"), ie = /* @__PURE__ */ Symbol.for("react.suspense"), ee = /* @__PURE__ */ Symbol.for("react.suspense_list"), be = /* @__PURE__ */ Symbol.for("react.memo"), pe = /* @__PURE__ */ Symbol.for("react.lazy"), Ne = /* @__PURE__ */ Symbol.for("react.activity"), st = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), $t = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), j = /* @__PURE__ */ Symbol.for("react.view_transition"), Y = /* @__PURE__ */ Symbol.for("react.recoverable"), te = Symbol.iterator;
  function G(e) {
    return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Q = /* @__PURE__ */ Symbol.for("react.client.reference");
  function re(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Q ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Je:
        return "Fragment";
      case Rt:
        return "Profiler";
      case Pe:
        return "StrictMode";
      case ie:
        return "Suspense";
      case ee:
        return "SuspenseList";
      case Ne:
        return "Activity";
      case j:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Be:
          return "Portal";
        case $e:
          return e.displayName || "Context";
        case ln:
          return (e._context.displayName || "Context") + ".Consumer";
        case V:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case be:
          return t = e.displayName || null, t !== null ? t : re(e.type) || "Memo";
        case pe:
          t = e._payload, e = e._init;
          try {
            return re(e(t));
          } catch {
          }
      }
    return null;
  }
  var fe = Array.isArray, K = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, wt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, gn = [], Ln = -1;
  function Mt(e) {
    return { current: e };
  }
  function Ge(e) {
    0 > Ln || (e.current = gn[Ln], gn[Ln] = null, Ln--);
  }
  function Ue(e, t) {
    Ln++, gn[Ln] = e.current, e.current = t;
  }
  var Ot = Mt(null), un = Mt(null), mt = Mt(null), Dt = Mt(null);
  function sa(e, t) {
    switch (Ue(mt, t), Ue(un, e), Ue(Ot, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Tv(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = Tv(t), e = Nv(t, e);
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
    Ge(Ot), Ue(Ot, e);
  }
  function zn() {
    Ge(Ot), Ge(un), Ge(mt);
  }
  function Ba(e) {
    var t = e.memoizedState;
    t !== null && (sl._currentValue = t.memoizedState, Ue(Dt, e)), t = Ot.current;
    var n = Nv(t, e.type);
    t !== n && (Ue(un, e), Ue(Ot, n));
  }
  function bi(e) {
    un.current === e && (Ge(Ot), Ge(un)), Dt.current === e && (Ge(Dt), sl._currentValue = wt);
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
                } catch (X) {
                  var z = X;
                }
                Reflect.construct(e, [], k);
              } else {
                try {
                  k.call();
                } catch (X) {
                  z = X;
                }
                k = !1;
                try {
                  var R = Object.getOwnPropertyDescriptor(
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
                  k && (R !== void 0 ? Object.defineProperty(e.prototype, "props", R) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (X) {
                z = X;
              }
              (k = e()) && typeof k.catch == "function" && k.catch(function() {
              });
            }
          } catch (X) {
            if (X && z && typeof X.stack == "string")
              return [X.stack, z.stack];
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
      var s = i.DetermineComponentFrameRoot(), d = s[0], p = s[1];
      if (d && p) {
        var _ = d.split(`
`), T = p.split(`
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
  function Z(e, t) {
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
  function F(e) {
    try {
      var t = "", n = null;
      do
        t += Z(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var xe = Object.prototype.hasOwnProperty, ze = a.unstable_scheduleCallback, Ut = a.unstable_cancelCallback, Er = a.unstable_shouldYield, qg = a.unstable_requestPaint, Gt = a.unstable_now, kg = a.unstable_getCurrentPriorityLevel, If = a.unstable_ImmediatePriority, Ff = a.unstable_UserBlockingPriority, Au = a.unstable_NormalPriority, Hg = a.unstable_LowPriority, Pf = a.unstable_IdlePriority, Bg = a.log, Lg = a.unstable_setDisableYieldValue, xl = null, Vt = null;
  function ra(e) {
    if (typeof Bg == "function" && Lg(e), Vt && typeof Vt.setStrictMode == "function")
      try {
        Vt.setStrictMode(xl, e);
      } catch {
      }
  }
  var Xt = Math.clz32 ? Math.clz32 : $g, Qg = Math.log, Yg = Math.LN2;
  function $g(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (Qg(e) / Yg | 0) | 0;
  }
  var Ru = 256, wu = 262144, Mu = 4194304;
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
    var u = 0, s = e.suspendedLanes, d = e.pingedLanes;
    e = e.warmLanes;
    var p = i & 134217727;
    return p !== 0 ? (i = p & ~s, i !== 0 ? u = Qa(i) : (d &= p, d !== 0 ? u = Qa(d) : n || (n = p & ~e, n !== 0 && (u = Qa(n))))) : (p = i & ~s, p !== 0 ? u = Qa(p) : d !== 0 ? u = Qa(d) : n || (n = i & ~e, n !== 0 && (u = Qa(n)))), u === 0 ? 0 : t !== 0 && t !== u && (t & s) === 0 && (s = u & -u, n = t & -t, s >= n || s === 32 && (n & 4194048) !== 0) ? t : u;
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
  function Gg(e, t) {
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
  function Vg(e, t, n, i, u, s) {
    var d = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var p = e.entanglements, _ = e.expirationTimes, T = e.hiddenUpdates;
    for (n = d & ~n; 0 < n; ) {
      var D = 31 - Xt(n), k = 1 << D;
      p[D] = 0, _[D] = -1;
      var z = T[D];
      if (z !== null)
        for (T[D] = null, D = 0; D < z.length; D++) {
          var R = z[D];
          R !== null && (R.lane &= -536870913);
        }
      n &= ~k;
    }
    i !== 0 && td(e, i, 0), s !== 0 && u === 0 && e.tag !== 0 && (e.suspendedLanes |= s & ~(d & ~t));
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
    var e = se.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : fp(e.type));
  }
  function ld(e, t) {
    var n = se.p;
    try {
      return se.p = e, t();
    } finally {
      se.p = n;
    }
  }
  var Qn = Math.random().toString(36).slice(2), vt = "__reactFiber$" + Qn, Zt = "__reactProps$" + Qn, Si = "__reactContainer$" + Qn, ud = "__reactEvents$" + Qn, Xg = "__reactListeners$" + Qn, Kg = "__reactHandles$" + Qn, sd = "__reactResources$" + Qn, zl = "__reactMarker$" + Qn, Uu = "__reactLoad$" + Qn;
  function Zu(e) {
    delete e[vt], delete e[Zt], delete e[Xg], delete e[Kg];
  }
  function Ya(e) {
    var t;
    if (t = e[vt]) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[Si] || n[vt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = Gv(e); e !== null; ) {
            if (n = e[vt]) return n;
            e = Gv(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function xi(e) {
    if (e = e[vt] || e[Si]) {
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
  var Jg = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), fd = {}, dd = {};
  function Ig(e) {
    return xe.call(dd, e) ? !0 : xe.call(fd, e) ? !1 : Jg.test(e) ? dd[e] = !0 : (fd[e] = !0, !1);
  }
  var Ee = !1;
  function hd() {
    var e = Ee;
    return Ee = !1, e;
  }
  function qu(e, t, n) {
    if (Ig(t))
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
  function Fg(e, t, n) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var u = i.get, s = i.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return u.call(this);
        },
        set: function(d) {
          n = "" + d, s.call(this, d);
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
      e._valueTracker = Fg(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function vd(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), i = "";
    return e && (i = md(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
  }
  var Pg = /[\n"\\]/g;
  function sn(e) {
    return e.replace(
      Pg,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Rr(e, t, n, i, u, s, d, p) {
    e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? e.type = d : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Kt(t)) : e.value !== "" + Kt(t) && (e.value = "" + Kt(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? d === "number" && e.value == t ? wr(e, Kt(e.value)) : wr(e, Kt(t)) : n != null ? wr(e, Kt(n)) : i != null && e.removeAttribute("value"), u == null && s != null && (e.defaultChecked = !!s), u != null && (e.checked = u && typeof u != "function" && typeof u != "symbol"), p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" ? e.name = "" + Kt(p) : e.removeAttribute("name");
  }
  function pd(e, t, n, i, u, s, d, p) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.type = s), t != null || n != null) {
      if (!(s !== "submit" && s !== "reset" || t != null)) {
        Ar(e);
        return;
      }
      n = n != null ? "" + Kt(n) : "", t = t != null ? "" + Kt(t) : n, p || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? u, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = p ? e.checked : !!i, e.defaultChecked = !!i, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (e.name = d), Ar(e);
  }
  function wr(e, t) {
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
        if (fe(i)) {
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
  var Wg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function bd(e, t, n) {
    var i = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Wg.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function _d(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(c(62));
    if (e = e.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "", Ee = !0);
      for (var u in t)
        i = t[u], t.hasOwnProperty(u) && n[u] !== i && (bd(e, u, i), Ee = !0);
    } else
      for (var s in t)
        t.hasOwnProperty(s) && bd(e, s, t[s]);
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
  var e0 = /* @__PURE__ */ new Map([
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
  ]), t0 = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Hu(e) {
    return t0.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
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
      var n = e[Zt] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (Rr(
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
                var u = i[Zt] || null;
                if (!u) throw Error(c(90));
                Rr(
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
              i = n[t], i.form === e.form && vd(i);
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
  var Zr = !1;
  function xd(e, t, n) {
    if (Zr) return e(t, n);
    Zr = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (Zr = !1, (Ti !== null || Ni !== null) && (Hs(), Ti && (t = Ti, e = Ni, Ni = Ti = null, Sd(t), e)))
        for (t = 0; t < e.length; t++) Sd(e[t]);
    }
  }
  function Tl(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var i = n[Zt] || null;
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
  var $n = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), qr = !1;
  if ($n)
    try {
      var Nl = {};
      Object.defineProperty(Nl, "passive", {
        get: function() {
          qr = !0;
        }
      }), window.addEventListener("test", Nl, Nl), window.removeEventListener("test", Nl, Nl);
    } catch {
      qr = !1;
    }
  var ca = null, kr = null, Bu = null;
  function jd() {
    if (Bu) return Bu;
    var e, t = kr, n = t.length, i, u = "value" in ca ? ca.value : ca.textContent, s = u.length;
    for (e = 0; e < n && t[e] === u[e]; e++) ;
    var d = n - e;
    for (i = 1; i <= d && t[n - i] === u[s - i]; i++) ;
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
    function t(n, i, u, s, d) {
      this._reactName = n, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = d, this.currentTarget = null;
      for (var p in e)
        e.hasOwnProperty(p) && (n = e[p], this[p] = n ? n(s) : s[p]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? Qu : Od, this.isPropagationStopped = Od, this;
    }
    return W(t.prototype, {
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
  }, Yu = Et(oa), Cl = W({}, oa, { view: 0, detail: 0 }), n0 = Et(Cl), Hr, Br, Al, $u = W({}, Cl, {
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
  }), zd = Et($u), a0 = W({}, $u, { dataTransfer: 0 }), i0 = Et(a0), l0 = W({}, Cl, { relatedTarget: 0 }), Lr = Et(l0), u0 = W({}, oa, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), s0 = Et(u0), r0 = W({}, oa, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), c0 = Et(r0), o0 = W({}, oa, { data: 0 }), Ed = Et(o0), f0 = {
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
  }, d0 = {
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
  }, h0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function m0(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = h0[e]) ? !!t[e] : !1;
  }
  function Qr() {
    return m0;
  }
  var v0 = W({}, Cl, {
    key: function(e) {
      if (e.key) {
        var t = f0[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Lu(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? d0[e.keyCode] || "Unidentified" : "";
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
  }), p0 = Et(v0), y0 = W({}, $u, {
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
  }), Td = Et(y0), g0 = W({}, oa, { submitter: 0 }), b0 = Et(g0), _0 = W({}, Cl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Qr
  }), S0 = Et(_0), x0 = W({}, oa, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), j0 = Et(x0), O0 = W({}, $u, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), z0 = Et(O0), E0 = W({}, oa, {
    newState: 0,
    oldState: 0,
    source: 0
  }), T0 = Et(E0), N0 = [9, 13, 27, 32], Yr = $n && "CompositionEvent" in window, Rl = null;
  $n && "documentMode" in document && (Rl = document.documentMode);
  var C0 = $n && "TextEvent" in window && !Rl, Nd = $n && (!Yr || Rl && 8 < Rl && 11 >= Rl), Cd = " ", Ad = !1;
  function Rd(e, t) {
    switch (e) {
      case "keyup":
        return N0.indexOf(t.keyCode) !== -1;
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
  function wd(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var Ci = !1;
  function A0(e, t) {
    switch (e) {
      case "compositionend":
        return wd(t);
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
      return e === "compositionend" || !Yr && Rd(e, t) ? (e = jd(), Bu = kr = ca = null, Ci = !1, e) : null;
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
  var w0 = {
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
    return t === "input" ? !!w0[e.type] : t === "textarea";
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
  var wl = null, Ml = null;
  function M0(e) {
    Sv(e, 0);
  }
  function Gu(e) {
    var t = El(e);
    if (vd(t)) return e;
  }
  function Ud(e, t) {
    if (e === "change") return t;
  }
  var Zd = !1;
  if ($n) {
    var $r;
    if ($n) {
      var Gr = "oninput" in document;
      if (!Gr) {
        var qd = document.createElement("div");
        qd.setAttribute("oninput", "return;"), Gr = typeof qd.oninput == "function";
      }
      $r = Gr;
    } else $r = !1;
    Zd = $r && (!document.documentMode || 9 < document.documentMode);
  }
  function kd() {
    wl && (wl.detachEvent("onpropertychange", Hd), Ml = wl = null);
  }
  function Hd(e) {
    if (e.propertyName === "value" && Gu(Ml)) {
      var t = [];
      Dd(
        t,
        Ml,
        e,
        Ur(e)
      ), xd(M0, t);
    }
  }
  function D0(e, t, n) {
    e === "focusin" ? (kd(), wl = t, Ml = n, wl.attachEvent("onpropertychange", Hd)) : e === "focusout" && kd();
  }
  function U0(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Gu(Ml);
  }
  function Z0(e, t) {
    if (e === "click") return Gu(t);
  }
  function q0(e, t) {
    if (e === "input" || e === "change")
      return Gu(t);
  }
  function k0(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Jt = typeof Object.is == "function" ? Object.is : k0;
  function Dl(e, t) {
    if (Jt(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), i = Object.keys(t);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var u = n[i];
      if (!xe.call(t, u) || !Jt(e[u], t[u]))
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
  var H0 = $n && "documentMode" in document && 11 >= document.documentMode, Ai = null, Kr = null, Ul = null, Jr = !1;
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
  var Ri = {
    animationend: Ga("Animation", "AnimationEnd"),
    animationiteration: Ga("Animation", "AnimationIteration"),
    animationstart: Ga("Animation", "AnimationStart"),
    transitionrun: Ga("Transition", "TransitionRun"),
    transitionstart: Ga("Transition", "TransitionStart"),
    transitioncancel: Ga("Transition", "TransitionCancel"),
    transitionend: Ga("Transition", "TransitionEnd")
  }, Ir = {}, Gd = {};
  $n && (Gd = document.createElement("div").style, "AnimationEvent" in window || (delete Ri.animationend.animation, delete Ri.animationiteration.animation, delete Ri.animationstart.animation), "TransitionEvent" in window || delete Ri.transitionend.transition);
  function Va(e) {
    if (Ir[e]) return Ir[e];
    if (!Ri[e]) return e;
    var t = Ri[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Gd)
        return Ir[e] = t[n];
    return e;
  }
  var Vd = Va("animationend"), Xd = Va("animationiteration"), Kd = Va("animationstart"), B0 = Va("transitionrun"), L0 = Va("transitionstart"), Q0 = Va("transitioncancel"), Jd = Va("transitionend"), Id = /* @__PURE__ */ new Map(), Fr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Fr.push("scrollEnd");
  function bn(e, t) {
    Id.set(e, t), $a(t, [e]);
  }
  var Y0 = 0;
  function Gn(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = jn.identifierPrefix;
    var n = Y0++;
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
  }, rn = [], wi = 0, Pr = 0;
  function Xu() {
    for (var e = wi, t = Pr = wi = 0; t < e; ) {
      var n = rn[t];
      rn[t++] = null;
      var i = rn[t];
      rn[t++] = null;
      var u = rn[t];
      rn[t++] = null;
      var s = rn[t];
      if (rn[t++] = null, i !== null && u !== null) {
        var d = i.pending;
        d === null ? u.next = u : (u.next = d.next, d.next = u), i.pending = u;
      }
      s !== 0 && Pd(n, u, s);
    }
  }
  function Ku(e, t, n, i) {
    rn[wi++] = e, rn[wi++] = t, rn[wi++] = n, rn[wi++] = i, Pr |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
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
    for (var u = !1, s = e.return; s !== null; )
      s.childLanes |= n, i = s.alternate, i !== null && (i.childLanes |= n), s.tag === 22 && (e = s.stateNode, e === null || e._visibility & 1 || (u = !0)), e = s, s = s.return;
    return e.tag === 3 ? (s = e.stateNode, u && t !== null && (u = 31 - Xt(n), e = s.hiddenUpdates, i = e[u], i === null ? e[u] = [t] : i.push(t), t.lane = n | 536870912), s) : null;
  }
  function Ju(e) {
    if (50 < au)
      throw au = 0, ks = null, Error(c(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var Mi = {};
  function $0(e, t, n, i) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function qt(e, t, n, i) {
    return new $0(e, t, n, i);
  }
  function ec(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Xn(e, t) {
    var n = e.alternate;
    return n === null ? (n = qt(
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
  function Iu(e, t, n, i, u, s) {
    var d = 0;
    if (i = e, typeof i == "function") ec(i) && (d = 1);
    else if (typeof i == "string")
      d = gb(
        e,
        n,
        Ot.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (i) {
        case Ne:
          return e = qt(31, n, t, u), e.elementType = Ne, e.lanes = s, e;
        case Je:
          return Ka(n.children, u, s, t);
        case Pe:
          d = 8, u |= 24;
          break;
        case Rt:
          return e = qt(12, n, t, u | 2), e.elementType = Rt, e.lanes = s, e;
        case ie:
          return e = qt(13, n, t, u), e.elementType = ie, e.lanes = s, e;
        case ee:
          return e = qt(19, n, t, u), e.elementType = ee, e.lanes = s, e;
        case st:
        case j:
          return e = u | 32, e = qt(30, n, t, e), e.elementType = j, e.lanes = s, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof i == "object" && i !== null)
            switch (i.$$typeof) {
              case $e:
                d = 10;
                break e;
              case ln:
                d = 9;
                break e;
              case V:
                d = 11;
                break e;
              case be:
                d = 14;
                break e;
              case pe:
                d = 16, i = null;
                break e;
            }
          d = 29, n = Error(
            c(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return t = qt(d, n, t, u), t.elementType = e, t.type = i, t.lanes = s, t;
  }
  function Ka(e, t, n, i) {
    return e = qt(7, e, i, t), e.lanes = n, e;
  }
  function tc(e, t, n) {
    return e = qt(6, e, null, t), e.lanes = n, e;
  }
  function eh(e) {
    var t = qt(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function nc(e, t, n) {
    return t = qt(
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
        stack: F(t)
      }, th.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: F(t)
    };
  }
  var Di = [], Ui = 0, Fu = null, Zl = 0, on = [], fn = 0, fa = null, Nn = 1, Cn = "";
  function Kn(e, t) {
    Di[Ui++] = Zl, Di[Ui++] = Fu, Fu = e, Zl = t;
  }
  function nh(e, t, n) {
    on[fn++] = Nn, on[fn++] = Cn, on[fn++] = fa, fa = e;
    var i = Nn;
    e = Cn;
    var u = 32 - Xt(i) - 1;
    i &= ~(1 << u), n += 1;
    var s = 32 - Xt(t) + u;
    if (30 < s) {
      var d = u - u % 5;
      s = (i & (1 << d) - 1).toString(32), i >>= d, u -= d, Nn = 1 << 32 - Xt(t) + u | n << u | i, Cn = s + e;
    } else
      Nn = 1 << s | n << u | i, Cn = e;
  }
  function Pu(e) {
    e.return !== null && (Kn(e, 1), nh(e, 1, 0));
  }
  function ac(e) {
    for (; e === Fu; )
      Fu = Di[--Ui], Di[Ui] = null, Zl = Di[--Ui], Di[Ui] = null;
    for (; e === fa; )
      fa = on[--fn], on[fn] = null, Cn = on[--fn], on[fn] = null, Nn = on[--fn], on[fn] = null;
  }
  function ah(e, t) {
    on[fn++] = Nn, on[fn++] = Cn, on[fn++] = fa, Nn = t.id, Cn = t.overflow, fa = e;
  }
  var ft = null, qe = null, ve = !1, da = null, dn = !1, ic = Error(c(519));
  function ha(e) {
    var t = Error(
      c(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw ql(cn(t, e)), ic;
  }
  function ih(e) {
    var t = e.stateNode, n = e.type, i = e.memoizedProps;
    switch (t[vt] = e, t[Zt] = i, n) {
      case "dialog":
        ge("cancel", t), ge("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        ge("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < lu.length; n++)
          ge(lu[n], t);
        break;
      case "source":
        ge("error", t);
        break;
      case "img":
      case "image":
      case "link":
        ge("error", t), ge("load", t);
        break;
      case "details":
        ge("toggle", t);
        break;
      case "input":
        ge("invalid", t), pd(
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
        ge("invalid", t);
        break;
      case "textarea":
        ge("invalid", t), gd(t, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || i.suppressHydrationWarning === !0 || zv(t.textContent, n) ? (i.popover != null && (ge("beforetoggle", t), ge("toggle", t)), i.onScroll != null && ge("scroll", t), i.onScrollEnd != null && ge("scrollend", t), i.onClick != null && (t.onclick = Tn), t = !0) : t = !1, t || ha(e, !0);
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
  function Zi(e) {
    if (e !== ft) return !1;
    if (!ve) return Wu(e), ve = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Uo(e.type, e.memoizedProps)), n = !n), n && qe && ha(e), Wu(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      qe = $v(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(317));
      qe = $v(e);
    } else
      t === 27 ? (t = qe, Ca(e.type) ? (e = $o, $o = null, qe = e) : qe = t) : qe = ft ? mn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ja() {
    qe = ft = null, ve = !1;
  }
  function lc() {
    var e = da;
    return e !== null && (Bt === null ? Bt = e : Bt.push.apply(
      Bt,
      e
    ), da = null), e;
  }
  function ql(e) {
    da === null ? da = [e] : da.push(e);
  }
  var uc = Mt(null), Ia = null, Jn = null;
  function ma(e, t, n) {
    Ue(uc, t._currentValue), t._currentValue = n;
  }
  function In(e) {
    e._currentValue = uc.current, Ge(uc);
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
      var s = u.dependencies;
      if (s !== null) {
        var d = u.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var p = s;
          s = u;
          for (var _ = 0; _ < t.length; _++)
            if (p.context === t[_]) {
              s.lanes |= n, p = s.alternate, p !== null && (p.lanes |= n), es(
                s.return,
                n,
                e
              ), i || (d = null);
              break e;
            }
          s = p.next;
        }
      } else if (u.tag === 18) {
        if (d = u.return, d === null) throw Error(c(341));
        d.lanes |= n, s = d.alternate, s !== null && (s.lanes |= n), es(d, n, e), d = null;
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
    for (var u = t, s = !1; u !== null; ) {
      if (!s) {
        if ((u.flags & 524288) !== 0) s = !0;
        else if ((u.flags & 262144) !== 0) break;
      }
      if (u.tag === 10) {
        var d = u.alternate;
        if (d === null) throw Error(c(387));
        if (d = d.memoizedProps, d !== null) {
          var p = u.type;
          Jt(u.pendingProps.value, d.value) || (e !== null ? e.push(p) : e = [p]);
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
  function pt(e) {
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
  var G0 = typeof AbortController < "u" ? AbortController : function() {
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
  }, V0 = a.unstable_scheduleCallback, X0 = a.unstable_NormalPriority, tt = {
    $$typeof: $e,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function rc() {
    return {
      controller: new G0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function kl(e) {
    e.refCount--, e.refCount === 0 && V0(X0, function() {
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
  function K0(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var Bl = null, cc = 0, Wa = 0, qi = null;
  function J0(e, t) {
    if (Bl === null) {
      var n = Bl = [];
      cc = 0, Wa = Eo(), qi = {
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
      qi !== null && (qi.status = "fulfilled");
      var e = Bl;
      Bl = null, Wa = 0, qi = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function I0(e, t) {
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
  var rh = K.S;
  K.S = function(e, t) {
    if (ev = Gt(), typeof t == "object" && t !== null && typeof t.then == "function" && J0(e, t), Hl !== null)
      for (var n = tl; n !== null; )
        uh(n, Hl), n = n.next;
    if (n = e.types, n !== null) {
      for (var i = tl; i !== null; )
        uh(i, n), i = i.next;
      if (Wa !== 0) {
        i = Hl, i === null && (i = Hl = []);
        for (var u = 0; u < n.length; u++) {
          var s = n[u];
          i.indexOf(s) === -1 && i.push(s);
        }
      }
    }
    rh !== null && rh(e, t);
  };
  var ei = Mt(null);
  function oc() {
    var e = ei.current;
    return e !== null ? e : Ze.pooledCache;
  }
  function as(e, t) {
    t === null ? Ue(ei, ei.current) : Ue(ei, t.pool);
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
          if (e = Ze, e !== null && 100 < e.shellSuspendCounter)
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
  function va(e, t) {
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
    function s(E, x, C) {
      return E.index = C, e ? (C = E.alternate, C !== null ? (C = C.index, C < x ? (E.flags |= 2, x) : C) : (E.flags |= 134217730, x)) : (E.flags |= 1048576, x);
    }
    function d(E) {
      return e && E.alternate === null && (E.flags |= 134217730), E;
    }
    function p(E, x, C, q) {
      return x === null || x.tag !== 6 ? (x = tc(C, E.mode, q), x.return = E, x) : (x = u(x, C), x.return = E, x);
    }
    function _(E, x, C, q) {
      var J = C.type;
      return J === Je ? (E = D(
        E,
        x,
        C.props.children,
        q,
        C.key
      ), va(E, C), E) : x !== null && (x.elementType === J || typeof J == "object" && J !== null && J.$$typeof === pe && ti(J) === x.type) ? (x = u(x, C.props), va(x, C), x.return = E, x) : (x = Iu(
        C.type,
        C.key,
        C.props,
        null,
        E.mode,
        q
      ), va(x, C), x.return = E, x);
    }
    function T(E, x, C, q) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== C.containerInfo || x.stateNode.implementation !== C.implementation ? (x = nc(C, E.mode, q), x.return = E, x) : (x = u(x, C.children || []), x.return = E, x);
    }
    function D(E, x, C, q, J) {
      return x === null || x.tag !== 7 ? (x = Ka(
        C,
        E.mode,
        q,
        J
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
          case et:
            return C = Iu(
              x.type,
              x.key,
              x.props,
              null,
              E.mode,
              C
            ), va(C, x), C.return = E, C;
          case Be:
            return x = nc(
              x,
              E.mode,
              C
            ), x.return = E, x;
          case pe:
            return x = ti(x), k(E, x, C);
        }
        if (fe(x) || G(x))
          return x = Ka(
            x,
            E.mode,
            C,
            null
          ), x.return = E, x;
        if (typeof x.then == "function")
          return k(E, us(x), C);
        if (x.$$typeof === $e)
          return k(
            E,
            ns(E, x),
            C
          );
        ss(E, x);
      }
      return null;
    }
    function z(E, x, C, q) {
      var J = x !== null ? x.key : null;
      if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint")
        return J !== null ? null : p(E, x, "" + C, q);
      if (typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case et:
            return C.key === J ? _(E, x, C, q) : null;
          case Be:
            return C.key === J ? T(E, x, C, q) : null;
          case pe:
            return C = ti(C), z(E, x, C, q);
        }
        if (fe(C) || G(C))
          return J !== null ? null : D(E, x, C, q, null);
        if (typeof C.then == "function")
          return z(
            E,
            x,
            us(C),
            q
          );
        if (C.$$typeof === $e)
          return z(
            E,
            x,
            ns(E, C),
            q
          );
        ss(E, C);
      }
      return null;
    }
    function R(E, x, C, q, J) {
      if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint")
        return E = E.get(C) || null, p(x, E, "" + q, J);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case et:
            return E = E.get(
              q.key === null ? C : q.key
            ) || null, _(x, E, q, J);
          case Be:
            return E = E.get(
              q.key === null ? C : q.key
            ) || null, T(x, E, q, J);
          case pe:
            return q = ti(q), R(
              E,
              x,
              C,
              q,
              J
            );
        }
        if (fe(q) || G(q))
          return E = E.get(C) || null, D(x, E, q, J, null);
        if (typeof q.then == "function")
          return R(
            E,
            x,
            C,
            us(q),
            J
          );
        if (q.$$typeof === $e)
          return R(
            E,
            x,
            C,
            ns(x, q),
            J
          );
        ss(x, q);
      }
      return null;
    }
    function X(E, x, C, q) {
      for (var J = null, Se = null, ne = x, le = x = 0, it = null; ne !== null && le < C.length; le++) {
        ne.index > le ? (it = ne, ne = null) : it = ne.sibling;
        var je = z(
          E,
          ne,
          C[le],
          q
        );
        if (je === null) {
          ne === null && (ne = it);
          break;
        }
        e && ne && je.alternate === null && t(E, ne), x = s(je, x, le), Se === null ? J = je : Se.sibling = je, Se = je, ne = it;
      }
      if (le === C.length)
        return n(E, ne), ve && Kn(E, le), J;
      if (ne === null) {
        for (; le < C.length; le++)
          ne = k(E, C[le], q), ne !== null && (x = s(
            ne,
            x,
            le
          ), Se === null ? J = ne : Se.sibling = ne, Se = ne);
        return ve && Kn(E, le), J;
      }
      for (ne = i(ne); le < C.length; le++)
        it = R(
          ne,
          E,
          le,
          C[le],
          q
        ), it !== null && (e && (je = it.alternate, je !== null && ne.delete(je.key === null ? le : je.key)), x = s(
          it,
          x,
          le
        ), Se === null ? J = it : Se.sibling = it, Se = it);
      return e && ne.forEach(function(Da) {
        return t(E, Da);
      }), ve && Kn(E, le), J;
    }
    function P(E, x, C, q) {
      if (C == null) throw Error(c(151));
      for (var J = null, Se = null, ne = x, le = x = 0, it = null, je = C.next(); ne !== null && !je.done; le++, je = C.next()) {
        ne.index > le ? (it = ne, ne = null) : it = ne.sibling;
        var Da = z(E, ne, je.value, q);
        if (Da === null) {
          ne === null && (ne = it);
          break;
        }
        e && ne && Da.alternate === null && t(E, ne), x = s(Da, x, le), Se === null ? J = Da : Se.sibling = Da, Se = Da, ne = it;
      }
      if (je.done)
        return n(E, ne), ve && Kn(E, le), J;
      if (ne === null) {
        for (; !je.done; le++, je = C.next())
          je = k(E, je.value, q), je !== null && (x = s(je, x, le), Se === null ? J = je : Se.sibling = je, Se = je);
        return ve && Kn(E, le), J;
      }
      for (ne = i(ne); !je.done; le++, je = C.next())
        je = R(ne, E, le, je.value, q), je !== null && (e && (it = je.alternate, it !== null && ne.delete(
          it.key === null ? le : it.key
        )), x = s(je, x, le), Se === null ? J = je : Se.sibling = je, Se = je);
      return e && ne.forEach(function(Ab) {
        return t(E, Ab);
      }), ve && Kn(E, le), J;
    }
    function he(E, x, C, q) {
      if (typeof C == "object" && C !== null && C.type === Je && C.key === null && C.props.ref === void 0 && (C = C.props.children), typeof C == "object" && C !== null) {
        switch (C.$$typeof) {
          case et:
            e: {
              for (var J = C.key; x !== null; ) {
                if (x.key === J) {
                  if (J = C.type, J === Je) {
                    if (x.tag === 7) {
                      n(
                        E,
                        x.sibling
                      ), q = u(
                        x,
                        C.props.children
                      ), va(q, C), q.return = E, E = q;
                      break e;
                    }
                  } else if (x.elementType === J || typeof J == "object" && J !== null && J.$$typeof === pe && ti(J) === x.type) {
                    n(
                      E,
                      x.sibling
                    ), q = u(x, C.props), va(q, C), q.return = E, E = q;
                    break e;
                  }
                  n(E, x);
                  break;
                } else t(E, x);
                x = x.sibling;
              }
              C.type === Je ? (q = Ka(
                C.props.children,
                E.mode,
                q,
                C.key
              ), va(q, C), q.return = E, E = q) : (q = Iu(
                C.type,
                C.key,
                C.props,
                null,
                E.mode,
                q
              ), va(q, C), q.return = E, E = q);
            }
            return d(E);
          case Be:
            e: {
              for (J = C.key; x !== null; ) {
                if (x.key === J)
                  if (x.tag === 4 && x.stateNode.containerInfo === C.containerInfo && x.stateNode.implementation === C.implementation) {
                    n(
                      E,
                      x.sibling
                    ), q = u(x, C.children || []), q.return = E, E = q;
                    break e;
                  } else {
                    n(E, x);
                    break;
                  }
                else t(E, x);
                x = x.sibling;
              }
              q = nc(C, E.mode, q), q.return = E, E = q;
            }
            return d(E);
          case pe:
            return C = ti(C), he(
              E,
              x,
              C,
              q
            );
        }
        if (fe(C))
          return X(
            E,
            x,
            C,
            q
          );
        if (G(C)) {
          if (J = G(C), typeof J != "function") throw Error(c(150));
          return C = J.call(C), P(
            E,
            x,
            C,
            q
          );
        }
        if (typeof C.then == "function")
          return he(
            E,
            x,
            us(C),
            q
          );
        if (C.$$typeof === $e)
          return he(
            E,
            x,
            ns(E, C),
            q
          );
        ss(E, C);
      }
      return typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint" ? (C = "" + C, x !== null && x.tag === 6 ? (n(E, x.sibling), q = u(x, C), q.return = E, E = q) : (n(E, x), q = tc(C, E.mode, q), q.return = E, E = q), d(E)) : n(E, x);
    }
    return function(E, x, C, q) {
      try {
        Ll = 0;
        var J = he(
          E,
          x,
          C,
          q
        );
        return Hi = null, J;
      } catch (ne) {
        if (ne === ki || ne === is) throw ne;
        var Se = qt(29, ne, null, E.mode);
        return Se.lanes = q, Se.return = E, Se;
      }
    };
  }
  var ai = mh(!0), vh = mh(!1), pa = !1;
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
    if (i = i.shared, (Te & 2) !== 0) {
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
      var u = null, s = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var d = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          s === null ? u = s = d : s = s.next = d, n = n.next;
        } while (n !== null);
        s === null ? u = s = t : s = s.next = t;
      } else u = s = t;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: u,
        lastBaseUpdate: s,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var vc = !1;
  function Yl() {
    if (vc) {
      var e = qi;
      if (e !== null) throw e;
    }
  }
  function $l(e, t, n, i) {
    vc = !1;
    var u = e.updateQueue;
    pa = !1;
    var s = u.firstBaseUpdate, d = u.lastBaseUpdate, p = u.shared.pending;
    if (p !== null) {
      u.shared.pending = null;
      var _ = p, T = _.next;
      _.next = null, d === null ? s = T : d.next = T, d = _;
      var D = e.alternate;
      D !== null && (D = D.updateQueue, p = D.lastBaseUpdate, p !== d && (p === null ? D.firstBaseUpdate = T : p.next = T, D.lastBaseUpdate = _));
    }
    if (s !== null) {
      var k = u.baseState;
      d = 0, D = T = _ = null, p = s;
      do {
        var z = p.lane & -536870913, R = z !== p.lane;
        if (R ? (_e & z) === z : (i & z) === z) {
          z !== 0 && z === Wa && (vc = !0), D !== null && (D = D.next = {
            lane: 0,
            tag: p.tag,
            payload: p.payload,
            callback: null,
            next: null
          });
          e: {
            var X = e, P = p;
            z = t;
            var he = n;
            switch (P.tag) {
              case 1:
                if (X = P.payload, typeof X == "function") {
                  k = X.call(he, k, z);
                  break e;
                }
                k = X;
                break e;
              case 3:
                X.flags = X.flags & -65537 | 128;
              case 0:
                if (X = P.payload, z = typeof X == "function" ? X.call(he, k, z) : X, z == null) break e;
                k = W({}, k, z);
                break e;
              case 2:
                pa = !0;
            }
          }
          z = p.callback, z !== null && (e.flags |= 64, R && (e.flags |= 8192), R = u.callbacks, R === null ? u.callbacks = [z] : R.push(z));
        } else
          R = {
            lane: z,
            tag: p.tag,
            payload: p.payload,
            callback: p.callback,
            next: null
          }, D === null ? (T = D = R, _ = k) : D = D.next = R, d |= z;
        if (p = p.next, p === null) {
          if (p = u.shared.pending, p === null)
            break;
          R = p, p = R.next, R.next = null, u.lastBaseUpdate = R, u.shared.pending = null;
        }
      } while (!0);
      D === null && (_ = k), u.baseState = _, u.firstBaseUpdate = T, u.lastBaseUpdate = D, s === null && (u.shared.lanes = 0), za |= d, e.lanes = d, e.memoizedState = k;
    }
  }
  function ph(e, t) {
    if (typeof e != "function")
      throw Error(c(191, e));
    e.call(t);
  }
  function yh(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        ph(n[e], t);
  }
  var ba = Mt(null), rs = Mt(0);
  function gh(e, t) {
    e = ta, Ue(rs, e), Ue(ba, t), ta = e | t.baseLanes;
  }
  function pc() {
    Ue(rs, ta), Ue(ba, ba.current);
  }
  function yc() {
    ta = rs.current, Ge(ba), Ge(rs);
  }
  var yt = Mt(null), zt = null;
  function _a(e) {
    var t = e.alternate;
    Ue(gt, gt.current & 1), Ue(yt, e), zt === null && (t === null || ba.current !== null || t.memoizedState !== null) && (zt = e);
  }
  function gc(e) {
    Ue(gt, gt.current), Ue(yt, e), zt === null && (zt = e);
  }
  function bh(e) {
    e.tag === 22 ? (Ue(gt, gt.current), Ue(yt, e), zt === null && (zt = e)) : Sa();
  }
  function Sa() {
    Ue(gt, gt.current), Ue(yt, yt.current);
  }
  function It(e) {
    Ge(yt), zt === e && (zt = null), Ge(gt);
  }
  var gt = Mt(0);
  function Gl(e, t) {
    Ue(yt, yt.current), Ue(gt, t);
  }
  function bc(e) {
    Ge(gt), Ge(yt), zt === e && (zt = null);
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
  var Fn = 0, de = null, De = null, nt = null, os = !1, Bi = !1, ii = !1, fs = 0, Vl = 0, Li = null, F0 = 0;
  function Ie() {
    throw Error(c(321));
  }
  function _c(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Jt(e[n], t[n])) return !1;
    return !0;
  }
  function Sc(e, t, n, i, u, s) {
    return Fn = s, de = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, K.H = e === null || e.memoizedState === null ? nm : am, ii = !1, s = n(i, u), ii = !1, Bi && (s = Sh(
      t,
      n,
      i,
      u
    )), _h(e), s;
  }
  function _h(e) {
    K.H = gs;
    var t = De !== null && De.next !== null;
    if (Fn = 0, nt = De = de = null, os = !1, Vl = 0, Li = null, t) throw Error(c(300));
    e === null || at || (e = e.dependencies, e !== null && ts(e) && (at = !0));
  }
  function Sh(e, t, n, i) {
    de = e;
    var u = 0;
    do {
      if (Bi && (Li = null), Vl = 0, Bi = !1, 25 <= u) throw Error(c(301));
      if (u += 1, nt = De = null, e.updateQueue != null) {
        var s = e.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      K.H = l1, s = t(n, i);
    } while (Bi);
    return s;
  }
  function P0() {
    var e = K.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? Xl(t) : t, e = e.useState()[0], (De !== null ? De.memoizedState : null) !== e && (de.flags |= 1024), t;
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
    Fn = 0, nt = De = de = null, Bi = !1, Vl = fs = 0, Li = null;
  }
  function Tt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return nt === null ? de.memoizedState = nt = e : nt = nt.next = e, nt;
  }
  function We() {
    if (De === null) {
      var e = de.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = De.next;
    var t = nt === null ? de.memoizedState : nt.next;
    if (t !== null)
      nt = t, De = e;
    else {
      if (e === null)
        throw de.alternate === null ? Error(c(467)) : Error(c(310));
      De = e, e = {
        memoizedState: De.memoizedState,
        baseState: De.baseState,
        baseQueue: De.baseQueue,
        queue: De.queue,
        next: null
      }, nt === null ? de.memoizedState = nt = e : nt = nt.next = e;
    }
    return nt;
  }
  function ds() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Xl(e) {
    var t = Vl;
    return Vl += 1, Li === null && (Li = []), e = fh(Li, e, t), t = de, (nt === null ? t.memoizedState : nt.next) === null && (t = t.alternate, K.H = t === null || t.memoizedState === null ? nm : am), e;
  }
  function hs(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return Xl(e);
      if (e.$$typeof === Y) return;
      if (e.$$typeof === $e) return pt(e);
    }
    throw Error(c(438, String(e)));
  }
  function zc(e) {
    var t = null, n = de.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var i = de.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
        data: i.data.map(function(u) {
          return u.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = ds(), de.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), i = 0; i < e; i++)
        n[i] = $t;
    return t.index++, n;
  }
  function Pn(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function ms(e) {
    var t = We();
    return Ec(t, De, e);
  }
  function Ec(e, t, n) {
    var i = e.queue;
    if (i === null) throw Error(c(311));
    i.lastRenderedReducer = n;
    var u = e.baseQueue, s = i.pending;
    if (s !== null) {
      if (u !== null) {
        var d = u.next;
        u.next = s.next, s.next = d;
      }
      t.baseQueue = u = s, i.pending = null;
    }
    if (s = e.baseState, u === null) e.memoizedState = s;
    else {
      t = u.next;
      var p = d = null, _ = null, T = t, D = !1;
      do {
        var k = T.lane & -536870913;
        if (k !== T.lane ? (_e & k) === k : (Fn & k) === k) {
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
            }, _ === null ? (p = _ = k, d = s) : _ = _.next = k, de.lanes |= z, za |= z;
          k = T.action, ii && n(s, k), s = T.hasEagerState ? T.eagerState : n(s, k);
        } else
          z = {
            lane: k,
            revertLane: T.revertLane,
            gesture: T.gesture,
            action: T.action,
            hasEagerState: T.hasEagerState,
            eagerState: T.eagerState,
            next: null
          }, _ === null ? (p = _ = z, d = s) : _ = _.next = z, de.lanes |= k, za |= k;
        T = T.next;
      } while (T !== null && T !== t);
      if (_ === null ? d = s : _.next = p, !Jt(s, e.memoizedState) && (at = !0, D && (n = qi, n !== null)))
        throw n;
      e.memoizedState = s, e.baseState = d, e.baseQueue = _, i.lastRenderedState = s;
    }
    return u === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function Tc(e) {
    var t = We(), n = t.queue;
    if (n === null) throw Error(c(311));
    n.lastRenderedReducer = e;
    var i = n.dispatch, u = n.pending, s = t.memoizedState;
    if (u !== null) {
      n.pending = null;
      var d = u = u.next;
      do
        s = e(s, d.action), d = d.next;
      while (d !== u);
      Jt(s, t.memoizedState) || (at = !0), t.memoizedState = s, t.baseQueue === null && (t.baseState = s), n.lastRenderedState = s;
    }
    return [s, i];
  }
  function xh(e, t, n) {
    var i = de, u = We(), s = ve;
    if (s) {
      if (n === void 0) throw Error(c(407));
      n = n();
    } else n = t();
    var d = !Jt(
      (De || u).memoizedState,
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
      if (i.flags |= 2048, Ze === null) throw Error(c(349));
      s || (Fn & 127) !== 0 || jh(i, t, n);
    }
    return n;
  }
  function jh(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = de.updateQueue, t === null ? (t = ds(), de.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
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
      De,
      typeof i == "function" ? i : Pn
    );
  }
  function W0(e, t, n, i, u) {
    if (ys(e)) throw Error(c(485));
    if (e = t.action, e !== null) {
      var s = {
        payload: u,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(d) {
          s.listeners.push(d);
        }
      };
      K.T !== null ? n(!0) : s.isTransition = !1, i(s), n = t.pending, n === null ? (s.next = t.pending = s, Ch(t, s)) : (s.next = n.next, t.pending = n.next = s);
    }
  }
  function Ch(e, t) {
    var n = t.action, i = t.payload, u = e.state;
    if (t.isTransition) {
      var s = K.T, d = {};
      d.types = s !== null ? s.types : null, K.T = d;
      try {
        var p = n(u, i), _ = K.S;
        _ !== null && _(d, p), Ah(e, t, p);
      } catch (T) {
        Cc(e, t, T);
      } finally {
        s !== null && d.types !== null && (s.types = d.types), K.T = s;
      }
    } else
      try {
        s = n(u, i), Ah(e, t, s);
      } catch (T) {
        Cc(e, t, T);
      }
  }
  function Ah(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        Rh(e, t, i);
      },
      function(i) {
        return Cc(e, t, i);
      }
    ) : Rh(e, t, n);
  }
  function Rh(e, t, n) {
    t.status = "fulfilled", t.value = n, wh(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ch(e, n)));
  }
  function Cc(e, t, n) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = n, wh(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function wh(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Mh(e, t) {
    return t;
  }
  function Dh(e, t) {
    if (ve) {
      var n = Ze.formState;
      if (n !== null) {
        e: {
          var i = de;
          if (ve) {
            if (qe) {
              t: {
                for (var u = qe, s = dn; u.nodeType !== 8; ) {
                  if (!s) {
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
                s = u.data, u = s === "F!" || s === "F" ? u : null;
              }
              if (u) {
                qe = mn(
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
      de,
      i
    ), i.dispatch = n, i = Nc(!1), s = Uc.bind(
      null,
      de,
      !1,
      i.queue
    ), i = Tt(), u = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = u, n = W0.bind(
      null,
      de,
      u,
      s,
      n
    ), u.dispatch = n, i.memoizedState = e, [t, n, !1];
  }
  function Uh(e) {
    var t = We();
    return Zh(t, De, e);
  }
  function Zh(e, t, n) {
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
    t = We();
    var u = t.queue, s = u.dispatch;
    return n !== t.memoizedState && (de.flags |= 2048, Qi(
      9,
      { destroy: void 0 },
      e1.bind(null, u, n),
      null
    )), [i, s, e];
  }
  function e1(e, t) {
    e.action = t;
  }
  function qh(e) {
    var t = We(), n = De;
    if (n !== null)
      return Zh(t, n, e);
    We(), t = t.memoizedState, n = We();
    var i = n.queue.dispatch;
    return n.memoizedState = e, [t, i, !1];
  }
  function Qi(e, t, n, i) {
    return e = { tag: e, create: n, deps: i, inst: t, next: null }, t = de.updateQueue, t === null && (t = ds(), de.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e), e;
  }
  function kh() {
    return We().memoizedState;
  }
  function vs(e, t, n, i) {
    var u = Tt();
    de.flags |= e, u.memoizedState = Qi(
      1 | t,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function ps(e, t, n, i) {
    var u = We();
    i = i === void 0 ? null : i;
    var s = u.memoizedState.inst;
    De !== null && i !== null && _c(i, De.memoizedState.deps) ? u.memoizedState = Qi(t, s, n, i) : (de.flags |= e, u.memoizedState = Qi(
      1 | t,
      s,
      n,
      i
    ));
  }
  function Hh(e, t) {
    vs(8390656, 8, e, t);
  }
  function Ac(e, t) {
    ps(2048, 8, e, t);
  }
  function t1(e) {
    de.flags |= 4;
    var t = de.updateQueue;
    if (t === null)
      t = ds(), de.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Bh(e) {
    var t = We().memoizedState;
    return t1({ ref: t, nextImpl: e }), function() {
      if ((Te & 2) !== 0) throw Error(c(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Lh(e, t) {
    return ps(4, 2, e, t);
  }
  function Qh(e, t) {
    return ps(4, 4, e, t);
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
    n = n != null ? n.concat([e]) : null, ps(4, 4, Yh.bind(null, t, e), n);
  }
  function Rc() {
  }
  function Gh(e, t) {
    var n = We();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    return t !== null && _c(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
  }
  function Vh(e, t) {
    var n = We();
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
  function wc(e, t, n) {
    return n === void 0 || (Fn & 1073741824) !== 0 && (_e & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = nv(), de.lanes |= e, za |= e, n);
  }
  function Xh(e, t, n, i) {
    return Jt(n, t) ? n : ba.current !== null ? (e = wc(e, n, i), Jt(e, t) || (at = !0), e) : (Fn & 106) === 0 || (Fn & 1073741824) !== 0 && (_e & 261930) === 0 ? (at = !0, e.memoizedState = n) : (e = nv(), de.lanes |= e, za |= e, t);
  }
  function Kh(e, t, n, i, u) {
    var s = se.p;
    se.p = s !== 0 && 8 > s ? s : 8;
    var d = K.T, p = {};
    p.types = d !== null ? d.types : null, K.T = p, Uc(e, !1, t, n);
    try {
      var _ = u(), T = K.S;
      if (T !== null && T(p, _), _ !== null && typeof _ == "object" && typeof _.then == "function") {
        var D = I0(
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
      se.p = s, d !== null && p.types !== null && (d.types = p.types), K.T = d;
    }
  }
  function n1() {
  }
  function Mc(e, t, n, i) {
    if (e.tag !== 5) throw Error(c(476));
    var u = Jh(e).queue;
    Kh(
      e,
      u,
      t,
      wt,
      n === null ? n1 : function() {
        return Ih(e), n(i);
      }
    );
  }
  function Jh(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: wt,
      baseState: wt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Pn,
        lastRenderedState: wt
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
    return pt(sl);
  }
  function Fh() {
    return We().memoizedState;
  }
  function Ph() {
    return We().memoizedState;
  }
  function a1(e) {
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
  function i1(e, t, n) {
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
      var s = e.alternate;
      if (e.lanes === 0 && (s === null || s.lanes === 0) && (s = t.lastRenderedReducer, s !== null))
        try {
          var d = t.lastRenderedState, p = s(d, n);
          if (u.hasEagerState = !0, u.eagerState = p, Jt(p, d))
            return Ku(e, t, u, 0), Ze === null && Xu(), !1;
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
    return e === de || t !== null && t === de;
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
    readContext: pt,
    use: hs,
    useCallback: Ie,
    useContext: Ie,
    useEffect: Ie,
    useImperativeHandle: Ie,
    useLayoutEffect: Ie,
    useInsertionEffect: Ie,
    useMemo: Ie,
    useReducer: Ie,
    useRef: Ie,
    useState: Ie,
    useDebugValue: Ie,
    useDeferredValue: Ie,
    useTransition: Ie,
    useSyncExternalStore: Ie,
    useId: Ie,
    useHostTransitionStatus: Ie,
    useFormState: Ie,
    useActionState: Ie,
    useOptimistic: Ie,
    useMemoCache: Ie,
    useCacheRefresh: Ie,
    useEffectEvent: Ie
  }, nm = {
    readContext: pt,
    use: hs,
    useCallback: function(e, t) {
      return Tt().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: pt,
    useEffect: Hh,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, vs(
        4194308,
        4,
        Yh.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return vs(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      vs(4, 2, e, t);
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
      }, i.queue = e, e = e.dispatch = i1.bind(
        null,
        de,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = Tt();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = Nc(e);
      var t = e.queue, n = Wh.bind(null, de, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var n = Tt();
      return wc(n, e, t);
    },
    useTransition: function() {
      var e = Nc(!1);
      return e = Kh.bind(
        null,
        de,
        e.queue,
        !0,
        !1
      ), Tt().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var i = de, u = Tt();
      if (ve) {
        if (n === void 0)
          throw Error(c(407));
        n = n();
      } else {
        if (n = t(), Ze === null)
          throw Error(c(349));
        (_e & 127) !== 0 || jh(i, t, n);
      }
      u.memoizedState = n;
      var s = { value: n, getSnapshot: t };
      return u.queue = s, Hh(zh.bind(null, i, s, e), [
        e
      ]), i.flags |= 2048, Qi(
        9,
        { destroy: void 0 },
        Oh.bind(
          null,
          i,
          s,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = Tt(), t = Ze.identifierPrefix;
      if (ve) {
        var n = Cn, i = Nn;
        n = (i & ~(1 << 32 - Xt(i) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = fs++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = F0++, t = "_" + t + "r_" + n.toString(32) + "_";
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
        de,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: zc,
    useCacheRefresh: function() {
      return Tt().memoizedState = a1.bind(
        null,
        de
      );
    },
    useEffectEvent: function(e) {
      var t = Tt(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Te & 2) !== 0)
          throw Error(c(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, am = {
    readContext: pt,
    use: hs,
    useCallback: Gh,
    useContext: pt,
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
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var n = We();
      return Xh(
        n,
        De.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = ms(Pn)[0], t = We().memoizedState;
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
      var n = We();
      return Nh(n, De, e, t);
    },
    useMemoCache: zc,
    useCacheRefresh: Ph,
    useEffectEvent: Bh
  }, l1 = {
    readContext: pt,
    use: hs,
    useCallback: Gh,
    useContext: pt,
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
    useDebugValue: Rc,
    useDeferredValue: function(e, t) {
      var n = We();
      return De === null ? wc(n, e, t) : Xh(
        n,
        De.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Tc(Pn)[0], t = We().memoizedState;
      return [
        typeof e == "boolean" ? e : Xl(e),
        t
      ];
    },
    useSyncExternalStore: xh,
    useId: Fh,
    useHostTransitionStatus: Dc,
    useFormState: qh,
    useActionState: qh,
    useOptimistic: function(e, t) {
      var n = We();
      return De !== null ? Nh(n, De, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: zc,
    useCacheRefresh: Ph,
    useEffectEvent: Bh
  };
  function Zc(e, t, n, i) {
    t = e.memoizedState, n = n(i, t), n = n == null ? t : W({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var qc = {
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
  function im(e, t, n, i, u, s, d) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, s, d) : t.prototype && t.prototype.isPureReactComponent ? !Dl(n, i) || !Dl(u, s) : !0;
  }
  function lm(e, t, n, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && qc.enqueueReplaceState(t, t.state, null);
  }
  function li(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var i in t)
        i !== "ref" && (n[i] = t[i]);
    }
    if (e = e.defaultProps) {
      n === t && (n = W({}, n));
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
      var s = i.value;
      e.payload = function() {
        return u(s);
      }, e.callback = function() {
        cm(t, n, i);
      };
    }
    var d = n.stateNode;
    d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
      cm(t, n, i), typeof u != "function" && (Ea === null ? Ea = /* @__PURE__ */ new Set([this]) : Ea.add(this));
      var p = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: p !== null ? p : ""
      });
    });
  }
  function u1(e, t, n, i, u) {
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
            return zt === null ? Bs() : n.alternate === null && Fe === 0 && (Fe = 3), n.flags &= -257, n.flags |= 65536, n.lanes = u, i === ls ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), jo(e, i, u)), !1;
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
      return t = yt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = u, i !== ic && (e = Error(c(422), { cause: i }), ql(cn(e, n)))) : (i !== ic && (t = Error(c(423), {
        cause: i
      }), ql(
        cn(t, n)
      )), e = e.current.alternate, e.flags |= 65536, u &= -u, e.lanes |= u, i = cn(i, n), u = kc(
        e.stateNode,
        i,
        u
      ), mc(e, u), Fe !== 4 && (Fe = 2)), !1;
    var s = Error(c(520), { cause: i });
    if (s = cn(s, n), nu === null ? nu = [s] : nu.push(s), Fe !== 4 && (Fe = 2), t === null) return !0;
    i = cn(i, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = u & -u, n.lanes |= e, e = kc(n.stateNode, i, e), mc(n, e), !1;
        case 1:
          if (t = n.type, s = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (Ea === null || !Ea.has(s))))
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
    t.child = e === null ? vh(t, null, n, i) : ai(
      t,
      e.child,
      n,
      i
    );
  }
  function dm(e, t, n, i, u) {
    n = n.render;
    var s = t.ref;
    if ("ref" in i) {
      var d = {};
      for (var p in i)
        p !== "ref" && (d[p] = i[p]);
    } else d = i;
    return Pa(t), i = Sc(
      e,
      t,
      n,
      d,
      s,
      u
    ), p = xc(), e !== null && !at ? (jc(e, t, u), Wn(e, t, u)) : (ve && p && Pu(t), t.flags |= 1, rt(e, t, i, u), t.child);
  }
  function hm(e, t, n, i, u) {
    if (e === null) {
      var s = n.type;
      return typeof s == "function" && !ec(s) && s.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = s, mm(
        e,
        t,
        s,
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
    if (s = e.child, !Xc(e, u)) {
      var d = s.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Dl, n(d, i) && e.ref === t.ref)
        return Wn(e, t, u);
    }
    return t.flags |= 1, e = Xn(s, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function mm(e, t, n, i, u) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (Dl(s, i) && e.ref === t.ref)
        if (at = !1, t.pendingProps = i = s, Xc(e, u))
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
  function vm(e, t, n, i) {
    var u = i.children, s = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (s = s !== null ? s.baseLanes | n : n, e !== null) {
          for (i = t.child = e.child, u = 0; i !== null; )
            u = u | i.lanes | i.childLanes, i = i.sibling;
          i = u & ~s;
        } else i = 0, t.child = null;
        return pm(
          e,
          t,
          s,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && as(
          t,
          s !== null ? s.cachePool : null
        ), s !== null ? gh(t, s) : pc(), bh(t);
      else
        return i = t.lanes = 536870912, pm(
          e,
          t,
          s !== null ? s.baseLanes | n : n,
          n,
          i
        );
    } else
      s !== null ? (as(t, s.cachePool), gh(t, s), Sa(), t.memoizedState = null) : (e !== null && as(t, null), pc(), Sa());
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
  function pm(e, t, n, i, u) {
    var s = oc();
    return s = s === null ? null : { parent: tt._currentValue, pool: s }, t.memoizedState = {
      baseLanes: n,
      cachePool: s
    }, e !== null && as(t, null), pc(), bh(t), e !== null && Fa(e, t, i, !0), t.childLanes = u, null;
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
  function s1(e, t, n) {
    var i = t.pendingProps, u = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (ve) {
        if (i.mode === "hidden")
          return e = _s(t, i), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, Jl(null, e);
        if (gc(t), (e = qe) ? (e = Yv(
          e,
          dn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: fa !== null ? { id: Nn, overflow: Cn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = eh(e), n.return = t, t.child = n, ft = t, qe = null)) : e = null, e === null) throw ha(t);
        return t.lanes = 536870912, null;
      }
      return _s(t, i);
    }
    var s = e.memoizedState;
    if (s !== null) {
      var d = s.dehydrated;
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
          if (i = Ze, i !== null && (d = ad(i, n), d !== 0 && d !== s.retryLane))
            throw s.retryLane = d, Xa(e, d), Lt(i, e, d), Hc;
          Bs();
        }
        t = ym(
          e,
          t,
          n
        );
      } else
        e = s.treeContext, qe = mn(d.nextSibling), ft = t, ve = !0, da = null, dn = !1, e !== null && ah(t, e), t = _s(t, i), t.flags |= 134221824;
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
  function gm(e, t, n, i, u, s) {
    return Pa(t), t.updateQueue = null, n = Sh(
      t,
      i,
      n,
      u
    ), _h(e), i = xc(), e !== null && !at ? (jc(e, t, s), Wn(e, t, s)) : (ve && i && Pu(t), t.flags |= 1, rt(e, t, n, s), t.child);
  }
  function bm(e, t, n, i, u) {
    if (Pa(t), t.stateNode === null) {
      var s = Mi, d = n.contextType;
      typeof d == "object" && d !== null && (s = pt(d)), s = new n(i, s), t.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = qc, t.stateNode = s, s._reactInternals = t, s = t.stateNode, s.props = i, s.state = t.memoizedState, s.refs = {}, dc(t), d = n.contextType, s.context = typeof d == "object" && d !== null ? pt(d) : Mi, s.state = t.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (Zc(
        t,
        n,
        d,
        i
      ), s.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (d = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), d !== s.state && qc.enqueueReplaceState(s, s.state, null), $l(t, i, s, u), Yl(), s.state = t.memoizedState), typeof s.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      s = t.stateNode;
      var p = t.memoizedProps, _ = li(n, p);
      s.props = _;
      var T = s.context, D = n.contextType;
      d = Mi, typeof D == "object" && D !== null && (d = pt(D));
      var k = n.getDerivedStateFromProps;
      D = typeof k == "function" || typeof s.getSnapshotBeforeUpdate == "function", p = t.pendingProps !== p, D || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (p || T !== d) && lm(
        t,
        s,
        i,
        d
      ), pa = !1;
      var z = t.memoizedState;
      s.state = z, $l(t, i, s, u), Yl(), T = t.memoizedState, p || z !== T || pa ? (typeof k == "function" && (Zc(
        t,
        n,
        k,
        i
      ), T = t.memoizedState), (_ = pa || im(
        t,
        n,
        _,
        i,
        z,
        T,
        d
      )) ? (D || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = T), s.props = i, s.state = T, s.context = d, i = _) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      s = t.stateNode, hc(e, t), d = t.memoizedProps, D = li(n, d), s.props = D, k = t.pendingProps, z = s.context, T = n.contextType, _ = Mi, typeof T == "object" && T !== null && (_ = pt(T)), p = n.getDerivedStateFromProps, (T = typeof p == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (d !== k || z !== _) && lm(
        t,
        s,
        i,
        _
      ), pa = !1, z = t.memoizedState, s.state = z, $l(t, i, s, u), Yl();
      var R = t.memoizedState;
      d !== k || z !== R || pa || e !== null && e.dependencies !== null && ts(e.dependencies) ? (typeof p == "function" && (Zc(
        t,
        n,
        p,
        i
      ), R = t.memoizedState), (D = pa || im(
        t,
        n,
        D,
        i,
        z,
        R,
        _
      ) || e !== null && e.dependencies !== null && ts(e.dependencies)) ? (T || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, R, _), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        i,
        R,
        _
      )), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = R), s.props = i, s.state = R, s.context = _, i = D) : (typeof s.componentDidUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && z === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return s = i, Yi(e, t), i = (t.flags & 128) !== 0, s || i ? (s = t.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : s.render(), t.flags |= 1, e !== null && i ? (t.child = ai(
      t,
      e.child,
      null,
      u
    ), t.child = ai(
      t,
      null,
      n,
      u
    )) : rt(e, t, n, u), t.memoizedState = s.state, e = t.child) : e = Wn(
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
    var i = t.pendingProps, u = !1, s = (t.flags & 128) !== 0, d;
    if ((d = s) || (d = e !== null && e.memoizedState === null ? !1 : (gt.current & 2) !== 0), d && (u = !0, t.flags &= -129), d = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (ve) {
        if (u ? _a(t) : Sa(), (e = qe) ? (e = Yv(
          e,
          dn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: fa !== null ? { id: Nn, overflow: Cn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = eh(e), n.return = t, t.child = n, ft = t, qe = null)) : e = null, e === null) throw ha(t);
        return Yo(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return s = i.children, i = i.fallback, u ? (Sa(), u = t.mode, s = Ss(
        { mode: "hidden", children: s },
        u
      ), i = Ka(
        i,
        u,
        n,
        null
      ), s.return = t, i.return = t, s.sibling = i, t.child = s, i = t.child, i.memoizedState = Qc(n), i.childLanes = Yc(
        e,
        d,
        n
      ), t.memoizedState = Lc, Jl(null, i)) : (_a(t), $c(t, s));
    }
    var p = e.memoizedState;
    if (p !== null) {
      var _ = p.dehydrated;
      if (_ !== null)
        return r1(
          e,
          t,
          s,
          d,
          i,
          _,
          p,
          n
        );
    }
    return u ? (Sa(), u = i.fallback, s = t.mode, p = e.child, _ = p.sibling, i = Xn(p, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = p.subtreeFlags & 1206910976, _ !== null ? u = Xn(_, u) : (u = Ka(
      u,
      s,
      n,
      null
    ), u.flags |= 2), u.return = t, i.return = t, i.sibling = u, t.child = i, Jl(null, i), i = t.child, u = e.child.memoizedState, u === null ? u = Qc(n) : (s = u.cachePool, s !== null ? (p = tt._currentValue, s = s.parent !== p ? { parent: p, pool: p } : s) : s = ch(), u = {
      baseLanes: u.baseLanes | n,
      cachePool: s
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
    return e = qt(22, e, null, t), e.lanes = 0, e;
  }
  function xs(e, t, n) {
    return ai(t, e.child, null, n), e = $c(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function r1(e, t, n, i, u, s, d, p) {
    if (n)
      return t.flags & 256 ? (_a(t), t.flags &= -257, xs(
        e,
        t,
        p
      )) : t.memoizedState !== null ? (Sa(), t.child = e.child, t.flags |= 128, null) : (Sa(), s = u.fallback, d = t.mode, u = Ss(
        { mode: "visible", children: u.children },
        d
      ), s = Ka(
        s,
        d,
        p,
        null
      ), s.flags |= 2, u.return = t, s.return = t, u.sibling = s, t.child = u, ai(t, e.child, null, p), u = t.child, u.memoizedState = Qc(p), u.childLanes = Yc(
        e,
        i,
        p
      ), t.memoizedState = Lc, Jl(null, u));
    if (_a(t), Yo(s)) {
      if (i = s.nextSibling && s.nextSibling.dataset, i) var _ = i.dgst;
      return i = _, i !== "" && (u = Error(c(419)), u.stack = "", u.digest = i, ql({ value: u, source: null, stack: null })), xs(
        e,
        t,
        p
      );
    }
    if (at || Fa(e, t, p, !1), i = (p & e.childLanes) !== 0, at || i) {
      if (ba.current !== null)
        return xs(
          e,
          t,
          p
        );
      if (i = Ze, i !== null && (u = ad(
        i,
        p
      ), u !== 0 && u !== d.retryLane))
        throw d.retryLane = u, Xa(e, u), Lt(i, e, u), Hc;
      return Qo(s) || Bs(), xs(
        e,
        t,
        p
      );
    }
    return Qo(s) ? (t.flags |= 192, t.child = e.child, null) : (e = d.treeContext, qe = mn(s.nextSibling), ft = t, ve = !0, da = null, dn = !1, e !== null && ah(t, e), t = $c(
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
  function js(e, t, n, i, u, s) {
    var d = e.memoizedState;
    d === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: u,
      treeForkCount: s
    } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = i, d.tail = n, d.tailMode = u, d.treeForkCount = s);
  }
  function Gc(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var n = t.sibling;
      t.sibling = e.child, e.child = t, t = n;
    }
  }
  function Vc(e, t, n) {
    var i = t.pendingProps, u = i.revealOrder, s = i.tail;
    i = i.children;
    var d = gt.current;
    if (t.flags & 128)
      return Gl(t, d), null;
    var p = (d & 2) !== 0;
    if (p ? (d = d & 1 | 2, t.flags |= 128) : d &= 1, Gl(t, d), u === "backwards" && e !== null ? (Gc(e), rt(e, t, i, n), Gc(e)) : rt(e, t, i, n), i = ve ? Zl : 0, !p && e !== null && (e.flags & 128) !== 0)
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
          s,
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
          s,
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
          s,
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
  function c1(e, t, n) {
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
        return t.lanes = 0, vm(
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
          return at = !1, c1(
            e,
            t,
            n
          );
        at = (e.flags & 131072) !== 0;
      }
    else
      at = !1, ve && (t.flags & 1048576) !== 0 && nh(t, Zl, t.index);
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
              if (u === V) {
                t.tag = 11, t = dm(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              } else if (u === be) {
                t.tag = 14, t = hm(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              } else if (u === $e) {
                t.tag = 10, t.type = e, t = Om(
                  null,
                  t,
                  n
                );
                break e;
              }
            }
            throw t = re(e) || e, Error(c(306, t, ""));
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
          var s = t.memoizedState;
          u = s.element, hc(e, t), $l(t, i, null, n);
          var d = t.memoizedState;
          if (i = d.cache, ma(t, tt, i), i !== s.cache && sc(
            t,
            [tt],
            n,
            !0
          ), Yl(), i = d.element, s.isDehydrated)
            if (s = {
              element: i,
              isDehydrated: !1,
              cache: d.cache
            }, t.updateQueue.baseState = s, t.memoizedState = s, t.flags & 256) {
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
              ), ql(u), t = _m(
                e,
                t,
                i,
                n
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, qe = mn(e.firstChild), ft = t, ve = !0, da = null, dn = !0, n = vh(
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
        return Yi(e, t), e === null ? (n = Iv(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : ve || (t.stateNode = Cv(
          t.type,
          t.pendingProps,
          mt.current,
          t
        )) : t.memoizedState = Iv(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Ba(t), e === null && ve && (i = t.stateNode = Vv(
          t.type,
          t.pendingProps,
          mt.current
        ), ft = t, dn = !0, u = qe, Ca(t.type) ? ($o = u, qe = mn(i.firstChild)) : qe = u), rt(
          e,
          t,
          t.pendingProps.children,
          n
        ), Yi(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && ve && ((u = i = qe) && (i = ab(
          i,
          t.type,
          t.pendingProps,
          dn
        ), i !== null ? (t.stateNode = i, ft = t, qe = mn(i.firstChild), dn = !1, u = !0) : u = !1), u || ha(t)), Ba(t), u = t.type, s = t.pendingProps, d = e !== null ? e.memoizedProps : null, i = s.children, Uo(u, s) ? i = null : d !== null && Uo(u, d) && (t.flags |= 32), t.memoizedState !== null && (u = Sc(
          e,
          t,
          P0,
          null,
          null,
          n
        ), sl._currentValue = u), Yi(e, t), rt(e, t, i, n), t.child;
      case 6:
        return e === null && ve && ((e = n = qe) && (n = ib(
          n,
          t.pendingProps,
          dn
        ), n !== null ? (t.stateNode = n, ft = t, qe = null, e = !0) : e = !1), e || ha(t)), null;
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
        return u = t.type._context, i = t.pendingProps.children, Pa(t), u = pt(u), i = i(u), t.flags |= 1, rt(e, t, i, n), t.child;
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
        return s1(e, t, n);
      case 22:
        return vm(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Pa(t), i = pt(tt), e === null ? (u = oc(), u === null && (u = Ze, s = rc(), u.pooledCache = s, s.refCount++, s !== null && (u.pooledCacheLanes |= n), u = s), t.memoizedState = { parent: i, cache: u }, dc(t), ma(t, tt, u)) : ((e.lanes & n) !== 0 && (hc(e, t), $l(t, null, null, n), Yl()), u = e.memoizedState, s = t.memoizedState, u.parent !== i ? (u = { parent: i, cache: i }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = u), ma(t, tt, i)) : (i = s.cache, ma(t, tt, i), i !== u.cache && sc(
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
    var s;
    if ((s = (e.mode & 32) !== 0) && (s = n === null ? ep(t, i) : ep(t, i) && (i.src !== n.src || i.srcSet !== n.srcSet)), s) {
      if (e.flags |= 16777216, (u & 335544128) === u)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (uv()) e.flags |= 8192;
        else
          throw ni = ls, fc;
    } else e.flags &= -16777217;
  }
  function Em(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !tp(t))
      if (uv()) e.flags |= 8192;
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
  function ke(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
    if (t)
      for (var u = e.child; u !== null; )
        n |= u.lanes | u.childLanes, i |= u.subtreeFlags & 1206910976, i |= u.flags & 1206910976, u.return = e, u = u.sibling;
    else
      for (u = e.child; u !== null; )
        n |= u.lanes | u.childLanes, i |= u.subtreeFlags, i |= u.flags, u.return = e, u = u.sibling;
    return e.subtreeFlags |= i, e.childLanes = n, t;
  }
  function o1(e, t, n) {
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
        return ke(t), null;
      case 1:
        return ke(t), null;
      case 3:
        return n = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), In(tt), zn(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Zi(t) ? ea(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, lc())), ke(t), null;
      case 26:
        var u = t.type, s = t.memoizedState;
        return e === null ? (ea(t), s !== null ? (ke(t), Em(t, s)) : (ke(t), Kc(
          t,
          u,
          null,
          i,
          n
        ))) : s ? s !== e.memoizedState ? (ea(t), ke(t), Em(t, s)) : (ke(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && ea(t), ke(t), Kc(
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
            return ke(t), t.subtreeFlags &= -33554433, null;
          }
          e = Ot.current, Zi(t) ? ih(t) : (e = Vv(u, i, n), t.stateNode = e, ea(t));
        }
        return ke(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (bi(t), u = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && ea(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(c(166));
            return ke(t), t.subtreeFlags &= -33554433, null;
          }
          if (s = Ot.current, Zi(t))
            ih(t);
          else {
            var d = su(
              mt.current
            );
            switch (s) {
              case 1:
                s = d.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                s = d.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    s = d.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    s = d.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    s = d.createElement("div"), s.innerHTML = "<script><\/script>", s = s.removeChild(
                      s.firstChild
                    );
                    break;
                  case "select":
                    s = typeof i.is == "string" ? d.createElement("select", {
                      is: i.is
                    }) : d.createElement("select"), i.multiple ? s.multiple = !0 : i.size && (s.size = i.size);
                    break;
                  default:
                    s = typeof i.is == "string" ? d.createElement(u, { is: i.is }) : d.createElement(u);
                }
            }
            s[vt] = t, s[Zt] = i;
            e: for (d = t.child; d !== null; ) {
              if (d.tag === 5 || d.tag === 6)
                s.appendChild(d.stateNode);
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
            t.stateNode = s;
            e: switch (_t(s, u, i), u) {
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
        return ke(t), t.subtreeFlags &= -33554433, Kc(
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
          if (e = mt.current, Zi(t)) {
            if (e = t.stateNode, n = t.memoizedProps, i = null, u = ft, u !== null)
              switch (u.tag) {
                case 27:
                case 5:
                  i = u.memoizedProps;
              }
            e[vt] = t, e = !!(e.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || zv(e.nodeValue, n)), e || ha(t, !0);
          } else
            e = su(e).createTextNode(
              i
            ), e[vt] = t, t.stateNode = e;
        }
        return ke(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = Zi(t), n !== null) {
            if (e === null) {
              if (!i) throw Error(c(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(c(557));
              e[vt] = t;
            } else
              Ja(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ke(t), e = !1;
          } else
            n = lc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (It(t), t) : (It(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(c(558));
        }
        return ke(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (u = Zi(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!u) throw Error(c(318));
              if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(c(317));
              u[vt] = t;
            } else
              Ja(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            ke(t), u = !1;
          } else
            u = lc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = u), u = !0;
          if (!u)
            return t.flags & 256 ? (It(t), t) : (It(t), null);
        }
        return It(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = i !== null, e = e !== null && e.memoizedState !== null, n && (i = t.child, u = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (u = i.alternate.memoizedState.cachePool.pool), s = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool), s !== u && (i.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Os(t, t.updateQueue), ke(t), null);
      case 4:
        return zn(), e === null && Ao(t.stateNode.containerInfo), t.flags |= 67108864, ke(t), null;
      case 10:
        return In(t.type), ke(t), null;
      case 19:
        if (bc(t), i = t.memoizedState, i === null) return ke(t), null;
        if (u = (t.flags & 128) !== 0, s = i.rendering, s === null)
          if (u) Il(i, !1);
          else {
            if (Fe !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (s = cs(e), s !== null) {
                  for (t.flags |= 128, Il(i, !1), e = s.updateQueue, t.updateQueue = e, Os(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    Wd(n, e), n = n.sibling;
                  return Gl(
                    t,
                    gt.current & 1 | 2
                  ), ve && Kn(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && Gt() > Zs && (t.flags |= 128, u = !0, Il(i, !1), t.lanes = 4194304);
          }
        else {
          if (!u)
            if (e = cs(s), e !== null) {
              if (t.flags |= 128, u = !0, e = e.updateQueue, t.updateQueue = e, Os(t, e), Il(i, !0), i.tail === null && i.tailMode !== "collapsed" && i.tailMode !== "visible" && !s.alternate && !ve)
                return ke(t), null;
            } else
              2 * Gt() - i.renderingStartTime > Zs && n !== 536870912 && (t.flags |= 128, u = !0, Il(i, !1), t.lanes = 4194304);
          i.isBackwards ? (s.sibling = t.child, t.child = s) : (e = i.last, e !== null ? e.sibling = s : t.child = s, i.last = s);
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
          return i.rendering = e, i.tail = e.sibling, i.renderingStartTime = Gt(), e.sibling = null, s = gt.current, s = u ? s & 1 | 2 : s & 1, i.tailMode === "visible" || i.tailMode === "collapsed" || !n || ve ? Gl(t, s) : (n = s, Ue(yt, t), Ue(gt, n), zt === null && (zt = t)), ve && Kn(t, i.treeForkCount), e;
        }
        return ke(t), null;
      case 22:
      case 23:
        return It(t), yc(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (ke(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ke(t), n = t.updateQueue, n !== null && Os(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== n && (t.flags |= 2048), e !== null && Ge(ei), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), In(tt), ke(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, ke(t), null;
    }
    throw Error(c(156, t.tag));
  }
  function f1(e, t) {
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
        return It(t), yc(), e !== null && Ge(ei), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
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
        It(t), yc(), e !== null && Ge(ei);
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
            var s = n.create, d = n.inst;
            i = s(), d.destroy = i;
          }
          n = n.next;
        } while (n !== u);
      }
    } catch (p) {
      Re(t, t.return, p);
    }
  }
  function xa(e, t, n) {
    try {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next;
        i = s;
        do {
          if ((i.tag & e) === e) {
            var d = i.inst, p = d.destroy;
            if (p !== void 0) {
              d.destroy = void 0, u = t;
              var _ = n, T = p;
              try {
                T();
              } catch (D) {
                Re(
                  u,
                  _,
                  D
                );
              }
            }
          }
          i = i.next;
        } while (i !== s);
      }
    } catch (D) {
      Re(t, t.return, D);
    }
  }
  function Nm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        yh(t, n);
      } catch (i) {
        Re(e, e.return, i);
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
      Re(e, t, i);
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
            var u = e.stateNode, s = Gn(e.memoizedProps, u);
            (u.ref === null || u.ref.name !== s) && (u.ref = Zv(s)), i = u.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var d = new tn(e);
              g(
                e.child,
                !1,
                tb,
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
    } catch (p) {
      Re(e, t, p);
    }
  }
  function bt(e, t) {
    var n = e.ref, i = e.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (u) {
          Re(e, t, u);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (u) {
          Re(e, t, u);
        }
      else n.current = null;
  }
  function zs(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var n = 0; n < t.length; n++)
        Qv(
          e.stateNode,
          t[n]
        );
  }
  function Am(e) {
    for (var t = e.return; t !== null && (Ic(t) && Qv(e.stateNode, t.stateNode), !Jc(t)); )
      t = t.return;
  }
  function Pl(e) {
    for (var t = e.return; t !== null && (Ic(t) && nb(e.stateNode, t.stateNode), !Jc(t)); )
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
      Re(e, e.return, u);
    }
  }
  function Pc(e, t, n) {
    try {
      var i = e.stateNode;
      q1(i, e.type, n, t), i[Zt] = t;
    } catch (u) {
      Re(e, e.return, u);
    }
  }
  function Rm(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ca(e.type) || e.tag === 4;
  }
  function Wc(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Rm(e.return)) return null;
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
      u = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(u, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(u), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Tn)), zs(e, i), Ee = !0;
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
      u = e.stateNode, t ? n.insertBefore(u, t) : n.appendChild(u), zs(e, i), Ee = !0;
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
  function wm(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var i = e.type, u = t.attributes; u.length; )
        t.removeAttributeNode(u[0]);
      _t(t, i, n), t[vt] = e, t[Zt] = n;
    } catch (s) {
      Re(e, e.return, s);
    }
  }
  var Ts = !1, Ft = null;
  function Mm(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Ts = !0);
  }
  var Rn = null;
  function Dm() {
    var e = Rn;
    return Rn = null, e;
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
    for (var s = !1; e !== null; ) {
      if (e.tag === 5) {
        var d = e.stateNode;
        if (i !== null) {
          var p = ko(d);
          i.push(p), p.view && (s = !0);
        } else
          s || ko(d).view && (s = !0);
        Ts = !0, Dv(
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
      ) && (s = !0));
      e = e.sibling;
    }
    return s;
  }
  function wn(e, t) {
    for (; e !== null; )
      e.tag === 5 ? Uv(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || wn(
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
          ) || wn(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function to(e, t) {
    if (e.tag === 30) {
      var n = e.stateNode, i = e.memoizedProps, u = Gn(i, n), s = Vn(
        i.default,
        n.paired ? i.share : i.enter
      );
      s !== "none" ? $i(e, u, s, null, !1) ? (Ns(e), n.paired || t || Pi(e, i.onEnter)) : wn(e.child, !1) : Ns(e);
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
                  var s = Vn(
                    n.default,
                    n.share
                  );
                  if (s !== "none" && ($i(
                    e,
                    i,
                    s,
                    null,
                    !1
                  ) ? (s = e.stateNode, u.paired = s, s.paired = u, Pi(e, n.onShare)) : wn(e.child, !1)), t.delete(i), t.size === 0) break;
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
      u !== "none" && ($i(e, n, u, null, !1) ? i !== void 0 ? (u = e.stateNode, i.paired = u, u.paired = i, Ft.delete(n), Pi(e, t.onShare)) : Pi(e, t.onExit) : wn(e.child, !1)), Ft !== null && no(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        ao(e), e = e.sibling;
    else
      Ft !== null && no(e);
  }
  function Zm(e) {
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
        (e.subtreeFlags & 33554432) !== 0 && Zm(e);
      e = e.sibling;
    }
  }
  function io(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, wn(e.child, !1));
          }
          io(e);
        }
        e = e.sibling;
      }
  }
  function Cs(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, wn(e.child, !1), io(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Cs(e), e = e.sibling;
    else io(e);
  }
  function qm(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? wn(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && qm(e), e = e.sibling;
  }
  function lo(e, t, n, i, u, s, d) {
    for (var p = !1; t !== null; ) {
      if (t.tag === 5) {
        var _ = t.stateNode;
        if (s !== null && kt < s.length) {
          var T = s[kt], D = ko(_);
          (T.view || D.view) && (p = !0);
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
        (e.flags & 4) !== 0 && Dv(
          _,
          kt === 0 ? n : n + "_" + kt,
          u
        ), p && (e.flags & 4) !== 0 || (Rn === null && (Rn = []), Rn.push(
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
        s,
        d
      ) && (p = !0));
      t = t.sibling;
    }
    return p;
  }
  function km(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var n = e.memoizedProps, i = e.stateNode, u = Gn(n, i), s = Vn(n.default, n.update), d;
        d = e.memoizedState, e.memoizedState = null, i = e;
        var p = e.child;
        kt = 0, u = lo(
          i,
          p,
          u,
          u,
          s,
          d,
          !1
        ), (e.flags & 4) !== 0 && u && Pi(e, n.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && km(e);
      e = e.sibling;
    }
  }
  var dt = !1, Ce = !1, Mn = !1, uo = !1, Hm = typeof WeakSet == "function" ? WeakSet : Set, ht = null, Dn = !1, Wl = !1, As = !1, so = !1;
  function d1(e, t, n) {
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
            var s = u.anchorOffset, d = u.focusNode;
            u = u.focusOffset;
            try {
              i.nodeType, d.nodeType;
            } catch {
              i = null;
              break e;
            }
            var p = 0, _ = -1, T = -1, D = 0, k = 0, z = e, R = null;
            t: for (; ; ) {
              for (var X; z !== i || s !== 0 && z.nodeType !== 3 || (_ = p + s), z !== d || u !== 0 && z.nodeType !== 3 || (T = p + u), z.nodeType === 3 && (p += z.nodeValue.length), (X = z.firstChild) !== null; )
                R = z, z = X;
              for (; ; ) {
                if (z === e) break t;
                if (R === i && ++D === s && (_ = p), R === d && ++k === u && (T = p), (X = z.nextSibling) !== null) break;
                z = R, R = z.parentNode;
              }
              z = X;
            }
            i = _ === -1 || T === -1 ? null : { start: _, end: T };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Do = { focusedElem: e, selectionRange: i }, rl = !1, n = (n & 335544064) === n, ht = t, t = n ? 9270 : 1024; ht !== null; ) {
      if (e = ht, n && (i = e.deletions, i !== null))
        for (s = 0; s < i.length; s++)
          n && ao(i[s]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        n && Mm(e), Rs(n);
      else {
        if (e.tag === 22) {
          if (i = e.alternate, e.memoizedState !== null) {
            i !== null && i.memoizedState === null && n && ao(i), Rs(n);
            continue;
          } else if (i !== null && i.memoizedState !== null) {
            n && Mm(e), Rs(n);
            continue;
          }
        }
        i = e.child, (e.subtreeFlags & t) !== 0 && i !== null ? (i.return = e, ht = i) : (n && Zm(e), Rs(n));
      }
    }
    Ft = null;
  }
  function Rs(e) {
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
            var s = t.stateNode;
            try {
              var d = li(
                t.type,
                u
              );
              n = s.getSnapshotBeforeUpdate(
                d,
                i
              ), s.__reactInternalSnapshotBeforeUpdate = n;
            } catch (p) {
              Re(t, t.return, p);
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
              Re(n, n.return, d);
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
              Re(
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
            Re(n, n.return, d);
          }
        }
        break;
      case 27:
        t === null && i & 4 && wm(n);
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
        Un(e, n), i & 4 && Gm(e, n), i & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = O1.bind(
          null,
          n
        ), lb(e, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || dt, !i) {
          var s = t !== null && t.memoizedState !== null || Ce;
          t = dt, u = Ce, dt = i, (Ce = s) && !u ? (i = 2, (n.subtreeFlags & 8772) !== 0 && (i |= 1), xn(
            e,
            n,
            i
          )) : Un(e, n), dt = t, Ce = u;
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
            var u = e.stateNode, s = e.memoizedProps.style, d = s != null && s.hasOwnProperty("display") ? s.display : null;
            u.style.display = d == null || typeof d == "boolean" ? "" : ("" + d).trim();
          }
        } catch (_) {
          Re(e, e.return, _);
        }
        co(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, Ee = !0;
        } catch (_) {
          Re(e, e.return, _);
        }
        break;
      case 18:
        try {
          var p = e.stateNode;
          t ? Mv(p, !0) : Mv(e.stateNode, !1);
        } catch (_) {
          Re(e, e.return, _);
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
    t !== null && (e.alternate = null, Qm(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && Zu(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var Le = null, Ht = !1;
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
        Ce || bt(n, t), _n(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Ce && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Ce || bt(n, t), Pl(n);
        var i = Le, u = Ht;
        Ca(n.type) && (Le = n.stateNode, Ht = !1), _n(
          e,
          t,
          n
        ), Xv(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), Le = i, Ht = u;
        break;
      case 5:
        Ce || bt(n, t), Pl(n);
      case 6:
        if (n.tag === 6 && Pl(n), i = Le, u = Ht, Le = null, _n(
          e,
          t,
          n
        ), Le = i, Ht = u, Le !== null)
          if (Ht)
            try {
              (Le.nodeType === 9 ? Le.body : Le.nodeName === "HTML" ? Le.ownerDocument.body : Le).removeChild(n.stateNode), Ee = !0;
            } catch (s) {
              Re(
                n,
                t,
                s
              );
            }
          else
            try {
              Le.removeChild(n.stateNode), Ee = !0;
            } catch (s) {
              Re(
                n,
                t,
                s
              );
            }
        break;
      case 18:
        Le !== null && (Ht ? (e = Le, wv(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), cl(e)) : wv(Le, n.stateNode));
        break;
      case 4:
        i = Le, u = Ht, Le = n.stateNode.containerInfo, Ht = !0, _n(
          e,
          t,
          n
        ), Le = i, Ht = u;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        xa(2, n, t), Ce || xa(4, n, t), _n(
          e,
          t,
          n
        );
        break;
      case 1:
        Ce || (bt(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function" && Cm(
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
        Ce = (i = Ce) || n.memoizedState !== null, _n(
          e,
          t,
          n
        ), Ce = i;
        break;
      case 30:
        bt(n, t), _n(
          e,
          t,
          n
        );
        break;
      case 7:
        Ce || bt(n, t), _n(
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
        Re(t, t.return, n);
      }
    }
  }
  function Gm(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        cl(e);
      } catch (n) {
        Re(t, t.return, n);
      }
  }
  function h1(e) {
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
  function ws(e, t) {
    var n = h1(e);
    t.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var u = z1.bind(null, e, i);
        i.then(u, u);
      }
    });
  }
  function Nt(e, t, n) {
    var i = t.deletions;
    if (i !== null)
      for (var u = 0; u < i.length; u++) {
        var s = i[u], d = e, p = t, _ = p;
        e: for (; _ !== null; ) {
          switch (_.tag) {
            case 27:
              if (Ca(_.type)) {
                Le = _.stateNode, Ht = !1;
                break e;
              }
              break;
            case 5:
              Le = _.stateNode, Ht = !1;
              break e;
            case 3:
            case 4:
              Le = _.stateNode.containerInfo, Ht = !0;
              break e;
          }
          _ = _.return;
        }
        if (Le === null) throw Error(c(160));
        Ym(d, p, s), Le = null, Ht = !1, d = s.alternate, d !== null && (d.return = null), s.return = null;
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
          for (var s = 0; s < i.length; s++) {
            var d = i[s];
            d.ref.impl = d.nextImpl;
          }
        Nt(t, e, n), Ct(e), u & 4 && (xa(3, e, e.return), Fl(3, e), xa(5, e, e.return));
        break;
      case 1:
        Nt(t, e, n), Ct(e), u & 512 && (Ce || i === null || bt(i, i.return)), u & 64 && dt && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
        break;
      case 26:
        if (s = Sn, Nt(t, e, n), Ct(e), u & 512 && (Ce || i === null || bt(i, i.return)), u & 4)
          if (u = i !== null ? i.memoizedState : null, n = e.memoizedState, i === null)
            if (n === null)
              if (e.stateNode === null)
                if (dt)
                  e.stateNode = Cv(
                    e.type,
                    e.memoizedProps,
                    t.containerInfo,
                    e
                  );
                else {
                  e: {
                    t = e.type, n = e.memoizedProps, u = s.ownerDocument || s;
                    t: switch (t) {
                      case "title":
                        i = u.getElementsByTagName("title")[0], (!i || i[zl] || i[vt] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = u.createElement(t), u.head.insertBefore(
                          i,
                          u.querySelector("head > title")
                        )), _t(i, t, n), i[vt] = e, ot(i), t = i;
                        break e;
                      case "link":
                        if (s = Wv(
                          "link",
                          "href",
                          u
                        ).get(t + (n.href || ""))) {
                          for (d = 0; d < s.length; d++)
                            if (i = s[d], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              s.splice(d, 1);
                              break t;
                            }
                        }
                        i = u.createElement(t), _t(i, t, n), u.head.appendChild(i);
                        break;
                      case "meta":
                        if (s = Wv(
                          "meta",
                          "content",
                          u
                        ).get(t + (n.content || ""))) {
                          for (d = 0; d < s.length; d++)
                            if (i = s[d], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              s.splice(d, 1);
                              break t;
                            }
                        }
                        i = u.createElement(t), _t(i, t, n), u.head.appendChild(i);
                        break;
                      default:
                        throw Error(c(468, t));
                    }
                    i[vt] = e, ot(i), t = i;
                  }
                  e.stateNode = t;
                }
              else
                dt || Ko(s, e.type, e.stateNode);
            else
              e.stateNode = Pv(
                s,
                n,
                e.memoizedProps
              );
          else
            u !== n ? (u === null ? (t = i.stateNode, t === null || Ce || t.parentNode.removeChild(t)) : u.count--, n === null ? dt || Ko(s, e.type, e.stateNode) : Pv(s, n, e.memoizedProps)) : n === null && e.stateNode !== null && Pc(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        break;
      case 27:
        Nt(t, e, n), Ct(e), u & 512 && (Ce || i === null || bt(i, i.return)), i !== null && u & 4 && Pc(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (s = Mn, Mn = !1, Nt(t, e, n), Mn = s, Ct(e), u & 512 && (Ce || i === null || bt(i, i.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            Ei(t, ""), Ee = !0;
          } catch (D) {
            Re(e, e.return, D);
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
            n.nodeValue = t, Ee = !0;
          } catch (D) {
            Re(e, e.return, D);
          }
        }
        break;
      case 3:
        if (Ee = !1, Xs = null, s = Sn, Sn = ru(t.containerInfo), Nt(t, e, n), Sn = s, Ct(e), u & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            cl(t.containerInfo);
          } catch (D) {
            Re(e, e.return, D);
          }
        uo && (uo = !1, Xm(e)), Ee = !1;
        break;
      case 4:
        u = Mn, Mn = dt, i = hd(), s = Sn, Sn = ru(
          e.stateNode.containerInfo
        ), Nt(t, e, n), Ct(e), Sn = s, Ee && Wl && (As = !0), Ee = i, Mn = u;
        break;
      case 12:
        Nt(t, e, n), Ct(e);
        break;
      case 31:
        Nt(t, e, n), Ct(e), u & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ws(e, t)));
        break;
      case 13:
        Nt(t, e, n), Ct(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Us = Gt()), u & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ws(e, t)));
        break;
      case 22:
        s = e.memoizedState !== null, d = i !== null && i.memoizedState !== null;
        var p = dt, _ = Ce, T = Mn;
        dt = p || s, Mn = T || s, Ce = _ || d, Nt(t, e, n), Ce = _, Mn = T, dt = p, Ct(e), u & 8192 && (t = e.stateNode, t._visibility = s ? t._visibility & -2 : t._visibility | 1, !s || i === null || d || dt || Ce || (t = d || Ce, n = dt, i = Ce, dt = s || dt, Ce = t, ja(e, 2), dt = n, Ce = i), !s && Mn || ro(e, s)), u & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, ws(e, n))));
        break;
      case 19:
        Nt(t, e, n), Ct(e), u & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, ws(e, t)));
        break;
      case 30:
        u & 512 && (Ce || i === null || bt(i, i.return)), u = hd(), s = Wl, d = (n & 335544064) === n, p = e.memoizedProps, Wl = d && Vn(
          p.default,
          p.update
        ) !== "none", Nt(t, e, n), Ct(e), d && i !== null && Ee && (e.flags |= 4), Wl = s, Ee = u;
        break;
      case 21:
        break;
      case 7:
        u & 512 && (Ce || i === null || bt(i, i.return)), i && i.stateNode !== null && (i.stateNode._fragmentFiber = e);
      default:
        Nt(t, e, n), Ct(e);
    }
  }
  function Ct(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, i = e.return; i !== null; ) {
          if (Rm(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        i = null;
        for (var u = e.return; u !== null; ) {
          if (Ic(u)) {
            var s = u.stateNode;
            i === null ? i = [s] : i.push(s);
          }
          if (Jc(u)) break;
          u = u.return;
        }
        var d = i;
        if (n == null) throw Error(c(160));
        switch (n.tag) {
          case 27:
            var p = n.stateNode, _ = Wc(e);
            Es(
              e,
              _,
              p,
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
      } catch (R) {
        Re(e, e.return, R);
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
            if (e = Rn, e !== null)
              for (var i = 0; i < e.length; i += 3) {
                n = e[i];
                var u = e[i + 1];
                Uv(n, e[i + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
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
          Rn = null;
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
          var s = e.memoizedProps, d = e.stateNode;
          t = Gn(s, d), d = Gn(n.memoizedProps, d);
          var p = Vn(s.default, s.update);
          p === "none" ? t = !1 : (s = n.memoizedState, n.memoizedState = null, n = e.child, kt = 0, t = lo(
            e,
            n,
            t,
            d,
            p,
            s,
            !0
          ), kt !== (s === null ? 0 : s.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (Pi(
            e,
            e.memoizedProps.onUpdate
          ), Rn = u) : u !== null && (u.push.apply(u, Rn), Rn = u), Dn = (e.flags & 32) !== 0 ? !0 : i;
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
          (i & 2) !== 0 && Xv(
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
          bt(n, n.return), u = n.stateNode, n.memoizedState !== null || u === null || Ce || u.parentNode.removeChild(u), ja(
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
      var i = t.alternate, u = e, s = t, d = s.flags, p = (n & 1) !== 0;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          xn(
            u,
            s,
            n
          ), Fl(4, s);
          break;
        case 1:
          if (xn(
            u,
            s,
            n
          ), i = s, u = i.stateNode, typeof u.componentDidMount == "function")
            try {
              u.componentDidMount();
            } catch (D) {
              Re(i, i.return, D);
            }
          if (i = s, u = i.updateQueue, u !== null) {
            var _ = i.stateNode;
            try {
              var T = u.shared.hiddenCallbacks;
              if (T !== null)
                for (u.shared.hiddenCallbacks = null, u = 0; u < T.length; u++)
                  ph(T[u], _);
            } catch (D) {
              Re(i, i.return, D);
            }
          }
          p && d & 64 && Nm(s), An(s, s.return);
          break;
        case 27:
          (n & 2) !== 0 && wm(s);
        case 5:
          s.tag !== 5 && s.tag !== 27 || Am(s), xn(
            u,
            s,
            n
          ), p && i === null && d & 4 && Fc(s), An(s, s.return);
          break;
        case 6:
          Am(s);
          break;
        case 26:
          _ = s.stateNode, s.memoizedState !== null || _ === null || dt || Ko(
            ru(_.ownerDocument),
            s.type,
            _
          ), xn(
            u,
            s,
            n
          ), p && i === null && d & 4 && Fc(s), An(s, s.return);
          break;
        case 12:
          xn(
            u,
            s,
            n
          );
          break;
        case 31:
          xn(
            u,
            s,
            n
          ), p && d & 4 && $m(u, s);
          break;
        case 13:
          xn(
            u,
            s,
            n
          ), p && d & 4 && Gm(u, s);
          break;
        case 22:
          s.memoizedState === null && xn(
            u,
            s,
            n
          ), An(s, s.return);
          break;
        case 30:
          xn(
            u,
            s,
            n
          ), An(s, s.return);
          break;
        case 7:
          An(s, s.return);
        default:
          xn(
            u,
            s,
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
    else u && qm(t);
  }
  function Jm(e, t, n, i) {
    var u = (n & 335544064) === n;
    u && t.alternate === null && t.return !== null && t.return.alternate !== null && Cs(t);
    var s = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        hn(
          e,
          t,
          n,
          i
        ), s & 2048 && Fl(9, t);
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
        ), u && so && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), s & 2048 && (s = null, t.alternate !== null && (s = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== s && (t.refCount++, s != null && kl(s)));
        break;
      case 12:
        if (s & 2048) {
          hn(
            e,
            t,
            n,
            i
          ), s = t.stateNode;
          try {
            var d = t.memoizedProps, p = d.id, _ = d.onPostCommit;
            typeof _ == "function" && _(
              p,
              t.alternate === null ? "mount" : "update",
              s.passiveEffectDuration,
              -0
            );
          } catch (T) {
            Re(t, t.return, T);
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
        d = t.stateNode, p = t.alternate, t.memoizedState !== null ? (u && p !== null && p.memoizedState === null && Cs(p), d._visibility & 2 ? hn(
          e,
          t,
          n,
          i
        ) : eu(
          e,
          t
        )) : (u && p !== null && p.memoizedState !== null && Cs(t), d._visibility & 2 ? hn(
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
        ))), s & 2048 && oo(p, t);
        break;
      case 24:
        hn(
          e,
          t,
          n,
          i
        ), s & 2048 && fo(t.alternate, t);
        break;
      case 30:
        u && (s = t.alternate, s !== null && (wn(s.child, !0), wn(t.child, !0))), hn(
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
      var s = e, d = t, p = n, _ = i, T = d.flags;
      switch (d.tag) {
        case 0:
        case 11:
        case 15:
          Vi(
            s,
            d,
            p,
            _,
            u
          ), Fl(8, d);
          break;
        case 23:
          break;
        case 22:
          var D = d.stateNode;
          d.memoizedState !== null ? D._visibility & 2 ? Vi(
            s,
            d,
            p,
            _,
            u
          ) : eu(
            s,
            d
          ) : (D._visibility |= 2, Vi(
            s,
            d,
            p,
            _,
            u
          )), u && T & 2048 && oo(
            d.alternate,
            d
          );
          break;
        case 24:
          Vi(
            s,
            d,
            p,
            _,
            u
          ), u && T & 2048 && fo(d.alternate, d);
          break;
        default:
          Vi(
            s,
            d,
            p,
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
        ), e.flags & ui && (e.memoizedState !== null ? bb(
          n,
          Sn,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && ap(n, e)));
        break;
      case 5:
        si(
          e,
          t,
          n
        ), e.flags & ui && (e = e.stateNode, (t & 335544128) === t && ap(n, e));
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
          var u = i.sibling, s = i.return;
          if (Qm(i), i === n) {
            ht = null;
            break e;
          }
          if (u !== null) {
            u.return = s, ht = u;
            break e;
          }
          ht = s;
        }
    }
  }
  var m1 = {
    getCacheForType: function(e) {
      var t = pt(tt), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return pt(tt).controller.signal;
    }
  }, v1 = typeof WeakMap == "function" ? WeakMap : Map, Te = 0, Ze = null, ye = null, _e = 0, Ae = 0, Pt = null, Oa = !1, Xi = !1, ho = !1, ta = 0, Fe = 0, za = 0, ri = 0, Ds = 0, Wt = 0, Ki = 0, nu = null, Bt = null, mo = !1, Us = 0, ev = 0, Zs = 1 / 0, qs = null, Ea = null, Ve = 0, jn = null, ci = null, Zn = 0, vo = 0, po = null, tv = null, Ji = null, Ii = null, Fi = null, au = 0, ks = null;
  function en() {
    return (Te & 2) !== 0 && _e !== 0 ? _e & -_e : K.T !== null ? Eo() : id();
  }
  function nv() {
    if (Wt === 0)
      if ((_e & 536870912) === 0 || ve) {
        var e = wu;
        wu <<= 1, (wu & 3932160) === 0 && (wu = 262144), Wt = e;
      } else Wt = 536870912;
    return e = yt.current, e !== null && (e.flags |= 32), Wt;
  }
  function Pi(e, t) {
    if (t != null) {
      var n = e.stateNode, i = n.ref;
      i === null && (i = n.ref = Zv(
        Gn(e.memoizedProps, n)
      )), Ii === null && (Ii = []), Ii.push(t.bind(null, i));
    }
  }
  function Lt(e, t, n) {
    (e === Ze && (Ae === 2 || Ae === 9) || e.cancelPendingCommit !== null) && (Wi(e, 0), Ta(
      e,
      _e,
      Wt,
      !1
    )), Ol(e, n), ((Te & 2) === 0 || e !== Ze) && (e === Ze && ((Te & 2) === 0 && (ri |= n), Fe === 4 && Ta(
      e,
      _e,
      Wt,
      !1
    )), qn(e));
  }
  function av(e, t, n) {
    if ((Te & 6) !== 0) throw Error(c(327));
    var i = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || jl(e, t), u = i ? g1(e, t) : go(e, t, !0), s = i;
    do {
      if (u === 0) {
        Xi && !i && Ta(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, s && !p1(n)) {
          u = go(e, t, !1), s = !1;
          continue;
        }
        if (u === 2) {
          if (s = t, e.errorRecoveryDisabledLanes & s)
            var d = 0;
          else
            d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
          if (d !== 0) {
            t = d;
            e: {
              var p = e;
              u = nu;
              var _ = p.current.memoizedState.isDehydrated;
              if (_ && (Wi(p, d).flags |= 256), d = go(
                p,
                d,
                !1
              ), d !== 2 && d !== 6) {
                if (ho && !_) {
                  p.errorRecoveryDisabledLanes |= s, ri |= s, u = 4;
                  break e;
                }
                s = Bt, Bt = u, s !== null && (Bt === null ? Bt = s : Bt.push.apply(
                  Bt,
                  s
                ));
              }
              u = d;
            }
            if (s = !1, u !== 2) continue;
          }
        }
        if (u === 1) {
          Wi(e, 0), Ta(e, t, 0, !0);
          break;
        }
        e: {
          switch (i = e, s = u, s) {
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
            Zn = t, i.timeoutHandle = qo(
              iv.bind(
                null,
                i,
                n,
                Bt,
                qs,
                mo,
                t,
                Wt,
                ri,
                Ki,
                Oa,
                s,
                "Throttled",
                -0,
                0
              ),
              u
            );
            break e;
          }
          iv(
            i,
            n,
            Bt,
            qs,
            mo,
            t,
            Wt,
            ri,
            Ki,
            Oa,
            s,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    qn(e);
  }
  function iv(e, t, n, i, u, s, d, p, _, T, D, k, z, R) {
    e.timeoutHandle = -1;
    var X = t.subtreeFlags, P = (s & 335544064) === s;
    if (k = null, (P || X & 8192 || (X & 16785408) === 16785408) && (k = {
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
      s,
      k
    ), P && (X = k, P = e.containerInfo, P = (P.nodeType === 9 ? P : P.ownerDocument).__reactViewTransition, P != null && (X.count++, X.waitingForViewTransition = !0, X = fu.bind(X), P.finished.then(X, X))), X = (s & 62914560) === s ? Us - Gt() : (s & 4194048) === s ? ev - Gt() : 0, X = _b(
      k,
      X
    ), X !== null)) {
      Zn = s, e.cancelPendingCommit = X(
        dv.bind(
          null,
          e,
          t,
          s,
          n,
          i,
          u,
          d,
          p,
          _,
          T,
          D,
          k,
          null,
          z,
          R
        )
      ), Ta(e, s, d, !T);
      return;
    }
    dv(
      e,
      t,
      s,
      n,
      i,
      u,
      d,
      p,
      _,
      T,
      D,
      k
    );
  }
  function p1(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var u = n[i], s = u.getSnapshot;
          u = u.value;
          try {
            if (!Jt(s(), u)) return !1;
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
      var s = 31 - Xt(u), d = 1 << s;
      i[s] = -1, u &= ~d;
    }
    n !== 0 && td(e, n, t);
  }
  function Hs() {
    return (Te & 6) === 0 ? (iu(0), !1) : !0;
  }
  function yo() {
    if (ye !== null) {
      if (Ae === 0)
        var e = ye.return;
      else
        e = ye, Jn = Ia = null, Oc(e), Hi = null, Ll = 0, e = ye;
      for (; e !== null; )
        Tm(e.alternate, e), e = e.return;
      ye = null;
    }
  }
  function Wi(e, t) {
    var n = e.timeoutHandle;
    return n !== -1 && (e.timeoutHandle = -1, B1(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), Zn = 0, yo(), Ze = e, ye = n = Xn(e.current, null), _e = t, Ae = 0, Pt = null, Oa = !1, Xi = jl(e, t), ho = !1, Ki = Wt = Ds = ri = za = Fe = 0, Bt = nu = null, mo = !1, ta = Wf(e, t), Xu(), n;
  }
  function lv(e, t) {
    de = null, K.H = gs, t === ki || t === is ? (t = dh(), Ae = 3) : t === fc ? (t = dh(), Ae = 4) : Ae = t === Hc ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Pt = t, ye === null && (Fe = 1, bs(
      e,
      cn(t, e.current)
    ));
  }
  function uv() {
    var e = yt.current;
    return e === null ? !0 : (_e & 4194048) === _e ? zt === null : (_e & 62914560) === _e || (_e & 536870912) !== 0 ? e === zt : !1;
  }
  function sv() {
    var e = K.H;
    return K.H = gs, e === null ? gs : e;
  }
  function rv() {
    var e = K.A;
    return K.A = m1, e;
  }
  function Bs() {
    Fe = 4, Oa || (_e & 4194048) !== _e && yt.current !== null || (Xi = !0), (za & 134217727) === 0 && (ri & 134217727) === 0 || Ze === null || Ta(
      Ze,
      _e,
      Wt,
      !1
    );
  }
  function go(e, t, n) {
    var i = Te;
    Te |= 2;
    var u = sv(), s = rv();
    (Ze !== e || _e !== t) && (qs = null, Wi(e, t)), t = !1;
    var d = Fe;
    e: do
      try {
        if (Ae !== 0 && ye !== null) {
          var p = ye, _ = Pt;
          switch (Ae) {
            case 8:
              yo(), d = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              yt.current === null && (t = !0);
              var T = Ae;
              if (Ae = 0, Pt = null, el(e, p, _, T), n && Xi) {
                d = 0;
                break e;
              }
              break;
            default:
              T = Ae, Ae = 0, Pt = null, el(e, p, _, T);
          }
        }
        y1(), d = Fe;
        break;
      } catch (D) {
        lv(e, D);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Jn = Ia = null, Te = i, K.H = u, K.A = s, ye === null && (Ze = null, _e = 0, Xu()), d;
  }
  function y1() {
    for (; ye !== null; ) cv(ye);
  }
  function g1(e, t) {
    var n = Te;
    Te |= 2;
    var i = sv(), u = rv();
    Ze !== e || _e !== t ? (qs = null, Zs = Gt() + 500, Wi(e, t)) : Xi = jl(
      e,
      t
    );
    e: do
      try {
        if (Ae !== 0 && ye !== null) {
          t = ye;
          var s = Pt;
          t: switch (Ae) {
            case 1:
              Ae = 0, Pt = null, el(e, t, s, 1);
              break;
            case 2:
            case 9:
              if (oh(s)) {
                Ae = 0, Pt = null, ov(t);
                break;
              }
              t = function() {
                Ae !== 2 && Ae !== 9 || Ze !== e || (Ae = 7), qn(e);
              }, s.then(t, t);
              break e;
            case 3:
              Ae = 7;
              break e;
            case 4:
              Ae = 5;
              break e;
            case 7:
              oh(s) ? (Ae = 0, Pt = null, ov(t)) : (Ae = 0, Pt = null, el(e, t, s, 7));
              break;
            case 5:
              var d = null;
              switch (ye.tag) {
                case 26:
                  d = ye.memoizedState;
                case 5:
                case 27:
                  var p = ye;
                  if (d ? tp(d) : p.stateNode.complete) {
                    Ae = 0, Pt = null;
                    var _ = p.sibling;
                    if (_ !== null) ye = _;
                    else {
                      var T = p.return;
                      T !== null ? (ye = T, Ls(T)) : ye = null;
                    }
                    break t;
                  }
              }
              Ae = 0, Pt = null, el(e, t, s, 5);
              break;
            case 6:
              Ae = 0, Pt = null, el(e, t, s, 6);
              break;
            case 8:
              yo(), Fe = 6;
              break e;
            default:
              throw Error(c(462));
          }
        }
        b1();
        break;
      } catch (D) {
        lv(e, D);
      }
    while (!0);
    return Jn = Ia = null, K.H = i, K.A = u, Te = n, ye !== null ? 0 : (Ze = null, _e = 0, Xu(), Fe);
  }
  function b1() {
    for (; ye !== null && !Er(); )
      cv(ye);
  }
  function cv(e) {
    var t = zm(e.alternate, e, ta);
    e.memoizedProps = e.pendingProps, t === null ? Ls(e) : ye = t;
  }
  function ov(e) {
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
          _e
        );
        break;
      case 11:
        t = gm(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          _e
        );
        break;
      case 5:
        Oc(t);
        var i = t;
        i === ft && (ve ? (Wu(i), i.tag === 5 && i.stateNode != null && (qe = i.stateNode)) : (Wu(i), ve = !0));
      default:
        Tm(n, t), t = ye = Wd(t, ta), t = zm(n, t, ta);
    }
    e.memoizedProps = e.pendingProps, t === null ? Ls(e) : ye = t;
  }
  function el(e, t, n, i) {
    Jn = Ia = null, Oc(t), Hi = null, Ll = 0;
    var u = t.return;
    try {
      if (u1(
        e,
        u,
        t,
        n,
        _e
      )) {
        Fe = 1, bs(
          e,
          cn(n, e.current)
        ), ye = null;
        return;
      }
    } catch (s) {
      if (u !== null) throw ye = u, s;
      Fe = 1, bs(
        e,
        cn(n, e.current)
      ), ye = null;
      return;
    }
    t.flags & 32768 ? (ve || i === 1 ? e = !0 : Xi || (_e & 536870912) !== 0 ? e = !1 : (Oa = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = yt.current, i !== null && i.tag === 13 && (i.flags |= 16384))), fv(t, e)) : Ls(t);
  }
  function Ls(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        fv(
          t,
          Oa
        );
        return;
      }
      e = t.return;
      var n = o1(
        t.alternate,
        t,
        ta
      );
      if (n !== null) {
        ye = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        ye = t;
        return;
      }
      ye = t = e;
    } while (t !== null);
    Fe === 0 && (Fe = 5);
  }
  function fv(e, t) {
    do {
      var n = f1(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, ye = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        ye = e;
        return;
      }
      ye = e = n;
    } while (e !== null);
    Fe = 6, ye = null;
  }
  function dv(e, t, n, i, u, s, d, p, _, T, D, k) {
    e.cancelPendingCommit = null;
    do
      Qs();
    while (Ve !== 0);
    if ((Te & 6) !== 0) throw Error(c(327));
    if (t !== null) {
      if (t === e.current) throw Error(c(177));
      e === Ze && (ye = Ze = null, _e = 0), ci = t, jn = e, Zn = n, po = u, tv = i, _1(
        e,
        t,
        n,
        d,
        p,
        _,
        k
      );
    }
  }
  function _1(e, t, n, i, u, s, d) {
    var p = t.lanes | t.childLanes;
    if (vo = p, p |= Pr, Vg(
      e,
      n,
      p,
      i,
      u,
      s
    ), Ii = null, (n & 335544064) === n ? (Fi = K0(e), i = 10262) : (Fi = null, i = 10256), (t.subtreeFlags & i) !== 0 || (t.flags & i) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, E1(Au, function() {
      return xo(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Ts = !1, i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
      i = K.T, K.T = null, u = se.p, se.p = 2, s = Te, Te |= 4;
      try {
        d1(e, t, n);
      } finally {
        Te = s, se.p = u, K.T = i;
      }
    }
    Ve = 1, Ts ? Ji = V1(
      d,
      e.containerInfo,
      Fi,
      bo,
      _o,
      x1,
      So,
      xo,
      S1
    ) : (bo(), _o(), So());
  }
  function S1(e) {
    if (Ve !== 0) {
      var t = jn.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function x1() {
    Ve === 3 && (Ve = 0, Km(ci, jn), Ve = 4);
  }
  function bo() {
    if (Ve === 1) {
      Ve = 0;
      var e = jn, t = ci, n = Zn, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = K.T, K.T = null;
        var u = se.p;
        se.p = 2;
        var s = Te;
        Te |= 4;
        try {
          Wl = As = !1, Vm(t, e, n), n = Do;
          var d = Yd(e.containerInfo), p = n.focusedElem, _ = n.selectionRange;
          if (d !== p && p && p.ownerDocument && Qd(
            p.ownerDocument.documentElement,
            p
          )) {
            if (_ !== null && Xr(p)) {
              var T = _.start, D = _.end;
              if (D === void 0 && (D = T), "selectionStart" in p)
                p.selectionStart = T, p.selectionEnd = Math.min(
                  D,
                  p.value.length
                );
              else {
                var k = p.ownerDocument || document, z = k && k.defaultView || window;
                if (z.getSelection) {
                  var R = z.getSelection(), X = p.textContent.length, P = Math.min(_.start, X), he = _.end === void 0 ? P : Math.min(_.end, X);
                  !R.extend && P > he && (d = he, he = P, P = d);
                  var E = Ld(
                    p,
                    P
                  ), x = Ld(
                    p,
                    he
                  );
                  if (E && x && (R.rangeCount !== 1 || R.anchorNode !== E.node || R.anchorOffset !== E.offset || R.focusNode !== x.node || R.focusOffset !== x.offset)) {
                    var C = k.createRange();
                    C.setStart(E.node, E.offset), R.removeAllRanges(), P > he ? (R.addRange(C), R.extend(x.node, x.offset)) : (C.setEnd(x.node, x.offset), R.addRange(C));
                  }
                }
              }
            }
            for (k = [], R = p; R = R.parentNode; )
              R.nodeType === 1 && k.push({
                element: R,
                left: R.scrollLeft,
                top: R.scrollTop
              });
            for (typeof p.focus == "function" && p.focus(), p = 0; p < k.length; p++) {
              var q = k[p];
              q.element.scrollLeft = q.left, q.element.scrollTop = q.top;
            }
          }
          rl = !!Mo, Do = Mo = null;
        } finally {
          Te = s, se.p = u, K.T = i;
        }
      }
      e.current = t, Ve = 2;
    }
  }
  function _o() {
    if (Ve === 2) {
      Ve = 0;
      var e = jn, t = ci, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = K.T, K.T = null;
        var i = se.p;
        se.p = 2;
        var u = Te;
        Te |= 4;
        try {
          Bm(e, t.alternate, t);
        } finally {
          Te = u, se.p = i, K.T = n;
        }
      }
      Ve = 3;
    }
  }
  function So() {
    if (Ve === 4 || Ve === 3) {
      Ve = 0;
      var e = Ji;
      Ji = null, qg();
      var t = jn, n = ci, i = Zn, u = tv, s = (i & 335544064) === i ? 10262 : 10256;
      if ((n.subtreeFlags & s) !== 0 || (n.flags & s) !== 0 ? Ve = 5 : (Ve = 0, ci = jn = null, hv(t, t.pendingLanes)), s = t.pendingLanes, s === 0 && (Ea = null), Cr(i), n = n.stateNode, Vt && typeof Vt.onCommitFiberRoot == "function")
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
        n = K.T, s = se.p, se.p = 2, K.T = null;
        try {
          for (var d = t.onRecoverableError, p = 0; p < u.length; p++) {
            var _ = u[p];
            d(_.value, {
              componentStack: _.stack
            });
          }
        } finally {
          K.T = n, se.p = s;
        }
      }
      if (u = Ii, d = Fi, Fi = null, u !== null && (Ii = null, d === null && (d = []), e !== null))
        for (_ = 0; _ < u.length; _++)
          n = (0, u[_])(
            d
          ), n !== void 0 && e.finished.finally(n);
      (Zn & 3) !== 0 && Qs(), qn(t), s = t.pendingLanes, (i & 261930) !== 0 && (s & 42) !== 0 ? t === ks ? au++ : (au = 0, ks = t) : (au = 0, ks = null), iu(0);
    }
  }
  function hv(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, kl(t)));
  }
  function Qs() {
    return Ji !== null && (Ji.skipTransition(), Ji = null), bo(), _o(), So(), xo();
  }
  function xo() {
    if (Ve !== 5) return !1;
    var e = jn, t = vo;
    vo = 0;
    var n = Cr(Zn), i = K.T, u = se.p;
    try {
      se.p = 32 > n ? 32 : n, K.T = null, n = po, po = null;
      var s = jn, d = Zn;
      if (Ve = 0, ci = jn = null, Zn = 0, (Te & 6) !== 0) throw Error(c(331));
      var p = Te;
      if (Te |= 4, Pm(s.current), Jm(
        s,
        s.current,
        d,
        n
      ), Te = p, iu(0, !1), Vt && typeof Vt.onPostCommitFiberRoot == "function")
        try {
          Vt.onPostCommitFiberRoot(xl, s);
        } catch {
        }
      return !0;
    } finally {
      se.p = u, K.T = i, hv(e, t);
    }
  }
  function mv(e, t, n) {
    t = cn(n, t), t = kc(e.stateNode, t, 2), e = ga(e, t, 2), e !== null && (Ol(e, 2), qn(e));
  }
  function Re(e, t, n) {
    if (e.tag === 3)
      mv(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          mv(
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
            ), Ol(i, 2), qn(i));
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
    u.has(n) || (ho = !0, u.add(n), e = j1.bind(null, e, t, n), t.then(e, e));
  }
  function j1(e, t, n) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Ze === e && (_e & n) === n && ((Fe === 4 || Fe === 3 && (_e & 62914560) === _e && 300 > Gt() - Us) && (Te & 2) === 0 ? Wi(e, 0) : Ds |= n, Ki === _e && (Ki = 0)), qn(e);
  }
  function vv(e, t) {
    t === 0 && (t = ed()), e = Xa(e, t), e !== null && (Ol(e, t), qn(e));
  }
  function O1(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), vv(e, n);
  }
  function z1(e, t) {
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
    i !== null && i.delete(t), vv(e, n);
  }
  function E1(e, t) {
    return ze(e, t);
  }
  var tl = null, nl = null, Oo = !1, Ys = !1, zo = !1, Na = 0;
  function qn(e) {
    e !== nl && e.next === null && (nl === null ? tl = nl = e : nl = nl.next = e), Ys = !0, Oo || (Oo = !0, N1());
  }
  function iu(e, t) {
    if (!zo && Ys) {
      zo = !0;
      do
        for (var n = !1, i = tl; i !== null; ) {
          if (e !== 0) {
            var u = i.pendingLanes;
            if (u === 0) var s = 0;
            else {
              var d = i.suspendedLanes, p = i.pingedLanes;
              s = (1 << 31 - Xt(42 | e) + 1) - 1, s &= u & ~(d & ~p), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (n = !0, bv(i, s));
          } else
            s = _e, s = Du(
              i,
              i === Ze ? s : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (s & 3) === 0 || jl(i, s) || (n = !0, bv(i, s));
          i = i.next;
        }
      while (n);
      zo = !1;
    }
  }
  function T1() {
    pv();
  }
  function pv() {
    Ys = Oo = !1;
    var e = 0;
    Na !== 0 && H1() && (e = Na);
    for (var t = Gt(), n = null, i = tl; i !== null; ) {
      var u = i.next, s = yv(i, t);
      s === 0 ? (i.next = null, n === null ? tl = u : n.next = u, u === null && (nl = n)) : (n = i, (e !== 0 || (s & 3) !== 0) && (Ys = !0)), i = u;
    }
    Ve !== 0 && Ve !== 5 || iu(e), Na !== 0 && (Na = 0);
  }
  function yv(e, t) {
    for (var n = e.suspendedLanes, i = e.pingedLanes, u = e.expirationTimes, s = e.pendingLanes & -62914561; 0 < s; ) {
      var d = 31 - Xt(s), p = 1 << d, _ = u[d];
      _ === -1 ? ((p & n) === 0 || (p & i) !== 0) && (u[d] = Gg(p, t)) : _ <= t && (e.expiredLanes |= p), s &= ~p;
    }
    if (t = Ze, n = _e, n = Du(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, n === 0 || e === t && (Ae === 2 || Ae === 9) || e.cancelPendingCommit !== null)
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
      return i = gv.bind(null, e), n = ze(n, i), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return i !== null && i !== null && Ut(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function gv(e, t) {
    if (Ve !== 0 && Ve !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if (Qs() && e.callbackNode !== n)
      return null;
    var i = _e;
    return i = Du(
      e,
      e === Ze ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (av(e, i, t), yv(e, Gt()), e.callbackNode != null && e.callbackNode === n ? gv.bind(null, e) : null);
  }
  function bv(e, t) {
    if (Qs()) return null;
    av(e, t, !0);
  }
  function N1() {
    L1(function() {
      (Te & 6) !== 0 ? ze(
        If,
        T1
      ) : pv();
    });
  }
  function Eo() {
    if (Na === 0) {
      var e = Wa;
      e === 0 && (e = Ru, Ru <<= 1, (Ru & 261888) === 0 && (Ru = 256)), Na = e;
    }
    return Na;
  }
  function _v(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Hu(e);
  }
  function C1(e, t, n, i, u) {
    if (t === "submit" && n && n.stateNode === u) {
      var s = _v(
        (u[Zt] || null).action
      ), d = i.submitter;
      d && (t = (t = d[Zt] || null) ? _v(t.formAction) : d.getAttribute("formAction"), t !== null && (s = t, d = null));
      var p = new Yu(
        "action",
        "action",
        null,
        i,
        u
      );
      e.push({
        event: p,
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
                      action: s
                    },
                    null,
                    _
                  );
                }
              } else
                typeof s == "function" && (p.preventDefault(), _ = new FormData(u, d), Mc(
                  n,
                  {
                    pending: !0,
                    data: _,
                    method: u.method,
                    action: s
                  },
                  s,
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
    var No = Fr[To], A1 = No.toLowerCase(), R1 = No[0].toUpperCase() + No.slice(1);
    bn(
      A1,
      "on" + R1
    );
  }
  bn(Vd, "onAnimationEnd"), bn(Xd, "onAnimationIteration"), bn(Kd, "onAnimationStart"), bn("dblclick", "onDoubleClick"), bn("focusin", "onFocus"), bn("focusout", "onBlur"), bn(B0, "onTransitionRun"), bn(L0, "onTransitionStart"), bn(Q0, "onTransitionCancel"), bn(Jd, "onTransitionEnd"), Oi("onMouseEnter", ["mouseout", "mouseover"]), Oi("onMouseLeave", ["mouseout", "mouseover"]), Oi("onPointerEnter", ["pointerout", "pointerover"]), Oi("onPointerLeave", ["pointerout", "pointerover"]), $a(
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
  ), w1 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(lu)
  );
  function Sv(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var i = e[n], u = i.event;
      i = i.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var d = i.length - 1; 0 <= d; d--) {
            var p = i[d], _ = p.instance, T = p.currentTarget;
            if (p = p.listener, _ !== s && u.isPropagationStopped())
              break e;
            s = p, u.currentTarget = T;
            try {
              s(u);
            } catch (D) {
              Vu(D);
            }
            u.currentTarget = null, s = _;
          }
        else
          for (d = 0; d < i.length; d++) {
            if (p = i[d], _ = p.instance, T = p.currentTarget, p = p.listener, _ !== s && u.isPropagationStopped())
              break e;
            s = p, u.currentTarget = T;
            try {
              s(u);
            } catch (D) {
              Vu(D);
            }
            u.currentTarget = null, s = _;
          }
      }
    }
  }
  function ge(e, t) {
    var n = t[ud];
    n === void 0 && (n = t[ud] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    n.has(i) || (xv(t, e, 2, !1), n.add(i));
  }
  function Co(e, t, n) {
    var i = 0;
    t && (i |= 4), xv(
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
        n !== "selectionchange" && (w1.has(n) || Co(n, !1, e), Co(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[$s] || (t[$s] = !0, Co("selectionchange", !1, t));
    }
  }
  function xv(e, t, n, i) {
    switch (fp(t)) {
      case 2:
        var u = Ob;
        break;
      case 8:
        u = zb;
        break;
      default:
        u = Io;
    }
    n = u.bind(
      null,
      t,
      n,
      e
    ), u = void 0, !qr || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (u = !0), i ? u !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: u
    }) : e.addEventListener(t, n, !0) : u !== void 0 ? e.addEventListener(t, n, {
      passive: u
    }) : e.addEventListener(t, n, !1);
  }
  function Ro(e, t, n, i, u) {
    var s = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var d = i.tag;
        if (d === 3 || d === 4) {
          var p = i.stateNode.containerInfo;
          if (p === u) break;
          if (d === 4)
            for (d = i.return; d !== null; ) {
              var _ = d.tag;
              if ((_ === 3 || _ === 4) && d.stateNode.containerInfo === u)
                return;
              d = d.return;
            }
          for (; p !== null; ) {
            if (d = Ya(p), d === null) return;
            if (_ = d.tag, _ === 5 || _ === 6 || _ === 26 || _ === 27) {
              i = s = d;
              continue e;
            }
            p = p.parentNode;
          }
        }
        i = i.return;
      }
    xd(function() {
      var T = s, D = Ur(n), k = [];
      e: {
        var z = Id.get(e);
        if (z !== void 0) {
          var R = Yu, X = e;
          switch (e) {
            case "keypress":
              if (Lu(n) === 0) break e;
            case "keydown":
            case "keyup":
              R = p0;
              break;
            case "focusin":
              X = "focus", R = Lr;
              break;
            case "focusout":
              X = "blur", R = Lr;
              break;
            case "beforeblur":
            case "afterblur":
              R = Lr;
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
              R = zd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              R = i0;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              R = S0;
              break;
            case Vd:
            case Xd:
            case Kd:
              R = s0;
              break;
            case Jd:
              R = j0;
              break;
            case "scroll":
            case "scrollend":
              R = n0;
              break;
            case "wheel":
              R = z0;
              break;
            case "copy":
            case "cut":
            case "paste":
              R = c0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              R = Td;
              break;
            case "submit":
              R = b0;
              break;
            case "toggle":
            case "beforetoggle":
              R = T0;
          }
          var P = (t & 4) !== 0, he = !P && (e === "scroll" || e === "scrollend"), E = P ? z !== null ? z + "Capture" : null : z;
          P = [];
          for (var x = T, C; x !== null; ) {
            var q = x;
            if (C = q.stateNode, q = q.tag, q !== 5 && q !== 26 && q !== 27 || C === null || E === null || (q = Tl(x, E), q != null && P.push(
              uu(x, q, C)
            )), he) break;
            x = x.return;
          }
          0 < P.length && (z = new R(
            z,
            X,
            null,
            n,
            D
          ), k.push({ event: z, listeners: P }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (R = e === "mouseover" || e === "pointerover", z = e === "mouseout" || e === "pointerout", R && n !== Dr && (X = n.relatedTarget || n.fromElement) && (Ya(X) || X[Si]))
            break e;
          (z || R) && (X = D.window === D ? D : (R = D.ownerDocument) ? R.defaultView || R.parentWindow : window, z ? (R = n.relatedTarget || n.toElement, z = T, R = R ? Ya(R) : null, R !== null && (he = h(R), P = R.tag, R !== he || P !== 5 && P !== 27 && P !== 6) && (R = null)) : (z = null, R = T), z !== R && (P = zd, q = "onMouseLeave", E = "onMouseEnter", x = "mouse", (e === "pointerout" || e === "pointerover") && (P = Td, q = "onPointerLeave", E = "onPointerEnter", x = "pointer"), he = z == null ? X : El(z), C = R == null ? X : El(R), X = new P(
            q,
            x + "leave",
            z,
            n,
            D
          ), X.target = he, X.relatedTarget = C, q = null, Ya(D) === T && (P = new P(
            E,
            x + "enter",
            R,
            n,
            D
          ), P.target = C, P.relatedTarget = he, q = P), he = q, P = z && R ? I(
            z,
            R,
            M1
          ) : null, z !== null && jv(
            k,
            X,
            z,
            P,
            !1
          ), R !== null && he !== null && jv(
            k,
            he,
            R,
            P,
            !0
          )));
        }
        e: {
          if (z = T ? El(T) : window, R = z.nodeName && z.nodeName.toLowerCase(), R === "select" || R === "input" && z.type === "file")
            var J = Ud;
          else if (Md(z))
            if (Zd)
              J = q0;
            else {
              J = U0;
              var Se = D0;
            }
          else
            R = z.nodeName, !R || R.toLowerCase() !== "input" || z.type !== "checkbox" && z.type !== "radio" ? T && Mr(T.elementType) && (J = Ud) : J = Z0;
          if (J && (J = J(e, T))) {
            Dd(
              k,
              J,
              n,
              D
            );
            break e;
          }
          Se && Se(e, z, T);
        }
        switch (Se = T ? El(T) : window, e) {
          case "focusin":
            (Md(Se) || Se.contentEditable === "true") && (Ai = Se, Kr = T, Ul = null);
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
            if (H0) break;
          case "keydown":
          case "keyup":
            $d(k, n, D);
        }
        var ne;
        if (Yr)
          e: {
            switch (e) {
              case "compositionstart":
                var le = "onCompositionStart";
                break e;
              case "compositionend":
                le = "onCompositionEnd";
                break e;
              case "compositionupdate":
                le = "onCompositionUpdate";
                break e;
            }
            le = void 0;
          }
        else
          Ci ? Rd(e, n) && (le = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (le = "onCompositionStart");
        le && (Nd && n.locale !== "ko" && (Ci || le !== "onCompositionStart" ? le === "onCompositionEnd" && Ci && (ne = jd()) : (ca = D, kr = "value" in ca ? ca.value : ca.textContent, Ci = !0)), Se = Gs(T, le), 0 < Se.length && (le = new Ed(
          le,
          e,
          null,
          n,
          D
        ), k.push({ event: le, listeners: Se }), ne ? le.data = ne : (ne = wd(n), ne !== null && (le.data = ne)))), (ne = C0 ? A0(e, n) : R0(e, n)) && (le = Gs(T, "onBeforeInput"), 0 < le.length && (Se = new Ed(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          D
        ), k.push({
          event: Se,
          listeners: le
        }), Se.data = ne)), C1(
          k,
          e,
          T,
          n,
          D
        );
      }
      Sv(k, t);
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
      var u = e, s = u.stateNode;
      if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || s === null || (u = Tl(e, n), u != null && i.unshift(
        uu(e, u, s)
      ), u = Tl(e, t), u != null && i.push(
        uu(e, u, s)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function M1(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function jv(e, t, n, i, u) {
    for (var s = t._reactName, d = []; n !== null && n !== i; ) {
      var p = n, _ = p.alternate, T = p.stateNode;
      if (p = p.tag, _ !== null && _ === i) break;
      p !== 5 && p !== 26 && p !== 27 || T === null || (_ = T, u ? (T = Tl(n, s), T != null && d.unshift(
        uu(n, T, _)
      )) : u || (T = Tl(n, s), T != null && d.push(
        uu(n, T, _)
      ))), n = n.return;
    }
    d.length !== 0 && e.push({ event: t, listeners: d });
  }
  var D1 = /\r\n?/g, U1 = /\u0000|\uFFFD/g;
  function Ov(e) {
    return (typeof e == "string" ? e : "" + e).replace(D1, `
`).replace(U1, "");
  }
  function zv(e, t) {
    return t = Ov(t), Ov(e) === t;
  }
  function we(e, t, n, i, u, s) {
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
        _d(e, i, s);
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
          typeof s == "function" && (n === "formAction" ? (t !== "input" && we(e, t, "name", u.name, u, null), we(
            e,
            t,
            "formEncType",
            u.formEncType,
            u,
            null
          ), we(
            e,
            t,
            "formMethod",
            u.formMethod,
            u,
            null
          ), we(
            e,
            t,
            "formTarget",
            u.formTarget,
            u,
            null
          )) : (we(e, t, "encType", u.encType, u, null), we(e, t, "method", u.method, u, null), we(e, t, "target", u.target, u, null)));
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
        i != null && ge("scroll", e);
        return;
      case "onScrollEnd":
        i != null && ge("scrollend", e);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(c(61));
          if (n = i.__html, n != null) {
            if (u.children != null) throw Error(c(60));
            s?.__html !== n && (e.innerHTML = n);
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
        ge("beforetoggle", e), ge("toggle", e), qu(e, "popover", i);
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
        qu(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = e0.get(n) || n, qu(e, n, i);
        else return;
    }
    Ee = !0;
  }
  function wo(e, t, n, i, u, s) {
    switch (n) {
      case "style":
        _d(e, i, s);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(c(61));
          if (n = i.__html, n != null) {
            if (u.children != null) throw Error(c(60));
            s?.__html !== n && (e.innerHTML = n);
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
        i != null && ge("scroll", e);
        return;
      case "onScrollEnd":
        i != null && ge("scrollend", e);
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
            if (n[0] === "o" && n[1] === "n" && (u = n.endsWith("Capture"), s = n.slice(2, u ? n.length - 7 : void 0), t = e[Zt] || null, t = t != null ? t[n] : null, typeof t == "function" && e.removeEventListener(s, t, u), typeof i == "function")) {
              typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(s, i, u);
              break e;
            }
            Ee = !0, n in e ? e[n] = i : i === !0 ? e.setAttribute(n, "") : qu(e, n, i);
          }
        return;
    }
    Ee = !0;
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
        ge("error", e), ge("load", e);
        var i = !1, u = !1, s;
        for (s in n)
          if (n.hasOwnProperty(s)) {
            var d = n[s];
            if (d != null)
              switch (s) {
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
                  we(e, t, s, d, n, null);
              }
          }
        u && we(e, t, "srcSet", n.srcSet, n, null), i && we(e, t, "src", n.src, n, null);
        return;
      case "input":
        ge("invalid", e);
        var p = s = d = u = null, _ = null, T = null;
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
                  s = D;
                  break;
                case "defaultValue":
                  p = D;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (D != null)
                    throw Error(c(137, t));
                  break;
                default:
                  we(e, t, i, D, n, null);
              }
          }
        pd(
          e,
          s,
          p,
          _,
          T,
          d,
          u,
          !1
        );
        return;
      case "select":
        ge("invalid", e), i = d = s = null;
        for (u in n)
          if (n.hasOwnProperty(u) && (p = n[u], p != null))
            switch (u) {
              case "value":
                s = p;
                break;
              case "defaultValue":
                d = p;
                break;
              case "multiple":
                i = p;
              default:
                we(e, t, u, p, n, null);
            }
        t = s, n = d, e.multiple = !!i, t != null ? zi(e, !!i, t, !1) : n != null && zi(e, !!i, n, !0);
        return;
      case "textarea":
        ge("invalid", e), s = u = i = null;
        for (d in n)
          if (n.hasOwnProperty(d) && (p = n[d], p != null))
            switch (d) {
              case "value":
                i = p;
                break;
              case "defaultValue":
                u = p;
                break;
              case "children":
                s = p;
                break;
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(c(91));
                break;
              default:
                we(e, t, d, p, n, null);
            }
        gd(e, i, u, s);
        return;
      case "option":
        for (_ in n)
          n.hasOwnProperty(_) && (i = n[_], i != null) && (_ === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : we(e, t, _, i, n, null));
        return;
      case "dialog":
        ge("beforetoggle", e), ge("toggle", e), ge("cancel", e), ge("close", e);
        break;
      case "iframe":
      case "object":
        ge("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < lu.length; i++)
          ge(lu[i], e);
        break;
      case "image":
        ge("error", e), ge("load", e);
        break;
      case "details":
        ge("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        ge("error", e), ge("load", e);
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
                we(e, t, T, i, n, null);
            }
        return;
      default:
        if (Mr(t)) {
          for (D in n)
            n.hasOwnProperty(D) && (i = n[D], i !== void 0 && wo(
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
    for (p in n)
      n.hasOwnProperty(p) && (i = n[p], i != null && we(e, t, p, i, n, null));
  }
  var Z1 = {};
  function q1(e, t, n, i) {
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
        var u = null, s = null, d = null, p = null, _ = null, T = null, D = null;
        for (R in n) {
          var k = n[R];
          if (n.hasOwnProperty(R) && k != null)
            switch (R) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                _ = k;
              default:
                i.hasOwnProperty(R) || we(e, t, R, null, i, k);
            }
        }
        for (var z in i) {
          var R = i[z];
          if (k = n[z], i.hasOwnProperty(z) && (R != null || k != null))
            switch (z) {
              case "type":
                R !== k && (Ee = !0), s = R;
                break;
              case "name":
                R !== k && (Ee = !0), u = R;
                break;
              case "checked":
                R !== k && (Ee = !0), T = R;
                break;
              case "defaultChecked":
                R !== k && (Ee = !0), D = R;
                break;
              case "value":
                R !== k && (Ee = !0), d = R;
                break;
              case "defaultValue":
                R !== k && (Ee = !0), p = R;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (R != null)
                  throw Error(c(137, t));
                break;
              default:
                R !== k && we(
                  e,
                  t,
                  z,
                  R,
                  i,
                  k
                );
            }
        }
        Rr(
          e,
          d,
          p,
          _,
          T,
          D,
          s,
          u
        );
        return;
      case "select":
        R = d = p = z = null;
        for (s in n)
          if (_ = n[s], n.hasOwnProperty(s) && _ != null)
            switch (s) {
              case "value":
                break;
              case "multiple":
                R = _;
              default:
                i.hasOwnProperty(s) || we(
                  e,
                  t,
                  s,
                  null,
                  i,
                  _
                );
            }
        for (u in i)
          if (s = i[u], _ = n[u], i.hasOwnProperty(u) && (s != null || _ != null))
            switch (u) {
              case "value":
                s !== _ && (Ee = !0), z = s;
                break;
              case "defaultValue":
                s !== _ && (Ee = !0), p = s;
                break;
              case "multiple":
                s !== _ && (Ee = !0), d = s;
              default:
                s !== _ && we(
                  e,
                  t,
                  u,
                  s,
                  i,
                  _
                );
            }
        t = p, n = d, i = R, z != null ? zi(e, !!n, z, !1) : !!i != !!n && (t != null ? zi(e, !!n, t, !0) : zi(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        R = z = null;
        for (p in n)
          if (u = n[p], n.hasOwnProperty(p) && u != null && !i.hasOwnProperty(p))
            switch (p) {
              case "value":
                break;
              case "children":
                break;
              default:
                we(e, t, p, null, i, u);
            }
        for (d in i)
          if (u = i[d], s = n[d], i.hasOwnProperty(d) && (u != null || s != null))
            switch (d) {
              case "value":
                u !== s && (Ee = !0), z = u;
                break;
              case "defaultValue":
                u !== s && (Ee = !0), R = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(c(91));
                break;
              default:
                u !== s && we(e, t, d, u, i, s);
            }
        yd(e, z, R);
        return;
      case "option":
        for (var X in n)
          z = n[X], n.hasOwnProperty(X) && z != null && !i.hasOwnProperty(X) && (X === "selected" ? e.selected = !1 : we(
            e,
            t,
            X,
            null,
            i,
            z
          ));
        for (_ in i)
          z = i[_], R = n[_], i.hasOwnProperty(_) && z !== R && (z != null || R != null) && (_ === "selected" ? (z !== R && (Ee = !0), e.selected = z && typeof z != "function" && typeof z != "symbol") : we(
            e,
            t,
            _,
            z,
            i,
            R
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
        for (var P in n)
          z = n[P], n.hasOwnProperty(P) && z != null && !i.hasOwnProperty(P) && we(e, t, P, null, i, z);
        for (T in i)
          if (z = i[T], R = n[T], i.hasOwnProperty(T) && z !== R && (z != null || R != null))
            switch (T) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(c(137, t));
                break;
              default:
                we(
                  e,
                  t,
                  T,
                  z,
                  i,
                  R
                );
            }
        return;
      default:
        if (Mr(t)) {
          for (var he in n)
            z = n[he], n.hasOwnProperty(he) && z !== void 0 && !i.hasOwnProperty(he) && wo(
              e,
              t,
              he,
              void 0,
              i,
              z
            );
          for (D in i)
            z = i[D], R = n[D], !i.hasOwnProperty(D) || z === R || z === void 0 && R === void 0 || wo(
              e,
              t,
              D,
              z,
              i,
              R
            );
          return;
        }
    }
    for (var E in n)
      z = n[E], n.hasOwnProperty(E) && z != null && !i.hasOwnProperty(E) && we(e, t, E, null, i, z);
    for (k in i)
      z = i[k], R = n[k], !i.hasOwnProperty(k) || z === R || z == null && R == null || we(e, t, k, z, i, R);
  }
  function Ev(e) {
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
  function k1() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var u = n[i], s = u.transferSize, d = u.initiatorType, p = u.duration;
        if (s && p && Ev(d)) {
          for (d = 0, p = u.responseEnd, i += 1; i < n.length; i++) {
            var _ = n[i], T = _.startTime;
            if (T > p) break;
            var D = _.transferSize, k = _.initiatorType;
            D && Ev(k) && (_ = _.responseEnd, d += D * (_ < p ? 1 : (p - T) / (_ - T)));
          }
          if (--i, t += 8 * (s + d) / (u.duration / 1e3), e++, 10 < e) break;
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
  function Tv(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Nv(e, t) {
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
  function Cv(e, t, n, i) {
    return n = su(
      n
    ).createElement(e), n[vt] = i, n[Zt] = t, _t(n, e, t), ot(n), n;
  }
  function Uo(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var Zo = null;
  function H1() {
    var e = window.event;
    return e && e.type === "popstate" ? e === Zo ? !1 : (Zo = e, !0) : (Zo = null, !1);
  }
  var qo = typeof setTimeout == "function" ? setTimeout : void 0, B1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Av = typeof Promise == "function" ? Promise : void 0, Rv = typeof requestAnimationFrame == "function" ? requestAnimationFrame : qo, L1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Av < "u" ? function(e) {
    return Av.resolve(null).then(e).catch(Q1);
  } : qo;
  function Q1(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function Ca(e) {
    return e === "head";
  }
  function wv(e, t) {
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
          for (var s = n.firstChild; s; ) {
            var d = s.nextSibling, p = s.nodeName;
            s[zl] || p === "SCRIPT" || p === "STYLE" || p === "LINK" && s.rel.toLowerCase() === "stylesheet" || n.removeChild(s), s = d;
          }
        } else
          n === "body" && Go(e.ownerDocument.body);
      n = u;
    } while (n);
    cl(t);
  }
  function Mv(e, t) {
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
  function Dv(e, t, n) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
      if (t = e.getClientRects(), t.length === 1) var i = 1;
      else
        for (var u = i = 0; u < t.length; u++) {
          var s = t[u];
          0 < s.width && 0 < s.height && i++;
        }
      i === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
    }
  }
  function Uv(e, t) {
    e = e.style, t = t.style;
    var n = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n != null ? e.margin = n : (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function Y1(e, t, n) {
    return n = n.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
    };
  }
  function ko(e) {
    var t = e.getBoundingClientRect(), n = getComputedStyle(e);
    return Y1(t, n, e);
  }
  function $1(e) {
    return e.documentElement.clientHeight;
  }
  function G1(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function V1(e, t, n, i, u, s, d, p, _) {
    var T = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var D = T.startViewTransition({
        update: function() {
          var z = T.defaultView, R = z.navigation && z.navigation.transition, X = T.fonts.status;
          i();
          var P = [];
          if (X === "loaded" && ($1(T), T.fonts.status === "loading" && P.push(T.fonts.ready)), X = P.length, e !== null)
            for (var he = e.suspenseyImages, E = 0, x = 0; x < he.length; x++) {
              var C = he[x];
              if (!C.complete) {
                var q = C.getBoundingClientRect();
                if (0 < q.bottom && 0 < q.right && q.top < z.innerHeight && q.left < z.innerWidth) {
                  if (E += np(C), E > Ks) {
                    P.length = X;
                    break;
                  }
                  C = new Promise(
                    G1.bind(C)
                  ), P.push(C);
                }
              }
            }
          if (0 < P.length)
            return z = Promise.race([
              Promise.all(P),
              new Promise(function(J) {
                return setTimeout(J, 500);
              })
            ]).then(u, u), (R ? Promise.allSettled([R.finished, z]) : z).then(s, s);
          if (u(), R)
            return R.finished.then(
              s,
              s
            );
          s();
        },
        types: n
      });
      T.__reactViewTransition = D;
      var k = [];
      return D.ready.then(
        function() {
          for (var z = T.documentElement.getAnimations({
            subtree: !0
          }), R = 0; R < z.length; R++) {
            var X = z[R], P = X.effect, he = P.pseudoElement;
            if (he != null && he.startsWith("::view-transition")) {
              k.push(X), X = P.getKeyframes();
              for (var E = he = void 0, x = !0, C = 0; C < X.length; C++) {
                var q = X[C], J = q.width;
                if (he === void 0) he = J;
                else if (he !== J) {
                  x = !1;
                  break;
                }
                if (J = q.height, E === void 0) E = J;
                else if (E !== J) {
                  x = !1;
                  break;
                }
                delete q.width, delete q.height, q.transform === "none" && delete q.transform;
              }
              x && he !== void 0 && E !== void 0 && (P.setKeyframes(X), x = getComputedStyle(
                P.target,
                P.pseudoElement
              ), x.width !== he || x.height !== E) && (x = X[0], x.width = he, x.height = E, x = X[X.length - 1], x.width = he, x.height = E, P.setKeyframes(X));
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
        T.__reactViewTransition === D && (T.__reactViewTransition = null), p();
      }), D;
    } catch {
      return i(), u(), d(), null;
    }
  }
  function oi(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  oi.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : W({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, oi.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), i = [], u = 0; u < n.length; u++) {
      var s = n[u].effect;
      s !== null && s.target === e && s.pseudoElement === t && i.push(n[u]);
    }
    return i;
  }, oi.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Zv(e) {
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
      var s = this._eventListeners;
      if (kv(s, e, t, n) === -1) {
        var d = this, p = t;
        n != null && typeof n != "boolean" && n.once === !0 && (p = function(_) {
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
        ), i.addEventListener("abort", u, { once: !0 }), u = i.removeEventListener.bind(i, "abort", u)), i = al(n), s.push({
          type: e,
          listener: t,
          optionsOrUseCapture: n,
          attachedListener: p,
          cleanup: u
        }), g(
          this._fragmentFiber.child,
          !1,
          X1,
          e,
          p,
          i
        );
      }
      this._eventListeners = s;
    }
  };
  function X1(e, t, n, i) {
    return A(e).addEventListener(
      t,
      n,
      i
    ), !1;
  }
  tn.prototype.removeEventListener = function(e, t, n) {
    var i = this._eventListeners;
    if (i !== null && (t = kv(
      i,
      e,
      t,
      n
    ), t !== -1)) {
      var u = i[t];
      n = u.attachedListener;
      var s = u.cleanup;
      u = al(u.optionsOrUseCapture), g(
        this._fragmentFiber.child,
        !1,
        K1,
        e,
        n,
        u
      ), i.splice(t, 1), s !== null && s();
    }
  };
  function K1(e, t, n, i) {
    return A(e).removeEventListener(
      t,
      n,
      i
    ), !1;
  }
  function al(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function qv(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function kv(e, t, n, i) {
    if (e.length === 0) return -1;
    i = qv(i);
    for (var u = 0; u < e.length; u++) {
      var s = e[u];
      if (s.type === t && s.listener === n && qv(s.optionsOrUseCapture) === i)
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
          var s = n[u];
          i.addEventListener(
            s.type,
            s.attachedListener,
            al(s.optionsOrUseCapture)
          );
        }
      if (t.appendChild(i), e = i.dispatchEvent(e), n)
        for (u = 0; u < n.length; u++)
          s = n[u], i.removeEventListener(
            s.type,
            s.attachedListener,
            al(s.optionsOrUseCapture)
          );
      return t.removeChild(i), e;
    }
    return t.dispatchEvent(e);
  }, tn.prototype.focus = function(e) {
    g(
      this._fragmentFiber.child,
      !0,
      Hv,
      e,
      void 0,
      void 0
    );
  };
  function Hv(e, t) {
    return e.tag === 6 ? !1 : (e = A(e), ub(e, t));
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
    for (var n = t.length - 1; 0 <= n && !Hv(t[n], e); n--) ;
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
      J1,
      e,
      void 0,
      void 0
    ));
  };
  function J1(e, t) {
    return e.tag === 6 ? !1 : (e = A(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  tn.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), g(
      this._fragmentFiber.child,
      !1,
      I1,
      e,
      void 0,
      void 0
    );
  };
  function I1(e, t) {
    return e.tag === 6 || (e = A(e), t.observe(e)), !1;
  }
  tn.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), g(
        this._fragmentFiber.child,
        !1,
        F1,
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
  function F1(e, t) {
    return e.tag === 6 || (e = A(e), t.unobserve(e)), !1;
  }
  var On = [], Bo = !1;
  function P1(e, t, n) {
    On.push({
      fragmentInstance: e,
      observer: t,
      instance: n
    }), Bo || (Bo = !0, sb(function() {
      Bo = !1;
      var i = On;
      On = [];
      for (var u = 0; u < i.length; u++) {
        var s = i[u];
        s.observer.unobserve(s.instance);
      }
    }));
  }
  tn.prototype.getClientRects = function() {
    var e = [];
    return g(
      this._fragmentFiber.child,
      !1,
      W1,
      e,
      void 0,
      void 0
    ), e;
  };
  function W1(e, t) {
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
      return n === e ? u = Node.DOCUMENT_POSITION_CONTAINS : i & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = M(t)[1], n === null ? u = Node.DOCUMENT_POSITION_PRECEDING : (e = A(n).compareDocumentPosition(
        e
      ), u = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), u |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = A(n[0]), u = A(n[n.length - 1]);
    var s = U(this._fragmentFiber) ? t.parentElement : i;
    if (s == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    i = s.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, s = s.compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var d = t.compareDocumentPosition(e), p = u.compareDocumentPosition(e), _ = d & Node.DOCUMENT_POSITION_CONTAINED_BY || p & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return p = i && s && d & Node.DOCUMENT_POSITION_FOLLOWING && p & Node.DOCUMENT_POSITION_PRECEDING, t = i && t === e || s && u === e || _ || p ? Node.DOCUMENT_POSITION_CONTAINED_BY : !i && t === e || !s && u === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : d, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || eb(
      t,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function eb(e, t, n, i, u) {
    var s = Ya(u);
    if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!s)
        e: {
          for (; s !== null; ) {
            if (s.tag === 7 && (s === t || s.alternate === t)) {
              n = !0;
              break e;
            }
            s = s.return;
          }
          n = !1;
        }
      return n;
    }
    if (e & Node.DOCUMENT_POSITION_CONTAINS) {
      if (s === null)
        return s = u.ownerDocument, u === s || u === s.documentElement || u === s.body;
      e: {
        for (s = t, t = O(t); s !== null; ) {
          if (!(s.tag !== 5 && s.tag !== 3 && s.tag !== 27 || s !== t && s.alternate !== t)) {
            s = !0;
            break e;
          }
          s = s.return;
        }
        s = !1;
      }
      return s;
    }
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!s) && !(t = s === n) && (t = I(
      n,
      s,
      $
    ), t === null ? t = !1 : (g(
      t,
      !0,
      ue,
      s,
      n
    ), s = w, w = null, t = s !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!s) && !(t = s === i) && (t = I(
      i,
      s,
      $
    ), t === null ? t = !1 : (g(
      t,
      !0,
      me,
      s,
      i
    ), s = w, L = w = null, t = s !== null)), t) : !1;
  }
  function Bv(e, t) {
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
      var i = M(
        this._fragmentFiber
      );
      if (i = n ? i[1] || i[0] || O(this._fragmentFiber) : i[0] || i[1], i === null) return;
      if (i.tag === 6) {
        e = A(i), Bv(e, n);
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
      u.tag === 6 ? (u = A(u), Bv(u, n)) : A(u).scrollIntoView(e), i += n ? -1 : 1;
    }
  };
  function tb(e, t) {
    return e = A(e), Lv(e, t), !1;
  }
  function Lv(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function Qv(e, t) {
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
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(s) {
      for (var d = 0, p = 0; p < On.length; p++) {
        var _ = On[p];
        (_.fragmentInstance !== t || _.observer !== s || _.instance !== e) && (On[d++] = _);
      }
      On.length = d, s.observe(e);
    }), Lv(e, t));
  }
  function nb(e, t) {
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
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(s) {
      typeof s.rootMargin == "string" ? P1(
        t,
        s,
        e
      ) : s.unobserve(e);
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
          Lo(n), Zu(n);
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
  function ab(e, t, n, i) {
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
              if (s = e.getAttribute("rel"), s === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (s !== u.rel || e.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || e.getAttribute("title") !== (u.title == null ? null : u.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (s = e.getAttribute("src"), (s !== (u.src == null ? null : u.src) || e.getAttribute("type") !== (u.type == null ? null : u.type) || e.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && s && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var s = u.name == null ? null : "" + u.name;
        if (u.type === "hidden" && e.getAttribute("name") === s)
          return e;
      } else return e;
      if (e = mn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function ib(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = mn(e.nextSibling), e === null)) return null;
    return e;
  }
  function Yv(e, t) {
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
  function lb(e, t) {
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
  function $v(e) {
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
  function Gv(e) {
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
  function ub(e, t) {
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
  function sb(e) {
    Rv(function() {
      Rv(function(t) {
        return e(t);
      });
    });
  }
  function Vv(e, t, n) {
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
  function Xv(e, t, n) {
    for (var i in n) {
      var u = n[i];
      n.hasOwnProperty(i) && u != null && we(e, t, i, null, Z1, u);
    }
    n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === Tn && (e.onclick = null), Zu(e);
  }
  function Go(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    Zu(e);
  }
  var vn = /* @__PURE__ */ new Map(), Kv = /* @__PURE__ */ new Set();
  function ru(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var na = se.d;
  se.d = {
    f: rb,
    r: cb,
    D: ob,
    C: fb,
    L: db,
    m: hb,
    X: vb,
    S: mb,
    M: pb
  };
  function rb() {
    var e = na.f(), t = Hs();
    return e || t;
  }
  function cb(e) {
    var t = xi(e);
    t !== null && t.tag === 5 && t.type === "form" ? Ih(t) : na.r(e);
  }
  var il = typeof document > "u" ? null : document;
  function Jv(e, t, n) {
    var i = il;
    if (i && typeof t == "string" && t) {
      var u = sn(t);
      u = 'link[rel="' + e + '"][href="' + u + '"]', typeof n == "string" && (u += '[crossorigin="' + n + '"]'), Kv.has(u) || (Kv.add(u), e = { rel: e, crossOrigin: n, href: t }, i.querySelector(u) === null && (t = i.createElement("link"), _t(t, "link", e), ot(t), i.head.appendChild(t)));
    }
  }
  function ob(e) {
    na.D(e), Jv("dns-prefetch", e, null);
  }
  function fb(e, t) {
    na.C(e, t), Jv("preconnect", e, t);
  }
  function db(e, t, n) {
    na.L(e, t, n);
    var i = il;
    if (i && e && t) {
      var u = 'link[rel="preload"][as="' + sn(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (u += '[imagesrcset="' + sn(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (u += '[imagesizes="' + sn(
        n.imageSizes
      ) + '"]')) : u += '[href="' + sn(e) + '"]';
      var s = u;
      switch (t) {
        case "style":
          s = ll(e);
          break;
        case "script":
          s = ul(e);
      }
      if (!(vn.has(s) || (e = W(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), vn.set(s, e), i.querySelector(u) !== null || t === "style" && i.querySelector(cu(s)) || t === "script" && i.querySelector(ou(s))))) {
        var d = i.createElement("link");
        _t(d, "link", e), t === "style" && (d[Uu] = !0, d.onload = d.onerror = function() {
          rd(d);
        }), ot(d), i.head.appendChild(d);
      }
    }
  }
  function hb(e, t) {
    na.m(e, t);
    var n = il;
    if (n && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", u = 'link[rel="modulepreload"][as="' + sn(i) + '"][href="' + sn(e) + '"]', s = u;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = ul(e);
      }
      if (!vn.has(s) && (e = W({ rel: "modulepreload", href: e }, t), vn.set(s, e), n.querySelector(u) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(ou(s)))
              return;
        }
        i = n.createElement("link"), _t(i, "link", e), ot(i), n.head.appendChild(i);
      }
    }
  }
  function mb(e, t, n) {
    na.S(e, t, n);
    var i = il;
    if (i && e) {
      var u = ji(i).hoistableStyles, s = ll(e);
      t = t || "default";
      var d = u.get(s);
      if (!d) {
        var p = { loading: 0, preload: null };
        if (d = i.querySelector(
          cu(s)
        ))
          p.loading = 5;
        else {
          e = W(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = vn.get(s)) && Vo(e, n);
          var _ = d = i.createElement("link");
          ot(_), _t(_, "link", e), _._p = new Promise(function(T, D) {
            _.onload = T, _.onerror = D;
          }), _.addEventListener("load", function() {
            p.loading |= 1;
          }), _.addEventListener("error", function() {
            p.loading |= 2;
          }), p.loading |= 4, Vs(d, t, i);
        }
        d = {
          type: "stylesheet",
          instance: d,
          count: 1,
          state: p
        }, u.set(s, d);
      }
    }
  }
  function vb(e, t) {
    na.X(e, t);
    var n = il;
    if (n && e) {
      var i = ji(n).hoistableScripts, u = ul(e), s = i.get(u);
      s || (s = n.querySelector(ou(u)), s || (e = W({ src: e, async: !0 }, t), (t = vn.get(u)) && Xo(e, t), s = n.createElement("script"), ot(s), _t(s, "link", e), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, i.set(u, s));
    }
  }
  function pb(e, t) {
    na.M(e, t);
    var n = il;
    if (n && e) {
      var i = ji(n).hoistableScripts, u = ul(e), s = i.get(u);
      s || (s = n.querySelector(ou(u)), s || (e = W({ src: e, async: !0, type: "module" }, t), (t = vn.get(u)) && Xo(e, t), s = n.createElement("script"), ot(s), _t(s, "link", e), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, i.set(u, s));
    }
  }
  function Iv(e, t, n, i) {
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
          var s = ji(
            u
          ).hoistableStyles, d = s.get(e);
          if (d || (u = u.ownerDocument || u, d = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, s.set(e, d), (s = u.querySelector(
            cu(e)
          )) ? s._p || (d.instance = s, d.state.loading = 5) : (s = vn.get(e), s || (s = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, vn.set(e, s)), yb(
            u,
            e,
            s,
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
  function Fv(e) {
    return W({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function yb(e, t, n, i) {
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
  function Pv(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + sn(n.href) + '"]'
          );
          if (i)
            return t.instance = i, ot(i), i;
          var u = W({}, n, {
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
          var s = e.querySelector(
            cu(u)
          );
          if (s)
            return t.state.loading |= 4, t.instance = s, ot(s), s;
          i = Fv(n), (u = vn.get(u)) && Vo(i, u), s = (e.ownerDocument || e).createElement("link"), ot(s);
          var d = s;
          return d._p = new Promise(function(p, _) {
            d.onload = p, d.onerror = _;
          }), _t(s, "link", i), t.state.loading |= 4, Vs(s, n.precedence, e), t.instance = s;
        case "script":
          return s = ul(n.src), (u = e.querySelector(
            ou(s)
          )) ? (t.instance = u, ot(u), u) : (i = n, (u = vn.get(s)) && (i = W({}, n), Xo(i, u)), e = e.ownerDocument || e, u = e.createElement("script"), ot(u), _t(u, "link", i), e.head.appendChild(u), t.instance = u);
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
    ), u = i.length ? i[i.length - 1] : null, s = u, d = 0; d < i.length; d++) {
      var p = i[d];
      if (p.dataset.precedence === t) s = p;
      else if (s !== u) break;
    }
    s ? s.parentNode.insertBefore(e, s.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function Vo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Xo(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var Xs = null;
  function Wv(e, t, n) {
    if (Xs === null) {
      var i = /* @__PURE__ */ new Map(), u = Xs = /* @__PURE__ */ new Map();
      u.set(n, i);
    } else
      u = Xs, i = u.get(n), i || (i = /* @__PURE__ */ new Map(), u.set(n, i));
    if (i.has(e)) return i;
    for (i.set(e, null), n = n.getElementsByTagName(e), u = 0; u < n.length; u++) {
      var s = n[u];
      if (!(s[zl] || s[vt] || e === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
        var d = s.getAttribute(t) || "";
        d = e + d;
        var p = i.get(d);
        p ? p.push(s) : i.set(d, [s]);
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
  function gb(e, t, n) {
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
  function ep(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function tp(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function np(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function ap(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += np(t), e.suspenseyImages.push(t)), e = Sb.bind(e), t.decode().then(e, e));
  }
  function bb(e, t, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var u = ll(i.href), s = t.querySelector(
          cu(u)
        );
        if (s) {
          t = s._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = fu.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = s, ot(s);
          return;
        }
        s = t.ownerDocument || t, i = Fv(i), (u = vn.get(u)) && Vo(i, u), s = s.createElement("link"), ot(s);
        var d = s;
        d._p = new Promise(function(p, _) {
          d.onload = p, d.onerror = _;
        }), _t(s, "link", i), n.instance = s;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = fu.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var Ks = 0;
  function _b(e, t) {
    return e.stylesheets && e.count === 0 && Is(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (e.stylesheets && Is(e, e.stylesheets), e.unsuspend) {
          var s = e.unsuspend;
          e.unsuspend = null, s();
        }
      }, 6e4 + t);
      0 < e.imgBytes && Ks === 0 && (Ks = 62500 * k1());
      var u = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Is(e, e.stylesheets), e.unsuspend)) {
            var s = e.unsuspend;
            e.unsuspend = null, s();
          }
        },
        (e.imgBytes > Ks ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(u);
      };
    } : null;
  }
  function ip(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) Is(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function fu() {
    this.count--, ip(this);
  }
  function Sb() {
    this.imgCount--, ip(this);
  }
  var Js = null;
  function Is(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, Js = /* @__PURE__ */ new Map(), t.forEach(xb, e), Js = null, fu.call(e));
  }
  function xb(e, t) {
    if (!(t.state.loading & 4)) {
      var n = Js.get(e);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Js.set(e, n);
        for (var u = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), s = 0; s < u.length; s++) {
          var d = u[s];
          (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (n.set(d.dataset.precedence, d), i = d);
        }
        i && n.set(null, i);
      }
      u = t.instance, d = u.getAttribute("data-precedence"), s = n.get(d) || i, s === i && n.set(null, u), n.set(d, u), this.count++, i = fu.bind(this), u.addEventListener("load", i), u.addEventListener("error", i), s ? s.parentNode.insertBefore(u, s.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(u, e.firstChild)), t.state.loading |= 4;
    }
  }
  var sl = {
    $$typeof: $e,
    Provider: null,
    Consumer: null,
    _currentValue: wt,
    _currentValue2: wt,
    _threadCount: 0
  };
  function jb(e, t, n, i, u, s, d, p, _) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Tr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Tr(0), this.hiddenUpdates = Tr(null), this.identifierPrefix = i, this.onUncaughtError = u, this.onCaughtError = s, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = _, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function lp(e, t, n, i, u, s, d, p, _, T, D, k) {
    return e = new jb(
      e,
      t,
      n,
      d,
      _,
      T,
      D,
      k,
      p
    ), t = 1, s === !0 && (t |= 24), s = qt(3, null, null, t), e.current = s, s.stateNode = e, t = rc(), t.refCount++, e.pooledCache = t, t.refCount++, s.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: t
    }, dc(s), e;
  }
  function up(e) {
    return e ? (e = Mi, e) : Mi;
  }
  function sp(e, t, n, i, u, s) {
    u = up(u), i.context === null ? i.context = u : i.pendingContext = u, i = ya(t), i.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (i.callback = s), n = ga(e, i, t), n !== null && (Lt(n, e, t), Ql(n, e, t));
  }
  function rp(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Jo(e, t) {
    rp(e, t), (e = e.alternate) && rp(e, t);
  }
  function cp(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Xa(e, 67108864);
      t !== null && Lt(t, e, 67108864), Jo(e, 67108864);
    }
  }
  function op(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = en();
      t = Nr(t);
      var n = Xa(e, t);
      n !== null && Lt(n, e, t), Jo(e, t);
    }
  }
  var rl = !0;
  function Ob(e, t, n, i) {
    var u = K.T;
    K.T = null;
    var s = se.p;
    try {
      se.p = 2, Io(e, t, n, i);
    } finally {
      se.p = s, K.T = u;
    }
  }
  function zb(e, t, n, i) {
    var u = K.T;
    K.T = null;
    var s = se.p;
    try {
      se.p = 8, Io(e, t, n, i);
    } finally {
      se.p = s, K.T = u;
    }
  }
  function Io(e, t, n, i) {
    if (rl) {
      var u = Fo(i);
      if (u === null)
        Ro(
          e,
          t,
          i,
          Fs,
          n
        ), dp(e, i);
      else if (Tb(
        u,
        e,
        t,
        n,
        i
      ))
        i.stopPropagation();
      else if (dp(e, i), t & 4 && -1 < Eb.indexOf(e)) {
        for (; u !== null; ) {
          var s = xi(u);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var d = Qa(s.pendingLanes);
                  if (d !== 0) {
                    var p = s;
                    for (p.pendingLanes |= 2, p.entangledLanes |= 2; d; ) {
                      var _ = 1 << 31 - Xt(d);
                      p.entanglements[1] |= _, d &= ~_;
                    }
                    qn(s), (Te & 6) === 0 && (Zs = Gt() + 500, iu(0));
                  }
                }
                break;
              case 31:
              case 13:
                p = Xa(s, 2), p !== null && Lt(p, s, 2), Hs(), Jo(s, 2);
            }
          if (s = Fo(i), s === null && Ro(
            e,
            t,
            i,
            Fs,
            n
          ), s === u) break;
          u = s;
        }
        u !== null && i.stopPropagation();
      } else
        Ro(
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
          if (e = v(t), e !== null) return e;
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
  function fp(e) {
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
        switch (kg()) {
          case If:
            return 2;
          case Ff:
            return 8;
          case Au:
          case Hg:
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
  var Wo = !1, Aa = null, Ra = null, wa = null, du = /* @__PURE__ */ new Map(), hu = /* @__PURE__ */ new Map(), Ma = [], Eb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function dp(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Aa = null;
        break;
      case "dragenter":
      case "dragleave":
        Ra = null;
        break;
      case "mouseover":
      case "mouseout":
        wa = null;
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
  function mu(e, t, n, i, u, s) {
    return e === null || e.nativeEvent !== s ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: s,
      targetContainers: [u]
    }, t !== null && (t = xi(t), t !== null && cp(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), e);
  }
  function Tb(e, t, n, i, u) {
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
        return Ra = mu(
          Ra,
          e,
          t,
          n,
          i,
          u
        ), !0;
      case "mouseover":
        return wa = mu(
          wa,
          e,
          t,
          n,
          i,
          u
        ), !0;
      case "pointerover":
        var s = u.pointerId;
        return du.set(
          s,
          mu(
            du.get(s) || null,
            e,
            t,
            n,
            i,
            u
          )
        ), !0;
      case "gotpointercapture":
        return s = u.pointerId, hu.set(
          s,
          mu(
            hu.get(s) || null,
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
  function hp(e) {
    var t = Ya(e.target);
    if (t !== null) {
      var n = h(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = m(n), t !== null) {
            e.blockedOn = t, ld(e.priority, function() {
              op(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = v(n), t !== null) {
            e.blockedOn = t, ld(e.priority, function() {
              op(n);
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
        return t = xi(n), t !== null && cp(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function mp(e, t, n) {
    Ps(e) && n.delete(t);
  }
  function Nb() {
    Wo = !1, Aa !== null && Ps(Aa) && (Aa = null), Ra !== null && Ps(Ra) && (Ra = null), wa !== null && Ps(wa) && (wa = null), du.forEach(mp), hu.forEach(mp);
  }
  function Ws(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Wo || (Wo = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      Nb
    )));
  }
  var er = null;
  function vp(e) {
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
          var s = xi(n);
          s !== null && (e.splice(t, 3), t -= 3, Mc(
            s,
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
    Aa !== null && Ws(Aa, e), Ra !== null && Ws(Ra, e), wa !== null && Ws(wa, e), du.forEach(t), hu.forEach(t);
    for (var n = 0; n < Ma.length; n++) {
      var i = Ma[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < Ma.length && (n = Ma[0], n.blockedOn === null); )
      hp(n), n.blockedOn === null && Ma.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var u = n[i], s = n[i + 1], d = u[Zt] || null;
        if (typeof s == "function")
          d || vp(n);
        else if (d) {
          var p = null;
          if (s && s.hasAttribute("formAction")) {
            if (u = s, d = s[Zt] || null)
              p = d.formAction;
            else if (Po(u) !== null) continue;
          } else p = d.action;
          typeof p == "function" ? n[i + 1] = p : (n.splice(i, 3), i -= 3), vp(n);
        }
      }
  }
  function pp() {
    function e(s) {
      s.canIntercept && s.info === "react-transition" && s.intercept({
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
        var s = navigation.currentEntry;
        s && s.url != null && navigation.navigate(s.url, {
          state: s.getState(),
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
    sp(n, i, e, t, null, null);
  }, tr.prototype.unmount = ef.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      sp(e.current, 2, null, e, null, null), Hs(), t[Si] = null;
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
      Ma.splice(n, 0, e), n === 0 && hp(e);
    }
  };
  var yp = l.version;
  if (yp !== "19.3.0")
    throw Error(
      c(
        527,
        yp,
        "19.3.0"
      )
    );
  se.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(c(188)) : (e = Object.keys(e).join(","), Error(c(268, e)));
    return e = b(t), e = e !== null ? S(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Cb = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: K,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var nr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!nr.isDisabled && nr.supportsFiber)
      try {
        xl = nr.inject(
          Cb
        ), Vt = nr;
      } catch {
      }
  }
  return pu.createRoot = function(e, t) {
    if (!f(e)) throw Error(c(299));
    var n = !1, i = "", u = um, s = sm, d = rm;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError)), t = lp(
      e,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      u,
      s,
      d,
      pp
    ), e[Si] = t.current, Ao(e), new ef(t);
  }, pu.hydrateRoot = function(e, t, n) {
    if (!f(e)) throw Error(c(299));
    var i = !1, u = "", s = um, d = sm, p = rm, _ = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (p = n.onRecoverableError), n.formState !== void 0 && (_ = n.formState)), t = lp(
      e,
      1,
      !0,
      t,
      n ?? null,
      i,
      u,
      _,
      s,
      d,
      p,
      pp
    ), t.context = up(null), n = t.current, i = en(), i = Nr(i), u = ya(i), u.callback = null, ga(n, u, i), n = i, t.current.lanes = n, Ol(t, n), qn(t), e[Si] = t.current, Ao(e), new tr(t);
  }, pu.version = "19.3.0", pu;
}
var Tp;
function kb() {
  if (Tp) return af.exports;
  Tp = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (l) {
        console.error(l);
      }
  }
  return a(), af.exports = qb(), af.exports;
}
var Hb = kb();
const Sy = H.createContext(void 0), _r = (a) => {
  const l = H.useContext(Sy);
  if (!l) throw new Error("No QueryClient set, use QueryClientProvider to set one");
  return l;
}, Bb = ({ client: a, children: l }) => (H.useEffect(() => (a.mount(), () => {
  a.unmount();
}), [a]), /* @__PURE__ */ o.jsx(Sy.Provider, {
  value: a,
  children: l
})), Lb = {
  setTimeout: (a, l) => setTimeout(a, l),
  clearTimeout: (a) => clearTimeout(a),
  setInterval: (a, l) => setInterval(a, l),
  clearInterval: (a) => clearInterval(a)
};
var Qb = class {
  #e = Lb;
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
const di = new Qb();
function Yb(a) {
  setTimeout(a, 0);
}
const $b = typeof window > "u" || "Deno" in globalThis;
function Qt() {
}
function Gb(a, l) {
  return typeof a == "function" ? a(l) : a;
}
function xy(a) {
  return typeof a == "number" && a >= 0 && a !== 1 / 0;
}
function jy(a, l) {
  return Math.max(a + (l || 0) - Date.now(), 0);
}
function Qe(a, l) {
  return typeof a == "function" ? a(l) : a;
}
function Np(a, l) {
  const { type: r = "all", exact: c, fetchStatus: f, predicate: h, queryKey: m, stale: v } = a;
  if (m) {
    if (c) {
      if (l.queryHash !== wf(m, l.options)) return !1;
    } else if (!ml(l.queryKey, m)) return !1;
  }
  if (r !== "all") {
    const y = l.isActive();
    if (r === "active" && !y || r === "inactive" && y) return !1;
  }
  return !(typeof v == "boolean" && l.isStale() !== v || f && f !== l.state.fetchStatus || h && !h(l));
}
function Cp(a, l) {
  const { exact: r, status: c, predicate: f, mutationKey: h } = a;
  if (h) {
    if (!l.options.mutationKey) return !1;
    if (r) {
      if (Ou(l.options.mutationKey) !== Ou(h)) return !1;
    } else if (!ml(l.options.mutationKey, h)) return !1;
  }
  return !(c && l.state.status !== c || f && !f(l));
}
function wf(a, l) {
  return (l?.queryKeyHashFn || Ou)(a);
}
function Ou(a) {
  return JSON.stringify(a, (l, r) => vf(r) ? Object.keys(r).sort().reduce((c, f) => (c[f] = r[f], c), {}) : r);
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
    const r = Object.keys(l);
    for (const c of r) if (!ml(a[c], l[c])) return !1;
    return !0;
  }
  return !1;
}
const Vb = Object.prototype.hasOwnProperty;
function Oy(a, l, r = 0) {
  if (a === l) return a;
  if (r > 500) return l;
  const c = Ap(a) && Ap(l);
  if (!c && !(vf(a) && vf(l))) return l;
  const f = (c ? a : Object.keys(a)).length, h = c ? l : Object.keys(l), m = h.length, v = c ? new Array(m) : {};
  let y = 0;
  for (let b = 0; b < m; b++) {
    const S = c ? b : h[b], g = a[S], O = l[S];
    if (g === O) {
      v[S] = g, (c ? b < f : Vb.call(a, S)) && y++;
      continue;
    }
    if (g === null || O === null || typeof g != "object" || typeof O != "object") {
      v[S] = O;
      continue;
    }
    const U = Oy(g, O, r + 1);
    v[S] = U, U === g && y++;
  }
  return f === m && y === f ? a : v;
}
function rf(a, l) {
  if (!l || Object.keys(a).length !== Object.keys(l).length) return !1;
  for (const r in a) if (a[r] !== l[r]) return !1;
  return !0;
}
function Ap(a) {
  return Array.isArray(a) && a.length === Object.keys(a).length;
}
function vf(a) {
  if (!Rp(a)) return !1;
  const l = Object.getPrototypeOf(a), r = l?.constructor;
  if (r === void 0) return !0;
  if (typeof r != "function") return !1;
  const c = r.prototype;
  return !(!Rp(c) || !c.hasOwnProperty("isPrototypeOf") || l !== Object.prototype);
}
function Rp(a) {
  return Object.prototype.toString.call(a) === "[object Object]";
}
function Xb(a) {
  return new Promise((l) => {
    di.setTimeout(l, a);
  });
}
function pf(a, l, r) {
  return typeof r.structuralSharing == "function" ? r.structuralSharing(a, l) : r.structuralSharing !== !1 ? Oy(a, l) : l;
}
function Kb(a, l, r = 0) {
  const c = [...a, l];
  return r && c.length > r ? c.slice(1) : c;
}
function Jb(a, l, r = 0) {
  const c = [l, ...a];
  return r && c.length > r ? c.slice(0, -1) : c;
}
const Mf = /* @__PURE__ */ Symbol();
function zy(a, l) {
  return !a.queryFn && l?.initialPromise ? () => l.initialPromise : !a.queryFn || a.queryFn === Mf ? () => Promise.reject(/* @__PURE__ */ new Error(`Missing queryFn: '${a.queryHash}'`)) : a.queryFn;
}
function Ey(a, l) {
  return typeof a == "function" ? a(...l) : !!a;
}
function Ib(a, l, r) {
  let c = !1, f;
  return Object.defineProperty(a, "signal", {
    enumerable: !0,
    get: () => (f ??= l(), c || (c = !0, f.aborted ? r() : f.addEventListener("abort", r, { once: !0 })), f)
  }), a;
}
let Fb = () => $b;
const Df = () => Fb();
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
}, Pb = class extends Nu {
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
const Uf = new Pb(), Wb = Yb;
function e_() {
  let a = [], l = 0, r = (v) => {
    v();
  }, c = (v) => {
    v();
  }, f = Wb;
  const h = (v) => {
    l ? a.push(v) : f(() => {
      r(v);
    });
  }, m = () => {
    const v = a;
    a = [], v.length && f(() => {
      c(() => {
        v.forEach((y) => {
          r(y);
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
    batch: (v) => {
      let y;
      l++;
      try {
        y = v();
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
    batchCalls: (v) => (...y) => {
      h(() => {
        v(...y);
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
    setNotifyFunction: (v) => {
      r = v;
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
    setBatchNotifyFunction: (v) => {
      c = v;
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
    setScheduler: (v) => {
      f = v;
    }
  };
}
const xt = e_();
var t_ = class extends Nu {
  #e = !0;
  #t;
  #n;
  constructor() {
    super(), this.#n = (a) => {
      if (typeof window < "u" && window.addEventListener) {
        const l = () => a(!0), r = () => a(!1);
        return window.addEventListener("online", l, !1), window.addEventListener("offline", r, !1), () => {
          window.removeEventListener("online", l), window.removeEventListener("offline", r);
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
const dr = new t_();
function n_(a) {
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
  let l = !1, r = 0, c, f = "pending", h, m;
  const v = new Promise((L, ue) => {
    h = L, m = ue;
  });
  v.catch(Qt);
  const y = () => f !== "pending", b = (L) => {
    if (!y()) {
      const ue = new yf(L);
      N(ue), a.onCancel?.(ue);
    }
  }, S = () => {
    l = !0;
  }, g = () => {
    l = !1;
  }, O = () => Uf.isFocused() && (a.networkMode === "always" || dr.isOnline()) && a.canRun(), U = () => Ty(a.networkMode) && a.canRun(), M = (L) => {
    y() || (c?.(), f = "resolved", h(L));
  }, N = (L) => {
    y() || (c?.(), f = "rejected", m(L));
  }, A = (L) => new Promise((ue) => {
    c = (me) => {
      (y() || L()) && ue(me);
    }, a.onPause?.();
  }).then(() => {
    c = void 0, y() || a.onContinue?.();
  }), w = () => {
    if (y()) return;
    let L;
    const ue = r === 0 ? a.initialPromise : void 0;
    try {
      L = ue ?? a.fn();
    } catch (me) {
      L = Promise.reject(me);
    }
    Promise.resolve(L).then(M).catch((me) => {
      if (y()) return;
      const $ = a.retry ?? (Df() ? 0 : 3), I = a.retryDelay ?? n_, W = typeof I == "function" ? I(r, me) : I, oe = $ === !0 || typeof $ == "number" && r < $ || typeof $ == "function" && $(r, me);
      if (l || !oe) {
        N(me);
        return;
      }
      r++, a.onFail?.(r, me), Xb(W).then(() => O() ? void 0 : A(O)).then(() => {
        l ? N(me) : w();
      });
    });
  };
  return {
    promise: v,
    status: () => f,
    cancel: b,
    continue: () => (c?.(), v),
    cancelRetry: S,
    continueRetry: g,
    canStart: U,
    start: () => (U() ? w() : A(U).then(w), v)
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
function a_(a) {
  return { onFetch: (l, r) => {
    const c = l.options, f = l.fetchOptions?.meta?.fetchMore?.direction, h = l.state.data?.pages || [], m = l.state.data?.pageParams || [];
    let v = {
      pages: [],
      pageParams: []
    }, y = 0;
    const b = async () => {
      let S = !1;
      const g = (M) => {
        Ib(M, () => l.signal, () => S = !0);
      }, O = zy(l.options, l.fetchOptions), U = async (M, N, A) => {
        if (S) return Promise.reject(l.signal.reason);
        if (N == null && M.pages.length) return Promise.resolve(M);
        const L = (() => {
          const I = {
            client: l.client,
            queryKey: l.queryKey,
            pageParam: N,
            direction: A ? "backward" : "forward",
            meta: l.options.meta
          };
          return g(I), I;
        })(), ue = await O(L), { maxPages: me } = l.options, $ = A ? Jb : Kb;
        return {
          pages: $(M.pages, ue, me),
          pageParams: $(M.pageParams, N, me)
        };
      };
      if (f && h.length) {
        const M = f === "backward", N = M ? i_ : wp, A = {
          pages: h,
          pageParams: m
        };
        v = await U(A, N(c, A), M);
      } else {
        const M = a ?? h.length;
        do {
          const N = y === 0 ? m[0] ?? c.initialPageParam : wp(c, v);
          if (y > 0 && N == null) break;
          v = await U(v, N), y++;
        } while (y < M);
      }
      return v;
    };
    l.options.persister ? l.fetchFn = () => l.options.persister?.(b, {
      client: l.client,
      queryKey: l.queryKey,
      meta: l.options.meta,
      signal: l.signal
    }, r) : l.fetchFn = b;
  } };
}
function wp(a, { pages: l, pageParams: r }) {
  const c = l.length - 1;
  return l.length > 0 ? a.getNextPageParam(l[c], l, r[c], r) : void 0;
}
function i_(a, { pages: l, pageParams: r }) {
  return l.length > 0 ? a.getPreviousPageParam?.(l[0], l, r[0], r) : void 0;
}
var l_ = class extends Cy {
  #e;
  #t;
  #n;
  #a;
  #l;
  #i;
  #u;
  #r;
  constructor(a) {
    super(), this.#r = !1, this.#u = a.defaultOptions, this.setOptions(a.options), this.observers = [], this.#l = a.client, this.#a = this.#l.getQueryCache(), this.queryKey = a.queryKey, this.queryHash = a.queryHash, this.#t = Dp(this.options), this.state = a.state ?? this.#t, this.scheduleGc();
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
      const l = Dp(this.options);
      l.data !== void 0 && (this.setState(Mp(l.data, l.dataUpdatedAt)), this.#t = l);
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
    const r = pf(this.state.data, a, this.options);
    return this.#s({
      data: r,
      type: "success",
      dataUpdatedAt: l?.updatedAt,
      manual: l?.manual
    }), r;
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
    return this.observers.some((a) => Qe(a.options.enabled, this) !== !1);
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
    return this.getObserversCount() > 0 ? this.observers.some((a) => Qe(a.options.staleTime, this) === "static") : !1;
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
    const r = new AbortController(), c = (y) => {
      Object.defineProperty(y, "signal", {
        enumerable: !0,
        get: () => (this.#r = !0, r.signal)
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
    (this.#e === "infinite" ? a_(this.options.pages) : this.options.behavior)?.onFetch(m, this), this.#n = this.state, (this.state.fetchStatus === "idle" || this.state.fetchMeta !== m.fetchOptions?.meta) && this.#s({
      type: "fetch",
      meta: m.fetchOptions?.meta
    });
    const v = this.#i = Ny({
      initialPromise: l?.initialPromise,
      fn: m.fetchFn,
      onCancel: (y) => {
        y instanceof yf && y.revert && this.setState({
          ...this.#n,
          fetchStatus: "idle"
        }), r.abort();
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
      const y = await v.start();
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
      this.#i === v && (this.#i = void 0), this.scheduleGc();
    }
  }
  #s(a) {
    const l = (r) => {
      switch (a.type) {
        case "failed":
          return {
            ...r,
            fetchFailureCount: a.failureCount,
            fetchFailureReason: a.error
          };
        case "pause":
          return {
            ...r,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...r,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...r,
            ...Ay(r.data, this.options),
            fetchMeta: a.meta ?? null
          };
        case "success":
          const c = {
            ...r,
            ...Mp(a.data, a.dataUpdatedAt),
            dataUpdateCount: r.dataUpdateCount + 1,
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
            ...r,
            error: f,
            errorUpdateCount: r.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: r.fetchFailureCount + 1,
            fetchFailureReason: f,
            fetchStatus: "idle",
            status: "error",
            isInvalidated: !0
          };
        case "invalidate":
          return {
            ...r,
            isInvalidated: !0
          };
        case "setState":
          return {
            ...r,
            ...a.state
          };
      }
    };
    this.state = l(this.state), xt.batch(() => {
      this.observers.slice().forEach((r) => {
        r.onQueryUpdate();
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
function Mp(a, l) {
  return {
    data: a,
    dataUpdatedAt: l ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success"
  };
}
function Dp(a) {
  const l = typeof a.initialData == "function" ? a.initialData() : a.initialData, r = l !== void 0, c = r ? typeof a.initialDataUpdatedAt == "function" ? a.initialDataUpdatedAt() : a.initialDataUpdatedAt : 0;
  return {
    data: l,
    dataUpdateCount: 0,
    dataUpdatedAt: r ? c ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: r ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var u_ = class extends Nu {
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
    this.listeners.size === 1 && (this.#t.addObserver(this), Up(this.#t, this.options) ? this.#d() : this.updateResult(), this.#b());
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
    const l = this.options, r = this.#t;
    if (this.options = this.#e.defaultQueryOptions(a), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof Qe(this.options.enabled, this.#t) != "boolean") throw new Error("Expected enabled to be a boolean or a callback that returns a boolean");
    this.#x(), this.#t.setOptions(this.options), l._defaulted && !rf(this.options, l) && this.#e.getQueryCache().notify({
      type: "observerOptionsUpdated",
      query: this.#t,
      observer: this
    });
    const c = this.hasListeners();
    c && Zp(this.#t, r, this.options, l) && this.#d(), this.updateResult(), c && (this.#t !== r || Qe(this.options.enabled, this.#t) !== Qe(l.enabled, this.#t) || Qe(this.options.staleTime, this.#t) !== Qe(l.staleTime, this.#t)) && this.#p();
    const f = this.#y();
    c && (this.#t !== r || Qe(this.options.enabled, this.#t) !== Qe(l.enabled, this.#t) || f !== this.#c) && this.#g(f);
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
    const l = this.#e.getQueryCache().build(this.#e, a), r = this.createResult(l, a);
    return rf(this.getCurrentResult(), r) || (this.#a = r, this.#i = this.options, this.#l = this.#t.state), r;
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
    return new Proxy(a, { get: (r, c) => (this.trackProp(c), l?.(c), Reflect.get(r, c)) });
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
    const l = this.#e.defaultQueryOptions(a), r = this.#e.getQueryCache().build(this.#e, l);
    let c = () => {
    }, f;
    const h = new Promise((m) => {
      f = m, c = this.#e.getQueryCache().subscribe((v) => {
        v.type === "updated" && v.query.queryHash === r.queryHash && r.state.data !== void 0 && (c(), m(this.createResult(r, l)));
      });
    });
    return Promise.race([r.fetch().then(() => {
      const m = this.createResult(r, l);
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
  #v(a) {
    return !Df() && Qe(this.options.enabled, this.#t) !== !1 && xy(a);
  }
  #p() {
    this.#_();
    const a = Qe(this.options.staleTime, this.#t);
    if (this.#a.isStale || !this.#v(a)) return;
    const l = jy(this.#a.dataUpdatedAt, a) + 1;
    this.#o = di.setTimeout(() => {
      this.#a.isStale || this.updateResult();
    }, l);
  }
  #y() {
    return Qe(this.options.refetchInterval, this.#t) ?? !1;
  }
  #g(a) {
    this.#S(), this.#c = a, !(this.#c === 0 || !this.#v(this.#c)) && (this.#f = di.setInterval(() => {
      (this.options.refetchIntervalInBackground || Uf.isFocused()) && this.#d();
    }, this.#c));
  }
  #b() {
    this.#p(), this.#g(this.#y());
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
    const r = this.#t, c = this.options, f = this.#a, h = this.#l, m = this.#i, v = a !== r ? a.state : this.#n, { state: y } = a;
    let b = { ...y }, S = !1, g;
    if (l._optimisticResults) {
      const $ = this.hasListeners(), I = !$ && Up(a, l), W = $ && Zp(a, r, l, c);
      (I || W) && (b = {
        ...b,
        ...Ay(y.data, a.options)
      }), l._optimisticResults === "isRestoring" && (b.fetchStatus = "idle");
    }
    let { error: O, errorUpdatedAt: U, status: M } = b;
    g = b.data;
    let N = !1;
    if (l.placeholderData !== void 0 && g === void 0 && M === "pending") {
      let $;
      f?.isPlaceholderData && l.placeholderData === m?.placeholderData ? ($ = f.data, N = !0) : $ = typeof l.placeholderData == "function" ? l.placeholderData(this.#h?.state.data, this.#h) : l.placeholderData, $ !== void 0 && (M = "success", g = pf(f?.data, $, l), S = !0);
    }
    if (l.select && g !== void 0 && !N)
      if (f && g === h?.data && l.select === this.#r) g = this.#s;
      else try {
        this.#r = l.select, g = l.select(g), g = pf(f?.data, g, l), this.#s = g, this.#u = null;
      } catch ($) {
        this.#u = $;
      }
    else g === void 0 && (this.#u = null);
    this.#u && (O = this.#u, g = this.#s, U = Date.now(), M = "error", S = !1);
    const A = b.fetchStatus === "fetching", w = M === "pending", L = M === "error", ue = w && A, me = g !== void 0;
    return {
      status: M,
      fetchStatus: b.fetchStatus,
      isPending: w,
      isSuccess: M === "success",
      isError: L,
      isInitialLoading: ue,
      isLoading: ue,
      data: g,
      dataUpdatedAt: b.dataUpdatedAt,
      error: O,
      errorUpdatedAt: U,
      failureCount: b.fetchFailureCount,
      failureReason: b.fetchFailureReason,
      errorUpdateCount: b.errorUpdateCount,
      isFetched: a.isFetched(),
      isFetchedAfterMount: b.dataUpdateCount > v.dataUpdateCount || b.errorUpdateCount > v.errorUpdateCount,
      isFetching: A,
      isRefetching: A && !w,
      isLoadingError: L && !me,
      isPaused: b.fetchStatus === "paused",
      isPlaceholderData: S,
      isRefetchError: L && me,
      isStale: Zf(a, l),
      refetch: this.refetch,
      isEnabled: Qe(l.enabled, a) !== !1
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
      return this.options.throwOnError && m.add("error"), Object.keys(this.#a).some((v) => {
        const y = v;
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
function s_(a, l) {
  return Qe(l.enabled, a) !== !1 && a.state.data === void 0 && !(a.state.status === "error" && Qe(l.retryOnMount, a) === !1);
}
function Up(a, l) {
  return s_(a, l) || a.state.data !== void 0 && gf(a, l, l.refetchOnMount);
}
function gf(a, l, r) {
  if (Qe(l.enabled, a) !== !1 && Qe(l.staleTime, a) !== "static") {
    const c = Qe(r, a);
    return c === "always" || c !== !1 && Zf(a, l);
  }
  return !1;
}
function Zp(a, l, r, c) {
  return (a !== l || Qe(c.enabled, a) === !1) && (!r.suspense || a.state.status !== "error") && Zf(a, r);
}
function Zf(a, l) {
  return Qe(l.enabled, a) !== !1 && a.isStaleByTime(Qe(l.staleTime, a));
}
var r_ = class extends Cy {
  #e;
  #t;
  #n;
  #a;
  constructor(a) {
    super(), this.#e = a.client, this.mutationId = a.mutationId, this.#n = a.mutationCache, this.#t = [], this.state = a.state || c_(), this.setOptions(a.options), this.scheduleGc();
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
    }, r = {
      client: this.#e,
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    }, c = this.#a = Ny({
      fn: () => this.options.mutationFn ? this.options.mutationFn(a, r) : Promise.reject(/* @__PURE__ */ new Error("No mutationFn found")),
      onFail: (m, v) => {
        this.#l({
          type: "failed",
          failureCount: m,
          error: v
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
        }), this.#n.config.onMutate && await this.#n.config.onMutate(a, this, r);
        const v = await this.options.onMutate?.(a, r);
        v !== this.state.context && this.#l({
          type: "pending",
          context: v,
          variables: a,
          isPaused: h
        });
      }
      const m = await c.start();
      return await this.#n.config.onSuccess?.(m, a, this.state.context, this, r), await this.options.onSuccess?.(m, a, this.state.context, r), await this.#n.config.onSettled?.(m, null, this.state.variables, this.state.context, this, r), await this.options.onSettled?.(m, null, a, this.state.context, r), this.#l({
        type: "success",
        data: m
      }), m;
    } catch (m) {
      try {
        await this.#n.config.onError?.(m, a, this.state.context, this, r);
      } catch (v) {
        Promise.reject(v);
      }
      try {
        await this.options.onError?.(m, a, this.state.context, r);
      } catch (v) {
        Promise.reject(v);
      }
      try {
        await this.#n.config.onSettled?.(void 0, m, this.state.variables, this.state.context, this, r);
      } catch (v) {
        Promise.reject(v);
      }
      try {
        await this.options.onSettled?.(void 0, m, a, this.state.context, r);
      } catch (v) {
        Promise.reject(v);
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
    const l = (r) => {
      switch (a.type) {
        case "failed":
          return {
            ...r,
            failureCount: a.failureCount,
            failureReason: a.error
          };
        case "pause":
          return {
            ...r,
            isPaused: !0
          };
        case "continue":
          return {
            ...r,
            isPaused: !1
          };
        case "pending":
          return {
            ...r,
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
            ...r,
            data: a.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1
          };
        case "error":
          return {
            ...r,
            data: void 0,
            error: a.error,
            failureCount: r.failureCount + 1,
            failureReason: a.error,
            isPaused: !1,
            status: "error"
          };
      }
    };
    this.state = l(this.state), xt.batch(() => {
      this.#t.forEach((r) => {
        r.onMutationUpdate(a);
      }), this.#n.notify({
        mutation: this,
        type: "updated",
        action: a
      });
    });
  }
};
function c_() {
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
var o_ = class extends Nu {
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
  build(a, l, r) {
    const c = new r_({
      client: a,
      mutationCache: this,
      mutationId: ++this.#n,
      options: a.defaultMutationOptions(l),
      state: r
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
      const r = this.#t.get(l);
      r ? r.push(a) : this.#t.set(l, [a]);
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
        const r = this.#t.get(l);
        if (r)
          if (r.length > 1) {
            const c = r.indexOf(a);
            c !== -1 && r.splice(c, 1);
          } else r[0] === a && this.#t.delete(l);
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
      const r = this.#t.get(l)?.find((c) => c.state.status === "pending");
      return !r || r === a;
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
    return typeof l == "string" ? this.#t.get(l)?.find((r) => r !== a && r.state.isPaused)?.continue() ?? Promise.resolve() : Promise.resolve();
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
    return this.getAll().find((r) => Cp(l, r));
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
    return this.getAll().filter((l) => Cp(a, l));
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
var f_ = class extends Nu {
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
  build(a, l, r) {
    const c = l.queryKey, f = l.queryHash ?? wf(c, l);
    let h = this.get(f);
    return h || (h = new l_({
      client: a,
      queryKey: c,
      queryHash: f,
      options: a.defaultQueryOptions(l),
      state: r,
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
    return this.getAll().find((r) => Np(l, r));
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
    return Object.keys(a).length > 0 ? l.filter((r) => Np(a, r)) : l;
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
}, d_ = class {
  #e;
  #t;
  #n;
  #a;
  #l;
  #i;
  #u;
  #r;
  constructor(a = {}) {
    this.#e = a.queryCache || new f_(), this.#t = a.mutationCache || new o_(), this.#n = a.defaultOptions || {}, this.#a = /* @__PURE__ */ new Map(), this.#l = /* @__PURE__ */ new Map(), this.#i = 0;
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
    const l = this.defaultQueryOptions(a), r = this.#e.build(this, l), c = r.state.data;
    return c === void 0 ? this.fetchQuery(a) : (a.revalidateIfStale && r.isStaleByTime(Qe(l.staleTime, r)) && this.prefetchQuery(l), Promise.resolve(c));
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
    return this.#e.findAll(a).map(({ queryKey: l, state: r }) => [l, r.data]);
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
  setQueryData(a, l, r) {
    const c = this.defaultQueryOptions({ queryKey: a }), f = this.#e.get(c.queryHash)?.state.data, h = Gb(l, f);
    if (h !== void 0)
      return this.#e.build(this, c).setData(h, {
        ...r,
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
  setQueriesData(a, l, r) {
    return xt.batch(() => this.#e.findAll(a).map(({ queryKey: c }) => [c, this.setQueryData(c, l, r)]));
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
      l.findAll(a).forEach((r) => {
        l.remove(r);
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
    const r = this.#e;
    return xt.batch(() => {
      const c = r.findAll(a), f = new Set(c);
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
    const r = {
      revert: !0,
      ...l
    }, c = xt.batch(() => this.#e.findAll(a).map((f) => f.cancel(r)));
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
    return xt.batch(() => (this.#e.findAll(a).forEach((r) => {
      r.invalidate();
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
    const r = {
      ...l,
      cancelRefetch: l.cancelRefetch ?? !0
    }, c = xt.batch(() => this.#e.findAll(a).filter((f) => !f.isDisabled() && !f.isStatic()).map((f) => {
      let h = f.fetch(void 0, r);
      return r.throwOnError || (h = h.catch(Qt)), f.state.fetchStatus === "paused" ? Promise.resolve() : h;
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
    const r = this.#e.build(this, l), c = r.isStaleByTime(Qe(l.staleTime, r)) ? await r.fetch(l) : r.state.data, f = l.select;
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
    const r = this.#e.build(this, l);
    return r.isStaleByTime(Qe(l.staleTime, r)) ? r.fetch(l) : Promise.resolve(r.state.data);
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
    const l = [...this.#a.values()], r = {};
    return l.forEach((c) => {
      ml(a, c.queryKey) && Object.assign(r, c.defaultOptions);
    }), r;
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
    const l = [...this.#l.values()], r = {};
    return l.forEach((c) => {
      ml(a, c.mutationKey) && Object.assign(r, c.defaultOptions);
    }), r;
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
    return l.queryHash || (l.queryHash = wf(l.queryKey, l)), l.refetchOnReconnect === void 0 && (l.refetchOnReconnect = l.networkMode !== "always"), l.throwOnError === void 0 && (l.throwOnError = !!l.suspense), !l.networkMode && l.persister && (l.networkMode = "offlineFirst"), l.queryFn === Mf && (l.enabled = !1), l;
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
const Ry = H.createContext(!1), h_ = () => H.useContext(Ry);
Ry.Provider;
function m_() {
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
const v_ = H.createContext(m_()), p_ = () => H.useContext(v_), y_ = (a, l, r) => {
  const c = r?.state.error && typeof a.throwOnError == "function" ? Ey(a.throwOnError, [r.state.error, r]) : a.throwOnError;
  (a.suspense || c) && (l.isReset() || (a.retryOnMount = !1));
}, g_ = (a) => {
  H.useEffect(() => {
    a.clearReset();
  }, [a]);
}, b_ = ({ result: a, errorResetBoundary: l, throwOnError: r, query: c, suspense: f }) => a.isError && !l.isReset() && !a.isFetching && c && (f && a.data === void 0 || Ey(r, [a.error, c])), __ = (a) => {
  if (a.suspense) {
    const r = (f) => f === "static" ? f : Math.max(f ?? 1e3, 1e3), c = a.staleTime;
    a.staleTime = typeof c == "function" ? (...f) => r(c(...f)) : r(c), typeof a.gcTime == "number" && (a.gcTime = Math.max(a.gcTime, 1e3));
  }
}, S_ = (a, l) => a?.suspense && l.isPending, x_ = (a, l, r) => l.fetchOptimistic(a).catch(() => {
  r.clearReset();
});
function j_(a, l, r) {
  const c = h_(), f = p_(), h = _r(), m = h.defaultQueryOptions(a), v = h.getQueryCache().get(m.queryHash), y = a.subscribed !== !1;
  m._optimisticResults = c ? "isRestoring" : y ? "optimistic" : void 0, __(m), y_(m, f, v), g_(f);
  const [b] = H.useState(() => new l(h, m)), S = b.getOptimisticResult(m), g = !c && y;
  if (H.useSyncExternalStore(H.useCallback((O) => {
    const U = g ? b.subscribe(xt.batchCalls(O)) : Qt;
    return b.updateResult(), U;
  }, [b, g]), () => b.getCurrentResult(), () => b.getCurrentResult()), H.useEffect(() => {
    b.setOptions(m);
  }, [m, b]), S_(m, S)) throw x_(m, b, f);
  if (b_({
    result: S,
    errorResetBoundary: f,
    throwOnError: m.throwOnError,
    query: v,
    suspense: m.suspense
  })) throw S.error;
  return m.notifyOnChangeProps ? S : b.trackResult(S);
}
function an(a, l) {
  return j_(a, u_);
}
const O_ = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), z_ = (a) => a.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (l, r, c) => c ? c.toUpperCase() : r.toLowerCase()
), qp = (a) => {
  const l = z_(a);
  return l.charAt(0).toUpperCase() + l.slice(1);
}, wy = (...a) => a.filter((l, r, c) => !!l && l.trim() !== "" && c.indexOf(l) === r).join(" ").trim(), E_ = (a) => {
  for (const l in a)
    if (l.startsWith("aria-") || l === "role" || l === "title")
      return !0;
};
var T_ = {
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
const N_ = H.forwardRef(
  ({
    color: a = "currentColor",
    size: l = 24,
    strokeWidth: r = 2,
    absoluteStrokeWidth: c,
    className: f = "",
    children: h,
    iconNode: m,
    ...v
  }, y) => H.createElement(
    "svg",
    {
      ref: y,
      ...T_,
      width: l,
      height: l,
      stroke: a,
      strokeWidth: c ? Number(r) * 24 / Number(l) : r,
      className: wy("lucide", f),
      ...!h && !E_(v) && { "aria-hidden": "true" },
      ...v
    },
    [
      ...m.map(([b, S]) => H.createElement(b, S)),
      ...Array.isArray(h) ? h : [h]
    ]
  )
);
const Oe = (a, l) => {
  const r = H.forwardRef(
    ({ className: c, ...f }, h) => H.createElement(N_, {
      ref: h,
      iconNode: l,
      className: wy(
        `lucide-${O_(qp(a))}`,
        `lucide-${a}`,
        c
      ),
      ...f
    })
  );
  return r.displayName = qp(a), r;
};
const C_ = [
  ["path", { d: "M17 7 7 17", key: "15tmo1" }],
  ["path", { d: "M17 17H7V7", key: "1org7z" }]
], A_ = Oe("arrow-down-left", C_);
const R_ = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], w_ = Oe("arrow-left", R_);
const M_ = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], D_ = Oe("arrow-up-right", M_);
const U_ = [
  ["path", { d: "M4.929 4.929 19.07 19.071", key: "196cmz" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
], Z_ = Oe("ban", U_);
const q_ = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
], k_ = Oe("chart-column", q_);
const H_ = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], B_ = Oe("check", H_);
const L_ = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Q_ = Oe("chevron-right", L_);
const Y_ = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], $_ = Oe("circle-check", Y_);
const G_ = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
], V_ = Oe("credit-card", G_);
const X_ = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], K_ = Oe("download", X_);
const J_ = [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
], I_ = Oe("keyboard", J_);
const F_ = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], P_ = Oe("loader-circle", F_);
const W_ = [["path", { d: "M5 12h14", key: "1ays0h" }]], eS = Oe("minus", W_);
const tS = [
  ["rect", { width: "20", height: "14", x: "2", y: "3", rx: "2", key: "48i651" }],
  ["line", { x1: "8", x2: "16", y1: "21", y2: "21", key: "1svkeh" }],
  ["line", { x1: "12", x2: "12", y1: "17", y2: "21", key: "vw1qmm" }]
], nS = Oe("monitor", tS);
const aS = [
  [
    "path",
    {
      d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",
      key: "kfwtm"
    }
  ]
], iS = Oe("moon", aS);
const lS = [
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
], bf = Oe("package", lS);
const uS = [
  ["rect", { x: "14", y: "3", width: "5", height: "18", rx: "1", key: "kaeet6" }],
  ["rect", { x: "5", y: "3", width: "5", height: "18", rx: "1", key: "1wsw3u" }]
], sS = Oe("pause", uS);
const rS = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
], kp = Oe("play", rS);
const cS = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Za = Oe("plus", cS);
const oS = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
], hr = Oe("printer", oS);
const fS = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M14 8H8", key: "1l3xfs" }],
  ["path", { d: "M16 12H8", key: "1fr5h0" }],
  ["path", { d: "M13 16H8", key: "wsln4y" }]
], dS = Oe("receipt-text", fS);
const hS = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], mS = Oe("refresh-cw", hS);
const vS = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
], pS = Oe("rotate-ccw", vS);
const yS = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
], gS = Oe("scan-line", yS);
const bS = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], My = Oe("search", bS);
const _S = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], SS = Oe("settings", _S);
const xS = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], jS = Oe("shield-check", xS);
const OS = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
], _f = Oe("shopping-bag", OS);
const zS = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], ES = Oe("sun", zS);
const TS = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
], NS = Oe("trash-2", TS);
const CS = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
], Dy = Oe("wallet", CS);
const AS = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 5.17-2.69", key: "1dl1wf" }],
  ["path", { d: "M19 12.859a10 10 0 0 0-2.007-1.523", key: "4k23kn" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 4.177-2.643", key: "1grhjp" }],
  ["path", { d: "M22 8.82a15 15 0 0 0-11.288-3.764", key: "z3jwby" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], RS = Oe("wifi-off", AS);
const wS = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
], MS = Oe("wifi", wS);
const DS = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Sr = Oe("x", DS);
class fi extends Error {
  constructor(l, r, c, f = !1) {
    super(l), this.code = r, this.status = c, this.uncertain = f;
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
class US {
  constructor(l, r = l.registerId) {
    this.config = l, this.registerId = r;
  }
  config;
  registerId;
  scope = "";
  async request(l, r = {}) {
    const c = new URL(
      (r.web ? this.config.webUrl : this.config.coreUrl) + "/" + l,
      location.origin
    );
    this.registerId && c.searchParams.set("register_id", String(this.registerId));
    let f;
    try {
      f = await fetch(c, {
        method: r.method || "GET",
        credentials: "same-origin",
        cache: "no-store",
        signal: r.signal || AbortSignal.timeout(2e4),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": this.config.csrf,
          ...r.key ? { "Idempotency-Key": r.key } : {}
        },
        body: r.body === void 0 ? void 0 : JSON.stringify(r.body)
      });
    } catch (m) {
      throw r.signal?.aborted ? m : new fi(
        "Connection interrupted. Your checkout identity is saved. Reconnect and retry.",
        "NETWORK",
        0,
        !0
      );
    }
    const h = await f.json().catch(() => null);
    if (!f.ok) {
      const m = h?.error?.fields || h?.errors, v = m ? Object.values(m).flat().join(" ") : "";
      throw new fi(
        v || h?.error?.message || h?.message || (f.status === 419 ? "Your session expired. Sign in again before retrying." : "The request could not be completed."),
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
  async mutate(l, r, c = "POST", f = !1, h = hi()) {
    if (f && l.startsWith("drafts/"))
      return this.request(l, { body: r, method: c, web: f, key: h });
    const m = r && typeof r == "object" ? r : null, v = m ? { ...m } : r;
    if (v && typeof v == "object")
      for (const g of ["client_shift_id", "client_refund_id"])
        g in v && (v[g] = "operation-identity");
    const y = Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-256",
          new TextEncoder().encode(JSON.stringify(v))
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
        body: r,
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
    Object.entries(a).filter(([, l]) => l !== "" && l != null).map(([l, r]) => [l, String(r)])
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
  const [l, r = ""] = a.trim().split(".");
  return dl(BigInt(l) * 100n + BigInt(r.padEnd(2, "0")));
}
const hl = (a) => `${Math.trunc(a / 100)}.${String(Math.abs(a % 100)).padStart(2, "0")}`, ct = (a, l = "NGN") => new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: l,
  maximumFractionDigits: 2
}).format(a / 100);
function vl(a, l = 1e4) {
  const r = a.item, c = a.override_minor ?? r.unit_price_minor;
  if (!Number.isSafeInteger(a.quantity) || a.quantity < 1 || a.quantity > 1e4)
    throw new Error("Use a whole quantity between 1 and 10,000.");
  const f = BigInt(c) * BigInt(a.quantity), h = BigInt(a.discount_minor);
  if (h < 0n || h > cr(f, BigInt(l)))
    throw new Error("This discount exceeds your cashier limit.");
  const m = f - h, v = BigInt(
    r.tax_rules.filter((O) => O.type === "percent").reduce((O, U) => O + U.value, 0)
  ), y = BigInt(
    r.tax_rules.filter((O) => O.type === "amount").reduce((O, U) => O + U.value, 0)
  ) * BigInt(a.quantity);
  if (v > 10000n || y < 0n || r.tax_inclusive && y > m)
    throw new Error("The product tax policy is invalid.");
  const b = r.tax_inclusive ? m - ((m - y) * 10000n + (10000n + v) / 2n) / (10000n + v) : cr(m, v) + y, S = r.tax_inclusive ? m : m + b, g = cr(S, BigInt(r.gst_bps));
  return {
    subtotal_minor: dl(f),
    discount_minor: dl(h),
    tax_minor: dl(b + g),
    total_minor: dl(S + g),
    unit_price_minor: c
  };
}
function qS(a, l = 1e4) {
  const r = a.map((f) => vl(f, l)), c = (f) => dl(r.reduce((h, m) => h + BigInt(m[f]), 0n));
  return {
    subtotal_minor: c("subtotal_minor"),
    discount_minor: c("discount_minor"),
    tax_minor: c("tax_minor"),
    total_minor: c("total_minor")
  };
}
function kS(a, l) {
  return a.map((r) => {
    const c = vl(r, l);
    return {
      stock_id: r.item.stock_id,
      quantity: r.quantity,
      discount_minor: r.discount_minor,
      ...r.override_minor === void 0 ? {} : {
        override_minor: r.override_minor,
        override_reason: r.override_reason
      },
      unit_price_minor: c.unit_price_minor,
      tax_minor: c.tax_minor,
      total_minor: c.total_minor
    };
  });
}
function HS(a, l, r) {
  const c = a.map(
    (v) => BigInt(v.override_minor ?? v.item.unit_price_minor) * BigInt(v.quantity)
  ), f = c.reduce((v, y) => v + y, 0n);
  if (f === 0n || BigInt(l) > cr(f, BigInt(r)))
    throw new Error("This discount exceeds your cashier limit.");
  let h = BigInt(l);
  const m = a.map((v, y) => {
    const b = y === a.length - 1 ? h : BigInt(l) * c[y] / f;
    return h -= b, { ...v, discount_minor: Number(b) };
  });
  return m.forEach((v) => vl(v, r)), m;
}
async function BS(a, l, r, c) {
  return a.mutate(
    `drafts/${l.id}`,
    { label: r, revision: l.revision, payload: c },
    "PUT",
    !0
  );
}
async function LS(a, l) {
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
function Hp(a, l = "|") {
  return a.map((r) => Ly(r)).join(l);
}
function xf(a, l) {
  return typeof l == "bigint" ? l.toString() : l;
}
class QS {
  constructor(l) {
    this._getter = l, this._value = void 0;
  }
  get value() {
    const l = this._getter;
    return l !== void 0 && (this._value = l(), this._getter = void 0), this._value;
  }
}
function qf(a) {
  return new QS(a);
}
function YS(a) {
  return a == null;
}
function kf(a) {
  const l = a.startsWith("^") ? 1 : 0, r = a.endsWith("$") ? a.length - 1 : a.length;
  return a.slice(l, r);
}
function $S(a, l) {
  const r = a / l, c = Math.round(r), f = 4 * Number.EPSILON * Math.max(Math.abs(r), 1);
  return Math.abs(r - c) < f ? 0 : r - c;
}
function pi(a, l, r) {
  Object.defineProperty(a, l, {
    value: r,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function Zy(a) {
  const l = Object.getOwnPropertyDescriptor(a, "shape");
  return l?.get ? l.get.raw : l?.value;
}
function ua(a) {
  return Zy(a._zod.def) ?? a._zod.def.shape;
}
function qy(a, l, r) {
  Object.defineProperty(a, l, {
    get() {
      const c = r();
      return pi(this, l, c), c;
    },
    enumerable: !0,
    configurable: !0
  });
}
function ky(a, l, r) {
  l in a ? pi(a, l, r) : a[l] = r;
}
function vi(a, l, r, c) {
  const f = ua(l);
  for (const h of r) {
    const m = Object.getOwnPropertyDescriptor(f, h);
    m.enumerable && (m.get ? qy(a, h, () => {
      const v = l._zod.def.shape[h];
      return c ? c(v, h) : v;
    }) : ky(a, h, c ? c(m.value, h) : m.value));
  }
}
function GS(a, l) {
  for (const r of Reflect.ownKeys(l)) {
    const c = Object.getOwnPropertyDescriptor(l, r);
    c.enumerable && (c.get ? qy(a, r, () => l[r]) : ky(a, r, c.value));
  }
}
function nn(...a) {
  const l = {};
  for (const r of a) {
    const c = Object.getOwnPropertyDescriptors(r);
    Object.assign(l, c);
  }
  return Object.defineProperties({}, l);
}
function VS(a) {
  return JSON.stringify(a);
}
function XS(a) {
  return a.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Hy = "captureStackTrace" in Error ? Error.captureStackTrace : (...a) => {
};
function mr(a) {
  return typeof a == "object" && a !== null && !Array.isArray(a);
}
const KS = /* @__PURE__ */ qf(() => {
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
  const r = l.prototype;
  return !(mr(r) === !1 || Object.prototype.hasOwnProperty.call(r, "isPrototypeOf") === !1);
}
function By(a) {
  return Eu(a) ? { ...a } : Array.isArray(a) ? [...a] : a instanceof Map ? new Map(a) : a instanceof Set ? new Set(a) : a;
}
const JS = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function xr(a) {
  return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function ka(a, l, r) {
  const c = new a._zod.constr(l ?? a._zod.def);
  return (!l || r?.parent) && (c._zod.parent = a), c;
}
function ae(a) {
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
function IS(a) {
  return Object.keys(a).filter((l) => a[l]._zod.optin !== void 0 && a[l]._zod.optout === "optional");
}
const Qy = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
}, FS = {
  int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
  uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
};
function PS(a, l) {
  const r = a._zod.def, c = r.checks;
  if (c && c.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const h = {};
  return vi(h, a, jr(a, l)), ka(a, nn(r, { shape: h, checks: [] }));
}
function jr(a, l) {
  const r = ua(a), c = [];
  for (const f of Reflect.ownKeys(l)) {
    if (!Object.getOwnPropertyDescriptor(r, f)?.enumerable)
      throw new Error(`Unrecognized key: "${String(f)}"`);
    l[f] && c.push(f);
  }
  return c;
}
function WS(a, l) {
  const r = a._zod.def, c = r.checks;
  if (c && c.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const h = new Set(jr(a, l)), m = {};
  return vi(m, a, Reflect.ownKeys(ua(a)).filter((v) => !h.has(v))), ka(a, nn(r, { shape: m, checks: [] }));
}
function e2(a, l) {
  if (!Eu(l))
    throw new Error("Invalid input to extend: expected a plain object");
  const r = a._zod.def.checks;
  if (r && r.length > 0) {
    const f = ua(a);
    for (const h of Reflect.ownKeys(l))
      if (Object.getOwnPropertyDescriptor(f, h) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  return ka(a, nn(a._zod.def, { shape: Yy(a, l) }));
}
function Yy(a, l) {
  const r = {};
  return vi(r, a, Reflect.ownKeys(ua(a))), GS(r, l), r;
}
function t2(a, l) {
  if (!Eu(l))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  return ka(a, nn(a._zod.def, { shape: Yy(a, l) }));
}
function n2(a, l) {
  if (!l?._zod?.def)
    throw new Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");
  if (a._zod.def.checks?.length)
    throw new Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");
  const r = {};
  vi(r, a, Reflect.ownKeys(ua(a))), vi(r, l, Reflect.ownKeys(ua(l)));
  const c = nn(a._zod.def, {
    shape: r,
    get catchall() {
      return l._zod.def.catchall;
    },
    checks: l._zod.def.checks ?? []
  });
  return ka(a, c);
}
function Bp(a, l, r, c = "partial") {
  const h = l._zod.def.checks;
  if (h && h.length > 0)
    throw new Error(`.${c}() cannot be used on object schemas containing refinements`);
  const v = r ? new Set(jr(l, r)) : void 0, y = {};
  return vi(y, l, Reflect.ownKeys(ua(l)), a && ((b, S) => v && !v.has(S) ? b : new a({ type: "optional", innerType: b }))), ka(l, nn(l._zod.def, { shape: y, checks: [] }));
}
function a2(a, l, r) {
  const c = r ? new Set(jr(l, r)) : void 0, f = {};
  return vi(f, l, Reflect.ownKeys(ua(l)), (h, m) => (
    // overwrite with non-optional
    c && !c.has(m) ? h : new a({ type: "nonoptional", innerType: h })
  )), ka(l, nn(l._zod.def, { shape: f }));
}
function ia(a, l = 0) {
  if (a.aborted === !0)
    return !0;
  for (let r = l; r < a.issues.length; r++)
    if (a.issues[r]?.continue !== !0)
      return !0;
  return !1;
}
function i2(a, l = 0) {
  if (a.aborted === !0)
    return !0;
  for (let r = l; r < a.issues.length; r++)
    if (a.issues[r]?.continue === !1)
      return !0;
  return !1;
}
function $y(a, l) {
  return l.map((r) => {
    var c;
    return (c = r).path ?? (c.path = []), r.path.unshift(a), r;
  });
}
function yu(a) {
  return typeof a == "string" ? a : a?.message;
}
function Lp(a) {
  const l = [];
  for (const r of a ?? []) {
    const c = r._zod.def;
    if (!/_(length|size)$|_equals$/.test(c.check))
      break;
    const f = c.maximum ?? c.length ?? c.size;
    f >= 0 && l.push([f, r]);
  }
  return l;
}
function jf(a, l, r) {
  var c;
  for (let f = l; f < a.length; f++)
    (c = a[f]).schema ?? (c.schema = r);
}
function gl(a, l, r) {
  var c;
  const f = a.inst?._zod?.traits;
  f?.has("$ZodType") && (f.has("$ZodCheck") ? (c = a).schema ?? (c.schema = a.inst) : a.schema = a.inst);
  const h = a.schema !== a.inst ? a.schema?._zod.def?.error : void 0, m = a.message ? a.message : yu(a.inst?._zod.def?.error?.(a)) ?? yu(h?.(a)) ?? yu(l?.error?.(a)) ?? yu(r.customError?.(a)) ?? yu(r.localeError?.(a)) ?? "Invalid input", v = {};
  for (const y of Object.keys(a))
    y === "inst" || y === "schema" || y === "continue" || y === "input" || y === "__proto__" || (v[y] = a[y]);
  return v.path ?? (v.path = []), v.message = m, l?.reportInput && (v.input = a.input), v;
}
const l2 = /[\uD800-\uDBFF]/;
function Hf(a) {
  const l = a.length;
  if (!l2.test(a))
    return l;
  let r = l;
  for (let c = 0; c < l - 1; c++)
    (a.charCodeAt(c) & 64512) === 55296 && (a.charCodeAt(c + 1) & 64512) === 56320 && (r--, c++);
  return r;
}
function Bf(a) {
  return Array.isArray(a) ? "array" : typeof a == "string" ? "string" : "unknown";
}
function u2(a) {
  const l = typeof a;
  switch (l) {
    case "number":
      return Number.isNaN(a) ? "nan" : "number";
    case "object": {
      if (a === null)
        return "null";
      if (Array.isArray(a))
        return "array";
      const r = a;
      if (r && Object.getPrototypeOf(r) !== Object.prototype && "constructor" in r && r.constructor)
        return r.constructor.name;
    }
  }
  return l;
}
function Tu(...a) {
  const [l, r, c] = a;
  return typeof l == "string" ? {
    message: l,
    code: "custom",
    input: r,
    inst: c
  } : { ...l };
}
function s2(a, l) {
  for (const r in l) {
    const c = Object.getOwnPropertyDescriptor(l, r);
    c.get ? Object.defineProperty(a, r, { ...c, enumerable: !1 }) : r2(a, r, c.value);
  }
}
function qa(a, l, r, c = !0) {
  return Object.defineProperty(a, l, { configurable: !0, writable: !0, enumerable: c, value: r }), r;
}
function Gy(a, l, r) {
  return qa(a, l, r, !1);
}
function Vy(a, l) {
  for (const r in a) {
    const c = a[r];
    Object.defineProperty(l, r, {
      configurable: !0,
      enumerable: !0,
      get() {
        return qa(this, r, c(this));
      },
      set(f) {
        qa(this, r, f);
      }
    });
  }
  return l;
}
function r2(a, l, r) {
  Object.defineProperty(a, l, {
    configurable: !0,
    get() {
      return this == null ? r : qa(this, l, r.bind(this));
    },
    set(c) {
      qa(this, l, c);
    }
  });
}
function c2(a, l) {
  const r = Object.getPrototypeOf(a);
  return l in r ? void 0 : r;
}
let cf, Ua = !1;
const o2 = {
  configurable: !0,
  get() {
    Ua = !0;
  }
};
function Me(a, l, r) {
  const c = Object.getPrototypeOf(a._zod);
  if (l in c && cf !== a._zod) {
    cf = void 0;
    return;
  }
  cf = a._zod, Object.defineProperty(c, l, {
    configurable: !0,
    get() {
      Object.defineProperty(this, l, o2);
      const f = Ua;
      Ua = !1;
      try {
        const h = r(this);
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
function f2(a, l, r, c) {
  const f = c2(a, l);
  f && Object.defineProperty(f, l, {
    configurable: !0,
    get() {
      const h = { configurable: !0, writable: !0, enumerable: c, value: void 0 };
      return Object.defineProperty(this, l, h), h.value = r(this), Object.defineProperty(this, l, h), h.value;
    },
    set(h) {
      Object.defineProperty(this, l, { configurable: !0, writable: !0, enumerable: c, value: h });
    }
  });
}
const d2 = "~constantCatch";
function h2(a) {
  const l = () => a;
  return l[d2] = !0, l;
}
var Qp;
const of = { value: void 0, enumerable: !1 };
let Yp = "captureStackTrace" in Error ? Error : null;
function m2(a) {
  const l = Yp;
  if (l) {
    const r = l.stackTraceLimit;
    if (typeof r == "number") {
      try {
        l.stackTraceLimit = 0;
      } catch {
        return Yp = null, new a();
      }
      try {
        return new a();
      } finally {
        l.stackTraceLimit = r;
      }
    }
  }
  return new a();
}
function B(a, l, r, c) {
  const f = {};
  function h(O) {
    this.def = O, this.constr = g, this.traits = /* @__PURE__ */ new Set();
  }
  h.prototype = f;
  const m = r, v = m && /* @__PURE__ */ new WeakSet();
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
    if (O._zod.traits.add(a), l(O, U), v) {
      const N = Object.getPrototypeOf(O), A = O._zod.constr.prototype;
      let w = N;
      for (; w && w !== A; )
        w = Object.getPrototypeOf(w);
      const L = w ?? N;
      v.has(L) || (v.add(L), s2(L, m));
    }
    const M = g.prototype;
    for (const N in M)
      Object.prototype.hasOwnProperty.call(M, N) && (N in O || (O[N] = M[N].bind(O)));
  }
  const b = c?.Parent ?? Object;
  class S extends b {
  }
  Object.defineProperty(S, "name", { value: a });
  function g(O) {
    const U = c?.Parent ? m2(S) : this;
    y(U, O);
    const M = U._zod.deferred;
    if (M) {
      for (const A of M)
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
(Qp = globalThis).__zod_globalConfig ?? (Qp.__zod_globalConfig = {});
const Bn = globalThis.__zod_globalConfig;
function Ha(a) {
  return a && Object.assign(Bn, a), Bn;
}
function v2() {
  const a = this._zod;
  return a.message ?? (a.message = JSON.stringify(a.def, xf, 2)), a.message;
}
function p2(a) {
  this._zod.message = a;
}
const y2 = {
  get: v2,
  set: p2,
  enumerable: !0,
  configurable: !0
}, ff = { value: void 0, enumerable: !1 }, $p = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]), g2 = (a, l) => {
  a.name = "$ZodError", ff.value = l, Object.defineProperty(a, "issues", ff), ff.value = void 0, Object.defineProperty(a, "message", y2);
  const r = Object.getPrototypeOf(a);
  $p.has(r) || ($p.add(r), Object.defineProperty(r, "toString", {
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
}, b2 = B("$ZodError", g2);
function _2(a, l, r) {
  return Object.prototype.hasOwnProperty.call(a, l) || (l === "__proto__" ? Object.defineProperty(a, l, { value: r(), writable: !0, enumerable: !0, configurable: !0 }) : a[l] = r()), a[l];
}
function S2(a, l = (r) => r.message) {
  const r = {}, c = [];
  for (const f of a.issues)
    f.path.length > 0 ? _2(r, f.path[0], () => []).push(l(f)) : c.push(l(f));
  return { formErrors: c, fieldErrors: r };
}
function x2(a, l = (r) => r.message) {
  const r = { _errors: [] }, c = (f, h = []) => {
    for (const m of f.issues)
      if (m.code === "invalid_union" && m.errors.length)
        m.errors.map((v) => c({ issues: v }, [...h, ...m.path]));
      else if (m.code === "invalid_key")
        c({ issues: m.issues }, [...h, ...m.path]);
      else if (m.code === "invalid_element")
        c({ issues: m.issues }, [...h, ...m.path]);
      else {
        const v = [...h, ...m.path];
        if (v.length === 0)
          r._errors.push(l(m));
        else {
          let y = r, b = 0;
          for (; b < v.length; ) {
            const S = v[b], g = b === v.length - 1;
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
  return c(a), r;
}
function Or(a, l) {
  return { callee: l?.callee ?? a, Err: l?.Err };
}
const Lf = (a) => {
  const l = (r, c, f, h) => {
    const m = f ? { ...f, async: !1 } : { async: !1 }, v = r._zod.run({ value: c, issues: [] }, m);
    if (v instanceof Promise)
      throw new mi();
    if (v.issues.length) {
      const y = new (h?.Err ?? a)(v.issues.map((b) => gl(b, m, Ha())));
      throw Hy(y, h?.callee ?? l), y;
    }
    return v.value;
  };
  return l;
}, Qf = (a) => {
  const l = async (r, c, f, h) => {
    const m = f ? { ...f, async: !0 } : { async: !0 };
    let v = r._zod.run({ value: c, issues: [] }, m);
    if (v instanceof Promise && (v = await v), v.issues.length) {
      const y = new (h?.Err ?? a)(v.issues.map((b) => gl(b, m, Ha())));
      throw Hy(y, h?.callee ?? l), y;
    }
    return v.value;
  };
  return l;
}, Yf = (a) => (l, r, c) => {
  const f = c ? { ...c, async: !1 } : { async: !1 }, h = l._zod.run({ value: r, issues: [] }, f);
  if (h instanceof Promise)
    throw new mi();
  return h.issues.length ? Ky(a, h.issues, f) : { success: !0, data: h.value };
};
function Ky(a, l, r) {
  let c;
  return {
    success: !1,
    get error() {
      return c || (c = new a(l.map((f) => gl(f, r, Ha()))), l = void 0, r = void 0), c;
    },
    set error(f) {
      c = f, l = void 0, r = void 0;
    }
  };
}
const $f = (a) => async (l, r, c) => {
  const f = c ? { ...c, async: !0 } : { async: !0 };
  let h = l._zod.run({ value: r, issues: [] }, f);
  return h instanceof Promise && (h = await h), h.issues.length ? Ky(a, h.issues, f) : { success: !0, data: h.value };
}, j2 = /* @__PURE__ */ Symbol.for("zod.compile.invalid"), O2 = /* @__PURE__ */ Symbol.for("zod.compile.fallback"), z2 = ((a, l, r) => {
  const c = a._zod.bag.validator;
  if (c !== void 0) {
    if (c(l) !== j2)
      return !0;
    if (c.definite === !0 && r === void 0)
      return !1;
  }
  return E2(a, l, r);
});
function E2(a, l, r) {
  const c = r ? { ...r, async: !1, abortEarly: !0 } : { async: !1, abortEarly: !0 }, f = a._zod.bag.fallbackRun;
  let h;
  if (f ? (c[O2] = !0, h = f({ value: l, issues: [] }, c)) : h = a._zod.run({ value: l, issues: [] }, c), h instanceof Promise)
    throw new mi();
  return h.issues.length === 0;
}
const T2 = async (a, l, r) => {
  const c = r ? { ...r, async: !0, abortEarly: !0 } : { async: !0, abortEarly: !0 };
  let f = a._zod.run({ value: l, issues: [] }, c);
  return f instanceof Promise && (f = await f), f.issues.length === 0;
}, N2 = (a) => {
  const l = Lf(a), r = (c, f, h, m) => {
    const v = h ? { ...h, direction: "backward" } : { direction: "backward" };
    return l(c, f, v, Or(r, m));
  };
  return r;
}, C2 = (a) => {
  const l = Lf(a), r = (c, f, h, m) => l(c, f, h, Or(r, m));
  return r;
}, A2 = (a) => {
  const l = Qf(a), r = async (c, f, h, m) => {
    const v = h ? { ...h, direction: "backward" } : { direction: "backward" };
    return await l(c, f, v, Or(r, m));
  };
  return r;
}, R2 = (a) => {
  const l = Qf(a), r = async (c, f, h, m) => await l(c, f, h, Or(r, m));
  return r;
}, w2 = (a) => (l, r, c) => {
  const f = c ? { ...c, direction: "backward" } : { direction: "backward" };
  return Yf(a)(l, r, f);
}, M2 = (a) => (l, r, c) => Yf(a)(l, r, c), D2 = (a) => async (l, r, c) => {
  const f = c ? { ...c, direction: "backward" } : { direction: "backward" };
  return $f(a)(l, r, f);
}, U2 = (a) => async (l, r, c) => $f(a)(l, r, c), Z2 = /^[cC][0-9a-z]{6,}$/, q2 = /^[0-9a-z]+$/, k2 = /^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/, H2 = /^[0-9a-vA-V]{20}$/, B2 = /^[A-Za-z0-9]{27}$/, L2 = /^[a-zA-Z0-9_-]{21}$/;
function Q2(a) {
  return new RegExp(`^[a-zA-Z0-9_-]{${a}}$`);
}
const Y2 = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/, $2 = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/, Gp = (a) => a ? new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${a}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`) : /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/, G2 = /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/, V2 = "^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";
function X2() {
  return new RegExp(V2, "u");
}
const K2 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, J2 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/, I2 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/, F2 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, P2 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/, W2 = /^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/, ex = /^https?$/, tx = /^\+[1-9]\d{6,14}$/, Jy = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function nx(a) {
  return new RegExp(`^${a}$`);
}
const ax = /* @__PURE__ */ nx(Jy);
function Of(a) {
  const l = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof a.precision == "number" ? a.precision === -1 ? `${l}` : a.precision === 0 ? `${l}:[0-5]\\d` : `${l}:[0-5]\\d\\.\\d{${a.precision}}` : a.seconds ? `${l}:[0-5]\\d(?:\\.\\d+)?` : `${l}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ix(a) {
  return new RegExp(`^${Of(a)}$`);
}
function lx(a) {
  const l = ["Z"];
  a.offset && l.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${Of({ precision: a.precision, seconds: !0 })}(?:${l.join("|")})`, c = a.local ? `${r}|${Of({ precision: a.precision })}` : r;
  return new RegExp(`^${Jy}T(?:${c})$`);
}
const ux = /^[\s\S]{0,}$/, sx = /^-?\d+(?:\.\d+)?$/, rx = /^[^A-Z]*$/, cx = /^[^a-z]*$/, Yt = /* @__PURE__ */ B("$ZodCheck", (a, l) => {
  var r;
  a._zod ?? (a._zod = {}), a._zod.def = l, (r = a._zod).onattach ?? (r.onattach = []);
}), Gf = (a) => {
  const l = a.value;
  return !YS(l) && l.length !== void 0;
}, vr = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, Iy = /* @__PURE__ */ B("$ZodCheckLessThan", (a, l) => {
  Yt.init(a, l);
  const r = vr[typeof l.value];
  a._zod.check = (c) => {
    (l.inclusive ? c.value <= l.value : c.value < l.value) || c.issues.push({
      origin: vr[typeof c.value] ?? r,
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
  const r = vr[typeof l.value];
  a._zod.check = (c) => {
    (l.inclusive ? c.value >= l.value : c.value > l.value) || c.issues.push({
      origin: vr[typeof c.value] ?? r,
      code: "too_small",
      minimum: typeof l.value == "object" ? l.value.getTime() : l.value,
      input: c.value,
      inclusive: l.inclusive,
      inst: a,
      continue: !l.abort
    });
  };
}), ox = /* @__PURE__ */ B("$ZodCheckMultipleOf", (a, l) => {
  Yt.init(a, l), a._zod.check = (r) => {
    if (typeof r.value != typeof l.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof r.value == "bigint" ? (
      // `value % 0n` throws, and nothing is a multiple of zero — the number branch already fails this way via NaN
      l.value !== BigInt(0) && r.value % l.value === BigInt(0)
    ) : $S(r.value, l.value) === 0) || r.issues.push({
      origin: typeof r.value,
      code: "not_multiple_of",
      divisor: l.value,
      input: r.value,
      inst: a,
      continue: !l.abort
    });
  };
}), fx = /* @__PURE__ */ B("$ZodCheckNumberFormat", (a, l) => {
  Yt.init(a, l), l.format = l.format || "float64";
  const r = l.format?.includes("int"), c = r ? "int" : "number", [f, h] = Qy[l.format];
  a._zod.check = (m) => {
    const v = m.value;
    if (r) {
      if (!Number.isInteger(v)) {
        m.issues.push({
          expected: c,
          format: l.format,
          code: "invalid_type",
          continue: !1,
          input: v,
          inst: a
        });
        return;
      }
      if (!Number.isSafeInteger(v)) {
        v > 0 ? m.issues.push({
          input: v,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: a,
          origin: c,
          inclusive: !0,
          continue: !l.abort
        }) : m.issues.push({
          input: v,
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
    v < f && m.issues.push({
      origin: "number",
      input: v,
      code: "too_small",
      minimum: f,
      inclusive: !0,
      inst: a,
      continue: !l.abort
    }), v > h && m.issues.push({
      origin: "number",
      input: v,
      code: "too_big",
      maximum: h,
      inclusive: !0,
      inst: a,
      continue: !l.abort
    });
  };
}), dx = /* @__PURE__ */ B("$ZodCheckMaxLength", (a, l) => {
  var r;
  Yt.init(a, l), (r = a._zod.def).when ?? (r.when = Gf), a._zod.check = (c) => {
    const f = c.value, h = f.length;
    if ((typeof f == "string" && h > l.maximum ? Hf(f) : h) <= l.maximum)
      return;
    const v = Bf(f);
    c.issues.push({
      origin: v,
      code: "too_big",
      maximum: l.maximum,
      inclusive: !0,
      input: f,
      inst: a,
      continue: !l.abort
    });
  };
}), hx = /* @__PURE__ */ B("$ZodCheckMinLength", (a, l) => {
  var r;
  Yt.init(a, l), (r = a._zod.def).when ?? (r.when = Gf), a._zod.check = (c) => {
    const f = c.value, h = f.length;
    if ((typeof f == "string" && h >= l.minimum && h < l.minimum * 2 ? Hf(f) : h) >= l.minimum)
      return;
    const v = Bf(f);
    c.issues.push({
      origin: v,
      code: "too_small",
      minimum: l.minimum,
      inclusive: !0,
      input: f,
      inst: a,
      continue: !l.abort
    });
  };
}), mx = /* @__PURE__ */ B("$ZodCheckLengthEquals", (a, l) => {
  var r;
  Yt.init(a, l), (r = a._zod.def).when ?? (r.when = Gf), a._zod.check = (c) => {
    const f = c.value, h = f.length, m = typeof f == "string" && h >= l.length && h <= l.length * 2 ? Hf(f) : h;
    if (m === l.length)
      return;
    const v = Bf(f), y = m > l.length;
    c.issues.push({
      origin: v,
      ...y ? { code: "too_big", maximum: l.length } : { code: "too_small", minimum: l.length },
      inclusive: !0,
      exact: !0,
      input: c.value,
      inst: a,
      continue: !l.abort
    });
  };
}), zr = /* @__PURE__ */ B("$ZodCheckStringFormat", (a, l) => {
  var r, c;
  Yt.init(a, l), l.pattern ? (r = a._zod).check ?? (r.check = (f) => {
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
}), vx = /* @__PURE__ */ B("$ZodCheckRegex", (a, l) => {
  zr.init(a, l), a._zod.check = (r) => {
    l.pattern.lastIndex = 0, !l.pattern.test(r.value) && r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: r.value,
      pattern: l.pattern.toString(),
      inst: a,
      continue: !l.abort
    });
  };
}), px = /* @__PURE__ */ B("$ZodCheckLowerCase", (a, l) => {
  l.pattern ?? (l.pattern = rx), zr.init(a, l);
}), yx = /* @__PURE__ */ B("$ZodCheckUpperCase", (a, l) => {
  l.pattern ?? (l.pattern = cx), zr.init(a, l);
}), gx = /* @__PURE__ */ B("$ZodCheckIncludes", (a, l) => {
  Yt.init(a, l);
  const r = xr(l.includes), c = new RegExp(typeof l.position == "number" ? `^.{${l.position},}${r}` : r);
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
}), bx = /* @__PURE__ */ B("$ZodCheckStartsWith", (a, l) => {
  Yt.init(a, l);
  const r = new RegExp(`^${xr(l.prefix)}.*`);
  l.pattern ?? (l.pattern = r), a._zod.check = (c) => {
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
}), _x = /* @__PURE__ */ B("$ZodCheckEndsWith", (a, l) => {
  Yt.init(a, l);
  const r = new RegExp(`.*${xr(l.suffix)}$`);
  l.pattern ?? (l.pattern = r), a._zod.check = (c) => {
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
}), Sx = /* @__PURE__ */ B("$ZodCheckOverwrite", (a, l) => {
  Yt.init(a, l), a._zod.check = (r) => {
    r.value = l.tx(r.value);
  };
});
class xx {
  constructor(l = [], r = {}) {
    this.content = [], this.indent = 0, this.args = l, this.closed = r;
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
    const l = Function, r = this?.content ?? [""];
    return new l(...Object.keys(this.closed), `return function (${this.args.join(", ")}) {
${r.join(`
`)}
};`)(...Object.values(this.closed));
  }
}
const jx = {
  major: 4,
  minor: 6,
  patch: 6
}, lt = /* @__PURE__ */ B("$ZodType", (a, l) => {
  var r;
  a ?? (a = {}), a._zod.def = l, a._zod.bag = a._zod.bag || {}, a._zod.version = jx;
  const c = a._zod.def.checks, f = a._zod.traits.has("$ZodCheck") ? [a, ...c ?? []] : c?.length ? [...c] : [];
  for (const h of f)
    for (const m of h._zod.onattach)
      m(a);
  if (f.length === 0)
    (r = a._zod).deferred ?? (r.deferred = []), a._zod.deferred?.push(() => {
      a._zod.run = a._zod.parse;
    });
  else {
    const h = (v, y, b) => {
      if (v.memo)
        return v;
      let S = ia(v), g;
      for (const O of y) {
        if (O._zod.def.when) {
          if (i2(v) || !O._zod.def.when(v))
            continue;
        } else if (S)
          continue;
        const U = v.issues.length, M = O._zod.check(v);
        if (M instanceof Promise && b?.async === !1)
          throw new mi();
        if (g || M instanceof Promise)
          g = (g ?? Promise.resolve()).then(async () => {
            await M, v.issues.length !== U && (jf(v.issues, U, a), S || (S = ia(v, U)));
          });
        else {
          if (v.issues.length === U)
            continue;
          jf(v.issues, U, a), S || (S = ia(v, U));
        }
      }
      return g ? g.then(() => v) : v;
    }, m = (v, y, b) => {
      if (ia(v))
        return v.aborted = !0, v;
      const S = h(y, f, b);
      if (S instanceof Promise) {
        if (b.async === !1)
          throw new mi();
        return S.then((g) => a._zod.parse(g, b));
      }
      return a._zod.parse(S, b);
    };
    a._zod.run = (v, y) => {
      if (y.skipChecks)
        return a._zod.parse(v, y);
      if (y.direction === "backward") {
        const S = a._zod.parse({ value: v.value, issues: [] }, { ...y, skipChecks: !0 });
        return S instanceof Promise ? S.then((g) => m(g, v, y)) : m(S, v, y);
      }
      const b = a._zod.parse(v, y);
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
    qa(this, "~standard", a);
  }
}), Py = (a, l) => a.issues.length ? { issues: a.issues.map((r) => gl(r, l, Ha())) } : { value: a.value };
async function Ox(a, l) {
  const r = { async: !0 };
  return Py(await a._zod.run({ value: l, issues: [] }, r), r);
}
function Wy(a) {
  return {
    validate: (l) => {
      const r = { async: !1 };
      try {
        const c = a._zod.run({ value: l, issues: [] }, r);
        if (!(c instanceof Promise))
          return Py(c, r);
      } catch {
      }
      return Ox(a, l);
    },
    vendor: "zod",
    version: 1
  };
}
const Vf = /* @__PURE__ */ B("$ZodString", (a, l) => {
  lt.init(a, l), a._zod.pattern = l.pattern ?? ux, a._zod.parse = (r, c) => {
    if (l.coerce)
      try {
        r.value = String(r.value);
      } catch {
      }
    return typeof r.value == "string" || r.issues.push({
      expected: "string",
      code: "invalid_type",
      input: r.value,
      inst: a
    }), r;
  };
}), Ye = /* @__PURE__ */ B("$ZodStringFormat", (a, l) => {
  zr.init(a, l), Vf.init(a, l);
}), zx = /* @__PURE__ */ B("$ZodGUID", (a, l) => {
  l.pattern ?? (l.pattern = $2), Ye.init(a, l);
}), Ex = /* @__PURE__ */ B("$ZodUUID", (a, l) => {
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
    l.pattern ?? (l.pattern = Gp(c));
  } else
    l.pattern ?? (l.pattern = Gp());
  Ye.init(a, l);
}), Tx = /* @__PURE__ */ B("$ZodEmail", (a, l) => {
  l.pattern ?? (l.pattern = G2), Ye.init(a, l);
}), eg = 1, pr = 2;
function tg(a) {
  try {
    return typeof URL < "u" && typeof URL.canParse == "function" ? URL.canParse(a) : (new URL(a), !0);
  } catch {
    return !1;
  }
}
function Nx(a, l) {
  return !("normalize" in l) && !("hostname" in l) && !("protocol" in l) ? tg(a) || pr : Cx(a, l);
}
function Cx(a, l) {
  if (!l.normalize && l.protocol?.source === ex.source && !/^https?:\/\//i.test(a))
    return eg;
  try {
    if (typeof URL < "u") {
      const r = URL;
      if (typeof r.parse == "function")
        return r.parse(a) ?? pr;
    }
    return new URL(a);
  } catch {
    return pr;
  }
}
const Ax = /[\t\n\r]/g;
function Vp(a) {
  return a.replace(Ax, "");
}
function Rx(a, l) {
  return l.lastIndex = 0, l.test(a.hostname);
}
function wx(a, l) {
  return l.lastIndex = 0, l.test(a.protocol.endsWith(":") ? a.protocol.slice(0, -1) : a.protocol);
}
const Mx = /* @__PURE__ */ B("$ZodURL", (a, l) => {
  Ye.init(a, l), a._zod.check = (r) => {
    try {
      const c = r.value.trim(), f = Nx(c, l);
      if (f === eg) {
        r.issues.push({
          code: "invalid_format",
          format: "url",
          note: "Invalid URL format",
          input: r.value,
          inst: a,
          continue: !l.abort
        });
        return;
      }
      if (f === pr) {
        r.issues.push({
          code: "invalid_format",
          format: "url",
          input: r.value,
          inst: a,
          continue: !l.abort
        });
        return;
      }
      if (f === !0) {
        r.value = Vp(c);
        return;
      }
      l.hostname && !Rx(f, l.hostname) && r.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid hostname",
        pattern: l.hostname.source,
        input: r.value,
        inst: a,
        continue: !l.abort
      }), l.protocol && !wx(f, l.protocol) && r.issues.push({
        code: "invalid_format",
        format: "url",
        note: "Invalid protocol",
        pattern: l.protocol.source,
        input: r.value,
        inst: a,
        continue: !l.abort
      }), r.value = l.normalize ? f.href : Vp(c);
      return;
    } catch {
      r.issues.push({
        code: "invalid_format",
        format: "url",
        input: r.value,
        inst: a,
        continue: !l.abort
      });
    }
  };
}), Dx = /* @__PURE__ */ B("$ZodEmoji", (a, l) => {
  l.pattern ?? (l.pattern = X2()), Ye.init(a, l);
}), Ux = /* @__PURE__ */ B("$ZodNanoID", (a, l) => {
  if (l.length !== void 0 && (!Number.isInteger(l.length) || l.length < 1))
    throw new Error(`Invalid nanoid length: ${l.length}`);
  l.pattern ?? (l.pattern = l.length === void 0 ? L2 : Q2(l.length)), Ye.init(a, l);
}), Zx = /* @__PURE__ */ B("$ZodCUID", (a, l) => {
  l.pattern ?? (l.pattern = Z2), Ye.init(a, l);
}), qx = /* @__PURE__ */ B("$ZodCUID2", (a, l) => {
  l.pattern ?? (l.pattern = q2), Ye.init(a, l);
}), kx = /* @__PURE__ */ B("$ZodULID", (a, l) => {
  l.pattern ?? (l.pattern = k2), Ye.init(a, l);
}), Hx = /* @__PURE__ */ B("$ZodXID", (a, l) => {
  l.pattern ?? (l.pattern = H2), Ye.init(a, l);
}), Bx = /* @__PURE__ */ B("$ZodKSUID", (a, l) => {
  l.pattern ?? (l.pattern = B2), Ye.init(a, l);
}), Lx = /* @__PURE__ */ B("$ZodISODateTime", (a, l) => {
  l.pattern ?? (l.pattern = lx(l)), Ye.init(a, l);
}), Qx = /* @__PURE__ */ B("$ZodISODate", (a, l) => {
  l.pattern ?? (l.pattern = ax), Ye.init(a, l);
}), Yx = /* @__PURE__ */ B("$ZodISOTime", (a, l) => {
  l.pattern ?? (l.pattern = ix(l)), Ye.init(a, l);
}), $x = /* @__PURE__ */ B("$ZodISODuration", (a, l) => {
  l.pattern ?? (l.pattern = Y2), Ye.init(a, l);
}), Gx = /* @__PURE__ */ B("$ZodIPv4", (a, l) => {
  l.pattern ?? (l.pattern = K2), Ye.init(a, l);
}), Vx = /^[0-9a-fA-F:.]+$/;
function ng(a) {
  return Vx.test(a) ? tg(`http://[${a}]`) : !1;
}
const Xx = /* @__PURE__ */ B("$ZodIPv6", (a, l) => {
  l.pattern ?? (l.pattern = J2), Ye.init(a, l), a._zod.check = (r) => {
    ng(r.value) || r.issues.push({
      code: "invalid_format",
      format: "ipv6",
      input: r.value,
      inst: a,
      continue: !l.abort
    });
  };
}), Kx = /* @__PURE__ */ B("$ZodCIDRv4", (a, l) => {
  l.pattern ?? (l.pattern = I2), Ye.init(a, l);
});
function Jx(a) {
  const l = a.split("/");
  if (l.length !== 2)
    return !1;
  const [r, c] = l;
  if (!c)
    return !1;
  const f = Number(c);
  return `${f}` !== c || f < 0 || f > 128 ? !1 : ng(r);
}
const Ix = /* @__PURE__ */ B("$ZodCIDRv6", (a, l) => {
  l.pattern ?? (l.pattern = F2), Ye.init(a, l), a._zod.check = (r) => {
    Jx(r.value) || r.issues.push({
      code: "invalid_format",
      format: "cidrv6",
      input: r.value,
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
const ig = /^[0-9a-zA-Z+/]*={0,2}$/, Fx = /* @__PURE__ */ B("$ZodBase64", (a, l) => {
  l.pattern ?? (l.pattern = ig), Ye.init(a, l), a._zod.check = (r) => {
    ag(r.value) || r.issues.push({
      code: "invalid_format",
      format: "base64",
      input: r.value,
      inst: a,
      continue: !l.abort
    });
  };
}), Xf = /^[A-Za-z0-9_-]*$/;
function Px(a) {
  if (!Xf.test(a))
    return !1;
  const l = a.replace(/[-_]/g, (c) => c === "-" ? "+" : "/"), r = l.padEnd(Math.ceil(l.length / 4) * 4, "=");
  return ag(r);
}
const Wx = /* @__PURE__ */ B("$ZodBase64URL", (a, l) => {
  l.pattern ?? (l.pattern = Xf), Ye.init(a, l), a._zod.check = (r) => {
    Px(r.value) || r.issues.push({
      code: "invalid_format",
      format: "base64url",
      input: r.value,
      inst: a,
      continue: !l.abort
    });
  };
}), ej = /* @__PURE__ */ B("$ZodE164", (a, l) => {
  l.pattern ?? (l.pattern = tx), Ye.init(a, l);
});
function tj(a, l = null) {
  try {
    const r = a.split(".");
    if (r.length !== 3)
      return !1;
    const [c] = r;
    if (!c)
      return !1;
    const f = JSON.parse(atob(c));
    return !("typ" in f && f?.typ !== "JWT" || !f.alg || l && (!("alg" in f) || f.alg !== l));
  } catch {
    return !1;
  }
}
const nj = /* @__PURE__ */ B("$ZodJWT", (a, l) => {
  Ye.init(a, l), a._zod.check = (r) => {
    tj(r.value, l.alg) || r.issues.push({
      code: "invalid_format",
      format: "jwt",
      input: r.value,
      inst: a,
      continue: !l.abort
    });
  };
}), lg = /* @__PURE__ */ B("$ZodNumber", (a, l) => {
  lt.init(a, l), a._zod.pattern = sx, a._zod.parse = (r, c) => {
    if (l.coerce)
      try {
        r.value = Number(r.value);
      } catch {
      }
    const f = r.value;
    if (typeof f == "number" && !Number.isNaN(f) && Number.isFinite(f))
      return r;
    const h = typeof f == "number" ? Number.isNaN(f) ? "NaN" : Number.isFinite(f) ? void 0 : String(f) : void 0;
    return r.issues.push({
      expected: "number",
      code: "invalid_type",
      input: f,
      inst: a,
      ...h ? { received: h } : {}
    }), r;
  };
}), aj = /* @__PURE__ */ B("$ZodNumberFormat", (a, l) => {
  fx.init(a, l), lg.init(a, l);
}), ij = /* @__PURE__ */ B("$ZodUnknown", (a, l) => {
  lt.init(a, l), a._zod.parse = (r) => r;
}), lj = /* @__PURE__ */ B("$ZodNever", (a, l) => {
  lt.init(a, l), a._zod.parse = (r, c) => (r.issues.push({
    expected: "never",
    code: "invalid_type",
    input: r.value,
    inst: a
  }), r);
});
function uj(a, l) {
  const r = Lp(a._zod.def.checks);
  if (!r.length)
    return;
  const c = Math.min(...r.map((h) => h[0])), f = a._zod.parse;
  a._zod.parse = (h, m) => {
    const v = l(h.value);
    if (v > c && !m?.skipChecks && m?.direction !== "backward") {
      for (const [y, b] of Lp(a._zod.def.checks))
        if (v > y && b._zod.def.when(h)) {
          const S = h.issues.length;
          return b._zod.check(h), h.issues[S].continue = !1, jf(h.issues, S, a), h;
        }
    }
    return f(h, m);
  };
}
const sj = (a) => Array.isArray(a) ? a.length : -1;
function Xp(a, l, r) {
  a.issues.length && l.issues.push(...$y(r, a.issues)), l.value[r] = a.value;
}
const rj = /* @__PURE__ */ B("$ZodArray", (a, l) => {
  lt.init(a, l);
  const r = Bn.memoizer;
  r?.attach(a), a._zod.parse = (c, f) => {
    const h = c.value;
    if (!Array.isArray(h))
      return c.issues.push({
        expected: "array",
        code: "invalid_type",
        input: h,
        inst: a
      }), c;
    c.value = r ? r.alloc(a, c, Array(h.length), f) : Array(h.length);
    const m = [], v = f?.abortEarly;
    for (let y = 0; y < h.length; y++) {
      const b = h[y], S = l.element._zod.run({
        value: b,
        issues: []
      }, f);
      if (S instanceof Promise)
        m.push(S.then((g) => Xp(g, c, y)));
      else if (Xp(S, c, y), v && S.issues.length !== 0 && ia(S))
        break;
    }
    return m.length ? Promise.all(m).then(() => c) : c;
  }, uj(a, sj);
});
function yr(a, l, r, c, f, h) {
  const m = r in c, v = h === "optional";
  if (!(!m && v && f === "optional")) {
    if (a.issues.length) {
      if (f !== void 0 && v && !m)
        return;
      l.issues.push(...$y(r, a.issues));
    }
    if (!m && f === void 0) {
      a.issues.length || l.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: void 0,
        path: [r]
      });
      return;
    }
    a.value === void 0 ? (m || f === "defaulted" && !v) && (l.value[r] = void 0) : l.value[r] = a.value;
  }
}
const cj = [];
function ug(a) {
  const l = Object.keys(a.shape), r = Object.getOwnPropertySymbols(a.shape), c = r.length ? r : cj, f = c.length ? [...l, ...c] : l;
  for (const m of f)
    if (!a.shape?.[m]?._zod?.traits?.has("$ZodType"))
      throw new Error(`Invalid element at key "${String(m)}": expected a Zod schema`);
  const h = IS(a.shape);
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
function sg(a, l, r, c, f, h, m) {
  const v = [], y = f.keySet, b = f.catchall._zod, S = b.def.type, g = b.optin, O = b.optout;
  let U = 0;
  for (const M in l) {
    if (m && r.issues.length !== U) {
      if (ia(r, U))
        break;
      U = r.issues.length;
    }
    if (y.has(M))
      continue;
    if (M === "__proto__") {
      S === "never" && v.push(M);
      continue;
    }
    if (S === "never") {
      v.push(M);
      continue;
    }
    const N = b.run({ value: l[M], issues: [] }, c);
    N instanceof Promise ? a.push(N.then((A) => yr(A, r, M, l, g, O))) : yr(N, r, M, l, g, O);
  }
  return v.length && r.issues.push({
    code: "unrecognized_keys",
    keys: v,
    input: l,
    inst: h,
    // Describes the shape of the input, not the validity of the parsed value, so it never aborts. The parse still fails; the schema's own checks just get to run first, and an enclosing intersection can reconcile the key against a sibling operand.
    continue: !0
  }), a.length ? Promise.all(a).then(() => r) : r;
}
const oj = /* @__PURE__ */ B("$ZodObject", (a, l) => {
  lt.init(a, l);
  const r = Object.getOwnPropertyDescriptor(l, "shape"), c = r?.get ? r.get.raw : l.shape ?? {};
  if (c) {
    const b = () => {
      const S = { ...c };
      return Object.defineProperty(l, "shape", { value: S }), b.raw = S, S;
    };
    b.raw = c, Object.defineProperty(l, "shape", { get: b });
  }
  const f = qf(() => ug(l));
  Me(a, "propValues", (b) => {
    const S = b.def.shape, g = {};
    for (const O in S) {
      const U = S[O]._zod;
      if (U.values) {
        Object.prototype.hasOwnProperty.call(g, O) || pi(g, O, /* @__PURE__ */ new Set());
        for (const M of U.values)
          g[O].add(M);
        U.optin !== void 0 && g[O].add(void 0);
      }
    }
    return g;
  });
  const h = mr, m = l.catchall;
  let v;
  const y = Bn.memoizer;
  y?.attach(a), a._zod.parse = (b, S) => {
    v ?? (v = f.value);
    const g = b.value;
    if (!h(g))
      return b.issues.push({
        expected: "object",
        code: "invalid_type",
        input: g,
        inst: a
      }), b;
    b.value = y ? y.alloc(a, b, {}, S) : {};
    const O = [], U = v.shape, M = S?.abortEarly;
    let N = b.issues.length;
    for (const A of v.allKeys) {
      if (M && b.issues.length !== N) {
        if (ia(b, N))
          break;
        N = b.issues.length;
      }
      if (A === "__proto__")
        continue;
      const w = U[A], L = w._zod.optin, ue = w._zod.optout, me = w._zod.run({ value: g[A], issues: [] }, S);
      me instanceof Promise ? O.push(me.then(($) => yr($, b, A, g, L, ue))) : yr(me, b, A, g, L, ue);
    }
    return m ? sg(O, g, b, S, f.value, a, M === !0) : O.length ? Promise.all(O).then(() => b) : b;
  };
}), fj = /* @__PURE__ */ B("$ZodObjectJIT", (a, l) => {
  oj.init(a, l);
  const r = a._zod.parse, c = qf(() => ug(l)), f = Bn.memoizer, h = (U) => {
    const M = c.value, N = M.symbolKeys, A = new xx(["payload", "ctx"], { shape: U, inst: a, memo: f, syms: N }), w = ($) => `shape[${$}]._zod.run({ value: input[${$}], issues: [] }, ctx)`, L = ($, I) => `
          let ${$}_ab = false;
          for (let i = 0; i < ${$}.issues.length; i++) {
            const iss = ${$}.issues[i];
            iss.path = iss.path ? [${I}, ...iss.path] : [${I}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${$}_ab = true;
          }
          if (${$}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;
    A.write("const input = payload.value;");
    const ue = /* @__PURE__ */ Object.create(null);
    let me = 0;
    for (const $ of M.allKeys)
      ue[$] = `key_${me++}`;
    A.write(f ? "const newResult = memo.alloc(inst, payload, {}, ctx);" : "const newResult = {};");
    for (const $ of M.allKeys) {
      if ($ === "__proto__")
        continue;
      const I = ue[$], W = typeof $ == "symbol" ? `syms[${N.indexOf($)}]` : VS($), oe = `${W} in input`, et = U[$], Be = et?._zod?.optin, Je = Be !== void 0, Pe = et?._zod?.optout === "optional";
      if (A.write(`const ${I} = ${w(W)};`), Je && Pe) {
        const Rt = Be === "optional" ? `${I}_present` : `${I}.value !== undefined || ${I}_present`;
        A.write(`
        const ${I}_present = ${oe};
        if (!${I}.issues.length || ${I}_present) {
          if (${I}.issues.length) {${L(I, W)}
          }

          if (${Rt}) {
            newResult[${W}] = ${I}.value;
          }
        }

      `);
      } else Je ? (A.write(`
        if (${I}.issues.length) {${L(I, W)}
        }
      `), Be === "defaulted" ? A.write(`newResult[${W}] = ${I}.value;`) : A.write(`
        if (${I}.value !== undefined || ${oe}) {
          newResult[${W}] = ${I}.value;
        }
      `)) : A.write(`
        const ${I}_present = ${oe};
        if (${I}.issues.length) {${L(I, W)}
        }
        if (!${I}_present && !${I}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${W}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${I}_present) {
          newResult[${W}] = ${I}.value;
        }

      `);
    }
    return A.write("payload.value = newResult;"), A.write("return payload;"), A.compile();
  };
  let m;
  const v = mr, y = !Bn.jitless, S = y && KS.value, g = l.catchall;
  let O;
  a._zod.parse = (U, M) => {
    O ?? (O = c.value);
    const N = U.value;
    return v(N) ? y && S && M?.async === !1 && M.jitless !== !0 ? (m || (m = h(l.shape)), U = m(U, M), g ? sg([], N, U, M, O, a, M?.abortEarly === !0) : U) : r(U, M) : (U.issues.push({
      expected: "object",
      code: "invalid_type",
      input: N,
      inst: a
    }), U);
  };
});
function Kp(a, l, r, c) {
  for (const h of a)
    if (h.issues.length === 0)
      return l.value = h.value, l;
  const f = a.filter((h) => !ia(h));
  return f.length === 1 ? (l.value = f[0].value, f[0]) : (l.issues.push({
    code: "invalid_union",
    input: l.value,
    inst: r,
    errors: a.map((h) => h.issues.map((m) => gl(m, c, Ha())))
  }), l);
}
const dj = /* @__PURE__ */ B("$ZodUnion", (a, l) => {
  lt.init(a, l), Me(a, "optin", (c) => c.def.options.some((f) => f._zod.optin === "defaulted") ? "defaulted" : c.def.options.some((f) => f._zod.optin !== void 0) ? "optional" : void 0), Me(a, "optout", (c) => c.def.options.some((f) => f._zod.optout === "optional") ? "optional" : void 0), Me(a, "values", (c) => {
    if (c.def.options.every((f) => f._zod.values))
      return new Set(c.def.options.flatMap((f) => Array.from(f._zod.values)));
  }), Me(a, "pattern", (c) => {
    if (c.def.options.every((f) => f._zod.pattern)) {
      const f = c.def.options.map((h) => h._zod.pattern);
      return new RegExp(`^(${f.map((h) => kf(h.source)).join("|")})$`);
    }
  });
  const r = l.options.length === 1 ? l.options[0]._zod.run : null;
  a._zod.parse = (c, f) => {
    if (r)
      return r(c, f);
    let h = !1;
    const m = [];
    for (const v of l.options) {
      const y = v._zod.run({
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
    return h ? Promise.all(m).then((v) => Kp(v, c, a, f)) : Kp(m, c, a, f);
  };
}), hj = /* @__PURE__ */ B("$ZodIntersection", (a, l) => {
  lt.init(a, l), a._zod.parse = (r, c) => {
    const f = r.value, h = l.left._zod.run({ value: f, issues: [] }, c), m = l.right._zod.run({ value: f, issues: [] }, c);
    return h instanceof Promise || m instanceof Promise ? Promise.all([h, m]).then(([y, b]) => Jp(r, y, b)) : Jp(r, h, m);
  };
});
function zf(a, l) {
  if (a === l)
    return { valid: !0, data: a };
  if (a instanceof Date && l instanceof Date && +a == +l)
    return { valid: !0, data: a };
  if (Eu(a) && Eu(l)) {
    const r = Object.keys(l), c = Object.keys(a).filter((h) => r.indexOf(h) !== -1), f = { ...a, ...l };
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
    const r = [];
    for (let c = 0; c < a.length; c++) {
      const f = a[c], h = l[c], m = zf(f, h);
      if (!m.valid)
        return {
          valid: !1,
          mergeErrorPath: [c, ...m.mergeErrorPath]
        };
      r.push(m.data);
    }
    return { valid: !0, data: r };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function Jp(a, l, r) {
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
  for (const b of r.issues)
    m(b, "r") || a.issues.push(b);
  const v = [...c].filter(([, b]) => b.l && b.r).map(([b]) => b);
  if (v.length) {
    const b = f ? v.filter((S) => f.keys.includes(S)) : [];
    b.length && a.issues.push({ ...f, keys: b });
    for (const S of v)
      !b.includes(S) && h.has(S) && a.issues.push(h.get(S));
  }
  const y = zf(l.value, r.value);
  if (!y.valid) {
    if (ia(a))
      return a;
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(y.mergeErrorPath)}`);
  }
  return a.value = y.data, a;
}
const mj = /* @__PURE__ */ B("$ZodEnum", (a, l) => {
  lt.init(a, l);
  const r = Sf(l.entries), c = new Set(r);
  a._zod.values = c, Me(a, "pattern", (f) => {
    const h = Sf(f.def.entries).filter((m) => JS.has(typeof m));
    return new RegExp(h.length ? `^(${h.map((m) => xr(m.toString())).join("|")})$` : "^[^\\s\\S]$");
  }), a._zod.parse = (f, h) => {
    const m = f.value;
    return c.has(m) || f.issues.push({
      code: "invalid_value",
      values: r,
      input: m,
      inst: a
    }), f;
  };
}), vj = /* @__PURE__ */ B("$ZodTransform", (a, l) => {
  lt.init(a, l), a._zod.optin = "optional", Bn.memoizer?.guard(a), a._zod.parse = (r, c) => {
    if (c.direction === "backward")
      throw new Xy(a.constructor.name);
    const f = l.transform(r.value, r);
    if (c.async)
      return (f instanceof Promise ? f : Promise.resolve(f)).then((m) => (r.value = m, r));
    if (f instanceof Promise)
      throw new mi();
    return r.value = f, r;
  };
});
function Ip(a, l) {
  return a.value = l.issues.length ? void 0 : l.value, a;
}
const rg = /* @__PURE__ */ B("$ZodOptional", (a, l) => {
  lt.init(a, l), Me(a, "optin", (r) => r.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), a._zod.optout = "optional", Me(a, "values", (r) => {
    const c = r.def.innerType._zod.values;
    return c ? /* @__PURE__ */ new Set([...c, void 0]) : void 0;
  }), Me(a, "pattern", (r) => {
    const c = r.def.innerType._zod.pattern;
    return c ? new RegExp(`^(${kf(c.source)})?$`) : void 0;
  }), a._zod.parse = (r, c) => {
    if (r.value === void 0) {
      if (l.innerType._zod.optin !== "defaulted")
        return r;
      const f = l.innerType._zod.run({ value: r.value, issues: [] }, c);
      return f instanceof Promise ? f.then((h) => Ip(r, h)) : Ip(r, f);
    }
    return l.innerType._zod.run(r, c);
  };
}), pj = /* @__PURE__ */ B("$ZodExactOptional", (a, l) => {
  rg.init(a, l), Me(a, "values", (r) => r.def.innerType._zod.values), Me(a, "pattern", (r) => r.def.innerType._zod.pattern), a._zod.parse = (r, c) => l.innerType._zod.run(r, c);
}), yj = /* @__PURE__ */ B("$ZodNullable", (a, l) => {
  lt.init(a, l), Me(a, "optin", (r) => r.def.innerType._zod.optin), Me(a, "optout", (r) => r.def.innerType._zod.optout), Me(a, "pattern", (r) => {
    const c = r.def.innerType._zod.pattern;
    return c ? new RegExp(`^(${kf(c.source)}|null)$`) : void 0;
  }), Me(a, "values", (r) => r.def.innerType._zod.values ? /* @__PURE__ */ new Set([...r.def.innerType._zod.values, null]) : void 0), a._zod.parse = (r, c) => r.value === null ? r : l.innerType._zod.run(r, c);
}), gj = /* @__PURE__ */ B("$ZodDefault", (a, l) => {
  lt.init(a, l), a._zod.optin = "defaulted", Me(a, "values", (r) => r.def.innerType._zod.values), a._zod.parse = (r, c) => {
    if (c.direction === "backward")
      return l.innerType._zod.run(r, c);
    if (r.value === void 0)
      return r.value = l.defaultValue, r;
    const f = l.innerType._zod.run(r, c);
    return f instanceof Promise ? f.then((h) => Fp(h, l)) : Fp(f, l);
  };
});
function Fp(a, l) {
  return a.value === void 0 && (a.value = l.defaultValue), a;
}
const bj = /* @__PURE__ */ B("$ZodPrefault", (a, l) => {
  lt.init(a, l), a._zod.optin = "defaulted", Me(a, "values", (r) => r.def.innerType._zod.values), a._zod.parse = (r, c) => (c.direction === "backward" || r.value === void 0 && (r.value = l.defaultValue), l.innerType._zod.run(r, c));
}), _j = /* @__PURE__ */ B("$ZodNonOptional", (a, l) => {
  lt.init(a, l), Me(a, "values", (r) => {
    const c = r.def.innerType._zod.values;
    return c ? new Set([...c].filter((f) => f !== void 0)) : void 0;
  }), a._zod.parse = (r, c) => {
    const f = l.innerType._zod.run(r, c);
    return f instanceof Promise ? f.then((h) => Pp(h, a)) : Pp(f, a);
  };
});
function Pp(a, l) {
  return !a.issues.length && a.value === void 0 && a.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: a.value,
    inst: l
  }), a;
}
function Wp(a, l, r, c) {
  return l.issues.length ? (a.value = r.catchValue({
    ...l,
    value: a.value,
    error: {
      issues: l.issues.map((f) => gl(f, c, Ha()))
    },
    input: a.value
  }), a) : (a.value = l.value, l.memo && (a.memo = !0), a);
}
const Sj = /* @__PURE__ */ B("$ZodCatch", (a, l) => {
  lt.init(a, l), Me(a, "optin", (r) => r.def.innerType._zod.optin === "defaulted" ? "defaulted" : "optional"), Me(a, "optout", (r) => r.def.innerType._zod.optout), Me(a, "values", (r) => r.def.innerType._zod.values), a._zod.parse = (r, c) => {
    if (c.direction === "backward")
      return l.innerType._zod.run(r, c);
    const f = l.innerType._zod.run({ value: r.value, issues: [] }, c);
    return f instanceof Promise ? f.then((h) => Wp(r, h, l, c)) : Wp(r, f, l, c);
  };
}), xj = /* @__PURE__ */ B("$ZodPipe", (a, l) => {
  lt.init(a, l), Me(a, "values", (r) => r.def.in._zod.values), Me(a, "optin", (r) => r.def.in._zod.optin), Me(a, "optout", (r) => r.def.out._zod.optout), Me(a, "propValues", (r) => r.def.in._zod.propValues), a._zod.parse = (r, c) => {
    if (c.direction === "backward") {
      const h = l.out._zod.run(r, c);
      return h instanceof Promise ? h.then((m) => ir(m, l.in, c)) : ir(h, l.in, c);
    }
    const f = l.in._zod.run(r, c);
    return f instanceof Promise ? f.then((h) => ir(h, l.out, c)) : ir(f, l.out, c);
  };
});
function ir(a, l, r) {
  return a.issues.some((c) => c.code !== "unrecognized_keys") ? (a.aborted = !0, a) : l._zod.run({ value: a.value, issues: a.issues }, r);
}
const jj = /* @__PURE__ */ B("$ZodReadonly", (a, l) => {
  lt.init(a, l), Me(a, "propValues", (r) => r.def.innerType._zod.propValues), Me(a, "values", (r) => r.def.innerType._zod.values), Me(a, "optin", (r) => r.def.innerType?._zod?.optin), Me(a, "optout", (r) => r.def.innerType?._zod?.optout), a._zod.parse = (r, c) => {
    if (c.direction === "backward")
      return l.innerType._zod.run(r, c);
    const f = l.innerType._zod.run(r, c);
    return f instanceof Promise ? f.then(ey) : ey(f);
  };
});
function ey(a) {
  return a.memo || (a.value = Object.freeze(a.value)), a;
}
const Oj = /* @__PURE__ */ B("$ZodCustom", (a, l) => {
  Yt.init(a, l), lt.init(a, l), a._zod.parse = (r, c) => r, a._zod.check = (r) => {
    const c = r.value, f = l.fn(c);
    if (f instanceof Promise)
      return f.then((h) => ty(h, r, c, a));
    ty(f, r, c, a);
  };
});
function ty(a, l, r, c) {
  if (!a) {
    const f = {
      code: "custom",
      input: r,
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
class zj extends Error {
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
function fr(a, l, r) {
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
      const M = Object.getOwnPropertyDescriptor(S, U);
      if (!M.enumerable)
        continue;
      const N = M.get ? or : M.value?._zod ? fr(M.value, l) : gu;
      N > O && (O = N);
    }
    return O;
  }, v = (S) => {
    S > f && (f = S);
  }, y = a._zod.def;
  switch (y.type) {
    case "object": {
      const S = Zy(y);
      v(S ? m(S) : or), h(y.catchall);
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
      v(S ? fr(S, l) : or);
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
  return l.delete(a), Ej(a, f);
}
function Ej(a, l) {
  return l !== or && og.set(a, l === xu), l;
}
function Tj(a, l) {
  let r = a.buckets.get(l);
  return r || (r = /* @__PURE__ */ new WeakMap(), a.buckets.set(l, r)), r;
}
let lr;
const ur = [], Nj = {
  alloc(a, l, r) {
    const c = lr;
    if (!c)
      return r;
    lr = void 0;
    const f = { value: r, issues: null };
    return c.set(l.value, f), ur.push(f), r;
  },
  guard(a) {
    var l;
    (l = a._zod).deferred ?? (l.deferred = []), a._zod.deferred.push(() => {
      const r = a._zod.parse, c = (f, h) => {
        if (h.direction !== "backward" && Aj(h, f.value))
          throw new zj();
        return r(f, h);
      };
      a._zod.parse = c, a._zod.run === r && (a._zod.run = c);
    });
  },
  attach(a) {
    var l;
    let r, c = !1, f, h;
    (l = a._zod).deferred ?? (l.deferred = []), a._zod.deferred.push(() => {
      const m = a._zod.parse, v = (y, b) => {
        if (r === void 0) {
          const w = fr(a, /* @__PURE__ */ new Set());
          if (w === gu)
            return a._zod.parse = m, a._zod.run === v && (a._zod.run = m), m(y, b);
          w === xu || c ? r = !0 : c = !0;
        }
        const S = y.value;
        if (!cg(S))
          return m(y, b);
        let g = b[Ef];
        g || (g = { buckets: /* @__PURE__ */ new WeakMap(), backEdges: void 0 }, b[Ef] = g);
        let O;
        f === b ? O = h : (O = Tj(g, a), f = b, h = O);
        const U = O.get(S);
        if (U)
          return y.value = U.value, U.issues ? U.issues.length && y.issues.push(...df(U.issues)) : (y.memo = !0, g.backEdges ?? (g.backEdges = /* @__PURE__ */ new WeakSet()), g.backEdges.add(U.value)), y;
        lr = O;
        const M = ur.length, N = m(y, b);
        lr = void 0;
        const A = ur.length > M ? ur.pop() : void 0;
        return N instanceof Promise ? N.then((w) => (A && (A.issues = w.issues.length ? df(w.issues) : ny), w)) : (A && (A.issues = N.issues.length ? df(N.issues) : ny), N);
      };
      a._zod.parse = v, a._zod.run === m && (a._zod.run = v);
    });
  }
};
function Cj() {
  return Nj;
}
function Aj(a, l) {
  const r = a[Ef]?.backEdges;
  return r !== void 0 && cg(l) && r.has(l);
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
  const r = {
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
        const m = f(h.expected), v = u2(h.input), y = f(v, h.input);
        return `Invalid input: expected ${m}, received ${y}`;
      }
      case "invalid_value":
        return h.values.length === 1 ? `Invalid input: expected ${Ly(h.values[0])}` : `Invalid option: expected one of ${Hp(h.values, "|")}`;
      case "too_big": {
        const m = h.exact ? "exactly " : h.inclusive ? "<=" : "<", v = l(h.origin);
        return v ? `Too big: expected ${h.origin ?? "value"} to have ${m}${h.maximum.toString()} ${v.unit ?? "elements"}` : `Too big: expected ${h.origin ?? "value"} to be ${m}${h.maximum.toString()}`;
      }
      case "too_small": {
        const m = h.exact ? "exactly " : h.inclusive ? ">=" : ">", v = l(h.origin);
        return v ? `Too small: expected ${h.origin} to have ${m}${h.minimum.toString()} ${v.unit}` : `Too small: expected ${h.origin} to be ${m}${h.minimum.toString()}`;
      }
      case "invalid_format": {
        const m = h;
        return m.format === "starts_with" ? `Invalid string: must start with "${m.prefix}"` : m.format === "ends_with" ? `Invalid string: must end with "${m.suffix}"` : m.format === "includes" ? `Invalid string: must include "${m.includes}"` : m.format === "regex" ? `Invalid string: must match pattern ${m.pattern}` : `Invalid ${r[m.format] ?? h.format}`;
      }
      case "not_multiple_of":
        return `Invalid number: must be a multiple of ${h.divisor}`;
      case "unrecognized_keys":
        return `Unrecognized key${h.keys.length > 1 ? "s" : ""}: ${Hp(h.keys, ", ")}`;
      case "invalid_key":
        return `Invalid key in ${h.origin}`;
      case "invalid_union":
        return h.options && Array.isArray(h.options) && h.options.length > 0 ? `Invalid discriminator value. Expected ${h.options.map((v) => `'${v}'`).join(" | ")}` : h.inclusive === !1 ? "Invalid input: more than one option matched" : "Invalid input";
      case "invalid_element":
        return `Invalid value in ${h.origin}`;
      default:
        return "Invalid input";
    }
  };
};
function wj() {
  return {
    localeError: Rj()
  };
}
var ay;
class Mj {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(l, ...r) {
    const c = r[0];
    return this._map.set(l, c), c && typeof c == "object" && "id" in c && this._idmap.set(c.id, l), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(l) {
    const r = this._map.get(l);
    return r && typeof r == "object" && "id" in r && this._idmap.delete(r.id), this._map.delete(l), this;
  }
  get(l) {
    const r = l._zod.parent;
    if (r) {
      const c = { ...this.get(r) ?? {} };
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
function Dj() {
  return new Mj();
}
(ay = globalThis).__zod_globalRegistry ?? (ay.__zod_globalRegistry = Dj());
const bu = globalThis.__zod_globalRegistry;
function fg(a) {
  return a.checks && (a.checks = [...a.checks]), a;
}
// @__NO_SIDE_EFFECTS__
function Uj(a, l) {
  return new a(fg({ type: "string", ...ae(l) }));
}
// @__NO_SIDE_EFFECTS__
function dg(a, l) {
  return new a({
    type: "string",
    format: "email",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Zj(a, l) {
  return new a({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function hg(a, l) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function qj(a, l) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v4",
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function kj(a, l) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v6",
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Hj(a, l) {
  return new a({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: !1,
    version: "v7",
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Bj(a, l) {
  return new a({
    type: "string",
    format: "url",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Lj(a, l) {
  return new a({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Qj(a, l) {
  return new a({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Yj(a, l) {
  return new a({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function $j(a, l) {
  return new a({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Gj(a, l) {
  return new a({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Vj(a, l) {
  return new a({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Xj(a, l) {
  return new a({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Kj(a, l) {
  return new a({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Jj(a, l) {
  return new a({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Ij(a, l) {
  return new a({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Fj(a, l) {
  return new a({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Pj(a, l) {
  return new a({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function Wj(a, l) {
  return new a({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function eO(a, l) {
  return new a({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function tO(a, l) {
  return new a({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: !1,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function nO(a, l) {
  return new a({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function aO(a, l) {
  return new a({
    type: "string",
    format: "date",
    check: "string_format",
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function iO(a, l) {
  return new a({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function lO(a, l) {
  return new a({
    type: "string",
    format: "duration",
    check: "string_format",
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function uO(a, l) {
  return new a(fg({ type: "number", checks: [], ...ae(l) }));
}
// @__NO_SIDE_EFFECTS__
function sO(a, l) {
  return new a({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function rO(a) {
  return new a({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function cO(a, l) {
  return new a({
    type: "never",
    ...ae(l)
  });
}
// @__NO_SIDE_EFFECTS__
function iy(a, l) {
  return new Iy({
    check: "less_than",
    ...ae(l),
    value: a,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function hf(a, l) {
  return new Iy({
    check: "less_than",
    ...ae(l),
    value: a,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function ly(a, l) {
  return new Fy({
    check: "greater_than",
    ...ae(l),
    value: a,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function mf(a, l) {
  return new Fy({
    check: "greater_than",
    ...ae(l),
    value: a,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function uy(a, l) {
  return new ox({
    check: "multiple_of",
    ...ae(l),
    value: a
  });
}
// @__NO_SIDE_EFFECTS__
function mg(a, l) {
  return new dx({
    check: "max_length",
    ...ae(l),
    maximum: a
  });
}
// @__NO_SIDE_EFFECTS__
function gr(a, l) {
  return new hx({
    check: "min_length",
    ...ae(l),
    minimum: a
  });
}
// @__NO_SIDE_EFFECTS__
function vg(a, l) {
  return new mx({
    check: "length_equals",
    ...ae(l),
    length: a
  });
}
// @__NO_SIDE_EFFECTS__
function oO(a, l) {
  return new vx({
    check: "string_format",
    format: "regex",
    ...ae(l),
    pattern: a
  });
}
// @__NO_SIDE_EFFECTS__
function fO(a) {
  return new px({
    check: "string_format",
    format: "lowercase",
    ...ae(a)
  });
}
// @__NO_SIDE_EFFECTS__
function dO(a) {
  return new yx({
    check: "string_format",
    format: "uppercase",
    ...ae(a)
  });
}
// @__NO_SIDE_EFFECTS__
function hO(a, l) {
  return new gx({
    check: "string_format",
    format: "includes",
    ...ae(l),
    includes: a
  });
}
// @__NO_SIDE_EFFECTS__
function mO(a, l) {
  return new bx({
    check: "string_format",
    format: "starts_with",
    ...ae(l),
    prefix: a
  });
}
// @__NO_SIDE_EFFECTS__
function vO(a, l) {
  return new _x({
    check: "string_format",
    format: "ends_with",
    ...ae(l),
    suffix: a
  });
}
// @__NO_SIDE_EFFECTS__
function bl(a) {
  return new Sx({
    check: "overwrite",
    tx: a
  });
}
// @__NO_SIDE_EFFECTS__
function pO(a) {
  return /* @__PURE__ */ bl((l) => l.normalize(a));
}
// @__NO_SIDE_EFFECTS__
function yO() {
  return /* @__PURE__ */ bl((a) => a.trim());
}
// @__NO_SIDE_EFFECTS__
function gO() {
  return /* @__PURE__ */ bl((a) => a.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function bO() {
  return /* @__PURE__ */ bl((a) => a.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function _O() {
  return /* @__PURE__ */ bl((a) => XS(a));
}
// @__NO_SIDE_EFFECTS__
function SO(a, l, r) {
  return new a({
    type: "array",
    element: l,
    // get element() {
    //   return element;
    // },
    ...ae(r)
  });
}
// @__NO_SIDE_EFFECTS__
function xO(a, l, r) {
  return new a({
    type: "custom",
    check: "custom",
    fn: l,
    ...ae(r)
  });
}
// @__NO_SIDE_EFFECTS__
function jO(a, l) {
  const r = /* @__PURE__ */ OO((c) => (c.addIssue = (f) => {
    if (typeof f == "string")
      c.issues.push(Tu(f, c.value, r._zod.def));
    else {
      const h = f;
      h.fatal && (h.continue = !1), h.code ?? (h.code = "custom"), "input" in h || (h.input = c.value), h.inst ?? (h.inst = r), h.continue ?? (h.continue = !r._zod.def.abort), c.issues.push(Tu(h));
    }
  }, a(c.value, c)), l);
  return r;
}
// @__NO_SIDE_EFFECTS__
function OO(a, l) {
  const r = new Yt({
    check: "custom",
    ...ae(l)
  });
  return r._zod.check = a, r;
}
function ju(a, ...l) {
  for (const r of l)
    for (const c of Reflect.ownKeys(r))
      Object.prototype.propertyIsEnumerable.call(r, c) && pi(a, c, r[c]);
  return a;
}
function pg(a) {
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
function _l(a, l, r, c, f) {
  const h = typeof l.unrepresentable == "function" ? l.unrepresentable({ zodSchema: a, path: c.path, message: f }) : l.unrepresentable;
  if (h === "any")
    return !1;
  if (h === void 0 || h === "throw")
    throw new Error(f);
  return Object.assign(r, h), !0;
}
function jt(a, l, r = { path: [], schemaPath: [] }) {
  var c;
  const f = a._zod.def, h = l.seen.get(a);
  if (h)
    return h.count++, r.schemaPath.includes(a) && (h.cycle = r.path), h.schema;
  const m = { schema: {}, count: 1, cycle: void 0, path: r.path };
  l.seen.set(a, m), l.sharedDefsExtractedFor = void 0, l.sharedEmitDoneFor = void 0;
  const v = a._zod.toJSONSchema?.();
  if (v)
    m.schema = v;
  else {
    const S = {
      ...r,
      schemaPath: [...r.schemaPath, a],
      path: r.path
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
  const r = a.seen.get(l);
  if (!r)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  if (a.external && a.sharedDefsExtractedFor === a.external)
    return;
  const c = /* @__PURE__ */ new Map();
  for (const m of a.seen.entries()) {
    const v = a.metadataRegistry.get(m[0])?.id;
    if (v) {
      const y = c.get(v);
      if (y && y !== m[0])
        throw new Error(`Duplicate schema id "${v}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      c.set(v, m[0]);
    }
  }
  const f = (m) => {
    const v = a.target === "draft-2020-12" ? "$defs" : "definitions";
    if (a.external) {
      const g = a.external.registry.get(m[0])?.id, O = a.external.uri ?? ((M) => M);
      if (g)
        return { ref: O(g) };
      const U = m[1].defId ?? m[1].schema.id ?? `schema${a.counter++}`;
      return m[1].defId = U, { defId: U, ref: `${O("__shared")}#/${v}/${sy(U)}` };
    }
    const y = "#", b = `${y}/${v}/`;
    if (m[1] === r && !m[1].schema.id)
      return { ref: y };
    const S = m[1].schema.id ?? `__schema${a.counter++}`;
    return { defId: S, ref: b + sy(S) };
  }, h = (m) => {
    if (m[1].schema.$ref)
      return;
    const v = m[1], { ref: y, defId: b } = f(m);
    v.def = { ...v.schema }, b && (v.defId = b);
    const S = v.schema;
    for (const g in S)
      delete S[g];
    S.$ref = y;
  };
  if (a.cycles === "throw")
    for (const m of a.seen.entries()) {
      const v = m[1];
      if (v.cycle)
        throw new Error(`Cycle detected: #/${v.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const m of a.seen.entries()) {
    const v = m[1];
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
    if (v.cycle) {
      h(m);
      continue;
    }
    v.count > 1 && a.reused === "ref" && h(m);
  }
  a.external && (a.sharedDefsExtractedFor = a.external);
}
function gg(a) {
  const l = a.anyOf;
  if (!Array.isArray(l) || l.length === 0 || a.type !== void 0)
    return;
  const r = [];
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
      r.includes(m) || r.push(m);
    }
  }
  delete a.anyOf, a.type = r.length === 1 ? r[0] : r;
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
  const r = {}, c = /* @__PURE__ */ new Set();
  for (const h of l) {
    for (const m in h.properties) {
      if (Object.prototype.hasOwnProperty.call(r, m))
        continue;
      const v = [];
      for (const b of l) {
        const S = b.properties?.[m] ?? cy(b);
        S != null && (v.some((g) => JSON.stringify(g) === JSON.stringify(S)) || v.push(S));
      }
      const y = v.length === 1 ? v[0] : Tf(v) ?? { allOf: v };
      pi(r, m, y);
    }
    for (const m of h.required ?? [])
      c.add(m);
  }
  const f = { type: "object", properties: r };
  if (c.size && (f.required = [...c]), l.every((h) => h.additionalProperties === !1))
    f.additionalProperties = !1;
  else {
    const h = [];
    for (const m of l) {
      const v = cy(m);
      v && !h.some((y) => JSON.stringify(y) === JSON.stringify(v)) && h.push(v);
    }
    h.length === 1 ? f.additionalProperties = h[0] : h.length > 1 && (f.additionalProperties = { allOf: h });
  }
  return f;
}
function zO(a) {
  const l = a.allOf;
  if (!Array.isArray(l) || l.length < 2)
    return;
  for (const f of bg)
    if (f in a)
      return;
  const r = l.filter((f) => ry.some((h) => Array.isArray(f[h])));
  let c = null;
  if (!r.length)
    c = Tf(l);
  else {
    const f = r[0], h = ry.find((y) => Array.isArray(f[y]));
    if (Object.keys(f).length !== 1)
      return;
    const m = l.filter((y) => y !== f), v = f[h].map((y) => Tf([...m, y]));
    if (v.some((y) => !y))
      return;
    c = { [h]: v };
  }
  c && (delete a.allOf, ju(a, c));
}
function _g(a, l) {
  const r = a.seen.get(l);
  if (!r)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const c = (v) => {
    const y = a.seen.get(v);
    if (y.ref === null)
      return;
    const b = y.def ?? y.schema, S = { ...b }, g = y.ref;
    if (y.ref = null, g) {
      c(g);
      const U = a.seen.get(g), M = U.schema;
      if (M.$ref && (a.target === "draft-07" || a.target === "draft-04" || a.target === "openapi-3.0") ? (b.allOf = b.allOf ?? [], b.allOf.push(M)) : ju(b, M), ju(b, S), v._zod.parent === g)
        for (const A in b)
          A === "$ref" || A === "allOf" || A in S || delete b[A];
      if (M.$ref && U.def)
        for (const A in b)
          A === "$ref" || A === "allOf" || A in U.def && JSON.stringify(b[A]) === JSON.stringify(U.def[A]) && delete b[A];
    }
    const O = v._zod.parent;
    if (O && O !== g) {
      c(O);
      const U = a.seen.get(O);
      if (U?.schema.$ref && (b.$ref = U.schema.$ref, U.def))
        for (const M in b)
          M === "$ref" || M === "allOf" || M in U.def && JSON.stringify(b[M]) === JSON.stringify(U.def[M]) && delete b[M];
    }
    a.override({
      zodSchema: v,
      jsonSchema: b,
      path: y.path ?? []
    });
  };
  if (!a.external || a.sharedEmitDoneFor !== a.external) {
    for (const v of [...a.seen.entries()].reverse())
      c(v[0]);
    if (a.target !== "openapi-3.0")
      for (const v of a.seen.entries())
        gg(v[1].def ?? v[1].schema);
    for (const v of a.deferred)
      v();
    if (a.intersections.length) {
      const v = /* @__PURE__ */ new Map();
      for (const y of a.seen.values())
        for (const b of [y.schema, y.def]) {
          const S = b?.allOf;
          if (!Array.isArray(S))
            continue;
          const g = v.get(S);
          g ? g.push(b) : v.set(S, [b]);
        }
      for (const y of a.intersections)
        for (const b of v.get(y) ?? [])
          zO(b);
    }
  }
  const f = {};
  if (a.target === "draft-2020-12" ? f.$schema = "https://json-schema.org/draft/2020-12/schema" : a.target === "draft-07" ? f.$schema = "http://json-schema.org/draft-07/schema#" : a.target === "draft-04" ? f.$schema = "http://json-schema.org/draft-04/schema#" : a.target, a.external?.uri) {
    const v = a.external.registry.get(l)?.id;
    if (!v)
      throw new Error("Schema is missing an `id` property");
    f.$id = a.external.uri(v);
  }
  ju(f, r.defId ? r.schema : r.def ?? r.schema);
  const h = a.metadataRegistry.get(l)?.id;
  h !== void 0 && f.id === h && delete f.id;
  const m = a.external?.defs ?? {};
  if (!a.external || a.sharedEmitDoneFor !== a.external)
    for (const v of a.seen.entries()) {
      const y = v[1];
      y.def && y.defId && (y.def.id === y.defId && delete y.def.id, pi(m, y.defId, y.def));
    }
  a.external && (a.sharedEmitDoneFor = a.external), a.external || Object.keys(m).length > 0 && (a.target === "draft-2020-12" ? f.$defs = m : f.definitions = m);
  try {
    const v = JSON.parse(JSON.stringify(f));
    return Object.defineProperty(v, "~standard", {
      value: {
        ...l["~standard"],
        jsonSchema: {
          input: br(l, "input", a.processors),
          output: br(l, "output", a.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), v;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function At(a, l) {
  const r = l ?? { seen: /* @__PURE__ */ new Set() };
  if (r.seen.has(a))
    return !1;
  r.seen.add(a);
  const c = a._zod.def;
  if (c.type === "transform")
    return !0;
  if (c.type === "array")
    return At(c.element, r);
  if (c.type === "set")
    return At(c.valueType, r);
  if (c.type === "lazy")
    return At(c.getter(), r);
  if (c.type === "promise" || c.type === "optional" || c.type === "nonoptional" || c.type === "nullable" || c.type === "readonly" || c.type === "default" || c.type === "prefault" || c.type === "catch")
    return At(c.innerType, r);
  if (c.type === "intersection")
    return At(c.left, r) || At(c.right, r);
  if (c.type === "record" || c.type === "map")
    return At(c.keyType, r) || At(c.valueType, r);
  if (c.type === "pipe")
    return a._zod.traits.has("$ZodCodec") ? !0 : At(c.in, r) || At(c.out, r);
  if (c.type === "object") {
    for (const f in c.shape)
      if (At(c.shape[f], r))
        return !0;
    return !1;
  }
  if (c.type === "union") {
    for (const f of c.options)
      if (At(f, r))
        return !0;
    return !1;
  }
  if (c.type === "tuple") {
    for (const f of c.items)
      if (At(f, r))
        return !0;
    return !!(c.rest && At(c.rest, r));
  }
  return !1;
}
const EO = (a, l = {}) => (r) => {
  const c = pg({ ...r, processors: l });
  return jt(a, c), yg(c, a), _g(c, a);
}, br = (a, l, r = {}) => (c) => {
  const { libraryOptions: f, target: h } = c ?? {}, m = pg({ ...f ?? {}, target: h, io: l, processors: r });
  return jt(a, m), yg(m, a), _g(m, a);
}, pl = (a, l, r) => {
  (a[l] === void 0 || r > a[l]) && (a[l] = r);
}, yl = (a, l, r) => {
  (a[l] === void 0 || r < a[l]) && (a[l] = r);
}, oy = (a, l) => {
  pl(a, "minimum", l), yl(a, "maximum", l);
}, Sg = (a, l) => {
  a.multipleOf ?? (a.multipleOf = []), a.multipleOf.includes(l) || a.multipleOf.push(l);
}, xg = (a, l) => {
  a.patterns ?? (a.patterns = /* @__PURE__ */ new Set()), a.patterns.add(l);
}, jg = (a, l) => {
  a.mime = a.mime ? a.mime.filter((r) => l.includes(r)) : [...l];
}, Og = (a, l) => {
  a.format = l, l.includes("int") && (a.isInt = !0);
}, fy = (a, l) => pl(a, "minimum", l.minimum), dy = (a, l) => yl(a, "maximum", l.maximum), hy = (a) => (l, r) => {
  Og(l, r.format);
  const [c, f] = a[r.format];
  pl(l, "minimum", c), yl(l, "maximum", f);
}, TO = {
  greater_than: (a, l) => pl(a, l.inclusive ? "minimum" : "exclusiveMinimum", l.value),
  less_than: (a, l) => yl(a, l.inclusive ? "maximum" : "exclusiveMaximum", l.value),
  multiple_of: (a, l) => Sg(a, l.value),
  number_format: hy(Qy),
  bigint_format: hy(FS),
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
  const l = {}, r = a._zod.def, c = a._zod.traits.has("$ZodCheck") ? [a, ...r.checks ?? []] : r.checks ?? [];
  for (const h of c)
    TO[h._zod.def.check]?.(l, h._zod.def);
  const f = a._zod.bag;
  f.minimum !== void 0 && pl(l, "minimum", f.minimum), f.exclusiveMinimum !== void 0 && pl(l, "exclusiveMinimum", f.exclusiveMinimum), f.maximum !== void 0 && yl(l, "maximum", f.maximum), f.exclusiveMaximum !== void 0 && yl(l, "exclusiveMaximum", f.exclusiveMaximum), f.multipleOf !== void 0 && Sg(l, f.multipleOf), f.format !== void 0 && (l.format ?? (l.format = f.format), f.format.includes("int") && (l.isInt = !0)), f.mime && jg(l, f.mime);
  for (const h of f.patterns ?? [])
    xg(l, h);
  return l;
}
const NO = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, CO = /* @__PURE__ */ new Map([
  [ig, P2],
  [Xf, W2]
]), AO = (a) => CO.get(a) ?? a, RO = (a, l, r, c) => {
  const f = r;
  f.type = "string";
  const { minimum: h, maximum: m, format: v, patterns: y, contentEncoding: b, laxFormat: S } = Hn(a);
  if (typeof h == "number" && (f.minLength = h), typeof m == "number" && (f.maxLength = m), v && (f.format = NO[v] ?? v, f.format === "" && delete f.format, (v === "time" || S) && delete f.format), b && (f.contentEncoding = b), y && y.size > 0) {
    const g = [...y].map(AO);
    g.length === 1 ? f.pattern = g[0].source : g.length > 1 && (f.allOf = [
      ...g.map((O) => ({
        ...l.target === "draft-07" || l.target === "draft-04" || l.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: O.source
      }))
    ]);
  }
}, wO = (a, l, r, c) => {
  const f = r, { minimum: h, maximum: m, multipleOf: v, exclusiveMaximum: y, exclusiveMinimum: b, isInt: S } = Hn(a);
  f.type = S ? "integer" : "number";
  const g = typeof b == "number" && b >= (h ?? Number.NEGATIVE_INFINITY), O = typeof y == "number" && y <= (m ?? Number.POSITIVE_INFINITY), U = l.target === "draft-04" || l.target === "openapi-3.0";
  if (g ? U ? (f.minimum = b, f.exclusiveMinimum = !0) : f.exclusiveMinimum = b : typeof h == "number" && (f.minimum = h), O ? U ? (f.maximum = y, f.exclusiveMaximum = !0) : f.exclusiveMaximum = y : typeof m == "number" && (f.maximum = m), v) {
    const M = /* @__PURE__ */ new Set();
    for (const w of v)
      Number.isFinite(w) && w !== 0 ? M.add(Math.abs(w)) : _l(a, l, f, c, `A multipleOf divisor of ${w} cannot be represented in JSON Schema`);
    const [N, ...A] = M;
    N !== void 0 && (f.multipleOf = N), A.length && (f.allOf = [...f.allOf ?? [], ...A.map((w) => ({ multipleOf: w }))]);
  }
}, MO = (a, l, r, c) => {
  r.not = {};
}, DO = (a, l, r, c) => {
}, UO = (a, l, r, c) => {
  const f = a._zod.def, h = Sf(f.entries);
  if (h.length === 0) {
    r.not = {};
    return;
  }
  h.every((m) => typeof m == "number") && (r.type = "number"), h.every((m) => typeof m == "string") && (r.type = "string"), r.enum = h;
}, ZO = (a, l, r, c) => {
  _l(a, l, r, c, "Custom types cannot be represented in JSON Schema");
}, qO = (a, l, r, c) => {
  _l(a, l, r, c, "Transforms cannot be represented in JSON Schema");
}, kO = (a, l, r, c) => {
  const f = r, h = a._zod.def, { minimum: m, maximum: v } = Hn(a);
  typeof m == "number" && (f.minItems = m), typeof v == "number" && (f.maxItems = v), f.type = "array", f.items = jt(h.element, l, {
    ...c,
    path: [...c.path, "items"]
  });
};
function Nf(a) {
  const l = a._zod.def;
  return l.type === "pipe" && l.in._zod.traits.has("$ZodTransform") ? Nf(l.out) : l.type === "catch" ? Nf(l.innerType) : a._zod.optin;
}
const HO = (a, l, r, c) => {
  const f = r, h = a._zod.def, m = h.shape;
  if (Object.getOwnPropertySymbols(m).length && _l(a, l, f, c, "Symbol keys cannot be represented in JSON Schema"))
    return;
  f.type = "object", f.properties = {};
  for (const b in m)
    pi(f.properties, b, jt(m[b], l, {
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
}, BO = (a, l, r, c) => {
  const f = a._zod.def, h = f.inclusive === !1, m = f.options.map((v, y) => jt(v, l, {
    ...c,
    path: [...c.path, h ? "oneOf" : "anyOf", y]
  }));
  h ? r.oneOf = m : r.anyOf = m;
}, LO = (a, l, r, c) => {
  const f = a._zod.def, h = jt(f.left, l, {
    ...c,
    path: [...c.path, "allOf", 0]
  }), m = jt(f.right, l, {
    ...c,
    path: [...c.path, "allOf", 1]
  }), v = (b) => "allOf" in b && Object.keys(b).length === 1, y = [
    ...v(h) ? h.allOf : [h],
    ...v(m) ? m.allOf : [m]
  ];
  r.allOf = y, l.intersections.push(y);
}, QO = (a, l, r, c) => {
  const f = a._zod.def, h = jt(f.innerType, l, c), m = l.seen.get(a);
  l.target === "openapi-3.0" ? (m.ref = f.innerType, r.nullable = !0) : r.anyOf = [h, { type: "null" }];
}, YO = (a, l, r, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  h.ref = f.innerType;
}, Kf = /* @__PURE__ */ Symbol();
function zg(a, l, r, c, f) {
  let h = !1;
  const m = JSON.stringify(a, (v, y) => typeof y != "bigint" ? y : (h = !0, null));
  return h ? (_l(l, r, c, f, "BigInt defaults cannot be represented in JSON Schema"), Kf) : JSON.parse(m);
}
const $O = (a, l, r, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  h.ref = f.innerType;
  const m = zg(f.defaultValue, a, l, r, c);
  m !== Kf && (r.default = m);
}, GO = (a, l, r, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  if (h.ref = f.innerType, l.io !== "input")
    return;
  const m = zg(f.defaultValue, a, l, r, c);
  m !== Kf && (r._prefault = m);
}, VO = (a, l, r, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  h.ref = f.innerType;
  let m;
  try {
    m = f.catchValue(void 0);
  } catch {
    _l(a, l, r, c, "Dynamic catch values are not supported in JSON Schema");
    return;
  }
  r.default = m;
}, XO = (a, l, r, c) => {
  const f = a._zod.def, h = f.in._zod.traits.has("$ZodTransform"), m = l.io === "input" ? h ? f.out : f.in : f.out;
  jt(m, l, c);
  const v = l.seen.get(a);
  v.ref = m;
}, KO = (a, l, r, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  h.ref = f.innerType, r.readOnly = !0;
}, Eg = (a, l, r, c) => {
  const f = a._zod.def;
  jt(f.innerType, l, c);
  const h = l.seen.get(a);
  h.ref = f.innerType;
}, my = /* @__PURE__ */ new WeakSet([Object.prototype, Error.prototype]);
function sr(a, l, r) {
  Object.defineProperty(a, l, {
    configurable: !0,
    enumerable: !1,
    get() {
      const c = r(this);
      return Object.defineProperty(this, l, { value: c, configurable: !0, writable: !0 }), c;
    },
    set(c) {
      Object.defineProperty(this, l, { value: c, configurable: !0, writable: !0 });
    }
  });
}
const JO = (a, l) => {
  b2.init(a, l), a.name = "ZodError";
  const r = Object.getPrototypeOf(a);
  my.has(r) || (my.add(r), sr(r, "format", (c) => (f) => x2(c, f)), sr(r, "flatten", (c) => (f) => S2(c, f)), sr(r, "addIssue", (c) => (f) => {
    c.issues.push(f), c.message = JSON.stringify(c.issues, xf, 2);
  }), sr(r, "addIssues", (c) => (f) => {
    c.issues.push(...f), c.message = JSON.stringify(c.issues, xf, 2);
  }), Object.defineProperty(r, "isEmpty", {
    configurable: !0,
    enumerable: !1,
    get() {
      return this.issues.length === 0;
    }
  }));
}, yn = /* @__PURE__ */ B("ZodError", JO, void 0, {
  Parent: Error
}), IO = /* @__PURE__ */ Lf(yn), FO = /* @__PURE__ */ Qf(yn), PO = /* @__PURE__ */ Yf(yn), WO = /* @__PURE__ */ $f(yn), ez = /* @__PURE__ */ N2(yn), tz = /* @__PURE__ */ C2(yn), nz = /* @__PURE__ */ A2(yn), az = /* @__PURE__ */ R2(yn), iz = /* @__PURE__ */ w2(yn), lz = /* @__PURE__ */ M2(yn), uz = /* @__PURE__ */ D2(yn), sz = /* @__PURE__ */ U2(yn);
function rz() {
  Bn.localeError || Ha(wj());
}
function Jf() {
  Bn.memoizer || Ha({ memoizer: Cj() });
}
const ut = /* @__PURE__ */ B("ZodType", (a, l) => (rz(), lt.init(a, l), a.def = l, a.type = l.type, a), {
  check(...a) {
    const l = this.def;
    return this.clone(nn(l, {
      checks: [
        ...l.checks ?? [],
        ...a.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
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
    return this.check(aE(a, l));
  },
  superRefine(a, l) {
    return this.check(iE(a, l));
  },
  overwrite(a) {
    return this.check(/* @__PURE__ */ bl(a));
  },
  optional() {
    return yy(this);
  },
  exactOptional() {
    return $z(this);
  },
  nullable() {
    return gy(this);
  },
  nullish() {
    return yy(gy(this));
  },
  nonoptional(a) {
    return Iz(this, a);
  },
  array() {
    return Cf(this);
  },
  or(a) {
    return Hz([this, a]);
  },
  and(a) {
    return Lz(this, a);
  },
  transform(a) {
    return by(this, Yz(a));
  },
  default(a) {
    return Xz(this, a);
  },
  prefault(a) {
    return Jz(this, a);
  },
  catch(a) {
    return Pz(this, a);
  },
  pipe(a) {
    return by(this, a);
  },
  readonly() {
    return tE(this);
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
    qa(this, "~standard", a);
  },
  parse: function a(l, r) {
    return IO(this, l, r, { callee: a });
  },
  parseAsync: async function a(l, r) {
    return await FO(this, l, r, { callee: a });
  },
  safeParse(a, l) {
    return PO(this, a, l);
  },
  async safeParseAsync(a, l) {
    return WO(this, a, l);
  },
  // `spa` is an alias: same function object as `safeParseAsync`, as before.
  get spa() {
    return this?.safeParseAsync;
  },
  set spa(a) {
    qa(this, "spa", a);
  },
  validate(a, l) {
    return z2(this, a, l);
  },
  validateAsync(a, l) {
    return T2(this, a, l);
  },
  encode: function a(l, r) {
    return ez(this, l, r, { callee: a });
  },
  decode: function a(l, r) {
    return tz(this, l, r, { callee: a });
  },
  encodeAsync: async function a(l, r) {
    return await nz(this, l, r, { callee: a });
  },
  decodeAsync: async function a(l, r) {
    return await az(this, l, r, { callee: a });
  },
  safeEncode(a, l) {
    return iz(this, a, l);
  },
  safeDecode(a, l) {
    return lz(this, a, l);
  },
  async safeEncodeAsync(a, l) {
    return uz(this, a, l);
  },
  async safeDecodeAsync(a, l) {
    return sz(this, a, l);
  },
  toJSONSchema(a) {
    return EO(this, {})(a);
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
    Vf.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => RO(a, r, c);
  },
  /* @__PURE__ */ Vy({
    format: (a) => Hn(a).format ?? null,
    minLength: (a) => Hn(a).minimum ?? null,
    maxLength: (a) => Hn(a).maximum ?? null
  }, {
    regex(...a) {
      return this.check(/* @__PURE__ */ oO(...a));
    },
    includes(...a) {
      return this.check(/* @__PURE__ */ hO(...a));
    },
    startsWith(...a) {
      return this.check(/* @__PURE__ */ mO(...a));
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
      return this.check(/* @__PURE__ */ vg(...a));
    },
    nonempty(...a) {
      return this.check(/* @__PURE__ */ gr(1, ...a));
    },
    lowercase(a) {
      return this.check(/* @__PURE__ */ fO(a));
    },
    uppercase(a) {
      return this.check(/* @__PURE__ */ dO(a));
    },
    trim() {
      return this.check(/* @__PURE__ */ yO());
    },
    normalize(...a) {
      return this.check(/* @__PURE__ */ pO(...a));
    },
    toLowerCase() {
      return this.check(/* @__PURE__ */ gO());
    },
    toUpperCase() {
      return this.check(/* @__PURE__ */ bO());
    },
    slugify() {
      return this.check(/* @__PURE__ */ _O());
    }
  })
), cz = /* @__PURE__ */ B("ZodString", (a, l) => {
  Vf.init(a, l), Tg.init(a, l);
}, {
  email(a) {
    return this.check(/* @__PURE__ */ dg(Ng, a));
  },
  url(a) {
    return this.check(/* @__PURE__ */ Bj(yz, a));
  },
  jwt(a) {
    return this.check(/* @__PURE__ */ tO(wz, a));
  },
  emoji(a) {
    return this.check(/* @__PURE__ */ Lj(gz, a));
  },
  guid(a) {
    return this.check(/* @__PURE__ */ Zj(vz, a));
  },
  uuid(a) {
    return this.check(/* @__PURE__ */ hg(_u, a));
  },
  uuidv4(a) {
    return this.check(/* @__PURE__ */ qj(_u, a));
  },
  uuidv6(a) {
    return this.check(/* @__PURE__ */ kj(_u, a));
  },
  uuidv7(a) {
    return this.check(/* @__PURE__ */ Hj(_u, a));
  },
  nanoid(a) {
    return this.check(/* @__PURE__ */ Qj(bz, a));
  },
  cuid(a) {
    return this.check(/* @__PURE__ */ Yj(_z, a));
  },
  cuid2(a) {
    return this.check(/* @__PURE__ */ $j(Sz, a));
  },
  ulid(a) {
    return this.check(/* @__PURE__ */ Gj(xz, a));
  },
  base64(a) {
    return this.check(/* @__PURE__ */ Pj(Cz, a));
  },
  base64url(a) {
    return this.check(/* @__PURE__ */ Wj(Az, a));
  },
  xid(a) {
    return this.check(/* @__PURE__ */ Vj(jz, a));
  },
  ksuid(a) {
    return this.check(/* @__PURE__ */ Xj(Oz, a));
  },
  ipv4(a) {
    return this.check(/* @__PURE__ */ Kj(zz, a));
  },
  ipv6(a) {
    return this.check(/* @__PURE__ */ Jj(Ez, a));
  },
  cidrv4(a) {
    return this.check(/* @__PURE__ */ Ij(Tz, a));
  },
  cidrv6(a) {
    return this.check(/* @__PURE__ */ Fj(Nz, a));
  },
  e164(a) {
    return this.check(/* @__PURE__ */ eO(Rz, a));
  },
  datetime(a) {
    return this.check(/* @__PURE__ */ nO(oz, a));
  },
  date(a) {
    return this.check(/* @__PURE__ */ aO(fz, a));
  },
  time(a) {
    return this.check(/* @__PURE__ */ iO(dz, a));
  },
  duration(a) {
    return this.check(/* @__PURE__ */ lO(hz, a));
  }
});
function ol(a) {
  return /* @__PURE__ */ Uj(cz, a);
}
const Ke = /* @__PURE__ */ B("ZodStringFormat", (a, l) => {
  Ye.init(a, l), Tg.init(a, l);
}), oz = /* @__PURE__ */ B("ZodISODateTime", (a, l) => {
  Lx.init(a, l), Ke.init(a, l);
}), fz = /* @__PURE__ */ B("ZodISODate", (a, l) => {
  Qx.init(a, l), Ke.init(a, l);
}), dz = /* @__PURE__ */ B("ZodISOTime", (a, l) => {
  Yx.init(a, l), Ke.init(a, l);
}), hz = /* @__PURE__ */ B("ZodISODuration", (a, l) => {
  $x.init(a, l), Ke.init(a, l);
}), Ng = /* @__PURE__ */ B("ZodEmail", (a, l) => {
  Tx.init(a, l), Ke.init(a, l);
});
function mz(a) {
  return /* @__PURE__ */ dg(Ng, a);
}
const vz = /* @__PURE__ */ B("ZodGUID", (a, l) => {
  zx.init(a, l), Ke.init(a, l);
}), _u = /* @__PURE__ */ B("ZodUUID", (a, l) => {
  Ex.init(a, l), Ke.init(a, l);
});
function pz(a) {
  return /* @__PURE__ */ hg(_u, a);
}
const yz = /* @__PURE__ */ B("ZodURL", (a, l) => {
  Mx.init(a, l), Ke.init(a, l);
}), gz = /* @__PURE__ */ B("ZodEmoji", (a, l) => {
  Dx.init(a, l), Ke.init(a, l);
}), bz = /* @__PURE__ */ B("ZodNanoID", (a, l) => {
  Ux.init(a, l), Ke.init(a, l);
}), _z = /* @__PURE__ */ B("ZodCUID", (a, l) => {
  Zx.init(a, l), Ke.init(a, l);
}), Sz = /* @__PURE__ */ B("ZodCUID2", (a, l) => {
  qx.init(a, l), Ke.init(a, l);
}), xz = /* @__PURE__ */ B("ZodULID", (a, l) => {
  kx.init(a, l), Ke.init(a, l);
}), jz = /* @__PURE__ */ B("ZodXID", (a, l) => {
  Hx.init(a, l), Ke.init(a, l);
}), Oz = /* @__PURE__ */ B("ZodKSUID", (a, l) => {
  Bx.init(a, l), Ke.init(a, l);
}), zz = /* @__PURE__ */ B("ZodIPv4", (a, l) => {
  Gx.init(a, l), Ke.init(a, l);
}), Ez = /* @__PURE__ */ B("ZodIPv6", (a, l) => {
  Xx.init(a, l), Ke.init(a, l);
}), Tz = /* @__PURE__ */ B("ZodCIDRv4", (a, l) => {
  Kx.init(a, l), Ke.init(a, l);
}), Nz = /* @__PURE__ */ B("ZodCIDRv6", (a, l) => {
  Ix.init(a, l), Ke.init(a, l);
}), Cz = /* @__PURE__ */ B("ZodBase64", (a, l) => {
  Fx.init(a, l), Ke.init(a, l);
}), Az = /* @__PURE__ */ B("ZodBase64URL", (a, l) => {
  Wx.init(a, l), Ke.init(a, l);
}), Rz = /* @__PURE__ */ B("ZodE164", (a, l) => {
  ej.init(a, l), Ke.init(a, l);
}), wz = /* @__PURE__ */ B("ZodJWT", (a, l) => {
  nj.init(a, l), Ke.init(a, l);
}), Cg = /* @__PURE__ */ B(
  "ZodNumber",
  (a, l) => {
    lg.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => wO(a, r, c, f), a.isFinite = !0;
  },
  /* @__PURE__ */ Vy({
    minValue: (a) => {
      const { minimum: l, exclusiveMinimum: r } = Hn(a);
      return Math.max(l ?? Number.NEGATIVE_INFINITY, r ?? Number.NEGATIVE_INFINITY);
    },
    maxValue: (a) => {
      const { maximum: l, exclusiveMaximum: r } = Hn(a);
      return Math.min(l ?? Number.POSITIVE_INFINITY, r ?? Number.POSITIVE_INFINITY);
    },
    isInt: (a) => {
      const { isInt: l, multipleOf: r } = Hn(a);
      return !!l || !!r?.some(Number.isSafeInteger);
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
      return this.check(vy(a));
    },
    safe(a) {
      return this.check(vy(a));
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
  return /* @__PURE__ */ uO(Cg, a);
}
const Mz = /* @__PURE__ */ B("ZodNumberFormat", (a, l) => {
  aj.init(a, l), Cg.init(a, l);
});
function vy(a) {
  return /* @__PURE__ */ sO(Mz, a);
}
const Dz = /* @__PURE__ */ B("ZodUnknown", (a, l) => {
  ij.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => DO();
});
function py() {
  return /* @__PURE__ */ rO(Dz);
}
const Uz = /* @__PURE__ */ B("ZodNever", (a, l) => {
  lj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => MO(a, r, c);
});
function Ag(a) {
  return /* @__PURE__ */ cO(Uz, a);
}
const Zz = /* @__PURE__ */ B("ZodArray", (a, l) => {
  Jf(), rj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => kO(a, r, c, f), a.element = l.element;
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
    return this.check(/* @__PURE__ */ vg(a, l));
  },
  unwrap() {
    return this.element;
  }
});
function Cf(a, l) {
  return /* @__PURE__ */ SO(Zz, a, l);
}
const qz = /* @__PURE__ */ B("ZodObject", (a, l) => {
  Jf(), fj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => HO(a, r, c, f), f2(a, "shape", (r) => r._zod.def.shape, !1);
}, {
  keyof() {
    return Rg(Object.keys(this._zod.def.shape));
  },
  catchall(a) {
    return this.clone(nn(this._zod.def, { catchall: a }));
  },
  passthrough() {
    return this.clone(nn(this._zod.def, { catchall: py() }));
  },
  loose() {
    return this.clone(nn(this._zod.def, { catchall: py() }));
  },
  strict() {
    return this.clone(nn(this._zod.def, { catchall: Ag() }));
  },
  strip() {
    return this.clone(nn(this._zod.def, { catchall: void 0 }));
  },
  extend(a) {
    return e2(this, a);
  },
  safeExtend(a) {
    return t2(this, a);
  },
  merge(a) {
    return n2(this, a);
  },
  pick(a) {
    return PS(this, a);
  },
  omit(a) {
    return WS(this, a);
  },
  partial(...a) {
    return Bp(wg, this, a[0]);
  },
  exactPartial(...a) {
    return Bp(Mg, this, a[0], "exactPartial");
  },
  required(...a) {
    return a2(Dg, this, a[0]);
  }
});
function rr(a, l) {
  return new qz({
    type: "object",
    shape: a,
    catchall: Ag(),
    ...ae(l)
  });
}
const kz = /* @__PURE__ */ B("ZodUnion", (a, l) => {
  dj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => BO(a, r, c, f), a.options = l.options;
});
function Hz(a, l) {
  return new kz({
    type: "union",
    options: a,
    ...ae(l)
  });
}
const Bz = /* @__PURE__ */ B("ZodIntersection", (a, l) => {
  hj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => LO(a, r, c, f);
});
function Lz(a, l) {
  return new Bz({
    type: "intersection",
    left: a,
    right: l
  });
}
const Af = /* @__PURE__ */ B("ZodEnum", (a, l) => {
  mj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (c, f, h) => UO(a, c, f), a.enum = l.entries, a.options = [...a._zod.values];
  const r = new Set(Object.keys(l.entries));
  a.extract = (c, f) => {
    const h = {};
    for (const m of c)
      if (r.has(m))
        h[m] = l.entries[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new Af({
      ...l,
      checks: [],
      ...ae(f),
      entries: h
    });
  }, a.exclude = (c, f) => {
    const h = { ...l.entries };
    for (const m of c)
      if (r.has(m))
        delete h[m];
      else
        throw new Error(`Key ${m} not found in enum`);
    return new Af({
      ...l,
      checks: [],
      ...ae(f),
      entries: h
    });
  };
});
function Rg(a, l) {
  const r = Array.isArray(a) ? Object.fromEntries(a.map((c) => [c, c])) : a;
  return new Af({
    type: "enum",
    entries: r,
    ...ae(l)
  });
}
const Qz = /* @__PURE__ */ B("ZodTransform", (a, l) => {
  Jf(), vj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => qO(a, r, c, f), a._zod.parse = (r, c) => {
    if (c.direction === "backward")
      throw new Xy(a.constructor.name);
    r.addIssue = (h) => {
      if (typeof h == "string")
        r.issues.push(Tu(h, r.value, l));
      else {
        const m = h;
        m.fatal && (m.continue = !1), m.code ?? (m.code = "custom"), "input" in m || (m.input = r.value), m.inst ?? (m.inst = a), r.issues.push(Tu(m));
      }
    };
    const f = l.transform(r.value, r);
    return f instanceof Promise ? f.then((h) => (r.value = h, r)) : (r.value = f, r);
  };
});
function Yz(a) {
  return new Qz({
    type: "transform",
    transform: a
  });
}
const wg = /* @__PURE__ */ B("ZodOptional", (a, l) => {
  rg.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => Eg(a, r, c, f), a.unwrap = () => a._zod.def.innerType;
});
function yy(a) {
  return new wg({
    type: "optional",
    innerType: a
  });
}
const Mg = /* @__PURE__ */ B("ZodExactOptional", (a, l) => {
  pj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => Eg(a, r, c, f), a.unwrap = () => a._zod.def.innerType;
});
function $z(a) {
  return new Mg({
    type: "optional",
    innerType: a
  });
}
const Gz = /* @__PURE__ */ B("ZodNullable", (a, l) => {
  yj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => QO(a, r, c, f), a.unwrap = () => a._zod.def.innerType;
});
function gy(a) {
  return new Gz({
    type: "nullable",
    innerType: a
  });
}
const Vz = /* @__PURE__ */ B("ZodDefault", (a, l) => {
  gj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => $O(a, r, c, f), a.unwrap = () => a._zod.def.innerType, a.removeDefault = a.unwrap;
});
function Xz(a, l) {
  return new Vz({
    type: "default",
    innerType: a,
    get defaultValue() {
      return typeof l == "function" ? l() : By(l);
    }
  });
}
const Kz = /* @__PURE__ */ B("ZodPrefault", (a, l) => {
  bj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => GO(a, r, c, f), a.unwrap = () => a._zod.def.innerType;
});
function Jz(a, l) {
  return new Kz({
    type: "prefault",
    innerType: a,
    get defaultValue() {
      return typeof l == "function" ? l() : By(l);
    }
  });
}
const Dg = /* @__PURE__ */ B("ZodNonOptional", (a, l) => {
  _j.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => YO(a, r, c, f), a.unwrap = () => a._zod.def.innerType;
});
function Iz(a, l) {
  return new Dg({
    type: "nonoptional",
    innerType: a,
    ...ae(l)
  });
}
const Fz = /* @__PURE__ */ B("ZodCatch", (a, l) => {
  Sj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => VO(a, r, c, f), a.unwrap = () => a._zod.def.innerType, a.removeCatch = a.unwrap;
});
function Pz(a, l) {
  return new Fz({
    type: "catch",
    innerType: a,
    catchValue: typeof l == "function" ? l : h2(l)
  });
}
const Wz = /* @__PURE__ */ B("ZodPipe", (a, l) => {
  xj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => XO(a, r, c, f), a.in = l.in, a.out = l.out;
});
function by(a, l) {
  return new Wz({
    type: "pipe",
    in: a,
    out: l
    // ...util.normalizeParams(params),
  });
}
const eE = /* @__PURE__ */ B("ZodReadonly", (a, l) => {
  jj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => KO(a, r, c, f), a.unwrap = () => a._zod.def.innerType;
});
function tE(a) {
  return new eE({
    type: "readonly",
    innerType: a
  });
}
const nE = /* @__PURE__ */ B("ZodCustom", (a, l) => {
  Oj.init(a, l), ut.init(a, l), a._zod.processJSONSchema = (r, c, f) => ZO(a, r, c, f);
});
function aE(a, l = {}) {
  return /* @__PURE__ */ xO(nE, a, l);
}
function iE(a, l) {
  return /* @__PURE__ */ jO(a, l);
}
const aa = Su().int().min(0).max(1e12), lE = rr({
  client_sale_id: pz(),
  register_id: Su().int().positive(),
  shift_id: Su().int().positive(),
  currency: ol().regex(/^[A-Z]{3}$/),
  grand_total_minor: aa.refine((a) => a > 0),
  customer: rr({
    name: ol().min(1).max(150),
    email: mz().max(200).optional(),
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
      method: Rg(["cash", "external_terminal", "bank_transfer"]),
      currency: ol().length(3),
      amount_minor: aa.refine((a) => a > 0),
      received_minor: aa.optional(),
      change_minor: aa.optional(),
      reference: ol().max(100).optional()
    })
  ).min(1).max(10)
});
function pn({
  title: a,
  children: l,
  onClose: r,
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
        h.preventDefault(), r();
      },
      children: [
        /* @__PURE__ */ o.jsxs("header", { children: [
          /* @__PURE__ */ o.jsx("h2", { children: a }),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              className: "icon-button",
              "aria-label": "Close dialog",
              onClick: r,
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
  icon: r
}) {
  return /* @__PURE__ */ o.jsxs("div", { className: "empty-state", children: [
    r,
    /* @__PURE__ */ o.jsx("h3", { children: a }),
    /* @__PURE__ */ o.jsx("p", { children: l })
  ] });
}
function yi() {
  return /* @__PURE__ */ o.jsxs("div", { className: "loading-state", role: "status", children: [
    /* @__PURE__ */ o.jsx(P_, { className: "spin", size: 24 }),
    " Loading your workspace"
  ] });
}
function Xe({
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
var uE = _y();
function sE({
  receipt: a,
  duplicate: l,
  width: r,
  footer: c
}) {
  const f = (h) => ct(h, a.currency);
  return uE.createPortal(
    /* @__PURE__ */ o.jsxs("article", { id: "rewa-pos-receipt", className: `receipt receipt-${r}`, children: [
      /* @__PURE__ */ o.jsx("style", { children: `@media print { @page { size: ${r === "a4" ? "A4" : "auto"}; margin: ${r === "a4" ? "12mm" : "2mm"}; } }` }),
      /* @__PURE__ */ o.jsxs("header", { children: [
        /* @__PURE__ */ o.jsx("div", { className: "receipt-brand", children: "REWASHOP" }),
        /* @__PURE__ */ o.jsx("h2", { children: a.store.name }),
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
      /* @__PURE__ */ o.jsx("footer", { children: c || "Thank you for shopping with us." })
    ] }),
    document.body
  );
}
function rE(a) {
  return a.tab === "sales" ? /* @__PURE__ */ o.jsx(cE, { ...a }) : a.tab === "register" ? /* @__PURE__ */ o.jsx(hE, { ...a }) : a.tab === "reports" ? /* @__PURE__ */ o.jsx(mE, { ...a }) : a.tab === "products" ? /* @__PURE__ */ o.jsx(vE, { ...a }) : /* @__PURE__ */ o.jsx(pE, { ...a });
}
function gi(a) {
  const [l, r] = H.useState(!1), c = _r(), f = H.useRef(!1), [h, m] = H.useState(hi());
  return { busy: l, run: async (y, b, S) => {
    if (!f.current) {
      f.current = !0, r(!0);
      try {
        const g = await y(h);
        m(hi()), a.onSuccess(b), c.invalidateQueries(), S?.(g);
      } catch (g) {
        a.onError(g);
      } finally {
        f.current = !1, r(!1);
      }
    }
  } };
}
function Ug({
  from: a,
  to: l,
  setFrom: r,
  setTo: c
}) {
  return /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsx(He, { label: "From", children: /* @__PURE__ */ o.jsx(
      "input",
      {
        type: "date",
        value: a,
        onChange: (f) => r(f.target.value)
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
function Zg(a, l) {
  return {
    from: a ? (/* @__PURE__ */ new Date(`${a}T00:00:00`)).toISOString() : null,
    to: l ? (/* @__PURE__ */ new Date(`${l}T23:59:59.999`)).toISOString() : null
  };
}
function cE(a) {
  const { api: l, boot: r, onError: c, onReceipt: f, can: h } = a, [m, v] = H.useState(1), [y, b] = H.useState(""), [S, g] = H.useState(""), [O, U] = H.useState(null), M = an({
    queryKey: ["sales", l.registerId, m, y, S],
    queryFn: ({ signal: N }) => l.request(
      `sales?${zu({ ...Zg(y, S), page: m })}`,
      { signal: N }
    )
  });
  return /* @__PURE__ */ o.jsxs("section", { className: "operations", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("h2", { children: "Every sale, one record" }),
        /* @__PURE__ */ o.jsx("p", { children: "Review receipts, verify payments and handle returns." })
      ] }),
      /* @__PURE__ */ o.jsxs("button", { className: "secondary", onClick: () => M.refetch(), children: [
        /* @__PURE__ */ o.jsx(mS, { size: 16 }),
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
            b(N), v(1);
          },
          setTo: (N) => {
            g(N), v(1);
          }
        }
      ),
      /* @__PURE__ */ o.jsxs("span", { className: "hint", children: [
        "Selected register · ",
        M.data?.total || 0,
        " sales"
      ] })
    ] }),
    M.isPending ? /* @__PURE__ */ o.jsx(yi, {}) : M.error ? /* @__PURE__ */ o.jsx(la, { title: "Sales unavailable", text: M.error.message }) : M.data?.data.length ? /* @__PURE__ */ o.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ o.jsxs("table", { children: [
      /* @__PURE__ */ o.jsx("thead", { children: /* @__PURE__ */ o.jsxs("tr", { children: [
        /* @__PURE__ */ o.jsx("th", { children: "Sale / order" }),
        /* @__PURE__ */ o.jsx("th", { children: "Date" }),
        /* @__PURE__ */ o.jsx("th", { children: "Source" }),
        /* @__PURE__ */ o.jsx("th", { children: "Status" }),
        /* @__PURE__ */ o.jsx("th", { children: "Payment" }),
        /* @__PURE__ */ o.jsx("th", { className: "numeric", children: "Total" }),
        /* @__PURE__ */ o.jsx("th", {})
      ] }) }),
      /* @__PURE__ */ o.jsx("tbody", { children: M.data.data.map((N) => /* @__PURE__ */ o.jsxs("tr", { children: [
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
        /* @__PURE__ */ o.jsx("td", { children: new Date(
          N.occurred_at + "Z".replace(
            "Z",
            N.occurred_at.includes(
              "Z"
            ) ? "" : "Z"
          )
        ).toLocaleString() }),
        /* @__PURE__ */ o.jsx("td", { children: N.source }),
        /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx(Xe, { children: N.status.replaceAll("_", " ") }) }),
        /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx(
          Xe,
          {
            tone: N.payment_status === "settled" ? "green" : "amber",
            children: N.payment_status
          }
        ) }),
        /* @__PURE__ */ o.jsx("td", { className: "numeric", children: /* @__PURE__ */ o.jsx("b", { children: ct(
          N.total_minor,
          r.currency
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
    M.data && M.data.last_page > 1 && /* @__PURE__ */ o.jsxs("div", { className: "pagination", children: [
      /* @__PURE__ */ o.jsx(
        "button",
        {
          disabled: m === 1,
          onClick: () => v(m - 1),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ o.jsxs("span", { children: [
        "Page ",
        m,
        " of ",
        M.data.last_page
      ] }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          disabled: m === M.data.last_page,
          onClick: () => v(m + 1),
          children: "Next"
        }
      )
    ] }),
    O && /* @__PURE__ */ o.jsx(
      oE,
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
function oE(a) {
  const { api: l, id: r, boot: c, can: f, onClose: h, onReceipt: m, onError: v } = a, y = an({
    queryKey: ["sale", l.registerId, r],
    queryFn: () => l.request(`sales/${r}`)
  }), b = gi(a), [S, g] = H.useState(!1), [O, U] = H.useState(null), M = (w) => ct(w, c.currency), N = () => {
    const w = prompt("Reason for duplicate receipt");
    w && b.run(
      (L) => l.mutate(
        `receipts/${y.data.receipt_id}/reprint`,
        { reason: w },
        "POST",
        !1,
        L
      ),
      "Duplicate receipt audited.",
      (L) => m(y.data.receipt_id, !0, L.receipt).catch(
        v
      )
    );
  }, A = () => {
    const w = prompt("Reason for voiding this unsettled sale");
    w && b.run(
      (L) => l.mutate(
        `sales/${r}/void`,
        { reason: w },
        "POST",
        !1,
        L
      ),
      "Sale voided with compensating stock movements."
    );
  };
  return /* @__PURE__ */ o.jsx(pn, { title: `Sale #${r}`, onClose: h, wide: !0, children: y.isPending ? /* @__PURE__ */ o.jsx(yi, {}) : y.error ? /* @__PURE__ */ o.jsx("p", { className: "error-text", children: y.error.message }) : y.data && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
    /* @__PURE__ */ o.jsxs("div", { className: "sale-detail-heading", children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("strong", { children: M(y.data.sale.total_minor) }),
        /* @__PURE__ */ o.jsxs("p", { children: [
          "Order #",
          y.data.sale.order_id,
          " ·",
          " ",
          y.data.sale.source
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx(Xe, { children: y.data.sale.status }),
        " ",
        /* @__PURE__ */ o.jsx(
          Xe,
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
      /* @__PURE__ */ o.jsx("tbody", { children: y.data.lines.map((w) => /* @__PURE__ */ o.jsxs("tr", { children: [
        /* @__PURE__ */ o.jsxs("td", { children: [
          /* @__PURE__ */ o.jsx("strong", { children: w.snapshot.name }),
          /* @__PURE__ */ o.jsx("small", { children: w.snapshot.variant || w.snapshot.sku })
        ] }),
        /* @__PURE__ */ o.jsxs("td", { children: [
          w.quantity,
          " /",
          " ",
          w.returned_quantity
        ] }),
        /* @__PURE__ */ o.jsx("td", { className: "numeric", children: M(w.total_minor) })
      ] }, w.id)) })
    ] }) }),
    /* @__PURE__ */ o.jsx("h3", { className: "subheading", children: "Tenders" }),
    /* @__PURE__ */ o.jsx("div", { className: "record-list", children: y.data.tenders.map((w) => /* @__PURE__ */ o.jsxs("div", { children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("strong", { children: w.method.replaceAll("_", " ") }),
        /* @__PURE__ */ o.jsx("small", { children: w.reference || "Cash in register" })
      ] }),
      /* @__PURE__ */ o.jsx("b", { children: M(w.amount_minor) }),
      /* @__PURE__ */ o.jsx(
        Xe,
        {
          tone: w.status === "pending" ? "amber" : "green",
          children: w.status
        }
      ),
      w.status === "pending" && f("payment:verify") && y.data.sale.status !== "voided" && /* @__PURE__ */ o.jsx(
        "button",
        {
          className: "text-button",
          onClick: () => U({
            kind: "tenders",
            id: w.id
          }),
          children: "Verify evidence"
        }
      )
    ] }, w.id)) }),
    !!y.data.refunds.length && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsx("h3", { className: "subheading", children: "Returns & payouts" }),
      /* @__PURE__ */ o.jsx("div", { className: "record-list", children: y.data.refunds.map((w) => /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsxs("strong", { children: [
            "Return #",
            w.id
          ] }),
          /* @__PURE__ */ o.jsx("small", { children: w.reason })
        ] }),
        /* @__PURE__ */ o.jsx("b", { children: M(w.amount_minor) }),
        /* @__PURE__ */ o.jsx(
          Xe,
          {
            tone: w.status === "pending" ? "amber" : "green",
            children: w.status
          }
        ),
        w.status === "pending" && f("payment:verify") && /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "text-button",
            onClick: () => U({
              kind: "refunds",
              id: w.id
            }),
            children: "Verify payout"
          }
        )
      ] }, w.id)) })
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
        (w) => w.returned_quantity < w.quantity
      ) && /* @__PURE__ */ o.jsxs(
        "button",
        {
          className: "primary",
          onClick: () => g(!0),
          children: [
            /* @__PURE__ */ o.jsx(pS, { size: 16 }),
            " Return items"
          ]
        }
      )
    ] }),
    S && /* @__PURE__ */ o.jsx(
      dE,
      {
        ...a,
        detail: y.data,
        onClose: () => g(!1)
      }
    ),
    O && /* @__PURE__ */ o.jsx(
      fE,
      {
        ...a,
        record: O,
        onClose: () => U(null)
      }
    )
  ] }) });
}
function fE(a) {
  const [l, r] = H.useState(""), [c, f] = H.useState(""), h = gi(a);
  return /* @__PURE__ */ o.jsxs(
    pn,
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
                (v) => a.api.mutate(
                  `${a.record.kind}/${a.record.id}/verify`,
                  { reference: l, evidence: c },
                  "POST",
                  !1,
                  v
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
                  onChange: (m) => r(m.target.value),
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
                /* @__PURE__ */ o.jsx(jS, { size: 16 }),
                " Confirm verified settlement"
              ] }) })
            ]
          }
        )
      ]
    }
  );
}
function dE(a) {
  const { api: l, boot: r, detail: c, onClose: f } = a, [h, m] = H.useState(""), [v, y] = H.useState(
    c.tenders[0]?.method || "cash"
  ), [b, S] = H.useState({}), [g, O] = H.useState(!0), U = gi(a), N = an({
    queryKey: [
      "shifts",
      `${r.seller_id}:${r.cashier_id}:${l.registerId}`
    ],
    queryFn: () => l.request("shifts", { web: !0 })
  }).data?.data.find(
    (A) => A.status === "open" && A.is_own
  );
  return /* @__PURE__ */ o.jsxs(pn, { title: "Return items", onClose: f, children: [
    /* @__PURE__ */ o.jsx("p", { className: "hint", children: "Refunds are separate records. Original receipts and order totals stay intact." }),
    /* @__PURE__ */ o.jsxs(
      "form",
      {
        onSubmit: (A) => {
          A.preventDefault();
          const w = Object.entries(b).filter(([, L]) => L > 0).map(([L, ue]) => ({
            sale_line_id: Number(L),
            quantity: ue,
            restock: g
          }));
          if (!w.length || !N) {
            a.onError(
              new Error(
                "Select return quantities and open your shift."
              )
            );
            return;
          }
          U.run(
            (L) => l.mutate(
              `sales/${c.sale.id}/returns`,
              {
                client_refund_id: L,
                shift_id: N.id,
                method: v,
                reason: h,
                lines: w
              },
              "POST",
              !1,
              L
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
                  onChange: (w) => S({
                    ...b,
                    [A.id]: Number(w.target.value)
                  })
                }
              )
            },
            A.id
          )) }),
          /* @__PURE__ */ o.jsx(He, { label: "Refund tender", children: /* @__PURE__ */ o.jsx(
            "select",
            {
              value: v,
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
function hE(a) {
  const { api: l, boot: r, registerId: c, can: f } = a, h = `${r.seller_id}:${r.cashier_id}:${c}`, m = an({
    queryKey: ["shifts", h],
    queryFn: () => l.request("shifts", { web: !0 }),
    refetchInterval: 15e3
  }), [v, y] = H.useState(null), [b, S] = H.useState("0.00"), [g, O] = H.useState(""), U = gi(a), M = m.data?.data.find((w) => w.status === "open"), N = (w) => {
    S("0.00"), O(""), y(w);
  }, A = () => {
    try {
      const w = kn(b);
      U.run(
        (L) => v === "open" ? l.mutate(
          "shifts/open",
          {
            client_shift_id: L,
            register_id: c,
            opening_minor: w
          },
          "POST",
          !1,
          L
        ) : v === "close" ? l.mutate(
          `shifts/${M.id}/close`,
          { counted_minor: w, reason: g },
          "POST",
          !1,
          L
        ) : l.mutate(
          `shifts/${M.id}/cash`,
          {
            amount_minor: v === "cash-out" ? -w : w,
            reason: g
          },
          "POST",
          !1,
          L
        ),
        "Register ledger updated.",
        () => y(null)
      );
    } catch (w) {
      a.onError(w);
    }
  };
  return /* @__PURE__ */ o.jsxs("section", { className: "operations", children: [
    /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
      /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx("h2", { children: "Your till, reconciled" }),
        /* @__PURE__ */ o.jsx("p", { children: "Cash received less change, completed cash refunds and till movements." })
      ] }),
      !M && /* @__PURE__ */ o.jsxs("button", { className: "primary", onClick: () => N("open"), children: [
        /* @__PURE__ */ o.jsx(Za, { size: 16 }),
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
          /* @__PURE__ */ o.jsx("strong", { children: M ? "Open" : "Closed" }),
          /* @__PURE__ */ o.jsx("small", { children: M ? `${M.cashier_name} · #${M.id}` : "Count the opening float before selling" })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "metric-card", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Opening float" }),
          /* @__PURE__ */ o.jsx("strong", { children: ct(
            M?.opening_minor || 0,
            r.currency
          ) })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "metric-card", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Expected cash" }),
          /* @__PURE__ */ o.jsx("strong", { children: ct(
            M?.expected_minor || 0,
            r.currency
          ) }),
          /* @__PURE__ */ o.jsx("small", { children: "From the committed till ledger" })
        ] })
      ] }),
      M && /* @__PURE__ */ o.jsx("div", { className: "register-actions", children: M.is_own ? /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
        /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "secondary",
            disabled: !f("cash:write"),
            onClick: () => N("cash-in"),
            children: [
              /* @__PURE__ */ o.jsx(A_, { size: 17 }),
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
              /* @__PURE__ */ o.jsx(D_, { size: 17 }),
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
              /* @__PURE__ */ o.jsx($_, { size: 17 }),
              " Count & close shift"
            ]
          }
        )
      ] }) : /* @__PURE__ */ o.jsxs("p", { className: "hint", children: [
        "This shift belongs to ",
        M.cashier_name,
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
        /* @__PURE__ */ o.jsx("tbody", { children: m.data?.data.map((w) => /* @__PURE__ */ o.jsxs("tr", { children: [
          /* @__PURE__ */ o.jsxs("td", { children: [
            /* @__PURE__ */ o.jsxs("strong", { children: [
              "#",
              w.id
            ] }),
            /* @__PURE__ */ o.jsx("small", { children: w.cashier_name })
          ] }),
          /* @__PURE__ */ o.jsx("td", { children: w.opened_at }),
          /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsx(
            Xe,
            {
              tone: w.status === "open" ? "green" : "",
              children: w.status
            }
          ) }),
          /* @__PURE__ */ o.jsx("td", { className: "numeric", children: ct(
            w.expected_minor,
            r.currency
          ) }),
          /* @__PURE__ */ o.jsx("td", { className: "numeric", children: w.counted_minor === null ? "—" : ct(
            w.counted_minor,
            r.currency
          ) }),
          /* @__PURE__ */ o.jsx(
            "td",
            {
              className: `numeric ${w.variance_minor ? "danger-text" : ""}`,
              children: w.variance_minor === null ? "—" : ct(
                w.variance_minor,
                r.currency
              )
            }
          )
        ] }, w.id)) })
      ] }) })
    ] }),
    v && /* @__PURE__ */ o.jsxs(
      pn,
      {
        title: {
          open: "Open shift",
          close: "Count & close shift",
          "cash-in": "Cash in",
          "cash-out": "Cash out"
        }[v],
        onClose: () => y(null),
        children: [
          /* @__PURE__ */ o.jsx("p", { className: "hint", children: v === "close" ? "Count the physical cash. Explain any difference from the expected ledger balance." : v === "open" ? "Enter the physical cash float in this register." : "Every cash movement needs a reason and is recorded in the till ledger." }),
          /* @__PURE__ */ o.jsxs(
            "form",
            {
              onSubmit: (w) => {
                w.preventDefault(), A();
              },
              children: [
                /* @__PURE__ */ o.jsx(
                  He,
                  {
                    label: v === "close" ? "Counted cash" : "Cash amount",
                    children: /* @__PURE__ */ o.jsx(
                      "input",
                      {
                        inputMode: "decimal",
                        value: b,
                        onChange: (w) => S(w.target.value),
                        required: !0
                      }
                    )
                  }
                ),
                v !== "open" && /* @__PURE__ */ o.jsx(He, { label: "Reason", children: /* @__PURE__ */ o.jsx(
                  "textarea",
                  {
                    value: g,
                    onChange: (w) => O(w.target.value),
                    required: v !== "close",
                    minLength: 3,
                    maxLength: 500
                  }
                ) }),
                /* @__PURE__ */ o.jsx("div", { className: "modal-actions", children: /* @__PURE__ */ o.jsxs("button", { className: "primary", disabled: U.busy, children: [
                  "Confirm ",
                  v.replace("-", " ")
                ] }) })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function mE(a) {
  const l = (/* @__PURE__ */ new Date()).toLocaleDateString("en-CA"), [r, c] = H.useState(l), [f, h] = H.useState(l), { api: m, boot: v } = a, y = an({
    queryKey: ["reports", m.registerId, r, f],
    queryFn: () => m.request(
      `reports/summary?${zu(Zg(r, f))}`
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
    }), U = URL.createObjectURL(O), M = document.createElement("a");
    M.href = U, M.download = `pos-report-${r}-${f}.csv`, M.click(), URL.revokeObjectURL(U);
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
            /* @__PURE__ */ o.jsx(K_, { size: 16 }),
            " Export CSV"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "toolbar", children: [
      /* @__PURE__ */ o.jsx(
        Ug,
        {
          from: r,
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
          v.currency
        ) })
      ] }, S)) }),
      /* @__PURE__ */ o.jsxs("div", { className: "report-panels", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "panel", children: [
          /* @__PURE__ */ o.jsx("h3", { children: "Tender reconciliation" }),
          /* @__PURE__ */ o.jsx("div", { className: "record-list", children: y.data.tenders.map((S, g) => /* @__PURE__ */ o.jsxs("div", { children: [
            /* @__PURE__ */ o.jsx("strong", { children: S.method.replaceAll("_", " ") }),
            /* @__PURE__ */ o.jsx(
              Xe,
              {
                tone: S.status === "pending" ? "amber" : "green",
                children: S.status
              }
            ),
            /* @__PURE__ */ o.jsx("b", { children: ct(
              S.amount_minor,
              v.currency
            ) })
          ] }, g)) })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "panel", children: [
          /* @__PURE__ */ o.jsx("h3", { children: "Needs attention" }),
          /* @__PURE__ */ o.jsxs("div", { className: "attention-row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Pending sale payments" }),
            /* @__PURE__ */ o.jsx("strong", { children: ct(
              y.data.unsettled_sales_minor,
              v.currency
            ) })
          ] }),
          /* @__PURE__ */ o.jsxs("div", { className: "attention-row", children: [
            /* @__PURE__ */ o.jsx("span", { children: "Pending refund payouts" }),
            /* @__PURE__ */ o.jsx("strong", { children: ct(
              y.data.pending_refund_payouts_minor,
              v.currency
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
              v.currency
            ) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function vE(a) {
  const { api: l } = a, [r, c] = H.useState(""), [f, h] = H.useState(1), m = gi(a), v = an({
    queryKey: ["products", l.registerId, r, f],
    queryFn: ({ signal: y }) => l.request(`products?${zu({ q: r, page: f })}`, {
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
      /* @__PURE__ */ o.jsx(Xe, { children: "Current store only" })
    ] }),
    /* @__PURE__ */ o.jsx("div", { className: "toolbar", children: /* @__PURE__ */ o.jsxs("div", { className: "search-box", children: [
      /* @__PURE__ */ o.jsx(My, { size: 17 }),
      /* @__PURE__ */ o.jsx(
        "input",
        {
          value: r,
          onChange: (y) => {
            c(y.target.value), h(1);
          },
          placeholder: "Find a product",
          "aria-label": "Find a product"
        }
      )
    ] }) }),
    v.isPending ? /* @__PURE__ */ o.jsx(yi, {}) : v.error ? /* @__PURE__ */ o.jsx(
      la,
      {
        title: "Products unavailable",
        text: v.error.message
      }
    ) : /* @__PURE__ */ o.jsx("div", { className: "table-wrap", children: /* @__PURE__ */ o.jsxs("table", { children: [
      /* @__PURE__ */ o.jsx("thead", { children: /* @__PURE__ */ o.jsxs("tr", { children: [
        /* @__PURE__ */ o.jsx("th", { children: "Product" }),
        /* @__PURE__ */ o.jsx("th", { children: "Barcode" }),
        /* @__PURE__ */ o.jsx("th", { children: "Retail eligibility" }),
        /* @__PURE__ */ o.jsx("th", { children: "POS enabled" })
      ] }) }),
      /* @__PURE__ */ o.jsx("tbody", { children: v.data?.data.map((y) => {
        const b = !!y.published && !!y.approved && !y.digital && !y.auction_product && !y.wholesale_product;
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
            Xe,
            {
              tone: b ? "green" : "amber",
              children: b ? "Physical retail product" : "Not published, approved or retail"
            }
          ) }),
          /* @__PURE__ */ o.jsx("td", { children: /* @__PURE__ */ o.jsxs("label", { className: "switch", children: [
            /* @__PURE__ */ o.jsx(
              "input",
              {
                type: "checkbox",
                "aria-label": `Enable ${y.name} for POS`,
                checked: !!y.pos,
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
    v.data && v.data.last_page > 1 && /* @__PURE__ */ o.jsxs("div", { className: "pagination", children: [
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
        v.data.last_page
      ] }),
      /* @__PURE__ */ o.jsx(
        "button",
        {
          disabled: f === v.data.last_page,
          onClick: () => h(f + 1),
          children: "Next"
        }
      )
    ] })
  ] });
}
function pE(a) {
  const { api: l, boot: r, can: c } = a, [f, h] = H.useState(r.settings.receipt_footer || ""), [m, v] = H.useState(!!r.settings.tax_inclusive), [y, b] = H.useState(!1), [S, g] = H.useState(""), [O, U] = H.useState(""), [M, N] = H.useState(!1), [A, w] = H.useState(null), L = gi(a), ue = an({
    queryKey: ["staff", l.registerId],
    queryFn: () => l.request("staff", { web: !0 }),
    enabled: c("staff:manage")
  }), me = an({
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
      /* @__PURE__ */ o.jsxs(Xe, { children: [
        r.currency,
        " · integer minor units"
      ] })
    ] }),
    /* @__PURE__ */ o.jsxs("div", { className: "settings-grid", children: [
      /* @__PURE__ */ o.jsxs("section", { className: "panel", children: [
        /* @__PURE__ */ o.jsx("h3", { children: "Receipts & pricing" }),
        /* @__PURE__ */ o.jsxs(
          "form",
          {
            onSubmit: ($) => {
              $.preventDefault(), L.run(
                (I) => l.mutate(
                  "settings",
                  {
                    receipt_footer: f,
                    tax_inclusive: m
                  },
                  "PUT",
                  !1,
                  I
                ),
                "Settings saved. New sales use this tax policy."
              );
            },
            children: [
              /* @__PURE__ */ o.jsx(He, { label: "Receipt footer", children: /* @__PURE__ */ o.jsx(
                "textarea",
                {
                  value: f,
                  onChange: ($) => h($.target.value),
                  maxLength: 500,
                  disabled: !c("settings:manage")
                }
              ) }),
              /* @__PURE__ */ o.jsxs("label", { className: "checkbox", children: [
                /* @__PURE__ */ o.jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: m,
                    onChange: ($) => v($.target.checked),
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
                  disabled: !c("settings:manage") || L.busy,
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
            onChange: ($) => a.setWidth($.target.value),
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
          /* @__PURE__ */ o.jsx(nS, { size: 18 }),
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
            onClick: () => b(!0),
            children: [
              /* @__PURE__ */ o.jsx(Za, { size: 16 }),
              " Add register"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ o.jsx("div", { className: "record-list", children: r.registers.map(($) => /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsx(Dy, { size: 18 }),
        /* @__PURE__ */ o.jsx("strong", { children: $.name }),
        /* @__PURE__ */ o.jsx("small", { children: $.code }),
        /* @__PURE__ */ o.jsx(
          Xe,
          {
            tone: $.active_shift_id ? "green" : "",
            children: $.active_shift_id ? "Shift open" : "Available"
          }
        )
      ] }, $.id)) })
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
              w(null), N(!0);
            },
            children: [
              /* @__PURE__ */ o.jsx(Za, { size: 16 }),
              " Assign cashier"
            ]
          }
        )
      ] }),
      ue.error && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: ue.error.message }),
      /* @__PURE__ */ o.jsx("div", { className: "record-list", children: ue.data?.data.map(($) => /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsxs("strong", { children: [
            $.name,
            " · #",
            $.user_id
          ] }),
          /* @__PURE__ */ o.jsxs("small", { children: [
            $.abilities.length,
            " permissions ·",
            " ",
            $.max_discount_bps / 100,
            "% discount limit"
          ] })
        ] }),
        /* @__PURE__ */ o.jsx(Xe, { tone: $.active ? "green" : "amber", children: $.active ? "Active" : "Disabled" }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "text-button",
            onClick: () => {
              w($), N(!0);
            },
            children: "Edit assignment"
          }
        )
      ] }, $.user_id)) })
    ] }),
    c("device:manage") && /* @__PURE__ */ o.jsxs("section", { className: "panel", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "section-heading", children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsx("h3", { children: "Connected devices" }),
          /* @__PURE__ */ o.jsx("p", { children: "Revoking a device stops authentication and preserves its stock reservations." })
        ] }),
        /* @__PURE__ */ o.jsx(Xe, { children: "Desktop stage follows" })
      ] }),
      me.error && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: me.error.message }),
      /* @__PURE__ */ o.jsx("div", { className: "record-list", children: me.data?.data.data.map(($) => /* @__PURE__ */ o.jsxs("div", { children: [
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsx("strong", { children: $.name }),
          /* @__PURE__ */ o.jsxs("small", { children: [
            "Last seen ",
            $.last_seen_at || "Never",
            " ",
            "· sequence ",
            $.last_sequence
          ] })
        ] }),
        /* @__PURE__ */ o.jsx(
          Xe,
          {
            tone: $.revoked_at ? "amber" : "green",
            children: $.revoked_at ? "Revoked" : "Active"
          }
        ),
        !$.revoked_at && /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "text-button danger-text",
            disabled: L.busy,
            onClick: () => {
              const I = prompt(
                "Reason for revoking this device"
              );
              I && L.run(
                (W) => l.mutate(
                  `devices/${$.id}/revoke`,
                  { reason: I },
                  "POST",
                  !1,
                  W
                ),
                "Device revoked. Reservations remain protected."
              );
            },
            children: "Revoke"
          }
        )
      ] }, $.id)) })
    ] }),
    y && /* @__PURE__ */ o.jsx(
      pn,
      {
        title: "Add register",
        onClose: () => b(!1),
        children: /* @__PURE__ */ o.jsxs(
          "form",
          {
            onSubmit: ($) => {
              $.preventDefault(), L.run(
                (I) => l.mutate(
                  "registers",
                  { code: S, name: O },
                  "POST",
                  !1,
                  I
                ),
                "Register created.",
                () => b(!1)
              );
            },
            children: [
              /* @__PURE__ */ o.jsx(He, { label: "Register code", children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  required: !0,
                  pattern: "[A-Za-z0-9_-]+",
                  value: S,
                  onChange: ($) => g($.target.value),
                  maxLength: 40
                }
              ) }),
              /* @__PURE__ */ o.jsx(He, { label: "Display name", children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  required: !0,
                  value: O,
                  onChange: ($) => U($.target.value),
                  maxLength: 150
                }
              ) }),
              /* @__PURE__ */ o.jsx("div", { className: "modal-actions", children: /* @__PURE__ */ o.jsx("button", { className: "primary", disabled: L.busy, children: "Create register" }) })
            ]
          }
        )
      }
    ),
    M && /* @__PURE__ */ o.jsx(
      yE,
      {
        ...a,
        value: A,
        onClose: () => N(!1)
      }
    )
  ] });
}
function yE(a) {
  const { value: l, boot: r, api: c } = a, [f, h] = H.useState(l?.user_id?.toString() || ""), [m, v] = H.useState(
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
  ), [O, U] = H.useState(l ? !!l.active : !0), M = gi(a);
  return /* @__PURE__ */ o.jsx(pn, { title: "Cashier assignment", onClose: a.onClose, wide: !0, children: /* @__PURE__ */ o.jsxs(
    "form",
    {
      onSubmit: (N) => {
        N.preventDefault();
        try {
          const A = kn(S);
          if (A > r.max_discount_bps)
            throw new Error(
              "The delegated discount limit exceeds your own."
            );
          M.run(
            (w) => c.mutate(
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
              w
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
        /* @__PURE__ */ o.jsx("div", { className: "permission-grid", children: r.registers.map((N) => /* @__PURE__ */ o.jsxs("label", { className: "checkbox", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "checkbox",
              checked: y.includes(N.id),
              onChange: (A) => b(
                A.target.checked ? [...y, N.id] : y.filter(
                  (w) => w !== N.id
                )
              )
            }
          ),
          N.name
        ] }, N.id)) }),
        /* @__PURE__ */ o.jsx("h3", { className: "subheading", children: "Permissions" }),
        /* @__PURE__ */ o.jsx("div", { className: "permission-grid", children: r.abilities.filter((N) => N !== "pos:sync").map((N) => /* @__PURE__ */ o.jsxs("label", { className: "checkbox", children: [
          /* @__PURE__ */ o.jsx(
            "input",
            {
              type: "checkbox",
              checked: m.includes(N),
              onChange: (A) => v(
                A.target.checked ? [...m, N] : m.filter(
                  (w) => w !== N
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
            disabled: M.busy || !y.length,
            children: "Save assignment"
          }
        ) })
      ]
    }
  ) });
}
const gE = new d_({
  defaultOptions: {
    queries: { retry: !1, staleTime: 1e4 },
    mutations: { retry: !1 }
  }
}), fl = JSON.parse(
  document.getElementById("rewa-pos-config").textContent
);
function bE() {
  const a = _r(), [l, r] = H.useState(
    fl.registerId
  ), c = H.useMemo(() => new US(fl, l), [l]), f = an({
    queryKey: ["bootstrap", l],
    queryFn: ({ signal: Q }) => c.request("bootstrap", { signal: Q }),
    refetchInterval: 3e4
  }), h = an({
    queryKey: ["workspace", l],
    queryFn: ({ signal: Q }) => c.request("workspace", { web: !0, signal: Q })
  }), m = f.data, v = h.data;
  m && (c.scope = `${m.seller_id}:${m.cashier_id}`);
  const [y, b] = H.useState("checkout"), [S, g] = H.useState(
    localStorage.getItem("rewa-pos-theme") === "dark"
  ), [O, U] = H.useState(navigator.onLine), [M, N] = H.useState(""), [A, w] = H.useState(""), [L, ue] = H.useState(null), [me, $] = H.useState(!1), [I, W] = H.useState(null), [oe, et] = H.useState(
    localStorage.getItem("rewa-pos-print-width") || "80"
  ), [Be, Je] = H.useState(!1), [Pe, Rt] = H.useState(!1), [ln, $e] = H.useState(!1), V = H.useRef(!1), ie = H.useRef(null), ee = m && l ? `${m.seller_id}:${m.cashier_id}:${l}` : "", be = `rewa-pos:print:${ee}`, pe = (Q) => !!m?.abilities.includes(`pos:${Q}`), Ne = (Q) => w(
    Q instanceof Error ? Q.message : "The action could not be completed."
  ), st = (Q) => {
    w(""), N(Q);
  };
  H.useEffect(() => {
    m && !l && m.registers.length && r(m.registers[0].id);
  }, [m, l]), H.useEffect(() => {
    const Q = () => U(navigator.onLine);
    return window.addEventListener("online", Q), window.addEventListener("offline", Q), () => {
      window.removeEventListener("online", Q), window.removeEventListener("offline", Q);
    };
  }, []), H.useEffect(() => {
    document.documentElement.dataset.posTheme = S ? "dark" : "light", localStorage.setItem("rewa-pos-theme", S ? "dark" : "light");
  }, [S]), H.useEffect(() => {
    if (M) {
      const Q = setTimeout(() => N(""), 6e3);
      return () => clearTimeout(Q);
    }
  }, [M]), H.useEffect(() => {
    const Q = sessionStorage.getItem(be);
    Q && ee && (W(Number(Q)), Je(!0));
  }, [be, ee]);
  const $t = async (Q, re = !1, fe) => {
    W(Q), $(re);
    const K = fe || (await c.request(`receipts/${Q}`)).receipt;
    ue(K);
  }, j = async (Q) => {
    sessionStorage.setItem(be, String(Q.receipt_id)), Je(!0), W(Q.receipt_id), st(
      `Sale #${Q.sale_id} recorded. ${Q.payment_status === "pending" ? "External payment awaits verification." : "Payment settled."}`
    ), a.invalidateQueries();
    try {
      await $t(Q.receipt_id, !!Q.duplicate);
    } catch (re) {
      Ne(re);
    }
  }, Y = async () => {
    if (!(V.current || !I)) {
      V.current = !0, $e(!0);
      try {
        const Q = `rewa-pos:print-attempts:${ee}:${I}`, re = Number(sessionStorage.getItem(Q) || 0);
        if (re > 0) {
          const fe = await c.mutate(
            `receipts/${I}/reprint`,
            {
              reason: "Previous browser print dispatch was not confirmed"
            }
          );
          ue(fe.receipt), $(!0), await new Promise(
            (K) => requestAnimationFrame(() => K())
          );
        }
        sessionStorage.setItem(Q, String(re + 1)), window.print();
      } catch (Q) {
        Ne(
          new Error(
            Q instanceof fi ? Q.message : "Printing could not start. The sale is recorded. Reopen its receipt to print."
          )
        );
      } finally {
        V.current = !1, $e(!1);
      }
    }
  }, te = () => {
    sessionStorage.removeItem(be), Je(!1), ue(null), st("Receipt marked printed.");
  };
  if (f.isPending || h.isPending) return /* @__PURE__ */ o.jsx(yi, {});
  if (!m || !v || m.owner_type !== fl.area)
    return /* @__PURE__ */ o.jsxs("div", { className: "startup-error", children: [
      /* @__PURE__ */ o.jsx(_f, { size: 36 }),
      /* @__PURE__ */ o.jsx("h1", { children: "Your register could not open" }),
      /* @__PURE__ */ o.jsx("p", { children: f.error?.message || h.error?.message || "Open the correct store workspace." }),
      /* @__PURE__ */ o.jsx("button", { onClick: () => a.invalidateQueries(), children: "Retry" }),
      /* @__PURE__ */ o.jsx("a", { href: fl.backUrl, children: "Return to workspace" })
    ] });
  const G = [
    ["checkout", "Checkout", _f, "sale:write"],
    ["sales", "Sales & returns", dS, "sale:read"],
    ["register", "Register", Dy, "shift:write"],
    ["reports", "Reports", k_, "report:read"],
    ["products", "Products", bf, "settings:manage"],
    ["settings", "Settings", SS, "catalog:read"]
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
            /* @__PURE__ */ o.jsxs("span", { className: "brand-mark", children: [
              "r",
              /* @__PURE__ */ o.jsx("span", { children: "." })
            ] }),
            /* @__PURE__ */ o.jsxs("div", { children: [
              /* @__PURE__ */ o.jsxs("strong", { children: [
                "rewa",
                /* @__PURE__ */ o.jsx("span", { children: "shop" })
              ] }),
              /* @__PURE__ */ o.jsx("small", { children: "POINT OF SALE" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ o.jsxs("div", { className: "store-label", children: [
        /* @__PURE__ */ o.jsx("span", { className: "store-dot" }),
        /* @__PURE__ */ o.jsxs("div", { children: [
          /* @__PURE__ */ o.jsx("strong", { children: v.store_name }),
          /* @__PURE__ */ o.jsx("small", { children: m.owner_type === "admin" ? "Platform store" : "Seller store" })
        ] })
      ] }),
      /* @__PURE__ */ o.jsx("nav", { children: G.filter(([, , , Q]) => pe(Q)).map(([Q, re, fe]) => /* @__PURE__ */ o.jsxs(
        "button",
        {
          "aria-label": re,
          className: y === Q ? "active" : "",
          onClick: () => b(Q),
          children: [
            /* @__PURE__ */ o.jsx(fe, { size: 19 }),
            /* @__PURE__ */ o.jsx("span", { children: re }),
            Q === "checkout" && /* @__PURE__ */ o.jsx("kbd", { children: "F2" })
          ]
        },
        Q
      )) }),
      /* @__PURE__ */ o.jsxs("div", { className: "rail-bottom", children: [
        /* @__PURE__ */ o.jsxs("button", { onClick: () => g(!S), children: [
          S ? /* @__PURE__ */ o.jsx(ES, { size: 18 }) : /* @__PURE__ */ o.jsx(iS, { size: 18 }),
          /* @__PURE__ */ o.jsx("span", { children: S ? "Light mode" : "Dark mode" })
        ] }),
        /* @__PURE__ */ o.jsxs("a", { href: fl.backUrl, children: [
          /* @__PURE__ */ o.jsx(w_, { size: 18 }),
          " Back to workspace"
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "cashier", children: [
          /* @__PURE__ */ o.jsx("span", { children: v.cashier_name.charAt(0) }),
          /* @__PURE__ */ o.jsxs("div", { children: [
            /* @__PURE__ */ o.jsx("strong", { children: v.cashier_name }),
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
          /* @__PURE__ */ o.jsx("h1", { children: G.find(([Q]) => Q === y)?.[1] })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "topbar-right", children: [
          /* @__PURE__ */ o.jsxs(Xe, { tone: O ? "green" : "amber", children: [
            O ? /* @__PURE__ */ o.jsx(MS, { size: 13 }) : /* @__PURE__ */ o.jsx(RS, { size: 13 }),
            " ",
            O ? "Online" : "Offline"
          ] }),
          /* @__PURE__ */ o.jsx(
            "select",
            {
              "aria-label": "Register",
              value: l || "",
              disabled: Pe,
              onChange: (Q) => r(Number(Q.target.value)),
              children: m.registers.map((Q) => /* @__PURE__ */ o.jsx("option", { value: Q.id, children: Q.name }, Q.id))
            }
          )
        ] })
      ] }),
      !O && /* @__PURE__ */ o.jsx("div", { className: "banner amber", role: "status", children: "Checkout needs a connection. Your cart stays on this screen; saved held carts remain in your store." }),
      (A || M || f.error) && /* @__PURE__ */ o.jsxs(
        "div",
        {
          className: `banner ${A || f.error ? "danger" : "green"}`,
          role: "status",
          children: [
            A || f.error?.message || M,
            /* @__PURE__ */ o.jsx(
              "button",
              {
                "aria-label": "Dismiss message",
                onClick: () => {
                  w(""), N("");
                },
                children: /* @__PURE__ */ o.jsx(Sr, { size: 16 })
              }
            )
          ]
        }
      ),
      Be && !L && /* @__PURE__ */ o.jsxs("div", { className: "print-reminder", children: [
        /* @__PURE__ */ o.jsx(hr, { size: 16 }),
        /* @__PURE__ */ o.jsxs("span", { children: [
          "Sale recorded. Receipt #",
          I,
          " is awaiting print confirmation."
        ] }),
        /* @__PURE__ */ o.jsx(
          "button",
          {
            onClick: () => I && $t(I).catch(Ne),
            children: "Open receipt"
          }
        )
      ] }),
      /* @__PURE__ */ o.jsx("div", { className: "checkout-container", hidden: y !== "checkout", children: /* @__PURE__ */ o.jsx(
        _E,
        {
          active: y === "checkout",
          onCartChange: Rt,
          api: c,
          boot: m,
          workspace: v,
          registerId: l,
          online: O,
          scope: ee,
          scanRef: ie,
          onCommit: j,
          onError: Ne,
          onSuccess: st,
          can: pe
        },
        ee
      ) }),
      y !== "checkout" && /* @__PURE__ */ o.jsx(
        rE,
        {
          tab: y,
          api: c,
          boot: m,
          workspace: v,
          registerId: l,
          can: pe,
          onError: Ne,
          onSuccess: st,
          onReceipt: $t,
          width: oe,
          setWidth: (Q) => {
            et(Q), localStorage.setItem("rewa-pos-print-width", Q);
          }
        }
      )
    ] }),
    L && /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
      /* @__PURE__ */ o.jsx(
        sE,
        {
          receipt: L,
          duplicate: me,
          width: oe,
          footer: m.settings.receipt_footer || ""
        }
      ),
      /* @__PURE__ */ o.jsxs(
        pn,
        {
          title: me ? "Duplicate receipt" : "Sale recorded",
          onClose: () => ue(null),
          children: [
            /* @__PURE__ */ o.jsxs("div", { className: "sale-success", children: [
              /* @__PURE__ */ o.jsx("span", { className: "success-icon", children: /* @__PURE__ */ o.jsx(B_, { size: 28 }) }),
              /* @__PURE__ */ o.jsx("h3", { children: ct(
                L.total_minor,
                m.currency
              ) }),
              /* @__PURE__ */ o.jsxs("p", { children: [
                L.number,
                " · Order #",
                L.order_id
              ] }),
              /* @__PURE__ */ o.jsx(
                Xe,
                {
                  tone: L.payment_status === "settled" ? "green" : "amber",
                  children: L.payment_status === "settled" ? "Payment settled" : "Payment awaiting verification"
                }
              )
            ] }),
            /* @__PURE__ */ o.jsxs("div", { className: "receipt-preview", children: [
              /* @__PURE__ */ o.jsx("strong", { children: L.store.name }),
              L.lines.map((Q, re) => /* @__PURE__ */ o.jsxs("div", { children: [
                /* @__PURE__ */ o.jsxs("span", { children: [
                  Q.quantity,
                  " ×",
                  " ",
                  Q.name || Q.snapshot?.name
                ] }),
                /* @__PURE__ */ o.jsx("b", { children: ct(
                  Q.total_minor,
                  m.currency
                ) })
              ] }, re))
            ] }),
            /* @__PURE__ */ o.jsx(He, { label: "Paper size", children: /* @__PURE__ */ o.jsxs(
              "select",
              {
                value: oe,
                onChange: (Q) => {
                  et(Q.target.value), localStorage.setItem(
                    "rewa-pos-print-width",
                    Q.target.value
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
              /* @__PURE__ */ o.jsx("button", { className: "secondary", onClick: te, children: "Mark printed" }),
              /* @__PURE__ */ o.jsxs(
                "button",
                {
                  className: "primary",
                  onClick: Y,
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
function _E({
  active: a,
  onCartChange: l,
  api: r,
  boot: c,
  registerId: f,
  online: h,
  scope: m,
  scanRef: v,
  onCommit: y,
  onError: b,
  onSuccess: S,
  can: g,
  workspace: O
}) {
  const U = _r(), M = (Z) => ct(Z, c.currency), [N, A] = H.useState([]), [w, L] = H.useState(""), [ue, me] = H.useState(""), [$, I] = H.useState(""), [W, oe] = H.useState(""), [et, Be] = H.useState(0), [Je, Pe] = H.useState(
    null
  ), [Rt, ln] = H.useState(!1), [$e, V] = H.useState(!1), [ie, ee] = H.useState(!1), [be, pe] = H.useState(null), [Ne, st] = H.useState(null), [$t, j] = H.useState(!1), [Y, te] = H.useState({ id: hi(), revision: 0 }), [G, Q] = H.useState(null), [re, fe] = H.useState(!1), K = H.useRef(Y), se = H.useRef(Promise.resolve()), wt = (Z) => {
    K.current = Z, te(Z);
  }, gn = H.useRef(!1), Ln = H.useRef(Promise.resolve()), Mt = H.useRef(!1), Ge = `rewa-pos:draft:${m}`, Ot = an({
    queryKey: ["shifts", m],
    queryFn: () => r.request("shifts", { web: !0 }),
    enabled: !!f && g("shift:write"),
    refetchInterval: 15e3
  }).data?.data.find(
    (Z) => Z.status === "open" && Z.is_own
  ), un = an({
    queryKey: ["drafts", m],
    queryFn: () => r.request("drafts", { web: !0 }),
    enabled: !!f && g("sale:write")
  }), mt = an({
    queryKey: ["catalog", m, ue, $, W, et],
    queryFn: ({ signal: Z }) => r.request(
      `catalog/search?${zu({ q: ue, category_id: $, brand_id: W, after: et, limit: 48 })}`,
      { signal: Z }
    ),
    enabled: !!f
  }), Dt = H.useMemo(() => {
    try {
      return { ...qS(N, c.max_discount_bps), error: "" };
    } catch (Z) {
      return {
        subtotal_minor: 0,
        tax_minor: 0,
        discount_minor: 0,
        total_minor: 0,
        error: Z.message
      };
    }
  }, [N, c.max_discount_bps]), sa = () => {
    A([]), st(null), Q(null), wt({ id: hi(), revision: 0 }), sessionStorage.removeItem(Ge);
  }, zn = (Z, F) => {
    const xe = K.current.id, ze = se.current.catch(() => {
    }).then(async () => {
      if (xe !== K.current.id)
        throw new Error("The active cart changed before saving.");
      const Ut = await BS(
        r,
        K.current,
        F,
        Z
      );
      return xe === K.current.id && (wt(Ut), sessionStorage.setItem(Ge, Ut.id)), Ut;
    });
    return se.current = ze.then(() => {
    }), ze;
  };
  H.useEffect(() => {
    l(N.length > 0 || !!G);
  }, [N.length, G, l]), H.useEffect(() => {
    const Z = setTimeout(() => {
      me(w), Be(0);
    }, 250);
    return () => clearTimeout(Z);
  }, [w]), H.useEffect(() => {
    v.current?.focus();
  }, []), H.useEffect(() => {
    if (Mt.current || !un.data) return;
    Mt.current = !0;
    const Z = sessionStorage.getItem(Ge), F = un.data.data.find((xe) => xe.id === Z);
    F && (A(F.payload.lines), st(F.payload.customer || null), wt({ id: F.id, revision: F.revision }), Q(F.payload.intent || null), F.payload.intent && V(!0));
  }, [un.data, Ge]), H.useEffect(() => {
    if (!N.length || G || !h || !Mt.current)
      return;
    const Z = setTimeout(() => {
      gn.current || zn({ lines: N, customer: Ne }, Ne?.name || "Current cart").then(
        () => U.invalidateQueries({ queryKey: ["drafts", m] })
      ).catch(b);
    }, 800);
    return () => clearTimeout(Z);
  }, [N, Ne, G, h]), H.useEffect(() => {
    const Z = (F) => {
      a && (F.key === "F2" && (F.preventDefault(), v.current?.focus()), F.key === "F8" && N.length && !G && (F.preventDefault(), V(!0)), F.key === "F4" && !G && (F.preventDefault(), ee(!0)));
    };
    return window.addEventListener("keydown", Z), () => window.removeEventListener("keydown", Z);
  }, [N.length, G, a]);
  const Ba = H.useCallback(
    (Z) => {
      G || (A((F) => {
        const xe = F.findIndex(
          (Ut) => Ut.item.stock_id === Z.stock_id
        ), ze = xe < 0 ? 1 : F[xe].quantity + 1;
        return ze > Z.available_quantity || ze > 1e4 ? (b(
          new Error(
            "There is not enough available stock for this quantity."
          )
        ), F) : xe < 0 ? [...F, { item: Z, quantity: ze, discount_minor: 0 }] : F.map(
          (Ut, Er) => Er === xe ? { ...Ut, item: Z, quantity: ze } : Ut
        );
      }), Pe(null), v.current?.focus());
    },
    [G, b]
  ), bi = (Z) => {
    !Z.trim() || G || (v.current.value = "", Ln.current = Ln.current.then(async () => {
      ln(!0);
      try {
        const F = await Promise.all(
          ["barcode", "sku"].map(
            (ze) => r.request(
              `catalog/search?${zu({ [ze]: Z.trim(), limit: 200 })}`
            )
          )
        ), xe = Array.from(
          new Map(
            F.flatMap((ze) => ze.data).map((ze) => [ze.stock_id, ze])
          ).values()
        );
        if (!xe.length)
          throw new Error(
            `No eligible product matches “${Z}”. Search by name or check Products.`
          );
        if (F.some((ze) => ze.has_more))
          throw new Error(
            "This code matches more than 200 variants. Search by product name and choose an exact variant."
          );
        xe.length === 1 ? Ba(xe[0]) : Pe(xe);
      } catch (F) {
        b(F);
      } finally {
        ln(!1);
      }
    }));
  }, Sl = async () => {
    if (!(!N.length || G || gn.current)) {
      gn.current = !0, fe(!0);
      try {
        await zn(
          { lines: N, customer: Ne },
          Ne?.name || `Held cart · ${(/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
        ), sa(), U.invalidateQueries({ queryKey: ["drafts", m] }), S("Cart held for this cashier and register.");
      } catch (Z) {
        b(Z);
      } finally {
        gn.current = !1, fe(!1);
      }
    }
  }, Cu = async (Z) => {
    if (N.length || G) {
      b(
        new Error(
          "Hold or clear the current cart before resuming another."
        )
      );
      return;
    }
    try {
      let F = Z.payload.lines;
      Z.payload.intent || (F = await Promise.all(
        F.map(async (xe) => {
          const ze = await r.request(
            `catalog/search?stock_id=${xe.item.stock_id}`
          );
          if (!ze.data.length)
            throw new Error(
              `${xe.item.name} is no longer available for POS.`
            );
          return { ...xe, item: ze.data[0] };
        })
      )), A(F), st(Z.payload.customer || null), wt({ id: Z.id, revision: Z.revision }), Q(Z.payload.intent || null), sessionStorage.setItem(Ge, Z.id), ee(!1), Z.payload.intent && V(!0);
    } catch (F) {
      b(F);
    }
  }, En = async () => {
    try {
      const Z = await Promise.all(
        N.map(async (F) => {
          const xe = await r.request(
            `catalog/search?stock_id=${F.item.stock_id}`
          );
          if (!xe.data[0])
            throw new Error(`${F.item.name} is unavailable.`);
          return { ...F, item: xe.data[0] };
        })
      );
      A(Z), S("Cart prices refreshed from your store.");
    } catch (Z) {
      b(Z);
    }
  }, _i = async (Z) => {
    if (!gn.current) {
      gn.current = !0, fe(!0);
      try {
        lE.parse(Z.payload);
        const F = await zn(
          { lines: N, customer: Ne, intent: Z },
          "Checkout awaiting response"
        );
        Q(Z);
        const xe = await LS(r, Z), ze = F;
        sa(), V(!1), r.mutate(
          `drafts/${ze.id}`,
          { revision: ze.revision },
          "DELETE",
          !0
        ).catch(() => {
        }), await y(xe);
      } catch (F) {
        b(F), Uy(F) && Q(null);
      } finally {
        gn.current = !1, fe(!1);
      }
    }
  }, La = (Z, F) => {
    if (G) return;
    const xe = N[Z];
    if (!(F < 1 || F > xe.item.available_quantity))
      try {
        vl({ ...xe, quantity: F }, c.max_discount_bps), A(
          N.map(
            (ze, Ut) => Ut === Z ? { ...ze, quantity: F } : ze
          )
        );
      } catch (ze) {
        b(ze);
      }
  };
  return /* @__PURE__ */ o.jsxs("div", { className: "checkout-layout", children: [
    /* @__PURE__ */ o.jsxs("section", { className: "catalog-panel", children: [
      /* @__PURE__ */ o.jsxs("div", { className: "catalog-tools", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "scan-box", children: [
          /* @__PURE__ */ o.jsx(gS, { size: 22 }),
          /* @__PURE__ */ o.jsx(
            "input",
            {
              ref: v,
              "aria-label": "Scan barcode or SKU",
              placeholder: "Scan a barcode or SKU",
              autoComplete: "off",
              disabled: !!G || !h,
              onKeyDown: (Z) => {
                (Z.key === "Enter" || Z.key === "Tab") && Z.currentTarget.value && (Z.preventDefault(), bi(Z.currentTarget.value));
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
              value: w,
              onChange: (Z) => L(Z.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "filters", children: [
          /* @__PURE__ */ o.jsxs(
            "select",
            {
              "aria-label": "Category",
              value: $,
              onChange: (Z) => {
                I(Z.target.value), Be(0);
              },
              children: [
                /* @__PURE__ */ o.jsx("option", { value: "", children: "All categories" }),
                O.categories.map((Z) => /* @__PURE__ */ o.jsx("option", { value: Z.id, children: Z.name }, Z.id))
              ]
            }
          ),
          /* @__PURE__ */ o.jsxs(
            "select",
            {
              "aria-label": "Brand",
              value: W,
              onChange: (Z) => {
                oe(Z.target.value), Be(0);
              },
              children: [
                /* @__PURE__ */ o.jsx("option", { value: "", children: "All brands" }),
                O.brands.map((Z) => /* @__PURE__ */ o.jsx("option", { value: Z.id, children: Z.name }, Z.id))
              ]
            }
          ),
          /* @__PURE__ */ o.jsx("span", { children: Rt ? "Looking up scan…" : `${mt.data?.data.length || 0} variants` })
        ] })
      ] }),
      /* @__PURE__ */ o.jsxs("div", { className: "catalog-grid-wrap", children: [
        mt.isPending ? /* @__PURE__ */ o.jsx(yi, {}) : mt.error ? /* @__PURE__ */ o.jsx(
          la,
          {
            title: "Catalog unavailable",
            text: mt.error.message
          }
        ) : mt.data?.data.length ? /* @__PURE__ */ o.jsx("div", { className: "product-grid", children: mt.data.data.map((Z, F) => /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "product-card",
            onClick: () => Ba(Z),
            disabled: Z.available_quantity < 1 || !!G,
            children: [
              /* @__PURE__ */ o.jsxs(
                "div",
                {
                  className: `product-art art-${F % 5}`,
                  children: [
                    Z.image_url ? /* @__PURE__ */ o.jsx(
                      "img",
                      {
                        src: Z.image_url,
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
                    /* @__PURE__ */ o.jsx("span", { children: Z.unit || "piece" }),
                    Z.promotion_minor > 0 && /* @__PURE__ */ o.jsx(Xe, { tone: "amber", children: "Offer" })
                  ]
                }
              ),
              /* @__PURE__ */ o.jsxs("div", { className: "product-copy", children: [
                /* @__PURE__ */ o.jsx("strong", { children: Z.name }),
                /* @__PURE__ */ o.jsx("small", { children: Z.variant || Z.sku || `Variant #${Z.stock_id}` }),
                /* @__PURE__ */ o.jsxs("div", { children: [
                  /* @__PURE__ */ o.jsx("b", { children: M(Z.unit_price_minor) }),
                  /* @__PURE__ */ o.jsx(
                    "span",
                    {
                      className: Z.available_quantity < 1 ? "stock-out" : "",
                      children: Z.available_quantity > 0 ? `${Z.available_quantity} left` : "Out of stock"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ o.jsx("span", { className: "product-add", children: /* @__PURE__ */ o.jsx(Za, { size: 14 }) })
            ]
          },
          Z.stock_id
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
            onClick: () => Be(mt.data.next_after),
            children: [
              "Next products ",
              /* @__PURE__ */ o.jsx(Q_, { size: 16 })
            ]
          }
        ),
        et > 0 && /* @__PURE__ */ o.jsx(
          "button",
          {
            className: "load-more",
            onClick: () => Be(0),
            children: "Back to first page"
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs("footer", { className: "catalog-footer", children: [
        /* @__PURE__ */ o.jsx(I_, { size: 15 }),
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
            /* @__PURE__ */ o.jsx(Xe, { children: N.reduce((Z, F) => Z + F.quantity, 0) })
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
            disabled: !!G || !N.length,
            onClick: () => {
              confirm("Clear this unsaved cart?") && sa();
            },
            children: /* @__PURE__ */ o.jsx(NS, { size: 18 })
          }
        )
      ] }),
      /* @__PURE__ */ o.jsxs(
        "button",
        {
          className: "customer-button",
          onClick: () => j(!0),
          disabled: !!G,
          children: [
            /* @__PURE__ */ o.jsx("span", { className: "avatar", children: Ne?.name.charAt(0) || "W" }),
            /* @__PURE__ */ o.jsxs("span", { children: [
              /* @__PURE__ */ o.jsx("strong", { children: Ne?.name || "Walk-in customer" }),
              /* @__PURE__ */ o.jsx("small", { children: Ne ? "Receipt contact saved" : "Add receipt contact · optional" })
            ] }),
            /* @__PURE__ */ o.jsx(Za, { size: 17 })
          ]
        }
      ),
      /* @__PURE__ */ o.jsx("div", { className: "cart-lines", children: N.length ? N.map((Z, F) => /* @__PURE__ */ o.jsxs("div", { className: "cart-line", children: [
        /* @__PURE__ */ o.jsxs("div", { className: "line-info", children: [
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              className: "line-name",
              onClick: () => pe(F),
              disabled: !!G,
              children: [
                /* @__PURE__ */ o.jsx("strong", { children: Z.item.name }),
                /* @__PURE__ */ o.jsx("small", { children: Z.item.variant || Z.item.sku })
              ]
            }
          ),
          /* @__PURE__ */ o.jsx(
            "button",
            {
              className: "icon-button",
              "aria-label": `Remove ${Z.item.name}`,
              disabled: !!G,
              onClick: () => A(
                N.filter(
                  (xe, ze) => ze !== F
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
                "aria-label": `Decrease ${Z.item.name}`,
                disabled: !!G || Z.quantity === 1,
                onClick: () => La(
                  F,
                  Z.quantity - 1
                ),
                children: /* @__PURE__ */ o.jsx(eS, { size: 13 })
              }
            ),
            /* @__PURE__ */ o.jsx(
              "input",
              {
                "aria-label": `Quantity ${Z.item.name}`,
                inputMode: "numeric",
                value: Z.quantity,
                disabled: !!G,
                onChange: (xe) => La(
                  F,
                  Number(xe.target.value)
                )
              }
            ),
            /* @__PURE__ */ o.jsx(
              "button",
              {
                "aria-label": `Increase ${Z.item.name}`,
                disabled: !!G,
                onClick: () => La(
                  F,
                  Z.quantity + 1
                ),
                children: /* @__PURE__ */ o.jsx(Za, { size: 13 })
              }
            )
          ] }),
          /* @__PURE__ */ o.jsxs("small", { children: [
            M(
              Z.override_minor ?? Z.item.unit_price_minor
            ),
            " ",
            "each"
          ] }),
          /* @__PURE__ */ o.jsx("b", { children: M(vl(Z).total_minor) })
        ] }),
        Z.discount_minor > 0 && /* @__PURE__ */ o.jsxs("small", { className: "line-discount", children: [
          "Discount -",
          M(Z.discount_minor)
        ] })
      ] }, Z.item.stock_id)) : /* @__PURE__ */ o.jsx(
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
          /* @__PURE__ */ o.jsx("span", { children: M(Dt.subtotal_minor) })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "total-row", children: [
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              className: "text-button",
              disabled: !g("discount:write") || !!G || !N.length,
              onClick: () => {
                const Z = prompt(
                  "Cart discount amount (replaces line discounts)"
                );
                if (Z != null)
                  try {
                    A(
                      HS(
                        N,
                        kn(Z),
                        c.max_discount_bps
                      )
                    );
                  } catch (F) {
                    b(F);
                  }
              },
              children: [
                "Discount",
                " ",
                g("discount:write") && /* @__PURE__ */ o.jsx(Za, { size: 12 })
              ]
            }
          ),
          /* @__PURE__ */ o.jsxs("span", { children: [
            "-",
            M(Dt.discount_minor)
          ] })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "total-row", children: [
          /* @__PURE__ */ o.jsxs("span", { children: [
            "Tax",
            " ",
            c.settings.tax_inclusive ? "(included)" : ""
          ] }),
          /* @__PURE__ */ o.jsx("span", { children: M(Dt.tax_minor) })
        ] }),
        /* @__PURE__ */ o.jsxs("div", { className: "total-due", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Total due" }),
          /* @__PURE__ */ o.jsx("strong", { children: M(Dt.total_minor) })
        ] }),
        Dt.error && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: Dt.error }),
        G && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: "Checkout awaiting acknowledgment. Retry its saved identity before starting another sale." }),
        /* @__PURE__ */ o.jsxs("div", { className: "cart-actions", children: [
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              className: "secondary",
              disabled: re || !!G || !N.length || !h,
              onClick: Sl,
              children: [
                /* @__PURE__ */ o.jsx(sS, { size: 15 }),
                " Hold"
              ]
            }
          ),
          /* @__PURE__ */ o.jsxs(
            "button",
            {
              className: "secondary",
              onClick: () => ee(!0),
              disabled: !!G,
              children: [
                /* @__PURE__ */ o.jsx(kp, { size: 15 }),
                " Held",
                " ",
                /* @__PURE__ */ o.jsx(Xe, { children: un.data?.data.length || 0 })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ o.jsxs(
          "button",
          {
            className: "pay-button",
            disabled: re || !h || !G && (!Ot || !N.length || !!Dt.error || !g("sale:write")),
            onClick: () => V(!0),
            children: [
              /* @__PURE__ */ o.jsx(V_, { size: 19 }),
              /* @__PURE__ */ o.jsx("span", { children: G ? "Resolve checkout" : "Take payment" }),
              /* @__PURE__ */ o.jsx("kbd", { children: "F8" })
            ]
          }
        )
      ] })
    ] }),
    Je && /* @__PURE__ */ o.jsxs(
      pn,
      {
        title: "Choose the exact variant",
        onClose: () => Pe(null),
        children: [
          /* @__PURE__ */ o.jsx("p", { className: "hint", children: "This code matches more than one stock variant." }),
          /* @__PURE__ */ o.jsx("div", { className: "option-list", children: Je.map((Z) => /* @__PURE__ */ o.jsxs(
            "button",
            {
              onClick: () => Ba(Z),
              disabled: Z.available_quantity < 1,
              children: [
                /* @__PURE__ */ o.jsxs("div", { children: [
                  /* @__PURE__ */ o.jsx("strong", { children: Z.name }),
                  /* @__PURE__ */ o.jsxs("small", { children: [
                    Z.variant || Z.sku,
                    " · #",
                    Z.stock_id
                  ] })
                ] }),
                /* @__PURE__ */ o.jsx("b", { children: M(Z.unit_price_minor) }),
                /* @__PURE__ */ o.jsxs(Xe, { children: [
                  Z.available_quantity,
                  " left"
                ] })
              ]
            },
            Z.stock_id
          )) })
        ]
      }
    ),
    ie && /* @__PURE__ */ o.jsx(pn, { title: "Held carts", onClose: () => ee(!1), children: un.data?.data.length ? /* @__PURE__ */ o.jsx("div", { className: "option-list", children: un.data.data.map((Z) => /* @__PURE__ */ o.jsxs(
      "button",
      {
        onClick: () => Cu(Z),
        children: [
          /* @__PURE__ */ o.jsxs("div", { children: [
            /* @__PURE__ */ o.jsx("strong", { children: Z.label }),
            /* @__PURE__ */ o.jsxs("small", { children: [
              Z.payload.lines.length,
              " lines ·",
              " ",
              new Date(
                Z.updated_at
              ).toLocaleString()
            ] })
          ] }),
          Z.payload.intent && /* @__PURE__ */ o.jsx(Xe, { tone: "amber", children: "Awaiting response" }),
          /* @__PURE__ */ o.jsx(kp, { size: 16 })
        ]
      },
      Z.id
    )) }) : /* @__PURE__ */ o.jsx(
      la,
      {
        title: "No held carts",
        text: "Hold a cart to come back to it later."
      }
    ) }),
    $t && /* @__PURE__ */ o.jsx(
      SE,
      {
        value: Ne,
        onClose: () => j(!1),
        onSave: (Z) => {
          st(Z), j(!1);
        }
      }
    ),
    be !== null && /* @__PURE__ */ o.jsx(
      xE,
      {
        line: N[be],
        can: g,
        limit: c.max_discount_bps,
        onClose: () => pe(null),
        onSave: (Z) => {
          A(
            N.map(
              (F, xe) => xe === be ? Z : F
            )
          ), pe(null);
        }
      }
    ),
    $e && /* @__PURE__ */ o.jsx(
      jE,
      {
        total: Dt.total_minor,
        currency: c.currency,
        intent: G,
        busy: re,
        online: h,
        onClose: () => V(!1),
        onPay: (Z) => {
          if (G) {
            _i(G);
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
              lines: kS(N, c.max_discount_bps),
              tenders: Z,
              ...Ne ? { customer: Ne } : {}
            }
          });
        },
        onRefresh: En
      }
    )
  ] });
}
function SE({
  value: a,
  onClose: l,
  onSave: r
}) {
  const [c, f] = H.useState(a?.name || ""), [h, m] = H.useState(a?.email || ""), [v, y] = H.useState(a?.phone || "");
  return /* @__PURE__ */ o.jsxs(pn, { title: "Receipt contact", onClose: l, children: [
    /* @__PURE__ */ o.jsx("p", { className: "hint", children: "Optional contact details. Walk-in sales need no address or customer account." }),
    /* @__PURE__ */ o.jsxs(
      "form",
      {
        onSubmit: (b) => {
          b.preventDefault(), r({
            name: c,
            ...h ? { email: h } : {},
            ...v ? { phone: v } : {}
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
              value: v,
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
                onClick: () => r(null),
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
function xE({
  line: a,
  can: l,
  limit: r,
  onClose: c,
  onSave: f
}) {
  const [h, m] = H.useState(hl(a.discount_minor)), [v, y] = H.useState(
    hl(a.override_minor ?? a.item.unit_price_minor)
  ), [b, S] = H.useState(a.override_reason || ""), [g, O] = H.useState("");
  return /* @__PURE__ */ o.jsxs(pn, { title: a.item.name, onClose: c, children: [
    /* @__PURE__ */ o.jsxs("p", { className: "hint", children: [
      a.item.variant || a.item.sku,
      " · Quantity ",
      a.quantity,
      " ",
      "· Discount limit ",
      r / 100,
      "%"
    ] }),
    /* @__PURE__ */ o.jsxs(
      "form",
      {
        onSubmit: (U) => {
          U.preventDefault();
          try {
            const M = kn(v), N = {
              ...a,
              discount_minor: kn(h),
              ...M !== a.item.unit_price_minor ? {
                override_minor: M,
                override_reason: b
              } : {
                override_minor: void 0,
                override_reason: void 0
              }
            };
            if (N.override_minor !== void 0 && b.length < 3)
              throw new Error("Explain the price override.");
            vl(N, r), f(N);
          } catch (M) {
            O(M.message);
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
              value: v,
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
function jE({
  total: a,
  currency: l,
  intent: r,
  busy: c,
  online: f,
  onClose: h,
  onPay: m,
  onRefresh: v
}) {
  const [y, b] = H.useState([
    {
      method: "cash",
      amount: hl(a),
      received: hl(a),
      reference: ""
    }
  ]), [S, g] = H.useState(""), O = (A, w) => b(
    y.map((L, ue) => ue === A ? { ...L, ...w } : L)
  );
  let U = 0, M = 0;
  try {
    for (const A of y)
      U += kn(A.amount), A.method === "cash" && (M += Math.max(
        0,
        kn(A.received) - kn(A.amount)
      ));
  } catch {
  }
  const N = () => {
    try {
      if (r) {
        m(r.payload.tenders);
        return;
      }
      const A = y.map((w) => {
        const L = kn(w.amount);
        if (L <= 0)
          throw new Error("Tender amounts must be positive.");
        if (w.method === "cash") {
          const ue = kn(w.received);
          if (ue < L)
            throw new Error(
              "Cash received is below the cash tender."
            );
          return {
            method: w.method,
            currency: l,
            amount_minor: L,
            received_minor: ue,
            change_minor: ue - L
          };
        }
        if (w.reference.trim().length < 3)
          throw new Error(
            "Enter the external terminal or transfer reference."
          );
        return {
          method: w.method,
          currency: l,
          amount_minor: L,
          reference: w.reference.trim()
        };
      });
      if (A.reduce((w, L) => w + L.amount_minor, 0) !== a)
        throw new Error(
          "Split tender amounts must equal the total due."
        );
      g(""), m(A);
    } catch (A) {
      g(A.message);
    }
  };
  return /* @__PURE__ */ o.jsxs(
    pn,
    {
      title: r ? "Resolve saved checkout" : "Take payment",
      onClose: h,
      children: [
        /* @__PURE__ */ o.jsxs("div", { className: "payment-total", children: [
          /* @__PURE__ */ o.jsx("span", { children: "Total due" }),
          /* @__PURE__ */ o.jsx("strong", { children: ct(
            r?.payload.grand_total_minor ?? a,
            l
          ) })
        ] }),
        r ? /* @__PURE__ */ o.jsxs("div", { className: "pending-intent", children: [
          /* @__PURE__ */ o.jsx(Xe, { tone: "amber", children: "Identity saved" }),
          /* @__PURE__ */ o.jsx("p", { children: "The previous response may have been lost. Retry this exact sale to retrieve its recorded result or complete it once." }),
          /* @__PURE__ */ o.jsx("code", { children: r.payload.client_sale_id })
        ] }) : /* @__PURE__ */ o.jsxs(o.Fragment, { children: [
          /* @__PURE__ */ o.jsx("div", { className: "tender-list", children: y.map((A, w) => /* @__PURE__ */ o.jsxs("div", { className: "tender-row", children: [
            /* @__PURE__ */ o.jsxs("div", { className: "tender-heading", children: [
              /* @__PURE__ */ o.jsxs("strong", { children: [
                "Tender ",
                w + 1
              ] }),
              y.length > 1 && /* @__PURE__ */ o.jsx(
                "button",
                {
                  className: "icon-button",
                  "aria-label": "Remove tender",
                  onClick: () => b(
                    y.filter(
                      (L, ue) => ue !== w
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
                onChange: (L) => O(w, {
                  method: L.target.value
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
                  "aria-label": `Tender ${w + 1} amount`,
                  inputMode: "decimal",
                  value: A.amount,
                  onChange: (L) => O(w, {
                    amount: L.target.value
                  })
                }
              ) }),
              A.method === "cash" ? /* @__PURE__ */ o.jsx(He, { label: "Cash received", children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  "aria-label": `Tender ${w + 1} cash received`,
                  inputMode: "decimal",
                  value: A.received,
                  onChange: (L) => O(w, {
                    received: L.target.value
                  })
                }
              ) }) : /* @__PURE__ */ o.jsx(He, { label: "Payment reference", children: /* @__PURE__ */ o.jsx(
                "input",
                {
                  value: A.reference,
                  onChange: (L) => O(w, {
                    reference: L.target.value
                  }),
                  maxLength: 100
                }
              ) })
            ] }),
            A.method !== "cash" && /* @__PURE__ */ o.jsx("p", { className: "hint amber-text", children: "Recorded as pending. A supervisor must verify settlement evidence in Sales." })
          ] }, w)) }),
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
                /* @__PURE__ */ o.jsx(Za, { size: 15 }),
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
              /* @__PURE__ */ o.jsx("b", { children: ct(M, l) })
            ] })
          ] })
        ] }),
        S && /* @__PURE__ */ o.jsx("p", { className: "error-text", children: S }),
        /* @__PURE__ */ o.jsxs("div", { className: "modal-actions", children: [
          !r && /* @__PURE__ */ o.jsx(
            "button",
            {
              className: "secondary",
              disabled: c,
              onClick: () => {
                v(), h();
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
              children: c ? "Recording sale…" : r ? "Retry saved checkout" : "Record sale"
            }
          )
        ] })
      ]
    }
  );
}
Hb.createRoot(document.getElementById("rewa-pos-root")).render(
  /* @__PURE__ */ o.jsx(H.StrictMode, { children: /* @__PURE__ */ o.jsx(Bb, { client: gE, children: /* @__PURE__ */ o.jsx(bE, {}) }) })
);
