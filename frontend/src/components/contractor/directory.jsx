import React, { Component } from 'react';
import NavBar from './navabar.jsx'
import { ContractorRepo } from '../../API/contractorRepo'


export class Directory extends Component {

    contractorRepo = new ContractorRepo();

    state = { 
        directory: []
     }
    render() { 
        return ( 
            <div>
                <NavBar/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Contractor Directory</h2>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Contact Info</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.directory.map((x,i) =>
                            <tr key = {i}>
                            <td>{x.UserName}</td>
                            <td>{x.ContactInfo}</td>
                            <td>{x.Email}</td>
                            <td>{x.UserType}</td>
                            </tr>
                    )}
                    
                </tbody>
                </table>
            </div>

            /////// In a table ////////
            // ROW : Contractor Name | Contact info
            // api calls - get contractors, get contacts
         );
    }

    componentDidMount() {
        this.contractorRepo.getDirectory()
            .then(x => this.setState({directory : x}));
    }
}