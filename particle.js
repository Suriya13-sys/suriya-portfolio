const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let stars = [];
let nebulaClouds = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createScene();
}

function createScene() {
  // Stars
  stars = [];
  const count = Math.floor((canvas.width * canvas.height) / 6000);
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.1,
      opacity: Math.random() * 0.9 + 0.1,
      twinkleSpeed: Math.random() * 0.03 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      drift: (Math.random() - 0.5) * 0.04,
      color: Math.random() < 0.15 ? 
        `rgba(150, 200, 255,` :  // blue-white stars
        Math.random() < 0.1 ? 
        `rgba(255, 220, 180,` :  // warm yellow stars
        `rgba(255, 255, 255,`    // white stars
    });
  }

  // Nebula clouds
  nebulaClouds = [];
  for (let i = 0; i < 5; i++) {
    nebulaClouds.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 300 + 150,
      color: Math.random() < 0.5 ? 
        [60, 40, 100] :   // purple nebula
        [20, 40, 80],     // blue nebula
      opacity: Math.random() * 0.04 + 0.01
    });
  }
}

let frame = 0;

function drawNebula() {
  nebulaClouds.forEach(n => {
    const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
    gradient.addColorStop(0, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, ${n.opacity})`);
    gradient.addColorStop(1, `rgba(${n.color[0]}, ${n.color[1]}, ${n.color[2]}, 0)`);
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  });
}

function drawStars() {
  stars.forEach(s => {
    const twinkle = Math.sin(frame * s.twinkleSpeed * 100 + s.twinkleOffset) * 0.3 + 0.7;
    const opacity = s.opacity * twinkle;

    // Glow effect for bigger stars
    if (s.r > 0.9) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = `${s.color}${opacity * 0.1})`;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `${s.color}${opacity})`;
    ctx.fill();

    s.x += s.drift;
    if (s.x < 0) s.x = canvas.width;
    if (s.x > canvas.width) s.x = 0;
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frame += 0.01;
  drawNebula();
  drawStars();
  requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();