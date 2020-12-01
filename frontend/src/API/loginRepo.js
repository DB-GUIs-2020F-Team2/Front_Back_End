import axios from 'axios'

export class LoginRepo {

    url = 'http://3.137.192.24:8000';

    loginUser(username, password, userType){
        return new Promise((resolve,reject) =>{
            axios.post(`${this.url}/verifyUser`, {
                "UserName": username,
                "HashPass": password,
                "UserType": userType
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