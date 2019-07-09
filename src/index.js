alert("this is version 20");
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
var updateEventname1 = function(eventname) {
    el_eventname.innerHTML = eventname.x;
  };
var el_eventname = document.getElementById('eventname');
var updateEventname2 = function(eventname) {
    var touch = eventname.changedTouches[0];
    var x = touch.pageX;
    el_eventname.innerHTML = x;
   };

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
    var xpos = touch.pageX;
    var ypos = touch.pageY;
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
    updateEventname1(pos);
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
    updateEventname1("moving");
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
