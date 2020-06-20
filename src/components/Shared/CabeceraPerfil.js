import React from "react";
import {getUser, useUserValue} from "../../Sesion/Sesion";
import {
  Grid,
  Typography,
  Avatar,
  makeStyles,
  Container,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { inicializarSesion, iniciarSesion } from "../../Sesion/actions/sesionAction";
import App from "../../App";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    fontSize: "500%",
  },
  customContainer: {
    padding: theme.spacing(5),
    backgroundColor: "#ffffff",
  },
}));

const handleOnChangeRol =async (e) =>{
  let usuarioLogueado={...JSON.parse(sessionStorage.Sesion)} 
  usuarioLogueado.idRol = await e.target.value
  usuarioLogueado.rol = await document.getElementById("rol").innerHTML.trim();
  sessionStorage.Sesion = JSON.stringify(
    usuarioLogueado
  );
  console.log("Nuevo rol: ", getUser().rol)
  window.location.reload(false);
  
}

const CabeceraPerfil = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="xl" className={classes.customContainer}>
        <Grid container>
          <Grid item xs={2} container justify="center" alignItems="center">
            <Avatar
              alt={props.nombre}
              src={props.imagen}
              className={classes.large}
            >
              {props.nombre[0]}
            </Avatar>
          </Grid>
          <Grid
            item
            xs={10}
            container
            direction="column"
            alignItems="flex-start"
            justify="center"
          >
          
            <Typography variant="h4">{props.nombre}</Typography>
            {/* <Typography variant="h6">{props.titulo}</Typography> */}
            <InputLabel id="demo-simple-select-placeholder-label-label">
        </InputLabel>
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="rol"
          defaultValue={getUser().idRol}
          onChange={handleOnChangeRol}
        >
          {getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs.map((item) => (            
            <MenuItem value = {item.ROL.ID_ROL}> {item.ROL.DESCRIPCION}</MenuItem>
          ))}
        </Select>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CabeceraPerfil;
