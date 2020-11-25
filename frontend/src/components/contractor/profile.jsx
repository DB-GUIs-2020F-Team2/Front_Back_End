import React, { Component } from 'react';
import NavBar from './navabar.jsx'

class Profile extends Component {
    state = {
        name:'Wyatt',
        phoneNumber: '911',
        email: 'whas@gmail.com',
        password: '*******'
         }
    render() { 
        return ( 
            <div>
                <NavBar/>
                <div className="card">
                    <h5 className="card-header">Profile</h5>
                    <div className="card-body">
                        <h5 className="list-group-item">Name: {this.state.name}</h5>
                        <h5 className="list-group-item">Phone Number: {this.state.phoneNumber}</h5>
                        <h5 className="list-group-item">Email: {this.state.email}</h5>
                        <h5 className="list-group-item">Password: {this.state.password}</h5>
                        <button className="btn btn-primary">Edit</button>
                    </div>
                </div>

            </div>

            /////// On page ////////
            // First Name, Last name, email, phone number, passwords
            // api calls - get profile
            // edit button -> edit any info on page
         );
    }
}
 
export default Profile;