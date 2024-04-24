

export default function Chat() {
    return (
        <section className="mainMensajeria__chat d-flex flex-column align-items-center justify-content-between col-8 ms-3 shadow-sm">
            <header className="chat__cabecera  w-100 py-2 px-4 d-flex align-items-center justify-content-between">
                <figure className="d-flex align-items-center gap-3 mt-2">
                    <img src="assets/img/usuario.png" alt="" />
                    <h5 className="p-0 m-0">Nombre contacto</h5>
                </figure>
                
                <figure className="cabecera__logo m-0 d-flex align-items-md-center justify-content-center">
                        <img src="/assets/img/logo.png" alt="Logo" />
                        <article className="d-none d-lg-block">
                            <p className="fs-3 m-0 fw-bold">ILIBERP</p>
                            <p className="m-0">Solutions</p>
                        </article>
                    </figure>
            </header>
            <section className="chat__cuerpo w-100 h-100">
                <article className="shadow-sm w-75 py-3 px-3 my-3 mx-2 recibido">
                    <p>ayyyyyyy</p>
                </article>

                <article className="shadow-sm w-75 py-3 px-3 my-3 mx-2 enviado">
                    <p>Me cago</p>
                </article>

                <article className="shadow-sm w-75 py-3 px-3 my-3 mx-2 recibido">
                    <p>Por favor</p>
                </article>

                <article className="shadow-sm w-75 py-3 px-3 my-3 mx-2 enviado">
                    <p>Ayuda</p>
                </article>
            </section>
            <footer className="chat__acciones w-100">
                <form action="" method="post" className="shadow-lg">
                    <button type="button" className="btn fs-3"><i className="fa-solid fa-paperclip"></i></button>

                    <input type="text" name="mensaje" id="mensaje" placeholder="Escribe un mensaje" className="box py-3 px-3" />

                    <button type="button" className="btn fs-3"><i className="fa-solid fa-paper-plane"></i></button>
                </form>
            </footer>
        </section>
    );
}