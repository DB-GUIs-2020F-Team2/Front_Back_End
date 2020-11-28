// just a holder for now :))))) 

import React from 'react';

export class Products extends React.Component{

        //ordersRepository = new OrdersRepository(); 

    state = {
        orders: []
        
    }

    render(){
        return <div className = "container py-3">
            <h1>Products </h1> 
        </div> 
    }

    componentDidMount() {
        //this.ordersRepository.getOrders()
        //.then(orders=>this.setState({orders}));
    }
}