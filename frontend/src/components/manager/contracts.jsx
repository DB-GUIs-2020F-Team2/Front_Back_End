import React, { Component } from 'react';

class Contracts extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
                <div className = "col align-self-center">
                    
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Details</th>
                                <th>Highest Bidder</th>
                                <th>Contractor</th>
                                <th>Paid For?</th>
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
 
export default Contracts;