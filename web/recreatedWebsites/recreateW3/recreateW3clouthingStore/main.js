let hamburger = document.querySelector('.hamburger');
let nav = document.querySelector('nav');
let close = document.querySelector('.close');

nav.style.display = "none";
hamburger.addEventListener('click', toggleNav, false);
close.addEventListener('click', toggleNav, false);

document.addEventListener('click', callBasedOnPosition, false);

let opened = false;

function toggleNav() {
    if(nav.style.display == "none") {
        nav.style.display = "block";
        setTimeout(function() {
            opened = true;
        }, 1);
    }else {
        nav.style.display = "none";
        opened = false
    }
}

function callBasedOnPosition(e) {
    if(e.clientX > 250 && opened) {
        toggleNav();
    }
}