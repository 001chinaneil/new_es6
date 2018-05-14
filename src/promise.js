//ES6 promise用法:
//1.
new promise(function (resolve,reject) {
    //如果成功 resolve(data);
    //如果失败 reject(error);
});
//2. 3种状态 pending  fulfilled rejected
//如果 Promise 状态已经变成resolved，再抛出错误是无效的。