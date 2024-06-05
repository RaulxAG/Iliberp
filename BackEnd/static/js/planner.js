const tareasPendientes = document.getElementById("Pendiente");
const tareasProceso = document.getElementById("Proceso");
const tareasPausadas = document.getElementById("Pausa");
const tareasTerminadas = document.getElementById("Terminada");
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

// Función para manejar el evento onAdd
function handleOnAdd(evt) {
    // Obtener el elemento div donde se soltó el elemento arrastrable
    const listaReceptora = evt.to;
    const categoriaListaReceptora = listaReceptora.getAttribute('id');

    // Obtener información sobre el elemento soltado
    const elementoSoltado = evt.item;
    const elementoId = elementoSoltado.getAttribute('id');

    // Hacer una solicitud AJAX a la vista de Django
    fetch('/updateState/', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken // Agrega el token CSRF a los encabezados de la solicitud
        },
        body: JSON.stringify({
            element_id: elementoId,
            category_list: categoriaListaReceptora,
        })
    })
    // .then(response => response.json())
    // .then(data => {
    //     console.log(data); // Muestra la respuesta del servidor Django
    // })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Crear un objeto de opciones comunes para todas las listas
const opcionesLista = {
    group: {
        name: "lista-tareas"
    },
    animation: 150,
    onAdd: handleOnAdd
};

// Función para borrar filtros
function clearFilters() {
    // Redirigir a la vista trello/ sin filtros aplicados
    window.location.href = "/trello/";
}

// Inicializar la lista Sortable para cada contenedor
Sortable.create(tareasPendientes, opcionesLista);
Sortable.create(tareasProceso, opcionesLista);
Sortable.create(tareasPausadas, opcionesLista);
Sortable.create(tareasTerminadas, opcionesLista);

//Funcion para cambiar la url, segun el filtro de los select
let filtroEmpleado="";
let filtroFecha="";
let filtroPrioridad="";
let filtroEmpresa="";
let filtroCliente="";
let filtroSearch="";
urlActual=""

document.getElementById("employee_asigned_filter").addEventListener('change',function (e) {
    filtroEmpleado = this.value;
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?search=${filtroSearch}`);
})

document.getElementById("date_filter").addEventListener('change',function () {
    filtroFecha = this.value;
    console.log("Fecha seleccionado:", filtroFecha);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?search=${filtroSearch}`);
})

document.getElementById("priority_filter").addEventListener('change',function () {
    filtroPrioridad = this.value;
    console.log("Filtro seleccionado:", filtroPrioridad);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?search=${filtroSearch}`);
})

document.getElementById("enterprise_filter").addEventListener('change',function () {
    filtroEmpresa = this.value;
    console.log("Filtro seleccionado:", filtroEmpresa);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?search=${filtroSearch}`);
})

document.getElementById("client_filter").addEventListener('change',function () {
    filtroCliente = this.value;
    console.log("Filtro seleccionado:", filtroCliente);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?search=${filtroSearch}`);
})

document.getElementById("searchInput").addEventListener('keyup',function () {
    filtroSearch = this.value;
    console.log("Filtro seleccionado:", filtroSearch);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?search=${filtroSearch}`);
})

//CODIGO PARA CUANDO SE CAMBIA LA URL, HAGA UNA PETICION AYAX CON LOS LOS FILTROS
//fUNCION 
// Obtener todos los elementos select por su ID 
let selects = document.querySelectorAll('#employee_asigned_filter, #date_filter, #priority_filter, #enterprise_filter, #client_filter, #optionCategory_trello-Administración, #optionCategory_trello-Ciberseguridad, #optionCategory_trello-Programación, #optionCategory_trello-Telefonía, #optionCategory_trello-Sistemas, #optionCategory_trello-Taller, #optionCategory_trello-Web, #searchInput');

//Obtener los select de empresa y cliente para cambiar los desplegables (si eliges un cliente, que salga a la empresa a la que pertenece y viceversa)
let selectEnterp = document.querySelectorAll('#enterprise_filter, #client_filter');


