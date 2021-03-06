/**
 * Returns if the inputted board is a valid board
 * @param {Array[81]} squares - An array of 81 values representing the squares of the board
 * @return {boolean} - true if there is a valid board, false otherwise 
 */
export function validBoard(squares) {
    let grid = gridify(squares);
    // LOGIC TO VERIFY WIN
    for(let i = 0; i < 9; i++) {
        if(!validRow(grid[i]) || !validCol(grid, i) || !validBox(grid, i)) return false;
    }
    return true;
}

/**
 * returns if the board is finished (no empty squares)
 * @param {Array[81]} squares 
 */
export function finishedBoard(squares) {
    return !squares.includes(0);
}


/**
 * Takes inputted array of length 81 and converts it to 9x9 2D array
 * @param {Array[81]} squares - array of values representing each square on the board
 * @returns {Array[9][9]}
 */
export function gridify(squares) {
    // CREATING GRID FROM SQUARES
    let grid = Array(9);
    for(let row=0; row < 9; row++) {
        grid[row] = Array(9);
    }

    let counter = 0;
    for(let i=0; i<9; i++) {
        for(let j=0; j<9; j++) {
            grid[i][j] = squares[counter];
            counter++;
        }
    }
    return grid;
}


/**
 * Checks if the inputted row is valid (no repeating digits)
 * @param {Array[9]} row - array representing the values in a row of the board
 * @returns {boolean} 
 */
function validRow(row) {
    let seen = new Set();;
    for(let i=0; i<row.length; i++) {
        if(seen.has(row[i]) && row[i] !== 0) return false;
        seen.add(row[i]);
    }
    return true;
}

/**
 * Checks if the column specified is valid (no repeating digits)
 * @param {Array[9][9]} grid - a grid representing the board
 * @param {number} colNum - the column number to verify (0-8)
 */
function validCol(grid, colNum) {
    let seen = new Set();
    for(let row=0; row<9; row++) {
        if(seen.has(grid[row][colNum]) && grid[row][colNum] !== 0) return false;
        seen.add(grid[row][colNum]);
    }

    return true;
}

/**
 * Checks if the box (aka subsquare) indicated is valid (no repeating digits)
 * @param {2D array} grid - a grid representing the board
 * @param {number} i - integer representing the location of the box to validate (0-8)
 */
function validBox(grid, i) {
    const boxCol = i % 3;
    const boxRow = Math.floor(i / 3);

    let startCol = boxCol * 3;
    let startRow = boxRow * 3;
    let seen = new Set();

    for(let x = startRow; x < startRow+3; x++){
        for(let y=startCol; y<startCol+3; y++){
            if(seen.has(grid[x][y]) && grid[x][y] !==0) return false;
            seen.add(grid[x][y]);
        }
    }
    return true;
}

/**
 * Solves the board by using a backtracking algorithm.
 * To get a good idea of how the algorithm works I highly suggest uncommenting the 
 * console.log lines and opening the console up to see it at work!
 * @param {Array} grid - a 9x9 array representing the sudoku board
 */
export function solveBoard(grid) {
    
    // find the next empty square
    const empty = findEmptySquare(grid);

    // BASE CASE: there are no empty squares and therefore the board is solved
    if(!empty) return true;

    // Extract the row, col, and box index of the empty square
    const row = empty[0];
    const col = empty[1];
    const boxRow = Math.floor(row/3);
    const boxCol = Math.floor(col/3);
    const boxIndex = 3*boxRow + boxCol;

    // Increment the value of the empty square from 1-9
    for(let i=1; i<10; i++) {
        grid[row][col] = i;

        // console.log(`trying (${row}, ${col}) AS ${i}`);

        // Test if the square of interest can be valid with the current number given from for-loop
        if(validRow(grid[row]) && validCol(grid, col) && validBox(grid, boxIndex)){
            // console.log(`(${row}, ${col}) is ${i}`);
            
            // Recursively call the function with the updated grid. If the grid is solveable then the square of interest
            // has the correct value 
            if( solveBoard(grid) ) return true;

            // If the board is not solveable then the square of interest must be reset
            grid[row][col] = 0;

            // console.log(`(${row}, ${col}) was reset`);
        }

        // If the square of interest is not valid as 9 then it was not valid as 1-8 and there is an error
        // somewhere else in the board. Reset the current square and backtrack
        if(i === 9) {
            grid[row][col] = 0;
            // console.log(`(${row}, ${col}) was reset`);

        }
    }

    return false;
}

/**
 * 
 * @param {Array} grid - a 9x9 array representing the sudoku board
 */
function findEmptySquare(grid) {
    for(let i=0; i< 9; i++) {
        for(let j=0; j < 9; j++) {
            if(grid[i][j] === 0) return [i, j];
        }
    }
    return null;
}

/**
 * 
 * @param {Array} grid - a 9x9 array representing the sudoku board
 */
export function degridify(grid) {
    const squares = Array(81);
    let count = 0;
    for(let i=0; i<9; i++) {
        for(let j=0; j<9; j++) {
            squares[count] = grid[i][j];
            count++;
        }
    }
    return squares;
}