import Menu from "../components/Menu";


// contenedor mainIncidencias 
// contenedor
export default function Incidencias() {
    return (
        <main className="containerPrincipal mainIncidencias">
            <Menu selected="incidencias"></Menu>
            <form action="/" method="post" className="mainIncidencias__formulario contenedor flex-row">
                <section className="box col-9">
                    <h4 className="tittle fs-3 mb-5">Reportar una incidencia</h4>

                    <div className="px-5">
                        <div className="formulario__input">
                            <label htmlFor="titulo">Motivo de tu incidencia</label>
                            <input type="text" name="titulo" id="titulo" />
                        </div>
                        <div className="formulario__inputGroup">
                            <div className="formulario__input">
                                <label htmlFor="categoria">Categoría</label>
                                <select name="categoria" id="categoria">
                                    <option value="ciberseguridad">Ciberseguridad</option>
                                    <option value="programacion">Programacion</option>
                                    <option value="telefonia">Telefonía</option>
                                    <option value="sistemas">Sistemas</option>
                                    <option value="taller">Taller</option>
                                    <option value="web">Web</option>
                                </select>
                            </div>
                            <div className="formulario__input">
                                <label htmlFor="telefono">Teléfono</label>
                                <input type="tel" name="telefono" id="telefono" />
                            </div>
                            <div className="formulario__input">
                                <label htmlFor="email">Correo</label>
                                <input type="email" name="email" id="email" autoComplete="email" />
                            </div>
                        </div>
                        <div className="formulario__input">
                            <label htmlFor="descripcion">Descripción de tu incidencia:</label>
                            <textarea name="descripcion" id="descripcion" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                </section>

                <section className="formulario__acciones">
                    <figure className="d-flex align-items-md-center justify-content-center">
                        <img src="/assets/img/logo.png" alt="Logo" />
                        <article className="d-none d-lg-block">
                            <p className="fs-3 fw-bold">ILIBERP</p>
                            <p>Solutions</p>
                        </article>
                    </figure>
                    

                    <div>
                        <input type="submit" value="Enviar" id="submit" />
                        <input type="reset" value="Vaciar" id="reset" />
                    </div>
                </section>
            </form>
        </main>
    );
}