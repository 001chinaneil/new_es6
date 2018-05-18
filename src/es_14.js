//第十四节 Map数据结构
console.log("第十四节 map数据结构");

//Json和Map格式的对比: Map的效率和灵活性更好
let es14_json = {
    name: "neil",
    job: "web"
}
console.log(es14_json.name);

let es14_map = new Map();
es14_map.set(es14_json,'me');
console.log(es14_map);

es14_map.set("me",es14_json);
console.log(es14_map);

//Map的增删查
//取值get()
console.log(es14_map.get(es14_json));

//删除delete()
console.log(es14_map.delete(es14_json)); //删除成功返回true，否则返回false。
console.log(es14_map);

//size属性
console.log(es14_map.size);

//查找是否存在 has()
console.log(es14_map.has('jspang'));
console.log(es14_map.has('me'));

//清除所有元素
es14_map.clear();
console.log(es14_map);