import laptopImg from '/assets/img/laptop.png';
import { useState } from 'react';

export default function Producto({producto, carrito, setCarrito}){
    const [comprado, setComprado] = useState(false);

    const addCarrito = () =>{
        // Actualizar el estado de comprado antes de agregar el producto al carrito
        setComprado(!comprado);
    
        // Coger el carrito actual y añadirle el nuevo producto
        const nuevoCarrito = [...carrito, producto];

        // Actualizar el estado del carrito
        setCarrito(nuevoCarrito);
        console.log(comprado)
    }

    return(
        <div className="productos__producto box">
            <div data-bs-toggle="modal" data-bs-target="#modalDetalle" className='d-flex flex-column abrirModalDetalle'>
                <img src={laptopImg} alt="laptop" />
                <h4 className='mt-2 pb-2 border-bottom'> {producto.nombre} </h4>
            </div>
            <p className='producto__descripcion text-center'> {producto.descripcion} </p>
            <div className="producto__precio">
                <p>{producto.precio}€</p>
                <div onClick={addCarrito}>
                    { comprado 
                        ? 
                            <section>
                                <i className="fa-solid fa-cart-shopping" style={{color:"#f8f8f8"}}></i>
                            </section>
                        : 
                            <div>
                                <i className="fa-solid fa-plus"></i>
                            </div>
                    }
                </div>
            </div>
             {/* MODAL DETALLE DE PRODUCTO */}
             <div className="modal modalDetalle fade" id="modalDetalle" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                <li>Socket: LGA 1200</li> 
                                <li>Formato: ATX</li>
                                <li>Chipset: Intel B460</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
