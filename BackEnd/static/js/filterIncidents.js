let selects = document.querySelector('#formFiltros').querySelectorAll('select')
let filterCat = ""
let filterClient = ""
let filterState = ""
let filterEmploy = ""
let filterPriority = ""
let filterDate= ""
const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

//Button de borrar filtros
document.getElementById('clearFilters').addEventListener('click', function() {
    // Limpia los valores de los filtros
    filterCat = "";
    filterClient = "";
    filterState = "";
    filterEmploy = "";
    filterPriority = "";
    filterDate = "";
    
    // Resetear los demás filtros
    selects.forEach(select => {
        select.value = "";
    });
    
    // Llama a la función para aplicar los filtros actualizados
    filterIncidents();
});

selects.forEach(function(select) {
    select.addEventListener('change', function() {
        let selectId = this.id;
        let value = this.value;
        
        //Guardamos el filtro cada vez que va cambiando el select
        switch (selectId) {
            case 'category':
                filterCat = value;
                break;
            case 'client':
                filterClient = value;
                break;
            case 'employee':
                filterEmploy = value;
                break;
            case 'priority':
                filterPriority = value;
                break;
            case 'date':
                filterDate = value;
                break;
            case 'state':
                filterState = value;
                break;
        }

        filterIncidents()
    });
});

function filterIncidents() {
    fetch('/updateFilterIncident/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            category: filterCat,
            client: filterClient,
            state: filterState,
            employee: filterEmploy,
            priority: filterPriority,
            date: filterDate
        })
    })
    .then(response => response.json())
    .then(data => {
        updateTable(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function updateTable(incidents) {
    // Limpia la tabla
    let tableBody = document.getElementById("tablaEmpleados");
    tableBody.innerHTML = "";

    // Itera sobre las incidencias recibidas y agrega filas a la tabla
    incidents.forEach(incident => {
        let row = document.createElement("tr");
        row.onclick = function() {
            window.location.href = '/detailsIncident-' + incident.id;
        };

        row.innerHTML = `
            <td>${incident.category}</td>
            <td>${incident.state}</td>
            <td>${incident.client ? incident.client.username : ''}</td>
            <td>${incident.empleado ? incident.employee_asigned : ''}</td>
            <td>${incident.priority}</td>
            <td>${incident.date}</td>
        `;

        tableBody.appendChild(row);
    });
}