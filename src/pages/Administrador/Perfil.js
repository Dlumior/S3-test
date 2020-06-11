import React from "react";
import Datos from "../../components/Administrador/Datos";
//import Cabecera from "../../components/Administrador/Cabecera.js";
import { Grid, makeStyles } from "@material-ui/core";

import CarolinaH from "../../components/Administrador/carolinaHerrera.png";
import CabeceraPerfil from "../../components/Shared/CabeceraPerfil.js";

const useStyles = makeStyles((theme) => ({
  customContainer: {
    margin: theme.spacing(5),
  },
}));

const Perfil = (props) => {
  const classes = useStyles();
console.log("Perfiiiiiil",props);
  return (
    <div>
      {/*<Cabecera />*/}
      <CabeceraPerfil titulo="Administrador"
        nombre="HERRERA GUTIERREZ, Carolina"
        imagen={CarolinaH}
      //imagen="https://pps.whatsapp.net/v/t61.24694-24/76633458_696724491134649_6543062526296892872_n.jpg?oe=5ECCD65C&oh=c0e140eec24c477fbfdc4ee4254c54c6" />
      />
      <Grid
        container
        xs={12}
        spacing={5}
        justify="center"
        alignItems="center"
        className={classes.customContainer}
      >
        <Grid item>
          <Datos />
        </Grid>
      </Grid>
    </div>
  );
};

export default Perfil;
