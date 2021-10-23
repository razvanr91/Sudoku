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


// for(let x = 0; x < 9; x++) {
//     for(let i = 0; i < 3; i++) {
//         for(let j = 0; j < 3; j++) {
//             if(i === 0) {
//                 sudokuMatrix[i[j]] = j+1;
//                 document.getElementById(`${i+1}${j+1}`).innerHTML = sudokuMatrix[i[j]];
//             }
//             if(i === 1) {
//                 sudokuMatrix[i[j]] = j + 4;
//                 document.getElementById(`${i+1}${j+1}`).innerHTML = sudokuMatrix[i[j]];
//             }
//             if(i === 2) {
//                 sudokuMatrix[i[j]] = j + 7;
//                 document.getElementById(`${i+1}${j+1}`).innerHTML = sudokuMatrix[i[j]];
//             }
//         }
//     }
// }


function checkForDuplicatesOnRow(number, square) {
    if(number === sudokuMatrix[square+1[0]] || number === sudokuMatrix[square+1[1]] || number === sudokuMatrix[square+1[2]]) {
        return true;
    }
    return false;
}


function generateRandomBoard() {
    let arraysGenerated = 0;
    let currentSquare = 1;
    let allNumbers = [];
    let duplicate = false;
    while(currentSquare <= 9) {
        let array = randomArray();
        if(arraysGenerated === 0) {
            arraysGenerated++;
            for(let j = 0; j < 9; j++) {
                sudokuMatrix[currentSquare[j]] = array[j];
                document.getElementById(`${currentSquare}${j+1}`).innerHTML = sudokuMatrix[currentSquare[j]];
                allNumbers.push(array[j]);
            }
            ++currentSquare;
        } else {
            for(let i = 1; i <= 9; i++) {
                sudokuMatrix[currentSquare[i]] = array[i-1];
                document.getElementById(`${currentSquare}${i}`).innerHTML = sudokuMatrix[currentSquare[i-1]];
            }
            arraysGenerated++;
            currentSquare++;
        }
    }
}

generateRandomBoard();



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