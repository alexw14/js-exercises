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