/* 리사이즈 이벤트 */
let resizeStatus = false;
let onceAct = false;

window.onresize = () => {
    resizeStatus = true;
    navResize = true;
    svgTextResize();
    worksResize();
    /* 일정 간격 캔버스 리사이즈 이벤트*/
    if(resizeStatus == true){
        if(onceAct == false){
            onceAct = true;
            setTimeout(() => {
                resizeStatus == false;
                onceAct = false;

                navCanvas.width = innerWidth;
                navCanvas.height = innerHeight;
            
                navCanvasinit();
            }, 500);
        }
    }
    /* 일정 간격 캔버스 리사이즈 이벤트*/
}
/* 리사이즈 이벤트 */