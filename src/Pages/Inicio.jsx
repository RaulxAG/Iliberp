import Menu from "../components/Menu";

export default function Inicio() {
    return (
      <main className="containerPrincipal mainInicio">
        <Menu selected="inicio"></Menu>
        <section className="mainInicio__modulos contenedor ">
          <div className="modulos__grid h-100">
            <section className="grid_mod1 box">1</section>
            <section className="grid_mod2 box">2</section>
            <section className="grid_mod3 box">3</section>
            <section className="grid_mod4 box">4</section>
            <section className="grid_mod5 box">5</section>
          </div>
          
        </section>
      </main>
    );
  }