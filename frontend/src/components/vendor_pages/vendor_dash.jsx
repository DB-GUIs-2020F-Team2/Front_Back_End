import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';
import { OrdersList } from './orders_list';
import { Order } from '../../models/order';

export class VendorDashboard extends React.Component{

        ordersRepository = new OrdersRepository(); 

    state = {
        orders: [new Order(1,"Sue", 10, "Y", null, -1,{"one":5, "four":2, "twenty one": 1}),
            new Order(2,"Bob", 9, "N", "N", -1,"dictionary also"), new Order(3,"Julianna", 15, "N", "N", -1,"dictionary too")],
        
    }

    render(){
        return <div className = "container py-3">
            <h1>Vendor Dashboard </h1> 
            <OrdersList Orders = { this.state.orders}  />
        </div> 
    }

    componentDidMount() {
        this.ordersRepository.getOrders()
        .then(orders=>this.setState({orders}));
    }
}