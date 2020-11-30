import React, { Component } from 'react';
import { ManagerRepo } from '../../API/managerRepo';

class Products extends Component {
    state = {  }

    isDiscounted(disc){
        if(disc === 0){
            return "True"
        }
        else{
            return 'False'
        }
    }

    dateCheck(month,day){
        //console.log(month,' ',day)
        if(day>31 && month == 0 | 2 | 4 | 6 | 7 | 9 | 11){
            return ""+(month+1)+'-'+(day-31)
        }
        else if(day>30){
            return ""+(month+1)+'-'+(day-30)
        }
        else{
            return ""+(month)+'-'+(day)
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

    buy(prodName){
        let MR = new ManagerRepo()
        let vid = (Math.floor(Math.random() * 2))+1;
        MR.newOrder("In Progess",this.getDate(0),this.getDate(7),vid)
        alert('One order of ' + prodName + ' has been purchased')
    }

    render() { 
        return (  
            <div className="container">
                <div className = "col align-self-center">
                    
                    <table className = "table table-striped">
                        <thead className = "thead-light">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Current Price</th>
                                <th>Discount Price</th>
                                <th>Details</th>
                                <th>Is Discounted</th>
                                <td>Purchase</td>
                            </tr>
                        </thead>

                        <tbody>
                            {this.props.products.data.map(item => {
                            console.log("item " + item);
                            //console.log(this.props.match.params.id)
                                return (
                                    <tr>
                                        <td>{item.ProductID}</td>
                                        <td>{item.ProductName}</td>
                                        <td>${item.CurrentPrice}</td>
                                        <td>${item.DiscountPrice}</td>
                                        <td>{item.Details}</td>
                                        <td>{this.isDiscounted(item.IsDiscount)}</td>
                                        <td><button onClick = {() => this.buy(item.ProductName)}>Buy</button></td>
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
 
export default Products;