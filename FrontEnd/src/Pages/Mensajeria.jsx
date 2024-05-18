import Menu from "../components/Menu";
import CardMensaje from "../components/CardMensaje";
import Chat from "../components/Chat";

export default function Mensajeria() {
    return (
        <main className="containerPrincipal mainMensajeria">
            <Menu selected="mensajeria"></Menu>
            <section className="contenedor flex-row box">

                <section className="mainMensajeria__contactos col-4 overflow-hidden">
                    <form action="#" method="post" className="contactos__head p-2 d-flex flex-column align-items-center">
                        <div className="w-100 d-flex align-items-center justify-content-between">
                            <h4 className="m-0">Chats</h4>
                            
                            <section className="contactos__head__acciones">
                                <button type="button" className="btn"><i className="fa-solid fa-pen-to-square"></i></button>
                                <button type="button" className="btn"><i className="fa-solid fa-filter"></i></button>
                            </section>
                        </div>

                        <input type="search" name="busqueda" id="busqueda" placeholder="Buscar . . ." className="w-100 py-1 px-3 mt-3 box p-0 shadow"  />
                    </form>

                    <div className="contactos__chats w-100 mt-3 px-2 overflow-scroll">
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>
                            <CardMensaje></CardMensaje>

                        </div>
                </section>
                
                <Chat></Chat>
            </section>
        </main>
    );
}