import laptopImg from '/assets/img/laptop.png';
import { useState } from 'react';

export default function Producto({producto, carrito, setCarrito}){
    const [comprado, setComprado] = useState(false);
    const especificaciones = Object.entries(producto.especificaciones); //Para uqe nos devuelva un array de clave-valor

    const addCarrito = () => {
        // Actualizar el estado de comprado antes de agregar el producto al carrito
        setComprado(true);

        // Crear una copia del carrito
        const nuevoCarrito = [...carrito];

        // Buscar si el producto ya está en el carrito
        const index = nuevoCarrito.findIndex(item => item.id === producto.id);

        if (index !== -1) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            nuevoCarrito[index].cantidad += 1;
        } else {
            // Si el producto no está en el carrito, agregarlo con cantidad 1
            nuevoCarrito.push({ 
                id: producto.id, 
                cantidad: 1,
                nombre: producto.nombre,
                precio: producto.precio,
                foto: producto.foto
            });
        }

        // Actualizar el estado del carrito
        setCarrito(nuevoCarrito);
    }
    console.log(carrito)
    
    return(
        <div className="productos__producto box">
            <div data-bs-toggle="modal" data-bs-target="#modalDetalle" className='d-flex flex-column abrirModalDetalle'>
                <img src={laptopImg} alt="laptop" />
                <h4 className='mt-2 pb-2 border-bottom'> {producto.nombre} </h4>
            </div>
            <p className='producto__descripcion text-center'> {producto.descripcion} </p>
            <div className="producto__precio">
                <p>{producto.precio_descuento}€</p>
                <div onClick={addCarrito}>
                    { comprado 
                        ? 
                            <div>
                                <i className="fa-solid fa-plus"></i>
                            </div>
                        : 
                            <section>
                                <i className="fa-solid fa-cart-shopping" style={{color:"#f8f8f8"}}></i>
                            </section>
                    }
                </div>
            </div>
             {/* MODAL DETALLE DE PRODUCTO */}
             <div className="modal modalDetalle fade" id="modalDetalle" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">{producto.nombre}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column">
                            <img src={laptopImg} alt="laptop" className='mx-auto p-3'/>
                            <p className='border-bottom pb-3'>{producto.descripcion}</p>
                            <h3>Especificaciones</h3>
                            <ul>
                                {especificaciones.map(([clave, valor]) => (
                                    <li key={clave}><strong>{clave}:</strong> {valor}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
