import axios from 'axios'

export class ManagerRepo {

    config = {

    };

    getDirectory(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/getUser', this.config)
                .then(x => {
                    resolve(x.data.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getOrders(date){
        return new Promise((resolve,reject) =>{
            axios.get(`http://localhost:8000/orders_full/date/${date}`,this.config)
                .then(x => {
                    resolve(x.data.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getProducts(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/products')
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getContracts(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/contracts',this.config)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getPastOrders(date){ //send todays date
        return new Promise((resolve,reject) =>{
            axios.get(`http://localhost:8000/orders_full/before/${date}'`,this.config)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getProjects(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/getProjects',this.config)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getVendors(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/getProjects',this.config)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getContractors(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/getProjects',this.config)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

}