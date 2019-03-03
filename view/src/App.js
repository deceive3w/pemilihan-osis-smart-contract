import React, { Component } from 'react';
import './App.css';
import { drizzleConnect } from 'drizzle-react'
import { Vote } from './screens';
import { Switch, Route } from 'react-router-dom';
import Login from './screens/login/login';
import { PrivateRoute } from './routes/privateRoute';

class App extends Component {
  state = { dataKey: null };

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return(
      <Switch>
        <PrivateRoute exact path="/" component={Vote} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Vote} />
      </Switch>
    )
  }
}

export default App