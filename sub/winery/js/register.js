var idCheck = false;
var pwdCheck = false;

function checkId(id){
	var mark = document.querySelector('.register div.id-check');
	var mobileMark = document.querySelector('.register span.id-check');
	
	if(id != ''){
		var req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				if(this.response == 'false'){
				
				if(document.registerForm.userid.value.length > 3){
					mark.classList.add('pass');
					mark.innerHTML = '사용 가능한 아이디입니다.';
					mobileMark.classList.add('pass');
					mobileMark.innerHTML = '사용 가능한 아이디입니다.';
					idCheck = true;
				}
				
				}else if(this.response == 'true'){
					mark.classList.remove('pass');
					mark.innerHTML = '중복된 아이디입니다.';
					mobileMark.classList.remove('pass');
					mobileMark.innerHTML = '중복된 아이디입니다.';
					idCheck = false;
				}
			}
		}
		req.open("GET", "IdCheck?userid=" + id, true);
		req.send();
	}else{
		mark.innerHTML = '';
		mark.classList.remove('pass');
		mobileMark.innerHTML = '';
		mobileMark.classList.remove('pass');
		idCheck = false;
	}
}

function checkPwd(pwd){
	
	var pwd1 = document.registerForm.userpwd.value;
	var mark = document.querySelector('.register div.pwd-check');
	var mobileMark = document.querySelector('.register span.pwd-check');

	if(pwd != ''){
		if(pwd1 != pwd){
			mark.classList.remove('pass');
			mark.innerHTML = '비밀번호 불일치';
			mobileMark.classList.remove('pass');
			mobileMark.innerHTML = '비밀번호 불일치';
			pwdCheck = false;
		}else{
			mark.classList.add('pass');
			mark.innerHTML = '비밀번호 일치';
			mobileMark.classList.add('pass');
			mobileMark.innerHTML = '비밀번호 일치';
			pwdCheck = true;
		}
	}else{
		mark.classList.remove('pass');
		mark.innerHTML = '';
		mobileMark.classList.remove('pass');
		mobileMark.innerHTML = '';
		pwdCheck = false;
	}
}

function validate(){
	checkId(document.registerForm.userid.value);
	checkPwd(document.registerForm.userpwdcheck.value);
	
	if(document.registerForm.userid.value.length == 0){
		alert('아이디를 입력하세요.');
		return false;
	}
	
	if(document.registerForm.userid.value.length < 4){
		alert('아이디는 네 글자 이상 입력하세요.');
		return false;
	}
	
	if(idCheck == false){
		alert('아이디가 중복 되었습니다.');
		return false;
	}
	
	if(document.registerForm.userpwd.value.length == 0){
		alert('비밀번호를 입력하세요.');
		return false;
	}
	
	if(document.registerForm.userpwd.value.length < 10){
		alert('비밀번호는 열 글자 이상 입력하세요.');
		return false;
	}
	
	if(pwdCheck == false){
		alert('비밀번호가 일치하지 않습니다.');
		return false;
	}
	
	if(document.registerForm.useremail.value.length == 0){
		alert('이메일을 입력하세요.');
		return false;
	}
	
	if(document.registerForm.useremail.value.length == 0){
		alert('이메일을 입력하세요.');
		return false;
	}
	
	if(document.registerForm.useremail.value.length != 0){
		var email = document.registerForm.useremail.value;
		var findStr = "@";
		
		if(email.indexOf(findStr) == -1) {
			alert('@를 포함해 주세요.');
			return false;
		}
	}
	
	if(document.registerForm.userbirth.value == 0){
		alert('생일을 입력하세요.');
		return false;
	}
	
	if(document.registerForm.userbirth.value == 0){
		alert('생일을 입력하세요.');
		return false;
	}
	
	if(isNaN(document.registerForm.userbirth.value) == true){
		alert('숫자만 입력하세요.');
		return false;
	}
	
	if(document.registerForm.userbirth.value != 0){
		var check = isValidDate(document.registerForm.userbirth.value);
		
		if(check == true){
			document.registerForm.submit();
		}else{
			return false;
		}
	}
	
	document.registerForm.submit();
}

function isValidDate(dateStr) {
    var year = Number(dateStr.substr(0,4)); 
    var month = Number(dateStr.substr(4,2));
    var day = Number(dateStr.substr(6,2));
    var today = new Date(); // 날자 변수 선언
    var yearNow = today.getFullYear();
    var adultYear = yearNow-20;

    if (year < 1900 || year > adultYear){
         alert("년도를 확인하세요. "+adultYear+"년생 이전 출생자만 등록 가능합니다.");
         return false;
    }
    if (month < 1 || month > 12) { 
         alert("달은 1월부터 12월까지 입력 가능합니다.");
         return false;
    }
   if (day < 1 || day > 31) {
         alert("일은 1일부터 31일까지 입력가능합니다.");
         return false;
    }
    if ((month==4 || month==6 || month==9 || month==11) && day==31) {
         alert(month+"월은 31일이 존재하지 않습니다.");
         return false;
    }
    if (month == 2) {
         var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
         if (day>29 || (day==29 && !isleap)) {
              alert(year + "년 2월은  " + day + "일이 없습니다.");
              return false;
         }
    }
    return true;
}