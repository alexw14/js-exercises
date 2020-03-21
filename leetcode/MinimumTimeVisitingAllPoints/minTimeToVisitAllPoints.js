/*
On a plane there are n points with integer coordinates points[i] = [xi, yi]. Your task is to find the minimum time in seconds to visit all points.

You can move according to the next rules:

* In one second always you can either move vertically, horizontally by one unit or diagonally (it means to move one unit vertically and one unit horizontally in one second).
* You have to visit the points in the same order as they appear in the array.

Example:
Input: points = [[1,1],[3,4],[-1,0]]
Output: 7
Explanation: One optimal path is [1,1] -> [2,2] -> [3,3] -> [3,4] -> [2,3] -> [1,2] -> [0,1] -> [-1,0]   
Time from [1,1] to [3,4] = 3 seconds 
Time from [3,4] to [-1,0] = 4 seconds
Total time = 7 seconds
*/

const minTimeToVisitAllPoints = (points) => {
  let counter = 0;
  let x = points[0][0];
  let y = points[0][1];
  for (let i = 1; i < points.length; i++) {
      while (x !== points[i][0] || y !== points[i][1]) {
          if (x < points[i][0]) x++;
          if (x > points[i][0]) x--;
          if (y < points[i][1]) y++;
          if (y > points[i][1]) y--;
          counter++;
      }
  }
  return counter;
};

console.log(minTimeToVisitAllPoints([[1,1],[3,4],[-1,0]]));