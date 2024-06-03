let selects = document.querySelector('#formFiltros').querySelectorAll('select')
let filterCat = ""
let filterClient = ""
let filterState = ""
let filterEmploy = ""
let filterPriority = ""
let filterDate= ""

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
            <td>${incident.client.username}</td>
            <td>${incident.employee_asigned}</td>
            <td>${incident.priority}</td>
            <td>${incident.date}</td>
        `;

        tableBody.appendChild(row);
    });
}