function binarySearch(numberArray,left,right,target){
    while(left <= right){
        let mid = (left + right) >> 1;
        if(numberArray[mid] === target){
            return mid;
        }else if(numberArray[mid] > target){
            right = mid - 1;
        }else{
            left = mid + 1;
        }
    }

    return -1;
}

let numberArray = [1,3,6,9,12,15];
let target = 9;
let index = binarySearch(numberArray,0,numberArray.length - 1,target);

console.log(index);