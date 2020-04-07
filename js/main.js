function initMain() {
    const hamburger = document.querySelector('.hamburger'),
        header = document.querySelector('header'),
        navList= document.querySelector('.navigation');
    
    function toggleHeader() {
        hamburger.classList.toggle('menu-clicked');
        header.classList.toggle('header-visible');
    }
    hamburger.addEventListener('click', toggleHeader);
    navList.addEventListener('click', function(event) {
        const link = event.target.closest('.nav__link');
        if (!link || link.classList[1] === 'return-link') return;
        event.preventDefault();
        const elemByLink = document.querySelector(`.${link.getAttribute('href')}`)
        toggleHeader();
        setTimeout(() => elemByLink.scrollIntoView({block: 'start', behavior: 'smooth'}), 500);
    })

    const sections = Array.from(document.querySelectorAll('section'));

    sections.forEach(function(item) {
        let navElem = document.createElement('a');
        navElem.className = 'nav__link';
        navElem.innerText = item.dataset.name;
        navElem.setAttribute('href', item.className) // wo #, because serch will be made by class name
        navList.append(navElem);
        navList.append(document.createElement('br'));
    })
    

    // click on subperiods names
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