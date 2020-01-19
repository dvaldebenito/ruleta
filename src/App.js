import React from 'react';
import Ruleta from './components/ruleta';
import { Switch, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddContext from './components/context/addContext'

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route exact path="/" component={Ruleta} />
          <Route exact path="/addContext" component={AddContext} />
        </Switch>
      </header>
    </div>
  );
}

export default App;
