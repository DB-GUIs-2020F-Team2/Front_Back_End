import React, { Component } from 'react';
import './calendar.css'
import {ManagerRepo} from '../../API/managerRepo';

class Control extends Component {
    state = { 
        view: 0,
        searchVal: '',
        searchResults: [],
        day0: [],
        day1: [],
        day2: [],
        day3: [],
        day4: [],
        day5: [],
        day6: [],
        products: []
     }

     dateCheck(month,day){
        //console.log(month,' ',day)
        if(day>30 && month == 0 | 2 | 4 | 6 | 7 | 9 | 11){
            return ""+(month+1)+'-'+(day-30)
        }
        else if(day>31){
            return ""+(month+1)+'-'+(day-31)
        }
        else{
            return ""+(month)+'-'+(day)
        }
     }

     ordersFor(view){
         if(view < 7){
            return this.getDate(view)
         }
         else{
             return "search results"
         }
        
     }

     getDate(daysFromToday){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();; //January is 0!
        var yyyy = today.getFullYear();
        
        dd=dd+daysFromToday
        //console.log(dd)
        return (""+yyyy+'-'+ this.dateCheck(mm+1,dd))
     }

     componentDidMount(){
        let managerRepo = new ManagerRepo()
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();//January is 0!
        var yyyy = today.getFullYear();



        managerRepo.getOrders(""+yyyy+'-'+ this.dateCheck(mm+1,dd)).then(x => {
            this.setState({ day0: x });
        });
        managerRepo.getOrders(""+yyyy+'-'+ this.dateCheck(mm+1,dd+1)).then(x => {
            this.setState({ day1: x });
        });
        managerRepo.getOrders(""+yyyy+'-'+ this.dateCheck(mm+1,dd+2)).then(x => {
            this.setState({ day2: x });
        });
        managerRepo.getOrders(""+yyyy+'-'+ this.dateCheck(mm+1,dd+3)).then(x => {
            this.setState({ day3: x });
        });
        managerRepo.getOrders(""+yyyy+'-'+ this.dateCheck(mm+1,dd+4)).then(x => {
            this.setState({ day4: x });
        });
        managerRepo.getOrders(""+yyyy+'-'+ this.dateCheck(mm+1,dd+5)).then(x => {
            this.setState({ day5: x });
        });
        managerRepo.getOrders(""+yyyy+'-'+ this.dateCheck(mm+1,dd+6)).then(x => {
            this.setState({ day6: x });
        });
        managerRepo.getProducts().then(x => {
            this.setState({ products: x });
        });
    }

    updateView = (viewPane) => {
        this.setState({view: viewPane}); //if failure change teh wording here
        this.forceUpdate();
        //console.log(this.state.view)
        return;
    }

    searching(projectID){
        let managerRepo = new ManagerRepo()
        let ID = parseInt(projectID)
        console.log(ID)
        managerRepo.searchForProjectOrders(ID).then(x => {
            this.setState({ searchResults: x });
            this.updateView(7)
        });
        
    }

    discountPricing(discounted, cp,dp){
        if(discounted === 1){
            return dp
        }
        else{
            return cp
        }
    }

    render() { 
        console.log(this.state.view)
        return ( 
            <div className="container">
                <div className = "col align-self-center">
                    <h2 className = 'row justify-content-around'>
                        <button className = ' btn col-1 btn-success' onClick = {() => this.updateView(0)}>Today</button>
                        <button className = ' btn col-1 btn-success' onClick = {() => this.updateView(1)}>1 Day from Now</button>
                        <button className = ' btn col-1 btn-success' onClick = {() => this.updateView(2)}>2 Days from Now</button>
                        <button className = ' btn col-1 btn-success' onClick = {() => this.updateView(3)}>3 Days from Now</button>
                        <button className = ' btn col-1 btn-success' onClick = {() => this.updateView(4)}>4 Days from Now</button>
                        <button className = ' btn col-1 btn-success' onClick = {() => this.updateView(5)}>5 Days from Now</button>
                        <button className = ' btn col-1 btn-success' onClick = {() => this.updateView(6)}>6 Days from Now</button>
                        <form>
                            <input type="text" placeholder="Search a Project ID.." name="search" onChange = {(e) => this.setState({searchVal: e.target.value})}></input>
                            <button type = 'button' className = 'btn btn-light' onClick = {() => this.searching(this.state.searchVal)}>Search</button>
                        </form>
                    </h2>
                    <div className="container">
                        <h4 className = 'bg-warning'>Orders for {this.ordersFor(this.state.view)}</h4>
                        {this.changeView()}
                    </div>

                </div>
            </div>
         );
    }

