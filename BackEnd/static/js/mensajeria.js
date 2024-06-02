let containers = document.querySelectorAll(".containerPersona")
let nombreUsuario = document.querySelector("#nombreUsuario")
let usuarioLogueado = 4
let containerCreateMensaje = document.querySelector('.containerCreateMensaje')
let pagActual = 1
let ultPag
let chatId 
let containerMensajes = document.getElementById("containerMensajes");
let scrollMensajes = document.querySelector('.containerMensajes');
let leerMas = false; //Para evitar que cuando se hace solo click, se incremente la pág

containers.forEach(container => {
    // Agregar un evento de clic a cada elemento
    container.addEventListener("click", function() {
        containerCreateMensaje.classList.remove("d-none");
        containerCreateMensaje.classList.add("d-flex");
        // Limpiar el contenedor de mensajes
        containerMensajes.innerHTML = '';

        // Obtener el chat_id del elemento actual
        chatId = this.querySelector("#idChat").value;

        //Resetear la página 
        pagActual = 1

        //Reiniciar a false cada vez que se hace click
        leerMas = false;

        cargarMensajes(chatId,pagActual,true)
    });
});

function cargarMensajes(chatId,page, habilitarLeerMas = false) {
    fetch(`/getMessagesJSON/${chatId}?page=${page}`)
    .then(response => response.json())
    .then(data => {
        if (page === 1) {
            containerMensajes.innerHTML = ''; // Limpiar el contenedor solo si es la primera página
        }

        nombreUsuario.innerHTML = data.participants[0].nombre
        ultPag = data.pages.total_pages
        
        // Iterar sobre los mensajes y agregarlos al contenedor
        data.messages.forEach(message => {
            let pMensaje = document.createElement('p');
            let pHora = document.createElement('p');
            let divMensaje = document.createElement('div')
            data.participants[0].id == message.usuario ? divMensaje.classList.add("mensajeRecibido") : divMensaje.classList.add("mensajeEnviado") 
            pMensaje.textContent = message.texto;
            pHora.textContent=message.hora;
            pHora.classList.add("text-end")
            pHora.classList.add("pt-1")
            divMensaje.appendChild(pMensaje)
            divMensaje.appendChild(pHora)

            //Añdirlos al principio
            containerMensajes.prepend(divMensaje);
        });

        // Mantener el scroll abajo solo si es la primera página
        if (page === 1) {
            scrollMensajes.scrollTop = scrollMensajes.scrollHeight;
            console.log(scrollMensajes.scrollTop);
        }

        // Habilitar la carga de más mensajes después de la primera carga
        if (habilitarLeerMas) {
            leerMas = true;
        }

    })
    .catch(error => console.error('Error fetching messages:', error));
}


// Función para cargar más mensajes al llegar al inicio del contenedor
scrollMensajes.addEventListener('scroll', function() {
    if (leerMas && scrollMensajes.scrollTop <= 10 && pagActual!=ultPag) {
        pagActual++; // Incrementar la página actual
        cargarMensajes(chatId, pagActual); //Si solo es scroll, habilitar leer mas es false
        console.log("hi")
    }
});