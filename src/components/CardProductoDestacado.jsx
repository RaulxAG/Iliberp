
export default function CardProductoDestacado() {
    return (
        <div className="seccion__producto h-100 text-start p-3 d-flex flex-column align-items-center justify-content-between">
            
            <img className="producto__imagen mb-2" src="assets/img/headset.png" alt="Foto del producto" />

            <div className="producto__info">
                <h6 className="fw-bold">Astro A50</h6>
            </div>
            <div className="producto__acciones d-flex align-items-center justify-content-between w-100">
                <p className="fw-bold m-0">350,78€</p>
                <button type="button" className="btn py-1 px-4"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
        </div>
    );
}