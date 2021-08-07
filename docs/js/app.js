const imagejh = document.getElementById('image-jh1');
const imagejh2 = document.getElementById('image-jh2');

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
        speed: 6, 
        transitionTime: 5000
    });
}

const imageay = document.getElementById('image-ay');
const div2 = document.getElementById('div2');

div2.onmouseenter = function over() {
    pict2pix.animate({
        image: imageay,
        numberOfParticles: 800,
        horizontalSpeed: 1,
        verticalSpeed: 1,
        particleType: 'straight-particle'
    });
}

div2.onmouseleave = function out() {
    pict2pix.stop(imageay.id);
}

document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
    });
});

// const navLinks = document.querySelectorAll('.nav-item')
const menuToggle = document.getElementById('navbarSupportedContent')
const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle:false})
// navLinks.forEach((l) => {
//     l.addEventListener('click', () => { bsCollapse.toggle() })
// })

document.body.addEventListener('click', () => bsCollapse.toggle());

document.addEventListener("scroll", handleScroll);
// get a reference to our predefined button
var scrollToTopBtn = document.getElementById("toTop");

function handleScroll() {
  var scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var GOLDEN_RATIO = 0.1;

  if ((document.documentElement.scrollTop / scrollableHeight ) > GOLDEN_RATIO) {
    //show button
    scrollToTopBtn.style.display = "block";
  } else {
    //hide button
    scrollToTopBtn.style.display = "none";
  }
}

scrollToTopBtn.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}