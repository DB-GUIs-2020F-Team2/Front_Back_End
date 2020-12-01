import React, { Component } from 'react';

class Directory extends Component {
    constructor(){
        super()
        
    }
    state = { 
        userType: 0,
        list:[]
     }

     newList(listNum){
         if(listNum ===0){
            this.setState({list: this.props.directory})
         }
         else if(listNum === 1){
            this.setState({list: this.props.vendors.data})
         }
         else{
            this.setState({list: this.props.contractors.data})
         }
         this.forceUpdate()
     }

     startUp(){
         if(this.state.list == []){
            this.setState({list: this.props.directory})
            this.forceUpdate()
         }
     }

    render() { 
        return (
            <div className="container">
                <h3 onLoad = {() => this.startUp()} className = 'row justify-content-around'>
                    <button className = 'btn col-4 btn-success' onClick = {() => this.newList(0)}>All</button>
                    <button className = 'btn col-4 btn-success' onClick = {() => this.newList(1)}>Vendor</button>
                    <button className = 'btn col-4 btn-success' onClick = {() => this.newList(2)}>Contractor</button>
                </h3>
                <div className = "col align-self-center">
                    
                    <table className = "table table-striped table-responsive-md">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Contact Info</th>
                                <th>Email</th>
                                <th>Title</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.list.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.UserID}</td>
                                            <td>{item.UserName}</td>
                                            <td>{item.ContactInfo}</td>
                                            <td>{item.Email}</td>
                                            <td>{item.UserType}</td>
                                        </tr>
                                    );
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
          );
    }
}
 
export default Directory;