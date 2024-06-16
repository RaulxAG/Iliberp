
let nombreUsuario = document.querySelector("#nombreUsuario")
let usuarioLogueado = 4
let containerCreateMensaje = document.querySelector('.containerCreateMensaje')
let pagActual = 1
let ultPag
let chatId 
let containerMensajes = document.getElementById("containerMensajes");
let scrollMensajes = document.querySelector('.containerMensajes');
let leerMas = false; //Para evitar que cuando se hace solo click, se incremente la pág
let emisor =document.querySelector('#idUserLog').value;
let selectTipoPersona = document.querySelector("#tipoPersona")
let labelPersona  = document.querySelector("#labelPersona")
let selectPersona  = document.querySelector("#selectPersona")
let btnCrearChat = document.querySelector('#btnCrearChat')

function cargarMensajes(chatId,page, habilitarLeerMas = false) {
    fetch(`/empleados/getMessagesJSON/${chatId}?page=${page}`)
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

            emisor=data.participants[0].id
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

function createNewMessage(userId, chatId, texto) {
    fetch('/empleados/setMessageJSON/', {
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

function getChats() {
    fetch(`/empleados/getChats/${emisor}`) 
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // Actualizar la lista de chats 
        const chatsContainer = document.querySelector('.chats');
        chatsContainer.innerHTML = ''; // Limpiar el contenedor de chats

        // Imprimir los chats en la interfaz
        data.chats.forEach(chat => {
            chatsContainer.innerHTML +=
            `
                <div class="containerPersona d-flex row overflow-hidden align-items-end bg-dark p-1">
                    <figure class="col-3">
                        <img src="${chat.static_url}" alt="" class="rounded-circle bg-dark "/>
                    </figure>
                    <p class="col-9 ultMensaje">${chat.remitente} : ${chat.texto}</p>
                    <p class="col-12 text-end small">${chat.fecha_hora}</p>
                    <input type="hidden" name="idChat" value="${chat.chat_id}" id="idChat">
                </div>
            `
        });
        onclickContainer()
    })
    .catch(error => console.error('Error fetching chats:', error));
}

//Sacarlo en una funcion para leugo asignarlo cuando lo imprimamso de nuevo cuando se envia un mensaje
function onclickContainer() {
    let containers = document.querySelectorAll(".containerPersona")
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
                let messageText = inputNewMesagge.value;
                if (messageText) {
                    // Crear un nuevo mensaje en el servidor
                    createNewMessage(emisor, chatId, messageText);
    
                    //Volvemos a cargar los chats para q se vea el mensaje que acabamos de mandar
                    getChats()
    
                    // Limpiar el campo de entrada
                    inputNewMesagge.value = '';
                }
            });
        });
        
    });
}

onclickContainer()

// Función para cargar más mensajes al llegar al inicio del contenedor
scrollMensajes.addEventListener('scroll', function() {
    if (leerMas && scrollMensajes.scrollTop <= 10 && pagActual!=ultPag) {
        pagActual++; // Incrementar la página actual
        cargarMensajes(chatId, pagActual); //Si solo es scroll, habilitar leer mas es false
        console.log("hi")
    }
});





selectTipoPersona.addEventListener('change', function() {
    let url = this.value === 'empleado' ? '/empleados/allEmployees/' : '/empleados/allClients/';

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
    let user2 = selectPersona.value; // ID del otro usuario seleccionado
    containerMensajes.innerHTML = ''; //Limpiar el contenedor de mensajes si es un nuevo chat
    containerCreateMensaje.classList.remove("d-none");
    containerCreateMensaje.classList.add("d-flex");
    scrollMensajes.scrollTop = scrollMensajes.scrollHeight;

    // Enviar nuevo mensaje
    let btnEnviar = document.querySelector('#btnEnviar');
    let inputNewMesagge = document.querySelector('#inputNewMesagge');
    btnEnviar.addEventListener('click', function() {
        let messageText = inputNewMesagge.value;
        if (messageText) {
            // Crear un nuevo mensaje en el servidor
            createNewMessage(emisor, chatId, messageText);
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
            user1: emisor,
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
            emisor=data.participants[0].id
            chatId = data.chat_id
            cargarMensajes(chatId, 1);
        }
    })
    .catch(error => console.error('Error:', error));
});