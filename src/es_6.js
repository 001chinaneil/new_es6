//第六节 ES6数字操作
console.log('我是ES6 第六节内容');
//声明二进制数字
let bir = 0b101010;
console.log(bir);

//声明八进制数字
let oir = 0o101010;
console.log(oir);

//数字判断(Number.isFinite();只要是数字，不管是整数型还是浮点型都返回true，否则返回false。)
let es6_a = 2/3;
console.log(Number.isFinite(es6_a));

//NaN验证(Number.isNaN();)
let es6_b = NaN;
console.log(Number.isNaN(es6_b));

//判断是否为整数(Number.isInteger();)
let es_c = 23.4;
let es6_d = -10;
console.log(Number.isInteger(es_c));
console.log(Number.isInteger(es6_d));

//整数转换(Number.parseInt())和浮点数转换(Number.parseFloat())
let es6_e = '23.9';
console.log(Number.parseInt(es6_e));
console.log(Number.parseFloat(es6_e));

//整数的取值范围操作
let es6_f = Math.pow(2,53) - 1;
console.log(es6_f);

//最大安全整数 最小安全整数
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);

//安全整数判断(Number.isSafeInteger();)
let es6_g = Math.pow(2,54);
console.log(es6_g,Number.isSafeInteger(es6_g));

