window.onresize = function(){
    navResize();
    mobileHeader();
}

/* 68 + */
function navResize(){

    const ELEMENT = document.querySelector('.header nav .menu');
    const ELEMENT_POSITION = ELEMENT.offsetHeight + 68;
    const nav = document.querySelector('.navigation-menu');
    const navHeight = nav.offsetHeight;

    const addons = document.querySelector('.navigation-menu .menu-addons');
    const addonsHeight = addons.offsetHeight;
    const sum = ELEMENT_POSITION + addonsHeight + 98;

    if(navHeight < sum){
        nav.classList.add('resize');
        addons.classList.add('resize');
    }else{
        nav.classList.remove('resize');
        addons.classList.remove('resize');
    }

}

function mobileHeader(){

    const navigationBtn = document.querySelector('.header .menu-btn');
    const header = document.querySelector('.header');
    const headerSpace = document.querySelector('.header-space');

    if(window.innerWidth <= 768){
        header.classList.add('mobile');
        headerSpace.classList.add('mobile');
        navigationBtn.classList.add('mobile');
    }else{
        header.classList.remove('mobile');
        headerSpace.classList.remove('mobile');
        navigationBtn.classList.add('mobile');
    }

}