const FOOTER = document.querySelector('footer');
const HEADER_FIXED = document.querySelector('.header-fixed');
let scrollbarWidthValue = 0;
let htmlWidth = 0;
let hasHorizontalScrollbar;
let hasVerticalScrollbar;
let menuOpen = false;

const DARK = document.querySelector('.dark');

function scrollbarWidth(){
    
    if(menuOpen === true){
        hasScrollbar = false;
    }else{
        hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
    }

    if(hasScrollbar){
        const outer = document.createElement('div');
        const inner = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';

        document.body.appendChild(outer);
        outer.appendChild(inner);

        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);

        return scrollbarWidth;
    }else{
        return 0;
    }
}
scrollbarWidthValue = scrollbarWidth();

const TOPMENU = document.querySelector('.topmenu');
const TOPBTN = document.querySelector('.topbtn');
const SIDENAVBAR = document.querySelector('.sidenavbar');
const SIDENAVBAROPEN = document.querySelector('.sidenavbar-open');

// function resize(e){ // 수정해야함
//     console.log(e.pageY);
//     if(document.documentElement.offsetHeight - FOOTER.offsetHeight == document.documentElement.scrollTop){
//         TOPBTN.style.bottom = `${(FOOTER.offsetHeight) + 25}px`;
//     }else{
//         TOPBTN.style.bottom = `${25}px`;
//     }
// }

(function(){
    
    document.onscroll = () => {
        scrollbarWidthValue = scrollbarWidth();
        htmlWidth = document.documentElement.clientWidth + scrollbarWidthValue;
        
        if(htmlWidth >= 1300){
            document.documentElement.scrollTop > 300 ?
            (TOPBTN.classList.add('topActive')) :
            (TOPBTN.classList.remove('topActive'));
        }else if(htmlWidth < 1300){
            document.documentElement.scrollTop > 300 ?
            (TOPBTN.classList.add('topActive')) :
            (TOPBTN.classList.remove('topActive'));
        }
    }

  
    TOPBTN.onclick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    SIDENAVBAR.addEventListener('click', ()=>{
        SIDENAVBAR.classList.toggle('navbarToggle') ?
        (SIDENAVBAROPEN.style.transform = 'translate(0%)', DARK.classList.add('darkActive'),
         document.documentElement.style.overflow = 'hidden', menuOpen = true) :
        (SIDENAVBAROPEN.style.transform = 'translate(100%)', DARK.classList.remove('darkActive'),
        document.documentElement.style.overflow = 'auto', menuOpen = false);
    });

})();

/*aboutus
    
*/

window.onresize = function(){
    resize();
}

function resize(){
    scrollbarWidthValue = scrollbarWidth();
    htmlWidth = document.documentElement.clientWidth + scrollbarWidthValue;
    const aboutUsPage = document.querySelector('.aboutus');

    if(htmlWidth >= 1300){
        SIDENAVBAR.classList.remove('navbarToggle');
        SIDENAVBAROPEN.style.transform = 'translate(100%)';
        DARK.classList.remove('darkActive')
        
        if(aboutUsPage === null){
            document.documentElement.style.overflow = 'auto'
        }
        menuOpen = false;
        

        TOPMENU.style.display = `flex`;

        document.documentElement.scrollTop > 300 ?
        (TOPBTN.classList.add('topActive')) :
        (TOPBTN.classList.remove('topActive'));

    }else if(htmlWidth < 1300){
        TOPMENU.style.display = `none`
    }        
};