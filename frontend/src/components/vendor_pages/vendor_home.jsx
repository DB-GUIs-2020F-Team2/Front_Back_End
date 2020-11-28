import React, { Component } from 'react';
import Header from './header'
import { VendorDashboard}from './vendor_dash'
import { Products } from './products'


//import './managerHome.css'

export class VendorHome extends Component {
    state = { 
        view: 0
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
                    < VendorDashboard/>
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
     
    }

}
 