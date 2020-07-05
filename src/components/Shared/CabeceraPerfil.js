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

const items = ()=>{
  let arreglo = [];
  getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs.map((item) => (            
    arreglo.push([item.ROL.ID_ROL,item.ROL.DESCRIPCION])
  ))
  let roles = []
  for(let item of arreglo){
    if(!roles.find(e => e[0]===item[0])){
      roles.push(item)
    }
  }
  console.log("roles: ",roles)
  return Array.from(new Set(roles));
}

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
            {console.log("holisnombre",props.nombre.replace(/["]+/g,''))}
            <Avatar
              alt={props.nombre.replace(/["]+/g,'')}
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
          
            <Typography variant="h4">{props.nombre.replace(/["]+/g,'')}</Typography>
            {/* <Typography variant="h6">{props.titulo}</Typography> */}
            <InputLabel id="demo-simple-select-placeholder-label-label">
        </InputLabel>
        {console.log("alumnodesdetutor",props.alumnodesdetutor)}
        {!props.alumnodesdetutor &&
        <Select
          labelId="demo-simple-select-placeholder-label-label"
          id="rol"
          defaultValue={getUser().idRol}
          onChange={handleOnChangeRol}
        >
          {items().map((item) => (            
            <MenuItem value = {item[0]}> {item[1]}</MenuItem>
          ))}
        </Select>}
        {props.alumnodesdetutor && 
        <Typography variant="h6">Alumno</Typography>}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CabeceraPerfil;
