import React from "react";
import './index.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
//import { Redirect } from "react-router-dom";
import theme from "./theme.js";
import store from "./redux/store.js";

import Home from "./pages/Home/Home.js";
import Administrador from "./pages/Administrador/Administrador.js";
import Coordinador from "./pages/Coordinador/Coordinador.js";
import Tutor from "./pages/Tutor/Tutor.js";
import Alumno from "./pages/Alumno/Alumno.js";


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App-header">
            <Route exact path="/" component={Home} />
            <Route path="/administrador" component={Administrador} />
            <Route path="/coordinador" component={Coordinador} />
            <Route path="/tutor" component={Tutor} />
            <Route path="/alumno" component={Alumno} />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
