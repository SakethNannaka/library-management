import React, { Component,createRef } from "react";
import Cards from './components/Popup'
import {Header,Button, Card, Segment,Sticky,Form,Icon,Modal,Image ,Grid,Message } from 'semantic-ui-react'
import Book from "./components/Book";
import axios from 'axios';
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

export default class Home extends Component {

  constructor(props) {
    super(props);
     this.contextRef = createRef()
  this.state={
    "mybooks":[],
    "allbooks":[],
    "isadmin":localStorage.getItem('isadmin'),
    "email":localStorage.getItem('email'),
    "edit":false,
    "allbooksjson":[]
  }
  console.log(this.state.isadmin,"yhesghdh")


  if(localStorage.getItem('email')===null){
    // console.log("huashun",localStorage.getItem('email'))
    window.location = '/sign-in'
  }
  this.getallBooks()  
  if(this.state.isadmin==="false"){
  this.getmyBooks()
  }

  this.fun_add_book = this.fun_add_book.bind(this)
  this.fun_update_book = this.fun_update_book.bind(this)
  this.reset = this.reset.bind(this)
  this.update_book = this.update_book.bind(this)
  this.add_book = this.add_book.bind(this)
  this.books_return = this.books_return.bind(this)
  this.star_book = this.star_book.bind(this)
  this.delete_book = this.delete_book.bind(this)
  this.handleInputChange = (evt) =>{
    const value = evt.target.value;
    this.setState({
      ...this.state,
      [evt.target.name]: value
    });
  }
}

add_book(){

  const data = {}
  data.title = this.state.title
  data.author = this.state.authors
  data.longDesc = this.state.longDescription
  data.thumbnailurl = this.state.thumbnailUrl
  axios({
    method: 'post',
    url: 'http://localhost:3000/add_book',
    headers: {
      "Content-Type":"application/json",
      'Access-Control-Allow-Origin': true
    }, 
    data:data
  })
  .then(
    (response) => {
      console.log(response);
      this.setState({"mssg":response.data.statusDescription})
      this.reset();
      this.getallBooks();
      this.getmyBooks();
    }
  );

}
delete_book(dict){
    console.log(dict.title,"removing")
    const data = {}
    data.email = this.state.email
    data.title = dict.title
    let url = 'http://localhost:3000/repay_book'
    axios({
      method: 'post',
      url: url,
      headers: {
        "Content-Type":"application/json",
        'Access-Control-Allow-Origin': true
      }, 
      data: data,
    }).then(
      (response) => {
      console.log("unstar book",response)
      // this.getmyBooks()
      window.location="/home"
    })
}
update_book(){
  const data = {}
  data.title = this.state.title
  data.author = this.state.authors
  data.longDesc = this.state.longDescription
  data.thumbnailurl = this.state.thumbnailUrl
  axios({
    method: 'post',
    url: 'http://localhost:3000/update_book',
    headers: {
      "Content-Type":"application/json",
      'Access-Control-Allow-Origin': true
    }, 
    data:data
  })
  .then(
    (response) => {
      console.log(response);
      this.setState({"mssg":response.data.statusDescription})
      this.reset();
      this.getallBooks();
      this.getmyBooks();
    }
  );

}
reset(){
  // this.setState({"edit":true})
  this.setState({"title":""})
  this.setState({"authors":""})
  this.setState({"longDescription":""})
  this.setState({"thumbnailUrl":""})
  // this.setState({"showpopup":false})
}
star_book(dict){
  if(this.state.mybooks.length >4){
    alert("You can Add only Upto 5 books")
    return
  }
  console.log(dict.title,"starring")
  const data = {}
  data.email = this.state.email
  data.title = dict.title
  let url = 'http://localhost:3000/borrow_book'
  axios({
    method: 'post',
    url: url,
    headers: {
      "Content-Type":"application/json",
      'Access-Control-Allow-Origin': true
    }, 
    data: data,
  }).then(
    (response) => {
    console.log("Borrowbook",response)
    // this.getmyBooks()
    window.location="/home"

  })
}

getallBooks(){
  var items = [] 
  const temp = []
  let url = 'http://localhost:3000/get_all_book_data';

  axios({
    method: 'get',
    url: url,
  }).then(
    (response) => {
      items = response.data.booksList
      this.setState({ "allbooksjson" : items})
          for (const [index, value] of items.entries()) {
          if(this.state.isadmin==="true"){
          temp.push(<Book key={value.title} data={value} fun={this.fun_update_book} icon="massive edit outline" />)
          }
          else{
          temp.push(<Book key={value.title} data={value} fun={this.star_book} icon="massive star" />)
          }
        }
    this.setState({"allbooks":temp})
    }
  );
}

