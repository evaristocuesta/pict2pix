const imagejh = document.getElementById('image-jh1');
const imagejh2 = document.getElementById('image-jh2');
const imagejh3 = document.getElementById('image-jh3');

window.onload = function initialize() {
    if (imagejh) {
        pict2pix.animate({
            image: imagejh,
            numberOfParticles: 800,
            horizontalSpeed: -1,
            verticalSpeed: -1,
            particleType: 'twisted-particle'
        });
    }
    if (imagejh2) {
        pict2pix.animate({
            image: imagejh2,
            particleType: 'led-matrix',
            type: 'random',
            transitionTime: 2000,
            idleTime: 5000,
            ledSize: 4
        });
    }
    if (imagejh3) {
        pict2pix.animate({
            image: imagejh3,
            particleType: 'halftone', 
            transitionTime: 10000,
            idleTime: 4000,
            color: 'rgb(0, 60, 90)', 
            separation: 8
    });
    }
}