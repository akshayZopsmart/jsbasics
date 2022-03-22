function palindrome(stringValue){
    let left = 0,right = stringValue.length - 1;
    while(left < right){
        if(stringValue.charAt(left) !== stringValue.charAt(right))
            return false;
        ++left;
        --right;
    }

    return true;
}

console.log(palindrome("abaa"));