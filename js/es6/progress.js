/* 프로그레스 바 애니메이션 */
const contentProgress = document.querySelector('.content-skill .progress'),
progress = document.querySelectorAll('.content-skill .progress .mark > div'),
progressLi = document.querySelector('.content-skill .box li');
let time = 1,
animeStatus = false;

function fnProgress(){
    let info = {count : 0};
    let countUpdate = {};

    if(contentProgress.getBoundingClientRect().top < window.innerHeight && skillappearStatus == true){
        progressLi.ontransitionend = (e) => {
            if(e.currentTarget != e.target) return
            progress.forEach(function(element, index){
                progress[index].style.transition = `${time}s`;
                progress[index].style.width = progress[index].getAttribute('data-percent') + '%';

                if(animeStatus == false){
                    countUpdate[index] = anime({
                        targets: info,
                        autoplay: true,
                        count: progress[index].getAttribute('data-percent'),
                        easing: 'linear',
                        round: 1,
                        duration: time * 1000,
                        update: function() {
                            progress[index].innerHTML = info.count + '%';
                        }
                    });
                }
            });
            animeStatus = true;
        }
    }else{
        fnProgressInit();
        animeStatus = false;
    }
}

function fnProgressInit(){
    progress.forEach(function(element, index){
        progress[index].style.width = 0 + '%';
        progress[index].innerHTML = 0 + '%';
    });
}

fnProgressInit();
/* 프로그레스 바 애니메이션 */
