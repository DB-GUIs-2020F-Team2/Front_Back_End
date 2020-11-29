import React, { Component } from 'react';

class Products extends Component {
    state = {  }

    isDiscounted(disc){
        if(disc === 0){
            return "True"
        }
        else{
            return 'False'
        }
    }

    render() { 
        return (  
            <div className="container">
                <div className = "col align-self-center">
                    
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Current Price</th>
                                <th>Discount Price</th>
                                <th>Details</th>
                                <th>Is Discounted</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.props.products.data.map(item => {
                            console.log("item " + item);
                            //console.log(this.props.match.params.id)
                                return (
                                    <tr>
                                        <td>{item.ProductID}</td>
                                        <td>{item.ProductName}</td>
                                        <td>${item.CurrentPrice}</td>
                                        <td>${item.DiscountPrice}</td>
                                        <td>{item.Details}</td>
                                        <td>{this.isDiscounted(item.IsDiscount)}</td>
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