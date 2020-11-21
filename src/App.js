import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Register from "./Components/Registration/Register";
import login from "./Components/Login/login";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/signup" component={Register} />
          <Route path="/signin" component={login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
