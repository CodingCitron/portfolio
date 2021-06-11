/* 네비게이션 토글 */
function ToggleBtn(el, toggleName, el2) {
    this.el = document.querySelector('' + el);
    this.subFuncEl = document.querySelector('' + el2);
    this.toggleName = toggleName;
    this.status = this.status;
};

ToggleBtn.prototype.toggleFunc = function () {
    var _this = this;

    this.el.onclick = function () {
        _this.action();
    };
};

ToggleBtn.prototype.action = function () {
    if (!this.subFuncEl) {
        this.el.classList.toggle('' + this.toggleName) ? this.status = true : this.status = false;
    } else {
        this.el.classList.toggle('' + this.toggleName) ? this.status = true : this.status = false;
        this.subFuncEl.classList.toggle('' + this.toggleName);
    }
};

var menuToggle = new ToggleBtn('.nav-toggle-btn', 'active', 'nav.side');
menuToggle.toggleFunc();

var navSide = document.querySelector('nav.side');
var navSideSvg = document.querySelector('nav.side .menu');

navSide.ontransitionend = function () {
    if (menuToggle.status == true) navSideSvg.classList.add('active');else navSideSvg.classList.remove('active');
};

var moveBtn = document.querySelector('.menu');
moveBtn.onclick = function (e) {
    if(browser != 'msie'){
        if (e.target.nodeName != 'text') return;
        if (e.target.nodeName == 'text') menuToggle.action(), mouseMove = false;
    }else{
        if (e.target.nodeName == 'A') menuToggle.action(), mouseMove = false;
    }
};
/* 네비게이션 토글 */

/*footer move-car toggle*/
var movingCar = new ToggleBtn('.move-car figure', 'active');
movingCar.toggleFunc();
/*footer move-car toggle*/

/* 탑 버튼 */
var topBtn = document.querySelector('.top-btn');

topBtn.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
/* 탑 버튼 */

/* 스크롤 이벤트 */
function ScrollAppear(el, toggleName) {
    this.el = document.querySelector('' + el);
    this.toggleName = toggleName;
    this.screen_pos = window.innerHeight / 1.5;
}

var appear;

ScrollAppear.prototype.activeFunc = function () {
    var ELEMENT_POSITION = this.el.getBoundingClientRect().top;
    if (ELEMENT_POSITION > this.screen_pos) {
        this.el.classList.remove('' + this.toggleName);
        appear = false;
    } else {
        this.el.classList.add('' + this.toggleName);
        appear = true;
    }
    return appear;
};

ScrollAppear.prototype.topBtnAppear = function () {
    var ELEMENT_POSITION = this.el.getBoundingClientRect().top;
    this.screen_pos = window.innerHeight;
    if (ELEMENT_POSITION > this.screen_pos) {
        topBtn.classList.remove('' + this.toggleName);
    } else {
        topBtn.classList.add('' + this.toggleName);
    }
};

var scrollApperTopBtn = new ScrollAppear('footer', 'active');
var scrollApperAbout = new ScrollAppear('.content-about section', 'active');
var scrollApperSkill = new ScrollAppear('.content-skill section', 'active');
var scrollApperWorks = new ScrollAppear('.content-works section', 'active');
var scrollApperContact = new ScrollAppear('.content-contact section', 'active');
var skillappearStatus = scrollApperSkill.activeFunc();

var totalHeight = document.body.scrollHeight - window.innerHeight;
function topBtnProgress() {
    /* 전체 길이에서 탑 버튼이 얼마나 스크롤 됬는지 백분율로 구해 이벤트 적용 */
    var progressHeight = window.scrollY / totalHeight;
    topBtn.style.opacity = '' + progressHeight;
    if (topBtn.style.opacity == '0') topBtn.style.display = 'none';else topBtn.style.display = 'block';
};
topBtnProgress();
/* 스크롤 이벤트 */

