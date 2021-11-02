// Buttons
let solveSudokuButton = document.getElementById('solveSudokuBtn');
solveSudokuButton.addEventListener('click', () => solveSudoku());

let resetGameButton = document.getElementById('resetPage');
resetGameButton.addEventListener('click', () => location.reload())


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

// Timer Variables
let seconds = 0;
let minutes = 0;
let hours = 0;

let wonGame = false;

let numbers = [1,2,3,4,5,6,7,8,9];

let toastEl = document.getElementById("toastAlert");
let toast = bootstrap.Toast.getOrCreateInstance(toastEl);

let modalEl = document.getElementById("numberModal");

let modal = bootstrap.Modal.getOrCreateInstance(modalEl);

let cells = Array.from(document.getElementsByTagName('td'));

let choice = document.getElementById('makeChoice');

let form = document.querySelector('form');

// Used to pass data from the clicked cell
let checkedCells = 0;
let selectedCell;

choice.addEventListener('click', () => getOption);

cells.forEach(cell => {
    
    if(cell.innerHTML === '') {
        cell.addEventListener('click', () => {
            let cellRow = parseInt(cell.id[0]) - 1;
            let cellCol = parseInt(cell.id[1]) - 1;
            if(sudokuMatrix[cellRow][cellCol] === 0) {
                modal.show();
                selectedCell = {
                    cellRow : cellRow,
                    cellCol : cellCol
                }
            }
        })
    }
});

function startTimerFunction() {

    let timer = setInterval(() => {
        if(seconds === 59) {
            seconds = 0;
            ++minutes;
        }
        if(minutes === 60) {
            ++hours;
            minutes = 0;
        }
        seconds++;
        document.getElementById('timerDisplay').innerHTML = `${hours > 10 ? hours : '0'+hours}:${minutes > 10 ? minutes : '0'+minutes}:${seconds > 10 ? seconds : '0'+seconds}`;
    }, 1000);
}

function solveSudoku() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            let cell = {cellRow : i, cellCol: j};
            if(sudokuMatrix[cell.cellRow][cell.cellCol] === 0) {
                let number = resolvedSudokuMatrix[cell.cellRow][cell.cellCol];
                ++checkedCells;
                addNumber(cell.cellRow,cell.cellCol, number, sudokuMatrix);
                document.getElementById(`${cell.cellRow + 1}${cell.cellCol + 1}`).style.backgroundColor = '#495867';
            }
        }
    }
}

function getOption() {
    let choseOption = parseInt(form.elements.choice.value);
    if(choseOption !== '') {
        if(choseOption == resolvedSudokuMatrix[selectedCell.cellRow][selectedCell.cellCol]) {
            ++checkedCells;
            addNumber(selectedCell.cellRow, selectedCell.cellCol, choseOption, sudokuMatrix);
            document.getElementById(`${selectedCell.cellRow+1}${selectedCell.cellCol+1}`).style.backgroundColor = '#495867';

        } else {
            toastEl.classList.add('bg-danger');
            document.getElementById('toastMessage').innerHTML = "The number you entered is wrong. Please choose wisely."
            toast.show();
            
        }

    } else {
        document.getElementById('toastMessage').innerHTML = "Please choose a number."
        toastEl.classList.add('bg-danger');
        toast.show();
        
    }
    
    modal.hide();
    form.reset();
}

function checkForWin() {
    if(checkedCells === 45) {
        winGame();
    }
}

function winGame() {
    toastEl.classList.remove('bg-danger');
    toastEl.classList.add('bg-success');
    document.getElementById('toastMessage').innerHTML = 'Congrats! You won!';
    toast.show();
}

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

function addNumber(rowIndex, colIndex, number, matrix = resolvedSudokuMatrix) {
    let cell = document.getElementById(`${rowIndex+1}${colIndex+1}`);
    matrix[rowIndex][colIndex] = number;
    number === 0 ? cell.innerHTML = `&nbsp;`: cell.innerHTML = number;
    checkForWin();
}


function guessNumber() {
    modal.style.display = true;
}

function getEmptyCell() {

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

function copyBoards() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            sudokuMatrix[i][j] = resolvedSudokuMatrix[i][j];
        }
    }
}

function produceEmptyCells() {
    copyBoards();
    let numbersPerRow = 0;
    for(let i = 0; i < 9; i++) {
        while(numbersPerRow < 5) {
            let number = generateRandomNumber();
            if(sudokuMatrix[i][number] !== 0) {
                sudokuMatrix[i][number] = 0;
                ++numbersPerRow;
            }
        }
        numbersPerRow = 0;
    }
}

function showPlayableBoard() {
    for(let i = 0; i < 9; i++) {
        for(let j = 0; j < 9; j++) {
            let number = sudokuMatrix[i][j];
            addNumber(i,j,number,sudokuMatrix);
        }
    }
}

function randomArraysGenerator(array) {
    let randomArrays = [];

    for(let i = 0; i < 9; i++ ) {
        randomArrays.push(shuffleArray(array));
    }

    return randomArrays;
}

function playGame() {
    generateBoard();
    copyBoards();
    produceEmptyCells();
    showPlayableBoard();
}

playGame();

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

function generateRandomNumber() {
    return Math.floor(Math.random() * 9);
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