import React, { Component } from 'react';
import NavBar from './navabar.jsx';
import { ContractorRepo } from '../../API/contractorRepo';
import { Link } from 'react-router-dom';

export class updateProject extends Component {

    contractorRepo = new ContractorRepo();

    state = {
        myProjects: [],
        status: ''
    }


    onSubmit(){
        
    if(this.state.myProjects){
        this.contractorRepo.updateStatus(this.state.status, this.state.myProjects[0].ProjectID);
    }
        this.setState({
            status: ''
        });

        
    }




    render() {
        return (
         
        <div>
            <NavBar/>
            <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">My Projects</h2>
            <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Project Name</th>
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

            <br/>
            <br/>
            {this.state.myProjects.map((x,i) =>
            <div key = {i}>
            <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="status">Project Status</label>
                                    <input type="text" className="form-control" id = "status"
                                        readOnly={true}
                                        value ={x.ProjectStatus}
                                        />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                        <label htmlFor="status"></label>
                                        <input type="text" className="form-control" id = "status"
                                            value = {this.state.status}
                                            onChange= { 
                                                event => {this.setState({ status: event.target.value})
                                            }     
                                            }/> 
                                </div> 
                            </div>
                        </div> 
                </div>
    
            )}
                         <Link to='/project'  className="btn btn-primary" onClick ={() => this.onSubmit()} >Submit</Link>
        </div>
        );
    }

    componentDidMount(){

        const id = localStorage.getItem('UserID');
        
        this.contractorRepo.getProjectsC(id)
        .then(x => this.setState({myProjects : x}));

    }
}
