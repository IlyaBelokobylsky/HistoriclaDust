function initCanvasWheel() {
    const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    'use strict';
    const wheel = document.querySelector('.canvas-wheel'),
        infoFromArr = document.querySelector('.for-canvas-wheel').children,
        ctx = wheel.getContext('2d');
    wheel.height = fontSize * 25;
    wheel.width = fontSize * 25;

    const ANGLE = 2 * Math.PI / infoFromArr.length;
    let angleBefore = ANGLE / 2 - Math.PI / 2;


    for(let i = 0, j = infoFromArr.length - 1; i < infoFromArr.length; i++, j--) {
        ctx.save();

        const endAngle = ANGLE + angleBefore;
            

        // make the circle
        const backImage = infoFromArr[i].querySelector('.background-image'),
            pattern = ctx.createPattern(backImage, 'repeat');
            
        ctx.save();
        // make the cirlce
        ctx.beginPath(); 
        ctx.moveTo(wheel.width / 2, wheel.height / 2); 
        ctx.lineTo(wheel.width / 2, wheel.height / 2); 
        ctx.arc(wheel.width / 2, wheel.height / 2, wheel.width / 2 - 25, angleBefore, endAngle);
        ctx.filter = "blur(5px) brightness(50%)";
        ctx.fillStyle = pattern;
        ctx.fill()

        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.stroke();

        ctx.restore();
        ctx.save();
        // make the text
        const title = infoFromArr[i].querySelector('.canvas-title').innerText,
            textHTML = infoFromArr[i].querySelector('.canvas-text').innerText;
            
        ctx.translate(wheel.width / 2 + Math.cos((angleBefore + endAngle) / 2) * (wheel.width / 2 - fontSize * 4), wheel.height / 2 + Math.sin((angleBefore + endAngle) / 2) * (wheel.height / 2 - fontSize * 4));
        ctx.rotate(-ANGLE*j)
        ctx.fillStyle = 'white';
        
        ctx.font = `${fontSize * 2}px Russo One`;
        ctx.textAlign = 'center';
        ctx.fillText(title, 0, 30)

        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--font-color-light');
        ctx.font = `${fontSize * .75}px Russo One`;
        ctx.textAlign = 'center';

        const lineSize = 10 * fontSize,
            lineHeight = 1.25 * fontSize;
        let text = '',
            marginTop = fontSize * 3.5;
        // divide the text to lines
        [].forEach.call(textHTML.split(' '), function(item) {
            let textLine = text + item + ' ',
                textWidth = ctx.measureText(textLine).width;
            if (textWidth > lineSize) {
                ctx.fillText(text, 0, marginTop);
                text = item + " ";
                marginTop += lineHeight;
            }
            else {
                text = textLine;
            }
        });
        ctx.fillText(text, 0, marginTop);

        ctx.restore();
        angleBefore += ANGLE;
        ctx.restore();
    }

    const buttons = Array.from(document.querySelectorAll('.wheel-btn')),
        informationArr = Array.from(document.querySelector('.over-wheel-sections').children);
    if (document.documentElement.clientWidth < 993) {
        // make margin-top for wheel and buttons,
        // because information elems have position
        // absolute
        let marginTop = 0;
        informationArr.forEach((item, index) => {
            let heightBefore = 0;
            informationArr[index+1] ?
            heightBefore = parseFloat(getComputedStyle(informationArr[index+1]).height) :
            heightBefore = 0;
            parseFloat(getComputedStyle(item).height) > heightBefore ?
            marginTop =  parseFloat(getComputedStyle(item).height) :
            marginTop = heightBefore;
        });
        document.querySelector('.wheel-buttons').style.marginTop = `${marginTop + fontSize * 3.5}px`;
    }


    // slide information
    buttons.forEach(function(item) {
        item.addEventListener('click', function(event) {
            const btn = event.target.closest('.wheel-btn'),
                direction = +btn.dataset.direction,
                rotateBefore = parseFloat(wheel.style.transform.slice(7)) || 0;
            wheel.style.transform = `rotate(${direction * ANGLE + rotateBefore}rad)`;
            
            let posAfter = +wheel.dataset.position - direction;
            if (posAfter == informationArr.length) posAfter = 0;
            else if (posAfter < 0) posAfter = informationArr.length - 1;
            const visibleBefore = informationArr[wheel.dataset.position],
                visibleAfter = informationArr[posAfter];
            visibleBefore.classList.remove('visible');
            visibleBefore.classList.add('hidden');

            visibleAfter.classList.remove('hidden');
            visibleAfter.classList.add('visible');
            wheel.dataset.position = posAfter;
        })
    })
}
window.addEventListener('load', initCanvasWheel);