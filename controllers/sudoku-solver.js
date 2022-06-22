class SudokuSolver {
  // '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
  // '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
  validate(puzzleString) {
    if (puzzleString.length != 81) {
      return { error: 'Expected puzzle to be 81 characters long' }
    }
    // const regex = new RegExp(/^(\d|\.){81}$/);
    // //^ start of line; () group; \d digits; | or; \. period char; {81} exactly 81 in length; $ end of line
    // if (!regex.test(puzzleString)) {
    if (/[^0-9.]/g.test(puzzleString)) {
      return { error: 'Invalid characters in puzzle' }
    }
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let rows = Array(9).fill(''); //9-length empty string array
    for (let i = 0; i < 81; i++) {
      rows[Math.floor(i / 9)] += puzzleString[i];
    }
    //if the sent value is already at the coordinate, it's good
    if (rows[row][column] == value) {
      return value
    }
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
    //if the sent value is already at the coordinate, it's good
    if (cols[column][row] == value) {
      return value
    }
    if (cols[column].includes(value)) {
      return false
    }
    return value;
  }

  checkRegPlacement(puzzleString, row, column, value) {
    let regs = Array(9).fill(''); //9-length empty string array
    for (let i = 0; i < 81; i++) {
      //regs[(Math.floor(i / 3) % 3) + Math.floor(i / (81 / 3)) * 3] += puzzleString[i];
      //    (i // widthSmall) % widthBig    +    widthBig * ( i // (TOTAL/3) )  * 3
      let _row = Math.floor(i / 9) ;
      let _col = i % 9;
      regs[Math.floor(_col / 3) + Math.floor(_row / 3) * 3] += puzzleString[i];
    }
    const reg = Math.floor(column / 3) + Math.floor(row / 3) * 3;
    const index = (column % 3) + (row % 3) * 3;
    //if the sent value is already at the coordinate, it's good
    if (regs[reg][index] == value) {
      return value;
    }
    if (regs[reg].includes(value)) {
      return false
    }
    return value;
  }

  solve(puzzleString) {
    let stringArray = puzzleString.split('');// (' ' + puzzleString).slice(1);
    for (let i = 0; i < 81; i++) {
      console.log(i + stringArray)
      if (stringArray[i] == ".") {
        let irow = Math.floor(i / 9);
        let icol = i % 9
        let rowVals = [];
        //test digits 1-9 in each of row, col, & region
        for (let j = 1; j <= 9; j++) {
          const testVal = this.checkRowPlacement(stringArray, irow, icol, j);
          if (testVal) { rowVals.push(testVal) };
        }
        let colVals = [];
        for (let j = 1; j <= 9; j++) {
          const testVal = this.checkColPlacement(stringArray, irow, icol, j);
          if (testVal) { colVals.push(testVal) };
        }
        let regVals = [];
        for (let j = 1; j <= 9; j++) {
          const testVal = this.checkRegPlacement(stringArray, irow, icol, j);
          if (testVal) { regVals.push(testVal) };
        }

        //intersection: any values present in ALL of row, col, & region
        let allVals = [rowVals, colVals, regVals].reduce((a, b) => a.filter(c => b.includes(c)));

        //if only one possible value in the intersection, it's valid, update puzzleString
        if (allVals.length == 1) {
          stringArray[i] = allVals[0].toString();
        }
      }
    }

    let joined = stringArray.join('');
    if (stringArray.includes('.')) {
      if (joined == puzzleString) { //infinite recursion, unsolvable
        return false;
      } else {
        return this.solve(joined); //perform recursion if .'s still in string
      }
    } else {
      return joined; //return solved string if no more .'s exist
    }
  }
}

module.exports = SudokuSolver;
