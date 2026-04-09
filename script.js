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

    var secciones = ['inicio', 'problema', 'servicios', 'metodo', 'contacto'];
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
