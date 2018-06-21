//第十七节 class类的使用
console.log("第十七节 class类的使用");

//类的声明和实例化: 类里面的方法直接没有逗号间隔，方法最后是return 值的，this才可以使用这个值。
//1使用类里面的方法，先要实例化这个类。
class es17_coder{
    name(val){
        console.log(val);
        return val;
    }
    skill(val){
        console.log(this.name("I am neil") + "--" + "skill:" + val);
    }
    constructor(a,b){
        this.a = a;
        this.b = b;
    }
    add(){
        return this.a + this.b;
    }
}

let es17_jspang = new es17_coder;
// es17_jspang.name("I am jspang");
es17_jspang.skill("web");

//2类的继承
class es17_htmler extends es17_coder{

}
let es17_neil = new es17_htmler(10,20);
es17_neil.name("----I am htmler----");

//3类的传参: 使用constructor()进行类的传参，实例化的时候传递给类
console.log( es17_neil.add() );

console.log("----------------以下是es_18的内容-----------------");
import {es18_a} from "./es_18";
console.log(es18_a);

import {es18_b,es18_c,es18_d} from "./es_18";
console.log(es18_b,es18_c,es18_d);

import {add} from "./es_18";
add(34,43);

import {x,y,z} from "./es_18";
console.log(x,y,z);

import str from "./es_18";
console.log(str);