/* homeIntro SVG 이벤트 */
if(browser != 'msie'){
    var homeSvgText = document.querySelector('.content-home h1'),
        homeSvgTextPath = document.querySelectorAll('.svgText path'),
        svgText = document.querySelectorAll('.svgText');

    var svgSum = 0,
        order = 0,
        addNum = 50,
        svgActionRun = false,
        svgAnimationFrame = void 0,
        svgTextPath = void 0,
        svgTextPathFrame = void 0,
        pathAction = false;

    for (var i = 0; i < homeSvgTextPath.length; i++) {
        homeSvgTextPath[i].classList.add('path' + i);
    }

    function svgAnimationInit() {
        for (var _i = 0; _i < homeSvgTextPath.length; _i++) {
            homeSvgTextPath[_i].style.fill = 'transparent';
            homeSvgTextPath[_i].style.stroke = 'transparent';
            homeSvgTextPath[_i].style.strokeWidth = '2';
        }
    }

    function svgAniSetting() {
        svgSum = 0;
        if (homeSvgTextPath.length != order) {
            svgAnimation();
            return;
        }
    }

    function svgAnimation() {
        svgActionRun = true;
        svgAnimationFrame = requestAnimationFrame(svgAnimation);
        svgSum = svgSum + addNum;

        homeSvgTextPath[order].style.strokeDasharray = svgSum;
        homeSvgTextPath[order].style.stroke = 'rgba(255, 255, 255, ' + svgSum / homeSvgTextPath[order].getTotalLength() + ')';
        homeSvgTextPath[order].style.fill = 'rgba(255, 255, 255, ' + svgSum / homeSvgTextPath[order].getTotalLength() + ')';
        homeSvgTextPath[order].style.filter = 'drop-shadow(1px 1px 3px rgba(255, 255, 255, ' + svgSum / homeSvgTextPath[order].getTotalLength() + ')';

        if (homeSvgTextPath[order].style.strokeDasharray >= Math.floor(homeSvgTextPath[order].getTotalLength() - 1)) {
            homeSvgTextPath[order].style.strokeDasharray = homeSvgTextPath[order].getTotalLength();
            homeSvgTextPath[order].style.stroke = 'rgba(255, 255, 255, 1)';
            homeSvgTextPath[order].style.fill = 'rgba(255, 255, 255, 1)';
            homeSvgTextPath[order].style.filter = 'drop-shadow(1px 1px 3px rgba(255, 255, 255, 1)';
            order++;

            cancelAnimationFrame(svgAnimationFrame);
            svgAniSetting();
        }
        if (svgActionRun == true && order == homeSvgTextPath.length) svgActionRun = false, addNum = 1;
    }

    svgAnimationInit();
    svgAniSetting();

    homeSvgText.onmousemove = function (e) {
        if (svgActionRun) return;
        if (e.target.getAttribute('class') == null) return;
        if (e.target.getAttribute('class').indexOf('path') == -1) return;
        svgTextPath = document.querySelector('.' + e.target.getAttribute('class'));
        svgSum = 0;

        if (pathAction == false) {
            pathAction = true;
            pathAnimation();
        }

        svgTextPath.onmouseleave = function () {
            cancelAnimationFrame(svgTextPathFrame);
            pathAction = false;
            svgTextPath.style.fill = 'rgba(255, 255, 255, 1)';
            svgTextPath.style.filter = 'drop-shadow(1px 1px 3px rgba(255, 255, 255, 1)';
            svgTextPath.style.strokeDasharray = svgTextPath.getTotalLength();
        };
    };

    function pathAnimation() {
        svgTextPathFrame = requestAnimationFrame(pathAnimation);
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        var a = Math.random();
        svgSum = svgSum + addNum;

        svgTextPath.style.transition = 'none';
        svgTextPath.style.fill = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        svgTextPath.style.filter = 'drop-shadow(1px 1px 3px rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        svgTextPath.style.strokeDasharray = svgSum;
    }

    function homePrallaxText() {
        if (window.innerWidth < window.scrollY) return;
        svgText[0].style.transform = 'perspective(100px) translate3d(-' + window.scrollY + 'px, ' + window.scrollY / 10 + '%, ' + window.scrollY / 10 + 'px) ';
        svgText[1].style.transform = 'perspective(100px) translate3d(' + window.scrollY + 'px, ' + window.scrollY / 10 + '%, ' + window.scrollY / 10 + 'px) ';
    }

    function svgTextResize() {
        for (var _i2 = 0; _i2 < svgText.length; _i2++) {
            svgText[_i2].style.height = 96;
        }if (window.innerWidth > 768) return;
        for (var _i3 = 0; _i3 < svgText.length; _i3++) {
            svgText[_i3].style.height = 64;
        }if (window.innerWidth > 480) return;
        for (var _i4 = 0; _i4 < svgText.length; _i4++) {
            svgText[_i4].style.height = 32;
        }
    }

    svgTextResize();
    /* homeIntro SVG 이벤트 */
}else{
    var h1 = document.querySelector('main h1');

    h1.style.fontSize = '3rem';
    h1.style.textShadow = '1px 1px 5px #111';
    h1.innerHTML = '프론트엔드 개발자가 되고 싶은<br> 박상민의 포트폴리오 사이트입니다.';
}

// works 4:3 비율 맞추는 box //
var portfolio = document.querySelectorAll('.content-works .portfolio > div');
function worksResize() {
    var imgWidth = portfolio[0].offsetWidth;
    for (var _i5 = 0; _i5 < portfolio.length; _i5++) {
        portfolio[_i5].style.height = imgWidth * 0.75 + 'px';
    }

    if(browser == 'msie'){
        var third = document.querySelector('.content-works .portfolio .third');

        if(768 < window.innerWidth && window.innerWidth <= 1024){
            third.style.marginTop = '15px';
        }else{
            third.style.marginTop = '0';
        }
    }
}
worksResize();
// works 4:3 비율 맞추는 box //
