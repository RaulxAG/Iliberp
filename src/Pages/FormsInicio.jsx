import { Link } from 'react-router-dom';

export default function FormInicio() {
    return (
        <div className='containerInicio d-flex'>
            <div className="portadaForms m-auto row justify-content-between position-relative">
                <div className="portadaRegistro col d-flex flex-column align-items-center">
                    <h3 className="text-uppercase">Crear cuenta</h3>
                    <div className="">
                        <i className="fa-solid fa-user" style={{color: "#f8f8f8"}}></i>
                    </div>
                    <p>¿Aún no tienes cuenta? Regístrate</p>
                    <button>Regístrate</button>
                </div>
                <div className="portadaLogin col d-flex flex-column align-items-center">
                    <h3 className="text-uppercase">Iniciar Sesión</h3>
                    <div>
                        <i className="fa-solid fa-user" style={{color: "#f8f8f8"}}></i>
                    </div>
                    <button>Iniciar Sesión</button>
                </div>

                <div className="formularios position-absolute">
                    <div className="form">
                        <h3 className="text-uppercase">Iniciar Sesión</h3>
                        <form action="" className="d-flex flex-column gap-4">
                            <input type="text" placeholder="Usuario"/>
                            <input type="text" placeholder="Contraseña"/>
                        </form>
                        <p>¿Has olvidado tu contraseña?</p>
                        <Link to="/tienda">
                            <button>Iniciar Sesión</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

}