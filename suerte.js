// --- 1. TU LISTA PERSONALIZADA ---
const listaOriginal = [
    "Una cita en el cine 🎬",
    "🎮 Dejarte ganar en lo que sea (nee mi equipo)",
    "Unos besitos muamuamua",
    "Unos besotes grrr (con brbrbr incluido)",
    "Un abachito💞",
    "Cita en una cafetería ☕",
    "Cita en el acuario para ver pinwis🐧",
    "Inmunidad por olvidar algo (neee mi equipo)",
    "Una cita a donde queya ✨",
    "Eliminar al gallo de pelea 🐓🚫",
    "Un ah ah ah ah 🔥",
    "Tu y yo toda la eternidad sisis",
    "Evasión de pelea: repele la pelea y debemos amarnos mucho sisisis 🛡️💖",
    "Un abachito que será abachote después sisis",
    "Comida favorita 🍔",
    "Romper distancia entre nosotras yadiosmio testaño :((",
    "Ver una peli juntitas💖",
    "Un masajito 💆",
    "Una tarde juntitas 🌇"
];

// Variables de estado
let disponibles = [];
let cuponActualTexto = "";
let indiceParaBorrar = null; // Para saber qué cupón borrar en el modal

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    cargarCuponesGuardados();
    disponibles = [...listaOriginal]; // Llenamos la baraja
});

// --- FUNCIONES DEL JUEGO ---
function revelarCupon() {
    // Si se acaban, rellenamos
    if (disponibles.length === 0) {
        disponibles = [...listaOriginal];
    }

    // Elegir al azar y quitar de disponibles
    const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
    const fraseGanadora = disponibles[indiceAleatorio];
    cuponActualTexto = fraseGanadora;
    disponibles.splice(indiceAleatorio, 1);

    // Mostrar
    document.getElementById('texto-cupon').innerText = fraseGanadora;
    document.getElementById('galletas-flex').classList.add('hidden');
    document.getElementById('cupon-resultado').classList.remove('hidden');
    
    // Resetear botón guardar
    const btnGuardar = document.getElementById('btn-guardar');
    btnGuardar.innerText = "📥 Guardar en mi Billetera";
    btnGuardar.disabled = false;
    btnGuardar.style.background = "#ff8fa3";

    lanzarConfeti();
}

function resetGalletas() {
    document.getElementById('galletas-flex').classList.remove('hidden');
    document.getElementById('cupon-resultado').classList.add('hidden');
}

// --- BILLETERA (LOCALSTORAGE) ---
function guardarCupon() {
    let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
    
    if (!guardados.includes(cuponActualTexto)) {
        guardados.push(cuponActualTexto);
        localStorage.setItem('misCuponesSofi', JSON.stringify(guardados));
        
        cargarCuponesGuardados();
        
        // Feedback visual
        const btnGuardar = document.getElementById('btn-guardar');
        btnGuardar.innerText = "¡Guardado! ✅";
        btnGuardar.disabled = true;
        btnGuardar.style.background = "#4ecdc4";
    } else {
        // Pequeña alerta nativa solo para avisar duplicado
        alert("¡Ya tienes este cupón guardado! 😉");
    }
}

function cargarCuponesGuardados() {
    let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
    const contenedor = document.getElementById('lista-cupones');
    
    if (guardados.length === 0) {
        contenedor.innerHTML = '<p style="color:#999; font-style:italic;">Aún no has guardado cupones...</p>';
        return;
    }

    let html = '';
    guardados.forEach((cupon, index) => {
        html += `
            <div class="mini-ticket">
                <span>${cupon}</span>
                <button class="btn-usar" onclick="abrirModal(${index})">Usar</button>
            </div>
        `;
    });
    contenedor.innerHTML = html;
}

// --- LÓGICA DEL MODAL (VENTANA MÁGICA) ---
function abrirModal(index) {
    indiceParaBorrar = index;
    document.getElementById('modal-confirmacion').classList.remove('hidden');
}

function cerrarModal() {
    document.getElementById('modal-confirmacion').classList.add('hidden');
    indiceParaBorrar = null;
}

function confirmarCanje() {
    if (indiceParaBorrar !== null) {
        let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
        
        // Borrar el cupón
        guardados.splice(indiceParaBorrar, 1);
        localStorage.setItem('misCuponesSofi', JSON.stringify(guardados));
        
        cargarCuponesGuardados();
        cerrarModal();
        
        // Opcional: Lanza un poquito de confeti al confirmar
        lanzarConfeti();
    }
}

function borrarTodo() {
    if(confirm("¿Segura que quieres borrar todo el historial?")) {
        localStorage.removeItem('misCuponesSofi');
        cargarCuponesGuardados();
    }
}

// --- EFECTOS VISUALES ---
function lanzarConfeti() {
    var count = 200;
    var defaults = { origin: { y: 0.7 }, zIndex: 12000 }; // Z-index alto para verse sobre todo

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}
