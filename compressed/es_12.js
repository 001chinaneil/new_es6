"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function _defineProperty(e,o,n){return o in e?Object.defineProperty(e,o,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[o]=n,e}console.log("第十二节 Symbol在对象中的作用");var es12_a=new String,es12_b=new Number,es12_c=new Boolean,es12_d=new Array,es12_e=new Object,es12_f=Symbol();console.log(void 0===es12_d?"undefined":_typeof(es12_d));var es12_g=Symbol("jspang");console.log(es12_g,"是红色"),console.log(es12_g.toString(),"是黑色");var es12_jspang=Symbol(),es12_obj=_defineProperty({},es12_jspang,"技术胖");console.log(es12_obj[es12_jspang]),es12_obj[es12_jspang]="web",console.log(es12_obj[es12_jspang]);var obj={name:"jspang",skill:"web",age:18};for(var item in obj)console.log(obj[item]);var es12_obj1={name:"jspang",skill:"web"},age=Symbol();for(var _item in es12_obj1[age]=18,es12_obj1)console.log(es12_obj1[_item]);console.log(es12_obj1);