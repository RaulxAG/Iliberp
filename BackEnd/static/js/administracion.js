window.onload = () => {
    // COMO ESTE CÓDIGO ES IGUAL PARA TODOS LOS CRUD Y SOLO CAMBIA EL fetch, HACEMOS ESTE IF Y CAMBIAMOS EL fetch
    // Obtener el token CSRF del campo de entrada oculto en el formulario
    const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
    let url = window.location.href;
    let rutaLlamaAjax = "";
    let location = "";
    if (url.includes('Employee')) {
        rutaLlamaAjax = '/empleados/saveEmployee/';
        location = '/empleados/employees';
    } else if (url.includes('Enterprise')) {
        rutaLlamaAjax = '/empleados/saveEnterprise/';
        location = '/empleados/enterprises';
    } else if (url.includes('Client')) {
        rutaLlamaAjax = '/empleados/saveClient/';
        location = '/empleados/clients';
    } else if (url.includes('Incident')) {
        rutaLlamaAjax = '/empleados/saveIncident/';
        location = '/empleados/incidents';
    }
    
    //Obtener los elementos
    let buttonEdit = document.querySelector("#buttonEdit");
    let btnAceptarExiste = document.querySelector("#btnAceptar");
    let inputs = document.querySelector('.formularioCrud').querySelectorAll('input');
    let textareas = document.querySelector('.formularioCrud').querySelectorAll('textarea');
    let selects = document.querySelector('.formularioCrud').querySelectorAll('select');
    let form = document.querySelector('form');
    let containerAlertas = document.querySelector('#alertas');

    // Crear el boton de aceptar
    let buttonAceptar = document.createElement('button');
    buttonAceptar.textContent = "Aceptar";
    buttonAceptar.className = "btnAceptar button mt-3 w-50 m-auto";
    buttonAceptar.id = "btnAceptar";
    // Añadirlo pero lo ocultamos para luego mostrarlo 
    form.appendChild(buttonAceptar);
    buttonAceptar.classList.add("d-none");
    buttonAceptar.type = "submit";

    form.addEventListener('submit', function (event) {
        const invalidInputs = Array.from(form.querySelectorAll(':invalid'));
        event.preventDefault(); // Evita el envío del formulario

        if (invalidInputs.length > 0) {
            // Limpiar mensajes de error anteriores
            form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

            invalidInputs.forEach(input => {
                const errorElement = document.createElement('div');
                errorElement.className = 'invalid-feedback';
                errorElement.style.color = 'red'; 
                errorElement.innerText = input.title;

                // Añade el mensaje de error después del input
                if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('invalid-feedback')) {
                    input.insertAdjacentElement('afterend', errorElement);
                }
            });
        } else {
            // Crear un objeto con los datos del usuario
            const formData = new FormData(form);

            const action = window.location.href.includes("new") ? "new" : "edit";
            formData.append('action', action);
            for (let entry of formData.entries()) {
                console.log(entry);
            }
            // Enviar los datos a saveEmployee utilizando AJAX
            fetch(`${rutaLlamaAjax}`, {
                method: "POST",
                headers: {
                    'X-CSRFToken': csrfToken
                },
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    let alert = document.createElement('div');
                    alert.className = 'alert';
                    alert.setAttribute('role', 'alert');
                    console.log(data)
                    if (data.error) {
                        // Si hay un error de autenticación, redirigir al usuario al inicio de sesión
                        window.location.href = '/login/';
                    } else {
                        if (data.success) {
                            alert.classList.add('alert-success');
                            alert.textContent = data.message;
                        } else {
                            alert.classList.add('alert-danger');
                            alert.textContent = data.message;
                        }

                        containerAlertas.appendChild(alert);  // Añadir la alerta al principio del body

                        setTimeout(() => {
                            alert.remove();  // Eliminar la alerta 
                        }, 3000);
                        
                        data.success ? window.location.href = `${location}` : ""
                    }
                })
                .catch(error => {
                    console.error("Error de red:", error);
                });
        }
    });

    // Listener
    buttonEdit.addEventListener("click", habilitarEdicion);

    function habilitarEdicion() {
        // Poner los inputs editables
        inputs.forEach(input => {
            if (window.location.href.includes("Incident")) {
                let tiempo_empleado = document.querySelector('#tiempo_empleado');
                tiempo_empleado.disabled = true;
                input.disabled = false;
            } else {
                input.disabled = false;
            }
        });
        textareas.forEach(textarea => {
            textarea.disabled = false;
        });
        selects.forEach(select => {
            select.disabled = false;
        });

        // Ponemos esta comprobación para que solo lo añada una vez el botón de aceptar
        if (!btnAceptarExiste) {
            buttonAceptar.classList.remove("d-none");
            buttonAceptar.classList.add("d-block","mt-5");
        }
    }

    // Comprobar si la URL contiene "new"
    if (window.location.href.includes("new")) {
        inputs.forEach(input => {
            input.disabled = false;
        });
        textareas.forEach(textarea => {
            textarea.disabled = false;
        });
        selects.forEach(select => {
            select.disabled = false;
        });
        buttonEdit.classList.add("d-none");
        buttonAceptar.classList.remove("d-none");
    }

    // Si estamos creando una incidencia nueva, el tiempo empleado desaparece
    if (window.location.href.includes("newIncident")) {
        let divTiempoEmpleado = document.querySelector('#divTiempoEmpleado');
        divTiempoEmpleado.classList.add("d-none");
    }
};
