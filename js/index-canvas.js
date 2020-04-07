function initIndexCanvas() {
    const canvas = document.querySelector('.canvas-header'),
        ctx = canvas.getContext('2d'),
        fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize),
        vw = document.documentElement.clientWidth / 100,
        vh = document.documentElement.clientHeight / 100;
    
    canvas.width = 100 * vw;
    canvas.height = 100 * vh;
}
// window.addEventListener('load', initIndexCanvas)