//第十一节 ES6中的对象
console.log("第十一节 ES6中的对象");

//对象赋值 ES6允许直接把声明的变量赋值给对象
let es11_a = '技术派';
let es11_b = 'jspang';
let es11_obj = {es11_a,es11_b};
console.log(es11_obj);

//对象KEY值构建
let es11_key = "jspang";
let es11_obj2 = {
    [es11_key]: "web"
}
console.log(es11_obj2.jspang);

//自定义对象方法: 就是把对象中的属性，用匿名函数的形式编写方法
let es11_obj3 = {
    add: function(a,b){
        console.log(a+b);
    }
}
es11_obj3.add(1,87);

//Object.is() 对象值的比较 ===为同值相等，is()为严格相等
let es11_obj4 = {
    name: "jspang"
}
let es11_obj5 = {
    name: "jspang"
}
console.log(Object.is(es11_obj4.name,es11_obj5.name));

//Object.assign() 合并对象
let es11_obj6 = {
    a: "1"
}
let es11_obj7 = {
    b: "3"
}
let es11_obj8 = {
    c: "4"
}
console.log(Object.assign(es11_obj6,es11_obj7,es11_obj8));