"use strict";console.log("第十节 ES6中的函数和数组补漏");var es10_json={a:"jspangaaa",b:"技术胖bbb"};function fun(o){var n=o.a,r=o.b,s=void 0===r?"张国彪":r;console.log(n,s)}fun(es10_json);var es10_arr=["是贺岁片","拒收品","是少的"];function fun1(o,n,r){console.log(o,n,r)}fun1.apply(void 0,es10_arr);var es10_obj={a:"jspang",b:"技术胖"};console.log("a"in es10_obj);var es10_arr1=[,,,,,];console.log(0 in es10_arr1);var es10_arr2=["jspang","及视频","wer","sdfg"];console.log(0 in es10_arr2),es10_arr2.forEach(function(o,n){console.log(n),console.log(o)}),es10_arr2.filter(function(o){return console.log(o)}),es10_arr2.some(function(o){return console.log(o)}),console.log(es10_arr2.map(function(o){return"web"})),console.log(es10_arr2.join("|")),console.log(es10_arr2.toString());