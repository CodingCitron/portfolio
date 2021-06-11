'use strict';

function ToggleBtn(el, toggleName, el2){
    this.el = document.querySelector(`${el}`);
    this.subFuncEl = document.querySelector(`${el2}`);
    this.toggleName = toggleName;
    this.toggleFunc = function(){
        this.el.onclick = () => {
            if(!this.subFuncEl){
                this.el.classList.toggle(`${this.toggleName}`);
            }else{
                this.el.classList.toggle(`${this.toggleName}`);
                this.subFuncEl.classList.toggle(`${this.toggleName}`);
            }
        };
    };
};