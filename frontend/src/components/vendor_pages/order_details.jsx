import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';


export class OrderDetails extends React.Component {

ordersRepository = new OrdersRepository(); 

state = {
        orderDetails: [],
        products: []
}

    getProducts(){}
    render(){

        for (const orderDetail of this.state.orderDetails)
            {
                var productId = orderDetail.ProductID;
                this.ordersRepository.getProduct(productId).then(x => {orderDetail.product = x[0];
                console.log(x[0]);});                 
            }

        /*this.state.orderDetails.map((order)=>
        (
            order.product = this.ordersRepository.getProduct(order.ProductID))
        )*/
        return <div>
        {
            this.state.orderDetails.map((order) =>(
                <p>
                    {order.Amount}
                    {order.ApplyDate}
                    hi
                    {//order.product.ProductName
                    }
                    
                </p>

            ))
            /*for (const orderDetail of this.state.orderDetails)
            {
                var productId = orderDetail.ProductID;
                var x = ordersRepository.getProduct(productId);
                console.log(x);                 
            }*/
        } 

        </div>
    }

     componentDidMount() {
        const orderId = +this.props.match.params.orderId;
        console.log(orderId);
        // console.log(orderId);
        //this.setState({id: orderId}); 
        if (orderId) {
            this.ordersRepository.getOrderProducts(orderId)
                .then(orderDetails => this.setState({orderDetails: orderDetails}));
        }

    }
}