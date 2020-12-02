
import axios from 'axios';

export class OrdersRepository{

    url = 'http://3.137.192.24:8000';
    //url = 'http://localhost:8000'; //local host 
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
                .then(x => resolve(x.data.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }
    
    getOrdersForAVendor(id) {
        console.log("in getting orders for vendor");
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/order/vendor/${id}`, this.config)
                .then(x => resolve(x.data.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    //past orders for vendor 
    getPastOrdersForAVendor(id) {
        console.log("in getting past orders for vendor");
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders/vendor/old/${id}`, this.config)
                .then(x => resolve(x.data.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    //current orders for vendor 
    getCurrentOrdersForAVendor(id) {
        console.log("in getting past orders for vendor");
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders/vendor/curr/${id}`, this.config)
                .then(x => resolve(x.data.data))
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


    //addition so we have sum of costs for vendor 
    getOrderSum(orderId) {
            return new Promise((resolve, reject) => {
                axios.get(`${this.url}/order/cost/${orderId}`, this.config)
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

    

    //called in order_editor 
    updateOrder(id, orderStatus) {
        let params = { OrderStatus: orderStatus,
                    OrderID: id}
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/order/status/`, params, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }

    //called in order_editor 
    updateProduct(id, isDiscount, details) {
        let params = { IsDiscount: isDiscount,
                    ProductID: id,
                    Details: details}
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/productdiscountdetails/`, params, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }


}