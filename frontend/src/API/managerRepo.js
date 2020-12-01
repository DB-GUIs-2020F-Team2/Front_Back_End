import axios from 'axios'

export class ManagerRepo {

    url = '3.137.192.24:8000';
    //url = 'http://localhost:8000';
    config = {

    };

    getDirectory(){
        console.log(this.url)
        return new Promise((resolve,reject) =>{
            axios.get(`${this.url}/getUser`, this.config)
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
            axios.get(`${this.url}/orders_full/date/${date}`,this.config)
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
            axios.get(`${this.url}/products`)
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
            axios.get(`${this.url}/contracts`,this.config)
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
            axios.get(`${this.url}/orders_full/before/${date}`,this.config)
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
            axios.get(`${this.url}/getProjects`,this.config)
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
            axios.get(`${this.url}/getUserType/?UserType=vendor`)
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
            axios.get(`${this.url}/getUserType/?UserType=contractor`)
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    newOrder(os,ad,ed,vid){
        return new Promise((resolve,reject) =>{
            axios.post(`${this.url}/orders/`,{
                "OrderStatus": os,
                "ApplyDate": ad,
                "ExpireDate": ed,
                "VendorID": vid
              })
                .then(x => {
                    resolve(x.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    searchForProjectOrders(projectID){
        return new Promise((resolve,reject) =>{
            axios.get(`${this.url}/project_order/${projectID}`)
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