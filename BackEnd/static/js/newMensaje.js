let selectTipoPersona = document.querySelector("#tipoPersona")
let labelPersona  = document.querySelector("#labelPersona")
let selectPersona  = document.querySelector("#selectPersona")

selectTipoPersona.addEventListener('change', function() {
    let url = this.value === 'empleado' ? '/allEmployees/' : '/allClients/';

    this.value=="cliente" ? labelPersona.textContent ="Cliente" : labelPersona.textContent ="Empleado"
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            selectPersona.innerHTML = '';

            data.forEach(persona => {
                let option = document.createElement('option');
                option.value = persona.id;
                option.textContent = persona.nombre;
                selectPersona.appendChild(option);
            });
        });
})

console.log()