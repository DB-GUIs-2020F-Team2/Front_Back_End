import React, { Component } from 'react';
import './directory.css'
import NavBar from './navabar.jsx'
import { ContractorRepo } from '../../API/contractorRepo'
import {Link} from "react-router-dom";


export class Directory extends Component {

    contractorRepo = new ContractorRepo();

    state = { 
        directory: [],
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
                        <Link to='/directoryC'  className="dropdown-item">Contractor</Link>
                        <Link to='/directoryV'  className="dropdown-item">Vendor</Link>
                    </div>
                </div>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Directory</h2>
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

/* 

        

 <button className="btn btn-primary" onClick = {this.onClickC}>Contractor</button>
                    <button className="btn btn-primary" onClick = {this.onClickV}>Vendor</button>
        
             <div className = {this.onVeiwC}>
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Contact Info</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.contractors.map((x,i) =>
                            <tr key = {i}>
                            <td>{x.UserName}</td>
                            <td>{x.ContactInfo}</td>
                            <td>{x.Email}</td>
                            <td>{x.UserType}</td>
                            </tr>
                    )}
                 
                </tbody>
             </div>

             <div className = {this.onVeiwV}>
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Contact Info</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.vendors.map((x,i) =>
                            <tr key = {i}>
                            <td>{x.UserName}</td>
                            <td>{x.ContactInfo}</td>
                            <td>{x.Email}</td>
                            <td>{x.UserType}</td>
                            </tr>
                    )}
                 
                </tbody>
             </div>



*/