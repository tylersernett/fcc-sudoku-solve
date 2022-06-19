'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

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
