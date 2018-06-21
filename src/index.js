//笔记
//第三节 变量的解构
/*
* 1.✨ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这称为解构。
* 2.解构讲究位置一一对应，eg: let [a,[b,c],c] = [1,[2,3],4];
* 3.undefind代表是什么也没有，null代表值就是null。
* 4.解构的默认值: eg: let [a,b='技术派'] = ['neil'];
* 5.✨对象的解构赋值不是按次序，而是按属性名，数组的解耦赋值是按次序。
* 6.坑: 在对象的解构赋值中，如果变量提前已经声明，需要使用()包裹对象解构，而数组解构不用。
* eg: let a; ({a} = {a:'Hello'});
* 7.字符串解构，把字符串解构成类似于数组，eg: let [a,b,c] = 'zgb'; 打印出z g b
* * */

//第四节 扩展运算符 与 rest运算符
/*
* 1.对象数组扩展运算符: 数组直接的赋值，可以避免引用内容堆栈的使用，eg: let arr2 = [...arr1]
* 2.rest扩展运算符 eg:
* function conArr(first,...arr){
*      for(let val of arr){
*        console.log(val);//2 3 4 5 6
*      }
* }
* conArr(1,2,3,4,5,6);
* */

//第五节 字符串模板
/*
* 1.拼接功能
*   let a = '中国'; let list = `我是${a}人`;
* 2.查找功能
*   let a = '中国'; let list = `我是中国人`; console.log(list.includes(a)); //true
* 3.开始查找
*   let a = '我'; let list = `我是中国人`; console.log(list.startsWith(a)); //true
* 4.结尾查找
*   let a = '我'; let list = `我是中国人`; console.log(list.endsWith(a)); //false
* 5.复制字符串
*   let a = '我是中国人'; console.log(a.repeat(3)); //重复三次
* 6.运算功能
*   let a = 1; let b = 2; let result = `${a+b}`; console.log(result); //3
* */

//第六节 ES6数字操作
/*
* 1.声明二级制、八进制数字
*   let 0b101010; //二进制
*   let 0o101010; //八进制
* 2.数字判断(不管数字是整型还是浮点型都返回true，否则返回false。)
*   Number.isFinite();
* 3.NaN验证
*   Number.isNaN();
* 4.判断是否为整数
*   Number.isInteger();
* 5.整数和浮点数转换
*   Number.parseInt();    Number.parseFloat();
* 6.安全整数: Number.MAX_SAFE_INTEGER    Number.MIN_SAFE_INTEGER
* 7.判断是否是安全整数:Number.isSafeInteger();
* */

//第七节 ES6的数组操作(1)
/*
* 1.Array.from() 把json格式数据转换为数组，特殊的是多了一个属性 length: xxx
* 2.Array.of()  把字符串或文本转换为数组
* 3.find()实例方法  可以传入一个匿名函数
* eg: arr.find(function(value,index,arr){});
* */

//第八节 ES6的数组操作(2)
/*
* 1.fill()填充实例方法 接受三个参数(填充值，开始位置，结束位置)(闭区间)从开始位置到结束位置，原数组内容被替代。
* 2.for of 循环遍历  eg: for(let item of arr){}
* 3.for of 循环遍历带索引 keys() eg: for(let index of arr.keys()){}
* 4.for of 循环遍历需要索引和内容 entries() eg: for( let [index,val] of arr.entries() ){}
* 5.entries() 生成的迭代器形式的数组 eg: let arr_list = arr.entries(); arr_list.next().value
* */

//第九节 ES6的箭头函数和拓展
/*
* 1.ES6默认函数增加了参数默认值的写法，如果后面调用函数时，传入的参数会覆盖默认参数值。
* eg: function add(a,b=1){}
* 2.主动抛出错误: throw new Error(); 这也是Vue框架内部的抛出错误的用法。
* 3.函数中的严格模式不能和函数参数默认值的用法一起使用，会报错的。
* 4.addFun.length 获取函数至少要传递的参数个数
* 5.箭头函数: (a,b)=>a+b;
* 当代码块大于2行时，必须要有花括号了
* eg: (a,b)=>{
*   console.log(a,b);
*   return a+b;
* }
* */

//第十节 ES6中的数组和函数 补漏
/*
* 1.对象的函数解构: 把json格式的数据传递进函数里面
* eg: function fun({a,b}){ }
* 2.数组的函数解构: 用...
* eg: function fun(a,b,c){}    fun(...arr);
* 3.in的用法: 判断对象和数组中是否有某个值
* eg: console.log( 'a' in obj );  //返回true 和 false。
* 4.数组判断是否为空: 0 in arr //返回true 和 false 。
* 5.数组的遍历方法: forEach() for( in ){}  for(  of ){}
*   forEach(val,index) 遍历数组: 会自动筛选掉为空的数组元素
*   for in 遍历对象
*   for of 遍历对象和数组 [最优]
* 6.filter() some() 都有循环的作用
* eg: arr.filter( x=>console.log(x) );
* 7.map() eg: arr.map(x=>'web'); 这里是替换作用
* 8.数组转换成字符串: join() eg: arr.join("|");
*   toString() 最后的字符串就是用逗号分隔的。
* */

//第十一节 ES6中的对象
/*
* 1.对象赋值: ES6允许直接把声明的变量直接赋值给对象
*   eg: let a = 1;let b=2; let obj = {a,b};
* 2.对象KEY构建:
*   eg: let a = 'web'; let obj = {
*       [a] = "neil"
*   }
*   console.log(obj.web);
* 3.自定义对象方法: 就是对象的属性用匿名函数的形式编写方法
*   eg: let obj = {
*       add: function(){}
*   }
* 4.✨Object.is(); 对象值的比较： ===是值相等，is()是严格相等
*   eg: Object.is(obj1.name,obj2.name);
* 5.Object.assign(); 合并对象
*   eg: Object.assign(obj1,obj2,obj3);
* */

//第十五节 用Proxy进行预处理: 钩子函数
/*
* 1.就是在正常处理前，进行处理前筛选，处理，钩子函数
* 2.get: 是对对象的属性进行获取操作前的钩子函数
*   eg: get: function(target,key,propery){
*   }
* 3.set: 是对对象的属性进行修改操作前的钩子函数
*   eg: set: function(tar){}
* 4.apply: 是对函数进行调用前的钩子函数
* */

//第十六节 Promise对象

//第十七节 class的使用
/*
* 1.类的声明和实例化: 类里面的方法直接没有逗号间隔，方法最后是return 值的，this才可以使用这个值。
* 2.使用类里面的方法，先要实例化这个类。
* 3.类的继承 eg: class htmler extends coder{}
* 4.类的传参: 固定使用constructor(a,b)传参，在实例化类的时候就传递进去
* */

//第十八节 import export的使用