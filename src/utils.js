export function verifyWin(squares) {
    let grid = gridify(squares);
    // LOGIC TO VERIFY WIN
    for(let i = 0; i < 9; i++) {
        if(!validRow(grid[i]) || !validCol(grid, i) || !validBox(grid, i)) return false;
    }
    return true;
}

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

function validRow(row) {
    let seen = new Set();;
    for(let i=0; i<row.length; i++) {
        if(seen.has(row[i]) && row[i] !== 0) return false;
        seen.add(row[i]);
    }
    return true;
}

function validCol(grid, colNum) {
    let seen = new Set();
    for(let row=0; row<9; row++) {
        if(seen.has(grid[row][colNum]) && grid[row][colNum] !== 0) return false;
        seen.add(grid[row][colNum]);
    }

    return true;
}

/**
 * takes a grid and an integer representing the location of the box to validate (0-8)
 * @param {2D array} grid 
 * @param {integer} i 
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