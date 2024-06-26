const snakeColor = "#42ff83";
const wallColor = "#35495e";
const foodColor = "#ff7e67";
const backColor = "#306969";


const timeInterval = 150;

const boardElement = document.querySelector("#board");
const scoreBoard = document.querySelector('#current-score')

let cellElements = [];
let boardState = [];
let snake = [];

let currentScore = 0;

let currentDirection = "right";
let paused = true;

window.setInterval(() => {
    if (paused === false) {
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

    currentScore = (snake.length - 3) * 10; 
    let msg = `Current Score: ${currentScore}`
    scoreBoard.textContent = msg; 

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

    if (!boardState[newSegment.x + 30 * newSegment.y].isFood) {
        snake.pop();
    } else {
        boardState[newSegment.x + 30 * newSegment.y].isFood = false;

        generateFood();
    }

    for (let i = 0; i < 900; i++) {
        boardState[i].isSnake = false;
    }

    for (let i = 1; i < snake.length; i++) {
        boardState[snake[i].x + 30 * snake[i].y].isSnake = true;
    }

    if (boardState[snake[0].x + 30 * snake[0].y].isWall) {
        msg = `You scored ${currentScore} points!`;
        scoreBoard.textContent = msg; 

        reset();
        paused = true;
    } else if (boardState[newSegment.x + 30 * newSegment.y].isSnake) {
        msg = `You scored ${currentScore} points!`;
        scoreBoard.textContent = msg; 

        paused = true;
        reset();
    }
}

function drawSnake() {
    snake.forEach((segment) => {
        cellElements[segment.x + 30 * segment.y].style.backgroundColor = snakeColor;
    });
}

function reset() {
    snake = [];
    snake.push({ x: 15, y: 15, direction: "right" });
    snake.push({ x: 14, y: 15, direction: "right" });
    snake.push({ x: 13, y: 15, direction: "right" });

    currentScore = 0;

    for (let i = 0; i < 900; i++) {
        boardState[i].isSnake = false;
    }
}

function initElements() {
    for (let i = 0; i < 900; i++) {
        boardState.push({ isSnake: false, isFood: false, isWall: false });
        cellElements[i] = document.createElement("div");

        cellElements[i].classList.add("cell");
        boardElement.appendChild(cellElements[i]);
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
        if (
            boardState[possibleLocation].isSnake ||
            boardState[possibleLocation].isWall
        ) {
            continue;
        } else {
            boardState[possibleLocation].isFood = true;
            break;
        }
    }
}

function drawBoard() {
    for (let i = 0; i < 900; i++) {

        cellElements[i].style.backgroundColor = backColor;

        if (boardState[i].isWall) {
            cellElements[i].style.backgroundColor = wallColor;
        }

        if (boardState[i].isFood) {
            cellElements[i].style.backgroundColor = foodColor;
        }
    }
}

initElements();
reset();
drawBoard();
drawSnake();
