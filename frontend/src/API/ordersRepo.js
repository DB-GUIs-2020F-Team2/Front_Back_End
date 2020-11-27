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
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders_full/vendor/${id}`, this.config)
                .then(x => resolve(x.data))
                .catch(x => {
                    alert(x);
                    reject(x);
                });
        });
    }

    getOrderProducts(orderId) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders_full/${orderId}`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                console.log(e);
                reject();
            });
        });
    }

    //called in order_editor 
    updateOrder(id, order) {
        return new Promise((resolve, reject) => {
            axios.put(`${this.url}/order/${id}`, order, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
                reject();
            });
        });
    }


}