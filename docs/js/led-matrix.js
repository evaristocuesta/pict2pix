const imagejh = document.getElementById('image-jh');

window.onload = function initialize() {
    pict2pix.animate({
        image: imagejh2,
        particleType: 'led-matrix',
        type: 'random',
        transitionTime: 2000,
        idleTime: 5000,
        ledSize: 4
    });
}