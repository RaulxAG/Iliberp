import Menu from "../components/Menu";
import ProductosDestacados from "../components/ProductosDestacados";
import ReportarIncidencia from "../components/ReportarIncidencia";
import Tiempo from "../components/Tiempo";
import Tickets from "../components/Tickets";
import UltimosMensajes from "../components/UltimosMensajes";
import { useTranslation } from "react-i18next";

export default function Inicio() {
    const { t } = useTranslation();

    return (
      <main className="containerPrincipal mainInicio">
        <Menu selected="inicio"></Menu>
        <section className="mainInicio__modulos contenedor ">
          <div className="modulos__grid h-100">

            <section className="modulos__destacados grid_mod1 box">
              <h4 className="tittle fs-5 fw-bold p-1">{t('destacados')}</h4>
              <ProductosDestacados />
            </section>
            <section className="modulos__chats grid_mod2 box">
              <h4 className="tittle fs-5 fw-bold p-1">{t('recientes')}</h4>
              <div className="chats__mensajes w-100 mt-3 px-2 overflow-y-scroll">
                <UltimosMensajes page={"inicio"} t={t} />
              </div>
            </section>
            <section className="modulos__incidencias grid_mod3 box">
              <h4 className="tittle fs-5 fw-bold p-1">{t('reportar')}</h4>
              <ReportarIncidencia t={t} />
            </section>
            <section className="modulos__tickets grid_mod4 box">
              <h4 className="tittle fs-5 fw-bold p-1">{t('tickets')}</h4>
              <Tickets t={t} />
            </section>
            <section className="modulos__tiempo grid_mod5 box d-flex align-items-center justify-content-center">
              <Tiempo />
            </section>
          </div>
          
        </section>
      </main>
    );
  }