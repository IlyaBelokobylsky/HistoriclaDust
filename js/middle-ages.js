function initMiddleAges() {
    const btnsArr = Array.from(document.querySelectorAll('.slider-btn')),
        imgParentElem = document.querySelector('.slider-images'),
        positionParent = document.querySelector('.slider-position');

    function changeIMG(currentPosition, beforeActiveIMG) {
        const beforeActiveInFuture = Array.from(imgParentElem.querySelectorAll('.active-in-future'));
        
        beforeActiveInFuture.forEach(function(item) {
            item.classList.remove('active-in-future');
            item.classList.remove('visible-img');
        });
        beforeActiveIMG.classList.remove('active-img');
        beforeActiveIMG.classList.remove('visible-img');

        const currentActiveIMG = imgParentElem.children[currentPosition];
        currentActiveIMG.classList.add('visible-img');
        currentActiveIMG.classList.add('active-img');
        if (currentActiveIMG.nextElementSibling) {
            currentActiveIMG.nextElementSibling.classList.add('visible-img');
            currentActiveIMG.nextElementSibling.classList.add('active-in-future');
        }
        if (currentActiveIMG.previousElementSibling) {
            currentActiveIMG.previousElementSibling.classList.add('visible-img');
            currentActiveIMG.previousElementSibling.classList.add('active-in-future');
        }

        // chnage slider position
        document.querySelector('.slider-position__active').classList.remove('slider-position__active');
        positionParent.children[currentPosition].classList.add('slider-position__active');
    }
    btnsArr.forEach(function(item) {
        item.addEventListener('click', function(event) {
            const btn = event.target.closest('.slider-btn'),
            beforeActive = imgParentElem.querySelector('.active-img');

            
            let currentPos = +beforeActive.dataset.position + +btn.dataset.direction;
            if (currentPos === imgParentElem.children.length) {
                currentPosition = 0;
            } else if(currentPos < 0) {
                currentPos = imgParentElem.children.length - 1;
            }
            changeIMG(currentPos, beforeActive)
        })
    });
    positionParent.addEventListener('click', function(event) {
        if (!event.target.closest('li')) return;
        const clickedPos = event.target.closest('li').classList[0].slice(17),
            beforeActive = imgParentElem.querySelector('.active-img');

        changeIMG(clickedPos, beforeActive);
    });
}
window.addEventListener('load', initMiddleAges);