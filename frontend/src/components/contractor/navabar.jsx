import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component{
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
             <Link to ='/' className="text-light">Project Tracker</Link>  
             <h5 className= "text-light">  /  </h5> 
             <Link to ='/contractor' className="text-light">Contractor</Link> 
            </nav>

            //href takes you back to home page 
        );
    }
}

export default Navbar;