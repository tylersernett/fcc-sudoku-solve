'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      //get required fields
      console.log(req.body)
      let puzzleString = req.body.puzzle;
      let value = req.body.value;
      let coordinate = req.body.coordinate;
      if (!puzzleString || !value || !coordinate) {
        return res.json({ error: 'Required field(s) missing' })
      }

      //coordinate must be letter A-I and number 1-9 -- no more than that
      if (coordinate.length != 2) {
        return res.json({ error: 'Invalid coordinate' })
      }
      let row = coordinate[0].toUpperCase().charCodeAt() - 65; //normalize to 0: 65 = unicode "A" start
      let col = coordinate[1].charCodeAt() - 49; //normalize to 0: 49 = unicode "1" start
      if ((row < 0) || (row > 8) || (col < 0) || (col > 8)) {
        return res.json({ error: 'Invalid coordinate' })
      }

      //value must be single number from 1-9
      if (value.length != 1 || value.charCodeAt() < 49 || value.charCodeAt() > 57) {
        return res.json({ error: 'Invalid value' });
      }

      //perform validation check
      let validation = solver.validate(puzzleString)
      let conflicts = [];
      if (validation === true) {
        if (!solver.checkRowPlacement(puzzleString, row, col, value)) {
          conflicts.push("row");
        }
        if (!solver.checkColPlacement(puzzleString, row, col, value)) {
          conflicts.push("column");
        }
        if (!solver.checkRegPlacement(puzzleString, row, col, value)) {
          conflicts.push("region")
        }
        if (conflicts.length > 0) {
          return res.json({ 'valid': false, 'conflict': conflicts });
        } else { //if conflicts array is still empty, then it's valid
          return res.json({ 'valid': true });
        }
      } else {
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
        const solved = solver.solve(puzzleString);
        if (solved != false) {
          return res.json({ solution: solved });
        } else {
          return res.json({ error: 'Puzzle cannot be solved' })
        }
      } else {
        return res.json(validation)
      }
    });
};