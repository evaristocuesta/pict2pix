const imagejh = document.getElementById('image-jh');
const imageay = document.getElementById('image-ay');
window.onload = function initialize() {
    
    pict2pix.animate({
        image: imagejh,
        numberOfParticles: 1500,
        horizontalSpeed: -1,
        verticalSpeed: -1,
        particleType: 'straight-particle'
    });

    pict2pix.animate({
        image: imageay,
        numberOfParticles: 800,
        horizontalSpeed: 1,
        verticalSpeed: 1,
        particleType: 'twisted-particle'
    });
}