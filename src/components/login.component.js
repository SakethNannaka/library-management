import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';
import  { Redirect } from 'react-router-dom'



export default class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "check": false,
      "email":"",
      "password":"",
      "mssg":false
    }
    if(localStorage.getItem('email')!==null){
      window.location='/home'
    }

    this.handleInputChange = (evt) =>{
      const value = evt.target.value;
      this.setState({
        ...this.state,
        [evt.target.name]: value
      });
    }

    this.handleSubmit = (e) =>{
      console.log(this.state)
      e.preventDefault();
      var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var mssg;  
      const data = {}
        if(!this.state.email.match(mailformat)){
          mssg = "Invalid Mail Id"
        }
        else {
          mssg =false
        data.email = this.state.email;
        data.password = this.state.password;
        axios({
          method: 'post',
          url: 'http://localhost:3000/process_login',
          headers: {
            "Content-Type":"application/json",
            'Access-Control-Allow-Origin': true
          }, 
          data:data
        })
        .then(
          (response) => {
            console.log(response);
            if(response.data.status ){
              localStorage.setItem('email',data.email)
                         }             
            // console.log()
            if(response.data.userType === "Admin"){
              // console.log("idnakjnkd")
              localStorage.setItem('isadmin',"true")
            }
            else{
              localStorage.setItem('isadmin',"false")
            }
            // return <Redirect to='/home'/>
            window.location="/home";
          }
        );
    }
    this.setState({mssg:mssg})
    console.log(mssg)

}
}



  render() {
        return (
<Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
<Grid.Column style={{ maxWidth: 450 }}>
  <Header as='h2' color='teal' textAlign='center'>
     Login to your account
  </Header>
  <Form size='large'>
    <Segment stacked>
      <Form.Input fluid icon='envelope' iconPosition='left'name='email' onChange={this.handleInputChange} value={this.state.email} placeholder='Enter Email' />
      <Form.Input fluid icon='lock' iconPosition='left' name='password' onChange={this.handleInputChange} value={this.state.password} placeholder='Password' type='password'/>
      {this.state.mssg && <Message color='red' header=''content={this.state.mssg}/>}
      <Button color='teal' fluid size='large' onClick={this.handleSubmit}>
        LogIn
      </Button>
    </Segment>
  </Form>
  <Message>
  New to us? <a href='/sign-up'>Sign Up</a>
  </Message>
</Grid.Column>
</Grid>
    );
    }
}