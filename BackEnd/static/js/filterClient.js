let optionSelect = document.querySelector('#optionSelect');
let searchInput = document.querySelector('#searchInput');
const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

optionSelect.addEventListener('change', function() {
    setTimeout(() => {
        filterClients(this.value, searchInput.value);
    }, 500)
});

searchInput.addEventListener('input', function() {
    setTimeout(() => {
        filterClients(optionSelect.value, this.value);
    }, 300)
});


function filterClients(option, search) {
    fetch('/updateFilterClients/', {
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

    data.forEach(client => {
        let row = document.createElement('tr');
        row.onclick = () => window.location.href = `/detailsClient-${client.id}`;
        row.innerHTML = `
            <td data-label="Nombre">${client.user.first_name}</td>
            <td data-label="Apellido">${client.user.last_name}</td>
            <td data-label="Dni">${client.dni}</td>
            <td data-label="Teléfono">${client.telefono1}</td>
            <td data-label="Empresa">${client.empresa}</td>
        `;
        tableBody.appendChild(row);
    });
}