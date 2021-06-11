/* 리사이즈 이벤트 */
var resizeStatus = false;
var onceAct = false;
var navResize;

window.onresize = function () {
    resizeStatus = true;
    navResize = true;
    worksResize();

    if(browser === 'msie') return;
    svgTextResize();
    /* 일정 간격 캔버스 리사이즈 이벤트*/
    if (resizeStatus == true) {
        if (onceAct == false) {
            onceAct = true;
            setTimeout(function () {
                resizeStatus == false;
                onceAct = false;

                navCanvas.width = innerWidth;
                navCanvas.height = innerHeight;

                navCanvasinit();
            }, 500);
        }
    }
        /* 일정 간격 캔버스 리사이즈 이벤트*/
};
/* 리사이즈 이벤트 */
