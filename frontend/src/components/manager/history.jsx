import React, { Component } from 'react';

class History extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
                <div className = "col align-self-center">
                    
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
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
 
export default History;