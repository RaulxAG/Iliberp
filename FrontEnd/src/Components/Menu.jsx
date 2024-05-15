

export default function Menu({ selected }) {

  // menuLateral
  return (
    <section className="menuLateral box">
          <div className="d-flex flex-column align-items-center justify-content-between h-100">
              <section className="menuLateral__profile border-bottom">
                  <img src="/assets/img/usuario.png" className="profile__photo" alt="Foto de perfil" />
              </section>
              <section className="menuLateral__enlaces h-100 w-100">
                  <ul>
                    <li className="">
                        <a href="/" className="position-relative">
                            <img src="/assets/img/logoChat.png" alt=""  className=""/>
                            <div className="position-absolute">
                                <img src="/assets/img/logoChatBlanco.png" alt="" />
                                <p>Chat</p>
                            </div>
                        </a>
                    </li>
                    <li className="">
                        <a href="/" className="position-relative">
                            <img src="/assets/img/logoIncident.png" alt="" />
                            <div className="position-absolute">
                                <img src="/assets/img/logoIncidentBlanco.png" alt="" />
                                <p>Incidencias</p>
                            </div>
                        </a>
                    </li>
                    <li className="">
                        <a href="/" className="position-relative">
                            <img src="/assets/img/logoCompras.png" alt="" />
                            <div className="position-absolute">
                                <img src="/assets/img/logoComprasBlanco.png" alt="" />
                                <p>Tienda</p>
                            </div>
                        </a>
                    </li>
                    <li className="">
                        <a href="/" className="position-relative">
                            <img src="/assets/img/logoTraductor.png" alt="" />
                            <div className="position-absolute">
                                <img src="/assets/img/logoTraductorBlanco.png" alt="" />
                                <p>Traductor</p>
                            </div>
                        </a>
                    </li>
                  </ul>
              </section>
              <section className="menuLateral__logo d-flex align-items-center justify-content-center py-2">
                <img src="/assets/img/logo.png" alt="logo" />
            </section>
          </div>

          
          
    </section>  
  );
}