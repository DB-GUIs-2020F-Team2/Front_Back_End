import React, { Component } from 'react';

class Directory extends Component {
    state = {  }
    render() { 
        return (
            <div className="container">
                <div className = "col align-self-center">
                    
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Contact Info</th>
                                <th>Email</th>
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
 
export default Directory;