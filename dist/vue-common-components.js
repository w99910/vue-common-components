function Kr(e, t) {
  const n = /* @__PURE__ */ Object.create(null), o = e.split(",");
  for (let r = 0; r < o.length; r++)
    n[o[r]] = !0;
  return t ? (r) => !!n[r.toLowerCase()] : (r) => !!n[r];
}
function ct(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], r = A(o) ? Jr(o) : ct(o);
      if (r)
        for (const s in r)
          t[s] = r[s];
    }
    return t;
  } else {
    if (A(e))
      return e;
    if (T(e))
      return e;
  }
}
const Ur = /;(?![^(]*\))/g, Wr = /:([^]+)/, qr = /\/\*.*?\*\//gs;
function Jr(e) {
  const t = {};
  return e.replace(qr, "").split(Ur).forEach((n) => {
    if (n) {
      const o = n.split(Wr);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function he(e) {
  let t = "";
  if (A(e))
    t = e;
  else if (N(e))
    for (let n = 0; n < e.length; n++) {
      const o = he(e[n]);
      o && (t += o + " ");
    }
  else if (T(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Yr = (e) => A(e) ? e : e == null ? "" : N(e) || T(e) && (e.toString === Fn || !S(e.toString)) ? JSON.stringify(e, $n, 2) : String(e), $n = (e, t) => t && t.__v_isRef ? $n(e, t.value) : ue(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [o, r]) => (n[`${o} =>`] = r, n), {})
} : An(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : T(t) && !N(t) && !jn(t) ? String(t) : t, q = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, Gr = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Ye = () => {
}, Zr = /^on[^a-z]/, Qr = (e) => Zr.test(e), K = Object.assign, Xr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, eo = Object.prototype.hasOwnProperty, V = (e, t) => eo.call(e, t), N = Array.isArray, ue = (e) => at(e) === "[object Map]", An = (e) => at(e) === "[object Set]", S = (e) => typeof e == "function", A = (e) => typeof e == "string", Pt = (e) => typeof e == "symbol", T = (e) => e !== null && typeof e == "object", to = (e) => T(e) && S(e.then) && S(e.catch), Fn = Object.prototype.toString, at = (e) => Fn.call(e), Ln = (e) => at(e).slice(8, -1), jn = (e) => at(e) === "[object Object]", Rt = (e) => A(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, $t = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, no = /-(\w)/g, Qe = $t((e) => e.replace(no, (t, n) => n ? n.toUpperCase() : "")), Re = $t((e) => e.charAt(0).toUpperCase() + e.slice(1)), ro = $t((e) => e ? `on${Re(e)}` : ""), $e = (e, t) => !Object.is(e, t), oo = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, so = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, dn = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let pn;
const io = () => pn || (pn = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function hn(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let kn;
function co(e, t = kn) {
  t && t.active && t.effects.push(e);
}
function ao() {
  return kn;
}
const Ae = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Bn = (e) => (e.w & re) > 0, zn = (e) => (e.n & re) > 0, uo = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= re;
}, lo = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      Bn(r) && !zn(r) ? r.delete(e) : t[n++] = r, r.w &= ~re, r.n &= ~re;
    }
    t.length = n;
  }
}, xt = /* @__PURE__ */ new WeakMap();
let Ve = 0, re = 1;
const Nt = 30;
let M;
const le = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Ot = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class fo {
  constructor(t, n = null, o) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, co(this, o);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = M, n = te;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = M, M = this, te = !0, re = 1 << ++Ve, Ve <= Nt ? uo(this) : gn(this), this.fn();
    } finally {
      Ve <= Nt && lo(this), re = 1 << --Ve, M = this.parent, te = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    M === this ? this.deferStop = !0 : this.active && (gn(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function gn(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let te = !0;
const Hn = [];
function At() {
  Hn.push(te), te = !1;
}
function Ft() {
  const e = Hn.pop();
  te = e === void 0 ? !0 : e;
}
function F(e, t, n) {
  if (te && M) {
    let o = xt.get(e);
    o || xt.set(e, o = /* @__PURE__ */ new Map());
    let r = o.get(n);
    r || o.set(n, r = Ae());
    const s = process.env.NODE_ENV !== "production" ? { effect: M, target: e, type: t, key: n } : void 0;
    St(r, s);
  }
}
function St(e, t) {
  let n = !1;
  Ve <= Nt ? zn(e) || (e.n |= re, n = !Bn(e)) : n = !e.has(M), n && (e.add(M), M.deps.push(e), process.env.NODE_ENV !== "production" && M.onTrack && M.onTrack(Object.assign({ effect: M }, t)));
}
function oe(e, t, n, o, r, s) {
  const i = xt.get(e);
  if (!i)
    return;
  let a = [];
  if (t === "clear")
    a = [...i.values()];
  else if (n === "length" && N(e)) {
    const d = Number(o);
    i.forEach((l, u) => {
      (u === "length" || u >= d) && a.push(l);
    });
  } else
    switch (n !== void 0 && a.push(i.get(n)), t) {
      case "add":
        N(e) ? Rt(n) && a.push(i.get("length")) : (a.push(i.get(le)), ue(e) && a.push(i.get(Ot)));
        break;
      case "delete":
        N(e) || (a.push(i.get(le)), ue(e) && a.push(i.get(Ot)));
        break;
      case "set":
        ue(e) && a.push(i.get(le));
        break;
    }
  const c = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: o, oldValue: r, oldTarget: s } : void 0;
  if (a.length === 1)
    a[0] && (process.env.NODE_ENV !== "production" ? ye(a[0], c) : ye(a[0]));
  else {
    const d = [];
    for (const l of a)
      l && d.push(...l);
    process.env.NODE_ENV !== "production" ? ye(Ae(d), c) : ye(Ae(d));
  }
}
function ye(e, t) {
  const n = N(e) ? e : [...e];
  for (const o of n)
    o.computed && vn(o, t);
  for (const o of n)
    o.computed || vn(o, t);
}
function vn(e, t) {
  (e !== M || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(K({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const po = /* @__PURE__ */ Kr("__proto__,__v_isRef,__isVue"), Kn = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Pt)
), ho = /* @__PURE__ */ Lt(), go = /* @__PURE__ */ Lt(!0), vo = /* @__PURE__ */ Lt(!0, !0), mn = /* @__PURE__ */ mo();
function mo() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const o = b(this);
      for (let s = 0, i = this.length; s < i; s++)
        F(o, "get", s + "");
      const r = o[t](...n);
      return r === -1 || r === !1 ? o[t](...n.map(b)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      At();
      const o = b(this)[t].apply(this, n);
      return Ft(), o;
    };
  }), e;
}
function _o(e) {
  const t = b(this);
  return F(t, "has", e), t.hasOwnProperty(e);
}
function Lt(e = !1, t = !1) {
  return function(o, r, s) {
    if (r === "__v_isReactive")
      return !e;
    if (r === "__v_isReadonly")
      return e;
    if (r === "__v_isShallow")
      return t;
    if (r === "__v_raw" && s === (e ? t ? Yn : Jn : t ? Ro : qn).get(o))
      return o;
    const i = N(o);
    if (!e) {
      if (i && V(mn, r))
        return Reflect.get(mn, r, s);
      if (r === "hasOwnProperty")
        return _o;
    }
    const a = Reflect.get(o, r, s);
    return (Pt(r) ? Kn.has(r) : po(r)) || (e || F(o, "get", r), t) ? a : P(a) ? i && Rt(r) ? a : a.value : T(a) ? e ? Gn(a) : Bt(a) : a;
  };
}
const yo = /* @__PURE__ */ Eo();
function Eo(e = !1) {
  return function(n, o, r, s) {
    let i = n[o];
    if (se(i) && P(i) && !P(r))
      return !1;
    if (!e && (!Xe(r) && !se(r) && (i = b(i), r = b(r)), !N(n) && P(i) && !P(r)))
      return i.value = r, !0;
    const a = N(n) && Rt(o) ? Number(o) < n.length : V(n, o), c = Reflect.set(n, o, r, s);
    return n === b(s) && (a ? $e(r, i) && oe(n, "set", o, r, i) : oe(n, "add", o, r)), c;
  };
}
function bo(e, t) {
  const n = V(e, t), o = e[t], r = Reflect.deleteProperty(e, t);
  return r && n && oe(e, "delete", t, void 0, o), r;
}
function wo(e, t) {
  const n = Reflect.has(e, t);
  return (!Pt(t) || !Kn.has(t)) && F(e, "has", t), n;
}
function xo(e) {
  return F(e, "iterate", N(e) ? "length" : le), Reflect.ownKeys(e);
}
const No = {
  get: ho,
  set: yo,
  deleteProperty: bo,
  has: wo,
  ownKeys: xo
}, Un = {
  get: go,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && hn(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && hn(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Oo = /* @__PURE__ */ K({}, Un, {
  get: vo
}), jt = (e) => e, ut = (e) => Reflect.getPrototypeOf(e);
function ze(e, t, n = !1, o = !1) {
  e = e.__v_raw;
  const r = b(e), s = b(t);
  n || (t !== s && F(r, "get", t), F(r, "get", s));
  const { has: i } = ut(r), a = o ? jt : n ? Ht : Fe;
  if (i.call(r, t))
    return a(e.get(t));
  if (i.call(r, s))
    return a(e.get(s));
  e !== r && e.get(t);
}
function He(e, t = !1) {
  const n = this.__v_raw, o = b(n), r = b(e);
  return t || (e !== r && F(o, "has", e), F(o, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function Ke(e, t = !1) {
  return e = e.__v_raw, !t && F(b(e), "iterate", le), Reflect.get(e, "size", e);
}
function _n(e) {
  e = b(e);
  const t = b(this);
  return ut(t).has.call(t, e) || (t.add(e), oe(t, "add", e, e)), this;
}
function yn(e, t) {
  t = b(t);
  const n = b(this), { has: o, get: r } = ut(n);
  let s = o.call(n, e);
  s ? process.env.NODE_ENV !== "production" && Wn(n, o, e) : (e = b(e), s = o.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), s ? $e(t, i) && oe(n, "set", e, t, i) : oe(n, "add", e, t), this;
}
function En(e) {
  const t = b(this), { has: n, get: o } = ut(t);
  let r = n.call(t, e);
  r ? process.env.NODE_ENV !== "production" && Wn(t, n, e) : (e = b(e), r = n.call(t, e));
  const s = o ? o.call(t, e) : void 0, i = t.delete(e);
  return r && oe(t, "delete", e, void 0, s), i;
}
function bn() {
  const e = b(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? ue(e) ? new Map(e) : new Set(e) : void 0, o = e.clear();
  return t && oe(e, "clear", void 0, void 0, n), o;
}
function Ue(e, t) {
  return function(o, r) {
    const s = this, i = s.__v_raw, a = b(i), c = t ? jt : e ? Ht : Fe;
    return !e && F(a, "iterate", le), i.forEach((d, l) => o.call(r, c(d), c(l), s));
  };
}
function We(e, t, n) {
  return function(...o) {
    const r = this.__v_raw, s = b(r), i = ue(s), a = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, d = r[e](...o), l = n ? jt : t ? Ht : Fe;
    return !t && F(s, "iterate", c ? Ot : le), {
      // iterator protocol
      next() {
        const { value: u, done: f } = d.next();
        return f ? { value: u, done: f } : {
          value: a ? [l(u[0]), l(u[1])] : l(u),
          done: f
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Q(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${Re(e)} operation ${n}failed: target is readonly.`, b(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function So() {
  const e = {
    get(s) {
      return ze(this, s);
    },
    get size() {
      return Ke(this);
    },
    has: He,
    add: _n,
    set: yn,
    delete: En,
    clear: bn,
    forEach: Ue(!1, !1)
  }, t = {
    get(s) {
      return ze(this, s, !1, !0);
    },
    get size() {
      return Ke(this);
    },
    has: He,
    add: _n,
    set: yn,
    delete: En,
    clear: bn,
    forEach: Ue(!1, !0)
  }, n = {
    get(s) {
      return ze(this, s, !0);
    },
    get size() {
      return Ke(this, !0);
    },
    has(s) {
      return He.call(this, s, !0);
    },
    add: Q(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Q(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Q(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Q(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Ue(!0, !1)
  }, o = {
    get(s) {
      return ze(this, s, !0, !0);
    },
    get size() {
      return Ke(this, !0);
    },
    has(s) {
      return He.call(this, s, !0);
    },
    add: Q(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Q(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Q(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Q(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Ue(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = We(s, !1, !1), n[s] = We(s, !0, !1), t[s] = We(s, !1, !0), o[s] = We(s, !0, !0);
  }), [
    e,
    n,
    t,
    o
  ];
}
const [Co, Do, Vo, To] = /* @__PURE__ */ So();
function kt(e, t) {
  const n = t ? e ? To : Vo : e ? Do : Co;
  return (o, r, s) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? o : Reflect.get(V(n, r) && r in o ? n : o, r, s);
}
const Io = {
  get: /* @__PURE__ */ kt(!1, !1)
}, Mo = {
  get: /* @__PURE__ */ kt(!0, !1)
}, Po = {
  get: /* @__PURE__ */ kt(!0, !0)
};
function Wn(e, t, n) {
  const o = b(n);
  if (o !== n && t.call(e, o)) {
    const r = Ln(e);
    console.warn(`Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const qn = /* @__PURE__ */ new WeakMap(), Ro = /* @__PURE__ */ new WeakMap(), Jn = /* @__PURE__ */ new WeakMap(), Yn = /* @__PURE__ */ new WeakMap();
function $o(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ao(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : $o(Ln(e));
}
function Bt(e) {
  return se(e) ? e : zt(e, !1, No, Io, qn);
}
function Gn(e) {
  return zt(e, !0, Un, Mo, Jn);
}
function qe(e) {
  return zt(e, !0, Oo, Po, Yn);
}
function zt(e, t, n, o, r) {
  if (!T(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = r.get(e);
  if (s)
    return s;
  const i = Ao(e);
  if (i === 0)
    return e;
  const a = new Proxy(e, i === 2 ? o : n);
  return r.set(e, a), a;
}
function fe(e) {
  return se(e) ? fe(e.__v_raw) : !!(e && e.__v_isReactive);
}
function se(e) {
  return !!(e && e.__v_isReadonly);
}
function Xe(e) {
  return !!(e && e.__v_isShallow);
}
function Ct(e) {
  return fe(e) || se(e);
}
function b(e) {
  const t = e && e.__v_raw;
  return t ? b(t) : e;
}
function Fo(e) {
  return so(e, "__v_skip", !0), e;
}
const Fe = (e) => T(e) ? Bt(e) : e, Ht = (e) => T(e) ? Gn(e) : e;
function Lo(e) {
  te && M && (e = b(e), process.env.NODE_ENV !== "production" ? St(e.dep || (e.dep = Ae()), {
    target: e,
    type: "get",
    key: "value"
  }) : St(e.dep || (e.dep = Ae())));
}
function jo(e, t) {
  e = b(e);
  const n = e.dep;
  n && (process.env.NODE_ENV !== "production" ? ye(n, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : ye(n));
}
function P(e) {
  return !!(e && e.__v_isRef === !0);
}
function j(e) {
  return ko(e, !1);
}
function ko(e, t) {
  return P(e) ? e : new Bo(e, t);
}
class Bo {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : b(t), this._value = n ? t : Fe(t);
  }
  get value() {
    return Lo(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Xe(t) || se(t);
    t = n ? t : b(t), $e(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Fe(t), jo(this, t));
  }
}
function Kt(e) {
  return P(e) ? e.value : e;
}
const zo = {
  get: (e, t, n) => Kt(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const r = e[t];
    return P(r) && !P(n) ? (r.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function Ho(e) {
  return fe(e) ? e : new Proxy(e, zo);
}
const de = [];
function Ko(e) {
  de.push(e);
}
function Uo() {
  de.pop();
}
function x(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  At();
  const n = de.length ? de[de.length - 1].component : null, o = n && n.appContext.config.warnHandler, r = Wo();
  if (o)
    pe(o, n, 11, [
      e + t.join(""),
      n && n.proxy,
      r.map(({ vnode: s }) => `at <${gr(n, s.type)}>`).join(`
`),
      r
    ]);
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    r.length && s.push(`
`, ...qo(r)), console.warn(...s);
  }
  Ft();
}
function Wo() {
  let e = de[de.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const o = e.component && e.component.parent;
    e = o && o.vnode;
  }
  return t;
}
function qo(e) {
  const t = [];
  return e.forEach((n, o) => {
    t.push(...o === 0 ? [] : [`
`], ...Jo(n));
  }), t;
}
function Jo({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", o = e.component ? e.component.parent == null : !1, r = ` at <${gr(e.component, e.type, o)}`, s = ">" + n;
  return e.props ? [r, ...Yo(e.props), s] : [r + s];
}
function Yo(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((o) => {
    t.push(...Zn(o, e[o]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Zn(e, t, n) {
  return A(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : P(t) ? (t = Zn(e, b(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : S(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = b(t), n ? t : [`${e}=`, t]);
}
const Ut = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function pe(e, t, n, o) {
  let r;
  try {
    r = o ? e(...o) : e();
  } catch (s) {
    Wt(s, t, n);
  }
  return r;
}
function Te(e, t, n, o) {
  if (S(e)) {
    const s = pe(e, t, n, o);
    return s && to(s) && s.catch((i) => {
      Wt(i, t, n);
    }), s;
  }
  const r = [];
  for (let s = 0; s < e.length; s++)
    r.push(Te(e[s], t, n, o));
  return r;
}
function Wt(e, t, n, o = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const i = t.proxy, a = process.env.NODE_ENV !== "production" ? Ut[n] : n;
    for (; s; ) {
      const d = s.ec;
      if (d) {
        for (let l = 0; l < d.length; l++)
          if (d[l](e, i, a) === !1)
            return;
      }
      s = s.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      pe(c, null, 10, [e, i, a]);
      return;
    }
  }
  Go(e, n, r, o);
}
function Go(e, t, n, o = !0) {
  if (process.env.NODE_ENV !== "production") {
    const r = Ut[t];
    if (n && Ko(n), x(`Unhandled error${r ? ` during execution of ${r}` : ""}`), n && Uo(), o)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let et = !1, Dt = !1;
const k = [];
let ee = 0;
const be = [];
let W = null, X = 0;
const Qn = /* @__PURE__ */ Promise.resolve();
let qt = null;
const Zo = 100;
function Qo(e) {
  const t = qt || Qn;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Xo(e) {
  let t = ee + 1, n = k.length;
  for (; t < n; ) {
    const o = t + n >>> 1;
    Le(k[o]) < e ? t = o + 1 : n = o;
  }
  return t;
}
function lt(e) {
  (!k.length || !k.includes(e, et && e.allowRecurse ? ee + 1 : ee)) && (e.id == null ? k.push(e) : k.splice(Xo(e.id), 0, e), Xn());
}
function Xn() {
  !et && !Dt && (Dt = !0, qt = Qn.then(tr));
}
function er(e) {
  N(e) ? be.push(...e) : (!W || !W.includes(e, e.allowRecurse ? X + 1 : X)) && be.push(e), Xn();
}
function es(e) {
  if (be.length) {
    const t = [...new Set(be)];
    if (be.length = 0, W) {
      W.push(...t);
      return;
    }
    for (W = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), W.sort((n, o) => Le(n) - Le(o)), X = 0; X < W.length; X++)
      process.env.NODE_ENV !== "production" && nr(e, W[X]) || W[X]();
    W = null, X = 0;
  }
}
const Le = (e) => e.id == null ? 1 / 0 : e.id, ts = (e, t) => {
  const n = Le(e) - Le(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function tr(e) {
  Dt = !1, et = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), k.sort(ts);
  const t = process.env.NODE_ENV !== "production" ? (n) => nr(e, n) : Ye;
  try {
    for (ee = 0; ee < k.length; ee++) {
      const n = k[ee];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        pe(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    ee = 0, k.length = 0, es(e), et = !1, qt = null, (k.length || be.length) && tr(e);
  }
}
function nr(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > Zo) {
      const o = t.ownerInstance, r = o && Gt(o.type);
      return x(`Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
const Se = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (io().__VUE_HMR_RUNTIME__ = {
  createRecord: mt(ns),
  rerender: mt(rs),
  reload: mt(os)
});
const tt = /* @__PURE__ */ new Map();
function ns(e, t) {
  return tt.has(e) ? !1 : (tt.set(e, {
    initialDef: Ie(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Ie(e) {
  return vr(e) ? e.__vccOpts : e;
}
function rs(e, t) {
  const n = tt.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((o) => {
    t && (o.render = t, Ie(o.type).render = t), o.renderCache = [], o.update();
  }));
}
function os(e, t) {
  const n = tt.get(e);
  if (!n)
    return;
  t = Ie(t), wn(n.initialDef, t);
  const o = [...n.instances];
  for (const r of o) {
    const s = Ie(r.type);
    Se.has(s) || (s !== n.initialDef && wn(s, t), Se.add(s)), r.appContext.optionsCache.delete(r.type), r.ceReload ? (Se.add(s), r.ceReload(t.styles), Se.delete(s)) : r.parent ? lt(r.parent.update) : r.appContext.reload ? r.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  er(() => {
    for (const r of o)
      Se.delete(Ie(r.type));
  });
}
function wn(e, t) {
  K(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function mt(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (o) {
      console.error(o), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let $ = null, ss = null;
const is = (e) => e.__isSuspense;
function cs(e, t) {
  t && t.pendingBranch ? N(e) ? t.effects.push(...e) : t.effects.push(e) : er(e);
}
function as(e, t, n = !1) {
  const o = R || $;
  if (o) {
    const r = o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && S(t) ? t.call(o.proxy) : t;
    process.env.NODE_ENV !== "production" && x(`injection "${String(e)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && x("inject() can only be used inside setup() or functional components.");
}
const Je = {};
function us(e, t, n) {
  return process.env.NODE_ENV !== "production" && !S(t) && x("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), rr(e, t, n);
}
function rr(e, t, { immediate: n, deep: o, flush: r, onTrack: s, onTrigger: i } = q) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && x('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), o !== void 0 && x('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const a = (y) => {
    x("Invalid watch source: ", y, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, c = ao() === (R == null ? void 0 : R.scope) ? R : null;
  let d, l = !1, u = !1;
  if (P(e) ? (d = () => e.value, l = Xe(e)) : fe(e) ? (d = () => e, o = !0) : N(e) ? (u = !0, l = e.some((y) => fe(y) || Xe(y)), d = () => e.map((y) => {
    if (P(y))
      return y.value;
    if (fe(y))
      return Ee(y);
    if (S(y))
      return pe(
        y,
        c,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    process.env.NODE_ENV !== "production" && a(y);
  })) : S(e) ? t ? d = () => pe(
    e,
    c,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : d = () => {
    if (!(c && c.isUnmounted))
      return f && f(), Te(e, c, 3, [g]);
  } : (d = Ye, process.env.NODE_ENV !== "production" && a(e)), t && o) {
    const y = d;
    d = () => Ee(y());
  }
  let f, g = (y) => {
    f = h.onStop = () => {
      pe(
        y,
        c,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, p;
  if (hr)
    if (g = Ye, t ? n && Te(t, c, 3, [
      d(),
      u ? [] : void 0,
      g
    ]) : d(), r === "sync") {
      const y = ks();
      p = y.__watcherHandles || (y.__watcherHandles = []);
    } else
      return Ye;
  let v = u ? new Array(e.length).fill(Je) : Je;
  const E = () => {
    if (h.active)
      if (t) {
        const y = h.run();
        (o || l || (u ? y.some((U, O) => $e(U, v[O])) : $e(y, v))) && (f && f(), Te(t, c, 3, [
          y,
          // pass undefined as the old value when it's changed for the first time
          v === Je ? void 0 : u && v[0] === Je ? [] : v,
          g
        ]), v = y);
      } else
        h.run();
  };
  E.allowRecurse = !!t;
  let w;
  r === "sync" ? w = E : r === "post" ? w = () => Cn(E, c && c.suspense) : (E.pre = !0, c && (E.id = c.uid), w = () => lt(E));
  const h = new fo(d, w);
  process.env.NODE_ENV !== "production" && (h.onTrack = s, h.onTrigger = i), t ? n ? E() : v = h.run() : r === "post" ? Cn(h.run.bind(h), c && c.suspense) : h.run();
  const _ = () => {
    h.stop(), c && c.scope && Xr(c.scope.effects, h);
  };
  return p && p.push(_), _;
}
function ls(e, t, n) {
  const o = this.proxy, r = A(e) ? e.includes(".") ? fs(o, e) : () => o[e] : e.bind(o, o);
  let s;
  S(t) ? s = t : (s = t.handler, n = t);
  const i = R;
  Tt(this);
  const a = rr(r, s.bind(o), n);
  return i ? Tt(i) : pr(), a;
}
function fs(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let r = 0; r < n.length && o; r++)
      o = o[n[r]];
    return o;
  };
}
function Ee(e, t) {
  if (!T(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), P(e))
    Ee(e.value, t);
  else if (N(e))
    for (let n = 0; n < e.length; n++)
      Ee(e[n], t);
  else if (An(e) || ue(e))
    e.forEach((n) => {
      Ee(n, t);
    });
  else if (jn(e))
    for (const n in e)
      Ee(e[n], t);
  return e;
}
function ds(e) {
  return S(e) ? { setup: e, name: e.name } : e;
}
const ps = (e) => !!e.type.__asyncLoader;
function _e(e) {
  S(e) && (e = { loader: e });
  const {
    loader: t,
    loadingComponent: n,
    errorComponent: o,
    delay: r = 200,
    timeout: s,
    // undefined = never times out
    suspensible: i = !0,
    onError: a
  } = e;
  let c = null, d, l = 0;
  const u = () => (l++, c = null, f()), f = () => {
    let g;
    return c || (g = c = t().catch((p) => {
      if (p = p instanceof Error ? p : new Error(String(p)), a)
        return new Promise((v, E) => {
          a(p, () => v(u()), () => E(p), l + 1);
        });
      throw p;
    }).then((p) => {
      if (g !== c && c)
        return c;
      if (process.env.NODE_ENV !== "production" && !p && x("Async component loader resolved to undefined. If you are using retry(), make sure to return its return value."), p && (p.__esModule || p[Symbol.toStringTag] === "Module") && (p = p.default), process.env.NODE_ENV !== "production" && p && !T(p) && !S(p))
        throw new Error(`Invalid async component load result: ${p}`);
      return d = p, p;
    }));
  };
  return ds({
    name: "AsyncComponentWrapper",
    __asyncLoader: f,
    get __asyncResolved() {
      return d;
    },
    setup() {
      const g = R;
      if (d)
        return () => _t(d, g);
      const p = (h) => {
        c = null, Wt(
          h,
          g,
          13,
          !o
          /* do not throw in dev if user provided error component */
        );
      };
      if (i && g.suspense || hr)
        return f().then((h) => () => _t(h, g)).catch((h) => (p(h), () => o ? ne(o, {
          error: h
        }) : null));
      const v = j(!1), E = j(), w = j(!!r);
      return r && setTimeout(() => {
        w.value = !1;
      }, r), s != null && setTimeout(() => {
        if (!v.value && !E.value) {
          const h = new Error(`Async component timed out after ${s}ms.`);
          p(h), E.value = h;
        }
      }, s), f().then(() => {
        v.value = !0, g.parent && hs(g.parent.vnode) && lt(g.parent.update);
      }).catch((h) => {
        p(h), E.value = h;
      }), () => {
        if (v.value && d)
          return _t(d, g);
        if (E.value && o)
          return ne(o, {
            error: E.value
          });
        if (n && !w.value)
          return ne(n);
      };
    }
  });
}
function _t(e, t) {
  const { ref: n, props: o, children: r, ce: s } = t.vnode, i = ne(e, o, r);
  return i.ref = n, i.ce = s, delete t.vnode.ce, i;
}
const hs = (e) => e.type.__isKeepAlive;
function gs(e, t, n = R, o = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      At(), Tt(n);
      const a = Te(t, n, e, i);
      return pr(), Ft(), a;
    });
    return o ? r.unshift(s) : r.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const r = ro(Ut[e].replace(/ hook$/, ""));
    x(`${r} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const vs = (e) => (t, n = R) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  gs(e, (...o) => t(...o), n)
), Jt = vs(
  "m"
  /* LifecycleHooks.MOUNTED */
);
function nt(e, t) {
  return process.env.NODE_ENV !== "production" && x("withDirectives can only be used inside render functions."), e;
}
const xn = "components", ms = "directives", _s = Symbol();
function or(e) {
  return ys(ms, e);
}
function ys(e, t, n = !0, o = !1) {
  const r = R;
  if (r) {
    const s = r.type;
    if (e === xn) {
      const a = Gt(
        s,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (a && (a === t || a === Qe(t) || a === Re(Qe(t))))
        return s;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Nn(r[e] || s[e], t) || // global registration
      Nn(r.appContext[e], t)
    );
    if (!i && o)
      return s;
    if (process.env.NODE_ENV !== "production" && n && !i) {
      const a = e === xn ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      x(`Failed to resolve ${e.slice(0, -1)}: ${t}${a}`);
    }
    return i;
  } else
    process.env.NODE_ENV !== "production" && x(`resolve${Re(e.slice(0, -1))} can only be used in render() or setup().`);
}
function Nn(e, t) {
  return e && (e[t] || e[Qe(t)] || e[Re(Qe(t))]);
}
function Es(e, t, n, o) {
  let r;
  const s = n && n[o];
  if (N(e) || A(e)) {
    r = new Array(e.length);
    for (let i = 0, a = e.length; i < a; i++)
      r[i] = t(e[i], i, void 0, s && s[i]);
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && x(`The v-for range expect an integer value but got ${e}.`), r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, s && s[i]);
  } else if (T(e))
    if (e[Symbol.iterator])
      r = Array.from(e, (i, a) => t(i, a, void 0, s && s[a]));
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let a = 0, c = i.length; a < c; a++) {
        const d = i[a];
        r[a] = t(e[d], d, a, s && s[a]);
      }
    }
  else
    r = [];
  return n && (n[o] = r), r;
}
function je(e, t, n = {}, o, r) {
  if ($.isCE || $.parent && ps($.parent) && $.parent.isCE)
    return t !== "default" && (n.name = t), ne("slot", n, o && o());
  let s = e[t];
  process.env.NODE_ENV !== "production" && s && s.length > 1 && (x("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."), s = () => []), s && s._c && (s._d = !1), H();
  const i = s && sr(s(n)), a = cr(
    ke,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (o ? o() : []),
    i && e._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  return !r && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), s && s._c && (s._d = !0), a;
}
function sr(e) {
  return e.some((t) => ar(t) ? !(t.type === ot || t.type === ke && !sr(t.children)) : !0) ? e : null;
}
const Vt = (e) => e ? $s(e) ? As(e) || e.proxy : Vt(e.parent) : null, Me = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ K(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? qe(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? qe(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? qe(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? qe(e.refs) : e.refs,
    $parent: (e) => Vt(e.parent),
    $root: (e) => Vt(e.root),
    $emit: (e) => e.emit,
    $options: (e) => xs(e),
    $forceUpdate: (e) => e.f || (e.f = () => lt(e.update)),
    $nextTick: (e) => e.n || (e.n = Qo.bind(e.proxy)),
    $watch: (e) => ls.bind(e)
  })
), bs = (e) => e === "_" || e === "$", yt = (e, t) => e !== q && !e.__isScriptSetup && V(e, t), ws = {
  get({ _: e }, t) {
    const { ctx: n, setupState: o, data: r, props: s, accessCache: i, type: a, appContext: c } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let d;
    if (t[0] !== "$") {
      const g = i[t];
      if (g !== void 0)
        switch (g) {
          case 1:
            return o[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (yt(o, t))
          return i[t] = 1, o[t];
        if (r !== q && V(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && V(d, t)
        )
          return i[t] = 3, s[t];
        if (n !== q && V(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const l = Me[t];
    let u, f;
    if (l)
      return t === "$attrs" && (F(e, "get", t), process.env.NODE_ENV !== "production" && void 0), l(e);
    if (
      // css module (injected by vue-loader)
      (u = a.__cssModules) && (u = u[t])
    )
      return u;
    if (n !== q && V(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      f = c.config.globalProperties, V(f, t)
    )
      return f[t];
    process.env.NODE_ENV !== "production" && $ && (!A(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (r !== q && bs(t[0]) && V(r, t) ? x(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === $ && x(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: r, ctx: s } = e;
    return yt(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && V(r, t) ? (x(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : o !== q && V(o, t) ? (o[t] = n, !0) : V(e.props, t) ? (process.env.NODE_ENV !== "production" && x(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && x(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: s } }, i) {
    let a;
    return !!n[i] || e !== q && V(e, i) || yt(t, i) || (a = s[0]) && V(a, i) || V(o, i) || V(Me, i) || V(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : V(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (ws.ownKeys = (e) => (x("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function xs(e) {
  const t = e.type, { mixins: n, extends: o } = t, { mixins: r, optionsCache: s, config: { optionMergeStrategies: i } } = e.appContext, a = s.get(t);
  let c;
  return a ? c = a : !r.length && !n && !o ? c = t : (c = {}, r.length && r.forEach((d) => rt(c, d, i, !0)), rt(c, t, i)), T(t) && s.set(t, c), c;
}
function rt(e, t, n, o = !1) {
  const { mixins: r, extends: s } = t;
  s && rt(e, s, n, !0), r && r.forEach((i) => rt(e, i, n, !0));
  for (const i in t)
    if (o && i === "expose")
      process.env.NODE_ENV !== "production" && x('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const a = Ns[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const Ns = {
  data: On,
  props: ae,
  emits: ae,
  // objects
  methods: ae,
  computed: ae,
  // lifecycle
  beforeCreate: I,
  created: I,
  beforeMount: I,
  mounted: I,
  beforeUpdate: I,
  updated: I,
  beforeDestroy: I,
  beforeUnmount: I,
  destroyed: I,
  unmounted: I,
  activated: I,
  deactivated: I,
  errorCaptured: I,
  serverPrefetch: I,
  // assets
  components: ae,
  directives: ae,
  // watch
  watch: Ss,
  // provide / inject
  provide: On,
  inject: Os
};
function On(e, t) {
  return t ? e ? function() {
    return K(S(e) ? e.call(this, this) : e, S(t) ? t.call(this, this) : t);
  } : t : e;
}
function Os(e, t) {
  return ae(Sn(e), Sn(t));
}
function Sn(e) {
  if (N(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function I(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function ae(e, t) {
  return e ? K(K(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Ss(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = K(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = I(e[o], t[o]);
  return n;
}
const Cn = cs, Cs = (e) => e.__isTeleport, ke = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Ds = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), ot = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const Ge = [];
let z = null;
function H(e = !1) {
  Ge.push(z = e ? null : []);
}
function Vs() {
  Ge.pop(), z = Ge[Ge.length - 1] || null;
}
function ir(e) {
  return e.dynamicChildren = z || Gr, Vs(), z && z.push(e), e;
}
function G(e, t, n, o, r, s) {
  return ir(ie(
    e,
    t,
    n,
    o,
    r,
    s,
    !0
    /* isBlock */
  ));
}
function cr(e, t, n, o, r) {
  return ir(ne(
    e,
    t,
    n,
    o,
    r,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function ar(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Ts = (...e) => fr(...e), ur = "__vInternal", lr = ({ key: e }) => e ?? null, Ze = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? A(e) || P(e) || S(e) ? { i: $, r: e, k: t, f: !!n } : e : null;
function ie(e, t = null, n = null, o = 0, r = null, s = e === ke ? 0 : 1, i = !1, a = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && lr(t),
    ref: t && Ze(t),
    scopeId: ss,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: o,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: $
  };
  return a ? (Yt(c, n), s & 128 && e.normalize(c)) : n && (c.shapeFlag |= A(n) ? 8 : 16), process.env.NODE_ENV !== "production" && c.key !== c.key && x("VNode created with invalid key (NaN). VNode type:", c.type), // avoid a block node from tracking itself
  !i && // has current parent block
  z && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || s & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && z.push(c), c;
}
const ne = process.env.NODE_ENV !== "production" ? Ts : fr;
function fr(e, t = null, n = null, o = 0, r = null, s = !1) {
  if ((!e || e === _s) && (process.env.NODE_ENV !== "production" && !e && x(`Invalid vnode type when creating vnode: ${e}.`), e = ot), ar(e)) {
    const a = st(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Yt(a, n), !s && z && (a.shapeFlag & 6 ? z[z.indexOf(e)] = a : z.push(a)), a.patchFlag |= -2, a;
  }
  if (vr(e) && (e = e.__vccOpts), t) {
    t = Is(t);
    let { class: a, style: c } = t;
    a && !A(a) && (t.class = he(a)), T(c) && (Ct(c) && !N(c) && (c = K({}, c)), t.style = ct(c));
  }
  const i = A(e) ? 1 : is(e) ? 128 : Cs(e) ? 64 : T(e) ? 4 : S(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Ct(e) && (e = b(e), x("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), ie(e, t, n, o, r, i, s, !0);
}
function Is(e) {
  return e ? Ct(e) || ur in e ? K({}, e) : e : null;
}
function st(e, t, n = !1) {
  const { props: o, ref: r, patchFlag: s, children: i } = e, a = t ? Rs(o || {}, t) : o;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && lr(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? N(r) ? r.concat(Ze(t)) : [r, Ze(t)] : Ze(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && N(i) ? i.map(dr) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ke ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && st(e.ssContent),
    ssFallback: e.ssFallback && st(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function dr(e) {
  const t = st(e);
  return N(e.children) && (t.children = e.children.map(dr)), t;
}
function Ms(e = " ", t = 0) {
  return ne(Ds, null, e, t);
}
function Ps(e = "", t = !1) {
  return t ? (H(), cr(ot, null, e)) : ne(ot, null, e);
}
function Yt(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (N(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), Yt(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(ur in t) ? t._ctx = $ : r === 3 && $ && ($.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    S(t) ? (t = { default: t, _ctx: $ }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [Ms(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Rs(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const r in o)
      if (r === "class")
        t.class !== o.class && (t.class = he([t.class, o.class]));
      else if (r === "style")
        t.style = ct([t.style, o.style]);
      else if (Qr(r)) {
        const s = t[r], i = o[r];
        i && s !== i && !(N(s) && s.includes(i)) && (t[r] = s ? [].concat(s, i) : i);
      } else
        r !== "" && (t[r] = o[r]);
  }
  return t;
}
let R = null;
const Tt = (e) => {
  R = e, e.scope.on();
}, pr = () => {
  R && R.scope.off(), R = null;
};
function $s(e) {
  return e.vnode.shapeFlag & 4;
}
let hr = !1;
function As(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Ho(Fo(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Me)
          return Me[n](e);
      },
      has(t, n) {
        return n in t || n in Me;
      }
    }));
}
const Fs = /(?:^|[-_])(\w)/g, Ls = (e) => e.replace(Fs, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Gt(e, t = !0) {
  return S(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function gr(e, t, n = !1) {
  let o = Gt(t);
  if (!o && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (o = r[1]);
  }
  if (!o && e && e.parent) {
    const r = (s) => {
      for (const i in s)
        if (s[i] === t)
          return i;
    };
    o = r(e.components || e.parent.type.components) || r(e.appContext.components);
  }
  return o ? Ls(o) : n ? "App" : "Anonymous";
}
function vr(e) {
  return S(e) && "__vccOpts" in e;
}
const js = Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : ""), ks = () => {
  {
    const e = as(js);
    return e || process.env.NODE_ENV !== "production" && x("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."), e;
  }
};
function Et(e) {
  return !!(e && e.__v_isShallow);
}
function Bs() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, o = { style: "color:#9d288c" }, r = {
    header(u) {
      return T(u) ? u.__isVue ? ["div", e, "VueInstance"] : P(u) ? [
        "div",
        {},
        ["span", e, l(u)],
        "<",
        a(u.value),
        ">"
      ] : fe(u) ? [
        "div",
        {},
        ["span", e, Et(u) ? "ShallowReactive" : "Reactive"],
        "<",
        a(u),
        `>${se(u) ? " (readonly)" : ""}`
      ] : se(u) ? [
        "div",
        {},
        ["span", e, Et(u) ? "ShallowReadonly" : "Readonly"],
        "<",
        a(u),
        ">"
      ] : null : null;
    },
    hasBody(u) {
      return u && u.__isVue;
    },
    body(u) {
      if (u && u.__isVue)
        return [
          "div",
          {},
          ...s(u.$)
        ];
    }
  };
  function s(u) {
    const f = [];
    u.type.props && u.props && f.push(i("props", b(u.props))), u.setupState !== q && f.push(i("setup", u.setupState)), u.data !== q && f.push(i("data", b(u.data)));
    const g = c(u, "computed");
    g && f.push(i("computed", g));
    const p = c(u, "inject");
    return p && f.push(i("injected", p)), f.push([
      "div",
      {},
      [
        "span",
        {
          style: o.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: u }]
    ]), f;
  }
  function i(u, f) {
    return f = K({}, f), Object.keys(f).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        u
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(f).map((g) => [
          "div",
          {},
          ["span", o, g + ": "],
          a(f[g], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(u, f = !0) {
    return typeof u == "number" ? ["span", t, u] : typeof u == "string" ? ["span", n, JSON.stringify(u)] : typeof u == "boolean" ? ["span", o, u] : T(u) ? ["object", { object: f ? b(u) : u }] : ["span", n, String(u)];
  }
  function c(u, f) {
    const g = u.type;
    if (S(g))
      return;
    const p = {};
    for (const v in u.ctx)
      d(g, v, f) && (p[v] = u.ctx[v]);
    return p;
  }
  function d(u, f, g) {
    const p = u[g];
    if (N(p) && p.includes(f) || T(p) && f in p || u.extends && d(u.extends, f, g) || u.mixins && u.mixins.some((v) => d(v, f, g)))
      return !0;
  }
  function l(u) {
    return Et(u) ? "ShallowRef" : u.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
function Ce(e, t, n, o) {
  e.addEventListener(t, n, o);
}
const Dn = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return N(t) ? (n) => oo(t, n) : t;
};
function zs(e) {
  e.target.composing = !0;
}
function Vn(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Hs = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, r) {
    e._assign = Dn(r);
    const s = o || r.props && r.props.type === "number";
    Ce(e, t ? "change" : "input", (i) => {
      if (i.target.composing)
        return;
      let a = e.value;
      n && (a = a.trim()), s && (a = dn(a)), e._assign(a);
    }), n && Ce(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Ce(e, "compositionstart", zs), Ce(e, "compositionend", Vn), Ce(e, "change", Vn));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: o, number: r } }, s) {
    if (e._assign = Dn(s), e.composing || document.activeElement === e && e.type !== "range" && (n || o && e.value.trim() === t || (r || e.type === "number") && dn(e.value) === t))
      return;
    const i = t ?? "";
    e.value !== i && (e.value = i);
  }
}, mr = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : De(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: o }) {
    !t != !n && (o ? t ? (o.beforeEnter(e), De(e, !0), o.enter(e)) : o.leave(e, () => {
      De(e, !1);
    }) : De(e, t));
  },
  beforeUnmount(e, { value: t }) {
    De(e, t);
  }
};
function De(e, t) {
  e.style.display = t ? e._vod : "none";
}
function Ks() {
  Bs();
}
process.env.NODE_ENV !== "production" && Ks();
const Us = { class: "relative" }, _r = {
  __name: "action-button",
  props: ["buttonClass", "itemsBoxClass"],
  setup(e) {
    const t = j(!1), n = () => {
      setTimeout(() => {
        t.value = !0;
      }, 100);
    }, o = () => {
      t && (t.value = !1);
    };
    return (r, s) => {
      const i = or("click-outside");
      return H(), G("div", Us, [
        ie("button", {
          onClick: n,
          class: he([e.buttonClass, "w-auto text-gray-600 info-btn rounded"])
        }, [
          je(r.$slots, "default")
        ], 2),
        t.value ? nt((H(), G("div", {
          key: 0,
          class: he([e.itemsBoxClass, "absolute shadow-lg mt-1 border flex flex-col gap-y-2 bg-white p-2 rounded"])
        }, [
          je(r.$slots, "items")
        ], 2)), [
          [mr, t.value],
          [i, o]
        ]) : Ps("", !0)
      ]);
    };
  }
}, Ws = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, r] of t)
    n[o] = r;
  return n;
}, qs = {}, Js = { class: "fixed z-[1000] gap-x-2 flex items-center p-4 top-[2vh] right-[1vw] shadow-lg rounded-md border bg-white" };
function Ys(e, t) {
  return H(), G("div", Js, [
    je(e.$slots, "default")
  ]);
}
const yr = /* @__PURE__ */ Ws(qs, [["render", Ys]]), Gs = '<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <line x1="18" y1="6" x2="6" y2="18"></line> <line x1="6" y1="6" x2="18" y2="18"></line> </svg>', Zs = { class: "px-4 gap-x-4 flex items-center w-full py-4 rounded border" }, Qs = ["innerHTML"], Er = {
  __name: "dismissable-box",
  setup(e) {
    const t = j(!0);
    return (n, o) => nt((H(), G("div", Zs, [
      je(n.$slots, "default"),
      ie("button", {
        class: "w-8 h-8",
        innerHTML: Kt(Gs),
        onClick: o[0] || (o[0] = (r) => t.value = !1)
      }, null, 8, Qs)
    ], 512)), [
      [mr, t.value]
    ]);
  }
}, Xs = ["title", "disabled"], br = {
  __name: "editable-text",
  props: {
    text: String
  },
  emits: ["update"],
  setup(e, { expose: t, emit: n }) {
    const o = e, r = j(!1), s = (g) => g.length > 20 ? g.substring(0, 6) + "..." + g.substring(g.length - 6, g.length) : g, i = j(s(o.text)), a = j(o.text), c = j(null), d = j(null);
    t({
      edit: function(g) {
        g && (g.preventDefault(), g.stopPropagation()), r.value = !0, i.value = a.value, setTimeout(() => {
          c.value.focus();
        }, 100);
      }
    });
    const u = () => {
      n("update", i.value), r.value = !1, a.value = i.value, i.value = s(a.value);
    }, f = (g) => {
      c.value.style.width = g.length * 0.8 + 1 + "ch";
    };
    return Jt(() => {
      f(i.value), us(i, (g) => f(g));
    }), (g, p) => (or("double-click"), nt((H(), G("button", {
      ref_key: "buttonElement",
      ref: d
    }, [
      nt(ie("input", {
        title: a.value,
        ref_key: "inputElement",
        ref: c,
        class: he([r.value ? "bg-blue-200 rounded" : "text-gray-800 bg-transparent", "text-center cursor-pointer py-1 focus:outline-none text-md"]),
        disabled: !r.value,
        type: "text",
        onFocusout: u,
        "onUpdate:modelValue": p[0] || (p[0] = (v) => i.value = v)
      }, null, 42, Xs), [
        [Hs, i.value]
      ])
    ]))));
  }
};
class wr {
  static string(t = 5) {
    let n = "";
    const o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", r = o.length;
    let s = 0;
    for (; s < t; )
      n += o.charAt(Math.floor(Math.random() * r)), s += 1;
    return n;
  }
}
var xr = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: "normal",
  autoplay: !0,
  timelineOffset: 0
}, Zt = {
  duration: 1e3,
  delay: 0,
  endDelay: 0,
  easing: "easeOutElastic(1, .5)",
  round: 0
}, ei = ["translateX", "translateY", "translateZ", "rotate", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "perspective", "matrix", "matrix3d"], it = {
  CSS: {},
  springs: {}
};
function J(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function Pe(e, t) {
  return e.indexOf(t) > -1;
}
function bt(e, t) {
  return e.apply(null, t);
}
var m = {
  arr: function(e) {
    return Array.isArray(e);
  },
  obj: function(e) {
    return Pe(Object.prototype.toString.call(e), "Object");
  },
  pth: function(e) {
    return m.obj(e) && e.hasOwnProperty("totalLength");
  },
  svg: function(e) {
    return e instanceof SVGElement;
  },
  inp: function(e) {
    return e instanceof HTMLInputElement;
  },
  dom: function(e) {
    return e.nodeType || m.svg(e);
  },
  str: function(e) {
    return typeof e == "string";
  },
  fnc: function(e) {
    return typeof e == "function";
  },
  und: function(e) {
    return typeof e > "u";
  },
  nil: function(e) {
    return m.und(e) || e === null;
  },
  hex: function(e) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(e);
  },
  rgb: function(e) {
    return /^rgb/.test(e);
  },
  hsl: function(e) {
    return /^hsl/.test(e);
  },
  col: function(e) {
    return m.hex(e) || m.rgb(e) || m.hsl(e);
  },
  key: function(e) {
    return !xr.hasOwnProperty(e) && !Zt.hasOwnProperty(e) && e !== "targets" && e !== "keyframes";
  }
};
function Nr(e) {
  var t = /\(([^)]+)\)/.exec(e);
  return t ? t[1].split(",").map(function(n) {
    return parseFloat(n);
  }) : [];
}
function Or(e, t) {
  var n = Nr(e), o = J(m.und(n[0]) ? 1 : n[0], 0.1, 100), r = J(m.und(n[1]) ? 100 : n[1], 0.1, 100), s = J(m.und(n[2]) ? 10 : n[2], 0.1, 100), i = J(m.und(n[3]) ? 0 : n[3], 0.1, 100), a = Math.sqrt(r / o), c = s / (2 * Math.sqrt(r * o)), d = c < 1 ? a * Math.sqrt(1 - c * c) : 0, l = 1, u = c < 1 ? (c * a + -i) / d : -i + a;
  function f(p) {
    var v = t ? t * p / 1e3 : p;
    return c < 1 ? v = Math.exp(-v * c * a) * (l * Math.cos(d * v) + u * Math.sin(d * v)) : v = (l + u * v) * Math.exp(-v * a), p === 0 || p === 1 ? p : 1 - v;
  }
  function g() {
    var p = it.springs[e];
    if (p)
      return p;
    for (var v = 1 / 6, E = 0, w = 0; ; )
      if (E += v, f(E) === 1) {
        if (w++, w >= 16)
          break;
      } else
        w = 0;
    var h = E * v * 1e3;
    return it.springs[e] = h, h;
  }
  return t ? f : g;
}
function ti(e) {
  return e === void 0 && (e = 10), function(t) {
    return Math.ceil(J(t, 1e-6, 1) * e) * (1 / e);
  };
}
var ni = function() {
  var e = 11, t = 1 / (e - 1);
  function n(l, u) {
    return 1 - 3 * u + 3 * l;
  }
  function o(l, u) {
    return 3 * u - 6 * l;
  }
  function r(l) {
    return 3 * l;
  }
  function s(l, u, f) {
    return ((n(u, f) * l + o(u, f)) * l + r(u)) * l;
  }
  function i(l, u, f) {
    return 3 * n(u, f) * l * l + 2 * o(u, f) * l + r(u);
  }
  function a(l, u, f, g, p) {
    var v, E, w = 0;
    do
      E = u + (f - u) / 2, v = s(E, g, p) - l, v > 0 ? f = E : u = E;
    while (Math.abs(v) > 1e-7 && ++w < 10);
    return E;
  }
  function c(l, u, f, g) {
    for (var p = 0; p < 4; ++p) {
      var v = i(u, f, g);
      if (v === 0)
        return u;
      var E = s(u, f, g) - l;
      u -= E / v;
    }
    return u;
  }
  function d(l, u, f, g) {
    if (!(0 <= l && l <= 1 && 0 <= f && f <= 1))
      return;
    var p = new Float32Array(e);
    if (l !== u || f !== g)
      for (var v = 0; v < e; ++v)
        p[v] = s(v * t, l, f);
    function E(w) {
      for (var h = 0, _ = 1, y = e - 1; _ !== y && p[_] <= w; ++_)
        h += t;
      --_;
      var U = (w - p[_]) / (p[_ + 1] - p[_]), O = h + U * t, ce = i(O, l, f);
      return ce >= 1e-3 ? c(w, O, l, f) : ce === 0 ? O : a(w, h, h + t, l, f);
    }
    return function(w) {
      return l === u && f === g || w === 0 || w === 1 ? w : s(E(w), u, g);
    };
  }
  return d;
}(), Sr = function() {
  var e = { linear: function() {
    return function(o) {
      return o;
    };
  } }, t = {
    Sine: function() {
      return function(o) {
        return 1 - Math.cos(o * Math.PI / 2);
      };
    },
    Circ: function() {
      return function(o) {
        return 1 - Math.sqrt(1 - o * o);
      };
    },
    Back: function() {
      return function(o) {
        return o * o * (3 * o - 2);
      };
    },
    Bounce: function() {
      return function(o) {
        for (var r, s = 4; o < ((r = Math.pow(2, --s)) - 1) / 11; )
          ;
        return 1 / Math.pow(4, 3 - s) - 7.5625 * Math.pow((r * 3 - 2) / 22 - o, 2);
      };
    },
    Elastic: function(o, r) {
      o === void 0 && (o = 1), r === void 0 && (r = 0.5);
      var s = J(o, 1, 10), i = J(r, 0.1, 2);
      return function(a) {
        return a === 0 || a === 1 ? a : -s * Math.pow(2, 10 * (a - 1)) * Math.sin((a - 1 - i / (Math.PI * 2) * Math.asin(1 / s)) * (Math.PI * 2) / i);
      };
    }
  }, n = ["Quad", "Cubic", "Quart", "Quint", "Expo"];
  return n.forEach(function(o, r) {
    t[o] = function() {
      return function(s) {
        return Math.pow(s, r + 2);
      };
    };
  }), Object.keys(t).forEach(function(o) {
    var r = t[o];
    e["easeIn" + o] = r, e["easeOut" + o] = function(s, i) {
      return function(a) {
        return 1 - r(s, i)(1 - a);
      };
    }, e["easeInOut" + o] = function(s, i) {
      return function(a) {
        return a < 0.5 ? r(s, i)(a * 2) / 2 : 1 - r(s, i)(a * -2 + 2) / 2;
      };
    }, e["easeOutIn" + o] = function(s, i) {
      return function(a) {
        return a < 0.5 ? (1 - r(s, i)(1 - a * 2)) / 2 : (r(s, i)(a * 2 - 1) + 1) / 2;
      };
    };
  }), e;
}();
function Qt(e, t) {
  if (m.fnc(e))
    return e;
  var n = e.split("(")[0], o = Sr[n], r = Nr(e);
  switch (n) {
    case "spring":
      return Or(e, t);
    case "cubicBezier":
      return bt(ni, r);
    case "steps":
      return bt(ti, r);
    default:
      return bt(o, r);
  }
}
function Cr(e) {
  try {
    var t = document.querySelectorAll(e);
    return t;
  } catch {
    return;
  }
}
function ft(e, t) {
  for (var n = e.length, o = arguments.length >= 2 ? arguments[1] : void 0, r = [], s = 0; s < n; s++)
    if (s in e) {
      var i = e[s];
      t.call(o, i, s, e) && r.push(i);
    }
  return r;
}
function dt(e) {
  return e.reduce(function(t, n) {
    return t.concat(m.arr(n) ? dt(n) : n);
  }, []);
}
function Tn(e) {
  return m.arr(e) ? e : (m.str(e) && (e = Cr(e) || e), e instanceof NodeList || e instanceof HTMLCollection ? [].slice.call(e) : [e]);
}
function Xt(e, t) {
  return e.some(function(n) {
    return n === t;
  });
}
function en(e) {
  var t = {};
  for (var n in e)
    t[n] = e[n];
  return t;
}
function It(e, t) {
  var n = en(e);
  for (var o in e)
    n[o] = t.hasOwnProperty(o) ? t[o] : e[o];
  return n;
}
function pt(e, t) {
  var n = en(e);
  for (var o in t)
    n[o] = m.und(e[o]) ? t[o] : e[o];
  return n;
}
function ri(e) {
  var t = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(e);
  return t ? "rgba(" + t[1] + ",1)" : e;
}
function oi(e) {
  var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i, n = e.replace(t, function(a, c, d, l) {
    return c + c + d + d + l + l;
  }), o = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n), r = parseInt(o[1], 16), s = parseInt(o[2], 16), i = parseInt(o[3], 16);
  return "rgba(" + r + "," + s + "," + i + ",1)";
}
function si(e) {
  var t = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(e) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(e), n = parseInt(t[1], 10) / 360, o = parseInt(t[2], 10) / 100, r = parseInt(t[3], 10) / 100, s = t[4] || 1;
  function i(f, g, p) {
    return p < 0 && (p += 1), p > 1 && (p -= 1), p < 1 / 6 ? f + (g - f) * 6 * p : p < 1 / 2 ? g : p < 2 / 3 ? f + (g - f) * (2 / 3 - p) * 6 : f;
  }
  var a, c, d;
  if (o == 0)
    a = c = d = r;
  else {
    var l = r < 0.5 ? r * (1 + o) : r + o - r * o, u = 2 * r - l;
    a = i(u, l, n + 1 / 3), c = i(u, l, n), d = i(u, l, n - 1 / 3);
  }
  return "rgba(" + a * 255 + "," + c * 255 + "," + d * 255 + "," + s + ")";
}
function ii(e) {
  if (m.rgb(e))
    return ri(e);
  if (m.hex(e))
    return oi(e);
  if (m.hsl(e))
    return si(e);
}
function Z(e) {
  var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(e);
  if (t)
    return t[1];
}
function ci(e) {
  if (Pe(e, "translate") || e === "perspective")
    return "px";
  if (Pe(e, "rotate") || Pe(e, "skew"))
    return "deg";
}
function Mt(e, t) {
  return m.fnc(e) ? e(t.target, t.id, t.total) : e;
}
function Y(e, t) {
  return e.getAttribute(t);
}
function tn(e, t, n) {
  var o = Z(t);
  if (Xt([n, "deg", "rad", "turn"], o))
    return t;
  var r = it.CSS[t + n];
  if (!m.und(r))
    return r;
  var s = 100, i = document.createElement(e.tagName), a = e.parentNode && e.parentNode !== document ? e.parentNode : document.body;
  a.appendChild(i), i.style.position = "absolute", i.style.width = s + n;
  var c = s / i.offsetWidth;
  a.removeChild(i);
  var d = c * parseFloat(t);
  return it.CSS[t + n] = d, d;
}
function Dr(e, t, n) {
  if (t in e.style) {
    var o = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), r = e.style[t] || getComputedStyle(e).getPropertyValue(o) || "0";
    return n ? tn(e, r, n) : r;
  }
}
function nn(e, t) {
  if (m.dom(e) && !m.inp(e) && (!m.nil(Y(e, t)) || m.svg(e) && e[t]))
    return "attribute";
  if (m.dom(e) && Xt(ei, t))
    return "transform";
  if (m.dom(e) && t !== "transform" && Dr(e, t))
    return "css";
  if (e[t] != null)
    return "object";
}
function Vr(e) {
  if (m.dom(e)) {
    for (var t = e.style.transform || "", n = /(\w+)\(([^)]*)\)/g, o = /* @__PURE__ */ new Map(), r; r = n.exec(t); )
      o.set(r[1], r[2]);
    return o;
  }
}
function ai(e, t, n, o) {
  var r = Pe(t, "scale") ? 1 : 0 + ci(t), s = Vr(e).get(t) || r;
  return n && (n.transforms.list.set(t, s), n.transforms.last = t), o ? tn(e, s, o) : s;
}
function rn(e, t, n, o) {
  switch (nn(e, t)) {
    case "transform":
      return ai(e, t, o, n);
    case "css":
      return Dr(e, t, n);
    case "attribute":
      return Y(e, t);
    default:
      return e[t] || 0;
  }
}
function on(e, t) {
  var n = /^(\*=|\+=|-=)/.exec(e);
  if (!n)
    return e;
  var o = Z(e) || 0, r = parseFloat(t), s = parseFloat(e.replace(n[0], ""));
  switch (n[0][0]) {
    case "+":
      return r + s + o;
    case "-":
      return r - s + o;
    case "*":
      return r * s + o;
  }
}
function Tr(e, t) {
  if (m.col(e))
    return ii(e);
  if (/\s/g.test(e))
    return e;
  var n = Z(e), o = n ? e.substr(0, e.length - n.length) : e;
  return t ? o + t : o;
}
function sn(e, t) {
  return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2));
}
function ui(e) {
  return Math.PI * 2 * Y(e, "r");
}
function li(e) {
  return Y(e, "width") * 2 + Y(e, "height") * 2;
}
function fi(e) {
  return sn(
    { x: Y(e, "x1"), y: Y(e, "y1") },
    { x: Y(e, "x2"), y: Y(e, "y2") }
  );
}
function Ir(e) {
  for (var t = e.points, n = 0, o, r = 0; r < t.numberOfItems; r++) {
    var s = t.getItem(r);
    r > 0 && (n += sn(o, s)), o = s;
  }
  return n;
}
function di(e) {
  var t = e.points;
  return Ir(e) + sn(t.getItem(t.numberOfItems - 1), t.getItem(0));
}
function Mr(e) {
  if (e.getTotalLength)
    return e.getTotalLength();
  switch (e.tagName.toLowerCase()) {
    case "circle":
      return ui(e);
    case "rect":
      return li(e);
    case "line":
      return fi(e);
    case "polyline":
      return Ir(e);
    case "polygon":
      return di(e);
  }
}
function pi(e) {
  var t = Mr(e);
  return e.setAttribute("stroke-dasharray", t), t;
}
function hi(e) {
  for (var t = e.parentNode; m.svg(t) && m.svg(t.parentNode); )
    t = t.parentNode;
  return t;
}
function Pr(e, t) {
  var n = t || {}, o = n.el || hi(e), r = o.getBoundingClientRect(), s = Y(o, "viewBox"), i = r.width, a = r.height, c = n.viewBox || (s ? s.split(" ") : [0, 0, i, a]);
  return {
    el: o,
    viewBox: c,
    x: c[0] / 1,
    y: c[1] / 1,
    w: i,
    h: a,
    vW: c[2],
    vH: c[3]
  };
}
function gi(e, t) {
  var n = m.str(e) ? Cr(e)[0] : e, o = t || 100;
  return function(r) {
    return {
      property: r,
      el: n,
      svg: Pr(n),
      totalLength: Mr(n) * (o / 100)
    };
  };
}
function vi(e, t, n) {
  function o(l) {
    l === void 0 && (l = 0);
    var u = t + l >= 1 ? t + l : 0;
    return e.el.getPointAtLength(u);
  }
  var r = Pr(e.el, e.svg), s = o(), i = o(-1), a = o(1), c = n ? 1 : r.w / r.vW, d = n ? 1 : r.h / r.vH;
  switch (e.property) {
    case "x":
      return (s.x - r.x) * c;
    case "y":
      return (s.y - r.y) * d;
    case "angle":
      return Math.atan2(a.y - i.y, a.x - i.x) * 180 / Math.PI;
  }
}
function In(e, t) {
  var n = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g, o = Tr(m.pth(e) ? e.totalLength : e, t) + "";
  return {
    original: o,
    numbers: o.match(n) ? o.match(n).map(Number) : [0],
    strings: m.str(e) || t ? o.split(n) : []
  };
}
function cn(e) {
  var t = e ? dt(m.arr(e) ? e.map(Tn) : Tn(e)) : [];
  return ft(t, function(n, o, r) {
    return r.indexOf(n) === o;
  });
}
function Rr(e) {
  var t = cn(e);
  return t.map(function(n, o) {
    return { target: n, id: o, total: t.length, transforms: { list: Vr(n) } };
  });
}
function mi(e, t) {
  var n = en(t);
  if (/^spring/.test(n.easing) && (n.duration = Or(n.easing)), m.arr(e)) {
    var o = e.length, r = o === 2 && !m.obj(e[0]);
    r ? e = { value: e } : m.fnc(t.duration) || (n.duration = t.duration / o);
  }
  var s = m.arr(e) ? e : [e];
  return s.map(function(i, a) {
    var c = m.obj(i) && !m.pth(i) ? i : { value: i };
    return m.und(c.delay) && (c.delay = a ? 0 : t.delay), m.und(c.endDelay) && (c.endDelay = a === s.length - 1 ? t.endDelay : 0), c;
  }).map(function(i) {
    return pt(i, n);
  });
}
function _i(e) {
  for (var t = ft(dt(e.map(function(s) {
    return Object.keys(s);
  })), function(s) {
    return m.key(s);
  }).reduce(function(s, i) {
    return s.indexOf(i) < 0 && s.push(i), s;
  }, []), n = {}, o = function(s) {
    var i = t[s];
    n[i] = e.map(function(a) {
      var c = {};
      for (var d in a)
        m.key(d) ? d == i && (c.value = a[d]) : c[d] = a[d];
      return c;
    });
  }, r = 0; r < t.length; r++)
    o(r);
  return n;
}
function yi(e, t) {
  var n = [], o = t.keyframes;
  o && (t = pt(_i(o), t));
  for (var r in t)
    m.key(r) && n.push({
      name: r,
      tweens: mi(t[r], e)
    });
  return n;
}
function Ei(e, t) {
  var n = {};
  for (var o in e) {
    var r = Mt(e[o], t);
    m.arr(r) && (r = r.map(function(s) {
      return Mt(s, t);
    }), r.length === 1 && (r = r[0])), n[o] = r;
  }
  return n.duration = parseFloat(n.duration), n.delay = parseFloat(n.delay), n;
}
function bi(e, t) {
  var n;
  return e.tweens.map(function(o) {
    var r = Ei(o, t), s = r.value, i = m.arr(s) ? s[1] : s, a = Z(i), c = rn(t.target, e.name, a, t), d = n ? n.to.original : c, l = m.arr(s) ? s[0] : d, u = Z(l) || Z(c), f = a || u;
    return m.und(i) && (i = d), r.from = In(l, f), r.to = In(on(i, l), f), r.start = n ? n.end : 0, r.end = r.start + r.delay + r.duration + r.endDelay, r.easing = Qt(r.easing, r.duration), r.isPath = m.pth(s), r.isPathTargetInsideSVG = r.isPath && m.svg(t.target), r.isColor = m.col(r.from.original), r.isColor && (r.round = 1), n = r, r;
  });
}
var $r = {
  css: function(e, t, n) {
    return e.style[t] = n;
  },
  attribute: function(e, t, n) {
    return e.setAttribute(t, n);
  },
  object: function(e, t, n) {
    return e[t] = n;
  },
  transform: function(e, t, n, o, r) {
    if (o.list.set(t, n), t === o.last || r) {
      var s = "";
      o.list.forEach(function(i, a) {
        s += a + "(" + i + ") ";
      }), e.style.transform = s;
    }
  }
};
function Ar(e, t) {
  var n = Rr(e);
  n.forEach(function(o) {
    for (var r in t) {
      var s = Mt(t[r], o), i = o.target, a = Z(s), c = rn(i, r, a, o), d = a || Z(c), l = on(Tr(s, d), c), u = nn(i, r);
      $r[u](i, r, l, o.transforms, !0);
    }
  });
}
function wi(e, t) {
  var n = nn(e.target, t.name);
  if (n) {
    var o = bi(t, e), r = o[o.length - 1];
    return {
      type: n,
      property: t.name,
      animatable: e,
      tweens: o,
      duration: r.end,
      delay: o[0].delay,
      endDelay: r.endDelay
    };
  }
}
function xi(e, t) {
  return ft(dt(e.map(function(n) {
    return t.map(function(o) {
      return wi(n, o);
    });
  })), function(n) {
    return !m.und(n);
  });
}
function Fr(e, t) {
  var n = e.length, o = function(s) {
    return s.timelineOffset ? s.timelineOffset : 0;
  }, r = {};
  return r.duration = n ? Math.max.apply(Math, e.map(function(s) {
    return o(s) + s.duration;
  })) : t.duration, r.delay = n ? Math.min.apply(Math, e.map(function(s) {
    return o(s) + s.delay;
  })) : t.delay, r.endDelay = n ? r.duration - Math.max.apply(Math, e.map(function(s) {
    return o(s) + s.duration - s.endDelay;
  })) : t.endDelay, r;
}
var Mn = 0;
function Ni(e) {
  var t = It(xr, e), n = It(Zt, e), o = yi(n, e), r = Rr(e.targets), s = xi(r, o), i = Fr(s, n), a = Mn;
  return Mn++, pt(t, {
    id: a,
    children: [],
    animatables: r,
    animations: s,
    duration: i.duration,
    delay: i.delay,
    endDelay: i.endDelay
  });
}
var B = [], Lr = function() {
  var e;
  function t() {
    !e && (!Pn() || !C.suspendWhenDocumentHidden) && B.length > 0 && (e = requestAnimationFrame(n));
  }
  function n(r) {
    for (var s = B.length, i = 0; i < s; ) {
      var a = B[i];
      a.paused ? (B.splice(i, 1), s--) : (a.tick(r), i++);
    }
    e = i > 0 ? requestAnimationFrame(n) : void 0;
  }
  function o() {
    C.suspendWhenDocumentHidden && (Pn() ? e = cancelAnimationFrame(e) : (B.forEach(
      function(r) {
        return r._onDocumentVisibility();
      }
    ), Lr()));
  }
  return typeof document < "u" && document.addEventListener("visibilitychange", o), t;
}();
function Pn() {
  return !!document && document.hidden;
}
function C(e) {
  e === void 0 && (e = {});
  var t = 0, n = 0, o = 0, r, s = 0, i = null;
  function a(h) {
    var _ = window.Promise && new Promise(function(y) {
      return i = y;
    });
    return h.finished = _, _;
  }
  var c = Ni(e);
  a(c);
  function d() {
    var h = c.direction;
    h !== "alternate" && (c.direction = h !== "normal" ? "normal" : "reverse"), c.reversed = !c.reversed, r.forEach(function(_) {
      return _.reversed = c.reversed;
    });
  }
  function l(h) {
    return c.reversed ? c.duration - h : h;
  }
  function u() {
    t = 0, n = l(c.currentTime) * (1 / C.speed);
  }
  function f(h, _) {
    _ && _.seek(h - _.timelineOffset);
  }
  function g(h) {
    if (c.reversePlayback)
      for (var y = s; y--; )
        f(h, r[y]);
    else
      for (var _ = 0; _ < s; _++)
        f(h, r[_]);
  }
  function p(h) {
    for (var _ = 0, y = c.animations, U = y.length; _ < U; ) {
      var O = y[_], ce = O.animatable, we = O.tweens, ge = we.length - 1, D = we[ge];
      ge && (D = ft(we, function(Hr) {
        return h < Hr.end;
      })[0] || D);
      for (var ve = J(h - D.start - D.delay, 0, D.duration) / D.duration, Be = isNaN(ve) ? 1 : D.easing(ve), L = D.to.strings, ht = D.round, gt = [], zr = D.to.numbers.length, me = void 0, xe = 0; xe < zr; xe++) {
        var Ne = void 0, an = D.to.numbers[xe], un = D.from.numbers[xe] || 0;
        D.isPath ? Ne = vi(D.value, Be * an, D.isPathTargetInsideSVG) : Ne = un + Be * (an - un), ht && (D.isColor && xe > 2 || (Ne = Math.round(Ne * ht) / ht)), gt.push(Ne);
      }
      var ln = L.length;
      if (!ln)
        me = gt[0];
      else {
        me = L[0];
        for (var Oe = 0; Oe < ln; Oe++) {
          L[Oe];
          var fn = L[Oe + 1], vt = gt[Oe];
          isNaN(vt) || (fn ? me += vt + fn : me += vt + " ");
        }
      }
      $r[O.type](ce.target, O.property, me, ce.transforms), O.currentValue = me, _++;
    }
  }
  function v(h) {
    c[h] && !c.passThrough && c[h](c);
  }
  function E() {
    c.remaining && c.remaining !== !0 && c.remaining--;
  }
  function w(h) {
    var _ = c.duration, y = c.delay, U = _ - c.endDelay, O = l(h);
    c.progress = J(O / _ * 100, 0, 100), c.reversePlayback = O < c.currentTime, r && g(O), !c.began && c.currentTime > 0 && (c.began = !0, v("begin")), !c.loopBegan && c.currentTime > 0 && (c.loopBegan = !0, v("loopBegin")), O <= y && c.currentTime !== 0 && p(0), (O >= U && c.currentTime !== _ || !_) && p(_), O > y && O < U ? (c.changeBegan || (c.changeBegan = !0, c.changeCompleted = !1, v("changeBegin")), v("change"), p(O)) : c.changeBegan && (c.changeCompleted = !0, c.changeBegan = !1, v("changeComplete")), c.currentTime = J(O, 0, _), c.began && v("update"), h >= _ && (n = 0, E(), c.remaining ? (t = o, v("loopComplete"), c.loopBegan = !1, c.direction === "alternate" && d()) : (c.paused = !0, c.completed || (c.completed = !0, v("loopComplete"), v("complete"), !c.passThrough && "Promise" in window && (i(), a(c)))));
  }
  return c.reset = function() {
    var h = c.direction;
    c.passThrough = !1, c.currentTime = 0, c.progress = 0, c.paused = !0, c.began = !1, c.loopBegan = !1, c.changeBegan = !1, c.completed = !1, c.changeCompleted = !1, c.reversePlayback = !1, c.reversed = h === "reverse", c.remaining = c.loop, r = c.children, s = r.length;
    for (var _ = s; _--; )
      c.children[_].reset();
    (c.reversed && c.loop !== !0 || h === "alternate" && c.loop === 1) && c.remaining++, p(c.reversed ? c.duration : 0);
  }, c._onDocumentVisibility = u, c.set = function(h, _) {
    return Ar(h, _), c;
  }, c.tick = function(h) {
    o = h, t || (t = o), w((o + (n - t)) * C.speed);
  }, c.seek = function(h) {
    w(l(h));
  }, c.pause = function() {
    c.paused = !0, u();
  }, c.play = function() {
    c.paused && (c.completed && c.reset(), c.paused = !1, B.push(c), u(), Lr());
  }, c.reverse = function() {
    d(), c.completed = !c.reversed, u();
  }, c.restart = function() {
    c.reset(), c.play();
  }, c.remove = function(h) {
    var _ = cn(h);
    jr(_, c);
  }, c.reset(), c.autoplay && c.play(), c;
}
function Rn(e, t) {
  for (var n = t.length; n--; )
    Xt(e, t[n].animatable.target) && t.splice(n, 1);
}
function jr(e, t) {
  var n = t.animations, o = t.children;
  Rn(e, n);
  for (var r = o.length; r--; ) {
    var s = o[r], i = s.animations;
    Rn(e, i), !i.length && !s.children.length && o.splice(r, 1);
  }
  !n.length && !o.length && t.pause();
}
function Oi(e) {
  for (var t = cn(e), n = B.length; n--; ) {
    var o = B[n];
    jr(t, o);
  }
}
function Si(e, t) {
  t === void 0 && (t = {});
  var n = t.direction || "normal", o = t.easing ? Qt(t.easing) : null, r = t.grid, s = t.axis, i = t.from || 0, a = i === "first", c = i === "center", d = i === "last", l = m.arr(e), u = parseFloat(l ? e[0] : e), f = l ? parseFloat(e[1]) : 0, g = Z(l ? e[1] : e) || 0, p = t.start || 0 + (l ? u : 0), v = [], E = 0;
  return function(w, h, _) {
    if (a && (i = 0), c && (i = (_ - 1) / 2), d && (i = _ - 1), !v.length) {
      for (var y = 0; y < _; y++) {
        if (!r)
          v.push(Math.abs(i - y));
        else {
          var U = c ? (r[0] - 1) / 2 : i % r[0], O = c ? (r[1] - 1) / 2 : Math.floor(i / r[0]), ce = y % r[0], we = Math.floor(y / r[0]), ge = U - ce, D = O - we, ve = Math.sqrt(ge * ge + D * D);
          s === "x" && (ve = -ge), s === "y" && (ve = -D), v.push(ve);
        }
        E = Math.max.apply(Math, v);
      }
      o && (v = v.map(function(L) {
        return o(L / E) * E;
      })), n === "reverse" && (v = v.map(function(L) {
        return s ? L < 0 ? L * -1 : -L : Math.abs(E - L);
      }));
    }
    var Be = l ? (f - u) / E : u;
    return p + Be * (Math.round(v[h] * 100) / 100) + g;
  };
}
function Ci(e) {
  e === void 0 && (e = {});
  var t = C(e);
  return t.duration = 0, t.add = function(n, o) {
    var r = B.indexOf(t), s = t.children;
    r > -1 && B.splice(r, 1);
    function i(f) {
      f.passThrough = !0;
    }
    for (var a = 0; a < s.length; a++)
      i(s[a]);
    var c = pt(n, It(Zt, e));
    c.targets = c.targets || e.targets;
    var d = t.duration;
    c.autoplay = !1, c.direction = t.direction, c.timelineOffset = m.und(o) ? d : on(o, d), i(t), t.seek(c.timelineOffset);
    var l = C(c);
    i(l), s.push(l);
    var u = Fr(s, e);
    return t.delay = u.delay, t.endDelay = u.endDelay, t.duration = u.duration, t.seek(0), t.reset(), t.autoplay && t.play(), t;
  }, t;
}
C.version = "3.2.1";
C.speed = 1;
C.suspendWhenDocumentHidden = !0;
C.running = B;
C.remove = Oi;
C.get = rn;
C.set = Ar;
C.convertPx = tn;
C.path = gi;
C.setDashoffset = pi;
C.stagger = Si;
C.timeline = Ci;
C.easing = Qt;
C.penner = Sr;
C.random = function(e, t) {
  return Math.floor(Math.random() * (t - e + 1)) + e;
};
const Di = ["id"], Vi = { class: "p-4 rounded bg-white pop-over-contents" }, kr = {
  __name: "popover",
  emits: ["click-outside"],
  setup(e, { emit: t }) {
    const n = wr.string(10);
    return Jt(() => {
      const o = document.getElementById(n);
      document.querySelector("body").appendChild(o), document.addEventListener("click", (r) => {
        r.target.classList.contains("pop-over") && t("click-outside");
      });
    }), (o, r) => (H(), G("div", {
      id: Kt(n),
      style: { transform: "translateX(0)" },
      class: "z-[100] pop-over bg-[rgba(0,0,0,0.6)] w-screen h-screen top-0 left-0 fixed flex items-center justify-center"
    }, [
      ie("div", Vi, [
        je(o.$slots, "default")
      ])
    ], 8, Di));
  }
}, Ti = ["onClick"], Ii = ["innerHTML"], Mi = { class: "pointer-events-none" }, Br = {
  __name: "right-click-popup",
  props: {
    items: Array
  },
  setup(e) {
    const t = Bt({
      top: 0,
      left: 0
    }), n = j(null);
    return Jt(() => {
      n.value.parentElement.addEventListener("contextmenu", function(r) {
        r.preventDefault(), r.stopPropagation(), !r.ctrlKey && (document.querySelectorAll(".pop-up-box").forEach((s) => {
          r.target !== s && s.classList.add("hidden");
        }), t.top = r.pageY, t.left = r.pageX, n.value.classList.remove("hidden"));
      });
      const o = function(r) {
        n.value && !n.value.classList.contains("hidden") && (n.value.classList.add("hidden"), r.preventDefault(), r.stopPropagation());
      };
      document.addEventListener("click", o);
    }), (o, r) => (H(), G("div", {
      ref_key: "box",
      ref: n,
      class: "p-2 pop-up-box flex flex-col rounded hidden fixed bg-white shadow-lg z-50",
      style: ct({ top: t.top + "px", left: t.left + "px" })
    }, [
      (H(!0), G(ke, null, Es(e.items, (s, i) => (H(), G("button", {
        class: he([{ "border-b": i !== e.items.length - 1 }, "py-2 flex text-gray-600 items-center gap-x-4 px-2 cursor-pointer"]),
        key: i,
        onClick: s.handler
      }, [
        ie("span", {
          innerHTML: s.icon,
          class: "w-5 h-5 pointer-events-none"
        }, null, 8, Ii),
        ie("span", Mi, Yr(s.name), 1)
      ], 10, Ti))), 128))
    ], 4));
  }
};
function Pi(e, t, n) {
  const o = e.getBoundingClientRect(), r = n.target.getBoundingClientRect();
  r.left >= o.left && r.right <= o.right && r.top >= o.top && r.bottom <= o.bottom || t.value(n);
}
let wt = null;
const Ri = {
  mounted(e, t) {
    typeof t.value == "function" && (e.id = wr.string(), wt = Pi.bind(null, e, t), document.addEventListener("click", wt, !0));
  },
  unmounted(e, t) {
    typeof t.value == "function" && document.removeEventListener("click", wt, !0);
  }
}, $i = {
  count: 0,
  mounted(e, t) {
    if (typeof t.value == "function") {
      let n = 0;
      e.addEventListener("click", (o) => {
        setTimeout(() => {
          n === 2 && t.value(o), n = 0;
        }, 300), n++;
      });
    }
  },
  unmounted(e, t) {
    typeof t.value == "function" && e.removeEventListener("click", (n) => {
      this.count++, setTimeout(() => {
        this.count === 1 && (console.log("click"), t.value(n)), this.count = 0;
      }, 300);
    });
  }
}, Ai = (e) => {
  e.directive("click-outside", Ri), e.directive("double-click", $i);
}, Fi = (e) => {
  Ai(e), e.component("action-button", _e(() => _r)), e.component("alert-box", _e(() => yr)), e.component("dismissable-box", _e(() => Er)), e.component("editable-text", _e(() => br)), e.component("popover", _e(() => kr)), e.component("right-click-popover", _e(() => Br));
}, Li = {
  ActionButton: _r,
  AlertBox: yr,
  DismissableBox: Er,
  EditableText: br,
  PopOver: kr,
  RightClickPopOver: Br
};
export {
  Li as default,
  Fi as registerAll
};
