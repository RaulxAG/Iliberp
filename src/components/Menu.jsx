

export default function Menu({ selected }) {
    console.log(selected);

    return (
      <section className="menuLateral">
        <section className="menuLateral__profile">
            <img src="./public/assets/img/usuario.png" alt="Foto de perfil" />
            <p>Usuario</p>
        </section>
        <section className="menuLateral__enlaces">
            <ul>
                <li className={selected === "inicio" ? "selected" : ""}>
                    <a href="#">
                        <i className="fa-solid fa-house"></i>
                    </a>
                </li>
                <li className={selected === "incidencias" ? "selected" : ""}>
                    <a href="#">
                        <i className="fa-solid fa-triangle-exclamation"></i>
                    </a>
                </li>
                <li className={selected === "mensajeria" ? "selected" : ""}>
                    <a href="#">
                        <i className="fa-solid fa-comments"></i>
                    </a>
                </li>
                <li className={selected === "tienda" ? "selected" : ""}>
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
        <section className="menuLateral__logo">
            <img src="./public/assets/img/logo.png" alt="logo" />
        </section>
      </section>  
    );
}