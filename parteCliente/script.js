let empleados = []

window.onload = function() {
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

// Función para llenar la tabla con los datos de los empleados obtenidos del servidor
function llenarTablaEmpleados() {
    const tablaBody = document.getElementById('tablaBody');

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

function habilitarEdicion() {
    const inputs = document.querySelector('.fichaUsuario').querySelectorAll('input');
    const fichaUsuario = document.querySelector("#fichaUsuario")

    inputs.forEach(input => {
        input.disabled = false;
    });

    const buttonAceptar = document.createElement('button')
    buttonAceptar.textContent="Aceptar"
    buttonAceptar.className="btnAceptar button"
    fichaUsuario.appendChild(buttonAceptar)
}