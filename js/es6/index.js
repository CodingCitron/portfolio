/* 네비게이션 토글 */
function ToggleBtn(el, toggleName, el2){
    this.el = document.querySelector(`${el}`);
    this.subFuncEl = document.querySelector(`${el2}`);
    this.toggleName = toggleName;
    this.status = this.status;
};

ToggleBtn.prototype.toggleFunc = function(){
    this.el.onclick = () => {
       this.action();
    };
};

ToggleBtn.prototype.action = function(){
    if(!this.subFuncEl){
        this.el.classList.toggle(`${this.toggleName}`)? this.status = true : this.status = false;
    }else{
        this.el.classList.toggle(`${this.toggleName}`)? this.status = true : this.status = false;
        this.subFuncEl.classList.toggle(`${this.toggleName}`);
    }
}

let menuToggle = new ToggleBtn('.nav-toggle-btn', 'active', 'nav.side');
    menuToggle.toggleFunc();

const navSide = document.querySelector('nav.side');
const navSideSvg = document.querySelector('nav.side .menu');

navSide.ontransitionend = function(){
    if(menuToggle.status == true) navSideSvg.classList.add('active');
    else navSideSvg.classList.remove('active');
}

const moveBtn = document.querySelector('.menu');
moveBtn.onclick = (e) => {
    if(!e.target.nodeName == 'text') return;
    if(e.target.nodeName == 'text') menuToggle.action(), mouseMove = false;
}
/* 네비게이션 토글 */

/*footer move-car toggle*/
const movingCar = new ToggleBtn('.move-car figure', 'active');
movingCar.toggleFunc();
/*footer move-car toggle*/

/* 탑 버튼 */
let topBtn = document.querySelector('.top-btn');

topBtn.onclick = () => {
    window.scrollTo({top : 0, behavior : 'smooth'});
 };
 /* 탑 버튼 */

 /* 스크롤 이벤트 */
function ScrollAppear(el, toggleName){
    this.el = document.querySelector(`${el}`);
    this.toggleName = toggleName;
    this.screen_pos = window.innerHeight / 1.5;
}

ScrollAppear.prototype.activeFunc = function(){
    const ELEMENT_POSITION = this.el.getBoundingClientRect().top;
    if(ELEMENT_POSITION > this.screen_pos){
        this.el.classList.remove(`${this.toggleName}`);
        appear = false;
    }else{
        this.el.classList.add(`${this.toggleName}`);
        appear = true;
    }
    return appear;
}

ScrollAppear.prototype.topBtnAppear = function(){
    const ELEMENT_POSITION = this.el.getBoundingClientRect().top;
    this.screen_pos = window.innerHeight;
    if(ELEMENT_POSITION > this.screen_pos){
        topBtn.classList.remove(`${this.toggleName}`);
    }else{
        topBtn.classList.add(`${this.toggleName}`);
    }
}

const scrollApperTopBtn = new ScrollAppear('footer', 'active');
const scrollApperAbout = new ScrollAppear('.content-about section', 'active');
const scrollApperSkill = new ScrollAppear('.content-skill section', 'active');
const scrollApperWorks = new ScrollAppear('.content-works section', 'active');
const scrollApperContact = new ScrollAppear('.content-contact section', 'active');
let skillappearStatus = scrollApperSkill.activeFunc();

let totalHeight = document.body.scrollHeight - window.innerHeight;
function topBtnProgress(){ /* 전체 길이에서 탑 버튼이 얼마나 스크롤 됬는지 백분율로 구해 이벤트 적용 */
    let progressHeight = (window.scrollY / totalHeight);
    topBtn.style.opacity = `${progressHeight}`;
    if(topBtn.style.opacity == '0') topBtn.style.display = 'none';
    else topBtn.style.display = 'block';
};
topBtnProgress();
 /* 스크롤 이벤트 */

 /* homeIntro SVG 이벤트 */
const homeSvgText = document.querySelector('.content-home h1'),
homeSvgTextPath = document.querySelectorAll('.svgText path'),
svgText = document.querySelectorAll('.svgText');

let svgSum = 0,
order = 0,
addNum = 50,
svgActionRun = false,
svgAnimationFrame,
svgTextPath,
svgTextPathFrame,
pathAction = false;

for(let i=0; i<homeSvgTextPath.length; i++){
    homeSvgTextPath[i].classList.add(`path${i}`);
}

