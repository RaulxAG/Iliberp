import laptopImg from '/assets/img/laptop.png';
import { useState } from 'react';

export default function Producto({producto, carrito, setCarrito}){
    const [comprado, setComprado] = useState(false);
    console.log(comprado)

    const addCarrito = () =>{
        //Coger el carrito actual y añadirle el nuevo producto
        const nuevoCarrito = [...carrito, producto];

        //Actualizar el estado del carrito
        setCarrito(nuevoCarrito)

        setComprado(true)
    }

    return(
        <div className="productos__producto box">
            <img src={laptopImg} alt="laptop" />
            <h4> {producto.nombre} </h4>
            <p className='producto__descripcion'> {producto.descripcion} </p>
            <div className="producto__precio">
                <p>{producto.precio}€</p>
                <div onClick={()=>addCarrito()}>
                    {comprado ? 
                                <i className="fa-solid fa-cart-shopping" style={{color: "red"}}></i> 
                                :
                                <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                    }
                     
                </div>
            </div>
        </div>
    )
    
}