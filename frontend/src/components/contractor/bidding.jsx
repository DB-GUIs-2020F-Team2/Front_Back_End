import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { ContractorRepo } from '../../API/contractorRepo'
import NavBar from './navabar'

export class Bidding extends Component{

    contractorRepo = new ContractorRepo();

    state = { 
        idC: '',
        myId: '',
        bids: [],
        contract: [],
        contractors: [],
        bid: 0
    }

    isPaid(x){
        if( x === 0){
            return "no";
        }
        else
           return "yes";
    }

    getContractor(contractorId){
      this.state.contractors.map(X =>{
          if(X.UserID === contractorId){
          return <div>{X.UserName}</div>
          }
      })
        
    }


    onSubmit(){
        if(this.state.bid && this.state.myId && this.state.idC){
            console.log(this.state.myId);
            console.log(this.state.bid);
            console.log(this.state.idC);
            this.contractorRepo.newBid(this.state.myId, this.state.bid, this.state.idC)
                .then(()=>{
                    alert('Bid Added');
                })
            this.forceUpdate();
        }
        else{
            alert("No Bid given");
        }
        
    }

    render() {
        return (
            <div>
                <NavBar/>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Contract</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Contract</th>
                        <th scope="col">Status</th>
                        <th scope="col">Paid</th>
                        </tr>
                
                    </thead>
                    <tbody>
                        {this.state.contract.map((x,i) =>
                                    <tr key = {i}>
                                    <td>{this.getContractor(x.ContractDetail)}</td>
                                    <td>{x.ContractStatus}</td>
                                    <td>{this.isPaid(x.isPaid)}</td>
                                    </tr>
                            )}
                    </tbody>
                </table>

                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Bids</h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col" className = "p-2">Contractor ID</th>
                        <th scope="col">Bid</th>
                        </tr>
                
                    </thead>
                    <tbody>
                        {this.state.bids.map((x,i) =>
                                    <tr key = {i}>
                                    <td>{x.ContractorID}</td>
                                    <td>{x.BiddingPrice}</td>
                                    </tr>
                            )}
                    </tbody>
                </table>
                <h2 className = "display-5 text-center font-weight m-2 p-2 bg-light">Add Bid</h2>
                <form >
                        <div className="form-group row">
                        <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">Amount in Dollars</label>
                        <div className="col-sm-10">
                        <input type="number" className="form-control" id="colFormLabel" placeholder="$0"
                             onChange= { 
                                event => {this.setState({ bid: event.target.value})}
                            }    
                        />
                        </div>
                        <Link to='/contracts'  className="btn btn-primary m-3" onClick ={() => this.onSubmit()} >Submit</Link>
                     </div>

                </form>
        
            </div>
        );
    }

    componentDidMount() {
        const contractId = +this.props.match.params.contractId;
        const myID = localStorage.getItem('UserID');
    
        this.setState({idC: contractId}); 
        this.setState({myId: myID}); 

        this.contractorRepo.getBidsC(contractId)
            .then(x => this.setState({bids : x}));

        this.contractorRepo.getContract(contractId)
            .then(x => this.setState({contract : x}));

            this.contractorRepo.getContractors()
            .then(x => this.setState({ contractors: x }));

    }
}

