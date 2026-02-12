// --- 1. TU LISTA PERSONALIZADA ---
const listaOriginal = [
    "Una cita en el cine 🎬",
    "Dejarte ganar en lo que sea (nee mi equipo) 🎮",
    "Unos besitos 💋",
    "Unos besotes 😘",
    "Un abachito💞",
    "Cita en cafetería ☕",
    "Cita en el acuario 🐧",
    "Un muamuamuamua 👄",
    "Una cita a donde queya ✨",
    "Eliminar al gallo de pelea 🐓🚫",
    "Un ah ah ah ah 🔥",
    "Tu y yo toda la eternidad ♾️",
    "Evasión de pelea: repele la pelea y debemos amarnos mucho sisisis 🛡️💖",
    "Vale por abachote 🫂",
    "Comida favorita 🍔",
    "Romper distancia entre nosotras yadiosmio testaño ✈️❤️",
    "Ver una peli juntitas💖",
    "Un masajito 💆",
    "Una tarde juntitas 🌇"
];

// Variables de control
let disponibles = [];
let cuponActualTexto = "";

// Al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Inicializamos la billetera visualmente
    cargarCuponesGuardados();
    
    // Llenamos la baraja de cartas (copiamos la lista original)
    disponibles = [...listaOriginal];
});

// --- FUNCIÓN PRINCIPAL: SACAR CUPÓN ---
function revelarCupon() {
    // 1. Si ya salieron todos, volvemos a llenar la baraja
    if (disponibles.length === 0) {
        disponibles = [...listaOriginal];
        // Opcional: Avisar que se reinició
        // alert("¡Se acabaron los cupones! Barajando de nuevo... 🔀");
    }

    // 2. Elegir uno al azar de los DISPONIBLES
    const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
    const fraseGanadora = disponibles[indiceAleatorio];
    
    // Guardamos el texto actual para poder guardarlo en la billetera luego
    cuponActualTexto = fraseGanadora;

    // 3. ¡IMPORTANTE! Lo sacamos de la lista para que no se repita seguido
    disponibles.splice(indiceAleatorio, 1);

    // 4. Mostrar en pantalla
    document.getElementById('texto-cupon').innerText = fraseGanadora;
    document.getElementById('galletas-flex').classList.add('hidden');
    document.getElementById('cupon-resultado').classList.remove('hidden');
    
    // Reactivar botón de guardar
    const btnGuardar = document.getElementById('btn-guardar');
    btnGuardar.innerText = "📥 Guardar en mi Billetera";
    btnGuardar.disabled = false;
    btnGuardar.style.background = "#ff8fa3";

    // 5. ¡CONFETI!
    lanzarConfeti();
}

// --- VOLVER A LAS GALLETAS ---
function resetGalletas() {
    document.getElementById('galletas-flex').classList.remove('hidden');
    document.getElementById('cupon-resultado').classList.add('hidden');
}

// --- GUARDAR EN BILLETERA (LOCALSTORAGE) ---
function guardarCupon() {
    // Leemos lo que ya hay guardado en el navegador
    let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
    
    // Verificamos si ya lo tiene guardado (para no tener duplicados en la billetera)
    if (!guardados.includes(cuponActualTexto)) {
        guardados.push(cuponActualTexto);
        localStorage.setItem('misCuponesSofi', JSON.stringify(guardados));
        
        // Actualizamos la lista visual
        cargarCuponesGuardados();
        
        // Cambiar botón a verde
        const btnGuardar = document.getElementById('btn-guardar');
        btnGuardar.innerText = "¡Guardado! ✅";
        btnGuardar.disabled = true;
        btnGuardar.style.background = "#4ecdc4";
    } else {
        alert("¡Ya guardaste este cupón antes! 😉");
    }
}

// --- MOSTRAR LA BILLETERA ---
function cargarCuponesGuardados() {
    let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
    const contenedor = document.getElementById('lista-cupones');
    
    if (guardados.length === 0) {
        contenedor.innerHTML = '<p id="mensaje-vacio">Aún no has guardado cupones... ¡Abre una galleta!</p>';
        return;
    }

    let html = '';
    // Recorremos cada cupón guardado para crear su ticket
    guardados.forEach((cupon, index) => {
        html += `
            <div class="mini-ticket">
                <span>${cupon}</span>
                <button class="btn-usar" onclick="usarCupon(${index})">Usar</button>
            </div>
        `;
    });
    contenedor.innerHTML = html;
}

// --- USAR (BORRAR) UN CUPÓN ---
function usarCupon(index) {
    if(!confirm("¿Segura que quieres canjear este cupón? Se borrará de la lista.")) return;

    let guardados = JSON.parse(localStorage.getItem('misCuponesSofi')) || [];
    guardados.splice(index, 1); // Elimina 1 elemento en la posición index
    localStorage.setItem('misCuponesSofi', JSON.stringify(guardados));
    
    cargarCuponesGuardados();
}

// --- BORRAR TODO ---
function borrarTodo() {
    if(confirm("¿Segura que quieres borrar todos tus cupones guardados?")) {
        localStorage.removeItem('misCuponesSofi');
        cargarCuponesGuardados();
    }
}

// --- EFECTO DE CONFETI ---
function lanzarConfeti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 },
        zIndex: 9999
    };

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
