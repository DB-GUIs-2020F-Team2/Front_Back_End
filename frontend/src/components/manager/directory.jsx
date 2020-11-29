import React, { Component } from 'react';

class Directory extends Component {
    state = {  }
    render() { 
        return (
            <div className="container">
                <h3 className = 'row justify-content-around'>
                    <button className = 'btn col-4 btn-success'>All</button>
                    <button className = 'btn col-4 btn-success'>Vendor</button>
                    <button className = 'btn col-4 btn-success'>Contractor</button>
                </h3>
                <div className = "col align-self-center">
                    
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Contact Info</th>
                                <th>Email</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.props.directory.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.UserID}</td>
                                            <td>{item.UserName}</td>
                                            <td>{item.ContactInfo}</td>
                                            <td>{item.Email}</td>
                                            <td>{item.UserType}</td>
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