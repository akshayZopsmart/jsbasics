function genericFunction<T>(argument : T[]):string{
    let result: string = '';
    for(let value of argument){
        result += `${value} `;
    }
    return result;
}

let array: string[]= ['1','2','3','4','5','6','7','8','9'];
let obj = genericFunction<number>([1,3]);
console.log(obj);