import React, { useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import {
  ThemeProvider,
  CircularProgress,
  Backdrop,
  makeStyles,
} from "@material-ui/core";
import theme from "./theme.js";
import store from "./redux/store.js";

import Home from "./pages/Home/Home.js";
import Administrador from "./pages/Administrador/Administrador.js";
import Coordinador from "./pages/Coordinador/Coordinador.js";
import Tutor from "./pages/Tutor/Tutor.js";
import Alumno from "./pages/Alumno/Alumno.js";
import { useUserValue } from "./Sesion/Sesion";
import { inicializarSesion } from "./Sesion/actions/sesionAction";
import Footer from "./components/Shared/Footer";
import { useDialogValueSSJ } from "./Sesion/dialog";
import MultiDialog from "./components/Shared/MultiDialog";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
function App() {
  const classes = useStyles();
  //Context provider de user
  const [open, setOpen] = useState(true);
  const [{ usuario, auth }, dispatch] = useUserValue();
  const [{ openMensaje, mensaje, postClose }, dispatchDialog] = useDialogValueSSJ();

  const [value, setValue] = useState(0);

  useEffect(() => {
    async function init() {
      setOpen(true);
      //console.log("Paso por el APP usuario",usuario);
      //console.log("Paso por el APP auth",auth);
      if (!auth) {
        //sera por el erase del redux?
        //console.log( "No habia nadie en el context, se borro putho redux XD", usuario );
        const user = await inicializarSesion(dispatch, {});
        //console.log( "Ya lo regenere XD, si es que habia algo en el storage", user );
        setValue(1);
        setOpen(false);
      } else {
        //console.log("Si habia en el context", usuario);
        setValue(1);
        setOpen(false);
      }
    }
    init();
  }, []);
  //console.log("Paso por el APP");
  const onCloseDialog = () => {
      
    dispatchDialog({
      type: "OPEN_DIALOG",
      openMensaje: {
        open: false,
        mensaje: "",
        postClose:()=>{}
      },
    });
    if(postClose)postClose();
  };

  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MultiDialog
            open={openMensaje}
            mensaje={mensaje}
            onCloseDialog={onCloseDialog}
          />
          <Router>
            <div className="App-header">
              <Route exact path="/" component={Home} />
              <Route path="/administrador" component={Administrador} />
              <Route path="/coordinador" component={Coordinador} />
              <Route path="/tutor" component={Tutor} />
              <Route path="/alumno" component={Alumno} />
            </div>
            <Footer />
          </Router>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
