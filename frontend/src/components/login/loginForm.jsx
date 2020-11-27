import React, { Component } from 'react';
import "./loginForm.css"
import { sha256 } from 'js-sha256';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class LoginForm extends Component {

    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            userType: '',
            redirect: ''
        }
        this.login = this.login.bind(this)
    }

    getUsername(e){
        var value = e.target.value;
        this.setState({username: value})
    }

    getPassword(e){
        var value = e.target.value;
        this.setState({password: value})
    }

    failedLogin(){
        alert('Login Failed, try again')
        this.setState({redirect: false})
    }

    goodLogin(){
        alert('Welcome')
        this.setState({redirect: true})
    }

    login() {
        let pass = this.state.password;
        pass = sha256(pass);
        axios.post('http://localhost:8000/verifyUser', {username: this.state.username, password: pass})
                    .then(response => {
                        if (response.data === 0) {
                            this.failedLogin()
                        }
                        else {
                            console.log(response.data)
                            this.goodLogin(response.data)
                        }
        })

    }

    render() { 
        return (  
            <div className = "row-12 align-self-center">
                <div id = "loginForm" className = "mt-5 mb-5 border bg-white container-fluid col-7 align-self-center">
                    <h2 className = "p-2 banner">Login</h2>
                    <form className = "" action = "http://localhost:3000/manager">
                        <div className = "">
                            <label htmlFor = "username" className = "m-2">Username</label>
                            <input type = "text" id = "username" onChange = {(e) => this.setState({username: e.target.value})}></input>
                        </div>
                        <div>
                            <label htmlFor = "password" className = "m-2">Password </label>
                            <input type = "password" onChange = {(e) => this.setState({password: e.target.value})}></input>
                        </div>
                        <div className = "">
                            <label htmlFor = "usertype" className = "m-2">Department</label>
                            <select type = "text" id = "usertype" onChange = {(e) => this.setState({userType: e.target.value})}>
                                <option value = 'Manager'>Manager</option>
                                <option value = 'Contractor'>Contractor</option>
                                <option value = 'Vendor'>Vendor</option>
                            </select>
                        </div>
                        <div>
                            <button type = "button" className = "submit m-2 login" onClick = {this.login}>Login</button>
                                
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
 
export default LoginForm;