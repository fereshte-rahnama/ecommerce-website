'use strict'

// start slider
const slides = document.querySelectorAll('.banner > div:not(.banner-arrows)');
const nextEl = document.querySelector('.next');
const prevEl = document.querySelector('.prev');
let activeIndex = 0;
function showSlide(index) {
    slides[activeIndex].classList.remove('active');
    activeIndex = index;
    slides[activeIndex].classList.add('active');
}
function nextSlide() {
    let nextIndex = activeIndex + 1;
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    showSlide(nextIndex);
}
function prevSlide() {
    let prevIndex = activeIndex - 1;
    if (prevIndex < 0) {
        prevIndex = slides.length - 1;
    }
    showSlide(prevIndex);
}
nextEl.addEventListener('click', nextSlide);
prevEl.addEventListener('click', prevSlide);
setInterval(nextSlide, 5000);
// end slider


// start hamburger menu
const hamburger=document.querySelector('.menu-toggle')
const navEl=document.querySelector('nav ul')

hamburger.addEventListener('click',()=>{
    navEl.classList.toggle('active')
})
// end hamburger menu


