function initMain() {
    const hamburger = document.querySelector('.hamburger');
        
    let subperiodsNamesArr = [];
    // for antiquity time
    [].forEach.call(document.querySelectorAll('.subperiods-names'), function(item) {
        subperiodsNamesArr.push(item.querySelectorAll('li'))
    });

    for(let key of subperiodsNamesArr) {
        [].forEach.call(key, function(item) {
            item.addEventListener('click', function(event) {
                const target = event.target.closest('li'),
                    beforeTarget = target.parentNode.querySelector('.subperiods-names__active'),
                    currentElem = target.closest('.list-wrapper').querySelectorAll('.' + target.classList[0])[1],
                    beforeElem = target.closest('.list-wrapper').parentNode.querySelectorAll('.' + beforeTarget.classList[0])[1]
                if(target.classList == beforeTarget.classList) return;

                beforeTarget.classList.remove('subperiods-names__active');
                target.classList.add('subperiods-names__active');

                let margin;
                document.documentElement.clientWidth < 993 ? margin = 10.33 : margin = 21;
                beforeElem.style.left = `${margin}rem`;
                currentElem.style.left = `0`;
            });
        });
    }
}
window.addEventListener('load', initMain)