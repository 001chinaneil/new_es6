"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! Aliplayer - v2.3.0 - 2018-03-16 */!function a(b, c, d) {
    function e(g, h) {
        if (!c[g]) {
            if (!b[g]) {
                var i = "function" == typeof require && require;if (!h && i) return i(g, !0);if (f) return f(g, !0);var j = new Error("Cannot find module '" + g + "'");throw j.code = "MODULE_NOT_FOUND", j;
            }var k = c[g] = { exports: {} };b[g][0].call(k.exports, function (a) {
                var c = b[g][1][a];return e(c || a);
            }, k, k.exports, a, b, c, d);
        }return c[g].exports;
    }for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) {
        e(d[g]);
    }return e;
}({ 1: [function (a, b, c) {
        !function (a, d) {
            "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) ? b.exports = c = d() : "function" == typeof define && define.amd ? define([], d) : a.CryptoJS = d();
        }(this, function () {
            var a = a || function (a, b) {
                var c = Object.create || function () {
                    function a() {}return function (b) {
                        var c;return a.prototype = b, c = new a(), a.prototype = null, c;
                    };
                }(),
                    d = {},
                    e = d.lib = {},
                    f = e.Base = function () {
                    return { extend: function extend(a) {
                            var b = c(this);return a && b.mixIn(a), b.hasOwnProperty("init") && this.init !== b.init || (b.init = function () {
                                b.$super.init.apply(this, arguments);
                            }), b.init.prototype = b, b.$super = this, b;
                        }, create: function create() {
                            var a = this.extend();return a.init.apply(a, arguments), a;
                        }, init: function init() {}, mixIn: function mixIn(a) {
                            for (var b in a) {
                                a.hasOwnProperty(b) && (this[b] = a[b]);
                            }a.hasOwnProperty("toString") && (this.toString = a.toString);
                        }, clone: function clone() {
                            return this.init.prototype.extend(this);
                        } };
                }(),
                    g = e.WordArray = f.extend({ init: function init(a, c) {
                        a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length;
                    }, toString: function toString(a) {
                        return (a || i).stringify(this);
                    }, concat: function concat(a) {
                        var b = this.words,
                            c = a.words,
                            d = this.sigBytes,
                            e = a.sigBytes;if (this.clamp(), d % 4) for (var f = 0; f < e; f++) {
                            var g = c[f >>> 2] >>> 24 - f % 4 * 8 & 255;b[d + f >>> 2] |= g << 24 - (d + f) % 4 * 8;
                        } else for (var f = 0; f < e; f += 4) {
                            b[d + f >>> 2] = c[f >>> 2];
                        }return this.sigBytes += e, this;
                    }, clamp: function clamp() {
                        var b = this.words,
                            c = this.sigBytes;b[c >>> 2] &= 4294967295 << 32 - c % 4 * 8, b.length = a.ceil(c / 4);
                    }, clone: function clone() {
                        var a = f.clone.call(this);return a.words = this.words.slice(0), a;
                    }, random: function random(b) {
                        for (var c, d = [], e = function e(b) {
                            var b = b,
                                c = 987654321,
                                d = 4294967295;return function () {
                                c = 36969 * (65535 & c) + (c >> 16) & d, b = 18e3 * (65535 & b) + (b >> 16) & d;var e = (c << 16) + b & d;return e /= 4294967296, (e += .5) * (a.random() > .5 ? 1 : -1);
                            };
                        }, f = 0; f < b; f += 4) {
                            var h = e(4294967296 * (c || a.random()));c = 987654071 * h(), d.push(4294967296 * h() | 0);
                        }return new g.init(d, b);
                    } }),
                    h = d.enc = {},
                    i = h.Hex = { stringify: function stringify(a) {
                        for (var b = a.words, c = a.sigBytes, d = [], e = 0; e < c; e++) {
                            var f = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;d.push((f >>> 4).toString(16)), d.push((15 & f).toString(16));
                        }return d.join("");
                    }, parse: function parse(a) {
                        for (var b = a.length, c = [], d = 0; d < b; d += 2) {
                            c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - d % 8 * 4;
                        }return new g.init(c, b / 2);
                    } },
                    j = h.Latin1 = { stringify: function stringify(a) {
                        for (var b = a.words, c = a.sigBytes, d = [], e = 0; e < c; e++) {
                            var f = b[e >>> 2] >>> 24 - e % 4 * 8 & 255;d.push(String.fromCharCode(f));
                        }return d.join("");
                    }, parse: function parse(a) {
                        for (var b = a.length, c = [], d = 0; d < b; d++) {
                            c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - d % 4 * 8;
                        }return new g.init(c, b);
                    } },
                    k = h.Utf8 = { stringify: function stringify(a) {
                        try {
                            return decodeURIComponent(escape(j.stringify(a)));
                        } catch (a) {
                            throw new Error("Malformed UTF-8 data");
                        }
                    }, parse: function parse(a) {
                        return j.parse(unescape(encodeURIComponent(a)));
                    } },
                    l = e.BufferedBlockAlgorithm = f.extend({ reset: function reset() {
                        this._data = new g.init(), this._nDataBytes = 0;
                    }, _append: function _append(a) {
                        "string" == typeof a && (a = k.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
                    }, _process: function _process(b) {
                        var c = this._data,
                            d = c.words,
                            e = c.sigBytes,
                            f = this.blockSize,
                            h = 4 * f,
                            i = e / h;i = b ? a.ceil(i) : a.max((0 | i) - this._minBufferSize, 0);var j = i * f,
                            k = a.min(4 * j, e);if (j) {
                            for (var l = 0; l < j; l += f) {
                                this._doProcessBlock(d, l);
                            }var m = d.splice(0, j);c.sigBytes -= k;
                        }return new g.init(m, k);
                    }, clone: function clone() {
                        var a = f.clone.call(this);return a._data = this._data.clone(), a;
                    }, _minBufferSize: 0 }),
                    m = (e.Hasher = l.extend({ cfg: f.extend(), init: function init(a) {
                        this.cfg = this.cfg.extend(a), this.reset();
                    }, reset: function reset() {
                        l.reset.call(this), this._doReset();
                    }, update: function update(a) {
                        return this._append(a), this._process(), this;
                    }, finalize: function finalize(a) {
                        return a && this._append(a), this._doFinalize();
                    }, blockSize: 16, _createHelper: function _createHelper(a) {
                        return function (b, c) {
                            return new a.init(c).finalize(b);
                        };
                    }, _createHmacHelper: function _createHmacHelper(a) {
                        return function (b, c) {
                            return new m.HMAC.init(a, c).finalize(b);
                        };
                    } }), d.algo = {});return d;
            }(Math);return a;
        });
    }, {}], 2: [function (a, b, c) {
        !function (d, e) {
            "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS);
        }(this, function (a) {
            return function () {
                function b(a, b, c) {
                    for (var d = [], f = 0, g = 0; g < b; g++) {
                        if (g % 4) {
                            var h = c[a.charCodeAt(g - 1)] << g % 4 * 2,
                                i = c[a.charCodeAt(g)] >>> 6 - g % 4 * 2;d[f >>> 2] |= (h | i) << 24 - f % 4 * 8, f++;
                        }
                    }return e.create(d, f);
                }var c = a,
                    d = c.lib,
                    e = d.WordArray,
                    f = c.enc;f.Base64 = { stringify: function stringify(a) {
                        var b = a.words,
                            c = a.sigBytes,
                            d = this._map;a.clamp();for (var e = [], f = 0; f < c; f += 3) {
                            for (var g = b[f >>> 2] >>> 24 - f % 4 * 8 & 255, h = b[f + 1 >>> 2] >>> 24 - (f + 1) % 4 * 8 & 255, i = b[f + 2 >>> 2] >>> 24 - (f + 2) % 4 * 8 & 255, j = g << 16 | h << 8 | i, k = 0; k < 4 && f + .75 * k < c; k++) {
                                e.push(d.charAt(j >>> 6 * (3 - k) & 63));
                            }
                        }var l = d.charAt(64);if (l) for (; e.length % 4;) {
                            e.push(l);
                        }return e.join("");
                    }, parse: function parse(a) {
                        var c = a.length,
                            d = this._map,
                            e = this._reverseMap;if (!e) {
                            e = this._reverseMap = [];for (var f = 0; f < d.length; f++) {
                                e[d.charCodeAt(f)] = f;
                            }
                        }var g = d.charAt(64);if (g) {
                            var h = a.indexOf(g);-1 !== h && (c = h);
                        }return b(a, c, e);
                    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
            }(), a.enc.Base64;
        });
    }, { "./core": 1 }], 3: [function (a, b, c) {
        !function (d, e) {
            "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS);
        }(this, function (a) {
            return a.enc.Utf8;
        });
    }, { "./core": 1 }], 4: [function (a, b, c) {
        !function (d, e, f) {
            "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) ? b.exports = c = e(a("./core"), a("./sha1"), a("./hmac")) : "function" == typeof define && define.amd ? define(["./core", "./sha1", "./hmac"], e) : e(d.CryptoJS);
        }(this, function (a) {
            return a.HmacSHA1;
        });
    }, { "./core": 1, "./hmac": 5, "./sha1": 6 }], 5: [function (a, b, c) {
        !function (d, e) {
            "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS);
        }(this, function (a) {
            !function () {
                var b = a,
                    c = b.lib,
                    d = c.Base,
                    e = b.enc,
                    f = e.Utf8,
                    g = b.algo;g.HMAC = d.extend({ init: function init(a, b) {
                        a = this._hasher = new a.init(), "string" == typeof b && (b = f.parse(b));var c = a.blockSize,
                            d = 4 * c;b.sigBytes > d && (b = a.finalize(b)), b.clamp();for (var e = this._oKey = b.clone(), g = this._iKey = b.clone(), h = e.words, i = g.words, j = 0; j < c; j++) {
                            h[j] ^= 1549556828, i[j] ^= 909522486;
                        }e.sigBytes = g.sigBytes = d, this.reset();
                    }, reset: function reset() {
                        var a = this._hasher;a.reset(), a.update(this._iKey);
                    }, update: function update(a) {
                        return this._hasher.update(a), this;
                    }, finalize: function finalize(a) {
                        var b = this._hasher,
                            c = b.finalize(a);return b.reset(), b.finalize(this._oKey.clone().concat(c));
                    } });
            }();
        });
    }, { "./core": 1 }], 6: [function (a, b, c) {
        !function (d, e) {
            "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) ? b.exports = c = e(a("./core")) : "function" == typeof define && define.amd ? define(["./core"], e) : e(d.CryptoJS);
        }(this, function (a) {
            return function () {
                var b = a,
                    c = b.lib,
                    d = c.WordArray,
                    e = c.Hasher,
                    f = b.algo,
                    g = [],
                    h = f.SHA1 = e.extend({ _doReset: function _doReset() {
                        this._hash = new d.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
                    }, _doProcessBlock: function _doProcessBlock(a, b) {
                        for (var c = this._hash.words, d = c[0], e = c[1], f = c[2], h = c[3], i = c[4], j = 0; j < 80; j++) {
                            if (j < 16) g[j] = 0 | a[b + j];else {
                                var k = g[j - 3] ^ g[j - 8] ^ g[j - 14] ^ g[j - 16];g[j] = k << 1 | k >>> 31;
                            }var l = (d << 5 | d >>> 27) + i + g[j];l += j < 20 ? 1518500249 + (e & f | ~e & h) : j < 40 ? 1859775393 + (e ^ f ^ h) : j < 60 ? (e & f | e & h | f & h) - 1894007588 : (e ^ f ^ h) - 899497514, i = h, h = f, f = e << 30 | e >>> 2, e = d, d = l;
                        }c[0] = c[0] + d | 0, c[1] = c[1] + e | 0, c[2] = c[2] + f | 0, c[3] = c[3] + h | 0, c[4] = c[4] + i | 0;
                    }, _doFinalize: function _doFinalize() {
                        var a = this._data,
                            b = a.words,
                            c = 8 * this._nDataBytes,
                            d = 8 * a.sigBytes;return b[d >>> 5] |= 128 << 24 - d % 32, b[14 + (d + 64 >>> 9 << 4)] = Math.floor(c / 4294967296), b[15 + (d + 64 >>> 9 << 4)] = c, a.sigBytes = 4 * b.length, this._process(), this._hash;
                    }, clone: function clone() {
                        var a = e.clone.call(this);return a._hash = this._hash.clone(), a;
                    } });b.SHA1 = e._createHelper(h), b.HmacSHA1 = e._createHmacHelper(h);
            }(), a.SHA1;
        });
    }, { "./core": 1 }], 7: [function (a, b, c) {
        var d = a("../ui/component"),
            e = (a("../lib/util"), a("../lib/dom")),
            f = a("../lib/event"),
            g = (a("../lib/ua"), a("../lang/index")),
            h = a("../player/base/event/eventtype"),
            i = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.className = b.className ? b.className : "prism-auto-stream-selector", this.addClass(this.className);
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this, "div");return a.innerHTML = "<div><p class='tip-text'></p></div><div class='operators'><a class='prism-button prism-button-ok' type='button'>" + g.get("OK_Text") + "</a><a class='prism-button prism-button-cancel'  target='_blank'>" + g.get("Cancel_Text") + "</a></div>", a;
            }, bindEvent: function bindEvent() {
                var a = this;a._player.on(h.Private.AutoStreamShow, function (b) {
                    var c = document.querySelector("#" + a.getId() + " .tip-text");if (a._player._getLowerQualityLevel) {
                        var d = a._player._getLowerQualityLevel();d && (a._switchUrl = d, c.innerText = g.get("Auto_Stream_Tip_Text").replace("$$", d.item.desc), e.css(a.el(), "display", "block"));
                    }
                }), a._player.on(h.Private.AutoStreamHide, function (b) {
                    document.querySelector("#" + a.getId() + " .tip-text");e.css(a.el(), "display", "none");
                });var b = document.querySelector("#" + a.getId() + " .prism-button-ok");f.on(b, "click", function () {
                    a._player._changeStream && a._switchUrl && a._player._changeStream(a._switchUrl.index, g.get("Quality_Change_Text")), e.css(a.el(), "display", "none");
                });var c = document.querySelector("#" + a.getId() + " .prism-button-cancel");f.on(c, "click", function () {
                    e.css(a.el(), "display", "none");
                });
            } });b.exports = i;
    }, { "../lang/index": 16, "../lib/dom": 22, "../lib/event": 23, "../lib/ua": 31, "../lib/util": 33, "../player/base/event/eventtype": 38, "../ui/component": 80 }], 8: [function (a, b, c) {
        var d = a("../ui/component"),
            e = a("../lib/dom"),
            f = a("../lib/event"),
            g = a("../lib/ua"),
            h = a("../lib/function"),
            i = (a("../lang/index"), a("../lib/util"), a("../lib/playerutil")),
            j = a("../player/base/event/eventtype"),
            k = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.className = b.className ? b.className : "prism-liveshift-progress", this.addClass(this.className), this._liveshiftService = a._liveshiftService;
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this);return a.innerHTML = '<div class="prism-enable-liveshift"><div class="prism-progress-loaded"></div><div class="prism-progress-played"></div><div class="prism-progress-cursor"></div><p class="prism-progress-time"></p><div class="prism-liveshift-seperator"></div></div><div class="prism-disable-liveshift"></div>', a;
            }, bindEvent: function bindEvent() {
                var a = this;this.loadedNode = document.querySelector("#" + this.id() + " .prism-progress-loaded"), this.playedNode = document.querySelector("#" + this.id() + " .prism-progress-played"), this.cursorNode = document.querySelector("#" + this.id() + " .prism-progress-cursor"), this.timeNode = document.querySelector("#" + this.id() + " .prism-progress-time"), this.controlNode = document.querySelector("#" + this._player._options.id + " .prism-controlbar"), this.seperatorNode = document.querySelector("#" + this.id() + " .prism-liveshift-seperator"), this.progressNode = document.querySelector("#" + this.id() + " .prism-enable-liveshift"), f.on(this.cursorNode, "mousedown", function (b) {
                    a._onMouseDown(b);
                }), f.on(this.cursorNode, "touchstart", function (b) {
                    a._onMouseDown(b);
                }), f.on(this.progressNode, "mousemove", function (b) {
                    a._progressMove(b);
                }), f.on(this.progressNode, "touchmove", function (b) {
                    a._progressMove(b);
                }), f.on(this._el, "click", function (b) {
                    a._onMouseClick(b);
                }), this._player.on(j.Private.HideProgress, function (b) {
                    a._hideProgress(b);
                }), this._player.on(j.Private.CancelHideProgress, function (b) {
                    a._cancelHideProgress(b);
                }), f.on(this.progressNode, j.Private.MouseOver, function (b) {
                    a._onMouseOver(b);
                }), f.on(this.progressNode, j.Private.MouseOut, function (b) {
                    a._onMouseOut(b);
                }), this.bindTimeupdate = h.bind(this, this._onTimeupdate), this._player.on(j.Player.TimeUpdate, this.bindTimeupdate), i.isLiveShift(this._player._options) && this._player.on(j.Player.Play, function () {
                    a._liveshiftService.start(6e4, function (b) {
                        var c = { mediaId: a._player._options.vid ? a._player._options.vid : "", error_code: b.Code, error_msg: b.Message };a._player.logError(c), a._player.trigger(j.Player.Error, c);
                    });
                }), this._player.on(j.Private.LiveShiftQueryCompleted, function () {
                    a._updateSeperator();
                }), this._player.on(j.Player.Pause, function () {
                    a._liveshiftService.stop();
                }), g.IS_IPAD ? this.interval = setInterval(function () {
                    a._onProgress();
                }, 500) : this._player.on(j.Video.Progress, function () {
                    a._onProgress();
                });
            }, _updateSeperator: function _updateSeperator() {
                var a = this._liveshiftService.availableLiveShiftTime / this._liveshiftService.liveTimeRange.totalTime;a = a > 1 ? 1 : a, e.css(this.progressNode, "width", 100 * a + "%");
            }, _progressMove: function _progressMove(a) {}, _hideProgress: function _hideProgress(a) {
                f.off(this.cursorNode, "mousedown"), f.off(this.cursorNode, "touchstart");
            }, _cancelHideProgress: function _cancelHideProgress(a) {
                var b = this;f.on(this.cursorNode, "mousedown", function (a) {
                    b._onMouseDown(a);
                }), f.on(this.cursorNode, "touchstart", function (a) {
                    b._onMouseDown(a);
                });
            }, _canSeekable: function _canSeekable(a) {
                var b = !0;return "function" == typeof this._player.canSeekable && (b = this._player.canSeekable(a)), b;
            }, _onMouseOver: function _onMouseOver(a) {
                this._updateCursorPosition(this._player.getCurrentTime());var b = this;setTimeout(function () {
                    e.css(b.cursorNode, "display", "block");
                }), e.css(this.timeNode, "display", "block");
            }, _onMouseOut: function _onMouseOut(a) {
                e.css(this.cursorNode, "display", "none"), e.css(this.timeNode, "display", "none");
            }, _getSeconds: function _getSeconds(a) {
                for (var b = this.el().offsetLeft, c = this.el(); c = c.offsetParent;) {
                    b += c.offsetLeft;
                }var d = a.touches ? a.touches[0].pageX : a.pageX,
                    e = d - b,
                    f = this.progressNode.offsetWidth,
                    g = this._liveshiftService.availableLiveShiftTime;return sec = g ? e / f * g : 0, sec < 0 && (sec = 0), sec > g && (sec = g), sec;
            }, _onMouseClick: function _onMouseClick(a) {
                var b = this,
                    c = this._getSeconds(a);this._player.trigger(j.Private.SeekStart, { fromTime: this._player.getCurrentTime() });var d = this._liveshiftService.getSourceUrl(c);this._player.loadByUrl(d, c, !0), this._player.trigger(j.Private.Play_Btn_Hide), this._liveshiftService.seekTime = c, b._player.trigger(j.Private.EndStart, { toTime: c }), this._updateCursorPosition(c);
            }, _onMouseDown: function _onMouseDown(a) {
                var b = this;a.preventDefault(), this._player.trigger(j.Private.SeekStart, { fromTime: this._player.getCurrentTime() }), f.on(this.controlNode, "mousemove", function (a) {
                    b._onMouseMove(a);
                }), f.on(this.controlNode, "touchmove", function (a) {
                    b._onMouseMove(a);
                }), f.on(this._player.tag, "mouseup", function (a) {
                    b._onMouseUp(a);
                }), f.on(this._player.tag, "touchend", function (a) {
                    b._onMouseUp(a);
                }), f.on(this.controlNode, "mouseup", function (a) {
                    b._onMouseUp(a);
                }), f.on(this.controlNode, "touchend", function (a) {
                    b._onMouseUp(a);
                });
            }, _onMouseUp: function _onMouseUp(a) {
                a.preventDefault(), f.off(this.controlNode, "mousemove"), f.off(this.controlNode, "touchmove"), f.off(this._player.tag, "mouseup"), f.off(this._player.tag, "touchend"), f.off(this.controlNode, "mouseup"), f.off(this.controlNode, "touchend");var b = this._liveshiftService.availableLiveShiftTime,
                    c = this.playedNode.offsetWidth / this.el().offsetWidth * b,
                    d = this._liveshiftService.getSourceUrl(c);this._player.loadByUrl(d, c, !0), this._player.trigger(j.Private.Play_Btn_Hide), this._liveshiftService.seekTime = c, this._player.trigger(j.Private.EndStart, { toTime: c });
            }, _onMouseMove: function _onMouseMove(a) {
                a.preventDefault();var b = this._getSeconds(a);this._updateProgressBar(this.playedNode, b), this._updateCursorPosition(b);
            }, _onTimeupdate: function _onTimeupdate(a) {
                this._updateProgressBar(this.playedNode, this._player.getCurrentTime()), this._updateCursorPosition(this._player.getCurrentTime()), this._player.trigger(j.Private.UpdateProgressBar, { time: this._player.getCurrentTime() });
            }, _onProgress: function _onProgress(a) {
                this._player.getDuration() && this._player.getBuffered().length >= 1 && this._updateProgressBar(this.loadedNode, this._player.getBuffered().end(this._player.getBuffered().length - 1));
            }, _updateProgressBar: function _updateProgressBar(a, b) {
                if (1 != this._player._switchSourcing) {
                    var c = 0;if (-1 == this._liveshiftService.seekTime) c = 1;else {
                        var d = this._liveshiftService.availableLiveShiftTime;b += this._liveshiftService.seekTime, c = d ? b / d : 0, c > 1 && (c = 1, this._liveshiftService.seekTime = -1);
                    }this.liveShiftStartDisplay;a && e.css(a, "width", 100 * c + "%");
                }
            }, _updateCursorPosition: function _updateCursorPosition(a) {
                if (1 != this._player._switchSourcing) {
                    var b = 0;if (-1 == this._liveshiftService.seekTime) b = 1;else {
                        var c = this._liveshiftService.availableLiveShiftTime;a += this._liveshiftService.seekTime, b = c ? a / c : 0, b > 1 && (this._liveshiftService.seekTime = -1);
                    }var d = 1,
                        f = this._player.el().clientWidth;0 != f && (d = 1 - 18 / f), this.cursorNode && (b > d ? (e.css(this.cursorNode, "right", "0px"), e.css(this.cursorNode, "left", "auto")) : (e.css(this.cursorNode, "right", "auto"), e.css(this.cursorNode, "left", 100 * b + "%")));
                }
            } });b.exports = k;
    }, { "../lang/index": 16, "../lib/dom": 22, "../lib/event": 23, "../lib/function": 24, "../lib/playerutil": 29, "../lib/ua": 31, "../lib/util": 33, "../player/base/event/eventtype": 38, "../ui/component": 80 }], 9: [function (a, b, c) {
        var d = a("../ui/component"),
            e = a("../lib/util"),
            f = a("../player/base/event/eventtype"),
            g = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.className = b.className ? b.className : "prism-live-time-display", this.addClass(this.className), this._liveshiftService = a._liveshiftService;
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this, "div");return a.innerHTML = '<span class="current-time">00:00</span> <span class="time-bound">/</span> <span class="end-time">00:00</span><span class="live-text">Live: </span><span class="live-time"></span>', a;
            }, bindEvent: function bindEvent() {
                var a = this;this._player.on(f.Video.TimeUpdate, function () {
                    var b = a._liveshiftService,
                        c = document.querySelector("#" + a.id() + " .current-time");if (b.liveShiftStartDisplay && b.availableLiveShiftTime > b.seekTime && -1 != b.seekTime) {
                        var d = a._liveshiftService.getBaseTime(),
                            f = e.formatTime(d + a._player.getCurrentTime());c.innerText = f;
                    } else b.currentTimeDisplay && (c.innerText = b.currentTimeDisplay);
                }), this._player.on(f.Private.LiveShiftQueryCompleted, function () {
                    a.updateTime();
                });
            }, updateTime: function updateTime() {
                document.querySelector("#" + this.id() + " .end-time").innerText = this._liveshiftService.liveTimeRange.endDisplay, document.querySelector("#" + this.id() + " .live-time").innerText = this._liveshiftService.currentTimeDisplay;
            } });b.exports = g;
    }, { "../lib/util": 33, "../player/base/event/eventtype": 38, "../ui/component": 80 }], 10: [function (a, b, c) {
        b.exports = { domain: "g.alicdn.com", flashVersion: "2.6.0", h5Version: "2.6.0", logReportTo: "https://videocloud.cn-hangzhou.log.aliyuncs.com/logstores/newplayer/track" };
    }, {}], 11: [function (a, b, c) {
        a("./lang/index").load();var d = a("./player/adaptivePlayer"),
            e = a("./lib/componentutil"),
            f = function f(a, b) {
            return d.create(a, b);
        };e.register(f);var g = window.Aliplayer = f;f.players = {}, "function" == typeof define && define.amd ? define([], function () {
            return g;
        }) : "object" == (typeof c === "undefined" ? "undefined" : _typeof(c)) && "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (b.exports = g);
    }, { "./lang/index": 16, "./lib/componentutil": 18, "./player/adaptivePlayer": 35 }], 12: [function (a, b, c) {
        var d = a("../lib/oo"),
            e = a("../lang/index"),
            f = d.extend({ init: function init(a, b) {
                this._player = a, this._options = a.options();
            } });f.prototype.handle = function (a) {
            if (this._options.autoPlayDelay) {
                var b = this._options.autoPlayDelayDisplayText;b || (b = e.get("AutoPlayDelayDisplayText").replace("$$", this._options.autoPlayDelay)), this._player.trigger("info_show", b), this._player.trigger("h5_loading_hide"), this._player.trigger("play_btn_hide");var c = this;this._timeHandler = setTimeout(function () {
                    c._player.trigger("info_hide"), c._options.autoPlayDelay = 0, a && a();
                }, 1e3 * this._options.autoPlayDelay), this._player.on("play", function () {
                    g(c);
                }), this._player.on("pause", function () {
                    g(c);
                });
            }
        };var g = function g(a) {
            a._timeHandler && (clearTimeout(a._timeHandler), a._timeHandler = null);
        };b.exports = f;
    }, { "../lang/index": 16, "../lib/oo": 28 }], 13: [function (a, b, c) {
        b.exports = b.exports = { OD: "OD", FD: "360p", LD: "540p", SD: "720p", HD: "1080p", "2K": "2K", "4K": "4K", FHD: "FHD", XLD: "XLD", Speed_Text: "Speed", Speed_1X_Text: "1X", Speed_125X_Text: "1.25X", Speed_15X_Text: "1.5X", Speed_2X_Text: "2X", Refresh_Text: "Refresh", Cancel: "Cancel", Mute: "Mute", Snapshot: "Snapshot", Detection_Text: "Diagnosis", Play_DateTime: "Time", Quality_Change_Fail_Switch_Text: "Cannot play, switch to ", Quality_Change_Text: "Switch to ", Quality_The_Url: "The url", AutoPlayDelayDisplayText: "Play in $$ seconds", Error_Load_Abort_Text: "Data abort erro", Error_Network_Text: "Loading failed due to network error", Error_Decode_Text: "Decode error", Error_Server_Network_NotSupport_Text: "Network error or  the format of video is unsupported", Error_Offline_Text: "The network is unreachable, please click Refresh", Error_Play_Text: "Error occured while playing", Error_Retry_Text: " Please close or refresh", Error_AuthKey_Text: "Authentication expired or the domain is not in white list", Error_H5_Not_Support_Text: "The format of video is not supported by h5 player，please use flash player", Error_Not_Support_M3U8_Text: "The format of m3u8 is not supported by this explorer", Error_Not_Support_MP4_Text: "The format of mp4 is not supported by this explorer", Error_Not_Support_encrypt_Text: "The encrypted video is not supported by h5 player,please set useFlashPrism to true", Error_Vod_URL_Is_Empty_Text: "The url is empty", Error_Vod_Fetch_Urls_Text: "Error occured when fetch urls，please close or refresh", Fetch_Playauth_Error: "Error occured when fetch playauth close or refresh", Error_Playauth_Decode_Text: "PlayAuth parse failed", Error_Vid_Not_Same_Text: "Cannot renew url due to vid changed", Error_Playauth_Expired_Text: "Playauth expired, please close or refresh", Error_MTS_Fetch_Urls_Text: "Error occurred while requesting mst server", Error_Load_M3U8_Failed_Text: "The m3u8 file loaded failed", Error_Load_M3U8_Timeout_Text: "Timeout error occored when the m3u8 file loaded", Error_M3U8_Decode_Text: "The m3u8 file decoded failed", Error_TX_Decode_Text: "Video decoded failed", Error_Waiting_Timeout_Text: "Buffering timeout, please close or refresh", Error_Invalidate_Source: "Invalid source", Error_Fetch_NotStream: "The vid has no stream to play", Error_Not_Found: "Url is not found", Live_End: "Live has finished", Play_Before_Fullscreen: "Please play before fullscreen", Can_Not_Seekable: "Can not seek to this position", Cancel_Text: "Cancel", OK_Text: "OK", Auto_Stream_Tip_Text: "Internet is slow, does switch to $$", Request_Block_Text: "This request is blocked, the video Url should be over https", Open_Html_By_File: "Html page should be on the server", Maybe_Cors_Error: "please make sure enable cors,<a href='https://help.aliyun.com/document_detail/62950.html?spm=a2c4g.11186623.2.21.Y3n2oi' target='_blank'>refer to document</a>", Speed_Switch_To: "Speed switch to ", Curent_Volume: "Current volume:", Volume_Mute: "set to mute", Volume_UnMute: "set to unmute", ShiftLiveTime_Error: "Live start time should not be greater than over time", Error_Not_Support_Format_On_Mobile: "flv、rmtp can't be supported on mobile，please use m3u8", SessionId_Ticket_Invalid: "please assign value for sessionId and ticket properties", Http_Error: " An HTTP network request failed with an error, but not from the server.", Http_Timeout: "A network request timed out", DRM_License_Expired: "DRM license is expired, please refresh", Not_Support_DRM: "Browser doesn't support DRM" };
    }, {}], 14: [function (a, b, c) {
        b.exports = b.exports = { OD: "OD", LD: "360p", FD: "540p", SD: "720p", HD: "1080p", "2K": "2K", "4K": "4K", FHD: "FHD", XLD: "XLD", Forbidden_Text: "Internal information is strictly forbidden to outsider", Refresh: "Refresh", Diagnosis: "Diagnosis", Live_Finished: "Live has finished, thanks for watching", Play: "Play", Pause: "Pause", Snapshot: "Snapshot", Replay: "Replay", Live: "Live", Encrypt: "Encrypt", Sound: "Sound", Fullscreen: "Full Screen", Exist_Fullscreen: "Exit Full-screen", Resolution: "Resolution", Next: "Next Video", Brightness: "Brightness", Default: "Default", Contrast: "Contrast", Titles_Credits: "Titles and Credits", Skip_Titles: "Skip Titles", Skip_Credits: "Skip Credits", Not_Support_Out_Site: "The video is not supported for outside website, please watch it by TaoTV", Watch_Now: "Watch now", Network_Error: "Network is unreachable, please try to refresh", Video_Error: "Playing a video error, please try to refresh", Decode_Error: "Data decoding error", Live_Not_Start: "Live has not started, to be expected", Live_Loading: "Live information is loading, please try to refresh", Fetch_Playauth_Error: "Error occured when fetch playauth close or refresh", Live_End: "Live has finished", Live_Abrot: "Signal aborted, please try to refresh", Corss_Domain_Error: "Please ensure your domain has obtained IPC license and combined CNAME, \r\n or to set  cross-domain accessing available", Url_Timeout_Error: "The video url is timeout, please try to refresh", Connetction_Error: "Sorry，the video cannot play because of connection error, please try to watch other videos", Fetch_MTS_Error: "Fetching video list failed, please ensure", Token_Expired_Error: "Requesting open api failed, please ensure token expired or not", Video_Lists_Empty_Error: "The video list is empty, please check the format of video", Encrypted_Failed_Error: "Fetching encrypted file failed, please check the permission of player", Fetch_Failed_Permission_Error: "Fetching video list failed, please check the permission of player", Invalidate_Param_Error: "No video url, please check the parameters", AutoPlayDelayDisplayText: "Play in $$ seconds", Fetch_MTS_NOT_NotStream_Error: "The vid has no stream to play", Cancel_Text: "Cancel", OK_Text: "OK", Auto_Stream_Tip_Text: "Internet is slow, does switch to $$", Open_Html_By_File: "Html page should be on the server", Cant_Use_Flash_On_Mobile: "Mobile doesn't support flash player，please use h5 player" };
    }, {}], 15: [function (a, b, c) {
        b.exports = b.exports = { OD: "原画", FD: "流畅", LD: "标清", SD: "高清", HD: "超清", "2K": "2K", "4K": "4K", FHD: "全高清", XLD: "极速", Forbidden_Text: "内部信息，严禁外传", Refresh: "刷新", Diagnosis: "诊断", Live_Finished: "直播已结束,谢谢观看", Play: "播放", Pause: "暂停", Snapshot: "截图", Replay: "重播", Live: "直播", Encrypt: "加密", Sound: "声音", Fullscreen: "全屏", Exist_Fullscreen: "退出全屏", Resolution: "清晰度", Next: "下一集", Brightness: "亮度", Default: "默认", Contrast: "对比度", Titles_Credits: "片头片尾", Skip_Titles: "跳过片头", Skip_Credits: "跳过片尾", Not_Support_Out_Site: "该视频暂不支持站外播放，请到淘TV观看", Watch_Now: "立即观看", Network_Error: "网络无法连接，请尝试检查网络后刷新试试", Video_Error: "视频播放异常，请刷新试试", Decode_Error: "播放数据解码错误", Live_Not_Start: "亲，直播还未开始哦，敬请期待", Live_Loading: "直播信息加载中，请刷新试试", Live_End: "亲，直播已结束", Live_Abrot: "当前直播信号中断，请刷新后重试", Corss_Domain_Error: "请确认您的域名已完成备案和CNAME绑定，\r\n并处于启用状态，或资源允许跨越访问", Url_Timeout_Error: "您所观看的视频地址连接超时，请刷新后重试", Connetction_Error: "抱歉,该视频由于连接错误暂时不能播放,请观看其它视频", Fetch_MTS_Error: "获取视频列表失败，请确认", Token_Expired_Error: "请求接口失败，请确认Token是否过期", Video_Lists_Empty_Error: "获取视频列表为空，请确认播放数据与格式", Encrypted_Failed_Error: "获取视频加密秘钥错误，请确认播放权限", Fetch_Failed_Permission_Error: "获取视频列表失败，请确认播放权限", Invalidate_Param_Error: "无输入视频，请确认输入参数", AutoPlayDelayDisplayText: "$$秒以后开始播放", Fetch_MTS_NOT_NotStream_Error: "此vid没有可播放视频", Cancel_Text: "取消", OK_Text: "确认", Auto_Stream_Tip_Text: "网络不给力，是否切换到$$", Fetch_Playauth_Error: "获取播放凭证出错啦，请尝试退出重试或刷新", Open_Html_By_File: "不能直接在浏览器打开html文件，请部署到服务端", Cant_Use_Flash_On_Mobile: "移动端不支持Flash播放器，请使用h5播放器" };
    }, {}], 16: [function (a, b, c) {
        var d = a("../config"),
            e = a("../lib/storage"),
            f = (a("../lib/io"), "aliplayer_lang_data"),
            g = "aliplayer_lang",
            h = function h() {
            if (void 0 === window[g] || !window[g]) {
                var a = (navigator.language || navigator.browserLanguage).toLowerCase();a = a && a.indexOf("zh") > -1 ? "zh-cn" : "en-us", window[g] = a;
            }return window[g];
        },
            i = function i(b, c) {
            var d = window[g];if (void 0 !== b && b || (b = h()), "en-us" != b && "zh-cn" != b) throw new Error('please set language property to be "en-us" or "zh-cn"');if (window[g] = b, j(c), b != d) {
                a("../lib/constants").updateByLanguage();
            }
        },
            j = function j(b) {
            var c = n(b),
                d = e.get(c);if (d) k(b, JSON.parse(d));else {
                var f = "",
                    g = m();f = a("flash" == b ? "en-us" == g ? "./flash/en-us" : "./flash/zh-cn" : "en-us" == g ? "./en-us" : "./zh-cn"), e.set(c, JSON.stringify(f)), k(b, f);
            }
        },
            k = function k(a, b) {
            var c = n(a);window[c] = b;
        },
            l = function l(a, b) {
            var c = n(a);return window[c];
        },
            m = function m() {
            var a = h();return "en-us" != a && "zh-cn" != a && (a = "en-us"), a;
        },
            n = function n(a) {
            var b = m();return a || (a = "h5"), f + "_" + a + "_" + d.h5Version.replace(/\./g, "_") + "_" + b;
        },
            o = function o(a, b) {
            b || (b = "h5");var c = n(b),
                d = window[c];if (d) return d[a];
        };b.exports.setCurrentLanguage = i, b.exports.getCurrentLanguage = h, b.exports.getLanguageData = l, b.exports.load = j, b.exports.get = o;
    }, { "../config": 10, "../lib/constants": 19, "../lib/io": 25, "../lib/storage": 30, "./en-us": 13, "./flash/en-us": 14, "./flash/zh-cn": 15, "./zh-cn": 17 }], 17: [function (a, b, c) {
        b.exports = b.exports = { OD: "原画", FD: "流畅", LD: "标清", SD: "高清", HD: "超清", "2K": "2K", "4K": "4K", FHD: "全高清", XLD: "极速", Speed_Text: "倍速", Speed_1X_Text: "1X", Speed_125X_Text: "1.25X", Speed_15X_Text: "1.5X", Speed_2X_Text: "2X", Quality_Change_Fail_Switch_Text: "不能播放，切换为", Quality_Change_Text: "正在为您切换到 ", Quality_The_Url: "此地址", Refresh_Text: "刷新", Detection_Text: "诊断", Cancel: "取消", Mute: "静音", Snapshot: "截图", Play_DateTime: "播放时间", AutoPlayDelayDisplayText: "$$秒以后开始播放", Error_Load_Abort_Text: "获取数据过程被中止", Error_Network_Text: "网络错误加载数据失败", Error_Decode_Text: "解码错误", Error_Server_Network_NotSupport_Text: "服务器、网络错误或格式不支持", Error_Offline_Text: "网络不可用，请确定", Error_Play_Text: "播放出错啦", Error_Retry_Text: "请尝试退出重试或刷新", Error_AuthKey_Text: "可能鉴权过期、域名不在白名单或请求被拦截", Error_H5_Not_Support_Text: "h5不支持此格式，请使用flash播放器", Error_Not_Support_M3U8_Text: "浏览器不支持m3u8视频播放", Error_Not_Support_MP4_Text: "浏览器不支持mp4视频播放", Error_Not_Support_encrypt_Text: "h5不支持加密视频的播放，请设置useFlashPrism为true", Error_Vod_URL_Is_Empty_Text: "获取播放地址为空", Error_Vod_Fetch_Urls_Text: "获取地址出错啦，请尝试退出重试或刷新", Fetch_Playauth_Error: "获取播放凭证出错啦，请尝试退出重试或刷新", Error_Playauth_Decode_Text: "playauth解析错误", Error_Vid_Not_Same_Text: "不能更新地址，vid和播放中的不一致", Error_Playauth_Expired_Text: "凭证已过期，请尝试退出重试或刷新", Error_MTS_Fetch_Urls_Text: "MTS获取取数失败", Error_Load_M3U8_Failed_Text: "获取m3u8文件失败", Error_Load_M3U8_Timeout_Text: "获取m3u8文件超时", Error_M3U8_Decode_Text: "获取m3u8文件解析失败", Error_TX_Decode_Text: "解析数据出错", Error_Waiting_Timeout_Text: "缓冲数据超时，请尝试退出重试或刷新", Error_Invalidate_Source: "无效地址", Error_Fetch_NotStream: "此vid没有可播放视频", Error_Not_Found: "播放地址不存在", Live_End: "亲，直播已结束", Play_Before_Fullscreen: "播放后再全屏", Can_Not_Seekable: "不能seek到这里", Cancel_Text: "取消", OK_Text: "确认", Auto_Stream_Tip_Text: "网络不给力，是否切换到$$", Request_Block_Text: "浏览器安全策略视频地址不能为http协议，与网站https协议不一致", Open_Html_By_File: "不能直接在浏览器打开html文件，请部署到服务端", Maybe_Cors_Error: "请确认是否开启了允许跨域访问<a href='https://help.aliyun.com/document_detail/62950.html?spm=a2c4g.11186623.2.21.Y3n2oi' target='_blank'>参考文档</a>", Speed_Switch_To: "倍速切换到 ", Curent_Volume: "当前音量：", Volume_Mute: "设置为静音", Volume_UnMute: "设置为非静音", ShiftLiveTime_Error: "直播开始时间不能大于直播结束时间", Error_Not_Support_Format_On_Mobile: "移动端不支持flv、rmtp视频，请使用m3u8", SessionId_Ticket_Invalid: "DRM视频播放，sessionId和ticket属性不能为空", Http_Error: "Http网络请求失败", Http_Timeout: "http请求超时", DRM_License_Expired: "DRM license超时，请刷新", Not_Support_DRM: "浏览器不支持DRM视频的播放" };
    }, {}], 18: [function (a, b, c) {
        var d = a("./oo"),
            e = a("../player/base/event/eventtype");b.exports.stopPropagation = function (a) {
            window.event ? window.event.cancelBubble = !0 : a.stopPropagation();
        }, b.exports.register = function (a) {
            a.util = { stopPropagation: b.exports.stopPropagation }, a.Component = d.extend, a.EventType = e.Player;
        };
    }, { "../player/base/event/eventtype": 38, "./oo": 28 }], 19: [function (a, b, c) {
        var d = a("../lang/index");b.exports.LOAD_START = "loadstart", b.exports.LOADED_METADATA = "loadedmetadata", b.exports.LOADED_DATA = "loadeddata", b.exports.PROGRESS = "progress", b.exports.CAN_PLAY = "canplay", b.exports.CAN_PLYA_THROUGH = "canplaythrough", b.exports.PLAY = "play", b.exports.PAUSE = "pause", b.exports.ENDED = "ended", b.exports.PLAYING = "playing", b.exports.WAITING = "waiting", b.exports.ERROR = "error", b.exports.SUSPEND = "suspend", b.exports.STALLED = "stalled", b.exports.AuthKeyExpiredEvent = "authkeyexpired", b.exports.DRMKeySystem = { 4: "com.microsoft.playready", 5: "com.widevine.alpha" }, b.exports.EncryptionType = { Private: 1, Standard: 2, ChinaDRM: 3, PlayReady: 4, Widevine: 5 }, b.exports.DRMType = { Widevine: "Widevine", PlayReady: "PlayReady" }, b.exports.ErrorCode = { InvalidParameter: 4001, AuthKeyExpired: 4002, InvalidSourceURL: 4003, NotFoundSourceURL: 4004, StartLoadData: 4005, LoadedMetadata: 4006, PlayingError: 4007, LoadingTimeout: 4008, RequestDataError: 4009, EncrptyVideoNotSupport: 4010, FormatNotSupport: 4011, PlayauthDecode: 4012, PlayDataDecode: 4013, NetworkUnavaiable: 4014, UserAbort: 4015, NetworkError: 4016, URLsIsEmpty: 4017, CrossDomain: 4027, OtherError: 4400, ServerAPIError: 4500 }, b.exports.AuthKeyExpired = 7200, b.exports.AuthKeyRefreshExpired = 7e3, b.exports.AuthInfoExpired = 100, b.exports.VideoErrorCode = { 1: 4015, 2: 4016, 3: 4013, 4: 4400 }, b.exports.IconType = { FontClass: "fontclass", Symbol: "symbol", Sprite: "Sprite" }, b.exports.SelectedStreamLevel = "selectedStreamLevel", b.exports.WidthMapToLevel = { 0: "OD", 640: "FD", 960: "LD", 1280: "SD", 1920: "HD", 2580: "2K", 3840: "4K" };var e = function e() {
            b.exports.VideoErrorCodeText = { 1: d.get("Error_Load_Abort_Text"), 2: d.get("Error_Network_Text"), 3: d.get("Error_Decode_Text"), 4: d.get("Error_Server_Network_NotSupport_Text") }, b.exports.VideoLevels = { 0: d.get("OD"), 640: d.get("FD"), 960: d.get("LD"), 1280: d.get("SD"), 1920: d.get("HD"), 2580: d.get("2K"), 3840: d.get("4K") }, b.exports.QualityLevels = {
                OD: d.get("OD"), LD: d.get("LD"), FD: d.get("FD"), SD: d.get("SD"), HD: d.get("HD"), "2K": d.get("2K"), "4K": d.get("4K"), XLD: d.get("XLD"), FHD: d.get("FHD") }, b.exports.SpeedLevels = [{ key: 1, text: d.get("Speed_1X_Text") }, { key: 1.25, text: d.get("Speed_125X_Text") }, { key: 1.5, text: d.get("Speed_15X_Text") }, { key: 2, text: d.get("Speed_2X_Text") }];
        };e(), b.exports.updateByLanguage = e;
    }, { "../lang/index": 16 }], 20: [function (a, b, c) {
        b.exports.get = function (a) {
            for (var b = a + "", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
                var e = c[d].trim();if (0 == e.indexOf(b)) return unescape(e.substring(b.length + 1, e.length));
            }return "";
        }, b.exports.set = function (a, b, c) {
            var d = new Date();d.setTime(d.getTime() + 24 * c * 60 * 60 * 1e3);var e = "expires=" + d.toGMTString();document.cookie = a + "=" + escape(b) + "; " + e;
        };
    }, {}], 21: [function (a, b, c) {
        var d = a("./object");b.exports.cache = {}, b.exports.guid = function (a, b) {
            var c,
                d = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
                e = [];if (b = b || d.length, a) for (c = 0; c < a; c++) {
                e[c] = d[0 | Math.random() * b];
            } else {
                var f;for (e[8] = e[13] = e[18] = e[23] = "-", e[14] = "4", c = 0; c < 36; c++) {
                    e[c] || (f = 0 | 16 * Math.random(), e[c] = d[19 == c ? 3 & f | 8 : f]);
                }
            }return e.join("");
        }, b.exports.expando = "vdata" + new Date().getTime(), b.exports.getData = function (a) {
            var c = a[b.exports.expando];return c || (c = a[b.exports.expando] = b.exports.guid(), b.exports.cache[c] = {}), b.exports.cache[c];
        }, b.exports.hasData = function (a) {
            var c = a[b.exports.expando];return !(!c || d.isEmpty(b.exports.cache[c]));
        }, b.exports.removeData = function (a) {
            var c = a[b.exports.expando];if (c) {
                delete b.exports.cache[c];try {
                    delete a[b.exports.expando];
                } catch (c) {
                    a.removeAttribute ? a.removeAttribute(b.exports.expando) : a[b.exports.expando] = null;
                }
            }
        };
    }, { "./object": 27 }], 22: [function (a, b, c) {
        var d = a("./object");b.exports.el = function (a) {
            return document.getElementById(a);
        }, b.exports.createEl = function (a, b) {
            var c;return a = a || "div", b = b || {}, c = document.createElement(a), d.each(b, function (a, b) {
                -1 !== a.indexOf("aria-") || "role" == a ? c.setAttribute(a, b) : c[a] = b;
            }), c;
        }, b.exports.addClass = function (a, b) {
            -1 == (" " + a.className + " ").indexOf(" " + b + " ") && (a.className = "" === a.className ? b : a.className + " " + b);
        }, b.exports.removeClass = function (a, b) {
            var c, d;if (-1 != a.className.indexOf(b)) {
                for (c = a.className.split(" "), d = c.length - 1; d >= 0; d--) {
                    c[d] === b && c.splice(d, 1);
                }a.className = c.join(" ");
            }
        }, b.exports.getElementAttributes = function (a) {
            var b, c, d, e, f;if (b = {}, c = ",autoplay,controls,loop,muted,default,", a && a.attributes && a.attributes.length > 0) {
                d = a.attributes;for (var g = d.length - 1; g >= 0; g--) {
                    e = d[g].name, f = d[g].value, "boolean" != typeof a[e] && -1 === c.indexOf("," + e + ",") || (f = null !== f), b[e] = f;
                }
            }return b;
        }, b.exports.insertFirst = function (a, b) {
            b.firstChild ? b.insertBefore(a, b.firstChild) : b.appendChild(a);
        }, b.exports.blockTextSelection = function () {
            document.body.focus(), document.onselectstart = function () {
                return !1;
            };
        }, b.exports.unblockTextSelection = function () {
            document.onselectstart = function () {
                return !0;
            };
        }, b.exports.css = function (a, b, c) {
            return !(!a || !a.style) && (b && c ? (a.style[b] = c, !0) : c || "string" != typeof b ? !c && "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (d.each(b, function (b, c) {
                a.style[b] = c;
            }), !0) : a.style[b]);
        }, b.exports.getTransformName = function (a) {
            var b,
                c,
                d = ["transform", "WebkitTransform", "MozTransform", "msTransform", "OTransform"],
                e = d[0];for (b = 0, c = d.length; b < c; b++) {
                if (void 0 !== a.style[d[b]]) {
                    e = d[b];break;
                }
            }return e;
        };
    }, { "./object": 27 }], 23: [function (a, b, c) {
        function d(a, b, c, d) {
            e.each(c, function (c) {
                a(b, c, d);
            });
        }var e = a("./object"),
            f = a("./data");b.exports.on = function (a, c, g) {
            if (e.isArray(c)) return d(b.exports.on, a, c, g);var h = f.getData(a);h.handlers || (h.handlers = {}), h.handlers[c] || (h.handlers[c] = []), g.guid || (g.guid = f.guid()), h.handlers[c].push(g), h.dispatcher || (h.disabled = !1, h.dispatcher = function (c) {
                if (!h.disabled) {
                    c = b.exports.fixEvent(c);var d = h.handlers[c.type];if (d) for (var e = d.slice(0), f = 0, g = e.length; f < g && !c.isImmediatePropagationStopped(); f++) {
                        e[f].call(a, c);
                    }
                }
            }), 1 == h.handlers[c].length && (a.addEventListener ? a.addEventListener(c, h.dispatcher, !1) : a.attachEvent && a.attachEvent("on" + c, h.dispatcher));
        }, b.exports.off = function (a, c, g) {
            if (f.hasData(a)) {
                var h = f.getData(a);if (h.handlers) {
                    if (e.isArray(c)) return d(b.exports.off, a, c, g);var i = function i(c) {
                        h.handlers[c] = [], b.exports.cleanUpEvents(a, c);
                    };if (c) {
                        var j = h.handlers[c];if (j) {
                            if (!g) return void i(c);if (g.guid) for (var k = 0; k < j.length; k++) {
                                j[k].guid === g.guid && j.splice(k--, 1);
                            }b.exports.cleanUpEvents(a, c);
                        }
                    } else for (var l in h.handlers) {
                        i(l);
                    }
                }
            }
        }, b.exports.cleanUpEvents = function (a, b) {
            var c = f.getData(a);0 === c.handlers[b].length && (delete c.handlers[b], a.removeEventListener ? a.removeEventListener(b, c.dispatcher, !1) : a.detachEvent && a.detachEvent("on" + b, c.dispatcher)), e.isEmpty(c.handlers) && (delete c.handlers, delete c.dispatcher, delete c.disabled), e.isEmpty(c) && f.removeData(a);
        }, b.exports.fixEvent = function (a) {
            function b() {
                return !0;
            }function c() {
                return !1;
            }if (!a || !a.isPropagationStopped) {
                var d = a || window.event;a = {};for (var e in d) {
                    "layerX" !== e && "layerY" !== e && "keyboardEvent.keyLocation" !== e && ("returnValue" == e && d.preventDefault || (a[e] = d[e]));
                }if (a.target || (a.target = a.srcElement || document), a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement, a.preventDefault = function () {
                    d.preventDefault && d.preventDefault(), a.returnValue = !1, a.isDefaultPrevented = b, a.defaultPrevented = !0;
                }, a.isDefaultPrevented = c, a.defaultPrevented = !1, a.stopPropagation = function () {
                    d.stopPropagation && d.stopPropagation(), a.cancelBubble = !0, a.isPropagationStopped = b;
                }, a.isPropagationStopped = c, a.stopImmediatePropagation = function () {
                    d.stopImmediatePropagation && d.stopImmediatePropagation(), a.isImmediatePropagationStopped = b, a.stopPropagation();
                }, a.isImmediatePropagationStopped = c, null != a.clientX) {
                    var f = document.documentElement,
                        g = document.body;a.pageX = a.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = a.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0);
                }a.which = a.charCode || a.keyCode, null != a.button && (a.button = 1 & a.button ? 0 : 4 & a.button ? 1 : 2 & a.button ? 2 : 0);
            }return a;
        }, b.exports.trigger = function (a, c) {
            var d = f.hasData(a) ? f.getData(a) : {},
                e = a.parentNode || a.ownerDocument;if ("string" == typeof c) {
                var g = null;(a.paramData || 0 == a.paramData) && (g = a.paramData, a.paramData = null, a.removeAttribute(g)), c = { type: c, target: a, paramData: g };
            }if (c = b.exports.fixEvent(c), d.dispatcher && d.dispatcher.call(a, c), e && !c.isPropagationStopped() && !1 !== c.bubbles) b.exports.trigger(e, c);else if (!e && !c.defaultPrevented) {
                var h = f.getData(c.target);c.target[c.type] && (h.disabled = !0, "function" == typeof c.target[c.type] && c.target[c.type](), h.disabled = !1);
            }return !c.defaultPrevented;
        }, b.exports.one = function (a, c, g) {
            if (e.isArray(c)) return d(b.exports.one, a, c, g);var h = function h() {
                b.exports.off(a, c, h), g.apply(this, arguments);
            };h.guid = g.guid = g.guid || f.guid(), b.exports.on(a, c, h);
        };
    }, { "./data": 21, "./object": 27 }], 24: [function (a, b, c) {
        var d = a("./data");b.exports.bind = function (a, b, c) {
            b.guid || (b.guid = d.guid());var e = function e() {
                return b.apply(a, arguments);
            };return e.guid = c ? c + "_" + b.guid : b.guid, e;
        };
    }, { "./data": 21 }], 25: [function (a, b, c) {
        var d = a("./url");b.exports.get = function (a, c, d, e, f) {
            b.exports.ajax("GET", a, "", c, d, e, f);
        }, b.exports.post = function (a, c, d, e, f, g) {
            var h = {};h["Content-Type"] = "application/x-www-form-urlencoded", h.Accept = "application/json", b.exports.ajax("POST", a, c, d, e, f, g, h);
        }, b.exports.ajax = function (a, b, c, e, f, g, h, i) {
            var j, k, l, m, n;f = f || function () {}, "undefined" == typeof XMLHttpRequest && (window.XMLHttpRequest = function () {
                try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
                } catch (a) {}try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
                } catch (a) {}try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP");
                } catch (a) {}throw new Error("This browser does not support XMLHttpRequest.");
            }), k = new XMLHttpRequest(), l = d.parseUrl(b), m = window.location, n = l.protocol + l.host !== m.protocol + m.host, !n || !window.XDomainRequest || "withCredentials" in k ? (j = "file:" == l.protocol || "file:" == m.protocol, k.onreadystatechange = function () {
                4 === k.readyState && (200 === k.status || j && 0 === k.status ? e(k.responseText) : f(k.responseText));
            }) : (k = new window.XDomainRequest(), k.onload = function () {
                e(k.responseText);
            }, k.onerror = f, k.onprogress = function () {}, k.ontimeout = f);try {
                if (void 0 === g && (g = !0), k.open(a, b, g), h && (k.withCredentials = !0), i) for (var o in i) {
                    k.setRequestHeader(o, i[o]);
                }
            } catch (a) {
                return void f(a);
            }try {
                k.send(c);
            } catch (a) {
                f(a);
            }
        }, b.exports.jsonp = function (a, b, c) {
            var d = "jsonp_callback_" + Math.round(1e5 * Math.random()),
                e = document.createElement("script");a && (e.src = a + (a.indexOf("?") >= 0 ? "&" : "?") + "callback=" + d + "&cb=" + d, e.onerror = function () {
                delete window[d], document.body.removeChild(e), c();
            }, e.onload = function () {
                setTimeout(function () {
                    window[d] && (delete window[d], document.body.removeChild(e));
                }, 0);
            }, window[d] = function (a) {
                delete window[d], document.body.removeChild(e), b(a);
            }, document.body.appendChild(e));
        }, b.exports.loadJS = function (a, b) {
            var c = document.getElementsByTagName("HEAD").item(0),
                d = document.createElement("script");d.type = "text/javascript", d.src = a, d.onload = function () {
                b && b();
            }, c.appendChild(d);
        };
    }, { "./url": 32 }], 26: [function (a, b, c) {
        var d = a("./dom");b.exports.render = function (a, b) {
            var c = b.align ? b.align : "tl",
                e = b.x ? b.x : 0,
                f = b.y ? b.y : 0;xunit = e.indexOf && e.indexOf("%") > 0 ? "" : "px", yunit = f.indexOf && f.indexOf("%") > 0 ? "" : "px", "tl" === c ? d.css(a, { float: "left", "margin-left": e + xunit, "margin-top": f + yunit }) : "tr" === c ? d.css(a, { float: "right", "margin-right": e + xunit, "margin-top": f + yunit }) : "tlabs" === c ? d.css(a, { position: "absolute", left: e + xunit, top: f + yunit }) : "trabs" === c ? d.css(a, { position: "absolute", right: e + xunit, top: f + yunit }) : "blabs" === c ? d.css(a, { position: "absolute", left: e + xunit, bottom: f + yunit }) : "brabs" === c ? d.css(a, { position: "absolute", right: e + xunit, bottom: f + yunit }) : "cc" === c && d.css(a, { position: "absolute", left: "50%", top: "50%", "margin-top": a.offsetHeight / -2 + "px", "margin-left": a.offsetWidth / -2 + "px" });
        };
    }, { "./dom": 22 }], 27: [function (a, b, c) {
        var d = Object.prototype.hasOwnProperty;b.exports.create = Object.create || function (a) {
            function b() {}return b.prototype = a, new b();
        }, b.exports.isArray = function (a) {
            return "[object Array]" === Object.prototype.toString.call(arg);
        }, b.exports.isEmpty = function (a) {
            for (var b in a) {
                if (null !== a[b]) return !1;
            }return !0;
        }, b.exports.each = function (a, c, e) {
            if (b.exports.isArray(a)) for (var f = 0, g = a.length; f < g && !1 !== c.call(e || this, a[f], f); ++f) {} else for (var h in a) {
                if (d.call(a, h) && !1 === c.call(e || this, h, a[h])) break;
            }return a;
        }, b.exports.merge = function (a, b) {
            if (!b) return a;for (var c in b) {
                d.call(b, c) && (a[c] = b[c]);
            }return a;
        }, b.exports.deepMerge = function (a, c) {
            var e, f, g;a = b.exports.copy(a);for (e in c) {
                d.call(c, e) && (f = a[e], g = c[e], b.exports.isPlain(f) && b.exports.isPlain(g) ? a[e] = b.exports.deepMerge(f, g) : a[e] = c[e]);
            }return a;
        }, b.exports.copy = function (a) {
            return b.exports.merge({}, a);
        }, b.exports.isPlain = function (a) {
            return !!a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) && "[object Object]" === a.toString() && a.constructor === Object;
        }, b.exports.isArray = Array.isArray || function (a) {
            return "[object Array]" === Object.prototype.toString.call(a);
        }, b.exports.unescape = function (a) {
            return a.replace(/&([^;]+);/g, function (a, b) {
                return { amp: "&", lt: "<", gt: ">", quot: '"', "#x27": "'", "#x60": "`" }[b.toLowerCase()] || a;
            });
        };
    }, {}], 28: [function (a, b, c) {
        var d = a("./object"),
            e = function e() {},
            e = function e() {};e.extend = function (a) {
            var b, c;a = a || {}, b = a.init || a.init || this.prototype.init || this.prototype.init || function () {}, c = function c() {
                b.apply(this, arguments);
            }, c.prototype = d.create(this.prototype), c.prototype.constructor = c, c.extend = e.extend, c.create = e.create;for (var f in a) {
                a.hasOwnProperty(f) && (c.prototype[f] = a[f]);
            }return c;
        }, e.create = function () {
            var a = d.create(this.prototype);return this.apply(a, arguments), a;
        }, b.exports = e;
    }, { "./object": 27 }], 29: [function (a, b, c) {
        var d = a("./object"),
            e = a("../config"),
            f = a("./dom"),
            g = a("./cookie"),
            h = a("./constants"),
            i = a("./ua"),
            j = a("../player/base/plugin/defaultemptycomponent"),
            k = { preload: !1, autoplay: !0, useNativeControls: !1, width: "100%", height: "300px", cover: "", from: "", trackLog: !0, isLive: !1, playsinline: !0, showBarTime: 5e3, rePlay: !1, liveRetry: 5, liveRetryInterval: 1, liveRetryStep: 0, format: "mp4", loadDataTimeout: 20, controlBarForOver: !1, controlBarVisibility: "hover", enableSystemMenu: !1, qualitySort: "asc", x5_video_position: "normal", x5_type: "h5", x5_fullscreen: !1, x5_orientation: "portraint", autoPlayDelay: 0, autoPlayDelayDisplayText: "", useHlsPluginForSafari: !1, language: "zh-cn", mediaType: "video", components: [], liveTimeShiftUrl: "", videoHeight: "100%", videoWidth: "100%", snapshotWatermark: { left: "500", top: "100", text: "", font: "16px 宋体", fillColor: "#FFFFFF", strokeColor: "#FFFFFF" }, liveStartTime: "", liveOverTime: "", enableStashBufferForFlv: !0, stashInitialSizeForFlv: 32, skinRes: "//" + e.domain + "/de/prismplayer-flash/" + e.flashVersion + "/atlas/defaultSkin" };b.exports.defaultH5Layout = [{ name: "bigPlayButton", align: "blabs", x: 30, y: 80 }, { name: "H5Loading", align: "cc" }, { name: "errorDisplay", align: "tlabs", x: 0, y: 0 }, { name: "infoDisplay", align: "cc" }, { name: "controlBar", align: "blabs", x: 0, y: 0, children: [{ name: "progress", align: "blabs", x: 0, y: 44 }, { name: "playButton", align: "tl", x: 15, y: 12 }, { name: "timeDisplay", align: "tl", x: 10, y: 7 }, { name: "fullScreenButton", align: "tr", x: 10, y: 10 }, { name: "volume", align: "tr", x: 10, y: 10 }, { name: "streamButton", align: "tr", x: 0, y: 10 }, { name: "speedButton", align: "tr", x: 0, y: 10 }] }], b.exports.defaultAudioLayout = [{ name: "controlBar", align: "blabs", x: 0, y: 0, children: [{ name: "progress", align: "blabs", x: 0, y: 44 }, { name: "playButton", align: "tl", x: 15, y: 12 }, { name: "timeDisplay", align: "tl", x: 10, y: 7 }, { name: "volume", align: "tr", x: 10, y: 10 }, { name: "streamButton", align: "tr", x: 0, y: 10 }] }], b.exports.defaultFlashLayout = [{ name: "bigPlayButton", align: "blabs", x: 30, y: 80 }, { name: "controlBar", align: "blabs", x: 0, y: 0, children: [{ name: "progress", align: "tlabs", x: 0, y: 0 }, { name: "playButton", align: "tl", x: 15, y: 26 }, { name: "nextButton", align: "tl", x: 10, y: 26 }, { name: "timeDisplay", align: "tl", x: 10, y: 24 }, { name: "fullScreenButton", align: "tr", x: 10, y: 25 }, { name: "streamButton", align: "tr", x: 10, y: 23 }, { name: "volume", align: "tr", x: 10, y: 25 }] }, { name: "fullControlBar", align: "tlabs", x: 0, y: 0, children: [{ name: "fullTitle", align: "tl", x: 25, y: 6 }, { name: "fullNormalScreenButton", align: "tr", x: 24, y: 13 }, { name: "fullTimeDisplay", align: "tr", x: 10, y: 12 }, { name: "fullZoom", align: "cc" }] }], b.exports.canPlayType = function (a) {
            var b = document.createElement("video");return b.canPlayType ? b.canPlayType(a) : "";
        }, b.exports.canPlayHls = function () {
            return "" != b.exports.canPlayType("application/x-mpegURL");
        }, b.exports.isSafariUsedHlsPlugin = function (a) {
            return !!(i.os.pc && i.browser.safari && a && i.browser.version.indexOf("11.") < 0);
        }, b.exports.hasUIComponent = function (a, c) {
            if (void 0 === a || !a || 0 == a.length) return !1;var d = 0,
                e = a.length;for (d; d < e; d++) {
                var f = a[d].name;if (f == c) return !0;if ("controlBar" == f) return b.exports.hasUIComponent(a[d].children, c);
            }return !1;
        }, b.exports.validateSource = function (a) {
            if (a) {
                return !!new RegExp(".m3u8|.mp4|.mp3|.flv|rtmp", "i").test(a);
            }return !0;
        }, b.exports.supportH5Video = function () {
            return void 0 !== document.createElement("video").canPlayType;
        }, b.exports.createWrapper = function (a) {
            var c,
                d = a.id;if ("string" == typeof d ? (0 === d.indexOf("#") && (d = d.slice(1)), c = f.el(d)) : c = d, !c || !c.nodeName) throw new TypeError("没有为播放器指定容器");return b.exports.adjustContainerLayout(c, a), c;
        }, b.exports.adjustContainerLayout = function (a, b) {
            b.width && !a.style.width && (a.style.width = b.width), b.height && !a.style.height && (a.style.height = b.height);
        }, b.exports.isSupportHls = function () {
            var a = window.MediaSource = window.MediaSource || window.WebKitMediaSource,
                b = window.SourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer,
                c = a && "function" == typeof a.isTypeSupported && a.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),
                d = !b || b.prototype && "function" == typeof b.prototype.appendBuffer && "function" == typeof b.prototype.remove;return c && d;
        }, b.exports.isSupportFlv = function () {
            return b.exports.isSupportHls();
        }, b.exports.isSupportMSE = function () {
            return !!window.Promise && !!window.Uint8Array && !!Array.prototype.forEach && b.exports.isSupportedMediaSource();
        }, b.exports.isSupportedMediaSource = function () {
            return !!window.MediaSource && !!MediaSource.isTypeSupported;
        }, b.exports.isSupportedDrm = function () {
            return !!(window.MediaKeys && window.navigator && window.navigator.requestMediaKeySystemAccess && window.MediaKeySystemAccess && window.MediaKeySystemAccess.prototype.getConfiguration) && b.exports.isSupportMSE();
        }, b.exports.isAudio = function (a) {
            return a && a.toLowerCase().indexOf(".mp3") > 0;
        }, b.exports.isLiveShift = function (a) {
            return a.isLive && a.liveTimeShiftUrl;
        }, b.exports.isHls = function (a) {
            return a && a.toLowerCase().indexOf(".m3u8") > 0;
        }, b.exports.isDash = function (a) {
            return a && a.toLowerCase().indexOf(".mpd") > 0;
        }, b.exports.isFlv = function (a) {
            return a && a.toLowerCase().indexOf(".flv") > 0;
        }, b.exports.isRTMP = function (a) {
            return a && a.toLowerCase().indexOf("rtmp:") > -1;
        }, b.exports.findSelectedStreamLevel = function (a) {
            var b = g.get(h.SelectedStreamLevel);if (!b) return g.set(h.SelectedStreamLevel, a[0].definition, 365), 0;for (var c = 0; c < a.length; c++) {
                if (a[c].definition == b) return c;
            }return 0;
        }, b.exports.handleOption = function (a, c) {
            var e = d.merge(d.copy(k), a),
                f = [{ name: "fullScreenButton", align: "tr", x: 20, y: 10 }, { name: "volume", align: "tr", x: 20, y: 10 }],
                g = !1;if (a.useFlashPrism || b.exports.isRTMP(a.source)) g = !0, f = [{ name: "liveIco", align: "tlabs", x: 15, y: 25 }, { name: "fullScreenButton", align: "tr", x: 10, y: 25 }, { name: "volume", align: "tr", x: 10, y: 25 }];else {
                var h = b.exports.isLiveShift(e);h ? (f.push({ name: "liveShiftProgress", align: "tlabs", x: 0, y: 0 }), f.push({ name: "playButton", align: "tl", x: 15, y: 12 }), f.push({ name: "liveShiftTimeDisplay", align: "tl", x: 10, y: 7 })) : f.push({ name: "liveDisplay", align: "tlabs", x: 15, y: 16 });
            }if (a.isLive) if (void 0 === a.skinLayout) e.skinLayout = [{ name: "errorDisplay", align: "tlabs", x: 0, y: 0 }, { name: "infoDisplay", align: "cc" }, { name: "bigPlayButton", align: "blabs", x: 30, y: 80 }, { name: "H5Loading", align: "cc" }, { name: "controlBar", align: "blabs", x: 0, y: 0, children: f }];else if (0 != a.skinLayout) {
                for (var i = a.skinLayout.length, l = [], m = -1, n = 0; n < i; n++) {
                    if ("controlBar" == e.skinLayout[n].name) {
                        m = n;for (var o = e.skinLayout[n].children.length, p = 0; p < o; p++) {
                            var q = e.skinLayout[n].children[p].name;if ("liveDisplay" == q || "liveIco" == q || "fullScreenButton" == q || "volume" == q || "snapshot" == q || h && ("progress" == q || "playButton" == q || "timeDisplay" == q)) {
                                var r = e.skinLayout[n].children[p];"progress" == q ? r.name = "liveShiftProgress" : "timeDisplay" == q ? r.name = "liveShiftTimeDisplay" : g && "liveDisplay" == q && (r.name = "liveIco"), l.push(r);
                            }
                        }break;
                    }
                }-1 != m && (e.skinLayout[m].children = l);
            }return (void 0 === a.components || !a.components || d.isArray(a.components) && 0 == a.components.length) && (e.components = [j]), e;
        };
    }, { "../config": 10, "../player/base/plugin/defaultemptycomponent": 58, "./constants": 19, "./cookie": 20, "./dom": 22, "./object": 27, "./ua": 31 }], 30: [function (a, b, c) {
        b.exports.set = function (a, b) {
            try {
                window.localStorage && localStorage.setItem(a, b);
            } catch (c) {
                window[a + "_localStorage"] = b;
            }
        }, b.exports.get = function (a) {
            try {
                if (window.localStorage) return localStorage.getItem(a);
            } catch (b) {
                return window[a + "_localStorage"];
            }return "";
        };
    }, {}], 31: [function (a, b, c) {
        function d() {
            var a = navigator.userAgent,
                c = "other",
                d = b.exports.os;if (d.ios) return "iOS";if (d.android) return "android";if (a.indexOf("Baiduspider") > -1) return "Baiduspider";if (a.indexOf("PlayStation") > -1) return "PS4";var e = "Win32" == navigator.platform || "Windows" == navigator.platform || a.indexOf("Windows") > -1,
                f = "Mac68K" == navigator.platform || "MacPPC" == navigator.platform || "Macintosh" == navigator.platform || "MacIntel" == navigator.platform;return f && (c = "macOS"), "X11" == navigator.platform && !e && !f && (c = "Unix"), String(navigator.platform).indexOf("Linux") > -1 && (c = "Linux"), e ? "windows" : c;
        }function e() {
            var a = navigator.userAgent,
                b = "";return (a.indexOf("Windows NT 5.0") > -1 || a.indexOf("Windows 2000") > -1) && (b = "2000"), (a.indexOf("Windows NT 5.1") > -1 || a.indexOf("Windows XP") > -1) && (b = "XP"), (a.indexOf("Windows NT 5.2") > -1 || a.indexOf("Windows 2003") > -1) && (b = "2003"), (a.indexOf("Windows NT 6.0") > -1 || a.indexOf("Windows Vista") > -1) && (b = "Vista"), (a.indexOf("Windows NT 6.1") > -1 || a.indexOf("Windows 7") > -1) && (b = "7"), (a.indexOf("Windows NT 6.2") > -1 || a.indexOf("Windows 8") > -1) && (b = "8"), (a.indexOf("Windows NT 6.3") > -1 || a.indexOf("Windows 8.1") > -1) && (b = "8.1"), (a.indexOf("Windows NT 10") > -1 || a.indexOf("Windows 10") > -1) && (b = "10"), b;
        }function f() {
            var a = navigator.userAgent.toLowerCase(),
                c = b.exports.browser;return c.firefox ? "Firefox" : c.webview ? "webview" : c.ie ? /edge/.test(a) ? "Edge" : "IE" : c.chrome ? "Chrome" : c.safari ? "Safari" : /baiduspider/.test(a) ? "Baiduspider" : /ucweb/.test(a) || /UCBrowser/.test(a) ? "UC" : /opera/.test(a) ? "Opera" : /ucweb/.test(a) ? "UC" : /360se/.test(a) ? "360浏览器" : /bidubrowser/.test(a) ? "百度浏览器" : /metasr/.test(a) ? "搜狗浏览器" : /lbbrowser/.test(a) ? "猎豹浏览器" : /micromessenger/.test(a) ? "微信内置浏览器" : /qqbrowser/.test(a) ? "QQ浏览器" : /playstation/.test(a) ? "PS4浏览器" : void 0;
        }if (b.exports.USER_AGENT = navigator.userAgent, b.exports.IS_IPHONE = /iPhone/i.test(b.exports.USER_AGENT), b.exports.IS_IPAD = /iPad/i.test(b.exports.USER_AGENT), b.exports.IS_IPOD = /iPod/i.test(b.exports.USER_AGENT), b.exports.IS_MAC = /mac/i.test(b.exports.USER_AGENT), b.exports.IS_EDGE = /Edge/i.test(b.exports.USER_AGENT), b.exports.IS_IE11 = /Trident\/7.0/i.test(b.exports.USER_AGENT), b.exports.IS_CHROME = /Chrome/i.test(b.exports.USER_AGENT) && !b.exports.IS_EDGE, b.exports.IS_SAFARI = /Safari/i.test(b.exports.USER_AGENT) && !b.exports.IS_CHROME, b.exports.IS_FIREFOX = /Firefox/i.test(b.exports.USER_AGENT), document.all) try {
            var g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");b.exports.HAS_FLASH = !!g;
        } catch (a) {
            b.exports.HAS_FLASH = !1;
        } else if (navigator.plugins && navigator.plugins.length > 0) {
            var g = navigator.plugins["Shockwave Flash"];b.exports.HAS_FLASH = !!g;
        } else b.exports.HAS_FLASH = !1;b.exports.IS_MAC_SAFARI = b.exports.IS_MAC && b.exports.IS_SAFARI && !b.exports.IS_CHROME && !b.exports.HAS_FLASH, b.exports.IS_IOS = b.exports.IS_IPHONE || b.exports.IS_IPAD || b.exports.IS_IPOD, b.exports.IOS_VERSION = function () {
            var a = b.exports.USER_AGENT.match(/OS (\d+)_/i);if (a && a[1]) return a[1];
        }(), b.exports.IS_ANDROID = /Android/i.test(b.exports.USER_AGENT), b.exports.ANDROID_VERSION = function () {
            var a,
                c,
                d = b.exports.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i);return d ? (a = d[1] && parseFloat(d[1]), c = d[2] && parseFloat(d[2]), a && c ? parseFloat(d[1] + "." + d[2]) : a || null) : null;
        }(), b.exports.IS_OLD_ANDROID = b.exports.IS_ANDROID && /webkit/i.test(b.exports.USER_AGENT) && b.exports.ANDROID_VERSION < 2.3, b.exports.TOUCH_ENABLED = !!("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch), b.exports.IS_MOBILE = b.exports.IS_IOS || b.exports.IS_ANDROID, b.exports.IS_H5 = b.exports.IS_MOBILE || !b.exports.HAS_FLASH, b.exports.IS_PC = !b.exports.IS_H5, b.exports.is_X5 = /micromessenger/i.test(b.exports.USER_AGENT) || /qqbrowser/i.test(b.exports.USER_AGENT), b.exports.getHost = function (a) {
            var b = "";if (void 0 === a || null == a || "" == a) return "";var c = a.indexOf("//"),
                d = a;c > -1 && (d = a.substring(c + 2));var b = d,
                e = d.split("/");return e && e.length > 0 && (b = e[0]), e = b.split(":"), e && e.length > 0 && (b = e[0]), b;
        }, b.exports.dingTalk = function () {
            return (/dingtalk/i.test(b.exports.USER_AGENT.toLowerCase())
            );
        }, b.exports.wechat = function () {
            return (/micromessenger/i.test(b.exports.USER_AGENT.toLowerCase())
            );
        }, b.exports.inIFrame = function () {
            return self != top;
        }, b.exports.getReferer = function () {
            return b.exports.inIFrame() ? top.document.referrer : document.referrer;
        }, b.exports.getHref = function () {
            return b.exports.inIFrame() ? top.location.href : location.href;
        }, function (a) {
            function b(a, b) {
                var c = this.os = {},
                    g = this.browser = {},
                    h = a.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
                    i = a.match(/(Android);?[\s\/]+([\d.]+)?/),
                    j = !!a.match(/\(Macintosh\; Intel /),
                    k = a.match(/(iPad).*OS\s([\d_]+)/),
                    l = a.match(/(iPod)(.*OS\s([\d_]+))?/),
                    m = !k && a.match(/(iPhone\sOS)\s([\d_]+)/),
                    n = a.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
                    o = /Win\d{2}|Windows/.test(b),
                    p = a.match(/Windows Phone ([\d.]+)/),
                    q = n && a.match(/TouchPad/),
                    r = a.match(/Kindle\/([\d.]+)/),
                    s = a.match(/Silk\/([\d._]+)/),
                    t = a.match(/(BlackBerry).*Version\/([\d.]+)/),
                    u = a.match(/(BB10).*Version\/([\d.]+)/),
                    v = a.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
                    w = a.match(/PlayBook/),
                    x = a.match(/Chrome\/([\d.]+)/) || a.match(/CriOS\/([\d.]+)/),
                    y = a.match(/Firefox\/([\d.]+)/),
                    z = a.match(/\((?:Mobile|Tablet); rv:([\d.]+)\).*Firefox\/[\d.]+/),
                    A = a.match(/MSIE\s([\d.]+)/) || a.match(/Trident\/[\d](?=[^\?]+).*rv:([0-9.].)/),
                    B = !x && a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/),
                    C = B || a.match(/Version\/([\d.]+)([^S](Safari)|[^M]*(Mobile)[^S]*(Safari))/);if ((g.webkit = !!h) && (g.version = h[1]), i && (c.android = !0, c.version = i[2]), m && !l && (c.ios = c.iphone = !0, c.version = m[2].replace(/_/g, ".")), k && (c.ios = c.ipad = !0, c.version = k[2].replace(/_/g, ".")), l && (c.ios = c.ipod = !0, c.version = l[3] ? l[3].replace(/_/g, ".") : null), p && (c.wp = !0, c.version = p[1]), n && (c.webos = !0, c.version = n[2]), q && (c.touchpad = !0), t && (c.blackberry = !0, c.version = t[2]), u && (c.bb10 = !0, c.version = u[2]), v && (c.rimtabletos = !0, c.version = v[2]), w && (g.playbook = !0), r && (c.kindle = !0, c.version = r[1]), s && (g.silk = !0, g.version = s[1]), !s && c.android && a.match(/Kindle Fire/) && (g.silk = !0), x && (g.chrome = !0, g.version = x[1]), y && (g.firefox = !0, g.version = y[1]), z && (c.firefoxos = !0, c.version = z[1]), A && (g.ie = !0, g.version = A[1]), C && (j || c.ios || o || i) && (g.safari = !0, c.ios || (g.version = C[1])), B && (g.webview = !0), j) {
                    var D = a.match(/[\d]*_[\d]*_[\d]*/);D && D.length > 0 && D[0] && (c.version = D[0].replace(/_/g, "."));
                }c.tablet = !!(k || w || i && !a.match(/Mobile/) || y && a.match(/Tablet/) || A && !a.match(/Phone/) && a.match(/Touch/)), c.phone = !(c.tablet || c.ipod || !(i || m || n || t || u || x && a.match(/Android/) || x && a.match(/CriOS\/([\d.]+)/) || y && a.match(/Mobile/) || A && a.match(/Touch/))), c.pc = !c.tablet && !c.phone, j ? c.name = "macOS" : o ? (c.name = "windows", c.version = e()) : c.name = d(), g.name = f();
            }b.call(a, navigator.userAgent, navigator.platform);
        }(b.exports);
    }, {}], 32: [function (a, b, c) {
        var d = a("./dom");b.exports.getAbsoluteURL = function (a) {
            return a.match(/^https?:\/\//) || (a = d.createEl("div", { innerHTML: '<a href="' + a + '">x</a>' }).firstChild.href), a;
        }, b.exports.parseUrl = function (a) {
            var b, c, e, f, g;f = ["protocol", "hostname", "port", "pathname", "search", "hash", "host"], c = d.createEl("a", { href: a }), e = "" === c.host && "file:" !== c.protocol, e && (b = d.createEl("div"), b.innerHTML = '<a href="' + a + '"></a>', c = b.firstChild, b.setAttribute("style", "display:none; position:absolute;"), document.body.appendChild(b)), g = {};for (var h = 0; h < f.length; h++) {
                g[f[h]] = c[f[h]];
            }return e && document.body.removeChild(b), g;
        };
    }, { "./dom": 22 }], 33: [function (a, b, c) {
        var d = a("./dom"),
            e = a("./ua"),
            f = a("./playerutil");b.exports.formatTime = function (a) {
            var b,
                c,
                d,
                e = Math.round(a);return b = Math.floor(e / 3600), e %= 3600, c = Math.floor(e / 60), d = e % 60, !(b === 1 / 0 || isNaN(b) || c === 1 / 0 || isNaN(c) || d === 1 / 0 || isNaN(d)) && (b = b >= 10 ? b : "0" + b, c = c >= 10 ? c : "0" + c, d = d >= 10 ? d : "0" + d, ("00" === b ? "" : b + ":") + c + ":" + d);
        }, b.exports.extractTime = function (a) {
            if (a) {
                var b = parseInt(a.getHours()),
                    c = parseInt(a.getMinutes()),
                    d = parseInt(a.getSeconds());return b = b >= 10 ? b : "0" + b, c = c >= 10 ? c : "0" + c, d = d >= 10 ? d : "0" + d, ("00" === b ? "" : b + ":") + c + ":" + d;
            }return "";
        }, b.exports.convertToTimestamp = function (a, b) {
            var c = "";return a && (b ? c = a.gettime() : (c = Date.parse(a), c /= 1e3)), c;
        }, b.exports.convertToDate = function (a, b) {
            var c = "";if (a) {
                c = new Date();b || 1e3, c.setTime(1e3 * a);
            }return c;
        }, b.exports.parseTime = function (a) {
            var b = a.split(":"),
                c = 0,
                d = 0,
                e = 0;return 3 === b.length ? (c = b[0], d = b[1], e = b[2]) : 2 === b.length ? (d = b[0], e = b[1]) : 1 === b.length && (e = b[0]), c = parseInt(c, 10), d = parseInt(d, 10), e = Math.ceil(parseFloat(e)), 3600 * c + 60 * d + e;
        }, b.exports.formatDate = function (a, b) {
            var c = { "M+": a.getMonth() + 1, "d+": a.getDate(), "H+": a.getHours(), "m+": a.getMinutes(), "s+": a.getSeconds(), "q+": Math.floor((a.getMonth() + 3) / 3), S: a.getMilliseconds() };/(y+)/.test(b) && (b = b.replace(RegExp.$1, (a.getFullYear() + "").substr(4 - RegExp.$1.length)));for (var d in c) {
                new RegExp("(" + d + ")").test(b) && (b = b.replace(RegExp.$1, 1 == RegExp.$1.length ? c[d] : ("00" + c[d]).substr(("" + c[d]).length)));
            }return b;
        }, b.exports.sleep = function (a) {
            for (var b = Date.now(); Date.now() - b <= a;) {}
        }, b.exports.htmlEncodeAll = function (a) {
            return null == a ? "" : a.replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
        }, b.exports.toBinary = function (a) {
            if (!window.atob) return "";for (var b = atob(a), c = b.length, d = new Uint8Array(c), e = 0; e < c; e++) {
                d[e] = b.charCodeAt(e);
            }return d;
        }, b.exports.readyBinary = function (a) {
            for (var b = new Uint8Array(a), c = b.length, d = "", e = 0; e < c; e++) {
                d += b[e];
            }return d;
        }, b.exports.delayHide = function (a, b) {
            a && (void 0 === b && (b = 1e3), a.delayHanlder && clearTimeout(a.delayHanlder), a.delayHanlder = setTimeout(function () {
                d.css(a, "display", "none");
            }, b));
        }, b.exports.openInFile = function () {
            return -1 != window.location.protocol.toLowerCase().indexOf("file");
        }, b.exports.contentProtocolMixed = function (a) {
            return !!(e.os.pc && (f.isHls(a) && !e.browser.safari || f.isFlv(a)) && "https:" == window.location.protocol.toLowerCase() && a && a.toLowerCase().indexOf("http://") > -1);
        }, b.exports.queryString = function (a) {
            var b, c, d, e, f;return a = decodeURIComponent(a), c = a.split("?"), 2 !== c.length ? {} : (f = c[1], (b = f.split("&")) ? (d = {}, e = 0, $(b).each(function () {
                var a;if (a = b[e].split("="), 2 !== a.length) return void e++;d[a[0]] = a[1].replace(/\+/g, " "), e++;
            }), d) : {});
        };
    }, { "./dom": 22, "./playerutil": 29, "./ua": 31 }], 34: [function (a, b, c) {
        var d,
            e,
            f = a("../lib/oo"),
            g = a("../lib/object"),
            h = a("../lib/cookie"),
            i = a("../lib/data"),
            j = a("../lib/io"),
            k = a("../lib/ua"),
            l = a("../config"),
            m = a("../player/base/event/eventtype"),
            n = 0,
            o = { INIT: 1001, CLOSE: 1002, STARTFETCHDATA: 1003, COMPLETEFETCHDATA: 1004, STARTPLAY: 1005, PLAY: 2001, STOP: 2002, PAUSE: 2003, SEEK: 2004, FULLSREEM: 2005, QUITFULLSCREEM: 2006, RESOLUTION: 2007, RESOLUTION_DONE: 2008, RECOVER: 2010, SEEK_END: 2011, LOADSTART: 2015, LOADEDMETADATA: 2016, LOADEDDATA: 2017, CANPLAY: 2018, CANPLAYTHROUGH: 2019, FETCHEDIP: 2020, CDNDETECT: 2021, DETECT: 2022, UNDERLOAD: 3002, LOADED: 3001, HEARTBEAT: 9001, ERROR: 4001 },
            p = f.extend({ init: function init(a, b, c) {
                void 0 === c && (c = !0), this.trackLog = c, this.player = a, this.requestId = "", this.sessionId = i.guid(), this.playId = 0, this.firstPlay = !0, this.osName = k.os.name, this.osVersion = k.os.version || "", this.exName = k.browser.name, this.exVersion = k.browser.version || "";var d = this.player.getOptions(),
                    e = b.from ? b.from : "",
                    f = (d.isLive, "player"),
                    g = d.isLive ? "live" : "vod",
                    h = "pc";k.IS_IPAD ? h = "pad" : k.os.phone && (h = "phone");var m = encodeURIComponent(k.getReferer()),
                    n = k.getHref(),
                    o = encodeURIComponent(n),
                    p = "";n && (p = k.getHost(n));var q = "h5",
                    r = l.h5Version,
                    s = this._getUuid(),
                    t = d.source ? encodeURIComponent(d.source) : "",
                    u = k.getHost(d.source),
                    v = "0",
                    w = this.sessionId,
                    x = "0",
                    y = "0",
                    z = "custom",
                    A = "0.0.0.0",
                    B = "0.0.0.0",
                    C = new Date().getTime();this._userNetInfo = { cdnIp: "", localIp: "" };var D = this;try {
                    var E = function E(a) {
                        D._log("FETCHEDIP", { error: a || "获取IP出错" });
                    };(function (a) {
                        if (this.trackLog) return j.jsonp("https://cdn.dns-detect.alicdn.com/api/cdnDetectHttps?method=createDetectHttps", function (b) {
                            return j.jsonp(b.content, a, E);
                        }, E);
                    })(function (a) {
                        A = D._userNetInfo.cdnIp = a.content.ldns, B = D._userNetInfo.localIp = a.content.localIp, D._log("FETCHEDIP", { cdn_ip: A, local_ip: B });
                    });
                } catch (a) {
                    console.log(a);
                }this.opt = { APIVersion: "0.6.0", t: C, ll: "info", lv: "1.0", pd: f, md: "saas_player", ui: "saas_player", sm: "play", os: this.osName, ov: this.osVersion, et: this.exName, ev: this.exVersion, uat: k.USER_AGENT, hn: "0.0.0.0", bi: e, ri: w, e: x, args: y, vt: g, tt: h, dm: q, av: r, uuid: s, vu: t, vd: u, ua: v, dn: z, cdn_ip: A, app_n: p, r: m, pu: o }, this.bindEvent();
            }, updateVideoInfo: function updateVideoInfo(a) {
                var b = a.from ? a.from : "";this.opt.bi = b, this.updateSourceInfo();
            }, updateSourceInfo: function updateSourceInfo() {
                var a = this.player.getOptions();if (a) {
                    var b = a.source ? encodeURIComponent(a.source) : "",
                        c = k.getHost(a.source);this.opt.vu = b, this.opt.vd = c;
                }
            }, bindEvent: function bindEvent() {
                var a = this;this.player.on(m.Player.Init, function () {
                    a._onPlayerInit();
                }), window.addEventListener("beforeunload", function () {
                    a._onPlayerClose();
                }), this.player.on(m.Video.LoadStart, function () {
                    a.loadstartTime = new Date().getTime(), a._onPlayerloadstart();
                }), this.player.on(m.Video.LoadedMetadata, function () {
                    a._onPlayerLoadMetadata();
                }), this.player.on(m.Video.LoadedData, function () {
                    a._onPlayerLoaddata();
                }), this.player.on(m.Video.Play, function () {
                    a._onPlayerPlay();
                }), this.player.on(m.Player.Ready, function () {
                    a._onPlayerReady();
                }), this.player.on(m.Video.Ended, function () {
                    a._onPlayerFinish();
                }), this.player.on(m.Video.Pause, function () {
                    a._onPlayerPause();
                }), this.player.on(m.Private.SeekStart, function (b) {
                    a._onPlayerSeekStart(b);
                }), this.player.on(m.Private.EndStart, function (b) {
                    a._onPlayerSeekEnd(b);
                }), this.player.on(m.Player.Waiting, function () {
                    a._onPlayerLoaded();
                }), this.player.on(m.Video.CanPlayThrough, function () {
                    a._onPlayerUnderload();
                }), this.player.on(m.Video.CanPlay, function () {
                    a._onPlayerCanplay();
                }), this.player.on(m.Player.Error, function () {
                    a._onPlayerError();
                }), this.player.on(m.Player.RequestFullScreen, function () {
                    a._onFullscreenChange(1);
                }), this.player.on(m.Player.CancelFullScreen, function () {
                    a._onFullscreenChange(0);
                }), d = setInterval(function () {
                    2 === a.player.readyState() || 3 === a.player.readyState() ? a._onPlayerLoaded() : 4 === a.player.readyState() && a._onPlayerUnderload();
                }, 100), e = setInterval(function () {
                    if (a.player.getCurrentTime()) {
                        var b = Math.floor(1e3 * a.player.getCurrentTime());a.player.paused() || ++n >= 30 && (a._log("HEARTBEAT", { vt: b, interval: 1e3 * n }), n = 0);
                    }
                }, 1e3);
            }, removeEvent: function removeEvent() {
                this.player.off("init"), this.player.off("ready"), this.player.off("ended"), this.player.off("play"), this.player.off("pause"), this.player.off("seekStart"), this.player.off("seekEnd"), this.player.off("canplaythrough"), this.player.off("error"), this.player.off("fullscreenchange"), clearInterval(d);
            }, _onFullscreenChange: function _onFullscreenChange(a) {
                a ? this._log("FULLSREEM", {}) : this._log("QUITFULLSCREEM", {});
            }, _onPlayerloadstart: function _onPlayerloadstart() {
                this.playId = i.guid(), this._log("LOADSTART", { pt: new Date().getTime() });
            }, _onPlayerLoadMetadata: function _onPlayerLoadMetadata() {
                this._log("LOADEDMETADATA", { cost: new Date().getTime() - this.loadstartTime });
            }, _onPlayerLoaddata: function _onPlayerLoaddata() {
                this._LoadedData = !0, this._log("LOADEDDATA", { cost: new Date().getTime() - this.loadstartTime }), this._reportPlay();
            }, _onPlayerCanplay: function _onPlayerCanplay() {
                this._log("CANPLAY", { pt: new Date().getTime() - this.loadstartTime });
            }, _onPlayerInit: function _onPlayerInit() {
                this._log("INIT", {}), this.buffer_flag = 0, this.pause_flag = 0;
            }, _onPlayerClose: function _onPlayerClose() {
                this._log("CLOSE", { vt: Math.floor(1e3 * this.player.getCurrentTime()) });
            }, _onPlayerReady: function _onPlayerReady() {
                this.startTimePlay = new Date().getTime();
            }, _onPlayerFinish: function _onPlayerFinish() {
                this._log("STOP", { vt: Math.floor(1e3 * this.player.getCurrentTime()) }), this.sessionId = i.guid(), this.playId = 0;
            }, _reportPlay: function _reportPlay() {
                return !(this.buffer_flag || !this.player._options.autoplay || !this._LoadedData) && (this.first_play_time = new Date().getTime(), this._log("PLAY", { dsm: "fix", vt: 0, start_cost: this.first_play_time - this.player.getReadyTime() }), this.buffer_flag = 1, !0);
            }, _onPlayerPlay: function _onPlayerPlay() {
                this._log("STARTPLAY", {}), 0 == this.playId && (this.playId = i.guid()), this.firstPlay || 0 != this.pause_flag || this.seeking || (this.sessionId = i.guid()), this.firstPlay = !1, this._reportPlay() || this.buffer_flag && this.pause_flag && (this.pause_flag = 0, this.pauseEndTime = new Date().getTime(), this._log("RECOVER", { vt: Math.floor(1e3 * this.player.getCurrentTime()), cost: this.pauseEndTime - this.pauseTime }));
            }, _onPlayerPause: function _onPlayerPause() {
                this.buffer_flag && this.startTimePlay && (this.seeking || (this.pause_flag = 1, this.pauseTime = new Date().getTime(), this._log("PAUSE", { vt: Math.floor(1e3 * this.player.getCurrentTime()) })));
            }, _onPlayerSeekStart: function _onPlayerSeekStart(a) {
                this.seekStartTime = a.paramData.fromTime, this.seeking = !0, this.seekStartStamp = new Date().getTime();
            }, _onPlayerSeekEnd: function _onPlayerSeekEnd(a) {
                this.seekEndStamp = new Date().getTime(), this._log("SEEK", { drag_from_timestamp: Math.floor(1e3 * this.seekStartTime), drag_to_timestamp: Math.floor(1e3 * a.paramData.toTime) }), this._log("SEEK_END", { vt: Math.floor(1e3 * this.player.getCurrentTime()), cost: this.seekEndStamp - this.seekStartStamp }), this.seeking = !1;
            }, _onPlayerLoaded: function _onPlayerLoaded() {
                this.buffer_flag && this.startTimePlay && (this.stucking || this.seeking || (this.stuckStartTime = new Date().getTime(), this.stuckStartTime - this.startTimePlay <= 1e3 || (this.stucking = !0, this._log("UNDERLOAD", { vt: Math.floor(1e3 * this.player.getCurrentTime()) }), this.stuckStartTime = new Date().getTime())));
            }, _onPlayerUnderload: function _onPlayerUnderload() {
                if (!this.buffer_flag && !this.player._options.autoplay) return this.first_play_time = new Date().getTime(), this._log("PLAY", { play_mode: "fix", vt: 0, start_cost: this.first_play_time - this.player.getReadyTime() }), void (this.buffer_flag = 1);if ((this.buffer_flag || !this.player._options.autoplay) && this.stucking && !this.seeking) {
                    var a = Math.floor(1e3 * this.player.getCurrentTime()),
                        b = this.stuckStartTime || new Date().getTime(),
                        c = Math.floor(new Date().getTime() - b);c < 0 && (c = 0), this._log("LOADED", { vt: a, cost: c }), this.stucking = !1;
                }
            }, _onPlayerHeartBeat: function _onPlayerHeartBeat() {
                if (!this.seeking) {
                    var a = Math.floor(1e3 * this.player.getCurrentTime()),
                        b = this;this.timer || (this.timer = setTimeout(function () {
                        !b.seeking && b._log("HEARTBEAT", { progress: a }), clearTimeout(b.timer), b.timer = null;
                    }, 6e4)), console.log("timeupdate");
                }
            }, _onPlayerError: function _onPlayerError() {
                this.playId = 0;
            }, _log: function _log(a, b) {
                if (this.trackLog) {
                    this.updateSourceInfo();var c = g.copy(this.opt);if (this.requestId = i.guid(), "ERROR" == a && "FETCHEDIP" != a && "CDNDETECT" != a) {
                        var d = this;j.jsonp("https://cdn.dns-detect.alicdn.com/api/cdnDetectHttps?method=createDetectHttps", function (a) {
                            d._log("CDNDETECT", { flag: 0, error: "", eri: d.requestId });
                        }, function (a) {
                            d._log("CDNDETECT", { flag: 1, error: a || "访问CDN错误", eri: d.requestId });
                        });
                    }var e = l.logReportTo;c.e = o[a], c.ri = this.sessionId, c.t = new Date().getTime(), c.cdn_ip = this._userNetInfo.cdnIp, c.hn = this._userNetInfo.localIp;var f = this.player.getCurrentQuality();"" != f && (c.definition = f.definition);var h = [];g.each(b, function (a, b) {
                        h.push(a + "=" + b);
                    });var k = "",
                        m = this.player.getOptions();m && m.vid && (k = m.vid), h.push("vid=" + k);try {
                        Aliplayer && Aliplayer.__logCallback__ && (c.args = h, Aliplayer.__logCallback__(c));
                    } catch (a) {
                        console.log(a);
                    }h = h.join("&"), "" == h && (h = "0"), c.args = encodeURIComponent(h);var n = [];return g.each(c, function (a, b) {
                        n.push(a + "=" + b);
                    }), n = n.join("&"), j.jsonp(e + "?" + n, function () {}, function () {}), this.sessionId;
                }
            }, _getUuid: function _getUuid() {
                var a = h.get("p_h5_u");return a || (a = i.guid(), h.set("p_h5_u", a, 730)), a;
            } });b.exports = p;
    }, { "../config": 10, "../lib/cookie": 20, "../lib/data": 21, "../lib/io": 25, "../lib/object": 27, "../lib/oo": 28, "../lib/ua": 31, "../player/base/event/eventtype": 38 }], 35: [function (a, b, c) {
        var d = a("./base/player"),
            e = a("./flash/flashplayer"),
            f = a("./saas/mtsplayer"),
            g = a("./saas/vodplayer"),
            h = a("./taotv/taotvplayer"),
            i = a("./audio/audioplayer"),
            j = a("./hls/hlsplayer"),
            k = a("./flv/flvplayer"),
            l = a("../lib/ua"),
            m = a("../lib/playerutil"),
            n = (a("../lib/dom"), a("../lang/index"));b.exports.create = function (a, b) {
            "function" != typeof b && (b = function b() {}), a.readyCallback = b, n.setCurrentLanguage(a.language);var c = m.handleOption(a),
                o = c.source,
                p = m.isAudio(o);p && (c.height = "auto", c.mediaType = "audio");var q = m.createWrapper(c);if (q.player) return q.player;var r;return p ? r = new i(q, c) : !c.useFlashPrism && m.isFlv(o) && m.isSupportFlv() ? r = new k(q, c) : l.IS_MOBILE || !c.useFlashPrism && !m.isRTMP(o) ? c.vid && !c.source ? r = c.authInfo ? new f(q, c) : c.playauth || c.accessKeyId && c.securityToken && c.accessKeySecret ? new g(q, c) : new h(q, c) : l.os.pc && m.isHls(o) ? m.canPlayHls() ? r = m.isSafariUsedHlsPlugin(c.useHlsPluginForSafari) ? new j(q, c) : new d(q, c) : m.isSupportHls() ? r = new j(q, c) : c.userH5Prism || c.useH5Prism || (r = new e(q, c)) : r = new d(q, c) : r = new e(q, c), r;
        };
    }, { "../lang/index": 16, "../lib/dom": 22, "../lib/playerutil": 29, "../lib/ua": 31, "./audio/audioplayer": 36, "./base/player": 57, "./flash/flashplayer": 63, "./flv/flvplayer": 65, "./hls/hlsplayer": 67, "./saas/mtsplayer": 70, "./saas/vodplayer": 76, "./taotv/taotvplayer": 79 }], 36: [function (a, b, c) {
        var d = a("../base/player"),
            e = a("../../ui/component"),
            f = a("../../lib/dom"),
            g = a("../../lib/object"),
            h = a("../../lib/playerutil"),
            i = d.extend({ init: function init(a, b) {
                this._isAudio = !0, void 0 === b.skinLayout && (b.skinLayout = h.defaultAudioLayout), d.call(this, a, b);
            } });i.prototype.createEl = function () {
            "AUDIO" !== this.tag.tagName && (this._el = this.tag, this.tag = e.prototype.createEl.call(this, "audio"));var a = this._el,
                b = this.tag;b.player = this;var c = f.getElementAttributes(b);return g.each(c, function (b) {
                a.setAttribute(b, c[b]);
            }), this.setVideoAttrs(), b.parentNode && b.parentNode.insertBefore(a, b), f.insertFirst(b, a), a;
        }, b.exports = i;
    }, { "../../lib/dom": 22, "../../lib/object": 27, "../../lib/playerutil": 29, "../../ui/component": 80, "../base/player": 57 }], 37: [function (a, b, c) {
        var d = a("../../../lib/event"),
            e = a("./eventtype"),
            f = a("../eventHandler/video/index"),
            g = a("../eventHandler/player/index");b.exports.offAll = function (a) {
            var b = a.tag,
                c = a._el;for (var f in e.Video) {
                d.off(b, e.Video[f]);
            }for (var g in e.Player) {
                d.off(c, e.Player[g]);
            }for (var h in e.Private) {
                d.off(c, e.Private[h]);
            }
        }, b.exports.onAll = function (a) {
            f.bind(a), g.bind(a);
        };
    }, { "../../../lib/event": 23, "../eventHandler/player/index": 42, "../eventHandler/video/index": 51, "./eventtype": 38 }], 38: [function (a, b, c) {
        var d = { TimeUpdate: "timeupdate", Play: "play", playing: "playing", Pause: "pause", CanPlay: "canplay", Waiting: "waiting", Ended: "ended", Error: "error", Suspend: "suspend", Stalled: "stalled", LoadStart: "loadstart", DurationChange: "durationchange", LoadedData: "loadeddata", LoadedMetadata: "loadedmetadata", Progress: "progress", CanPlayThrough: "canplaythrough", ContextMenu: "contextmenu", Seeking: "seeking", Seeked: "seeked" },
            e = { TimeUpdate: "timeupdate", DurationChange: "durationchange", Init: "init", Ready: "ready", Play: "play", Pause: "pause", CanPlay: "canplay", Waiting: "waiting", Ended: "ended", Error: "error", RequestFullScreen: "requestFullScreen", CancelFullScreen: "cancelFullScreen", Snapshoted: "snapshoted", Snapshoting: "snapshoting", OnM3u8Retry: "onM3u8Retry", LiveStreamStop: "liveStreamStop", AutoPlayPrevented: "autoPlayPrevented", StartSeek: "startSeek", CompleteSeek: "completeSeek" },
            f = { Play_Btn_Show: "play_btn_show", UiH5Ready: "uiH5Ready", Error_Hide: "error_hide", Error_Show: "error_show", Info_Show: "info_show", Info_Hide: "info_hide", H5_Loading_Show: "h5_loading_show", H5_Loading_Hide: "h5_loading_hide", HideProgress: "hideProgress", CancelHideProgress: "cancelHideProgress", Click: "click", MouseOver: "mouseover", MouseOut: "mouseout", MouseEnter: "mouseenter", MouseLeave: "mouseleave", TouchStart: "touchstart", TouchMove: "touchmove", TouchEnd: "touchend", HideBar: "hideBar", ShowBar: "showBar", ReadyState: "readyState", SourceLoaded: "sourceloaded", QualityChange: "qualitychange", Play_Btn_Hide: "play_btn_hide", Cover_Hide: "cover_hide", Cover_Show: "cover_show", SeekStart: "seekStart", EndStart: "endStart", UpdateProgressBar: "updateProgressBar", LifeCycleChanged: "lifeCycleChanged", Dispose: "dispose", Created: "created", Snapshot_Hide: "snapshot_hide", AutoStreamShow: "auto_stream_show", AutoStreamHide: "auto_stream_hide", VolumnChanged: "volumnchanged", LiveShiftQueryComplete: "liveShiftQueryCompleted", StreamSelectorHide: "streamSelectorHide", SpeedSelectorHide: "speedSelectorHide" };b.exports = { Video: d, Player: e, Private: f };
    }, {}], 39: [function (a, b, c) {
        var d = (a("../../event/eventtype"), a("../../../../lib/dom"));b.exports.handle = function () {
            var a = this;d.removeClass(a.el(), "prism-fullscreen");
        };
    }, { "../../../../lib/dom": 22, "../../event/eventtype": 38 }], 40: [function (a, b, c) {
        var d = a("../../event/eventtype");b.exports.handle = function (a) {
            var b = this;b.play(), b._seeking = !1, b.trigger(d.Player.CompleteSeek, a.paramData.toTime);
        };
    }, { "../../event/eventtype": 38 }], 41: [function (a, b, c) {
        var d = a("../../event/eventtype");a("../../../../lib/constants"), a("../../../../lang/index");b.exports.handle = function (a) {
            var b = this,
                c = a.paramData;b.trigger(d.Private.H5_Loading_Hide), b.trigger(d.Private.Cover_Hide), b.trigger(d.Private.Play_Btn_Hide), c = c || {}, b._monitor && (c.uuid = b._monitor._getUuid(), c.requestId = b._serverRequestId, c.cdnIp = b._monitor._userNetInfo.cdnIp, c.localIp = b._monitor._userNetInfo.localIp), b._isError = !0, b.trigger(d.Private.Error_Show, c), b.trigger(d.Private.LifeCycleChanged, { type: d.Player.Error, data: c });
        };
    }, { "../../../../lang/index": 16, "../../../../lib/constants": 19, "../../event/eventtype": 38 }], 42: [function (a, b, c) {
        var d = a("../../event/eventtype"),
            e = a("../../../../lib/event"),
            f = a("./lifecyclecommon"),
            g = { endStart: a("./endstart"), seekStart: a("./seekstart"), requestFullScreen: a("./requestfullscreen"), cancelFullScreen: a("./cancelfullscreen"), error: a("./error") },
            h = [d.Private.EndStart, d.Private.SeekStart, d.Player.RequestFullScreen, d.Player.CancelFullScreen, d.Player.Error, d.Player.Ready, d.Private.Dispose, d.Private.Created],
            i = function i(a, b, c) {
            var d = a.el();e.on(d, b, function (d) {
                var e;e = c && c.handle ? c.handle : f.handle, e.call(a, d, b);
            });
        };b.exports.bind = function (a) {
            for (var b = (a.el(), 0); b < h.length; b++) {
                var c = h[b];"undefined" != g[c] && i(a, c, g[c]);
            }
        };
    }, { "../../../../lib/event": 23, "../../event/eventtype": 38, "./cancelfullscreen": 39, "./endstart": 40, "./error": 41, "./lifecyclecommon": 43, "./requestfullscreen": 44, "./seekstart": 45 }], 43: [function (a, b, c) {
        var d = a("../../event/eventtype");b.exports.handle = function (a, b) {
            this.trigger(d.Private.LifeCycleChanged, { type: b, data: a });
        };
    }, { "../../event/eventtype": 38 }], 44: [function (a, b, c) {
        var d = (a("../../event/eventtype"), a("../../../../lib/dom"));b.exports.handle = function () {
            var a = this;d.addClass(a.el(), "prism-fullscreen");
        };
    }, { "../../../../lib/dom": 22, "../../event/eventtype": 38 }], 45: [function (a, b, c) {
        var d = a("../../event/eventtype");b.exports.handle = function (a) {
            var b = this;b._seeking = !0, b.trigger(d.Player.StartSeek, a.paramData.fromTime);
        };
    }, { "../../event/eventtype": 38 }], 46: [function (a, b, c) {
        var d = a("../../event/eventtype");b.exports.handle = function (a) {
            var b = this;b._retrySwitchUrlCount = 0, b._liveRetryCount = 0, b._clearLiveErrorHandle();var c = new Date().getTime() - b.readyTime;b.trigger(d.Player.CanPlay, { loadtime: c });
        };
    }, { "../../event/eventtype": 38 }], 47: [function (a, b, c) {
        var d = a("../../event/eventtype"),
            e = a("../../../../lib/dom"),
            f = a("../../../../lib/ua");b.exports.handle = function (a) {
            var b = this;b.trigger(d.Private.Cover_Hide);var c = b.tag;"none" === c.style.display && f.IS_IOS && setTimeout(function () {
                e.css(c, "display", "block");
            }, 100), b.trigger(d.Video.CanPlayThrough);
        };
    }, { "../../../../lib/dom": 22, "../../../../lib/ua": 31, "../../event/eventtype": 38 }], 48: [function (a, b, c) {
        b.exports.handle = function (a, b) {
            var c = this,
                d = "";a && a.paramData && (d = a.paramData), c.trigger(b, d);
        };
    }, {}], 49: [function (a, b, c) {
        var d = a("../../event/eventtype"),
            e = a("../../../../lang/index");b.exports.handle = function (a) {
            var b = this;b.waiting = !1, b._options.rePlay ? (b.seek(0), b.tag.play()) : b._options.isLive && (b.trigger(d.Private.H5_Loading_Hide), b.trigger(d.Private.Info_Show, e.get("Live_End"))), b.trigger(d.Player.Ended);
        };
    }, { "../../../../lang/index": 16, "../../event/eventtype": 38 }], 50: [function (a, b, c) {
        var d = a("../../event/eventtype"),
            e = (a("../../../../lib/ua"), a("../../../../lib/playerutil"), a("../../../../lib/constants")),
            f = a("../../../../lang/index");b.exports.handle = function (a) {
            var b = this;if (b.waiting = !1, b._checkTimeoutHandle && clearTimeout(b._checkTimeoutHandle), b.checkOnline()) {
                var c,
                    g = "",
                    h = a.target || a.srcElement,
                    i = h.error.message,
                    g = "";if (h.error.code && (c = h.error.code, g = e.VideoErrorCode[h.error.code], i = c + " || " + i), b._options.isLive) b._options.liveRetry > b._liveRetryCount ? b._reloadAndPlayForM3u8() : (b._liveRetryCount = 0, b.trigger(d.Player.LiveStreamStop), b._liveErrorHandle = setTimeout(function () {
                    var a = { mediaId: "ISLIVE", error_code: g, error_msg: f.get("Error_Play_Text") + "，" + f.get("Error_Retry_Text") };b.logError(a), b.trigger("error", a);
                }, 500));else {
                    var j = f.get("Error_Play_Text"),
                        k = !1;c < 4 ? j = e.VideoErrorCodeText[c] : b._eventState == e.SUSPEND ? (j = f.get("Error_Load_Abort_Text"), g = e.ErrorCode.RequestDataError) : b._eventState == e.LOAD_START ? (j = f.get("Error_Network_Text"), b._options.source.indexOf("auth_key") > 0 && (j = j + "，" + f.get("Error_AuthKey_Text")), g = e.ErrorCode.StartLoadData) : b._eventState == e.LOADED_METADATA && (j = f.get("Error_Play_Text"), g = e.ErrorCode.PlayingError), j = j + "，" + f.get("Error_Retry_Text"), b._urls.length > 1 && b._retrySwitchUrlCount < 3 && -1 == b._options.source.indexOf(".mpd") && (b.switchUrl(), k = !0);var l = { mediaId: b._options.vid ? b._options.vid : "", error_code: g, error_msg: i };b.logError(l), l.display_msg = j, k || b.trigger(d.Player.Error, l);
                }
            }
        };
    }, { "../../../../lang/index": 16, "../../../../lib/constants": 19, "../../../../lib/playerutil": 29, "../../../../lib/ua": 31, "../../event/eventtype": 38 }], 51: [function (a, b, c) {
        var d = a("../../../../lib/event"),
            e = a("../../event/eventtype"),
            f = { canplay: a("./canplay"), canplaythrough: a("./canplaythrough"), common: a("./common"), ended: a("./ended"), error: a("./error"), pause: a("./pause"), play: a("./play"), playing: a("./playing"), waiting: a("./waiting"), timeupdate: a("./timeupdate") },
            g = function g(a, b, c) {
            var f = a.tag;d.on(f, b, function (d) {
                c.handle.call(a, d, b), b != e.Video.Error && a.trigger(e.Private.LifeCycleChanged, { type: b, data: d });
            });
        };b.exports.bind = function (a) {
            var b = (a.tag, null);for (var c in e.Video) {
                var d = e.Video[c];b = void 0 !== f[d] ? f[d] : f.common, g(a, d, b);
            }
        };
    }, { "../../../../lib/event": 23, "../../event/eventtype": 38, "./canplay": 46, "./canplaythrough": 47, "./common": 48, "./ended": 49, "./error": 50, "./pause": 52, "./play": 53, "./playing": 54, "./timeupdate": 55, "./waiting": 56 }], 52: [function (a, b, c) {
        var d = a("../../event/eventtype");b.exports.handle = function (a) {
            var b = this;b._checkTimeoutHandle && clearTimeout(b._checkTimeoutHandle), b.trigger(d.Private.AutoStreamHide), b.trigger(d.Player.Pause), b.waiting = !1;
        };
    }, { "../../event/eventtype": 38 }], 53: [function (a, b, c) {
        var d = a("../../event/eventtype");b.exports.handle = function (a) {
            var b = this;b.trigger(d.Private.Error_Hide), b.trigger(d.Private.Cover_Hide), b.trigger(d.Private.AutoStreamHide), b.waiting = !1, b.trigger(d.Player.Play);
        };
    }, { "../../event/eventtype": 38 }], 54: [function (a, b, c) {
        var d = a("../../event/eventtype");b.exports.handle = function (a) {
            var b = this;b.trigger(d.Private.H5_Loading_Hide), b.trigger(d.Private.Cover_Hide), b.trigger(d.Private.Info_Hide), b.waiting = !1, b._checkTimeoutHandle && clearTimeout(b._checkTimeoutHandle), b.trigger(d.Private.AutoStreamHide), b.trigger(d.Player.Playing), b.trigger(d.Private.Play_Btn_Hide);
        };
    }, { "../../event/eventtype": 38 }], 55: [function (a, b, c) {
        var d = a("../../event/eventtype");b.exports.handle = function (a) {
            var b = this;b.trigger(d.Player.TimeUpdate, a.timeStamp), b.trigger(d.Private.H5_Loading_Hide), b.trigger(d.Private.H5_Loading_Hide), b.trigger(d.Private.AutoStreamHide);
        };
    }, { "../../event/eventtype": 38 }], 56: [function (a, b, c) {
        var d = a("../../event/eventtype");a("../../../../lib/constants"), a("../../../../lang/index");b.exports.handle = function (a) {
            var b = this;b.trigger(d.Private.H5_Loading_Show), b.waiting = !0, b._checkTimeoutHandle && clearTimeout(b._checkTimeoutHandle), b._checkTimeoutHandle = setTimeout(function () {
                b.trigger(d.Private.AutoStreamShow);
            }, 1e3 * b._options.loadDataTimeout), b.trigger(d.Player.Waiting);
        };
    }, { "../../../../lang/index": 16, "../../../../lib/constants": 19, "../../event/eventtype": 38 }], 57: [function (a, b, c) {
        var d = a("../../ui/component"),
            e = a("../../lib/object"),
            f = a("../../lib/dom"),
            g = a("../../lib/event"),
            h = (a("../../lib/io"), a("../../ui/exports")),
            i = (a("../../ui/component/error-display"), a("../../ui/component/info-display"), a("../../monitor/monitor")),
            j = a("../../lib/ua"),
            k = a("../../lib/constants"),
            l = a("../../lib/util"),
            m = (a("../../config"), a("../../lib/playerutil")),
            n = a("./x5play"),
            o = a("../../lib/cookie"),
            p = a("../../lang/index"),
            q = a("../../feature/autoPlayDelay"),
            r = a("./event/eventmanager"),
            s = a("../../ui/component/cover"),
            t = a("../../ui/component/play-animation"),
            u = a("../../commonui/autostreamselector"),
            v = a("./event/eventtype"),
            w = a("./plugin/lifecyclemanager"),
            x = a("../service/fullscreenservice"),
            y = a("../service/liveshiftservice"),
            z = d.extend({ init: function init(a, b) {
                if (this.tag = a, this.loaded = !1, this.played = !1, this.waiting = !1, this._urls = [], this._currentPlayIndex = 0, this._retrySwitchUrlCount = 0, this._isError = !1, this._isHls = !1, this._liveRetryCount = 0, this._seeking = !1, this._serverRequestId = 0, this._created = !1, void 0 === b.skinLayout && (b.skinLayout = m.defaultH5Layout), d.call(this, this, b), this.addClass("prism-player"), b.plugins && e.each(b.plugins, function (a, b) {
                    this[a](b);
                }, this), this.fullscreenService = new x(this), m.isLiveShift(b) && (this._liveshiftService = new y(this)), this.UI = {}, b.useNativeControls ? this.tag.setAttribute("controls", "controls") : this.UI = h, this.initChildren(), r.onAll(this), this._lifeCycleManager = new w(this), this._monitor = new i(this, { video_id: 0, album_id: 0, from: this._options.from, source: this._options.source }, this._options.trackLog), this.checkOnline()) {
                    if (this._overrideNativePlay(), this._liveshiftService && !this._liveshiftService.validate()) {
                        var c = { mediaId: this._options.vid ? this._options.vid : "", error_code: k.ErrorCode.InvalidParameter, error_msg: p.get("ShiftLiveTime_Error") };return void this.trigger(v.Player.Error, c);
                    }if (this._extraMultiSources(), this._options.source) if (this._options.autoPlayDelay) {
                        var f = new q(this),
                            g = this;f.handle(function () {
                            g.initPlay();
                        });
                    } else this.initPlay();if (this._options.extraInfo) {
                        var j = this._options.extraInfo;j.liveRetry && (this._options.liveRetry = j.liveRetry);
                    }this.on(v.Private.ReadyState, function () {
                        this.trigger(v.Player.Ready);
                    }), this._options.readyCallback(this);
                }
            } });z.prototype.initPlay = function (a) {
            this._initPlayBehavior(a, this._options.source);
        }, z.prototype.initChildren = function () {
            var a = this.options(),
                b = a.skinLayout;if (!1 !== b && !e.isArray(b)) throw new Error("PrismPlayer Error: skinLayout should be false or type of array!");!1 !== b && 0 !== b.length && (this.options({ children: b }), d.prototype.initChildren.call(this)), a.preload || a.autoplay || (this.UI.cover = s, this.addChild("cover", a)), this.UI.playanimation = t, this.addChild("playanimation", a), this.UI.autoStreamSelector = u, this.addChild("autoStreamSelector", a), this.trigger(v.Private.UiH5Ready);
        }, z.prototype.createEl = function () {
            var a = !1;"VIDEO" !== this.tag.tagName ? (this._el = this.tag, this.tag = d.prototype.createEl.call(this, "video"), this._options.playsinline && (this.tag.setAttribute("webkit-playsinline", ""), this.tag.setAttribute("playsinline", ""), this.tag.setAttribute("x-webkit-airplay", ""))) : (a = !0, this._el = this.tag.parentNode);var b = this._el,
                c = this.tag;this._options.enableSystemMenu || (c.addEventListener ? c.addEventListener("contextmenu", function (a) {
                a.preventDefault();
            }, !1) : c.attachEvent("oncontextmenu", function () {
                window.event.returnValue = !1;
            })), c.player = this;var g = f.getElementAttributes(c);return e.each(g, function (a) {
                b.setAttribute(a, g[a]);
            }), this.setVideoAttrs(), a || (c.parentNode && c.parentNode.insertBefore(b, c), f.insertFirst(c, b)), b;
        }, z.prototype.setVideoAttrs = function () {
            var a = this._options.preload,
                b = this._options.autoplay;if (this.tag.style.width = this._options.videoWidth || "100%", this.tag.style.height = this._options.videoHeight || "100%", a && this.tag.setAttribute("preload", "preload"), b && this.tag.setAttribute("autoplay", "autoplay"), this._options.extraInfo) for (var c in this._options.extraInfo) {
                this.tag.setAttribute(c, this._options.extraInfo[c]);
            }n.adaptX5Play(this);
        }, z.prototype.checkOnline = function () {
            if (this._options.debug) return !0;if (0 == navigator.onLine) {
                var a = { mediaId: this._options.vid ? this._options.vid : "", error_code: k.ErrorCode.NetworkUnavaiable, error_msg: p.get("Error_Offline_Text") };return this.logError(a), a.display_msg = p.get("Error_Offline_Text"), this.trigger(v.Player.Error, a), !1;
            }return !0;
        }, z.prototype.id = function () {
            return this.el().id;
        }, z.prototype.renderUI = function () {}, z.prototype.switchUrl = function () {
            if (0 != this._urls.length) {
                this._currentPlayIndex = this._currentPlayIndex + 1, this._urls.length <= this._currentPlayIndex && (this._currentPlayIndex = 0, this._retrySwitchUrlCount++);var a = this._urls[this._currentPlayIndex];o.set(k.SelectedStreamLevel, a.definition, 365), this.trigger(v.Private.QualityChange, p.get("Quality_Change_Fail_Switch_Text"));this.getCurrentTime();this._options.source = a.Url, this.tag.setAttribute("src", this._options.source), this.tag.play();
            }
        }, z.prototype.setControls = function () {
            var a = this.options();if (a.useNativeControls) this.tag.setAttribute("controls", "controls");else if ("object" == _typeof(a.controls)) {
                var b = this._initControlBar(a.controls);this.addChild(b);
            }
        }, z.prototype._initControlBar = function (a) {
            return new ControlBar(this, a);
        }, z.prototype.getMetaData = function () {
            var a = this,
                b = null,
                c = this.tag;b = window.setInterval(function (d) {
                if (!a.tag) return void clearInterval(b);if (c.readyState > 0) {
                    var e = Math.round(c.duration);a.tag.duration = e, a.trigger(v.Private.ReadyState), clearInterval(b);
                }
            }, 100);
        }, z.prototype.getReadyTime = function () {
            return this.readyTime;
        }, z.prototype.readyState = function () {
            return this.tag.readyState;
        }, z.prototype.getError = function () {
            return this.tag.error;
        }, z.prototype.getRecentOccuredEvent = function () {
            return this._eventState;
        }, z.prototype.getSourceUrl = function () {
            return this._options ? this._options.source : "";
        }, z.prototype.getMonitorInfo = function () {
            return this._monitor ? this._monitor.opt : {};
        }, z.prototype.getCurrentQuality = function () {
            if (this._urls > 0) {
                var a = this._urls[this._currentPlayIndex];return { width: a.width, url: a.Url, definition: a.definition };
            }return "";
        }, z.prototype.setSpeed = function (a) {
            this.tag && (this._originalPlaybackRate = a, this.tag.playbackRate = a);
        }, z.prototype.play = function () {
            var a = this;return (this._options.preload || this.loaded) && this.tag.src || this._initLoad(this._options.source), a.trigger(v.Private.Cover_Hide), this.tag.play(), this;
        }, z.prototype.replay = function () {
            return this.seek(0), this.tag.play(), this;
        }, z.prototype.pause = function () {
            return this.tag.pause(), this;
        }, z.prototype.stop = function () {
            return this.tag.setAttribute("src", null), this;
        }, z.prototype.paused = function () {
            return !1 !== this.tag.paused;
        }, z.prototype.getDuration = function () {
            var a = 0;return this.tag && (a = this.tag.duration), a;
        }, z.prototype.getCurrentTime = function () {
            return this.tag ? this.tag.currentTime : 0;
        }, z.prototype.seek = function (a) {
            a === this.tag.duration && a--;var b = this._originalPlaybackRate || this.tag.playbackRate;try {
                var c = this;this.tag.currentTime = a, setTimeout(function () {
                    c.tag.playbackRate = b;
                });
            } catch (a) {
                console.log(a);
            }return this;
        }, z.prototype.firstNewUrlloadByUrl = function (a, b) {
            this._clearLiveErrorHandle(), this._options.vid = 0, this._options.source = a, this._monitor && this._monitor.updateVideoInfo({ video_id: 0, album_id: 0, source: a, from: this._options.from }), this.initPlay(), (this._options.preload || this._options.autoplay) && this.trigger(v.Private.Cover_Hide), this._options.autoplay ? this.trigger(v.Player.Play) : this.trigger(v.Player.Pause), b || (b = 0), !b && 0 != b || isNaN(b) || this.seek(b);
        }, z.prototype.loadByUrl = function (a, b, c) {
            this._clearLiveErrorHandle(), this.trigger(v.Private.Error_Hide), this._options.vid = 0, this._options.source = a, this._monitor && this._monitor.updateVideoInfo({ video_id: 0, album_id: 0, source: a, from: this._options.from }), this._options._autoplay = c, this.initPlay(c), (this._options.preload || this._options.autoplay) && this.trigger(v.Private.Cover_Hide), this._options.autoplay || c ? this.trigger(v.Player.Play) : this.trigger(v.Player.Pause);var d = this;g.one(this.tag, v.Video.CanPlay, function (a) {
                !b && 0 != b || isNaN(b) || d.seek(b);
            });
        }, z.prototype.dispose = function () {
            this.trigger(v.Private.Dispose), this.tag.pause(), r.offAll(this), this.tag = null, this._options = null, this._monitor && (this._monitor.removeEvent(), this._monitor = null);
        }, z.prototype.mute = function () {
            this._muteInner(), this._originalVolumn = this.tag.volume;var a = p.get("Volume_Mute");return this._player.trigger(v.Private.Info_Show, { text: a, duration: 1e3, align: "lb" }), this._setInnerVolume(0), this;
        }, z.prototype._muteInner = function () {
            this.tag.muted = !0, this.trigger(v.Private.VolumnChanged, -1);
        }, z.prototype.unMute = function () {
            this._unMuteInner();var a = p.get("Volume_UnMute");return this._player.trigger(v.Private.Info_Show, { text: a, duration: 1e3, align: "lb" }), this._setInnerVolume(this._originalVolumn || .5), this;
        }, z.prototype._unMuteInner = function () {
            this.tag.muted = !1, this.trigger(v.Private.VolumnChanged, -2);
        }, z.prototype.muted = function () {
            return this.tag.muted;
        }, z.prototype.getVolume = function () {
            return this.tag.volume;
        }, z.prototype.getOptions = function () {
            return this._options;
        }, z.prototype.setVolume = function (a, b) {
            0 != a ? this._unMuteInner() : 0 == a && this._muteInner(), this._setInnerVolume(a);var c = p.get("Curent_Volume") + "<span>" + (100 * a).toFixed() + "%</span>";this._player.trigger(v.Private.Info_Show, { text: c, duration: 1e3, align: "lb" });
        }, z.prototype._setInnerVolume = function (a) {
            this.tag.volume = a, this.trigger(v.Private.VolumnChanged, a);
        }, z.prototype.hideProgress = function () {
            this.trigger(v.Private.HideProgress);
        }, z.prototype.cancelHideProgress = function () {
            this.trigger(v.Private.CancelHideProgress);
        }, z.prototype.setPlayerSize = function (a, b) {
            this._el.style.width = a, this._el.style.height = b;
        }, z.prototype.getBuffered = function () {
            return this.tag.buffered;
        }, z.prototype.setRotate = function (a) {
            this.tag && (this._rotate = a, this._setTransform());
        }, z.prototype.getRotate = function (a) {
            return void 0 === this._rotate ? 0 : this._rotate;
        }, z.prototype.setImage = function (a) {
            this.tag && (this._image = a, this._setTransform());
        }, z.prototype.getImage = function () {
            return this._image;
        }, z.prototype.cancelImage = function () {
            this.tag && (this._image = "", this._setTransform());
        }, z.prototype._setTransform = function () {
            this._transformProp || (this._transformProp = f.getTransformName(this.tag));var a = " translate(-50%, -50%)";this._rotate && (a += " rotate(" + this._rotate + "deg)"), this._image && ("vertical" == this._image ? a += " scaleY(-1)" : "horizon" == this._image && (a += " scaleX(-1)")), this.tag.style[this._transformProp] = a;
        }, z.prototype._initPlayBehavior = function (a, b) {
            if (this._checkSupportVideoType()) return !1;if (!m.validateSource(b)) {
                var c = { mediaId: this._options.vid ? this._options.vid : "", error_code: k.ErrorCode.InvalidSourceURL, error_msg: "InvalidSourceURL" };return this.logError(c), c.display_msg = p.get("Error_Invalidate_Source"), this.trigger(v.Player.Error, c), !1;
            }return this.trigger(v.Private.H5_Loading_Hide), void 0 === a && (a = !1), this._created || (this._created = !0, this.trigger(v.Private.Created)), this.loaded || this.trigger(v.Player.Init), (this._options.autoplay || this._options.preload || a) && (this._initLoad(b), this._options.autoplay || this._options._autoplay ? this.tag.play() : this.trigger(v.Private.Play_Btn_Show)), !0;
        }, z.prototype._initLoad = function (a) {
            this._options.autoplay && this.trigger(v.Private.H5_Loading_Show), this.getMetaData(), a && this.tag.setAttribute("src", a), this.loaded = !0;
        }, z.prototype._clearLiveErrorHandle = function () {
            this._liveErrorHandle && clearTimeout(this._liveErrorHandle);
        }, z.prototype._reloadAndPlayForM3u8 = function () {
            0 == this._liveRetryCount && this.trigger(v.Player.OnM3u8Retry);var a = this._options,
                b = a.liveRetryInterval + a.liveRetryStep * player._liveRetryCount;l.sleep(1e3 * b), this._liveRetryCount++, this.tag.load(this._options.source), this.tag.play();
        }, z.prototype._checkSupportVideoType = function () {
            if (!this.tag.canPlayType || !this._options.source || !j.IS_MOBILE) return "";var a = this._options.source,
                b = "";if (a.indexOf("m3u8") > 0 ? "" != this.tag.canPlayType("application/x-mpegURL") || m.isSupportHls() || (b = p.get("Error_Not_Support_M3U8_Text")) : a.indexOf("mp4") > 0 ? "" == this.tag.canPlayType("video/mp4") && (b = p.get("Error_Not_Support_MP4_Text")) : (m.isRTMP(a) || m.isFlv(a)) && j.IS_MOBILE && (b = p.get("Error_Not_Support_Format_On_Mobile")), b) {
                var c = { mediaId: this._options.vid ? this._options.vid : "", error_code: k.ErrorCode.FormatNotSupport, error_msg: b };this.logError(c), c.display_msg = b, this.trigger(v.Player.Error, c);
            }return b;
        }, z.prototype.getComponent = function (a) {
            return this._lifeCycleManager.getComponent(a);
        }, z.prototype.logError = function (a) {
            a || (a = {}), a.vt = this.getCurrentTime(), this._serverRequestId = this.log("ERROR", a);
        }, z.prototype.log = function (a, b) {
            var c = 0,
                d = 0;if (this._monitor) return this._options && (c = this._options.vid || "0", d = this._options.from || "0"), this._monitor.updateVideoInfo({ video_id: c, album_id: 0, source: this._options.source, from: d }), this._monitor._log(a, b);
        }, z.prototype.setSanpshotProperties = function (a, b, c) {
            if (this._snapshotMatric || (this._snapshotMatric = {}), this._snapshotMatric.width = a, this._snapshotMatric.height = b, c > 1) throw new Error("rate doesn't allow more than 1");this._snapshotMatric.rate = c;
        }, z.prototype.getStatus = function () {
            return this._status ? this._status : "init";
        }, z.prototype._getSanpshotMatric = function () {
            return this._snapshotMatric || (this._snapshotMatric = {}), this._snapshotMatric;
        }, z.prototype._overrideNativePlay = function () {
            var a = this.tag.play,
                b = this;this.tag.play = function () {
                if (!b._options.source) {
                    var c = { mediaId: b._options.vid ? b._options.vid : "", error_code: k.ErrorCode.InvalidSourceURL, error_msg: "InvalidSourceURL" };return c.display_msg = p.get("Error_Invalidate_Source"), void b.trigger(v.Player.Error, c);
                }b.readyTime = new Date().getTime();var d = a.apply(b.tag);void 0 !== d && d.catch(function (a) {
                    b.trigger(v.Private.Play_Btn_Show), b.trigger(v.Player.AutoPlayPrevented);
                }).then(function () {});var e = b._originalPlaybackRate || b.tag.playbackRate;setTimeout(function () {
                    b.tag.playbackRate = e;
                });
            };
        }, z.prototype._extraMultiSources = function () {
            var a = this._options.source;if (a && a.indexOf("{") > -1 && a.indexOf("}") > -1) {
                var b = "";try {
                    b = JSON.parse(a);
                } catch (a) {
                    console.error(a), console.error("地址json串格式不对");
                }var c = [];for (var d in b) {
                    var e = k.QualityLevels[d];c.push({ definition: d, Url: b[d], desc: e || d });
                }if (c.length > 0) {
                    this._currentPlayIndex = m.findSelectedStreamLevel(c);var f = c[this._currentPlayIndex];this._urls = c, this._options.source = f.Url, this.trigger(v.Private.SourceLoaded, f);
                }
            }
        }, b.exports = z;
    }, { "../../commonui/autostreamselector": 7, "../../config": 10, "../../feature/autoPlayDelay": 12, "../../lang/index": 16, "../../lib/constants": 19, "../../lib/cookie": 20, "../../lib/dom": 22, "../../lib/event": 23, "../../lib/io": 25, "../../lib/object": 27, "../../lib/playerutil": 29, "../../lib/ua": 31, "../../lib/util": 33, "../../monitor/monitor": 34,
        "../../ui/component": 80, "../../ui/component/cover": 83, "../../ui/component/error-display": 84, "../../ui/component/info-display": 87, "../../ui/component/play-animation": 89, "../../ui/exports": 97, "../service/fullscreenservice": 77, "../service/liveshiftservice": 78, "./event/eventmanager": 37, "./event/eventtype": 38, "./plugin/lifecyclemanager": 60, "./x5play": 62 }], 58: [function (a, b, c) {
        var d = a("../../../lib/oo"),
            e = d.extend({});b.exports = e;
    }, { "../../../lib/oo": 28 }], 59: [function (a, b, c) {
        b.exports = { createEl: "createEl", created: "created", ready: "ready", loading: "loading", play: "play", pause: "pause", playing: "playing", waiting: "waiting", timeUpdate: "timeupdate", error: "error", ended: "ended", dispose: "dispose" };
    }, {}], 60: [function (a, b, c) {
        var d = a("../../../lib/object"),
            e = a("../event/eventtype"),
            f = a("./lifecycle"),
            g = a("./status"),
            h = function h(a) {
            this._player = a, a._status = "init", this.components = [];var b = a.getOptions().components;if (b && d.isArray(b) && b.length > 0) for (var c = 0; c < b.length; c++) {
                var g = b[c],
                    h = void 0 === g.type ? g : g.type,
                    i = void 0 === g.args ? [] : g.args,
                    k = void 0 === g.name ? "" : g.name;i = i && i.length > 0 ? [].concat.call([h], i) : [];var l = new (Function.prototype.bind.apply(h, i))();createEl = l[f.createEl], createEl && "function" == typeof createEl && createEl.call(l, a.el()), this.components.push({ name: k, obj: l });
            }var m = this;a.on(e.Private.LifeCycleChanged, function (b) {
                0 != m.components.length && j.call(m, a, b);
            });
        };h.prototype.getComponent = function (a) {
            var b = null,
                c = this.components.length;if (a) for (var d = 0; d < c; d++) {
                if (this.components[d].name == a) {
                    b = this.components[d].obj;break;
                }
            }return b;
        };var i = function i(a) {
            return a == e.Video.LoadStart || a == e.Video.LoadedData || a == e.Video.LoadedMetadata;
        },
            j = function j(a, b) {
            if (b) {
                var c = b.paramData,
                    d = c.type,
                    g = c.data;i(d) && (d = f.loading), k(a, d);for (var h = this.components.length, j = 0; j < h; j++) {
                    var l = this.components[j].obj,
                        m = l[d];m && "function" == typeof m && m.call(l, a, g);
                }d == e.Private.Dispose && (this.components = []);
            }
        },
            k = function k(a, b) {
            void 0 !== g[b] && (b != g.pause || a._status != g.error && a._status != g.ended) && (a._status = b);
        };b.exports = h;
    }, { "../../../lib/object": 27, "../event/eventtype": 38, "./lifecycle": 59, "./status": 61 }], 61: [function (a, b, c) {
        b.exports = { init: "init", ready: "ready", loading: "loading", play: "play", pause: "pause", playing: "playing", waiting: "waiting", error: "error", ended: "ended" };
    }, {}], 62: [function (a, b, c) {
        var d = a("../../lib/ua"),
            e = a("../../lib/dom"),
            f = function f(a, b) {
            var c = a.el().style.height,
                d = a.el().style.width;a.originalLayout = { container: { height: c, width: d }, video: { width: a.tag.style.width, height: a.tag.style.height } };var e = document.body.clientHeight + "px",
                f = document.body.clientWidth + "px";b ? (height = e, width = f) : (height = c.indexOf("%") ? c : c + "px", width = d.indexOf("%") ? d : d + "px"), a.tag.style.width = f, a.tag.style.height = e, a.el().style.height = b ? e : height;
        },
            g = function g(a, b) {
            if (a.originalLayout) {
                var c = a.originalLayout;a.el().style.height = c.container.height, a.el().style.width = c.container.width, a.tag.style.width = c.video.width, a.tag.style.height = c.video.height;
            }
        };b.exports.isAndroidX5 = function () {
            return d.os.android && d.is_X5 || d.dingTalk();
        }, b.exports.adaptX5Play = function (a) {
            if (d.os.android && d.is_X5) {
                "h5" == a._options.x5_type && (a.tag.setAttribute("x5-video-player-type", a._options.x5_type), window.onresize = function () {
                    f(a, a._options.x5_fullscreen || "center" == a._options.x5_video_position);
                }, a.tag.addEventListener("x5videoenterfullscreen", function () {
                    f(a, a._options.x5_fullscreen || "center" == a._options.x5_video_position), a.trigger("x5requestFullScreen");
                }), a.tag.addEventListener("x5videoexitfullscreen", function () {
                    g(a), a.trigger("x5cancelFullScreen");
                }), a.on("requestFullScreen", function () {
                    "center" != a._options.x5_video_position && e.removeClass(a.tag, "x5-top-left");
                }), a.on("cancelFullScreen", function () {
                    "center" != a._options.x5_video_position && e.addClass(a.tag, "x5-top-left");
                })), void 0 !== a._options.x5_fullscreen && a._options.x5_fullscreen && (a.tag.setAttribute("x5-video-player-fullscreen", a._options.x5_fullscreen), e.addClass(a.tag, "x5-full-screen"));"center" != a._options.x5_video_position && e.addClass(a.tag, "x5-top-left"), void 0 !== a._options.x5_orientation && a.tag.setAttribute("x5-video-orientation", a._options.x5_orientation);
            }
        };
    }, { "../../lib/dom": 22, "../../lib/ua": 31 }], 63: [function (a, b, c) {
        var d = a("../../ui/component"),
            e = a("../../lib/data"),
            f = a("../../lib/ua"),
            g = a("../../lib/constants"),
            h = a("../../lib/dom"),
            i = a("../../lib/object"),
            j = a("../../config"),
            k = a("../../lang/index"),
            l = a("../../lib/playerutil"),
            m = a("../../lib/util"),
            n = a("../../ui/component/info-display"),
            o = a("../../ui/component/error-display"),
            p = a("../../feature/autoPlayDelay"),
            q = a("../../commonui/autostreamselector"),
            r = a("../base/event/eventtype"),
            s = a("../saas/ststoken"),
            t = d.extend({ init: function init(a, b) {
                if (void 0 === b.skinLayout && (b.skinLayout = l.defaultFlashLayout), d.call(this, this, b), this._id = "prism-player-" + e.guid(), this.tag = a, this._el = this.tag, this._childrenUI = [n, o], this.initChildren(), this.id = this._id, window[this.id] = this, k.setCurrentLanguage(this._options.language, "flash"), m.openInFile()) {
                    var c = { mediaId: this._options.vid ? this._options.vid : "", error_code: g.ErrorCode.FormatNotSupport, error_msg: k.get("Open_Html_By_File", "flash") };return void this.trigger(r.Private.Error_Show, c);
                }if (f.IS_MOBILE) return void this.trigger(r.Private.Error_Show, { mediaId: this._options.vid ? this._options.vid : "", error_code: g.ErrorCode.FormatNotSupport, error_msg: k.get("Cant_Use_Flash_On_Mobile", "flash") });if (this._options.vid && this._options.accessKeyId && this._options.securityToken && this._options.accessKeySecret) {
                    var h = this;s.getPlayAuth(this._options, function (a) {
                        h._options.playauth = a, h._createPlayer();
                    }, function (a) {
                        var b = { mediaId: h._options.vid, error_code: a.Code, error_msg: a.Message };a.sri && (b.sri = a.sri), b.display_msg = a.display_msg, h.trigger(r.Private.Error_Show, b);
                    }, "flash");
                } else this._createPlayer();this._status = "init";
            }, _createPlayer: function _createPlayer() {
                if (this._options.autoPlayDelay) {
                    var a = new p(this),
                        b = this;a.handle(function () {
                        b._options.autoplay = !0, b._initPlayer(), b._childrenUI.push(q), b.initChildren();
                    });
                } else this._initPlayer(), this._childrenUI.push(q), this.initChildren();
            }, _initPlayer: function _initPlayer() {
                var a = "100%",
                    b = "100%",
                    c = "//" + j.domain + "/de/prismplayer-flash/" + j.flashVersion + "/PrismPlayer.swf",
                    d = this._comboFlashVars(),
                    e = this._options.wmode ? this._options.wmode : "opaque";this.tag.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" width="' + a + '" height="' + b + '" id="' + this.id + '"><param name=movie value="' + c + '"><param name=quality value=High><param name="FlashVars" value="' + d + '"><param name="WMode" value="' + e + '"><param name="AllowScriptAccess" value="always"><param name="AllowFullScreen" value="true"><param name="AllowFullScreenInteractive" value="true"><embed name="' + this.id + '" src="' + c + '" quality=high pluginspage="//www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="' + a + '" height="' + b + '" AllowScriptAccess="always" AllowFullScreen="true" AllowFullScreenInteractive="true" WMode="' + e + '" FlashVars="' + d + '"></embed></object>';
            }, _getPlayer: function _getPlayer(a) {
                return -1 != navigator.appName.indexOf("Microsoft") ? document.getElementById(a) : document[a];
            }, _getLowerQualityLevel: function _getLowerQualityLevel() {
                var a = this._getVideoUrls();if (!a) return "";var b = a.Urls,
                    c = a.index;return b && 0 == b.length || -1 == c ? "" : c > 0 ? { item: b[c - 1], index: c - 1 } : "";
            }, _comboFlashVars: function _comboFlashVars() {
                var a = encodeURIComponent(f.getReferer()),
                    b = f.getHref(),
                    c = encodeURIComponent(b),
                    d = "";b && (d = f.getHost(b));var e = this._options,
                    g = { autoPlay: e.autoplay ? 1 : 0, isInner: 0, actRequest: 1, vid: e.vid, domain: e.domain ? e.domain : "//tv.taobao.com", statisticService: e.statisticService ? e.statisticService : j.logReportTo, videoInfoService: e.videoInfoService ? e.videoInfoService : "/player/json/getBaseVideoInfo.do", disablePing: e.trackLog ? 0 : 1, namespace: this.id, barMode: 0 != e.barMode ? 1 : 0, isLive: e.isLive ? 1 : 0, waterMark: e.waterMark, environment: e.environment, vurl: e.source ? encodeURIComponent(e.source) : "", plugins: e.plugins ? e.plugins : "", snapShotShow: e.snapshot ? 1 : 0, accessId: e.accId ? e.accId : "", accessKey: e.accSecret ? e.accSecret : "", apiKey: e.apiKey ? e.apiKey : "", flashApiKey: e.flashApiKey ? e.flashApiKey : "", disableSeek: e.disableSeek ? 1 : 0, disableFullScreen: e.disableFullScreen ? 1 : 0, stsToken: e.stsToken ? e.stsToken : "", domainRegion: e.domainRegion ? e.domainRegion : "", authInfo: e.authInfo ? encodeURIComponent(e.authInfo) : "", playDomain: e.playDomain ? e.playDomain : "", stretcherZoomType: e.stretcherZoomType ? e.stretcherZoomType : "", playauth: e.playauth ? e.playauth.replace(/\+/g, "%2B") : "", prismType: e.prismType ? e.prismType : 0, formats: e.formats ? e.formats : "", notShowTips: e.notShowTips ? 1 : 0, showBarTime: e.showBarTime ? e.showBarTime : 0, showBuffer: 0 == e.showBuffer ? 0 : 1, rePlay: e.rePlay ? 1 : 0, encryp: e.encryp ? e.encryp : "", secret: e.secret ? e.secret : "", mediaType: "video", logInfo: { ud: f.getHost(e.source), os: f.os.name, ov: f.os.version || "", et: f.browser.name, ev: f.browser.version || "", uat: f.USER_AGENT, r: a, pu: c, app_n: d } },
                    h = [];return e.cover && (g.cover = e.cover), e.extraInfo && (g.extraInfo = encodeURIComponent(JSON.stringify(e.extraInfo))), g.logInfo && (g.logInfo = encodeURIComponent(JSON.stringify(g.logInfo))), g.languageData = encodeURIComponent(JSON.stringify(k.getLanguageData("flash"))), g.language = k.getCurrentLanguage(), i.each(g, function (a, b) {
                    h.push(a + "=" + b);
                }), h.join("&");
            }, initChildren: function initChildren() {
                for (var a = this._childrenUI.length, b = 0; b < a; b++) {
                    var c = new this._childrenUI[b](this, this._options),
                        d = c.el();d.id = c.id(), this.contentEl().appendChild(d), c.bindEvent();
                }var e = document.querySelector("#" + this._options.id + " .prism-info-display");h.css(e, "display", "none");
            }, flashReady: function flashReady() {
                this.flashPlayer = this._getPlayer(this.id), this._isReady = !0;var a,
                    b = this._options.skinRes,
                    c = this._options.skinLayout;if (!1 !== c && !i.isArray(c)) throw new Error("PrismPlayer Error: skinLayout should be false or type of array!");if ("string" != typeof b) throw new Error("PrismPlayer Error: skinRes should be string!");a = 0 != c && 0 !== c.length && { skinRes: b, skinLayout: c }, this.flashPlayer.setPlayerSkin(a), this.trigger("ready");var d = this;window.addEventListener("beforeunload", function () {
                    try {
                        d.flashPlayer.setPlayerCloseStatus();
                    } catch (a) {}
                });
            }, jsReady: function jsReady() {
                return !0;
            }, snapshoted: function snapshoted(a) {
                var b = m.toBinary(a),
                    c = "data:image/jpeg;base64," + a;this.trigger("snapshoted", { time: this.getCurrentTime(), base64: c, binary: b });
            }, uiReady: function uiReady() {
                this._status = "ready", this.trigger("uiReady");
            }, loadedmetadata: function loadedmetadata() {
                "ended" != this._status && (this._status = "loading", this.trigger("loadedmetadata"));
            }, onPlay: function onPlay() {
                this._status = "play", this.trigger("play"), this._clearTimeoutHandle(), this.trigger(r.Private.AutoStreamHide);
            }, onEnded: function onEnded() {
                this._clearTimeoutHandle(), this._status = "ended", this.trigger("ended");
            }, onPause: function onPause() {
                this._status = "pause", this._clearTimeoutHandle(), this.trigger(r.Private.AutoStreamHide), this.trigger("pause");
            }, onBulletScreenReady: function onBulletScreenReady() {
                this.trigger("bSReady");
            }, onBulletScreenMsgSend: function onBulletScreenMsgSend(a) {
                this.trigger("bSSendMsg", a);
            }, onVideoRender: function onVideoRender(a) {
                this._clearTimeoutHandle(), this.trigger("videoRender"), this.trigger("canplay", { loadtime: a });
            }, onVideoError: function onVideoError(a) {
                this._clearTimeoutHandle(), this._status = "error", this.trigger("error", { errortype: a });
            }, onM3u8Retry: function onM3u8Retry() {
                this.trigger("m3u8Retry");
            }, hideBar: function hideBar() {
                this.trigger("hideBar");
            }, showBar: function showBar() {
                this.trigger("showBar");
            }, liveStreamStop: function liveStreamStop() {
                this.trigger("liveStreamStop");
            }, stsTokenExpired: function stsTokenExpired() {
                this._status = "error", this.trigger("stsTokenExpired");
            }, onVideoBuffer: function onVideoBuffer() {
                if ("pause" != this._status) {
                    this._status = "waiting", this.trigger("waiting"), this._clearTimeoutHandle();var a = this;this._checkTimeoutHandle = setTimeout(function () {
                        a.trigger(r.Private.AutoStreamShow);
                    }, 1e3 * this._options.loadDataTimeout), this._checkVideoStatus();
                }
            }, startSeek: function startSeek(a) {
                this.trigger("startSeek", a);
            }, completeSeek: function completeSeek(a) {
                this.trigger("completeSeek", a);
            }, _invoke: function _invoke() {
                var a = arguments[0],
                    b = arguments;if (Array.prototype.shift.call(b), !this.flashPlayer) throw new Error("PrismPlayer Error: flash player is not ready，please use api after ready event occured!");if ("function" != typeof this.flashPlayer[a]) throw new Error("PrismPlayer Error: function " + a + " is not found!");return this.flashPlayer[a].apply(this.flashPlayer, b);
            }, play: function play() {
                this._invoke("playVideo");
            }, replay: function replay() {
                this._invoke("replayVideo");
            }, pause: function pause() {
                this._invoke("pauseVideo");
            }, stop: function stop() {
                this._invoke("stopVideo");
            }, seek: function seek(a) {
                this._invoke("seekVideo", a);
            }, getCurrentTime: function getCurrentTime() {
                return this._invoke("getCurrentTime");
            }, getDuration: function getDuration() {
                return this._invoke("getDuration");
            }, getStatus: function getStatus() {
                return this._status;
            }, _getVideoUrls: function _getVideoUrls() {
                var a = this._invoke("getVideoUrls"),
                    b = [];if (a && a.Urls) for (var c = 0; c < a.Urls.length; c++) {
                    var d = a.Urls[c].value,
                        e = d.desc.indexOf("_"),
                        f = k.get(d.definition, "flash");d.desc = e > 0 ? f + "_" + d.height : f, b.push(d);
                }return { Urls: b, index: a.index };
            }, _getVideoStatus: function _getVideoStatus() {
                return this._invoke("getVideoStatus");
            }, _checkVideoStatus: function _checkVideoStatus() {
                if (this.flashPlayer && !this._checkVideoStatusHandler) {
                    var a = this,
                        b = function b() {
                        a._checkVideoStatusHandler = setTimeout(function () {
                            var c = a._getVideoStatus();"playing" == c.videoStatus && "bufferFull" == c.bufferStatus ? (a._status = "playing", a._clearTimeoutHandle()) : "videoPlayOver" == c.videoStatus && (a._status = "ended", a._clearTimeoutHandle()), b();
                        }, 500);
                    };b();
                }
            }, _clearTimeoutHandle: function _clearTimeoutHandle() {
                this._checkTimeoutHandle && (clearTimeout(this._checkTimeoutHandle), this._checkTimeoutHandle = null);
            }, _changeStream: function _changeStream(a) {
                return this._invoke("changeStream", a);
            }, mute: function mute() {
                this.setVolume(0);
            }, unMute: function unMute() {
                this.setVolume(.5);
            }, getVolume: function getVolume() {
                return this._invoke("getVolume");
            }, setVolume: function setVolume(a) {
                this._invoke("setVolume", a);
            }, loadByVid: function loadByVid(a) {
                this._invoke("loadByVid", a, !1);
            }, loadByUrl: function loadByUrl(a, b) {
                this._invoke("loadByUrl", a, b);
            }, dispose: function dispose() {
                this._invoke("pauseVideo");
            }, showBSMsg: function showBSMsg(a) {
                this._invoke("showBSMsg", a);
            }, setToastEnabled: function setToastEnabled(a) {
                this._invoke("setToastEnabled", a);
            }, setLoadingInvisible: function setLoadingInvisible() {
                this._invoke("setLoadingInvisible");
            }, setPlayerSize: function setPlayerSize(a, b) {
                this._el.style.width = a, this._el.style.height = b;
            } });b.exports = t;
    }, { "../../commonui/autostreamselector": 7, "../../config": 10, "../../feature/autoPlayDelay": 12, "../../lang/index": 16, "../../lib/constants": 19, "../../lib/data": 21, "../../lib/dom": 22, "../../lib/object": 27, "../../lib/playerutil": 29, "../../lib/ua": 31, "../../lib/util": 33, "../../ui/component": 80, "../../ui/component/error-display": 84, "../../ui/component/info-display": 87, "../base/event/eventtype": 38, "../saas/ststoken": 73 }], 64: [function (a, b, c) {
        var d = a("../../lib/io"),
            e = a("../../config"),
            f = a("../../lib/constants"),
            g = a("../../lib/util"),
            h = a("../../lib/playerutil"),
            i = (a("../../lib/dom"), a("../../lib/ua")),
            j = a("../../lang/index"),
            k = a("../base/event/eventtype"),
            l = function l(a, b) {
            return !(a._flv || !h.isFlv(b));
        },
            m = function m(a) {
            var b = "//" + e.domain + "/de/prismplayer/" + e.h5Version + "/flv/aliplayer-flv-min.js",
                c = this;d.loadJS(b, function () {
                a.apply(c);
            });
        };b.exports.inject = function (a, b, c, d, e, h) {
            var n = d.source;if (h || l(a, n)) {
                b.prototype._checkFlvReady = function () {
                    if (null == a._flv) throw new Error("please invoke this method after ready event");
                }, a._isFlv = !0, a._flv = null, a._isLoadedFlv = !1, a._originalUrl = "", b.prototype.play = function () {
                    this._checkFlvReady(), this._options.isLive && this.tag.load();var a = this;if (a.trigger(k.Private.Cover_Hide), 0 == this._seeking) {
                        var b = 0;this.tag.ended || (b = this.getCurrentTime()), this.seek(b);
                    }return this.tag.paused && (a._hasLoaded || (this.getMetaData(), this._flv.load()), this._flv.play()), this;
                }, b.prototype.replay = function () {
                    return this._checkFlvReady(), this.seek(0), this.tag.paused && this._flv.play(), this;
                }, b.prototype.seek = function (a) {
                    this._checkFlvReady(), a === that.tag.duration && a--;try {
                        that._flv.currentTime = a;
                    } catch (a) {
                        console.log(a);
                    }return this;
                }, b.prototype.pause = function () {
                    return this._checkFlvReady(), this._flv.pause(), this;
                }, b.prototype.initPlay = function (a) {
                    function b(a, b) {
                        a.destroy();var c = a._options.isLive,
                            d = { isLive: c, enableWorker: !0, stashInitialSize: 2048 };c ? (d.enableStashBuffer = a._options.enableStashBufferForFlv, stashInitialSize = a._options.stashInitialSizeForFlv, d.autoCleanupSourceBuffer = !0) : d.lazyLoadMaxDuration = 600, a._originalUrl = a._options.source, a._flv = flvjs.createPlayer({ type: "flv", isLive: c, url: a._options.source }, d), o(a, a._flv), a._initPlayBehavior(b) && (a._flv.attachMediaElement(a.tag), (a._options.preload || a._options.autoplay) && (a._hasLoaded = !0, a._flv.load()), a._options.autoplay && a._flv.play(), e && e(a._flv));
                    }if (i.browser.safari && this.trigger(k.Private.Snapshot_Hide), g.contentProtocolMixed(n)) {
                        var c = { mediaId: this._options.vid ? this._options.vid : "", error_code: f.ErrorCode.InvalidSourceURL, error_msg: "InvalidSourceURL" };return c.display_msg = j.get("Request_Block_Text"), void this.trigger(k.Player.Error, c);
                    }that = this, this._isLoadedFlv ? buildHls(this, a) : (this.trigger(k.Private.H5_Loading_Show), m.call(that, function () {
                        this.trigger(k.Private.H5_Loading_Hide), this._isLoadedFlv = !0, b(this, a);
                    }));
                }, b.prototype.destroy = function () {
                    this._flv && (this._flv.pause(), this._flv.unload(), this._flv.detachMediaElement(), this._flv.destroy()), this._flv = null;
                }, b.prototype.dispose = function () {
                    c.dispose.call(this), this.destroy();
                }, b.prototype.canSeekable = function (a) {
                    var b = this._flv.mediaInfo;return !(!this._flv._isTimepointBuffered(a) && b && !b.hasKeyframesIndex);
                };var o = function o(a, b) {
                    var c = !1;b.on(flvjs.Events.ERROR, function (b, d, e) {
                        var h = f.ErrorCode.OtherError,
                            i = j.get("Error_Play_Text");if (d == flvjs.ErrorDetails.NETWORK_EXCEPTION) {
                            var l = a.getOptions().source;!l || 0 != l.toLowerCase().indexOf("http://") && 0 != l.toLowerCase().indexOf("https://") ? (h = f.ErrorCode.InvalidSourceURL, i = j.get("Error_Invalidate_Source"), c = !0) : navigator.onLine ? (h = f.ErrorCode.RequestDataError, i = j.get("Maybe_Cors_Error")) : (h = f.ErrorCode.NetworkError, i = j.get("Error_Network_Text"));
                        } else d == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID ? "404" == e.code ? (h = f.ErrorCode.NotFoundSourceURL, i = j.get("Error_Not_Found")) : "403" == e.code ? (h = f.ErrorCode.AuthKeyExpired, i = j.get("Error_AuthKey_Text"), c = !0) : (h = f.ErrorCode.NetworkError, i = j.get("Error_Network_Text")) : d == flvjs.ErrorDetails.NETWORK_TIMEOUT ? (h = f.ErrorCode.LoadingTimeout, i = j.get("Error_Waiting_Timeout_Text")) : d != flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED && d != flvjs.ErrorDetails.MEDIA_CODEC_UNSUPPORTED || (h = f.ErrorCode.FormatNotSupport, i = j.get("Error_H5_Not_Support_Text"), c = !0);var m = function m() {
                            if (setTimeout(function () {
                                a.trigger(k.Private.Play_Btn_Hide);
                            }), a.checkOnline()) {
                                var b = { mediaId: a._options.vid ? a._options.vid : "", error_code: h, error_msg: e.msg };a.logError(b), b.display_msg = i, a.trigger(k.Player.Error, b);
                            }
                        };if (a._options.isLive && !c) {
                            var n = a._options;if (n.liveRetry > a._liveRetryCount) {
                                0 == a._liveRetryCount && a.trigger(k.Player.OnM3u8Retry);var o = n.liveRetryInterval + n.liveRetryStep * a._liveRetryCount;g.sleep(1e3 * o), a.loadByUrl(n.source), a._liveRetryCount++;
                            } else a._liveRetryCount = 0, a.trigger(k.Player.LiveStreamStop), a._liveErrorHandle = setTimeout(m, 500);
                        } else m();
                    });
                };
            }
        };
    }, { "../../config": 10, "../../lang/index": 16, "../../lib/constants": 19, "../../lib/dom": 22, "../../lib/io": 25, "../../lib/playerutil": 29, "../../lib/ua": 31, "../../lib/util": 33, "../base/event/eventtype": 38 }], 65: [function (a, b, c) {
        var d = a("../base/player"),
            e = a("./flvinjector"),
            f = d.extend({ init: function init(a, b) {
                e.inject(this, f, d.prototype, b, function (a) {}), d.call(this, a, b);
            } });b.exports = f;
    }, { "../base/player": 57, "./flvinjector": 64 }], 66: [function (a, b, c) {
        var d = a("../../lib/io"),
            e = a("../../config"),
            f = a("../../lib/constants"),
            g = a("../../lib/util"),
            h = a("../../lib/playerutil"),
            i = (a("../../lib/dom"), a("../../lang/index")),
            j = a("../base/event/eventtype"),
            k = function k(a, b, c) {
            return !(a._hls || !h.isHls(b) || h.canPlayHls() && !h.isSafariUsedHlsPlugin(c));
        },
            l = function l(a) {
            var b = "//" + e.domain + "/de/prismplayer/" + e.h5Version + "/hls/aliplayer-hls-min.js",
                c = this;d.loadJS(b, function () {
                a.apply(c);
            });
        };b.exports.inject = function (a, b, c, d, e, h) {
            var m = d.source,
                n = d.useHlsPluginForSafari;if (h || k(a, m, n)) {
                b.prototype._checkHlsReady = function () {
                    if (null == a._hls) throw new Error("please invoke this method after ready event");
                }, a._isHls = !0, a._hls = null, a._isLoadedHls = !1, b.prototype.play = function () {
                    if (this._checkHlsReady(), this.trigger(j.Private.Cover_Hide), this.tag.ended) this.replay();else {
                        var a = this.getCurrentTime();this._hls.startLoad(a), this.tag.paused && this.tag.play();
                    }return this;
                }, b.prototype.replay = function () {
                    return this.initPlay(!0), this.tag.paused && this.tag.play(), this;
                }, b.prototype.pause = function () {
                    return this._checkHlsReady(), this.tag.pause(), this._hls.stopLoad(), this;
                }, b.prototype.stop = function () {
                    return this._checkHlsReady(), this.tag.setAttribute("src", null), this._hls.stopLoad(), this;
                }, b.prototype._reloadAndPlayForM3u8 = function () {
                    0 == this._liveRetryCount && this.trigger(j.Player.OnM3u8Retry), this._liveRetryCount++;
                }, b.prototype.initPlay = function (a) {
                    function b(a, b) {
                        a.destroy(), a._hls = new Hls({ xhrSetup: function xhrSetup(b, c) {
                                b.withCredentials = a._options.withCredentials || !1;
                            } }), e && e(a._hls), o(a, a._hls), a._hls.loadSource(a._options.source), a._hls.attachMedia(a.tag), a._hls.on(Hls.Events.MANIFEST_PARSED, function () {
                            a._initPlayBehavior(b);
                        });
                    }if (g.contentProtocolMixed(m)) {
                        var c = { mediaId: this._options.vid ? this._options.vid : "", error_code: f.ErrorCode.InvalidSourceURL, error_msg: "InvalidSourceURL" };return c.display_msg = i.get("Request_Block_Text"), void this.trigger(j.Player.Error, c);
                    }that = this, this._isLoadedHls ? b(this, a) : (this.trigger(j.Private.H5_Loading_Show), l.call(that, function () {
                        this.trigger(j.Private.H5_Loading_Hide), this._isLoadedHls = !0, b(this, a);
                    }));
                }, b.prototype.destroy = function () {
                    this._hls && this._hls.destroy(), this._hls = null;
                }, b.prototype.dispose = function () {
                    c.dispose.call(this), this.destroy();
                };var o = function o(a, b) {
                    b.on(Hls.Events.ERROR, function (b, c) {
                        if (c.details != Hls.ErrorDetails.FRAG_LOOP_LOADING_ERROR && 1 != a._seeking && (0 != c.fatal || c.type == Hls.ErrorTypes.NETWORK_ERROR)) {
                            var d = f.ErrorCode.LoadedMetadata,
                                e = i.get("Error_Play_Text"),
                                h = !1;if (c.details == Hls.ErrorDetails.MANIFEST_LOAD_ERROR) {
                                h = !0;c.networkDetails;"404" == c.response.code ? (d = f.ErrorCode.NotFoundSourceURL, e = i.get("Error_Not_Found")) : "403" == c.response.code ? (d = f.ErrorCode.AuthKeyExpired, e = i.get("Error_AuthKey_Text")) : "0" == c.response.code && navigator.onLine ? (d = f.ErrorCode.RequestDataError, e = e + "，" + i.get("Maybe_Cors_Error")) : e = i.get("Error_Load_M3U8_Failed_Text");
                            } else c.details == Hls.ErrorDetails.MANIFEST_LOAD_TIMEOUT ? (h = !0, e = i.get("Error_Load_M3U8_Timeout_Text")) : c.details == Hls.ErrorDetails.MANIFEST_PARSING_ERROR || c.details == Hls.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR ? (h = !0, e = i.get("Error_M3U8_Decode_Text")) : c.type == Hls.ErrorTypes.NETWORK_ERROR ? (d = f.ErrorCode.NetworkError, e = i.get("Error_Network_Text")) : c.type != Hls.ErrorTypes.MUX_ERROR && c.type != Hls.ErrorTypes.MEDIA_ERROR || (d = f.ErrorCode.PlayDataDecode, e = i.get("Error_TX_Decode_Text"));e = e + "(" + c.details + ")";var k = function k() {
                                if (a.pause(), setTimeout(function () {
                                    a.trigger(j.Private.Play_Btn_Hide);
                                }), a.checkOnline()) {
                                    var b = { mediaId: a._options.vid ? a._options.vid : "", error_code: d, error_msg: c.details };a.logError(b), b.display_msg = e, a.trigger(j.Player.Error, b);
                                }
                            };if (a._options.isLive) {
                                var l = a._options;if (l.liveRetry > a._liveRetryCount) {
                                    0 == a._liveRetryCount && a.trigger(j.Player.OnM3u8Retry);var m = l.liveRetryInterval + l.liveRetryStep * a._liveRetryCount;g.sleep(1e3 * m), h && a.loadByUrl(l.source), a._liveRetryCount++;
                                } else a._liveRetryCount = 0, a.trigger(j.Player.LiveStreamStop), a._liveErrorHandle = setTimeout(k, 500);
                            } else k();
                        }
                    });
                };
            }
        };
    }, { "../../config": 10, "../../lang/index": 16, "../../lib/constants": 19, "../../lib/dom": 22, "../../lib/io": 25, "../../lib/playerutil": 29, "../../lib/util": 33, "../base/event/eventtype": 38 }], 67: [function (a, b, c) {
        var d = a("../base/player"),
            e = a("./hlsinjector"),
            f = d.extend({ init: function init(a, b) {
                e.inject(this, f, d.prototype, b, function (a) {}), d.call(this, a, b);
            } });b.exports = f;
    }, { "../base/player": 57, "./hlsinjector": 66 }], 68: [function (a, b, c) {
        var d = a("../../lib/constants"),
            e = a("../../lib/oo"),
            f = e.extend({ init: function init(a) {
                this.player = a, this.tickhandle = null;
            } });f.prototype.tick = function (a, b) {
            var c = this;this.tickhandle = setTimeout(function () {
                c.player && c.player.trigger(d.AuthKeyExpiredEvent), b && b();
            }, 1e3 * a);
        }, f.prototype.clearTick = function (a) {
            this.tickhandle && clearTimeout(this.tickhandle);
        }, b.exports = f;
    }, { "../../lib/constants": 19, "../../lib/oo": 28 }], 69: [function (a, b, c) {
        function d(a, b, c, d) {
            var k = (h.returnUTCDate(), h.randomUUID()),
                l = h.randomUUID(),
                m = "HMAC-SHA1",
                n = { AccessKeyId: a.accessId, Action: "PlayInfo", MediaId: a.vid, Formats: a.format, AuthInfo: a.authInfo, AuthTimeout: g.AuthKeyExpired, Rand: k, SecurityToken: a.stsToken, Format: "JSON", Version: "2014-06-18", SignatureMethod: m, SignatureVersion: "1.0", SignatureNonce: l },
                o = h.makeUTF8sort(n, "=", "&") + "&Signature=" + h.AliyunEncodeURI(h.makeChangeSiga(n, a.accessSecret)),
                p = "https://mts." + a.domainRegion + ".aliyuncs.com/?" + o;f.get(p, function (a) {
                if (a) {
                    var f = JSON.parse(a),
                        g = f.PlayInfoList.PlayInfo;urls = e(g, b), c && c({ requestId: f.RequestId, urls: urls });
                } else d && d(i.createError("MPS获取取数失败"));
            }, function (a) {
                if (d) {
                    var b = { Code: "", Message: j.get("Error_MTS_Fetch_Urls_Text") };try {
                        b = JSON.parse(a);
                    } catch (a) {}d({ Code: g.ErrorCode.ServerAPIError, Message: b.Code + "|" + b.Message, sri: b.requestId || "" });
                }
            });
        }function e(a, b) {
            for (var c = [], d = [], e = [], f = a.length - 1; f >= 0; f--) {
                var g = a[f];"mp4" == g.format ? d.push(g) : "mp3" == g.format ? e.push(g) : c.push(g);
            }return e.length > 0 ? (k(e, b), e) : d.lenght > 0 ? (k(d, b), d) : (k(c, b), c);
        }var f = a("../../lib/io"),
            g = a("../../lib/constants"),
            h = a("./signature"),
            i = a("./util"),
            j = a("../../lang/index"),
            k = function k(a, b) {
            var c = "";a.sort(function (a, c) {
                var d = parseInt(a.bitrate),
                    e = parseInt(c.bitrate);if ("desc" == b) {
                    if (d > e) return -1;if (d < e) return 1;
                } else {
                    if (d < e) return -1;if (d > e) return 1;
                }
            });for (var d = a.length, e = 0; e < d; e++) {
                var f = a[e],
                    h = g.QualityLevels[f.definition],
                    i = "";i = void 0 === h ? f.bitrate : c == h ? h + f.bitrate : h, f.desc = i, c = h;
            }
        };b.exports.getDataByAuthInfo = d;
    }, { "../../lang/index": 16, "../../lib/constants": 19, "../../lib/io": 25, "./signature": 72, "./util": 74 }], 70: [function (a, b, c) {
        var d = a("./saasplayer"),
            e = (a("../../lib/constants"), a("./mts")),
            f = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.service = e, this.loadByMts();
            } });f.prototype.loadByMts = function () {
            var a = { vid: this._options.vid, accessId: this._options.accId, accessSecret: this._options.accSecret, stsToken: this._options.stsToken, domainRegion: this._options.domainRegion, authInfo: this._options.authInfo, format: this._options.format };this.loadData(a);
        }, f.prototype.replayByVidAndAuthInfo = function (a, b, c, d, e, f) {
            this.reloadNewVideoInfo(a, b, c, d, e, f);
        }, f.prototype.reloadNewVideoInfo = function (a, b, c, d, e, f) {
            if (this.trigger("error_hide"), this._options.source = "", a && (this._options.vid = a, this._options.accId = b, this._options.accessSecret = c, this._options.stsToken = d, this._options.domainRegion = f, this._options.authInfo = e), !(this._options.vid && this._options.accId && this._options.accessSecret && this._options.stsToken && this._options.domainRegion && this._options.authInfo)) throw new Error("需要提供vid、accId、accessSecret、stsToken、domainRegion和authInfo参数");this.loadByMts();
        }, b.exports = f;
    }, { "../../lib/constants": 19, "./mts": 69, "./saasplayer": 71 }], 71: [function (a, b, c) {
        var d = a("../base/player"),
            e = a("../audio/audioplayer"),
            f = (a("../../lib/event"), a("../../lib/io"), a("../../lib/constants")),
            g = (a("./signature"), a("./authkeyexpiredhandle")),
            h = a("../hls/hlsinjector"),
            i = a("../flv/flvinjector"),
            j = (a("../../lib/cookie"), a("../../lang/index")),
            k = a("../../lib/playerutil"),
            l = a("../base/event/eventtype"),
            m = d.extend({ init: function init(a, b) {
                this._authKeyExpiredHandle = new g(this), "mp3" == b.format ? (b.height = "auto", b.mediaType = "audio", d.prototype.createEl = e.prototype.createEl, e.call(this, a, b)) : d.call(this, a, b);
            } });m.prototype.loadData = function (a) {
            var b = new Date().getTime();this.log("STARTFETCHDATA", {});var c = this;this._urls = [], this._currentPlayIndex = 0, this._retrySwitchUrlCount = 0, this._authKeyExpiredHandle.clearTick(), this.service.getDataByAuthInfo(a, this._options.qualitySort, function (a) {
                if (c.log("COMPLETEFETCHDATA", { cost: new Date().getTime() - b }), a.urls && 0 == a.urls.length) return void c._mtsError_message(c, { Code: f.ErrorCode.URLsIsEmpty, Message: j.get("Error_Vod_URL_Is_Empty_Text") }, "");c._urls = a.urls, c._currentPlayIndex = k.findSelectedStreamLevel(c._urls);var e = a.urls[c._currentPlayIndex],
                    g = e.Url;c._options.source = g, k.isHls(g) ? h.inject(c, m, d.prototype, c._options) : k.isFlv(g) && i.inject(c, m, d.prototype, c._options), c._authKeyExpiredHandle.tick(f.AuthKeyRefreshExpired), c.trigger(l.Private.SourceLoaded, e), c.initPlay();
            }, function (a) {
                c._mtsError_message(c, a, "");
            });
        }, m.prototype._changeStream = function (a, b) {
            this._urls.length > a && (this.loadByUrl(this._urls[a].Url, this.getCurrentTime()), this._currentPlayIndex = a, this.trigger(l.Private.QualityChange, b || j.get("Quality_Change_Fail_Switch_Text")));
        }, m.prototype._getLowerQualityLevel = function () {
            if (0 == this._urls.length || -1 == this._currentPlayIndex) return "";if ("asc" == this.options().qualitySort) {
                if (this._currentPlayIndex > 0) return { item: this._urls[this._currentPlayIndex - 1], index: this._currentPlayIndex - 1 };
            } else if (this._currentPlayIndex < this._urls.length - 1) return { item: this._urls[this._currentPlayIndex + 1], index: this._currentPlayIndex + 1 };return "";
        }, m.prototype._mtsError_message = function (a, b, c) {
            var d = a;d.trigger("h5_loading_hide");var e = b.Code ? b.Code : "OTHER_ERR_CODE",
                g = b.Message ? b.Message : "OTHER_ERR_MSG",
                h = (f.ErrorCode.ServerAPIError, b.display_msg || "");g.indexOf("InvalidParameter.Rand") > -1 || g.indexOf('"Rand" is not valid.') > -1 ? (f.ErrorCode.EncrptyVideoNotSupport, h = j.get("Error_Not_Support_encrypt_Text")) : g.indexOf("SecurityToken.Expired") > -1 ? (f.ErrorCode.AuthKeyExpired, h = j.get("Error_Playauth_Expired_Text")) : g.indexOf("InvalidVideo.NoneStream") > -1 && (f.ErrorCode.URLsIsEmpty, h = j.get("Error_Fetch_NotStream") + "(format=" + d._options.format + ")");var i = d._options.vid ? d._options.vid : "0",
                k = (d._options.from && d._options.from, { mediaId: i, error_code: e, error_msg: g });b.sri && (k.sri = b.sri), d.logError(k), k.display_msg = h || j.get("Error_Vod_Fetch_Urls_Text"), d.trigger("error", k), console.log("PrismPlayer Error: " + c + "! error_msg :" + g + ";");
        }, b.exports = m;
    }, { "../../lang/index": 16, "../../lib/constants": 19, "../../lib/cookie": 20, "../../lib/event": 23, "../../lib/io": 25, "../../lib/playerutil": 29, "../audio/audioplayer": 36, "../base/event/eventtype": 38, "../base/player": 57, "../flv/flvinjector": 64, "../hls/hlsinjector": 66, "./authkeyexpiredhandle": 68, "./signature": 72 }], 72: [function (a, b, c) {
        var d = a("crypto-js/hmac-sha1"),
            e = a("crypto-js/enc-base64"),
            f = a("crypto-js/enc-utf8");b.exports.randomUUID = function () {
            for (var a = [], b = "0123456789abcdef", c = 0; c < 36; c++) {
                a[c] = b.substr(Math.floor(16 * Math.random()), 1);
            }return a[14] = "4", a[19] = b.substr(3 & a[19] | 8, 1), a[8] = a[13] = a[18] = a[23] = "-", a.join("");
        }, b.exports.returnUTCDate = function () {
            var a = new Date(),
                b = a.getUTCFullYear(),
                c = a.getUTCMonth(),
                d = a.getUTCDate(),
                e = a.getUTCHours(),
                f = a.getUTCMinutes(),
                g = a.getUTCSeconds(),
                h = a.getUTCMilliseconds();return Date.UTC(b, c, d, e, f, g, h);
        }, b.exports.AliyunEncodeURI = function (a) {
            var b = encodeURIComponent(a);return b = b.replace("+", "%2B"), b = b.replace("*", "%2A"), b = b.replace("%7E", "~");
        }, b.exports.makesort = function (a, b, c) {
            if (!a) throw new Error("PrismPlayer Error: vid should not be null!");var d = [];for (var e in a) {
                d.push(e);
            }for (var f = d.sort(), g = "", h = f.length, e = 0; e < h; e++) {
                "" == g ? g = f[e] + b + a[f[e]] : g += c + f[e] + b + a[f[e]];
            }return g;
        }, b.exports.makeUTF8sort = function (a, c, d) {
            if (!a) throw new Error("PrismPlayer Error: vid should not be null!");var e = [];for (var f in a) {
                e.push(f);
            }for (var g = e.sort(), h = "", i = g.length, f = 0; f < i; f++) {
                var j = b.exports.AliyunEncodeURI(g[f]),
                    k = b.exports.AliyunEncodeURI(a[g[f]]);"" == h ? h = j + c + k : h += d + j + c + k;
            }return h;
        }, b.exports.makeChangeSiga = function (a, c, f) {
            if (!a) throw new Error("PrismPlayer Error: vid should not be null!");return f || (f = "GET"), e.stringify(d(f + "&" + b.exports.AliyunEncodeURI("/") + "&" + b.exports.AliyunEncodeURI(b.exports.makeUTF8sort(a, "=", "&")), c + "&"));
        }, b.exports.ISODateString = function (a) {
            function b(a) {
                return a < 10 ? "0" + a : a;
            }return a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1) + "-" + b(a.getUTCDate()) + "T" + b(a.getUTCHours()) + ":" + b(a.getUTCMinutes()) + ":" + b(a.getUTCSeconds()) + "Z";
        }, b.exports.encPlayAuth = function (a) {
            var a = f.stringify(e.parse(a));if (!a) throw new Error("playuth参数解析为空");return JSON.parse(a);
        }, b.exports.encRsa = function () {};
    }, { "crypto-js/enc-base64": 2, "crypto-js/enc-utf8": 3, "crypto-js/hmac-sha1": 4 }], 73: [function (a, b, c) {
        var d = a("../../lib/io"),
            e = a("../../lib/constants"),
            f = a("./signature"),
            g = a("./util"),
            h = a("../../lang/index"),
            i = function i(a, b, c, _i) {
            var j = (f.randomUUID(), f.randomUUID()),
                k = "HMAC-SHA1",
                l = { AccessKeyId: a.accessKeyId, Action: "GetVideoPlayAuth", VideoId: a.vid, AuthTimeout: e.AuthInfoExpired, SecurityToken: a.securityToken, Format: "JSON", Version: "2017-03-21", SignatureMethod: k, SignatureVersion: "1.0", SignatureNonce: j },
                m = f.makeUTF8sort(l, "=", "&") + "&Signature=" + f.AliyunEncodeURI(f.makeChangeSiga(l, a.accessKeySecret)),
                n = "https://vod.cn-shanghai.aliyuncs.com/?" + m;d.get(n, function (a) {
                if (a) {
                    var d = JSON.parse(a);b && b(d.PlayAuth);
                } else c && c(g.createError("获取视频播放凭证失败"));
            }, function (a) {
                if (c) {
                    var b = JSON.parse(a);c({ Code: e.ErrorCode.ServerAPIError, Message: b.Code + "|" + b.Message, sri: b.requestId, display_msg: h.get("Fetch_Playauth_Error", _i) });
                }
            });
        };b.exports.getPlayAuth = i;
    }, { "../../lang/index": 16, "../../lib/constants": 19, "../../lib/io": 25, "./signature": 72, "./util": 74 }], 74: [function (a, b, c) {
        b.exports.createError = function (a, b) {
            return { requestId: "", code: b || "", message: a };
        };
    }, {}], 75: [function (a, b, c) {
        function d(a, b, c, d) {
            var l = h.randomUUID(),
                m = h.randomUUID(),
                n = "HMAC-SHA1",
                o = { AccessKeyId: a.accessId, Action: "GetPlayInfo", VideoId: a.vid, Formats: a.format, AuthInfo: a.authInfo, AuthTimeout: g.AuthKeyExpired, Rand: l, SecurityToken: a.stsToken, StreamType: a.mediaType, Format: "JSON", Version: "2017-03-21", SignatureMethod: n, SignatureVersion: "1.0", SignatureNonce: m, PlayerVersion: j.h5Version, Channel: "HTML5" },
                p = h.makeUTF8sort(o, "=", "&") + "&Signature=" + h.AliyunEncodeURI(h.makeChangeSiga(o, a.accessSecret)),
                q = "https://vod.cn-shanghai.aliyuncs.com/?" + p;f.get(q, function (a) {
                if (a) {
                    var f = JSON.parse(a),
                        g = f.PlayInfoList.PlayInfo;urls = e(g, b), c && c({ requestId: f.RequestId, urls: urls });
                } else d && d(i.createError("点播服务获取取数失败"));
            }, function (a) {
                if (d) {
                    var b = { Code: "", Message: k.get("Error_Vod_Fetch_Urls_Text") };try {
                        b = JSON.parse(a);
                    } catch (a) {}d({ Code: g.ErrorCode.ServerAPIError, Message: b.Code + "|" + b.Message, sri: b.requestId || "" });
                }
            });
        }function e(a, b) {
            var c = [];"desc" == b && a.reverse();for (var d = a.length - 1; d >= 0; d--) {
                var e = {};e.width = a[d].Width, e.height = a[d].Height, e.definition = a[d].Definition, e.Url = a[d].PlayURL, e.desc = g.QualityLevels[e.definition], c.push(e);
            }return c;
        }var f = a("../../lib/io"),
            g = a("../../lib/constants"),
            h = a("./signature"),
            i = a("./util"),
            j = a("../../config"),
            k = a("../../lang/index");b.exports.getDataByAuthInfo = d;
    }, { "../../config": 10, "../../lang/index": 16, "../../lib/constants": 19, "../../lib/io": 25, "./signature": 72, "./util": 74 }], 76: [function (a, b, c) {
        var d = a("./saasplayer"),
            e = a("../../lib/constants"),
            f = a("./vod"),
            g = a("./signature"),
            h = (a("./authkeyexpiredhandle"), a("./ststoken")),
            i = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.service = f;var c = this;this._options.accessKeyId && this._options.securityToken && this._options.accessKeySecret ? h.getPlayAuth(this._options, function (a) {
                    c._options.playauth = a, c.loadByVod();
                }, function (a) {
                    c._mtsError_message(c, a, "");
                }) : c.loadByVod();
            } });i.prototype.loadByVod = function () {
            try {
                var a = g.encPlayAuth(this._options.playauth);
            } catch (a) {
                var b = { Code: e.ErrorCode.PlayauthDecode, Message: "playauth decoded failed.", displayMessage: "playauth解析错误" };return void this._mtsError_message(this, b, this._options.playauth);
            }this._options.from = a.CustomerId ? a.CustomerId : "";var c = a.VideoMeta.CoverURL;if (this.UI.cover && c && !this._options.cover) {
                document.querySelector("#" + this.id() + " .prism-cover").style.backgroundImage = "url(" + c + ")";
            }var d = { vid: this._options.vid, accessId: a.AccessKeyId, accessSecret: a.AccessKeySecret, stsToken: a.SecurityToken, domainRegion: a.Region, authInfo: a.AuthInfo, playDomain: a.PlayDomain, format: this._options.format, mediaType: this._options.mediaType };this.loadData(d);
        }, i.prototype.replayByVidAndPlayAuth = function (a, b) {
            this.trigger("error_hide"), this._options.source = "", this._options.vid = a, this._options.playauth = b, this.loadByVod();
        }, i.prototype.updateSourcesByVidAndPlayAuth = function (a, b) {
            if (a != this._options.vid) return void console.log("不能更新地址，vid和播放中的不一致");this._options.vid = a, this._options.playauth = b;try {
                var c = g.encPlayAuth(this._options.playauth);
            } catch (a) {
                return void console.log("playauth解析错误");
            }var d = { vid: a, accessId: c.AccessKeyId, accessSecret: c.AccessKeySecret, stsToken: c.SecurityToken, domainRegion: c.Region, authInfo: c.AuthInfo, playDomain: c.PlayDomain, format: this._options.format, mediaType: this._options.mediaTyp };this._authKeyExpiredHandle.clearTick();var f = this;this.service.loadData(d, this._options.qualitySort, function (a) {
                f._serverRequestId = a.requestId, 0 != a.urls.length && (f._urls = a.urls), f._authKeyExpiredHandle.tick(e.AuthKeyRefreshExpired);
            }, function (a) {
                console.log(a);
            });
        }, i.prototype.reloaduserPlayInfoAndVidRequestMts = function (a, b) {
            this.replayByVidAndPlayAuth(a, b);
        }, b.exports = i;
    }, { "../../lib/constants": 19, "./authkeyexpiredhandle": 68, "./saasplayer": 71, "./signature": 72, "./ststoken": 73, "./vod": 75 }], 77: [function (a, b, c) {
        var d = a("../../lib/ua"),
            e = a("../../lib/dom"),
            f = a("../../lib/event"),
            g = a("../base/event/eventtype"),
            h = a("../base/x5play"),
            i = a("../../lang/index"),
            j = function () {
            var a;e.createEl("div"), a = {};var b = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror", "fullScreen"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror", "webkitfullScreen"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror", "webkitIsFullScreen"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror", "mozFullScreen"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError", "MSFullScreen"]];if (d.IS_IOS) a.requestFn = "webkitEnterFullscreen", a.cancelFn = "webkitExitFullscreen", a.eventName = "webkitfullscreenchange", a.isFullScreen = "webkitDisplayingFullscreen";else {
                for (var c = 5, f = 0; f < c; f++) {
                    if (b[f][1] in document) {
                        a.requestFn = b[f][0], a.cancelFn = b[f][1], a.eventName = b[f][4], a.isFullScreen = b[f][6];break;
                    }
                }"requestFullscreen" in document ? a.requestFn = "requestFullscreen" : "webkitRequestFullscreen" in document ? a.requestFn = "webkitRequestFullscreen" : "webkitRequestFullScreen" in document ? a.requestFn = "webkitRequestFullScreen" : "webkitEnterFullscreen" in document ? a.requestFn = "webkitEnterFullscreen" : "mozRequestFullScreen" in document ? a.requestFn = "mozRequestFullScreen" : "msRequestFullscreen" in document && (a.requestFn = "msRequestFullscreen"), "fullscreenchange" in document ? a.eventName = "fullscreenchange" : "webkitfullscreenchange" in document ? a.eventName = "webkitfullscreenchange" : "webkitfullscreenchange" in document ? a.eventName = "webkitfullscreenchange" : "webkitfullscreenchange" in document ? a.eventName = "webkitfullscreenchange" : "mozfullscreenchange" in document ? a.eventName = "mozfullscreenchange" : "MSFullscreenChange" in document && (a.eventName = "MSFullscreenChange"), "fullScreen" in document ? a.isFullScreen = "fullScreen" : "webkitfullScreen" in document ? a.isFullScreen = "webkitfullScreen" : "webkitIsFullScreen" in document ? a.isFullScreen = "webkitIsFullScreen" : "webkitDisplayingFullscreen" in document ? a.isFullScreen = "webkitDisplayingFullscreen" : "mozFullScreen" in document ? a.isFullScreen = "mozFullScreen" : "mozfullScreen" in document ? a.isFullScreen = "mozfullScreen" : "MSFullScreen" in document && (a.isFullScreen = "MSFullScreen");
            }return a.requestFn ? a : null;
        }(),
            k = function k(a) {
            this.isFullWindow = !1, this.isFullScreen = !1, this.isFullScreenChanged = !1, this._requestFullScreenTimer = null, this._cancelFullScreenTimer = null, this._player = a;var b = this,
                c = j;c && f.on(document, c.eventName, function (a) {
                b.isFullScreen = document[c.isFullScreen], b.isFullScreenChanged = !0, !0 === b.isFullScreen ? b._player.trigger(g.Player.RequestFullScreen) : b._player.trigger(g.Player.CancelFullScreen);
            });
        };k.prototype.requestFullScreen = function () {
            if (h.isAndroidX5() && this._player.paused()) return void this._player.trigger(g.Private.Info_Show, i.get("Play_Before_Fullscreen"));var a = j,
                b = this._player.el(),
                c = this;if (d.IS_IOS) return b = this._player.tag, b[a.requestFn](), c._player.trigger(g.Player.RequestFullScreen), this;this.isFullScreen = !0, this.isFullScreenChanged = !1, this._requestFullScreenTimer = null, this._cancelFullScreenTimer || clearTimeout(this._cancelFullScreenTimer);var c = this;return a ? (b[a.requestFn](), this._requestFullScreenTimer = setTimeout(function () {
                c.isFullScreenChanged || (l.apply(c), c._player.trigger(g.Player.RequestFullScreen)), c._requestFullScreenTimer = null;
            }, 500)) : (l.apply(c), this._player.trigger(g.Player.RequestFullScreen)), this._player;
        }, k.prototype.cancelFullScreen = function () {
            var a = j,
                b = this;this.isFullScreen = !1, this.isFullScreenChanged = !1, this._cancelFullScreenTimer = null, this._requestFullScreenTimer || clearTimeout(this._requestFullScreenTimer);var b = this;return a ? (document[a.cancelFn](), b._cancelFullScreenTimer = setTimeout(function () {
                b.isFullScreenChanged || (m.apply(b), b._player.trigger(g.Player.CancelFullScreen)), b._cancelFullScreenTimer = null;
            }, 500), this._player.tag.paused || this._player.trigger(g.Player.Play)) : (m.apply(b), this._player.trigger(g.Player.CancelFullScreen), this._player.tag.paused || this._player.trigger(g.Player.Play)), this._player;
        }, k.prototype.getIsFullScreen = function () {
            return this.isFullScreen;
        };var l = function l() {
            this.isFullWindow = !0, this.docOrigOverflow = document.documentElement.style.overflow, document.documentElement.style.overflow = "hidden", e.addClass(document.getElementsByTagName("body")[0], "prism-full-window");
        },
            m = function m() {
            this.isFullWindow = !1, document.documentElement.style.overflow = this.docOrigOverflow, e.removeClass(document.getElementsByTagName("body")[0], "prism-full-window");
        };b.exports = k;
    }, { "../../lang/index": 16, "../../lib/dom": 22, "../../lib/event": 23, "../../lib/ua": 31, "../base/event/eventtype": 38, "../base/x5play": 62 }], 78: [function (a, b, c) {
        var d = a("../../lib/io"),
            e = a("../../lib/util"),
            f = a("../../lang/index"),
            g = a("../../lib/constants"),
            h = a("../base/event/eventtype"),
            i = function i(a, b) {
            if (a && a) {
                var c = new Date(a),
                    d = new Date(b),
                    f = d.valueOf() / 1e3 - c.valueOf() / 1e3;return { start: c, end: d, endDisplay: e.extractTime(d), totalTime: f };
            }
        },
            j = function j(a, b) {
            b && (a.currentTimestamp = b, a.currentTime = e.convertToDate(b), a.currentTimeDisplay = e.extractTime(a.currentTime), a.liveShiftStart = a.liveTimeRange.start, a.liveShiftEnd = a.liveTimeRange.end, a.liveShiftStartDisplay = e.extractTime(a.liveShiftStart), a.liveShiftEndDisplay = e.extractTime(a.liveShiftEnd), a.availableLiveShiftTime = b - a.liveShiftStart.valueOf() / 1e3, a.timestampStart = e.convertToTimestamp(a.liveShiftStart), a.timestampEnd, e.convertToTimestamp(a.liveShiftEnd));
        },
            k = function k(a) {
            this._player = a, this._originalPlayUrl = a._options.source, this._liveShiftUrl = a._options.liveTimeShiftUrl, this.liveTimeRange = i(a._options.liveStartTime, a._options.liveOverTime), this.availableLiveShiftTime = 0, this.seekTime = -1;var b = this;a.liveShiftSerivce = { setLiveTimeRange: function setLiveTimeRange(a, c) {
                    b.setLiveTimeRange(a, c);
                }, queryLiveShift: function queryLiveShift(a, c, d) {
                    b.queryLiveShift(a, c, d);
                } };
        };k.prototype.validate = function () {
            return !(this.liveTimeRange.start >= this.liveTimeRange.end);
        }, k.prototype.getBaseTime = function () {
            this.liveShiftStartDisplay;return -1 == this.seekTime ? e.parseTime(this.currentTimeDisplay) : e.parseTime(this.liveShiftStartDisplay) + this.seekTime;
        }, k.prototype.getSourceUrl = function (a) {
            var b = this._originalPlayUrl;return this.availableLiveShiftTime <= a ? b : (a = this.timestampStart + parseInt(a), b = -1 == b.indexOf("?") ? b + "?lhs_start_unix_s_0=" + a : b + "&lhs_start_unix_s_0=" + a);
        }, k.prototype.getTimeline = function (a, b) {
            if (this._liveShiftUrl) {
                var c = this;this.queryLiveShift(this._liveShiftUrl, function (d) {
                    if (d) {
                        var e = d;0 == e.retCode ? (j(c, e.content.current), c._player.trigger(h.Private.LiveShiftQueryCompleted), a && a()) : b({ Code: g.ErrorCode.ServerAPIError, Message: e.retCode + "|" + e.description + "|" + e.content });
                    } else console.log("获取直播时移数据失败");
                }, function (a) {
                    if (b && a) {
                        var c = {};if (a) {
                            if (a.indexOf("403 Forbidden") > -1) c.Code = g.ErrorCode.AuthKeyExpired, c.Message = "Query liveshift failed:" + f.get("Error_AuthKey_Text");else {
                                var d,
                                    c = a;try {
                                    d = JSON.parse(a);
                                } catch (a) {}d && (c.Code = g.ErrorCode.ServerAPIError, c.Message = d.retCode + "|" + d.description + "|" + d.content);
                            }b(c);
                        }
                    }
                });
            }
        }, k.prototype.start = function (a, b) {
            var c = this,
                d = function d() {
                c._loopHandler = setTimeout(function () {
                    c.getTimeline(function () {}, b), d();
                }, a);
            };c.getTimeline(function (a) {
                c._localLiveTimeHandler || c.tickLocalLiveTime();
            }, b), d();
        }, k.prototype.tickLocalLiveTime = function () {
            var a = this,
                b = function b() {
                a._localLiveTimeHandler = setTimeout(function () {
                    a.currentTimestamp++, j(a, a.currentTimestamp), a._player.trigger(h.Private.LiveShiftQueryCompleted), b();
                }, 1e3);
            };b();
        }, k.prototype.setLiveTimeRange = function (a, b) {
            a || (a = this._player._options.liveStartTime), b || (b = this._player._options.liveOverTime), this.liveTimeRange = i(a, b), j(this, this.currentTimestamp), this._player.trigger(h.Private.LiveShiftQueryCompleted);
        }, k.prototype.queryLiveShift = function (a, b, c) {
            d.get(a, function (a) {
                if (a) {
                    var d = JSON.parse(a);0 == d.retCode ? b && b(d) : c && c(d);
                } else c && c(a);
            }, function (a) {
                c && c(a);
            });
        }, k.prototype.stop = function (a) {
            this._loopHandler && (clearTimeout(this._loopHandler), this._loopHandler = null);
        }, b.exports = k;
    }, { "../../lang/index": 16, "../../lib/constants": 19, "../../lib/io": 25, "../../lib/util": 33, "../base/event/eventtype": 38 }], 79: [function (a, b, c) {
        var d = a("../base/player"),
            e = a("../hls/hlsinjector"),
            f = a("../../lib/io"),
            g = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.loadVideoInfo();
            } });g.prototype.loadVideoInfo = function (a) {
            this.trigger("error_hide");var b = this._options.vid,
                c = this;if (!b) throw new Error("PrismPlayer Error: vid should not be null!");f.jsonp("//tv.taobao.com/player/json/getBaseVideoInfo.do?vid=" + b + "&playerType=3", function (f) {
                if (1 !== f.status || !f.data.source) throw new Error("PrismPlayer Error: #vid:" + b + " cannot find video resource!");var g,
                    h = -1;_.each(f.data.source, function (a, b) {
                    var c = +a.substring(1);c > h && (h = c);
                }), g = f.data.source["v" + h], g = _.unescape(g), c._options.source = g, e.inject(c, TaobaoTVPlayer, d.prototype, c._options), c.initPlay(), a && a();
            }, function () {
                throw new Error("PrismPlayer Error: network error!");
            });
        }, g.prototype.loadByVid = function (a) {
            this._options.vid = a;var b = this;if (!a) throw new Error("PrismPlayer Error: vid should not be null!");this._monitor && this._monitor.updateVideoInfo({ video_id: a, album_id: data.data.baseInfo.aid, source: src, from: b._options.from }), this._options.autoplay = !0, this.loadVideoInfo(function () {
                b.cover && b._options.autoplay && (Dom.css(b.cover, "display", "none"), delete b.cover), b.tag.play();
            });
        }, b.exports = g;
    }, { "../../lib/io": 25, "../base/player": 57, "../hls/hlsinjector": 66 }], 80: [function (a, b, c) {
        var d = a("../lib/oo"),
            e = a("../lib/data"),
            f = a("../lib/object"),
            g = a("../lib/dom"),
            h = a("../lib/event"),
            i = a("../lib/function"),
            j = a("../lib/layout"),
            k = (a("../lib/constants"), a("../lib/util"), a("../player/base/event/eventtype")),
            l = d.extend({ init: function init(a, b) {
                var c = this;this._player = a, this._eventState = "", this._options = f.copy(b), this._el = this.createEl();var d = a.id;"function" == typeof a.id && (d = a.id()), this._id = d + "_component_" + e.guid(), this._children = [], this._childIndex = {}, this._player.on(k.Private.UiH5Ready, function () {
                    c.renderUI(), c.syncUI(), c.bindEvent();
                });
            } });l.prototype.renderUI = function () {
            j.render(this.el(), this.options()), this.el().id = this.id();
        }, l.prototype.syncUI = function () {}, l.prototype.bindEvent = function () {}, l.prototype.createEl = function (a, b) {
            return g.createEl(a, b);
        }, l.prototype.options = function (a) {
            return void 0 === a ? this._options : this._options = f.merge(this._options, a);
        }, l.prototype.el = function () {
            return this._el;
        }, l.prototype._contentEl, l.prototype.player = function () {
            return this._player;
        }, l.prototype.contentEl = function () {
            return this._contentEl || this._el;
        }, l.prototype._id, l.prototype.id = function () {
            return this._id;
        }, l.prototype.getId = function () {
            return this._id;
        }, l.prototype.addChild = function (a, b) {
            var c;if ("string" == typeof a) {
                if (!this._player.UI[a]) return;c = new this._player.UI[a](this._player, b);
            } else c = a;if (this._children.push(c), "function" == typeof c.id && (this._childIndex[c.id()] = c), "function" == typeof c.el && c.el()) {
                var d = c.el();d.id = c.id(), this.contentEl().appendChild(d);
            }return c;
        }, l.prototype.removeChild = function (a) {
            if (a && this._children) {
                for (var b = !1, c = this._children.length - 1; c >= 0; c--) {
                    if (this._children[c] === a) {
                        b = !0, this._children.splice(c, 1);break;
                    }
                }if (b) {
                    this._childIndex[a.id] = null;var d = a.el();d && d.parentNode === this.contentEl() && this.contentEl().removeChild(a.el());
                }
            }
        }, l.prototype.initChildren = function () {
            var a, b, c, d, e;if (a = this, b = this.options().children) if (f.isArray(b)) for (var g = 0; g < b.length; g++) {
                c = b[g], "string" == typeof c ? (d = c, e = {}) : (d = c.name, e = c), a.addChild(d, e);
            } else f.each(b, function (b, c) {
                !1 !== c && a.addChild(b, c);
            });
        }, l.prototype.on = function (a, b) {
            return h.on(this._el, a, i.bind(this, b)), this;
        }, l.prototype.off = function (a, b) {
            return h.off(this._el, a, b), this;
        }, l.prototype.one = function (a, b) {
            return h.one(this._el, a, i.bind(this, b)), this;
        }, l.prototype.trigger = function (a, b) {
            return (b || 0 == b) && (this._el.paramData = b), this._eventState = a, h.trigger(this._el, a), this;
        }, l.prototype.off = function (a) {
            return h.off(this._el, a), this;
        }, l.prototype.addClass = function (a) {
            return g.addClass(this._el, a), this;
        }, l.prototype.removeClass = function (a) {
            return g.removeClass(this._el, a), this;
        }, l.prototype.show = function () {
            return this._el.style.display = "block", this;
        }, l.prototype.hide = function () {
            return this._el.style.display = "none", this;
        }, l.prototype.destroy = function () {
            if (this.trigger({ type: "destroy", bubbles: !1 }), this._children) for (var a = this._children.length - 1; a >= 0; a--) {
                this._children[a].destroy && this._children[a].destroy();
            }this.children_ = null, this.childIndex_ = null, this.off(), this._el.parentNode && this._el.parentNode.removeChild(this._el), e.removeData(this._el), this._el = null;
        }, b.exports = l;
    }, { "../lib/constants": 19, "../lib/data": 21, "../lib/dom": 22, "../lib/event": 23, "../lib/function": 24, "../lib/layout": 26, "../lib/object": 27, "../lib/oo": 28, "../lib/util": 33, "../player/base/event/eventtype": 38 }], 81: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../lib/dom"),
            f = (a("../../lib/event"), a("../../player/base/event/eventtype")),
            g = a("../../player/base/plugin/status"),
            h = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.addClass(b.className || "prism-big-play-btn");
            }, bindEvent: function bindEvent() {
                var a = this;this._player.on(f.Player.Play, function () {
                    a.addClass("playing"), a.removeClass("pause"), a._hide();
                }), this._player.on(f.Player.Pause, function () {
                    a.removeClass("playing"), a.addClass("pause");var b = a._player._status;b != g.ended && b != g.error && a._show();
                }), this.on(f.Private.Click, function () {
                    a._player.paused() ? a._player.play() : a._player.pause();
                }), this._player.on(f.Private.Play_Btn_Show, function () {
                    a._show();
                }), this._player.on(f.Private.Play_Btn_Hide, function () {
                    a._hide();
                });
            }, _show: function _show() {
                e.css(this.el(), "display", "block");
            }, _hide: function _hide() {
                e.css(this.el(), "display", "none");
            } });b.exports = h;
    }, { "../../lib/dom": 22, "../../lib/event": 23, "../../player/base/event/eventtype": 38, "../../player/base/plugin/status": 61, "../component": 80 }], 82: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../player/base/event/eventtype"),
            f = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.addClass(b.className || "prism-controlbar"), this.initChildren(), this.onEvent();
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this);return a.innerHTML = '<div class="prism-controlbar-bg"></div>', a;
            }, onEvent: function onEvent() {
                var a = this.player(),
                    b = a.options(),
                    c = this;this.timer = null;var d = b.controlBarVisibility;1 == b.controlBarForOver && (d = "hover"), "hover" == d ? (c.hide(), a.on(e.Private.MouseOver, function () {
                    c._show();
                }), a.on(e.Private.MouseOut, function () {
                    c.hide(), a.trigger(e.Private.HideBar);
                })) : "click" == d ? (a.on(e.Private.Click, function (b) {
                    a._isError || (b.preventDefault(), b.stopPropagation(), c._show(), c._hide());
                }), a.on(e.Player.Ready, function () {
                    c._hide();
                }), a.on(e.Private.TouchStart, function () {
                    c._show();
                }), a.on(e.Private.TouchMove, function () {
                    c._show();
                }), a.on(e.Private.TouchEnd, function () {
                    c._hide();
                })) : c._show();
            }, _show: function _show() {
                this.show(), this._player.trigger(e.Private.ShowBar), this.timer && (clearTimeout(this.timer), this.timer = null);
            }, _hide: function _hide() {
                var a = this,
                    b = this.player(),
                    c = b.options(),
                    d = c.showBarTime;this.timer = setTimeout(function () {
                    a.hide(), a._player.trigger(e.Private.HideBar);
                }, d);
            } });b.exports = f;
    }, { "../../player/base/event/eventtype": 38, "../component": 80 }], 83: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../lib/dom"),
            f = a("../../player/base/event/eventtype"),
            g = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.addClass(b.className || "prism-cover");
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this, "div"),
                    b = this.options().cover;return b && (a.style.backgroundImage = "url(" + b + ")"), a;
            }, _hide: function _hide(a) {
                var b = this,
                    c = document.querySelector("#" + b.id() + " .prism-cover");c && e.css(c, "display", "none");
            }, _show: function _show(a) {
                var b = this,
                    c = document.querySelector("#" + b.id() + " .prism-cover");c && e.css(c, "display", "block");
            }, bindEvent: function bindEvent() {
                var a = this;a._player.on(f.Private.Cover_Show, a._show), a._player.on(f.Private.Cover_Hide, a._hide);
            } });b.exports = g;
    }, { "../../lib/dom": 22, "../../player/base/event/eventtype": 38, "../component": 80 }], 84: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../lib/util"),
            f = a("../../lib/dom"),
            g = a("../../lib/event"),
            h = a("../../lib/ua"),
            i = a("../../lang/index"),
            j = a("../../player/base/event/eventtype"),
            k = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.className = b.className ? b.className : "prism-ErrorMessage", this.addClass(this.className);
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this, "div");return a.innerHTML = "<div class='prism-error-content'><p></p></div><div class='prism-error-operation'><a class='prism-button prism-button-refresh' type='button'>" + i.get("Refresh_Text") + "</a><a class='prism-button prism-button-orange'  target='_blank'>" + i.get("Detection_Text") + "</a></div><div class='prism-detect-info prism-center'><p class='errorCode'><span class='info-label'>code：</span><span class='info-content'></span></p><p class='vid'><span class='info-label'>vid：</span><span class='info-content'></span></p><p class='uuid'><span class='info-label'>uuid：</span><span class='info-content'></span></p><p class='requestId'><span class='info-label'>requestId：</span><span class='info-content'></span></p><p class='dateTime'><span class='info-label'>" + i.get("Play_DateTime") + "：</span><span class='info-content'></span></p></div>", a;
            }, bindEvent: function bindEvent() {
                var a = this;a._player.on(j.Private.Error_Show, function (b) {
                    var c = null;a._player.getMonitorInfo && (c = a._player.getMonitorInfo()), a._show(b, c);
                }), a._player.on(j.Private.Error_Hide, a._hide);var b = document.querySelector("#" + a.id() + " .prism-button-refresh");if (g.on(b, "click", function () {
                    location.reload(!0);
                }), h.IS_MOBILE) {
                    var b = document.querySelector("#" + a.id() + " .prism-detect-info");f.addClass(b, "prism-width90");
                }
            }, _show: function _show(a, b) {
                var c = a.paramData,
                    d = "",
                    g = "";c.mediaId && (d = c.mediaId);var h = document.querySelector("#" + this.id() + " .prism-button-orange");if (b) {
                    b.vu && (g = decodeURIComponent(b.vu));var j = "http://player.alicdn.com/detection.html?from=h5&vid=" + d + "&source=" + g + "&pd=" + b.pd + "&vt=" + b.vt + "&tt=" + b.tt + "&uuid=" + b.uuid + "&av=" + b.av + "&bi=" + b.bi + "&md=" + b.md + "&vu=" + g + "&lang=" + i.getCurrentLanguage();h.href = j;
                } else f.css(h, "display", "none");var k = c.display_msg || c.error_msg;document.querySelector("#" + this.id() + " .prism-error-content p").innerHTML = k, document.querySelector("#" + this.id() + " .errorCode .info-content").innerText = c.error_code;var l = document.querySelector("#" + this.id() + " .vid");if (c.mediaId ? (f.css(l, "display", "block"), document.querySelector("#" + this.id() + " .vid .info-content").innerText = c.mediaId) : f.css(l, "display", "none"), c.uuid) document.querySelector("#" + this.id() + " .uuid .info-content").innerText = c.uuid;else {
                    var m = document.querySelector("#" + this.id() + " .uuid");f.css(m, "display", "none");
                }if (c.requestId) document.querySelector("#" + this.id() + " .requestId .info-content").innerText = c.requestId;else {
                    var n = document.querySelector("#" + this.id() + " .requestId");f.css(n, "display", "none");
                }document.querySelector("#" + this.id() + " .dateTime .info-content").innerText = e.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss");var o = document.querySelector(".prism-ErrorMessage");f.css(o, "display", "block");var p = this;setTimeout(function () {
                    p._player.trigger("play_btn_hide");
                });
            }, _hide: function _hide() {
                var a = document.querySelector(".prism-ErrorMessage");f.css(a, "display", "none");
            } });b.exports = k;
    }, { "../../lang/index": 16, "../../lib/dom": 22, "../../lib/event": 23, "../../lib/ua": 31, "../../lib/util": 33, "../../player/base/event/eventtype": 38, "../component": 80 }], 85: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../player/base/event/eventtype"),
            f = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.addClass(b.className || "prism-fullscreen-btn");
            }, bindEvent: function bindEvent() {
                var a = this;this._player.on(e.Player.RequestFullScreen, function () {
                    a.addClass("fullscreen");
                }), this._player.on(e.Player.CancelFullScreen, function () {
                    a.removeClass("fullscreen");
                }), this.on("click", function () {
                    a._player.fullscreenService.getIsFullScreen() ? a._player.fullscreenService.cancelFullScreen() : a._player.fullscreenService.requestFullScreen();
                });
            } });b.exports = f;
    }, { "../../player/base/event/eventtype": 38, "../component": 80 }], 86: [function (a, b, c) {
        "use strict";
        var d = a("../component"),
            e = (a("../../lib/dom"), a("../../player/base/event/eventtype")),
            f = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.addClass(b.className || "prism-hide");
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this, "div");return a.innerHTML = '<div class="circle"></div> <div class="circle1"></div>', a;
            }, _loading_hide: function _loading_hide(a) {
                var b = this,
                    c = document.querySelector("#" + b.id() + " .prism-loading");c && (c.className = "prism-hide");
            }, _loading_show: function _loading_show(a) {
                var b = this,
                    c = document.querySelector("#" + b.id() + " .prism-hide");c && (c.className = "prism-loading");
            }, bindEvent: function bindEvent() {
                var a = this;a._player.on(e.Private.H5_Loading_Show, a._loading_show), a._player.on(e.Private.H5_Loading_Hide, a._loading_hide);
            } });b.exports = f;
    }, { "../../lib/dom": 22, "../../player/base/event/eventtype": 38, "../component": 80 }], 87: [function (a, b, c) {
        var d = a("../component"),
            e = (a("../../lib/util"), a("../../lib/dom")),
            f = (a("../../lib/event"), a("../../lib/ua"), a("../../lang/index"), a("../../player/base/event/eventtype")),
            g = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.className = b.className ? b.className : "prism-info-display", this.addClass(this.className);
            }, createEl: function createEl() {
                return d.prototype.createEl.call(this, "p");
            }, bindEvent: function bindEvent() {
                var a = this;a._player.on(f.Private.Info_Show, function (b) {
                    var c = document.querySelector("#" + a.getId()),
                        d = b.paramData;d && (void 0 !== d.text && d.text ? (c.innerHTML = d.text, void 0 !== d.duration && d.duration && setTimeout(function () {
                        e.css(c, "display", "none");
                    }, d.duration), "bl" != typeof d.align ? e.addClass(c, "prism-info-left-bottom") : e.removeClass(c, "prism-info-left-bottom")) : c.innerHTML = d, e.css(c, "display", "block"));
                }), a._player.on(f.Private.Info_Hide, function (b) {
                    var c = document.querySelector("#" + a.getId());e.css(c, "display", "none");
                });
            } });b.exports = g;
    }, { "../../lang/index": 16, "../../lib/dom": 22, "../../lib/event": 23, "../../lib/ua": 31, "../../lib/util": 33, "../../player/base/event/eventtype": 38, "../component": 80 }], 88: [function (a, b, c) {
        var d = a("../component"),
            e = (a("../../lib/util"), d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.className = b.className ? b.className : "prism-live-display", this.addClass(this.className);
            } }));b.exports = e;
    }, { "../../lib/util": 33, "../component": 80 }], 89: [function (a, b, c) {
        var d = a("../component"),
            e = (a("../../lib/dom"), a("../../lib/event"), a("../../player/base/event/eventtype")),
            f = a("../../player/base/plugin/status"),
            g = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.addClass(b.className || "prism-animation");
            }, bindEvent: function bindEvent() {
                var a = this;this._player.on(e.Player.Play, function () {
                    a.removeClass("prism-pause-animation"), a.addClass("prism-play-animation"), a.removeClass("play-apply-animation"), setTimeout(function () {
                        a.addClass("play-apply-animation");
                    });
                }), this._player.on(e.Player.Pause, function () {
                    var b = a._player._status;b != f.ended && b != f.error && (a.removeClass("prism-play-animation"), a.addClass("prism-pause-animation"), a.removeClass("play-apply-animation"), setTimeout(function () {
                        a.addClass("play-apply-animation");
                    }));
                });
            } });b.exports = g;
    }, { "../../lib/dom": 22, "../../lib/event": 23, "../../player/base/event/eventtype": 38, "../../player/base/plugin/status": 61, "../component": 80 }], 90: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../player/base/event/eventtype"),
            f = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.addClass(b.className || "prism-play-btn");
            }, bindEvent: function bindEvent() {
                var a = this;this._player.on(e.Player.Play, function () {
                    a.addClass("playing");
                }), this._player.on(e.Player.Pause, function () {
                    a.removeClass("playing");
                }), this.on(e.Private.Click, function () {
                    a._player.paused() ? (a._player.play(), a.addClass("playing")) : (a._player.pause(), a.removeClass("playing"));
                });
            } });b.exports = f;
    }, { "../../player/base/event/eventtype": 38, "../component": 80 }], 91: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../lib/dom"),
            f = a("../../lib/event"),
            g = a("../../lib/ua"),
            h = a("../../lib/function"),
            i = a("../../lang/index"),
            j = a("../../lib/util"),
            k = a("../../player/base/event/eventtype"),
            l = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.className = b.className ? b.className : "prism-progress", this.addClass(this.className);
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this);return a.innerHTML = '<div class="prism-progress-loaded"></div><div class="prism-progress-played"></div><div class="prism-progress-cursor"></div><p class="prism-progress-time"></p>', a;
            }, bindEvent: function bindEvent() {
                var a = this;this.loadedNode = document.querySelector("#" + this.id() + " .prism-progress-loaded"), this.playedNode = document.querySelector("#" + this.id() + " .prism-progress-played"), this.cursorNode = document.querySelector("#" + this.id() + " .prism-progress-cursor"), this.timeNode = document.querySelector("#" + this.id() + " .prism-progress-time"), this.controlNode = document.querySelector("#" + this._player._options.id + " .prism-controlbar");var b = document.querySelector("#" + this.id());f.on(this.cursorNode, "mousedown", function (b) {
                    a._onMouseDown(b);
                }), f.on(this.cursorNode, "touchstart", function (b) {
                    a._onMouseDown(b);
                }), f.on(b, "mousemove", function (b) {
                    a._progressMove(b);
                }), f.on(b, "touchmove", function (b) {
                    a._progressMove(b);
                }), f.on(this._el, "click", function (b) {
                    a._onMouseClick(b);
                }), this._player.on(k.Private.HideProgress, function (b) {
                    a._hideProgress(b);
                }), this._player.on(k.Private.CancelHideProgress, function (b) {
                    a._cancelHideProgress(b);
                }), f.on(b, k.Private.MouseOver, function (b) {
                    a._onMouseOver(b);
                }), f.on(b, k.Private.MouseOut, function (b) {
                    a._onMouseOut(b);
                }), f.on(this.controlNode, k.Private.MouseLeave, function (b) {
                    a._offMouseUp();
                }), this.bindTimeupdate = h.bind(this, this._onTimeupdate), this._player.on(k.Player.TimeUpdate, this.bindTimeupdate), g.IS_IPAD ? this.interval = setInterval(function () {
                    a._onProgress();
                }, 500) : this._player.on(k.Video.Progress, function () {
                    a._onProgress();
                });
            }, _progressMove: function _progressMove(a) {
                var b = this._getSeconds(a);this.timeNode.innerText = j.formatTime(b);var c = this._player.getDuration() ? b / this._player.getDuration() : 0,
                    d = this.timeNode.clientWidth,
                    f = 1 - d / this.el().clientWidth;c > f && (c = f), this.cursorNode && e.css(this.timeNode, "left", 100 * c + "%");
            }, _hideProgress: function _hideProgress(a) {
                f.off(this.cursorNode, "mousedown"), f.off(this.cursorNode, "touchstart");
            }, _cancelHideProgress: function _cancelHideProgress(a) {
                var b = this;f.on(this.cursorNode, "mousedown", function (a) {
                    b._onMouseDown(a);
                }), f.on(this.cursorNode, "touchstart", function (a) {
                    b._onMouseDown(a);
                });
            }, _canSeekable: function _canSeekable(a) {
                var b = !0;return "function" == typeof this._player.canSeekable && (b = this._player.canSeekable(a)), b;
            }, _onMouseOver: function _onMouseOver(a) {
                if (this._cursorHideHandler && (clearTimeout(this._cursorHideHandler), this._cursorHideHandler = null), !this._mouseInProgress) {
                    this._updateCursorPosition(this._player.getCurrentTime());var b = this;setTimeout(function () {
                        e.css(b.cursorNode, "display", "block");
                    }), e.css(this.timeNode, "display", "block");
                }this._mouseInProgress = !0;
            }, _onMouseOut: function _onMouseOut(a) {
                var b = this;this._cursorHideHandler = setTimeout(function () {
                    e.css(b.cursorNode, "display", "none"), e.css(b.timeNode, "display", "none"), b._mouseInProgress = !1;
                });
            }, _getSeconds: function _getSeconds(a) {
                for (var b = this.el().offsetLeft, c = this.el(); c = c.offsetParent;) {
                    b += c.offsetLeft;
                }var d = a.touches ? a.touches[0].pageX : a.pageX,
                    e = d - b,
                    f = this.el().offsetWidth,
                    g = this._player.getDuration() ? e / f * this._player.getDuration() : 0;return g < 0 && (g = 0), g > this._player.getDuration() && (g = this._player.getDuration()), g;
            },
            _onMouseClick: function _onMouseClick(a) {
                var b = this._getSeconds(a);if (!this._canSeekable(b)) return void this._player.trigger(k.Private.Info_Show, { text: i.get("Can_Not_Seekable"), duration: 2e3 });this._player.trigger(k.Private.SeekStart, { fromTime: this._player.getCurrentTime() }), this._player.seek(b), this._player.trigger(k.Private.EndStart, { toTime: b }), this._updateCursorPosition(b);
            }, _onMouseDown: function _onMouseDown(a) {
                var b = this;a.preventDefault(), this._player.trigger(k.Private.SeekStart, { fromTime: this._player.getCurrentTime() }), f.on(this.controlNode, "mousemove", function (a) {
                    b._onMouseMove(a);
                }), f.on(this.controlNode, "touchmove", function (a) {
                    b._onMouseMove(a);
                }), f.on(this._player.tag, "mouseup", function (a) {
                    b._onPlayerMouseUp(a);
                }), f.on(this._player.tag, "touchend", function (a) {
                    b._onPlayerMouseUp(a);
                }), f.on(this.controlNode, "mouseup", function (a) {
                    b._onControlBarMouseUp(a);
                }), f.on(this.controlNode, "touchend", function (a) {
                    b._onControlBarMouseUp(a);
                });
            }, _onMouseUp: function _onMouseUp(a) {
                this._onMouseUpIntern(a);
            }, _onControlBarMouseUp: function _onControlBarMouseUp(a) {
                this._onMouseUpIntern(a);
            }, _onPlayerMouseUp: function _onPlayerMouseUp(a) {
                this._onMouseUpIntern(a);
            }, _offMouseUp: function _offMouseUp() {
                f.off(this.controlNode, "mousemove"), f.off(this.controlNode, "touchmove"), f.off(this._player.tag, "mouseup"), f.off(this._player.tag, "touchend"), f.off(this.controlNode, "mouseup"), f.off(this.controlNode, "touchend");
            }, _onMouseUpIntern: function _onMouseUpIntern(a) {
                a.preventDefault(), this._offMouseUp();var b = this.playedNode.offsetWidth / this.el().offsetWidth * this._player.getDuration();this._player.getDuration();isNaN(b) || this._player.seek(b), this._player.trigger(k.Private.EndStart, { toTime: b });
            }, _onMouseMove: function _onMouseMove(a) {
                a.preventDefault();var b = this._getSeconds(a);this._player._hls || (this._player.seek(b), this._player.play()), this._updateProgressBar(this.playedNode, b), this._updateCursorPosition(b);
            }, _onTimeupdate: function _onTimeupdate(a) {
                this._updateProgressBar(this.playedNode, this._player.getCurrentTime()), this._updateCursorPosition(this._player.getCurrentTime()), this._player.trigger(k.Private.UpdateProgressBar, { time: this._player.getCurrentTime() });
            }, _onProgress: function _onProgress(a) {
                this._player.getDuration() && this._player.getBuffered().length >= 1 && this._updateProgressBar(this.loadedNode, this._player.getBuffered().end(this._player.getBuffered().length - 1));
            }, _updateProgressBar: function _updateProgressBar(a, b) {
                if (1 != this._player._switchSourcing) {
                    var c = this._player.getDuration() ? b / this._player.getDuration() + .005 : 0;c > 1 && (c = 1), a && e.css(a, "width", 100 * c + "%");
                }
            }, _updateCursorPosition: function _updateCursorPosition(a) {
                if (1 != this._player._switchSourcing) {
                    var b = this._player.getDuration() ? a / this._player.getDuration() : 0,
                        c = 1,
                        d = this._player.el().clientWidth;0 != d && (c = 1 - 18 / d), this.cursorNode && (b > c ? (e.css(this.cursorNode, "right", "0px"), e.css(this.cursorNode, "left", "auto")) : (e.css(this.cursorNode, "right", "auto"), e.css(this.cursorNode, "left", 100 * b + "%")));
                }
            } });b.exports = l;
    }, { "../../lang/index": 16, "../../lib/dom": 22, "../../lib/event": 23, "../../lib/function": 24, "../../lib/ua": 31, "../../lib/util": 33, "../../player/base/event/eventtype": 38, "../component": 80 }], 92: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../lib/dom"),
            f = a("../../lib/util"),
            g = (a("../../lang/index"), a("../../player/base/event/eventtype")),
            h = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.addClass(b.className || "prism-snapshot-btn");
            }, createEl: function createEl() {
                return d.prototype.createEl.call(this, "div");
            }, bindEvent: function bindEvent() {
                var a = this;this._player.on(g.Private.Snapshot_Hide, function () {
                    e.css(a._el, "display", "none");
                }), this.on("click", function () {
                    a.trigger(g.Player.Snapshoting);var b = document.createElement("canvas"),
                        c = a._player.tag,
                        d = c.videoWidth,
                        e = c.videoHeight,
                        h = a._player._getSanpshotMatric();b.width = h.width || d, b.height = h.height || e;var j = a._player.getCurrentTime(),
                        k = b.getContext("2d");k.save();var l = a._player.getImage();"vertical" == l ? (k.translate(0, b.height), k.scale(1, -1)) : "horizon" == l && (k.translate(b.width, 0), k.scale(-1, 1)), k.drawImage(c, 0, 0, d, e), k.restore(), i(k, a._player.getOptions());var m = "",
                        n = "";try {
                        var m = b.toDataURL("image/jpeg", h.rate || 1);
                    } catch (a) {
                        n = a;
                    }var o = "",
                        p = "",
                        q = "";m && (o = m, p = o.substr(o.indexOf(",") + 1), q = f.toBinary(p)), a.trigger(g.Player.Snapshoted, { time: j, base64: o, binary: q, error: n });
                });
            } }),
            i = function i(a, b) {
            var c = b.snapshotWatermark;c && c.text && (a.font = c.font, c.fillColor && (a.fillStyle = c.fillColor, a.fillText(c.text, c.left, c.top)), c.strokeColor && (a.strokeStyle = c.strokeColor, a.strokeText(c.text, c.left, c.top)), a.stroke());
        };b.exports = h;
    }, { "../../lang/index": 16, "../../lib/dom": 22, "../../lib/util": 33, "../../player/base/event/eventtype": 38, "../component": 80 }], 93: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../lib/object"),
            f = a("../../lib/util"),
            g = (a("../../lib/cookie"), a("../../lib/dom")),
            h = a("../../lib/event"),
            i = a("../../lib/constants"),
            j = a("../../lang/index"),
            k = a("../../player/base/event/eventtype"),
            l = d.extend({ init: function init(a, b) {
                this._hasGeneratedList = !1, this._previousSelection = null, this._isShown = !1, d.call(this, a, b), this.className = b.className ? b.className : "prism-speed-selector", this.addClass(this.className);
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this, "div");return a.innerHTML = '<div class="current-speed-selector" key="1">' + j.get("Speed_Text") + '</div><ul class="speed-selector-list"></ul>', a;
            }, bindEvent: function bindEvent() {
                var a = this,
                    b = document.querySelector("#" + a.id() + "  .current-speed-selector"),
                    c = document.querySelector("#" + a.id() + " .speed-selector-list"),
                    d = function d() {
                    g.css(c, "display", "none"), a._isShown = !1;
                };h.on(c, "mouseleave", function () {
                    d();
                }), h.on(c, "mouseenter", function () {
                    g.css(c, "display", "block"), a._isShown = !0;
                }), h.on(b, "mouseleave", function () {
                    setTimeout(function () {
                        a._isShown || g.css(c, "display", "none");
                    }), a._isShown = !1;
                }), this._player.on(k.Private.SpeedSelectorHide, function () {
                    d();
                }), h.on(b, "click", function () {
                    if (a._hasGeneratedList) g.css(c, "display", 0 == a._isShown ? "block" : "none"), a._isShown = !a._isShown, a._isShown && a._player.trigger(k.Private.StreamSelectorHide);else {
                        var d = i.SpeedLevels;e.each(d, function (d, e) {
                            var f = g.createEl.call(a, "li", { key: d.key, text: d.text });b.getAttribute("key") == d.key && (g.addClass(f, "current"), a._previousSelection = f);var h = g.createEl.call(a, "span", { key: d.key, text: d.text });h.innerText = d.text, f.appendChild(h), c.appendChild(f);
                        }), a._hasGeneratedList = !0, g.css(c, "display", "block"), a._player.trigger(k.Private.StreamSelectorHide);
                    }
                }), h.on(c, "click", function (b) {
                    var d = b.srcElement ? b.srcElement : b.target,
                        e = d.key,
                        h = d.text;if (void 0 !== h) {
                        a._previousSelection && g.removeClass(a._previousSelection, "current"), a._previousSelection = d, g.addClass(d, "current"), a._player.setSpeed(e), f.delayHide(c);var i = j.get("Speed_Switch_To") + "<span>" + h + "</span>";a._player.trigger(k.Private.Info_Show, { text: i, duration: 1e3, align: "lb" });
                    }
                });
            } });b.exports = l;
    }, { "../../lang/index": 16, "../../lib/constants": 19, "../../lib/cookie": 20, "../../lib/dom": 22, "../../lib/event": 23, "../../lib/object": 27, "../../lib/util": 33, "../../player/base/event/eventtype": 38, "../component": 80 }], 94: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../lib/object"),
            f = a("../../lib/util"),
            g = a("../../lib/cookie"),
            h = a("../../lib/dom"),
            i = a("../../lib/event"),
            j = a("../../lib/constants"),
            k = a("../../lang/index"),
            l = a("../../player/base/event/eventtype"),
            m = d.extend({ init: function init(a, b) {
                this._hasGeneratedList = !1, this._previousSelection = null, this._isShown = !1, d.call(this, a, b), this.className = b.className ? b.className : "prism-stream-selector", this.addClass(this.className);
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this, "div");return a.innerHTML = '<div class="current-stream-selector">' + k.get("SD") + '</div><ul class="stream-selector-list"></ul>', a;
            }, showTip: function showTip(a, b) {
                this._player.trigger(l.Private.Info_Show, { text: a, duration: b, align: "lb" });
            }, bindEvent: function bindEvent() {
                var a = this,
                    b = document.querySelector("#" + a.id() + "  .current-stream-selector"),
                    c = document.querySelector("#" + a.id() + " .stream-selector-list"),
                    d = function d() {
                    h.css(c, "display", "none"), a._isShown = !1;
                };i.on(c, "mouseleave", function () {
                    d();
                }), this._player.on(l.Private.StreamSelectorHide, function () {
                    d();
                }), i.on(c, "mouseenter", function () {
                    h.css(c, "display", "block"), a._isShown = !0;
                }), i.on(b, "mouseleave", function () {
                    setTimeout(function () {
                        a._isShown || h.css(c, "display", "none");
                    }), a._isShown = !1;
                }), this._player.on(l.Private.QualityChange, function (b) {
                    var c = document.querySelectorAll("#" + a.id() + " .stream-selector-list li"),
                        d = "",
                        e = "";if (c.length > a._player._currentPlayIndex) {
                        var f = c[a._player._currentPlayIndex];d = k.get("Quality_The_Url"), a._previousSelection && (h.removeClass(a._previousSelection, "current"), d = a._previousSelection.text), h.addClass(f, "current"), e = f.text;document.querySelector("#" + a.id() + " .current-stream-selector").innerText = e, a._previousSelection = f;
                    } else if (a._player._currentPlayIndex > 0) {
                        var g = a._player._urls,
                            i = a._player._currentPlayIndex;d = g[i - 1].desc, e = g[i].desc;
                    }a.showTip(d + b.paramData + e, 1e3);
                }), this._player.on(l.Private.SourceLoaded, function (b) {
                    var c = b.paramData.desc,
                        d = document.querySelector("#" + a.id() + " .current-stream-selector");d.innerText = c, h.css(d, "display", "block");
                }), i.on(b, "click", function () {
                    if (a._hasGeneratedList) h.css(c, "display", 0 == a._isShown ? "block" : "none"), a._isShown = !a._isShown, a._isShown && a._player.trigger(l.Private.SpeedSelectorHide);else {
                        var b = a._player._urls;b.length > 1 && e.each(b, function (b, d) {
                            var e = h.createEl.call(a, "li", { url: b.Url, index: d, text: b.desc });a._player._currentPlayIndex == d && (h.addClass(e, "current"), a._previousSelection = e);var f = h.createEl.call(a, "span", { url: b.Url, index: d, text: b.desc });f.innerText = b.desc, e.appendChild(f), c.appendChild(e), a._hasGeneratedList = !0, h.css(c, "display", "block"), a._player.trigger(l.Private.SpeedSelectorHide);
                        });
                    }
                }), i.on(c, "click", function (b) {
                    var d = b.srcElement ? b.srcElement : b.target,
                        e = d.url,
                        i = d.index,
                        l = d.text;if (void 0 !== l) {
                        a._player._switchSourcing = !0, a._previousSelection && h.removeClass(a._previousSelection, "current"), a._previousSelection = d, h.addClass(d, "current"), a._player._currentPlayIndex = i, g.set(j.SelectedStreamLevel, a._player._urls[i].definition, 365), a._player._urls.length > i && (e = a._player._urls[i].Url);document.querySelector("#" + a.id() + " .current-stream-selector").innerText = l, a._player.loadByUrl(e, a._player.getCurrentTime(), !a._player.paused()), h.css(c, "display", "none"), a._isShown = !1, a.showTip(k.get("Quality_Change_Text") + "<span>" + l + "</span>", 2e3), setTimeout(function () {
                            a._player._switchSourcing = !1;
                        }), f.delayHide(c);
                    }
                });
            } });b.exports = m;
    }, { "../../lang/index": 16, "../../lib/constants": 19, "../../lib/cookie": 20, "../../lib/dom": 22, "../../lib/event": 23, "../../lib/object": 27, "../../lib/util": 33, "../../player/base/event/eventtype": 38, "../component": 80 }], 95: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../lib/util"),
            f = a("../../player/base/event/eventtype"),
            g = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.className = b.className ? b.className : "prism-time-display", this.addClass(this.className);
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this, "div");return a.innerHTML = '<span class="current-time">00:00</span> <span class="time-bound">/</span> <span class="duration">00:00</span>', a;
            }, bindEvent: function bindEvent() {
                var a = this;this._player.on(f.Video.DurationChange, function () {
                    var b = e.formatTime(a._player.getDuration());b ? (document.querySelector("#" + a.id() + " .time-bound").style.display = "inline", document.querySelector("#" + a.id() + " .duration").style.display = "inline", document.querySelector("#" + a.id() + " .duration").innerText = b) : (document.querySelector("#" + a.id() + " .duration").style.display = "none", document.querySelector("#" + a.id() + " .time-bound").style.display = "none");
                }), this._player.on(f.Video.TimeUpdate, function () {
                    var b = e.formatTime(a._player.getCurrentTime());document.querySelector("#" + a.id() + " .current-time") && (b ? (document.querySelector("#" + a.id() + " .current-time").style.display = "inline", document.querySelector("#" + a.id() + " .current-time").innerText = b) : document.querySelector("#" + a.id() + " .current-time").style.display = "none");
                });
            } });b.exports = g;
    }, { "../../lib/util": 33, "../../player/base/event/eventtype": 38, "../component": 80 }], 96: [function (a, b, c) {
        var d = a("../component"),
            e = a("../../lib/dom"),
            f = a("../../lib/event"),
            g = a("../../player/base/event/eventtype"),
            h = d.extend({ init: function init(a, b) {
                d.call(this, a, b), this.addClass(b.className || "prism-volume"), this._shown = !1;
            }, createEl: function createEl() {
                var a = d.prototype.createEl.call(this, "div");return a.innerHTML = '<div class="volume-icon"></div> <div class="volume-control"><div class="volume-range"><div class="volume-value"></div><div class="volume-cursor"></div></div><div class="volume-control-icon"></div></div>', a;
            }, bindEvent: function bindEvent() {
                var a = this;this.icon = document.querySelector("#" + a.id() + "  .volume-icon"), this.controlicon = document.querySelector("#" + a.id() + "  .volume-control-icon"), this.control = document.querySelector("#" + a.id() + "  .volume-control"), this.volumnValue = document.querySelector("#" + a.id() + "  .volume-value"), this.volumnRange = document.querySelector("#" + a.id() + "  .volume-range"), this.volumnCursor = document.querySelector("#" + a.id() + "  .volume-cursor"), f.on(this.control, "mouseenter", function () {
                    e.css(a.control, "display", "block"), a._shown = !0;
                }), f.on(this.icon, "mouseleave", function () {
                    setTimeout(function () {
                        a._shown || e.css(a.control, "display", "none");
                    }), a._shown = !1;
                }), f.on(this.icon, "click", function () {
                    if (a._shown) e.css(a.control, "display", "none"), a._shown = !1;else {
                        var b = a._player.getVolume();a._setVolumnUI(b), e.css(a.control, "display", "block"), a._shown = !0;
                    }
                }), f.on(this.volumnRange, "click", function (b) {
                    var c = a._getPosition(b).toFixed(2);c < 0 && (c = 0), c > 1 && (c = 1), a._setVolumnUI(c), a._setMuteUI(c), a._player.setVolume(c);
                }), f.on(this.controlicon, "click", function (b) {
                    a._player.muted() ? a._player.unMute() : a._player.mute();
                }), f.on(this.volumnCursor, "mousedown", function (b) {
                    a._onMouseDown(b);
                }), f.on(this.volumnCursor, "touchstart", function (b) {
                    a._onMouseDown(b);
                }), this._player.on(g.Private.VolumnChanged, function (b) {
                    var c = b.paramData;c > -1 && a._setVolumnUI(c), a._setMuteUI(c);
                }), f.on(this.control, "mouseleave", function () {
                    e.css(a.control, "display", "none"), a._shown = !1;
                }), f.on(this.control, "mouseover", function () {
                    e.addClass(a.control, "hover");
                }), a._rangeBottom = a._getBottom();
            }, _getBottom: function _getBottom() {
                if (window.getComputedStyle) {
                    var a = window.getComputedStyle(this.volumnRange, null).getPropertyValue("bottom");return parseFloat(a);
                }return 26;
            }, _onMouseDown: function _onMouseDown(a) {
                var b = this;a.preventDefault(), f.on(this.control, "mousemove", function (a) {
                    b._onMouseMove(a);
                }), f.on(this.control, "touchmove", function (a) {
                    b._onMouseMove(a);
                }), f.on(this._player.tag, "mouseup", function (a) {
                    b._onMouseUp(a);
                }), f.on(this._player.tag, "touchend", function (a) {
                    b._onMouseUp(a);
                }), f.on(this.control, "mouseup", function (a) {
                    b._onMouseUp(a);
                }), f.on(this.control, "touchend", function (a) {
                    b._onMouseUp(a);
                });
            }, _onMouseUp: function _onMouseUp(a) {
                var b = this;a.preventDefault(), b._offEvent();var c = (this.volumnValue.offsetHeight / this.volumnRange.offsetHeight).toFixed(2);this._player.setVolume(c), this._setMuteUI(c);
            }, _onMouseMove: function _onMouseMove(a) {
                a.preventDefault();var b = this._getPosition(a);b < 0 && (b = 0), b > 1 && (b = 1), this._setVolumnUI(b);
            }, _getPosition: function _getPosition(a) {
                for (var b = this.el(), c = 0; b = b.offsetParent;) {
                    c += b.offsetTop;
                }return (c - (a.touches ? a.touches[0].pageY : a.pageY) - this._rangeBottom) / this.volumnRange.offsetHeight;
            }, _offEvent: function _offEvent() {
                f.off(this._player.tag, "mouseup"), f.off(this._player.tag, "touchend"), f.off(this.control, "mousemove"), f.off(this.control, "touchmove"), f.off(this.control, "mouseup"), f.off(this.control, "touchend");
            }, _setMuteUI: function _setMuteUI(a) {
                isNaN(a) || (0 == a || -1 == a ? (e.addClass(this.icon, "mute"), e.addClass(this.controlicon, "mute")) : (e.removeClass(this.icon, "mute"), e.removeClass(this.controlicon, "mute")));
            }, _setVolumnUI: function _setVolumnUI(a) {
                isNaN(a) || (e.css(this.volumnValue, "height", 100 * a + "%"), 1 == a && (a = .99), e.css(this.volumnCursor, "bottom", 100 * a + "%"));
            } });b.exports = h;
    }, { "../../lib/dom": 22, "../../lib/event": 23, "../../player/base/event/eventtype": 38, "../component": 80 }], 97: [function (a, b, c) {
        b.exports = { H5Loading: a("./component/h5-loading"), bigPlayButton: a("./component/big-play-button"), controlBar: a("./component/controlbar"), progress: a("./component/progress"), playButton: a("./component/play-button"), liveDisplay: a("./component/live-display"), timeDisplay: a("./component/time-display"), fullScreenButton: a("./component/fullscreen-button"), volume: a("./component/volume"), streamButton: a("./component/stream-selector"), speedButton: a("./component/speed-selector"), snapshot: a("./component/snapshot"), errorDisplay: a("./component/error-display"), infoDisplay: a("./component/info-display"), liveShiftProgress: a("../commonui/liveshiftprogress"), liveShiftTimeDisplay: a("../commonui/livetimedisplay") };
    }, { "../commonui/liveshiftprogress": 8, "../commonui/livetimedisplay": 9, "./component/big-play-button": 81, "./component/controlbar": 82, "./component/error-display": 84, "./component/fullscreen-button": 85, "./component/h5-loading": 86, "./component/info-display": 87, "./component/live-display": 88, "./component/play-button": 90, "./component/progress": 91, "./component/snapshot": 92, "./component/speed-selector": 93, "./component/stream-selector": 94, "./component/time-display": 95, "./component/volume": 96 }] }, {}, [11]);