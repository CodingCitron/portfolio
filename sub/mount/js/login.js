(function(){
    const LOGIN_TAB = document.querySelector('.login-tabmenu'),
    LOGIN_FORM = document.querySelector('.login-form'),
    NONMEMBER_FORM = document.querySelector('.nonmember-form');
    let loginForm = document.querySelector('.loginForm');
    let nonMemberOrder = document.querySelector('.nonMemberOrder');

    nonMemberOrder.style.opacity = '0.2';

    LOGIN_TAB.addEventListener('click', (e)=>{

        if(e.target.className == 'loginForm'){
            LOGIN_FORM.style.display = 'block';
            loginForm.style.opacity = '1';
            NONMEMBER_FORM.style.display = 'none';
            nonMemberOrder.style.opacity = '0.2';
        }else if(e.target.className == 'nonMemberOrder'){
            LOGIN_FORM.style.display = 'none';
            loginForm.style.opacity = '0.2';
            NONMEMBER_FORM.style.display = 'block';
            nonMemberOrder.style.opacity = '2';
        }else{
            return
        }
    });
})();