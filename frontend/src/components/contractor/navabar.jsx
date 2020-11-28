import React, { Component } from 'react';

class Navbar extends React.Component{
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
            <a className="navbar-brand p-2" href="#">Project Tracker</a> 
            </nav>

            //href takes you back to home page 
        );
    }
}

export default Navbar;