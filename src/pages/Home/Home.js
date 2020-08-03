import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
//import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import SchoolIcon from "@material-ui/icons/School";
import { Grid } from "@material-ui/core";

import Login from "../../components/Home/Login.js";
import useStyles from "./useStyles.js";
import IniciarSesion from "../../components/Home/IniciarSesion.jsx";
import { useUserValue } from "../../Sesion/Sesion.js";
import ImagenCircular from "../../components/Shared/ImagenCircular.js";
import Footer from "../../components/Shared/Footer.jsx";

function Home(props) {
  const classes = useStyles();
  const [{ usuario }, dispatch] = useUserValue();
  //console.log("Home encontro: ", usuario);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={1}>
            <Grid item md={2} xs={4} xl={1}>
              <ImagenCircular
                size={"xs"}
                square={true}
                src="https://ututor-recursos.s3.amazonaws.com/ututor-main-logo-inverted_emptyBG_light.png"
              />
            </Grid>
            <Grid item md={10} xs={5} xl={10}></Grid>
          </Grid>
          {/*
          asi mero se sintio 
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <SchoolIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Ututor
          </Typography>*/}
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Grid container direction={"column"} className={classes.fullscreen}>
        <Grid item xs={12} container className={classes.image}>
          <Grid
            item
            md={6}
            xs={false}
            container
            justify="flex-start"
            alignItems="center"
          >
            <Grid item>
              <Typography
                variant="h2"
                className={classes.t1}
                style={{ color: "#2B7A78" }}
              >
                Bienvenidos a Ututor.net
              </Typography>
              <Typography
                variant="h5"
                className={classes.t2}
                style={{ color: "#2B7A78" }}
              >
                Ingresa y solicita una sesión de tutoría con los profesores de
                tu universidad.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            container
            justify="center"
            alignItems="center"
          >
            {/*<Login />*/}
            <IniciarSesion />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
