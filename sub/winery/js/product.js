"use strict";

(function() {
    
    const slider = document.querySelector('.at-product-slider');
    const slideBox = document.querySelector('.at-product-slider > ul');
    const slideBtn = document.querySelector('.at-product');
    const slideBullet = document.querySelector('.slider-bullet');
    const slideBulletList = document.querySelectorAll('.slider-bullet li');

    const child = [slideBox.firstElementChild.cloneNode(true), slideBox.lastElementChild.cloneNode(true),
        slideBox.children[1].cloneNode(true), slideBox.children[2].cloneNode(true)];

    slideBox.append(child[0]);
    slideBox.prepend(child[1]);
    slideBox.append(child[2]);
    slideBox.prepend(child[3]);

    const slideList = document.querySelectorAll('.at-product-slider > ul > li');

    let scrollbarWidthValue = null;
    let delay = 0;

    function scrollbarWidth(){
        const outer = document.createElement('div');
        const inner = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';

        document.body.appendChild(outer);
        outer.appendChild(inner);

        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);

        return scrollbarWidth;
    }

    scrollbarWidthValue = scrollbarWidth();

    //슬라이드 css 값과 똑같이
    let imgWidth = 285;
    let space = 30;
    let show = 2;
    let distance = space+imgWidth;

    window.addEventListener('resize', sliderSetting);

    function sliderSetting(){ // width 값을 얻고 슬라이더 세팅을 할지 말지 결정함

        let htmlWidth = document.documentElement.clientWidth + scrollbarWidthValue;
        let bodyWidth = htmlWidth - scrollbarWidthValue;

        for(let i=0; i<slideList.length; i++){ // 기본 설정
            slideList[i].style.width = `${imgWidth}px`;
            slideList[i].style.height = 'auto';
        }
        //360 이하부터는 퍼센트로 바꾸는 것 만들어야함
        if(htmlWidth < 401){ //350
            
            space = 0;
            slideList[0].style.display = 'flex';
            slideList[1].style.display = 'flex';
            slideList[slideList.length-1].style.display = 'flex';
            slideList[slideList.length-2].style.display = 'flex';

            slideBox.style.width = `${bodyWidth*slideList.length}px`;

            for(let i=0; i<slideList.length; i++){
                slideList[i].style.width = `100%`;
                slideList[i].style.height = 'auto';
            }

            slider.style.width = `100%`;

            slideBox.style.transform = `translateX(-${bodyWidth*show}px)`;
        
        }else if(htmlWidth > 400 && htmlWidth < 700){ //351 ~ 699
            space = 30;
            slideList[0].style.display = 'flex';
            slideList[1].style.display = 'flex';
            slideList[slideList.length-1].style.display = 'flex';
            slideList[slideList.length-2].style.display = 'flex';

            slideBox.style.width = `${(imgWidth*slideList.length)+(space*slideList.length+1)}px`;
            slider.style.width = `${(imgWidth*1)+(space*1.5)}px`;

            slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
            for(let i=0; i<slideList.length; i++){ // 기본 설정
                slideList[i].style.height = '420px';
            }

        }else if(htmlWidth > 699 && htmlWidth < 1000){ // 700 ~ 999
            space = 30;
            slideList[0].style.display = 'flex';
            slideList[1].style.display = 'flex';
            slideList[slideList.length-1].style.display = 'flex';
            slideList[slideList.length-2].style.display = 'flex';

            slideBox.style.width = `${(imgWidth*slideList.length)+(space*slideList.length+1)}px`;
            slider.style.width = `${(imgWidth*2)+(space*2.5)}px`;

            slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
            for(let i=0; i<slideList.length; i++){ // 기본 설정
                slideList[i].style.height = '420px';
            }

        }else if(htmlWidth > 999 && htmlWidth < 1400){ //1000 ~ 1399
            space = 30;
            slideList[0].style.display = 'flex';
            slideList[1].style.display = 'flex';
            slideList[slideList.length-1].style.display = 'flex';
            slideList[slideList.length-2].style.display = 'flex';

            slideBox.style.width = `${(imgWidth*slideList.length)+(space*slideList.length+1)}px`;
            slider.style.width = `${(imgWidth*3)+(space*3.5)}px`;
            
            slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
            for(let i=0; i<slideList.length; i++){ // 기본 설정
                slideList[i].style.height = '440px';
            }

        }else{ // 1400
            space = 0;
            slideList[0].style.display = 'none';
            slideList[1].style.display = 'none';
            slideList[slideList.length-1].style.display = 'none';
            slideList[slideList.length-2].style.display = 'none';

            slider.style.width = '1300px';
            slideBox.style.width = '100%';

            slideBox.style.padding = `0 ${space}px`;
            slideBox.style.transform = `translateX(0px)`;
            for(let i=0; i<slideList.length; i++){ // 기본 설정
                slideList[i].style.height = '440px';
            }
        }
        bulletLight(htmlWidth);
    }

    let bannerstart;
    let bannerchange;
    let bannertouchOn = false;

    slideBox.addEventListener('mousedown', (e) => {
        bannerstart = e.pageX;
        bannertouchOn = true;
    });
    slideBox.addEventListener('mousemove', (e) => {
        if(!bannertouchOn) return
        if(bannertouchOn == true){
            e.preventDefault();
            let bannertouch = e.pageX;
            bannerchange = bannerstart - bannertouch;
        }
    });
    slideBox.addEventListener('mouseup', (e) => {
        bannertouchOn = false;
        if(bannerchange > 30){
            showSlide(1);
            bannerchange = 0;
        }else if((bannerchange < -30)){
            showSlide(-1);
            bannerchange = 0;
        }else  bannerchange = 0;
    });

    /*터치*/
    slideBox.addEventListener('touchstart', (e) => {
        bannerstart = e.touches[0].clientX;
        bannertouchOn = true;
    });
    slideBox.addEventListener('touchmove', (e) => {
        if(!bannertouchOn) return
        if(bannertouchOn == true){
            e.preventDefault();
            let bannertouch = e.touches[0];
            bannerchange = bannerstart - bannertouch.clientX;
        }
    });
    slideBox.addEventListener('touchend', (e) => {
        bannertouchOn = false;
        if(bannerchange > 30){
            showSlide(1);
            bannerchange = 0;
        }else if(bannerchange < -30){
            showSlide(-1);
            bannerchange = 0;
        }else bannerchange = 0;
    });
   
    let transition = ['0ms', '0.2s ease-in-out'];
    slideBox.style.transition = transition[1];
    function showSlide(direction){
        show += direction;
        let htmlWidth = document.documentElement.clientWidth + scrollbarWidthValue;
        let bodyWidth = htmlWidth - scrollbarWidthValue;

        bulletLight(htmlWidth);
        if(htmlWidth > 350 && htmlWidth < 1400){
            if(show == -1){
                show = 4;
                slideBox.style.transition = transition[0];
                slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
                setTimeout(()=>{
                show = 3;
                slideBox.style.transition = transition[1];
                slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
                }, 100);
            }else if(show == 6){
                show = 1;
                slideBox.style.transition = transition[0];
                slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
                setTimeout(()=>{
                show = 2;
                slideBox.style.transition = transition[1];
                slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
                }, 100);
            }else{
                setTimeout(()=>{
                    slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
                }, 100);
            }   
        }else if(htmlWidth < 351){
            if(show == -1){
                show = 4;
                slideBox.style.transition = transition[0];
                slideBox.style.transform = `translateX(-${bodyWidth*show}px)`;
                setTimeout(()=>{
                show = 3;
                slideBox.style.transition = transition[1];
                slideBox.style.transform = `translateX(-${bodyWidth*show}px)`;
                }, 100);
            }else if(show == 6){
                show = 1;
                slideBox.style.transition = transition[0];
                slideBox.style.transform = `translateX(-${bodyWidth*show}px)`;
                setTimeout(()=>{
                show = 2;
                slideBox.style.transition = transition[1];
                slideBox.style.transform = `translateX(-${bodyWidth*show}px)`;
                }, 100);
            }else{
                setTimeout(()=>{
                    slideBox.style.transform = `translateX(-${bodyWidth*show}px)`;
                }, 100);
            }   
        }else{ // 1400 이상
            
        }
    }

    function bulletLight(htmlWidth){
        if(htmlWidth < 700){
            for(let i=0; i<slideBulletList.length; i++){
                slideBulletList[i].style.background = 'rgba(0,0,0,0)';
            }
            if(show == 2 || show == 6){
                slideBulletList[0].style.background = 'rgba(255,255,255,1)';
            }else if(show == 3 || show == 7 || show == -1){
                slideBulletList[1].style.background = 'rgba(255,255,255,1)';
            }else if(show == 4 || show == 0){
                slideBulletList[2].style.background = 'rgba(255,255,255,1)';
            }else{ // 1, 5
                slideBulletList[3].style.background = 'rgba(255,255,255,1)';
            }
        }
    }

    slideBtn.addEventListener('click', (e)=>{
        if(delay == 0){
            if(e.target.className == 'slider-prev'){
                showSlide(-1);
                setTimeout(()=>{delay = 0;} , 300);
            }else if(e.target.className == 'slider-next'){
                showSlide(1);
                setTimeout(()=>{delay = 0;} , 300);
            }else{
                return
            }
        }
        delay++;
    });

    function bulletBtn(e){
        let htmlWidth = document.documentElement.clientWidth + scrollbarWidthValue;
        let bodyWidth = htmlWidth - scrollbarWidthValue;
        let distance = space+imgWidth;
        slideBox.style.transition = transition[0];
        
        if(htmlWidth > 350){
            if(e.target.className == 'slider-bullet-01'){ 
                for(let i=0; i<slideBulletList.length; i++){
                    slideBulletList[i].style.background = 'rgba(0,0,0,0)';
                }
                slideBulletList[0].style.background = 'rgba(255,255,255,1)';
                show = 2;
                slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
            }else if(e.target.className == 'slider-bullet-02'){
                for(let i=0; i<slideBulletList.length; i++){
                    slideBulletList[i].style.background = 'rgba(0,0,0,0)';
                }
                slideBulletList[1].style.background = 'rgba(255,255,255,1)';
                show = 3;
                slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
            }else if(e.target.className == 'slider-bullet-03'){
                for(let i=0; i<slideBulletList.length; i++){
                    slideBulletList[i].style.background = 'rgba(0,0,0,0)';
                }
                slideBulletList[2].style.background = 'rgba(255,255,255,1)';
                show = 4;
                slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
            }else if(e.target.className == 'slider-bullet-04'){
                for(let i=0; i<slideBulletList.length; i++){
                    slideBulletList[i].style.background = 'rgba(0,0,0,0)';
                }
                slideBulletList[3].style.background = 'rgba(255,255,255,1)';
                show = 5;
                slideBox.style.transform = `translateX(-${(distance*show)+7.5}px)`;
            }else{
                return
            }
            setTimeout(()=>{slideBox.style.transition = transition[1];},0);
        }else{
            if(e.target.className == 'slider-bullet-01'){ 
                for(let i=0; i<slideBulletList.length; i++){
                    slideBulletList[i].style.background = 'rgba(0,0,0,0)';
                }
                slideBulletList[0].style.background = 'rgba(255,255,255,1)';
                show = 2;
                slideBox.style.transform = `translateX(-${bodyWidth*show}px)`;
            }else if(e.target.className == 'slider-bullet-02'){
                for(let i=0; i<slideBulletList.length; i++){
                    slideBulletList[i].style.background = 'rgba(0,0,0,0)';
                }
                slideBulletList[1].style.background = 'rgba(255,255,255,1)';
                show = 3;
                slideBox.style.transform = `translateX(-${bodyWidth*show}px)`;
            }else if(e.target.className == 'slider-bullet-03'){
                for(let i=0; i<slideBulletList.length; i++){
                    slideBulletList[i].style.background = 'rgba(0,0,0,0)';
                }
                slideBulletList[2].style.background = 'rgba(255,255,255,1)';
                show = 4;
                slideBox.style.transform = `translateX(-${bodyWidth*show}px)`;
            }else if(e.target.className == 'slider-bullet-04'){
                for(let i=0; i<slideBulletList.length; i++){
                    slideBulletList[i].style.background = 'rgba(0,0,0,0)';
                }
                slideBulletList[3].style.background = 'rgba(255,255,255,1)';
                show = 5;
                slideBox.style.transform = `translateX(-${bodyWidth*show}px)`;
            }else{
                return
            }
            setTimeout(()=>{slideBox.style.transition = transition[1];},0);
            }
    }

    slideBullet.addEventListener('click', bulletBtn);

    sliderSetting(); 
})();