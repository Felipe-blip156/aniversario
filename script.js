
/* ==========================
   CONFIGURACIÓN
========================== */

const fechaInicio = new Date("2025-11-14T00:00:00");


/* ==========================
   ENTRAR A LA HISTORIA
========================== */

const botonInicio = document.getElementById("botonInicio");
const portada = document.getElementById("portada");
const contenido = document.getElementById("contenido");

const musica = document.getElementById("musica");
const botonMusica = document.getElementById("botonMusica");
const ecualizador = document.getElementById("ecualizador");

musica.volume = 0.35;

botonInicio.addEventListener("click", function() {

    portada.classList.add("oculto");
    contenido.classList.remove("oculto");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    musica.play().catch(function() {
        // Si el navegador no permite reproducirla,
        // podrá iniciarse con el botón de música.
    });

});


// Botón para pausar y continuar la canción
botonMusica.addEventListener("click", function() {

    if (musica.paused) {
        musica.play().catch(function() {
            console.log("No se pudo reproducir la canción.");
        });
    } else {
        musica.pause();
    }

});


// Actualizar el botón y el ecualizador automáticamente
musica.addEventListener("play", function() {
    botonMusica.textContent = "⏸";
    botonMusica.setAttribute("aria-label", "Pausar música");
    ecualizador.classList.add("activo");
});

musica.addEventListener("pause", function() {
    botonMusica.textContent = "▶";
    botonMusica.setAttribute("aria-label", "Reproducir música");
    ecualizador.classList.remove("activo");
});


/* ==========================
   CONTADOR DE TIEMPO
========================== */

function actualizarContador() {

    const ahora = new Date();
    const diferencia = ahora - fechaInicio;

    if (Number.isNaN(fechaInicio.getTime()) || diferencia < 0) {
        return;
    }

    const segundosTotales = Math.floor(diferencia / 1000);

    const dias = Math.floor(segundosTotales / 86400);
    const horas = Math.floor((segundosTotales % 86400) / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;

    document.getElementById("dias").textContent = dias;
    document.getElementById("horas").textContent = horas;
    document.getElementById("minutos").textContent = minutos;
    document.getElementById("segundos").textContent = segundos;
}

actualizarContador();
setInterval(actualizarContador, 1000);


/* ==========================
   ABRIR CARTA
========================== */

const botonCarta = document.getElementById("botonCarta");
const sobre = document.getElementById("sobre");
const cartaAbierta = document.getElementById("cartaAbierta");

botonCarta.addEventListener("click", function() {

    sobre.style.display = "none";
    cartaAbierta.style.display = "block";

});


/* ==========================
   SORPRESA FINAL
========================== */

const botonSorpresa = document.getElementById("botonSorpresa");
const sorpresa = document.getElementById("sorpresa");

botonSorpresa.addEventListener("click", function() {

    sorpresa.classList.remove("oculto");
    botonSorpresa.classList.add("oculto");

    crearCorazones(20);

});


/* ==========================
   CORAZONES FLOTANTES
========================== */

const fondoCorazones = document.getElementById("corazonesFondo");

function crearCorazones(cantidad = 1) {

    for (let i = 0; i < cantidad; i++) {

        const corazon = document.createElement("span");

        corazon.classList.add("corazon-flotante");

        corazon.textContent = ["♥", "♡", "❤", "💕"][
            Math.floor(Math.random() * 4)
        ];

        corazon.style.left = Math.random() * 100 + "%";
        corazon.style.fontSize = (15 + Math.random() * 20) + "px";

        const duracion = 5 + Math.random() * 5;

        corazon.style.animationDuration = duracion + "s";

        fondoCorazones.appendChild(corazon);

        setTimeout(function() {
            corazon.remove();
        }, duracion * 1000);

    }

}

setInterval(function() {
    crearCorazones();
}, 600);



/* ==========================
   TARJETAS: 10 COSAS QUE AMO
========================== */

const tarjetasRazon = document.querySelectorAll(".tarjeta-razon");

tarjetasRazon.forEach(function(tarjeta) {

    tarjeta.addEventListener("click", function() {

        tarjeta.classList.toggle("volteada");

    });

});
