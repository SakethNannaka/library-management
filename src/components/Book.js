import React, { Component } from "react";
import { Button, Card, Image ,Icon} from 'semantic-ui-react'



export default class Book extends Component {

constructor(props) {
    super(props);
    this.state = {}
    this.state.title = props.data.title
    this.state.authors = props.data.auth
    this.state.longDescription = props.data.longDesc
    this.state.thumbnailUrl = props.data.thumbnailurl
    this.state.icon = props.icon
    this.state.fun  = props.fun
    this.state.hover = false
    this.state.opacity = 1

    this.state.showbook = false
    
    if(typeof this.state.longDescription === "undefined"){
    this.state.longDescription = " "
    
  }
  }
  onMouseEnter() {
    this.setState({'hover':true})
    this.setState({'opacity':0.5})
  }
  onMouseLeave() {
    this.setState({'hover':false})
    this.setState({'opacity':1})
  }
render() {
return (
 <Card onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()} raised={this.state.hover} onClick={() => this.state.fun(this.state)} style={{opacity: this.state.opacity}}>
  <Image src={this.state.thumbnailUrl} centered size='small' wrapped ui={true} />
    <Card.Content>
      <Card.Header>{this.state.title}</Card.Header>
      <Card.Meta>{this.state.authors}</Card.Meta>
      <Card.Description>  {this.state.longDescription.slice(0,100)}    </Card.Description>
    </Card.Content>
{this.state.hover &&
        <Icon style={{
          position: 'absolute',
          top: '100px',
          left: '100px',
       }} name={this.state.icon} />
}
</Card>
);
}
}
