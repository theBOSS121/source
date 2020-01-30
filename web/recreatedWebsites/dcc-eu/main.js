let nav = document.getElementsByTagName('nav')[0];
let offsetFromTop = nav.offsetTop;

window.onscroll = function() {
    if(window.pageYOffset > offsetFromTop) {
        nav.classList = "fixed";
    }else {
        nav.classList = "";
    }
}
