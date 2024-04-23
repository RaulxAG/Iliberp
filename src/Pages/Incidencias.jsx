import Menu from "../components/Menu";


// contenedor mainIncidencias 
// contenedor
export default function Inidencias() {
    return (
        <main className="contenedor row">
            <Menu selected="incidencias"></Menu>
            <form action="/" method="post" className="col-11 p-1 row">
                <section className="box h-100 col-10 p-1">
                    <div className="h-100">
                        <h4 className="tittle my-4">Reportar una incidencia</h4>

                        <div>
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
                                    <input type="email" name="email" id="email" />
                                </div>
                            </div>
                            <div className="formulario__input">
                                <label htmlFor="descripcion">Descripción de tu incidencia:</label>
                                <textarea name="descripcion" id="descripcion" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>
                    
                </section>

                <section className="col-2">
                    <div className="h-100">
                        <img width="200" src="/assets/img/logo.png" alt="Logo" />

                        <div>
                            <input type="submit" value="Enviar" id="submit" />
                            <input type="reset" value="Vaciar" id="reset" />
                        </div>
                    </div>
                    
                </section>
            </form>
        </main>
    );
}