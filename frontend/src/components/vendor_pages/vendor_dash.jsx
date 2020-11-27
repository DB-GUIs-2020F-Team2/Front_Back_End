import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';
import { OrdersList } from './orders_list';
import { Order } from '../../models/order';

export class VendorDashboard extends React.Component{

        ordersRepository = new OrdersRepository(); 

    state = {
        orders: []
        
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