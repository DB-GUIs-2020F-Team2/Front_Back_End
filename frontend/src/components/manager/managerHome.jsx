import React, { Component } from 'react';
import Header from './header'
import History from './history'
import Products from './products'
import Directory from './directory'
import Projects from './projects'
import Contracts from './contracts'
import Calendar from './calendar'
import './managerHome.css'
import {ManagerRepo} from '../../API/managerRepo';

export class ManagerHome extends Component {

    managerRepo = new ManagerRepo(); 

    constructor(){
        super()
        
    }

    state = { 
        view: 5,
        orders: [],
        directory: [],
        products: [],
        contracts: [],
        projects: []
     };

    updateView = (viewPane) => {
        this.setState({view: viewPane}); //if failure change teh wording here
        this.forceUpdate();
        //console.log(this.state.view)
        return;
    }

    componentDidMount(){

        let managerRepo = new ManagerRepo()

        managerRepo.getProducts().then(x => {
            this.setState({ products: x });
        });
        managerRepo.getDirectory().then(x => {
            this.setState({ directory: x });
        });
        managerRepo.getOrders().then(x => {
            this.setState({ orders: x });
        });
        managerRepo.getContracts().then(x => {
            this.setState({ contracts: x });
        });
        managerRepo.getProjects().then(x => {
            this.setState({ projects: x });
        });
        console.log(this.state)
    }

    render() { 
        return ( 

            <div className = "bg">

                <div>
                        <Header changer = {this.updateView}/>
                </div>
                <div>
                        {this.changeView()}
                </div>

            </div>

         );
    }

    changeView(){
        if(this.state.view == 0){
            return (
                <React.Fragment>
                    <History orders = {this.state.orders}/>
                </React.Fragment>
            )
        }
        else if(this.state.view == 1){ // this will have to send the db of products to the 
            return (
                <React.Fragment>
                    <Products products = {this.state.products}/>
                </React.Fragment>
            )
        }
        else if(this.state.view == 2){
            return (
                <React.Fragment>
                    <Directory directory = {this.state.directory}/>
                </React.Fragment>
            )
        }
        else if(this.state.view == 3){ 
            return (
                <React.Fragment>
                    <Projects projects = {this.state.projects}/>
                </React.Fragment>
            )
        }
        else if(this.state.view == 4){ 
            return (
                <React.Fragment>
                    <Contracts contracts = {this.state.contracts}/>
                </React.Fragment>
            )
        }
        else if(this.state.view == 5){ 
            return (
                <React.Fragment>
                    <Calendar />
                </React.Fragment>
            )
        }
    }

}
 
export default ManagerHome;