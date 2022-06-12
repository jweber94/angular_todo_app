'use strict'
;(self.webpackChunktodo_list = self.webpackChunktodo_list || []).push([
  [179],
  {
    672: () => {
      function ee(e) {
        return 'function' == typeof e
      }
      function Jo(e) {
        const t = e((i) => {
          Error.call(i), (i.stack = new Error().stack)
        })
        return (
          (t.prototype = Object.create(Error.prototype)),
          (t.prototype.constructor = t),
          t
        )
      }
      const Yo = Jo(
        (e) =>
          function (t) {
            e(this),
              (this.message = t
                ? `${t.length} errors occurred during unsubscription:\n${t
                    .map((i, r) => `${r + 1}) ${i.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = t)
          }
      )
      function Ri(e, n) {
        if (e) {
          const t = e.indexOf(n)
          0 <= t && e.splice(t, 1)
        }
      }
      class Ut {
        constructor(n) {
          ;(this.initialTeardown = n),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null)
        }
        unsubscribe() {
          let n
          if (!this.closed) {
            this.closed = !0
            const {_parentage: t} = this
            if (t)
              if (((this._parentage = null), Array.isArray(t)))
                for (const o of t) o.remove(this)
              else t.remove(this)
            const {initialTeardown: i} = this
            if (ee(i))
              try {
                i()
              } catch (o) {
                n = o instanceof Yo ? o.errors : [o]
              }
            const {_finalizers: r} = this
            if (r) {
              this._finalizers = null
              for (const o of r)
                try {
                  vf(o)
                } catch (s) {
                  ;(n = null != n ? n : []),
                    s instanceof Yo ? (n = [...n, ...s.errors]) : n.push(s)
                }
            }
            if (n) throw new Yo(n)
          }
        }
        add(n) {
          var t
          if (n && n !== this)
            if (this.closed) vf(n)
            else {
              if (n instanceof Ut) {
                if (n.closed || n._hasParent(this)) return
                n._addParent(this)
              }
              ;(this._finalizers =
                null !== (t = this._finalizers) && void 0 !== t ? t : []).push(
                n
              )
            }
        }
        _hasParent(n) {
          const {_parentage: t} = this
          return t === n || (Array.isArray(t) && t.includes(n))
        }
        _addParent(n) {
          const {_parentage: t} = this
          this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n
        }
        _removeParent(n) {
          const {_parentage: t} = this
          t === n ? (this._parentage = null) : Array.isArray(t) && Ri(t, n)
        }
        remove(n) {
          const {_finalizers: t} = this
          t && Ri(t, n), n instanceof Ut && n._removeParent(this)
        }
      }
      Ut.EMPTY = (() => {
        const e = new Ut()
        return (e.closed = !0), e
      })()
      const _f = Ut.EMPTY
      function mf(e) {
        return (
          e instanceof Ut ||
          (e && 'closed' in e && ee(e.remove) && ee(e.add) && ee(e.unsubscribe))
        )
      }
      function vf(e) {
        ee(e) ? e() : e.unsubscribe()
      }
      const ii = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Zo = {
          setTimeout(e, n, ...t) {
            const {delegate: i} = Zo
            return (null == i ? void 0 : i.setTimeout)
              ? i.setTimeout(e, n, ...t)
              : setTimeout(e, n, ...t)
          },
          clearTimeout(e) {
            const {delegate: n} = Zo
            return ((null == n ? void 0 : n.clearTimeout) || clearTimeout)(e)
          },
          delegate: void 0,
        }
      function yf(e) {
        Zo.setTimeout(() => {
          const {onUnhandledError: n} = ii
          if (!n) throw e
          n(e)
        })
      }
      function Pi() {}
      const xb = rl('C', void 0, void 0)
      function rl(e, n, t) {
        return {kind: e, value: n, error: t}
      }
      let ri = null
      function Qo(e) {
        if (ii.useDeprecatedSynchronousErrorHandling) {
          const n = !ri
          if ((n && (ri = {errorThrown: !1, error: null}), e(), n)) {
            const {errorThrown: t, error: i} = ri
            if (((ri = null), t)) throw i
          }
        } else e()
      }
      class ol extends Ut {
        constructor(n) {
          super(),
            (this.isStopped = !1),
            n
              ? ((this.destination = n), mf(n) && n.add(this))
              : (this.destination = Bb)
        }
        static create(n, t, i) {
          return new Xo(n, t, i)
        }
        next(n) {
          this.isStopped
            ? al(
                (function Pb(e) {
                  return rl('N', e, void 0)
                })(n),
                this
              )
            : this._next(n)
        }
        error(n) {
          this.isStopped
            ? al(
                (function Rb(e) {
                  return rl('E', void 0, e)
                })(n),
                this
              )
            : ((this.isStopped = !0), this._error(n))
        }
        complete() {
          this.isStopped
            ? al(xb, this)
            : ((this.isStopped = !0), this._complete())
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null))
        }
        _next(n) {
          this.destination.next(n)
        }
        _error(n) {
          try {
            this.destination.error(n)
          } finally {
            this.unsubscribe()
          }
        }
        _complete() {
          try {
            this.destination.complete()
          } finally {
            this.unsubscribe()
          }
        }
      }
      const Fb = Function.prototype.bind
      function sl(e, n) {
        return Fb.call(e, n)
      }
      class Lb {
        constructor(n) {
          this.partialObserver = n
        }
        next(n) {
          const {partialObserver: t} = this
          if (t.next)
            try {
              t.next(n)
            } catch (i) {
              es(i)
            }
        }
        error(n) {
          const {partialObserver: t} = this
          if (t.error)
            try {
              t.error(n)
            } catch (i) {
              es(i)
            }
          else es(n)
        }
        complete() {
          const {partialObserver: n} = this
          if (n.complete)
            try {
              n.complete()
            } catch (t) {
              es(t)
            }
        }
      }
      class Xo extends ol {
        constructor(n, t, i) {
          let r
          if ((super(), ee(n) || !n))
            r = {
              next: null != n ? n : void 0,
              error: null != t ? t : void 0,
              complete: null != i ? i : void 0,
            }
          else {
            let o
            this && ii.useDeprecatedNextContext
              ? ((o = Object.create(n)),
                (o.unsubscribe = () => this.unsubscribe()),
                (r = {
                  next: n.next && sl(n.next, o),
                  error: n.error && sl(n.error, o),
                  complete: n.complete && sl(n.complete, o),
                }))
              : (r = n)
          }
          this.destination = new Lb(r)
        }
      }
      function es(e) {
        ii.useDeprecatedSynchronousErrorHandling
          ? (function kb(e) {
              ii.useDeprecatedSynchronousErrorHandling &&
                ri &&
                ((ri.errorThrown = !0), (ri.error = e))
            })(e)
          : yf(e)
      }
      function al(e, n) {
        const {onStoppedNotification: t} = ii
        t && Zo.setTimeout(() => t(e, n))
      }
      const Bb = {
          closed: !0,
          next: Pi,
          error: function Vb(e) {
            throw e
          },
          complete: Pi,
        },
        ll =
          ('function' == typeof Symbol && Symbol.observable) || '@@observable'
      function oi(e) {
        return e
      }
      let be = (() => {
        class e {
          constructor(t) {
            t && (this._subscribe = t)
          }
          lift(t) {
            const i = new e()
            return (i.source = this), (i.operator = t), i
          }
          subscribe(t, i, r) {
            const o = (function jb(e) {
              return (
                (e && e instanceof ol) ||
                ((function Hb(e) {
                  return e && ee(e.next) && ee(e.error) && ee(e.complete)
                })(e) &&
                  mf(e))
              )
            })(t)
              ? t
              : new Xo(t, i, r)
            return (
              Qo(() => {
                const {operator: s, source: a} = this
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                )
              }),
              o
            )
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t)
            } catch (i) {
              t.error(i)
            }
          }
          forEach(t, i) {
            return new (i = Df(i))((r, o) => {
              const s = new Xo({
                next: (a) => {
                  try {
                    t(a)
                  } catch (l) {
                    o(l), s.unsubscribe()
                  }
                },
                error: o,
                complete: r,
              })
              this.subscribe(s)
            })
          }
          _subscribe(t) {
            var i
            return null === (i = this.source) || void 0 === i
              ? void 0
              : i.subscribe(t)
          }
          [ll]() {
            return this
          }
          pipe(...t) {
            return (function bf(e) {
              return 0 === e.length
                ? oi
                : 1 === e.length
                ? e[0]
                : function (t) {
                    return e.reduce((i, r) => r(i), t)
                  }
            })(t)(this)
          }
          toPromise(t) {
            return new (t = Df(t))((i, r) => {
              let o
              this.subscribe(
                (s) => (o = s),
                (s) => r(s),
                () => i(o)
              )
            })
          }
        }
        return (e.create = (n) => new e(n)), e
      })()
      function Df(e) {
        var n
        return null !== (n = null != e ? e : ii.Promise) && void 0 !== n
          ? n
          : Promise
      }
      const Ub = Jo(
        (e) =>
          function () {
            e(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed')
          }
      )
      let We = (() => {
        class e extends be {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null)
          }
          lift(t) {
            const i = new Cf(this, this)
            return (i.operator = t), i
          }
          _throwIfClosed() {
            if (this.closed) throw new Ub()
          }
          next(t) {
            Qo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers))
                for (const i of this.currentObservers) i.next(t)
              }
            })
          }
          error(t) {
            Qo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                ;(this.hasError = this.isStopped = !0), (this.thrownError = t)
                const {observers: i} = this
                for (; i.length; ) i.shift().error(t)
              }
            })
          }
          complete() {
            Qo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0
                const {observers: t} = this
                for (; t.length; ) t.shift().complete()
              }
            })
          }
          unsubscribe() {
            ;(this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null)
          }
          get observed() {
            var t
            return (
              (null === (t = this.observers) || void 0 === t
                ? void 0
                : t.length) > 0
            )
          }
          _trySubscribe(t) {
            return this._throwIfClosed(), super._trySubscribe(t)
          }
          _subscribe(t) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(t),
              this._innerSubscribe(t)
            )
          }
          _innerSubscribe(t) {
            const {hasError: i, isStopped: r, observers: o} = this
            return i || r
              ? _f
              : ((this.currentObservers = null),
                o.push(t),
                new Ut(() => {
                  ;(this.currentObservers = null), Ri(o, t)
                }))
          }
          _checkFinalizedStatuses(t) {
            const {hasError: i, thrownError: r, isStopped: o} = this
            i ? t.error(r) : o && t.complete()
          }
          asObservable() {
            const t = new be()
            return (t.source = this), t
          }
        }
        return (e.create = (n, t) => new Cf(n, t)), e
      })()
      class Cf extends We {
        constructor(n, t) {
          super(), (this.destination = n), (this.source = t)
        }
        next(n) {
          var t, i
          null ===
            (i =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.next) ||
            void 0 === i ||
            i.call(t, n)
        }
        error(n) {
          var t, i
          null ===
            (i =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.error) ||
            void 0 === i ||
            i.call(t, n)
        }
        complete() {
          var n, t
          null ===
            (t =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.complete) ||
            void 0 === t ||
            t.call(n)
        }
        _subscribe(n) {
          var t, i
          return null !==
            (i =
              null === (t = this.source) || void 0 === t
                ? void 0
                : t.subscribe(n)) && void 0 !== i
            ? i
            : _f
        }
      }
      function dt(e) {
        return (n) => {
          if (
            (function Gb(e) {
              return ee(null == e ? void 0 : e.lift)
            })(n)
          )
            return n.lift(function (t) {
              try {
                return e(t, this)
              } catch (i) {
                this.error(i)
              }
            })
          throw new TypeError('Unable to lift unknown Observable type')
        }
      }
      function Ge(e, n, t, i, r) {
        return new $b(e, n, t, i, r)
      }
      class $b extends ol {
        constructor(n, t, i, r, o, s) {
          super(n),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = t
              ? function (a) {
                  try {
                    t(a)
                  } catch (l) {
                    n.error(l)
                  }
                }
              : super._next),
            (this._error = r
              ? function (a) {
                  try {
                    r(a)
                  } catch (l) {
                    n.error(l)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._error),
            (this._complete = i
              ? function () {
                  try {
                    i()
                  } catch (a) {
                    n.error(a)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._complete)
        }
        unsubscribe() {
          var n
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const {closed: t} = this
            super.unsubscribe(),
              !t &&
                (null === (n = this.onFinalize) || void 0 === n || n.call(this))
          }
        }
      }
      function At(e, n) {
        return dt((t, i) => {
          let r = 0
          t.subscribe(
            Ge(i, (o) => {
              i.next(e.call(n, o, r++))
            })
          )
        })
      }
      function si(e) {
        return this instanceof si ? ((this.v = e), this) : new si(e)
      }
      function qb(e, n, t) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.')
        var r,
          i = t.apply(e, n || []),
          o = []
        return (
          (r = {}),
          s('next'),
          s('throw'),
          s('return'),
          (r[Symbol.asyncIterator] = function () {
            return this
          }),
          r
        )
        function s(f) {
          i[f] &&
            (r[f] = function (p) {
              return new Promise(function (h, g) {
                o.push([f, p, h, g]) > 1 || a(f, p)
              })
            })
        }
        function a(f, p) {
          try {
            !(function l(f) {
              f.value instanceof si
                ? Promise.resolve(f.value.v).then(c, u)
                : d(o[0][2], f)
            })(i[f](p))
          } catch (h) {
            d(o[0][3], h)
          }
        }
        function c(f) {
          a('next', f)
        }
        function u(f) {
          a('throw', f)
        }
        function d(f, p) {
          f(p), o.shift(), o.length && a(o[0][0], o[0][1])
        }
      }
      function Kb(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.')
        var t,
          n = e[Symbol.asyncIterator]
        return n
          ? n.call(e)
          : ((e = (function Ef(e) {
              var n = 'function' == typeof Symbol && Symbol.iterator,
                t = n && e[n],
                i = 0
              if (t) return t.call(e)
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && i >= e.length && (e = void 0),
                      {value: e && e[i++], done: !e}
                    )
                  },
                }
              throw new TypeError(
                n
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.'
              )
            })(e)),
            (t = {}),
            i('next'),
            i('throw'),
            i('return'),
            (t[Symbol.asyncIterator] = function () {
              return this
            }),
            t)
        function i(o) {
          t[o] =
            e[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function r(o, s, a, l) {
                  Promise.resolve(l).then(function (c) {
                    o({value: c, done: a})
                  }, s)
                })(a, l, (s = e[o](s)).done, s.value)
              })
            }
        }
      }
      const ul = (e) =>
        e && 'number' == typeof e.length && 'function' != typeof e
      function Tf(e) {
        return ee(null == e ? void 0 : e.then)
      }
      function Mf(e) {
        return ee(e[ll])
      }
      function Af(e) {
        return (
          Symbol.asyncIterator &&
          ee(null == e ? void 0 : e[Symbol.asyncIterator])
        )
      }
      function Of(e) {
        return new TypeError(
          `You provided ${
            null !== e && 'object' == typeof e ? 'an invalid object' : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        )
      }
      const Sf = (function Yb() {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator'
      })()
      function If(e) {
        return ee(null == e ? void 0 : e[Sf])
      }
      function xf(e) {
        return qb(this, arguments, function* () {
          const t = e.getReader()
          try {
            for (;;) {
              const {value: i, done: r} = yield si(t.read())
              if (r) return yield si(void 0)
              yield yield si(i)
            }
          } finally {
            t.releaseLock()
          }
        })
      }
      function Rf(e) {
        return ee(null == e ? void 0 : e.getReader)
      }
      function ft(e) {
        if (e instanceof be) return e
        if (null != e) {
          if (Mf(e))
            return (function Zb(e) {
              return new be((n) => {
                const t = e[ll]()
                if (ee(t.subscribe)) return t.subscribe(n)
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                )
              })
            })(e)
          if (ul(e))
            return (function Qb(e) {
              return new be((n) => {
                for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t])
                n.complete()
              })
            })(e)
          if (Tf(e))
            return (function Xb(e) {
              return new be((n) => {
                e.then(
                  (t) => {
                    n.closed || (n.next(t), n.complete())
                  },
                  (t) => n.error(t)
                ).then(null, yf)
              })
            })(e)
          if (Af(e)) return Pf(e)
          if (If(e))
            return (function eD(e) {
              return new be((n) => {
                for (const t of e) if ((n.next(t), n.closed)) return
                n.complete()
              })
            })(e)
          if (Rf(e))
            return (function tD(e) {
              return Pf(xf(e))
            })(e)
        }
        throw Of(e)
      }
      function Pf(e) {
        return new be((n) => {
          ;(function nD(e, n) {
            var t, i, r, o
            return (function Wb(e, n, t, i) {
              return new (t || (t = Promise))(function (o, s) {
                function a(u) {
                  try {
                    c(i.next(u))
                  } catch (d) {
                    s(d)
                  }
                }
                function l(u) {
                  try {
                    c(i.throw(u))
                  } catch (d) {
                    s(d)
                  }
                }
                function c(u) {
                  u.done
                    ? o(u.value)
                    : (function r(o) {
                        return o instanceof t
                          ? o
                          : new t(function (s) {
                              s(o)
                            })
                      })(u.value).then(a, l)
                }
                c((i = i.apply(e, n || [])).next())
              })
            })(this, void 0, void 0, function* () {
              try {
                for (t = Kb(e); !(i = yield t.next()).done; )
                  if ((n.next(i.value), n.closed)) return
              } catch (s) {
                r = {error: s}
              } finally {
                try {
                  i && !i.done && (o = t.return) && (yield o.call(t))
                } finally {
                  if (r) throw r.error
                }
              }
              n.complete()
            })
          })(e, n).catch((t) => n.error(t))
        })
      }
      function wn(e, n, t, i = 0, r = !1) {
        const o = n.schedule(function () {
          t(), r ? e.add(this.schedule(null, i)) : this.unsubscribe()
        }, i)
        if ((e.add(o), !r)) return o
      }
      function ts(e, n, t = 1 / 0) {
        return ee(n)
          ? ts((i, r) => At((o, s) => n(i, o, r, s))(ft(e(i, r))), t)
          : ('number' == typeof n && (t = n),
            dt((i, r) =>
              (function iD(e, n, t, i, r, o, s, a) {
                const l = []
                let c = 0,
                  u = 0,
                  d = !1
                const f = () => {
                    d && !l.length && !c && n.complete()
                  },
                  p = (g) => (c < i ? h(g) : l.push(g)),
                  h = (g) => {
                    o && n.next(g), c++
                    let v = !1
                    ft(t(g, u++)).subscribe(
                      Ge(
                        n,
                        (y) => {
                          null == r || r(y), o ? p(y) : n.next(y)
                        },
                        () => {
                          v = !0
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (c--; l.length && c < i; ) {
                                const y = l.shift()
                                s ? wn(n, s, () => h(y)) : h(y)
                              }
                              f()
                            } catch (y) {
                              n.error(y)
                            }
                        }
                      )
                    )
                  }
                return (
                  e.subscribe(
                    Ge(n, p, () => {
                      ;(d = !0), f()
                    })
                  ),
                  () => {
                    null == a || a()
                  }
                )
              })(i, r, e, t)
            ))
      }
      function kf(e = 1 / 0) {
        return ts(oi, e)
      }
      const kr = new be((e) => e.complete())
      function Ff(e) {
        return e && ee(e.schedule)
      }
      function dl(e) {
        return e[e.length - 1]
      }
      function ns(e) {
        return ee(dl(e)) ? e.pop() : void 0
      }
      function Fr(e) {
        return Ff(dl(e)) ? e.pop() : void 0
      }
      function Lf(e, n = 0) {
        return dt((t, i) => {
          t.subscribe(
            Ge(
              i,
              (r) => wn(i, e, () => i.next(r), n),
              () => wn(i, e, () => i.complete(), n),
              (r) => wn(i, e, () => i.error(r), n)
            )
          )
        })
      }
      function Vf(e, n = 0) {
        return dt((t, i) => {
          i.add(e.schedule(() => t.subscribe(i), n))
        })
      }
      function Bf(e, n) {
        if (!e) throw new Error('Iterable cannot be null')
        return new be((t) => {
          wn(t, n, () => {
            const i = e[Symbol.asyncIterator]()
            wn(
              t,
              n,
              () => {
                i.next().then((r) => {
                  r.done ? t.complete() : t.next(r.value)
                })
              },
              0,
              !0
            )
          })
        })
      }
      function ai(e, n) {
        return n
          ? (function dD(e, n) {
              if (null != e) {
                if (Mf(e))
                  return (function sD(e, n) {
                    return ft(e).pipe(Vf(n), Lf(n))
                  })(e, n)
                if (ul(e))
                  return (function lD(e, n) {
                    return new be((t) => {
                      let i = 0
                      return n.schedule(function () {
                        i === e.length
                          ? t.complete()
                          : (t.next(e[i++]), t.closed || this.schedule())
                      })
                    })
                  })(e, n)
                if (Tf(e))
                  return (function aD(e, n) {
                    return ft(e).pipe(Vf(n), Lf(n))
                  })(e, n)
                if (Af(e)) return Bf(e, n)
                if (If(e))
                  return (function cD(e, n) {
                    return new be((t) => {
                      let i
                      return (
                        wn(t, n, () => {
                          ;(i = e[Sf]()),
                            wn(
                              t,
                              n,
                              () => {
                                let r, o
                                try {
                                  ;({value: r, done: o} = i.next())
                                } catch (s) {
                                  return void t.error(s)
                                }
                                o ? t.complete() : t.next(r)
                              },
                              0,
                              !0
                            )
                        }),
                        () => ee(null == i ? void 0 : i.return) && i.return()
                      )
                    })
                  })(e, n)
                if (Rf(e))
                  return (function uD(e, n) {
                    return Bf(xf(e), n)
                  })(e, n)
              }
              throw Of(e)
            })(e, n)
          : ft(e)
      }
      function mt(e) {
        return e <= 0
          ? () => kr
          : dt((n, t) => {
              let i = 0
              n.subscribe(
                Ge(t, (r) => {
                  ++i <= e && (t.next(r), e <= i && t.complete())
                })
              )
            })
      }
      function fl(e, n, ...t) {
        return !0 === n
          ? (e(), null)
          : !1 === n
          ? null
          : n(...t)
              .pipe(mt(1))
              .subscribe(() => e())
      }
      function se(e) {
        for (let n in e) if (e[n] === se) return n
        throw Error('Could not find renamed property on target object.')
      }
      function pl(e, n) {
        for (const t in n)
          n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t])
      }
      function ie(e) {
        if ('string' == typeof e) return e
        if (Array.isArray(e)) return '[' + e.map(ie).join(', ') + ']'
        if (null == e) return '' + e
        if (e.overriddenName) return `${e.overriddenName}`
        if (e.name) return `${e.name}`
        const n = e.toString()
        if (null == n) return '' + n
        const t = n.indexOf('\n')
        return -1 === t ? n : n.substring(0, t)
      }
      function hl(e, n) {
        return null == e || '' === e
          ? null === n
            ? ''
            : n
          : null == n || '' === n
          ? e
          : e + ' ' + n
      }
      const hD = se({__forward_ref__: se})
      function X(e) {
        return (
          (e.__forward_ref__ = X),
          (e.toString = function () {
            return ie(this())
          }),
          e
        )
      }
      function k(e) {
        return Hf(e) ? e() : e
      }
      function Hf(e) {
        return (
          'function' == typeof e &&
          e.hasOwnProperty(hD) &&
          e.__forward_ref__ === X
        )
      }
      class J extends Error {
        constructor(n, t) {
          super(
            (function gl(e, n) {
              return `NG0${Math.abs(e)}${n ? ': ' + n : ''}`
            })(n, t)
          ),
            (this.code = n)
        }
      }
      function S(e) {
        return 'string' == typeof e ? e : null == e ? '' : String(e)
      }
      function ze(e) {
        return 'function' == typeof e
          ? e.name || e.toString()
          : 'object' == typeof e && null != e && 'function' == typeof e.type
          ? e.type.name || e.type.toString()
          : S(e)
      }
      function is(e, n) {
        const t = n ? ` in ${n}` : ''
        throw new J(-201, `No provider for ${ze(e)} found${t}`)
      }
      function yt(e, n) {
        null == e &&
          (function ae(e, n, t, i) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == i ? '' : ` [Expected=> ${t} ${i} ${n} <=Actual]`)
            )
          })(n, e, null, '!=')
      }
      function q(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        }
      }
      function re(e) {
        return {providers: e.providers || [], imports: e.imports || []}
      }
      function _l(e) {
        return jf(e, rs) || jf(e, Gf)
      }
      function jf(e, n) {
        return e.hasOwnProperty(n) ? e[n] : null
      }
      function Uf(e) {
        return e && (e.hasOwnProperty(ml) || e.hasOwnProperty(DD))
          ? e[ml]
          : null
      }
      const rs = se({ɵprov: se}),
        ml = se({ɵinj: se}),
        Gf = se({ngInjectableDef: se}),
        DD = se({ngInjectorDef: se})
      var R = (() => (
        ((R = R || {})[(R.Default = 0)] = 'Default'),
        (R[(R.Host = 1)] = 'Host'),
        (R[(R.Self = 2)] = 'Self'),
        (R[(R.SkipSelf = 4)] = 'SkipSelf'),
        (R[(R.Optional = 8)] = 'Optional'),
        R
      ))()
      let vl
      function Vn(e) {
        const n = vl
        return (vl = e), n
      }
      function $f(e, n, t) {
        const i = _l(e)
        return i && 'root' == i.providedIn
          ? void 0 === i.value
            ? (i.value = i.factory())
            : i.value
          : t & R.Optional
          ? null
          : void 0 !== n
          ? n
          : void is(ie(e), 'Injector')
      }
      function Bn(e) {
        return {toString: e}.toString()
      }
      var Gt = (() => (
          ((Gt = Gt || {})[(Gt.OnPush = 0)] = 'OnPush'),
          (Gt[(Gt.Default = 1)] = 'Default'),
          Gt
        ))(),
        an = (() => {
          return (
            ((e = an || (an = {}))[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            an
          )
          var e
        })()
      const wD = 'undefined' != typeof globalThis && globalThis,
        ND = 'undefined' != typeof window && window,
        ED =
          'undefined' != typeof self &&
          'undefined' != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        oe = wD || ('undefined' != typeof global && global) || ND || ED,
        ki = {},
        le = [],
        os = se({ɵcmp: se}),
        yl = se({ɵdir: se}),
        bl = se({ɵpipe: se}),
        Wf = se({ɵmod: se}),
        En = se({ɵfac: se}),
        Lr = se({__NG_ELEMENT_ID__: se})
      let TD = 0
      function ln(e) {
        return Bn(() => {
          const t = {},
            i = {
              type: e.type,
              providersResolver: null,
              decls: e.decls,
              vars: e.vars,
              factory: null,
              template: e.template || null,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              hostBindings: e.hostBindings || null,
              hostVars: e.hostVars || 0,
              hostAttrs: e.hostAttrs || null,
              contentQueries: e.contentQueries || null,
              declaredInputs: t,
              inputs: null,
              outputs: null,
              exportAs: e.exportAs || null,
              onPush: e.changeDetection === Gt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: e.selectors || le,
              viewQuery: e.viewQuery || null,
              features: e.features || null,
              data: e.data || {},
              encapsulation: e.encapsulation || an.Emulated,
              id: 'c',
              styles: e.styles || le,
              _: null,
              setInput: null,
              schemas: e.schemas || null,
              tView: null,
            },
            r = e.directives,
            o = e.features,
            s = e.pipes
          return (
            (i.id += TD++),
            (i.inputs = Jf(e.inputs, t)),
            (i.outputs = Jf(e.outputs)),
            o && o.forEach((a) => a(i)),
            (i.directiveDefs = r
              ? () => ('function' == typeof r ? r() : r).map(zf)
              : null),
            (i.pipeDefs = s
              ? () => ('function' == typeof s ? s() : s).map(qf)
              : null),
            i
          )
        })
      }
      function zf(e) {
        return (
          Je(e) ||
          (function Hn(e) {
            return e[yl] || null
          })(e)
        )
      }
      function qf(e) {
        return (function li(e) {
          return e[bl] || null
        })(e)
      }
      const Kf = {}
      function ce(e) {
        return Bn(() => {
          const n = {
            type: e.type,
            bootstrap: e.bootstrap || le,
            declarations: e.declarations || le,
            imports: e.imports || le,
            exports: e.exports || le,
            transitiveCompileScopes: null,
            schemas: e.schemas || null,
            id: e.id || null,
          }
          return null != e.id && (Kf[e.id] = e.type), n
        })
      }
      function Jf(e, n) {
        if (null == e) return ki
        const t = {}
        for (const i in e)
          if (e.hasOwnProperty(i)) {
            let r = e[i],
              o = r
            Array.isArray(r) && ((o = r[1]), (r = r[0])),
              (t[r] = i),
              n && (n[r] = o)
          }
        return t
      }
      const w = ln
      function Je(e) {
        return e[os] || null
      }
      function Ot(e, n) {
        const t = e[Wf] || null
        if (!t && !0 === n)
          throw new Error(`Type ${ie(e)} does not have '\u0275mod' property.`)
        return t
      }
      const F = 11
      function cn(e) {
        return Array.isArray(e) && 'object' == typeof e[1]
      }
      function Wt(e) {
        return Array.isArray(e) && !0 === e[1]
      }
      function wl(e) {
        return 0 != (8 & e.flags)
      }
      function cs(e) {
        return 2 == (2 & e.flags)
      }
      function us(e) {
        return 1 == (1 & e.flags)
      }
      function zt(e) {
        return null !== e.template
      }
      function xD(e) {
        return 0 != (512 & e[2])
      }
      function fi(e, n) {
        return e.hasOwnProperty(En) ? e[En] : null
      }
      class kD {
        constructor(n, t, i) {
          ;(this.previousValue = n),
            (this.currentValue = t),
            (this.firstChange = i)
        }
        isFirstChange() {
          return this.firstChange
        }
      }
      function It() {
        return Zf
      }
      function Zf(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = LD), FD
      }
      function FD() {
        const e = Xf(this),
          n = null == e ? void 0 : e.current
        if (n) {
          const t = e.previous
          if (t === ki) e.previous = n
          else for (let i in n) t[i] = n[i]
          ;(e.current = null), this.ngOnChanges(n)
        }
      }
      function LD(e, n, t, i) {
        const r =
            Xf(e) ||
            (function VD(e, n) {
              return (e[Qf] = n)
            })(e, {previous: ki, current: null}),
          o = r.current || (r.current = {}),
          s = r.previous,
          a = this.declaredInputs[t],
          l = s[a]
        ;(o[a] = new kD(l && l.currentValue, n, s === ki)), (e[i] = n)
      }
      It.ngInherit = !0
      const Qf = '__ngSimpleChanges__'
      function Xf(e) {
        return e[Qf] || null
      }
      let Al
      function De(e) {
        return !!e.listen
      }
      const ep = {
        createRenderer: (e, n) =>
          (function Ol() {
            return void 0 !== Al
              ? Al
              : 'undefined' != typeof document
              ? document
              : void 0
          })(),
      }
      function xe(e) {
        for (; Array.isArray(e); ) e = e[0]
        return e
      }
      function ds(e, n) {
        return xe(n[e])
      }
      function Rt(e, n) {
        return xe(n[e.index])
      }
      function Sl(e, n) {
        return e.data[n]
      }
      function Dt(e, n) {
        const t = n[e]
        return cn(t) ? t : t[0]
      }
      function tp(e) {
        return 4 == (4 & e[2])
      }
      function Il(e) {
        return 128 == (128 & e[2])
      }
      function jn(e, n) {
        return null == n ? null : e[n]
      }
      function np(e) {
        e[18] = 0
      }
      function xl(e, n) {
        e[5] += n
        let t = e,
          i = e[3]
        for (
          ;
          null !== i && ((1 === n && 1 === t[5]) || (-1 === n && 0 === t[5]));

        )
          (i[5] += n), (t = i), (i = i[3])
      }
      const I = {lFrame: dp(null), bindingsEnabled: !0}
      function rp() {
        return I.bindingsEnabled
      }
      function b() {
        return I.lFrame.lView
      }
      function Y() {
        return I.lFrame.tView
      }
      function Pt(e) {
        return (I.lFrame.contextLView = e), e[8]
      }
      function Fe() {
        let e = op()
        for (; null !== e && 64 === e.type; ) e = e.parent
        return e
      }
      function op() {
        return I.lFrame.currentTNode
      }
      function un(e, n) {
        const t = I.lFrame
        ;(t.currentTNode = e), (t.isParent = n)
      }
      function Rl() {
        return I.lFrame.isParent
      }
      function Pl() {
        I.lFrame.isParent = !1
      }
      function ji() {
        return I.lFrame.bindingIndex++
      }
      function Mn(e) {
        const n = I.lFrame,
          t = n.bindingIndex
        return (n.bindingIndex = n.bindingIndex + e), t
      }
      function t1(e, n) {
        const t = I.lFrame
        ;(t.bindingIndex = t.bindingRootIndex = e), kl(n)
      }
      function kl(e) {
        I.lFrame.currentDirectiveIndex = e
      }
      function lp() {
        return I.lFrame.currentQueryIndex
      }
      function Ll(e) {
        I.lFrame.currentQueryIndex = e
      }
      function i1(e) {
        const n = e[1]
        return 2 === n.type ? n.declTNode : 1 === n.type ? e[6] : null
      }
      function cp(e, n, t) {
        if (t & R.SkipSelf) {
          let r = n,
            o = e
          for (
            ;
            !((r = r.parent),
            null !== r ||
              t & R.Host ||
              ((r = i1(o)), null === r || ((o = o[15]), 10 & r.type)));

          );
          if (null === r) return !1
          ;(n = r), (e = o)
        }
        const i = (I.lFrame = up())
        return (i.currentTNode = n), (i.lView = e), !0
      }
      function ps(e) {
        const n = up(),
          t = e[1]
        ;(I.lFrame = n),
          (n.currentTNode = t.firstChild),
          (n.lView = e),
          (n.tView = t),
          (n.contextLView = e),
          (n.bindingIndex = t.bindingStartIndex),
          (n.inI18n = !1)
      }
      function up() {
        const e = I.lFrame,
          n = null === e ? null : e.child
        return null === n ? dp(e) : n
      }
      function dp(e) {
        const n = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        }
        return null !== e && (e.child = n), n
      }
      function fp() {
        const e = I.lFrame
        return (
          (I.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        )
      }
      const pp = fp
      function hs() {
        const e = fp()
        ;(e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0)
      }
      function nt() {
        return I.lFrame.selectedIndex
      }
      function Un(e) {
        I.lFrame.selectedIndex = e
      }
      function Ce() {
        const e = I.lFrame
        return Sl(e.tView, e.selectedIndex)
      }
      function gs(e, n) {
        for (let t = n.directiveStart, i = n.directiveEnd; t < i; t++) {
          const o = e.data[t].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: c,
              ngOnDestroy: u,
            } = o
          s && (e.contentHooks || (e.contentHooks = [])).push(-t, s),
            a &&
              ((e.contentHooks || (e.contentHooks = [])).push(t, a),
              (e.contentCheckHooks || (e.contentCheckHooks = [])).push(t, a)),
            l && (e.viewHooks || (e.viewHooks = [])).push(-t, l),
            c &&
              ((e.viewHooks || (e.viewHooks = [])).push(t, c),
              (e.viewCheckHooks || (e.viewCheckHooks = [])).push(t, c)),
            null != u && (e.destroyHooks || (e.destroyHooks = [])).push(t, u)
        }
      }
      function _s(e, n, t) {
        hp(e, n, 3, t)
      }
      function ms(e, n, t, i) {
        ;(3 & e[2]) === t && hp(e, n, t, i)
      }
      function Vl(e, n) {
        let t = e[2]
        ;(3 & t) === n && ((t &= 2047), (t += 1), (e[2] = t))
      }
      function hp(e, n, t, i) {
        const o = null != i ? i : -1,
          s = n.length - 1
        let a = 0
        for (let l = void 0 !== i ? 65535 & e[18] : 0; l < s; l++)
          if ('number' == typeof n[l + 1]) {
            if (((a = n[l]), null != i && a >= i)) break
          } else
            n[l] < 0 && (e[18] += 65536),
              (a < o || -1 == o) &&
                (f1(e, t, n, l), (e[18] = (4294901760 & e[18]) + l + 2)),
              l++
      }
      function f1(e, n, t, i) {
        const r = t[i] < 0,
          o = t[i + 1],
          a = e[r ? -t[i] : t[i]]
        if (r) {
          if (e[2] >> 11 < e[18] >> 16 && (3 & e[2]) === n) {
            e[2] += 2048
            try {
              o.call(a)
            } finally {
            }
          }
        } else
          try {
            o.call(a)
          } finally {
          }
      }
      class Ur {
        constructor(n, t, i) {
          ;(this.factory = n),
            (this.resolving = !1),
            (this.canSeeViewProviders = t),
            (this.injectImpl = i)
        }
      }
      function vs(e, n, t) {
        const i = De(e)
        let r = 0
        for (; r < t.length; ) {
          const o = t[r]
          if ('number' == typeof o) {
            if (0 !== o) break
            r++
            const s = t[r++],
              a = t[r++],
              l = t[r++]
            i ? e.setAttribute(n, a, l, s) : n.setAttributeNS(s, a, l)
          } else {
            const s = o,
              a = t[++r]
            Hl(s)
              ? i && e.setProperty(n, s, a)
              : i
              ? e.setAttribute(n, s, a)
              : n.setAttribute(s, a),
              r++
          }
        }
        return r
      }
      function gp(e) {
        return 3 === e || 4 === e || 6 === e
      }
      function Hl(e) {
        return 64 === e.charCodeAt(0)
      }
      function ys(e, n) {
        if (null !== n && 0 !== n.length)
          if (null === e || 0 === e.length) e = n.slice()
          else {
            let t = -1
            for (let i = 0; i < n.length; i++) {
              const r = n[i]
              'number' == typeof r
                ? (t = r)
                : 0 === t ||
                  _p(e, t, r, null, -1 === t || 2 === t ? n[++i] : null)
            }
          }
        return e
      }
      function _p(e, n, t, i, r) {
        let o = 0,
          s = e.length
        if (-1 === n) s = -1
        else
          for (; o < e.length; ) {
            const a = e[o++]
            if ('number' == typeof a) {
              if (a === n) {
                s = -1
                break
              }
              if (a > n) {
                s = o - 1
                break
              }
            }
          }
        for (; o < e.length; ) {
          const a = e[o]
          if ('number' == typeof a) break
          if (a === t) {
            if (null === i) return void (null !== r && (e[o + 1] = r))
            if (i === e[o + 1]) return void (e[o + 2] = r)
          }
          o++, null !== i && o++, null !== r && o++
        }
        ;-1 !== s && (e.splice(s, 0, n), (o = s + 1)),
          e.splice(o++, 0, t),
          null !== i && e.splice(o++, 0, i),
          null !== r && e.splice(o++, 0, r)
      }
      function mp(e) {
        return -1 !== e
      }
      function Ui(e) {
        return 32767 & e
      }
      function Gi(e, n) {
        let t = (function m1(e) {
            return e >> 16
          })(e),
          i = n
        for (; t > 0; ) (i = i[15]), t--
        return i
      }
      let jl = !0
      function bs(e) {
        const n = jl
        return (jl = e), n
      }
      let v1 = 0
      function $r(e, n) {
        const t = Gl(e, n)
        if (-1 !== t) return t
        const i = n[1]
        i.firstCreatePass &&
          ((e.injectorIndex = n.length),
          Ul(i.data, e),
          Ul(n, null),
          Ul(i.blueprint, null))
        const r = Ds(e, n),
          o = e.injectorIndex
        if (mp(r)) {
          const s = Ui(r),
            a = Gi(r, n),
            l = a[1].data
          for (let c = 0; c < 8; c++) n[o + c] = a[s + c] | l[s + c]
        }
        return (n[o + 8] = r), o
      }
      function Ul(e, n) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, n)
      }
      function Gl(e, n) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === n[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex
      }
      function Ds(e, n) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex
        let t = 0,
          i = null,
          r = n
        for (; null !== r; ) {
          const o = r[1],
            s = o.type
          if (((i = 2 === s ? o.declTNode : 1 === s ? r[6] : null), null === i))
            return -1
          if ((t++, (r = r[15]), -1 !== i.injectorIndex))
            return i.injectorIndex | (t << 16)
        }
        return -1
      }
      function Cs(e, n, t) {
        !(function y1(e, n, t) {
          let i
          'string' == typeof t
            ? (i = t.charCodeAt(0) || 0)
            : t.hasOwnProperty(Lr) && (i = t[Lr]),
            null == i && (i = t[Lr] = v1++)
          const r = 255 & i
          n.data[e + (r >> 5)] |= 1 << r
        })(e, n, t)
      }
      function bp(e, n, t) {
        if (t & R.Optional) return e
        is(n, 'NodeInjector')
      }
      function Dp(e, n, t, i) {
        if (
          (t & R.Optional && void 0 === i && (i = null),
          0 == (t & (R.Self | R.Host)))
        ) {
          const r = e[9],
            o = Vn(void 0)
          try {
            return r ? r.get(n, i, t & R.Optional) : $f(n, i, t & R.Optional)
          } finally {
            Vn(o)
          }
        }
        return bp(i, n, t)
      }
      function Cp(e, n, t, i = R.Default, r) {
        if (null !== e) {
          const o = (function w1(e) {
            if ('string' == typeof e) return e.charCodeAt(0) || 0
            const n = e.hasOwnProperty(Lr) ? e[Lr] : void 0
            return 'number' == typeof n ? (n >= 0 ? 255 & n : D1) : n
          })(t)
          if ('function' == typeof o) {
            if (!cp(n, e, i)) return i & R.Host ? bp(r, t, i) : Dp(n, t, i, r)
            try {
              const s = o(i)
              if (null != s || i & R.Optional) return s
              is(t)
            } finally {
              pp()
            }
          } else if ('number' == typeof o) {
            let s = null,
              a = Gl(e, n),
              l = -1,
              c = i & R.Host ? n[16][6] : null
            for (
              (-1 === a || i & R.SkipSelf) &&
              ((l = -1 === a ? Ds(e, n) : n[a + 8]),
              -1 !== l && Ep(i, !1)
                ? ((s = n[1]), (a = Ui(l)), (n = Gi(l, n)))
                : (a = -1));
              -1 !== a;

            ) {
              const u = n[1]
              if (Np(o, a, u.data)) {
                const d = C1(a, n, t, s, i, c)
                if (d !== wp) return d
              }
              ;(l = n[a + 8]),
                -1 !== l && Ep(i, n[1].data[a + 8] === c) && Np(o, a, n)
                  ? ((s = u), (a = Ui(l)), (n = Gi(l, n)))
                  : (a = -1)
            }
          }
        }
        return Dp(n, t, i, r)
      }
      const wp = {}
      function D1() {
        return new $i(Fe(), b())
      }
      function C1(e, n, t, i, r, o) {
        const s = n[1],
          a = s.data[e + 8],
          u = ws(
            a,
            s,
            t,
            null == i ? cs(a) && jl : i != s && 0 != (3 & a.type),
            r & R.Host && o === a
          )
        return null !== u ? Wr(n, s, u, a) : wp
      }
      function ws(e, n, t, i, r) {
        const o = e.providerIndexes,
          s = n.data,
          a = 1048575 & o,
          l = e.directiveStart,
          u = o >> 20,
          f = r ? a + u : e.directiveEnd
        for (let p = i ? a : a + u; p < f; p++) {
          const h = s[p]
          if ((p < l && t === h) || (p >= l && h.type === t)) return p
        }
        if (r) {
          const p = s[l]
          if (p && zt(p) && p.type === t) return l
        }
        return null
      }
      function Wr(e, n, t, i) {
        let r = e[t]
        const o = n.data
        if (
          (function p1(e) {
            return e instanceof Ur
          })(r)
        ) {
          const s = r
          s.resolving &&
            (function gD(e, n) {
              const t = n ? `. Dependency path: ${n.join(' > ')} > ${e}` : ''
              throw new J(
                -200,
                `Circular dependency in DI detected for ${e}${t}`
              )
            })(ze(o[t]))
          const a = bs(s.canSeeViewProviders)
          s.resolving = !0
          const l = s.injectImpl ? Vn(s.injectImpl) : null
          cp(e, i, R.Default)
          try {
            ;(r = e[t] = s.factory(void 0, o, e, i)),
              n.firstCreatePass &&
                t >= i.directiveStart &&
                (function d1(e, n, t) {
                  const {
                    ngOnChanges: i,
                    ngOnInit: r,
                    ngDoCheck: o,
                  } = n.type.prototype
                  if (i) {
                    const s = Zf(n)
                    ;(t.preOrderHooks || (t.preOrderHooks = [])).push(e, s),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(e, s)
                  }
                  r &&
                    (t.preOrderHooks || (t.preOrderHooks = [])).push(0 - e, r),
                    o &&
                      ((t.preOrderHooks || (t.preOrderHooks = [])).push(e, o),
                      (
                        t.preOrderCheckHooks || (t.preOrderCheckHooks = [])
                      ).push(e, o))
                })(t, o[t], n)
          } finally {
            null !== l && Vn(l), bs(a), (s.resolving = !1), pp()
          }
        }
        return r
      }
      function Np(e, n, t) {
        return !!(t[n + (e >> 5)] & (1 << e))
      }
      function Ep(e, n) {
        return !(e & R.Self || (e & R.Host && n))
      }
      class $i {
        constructor(n, t) {
          ;(this._tNode = n), (this._lView = t)
        }
        get(n, t, i) {
          return Cp(this._tNode, this._lView, n, i, t)
        }
      }
      function Ze(e) {
        return Bn(() => {
          const n = e.prototype.constructor,
            t = n[En] || $l(n),
            i = Object.prototype
          let r = Object.getPrototypeOf(e.prototype).constructor
          for (; r && r !== i; ) {
            const o = r[En] || $l(r)
            if (o && o !== t) return o
            r = Object.getPrototypeOf(r)
          }
          return (o) => new o()
        })
      }
      function $l(e) {
        return Hf(e)
          ? () => {
              const n = $l(k(e))
              return n && n()
            }
          : fi(e)
      }
      const zi = '__parameters__'
      function Ki(e, n, t) {
        return Bn(() => {
          const i = (function Wl(e) {
            return function (...t) {
              if (e) {
                const i = e(...t)
                for (const r in i) this[r] = i[r]
              }
            }
          })(n)
          function r(...o) {
            if (this instanceof r) return i.apply(this, o), this
            const s = new r(...o)
            return (a.annotation = s), a
            function a(l, c, u) {
              const d = l.hasOwnProperty(zi)
                ? l[zi]
                : Object.defineProperty(l, zi, {value: []})[zi]
              for (; d.length <= u; ) d.push(null)
              return (d[u] = d[u] || []).push(s), l
            }
          }
          return (
            t && (r.prototype = Object.create(t.prototype)),
            (r.prototype.ngMetadataName = e),
            (r.annotationCls = r),
            r
          )
        })
      }
      class K {
        constructor(n, t) {
          ;(this._desc = n),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof t
              ? (this.__NG_ELEMENT_ID__ = t)
              : void 0 !== t &&
                (this.ɵprov = q({
                  token: this,
                  providedIn: t.providedIn || 'root',
                  factory: t.factory,
                }))
        }
        toString() {
          return `InjectionToken ${this._desc}`
        }
      }
      function kt(e, n) {
        void 0 === n && (n = e)
        for (let t = 0; t < e.length; t++) {
          let i = e[t]
          Array.isArray(i)
            ? (n === e && (n = e.slice(0, t)), kt(i, n))
            : n !== e && n.push(i)
        }
        return n
      }
      function dn(e, n) {
        e.forEach((t) => (Array.isArray(t) ? dn(t, n) : n(t)))
      }
      function Mp(e, n, t) {
        n >= e.length ? e.push(t) : e.splice(n, 0, t)
      }
      function Ns(e, n) {
        return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0]
      }
      function Jr(e, n) {
        const t = []
        for (let i = 0; i < e; i++) t.push(n)
        return t
      }
      function Ct(e, n, t) {
        let i = Ji(e, n)
        return (
          i >= 0
            ? (e[1 | i] = t)
            : ((i = ~i),
              (function M1(e, n, t, i) {
                let r = e.length
                if (r == n) e.push(t, i)
                else if (1 === r) e.push(i, e[0]), (e[0] = t)
                else {
                  for (r--, e.push(e[r - 1], e[r]); r > n; )
                    (e[r] = e[r - 2]), r--
                  ;(e[n] = t), (e[n + 1] = i)
                }
              })(e, i, n, t)),
          i
        )
      }
      function ql(e, n) {
        const t = Ji(e, n)
        if (t >= 0) return e[1 | t]
      }
      function Ji(e, n) {
        return (function Sp(e, n, t) {
          let i = 0,
            r = e.length >> t
          for (; r !== i; ) {
            const o = i + ((r - i) >> 1),
              s = e[o << t]
            if (n === s) return o << t
            s > n ? (r = o) : (i = o + 1)
          }
          return ~(r << t)
        })(e, n, 1)
      }
      const Yr = {},
        Jl = '__NG_DI_FLAG__',
        Ts = 'ngTempTokenPath',
        P1 = /\n/gm,
        xp = '__source',
        F1 = se({provide: String, useValue: se})
      let Zr
      function Rp(e) {
        const n = Zr
        return (Zr = e), n
      }
      function L1(e, n = R.Default) {
        if (void 0 === Zr) throw new J(203, '')
        return null === Zr
          ? $f(e, void 0, n)
          : Zr.get(e, n & R.Optional ? null : void 0, n)
      }
      function P(e, n = R.Default) {
        return (
          (function CD() {
            return vl
          })() || L1
        )(k(e), n)
      }
      const V1 = P
      function Yl(e) {
        const n = []
        for (let t = 0; t < e.length; t++) {
          const i = k(e[t])
          if (Array.isArray(i)) {
            if (0 === i.length) throw new J(900, '')
            let r,
              o = R.Default
            for (let s = 0; s < i.length; s++) {
              const a = i[s],
                l = B1(a)
              'number' == typeof l
                ? -1 === l
                  ? (r = a.token)
                  : (o |= l)
                : (r = a)
            }
            n.push(P(r, o))
          } else n.push(P(i))
        }
        return n
      }
      function Qr(e, n) {
        return (e[Jl] = n), (e.prototype[Jl] = n), e
      }
      function B1(e) {
        return e[Jl]
      }
      const Ms = Qr(Ki('Optional'), 8),
        As = Qr(Ki('SkipSelf'), 4)
      function $n(e) {
        return e instanceof
          class Up {
            constructor(n) {
              this.changingThisBreaksApplicationSecurity = n
            }
            toString() {
              return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see https://g.co/ng/security#xss)`
            }
          }
          ? e.changingThisBreaksApplicationSecurity
          : e
      }
      const Xp = '__ngContext__'
      function Qe(e, n) {
        e[Xp] = n
      }
      function sc(e) {
        const n = (function io(e) {
          return e[Xp] || null
        })(e)
        return n ? (Array.isArray(n) ? n : n.lView) : null
      }
      function lc(e) {
        return e.ngOriginalError
      }
      function IC(e, ...n) {
        e.error(...n)
      }
      class ro {
        constructor() {
          this._console = console
        }
        handleError(n) {
          const t = this._findOriginalError(n),
            i = (function SC(e) {
              return (e && e.ngErrorLogger) || IC
            })(n)
          i(this._console, 'ERROR', n),
            t && i(this._console, 'ORIGINAL ERROR', t)
        }
        _findOriginalError(n) {
          let t = n && lc(n)
          for (; t && lc(t); ) t = lc(t)
          return t || null
        }
      }
      const jC = (() =>
        (
          ('undefined' != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(oe))()
      function pn(e) {
        return e instanceof Function ? e() : e
      }
      var wt = (() => (
        ((wt = wt || {})[(wt.Important = 1)] = 'Important'),
        (wt[(wt.DashCase = 2)] = 'DashCase'),
        wt
      ))()
      function uc(e, n) {
        return undefined(e, n)
      }
      function oo(e) {
        const n = e[3]
        return Wt(n) ? n[3] : n
      }
      function dc(e) {
        return lh(e[13])
      }
      function fc(e) {
        return lh(e[4])
      }
      function lh(e) {
        for (; null !== e && !Wt(e); ) e = e[4]
        return e
      }
      function Xi(e, n, t, i, r) {
        if (null != i) {
          let o,
            s = !1
          Wt(i) ? (o = i) : cn(i) && ((s = !0), (i = i[0]))
          const a = xe(i)
          0 === e && null !== t
            ? null == r
              ? hh(n, t, a)
              : pi(n, t, a, r || null, !0)
            : 1 === e && null !== t
            ? pi(n, t, a, r || null, !0)
            : 2 === e
            ? (function Dh(e, n, t) {
                const i = Ps(e, n)
                i &&
                  (function tw(e, n, t, i) {
                    De(e) ? e.removeChild(n, t, i) : n.removeChild(t)
                  })(e, i, n, t)
              })(n, a, s)
            : 3 === e && n.destroyNode(a),
            null != o &&
              (function rw(e, n, t, i, r) {
                const o = t[7]
                o !== xe(t) && Xi(n, e, i, o, r)
                for (let a = 10; a < t.length; a++) {
                  const l = t[a]
                  so(l[1], l, e, n, i, o)
                }
              })(n, e, o, t, r)
        }
      }
      function hc(e, n, t) {
        if (De(e)) return e.createElement(n, t)
        {
          const i =
            null !== t
              ? (function UD(e) {
                  const n = e.toLowerCase()
                  return 'svg' === n
                    ? 'http://www.w3.org/2000/svg'
                    : 'math' === n
                    ? 'http://www.w3.org/1998/MathML/'
                    : null
                })(t)
              : null
          return null === i ? e.createElement(n) : e.createElementNS(i, n)
        }
      }
      function uh(e, n) {
        const t = e[9],
          i = t.indexOf(n),
          r = n[3]
        1024 & n[2] && ((n[2] &= -1025), xl(r, -1)), t.splice(i, 1)
      }
      function gc(e, n) {
        if (e.length <= 10) return
        const t = 10 + n,
          i = e[t]
        if (i) {
          const r = i[17]
          null !== r && r !== e && uh(r, i), n > 0 && (e[t - 1][4] = i[4])
          const o = Ns(e, 10 + n)
          !(function qC(e, n) {
            so(e, n, n[F], 2, null, null), (n[0] = null), (n[6] = null)
          })(i[1], i)
          const s = o[19]
          null !== s && s.detachView(o[1]),
            (i[3] = null),
            (i[4] = null),
            (i[2] &= -129)
        }
        return i
      }
      function dh(e, n) {
        if (!(256 & n[2])) {
          const t = n[F]
          De(t) && t.destroyNode && so(e, n, t, 3, null, null),
            (function YC(e) {
              let n = e[13]
              if (!n) return _c(e[1], e)
              for (; n; ) {
                let t = null
                if (cn(n)) t = n[13]
                else {
                  const i = n[10]
                  i && (t = i)
                }
                if (!t) {
                  for (; n && !n[4] && n !== e; )
                    cn(n) && _c(n[1], n), (n = n[3])
                  null === n && (n = e), cn(n) && _c(n[1], n), (t = n && n[4])
                }
                n = t
              }
            })(n)
        }
      }
      function _c(e, n) {
        if (!(256 & n[2])) {
          ;(n[2] &= -129),
            (n[2] |= 256),
            (function ew(e, n) {
              let t
              if (null != e && null != (t = e.destroyHooks))
                for (let i = 0; i < t.length; i += 2) {
                  const r = n[t[i]]
                  if (!(r instanceof Ur)) {
                    const o = t[i + 1]
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = r[o[s]],
                          l = o[s + 1]
                        try {
                          l.call(a)
                        } finally {
                        }
                      }
                    else
                      try {
                        o.call(r)
                      } finally {
                      }
                  }
                }
            })(e, n),
            (function XC(e, n) {
              const t = e.cleanup,
                i = n[7]
              let r = -1
              if (null !== t)
                for (let o = 0; o < t.length - 1; o += 2)
                  if ('string' == typeof t[o]) {
                    const s = t[o + 1],
                      a = 'function' == typeof s ? s(n) : xe(n[s]),
                      l = i[(r = t[o + 2])],
                      c = t[o + 3]
                    'boolean' == typeof c
                      ? a.removeEventListener(t[o], l, c)
                      : c >= 0
                      ? i[(r = c)]()
                      : i[(r = -c)].unsubscribe(),
                      (o += 2)
                  } else {
                    const s = i[(r = t[o + 1])]
                    t[o].call(s)
                  }
              if (null !== i) {
                for (let o = r + 1; o < i.length; o++) i[o]()
                n[7] = null
              }
            })(e, n),
            1 === n[1].type && De(n[F]) && n[F].destroy()
          const t = n[17]
          if (null !== t && Wt(n[3])) {
            t !== n[3] && uh(t, n)
            const i = n[19]
            null !== i && i.detachView(e)
          }
        }
      }
      function fh(e, n, t) {
        return (function ph(e, n, t) {
          let i = n
          for (; null !== i && 40 & i.type; ) i = (n = i).parent
          if (null === i) return t[0]
          if (2 & i.flags) {
            const r = e.data[i.directiveStart].encapsulation
            if (r === an.None || r === an.Emulated) return null
          }
          return Rt(i, t)
        })(e, n.parent, t)
      }
      function pi(e, n, t, i, r) {
        De(e) ? e.insertBefore(n, t, i, r) : n.insertBefore(t, i, r)
      }
      function hh(e, n, t) {
        De(e) ? e.appendChild(n, t) : n.appendChild(t)
      }
      function gh(e, n, t, i, r) {
        null !== i ? pi(e, n, t, i, r) : hh(e, n, t)
      }
      function Ps(e, n) {
        return De(e) ? e.parentNode(n) : n.parentNode
      }
      function _h(e, n, t) {
        return vh(e, n, t)
      }
      let vh = function mh(e, n, t) {
        return 40 & e.type ? Rt(e, t) : null
      }
      function ks(e, n, t, i) {
        const r = fh(e, i, n),
          o = n[F],
          a = _h(i.parent || n[6], i, n)
        if (null != r)
          if (Array.isArray(t))
            for (let l = 0; l < t.length; l++) gh(o, r, t[l], a, !1)
          else gh(o, r, t, a, !1)
      }
      function Fs(e, n) {
        if (null !== n) {
          const t = n.type
          if (3 & t) return Rt(n, e)
          if (4 & t) return vc(-1, e[n.index])
          if (8 & t) {
            const i = n.child
            if (null !== i) return Fs(e, i)
            {
              const r = e[n.index]
              return Wt(r) ? vc(-1, r) : xe(r)
            }
          }
          if (32 & t) return uc(n, e)() || xe(e[n.index])
          {
            const i = bh(e, n)
            return null !== i
              ? Array.isArray(i)
                ? i[0]
                : Fs(oo(e[16]), i)
              : Fs(e, n.next)
          }
        }
        return null
      }
      function bh(e, n) {
        return null !== n ? e[16][6].projection[n.projection] : null
      }
      function vc(e, n) {
        const t = 10 + e + 1
        if (t < n.length) {
          const i = n[t],
            r = i[1].firstChild
          if (null !== r) return Fs(i, r)
        }
        return n[7]
      }
      function yc(e, n, t, i, r, o, s) {
        for (; null != t; ) {
          const a = i[t.index],
            l = t.type
          if (
            (s && 0 === n && (a && Qe(xe(a), i), (t.flags |= 4)),
            64 != (64 & t.flags))
          )
            if (8 & l) yc(e, n, t.child, i, r, o, !1), Xi(n, e, r, a, o)
            else if (32 & l) {
              const c = uc(t, i)
              let u
              for (; (u = c()); ) Xi(n, e, r, u, o)
              Xi(n, e, r, a, o)
            } else 16 & l ? Ch(e, n, i, t, r, o) : Xi(n, e, r, a, o)
          t = s ? t.projectionNext : t.next
        }
      }
      function so(e, n, t, i, r, o) {
        yc(t, i, e.firstChild, n, r, o, !1)
      }
      function Ch(e, n, t, i, r, o) {
        const s = t[16],
          l = s[6].projection[i.projection]
        if (Array.isArray(l))
          for (let c = 0; c < l.length; c++) Xi(n, e, r, l[c], o)
        else yc(e, n, l, s[3], r, o, !0)
      }
      function wh(e, n, t) {
        De(e) ? e.setAttribute(n, 'style', t) : (n.style.cssText = t)
      }
      function bc(e, n, t) {
        De(e)
          ? '' === t
            ? e.removeAttribute(n, 'class')
            : e.setAttribute(n, 'class', t)
          : (n.className = t)
      }
      function Nh(e, n, t) {
        let i = e.length
        for (;;) {
          const r = e.indexOf(n, t)
          if (-1 === r) return r
          if (0 === r || e.charCodeAt(r - 1) <= 32) {
            const o = n.length
            if (r + o === i || e.charCodeAt(r + o) <= 32) return r
          }
          t = r + 1
        }
      }
      const Eh = 'ng-template'
      function sw(e, n, t) {
        let i = 0
        for (; i < e.length; ) {
          let r = e[i++]
          if (t && 'class' === r) {
            if (((r = e[i]), -1 !== Nh(r.toLowerCase(), n, 0))) return !0
          } else if (1 === r) {
            for (; i < e.length && 'string' == typeof (r = e[i++]); )
              if (r.toLowerCase() === n) return !0
            return !1
          }
        }
        return !1
      }
      function Th(e) {
        return 4 === e.type && e.value !== Eh
      }
      function aw(e, n, t) {
        return n === (4 !== e.type || t ? e.value : Eh)
      }
      function lw(e, n, t) {
        let i = 4
        const r = e.attrs || [],
          o = (function dw(e) {
            for (let n = 0; n < e.length; n++) if (gp(e[n])) return n
            return e.length
          })(r)
        let s = !1
        for (let a = 0; a < n.length; a++) {
          const l = n[a]
          if ('number' != typeof l) {
            if (!s)
              if (4 & i) {
                if (
                  ((i = 2 | (1 & i)),
                  ('' !== l && !aw(e, l, t)) || ('' === l && 1 === n.length))
                ) {
                  if (qt(i)) return !1
                  s = !0
                }
              } else {
                const c = 8 & i ? l : n[++a]
                if (8 & i && null !== e.attrs) {
                  if (!sw(e.attrs, c, t)) {
                    if (qt(i)) return !1
                    s = !0
                  }
                  continue
                }
                const d = cw(8 & i ? 'class' : l, r, Th(e), t)
                if (-1 === d) {
                  if (qt(i)) return !1
                  s = !0
                  continue
                }
                if ('' !== c) {
                  let f
                  f = d > o ? '' : r[d + 1].toLowerCase()
                  const p = 8 & i ? f : null
                  if ((p && -1 !== Nh(p, c, 0)) || (2 & i && c !== f)) {
                    if (qt(i)) return !1
                    s = !0
                  }
                }
              }
          } else {
            if (!s && !qt(i) && !qt(l)) return !1
            if (s && qt(l)) continue
            ;(s = !1), (i = l | (1 & i))
          }
        }
        return qt(i) || s
      }
      function qt(e) {
        return 0 == (1 & e)
      }
      function cw(e, n, t, i) {
        if (null === n) return -1
        let r = 0
        if (i || !t) {
          let o = !1
          for (; r < n.length; ) {
            const s = n[r]
            if (s === e) return r
            if (3 === s || 6 === s) o = !0
            else {
              if (1 === s || 2 === s) {
                let a = n[++r]
                for (; 'string' == typeof a; ) a = n[++r]
                continue
              }
              if (4 === s) break
              if (0 === s) {
                r += 4
                continue
              }
            }
            r += o ? 1 : 2
          }
          return -1
        }
        return (function fw(e, n) {
          let t = e.indexOf(4)
          if (t > -1)
            for (t++; t < e.length; ) {
              const i = e[t]
              if ('number' == typeof i) return -1
              if (i === n) return t
              t++
            }
          return -1
        })(n, e)
      }
      function Mh(e, n, t = !1) {
        for (let i = 0; i < n.length; i++) if (lw(e, n[i], t)) return !0
        return !1
      }
      function pw(e, n) {
        e: for (let t = 0; t < n.length; t++) {
          const i = n[t]
          if (e.length === i.length) {
            for (let r = 0; r < e.length; r++) if (e[r] !== i[r]) continue e
            return !0
          }
        }
        return !1
      }
      function Ah(e, n) {
        return e ? ':not(' + n.trim() + ')' : n
      }
      function hw(e) {
        let n = e[0],
          t = 1,
          i = 2,
          r = '',
          o = !1
        for (; t < e.length; ) {
          let s = e[t]
          if ('string' == typeof s)
            if (2 & i) {
              const a = e[++t]
              r += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']'
            } else 8 & i ? (r += '.' + s) : 4 & i && (r += ' ' + s)
          else
            '' !== r && !qt(s) && ((n += Ah(o, r)), (r = '')),
              (i = s),
              (o = o || !qt(i))
          t++
        }
        return '' !== r && (n += Ah(o, r)), n
      }
      const x = {}
      function V(e) {
        Oh(Y(), b(), nt() + e, !1)
      }
      function Oh(e, n, t, i) {
        if (!i)
          if (3 == (3 & n[2])) {
            const o = e.preOrderCheckHooks
            null !== o && _s(n, o, t)
          } else {
            const o = e.preOrderHooks
            null !== o && ms(n, o, 0, t)
          }
        Un(t)
      }
      function Ls(e, n) {
        return (e << 17) | (n << 2)
      }
      function Kt(e) {
        return (e >> 17) & 32767
      }
      function Dc(e) {
        return 2 | e
      }
      function An(e) {
        return (131068 & e) >> 2
      }
      function Cc(e, n) {
        return (-131069 & e) | (n << 2)
      }
      function wc(e) {
        return 1 | e
      }
      function Hh(e, n) {
        const t = e.contentQueries
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) {
            const r = t[i],
              o = t[i + 1]
            if (-1 !== o) {
              const s = e.data[o]
              Ll(r), s.contentQueries(2, n[o], o)
            }
          }
      }
      function ao(e, n, t, i, r, o, s, a, l, c) {
        const u = n.blueprint.slice()
        return (
          (u[0] = r),
          (u[2] = 140 | i),
          np(u),
          (u[3] = u[15] = e),
          (u[8] = t),
          (u[10] = s || (e && e[10])),
          (u[F] = a || (e && e[F])),
          (u[12] = l || (e && e[12]) || null),
          (u[9] = c || (e && e[9]) || null),
          (u[6] = o),
          (u[16] = 2 == n.type ? e[16] : u),
          u
        )
      }
      function er(e, n, t, i, r) {
        let o = e.data[n]
        if (null === o)
          (o = (function xc(e, n, t, i, r) {
            const o = op(),
              s = Rl(),
              l = (e.data[n] = (function xw(e, n, t, i, r, o) {
                return {
                  type: t,
                  index: i,
                  insertBeforeIndex: null,
                  injectorIndex: n ? n.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: o,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: n,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                }
              })(0, s ? o : o && o.parent, t, n, i, r))
            return (
              null === e.firstChild && (e.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && (o.next = l)),
              l
            )
          })(e, n, t, i, r)),
            (function e1() {
              return I.lFrame.inI18n
            })() && (o.flags |= 64)
        else if (64 & o.type) {
          ;(o.type = t), (o.value = i), (o.attrs = r)
          const s = (function jr() {
            const e = I.lFrame,
              n = e.currentTNode
            return e.isParent ? n : n.parent
          })()
          o.injectorIndex = null === s ? -1 : s.injectorIndex
        }
        return un(o, !0), o
      }
      function tr(e, n, t, i) {
        if (0 === t) return -1
        const r = n.length
        for (let o = 0; o < t; o++)
          n.push(i), e.blueprint.push(i), e.data.push(null)
        return r
      }
      function lo(e, n, t) {
        ps(n)
        try {
          const i = e.viewQuery
          null !== i && jc(1, i, t)
          const r = e.template
          null !== r && jh(e, n, r, 1, t),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Hh(e, n),
            e.staticViewQueries && jc(2, e.viewQuery, t)
          const o = e.components
          null !== o &&
            (function Ow(e, n) {
              for (let t = 0; t < n.length; t++) Yw(e, n[t])
            })(n, o)
        } catch (i) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            i)
          )
        } finally {
          ;(n[2] &= -5), hs()
        }
      }
      function nr(e, n, t, i) {
        const r = n[2]
        if (256 != (256 & r)) {
          ps(n)
          try {
            np(n),
              (function sp(e) {
                return (I.lFrame.bindingIndex = e)
              })(e.bindingStartIndex),
              null !== t && jh(e, n, t, 2, i)
            const s = 3 == (3 & r)
            if (s) {
              const c = e.preOrderCheckHooks
              null !== c && _s(n, c, null)
            } else {
              const c = e.preOrderHooks
              null !== c && ms(n, c, 0, null), Vl(n, 0)
            }
            if (
              ((function Kw(e) {
                for (let n = dc(e); null !== n; n = fc(n)) {
                  if (!n[2]) continue
                  const t = n[9]
                  for (let i = 0; i < t.length; i++) {
                    const r = t[i],
                      o = r[3]
                    0 == (1024 & r[2]) && xl(o, 1), (r[2] |= 1024)
                  }
                }
              })(n),
              (function qw(e) {
                for (let n = dc(e); null !== n; n = fc(n))
                  for (let t = 10; t < n.length; t++) {
                    const i = n[t],
                      r = i[1]
                    Il(i) && nr(r, i, r.template, i[8])
                  }
              })(n),
              null !== e.contentQueries && Hh(e, n),
              s)
            ) {
              const c = e.contentCheckHooks
              null !== c && _s(n, c)
            } else {
              const c = e.contentHooks
              null !== c && ms(n, c, 1), Vl(n, 1)
            }
            !(function Mw(e, n) {
              const t = e.hostBindingOpCodes
              if (null !== t)
                try {
                  for (let i = 0; i < t.length; i++) {
                    const r = t[i]
                    if (r < 0) Un(~r)
                    else {
                      const o = r,
                        s = t[++i],
                        a = t[++i]
                      t1(s, o), a(2, n[o])
                    }
                  }
                } finally {
                  Un(-1)
                }
            })(e, n)
            const a = e.components
            null !== a &&
              (function Aw(e, n) {
                for (let t = 0; t < n.length; t++) Jw(e, n[t])
              })(n, a)
            const l = e.viewQuery
            if ((null !== l && jc(2, l, i), s)) {
              const c = e.viewCheckHooks
              null !== c && _s(n, c)
            } else {
              const c = e.viewHooks
              null !== c && ms(n, c, 2), Vl(n, 2)
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (n[2] &= -73),
              1024 & n[2] && ((n[2] &= -1025), xl(n[3], -1))
          } finally {
            hs()
          }
        }
      }
      function Sw(e, n, t, i) {
        const r = n[10],
          s = tp(n)
        try {
          !s && r.begin && r.begin(), s && lo(e, n, i), nr(e, n, t, i)
        } finally {
          !s && r.end && r.end()
        }
      }
      function jh(e, n, t, i, r) {
        const o = nt(),
          s = 2 & i
        try {
          Un(-1), s && n.length > 20 && Oh(e, n, 20, !1), t(i, r)
        } finally {
          Un(o)
        }
      }
      function Rc(e, n, t) {
        !rp() ||
          ((function Bw(e, n, t, i) {
            const r = t.directiveStart,
              o = t.directiveEnd
            e.firstCreatePass || $r(t, n), Qe(i, n)
            const s = t.initialInputs
            for (let a = r; a < o; a++) {
              const l = e.data[a],
                c = zt(l)
              c && $w(n, t, l)
              const u = Wr(n, e, a, t)
              Qe(u, n),
                null !== s && Ww(0, a - r, u, l, 0, s),
                c && (Dt(t.index, n)[8] = u)
            }
          })(e, n, t, Rt(t, n)),
          128 == (128 & t.flags) &&
            (function Hw(e, n, t) {
              const i = t.directiveStart,
                r = t.directiveEnd,
                s = t.index,
                a = (function n1() {
                  return I.lFrame.currentDirectiveIndex
                })()
              try {
                Un(s)
                for (let l = i; l < r; l++) {
                  const c = e.data[l],
                    u = n[l]
                  kl(l),
                    (null !== c.hostBindings ||
                      0 !== c.hostVars ||
                      null !== c.hostAttrs) &&
                      Yh(c, u)
                }
              } finally {
                Un(-1), kl(a)
              }
            })(e, n, t))
      }
      function Pc(e, n, t = Rt) {
        const i = n.localNames
        if (null !== i) {
          let r = n.index + 1
          for (let o = 0; o < i.length; o += 2) {
            const s = i[o + 1],
              a = -1 === s ? t(n, e) : e[s]
            e[r++] = a
          }
        }
      }
      function Gh(e) {
        const n = e.tView
        return null === n || n.incompleteFirstPass
          ? (e.tView = Hs(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : n
      }
      function Hs(e, n, t, i, r, o, s, a, l, c) {
        const u = 20 + i,
          d = u + r,
          f = (function Iw(e, n) {
            const t = []
            for (let i = 0; i < n; i++) t.push(i < e ? null : x)
            return t
          })(u, d),
          p = 'function' == typeof c ? c() : c
        return (f[1] = {
          type: e,
          blueprint: f,
          template: t,
          queries: null,
          viewQuery: a,
          declTNode: n,
          data: f.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof o ? o() : o,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
        })
      }
      function zh(e, n, t, i) {
        const r = ng(n)
        null === t
          ? r.push(i)
          : (r.push(t), e.firstCreatePass && ig(e).push(i, r.length - 1))
      }
      function qh(e, n, t) {
        for (let i in e)
          if (e.hasOwnProperty(i)) {
            const r = e[i]
            ;(t = null === t ? {} : t).hasOwnProperty(i)
              ? t[i].push(n, r)
              : (t[i] = [n, r])
          }
        return t
      }
      function kc(e, n, t, i) {
        let r = !1
        if (rp()) {
          const o = (function jw(e, n, t) {
              const i = e.directiveRegistry
              let r = null
              if (i)
                for (let o = 0; o < i.length; o++) {
                  const s = i[o]
                  Mh(t, s.selectors, !1) &&
                    (r || (r = []),
                    Cs($r(t, n), e, s.type),
                    zt(s) ? (Zh(e, t), r.unshift(s)) : r.push(s))
                }
              return r
            })(e, n, t),
            s = null === i ? null : {'': -1}
          if (null !== o) {
            ;(r = !0), Qh(t, e.data.length, o.length)
            for (let u = 0; u < o.length; u++) {
              const d = o[u]
              d.providersResolver && d.providersResolver(d)
            }
            let a = !1,
              l = !1,
              c = tr(e, n, o.length, null)
            for (let u = 0; u < o.length; u++) {
              const d = o[u]
              ;(t.mergedAttrs = ys(t.mergedAttrs, d.hostAttrs)),
                Xh(e, t, n, c, d),
                Gw(c, d, s),
                null !== d.contentQueries && (t.flags |= 8),
                (null !== d.hostBindings ||
                  null !== d.hostAttrs ||
                  0 !== d.hostVars) &&
                  (t.flags |= 128)
              const f = d.type.prototype
              !a &&
                (f.ngOnChanges || f.ngOnInit || f.ngDoCheck) &&
                ((e.preOrderHooks || (e.preOrderHooks = [])).push(t.index),
                (a = !0)),
                !l &&
                  (f.ngOnChanges || f.ngDoCheck) &&
                  ((e.preOrderCheckHooks || (e.preOrderCheckHooks = [])).push(
                    t.index
                  ),
                  (l = !0)),
                c++
            }
            !(function Rw(e, n) {
              const i = n.directiveEnd,
                r = e.data,
                o = n.attrs,
                s = []
              let a = null,
                l = null
              for (let c = n.directiveStart; c < i; c++) {
                const u = r[c],
                  d = u.inputs,
                  f = null === o || Th(n) ? null : zw(d, o)
                s.push(f), (a = qh(d, c, a)), (l = qh(u.outputs, c, l))
              }
              null !== a &&
                (a.hasOwnProperty('class') && (n.flags |= 16),
                a.hasOwnProperty('style') && (n.flags |= 32)),
                (n.initialInputs = s),
                (n.inputs = a),
                (n.outputs = l)
            })(e, t)
          }
          s &&
            (function Uw(e, n, t) {
              if (n) {
                const i = (e.localNames = [])
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r + 1]]
                  if (null == o) throw new J(-301, !1)
                  i.push(n[r], o)
                }
              }
            })(t, i, s)
        }
        return (t.mergedAttrs = ys(t.mergedAttrs, t.attrs)), r
      }
      function Jh(e, n, t, i, r, o) {
        const s = o.hostBindings
        if (s) {
          let a = e.hostBindingOpCodes
          null === a && (a = e.hostBindingOpCodes = [])
          const l = ~n.index
          ;(function Vw(e) {
            let n = e.length
            for (; n > 0; ) {
              const t = e[--n]
              if ('number' == typeof t && t < 0) return t
            }
            return 0
          })(a) != l && a.push(l),
            a.push(i, r, s)
        }
      }
      function Yh(e, n) {
        null !== e.hostBindings && e.hostBindings(1, n)
      }
      function Zh(e, n) {
        ;(n.flags |= 2), (e.components || (e.components = [])).push(n.index)
      }
      function Gw(e, n, t) {
        if (t) {
          if (n.exportAs)
            for (let i = 0; i < n.exportAs.length; i++) t[n.exportAs[i]] = e
          zt(n) && (t[''] = e)
        }
      }
      function Qh(e, n, t) {
        ;(e.flags |= 1),
          (e.directiveStart = n),
          (e.directiveEnd = n + t),
          (e.providerIndexes = n)
      }
      function Xh(e, n, t, i, r) {
        e.data[i] = r
        const o = r.factory || (r.factory = fi(r.type)),
          s = new Ur(o, zt(r), null)
        ;(e.blueprint[i] = s),
          (t[i] = s),
          Jh(e, n, 0, i, tr(e, t, r.hostVars, x), r)
      }
      function $w(e, n, t) {
        const i = Rt(n, e),
          r = Gh(t),
          o = e[10],
          s = js(
            e,
            ao(
              e,
              r,
              null,
              t.onPush ? 64 : 16,
              i,
              n,
              o,
              o.createRenderer(i, t),
              null,
              null
            )
          )
        e[n.index] = s
      }
      function hn(e, n, t, i, r, o) {
        const s = Rt(e, n)
        !(function Fc(e, n, t, i, r, o, s) {
          if (null == o)
            De(e) ? e.removeAttribute(n, r, t) : n.removeAttribute(r)
          else {
            const a = null == s ? S(o) : s(o, i || '', r)
            De(e)
              ? e.setAttribute(n, r, a, t)
              : t
              ? n.setAttributeNS(t, r, a)
              : n.setAttribute(r, a)
          }
        })(n[F], s, o, e.value, t, i, r)
      }
      function Ww(e, n, t, i, r, o) {
        const s = o[n]
        if (null !== s) {
          const a = i.setInput
          for (let l = 0; l < s.length; ) {
            const c = s[l++],
              u = s[l++],
              d = s[l++]
            null !== a ? i.setInput(t, d, c, u) : (t[u] = d)
          }
        }
      }
      function zw(e, n) {
        let t = null,
          i = 0
        for (; i < n.length; ) {
          const r = n[i]
          if (0 !== r)
            if (5 !== r) {
              if ('number' == typeof r) break
              e.hasOwnProperty(r) &&
                (null === t && (t = []), t.push(r, e[r], n[i + 1])),
                (i += 2)
            } else i += 2
          else i += 4
        }
        return t
      }
      function eg(e, n, t, i) {
        return new Array(e, !0, !1, n, null, 0, i, t, null, null)
      }
      function Jw(e, n) {
        const t = Dt(n, e)
        if (Il(t)) {
          const i = t[1]
          80 & t[2] ? nr(i, t, i.template, t[8]) : t[5] > 0 && Lc(t)
        }
      }
      function Lc(e) {
        for (let i = dc(e); null !== i; i = fc(i))
          for (let r = 10; r < i.length; r++) {
            const o = i[r]
            if (1024 & o[2]) {
              const s = o[1]
              nr(s, o, s.template, o[8])
            } else o[5] > 0 && Lc(o)
          }
        const t = e[1].components
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const r = Dt(t[i], e)
            Il(r) && r[5] > 0 && Lc(r)
          }
      }
      function Yw(e, n) {
        const t = Dt(n, e),
          i = t[1]
        ;(function Zw(e, n) {
          for (let t = n.length; t < e.blueprint.length; t++)
            n.push(e.blueprint[t])
        })(i, t),
          lo(i, t, t[8])
      }
      function js(e, n) {
        return e[13] ? (e[14][4] = n) : (e[13] = n), (e[14] = n), n
      }
      function Vc(e) {
        for (; e; ) {
          e[2] |= 64
          const n = oo(e)
          if (xD(e) && !n) return e
          e = n
        }
        return null
      }
      function tg(e) {
        !(function Bc(e) {
          for (let n = 0; n < e.components.length; n++) {
            const t = e.components[n],
              i = sc(t),
              r = i[1]
            Sw(r, i, r.template, t)
          }
        })(e[8])
      }
      function jc(e, n, t) {
        Ll(0), n(e, t)
      }
      const Xw = (() => Promise.resolve(null))()
      function ng(e) {
        return e[7] || (e[7] = [])
      }
      function ig(e) {
        return e.cleanup || (e.cleanup = [])
      }
      function og(e, n) {
        const t = e[9],
          i = t ? t.get(ro, null) : null
        i && i.handleError(n)
      }
      function sg(e, n, t, i, r) {
        for (let o = 0; o < t.length; ) {
          const s = t[o++],
            a = t[o++],
            l = n[s],
            c = e.data[s]
          null !== c.setInput ? c.setInput(l, r, i, a) : (l[a] = r)
        }
      }
      function On(e, n, t) {
        const i = ds(n, e)
        !(function ch(e, n, t) {
          De(e) ? e.setValue(n, t) : (n.textContent = t)
        })(e[F], i, t)
      }
      function Us(e, n, t) {
        let i = t ? e.styles : null,
          r = t ? e.classes : null,
          o = 0
        if (null !== n)
          for (let s = 0; s < n.length; s++) {
            const a = n[s]
            'number' == typeof a
              ? (o = a)
              : 1 == o
              ? (r = hl(r, a))
              : 2 == o && (i = hl(i, a + ': ' + n[++s] + ';'))
          }
        t ? (e.styles = i) : (e.stylesWithoutHost = i),
          t ? (e.classes = r) : (e.classesWithoutHost = r)
      }
      const Uc = new K('INJECTOR', -1)
      class ag {
        get(n, t = Yr) {
          if (t === Yr) {
            const i = new Error(`NullInjectorError: No provider for ${ie(n)}!`)
            throw ((i.name = 'NullInjectorError'), i)
          }
          return t
        }
      }
      const Gc = new K('Set Injector scope.'),
        co = {},
        nN = {}
      let $c
      function lg() {
        return void 0 === $c && ($c = new ag()), $c
      }
      function cg(e, n = null, t = null, i) {
        const r = ug(e, n, t, i)
        return r._resolveInjectorDefTypes(), r
      }
      function ug(e, n = null, t = null, i) {
        return new iN(e, t, n || lg(), i)
      }
      class iN {
        constructor(n, t, i, r = null) {
          ;(this.parent = i),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1)
          const o = []
          t && dn(t, (a) => this.processProvider(a, n, t)),
            dn([n], (a) => this.processInjectorType(a, [], o)),
            this.records.set(Uc, ir(void 0, this))
          const s = this.records.get(Gc)
          ;(this.scope = null != s ? s.value : null),
            (this.source = r || ('object' == typeof n ? null : ie(n)))
        }
        get destroyed() {
          return this._destroyed
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0)
          try {
            this.onDestroy.forEach((n) => n.ngOnDestroy())
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear()
          }
        }
        get(n, t = Yr, i = R.Default) {
          this.assertNotDestroyed()
          const r = Rp(this),
            o = Vn(void 0)
          try {
            if (!(i & R.SkipSelf)) {
              let a = this.records.get(n)
              if (void 0 === a) {
                const l =
                  (function dN(e) {
                    return (
                      'function' == typeof e ||
                      ('object' == typeof e && e instanceof K)
                    )
                  })(n) && _l(n)
                ;(a = l && this.injectableDefInScope(l) ? ir(Wc(n), co) : null),
                  this.records.set(n, a)
              }
              if (null != a) return this.hydrate(n, a)
            }
            return (i & R.Self ? lg() : this.parent).get(
              n,
              (t = i & R.Optional && t === Yr ? null : t)
            )
          } catch (s) {
            if ('NullInjectorError' === s.name) {
              if (((s[Ts] = s[Ts] || []).unshift(ie(n)), r)) throw s
              return (function H1(e, n, t, i) {
                const r = e[Ts]
                throw (
                  (n[xp] && r.unshift(n[xp]),
                  (e.message = (function j1(e, n, t, i = null) {
                    e =
                      e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1)
                        ? e.substr(2)
                        : e
                    let r = ie(n)
                    if (Array.isArray(n)) r = n.map(ie).join(' -> ')
                    else if ('object' == typeof n) {
                      let o = []
                      for (let s in n)
                        if (n.hasOwnProperty(s)) {
                          let a = n[s]
                          o.push(
                            s +
                              ':' +
                              ('string' == typeof a ? JSON.stringify(a) : ie(a))
                          )
                        }
                      r = `{${o.join(', ')}}`
                    }
                    return `${t}${i ? '(' + i + ')' : ''}[${r}]: ${e.replace(
                      P1,
                      '\n  '
                    )}`
                  })('\n' + e.message, r, t, i)),
                  (e.ngTokenPath = r),
                  (e[Ts] = null),
                  e)
                )
              })(s, n, 'R3InjectorError', this.source)
            }
            throw s
          } finally {
            Vn(o), Rp(r)
          }
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((n) => this.get(n))
        }
        toString() {
          const n = []
          return (
            this.records.forEach((i, r) => n.push(ie(r))),
            `R3Injector[${n.join(', ')}]`
          )
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new J(205, !1)
        }
        processInjectorType(n, t, i) {
          if (!(n = k(n))) return !1
          let r = Uf(n)
          const o = (null == r && n.ngModule) || void 0,
            s = void 0 === o ? n : o,
            a = -1 !== i.indexOf(s)
          if ((void 0 !== o && (r = Uf(o)), null == r)) return !1
          if (null != r.imports && !a) {
            let u
            i.push(s)
            try {
              dn(r.imports, (d) => {
                this.processInjectorType(d, t, i) &&
                  (void 0 === u && (u = []), u.push(d))
              })
            } finally {
            }
            if (void 0 !== u)
              for (let d = 0; d < u.length; d++) {
                const {ngModule: f, providers: p} = u[d]
                dn(p, (h) => this.processProvider(h, f, p || le))
              }
          }
          this.injectorDefTypes.add(s)
          const l = fi(s) || (() => new s())
          this.records.set(s, ir(l, co))
          const c = r.providers
          if (null != c && !a) {
            const u = n
            dn(c, (d) => this.processProvider(d, u, c))
          }
          return void 0 !== o && void 0 !== n.providers
        }
        processProvider(n, t, i) {
          let r = rr((n = k(n))) ? n : k(n && n.provide)
          const o = (function oN(e, n, t) {
            return fg(e) ? ir(void 0, e.useValue) : ir(dg(e), co)
          })(n)
          if (rr(n) || !0 !== n.multi) this.records.get(r)
          else {
            let s = this.records.get(r)
            s ||
              ((s = ir(void 0, co, !0)),
              (s.factory = () => Yl(s.multi)),
              this.records.set(r, s)),
              (r = n),
              s.multi.push(n)
          }
          this.records.set(r, o)
        }
        hydrate(n, t) {
          return (
            t.value === co && ((t.value = nN), (t.value = t.factory())),
            'object' == typeof t.value &&
              t.value &&
              (function uN(e) {
                return (
                  null !== e &&
                  'object' == typeof e &&
                  'function' == typeof e.ngOnDestroy
                )
              })(t.value) &&
              this.onDestroy.add(t.value),
            t.value
          )
        }
        injectableDefInScope(n) {
          if (!n.providedIn) return !1
          const t = k(n.providedIn)
          return 'string' == typeof t
            ? 'any' === t || t === this.scope
            : this.injectorDefTypes.has(t)
        }
      }
      function Wc(e) {
        const n = _l(e),
          t = null !== n ? n.factory : fi(e)
        if (null !== t) return t
        if (e instanceof K) throw new J(204, !1)
        if (e instanceof Function)
          return (function rN(e) {
            const n = e.length
            if (n > 0) throw (Jr(n, '?'), new J(204, !1))
            const t = (function yD(e) {
              const n = e && (e[rs] || e[Gf])
              if (n) {
                const t = (function bD(e) {
                  if (e.hasOwnProperty('name')) return e.name
                  const n = ('' + e).match(/^function\s*([^\s(]+)/)
                  return null === n ? '' : n[1]
                })(e)
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${t}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${t}" class.`
                  ),
                  n
                )
              }
              return null
            })(e)
            return null !== t ? () => t.factory(e) : () => new e()
          })(e)
        throw new J(204, !1)
      }
      function dg(e, n, t) {
        let i
        if (rr(e)) {
          const r = k(e)
          return fi(r) || Wc(r)
        }
        if (fg(e)) i = () => k(e.useValue)
        else if (
          (function aN(e) {
            return !(!e || !e.useFactory)
          })(e)
        )
          i = () => e.useFactory(...Yl(e.deps || []))
        else if (
          (function sN(e) {
            return !(!e || !e.useExisting)
          })(e)
        )
          i = () => P(k(e.useExisting))
        else {
          const r = k(e && (e.useClass || e.provide))
          if (
            !(function cN(e) {
              return !!e.deps
            })(e)
          )
            return fi(r) || Wc(r)
          i = () => new r(...Yl(e.deps))
        }
        return i
      }
      function ir(e, n, t = !1) {
        return {factory: e, value: n, multi: t ? [] : void 0}
      }
      function fg(e) {
        return null !== e && 'object' == typeof e && F1 in e
      }
      function rr(e) {
        return 'function' == typeof e
      }
      let gt = (() => {
        class e {
          static create(t, i) {
            var r
            if (Array.isArray(t)) return cg({name: ''}, i, t, '')
            {
              const o = null !== (r = t.name) && void 0 !== r ? r : ''
              return cg({name: o}, t.parent, t.providers, o)
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Yr),
          (e.NULL = new ag()),
          (e.ɵprov = q({token: e, providedIn: 'any', factory: () => P(Uc)})),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        )
      })()
      function yN(e, n) {
        gs(sc(e)[1], Fe())
      }
      function te(e) {
        let n = (function Ng(e) {
            return Object.getPrototypeOf(e.prototype).constructor
          })(e.type),
          t = !0
        const i = [e]
        for (; n; ) {
          let r
          if (zt(e)) r = n.ɵcmp || n.ɵdir
          else {
            if (n.ɵcmp) throw new J(903, '')
            r = n.ɵdir
          }
          if (r) {
            if (t) {
              i.push(r)
              const s = e
              ;(s.inputs = Kc(e.inputs)),
                (s.declaredInputs = Kc(e.declaredInputs)),
                (s.outputs = Kc(e.outputs))
              const a = r.hostBindings
              a && wN(e, a)
              const l = r.viewQuery,
                c = r.contentQueries
              if (
                (l && DN(e, l),
                c && CN(e, c),
                pl(e.inputs, r.inputs),
                pl(e.declaredInputs, r.declaredInputs),
                pl(e.outputs, r.outputs),
                zt(r) && r.data.animation)
              ) {
                const u = e.data
                u.animation = (u.animation || []).concat(r.data.animation)
              }
            }
            const o = r.features
            if (o)
              for (let s = 0; s < o.length; s++) {
                const a = o[s]
                a && a.ngInherit && a(e), a === te && (t = !1)
              }
          }
          n = Object.getPrototypeOf(n)
        }
        !(function bN(e) {
          let n = 0,
            t = null
          for (let i = e.length - 1; i >= 0; i--) {
            const r = e[i]
            ;(r.hostVars = n += r.hostVars),
              (r.hostAttrs = ys(r.hostAttrs, (t = ys(t, r.hostAttrs))))
          }
        })(i)
      }
      function Kc(e) {
        return e === ki ? {} : e === le ? [] : e
      }
      function DN(e, n) {
        const t = e.viewQuery
        e.viewQuery = t
          ? (i, r) => {
              n(i, r), t(i, r)
            }
          : n
      }
      function CN(e, n) {
        const t = e.contentQueries
        e.contentQueries = t
          ? (i, r, o) => {
              n(i, r, o), t(i, r, o)
            }
          : n
      }
      function wN(e, n) {
        const t = e.hostBindings
        e.hostBindings = t
          ? (i, r) => {
              n(i, r), t(i, r)
            }
          : n
      }
      let Gs = null
      function or() {
        if (!Gs) {
          const e = oe.Symbol
          if (e && e.iterator) Gs = e.iterator
          else {
            const n = Object.getOwnPropertyNames(Map.prototype)
            for (let t = 0; t < n.length; ++t) {
              const i = n[t]
              'entries' !== i &&
                'size' !== i &&
                Map.prototype[i] === Map.prototype.entries &&
                (Gs = i)
            }
          }
        }
        return Gs
      }
      function uo(e) {
        return (
          !!Jc(e) && (Array.isArray(e) || (!(e instanceof Map) && or() in e))
        )
      }
      function Jc(e) {
        return null !== e && ('function' == typeof e || 'object' == typeof e)
      }
      function Xe(e, n, t) {
        return !Object.is(e[n], t) && ((e[n] = t), !0)
      }
      function fe(e, n, t, i) {
        const r = b()
        return Xe(r, ji(), n) && (Y(), hn(Ce(), r, e, n, t, i)), fe
      }
      function m(e, n = R.Default) {
        const t = b()
        return null === t ? P(e, n) : Cp(Fe(), t, k(e), n)
      }
      function G(e, n, t) {
        const i = b()
        return (
          Xe(i, ji(), n) &&
            (function Nt(e, n, t, i, r, o, s, a) {
              const l = Rt(n, t)
              let u,
                c = n.inputs
              !a && null != c && (u = c[i])
                ? (sg(e, t, u, i, r),
                  cs(n) &&
                    (function kw(e, n) {
                      const t = Dt(n, e)
                      16 & t[2] || (t[2] |= 64)
                    })(t, n.index))
                : 3 & n.type &&
                  ((i = (function Pw(e) {
                    return 'class' === e
                      ? 'className'
                      : 'for' === e
                      ? 'htmlFor'
                      : 'formaction' === e
                      ? 'formAction'
                      : 'innerHtml' === e
                      ? 'innerHTML'
                      : 'readonly' === e
                      ? 'readOnly'
                      : 'tabindex' === e
                      ? 'tabIndex'
                      : e
                  })(i)),
                  (r = null != s ? s(r, n.value || '', i) : r),
                  De(o)
                    ? o.setProperty(l, i, r)
                    : Hl(i) ||
                      (l.setProperty ? l.setProperty(i, r) : (l[i] = r)))
            })(Y(), Ce(), i, e, n, i[F], t, !1),
          G
        )
      }
      function eu(e, n, t, i, r) {
        const s = r ? 'class' : 'style'
        sg(e, t, n.inputs[s], s, i)
      }
      function B(e, n, t, i) {
        const r = b(),
          o = Y(),
          s = 20 + e,
          a = r[F],
          l = (r[s] = hc(
            a,
            n,
            (function u1() {
              return I.lFrame.currentNamespace
            })()
          )),
          c = o.firstCreatePass
            ? (function QN(e, n, t, i, r, o, s) {
                const a = n.consts,
                  c = er(n, e, 2, r, jn(a, o))
                return (
                  kc(n, t, c, jn(a, s)),
                  null !== c.attrs && Us(c, c.attrs, !1),
                  null !== c.mergedAttrs && Us(c, c.mergedAttrs, !0),
                  null !== n.queries && n.queries.elementStart(n, c),
                  c
                )
              })(s, o, r, 0, n, t, i)
            : o.data[s]
        un(c, !0)
        const u = c.mergedAttrs
        null !== u && vs(a, l, u)
        const d = c.classes
        null !== d && bc(a, l, d)
        const f = c.styles
        return (
          null !== f && wh(a, l, f),
          64 != (64 & c.flags) && ks(o, r, l, c),
          0 ===
            (function KD() {
              return I.lFrame.elementDepthCount
            })() && Qe(l, r),
          (function JD() {
            I.lFrame.elementDepthCount++
          })(),
          us(c) &&
            (Rc(o, r, c),
            (function Uh(e, n, t) {
              if (wl(n)) {
                const r = n.directiveEnd
                for (let o = n.directiveStart; o < r; o++) {
                  const s = e.data[o]
                  s.contentQueries && s.contentQueries(1, t[o], o)
                }
              }
            })(o, c, r)),
          null !== i && Pc(r, c),
          B
        )
      }
      function H() {
        let e = Fe()
        Rl() ? Pl() : ((e = e.parent), un(e, !1))
        const n = e
        !(function YD() {
          I.lFrame.elementDepthCount--
        })()
        const t = Y()
        return (
          t.firstCreatePass && (gs(t, e), wl(e) && t.queries.elementEnd(e)),
          null != n.classesWithoutHost &&
            (function g1(e) {
              return 0 != (16 & e.flags)
            })(n) &&
            eu(t, n, b(), n.classesWithoutHost, !0),
          null != n.stylesWithoutHost &&
            (function _1(e) {
              return 0 != (32 & e.flags)
            })(n) &&
            eu(t, n, b(), n.stylesWithoutHost, !1),
          H
        )
      }
      function qs(e) {
        return !!e && 'function' == typeof e.then
      }
      const zg = function Wg(e) {
        return !!e && 'function' == typeof e.subscribe
      }
      function Z(e, n, t, i) {
        const r = b(),
          o = Y(),
          s = Fe()
        return (
          (function Kg(e, n, t, i, r, o, s, a) {
            const l = us(i),
              u = e.firstCreatePass && ig(e),
              d = n[8],
              f = ng(n)
            let p = !0
            if (3 & i.type || a) {
              const v = Rt(i, n),
                y = a ? a(v) : v,
                _ = f.length,
                D = a ? (C) => a(xe(C[i.index])) : i.index
              if (De(t)) {
                let C = null
                if (
                  (!a &&
                    l &&
                    (C = (function eE(e, n, t, i) {
                      const r = e.cleanup
                      if (null != r)
                        for (let o = 0; o < r.length - 1; o += 2) {
                          const s = r[o]
                          if (s === t && r[o + 1] === i) {
                            const a = n[7],
                              l = r[o + 2]
                            return a.length > l ? a[l] : null
                          }
                          'string' == typeof s && (o += 2)
                        }
                      return null
                    })(e, n, r, i.index)),
                  null !== C)
                )
                  ((C.__ngLastListenerFn__ || C).__ngNextListenerFn__ = o),
                    (C.__ngLastListenerFn__ = o),
                    (p = !1)
                else {
                  o = iu(i, n, d, o, !1)
                  const T = t.listen(y, r, o)
                  f.push(o, T), u && u.push(r, D, _, _ + 1)
                }
              } else
                (o = iu(i, n, d, o, !0)),
                  y.addEventListener(r, o, s),
                  f.push(o),
                  u && u.push(r, D, _, s)
            } else o = iu(i, n, d, o, !1)
            const h = i.outputs
            let g
            if (p && null !== h && (g = h[r])) {
              const v = g.length
              if (v)
                for (let y = 0; y < v; y += 2) {
                  const O = n[g[y]][g[y + 1]].subscribe(o),
                    z = f.length
                  f.push(o, O), u && u.push(r, i.index, z, -(z + 1))
                }
            }
          })(o, r, r[F], s, e, n, !!t, i),
          Z
        )
      }
      function Jg(e, n, t, i) {
        try {
          return !1 !== t(i)
        } catch (r) {
          return og(e, r), !1
        }
      }
      function iu(e, n, t, i, r) {
        return function o(s) {
          if (s === Function) return i
          const a = 2 & e.flags ? Dt(e.index, n) : n
          0 == (32 & n[2]) && Vc(a)
          let l = Jg(n, 0, i, s),
            c = o.__ngNextListenerFn__
          for (; c; ) (l = Jg(n, 0, c, s) && l), (c = c.__ngNextListenerFn__)
          return r && !1 === l && (s.preventDefault(), (s.returnValue = !1)), l
        }
      }
      function ne(e = 1) {
        return (function r1(e) {
          return (I.lFrame.contextLView = (function o1(e, n) {
            for (; e > 0; ) (n = n[15]), e--
            return n
          })(e, I.lFrame.contextLView))[8]
        })(e)
      }
      function tE(e, n) {
        let t = null
        const i = (function uw(e) {
          const n = e.attrs
          if (null != n) {
            const t = n.indexOf(5)
            if (0 == (1 & t)) return n[t + 1]
          }
          return null
        })(e)
        for (let r = 0; r < n.length; r++) {
          const o = n[r]
          if ('*' !== o) {
            if (null === i ? Mh(e, o, !0) : pw(i, o)) return r
          } else t = r
        }
        return t
      }
      function s_(e, n, t, i, r) {
        const o = e[t + 1],
          s = null === n
        let a = i ? Kt(o) : An(o),
          l = !1
        for (; 0 !== a && (!1 === l || s); ) {
          const u = e[a + 1]
          rE(e[a], n) && ((l = !0), (e[a + 1] = i ? wc(u) : Dc(u))),
            (a = i ? Kt(u) : An(u))
        }
        l && (e[t + 1] = i ? Dc(o) : wc(o))
      }
      function rE(e, n) {
        return (
          null === e ||
          null == n ||
          (Array.isArray(e) ? e[1] : e) === n ||
          (!(!Array.isArray(e) || 'string' != typeof n) && Ji(e, n) >= 0)
        )
      }
      const Ve = {textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0}
      function a_(e) {
        return e.substring(Ve.key, Ve.keyEnd)
      }
      function l_(e, n) {
        const t = Ve.textEnd
        return t === n
          ? -1
          : ((n = Ve.keyEnd =
              (function lE(e, n, t) {
                for (; n < t && e.charCodeAt(n) > 32; ) n++
                return n
              })(e, (Ve.key = n), t)),
            _r(e, n, t))
      }
      function _r(e, n, t) {
        for (; n < t && e.charCodeAt(n) <= 32; ) n++
        return n
      }
      function ve(e, n) {
        return (
          (function Zt(e, n, t, i) {
            const r = b(),
              o = Y(),
              s = Mn(2)
            o.firstUpdatePass && h_(o, e, s, i),
              n !== x &&
                Xe(r, s, n) &&
                __(
                  o,
                  o.data[nt()],
                  r,
                  r[F],
                  e,
                  (r[s + 1] = (function vE(e, n) {
                    return (
                      null == e ||
                        ('string' == typeof n
                          ? (e += n)
                          : 'object' == typeof e && (e = ie($n(e)))),
                      e
                    )
                  })(n, t)),
                  i,
                  s
                )
          })(e, n, null, !0),
          ve
        )
      }
      function gi(e) {
        !(function Qt(e, n, t, i) {
          const r = Y(),
            o = Mn(2)
          r.firstUpdatePass && h_(r, null, o, i)
          const s = b()
          if (t !== x && Xe(s, o, t)) {
            const a = r.data[nt()]
            if (v_(a, i) && !p_(r, o)) {
              let l = i ? a.classesWithoutHost : a.stylesWithoutHost
              null !== l && (t = hl(l, t || '')), eu(r, a, s, t, i)
            } else
              !(function mE(e, n, t, i, r, o, s, a) {
                r === x && (r = le)
                let l = 0,
                  c = 0,
                  u = 0 < r.length ? r[0] : null,
                  d = 0 < o.length ? o[0] : null
                for (; null !== u || null !== d; ) {
                  const f = l < r.length ? r[l + 1] : void 0,
                    p = c < o.length ? o[c + 1] : void 0
                  let g,
                    h = null
                  u === d
                    ? ((l += 2), (c += 2), f !== p && ((h = d), (g = p)))
                    : null === d || (null !== u && u < d)
                    ? ((l += 2), (h = u))
                    : ((c += 2), (h = d), (g = p)),
                    null !== h && __(e, n, t, i, h, g, s, a),
                    (u = l < r.length ? r[l] : null),
                    (d = c < o.length ? o[c] : null)
                }
              })(
                r,
                a,
                s,
                s[F],
                s[o + 1],
                (s[o + 1] = (function _E(e, n, t) {
                  if (null == t || '' === t) return le
                  const i = [],
                    r = $n(t)
                  if (Array.isArray(r))
                    for (let o = 0; o < r.length; o++) e(i, r[o], !0)
                  else if ('object' == typeof r)
                    for (const o in r) r.hasOwnProperty(o) && e(i, o, r[o])
                  else 'string' == typeof r && n(i, r)
                  return i
                })(e, n, t)),
                i,
                o
              )
          }
        })(Ct, mn, e, !0)
      }
      function mn(e, n) {
        for (
          let t = (function sE(e) {
            return (
              (function u_(e) {
                ;(Ve.key = 0),
                  (Ve.keyEnd = 0),
                  (Ve.value = 0),
                  (Ve.valueEnd = 0),
                  (Ve.textEnd = e.length)
              })(e),
              l_(e, _r(e, 0, Ve.textEnd))
            )
          })(n);
          t >= 0;
          t = l_(n, t)
        )
          Ct(e, a_(n), !0)
      }
      function p_(e, n) {
        return n >= e.expandoStartIndex
      }
      function h_(e, n, t, i) {
        const r = e.data
        if (null === r[t + 1]) {
          const o = r[nt()],
            s = p_(e, t)
          v_(o, i) && null === n && !s && (n = !1),
            (n = (function fE(e, n, t, i) {
              const r = (function Fl(e) {
                const n = I.lFrame.currentDirectiveIndex
                return -1 === n ? null : e[n]
              })(e)
              let o = i ? n.residualClasses : n.residualStyles
              if (null === r)
                0 === (i ? n.classBindings : n.styleBindings) &&
                  ((t = po((t = su(null, e, n, t, i)), n.attrs, i)), (o = null))
              else {
                const s = n.directiveStylingLast
                if (-1 === s || e[s] !== r)
                  if (((t = su(r, e, n, t, i)), null === o)) {
                    let l = (function pE(e, n, t) {
                      const i = t ? n.classBindings : n.styleBindings
                      if (0 !== An(i)) return e[Kt(i)]
                    })(e, n, i)
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = su(null, e, n, l[1], i)),
                      (l = po(l, n.attrs, i)),
                      (function hE(e, n, t, i) {
                        e[Kt(t ? n.classBindings : n.styleBindings)] = i
                      })(e, n, i, l))
                  } else
                    o = (function gE(e, n, t) {
                      let i
                      const r = n.directiveEnd
                      for (let o = 1 + n.directiveStylingLast; o < r; o++)
                        i = po(i, e[o].hostAttrs, t)
                      return po(i, n.attrs, t)
                    })(e, n, i)
              }
              return (
                void 0 !== o &&
                  (i ? (n.residualClasses = o) : (n.residualStyles = o)),
                t
              )
            })(r, o, n, i)),
            (function nE(e, n, t, i, r, o) {
              let s = o ? n.classBindings : n.styleBindings,
                a = Kt(s),
                l = An(s)
              e[i] = t
              let u,
                c = !1
              if (Array.isArray(t)) {
                const d = t
                ;(u = d[1]), (null === u || Ji(d, u) > 0) && (c = !0)
              } else u = t
              if (r)
                if (0 !== l) {
                  const f = Kt(e[a + 1])
                  ;(e[i + 1] = Ls(f, a)),
                    0 !== f && (e[f + 1] = Cc(e[f + 1], i)),
                    (e[a + 1] = (function mw(e, n) {
                      return (131071 & e) | (n << 17)
                    })(e[a + 1], i))
                } else
                  (e[i + 1] = Ls(a, 0)),
                    0 !== a && (e[a + 1] = Cc(e[a + 1], i)),
                    (a = i)
              else
                (e[i + 1] = Ls(l, 0)),
                  0 === a ? (a = i) : (e[l + 1] = Cc(e[l + 1], i)),
                  (l = i)
              c && (e[i + 1] = Dc(e[i + 1])),
                s_(e, u, i, !0),
                s_(e, u, i, !1),
                (function iE(e, n, t, i, r) {
                  const o = r ? e.residualClasses : e.residualStyles
                  null != o &&
                    'string' == typeof n &&
                    Ji(o, n) >= 0 &&
                    (t[i + 1] = wc(t[i + 1]))
                })(n, u, e, i, o),
                (s = Ls(a, l)),
                o ? (n.classBindings = s) : (n.styleBindings = s)
            })(r, o, n, t, s, i)
        }
      }
      function su(e, n, t, i, r) {
        let o = null
        const s = t.directiveEnd
        let a = t.directiveStylingLast
        for (
          -1 === a ? (a = t.directiveStart) : a++;
          a < s && ((o = n[a]), (i = po(i, o.hostAttrs, r)), o !== e);

        )
          a++
        return null !== e && (t.directiveStylingLast = a), i
      }
      function po(e, n, t) {
        const i = t ? 1 : 2
        let r = -1
        if (null !== n)
          for (let o = 0; o < n.length; o++) {
            const s = n[o]
            'number' == typeof s
              ? (r = s)
              : r === i &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ['', e]),
                Ct(e, s, !!t || n[++o]))
          }
        return void 0 === e ? null : e
      }
      function __(e, n, t, i, r, o, s, a) {
        if (!(3 & n.type)) return
        const l = e.data,
          c = l[a + 1]
        Js(
          (function xh(e) {
            return 1 == (1 & e)
          })(c)
            ? m_(l, n, t, r, An(c), s)
            : void 0
        ) ||
          (Js(o) ||
            ((function Ih(e) {
              return 2 == (2 & e)
            })(c) &&
              (o = m_(l, null, t, r, a, s))),
          (function ow(e, n, t, i, r) {
            const o = De(e)
            if (n)
              r
                ? o
                  ? e.addClass(t, i)
                  : t.classList.add(i)
                : o
                ? e.removeClass(t, i)
                : t.classList.remove(i)
            else {
              let s = -1 === i.indexOf('-') ? void 0 : wt.DashCase
              if (null == r)
                o ? e.removeStyle(t, i, s) : t.style.removeProperty(i)
              else {
                const a = 'string' == typeof r && r.endsWith('!important')
                a && ((r = r.slice(0, -10)), (s |= wt.Important)),
                  o
                    ? e.setStyle(t, i, r, s)
                    : t.style.setProperty(i, r, a ? 'important' : '')
              }
            }
          })(i, s, ds(nt(), t), r, o))
      }
      function m_(e, n, t, i, r, o) {
        const s = null === n
        let a
        for (; r > 0; ) {
          const l = e[r],
            c = Array.isArray(l),
            u = c ? l[1] : l,
            d = null === u
          let f = t[r + 1]
          f === x && (f = d ? le : void 0)
          let p = d ? ql(f, i) : u === i ? f : void 0
          if ((c && !Js(p) && (p = ql(l, i)), Js(p) && ((a = p), s))) return a
          const h = e[r + 1]
          r = s ? Kt(h) : An(h)
        }
        if (null !== n) {
          let l = o ? n.residualClasses : n.residualStyles
          null != l && (a = ql(l, i))
        }
        return a
      }
      function Js(e) {
        return void 0 !== e
      }
      function v_(e, n) {
        return 0 != (e.flags & (n ? 16 : 32))
      }
      function Lt(e, n = '') {
        const t = b(),
          i = Y(),
          r = e + 20,
          o = i.firstCreatePass ? er(i, r, 1, n, null) : i.data[r],
          s = (t[r] = (function pc(e, n) {
            return De(e) ? e.createText(n) : e.createTextNode(n)
          })(t[F], n))
        ks(i, t, s, o), un(o, !1)
      }
      function au(e) {
        return mr('', e, ''), au
      }
      function mr(e, n, t) {
        const i = b(),
          r = (function ar(e, n, t, i) {
            return Xe(e, ji(), t) ? n + S(t) + i : x
          })(i, e, n, t)
        return r !== x && On(i, nt(), r), mr
      }
      const Ys = 'en-US'
      let B_ = Ys
      function du(e, n, t, i, r) {
        if (((e = k(e)), Array.isArray(e)))
          for (let o = 0; o < e.length; o++) du(e[o], n, t, i, r)
        else {
          const o = Y(),
            s = b()
          let a = rr(e) ? e : k(e.provide),
            l = dg(e)
          const c = Fe(),
            u = 1048575 & c.providerIndexes,
            d = c.directiveStart,
            f = c.providerIndexes >> 20
          if (rr(e) || !e.multi) {
            const p = new Ur(l, r, m),
              h = pu(a, n, r ? u : u + f, d)
            ;-1 === h
              ? (Cs($r(c, s), o, a),
                fu(o, e, n.length),
                n.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                t.push(p),
                s.push(p))
              : ((t[h] = p), (s[h] = p))
          } else {
            const p = pu(a, n, u + f, d),
              h = pu(a, n, u, u + f),
              g = p >= 0 && t[p],
              v = h >= 0 && t[h]
            if ((r && !v) || (!r && !g)) {
              Cs($r(c, s), o, a)
              const y = (function kT(e, n, t, i, r) {
                const o = new Ur(e, t, m)
                return (
                  (o.multi = []),
                  (o.index = n),
                  (o.componentProviders = 0),
                  cm(o, r, i && !t),
                  o
                )
              })(r ? PT : RT, t.length, r, i, l)
              !r && v && (t[h].providerFactory = y),
                fu(o, e, n.length, 0),
                n.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                t.push(y),
                s.push(y)
            } else fu(o, e, p > -1 ? p : h, cm(t[r ? h : p], l, !r && i))
            !r && i && v && t[h].componentProviders++
          }
        }
      }
      function fu(e, n, t, i) {
        const r = rr(n),
          o = (function lN(e) {
            return !!e.useClass
          })(n)
        if (r || o) {
          const l = (o ? k(n.useClass) : n).prototype.ngOnDestroy
          if (l) {
            const c = e.destroyHooks || (e.destroyHooks = [])
            if (!r && n.multi) {
              const u = c.indexOf(t)
              ;-1 === u ? c.push(t, [i, l]) : c[u + 1].push(i, l)
            } else c.push(t, l)
          }
        }
      }
      function cm(e, n, t) {
        return t && e.componentProviders++, e.multi.push(n) - 1
      }
      function pu(e, n, t, i) {
        for (let r = t; r < i; r++) if (n[r] === e) return r
        return -1
      }
      function RT(e, n, t, i) {
        return hu(this.multi, [])
      }
      function PT(e, n, t, i) {
        const r = this.multi
        let o
        if (this.providerFactory) {
          const s = this.providerFactory.componentProviders,
            a = Wr(t, t[1], this.providerFactory.index, i)
          ;(o = a.slice(0, s)), hu(r, o)
          for (let l = s; l < a.length; l++) o.push(a[l])
        } else (o = []), hu(r, o)
        return o
      }
      function hu(e, n) {
        for (let t = 0; t < e.length; t++) n.push((0, e[t])())
        return n
      }
      function ue(e, n = []) {
        return (t) => {
          t.providersResolver = (i, r) =>
            (function xT(e, n, t) {
              const i = Y()
              if (i.firstCreatePass) {
                const r = zt(e)
                du(t, i.data, i.blueprint, r, !0),
                  du(n, i.data, i.blueprint, r, !1)
              }
            })(i, r ? r(e) : e, n)
        }
      }
      class um {}
      class VT {
        resolveComponentFactory(n) {
          throw (function LT(e) {
            const n = Error(
              `No component factory found for ${ie(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            )
            return (n.ngComponent = e), n
          })(n)
        }
      }
      let vo = (() => {
        class e {}
        return (e.NULL = new VT()), e
      })()
      function BT() {
        return br(Fe(), b())
      }
      function br(e, n) {
        return new _e(Rt(e, n))
      }
      let _e = (() => {
        class e {
          constructor(t) {
            this.nativeElement = t
          }
        }
        return (e.__NG_ELEMENT_ID__ = BT), e
      })()
      function HT(e) {
        return e instanceof _e ? e.nativeElement : e
      }
      class gu {}
      let vn = (() => {
          class e {}
          return (
            (e.__NG_ELEMENT_ID__ = () =>
              (function UT() {
                const e = b(),
                  t = Dt(Fe().index, e)
                return (function jT(e) {
                  return e[F]
                })(cn(t) ? t : e)
              })()),
            e
          )
        })(),
        GT = (() => {
          class e {}
          return (
            (e.ɵprov = q({
              token: e,
              providedIn: 'root',
              factory: () => null,
            })),
            e
          )
        })()
      class ta {
        constructor(n) {
          ;(this.full = n),
            (this.major = n.split('.')[0]),
            (this.minor = n.split('.')[1]),
            (this.patch = n.split('.').slice(2).join('.'))
        }
      }
      const $T = new ta('13.3.11'),
        _u = {}
      function na(e, n, t, i, r = !1) {
        for (; null !== t; ) {
          const o = n[t.index]
          if ((null !== o && i.push(xe(o)), Wt(o)))
            for (let a = 10; a < o.length; a++) {
              const l = o[a],
                c = l[1].firstChild
              null !== c && na(l[1], l, c, i)
            }
          const s = t.type
          if (8 & s) na(e, n, t.child, i)
          else if (32 & s) {
            const a = uc(t, n)
            let l
            for (; (l = a()); ) i.push(l)
          } else if (16 & s) {
            const a = bh(n, t)
            if (Array.isArray(a)) i.push(...a)
            else {
              const l = oo(n[16])
              na(l[1], l, a, i, !0)
            }
          }
          t = r ? t.projectionNext : t.next
        }
        return i
      }
      class yo {
        constructor(n, t) {
          ;(this._lView = n),
            (this._cdRefInjectingView = t),
            (this._appRef = null),
            (this._attachedToViewContainer = !1)
        }
        get rootNodes() {
          const n = this._lView,
            t = n[1]
          return na(t, n, t.firstChild, [])
        }
        get context() {
          return this._lView[8]
        }
        set context(n) {
          this._lView[8] = n
        }
        get destroyed() {
          return 256 == (256 & this._lView[2])
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this)
          else if (this._attachedToViewContainer) {
            const n = this._lView[3]
            if (Wt(n)) {
              const t = n[8],
                i = t ? t.indexOf(this) : -1
              i > -1 && (gc(n, i), Ns(t, i))
            }
            this._attachedToViewContainer = !1
          }
          dh(this._lView[1], this._lView)
        }
        onDestroy(n) {
          zh(this._lView[1], this._lView, null, n)
        }
        markForCheck() {
          Vc(this._cdRefInjectingView || this._lView)
        }
        detach() {
          this._lView[2] &= -129
        }
        reattach() {
          this._lView[2] |= 128
        }
        detectChanges() {
          !(function Hc(e, n, t) {
            const i = n[10]
            i.begin && i.begin()
            try {
              nr(e, n, e.template, t)
            } catch (r) {
              throw (og(n, r), r)
            } finally {
              i.end && i.end()
            }
          })(this._lView[1], this._lView, this.context)
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new J(902, '')
          this._attachedToViewContainer = !0
        }
        detachFromAppRef() {
          ;(this._appRef = null),
            (function JC(e, n) {
              so(e, n, n[F], 2, null, null)
            })(this._lView[1], this._lView)
        }
        attachToAppRef(n) {
          if (this._attachedToViewContainer) throw new J(902, '')
          this._appRef = n
        }
      }
      class WT extends yo {
        constructor(n) {
          super(n), (this._view = n)
        }
        detectChanges() {
          tg(this._view)
        }
        checkNoChanges() {}
        get context() {
          return null
        }
      }
      class fm extends vo {
        constructor(n) {
          super(), (this.ngModule = n)
        }
        resolveComponentFactory(n) {
          const t = Je(n)
          return new mu(t, this.ngModule)
        }
      }
      function pm(e) {
        const n = []
        for (let t in e)
          e.hasOwnProperty(t) && n.push({propName: e[t], templateName: t})
        return n
      }
      class mu extends um {
        constructor(n, t) {
          super(),
            (this.componentDef = n),
            (this.ngModule = t),
            (this.componentType = n.type),
            (this.selector = (function gw(e) {
              return e.map(hw).join(',')
            })(n.selectors)),
            (this.ngContentSelectors = n.ngContentSelectors
              ? n.ngContentSelectors
              : []),
            (this.isBoundToModule = !!t)
        }
        get inputs() {
          return pm(this.componentDef.inputs)
        }
        get outputs() {
          return pm(this.componentDef.outputs)
        }
        create(n, t, i, r) {
          const o = (r = r || this.ngModule)
              ? (function qT(e, n) {
                  return {
                    get: (t, i, r) => {
                      const o = e.get(t, _u, r)
                      return o !== _u || i === _u ? o : n.get(t, i, r)
                    },
                  }
                })(n, r.injector)
              : n,
            s = o.get(gu, ep),
            a = o.get(GT, null),
            l = s.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || 'div',
            u = i
              ? (function Wh(e, n, t) {
                  if (De(e)) return e.selectRootElement(n, t === an.ShadowDom)
                  let i = 'string' == typeof n ? e.querySelector(n) : n
                  return (i.textContent = ''), i
                })(l, i, this.componentDef.encapsulation)
              : hc(
                  s.createRenderer(null, this.componentDef),
                  c,
                  (function zT(e) {
                    const n = e.toLowerCase()
                    return 'svg' === n ? 'svg' : 'math' === n ? 'math' : null
                  })(c)
                ),
            d = this.componentDef.onPush ? 576 : 528,
            f = (function wg(e, n) {
              return {
                components: [],
                scheduler: e || jC,
                clean: Xw,
                playerHandler: n || null,
                flags: 0,
              }
            })(),
            p = Hs(0, null, null, 1, 0, null, null, null, null, null),
            h = ao(null, p, f, d, null, null, s, l, a, o)
          let g, v
          ps(h)
          try {
            const y = (function Dg(e, n, t, i, r, o) {
              const s = t[1]
              t[20] = e
              const l = er(s, 20, 2, '#host', null),
                c = (l.mergedAttrs = n.hostAttrs)
              null !== c &&
                (Us(l, c, !0),
                null !== e &&
                  (vs(r, e, c),
                  null !== l.classes && bc(r, e, l.classes),
                  null !== l.styles && wh(r, e, l.styles)))
              const u = i.createRenderer(e, n),
                d = ao(
                  t,
                  Gh(n),
                  null,
                  n.onPush ? 64 : 16,
                  t[20],
                  l,
                  i,
                  u,
                  o || null,
                  null
                )
              return (
                s.firstCreatePass &&
                  (Cs($r(l, t), s, n.type), Zh(s, l), Qh(l, t.length, 1)),
                js(t, d),
                (t[20] = d)
              )
            })(u, this.componentDef, h, s, l)
            if (u)
              if (i) vs(l, u, ['ng-version', $T.full])
              else {
                const {attrs: _, classes: D} = (function _w(e) {
                  const n = [],
                    t = []
                  let i = 1,
                    r = 2
                  for (; i < e.length; ) {
                    let o = e[i]
                    if ('string' == typeof o)
                      2 === r
                        ? '' !== o && n.push(o, e[++i])
                        : 8 === r && t.push(o)
                    else {
                      if (!qt(r)) break
                      r = o
                    }
                    i++
                  }
                  return {attrs: n, classes: t}
                })(this.componentDef.selectors[0])
                _ && vs(l, u, _), D && D.length > 0 && bc(l, u, D.join(' '))
              }
            if (((v = Sl(p, 20)), void 0 !== t)) {
              const _ = (v.projection = [])
              for (let D = 0; D < this.ngContentSelectors.length; D++) {
                const C = t[D]
                _.push(null != C ? Array.from(C) : null)
              }
            }
            ;(g = (function Cg(e, n, t, i, r) {
              const o = t[1],
                s = (function Lw(e, n, t) {
                  const i = Fe()
                  e.firstCreatePass &&
                    (t.providersResolver && t.providersResolver(t),
                    Xh(e, i, n, tr(e, n, 1, null), t))
                  const r = Wr(n, e, i.directiveStart, i)
                  Qe(r, n)
                  const o = Rt(i, n)
                  return o && Qe(o, n), r
                })(o, t, n)
              if (
                (i.components.push(s),
                (e[8] = s),
                r && r.forEach((l) => l(s, n)),
                n.contentQueries)
              ) {
                const l = Fe()
                n.contentQueries(1, s, l.directiveStart)
              }
              const a = Fe()
              return (
                !o.firstCreatePass ||
                  (null === n.hostBindings && null === n.hostAttrs) ||
                  (Un(a.index),
                  Jh(t[1], a, 0, a.directiveStart, a.directiveEnd, n),
                  Yh(n, s)),
                s
              )
            })(y, this.componentDef, h, f, [yN])),
              lo(p, h, null)
          } finally {
            hs()
          }
          return new JT(this.componentType, g, br(v, h), h, v)
        }
      }
      class JT extends class FT {} {
        constructor(n, t, i, r, o) {
          super(),
            (this.location = i),
            (this._rootLView = r),
            (this._tNode = o),
            (this.instance = t),
            (this.hostView = this.changeDetectorRef = new WT(r)),
            (this.componentType = n)
        }
        get injector() {
          return new $i(this._tNode, this._rootLView)
        }
        destroy() {
          this.hostView.destroy()
        }
        onDestroy(n) {
          this.hostView.onDestroy(n)
        }
      }
      class Dr {}
      const Cr = new Map()
      class _m extends Dr {
        constructor(n, t) {
          super(),
            (this._parent = t),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new fm(this))
          const i = Ot(n)
          ;(this._bootstrapComponents = pn(i.bootstrap)),
            (this._r3Injector = ug(
              n,
              t,
              [
                {provide: Dr, useValue: this},
                {provide: vo, useValue: this.componentFactoryResolver},
              ],
              ie(n)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(n))
        }
        get(n, t = gt.THROW_IF_NOT_FOUND, i = R.Default) {
          return n === gt || n === Dr || n === Uc
            ? this
            : this._r3Injector.get(n, t, i)
        }
        destroy() {
          const n = this._r3Injector
          !n.destroyed && n.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null)
        }
        onDestroy(n) {
          this.destroyCbs.push(n)
        }
      }
      class vu extends class ZT {} {
        constructor(n) {
          super(),
            (this.moduleType = n),
            null !== Ot(n) &&
              (function QT(e) {
                const n = new Set()
                !(function t(i) {
                  const r = Ot(i, !0),
                    o = r.id
                  null !== o &&
                    ((function hm(e, n, t) {
                      if (n && n !== t)
                        throw new Error(
                          `Duplicate module registered for ${e} - ${ie(
                            n
                          )} vs ${ie(n.name)}`
                        )
                    })(o, Cr.get(o), i),
                    Cr.set(o, i))
                  const s = pn(r.imports)
                  for (const a of s) n.has(a) || (n.add(a), t(a))
                })(e)
              })(n)
        }
        create(n) {
          return new _m(this.moduleType, n)
        }
      }
      function wr(e, n, t, i, r) {
        return (function vm(e, n, t, i, r, o, s) {
          const a = n + t
          return (function hi(e, n, t, i) {
            const r = Xe(e, n, t)
            return Xe(e, n + 1, i) || r
          })(e, a, r, o)
            ? (function gn(e, n, t) {
                return (e[n] = t)
              })(e, a + 2, s ? i.call(s, r, o) : i(r, o))
            : (function bo(e, n) {
                const t = e[n]
                return t === x ? void 0 : t
              })(e, a + 2)
        })(
          b(),
          (function tt() {
            const e = I.lFrame
            let n = e.bindingRootIndex
            return (
              -1 === n && (n = e.bindingRootIndex = e.tView.bindingStartIndex),
              n
            )
          })(),
          e,
          n,
          t,
          i,
          r
        )
      }
      function bu(e) {
        return (n) => {
          setTimeout(e, void 0, n)
        }
      }
      const $ = class pM extends We {
        constructor(n = !1) {
          super(), (this.__isAsync = n)
        }
        emit(n) {
          super.next(n)
        }
        subscribe(n, t, i) {
          var r, o, s
          let a = n,
            l = t || (() => null),
            c = i
          if (n && 'object' == typeof n) {
            const d = n
            ;(a = null === (r = d.next) || void 0 === r ? void 0 : r.bind(d)),
              (l = null === (o = d.error) || void 0 === o ? void 0 : o.bind(d)),
              (c =
                null === (s = d.complete) || void 0 === s ? void 0 : s.bind(d))
          }
          this.__isAsync && ((l = bu(l)), a && (a = bu(a)), c && (c = bu(c)))
          const u = super.subscribe({next: a, error: l, complete: c})
          return n instanceof Ut && n.add(u), u
        }
      }
      function hM() {
        return this._results[or()]()
      }
      class Du {
        constructor(n = !1) {
          ;(this._emitDistinctChangesOnly = n),
            (this.dirty = !0),
            (this._results = []),
            (this._changesDetected = !1),
            (this._changes = null),
            (this.length = 0),
            (this.first = void 0),
            (this.last = void 0)
          const t = or(),
            i = Du.prototype
          i[t] || (i[t] = hM)
        }
        get changes() {
          return this._changes || (this._changes = new $())
        }
        get(n) {
          return this._results[n]
        }
        map(n) {
          return this._results.map(n)
        }
        filter(n) {
          return this._results.filter(n)
        }
        find(n) {
          return this._results.find(n)
        }
        reduce(n, t) {
          return this._results.reduce(n, t)
        }
        forEach(n) {
          this._results.forEach(n)
        }
        some(n) {
          return this._results.some(n)
        }
        toArray() {
          return this._results.slice()
        }
        toString() {
          return this._results.toString()
        }
        reset(n, t) {
          const i = this
          i.dirty = !1
          const r = kt(n)
          ;(this._changesDetected = !(function E1(e, n, t) {
            if (e.length !== n.length) return !1
            for (let i = 0; i < e.length; i++) {
              let r = e[i],
                o = n[i]
              if ((t && ((r = t(r)), (o = t(o))), o !== r)) return !1
            }
            return !0
          })(i._results, r, t)) &&
            ((i._results = r),
            (i.length = r.length),
            (i.last = r[this.length - 1]),
            (i.first = r[0]))
        }
        notifyOnChanges() {
          this._changes &&
            (this._changesDetected || !this._emitDistinctChangesOnly) &&
            this._changes.emit(this)
        }
        setDirty() {
          this.dirty = !0
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe()
        }
      }
      Symbol
      let Ne = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = mM), e
      })()
      const gM = Ne,
        _M = class extends gM {
          constructor(n, t, i) {
            super(),
              (this._declarationLView = n),
              (this._declarationTContainer = t),
              (this.elementRef = i)
          }
          createEmbeddedView(n) {
            const t = this._declarationTContainer.tViews,
              i = ao(
                this._declarationLView,
                t,
                n,
                16,
                null,
                t.declTNode,
                null,
                null,
                null,
                null
              )
            i[17] = this._declarationLView[this._declarationTContainer.index]
            const o = this._declarationLView[19]
            return (
              null !== o && (i[19] = o.createEmbeddedView(t)),
              lo(t, i, n),
              new yo(i)
            )
          }
        }
      function mM() {
        return ra(Fe(), b())
      }
      function ra(e, n) {
        return 4 & e.type ? new _M(n, e, br(e, n)) : null
      }
      let yn = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = vM), e
      })()
      function vM() {
        return Nm(Fe(), b())
      }
      const yM = yn,
        Cm = class extends yM {
          constructor(n, t, i) {
            super(),
              (this._lContainer = n),
              (this._hostTNode = t),
              (this._hostLView = i)
          }
          get element() {
            return br(this._hostTNode, this._hostLView)
          }
          get injector() {
            return new $i(this._hostTNode, this._hostLView)
          }
          get parentInjector() {
            const n = Ds(this._hostTNode, this._hostLView)
            if (mp(n)) {
              const t = Gi(n, this._hostLView),
                i = Ui(n)
              return new $i(t[1].data[i + 8], t)
            }
            return new $i(null, this._hostLView)
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1)
          }
          get(n) {
            const t = wm(this._lContainer)
            return (null !== t && t[n]) || null
          }
          get length() {
            return this._lContainer.length - 10
          }
          createEmbeddedView(n, t, i) {
            const r = n.createEmbeddedView(t || {})
            return this.insert(r, i), r
          }
          createComponent(n, t, i, r, o) {
            const s =
              n &&
              !(function Kr(e) {
                return 'function' == typeof e
              })(n)
            let a
            if (s) a = t
            else {
              const d = t || {}
              ;(a = d.index),
                (i = d.injector),
                (r = d.projectableNodes),
                (o = d.ngModuleRef)
            }
            const l = s ? n : new mu(Je(n)),
              c = i || this.parentInjector
            if (!o && null == l.ngModule) {
              const f = (s ? c : this.parentInjector).get(Dr, null)
              f && (o = f)
            }
            const u = l.create(c, r, void 0, o)
            return this.insert(u.hostView, a), u
          }
          insert(n, t) {
            const i = n._lView,
              r = i[1]
            if (
              (function qD(e) {
                return Wt(e[3])
              })(i)
            ) {
              const u = this.indexOf(n)
              if (-1 !== u) this.detach(u)
              else {
                const d = i[3],
                  f = new Cm(d, d[6], d[3])
                f.detach(f.indexOf(n))
              }
            }
            const o = this._adjustIndex(t),
              s = this._lContainer
            !(function ZC(e, n, t, i) {
              const r = 10 + i,
                o = t.length
              i > 0 && (t[r - 1][4] = n),
                i < o - 10
                  ? ((n[4] = t[r]), Mp(t, 10 + i, n))
                  : (t.push(n), (n[4] = null)),
                (n[3] = t)
              const s = n[17]
              null !== s &&
                t !== s &&
                (function QC(e, n) {
                  const t = e[9]
                  n[16] !== n[3][3][16] && (e[2] = !0),
                    null === t ? (e[9] = [n]) : t.push(n)
                })(s, n)
              const a = n[19]
              null !== a && a.insertView(e), (n[2] |= 128)
            })(r, i, s, o)
            const a = vc(o, s),
              l = i[F],
              c = Ps(l, s[7])
            return (
              null !== c &&
                (function KC(e, n, t, i, r, o) {
                  ;(i[0] = r), (i[6] = n), so(e, i, t, 1, r, o)
                })(r, s[6], l, i, c, a),
              n.attachToViewContainerRef(),
              Mp(Cu(s), o, n),
              n
            )
          }
          move(n, t) {
            return this.insert(n, t)
          }
          indexOf(n) {
            const t = wm(this._lContainer)
            return null !== t ? t.indexOf(n) : -1
          }
          remove(n) {
            const t = this._adjustIndex(n, -1),
              i = gc(this._lContainer, t)
            i && (Ns(Cu(this._lContainer), t), dh(i[1], i))
          }
          detach(n) {
            const t = this._adjustIndex(n, -1),
              i = gc(this._lContainer, t)
            return i && null != Ns(Cu(this._lContainer), t) ? new yo(i) : null
          }
          _adjustIndex(n, t = 0) {
            return null == n ? this.length + t : n
          }
        }
      function wm(e) {
        return e[8]
      }
      function Cu(e) {
        return e[8] || (e[8] = [])
      }
      function Nm(e, n) {
        let t
        const i = n[e.index]
        if (Wt(i)) t = i
        else {
          let r
          if (8 & e.type) r = xe(i)
          else {
            const o = n[F]
            r = o.createComment('')
            const s = Rt(e, n)
            pi(
              o,
              Ps(o, s),
              r,
              (function nw(e, n) {
                return De(e) ? e.nextSibling(n) : n.nextSibling
              })(o, s),
              !1
            )
          }
          ;(n[e.index] = t = eg(i, n, r, e)), js(n, t)
        }
        return new Cm(t, e, n)
      }
      class wu {
        constructor(n) {
          ;(this.queryList = n), (this.matches = null)
        }
        clone() {
          return new wu(this.queryList)
        }
        setDirty() {
          this.queryList.setDirty()
        }
      }
      class Nu {
        constructor(n = []) {
          this.queries = n
        }
        createEmbeddedView(n) {
          const t = n.queries
          if (null !== t) {
            const i =
                null !== n.contentQueries ? n.contentQueries[0] : t.length,
              r = []
            for (let o = 0; o < i; o++) {
              const s = t.getByIndex(o)
              r.push(this.queries[s.indexInDeclarationView].clone())
            }
            return new Nu(r)
          }
          return null
        }
        insertView(n) {
          this.dirtyQueriesWithMatches(n)
        }
        detachView(n) {
          this.dirtyQueriesWithMatches(n)
        }
        dirtyQueriesWithMatches(n) {
          for (let t = 0; t < this.queries.length; t++)
            null !== Om(n, t).matches && this.queries[t].setDirty()
        }
      }
      class Em {
        constructor(n, t, i = null) {
          ;(this.predicate = n), (this.flags = t), (this.read = i)
        }
      }
      class Eu {
        constructor(n = []) {
          this.queries = n
        }
        elementStart(n, t) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].elementStart(n, t)
        }
        elementEnd(n) {
          for (let t = 0; t < this.queries.length; t++)
            this.queries[t].elementEnd(n)
        }
        embeddedTView(n) {
          let t = null
          for (let i = 0; i < this.length; i++) {
            const r = null !== t ? t.length : 0,
              o = this.getByIndex(i).embeddedTView(n, r)
            o &&
              ((o.indexInDeclarationView = i),
              null !== t ? t.push(o) : (t = [o]))
          }
          return null !== t ? new Eu(t) : null
        }
        template(n, t) {
          for (let i = 0; i < this.queries.length; i++)
            this.queries[i].template(n, t)
        }
        getByIndex(n) {
          return this.queries[n]
        }
        get length() {
          return this.queries.length
        }
        track(n) {
          this.queries.push(n)
        }
      }
      class Tu {
        constructor(n, t = -1) {
          ;(this.metadata = n),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = t)
        }
        elementStart(n, t) {
          this.isApplyingToNode(t) && this.matchTNode(n, t)
        }
        elementEnd(n) {
          this._declarationNodeIndex === n.index &&
            (this._appliesToNextNode = !1)
        }
        template(n, t) {
          this.elementStart(n, t)
        }
        embeddedTView(n, t) {
          return this.isApplyingToNode(n)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-n.index, t),
              new Tu(this.metadata))
            : null
        }
        isApplyingToNode(n) {
          if (this._appliesToNextNode && 1 != (1 & this.metadata.flags)) {
            const t = this._declarationNodeIndex
            let i = n.parent
            for (; null !== i && 8 & i.type && i.index !== t; ) i = i.parent
            return t === (null !== i ? i.index : -1)
          }
          return this._appliesToNextNode
        }
        matchTNode(n, t) {
          const i = this.metadata.predicate
          if (Array.isArray(i))
            for (let r = 0; r < i.length; r++) {
              const o = i[r]
              this.matchTNodeWithReadOption(n, t, CM(t, o)),
                this.matchTNodeWithReadOption(n, t, ws(t, n, o, !1, !1))
            }
          else
            i === Ne
              ? 4 & t.type && this.matchTNodeWithReadOption(n, t, -1)
              : this.matchTNodeWithReadOption(n, t, ws(t, n, i, !1, !1))
        }
        matchTNodeWithReadOption(n, t, i) {
          if (null !== i) {
            const r = this.metadata.read
            if (null !== r)
              if (r === _e || r === yn || (r === Ne && 4 & t.type))
                this.addMatch(t.index, -2)
              else {
                const o = ws(t, n, r, !1, !1)
                null !== o && this.addMatch(t.index, o)
              }
            else this.addMatch(t.index, i)
          }
        }
        addMatch(n, t) {
          null === this.matches
            ? (this.matches = [n, t])
            : this.matches.push(n, t)
        }
      }
      function CM(e, n) {
        const t = e.localNames
        if (null !== t)
          for (let i = 0; i < t.length; i += 2) if (t[i] === n) return t[i + 1]
        return null
      }
      function NM(e, n, t, i) {
        return -1 === t
          ? (function wM(e, n) {
              return 11 & e.type ? br(e, n) : 4 & e.type ? ra(e, n) : null
            })(n, e)
          : -2 === t
          ? (function EM(e, n, t) {
              return t === _e
                ? br(n, e)
                : t === Ne
                ? ra(n, e)
                : t === yn
                ? Nm(n, e)
                : void 0
            })(e, n, i)
          : Wr(e, e[1], t, n)
      }
      function Tm(e, n, t, i) {
        const r = n[19].queries[i]
        if (null === r.matches) {
          const o = e.data,
            s = t.matches,
            a = []
          for (let l = 0; l < s.length; l += 2) {
            const c = s[l]
            a.push(c < 0 ? null : NM(n, o[c], s[l + 1], t.metadata.read))
          }
          r.matches = a
        }
        return r.matches
      }
      function Mu(e, n, t, i) {
        const r = e.queries.getByIndex(t),
          o = r.matches
        if (null !== o) {
          const s = Tm(e, n, r, t)
          for (let a = 0; a < o.length; a += 2) {
            const l = o[a]
            if (l > 0) i.push(s[a / 2])
            else {
              const c = o[a + 1],
                u = n[-l]
              for (let d = 10; d < u.length; d++) {
                const f = u[d]
                f[17] === f[3] && Mu(f[1], f, c, i)
              }
              if (null !== u[9]) {
                const d = u[9]
                for (let f = 0; f < d.length; f++) {
                  const p = d[f]
                  Mu(p[1], p, c, i)
                }
              }
            }
          }
        }
        return i
      }
      function Ee(e) {
        const n = b(),
          t = Y(),
          i = lp()
        Ll(i + 1)
        const r = Om(t, i)
        if (e.dirty && tp(n) === (2 == (2 & r.metadata.flags))) {
          if (null === r.matches) e.reset([])
          else {
            const o = r.crossesNgTemplate ? Mu(t, n, i, []) : Tm(t, n, r, i)
            e.reset(o, HT), e.notifyOnChanges()
          }
          return !0
        }
        return !1
      }
      function oa(e, n, t) {
        const i = Y()
        i.firstCreatePass &&
          ((function Am(e, n, t) {
            null === e.queries && (e.queries = new Eu()),
              e.queries.track(new Tu(n, t))
          })(i, new Em(e, n, t), -1),
          2 == (2 & n) && (i.staticViewQueries = !0)),
          (function Mm(e, n, t) {
            const i = new Du(4 == (4 & t))
            zh(e, n, i, i.destroy),
              null === n[19] && (n[19] = new Nu()),
              n[19].queries.push(new wu(i))
          })(i, b(), n)
      }
      function Te() {
        return (function TM(e, n) {
          return e[19].queries[n].queryList
        })(b(), lp())
      }
      function Om(e, n) {
        return e.queries.getByIndex(n)
      }
      function la(...e) {}
      const zm = new K('Application Initializer')
      let Ru = (() => {
        class e {
          constructor(t) {
            ;(this.appInits = t),
              (this.resolve = la),
              (this.reject = la),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((i, r) => {
                ;(this.resolve = i), (this.reject = r)
              }))
          }
          runInitializers() {
            if (this.initialized) return
            const t = [],
              i = () => {
                ;(this.done = !0), this.resolve()
              }
            if (this.appInits)
              for (let r = 0; r < this.appInits.length; r++) {
                const o = this.appInits[r]()
                if (qs(o)) t.push(o)
                else if (zg(o)) {
                  const s = new Promise((a, l) => {
                    o.subscribe({complete: a, error: l})
                  })
                  t.push(s)
                }
              }
            Promise.all(t)
              .then(() => {
                i()
              })
              .catch((r) => {
                this.reject(r)
              }),
              0 === t.length && i(),
              (this.initialized = !0)
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(P(zm, 8))
          }),
          (e.ɵprov = q({token: e, factory: e.ɵfac, providedIn: 'root'})),
          e
        )
      })()
      const wo = new K('AppId', {
        providedIn: 'root',
        factory: function qm() {
          return `${Pu()}${Pu()}${Pu()}`
        },
      })
      function Pu() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()))
      }
      const Km = new K('Platform Initializer'),
        ku = new K('Platform ID', {
          providedIn: 'platform',
          factory: () => 'unknown',
        }),
        $M = new K('appBootstrapListener'),
        Jn = new K('LocaleId', {
          providedIn: 'root',
          factory: () =>
            V1(Jn, R.Optional | R.SkipSelf) ||
            (function WM() {
              return ('undefined' != typeof $localize && $localize.locale) || Ys
            })(),
        }),
        JM = (() => Promise.resolve(0))()
      function Fu(e) {
        'undefined' == typeof Zone
          ? JM.then(() => {
              e && e.apply(null, null)
            })
          : Zone.current.scheduleMicroTask('scheduleMicrotask', e)
      }
      class Ae {
        constructor({
          enableLongStackTrace: n = !1,
          shouldCoalesceEventChangeDetection: t = !1,
          shouldCoalesceRunChangeDetection: i = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new $(!1)),
            (this.onMicrotaskEmpty = new $(!1)),
            (this.onStable = new $(!1)),
            (this.onError = new $(!1)),
            'undefined' == typeof Zone)
          )
            throw new Error('In this configuration Angular requires Zone.js')
          Zone.assertZonePatched()
          const r = this
          ;(r._nesting = 0),
            (r._outer = r._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
            n &&
              Zone.longStackTraceZoneSpec &&
              (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
            (r.shouldCoalesceEventChangeDetection = !i && t),
            (r.shouldCoalesceRunChangeDetection = i),
            (r.lastRequestAnimationFrameId = -1),
            (r.nativeRequestAnimationFrame = (function YM() {
              let e = oe.requestAnimationFrame,
                n = oe.cancelAnimationFrame
              if ('undefined' != typeof Zone && e && n) {
                const t = e[Zone.__symbol__('OriginalDelegate')]
                t && (e = t)
                const i = n[Zone.__symbol__('OriginalDelegate')]
                i && (n = i)
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: n,
              }
            })().nativeRequestAnimationFrame),
            (function XM(e) {
              const n = () => {
                !(function QM(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(oe, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              ;(e.lastRequestAnimationFrameId = -1),
                                Vu(e),
                                (e.isCheckStableRunning = !0),
                                Lu(e),
                                (e.isCheckStableRunning = !1)
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke()
                      })),
                    Vu(e))
                })(e)
              }
              e._inner = e._inner.fork({
                name: 'angular',
                properties: {isAngularZone: !0},
                onInvokeTask: (t, i, r, o, s, a) => {
                  try {
                    return Jm(e), t.invokeTask(r, o, s, a)
                  } finally {
                    ;((e.shouldCoalesceEventChangeDetection &&
                      'eventTask' === o.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      n(),
                      Ym(e)
                  }
                },
                onInvoke: (t, i, r, o, s, a, l) => {
                  try {
                    return Jm(e), t.invoke(r, o, s, a, l)
                  } finally {
                    e.shouldCoalesceRunChangeDetection && n(), Ym(e)
                  }
                },
                onHasTask: (t, i, r, o) => {
                  t.hasTask(r, o),
                    i === r &&
                      ('microTask' == o.change
                        ? ((e._hasPendingMicrotasks = o.microTask),
                          Vu(e),
                          Lu(e))
                        : 'macroTask' == o.change &&
                          (e.hasPendingMacrotasks = o.macroTask))
                },
                onHandleError: (t, i, r, o) => (
                  t.handleError(r, o),
                  e.runOutsideAngular(() => e.onError.emit(o)),
                  !1
                ),
              })
            })(r)
        }
        static isInAngularZone() {
          return (
            'undefined' != typeof Zone &&
            !0 === Zone.current.get('isAngularZone')
          )
        }
        static assertInAngularZone() {
          if (!Ae.isInAngularZone())
            throw new Error('Expected to be in Angular Zone, but it is not!')
        }
        static assertNotInAngularZone() {
          if (Ae.isInAngularZone())
            throw new Error('Expected to not be in Angular Zone, but it is!')
        }
        run(n, t, i) {
          return this._inner.run(n, t, i)
        }
        runTask(n, t, i, r) {
          const o = this._inner,
            s = o.scheduleEventTask('NgZoneEvent: ' + r, n, ZM, la, la)
          try {
            return o.runTask(s, t, i)
          } finally {
            o.cancelTask(s)
          }
        }
        runGuarded(n, t, i) {
          return this._inner.runGuarded(n, t, i)
        }
        runOutsideAngular(n) {
          return this._outer.run(n)
        }
      }
      const ZM = {}
      function Lu(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null)
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null))
              } finally {
                e.isStable = !0
              }
          }
      }
      function Vu(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        )
      }
      function Jm(e) {
        e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null))
      }
      function Ym(e) {
        e._nesting--, Lu(e)
      }
      class eA {
        constructor() {
          ;(this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new $()),
            (this.onMicrotaskEmpty = new $()),
            (this.onStable = new $()),
            (this.onError = new $())
        }
        run(n, t, i) {
          return n.apply(t, i)
        }
        runGuarded(n, t, i) {
          return n.apply(t, i)
        }
        runOutsideAngular(n) {
          return n()
        }
        runTask(n, t, i, r) {
          return n.apply(t, i)
        }
      }
      let Bu = (() => {
          class e {
            constructor(t) {
              ;(this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    'undefined' == typeof Zone
                      ? null
                      : Zone.current.get('TaskTrackingZone')
                })
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  ;(this._didWork = !0), (this._isZoneStable = !1)
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Ae.assertNotInAngularZone(),
                        Fu(() => {
                          ;(this._isZoneStable = !0),
                            this._runCallbacksIfReady()
                        })
                    },
                  })
                })
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              )
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero')
              return this._runCallbacksIfReady(), this._pendingCount
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              )
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Fu(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop()
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork)
                  }
                  this._didWork = !1
                })
              else {
                let t = this.getPendingTasks()
                ;(this._callbacks = this._callbacks.filter(
                  (i) =>
                    !i.updateCb ||
                    !i.updateCb(t) ||
                    (clearTimeout(i.timeoutId), !1)
                )),
                  (this._didWork = !0)
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : []
            }
            addCallback(t, i, r) {
              let o = -1
              i &&
                i > 0 &&
                (o = setTimeout(() => {
                  ;(this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    t(this._didWork, this.getPendingTasks())
                }, i)),
                this._callbacks.push({doneCb: t, timeoutId: o, updateCb: r})
            }
            whenStable(t, i, r) {
              if (r && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                )
              this.addCallback(t, i, r), this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
              return this._pendingCount
            }
            findProviders(t, i, r) {
              return []
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(P(Ae))
            }),
            (e.ɵprov = q({token: e, factory: e.ɵfac})),
            e
          )
        })(),
        tA = (() => {
          class e {
            constructor() {
              ;(this._applications = new Map()), Hu.addToWindow(this)
            }
            registerApplication(t, i) {
              this._applications.set(t, i)
            }
            unregisterApplication(t) {
              this._applications.delete(t)
            }
            unregisterAllApplications() {
              this._applications.clear()
            }
            getTestability(t) {
              return this._applications.get(t) || null
            }
            getAllTestabilities() {
              return Array.from(this._applications.values())
            }
            getAllRootElements() {
              return Array.from(this._applications.keys())
            }
            findTestabilityInTree(t, i = !0) {
              return Hu.findTestabilityInTree(this, t, i)
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵprov = q({
              token: e,
              factory: e.ɵfac,
              providedIn: 'platform',
            })),
            e
          )
        })()
      class nA {
        addToWindow(n) {}
        findTestabilityInTree(n, t, i) {
          return null
        }
      }
      let Hu = new nA(),
        mi = null
      const Zm = new K('AllowMultipleToken'),
        Qm = new K('PlatformOnDestroy')
      function Xm(e, n, t = []) {
        const i = `Platform: ${n}`,
          r = new K(i)
        return (o = []) => {
          let s = ju()
          if (!s || s.injector.get(Zm, !1)) {
            const a = [...t, ...o, {provide: r, useValue: !0}]
            e
              ? e(a)
              : (function sA(e) {
                  if (mi && !mi.get(Zm, !1)) throw new J(400, '')
                  mi = e
                  const n = e.get(ev),
                    t = e.get(Km, null)
                  t && t.forEach((i) => i())
                })(
                  (function lA(e = [], n) {
                    return gt.create({
                      name: n,
                      providers: [
                        {provide: Gc, useValue: 'platform'},
                        {provide: Qm, useValue: () => (mi = null)},
                        ...e,
                      ],
                    })
                  })(a, i)
                )
          }
          return (function aA(e) {
            const n = ju()
            if (!n) throw new J(401, '')
            return n
          })()
        }
      }
      function ju() {
        var e
        return null !== (e = null == mi ? void 0 : mi.get(ev)) && void 0 !== e
          ? e
          : null
      }
      let ev = (() => {
        class e {
          constructor(t) {
            ;(this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1)
          }
          bootstrapModuleFactory(t, i) {
            const a = (function cA(e, n) {
                let t
                return (
                  (t =
                    'noop' === e
                      ? new eA()
                      : ('zone.js' === e ? void 0 : e) ||
                        new Ae({
                          enableLongStackTrace: !1,
                          shouldCoalesceEventChangeDetection: !!(null == n
                            ? void 0
                            : n.ngZoneEventCoalescing),
                          shouldCoalesceRunChangeDetection: !!(null == n
                            ? void 0
                            : n.ngZoneRunCoalescing),
                        })),
                  t
                )
              })(i ? i.ngZone : void 0, {
                ngZoneEventCoalescing: (i && i.ngZoneEventCoalescing) || !1,
                ngZoneRunCoalescing: (i && i.ngZoneRunCoalescing) || !1,
              }),
              l = [{provide: Ae, useValue: a}]
            return a.run(() => {
              const c = gt.create({
                  providers: l,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                u = t.create(c),
                d = u.injector.get(ro, null)
              if (!d) throw new J(402, '')
              return (
                a.runOutsideAngular(() => {
                  const f = a.onError.subscribe({
                    next: (p) => {
                      d.handleError(p)
                    },
                  })
                  u.onDestroy(() => {
                    Gu(this._modules, u), f.unsubscribe()
                  })
                }),
                (function uA(e, n, t) {
                  try {
                    const i = t()
                    return qs(i)
                      ? i.catch((r) => {
                          throw (n.runOutsideAngular(() => e.handleError(r)), r)
                        })
                      : i
                  } catch (i) {
                    throw (n.runOutsideAngular(() => e.handleError(i)), i)
                  }
                })(d, a, () => {
                  const f = u.injector.get(Ru)
                  return (
                    f.runInitializers(),
                    f.donePromise.then(
                      () => (
                        (function GE(e) {
                          yt(e, 'Expected localeId to be defined'),
                            'string' == typeof e &&
                              (B_ = e.toLowerCase().replace(/_/g, '-'))
                        })(u.injector.get(Jn, Ys) || Ys),
                        this._moduleDoBootstrap(u),
                        u
                      )
                    )
                  )
                })
              )
            })
          }
          bootstrapModule(t, i = []) {
            const r = tv({}, i)
            return (function rA(e, n, t) {
              const i = new vu(t)
              return Promise.resolve(i)
            })(0, 0, t).then((o) => this.bootstrapModuleFactory(o, r))
          }
          _moduleDoBootstrap(t) {
            const i = t.injector.get(Uu)
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((r) => i.bootstrap(r))
            else {
              if (!t.instance.ngDoBootstrap) throw new J(403, '')
              t.instance.ngDoBootstrap(i)
            }
            this._modules.push(t)
          }
          onDestroy(t) {
            this._destroyListeners.push(t)
          }
          get injector() {
            return this._injector
          }
          destroy() {
            if (this._destroyed) throw new J(404, '')
            this._modules.slice().forEach((i) => i.destroy()),
              this._destroyListeners.forEach((i) => i())
            const t = this._injector.get(Qm, null)
            null == t || t(), (this._destroyed = !0)
          }
          get destroyed() {
            return this._destroyed
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(P(gt))
          }),
          (e.ɵprov = q({token: e, factory: e.ɵfac, providedIn: 'platform'})),
          e
        )
      })()
      function tv(e, n) {
        return Array.isArray(n)
          ? n.reduce(tv, e)
          : Object.assign(Object.assign({}, e), n)
      }
      let Uu = (() => {
        class e {
          constructor(t, i, r, o) {
            ;(this._zone = t),
              (this._injector = i),
              (this._exceptionHandler = r),
              (this._initStatus = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick()
                    })
                  },
                }))
            const s = new be((l) => {
                ;(this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    l.next(this._stable), l.complete()
                  })
              }),
              a = new be((l) => {
                let c
                this._zone.runOutsideAngular(() => {
                  c = this._zone.onStable.subscribe(() => {
                    Ae.assertNotInAngularZone(),
                      Fu(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), l.next(!0))
                      })
                  })
                })
                const u = this._zone.onUnstable.subscribe(() => {
                  Ae.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        l.next(!1)
                      }))
                })
                return () => {
                  c.unsubscribe(), u.unsubscribe()
                }
              })
            this.isStable = (function fD(...e) {
              const n = Fr(e),
                t = (function oD(e, n) {
                  return 'number' == typeof dl(e) ? e.pop() : n
                })(e, 1 / 0),
                i = e
              return i.length
                ? 1 === i.length
                  ? ft(i[0])
                  : kf(t)(ai(i, n))
                : kr
            })(
              s,
              a.pipe(
                (function pD(e = {}) {
                  const {
                    connector: n = () => new We(),
                    resetOnError: t = !0,
                    resetOnComplete: i = !0,
                    resetOnRefCountZero: r = !0,
                  } = e
                  return (o) => {
                    let s = null,
                      a = null,
                      l = null,
                      c = 0,
                      u = !1,
                      d = !1
                    const f = () => {
                        null == a || a.unsubscribe(), (a = null)
                      },
                      p = () => {
                        f(), (s = l = null), (u = d = !1)
                      },
                      h = () => {
                        const g = s
                        p(), null == g || g.unsubscribe()
                      }
                    return dt((g, v) => {
                      c++, !d && !u && f()
                      const y = (l = null != l ? l : n())
                      v.add(() => {
                        c--, 0 === c && !d && !u && (a = fl(h, r))
                      }),
                        y.subscribe(v),
                        s ||
                          ((s = new Xo({
                            next: (_) => y.next(_),
                            error: (_) => {
                              ;(d = !0), f(), (a = fl(p, t, _)), y.error(_)
                            },
                            complete: () => {
                              ;(u = !0), f(), (a = fl(p, i)), y.complete()
                            },
                          })),
                          ai(g).subscribe(s))
                    })(o)
                  }
                })()
              )
            )
          }
          bootstrap(t, i) {
            if (!this._initStatus.done) throw new J(405, '')
            let r
            ;(r =
              t instanceof um
                ? t
                : this._injector.get(vo).resolveComponentFactory(t)),
              this.componentTypes.push(r.componentType)
            const o = (function oA(e) {
                return e.isBoundToModule
              })(r)
                ? void 0
                : this._injector.get(Dr),
              a = r.create(gt.NULL, [], i || r.selector, o),
              l = a.location.nativeElement,
              c = a.injector.get(Bu, null),
              u = c && a.injector.get(tA)
            return (
              c && u && u.registerApplication(l, c),
              a.onDestroy(() => {
                this.detachView(a.hostView),
                  Gu(this.components, a),
                  u && u.unregisterApplication(l)
              }),
              this._loadComponent(a),
              a
            )
          }
          tick() {
            if (this._runningTick) throw new J(101, '')
            try {
              this._runningTick = !0
              for (let t of this._views) t.detectChanges()
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              )
            } finally {
              this._runningTick = !1
            }
          }
          attachView(t) {
            const i = t
            this._views.push(i), i.attachToAppRef(this)
          }
          detachView(t) {
            const i = t
            Gu(this._views, i), i.detachFromAppRef()
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get($M, [])
                .concat(this._bootstrapListeners)
                .forEach((r) => r(t))
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe()
          }
          get viewCount() {
            return this._views.length
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(P(Ae), P(gt), P(ro), P(Ru))
          }),
          (e.ɵprov = q({token: e, factory: e.ɵfac, providedIn: 'root'})),
          e
        )
      })()
      function Gu(e, n) {
        const t = e.indexOf(n)
        t > -1 && e.splice(t, 1)
      }
      let iv = !0,
        xn = (() => {
          class e {}
          return (e.__NG_ELEMENT_ID__ = pA), e
        })()
      function pA(e) {
        return (function hA(e, n, t) {
          if (cs(e) && !t) {
            const i = Dt(e.index, n)
            return new yo(i, i)
          }
          return 47 & e.type ? new yo(n[16], n) : null
        })(Fe(), b(), 16 == (16 & e))
      }
      class lv {
        constructor() {}
        supports(n) {
          return uo(n)
        }
        create(n) {
          return new bA(n)
        }
      }
      const yA = (e, n) => n
      class bA {
        constructor(n) {
          ;(this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = n || yA)
        }
        forEachItem(n) {
          let t
          for (t = this._itHead; null !== t; t = t._next) n(t)
        }
        forEachOperation(n) {
          let t = this._itHead,
            i = this._removalsHead,
            r = 0,
            o = null
          for (; t || i; ) {
            const s = !i || (t && t.currentIndex < uv(i, r, o)) ? t : i,
              a = uv(s, r, o),
              l = s.currentIndex
            if (s === i) r--, (i = i._nextRemoved)
            else if (((t = t._next), null == s.previousIndex)) r++
            else {
              o || (o = [])
              const c = a - r,
                u = l - r
              if (c != u) {
                for (let f = 0; f < c; f++) {
                  const p = f < o.length ? o[f] : (o[f] = 0),
                    h = p + f
                  u <= h && h < c && (o[f] = p + 1)
                }
                o[s.previousIndex] = u - c
              }
            }
            a !== l && n(s, a, l)
          }
        }
        forEachPreviousItem(n) {
          let t
          for (t = this._previousItHead; null !== t; t = t._nextPrevious) n(t)
        }
        forEachAddedItem(n) {
          let t
          for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t)
        }
        forEachMovedItem(n) {
          let t
          for (t = this._movesHead; null !== t; t = t._nextMoved) n(t)
        }
        forEachRemovedItem(n) {
          let t
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t)
        }
        forEachIdentityChange(n) {
          let t
          for (
            t = this._identityChangesHead;
            null !== t;
            t = t._nextIdentityChange
          )
            n(t)
        }
        diff(n) {
          if ((null == n && (n = []), !uo(n))) throw new J(900, '')
          return this.check(n) ? this : null
        }
        onDestroy() {}
        check(n) {
          this._reset()
          let r,
            o,
            s,
            t = this._itHead,
            i = !1
          if (Array.isArray(n)) {
            this.length = n.length
            for (let a = 0; a < this.length; a++)
              (o = n[a]),
                (s = this._trackByFn(a, o)),
                null !== t && Object.is(t.trackById, s)
                  ? (i && (t = this._verifyReinsertion(t, o, s, a)),
                    Object.is(t.item, o) || this._addIdentityChange(t, o))
                  : ((t = this._mismatch(t, o, s, a)), (i = !0)),
                (t = t._next)
          } else
            (r = 0),
              (function ON(e, n) {
                if (Array.isArray(e)) for (let t = 0; t < e.length; t++) n(e[t])
                else {
                  const t = e[or()]()
                  let i
                  for (; !(i = t.next()).done; ) n(i.value)
                }
              })(n, (a) => {
                ;(s = this._trackByFn(r, a)),
                  null !== t && Object.is(t.trackById, s)
                    ? (i && (t = this._verifyReinsertion(t, a, s, r)),
                      Object.is(t.item, a) || this._addIdentityChange(t, a))
                    : ((t = this._mismatch(t, a, s, r)), (i = !0)),
                  (t = t._next),
                  r++
              }),
              (this.length = r)
          return this._truncate(t), (this.collection = n), this.isDirty
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          )
        }
        _reset() {
          if (this.isDirty) {
            let n
            for (
              n = this._previousItHead = this._itHead;
              null !== n;
              n = n._next
            )
              n._nextPrevious = n._next
            for (n = this._additionsHead; null !== n; n = n._nextAdded)
              n.previousIndex = n.currentIndex
            for (
              this._additionsHead = this._additionsTail = null,
                n = this._movesHead;
              null !== n;
              n = n._nextMoved
            )
              n.previousIndex = n.currentIndex
            ;(this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null)
          }
        }
        _mismatch(n, t, i, r) {
          let o
          return (
            null === n ? (o = this._itTail) : ((o = n._prev), this._remove(n)),
            null !==
            (n =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(i, null))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._reinsertAfter(n, o, r))
              : null !==
                (n =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(i, r))
              ? (Object.is(n.item, t) || this._addIdentityChange(n, t),
                this._moveAfter(n, o, r))
              : (n = this._addAfter(new DA(t, i), o, r)),
            n
          )
        }
        _verifyReinsertion(n, t, i, r) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(i, null)
          return (
            null !== o
              ? (n = this._reinsertAfter(o, n._prev, r))
              : n.currentIndex != r &&
                ((n.currentIndex = r), this._addToMoves(n, r)),
            n
          )
        }
        _truncate(n) {
          for (; null !== n; ) {
            const t = n._next
            this._addToRemovals(this._unlink(n)), (n = t)
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null)
        }
        _reinsertAfter(n, t, i) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(n)
          const r = n._prevRemoved,
            o = n._nextRemoved
          return (
            null === r ? (this._removalsHead = o) : (r._nextRemoved = o),
            null === o ? (this._removalsTail = r) : (o._prevRemoved = r),
            this._insertAfter(n, t, i),
            this._addToMoves(n, i),
            n
          )
        }
        _moveAfter(n, t, i) {
          return (
            this._unlink(n),
            this._insertAfter(n, t, i),
            this._addToMoves(n, i),
            n
          )
        }
        _addAfter(n, t, i) {
          return (
            this._insertAfter(n, t, i),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = n)
                : (this._additionsTail._nextAdded = n)),
            n
          )
        }
        _insertAfter(n, t, i) {
          const r = null === t ? this._itHead : t._next
          return (
            (n._next = r),
            (n._prev = t),
            null === r ? (this._itTail = n) : (r._prev = n),
            null === t ? (this._itHead = n) : (t._next = n),
            null === this._linkedRecords && (this._linkedRecords = new cv()),
            this._linkedRecords.put(n),
            (n.currentIndex = i),
            n
          )
        }
        _remove(n) {
          return this._addToRemovals(this._unlink(n))
        }
        _unlink(n) {
          null !== this._linkedRecords && this._linkedRecords.remove(n)
          const t = n._prev,
            i = n._next
          return (
            null === t ? (this._itHead = i) : (t._next = i),
            null === i ? (this._itTail = t) : (i._prev = t),
            n
          )
        }
        _addToMoves(n, t) {
          return (
            n.previousIndex === t ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = n)
                  : (this._movesTail._nextMoved = n)),
            n
          )
        }
        _addToRemovals(n) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new cv()),
            this._unlinkedRecords.put(n),
            (n.currentIndex = null),
            (n._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = n),
                (n._prevRemoved = null))
              : ((n._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = n)),
            n
          )
        }
        _addIdentityChange(n, t) {
          return (
            (n.item = t),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = n)
                : (this._identityChangesTail._nextIdentityChange = n)),
            n
          )
        }
      }
      class DA {
        constructor(n, t) {
          ;(this.item = n),
            (this.trackById = t),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null)
        }
      }
      class CA {
        constructor() {
          ;(this._head = null), (this._tail = null)
        }
        add(n) {
          null === this._head
            ? ((this._head = this._tail = n),
              (n._nextDup = null),
              (n._prevDup = null))
            : ((this._tail._nextDup = n),
              (n._prevDup = this._tail),
              (n._nextDup = null),
              (this._tail = n))
        }
        get(n, t) {
          let i
          for (i = this._head; null !== i; i = i._nextDup)
            if (
              (null === t || t <= i.currentIndex) &&
              Object.is(i.trackById, n)
            )
              return i
          return null
        }
        remove(n) {
          const t = n._prevDup,
            i = n._nextDup
          return (
            null === t ? (this._head = i) : (t._nextDup = i),
            null === i ? (this._tail = t) : (i._prevDup = t),
            null === this._head
          )
        }
      }
      class cv {
        constructor() {
          this.map = new Map()
        }
        put(n) {
          const t = n.trackById
          let i = this.map.get(t)
          i || ((i = new CA()), this.map.set(t, i)), i.add(n)
        }
        get(n, t) {
          const r = this.map.get(n)
          return r ? r.get(n, t) : null
        }
        remove(n) {
          const t = n.trackById
          return this.map.get(t).remove(n) && this.map.delete(t), n
        }
        get isEmpty() {
          return 0 === this.map.size
        }
        clear() {
          this.map.clear()
        }
      }
      function uv(e, n, t) {
        const i = e.previousIndex
        if (null === i) return i
        let r = 0
        return t && i < t.length && (r = t[i]), i + n + r
      }
      class dv {
        constructor() {}
        supports(n) {
          return n instanceof Map || Jc(n)
        }
        create() {
          return new wA()
        }
      }
      class wA {
        constructor() {
          ;(this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null)
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          )
        }
        forEachItem(n) {
          let t
          for (t = this._mapHead; null !== t; t = t._next) n(t)
        }
        forEachPreviousItem(n) {
          let t
          for (t = this._previousMapHead; null !== t; t = t._nextPrevious) n(t)
        }
        forEachChangedItem(n) {
          let t
          for (t = this._changesHead; null !== t; t = t._nextChanged) n(t)
        }
        forEachAddedItem(n) {
          let t
          for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t)
        }
        forEachRemovedItem(n) {
          let t
          for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t)
        }
        diff(n) {
          if (n) {
            if (!(n instanceof Map || Jc(n))) throw new J(900, '')
          } else n = new Map()
          return this.check(n) ? this : null
        }
        onDestroy() {}
        check(n) {
          this._reset()
          let t = this._mapHead
          if (
            ((this._appendAfter = null),
            this._forEach(n, (i, r) => {
              if (t && t.key === r)
                this._maybeAddToChanges(t, i),
                  (this._appendAfter = t),
                  (t = t._next)
              else {
                const o = this._getOrCreateRecordForKey(r, i)
                t = this._insertBeforeOrAppend(t, o)
              }
            }),
            t)
          ) {
            t._prev && (t._prev._next = null), (this._removalsHead = t)
            for (let i = t; null !== i; i = i._nextRemoved)
              i === this._mapHead && (this._mapHead = null),
                this._records.delete(i.key),
                (i._nextRemoved = i._next),
                (i.previousValue = i.currentValue),
                (i.currentValue = null),
                (i._prev = null),
                (i._next = null)
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          )
        }
        _insertBeforeOrAppend(n, t) {
          if (n) {
            const i = n._prev
            return (
              (t._next = n),
              (t._prev = i),
              (n._prev = t),
              i && (i._next = t),
              n === this._mapHead && (this._mapHead = t),
              (this._appendAfter = n),
              n
            )
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = t), (t._prev = this._appendAfter))
              : (this._mapHead = t),
            (this._appendAfter = t),
            null
          )
        }
        _getOrCreateRecordForKey(n, t) {
          if (this._records.has(n)) {
            const r = this._records.get(n)
            this._maybeAddToChanges(r, t)
            const o = r._prev,
              s = r._next
            return (
              o && (o._next = s),
              s && (s._prev = o),
              (r._next = null),
              (r._prev = null),
              r
            )
          }
          const i = new NA(n)
          return (
            this._records.set(n, i),
            (i.currentValue = t),
            this._addToAdditions(i),
            i
          )
        }
        _reset() {
          if (this.isDirty) {
            let n
            for (
              this._previousMapHead = this._mapHead, n = this._previousMapHead;
              null !== n;
              n = n._next
            )
              n._nextPrevious = n._next
            for (n = this._changesHead; null !== n; n = n._nextChanged)
              n.previousValue = n.currentValue
            for (n = this._additionsHead; null != n; n = n._nextAdded)
              n.previousValue = n.currentValue
            ;(this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null)
          }
        }
        _maybeAddToChanges(n, t) {
          Object.is(t, n.currentValue) ||
            ((n.previousValue = n.currentValue),
            (n.currentValue = t),
            this._addToChanges(n))
        }
        _addToAdditions(n) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = n)
            : ((this._additionsTail._nextAdded = n), (this._additionsTail = n))
        }
        _addToChanges(n) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = n)
            : ((this._changesTail._nextChanged = n), (this._changesTail = n))
        }
        _forEach(n, t) {
          n instanceof Map
            ? n.forEach(t)
            : Object.keys(n).forEach((i) => t(n[i], i))
        }
      }
      class NA {
        constructor(n) {
          ;(this.key = n),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null)
        }
      }
      function fv() {
        return new da([new lv()])
      }
      let da = (() => {
        class e {
          constructor(t) {
            this.factories = t
          }
          static create(t, i) {
            if (null != i) {
              const r = i.factories.slice()
              t = t.concat(r)
            }
            return new e(t)
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (i) => e.create(t, i || fv()),
              deps: [[e, new As(), new Ms()]],
            }
          }
          find(t) {
            const i = this.factories.find((r) => r.supports(t))
            if (null != i) return i
            throw new J(901, '')
          }
        }
        return (e.ɵprov = q({token: e, providedIn: 'root', factory: fv})), e
      })()
      function pv() {
        return new No([new dv()])
      }
      let No = (() => {
        class e {
          constructor(t) {
            this.factories = t
          }
          static create(t, i) {
            if (i) {
              const r = i.factories.slice()
              t = t.concat(r)
            }
            return new e(t)
          }
          static extend(t) {
            return {
              provide: e,
              useFactory: (i) => e.create(t, i || pv()),
              deps: [[e, new As(), new Ms()]],
            }
          }
          find(t) {
            const i = this.factories.find((o) => o.supports(t))
            if (i) return i
            throw new J(901, '')
          }
        }
        return (e.ɵprov = q({token: e, providedIn: 'root', factory: pv})), e
      })()
      const MA = Xm(null, 'core', [])
      let AA = (() => {
          class e {
            constructor(t) {}
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(P(Uu))
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({})),
            e
          )
        })(),
        fa = null
      function yi() {
        return fa
      }
      const st = new K('DocumentToken')
      let Nv = (() => {
        class e {
          constructor(t, i, r, o) {
            ;(this._iterableDiffers = t),
              (this._keyValueDiffers = i),
              (this._ngEl = r),
              (this._renderer = o),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._initialClasses = []),
              (this._rawClass = null)
          }
          set klass(t) {
            this._removeClasses(this._initialClasses),
              (this._initialClasses =
                'string' == typeof t ? t.split(/\s+/) : []),
              this._applyClasses(this._initialClasses),
              this._applyClasses(this._rawClass)
          }
          set ngClass(t) {
            this._removeClasses(this._rawClass),
              this._applyClasses(this._initialClasses),
              (this._iterableDiffer = null),
              (this._keyValueDiffer = null),
              (this._rawClass = 'string' == typeof t ? t.split(/\s+/) : t),
              this._rawClass &&
                (uo(this._rawClass)
                  ? (this._iterableDiffer = this._iterableDiffers
                      .find(this._rawClass)
                      .create())
                  : (this._keyValueDiffer = this._keyValueDiffers
                      .find(this._rawClass)
                      .create()))
          }
          ngDoCheck() {
            if (this._iterableDiffer) {
              const t = this._iterableDiffer.diff(this._rawClass)
              t && this._applyIterableChanges(t)
            } else if (this._keyValueDiffer) {
              const t = this._keyValueDiffer.diff(this._rawClass)
              t && this._applyKeyValueChanges(t)
            }
          }
          _applyKeyValueChanges(t) {
            t.forEachAddedItem((i) => this._toggleClass(i.key, i.currentValue)),
              t.forEachChangedItem((i) =>
                this._toggleClass(i.key, i.currentValue)
              ),
              t.forEachRemovedItem((i) => {
                i.previousValue && this._toggleClass(i.key, !1)
              })
          }
          _applyIterableChanges(t) {
            t.forEachAddedItem((i) => {
              if ('string' != typeof i.item)
                throw new Error(
                  `NgClass can only toggle CSS classes expressed as strings, got ${ie(
                    i.item
                  )}`
                )
              this._toggleClass(i.item, !0)
            }),
              t.forEachRemovedItem((i) => this._toggleClass(i.item, !1))
          }
          _applyClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((i) => this._toggleClass(i, !0))
                : Object.keys(t).forEach((i) => this._toggleClass(i, !!t[i])))
          }
          _removeClasses(t) {
            t &&
              (Array.isArray(t) || t instanceof Set
                ? t.forEach((i) => this._toggleClass(i, !1))
                : Object.keys(t).forEach((i) => this._toggleClass(i, !1)))
          }
          _toggleClass(t, i) {
            ;(t = t.trim()) &&
              t.split(/\s+/g).forEach((r) => {
                i
                  ? this._renderer.addClass(this._ngEl.nativeElement, r)
                  : this._renderer.removeClass(this._ngEl.nativeElement, r)
              })
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(m(da), m(No), m(_e), m(vn))
          }),
          (e.ɵdir = w({
            type: e,
            selectors: [['', 'ngClass', '']],
            inputs: {klass: ['class', 'klass'], ngClass: 'ngClass'},
          })),
          e
        )
      })()
      class yO {
        constructor(n, t, i, r) {
          ;(this.$implicit = n),
            (this.ngForOf = t),
            (this.index = i),
            (this.count = r)
        }
        get first() {
          return 0 === this.index
        }
        get last() {
          return this.index === this.count - 1
        }
        get even() {
          return this.index % 2 == 0
        }
        get odd() {
          return !this.even
        }
      }
      let Er = (() => {
        class e {
          constructor(t, i, r) {
            ;(this._viewContainer = t),
              (this._template = i),
              (this._differs = r),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null)
          }
          set ngForOf(t) {
            ;(this._ngForOf = t), (this._ngForOfDirty = !0)
          }
          set ngForTrackBy(t) {
            this._trackByFn = t
          }
          get ngForTrackBy() {
            return this._trackByFn
          }
          set ngForTemplate(t) {
            t && (this._template = t)
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1
              const t = this._ngForOf
              !this._differ &&
                t &&
                (this._differ = this._differs.find(t).create(this.ngForTrackBy))
            }
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf)
              t && this._applyChanges(t)
            }
          }
          _applyChanges(t) {
            const i = this._viewContainer
            t.forEachOperation((r, o, s) => {
              if (null == r.previousIndex)
                i.createEmbeddedView(
                  this._template,
                  new yO(r.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                )
              else if (null == s) i.remove(null === o ? void 0 : o)
              else if (null !== o) {
                const a = i.get(o)
                i.move(a, s), Ev(a, r)
              }
            })
            for (let r = 0, o = i.length; r < o; r++) {
              const a = i.get(r).context
              ;(a.index = r), (a.count = o), (a.ngForOf = this._ngForOf)
            }
            t.forEachIdentityChange((r) => {
              Ev(i.get(r.currentIndex), r)
            })
          }
          static ngTemplateContextGuard(t, i) {
            return !0
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(m(yn), m(Ne), m(da))
          }),
          (e.ɵdir = w({
            type: e,
            selectors: [['', 'ngFor', '', 'ngForOf', '']],
            inputs: {
              ngForOf: 'ngForOf',
              ngForTrackBy: 'ngForTrackBy',
              ngForTemplate: 'ngForTemplate',
            },
          })),
          e
        )
      })()
      function Ev(e, n) {
        e.context.$implicit = n.item
      }
      let Et = (() => {
        class e {}
        return (
          (e.ɵfac = function (t) {
            return new (t || e)()
          }),
          (e.ɵmod = ce({type: e})),
          (e.ɵinj = re({})),
          e
        )
      })()
      class ad extends class QO extends class IA {} {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0)
        }
      } {
        static makeCurrent() {
          !(function SA(e) {
            fa || (fa = e)
          })(new ad())
        }
        onAndCancel(n, t, i) {
          return (
            n.addEventListener(t, i, !1),
            () => {
              n.removeEventListener(t, i, !1)
            }
          )
        }
        dispatchEvent(n, t) {
          n.dispatchEvent(t)
        }
        remove(n) {
          n.parentNode && n.parentNode.removeChild(n)
        }
        createElement(n, t) {
          return (t = t || this.getDefaultDocument()).createElement(n)
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle')
        }
        getDefaultDocument() {
          return document
        }
        isElementNode(n) {
          return n.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(n) {
          return n instanceof DocumentFragment
        }
        getGlobalEventTarget(n, t) {
          return 'window' === t
            ? window
            : 'document' === t
            ? n
            : 'body' === t
            ? n.body
            : null
        }
        getBaseHref(n) {
          const t = (function XO() {
            return (
              (Oo = Oo || document.querySelector('base')),
              Oo ? Oo.getAttribute('href') : null
            )
          })()
          return null == t
            ? null
            : (function eS(e) {
                ;(Ca = Ca || document.createElement('a')),
                  Ca.setAttribute('href', e)
                const n = Ca.pathname
                return '/' === n.charAt(0) ? n : `/${n}`
              })(t)
        }
        resetBaseElement() {
          Oo = null
        }
        getUserAgent() {
          return window.navigator.userAgent
        }
        getCookie(n) {
          return (function mO(e, n) {
            n = encodeURIComponent(n)
            for (const t of e.split(';')) {
              const i = t.indexOf('='),
                [r, o] = -1 == i ? [t, ''] : [t.slice(0, i), t.slice(i + 1)]
              if (r.trim() === n) return decodeURIComponent(o)
            }
            return null
          })(document.cookie, n)
        }
      }
      let Ca,
        Oo = null
      const Iv = new K('TRANSITION_ID'),
        nS = [
          {
            provide: zm,
            useFactory: function tS(e, n, t) {
              return () => {
                t.get(Ru).donePromise.then(() => {
                  const i = yi(),
                    r = n.querySelectorAll(`style[ng-transition="${e}"]`)
                  for (let o = 0; o < r.length; o++) i.remove(r[o])
                })
              }
            },
            deps: [Iv, st, gt],
            multi: !0,
          },
        ]
      class ld {
        static init() {
          !(function iA(e) {
            Hu = e
          })(new ld())
        }
        addToWindow(n) {
          ;(oe.getAngularTestability = (i, r = !0) => {
            const o = n.findTestabilityInTree(i, r)
            if (null == o)
              throw new Error('Could not find testability for element.')
            return o
          }),
            (oe.getAllAngularTestabilities = () => n.getAllTestabilities()),
            (oe.getAllAngularRootElements = () => n.getAllRootElements()),
            oe.frameworkStabilizers || (oe.frameworkStabilizers = []),
            oe.frameworkStabilizers.push((i) => {
              const r = oe.getAllAngularTestabilities()
              let o = r.length,
                s = !1
              const a = function (l) {
                ;(s = s || l), o--, 0 == o && i(s)
              }
              r.forEach(function (l) {
                l.whenStable(a)
              })
            })
        }
        findTestabilityInTree(n, t, i) {
          if (null == t) return null
          const r = n.getTestability(t)
          return null != r
            ? r
            : i
            ? yi().isShadowRoot(t)
              ? this.findTestabilityInTree(n, t.host, !0)
              : this.findTestabilityInTree(n, t.parentElement, !0)
            : null
        }
      }
      let iS = (() => {
        class e {
          build() {
            return new XMLHttpRequest()
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)()
          }),
          (e.ɵprov = q({token: e, factory: e.ɵfac})),
          e
        )
      })()
      const wa = new K('EventManagerPlugins')
      let Na = (() => {
        class e {
          constructor(t, i) {
            ;(this._zone = i),
              (this._eventNameToPlugin = new Map()),
              t.forEach((r) => (r.manager = this)),
              (this._plugins = t.slice().reverse())
          }
          addEventListener(t, i, r) {
            return this._findPluginFor(i).addEventListener(t, i, r)
          }
          addGlobalEventListener(t, i, r) {
            return this._findPluginFor(i).addGlobalEventListener(t, i, r)
          }
          getZone() {
            return this._zone
          }
          _findPluginFor(t) {
            const i = this._eventNameToPlugin.get(t)
            if (i) return i
            const r = this._plugins
            for (let o = 0; o < r.length; o++) {
              const s = r[o]
              if (s.supports(t)) return this._eventNameToPlugin.set(t, s), s
            }
            throw new Error(`No event manager plugin found for event ${t}`)
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(P(wa), P(Ae))
          }),
          (e.ɵprov = q({token: e, factory: e.ɵfac})),
          e
        )
      })()
      class xv {
        constructor(n) {
          this._doc = n
        }
        addGlobalEventListener(n, t, i) {
          const r = yi().getGlobalEventTarget(this._doc, n)
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${t}`)
          return this.addEventListener(r, t, i)
        }
      }
      let Rv = (() => {
          class e {
            constructor() {
              this._stylesSet = new Set()
            }
            addStyles(t) {
              const i = new Set()
              t.forEach((r) => {
                this._stylesSet.has(r) || (this._stylesSet.add(r), i.add(r))
              }),
                this.onStylesAdded(i)
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet)
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵprov = q({token: e, factory: e.ɵfac})),
            e
          )
        })(),
        So = (() => {
          class e extends Rv {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Map()),
                this._hostNodes.set(t.head, [])
            }
            _addStylesToHost(t, i, r) {
              t.forEach((o) => {
                const s = this._doc.createElement('style')
                ;(s.textContent = o), r.push(i.appendChild(s))
              })
            }
            addHost(t) {
              const i = []
              this._addStylesToHost(this._stylesSet, t, i),
                this._hostNodes.set(t, i)
            }
            removeHost(t) {
              const i = this._hostNodes.get(t)
              i && i.forEach(Pv), this._hostNodes.delete(t)
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((i, r) => {
                this._addStylesToHost(t, r, i)
              })
            }
            ngOnDestroy() {
              this._hostNodes.forEach((t) => t.forEach(Pv))
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(P(st))
            }),
            (e.ɵprov = q({token: e, factory: e.ɵfac})),
            e
          )
        })()
      function Pv(e) {
        yi().remove(e)
      }
      const cd = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        ud = /%COMP%/g
      function Ea(e, n, t) {
        for (let i = 0; i < n.length; i++) {
          let r = n[i]
          Array.isArray(r) ? Ea(e, r, t) : ((r = r.replace(ud, e)), t.push(r))
        }
        return t
      }
      function Lv(e) {
        return (n) => {
          if ('__ngUnwrap__' === n) return e
          !1 === e(n) && (n.preventDefault(), (n.returnValue = !1))
        }
      }
      let dd = (() => {
        class e {
          constructor(t, i, r) {
            ;(this.eventManager = t),
              (this.sharedStylesHost = i),
              (this.appId = r),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new fd(t))
          }
          createRenderer(t, i) {
            if (!t || !i) return this.defaultRenderer
            switch (i.encapsulation) {
              case an.Emulated: {
                let r = this.rendererByCompId.get(i.id)
                return (
                  r ||
                    ((r = new cS(
                      this.eventManager,
                      this.sharedStylesHost,
                      i,
                      this.appId
                    )),
                    this.rendererByCompId.set(i.id, r)),
                  r.applyToHost(t),
                  r
                )
              }
              case 1:
              case an.ShadowDom:
                return new uS(this.eventManager, this.sharedStylesHost, t, i)
              default:
                if (!this.rendererByCompId.has(i.id)) {
                  const r = Ea(i.id, i.styles, [])
                  this.sharedStylesHost.addStyles(r),
                    this.rendererByCompId.set(i.id, this.defaultRenderer)
                }
                return this.defaultRenderer
            }
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(P(Na), P(So), P(wo))
          }),
          (e.ɵprov = q({token: e, factory: e.ɵfac})),
          e
        )
      })()
      class fd {
        constructor(n) {
          ;(this.eventManager = n),
            (this.data = Object.create(null)),
            (this.destroyNode = null)
        }
        destroy() {}
        createElement(n, t) {
          return t
            ? document.createElementNS(cd[t] || t, n)
            : document.createElement(n)
        }
        createComment(n) {
          return document.createComment(n)
        }
        createText(n) {
          return document.createTextNode(n)
        }
        appendChild(n, t) {
          n.appendChild(t)
        }
        insertBefore(n, t, i) {
          n && n.insertBefore(t, i)
        }
        removeChild(n, t) {
          n && n.removeChild(t)
        }
        selectRootElement(n, t) {
          let i = 'string' == typeof n ? document.querySelector(n) : n
          if (!i)
            throw new Error(`The selector "${n}" did not match any elements`)
          return t || (i.textContent = ''), i
        }
        parentNode(n) {
          return n.parentNode
        }
        nextSibling(n) {
          return n.nextSibling
        }
        setAttribute(n, t, i, r) {
          if (r) {
            t = r + ':' + t
            const o = cd[r]
            o ? n.setAttributeNS(o, t, i) : n.setAttribute(t, i)
          } else n.setAttribute(t, i)
        }
        removeAttribute(n, t, i) {
          if (i) {
            const r = cd[i]
            r ? n.removeAttributeNS(r, t) : n.removeAttribute(`${i}:${t}`)
          } else n.removeAttribute(t)
        }
        addClass(n, t) {
          n.classList.add(t)
        }
        removeClass(n, t) {
          n.classList.remove(t)
        }
        setStyle(n, t, i, r) {
          r & (wt.DashCase | wt.Important)
            ? n.style.setProperty(t, i, r & wt.Important ? 'important' : '')
            : (n.style[t] = i)
        }
        removeStyle(n, t, i) {
          i & wt.DashCase ? n.style.removeProperty(t) : (n.style[t] = '')
        }
        setProperty(n, t, i) {
          n[t] = i
        }
        setValue(n, t) {
          n.nodeValue = t
        }
        listen(n, t, i) {
          return 'string' == typeof n
            ? this.eventManager.addGlobalEventListener(n, t, Lv(i))
            : this.eventManager.addEventListener(n, t, Lv(i))
        }
      }
      class cS extends fd {
        constructor(n, t, i, r) {
          super(n), (this.component = i)
          const o = Ea(r + '-' + i.id, i.styles, [])
          t.addStyles(o),
            (this.contentAttr = (function sS(e) {
              return '_ngcontent-%COMP%'.replace(ud, e)
            })(r + '-' + i.id)),
            (this.hostAttr = (function aS(e) {
              return '_nghost-%COMP%'.replace(ud, e)
            })(r + '-' + i.id))
        }
        applyToHost(n) {
          super.setAttribute(n, this.hostAttr, '')
        }
        createElement(n, t) {
          const i = super.createElement(n, t)
          return super.setAttribute(i, this.contentAttr, ''), i
        }
      }
      class uS extends fd {
        constructor(n, t, i, r) {
          super(n),
            (this.sharedStylesHost = t),
            (this.hostEl = i),
            (this.shadowRoot = i.attachShadow({mode: 'open'})),
            this.sharedStylesHost.addHost(this.shadowRoot)
          const o = Ea(r.id, r.styles, [])
          for (let s = 0; s < o.length; s++) {
            const a = document.createElement('style')
            ;(a.textContent = o[s]), this.shadowRoot.appendChild(a)
          }
        }
        nodeOrShadowRoot(n) {
          return n === this.hostEl ? this.shadowRoot : n
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot)
        }
        appendChild(n, t) {
          return super.appendChild(this.nodeOrShadowRoot(n), t)
        }
        insertBefore(n, t, i) {
          return super.insertBefore(this.nodeOrShadowRoot(n), t, i)
        }
        removeChild(n, t) {
          return super.removeChild(this.nodeOrShadowRoot(n), t)
        }
        parentNode(n) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(n))
          )
        }
      }
      let dS = (() => {
        class e extends xv {
          constructor(t) {
            super(t)
          }
          supports(t) {
            return !0
          }
          addEventListener(t, i, r) {
            return (
              t.addEventListener(i, r, !1),
              () => this.removeEventListener(t, i, r)
            )
          }
          removeEventListener(t, i, r) {
            return t.removeEventListener(i, r)
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(P(st))
          }),
          (e.ɵprov = q({token: e, factory: e.ɵfac})),
          e
        )
      })()
      const Bv = ['alt', 'control', 'meta', 'shift'],
        pS = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        Hv = {
          A: '1',
          B: '2',
          C: '3',
          D: '4',
          E: '5',
          F: '6',
          G: '7',
          H: '8',
          I: '9',
          J: '*',
          K: '+',
          M: '-',
          N: '.',
          O: '/',
          '`': '0',
          '\x90': 'NumLock',
        },
        hS = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        }
      let gS = (() => {
        class e extends xv {
          constructor(t) {
            super(t)
          }
          supports(t) {
            return null != e.parseEventName(t)
          }
          addEventListener(t, i, r) {
            const o = e.parseEventName(i),
              s = e.eventCallback(o.fullKey, r, this.manager.getZone())
            return this.manager
              .getZone()
              .runOutsideAngular(() => yi().onAndCancel(t, o.domEventName, s))
          }
          static parseEventName(t) {
            const i = t.toLowerCase().split('.'),
              r = i.shift()
            if (0 === i.length || ('keydown' !== r && 'keyup' !== r))
              return null
            const o = e._normalizeKey(i.pop())
            let s = ''
            if (
              (Bv.forEach((l) => {
                const c = i.indexOf(l)
                c > -1 && (i.splice(c, 1), (s += l + '.'))
              }),
              (s += o),
              0 != i.length || 0 === o.length)
            )
              return null
            const a = {}
            return (a.domEventName = r), (a.fullKey = s), a
          }
          static getEventFullKey(t) {
            let i = '',
              r = (function _S(e) {
                let n = e.key
                if (null == n) {
                  if (((n = e.keyIdentifier), null == n)) return 'Unidentified'
                  n.startsWith('U+') &&
                    ((n = String.fromCharCode(parseInt(n.substring(2), 16))),
                    3 === e.location && Hv.hasOwnProperty(n) && (n = Hv[n]))
                }
                return pS[n] || n
              })(t)
            return (
              (r = r.toLowerCase()),
              ' ' === r ? (r = 'space') : '.' === r && (r = 'dot'),
              Bv.forEach((o) => {
                o != r && hS[o](t) && (i += o + '.')
              }),
              (i += r),
              i
            )
          }
          static eventCallback(t, i, r) {
            return (o) => {
              e.getEventFullKey(o) === t && r.runGuarded(() => i(o))
            }
          }
          static _normalizeKey(t) {
            return 'esc' === t ? 'escape' : t
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(P(st))
          }),
          (e.ɵprov = q({token: e, factory: e.ɵfac})),
          e
        )
      })()
      const bS = Xm(MA, 'browser', [
          {provide: ku, useValue: 'browser'},
          {
            provide: Km,
            useValue: function mS() {
              ad.makeCurrent(), ld.init()
            },
            multi: !0,
          },
          {
            provide: st,
            useFactory: function yS() {
              return (
                (function GD(e) {
                  Al = e
                })(document),
                document
              )
            },
            deps: [],
          },
        ]),
        DS = [
          {provide: Gc, useValue: 'root'},
          {
            provide: ro,
            useFactory: function vS() {
              return new ro()
            },
            deps: [],
          },
          {provide: wa, useClass: dS, multi: !0, deps: [st, Ae, ku]},
          {provide: wa, useClass: gS, multi: !0, deps: [st]},
          {provide: dd, useClass: dd, deps: [Na, So, wo]},
          {provide: gu, useExisting: dd},
          {provide: Rv, useExisting: So},
          {provide: So, useClass: So, deps: [st]},
          {provide: Bu, useClass: Bu, deps: [Ae]},
          {provide: Na, useClass: Na, deps: [wa, Ae]},
          {provide: class ZO {}, useClass: iS, deps: []},
        ]
      let CS = (() => {
        class e {
          constructor(t) {
            if (t)
              throw new Error(
                'BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.'
              )
          }
          static withServerTransition(t) {
            return {
              ngModule: e,
              providers: [
                {provide: wo, useValue: t.appId},
                {provide: Iv, useExisting: wo},
                nS,
              ],
            }
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(P(e, 12))
          }),
          (e.ɵmod = ce({type: e})),
          (e.ɵinj = re({providers: DS, imports: [Et, AA]})),
          e
        )
      })()
      'undefined' != typeof window && window
      let RS = (() => {
        class e {
          constructor() {}
          Log(t) {
            console.log(new Date() + ': ' + t)
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)()
          }),
          (e.ɵprov = q({token: e, factory: e.ɵfac, providedIn: 'root'})),
          e
        )
      })()
      const {isArray: PS} = Array,
        {getPrototypeOf: kS, prototype: FS, keys: LS} = Object
      const {isArray: BS} = Array
      function hd(e) {
        return At((n) =>
          (function HS(e, n) {
            return BS(n) ? e(...n) : e(n)
          })(e, n)
        )
      }
      function $v(e, n) {
        return e.reduce((t, i, r) => ((t[i] = n[r]), t), {})
      }
      let Wv = (() => {
          class e {
            constructor(t, i) {
              ;(this._renderer = t),
                (this._elementRef = i),
                (this.onChange = (r) => {}),
                (this.onTouched = () => {})
            }
            setProperty(t, i) {
              this._renderer.setProperty(this._elementRef.nativeElement, t, i)
            }
            registerOnTouched(t) {
              this.onTouched = t
            }
            registerOnChange(t) {
              this.onChange = t
            }
            setDisabledState(t) {
              this.setProperty('disabled', t)
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(m(vn), m(_e))
            }),
            (e.ɵdir = w({type: e})),
            e
          )
        })(),
        bi = (() => {
          class e extends Wv {}
          return (
            (e.ɵfac = (function () {
              let n
              return function (i) {
                return (n || (n = Ze(e)))(i || e)
              }
            })()),
            (e.ɵdir = w({type: e, features: [te]})),
            e
          )
        })()
      const Ht = new K('NgValueAccessor'),
        GS = {provide: Ht, useExisting: X(() => Ta), multi: !0},
        WS = new K('CompositionEventMode')
      let Ta = (() => {
        class e extends Wv {
          constructor(t, i, r) {
            super(t, i),
              (this._compositionMode = r),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function $S() {
                  const e = yi() ? yi().getUserAgent() : ''
                  return /android (\d+)/.test(e.toLowerCase())
                })())
          }
          writeValue(t) {
            this.setProperty('value', null == t ? '' : t)
          }
          _handleInput(t) {
            ;(!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(t)
          }
          _compositionStart() {
            this._composing = !0
          }
          _compositionEnd(t) {
            ;(this._composing = !1), this._compositionMode && this.onChange(t)
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(m(vn), m(_e), m(WS, 8))
          }),
          (e.ɵdir = w({
            type: e,
            selectors: [
              ['input', 'formControlName', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControlName', ''],
              ['input', 'formControl', '', 3, 'type', 'checkbox'],
              ['textarea', 'formControl', ''],
              ['input', 'ngModel', '', 3, 'type', 'checkbox'],
              ['textarea', 'ngModel', ''],
              ['', 'ngDefaultControl', ''],
            ],
            hostBindings: function (t, i) {
              1 & t &&
                Z('input', function (o) {
                  return i._handleInput(o.target.value)
                })('blur', function () {
                  return i.onTouched()
                })('compositionstart', function () {
                  return i._compositionStart()
                })('compositionend', function (o) {
                  return i._compositionEnd(o.target.value)
                })
            },
            features: [ue([GS]), te],
          })),
          e
        )
      })()
      const et = new K('NgValidators'),
        Qn = new K('NgAsyncValidators')
      function Yv(e) {
        return (function Zn(e) {
          return null == e || 0 === e.length
        })(e.value)
          ? {required: !0}
          : null
      }
      function Ma(e) {
        return null
      }
      function ny(e) {
        return null != e
      }
      function iy(e) {
        const n = qs(e) ? ai(e) : e
        return zg(n), n
      }
      function ry(e) {
        let n = {}
        return (
          e.forEach((t) => {
            n = null != t ? Object.assign(Object.assign({}, n), t) : n
          }),
          0 === Object.keys(n).length ? null : n
        )
      }
      function oy(e, n) {
        return n.map((t) => t(e))
      }
      function sy(e) {
        return e.map((n) =>
          (function qS(e) {
            return !e.validate
          })(n)
            ? n
            : (t) => n.validate(t)
        )
      }
      function gd(e) {
        return null != e
          ? (function ay(e) {
              if (!e) return null
              const n = e.filter(ny)
              return 0 == n.length
                ? null
                : function (t) {
                    return ry(oy(t, n))
                  }
            })(sy(e))
          : null
      }
      function ly(e) {
        if (!e) return null
        const n = e.filter(ny)
        return 0 == n.length
          ? null
          : function (t) {
              return (function jS(...e) {
                const n = ns(e),
                  {args: t, keys: i} = (function Gv(e) {
                    if (1 === e.length) {
                      const n = e[0]
                      if (PS(n)) return {args: n, keys: null}
                      if (
                        (function VS(e) {
                          return e && 'object' == typeof e && kS(e) === FS
                        })(n)
                      ) {
                        const t = LS(n)
                        return {args: t.map((i) => n[i]), keys: t}
                      }
                    }
                    return {args: e, keys: null}
                  })(e),
                  r = new be((o) => {
                    const {length: s} = t
                    if (!s) return void o.complete()
                    const a = new Array(s)
                    let l = s,
                      c = s
                    for (let u = 0; u < s; u++) {
                      let d = !1
                      ft(t[u]).subscribe(
                        Ge(
                          o,
                          (f) => {
                            d || ((d = !0), c--), (a[u] = f)
                          },
                          () => l--,
                          void 0,
                          () => {
                            ;(!l || !d) &&
                              (c || o.next(i ? $v(i, a) : a), o.complete())
                          }
                        )
                      )
                    }
                  })
                return n ? r.pipe(hd(n)) : r
              })(oy(t, n).map(iy)).pipe(At(ry))
            }
      }
      function _d(e) {
        return null != e ? ly(sy(e)) : null
      }
      function cy(e, n) {
        return null === e ? [n] : Array.isArray(e) ? [...e, n] : [e, n]
      }
      function md(e) {
        return e ? (Array.isArray(e) ? e : [e]) : []
      }
      function Aa(e, n) {
        return Array.isArray(e) ? e.includes(n) : e === n
      }
      function fy(e, n) {
        const t = md(n)
        return (
          md(e).forEach((r) => {
            Aa(t, r) || t.push(r)
          }),
          t
        )
      }
      function py(e, n) {
        return md(n).filter((t) => !Aa(e, t))
      }
      class hy {
        constructor() {
          ;(this._rawValidators = []),
            (this._rawAsyncValidators = []),
            (this._onDestroyCallbacks = [])
        }
        get value() {
          return this.control ? this.control.value : null
        }
        get valid() {
          return this.control ? this.control.valid : null
        }
        get invalid() {
          return this.control ? this.control.invalid : null
        }
        get pending() {
          return this.control ? this.control.pending : null
        }
        get disabled() {
          return this.control ? this.control.disabled : null
        }
        get enabled() {
          return this.control ? this.control.enabled : null
        }
        get errors() {
          return this.control ? this.control.errors : null
        }
        get pristine() {
          return this.control ? this.control.pristine : null
        }
        get dirty() {
          return this.control ? this.control.dirty : null
        }
        get touched() {
          return this.control ? this.control.touched : null
        }
        get status() {
          return this.control ? this.control.status : null
        }
        get untouched() {
          return this.control ? this.control.untouched : null
        }
        get statusChanges() {
          return this.control ? this.control.statusChanges : null
        }
        get valueChanges() {
          return this.control ? this.control.valueChanges : null
        }
        get path() {
          return null
        }
        _setValidators(n) {
          ;(this._rawValidators = n || []),
            (this._composedValidatorFn = gd(this._rawValidators))
        }
        _setAsyncValidators(n) {
          ;(this._rawAsyncValidators = n || []),
            (this._composedAsyncValidatorFn = _d(this._rawAsyncValidators))
        }
        get validator() {
          return this._composedValidatorFn || null
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn || null
        }
        _registerOnDestroy(n) {
          this._onDestroyCallbacks.push(n)
        }
        _invokeOnDestroyCallbacks() {
          this._onDestroyCallbacks.forEach((n) => n()),
            (this._onDestroyCallbacks = [])
        }
        reset(n) {
          this.control && this.control.reset(n)
        }
        hasError(n, t) {
          return !!this.control && this.control.hasError(n, t)
        }
        getError(n, t) {
          return this.control ? this.control.getError(n, t) : null
        }
      }
      class Xn extends hy {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null)
        }
      }
      class at extends hy {
        get formDirective() {
          return null
        }
        get path() {
          return null
        }
      }
      let _y = (() => {
        class e extends class gy {
          constructor(n) {
            this._cd = n
          }
          is(n) {
            var t, i, r
            return 'submitted' === n
              ? !!(null === (t = this._cd) || void 0 === t
                  ? void 0
                  : t.submitted)
              : !!(null ===
                  (r =
                    null === (i = this._cd) || void 0 === i
                      ? void 0
                      : i.control) || void 0 === r
                  ? void 0
                  : r[n])
          }
        } {
          constructor(t) {
            super(t)
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(m(Xn, 2))
          }),
          (e.ɵdir = w({
            type: e,
            selectors: [
              ['', 'formControlName', ''],
              ['', 'ngModel', ''],
              ['', 'formControl', ''],
            ],
            hostVars: 14,
            hostBindings: function (t, i) {
              2 & t &&
                ve('ng-untouched', i.is('untouched'))(
                  'ng-touched',
                  i.is('touched')
                )('ng-pristine', i.is('pristine'))('ng-dirty', i.is('dirty'))(
                  'ng-valid',
                  i.is('valid')
                )('ng-invalid', i.is('invalid'))('ng-pending', i.is('pending'))
            },
            features: [te],
          })),
          e
        )
      })()
      function Io(e, n) {
        ;(function bd(e, n) {
          const t = (function uy(e) {
            return e._rawValidators
          })(e)
          null !== n.validator
            ? e.setValidators(cy(t, n.validator))
            : 'function' == typeof t && e.setValidators([t])
          const i = (function dy(e) {
            return e._rawAsyncValidators
          })(e)
          null !== n.asyncValidator
            ? e.setAsyncValidators(cy(i, n.asyncValidator))
            : 'function' == typeof i && e.setAsyncValidators([i])
          const r = () => e.updateValueAndValidity()
          xa(n._rawValidators, r), xa(n._rawAsyncValidators, r)
        })(e, n),
          n.valueAccessor.writeValue(e.value),
          (function nI(e, n) {
            n.valueAccessor.registerOnChange((t) => {
              ;(e._pendingValue = t),
                (e._pendingChange = !0),
                (e._pendingDirty = !0),
                'change' === e.updateOn && vy(e, n)
            })
          })(e, n),
          (function rI(e, n) {
            const t = (i, r) => {
              n.valueAccessor.writeValue(i), r && n.viewToModelUpdate(i)
            }
            e.registerOnChange(t),
              n._registerOnDestroy(() => {
                e._unregisterOnChange(t)
              })
          })(e, n),
          (function iI(e, n) {
            n.valueAccessor.registerOnTouched(() => {
              ;(e._pendingTouched = !0),
                'blur' === e.updateOn && e._pendingChange && vy(e, n),
                'submit' !== e.updateOn && e.markAsTouched()
            })
          })(e, n),
          (function tI(e, n) {
            if (n.valueAccessor.setDisabledState) {
              const t = (i) => {
                n.valueAccessor.setDisabledState(i)
              }
              e.registerOnDisabledChange(t),
                n._registerOnDestroy(() => {
                  e._unregisterOnDisabledChange(t)
                })
            }
          })(e, n)
      }
      function xa(e, n) {
        e.forEach((t) => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(n)
        })
      }
      function vy(e, n) {
        e._pendingDirty && e.markAsDirty(),
          e.setValue(e._pendingValue, {emitModelToViewChange: !1}),
          n.viewToModelUpdate(e._pendingValue),
          (e._pendingChange = !1)
      }
      function wd(e, n) {
        const t = e.indexOf(n)
        t > -1 && e.splice(t, 1)
      }
      const xo = 'VALID',
        Pa = 'INVALID',
        Tr = 'PENDING',
        Ro = 'DISABLED'
      function Ed(e) {
        return (ka(e) ? e.validators : e) || null
      }
      function Cy(e) {
        return Array.isArray(e) ? gd(e) : e || null
      }
      function Td(e, n) {
        return (ka(n) ? n.asyncValidators : e) || null
      }
      function wy(e) {
        return Array.isArray(e) ? _d(e) : e || null
      }
      function ka(e) {
        return null != e && !Array.isArray(e) && 'object' == typeof e
      }
      const Md = (e) => e instanceof Od
      function Ey(e) {
        return ((e) => e instanceof Ay)(e) ? e.value : e.getRawValue()
      }
      function Ty(e, n) {
        const t = Md(e),
          i = e.controls
        if (!(t ? Object.keys(i) : i).length) throw new J(1e3, '')
        if (!i[n]) throw new J(1001, '')
      }
      function My(e, n) {
        Md(e),
          e._forEachChild((i, r) => {
            if (void 0 === n[r]) throw new J(1002, '')
          })
      }
      class Ad {
        constructor(n, t) {
          ;(this._pendingDirty = !1),
            (this._hasOwnPendingAsyncValidator = !1),
            (this._pendingTouched = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = n),
            (this._rawAsyncValidators = t),
            (this._composedValidatorFn = Cy(this._rawValidators)),
            (this._composedAsyncValidatorFn = wy(this._rawAsyncValidators))
        }
        get validator() {
          return this._composedValidatorFn
        }
        set validator(n) {
          this._rawValidators = this._composedValidatorFn = n
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn
        }
        set asyncValidator(n) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = n
        }
        get parent() {
          return this._parent
        }
        get valid() {
          return this.status === xo
        }
        get invalid() {
          return this.status === Pa
        }
        get pending() {
          return this.status == Tr
        }
        get disabled() {
          return this.status === Ro
        }
        get enabled() {
          return this.status !== Ro
        }
        get dirty() {
          return !this.pristine
        }
        get untouched() {
          return !this.touched
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : 'change'
        }
        setValidators(n) {
          ;(this._rawValidators = n), (this._composedValidatorFn = Cy(n))
        }
        setAsyncValidators(n) {
          ;(this._rawAsyncValidators = n),
            (this._composedAsyncValidatorFn = wy(n))
        }
        addValidators(n) {
          this.setValidators(fy(n, this._rawValidators))
        }
        addAsyncValidators(n) {
          this.setAsyncValidators(fy(n, this._rawAsyncValidators))
        }
        removeValidators(n) {
          this.setValidators(py(n, this._rawValidators))
        }
        removeAsyncValidators(n) {
          this.setAsyncValidators(py(n, this._rawAsyncValidators))
        }
        hasValidator(n) {
          return Aa(this._rawValidators, n)
        }
        hasAsyncValidator(n) {
          return Aa(this._rawAsyncValidators, n)
        }
        clearValidators() {
          this.validator = null
        }
        clearAsyncValidators() {
          this.asyncValidator = null
        }
        markAsTouched(n = {}) {
          ;(this.touched = !0),
            this._parent && !n.onlySelf && this._parent.markAsTouched(n)
        }
        markAllAsTouched() {
          this.markAsTouched({onlySelf: !0}),
            this._forEachChild((n) => n.markAllAsTouched())
        }
        markAsUntouched(n = {}) {
          ;(this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({onlySelf: !0})
            }),
            this._parent && !n.onlySelf && this._parent._updateTouched(n)
        }
        markAsDirty(n = {}) {
          ;(this.pristine = !1),
            this._parent && !n.onlySelf && this._parent.markAsDirty(n)
        }
        markAsPristine(n = {}) {
          ;(this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({onlySelf: !0})
            }),
            this._parent && !n.onlySelf && this._parent._updatePristine(n)
        }
        markAsPending(n = {}) {
          ;(this.status = Tr),
            !1 !== n.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !n.onlySelf && this._parent.markAsPending(n)
        }
        disable(n = {}) {
          const t = this._parentMarkedDirty(n.onlySelf)
          ;(this.status = Ro),
            (this.errors = null),
            this._forEachChild((i) => {
              i.disable(Object.assign(Object.assign({}, n), {onlySelf: !0}))
            }),
            this._updateValue(),
            !1 !== n.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, n), {skipPristineCheck: t})
            ),
            this._onDisabledChange.forEach((i) => i(!0))
        }
        enable(n = {}) {
          const t = this._parentMarkedDirty(n.onlySelf)
          ;(this.status = xo),
            this._forEachChild((i) => {
              i.enable(Object.assign(Object.assign({}, n), {onlySelf: !0}))
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: n.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, n), {skipPristineCheck: t})
            ),
            this._onDisabledChange.forEach((i) => i(!1))
        }
        _updateAncestors(n) {
          this._parent &&
            !n.onlySelf &&
            (this._parent.updateValueAndValidity(n),
            n.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched())
        }
        setParent(n) {
          this._parent = n
        }
        updateValueAndValidity(n = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status === xo || this.status === Tr) &&
                this._runAsyncValidator(n.emitEvent)),
            !1 !== n.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !n.onlySelf &&
              this._parent.updateValueAndValidity(n)
        }
        _updateTreeValidity(n = {emitEvent: !0}) {
          this._forEachChild((t) => t._updateTreeValidity(n)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: n.emitEvent,
            })
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? Ro : xo
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null
        }
        _runAsyncValidator(n) {
          if (this.asyncValidator) {
            ;(this.status = Tr), (this._hasOwnPendingAsyncValidator = !0)
            const t = iy(this.asyncValidator(this))
            this._asyncValidationSubscription = t.subscribe((i) => {
              ;(this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(i, {emitEvent: n})
            })
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1))
        }
        setErrors(n, t = {}) {
          ;(this.errors = n), this._updateControlsErrors(!1 !== t.emitEvent)
        }
        get(n) {
          return (function lI(e, n, t) {
            if (
              null == n ||
              (Array.isArray(n) || (n = n.split(t)),
              Array.isArray(n) && 0 === n.length)
            )
              return null
            let i = e
            return (
              n.forEach((r) => {
                i = Md(i)
                  ? i.controls.hasOwnProperty(r)
                    ? i.controls[r]
                    : null
                  : (((e) => e instanceof uI)(i) && i.at(r)) || null
              }),
              i
            )
          })(this, n, '.')
        }
        getError(n, t) {
          const i = t ? this.get(t) : this
          return i && i.errors ? i.errors[n] : null
        }
        hasError(n, t) {
          return !!this.getError(n, t)
        }
        get root() {
          let n = this
          for (; n._parent; ) n = n._parent
          return n
        }
        _updateControlsErrors(n) {
          ;(this.status = this._calculateStatus()),
            n && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(n)
        }
        _initObservables() {
          ;(this.valueChanges = new $()), (this.statusChanges = new $())
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? Ro
            : this.errors
            ? Pa
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Tr)
            ? Tr
            : this._anyControlsHaveStatus(Pa)
            ? Pa
            : xo
        }
        _anyControlsHaveStatus(n) {
          return this._anyControls((t) => t.status === n)
        }
        _anyControlsDirty() {
          return this._anyControls((n) => n.dirty)
        }
        _anyControlsTouched() {
          return this._anyControls((n) => n.touched)
        }
        _updatePristine(n = {}) {
          ;(this.pristine = !this._anyControlsDirty()),
            this._parent && !n.onlySelf && this._parent._updatePristine(n)
        }
        _updateTouched(n = {}) {
          ;(this.touched = this._anyControlsTouched()),
            this._parent && !n.onlySelf && this._parent._updateTouched(n)
        }
        _isBoxedValue(n) {
          return (
            'object' == typeof n &&
            null !== n &&
            2 === Object.keys(n).length &&
            'value' in n &&
            'disabled' in n
          )
        }
        _registerOnCollectionChange(n) {
          this._onCollectionChange = n
        }
        _setUpdateStrategy(n) {
          ka(n) && null != n.updateOn && (this._updateOn = n.updateOn)
        }
        _parentMarkedDirty(n) {
          return (
            !n &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          )
        }
      }
      class Ay extends Ad {
        constructor(n = null, t, i) {
          super(Ed(t), Td(i, t)),
            (this.defaultValue = null),
            (this._onChange = []),
            (this._pendingChange = !1),
            this._applyFormState(n),
            this._setUpdateStrategy(t),
            this._initObservables(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            }),
            ka(t) &&
              t.initialValueIsDefault &&
              (this.defaultValue = this._isBoxedValue(n) ? n.value : n)
        }
        setValue(n, t = {}) {
          ;(this.value = this._pendingValue = n),
            this._onChange.length &&
              !1 !== t.emitModelToViewChange &&
              this._onChange.forEach((i) =>
                i(this.value, !1 !== t.emitViewToModelChange)
              ),
            this.updateValueAndValidity(t)
        }
        patchValue(n, t = {}) {
          this.setValue(n, t)
        }
        reset(n = this.defaultValue, t = {}) {
          this._applyFormState(n),
            this.markAsPristine(t),
            this.markAsUntouched(t),
            this.setValue(this.value, t),
            (this._pendingChange = !1)
        }
        _updateValue() {}
        _anyControls(n) {
          return !1
        }
        _allControlsDisabled() {
          return this.disabled
        }
        registerOnChange(n) {
          this._onChange.push(n)
        }
        _unregisterOnChange(n) {
          wd(this._onChange, n)
        }
        registerOnDisabledChange(n) {
          this._onDisabledChange.push(n)
        }
        _unregisterOnDisabledChange(n) {
          wd(this._onDisabledChange, n)
        }
        _forEachChild(n) {}
        _syncPendingControls() {
          return !(
            'submit' !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          )
        }
        _applyFormState(n) {
          this._isBoxedValue(n)
            ? ((this.value = this._pendingValue = n.value),
              n.disabled
                ? this.disable({onlySelf: !0, emitEvent: !1})
                : this.enable({onlySelf: !0, emitEvent: !1}))
            : (this.value = this._pendingValue = n)
        }
      }
      class Od extends Ad {
        constructor(n, t, i) {
          super(Ed(t), Td(i, t)),
            (this.controls = n),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            })
        }
        registerControl(n, t) {
          return this.controls[n]
            ? this.controls[n]
            : ((this.controls[n] = t),
              t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange),
              t)
        }
        addControl(n, t, i = {}) {
          this.registerControl(n, t),
            this.updateValueAndValidity({emitEvent: i.emitEvent}),
            this._onCollectionChange()
        }
        removeControl(n, t = {}) {
          this.controls[n] &&
            this.controls[n]._registerOnCollectionChange(() => {}),
            delete this.controls[n],
            this.updateValueAndValidity({emitEvent: t.emitEvent}),
            this._onCollectionChange()
        }
        setControl(n, t, i = {}) {
          this.controls[n] &&
            this.controls[n]._registerOnCollectionChange(() => {}),
            delete this.controls[n],
            t && this.registerControl(n, t),
            this.updateValueAndValidity({emitEvent: i.emitEvent}),
            this._onCollectionChange()
        }
        contains(n) {
          return this.controls.hasOwnProperty(n) && this.controls[n].enabled
        }
        setValue(n, t = {}) {
          My(this, n),
            Object.keys(n).forEach((i) => {
              Ty(this, i),
                this.controls[i].setValue(n[i], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                })
            }),
            this.updateValueAndValidity(t)
        }
        patchValue(n, t = {}) {
          null != n &&
            (Object.keys(n).forEach((i) => {
              this.controls[i] &&
                this.controls[i].patchValue(n[i], {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                })
            }),
            this.updateValueAndValidity(t))
        }
        reset(n = {}, t = {}) {
          this._forEachChild((i, r) => {
            i.reset(n[r], {onlySelf: !0, emitEvent: t.emitEvent})
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t)
        }
        getRawValue() {
          return this._reduceChildren({}, (n, t, i) => ((n[i] = Ey(t)), n))
        }
        _syncPendingControls() {
          let n = this._reduceChildren(
            !1,
            (t, i) => !!i._syncPendingControls() || t
          )
          return n && this.updateValueAndValidity({onlySelf: !0}), n
        }
        _forEachChild(n) {
          Object.keys(this.controls).forEach((t) => {
            const i = this.controls[t]
            i && n(i, t)
          })
        }
        _setUpControls() {
          this._forEachChild((n) => {
            n.setParent(this),
              n._registerOnCollectionChange(this._onCollectionChange)
          })
        }
        _updateValue() {
          this.value = this._reduceValue()
        }
        _anyControls(n) {
          for (const t of Object.keys(this.controls)) {
            const i = this.controls[t]
            if (this.contains(t) && n(i)) return !0
          }
          return !1
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (n, t, i) => ((t.enabled || this.disabled) && (n[i] = t.value), n)
          )
        }
        _reduceChildren(n, t) {
          let i = n
          return (
            this._forEachChild((r, o) => {
              i = t(i, r, o)
            }),
            i
          )
        }
        _allControlsDisabled() {
          for (const n of Object.keys(this.controls))
            if (this.controls[n].enabled) return !1
          return Object.keys(this.controls).length > 0 || this.disabled
        }
      }
      class uI extends Ad {
        constructor(n, t, i) {
          super(Ed(t), Td(i, t)),
            (this.controls = n),
            this._initObservables(),
            this._setUpdateStrategy(t),
            this._setUpControls(),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: !!this.asyncValidator,
            })
        }
        at(n) {
          return this.controls[n]
        }
        push(n, t = {}) {
          this.controls.push(n),
            this._registerControl(n),
            this.updateValueAndValidity({emitEvent: t.emitEvent}),
            this._onCollectionChange()
        }
        insert(n, t, i = {}) {
          this.controls.splice(n, 0, t),
            this._registerControl(t),
            this.updateValueAndValidity({emitEvent: i.emitEvent})
        }
        removeAt(n, t = {}) {
          this.controls[n] &&
            this.controls[n]._registerOnCollectionChange(() => {}),
            this.controls.splice(n, 1),
            this.updateValueAndValidity({emitEvent: t.emitEvent})
        }
        setControl(n, t, i = {}) {
          this.controls[n] &&
            this.controls[n]._registerOnCollectionChange(() => {}),
            this.controls.splice(n, 1),
            t && (this.controls.splice(n, 0, t), this._registerControl(t)),
            this.updateValueAndValidity({emitEvent: i.emitEvent}),
            this._onCollectionChange()
        }
        get length() {
          return this.controls.length
        }
        setValue(n, t = {}) {
          My(this, n),
            n.forEach((i, r) => {
              Ty(this, r),
                this.at(r).setValue(i, {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                })
            }),
            this.updateValueAndValidity(t)
        }
        patchValue(n, t = {}) {
          null != n &&
            (n.forEach((i, r) => {
              this.at(r) &&
                this.at(r).patchValue(i, {
                  onlySelf: !0,
                  emitEvent: t.emitEvent,
                })
            }),
            this.updateValueAndValidity(t))
        }
        reset(n = [], t = {}) {
          this._forEachChild((i, r) => {
            i.reset(n[r], {onlySelf: !0, emitEvent: t.emitEvent})
          }),
            this._updatePristine(t),
            this._updateTouched(t),
            this.updateValueAndValidity(t)
        }
        getRawValue() {
          return this.controls.map((n) => Ey(n))
        }
        clear(n = {}) {
          this.controls.length < 1 ||
            (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity({emitEvent: n.emitEvent}))
        }
        _syncPendingControls() {
          let n = this.controls.reduce(
            (t, i) => !!i._syncPendingControls() || t,
            !1
          )
          return n && this.updateValueAndValidity({onlySelf: !0}), n
        }
        _forEachChild(n) {
          this.controls.forEach((t, i) => {
            n(t, i)
          })
        }
        _updateValue() {
          this.value = this.controls
            .filter((n) => n.enabled || this.disabled)
            .map((n) => n.value)
        }
        _anyControls(n) {
          return this.controls.some((t) => t.enabled && n(t))
        }
        _setUpControls() {
          this._forEachChild((n) => this._registerControl(n))
        }
        _allControlsDisabled() {
          for (const n of this.controls) if (n.enabled) return !1
          return this.controls.length > 0 || this.disabled
        }
        _registerControl(n) {
          n.setParent(this),
            n._registerOnCollectionChange(this._onCollectionChange)
        }
      }
      const pI = {provide: Xn, useExisting: X(() => Id)},
        Iy = (() => Promise.resolve(null))()
      let Id = (() => {
          class e extends Xn {
            constructor(t, i, r, o, s) {
              super(),
                (this._changeDetectorRef = s),
                (this.control = new Ay()),
                (this._registered = !1),
                (this.update = new $()),
                (this._parent = t),
                this._setValidators(i),
                this._setAsyncValidators(r),
                (this.valueAccessor = (function Cd(e, n) {
                  if (!n) return null
                  let t, i, r
                  return (
                    Array.isArray(n),
                    n.forEach((o) => {
                      o.constructor === Ta
                        ? (t = o)
                        : (function aI(e) {
                            return Object.getPrototypeOf(e.constructor) === bi
                          })(o)
                        ? (i = o)
                        : (r = o)
                    }),
                    r || i || t || null
                  )
                })(0, o))
            }
            ngOnChanges(t) {
              if ((this._checkForErrors(), !this._registered || 'name' in t)) {
                if (
                  this._registered &&
                  (this._checkName(), this.formDirective)
                ) {
                  const i = t.name.previousValue
                  this.formDirective.removeControl({
                    name: i,
                    path: this._getPath(i),
                  })
                }
                this._setUpControl()
              }
              'isDisabled' in t && this._updateDisabled(t),
                (function Dd(e, n) {
                  if (!e.hasOwnProperty('model')) return !1
                  const t = e.model
                  return !!t.isFirstChange() || !Object.is(n, t.currentValue)
                })(t, this.viewModel) &&
                  (this._updateValue(this.model), (this.viewModel = this.model))
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this)
            }
            get path() {
              return this._getPath(this.name)
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null
            }
            viewToModelUpdate(t) {
              ;(this.viewModel = t), this.update.emit(t)
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0)
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn)
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              )
            }
            _setUpStandalone() {
              Io(this.control, this),
                this.control.updateValueAndValidity({emitEvent: !1})
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(), this._checkName()
            }
            _checkParentType() {}
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone()
            }
            _updateValue(t) {
              Iy.then(() => {
                var i
                this.control.setValue(t, {emitViewToModelChange: !1}),
                  null === (i = this._changeDetectorRef) ||
                    void 0 === i ||
                    i.markForCheck()
              })
            }
            _updateDisabled(t) {
              const i = t.isDisabled.currentValue,
                r = '' === i || (i && 'false' !== i)
              Iy.then(() => {
                var o
                r && !this.control.disabled
                  ? this.control.disable()
                  : !r && this.control.disabled && this.control.enable(),
                  null === (o = this._changeDetectorRef) ||
                    void 0 === o ||
                    o.markForCheck()
              })
            }
            _getPath(t) {
              return this._parent
                ? (function Sa(e, n) {
                    return [...n.path, e]
                  })(t, this._parent)
                : [t]
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(
                m(at, 9),
                m(et, 10),
                m(Qn, 10),
                m(Ht, 10),
                m(xn, 8)
              )
            }),
            (e.ɵdir = w({
              type: e,
              selectors: [
                [
                  '',
                  'ngModel',
                  '',
                  3,
                  'formControlName',
                  '',
                  3,
                  'formControl',
                  '',
                ],
              ],
              inputs: {
                name: 'name',
                isDisabled: ['disabled', 'isDisabled'],
                model: ['ngModel', 'model'],
                options: ['ngModelOptions', 'options'],
              },
              outputs: {update: 'ngModelChange'},
              exportAs: ['ngModel'],
              features: [ue([pI]), te, It],
            })),
            e
          )
        })(),
        Ry = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({})),
            e
          )
        })()
      let Di = (() => {
        class e {
          constructor() {
            this._validator = Ma
          }
          ngOnChanges(t) {
            if (this.inputName in t) {
              const i = this.normalizeInput(t[this.inputName].currentValue)
              ;(this._enabled = this.enabled(i)),
                (this._validator = this._enabled
                  ? this.createValidator(i)
                  : Ma),
                this._onChange && this._onChange()
            }
          }
          validate(t) {
            return this._validator(t)
          }
          registerOnValidatorChange(t) {
            this._onChange = t
          }
          enabled(t) {
            return null != t
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)()
          }),
          (e.ɵdir = w({type: e, features: [It]})),
          e
        )
      })()
      const RI = {provide: et, useExisting: X(() => Fa), multi: !0}
      let Fa = (() => {
        class e extends Di {
          constructor() {
            super(...arguments),
              (this.inputName = 'required'),
              (this.normalizeInput = (t) =>
                (function SI(e) {
                  return null != e && !1 !== e && 'false' != `${e}`
                })(t)),
              (this.createValidator = (t) => Yv)
          }
          enabled(t) {
            return t
          }
        }
        return (
          (e.ɵfac = (function () {
            let n
            return function (i) {
              return (n || (n = Ze(e)))(i || e)
            }
          })()),
          (e.ɵdir = w({
            type: e,
            selectors: [
              [
                '',
                'required',
                '',
                'formControlName',
                '',
                3,
                'type',
                'checkbox',
              ],
              ['', 'required', '', 'formControl', '', 3, 'type', 'checkbox'],
              ['', 'required', '', 'ngModel', '', 3, 'type', 'checkbox'],
            ],
            hostVars: 1,
            hostBindings: function (t, i) {
              2 & t && fe('required', i._enabled ? '' : null)
            },
            inputs: {required: 'required'},
            features: [ue([RI]), te],
          })),
          e
        )
      })()
      const LI = {provide: et, useExisting: X(() => Ld), multi: !0}
      let Ld = (() => {
          class e extends Di {
            constructor() {
              super(...arguments),
                (this.inputName = 'maxlength'),
                (this.normalizeInput = (t) =>
                  (function Uy(e) {
                    return 'number' == typeof e ? e : parseInt(e, 10)
                  })(t)),
                (this.createValidator = (t) =>
                  (function ey(e) {
                    return (n) =>
                      (function qv(e) {
                        return null != e && 'number' == typeof e.length
                      })(n.value) && n.value.length > e
                        ? {
                            maxlength: {
                              requiredLength: e,
                              actualLength: n.value.length,
                            },
                          }
                        : null
                  })(t))
            }
          }
          return (
            (e.ɵfac = (function () {
              let n
              return function (i) {
                return (n || (n = Ze(e)))(i || e)
              }
            })()),
            (e.ɵdir = w({
              type: e,
              selectors: [
                ['', 'maxlength', '', 'formControlName', ''],
                ['', 'maxlength', '', 'formControl', ''],
                ['', 'maxlength', '', 'ngModel', ''],
              ],
              hostVars: 1,
              hostBindings: function (t, i) {
                2 & t && fe('maxlength', i._enabled ? i.maxlength : null)
              },
              inputs: {maxlength: 'maxlength'},
              features: [ue([LI]), te],
            })),
            e
          )
        })(),
        BI = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Ry]]})),
            e
          )
        })(),
        Yy = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [BI]})),
            e
          )
        })()
      const HI = function (e, n) {
        return {'bg-warning': e, 'bg-success': n}
      }
      let jI = (() => {
        class e {
          constructor() {
            ;(this.todo_data = {todo_key: '', todo_status: !1}),
              (this.calling_index = 0),
              (this.todoIndex = new $()),
              (this.todoIndexDelete = new $())
          }
          ngOnInit() {}
          getIndexForStatusChange() {
            this.todoIndex.emit(this.calling_index)
          }
          getIndexForDeletion() {
            this.todoIndexDelete.emit(this.calling_index)
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)()
          }),
          (e.ɵcmp = ln({
            type: e,
            selectors: [['app-todo']],
            inputs: {todo_data: 'todo_data', calling_index: 'calling_index'},
            outputs: {
              todoIndex: 'todoIndex',
              todoIndexDelete: 'todoIndexDelete',
            },
            decls: 6,
            vars: 5,
            consts: [
              [
                1,
                'row',
                'mx-1',
                'my-1',
                'border',
                'border-dark',
                'mx-0',
                3,
                'ngClass',
              ],
              [
                1,
                'col-8',
                'text-center',
                'justify-content-center',
                'align-self-center',
                'px-0',
                'cursor-pointer',
                'cursor-pointer',
                3,
                'click',
              ],
              [1, 'col-4', 'my-2', 'mx-0', 'px-0'],
              [
                'type',
                'button',
                1,
                'btn',
                'btn-danger',
                'px-1',
                'py-1',
                'pull-left',
                3,
                'click',
              ],
            ],
            template: function (t, i) {
              1 & t &&
                (B(0, 'div', 0)(1, 'div', 1),
                Z('click', function () {
                  return i.getIndexForStatusChange()
                }),
                Lt(2),
                H(),
                B(3, 'div', 2)(4, 'button', 3),
                Z('click', function () {
                  return i.getIndexForDeletion()
                }),
                Lt(5, 'Delete'),
                H()()()),
                2 & t &&
                  (G(
                    'ngClass',
                    wr(2, HI, !i.todo_data.todo_status, i.todo_data.todo_status)
                  ),
                  V(2),
                  au(i.todo_data.todo_key))
            },
            directives: [Nv],
            styles: [''],
          })),
          e
        )
      })()
      const UI = ['entry']
      function GI(e, n) {
        if (1 & e) {
          const t = (function Yt() {
            return b()
          })()
          B(0, 'div', 10)(1, 'app-todo', 11),
            Z('todoIndex', function (r) {
              return Pt(t), ne().changeToDoStatus(r)
            })('todoIndexDelete', function (r) {
              return Pt(t), ne().deleteToDo(r)
            }),
            H()()
        }
        if (2 & e) {
          const t = n.$implicit,
            i = n.index
          V(1), G('todo_data', t)('calling_index', i)
        }
      }
      let $I = (() => {
        class e {
          constructor(t) {
            ;(this.logger = t),
              (this.inputTextModel = ''),
              (this.title = 'todo_list'),
              (this.add_todo_str = ''),
              (this.todo_test = [])
          }
          logging(t) {
            this.logger.Log(t)
          }
          ngOnInit() {
            const t = localStorage.getItem('todoApp_todos')
            '' !== t && null != t && (this.todo_test = JSON.parse(t))
          }
          storeToDos() {
            localStorage.setItem(
              'todoApp_todos',
              JSON.stringify(this.todo_test)
            ),
              this.logging('Stored ToDos')
          }
          changeToDoStatus(t) {
            ;(this.todo_test[t].todo_status = !this.todo_test[t].todo_status),
              this.storeToDos(),
              this.logging(
                'Changed status of ' +
                  this.todo_test[t].todo_key +
                  ' to ' +
                  this.todo_test[t].todo_status
              )
          }
          deleteToDo(t) {
            this.logging('Deleteing todo ' + this.todo_test[t].todo_key),
              this.todo_test.splice(t, 1),
              this.storeToDos()
          }
          setToDo(t) {
            this.add_todo_str = t.target.value
          }
          appendToTodo(t) {
            '' !== t &&
              (this.todo_test.push({todo_key: t, todo_status: !1}),
              this.storeToDos(),
              this.logging('Added todo ' + t))
          }
          getNumOpenTodos() {
            return this.todo_test.filter((i) => !i.todo_status).length
          }
          resetAll() {
            this.todo_test.splice(0, this.todo_test.length), this.storeToDos()
          }
          clearEntry() {
            this.inputEntry.nativeElement.value = ''
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(m(RS))
          }),
          (e.ɵcmp = ln({
            type: e,
            selectors: [['app-root']],
            viewQuery: function (t, i) {
              if ((1 & t && oa(UI, 5), 2 & t)) {
                let r
                Ee((r = Te())) && (i.inputEntry = r.first)
              }
            },
            decls: 17,
            vars: 3,
            consts: [
              [1, 'px-2'],
              [1, 'text-center', 'text-dark', 'py-3'],
              [
                'align',
                'center',
                1,
                'container',
                'listcolor',
                'px-0',
                'border',
                'border-dark',
                'border-3',
                'rounded-2',
              ],
              [1, 'border', 'border-dark'],
              [1, 'py-2'],
              [
                'type',
                'text',
                'required',
                '',
                'maxlength',
                '19',
                1,
                'w-50',
                'mx-2',
                'form-control',
                3,
                'ngModel',
                'keyup',
                'keyup.enter',
                'ngModelChange',
              ],
              ['entry', ''],
              [1, 'btn', 'btn-dark', 'px-1', 'py-1', 3, 'click'],
              [1, 'btn', 'btn-danger', 'px-1', 'py-1', 'mx-2', 3, 'click'],
              ['class', 'container px-0', 4, 'ngFor', 'ngForOf'],
              [1, 'container', 'px-0'],
              [3, 'todo_data', 'calling_index', 'todoIndex', 'todoIndexDelete'],
            ],
            template: function (t, i) {
              1 & t &&
                (B(0, 'div', 0)(1, 'h1', 1),
                Lt(2, 'ToDo List'),
                H(),
                B(3, 'div', 2)(4, 'div', 3)(5, 'h2', 4),
                Lt(6, 'Our ToDos'),
                H(),
                B(7, 'p'),
                Lt(8),
                H(),
                B(9, 'div', 4)(10, 'input', 5, 6),
                Z('keyup', function (o) {
                  return i.setToDo(o)
                })('keyup.enter', function () {
                  return i.appendToTodo(i.add_todo_str)
                })('keyup.enter', function () {
                  return i.clearEntry()
                })('ngModelChange', function (o) {
                  return (i.inputTextModel = o)
                }),
                H(),
                B(12, 'button', 7),
                Z('click', function () {
                  return i.appendToTodo(i.add_todo_str)
                })('click', function () {
                  return i.clearEntry()
                }),
                Lt(13, 'Add'),
                H(),
                B(14, 'button', 8),
                Z('click', function () {
                  return i.resetAll()
                }),
                Lt(15, 'Reset all'),
                H()()(),
                (function U(e, n, t, i, r, o, s, a) {
                  const l = b(),
                    c = Y(),
                    u = e + 20,
                    d = c.firstCreatePass
                      ? (function SN(e, n, t, i, r, o, s, a, l) {
                          const c = n.consts,
                            u = er(n, e, 4, s || null, jn(c, a))
                          kc(n, t, u, jn(c, l)), gs(n, u)
                          const d = (u.tViews = Hs(
                            2,
                            u,
                            i,
                            r,
                            o,
                            n.directiveRegistry,
                            n.pipeRegistry,
                            null,
                            n.schemas,
                            c
                          ))
                          return (
                            null !== n.queries &&
                              (n.queries.template(n, u),
                              (d.queries = n.queries.embeddedTView(u))),
                            u
                          )
                        })(u, c, l, n, t, i, r, o, s)
                      : c.data[u]
                  un(d, !1)
                  const f = l[F].createComment('')
                  ks(c, l, f, d),
                    Qe(f, l),
                    js(l, (l[u] = eg(f, l, f, d))),
                    us(d) && Rc(c, l, d),
                    null != s && Pc(l, d, a)
                })(16, GI, 2, 2, 'div', 9),
                H()()),
                2 & t &&
                  (V(8),
                  mr('Open ToDos: ', i.getNumOpenTodos(), ''),
                  V(2),
                  G('ngModel', i.inputTextModel),
                  V(6),
                  G('ngForOf', i.todo_test))
            },
            directives: [Ta, Fa, Ld, _y, Id, Er, jI],
            styles: [''],
          })),
          e
        )
      })()
      function Vd(...e) {
        return ai(e, Fr(e))
      }
      const WI = ['addListener', 'removeListener'],
        zI = ['addEventListener', 'removeEventListener'],
        qI = ['on', 'off']
      function lt(e, n, t, i) {
        if ((ee(t) && ((i = t), (t = void 0)), i))
          return lt(e, n, t).pipe(hd(i))
        const [r, o] = (function YI(e) {
          return ee(e.addEventListener) && ee(e.removeEventListener)
        })(e)
          ? zI.map((s) => (a) => e[s](n, a, t))
          : (function KI(e) {
              return ee(e.addListener) && ee(e.removeListener)
            })(e)
          ? WI.map(Zy(e, n))
          : (function JI(e) {
              return ee(e.on) && ee(e.off)
            })(e)
          ? qI.map(Zy(e, n))
          : []
        if (!r && ul(e)) return ts((s) => lt(s, n, t))(ft(e))
        if (!r) throw new TypeError('Invalid event target')
        return new be((s) => {
          const a = (...l) => s.next(1 < l.length ? l : l[0])
          return r(a), () => o(a)
        })
      }
      function Zy(e, n) {
        return (t) => (i) => e[t](n, i)
      }
      class ZI extends Ut {
        constructor(n, t) {
          super()
        }
        schedule(n, t = 0) {
          return this
        }
      }
      const La = {
          setInterval(e, n, ...t) {
            const {delegate: i} = La
            return (null == i ? void 0 : i.setInterval)
              ? i.setInterval(e, n, ...t)
              : setInterval(e, n, ...t)
          },
          clearInterval(e) {
            const {delegate: n} = La
            return ((null == n ? void 0 : n.clearInterval) || clearInterval)(e)
          },
          delegate: void 0,
        },
        Qy = {now: () => (Qy.delegate || Date).now(), delegate: void 0}
      class ko {
        constructor(n, t = ko.now) {
          ;(this.schedulerActionCtor = n), (this.now = t)
        }
        schedule(n, t = 0, i) {
          return new this.schedulerActionCtor(this, n).schedule(i, t)
        }
      }
      ko.now = Qy.now
      const ex = new (class XI extends ko {
        constructor(n, t = ko.now) {
          super(n, t),
            (this.actions = []),
            (this._active = !1),
            (this._scheduled = void 0)
        }
        flush(n) {
          const {actions: t} = this
          if (this._active) return void t.push(n)
          let i
          this._active = !0
          do {
            if ((i = n.execute(n.state, n.delay))) break
          } while ((n = t.shift()))
          if (((this._active = !1), i)) {
            for (; (n = t.shift()); ) n.unsubscribe()
            throw i
          }
        }
      })(
        class QI extends ZI {
          constructor(n, t) {
            super(n, t),
              (this.scheduler = n),
              (this.work = t),
              (this.pending = !1)
          }
          schedule(n, t = 0) {
            if (this.closed) return this
            this.state = n
            const i = this.id,
              r = this.scheduler
            return (
              null != i && (this.id = this.recycleAsyncId(r, i, t)),
              (this.pending = !0),
              (this.delay = t),
              (this.id = this.id || this.requestAsyncId(r, this.id, t)),
              this
            )
          }
          requestAsyncId(n, t, i = 0) {
            return La.setInterval(n.flush.bind(n, this), i)
          }
          recycleAsyncId(n, t, i = 0) {
            if (null != i && this.delay === i && !1 === this.pending) return t
            La.clearInterval(t)
          }
          execute(n, t) {
            if (this.closed) return new Error('executing a cancelled action')
            this.pending = !1
            const i = this._execute(n, t)
            if (i) return i
            !1 === this.pending &&
              null != this.id &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
          }
          _execute(n, t) {
            let r,
              i = !1
            try {
              this.work(n)
            } catch (o) {
              ;(i = !0),
                (r = o || new Error('Scheduled action threw falsy error'))
            }
            if (i) return this.unsubscribe(), r
          }
          unsubscribe() {
            if (!this.closed) {
              const {id: n, scheduler: t} = this,
                {actions: i} = t
              ;(this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                Ri(i, this),
                null != n && (this.id = this.recycleAsyncId(t, n, null)),
                (this.delay = null),
                super.unsubscribe()
            }
          }
        }
      )
      const {isArray: nx} = Array
      function e0(e) {
        return 1 === e.length && nx(e[0]) ? e[0] : e
      }
      function Va(...e) {
        const n = ns(e),
          t = e0(e)
        return t.length
          ? new be((i) => {
              let r = t.map(() => []),
                o = t.map(() => !1)
              i.add(() => {
                r = o = null
              })
              for (let s = 0; !i.closed && s < t.length; s++)
                ft(t[s]).subscribe(
                  Ge(
                    i,
                    (a) => {
                      if ((r[s].push(a), r.every((l) => l.length))) {
                        const l = r.map((c) => c.shift())
                        i.next(n ? n(...l) : l),
                          r.some((c, u) => !c.length && o[u]) && i.complete()
                      }
                    },
                    () => {
                      ;(o[s] = !0), !r[s].length && i.complete()
                    }
                  )
                )
              return () => {
                r = o = null
              }
            })
          : kr
      }
      function je(e) {
        return dt((n, t) => {
          ft(e).subscribe(Ge(t, () => t.complete(), Pi)),
            !t.closed && n.subscribe(t)
        })
      }
      function wi(e, n) {
        return dt((t, i) => {
          let r = 0
          t.subscribe(Ge(i, (o) => e.call(n, o, r++) && i.next(o)))
        })
      }
      function Ud(...e) {
        const n = ns(e)
        return dt((t, i) => {
          const r = e.length,
            o = new Array(r)
          let s = e.map(() => !1),
            a = !1
          for (let l = 0; l < r; l++)
            ft(e[l]).subscribe(
              Ge(
                i,
                (c) => {
                  ;(o[l] = c),
                    !a &&
                      !s[l] &&
                      ((s[l] = !0), (a = s.every(oi)) && (s = null))
                },
                Pi
              )
            )
          t.subscribe(
            Ge(i, (l) => {
              if (a) {
                const c = [l, ...o]
                i.next(n ? n(...c) : c)
              }
            })
          )
        })
      }
      new be(Pi), Math, Math, Math
      const CR = ['*'],
        HR = ['dialog']
      function Xd(e) {
        return 'string' == typeof e
      }
      function Ei(e) {
        return null != e
      }
      function xr(e) {
        return (e || document.body).getBoundingClientRect()
      }
      const E0 = {animation: !0, transitionTimerDelayMs: 5},
        PP = () => {},
        {transitionTimerDelayMs: kP} = E0,
        Uo = new Map(),
        ct = (e, n, t, i) => {
          let r = i.context || {}
          const o = Uo.get(n)
          if (o)
            switch (i.runningTransition) {
              case 'continue':
                return kr
              case 'stop':
                e.run(() => o.transition$.complete()),
                  (r = Object.assign(o.context, r)),
                  Uo.delete(n)
            }
          const s = t(n, i.animation, r) || PP
          if (
            !i.animation ||
            'none' === window.getComputedStyle(n).transitionProperty
          )
            return (
              e.run(() => s()),
              Vd(void 0).pipe(
                (function xP(e) {
                  return (n) =>
                    new be((t) =>
                      n.subscribe({
                        next: (s) => e.run(() => t.next(s)),
                        error: (s) => e.run(() => t.error(s)),
                        complete: () => e.run(() => t.complete()),
                      })
                    )
                })(e)
              )
            )
          const a = new We(),
            l = new We(),
            c = a.pipe(
              (function sx(...e) {
                return (n) =>
                  (function Ba(...e) {
                    return (function ox() {
                      return kf(1)
                    })()(ai(e, Fr(e)))
                  })(n, Vd(...e))
              })(!0)
            )
          Uo.set(n, {
            transition$: a,
            complete: () => {
              l.next(), l.complete()
            },
            context: r,
          })
          const u = (function RP(e) {
            const {transitionDelay: n, transitionDuration: t} =
              window.getComputedStyle(e)
            return 1e3 * (parseFloat(n) + parseFloat(t))
          })(n)
          return (
            e.runOutsideAngular(() => {
              const d = lt(n, 'transitionend').pipe(
                je(c),
                wi(({target: p}) => p === n)
              )
              ;(function t0(...e) {
                return 1 === (e = e0(e)).length
                  ? ft(e[0])
                  : new be(
                      (function ix(e) {
                        return (n) => {
                          let t = []
                          for (let i = 0; t && !n.closed && i < e.length; i++)
                            t.push(
                              ft(e[i]).subscribe(
                                Ge(n, (r) => {
                                  if (t) {
                                    for (let o = 0; o < t.length; o++)
                                      o !== i && t[o].unsubscribe()
                                    t = null
                                  }
                                  n.next(r)
                                })
                              )
                            )
                        }
                      })(e)
                    )
              })(
                (function Bd(e = 0, n, t = ex) {
                  let i = -1
                  return (
                    null != n && (Ff(n) ? (t = n) : (i = n)),
                    new be((r) => {
                      let o = (function tx(e) {
                        return e instanceof Date && !isNaN(e)
                      })(e)
                        ? +e - t.now()
                        : e
                      o < 0 && (o = 0)
                      let s = 0
                      return t.schedule(function () {
                        r.closed ||
                          (r.next(s++),
                          0 <= i ? this.schedule(void 0, i) : r.complete())
                      }, o)
                    })
                  )
                })(u + kP).pipe(je(c)),
                d,
                l
              )
                .pipe(je(c))
                .subscribe(() => {
                  Uo.delete(n),
                    e.run(() => {
                      s(), a.next(), a.complete()
                    })
                })
            }),
            a.asObservable()
          )
        }
      let Wa = (() => {
          class e {
            constructor() {
              this.animation = E0.animation
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵprov = q({token: e, factory: e.ɵfac, providedIn: 'root'})),
            e
          )
        })(),
        I0 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        x0 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        P0 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({})),
            e
          )
        })(),
        L0 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        V0 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({})),
            e
          )
        })()
      var Ue = (() => {
        return (
          ((e = Ue || (Ue = {}))[(e.Tab = 9)] = 'Tab'),
          (e[(e.Enter = 13)] = 'Enter'),
          (e[(e.Escape = 27)] = 'Escape'),
          (e[(e.Space = 32)] = 'Space'),
          (e[(e.PageUp = 33)] = 'PageUp'),
          (e[(e.PageDown = 34)] = 'PageDown'),
          (e[(e.End = 35)] = 'End'),
          (e[(e.Home = 36)] = 'Home'),
          (e[(e.ArrowLeft = 37)] = 'ArrowLeft'),
          (e[(e.ArrowUp = 38)] = 'ArrowUp'),
          (e[(e.ArrowRight = 39)] = 'ArrowRight'),
          (e[(e.ArrowDown = 40)] = 'ArrowDown'),
          Ue
        )
        var e
      })()
      'undefined' != typeof navigator &&
        navigator.userAgent &&
        (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
          (/Macintosh/.test(navigator.userAgent) &&
            navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 2) ||
          /Android/.test(navigator.userAgent))
      const H0 = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[contenteditable]',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ')
      function j0(e) {
        const n = Array.from(e.querySelectorAll(H0)).filter(
          (t) => -1 !== t.tabIndex
        )
        return [n[0], n[n.length - 1]]
      }
      new Date(1882, 10, 12), new Date(2174, 10, 25)
      let J0 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et, Yy]]})),
            e
          )
        })(),
        X0 = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({})),
            e
          )
        })()
      class Oi {
        constructor(n, t, i) {
          ;(this.nodes = n), (this.viewRef = t), (this.componentRef = i)
        }
      }
      let Ak = (() => {
        class e {
          constructor(t, i) {
            ;(this._el = t), (this._zone = i)
          }
          ngOnInit() {
            this._zone.onStable
              .asObservable()
              .pipe(mt(1))
              .subscribe(() => {
                ct(
                  this._zone,
                  this._el.nativeElement,
                  (t, i) => {
                    i && xr(t), t.classList.add('show')
                  },
                  {animation: this.animation, runningTransition: 'continue'}
                )
              })
          }
          hide() {
            return ct(
              this._zone,
              this._el.nativeElement,
              ({classList: t}) => t.remove('show'),
              {animation: this.animation, runningTransition: 'stop'}
            )
          }
        }
        return (
          (e.ɵfac = function (t) {
            return new (t || e)(m(_e), m(Ae))
          }),
          (e.ɵcmp = ln({
            type: e,
            selectors: [['ngb-modal-backdrop']],
            hostAttrs: [2, 'z-index', '1055'],
            hostVars: 6,
            hostBindings: function (t, i) {
              2 & t &&
                (gi(
                  'modal-backdrop' +
                    (i.backdropClass ? ' ' + i.backdropClass : '')
                ),
                ve('show', !i.animation)('fade', i.animation))
            },
            inputs: {animation: 'animation', backdropClass: 'backdropClass'},
            decls: 0,
            vars: 0,
            template: function (t, i) {},
            encapsulation: 2,
          })),
          e
        )
      })()
      class eb {
        close(n) {}
        dismiss(n) {}
      }
      class Ok {
        constructor(n, t, i, r) {
          ;(this._windowCmptRef = n),
            (this._contentRef = t),
            (this._backdropCmptRef = i),
            (this._beforeDismiss = r),
            (this._closed = new We()),
            (this._dismissed = new We()),
            (this._hidden = new We()),
            n.instance.dismissEvent.subscribe((o) => {
              this.dismiss(o)
            }),
            (this.result = new Promise((o, s) => {
              ;(this._resolve = o), (this._reject = s)
            })),
            this.result.then(null, () => {})
        }
        get componentInstance() {
          if (this._contentRef && this._contentRef.componentRef)
            return this._contentRef.componentRef.instance
        }
        get closed() {
          return this._closed.asObservable().pipe(je(this._hidden))
        }
        get dismissed() {
          return this._dismissed.asObservable().pipe(je(this._hidden))
        }
        get hidden() {
          return this._hidden.asObservable()
        }
        get shown() {
          return this._windowCmptRef.instance.shown.asObservable()
        }
        close(n) {
          this._windowCmptRef &&
            (this._closed.next(n),
            this._resolve(n),
            this._removeModalElements())
        }
        _dismiss(n) {
          this._dismissed.next(n), this._reject(n), this._removeModalElements()
        }
        dismiss(n) {
          if (this._windowCmptRef)
            if (this._beforeDismiss) {
              const t = this._beforeDismiss()
              !(function N0(e) {
                return e && e.then
              })(t)
                ? !1 !== t && this._dismiss(n)
                : t.then(
                    (i) => {
                      !1 !== i && this._dismiss(n)
                    },
                    () => {}
                  )
            } else this._dismiss(n)
        }
        _removeModalElements() {
          const n = this._windowCmptRef.instance.hide(),
            t = this._backdropCmptRef
              ? this._backdropCmptRef.instance.hide()
              : Vd(void 0)
          n.subscribe(() => {
            const {nativeElement: i} = this._windowCmptRef.location
            i.parentNode.removeChild(i),
              this._windowCmptRef.destroy(),
              this._contentRef &&
                this._contentRef.viewRef &&
                this._contentRef.viewRef.destroy(),
              (this._windowCmptRef = null),
              (this._contentRef = null)
          }),
            t.subscribe(() => {
              if (this._backdropCmptRef) {
                const {nativeElement: i} = this._backdropCmptRef.location
                i.parentNode.removeChild(i),
                  this._backdropCmptRef.destroy(),
                  (this._backdropCmptRef = null)
              }
            }),
            Va(n, t).subscribe(() => {
              this._hidden.next(), this._hidden.complete()
            })
        }
      }
      var zo = (() => {
        return (
          ((e = zo || (zo = {}))[(e.BACKDROP_CLICK = 0)] = 'BACKDROP_CLICK'),
          (e[(e.ESC = 1)] = 'ESC'),
          zo
        )
        var e
      })()
      let Sk = (() => {
          class e {
            constructor(t, i, r) {
              ;(this._document = t),
                (this._elRef = i),
                (this._zone = r),
                (this._closed$ = new We()),
                (this._elWithFocus = null),
                (this.backdrop = !0),
                (this.keyboard = !0),
                (this.dismissEvent = new $()),
                (this.shown = new We()),
                (this.hidden = new We())
            }
            get fullscreenClass() {
              return !0 === this.fullscreen
                ? ' modal-fullscreen'
                : Xd(this.fullscreen)
                ? ` modal-fullscreen-${this.fullscreen}-down`
                : ''
            }
            dismiss(t) {
              this.dismissEvent.emit(t)
            }
            ngOnInit() {
              ;(this._elWithFocus = this._document.activeElement),
                this._zone.onStable
                  .asObservable()
                  .pipe(mt(1))
                  .subscribe(() => {
                    this._show()
                  })
            }
            ngOnDestroy() {
              this._disableEventHandling()
            }
            hide() {
              const {nativeElement: t} = this._elRef,
                i = {animation: this.animation, runningTransition: 'stop'},
                s = Va(
                  ct(this._zone, t, () => t.classList.remove('show'), i),
                  ct(this._zone, this._dialogEl.nativeElement, () => {}, i)
                )
              return (
                s.subscribe(() => {
                  this.hidden.next(), this.hidden.complete()
                }),
                this._disableEventHandling(),
                this._restoreFocus(),
                s
              )
            }
            _show() {
              const t = {
                animation: this.animation,
                runningTransition: 'continue',
              }
              Va(
                ct(
                  this._zone,
                  this._elRef.nativeElement,
                  (o, s) => {
                    s && xr(o), o.classList.add('show')
                  },
                  t
                ),
                ct(this._zone, this._dialogEl.nativeElement, () => {}, t)
              ).subscribe(() => {
                this.shown.next(), this.shown.complete()
              }),
                this._enableEventHandling(),
                this._setFocus()
            }
            _enableEventHandling() {
              const {nativeElement: t} = this._elRef
              this._zone.runOutsideAngular(() => {
                lt(t, 'keydown')
                  .pipe(
                    je(this._closed$),
                    wi((r) => r.which === Ue.Escape)
                  )
                  .subscribe((r) => {
                    this.keyboard
                      ? requestAnimationFrame(() => {
                          r.defaultPrevented ||
                            this._zone.run(() => this.dismiss(zo.ESC))
                        })
                      : 'static' === this.backdrop && this._bumpBackdrop()
                  })
                let i = !1
                lt(this._dialogEl.nativeElement, 'mousedown')
                  .pipe(
                    je(this._closed$),
                    (function a0(e, n, t) {
                      const i =
                        ee(e) || n || t ? {next: e, error: n, complete: t} : e
                      return i
                        ? dt((r, o) => {
                            var s
                            null === (s = i.subscribe) ||
                              void 0 === s ||
                              s.call(i)
                            let a = !0
                            r.subscribe(
                              Ge(
                                o,
                                (l) => {
                                  var c
                                  null === (c = i.next) ||
                                    void 0 === c ||
                                    c.call(i, l),
                                    o.next(l)
                                },
                                () => {
                                  var l
                                  ;(a = !1),
                                    null === (l = i.complete) ||
                                      void 0 === l ||
                                      l.call(i),
                                    o.complete()
                                },
                                (l) => {
                                  var c
                                  ;(a = !1),
                                    null === (c = i.error) ||
                                      void 0 === c ||
                                      c.call(i, l),
                                    o.error(l)
                                },
                                () => {
                                  var l, c
                                  a &&
                                    (null === (l = i.unsubscribe) ||
                                      void 0 === l ||
                                      l.call(i)),
                                    null === (c = i.finalize) ||
                                      void 0 === c ||
                                      c.call(i)
                                }
                              )
                            )
                          })
                        : oi
                    })(() => (i = !1)),
                    (function s0(e, n) {
                      return dt((t, i) => {
                        let r = null,
                          o = 0,
                          s = !1
                        const a = () => s && !r && i.complete()
                        t.subscribe(
                          Ge(
                            i,
                            (l) => {
                              null == r || r.unsubscribe()
                              let c = 0
                              const u = o++
                              ft(e(l, u)).subscribe(
                                (r = Ge(
                                  i,
                                  (d) => i.next(n ? n(l, d, u, c++) : d),
                                  () => {
                                    ;(r = null), a()
                                  }
                                ))
                              )
                            },
                            () => {
                              ;(s = !0), a()
                            }
                          )
                        )
                      })
                    })(() => lt(t, 'mouseup').pipe(je(this._closed$), mt(1))),
                    wi(({target: r}) => t === r)
                  )
                  .subscribe(() => {
                    i = !0
                  }),
                  lt(t, 'click')
                    .pipe(je(this._closed$))
                    .subscribe(({target: r}) => {
                      t === r &&
                        ('static' === this.backdrop
                          ? this._bumpBackdrop()
                          : !0 === this.backdrop &&
                            !i &&
                            this._zone.run(() =>
                              this.dismiss(zo.BACKDROP_CLICK)
                            )),
                        (i = !1)
                    })
              })
            }
            _disableEventHandling() {
              this._closed$.next()
            }
            _setFocus() {
              const {nativeElement: t} = this._elRef
              if (!t.contains(document.activeElement)) {
                const i = t.querySelector('[ngbAutofocus]'),
                  r = j0(t)[0]
                ;(i || r || t).focus()
              }
            }
            _restoreFocus() {
              const t = this._document.body,
                i = this._elWithFocus
              let r
              ;(r = i && i.focus && t.contains(i) ? i : t),
                this._zone.runOutsideAngular(() => {
                  setTimeout(() => r.focus()), (this._elWithFocus = null)
                })
            }
            _bumpBackdrop() {
              'static' === this.backdrop &&
                ct(
                  this._zone,
                  this._elRef.nativeElement,
                  ({classList: t}) => (
                    t.add('modal-static'), () => t.remove('modal-static')
                  ),
                  {animation: this.animation, runningTransition: 'continue'}
                )
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(m(st), m(_e), m(Ae))
            }),
            (e.ɵcmp = ln({
              type: e,
              selectors: [['ngb-modal-window']],
              viewQuery: function (t, i) {
                if ((1 & t && oa(HR, 7), 2 & t)) {
                  let r
                  Ee((r = Te())) && (i._dialogEl = r.first)
                }
              },
              hostAttrs: ['role', 'dialog', 'tabindex', '-1'],
              hostVars: 7,
              hostBindings: function (t, i) {
                2 & t &&
                  (fe('aria-modal', !0)('aria-labelledby', i.ariaLabelledBy)(
                    'aria-describedby',
                    i.ariaDescribedBy
                  ),
                  gi(
                    'modal d-block' + (i.windowClass ? ' ' + i.windowClass : '')
                  ),
                  ve('fade', i.animation))
              },
              inputs: {
                animation: 'animation',
                ariaLabelledBy: 'ariaLabelledBy',
                ariaDescribedBy: 'ariaDescribedBy',
                backdrop: 'backdrop',
                centered: 'centered',
                fullscreen: 'fullscreen',
                keyboard: 'keyboard',
                scrollable: 'scrollable',
                size: 'size',
                windowClass: 'windowClass',
                modalDialogClass: 'modalDialogClass',
              },
              outputs: {dismissEvent: 'dismiss'},
              ngContentSelectors: CR,
              decls: 4,
              vars: 2,
              consts: [
                ['role', 'document'],
                ['dialog', ''],
                [1, 'modal-content'],
              ],
              template: function (t, i) {
                1 & t &&
                  ((function Yg(e) {
                    const n = b()[16][6]
                    if (!n.projection) {
                      const i = (n.projection = Jr(e ? e.length : 1, null)),
                        r = i.slice()
                      let o = n.child
                      for (; null !== o; ) {
                        const s = e ? tE(o, e) : 0
                        null !== s &&
                          (r[s] ? (r[s].projectionNext = o) : (i[s] = o),
                          (r[s] = o)),
                          (o = o.next)
                      }
                    }
                  })(),
                  B(0, 'div', 0, 1)(2, 'div', 2),
                  (function Zg(e, n = 0, t) {
                    const i = b(),
                      r = Y(),
                      o = er(r, 20 + e, 16, null, t || null)
                    null === o.projection && (o.projection = n),
                      Pl(),
                      64 != (64 & o.flags) &&
                        (function iw(e, n, t) {
                          Ch(
                            n[F],
                            0,
                            n,
                            t,
                            fh(e, t, n),
                            _h(t.parent || n[6], t, n)
                          )
                        })(r, i, o)
                  })(3),
                  H()()),
                  2 & t &&
                    gi(
                      'modal-dialog' +
                        (i.size ? ' modal-' + i.size : '') +
                        (i.centered ? ' modal-dialog-centered' : '') +
                        i.fullscreenClass +
                        (i.scrollable ? ' modal-dialog-scrollable' : '') +
                        (i.modalDialogClass ? ' ' + i.modalDialogClass : '')
                    )
              },
              styles: [
                'ngb-modal-window .component-host-scrollable{display:flex;flex-direction:column;overflow:hidden}\n',
              ],
              encapsulation: 2,
            })),
            e
          )
        })(),
        Ik = (() => {
          class e {
            constructor(t) {
              this._document = t
            }
            hide() {
              const t = Math.abs(
                  window.innerWidth - this._document.documentElement.clientWidth
                ),
                i = this._document.body,
                r = i.style,
                {overflow: o, paddingRight: s} = r
              if (t > 0) {
                const a = parseFloat(window.getComputedStyle(i).paddingRight)
                r.paddingRight = `${a + t}px`
              }
              return (
                (r.overflow = 'hidden'),
                () => {
                  t > 0 && (r.paddingRight = s), (r.overflow = o)
                }
              )
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(P(st))
            }),
            (e.ɵprov = q({token: e, factory: e.ɵfac, providedIn: 'root'})),
            e
          )
        })(),
        xk = (() => {
          class e {
            constructor(t, i, r, o, s, a) {
              ;(this._applicationRef = t),
                (this._injector = i),
                (this._document = r),
                (this._scrollBar = o),
                (this._rendererFactory = s),
                (this._ngZone = a),
                (this._activeWindowCmptHasChanged = new We()),
                (this._ariaHiddenValues = new Map()),
                (this._scrollBarRestoreFn = null),
                (this._backdropAttributes = ['animation', 'backdropClass']),
                (this._modalRefs = []),
                (this._windowAttributes = [
                  'animation',
                  'ariaLabelledBy',
                  'ariaDescribedBy',
                  'backdrop',
                  'centered',
                  'fullscreen',
                  'keyboard',
                  'scrollable',
                  'size',
                  'windowClass',
                  'modalDialogClass',
                ]),
                (this._windowCmpts = []),
                (this._activeInstances = new $()),
                this._activeWindowCmptHasChanged.subscribe(() => {
                  if (this._windowCmpts.length) {
                    const l = this._windowCmpts[this._windowCmpts.length - 1]
                    ;((e, n, t, i = !1) => {
                      this._ngZone.runOutsideAngular(() => {
                        const r = lt(n, 'focusin').pipe(
                          je(t),
                          At((o) => o.target)
                        )
                        lt(n, 'keydown')
                          .pipe(
                            je(t),
                            wi((o) => o.which === Ue.Tab),
                            Ud(r)
                          )
                          .subscribe(([o, s]) => {
                            const [a, l] = j0(n)
                            ;(s === a || s === n) &&
                              o.shiftKey &&
                              (l.focus(), o.preventDefault()),
                              s === l &&
                                !o.shiftKey &&
                                (a.focus(), o.preventDefault())
                          }),
                          i &&
                            lt(n, 'click')
                              .pipe(
                                je(t),
                                Ud(r),
                                At((o) => o[1])
                              )
                              .subscribe((o) => o.focus())
                      })
                    })(
                      0,
                      l.location.nativeElement,
                      this._activeWindowCmptHasChanged
                    ),
                      this._revertAriaHidden(),
                      this._setAriaHidden(l.location.nativeElement)
                  }
                })
            }
            _restoreScrollBar() {
              const t = this._scrollBarRestoreFn
              t && ((this._scrollBarRestoreFn = null), t())
            }
            _hideScrollBar() {
              this._scrollBarRestoreFn ||
                (this._scrollBarRestoreFn = this._scrollBar.hide())
            }
            open(t, i, r, o) {
              const s =
                  o.container instanceof HTMLElement
                    ? o.container
                    : Ei(o.container)
                    ? this._document.querySelector(o.container)
                    : this._document.body,
                a = this._rendererFactory.createRenderer(null, null)
              if (!s)
                throw new Error(
                  `The specified modal container "${
                    o.container || 'body'
                  }" was not found in the DOM.`
                )
              this._hideScrollBar()
              const l = new eb(),
                c = this._getContentRef(t, o.injector || i, r, l, o)
              let u = !1 !== o.backdrop ? this._attachBackdrop(t, s) : void 0,
                d = this._attachWindowComponent(t, s, c),
                f = new Ok(d, c, u, o.beforeDismiss)
              return (
                this._registerModalRef(f),
                this._registerWindowCmpt(d),
                f.hidden.pipe(mt(1)).subscribe(() =>
                  Promise.resolve(!0).then(() => {
                    this._modalRefs.length ||
                      (a.removeClass(this._document.body, 'modal-open'),
                      this._restoreScrollBar(),
                      this._revertAriaHidden())
                  })
                ),
                (l.close = (p) => {
                  f.close(p)
                }),
                (l.dismiss = (p) => {
                  f.dismiss(p)
                }),
                this._applyWindowOptions(d.instance, o),
                1 === this._modalRefs.length &&
                  a.addClass(this._document.body, 'modal-open'),
                u &&
                  u.instance &&
                  (this._applyBackdropOptions(u.instance, o),
                  u.changeDetectorRef.detectChanges()),
                d.changeDetectorRef.detectChanges(),
                f
              )
            }
            get activeInstances() {
              return this._activeInstances
            }
            dismissAll(t) {
              this._modalRefs.forEach((i) => i.dismiss(t))
            }
            hasOpenModals() {
              return this._modalRefs.length > 0
            }
            _attachBackdrop(t, i) {
              let o = t.resolveComponentFactory(Ak).create(this._injector)
              return (
                this._applicationRef.attachView(o.hostView),
                i.appendChild(o.location.nativeElement),
                o
              )
            }
            _attachWindowComponent(t, i, r) {
              let s = t
                .resolveComponentFactory(Sk)
                .create(this._injector, r.nodes)
              return (
                this._applicationRef.attachView(s.hostView),
                i.appendChild(s.location.nativeElement),
                s
              )
            }
            _applyWindowOptions(t, i) {
              this._windowAttributes.forEach((r) => {
                Ei(i[r]) && (t[r] = i[r])
              })
            }
            _applyBackdropOptions(t, i) {
              this._backdropAttributes.forEach((r) => {
                Ei(i[r]) && (t[r] = i[r])
              })
            }
            _getContentRef(t, i, r, o, s) {
              return r
                ? r instanceof Ne
                  ? this._createFromTemplateRef(r, o)
                  : Xd(r)
                  ? this._createFromString(r)
                  : this._createFromComponent(t, i, r, o, s)
                : new Oi([])
            }
            _createFromTemplateRef(t, i) {
              const o = t.createEmbeddedView({
                $implicit: i,
                close(s) {
                  i.close(s)
                },
                dismiss(s) {
                  i.dismiss(s)
                },
              })
              return (
                this._applicationRef.attachView(o), new Oi([o.rootNodes], o)
              )
            }
            _createFromString(t) {
              const i = this._document.createTextNode(`${t}`)
              return new Oi([[i]])
            }
            _createFromComponent(t, i, r, o, s) {
              const a = t.resolveComponentFactory(r),
                l = gt.create({
                  providers: [{provide: eb, useValue: o}],
                  parent: i,
                }),
                c = a.create(l),
                u = c.location.nativeElement
              return (
                s.scrollable && u.classList.add('component-host-scrollable'),
                this._applicationRef.attachView(c.hostView),
                new Oi([[u]], c.hostView, c)
              )
            }
            _setAriaHidden(t) {
              const i = t.parentElement
              i &&
                t !== this._document.body &&
                (Array.from(i.children).forEach((r) => {
                  r !== t &&
                    'SCRIPT' !== r.nodeName &&
                    (this._ariaHiddenValues.set(
                      r,
                      r.getAttribute('aria-hidden')
                    ),
                    r.setAttribute('aria-hidden', 'true'))
                }),
                this._setAriaHidden(i))
            }
            _revertAriaHidden() {
              this._ariaHiddenValues.forEach((t, i) => {
                t
                  ? i.setAttribute('aria-hidden', t)
                  : i.removeAttribute('aria-hidden')
              }),
                this._ariaHiddenValues.clear()
            }
            _registerModalRef(t) {
              const i = () => {
                const r = this._modalRefs.indexOf(t)
                r > -1 &&
                  (this._modalRefs.splice(r, 1),
                  this._activeInstances.emit(this._modalRefs))
              }
              this._modalRefs.push(t),
                this._activeInstances.emit(this._modalRefs),
                t.result.then(i, i)
            }
            _registerWindowCmpt(t) {
              this._windowCmpts.push(t),
                this._activeWindowCmptHasChanged.next(),
                t.onDestroy(() => {
                  const i = this._windowCmpts.indexOf(t)
                  i > -1 &&
                    (this._windowCmpts.splice(i, 1),
                    this._activeWindowCmptHasChanged.next())
                })
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(P(Uu), P(gt), P(st), P(Ik), P(gu), P(Ae))
            }),
            (e.ɵprov = q({token: e, factory: e.ɵfac, providedIn: 'root'})),
            e
          )
        })(),
        Rk = (() => {
          class e {
            constructor(t) {
              ;(this._ngbConfig = t),
                (this.backdrop = !0),
                (this.fullscreen = !1),
                (this.keyboard = !0)
            }
            get animation() {
              return void 0 === this._animation
                ? this._ngbConfig.animation
                : this._animation
            }
            set animation(t) {
              this._animation = t
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(P(Wa))
            }),
            (e.ɵprov = q({token: e, factory: e.ɵfac, providedIn: 'root'})),
            e
          )
        })(),
        Pk = (() => {
          class e {
            constructor(t, i, r, o) {
              ;(this._moduleCFR = t),
                (this._injector = i),
                (this._modalStack = r),
                (this._config = o)
            }
            open(t, i = {}) {
              const r = Object.assign(
                Object.assign(Object.assign({}, this._config), {
                  animation: this._config.animation,
                }),
                i
              )
              return this._modalStack.open(
                this._moduleCFR,
                this._injector,
                t,
                r
              )
            }
            get activeInstances() {
              return this._modalStack.activeInstances
            }
            dismissAll(t) {
              this._modalStack.dismissAll(t)
            }
            hasOpenModals() {
              return this._modalStack.hasOpenModals()
            }
          }
          return (
            (e.ɵfac = function (t) {
              return new (t || e)(P(vo), P(gt), P(xk), P(Rk))
            }),
            (e.ɵprov = q({token: e, factory: e.ɵfac, providedIn: 'root'})),
            e
          )
        })(),
        tb = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({providers: [Pk]})),
            e
          )
        })(),
        ob = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        pb = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        gb = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        _b = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        mb = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        vb = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        yb = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        bb = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({})),
            e
          )
        })()
      new K('live announcer delay', {
        providedIn: 'root',
        factory: function qk() {
          return 100
        },
      })
      let Db = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({imports: [[Et]]})),
            e
          )
        })(),
        Cb = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({})),
            e
          )
        })()
      const Kk = [
        I0,
        x0,
        P0,
        L0,
        V0,
        J0,
        X0,
        tb,
        ob,
        Cb,
        pb,
        gb,
        _b,
        mb,
        vb,
        yb,
        bb,
        Db,
      ]
      let Jk = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e})),
            (e.ɵinj = re({
              imports: [
                Kk,
                I0,
                x0,
                P0,
                L0,
                V0,
                J0,
                X0,
                tb,
                ob,
                Cb,
                pb,
                gb,
                _b,
                mb,
                vb,
                yb,
                bb,
                Db,
              ],
            })),
            e
          )
        })(),
        Yk = (() => {
          class e {}
          return (
            (e.ɵfac = function (t) {
              return new (t || e)()
            }),
            (e.ɵmod = ce({type: e, bootstrap: [$I]})),
            (e.ɵinj = re({providers: [], imports: [[CS, Jk, Yy]]})),
            e
          )
        })()
      ;(function fA() {
        iv = !1
      })(),
        bS()
          .bootstrapModule(Yk)
          .catch((e) => console.error(e))
    },
  },
  (ee) => {
    ee((ee.s = 672))
  },
])
