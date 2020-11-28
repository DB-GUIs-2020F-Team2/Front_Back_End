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
                            {this.props.products.map(item => {
                            console.log("item " + item);
                            //console.log(this.props.match.params.id)
                                return (
                                    <tr>
                                        <td>ID</td>
                                        <td>name</td>
                                        <td>quant</td>
                                        <td>$price</td>
                                        <td>$dis price</td>
                                        <td>dets</td>
                                        <td>discounted</td>
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
 
export default Products;