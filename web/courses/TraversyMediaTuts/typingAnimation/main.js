// const TypeWriter = function(txtElement, words, wait = 3000) {
//     this.txtElement = txtElement;
//     this.words = words;
//     this.txt = '';
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//     this.type();
//     this.isDeleting = false;
// }

// // Type Method
// TypeWriter.prototype.type = function() {
//     // Current index of word
//     const current = this.wordIndex % this.words.length;
//     // Get full text of current word
//     const fullTxt = this.words[current];
//     // Cheeck if deleting
//     if(this.isDeleting) {
//         // Remove char
//         this.txt = fullTxt.substring(0, this.txt.length - 1);
//     }else {
//         // Add char
//         this.txt = fullTxt.substring(0, this.txt.length + 1);
//     }

//     this.txtElement.innerHTML = '<span class="txt">' + this.txt + '</span>'

//     // Type Speed
//     let typeSpeed = 300;

//     if(this.isDeleting) {
//         typeSpeed /= 2;
//     }

//     if(!this.isDeleting && this.txt === fullTxt) {
//         typeSpeed = this.wait;
//         this.isDeleting = true;
//     }else if(this.isDeleting && this.txt === '') {
//         this.isDeleting = false;
//         this.wordIndex++;
//         typeSpeed = 500;
//     }

//     setTimeout(() => this.type(), typeSpeed);
// }

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];
        // Cheeck if deleting
        if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        }else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = '<span class="txt">' + this.txt + '</span>'

        // Type Speed
        let typeSpeed = 250;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        }else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    new TypeWriter(txtElement, words, wait);
}