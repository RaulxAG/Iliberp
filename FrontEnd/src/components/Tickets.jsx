import { Link } from "react-router-dom";

export default function Tickets() {
    return (
        <div className="tickets__botones mt-3 h-75 d-flex align-items-center justify-content-center flex-wrap gap-3">
            <article className="col-5 botones__ticket rounded p-2 d-flex flex-column align-items-center justify-content-between">
                <p className="m-0 text-start w-100">Nombre cliente</p>
                <p className="m-0 text-start w-100">Estado</p>
                <div className="mt-2 d-flex w-100 align-items-center justify-content-between">
                    <p className="ticket__fecha m-0">27/04/2024</p>
                    <button type="button" className="btn ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-file-invoice"></i></button>
                </div>
            </article>

            <article className="col-5 botones__ticket rounded p-2 d-flex flex-column align-items-center justify-content-between">
                <p className="m-0 text-start w-100">Nombre cliente</p>
                <p className="m-0 text-start w-100">Estado</p>
                <div className="mt-2 d-flex w-100 align-items-center justify-content-between">
                    <p className="ticket__fecha m-0">27/04/2024</p>
                    <button type="button" className="btn ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-file-invoice"></i></button>
                </div>
            </article>

            <article className="col-5 botones__ticket rounded p-2 d-flex flex-column align-items-center justify-content-between">
                <p className="m-0 text-start w-100">Nombre cliente</p>
                <p className="m-0 text-start w-100">Estado</p>
                <div className="mt-2 d-flex w-100 align-items-center justify-content-between">
                    <p className="ticket__fecha m-0">27/04/2024</p>
                    <button type="button" className="btn ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-file-invoice"></i></button>
                </div>
            </article>

            <article className="col-5 botones__ticket rounded p-2 d-flex flex-column align-items-center justify-content-between">
                <p className="m-0 text-start w-100">Nombre cliente</p>
                <p className="m-0 text-start w-100">Estado</p>
                <div className="mt-2 d-flex w-100 align-items-center justify-content-between">
                    <p className="ticket__fecha m-0">27/04/2024</p>
                    <button type="button" className="btn ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-file-invoice"></i></button>
                </div>
            </article>


            {/* <!-- Modal --> */}
            <div className="botones__modal modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" data-bs-theme="dark">
                            <div className="d-flex flex-column text-start">
                                <p className="m-0 mb-2 fw-bold">Ticket Nº 2823</p>
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Cliente | Empresa | Teléfono</h1>
                            </div>
                            
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body py-5 d-flex flex-wrap gap-3 text-start fw-bolder">
                            
                            <div className="d-flex gap-2 mb-5">
                                <div className="d-flex flex-column">
                                    <p className="m-0">Descripción</p>
                                    <p className="m-0 py-3 px-3 rounded bg-light text-dark">Breve descripción de la incidencia a resolver</p>
                                </div>

                                <div className="d-flex flex-column">
                                    <p className="m-0">Observaciones</p>
                                    <p className="m-0 py-3 px-3 rounded bg-light text-dark">Observaciones hechas por nuestros empleados</p>
                                </div>
                            </div>
                            
                            <div className="d-flex gap-2 mb-5 justify-content-between w-100">
                                <div className="d-flex flex-column w-50">
                                    <p className="m-0">Estado</p>
                                    <p className="m-0 bg-success py-1 px-2 text-center rounded-pill w-75">En Proceso</p>
                                </div>

                                <div className="d-flex flex-column w-50">
                                    <p className="m-0">Prioridad</p>
                                    <p className="m-0 bg-warning py-1 px-2 text-center rounded-pill w-75">Importante</p>
                                </div>
                            </div>
                            
                            <div className="d-flex gap-2 mb-5 justify-content-between w-100">
                                <div className="d-flex flex-column w-50">
                                    <p className="m-0">Fecha</p>
                                    <p className="m-0">27/04/2024</p>
                                </div>

                                <div className="d-flex flex-column w-50">
                                    <p className="m-0">Categoría</p>
                                    <p className="m-0">Programación</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}