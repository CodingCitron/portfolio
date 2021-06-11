if(browser != 'msie'){
  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  /* nav 캔버스 */
  var navCanvas = document.querySelector('#navCanvas');
  var c = navCanvas.getContext('2d');
  var menu = document.querySelector('nav.side .menu');

  navCanvas.width = innerWidth;
  navCanvas.height = innerHeight;

  var mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
  };

  var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

  var mouseMove = false;
  menu.addEventListener('mousemove', function (e) {
    if (e.target.nodeName != 'text' && e.target.nodeName != 'A' && e.target.nodeName != 'svg') {
      mouseMove = false;
      return;
    }
    mouseMove = true;
  });

  // Objects
  var Particle = function () {
    function Particle(x, y, radius, color) {
      _classCallCheck(this, Particle);

      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
    }

    _createClass(Particle, [{
      key: 'draw',
      value: function draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.shadowColor = this.color;
        c.shadowBlur = 15;
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
      }
    }, {
      key: 'update',
      value: function update() {
        this.draw();
      }
    }]);

    return Particle;
  }();

  // Implementation
  var particles = void 0;
  function navCanvasinit() {
    particles = [];

    for (var i = 0; i < 1500; i++) {
      var canvasWidth = navCanvas.width + 1000;
      var canvasHeight = navCanvas.height + 2000;

      var x = Math.random() * canvasWidth - canvasWidth / 2;
      var y = Math.random() * canvasHeight - canvasHeight / 2;
      var radius = 2 * Math.random();

      var color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, radius, color));
    }
  }

  // Animation Loop
  var radians = 0;
  var alpha = 1;
  function navAnimate() {
    requestAnimationFrame(navAnimate);
    var grd = c.createLinearGradient(0, 0, 200, 0);
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "white");
    c.fillStyle = 'rgba(17, 17, 17, ' + alpha + ')';
    c.fillRect(0, 0, navCanvas.width, navCanvas.height);

    c.save();
    c.translate(navCanvas.width / 2, navCanvas.height / 2);
    c.rotate(radians);
    particles.forEach(function (particle) {
      particle.update();
    });
    c.restore();

    radians += 0.003;

    if (mouseMove && alpha >= 0.03) {
      alpha -= 0.01;
    } else if (!mouseMove && alpha < 1) {
      alpha += 0.01;
    }
  }
  navCanvasinit();
  navAnimate();
}else{
  function canvasReplace(){
    var menu = document.querySelector('nav .menu');
    var menuList = document.querySelectorAll('nav .menu a');
    menu.style.paddingTop = '100px';
    menu.style.fontSize = '2rem';
    menuList[0].innerText = 'HOME';
    menuList[1].innerText = 'ABOUT';
    menuList[2].innerText = 'SKILL';
    menuList[3].innerText = 'WORKS';
    menuList[4].innerText = 'CONTACT';
  }
  canvasReplace();
}

/* nav 캔버스 */
