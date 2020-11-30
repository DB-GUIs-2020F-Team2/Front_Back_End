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

    getProjects(id){
        return new Promise((resolve,reject) =>{
            axios.get(`${this.url}/getProject/${id}`, this.config)
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