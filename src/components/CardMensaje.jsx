

export default function CardMensaje() {
    return (
        <section className="chats__card box my-1 px-3 d-flex align-items-center justify-content-between">
            <img src="assets/img/usuario.png" alt="" />

            <div className="w-100 px-3 text-start">
                <h5 className="m-0">Nombre contacto</h5>
                <p className="mt-1">Lorem ipsum, dolor sit amet consectetur adipisicing . . .</p>
            </div>

            <p className="align-self-center fw-bold">20:42</p>
        </section>
    );
}