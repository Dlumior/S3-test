import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, Paper, Grid, IconButton } from "@material-ui/core";
import { NoEncryption } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  icono: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  texto: {
    width: "95%",
    alignItems: "center",
    marginLeft: "5%",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      width: "100%",
    },
  },
  caja: {
    width: theme.spacing(100),
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
      width: theme.spacing(40),
    },
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
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={11}>
          <input
            type="text"
            className={classes.texto}
            placeholder={"Buscar"}
            value={texto}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton color="primary" disabled>
            <SearchIcon className={classes.icono} />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Buscador;
