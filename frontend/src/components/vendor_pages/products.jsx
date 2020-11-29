
import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';

export class Products extends React.Component{

        ordersRepository = new OrdersRepository(); 

    state = {
        products: []
        
    }

    render(){
        return <div>
        <h2>  Products </h2>
        <table className = "table table-condensed table-striped">
        <thead>
            <tr>
                <th> Product </th>

                <th>&nbsp;</th>
            </tr>
        </thead>

        <tbody>
        {
            this.state.products.map((product) =>(
                <tr key={product.ProductID}>
                            <td>
                                {product.ProductID}
                            </td>
                        </tr>

            ))

        } 
        </tbody>       
        
    </table> 

        </div>
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