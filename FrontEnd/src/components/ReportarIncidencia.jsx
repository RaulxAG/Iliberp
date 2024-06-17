import { Link } from "react-router-dom";

export default function ReportarIncidencia({ t }) {

    return (
        <div className="incidencias__botones w-100 mt-3 h-75 d-flex align-items-center justify-content-center flex-wrap gap-4">
            <Link to="/clientes/incidencias?categoria=Sistemas" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-computer"></i>
                <p className="m-0 pt-2">{t('sistemas')}</p>
            </Link>
            <Link to="/clientes/incidencias?categoria=Web" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-globe"></i>
                <p className="m-0 pt-2">{t('web')}</p>
            </Link>
            <Link to="/clientes/incidencias?categoria=Telefonía" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-tower-cell"></i>
                <p className="m-0 pt-2">{t('telefonia')}</p>
            </Link>
            <Link to="/clientes/incidencias?categoria=Ciberseguridad" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-shield-virus"></i>
                <p className="m-0 pt-2">{t('ciberseguridad')}</p>
            </Link>
            <Link to="/clientes/incidencias?categoria=Taller" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <p className="m-0 pt-2">{t('mantenimiento')}</p>
            </Link>
            <Link to="/clientes/incidencias?categoria=Programacion" className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                <i className="fa-solid fa-laptop-code"></i>
                <p className="m-0 pt-2">{t('programacion')}</p>
            </Link>
        </div>
    );
}