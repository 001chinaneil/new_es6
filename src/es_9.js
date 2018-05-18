//第九节 ES6中的箭头函数和扩展
console.log("第九节 ES6中的箭头函数和扩展");

//ES5写法
function add(a,b){
    return a + b;
};
console.log(add(1,2));

//ES6声明函数 增加了参数默认值的写法
function es6_add(a,b=1){
    return a + b;
}
console.log(es6_add(1,3));

//主动抛出错误 throw new Error(); 这也是尤雨溪写Vue框架时，抛出异常的写法。
function es6_add2(a,b=1) {
    if(a == 0){
        throw new Error("a不能为0");
    }
    return a + b;
}
// console.log(es6_add2(0));

//函数中的严格模式[不能和参数中的默认值用法一起使用]
function es6_add3(a,b){
    'use strict'
    if(a == 0){
        throw new Error("a不能为0");
    }
    return a + b;
}
console.log(es6_add3(1,2));

//获得必须需要传递的参数 arr.length
console.log(es6_add3.length);

//箭头函数
let es6_add4 = (a,b) => a+b;
console.log(es6_add4(1,89));

//箭头函数(多余2行代码的就要用{})
let es6_add5 = (a,b) => {
    console.log("是贺岁片");
    return a + b;
}
console.log(es6_add5(1,90));