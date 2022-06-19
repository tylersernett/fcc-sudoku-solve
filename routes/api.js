'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      //
      console.log(req.body)
      let puzzleString = req.body.puzzle;
      let row = req.body.coordinate[0];
      let col = req.body.coordinate[1];
      let value = req.body.value;
      solver.checkRegPlacement(puzzleString, row, col, value)
    });

  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      if (!puzzleString) {
        return res.json({ error: 'Required field missing' });
      }

      let validation = solver.validate(puzzleString)
      if (validation === true) {

      } else {
        return res.json(validation)
      }

    });
};
