export async function eliminarIncidencia(incident_id, navigate) {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar la incidencia numero: " + incident_id + "?");
    if (confirmacion) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/deleteIncidentJSON/${incident_id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                alert("Ha habido un error");
                throw new Error('Network response was not ok');
            }

            alert("Incidencia eliminada con éxito");
            navigate(0)
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert("Eliminación cancelada");
    }
}
