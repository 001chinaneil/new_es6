"use strict";var _createClass=function(){function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,t,n){return t&&o(e.prototype,t),n&&o(e,n),e}}(),_es_=require("./es_18");function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}console.log("第十七节 class类的使用");var es17_coder=function(){function n(e,t){_classCallCheck(this,n),this.a=e,this.b=t}return _createClass(n,[{key:"name",value:function(e){return console.log(e),e}},{key:"skill",value:function(e){console.log(this.name("I am neil")+"--skill:"+e)}}]),_createClass(n,[{key:"add",value:function(){return this.a+this.b}}]),n}(),es17_jspang=new es17_coder;es17_jspang.skill("web");var es17_htmler=function(e){function t(){return _classCallCheck(this,t),_possibleConstructorReturn(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return _inherits(t,es17_coder),t}(),es17_neil=new es17_htmler(10,20);es17_neil.name("----I am htmler----"),console.log(es17_neil.add()),console.log("----------------以下是es_18的内容-----------------"),console.log(_es_.es18_a);