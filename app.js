
const snakeColor = "orange";

const boardElement = document.querySelector('#board');

let cellElements = [];
let boardState = []; 
let snake = []; 

//*temporary snake
snake.push({x: 5, y: 15, direction: 'right'})

// window.setInterval(()=> {
//     snake[0].x += 1; 
//     drawBoard()
//     drawSnake()
// } ,1000)

function updateSnake() {
    if (snake[0].direction === "right") {
        
    }
}

function drawSnake() {
    snake.forEach((segment) => {
        cellElements[segment.y + 30 * segment.x].style.backgroundColor = snakeColor; 
    })
}



function initElements() {
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            boardState.push({isSnake: false, isFood: false, isWall: false,})
            cellElements[i + 30*j] = document.createElement('div')

            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    cellElements[i + 30*j].classList.add("cell-blue")
                } else {
                    cellElements[i + 30*j].classList.add("cell-dark-blue")
                }
            } else {
                if (j % 2 === 0) {
                    cellElements[i + 30*j].classList.add("cell-dark-blue")
                } else {
                    cellElements[i + 30*j].classList.add("cell-blue")
                }
            }
            
            boardElement.appendChild(cellElements[i + 30*j])

        }
    }
}

function drawBoard() {
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    cellElements[i + 30 * j].style.backgroundColor =
                        "rgb(37, 100, 226)";
                } else {
                    cellElements[i + 30 * j].style.backgroundColor =
                        "rgb(2, 32, 113)";
                }
            } else {
                if (j % 2 === 0) {
                    cellElements[i + 30 * j].style.backgroundColor =
                        "rgb(2, 32, 113)";
                } else {
                    cellElements[i + 30 * j].style.backgroundColor =
                        "rgb(37, 100, 226)";
                }
            }

            boardElement.appendChild(cellElements[i + 30 * j]);
        }
    }   
}

initElements()
drawSnake()
