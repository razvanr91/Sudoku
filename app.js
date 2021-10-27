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

let numbers = [1,2,3,4,5,6,7,8,9];

let numCount = 0;
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
function resetBoard() {
    let zeroArray = [0,0,0,0,0,0,0,0,0];
    generatedNumbers = 0;
    for(let i = 0; i < 9; i++) {
        resolvedSudokuMatrix[i] = zeroArray;
    };

}

function getEmptyCell() {
    // for(let i = 0; i < 9; i++) {
    //     for(let j = 0; j < 9; j++) {
    //         if(resolvedSudokuMatrix[i][j] === 0) {
    //             return [i, j];
    //         }
    //     }
    // }

    // return [-1, -1];

    let emptyCell = {row: "", col: ""};

    resolvedSudokuMatrix.forEach((row, rowIndex) => {
        if(emptyCell.col !== "") return;

        let firstZero = row.find(col => col === 0);

        if(firstZero === undefined) return;

        emptyCell.row = rowIndex;
        emptyCell.col = row.indexOf(firstZero);
    })

    if(emptyCell.col !== "") return emptyCell;

    return false;
}

function generateBoard() {
    let emptyCell = getEmptyCell();

    if(!emptyCell) {
        return resolvedSudokuMatrix;
    }

    let rowIndex = parseInt(emptyCell.row);
    let colIndex = parseInt(emptyCell.col);
    // for(let i = 0; i < 9; i++) {
    //     for(let j = 0; j < 9; j++) {
    //         while(true) {
    //             let randomArrays = randomArraysGenerator(numbers);
    //             if(!checkConditions(j,i,randomArrays[i][j])) {
    //                 addNumber(i,j,randomArrays[i][j]);
    //                 break;
    //             }
    //         }
    //     }
    // }
    try {
        for(number of shuffleArray(numbers)) {
            if(checkConditions(colIndex, rowIndex, number)) {
                addNumber(rowIndex, colIndex, number);
                generateBoard();

                if(generateBoard()) {
                    return resolvedSudokuMatrix();
                }

                resolvedSudokuMatrix[rowIndex][colIndex] = 0;
                
            }
        }
    } catch (err) {
    }

    return false;
}

function randomArraysGenerator(array) {
    let randomArrays = [];

    for(let i = 0; i < 9; i++ ) {
        randomArrays.push(shuffleArray(array));
    }

    return randomArrays;
}

generateBoard();

function shuffleArray(array) {
    let shuffledArray = [];

    while(shuffledArray.length < array.length) {
        let number = array[Math.floor(Math.random() * array.length)];
        if(!(shuffledArray.indexOf(number) >= 0)) shuffledArray.push(number);
    }

    return shuffledArray;
}



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