function promise(value){
    return new Promise(function(resolve,reject){
        setTimeout(() => {
            if(value > 0){
                console.log(value);
                resolve(--value);
            }else{
                reject('Rejected');
            }
        });
    });
}

promise(10).
then((res) => promise(res)).
then((res) => promise(res)).
then((res) => promise(res)).
then((res) => promise(res)).
then((res) => promise(res)).
then((res) => promise(res)).
then((res) => promise(res)).
then((res) => promise(res)).
then((res) => promise(res)).
then((res) => promise(res)).
then((res) => promise(res)).
then((res) => promise(res)).
catch((err) => console.log(err));