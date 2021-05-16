import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, Grid, Header, Image, Message, Segment ,Checkbox} from 'semantic-ui-react'
import axios from 'axios';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "check": false,
      "firstName": "",
      "lastName": "",
      "email":"",
      "password":"",
      "userName":"",
      "mssg":false,
      "redirect": "/sign-in",
      "accessCode":""
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
      console.log("reg")
      e.preventDefault();
      var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var mssg;  
      const data = {}
        if(this.state.firstName.length<4){
          mssg = "First name should be atleast 4 char"          
        }else if(this.state.lastName.length<4){
          mssg = "Last name should be atleast 4 char"          
        }else if(!this.state.email.match(mailformat)){
          mssg = "Invalid Mail Id"
        }else if(this.state.password.length<8){
          mssg = "Password should be atleast 8 char"        
          console.log(this.state.password)  
        }
        else {
          mssg =false
  
        data.firstName = this.state.firstName;
        data.lastName = this.state.lastName;
        data.email = this.state.email;
        data.userName = this.state.email;
        data.password = this.state.password;
        data.accessCode = this.state.accessCode;
        // axios.post('localhost:8083/register', data)
        axios({
          method: 'post',
          url: 'http://localhost:3000/process_register',
          headers: {
            "Content-Type":"application/json",
            'Access-Control-Allow-Origin': true
          }, 
          data:data
        })
        .then(
          (response) => {
            console.log(response);
            window.location="/sign-in";
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
     Create your account
  </Header>
  <Form size='large'>
    <Segment stacked>
      <Form.Input fluid icon='user' iconPosition='left' name='firstName' onChange={this.handleInputChange} value={this.state.firstName} placeholder='First name' />
      <Form.Input fluid icon='user' iconPosition='left' name='lastName'  onChange={this.handleInputChange} value={this.state.lastName} placeholder='Last name' />
      <Form.Input fluid icon='envelope' iconPosition='left'name='email' onChange={this.handleInputChange} value={this.state.email} placeholder='Enter Email' />
      <Form.Input fluid icon='lock' iconPosition='left' name='password' onChange={this.handleInputChange} value={this.state.password} placeholder='Password'  type='password'/>
      <Checkbox toggle
          label='Register as Admin'
          onChange={() => {this.state.check = !this.state.check;this.setState({"temp":true})}}
          // checked={this.state.check}
        />
      <br></br>
      <br></br>
      {this.state.check && <Form.Input
        fluid
        icon='lock'
        iconPosition='left'
        name='accessCode' onChange={this.handleInputChange} value={this.state.accessCode}
        placeholder='Access Code'
        type='password'
      />
      }
      {this.state.mssg && <Message color='red' header=''content={this.state.mssg}/>}
      <Button color='teal' fluid size='large' onClick={this.handleSubmit}>
        Register
      </Button>
    </Segment>
  </Form>
  <Message>
    Already registered? <a href='/sign-in'>Sign In</a>
  </Message>
</Grid.Column>
</Grid>

        );
    }
}