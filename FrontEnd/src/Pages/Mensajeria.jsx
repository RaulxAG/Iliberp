import Menu from "../components/Menu";
import Chat from "../components/Chat";
import UltimosMensajes from "../components/UltimosMensajes";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "../../utils/utilidades";

export default function Mensajeria() {
    const { chat_id } = useParams();
    const [contactos, setContactos] = useState();
    const navigate = useNavigate();
    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm();
    const query=useQuery();
    const sBusqueda=query.get("search");
    const [search, setSearch] = useState("");
    
    useEffect( () => {
        setSearch(sBusqueda || '' )
    },[sBusqueda])

    const handleChange=(e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearch(value)
        navigate("/mensajeria/?search=" + value);
    }

    const onSubmit = data => {

        fetch('http://127.0.0.1:8000/setChatJSON/', {
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
            console.log('Success:', responseData);
            
            navigate(`/mensajeria/${responseData.chat_id}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const obtenerContactos = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/getEmployeesJSON/`, {
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

    return (
        <main className="containerPrincipal mainMensajeria">
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content bg-dark">
                    <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Iniciar chat</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                            <input type="number" name="user1_id" id="user1_id" className="d-none" hidden value={2} {...register("user1_id",  { required: true })}/>
                            
                            <select name="user2_id" id="user2_id" className="form-select bg-dark text-white fs-4" aria-label="Selecciona un contacto" {...register("user2_id",  { required: true })}>
                                {contactos && contactos.map((contacto) => (
                                    <option key={contacto.id} value={contacto.id}>
                                        {contacto.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.user2_id && <span className="text-warning">Seleccione un contacto</span>}
                    </div>
                    <div className="modal-footer">
                        <input type="submit" className="btn btn-outline-danger text-white" value="Seleccionar" />
                    </div>
                    </form>
                    </div>
            </div>
            </div>

            <Menu selected="mensajeria"></Menu>
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
                                        <button className="dropdown-item fs-5">Recientes</button>
                                        <button className="dropdown-item fs-5">Antiguos</button>
                                    </ul>
                                {/* </div> */}
                            </section>
                        </div>

                        <input type="search" name="busqueda" id="busqueda" autoComplete="off" placeholder="Buscar . . ." className="w-100 py-1 px-3 mt-3 box p-0 shadow" value={search} onChange={handleChange} />
                    </form>

                    <div className="contactos__chats w-100 mt-3 px-2 overflow-scroll">
                        {chat_id && (
                            <UltimosMensajes page={"mensajeria"} selected={chat_id} query={search}/>
                        )}

                        {!chat_id && (
                            <UltimosMensajes page={"mensajeria"} selected={false} query={search}/>
                        )}
                        
                    </div>
                </section>
                
                {chat_id && (
                    <Chat chat={chat_id}/>
                )}
                {!chat_id && (
                    <Chat chat={null}/>
                )}
            </section>
        </main>
    );
}