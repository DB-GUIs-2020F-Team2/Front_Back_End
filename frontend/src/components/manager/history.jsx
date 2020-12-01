import React, { Component } from 'react';
import { ManagerRepo } from '../../API/managerRepo';

class History extends Component {
    state = {  }

    deleteOrder(id){
        MR = ManagerRepo()
        MR.deleteOrder(id)
        alert('Order '+ id + ' has been deleted')
    }

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
                                <th>Delete</th>
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
                                            <td><button className = 'btn btn-danger' onClick = {() => this.deleteOrder(item.OrderID)}>Delete Order</button></td>
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