'use strict';
(function () { // prevent mixing of  scopes
    document.documentElement.style.overflowY = 'hidden';

    const loader = document.querySelector('.loader'),
        fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);



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


    function buildArrow() {
        ctx.save();
        ctx.beginPath();

        ctx.translate(250, 250);
        const rads = this.speed * this.counter * Math.PI / 180;
        ctx.rotate(rads);

        ctx.lineWidth = this.width;
        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.length);

        ctx.stroke();
        ctx.translate(-250, -250);
        ctx.restore();
        this.counter > 360 ? this.counter = 1 : this.counter++;
    }

    // hours
    let hoursArrow = {
        length: 75,
        width: 12.5,
        speed: 3,
        counter: 180
    };

    // minutes
    let minutesArrow = {
        length: 135,
        width: 7.5,
        speed: 18,
        counter: 180
    };

    function animateArrows(cb1, cb2) {
        makeArc(250, 250, minutesArrow.length + 5, false);
        const animate = () => animateArrows(cb1, cb2);
        window.requestAnimationFrame(animate);
        cb1();
        cb2();
    }
    animateArrows(buildArrow.bind(hoursArrow), buildArrow.bind(minutesArrow));
    window.addEventListener('load', function(){
        loader.classList.remove('visible');
        loader.classList.add('hidden');
        setTimeout(function() {
            loader.style.display = "none";
            document.documentElement.style.overflowY = 'visible';
        }, 1000)
    })
})();
