/* define valuable */
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');
canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);
var drawing = false;
var oldPos;
var posy=0;
context.strokeStyle = "#000000";
context.lineWidth = 2;
context.lineJoin = "round";
context.lineCap = "round";



/* define function */
function scrollX() {
    return document.documentElement.scrollLeft || document.body.scrollLeft;
}

function scrollY() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}

function getPosM(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    return { x: mouseX, y: mouseY };
}

function getPosT(eventname) {
    var touch = eventname.changedTouches[0];
    var xpos = touch.pageX - canvas.offsetLeft - 2;
    var ypos = touch.pageY - canvas.offsetTop - 2;
    return { x: xpos, y: ypos };
}

// tap start
canvas.addEventListener("mousedown", function (event) {
    drawing = true;
    oldPos = getPosM(event);

}, false);
canvas.addEventListener("touchstart", function (event) {
    oldPos = getPosT(event);
    if (event.touches[0].touchType == "stylus") {
        drawing = true;
    }
    else if (event.touches[0].touchType == "direct") {
        drawing = false;
    }

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

        var pos = getPosT(event);
        if (drawing) {
        context.beginPath();
        context.moveTo(oldPos.x, oldPos.y);
        context.lineTo(pos.x, pos.y);
        context.stroke();
        context.closePath();
        
        }else{
            posy=posy+pos.x-oldPos.x;
        }
        oldPos = pos;
}, { passive: false });

// tap fin
canvas.addEventListener("mouseup", function () {
    drawing = false;
}, false);
canvas.addEventListener("touchend", function () {
    alert(posy)
    if(posy>=70){
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    posy=0;
    drawing = false;
}, false);


/* Pressurejs */
Pressure.set('#myCanvas', {
    start: function (event) {
    },
    end: function () {
    },
    startDeepPress: function (event) {
    },
    endDeepPress: function () {
    },
    change: function (force, event) {
        context.lineWidth = 3 ** (force);
    },
    unsupported: function () {
    }
});


