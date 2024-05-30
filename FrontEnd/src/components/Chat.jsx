import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function Chat({ chat }) {
    const { register, handleSubmit } = useForm();
    const chatCuerpoRef = useRef(null);
    const navigate = useNavigate();
    const [mensajes, setMensajes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState();

    const obtenerPaginasTotales = async (chat) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/getMessagesJSON/${chat}/?page=0`, {
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
            setMensajes(responseData.messages);
            setPage(responseData.pages.current_page);
            setTotalPages(responseData.pages.total_pages);
        } catch (error) { 
            console.error('Error:', error);
        }
    };

    const obtenerMensajes = async (chat, pageNumber) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/getMessagesJSON/${chat}/?page=${pageNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            // Verificar si algún mensaje ya contiene el mensaje_id
            const mensajesNoDuplicados = responseData.messages.filter(nuevoMensaje => !mensajes.some(mensaje => mensaje.mensaje_id === nuevoMensaje.mensaje_id));

            // Actualizar el estado solo con los mensajes no duplicados
            // setMensajes(prevMensajes => [...prevMensajes, ...mensajesNoDuplicados]);
            setMensajes(prevMensajes => ({
                ...prevMensajes,
                [pageNumber]: mensajesNoDuplicados
            }));
            
            setPage(responseData.pages.current_page);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (chat) {
            obtenerPaginasTotales(chat);
        }
    }, [chat]);

    const cargarPaginaAnterior = async () => {
        if (page > 0) {
            const previousPage = page - 1;
            await obtenerMensajes(chat, previousPage);
        }
    };

    const onSubmit = async data => {
        try {
            const response = await fetch('http://127.0.0.1:8000/setMessageJSON/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                navigate(0);
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            alert('Hubo un error al enviar el mensaje');
        }
    };

    useEffect(() => {
        // Desplazar al final del chatCuerpoRef cuando los mensajes cambian
        if (chatCuerpoRef.current) {
            chatCuerpoRef.current.scrollTop = chatCuerpoRef.current.scrollHeight;
        }
    }, [mensajes]);

    // Función para formatear la fecha y la hora
    const formatTime = hora => {
        const date = new Date('2000-01-01T' + hora); // Establece una fecha fija para extraer la hora
        const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        return formattedTime;
    };

    return (
        <section className="mainMensajeria__chat d-flex flex-column align-items-center justify-content-between col-8 ms-3 shadow-sm">
            <header className="chat__cabecera w-100 py-2 px-4 d-flex align-items-center justify-content-between">
                {mensajes.length > 0 && (
                    <figure className="d-flex align-items-center gap-3 mt-2">
                        <img src="../assets/img/usuario.png" width={34} alt="Foto de perfil del contacto" />
                        <h5 className="p-0 m-0">Nombre contacto</h5>
                    </figure>
                )}
                
                <figure className="cabecera__logo m-0 d-flex align-items-md-center justify-content-center">
                    <img src="/assets/img/logo.png" alt="Logo" />
                    <article className="d-none d-lg-block">
                        <p className="fs-3 m-0 fw-bold">ILIBERP</p>
                        <p className="m-0">Solutions</p>
                    </article>
                </figure>
            </header>
            <button onClick={cargarPaginaAnterior} className="btn btn-primary mb-3">Cargar página anterior</button>
            <section ref={chatCuerpoRef} className="chat__cuerpo w-100 h-100 overflow-scroll">
                {mensajes.length == 0 && (
                    <h5 className="d-flex h-100 align-items-center justify-content-center">Selecciona un Chat para ver los mensajes o inicia uno nuevo.</h5>
                )}
                {console.log(mensajes)}

                {Object.values(mensajes).map((mensaje, index) => (
                    Array.isArray(mensaje) ? (
                        mensaje.map((mensajeIndividual, innerIndex) => (
                            <article key={innerIndex} className={`shadow-sm w-75 py-3 px-3 my-3 mx-2 ${mensajeIndividual.usuario === 2 ? 'enviado' : 'recibido'}`}>
                                <p>{mensajeIndividual.texto}</p>
                                <p className="m-0 text-end">{formatTime(mensajeIndividual.hora)}</p>
                            </article>
                        ))
                    ) : (
                        <article key={index} className={`shadow-sm w-75 py-3 px-3 my-3 mx-2 ${mensaje.usuario === 2 ? 'enviado' : 'recibido'}`}>
                            <p>{mensaje.texto}</p>
                            <p className="m-0 text-end">{formatTime(mensaje.hora)}</p>
                        </article>
                    )
                ))}
            </section>
            <footer className="chat__acciones w-100">
                {mensajes.length > 0 && (
                    <form onSubmit={handleSubmit(onSubmit)} method="post" className="shadow-lg">
                        <button type="button" className="btn fs-3"><i className="fa-solid fa-paperclip"></i></button>

                        <input type="text" name="mensaje" id="mensaje" placeholder="Escribe un mensaje" className="box py-3 px-3" {...register('mensaje', { required: true, autoComplete: 'off', spellCheck: false})} />
                        <input type="number" name="chat_id" id="chat_id" className="d-none" value={mensajes.length > 0 ? mensajes[0].chat : ''} {...register('chat_id', { required: true})} />
                        <input type="number" name="user_id" id="user_id" className="d-none" value={2} {...register('user_id', { required: true})} />

                        <button type="submit" className="btn fs-3"><i className="fa-solid fa-paper-plane"></i></button>
                    </form>
                )}
            </footer>
        </section>
    );
}
