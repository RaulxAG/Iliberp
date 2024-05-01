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

    const [value, setValue] = useState([20, 37]);

    const changeCategory = (category) =>{
        setCategSelected(category);
    }  

    function valuetext(value) {
        return `${value}°C`;
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
    console.log(categSelected)
    console.log(carrito)


    return (
        <div className='containerPrincipal'>
            {carritoVisible && <Carrito carrito={carrito} setCarritoVisible={setCarritoVisible} />}
            <Menu selected="incidencias"></Menu>
            <div className="contenedor box">
                <h2 className='tittle'>Tienda</h2>
                <div className='w-100 m-auto px-4 pt-5 d-flex justify-content-between align-items-center row'>
                    
                    <div className='d-flex  align-items-center col-5'>
                        <p className='m-0 me-4'>Precio</p>
                        <Slider
                            getAriaLabel={() => 'Temperature range'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            className='w-50'
                        /> 
                    </div>
                    
                   <input class="form-control me-2 float-end w-25 search col-3" type="search" placeholder="Search" aria-label="Search"/> 
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
                <section className="productos box barScroll">
                      <Productos productos={productos} setProductos={setProductos} carrito={carrito} setCarrito={setCarrito}></Productos> 
                </section>
                <button className='carrito rounded-circle border-0' title='Ver carrito' onClick={()=>setCarritoVisible(true)}>
                    <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                    <p className='carrito__cant rounded-circle d-flex justify-content-center align-items-center'>{carrito.length}</p>
                </button>
            </div>
        </div>
    );

}