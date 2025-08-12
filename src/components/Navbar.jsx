import React from "react";
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-logo"> Accessibility Analyser </div>
            <ul className="nav-links">
                <li>
                    <NavLink to="/" end
        activeclassname="active">
            Home
        </NavLink>
                </li>
                <li>
                    <NavLink to="/analyser"
        activeclassname="active">
            Analyse Text
        </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;