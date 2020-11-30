import React, { Component } from 'react';
import NavBar from './navabar.jsx'

export class Project extends Component {
    state = {
        project: 'Tank',
        contact: '209382999'
     }
    render() { 
        return ( 
            <div>
                <NavBar/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Projects</h2>
                <table class="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Project</th>
                    <th scope="col">contact info</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{this.state.project}</td>
                    <td>{this.state.contact}</td>
                    <td><button className = "btn-primary">update</button></td>
                    </tr>
                </tbody>
                </table>
            </div>
            /////// In a table ////////
            // ROW : Project | Contact info | Update button
            // api calls - get projects, get contacts
            // update button -> update page
         );
    }
}
