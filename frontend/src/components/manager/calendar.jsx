import React, { Component } from 'react';
import './calendar.css'

class Calendar extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
                <div className = "col align-self-center">
                    
                    <table className = "table table-striped">
                        <tbody className = "table table-striped">
                            <tr>
                                <td scope="row"><button className = 'btn btn-responsive'>1</button></td>
                                <td><button className = 'btn btn-responsive'>2</button></td>
                                <td><button className = 'btn btn-responsive'>3</button></td>
                                <td><button className = 'btn btn-responsive'>4</button></td>
                                <td><button className = 'btn btn-responsive'>5</button></td>
                                <td><button className = 'btn btn-responsive'>6</button></td>
                                <td><button className = 'btn btn-responsive'>7</button></td>
                            </tr>
                            <tr>
                            <td scope="row"><button className = 'btn btn-responsive'>8</button></td>
                                <td><button className = 'btn btn-responsive'>9</button></td>
                                <td><button className = 'btn btn-responsive'>10</button></td>
                                <td><button className = 'btn btn-responsive'>11</button></td>
                                <td><button className = 'btn btn-responsive'>12</button></td>
                                <td><button className = 'btn btn-responsive'>13</button></td>
                                <td><button className = 'btn btn-responsive'>14</button></td>
                            </tr>
                            <tr>
                            <td scope="row"><button className = 'btn btn-responsive'>15</button></td>
                                <td><button className = 'btn btn-responsive'>16</button></td>
                                <td><button className = 'btn btn-responsive'>17</button></td>
                                <td><button className = 'btn btn-responsive'>18</button></td>
                                <td><button className = 'btn btn-responsive'>19</button></td>
                                <td><button className = 'btn btn-responsive'>20</button></td>
                                <td><button className = 'btn btn-responsive'>21</button></td>
                            </tr>
                            <tr>
                            <td scope="row"><button className = 'btn btn-responsive'>22</button></td>
                                <td><button className = 'btn btn-responsive'>23</button></td>
                                <td><button className = 'btn btn-responsive'>24</button></td>
                                <td><button className = 'btn btn-responsive'>25</button></td>
                                <td><button className = 'btn btn-responsive'>26</button></td>
                                <td><button className = 'btn btn-responsive'>27</button></td>
                                <td><button className = 'btn btn-responsive'>28</button></td>
                            </tr>
                            <tr>
                                <td scope="row"><button className = 'btn btn-responsive'>29</button></td>
                                <td><button className = 'btn btn-responsive'>30</button></td>
                                <td><button className = 'btn btn-responsive'>31</button></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
         );
    }
}
 
export default Calendar;