import React from 'react';
import { Link } from 'react-router-dom';
import './order_list.css';

export const OrdersList = props => 
    <>

    <p> hello </p> 

    
    <h2>  Current Orders </h2>
    <table className = "table table-condensed table-striped">
        <thead>
            <tr>
                <th>Customer</th>
                <th>Date Placed</th>
                <th> Shipped </th>
                <th>Completed </th> 
                <th> Details </th> 
                <th> Update</th>
                <th>&nbsp;</th>
            </tr>
        </thead>

        <tbody>
        {

                props.Orders.map(order =>               
                    !order.completed && 
                        <tr key={order.id}>
                            <td>
                                {order.OrderStatus}
                            </td>
                            <td>{order.datePlaced}</td>
                            <td> {order.shipped ? 'Yes' : 'No'} </td>
                            <td>{order.completed ? 'Yes' : 'No'} </td>

                            <td>
                            <Link to={'details/' + order.id}  className="btn btn-primary">Details</Link>
                            </td>
                            <td>
                            <Link to={'edit/' + order.id}  className="btn btn-primary" onShipped={ () => this.onShippedClicked(order)}>Update</Link>
                            </td>
                        </tr>)
                    
                    
                
            }
            </tbody>       
        
    </table> 
    




    <h2> Past Orders </h2> 
    <table className = "table table-condensed table-striped">
        <thead>
            <tr>
                <th>Customer</th>
                <th>Date Completed</th>
                <th> Invoice / Details </th>
                <th>&nbsp;</th>
            </tr>
        </thead>

        <tbody>
            {
                props.Orders.map(order =>
                    order.completed && <tr key={order.id}>
                        <td>
                            {order.customer}
                        </td>
                        <td>{order.dateCompleted}</td>
                        <td>
                        <Link to={'details/' + order.id}  className="btn btn-primary">Details</Link>
                        </td> 

                    </tr>)
            }
        </tbody>
        
    </table> 

    </>

