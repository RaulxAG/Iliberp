import React, { useEffect, useState } from 'react';
import CardProductoDestacado from './CardProductoDestacado';

export default function ProductosDestacados() {
    const [productosDestacados, setProductosDestacados] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/getFeaturedProductsJSON/')
            .then(response => response.json())
            .then(data => {
                setProductosDestacados(data);
            })
            .catch(error => {
                console.error('Error al obtener productos destacados:', error);
            });
    }, []);

    // Agrupar los productos en conjuntos de tres
    const productosAgrupados = [];
    for (let i = 0; i < productosDestacados.length; i += 3) {
        productosAgrupados.push(productosDestacados.slice(i, i + 3));
    }

    return (
        <div id="carouselExampleIndicators" className="destacados__carrusel carousel slide mt-4 h-75">
            <div className="carousel-indicators">
                {productosAgrupados.map((grupo, index) => (
                    <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-label={`Slide ${index + 1}`}></button>
                ))}
            </div>
            <div className="carousel-inner">
                {productosAgrupados.map((grupo, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                        <section className="carrusel__seccion d-flex align-items-center justify-content-evenly">
                            {grupo.map(producto => (
                                <CardProductoDestacado key={producto.nombre} producto={producto} />
                            ))}
                        </section>
                    </div>
                ))}
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
