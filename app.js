const snakeColor = "orange";
const wallColor = "hotpink";
const foodColor = "cyan";

const timeInterval = 150;

const boardElement = document.querySelector("#board");

let cellElements = [];
let boardState = [];
let snake = [];

let currentDirection = "right";

let gameOver = false;
let paused = true;



window.setInterval(() => {
    if (paused === false || gameOver === true) {
        updateSnake();
        drawBoard();
        drawSnake();
    }
}, timeInterval);

document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight" && currentDirection !== "left") {
        currentDirection = "right";
    } else if (event.code === "ArrowLeft" && currentDirection !== "right") {
        currentDirection = "left";
    } else if (event.code === "ArrowUp" && currentDirection !== "down") {
        currentDirection = "up";
    } else if (event.code === "ArrowDown" && currentDirection !== "up") {
        currentDirection = "down";
    } else if (event.code === "Space") {
        paused = !paused;
    }
});

function updateSnake() {
    newSegment = { x: snake[0].x, y: snake[0].y, direction: currentDirection };

    if (snake[0].direction === "right") {
        newSegment.x += 1;
    } else if (snake[0].direction === "left") {
        newSegment.x -= 1;
    } else if (snake[0].direction === "up") {
        newSegment.y -= 1;
    } else if (snake[0].direction === "down") {
        newSegment.y += 1;
    }

    snake.unshift(newSegment);

    if (!boardState[newSegment.y + 30 * newSegment.x].isFood) {
        snake.pop();
    } else {
        boardState[newSegment.y + 30 * newSegment.x].isFood = false; 
        generateFood();
    }
    

    for (let i = 0; i < 900; i++) {
        boardState[i].isSnake = false;
    }

    for (let i = 1; i < snake.length; i++) {
        boardState[snake[i].y + 30 * snake[i].x].isSnake = true;
    }

    if (boardState[newSegment.y + 30 * newSegment.x].isWall) {
        reset()
        paused = true;
    } else if (boardState[newSegment.y + 30 * newSegment.x].isSnake) {
        paused = true;
        reset()
    }
}

function drawSnake() {
    snake.forEach((segment) => {
        cellElements[segment.y + 30 * segment.x].style.backgroundColor =
            snakeColor;
    });
}

function reset() {
    snake = [];
    snake.push({ x: 15, y: 15, direction: "right" });
    snake.push({ x: 14, y: 15, direction: "right" });
    snake.push({ x: 13, y: 15, direction: "right" });
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

    for (let i = 0; i < 30; i++) {
        boardState[870 + i].isWall = true;
        boardState[i].isWall = true;
        boardState[30 * i].isWall = true;
        boardState[30 * i + 29].isWall = true;
    }

    generateFood();
}

function generateFood() {
    let possibleLocation;
    while (true) {
        possibleLocation = Math.floor(Math.random() * 900);
        if (boardState[possibleLocation].isSnake || boardState[possibleLocation].isWall) {
            continue
        } else {
            boardState[possibleLocation].isFood = true; 
            break;
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

            if (boardState[i + 30 * j].isWall) {
                cellElements[i + 30 * j].style.backgroundColor = wallColor;
            }

            if (boardState[i + 30 * j].isFood) {
                cellElements[i + 30 * j].style.backgroundColor = foodColor;
            }
        }
    }
}

initElements();
reset();
drawBoard();
drawSnake();
