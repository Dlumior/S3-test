import React from "react";
import './index.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";

import theme from "./theme.js";
import store from "./redux/store.js";

import Home from "./pages/Home/Home.js";
import Administrador from "./pages/Administrador/Administrador.js";
import Coordinador from "./pages/Coordinador/Coordinador.js";


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App-header">
            <Route exact path="/" component={Home} />
            <Route path="/administrador" component={Administrador} />
            <Route path="/coordinador" component={Coordinador} />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
