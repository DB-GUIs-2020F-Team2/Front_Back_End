import React, { Component } from 'react';
import './header.css'

class Header extends Component {
    state = {  };

    changeView(view){
        this.props.changer(view);
    };

    render() { 
        return (

            <div className = "container-fluid banner p-1">
                <h1>
                    <div className = "row justify-content-md-center">
                        <h1 className = "col-3 p-2 m-2 align-self-start">Project Tracker</h1>
                        <button type="button" className = "btn btn-warning col-1 m-2 p-2" onClick = {() => this.changeView(0)}>History</button>
                        <button type="button" className = "btn btn-warning col-1 m-2 p-2" onClick = {() => this.changeView(1)}>Products</button>
                        <button type="button" className = "btn btn-warning col-1 m-2 p-2" onClick = {() => this.changeView(2)}>Directory</button>
                        <button type="button" className = "btn btn-warning col-1 m-2 p-2" onClick = {() => this.changeView(3)}>Projects</button>
                        <button type="button" className = "btn btn-warning col-1 m-2 p-2" onClick = {() => this.changeView(4)}>Contracts</button>
                        <button type="button" className = "btn btn-warning col-1 m-2 p-2" onClick = {() => this.changeView(5)}>Calendar</button>
                    </div>
                </h1>
            </div>

          );
    }
}
 
export default Header;