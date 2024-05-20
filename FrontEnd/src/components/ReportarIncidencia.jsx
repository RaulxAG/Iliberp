import { Link } from "react-router-dom";

export default function ReportarIncidencia() {
    return (
        <div className="incidencias__botones w-100 mt-3 h-75 d-flex align-items-center justify-content-center flex-wrap gap-4">
            <Link to="/incidencias?categoria=Sistemas" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-computer"></i>
                <p className="m-0 pt-2">Sistemas</p>
            </Link>
            <Link to="/incidencias?categoria=Web" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-globe"></i>
                <p className="m-0 pt-2">Web</p>
            </Link>
            <Link to="/incidencias?categoria=Telefonía" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-tower-cell"></i>
                <p className="m-0 pt-2">Telefonía</p>
            </Link>
            <Link to="/incidencias?categoria=Ciberseguridad" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-shield-virus"></i>
                <p className="m-0 pt-2">Ciberseguridad</p>
            </Link>
            <Link to="/incidencias?categoria=Taller" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <p className="m-0 pt-2">Mantenimiento</p>
            </Link>
            <Link to="/incidencias?categoria=Programacion" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-laptop-code"></i>
                <p className="m-0 pt-2">Progromación</p>
            </Link>
        </div>
    );
}