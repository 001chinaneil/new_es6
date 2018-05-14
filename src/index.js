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