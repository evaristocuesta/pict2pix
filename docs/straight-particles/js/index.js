const imagejh = document.getElementById('image-jh');

window.onload = function initialize() {
    pict2pix.animate({
        image: imagejh,
        numberOfParticles: 800,
        horizontalSpeed: 1,
        verticalSpeed: 1,
        particleType: 'straight-particle'
    });
}