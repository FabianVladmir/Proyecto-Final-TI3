import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logo from '../assets/ce-epcc.png';
const styleLogo = {
    width: '48px', // Ajusta el ancho de la imagen
    height: '48px', // Ajusta la altura de la imagen
}

function Header(props) {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabindex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div>
                    <Link to="/">
                        <a href="#" className="btn btn-ghost normal-case text-xl">

                            <img src={Logo} alt="Logo" style={styleLogo} />
                        </a>
                    </Link>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">Horario</Link></li>
                        <li><Link to="/">Reservar</Link></li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <Link to="/"><a className="btn">Iniciar Session</a></Link>
                </div>
            </div>


            <Outlet />
        </div>
    );
}

export default Header;