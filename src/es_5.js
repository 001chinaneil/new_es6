//第五节 字符串模板
//拼接功能
let jspang = '技术胖123';
let blob = `我是通过${jspang}的教程，开始入门ES6编码的。`;
document.write(blob);

//运算功能
let a = 1;
let b = 2;
let result = `${ a+b }`;
document.write(result);

//查找功能
let zgb = '张国彪';
let list = '从大学毕业到现在，张国彪通过学习，已经成长了很多。';
document.write(list.includes(zgb));
document.write(blob.includes(jspang));
//开头是否存在
document.write(list.startsWith(zgb));
//结尾是否存在
document.write(list.endsWith(zgb));
//重复字符串
document.write('jspang.✨'.repeat(3));