window.onload=()=> {
    let buttonEdit = document.querySelector("#buttonEdit");
    const btnAceptarExiste = document.querySelector("#btnAceptar")
    const inputs = document.querySelector('.formularioCrud').querySelectorAll('input');
    const formularioCrud = document.querySelector("#formularioCrud")
    let containerAlertas = document.querySelector('#alertas')

    //Crear el boton de aceptar
    let buttonAceptar = document.createElement('button');
    buttonAceptar.textContent = "Aceptar";
    buttonAceptar.className = "btnAceptar button";
    buttonAceptar.id = "btnAceptar";
    //Añadirlo pero lo ocultamos para luego mostrarlo en 'Nuevo empleado'
    formularioCrud.appendChild(buttonAceptar)  
    buttonAceptar.classList.add("d-none");

    //Listener
    buttonEdit.addEventListener("click",habilitarEdicion)
    buttonAceptar.addEventListener("click", function() {
        //Recoger los datos del formulario
        const inputs = document.querySelector('.formularioCrud').querySelectorAll('input');
        //Creo un objeto con los datos del usuario
        const data = {};
        inputs.forEach(input => {
            data[input.id] = input.value;
        });
        // Agregar un parámetro que indique la acción (nuevo empleado o editar empleado)
        data.action = window.location.href.includes("new") ? "new" : "edit";
        console.log(data)
        // // Enviar los datos a saveEmployee utilizando AJAX
        fetch("/saveEmployee/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            let alert = document.createElement('div');
            alert.className = 'alert';
            alert.setAttribute('role', 'alert');
            
            if (data.success) {
                alert.classList.add('alert-success');
                alert.textContent = data.message;
            } else {
                alert.classList.add('alert-danger');
                alert.textContent = data.message ;
            }
            
            containerAlertas.appendChild(alert)  // Añadir la alerta al principio del body

            setTimeout(() => {
                alert.remove();  // Remover la alerta 
                window.location.href='/employees'
            }, 1000);
        })
        
        .catch(error => {
            console.error("Error de red:", error);
        });
    });
    
    function habilitarEdicion() {
        //Ponerlos editables los inputs
        inputs.forEach(input => {
            input.disabled = false;
        });

        //Ponemos esta comprobación para que solo lo añada una vez el botón de aceptar
        if (!btnAceptarExiste) { 
            formularioCrud.appendChild(buttonAceptar)  
            buttonAceptar.classList.remove("d-none");
            buttonAceptar.classList.add("d-block");
        }
        
    }

    // Comprobar si la URL contiene "new"
    if (window.location.href.includes("new")) {
        inputs.forEach(input => {
            input.disabled = false;
        });
        buttonEdit.classList.add("d-none");
        buttonAceptar.classList.remove("d-none");
    }
};