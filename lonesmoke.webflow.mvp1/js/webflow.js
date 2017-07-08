/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */
!(function() {
  'use strict';
  function t(t, e) {
    return (e = { exports: {} }), t(e, e.exports), e.exports;
  }
  window.tram = (function(t) {
    function e(t, e) {
      return new R.Bare().init(t, e);
    }
    function n(t) {
      return t.replace(/[A-Z]/g, function(t) {
        return '-' + t.toLowerCase();
      });
    }
    function i(t) {
      var e = parseInt(t.slice(1), 16);
      return [(e >> 16) & 255, (e >> 8) & 255, 255 & e];
    }
    function r(t, e, n) {
      return '#' + ((1 << 24) | (t << 16) | (e << 8) | n).toString(16).slice(1);
    }
    function o() {}
    function a(t, e) {
      c('Type warning: Expected: [' + t + '] Got: [' + typeof e + '] ' + e);
    }
    function s(t, e, n) {
      c('Units do not match [' + t + ']: ' + e + ', ' + n);
    }
    function u(t, e, n) {
      if ((void 0 !== e && (n = e), void 0 === t)) return n;
      var i = n;
      return V.test(t) || !K.test(t)
        ? (i = parseInt(t, 10))
        : K.test(t) && (i = 1e3 * parseFloat(t)), 0 > i && (i = 0), i === i ? i : n;
    }
    function c(t) {
      Z.debug && window && window.console.warn(t);
    }
    function l(t) {
      for (var e = -1, n = t ? t.length : 0, i = []; ++e < n; ) {
        var r = t[e];
        r && i.push(r);
      }
      return i;
    }
    var f = (function(t, e, n) {
      function i(t) {
        return 'object' == typeof t;
      }
      function r(t) {
        return 'function' == typeof t;
      }
      function o() {}
      function a(s, u) {
        function c() {
          var t = new l();
          return r(t.init) && t.init.apply(t, arguments), t;
        }
        function l() {}
        u === n && ((u = s), (s = Object)), (c.Bare = l);
        var f, d = (o[t] = s[t]), h = (l[t] = c[t] = new o());
        return (h.constructor = c), (c.mixin = function(e) {
          return (l[t] = c[t] = a(c, e)[t]), c;
        }), (c.open = function(t) {
          if (((f = {}), r(t) ? (f = t.call(c, h, d, c, s)) : i(t) && (f = t), i(f)))
            for (var n in f)
              e.call(f, n) && (h[n] = f[n]);
          return r(h.init) || (h.init = s), c;
        }), c.open(u);
      }
      return a;
    })('prototype', {}.hasOwnProperty),
      d = {
        ease: [
          'ease',
          function(t, e, n, i) {
            var r = (t /= i) * t, o = r * t;
            return e + n * (-2.75 * o * r + 11 * r * r + -15.5 * o + 8 * r + 0.25 * t);
          },
        ],
        'ease-in': [
          'ease-in',
          function(t, e, n, i) {
            var r = (t /= i) * t, o = r * t;
            return e + n * (-1 * o * r + 3 * r * r + -3 * o + 2 * r);
          },
        ],
        'ease-out': [
          'ease-out',
          function(t, e, n, i) {
            var r = (t /= i) * t, o = r * t;
            return e + n * (0.3 * o * r + -1.6 * r * r + 2.2 * o + -1.8 * r + 1.9 * t);
          },
        ],
        'ease-in-out': [
          'ease-in-out',
          function(t, e, n, i) {
            var r = (t /= i) * t, o = r * t;
            return e + n * (2 * o * r + -5 * r * r + 2 * o + 2 * r);
          },
        ],
        linear: [
          'linear',
          function(t, e, n, i) {
            return n * t / i + e;
          },
        ],
        'ease-in-quad': [
          'cubic-bezier(0.550, 0.085, 0.680, 0.530)',
          function(t, e, n, i) {
            return n * (t /= i) * t + e;
          },
        ],
        'ease-out-quad': [
          'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
          function(t, e, n, i) {
            return -n * (t /= i) * (t - 2) + e;
          },
        ],
        'ease-in-out-quad': [
          'cubic-bezier(0.455, 0.030, 0.515, 0.955)',
          function(t, e, n, i) {
            return (t /= i / 2) < 1 ? n / 2 * t * t + e : -n / 2 * (--t * (t - 2) - 1) + e;
          },
        ],
        'ease-in-cubic': [
          'cubic-bezier(0.550, 0.055, 0.675, 0.190)',
          function(t, e, n, i) {
            return n * (t /= i) * t * t + e;
          },
        ],
        'ease-out-cubic': [
          'cubic-bezier(0.215, 0.610, 0.355, 1)',
          function(t, e, n, i) {
            return n * ((t = t / i - 1) * t * t + 1) + e;
          },
        ],
        'ease-in-out-cubic': [
          'cubic-bezier(0.645, 0.045, 0.355, 1)',
          function(t, e, n, i) {
            return (t /= i / 2) < 1 ? n / 2 * t * t * t + e : n / 2 * ((t -= 2) * t * t + 2) + e;
          },
        ],
        'ease-in-quart': [
          'cubic-bezier(0.895, 0.030, 0.685, 0.220)',
          function(t, e, n, i) {
            return n * (t /= i) * t * t * t + e;
          },
        ],
        'ease-out-quart': [
          'cubic-bezier(0.165, 0.840, 0.440, 1)',
          function(t, e, n, i) {
            return -n * ((t = t / i - 1) * t * t * t - 1) + e;
          },
        ],
        'ease-in-out-quart': [
          'cubic-bezier(0.770, 0, 0.175, 1)',
          function(t, e, n, i) {
            return (t /= i / 2) < 1
              ? n / 2 * t * t * t * t + e
              : -n / 2 * ((t -= 2) * t * t * t - 2) + e;
          },
        ],
        'ease-in-quint': [
          'cubic-bezier(0.755, 0.050, 0.855, 0.060)',
          function(t, e, n, i) {
            return n * (t /= i) * t * t * t * t + e;
          },
        ],
        'ease-out-quint': [
          'cubic-bezier(0.230, 1, 0.320, 1)',
          function(t, e, n, i) {
            return n * ((t = t / i - 1) * t * t * t * t + 1) + e;
          },
        ],
        'ease-in-out-quint': [
          'cubic-bezier(0.860, 0, 0.070, 1)',
          function(t, e, n, i) {
            return (t /= i / 2) < 1
              ? n / 2 * t * t * t * t * t + e
              : n / 2 * ((t -= 2) * t * t * t * t + 2) + e;
          },
        ],
        'ease-in-sine': [
          'cubic-bezier(0.470, 0, 0.745, 0.715)',
          function(t, e, n, i) {
            return -n * Math.cos(t / i * (Math.PI / 2)) + n + e;
          },
        ],
        'ease-out-sine': [
          'cubic-bezier(0.390, 0.575, 0.565, 1)',
          function(t, e, n, i) {
            return n * Math.sin(t / i * (Math.PI / 2)) + e;
          },
        ],
        'ease-in-out-sine': [
          'cubic-bezier(0.445, 0.050, 0.550, 0.950)',
          function(t, e, n, i) {
            return -n / 2 * (Math.cos(Math.PI * t / i) - 1) + e;
          },
        ],
        'ease-in-expo': [
          'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
          function(t, e, n, i) {
            return 0 === t ? e : n * Math.pow(2, 10 * (t / i - 1)) + e;
          },
        ],
        'ease-out-expo': [
          'cubic-bezier(0.190, 1, 0.220, 1)',
          function(t, e, n, i) {
            return t === i ? e + n : n * (1 - Math.pow(2, -10 * t / i)) + e;
          },
        ],
        'ease-in-out-expo': [
          'cubic-bezier(1, 0, 0, 1)',
          function(t, e, n, i) {
            return 0 === t
              ? e
              : t === i
                  ? e + n
                  : (t /= i / 2) < 1
                      ? n / 2 * Math.pow(2, 10 * (t - 1)) + e
                      : n / 2 * (2 - Math.pow(2, -10 * --t)) + e;
          },
        ],
        'ease-in-circ': [
          'cubic-bezier(0.600, 0.040, 0.980, 0.335)',
          function(t, e, n, i) {
            return -n * (Math.sqrt(1 - (t /= i) * t) - 1) + e;
          },
        ],
        'ease-out-circ': [
          'cubic-bezier(0.075, 0.820, 0.165, 1)',
          function(t, e, n, i) {
            return n * Math.sqrt(1 - (t = t / i - 1) * t) + e;
          },
        ],
        'ease-in-out-circ': [
          'cubic-bezier(0.785, 0.135, 0.150, 0.860)',
          function(t, e, n, i) {
            return (t /= i / 2) < 1
              ? -n / 2 * (Math.sqrt(1 - t * t) - 1) + e
              : n / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + e;
          },
        ],
        'ease-in-back': [
          'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
          function(t, e, n, i, r) {
            return void 0 === r && (r = 1.70158), n * (t /= i) * t * ((r + 1) * t - r) + e;
          },
        ],
        'ease-out-back': [
          'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
          function(t, e, n, i, r) {
            return void 0 === r && (r = 1.70158), n *
              ((t = t / i - 1) * t * ((r + 1) * t + r) + 1) +
              e;
          },
        ],
        'ease-in-out-back': [
          'cubic-bezier(0.680, -0.550, 0.265, 1.550)',
          function(t, e, n, i, r) {
            return void 0 === r && (r = 1.70158), (t /= i / 2) < 1
              ? n / 2 * t * t * ((1 + (r *= 1.525)) * t - r) + e
              : n / 2 * ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) + e;
          },
        ],
      },
      h = {
        'ease-in-back': 'cubic-bezier(0.600, 0, 0.735, 0.045)',
        'ease-out-back': 'cubic-bezier(0.175, 0.885, 0.320, 1)',
        'ease-in-out-back': 'cubic-bezier(0.680, 0, 0.265, 1)',
      },
      p = document,
      v = window,
      m = 'bkwld-tram',
      g = /[\-\.0-9]/g,
      w = /[A-Z]/,
      b = 'number',
      y = /^(rgb|#)/,
      x = /(em|cm|mm|in|pt|pc|px)$/,
      k = /(em|cm|mm|in|pt|pc|px|%)$/,
      _ = /(deg|rad|turn)$/,
      T = 'unitless',
      z = /(all|none) 0s ease 0s/,
      O = /^(width|height)$/,
      L = ' ',
      M = p.createElement('a'),
      A = ['Webkit', 'Moz', 'O', 'ms'],
      E = ['-webkit-', '-moz-', '-o-', '-ms-'],
      C = function(t) {
        if (t in M.style) return { dom: t, css: t };
        var e, n, i = '', r = t.split('-');
        for (e = 0; e < r.length; e++)
          i += r[e].charAt(0).toUpperCase() + r[e].slice(1);
        for (e = 0; e < A.length; e++)
          if ((n = A[e] + i) in M.style) return { dom: n, css: E[e] + t };
      },
      j = (e.support = {
        bind: Function.prototype.bind,
        transform: C('transform'),
        transition: C('transition'),
        backface: C('backface-visibility'),
        timing: C('transition-timing-function'),
      });
    if (j.transition) {
      var I = j.timing.dom;
      if (((M.style[I] = d['ease-in-back'][0]), !M.style[I])) for (var q in h) d[q][0] = h[q];
    }
    var $ = (e.frame = (function() {
      var t =
        v.requestAnimationFrame ||
        v.webkitRequestAnimationFrame ||
        v.mozRequestAnimationFrame ||
        v.oRequestAnimationFrame ||
        v.msRequestAnimationFrame;
      return t && j.bind
        ? t.bind(v)
        : function(t) {
            v.setTimeout(t, 16);
          };
    })()),
      S = (e.now = (function() {
        var t = v.performance, e = t && (t.now || t.webkitNow || t.msNow || t.mozNow);
        return e && j.bind
          ? e.bind(t)
          : Date.now ||
              function() {
                return +new Date();
              };
      })()),
      D = f(function(e) {
        function i(t, e) {
          var n = l(('' + t).split(L)), i = n[0];
          e = e || {};
          var r = Q[i];
          if (!r) return c('Unsupported property: ' + i);
          if (!e.weak || !this.props[i]) {
            var o = r[0], a = this.props[i];
            return a || (a = this.props[i] = new o.Bare()), a.init(this.$el, n, r, e), a;
          }
        }
        function r(t, e, n) {
          if (t) {
            var r = typeof t;
            if (
              (e ||
                (this.timer && this.timer.destroy(), (this.queue = [
                ]), (this.active = !1)), 'number' == r && e)
            )
              return (this.timer = new H({
                duration: t,
                context: this,
                complete: o,
              })), void (this.active = !0);
            if ('string' == r && e) {
              switch (t) {
                case 'hide':
                  s.call(this);
                  break;
                case 'stop':
                  a.call(this);
                  break;
                case 'redraw':
                  f.call(this);
                  break;
                default:
                  i.call(this, t, n && n[1]);
              }
              return o.call(this);
            }
            if ('function' == r) return void t.call(this, this);
            if ('object' == r) {
              var c = 0;
              h.call(
                this,
                t,
                function(t, e) {
                  t.span > c && (c = t.span), t.stop(), t.animate(e);
                },
                function(t) {
                  'wait' in t && (c = u(t.wait, 0));
                },
              ), d.call(this), c > 0 &&
                ((this.timer = new H({ duration: c, context: this })), (this.active = !0), e &&
                  (this.timer.complete = o));
              var l = this, p = !1, v = {};
              $(function() {
                h.call(l, t, function(t) {
                  t.active && ((p = !0), (v[t.name] = t.nextStyle));
                }), p && l.$el.css(v);
              });
            }
          }
        }
        function o() {
          if ((this.timer && this.timer.destroy(), (this.active = !1), this.queue.length)) {
            var t = this.queue.shift();
            r.call(this, t.options, !0, t.args);
          }
        }
        function a(t) {
          this.timer && this.timer.destroy(), (this.queue = []), (this.active = !1);
          var e;
          'string' == typeof t
            ? ((e = {}), (e[t] = 1))
            : (e = 'object' == typeof t && null != t
                ? t
                : this.props), h.call(this, e, p), d.call(this);
        }
        function s() {
          a.call(this), (this.el.style.display = 'none');
        }
        function f() {
          this.el.offsetHeight;
        }
        function d() {
          var t, e, n = [];
          this.upstream && n.push(this.upstream);
          for (t in this.props) (e = this.props[t]).active && n.push(e.string);
          (n = n.join(
            ',',
          )), this.style !== n && ((this.style = n), (this.el.style[j.transition.dom] = n));
        }
        function h(t, e, r) {
          var o, a, s, u, c = e !== p, l = {};
          for (o in t) (s =
              t[
                o
              ]), o in J ? (l.transform || (l.transform = {}), (l.transform[o] = s)) : (w.test(o) && (o = n(o)), o in Q ? (l[o] = s) : (u || (u = {}), (u[o] = s)));
          for (o in l) {
            if (((s = l[o]), !(a = this.props[o]))) {
              if (!c) continue;
              a = i.call(this, o);
            }
            e.call(this, a, s);
          }
          r && u && r.call(this, u);
        }
        function p(t) {
          t.stop();
        }
        function v(t, e) {
          t.set(e);
        }
        function g(t) {
          this.$el.css(t);
        }
        function b(t, n) {
          e[t] = function() {
            return this.children
              ? y.call(this, n, arguments)
              : (this.el && n.apply(this, arguments), this);
          };
        }
        function y(t, e) {
          var n, i = this.children.length;
          for (n = 0; i > n; n++) t.apply(this.children[n], e);
          return this;
        }
        (e.init = function(e) {
          if (
            ((this.$el = t(e)), (this.el = this.$el[0]), (this.props = {}), (this.queue = [
            ]), (this.style = ''), (this.active = !1), Z.keepInherited && !Z.fallback)
          ) {
            var n = Y(this.el, 'transition');
            n && !z.test(n) && (this.upstream = n);
          }
          j.backface && Z.hideBackface && U(this.el, j.backface.css, 'hidden');
        }), b('add', i), b('start', r), b('wait', function(t) {
          (t = u(
            t,
            0,
          )), this.active ? this.queue.push({ options: t }) : ((this.timer = new H({ duration: t, context: this, complete: o })), (this.active = !0));
        }), b('then', function(t) {
          return this.active
            ? (this.queue.push({ options: t, args: arguments }), void (this.timer.complete = o))
            : c('No active transition timer. Use start() or wait() before then().');
        }), b('next', o), b('stop', a), b('set', function(t) {
          a.call(this, t), h.call(this, t, v, g);
        }), b('show', function(t) {
          'string' != typeof t && (t = 'block'), (this.el.style.display = t);
        }), b('hide', s), b('redraw', f), b('destroy', function() {
          a.call(this), t.removeData(this.el, m), (this.$el = this.el = null);
        });
      }),
      R = f(D, function(e) {
        function n(e, n) {
          var i = t.data(e, m) || t.data(e, m, new D.Bare());
          return i.el || i.init(e), n ? i.start(n) : i;
        }
        e.init = function(e, i) {
          var r = t(e);
          if (!r.length) return this;
          if (1 === r.length) return n(r[0], i);
          var o = [];
          return r.each(function(t, e) {
            o.push(n(e, i));
          }), (this.children = o), this;
        };
      }),
      B = f(function(t) {
        function e() {
          var t = this.get();
          this.update('auto');
          var e = this.get();
          return this.update(t), e;
        }
        function n(t, e, n) {
          return void 0 !== e && (n = e), t in d ? t : n;
        }
        function i(t) {
          var e = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(t);
          return (e ? r(e[1], e[2], e[3]) : t).replace(/#(\w)(\w)(\w)$/, '#$1$1$2$2$3$3');
        }
        var o = { duration: 500, ease: 'ease', delay: 0 };
        (t.init = function(t, e, i, r) {
          (this.$el = t), (this.el = t[0]);
          var a = e[0];
          i[2] && (a = i[2]), G[a] && (a = G[a]), (this.name = a), (this.type =
            i[1]), (this.duration = u(e[1], this.duration, o.duration)), (this.ease = n(
            e[2],
            this.ease,
            o.ease,
          )), (this.delay = u(e[3], this.delay, o.delay)), (this.span =
            this.duration +
            this.delay), (this.active = !1), (this.nextStyle = null), (this.auto = O.test(
            this.name,
          )), (this.unit = r.unit || this.unit || Z.defaultUnit), (this.angle =
            r.angle || this.angle || Z.defaultAngle), Z.fallback || r.fallback
            ? (this.animate = this.fallback)
            : ((this.animate = this.transition), (this.string =
                this.name +
                L +
                this.duration +
                'ms' +
                ('ease' != this.ease ? L + d[this.ease][0] : '') +
                (this.delay ? L + this.delay + 'ms' : '')));
        }), (t.set = function(t) {
          (t = this.convert(t, this.type)), this.update(t), this.redraw();
        }), (t.transition = function(t) {
          (this.active = !0), (t = this.convert(t, this.type)), this.auto &&
            ('auto' == this.el.style[this.name] &&
              (this.update(this.get()), this.redraw()), 'auto' == t &&
              (t = e.call(this))), (this.nextStyle = t);
        }), (t.fallback = function(t) {
          var n = this.el.style[this.name] || this.convert(this.get(), this.type);
          (t = this.convert(t, this.type)), this.auto &&
            ('auto' == n && (n = this.convert(this.get(), this.type)), 'auto' == t &&
              (t = e.call(this))), (this.tween = new X({
            from: n,
            to: t,
            duration: this.duration,
            delay: this.delay,
            ease: this.ease,
            update: this.update,
            context: this,
          }));
        }), (t.get = function() {
          return Y(this.el, this.name);
        }), (t.update = function(t) {
          U(this.el, this.name, t);
        }), (t.stop = function() {
          (this.active || this.nextStyle) &&
            ((this.active = !1), (this.nextStyle = null), U(this.el, this.name, this.get()));
          var t = this.tween;
          t && t.context && t.destroy();
        }), (t.convert = function(t, e) {
          if ('auto' == t && this.auto) return t;
          var n, r = 'number' == typeof t, o = 'string' == typeof t;
          switch (e) {
            case b:
              if (r) return t;
              if (o && '' === t.replace(g, '')) return +t;
              n = 'number(unitless)';
              break;
            case y:
              if (o) {
                if ('' === t && this.original) return this.original;
                if (e.test(t)) return '#' == t.charAt(0) && 7 == t.length ? t : i(t);
              }
              n = 'hex or rgb string';
              break;
            case x:
              if (r) return t + this.unit;
              if (o && e.test(t)) return t;
              n = 'number(px) or string(unit)';
              break;
            case k:
              if (r) return t + this.unit;
              if (o && e.test(t)) return t;
              n = 'number(px) or string(unit or %)';
              break;
            case _:
              if (r) return t + this.angle;
              if (o && e.test(t)) return t;
              n = 'number(deg) or string(angle)';
              break;
            case T:
              if (r) return t;
              if (o && k.test(t)) return t;
              n = 'number(unitless) or string(unit or %)';
          }
          return a(n, t), t;
        }), (t.redraw = function() {
          this.el.offsetHeight;
        });
      }),
      N = f(B, function(t, e) {
        t.init = function() {
          e.init.apply(this, arguments), this.original ||
            (this.original = this.convert(this.get(), y));
        };
      }),
      P = f(B, function(t, e) {
        (t.init = function() {
          e.init.apply(this, arguments), (this.animate = this.fallback);
        }), (t.get = function() {
          return this.$el[this.name]();
        }), (t.update = function(t) {
          this.$el[this.name](t);
        });
      }),
      F = f(B, function(t, e) {
        function n(t, e) {
          var n, i, r, o, a;
          for (n in t) (o =
              J[
                n
              ]), (r = o[0]), (i = o[1] || n), (a = this.convert(t[n], r)), e.call(this, i, a, r);
        }
        (t.init = function() {
          e.init.apply(this, arguments), this.current ||
            ((this.current = {}), J.perspective &&
              Z.perspective &&
              ((this.current.perspective = Z.perspective), U(
                this.el,
                this.name,
                this.style(this.current),
              ), this.redraw()));
        }), (t.set = function(t) {
          n.call(this, t, function(t, e) {
            this.current[t] = e;
          }), U(this.el, this.name, this.style(this.current)), this.redraw();
        }), (t.transition = function(t) {
          var e = this.values(t);
          this.tween = new W({
            current: this.current,
            values: e,
            duration: this.duration,
            delay: this.delay,
            ease: this.ease,
          });
          var n, i = {};
          for (n in this.current)
            i[n] = n in e ? e[n] : this.current[n];
          (this.active = !0), (this.nextStyle = this.style(i));
        }), (t.fallback = function(t) {
          var e = this.values(t);
          this.tween = new W({
            current: this.current,
            values: e,
            duration: this.duration,
            delay: this.delay,
            ease: this.ease,
            update: this.update,
            context: this,
          });
        }), (t.update = function() {
          U(this.el, this.name, this.style(this.current));
        }), (t.style = function(t) {
          var e, n = '';
          for (e in t)
            n += e + '(' + t[e] + ') ';
          return n;
        }), (t.values = function(t) {
          var e, i = {};
          return n.call(this, t, function(t, n, r) {
            (i[
              t
            ] = n), void 0 === this.current[t] && ((e = 0), ~t.indexOf('scale') && (e = 1), (this.current[t] = this.convert(e, r)));
          }), i;
        });
      }),
      X = f(function(e) {
        function n(t) {
          1 === h.push(t) && $(a);
        }
        function a() {
          var t, e, n, i = h.length;
          if (i) for ($(a), (e = S()), (t = i); t--; ) (n = h[t]) && n.render(e);
        }
        function u(e) {
          var n, i = t.inArray(e, h);
          i >= 0 && ((n = h.slice(i + 1)), (h.length = i), n.length && (h = h.concat(n)));
        }
        function c(t) {
          return Math.round(t * p) / p;
        }
        function l(t, e, n) {
          return r(t[0] + n * (e[0] - t[0]), t[1] + n * (e[1] - t[1]), t[2] + n * (e[2] - t[2]));
        }
        var f = { ease: d.ease[1], from: 0, to: 1 };
        (e.init = function(t) {
          (this.duration = t.duration || 0), (this.delay = t.delay || 0);
          var e = t.ease || f.ease;
          d[e] && (e = d[e][1]), 'function' != typeof e &&
            (e = f.ease), (this.ease = e), (this.update = t.update || o), (this.complete =
            t.complete || o), (this.context = t.context || this), (this.name = t.name);
          var n = t.from, i = t.to;
          void 0 === n && (n = f.from), void 0 === i && (i = f.to), (this.unit =
            t.unit || ''), 'number' == typeof n && 'number' == typeof i
            ? ((this.begin = n), (this.change = i - n))
            : this.format(i, n), (this.value = this.begin + this.unit), (this.start = S()), !1 !==
            t.autoplay && this.play();
        }), (e.play = function() {
          this.active || (this.start || (this.start = S()), (this.active = !0), n(this));
        }), (e.stop = function() {
          this.active && ((this.active = !1), u(this));
        }), (e.render = function(t) {
          var e, n = t - this.start;
          if (this.delay) {
            if (n <= this.delay) return;
            n -= this.delay;
          }
          if (n < this.duration) {
            var i = this.ease(n, 0, 1, this.duration);
            return (e = this.startRGB
              ? l(this.startRGB, this.endRGB, i)
              : c(this.begin + i * this.change)), (this.value =
              e + this.unit), void this.update.call(this.context, this.value);
          }
          (e = this.endHex || this.begin + this.change), (this.value =
            e + this.unit), this.update.call(this.context, this.value), this.complete.call(
            this.context,
          ), this.destroy();
        }), (e.format = function(t, e) {
          if (((e += ''), '#' == (t += '').charAt(0)))
            return (this.startRGB = i(e)), (this.endRGB = i(
              t,
            )), (this.endHex = t), (this.begin = 0), void (this.change = 1);
          if (!this.unit) {
            var n = e.replace(g, '');
            n !== t.replace(g, '') && s('tween', e, t), (this.unit = n);
          }
          (e = parseFloat(e)), (t = parseFloat(t)), (this.begin = this.value = e), (this.change =
            t - e);
        }), (e.destroy = function() {
          this.stop(), (this.context = null), (this.ease = this.update = this.complete = o);
        });
        var h = [], p = 1e3;
      }),
      H = f(X, function(t) {
        (t.init = function(t) {
          (this.duration = t.duration || 0), (this.complete = t.complete || o), (this.context =
            t.context), this.play();
        }), (t.render = function(t) {
          t - this.start < this.duration || (this.complete.call(this.context), this.destroy());
        });
      }),
      W = f(X, function(t, e) {
        (t.init = function(t) {
          (this.context = t.context), (this.update = t.update), (this.tweens = []), (this.current =
            t.current);
          var e, n;
          for (e in t.values)
            (n = t.values[e]), this.current[e] !== n &&
              this.tweens.push(
                new X({
                  name: e,
                  from: this.current[e],
                  to: n,
                  duration: t.duration,
                  delay: t.delay,
                  ease: t.ease,
                  autoplay: !1,
                }),
              );
          this.play();
        }), (t.render = function(t) {
          var e, n, i = !1;
          for (e = this.tweens.length; e--; )
            (n = this.tweens[e]).context &&
              (n.render(t), (this.current[n.name] = n.value), (i = !0));
          return i ? void (this.update && this.update.call(this.context)) : this.destroy();
        }), (t.destroy = function() {
          if ((e.destroy.call(this), this.tweens)) {
            var t;
            for (t = this.tweens.length; t--; )
              this.tweens[t].destroy();
            (this.tweens = null), (this.current = null);
          }
        });
      }),
      Z = (e.config = {
        debug: !1,
        defaultUnit: 'px',
        defaultAngle: 'deg',
        keepInherited: !1,
        hideBackface: !1,
        perspective: '',
        fallback: !j.transition,
        agentTests: [],
      });
    (e.fallback = function(t) {
      if (!j.transition) return (Z.fallback = !0);
      Z.agentTests.push('(' + t + ')');
      var e = new RegExp(Z.agentTests.join('|'), 'i');
      Z.fallback = e.test(navigator.userAgent);
    }), e.fallback('6.0.[2-5] Safari'), (e.tween = function(t) {
      return new X(t);
    }), (e.delay = function(t, e, n) {
      return new H({ complete: e, duration: t, context: n });
    }), (t.fn.tram = function(t) {
      return e.call(null, this, t);
    });
    var U = t.style,
      Y = t.css,
      G = { transform: j.transform && j.transform.css },
      Q = {
        color: [N, y],
        background: [N, y, 'background-color'],
        'outline-color': [N, y],
        'border-color': [N, y],
        'border-top-color': [N, y],
        'border-right-color': [N, y],
        'border-bottom-color': [N, y],
        'border-left-color': [N, y],
        'border-width': [B, x],
        'border-top-width': [B, x],
        'border-right-width': [B, x],
        'border-bottom-width': [B, x],
        'border-left-width': [B, x],
        'border-spacing': [B, x],
        'letter-spacing': [B, x],
        margin: [B, x],
        'margin-top': [B, x],
        'margin-right': [B, x],
        'margin-bottom': [B, x],
        'margin-left': [B, x],
        padding: [B, x],
        'padding-top': [B, x],
        'padding-right': [B, x],
        'padding-bottom': [B, x],
        'padding-left': [B, x],
        'outline-width': [B, x],
        opacity: [B, b],
        top: [B, k],
        right: [B, k],
        bottom: [B, k],
        left: [B, k],
        'font-size': [B, k],
        'text-indent': [B, k],
        'word-spacing': [B, k],
        width: [B, k],
        'min-width': [B, k],
        'max-width': [B, k],
        height: [B, k],
        'min-height': [B, k],
        'max-height': [B, k],
        'line-height': [B, T],
        'scroll-top': [P, b, 'scrollTop'],
        'scroll-left': [P, b, 'scrollLeft'],
      },
      J = {};
    j.transform &&
      ((Q.transform = [F]), (J = {
        x: [k, 'translateX'],
        y: [k, 'translateY'],
        rotate: [_],
        rotateX: [_],
        rotateY: [_],
        scale: [b],
        scaleX: [b],
        scaleY: [b],
        skew: [_],
        skewX: [_],
        skewY: [_],
      })), j.transform &&
      j.backface &&
      ((J.z = [k, 'translateZ']), (J.rotateZ = [_]), (J.scaleZ = [b]), (J.perspective = [x]));
    var V = /ms/, K = /s|\./;
    return (t.tram = e);
  })(window.jQuery);
  var e = {},
    n = t(function(t) {
      var n = window.$,
        i =
          e &&
          n.tram; /*!
   * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
   * _.each
   * _.map
   * _.find
   * _.filter
   * _.any
   * _.contains
   * _.delay
   * _.defer
   * _.throttle (webflow)
   * _.debounce
   * _.keys
   * _.has
   * _.now
   *
   * http://underscorejs.org
   * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
   * Underscore may be freely distributed under the MIT license.
   * @license MIT
   */
      t.exports = (function() {
        var t = {};
        t.VERSION = '1.6.0-Webflow';
        var e = {},
          n = Array.prototype,
          r = Object.prototype,
          o = Function.prototype,
          a = (n.push, n.slice),
          s = (n.concat, r.toString, r.hasOwnProperty),
          u = n.forEach,
          c = n.map,
          l = (n.reduce, n.reduceRight, n.filter),
          f = (n.every, n.some),
          d = n.indexOf,
          h = (n.lastIndexOf, Array.isArray, Object.keys),
          p = (o.bind, (t.each = t.forEach = function(n, i, r) {
            if (null == n) return n;
            if (u && n.forEach === u) n.forEach(i, r);
            else if (n.length === +n.length) {
              for (var o = 0, a = n.length; o < a; o++)
                if (i.call(r, n[o], o, n) === e) return;
            } else
              for (var s = t.keys(n), o = 0, a = s.length; o < a; o++)
                if (i.call(r, n[s[o]], s[o], n) === e) return;
            return n;
          }));
        (t.map = t.collect = function(t, e, n) {
          var i = [];
          return null == t
            ? i
            : c && t.map === c
                ? t.map(e, n)
                : (p(t, function(t, r, o) {
                    i.push(e.call(n, t, r, o));
                  }), i);
        }), (t.find = t.detect = function(t, e, n) {
          var i;
          return v(t, function(t, r, o) {
            if (e.call(n, t, r, o)) return (i = t), !0;
          }), i;
        }), (t.filter = t.select = function(t, e, n) {
          var i = [];
          return null == t
            ? i
            : l && t.filter === l
                ? t.filter(e, n)
                : (p(t, function(t, r, o) {
                    e.call(n, t, r, o) && i.push(t);
                  }), i);
        });
        var v = (t.some = t.any = function(n, i, r) {
          i || (i = t.identity);
          var o = !1;
          return null == n
            ? o
            : f && n.some === f
                ? n.some(i, r)
                : (p(n, function(t, n, a) {
                    if (o || (o = i.call(r, t, n, a))) return e;
                  }), !!o);
        });
        (t.contains = t.include = function(t, e) {
          return (
            null != t &&
            (d && t.indexOf === d
              ? -1 != t.indexOf(e)
              : v(t, function(t) {
                  return t === e;
                }))
          );
        }), (t.delay = function(t, e) {
          var n = a.call(arguments, 2);
          return setTimeout(function() {
            return t.apply(null, n);
          }, e);
        }), (t.defer = function(e) {
          return t.delay.apply(t, [e, 1].concat(a.call(arguments, 1)));
        }), (t.throttle = function(t) {
          var e, n, r;
          return function() {
            e ||
              ((e = !0), (n = arguments), (r = this), i.frame(function() {
                (e = !1), t.apply(r, n);
              }));
          };
        }), (t.debounce = function(e, n, i) {
          var r,
            o,
            a,
            s,
            u,
            c = function() {
              var l = t.now() - s;
              l < n
                ? (r = setTimeout(c, n - l))
                : ((r = null), i || ((u = e.apply(a, o)), (a = o = null)));
            };
          return function() {
            (a = this), (o = arguments), (s = t.now());
            var l = i && !r;
            return r || (r = setTimeout(c, n)), l && ((u = e.apply(a, o)), (a = o = null)), u;
          };
        }), (t.defaults = function(e) {
          if (!t.isObject(e)) return e;
          for (var n = 1, i = arguments.length; n < i; n++) {
            var r = arguments[n];
            for (var o in r)
              void 0 === e[o] && (e[o] = r[o]);
          }
          return e;
        }), (t.keys = function(e) {
          if (!t.isObject(e)) return [];
          if (h) return h(e);
          var n = [];
          for (var i in e)
            t.has(e, i) && n.push(i);
          return n;
        }), (t.has = function(t, e) {
          return s.call(t, e);
        }), (t.isObject = function(t) {
          return t === Object(t);
        }), (t.now =
          Date.now ||
          function() {
            return new Date().getTime();
          }), (t.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
        var m = /(.)^/,
          g = { "'": "'", '\\': '\\', '\r': 'r', '\n': 'n', '\u2028': 'u2028', '\u2029': 'u2029' },
          w = /\\|'|\r|\n|\u2028|\u2029/g,
          b = function(t) {
            return '\\' + g[t];
          };
        return (t.template = function(e, n, i) {
          !n && i && (n = i), (n = t.defaults({}, n, t.templateSettings));
          var r = RegExp(
            [(n.escape || m).source, (n.interpolate || m).source, (n.evaluate || m).source].join(
              '|',
            ) + '|$',
            'g',
          ),
            o = 0,
            a = "__p+='";
          e.replace(r, function(t, n, i, r, s) {
            return (a += e
              .slice(o, s)
              .replace(
                w,
                b,
              )), (o = s + t.length), n ? (a += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'") : i ? (a += "'+\n((__t=(" + i + "))==null?'':__t)+\n'") : r && (a += "';\n" + r + "\n__p+='"), t;
          }), (a += "';\n"), n.variable || (a = 'with(obj||{}){\n' + a + '}\n'), (a =
            "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" +
            a +
            'return __p;\n');
          try {
            var s = new Function(n.variable || 'obj', '_', a);
          } catch (t) {
            throw ((t.source = a), t);
          }
          var u = function(e) {
            return s.call(this, e, t);
          },
            c = n.variable || 'obj';
          return (u.source = 'function(' + c + '){\n' + a + '}'), u;
        }), t;
      })();
    }),
    i = n && 'object' == typeof n && 'default' in n ? n.default : n,
    r = t(function(t) {
      function n(t) {
        f.env() &&
          (w(t.design) && m.on('__wf_design', t.design), w(t.preview) &&
            m.on(
              '__wf_preview',
              t.preview,
            )), w(t.destroy) && m.on('__wf_destroy', t.destroy), t.ready && w(t.ready) && r(t);
      }
      function r(t) {
        x ? t.ready() : b.contains(h, t.ready) || h.push(t.ready);
      }
      function o(t) {
        w(t.design) &&
          m.off(
            '__wf_design',
            t.design,
          ), w(t.preview) && m.off('__wf_preview', t.preview), w(t.destroy) && m.off('__wf_destroy', t.destroy), t.ready && w(t.ready) && a(t);
      }
      function a(t) {
        h = b.filter(h, function(e) {
          return e !== t.ready;
        });
      }
      function s(t, e) {
        var n = [], i = {};
        return (i.up = b.throttle(function(t) {
          b.each(n, function(e) {
            e(t);
          });
        })), t && e && t.on(e, i.up), (i.on = function(t) {
          'function' == typeof t && (b.contains(n, t) || n.push(t));
        }), (i.off = function(t) {
          n = arguments.length
            ? b.filter(n, function(e) {
                return e !== t;
              })
            : [];
        }), i;
      }
      function u(t) {
        w(t) && t();
      }
      function c() {
        (k = !1), b.each(d, n);
      }
      function l() {
        E &&
          (E.reject(), m.off('load', E.resolve)), (E = new v.Deferred()), m.on('load', E.resolve);
      }
      var f = {},
        d = {},
        h = [],
        p = window.Webflow || [],
        v = window.jQuery,
        m = v(window),
        g = v(document),
        w = v.isFunction,
        b = (f._ = i),
        y = e && v.tram,
        x = !1,
        k = !1;
      (y.config.hideBackface = !1), (y.config.keepInherited = !0), (f.define = function(t, e, i) {
        d[t] && o(d[t]);
        var r = (d[t] = e(v, b, i) || {});
        return n(r), r;
      }), (f.require = function(t) {
        return d[t];
      }), (f.push = function(t) {
        x ? w(t) && t() : p.push(t);
      }), (f.env = function(t) {
        var e = window.__wf_design, n = void 0 !== e;
        return t
          ? 'design' === t
              ? n && e
              : 'preview' === t
                  ? n && !e
                  : 'slug' === t
                      ? n && window.__wf_slug
                      : 'editor' === t
                          ? window.WebflowEditor
                          : 'test' === t
                              ? window.__wf_test
                              : 'frame' === t ? window !== window.top : void 0
          : n;
      });
      var _ = navigator.userAgent.toLowerCase(),
        T = navigator.appVersion.toLowerCase(),
        z = (f.env.touch =
          'ontouchstart' in window ||
          (window.DocumentTouch && document instanceof window.DocumentTouch)),
        O = (f.env.chrome =
          /chrome/.test(_) &&
          /Google/.test(navigator.vendor) &&
          parseInt(T.match(/chrome\/(\d+)\./)[1], 10)),
        L = (f.env.ios = /(ipod|iphone|ipad)/.test(_));
      f.env.safari = /safari/.test(_) && !O && !L;
      var M;
      z &&
        g.on('touchstart mousedown', function(t) {
          M = t.target;
        }), (f.validClick = z
        ? function(t) {
            return t === M || v.contains(t, M);
          }
        : function() {
            return !0;
          });
      var A = 'resize.webflow orientationchange.webflow load.webflow';
      (f.resize = s(
        m,
        A,
      )), (f.scroll = s(m, 'scroll.webflow resize.webflow orientationchange.webflow load.webflow')), (f.redraw = s()), (f.location = function(
        t,
      ) {
        window.location = t;
      }), f.env() &&
        (f.location = function(t) {
          window.dispatchEvent(new CustomEvent('__wf_location', { detail: t }));
        }), (f.ready = function() {
        (x = !0), k ? c() : b.each(h, u), b.each(p, u), f.resize.up();
      });
      var E;
      (f.load = function(t) {
        E.then(t);
      }), (f.destroy = function(t) {
        (t = t || {}), (k = !0), m.triggerHandler('__wf_destroy'), null != t.domready &&
          (x = t.domready), b.each(d, o), f.resize.off(), f.scroll.off(), f.redraw.off(), (h = [
        ]), (p = []), 'pending' === E.state() && l();
      }), v(f.ready), l(), (t.exports = window.Webflow = f);
    }),
    o = r && 'object' == typeof r && 'default' in r ? r.default : r,
    a = (t(function(t) {
      var e = o;
      e.define(
        'brand',
        (t.exports = function(t) {
          function n() {
            var e = t('<a class="w-webflow-badge"></a>').attr(
              'href',
              'https://webflow.com?utm_campaign=brandjs',
            ),
              n = t('<img>')
                .attr(
                  'src',
                  'https://d1otoma47x30pg.cloudfront.net/img/webflow-badge-icon.60efbf6ec9.svg',
                )
                .css({ marginRight: '8px', width: '16px' }),
              i = t('<img>').attr(
                'src',
                'https://d1otoma47x30pg.cloudfront.net/img/webflow-badge-text.6faa6a38cd.svg',
              );
            return e.append(n, i), e[0];
          }
          function i() {
            var t = s.children(u), n = t.length && t.get(0) === r, i = e.env('editor');
            n ? i && t.remove() : (t.length && t.remove(), i || s.append(r));
          }
          var r,
            o = {},
            a = t('html'),
            s = t('body'),
            u = '.w-webflow-badge',
            c = window.location,
            l = /PhantomJS/i.test(navigator.userAgent);
          return (o.ready = function() {
            var t = a.attr('data-wf-status'), e = a.attr('data-wf-domain') || '';
            /\.webflow\.io$/i.test(e) && c.hostname !== e && (t = !0), t &&
              !l &&
              ((r = r || n()), i(), setTimeout(i, 500));
          }), o;
        }),
      );
    }), t(function(t) {
      var e = window.jQuery,
        n = {},
        i = [],
        r = {
          reset: function(t, e) {
            e.__wf_intro = null;
          },
          intro: function(t, i) {
            i.__wf_intro || ((i.__wf_intro = !0), e(i).triggerHandler(n.types.INTRO));
          },
          outro: function(t, i) {
            i.__wf_intro && ((i.__wf_intro = null), e(i).triggerHandler(n.types.OUTRO));
          },
        };
      (n.triggers = {
      }), (n.types = { INTRO: 'w-ix-intro.w-ix', OUTRO: 'w-ix-outro.w-ix' }), (n.init = function() {
        for (var t = i.length, o = 0; o < t; o++) {
          var a = i[o];
          a[0](0, a[1]);
        }
        (i = []), e.extend(n.triggers, r);
      }), (n.async = function() {
        for (var t in r) {
          var e = r[t];
          r.hasOwnProperty(t) &&
            (n.triggers[t] = function(t, n) {
              i.push([e, n]);
            });
        }
      }), n.async(), (t.exports = n);
    })),
    s = a && 'object' == typeof a && 'default' in a ? a.default : a;
  t(function(t) {
    var e = o, n = s;
    e.define(
      'dropdown',
      (t.exports = function(t, i) {
        function r() {
          (w = x && e.env('design')), (g = y.find(_)).each(o);
        }
        function o(e, n) {
          var i = t(n), r = t.data(n, _);
          r || (r = t.data(n, _, { open: !1, el: i, config: {} })), (r.list = i.children(
            '.w-dropdown-list',
          )), (r.toggle = i.children('.w-dropdown-toggle')), (r.links = r.list.children(
            '.w-dropdown-link',
          )), (r.outside = h(r)), (r.complete = p(r)), (r.leave = m(r)), i.off(_), r.toggle.off(
            _,
          ), a(r), r.nav && r.nav.off(_), (r.nav = i.closest('.w-nav')), r.nav.on(z, s(r)), w
            ? i.on('setting' + _, s(r))
            : (r.toggle.on('tap' + _, u(r)), r.config.hover &&
                r.toggle.on('mouseenter' + _, v(r)), i.on(z, s(r)), x && l(r));
        }
        function a(t) {
          var e = Number(t.el.css('z-index'));
          (t.manageZ = e === L || e === L + 1), (t.config = {
            hover: Boolean(t.el.attr('data-hover')) && !k,
            delay: Number(t.el.attr('data-delay')) || 0,
          });
        }
        function s(t) {
          return function(e, n) {
            return (n = n || {}), 'w-close' === e.type
              ? l(t)
              : 'setting' === e.type
                  ? (a(t), !0 === n.open && c(t, !0), void (!1 === n.open && l(t, !0)))
                  : void 0;
          };
        }
        function u(t) {
          return i.debounce(function() {
            t.open ? l(t) : c(t);
          });
        }
        function c(t) {
          t.open ||
            (d(t), (t.open = !0), t.list.addClass(T), t.toggle.addClass(T), O.intro(
              0,
              t.el[0],
            ), e.redraw.up(), t.manageZ && t.el.css('z-index', L + 1), w ||
              y.on('mouseup' + _, t.outside), t.hovering &&
              t.el.on('mouseleave' + _, t.leave), window.clearTimeout(t.delayId));
        }
        function l(t, e) {
          if (t.open && (!t.config.hover || !t.hovering)) {
            t.open = !1;
            var n = t.config;
            if (
              (O.outro(0, t.el[0]), y.off('mouseup' + _, t.outside), t.el.off(
                'mouseleave' + _,
                t.leave,
              ), window.clearTimeout(t.delayId), !n.delay || e)
            )
              return t.complete();
            t.delayId = window.setTimeout(t.complete, n.delay);
          }
        }
        function f() {
          y.find(_).each(function(e, n) {
            t(n).triggerHandler(z);
          });
        }
        function d(e) {
          var n = e.el[0];
          g.each(function(e, i) {
            var r = t(i);
            r.is(n) || r.has(n).length || r.triggerHandler(z);
          });
        }
        function h(n) {
          return n.outside && y.off('mouseup' + _, n.outside), i.debounce(function(i) {
            if (n.open) {
              var r = t(i.target);
              if (!r.closest('.w-dropdown-toggle').length) {
                var o = -1 === t.inArray(n.el[0], r.parents(_)), a = e.env('editor');
                if (o) {
                  if (a) {
                    var s = 1 === r.parents().length && 1 === r.parents('svg').length,
                      u = r.parents('.w-editor-bem-EditorHoverControls').length;
                    if (s || u) return;
                  }
                  l(n);
                }
              }
            }
          });
        }
        function p(t) {
          return function() {
            t.list.removeClass(T), t.toggle.removeClass(T), t.manageZ && t.el.css('z-index', '');
          };
        }
        function v(t) {
          return function() {
            (t.hovering = !0), c(t);
          };
        }
        function m(t) {
          return function() {
            (t.hovering = !1), l(t);
          };
        }
        var g,
          w,
          b = {},
          y = t(document),
          x = e.env(),
          k = e.env.touch,
          _ = '.w-dropdown',
          T = 'w--open',
          z = 'w-close' + _,
          O = n.triggers,
          L = 900,
          M = !1;
        return (b.ready = r), (b.design = function() {
          M && f(), (M = !1), r();
        }), (b.preview = function() {
          (M = !0), r();
        }), b;
      }),
    );
  }), t(function(t) {
    /*!
   * jQuery-ajaxTransport-XDomainRequest - v1.0.3
   * 2014-12-16 WEBFLOW - Removed UMD wrapper
   * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
   * Copyright (c) 2014 Jason Moon (@JSONMOON)
   * @license MIT (/blob/master/LICENSE.txt)
   */
    t.exports = (function(t) {
      if (!t.support.cors && t.ajaxTransport && window.XDomainRequest) {
        var e = /^https?:\/\//i, n = /^get|post$/i, i = new RegExp('^' + location.protocol, 'i');
        t.ajaxTransport('* text html xml json', function(r, o, a) {
          if (r.crossDomain && r.async && n.test(r.type) && e.test(r.url) && i.test(r.url)) {
            var s = null;
            return {
              send: function(e, n) {
                var i = '', a = (o.dataType || '').toLowerCase();
                (s = new XDomainRequest()), /^\d+$/.test(o.timeout) &&
                  (s.timeout = o.timeout), (s.ontimeout = function() {
                  n(500, 'timeout');
                }), (s.onload = function() {
                  var e =
                    'Content-Length: ' +
                    s.responseText.length +
                    '\r\nContent-Type: ' +
                    s.contentType,
                    i = { code: 200, message: 'success' },
                    r = { text: s.responseText };
                  try {
                    if ('html' === a || /text\/html/i.test(s.contentType)) r.html = s.responseText;
                    else if ('json' === a || ('text' !== a && /\/json/i.test(s.contentType)))
                      try {
                        r.json = t.parseJSON(s.responseText);
                      } catch (t) {
                        (i.code = 500), (i.message = 'parseerror');
                      }
                    else if ('xml' === a || ('text' !== a && /\/xml/i.test(s.contentType))) {
                      var o = new ActiveXObject('Microsoft.XMLDOM');
                      o.async = !1;
                      try {
                        o.loadXML(s.responseText);
                      } catch (t) {
                        o = void 0;
                      }
                      if (!o || !o.documentElement || o.getElementsByTagName('parsererror').length)
                        throw ((i.code = 500), (i.message = 'parseerror'), 'Invalid XML: ' +
                          s.responseText);
                      r.xml = o;
                    }
                  } catch (t) {
                    throw t;
                  } finally {
                    n(i.code, i.message, r, e);
                  }
                }), (s.onprogress = function() {}), (s.onerror = function() {
                  n(500, 'error', { text: s.responseText });
                }), o.data && (i = 'string' === t.type(o.data) ? o.data : t.param(o.data)), s.open(
                  r.type,
                  r.url,
                ), s.send(i);
              },
              abort: function() {
                s && s.abort();
              },
            };
          }
        });
      }
    })(window.jQuery);
  }), t(function(t) {
    var e = o;
    e.define(
      'forms',
      (t.exports = function(t, n) {
        function i() {
          (v = t('html').attr('data-wf-site')), (p = t(x + ' form')).length && p.each(r);
        }
        function r(e, n) {
          var i = t(n), r = t.data(n, x);
          r || (r = t.data(n, x, { form: i })), a(r);
          var o = i.closest('div.w-form');
          (r.done = o.find('> .w-form-done')), (r.fail = o.find('> .w-form-fail'));
          var s = (r.action = i.attr('action'));
          (r.handler = null), (r.redirect = i.attr('data-redirect')), O.test(s)
            ? (r.handler = f)
            : s || (v ? (r.handler = l) : L());
        }
        function o() {
          (m = !0), w.on('submit', x + ' form', function(e) {
            var n = t.data(this, x);
            n.handler && ((n.evt = e), n.handler(n));
          });
        }
        function a(t) {
          var e = (t.btn = t.form.find(':input[type="submit"]'));
          (t.wait = t.btn.attr('data-wait') || null), (t.success = !1), e.prop(
            'disabled',
            !1,
          ), t.label && e.val(t.label);
        }
        function s(t) {
          var e = t.btn, n = t.wait;
          e.prop('disabled', !0), n && ((t.label = e.val()), e.val(n));
        }
        function u(e, n) {
          var i = null;
          return (n = n || {}), e.find(':input:not([type="submit"])').each(function(r, o) {
            var a = t(o),
              s = a.attr('type'),
              u = a.attr('data-name') || a.attr('name') || 'Field ' + (r + 1),
              l = a.val();
            if (('checkbox' === s && (l = a.is(':checked')), 'radio' === s)) {
              if (null === n[u] || 'string' == typeof n[u]) return;
              l = e.find('input[name="' + a.attr('name') + '"]:checked').val() || null;
            }
            'string' == typeof l && (l = t.trim(l)), (n[u] = l), (i = i || c(a, s, u, l));
          }), i;
        }
        function c(t, e, n, i) {
          var r = null;
          return 'password' === e
            ? (r = 'Passwords cannot be submitted.')
            : t.attr('required') &&
                (i
                  ? (k.test(n) || k.test(t.attr('type'))) &&
                      (_.test(i) || (r = 'Please enter a valid email address for: ' + n))
                  : (r = 'Please fill out the required field: ' + n)), r;
        }
        function l(n) {
          a(n);
          var i = n.form,
            r = {
              name: i.attr('data-name') || i.attr('name') || 'Untitled Form',
              source: b.href,
              test: e.env(),
              fields: {},
              dolphin: /pass[\s-_]?(word|code)|secret|login|credentials/i.test(i.html()),
            };
          h(n);
          var o = u(i, r.fields);
          if (o) return T(o);
          if ((s(n), v)) {
            var c = 'https://webflow.com/api/v1/form/' + v;
            y &&
              c.indexOf('https://webflow.com') >= 0 &&
              (c = c.replace('https://webflow.com', 'http://formdata.webflow.com')), t
              .ajax({ url: c, type: 'POST', data: r, dataType: 'json', crossDomain: !0 })
              .done(function() {
                (n.success = !0), d(n);
              })
              .fail(function() {
                d(n);
              });
          } else d(n);
        }
        function f(e) {
          a(e);
          var i = e.form, r = {};
          if (!/^https/.test(b.href) || /^https/.test(e.action)) {
            h(e);
            var o = u(i, r);
            if (o) return T(o);
            s(e);
            var c;
            n.each(r, function(t, e) {
              k.test(e) &&
                (r.EMAIL = t), /^((full[ _-]?)?name)$/i.test(e) && (c = t), /^(first[ _-]?name)$/i.test(e) && (r.FNAME = t), /^(last[ _-]?name)$/i.test(e) && (r.LNAME = t);
            }), c &&
              !r.FNAME &&
              ((c = c.split(' ')), (r.FNAME = c[0]), (r.LNAME = r.LNAME || c[1]));
            var l = e.action.replace('/post?', '/post-json?') + '&c=?', f = l.indexOf('u=') + 2;
            f = l.substring(f, l.indexOf('&', f));
            var p = l.indexOf('id=') + 3;
            (p = l.substring(p, l.indexOf('&', p))), (r['b_' + f + '_' + p] = ''), t
              .ajax({ url: l, data: r, dataType: 'jsonp' })
              .done(function(t) {
                (e.success =
                  'success' === t.result ||
                  /already/.test(
                    t.msg,
                  )), e.success || console.info('MailChimp error: ' + t.msg), d(e);
              })
              .fail(function() {
                d(e);
              });
          } else i.attr('method', 'post');
        }
        function d(t) {
          var n = t.form, i = t.redirect, r = t.success;
          r && i ? e.location(i) : (t.done.toggle(r), t.fail.toggle(!r), n.toggle(!r), a(t));
        }
        function h(t) {
          t.evt && t.evt.preventDefault(), (t.evt = null);
        }
        var p,
          v,
          m,
          g = {},
          w = t(document),
          b = window.location,
          y = window.XDomainRequest && !window.atob,
          x = '.w-form',
          k = /e(-)?mail/i,
          _ = /^\S+@\S+$/,
          T = window.alert,
          z = e.env(),
          O = /list-manage[1-9]?.com/i,
          L = n.debounce(function() {
            T(
              'Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.',
            );
          }, 100);
        return (g.ready = g.design = g.preview = function() {
          i(), z || m || o();
        }), g;
      }),
    );
  }), t(function(t) {
    var e = o, n = s;
    e.define(
      'ix',
      (t.exports = function(t, i) {
        function r(t) {
          t &&
            ((O = {}), i.each(t, function(t) {
              O[t.slug] = t.value;
            }), o());
        }
        function o() {
          var i = t('[data-ix]');
          i.length &&
            (i.each(u), i.each(a), L.length && (e.scroll.on(c), setTimeout(c, 1)), M.length &&
              e.load(l), A.length && setTimeout(f, E), n.init(), e.redraw.up());
        }
        function a(r, o) {
          var a = t(o), u = a.attr('data-ix'), c = O[u];
          if (c) {
            var l = c.triggers;
            l &&
              (g.style(a, c.style), i.each(l, function(t) {
                function i() {
                  d(t, a, { group: 'A' });
                }
                function r() {
                  d(t, a, { group: 'B' });
                }
                var o = {}, u = t.type, c = t.stepsB && t.stepsB.length;
                if ('load' !== u) {
                  if ('click' === u)
                    return a.on('click' + b, function(n) {
                      e.validClick(n.currentTarget) &&
                        ('#' === a.attr('href') && n.preventDefault(), d(t, a, {
                          group: o.clicked ? 'B' : 'A',
                        }), c && (o.clicked = !o.clicked));
                    }), void (z = z.add(a));
                  if ('hover' === u)
                    return a.on('mouseenter' + b, i), a.on('mouseleave' + b, r), void (z = z.add(
                      a,
                    ));
                  if ('scroll' !== u) {
                    var l = C[u];
                    if (l) {
                      var f = a.closest(l);
                      return f.on(n.types.INTRO, i).on(n.types.OUTRO, r), void (z = z.add(f));
                    }
                  } else
                    L.push({
                      el: a,
                      trigger: t,
                      state: { active: !1 },
                      offsetTop: s(t.offsetTop),
                      offsetBot: s(t.offsetBot),
                    });
                } else t.preload && !k ? M.push(i) : A.push(i);
              }));
          }
        }
        function s(t) {
          if (!t) return 0;
          t = String(t);
          var e = parseInt(t, 10);
          return e !== e ? 0 : (t.indexOf('%') > 0 && (e /= 100) >= 1 && (e = 0.999), e);
        }
        function u(e, n) {
          t(n).off(b);
        }
        function c() {
          for (var t = w.scrollTop(), e = w.height(), n = L.length, i = 0; i < n; i++) {
            var r = L[i],
              o = r.el,
              a = r.trigger,
              s = a.stepsB && a.stepsB.length,
              u = r.state,
              c = o.offset().top,
              l = o.outerHeight(),
              f = r.offsetTop,
              h = r.offsetBot;
            f < 1 && f > 0 && (f *= e), h < 1 && h > 0 && (h *= e);
            var p = c + l - f >= t && c + h <= t + e;
            p !== u.active &&
              ((!1 !== p || s) && ((u.active = p), d(a, o, { group: p ? 'A' : 'B' })));
          }
        }
        function l() {
          for (var t = M.length, e = 0; e < t; e++)
            M[e]();
        }
        function f() {
          for (var t = A.length, e = 0; e < t; e++)
            A[e]();
        }
        function d(e, n, i, r) {
          function o() {
            if (c) return d(e, n, i, !0);
            'auto' === m.width && p.set({ width: 'auto' }), 'auto' === m.height &&
              p.set({ height: 'auto' }), a && a();
          }
          var a = (i = i || {}).done, s = e.preserve3d;
          if (!v || i.force) {
            var u = i.group || 'A', c = e['loop' + u], l = e['steps' + u];
            if (l && l.length) {
              if ((l.length < 2 && (c = !1), !r)) {
                var f = e.selector;
                f &&
                  ((n = e.descend ? n.find(f) : e.siblings ? n.siblings(f) : t(f)), k &&
                    n.attr('data-ix-affect', 1)), _ && n.addClass('w-ix-emptyfix'), s &&
                  n.css('transform-style', 'preserve-3d');
              }
              for (var p = y(n), m = { omit3d: !s }, g = 0; g < l.length; g++)
                h(p, l[g], m);
              m.start ? p.then(o) : o();
            }
          }
        }
        function h(t, n, i) {
          var r = 'add', o = 'start';
          i.start && (r = o = 'then');
          var a = n.transition;
          if (a) {
            a = a.split(',');
            for (var s = 0; s < a.length; s++) {
              var u = a[s];
              t[r](u);
            }
          }
          var c = p(n, i) || {};
          if (
            (null != c.width && (i.width = c.width), null != c.height &&
              (i.height = c.height), null == a)
          ) {
            i.start
              ? t.then(function() {
                  var n = this.queue;
                  this.set(
                    c,
                  ), c.display && (t.redraw(), e.redraw.up()), (this.queue = n), this.next();
                })
              : (t.set(c), c.display && (t.redraw(), e.redraw.up()));
            var l = c.wait;
            null != l && (t.wait(l), (i.start = !0));
          } else {
            if (c.display) {
              var f = c.display;
              delete c.display, i.start
                ? t.then(function() {
                    var t = this.queue;
                    this.set({ display: f }).redraw(), e.redraw.up(), (this.queue = t), this.next();
                  })
                : (t.set({ display: f }).redraw(), e.redraw.up());
            }
            t[o](c), (i.start = !0);
          }
        }
        function p(t, e) {
          var n = e && e.omit3d, i = {}, r = !1;
          for (var o in t)
            'transition' !== o &&
              'keysort' !== o &&
              (!n || ('z' !== o && 'rotateX' !== o && 'rotateY' !== o && 'scaleZ' !== o)) &&
              ((i[o] = t[o]), (r = !0));
          return r ? i : null;
        }
        var v,
          m,
          g = {},
          w = t(window),
          b = '.w-ix',
          y = t.tram,
          x = e.env,
          k = x(),
          _ = x.chrome && x.chrome < 35,
          T = 'none 0s ease 0s',
          z = t(),
          O = {},
          L = [],
          M = [],
          A = [],
          E = 1,
          C = {
            tabs: '.w-tab-link, .w-tab-pane',
            dropdown: '.w-dropdown',
            slider: '.w-slide',
            navbar: '.w-nav',
          };
        return (g.init = function(t) {
          setTimeout(function() {
            r(t);
          }, 1);
        }), (g.preview = function() {
          (v = !1), (E = 100), setTimeout(function() {
            r(window.__wf_ix);
          }, 1);
        }), (g.design = function() {
          (v = !0), g.destroy();
        }), (g.destroy = function() {
          (m = !0), z.each(u), e.scroll.off(c), n.async(), (L = []), (M = []), (A = []);
        }), (g.ready = function() {
          if (k) return x('design') ? g.design() : g.preview();
          O && m && ((m = !1), o());
        }), (g.run = d), (g.style = k
          ? function(e, n) {
              var i = y(e);
              if (!t.isEmptyObject(n)) {
                e.css('transition', '');
                var r = e.css('transition');
                r === T && (r = i.upstream = null), (i.upstream = T), i.set(p(n)), (i.upstream = r);
              }
            }
          : function(t, e) {
              y(t).set(p(e));
            }), g;
      }),
    );
  }), t(function(t) {
    function e(t, e, n, i) {
      function r(t, e) {
        return (O = _(t) ? t : [t]), y || r.build(), O.length > 1 &&
          ((y.items = y.empty), O.forEach(function(t) {
            var e = g('thumbnail'), n = g('item').append(e);
            (y.items = y.items.add(n)), c(t.thumbnailUrl || t.url, function(t) {
              t.prop('width') > t.prop('height')
                ? p(t, 'wide')
                : p(t, 'tall'), e.append(p(t, 'thumbnail-image'));
            });
          }), y.strip.empty().append(y.items), p(
            y.content,
            'group',
          )), k(v(y.lightbox, 'hide').focus()).add('opacity .3s').start({ opacity: 1 }), p(y.html, 'noscroll'), r.show(e || 0);
      }
      function o(t) {
        return function(e) {
          this === e.target && (e.stopPropagation(), e.preventDefault(), t());
        };
      }
      function a(t) {
        t.preventDefault();
      }
      function s(t) {
        var e = t.keyCode;
        27 === e ? r.hide() : 37 === e ? r.prev() : 39 === e && r.next();
      }
      function u() {
        y &&
          (v(y.html, 'noscroll'), p(y.lightbox, 'hide'), y.strip.empty(), y.view &&
            y.view.remove(), v(y.content, 'group'), p(y.arrowLeft, 'inactive'), p(
            y.arrowRight,
            'inactive',
          ), (b = y.view = void 0));
      }
      function c(t, e) {
        var n = g('img', 'img');
        return n.one('load', function() {
          e(n);
        }), n.attr('src', t), n;
      }
      function l(t) {
        return function() {
          t.remove();
        };
      }
      function f(t, e, n) {
        (this.$element = t), (this.className = e), (this.delay = n || 200), this.hide();
      }
      function d(t, e) {
        return t.replace(z, (e ? ' .' : ' ') + T);
      }
      function h(t) {
        return d(t, !0);
      }
      function p(t, e) {
        return t.addClass(d(e));
      }
      function v(t, e) {
        return t.removeClass(d(e));
      }
      function m(t, e, n) {
        return t.toggleClass(d(e), n);
      }
      function g(t, i) {
        return p(n(e.createElement(i || 'div')), t);
      }
      function w(t, e) {
        var n = '<svg xmlns="http://www.w3.org/2000/svg" width="' + t + '" height="' + e + '"/>';
        return 'data:image/svg+xml;charset=utf-8,' + encodeURI(n);
      }
      var b, y, x, k = n.tram, _ = Array.isArray, T = 'w-lightbox-', z = /(^|\s+)/g, O = [];
      (r.build = function() {
        return r.destroy(), (y = { html: n(e.documentElement), empty: n() }), (y.arrowLeft = g(
          'control left inactive',
        )), (y.arrowRight = g('control right inactive')), (y.close = g(
          'control close',
        )), (y.spinner = g('spinner')), (y.strip = g('strip')), (x = new f(
          y.spinner,
          d('hide'),
        )), (y.content = g('content').append(
          y.spinner,
          y.arrowLeft,
          y.arrowRight,
          y.close,
        )), (y.container = g('container').append(y.content, y.strip)), (y.lightbox = g(
          'backdrop hide',
        ).append(y.container)), y.strip.on('tap', h('item'), E), y.content
          .on('swipe', C)
          .on('tap', h('left'), L)
          .on('tap', h('right'), M)
          .on('tap', h('close'), A)
          .on('tap', h('image, caption'), M), y.container
          .on('tap', h('view, strip'), A)
          .on('dragstart', h('img'), a), y.lightbox.on('keydown', s).on('focusin', j), n(i).append(
          y.lightbox.prop('tabIndex', 0),
        ), r;
      }), (r.destroy = function() {
        y && (v(y.html, 'noscroll'), y.lightbox.remove(), (y = void 0));
      }), (r.show = function(t) {
        if (t !== b) {
          var e = O[t];
          if (!e) return r.hide();
          var i = b;
          return (b = t), x.show(), c((e.html && w(e.width, e.height)) || e.url, function(r) {
            function o() {
              x.hide(), t === b ? (m(y.arrowLeft, 'inactive', t <= 0), m(y.arrowRight, 'inactive', t >= O.length - 1), y.view ? (k(y.view).add('opacity .3s').start({ opacity: 0 }).then(l(y.view)), k(f).add('opacity .3s').add('transform .3s').set({ x: t > i ? '80px' : '-80px' }).start({ opacity: 1, x: 0 })) : f.css('opacity', 1), (y.view = f), y.items && p(v(y.items, 'active').eq(t), 'active')) : f.remove();
            }
            if (t === b) {
              var a,
                s,
                u = g('figure', 'figure').append(p(r, 'image')),
                c = g('frame').append(u),
                f = g('view').append(c);
              e.html &&
                ((s = (a = n(e.html)).is('iframe')) && a.on('load', o), u.append(
                  p(a, 'embed'),
                )), e.caption &&
                u.append(g('caption', 'figcaption').text(e.caption)), y.spinner.before(f), s || o();
            }
          }), r;
        }
      }), (r.hide = function() {
        return k(y.lightbox).add('opacity .3s').start({ opacity: 0 }).then(u), r;
      }), (r.prev = function() {
        b > 0 && r.show(b - 1);
      }), (r.next = function() {
        b < O.length - 1 && r.show(b + 1);
      });
      var L = o(r.prev),
        M = o(r.next),
        A = o(r.hide),
        E = function(t) {
          var e = n(this).index();
          t.preventDefault(), r.show(e);
        },
        C = function(t, e) {
          t.preventDefault(), 'left' === e.direction
            ? r.next()
            : 'right' === e.direction && r.prev();
        },
        j = function() {
          this.focus();
        };
      return (f.prototype.show = function() {
        var t = this;
        t.timeoutId ||
          (t.timeoutId = setTimeout(function() {
            t.$element.removeClass(t.className), delete t.timeoutId;
          }, t.delay));
      }), (f.prototype.hide = function() {
        var t = this;
        if (t.timeoutId) return clearTimeout(t.timeoutId), void delete t.timeoutId;
        t.$element.addClass(t.className);
      }), (function() {
        function n() {
          var e = t.innerHeight,
            n = t.innerWidth,
            i =
              '.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:' +
              e +
              'px}.w-lightbox-view {width:' +
              n +
              'px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:' +
              0.86 * e +
              'px}.w-lightbox-image {max-width:' +
              n +
              'px;max-height:' +
              e +
              'px}.w-lightbox-group .w-lightbox-image {max-height:' +
              0.86 * e +
              'px}.w-lightbox-strip {padding: 0 ' +
              0.01 * e +
              'px}.w-lightbox-item {width:' +
              0.1 * e +
              'px;padding:' +
              0.02 * e +
              'px ' +
              0.01 * e +
              'px}.w-lightbox-thumbnail {height:' +
              0.1 * e +
              'px}@media (min-width: 768px) {.w-lightbox-content, .w-lightbox-view, .w-lightbox-view:before {height:' +
              0.96 * e +
              'px}.w-lightbox-content {margin-top:' +
              0.02 * e +
              'px}.w-lightbox-group, .w-lightbox-group .w-lightbox-view, .w-lightbox-group .w-lightbox-view:before {height:' +
              0.84 * e +
              'px}.w-lightbox-image {max-width:' +
              0.96 * n +
              'px;max-height:' +
              0.96 * e +
              'px}.w-lightbox-group .w-lightbox-image {max-width:' +
              0.823 * n +
              'px;max-height:' +
              0.84 * e +
              'px}}';
          a.textContent = i;
        }
        var i = t.navigator.userAgent, r = /(iPhone|iPad|iPod);[^OS]*OS (\d)/, o = i.match(r);
        if ((i.indexOf('Android ') > -1 && -1 === i.indexOf('Chrome')) || (o && !(o[2] > 7))) {
          var a = e.createElement('style');
          e.head.appendChild(a), t.addEventListener('orientationchange', n, !0), n();
        }
      })(), r;
    }
    var n = o;
    n.define(
      'lightbox',
      (t.exports = function(t) {
        function i(t) {
          var e, n, i = t.el.children('.w-json').html();
          if (i) {
            try {
              i = JSON.parse(i);
            } catch (t) {
              console.error('Malformed lightbox JSON configuration.', t);
            }
            o(i), (e = i.group)
              ? ((n = u[e]) || (n = u[e] = []), (t.items = n), i.items.length &&
                  ((t.index = n.length), n.push.apply(n, i.items)))
              : (t.items = i.items);
          } else t.items = [];
        }
        function r(t) {
          return function() {
            t.items.length && f(t.items, t.index || 0);
          };
        }
        function o(t) {
          t.images &&
            (t.images.forEach(function(t) {
              t.type = 'image';
            }), (t.items = t.images)), t.embed &&
            ((t.embed.type = 'video'), (t.items = [t.embed])), t.groupId && (t.group = t.groupId);
        }
        var a,
          s,
          u,
          c = {},
          l = n.env(),
          f = e(window, document, t, l ? '#lightbox-mountpoint' : 'body'),
          d = t(document),
          h = '.w-lightbox';
        return (c.ready = c.design = c.preview = function() {
          (s = l && n.env('design')), f.destroy(), (u = {}), (a = d.find(h)).webflowLightBox();
        }), jQuery.fn.extend({
          webflowLightBox: function() {
            var e = this;
            t.each(e, function(e, n) {
              var o = t.data(n, h);
              o ||
                (o = t.data(n, h, {
                  el: t(n),
                  mode: 'images',
                  images: [],
                  embed: '',
                })), o.el.off(h), i(o), s
                ? o.el.on('setting' + h, i.bind(null, o))
                : o.el.on('tap' + h, r(o)).on('click' + h, function(t) {
                    t.preventDefault();
                  });
            });
          },
        }), c;
      }),
    );
  }), t(function(t) {
    var e = o;
    e.define(
      'links',
      (t.exports = function(t, n) {
        function i(e) {
          var n = (a && e.getAttribute('href-disabled')) || e.getAttribute('href');
          if (((h.href = n), !(n.indexOf(':') >= 0))) {
            var i = t(e);
            if (0 === n.indexOf('#') && v.test(n)) {
              var r = t(n);
              r.length && s.push({ link: i, sec: r, active: !1 });
            } else if ('#' !== n) {
              var c = h.href === d.href || n === u || (m.test(n) && g.test(u));
              o(i, p, c);
            }
          }
        }
        function r() {
          var t = l.scrollTop(), e = l.height();
          n.each(s, function(n) {
            var i = n.link,
              r = n.sec,
              a = r.offset().top,
              s = r.outerHeight(),
              u = 0.5 * e,
              c = r.is(':visible') && a + s - u >= t && a + u <= t + e;
            n.active !== c && ((n.active = c), o(i, p, c));
          });
        }
        function o(t, e, n) {
          var i = t.hasClass(e);
          (n && i) || ((n || i) && (n ? t.addClass(e) : t.removeClass(e)));
        }
        var a,
          s,
          u,
          c = {},
          l = t(window),
          f = e.env(),
          d = window.location,
          h = document.createElement('a'),
          p = 'w--current',
          v = /^#[\w:.-]+$/,
          m = /index\.(html|php)$/,
          g = /\/$/;
        return (c.ready = c.design = c.preview = function() {
          (a = f && e.env('design')), (u = e.env('slug') || d.pathname || ''), e.scroll.off(
            r,
          ), (s = []);
          for (var t = document.links, n = 0; n < t.length; ++n)
            i(t[n]);
          s.length && (e.scroll.on(r), r());
        }), c;
      }),
    );
  }), t(function(t) {
    var e = o;
    e.define(
      'maps',
      (t.exports = function(t, n) {
        function i() {
          function e() {
            (window._wf_maps_loaded = function() {}), (h = window.google), l.each(a), r(), o();
          }
          (l = d.find(p)).length &&
            (null === h
              ? (t.getScript(
                  'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=_wf_maps_loaded&key=' +
                    v,
                ), (window._wf_maps_loaded = e))
              : e());
        }
        function r() {
          e.resize.off(s), e.redraw.off(s);
        }
        function o() {
          e.resize.on(s), e.redraw.on(s);
        }
        function a(e, n) {
          c(n, t(n).data());
        }
        function s() {
          l.each(u);
        }
        function u(t, e) {
          var n = c(e);
          h.maps.event.trigger(n.map, 'resize'), n.setMapPosition();
        }
        function c(n, i) {
          var r = t.data(n, m);
          if (r) return r;
          var o = t(n);
          r = t.data(n, m, {
            latLng: '51.511214,-0.119824',
            tooltip: '',
            style: 'roadmap',
            zoom: 12,
            marker: new h.maps.Marker({ draggable: !1 }),
            infowindow: new h.maps.InfoWindow({ disableAutoPan: !0 }),
          });
          var a = i.widgetLatlng || r.latLng;
          r.latLng = a;
          var s = a.split(','), u = new h.maps.LatLng(s[0], s[1]);
          r.latLngObj = u;
          var c = !(e.env.touch && i.disableTouch);
          (r.map = new h.maps.Map(n, {
            center: r.latLngObj,
            zoom: r.zoom,
            maxZoom: 18,
            mapTypeControl: !1,
            panControl: !1,
            streetViewControl: !1,
            scrollwheel: !i.disableScroll,
            draggable: c,
            zoomControl: !0,
            zoomControlOptions: { style: h.maps.ZoomControlStyle.SMALL },
            mapTypeId: r.style,
          })), r.marker.setMap(r.map), (r.setMapPosition = function() {
            r.map.setCenter(r.latLngObj);
            var t = 0,
              e = 0,
              n = o.css(['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']);
            (t -= parseInt(n.paddingLeft, 10)), (t += parseInt(n.paddingRight, 10)), (e -= parseInt(
              n.paddingTop,
              10,
            )), (e += parseInt(n.paddingBottom, 10)), (t || e) && r.map.panBy(t, e), o.css(
              'position',
              '',
            );
          }), h.maps.event.addListener(r.map, 'tilesloaded', function() {
            h.maps.event.clearListeners(r.map, 'tilesloaded'), r.setMapPosition();
          }), r.setMapPosition(), r.marker.setPosition(r.latLngObj), r.infowindow.setPosition(
            r.latLngObj,
          );
          var l = i.widgetTooltip;
          l &&
            ((r.tooltip = l), r.infowindow.setContent(l), r.infowindowOpen ||
              (r.infowindow.open(r.map, r.marker), (r.infowindowOpen = !0)));
          var f = i.widgetStyle;
          f && r.map.setMapTypeId(f);
          var d = i.widgetZoom;
          return null != d &&
            ((r.zoom = d), r.map.setZoom(
              Number(d),
            )), h.maps.event.addListener(r.marker, 'click', function() {
            window.open('https://maps.google.com/?z=' + r.zoom + '&daddr=' + r.latLng);
          }), r;
        }
        var l,
          f = {},
          d = t(document),
          h = null,
          p = '.w-widget-map',
          v = 'AIzaSyCrhlVourjpGkItTZq9LILWkpCpgx1hvSc';
        (f.ready = function() {
          e.env() || i();
        }), (f.destroy = r);
        var m = 'w-widget-map';
        return f;
      }),
    );
  }), t(function(t) {
    var e = o, n = s;
    e.define(
      'navbar',
      (t.exports = function(t, i) {
        function r() {
          e.resize.off(a);
        }
        function o() {
          e.resize.on(a);
        }
        function a() {
          _.each(g);
        }
        function s(e, n) {
          var i = t(n), r = t.data(n, C);
          r || (r = t.data(n, C, { open: !1, el: i, config: {} })), (r.menu = i.find(
            '.w-nav-menu',
          )), (r.links = r.menu.find('.w-nav-link')), (r.dropdowns = r.menu.find(
            '.w-dropdown',
          )), (r.button = i.find('.w-nav-button')), (r.container = i.find(
            '.w-container',
          )), (r.outside = m(r)), r.el.off(C), r.button.off(C), r.menu.off(C), f(r), T
            ? (c(r), r.el.on('setting' + C, d(r)))
            : (l(r), r.button.on('tap' + C, p(r)), r.menu.on('click' + C, 'a', v(r))), g(e, n);
        }
        function u(e, n) {
          var i = t.data(n, C);
          i && (c(i), t.removeData(n, C));
        }
        function c(t) {
          t.overlay && (x(t, !0), t.overlay.remove(), (t.overlay = null));
        }
        function l(e) {
          e.overlay || ((e.overlay = t(E).appendTo(e.el)), (e.parent = e.menu.parent()), x(e, !0));
        }
        function f(t) {
          var e = {},
            n = t.config || {},
            r = (e.animation = t.el.attr('data-animation') || 'default');
          (e.animOver = /^over/.test(r)), (e.animDirect = /left$/.test(r) ? -1 : 1), n.animation !==
            r &&
            t.open &&
            i.defer(h, t), (e.easing = t.el.attr('data-easing') || 'ease'), (e.easing2 =
            t.el.attr('data-easing2') || 'ease');
          var o = t.el.attr('data-duration');
          (e.duration = null != o ? Number(o) : 400), (e.docHeight = t.el.attr(
            'data-doc-height',
          )), (t.config = e);
        }
        function d(t) {
          return function(e, n) {
            n = n || {};
            var r = L.width();
            f(t), !0 === n.open && b(t, !0), !1 === n.open && x(t, !0), t.open &&
              i.defer(function() {
                r !== L.width() && h(t);
              });
          };
        }
        function h(t) {
          t.open && (x(t, !0), b(t, !0));
        }
        function p(t) {
          return i.debounce(function() {
            t.open ? x(t) : b(t);
          });
        }
        function v(n) {
          return function(i) {
            var r = t(this).attr('href');
            e.validClick(i.currentTarget)
              ? r && 0 === r.indexOf('#') && n.open && x(n)
              : i.preventDefault();
          };
        }
        function m(e) {
          return e.outside && M.off('tap' + C, e.outside), i.debounce(function(n) {
            if (e.open) {
              var i = t(n.target).closest('.w-nav-menu');
              e.menu.is(i) || x(e);
            }
          });
        }
        function g(e, n) {
          var i = t.data(n, C), r = (i.collapsed = 'none' !== i.button.css('display'));
          if ((!i.open || r || T || x(i, !0), i.container.length)) {
            var o = w(i);
            i.links.each(o), i.dropdowns.each(o);
          }
          i.open && y(i);
        }
        function w(e) {
          var n = e.container.css(D);
          return 'none' === n && (n = ''), function(e, i) {
            (i = t(i)).css(D, ''), 'none' === i.css(D) && i.css(D, n);
          };
        }
        function b(t, n) {
          if (!t.open) {
            (t.open = !0), t.menu.addClass(I), t.links.addClass(q), t.button.addClass(j);
            var i = t.config;
            ('none' !== i.animation && O.support.transform) || (n = !0);
            var r = y(t),
              o = t.menu.outerHeight(!0),
              a = t.menu.outerWidth(!0),
              s = t.el.height(),
              u = t.el[0];
            if ((g(0, u), $.intro(0, u), e.redraw.up(), T || M.on('tap' + C, t.outside), !n)) {
              var c = 'transform ' + i.duration + 'ms ' + i.easing;
              if ((t.overlay && ((S = t.menu.prev()), t.overlay.show().append(t.menu)), i.animOver))
                return O(t.menu)
                  .add(c)
                  .set({ x: i.animDirect * a, height: r })
                  .start({ x: 0 }), void (t.overlay && t.overlay.width(a));
              var l = s + o;
              O(t.menu).add(c).set({ y: -l }).start({ y: 0 });
            }
          }
        }
        function y(t) {
          var e = t.config, n = e.docHeight ? M.height() : k.height();
          return e.animOver
            ? t.menu.height(n)
            : 'fixed' !== t.el.css('position') && (n -= t.el.height()), t.overlay &&
            t.overlay.height(n), n;
        }
        function x(t, e) {
          function n() {
            t.menu.height(''), O(t.menu).set({ x: 0, y: 0 }), t.menu.removeClass(
              I,
            ), t.links.removeClass(q), t.overlay &&
              t.overlay.children().length &&
              (S.length ? t.menu.insertAfter(S) : t.menu.prependTo(t.parent), t.overlay
                .attr('style', '')
                .hide()), t.el.triggerHandler('w-close');
          }
          if (t.open) {
            (t.open = !1), t.button.removeClass(j);
            var i = t.config;
            if (
              (('none' === i.animation || !O.support.transform || i.duration <= 0) &&
                (e = !0), $.outro(0, t.el[0]), M.off('tap' + C, t.outside), e)
            )
              return O(t.menu).stop(), void n();
            var r = 'transform ' + i.duration + 'ms ' + i.easing2,
              o = t.menu.outerHeight(!0),
              a = t.menu.outerWidth(!0),
              s = t.el.height();
            if (i.animOver) O(t.menu).add(r).start({ x: a * i.animDirect }).then(n);
            else {
              var u = s + o;
              O(t.menu).add(r).start({ y: -u }).then(n);
            }
          }
        }
        var k,
          _,
          T,
          z = {},
          O = t.tram,
          L = t(window),
          M = t(document),
          A = e.env(),
          E = '<div class="w-nav-overlay" data-wf-ignore />',
          C = '.w-nav',
          j = 'w--open',
          I = 'w--nav-menu-open',
          q = 'w--nav-link-open',
          $ = n.triggers,
          S = t();
        (z.ready = z.design = z.preview = function() {
          (T = A && e.env('design')), (k = t(document.body)), (_ = M.find(C)).length &&
            (_.each(s), r(), o());
        }), (z.destroy = function() {
          (S = t()), r(), _ && _.length && _.each(u);
        });
        var D = 'max-width';
        return z;
      }),
    );
  }), t(function(t) {
    var e = o;
    e.define(
      'scroll',
      (t.exports = function(t) {
        function n(n, r) {
          if (l.test(n)) {
            var o = t('#' + n);
            if (o.length) {
              r && (r.preventDefault(), r.stopPropagation()), u.hash === n ||
                !c ||
                !c.pushState ||
                (e.env.chrome && 'file:' === u.protocol) ||
                ((c.state && c.state.hash) !== n && c.pushState({ hash: n }, '', '#' + n));
              var a = e.env('editor') ? '.w-editor-body' : 'body',
                f = t('header, ' + a + ' > .header, ' + a + ' > .w-nav:not([data-no-scroll])'),
                d = 'fixed' === f.css('position') ? f.outerHeight() : 0;
              s.setTimeout(function() {
                i(o, d);
              }, r ? 0 : 300);
            }
          }
        }
        function i(e, n) {
          var i = t(s).scrollTop(), o = e.offset().top - n;
          if ('mid' === e.data('scroll')) {
            var a = t(s).height() - n, u = e.outerHeight();
            u < a && (o -= Math.round((a - u) / 2));
          }
          var c = 1;
          t('body').add(e).each(function() {
            var e = parseFloat(t(this).attr('data-scroll-time'), 10);
            !isNaN(e) && (0 === e || e > 0) && (c = e);
          }), Date.now ||
            (Date.now = function() {
              return new Date().getTime();
            });
          var l = Date.now(),
            f =
              s.requestAnimationFrame ||
              s.mozRequestAnimationFrame ||
              s.webkitRequestAnimationFrame ||
              function(t) {
                s.setTimeout(t, 15);
              },
            d = (472.143 * Math.log(Math.abs(i - o) + 125) - 2e3) * c,
            h = function() {
              var t = Date.now() - l;
              s.scroll(0, r(i, o, t, d)), t <= d && f(h);
            };
          h();
        }
        function r(t, e, n, i) {
          return n > i ? e : t + (e - t) * o(n / i);
        }
        function o(t) {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }
        var a = t(document),
          s = window,
          u = s.location,
          c = (function() {
            try {
              return Boolean(s.frameElement);
            } catch (t) {
              return !0;
            }
          })()
            ? null
            : s.history,
          l = /^[a-zA-Z0-9][\w:.-]*$/;
        return {
          ready: function() {
            u.hash && n(u.hash.substring(1));
            var i = u.href.split('#')[0];
            a.on('click', 'a', function(r) {
              if (!(e.env('design') || (window.$.mobile && t(r.currentTarget).hasClass('ui-link'))))
                if ('#' !== this.getAttribute('href')) {
                  var o = this.href.split('#'), a = o[0] === i ? o[1] : null;
                  a && n(a, r);
                } else r.preventDefault();
            });
          },
        };
      }),
    );
  }), t(function(t) {
    var e = o, n = s;
    e.define(
      'slider',
      (t.exports = function(t, i) {
        function r() {
          (_ = A.find(C)).length && (_.filter(':visible').each(u), (O = null), z || (o(), a()));
        }
        function o() {
          e.resize.off(s), e.redraw.off(L.redraw);
        }
        function a() {
          e.resize.on(s), e.redraw.on(L.redraw);
        }
        function s() {
          _.filter(':visible').each(w);
        }
        function u(e, n) {
          var i = t(n), r = t.data(n, C);
          if (
            (r ||
              (r = t.data(n, C, { index: 0, depth: 1, el: i, config: {} })), (r.mask = i.children(
              '.w-slider-mask',
            )), (r.left = i.children('.w-slider-arrow-left')), (r.right = i.children(
              '.w-slider-arrow-right',
            )), (r.nav = i.children('.w-slider-nav')), (r.slides = r.mask.children(
              '.w-slide',
            )), r.slides.each(I.reset), O && (r.maskWidth = 0), !M.support.transform)
          )
            return r.left.hide(), r.right.hide(), r.nav.hide(), void (z = !0);
          r.el.off(C), r.left.off(C), r.right.off(C), r.nav.off(C), c(r), T
            ? (r.el.on('setting' + C, m(r)), v(r), (r.hasTimer = !1))
            : (r.el.on('swipe' + C, m(r)), r.left.on('tap' + C, f(r)), r.right.on(
                'tap' + C,
                d(r),
              ), r.config.autoplay &&
                !r.hasTimer &&
                ((r.hasTimer = !0), (r.timerCount = 1), p(r))), r.nav.on(
            'tap' + C,
            '> div',
            m(r),
          ), E ||
            r.mask
              .contents()
              .filter(function() {
                return 3 === this.nodeType;
              })
              .remove(), w(e, n);
        }
        function c(t) {
          var e = {};
          (e.crossOver = 0), (e.animation = t.el.attr('data-animation') || 'slide'), 'outin' ===
            e.animation && ((e.animation = 'cross'), (e.crossOver = 0.5)), (e.easing =
            t.el.attr('data-easing') || 'ease');
          var n = t.el.attr('data-duration');
          if (
            ((e.duration = null != n ? parseInt(n, 10) : 500), l(t.el.attr('data-infinite')) &&
              (e.infinite = !0), l(t.el.attr('data-disable-swipe')) && (e.disableSwipe = !0), l(
              t.el.attr('data-hide-arrows'),
            )
              ? (e.hideArrows = !0)
              : t.config.hideArrows && (t.left.show(), t.right.show()), l(
              t.el.attr('data-autoplay'),
            ))
          ) {
            (e.autoplay = !0), (e.delay =
              parseInt(t.el.attr('data-delay'), 10) || 2e3), (e.timerMax = parseInt(
              t.el.attr('data-autoplay-limit'),
              10,
            ));
            var i = 'mousedown' + C + ' touchstart' + C;
            T ||
              t.el.off(i).one(i, function() {
                v(t);
              });
          }
          var r = t.right.width();
          (e.edge = r ? r + 40 : 100), (t.config = e);
        }
        function l(t) {
          return '1' === t || 'true' === t;
        }
        function f(t) {
          return function() {
            g(t, { index: t.index - 1, vector: -1 });
          };
        }
        function d(t) {
          return function() {
            g(t, { index: t.index + 1, vector: 1 });
          };
        }
        function h(e, n) {
          var o = null;
          n === e.slides.length && (r(), b(e)), i.each(e.anchors, function(e, i) {
            t(e.els).each(function(e, r) {
              t(r).index() === n && (o = i);
            });
          }), null != o && g(e, { index: o, immediate: !0 });
        }
        function p(t) {
          v(t);
          var e = t.config, n = e.timerMax;
          (n && t.timerCount++ > n) ||
            (t.timerId = window.setTimeout(function() {
              null == t.timerId || T || (d(t)(), p(t));
            }, e.delay));
        }
        function v(t) {
          window.clearTimeout(t.timerId), (t.timerId = null);
        }
        function m(n) {
          return function(i, r) {
            r = r || {};
            var o = n.config;
            if (T && 'setting' === i.type) {
              if ('prev' === r.select) return f(n)();
              if ('next' === r.select) return d(n)();
              if ((c(n), b(n), null == r.select)) return;
              h(n, r.select);
            } else if ('swipe' !== i.type)
              n.nav.has(i.target).length && g(n, { index: t(i.target).index() });
            else {
              if (o.disableSwipe) return;
              if (e.env('editor')) return;
              if ('left' === r.direction) return d(n)();
              if ('right' === r.direction) return f(n)();
            }
          };
        }
        function g(e, n) {
          function i() {
            (d = t(o[e.index].els)), (p = e.slides.not(d)), 'slide' !== v &&
              (f.visibility = 'hidden'), M(p).set(f);
          }
          n = n || {};
          var r = e.config, o = e.anchors;
          e.previous = e.index;
          var a = n.index, s = {};
          a < 0
            ? ((a = o.length - 1), r.infinite &&
                ((s.x = -e.endX), (s.from = 0), (s.to = o[0].width)))
            : a >= o.length &&
                ((a = 0), r.infinite &&
                  ((s.x = o[o.length - 1].width), (s.from = -o[o.length - 1].x), (s.to =
                    s.from - s.x))), (e.index = a);
          var u = e.nav.children().eq(e.index).addClass('w-active');
          e.nav.children().not(u).removeClass('w-active'), r.hideArrows &&
            (e.index === o.length - 1 ? e.right.hide() : e.right.show(), 0 === e.index
              ? e.left.hide()
              : e.left.show());
          var c = e.offsetX || 0,
            l = (e.offsetX = -o[e.index].x),
            f = { x: l, opacity: 1, visibility: '' },
            d = t(o[e.index].els),
            h = t(o[e.previous] && o[e.previous].els),
            p = e.slides.not(d),
            v = r.animation,
            m = r.easing,
            g = Math.round(r.duration),
            w = n.vector || (e.index > e.previous ? 1 : -1),
            b = 'opacity ' + g + 'ms ' + m,
            y = 'transform ' + g + 'ms ' + m;
          if ((T || (d.each(I.intro), p.each(I.outro)), n.immediate && !O))
            return M(d).set(f), void i();
          if (e.index !== e.previous) {
            if ('cross' === v) {
              var x = Math.round(g - g * r.crossOver), k = Math.round(g - x);
              return (b = 'opacity ' + x + 'ms ' + m), M(h)
                .set({ visibility: '' })
                .add(b)
                .start({ opacity: 0 }), void M(d)
                .set({ visibility: '', x: l, opacity: 0, zIndex: e.depth++ })
                .add(b)
                .wait(k)
                .then({ opacity: 1 })
                .then(i);
            }
            return 'fade' === v
              ? (M(h).set({ visibility: '' }).stop(), void M(d)
                  .set({ visibility: '', x: l, opacity: 0, zIndex: e.depth++ })
                  .add(b)
                  .start({ opacity: 1 })
                  .then(i))
              : 'over' === v
                  ? ((f = { x: e.endX }), M(h).set({ visibility: '' }).stop(), void M(d)
                      .set({ visibility: '', zIndex: e.depth++, x: l + o[e.index].width * w })
                      .add(y)
                      .start({ x: l })
                      .then(i))
                  : void (r.infinite && s.x
                      ? (M(e.slides.not(h))
                          .set({ visibility: '', x: s.x })
                          .add(y)
                          .start({ x: l }), M(h)
                          .set({ visibility: '', x: s.from })
                          .add(y)
                          .start({ x: s.to }), (e.shifted = h))
                      : (r.infinite &&
                          e.shifted &&
                          (M(e.shifted).set({ visibility: '', x: c }), (e.shifted = null)), M(
                          e.slides,
                        )
                          .set({ visibility: '' })
                          .add(y)
                          .start({ x: l })));
          }
        }
        function w(e, n) {
          var i = t.data(n, C);
          if (i) return x(i) ? b(i) : void (T && k(i) && b(i));
        }
        function b(e) {
          var n = 1, i = 0, r = 0, o = 0, a = e.maskWidth, s = a - e.config.edge;
          s < 0 && (s = 0), (e.anchors = [{ els: [], x: 0, width: 0 }]), e.slides.each(function(
            u,
            c,
          ) {
            r - i > s && (n++, (i += a), (e.anchors[n - 1] = { els: [], x: r, width: 0 })), (o = t(
              c,
            ).outerWidth(!0)), (r += o), (e.anchors[n - 1].width += o), e.anchors[n - 1].els.push(
              c,
            );
          }), (e.endX = r), T && (e.pages = null), e.nav.length &&
            e.pages !== n &&
            ((e.pages = n), y(e));
          var u = e.index;
          u >= n && (u = n - 1), g(e, { immediate: !0, index: u });
        }
        function y(e) {
          var n, i = [], r = e.el.attr('data-nav-spacing');
          r && (r = parseFloat(r) + 'px');
          for (var o = 0; o < e.pages; o++)
            (n = t(j)), e.nav.hasClass('w-num') && n.text(o + 1), null != r &&
              n.css({ 'margin-left': r, 'margin-right': r }), i.push(n);
          e.nav.empty().append(i);
        }
        function x(t) {
          var e = t.mask.width();
          return t.maskWidth !== e && ((t.maskWidth = e), !0);
        }
        function k(e) {
          var n = 0;
          return e.slides.each(function(e, i) {
            n += t(i).outerWidth(!0);
          }), e.slidesWidth !== n && ((e.slidesWidth = n), !0);
        }
        var _,
          T,
          z,
          O,
          L = {},
          M = t.tram,
          A = t(document),
          E = e.env(),
          C = '.w-slider',
          j = '<div class="w-slider-dot" data-wf-ignore />',
          I = n.triggers;
        return (L.ready = function() {
          (T = e.env('design')), r();
        }), (L.design = function() {
          (T = !0), r();
        }), (L.preview = function() {
          (T = !1), r();
        }), (L.redraw = function() {
          (O = !0), r();
        }), (L.destroy = o), L;
      }),
    );
  }), t(function(t) {
    o.define(
      'touch',
      (t.exports = function(t) {
        function e(t) {
          function e(t) {
            var e = t.touches;
            (e && e.length > 1) ||
              ((l = !0), (f = !1), e
                ? ((d = !0), (s = e[0].clientX), (u = e[0].clientY))
                : ((s = t.clientX), (u = t.clientY)), (c = s));
          }
          function i(t) {
            if (l) {
              if (d && 'mousemove' === t.type) return t.preventDefault(), void t.stopPropagation();
              var e = t.touches,
                i = e ? e[0].clientX : t.clientX,
                r = e ? e[0].clientY : t.clientY,
                p = i - c;
              (c = i), Math.abs(p) > h &&
                o &&
                '' === String(o()) &&
                (n('swipe', t, { direction: p > 0 ? 'right' : 'left' }), a()), (Math.abs(i - s) >
                10 ||
                Math.abs(r - u) > 10) &&
                (f = !0);
            }
          }
          function r(t) {
            if (l) {
              if (((l = !1), d && 'mouseup' === t.type))
                return t.preventDefault(), t.stopPropagation(), void (d = !1);
              f || n('tap', t);
            }
          }
          function a() {
            l = !1;
          }
          var s,
            u,
            c,
            l = !1,
            f = !1,
            d = !1,
            h = Math.min(Math.round(0.04 * window.innerWidth), 40);
          t.addEventListener('touchstart', e, !1), t.addEventListener(
            'touchmove',
            i,
            !1,
          ), t.addEventListener('touchend', r, !1), t.addEventListener(
            'touchcancel',
            a,
            !1,
          ), t.addEventListener('mousedown', e, !1), t.addEventListener(
            'mousemove',
            i,
            !1,
          ), t.addEventListener('mouseup', r, !1), t.addEventListener(
            'mouseout',
            a,
            !1,
          ), (this.destroy = function() {
            t.removeEventListener('touchstart', e, !1), t.removeEventListener(
              'touchmove',
              i,
              !1,
            ), t.removeEventListener('touchend', r, !1), t.removeEventListener(
              'touchcancel',
              a,
              !1,
            ), t.removeEventListener('mousedown', e, !1), t.removeEventListener(
              'mousemove',
              i,
              !1,
            ), t.removeEventListener('mouseup', r, !1), t.removeEventListener(
              'mouseout',
              a,
              !1,
            ), (t = null);
          });
        }
        function n(e, n, i) {
          var r = t.Event(e, { originalEvent: n });
          t(n.target).trigger(r, i);
        }
        var i = {}, r = !document.addEventListener, o = window.getSelection;
        return r &&
          (t.event.special.tap = { bindType: 'click', delegateType: 'click' }), (i.init = function(
          n,
        ) {
          return r ? null : (n = 'string' == typeof n ? t(n).get(0) : n) ? new e(n) : null;
        }), (i.instance = i.init(document)), i;
      }),
    );
  });
})(); /**
 * ----------------------------------------------------------------------
 * Webflow: Interactions: Init
 */
Webflow.require('ix').init([
  {
    slug: 'background-fade-in',
    name: 'Background Fade In',
    value: {
      style: { opacity: 0.5, scaleX: 1.06, scaleY: 1.06, scaleZ: 1 },
      triggers: [
        {
          type: 'load',
          stepsA: [
            {
              wait: '100ms',
              opacity: 1,
              transition: 'transform 1s ease 0, opacity 1s ease 0',
              scaleX: 1,
              scaleY: 1,
              scaleZ: 1,
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'slide-1-zoom-in-on-load',
    name: 'Slide 1_Zoom In on Load',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'slide-1-zoom-in-on-load-2',
    name: 'Slide 1__Zoom In on Load 2',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            { wait: '500ms' },
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'slide-1-zoom-in-on-load-3',
    name: 'Slide 1__Zoom In on Load 3',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            { wait: '1000ms' },
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'slide-1-zoom-in-on-load-4',
    name: 'Slide 1__Zoom In on Load 4',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            { wait: '1500ms' },
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'slide-2-zoom-in-on-load-5',
    name: 'Slide 2__Zoom In on Load 5',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            { wait: '6s' },
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'slide-2-zoom-in-on-load-6',
    name: 'Slide 2__Zoom In on Load 6',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            { wait: '6500ms' },
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'slide-2-zoom-in-on-load-7',
    name: 'Slide 2__Zoom In on Load 7',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            { wait: '7s' },
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'slide-3-zoom-in-on-load-8',
    name: 'Slide 3__Zoom In on Load 8',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            { wait: '11500ms' },
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'slide-3-zoom-in-on-load-9',
    name: 'Slide 3__Zoom In on Load 9',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            { wait: '12s' },
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'slide-3-zoom-in-on-load-10',
    name: 'Slide 3__Zoom In on Load 10',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            { wait: '12500ms' },
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
  {
    slug: 'navbar-zoom-in-on-load',
    name: 'Navbar Zoom In on Load',
    value: {
      style: { opacity: 0, x: '0px', y: '-54px', z: '0px' },
      triggers: [
        {
          type: 'load',
          stepsA: [
            { wait: '2s' },
            {
              opacity: 1,
              transition: 'transform 1000ms ease 0, opacity 200 ease 0',
              x: '0px',
              y: '0px',
              z: '0px',
            },
          ],
          stepsB: [],
        },
      ],
    },
  },
]);
