// Obtener todos los elementos con la clase circleEmpleado
var circleEmpleados = document.querySelectorAll('.circleEmpleado');

// Definir la función cargarObservacion
function cargarObservacion(id,action) {
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

    // Por ejemplo, podrías hacer una llamada AJAX utilizando el id
    fetch('/detailsLine/'+id)
        .then(response => response.json())
        .then(data => {
            if (action === "details") {
           // Actualizar el campo de observación en la interfaz de usuario
           const observacionField = document.getElementById('observaciones');
           observacionField.value = data.observacion; // Suponiendo que el atributo en el objeto de datos se llama "observacion"
           
           // Actualizar los campos de fecha y tiempo
           const fechaInicioField = document.getElementById('fecha_inicio');
           fechaInicioField.value = data.fecha; // Actualizar el campo de fecha inicio
           
           const tiempoEmpleadoField = document.getElementById('tiempo_empleado');
           timePattern=data.tiempo.split(":")
           tiempoEmpleadoField.value = timePattern[0]+"h "+timePattern[1]+"min"; // Actualizar el campo de tiempo empleado
           
           //Cambiar la url para luego tenerla en cuenta cuadno vayamos a editar
           history.pushState({}, '', `/detailsLine/${id}`);
        } else if (action === "edit") {
           // Cargar datos en el modal
           document.getElementById('commentsLine').value = data.observacion || '';
           document.getElementById('start').value = data.comienzo || '';
           document.getElementById('end').value = data.fin || '';
           document.getElementById('dateLine').value = data.fecha || '';
           document.getElementById('timeLine').value = data.tiempo || '';
           document.getElementById('addTime').checked = data.addTime || false;

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




