'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      //
      console.log(req.body)

      let puzzleString = req.body.puzzle;
      let value = req.body.value;
      if (!puzzleString || !value || !req.body.coordinate) {
        console.log('missing fields')
        return res.json({ error: 'Required field(s) missing' })
      }
      if (req.body.coordinate.length != 2) {
        console.log('inval coord length')
        return res.json({ error: 'Invalid coordinate' })
      }
      let row = req.body.coordinate[0].toUpperCase().charCodeAt() - 65; //unicode "A" start
      let col = req.body.coordinate[1].charCodeAt() - 49; //unicode "1" start

      console.log(row, col, value)
      if ( (row < 0) || (row > 8) || (col < 0) || (col > 8)) {
        console.log('inval coord')
        return res.json({ error: 'Invalid coordinate' })
      }

      console.log(value.charCodeAt())
      if (value.length != 1 || value.charCodeAt() < 49 || value.charCodeAt() > 57) {
        console.log('inval value')
        return res.json({ error: 'Invalid value' });
      }
      let validation = solver.validate(puzzleString)
      if (validation === true) {
        solver.checkRowPlacement(puzzleString, row, col, value)
        solver.checkColPlacement(puzzleString, row, col, value)
        solver.checkRegPlacement(puzzleString, row, col, value)
        return {};
      } else {
        console.log('inval puz')
        return res.json(validation)
      }

    });

  app.route('/api/solve')
    .post((req, res) => {
      let puzzleString = req.body.puzzle;
      if (!puzzleString) {
        return res.json({ error: 'Required field missing' });
      }

      let validation = solver.validate(puzzleString)
      if (validation === true) {
        return {}
      } else {
        console.log('inval puz')
        return res.json(validation)
      }

    });
};
