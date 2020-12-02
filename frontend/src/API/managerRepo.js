import axios from 'axios'

export class ManagerRepo {

    url = 'http://3.137.192.24:8000';
    //url = 'http://localhost:8000';
    config = {

    };

    dateCheck(month,day){
        //console.log(month,' ',day)
        if(day>31 && month == 0 | 2 | 4 | 6 | 7 | 9 | 11){
            return ""+(month+1)+'-'+(day-31)
        }
        else if(day>30){
            return ""+(month+1)+'-'+(day-30)
        }
        else{
            return ""+(month)+'-'+(day)
        }
     }

    getDate(daysFromToday){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();; //January is 0!
        var yyyy = today.getFullYear();
        
        dd=dd+daysFromToday
        //console.log(dd)
        return (""+yyyy+'-'+ this.dateCheck(mm+1,dd))
     }

    getDirectory(){
        console.log(`${this.url}/getUser`)
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
    } ///deleteProject/:id

    deleteProject(id){
        console.log(`${this.url}/deleteProject/id=${id}`)
        return new Promise((resolve,reject) =>{
            axios.delete(`${this.url}/deleteProject/id=${id}`, this.config)
                .then(x => {
                    resolve(x.data.data);
                })
                .catch(x => {
                    alert(x);
                    reject(x);
                })
        })
    } 

    deleteOrder(id){
        return new Promise((resolve,reject) =>{
            axios.delete(`${this.url}/order/`, {
                "OrderID": id
                })
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
            axios.get(`${this.url}/orders/before/${date}`,this.config)
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

    newProject(name,Id,type){
        //ProjectName, ApplyDate, ExpireDate, ProjectStatus, ProjectType, ManagerID

        let ad = this.getDate(0)
        let ed = this.getDate(7)
        let vid = 'In progress'

        return new Promise((resolve,reject) =>{
            axios.post(`${this.url}/postProject`,{
                "ProjectName": name,
                "ApplyDate": ad,
                "ExpireDate": ed,
                "ProjectStatus": vid,
                "ProjectType": type,
                "ManagerID": Id
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