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
                            {this.props.directory.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>ID</td>
                                            <td>name</td>
                                            <td>quant</td>
                                            <td>$price</td>
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
 
export default Directory;