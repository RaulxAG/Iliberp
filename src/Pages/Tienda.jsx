import Menu from '../Components/Menu'
import Productos from './Productos';
import { useState,useEffect } from 'react';

import laptopImg from '/assets/img/laptop.png';

export default function Inicio() {

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    
    console.log(carrito)
    return (
        <div className='containerPrincipal'>
            <Menu selected="incidencias"></Menu>
            <div className="contenedor box">
                <h2 className='tittle'>Tienda</h2>
                <div className="categorias">
                    <section className='categoria'>
                        <div className="categoria__icono">
                            <i className="fa-solid fa-ethernet" style={{color: '#f8f8f8'}}></i>
                        </div>
                        <div className='categoria__texto'>
                          <h3>Telefonía</h3>  
                        </div>
                    </section>
                    <section className='categoria'>
                        <div className="categoria__icono">
                            <i className="fa-regular fa-keyboard" style={{color: '#f8f8f8'}}></i>
                        </div>
                        <div className='categoria__texto'>
                          <h3>Software</h3>  
                        </div>
                        
                    </section>
                    <section className='categoria'>
                        <div className="categoria__icono">
                            <i className="fa-solid fa-laptop" style={{color: '#f8f8f8'}}></i>
                        </div>
                        <div className='categoria__texto'>
                          <h3 >Hardware</h3>  
                        </div>
                    </section>
                    <section className='categoria'>
                        <div className="categoria__icono">
                            <i className="fa-solid fa-user-gear" style={{color: '#f8f8f8'}}></i>
                        </div>
                        <div className='categoria__texto'>
                           <h3>Servicios</h3> 
                        </div>
                    </section>
                </div>
                <section className="productos box">
                      <Productos productos={productos} setProductos={setProductos} carrito={carrito} setCarrito={setCarrito}></Productos> 
                </section>
                <div className='carrito rounded-circle '>
                    <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                    <p className='carrito__cant rounded-circle d-flex justify-content-center align-items-center'>{carrito.length}</p>
                </div>
            </div>
        </div>
    );

}