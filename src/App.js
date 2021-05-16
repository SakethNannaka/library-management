import React from 'react';
import 'semantic-ui-css/semantic.min.css'

import { BrowserRouter as Router, Switch, Route, Link ,useHistory} from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import  Home from "./home"
import { Menu, Segment } from 'semantic-ui-react'

function App() {
  
  const { activeItem } = 'messages'
  const history = useHistory();
  const handleItemClick = () => history.push('/sign-in');

function logout(){
  localStorage.clear();
  window.location = '/sign-in'
}

return (<Router>
<Segment inverted>
        <Menu inverted secondary>
          <Menu.Item href='/home'
            name='Home'
            active={activeItem == 'home'}
          />
          <Menu.Item href="/sign-in"
            name='LogIn'
            active={activeItem == 'messages'}
          />
          <Menu.Item href='/sign-up'
            name='Sign-Up'
            active={activeItem == 'friends'}
            onClick={handleItemClick}
          />
          <Menu.Item 
            name='Logout'
            onClick={logout}
          />

        </Menu>
      </Segment>

          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>

      <Route path="/home" component={Home}/>
    
    </Router>
  );
}

export default App;
