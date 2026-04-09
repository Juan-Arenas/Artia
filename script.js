/* ========================================
   ARTIA - Script principal
   ======================================== */


// ---- Estrellas de fondo ----
(function () {
    var layer = document.getElementById('stars');
    for (var i = 0; i < 200; i++) {
        var s = document.createElement('div');
        s.className = 's';
        var size = Math.random() * 2.5 + 0.5;
        var o = (Math.random() * 0.2 + 0.05).toFixed(2);
        s.style.cssText =
            'width:' + size + 'px;' +
            'height:' + size + 'px;' +
            'top:' + Math.random() * 100 + '%;' +
            'left:' + Math.random() * 100 + '%;' +
            '--d:' + (Math.random() * 4 + 2).toFixed(1) + 's;' +
            '--delay:-' + (Math.random() * 5).toFixed(1) + 's;' +
            '--o:' + o + ';';
        layer.appendChild(s);
    }
})();


// ---- AOS (animaciones al hacer scroll) ----
AOS.init({
    duration: 900,
    once: false,
    mirror: true,
    offset: 80,
    easing: 'ease-out-cubic'
});


// ---- Navbar scroll & seccion activa ----
var nav = document.getElementById('nav');

window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    var secciones = ['inicio', 'problema', 'servicios', 'metodo', 'sobre-mi', 'contacto'];
    var actual = '';

    secciones.forEach(function (id) {
        var el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) actual = id;
    });

    document.querySelectorAll('.nav-links a').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + actual);
    });
});


// ---- Menu movil ----
function abrirMenu() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('overlay').classList.add('open');
}

function cerrarMenu() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
}


// ---- Frases marquee ----
var frases = [
    '"Tu empresa no necesita más esfuerzo, necesita estructura."',
    '"Automatiza sin perder control."',
    '"La tecnología ejecuta, las personas convierten."',
    '"De negocio improvisado a sistema escalable."',
    '"La IA abre la puerta. Nosotros cerramos la venta."',
    '"Habla con un humano. Empieza a escalar."',
    '"Convierte mensajes en ventas automáticamente."',
    '"Tu página trabajando como vendedor 24/7."',
];

var m = document.getElementById('marquee');
var todas = frases.concat(frases);
m.innerHTML = todas.map(function (f) {
    return '<div class="frase-pill">' + f + '</div>';
}).join('');


// ---- Video hero: Artia.mp4 → Artia 2.mp4 (loop) ----
(function () {
    var video = document.getElementById('heroVideo');
    var sources = ['Artia.mp4', 'Artia 2.mp4'];
    var currentIndex = 0;

    video.addEventListener('ended', function () {
        currentIndex = (currentIndex + 1) % sources.length;
        video.src = sources[currentIndex];
        video.play();
    });
})();


