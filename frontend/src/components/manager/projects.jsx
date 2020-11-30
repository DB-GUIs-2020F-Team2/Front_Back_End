import React, { Component } from 'react';

class Projects extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
                <div className = "col align-self-center">
                    
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Project Name</th>
                                <th>Apply Date</th>
                                <th>Expire Date</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Manager in Charge</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                        {this.props.projects.data.map(item => {
                            console.log("item " + item);
                            //console.log(this.props.match.params.id)
                                return (
                                    <tr>
                                        <td>{item.ProjectID}</td>
                                        <td>{item.ProjectName}</td>
                                        <td> {String(item.ApplyDate).substring(5,7) + '/' + String(item.ApplyDate).substring(8,10) +'/' + String(item.ApplyDate).substring(0,4)} </td>
                                        <td>{String(item.ExpireDate).substring(5,7) + '/' + String(item.ExpireDate).substring(8,10) +'/' + String(item.ExpireDate).substring(0,4)}</td>
                                        <td>{item.ProjectStatus}</td>
                                        <td>{item.ProjectType}</td>
                                        <td>{item.ManagerID}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
         );
    }
}
 
export default Projects;