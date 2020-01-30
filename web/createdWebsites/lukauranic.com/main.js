//for navigation bar
window.onscroll = function() {scroll()};
var bar = document.querySelector(".bar");
var timeoutForHide;
var sticky = bar.offsetTop + 0;
var yOffSet = window.pageYOffset;
let scrolling = false;

window.addEventListener('load', function() {
    clicked(undefined);
});

window.addEventListener("wheel", function() {
    scrolling = true;
});
       
document.addEventListener('touchmove', function() {
    scrolling = true;
});

function scroll() {        
    clearTimeout(timeoutForHide);
    if(yOffSet > window.pageYOffset || yOffSet < 40) {
        showNav();
    }
    if(yOffSet < window.pageYOffset && !opened && scrolling) {
        hideNav();
        clearTimeout(timeoutForHide);
    }

    yOffSet = window.pageYOffset;
    if (window.pageYOffset >= sticky + 1) {
        bar.classList.add("fixed");
        if(!opened){
            timeoutForHide = setTimeout(hideNav, 2000);
        }
    } else {
        bar.classList.remove("fixed");
        pushdownNav();
    }
    scrolling = false;
}
function hideNav() {bar.style.top = '-250px';}
function showNav() {bar.style.top = '0px';}    
function pushdownNav() {bar.style.top = sticky + 'px';}


// for navigation open, close, hover, unhover

let body = document.getElementsByTagName('body')[0];
let openClose = document.querySelector('.open-close-nav');
let snowflake = document.querySelector('.bar .logo');
let navLinks = document.querySelectorAll('nav .links ul li a');
openClose.addEventListener('click', openOrCloseMenu);
openClose.addEventListener('mouseenter', hoveredOpenClose);
openClose.addEventListener('mouseleave', unhoveredOpenClose);
let nav = document.querySelector('nav');
let opened = false;

let links = document.querySelectorAll('.links li a');
for(let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', closeAndUnhoverMenu);
}
function closeAndUnhoverMenu() {
    openOrCloseMenu();
    unhoveredOpenClose();
}

function openOrCloseMenu() {
    if(!opened) {
        for(var i = 0; i < navLinks.length; i++) {
            var r = Math.floor(Math.random() * 4);
            if(r == 0) {
                navLinks[i].classList.add("adown");				
            }else if(r == 1) {
                navLinks[i].classList.add("aup");
            }else if(r == 2) {
                navLinks[i].classList.add("aleft");
            }else {
                navLinks[i].classList.add("aright");
            }
        }

        nav.style.right = '0%';
        openClose.style.background = "url('img/close-menu.svg')";
        openClose.style.transform = 'rotateZ(360deg)';
        openClose.style.right = '20px';
        if(getWidth() < 1000) {
            snowflake.style.backgroundImage = "url('img/logo-dark.png')";
        }
        opened = true;
        clearTimeout(timeoutForHide);
    }else {
        for(var i = 0; i < navLinks.length; i++) {
            navLinks[i].classList.remove("adown");
            navLinks[i].classList.remove("aup");
            navLinks[i].classList.remove("aleft");
            navLinks[i].classList.remove("aright");
        }

        nav.style.right = '-110%';
        openClose.style.background = "url('img/open-menu-hovered.svg')";
        openClose.style.transform = 'rotateZ(180deg)';
        changeOpenClosePosition();

        snowflake.style.backgroundImage = "url('img/logo.png')";
        body.style.overflow = 'visible';
        body.style.overflowX = 'hidden';
        opened = false;
    }
}

function hoveredOpenClose() {
    if(!opened) {
        openClose.style.background = "url('img/open-menu-hovered.svg')";
        openClose.style.transform = 'rotateZ(180deg)';
    }
}

function unhoveredOpenClose() {
    if(!opened) {
        openClose.style.background = "url('img/open-menu.svg')";
        openClose.style.transform = 'rotateZ(0)';
    }
}

//to make sure open close menu button goes where its supposed
window.addEventListener("resize", changeOpenClosePosition);
changeOpenClosePosition();

function changeOpenClosePosition() {
    if(getWidth() > 1400) {
        openClose.style.right = '10%';
        snowflake.style.left = '10%';
    }else {              
        openClose.style.right = '20px';
        snowflake.style.left = '20px';
    }
}

//get width / height of window (firefox/crome accurate edge/ie about 300px less)

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
}

function getHeight() {
    return Math.max(
        // they give you much higher number???
        // document.body.scrollHeight,
        // document.documentElement.scrollHeight,
        // document.body.offsetHeight,
        // document.documentElement.offsetHeight,
        document.documentElement.clientHeight
    );
}


// for selecting input even if you clicked on span

let spans = document.querySelectorAll('.input-wrap span');

for(let i = 0; i < spans.length; i++) {
    spans[i].addEventListener('click', clickedOnInput);
}

function clickedOnInput(e) {
    e.target.parentElement.firstElementChild.focus();
}


// scroll to bottom of the page

if (window.location.href.indexOf("mailsend") != -1) {
    // window.scrollTo(0, document.body.offsetHeight);
    let value = document.querySelector('.return');
    value.innerHTML = "Uspešno poslano!";
    value.style.color = "#4dd8ad";
}
if (window.location.href.indexOf("error") != -1) {
    // window.scrollTo(0, document.body.offsetHeight);
    let value = document.querySelector('.return');
    value.innerHTML = "Prišlo je do napake!";
    value.style.color = "#ff0000";
}