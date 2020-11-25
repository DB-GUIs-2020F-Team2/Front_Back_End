// referenced AccountsRepository.js 
// how do we filter what to show by who is loggin in?? eg. by the specific logged in vendor in my case??? 

import axios from 'axios';

export class OrdersRepository{

    // SET UP ALL OF THIS 
    url = 'http://localhost:3000'; //set up!!!!!!!!!! referenced my team's GUI from last year 
    config = {
        headers:{

        }
    };

    // called in vendor_dash
    getOrders() {
        return new Promise((resolve, reject) => {
            axios.get(`${this.url}/orders`, this.config)
            .then(x => resolve(x.data))
            .catch(e => {
                alert(e);
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