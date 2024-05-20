import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Tickets() {
    const [client_id, setClient_id] = useState(2);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Definir una función asíncrona dentro del hook useEffect para realizar la solicitud fetch
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/getIncidentsJSON/${client_id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                console.log('Success:', responseData);
                // Actualizar el estado con los datos recibidos
                setTickets(responseData);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Llamar a la función fetchData cuando el componente se monte y client_id cambie
        fetchData();
    }, [client_id]); // client_id es una dependencia, la solicitud se realizará cuando cambie

    const eliminarIncidencia = (incident_id) =>{
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar la incidencia numero: " + incident_id + "?");
        if (confirmacion) {
            fetch(`http://127.0.0.1:8000/deleteIncidentJSON/${incident_id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(responseData => {
                window.location.href = '/inicio';
            })
            .catch(error => {
                console.error('Error:', error);
            });

        } else {
            // Aquí puedes manejar el caso en que el usuario cancela la eliminación
            alert("Eliminación cancelada");
        }
    }

    return (
        <div className="tickets__botones mt-3 h-75 d-flex align-items-center justify-content-center flex-wrap gap-3 overflow-y-scroll">
            {loading && (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}

            {!loading && tickets.length === 0 && (
                <p className="text-center">No hay incidencias en curso, !Felicidades!</p>
            )}

            {tickets.map(ticket => (
                <article key={ticket.id} className="col-5 botones__ticket rounded p-2 d-flex flex-column align-items-center justify-content-between">
                    <p className="m-0 text-start w-100">{ticket.cliente.nombre}</p>
                    <p className="m-0 text-start w-100">{ticket.estado}</p>
                    <div className="mt-2 d-flex w-100 align-items-center justify-content-between">
                        <p className="ticket__fecha m-0">{ticket.fecha_inicio}</p>
                        <button type="button" className="btn ms-3" data-bs-toggle="modal" data-bs-target={`#exampleModal${ticket.id}`}><i className="fa-solid fa-file-invoice"></i></button>
                    </div>
                </article>
            ))}

            {tickets.map(ticket => (

                <div key={ticket.id} className="botones__modal modal fade" id={`exampleModal${ticket.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header" data-bs-theme="dark">
                                <div className="d-flex flex-column text-start">
                                    <p className="m-0 mb-2 fw-bold">{`Ticket Nº ${ticket.id}`}</p>
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">{`${ticket.cliente.nombre} | ${ticket.cliente.empresa} | ${ticket.cliente.telefono}`}</h1>
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-5 d-flex flex-wrap gap-3 text-start fw-bolder">
                                <div className="d-flex gap-2 mb-5 w-100 justify-content-between">
                                    <div className="d-flex flex-column w-50">
                                        <p className="m-0">Descripción</p>
                                        <p className="m-0 py-3 px-3 rounded bg-light text-dark">{ticket.descripcion}</p>
                                    </div>
                                    <div className="d-flex flex-column w-50">
                                        <p className="m-0">Observaciones</p>
                                        <p className="m-0 py-3 px-3 rounded bg-light text-dark">{ticket.observaciones}</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-2 mb-5 justify-content-between w-100">
                                    <div className="d-flex flex-column w-50">
                                        <p className="m-0">Estado</p>
                                        <p className={`m-0 ${ticket.estado === 'pendiente' ? 'bg-secondary' : ticket.estado === 'proceso' ? 'bg-success' : ticket.estado === 'pausa' ? 'bg-secondary' : ticket.estado === 'terminado' ? 'bg-danger' : ''} py-1 px-2 text-center rounded-pill w-75`}>{ticket.estado}</p>
                                    </div>
                                    <div className="d-flex flex-column w-50">
                                        <p className="m-0">Prioridad</p>
                                        <p className={`m-0 ${ticket.prioridad === 'urgente' ? 'bg-danger' : ticket.prioridad === 'importante' ? 'bg-warning' : ticket.prioridad === 'media' ? 'bg-sucess' : ticket.prioridad === 'baja' ? 'bg-secondary' : ''} py-1 px-2 text-center rounded-pill w-75`}>{ticket.prioridad}</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-2 mb-5 justify-content-between w-100">
                                    <div className="d-flex flex-column w-50">
                                        <p className="m-0">Fecha</p>
                                        <p className="m-0">{ticket.fecha_inicio}</p>
                                    </div>
                                    <div className="d-flex flex-column w-50">
                                        <p className="m-0">Categoría</p>
                                        <p className="m-0">{ticket.categoria}</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-2  justify-content-center w-100">
                                    <button onClick={() => eliminarIncidencia(ticket.id)} className="btn btn-outline-danger fw-bold align-self-center w-50"><i className="fa-solid fa-trash"></i> Eliminar</button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}