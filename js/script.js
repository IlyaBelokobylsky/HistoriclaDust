'use strict';
const sectionsElem = document.querySelector('.sections'),
    btnDown = document.querySelector('.arrow-down-btn'),
    centerX = document.documentElement.clientWidth / 2,
    centerY = document.documentElement.clientHeight / 2,
    Ø = Object.create(null); // DMZ-object

btnDown.onclick = () => sectionsElem.scrollIntoView({
    block: "start",
    behavior: "smooth"
});



// SWIPER
function onSwiperMove(e, period, clientXBefore, direction) {
    let clientXAfter
    e.type == 'mousemove' ? clientXAfter = e.clientX : clientXAfter = e.changedTouches[0].clientX;

    const blur = parseFloat(period.style.filter.slice(5)) || 0;
    clientXAfter < clientXBefore ? (direction = 1) : (direction = -1);
    period.style.filter = `blur(${
        Math.abs((blur + clientXAfter - clientXBefore) / 125)
    }px)`;
    return direction;
}

function dragEndSwiper(period, periodPosition, direction) {
    const nextPeriod = document.querySelector(`.period-${periodPosition + direction}`);
    if (nextPeriod) {
        // just || 0 doesn't working
        if (!sectionsElem.style.left) sectionsElem.style.left = '0px'
        let parentLeftBefore = parseFloat(sectionsElem.style.left);
        nextPeriod.left = -nextPeriod.getBoundingClientRect().left;
        sectionsElem.style.left = parentLeftBefore + nextPeriod.left + "px";
        nextPeriod.style.filter = "";

        setTimeout(() => period.style.filter = "", 1000) // for future
    } else {
        period.style.filter = "";
    }
}


sectionsElem.ondragstart = () => false;

sectionsElem.addEventListener("mousedown", function (event) {
    const period = event.target.closest('.time-period'),
        clientXBefore = event.clientX,
        periodPosition = +period.dataset.number;
    // 0 - nothing, -1 - left, 1 - right
    let direction = 0;

    function onMouseMove(e) {
        onSwiperMove(e, period, clientXBefore, direction);
        direction = onSwiperMove(e, period, clientXBefore, direction); // remaking direction
    }
    
    document.addEventListener("mousemove", onMouseMove);

    document.onmouseup = function () {
        dragEndSwiper(period, periodPosition, direction)
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
    };
});


sectionsElem.addEventListener("touchstart", function (event) {
    const period = event.target.closest('.time-period'),
        clientXBefore = event.changedTouches[0].clientX,
        periodPosition = +period.dataset.number;
    // 0 - nothing, -1 - left, 1 - right
    let direction = 0;

    function onTouchMove(e) {
        onSwiperMove(e, period, clientXBefore, direction);
        direction = onSwiperMove(e, period, clientXBefore, direction); // remaking direction
    }
    
    document.addEventListener("touchmove", onTouchMove);

    document.ontouchend = function () {
        dragEndSwiper(period, periodPosition, direction)
        document.removeEventListener("mousemove", onTouchMove);
        document.ontouchend = null;
    };
});