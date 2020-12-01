import React, { Component } from 'react';
import "./loginForm.css"
import { sha256 } from 'js-sha256';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { LoginRepo } from '../../API/loginRepo';

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

    login() {
        var d = new Date();
        let pass = this.state.password;
        let lr = new LoginRepo()
        pass = sha256(pass);
        lr.loginUser(this.state.username,this.state.password,this.state.userType).then(x => {
            this.setState({ redirect: x.data });
            console.log(this.state.redirect[0].UserName)
            if(this.state.redirect[0].UserName != "NULL" && this.state.userType.toLowerCase() == this.state.redirect[0].UserType.toLowerCase()){
                localStorage.setItem('UserType', this.state.redirect[0].UserType);
                localStorage.setItem('UserID', this.state.redirect[0].UserID);
                window.location.replace(`http://3.137.192.24:3000/${this.state.userType}`);
            }
            else{
                alert("Login Failed");
                window.location.replace("http://3.137.192.24:3000/login/")
            }
            
        });
        

    }

    makeButton(){
        if (this.state.userType === '') {
            return (
                <div>
                    <button type = "button" className="btn btn-dark button login disabled buttonPadding">Login</button>
                </div>
            )
        }
        else if (this.state.userType === 'Manager' && this.state.username) {
            return (
                <div>
                    <button type = "button" className="btn btn-dark button login buttonPadding" onClick ={() => this.login()}>Login</button>
                </div>
            )
        }
        else if (this.state.userType === 'Contractor' && this.state.username) {
            return (
                <div>
                    <button type = "button" className="btn btn-dark login button buttonPadding" onClick ={() => this.login()}>Login</button>

                </div>
            )
        }
        else if (this.state.userType === 'Vendor' && this.state.username) {
            return (
                <div>
                    <button type = "button" className="btn btn-dark login button buttonPadding" onClick ={() => this.login()}>Login</button>

                </div>
            )
        }
        else{
            return (
                <div>
                    <button type = "button" className="btn btn-dark button login disabled buttonPadding">Login</button>
                </div>
            )
        }
    }

    render() { 
        return (  
            <div className = "row-12 align-self-center">
                <div id = "loginForm" className = "mt-5 mb-5 border bg-white container-fluid col-7 align-self-center">
                    <h2 className = "p-2 banner">Login</h2>
                    <form className = "form">
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
                                <option value = ''></option>
                                <option value = 'Manager'>Manager</option>
                                <option value = 'Contractor'>Contractor</option>
                                <option value = 'Vendor'>Vendor</option>
                            </select>
                        </div>
                        <div id = 'loginButton' className = ''>
                    {this.makeButton()}
 
                </div>

                    </form>
                </div>
            </div>
        );
    }
}
 
export default LoginForm;