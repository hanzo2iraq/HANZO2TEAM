/* ====== قائمة التنقل للجوال ====== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.innerHTML = navMenu.classList.contains('active')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

/* ====== شريط التنقل يتغير عند التمرير ====== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(7, 7, 13, 0.98)';
    navbar.style.borderBottomColor = 'rgba(255, 179, 32, 0.15)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    navbar.style.borderBottomColor = 'rgba(255, 179, 32, 0.1)';
  }
});

/* ====== Accordion ====== */
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');

    document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
      activeItem.classList.remove('active');
    });

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

/* ====== عدّاد الأرقام ====== */
const statNumbers = document.querySelectorAll('.stat-number');

function animateStats() {
  statNumbers.forEach(el => {
    const target = +el.getAttribute('data-target');
    const current = +el.innerText;
    const increment = target / 60;

    if (current < target) {
      el.innerText = Math.ceil(current + increment);
      requestAnimationFrame(animateStats);
    } else {
      el.innerText = target;
    }
  });
}

const aboutSection = document.getElementById('about');
let statsAnimated = false;

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      statNumbers.forEach(el => el.innerText = '0');
      animateStats();
    }
  });
}, { threshold: 0.5 });

statsObserver.observe(aboutSection);

/* ====== نموذج التواصل ====== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button');
  const originalText = btn.innerText;
  btn.innerText = '✓ تم الإرسال';
  contactForm.reset();
  setTimeout(() => {
    btn.innerText = originalText;
  }, 3000);
});

/* ====== تأثير Fade In للبطاقات ====== */
const fadeElements = document.querySelectorAll(
  '.feature-card, .guide-step, .stat-card'
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  fadeObserver.observe(el);
});

/* ====== مشغل الصوت الخلفي ====== */
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;

function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.classList.add('muted');
    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    isMusicPlaying = false;
  } else {
    bgMusic.play().catch(() => {});
    musicToggle.classList.remove('muted');
    musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    isMusicPlaying = true;
  }
}

musicToggle.addEventListener('click', toggleMusic);

// محاولة تشغيل الموسيقى تلقائياً عند دخول المستخدم
document.addEventListener('click', function autoPlay() {
  if (!isMusicPlaying) {
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    }).catch(() => {});
  }
  document.removeEventListener('click', autoPlay);
}, { once: true });

// كتم الموسيقى تلقائياً إذا كان المتصفح يمنع التشغيل التلقائي
bgMusic.addEventListener('play', () => {
  isMusicPlaying = true;
  musicToggle.classList.remove('muted');
  musicToggle.innerHTML = '<i class="fas fa-music"></i>';
});

bgMusic.addEventListener('pause', () => {
  isMusicPlaying = false;
  musicToggle.classList.add('muted');
  musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
});

/* ====== نافذة العرض الترويجي ====== */
const promoModal = document.getElementById('promoModal');
const promoClose = document.getElementById('promoClose');
const promoBuyBtn = document.getElementById('promoBuyBtn');
const promoIcon = document.getElementById('promoIcon');
const promoTitle = document.getElementById('promoTitle');
const promoDesc = document.getElementById('promoDesc');
const promoTimer = document.getElementById('promoTimer');

const promoOptions = [
  ['<i class="fas fa-rocket"></i>', 'تعبت من أسعار الألعاب الفلكية؟ 💸', 'ليش تدفع 70$ (أكثر من 100 ألف دينار) على لعبة واحدة فقط، بينما تقدر تحمّل ألعابك المفضلة مباشرة من ستيم وتلعب أونلاين بـ 10 آلاف فقط؟', 'فعّل حسابك بـ 10 آلاف الآن 🚀'],
  ['<i class="fas fa-fire"></i>', '70$ للعبة واحدة؟! مو هواية؟ 🛑', 'بسعر وجبة أكل أو كارت شحن.. برنامج HANZO2TEAM يفتح لك باب التحميل المباشر من ستيم مع ميزة الأونلاين والتختيم لكل الألعاب بسعر التراب!', 'اطلب التفعيل الفوري 🎮'],
  ['<i class="fas fa-piggy-bank"></i>', 'وفر فلوسك للتطوير وخلي الألعاب علينا! 💻✨', 'لا تضيع ميزانيتك على أسعار الشركات المرتفعة. احصل على ألعابك بملفاتها الأصلية كاملة وبأمان تام بـ 10,000 دينار فقط (دفعة واحدة مدى الحياة).', 'اشترك الآن واضمن مكتبتك ⚡']
];

let promoCountdown;

function startPromoTimer() {
  if (!promoTimer) return;
  let min = 4, sec = 59;
  promoTimer.innerHTML = '⏳ 04:59';
  clearInterval(promoCountdown);
  promoCountdown = setInterval(() => {
    sec--;
    if (sec < 0) { min--; sec = 59; }
    if (min < 0) { clearInterval(promoCountdown); promoTimer.innerHTML = '⚠️ انتهى'; return; }
    promoTimer.innerHTML = '⏳ ' + String(min).padStart(2,'0') + ':' + String(sec).padStart(2,'0');
  }, 1000);
}

