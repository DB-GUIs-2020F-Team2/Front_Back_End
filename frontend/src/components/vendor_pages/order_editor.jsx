import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';
import { Link } from 'react-router-dom';

// referenced AccountEditor.jsx. Need to add ordersRepository 
export class OrderEditor  extends React.Component {

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

    onSave(){
        if(this.state.id){
            this.ordersRepository.updateOrder(this.state.id, this.state)
                .then(()=>{
                alert('Order updated!');
                this.setState({ redirect: '/vendor'});
            });
        } else{
            // nothing else 
        }

    } // end onSave()


    render(){
        return <form className = "container pt-3">
        <h1> Order Editor
        </h1> 

        <div className="form-group">
                <label htmlFor="isShipped">
                    <input type="checkbox"
                        id="isShipped"
                        name="isShipped"
                        checked={this.state.shipped}
                        onChange={event => this.setState({ shipped: event.target.checked })} />
                        Shipped
                    </label>
            </div>

        <div className="form-group">
            <label htmlFor="isCompleted">
                    <input type="checkbox"
                        id="isCompleted"
                        name="isCompleted"
                        checked={this.state.completed}
                        onChange={event => this.setState({ completed: event.target.checked })} />
                        Completed
                </label>
            </div>

            <hr />
            <br />
            <div>
                <button type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => this.onSave()}>
                    Save
                </button>
                <Link className="btn btn-secondary btn-block" to="/vendor">Return to List</Link>
            </div>



        </form>;
    }

     componentDidMount() {
        const orderId = +this.props.match.params.orderId;
        // console.log(orderId);
        this.setState({id: orderId}); 
        /*if (accountId) {
            this.accountsRepository.getOrder(orderId)
                .then(account => this.setState(account));
        }*/

    }
}