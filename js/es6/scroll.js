/* 스크롤 이벤트 */
window.onscroll = () =>{
    scrollApperTopBtn.topBtnAppear();
    scrollApperAbout.activeFunc();
    skillappearStatus = scrollApperSkill.activeFunc();
    scrollApperWorks.activeFunc();
    scrollApperContact.activeFunc();
    fnProgress();
    topBtnProgress();
    homePrallaxText();
}
/* 스크롤 이벤트 */
