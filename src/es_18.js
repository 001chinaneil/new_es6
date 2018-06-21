//第十八节 模块化操作 可以把变量、函数、对象进行模块化操作，提供外部调用接口，让外部进行引用。
console.log("第十八节 模块化操作");

// export 把模块输出操作
// import 把模块进入尽量
export let es18_a = 'jspang';

let es18_b = "zgb";
let es18_c = "neil";
let es18_d = "lnn";
export {es18_b,es18_c,es18_d}

export function add(a,b){
    console.log(a+b);
}

//改真实的变量名字  真实变量 as 改变后的变量[前后顺序不能弄倒哦]
let es18_e = "zgb";
let es18_f = "neil";
let es18_g = "lnn";
export {
    es18_e as x,
    es18_f as y,
    es18_g as z
}

//default 后面不能跟变量声明语句
let es18_h = "张国彪";
export default es18_h;

