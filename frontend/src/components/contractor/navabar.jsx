import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component{
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
             <Link to ='/' className="text-light"><h5>Tanks</h5></Link>  
             <div className= "text-light m-3"><h5>|</h5></div> 
             <Link to ='/contractor' className="text-light"><h5>Contractor</h5></Link> 
            </nav>

            //href takes you back to home page 
        );
    }
}

export default Navbar;