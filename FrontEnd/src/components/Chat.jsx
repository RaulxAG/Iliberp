import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

export default function Chat({ chat, t, user_logued_id }) {
    const { register, handleSubmit } = useForm();
    const chatCuerpoRef = useRef(null);
    const navigate = useNavigate();
    const [mensajes, setMensajes] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState();
    const [participants, setParticipants] = useState();

    const obtenerPaginasTotales = async (chat, user_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/getMessagesJSON/${chat}/?user=${user_id}&page=0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            setParticipants(responseData.participants);
            setMensajes(responseData.messages);
            setPage(responseData.pages.total_pages);
            setTotalPages(responseData.pages.total_pages);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const obtenerMensajes = async (chat, user_id, pageNumber) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/getMessagesJSON/${chat}/?user=${user_id}&page=${pageNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();

            // Guardar la posición actual del scroll
            const scrollTop = chatCuerpoRef.current.scrollTop;
            const scrollHeight = chatCuerpoRef.current.scrollHeight;

            // Actualizar el estado agregando nuevos mensajes al principio del array
            setMensajes((prevMensajes) => [...responseData.messages, ...prevMensajes]);

            // Calcular la nueva posición del scroll para mantenerlo en el mismo lugar
            setTimeout(() => {
                chatCuerpoRef.current.scrollTop = scrollTop + (chatCuerpoRef.current.scrollHeight - scrollHeight);
            }, 0);

            setPage(responseData.pages.current_page);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (chat) {
            obtenerPaginasTotales(chat, user_logued_id);
        }
    }, [chat]);

    const cargarPaginaAnterior = async () => {
        if (page > 0) {
            const previousPage = page - 1;
            await obtenerMensajes(chat, user_logued_id, previousPage);
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('user_id', data.user_id);
            formData.append('chat_id', data.chat_id);
            formData.append('mensaje', data.mensaje);
            if (data.fichero.length > 0) {
                formData.append('fichero', data.fichero[0]);
            }

            const response = await fetch('http://127.0.0.1:8000/setMessageJSON/', {
                method: 'POST',
                body: formData
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
        // Desplazar al final del chatCuerpoRef cuando los mensajes cambian solo si no se están cargando mensajes anteriores
        if (chatCuerpoRef.current && page === totalPages) {
            chatCuerpoRef.current.scrollTop = chatCuerpoRef.current.scrollHeight;
        }
    }, [mensajes, page]);

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
                        <h5 className="p-0 m-0">{participants[0].nombre}</h5>
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
            <section ref={chatCuerpoRef} className="chat__cuerpo w-100 h-100 overflow-y-scroll overflow-x-hidden">
                {mensajes.length === 0 && (
                    <h5 className="d-flex h-100 align-items-center justify-content-center">{t('info')}</h5>
                )}

                {mensajes.length > 0 && page > 1 && (
                    <button onClick={cargarPaginaAnterior} className="btn btn-primary mb-3">{t('anterior')}</button>
                )}

                {mensajes.map((mensaje, index) => (
                    <article key={index} className={`shadow-sm w-50 py-3 px-3 my-3 mx-2 ${mensaje.usuario == user_logued_id ? 'enviado' : 'recibido'}`}>
                        {mensaje.fichero && (
                            mensaje.fichero.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                <img src={`http://127.0.0.1:8000${mensaje.fichero}`} alt="fichero" className='w-100 mb-3' />
                            ) : (
                                <a href={`http://127.0.0.1:8000${mensaje.fichero}`} className='text-white mb-3' target="_blank" rel="noopener noreferrer">
                                    {mensaje.fichero.split('/').pop()} <i className="fa-solid fa-download"></i>
                                </a>
                            )
                        )}
                        {mensaje.texto && (<p>{mensaje.texto}</p>)}
                        <p className="m-0 text-end">{formatTime(mensaje.hora)}</p>
                    </article>
                ))}
            </section>
            <footer className="chat__acciones w-100">
                {mensajes.length > 0 && (
                    <form onSubmit={handleSubmit(onSubmit)} method="post" className="shadow-lg">
                        {/* <button type="button" className="btn fs-3"><i className="fa-solid fa-paperclip"></i><input type="file" name="file" id="file" class="d-none" /></button> */}

                        <label htmlFor="fichero" className="btn fs-3">
                            <i className="fa-solid fa-paperclip"></i>
                            <input type="file" name="fichero" id="fichero" className="d-none" {...register('fichero')}/>
                        </label>

                        <input type="text" name="mensaje" id="mensaje" placeholder={t('escribeMensaje')} autoComplete='off' className="box py-3 px-3" {...register('mensaje', { required: true, autoComplete: 'off' })} />
                        <input type="number" name="chat_id" id="chat_id" className="d-none" value={mensajes.length > 0 ? mensajes[0].chat : ''} {...register('chat_id', { required: true })} />
                        <input type="number" name="user_id" id="user_id" className="d-none" value={user_logued_id} {...register('user_id', { required: true })} />

                        <button type="submit" className="btn fs-3"><i className="fa-solid fa-paper-plane"></i></button>
                    </form>
                )}
            </footer>
        </section>
    );
}
