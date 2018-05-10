"use strict";

function isType(type) {
  return function (obj) {
    return {}.toString.call(obj) == "[object " + type + "]";
  };
}function isFunction(obj) {
  return "[object Function]" == {}.toString.call(obj);
}function request(url, callback, charset) {
  var isCSS = IS_CSS_RE.test(url),
      node = doc.createElement(isCSS ? "link" : "script");if (charset) {
    var cs = isFunction(charset) ? charset(url) : charset;cs && (node.charset = cs);
  }addOnload(node, callback, isCSS, url), isCSS ? (node.rel = "stylesheet", node.href = url) : (node.async = !0, node.src = url), currentlyAddingScript = node, baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node), currentlyAddingScript = null;
}function addOnload(node, callback, isCSS, url) {
  function onload() {
    node.onload = node.onerror = node.onreadystatechange = null, isCSS || seajs.data.debug || head.removeChild(node), node = null, callback();
  }var supportOnload = "onload" in node;return !isCSS || !isOldWebKit && supportOnload ? void (supportOnload ? (node.onload = onload, node.onerror = function () {
    seajs.emit("error", { uri: url, node: node }), onload();
  }) : node.onreadystatechange = function () {
    /loaded|complete/.test(node.readyState) && onload();
  }) : void setTimeout(function () {
    pollCss(node, callback);
  }, 1);
}function pollCss(node, callback) {
  var isLoaded,
      sheet = node.sheet;if (isOldWebKit) sheet && (isLoaded = !0);else if (sheet) try {
    sheet.cssRules && (isLoaded = !0);
  } catch (ex) {
    "NS_ERROR_DOM_SECURITY_ERR" === ex.name && (isLoaded = !0);
  }setTimeout(function () {
    isLoaded ? callback() : pollCss(node, callback);
  }, 20);
}function dirname(path) {
  return path.match(DIRNAME_RE)[0];
}function realpath(path) {
  for (path = path.replace(DOT_RE, "/"), path = path.replace(MULTI_SLASH_RE, "$1/"); path.match(DOUBLE_DOT_RE);) {
    path = path.replace(DOUBLE_DOT_RE, "/");
  }return path;
}function normalize(path) {
  var last = path.length - 1,
      lastC = path.charAt(last);return "#" === lastC ? path.substring(0, last) : ".js" === path.substring(last - 2) || path.indexOf("?") > 0 || ".css" === path.substring(last - 3) || "/" === lastC ? path : path + ".js";
}function parseAlias(id) {
  var alias = data.alias;return alias && isString(alias[id]) ? alias[id] : id;
}function parsePaths(id) {
  var m,
      paths = data.paths;return paths && (m = id.match(PATHS_RE)) && isString(paths[m[1]]) && (id = paths[m[1]] + m[2]), id;
}function parseVars(id) {
  var vars = data.vars;return vars && id.indexOf("{") > -1 && (id = id.replace(VARS_RE, function (m, key) {
    return isString(vars[key]) ? vars[key] : m;
  })), id;
}function parseMap(uri) {
  var map = data.map,
      ret = uri;if (map) for (var i = 0, len = map.length; len > i; i++) {
    var rule = map[i];if (ret = isFunction(rule) ? rule(uri) || uri : uri.replace(rule[0], rule[1]), ret !== uri) break;
  }return ret;
}function addBase(id, refUri) {
  var ret,
      first = id.charAt(0);if (ABSOLUTE_RE.test(id)) ret = id;else if ("." === first) ret = realpath((refUri ? dirname(refUri) : data.cwd) + id);else if ("/" === first) {
    var m = data.cwd.match(ROOT_DIR_RE);ret = m ? m[0] + id.substring(1) : id;
  } else ret = data.base + id;return 0 === ret.indexOf("//") && (ret = location.protocol + ret), ret;
}function id2Uri(id, refUri) {
  if (!id) return "";id = parseAlias(id), id = parsePaths(id), id = parseVars(id), id = normalize(id);var uri = addBase(id, refUri);return uri = parseMap(uri);
}function getScriptAbsoluteSrc(node) {
  return node.hasAttribute ? node.src : node.getAttribute("src", 4);
}var isString = isType("String"),
    doc = document,
    head = doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement,
    baseElement = head.getElementsByTagName("base")[0],
    IS_CSS_RE = /\.css(?:\?|$)/i,
    currentlyAddingScript,
    interactiveScript,
    isOldWebKit = +navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/?(\d+).*/i, "$1") < 536;seajs.request = request;var data = seajs.data,
    DIRNAME_RE = /[^?#]*\//,
    DOT_RE = /\/\.\//g,
    DOUBLE_DOT_RE = /\/[^/]+\/\.\.\//,
    MULTI_SLASH_RE = /([^:/])\/+\//g,
    PATHS_RE = /^([^/:]+)(\/.+)$/,
    VARS_RE = /{([^{]+)}/g,
    ABSOLUTE_RE = /^\/\/.|:\//,
    ROOT_DIR_RE = /^.*?\/\/.*?\//,
    doc = document,
    cwd = location.href && 0 !== location.href.indexOf("about:") ? dirname(location.href) : "",
    scripts = doc.scripts,
    loaderScript = doc.getElementById("seajsnode") || scripts[scripts.length - 1],
    loaderDir = dirname(getScriptAbsoluteSrc(loaderScript) || cwd);seajs.resolve = id2Uri;