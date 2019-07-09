alert("this is version 29");
/* define valuable */
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
canvas.setAttribute("width", document.body.scrollHeight);
canvas.setAttribute("height", document.body.scrollWidth );
var drawing = false;
var oldPos;
context.strokeStyle = "#000000";
context.lineWidth = 2;
context.lineJoin = "round";
context.lineCap = "round";

alert(document.body.scrollHeight)
alert(document.body.scrollWidth)


/* define function */
function scrollX() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
}

function scrollY() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}

function getPosM(event) {
    var mouseX = event.clientX ;
    var mouseY = event.clientY;
    return { x: mouseX, y: mouseY };
}

function getPosT(eventname){
    var touch = eventname.changedTouches[0];
    var xpos = touch.pageX - canvas.offsetLeft-2;
    var ypos = touch.pageY - canvas.offsetTop-2;
    return { x: xpos, y: ypos };
}

// tap start
canvas.addEventListener("mousedown", function (event) {
    drawing = true;
    oldPos = getPosM(event);
}, false);
canvas.addEventListener("touchstart", function (event) {
    drawing = true;
    oldPos = getPosT(event);
}, false);

/* event listebers */
canvas.addEventListener("mousemove", function (event) {
    var pos = getPosM(event);
    if (drawing) {
        var pos = getPosM(event);
        context.beginPath();
        context.moveTo(oldPos.x, oldPos.y);
        context.lineTo(pos.x, pos.y);
        context.stroke();
        context.closePath();
        oldPos = pos;
    }
}, false);
canvas.addEventListener("touchmove", function (event) {
    event.preventDefault();
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
},  {passive: false});

// tap fin
canvas.addEventListener("mouseup", function () {
    drawing = false;
}, false);
canvas.addEventListener("touchend", function () {
    drawing = false;
}, false);
