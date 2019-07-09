alert("this is version 6");
/* define valuable */
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
canvas.setAttribute("width", window.parent.screen.width);
canvas.setAttribute("height", window.parent.screen.height);
var drawing = false;
var oldPos;
context.strokeStyle = "#000000";
context.lineWidth = 5;
context.lineJoin = "round";
context.lineCap = "round";

/* define function */
function scrollX() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
}

function scrollY() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}

function getPosT(event) {
    var mouseX = event.clientX ;
    var mouseY = event.clientY;
    return { x: mouseX, y: mouseY };
}

// tap start
canvas.addEventListener("mousedown"||"touchstart", function (event) {
    drawing = true;
    oldPos = getPosT(event);
}, false);

/* event listebers */
canvas.addEventListener("mousemove"||"touchmove", function (event) {
    alert("touch moving");
    var pos = getPosT(event);
    if (drawing) {
        var pos = getPosT(event);
        context.beginPath();
        context.moveTo(oldPos.x, oldPos.y);
        context.lineTo(pos.x, pos.y);
        context.stroke();
        context.closePath();
        oldPos = pos;
    }
}, false);


// tap fin
canvas.addEventListener("mouseup"||"touchend", function () {
    drawing = false;
}, false);

