const imagejh = document.getElementById('image-jh1');
const imagejh2 = document.getElementById('image-jh2');
const imageay = document.getElementById('image-ay');

window.onload = function initialize() {
    pict2pix.animate({
        image: imagejh,
        numberOfParticles: 800,
        horizontalSpeed: -1,
        verticalSpeed: -1,
        particleType: 'twisted-particle'
    });
    pict2pix.animate({
        image: imagejh2,
        particleType: 'led-matrix',
        type: 'random',
        transitionTime: 2000,
        idleTime: 5000,
        ledSize: 4
    });
    pict2pix.animate({
        image: imagejh3,
        particleType: 'halftone', 
        transitionTime: 10000,
        idleTime: 4000,
        color: 'rgb(0, 60, 90)', 
        separation: 8
  });
}