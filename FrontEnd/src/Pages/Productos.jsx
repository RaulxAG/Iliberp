import Producto from './Producto';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function Productos({ productos, setProductos, carrito, setCarrito, search, setSearch,categoriasSeleccionadas }) {
    const location = useLocation();
    const [productosFiltrados,setProductosFiltrados] = useState([])

    useEffect(() => {
        // Filtrar los productos 
        setProductosFiltrados(
            categoriasSeleccionadas.length > 0 ?
                // Filtrar por categorías seleccionadas
                productos.filter(producto =>
                    categoriasSeleccionadas.includes(producto.tipo) &&
                    ((producto.nombre).toLowerCase()).includes((search).toLowerCase())
                    
                )
                
            :
                // Si no hay categorías seleccionadas, filtrar solo por la búsqueda
                productos.filter(producto =>
                    ((producto.nombre).toLowerCase()).includes((search).toLowerCase())
                )
                
        )
    }, [search, categoriasSeleccionadas, productos]);

    //Cuandi recargamos recogemos el search de la url y aparece en el value del search
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get("search");
        setSearch(searchParam || "");
    }, [location.search]);
    
    
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/productos/')
            .then(response => response.json())
            .then(data => {
                setProductos(data);
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }, [setProductos]);

    // Si no hay busqueda, mostrar todos los productos
    const productList = search === "" ? productos : productosFiltrados;
    console.log("hi")
    
    return (
        <>
            {productList.map(producto => {
                return (
                    <Producto key={producto.id} producto={producto} carrito={carrito} setCarrito={setCarrito}></Producto>
                )
            })}
        </>
    )

}