import { useNavigate } from 'react-router-dom';

export default function CardMensaje({ mensaje, page, selected, query }) {
    const navigate = useNavigate();

    const formatearHora = (hora) => {
        const [hh, mm] = hora.split(':');
        return `${hh}:${mm}`;
    };

    const handleClick = (chat_seleccionado) => {
        if (page == "mensajeria") {
            navigate(`/clientes/mensajeria/${chat_seleccionado}`);
        } else if (page == "inicio") {
            navigate(`/clientes/mensajeria/${mensaje.chat_id}`);
        }
    };

    if (query && !mensaje.usuarios[0].nombre.toLowerCase().includes(query.toLowerCase())) {
        return null;
    }

    return (
        <section 
            onClick={() => handleClick(mensaje.chat_id)} 
            className={`chats__card box my-1 px-3 d-flex align-items-center justify-content-between ${selected == mensaje.chat_id ? 'selected' : ''}`}>
            <img src="../assets/img/usuario.png" alt="" />

            <div className="w-100 px-3 text-start">
                <h5 className="m-0">{mensaje.usuarios[0].nombre}</h5>
                <p className="mt-1">{mensaje.ultimo_remitente.id === 2 ? 'Yo: ' : '' } {mensaje.texto.substring(0,30)}...</p>
            </div>

            <p className="align-self-center fw-bold">{formatearHora(mensaje.hora)}</p>
        </section>
    );
}