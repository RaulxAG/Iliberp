import Menu from '../Components/Menu'
import Productos from './Productos';
import { useState,useEffect } from 'react';

import laptopImg from '/assets/img/laptop.png';
import Carrito from './Carrito';

import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

export default function Inicio() {

    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [categSelected, setCategSelected] = useState("hardware");
    const [carritoVisible, setCarritoVisible] = useState(false);

    const [value, setValue] = useState([200, 600]);


    function valuetext(value) {
        return `${value}°C`;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    console.log(categSelected)
    console.log(carrito)

    const [acordeonAbierto, setAcordeonAbierto] = useState(false);

    const toggleAcordeon = () => {
      setAcordeonAbierto(!acordeonAbierto);
    };

    return (
        <div className='containerPrincipal'>
            {carritoVisible && <Carrito carrito={carrito} setCarritoVisible={setCarritoVisible} />}
            <Menu selected="tienda"></Menu>
            <div className="contenedor box">
                <h2 className='tittle'>Tienda</h2>
                <div className='w-100 m-auto px-4 pt-5 d-flex justify-content-end align-items-center'>
                   <input class="form-control w-25 search" type="search" placeholder="Search" aria-label="Search"/> 
                </div>

                <div className="categorias">
                    {/* <div className='categoria' onClick={()=>changeCategory('telefonia')}>
                        <div className="categoria__icono" >
                            <i className="fa-solid fa-ethernet" style={{color: '#f8f8f8'}} ></i>
                        </div>
                        <div className='categoria__texto'>
                          <h3>Telefonía</h3>  
                        </div>
                    </div>
                    <div className='categoria' onClick={()=>changeCategory('software')}>
                        <div className="categoria__icono" >
                            <i className="fa-regular fa-keyboard" style={{color: '#f8f8f8'}}></i>
                        </div>
                        <div className='categoria__texto'>
                          <h3>Software</h3>  
                        </div>
                    </div>
                    <div className='categoria' onClick={()=>changeCategory('hardware')}>
                        <div className="categoria__icono" >
                            <i className="fa-solid fa-laptop" style={{color: '#f8f8f8'}}></i>
                        </div>
                        <div className='categoria__texto'>
                          <h3 >Hardware</h3>  
                        </div>
                    </div>
                    <div className='categoria' onClick={()=>changeCategory('servicios')}>
                        <div className="categoria__icono">
                            <i className="fa-solid fa-user-gear" style={{color: '#f8f8f8'}}></i>
                        </div>
                        <div className='categoria__texto'>
                           <h3>Servicios</h3> 
                        </div>
                    </div> */}
                </div>
                <div className='d-flex containerTienda m-2'>
                    <section className='box filtros'>
                        <p className='text-center h3 border-bottom pb-1'>Filtrar por</p>
                        <p className='m-0 me-4 pt-2 fw-bold'>Precio</p>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            max={1500}
                        /> 
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className={`accordion-button ${acordeonAbierto ? '' : 'collapsed'} m-0 me-4 pt-3 fw-bold`} type="button" onClick={toggleAcordeon} aria-expanded={acordeonAbierto} aria-controls="collapseOne">
                                        Categoría
                                    </button>
                                </h2>
                                <div id="collapseOne" className={`accordion-collapse collapse ${acordeonAbierto ? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body p-0 mt-2 ps-3">
                                        <div className='d-flex gap-2 align-items-center'>
                                            <input type="checkbox" name="ordenador" id="ordenador"/> 
                                            <label htmlFor="ordenador">Ordenadores</label>
                                        </div>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <input type="checkbox" name="teclado" id="teclado"/> 
                                            <label htmlFor="teclado">Teclados</label>
                                        </div>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <input type="checkbox" name="raton" id="raton"/> 
                                            <label htmlFor="raton">Ratones</label>
                                        </div>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <input type="checkbox" name="monitor" id="monitor"/> 
                                            <label htmlFor="monitor">Monitores</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='text-center h3 mt-5 border-bottom pb-1'>Ordenar por</p>
                        <div className='d-flex gap-2 align-items-center'>
                            <input type="checkbox" name="nombreAsc" id="nombreAsc"/> 
                            <label htmlFor="nombreAsc">Nombre A-Z</label>
                        </div>
                        <div className='d-flex gap-2 align-items-center'>
                            <input type="checkbox" name="nombreDes" id="nombreDesc"/> 
                            <label htmlFor="nombreDesc">Nombre Z-A</label>
                        </div>
                        <div className='d-flex gap-2 align-items-center'>
                            <input type="checkbox" name="precioAsc" id="precioAsc"/> 
                            <label htmlFor="precioAsc">Precio asc.</label>
                        </div>
                        <div className='d-flex gap-2 align-items-center'>
                            <input type="checkbox" name="precioDes" id="precioDesc"/> 
                            <label htmlFor="precioDesc">Precio desc.</label>
                        </div>
                    </section>
                    <section className="productos box barScroll ">
                        <Productos productos={productos} setProductos={setProductos} carrito={carrito} setCarrito={setCarrito}></Productos> 
                    </section>
                </div>
                
                <button className='carrito rounded-circle border-0' title='Ver carrito' onClick={()=>setCarritoVisible(true)}>
                    <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                    <p className='carrito__cant rounded-circle d-flex justify-content-center align-items-center'>{carrito.length}</p>
                </button>
            </div>
        </div>
    );

}