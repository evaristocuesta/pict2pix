const imagejh = document.getElementById('image-jh');

window.onload = function initialize() {
    pict2pix.animate({
        image: imagejh,
        particleType: 'led-matrix',
        type: 'random',
        speed: 6, 
        transitionTime: 5000
    });
}