function svgAnimationInit(){
    for(let i=0; i<homeSvgTextPath.length; i++){
        homeSvgTextPath[i].style.fill = `transparent`;
        homeSvgTextPath[i].style.stroke = `transparent`;
        homeSvgTextPath[i].style.strokeWidth = `2`;
    }
}

function svgAniSetting(){
    svgSum = 0;
    if(homeSvgTextPath.length != order){
        svgAnimation(); 
        return;
    }
}

function svgAnimation(){
    svgActionRun = true;
    svgAnimationFrame = requestAnimationFrame(svgAnimation);
    svgSum = svgSum + addNum;

    homeSvgTextPath[order].style.strokeDasharray = svgSum;
    homeSvgTextPath[order].style.stroke = `rgba(255, 255, 255, ${svgSum/homeSvgTextPath[order].getTotalLength()})`;
    homeSvgTextPath[order].style.fill = `rgba(255, 255, 255, ${svgSum/homeSvgTextPath[order].getTotalLength()})`;
    homeSvgTextPath[order].style.filter = `drop-shadow(1px 1px 3px rgba(255, 255, 255, ${svgSum/homeSvgTextPath[order].getTotalLength()})`;

    if(homeSvgTextPath[order].style.strokeDasharray >= Math.floor(homeSvgTextPath[order].getTotalLength()-1)){
        homeSvgTextPath[order].style.strokeDasharray = homeSvgTextPath[order].getTotalLength();
        homeSvgTextPath[order].style.stroke = `rgba(255, 255, 255, 1)`;
        homeSvgTextPath[order].style.fill = `rgba(255, 255, 255, 1)`;
        homeSvgTextPath[order].style.filter = `drop-shadow(1px 1px 3px rgba(255, 255, 255, 1)`;
        order++;

        cancelAnimationFrame(svgAnimationFrame);
        svgAniSetting();
    }
    if(svgActionRun == true && order == homeSvgTextPath.length) svgActionRun = false, addNum = 1;
}

svgAnimationInit();
svgAniSetting();

homeSvgText.onmousemove = (e) => {
    if(svgActionRun) return;
    if(e.target.getAttribute('class') == null) return;
    if(e.target.getAttribute('class').indexOf('path') == -1) return;
    svgTextPath = document.querySelector(`.${e.target.getAttribute('class')}`);
    svgSum = 0;

    if(pathAction == false){
        pathAction = true;
        pathAnimation();
    }

    svgTextPath.onmouseleave = () => {
        cancelAnimationFrame(svgTextPathFrame);
        pathAction = false;
        svgTextPath.style.fill = `rgba(255, 255, 255, 1)`;
        svgTextPath.style.filter = `drop-shadow(1px 1px 3px rgba(255, 255, 255, 1)`;
        svgTextPath.style.strokeDasharray = svgTextPath.getTotalLength();
    }
}

function pathAnimation(){
    svgTextPathFrame = requestAnimationFrame(pathAnimation);
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
    a = Math.random();
    svgSum = svgSum + addNum;    

    svgTextPath.style.transition = 'none';
    svgTextPath.style.fill = `rgba(${r},${g},${b},${a})`;
    svgTextPath.style.filter = `drop-shadow(1px 1px 3px rgba(${r},${g},${b},${a})`;
    svgTextPath.style.strokeDasharray = svgSum;
}

function homePrallaxText(){
    if(window.innerWidth < window.scrollY) return;
    svgText[0].style.transform = `perspective(100px) translate3d(-${window.scrollY}px, ${window.scrollY/10}%, ${window.scrollY/10}px) `;
    svgText[1].style.transform = `perspective(100px) translate3d(${window.scrollY}px, ${window.scrollY/10}%, ${window.scrollY/10}px) `;
}

function svgTextResize(){
    for(let i=0; i<svgText.length; i++) svgText[i].style.height = 96;
    if(window.innerWidth > 768) return;
    for(let i=0; i<svgText.length; i++) svgText[i].style.height = 64;
    if(window.innerWidth > 480) return;
    for(let i=0; i<svgText.length; i++) svgText[i].style.height = 32;
}

svgTextResize();
 /* homeIntro SVG 이벤트 */

// works 4:3 비율 맞추는 box //
const portfolio = document.querySelectorAll('.content-works .portfolio > div');
function worksResize(){
    let imgWidth = portfolio[0].offsetWidth;
    for(let i=0; i<portfolio.length; i++)portfolio[i].style.height = `${imgWidth * 0.75}px`;
}
worksResize();
// works 4:3 비율 맞추는 box //