import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerJSON } from '../librerias/libLogin';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const [form, setForm] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        registerJSON(data, navigate);
    }

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
                            <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-4">
                                <input type="text" name="usuario" id="usuario" placeholder="Usuario" {...register('usuario', { required: true })} />

                                <input type="password" name="password" id="password" placeholder="Contraseña" {...register('password', { required: true })} />

                                <input type="text" name="nombre_completo" id="nombre_completo" placeholder="Nombre completo" {...register('nombre_completo', { required: true })} />

                                <input type="text" name="telefono" id="telefono" placeholder="Teléfono" {...register('telefono', { required: true })} />

                                <input type="text" name="email" id="email" placeholder="Email" {...register('email', { required: true })} />

                                <button type="submit" className="w-50 justify-self-center align-self-center">Registrarme</button>
                            </form>
                            
                        </div>
                    } 
                </div>
            </div>
        </div>
    );

}