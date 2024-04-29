import Menu from "../components/Menu";
import CardMensaje from "../components/CardMensaje";
import ProductosDestacados from "../components/ProductosDestacados";
import ReportarIncidencia from "../components/ReportarIncidencia";
import WeatherComponent from "../components/Tiempo";

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
                <CardMensaje />
                <CardMensaje />
                <CardMensaje />
                <CardMensaje />
              </div>
            </section>
            <section className="modulos__incidencias grid_mod3 box">
              <h4 className="tittle fs-5 fw-bold p-1">Reportar Incidencia</h4>
              <ReportarIncidencia />
            </section>
            <section className="grid_mod4 box">
              <h4 className="tittle fs-5 fw-bold p-1">Tickets en Curso</h4>
            </section>
            <section className="grid_mod5 box">
              <WeatherComponent />
            </section>
          </div>
          
        </section>
      </main>
    );
  }