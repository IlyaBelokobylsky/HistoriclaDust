(function () { // prevent mixing of  scopes
    document.documentElement.style.overflowY = 'hidden';

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


    let cvs = document.querySelector('.loading-object'),
        ctx = cvs.getContext('2d');

    // background
    function makeArc(x, y, r, hasStroke) {
        ctx.beginPath();
        ctx.fillStyle = '#f0f0f0';
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        if (hasStroke) {
            ctx.strokeStyle = '#222222';
            ctx.lineWidth = 5;
            ctx.stroke();
        }
        ctx.closePath();
    }
    makeArc(250, 250, 200, true)


    // dot at the center
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(250, 250, 5, 0, Math.PI * 2);
    ctx.fill()


    // numbers
    for (let i = 12, j = 0; i > 0; i--, j++) {
        const currentAngle = Math.PI / 2 + Math.PI / 6 * j,
            radius = 175;
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.font = `normal ${fontSize * 1.5}px Russo One`;
        ctx.fillText(i, Math.cos(currentAngle) * radius + 237.5, -Math.sin(currentAngle) * radius + 265);
        ctx.closePath();
    }


    // arrows
    ctx.strokeStyle = 'black';
    ctx.lineCap = 'round';


    function buildArrow(arrow) {

        ctx.save();
        ctx.beginPath();

        ctx.translate(250, 250);
        const rads = arrow.speed * arrow.counter * Math.PI / 180;
        ctx.rotate(rads);

        ctx.lineWidth = arrow.width;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, arrow.length);

        ctx.stroke();
        ctx.translate(-250, -250);
        ctx.restore();
        arrow.counter > 360 ? arrow.counter = 1 : arrow.counter++;
    }

    // hours
    let hoursArrow = {
        length: 75,
        width: 10,
        speed: 3,
        counter: 1,
        build: () => buildArrow(hoursArrow)
    };

    // minutes
    let minutesArrow = {
        length: 135,
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

    window.onload = function () {
        loader.classList.remove('visible');
        loader.classList.add('hidden');
        setTimeout(function() {
            loader.style.display = "none";
            document.documentElement.style.overflowY = 'visible';
        }, 1000)
    }
})();