  getmyBooks(){
    var items = [] 
    const temp = []
    let url = 'http://localhost:3000/get_user_book_data';
    const data = {}
    data.email = this.state.email
    axios({
      method: 'post',
      url: url,
      headers: {
        "Content-Type":"application/json",
        'Access-Control-Allow-Origin': true
      }, 
      data: data,
    }).then(
      (response) => {
        if("bookList" in response.data){
        items = response.data.bookList    
        for (const [index, vale] of items.entries()) {
              const value = this.state.allbooksjson.find(item=>item.title===vale.title)
              // console.log(vale,"testing",this.state.allbooksjson)
              temp.push(<Book data={value} fun={this.delete_book} icon="massive trash alternate" />)
            }
            console.log(temp,"Updating my books in frontend")
            this.setState({"mybooks":temp})
          }
          else{
            this.setState({"mybooks":[]})
          }
      }
    );
}

  fun_add_book(){
    if(this.state.edit){
        this.reset()
    }
      this.setState({"edit":false})
      this.setState({"showpopup":true})
  }
  fun_update_book(dict){
    console.log("udhajnjhbfehhj")
    // console.log(dict)
      this.setState({"showpopup":true})
      this.setState({"edit":true})
      this.setState({"title":dict.title})
      this.setState({"authors":dict.authors})
      this.setState({"longDescription":dict.longDescription})
      this.setState({"thumbnailUrl":dict.thumbnailUrl})
  }

  books_return(){
    console.log("jhbhjwdajhbawdhjbaw",this.state.isadmin)
    // console.log(this.state.isadmin=="false")
    if(this.state.isadmin==="true"){
    return(          <Segment>
      <Sticky context={this.contextRef}>
      <Icon onClick={this.fun_add_book} style={{opacity:0.5}} name='massive calendar plus outline'/> 
      </Sticky>
      <Header as='h2' color='teal' textAlign='center'>All Books</Header>
      <Card.Group itemsPerRow={6}>{this.state.allbooks}</Card.Group>
      </Segment>
    )
    }
    else{
      return(
        <Segment>
        <Header as='h2' color='teal' textAlign='center'> My Books</Header>
        <Card.Group itemsPerRow={6}>{this.state.mybooks}</Card.Group>
        <Header as='h2' color='teal' textAlign='center'>All Books</Header>
        <Card.Group itemsPerRow={6}>{this.state.allbooks}</Card.Group>
        </Segment>
      )
    }

  }
  
  render() {
    // console.log(this.state.isadmin,"hjabaghgv")
        return (
          <div ref={this.contextRef}>
          <this.books_return></this.books_return>
          <Modal
        onClose={() => this.setState({showpopup:false})}
        onOpen={() => this.setState({showpopup:true})}
  open={this.state.showpopup}>
<Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
<Grid.Column style={{ maxWidth: 450 }}>
<Image src={this.state.thumbnailUrl} centered/>

{!this.state.edit &&
  <Header as='h2' color='teal' textAlign='center'>
        Add New Book
  </Header>
  }
  {this.state.edit &&
  <Header as='h2' color='teal' textAlign='center'>
        Update Book
  </Header>
  }
  <Form size='large'>
    <Segment stacked>
      <Form.Input fluid icon='envelope' iconPosition='left'name='title' onChange={this.handleInputChange} value={this.state.title} placeholder='Book Title' />
      <Form.Input fluid icon='lock' iconPosition='left' name='authors' onChange={this.handleInputChange} value={this.state.authors} placeholder='Book Author'/>
      <Form.TextArea fluid icon='lock' iconPosition='left' name='longDescription' onChange={this.handleInputChange} value={this.state.longDescription} placeholder='Book Description'/>
      <Form.Input fluid icon='lock' iconPosition='left' name='thumbnailUrl' onChange={this.handleInputChange} value={this.state.thumbnailUrl} placeholder='thumbnail url'/>
      {this.state.mssg && <Message color='red' header=''content={this.state.mssg}/>}

      {!this.state.edit &&
      <Button color='teal' fluid size='large' onClick={this.add_book}>
        ADD
      </Button>
  }
      {this.state.edit &&
      <Button color='teal' fluid size='large' onClick={this.update_book}>
        Update
      </Button>
  }
    </Segment>
  </Form>
</Grid.Column>
</Grid>
</Modal>
          </div>

          );
    }
}


