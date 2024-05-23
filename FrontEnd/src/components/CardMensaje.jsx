

export default function CardMensaje({ mensaje }) {
    const formatearHora = (hora) => {
        const [hh, mm] = hora.split(':');
        return `${hh}:${mm}`;
    };

    return (
        <section className="chats__card box my-1 px-3 d-flex align-items-center justify-content-between">
            <img src="assets/img/usuario.png" alt="" />

            <div className="w-100 px-3 text-start">
                <h5 className="m-0">{mensaje.chat_id}</h5>
                <p className="mt-1">{mensaje.texto}</p>
            </div>

            <p className="align-self-center fw-bold">{formatearHora(mensaje.hora)}</p>
        </section>
    );
}