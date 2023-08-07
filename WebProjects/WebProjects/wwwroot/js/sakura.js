var canvasObject = {
    canvas: document.getElementById("containerCanvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(redrawCanvas, 30);
    },
    clear: function () {
        this.context = this.canvas.getContext("2d");
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function initCanvas() {
    canvasObject.start();
    drawSakura();
    drawCircle();
}

function redrawCanvas() {
    canvasObject.clear();
    drawSakura();
    drawCircle();
}

var circleDiameter = 20;
var circle2Diameter = 180;
var expand = true;

function drawCircle() {
    ctx = canvasObject.context;
    ctx.save();
    ctx.strokeStyle = "#34aeeb";
    ctx.lineWidth = 4;
    ctx.beginPath();
    // canvas size is  and 400, 225 and 200 would be the center of the canvas
    ctx.arc(225, 200, circleDiameter, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(225, 200, circle2Diameter, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();

    if (expand) {
        circleDiameter += 5
        circle2Diameter -= 5
    } else {
        circleDiameter -= 5;
        circle2Diameter += 5;

    }

    if (circleDiameter >= 180) {
        expand = false;
    } else if (circleDiameter <= 10) {
        expand = true;
    }
}

function drawSakura() {
    ctx = canvasObject.context;
    ctx.save();
    // left
    ctx.beginPath();
    ctx.moveTo(100, 175);
    ctx.bezierCurveTo(100, 215, 200, 175, 200, 175);
    ctx.moveTo(100, 175)
    ctx.bezierCurveTo(100, 115, 200, 175, 200, 175);

    // right
    ctx.moveTo(350, 175);
    ctx.bezierCurveTo(350, 225, 250, 175, 250, 175);
    ctx.moveTo(350, 175)
    ctx.bezierCurveTo(350, 125, 250, 175, 250, 175);

    // top
    ctx.moveTo(225, 60);
    ctx.bezierCurveTo(225, 60, 275, 60, 225, 150);
    ctx.moveTo(225, 60)
    ctx.bezierCurveTo(225, 60, 175, 60, 225, 150);
    ctx.stroke();

    ctx.fillStyle = "#db799d";
    ctx.fill();
    ctx.restore();

    // bottom left
    ctx.save();
    ctx.beginPath();
    ctx.rotate(-25 * Math.PI / 180);
    ctx.moveTo(-10, 335);
    ctx.bezierCurveTo(-10, 375, 100, 290, 100, 290);
    ctx.moveTo(-10, 335)
    ctx.bezierCurveTo(-10, 275, 100, 290, 100, 290);
    ctx.stroke();
    ctx.fillStyle = "#db799d";
    ctx.fill();
    ctx.restore();

    // bottom right
    ctx.save();
    ctx.beginPath();
    ctx.rotate(20 * Math.PI / 180);
    ctx.moveTo(400, 175);
    ctx.bezierCurveTo(400, 225, 300, 125, 300, 125);
    ctx.moveTo(400, 175)
    ctx.bezierCurveTo(400, 115, 300, 125, 300, 125);
    ctx.stroke();
    ctx.fillStyle = "#db799d";
    ctx.fill();
    ctx.restore();
}

$(document).ready(function () {
    initCanvas();
});