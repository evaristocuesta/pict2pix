const image = document.getElementById('image-jh');
window.onload = function initialize() {
    pict2pix.animate({
        image: image,
        numberOfParticles: 3000,
        horizontalSpeed: -1,
        verticalSpeed: -1,
        particleType: 'twisted-particle'
    });
}