import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';
import { Link } from 'react-router-dom';
import { VendorNav } from './vendor_nav';


export class OrderDetails extends React.Component {

ordersRepository = new OrdersRepository(); 

state = {
        orderDetails: [],
        orderSum: ''
}

    getPrice(currPrice, discountPrice, isDiscounted)
    {
        if(isDiscounted === 1){
            return discountPrice;
        }
        else{
            return currPrice;
        }

    }

    render(){


        return <>
        <VendorNav> </VendorNav> 
        <div className = "container pt-3">
        <h1>  Order Details </h1>
        <table className = "table table-condensed table-striped">
        <thead>
            <tr>
                <th> Product </th>
                <th>Details</th>
                <th> Quantity </th>
                <th> Price </th> 
                <th> Cost </th> 

                <th>&nbsp;</th>
            </tr>
        </thead>

        <tbody>
        {
            this.state.orderDetails.map((order) =>(
                <tr key={order.Order_ProductID}>
                            <td>
                                {order.ProductName}
                            </td>
                            <td>{order.Details}</td>

                            
                            <td> {order.Amount} </td>
                            <td> ${this.getPrice(order.CurrentPrice, order.DiscountPrice, order.IsDiscount)}</td>

                            <td> ${ this.getPrice(order.CurrentPrice, order.DiscountPrice, order.IsDiscount) * order.Amount}</td>
                        </tr>

            ))

        } 
        </tbody>       
        
    </table> 
    <p> {this.state.orderSum.cost}</p>
    <Link className="btn btn-secondary btn-block" to="/vendor">Return to Orders</Link>
        </div> 
        </>
    }

     componentDidMount() {
        const orderId = +this.props.match.params.orderId;
        console.log(orderId);
        // console.log(orderId);
        //this.setState({id: orderId}); 
        if (orderId) {
            this.ordersRepository.getOrderProducts(orderId)
                .then(orderDetails => this.setState({orderDetails: orderDetails}));

            this.ordersRepository.getOrderSum(orderId)
                .then(order => this.setState({orderSum: order}));

            console.log(this.state.orderSum.cost); 
            
        }
    }
}