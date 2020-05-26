import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, Paper, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  icono: {
    paddingTop: "10px",
  },
  texto: {
    width: "90%",
  },
  caja: {
    width: theme.spacing(80),
  },
}));

const Buscador = (props) => {
  const classes = useStyles();
  const { texto, setTexto } = props;

  const handleChange = (e) => {
    setTexto(e.target.value);
  };
  return (
    <Paper className={classes.caja}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <SearchIcon className={classes.icono} />
          <input
            type="text"
            className={classes.texto}
            placeholder={"Buscar"}
            value={texto}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Buscador;
