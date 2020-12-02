import React, { Component } from 'react';
import NavBar from './navabar.jsx';
import { ContractorRepo } from '../../API/contractorRepo';
import { Link } from 'react-router-dom';

export class Project extends Component {

    contractorRepo = new ContractorRepo();

    state = {
        myProjects: [],
        projects: [],
        details: [],
        orderDetails: []
     }

     loadOrders(id){
        this.contractorRepo.getOrders(id)
        .then(x => this.setState({details : x}));
     }

     getDetails(){
        
        this.state.details.map(x => {
            const orderId = x.OrderID;
         if (orderId) {
                this.contractorRepo.getOrderProducts(orderId)
                    .then(orderDetails => this.setState({orderDetails: orderDetails}));
            }
    }
        )
    
     }

     getPrice(currPrice, discountPrice, isDiscounted)
    {
        if(isDiscounted === 1){
            return discountPrice;
        }
        else{
            return currPrice;
        }

    }

     veiwDetails(id){
        this.loadOrders(id);
        this.getDetails();

        
        

        if(!this.state.details){
            return(
                <div>No Orders Yet</div>
            )
        }
        
     }

    render() { 
        return ( 
            <div>
                <NavBar/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">My Projects</h2>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Project Name</th>
                    <th scope="col">Project Type</th>
                    <th scope="col">Project Status</th>
                    <th scope="col">Date Started</th>
                    <th scope="col">Date Expire</th>
                    </tr>
                </thead>
                <tbody>

                 {this.state.myProjects.map((x,i) =>
                            <tr key = {i}>
                            <td>{x.ProjectName}</td>
                            <td>{x.ProjectType}</td>
                            <td>{x.ProjectStatus}</td>
                            <td> {String(x.ApplyDate).substring(5,7) + '/' + String(x.ApplyDate).substring(8,10) +'/' + String(x.ApplyDate).substring(0,4)} </td>
                            <td>{String(x.ExpireDate).substring(5,7) + '/' + String(x.ExpireDate).substring(8,10) +'/' + String(x.ExpireDate).substring(0,4)}</td>
                            <td><Link to='/projectUpdate'  className="btn btn-primary" >Update</Link></td>
                            </tr>
                    )}
                </tbody>
                </table>


                <br/>
                <br/>
                <br/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">All Projects</h2>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Project Name</th>
                    <th scope="col">Project Type</th>
                    <th scope="col">Project Status</th>
                    <th scope="col">Date Started</th>
                    <th scope="col">Date Expire</th>
                    </tr>
                </thead>
                <tbody>

                 {this.state.projects.map((x,i) =>
                            <tr key = {i}>
                            <td>{x.ProjectName}</td>
                            <td>{x.ProjectType}</td>
                            <td>{x.ProjectStatus}</td>
                            <td> {String(x.ApplyDate).substring(5,7) + '/' + String(x.ApplyDate).substring(8,10) +'/' + String(x.ApplyDate).substring(0,4)} </td>
                            <td>{String(x.ExpireDate).substring(5,7) + '/' + String(x.ExpireDate).substring(8,10) +'/' + String(x.ExpireDate).substring(0,4)}</td>
                            <td><button className = "btn-primary"  onClick= {() => this.veiwDetails(x.ProjectID)}>Details</button></td>
                            </tr>
                    )}
                </tbody>
                </table>


                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Details -- Invoices</h2>
                <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col"> Product </th>
                        <th scope="col">Details</th>
                        <th scope="col"> Quantity </th>
                        <th scope="col"> Price </th> 
                        <th scope="col"> Cost </th> 
                    </tr>
                </thead>
                <tbody>

                {
                    this.state.orderDetails.map((x) =>(
                        <tr key={x.Order_ProductID}>
                                    <td>
                                        {x.ProductName}
                                    </td>
                                    <td>{x.Details}</td>

                                    
                                    <td> {x.Amount} </td>
                                    <td> ${this.getPrice(x.CurrentPrice, x.DiscountPrice, x.IsDiscount)}</td>

                                    <td> ${ this.getPrice(x.CurrentPrice, x.DiscountPrice, x.IsDiscount) * x.Amount}</td>
                                </tr>

                    ))

                } 
                </tbody>
                </table>
            </div>
            /////// In a table ////////
            // ROW : Project | Contact info | Update button
            // api calls - get projects, get contacts
            // update button -> update page
         );
    }
    
    componentDidMount(){
        
        const id = localStorage.getItem('UserID');

        this.contractorRepo.getProjectsC(id)
            .then(x => this.setState({myProjects : x}));
        
        this.contractorRepo.getProjects()
            .then(x => this.setState({projects : x}));

    }
}