    changeView(){
        if(this.state.view == -1){
            return (
                <React.Fragment>
                </React.Fragment>
            )
        }
        else if(this.state.view == 0){
            return (
                this.state.day0.length === 0 ? <p className = 'bg-light'>No orders for this day</p> :
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>Project ID</th>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                                <th>Product ID</th>
                                <th>Amount</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day0.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.ProjectID}</td>
                                            <td>{item.OrderID}</td>
                                            <td>{item.OrderStatus}</td>
                                            <td> {String(item.ApplyDate).substring(5,7) + '/' + String(item.ApplyDate).substring(8,10) +'/' + String(item.ApplyDate).substring(0,4)} </td>
                                            <td>{String(item.ExpireDate).substring(5,7) + '/' + String(item.ExpireDate).substring(8,10) +'/' + String(item.ExpireDate).substring(0,4)}</td>
                                            <td>{item.VendorID}</td>
                                            <td>{item.ProductID}</td>
                                            <td>{item.Amount}</td>
                                            <td>{this.discountPricing(item.IsDiscount,item.CurrentPrice,item.DiscountPrice)}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </React.Fragment>
            )
        }
        else if(this.state.view == 1){ 
            return (
                this.state.day1.length === 0 ? <p className = 'bg-light'>No orders for this day</p> :
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>Project ID</th>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                                <th>Product ID</th>
                                <th>Amount</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day1.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.ProjectID}</td>
                                            <td>{item.OrderID}</td>
                                            <td>{item.OrderStatus}</td>
                                            <td> {String(item.ApplyDate).substring(5,7) + '/' + String(item.ApplyDate).substring(8,10) +'/' + String(item.ApplyDate).substring(0,4)} </td>
                                            <td>{String(item.ExpireDate).substring(5,7) + '/' + String(item.ExpireDate).substring(8,10) +'/' + String(item.ExpireDate).substring(0,4)}</td>
                                            <td>{item.VendorID}</td>
                                            <td>{item.ProductID}</td>
                                            <td>{item.Amount}</td>
                                            <td>{this.discountPricing(item.IsDiscount,item.CurrentPrice,item.DiscountPrice)}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </React.Fragment>
            )
        }
        else if(this.state.view == 2){
            return (
                this.state.day2.length === 0 ? <p className = 'bg-light'>No orders for this day</p> :
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>Project ID</th>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                                <th>Product ID</th>
                                <th>Amount</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day2.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.ProjectID}</td>
                                            <td>{item.OrderID}</td>
                                            <td>{item.OrderStatus}</td>
                                            <td> {String(item.ApplyDate).substring(5,7) + '/' + String(item.ApplyDate).substring(8,10) +'/' + String(item.ApplyDate).substring(0,4)} </td>
                                            <td>{String(item.ExpireDate).substring(5,7) + '/' + String(item.ExpireDate).substring(8,10) +'/' + String(item.ExpireDate).substring(0,4)}</td>
                                            <td>{item.VendorID}</td>
                                            <td>{item.ProductID}</td>
                                            <td>{item.Amount}</td>
                                            <td>{this.discountPricing(item.IsDiscount,item.CurrentPrice,item.DiscountPrice)}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </React.Fragment>
            )
        }
        else if(this.state.view == 3){ 
            return (
                this.state.day3.length === 0 ? <p className = 'bg-light'>No orders for this day</p> :
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>Project ID</th>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                                <th>Product ID</th>
                                <th>Amount</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day3.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.ProjectID}</td>
                                            <td>{item.OrderID}</td>
                                            <td>{item.OrderStatus}</td>
                                            <td> {String(item.ApplyDate).substring(5,7) + '/' + String(item.ApplyDate).substring(8,10) +'/' + String(item.ApplyDate).substring(0,4)} </td>
                                            <td>{String(item.ExpireDate).substring(5,7) + '/' + String(item.ExpireDate).substring(8,10) +'/' + String(item.ExpireDate).substring(0,4)}</td>
                                            <td>{item.VendorID}</td>
                                            <td>{item.ProductID}</td>
                                            <td>{item.Amount}</td>
                                            <td>{this.discountPricing(item.IsDiscount,item.CurrentPrice,item.DiscountPrice)}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </React.Fragment>
            )
        }
        else if(this.state.view == 4){ 
            return (
                this.state.day4.length === 0 ? <p className = 'bg-light'>No orders for this day</p> :
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>Project ID</th>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                                <th>Product ID</th>
                                <th>Amount</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day4.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.ProjectID}</td>
                                            <td>{item.OrderID}</td>
                                            <td>{item.OrderStatus}</td>
                                            <td> {String(item.ApplyDate).substring(5,7) + '/' + String(item.ApplyDate).substring(8,10) +'/' + String(item.ApplyDate).substring(0,4)} </td>
                                            <td>{String(item.ExpireDate).substring(5,7) + '/' + String(item.ExpireDate).substring(8,10) +'/' + String(item.ExpireDate).substring(0,4)}</td>
                                            <td>{item.VendorID}</td>
                                            <td>{item.ProductID}</td>
                                            <td>{item.Amount}</td>
                                            <td>{this.discountPricing(item.IsDiscount,item.CurrentPrice,item.DiscountPrice)}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </React.Fragment>
            )
        }
        else if(this.state.view == 5){ 
            return (
                this.state.day5.length === 0 ? <p className = 'bg-light'>No orders for this day</p> :
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>Project ID</th>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                                <th>Product ID</th>
                                <th>Amount</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day5.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.ProjectID}</td>
                                            <td>{item.OrderID}</td>
                                            <td>{item.OrderStatus}</td>
                                            <td> {String(item.ApplyDate).substring(5,7) + '/' + String(item.ApplyDate).substring(8,10) +'/' + String(item.ApplyDate).substring(0,4)} </td>
                                            <td>{String(item.ExpireDate).substring(5,7) + '/' + String(item.ExpireDate).substring(8,10) +'/' + String(item.ExpireDate).substring(0,4)}</td>
                                            <td>{item.VendorID}</td>
                                            <td>{item.ProductID}</td>
                                            <td>{item.Amount}</td>
                                            <td>{this.discountPricing(item.IsDiscount,item.CurrentPrice,item.DiscountPrice)}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </React.Fragment>
            )
        }
        else if(this.state.view == 6){ 
            return (
                this.state.day6.length === 0 ? <p className = 'bg-light'>No orders for this day</p> :
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>Project ID</th>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                                <th>Product ID</th>
                                <th>Amount</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day6.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.ProjectID}</td>
                                            <td>{item.OrderID}</td>
                                            <td>{item.OrderStatus}</td>
                                            <td> {String(item.ApplyDate).substring(5,7) + '/' + String(item.ApplyDate).substring(8,10) +'/' + String(item.ApplyDate).substring(0,4)} </td>
                                            <td>{String(item.ExpireDate).substring(5,7) + '/' + String(item.ExpireDate).substring(8,10) +'/' + String(item.ExpireDate).substring(0,4)}</td>
                                            <td>{item.VendorID}</td>
                                            <td>{item.ProductID}</td>
                                            <td>{item.Amount}</td>
                                            <td>{this.discountPricing(item.IsDiscount,item.CurrentPrice,item.DiscountPrice)}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </React.Fragment>
            )
        }
        else if(this.state.view == 7){ 
            console.log(this.state.searchResults)
            return (                                      
                !this.state.searchResults.data ? <p className = 'bg-light'>No results found</p> :
                <React.Fragment>
                <h4 className = 'bg-light'>Search Results</h4>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>Project ID</th>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                                <th>Product ID</th>
                                <th>Amount</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.searchResults.data.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.ProjectID}</td>
                                            <td>{item.OrderID}</td>
                                            <td>{item.OrderStatus}</td>
                                            <td> {String(item.ApplyDate).substring(5,7) + '/' + String(item.ApplyDate).substring(8,10) +'/' + String(item.ApplyDate).substring(0,4)} </td>
                                            <td>{String(item.ExpireDate).substring(5,7) + '/' + String(item.ExpireDate).substring(8,10) +'/' + String(item.ExpireDate).substring(0,4)}</td>
                                            <td>{item.VendorID}</td>
                                            <td>{item.ProductID}</td>
                                            <td>{item.Amount}</td>
                                            <td>{this.discountPricing(item.IsDiscount,item.CurrentPrice,item.DiscountPrice)}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </React.Fragment>
            )
        }
        else{
            return (
                <div></div>
            )
        }
    }


}
 
export default Control;