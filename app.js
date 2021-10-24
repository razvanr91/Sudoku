// let sudokuMatrix = [[0,0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0,0],
//                     [0,0,0,0,0,0,0,0,0]];

// let resolvedSudokuMatrix = [[0,0,0,0,0,0,0,0,0],
//                             [0,0,0,0,0,0,0,0,0],
//                             [0,0,0,0,0,0,0,0,0],
//                             [0,0,0,0,0,0,0,0,0],
//                             [0,0,0,0,0,0,0,0,0],
//                             [0,0,0,0,0,0,0,0,0],
//                             [0,0,0,0,0,0,0,0,0],
//                             [0,0,0,0,0,0,0,0,0],
//                             [0,0,0,0,0,0,0,0,0]];


let sudokuMatrix = new Map();

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


function checkForDuplicatesOnRow(square, number) {
    let arrayToCheck = sudokuMatrix.get(square);
    return (arrayToCheck[0] === number) || (arrayToCheck[1] === number) || (arrayToCheck[2] === number);
}

function checkForDuplicatesOnColumn(square, number) {
    let arrayToCheck = sudokuMatrix.get(square);
    return (arrayToCheck[0] === number) || (arrayToCheck[3] === number) || (arrayToCheck[6] === number);
}

function generateRandomBoard() {
    sudokuMatrix.set(1, randomArray());
    let squares = 1;
    for(let i = 1; i <= 9; i++) {
        let array = randomArray();
        sudokuMatrix.set(i, array);
        for(let j = 0; j < sudokuMatrix.get(i).length; j++) {
            document.getElementById(`${i}${j+1}`).innerHTML = sudokuMatrix.get(i)[j];
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