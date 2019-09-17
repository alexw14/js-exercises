/*
Given an array of integers, return indices of the two numbers such that they add up to a specific target.
You may assume that each input would have exactly one solution, and you may not use the same element twice.

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

const twoSum = (nums, target) => {
  const obj = {};
  for (let i = 0; i < nums.length; i++) {
    // check if target - nums[i] is in object
    let wantedValue = target - nums[i];
    // check if wantedValue is a key in the object
    if (wantedValue in obj) {
      return [obj[wantedValue], i]
    }
    // add to obj if doesnt exist
    obj[nums[i]] = i;
  }
};

console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([1, 2, 13, 24, 35, 46, 57, 68, 99], 100));