import Menu from '../Components/Menu'

import laptopImg from '/assets/img/laptop.png';

export default function Inicio() {

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
                    <div className="productos__producto box">
                        <img src={laptopImg} alt="laptop" />
                        <h4>HP Laptop 15-fc0000la</h4>
                        <p>Descripcion del laptop, que lleva, como funciona y todo esoo</p>
                        <div className="precio">
                            <p>495'99€</p>
                            <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                        </div>
                    </div>
                    <div className="productos__producto box">
                        <img src={laptopImg} alt="laptop" />
                        <h4>HP Laptop 15-fc0000la</h4>
                        <p>Descripcion del laptop, que lleva, como funciona y todo esoo</p>
                        <div className="precio">
                            <p>495'99€</p>
                            <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                        </div>
                    </div>
                    <div className="productos__producto box">
                        <img src={laptopImg} alt="laptop" />
                        <h4>HP Laptop 15-fc0000la</h4>
                        <p>Descripcion del laptop, que lleva, como funciona y todo esoo</p>
                        <div className="precio">
                            <p>495'99€</p>
                            <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                        </div>
                    </div>
                    <div className="productos__producto box">
                        <img src={laptopImg} alt="laptop" />
                        <h4>HP Laptop 15-fc0000la</h4>
                        <p>Descripcion del laptop, que lleva, como funciona y todo esoo</p>
                        <div className="precio">
                            <p>495'99€</p>
                            <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                        </div>
                    </div>
                    <div className="productos__producto box">
                        <img src={laptopImg} alt="laptop" />
                        <h4>HP Laptop 15-fc0000la</h4>
                        <p>Descripcion del laptop, que lleva, como funciona y todo esoo</p>
                        <div className="precio">
                            <p>495'99€</p>
                            <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                        </div>
                    </div>
                    <div className="productos__producto box">
                        <img src={laptopImg} alt="laptop" />
                        <h4>HP Laptop 15-fc0000la</h4>
                        <p>Descripcion del laptop, que lleva, como funciona y todo esoo</p>
                        <div className="precio">
                            <p>495'99€</p>
                            <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                        </div>
                    </div>
                    <div className="productos__producto box">
                        <img src={laptopImg} alt="laptop" />
                        <h4>HP Laptop 15-fc0000la</h4>
                        <p>Descripcion del laptop, que lleva, como funciona y todo esoo</p>
                        <div className="precio">
                            <p>495'99€</p>
                            <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                        </div>
                    </div>
                    <div className="productos__producto box">
                        <img src={laptopImg} alt="laptop" />
                        <h4>HP Laptop 15-fc0000la</h4>
                        <p>Descripcion del laptop, que lleva, como funciona y todo esoo</p>
                        <div className="precio">
                            <p>495'99€</p>
                            <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                        </div>
                    </div>
                    <div className="productos__producto box">
                        <img src={laptopImg} alt="laptop" />
                        <h4>HP Laptop 15-fc0000la</h4>
                        <p>Descripcion del laptop, que lleva, como funciona y todo esoo</p>
                        <div className="precio">
                            <p>495'99€</p>
                            <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                        </div>
                    </div>
                    <div className="productos__producto box">
                        <img src={laptopImg} alt="laptop" />
                        <h4>HP Laptop 15-fc0000la</h4>
                        <p>Descripcion del laptop, que lleva, como funciona y todo esoo</p>
                        <div className="precio">
                            <p>495'99€</p>
                            <i className="fa-solid fa-cart-shopping" style={{color: "#f8f8f8"}}></i>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        
    );

}