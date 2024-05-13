import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function FormInicio() {
    const [form, setForm] = useState(true);

    function FORMULARIO(direccion) {
        let formIniciarSesion = document.getElementById("formularios")
        direccion=="left" ?  formIniciarSesion.style.left = "0" : formIniciarSesion.style.left = "50%";
        setForm(!form)
    }

    return (
        <div className='containerInicio d-flex'>
            <div className="portadaForms m-auto row justify-content-between position-relative">
                <div className="portadaRegistro col d-flex flex-column align-items-center">
                    <h3 className="text-uppercase">Crear cuenta</h3>
                    <div className="">
                        <i className="fa-solid fa-user" style={{color: "#f8f8f8"}}></i>
                    </div>
                    <p>¿Aún no tienes cuenta? Regístrate</p>
                    <button onClick={()=>FORMULARIO("left")}>Regístrate</button>
                </div>
                <div className="portadaLogin col d-flex flex-column align-items-center">
                    <h3 className="text-uppercase">Iniciar Sesión</h3>
                    <div>
                        <i className="fa-solid fa-user" style={{color: "#f8f8f8"}}></i>
                    </div>
                    <button onClick={()=>FORMULARIO("right")}>Iniciar Sesión</button>
                </div>

                <div className="formularios position-absolute" id='formularios'>
                    {form ? 
                        <div className="formIniciarSesion" id='formIniciarSesion'>
                            <h3 className="text-uppercase">Iniciar Sesión</h3>
                            <form action="" className="d-flex flex-column gap-4 mt-4">
                                <input type="text" placeholder="Usuario"/>
                                <input type="text" placeholder="Contraseña"/>
                            </form>
                            <p className='mt-4'>¿Has olvidado tu contraseña?</p>
                            <button>Iniciar Sesión</button>
                        </div>
                    :
                        <div className="formRegistrarse">
                            <h3 className="text-uppercase">Crear cuenta</h3>
                            <form action="" className="d-flex flex-column gap-4">
                                <input type="text" placeholder="Usuario"/>
                                <input type="text" placeholder="Contraseña"/>
                                <input type="text" placeholder="Nombre completo"/>
                                <input type="text" placeholder="Teléfono"/>
                                <input type="text" placeholder="Email"/>
                            </form>
                            <button>Registrarme</button>
                        </div>
                    } 
                </div>
            </div>
        </div>
    );

}