import React, { Component } from 'react';
import NavBar from './navabar.jsx'
import { ContractorRepo } from '../../API/contractorRepo'

export class Contracts extends Component {

    contractorRepo = new ContractorRepo();
    state = { 
        myContracts: [],
        contracts: [],
        bid: [],
        contractor: []
     }

     isPaid(x){
         if( x === 0){
             return "no";
         }
         else
            return "yes";
     }



     getBid(pos){
    
        
        return(
            <div >
                {this.state.bid.map((x,i) =>
                             <div>{x.BiddingPrice}</div>      
                            )}
            </div>
        )
     }

    render() { 
        return ( 
            <div>
                <NavBar/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">My Contracts</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Contract</th>
                        <th scope="col">Status</th>
                        <th scope="col">Paid</th>
                        </tr>
                
                    </thead>
                    <tbody>
                        {this.state.myContracts.map((x,i) =>
                                    <tr key = {i}>
                                    <td>{x.ContractDetail}</td>
                                    <td>{x.ContractStatus}</td>
                                    <td>{this.isPaid(x.isPaid)}</td>
                                    </tr>
                            )}
                    </tbody>
                </table>

                <br/>
                <br/>
                <br/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">All Contracts</h2>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Contract</th>
                    <th scope="col">Status</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Current Bids</th>
                    </tr>
               
                </thead>

                    <tbody>
                        {this.state.contracts.map((x,i) =>
                                    <tr key = {i}>
                                    <td>{x.ContractDetail}</td>
                                    <td>{x.ContractStatus}</td>
                                    <td>{this.isPaid(x.isPaid)}</td>
                                    <td>{this.getBid(i)}</td>
                                    </tr>
                            )}
                    </tbody>
              
                </table>

                
            </div>
            /////// In a table ////////
            // ROW : Contract | Contract info | Bid (+) or (-) buttons | Submit Bid button
            // api calls - get contracts, get bids
         );
    }

    componentDidMount(){
        const id = localStorage.getItem('UserID');

        this.contractorRepo.getContracts(id)
            .then(x => this.setState({myContracts : x}));

            this.contractorRepo.getAllContracts()
            .then(x => this.setState({contracts : x}));

         this.contractorRepo.getBids()
            .then(x => this.setState({bid : x}));
    }
}