import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';
import { OrdersList } from './orders_list';
import { Order } from '../../models/order';
import { VendorNav } from './vendor_nav';

export class VendorDashboard extends React.Component{

        ordersRepository = new OrdersRepository(); 

    state = {
        pastorders: [],
        currorders: []
        
    }

    render(){
        return <>
        <VendorNav> </VendorNav> 
        <div className = "container py-3">
            <h1>Orders </h1> 
            <OrdersList CurrentOrders = { this.state.currorders} PastOrders = {this.state.pastorders} />
        </div> 
        </> 
    }

    componentDidMount() {

        console.log(localStorage.getItem('UserID')); // is indeed correct 
        this.ordersRepository.getPastOrdersForAVendor(localStorage.getItem('UserID'))
        .then(pastorders=>this.setState({pastorders}));

        this.ordersRepository.getCurrentOrdersForAVendor(localStorage.getItem('UserID'))
        .then(currorders=>this.setState({currorders}));
    }
}