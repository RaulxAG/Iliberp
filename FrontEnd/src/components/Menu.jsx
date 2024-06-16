import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

export default function Menu({ selected, username }) {
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language);

    const changeLanguage = () => {
        const newLang = currentLang === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
        setCurrentLang(newLang);
    };


    const basePath = '/clientes';

    return (
        <section className="menuLateral box d-flex flex-column align-items-center justify-content-between">
            <div>
                <Link className="link menuLateral__profile" to={`${basePath}/`}>
                    <img src={`${basePath}/assets/img/usuario.png`} className="profile__photo" alt="Foto de perfil" />
                    <p className="d-none d-sm-inline">{username}</p>
                </Link>

                <section className="menuLateral__enlaces">
                    <ul className="enlaces__lista">
                        <li>
                            <a href={`${basePath}/inicio`} className={selected === "inicio" ? "selected" : ""}>
                                <i className="fa-solid fa-house"></i>
                            </a>
                        </li>
                        <li>
                            <a href={`${basePath}/incidencias`} className={selected === "incidencias" ? "selected" : ""}>
                                <i className="fa-solid fa-triangle-exclamation"></i>
                            </a>
                        </li>
                        <li>
                            <a href={`${basePath}/mensajeria`} className={selected === "mensajeria" ? "selected" : ""}>
                                <i className="fa-solid fa-comments"></i>
                            </a>
                        </li>
                        <li>
                            <a href={`${basePath}/tienda`} className={selected === "tienda" ? "selected" : ""}>
                                <i className="fa-solid fa-shop"></i>
                            </a>
                        </li>
                        <li>
                            <button onClick={changeLanguage} className="btn btn-link">
                                <img
                                    src={`${basePath}/assets/img/flag-${currentLang === 'en' ? 'es' : 'en'}.png`}
                                    alt={currentLang === 'en' ? 'Cambiar a Español' : 'Change to English'}
                                    style={{ width: '20px', height: '20px' }}
                                />
                            </button>
                        </li>
                    </ul>
                </section>
            </div>

            <section className="menuLateral__logo d-flex align-items-center justify-content-center py-2 d-none d-sm-block">
                <img src={`${basePath}/assets/img/logo.png`} alt="logo" />
            </section>
        </section>
    );
}
