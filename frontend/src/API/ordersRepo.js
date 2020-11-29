// referenced AccountsRepository.js 
// how do we filter what to show by who is loggin in?? eg. by the specific logged in vendor in my case??? 

import axios from 'axios';

export class OrdersRepository{

    // SET UP ALL OF THIS 
    url = 'http://localhost:8000'; //set up!!!!!!!!!! referenced my team's GUI from last year 
    config = {

    };

    // called in vendor_dash
    getOrders() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders`, this.config)
            .then(x => resolve(x.data.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    getOrdersForVendor(id) {
        console.log("in getting orders for vendor");
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders_full/vendor/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    // called in order_details.jsx 
    getOrderProducts(orderId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders_full/${orderId}`, this.config)
            .then(x => resolve(x.data.data))
            .catch(e => {
                alert(e);
                console.log(e);
                reject();
            });
        });
    }


    // called in order_details.jsx 
    getProduct(productId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/product/${productId}`, this.config)
            .then(x => resolve(x.data.data))
            .catch(e => {
                alert(e);
                console.log(e);
                reject();
            });
        });
    }


    // called in products.jsx 
    getProductsForVendor(vendorId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/vendor_product/${vendorId}`, this.config)
            .then(x => resolve(x.data.data))
            .catch(e => {
                alert(e);
                console.log(e);
                reject();
            });
        });
    }

    

    //will be called in order_editor 
    updateOrder(id, orderStatus) {
        let params = { OrderStatus: orderStatus,
                    OrderID: id}
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/order/`, params, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }


}