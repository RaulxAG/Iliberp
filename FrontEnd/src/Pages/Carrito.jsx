import laptopImg from '/assets/img/laptop.png';
import { Link } from 'react-router-dom';

export default function Carrito({carrito,setCarritoVisible, setCarrito}) {
    const totalCompra = carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);

    const changeCant=(e,id)=>{
        //Buscamos el producto
        const index = carrito.findIndex(producto => producto.id === id)
        console.log(e.target.id)
        if (e.target.id == "mas") {
            //Le sumamos uno a la cantidad
            const nuevoCarrito = [...carrito];
            nuevoCarrito[index].cantidad += 1;
            setCarrito(nuevoCarrito);
        }else{
            // Si la cantidad es mayor a 1, restamos uno a la cantidad
            if (carrito[index].cantidad > 1) {
                const nuevoCarrito = [...carrito];
                nuevoCarrito[index].cantidad -= 1;
                setCarrito(nuevoCarrito);
            } else {
                // Si la cantidad es 1, eliminamos el producto del carrito
                const nuevoCarrito = carrito.filter(producto => producto.id !== id);
                setCarrito(nuevoCarrito);
            }
        }
    }
    return(
        <div className="contenedorCarrito barScroll">
            <button onClick={()=>setCarritoVisible(false)}>X</button>
            <div className="contenedorCarrito__productos box">
                {carrito.map((producto)=>(
                    <div className="card mb-3 p-3 contenedorCarrito__productos__producto" key={producto.nombre}>
                        <div className="row g-0">
                            <div className="col-md-4 d-flex justify-content-center align-items-center">
                                <img src={laptopImg} className="img-fluid rounded-start m-2" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body d-flex flex-column justify-content-between h-100 p-0">
                                    <h5 className="card-title border-bottom">{producto.nombre}</h5>
                                    <div className="card-text text-end d-flex justify-content-end align-items-center border-bottom">
                                        <button id='menos' onClick={(e)=>changeCant(e,producto.id)}>-</button>
                                            <p className=''>{producto.cantidad}</p>
                                        <button id='mas' onClick={(e)=>changeCant(e,producto.id)}>+</button>
                                        <p className='m-0 ps-5 fs-4'>{producto.precio}€</p>
                                    </div>
                                    <div className="card-text text-end d-flex justify-content-end align-items-center border-bottom">
                                        <p className='fs-4 me-5 fw-bold'>Total</p>
                                        <p className='m-0 fs-4 fw-bold'>{producto.precio * producto.cantidad}€</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className='d-flex justify-content-end align-items-center gap-5 my-4 me-4'>
                    <p className='text-end h3 m-0'>Total </p>
                    <p className='m-0 h5'>{totalCompra}€</p>
                </div>
                
                {carrito.length > 0 && (
                    <Link to="/tramitar-pedido">
                        <button className='tramitarPedido'>Tramitar pedido</button>
                    </Link>
                )}
                
            </div>
        </div>
    )
}