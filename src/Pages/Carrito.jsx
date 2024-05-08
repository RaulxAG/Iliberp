import laptopImg from '/assets/img/laptop.png';
import { Link } from 'react-router-dom';

export default function Carrito({carrito,setCarritoVisible}) {
    console.log(carrito.length)
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
                                        <button>-</button><p className=''>12</p><button>+</button>
                                        <p className='m-0 ps-5 fs-4'>{producto.precio}€</p>
                                    </div>
                                    <div className="card-text text-end d-flex justify-content-end align-items-center border-bottom">
                                        <p className='fs-4 me-5 fw-bold'>Total</p>
                                        <p className='m-0 fs-4 fw-bold'>1230,00€</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {carrito.length > 0 && (
                    <Link to="/tramitar-pedido">
                        <button className='tramitarPedido'>Tramitar pedido</button>
                    </Link>
                )}
                
            </div>
        </div>
    )
}