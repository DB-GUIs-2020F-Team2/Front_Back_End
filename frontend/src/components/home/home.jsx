import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Row} from 'react-bootstrap';
import './home.css';

export class Home extends React.Component{ 

render(){
      return <div className = "jumbotron jumbotron-fluid mb-0">
    <Container className = "justify-content-center my-5 container-fluid mt-0 pt-0 bt-0">
      <Row className = "justify-content-center">
            <h1> Tanks </h1>
      </Row>

      <Row className = "justify-content-center">     
            <p> Project tracking and coordination for the Defense industry. </p>
      </Row>

      <Row className = "justify-content-center mt-4">
            {/*  add this back when props functions are set up and other pages are made <button onClick={() => this.onLoginClick()}  */}
            <Link to='login/'  className="btn btn-primary">Login</Link>
      </Row>

      <Row className = "justify-content-center mt-4">
      <Link to='register/'  className="btn btn-primary">Register</Link> 
      </Row> 
      
    </Container>
    </div>;
      
}
}