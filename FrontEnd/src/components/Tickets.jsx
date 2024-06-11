import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { eliminarIncidencia } from "../librerias/libTickets";

export default function Tickets({ t }) {
    const [client_id, setClient_id] = useState(2);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTicketId, setEditingTicketId] = useState(null); // Estado para almacenar el ID del ticket que se está editando
    const [editedDescription, setEditedDescription] = useState(""); // Estado para almacenar la descripción editada
    const [editedObservations, setEditedObservations] = useState(""); // Estado para almacenar las observaciones editadas
    const [editedCategory, setEditedCategory] = useState("");
    const [ticketChangeCounter, setTicketChangeCounter] = useState(0);

    const navigate = useNavigate();

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
                // Actualizar el estado con los datos recibidos
                setTickets(responseData);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Llamar a la función fetchData cuando el componente se monte y client_id cambie
        fetchData();
    }, [client_id, ticketChangeCounter]); // client_id es una dependencia, la solicitud se realizará cuando cambie

    const handleEliminarIncidencia = (incident_id) => {
        eliminarIncidencia(incident_id, navigate);
    };

    const editarIncidencia = (incident_id, description, observations, category) => {
        setEditingTicketId(incident_id);
        setEditedDescription(description);
        setEditedObservations(observations);
        setEditedCategory(category);
    }

    // Función para guardar los cambios de edición
    const guardarCambios = (incident_id, description, observations, category) => {
        
        fetch(`http://127.0.0.1:8000/editIncidentJSON/${incident_id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoria: category,
                descripcion: description,
                observaciones: observations
            }),
            })
            .then(response => {
                if (!response.ok) {
                    alert("Ha habido un error");
                    throw new Error('Network response was not ok');
                } else {
                    alert("Ticket editado con éxito")
                    navigate(0)
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error:', error);
            });

        setEditingTicketId(null); // Restablecer el ID del ticket en modo de edición
    }

    return (
        <div className="tickets__botones mt-3 h-75 d-flex align-items-center justify-content-center flex-wrap gap-3 pt-5 pt-sm-0 overflow-y-scroll">
            {loading && (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}

            {!loading && tickets.length === 0 && (
                <p className="text-center">{t('noIncidencias')}</p>
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
                                {editingTicketId === ticket.id ? ( // Mostrar campos de edición si el ticket está en modo de edición
                                    <div className="d-flex gap-2 mb-5 w-100 justify-content-between">
                                        <div className="d-flex flex-column w-50">
                                            <p className="m-0">{t('descripcion')}</p>
                                            <textarea value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} className="form-control" rows="3"></textarea>
                                        </div>
                                        <div className="d-flex flex-column w-50">
                                            <p className="m-0">{t('observaciones')}</p>
                                            <textarea value={editedObservations} onChange={(e) => setEditedObservations(e.target.value)} className="form-control" rows="3"></textarea>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="d-flex gap-2 mb-3 w-100 justify-content-between">
                                        <div className="d-flex flex-column w-50">
                                            <p className="m-0">{t('descripcion')}</p>
                                            <p className="m-0 py-3 px-3 rounded bg-light text-dark h-100">{ticket.descripcion}</p>
                                        </div>
                                        <div className="d-flex flex-column w-50">
                                            <p className="m-0">{t('observaciones')}</p>
                                            <p className="m-0 py-3 px-3 rounded bg-light text-dark h-100">{ticket.observaciones}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="d-flex gap-2 mb-3 justify-content-between w-100">
                                    <div className="d-flex flex-column w-50">
                                        <p className="m-0">{t('estado')}</p>
                                        <p className={`m-0 ${ticket.estado === 'pendiente' ? 'bg-secondary' : ticket.estado === 'proceso' ? 'bg-success' : ticket.estado === 'pausa' ? 'bg-secondary' : ticket.estado === 'terminado' ? 'bg-danger' : ''} py-1 px-2 text-center rounded-pill w-75`}>{ticket.estado}</p>
                                    </div>
                                    <div className="d-flex flex-column w-50">
                                        <p className="m-0">{t('prioridad')}</p>
                                        <p className={`m-0 ${ticket.prioridad === 'urgente' ? 'bg-danger' : ticket.prioridad === 'importante' ? 'bg-warning' : ticket.prioridad === 'media' ? 'bg-success' : ticket.prioridad === 'baja' ? 'bg-secondary' : ''} py-1 px-2 text-center rounded-pill w-75`}>{ticket.prioridad}</p>
                                    </div>
                                </div>
                                <div className="d-flex gap-2 mb-3 justify-content-between w-100">
                                    <div className="d-flex flex-column w-50">
                                        <p className="m-0">{t('fecha')}</p>
                                        <p className="m-0">{ticket.fecha_inicio}</p>
                                    </div>
                                    <div className="d-flex flex-column w-50">
                                        <p className="m-0">{t('categoria')}</p>
                                        {editingTicketId === ticket.id ? (
                                            <select value={editedCategory} onChange={(e) => setEditedCategory(e.target.value)} className="form-select">
                                                <option value="Ciberseguridad">{t('ciberseguridad')}</option>
                                                <option value="Programacion">{t('programacion')}</option>
                                                <option value="Telefonía">{t('telefonia')}</option>
                                                <option value="Sistemas">{t('sistemas')}</option>
                                                <option value="Taller">{t('taller')}</option>
                                                <option value="Web">{t('web')}</option>
                                            </select>
                                        ) : (
                                            <p className="m-0">{ticket.categoria}</p>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="accionesDetalleTicket d-flex gap-2 justify-content-center w-100">
                                    <button onClick={() => handleEliminarIncidencia(ticket.id)} className="btn btn-outline-danger fw-bold align-self-center w-50"><i className="fa-solid fa-trash"></i> {t('eliminar')}</button>
                                    {editingTicketId === ticket.id ? ( // Mostrar botón de guardar si el ticket está en modo de edición
                                        <button onClick={() => guardarCambios(ticket.id, editedDescription, editedObservations, editedCategory)} className="btn btn-outline-success fw-bold align-self-center w-50"><i className="fa-solid fa-save"></i> {t('guardar')}</button>
                                    ) : (
                                        <button onClick={() => editarIncidencia(ticket.id, ticket.descripcion, ticket.observaciones, ticket.categoria)} className="btn btn-outline-primary fw-bold align-self-center w-50"><i className="fa-solid fa-pen"></i> {t('editar')}</button>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}