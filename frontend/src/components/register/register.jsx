import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './register.css'
import { ContractorRepo } from '../../API/contractorRepo'

export class Register extends Component {
    
    contractorRepo = new ContractorRepo();

    state = { 
        userName: '',
        password: '',
        name: '',
        department: '',
        phoneNumber: '',
        email: ''
     }
     handleSubmit(){
         if(this.state.userName && this.state.email && this.state.password && this.state.department && this.state.phoneNumber){
            this.contractorRepo.registerUser(this.state.userName, this.state.email, this.state.phoneNumber, this.state.password, this.state.department)
            alert(this.state.name + ' has been registered')
         }

         else{
            alert("Incomplete User, Please Fill out all fields");
         }
     }


    render() { 

        return (  
            <React.Fragment>
                 <div className = "container-fluid banner p-1">
                    <div className = "row justify-content-md-center text-center ">
                        <h3 className = "text-center align-self-start">Tanks</h3>
                </div>
                </div>
                <div className = "register jumbotron">
                    <header className = "display-4 text-center font-weight-bold text-white mt-5">New Account</header>
                    <div className="card-fluid col-8 mt-4 mx-auto">
                            <div className="row justify-content-center">
                            <div className= "form-group col-5 font-weight-bold text-white">
                                <label htmlFor = "UserName">User Name: </label>
                                <input 
                                    type = "text" 
                                    className = "form-control"
                                    value ={this.state.userName}
                                    onChange= { event => this.setState({ userName: event.target.value})}/>  
                            </div>

                            <div className= "form-group col-5 font-weight-bold text-white">
                                <label htmlFor = "Password">Password: </label>
                                <input 
                                    type = "password" 
                                    className = "form-control "
                                    value ={this.state.password}
                                    onChange= { event => this.setState({ password: event.target.value})}/>  
                            </div>
                            </div>

                        <div className="row justify-content-center">
                            <div className= "form-group col-3 font-weight-bold text-white">
                                <label htmlFor = "Name">Your Name:</label>
                                <input 
                                    type = "text" 
                                    className = "form-control"
                                    value ={this.state.name}
                                    onChange= { event => this.setState({ name: event.target.value})}/>  
                            </div>

                            
                        

                        <div className= "form-group col-3 font-weight-bold text-white">
                            <label htmlFor = "phoneNumber">Phone Number:</label>
                            <input 
                                type = "text" 
                                className = "form-control"
                                value ={this.state.comment}
                                onChange= { event => this.setState({ phoneNumber: event.target.value})}/>
                        </div>

                        <div className= "form-group col-3 font-weight-bold text-white">
                            <label htmlFor = "email">Email:</label>
                            <input 
                                type = "text" 
                                className = "form-control"
                                value ={this.state.comment}
                                onChange= { event => this.setState({ email: event.target.value})}/>
                        </div>

                        <div className= "form-group col-3 font-weight-bold text-white">
                                <label htmlFor = "department">Department:</label> 
                                <select 
                                    name="department" 
                                    id="department" 
                                    className="form-control"
                                    value={this.state.department}
                                    onChange= { event => this.setState({ department: event.target.value})}>

                                    <option value="none"></option>
                                    <option value="vendor">Vendor</option>
                                    <option value="manager">Manager</option>
                                    <option value="contractor">Contractor</option>
                                
                                </select>
                                

                            </div>
                        </div> 

                        <div className = "row justify-content-center">
                        <Link to='/login'  className="btn btn-primary" onClick ={() => this.handleSubmit()} >Register</Link>
                            
                        </div>
                    </div>

                        
                </div>
            </React.Fragment>
                
        );
    }
}
 
