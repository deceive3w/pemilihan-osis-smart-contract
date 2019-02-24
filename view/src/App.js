import React, { Component } from 'react';
import './App.css';
import { drizzleConnect } from 'drizzle-react'
import { Vote } from './screens';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  state = { dataKey: null };

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return(
      <Switch>
        <Route exact path="/" component={Vote} />
      </Switch>
    )
  }
}

export default App