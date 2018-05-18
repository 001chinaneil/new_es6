//第十节 ES6中的函数和数组 补漏
console.log("第十节 ES6中的函数和数组补漏");

//对象的函数解构 把json格式的数据当做参数 传递进函数里进行处理
let es10_json = {
    a: "jspangaaa",
    b: "技术胖bbb"
}
function fun({a,b='张国彪'}){
    console.log(a,b);
}
fun(es10_json);

//数组的函数解构 用...
let es10_arr = ['是贺岁片','拒收品','是少的'];
function fun1(a,b,c){
    console.log(a,b,c)
}
fun1(...es10_arr);

//in的用法 判断对象或数组中是否存在某个值
let es10_obj = {
    a: "jspang",
    b: "技术胖"
}
console.log('a' in es10_obj);
//数组是否为空的判断 0 这里指数组下标位置是否为空
let es10_arr1 = [,,,,,];
console.log(0 in es10_arr1);

let es10_arr2 = ['jspang',"及视频",'wer','sdfg'];
console.log(0 in es10_arr2);

//大分类: 数组的遍历方法
//1.forEach( (val,index) ) 会自动帮我们筛选掉为空的数组元素 值在前，索引在后
es10_arr2.forEach( (val,index) => {
    console.log(index);
    console.log(val);
});

//2.filter()
es10_arr2.filter(x=>console.log(x));

//3.some()
es10_arr2.some(x=>console.log(x));

//4.map() 在这里是个替换的作用
console.log(es10_arr2.map(x=>'web'));

//大分类: 数组转换成字符串
//1.join()方法
console.log(es10_arr2.join('|'));

//2.toString() 结果就是用逗号分隔了
console.log(es10_arr2.toString());