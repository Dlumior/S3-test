import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { UserProvider } from "./Sesion/Sesion";
//import { mainReducer } from "./Sesion/reducers";
import { EstadoInicialUser, EstadoInicialDialog } from "./Sesion/estadoInicial";
import sesionReducer from "./Sesion/reducers/sesionReducer";
import { DialogProviderSSJ } from "./Sesion/dialog";
import openDialogReducer from "./Sesion/reducers/openDialogReducer";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider initialState={EstadoInicialUser} reducer={sesionReducer}>
      <DialogProviderSSJ
        initialState={EstadoInicialDialog}
        reducer={openDialogReducer}
      >
        <App />
      </DialogProviderSSJ>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
