let empleados = []
let incidencias = []
let empresas = []

window.onload = function() {
    datosEmpleados()
    datosIncidencias()
    datosEmpresas()
}

function datosEmpleados() {
    fetch('http://localhost:3000/empleados')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la respuesta del servidor.');
            }
            return response.json();
        })
        .then(data => {
            empleados = data;
            console.log('Datos de empleados obtenidos:', empleados);
            llenarTablaEmpleados(); // Llamada a la función después de obtener los datos
        })
        .catch(error => {
            console.error('Error al obtener los empleados:', error);
        });
}
function datosIncidencias() {
    fetch('http://localhost:3000/incidencias')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la respuesta del servidor.');
            }
            return response.json();
        })
        .then(data => {
            incidencias = data;
            console.log('Datos de incidencias obtenidos:', incidencias);
            llenarTablaIncidencias();
        })
        .catch(error => {
            console.error('Error al obtener las incidencias:', error);
        });
}

function datosEmpresas() {
    fetch('http://localhost:3000/empresas')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la respuesta del servidor.');
            }
            return response.json();
        })
        .then(data => {
            empresas = data;
            console.log('Datos de incidencias obtenidos:', empresas);
            llenarTablaEmpresas();
        })
        .catch(error => {
            console.error('Error al obtener las incidencias:', error);
        });
}
// Función para llenar la tabla con los datos de los empleados obtenidos del servidor
function llenarTablaEmpleados() {
    const tablaBody = document.getElementById('tablaEmpleados');

    empleados.forEach(empleado => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${empleado.nombre}</td>
            <td>${empleado.apellidos}</td>
            <td>${empleado.telefono}</td>
            <td>${empleado.departamento}</td>
        `;
        tablaBody.appendChild(fila);
    });
}

// Función para llenar la tabla con los datos de los empleados obtenidos del servidor
function llenarTablaIncidencias() {
    const tablaBody = document.getElementById('tablaIncidencias');

    incidencias.forEach(incidencia => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${incidencia.descripcion}</td>
            <td>${incidencia.cliente}</td>
            <td>${incidencia.empresa}</td>
            <td>${incidencia.prioridad}</td>
        `;
        tablaBody.appendChild(fila);
    });
}

function llenarTablaEmpresas() {
    const tablaBody = document.getElementById('tablaEmpresas');

    empresas.forEach(empresa => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${empresa.nombre}</td>
            <td>${empresa.direccion}</td>
            <td>${empresa.telefono}</td>
            <td>${empresa.correo}</td>
        `;
        tablaBody.appendChild(fila);
    });
}


function habilitarEdicion() {
    const inputs = document.querySelector('.formularioCrud').querySelectorAll('input,select');
    const fichaUsuario = document.querySelector("#formularioCrud")
    const btnAceptarExiste = document.getElementsByClassName("btnAceptar")[0]
    let buttonAceptar =""

    inputs.forEach(input => {
        input.disabled = false;
    });

    //Comprobar si ya hay boton de aceptar
    if (!btnAceptarExiste) { 
        buttonAceptar = document.createElement('button')
        buttonAceptar.textContent="Aceptar"
        buttonAceptar.className="btnAceptar button"
        fichaUsuario.appendChild(buttonAceptar)  
    }

    buttonAceptar.addEventListener("click", function() {
        const alerta = document.createElement('div');
        alerta.className = "alert alert-success mensajeCreado";
        alerta.setAttribute("role", "alert");
        alerta.innerHTML = "<i class='fa-solid fa-square-plus' style='color: #1f5129;'></i> Empresa creada correctamente ";
        document.body.appendChild(alerta);
    });
    
}