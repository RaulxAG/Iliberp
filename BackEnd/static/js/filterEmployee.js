let optionSelect = document.querySelector('#optionSelect')
let searchInput = document.querySelector('#searchInput');
const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

optionSelect.addEventListener('change', function() {
    setTimeout(() => {
        filterEmployes(this.value, searchInput.value);
    }, 300)
});

searchInput.addEventListener('input', function() {
    setTimeout(() => {
        filterEmployes(optionSelect.value, this.value);
    }, 300)
});

function filterEmployes(option, search) {
    fetch('/empleados/updateFilterEmployes/', {
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

    data.forEach(employee => {
        let row = document.createElement('tr');
        row.onclick = () => window.location.href = `/detailsEmployee-${employee.id}`;
        row.innerHTML = `
            <td data-label="Nombre">${employee.user.first_name}</td>
            <td data-label="Apellido">${employee.user.last_name}</td>
            <td data-label="Dni">${employee.dni}</td>
            <td data-label="Teléfono">${employee.telefono}</td>
            <td data-label="Departamento">${employee.departamento}</td>
        `;
        tableBody.appendChild(row);
    });
}