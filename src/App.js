import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from "react-redux";

import LoginPage from './components/login';
import Dashboard from './components/dashboard';
import EnterTheSite from './components/enter';

import store from './store';

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='container'>
            <Route path='/' component={EnterTheSite} exact/>
            <Route path='/login' component={LoginPage}/>
            <Route path='/dashboard' component={Dashboard}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;