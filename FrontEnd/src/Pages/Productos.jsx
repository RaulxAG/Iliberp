import Producto from './Producto';
import { useState,useEffect } from 'react';

export default function Productos({productos, setProductos,carrito,setCarrito}){
    

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/productos/') // Reemplaza la URL con la correcta
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error('Error al obtener productos:', error));
    }, []);
    console.log(productos)
    return(
        <>
            {productos.map(producto =>{
                return(
                    <Producto producto={producto} key={producto.id} carrito={carrito} setCarrito={setCarrito}></Producto>   
                )
            })}
        </>
    )
    
}