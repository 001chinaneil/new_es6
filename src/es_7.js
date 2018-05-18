//第七节 ES6的数组操作(1)
console.log("ES6的数组操作(1)");

//JSON数组格式转换  Array.from();
let json = {
    "0": "jspang",
    "1": "技术派",
    "2": "张国彪",
    length: 3 //多了这么个属性
}
let es7_arr = Array.from(json);
console.log(es7_arr);

//把文本或字符串转换成变量 Array.of();
let es7_arr1 = Array.of(2,8,9,20,48);
let es7_arr2 = Array.of("技术派","技术牛","狮虎","十几户");
console.log(es7_arr1,es7_arr2);

//find()实例方法 传入一个匿名函数
let es7_arr3 = [1,2,3,4,5,6,7,8,9];
console.log(es7_arr3.find(function(value,index,arr){
    return value > 7;
}));


