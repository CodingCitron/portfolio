/* 스크롤 이벤트 */
window.onscroll = function () {
    scrollApperTopBtn.topBtnAppear();
    scrollApperAbout.activeFunc();
    skillappearStatus = scrollApperSkill.activeFunc();
    scrollApperWorks.activeFunc();
    scrollApperContact.activeFunc();
    topBtnProgress();
    
    if(browser === 'msie') return
    fnProgress();
    homePrallaxText();
};
/* 스크롤 이벤트 */
