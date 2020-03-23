const loader = document.querySelector('.loader'),
    fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);


window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


let loaderCanvas = document.querySelector('.loading-object'),
    loaderCtx = loaderCanvas.getContext('2d');

// background
function makeArc(x, y, r, hasStroke) {
    loaderCtx.beginPath();
    loaderCtx.fillStyle = '#f0f0f0';
    loaderCtx.arc(x, y, r, 0, Math.PI * 2);
    loaderCtx.fill();
    if (hasStroke) {
        loaderCtx.strokeStyle = '#333333';
        loaderCtx.lineWidth = 5;
        loaderCtx.stroke();
    }
    loaderCtx.closePath();
}
makeArc(250, 250, 200, true)


// dot at the center
loaderCtx.beginPath();
loaderCtx.fillStyle = 'black';
loaderCtx.arc(250, 250, 5, 0, Math.PI * 2);
loaderCtx.fill()


// numbers
for (let i = 12, j = 0; i > 0; i--, j++) {
    const currentAngle = Math.PI / 2 + Math.PI / 6 * j,
        radius = 180;
    loaderCtx.beginPath();
    loaderCtx.fillStyle = 'black';
    loaderCtx.font = `normal ${fontSize * 1.5}px Russo One`;
    loaderCtx.fillText(i, Math.cos(currentAngle) * radius + 237.5, -Math.sin(currentAngle) * radius + 265);
    loaderCtx.closePath();
}


// arrows
loaderCtx.strokeStyle = 'black';
loaderCtx.lineCap = 'round';


function buildArrow(arrow) {

    loaderCtx.save();
    loaderCtx.beginPath();

    loaderCtx.translate(250, 250);
    const rads = arrow.speed * arrow.counter * Math.PI / 180;
    loaderCtx.rotate(rads);

    loaderCtx.lineWidth = arrow.width;
    loaderCtx.moveTo(0, 0);
    loaderCtx.lineTo(0, arrow.length);
    
    loaderCtx.stroke();
    loaderCtx.translate(-250, -250);
    loaderCtx.restore();
    arrow.counter > 360 ? arrow.counter = 1 : arrow.counter++;
}

// hours
let hoursArrow = {
    length: 80,
    width: 10,
    speed: 3,
    counter: 1,
    build: () => buildArrow(hoursArrow) 
};

// minutes
let minutesArrow = {
    length: 140,
    width: 5,
    speed: 18, 
    counter: 1,
    build: () => buildArrow(minutesArrow)
};
function animateArrows(cb1, cb2) {
    makeArc(250, 250, minutesArrow.length + 5, false);
    const animate = () => animateArrows(cb1, cb2);
    window.requestAnimFrame(animate);
    cb1();
    cb2();
}
animateArrows(minutesArrow.build, hoursArrow.build);


window.onload = function() {
    loader.classList.remove('visible');
    loader.classList.add('hidden');
    setTimeout('loader.style.display = none', 1000)
}