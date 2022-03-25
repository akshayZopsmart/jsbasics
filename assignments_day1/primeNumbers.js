function getPrimeNUmberFromRange(range){
    for(let i = 2;i<=range;++i){
        if(checkPrime(i)){
            console.log(i);
        }
    }
}

function checkPrime(value){
    for(let i = 2;i * i<= value;++i){
        if(value % i === 0)
            return false;
    }
    return true;
}

getPrimeNUmberFromRange(50);