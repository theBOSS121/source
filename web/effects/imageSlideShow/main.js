const cSlide = document.querySelector('.carousel-slide');
const cImages = document.querySelectorAll('img');
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 1;
const size = cImages[0].clientWidth;

cSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

nextBtn.addEventListener('click', function() {
    if(counter >= cImages.length - 1) return;
    cSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    cSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

prevBtn.addEventListener('click', function() {
    if(counter <= 0) return;
    cSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    cSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

cSlide.addEventListener('transitionend', function() { 
    if(cImages[counter].id =='lclone') {
        cSlide.style.transition = "none";
        counter = cImages.length - 2;
        cSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }   
    if(cImages[counter].id =='fclone') {
        cSlide.style.transition = "none";
        counter = cImages.length - counter;
        cSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }  
});