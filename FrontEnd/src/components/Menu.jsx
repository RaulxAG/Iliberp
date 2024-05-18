

export default function Menu({ selected }) {

    // menuLateral
    return (
      <section className="menuLateral box d-flex flex-column align-items-center justify-content-between">
            <div>
                <section className="menuLateral__profile">
                    <img src="/assets/img/usuario.png" className="profile__photo" alt="Foto de perfil" />
                    <p>Usuario</p>
                </section>

                <section className="menuLateral__enlaces">
                    <ul>
                        <li>
                            <a href="/" className={selected === "inicio" ? "selected" : ""}>
                                <i className="fa-solid fa-house"></i>
                            </a>
                        </li>
                        <li>
                            <a href="/incidencias" className={selected === "incidencias" ? "selected" : ""} >
                                <i className="fa-solid fa-triangle-exclamation"></i>
                            </a>
                        </li>
                        <li>
                            <a href="/mensajeria" className={selected === "mensajeria" ? "selected" : ""} >
                                <i className="fa-solid fa-comments"></i>
                            </a>
                        </li>
                        <li className={selected === "tienda" ? "selected" : ""} >
                            <a href="#">
                                <i className="fa-solid fa-shop"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa-solid fa-language"></i>
                            </a>
                        </li>
                    </ul>
                </section>
            </div>

            <section className="menuLateral__logo d-flex align-items-center justify-content-center py-2">
                <img src="/assets/img/logo.png" alt="logo" />
            </section>
            
      </section>  
    );
}