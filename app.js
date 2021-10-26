let sudokuMatrix = [[0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0],
                    [0,0,0,0,0,0,0,0,0]];

let resolvedSudokuMatrix = [[0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0],
                            [0,0,0,0,0,0,0,0,0]];


function checkRow(row, number) {
    return row.indexOf(number) === -1;
}

function checkCol(col, number) {
    return col.indexOf(number) === -1;
}

function checkSquare(square, number) {
    return square.indexOf(number) === -1;
}

function checkConditions( col,row,number) {
        let squareArray = getSquare(row,col);
        let colArray = getCol(col);
        let rowArray = getRow(row);
        return checkSquare(squareArray, number) && checkCol(colArray, number) && checkRow(rowArray, number);
}

function getSquare(rowIndex,colIndex) {
    let squareStartRow = rowIndex - (rowIndex % 3);
    let squareStartCol = colIndex - (colIndex % 3);
    let squareArray = [];
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            squareArray.push(resolvedSudokuMatrix[squareStartRow + i][squareStartCol + j]);
        }
    }

    return squareArray;
}

function getRow(index) {
    return resolvedSudokuMatrix[index];
}

function getCol(index) {
    let columnArray = [];
    for(let i = 0; i < 9; i++) {
        columnArray.push(resolvedSudokuMatrix[i][index]);
    }
    return columnArray;
}

function addNumber(rowIndex, colIndex, number) {
    resolvedSudokuMatrix[rowIndex][colIndex] = number;
    document.getElementById(`${rowIndex+1}${colIndex+1}`).innerHTML = number;
}

let generatedNumbers = 0;

function generateBoard() {
    let emptyCell = getEmptyCell();
    let rowIndex = emptyCell[0];
    let colIndex = emptyCell[1];
    let number = generateRandomNumber();


    if(rowIndex === -1) {
        return resolvedSudokuMatrix;
    }



    while(generatedNumbers < 81) {
        setTimeout(() => {
            if(checkConditions(colIndex, rowIndex, number)) {
                addNumber(rowIndex, colIndex, number);
                generatedNumbers++;
                generateBoard();
            } else {
                generateBoard();
            }
        }, 1)
    }

    if(getEmptyCell()[0] !== -1) {
        resolvedSudokuMatrix[rowIndex][colIndex] = 0;
    }
    return resolvedSudokuMatrix;
}

// generateBoard();

function addArray(row, randomNumbers) {
    resolvedSudokuMatrix[row] = randomNumbers;
    for(let i = 1; i <= 9; i++) {
        document.getElementById(`${row+1}${i}`).innerHTML = randomNumbers[i-1];
    }
}

function checkArray(col, row) {
    let randomNumbers = randomArray();
    let safe = false;
    let numsChecked = 0;
    for(let i = 0; i < 9; i++) {
        if(checkConditions(col,row,randomNumbers[i])) numsChecked++;
    }

    if(numsChecked === 9) {
        safe = true;
    } else {
        setTimeout(() => {checkArray(col,row)}, 10)
    }
    if(safe) {
        return randomNumbers;
    }

    return checkArray(col,row);
}

function resetRow(row) {
    for(let i = 0; i < 9; i++) {
        row[i] = 0;
    }
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 9 + 1);
}

function getEmptyCell() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            if(resolvedSudokuMatrix[i][j] === 0) {
                return [i, j];
            }
        }
    }

    return [-1, -1];
}



function randomArray() {
    let randomArray = [];

    while(randomArray.length < 9) {
        let randomNumber = Math.floor(Math.random() * 9 + 1);
        if(randomArray.includes(randomNumber) && randomNumber != 0) {
            randomNumber = Math.floor(Math.random() * 9);
        } else {
            randomArray.push(randomNumber);
        }
    }

    return randomArray;
}