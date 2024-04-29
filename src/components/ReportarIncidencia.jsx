
export default function ReportarIncidencia() {
    return (
        <div className="incidencias__botones w-100 mt-3 h-75 d-flex align-items-center justify-content-center flex-wrap gap-4">
            <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-computer"></i>
                <p className="m-0 pt-2">Sistemas</p>
            </button>
            <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-globe"></i>
                <p className="m-0 pt-2">Web</p>
            </button>
            <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-tower-cell"></i>
                <p className="m-0 pt-2">Telefonía</p>
            </button>
            <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-shield-virus"></i>
                <p className="m-0 pt-2">Ciberseguridad</p>
            </button>
            <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <p className="m-0 pt-2">Mantenimiento</p>
            </button>
            <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-laptop-code"></i>
                <p className="m-0 pt-2">Progromación</p>
            </button>
        </div>
    );
}