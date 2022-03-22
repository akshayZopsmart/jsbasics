function mergeSort(numberArray){
    if (numberArray.length < 2) 
        return numberArray;

    let mid   = Math.floor(numberArray.length/2);
    let left  = numberArray.slice(0,mid);
    let right = numberArray.slice(mid);
    
    function merge(left,right) {
        let result = [],lLen = left.length, rLen = right.length, l = 0, r = 0;
        while(l < lLen && r < rLen){
            if(left[l] < right[r]){
                result.push(left[l++]);
            }
            else{
                result.push(right[r++]);
            }
        }  
        return result.concat(left.slice(l)).concat(right.slice(r));
    }

   return merge(mergeSort(left),mergeSort(right));
}

let numberArray = [1,5,2,8,77,443,6];
console.log(mergeSort(numberArray));