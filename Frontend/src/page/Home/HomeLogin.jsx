import { Link } from 'react-router-dom';
import Logo from '../../assets/ce-epcc.png';

const cardStyles = {
    width: '600px', // Ancho personalizado
};

const styleLogo = {
    width: '90px', // Ajusta el ancho de la imagen
    height: '90px', // Ajusta la altura de la imagen
};

const blueText = {
    color: 'blue', // Cambiar el color del texto a azul
    fontSize: '1.0rem', // Tamaño de fuente más grande
};

const centerText = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
};

const heroStyles = {
    marginTop: '-80px', // Margen superior negativo para mover el hero hacia arriba
};


function HomeLogin(props) {
    return (
        <div>
            <div className="hero min-h-screen bg-base-200" style={heroStyles}>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-screen-xl h-full shadow-2xl bg-base-100" style={cardStyles}>
                        <div className="text-center lg:text-center">
                            <a className="mx-auto flex items-center justify-center">
                                <img src={Logo} alt="Logo" style={styleLogo} />
                            </a>
                            <h1 className="text-3xl font-bold">INICIA SESION</h1>
                        </div>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Correo</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contraseña</span>
                                </label>
                                <input type="text" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="text-center">
                                <Link to="/reiniciar" className="label-text-alt link link-hover" style={blueText}>
                                    Olvidaste tu contraseña?
                                </Link>
                            </div>

                            <Link to="/">
                                <div className="col-span-2 text-center">
                                    <button type="submit" className="bg-blue-600 text-white rounded p-2">
                                        Crear Cuenta
                                    </button>
                                </div>
                            </Link>
                            <div className="text-center" style={centerText}>
                                <label className="label">No tienes una cuenta? </label>
                                <Link to="/registrar" className="label-text-alt link link-hover" style={blueText}>
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeLogin;
