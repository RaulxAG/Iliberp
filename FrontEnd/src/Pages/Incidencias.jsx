import Menu from "../components/Menu";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

// contenedor mainIncidencias 
// contenedor
export default function Incidencias() {
    const { t } = useTranslation();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const initialCategoria = searchParams.get('categoria') || '';
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

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            categoria: initialCategoria
        }
    });

    const onSubmit = data => {
    
        fetch('https://iliberp.work.gd/empleados/setIncidentJSON/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: data.client_id,
                categoria: data.categoria,
                descripcion: data.descripcion,
                observaciones: data.observaciones
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            alert('Se ha registrado tu incidencia de manera exitosa');
            window.location.href = '/inicio';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };    

    useEffect(() => {
        const newCategoria = searchParams.get('categoria') || '';
        setValue('categoria', newCategoria);
    }, [location, setValue, searchParams]);

    if (!user) {
        return <div>Cargando...</div>; // O cualquier otro indicador de carga
    }

    return (
        <main className="containerPrincipal mainIncidencias">
            <Menu selected="incidencias" username={user ? user.username : "Invitado"} />
            <form onSubmit={handleSubmit(onSubmit)} method="post" className="mainIncidencias__formulario contenedor flex-row">
                <section className="box col-9">
                    <h4 className="tittle fs-3 mb-5">{t('reportarInc')}</h4>

                    <input type="text" name="cliente" value={user.userId} hidden id="cliente" {...register("client_id", { required: true })}/>

                    <div className="px-5"> 
                        <div className="formulario__input">
                            <label htmlFor="descripcion">{t('motivo')}</label>
                            <input type="text" name="descripcion" id="descripcion" {...register("descripcion", { required: true })}/>
                            {errors.descripcion && <span className="text-warning">{t('errorMotivo')}</span>}
                        </div>
                        <div className="formulario__inputGroup">
                            <div className="formulario__input">
                                <label htmlFor="categoria">{t('categoria')}</label>
                                <select name="categoria" id="categoria" {...register("categoria", { required: true })}>
                                    <option value="Ciberseguridad">{t('ciberseguridad')}</option>
                                    <option value="Programacion">{t('programacion')}</option>
                                    <option value="Telefonía">{t('telefonia')}</option>
                                    <option value="Sistemas">{t('sistemas')}</option>
                                    <option value="Taller">{t('taller')}</option>
                                    <option value="Web">{t('web')}</option>
                                </select>
                                {errors.categoria && <span className="text-warning">{t('errorCategoria')}</span>}
                            </div>
                        </div>
                        <div className="formulario__input">
                            <label htmlFor="observaciones">{t('descripcionInc')}</label>
                            <textarea name="observaciones" id="observaciones" cols="30" rows="5" {...register("observaciones")}></textarea>
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

                    <div className="acciones__botones">
                        <input type="submit" value={t('textoEnviar')} id="submit" />
                        <input type="reset" value={t('textoVaciar')} id="reset" />
                    </div>
                </section>
            </form>
        </main>
    );
}
