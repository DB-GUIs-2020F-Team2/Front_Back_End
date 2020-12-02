import axios from 'axios';

export class ContractorRepo{
    
    url = 'http://3.137.192.24:8000';
   // url = 'http://localhost:8000';
    config = {

    };
    
    getDirectory(){
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

    getProjectsC(ContractorID){
        return new Promise((resolve,reject) =>{
            axios.get(`${this.url}/project_contractorC/`, {params: {ContractorID}}, this.config)
                .then(x => {
                    resolve(x.data.data);
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
                    resolve(x.data.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getContracts(ContractorID){
        return new Promise((resolve,reject) =>{
            axios.get(`${this.url}/contractC/`,{params: {ContractorID}},this.config)
                .then(x => {
                    resolve(x.data.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getUserByID(userID){
        return new Promise((resolve,reject) =>{
            axios.get(`${this.url}/getUserByID/${userID}`, this.config)
                .then(x => {
                    resolve(x.data.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getAllContracts(){
        return new Promise((resolve,reject) =>{
            axios.get(`${this.url}/contracts`,this.config)
                .then(x => {
                    resolve(x.data.data);
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
                    resolve(x.data.data);
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
                    resolve(x.data.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getOrders(id){
        return new Promise((resolve,reject) =>{
            axios.get(`${this.url}/project_order/${id}`)
                .then(x => {
                    resolve(x.data.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    }

    getBids(){
        return new Promise((resolve,reject) =>{
            axios.get(`${this.url}/bids`, this.config)
            .then(x => {
                resolve(x.data.data);
            })
            .catch(x => {
                alert(x);
                reject(x);
            })
    })
}

getOrderProducts(orderId) {
    return new Promise((resolve, reject) => {
        axios.get(`${this.url}/orders_full/${orderId}`, this.config)
        .then(x => resolve(x.data.data))
        .catch(e => {
            alert(e);
            reject();
        });
    });
}


    registerUser(UserName, email, contact, password, department ){
        return new Promise((resolve,reject) =>{

            let iv = 1;

            axios.post(`${this.url}/registerUser`,{
                "UserName": UserName,
                "HashPass": password,
                "ContactInfo": contact,
                "InformationVis": iv,
                "Email": email,
                "UserType": department
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

    updateUser(UserName, email, contact, password, UserID ){
        return new Promise((resolve,reject) =>{
            alert("updated");
            axios.put(`${this.url}/UpdateUser`,{
                "UserName": UserName,
                "HashPass": password,
                "ContactInfo": contact,
                "Email": email,
                "UserID": UserID
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

    updateStatus(status, id ){
        return new Promise((resolve,reject) =>{

            axios.put(`${this.url}/UpdatePStatus`,{
                "ProjectStatus": status,
                "ProjectID": id
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

}