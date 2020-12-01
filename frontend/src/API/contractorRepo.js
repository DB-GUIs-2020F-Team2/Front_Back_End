import axios from 'axios';

export class ContractorRepo{

    url = 'http://localhost:8000';
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

}