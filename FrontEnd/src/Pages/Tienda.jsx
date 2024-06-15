import Menu from '../components/Menu'
import Productos from '../components/Productos';
import Carrito from '../components/Carrito';

import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Slider from '@mui/material/Slider';
import { useTranslation } from "react-i18next";

export default function Tienda() {
    const { t } = useTranslation();
    let navegate = useNavigate();
    const [user, setUser] = useState(null);
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [categoria, setCategoria] = useState("");
    const [orden,setOrden] = useState("nombreAsc")
    const [carritoVisible, setCarritoVisible] = useState(false);
    const [search, setSearch] = useState("")
    const [acordeonAbierto, setAcordeonAbierto] = useState(false);

    useEffect(() => {
        // Obtener datos del localStorage
        const username = localStorage.getItem('username');
        const userId = localStorage.getItem('user_id');
        const token = localStorage.getItem('token');

        // Verificar que todos los datos necesarios estén presentes
        if (username && userId && token) {
            setUser({ username, userId, token });
        } else {
            console.error("Error: No se pudieron recuperar los datos del usuario del localStorage.");
            navegate('/');
        }
    }, []);

    const [precioMin, setPrecioMin] = useState(0); 
    const [precioMax, setPrecioMax] = useState(1500); 
    const [value, setValue] = useState([precioMin, precioMax]);

    const totalCantidad = carrito.reduce((total, producto) => total + producto.cantidad, 0); //Vamos acumulando la cantidad para mostrarla en el icono del carrito
  
    //Función para que vaya actualizando el valor cuando se cambia el slider
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setPrecioMin(newValue[0]);
        setPrecioMax(newValue[1]);
    };

    //Función que se activa cuando hacemos click en el acrodeón de las categorias y hace que se abra o se cierre
    const toggleAcordeon = () => {
        setAcordeonAbierto(!acordeonAbierto);
    };

    const changeSearch = (e) => {
        setSearch(e.target.value);
        navegate("/tienda?search=" + e.target.value);
    }

    
    return (
        <section className='containerPrincipal mainMensajeria'>
            {carritoVisible && <Carrito carrito={carrito} setCarritoVisible={setCarritoVisible} setCarrito={setCarrito} user={user}/>}
            <Menu selected="tienda" username={user ? user.username : "Invitado"}></Menu>
            <section className="contenedor box">
                <h2 className='tittle'>{t('tienda')}</h2>
                {/* --------------MODAL FILTROS ------------*/}
                <div className="modal fade  p-5" id="modalFiltros" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark p-3">
                            <div className="modal-body d-flex flex-column gap-3">
                                <section id='filtros__precio'>
                                    <p className='text-center h3 border-bottom pb-1'>{t('filtrarPor')}</p>
                                    <p className='m-0 me-4 pt-2 fw-bold'>{t('precio')}</p>
                                    <Slider
                                        value={value}
                                        onChange={handleChange}
                                        max={1500}
                                    />
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <p className='m-0'>{t('min')}</p> 
                                            <p>{precioMin}€</p>
                                        </div>
                                        <div>
                                            <p className='text-end m-0'>{t('max')}</p> 
                                            <p>{precioMax === 1500 ? <strong>{`+ ${precioMax}€`}</strong> : `${precioMax}€`}</p>
                                        </div>
                                    </div>
                                </section>
                                
                                <section id='filtros__categoria'>
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header">
                                                <button className={`accordion-button ${acordeonAbierto ? '' : 'collapsed'} m-0 me-4 pt-3 fw-bold`} type="button" onClick={toggleAcordeon} aria-expanded={acordeonAbierto} aria-controls="collapseOne">
                                                    {t('categoria')}
                                                </button>
                                            </h2>
                                            <div id="collapseOne" className={`accordion-collapse collapse ${acordeonAbierto ? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                                <div className="accordion-body p-0 mt-2 ps-3">
                                                    <div className='d-flex gap-2 align-items-center'>
                                                        <input type="radio" name="categoria" id="portatil" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                                        <label htmlFor="portatil">{t('portatiles')}</label>
                                                    </div>
                                                    <div className='d-flex gap-2 align-items-center'>
                                                        <input type="radio" name="categoria" id="teclado" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                                        <label htmlFor="teclado">{t('teclados')}</label>
                                                    </div>
                                                    <div className='d-flex gap-2 align-items-center'>
                                                        <input type="radio" name="categoria" id="raton" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                                        <label htmlFor="raton">{t('ratones')}</label>
                                                    </div>
                                                    <div className='d-flex gap-2 align-items-center'>
                                                        <input type="radio" name="categoria" id="monitor" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                                        <label htmlFor="monitor">{t('monitores')}</label>
                                                    </div>
                                                    <div className='d-flex gap-2 align-items-center'>
                                                        <input type="radio" name="categoria" id="todos" defaultChecked className='categoria' onChange={(e)=>setCategoria("")} />
                                                        <label htmlFor="todos" className='fw-bold h6 m-0'>{t('todos')}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section id='filtros__orden'>
                                    <p className='text-center h3 mt-4 border-bottom pb-1'>{t('ordenarPor')}</p>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <input type="radio" name="orden" id="nombreAsc" onChange={(e)=>setOrden(e.target.id)}/>
                                        <label htmlFor="nombreAsc">{t('nombreAZ')}</label>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <input type="radio" name="orden" id="nombreDesc" onChange={(e)=>setOrden(e.target.id)}/>
                                        <label htmlFor="nombreDesc">{t('nombreZA')}</label>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <input type="radio" name="orden" id="precioAsc" onChange={(e)=>setOrden(e.target.id)}/>
                                        <label htmlFor="precioAsc">{t('precioAsc')}</label>
                                    </div>
                                    <div className='d-flex gap-2 align-items-center'>
                                        <input type="radio" name="orden" id="precioDesc" onChange={(e)=>setOrden(e.target.id)}/>
                                        <label htmlFor="precioDesc">{t('precioDesc')}</label>
                                    </div>
                                </section>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('aceptar')}</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* --------------FINzyMODAL FILTROS ------------*/}
                
                {/* Botón de los filtros cuando la pantalla se hace pequeña */}
                <div className='gap-1 m-auto px-4 pt-5 row  justify-content-center align-items-center'>
                    <button className='btnFilter border-0 col-4 d-flex p-2 gap-2 text-white align-items-center justify-content-between d-flex d-xl-none' title='Filtrar' data-bs-toggle="modal" data-bs-target="#modalFiltros">
                        <p className='m-0'>{t('filtrar')}</p>
                        <i className="fa-solid fa-filter" style={{ color: "#f8f8f8" }}></i>
                    </button>
                    <input className="form-control search col-4 mb-4" type="search" placeholder="Search" aria-label="Search" value={search} onChange={changeSearch} />
                </div>

                <div className='row containerTienda m-2 justify-content-evenly'>
                    <section className='box filtros col-2 d-none d-xl-block barScroll overflow-y-auto'>
                        <section id='filtros__precio'>
                            <p className='text-center h3 border-bottom pb-1'>{t('filtrarPor')}</p>
                            <p className='m-0 me-4 pt-2 fw-bold'>{t('precio')}</p>
                            <Slider
                                    value={value}
                                    onChange={handleChange}
                                    max={1500}
                                />
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className='m-0'>{t('min')}</p> 
                                    <p>{value[0]}€</p>
                                </div>
                                <div>
                                    <p className='text-end m-0'>{t('max')}</p> 
                                    <p>{value[1] === 1500 ? <strong>{`+ ${value[1]}€`}</strong> : `${value[1]}€`}</p>
                                </div>
                            </div>
                        </section>
                        
                        <section id='filtros__categoria'>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header">
                                        <button className={`accordion-button ${acordeonAbierto ? '' : 'collapsed'} m-0 me-4 pt-3 fw-bold`} type="button" onClick={toggleAcordeon} aria-expanded={acordeonAbierto} aria-controls="collapseOne">
                                            {t('categoria')}
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className={`accordion-collapse collapse ${acordeonAbierto ? 'show' : ''}`} aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body p-0 mt-2 ps-3">
                                            <div className='d-flex gap-2 align-items-center'>
                                                <input type="radio" name="categoria" id="portatil" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                                <label htmlFor="portatil">{t('portatiles')}</label>
                                            </div>
                                            <div className='d-flex gap-2 align-items-center'>
                                                <input type="radio" name="categoria" id="teclado" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                                <label htmlFor="teclado">{t('teclados')}</label>
                                            </div>
                                            <div className='d-flex gap-2 align-items-center'>
                                                <input type="radio" name="categoria" id="raton" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                                <label htmlFor="raton">{t('ratones')}</label>
                                            </div>
                                            <div className='d-flex gap-2 align-items-center'>
                                                <input type="radio" name="categoria" id="monitor" className='categoria' onChange={(e)=>setCategoria(e.target.id)} />
                                                <label htmlFor="monitor">{t('monitores')}</label>
                                            </div>
                                            <div className='d-flex gap-2 align-items-center'>
                                                <input type="radio" name="categoria" id="todos" defaultChecked className='categoria' onChange={(e)=>setCategoria("")} />
                                                <label htmlFor="todos" className='fw-bold h6 m-0'>{t('todos')}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id='filtros__orden'>
                            <p className='text-center h3 mt-4 border-bottom pb-1'>{t('ordenarPor')}</p>
                            <div className='d-flex gap-2 align-items-center'>
                                <input type="radio" name="orden" id="nombreAsc" onChange={(e)=>setOrden(e.target.id)}/>
                                <label htmlFor="nombreAsc">{t('nombreAZ')}</label>
                            </div>
                            <div className='d-flex gap-2 align-items-center'>
                                <input type="radio" name="orden" id="nombreDesc" onChange={(e)=>setOrden(e.target.id)}/>
                                <label htmlFor="nombreDesc">{t('nombreZA')}</label>
                            </div>
                            <div className='d-flex gap-2 align-items-center'>
                                <input type="radio" name="orden" id="precioAsc" onChange={(e)=>setOrden(e.target.id)}/>
                                <label htmlFor="precioAsc">{t('precioAsc')}</label>
                            </div>
                            <div className='d-flex gap-2 align-items-center'>
                                <input type="radio" name="orden" id="precioDesc" onChange={(e)=>setOrden(e.target.id)}/>
                                <label htmlFor="precioDesc">{t('precioDesc')}</label>
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

                
            </section>

        </section>
    );

}