import React, { Component } from 'react';

class Products extends Component {
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
                                <th>Quantity</th>
                                <th>Current Price</th>
                                <th>Discount Price</th>
                                <th>Details</th>
                                <th>Is Discounted</th>
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
 
export default Products;