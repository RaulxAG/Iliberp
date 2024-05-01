import Producto from './Producto';
import { useState,useEffect } from 'react';

export default function Productos({productos, setProductos,carrito,setCarrito}){
    

    useEffect(() => {
        fetch('http://localhost:3000/productos') // Reemplaza la URL con la correcta
            .then(response => response.json())
            .then(data => setProductos(data))
            .catch(error => console.error('Error al obtener productos:', error));
    }, []);

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