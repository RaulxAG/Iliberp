import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function FormInicio() {
    const [form, setForm] = useState(true);
    const [mensaje,setMensaje] = useState('');

    function movieForm(direccion) {
        let formIniciarSesion = document.getElementById("formularios")
        direccion=="left" ?  formIniciarSesion.style.left = "0" : formIniciarSesion.style.left = "50%";
        setForm(!form)
    }

    const handleSubmitRegister = (event) => {
        event.preventDefault(); // Evita el comportamiento de envío de formulario predeterminado

        const formData = new FormData(event.target);
        console.log(formData)
        fetch(`http://127.0.0.1:8000/registerApi/`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Extraer el mensaje de la respuesta del servidor
            setMensaje(data.message || data.error) 

            //Ir hacia el formulario de inciar sesión
            movieForm('right')

            // Ocultar el mensaje después de un segundo
            setTimeout(() => {
                setMensaje('');
            }, 3000);
           
        })
        .catch(error => console.error('Error al registrar:', error))
    };

    const handleSubmitLogin = (event) => {
        event.preventDefault(); 

        const formData = new FormData(event.target);
        fetch(`http://127.0.0.1:8000/loginApi/`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                window.location.href = '/tienda';
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.user_id);
            } else {
                setMensaje(data.error || 'Error desconocido al iniciar sesión');
            }
           
        })
        .catch(error => console.error('Error al registrar:', error))
    };

    return (
        <div className='containerInicio d-flex'>

            {mensaje &&
                <div className='position-absolute w-100 text-center alert alert-success'>
                    <p>{mensaje}</p>
                </div>
            }
            
            <div className="portadaForms m-auto row justify-content-between position-relative">
                <div className="portadaRegistro col d-flex flex-column align-items-center">
                    <h3 className="text-uppercase">Crear cuenta</h3>
                    <div className="">
                        <i className="fa-solid fa-user" style={{color: "#f8f8f8"}}></i>
                    </div>
                    <p>¿Aún no tienes cuenta? Regístrate</p>
                    <button onClick={()=>movieForm("left")}>Regístrate</button>
                </div>
                <div className="portadaLogin col d-flex flex-column align-items-center">
                    <h3 className="text-uppercase">Iniciar Sesión</h3>
                    <div>
                        <i className="fa-solid fa-user" style={{color: "#f8f8f8"}}></i>
                    </div>
                    <button onClick={()=>movieForm("right")}>Iniciar Sesión</button>
                </div>

                <div className="formularios position-absolute" id='formularios'>
                    {form ? 
                        <div className="formIniciarSesion" id='formIniciarSesion'>
                            <h3 className="text-uppercase">Iniciar Sesión</h3>
                            <form onSubmit={handleSubmitLogin} className="d-flex flex-column gap-4 mt-4">
                                <input type="text" placeholder="Usuario" name='username'/>
                                <input type="password" placeholder="Contraseña" name='password'/>
                            
                                <a className='mt-4 text-black'>¿Has olvidado tu contraseña?</a>
                                <div className="d-flex justify-content-center">
                                   <button type="submit " className='w-75 '>Iniciar Sesión</button> 
                                </div>
                                
                            </form>
                        </div>
                    :
                        <div className="formRegistrarse">
                            <h3 className="text-uppercase">Crear cuenta</h3>
                            <form onSubmit={handleSubmitRegister} className="d-flex flex-column gx-4">
                                <div className='row w-100 gap-2 m-auto'>
                                    <input type="text" placeholder="Usuario" name='username' className='col m-0'/>
                                    <input type="text" placeholder="Contraseña" name='password'  className='col m-0'/>
                                </div>
                                
                                <div className='row w-100 gap-2 m-auto'>
                                    <input type="text" placeholder="Nombre" name='first_name' className='col m-0'/>
                                    <input type="text" placeholder="Apellido" name='last_name' className='col m-0'/>
                                </div>
                                <input type="text" placeholder="Teléfono" name='telefono1'  className='m-0'/>
                                <input type="text" placeholder="Email" name='email'  className='m-0'/>
                                <input type="text" placeholder="Dni" name='dni'  className='m-0'/>
                                <button type="submit">Registrarme</button>
                            </form>
                            
                        </div>
                    } 
                </div>
            </div>
        </div>
    );

}