import React from 'react';
import  Login  from './components/Login';
import  Signup from './components/Signup';
import { Reset } from './components/Reset';
import Home  from './components/Home';
import WishList from './components/WishList';
import NewList from './components/WishList/New';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';import './App.css';
import Sidebar from './components/Sidebar';
import Profile from './components/Profile';
import { PublicList } from './components/Public';
import { Twitter } from './Twitter';

function App(props) {
      return (
        <Router>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/reset' component={Reset} />
            <Route exact path='/twitter' component={Twitter} />
            <Route exact path='/public/wishlist/:id' component={PublicList} />
            <Sidebar>
              <Route exact path='/home' component={Home} />
              <Route exact path='/wishlists/:id' component={WishList} />
              <Route exact path='/mywishlist/:id' component={NewList} />
              <Route exact path='/wishlist/new' component={NewList} />
              <Route exact path='/profile' component={Profile} />
             
            </Sidebar>
        </Switch>
        </Router>
      )
}

export default App;
