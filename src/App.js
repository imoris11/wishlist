import React from 'react';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Reset } from './components/Reset';
import { Home } from './components/Home';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';import './App.css';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <Router>
    <Switch>
      <>
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/reset' component={Reset} />
        <Sidebar>
          <Home exact path='/home' component={Home} />
        </Sidebar>
        
     </>
    </Switch>
    </Router>
   
  );
}

export default App;