//Si cambia el filtro de la empresa y hay un filtro cliente, borramos el filtro del cliente, IGUAL CON SEDE";
document.getElementById("enterprise_filter").addEventListener("change",function () {
    if (filtroCliente != ""){
        filtroCliente = ""
        filtroHeadquarter = ""
        history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}`);
    }
})

// Evento a cada elemento select
selects.forEach(function(select) {
    select.addEventListener('change', function() {
        let url= window.location.href

        // Hacer una solicitud AJAX a la vista de Django
        fetch('/updateFilter/', {
           method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                date: filtroFecha,
                employee: filtroEmpleado,
                priority: filtroPrioridad,
                client: filtroCliente,
                enterprise: filtroEmpresa,
                search: filtroSearch,
                urlActual:url
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Manejar los datos recibidos y actualizar la lista de incidencias en la página
            const listaTareas = document.getElementById('listaTareas');
            const tareasPendientes = document.getElementById('Pendiente');
            const tareasProceso = document.getElementById('Proceso');
            const tareasPausadas = document.getElementById('Pausa');
            const tareasTerminadas = document.getElementById('Terminada');

            // Limpiar la lista de incidencias
            tareasPendientes.innerHTML = '';
            tareasProceso.innerHTML = '';
            tareasPausadas.innerHTML = '';
            tareasTerminadas.innerHTML = '';

            data.forEach(task => {

                console.log(task)

                // Crea un nuevo elemento div para la incidencia
                const nuevaIncidencia = document.createElement('div');
                nuevaIncidencia.setAttribute('id', task.id);
                nuevaIncidencia.classList.add('incidentCard', task.priority, 'cardTarea', 'bg-primary', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-between', 'py-3', 'w-100', 'h-25', 'bg-transparent', 'mb-3', 'rounded');

                // Crea un párrafo para los detalles de la incidencia
                const detalles = document.createElement('p');
                detalles.classList.add('px-3', 'text-start');
                detalles.innerHTML = `(INC-${task.id}) ${task.client.headquarter.enterprise} | <span>(${task.client.full_name})</span> | ${task.client.phone}`;
                nuevaIncidencia.appendChild(detalles);

                // Crea un div para la fecha de la incidencia
                const fechaDiv = document.createElement('div');
                fechaDiv.classList.add('px-3', 'd-flex', 'align-items-center', 'justify-content-between', 'w-100', 'bg-transparent');

                // Crea un párrafo para la fecha
                const fechaParrafo = document.createElement('p');
                fechaParrafo.classList.add('m-0');
                fechaParrafo.innerHTML = task.date;
                fechaDiv.appendChild(fechaParrafo);

                // Crea un botón para abrir el modal
                const modalBoton = document.createElement('button');
                modalBoton.setAttribute('type', 'button');
                modalBoton.classList.add('btn', 'btnModal');
                modalBoton.setAttribute('data-bs-toggle', 'modal');
                modalBoton.setAttribute('data-bs-target', `#detail-${task.id}`);
                modalBoton.innerHTML = '<i class="fa-solid fa-eye"></i>';

                fechaDiv.appendChild(modalBoton);
                nuevaIncidencia.appendChild(fechaDiv);

                // Crea el contenido del modal
                const modalContent = `
                    <div class="modal fade bg-transparent" id="detail-${task.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header ${task.priority} fw-bold">
                                    <div>
                                        <h1 class="modal-title fs-5 text-start" id="exampleModalLabel">${task.client.headquarter.enterprise} | <span>(${task.client.full_name})</span> | ${task.client.phone}</h1>
                                        <h2 class="modal-title fs-5 text-start" >(${task.state})</h2 >
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body text-start">
                                    <div>
                                        <h5 class="fw-bold fs-5 mb-0">Descripcion:</h5>
                                        <p class="bg-light p-3 rounded">${task.description}</p>
                                    </div>
                                    ${task.comments ? `
                                        <div>
                                            <h5 class="fw-bold fs-5 mb-0">Observaciones:</h5>
                                            <p class="bg-light p-3 rounded">${task.comments}</p>
                                        </div>
                                    ` : ''}
                                    <div class="row">
                                        <p class="col-6 d-flex flex-column"><span class="fw-bold">Origen: </span>${task.origin}</p>
                                        <p class="col-6 d-flex flex-column"><span class="fw-bold">Empleado asignado: </span>${task.employee_asigned}</p>
                                        <p class="col-6 d-flex flex-column"><span class="fw-bold">Facturable: </span>${task.billable ? 'Si' : 'No'}</p>
                                        <p class="col-6 d-flex flex-column"><span class="fw-bold">Categoría: </span>${task.category}</p>
                                        <p class="col-6 d-flex flex-column"><span class="fw-bold">Fecha límite: </span>${task.time_limit}</p>
                                        <p class="col-6 d-flex flex-column"><span class="fw-bold">Tiempo dedicado: </span>${task.total_time} horas</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Agrega el modal al contenido de la tarjeta de incidencia
                tareasPendientes.innerHTML += modalContent;

                // Determina en qué categoría debe ir la incidencia y agrega el elemento correspondiente
                switch (task.state) {
                    
                    case "pendiente":
                        tareasPendientes.appendChild(nuevaIncidencia);
                        break;
                    case "proceso":
                        tareasProceso.appendChild(nuevaIncidencia);
                        break;
                    case "pausa":
                        tareasPausadas.appendChild(nuevaIncidencia);
                        break;
                    case "terminada":
                        tareasTerminadas.appendChild(nuevaIncidencia);
                        break;
                    default:
                        console.error('Estado de incidencia no válido:', task.state);
                }
           });

       })
       .catch(error => {
           console.error('Error:', error);
       });
   });
});


// Evento para select cliente y empresa
selectEnterp.forEach(function(select) {
    select.addEventListener('change', function() {
        // Hacer una solicitud AJAX a la vista de Django
        fetch('/updateSelectEnt/', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                enterprise: filtroEmpresa,
                client: filtroCliente,
            })
        })
        .then(response => response.json())
        .then(data => {
            // console.log("clientes")
            // console.log(data)

            let selectClient = document.getElementById('client_filter');
            let defaultOptionClient = document.createElement("option");

            //Cambiar opacidad al select cliente
            selectClient.style.opacity="1"
            selectClient.removeAttribute("disabled")

            let selectedClient = selectClient.value;

            //Limpiar el select de clientes
            selectClient.innerHTML = '';

            //Añadir atributos al select por defecto
            defaultOptionClient.text="Cliente"
            defaultOptionClient.disabled= true;
            defaultOptionClient.selected= true;
            defaultOptionClient.style.display="none"
            selectClient.appendChild(defaultOptionClient)

            // Iterar sobre el primer array de clientes
            
            data.forEach(cliente => {
                let optionClient = document.createElement("option");
                optionClient.value = cliente.client.id;
                optionClient.text = cliente.client.full_name;
                optionClient.classList.add("bg-dark");
                selectClient.appendChild(optionClient);
            });

            selectedClient ? selectClient.value = selectedClient : '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

//Si cambia el filtro de la empresa y hay un ciltro cliente: let filtroCliente="";


// Funciones para editar y guardar cambios en las Tareas
function toggleEdit(taskId) {
    // Elementos a alternar
    const descripcionElem = document.getElementById(`descripcion-${taskId}`);
    const inputDescripcion = document.getElementById(`input-descripcion-${taskId}`);
    const observacionesElem = document.getElementById(`observaciones-${taskId}`);
    const inputObservaciones = document.getElementById(`input-observaciones-${taskId}`);
    const prioridadElem = document.getElementById(`prioridad-${taskId}`);
    const inputPrioridad = document.getElementById(`input-prioridad-${taskId}`);
    const empleadoElem = document.getElementById(`empleado-${taskId}`);
    const inputEmpleado = document.getElementById(`input-empleado-${taskId}`);
    const categoriaElem = document.getElementById(`categoria-${taskId}`);
    const inputCategoria = document.getElementById(`input-categoria-${taskId}`);
    const fechaFinElem = document.getElementById(`fecha_fin-${taskId}`);
    const inputFechaFin = document.getElementById(`input-fecha_fin-${taskId}`);
    const fechaInicioElem = document.getElementById(`fecha_inicio-${taskId}`);
    const inputFechaInicio = document.getElementById(`input-fecha_inicio-${taskId}`);
    const saveBtn = document.getElementById(`save-btn-${taskId}`);
    const editBtn = document.getElementById(`edit-btn-${taskId}`);

    // Alternar visibilidad
    descripcionElem.classList.toggle('d-none');
    inputDescripcion.classList.toggle('d-none');
    if (observacionesElem && inputObservaciones) {
        observacionesElem.classList.toggle('d-none');
        inputObservaciones.classList.toggle('d-none');
    }
    prioridadElem.classList.toggle('d-none');
    inputPrioridad.classList.toggle('d-none');
    empleadoElem.classList.toggle('d-none');
    inputEmpleado.classList.toggle('d-none');
    categoriaElem.classList.toggle('d-none');
    inputCategoria.classList.toggle('d-none');
    fechaFinElem.classList.toggle('d-none');
    inputFechaFin.classList.toggle('d-none');
    fechaInicioElem.classList.toggle('d-none');
    inputFechaInicio.classList.toggle('d-none');
    saveBtn.classList.toggle('d-none');
    editBtn.classList.toggle('d-none');
}

function saveChanges(taskId) {
    // Obtener valores de los inputs
    const descripcion = document.getElementById(`input-descripcion-${taskId}`).value;
    const observacionesElement = document.getElementById(`input-observaciones-${taskId}`);
    const observaciones = observacionesElement ? observacionesElement.value : null;
    const prioridad = document.getElementById(`input-prioridad-${taskId}`).value;
    const empleado = document.getElementById(`input-empleado-${taskId}`).value;
    const categoria = document.getElementById(`input-categoria-${taskId}`).value;
    const fechaFinElement = document.getElementById(`input-fecha_fin-${taskId}`);
    const fechaFin = fechaFinElement.value ? new Date(fechaFinElement.value).toISOString() : null;
    const fechaInicioElement = document.getElementById(`input-fecha_inicio-${taskId}`);
    const fechaInicio = fechaInicioElement.value ? new Date(fechaInicioElement.value).toISOString() : null;

    // Crear un objeto con los datos
    const data = {
        'descripcion': descripcion,
        'observaciones': observaciones,
        'prioridad': prioridad,
        'empleado': empleado,
        'categoria': categoria,
        'fecha_fin': fechaFin,
        'fecha_inicio': fechaInicio
    };

    // Enviar los datos a través de fetch API o XMLHttpRequest
    fetch(`/update_task/${taskId}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Manejar la respuesta del servidor
        if (result.success) {
            // Actualizar la interfaz de usuario
            document.getElementById(`descripcion-${taskId}`).innerText = descripcion;
            
            const observacionesElement = document.getElementById(`observaciones-${taskId}`);
            if (observacionesElement) {
                observacionesElement.innerText = observaciones !== null ? observaciones : '';
            }

            document.getElementById(`prioridad-${taskId}`).innerText = prioridad;
            document.getElementById(`empleado-${taskId}`).innerText = result.empleado_username;
            document.getElementById(`categoria-${taskId}`).innerText = categoria;
            document.getElementById(`fecha_fin-${taskId}`).innerText = fechaFin !== null ? fechaFin : '';
            document.getElementById(`fecha_inicio-${taskId}`).innerText = fechaInicio !== null ? fechaInicio : '';

            // Alternar visibilidad
            toggleEdit(taskId);

            setTimeout(function() {
                location.reload();
            }, 500);
        } else {
            // Mostrar error
            alert('Error al guardar los cambios');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al guardar los cambios');
    });
}