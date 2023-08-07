var canvasObject = {
    canvas: document.getElementById("containerCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(redrawGame, 10);
    },
    clear: function () {
        this.context = this.canvas.getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var dot;
var snakeArray = [];
var pixelSize = 13;
var snakeColor = "#34aeeb";
var snakeArrayLength = 4;
var canvasSize = 450;

function startGame() {
    canvasObject.start();
    initSnake(100, 200);
    generateDot();
}
function redrawGame() {
    canvasObject.clear();
    dot.update();
    moveSnake();
}

function generateDot() {
    var x = (Math.random() * canvasSize) + 1;
    var y = (Math.random() * canvasSize) + 1;
    // check for snakeArray collision
    while (true) {
        var result = snakeArray.find(e => (x >= e.x && x <= e.x + pixelSize) || (y >= e.y && y <= e.y + pixelSize));
        if (typeof result !== 'undefined') {
            x = (Math.random() * canvasSize) + 1;
            y = (Math.random() * canvasSize) + 1;
        } else {
            break;
        }
    };
    // making it so it fits on a grid
    var remainderX = x % pixelSize;
    var remainderY = y % pixelSize;
    if (remainderX > 0) {
        x += remainderX;
    }
    if (remainderY > 0) {
        y += remainderY;
    }
    // subtracting height and width so it doesn't go out of bounds
    if (x > canvasSize - pixelSize) {
        x = canvasSize - pixelSize;
    }
    if (y > canvasSize - pixelSize) {
        y = canvasSize - pixelSize;
    }
    if (typeof dot === 'undefined') {
        dot = new component(pixelSize, pixelSize, "white", x, y);
    } else {
        dot.newPos(x, y);
        dot.update();
    }
}

function initSnake(snakex, snakey) {
    for (var i = 0; i < snakeArrayLength; i++) {
        snakeArray.push(new component(pixelSize, pixelSize, snakeColor, snakex, snakey));
        // y will be the same at first
        snakex -= pixelSize;
    }
}

function updateSnake(snakex, snakey) {
    for (var i = 0; i < snakeArrayLength; i++) {
        // subtracting the pixel size because in moveSnake() it's only increased by 1
        let oldSnakex = snakeArray[i].x;
        let oldSnakey = snakeArray[i].y;
        // it moves either on the x or y axis
        if (snakex != oldSnakex) {
            oldSnakex -= pixelSize + 1;
        } else if (snakey != oldSnakey) {
            oldSnakey += pixelSize;
        }
        snakeArray[i].newPos(snakex, snakey);
        snakeArray[i].update();
        snakex = oldSnakex;
        snakey = oldSnakey;
    }
}

function moveSnake() {
    var dotx = dot.x;
    var doty = dot.y;
    var snakex = snakeArray[0].x;
    var snakey = snakeArray[0].y;
    // left = this.x;
    // right = this.x + (this.width);
    // top = this.y;
    // bottom = this.y + (this.height);
    if (dotx > snakex && dotx + pixelSize > snakex) {
        snakex += 1;
    } else if (doty > snakey && doty + pixelSize > snakey) {
        snakey += 1;
    } else if (dotx < snakex && dotx + pixelSize < snakex) {
        snakex -= 1;
    } else if (doty < snakey && doty + pixelSize < snakey) {
        snakey -= 1;
    }
    // check for collision 
    if ((dotx >= snakex - pixelSize && dotx <= snakex + pixelSize) && (doty >= snakey - pixelSize && doty <= snakey + pixelSize)) {
        // this didn't work and decided it doesn't need to work
        // var newSnakex = snakeArray[snakeArrayLength - 1].x - pixelSize;
        // var newSnakey = snakeArray[snakeArrayLength - 1].y;
        // snakeArray.push(new component(pixelSize, pixelSize, snakeColor, newSnakex, newSnakey));
        generateDot();
    } else {
        dot.update();
    }
    updateSnake(snakex, snakey);
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = canvasObject.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    this.update = function () {
        ctx = canvasObject.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function (newx, newy) {
        this.x = newx;
        this.y = newy;
    }
}

$(document).ready(function () {
    startGame();
});
