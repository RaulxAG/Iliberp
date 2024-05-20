import Menu from '../Components/Menu'
import Productos from './Productos';

import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import laptopImg from '/assets/img/laptop.png';
import Carrito from './Carrito';

import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

export default function Tienda() {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [carritoVisible, setCarritoVisible] = useState(false);
    const [search, setSearch] = useState("")
    const [value, setValue] = useState([0, 1500]);
    const [acordeonAbierto, setAcordeonAbierto] = useState(false);

    let navegate = useNavigate();

    let precioMin=value[0]
    let  precioMax = value[1]
    
    function valuetext(value) {
        return `$${value[0]} - $${value[1]}`;
    }    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const toggleAcordeon = () => {
        setAcordeonAbierto(!acordeonAbierto);
    };

    const changeSearch = (e) => {
        const newValue = e.target.value;
        setSearch(newValue);
        navegate("/tienda?search=" + newValue);
    }



    return (
        <div className='containerPrincipal'>
            {carritoVisible && <Carrito carrito={carrito} setCarritoVisible={setCarritoVisible} />}
            <Menu selected="tienda"></Menu>
            <div className="contenedor box">
                <h2 className='tittle'>Tienda</h2>
                <div className='w-100 m-auto px-4 pt-5 d-flex justify-content-end align-items-center'>
                    <input className="form-control w-25 search" type="search" placeholder="Search" aria-label="Search" value={search} onChange={changeSearch} />
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
                                max={1700}
                            />
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className='m-0'>min.</p> 
                                <p>{value[0]}€</p>
                            </div>
                            <div>
                                <p className='text-end m-0'>máx.</p> 
                                <p>{value[1] === 1500 ? <strong>{`+ ${value[1]}€`}</strong> : `${value[1]}€`}</p>
                            </div>
                        </div>
                        
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
                                            <input type="radio" name="categoria" id="portatil" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                            <label htmlFor="portatil">Portátiles</label>
                                        </div>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <input type="radio" name="categoria" id="teclado" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                            <label htmlFor="teclado">Teclados</label>
                                        </div>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <input type="radio" name="categoria" id="raton" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                            <label htmlFor="raton">Ratones</label>
                                        </div>
                                        <div className='d-flex gap-2 align-items-center'>
                                            <input type="radio" name="categoria" id="monitor" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                            <label htmlFor="monitor">Monitores</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className='text-center h3 mt-4 border-bottom pb-1'>Ordenar por</p>
                        <div className='d-flex gap-2 align-items-center'>
                            <input type="radio" name="orden" id="nombreAsc" />
                            <label htmlFor="nombreAsc">Nombre A-Z</label>
                        </div>
                        <div className='d-flex gap-2 align-items-center'>
                            <input type="radio" name="orden" id="nombreDesc" />
                            <label htmlFor="nombreDesc">Nombre Z-A</label>
                        </div>
                        <div className='d-flex gap-2 align-items-center'>
                            <input type="radio" name="orden" id="precioAsc" />
                            <label htmlFor="precioAsc">Precio asc.</label>
                        </div>
                        <div className='d-flex gap-2 align-items-center'>
                            <input type="radio" name="orden" id="precioDesc" />
                            <label htmlFor="precioDesc">Precio desc.</label>
                        </div>

                    </section>
                    <section className="productos box barScroll ">
                        <Productos productos={productos} setProductos={setProductos} carrito={carrito} setCarrito={setCarrito} search={search} setSearch={setSearch} categoria={categoria} setCategoria={setCategoria} precioMax={precioMax} precioMin={precioMin}></Productos>
                    </section>
                </div>

                <button className='carrito rounded-circle border-0' title='Ver carrito' onClick={() => setCarritoVisible(true)}>
                    <i className="fa-solid fa-cart-shopping" style={{ color: "#f8f8f8" }}></i>
                    <p className='carrito__cant rounded-circle d-flex justify-content-center align-items-center'>{carrito.length}</p>
                </button>
            </div>

        </div>
    );

}