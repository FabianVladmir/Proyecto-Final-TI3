import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logo from '../../assets/ce-epcc.png';
const styleLogo = {
    width: '48px', // Ajusta el ancho de la imagen
    height: '48px', // Ajusta la altura de la imagen
}

function Header(props) {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <Link to="home">
                        <a className="btn btn-ghost normal-case text-xl">
                            <img src={Logo} alt="Logo" style={styleLogo} />
                        </a>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="horario">Ver Horario</Link></li>
                        <li><Link to="reservar">Reservar</Link></li>
                        <li><Link to="ver-equipos">Ver Equipos</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to="home"><a className="btn">Mi cuenta</a></Link>
                </div>
            </div>



        </div>
    );
}

export default Header;