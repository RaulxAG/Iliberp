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
    // Redirigir a la vista plannerView/ sin filtros aplicados
    window.location.href = "/plannerView/";
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
let filtroHeadquarter="";
let filtroSearch="";
urlActual=""

document.getElementById("employee_asigned").addEventListener('change',function (e) {
    filtroEmpleado = this.value;
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?headquarter=${filtroHeadquarter}&?search=${filtroSearch}`);
})

document.getElementById("date").addEventListener('change',function () {
    filtroFecha = this.value;
    console.log("Fecha seleccionado:", filtroFecha);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?headquarter=${filtroHeadquarter}&?search=${filtroSearch}`);
})

document.getElementById("priority").addEventListener('change',function () {
    filtroPrioridad = this.value;
    console.log("Filtro seleccionado:", filtroPrioridad);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?headquarter=${filtroHeadquarter}&?search=${filtroSearch}`);
})

document.getElementById("enterprise").addEventListener('change',function () {
    filtroEmpresa = this.value;
    console.log("Filtro seleccionado:", filtroEmpresa);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?headquarter=${filtroHeadquarter}&?search=${filtroSearch}`);
})

document.getElementById("client").addEventListener('change',function () {
    filtroCliente = this.value;
    console.log("Filtro seleccionado:", filtroCliente);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?headquarter=${filtroHeadquarter}&?search=${filtroSearch}`);
})

document.getElementById("headquarter").addEventListener('change',function () {
    filtroHeadquarter = this.value;
    console.log("Filtro seleccionado:", filtroHeadquarter);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?headquarter=${filtroHeadquarter}&?search=${filtroSearch}`);
})

document.getElementById("searchInput").addEventListener('keyup',function () {
    filtroSearch = this.value;
    console.log("Filtro seleccionado:", filtroSearch);
    history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?headquarter=${filtroHeadquarter}&?search=${filtroSearch}`);
})

//CODIGO PARA CUANDO SE CAMBIA LA URL, HAGA UNA PETICION AYAX CON LOS LOS FILTROS
//fUNCION 
// Obtener todos los elementos select por su ID 
let selects = document.querySelectorAll('#employee_asigned, #date, #priority, #enterprise ,#headquarter,#client,#optionCategory_plannerView-Administracion,#optionCategory_plannerView-Ciberseguridad,#optionCategory_plannerView-Programacion,#optionCategory_plannerView-Telefonia,#optionCategory_plannerView-Sistemas,#optionCategory_plannerView-Taller,#optionCategory_plannerView-Web,#searchInput');

//Obtener los select de empresa y cliente para cambiar los desplegables (si eliges un cliente, que salga a la empresa a la que pertenece y viceversa)
let selectEnterp = document.querySelectorAll('#enterprise, #client, #headquarter');


//Si cambia el filtro de la empresa y hay un filtro cliente, borramos el filtro del cliente, IGUAL CON SEDE";
document.getElementById("enterprise").addEventListener("change",function () {
    if (filtroCliente != "" || filtroHeadquarter != "" ){
        filtroCliente = ""
        filtroHeadquarter = ""
        history.pushState(null, null, urlActual+`?fecha=${filtroFecha}&?empleado=${filtroEmpleado}&?prioridad=${filtroPrioridad}&?enterprise=${filtroEmpresa}&?client=${filtroCliente}&?headquarter=${filtroHeadquarter}`);
    }
})

// Evento a cada elemento select
selects.forEach(function(select) {
    select.addEventListener('change', function() {
        let url= window.location.href
        console.log(url)
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
                headquarter: filtroHeadquarter,
                client: filtroCliente,
                enterprise: filtroEmpresa,
                search: filtroSearch,
                urlActual:url
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log("Tareas" + "-" +filtroCliente+ " - " + filtroEmpresa)
            console.log(data.urlActual)
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
                detalles.innerHTML = `${task.id.includes("inc") ? "(INC)" : "(SOL)"} ${task.client.headquarter.enterprise} ${task.client.headquarter.locality} | <span>(${task.client.full_name})</span> | ${task.client.phone}`;
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
                modalBoton.setAttribute('data-bs-target', `#detailINC-${task.id}`);
                modalBoton.innerHTML = '<i class="fa-solid fa-eye"></i>';

                fechaDiv.appendChild(modalBoton);
                nuevaIncidencia.appendChild(fechaDiv);

                // Crea el contenido del modal
                const modalContent = `
                    <div class="modal fade bg-transparent" id="detailINC-${task.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header ${task.priority} fw-bold ${(task.priority == "Urgente" || task.priority == "Importante") ? 'text-light' : ''}">
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
                    case "Pendiente":
                        tareasPendientes.appendChild(nuevaIncidencia);
                        break;
                    case "Proceso":
                        tareasProceso.appendChild(nuevaIncidencia);
                        break;
                    case "Pausa":
                        tareasPausadas.appendChild(nuevaIncidencia);
                        break;
                    case "Terminada":
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
                headquarter: filtroHeadquarter
            })
        })
        .then(response => response.json())
        .then(data => {
            // console.log("clientes")
            // console.log(data)

            let selectClient = document.getElementById('client');
            let selectHeadquarter = document.getElementById('headquarter');
            let defaultOptionClient = document.createElement("option");
            let defaultOptionHeadquarter = document.createElement("option");

            //Cambiar opacidad al select cliente y sede
            selectClient.style.opacity="1"
            selectClient.removeAttribute("disabled")

            selectHeadquarter.style.opacity="1"
            selectHeadquarter.removeAttribute("disabled")


            let selectedClient = selectClient.value;
            let selectedHeadquarter = selectHeadquarter.value;

            //Limpiar el select de clientes y sedes
            selectClient.innerHTML = '';
            selectHeadquarter.innerHTML = '';

            //Añadir atributos al select por defecto
            defaultOptionClient.text="Cliente"
            defaultOptionClient.disabled= true;
            defaultOptionClient.selected= true;
            defaultOptionClient.style.display="none"
            selectClient.appendChild(defaultOptionClient)

            defaultOptionHeadquarter.text="Sede"
            defaultOptionHeadquarter.disabled= true;
            defaultOptionHeadquarter.selected= true;
            defaultOptionHeadquarter.style.display="none"
            selectHeadquarter.appendChild(defaultOptionHeadquarter)

            console.log("sede seleccionada")
            // Iterar sobre el primer array de clientes
            data[0].forEach(cliente => {
                let optionClient = document.createElement("option");
                optionClient.value = cliente.client.id;
                optionClient.text = cliente.client.full_name;
                selectClient.appendChild(optionClient);
            });

            // Iterar sobre el segundo array de sedes
            data[1].forEach(sede => {
                let optionHeadquarter = document.createElement("option");
                optionHeadquarter.value = sede.headquarter.id;
                optionHeadquarter.text = sede.headquarter.locality;
                selectHeadquarter.appendChild(optionHeadquarter);
            });

            selectedClient ? selectClient.value = selectedClient : '';

            selectedHeadquarter ? selectHeadquarter.value = selectedHeadquarter : '';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

//Si cambia el filtro de la empresa y hay un ciltro cliente: let filtroCliente="";