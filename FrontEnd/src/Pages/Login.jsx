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
        event.preventDefault(); 

        const formData = new FormData(event.target);
        fetch(`https://iliberp.work.gd/empleados/registerApi/`, {
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
        
        fetch(`https://iliberp.work.gd/empleados/loginApi/`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                window.location.href = '/inicio';
                localStorage.setItem('token', data.token);
                localStorage.setItem('user_id', data.user_id);
                localStorage.setItem('username', data.username);
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
                                    <input type="text" placeholder="Usuario" name='username' className='col m-0' 
                                        required pattern="^[a-zA-Z0-9_]{3,20}$" title="El usuario debe tener entre 3 y 20 caracteres, y puede contener letras, números y guiones bajos."/>
                                    <input type="password" placeholder="Contraseña" name='password' className='col m-0' 
                                        required pattern=".{6,}" title="La contraseña debe tener al menos 6 caracteres."/>
                                </div>
                                
                                <div className='row w-100 gap-2 m-auto'>
                                    <input type="text" placeholder="Nombre" name='first_name' className='col m-0' 
                                        required pattern="^[a-zA-Z\s]{1,50}$" title="El nombre debe contener solo letras y espacios, y debe tener hasta 50 caracteres."/>
                                    <input type="text" placeholder="Apellido" name='last_name' className='col m-0' 
                                        required pattern="^[a-zA-Z\s]{1,50}$" title="El apellido debe contener solo letras y espacios, y debe tener hasta 50 caracteres."/>
                                </div>
                                
                                <input type="tel" placeholder="Teléfono" name='telefono1' className='m-0' 
                                    required pattern="^\d{9}$" title="El teléfono debe tener 9 dígitos."/>
                                <input type="email" placeholder="Email" name='email' className='m-0' 
                                    required title="Introduce una dirección de correo electrónico válida."/>
                                <input type="text" placeholder="DNI" name='dni' className='m-0' 
                                    required pattern="^\d{8}[A-Za-z]$" title="El DNI debe tener 8 dígitos seguidos de una letra."/>
                                
                                <button type="submit">Registrarme</button>
                            </form>

                            
                        </div>
                    } 
                </div>
            </div>
        </div>
    );

}