// ---- Constellation canvas (Sobre Mi) ----
(function () {
    var canvas = document.getElementById('constellationCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var section = document.getElementById('sobre-mi');
    var animationId = null;
    var isVisible = false;

    // Stars
    var stars = [];
    var STAR_COUNT = 120;
    var CONNECT_DIST = 130;

    // Shooting stars
    var shootingStars = [];
    var shootTimer = 0;

    function resize() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }

    function initStars() {
        stars = [];
        for (var i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.8 + 0.4,
                brightness: Math.random() * 0.5 + 0.3,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.005
            });
        }
    }

    function spawnShootingStar() {
        var startX = Math.random() * canvas.width * 0.6;
        var startY = Math.random() * canvas.height * 0.3;
        shootingStars.push({
            x: startX,
            y: startY,
            vx: 4 + Math.random() * 3,
            vy: 2 + Math.random() * 2,
            life: 1,
            decay: 0.015 + Math.random() * 0.01,
            length: 40 + Math.random() * 60
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (var i = 0; i < stars.length; i++) {
            for (var j = i + 1; j < stars.length; j++) {
                var dx = stars[i].x - stars[j].x;
                var dy = stars[i].y - stars[j].y;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    var alpha = (1 - dist / CONNECT_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(stars[j].x, stars[j].y);
                    var grad = ctx.createLinearGradient(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
                    grad.addColorStop(0, 'rgba(99, 102, 241, ' + alpha + ')');
                    grad.addColorStop(1, 'rgba(168, 85, 247, ' + alpha + ')');
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Draw & update stars
        for (var k = 0; k < stars.length; k++) {
            var s = stars[k];
            s.pulse += s.pulseSpeed;
            var glow = s.brightness + Math.sin(s.pulse) * 0.2;
            if (glow < 0.1) glow = 0.1;

            // Glow
            var glowGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
            glowGrad.addColorStop(0, 'rgba(165, 180, 252, ' + (glow * 0.3) + ')');
            glowGrad.addColorStop(1, 'rgba(165, 180, 252, 0)');
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
            ctx.fillStyle = glowGrad;
            ctx.fill();

            // Core
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(224, 231, 255, ' + glow + ')';
            ctx.fill();

            // Move
            s.x += s.vx;
            s.y += s.vy;
            if (s.x < -10) s.x = canvas.width + 10;
            if (s.x > canvas.width + 10) s.x = -10;
            if (s.y < -10) s.y = canvas.height + 10;
            if (s.y > canvas.height + 10) s.y = -10;
        }

        // Draw shooting stars
        shootTimer++;
        if (shootTimer > 180 + Math.random() * 300) {
            spawnShootingStar();
            shootTimer = 0;
        }

        for (var m = shootingStars.length - 1; m >= 0; m--) {
            var ss = shootingStars[m];
            var tailX = ss.x - (ss.vx / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy)) * ss.length * ss.life;
            var tailY = ss.y - (ss.vy / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy)) * ss.length * ss.life;

            var ssGrad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
            ssGrad.addColorStop(0, 'rgba(168, 85, 247, 0)');
            ssGrad.addColorStop(0.5, 'rgba(165, 180, 252, ' + (ss.life * 0.4) + ')');
            ssGrad.addColorStop(1, 'rgba(255, 255, 255, ' + (ss.life * 0.9) + ')');

            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(ss.x, ss.y);
            ctx.strokeStyle = ssGrad;
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Head glow
            var headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 6);
            headGlow.addColorStop(0, 'rgba(255, 255, 255, ' + (ss.life * 0.8) + ')');
            headGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');
            ctx.beginPath();
            ctx.arc(ss.x, ss.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = headGlow;
            ctx.fill();

            ss.x += ss.vx;
            ss.y += ss.vy;
            ss.life -= ss.decay;

            if (ss.life <= 0 || ss.x > canvas.width + 50 || ss.y > canvas.height + 50) {
                shootingStars.splice(m, 1);
            }
        }

        if (isVisible) {
            animationId = requestAnimationFrame(draw);
        }
    }

    function start() {
        if (!isVisible) {
            isVisible = true;
            resize();
            if (stars.length === 0) initStars();
            draw();
        }
    }

    function stop() {
        isVisible = false;
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // Observe visibility for performance
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    start();
                    // Mostrar botón de música si está en la sección
                    document.getElementById('activateMusicBtn').classList.add('visible');
                } else {
                    stop();
                    // Ocultar botón de música si sale de la sección y pausar si fuera necesario
                    document.getElementById('activateMusicBtn').classList.remove('visible');
                }
            });
        }, { threshold: 0.05 });
        observer.observe(section);
    } else {
        start();
    }

    window.addEventListener('resize', function () {
        resize();
        initStars();
    });

    // --- Music Toggle Logic ---
    var musicBtn = document.getElementById('activateMusicBtn');
    var musicAudio = document.getElementById('sobreMiMusic');
    var isPlaying = false;

    musicBtn.addEventListener('click', function() {
        if (!isPlaying) {
            musicAudio.play().then(() => {
                isPlaying = true;
                musicBtn.classList.add('playing');
                musicBtn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                    Pausar Música
                `;
            }).catch(e => console.log("User interaction required for audio"));
        } else {
            musicAudio.pause();
            isPlaying = false;
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                Activar Música
            `;
        }
    });

})();
