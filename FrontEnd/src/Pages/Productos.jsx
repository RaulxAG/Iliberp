import Producto from './Producto';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function Productos({ productos, setProductos, carrito, setCarrito, search, setSearch, categoria, setCategoria,precioMax, precioMin }) {
    const location = useLocation();
    const [productosFiltradosCategoria, setProductosFiltradosCategoria] = useState([]);
    const [productosFiltradosBusqueda, setProductosFiltradosBusqueda] = useState([]);
    const [productosFiltradosPrecio, setProductosFiltradosPrecio] = useState([]);

    // Cuando cambia la URL, actualizamos el valor de búsqueda
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get("search");
        setSearch(searchParam || "");
    }, [location.search, setSearch]);
    
    // Llamada inicial para obtener todos los productos
    useEffect(() => {
        fetch('http://localhost:8000/getProductsJSON/')
            .then(response => response.json())
            .then(data => {
                setProductos(data.products);
                setProductosFiltradosCategoria(data.products); // Inicializar con todos los productos
                setProductosFiltradosBusqueda(data.products); // Inicializar con todos los productos
                setProductosFiltradosPrecio(data.products); // Inicializar con todos los productos
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }, [setProductos]);

    // Llamada para obtener productos por categoría
    useEffect(() => {
        if (categoria) {
            fetch(`http://localhost:8000/getCategorizedProductsJSON/?category=${categoria}`)
                .then(response => response.json())
                .then(data => {
                    setProductosFiltradosCategoria(data.products);
                })
                .catch(error => console.error('Error al obtener productos:', error));
        } else {
            setProductosFiltradosCategoria(productos);
        }
    }, [categoria, productos]);

    // Filtrar productos por búsqueda
    useEffect(() => {
        if (search) {
            const filtered = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(search.toLowerCase())
            );
            setProductosFiltradosBusqueda(filtered);
        } else {
            setProductosFiltradosBusqueda(productos);
        }
    }, [search, productos]);

    // Filtrar productos por precio
    useEffect(() => {
        const filtered = productos.filter(producto =>
            producto.precio >= precioMin && (precioMax === 1500 || producto.precio <= precioMax)
        );
        setProductosFiltradosPrecio(filtered);
    }, [productos, precioMin, precioMax]);

    const productosFiltrados = productosFiltradosCategoria
        .filter(producto =>
            productosFiltradosBusqueda.some(prod => prod.id === producto.id)
        )
        .filter(producto =>
            productosFiltradosPrecio.some(prod => prod.id === producto.id)
        );

    // Filtrar productos por precio, búsqueda y categoría en una sola operación
    // const productosFiltrados = productosFiltradosBusqueda
    // .filter(producto =>
    //     producto.precio >= precioMinimo && producto.precio <= precioMaximo
    // )
    // .filter(producto =>
    //     productosFiltradosCategoria.some(prod => prod.id === producto.id)
    // );

    return (
        <>
            {productosFiltrados.map(producto => (
                <Producto key={producto.id} producto={producto} carrito={carrito} setCarrito={setCarrito}></Producto>
            ))}
        </>
    );
}
