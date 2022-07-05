//menu bar
var mobile_nav = document.querySelector(".mobile_nav");
var header_wrapper = document.querySelector('.header_wrapper')

function menu_click() {
    header_wrapper.classList.add('mobile_menu_clicked');
}
function cross_sign_click() {
    header_wrapper.classList.remove('mobile_menu_clicked');
}




// animation

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");
const textArray = ["an IT enthusiast", " a Designer", "Nabin Timsina"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 1000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        // if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        // cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        // if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        // cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, newTextDelay);
    }
}

document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
    if (textArray.length)
        setTimeout(type, newTextDelay + 250);
});


//Slidebar of projects

var slideIndex = 1;
showDivs();

function plusDivs(n) {
    showDivsC(slideIndex += n);
}
function showDivsC(n) {
    var i;
    var x = document.getElementsByClassName("project_slides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length  }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].classList.add('transition_slide')
    x[slideIndex - 1].style.display = "block";
}
function showDivs() {
    var i;
    var x = document.getElementsByClassName("project_slides");
    if (slideIndex > x.length) { slideIndex = 1 }
    if (slideIndex < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].classList.add('transition_slide')
    x[slideIndex - 1].style.display = "block";
    slideIndex++;
    setTimeout(showDivs, 4000);
}


/* Blog Post Slider */
current_index1 = 0
current_index2 = 1
show_blog()

function change_slide(n) {
    current_index1 = current_index2;
    current_index2 = current_index1 + n;
    show_blog()

}

function show_blog() {
    var i
    var x = document.getElementsByClassName("blog_item");
    var y = window.matchMedia("(min-width: 50rem)") // ON mobile handler for blog 
    if (current_index2 == x.length) {
        current_index1 = 0
        current_index2 = 1;
    }
    if (current_index2 < 0) {
        current_index1 = x.length - 1;
        current_index2 = current_index1 - 1;
    }

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        x[i].classList.remove('transition_blog')
    }
    x[current_index1].style.display = 'block'
    // x[current_index1].classList.add('transition_blog')
    if (y.matches){
       x[current_index2].style.display = 'block'
      x[current_index2].classList.add('transition_blog')
    }
    else{
        x[current_index1].classList.add('transition_blog')
        current_index1 = current_index2;
    }
    
}





/* contact form success */
var overlay = document.querySelector('.background_overlay_contact')
var sucess_message_container = document.querySelector('.form_sucess')
function Remove_sucess_message(){
    overlay.style.display= 'none'
    sucess_message_container.style.display='none'
    document.querySelector('.form_item input[type="text"]').value=''
    document.querySelector('.form_item textarea').value=''
}

