
export default function ProductosDestacados() {
    return (
        <div id="carouselExampleIndicators" className="destacados__carrusel carousel slide mt-5 h-75">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                <section className="carrusel__seccion d-flex align-items-center justify-content-evenly w-100 p-5">
                    <div className="h-100 p-5 ">PRODUCTO 1</div>
                    <div className="h-100 p-5 ">PRODUCTO 2</div>
                    <div className="h-100 p-5 ">PRODUCTO 3</div>
                    <div className="h-100 p-5 ">PRODUCTO 4</div>
                </section>
                </div>
                <div className="carousel-item">
                <section className="carrusel__seccion d-flex align-items-center justify-content-evenly w-100 p-5">
                    <div className="h-100 p-5 ">PRODUCTO 1</div>
                    <div className="h-100 p-5 ">PRODUCTO 2</div>
                    <div className="h-100 p-5 ">PRODUCTO 3</div>
                    <div className="h-100 p-5 ">PRODUCTO 4</div>
                </section>
                </div>
                <div className="carousel-item">
                <section className="carrusel__seccion d-flex align-items-center justify-content-evenly w-100 p-5">
                    <div className="h-100 p-5 ">PRODUCTO 1</div>
                    <div className="h-100 p-5 ">PRODUCTO 2</div>
                    <div className="h-100 p-5 ">PRODUCTO 3</div>
                    <div className="h-100 p-5 ">PRODUCTO 4</div>
                </section>
                </div>
            </div>
            
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}