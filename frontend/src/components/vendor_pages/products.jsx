
import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';
import { Link } from 'react-router-dom';
import { VendorNav } from './vendor_nav';

export class Products extends React.Component{

        ordersRepository = new OrdersRepository(); 

    state = {
        products: []
        
    }

    render(){
        return <>
        <VendorNav> </VendorNav>
        <div className = "container py-3">
        <h2>  Products </h2>
        <table className = "table table-condensed table-striped">
        <thead>
            <tr>
                <th> Product </th>
                <th> Details </th>
                <th> Regular Price </th>
                <th> Discount Price </th>
                <th> On Discount </th>
                <th> Update </th> 

                <th>&nbsp;</th>
            </tr>
        </thead>

        <tbody>
        {
            this.state.products.map((product) =>(
                <tr key={product.ProductID}>
                            <td>
                                {product.ProductName}
                            </td>
                            <td>
                            {product.Details}
                            </td>
                            <td>
                            ${ product.CurrentPrice}
                            </td>
                            <td>
                            ${product.DiscountPrice}
                            </td>
                            <td>
                            {product.IsDiscount ? 'yes' : 'no'}
                            </td>
                            <td>
                            <Link to={'editproduct/' + product.ProductID}  className="btn btn-primary">Update</Link>
                            </td> 

                        </tr>

            ))

        } 
        </tbody>       
        
    </table> 

        </div>
        </> 
    }

    componentDidMount() {
        this.ordersRepository.getProductsForVendor(4)
            .then(products => this.setState({products}));
        //const orderId = +this.props.match.params.orderId;
        //console.log(orderId);
        /*if (orderId) {
            this.ordersRepository.getOrderProducts(orderId)
                .then(orderDetails => this.setState({orderDetails: orderDetails}));
        }*/
    }
}