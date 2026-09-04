/* =========================================
   1. STATE & FUNGSIONALITAS WHATSAPP ORDER
   ========================================= */
const whatsappNumber = "62895384482069";

let selectedSpec = {
    ram: "2 GB",
    cpu: "50%",
    storage: "5 GB",
    price: "Rp 5.000"
};

function selectRAM(ram, cpu, storage, price) {
    selectedSpec = { ram, cpu, storage, price };

    document.getElementById('disp-ram').textContent = ram;
    document.getElementById('disp-cpu').textContent = cpu;
    document.getElementById('disp-storage').textContent = storage;
    document.getElementById('disp-price').textContent = price;

    const buttons = document.querySelectorAll('#ram-selector .chip-btn');
    buttons.forEach(btn => {
        if (btn.textContent.includes(ram)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function executeOrder() {
    const message = `Order Panel ${selectedSpec.ram}`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

/* =========================================
   2. LOADER & SCROLL REVEAL EFEK
   ========================================= */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 800);
    }
});

// Scroll Progress Bar & Reveal
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';

    const backToTop = document.getElementById('back-to-top');
    if (winScroll > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            reveal.classList.add('reveal-visible');
        }
    });
});

document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =========================================
   3. PARTICLES CANVAS ANIMATION
   ========================================= */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
}));

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 210, 255, 0.4)';

    particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();
/* =========================================
   4. LOGIKA PEMUTAR MUSIK
   ========================================= */
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');

if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                iconPlay.style.display = 'none';
                iconPause.style.display = 'block';
            }).catch(err => {
                console.log("Gagal memutar audio:", err);
            });
        } else {
            bgMusic.pause();
            iconPlay.style.display = 'block';
            iconPause.style.display = 'none';
        }
    });
}
