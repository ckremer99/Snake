
const boardElement = document.querySelector('#board');

var cellElements = [];
var boardState = []; 

function initElements() {
    for (let i = 0; i < 2500; i++) {
        cellElements[i] = document.createElement('div')
        cellElements[i].classList.add("cell")
        boardElement.appendChild(cellElements[i])

        boardState.push({isSnake: false, isFood: false, isWall: false,})
    }
}

initElements()