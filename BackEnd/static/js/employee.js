let buttonEdit = document.querySelector("#buttonEdit");

const inputs = document.querySelector('.formularioCrud').querySelectorAll('input');
const formularioCrud = document.querySelector("#formularioCrud")
const btnAceptarExiste = document.querySelector("#btnAceptar")

//Crear el boton de aceptar
let buttonAceptar = document.createElement('button');
buttonAceptar.textContent = "Aceptar";
buttonAceptar.className = "btnAceptar button";
buttonAceptar.id = "btnAceptar";

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
    console.log(data)
    // Enviar los datos a saveEmployee utilizando AJAX
    fetch("/saveEmployee/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log("Empleado guardado exitosamente");
            // Aquí puedes agregar cualquier lógica adicional que desees después de guardar el empleado
        } else {
            console.error("Error al guardar el empleado");
        }
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
    }
    
}