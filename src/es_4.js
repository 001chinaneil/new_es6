//第四节 扩展运算符和rest运算符
/*
let arr1 = [1,12,34,45];
let arr2 = arr1;
console.log(arr2);
arr2.push(78);
console.log(arr1);//希望是不变的
*/

/*
let arr1 = [1,34,43,89];
let arr2 = [...arr1];
console.log(arr2);
arr2.push(90);
console.log(arr1);
console.log(arr2);
*/

let arr = [1,34,32,45,35,53,67,89];//8个
function conArr(first,...arr){
    console.log(arr);
    for(let val of arr){
        console.log(val);
    }
}
conArr(1,34,32,45,35,53,67,89);



