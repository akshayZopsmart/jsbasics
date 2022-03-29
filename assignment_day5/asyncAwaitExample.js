function task(value){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(value > 0){
                console.log(value);
                resolve(--value);
            }else{
                reject('Rejected');
            }
        },1000);
    });
}

async function asyncFunction(){
    result = await task(10);
    result = await task(result);
    result = await task(result);
    result = await task(result);
    result = await task(result);
    result = await task(result);
    result = await task(result);
    result = await task(result);
    result = await task(result);
    result = await task(result);
    result = await task(result);
    console.log(result);
}

asyncFunction();