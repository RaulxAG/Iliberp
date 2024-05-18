import CardProductoDestacado from "./CardProductoDestacado";

export default function ProductosDestacados() {
    return (
        <div id="carouselExampleIndicators" className="destacados__carrusel carousel slide mt-4 h-75">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <section className="carrusel__seccion d-flex align-items-center justify-content-evenly py-2">
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                    </section>
                </div>
                <div className="carousel-item">
                    <section className="carrusel__seccion d-flex align-items-center justify-content-evenly py-2">
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                    </section>
                </div>
                <div className="carousel-item">
                    <section className="carrusel__seccion d-flex align-items-center justify-content-evenly py-2">
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                    </section>
                </div>
                <div className="carousel-item">
                    <section className="carrusel__seccion d-flex align-items-center justify-content-between py-2">
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                        <CardProductoDestacado></CardProductoDestacado>
                    </section>
                </div>
            </div>
            
            <button className="carousel-control-prev carrusel__control" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="fs-1" aria-hidden="true"><i className="fa-solid fa-chevron-left"></i></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next carrusel__control" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="fs-1" aria-hidden="true"><i className="fa-solid fa-chevron-right"></i></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}