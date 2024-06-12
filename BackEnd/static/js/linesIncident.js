// Obtener todos los elementos con la clase circleEmpleado
let circleEmpleados = document.querySelectorAll('.circleEmpleado');
let addLine = document.getElementById('addLine')

if (addLine) {
    let verDetallesBtns = document.querySelectorAll('.verDetallesBtn');
    let editarBtns = document.querySelectorAll('.editarBtn');
    let idIncident=document.querySelector('#idIncident').value
    
    verDetallesBtns.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            let lineId = btn.parentElement.querySelector('.idLine').value;
            cargarObservacion(lineId,'details', idIncident);
        });
    });

    editarBtns.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            let lineId = btn.parentElement.querySelector('.idLine').value;
            cargarObservacion(lineId,'edit',idIncident );
        });
    });
    
    // Añadir event listener al botón de agregar
    addLine.addEventListener('click', function() {
        // Limpiar campos del formulario
        document.getElementById('commentsLine').value = '';
        document.getElementById('start').value = '';
        document.getElementById('end').value = '';
        document.getElementById('dateLine').value = '';
        document.getElementById('timeLine').value = '';
        document.getElementById('addTime').checked = false;
        document.getElementById('idLine').value = '-';
    
    });
}

// Definir la función cargarObservacion
function cargarObservacion(idLine,action,idIncident) {
    //Cambiar el btn editar a 'ver incidencia
    let buttonEdit = document.querySelector("#buttonEdit");
    buttonEdit.innerHTML = 'Ver incidencia';

    // Verificar si el botón de aceptar existe en el documento
    if (document.querySelector("#btnAceptar")) {
        // Obtener referencia al botón de aceptar
        let btnAceptar = document.querySelector("#btnAceptar");
        const inputs = document.querySelector('.formularioCrud').querySelectorAll('input');
        const textareas = document.querySelector('.formularioCrud').querySelectorAll('textarea');
        const selects = document.querySelector('.formularioCrud').querySelectorAll('select');
        // Ocultar el botón de aceptar
        btnAceptar.classList.remove("d-block"); // Quitamos la clase d-block
        btnAceptar.classList.add("d-none");    // Añadimos la clase d-none
        
        // Deshabilitar los campos nuevamente
        inputs.forEach(input => {
            input.disabled = true;
        });
        textareas.forEach(textarea => {
            textarea.disabled = true;
        });
        selects.forEach(select => {
            select.disabled = true;
        });
    }

    fetch('/detailsLine/'+idLine)
        .then(response => response.json())
        .then(data => {
            console.log(action)
            if (action === "details") {
                const observacionField = document.getElementById('observaciones');
                observacionField.value = data.observacion; 
                
                const fechaInicioField = document.getElementById('fecha_inicio');
                fechaInicioField.value = data.fecha; 
                
                const tiempoEmpleadoField = document.getElementById('tiempo_empleado');
                timePattern=data.tiempo.split(":")
                tiempoEmpleadoField.value = timePattern[0]+"h "+timePattern[1]+"min"; 
                
                // Cambiar la URL para luego tenerla en cuenta cuando vayamos a editar
                history.pushState({}, '', `/detailsIncident-${idIncident}/detailsLine-${idLine}`);

            } else if (action === "edit") {
                    // Cargar datos en el modal
                    document.getElementById('commentsLine').value = data.observacion || '';
                    document.getElementById('start').value = data.comienzo || '';
                    document.getElementById('end').value = data.fin || '';
                    document.getElementById('dateLine').value = data.fecha || '';
                    document.getElementById('timeLine').value = data.tiempo || '';
                    document.getElementById('addTime').checked = data.addTime || false;
                    document.getElementById('idLine').value = data.id || false;
                   
                    // Habilitar el botón Guardar
                    document.getElementById('saveLine').disabled = false;

                    // Mostrar el modal
                    let offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasWithBothOptions'));
                    offcanvas.show();
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos de la línea:', error);
        });

        
}




