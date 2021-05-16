import React, { Component } from "react";
import {Header,Button, Card, Segment,Sticky,Form,Icon,Modal,Image ,Grid,Message} from 'semantic-ui-react'


export default class Popup extends Component {
  constructor(props) {
    super(props);
    this.state ={
      'showpopup' : true
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
      }

  }
  render() {
      return (
        <Modal
        onClose={() => this.setState({showpopup:false})}
        onOpen={() => this.setState({showpopup:true})}
  open={this.state.showpopup}>
<Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
<Grid.Column style={{ maxWidth: 450 }}>
<Image src={this.state.thumbnailUrl} centered/>
  <Header as='h2' color='teal' textAlign='center'>
        Add New Book
  </Header>

  <Form size='large'>
    <Segment stacked>
      <Form.Input fluid icon='envelope' iconPosition='left'name='title' onChange={this.handleInputChange} value={this.state.title} placeholder='Book Title' />
      <Form.Input fluid icon='lock' iconPosition='left' name='authors' onChange={this.handleInputChange} value={this.state.authors} placeholder='Book Author'/>
      <Form.Input fluid icon='lock' iconPosition='left' name='longDescription' onChange={this.handleInputChange} value={this.state.longDescription} placeholder='Book Description'/>
      <Form.Input fluid icon='lock' iconPosition='left' name='thumbnailUrl' onChange={this.handleInputChange} value={this.state.thumbnailUrl} placeholder='thumbnail url'/>
      {this.state.mssg && <Message color='red' header=''content={this.state.mssg}/>}
      <Button color='teal' fluid size='large' onClick={this.handleSubmit}>
        ADD
      </Button>
    </Segment>
  </Form>
</Grid.Column>
</Grid>

</Modal>
        );
  }
}