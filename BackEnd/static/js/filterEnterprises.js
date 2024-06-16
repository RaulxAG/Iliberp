let optionSelect = document.querySelector('#optionSelect')
let searchInput = document.querySelector('#searchInput');
const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

optionSelect.addEventListener('change', function() {
    setTimeout(() => {
        filterEnterprises(this.value, searchInput.value);
    }, 500)
});

searchInput.addEventListener('input', function() {
    setTimeout(() => {
        filterEnterprises(optionSelect.value, this.value);
    }, 300)
});

function filterEnterprises(option, search) {
    fetch('/empleados/updateFilterEnterprises/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({ 
            option: option, search: search 
        })
    })
    .then(response => response.json())
    .then(data => {
        updateTable(data);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function updateTable(data) {
    let tableBody = document.querySelector('#tablaEmpleados');
    tableBody.innerHTML = '';

    data.forEach(enterprise => {
        let row = document.createElement('tr');
        row.onclick = () => window.location.href = `/detailsEnterprise-${enterprise.id}`;
        row.innerHTML = `
            <td data-label="Nombre">${enterprise.nombre}</td>
            <td data-label="Dni">${enterprise.cif}</td>
            <td data-label="Dirección">${enterprise.direccion}</td>
            <td data-label="Email">${enterprise.email}</td>
            <td data-label="Teléfono 1">${enterprise.telefono1}</td>
        `;
        tableBody.appendChild(row);
    });
}