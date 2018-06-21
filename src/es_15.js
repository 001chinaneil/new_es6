//第十五节 用Proxy进行预处理
console.log("第十五节 用Proxy进行预处理");

//定义对象的用法
let es15_obj = {
    add: function(num){
        return num+100;
    },
    name: "jsPang"
}
console.log(es15_obj.add(100));
console.log(es15_obj.name);

//使用Proxy对对象进行预处理
let es15_pro = new Proxy({
    add: function(num){
        return num + 10;
    },
    name: "Neil"
},{
    get: function(target,key,propery){
        console.log("在获取值之前进行一些处理");
        return target[key];
    },
    set: function(target,key,value,receiver){
        console.log("在改变值以前进行一些处理");
        return target[key] = value;
    },
    apply(target,ctx,args){
        console.log("在调用内部方法前进行一些处理");
        return Reflect.apply(...arguments);
    }
});
console.log(es15_pro.name);
es15_pro.name = "张国彪";
console.log(es15_pro.name);
console.log("-------------");
console.log(es15_pro.add(30));

let es15_target = function(){
    return 'I am neil';
}
let es15_handler = {
    apply(target,ctx,args){
        console.log("在调用内部方法之前进行一些处理");
        return Reflect.apply(...arguments);
    }
}
let es16_pro2 = new Proxy(es15_target,es15_handler);
console.log(es16_pro2());