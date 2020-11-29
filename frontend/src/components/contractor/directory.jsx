import React, { Component } from 'react';
import NavBar from './navabar.jsx'

export class Directory extends Component {
    state = { 
        name:'Wyatt',
        phoneNumber: '911',
        email: 'who dat'
     }
    render() { 
        return ( 
            <div>
                <NavBar/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Contractor Directory</h2>
                <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Email</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{this.state.name}</td>
                    <td>{this.state.phoneNumber}</td>
                    <td>{this.state.email}</td>
                    </tr>
                </tbody>
                </table>
            </div>

            /////// In a table ////////
            // ROW : Contractor Name | Contact info
            // api calls - get contractors, get contacts
         );
    }
}
 
export default Directory;