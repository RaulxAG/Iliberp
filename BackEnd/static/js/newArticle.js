document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-agregar-especificacion').addEventListener('click', function() {
        var nombre = document.getElementById('nombre-especificacion').value;
        var valor = document.getElementById('valor-especificacion').value;
        if (nombre && valor) {
            var ul = document.getElementById('especificaciones-list');
            var li = document.createElement('li');
            li.className = 'list-group-item bg-dark text-light d-flex justify-content-between';
            li.innerHTML = '<strong>' + nombre + ':</strong> ' + valor;
            ul.appendChild(li);
            document.getElementById('nombre-especificacion').value = '';
            document.getElementById('valor-especificacion').value = '';
        } else {
            alert('Por favor, ingresa un nombre y un valor.');
        }
    });
});