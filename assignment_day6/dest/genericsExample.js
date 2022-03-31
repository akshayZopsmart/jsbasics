"use strict";
function genericFunction(argument) {
    let result = '';
    for (let value of argument) {
        result += `${value} `;
    }
    return result;
}
let array = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let obj = genericFunction([1, 3]);
console.log(obj);
