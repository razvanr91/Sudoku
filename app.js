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

for(let i = 1; i <= 9; i ++) {
    for(let j = 1; j <= 9; j++) {
        sudokuMatrix[i[j]] = j;
        document.getElementById(`${i}${j}`).innerHTML = sudokuMatrix[i[j]];
    }
}

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


for(let x = 0; x < 9 ; x++) {
    
}


function generateRandomBoard() {

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