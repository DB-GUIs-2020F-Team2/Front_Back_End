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
    

}