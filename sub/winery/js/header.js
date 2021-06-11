    (function() {
        const header = document.querySelector('header'),
        hamburger = document.querySelector('.hd-burger-btn'),
        topMenu = document.querySelector('.hd-topmenu'),
        nav = document.querySelector('nav'),
        html = document.documentElement,
        dark = document.querySelector('.dark');

        document.addEventListener('scroll', ()=>{
            document.documentElement.scrollTop > 80? 
            header.style.background = 'rgba(43,46,74,1)':header.style.background = 'var(--hd-bg-color)';
        });
        
        hamburger.addEventListener('click', ()=>{
            hamburger.classList.toggle('hd-burger-toggle')?
            (nav.style.transform = 'translateX(0%)', html.style.overflowY= 'hidden', topMenu.classList.add('disable'),
            dark.style.display = 'block'):
            (nav.style.transform = 'translateX(-100%)', html.style.overflowY = 'scroll', topMenu.classList.remove('disable'),
            dark.style.display = 'none')
        });
    })();
