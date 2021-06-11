class Slide{
    constructor(el, el2){
        this.el = document.querySelector(`${el}`);
        this.el2 = document.querySelectorAll(`${el} ${el2}`);
        this.paddingLeft = getComputedStyle(this.el).paddingLeft.replace('px', '');
        this.paddingRight = getComputedStyle(this.el).paddingRight.replace('px', '');
        this.marginLeft = getComputedStyle(this.el).marginLeft.replace('px', '');
        this.marginRight = getComputedStyle(this.el).marginRight.replace('px', '');
    }

    test(){
        console.log(this.el);
        console.log(this.el2);
        console.log(this.paddingLeft);
        console.log(this.paddingRight);
        console.log(this.marginLeft);
        console.log(this.marginRight);
    }

}

Slide.prototype.clickEvent = function(){

}

Slide.prototype.setting = function(){
    let width = this.el.offsetWidth - this.paddingLeft - this.paddingRight;
    
    for(let i=0; i<this.el2.length; i++){
        this.el2[i].style.width = `${width}px`;
    }
}

const workSlide = new Slide('.content-works .slide', '.project');
workSlide.setting();

let slideButton = document.querySelector('.slide .button-box');
slideButton.onclick = (e) => {
    if(!e.target.className.includes('prev') && !e.target.className.includes('next')) return;
}