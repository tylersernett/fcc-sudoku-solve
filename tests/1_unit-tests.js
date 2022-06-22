const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
const {puzzlesAndSolutions} = require('../controllers/puzzle-strings.js');
let solver = new Solver;

const validPuzzle = puzzlesAndSolutions[0][0];
const solution = puzzlesAndSolutions[0][1];

const tooShort = validPuzzle.slice(1);
const invalidChar = tooShort.concat('x');
const unsolvable = '115..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';

suite('UnitTests', () => {
   suite('solver tests', function () {

      test("Logic handles a valid puzzle string of 81 characters", function done() {
         assert.equal(solver.solve(validPuzzle), solution);
      })

      test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function done() {
         const invalidPuzzle = invalidChar;
         assert.equal(solver.validate(invalidPuzzle).error, 'Invalid characters in puzzle');
      })

      test("Logic handles a puzzle string that is not 81 characters in length", function done() {
         const invalidPuzzle = tooShort;
         assert.equal(solver.validate(invalidPuzzle).error, 'Expected puzzle to be 81 characters long');
      })

      test("Logic handles a valid row placement", function done() {
         assert.equal(solver.checkRowPlacement(validPuzzle, '8', '0', '2'), '2');
      })

      test("Logic handles an invalid row placement", function done() {
         assert.equal(solver.checkRowPlacement(validPuzzle, '0', '1', '1'), false);
      })

      test("Logic handles a valid column placement", function done() {
         assert.equal(solver.checkColPlacement(validPuzzle, '0', '0', solution[0]), solution[0]);
      })

      test("Logic handles an invalid column placement", function done() {
         assert.equal(solver.checkColPlacement(validPuzzle, '0', '1', '6'), false);
      })

      test("Logic handles a valid region(3x3 grid) placement", function done() {
         assert.equal(solver.checkRegPlacement(validPuzzle, '0', '0', '7'), '7');
      })

      test("Logic handles an invalid region(3x3 grid) placement", function done() {
         assert.equal(solver.checkRegPlacement(validPuzzle, '0', '0', '2'), false);
      })

      test("Valid puzzle strings pass the solver", function done() {
         assert.equal(solver.solve(solution), solution);
      })

      test("Invalid puzzle strings fail the solver", function done() {
         const invalidPuzzle = unsolvable;
         assert.equal(solver.solve(invalidPuzzle), false);
      })

      test("Solver returns the expected solution for an incomplete puzzle", function done() {
         assert.equal(solver.solve(validPuzzle), solution);
      })


   })


});