let tableBody = document.getElementById('cuerpo-registros');
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

// Variables para almacenar los filtros
let typeFilter = "";
let featuredFilter = "";
let priceFilter = "";
let actualURL = window.location.href;
let filters = [];

// Función para actualizar el filtro y mostrar los filtros actuales
function updateFilter(type, value) {
    switch(type) {
        case 'tipo':
            typeFilter = value;
            break;
        case 'destacado':
            featuredFilter = value;
            break;
        case 'precio':
            priceFilter = value;
            break;
    }
    filters = {typeFilter, featuredFilter, priceFilter};
    filter(filters);
}

// Función para agregar manejadores de eventos a los botones de los dropdowns
function addEventListeners() {
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

    fetch('/updateFilterArticle/', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            type: typeFilter,
            featured: featuredFilter,
            price: priceFilter
        })
    })
    .then(response => response.json())
    .then(data => {
        let rows = '';

        data.forEach(article => {
            rows += `
                <tr class="tabla__linea" onclick="window.location.href = '/detalleArticulo-${article.id}';">
                    <td>${article.id}</td>
                    <td>${article.nombre}</td>
                    <td class="d-none d-sm-table-cell">${article.tipo}</td>
                    <td class="text-center">
                        ${article.destacado ? 
                            '<i class="fa-solid fa-circle-check" style="color: #63E6BE;"></i>' :
                            '<i class="fa-solid fa-circle-xmark" style="color: #e66565;"></i>'
                        }
                    </td>
                    <td class="d-none d-md-table-cell text-end">${article.precio.toFixed(2)} €</td>
                </tr>
            `;
        });

        tableBody.innerHTML = rows;
    });
}
