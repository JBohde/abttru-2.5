import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from './pages/Login';
import Registration from './pages/Registration';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/registration" component={Registration} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
