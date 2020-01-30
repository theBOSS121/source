function scrollAppear() {
    let introText = document.querySelector('.intro-text');
    let introPosition = introText.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 5 * 4;

    console.log(introPosition);

    if(introPosition < screenPosition && introPosition > window.innerHeight - screenPosition) {
        introText.classList.add('intro-appear');
    }else {
        introText.classList.remove('intro-appear');
    }
}

window.addEventListener('scroll', scrollAppear);