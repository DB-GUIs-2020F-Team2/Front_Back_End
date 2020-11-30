import React from 'react';
import { Link} from 'react-router-dom';

export const VendorNav = props => <>

        <nav className = "navbar navbar-expand bg-dark navbar-dark">
        <ul className = "navbar-nav">
            <li className = "nav-item btn btn-link">
                <Link to = "/vendor" className = "text-white"> Orders </Link>
            </li>
            <li className = "navbar-nav btn btn-link">
                <Link to = "/products" className = "text-white"> Products </Link>
            </li>
        </ul>
    </nav>
</>;
    
