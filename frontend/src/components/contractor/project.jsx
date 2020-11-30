import React, { Component } from 'react';
import NavBar from './navabar.jsx'
import { ContractorRepo } from '../../API/contractorRepo'

export class Project extends Component {

    contractorRepo = new ContractorRepo();

    state = {
        user: [],
        projects: []
     }
    render() { 
        return ( 
            <div>
                <NavBar/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Projects</h2>
                <table className="table table-hover">
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
    
    componentDidMount(){
        
        const id = localStorage.getItem('UserID');

        this.contractorRepo.getProjectsC(id)
            .then(x => this.setState({user : x}));

            const ids = this.state.user.ProjectID;

            this.contractorRepo.getProjects(ids)
                .then(x => this.setState({projects : x}));
    }
}
