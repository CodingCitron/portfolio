/* nav 캔버스 */
const navCanvas = document.querySelector('#navCanvas');
const c = navCanvas.getContext('2d');
const menu = document.querySelector('nav.side .menu');

navCanvas.width = innerWidth;
navCanvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

let mouseMove = false
menu.addEventListener('mousemove', (e) => {
    if(e.target.nodeName != 'text' && e.target.nodeName != 'A' && e.target.nodeName != 'svg'){
        mouseMove = false;
        return;
    }
    mouseMove = true;
});

// Objects
class Particle{
  constructor(x, y, radius, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.shadowColor = this.color;
    c.shadowBlur = 15;
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update(){
    this.draw();
  }
}

// Implementation
let particles;
function navCanvasinit() {
  particles = [];

  for (let i = 0; i < 1500; i++) {
    const canvasWidth = navCanvas.width + 1000;
    const canvasHeight = navCanvas.height + 2000;

    const x = Math.random() * canvasWidth - canvasWidth / 2;
    const y = Math.random() * canvasHeight - canvasHeight / 2;
    const radius = 2 * Math.random();

    const color = colors[Math.floor(Math.random() * colors.length)];
    particles.push(new Particle(x, y, radius, color));
  }
}

// Animation Loop
let radians = 0;
let alpha = 1;
function navAnimate(){
  requestAnimationFrame(navAnimate);
  var grd = c.createLinearGradient(0, 0, 200, 0);
  grd.addColorStop(0, "red");
  grd.addColorStop(1, "white");
  c.fillStyle = `rgba(17, 17, 17, ${alpha})`;
  c.fillRect(0, 0, navCanvas.width, navCanvas.height);

  c.save();
  c.translate(navCanvas.width / 2, navCanvas.height / 2);
  c.rotate(radians);
  particles.forEach((particle) => {
    particle.update();
  })
  c.restore();

  radians += 0.003;

  if(mouseMove && alpha >= 0.03){
    alpha -= 0.01;
  }else if (!mouseMove && alpha < 1){
    alpha += 0.01;
  }
}

navCanvasinit();
navAnimate();
/* nav 캔버스 */