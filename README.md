# Sudoku Solver

This is the boilerplate for the Sudoku Solver project. Instructions to complete your project can be found at https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/sudoku-solver

Live app: https://fcc-sudoku-solve.herokuapp.com/

union:
```javascript 
let allVals = [...new Set([...rowVals, ...colVals, ...regVals])];
```
intersection: 
```javascript
let allVals = [rowVals, colVals, regVals].reduce((a, b) => a.filter(i => b.includes(i)))
```
check two arrays for equality:
```javascript
let is_same = (stringCopy.length == baseArray.length) && stringCopy.every(function (element, index) {
        return element === baseArray[index];
      });
```

harder regex:
```javascript
    const regex = new RegExp(/^(\d|\.){81}$/);
    //^ start of line; () group; \d digits; | or; \. period char; {81} exactly 81 in length; $ end of line
    if (!regex.test(puzzleString)) {
```
easier regex:
```javascript
    if (/[^0-9.]/g.test(puzzleString))  {
```

harder region creation:
```javascript
regs[(Math.floor(i / 3) % 3) + Math.floor(i / (81 / 3)) * 3] += puzzleString[i];
//    (i // widthSmall) % widthBig    +    widthBig * ( i // (TOTAL/3) )  * 3
```
easier region creation:
```javascript
let _row = Math.floor(i / 9);
let _col = i % 9;
regs[Math.floor(_col / 3) + Math.floor(_row / 3) * 3] += puzzleString[i];
```