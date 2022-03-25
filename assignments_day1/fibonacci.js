function fibonacci(value){
    if(value <= 1)
        return value;
    return fibonacci(value - 1) + fibonacci(value - 2);
}
console.log(fibonacci(9));