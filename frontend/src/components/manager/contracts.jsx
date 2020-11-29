import React, { Component } from 'react';

class Contracts extends Component {
    state = {  }

    isPayedFor(paid){
        if(paid === 0){
            return (
                "False"
            )
        }
        else{
            return "True"
        }
    }

    render() { 
        return ( 
            <div className="container">
                <div className = "col align-self-center">
                    
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Details</th>
                                <th>Highest Bidder</th>
                                <th>Contractor</th>
                                <th>Paid For?</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {this.props.contracts.data.map(item => {
                                console.log("item " + item);
                                //console.log(this.props.match.params.id)
                                    return (
                                        <tr>
                                            <td>{item.ContractID}</td>
                                            <td>{item.ContractDetails}</td>
                                            <td>{item.BestBiddingID}</td>
                                            <td>{item.ContractorID}</td>
                                            <td>{this.isPayedFor(item.IsPaid)}</td>
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
 
export default Contracts;