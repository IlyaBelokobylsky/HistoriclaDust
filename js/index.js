'use strict';
const sectionsElem = document.querySelector('.sections'),
    btnDown = document.querySelector('.arrow-down-btn'),
    timeStraightElem = document.querySelector('.time-straight'),
    clientCenterX = document.documentElement.clientWidth / 2,
    clientCenterY = document.documentElement.clientHeight / 2;


btnDown.onclick = () => sectionsElem.scrollIntoView({
    block: "start",
    behavior: "smooth"
});



// SWIPER
let periodsObj = {
    ancient: {name: 'ancient'},
    antiquity: {name: 'antiquity'},
    'middle-ages': {name: 'middle-ages'},
    'new-time': {name: 'new-time'},
    modern: {name: 'modern'}
}

let periodsIdent = 0;
for (let key in periodsObj){
    const item = periodsObj[key];

    item.color = getComputedStyle(document.documentElement).getPropertyValue(`--first-color-${item.name}`);
    item.fontColor = getComputedStyle(document.documentElement).getPropertyValue(`--font-color-${item.name}`);
    item.element = timeStraightElem.querySelector(`.${item.name}`);
    item.width = parseFloat(getComputedStyle(item.element).width);
    item.left = periodsIdent;

    periodsIdent += item.width;
}


function swipeToElement(elem, currentElemObj) {
    // change picture
    // just || 0 doesn't working
    if (!sectionsElem.style.left) sectionsElem.style.left = '0px'
    const _parentLeftBefore = parseFloat(sectionsElem.style.left);
    elem.left = elem.getBoundingClientRect().left; // < 0
    sectionsElem.style.left = _parentLeftBefore - elem.left + "px";
    elem.style.filter = "";

    // change focus position
    const periodFocus = document.querySelector('.period-focus');

    timeStraightElem.style.setProperty('--time-color', currentElemObj.color);
    timeStraightElem.style.setProperty('--font-color', currentElemObj.fontColor)
    periodFocus.style.left = `${currentElemObj.left}px`;
    periodFocus.style.width = `${currentElemObj.width}px`;


    // text above straight
    [].forEach.call(document.querySelector('.time-straight__periods').children, function(item) {
        if (item !== currentElemObj.element) {
            item.classList.add('hidden');
            item.classList.remove('visible');
        }
    })
    
    currentElemObj.element.classList.add('visible');
    currentElemObj.element.classList.remove('hidden');


    // next color (for gradient)
    if (currentElemObj.element.nextElementSibling) { // for modern period
        const nextPeriodObj = periodsObj[currentElemObj.element.nextElementSibling.classList[0]];
        timeStraightElem.style.setProperty('--next-time-color', nextPeriodObj.color);
    } else {
        timeStraightElem.style.setProperty('--next-time-color', '#CA2C92');
    }
}

const swiper = {
    periods: periodsObj,
    direction: 0, // 0 - nothing, -1 - left, 1 - right
    start(event) {
        this.period = event.target.closest('.time-period');
        event.type == 'mousedown' ? this.clientXBefore = event.clientX : this.clientXBefore = event.changedTouches[0].clientX;
        this.periodPosition = +this.period.dataset.number;
    },
    
    move(event) {
        let _clientXAfter
        event.type == 'mousemove' ? _clientXAfter = event.clientX : _clientXAfter = event.changedTouches[0].clientX;

        const _blur = parseFloat(this.period.style.filter.slice(5)) || 0;
        _clientXAfter < this.clientXBefore ? this.direction = 1 : this.direction = -1;
        this.period.style.filter = `blur(${
            Math.abs((_blur + _clientXAfter - this.clientXBefore) / 125)
        }px)`;
    },
    end() {
        const nextPeriod = document.querySelector(`.period-${this.periodPosition + this.direction}`);
        if (nextPeriod) {
            const currentPeriodObj = this.periods[document.querySelector(`.time-straight__period-${this.periodPosition + this.direction}`).classList[0]];
            swipeToElement(nextPeriod, currentPeriodObj);
            setTimeout(() => this.period.style.filter = "", 1000) // for future
        } else {
            this.period.style.filter = "";
        }
    }
};

sectionsElem.ondragstart = () => false; // prevent default drag'n'drop

sectionsElem.addEventListener("mousedown", function (event) {
    if (!event.target.classList.contains('goto-period')) {
        event.preventDefault();
    }
    let mouseSwiper = Object.create(swiper);
    mouseSwiper.start(event);

    const onMouseMove = e => mouseSwiper.move(e);
    
    document.addEventListener("mousemove", onMouseMove);

    document.onmouseup = function () {
        mouseSwiper.end();
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
    };
});


sectionsElem.addEventListener("touchstart", function (event) {
    let touchSwiper = Object.create(swiper);
    touchSwiper.start(event);

    const onTouchMove = e => touchSwiper.move(e); 
    
    document.addEventListener("touchmove", onTouchMove);

    document.ontouchend = function () {
        touchSwiper.end();
        document.removeEventListener("touchmove", onTouchMove);
        document.ontouchend = null;
    };
});



// TIME STRAIGHT
let timeStraightObj = {
    periods: periodsObj,
    moveToPeriod(event) {
        const posOnStraight = event.clientX - parseFloat(getComputedStyle(timeStraightElem).marginLeft);
        for(let key in this.periods) {
            const item = this.periods[key]
            const _temp = posOnStraight - item.left;
            if (_temp <= item.width && _temp >= 0) {
                const nextPeriod = document.querySelector(`.period-${item.element.dataset.number}`),
                    previousPeriod = document.elementFromPoint(clientCenterX, clientCenterY).closest('.time-period'),
                    previousStraightPeriod = document.querySelector(`.time-straight__period-${previousPeriod.dataset.number}`);
                swipeToElement(nextPeriod, item)
                
                
                break; // for perfomance
            }
        }
    }
}
timeStraightElem.addEventListener('click', e => timeStraightObj.moveToPeriod(e))