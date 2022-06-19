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

  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;

