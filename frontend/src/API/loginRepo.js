import axios from 'axios'

export class LoginRepo {

    loginUser(username, password, userType){
        return new Promise((resolve,reject) =>{
            axios.post('http://localhost:8000/verifyUser', {
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