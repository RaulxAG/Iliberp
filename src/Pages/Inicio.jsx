import Menu from "../components/Menu";

export default function Inicio() {
    return (
      <main className="containerPrincipal mainInicio">
        <Menu selected="inicio"></Menu>
        <section className="mainInicio__modulos contenedor ">
          <div className="modulos__grid h-100">
            <section className="grid_mod1 box">
              <h4 class="tittle fs-5 p-1">Productos Destacados</h4>
            </section>
            <section className="grid_mod2 box">
              <h4 class="tittle fs-5 p-1">Mensajes Recientes</h4>
            </section>
            <section className="grid_mod3 box">
              <h4 class="tittle fs-5 p-1">Reportar Incidencia</h4>
            </section>
            <section className="grid_mod4 box">
              <h4 class="tittle fs-5 p-1">Tickets en Curso</h4>
            </section>
            <section className="grid_mod5 box">
              
            </section>
          </div>
          
        </section>
      </main>
    );
  }