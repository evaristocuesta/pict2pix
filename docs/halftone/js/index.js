const imagejh = document.getElementById('image-jh');

window.onload = function initialize() {
    pict2pix.animate({
        image: imagejh,
        dotSize: 4,
        particleType: 'halftone', 
        transitionTime: 10000,
        idleTime: 4000,
        color: 'black', 
        separation: 10
    });
}