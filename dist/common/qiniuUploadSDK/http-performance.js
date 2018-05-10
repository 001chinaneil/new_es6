'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @license httpPerformance v1.0.0
 * License: MIT
 * author: luoyeshu0507
 *
 * @description
 *
 * This object provides a utility for detailing the http request performance
 *
 */
;(function (window, undefined) {
  'use strict';

  var p = window.performance;
  var httpPerformance = {
    clear: function clear() {

      p.clearMarks && p.clearMarks();
      p.clearMeasures && p.clearMeasures();
      p.clearResourceTimings && p.clearResourceTimings();
    },
    getAll: function getAll() {
      var performanceArr = [];
      p.getEntries().forEach(function (item) {
        performanceArr.push(httpPerformance.formatPerformance(item));
      });
      return performanceArr;
    },
    getByName: function getByName(name) {
      var performanceArr = [];
      p.getEntriesByName(name).forEach(function (item) {
        performanceArr.push(httpPerformance.formatPerformance(item));
      });
      return performanceArr;
    },
    formatPerformance: function formatPerformance(prt) {
      // PerformanceResourceTiming
      return {
        redirect: prt.redirectEnd - prt.redirectStart,
        domainLookup: prt.domainLookupEnd - prt.domainLookupStart,
        connect: prt.connectEnd - prt.connectStart,
        request: prt.responseStart - prt.requestStart,
        response: prt.responseEnd - prt.responseStart,

        entryType: prt.entryType,
        initiatorType: prt.initiatorType,
        name: prt.name,
        duration: prt.duration
      };
    }
  };

  // support AMD and CMD
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = httpPerformance;
  } else if (typeof define === 'function' && _typeof(define.amd) === 'object' && define.amd) {
    define('httpPerformance', [], function () {
      return httpPerformance;
    });
  } else {
    window.httpPerformance = httpPerformance;
  }
})(window);