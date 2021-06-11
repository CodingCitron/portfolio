'use strict';

/* toggleBtn */
var menuToggle = new ToggleBtn('.header .menu-btn', 'toggle', '.navigation-menu');

menuToggle.toggleFunc();
/* toggleBtn */

/* scroll Top Btn */
var topBtn = document.querySelector('.scrolltop-btn');

window.onscroll = () => {
    scrollAppear();
    progress();
};

function scrollAppear(){
    const ELEMENT = document.querySelector('.footer');
    const ELEMENT_POSITION = ELEMENT.getBoundingClientRect().top;
    const SCREEN_POSITION = window.innerHeight;
    // console.log(ELEMENT_POSITION);
    // console.log(SCREEN_POSITION);
    if(ELEMENT_POSITION < SCREEN_POSITION){
        topBtn.classList.add('active');
    }else{
        topBtn.classList.remove('active');
    }
};

topBtn.onclick = (e) => {
    if(e.target.tagName != 'I') return
    else window.scrollTo({top : 0, behavior : 'smooth'});
};

var totalHeight = document.body.scrollHeight - window.innerHeight;

function progress(){
    var progressHeight = (window.scrollY / totalHeight);
    topBtn.style.opacity = `${progressHeight}`;

    if(topBtn.style.opacity == '0'){
        topBtn.style.display = 'none';
    }else{
        topBtn.style.display = 'inline-block';
    }
};