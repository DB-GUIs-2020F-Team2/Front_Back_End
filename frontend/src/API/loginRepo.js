import axios from 'axios'

export class LoginRepo {

    loginUser(username, password){
        return new Promise((resolve,reject) =>{
            axios.post('http://localhost:8000/loginUser', username, password)
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