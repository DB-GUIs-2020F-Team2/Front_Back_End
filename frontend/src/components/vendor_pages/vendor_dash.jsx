import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';
import { OrdersList } from './orders_list';
import { Order } from '../../models/order';
import { VendorNav } from './vendor_nav';

export class VendorDashboard extends React.Component{

        ordersRepository = new OrdersRepository(); 

    state = {
        orders: []
        
    }

    render(){
        return <>
        <VendorNav> </VendorNav> 
        <div className = "container py-3">
            <h1>Vendor Dashboard </h1> 
            <OrdersList Orders = { this.state.orders}  />
        </div> 
        </> 
    }

    componentDidMount() {
        // change to getting orders based on vendor id 
        console.log(localStorage.getItem('UserID')); // is indeed correct 
        //this.ordersRepository.getOrdersForVendor(localStorage.getItem('UserID'))
        //.then(orders=>this.setState({orders}));
        this.ordersRepository.getOrders()
        .then(orders=>this.setState({orders}));
    }
}