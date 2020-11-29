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
                                <th>Purchase</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.props.orders.data.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>ID</td>
                                            <td>name</td>
                                            <td>quant</td>
                                            <td>$price</td>
                                            <td>$dis price</td>
                                            <td><button>Buy</button></td>
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