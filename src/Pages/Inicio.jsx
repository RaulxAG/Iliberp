import Menu from "../components/Menu";
import CardMensaje from "../components/CardMensaje";
import ProductosDestacados from "../components/ProductosDestacados";

export default function Inicio() {
    return (
      <main className="containerPrincipal mainInicio">
        <Menu selected="inicio"></Menu>
        <section className="mainInicio__modulos contenedor ">
          <div className="modulos__grid h-100">

            <section className="modulos__destacados grid_mod1 box">
              <h4 className="tittle fs-5 fw-bold p-1">Productos Destacados</h4>
              <ProductosDestacados></ProductosDestacados>
            </section>
            <section className="modulos__chats grid_mod2 box">
              <h4 className="tittle fs-5 fw-bold p-1">Mensajes Recientes</h4>
              <div className="chats__mensajes w-100 mt-5 px-2">
                <CardMensaje></CardMensaje>
                <CardMensaje></CardMensaje>
                <CardMensaje></CardMensaje>
                <CardMensaje></CardMensaje>
              </div>
            </section>
            <section className="modulos__incidencias grid_mod3 box">
              <h4 className="tittle fs-5 fw-bold p-1">Reportar Incidencia</h4>
              <div className="incidencias__botones w-100 mt-3 h-75 d-flex align-items-center justify-content-center flex-wrap gap-4">
                <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                  <i className="fa-solid fa-computer"></i>
                  <p className="m-0 pt-2">Sistemas</p>
                </button>
                <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                  <i className="fa-solid fa-globe"></i>
                  <p className="m-0 pt-2">Web</p>
                </button>
                <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                  <i className="fa-solid fa-tower-cell"></i>
                  <p className="m-0 pt-2">Telefonía</p>
                </button>
                <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                  <i className="fa-solid fa-shield-virus"></i>
                  <p className="m-0 pt-2">Ciberseguridad</p>
                </button>
                <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                  <i className="fa-solid fa-screwdriver-wrench"></i>
                  <p className="m-0 pt-2">Mantenimiento</p>
                </button>
                <button className="botones__boton btn d-flex flex-column align-items-center justify-content-center">
                  <i className="fa-solid fa-laptop-code"></i>
                  <p className="m-0 pt-2">Progromación</p>
                </button>
              </div>
            </section>
            <section className="grid_mod4 box">
              <h4 className="tittle fs-5 fw-bold p-1">Tickets en Curso</h4>
            </section>
            <section className="grid_mod5 box">
              
            </section>
          </div>
          
        </section>
      </main>
    );
  }