import React, { Component } from 'react';
import './calendar.css'
import {ManagerRepo} from '../../API/managerRepo';

class Control extends Component {
    state = { 
        view: -2,
        day0: [],
        day1: [],
        day2: [],
        day3: [],
        day4: [],
        day5: [],
        day6: [],
        products: []
     }

     componentDidMount(){
        let managerRepo = new ManagerRepo()
        var d = new Date();
        var n = d.getDate();

        managerRepo.getOrders(n).then(x => {
            this.setState({ day0: x });
        });
        managerRepo.getOrders(n+1).then(x => {
            this.setState({ day1: x });
        });
        managerRepo.getOrders(n+2).then(x => {
            this.setState({ day2: x });
        });
        managerRepo.getOrders(n+3).then(x => {
            this.setState({ day3: x });
        });
        managerRepo.getOrders(n+4).then(x => {
            this.setState({ day4: x });
        });
        managerRepo.getOrders(n+5).then(x => {
            this.setState({ day5: x });
        });
        managerRepo.getOrders(n+6).then(x => {
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

    render() { 
        return ( 
            <div className="container">
                <div className = "col align-self-center">
                    <h2 className = 'row'>
                        <button className = ' btn col-1' onClick = {() => this.updateView(0)}>Today</button>
                        <button className = ' btn col-1' onClick = {() => this.updateView(1)}>1</button>
                        <button className = ' btn col-1' onClick = {() => this.updateView(2)}>2</button>
                        <button className = ' btn col-1' onClick = {() => this.updateView(3)}>3</button>
                        <button className = ' btn col-1' onClick = {() => this.updateView(4)}>4</button>
                        <button className = ' btn col-1' onClick = {() => this.updateView(5)}>5</button>
                        <button className = ' btn col-1' onClick = {() => this.updateView(6)}>6</button>
                        <input className = 'form-control col-2' type="text" placeholder="Search.."></input>
                    </h2>
                    <div className="container">
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
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day0.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>ID</td>
                                            <td>name</td>
                                            <td>quant</td>
                                            <td>$price</td>
                                            <td>$dis price</td>
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
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day1.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>ID</td>
                                            <td>name</td>
                                            <td>quant</td>
                                            <td>$price</td>
                                            <td>$dis price</td>
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
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day2.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>ID</td>
                                            <td>name</td>
                                            <td>quant</td>
                                            <td>$price</td>
                                            <td>$dis price</td>
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
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day3.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>ID</td>
                                            <td>name</td>
                                            <td>quant</td>
                                            <td>$price</td>
                                            <td>$dis price</td>
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
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day4.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>ID</td>
                                            <td>name</td>
                                            <td>quant</td>
                                            <td>$price</td>
                                            <td>$dis price</td>
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
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day5.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>ID</td>
                                            <td>name</td>
                                            <td>quant</td>
                                            <td>$price</td>
                                            <td>$dis price</td>
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
                <React.Fragment>
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Status</th>
                                <th>Start Date</th>
                                <th>Due Date</th>
                                <th>Vendor ID</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.state.day6.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>ID</td>
                                            <td>name</td>
                                            <td>quant</td>
                                            <td>$price</td>
                                            <td>$dis price</td>
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