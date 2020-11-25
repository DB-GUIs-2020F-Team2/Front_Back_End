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
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Type</th>
                                <th>Manager in Charge</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            
                        </tbody>
                    </table>

                </div>
            </div>
         );
    }
}
 
export default Projects;