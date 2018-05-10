"use strict";

function flush(stack) {
  var len = stack.length;if (0 !== len) {
    for (var currentStack = stack.splice(0, len), deps = [], i = 0; len > i; i++) {
      deps = deps.concat(currentStack[i].resolve());
    }deps = getUnfetchedUris(deps);var mod = Module.get(data.cwd + "_flush_" + data.cid(), deps);mod.load = load, mod._entry.push(mod), mod.history = {}, mod.remain = 1, mod.callback = function () {
      for (var i = 0; len > i; i++) {
        currentStack[i].onload();
      }delete mod.callback, delete mod.history, delete mod.remain, delete mod._entry;
    }, mod.load();
  }
}function needLoadImmediately(mod) {
  return hasEmptyDependencies(mod) || isSavedBeforeRequest(mod) || isAsync(mod);
}function isSavedBeforeRequest(mod) {
  return !isLoadOnRequest && mod.status === Module.STATUS.SAVED;
}function hasEmptyDependencies(mod) {
  return 0 === mod.dependencies.length;
}function isAsync(mod) {
  return ASYNC_RE.test(mod.uri);
}function getUnfetchedUris(uris) {
  for (var uri, ret = [], hash = {}, i = 0, len = uris.length; len > i; i++) {
    uri = uris[i], uri && !hash[uri] && (hash[uri] = !0, (!seajs.cache[uri] || seajs.cache[uri].status < Module.STATUS.SAVED) && ret.push(uri));
  }return ret;
}var Module = seajs.Module,
    load = Module.prototype.load,
    data = seajs.data,
    useStack = data.flushUseStack = [],
    depStack = data.flushDepStack = [],
    isLoadOnRequest = !1,
    isInUse = !1;Module.prototype.load = function () {
  var mod = this;needLoadImmediately(mod) ? load.call(mod) : isInUse ? useStack.push(mod) : depStack.push(mod);
}, seajs.use = function (ids, callback) {
  return isInUse = !0, Module.use(ids, callback, data.cwd + "_use_" + data.cid()), isInUse = !1, seajs;
}, seajs.flush = function () {
  flush(useStack);
}, seajs.on("request", function (data) {
  var onRequest = data.onRequest;data.onRequest = function () {
    isLoadOnRequest = !0, onRequest(), isLoadOnRequest = !1, flush(depStack);
  };
});var ASYNC_RE = /\.js_async_\d+$/;