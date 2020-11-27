import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';


export class OrderDetails extends React.Component {

ordersRepository = new OrdersRepository(); 

state = {
        id: 0, 
        customer: 0,
        datePlaced: 0,
        shipped :0,
        completed :0,
        dateCompleted : 0,
        productQuantity: 0,
}
    render(){
        return <div>
        Order Details { this.state.id}

        {/*  loop thru contents of dictionary in order object and display 
        for (const property in object) {
            console.log(`${property}: ${object[property]}`);
        }*/   } 
        </div>
    }

     componentDidMount() {
        const orderId = +this.props.match.params.orderId;
        console.log(orderId);
        // console.log(orderId);
        //this.setState({id: orderId}); 
        if (orderId) {
            this.ordersRepository.getOrderProducts(orderId)
                .then(order => this.setState(order));
        }

    }
}