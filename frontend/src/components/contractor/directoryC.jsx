import React, { Component } from 'react';
import NavBar from './navabar.jsx'
import { ContractorRepo } from '../../API/contractorRepo'
import {Link} from "react-router-dom";

export class DirectoryC extends Component {

    contractorRepo = new ContractorRepo();
    state = { 
        contractors: [],
        myProjects: []
     }

     loadProjects(id){
        this.contractorRepo.getProjectsC(id)
        .then(x => this.setState({myProjects : x}));
     }

     veiwProjects(id){
         this.loadProjects(id);

         return (
            <div>
                {this.state.myProjects.map((x,i) =>
                            <tr key = {i}>
                            <td>{x.ProjectType}</td>
                            <td>{x.ProjectStatus}</td>
                            <td>{x.ApplyDate}</td>
                            <td>{x.ExpireDate}</td>
                            </tr>
                    )}
            </div>
         );
     }

    render() { 
        return (
            <div>
                <NavBar/>
                <div className="dropdown align-self-center m-3">
                    <button className="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Type of Directory
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to='/directory'  className="dropdown-item">All</Link>
                        <Link to='/directoryV'  className="dropdown-item">Vendor</Link>
                    </div>
                </div>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Contractor Directory</h2>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Contact Info</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type</th>
                    <th scope="col">Projects</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.contractors.map((x,i) =>
                            <tr key = {i}>
                            <td>{x.UserName}</td>
                            <td>{x.ContactInfo}</td>
                            <td>{x.Email}</td>
                            <td>{x.UserType}</td>
                            <button className = "btn btn-sm btn-primary" onClick= {() => this.veiwProjects(x.UserID)}>Projects</button>
                            </tr>                        
                    )}
                 
                </tbody> 

                </table>
                
                <br></br>
                <br></br>
                
                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Projects</h2>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope= "cole">Project Name</th>
                    <th scope="col">Project Type</th>
                    <th scope="col">Project Status</th>
                    <th scope="col">Date Started</th>
                    <th scope="col">Date Expire</th>
                    </tr>
                </thead>
                <tbody>

                 {this.state.myProjects.map((x,i) =>
                            <tr key = {i}>
                            <td>{x.ProjectName}</td>
                            <td>{x.ProjectType}</td>
                            <td>{x.ProjectStatus}</td>
                            <td> {String(x.ApplyDate).substring(5,7) + '/' + String(x.ApplyDate).substring(8,10) +'/' + String(x.ApplyDate).substring(0,4)} </td>
                            <td>{String(x.ExpireDate).substring(5,7) + '/' + String(x.ExpireDate).substring(8,10) +'/' + String(x.ExpireDate).substring(0,4)}</td>
                            </tr>
                    )}
                </tbody>
                </table>
            </div>
          );
    }

    componentDidMount() {
            
        this.contractorRepo.getContractors()
            .then(x => this.setState({ contractors: x }));
        console.log(this.state.contractors);
    }
}
