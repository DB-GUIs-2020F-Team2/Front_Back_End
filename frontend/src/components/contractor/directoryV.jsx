import React, { Component } from 'react';
import NavBar from './navabar.jsx'
import { ContractorRepo } from '../../API/contractorRepo'
import {Link} from "react-router-dom";

export class DirectoryV extends Component {

    contractorRepo = new ContractorRepo();
    state = { 
        vendors: []
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
                        <Link to='/directoryC'  className="dropdown-item">Contractor</Link>
                    </div>
                </div>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Vendor Directory</h2>
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
                    {this.state.vendors.map((x,i) =>
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
          );
    }

    componentDidMount() {
        
        this.contractorRepo.getVendors()
            .then(x => this.setState({ vendors: x }));

        console.log(this.state.vendors);
    }
}
