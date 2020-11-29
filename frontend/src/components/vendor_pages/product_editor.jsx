import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';
import { Link } from 'react-router-dom';

// referenced AccountEditor.jsx. Need to add ordersRepository 
export class ProductEditor  extends React.Component {

    ordersRepository = new OrdersRepository(); 

state = {
        id: 0, 
        whateverElse:''
}

    onSave(){
        if(this.state.id){
            this.ordersRepository.updateOrder(this.state.id, this.state.OrderStatus)
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
        <h1> Product Editor
        </h1> 

         <label htmlFor="orderUpdate"> <b>Order Status:</b> </label>
                        <textarea 
                            className="form-control" 
                            name="orderStatus" 
                            rows="1"
                            value={this.state.OrderStatus}
                            onChange={ e => { this.setState({ OrderStatus: e.target.value }) }}
                            placeholder=""
                        ></textarea>    

            <hr />
            <br />
            <div>
                <button type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => this.onSave()}>
                    Save
                </button>
                <Link className="btn btn-secondary btn-block" to="/vendor">Return to List</Link>
    }
            </div>



        </form>;
    }

     componentDidMount() {
        const productId = +this.props.match.params.productId;
        // console.log(orderId);
        this.setState({id: productId}); 

    }
}