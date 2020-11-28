import axios from 'axios'

export class ManagerRepo {

    getDirectory(){
        return new Promise((resolve,reject) =>{
            axios.get('http://localhost:8000/directory')
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
            axios.get('http://localhost:8000/orders',date)
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
            axios.get('http://localhost:8000/contracts')
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
            axios.get('http://localhost:8000/getPastOrders',date)
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
            axios.get('http://localhost:8000/projects')
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