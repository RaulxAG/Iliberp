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
            <img src={laptopImg} alt="laptop" />
            <h4> {producto.nombre} </h4>
            <p className='producto__descripcion'> {producto.descripcion} </p>
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
        </div>
    )
}
