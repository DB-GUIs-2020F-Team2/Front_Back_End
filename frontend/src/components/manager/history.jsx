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
                                <th>Apply Date</th>
                                <th>Expire Date</th>
                                <th>Vendor ID</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.props.orders.data.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.OrderID}</td>
                                            <td>{item.OrderStatus}</td>
                                            <td>{item.ApplyDate}</td>
                                            <td>{item.ExpireDate}</td>
                                            <td>{item.VendorID}</td>
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
 
export default History;