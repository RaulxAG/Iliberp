window.onload=()=> {
    // COMO ESTE CÓDIGO ES IGUAL PARA TODOS LOS CRUD Y SOLO CAMBIA EL fetch, HACEMOS ESTE IF Y CAMBIAMOS EL fetch
    
    let rutaLlamaAjax="saveIncident"
    let location="incidents"

    let buttonEdit = document.querySelector("#buttonEdit");
    const btnAceptarExiste = document.querySelector("#btnAceptar")
    //Recoger los datos del formulario
    const inputs = document.querySelector('.formularioCrud').querySelectorAll('input');
    const textareas = document.querySelector('.formularioCrud').querySelectorAll('textarea');
    const selects = document.querySelector('.formularioCrud').querySelectorAll('select');
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
        //Creo un objeto con los datos del usuario
        const data = {};
        inputs.forEach(input => {
            data[input.id] = input.value;
        });
        textareas.forEach(textarea => {
            data[textarea.id] = textarea.value;
        });
        selects.forEach(select => {
            data[select.id] = select.value;
        });

        console.log(data)
        // Agregar un parámetro que indique la acción (nuevo empleado o editar empleado)
        data.action = window.location.href.includes("new") ? "new" : "edit";
        console.log(data)


        // // Enviar los datos a saveEmployee utilizando AJAX
        fetch(`${rutaLlamaAjax}`, {
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
                window.location.href=`${location}`
            }, 1000);
        })
        
        .catch(error => {
            console.error("Error de red:", error);
        });
    });
    
    function habilitarEdicion() {
        if (window.location.href.includes("detailsLine")) {
        
        }else{
            //Ponerlos editables los inputs
        inputs.forEach(input => {
            let tiempo_empleado =document.querySelector('#tiempo_empleado')
            let fecha_fin =document.querySelector('#fecha_fin')
            tiempo_empleado.disabled = true;
            fecha_fin.disabled = true;
            input.disabled = false; 
        
    });
    textareas.forEach(textarea => {
        textarea.disabled = false;
    });
    selects.forEach(select => {
        select.disabled = false;
    });

    //Ponemos esta comprobación para que solo lo añada una vez el botón de aceptar
    if (!btnAceptarExiste) { 
        formularioCrud.appendChild(buttonAceptar)  
        buttonAceptar.classList.remove("d-none");
        buttonAceptar.classList.add("d-block");
    }
        } 
        
        
        
    }

    // Comprobar si la URL contiene "new"
    if (window.location.href.includes("new")) {
        inputs.forEach(input => {
            input.disabled = false;
            let fecha_fin =document.querySelector('#fecha_fin')
            fecha_fin.disabled = true;
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

    //Si estamos en las incidencias, Tiempo empleado no se puede cambiar porq es un campo calculado y la fecha fin tampoco
    
        let tiempo_empleado =document.querySelector('#tiempo_empleado')
        tiempo_empleado.disabled = true;
};
