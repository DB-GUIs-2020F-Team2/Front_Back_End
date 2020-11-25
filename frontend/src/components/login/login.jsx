import React, { Component } from 'react';
import LoginForm from './loginForm'
import Header from './header'
import "./login.css"

export class Login extends Component {
    state = {  
    }
    render() { 
        return ( 
            <React.Fragment>

                <div>
                        <Header />
                </div>
                <div className = "jumbotron jumbotron-fluid bg mb-0">
                    <div className = "container-fluid">
                        <LoginForm />
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
 
export default Login;