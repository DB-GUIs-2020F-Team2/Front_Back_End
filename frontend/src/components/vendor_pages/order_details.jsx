import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';


export class OrderDetails extends React.Component {

ordersRepository = new OrdersRepository(); 

state = {
        orderDetails: []
}

    render(){


        return <div>
        {
            this.state.orderDetails.map((order) =>(
                <p>
                    {order.Amount}
                    {order.ProductName}
                    {order.CurrentPrice}
                </p>

            ))

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