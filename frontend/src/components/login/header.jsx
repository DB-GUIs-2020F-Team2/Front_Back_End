import React, { Component } from 'react';
import './header.css'

class Header extends Component {
    state = {  }
    render() { 
        return ( 
            <div className = "container-fluid banner p-1">
                <h1>Project Tracker</h1>
            </div>
         );
    }
}
 
export default Header;