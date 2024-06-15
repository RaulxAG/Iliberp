import React from 'react';
import { Link } from 'react-router-dom';

export default function CardProductoDestacado({ producto }) {
    return (
        <div className="seccion__producto text-start p-3 d-flex flex-column align-items-center justify-content-between">
            <img className="producto__imagen mb-1" src={producto.foto} alt="Foto del producto" />
            <div className="producto__info d-none d-lg-block">
                <h6 className="fw-bold">{producto.nombre}</h6>
            </div>
            <div className="producto__acciones d-flex align-items-center justify-content-between w-100">
                <p className="fw-bold m-0">{producto.precio} €</p>
                <Link to="/tienda" className="btn px-3">
                    <button type="button" className="btn px-3"><i className="fa-solid fa-cart-shopping"></i></button>
                </Link>
                
            </div>
        </div>
    );
}
