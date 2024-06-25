const snakeColor = "orange";
const timeInterval = 250;

const boardElement = document.querySelector("#board");

let cellElements = [];
let boardState = [];
let snake = [];

let currentDirection = "right";

let gameOver = false;

snake.push({ x: 15, y: 15, direction: "right" });
snake.push({ x: 14, y: 15, direction: "right" });
snake.push({ x: 13, y: 15, direction: "right" });
snake.push({ x: 12, y: 15, direction: "right" });
snake.push({ x: 11, y: 15, direction: "right" });
snake.push({ x: 10, y: 15, direction: "right" });

// window.setInterval(() => {
//     updateSnake();
//     drawBoard();
//     drawSnake();
// } , timeInterval)

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight") {
        currentDirection = "right";
    } else if (event.code === "ArrowLeft") {
        currentDirection = "left";
    } else if (event.code === "ArrowUp") {
        currentDirection = "up";
    } else if (event.code === "ArrowDown") {
        currentDirection = "down";
    }
});

function updateSnake() {
    newSegment = {x: snake[0].x, y: snake[0].y ,direction: currentDirection,}

    if (snake[0].direction === "right") {
        newSegment.x += 1; 
    } else if (snake[0].direction === "left") {
        newSegment.x -= 1; 
    } else if (snake[0].direction === "up") {
        newSegment.y -= 1;
    } else if (snake[0].direction === "down") {
        newSegment.y += 1;
    }

    snake.unshift(newSegment)
    snake.pop()
    
}

function drawSnake() {
    snake.forEach((segment) => {
        cellElements[segment.y + 30 * segment.x].style.backgroundColor =
            snakeColor;
    });
}

function initElements() {
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {
            boardState.push({ isSnake: false, isFood: false, isWall: false });
            cellElements[i + 30 * j] = document.createElement("div");

            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    cellElements[i + 30 * j].classList.add("cell-blue");
                } else {
                    cellElements[i + 30 * j].classList.add("cell-dark-blue");
                }
            } else {
                if (j % 2 === 0) {
                    cellElements[i + 30 * j].classList.add("cell-dark-blue");
                } else {
                    cellElements[i + 30 * j].classList.add("cell-blue");
                }
            }

            boardElement.appendChild(cellElements[i + 30 * j]);
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

initElements();
drawSnake();
