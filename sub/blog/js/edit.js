'use strict';

var boldCondition = false;
var italicCondition = false;
var underlineCondition = false;
var justifyLeft = false;
var justifyCenter = false;
var justifyRight = false;
var list = false;

const editContentsWindow = document.querySelector('.edit-window-content');

function editBtn(e, type){
    e.preventDefault();

    if(type == 'folder'){
        folder();
    }else if(type == 'font'){
        font();
    }else if(type == 'bold'){
        bold();
    }else if(type == 'italic'){
        italic();
    }else if(type == 'underline'){
        underline();
    }else if(type == 'color'){
        color();
    }else if(type == 'justify-left'){
        jutify('justifyLeft');
    }else if(type == 'justify-center'){
        jutify('justifyCenter');
    }else if(type == 'justify-right'){
        jutify('justifyRight');
    }else if(type == 'list'){
        createList();
    }

    editContentsWindow.focus();
};

function reset(){

}

function folder(){
    var el = document.querySelector('.bring-btn');
    var el2 = document.querySelector('.bring-btn + ul');

    el.classList.toggle('active');

    el.classList.toggle('active') ?
    (el.classList.toggle('active'), el2.classList.toggle('active')) :
    (el.classList.toggle('active'), el2.classList.toggle('active'));
};

function font(){
    var el = document.querySelector('.font-btn');
    var el2 = document.querySelector('.font-btn + ul');

    el.classList.toggle('active');

    el.classList.toggle('active') ?
    (el.classList.toggle('active'), el2.classList.toggle('active')) :
    (el.classList.toggle('active'), el2.classList.toggle('active'));
};

var fontSelect = document.querySelector('.font-select');

fontSelect.onclick = function(e){
    console.log(`\"${e.target.dataset.font}\"`);
    document.execCommand('fontName', false, `\"${e.target.dataset.font}\"`);
    font();
    editContentsWindow.focus();
};


function bold(){
    var el = document.querySelector('.bold-btn');
    boldCondition = document.execCommand('bold');
   
    boldCondition?el.classList.toggle('active'):el.classList.toggle('active');
};

function italic(){
    var el = document.querySelector('.italic-btn');
    italicCondition = document.execCommand('italic');
    italicCondition?el.classList.toggle('active'):el.classList.toggle('active');
};

function underline(){
    var el = document.querySelector('.underline-btn');
    underlineCondition = document.execCommand('underline');
    underlineCondition?el.classList.toggle('active'):el.classList.toggle('active');
}

function color(){
    var el = document.querySelector('.color-btn');
    var el2 = document.querySelector('#color-box');

    el.classList.toggle('active');

    el.classList.toggle('active')?
    (el.classList.toggle('active'),
    el2.style.display = 'none'):
    (el.classList.toggle('active'),
    el2.style.display = 'flex')
}

function jutify(btn){
    justifyLeft = false;
    justifyCenter = false;
    justifyRight = false;

    var el = document.querySelector('.justify-left-btn');
    var el2 = document.querySelector('.justify-center-btn');
    var el3 = document.querySelector('.justify-right-btn');

    if(btn == 'justifyLeft'){
        justifyLeft = document.execCommand('justifyLeft');
    }else if(btn == 'justifyCenter'){
        justifyCenter = document.execCommand('justifyCenter');
    }else if(btn == 'justifyRight'){
        justifyRight = document.execCommand('justifyRight');
    }

    justifyLeft?el.classList.add('active'):el.classList.remove('active');
    justifyCenter?el2.classList.add('active'):el2.classList.remove('active');
    justifyRight?el3.classList.add('active'):el3.classList.remove('active');
}

function createList(){
    document.execCommand('insertunorderdList');
    
    list = document.execCommand('insertunorderdList');
};


const htmlViewClick = document.querySelector('.html-text-toggle');

htmlViewClick.onclick = function(e){
    e.preventDefault();
    htmlView();
}
    

function htmlView(){
    var contetnsText = document.querySelector('.edit-window-content');
    var contentsHtml = document.querySelector('.edit-window-html');

    var innerHtmlChange = contetnsText.innerHTML;
    var innerHtmlValue = innerHtmlChange;

    console.log(innerHtmlValue);

    contetnsText.classList.toggle('toggle');

    contetnsText.classList.toggle('toggle')?
        (contetnsText.classList.toggle('toggle'),
        contentsHtml.classList.toggle('toggle'),
        htmlViewClick.innerHTML = 'TEXT'):
        (contetnsText.classList.toggle('toggle'),
        contentsHtml.classList.toggle('toggle'),
        htmlViewClick.innerHTML = 'HTML')

    contentsHtml.textContent = `${innerHtmlValue}`;
};

function init(){
    document.querySelector('.justify-left-btn').classList.add('active');
}

init();


