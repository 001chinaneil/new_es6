//第十二节 Symbol在对象中的作用 [全局标记]
console.log("第十二节 Symbol在对象中的作用");

var es12_a = new String;
var es12_b = new Number;
var es12_c = new Boolean;
var es12_d = new Array;
var es12_e = new Object;
let es12_f = Symbol();
console.log(typeof(es12_d));

let es12_g = Symbol('jspang');
console.log(es12_g,"是红色");
console.log(es12_g.toString(),"是黑色");

var es12_jspang = Symbol();
var es12_obj={
    [es12_jspang]:'技术胖'
}
console.log(es12_obj[es12_jspang]);
es12_obj[es12_jspang]='web';
console.log(es12_obj[es12_jspang]);

var obj={name:'jspang',skill:'web',age:18};

for (let item in obj){
    console.log(obj[item]);
}

let es12_obj1={name:'jspang',skill:'web'};
let age=Symbol();
es12_obj1[age]=18;
for (let item in es12_obj1){
    console.log(es12_obj1[item]);
}
console.log(es12_obj1);

