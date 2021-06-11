var browser;

function browserCheck(){
    var agent = navigator.userAgent.toLowerCase();
    var browser;

    if(agent.indexOf('chrome') != -1) return browser = 'chrome';
    if(agent.indexOf('safari') != -1) return browser = 'safari';
    if(agent.indexOf('msie') != -1 || agent.indexOf('trident') != -1) return browser = 'msie';
}

browser = browserCheck();