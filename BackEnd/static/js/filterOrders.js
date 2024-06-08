let tableBody = document.getElementById('cuerpo-registros');
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

// Variables para almacenar los filtros
let dateFilter = "";
let stateFilter = "";
let actualURL = window.location.href;
let filters = [];

// Función para actualizar el filtro y mostrar los filtros actuales
function updateFilter(type, value) {
    switch(type) {
    case 'estado':
        stateFilter = value;
        break;
    case 'fecha':
        dateFilter = value;
        break;
    }
    filters = {stateFilter, dateFilter };
    console.log(filters);
    filter(filters);
}

// Función para agregar manejadores de eventos a los botones de los dropdowns
function addEventListeners() {
    console.log("hola")
    document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', event => {
        let filterType = event.target.closest('th').getAttribute('data-filter-type');
        let filterValue = event.currentTarget.getAttribute('value') || event.currentTarget.textContent.trim();
        updateFilter(filterType, filterValue);
    });
    });
}

document.addEventListener('DOMContentLoaded', addEventListeners);

function filter(filters) {

    tableBody.innerHTML = ''; // Vaciar la tabla

    fetch('/updateFilterOrder/', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            date: dateFilter,
            state: stateFilter,
        })
        })
        .then(response => response.json())
        .then(data => {

        rows = ``

        function formatDate(dateString) {
            const date = new Date(dateString);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            const year = date.getFullYear();

            // Agregar un 0 delante si el número es menor que 10
            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }

            return `${day}/${month}/${year}`;
        }

        data.forEach(order => {
            rows += `
            <tr class="tabla__linea" onclick="window.location.href = '/detallePedido-${order.id}';">
                <td>${order.id}</td>
                <td>${formatDate(order.fecha)}</td>
                <td class="d-none d-sm-table-cell">${order.direccion}</td>
                <td class="d-none d-sm-table-cell">${order.cliente.nombre}</td>
                <td>${order.estado}</td>
            </tr>
            `
        })

        tableBody.innerHTML = rows;
    })
}