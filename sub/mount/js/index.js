const FOOTER = document.querySelector('footer');
const HEADER_FIXED = document.querySelector('.header-fixed');
let scrollbarWidthValue = 0;
let htmlWidth = 0;
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

(function(){
    
    document.onscroll = () => {
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

        // resize();
    }

    TOPBTN.onclick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    SIDENAVBAR.addEventListener('click', ()=>{
        SIDENAVBAR.classList.toggle('navbarToggle') ?
        (SIDENAVBAROPEN.style.transform = 'translate(0%)', DARK.classList.add('darkActive'),
         document.documentElement.style.overflow = 'hidden') :
        (SIDENAVBAROPEN.style.transform = 'translate(100%)', DARK.classList.remove('darkActive'),
        document.documentElement.style.overflow = 'auto');
    });

})();

(function(){
    const BANNER_SLIDER = document.querySelector('.slider');
    const DISPLAY_SLIDER = document.querySelector('.slider ul');
    let sliderAuto = true;
    
    let firstChild = DISPLAY_SLIDER.firstElementChild.cloneNode(true);
    let lastChild = DISPLAY_SLIDER.lastElementChild.cloneNode(true);

    DISPLAY_SLIDER.append(firstChild);
    DISPLAY_SLIDER.prepend(lastChild);

    let imgList = document.querySelectorAll('.slider ul li');
    let imgWidth = 100;
    let bannerSliderInterval = null;

    let index = 1;
    DISPLAY_SLIDER.style.transform = `translateX(-${imgWidth*index}vw)`;
    let sliderInterval = false;

        /*드래그*/
        let bannerstart;
        let bannerchange;
        let bannertouchOn = false;
    
        BANNER_SLIDER.addEventListener('mousedown', (e) => {
            bannerstart = e.pageX;
            bannertouchOn = true;
        });
        BANNER_SLIDER.addEventListener('mousemove', (e) => {
            if(!bannertouchOn) return
            if(bannertouchOn == true){
                e.preventDefault();
                let bannertouch = e.pageX;
                bannerchange = bannerstart - bannertouch;
            }
        });
        BANNER_SLIDER.addEventListener('mouseup', (e) => {
            bannertouchOn = false;
            if(bannerchange > 30){
                moveSlide('next');
                bannerchange = 0;
            }else if((bannerchange < -30)){
                moveSlide('prev');
                bannerchange = 0;
            }else  bannerchange = 0;
        });
    
        /*터치*/
        BANNER_SLIDER.addEventListener('touchstart', (e) => {
            bannerstart = e.touches[0].clientX;
            bannertouchOn = true;
        });
        BANNER_SLIDER.addEventListener('touchmove', (e) => {
            if(!bannertouchOn) return
            if(bannertouchOn == true){
                e.preventDefault();
                let bannertouch = e.touches[0];
                bannerchange = bannerstart - bannertouch.clientX;
            }
        });
        BANNER_SLIDER.addEventListener('touchend', (e) => {
            bannertouchOn = false;
            if(bannerchange > 30){
                moveSlide('next');
                bannerchange = 0;
            }else if(bannerchange < -30){
                moveSlide('prev');
                bannerchange = 0;
            }else bannerchange = 0;
        });

    function slideBtn(e){
        // const btnParents = document.querySelector('.slider > div > button > i');
        const playback = document.querySelector('.playback');

        if(e.target.className === 'prev' || e.target.className === 'fas fa-chevron-left'){
            moveSlide('prev');
        }else if(e.target.className === 'next' || e.target.className === 'fas fa-chevron-right'){
            moveSlide('next');
        }else if(e.target.className === 'playback' || e.target.className === 'fas fa-pause'){
            playback.classList.add('slide-toggle');
            sliderAuto = false;
            clearInterval(bannerSliderInterval);
        }else if(e.target.className === 'playback' || e.target.className === 'playback slide-toggle' || e.target.className === 'fas fa-play'){
            playback.classList.remove('slide-toggle');
            sliderAuto = true;
            sliderInterval = false;
            interval();
        }else return;
    }

    const bannerText = document.querySelectorAll('.banner-text');
    bannerText[index].style.display = 'flex';

    function moveSlide(direction){
        if(index >= imgList.length - 1) return;
        if(index <= 0) return;

        if(direction === 'prev'){
            index--;
            DISPLAY_SLIDER.style.transition = `transform 0.5s ease-in-out`;
            DISPLAY_SLIDER.style.transform = `translateX(-${imgWidth*index}vw)`;
        }else if(direction === 'next'){
            index++;
            DISPLAY_SLIDER.style.transition = `transform 0.5s ease-in-out`;
            DISPLAY_SLIDER.style.transform = `translateX(-${imgWidth*index}vw)`;
        }else{
            return
        }
    }
    
    BANNER_SLIDER.ontransitionend = function(){
        clearInterval(bannerSliderInterval);
        
        if(index === imgList.length - 1){
            index = 1;
            DISPLAY_SLIDER.style.transition = `none`;
            DISPLAY_SLIDER.style.transform = `translateX(-${imgWidth*index}vw)`;
        }else if(index === 0){
            index = imgList.length - 2;
            DISPLAY_SLIDER.style.transition = `none`;
            DISPLAY_SLIDER.style.transform = `translateX(-${imgWidth*index}vw)`;
        }
        
        for(let i=0; i<imgList.length; i++){
            bannerText[i].style.display = 'none';
        }
        bannerText[index].style.display = 'flex';

        sliderInterval = false;
        interval();
    }
    
    BANNER_SLIDER.onclick = (e) => {slideBtn(e);}
    
    function interval(){
        if(sliderInterval === false && sliderAuto === true){
            bannerSliderInterval = setInterval(moveSlide, 5000, 'next');
            sliderInterval = true;
        }
    }
    interval();

    /*프로모션 슬라이드*/

    const SECTION = document.querySelector('.js-margin');
    let sliderMargin = window.getComputedStyle(SECTION).getPropertyValue('margin-left');
    let sliderPadding = window.getComputedStyle(SECTION).getPropertyValue('padding-left');

    const PROMOTION_SLIDER = document.querySelector('.promotion-slider');
    PROMOTION_SLIDER.style.width = `calc(100vw - ${sliderMargin} - ${sliderPadding} - ${scrollbarWidthValue}px)`;

    const PROMOTION_SLIDER_BOX = document.querySelector('.main-promotion');
    let promotionImgList = document.querySelectorAll('.main-promotion li');

    /*여기서부터 시작*/
    let promotionIndex = 1;
    let display = 5;
    let promotionListWidth = promotionImgList[0].offsetWidth;

    let appendArray = [];
    let prependArray = [];

    for(let i=0; i<display; i++){
        appendArray[i] = PROMOTION_SLIDER_BOX.children[i].cloneNode(true);
    }

    for(let i=0; i<display; i++){
        prependArray[i] = PROMOTION_SLIDER_BOX.children[(display)-i].cloneNode(true);
    }
    for(let i=0; i<display; i++){
        PROMOTION_SLIDER_BOX.prepend(prependArray[i]);
        PROMOTION_SLIDER_BOX.append(appendArray[i]);
    }

    promotionImgList = document.querySelectorAll('.main-promotion li');

    /*드래그*/
    let start;
    let change;
    let touchOn = false;

    PROMOTION_SLIDER_BOX.addEventListener('mousedown', (e) => {
        start = e.pageX;
        touchOn = true;
    });
    PROMOTION_SLIDER_BOX.addEventListener('mousemove', (e) => {
        if(!touchOn) return
        if(touchOn == true){
            e.preventDefault();
            let touch = e.pageX;
            change = start - touch;
        }
    });
    PROMOTION_SLIDER_BOX.addEventListener('mouseup', (e) => {
        touchOn = false;
        if(change > 50){
            promotionSlider('next');
            change = 0;
        }else if((change < -50)){
            promotionSlider('prev');
            change = 0;
        }else  change = 0;
    });

    /*터치*/
    PROMOTION_SLIDER_BOX.addEventListener('touchstart', (e) => {
        start = e.touches[0].clientX;
        touchOn = true;
    });
    PROMOTION_SLIDER_BOX.addEventListener('touchmove', (e) => {
        if(!touchOn) return
        if(touchOn == true){
            e.preventDefault();
            let touch = e.touches[0];
            change = start - touch.clientX;
        }
    });
    PROMOTION_SLIDER_BOX.addEventListener('touchend', (e) => {
        touchOn = false;
        if(change > 50){
            promotionSlider('next');
            change = 0;
        }else if(change < -50){
            promotionSlider('prev');
            change = 0;
        }else change = 0;
    });

    promotionIndex--;
    let distance = promotionIndex + display;
    PROMOTION_SLIDER_BOX.style.transform = `translateX(-${promotionListWidth*distance}px)`;

    function promotionSlider(direction){
        promotionListWidth = promotionImgList[0].offsetWidth;
        if(promotionSlideTransition) return;
        if(distance >= promotionImgList.length - display) return;
        if(distance <= 1) return;
    
        if(direction === 'prev'){
            promotionIndex--;
            distance = promotionIndex + display;
            PROMOTION_SLIDER_BOX.style.transition = `transform 0.3s ease-in-out`;
            PROMOTION_SLIDER_BOX.style.transform = `translateX(-${promotionListWidth*distance}px)`;
        }else if(direction === 'next'){
            promotionIndex++;
            distance = promotionIndex + display;
            PROMOTION_SLIDER_BOX.style.transition = `transform 0.3s ease-in-out`;
            PROMOTION_SLIDER_BOX.style.transform = `translateX(-${promotionListWidth*distance}px)`;
        }else{
            return
        }
    }
    let promotionSlideTransition = false;

    PROMOTION_SLIDER_BOX.addEventListener('transitionstart', function(e){
        if(this == e.target){
            promotionSlideTransition = true;
        }
    });

    PROMOTION_SLIDER_BOX.addEventListener('transitionend', function(e){
        // console.log(e.target);
        //e.stopPropagation();
        // console.log(this);
        // console.log(e.currentTarget);

        if(this == e.target){
            promotionSlideTransition = false;
            promotionListWidth = promotionImgList[0].offsetWidth;

            if(distance >= promotionImgList.length - display){
                promotionIndex = 0;
                distance = promotionIndex + display;
                PROMOTION_SLIDER_BOX.style.transition = `none`;
                PROMOTION_SLIDER_BOX.style.transform = `translateX(-${promotionListWidth*distance}px)`;
            }else if(distance <= 1){
                promotionIndex = 2;
                distance = promotionIndex + display;
                PROMOTION_SLIDER_BOX.style.transition = `none`;
                PROMOTION_SLIDER_BOX.style.transform = `translateX(-${promotionListWidth*distance}px)`;
            }
        }
    });

    //눈 이펙트
    const CANVAS = document.querySelector('.star');
    let ctx = CANVAS.getContext('2d');
    let particlesOnScreen = 245;
    let particlesArray = [];
    let w,h;
    w = CANVAS.width = document.querySelector('.main-parallax').clientWidth;
    h = CANVAS.height = document.querySelector('.main-parallax').clientHeight;
    
    function random(min, max){
        return min + Math.random() * (max - min + 1);
    };
    function clientResize(ev){
        w = CANVAS.width = document.querySelector('.main-parallax').clientWidth;
        h = CANVAS.height = document.querySelector('.main-parallax').clientHeight;
    };
    function createSnowFlakes(){
    for(var i = 0; i < particlesOnScreen; i++){
            particlesArray.push({
                x: Math.random() * w,
                y: Math.random() * h,
                opacity: Math.random(),
                speedX: random(-11, 11),  
                speedY: random(7, 15),    
                radius:random(0.5, 4.2),
            });
        }
    };
    function drawSnowFlakes(){
    for(var i = 0; i < particlesArray.length; i++){
        var gradient = ctx.createRadialGradient(  
            particlesArray[i].x,   
            particlesArray[i].y,   
            0,                     
            particlesArray[i].x,   
            particlesArray[i].y,   
            particlesArray[i].radius  
            );

            gradient.addColorStop(0, "rgba(255, 255, 255," + particlesArray[i].opacity + ")");  // white
            gradient.addColorStop(.8, "rgba(210, 236, 242," + particlesArray[i].opacity + ")");  // bluish
            gradient.addColorStop(1, "rgba(237, 247, 249," + particlesArray[i].opacity + ")");   // lighter bluish

            ctx.beginPath(); 
            ctx.arc(
                particlesArray[i].x,  
                particlesArray[i].y,  
                particlesArray[i].radius,  
                0,                         
                Math.PI*2,                 
                false                     
            );

        ctx.fillStyle = gradient;   
        ctx.fill();                 
        }
    };

    function moveSnowFlakes(){
    for (var i = 0; i < particlesArray.length; i++) {
        particlesArray[i].x += particlesArray[i].speedX;     
        particlesArray[i].y += particlesArray[i].speedY;     

        if (particlesArray[i].y > h) {                                                                               
            particlesArray[i].x = Math.random() * w * 1.5;
            particlesArray[i].y = -50;
        }
        }
    };

    function updateSnowFall(){
        ctx.clearRect(0, 0, w, h);
        drawSnowFlakes();
        moveSnowFlakes();
    };

    setInterval(updateSnowFall,50);
    createSnowFlakes();

    //video

    let videoImg = document.querySelector('.navigation');

    videoImg.onclick = function(e){
        if(e.target.className === 'navigation-00'){
            videoIndex = 0;
            videoLoop(0);
        }else if(e.target.className === 'navigation-01'){
            videoIndex = 0;
            videoLoop(1);
        }else if(e.target.className === 'navigation-02'){
            videoIndex = 0;
            videoLoop(2);
        }else return
    }

    // function video(url){
    //     document.querySelector('').src = url;
    // }
    let videoInterval = false;
    let videoSliderInterval = false;
    let videoIndex = 0;
    function videoLoop(num){
        clearInterval(videoSliderInterval);
        let video = document.querySelectorAll('.section-video video');
        
        for(let i=0; i<video.length; i++){
            video[i].style.display = 'none';
            video[i].pause();
            video[i].currentTime = 0;
        }

        videoIndex += num;
        if(videoIndex < video.length){
            video[videoIndex].style.display = 'block';
            video[videoIndex].play();
        }else{
            videoIndex = 0;
            video[videoIndex].style.display = 'block';
            video[videoIndex].play();
        }
        videoInterval = false;
        videoIntervalfn();
    }
    videoLoop(0);

    function videoIntervalfn(){
        if(videoInterval === false){
            videoSliderInterval = setInterval(videoLoop, 8000, 1);
            videoInterval = true;
        }
    }
    videoIntervalfn();

    const TABMENU = document.querySelector('.section-tabmenu');
    const list = document.querySelectorAll('.section-tabmenu > div > ul > li');
    const item = document.querySelectorAll('.section-tabmenu-item');

    list[1].classList.remove('tabmenuActive');
    item[1].classList.remove('tabmenuActive');
    list[0].classList.add('tabmenuActive');
    item[0].classList.add('tabmenuActive');

    TABMENU.onclick = function(e){

        if(e.target.className === 'event' || e.target.className === 'event tabmenuActive'){
            list[1].classList.remove('tabmenuActive');
            item[1].classList.remove('tabmenuActive');
            list[0].classList.add('tabmenuActive');
            item[0].classList.add('tabmenuActive');
        }else if(e.target.className === 'news' || e.target.className === 'news tabmenuActive'){
            list[0].classList.remove('tabmenuActive');
            item[0].classList.remove('tabmenuActive');
            list[1].classList.add('tabmenuActive');
            item[1].classList.add('tabmenuActive');
        }else return
    }

    /*스크롤 이펙트*/
    // window.addEventListener('scroll', scrollEffect);

    // function scrollEffect(){
    //     const promotionSliderEffect = document.querySelector('.js-margin');
    //     const globalMount = document.querySelector('.section-backgorund-01');
    //     const brandVideo = document.querySelector('.section-backgorund-02');
    //     const evntAndNews = document.querySelector('.section-tabmenu');

    //     if(window.scrollY >= 300){
    //         promotionSliderEffect.style.opacity = '1';
    //         promotionSliderEffect.style.transform = 'translateY(0px)';
    //         promotionSliderEffect.style.transition = '1s ease-in-out';
    //     }else{
    //         promotionSliderEffect.style.opacity = '0';
    //         promotionSliderEffect.style.transform = 'translateY(100px)';
    //     }

    //     if(window.scrollY >= 800){
    //         globalMount.style.opacity = '1';
    //         globalMount.style.transform = 'translateY(0px)';
    //         globalMount.style.transition = '1s ease-in-out';
    //     }else{
    //         globalMount.style.opacity = '0';
    //         globalMount.style.transform = 'translateY(100px)';
    //     }

    //     if(window.scrollY >= 1300){
    //         brandVideo.style.opacity = '1';
    //         brandVideo.style.transform = 'translateY(0px)';
    //         brandVideo.style.transition = '1s ease-in-out';
    //     }else{
    //         brandVideo.style.opacity = '0';
    //         brandVideo.style.transform = 'translateY(100px)';
    //     }

    //     if(window.scrollY >= 2200){
    //         evntAndNews.style.opacity = '1';
    //         evntAndNews.style.transform = 'translateY(0px)';
    //         evntAndNews.style.transition = '1s ease-in-out';
    //     }else{
    //         evntAndNews.style.opacity = '0';
    //         evntAndNews.style.transform = 'translateY(100px)';
    //     }

    // }

    // resize();
    /*리사이즈*/
    window.onresize = function(){
        clearInterval(bannerSliderInterval);
        sliderInterval = true;
        DISPLAY_SLIDER.style.transition = `none`;
        DISPLAY_SLIDER.style.transform = `translateX(-${imgWidth*index}vw)`;

        scrollbarWidthValue = scrollbarWidth();
        sliderMargin = window.getComputedStyle(SECTION).getPropertyValue('margin-left');
        sliderPadding = window.getComputedStyle(SECTION).getPropertyValue('padding-left');
        PROMOTION_SLIDER.style.width = `calc(100vw - ${sliderMargin} - ${sliderPadding} - ${scrollbarWidthValue}px)`;
        
        sliderInterval = false;
        clientResize();
        interval();

        //common
        scrollbarWidthValue = scrollbarWidth();
        htmlWidth = document.documentElement.clientWidth + scrollbarWidthValue;

        if(htmlWidth >= 1300){
            SIDENAVBAR.classList.remove('navbarToggle');
            SIDENAVBAROPEN.style.transform = 'translate(100%)';
            DARK.classList.remove('darkActive')
            document.documentElement.style.overflow = 'auto'

            TOPMENU.style.display = `flex`;

            document.documentElement.scrollTop > 300 ?
            (TOPBTN.classList.add('topActive')) :
            (TOPBTN.classList.remove('topActive'));

        }else if(htmlWidth < 1300){
            TOPMENU.style.display = `none`
        }

        // resize();

        //promotion slide
        promotionListWidth = promotionImgList[0].offsetWidth;
        PROMOTION_SLIDER_BOX.style.transform = `translateX(-${promotionListWidth*distance}px)`;
    }

})();