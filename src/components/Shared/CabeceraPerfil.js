import React from "react";
import { getUser, useUserValue } from "../../Sesion/Sesion";
import {
  Grid,
  Typography,
  Avatar,
  makeStyles,
  Container,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import ImagenCircular from "./ImagenCircular";

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

const items = () => {
  let arreglo = [];
  getUser().usuario.ROL_X_USUARIO_X_PROGRAMAs.map((item) =>
    arreglo.push([item.ROL.ID_ROL, item.ROL.DESCRIPCION])
  );
  let roles = [];
  for (let item of arreglo) {
    if (!roles.find((e) => e[0] === item[0])) {
      roles.push(item);
    }
  }
  //console.log("roles: ",roles)
  return Array.from(new Set(roles));
};

const handleOnChangeRol = async (e) => {
  let usuarioLogueado = { ...JSON.parse(sessionStorage.Sesion) };
  usuarioLogueado.idRol = await e.target.value;
  usuarioLogueado.rol = await document.getElementById("rol").innerHTML.trim();
  sessionStorage.Sesion = JSON.stringify(usuarioLogueado);
  //console.log("Nuevo rol: ", getUser().rol)
  window.location.reload();
};

// const handleOnChangeImg = (event) => {
//   //console.log(event.target.files[0]);
//   let ext = event.target.files[0].name;
//   let extens = ext.slice(-3);

//   //let alert = Object.assign({}, this.state.alert);
//   //alert.mensaje = "";
//   //alert.mensajeStrong = "";
//   //this.setState({ alert: alert });
//   //this.setState({ severidad: "" });

//   //console.log("name: ",extens);
//   // if (extens === 'jpg') {
//   //   extens = 'jpeg';
//   // } else if (extens === 'png') {
//   //   extens = 'png'
//   // } else {
//   //   let alert = Object.assign({}, this.state.alert);
//   //   alert.mensaje = "El logo debe tener extensión .jpg o .png";
//   //   alert.mensajeStrong = alert.mensajeStrongError;
//   //   this.setState({ alert: alert });
//   //   this.setState({ severidad: "error" });
//   //   this.state.alert.mensaje = this.state.alert.mensajeError;
//   // }

//   let reader = new FileReader();
//   reader.readAsDataURL(event.target.files[0]);
//   reader.onload = (event) => {
//     let base = event.target.result.slice(23);
//     console.warn("img data", event.target.result);

//     let inst = Object.assign({}, this.state.institucion);

//     var base1;
//     //console.log("name: ",extens);
//     if (extens === 'jpeg') {
//       inst.EXTENSION = 'jpeg';
//       base1 = event.target.result.slice(23);
//     } else {
//       inst.EXTENSION = 'png';
//       base1 = event.target.result.slice(22);
//     }
//     //console.log("base1",base1);
//     inst.IMAGEN = base1;

//     this.setState({
//       institucion: inst,
//     })
//     //console.log(this.state.institucion.IMAGEN);
//   }
// }

const CabeceraPerfil = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Container maxWidth="xl" className={classes.customContainer}>
        <Grid container>
          <Grid
            item
            md={2}
            xs={12}
            container
            justify="center"
            alignItems="center"
          >
            {/*console.log("holisnombre",props.nombre.replace(/["]+/g,''))*/}
            {getUser().rol === "Administrador" ? (
              <ImagenCircular src="https://www.w3schools.com/howto/img_avatar.png" />
            ) : getUser().usuario.IMAGEN ? (
              <ImagenCircular
                src={`data:image/jpeg;base64,${getUser().usuario.IMAGEN}`}
              />
            ) : (
              <Avatar
                alt={props.nombre.replace(/["]+/g, "")}
                src={props.imagen}
                className={classes.large}
              >
                {props.nombre[0].match(/[a-z]/i)
                  ? props.nombre[0]
                  : props.nombre[1]}
              </Avatar>
            )}
            <Grid item md ={12} xs={12} style={{textAlign:"center", marginTop:"10%"}}>
              <Button variant="outlined" component="label" color="primary">
              Cambair foto
              <input
                type="file"
                //onChange={handleOnChangeImg}
                style={{ display: "none" }}
              />
            </Button>
            </Grid>
            
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            container
            direction="column"
            alignItems="flex-start"
            justify="center"
          >
            <Typography variant="h4" >
              {props.nombre.replace(/["]+/g, "")}
            </Typography>
            {/* <Typography variant="h6">{props.titulo}</Typography> */}
            <InputLabel id="demo-simple-select-placeholder-label-label" style={{textAlign:"center", marginTop:"2%"}}>
              Cambiar de rol
            </InputLabel>
            {/*console.log("alumnodesdetutor",props.alumnodesdetutor)*/}
            {!props.alumnodesdetutor && (
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="rol"
                defaultValue={getUser().idRol}
                onChange={handleOnChangeRol}
              >
                {items().map((item) => (
                  <MenuItem value={item[0]}> {item[1]}</MenuItem>
                ))}
              </Select>
            )}
            {props.alumnodesdetutor && (
              <Typography variant="h6">Alumno</Typography>
            )}
          </Grid>
          <Grid
            item
            md={6}
            container
            direction="column"
            alignItems="flex-start"
            justify="center"
          ></Grid>
          {/* <Button
                  variant="outlined"
                  component="label"
                  color="primary"
                >
                  Importar
                            <input
                    type="file"
                    //onChange={handleOnChangeImg}
                    style={{ display: "none" }}
                  />
                </Button> */}
        </Grid>
      </Container>
    </div>
  );
};

export default CabeceraPerfil;
