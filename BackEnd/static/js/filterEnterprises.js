let optionSelect = document.querySelector('#optionSelect')
let searchInput = document.querySelector('#searchInput');

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
    fetch('/updateFilterEnterprises/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
            <td>${enterprise.nombre}</td>
            <td>${enterprise.cif}</td>
            <td>${enterprise.direccion}</td>
            <td>${enterprise.email}</td>
            <td>${enterprise.telefono1}</td>
            <td>${enterprise.telefono2}</td>
        `;
        tableBody.appendChild(row);
    });
}