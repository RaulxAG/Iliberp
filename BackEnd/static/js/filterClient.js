let optionSelect = document.querySelector('#optionSelect');
let searchInput = document.querySelector('#searchInput');

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
            <td>${client.user.first_name}</td>
            <td>${client.user.last_name}</td>
            <td>${client.dni}</td>
            <td>${client.telefono1}</td>
            <td>${client.telefono2}</td>
            <td>${client.empresa}</td>
        `;
        tableBody.appendChild(row);
    });
}