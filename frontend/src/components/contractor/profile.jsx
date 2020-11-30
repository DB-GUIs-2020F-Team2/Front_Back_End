import React, { Component } from 'react';
import NavBar from './navabar.jsx';
import { ContractorRepo } from '../../API/contractorRepo';

export class Profile extends Component {

    contractorRepo = new ContractorRepo();

    state = {
        user :[],
        name:'',
        phoneNumber: '',
        email: '',
        password: '',
        readOnly: true
         }

    onEdit(){
        this.setState({
            readOnly: false
        });
    }

    onSubmit(){
        this.setState({
            readOnly: true
        });
    }


    render() { 
        return ( 
            <div>
                <NavBar/>
                <form className = "m-3">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id = "name"
                            readOnly={this.state.readOnly}
                            value ={this.state.name}
                            onChange= { event => this.setState({ name: event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" className="form-control" id = "phoneNumber"
                            readOnly={this.state.readOnly}
                            value ={this.state.phoneNumber}
                            onChange= { event => this.setState({ phoneNumber: event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" id = "email"
                            readOnly={this.state.readOnly}    
                            value ={this.state.email}
                            onChange= { event => this.setState({ email: event.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="text" className="form-control" id = "password"
                            readOnly={this.state.readOnly}
                            value ={this.state.password}
                            onChange= { event => this.setState({ password: event.target.value})}/>
                    </div>
                </form>

                <div className = "row m-3">
                    <button
                        disabled = {!this.state.readOnly} 
                        className="btn btn-primary btn-md m-3"
                        onClick = {() => {this.onEdit()}}>
                        Edit
                    </button>

                    <button 
                        disabled = {this.state.readOnly} 
                        className="btn btn-primary btn-md m-3"
                        onClick = {() => {this.onSubmit()}}>
                        Submit
                    </button>
                </div>
            </div>

            /////// On page ////////
            // First Name, Last name, email, phone number, passwords
            // api calls - get profile
            // edit button -> edit any info on page
         );
    }componentDidMount(){
        
        const id = localStorage.getItem('UserID');

        this.contractorRepo.getUserByID(id)
            .then(x => this.setState({user : x}));

    }


}
 