function showPromo() {
  const i = Math.floor(Math.random() * 3);
  if (promoIcon) promoIcon.innerHTML = promoOptions[i][0];
  if (promoTitle) promoTitle.innerHTML = promoOptions[i][1];
  if (promoDesc) promoDesc.innerHTML = promoOptions[i][2];
  if (promoBuyBtn) promoBuyBtn.innerHTML = promoOptions[i][3];
  startPromoTimer();
  promoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

setTimeout(() => {
  setTimeout(showPromo, Math.random() * 13000 + 7000);
}, 3000);

function closePromo() {
  promoModal.classList.remove('active');
  document.body.style.overflow = '';
  clearInterval(promoCountdown);
}

if (promoClose) promoClose.addEventListener('click', closePromo);
if (promoModal) promoModal.addEventListener('click', (e) => {
  if (e.target === promoModal) closePromo();
});
if (promoBuyBtn) promoBuyBtn.addEventListener('click', () => {
  closePromo();
  if (buyModal) buyModal.classList.add('active');
});

promoBuyBtn.addEventListener('click', () => {
  closePromo();
  buyModal.classList.add('active');
});

/* ====== نافذة الشراء ====== */
const buyBtn = document.getElementById('buyBtn');
const buyModal = document.getElementById('buyModal');
const modalClose = document.getElementById('modalClose');

buyBtn.addEventListener('click', () => {
  buyModal.classList.add('active');
  document.body.style.overflow = 'hidden';
});

function closeBuyModal() {
  buyModal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeBuyModal);

buyModal.addEventListener('click', (e) => {
  if (e.target === buyModal) closeBuyModal();
});

/* ====== تنعيم التمرير ====== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ====== جسيمات متحركة (Particles) ====== */
const canvas = document.createElement('canvas');
canvas.id = 'particlesCanvas';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.scrollHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
    // تأثير الماوس
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      this.x -= dx * 0.01;
      this.y -= dy * 0.01;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 179, 32, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) {
  particles.push(new Particle());
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY + window.scrollY;
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ====== مؤثرات صوتية (Audio Visualizer) ====== */
let audioCtx, analyser, source, frequencyData;
let visualizerActive = false;

function initAudioVisualizer() {
  if (visualizerActive) return;
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    source = audioCtx.createMediaElementSource(bgMusic);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    visualizerActive = true;
    animateVisualizer();
  } catch (e) {}
}

const visualizerCanvas = document.createElement('canvas');
visualizerCanvas.id = 'visualizerCanvas';
document.querySelector('.hero').appendChild(visualizerCanvas);

let vizCtx = visualizerCanvas.getContext('2d');
let vizBars = [];

function resizeViz() {
  const hero = document.querySelector('.hero');
  visualizerCanvas.width = hero.offsetWidth;
  visualizerCanvas.height = 80;
}
resizeViz();
window.addEventListener('resize', resizeViz);

function animateVisualizer() {
  if (!visualizerActive) return;
  analyser.getByteFrequencyData(frequencyData);
  vizCtx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

  const bars = 48;
  const step = Math.floor(frequencyData.length / bars);
  const barW = (visualizerCanvas.width / bars) * 0.7;
  const gap = (visualizerCanvas.width / bars) * 0.3;

  for (let i = 0; i < bars; i++) {
    let sum = 0;
    for (let j = 0; j < step; j++) {
      sum += frequencyData[i * step + j];
    }
    const avg = sum / step;
    const h = (avg / 255) * visualizerCanvas.height * 0.9;

    const x = i * (barW + gap) + gap / 2;
    const y = visualizerCanvas.height - h;

    const grad = vizCtx.createLinearGradient(x, y, x, visualizerCanvas.height);
    grad.addColorStop(0, '#ffb320');
    grad.addColorStop(0.5, '#ff8c00');
    grad.addColorStop(1, 'rgba(255, 179, 32, 0.1)');

    vizCtx.fillStyle = grad;
    vizCtx.beginPath();
    vizCtx.roundRect(x, y, barW, h, [2, 2, 0, 0]);
    vizCtx.fill();
  }

  requestAnimationFrame(animateVisualizer);
}

// ربط المشغل الصوتي مع الفيجوالايزر
const origPlay = bgMusic.play.bind(bgMusic);
bgMusic.play = function() {
  initAudioVisualizer();
  return origPlay();
};

/* ====== تأثير لمعة على النصوص ====== */
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
  setInterval(() => {
    heroTitle.style.textShadow =
      `0 0 20px rgba(255, 179, 32, ${0.2 + Math.random() * 0.3})`;
  }, 500);
}
