import Menu from "../components/Menu";
import ProductosDestacados from "../components/ProductosDestacados";
import ReportarIncidencia from "../components/ReportarIncidencia";
import Tiempo from "../components/Tiempo";
import Tickets from "../components/Tickets";
import UltimosMensajes from "../components/UltimosMensajes";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function Inicio() {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const username = await localStorage.getItem('username');
            const userId = await localStorage.getItem('user_id');
            const token = await localStorage.getItem('token');

            if (username && userId && token) {
                setUser({ username, userId, token });
            } else {
                console.error("Error: No se pudieron recuperar los datos del usuario del localStorage.");
            }
        };

        fetchUserData();
    }, []);

    return (
      <main className="containerPrincipal mainInicio">
        <Menu selected="inicio" username={user ? user.username : "Invitado"} />
        <section className="mainInicio__modulos contenedor ">
          <div className="modulos__grid h-100">

            <section className="modulos__destacados grid_mod1 box">
              <h4 className="tittle fs-5 fw-bold p-1">{t('destacados')}</h4>
              <ProductosDestacados />
            </section>
            <section className="modulos__chats grid_mod2 box">
              <h4 className="tittle fs-5 fw-bold p-1">{t('recientes')}</h4>
              <div className="chats__mensajes w-100 mt-3 px-2 overflow-y-scroll">
              {user ? <UltimosMensajes page={"inicio"} t={t} user_logued_id={user.userId} /> : 
                <div className="w-100 d-flex align-items-center justify-content-center">
                  <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
              </div>
            </section>
            <section className="modulos__incidencias grid_mod3 box">
              <h4 className="tittle fs-5 fw-bold p-1">{t('reportar')}</h4>
              <ReportarIncidencia t={t} />
            </section>
            <section className="modulos__tickets grid_mod4 box">
              <h4 className="tittle fs-5 fw-bold p-1">{t('tickets')}</h4>
              {user ? <Tickets t={t} user_logued_id={user.userId} /> : 
                <div className="w-100 d-flex align-items-center justify-content-center">
                  <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              }
            </section>
            <section className="modulos__tiempo grid_mod5 box d-flex align-items-center justify-content-center">
              <Tiempo />
            </section>
          </div>
          
        </section>
      </main>
    );
  }