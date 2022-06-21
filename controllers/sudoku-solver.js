class SudokuSolver {
  // '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
  // '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
  validate(puzzleString) {
    if (puzzleString.length != 81) {
      return { error: 'Expected puzzle to be 81 characters long' }
    }
    const regex = new RegExp(/^(\d|\.){81}$/);
    //^ start of line; () group; \d digits; | or; \. period char; {81} exactly 81 in length; $ end of line
    if (!regex.test(puzzleString)) {
      console.log('bad char')
      return { error: 'Invalid characters in puzzle' }
    }
    console.log('valid')
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rows = Array(9).fill(''); //9-length empty string array
    for (let i = 0; i < 81; i++) {
      rows[Math.floor(i / 9)] += puzzleString[i];
    }
    console.log(rows)
    if (rows[row].includes(value)) {
      return false
    }
    return value;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let cols = Array(9).fill(''); //9-length empty string array
    for (let i = 0; i < 81; i++) {
      cols[i % 9] += puzzleString[i];
    }
    console.log(cols)
    if (cols[column].includes(value)) {
      return false
    }
    return value;
  }

  checkRegPlacement(puzzleString, row, column, value) {
    let regs = Array(9).fill(''); //9-length empty string array
    for (let i = 0; i < 81; i++) {
      regs[(Math.floor(i / 3) % 3) + 3 * (Math.floor(i / (81 / 3)))] += puzzleString[i];
      //    (i // widthSmall) % widthBig    +    widthBig * ( i // (TOTAL/3) ) 
      //regs[Math.floor( (Math.floor(i / 3) )  / 3 )] += puzzleString[i];
      //i:    0 1 2   3 4 5  6 7 8     9  10 11   ... 27 28 29
      //i/3:  0 0 0   1 1 1  2 2 2     3  3   3        9  9  9 
      ////%3  0 0 0   1 1 1  2 2 2     0  0   0            0
    }

    console.log(regs)
    const reg = Math.floor(column/3) + Math.floor(row/3)*3;
    if (regs[reg].includes(value)) {
      return false
    }
    return value;
  }

  solve(puzzleString) {
    //check next empty cell -- find non-union of [1-9], row, col, region 
    //if only one possible value, update puzzleString
    return;
  }
}

module.exports = SudokuSolver;

