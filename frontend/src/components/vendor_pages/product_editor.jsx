import React from 'react';
import {OrdersRepository} from '../../API/ordersRepo';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { VendorNav } from './vendor_nav';

// referenced AccountEditor.jsx. Need to add ordersRepository 
export class ProductEditor  extends React.Component {

    ordersRepository = new OrdersRepository(); 

state = {
        id: -1, 
        Details:'',
        IsDiscount:-1,
        product:''
        
}

    onSave(){
        if(this.state.id){
            this.ordersRepository.updateProduct(this.state.id, this.state.IsDiscount, this.state.Details)
                .then(()=>{
                alert('Product updated!');
                this.setState({ redirect: '/products'});
            });
        } else{
            // nothing else 
        }

    } // end onSave()


    render(){
        return <>
        <VendorNav> </VendorNav> 
        <form className = "container pt-3">
        <h1> Product Editor
        </h1> 

         <label htmlFor="details"> <b>Details:</b> </label>
                        <textarea 
                            className="form-control" 
                            name="details" 
                            rows="1"
                            value={this.state.Details}
                            onChange={ e => { this.setState({ Details: e.target.value }) }}
                            placeholder={this.state.Details}
                        ></textarea>    

            <hr />
            <br />

            <label for="discount">Set on Discount:</label>
                <select id='discount' className = "ml-3" value={ this.state.IsDiscount === 1 ? 'yes' : 'no' } onChange={ e => this.setState({ IsDiscount: e.target.value === 'yes'? 1: 0 })}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                </select>
            <div>
                <button type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => this.onSave()}>
                    Save
                </button>
                <Link className="btn btn-secondary btn-block" to="/products">Return to Products</Link>
    
            </div>



        </form>
        </>; 
    }

     componentDidMount() {
        const productId = +this.props.match.params.productId;
        this.setState({id: productId}); 
        if (productId) {
            this.ordersRepository.getProduct(productId)
                .then(product => this.setState({Details: product[0].Details, IsDiscount: product[0].IsDiscount, product:product}));
        }

    }
}