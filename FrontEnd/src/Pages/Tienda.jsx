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
    const [orden,setOrden] = useState("nombreAsc")
    const [carritoVisible, setCarritoVisible] = useState(false);
    const [search, setSearch] = useState("")
    const [value, setValue] = useState([0, 1500]);
    const [acordeonAbierto, setAcordeonAbierto] = useState(false);

    const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0); //Vamos acumulando la cantidad para mostrarla en el icono del carrito

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
            {carritoVisible && <Carrito carrito={carrito} setCarritoVisible={setCarritoVisible} setCarrito={setCarrito}/>}
            <Menu selected="tienda"></Menu>
            <div className="contenedor box">
                <h2 className='tittle'>Tienda</h2>
                {/* --------------MODAL FILTROS ------------*/}
                <div className="modal fade  p-5" id="modalFiltros" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark p-3">
                            <div className="modal-body d-flex flex-column gap-3">
                                <section id='filtros__precio'>
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
                                </section>
                                
                                <section id='filtros__categoria'>
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
                                                    <div className='d-flex gap-2 align-items-center'>
                                                        <input type="radio" name="categoria" id="todos" defaultChecked className='categoria' onChange={(e)=>setCategoria("")} />
                                                        <label htmlFor="todos" className='fw-bold h6 m-0'>Todos</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section id='filtros__orden'>
                                    <p className='text-center h3 mt-4 border-bottom pb-1'>Ordenar por</p>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <input type="radio" name="orden" id="nombreAsc" onChange={(e)=>setOrden(e.target.id)}/>
                                        <label htmlFor="nombreAsc">Nombre A-Z</label>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <input type="radio" name="orden" id="nombreDesc" onChange={(e)=>setOrden(e.target.id)}/>
                                        <label htmlFor="nombreDesc">Nombre Z-A</label>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <input type="radio" name="orden" id="precioAsc" onChange={(e)=>setOrden(e.target.id)}/>
                                        <label htmlFor="precioAsc">Precio asc.</label>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <input type="radio" name="orden" id="precioDesc" onChange={(e)=>setOrden(e.target.id)}/>
                                        <label htmlFor="precioDesc">Precio desc.</label>
                                    </div>
                                </section>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* --------------FINzyMODAL FILTROS ------------*/}
                <div className='gap-1 m-auto px-4 pt-5 row  justify-content-center align-items-center'>
                    <button className='btnFilter border-0 col-4 d-flex p-2 gap-2 text-white align-items-center justify-content-between d-flex d-xl-none' title='Filtrar' data-bs-toggle="modal" data-bs-target="#modalFiltros">
                        <p className='m-0'>Filtrar</p>
                        <i className="fa-solid fa-filter" style={{ color: "#f8f8f8" }}></i>
                    </button>
                    <input className="form-control search col-4 mb-4" type="search" placeholder="Search" aria-label="Search" value={search} onChange={changeSearch} />
                </div>
                <div className='row containerTienda m-2 justify-content-evenly barScroll'>
                    <section className='box filtros col-2 d-none d-xl-block'>
                        <section id='filtros__precio'>
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
                        </section>
                        
                        <section id='filtros__categoria'>
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
                                            <div className='d-flex gap-2 align-items-center'>
                                                <input type="radio" name="categoria" id="todos" defaultChecked className='categoria' onChange={(e)=>setCategoria("")} />
                                                <label htmlFor="todos" className='fw-bold h6 m-0'>Todos</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id='filtros__orden'>
                            <p className='text-center h3 mt-4 border-bottom pb-1'>Ordenar por</p>
                            <div className='d-flex gap-2 align-items-center'>
                                <input type="radio" name="orden" id="nombreAsc" onChange={(e)=>setOrden(e.target.id)}/>
                                <label htmlFor="nombreAsc">Nombre A-Z</label>
                            </div>
                            <div className='d-flex gap-2 align-items-center'>
                                <input type="radio" name="orden" id="nombreDesc" onChange={(e)=>setOrden(e.target.id)}/>
                                <label htmlFor="nombreDesc">Nombre Z-A</label>
                            </div>
                            <div className='d-flex gap-2 align-items-center'>
                                <input type="radio" name="orden" id="precioAsc" onChange={(e)=>setOrden(e.target.id)}/>
                                <label htmlFor="precioAsc">Precio asc.</label>
                            </div>
                            <div className='d-flex gap-2 align-items-center'>
                                <input type="radio" name="orden" id="precioDesc" onChange={(e)=>setOrden(e.target.id)}/>
                                <label htmlFor="precioDesc">Precio desc.</label>
                            </div>
                        </section>
                    </section>
                    <section className="productos box barScroll col-9">
                        <Productos productos={productos} setProductos={setProductos} carrito={carrito} setCarrito={setCarrito} search={search} setSearch={setSearch} categoria={categoria} setCategoria={setCategoria} precioMax={precioMax} precioMin={precioMin} orden={orden}></Productos>
                    </section>
                </div>

                <button className='carrito rounded-circle border-0' title='Ver carrito' onClick={() => setCarritoVisible(true)}>
                    <i className="fa-solid fa-cart-shopping" style={{ color: "#f8f8f8" }}></i>
                    <p className='carrito__cant rounded-circle d-flex justify-content-center align-items-center'>{totalCantidad}</p>
                </button>

                
            </div>

        </div>
    );

}