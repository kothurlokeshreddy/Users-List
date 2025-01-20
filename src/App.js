// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={UserList} />
            <Route exact path="/users/:id" component={UserDetail} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
