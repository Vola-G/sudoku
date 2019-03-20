module.exports = 
function solveSudoku(matrix) {

//check the filled cells for exist numbers 
  function getPossibleNum(matrix, col, row) {
    let existNum = {};

    for (let i = 0; i < 9; i++) {
      existNum[matrix[row][i]] = 1;
    }
    for (let i = 0; i < 9; i++) {
      existNum[matrix[i][col]] = 1;
    }
    for (let i = 0; i < 9; i++) {
      existNum[matrix[3 * ((row / 3) | 0) + ((i / 3) | 0)][3 * ((col / 3) | 0) + (i % 3)]] = 1;
    }
//looking for possible numbers
    let possibleNum = [];

    for (let i = 1; i <= 9; i++) {
      if (!(i in existNum)) {
        possibleNum.push(i);
      } 
    }

    return possibleNum;
  }

//looking for empty cells
  let emptyCells = [];
  let n = 0;

  for (n = 0; n < 9 * 9; n++) {
    if (matrix[(n / 9) | 0][n % 9] === 0) {
      emptyCells.push({ emptyCellNum: n, possibilities: null, i: 0 });
    }
  }
//find the possible suitable number
  n = 0;

  while (n < emptyCells.length) {
    let cell = emptyCells[n];
    let row = (cell.emptyCellNum / 9) | 0;
    let col = cell.emptyCellNum % 9;
    cell.possibilities = cell.possibilities || getPossibleNum(matrix, col, row);
    if (cell.i >= cell.possibilities.length) {
      matrix[row][col] = 0;
      cell.i = 0; 
      cell.possibilities = null;
      n--;
    } else {
      matrix[row][col] = cell.possibilities[cell.i++];
      n++;
    }

  }

  return matrix;
};

// console.log(solveSudoku([
//   [5, 3, 0, 0, 7, 0, 0, 0, 0],
//   [6, 0, 0, 1, 9, 5, 0, 0, 0],
//   [0, 9, 8, 0, 0, 0, 0, 6, 0],
//   [8, 0, 0, 0, 6, 0, 0, 0, 3],
//   [4, 0, 0, 8, 0, 3, 0, 0, 1],
//   [7, 0, 0, 0, 2, 0, 0, 0, 6],
//   [0, 6, 0, 0, 0, 0, 2, 8, 0],
//   [0, 0, 0, 4, 1, 9, 0, 0, 5],
//   [0, 0, 0, 0, 8, 0, 0, 7, 9]]));
