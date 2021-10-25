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


console.log(8 % 3)

function getEmptyCell() {
    let emptyCell = {row: "", col: ""};

    resolvedSudokuMatrix.forEach((row, index) => {
        let firstCell = row.find(column => column === 0);

        if(firstCell === undefined) return;

        emptyCell.row = index;
        emptyCell.col = row.indexOf(firstCell);
    });

    if(emptyCell.col !== "") return emptyCell;


    return false;
}

function checkRow(emptyCell, number) {
    return resolvedSudokuMatrix[emptyCell.row].indexOf(number) === -1;
}

function checkCol(emptyCell, number) {
    return !resolvedSudokuMatrix.some(row => row[emptyCell.col] === number);
}

function checkSquare(emptyCell, number) {
    let squareTopRow = emptyCell.row - (emptyCell.row % 3);
    let squareFirstCol = emptyCell.col - (emptyCell.col % 3);
    let isClear = true;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(resolvedSudokuMatrix[squareTopRow + i][squareFirstCol + j] === number) isClear = false;
        }
    }

    return isClear;
}

function generateBoard() {
    let emptyCell = getEmptyCell(resolvedSudokuMatrix);
    if(!emptyCell) return resolvedSudokuMatrix;
    let randomNumbers = randomArray();
    for(number of randomNumbers) {
        if(checkRow(emptyCell, number) && checkCol(emptyCell,number) && checkSquare(emptyCell, number)) {
            resolvedSudokuMatrix[emptyCell.row][emptyCell.col] = number;
            document.getElementById(`${emptyCell.row + 1}${emptyCell.col+1}`).innerHTML = number;
            return generateBoard();
        }
    }

} 

generateBoard();


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