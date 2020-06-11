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

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
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
          </Typography>
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
            spacing={5}
          >
            <Grid item>
              <Typography variant="h3" color="primary">
                Bienvenidos a Ututor
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={6} xs={12} container justify="center" alignItems="center">
            {/*<Login />*/}
            <IniciarSesion/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
