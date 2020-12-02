import React from 'react';
import { Link} from 'react-router-dom';
import './vendor_nav.css'

export const VendorNav = props => <>

        <nav className = "navbar navbar-expand bg-dark navbar-dark">
        <ul className = "navbar-nav">
            <li className="navbar-text h4" id = "SiteName">
            Tanks 
        </li>
            <li className = " nav-item btn btn-link">
                <Link to = "/vendor" className = "btn btn-warning"> Orders </Link>
            </li>
            <li className = "nav-item btn btn-link">
                <Link to = "/products" className = "btn btn-warning"> Products </Link>
            </li>
        </ul>
    </nav>
</>;
    
