const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
function makeWheel(){
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
            pattern = ctx.createPattern(backImage, 'no-repeat');
            
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
};
window.addEventListener('load', makeWheel);
const informationArr = Array.from(document.querySelector('.over-wheel-sections').children);
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
document.querySelector('.wheel-buttons').style.marginTop = `${marginTop + fontSize * 3}px`;
console.log(wheelElem.style.marginTop)