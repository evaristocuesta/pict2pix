document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('pre code').forEach((el) => {
        hljs.highlightElement(el);
    });
});

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