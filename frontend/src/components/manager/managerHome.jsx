import React, { Component } from 'react';
import Header from './header'
import History from './history'
import Products from './products'
import Directory from './directory'
import Projects from './projects'
import Contracts from './contracts'
import Calendar from './calendar'
import './managerHome.css'

export class ManagerHome extends Component {
    state = { 
        view: 5
     };

    updateView = (viewPane) => {
        this.setState({view: viewPane}); //if failure change teh wording here
        this.forceUpdate();
        //console.log(this.state.view)
        return;
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
                    <History />
                </React.Fragment>
            )
        }
        else if(this.state.view == 1){ // this will have to send the db of products to the 
            return (
                <React.Fragment>
                    <Products />
                </React.Fragment>
            )
        }
        else if(this.state.view == 2){
            return (
                <React.Fragment>
                    <Directory />
                </React.Fragment>
            )
        }
        else if(this.state.view == 3){ 
            return (
                <React.Fragment>
                    <Projects />
                </React.Fragment>
            )
        }
        else if(this.state.view == 4){ 
            return (
                <React.Fragment>
                    <Contracts />
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