let optionSelect = document.querySelector('#optionSelect')
let searchInput = document.querySelector('#searchInput');

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
    fetch('/updateFilterEmployes/', {
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

    data.forEach(employee => {
        let row = document.createElement('tr');
        row.onclick = () => window.location.href = `/detailsEmployee-${employee.id}`;
        row.innerHTML = `
            <td>${employee.user.first_name}</td>
            <td>${employee.user.last_name}</td>
            <td>${employee.dni}</td>
            <td>${employee.telefono}</td>
            <td>${employee.departamento}</td>
        `;
        tableBody.appendChild(row);
    });
}