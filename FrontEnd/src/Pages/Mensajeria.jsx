import Menu from "../components/Menu";
import Chat from "../components/Chat";
import UltimosMensajes from "../components/UltimosMensajes";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "../../utils/utilidades";
import { useTranslation } from "react-i18next";

export default function Mensajeria() {
    const { t } = useTranslation();
    const { chat_id } = useParams();
    const [contactos, setContactos] = useState();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const query=useQuery();
    const sBusqueda=query.get("search");
    const [search, setSearch] = useState("");
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
    
    useEffect( () => {
        setSearch(sBusqueda || '' )
    },[sBusqueda])

    const handleChange=(e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearch(value)
        navigate("/clientes/mensajeria/?search=" + value);
    }

    const onSubmit = data => {

        fetch('https://iliberp.work.gd/empleados/setChatJSON/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user1: data.user1_id,
                user2: data.user2_id
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            navigate(`/clientes/mensajeria/${responseData.chat_id}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const obtenerContactos = async () => {
        try {
            const response = await fetch(`https://iliberp.work.gd/empleados/getEmployeesJSON/`, {
                method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();

                // Actualizar el estado con los datos recibidos
                setContactos(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        obtenerContactos();
    }, []);

    if (!user) {
        return <div>Cargando...</div>; // O cualquier otro indicador de carga
    }

    return (
        <main className="containerPrincipal mainMensajeria">
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content bg-dark">
                    <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{t('iniciar')}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                            <input type="number" name="user1_id" id="user1_id" className="d-none" hidden value={user.userId} {...register("user1_id",  { required: true })}/>
                            
                            <select name="user2_id" id="user2_id" className="form-select bg-dark text-white fs-4" aria-label="Selecciona un contacto" {...register("user2_id",  { required: true })}>
                                {contactos && contactos.map((contacto) => (
                                    <option key={contacto.id} value={contacto.id}>
                                        {contacto.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.user2_id && <span className="text-warning">{t('contacto')}</span>}
                    </div>
                    <div className="modal-footer">
                        <input type="submit" className="btn btn-outline-danger text-white" value={t('seleccionar')} />
                    </div>
                    </form>
                    </div>
            </div>
            </div>

            <Menu selected="mensajeria" username={user.username} />
            <section className="contenedor flex-row box">

                <section className="mainMensajeria__contactos col-4 overflow-hidden">
                    <form action="#" method="post" className="contactos__head p-2 d-flex flex-column align-items-center">
                        <div className="w-100 d-flex align-items-center justify-content-between">
                            <h4 className="m-0">Chats</h4>
                            
                            <section className="contactos__head__acciones">
                                <button title="Nuevo chat" type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-pen-to-square"></i></button>
                                {/* <button title="Filtrar" type="button" className="btn"><i className="fa-solid fa-filter" data-bs-toggle="dropdown" aria-expanded="false"></i></button> */}
                                {/* <div className="dropdown"> */}
                                    <button className="btn" title="Filtrar" type="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-filter"></i></button>

                                    <ul className="dropdown-menu text-danger">
                                        <button className="dropdown-item fs-5">A-Z</button>
                                        <button className="dropdown-item fs-5">Z-A</button>
                                        <button className="dropdown-item fs-5">{t('filtroRecientes')}</button>
                                        <button className="dropdown-item fs-5">{t('filtroAntiguos')}</button>
                                    </ul>
                                {/* </div> */}
                            </section>
                        </div>

                        <input type="search" name="busqueda" id="busqueda" autoComplete="off" placeholder={t('buscar')} className="w-100 py-1 px-3 mt-3 box p-0 shadow" value={search} onChange={handleChange} />
                    </form>

                    <div className="contactos__chats w-100 mt-3 px-2 overflow-scroll">
                        {chat_id && (
                            <UltimosMensajes page={"mensajeria"} selected={chat_id} query={search} t={t} user_logued_id={user.userId} />
                        )}

                        {!chat_id && (
                            <UltimosMensajes page={"mensajeria"} selected={false} query={search} t={t} user_logued_id={user.userId} />
                        )}
                        
                    </div>
                </section>
                
                {chat_id && (
                    <Chat chat={chat_id} t={t} user_logued_id={user.userId} />
                )}
                {!chat_id && (
                    <Chat chat={null} t={t} user_logued_id={user.userId} />
                )}
            </section>
        </main>
    );
}