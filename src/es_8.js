//第八节 ES6的数组操作(2)
console.log("ES6的数组操作(2)");

//fill() 填充实例方法 接受三个参数(填充值，开始位置，结束位置) 数组是从0开始计数索引的。
//从开始位置到结束位置的原数组内容别替代
let es8_arr = [1,2,3,4,5,6,7];
es8_arr.fill('jspang',2,5);
console.log(es8_arr);

//for of循环遍历
let es8_arr2 = ['jspang','技术派','学习'];
for(let item of es8_arr2){ //相比于 var i=0;i<es8_arr2.length;i++ 高效许多
    console.log(item);
}

//for of循环遍历 需要索引的情况 let index of arr.keys()
for(let index of es8_arr2.keys()){
    console.log(index);
}

//for of循环遍历 需要索引和内容额情况
for(let [index,val] of es8_arr2.entries()){
    console.log(index + ":" + val);
}

//entries() 实例方法 生成的迭代器形式的数组
let es8_list = es8_arr2.entries();
console.log(es8_list);
console.log(es8_list.next().value);
console.log(es8_list.next().value);
console.log(es8_list.next().value);
