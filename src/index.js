alert("this is version 11");
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



var el_eventname = document.getElementById('eventname');
var updateEventname = function(eventname) {
    el_eventname.innerHTML = eventname;
  };

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
canvas.addEventListener("mousedown", function (event) {
    updateEventname('start');
    drawing = true;
    oldPos = getPosT(event);
}, false);
canvas.addEventListener("touchstart", function (event) {
    updateEventname('start');
    drawing = true;
    oldPos = getPosT(event);
}, false);

/* event listebers */
canvas.addEventListener("mousemove", function (event) {
    updateEventname('move');
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
canvas.addEventListener("touchmove", function (event) {
    event.preventDefault();
    var pos = getPosT(event);
    updateEventname(pos);
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
    updateEventname('end');
    drawing = false;
}, false);
canvas.addEventListener("touchend", function () {
    updateEventname('end');
    drawing = false;
}, false);
