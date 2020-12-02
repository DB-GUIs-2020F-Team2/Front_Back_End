import React, { Component } from 'react';
import NavBar from './navabar.jsx';
import { ContractorRepo } from '../../API/contractorRepo';

export class Profile extends Component {

    contractorRepo = new ContractorRepo();

    state = {
        users :[],
        name: '',
        email: '',
        password: '',
        contact: '',
        readOnly: true
         }

    onEdit(){
        this.setState({
            readOnly: false
        });
    }



    onSubmit(){
        if(this.state.name){
            this.handleChangeName();
        }

        if(this.state.email){
            this.handleChangeEmail();
        }

        if(this.state.contact){
            this.handleChangeInfo();
        }

        if(this.state.password){
            this.handleChangePass();
        }
        this.forceUpdate();
        this.contractorRepo.updateUser(this.state.users[0].UserName, this.state.users[0].Email, this.state.users[0].ContactInfo, this.state.users[0].HashPass, localStorage.getItem('UserID'));

        this.setState({
            name: '',
            email: '',
            password: '',
            contact: '',
            readOnly: true
        });

        
        
    }   

    

    handleChangeName(){
        let users = [...this.state.users];
        const name = this.state.name;
        let user = {
            ...this.state.users[0],
            UserName: name
        };
        users[0] = user;
        this.setState({users: users});
        this.forceUpdate();
        
    }

    handleChangeEmail(){
        let users = [...this.state.users];
        const email = this.state.email;
        let user = {
            ...this.state.users[0],
            Email: email
        };
        users[0] = user;
        this.setState({users: users});
        this.forceUpdate();
        
    }

    handleChangeInfo(){
        let users = [...this.state.users];
        const contact = this.state.contact;
        let user = {
            ...this.state.users[0],
            ContactInfo: contact
        };
        users[0] = user;
        this.setState({users: users});
        this.forceUpdate();
        
    }

    handleChangePass(){
        let users = [...this.state.users];
        const password = this.state.password;
        let user = {
            ...this.state.users[0],
            HashPass: password
        };
        users[0] = user;
        this.setState({users: users});
        this.forceUpdate();
        
    }


    render() { 
        return ( 
            <div>
                <NavBar/>
                <form className = "m-3">
                {this.state.users.map((x,i) => 
                    <div key = {i}>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                    <label htmlFor="name">User Name</label>
                                    <input type="text" className="form-control" id = "name"
                                        readOnly={true}
                                        value ={x.UserName}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                    <label htmlFor="name"></label>
                                    <input type="text" className="form-control" id = "name"
                                        readOnly={this.state.readOnly}
                                        value = {this.state.name}
                                        onChange= { 
                                            event => {this.setState({ name: event.target.value})
                                        }     
                                        }/> 
                            </div>  
                         </div>     
                    </div>

                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="phoneNumber">Contact Info</label>
                                    <input type="text" className="form-control" id = "phoneNumber"
                                        readOnly={true}
                                        value ={x.ContactInfo}
                                        />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                        <label htmlFor="phoneNumber"></label>
                                        <input type="text" className="form-control" id = "phoneNumber"
                                            readOnly={this.state.readOnly}
                                            value = {this.state.contact}
                                            onChange= { 
                                                event => {this.setState({ contact: event.target.value})
                                            }     
                                            }/> 
                                </div> 
                            </div>
                        </div>    

                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" id = "email"
                                        readOnly={true}    
                                        value ={x.Email}
                                        />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group">
                                        <label htmlFor="email"></label>
                                        <input type="text" className="form-control" id = "email"
                                            readOnly={this.state.readOnly}
                                            value = {this.state.email}
                                            onChange= { 
                                                event => {this.setState({ email: event.target.value})
                                            }     
                                            }/> 
                                </div> 
                            </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" id = "password"
                                readOnly={true}
                                value ={x.HashPass}
                                />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                                <label htmlFor="password"></label>
                                <input type="text" className="form-control" id = "password"
                                    readOnly={this.state.readOnly}
                                    value = {this.state.password}
                                    onChange= { 
                                        event => {this.setState({ password: event.target.value})
                                    }     
                                    }/> 
                        </div> 
                    </div>
                </div>
                    </div>
                )}
            
                </form>

                <div className = "row m-3">
                    <button
                        disabled = {!this.state.readOnly} 
                        className="btn btn-primary btn-md m-3"
                        onClick = {() => this.onEdit()}>
                        Edit
                    </button>

                    <button 
                        disabled = {this.state.readOnly} 
                        className="btn btn-primary btn-md m-3"
                        onClick = {() => this.onSubmit()}>
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
            .then(x => this.setState({users : x}));

    }


}
 