(function(){
    const slideLeft = document.querySelector('.main-slider-left'),
    first = slideLeft.firstElementChild.cloneNode(true),
    last = slideLeft.lastElementChild.cloneNode(true),
    readMore = document.querySelector('.main-readmore > span'),
    slideRight = document.querySelector('.main-slider-right'),
    slideRightList = document.querySelectorAll('.main-slider-right li'),
    autoBtn = document.querySelector('.slide-auto'),
    slideBtn = document.querySelector('.slide-btnbox'),
    action = document.querySelector('.animation-line');

    let animation = true; 

    slideLeft.append(first);
    slideLeft.prepend(last);
    
    let show = 1;
    let transition = ['0ms', 'width 0.5s ease-out', 'transform 0.5s ease-in-out'];
    let nowSlide = 1;
    let delay = 0;

    const allSlideList = document.querySelectorAll('.main-slider-left li');
    const imgList = document.querySelectorAll('.main-slider-left li a');

    function setting(show){
        let num = show;
        for(let i=0; i<allSlideList.length; i++){
            allSlideList[i].style.transition = transition[0];
            imgList[i].style.transition = transition[0];
        }
        for(let i=0; i<allSlideList.length; i++){
            if(i == num){
                allSlideList[i].style.width = '100%';
                imgList[i].style.transform = 'scale(1.0)';
            }else if(i < num){
                allSlideList[i].style.width = '100%';
                imgList[i].style.transform = 'scale(1.5)';
            }else{
                allSlideList[i].style.width = '0';
                imgList[i].style.transform = 'scale(1.5)';
            }
        }
        setTimeout(()=>{
            for(let i=0; i<allSlideList.length; i++){
                allSlideList[i].style.transition = transition[1];
                imgList[i].style.transition = transition[2];
            }
        },50);
    }

    setting(show);

    let bannerstart;
    let bannerchange;
    let bannertouchOn = false;

    slideLeft.addEventListener('mousedown', (e) => {
        e.preventDefault();
        bannerstart = e.pageX;
        bannertouchOn = true;
    });
    slideLeft.addEventListener('mousemove', (e) => {
        if(!bannertouchOn) return
        if(bannertouchOn == true){
            e.preventDefault();
            let bannertouch = e.pageX;
            bannerchange = bannerstart - bannertouch;
        }
    });
    slideLeft.addEventListener('mouseup', (e) => {
        bannertouchOn = false;
        if(bannerchange > 30){
            moveSlide(-1)
            bannerchange = 0;
        }else if((bannerchange < -30)){
            moveSlide(1)
            bannerchange = 0;
        }else  bannerchange = 0;
    });

    /*터치*/
    slideLeft.addEventListener('touchstart', (e) => {
        e.preventDefault();
        bannerstart = e.touches[0].clientX;
        bannertouchOn = true;
    });
    slideLeft.addEventListener('touchmove', (e) => {
        if(!bannertouchOn) return
        if(bannertouchOn == true){
            e.preventDefault();
            let bannertouch = e.touches[0];
            bannerchange = bannerstart - bannertouch.clientX;
        }
    });
    slideLeft.addEventListener('touchend', (e) => {
        bannertouchOn = false;
        if(bannerchange > 30){
            moveSlide(-1)
            bannerchange = 0;
        }else if(bannerchange < -30){
            moveSlide(1)
            bannerchange = 0;
        }else bannerchange = 0;
    });
    
    function slideAction(e){ //버그 있음
        if(delay == 0){
            if(e.target.className == 'slide-prev'){
                moveSlide(-1)
            }else if(e.target.className == 'slide-next'){
                moveSlide(1)
            }else{
                return;
            }
            setTimeout(()=>{delay = 0;} , 550);
        }
        delay++;
    }

    slideBtn.addEventListener('click', (e) => {
        slideAction(e);
    });
    
    function moveSlide(direction){
            if(direction > 0){ //next // 버그
                if(show == allSlideList.length-1){ 
                    show = 1;
                    setting(show);
                    setTimeout(()=>{
                        show += direction;
                        allSlideList[show].style.width = '100%';
                        imgList[show].style.transform = 'scale(1.0)';
                        imgList[show-1].style.transform = 'scale(2.5)';
                    },50);
                }else{
                    setTimeout(()=>{
                        show += direction;
                        allSlideList[show].style.width = '100%';
                        imgList[show].style.transform = 'scale(1.0)';
                        imgList[show-1].style.transform = 'scale(2.5)';
                    },50);
                }
                // slideRun = false;
            }else{ //prev
                if(show == 0){ // 버그
                    show = allSlideList.length-2;
                    setting(show);
                    setTimeout(()=>{
                            allSlideList[show].style.width = '0%';
                            imgList[show].style.transform = 'scale(2.5)';
                            imgList[show-1].style.transform = 'scale(1.0)';
                            show += direction;
                    },50);
                }else{
                    imgList[show-1].style.transition = transition[0];
                    imgList[show-1].style.transform = 'scale(2.5)';
                    setTimeout(()=>{
                        imgList[show-1].style.transition = transition[2];
                        allSlideList[show].style.width = '0%';
                        imgList[show].style.transform = 'scale(2.5)';
                        imgList[show-1].style.transform = 'scale(1.0)';
                        show += direction;
                    },50);
                }
            }
            setTimeout(()=>{
                animationRun();
                nowSlide =  nowShow(show);
                RightSlide(nowSlide);
            },50);
    }

    window.addEventListener('resize', slideWidth);

    function slideWidth(){
        let ulWidth = slideLeft.clientWidth;

        for(let i=0; i<imgList.length; i++){
                imgList[i].style.width = `${ulWidth}px`;
            }
    }

    slideWidth();
    nowShow(show);
    RightSlide(nowSlide);

    function nowShow(show){
        const readMoreTag = document.querySelector('header > a');
        const animationText = document.querySelector('.animation-text');
        const description = document.querySelectorAll('.hd-written p');
        const subTitle = document.querySelector('h2');
        const htmlWidth = document.documentElement.clientWidth + 17;
        const readMoreAtag = document.querySelector('.main-readmore');

        subTitle.style.display = 'none';
        description[0].style.display = 'none';
        description[1].style.display = 'none';
        readMoreTag.style.display = 'none';
        animationText.style.display = 'none';

        if(show === 1 || show === 5){
            readMoreAtag.setAttribute('href', '#');
            subTitle.innerHTML = 'MASTER OF 30 YEARS’ MASTERPIECE';
            readMore.innerHTML = 'ABOUT US';
            if(htmlWidth < 710){
                description[0].innerHTML = '오늘의 깊은 맛을 담기 위해 오크통에서 숙성되는 와인처럼 30여년이라는 길고 긴 시간을 준비하였습니다.';
                description[1].innerHTML = '';
            }else{
                description[0].innerHTML = '오늘의 깊은 맛을 담기 위해 오크통에서 숙성되는 와인처럼';
                description[1].innerHTML = '30여년이라는 길고 긴 시간을 준비하였습니다.';
            }
            animationText.innerHTML = `1 / ${allSlideList.length-2}`;
            nowSlide = 1;
        }else if(show === 2){
            readMoreAtag.setAttribute('href', 'product.html');
            subTitle.innerHTML = 'AN APPETIZING WINE THAT WILL ENTICE YOUR TASTE ';
            readMore.innerHTML = 'PRODUCT';
            if(htmlWidth < 710){
                description[0].innerHTML = '햇살이 맑고 비가 적은 경북 영천은 한국의 보르도라 할만큼 달고 향이 좋은 과일의 생산지입니다.';;
                description[1].innerHTML = '';
            }else{
                description[0].innerHTML = '햇살이 맑고 비가 적은 경북 영천은 한국의 보르도라 할만큼';
                description[1].innerHTML = '달고 향이 좋은 과일의 생산지입니다.';
            }
            animationText.innerHTML = `2 / ${allSlideList.length-2}`;
            nowSlide = 2;
        }else if(show === 3){
            readMoreAtag.setAttribute('href', 'recipe.html');
            subTitle.innerHTML = 'Wine is constant proof that God loves us and loves to see us happy';
            readMore.innerHTML = 'RECIPE';
            if(htmlWidth < 710){
                description[0].innerHTML = '햇살이 맑고 비가 적은 경북 영천은 한국의 보르도라 할만큼 달고 향이 좋은 과일의 생산지입니다.';
                description[1].innerHTML = '';
            }else{
                description[0].innerHTML = '좋은 와인은 무언가 기쁨을 남겨주지만, 평범한 와인은 그렇지 않다.';
                description[1].innerHTML = '평범한 와인은 그렇지 않다.';
            }
            animationText.innerHTML = `3 / ${allSlideList.length-2}`;
            nowSlide = 3;
        }else if(show === 4 || show === 0){
            readMoreAtag.setAttribute('href', 'tour.html');
            subTitle.innerHTML = 'A PRECIOUS MEMORY OF MAKING MY OWN WINE';
            readMore.innerHTML = 'TOUR';
            if(htmlWidth < 710){
                description[0].innerHTML = '와이너리 체험과 영천의 아름다운 명소를 둘러보는 와인투어프로그램에 참여하세요.';
                description[1].innerHTML = '';
            }else{
                description[0].innerHTML = '와이너리 체험과 영천의 아름다운 명소를 둘러보는';
                description[1].innerHTML = '와인투어프로그램에 참여하세요.';
            }
            animationText.innerHTML = `4 / ${allSlideList.length-2}`;
            nowSlide = 4;
        }

        setTimeout(()=>{
            subTitle.style.display = 'block';
            description[0].style.display = 'block';
            description[1].style.display = 'block';
            readMoreTag.style.display = 'block';
            animationText.style.display = 'block';
        },50);

        return nowSlide;
    }

    autoBtn.addEventListener('click', ()=>{
        autoBtn.classList.toggle('auto-toggle')?
        (action.classList.remove("animation-aciton"), animation = false) :
        (setTimeout(()=> action.classList.add("animation-aciton"), 0), animation = true);
    });
    
    action.addEventListener('animationend', ()=>{ 
        moveSlide(1);
    });

    function animationRun(){
        action.classList.remove("animation-aciton");

        if(animation == true){
            setTimeout(()=> action.classList.add("animation-aciton"), 100);
        }
    }

    function RightSlide(nowSlide){
        // slideRight
        for(let i=0; i<slideRightList.length; i++){
            slideRightList[i].style.display = 'none';
        }
        setTimeout(()=>{
            slideRightList[nowSlide-1].style.display = 'block';
        },0);
    }
})();

(function(){ // header
    const navBtn = document.querySelector('.nav-btn'),
    nav = document.querySelector('nav');

    navBtn.addEventListener('click', ()=>{
        navBtn.classList.toggle('nav-toggle')?
        (nav.style.opacity = '1', nav.style.pointerEvents = 'auto', document.documentElement.style.overflow = 'hidden'):
        (nav.style.opacity = '0', nav.style.pointerEvents = 'none', document.documentElement.style.overflow = 'auto');
    });
})();