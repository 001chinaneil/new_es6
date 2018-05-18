//第十三节 Set和WeakSet数据结构[重点: 是数据结构]
console.log("第十三节 Set和WeakSet数据结构");

//Set的数据结构是以数组的形式构建的。

// Set的声明 Set和Array的区别是Set不允许有重复的值，如果有只显示一个，相当于去重，
// 虽然Set很像数组，但是它不是数组
let es13_setArr = new Set(['jspang','技术派','web','neil',1,3,3,4]);
console.log(es13_setArr);

//Set值的增删查
//追加add();
es13_setArr.add('虎嗅');
console.log(es13_setArr);

//删除delete();
es13_setArr.delete("虎嗅");
console.log(es13_setArr);

//查找has(); 返回true和false;
console.log(es13_setArr.has('jspang'));

//清除clear();
// es13_setArr.clear();
console.log(es13_setArr);

//Set的循环
//for...of...
for(let item of es13_setArr){
    console.log(item);
}

//size属性
console.log(es13_setArr.size);

console.log('分割线---------------------------');

//forEach()循环 [✨for...of...  与 forEach() 的区别]
es13_setArr.forEach( (value)=>console.log(value) );

//WeakSet的声明 放置进去的是个对象变量 而且new WeakSet()里面不能放置数据
let es13_weakObj = new WeakSet();
let es13_obj1 = {
    a: "neil",
    b: "张国彪",
    c: "廊坊文安县"
}
// let es13_obj2 = es13_obj1;
es13_weakObj.add(es13_obj1);
// es13_weakObj.add(es13_obj2);
console.log(es13_weakObj);

/*
* forEach()遍历数组 中间过程不能使用break，return，continue
* eg: arr.forEach(function(value,index,arr){});
*
* for in遍历对象: 遍历键值对前面的key，
* 并且原型链上面的属性也会被遍历到(hasOwnProperty()方法去过滤掉原型链上的属性)
* eg: for(let item in obj){ }
*
* for of最优方案: 遍历键值对后面的value，中间过程可以使用break，return，continue
* for(let item of obj){ }
* */