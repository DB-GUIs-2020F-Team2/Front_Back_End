import React from 'react';
import { Link } from 'react-router-dom';
import './order_list.css';

export const OrdersList = props => 
    <>

    <h2 className = "text-white">  Current Orders </h2>
    <table className = "table table-condensed table-striped">
        <thead>
            <tr>
                <th> Order ID </th>
                <th>Order Status</th>
                <th> Apply Date </th>
                <th> Expire Date </th> 
                <th> Details </th> 
                <th> Update</th>
                <th>&nbsp;</th>
            </tr>
        </thead>

        <tbody>
        {

                props.Orders.map(order =>               
                    !order.completed && 
                        <tr key={order.OrderID}>
                            <td>
                                {order.OrderID}
                            </td>
                            <td>{order.OrderStatus}</td>

                            
                            <td> {String(order.ApplyDate).substring(5,7) + '/' + String(order.ApplyDate).substring(8,10) +'/' + String(order.ApplyDate).substring(0,4)} </td>
                            <td>{String(order.ExpireDate).substring(5,7) + '/' + String(order.ExpireDate).substring(8,10) +'/' + String(order.ExpireDate).substring(0,4)}</td>

                            <td>
                            <Link to={'details/' + order.OrderID}  className="btn btn-primary">Details</Link>
                            </td>
                            <td>
                            <Link to={'edit/' + order.OrderID}  className="btn btn-primary" onShipped={ () => this.onShippedClicked(order)}>Update</Link>
                            </td>
                        </tr>)
                    
                    
                
            }
            </tbody>       
        
    </table> 
    

    <h2 className = "text-white"> Past Orders </h2> 
    <table className = "table table-condensed table-striped">
        <thead>
            <tr>
                <th> Order ID </th>
                <th> Order Status</th>
                <th> Apply Date </th>
                <th> Expire Date </th> 
                <th> Details </th> 
                <th>&nbsp;</th>
            </tr>
        </thead>

        <tbody>
            {
                props.Orders.map(order =>
                    order.completed && <tr key={order.Order.ID}>
                        <td>
                            {order.OrderID}
                        </td>
                        <td>{order.OrderStatus}</td>

                            
                        <td> {String(order.ApplyDate).substring(5,7) + '/' + String(order.ApplyDate).substring(8,10) +'/' + String(order.ApplyDate).substring(0,4)} </td>
                        <td>{String(order.ExpireDate).substring(5,7) + '/' + String(order.ExpireDate).substring(8,10) +'/' + String(order.ExpireDate).substring(0,4)}</td>

                        <td>
                        <Link to={'details/' + order.OrderID}  className="btn btn-primary">Details</Link>
                        </td>

                    </tr>)
            }
        </tbody>
        
    </table> 

    </>

