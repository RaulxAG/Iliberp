import Producto from './Producto';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function Productos({ productos, setProductos, carrito, setCarrito, search, setSearch, categoria,precioMax, precioMin,orden }) {
    const location = useLocation();
    const [productosFiltradosCategoria, setProductosFiltradosCategoria] = useState([]);
    const [productosFiltradosBusqueda, setProductosFiltradosBusqueda] = useState([]);
    const [productosFiltradosPrecio, setProductosFiltradosPrecio] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [cargarSpinner,setCargarSpinner] = useState(true)
    const [numPaginas, setNumPaginas] = useState(0);
    
    // Cuando cambia la URL, actualizamos el valor de búsqueda
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchParam = params.get("search");
        setSearch(searchParam || "");
    }, [location.search, setSearch]);
    
    // Llamada para obtener todos los productos
    useEffect(() => {
        setCargarSpinner(true);
        fetch(`http://localhost:8000/getProductsJSON/?page=${pagina}`)
            .then(response => response.json())
            .then(data => {
                setCargarSpinner(false);
                console.log(data)
                if (pagina!=1) {
                    setProductos(prevProductos => [...prevProductos, ...data.products]);
                    
                }else{
                    setProductos(data.products)
                }
                
                setProductosFiltradosCategoria(data.products); // Inicializar con todos los productos
                setProductosFiltradosBusqueda(data.products); // Inicializar con todos los productos
                setProductosFiltradosPrecio(data.products); // Inicializar con todos los productos
                setNumPaginas(data.num_pages);
            })
            .catch(error => console.error('Error al obtener productos:', error));
    }, [pagina]);
    
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
            producto.precio >= precioMin && (precioMax === 1500 || producto.precio <= precioMax) //Controlar el valor max que tenemos puesto en el slider (1500)
        );
        setProductosFiltradosPrecio(filtered);
        
    }, [productos, precioMin, precioMax]);

    const productosFiltrados = productosFiltradosCategoria
        .filter(producto =>
            productosFiltradosBusqueda.find(prod => prod.id === producto.id)
        )
        .filter(producto =>
            productosFiltradosPrecio.find(prod => prod.id === producto.id)
        );

    // Ordenar los productos filtrados
    const productosOrdenados = [...productosFiltrados];
    
    switch (orden) {
        case 'precioAsc':
            productosOrdenados.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
            break;
        case 'precioDesc':
            productosOrdenados.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
            break;
        case 'nombreAsc':
            productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'nombreDesc':
            productosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        default:
            break;
    }

    const cargarMasProductos = () => {
        setPagina(prevPagina => prevPagina + 1);
    };

    return (
        <>
            <div className='row justify-content-center w-100'>
                {productosOrdenados.map(producto => (
                    <Producto key={producto.id} producto={producto} carrito={carrito} setCarrito={setCarrito}></Producto>
                ))}
            </div>
            
            {cargarSpinner &&
                <div className='w-100 d-flex'>
                    <div className="spinner-border mx-auto" role="status">
                        <span className="visually-hidden mx-auto">Loading...</span>
                    </div>
                </div>
                
            }
            {pagina < numPaginas && (
                <div className='w-100 d-flex pt-3'>
                    <button className='btn btn-dark mx-auto' onClick={cargarMasProductos}>Ver más</button>
                </div>
            )}
            
        </>
    );
}
