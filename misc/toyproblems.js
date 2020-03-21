/*
0. filterEvensPlusThree
Write a function called filterEvensPlusThree that accepts as an argument an array of integers. 
This function should first filter out all even integers, then add three to these odd integers and return the resulting array.
*/

function filterEvensPlusThree(arr) {
    var even = [];
    var odd = [];
    arr.forEach(function(elem) {
        if (elem % 2 === 0) even.push(elem);
        if (elem % 2 !== 0) odd.push(elem);
    });
    odd.forEach(function(n, i) {
        odd[i] = n+3;
    })
    return odd;
}
console.log(filterEvensPlusThree([2,7,4,6,1,12])); //=>[10, 4]

/*
1. reduceSum
Write a function called reduceSum that sums the elements in an array. You must use the reduce method to do this.
*/

function reduceSum(arr) {
    var reduceSum = arr.reduce(function(a, b) {
        return a+b;
    }, 0);
    return reduceSum;
}
console.log(reduceSum([1,2,3])); //=> 6

/*
2. getProductsOfAllIntsExceptAtIndex
Write a function called getProductsOfAllIntsExceptAtIndex. This function will be provided an array of integers in no particular order. 
For each index in the array find the product of every integer except the integer at that index.
*/

function getProductsOfAllIntsExceptAtIndex(arr) {
    var ans = [];
    arr.forEach(function(elem, idx) {
        var prodArray = arr.map(x => x);
        prodArray = arr.splice(idx, 1);
        console.log(prodArray);
        var prodNum = 1;
        for (var i=0; i<prodArray.length; i++) {
            prodNum = prodArray[i] * prodNum;
        };
        ans.push(prodNum);
    });
    return ans;
}
console.log(getProductsOfAllIntsExceptAtIndex([1, 7, 3, 4]));

// Exercise A1 (15 mins): Write an algorithm called sumDigits that takes a non-negative integer as input and returns the sum of the integers.
/*

input = 198

198 % 10 => 8
Math.floor(198/10) => 19

19 % 10 => 9
Math.floor(19/10) => 1

1 % 10 => 1
Math.floor(1/10) = 0

*/

function sumDigits(i) {
    // base case if i < 10;
    if (i < 10) {
        return i;
    }
    return i%10 + sumDigits(Math.floor(i/10));
}

console.log(sumDigits(198)); // 198 => 18

// Exercise A2 (15 minutes): Write an algorithm called pow that takes a number and raises it to a power. 
// For example pow(2,3) should return 8 because 2^3 = 2 * 2 * 2.

function pow(a, b) {
    if (b === 1) {
        return a;
    }
    return a * pow(a, b-1);
}
console.log(pow(2,3));

/*
first stack; 2 * pow(2,2)
second stack: 2 * pow(2,1)
third stack: 2 * pow(2,0) => return a
*/