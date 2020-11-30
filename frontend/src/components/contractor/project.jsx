import React, { Component } from 'react';
import NavBar from './navabar.jsx';
import { ContractorRepo } from '../../API/contractorRepo';

export class Project extends Component {

    contractorRepo = new ContractorRepo();

    state = {
        myProjects: [],
        projects: []
     }
    render() { 
        return ( 
            <div>
                <NavBar/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">My Projects</h2>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Project Type</th>
                    <th scope="col">Project Status</th>
                    <th scope="col">Date Started</th>
                    <th scope="col">Date Expire</th>
                    </tr>
                </thead>
                <tbody>

                 {this.state.myProjects.map((x,i) =>
                            <tr key = {i}>
                            <td>{x.ProjectType}</td>
                            <td>{x.ProjectStatus}</td>
                            <td>{x.ApplyDate}</td>
                            <td>{x.ExpireDate}</td>
                            <td><button className = "btn-primary">update</button></td>
                            </tr>
                    )}
                </tbody>
                </table>


                <br/>
                <br/>
                <br/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light"> All Projects</h2>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Project Type</th>
                    <th scope="col">Project Status</th>
                    <th scope="col">Date Started</th>
                    <th scope="col">Date Expire</th>
                    </tr>
                </thead>
                <tbody>

                 {this.state.projects.map((x,i) =>
                            <tr key = {i}>
                            <td>{x.ProjectType}</td>
                            <td>{x.ProjectStatus}</td>
                            <td>{x.ApplyDate}</td>
                            <td>{x.ExpireDate}</td>
                            <td><button className = "btn-primary">Details</button></td>
                            </tr>
                    )}
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
            .then(x => this.setState({myProjects : x}));
        
        this.contractorRepo.getProjects()
            .then(x => this.setState({projects : x}));

    }
}
