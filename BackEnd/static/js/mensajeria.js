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
let receptor
let selectTipoPersona = document.querySelector("#tipoPersona")
let labelPersona  = document.querySelector("#labelPersona")
let selectPersona  = document.querySelector("#selectPersona")
let btnCrearChat = document.querySelector('#btnCrearChat')

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

        // Enviar nuevo mensaje
        let btnEnviar = document.querySelector('#btnEnviar');
        let inputNewMesagge = document.querySelector('#inputNewMesagge');
        btnEnviar.addEventListener('click', function() {
            console.log("hi")
            let messageText = inputNewMesagge.value;
            if (messageText) {
                
                // Crear un nuevo mensaje en el servidor
                createNewMessage( receptor, chatId, messageText);
                // Limpiar el campo de entrada
                inputNewMesagge.value = '';
            }
        });
    });
    
});

function cargarMensajes(chatId,page, habilitarLeerMas = false) {
    fetch(`/getMessagesJSON/${chatId}?page=${page}`)
    .then(response => response.json())
    .then(data => {
        if (page === 1) {
            containerMensajes.innerHTML = ''; // Limpiar el contenedor solo si es la primera página
        }
        console.log(data)
        nombreUsuario.innerHTML = data.participants[0].nombre
        ultPag = data.pages.total_pages
        
        // Iterar sobre los mensajes y agregarlos al contenedor
        data.messages.forEach(message => {
            let pMensaje = document.createElement('p');
            let pHora = document.createElement('p');
            let divMensaje = document.createElement('div')

            
            if (message.usuario === usuarioLogueado) {
                divMensaje.classList.add("mensajeEnviado");
            } else {
                divMensaje.classList.add("mensajeRecibido");
            }

            pMensaje.textContent = message.texto;
            pHora.textContent=message.hora;
            pHora.classList.add("text-end")
            pHora.classList.add("pt-1")
            divMensaje.appendChild(pMensaje)
            divMensaje.appendChild(pHora)

            receptor=data.participants[0].id
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


function createNewMessage(userId, chatId, texto) {
    console.log("userId:", userId);  // Verifica el valor de userId
    fetch('/setMessageJSON/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            chat_id: chatId,
            texto: texto
        })
    })
    .then(response => response.json())
    .then(data => {
        // Recargar mensajes con la primera página
        cargarMensajes(chatId, 1);
    })
    .catch(error => console.error('Error creating message:', error));
}


selectTipoPersona.addEventListener('change', function() {
    let url = this.value === 'empleado' ? '/allEmployees/' : '/allClients/';

    this.value=="cliente" ? labelPersona.textContent ="Cliente" : labelPersona.textContent ="Empleado"
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            selectPersona.innerHTML = '';

            data.forEach(persona => {
                let option = document.createElement('option');
                option.value = persona.id;
                option.textContent = persona.nombre;
                selectPersona.appendChild(option);
            });
        });
})

btnCrearChat.addEventListener('click', function () {
    let user1 = 4; // ID del usuario logueado
    let user2 = selectPersona.value; // ID del otro usuario seleccionado

    containerMensajes.innerHTML = ''; //Limpiar el contenedor de mensajes si es un nuevo chat
    containerCreateMensaje.classList.remove("d-none");
    containerCreateMensaje.classList.add("d-flex");
    scrollMensajes.scrollTop = scrollMensajes.scrollHeight;

    // Enviar nuevo mensaje
    let btnEnviar = document.querySelector('#btnEnviar');
    let inputNewMesagge = document.querySelector('#inputNewMesagge');
    btnEnviar.addEventListener('click', function() {
        console.log("hi")
        let messageText = inputNewMesagge.value;
        if (messageText) {
            // Crear un nuevo mensaje en el servidor
            createNewMessage(receptor, chatId, messageText);
            // Limpiar el campo de entrada
            inputNewMesagge.value = '';
        }
    });

    console.log(selectPersona.value);
    
    fetch('/setChatJSON/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user1: user1,
            user2: user2
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.chat_id) {
            chatId = data.chat_id; // Guardar el ID del chat
            cargarMensajes(chatId, 1); // Cargar mensajes del chat
        } else {
            receptor=data.participants[0].id
            chatId = data.chat_id
            cargarMensajes(chatId, 1);
        }
    })
    .catch(error => console.error('Error:', error));
});