var canvasObject = {
    canvas: document.getElementById("containerCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(redrawCanvas, 1000);
    },
    clear: function () {
        this.context = this.canvas.getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function initCanvas() {
    canvasObject.start();
    drawHeart();
}

function redrawCanvas() {
    canvasObject.clear();
    drawHeart();
}

const colorArray = ["black", "blue", "blue_gray", "dark_teal", "gold", "light_gray", "pink", "purple"];
const imageSize = 25;

function drawHeart() {
    ctx = canvasObject.context;
    let startx = 165;
    let rowx = startx;
    let rowy = 250;
    let subrowx = 0;
    let subrowy = 0;
    for (var i = 0; i < 6; i++)
    {
        subrowx = rowx;
        subrowy = rowy;
        let subrowCount = rowx <= startx - 75 ? 3 : 6;
        for (var j = 0; j < subrowCount; j++) {
            subrowx = subrowx + 25;
            subrowy = subrowy - 25;
            let color = colorArray[Math.floor(Math.random() * 8)];
            let img = document.getElementById(color);
            ctx.drawImage(img, subrowx, subrowy);
        }
        rowx = rowx - 25;
        rowy = rowy - 25;
    }
}

$(document).ready(function () {
    initCanvas();
});