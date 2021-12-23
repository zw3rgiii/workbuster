let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let rows = 15;
let cols = 15;
let snake = [
    {
        x: 15,
        y: 5
    }
]
let food;
let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = 'LEFT';
let hitSelf = false;
let hitWall = false;

placeFood();
setInterval(update, 300);
document.addEventListener('keydown', keyDown);

render();

function render() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    snake.forEach(el => add(el.x, el.y));

    ctx.fillStyle = "lightgreen";
    add(food.x, food.y);
    requestAnimationFrame(render);

}

function update() {
    moveSnake();
    updateDir();
    end();

    if (snake[0].x == food.x && snake[0].y == food.y) {
        foodCollection();
        placeFood();
    }
}

function add(x, y) {
    ctx.fillRect(x * cellWidth, y * cellHeight, canvas.width / cols - 1, canvas.height / rows - 1);
}

function moveSnake() {
    for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];

        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

function end() {
    var firstTime = true;
    snake.forEach(e => {
        var before = e;
        if (!firstTime) {
            if (before.x == e.x || before.y == e.y) hitSelf = true;
        }
    });
    if (snake[0].x == -1 || snake[0].y == -1 || snake[0].x == cols || snake[0].y == rows) hitWall = true;
    if (hitWall || hitSelf) console.log("game over");
}

function placeFood() {
    let foodX = Math.floor(Math.random() * rows);
    let foodY = Math.floor(Math.random() * cols);
    food = {
        x: foodX,
        y: foodY
    }
}

function foodCollection() {
    snake = [
        {
            x: snake[0].x,
            y: snake[0].y
        }, ...snake
    ];
}

function updateDir() {
    if (direction == 'LEFT') {
        snake[0].x--;
    }
    if (direction == 'UP') {
        snake[0].y--;
    }
    if (direction == 'RIGHT') {
        snake[0].x++;
    }
    if (direction == 'DOWN') {
        snake[0].y++;
    }
}
function keyDown(e) {
    if (e.keyCode == 37) {
        direction = 'LEFT';
    }
    if (e.keyCode == 38) {
        direction = 'UP';
    }
    if (e.keyCode == 39) {
        direction = 'RIGHT';
    }
    if (e.keyCode == 40) {
        direction = 'DOWN';
    }
}